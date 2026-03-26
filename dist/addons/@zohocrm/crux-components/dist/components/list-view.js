Lyte.Mixin.register("crux-mass-action-mixin", {//No I18n
	fieldYieldMapping: function (headerFields, cxPropIsResizeEnabled, moduleInfo, from , fieldMapping) {
		var fieldUiType = Object.assign({}, fieldMapping ? fieldMapping : this.data.cxPropDefaultUiTypeCruxMapping);
		Object.assign(fieldUiType, { 20: "user", 127: "lookup", 133: 'lookup', 132: "lookup" });//No I18n
		if (from === "mass-tools") {
			Object.assign(fieldUiType, { 33: "text" });//No I18n
		}
		moduleInfo = moduleInfo === undefined ? this.data.cxPropModuleInfo : moduleInfo; //No I18n
		var custom_view= this.data.custom_view || store.peekRecord('custom_view', this.data.cxPropCvid);
		
		var sort_by_id = custom_view && custom_view.sort_by ? custom_view.sort_by.id : undefined;
		var customfields = [];
		var fieldMapping = {};
		var fields = moduleInfo.fields;
		var dpFields = this.data.cxPropDisplayField || {};
		var module_name = this.data.moduleName ? this.data.moduleName : this.data.cxPropModule;
		// var {cxPropModule : module_name} =this.data;
		var plEventMod = "Activities" === module_name || module_name === 'Events';
		if(module_name.indexOf("CustomModule") > -1 || module_name.indexOf("LinkingModule") > -1){
			dpFields[module_name] = ["Name"];
		}else if(module_name.startsWith("Orchestration") || module_name.startsWith("PathFinder")){ //No I18n
			dpFields[module_name] = [];
		}

		var head = dpFields[module_name];
		head = head === undefined ? [] : head;
		var cvfieldlen = headerFields.length;
		// var customfields = [];
		var fieldlen = fields.length;
		var headLen = head.length;
		var listviewComp = $L('crux-list-view', this.$node);
		var isWidthNeeded = false;
		var setSortBy = false , cvModFields = this.getData("cv_mod_fields");
		var cv_width_map = cvModFields && Object.keys(cvModFields).length ? cvModFields : new Map();//No I18N
		for (var m = 0; m < cvfieldlen; m++) {
			if (headerFields[m]._width || cv_width_map.size > 0) {
				isWidthNeeded = true;
				break;
			}
		}
		for (var i = 0; i < cvfieldlen; i++) {
			for (var j = 0; j < fieldlen; j++) {
				if (headerFields[i].api_name === fields[j].api_name && fields[j].visible && fields[j].available_in_user_layout && fields[j].ui_type !== 51) {
					if (fields[j].show_type === 0 && !(fields[j].column_name === "FULLNAME" || fields[j].column_name === "PROCESSINGBASIS" || fields[j].column_name === "SE_STATUS")) {
						continue;
					}
					// if(fields[j].api_name == "Full_Name" && (module_name == "Contacts" || module_name == "Leads")){
					// 	// fields[j].field_label = _cruxUtils.getI18n("custommodule.crmfield.fl.name",moduleInfo.singular_label);
					// }
					var isCustomModule = false;
					// if(fields[j].api_name === "zia_suggested_user_1"){
					// 	fields[j].api_name = "zia_suggested_user";
					// }
					if (this.data.cxPropIsLinkToNotSupported && fieldUiType[fields[j].ui_type] === 'lookup') {
						fieldMapping[fields[j].api_name] = "text";
					} else {
						fieldMapping[fields[j].api_name] = fieldUiType[fields[j].ui_type];
					}
					if (!this.data.cxPropIsLookupYield && (fields[j].yieldName === "lookup" || fields[j].yieldName === "multi_module_lookup")) {
						delete fields[j].yieldName;
					}
					if (fields[j].data_type === "lookup") {
						if (fields[j].api_name && fields[j].api_name.indexOf("Touchpoint_Email") > -1 && module_name.startsWith("PathFinder")) {
							fields[j].yieldName = "pf_email_lookup";
						} else {
							// fields[j].yieldName = "lookup";
							if (this.data.cxPropIsLinkToNotSupported) {
								fields[j].cxTypeMapping = "text";
							} else {
								fields[j].cxTypeMapping = "lookup";
							}
						}
					}

					for (var k = 0; k < headLen; k++) {
						if (head[k] === fields[j].api_name) {
							// fields[j].yieldName = "lookup";
							if (!this.data.cxPropIsLookupYield && (fields[i].yieldName === "lookup" || fields[j].yieldName === "multi_module_lookup")) {
								delete fields[i].yieldName;
							}
							if (this.data.cxPropIsLinkToNotSupported) {
								fields[j].cxTypeMapping = "text";
								fieldMapping[fields[j].api_name] = "text";
							} else {
								fields[j].cxTypeMapping = "lookup";
								fieldMapping[fields[j].api_name] = "lookup";
							}
						}
					}
					fields[j].list_display_label = fields[j].field_label;
					if (fields[j].ui_type === 209) {
						fields[j].list_display_label = _cruxUtils.getI18n("crm.label.small.tags");
					}
					// if(!fields[j].sortable)
					// {
					//  	fields[j].cxPropClass = "cursorDefault"
					//  	if(window.clientPortalName) {
					//  		fields[j].cxPropClass += " noSortFieldOption"
					//  	}
					// }

					if (fields[j].ui_type === 2 && fields[j].column_name === "TYPE") {
						fields[j].yieldName = "campaign-type";
					}
					else if (fields[j].ui_type === 2 && module_name.indexOf("PathFinder") !== -1 && fields[j].column_name === "STATE_ID") {
						fields[j].yieldName = "current_state";
						fields[j].disableExtraValue = true;
					}
					else if (fields[j].column_name === "BEST_TIME") {
						fields[j].yieldName = "best_time";
					}
					else if (plEventMod && fields[j].enable_colour_code === true) {
						fields[j].yieldName = "eventtypecolour";
						fields[j].cxPropClass = "cxLvPR";
					}
					else if (fields[j].column_name === "ACTIVITYTYPE") {
						fields[j].yieldName = "activity_type";
					}
					else if (fields[j].ui_type === 999) {
						fields[j].yieldName = "territory";
					}
					else if (fields[j].ui_type === 8) {
						fields[j].cxPropTooltip = true;
						fields[j].style = "max-width :  150px";
					}

					if (headerFields[i].api_name === 'Owner' && headerFields[i].id !== fields[j].id) {
						isCustomModule = true;
					}

					if (!isCustomModule) {
						var fieldObj = fields[j];
						delete fieldObj.cxPropClass;
						// fieldObj.cxPropClass += " cellWrap";//no I18n
						if (head.includes(headerFields[i].api_name)) {
							fieldObj.cxPropClass += " cxLvAlphaSearchIncl";//no I18n
							if (headerFields[i].api_name !== "Last_Name") {
								fieldObj.cxPropClass += " cxLvNameLinkColumn";//no I18n
							}
						}
						if (fieldObj.ui_type && (fieldObj.ui_type === 3 || fieldObj.ui_type === 110)) {
							fieldObj.cxPropClass += " cxLvTextAreaElem";//no I18n
						}

						var tmpWidth = 0;
						if (cxPropIsResizeEnabled) {
							Lyte.objectUtils(fieldObj, "add", "cxPropResize", "enable");
							// fieldObj.cxPropResize = 'enable';//no I18n
							if (cv_width_map.has(fieldObj.id)) {
								tmpWidth = cv_width_map.get(fieldObj.id);
								fieldObj.style = "width: " + tmpWidth + "px;";//no I18n
							} else if (headerFields[i]._width && !this.data.isResetClick) {
								tmpWidth = parseInt(headerFields[i]._width);
								fieldObj.style = "width: " + tmpWidth + "px;";//no I18n
							} else {
								fieldObj.style = "";
							}
							if (isWidthNeeded && fieldObj.style === "") {
								tmpWidth = this.getDefaultWidthForField(fieldObj.ui_type);
								fieldObj.style = "width: " + tmpWidth + "px;";
							}
							if (tmpWidth !== 0) {
								Lyte.objectUtils(fieldObj, "add", "width", tmpWidth + "px");
								// fieldObj.width = tmpWidth + "px";
							}
						}
						if (fieldObj.ui_type === 209) {
							tmpWidth = tmpWidth === 0 ? this.getDefaultWidthForField(fieldObj.ui_type) : tmpWidth;
							Lyte.objectUtils(fieldObj, "add", "width", tmpWidth + "px");
							// fieldObj.tagWidth = tmpWidth + 'px';//no I18n
							fieldObj.cxPropClass += " cxLvTableTagElem";//no I18n
						}
						// if(fieldObj.ui_type === 999){
						// 	fieldObj.cxPropClass += " nlv_data_territory" ;//no I18n
						// }
						if (headerFields[i]._pin && this.data.cxPropPinUnpinColumn) {
							fieldObj.fixed = 'enable'; //No I18n
							fieldObj.cxPropPinned = true;
							if (headerFields[i]._pin_order) {
								fieldObj.cxPropPinOrder = headerFields[i]._pin_order;
							}
						} else {
							delete fieldObj.fixed;
							fieldObj.cxPropPinned = false;
						}
						if (sort_by_id && sort_by_id === fieldObj.id) {
							fieldObj.cxPropClass += " cxLvSortAppliedFld"; //No I18N
							if (listviewComp) {
								this.setData('cxPropSortByComp', custom_view.sort_by);
								setSortBy = true;
							}
						}
						// if((fieldObj.ui_type === 2 || fieldObj.ui_type === 26) && fieldObj.enable_colour_code){
						// 	fieldObj.cxPropClass += " nlv_data_picklist" ;//no I18n
						// }

						customfields.push(fieldObj);
						break;
					}
				}
			}
		}
		if (!setSortBy && listviewComp) {
			// if(listviewComp) {
			this.setData('cxPropSortByComp', undefined);
			// }
		}
		customfields.sort((field1, field2) => Number(field2.cxPropPinned) - Number(field1.cxPropPinned));
		return { 'customfields': customfields, 'fieldMapping': fieldMapping };//No I18n
	},
	getDefaultWidthForField: function (uiType) {
		return uiType === 209 || uiType === 3 || uiType === 110 ? 400 : 200;
	},
	// list view changes
	selectedEntity: function (element, cvrecords, selectedIds, prevSelectedId, from, targetRow, selectedObj) {
		selectedIds = selectedIds ? selectedIds : this.getData("cxPropSelectedIds");//No I18n
		prevSelectedId = this.getData('prevSelectedId');
		var customOuter, currentNode = this.$node;
		let chckBoxNode = $L("#selectEntity_" + element.id, currentNode)[0];
		var targetclass = chckBoxNode ? chckBoxNode.ltProp("class") : "", ret;
		// var targetclass = targetRow && targetRow.length ? targetRow[0].querySelector('.crmlistview-canvas-selectionbox').ltProp("class") : $("#"+element.id+" lyte-checkbox")[0].ltProp("class"); //eslint-disable-line @zoho/webperf/no-complex-selector
		// var targetclass=  $("#"+element.id+" lyte-checkbox",this.$node)[0].component.data.ltPropClass
		if (event && event.shiftKey === true && prevSelectedId && prevSelectedId !== element.id) {
			let selectEntityNode = $L("#selectEntity_" + prevSelectedId, currentNode)[0];
			if (selectEntityNode) {
				var startIndex = selectEntityNode.component.data.dataRecnum - 1; //No I18n
				// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
				var endIndex = $L("#selectEntity_" + element.id, currentNode)[0].component.data.dataRecnum - 1; //No I18n
				var fromIndex = this.data.startIndex;//No I18n
				startIndex = startIndex - fromIndex;
				endIndex = endIndex - fromIndex;
				var tempId;
				/* eslint-disable no-redeclare */
				if (targetclass === "cxListVwCustomCheckBox") {
					if (endIndex < startIndex) {
						for (var i = startIndex; i >= endIndex; i--) {
							if (selectedIds.length === this.data.cxPropMaxSelectCount) {
								if(this.getMethods("onBeforeShowErrorAlert")){
									ret = this.executeMethod("onBeforeShowErrorAlert" , "maxLimitReached");
								}
								if(ret !== false){
									_cruxUtils.showCustomAlert({ params: { ltPropPrimaryMessage: _cruxUtils.getI18n("crm.listview.maximum.records.alert", this.data.cxPropMaxSelectCount) } });
								}
								break;
							}
							if (this.waitingForApproval(cvrecords[i], undefined)) {
								continue;
							}
							tempId = cvrecords[i].id;
							if (!selectedIds.includes(tempId)) {
								this.selectEntityCommon(tempId, "cxListVwCustomCheckBox", undefined, undefined, customOuter, targetRow);
								if(this.getMethods("onCheckBoxChanged")){
									this.executeMethod("onCheckBoxChanged",cvrecords[i],"selected");
								}
							}
						}
					}
					else {
						for (var i = startIndex; i <= endIndex; i++) {
							if (selectedIds.length === this.data.cxPropMaxSelectCount) {
								if(this.getMethods("onBeforeShowErrorAlert")){
									ret = this.executeMethod("onBeforeShowErrorAlert" , 'maxLimitReached');
								}
								if(ret !== false){
									_cruxUtils.showCustomAlert({ params: { ltPropPrimaryMessage: _cruxUtils.getI18n("crm.listview.maximum.records.alert", this.data.cxPropMaxSelectCount) } });
								}
								break;
							}
							if (this.waitingForApproval(cvrecords[i], undefined)) {
								continue;
							}
							tempId = cvrecords[i].id;
							if (!selectedIds.includes(tempId)) {
								this.selectEntityCommon(tempId, "cxListVwCustomCheckBox", undefined, undefined, customOuter, targetRow);
								if(this.getMethods("onCheckBoxChanged")){
									this.executeMethod("onCheckBoxChanged",cvrecords[i],"selected");
								}
							}
						}
					}

				}
				else if (endIndex < startIndex) {
					for (var i = startIndex; i >= endIndex; i--) {
						tempId = cvrecords[i].id;
						if (selectedIds.includes(tempId)) {
							this.selectEntityCommon(tempId, "cxListVwCustomCheckBoxChecked", undefined, undefined, customOuter, targetRow);
							if(this.getMethods("onCheckBoxChanged")){
								this.executeMethod("onCheckBoxChanged",cvrecords[i],"unselected");
							}
						}
					}
				}
				else {
					for (var i = startIndex; i <= endIndex; i++) {
						tempId = cvrecords[i].id;
						if (selectedIds.includes(tempId)) {
							this.selectEntityCommon(tempId, "cxListVwCustomCheckBoxChecked", undefined, undefined, customOuter, targetRow);
							if(this.getMethods("onCheckBoxChanged")){
								this.executeMethod("onCheckBoxChanged",cvrecords[i],"selected");
							}
						}
					}
				}
				/* eslint-enable no-redeclare */
				selectedObj = { "selectedIds": selectedIds, "per_page": this.data.cxPropPerPage, "page": this.getData("cxPropPage"), "module": this.getData("cxPropModule"), "start_index": this.data.startIndex}; //No I18n
				this.observeSelectedIds(selectedObj); //No I18N
				return false;
			}
		}


		//shift logic
		if (selectedIds.length === this.data.cxPropMaxSelectCount && targetclass !== "cxListVwCustomCheckBoxChecked") {
			if(this.getMethods("onBeforeShowErrorAlert")){
				ret = this.executeMethod("onBeforeShowErrorAlert" ,  "maxLimitReached");
			}
			if(ret !== false){
				_cruxUtils.showCustomAlert({ params: { ltPropPrimaryMessage: _cruxUtils.getI18n("crm.listview.maximum.records.alert", this.data.cxPropMaxSelectCount) } });
			}
		} else {
			this.selectEntityCommon(element.id, targetclass);
			var index=$L("#selectEntity_" + element.id, currentNode)[0].component.data.dataRecnum - 1- this.data.startIndex;
			if(this.getMethods("onCheckBoxChanged")){
				this.executeMethod("onCheckBoxChanged",cvrecords[index],this.data.cxPropSelectedIds.indexOf(cvrecords[index].id)>-1 ? "selected" : "unselected");
			}
		}
	},
	waitingForApproval: function (rec, featureName) {
		var approval = rec.$approved === false && rec.$approval.resubmit === false;
		if (rec.$stop_processing && !("COMPLIANCE" === featureName) || approval || rec.$in_merge === true || rec.$approval_state === "review_process_pending") {
			return true;
		}
		return false;
	},
	selectEntityCommon: function (elementId, targetclass, targetId, targetElem, customOuter, targetRow, from, selectedObj) {
		var _self = this;
		var selectedIds = this.data.cxPropSelectedIds;
		if (!from) {
			from = "listview";
		}

		// var trElems=$L("lyte-exptable-tr" ,$L("#"+elementId)).prevObject[0]
		var trElems = this.$node.querySelectorAll("lyte-exptable-tr[id='" + elementId + "']"); //No I18n
		trElems.forEach(function (trElem) {

			targetElem = trElem.querySelector('lyte-checkbox');
			var checkBoxSpan = targetElem.querySelector('span');
			if (targetclass === 'cxListVwCustomCheckBox' && elementId !== "selectAllEntity") {
				if (selectedIds.indexOf(elementId) === -1) {
					_self.internalSelectionChange = true;
					Lyte.arrayUtils(selectedIds, 'push', elementId);
				}

				targetElem.ltProp('class', 'cxListVwCustomCheckBoxChecked');
				checkBoxSpan.classList.remove("cxListVwCustomCheckBox"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBoxChecked"); //No I18n
				trElem.classList.add("cxLvTableRowSelected");//No I18n
			}
			else {
				if (selectedIds.indexOf(elementId) > -1) {
					_self.internalSelectionChange = true;
					Lyte.arrayUtils(selectedIds, "removeAt", selectedIds.indexOf(elementId), 1);//No I18n
				}
				targetElem.ltProp("class", "cxListVwCustomCheckBox");//No I18n
				checkBoxSpan.classList.remove("cxListVwCustomCheckBoxChecked"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBox"); //No I18n
				trElem.classList.remove("cxLvTableRowSelected");//No I18n
			}
			if (targetId !== "selectedIds" && from === "listview") {
				_self.setData("prevSelectedId", elementId); //No I18n
				selectedObj = { "selectedIds": selectedIds, "page": _self.data.cxPropPage, "per_page": _self.data.cxPropPerPage, "module": _self.getData("cxPropModule"), "start_index": _self.data.start_index};
				if ($L(trElem, this.$node).parents('.lyteExpTableOrigTableInnerWrap').length) {
					_self.observeSelectedIds(selectedObj);//No I18n
				}
			}
		});
	},
	observeSelectedIds: function (selectedObj) {
		var Lv_rec=this.data.LvContent || [];
		var className = "cxListVwPartialselect";//No I18n
		var selectedIdLen = selectedObj.selectedIds.length;
		var uncheckedCheckboxCount = selectedObj.unCheckedEntitiesCount;
		// if( selectedObj && selectedObj.data){
		// 	parentContainer = $L("#"+selectedObj.data,this.$node);
		// }
		let currentNode = this.$node;
		if (uncheckedCheckboxCount !== 0 && uncheckedCheckboxCount === undefined) {
			// if(selectedObj.data){
			// 	uncheckedCheckboxCount =  parentContainer.find(".cxListVwCustomCheckBox[data-cid=selectEntity]").length; //eslint-disable-line @zoho/webperf/no-attribute-selectors
			// }else{
			uncheckedCheckboxCount = $L(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup .cxListVwCustomCheckBox", currentNode).length;
			// }
		}
		// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
		var checkedCheckboxCount = $L(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup .cxListVwCustomCheckBoxChecked", currentNode).length; //No i18n
		if (selectedIdLen === 0) {
			className = "cxListVwCustomCheckBox";//No I18n
		}
		if ((Lv_rec.length === 1 || uncheckedCheckboxCount === 0) && selectedIdLen >= 1) {
			className = "cxListVwCustomCheckBoxChecked";//No I18n
		}
		if (checkedCheckboxCount === 0) {
			className = "cxListVwCustomCheckBox";//No I18n
		}
		if (className === "cxListVwCustomCheckBoxChecked") {
			selectedObj.showSelectDiv = true;
			// this.checkSelectedDiv();
		}
		if (className === "cxListVwPartialselect" && selectedIdLen < this.data.cxPropPerPage) {
			if (checkedCheckboxCount >= selectedIdLen && uncheckedCheckboxCount !== 0) {
				this.setData("showSelectedDiv", false); //No I18n
			} else {
				this.setData("showSelectedDiv", selectedObj.showSelectDiv); //No I18n
			}

		}
		var tarElems = this.$node.querySelectorAll("[id='selectCheckbox']"); //No i18n
		tarElems.forEach(function (tarElem) {
			if (tarElem) {
				var targetSpan = tarElem.querySelector("span"); //No i18n
				targetSpan.classList = "";
				targetSpan.classList = className;
				tarElem.ltProp("class", className); //No i18n					
			}
		});
		if (this.data.from === 'listview') {
			if (className === "cxListVwCustomCheckBoxChecked" && this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1) {
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1 ){
				Lyte.arrayUtils(this.getData('selectViewArray'), 'push', this.data.cxPropPage);
				// }
			}
			else if ((className === "cxListVwCustomCheckBox" || className === "cxListVwPartialselect") && this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1) {
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1){
				Lyte.arrayUtils(this.data.selectViewArray, "removeAt", this.data.selectViewArray.indexOf(this.data.cxPropPage), 1);
				// }
			}
			if (this.data.selectViewArray.length > 0) {
				this.setData("showSelectedDiv", true);
			} else {
				this.setData("showSelectedDiv", false);
			}

			// if(this.data.per_page>=this.data.total_count){
			// 	this.setData('showSelectedDiv',false)
			// }

		}
		// this.data.cxPropSelectedIds.length ? this.setData('showActionBtn', true) : this.setData('showActionBtn', false);
	},
	selectAllEntity: function (clear, select, selectOnlineEntities, selectedIds, selectedObj) {
		selectedIds = this.getData("cxPropSelectedIds");//No I18n
		this.setData('prevSelectedId', "");
		var selected = false , targetElem;
		targetElem = this.$node.querySelector("[id='selectCheckbox']");
		selectedObj = selectedObj ? selectedObj : { "selectedIds": selectedIds, "page": this.getData("cxPropPage"), "per_page": this.data.cxPropPerPage, "module": this.getData("cxPropModule"), "start_index": this.getData("start_index") }; //No I18n
		var _self = this, done = false;
		var onlineSelected = true;

		var targetClass = targetElem ? targetElem.ltProp("class") : "cxListVwCustomCheckBoxChecked";
		var cv_records = this.data.LvContent || [];
		var customViewRecordsLen = cv_records.length , ret;
		/* eslint-disable no-redeclare */

		if (targetClass === 'cxListVwCustomCheckBox' && !clear || select && targetClass === 'cxListVwPartialselect') {
			var toPush = [] , retVal;
			if (!done) {
				// var displayOnlineEntities = false;
				for (var i = 0; i < customViewRecordsLen; i++) {
					if (selectedIds.length + toPush.length === this.data.cxPropMaxSelectCount) {
						if(this.getMethods("onBeforeShowErrorAlert")){
							ret = this.executeMethod("onBeforeShowErrorAlert" ,  "maxLimitReached");
						}
						if(ret !== false){
							_cruxUtils.showCustomAlert({ params: { ltPropPrimaryMessage: _cruxUtils.getI18n("crm.listview.maximum.records.alert", this.data.cxPropMaxSelectCount) } });
						}
						selectedObj.showSelectDiv = false;
						selected = false;
						break;
					}
					selected = true;
					if (!_self.waitingForApproval(cv_records[i]) && selectedIds.indexOf(cv_records[i].id) === -1) {
						var trs = this.$node.querySelectorAll("lyte-exptable-tr[id='" + cv_records[i].id + "']"), pushDone = false;  //No I18n
						if (selectOnlineEntities) {
							onlineSelected = false;
							continue;
						}
						if(this.getMethods("onCheckboxBeforeChecked")){
							retVal = this.executeMethod("onCheckboxBeforeChecked",cv_records[i]);
						}
						if(retVal !== false){
							toPush.push(cv_records[i].id);
							this.loopFunctionCall(trs);
							if(this.getMethods("onCheckBoxChanged")){
								this.executeMethod("onCheckBoxChanged",cv_records[i],"selected");
							}
						}

						// trs.forEach(function(tr){
						// 	var chk=tr.querySelector("lyte-checkbox");//No I18n
						// 	if(chk && chk.ltProp("class") == "cxListVwCustomCheckBox"){
						// 		chk.ltProp("class","cxListVwCustomCheckBoxChecked");  //
						// 		tr.style.backgroundColor ="setTdBorBtm";
						// 		var checkBoxSpan =  chk.querySelector("span");  //no i18n
						// 		checkBoxSpan.classList.remove("cxListVwCustomCheckBox"); //No I18n
						// 		checkBoxSpan.classList.add("cxListVwCustomCheckBoxChecked"); //No I18n
						// 		tr.classList.add("cxLvTableRowSelected");//No I18n
						// 	}
						// })
					}
				}
				if (selectedObj.per_page < _self.getData("cxPropRecordCount")) {
					this.setData('showSelectDiv', true);
					selectedObj.showSelectDiv = true;
				}

			}
			this.internalSelectionChange = true;
			Lyte.arrayUtils(selectedIds, "push", toPush);//No I18n
		} else if (!done) {
			for (var i = 0; i < customViewRecordsLen; i++) {
				var index = selectedIds.indexOf(cv_records[i].id);
				var trs = this.$node.querySelectorAll("lyte-exptable-tr[id='" + cv_records[i].id + "']"), pushDone = false;
				this.loopFunctionCall2(trs);
				if (!pushDone && index > -1) {
					if(this.getMethods("onCheckBoxChanged")){
						this.executeMethod("onCheckBoxChanged",cv_records[i],"unselected");
					}
					this.internalSelectionChange = true;
					Lyte.arrayUtils(selectedIds, "removeAt", index, 1);//No I18n		
					pushDone = true;
				}

			}
			var smartFilter = $L('crux-smart-filter');
			if (smartFilter.length > 0) {
				var smartFilterCriteria = smartFilter[0].component.getFilterCriteria();
				if (smartFilterCriteria && smartFilterCriteria.preventSaveFilter === 'competitor_alert') {
					var saveButton = $L('#saveBtn');
					if (saveButton.length > 0) {
						saveButton[0].component.setData('ltPropDisabled', true);
					}
				}
			}
		}
		/* eslint-enable no-redeclare */
		done = true;
		var targetElems = this.$node.querySelectorAll("[id='selectCheckbox']"); //No I18n
		targetElems.forEach(function (targetElem) {
			var checkBoxSpan = targetElem ? targetElem.querySelector("span") : undefined;  //no i18n
			if (selected && onlineSelected) {
				targetElem.ltProp("class", "cxListVwCustomCheckBoxChecked");//No I18n
				checkBoxSpan.classList.remove("cxListVwCustomCheckBox"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBoxChecked"); //No I18n						
			} else if (checkBoxSpan) {
				checkBoxSpan.classList.remove("cxListVwCustomCheckBoxChecked"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBox"); //No I18n
				targetElem.ltProp("class", "cxListVwCustomCheckBox");  //No I18n
			}
		});
		this.internalSelectionChange = true;
		this.setData('cxPropSelectedIds', selectedIds);
		if (clear) {
			this.internalSelectionChange = true;
			this.setData('cxPropSelectedIds', []);
		}
		this.observeSelectedIds(selectedObj);//No i18n
	},
	loopFunctionCall: function (trs) {
		trs.forEach(function (tr) {
			var chk = tr.querySelector("lyte-checkbox");//No I18n
			if (chk && chk.ltProp("class") === "cxListVwCustomCheckBox") {
				chk.ltProp("class", "cxListVwCustomCheckBoxChecked");  //
				tr.style.backgroundColor = "setTdBorBtm";
				var checkBoxSpan = chk.querySelector("span");  //no i18n
				checkBoxSpan.classList.remove("cxListVwCustomCheckBox"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBoxChecked"); //No I18n
				tr.classList.add("cxLvTableRowSelected");//No I18n
			}
		});
	},
	loopFunctionCall2: function (trs) {
		trs.forEach(function (tr) {
			var chk = tr.querySelector("lyte-checkbox");//No I18n
			if (chk && chk.ltProp("class") === "cxListVwCustomCheckBoxChecked") {
				chk.ltProp("class", "cxListVwCustomCheckBox");  //No I18N
				tr.style.backgroundColor = "";
				var checkBoxSpan = chk.querySelector("span");  //no i18n
				checkBoxSpan.classList.remove("cxListVwCustomCheckBoxChecked"); //No I18n
				checkBoxSpan.classList.add("cxListVwCustomCheckBox"); //No I18n
				tr.classList.remove("cxLvTableRowSelected");//No I18n
			}
		});
	},
	onRecordDeleteFailure:function(data){
		var res= JSON.parse(data.response);
		if(data.status === 403 || data.status === 401 || (data.status === 400 && (res.code === "NO_PERMISSION" || (res.data !== undefined && res.data[0].code === "NO_PERMISSION")))){
			if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
				renderingUtils.displayPermissionDenied();
			}
			return false;
		}else{
			var  smessage ; 
			if(res.message){
				res = {data : [res]};
			}
			if(res && res.data && res.data[0].code === "CANNOT_DELETE"){
				if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
					renderingUtils.displayPermissionDenied();
				}
				return false;
			}
			if(res && res.data && res.data.length > 1){
				var len = res.data.length;
				for(var i = 0 ; i < len ; i++){
					if(smessage !== undefined && smessage !== res.data[i].message){
						_cruxUtils.showCustomMessage({id : '', params : {ltPropType : 'error', ltPropMessage : _cruxUtils.getI18n("crm.massdelete.record.failure") , ltPropDuration : '4000'}});
						return true;
					}
					smessage = res.data[i].message;
				}
			}
			if(res && res.data[0] && (res.data[0].message === "Sorry, you cannot perform this operation as the record is locked." || res.data[0].message === "Cannot delete records under merge")){
				_cruxUtils.showCustomMessage({id : 'massDeleteLock', params : {ltPropType : 'error', ltPropMessage : _cruxUtils.getI18n("crm.massdelete.record.lock.failure") , ltPropDuration : '3000'}});
				return false;;
			}else if (data.status === 400 && res.data && (res.data[0].code === "INVALID_DATA" || res.data[0].code === "NOT_APPROVED")) {
				_cruxUtils.showCustomMessage({ id: '', params: { ltPropType: 'error', ltPropMessage: _cruxUtils.getI18n("crm.massdelete.record.failure"), ltPropDuration: '4000' } });
				return true;
			}else if(data.status==404 && res.data && res.data[0].code === "INVALID_URL_PATTERN" ){
				_cruxUtils.showCustomMessage({ id: '', params: { ltPropType: 'error', ltPropMessage: "The record you are trying to delete is Invalid.", ltPropDuration: '4000' } });
				return false;
			}
		}
	}

});

/**
 * @component crux-lookup-component
 * @author anuja.manoharan
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-lookup-component", {
_template:"<template tag-name=\"crux-lookup-component\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropField[cxPropFieldKey]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </template></template> <div class=\"cxLoadOnViewValue\"> {{cxPropValue}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"switch\" value=\"{{cxPropFrom}}\"><template case=\"view\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemCompPrefixVwDiv\" yield-name=\"prefixYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{showEmptyValue}}\"><template case=\"true\"> {{cxPropEmptyValue}} </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropValue}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropMaskingProperties}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> {{cruxMaskValue(concat(lookupValue,' - ',modulePluralLabel),cxPropMaskingProperties)}} </template><template case=\"false\"> {{cruxMaskValue(lookupValue,cxPropMaskingProperties)}} </template></template> </template><template case=\"false\"> <div class=\"cxLookupCompViewWrap\"> <link-to data-zcqa=\"{{cxPropZcqa}}\" lt-prop-route=\"{{cxPropRouteName}}\" lt-prop-dp=\"{{cxPropDynamicParams}}\" lt-prop-qp=\"{{cxPropQueryParams}}\" lt-prop-id=\"{{cxPropId}}\" lt-prop-td=\"{{cxPropTransitionData}}\" lt-prop-class=\"cxLink cxLookupViewWrapper\" class=\"cxLookupCompLink\" lt-prop-target=\"{{cxPropTarget}}\" onmousemove=\"{{action('showLookupBC',this,true)}}\" onmouseleave=\"{{action('showLookupBC',this)}}\" onclick=\"{{action('onLinkClick',event)}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropIconClass,'&amp;&amp;',lookupValue),'&amp;&amp;',expHandlers(cxPropHideIconForView,'!'))}}\"><template case=\"true\"> <div class=\"cxLookupViewIcon {{cxPropIconClass}}\"></div> </template></template> <lyte-text lt-prop-value=\"{{lookupValue}}\" lt-prop-show=\"{{cxPropTooltipShow}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" class=\"cruxPreventClick {{if(cxPropViewClipLabel,'','cxLookupCompWsNormal')}}\"></lyte-text> </link-to> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;),'&amp;&amp;',modulePluralLabel)}}\"><template case=\"true\"><span class=\"cxLookupCompSeparator\">-</span><lyte-text class=\"cxLookupCompMulModValue\" lt-prop-value=\"{{modulePluralLabel}}\"></lyte-text></template></template> <template is=\"if\" value=\"{{cxPropViewInfoTooltip}}\"><template case=\"true\"> <crux-view-info-tooltip cx-prop-field=\"{{cxPropField}}\" cx-prop-value=\"{{cxPropValue}}\" cx-prop-id=\"{{cxPropId}}\"> <template is=\"yield\" yield-name=\"viewInfoTooltipYield\"> <lyte-yield yield-name=\"viewInfoTooltipYield\" prop-field=\"{{propField}}\" prop-value=\"{{propValue}}\"></lyte-yield> </template> </crux-view-info-tooltip> </template></template> </div> </template></template> </template></template></template></template> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"suffixYield\" class=\"cxElemCompSuffixVwDiv\"></lyte-yield></template></template> </template><template case=\"create\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','asterisk')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> {{cxPropField[cxPropFieldKey]}} <template is=\"if\" value=\"{{expHandlers(cxPropMandatoryType,'==','required')}}\"><template case=\"true\"> <span class=\"cxMandatoryType\">{{cxPropMandatoryOption[cxPropMandatoryType]}}</span> </template></template> <template is=\"if\" value=\"{{cxPropInfoTooltip}}\"><template case=\"true\"> <span class=\"dIB vam cxInfoIcon\" onmouseenter=\"{{action('showInfoTooltip',this)}}\"></span> <lyte-hovercard lt-prop-placement=\"topLeft\" lt-prop-keep-alive=\"true\" lt-prop-popover-wrapper-class=\"cxElementsHovercard\" lt-prop-origin-elem=\".cxCurrentHovercard\" on-hovercard-hide=\"{{method('hideInfoTooltip')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxElementsHoverCardContent\"> {{cxPropInfoTooltip}} </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> </template></template> <div class=\"{{elementClass}}\" onfocus=\"{{action('onFocusInput')}}\" onfocusout=\"{{action('onFocusInput',true)}}\"> <div @class=\"cxLookupComponent cxBoxWithRightIcon cxYieldObserverElemComp {{cxPropDivWrapperClass}} {{cxPropWrapperClass}} {{if(cxPropDisplayIconOnLeft,'cxBoxWithLeftIcon','')}}\"> <div class=\"cxBoxLeftContent\"> <template is=\"if\" value=\"{{expHandlers(cxPropPrefixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> <crux-dropdown data-zcqa=\"{{cxPropZcqa}}_module_dropdown\" cx-prop-icon-class=\"{{cxPropDropdownIconClass}}\" cx-prop-is-dropdown-icon-node=\"true\" class=\"cxMultiModuleDropdown {{if(ifEquals(modId,moduleDisabledList[0]),'cxDropdownLabelDisabled','')}}\" cx-prop-options=\"{{multiModuleModules}}\" cx-prop-user-value=\"plural_label\" cx-prop-system-value=\"id\" cx-prop-type=\"single\" on-option-select=\"{{method('multiModuleSelect')}}\" cx-prop-disabled-list=\"{{moduleDisabledList}}\" on-before-show=\"{{method('moduleDropdownBeforeShow')}}\" cx-prop-selected=\"{{modId}}\" cx-prop-disabled=\"{{cxPropReadonly}}\" on-show=\"{{moduleDropdownOnShow}}\" on-hide=\"{{moduleDropdownOnHide}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{cxPropAutocomplete}}\"><template case=\"true\"> <lyte-autocomplete lt-prop-dropdown-class=\"cxLookupDropbox cxDropbox\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-input=\"{&quot;prefixYield&quot;:{{cxPropPrefixYield}}, &quot;suffixYield&quot;:{{cxPropSuffixYield}}, &quot;class&quot;:&quot;cxLookupCompInputElem&quot;}\" lt-prop-trim=\"true\" lt-prop-title=\"{{tooltip}}\" lt-prop-tooltip-config=\"{{cxPropTooltipConfig}}\" lt-prop-tooltip-class=\"{{cxPropTooltipClass}}\" lt-prop-prevent-inside-click=\"true\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" on-select=\"{{method('autoComp')}}\" lt-prop-dropdown-height=\"250px\" lt-prop-yield=\"true\" lt-prop-appearance=\"{{cxPropAppearance}}\" lt-prop-highlight=\"false\" lt-prop-min-length=\"{{cxPropMinLength}}\" lt-prop-value-set=\"true\" on-scroll=\"{{method('scrollRecord')}}\" lt-prop-autofocus=\"{{cxPropAutofocus}}\" on-before-show=\"{{method('beforeShow')}}\" lt-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-readonly=\"{{cxPropReadonly}}\" lt-prop-placeholder=\"{{cxPropPlaceholder}}\" id=\"{{cxPropId}}\" lyte-hovercard=\"{{if(cxPropErrorOnHovercard,'true','false')}}\" class=\"{{cxPropClass}} {{if(isError,'cxErrorBox')}} {{if(negate(lookupSingle),'cxLookupNoValueSel','')}} {{if(showLoading,'cxLookupInputLoading')}}\" lt-prop-maxlength=\"{{cxPropMaxlength}}\" lt-prop-error-class=\"noErrClass\" on-focus=\"{{method('autoFocus')}}\" lt-prop-external-search=\"true\" on-ext-search=\"{{method('beforeSearch')}}\" on-blur=\"{{method('onBlurInput')}}\" after-render=\"{{method('afterRenderAutocomplete')}}\" lt-prop-aria-attributes=\"{{cxPropAriaAttributes}}\" on-hide=\"{{method('onHideDropdown')}}\" lt-prop-id=\"{{cxPropInputId}}\" lt-prop-dropdown=\"{{dropdownProp}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" onfocusout=\"{{action('onFocusInput',true)}}\" onkeydown=\"{{action('onkeydownFn')}}\" lt-prop-open-on-focus=\"{{cxPropOpenOnFocus}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\" on-show=\"{{method('onShowDropdown')}}\"> <template is=\"registerYield\" yield-name=\"lyte-input-prefix\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"><div class=\"cxElemCompPrefixDiv\"> <lyte-yield yield-name=\"prefixYield\"></lyte-yield> </div></template></template> </template> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"{{cxPropBoxClass}}\"> <lyte-drop-body class=\"{{if(visible,'cxVisibleLookup')}}\"> <template is=\"if\" value=\"{{expHandlers(minimumSearchCharacter,'>',0)}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\"> {{cruxGetI18n('crm.chosen.minimum.input.text',minimumSearchCharacter)}} </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(initComp,'&amp;&amp;',expHandlers(ften.length,'>',0))}}\"><template case=\"true\"><template is=\"for\" items=\"{{ften}}\" item=\"val\" index=\"index\"> <lyte-drop-item data-value=\"{{val.id}}\" class=\"lookupSearchLi\" data-zcqa=\"{{val[displayField]}}\" onmouseenter=\"{{action('showHideIcon1',true,val)}}\" onmouseleave=\"{{action('showHideIcon1',false,val)}}\"> <lyte-autocomplete-label> <lyte-text class=\"cxLookupDropboxLabel\" lt-prop-value=\"{{val[displayField]}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropShowHideTooltip}}\"><template case=\"true\"> <span class=\"cxLookupInfoIcon {{if(val.cxPropShowIcon,'cruxLookupPopover')}}\" onmouseenter=\"{{action('infoPop',this,val,event)}}\" onmouseleave=\"{{action('infoPop',this,val,event)}}\" style=\"{{if(val.cxPropShowIcon,'visibility: visible;','visibility: hidden')}}\"></span> </template></template> </lyte-autocomplete-label> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(initComp,'&amp;&amp;',expHandlers(expHandlers(ften,'!'),'||',expHandlers(ften.length,'===',0)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{searchPerformed}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\">{{cruxGetI18n('crm.template.listview.search.no.results')}}</div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(minimumSearchCharacter,'>',0)}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\"> {{cruxGetI18n('crm.chosen.minimum.input.text',minimumSearchCharacter)}} </div> </template><template case=\"false\"> <div class=\"cxDropdownNoResult\">{{if(module.singular_label,cruxGetI18n('crm.krp.no.records.found',module.singular_label),cruxGetI18n('crm.template.listview.search.no.results'))}}</div> </template></template> </template></template> </template></template></template></template> </template></template> <template is=\"if\" value=\"{{showDropdownLoading}}\"><template case=\"true\"><div class=\"cxloaderWrapper\"> <span class=\"cxSpinloader\"></span> </div></template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"><lyte-drop-footer><lyte-yield yield-name=\"footer\"></lyte-yield></lyte-drop-footer></template></template> </lyte-drop-box> </template> <template is=\"registerYield\" yield-name=\"lyte-input-suffix\"> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </template> </lyte-autocomplete> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropType,'===',&quot;multi_module_multi_select&quot;)}}\"><template case=\"true\"> <div> <lyte-button lt-prop-class=\"cxMsmmLookupBtn\" data-zcqa=\"\" lt-prop-id=\"\" lt-prop-appearance=\"default\" onclick=\"{{action('showLookup')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{if(selectedRecsCount,selectedRecsCount,'Add')}} {{cxPropHeaderSuffix}}</template> </lyte-button> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropDisabled}}\"><template case=\"true\"> <lyte-input class=\"cxLookupCompDisabledInput\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" lt-prop-disabled=\"true\"></lyte-input> </template><template case=\"false\"> <lyte-input class=\"cxLookupCompReadonlyInput\" lt-prop-update-delay=\"{{cxPropUpdateDelay}}\" lt-prop-callback-delay=\"{{cxPropCallbackDelay}}\" lt-prop-appearance=\"{{cxPropAppearance}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-value=\"{{lookupSingle}}\" lt-prop-readonly=\"true\" onclick=\"{{action('showLookup',event)}}\" lt-prop-id=\"{{cxPropInputId}}\" on-blur=\"{{method('onBlurCallback')}}\"></lyte-input> </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropShowDisabledIcon}}\"><template case=\"true\"><span class=\"cxElementsDisabledIcon {{cxPropDisabledIconClass}}\"></span></template></template> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxBoxSpinWrapper cxFlexCenter\"> <span class=\"cxElementsLoaderBg\" id=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}_loadimg\"></span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropAutocomplete,'&amp;&amp;',expHandlers(cxPropDisabled,'!')),'&amp;&amp;',expHandlers(cxPropReadonly,'!')),'&amp;&amp;',expHandlers(cxPropShowCloseIcon,'||',expHandlers(expHandlers(cxPropShowCloseIcon,'!'),'&amp;&amp;',lookupSingle)))}}\"><template case=\"true\"> <div class=\"cxBoxCloseIconWrap cxFlexCenter\"> <div id=\"Crm_lookup_img_Crm_{{cxPropModule}}_{{cxPropField.column_name}}\" tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" class=\"cxBoxCloseIcon cP {{cxPropClearIconClass}}\" onclick=\"{{action('clearlookupField')}}\" data-zcqa=\"lookup_Crm_{{cxPropModule}}_{{cxPropField.column_name}}_close\"></div> </div> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSuffixYield,'&amp;&amp;',expHandlers(cxPropAutocomplete,'!'))}}\"><template case=\"true\"><div class=\"cxElemCompSuffixVwDiv\"> <lyte-yield yield-name=\"suffixYield\"></lyte-yield> </div></template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropShowDisabledIcon,'!'),'&amp;&amp;',expHandlers(cxPropType,'!==',&quot;multi_module_multi_select&quot;))}}\"><template case=\"true\"> <div tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" class=\"cxLookupIcon cxBoxRightIcon cxFlexCenter cP {{cxPropRightIconClass}}\" onclick=\"{{action('showLookup',event)}}\" data-zcqa=\"{{if(cxPropImgZcqa,cxPropImgZcqa,concat('lookup_',cxPropZcqa))}}\" onkeydown=\"{{action('showLookupOnKeyEvent',event,this)}}\"> <div class=\"{{cxPropIconClass}}\" data-label=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}\" id=\"Crm_{{cxPropModule}}_{{cxPropField.column_name}}_img\" tabindex=\"{{cxPropField.tab_index}}\" lt-prop-title=\"{{cxPropIconTooltip}}\"></div> </div> </template></template> <template is=\"if\" value=\"{{renderLookup}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropAdvanceSearchEnabled}}\"><template case=\"true\"> <crux-lookup-filter-modal cx-prop-field-of-lookup-val=\"{{cxPropFieldOfLookupVal}}\" cx-prop-search-placeholder=\"{{cxPropSearchPlaceholder}}\" cx-prop-modal-wrapper-class=\"{{cxPropModalWrapperClass}}\" cx-prop-disable-search=\"{{cxPropDisableSearch}}\" cx-prop-parent-module=\"{{cxPropParentModule}}\" cx-prop-default-criteria=\"{{cxPropDefaultCriteria}}\" cx-prop-default-criteria-str=\"{{cxPropDefaultCriteriaStr}}\" module=\"{{lbind(module)}}\" show=\"{{cxPropShow}}\" disp-init=\"{{dispInit}}\" fetch-module-data=\"{{method('fetchModule')}}\" fetch-records=\"{{method('fetchRecordsData')}}\" mod-id=\"{{modId}}\" display-field=\"{{lbind(displayField)}}\" is-single=\"{{isSingle}}\" record=\"{{lbind(record)}}\" selected-single=\"{{selectedSingle.id}}\" selected-single-record=\"{{lbind(selectedSingle)}}\" lookup-single=\"{{lbind(lookupSingle)}}\" module-name=\"{{lbind(moduleName)}}\" on-value-change=\"{{method('triggerOnValueChange')}}\" cx-prop-value=\"{{cxPropValue}}\" render-lookup=\"{{lbind(renderLookup)}}\" fields-obj=\"{{moduledataUicomp}}\" cx-prop-create-yield=\"{{cxPropCreateYield}}\" temp-close=\"{{lbind(tempClose)}}\" id-index=\"{{idIndex}}\" cx-prop-related-id=\"{{cxPropRelatedId}}\" cx-prop-related-module-id=\"{{cxPropRelatedModuleId}}\" cx-prop-related-name=\"{{cxPropRelatedName}}\" cx-prop-dont-show-related-dropdown=\"{{cxPropDontShowRelatedDropdown}}\" cx-prop-field=\"{{moduledataUicomp}}\" cx-prop-return-full-object-on-get=\"{{cxPropReturnFullObjectOnGet}}\" cx-prop-default-fields=\"{{cxPropDefaultFields}}\" related-record-data=\"{{cxPropRelatedRecordData}}\" cx-prop-additional-params=\"{{cxPropAdditionalParams}}\" on-close=\"{{method('modalClosed')}}\" cx-prop-query-param=\"{{cxPropQueryParam}}\" is-related-record-passed=\"{{if(cxPropRelatedRecordData.length,true,false)}}\" before-request-change-data=\"{{method('changeDataMethod')}}\" cx-prop-all-fields-needed=\"{{cxPropAllFieldsNeeded}}\" cx-prop-profile-id=\"{{cxPropProfileId}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" on-module-get-success=\"{{method('moduleSuccess')}}\" cx-prop-show-all-fields=\"{{cxPropShowAllFields}}\"> <template is=\"yield\" yield-name=\"createYield\"><lyte-yield yield-name=\"createYield\"></lyte-yield></template> </crux-lookup-filter-modal> </template><template case=\"false\"> <crux-lookup-modal cx-prop-fetch-records-on-enter=\"{{cxPropFetchRecordsOnEnter}}\" cx-prop-search-format=\"{{cxPropSearchFormat}}\" module-data=\"{{moduleData}}\" cx-prop-disable-search=\"{{cxPropDisableSearch}}\" moduledata-uicomp=\"{{moduledataUicomp}}\" api-name=\"{{apiName}}\" query-param-object=\"{{lbind(queryParamObject)}}\" related-field-comp=\"{{lbind(relatedFieldComp)}}\" advanced-search=\"{{Crm.userDetails.isLookupAdvancedSearchEnabled}}\" column-list=\"{{Crm.userDetails.isLookupAdvancedSearchEnabled}}\" related-to=\"{{lbind(relatedTo)}}\" record=\"{{lbind(record)}}\" cx-prop-mod-id=\"{{modId}}\" disp-init=\"{{dispInit}}\" rendered-page=\"{{lbind(renderedPage)}}\" selected-single=\"{{selectedSingle.id}}\" selected-single-record=\"{{lbind(selectedSingle)}}\" display-field=\"{{lbind(displayField)}}\" is-single=\"{{isSingle}}\" cx-prop-field-type-mapping=\"{{uiTypeMapping}}\" cx-prop-related-record-data=\"{{cxPropRelatedRecordData}}\" lookup-single=\"{{lbind(lookupSingle)}}\" module-name=\"{{lbind(moduleName)}}\" module=\"{{lbind(module)}}\" cx-prop-per-page=\"10\" cx-prop-show=\"{{lbind(cxPropShow)}}\" rep-record=\"{{lbind(repRecord)}}\" fld-id=\"{{fldId}}\" relations=\"{{lbind(relations)}}\" fetch-module-data=\"{{method('fetchModule')}}\" cx-prop-value=\"{{modalCxValue}}\" fetch-records=\"{{method('fetchRecordsData')}}\" cx-prop-field=\"{{moduledataUicomp}}\" on-create-new=\"{{method('createNew')}}\" cx-prop-related-to=\"{{cxPropRelatedTo}}\" on-value-change=\"{{method('triggerOnValueChange')}}\" cx-prop-create-yield=\"{{cxPropCreateYield}}\" cx-prop-header=\"{{cxPropHeader}}\" meta-more-records=\"{{cxPropMetaMoreRecords}}\" cx-prop-fields=\"{{cxPropFields}}\" cx-prop-related-id=\"{{cxPropRelatedId}}\" cx-prop-related-module-id=\"{{cxPropRelatedModuleId}}\" cx-prop-related-name=\"{{cxPropRelatedName}}\" cx-prop-meta-more-records=\"{{cxPropMetaMoreRecords}}\" cx-prop-dont-show-related-dropdown=\"{{cxPropDontShowRelatedDropdown}}\" on-close=\"{{method('modalClosed')}}\" cx-prop-return-full-object-on-get=\"{{cxPropReturnFullObjectOnGet}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" cx-prop-query-param=\"{{cxPropQueryParam}}\" cx-prop-search-fields=\"{{cxPropSearchFields}}\" cx-prop-module-options=\"{{cxPropModuleOptions}}\" cx-prop-enable-customview=\"{{cxPropEnableCustomview}}\" cx-prop-header-suffix=\"{{cxPropHeaderSuffix}}\" cx-prop-additional-participants=\"{{cxPropAdditionalParticipants}}\" cx-prop-type=\"{{cxPropType}}\" cx-prop-enable-column-sort=\"{{cxPropEnableColumnSort}}\" cx-prop-assignee-module-name=\"{{cxPropAssigneeModuleName}}\" cx-prop-modal-property=\"{{stringify(cxPropModalProperty)}}\" on-assign=\"{{method('selectedConfirm')}}\" on-unassign-all=\"{{method('onUnassignAll')}}\" on-unassign=\"{{method('unassignRecords')}}\" before-request-change-data=\"{{method('changeDataMethod')}}\" fetch-total-count=\"{{method('fetchTotalCountFn')}}\" on-save-columns=\"{{method('onSaveColumnsFn')}}\" on-apply-filter=\"{{method('onApplyFilterFn')}}\" on-clear-filter=\"{{method('onClearFilterFn')}}\"> <template is=\"yield\" yield-name=\"createYield\"><lyte-yield yield-name=\"createYield\"></lyte-yield></template> </crux-lookup-modal> </template></template></template></template> </div> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"><lyte-yield class=\"cxElemButtonYield\" yield-name=\"buttonYield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{cxPropShowWarning}}\"><template case=\"true\"> <div class=\"cxFieldWarningMsg\"><span class=\"cxPropWarningIconSpacing {{cxPropWarningIconClass}}\"></span> <span class=\"cxPropWarningMsgTxt lyteTextEllipsisNode\">{{unescape(cxPropWarningMessage)}}</span></div> {{addMurhyInfo(\"crux-lookup-component.html\",\"Feb Default Changes\")}} </template><template case=\"false\"><template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-error-unescape-arguments=\"{{cxPropErrorUnescapeArguments}}\" cx-prop-id=\"{{cxPropId}}\" cx-prop-origin-elem=\"#{{cxPropId}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\" cx-prop=\"{{checkElementsData(this,childCompProps)}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template></template></template> </div> </template><template case=\"filter\"></template><template case=\"criteria\"> <div class=\"cxLookupMultiModuleWrap\"> <template is=\"if\" value=\"{{expHandlers(cxPropHideTextComponent,'!')}}\"><template case=\"true\"> <crux-text-component id=\"lookupTextComponent\" cx-prop-from=\"criteria\" on-value-change=\"{{method('changeValue')}}\" cx-prop-login-user=\"{{cxPropShowLoggedInUser}}\" on-error=\"{{method('textError')}}\" cx-prop-value=\"{{lookupValue}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-tab-index=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-field=\"{{cxPropField}}\"></crux-text-component> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==',&quot;multi_module_lookup&quot;)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-lookup-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{negate(cxPropHideTextComponent)}}\"><template case=\"true\"><span class=\"cxMMLSeperator\">{{cruxGetI18n('crm.label.simply.in')}}</span></template></template> <crux-dropdown class=\"cxMultiModuleCriteriaDropdown\" cx-prop-options=\"{{multiModuleModules}}\" cx-prop-user-value=\"plural_label\" cx-prop-system-value=\"id\" cx-prop-type=\"single\" on-option-select=\"{{method('multiModuleSelect')}}\" cx-prop-disabled-list=\"{{moduleDisabledList}}\" cx-prop-selected=\"{{modId}}\" on-show=\"{{moduleDropdownOnShow}}\" on-hide=\"{{moduleDropdownOnHide}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{isError}}\"><template case=\"true\"> <crux-error-message cx-prop-error-unescape-arguments=\"{{cxPropErrorUnescapeArguments}}\" cx-prop-id=\"{{cxPropId}}\" error-message=\"{{cxPropErrorMessage}}\" cx-prop-error-yield=\"{{cxPropErrorYield}}\" cx-prop-error-zcqa-prefix=\"{{cxPropErrorZcqaPrefix}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-error-zcqa-suffix=\"{{cxPropErrorZcqaSuffix}}\" class=\"{{cxPropErrorClass}}\" cx-prop-error-span-class=\"{{cxPropErrorSpanClass}}\" cx-prop-aria-error-properties=\"{{cxPropAriaErrorProperties}}\"> <template is=\"registerYield\" yield-name=\"errorYield\"><lyte-yield yield-name=\"errorYield\" error-message=\"{{cxPropErrorMessage}}\" cx-field=\"{{cxPropField}}\"></lyte-yield></template> </crux-error-message> </template></template> </div> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"attr","position":[2,1]},{"type":"if","position":[2,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"view":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"create":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"text","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1],"trans":true},{"type":"attr","position":[3,1,1,1]},{"type":"if","position":[3,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,1,3]},{"type":"if","position":[3,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,1,5]},{"type":"if","position":[3,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["val.cxPropShowIcon","'visibility: visible;'","'visibility: hidden'"]}}}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,1,7]},{"type":"if","position":[3,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3,1,1,9]},{"type":"if","position":[3,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,1,1,11]},{"type":"if","position":[3,1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,5]},{"type":"if","position":[3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,2,0]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"filter":{"dynamicNodes":[],"additional":{"next":"criteria"}},"criteria":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropElementProps","childCompProps","cxPropErrorOnHovercard","lyteViewPort","cxPropDefaultCriteria","cxPropFieldOfLookupVal","cxPropParentModule","cxPropModule","cxPropValue","cxPropRouteName","cxPropZcqa","cxPropDynamicParams","cxPropQueryParams","cxPropTransitionData","cxPropModalWrapperClass","cxPropIconClass","cxPropId","cxPropFrom","cxPropEmptyValue","lookupSingle","cxPropAutofocus","cxPropTabindex","cxPropTabIndex","cxPropDisabled","cxPropPlaceholder","cxPropReadonly","cxPropToggle","cxPropField","cxPropFieldKey","cxPropLabelClass","cxPropAdvanceSearchEnabled","lookupCreateRecord","initComp","ften","records","apiName","cxPropClass","cxPropMaxlength","displayField","modulenameUicomp","columnName","renderLookup","moduleData","moduledataUicomp","queryParamObject","relatedFieldComp","relatedTo","record","modId","dispInit","renderedPage","selectedSingle","isSingle","uiTypeMapping","moduleName","show","repRecord","fldId","relations","module","value","cxPropTarget","cxPropCreateYield","cxPropRelatedTo","lyteUnbound","cxPropAutocomplete","cxPropFetchRecordsOnEnter","cxPropAppearance","isError","cxPropErrorMessage","cxPropShowHideTooltip","cxPropClearErrorMessage","cxPropTooltip","cxPropImagePath","cxPropMetaMoreRecords","cxPropIconTooltip","showEmptyValue","cxPropErrorYield","cxPropHeader","cxPropFields","visible","cxPropInfoTooltip","cxPropImgZcqa","lookupValue","cxPropShowBc","lookupId","cxPropFooterYield","cxPropRecordImageSrc","cxPropAria","cxPropAriaButton","cxPropAriaBody","cxPropAriaBox","cxPropPopoverWrapperClass","cxPropMaskingProperties","tooltip","cxPropRelatedId","cxPropRelatedModuleId","cxPropRelatedName","cxPropRelatedRecordData","cxPropShowCloseIcon","cxPropTooltipConfig","cxPropTooltipClass","cxPropHideIconForView","cxPropDontShowRelatedDropdown","cxPropErrorZcqaPrefix","cxPropErrorZcqaSuffix","searchPerformed","cxPropErrorClass","cxPropInputId","showLoading","cxPropErrorSpanClass","cxPropClearIconClass","cxPropPreventParentScroll","cxPropRightIconClass","cxPropWrapperClass","cxPropLayout","cxPropViewInfoTooltip","cxPropShowDisabledIcon","cxPropDisabledIconClass","cxPropReturnFullObjectOnGet","cxPropDefaultFields","cxPropDisplayIconOnLeft","cxPropMandatory","cxPropType","modulePluralLabel","multiModuleModules","moduleDisabledList","cxPropDisabledList","cxPropAllFieldsNeeded","cxPropTooltipShow","cxPropQueryParam","cxPropWarningMessage","cxPropShowWarning","cxPropWarningIconClass","cxPropDataTabindex","cxPropMandatoryOption","cxPropMandatoryType","cxPropErrorIconClass","cxPropPreventFocusOnError","cxPropSearchFormat","cxPropSearchFields","cxPropCallAllowed","cxPropShowImageInBc","cxPropBcZcqa","cxPropMinLength","cxPropOpenOnFocus","cxPropBoxClass","cxPropTransition","cxPropOffset","cxPropCurrentModuleSingularLabel","cxPropInputValue","cxPropDetailRoute","cxPropFieldTypeMappingSelector","cxPropModalProperty","cxPropLookupProperties","cxPropModuleNameSelector","cxPropLookupUitypeComparator","cxPropFetchModuleData","cxPropFetchRecords","cxPropHoverCallback","cxPropPrefixYield","cxPropDropdown","cxPropShowAllFields","cxPropNoResultMessage","cxPropForcedFetchBc","cxPropPerpage","cxPropButtonYield","cxPropNoResultMessage","cxPropUpdateDelay","cxPropCallbackDelay","cxPropShowLookupPopupFields","cxPropRenderAutoCompleteInCriteria","cxPropMinimumCharactersForSearch","minimumSearchCharacter","selectedIds","cxPropAriaErrorProperties","cxPropModuleOptions","cxPropBoundary","cxPropDropdownIconClass","cxPropMultiModuleSelectId","cxPropSearchPlaceholder","cxPropDisableSearch","dropdownProp","cxPropSearchValue","cxPropHeaderSuffix","selectedRecsCount","cxPropEnableCustomview","cxPropAdditionalParticipants","cxPropTotalCount","modalCxValue","cxPropShow","cxPropProfileId","cxPropViewClipLabel","cxPropDivWrapperClass","cxPropSuffixYield","cxPropHideTextComponent","cxPropDefaultCriteriaStr","elementClass"],
_observedAttributesType :["object","object","boolean","boolean","array","array","string","string","string","string","string","string","string","string","string","string","string","string","string","string","boolean","string","string","boolean","string","boolean","boolean","object","string","string","boolean","object","boolean","array","array","string","string","number","string","string","string","boolean","object","object","object","array","object","array","string","boolean","number","object","boolean","object","string","boolean","array","string","array","object","object","string","boolean","object","boolean","boolean","boolean","string","boolean","string","boolean","boolean","string","string","string","string","boolean","boolean","string","array","boolean","string","string","string","boolean","string","boolean","string","boolean","object","object","object","string","object","string","string","string","string","array","boolean","string","string","boolean","boolean","string","string","boolean","string","string","boolean","string","string","boolean","string","string","string","boolean","boolean","string","boolean","object","boolean","boolean","string","string","array","array","array","boolean","boolean","object","string","boolean","string","string","object","string","string","boolean","boolean","array","boolean","boolean","string","number","boolean","string","object","object","string","string","string","string","object","object","string","object","boolean","boolean","boolean","boolean","object","boolean","string","boolean","number","boolean","string","number","number","boolean","boolean","number","number","string","object","array","object","string","string","string","boolean","string","string","string","number","boolean","boolean","number","string","boolean","string","boolean","string","boolean","boolean","string","string"],
//No I18n
	data : function(){
		return {
			/**
			 * @componentProperty { object } cxPropElementProps
			 * @author silambarasan.rt
			 * @version 1.0.0
			 * This property used to send multiple properties to child compoent.
			 */
			cxPropElementProps : Lyte.attr("object", {default: {}}),//No I18n
			childCompProps :  Lyte.attr("object",{default : {}}),//No I18n
			/**
			 * If its true, Hover card will be show instead of tooltip.
			 * @componentProperty { boolean } cxPropErrorOnHovercard=false
			 * @author anuja.manoharan
			 */
			cxPropErrorOnHovercard : Lyte.attr( 'boolean' , {default : false} ),//no i18n
			/**
			 * Set to true to render component on viewport
			 * @componentProperty { boolean } lyteViewPort=false
			 * @author anuja.manoharan
			 */
			lyteViewPort : Lyte.attr("boolean", {"default" : false}),//No I18n
			cxPropDefaultCriteria : Lyte.attr('array',{'default': []}),//NO I18N
			cxPropFieldOfLookupVal : Lyte.attr('array',{'default': []}),//NO I18N
			cxPropParentModule : Lyte.attr("string", {'default': ''}),//no i18n
			/**
			 * Lookup field module name
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 */
			cxPropModule : Lyte.attr('string'), //no i18n
			/**
			 * The value to be preset to the lookup field
			 * @componentProperty { string } cxPropValue
			 * @author anuja.manoharan
			 */
			cxPropValue : Lyte.attr("string"),//No I18n
			/**
			 * When using type view, this will define the route to be triggered on click
			 * @componentProperty { string } cxPropRouteName
			 * @author anuja.manoharan
			 */
			cxPropRouteName : Lyte.attr("string"),//No I18n
			/**
			 * zcqa added for lookup component.
			 * @componentProperty { string } cxPropZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqa : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this determines the dynamic params to be passed to the transition triggered on click
			 * @componentProperty { string } cxPropDynamicParams
			 * @author anuja.manoharan
			 */
			cxPropDynamicParams : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this determines the query params to be passed to the transition on click
			 * @componentProperty { string } cxPropQueryParams
			 * @author anuja.manoharan
			 */
			cxPropQueryParams : Lyte.attr("string"),//No I18n
			/**
			 * When type is view, this data determines the transition data to be passed to the transition on click
			 * @componentProperty { string } cxPropTransitionData
			 * @author anuja.manoharan
			 */
			cxPropTransitionData : Lyte.attr("string"),//No I18n
			/**
			 * To display an icon in view and create type, pass the class that contains the icon background url and position.
			 * @componentProperty { string } cxPropIconClass
			 * @author anuja.manoharan
			 */
			cxPropModalWrapperClass : Lyte.attr("string"),//No I18n
			/**
			 * wrapper for lookup filter
			 * @componentProperty { string } cxPropModalWrapperClass
			 * @author mahalakshmi.m
			 */
			cxPropIconClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets id to the child element
			 * @componentProperty { string } cxPropId
			 * @author anuja.manoharan
			 */
			cxPropId: Lyte.attr("string", {"default": ""}), //NO i18n
			/**
			 * To determine what the element has to be displayed or where it is to be used
			 * @componentProperty { string } cxPropFrom
			 * @author anuja.manoharan
			 */
			cxPropFrom : Lyte.attr("string", {default : "view"}),//No I18n
			/**
			 * If there is no cxPropValue you can choose to display a default value which we call the empty value
			 * @componentProperty { string } cxPropEmptyValue
			 * @author anuja.manoharan
			 */
			cxPropEmptyValue : Lyte.attr("string", {default : ""}),//No I18n
			lookupSingle :  Lyte.attr("string",{default:'', hideAttr:true}),// No I18n
			/**
			 * Autofocus applied for lyte-autocomplete
			 * @componentProperty { boolean } cxPropAutofocus=false
			 * @author anuja.manoharan
			 */
			cxPropAutofocus : Lyte.attr("boolean"),//no i18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabindex
			 * @author mariswaran.sv
			 */
			cxPropTabindex : Lyte.attr("string"),//no i18n
			/**
			 * It sets tab index for input
			 * @componentProperty { string } cxPropTabIndex
			 * @author anuja.manoharan
			 */
			cxPropTabIndex : Lyte.attr("string" , {default : '0'}),//no i18n
			/**
			 * his property disables input. lyteInputDisabled class will be added to lyte-input
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @author anuja.manoharan
			 */
			cxPropDisabled : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The text thats needs to be displayed as placeholder if value is not present
			 * @componentProperty { string } cxPropPlaceholder
			 * @author anuja.manoharan
			 */
			cxPropPlaceholder : Lyte.attr("string"),//No I18n
			/**
			 * It makes the input field as readonly.
			 * @componentProperty { boolean } cxPropReadonly=false
			 * @author anuja.manoharan
			 */
			cxPropReadonly : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * When this is to true, the autocomplete will be opened on render
			 * @componentProperty { boolean } cxPropToggle=false
			 * @author anuja.manoharan
			 */
			cxPropToggle : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The field details that would contain info like field label, mandatory etc.
			 * @componentProperty { object } cxPropField
			 * @author anuja.manoharan
			 */
			cxPropField: Lyte.attr("object", {"default": {}, hideAttr : true}), //NO I18n
			/**
			 * If you want to display the input box along with a label, you need to pass the property in cxPropField that will be the label.
			 * @componentProperty { string } cxPropFieldKey
			 * @author anuja.manoharan
			 */
			cxPropFieldKey : Lyte.attr("string", {"default": ""}),//No I18n
			/**
			 * If you are displaying the field label you can pass a class to it as well
			 * @componentProperty { string } cxPropLabelClass
			 * @author anuja.manoharan
			 */
			cxPropLabelClass: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * If it's true, We'll enable the filters.
			 * @componentProperty { boolean } cxPropAdvanceSearchEnabled=false
			 * @author anuja.manoharan
			 */
			cxPropAdvanceSearchEnabled : Lyte.attr("boolean",{default : typeof Crm !== 'undefined' ? Crm.userDetails.isLookupAdvancedSearchEnabled : false}),//No I18n
		    lookupCreateRecord : Lyte.attr("object", {default : {}}),//No I18n
		    initComp : Lyte.attr("boolean", {default : false}),//No i18n
		    ften : Lyte.attr("array", []),//No i18n
		    records : Lyte.attr("array", {default : []}),//No I18n
		    apiName : Lyte.attr('string'),//no i18n
			/**
			 * The css class that needs to be set to the input.
			 * @componentProperty { string } cxPropClass
			 * @author anuja.manoharan
			 */
			cxPropClass : Lyte.attr("string", {'default': ''}),//no i18n
			/**
			 * Sets maximum length for the element
			 * @componentProperty { number } cxPropMaxlength
			 * @author anuja.manoharan
			 */
			cxPropMaxlength : Lyte.attr("number" , {default : 120}),//no i18n
			displayField : Lyte.attr("string",{default:'', hideAttr:true}), //no i18n
			modulenameUicomp : Lyte.attr("string"),//no i18n
			columnName : Lyte.attr("string"),//no i18n
			renderLookup : Lyte.attr("boolean",{"default":false}),//no i18n
			moduleData : Lyte.attr("object"),//no i18n
			moduledataUicomp : Lyte.attr("object"),//no i18n
			queryParamObject : Lyte.attr("object",{default:{}}),// No I18n
			relatedFieldComp : Lyte.attr("array",{default:[]}),// No I18n
			relatedTo : Lyte.attr("object",{default:{}}),// No I18n
			record : Lyte.attr("array",{default:[]}),// No I18n
			modId : Lyte.attr("string",{default:""}),// No I18n
			dispInit : Lyte.attr("boolean",{"default":false}),//no i18n
			renderedPage : Lyte.attr("number",{default:1}),//No I18n
			selectedSingle :  Lyte.attr("object",{default:{}}),// No I18n
			isSingle : Lyte.attr("boolean"),//no i18n
			uiTypeMapping : Lyte.attr('object', {default : (typeof crmConstants != "undefined" && crmConstants.defaultUiTypeToCruxMapping) ? crmConstants.defaultUiTypeToCruxMapping : {}}),//no i18n //do not change its name as it is being used in crm
			moduleName : Lyte.attr("string",{default:""}) ,// No I18n
			show : Lyte.attr('boolean',{default:false}), //no i18n
			repRecord : Lyte.attr("array",{default:[]}),// No I18n
			fldId : Lyte.attr("string"),//no i18n
			relations : Lyte.attr("array",{default : []}), //No I18n
			module : Lyte.attr("object", {default : {}}),//no i18n
			value : Lyte.attr("object", {default : {}}),// No I18n
			/**
			 * When type is view, this will be set to the target attribute mentioning where you want to open the new url
			 * @componentProperty { string } cxPropTarget
			 * @author anuja.manoharan
			 */
			cxPropTarget : Lyte.attr("string", {default : "_self"}),//no i18n
			/**
			 * Set this property to true if you want to display and handle a create button in your lookup modal
			 * @componentProperty { boolean } cxPropCreateYield=false
			 * @author anuja.manoharan
			 */
			cxPropCreateYield : Lyte.attr("boolean"),//no i18n
			/**
			 * @componentProperty { object } cxPropRelatedTo
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRelatedTo : Lyte.attr("object"),//No I18n
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * Enables native autocomplete property for input
			 * @componentProperty { boolean } cxPropAutocomplete=false
			 * @author anuja.manoharan
			 */
			cxPropAutocomplete : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * By default a search request will be made whenever user types a value in the modal, but when this property is set to true, request will be made only when they press enter.
			 * @componentProperty { boolean } cxPropFetchRecordsOnEnter=false
			 * @author anuja.manoharan
			 */
			cxPropFetchRecordsOnEnter : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * It defines the appearance of the element
			 * @componentProperty { string } cxPropAppearance
			 * @author anuja.manoharan
			 */
			cxPropAppearance : Lyte.attr("string", {default : "box"}),//No I18n
			isError : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This property can be set to display an error message on validation failure.
			 * @componentProperty { string } cxPropErrorMessage
			 * @author anuja.manoharan
			 */
			cxPropErrorMessage : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * In the autocomplete, a tooltip is shown for all options on hover of which its corresponding business card is displayed. You can hide this icon by setting this property to false
			 * @componentProperty { boolean } cxPropShowHideTooltip=false
			 * @author anuja.manoharan
			 */
			cxPropShowHideTooltip : Lyte.attr("boolean", {default : true}),//No i18n
			/**
			 * This property determines if the error message should be cleared on change.
			 * @componentProperty { boolean } cxPropClearErrorMessage=false
			 * @author anuja.manoharan
			 */
			cxPropClearErrorMessage : Lyte.attr("boolean", {default : true}), //No i18n
			/**
			 * To display a tooltip in the input
			 * @componentProperty { string } cxPropTooltip
			 * @author anuja.manoharan
			 */
			cxPropTooltip: Lyte.attr("string"), //NO i18n
			cxPropImagePath : Lyte.attr("string", {default : "/crm/CRMClient/images"}),//No I18n
			/**
			 * This property is used to dertemine whether there are more records after the last search result. Fetch on scroll and display of navigation icons is done based on this.
			 * @componentProperty { string } cxPropMetaMoreRecords
			 * @author anuja.manoharan
			 */
			cxPropMetaMoreRecords : Lyte.attr("string", {default : "more_records"}),//No I18n
			/**
			 * This Tooltip will to set the lookup icon.
			 * @componentProperty { string } cxPropIconTooltip
			 * @author anuja.manoharan
			 */
			cxPropIconTooltip : Lyte.attr("string"),//NO i18n
			showEmptyValue : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * You can choose to display your own error message using yield
			 * @componentProperty { boolean } cxPropErrorYield=false
			 * @author anuja.manoharan
			 */
			cxPropErrorYield : Lyte.attr("boolean", {default : false}),//No i18n
			/**
			 * The header message to be displayed in the modal
			 * @componentProperty { string } cxPropHeader
			 * @author anuja.manoharan
			 */
			cxPropHeader : Lyte.attr("string"),//No I18n
			/**
			 * The set of fields to be displayed in the modal table headers.
			 * @componentProperty { array } cxPropFields
			 * @author anuja.manoharan
			 */
			cxPropFields : Lyte.attr("array"),//No I18n
			visible : Lyte.attr("boolean", {default : false}), //No I18N
			/**
			 * You can set an info icon with a tooltip next to the field label
			 * @componentProperty { string } cxPropInfoTooltip
			 * @author anuja.manoharan
			 */
			cxPropInfoTooltip: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * The zcqa to be set to the image icon
			 * @componentProperty { string } cxPropImgZcqa
			 * @author anuja.manoharan
			 */
			cxPropImgZcqa : Lyte.attr("string"), //no i18n
			lookupValue : Lyte.attr("string"),//no i18n
			/**
			 * If it's true, We'll show the business card of the record.
			 * @componentProperty { boolean } cxPropShowBc=false
			 * @author anuja.manoharan
			 */
			cxPropShowBc : Lyte.attr("boolean", {default : false}),//no i18n
			lookupId : Lyte.attr("string"),//no i18n
			/**
			 * Set this to true if you want to display a footer message to your autocomplete dropdown
			 * @componentProperty { boolean } cxPropShowBc=false
			 * @author anuja.manoharan
			 */
			cxPropFooterYield : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropRecordImageSrc : Lyte.attr("string"),//No I18n
			/**
			 * To set custom attributes to input
			 * @componentProperty { boolean } cxPropAria=false
			 * @author mariswaran.sv
			 */
			cxPropAria : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaButton
			 * @author mariswaran.sv
			 */
			cxPropAriaButton : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaBody
			 * @author mariswaran.sv
			 */
			cxPropAriaBody : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { object } cxPropAriaBox
			 * @author mariswaran.sv
			 */
			cxPropAriaBox : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * This Wrapper class applied for the business card popover.
			 * @componentProperty { string } cxPropPopoverWrapperClass
			 * @author anuja.manoharan
			 */
			cxPropPopoverWrapperClass: Lyte.attr("string", {default: ""}),   //NO I18N
			/**
			 * You can choose to mask the value of the element by passing this property
			 * @componentProperty { object } cxPropMaskingProperties
			 * @author anuja.manoharan
			 */
			cxPropMaskingProperties : Lyte.attr("object"),//No I18n
			tooltip : Lyte.attr("string"),//No I18n
			/**
			 * Let's say Accounts and Contacts are related, i.e. in a form when I have selected a Contact I wish to see only its related Accounts in my lookup modal, I will pass the id of the selected Contact
			 * @componentProperty { string } cxPropRelatedId
			 * @author anuja.manoharan
			 */
			cxPropRelatedId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedModuleId
			 * @author anuja.manoharan
			 */
			cxPropRelatedModuleId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropRelatedName
			 * @author anuja.manoharan
			 */
			cxPropRelatedName : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } cxPropRelatedRecordData
			 * @author anuja.manoharan
			 */
			cxPropRelatedRecordData : Lyte.attr('array',{'default': []}),//NO I18N
			/**
			 * The clear icon will be displayed when this property is set to true
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author anuja.manoharan
			 */
			cxPropShowCloseIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Configurations for tooltip
			 * @componentProperty { string } cxPropTooltipConfig
			 * @author anuja.manoharan
			 */
			cxPropTooltipConfig : Lyte.attr("string", {default : '{"position": "bottom"}'}),//No I18n
			/**
			 * Same class will be added for tooltip created
			 * @componentProperty { string } cxPropTooltipClass
			 * @author anuja.manoharan
			 */
			cxPropTooltipClass : Lyte.attr("string", {default : "cxTooltip"}),//No I18n
			/**
			 * When set to true, icon will be hidden for view only
			 * @componentProperty { boolean } cxPropHideIconForView=false
			 * @author anuja.manoharan
			 */
			cxPropHideIconForView : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * If it's true, We'll hide the related module dropdown
			 * @componentProperty { boolean } cxPropDontShowRelatedDropdown=false
			 * @author anuja.manoharan
			 */
			cxPropDontShowRelatedDropdown : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * You can set a prefix to the zcqa
			 * @componentProperty { string } cxPropErrorZcqaPrefix
			 * @author anuja.manoharan
			 */
			cxPropErrorZcqaPrefix : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * You can set a suffix to the zcqa
			 * @componentProperty { string } cxPropErrorZcqaSuffix
			 * @author anuja.manoharan
			 */
			cxPropErrorZcqaSuffix : Lyte.attr("string", {default : "Error"}),//No I18n
			searchPerformed : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This class will be added while show the error message.
			 * @componentProperty { string } cxPropErrorClass
			 * @author anuja.manoharan
			 */
			cxPropErrorClass : Lyte.attr("string"),//No I18n
			/**
			 * Sets the ID for the input.
			 * @componentProperty { string } cxPropInputId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropInputId : Lyte.attr("string", {default : "inputId"}),//No I18n
			showLoading : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This class will be added for the span while show the error message.
			 * @componentProperty { string } cxPropErrorSpanClass
			 * @author anuja.manoharan
			 */
			cxPropErrorSpanClass : Lyte.attr("string"),//No I18n
			/**
			 * Clear icon class for the input
			 * @componentProperty { string } cxPropClearIconClass
			 * @author anuja.manoharan
			 */
			cxPropClearIconClass : Lyte.attr("string"),//No i18n
			/**
			 * Disables scroll of all scrollable parents of the dropdown(only parents).
			 * @componentProperty { boolean } cxPropPreventParentScroll=false
			 * @author anuja.manoharan
			 */
			cxPropPreventParentScroll : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropRightIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRightIconClass : Lyte.attr("string"),//No I18n
			/**
			 * It will be added for parent div of the inputs.
			 * @componentProperty { string } cxPropWrapperClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr("string"),//No I18n
			cxPropLayout : Lyte.attr("string"),//No I18n
			/**
			 * Info tooltip show/hide property.
			 * @componentProperty { boolean } cxPropViewInfoTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropViewInfoTooltip : Lyte.attr("boolean", {default : false}),
			/**
			 * disabled icon in right side of the input
			 * @componentProperty { boolean } cxPropShowDisabledIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowDisabledIcon : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * disable icon class
			 * @componentProperty { string } cxPropDisabledIconClass
			 * @author anuja.manoharan
			 */
			cxPropDisabledIconClass : Lyte.attr("string", {default : ""}),//No I18n
			/**
			 * If its true, The component will return the full object in the onValue change callback.
			 * @componentProperty { boolean } cxPropReturnFullObjectOnGet=false
			 * @author anuja.manoharan
			 */
			cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropDefaultFields
			 * @author anuja.manoharan
			 */
			cxPropDefaultFields : Lyte.attr("object", {default : {}}),//NO I18N
			/**
			 * @componentProperty { boolean } cxPropDisplayIconOnLeft=false
			 * @author anuja.manoharan
			 */
			cxPropDisplayIconOnLeft : Lyte.attr("boolean", {default : false}),
			/**
			 * Set to true to mark a field as mandatory
			 * @componentProperty { boolean } cxPropMandatory=false
			 * @author anuja.manoharan
			 */
			cxPropMandatory : Lyte.attr("boolean"),
			/**
			 * There is three types of lookup component single, multiple and multi_module_lookup.
			 * @componentProperty { string } cxPropType
			 * @author anuja.manoharan
			 */
			cxPropType : Lyte.attr("string"), //no i18n
			modulePluralLabel : Lyte.attr("string"), //no i18n
			multiModuleModules : Lyte.attr('array',{default : []}), //no i18n
			moduleDisabledList : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * We can't select the given lists. Those records will disabled.
			 * @componentProperty { array } cxPropDisabledList
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDisabledList : Lyte.attr("array",{default : []}),
			/**
			 * @componentProperty { boolean } cxPropAllFieldsNeeded=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAllFieldsNeeded : Lyte.attr("boolean", {default : false}),
			/**
			 * Tooltip show hide property in view type.
			 * @componentProperty { boolean } cxPropTooltipShow=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipShow : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * This queryparam used for fetching the records.
			 * @componentProperty { object } cxPropQueryParam
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropQueryParam : Lyte.attr("object"),
			/**
			 * Warning message displayed below element.
			 * @componentProperty { string } cxPropWarningMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningMessage : Lyte.attr("string"),
			/**
			 * Set to true to display warning message below element
			 * @componentProperty { boolean } cxPropShowWarning=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowWarning : Lyte.attr("boolean", {default : false}),
			/**
			 * If its true 'lt-prop-value' will be updated on every input with 250ms debounce( In this case you can take current value from inner 'input' tag ) or else it will get updated in blur event
			 * @componentProperty { string } cxPropWarningIconClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropWarningIconClass : Lyte.attr("string"),
			/**
			 * @componentProperty { string } cxPropDataTabindex
			 * @author mariswaran.sv
			 */
			cxPropDataTabindex : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropMandatoryOption
			 * @author mariswaran.sv
			 */
			cxPropMandatoryOption : Lyte.attr('object', {default : {'red_accent_line' : '', 'asterisk' : '*', 'required' : '('+_cruxUtils.getI18n("crm.label.required")+')'}}),
			/**
			 * @componentProperty { string } cxPropMandatoryType
			 * @author mariswaran.sv
			 */
			cxPropMandatoryType : Lyte.attr("string", {default : 'red_accent_line'}),
			/**
			 * @componentProperty { string } cxPropErrorIconClass
			 * @author cxPropErrorIconClass
			 */
			cxPropErrorIconClass : Lyte.attr('string'),
			/**
			 * Set to true to prevent focus on error
			 * @componentProperty { boolean } cxPropPreventFocusOnError=false
			 * @author anuja.manoharan
			 */
			cxPropPreventFocusOnError : Lyte.attr("boolean", {default : false}),
			/**
			 * Using this property to set a filter format of search criteria. If its true, the criteria will be "starts_with" or else it will be "contains"
			 * @componentProperty { boolean } cxPropSearchFormat=false
			 * @author anuja.manoharan
			 */
			cxPropSearchFormat : Lyte.attr('boolean',{default : false}),
			/**
			 * We have search the records based on this fields.
			 * @componentProperty { array } cxPropSearchFields
			 * @author anuja.manoharan
			 */
			cxPropSearchFields : Lyte.attr("array", {default : []}),
			/**
			 * This property is used to enable call icon
			 * @componentProperty { boolean } cxPropShowImageInBc=false
			 * @author anuja.manoharan
			 */
			cxPropCallAllowed: Lyte.attr("boolean", {default : true}),
			/**
			 * Showing the record image in business card.
			 * @componentProperty { boolean } cxPropShowImageInBc=false
			 * @author anuja.manoharan
			 */
			cxPropShowImageInBc : Lyte.attr("boolean", {default : true}),
			/**
			 * This zcqa added for business card popover.
			 * @componentProperty { string } cxPropBcZcqa
			 * @author anuja.manoharan
			 */
			cxPropBcZcqa: Lyte.attr("string",{default:"cxBcPopup"}),
			/**
			 * Minimum value of the input length
			 * @componentProperty { number } cxPropMinLength
			 * @author anuja.manoharan
			 */
			cxPropMinLength : Lyte.attr("number", {default : 0}),
			/**
			 * Focus the input on opening the dropdown.
			 * @componentProperty { boolean } cxPropOpenOnFocus=false
			 * @author anuja.manoharan
			 */
			cxPropOpenOnFocus : Lyte.attr("boolean", {default : false}),
			/**
			 * This class will be added for lyte-dropdown in dropbox.
			 * @componentProperty { string } cxPropBoxClass
			 * @author anuja.manoharan
			 */
			cxPropBoxClass : Lyte.attr("string"),
			cxPropTransition : Lyte.attr('object',{"default":{"animation":"slideFromTop","duration":"0.5"}}), //NO I18n
			// /**
			//  * You can set the all lookup modal properties using this property.
			//  * @componentProperty { object } cxPropLookupModalProperties
			//  * @author anuja.manoharan
			//  */
			// cxPropLookupModalProperties : Lyte.attr("object",{"default" : {}}), //NO I18N
			cxPropOffset :  Lyte.attr('object',{"default":{"top" : "0", "left" : "center"}}), //NO I18n
			cxPropCurrentModuleSingularLabel : Lyte.attr("string"), //no i18n
			cxPropInputValue			:	Lyte.attr("string"), //no i18n
			cxPropDetailRoute			:	Lyte.attr("string" , {default : "crm.tab.module.entity.detail"}),//No I18n
			/**
			 * field type mapping selector
			 * @componentProperty { string } cxPropFieldTypeMappingSelector='ui_type'
			 * @author anuja.manoharan
			 */
			cxPropFieldTypeMappingSelector : Lyte.attr("string",{"default" : 'ui_type'}), //no i18n
			/**
			 * You can set the all lookup modal properties using this property.
			 * @componentProperty { object } cxPropModalProperty
			 * @author anuja.manoharan
			 */
			cxPropModalProperty : Lyte.attr("object"),//NO I18N
			cxPropLookupProperties : Lyte.attr("object"),//NO I18N
			cxPropModuleNameSelector : Lyte.attr("string", {default : "module_name"}),//NO I18N
			cxPropLookupUitypeComparator : Lyte.attr("object"),
			cxPropFetchModuleData : Lyte.attr("boolean", {default : false}),
			cxPropFetchRecords : Lyte.attr("boolean", {default : false}),
			/**
			 * If its true, We'll give the callback for on hover of business card popover.
			 * @componentProperty { object } cxPropModalProperty
			 * @author anuja.manoharan
			 */
			cxPropHoverCallback : Lyte.attr("boolean"),
			cxPropPrefixYield : Lyte.attr("boolean", {default : false}),
			cxPropDropdown : Lyte.attr("object" , {default : {}}),
			
			cxPropShowAllFields: Lyte.attr("boolean", {default : false}),
			cxPropNoResultMessage : Lyte.attr("string"),
			cxPropForcedFetchBc: Lyte.attr("boolean", {default : false}),
			cxPropPerpage : Lyte.attr("number", {default : 10}),
			cxPropButtonYield : Lyte.attr("boolean", {default : false}),
			/**
			 * This message will be shown while no values present in the dropdown/modal.
			 * @componentProperty { string } cxPropNoResultMessage
			 * @author anuja.manoharan
			 */
			cxPropNoResultMessage : Lyte.attr("string"),
			/**
			 * Input value will be updated with 250 ms debounce. If its set to undefined it will be updated immediately after value change
			 * @componentProperty { number } cxPropUpdateDelay=250
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropUpdateDelay : Lyte.attr("number", {default : 250}),
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay=0
			 * @author mariswaran.sv
			 * @version 1.0.0
			 */
			cxPropCallbackDelay : Lyte.attr("number", {default : 0}),
			cxPropShowLookupPopupFields:Lyte.attr("boolean",{default:false}),
			cxPropRenderAutoCompleteInCriteria : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropMinimumCharactersForSearch : Lyte.attr('number'),
			minimumSearchCharacter : Lyte.attr('number',{default : 0}), //no i18n
			selectedIds : Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropAriaErrorProperties = {'ariaErrorIcon': true/false, 'ariaErrorColor' : 'string'}
			 * @author mariswaran.sv
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropAriaErrorProperties : Lyte.attr('object'),
			cxPropModuleOptions : Lyte.attr("array"),
			cxPropBoundary: Lyte.attr('object'),
			/**
			 * It will be added for dropdown icon class.
			 * @componentProperty { string } cxPropDropdownIconClass
			 * @author manikaraja.p
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropDropdownIconClass : Lyte.attr("string" , {default : 'dropdown'}),
			/**
			 * This module id shown for default selected module in the multi module case, If the cxPropValue not passed.
			 * @componentProperty { string } cxPropMultiModuleSelectId
			 * @author manikaraja.p
			 * @version 1.0.0
			 * property to set error icon and error color
			 */
			cxPropMultiModuleSelectId : Lyte.attr("string"),
			cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
			cxPropDisableSearch : Lyte.attr("boolean",{default:false}),
			dropdownProp :  Lyte.attr("string"),
			cxPropSearchValue : Lyte.attr("string"),
			cxPropHeaderSuffix :  Lyte.attr("string" ,  {default : 'Participants'}),
			selectedRecsCount : Lyte.attr("number"),
			cxPropEnableCustomview : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropAdditionalParticipants : Lyte.attr('boolean',{default : false}), //no iI8n	
			cxPropTotalCount :  Lyte.attr("number"),
			modalCxValue :  Lyte.attr("string"),
			cxPropShow : Lyte.attr('boolean',{default : false}), //no iI8n
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			cxPropViewClipLabel : Lyte.attr("boolean",{default:true}),
			cxPropDivWrapperClass: Lyte.attr('string', { default: '' }),
			cxPropSuffixYield: Lyte.attr("boolean", { default: false }),
			cxPropHideTextComponent : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropDefaultCriteriaStr : Lyte.attr('string'), //no i18n
			elementClass : Lyte.attr("string") 
		}
	},
	init : function()
	{
		// this.data.cxPropDropdown.preventParentScroll = this.data.cxPropPreventParentScroll; //lt-prop-dropdown='{"preventParentScroll" : "{{cxPropPreventParentScroll}}"}' in lyte-autocomplete
		this.lookupModalName = this.getData('cxPropAdvanceSearchEnabled') ? "crux-lookup-filter-modal" : "crux-lookup-modal";//No I18n
		this._modalOpened = false;
		if(this.data.cxPropPrefixYield){
			this.setData("cxPropAppearance","box");
		}
		this.convertLtPropJson();
		if(this.data.cxPropFrom === "create"){
			this.setFocusUtil();
		}
		if(this.data.cxPropField && this.data.cxPropField.module){
			var modSingLabel = this.data.cxPropField.module[0].singular_label;
			this.setData('cxPropAssigneeModuleName' , modSingLabel);
		}
		var field = this.data.cxPropField;
		if(field && field.data_type){
			let data_type = field.data_type , type;
			switch (data_type) {
				case "multiselectlookup":
					type = "multiple";
					this.setData({"cxPropAutocomplete" : false , "cxPropAdvanceSearchEnabled" : false}); //No I18n
					break;
				case "multiselect_multimodule_lookup":
					type = "multi_module_multi_select";
					this.setData({"cxPropAutocomplete" : false , "cxPropAdvanceSearchEnabled" : false}); //No I18n
					break;
				case "multi_module_lookup":
					type = "multi_module_lookup";
					break;
				default:
					type = "single";
					break;
			}
			if(!this.data.cxPropType){
				this.setData('cxPropType' , type);
			}
		}
		if(this.data.cxPropDefaultCriteriaStr){
			this.data.cxPropSearchFormat = true;
		}
		// if(this.data.cxPropRelatedId){
		// 	let criteria = {'field' : {api_name : this.getRelatedFieldApiName()} , 'comparator' : 'equals' , 'value' : this.data.cxPropRelatedId};
		// 	this.relatedRecCriteria = this.data.cxPropSearchFormat ? this.formatCriteriaForSearchAPI(criteria) : criteria;
		// }
		if(this.data.cxPropDefaultCriteria && this.data.cxPropSearchFormat){
			this.defaultCriteria = this.formatCriteriaForSearchAPI(this.data.cxPropDefaultCriteria[0]);
		}
		let defCri = this.joinSearchApiCriteria(this.relatedRecCriteria, this.defaultCriteria);
		if(defCri){ //if no default criteria, There is empty string set in the filters key, same value returning while fetching records.
			this.data.queryParamObject.filters = this.initialCriteria = defCri; 
		}
		this.lookupModalName = this.data.cxPropAdvanceSearchEnabled ? "crux-lookup-filter-modal" : "crux-lookup-modal";//No I18n
		if(this.data.cxPropViewClipLabel === false){
			this.setData('cxPropTooltipShow' , false);
		}
	},
	lookupModalName : "",
	methods : {
		autoComp : function(value){
			this.selection = true;
			if(this.data.cxPropClearErrorMessage){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			var ften = this.getData('ften'),disp=this.getData('displayField') //no i18n
			var l = ften.length,val
			for(var i=0;i<l;i++){
				if(ften[i].id=== value){
					this.setData('selectedSingle',ften[i]) ;  //no i18n
					this.setData('ften',ften[i]) ;  //no i18n
					if(disp==='Full_Name'){
						val = (ften[i].First_Name)?ften[i].First_Name+' '+ften[i].Last_Name:ften[i].Last_Name
					}else{
						val = ften[i][disp]
					}
					this.setData('lookupSingle',val)//no i18n
					this.setData("cxPropValue", {id : ften[i].id, name : val});
					// this.setData("cxPropValue", ften[i]);
					if(this.data.cxPropClearErrorMessage){
						this.setData("cxPropErrorMessage", "");//No I18n
					}
					if(this.getMethods("onValueChange")){
						if(this.data.cxPropReturnFullObjectOnGet){
							var rec = ften[i];
							rec.name = rec.name ? rec.name : val;
							/**
							 * Triggered when value is changed via autocomplete dropdown or lookup modal
							 * @method onValueChange
							 * @author anuja.manoharan
							 * @version 1.0.0
							 * @param { * } rec
							 */
							this.executeMethod("onValueChange", rec);
						}else{
							this.executeMethod("onValueChange", this.data.cxPropValue);
						}
						// this.executeMethod("onValueChange", this.data.cxPropReturnFullObjectOnGet ? ften[i] : this.getData("cxPropValue"));
					}
					// this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
					this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxInputFocused");//No I18n
					break;
				}
			}
		},
		beforeSearch : function(val, elem, event){
			if(event.type && !this.data.cxPropDisableSearch){
				var val=val.trim();//No I18n
				if(this.data.cxPropMinimumCharactersForSearch && val.length < this.data.cxPropMinimumCharactersForSearch){
					this.setData('minimumSearchCharacter',this.data.cxPropMinimumCharactersForSearch - val.length);
					return;
				}
				this.setData('minimumSearchCharacter',0);
				
				this.setData("showLoading", true);//No I18n
				if(["Backspace","Meta"].indexOf(event.key) > -1 && this.search){
					this.search=false
				}
				var initRecs = this.getData('record');//no i18n
				if(val === ''){
					this.setData('selectedSingle',{})//no i18n
					this.setData('lookupSingle','')//no i18n
					this.setData('selectedSingleId','')//no i18n
					this.setData("cxPropValue", undefined)//No i18n
					this.$node.querySelector('lyte-autocomplete').ltProp('selected','')//no i18n
					this.setData("cxPropShowCloseIcon", false);//No I18n
				}
				else{
				    this.setData("cxPropShowCloseIcon", true);//No I18n
				}
				if(!this.search){
					var _this = this;
					// clearTimeout(this.typeTimeout)
					// this.typeTimeout = setTimeout(function(){
						if( val === "" || val !== this.data.cxPropSearchValue){
							_this.setData("showLoading", true);//No I18n
							_this.onSearchFun(val, undefined, elem.getData("ltPropSelected"));//No I18n
						}
					// }, 200);
				}else{
					this.setData("showLoading", false);//No I18n
				}
				this.setData("cxPropSearchValue" , val);
			}
		},
		scrollRecord : function(event){
			if(!this.noMoreScroll ){
				var recs= this.getData('ften'),  Obj = this.getData('queryParamObject'); //No I18n
				var scrollElem = (event.target && event.target.tagName === 'LYTE-DROP-BODY')? event.target : null; //No I18n
				Obj.page=Math.ceil(recs.length/10)
				Obj.per_page = this.data.cxPropPerpage;
				this.scrollRequest(this,Obj,scrollElem,recs,false)
			}
		},
		beforeShow : function(event,ddelem){
			var ret;
			if(this.getMethods('onBeforeDropdownOpen')){
				/**
				 * It will trigger,  Before open the dropdown.
				 * @method onBeforeDropdownOpen
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } event
				 */
				ret = this.executeMethod('onBeforeDropdownOpen',event);
			}
			if(this.data.cxPropReadonly || ret === false || this.manualFocus){
				this.manualFocus = false;
				return false;
			}
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.setData("visible", true);//No I18n
			this.setData("showLoading", true);//No I18n
			this.initFromField=true;
			this.setData('minimumSearchCharacter',this.data.cxPropMinimumCharactersForSearch);
			if (rightBoxIcon) {
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
			return new Promise( function (res,rej){
				this._initRes = res;
				this._initRej = rej;
				this.lookupInit(this,this.getData('modId'),false,event,ddelem)//No I18n
			}.bind(this))
		},
		autoFocus : function(ev, autocomp){
            // var autocompDropbox = $L(autocomp).find('lyte-dropdown')[0].component.getDropBox();    // ltPropBoxButtonWidth(min-button) Will handle the width.
            // var lookupWidth = $L('lyte-dropdown',this.$node).width()
            // autocompDropbox.style.width = lookupWidth + 'px';
			this.inputFocused = true;
			if(this.manualFocus){
				return;
			}
            this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
            this.$node.querySelector(".cxBoxWithRightIcon").classList.add("cxBoxInputFocused");		//No I18n
		},
		fetchModule : function(modId){
			/**
			 * module data fetch callback
			 * @method fetchModuleData
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @param { * } modId
			 */
			return this.executeMethod("fetchModuleData", modId);//no i18n
		},
	    fetchRecordsData : function(modId, obj){
			var _this = this;
			/**
			 * records fetching callback
			 * @method fetchRecords
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @param { * } modId
			 * @param { * } obj
			 */
			return this.executeMethod("fetchRecords", modId, obj).then(function(res){//no i18n
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				return res;
			}, function(rej){
				if(typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv){
					commonUtils.showHideLoadingDiv(false);
				}
				_this.setData("renderLookup", false)//no i18n
				return rej;
			});
		},
		createNew : function(){
			/**
			 * It will trigger, while clicking the create new button.
			 * @method onCreateNew
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			this.executeMethod("onCreateNew");//no i18n
		},
		triggerOnValueChange : function(value){
			value.name = value.name ? value.name : value.displayName;
			this.setData("cxPropValue", value);// No I18n
			if(this.data.cxPropReturnFullObjectOnGet){
				this.setData('selectedSingle' , value);
			}
			this._modalOpened = false;
			if($.prototype.effect){
				$(this.$node.querySelector("input")).effect("highlight",{},1000);//no i18n
			}
			if(this.getData("cxPropClearErrorMessage")){
				this.setData("cxPropErrorMessage", "");//No I18n
			}
			if(this.getMethods("onValueChange")){
				/**
				 * riggered when value is changed via autocomplete dropdown or lookup modal
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } value
				 */
				this.executeMethod("onValueChange", value);// No I18n
			}
			// this.$node.querySelector(".cxLookupComponent").classList.add("cxBoxDropdownOpened");//No I18n
			setTimeout(function(){
				if(this.data.cxPropOpenOnFocus){
					this.manualFocus = true;
				}
				this.$node.querySelector(".cxLookupComponent lyte-autocomplete").focus();
			}.bind(this), 20)
		},
		onBlurInput : function(ev, auto){
			this.$node.querySelector(".cxLookupComponent").classList.remove("cxBoxDropdownOpened");//No I18n
			setTimeout(function(){
				if(this.selection && this.getData("cxPropClearErrorMessage")){
					this.setData("cxPropErrorMessage", "");//No I18n
				}
				var autoComp = this.$node.querySelector("lyte-autocomplete");
				if(autoComp && autoComp.querySelector("input").value === ""){
					this.setData("cxPropValue", undefined);//No I18n
					this.setData({selectedSingle : {}, lookupSingle : undefined});
				// 	if(this.getMethods("onValueChange")){
				// 		this.executeMethod("onValueChange", this.getData("cxPropValue"));//No I18n
				// 	}
				}
				this.selection = false;
			}.bind(this), 100);
			this.inputFocused = false;
			if(this.getMethods("onBlur")){
				/**
				 * It will trigger for input on blur
				 * @method onBlur
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onBlur", ev, this.$node); //No I18n
			}
			return true;
		},
		afterRenderAutocomplete : function(){
			if(  !this.$node.querySelector("lyte-input") ){
				return;
			}
			if(this.getData("cxPropAppearance") == "box"){
				this.$node.querySelector("lyte-input").classList.add("cxBoxInput");//No I18n
			}
		},
	    hideInfoTooltip: function() {
				this.showHideInfoTooltip();
	    },
	    onHideDropdown : function(ev, drop){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			this.setData("visible", false);//No I18n
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
			if(this.getMethods("onHide")){
				/**
				 * This callback is fired when the dropdown is hidden
				 * @method onHide
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } ev
				 * @param { * } drop
				 */
				this.executeMethod("onHide", ev, drop);
			}
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, ev, drop);
			}
	    },
	    modalClosed : function(){
	    	this._modalOpened = false;var lookupIcon;
			if(this.data.cxPropType === "multi_module_multi_select"){
				lookupIcon = this.$node.querySelector('.cxMsmmLookupBtn');
			}else{
				lookupIcon = this.$node.querySelector('.cxLookupIcon');
			}
			// lookupIcon.contentEditable = true;
			lookupIcon.focus();
			// lookupIcon.contentEditable = false;
	    },
	    multiModuleSelect : function(event,id){
			if(this.data.modId == id){
				return;
			}
	    	this.setData('module',moduleRecordMapping[idModuleMapping[id]]);
	    	this.setData({'modId' : id , 'cxPropMultiModuleSelectId' : id});
	    	this.setData('cxPropModule',this.data.module.module_name);
	    	if(this.data.cxPropFrom == 'criteria'){
	    		if(this.getMethods("onValueChange")){
					/**
					 * Triggered when value is changed via autocomplete dropdown or lookup modal
					 * @method onValueChange
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
					this.executeMethod("onValueChange", this.getValue());// No I18n
				}
	    	}else{
	    		if(this.getMethods('onModuleSelect')){
					/**
					 * Triggered while select the module in multi module lookup
					 * @method onModuleSelect
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
		    		this.executeMethod('onModuleSelect',this.data.module)
		    	}
		    	this.clear(true);
	    	}

	    },
	    moduleDropdownBeforeShow : function(){
	    	return !this.data.showLoading;
	    },
		moduleDropdownOnShow: function(){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.add("cxBoxDropdownOpened");
			}
		},
		moduleDropdownOnHide: function(){
			const rightBoxIcon = this.$node.querySelector(".cxBoxWithRightIcon");
			if (rightBoxIcon) {
				rightBoxIcon.classList.remove("cxBoxDropdownOpened");
			}
		},
	    textError : function(error,component){
	    	if(this.getMethods("onError")){
				/**
				 * Triggered when there is an error on validation
				 * @method onError
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } error
				 * @param { * } component
				 */
				this.executeMethod("onError", error, component);//No I18n
			}
	    },
	    changeValue : function(){
	    	if(this.getMethods("onValueChange")){
				/**
				 * Triggered when value is changed via autocomplete dropdown or lookup modal
				 * @method onValueChange
				 * @author anuja.manoharan
				 * @version 1.0.0
				 */
				this.executeMethod("onValueChange", this.getValue());// No I18n
			}
	    },
	    changeDataMethod : function(query, customData){
	    	if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", query, customData, this.data.cxPropField)
	    	}
	    },
		selectedConfirm : function(selected){
			// var cxValue = this.data.cxPropValue ? JSON.parse(this.data.cxPropValue) : [];
			this.setValueForMultiSelect(selected);
			// this.unassignRecs = unassignRecs;
			if(this.getMethods("onAssign")){
				this.executeMethod("onAssign" , selected , this.$node); // No I18n
			}
		},
		// unassignRecords : function(unassignRecordIds){
		// 	var cxValue = JSON.parse(this.data.cxPropValue) , len = cxValue.length , ind , _self = this , api_name = this.data.cxPropField.api_name;
		// 	var resetValues =  function(){
		// 		unassignRecordIds.forEach(function(id){
		// 			ind = cxValue.findIndex(x => x[api_name].id === id);
		// 			if(ind !== -1){
		// 				cxValue.splice(ind , 1);
		// 			}
		// 		})
		// 		var stringified = JSON.stringify(cxValue);
		// 		_self.setData("cxPropValue" , stringified);
		// 		if(_self.getMethods("onValueChange")){
		// 			_self.executeMethod("onValueChange", stringified);// No I18n
		// 		}
		// 	}
		// 	if(this.getMethods("onUnassign")){
		// 		var ret = this.executeMethod("onUnassign" , unassignRecordIds , this.$node);
		// 		if(ret && ret.then){
		// 			return ret.then(function(){
		// 				resetValues();
		// 			})
		// 		}else{
		// 			resetValues();
		// 		}
		// 	}else{
		// 		resetValues();
		// 	}

		// },
		onUnassignAll : function(unassignRecs){
			this.unassignRecs = unassignRecs;
			// this.setData("cxPropValue" , "");
		},
		 onShowDropdown : function(ev, drop){
	    	if(this.getMethods('onShow')){
				this.executeMethod('onShow',ev, drop);
			}
	    },
		onDropdownOpen : function(event, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', this, event, comp);
			}
		},
		moduleSuccess : function(res){
			if(this.getMethods("onModuleGetSuccess")){
				this.executeMethod("onModuleGetSuccess" , res);
			}
		},
		fetchTotalCountFn : function(modId, cvid){
			if(this.getMethods('fetchTotalCount')){
				return this.executeMethod('fetchTotalCount', modId, cvid , this.$node);
			}
		},
		onSaveColumnsFn : function(fields, cvid , modId){
			if(this.getMethods('onSaveColumns')){
				return this.executeMethod('onSaveColumns',fields, cvid , modId);
			}
		},
		onApplyFilterFn : function(){
			if(this.getMethods('onApplyFilter')){
				this.executeMethod('onApplyFilter' , this.$node);
			}
		},
		onClearFilterFn : function(){
			if(this.getMethods('onClearFilter')){
				this.executeMethod('onClearFilter' , this.$node);
			}
		}

	},
	actions : {
		onLinkClick : function(event){
			if(this.getMethods('onLookupLinkClicked')){
				var ret = this.executeMethod('onLookupLinkClicked',event, this, this.data.cxPropField);
				if(ret == false){
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
			}
			if(typeof cruxAssets != "undefined" && cruxAssets.cxLookupElementLinkClicked){
				cruxAssets.cxLookupElementLinkClicked(event)
			}
		},
		onkeydownFn : function(){
			if(this.data.cxPropDisableSearch){
				event.preventDefault();
			}
		},
		infoPop : function(elem,val,event){
			var ele = document.getElementById("cruxLookupPopover");
			if(event.type == "mouseenter"){
				this.entered = true;
				// elem.classList.add("cruxLookupPopover");//no i18n
				if(!ele){
					ele = Lyte.Component.render("crux-lookup-popup", {id : "cruxLookupPopover", fieldMapping : this.getData("uiTypeMapping"), cxPropPopoverWrapperClass : this.data.cxPropPopoverWrapperClass,cxPropCallAllowed:this.data.cxPropCallAllowed}, "body");
				}
				ele.setData({module : this.getData("module"), data : val,show : true})				//no i18n
			}
			else{
				this.entered = false;
				// elem.classList.remove("cruxLookupPopover");//no i18n
				ele.setData("show", false);//no i18n
			}
		},
		clearlookupField:function(){
			this.setData("searchPerformed", false);
			this.clear(true);
		},
		showLookup : function(event){
			this._modalOpened = true;
			if(!this.getData("cxPropDisabled") && !this.data.cxPropReadonly){
				if(this.getMethods("onShowLookup")){
					/**
					 * Triggered on click of lookup icon. Used for rendering own logic instead of default lookup modal
					 * @method onShowLookup
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } event
					 */
					this.executeMethod("onShowLookup",event)//No I18n
				}
				else{
					this.showLookupFunc(this)
				}
		// 		if(event){
		// _cruxUtils.addMurhyInfo("crux-lookup-component.js", "Feb Default Changes");
		// 			event.stopPropagation()
		// 		}
			}
		},
		showLookupOnKeyEvent : function(event, comp){
			if(event.key === ' '){
				event.preventDefault();
				comp.click();
			}
		},
		showHideIcon1 : function(show, record){
			if(!this.entered){
				Lyte.objectUtils(record, "add", "cxPropShowIcon", show);	//No I18n
			}
		},
		showInfoTooltip: function(origElem) {
      this.showHideInfoTooltip(origElem);
    },
    	showLookupBC : function(elem,show){
    		var check = true;
				if(this.getMethods('onBeforeShowBusinessCard')){
					/**
					 * Triggered before show the business card
					 * @method onBeforeShowBusinessCard
					 * @author anuja.manoharan
					 * @version 1.0.0
					 */
					check = this.executeMethod('onBeforeShowBusinessCard',this.data.lookupId,this.data.cxPropModule);
				}
				if(!this.data.cxPropShowBc || !check){
					return;
				}
				var popover = document.querySelector("crux-lookup-view-popup");//no i18n
				if(show){
					elem.classList.add("cxLookupBc");//no i18n
					if(popover){
						popover.setData({field : this.data.cxPropField, entityId : this.data.lookupId, cxPropTypeMapping : this.data.uiTypeMapping,
							module : this.data.cxPropModule, cxPropShowImage : this.data.cxPropShowImageInBc,cxPropCallAllowed:this.data.cxPropCallAllowed,cxPropBcZcqa:this.data.cxPropBcZcqa,cxPropHoverCallback : this.data.cxPropHoverCallback==undefined?true:this.data.cxPropHoverCallback,lookupComp:elem,cxPropForcedFetch:this.data.cxPropForcedFetchBc,cxPropRouteName:this.data.cxPropRouteName,cxPropDynamicParams:this.data.cxPropDynamicParams,cxPropQueryParams:this.data.cxPropQueryParams,cxPropTransitionData:this.data.cxPropTransitionData,cxPropTarget:this.data.cxPropTarget});
					}
					else{
						popover = Lyte.Component.render("crux-lookup-view-popup", {field : this.data.cxPropField, entityId : this.data.lookupId, cxPropTypeMapping : this.data.uiTypeMapping,
						module : this.data.cxPropModule, cxPropShowImage : this.data.cxPropShowImageInBc,cxPropCallAllowed:this.data.cxPropCallAllowed,cxPropBcZcqa:this.data.cxPropBcZcqa,cxPropHoverCallback : this.data.cxPropHoverCallback==undefined?true:this.data.cxPropHoverCallback,lookupComp:elem,cxPropForcedFetch:this.data.cxPropForcedFetchBc,cxPropRouteName:this.data.cxPropRouteName,cxPropDynamicParams:this.data.cxPropDynamicParams,cxPropQueryParams:this.data.cxPropQueryParams,cxPropTransitionData:this.data.cxPropTransitionData,cxPropTarget:this.data.cxPropTarget}, ".cxLookupBc"); //no i18n
					}
					var _self = this;
					if(this.getMethods("onLookupHoverFetchBcData")){
						popover.setMethods({
							onLookupHoverFetchBcDataPopup : function(modId, recId){
								return _self.executeMethod("onLookupHoverFetchBcData", modId, recId);
							}
						})
					}
					if(this.getMethods("onLookupLinkClicked")){
						popover.setMethods({
							onLookupLinkClickedPopup : function(event,comp,field){
								return _self.executeMethod("onLookupLinkClicked", event,comp,field);
							}
						});
					}
					if(this.data.cxPropRecordImageSrc){
						popover.setData("cxPropRecordImageSrc", this.data.cxPropRecordImageSrc);
					}
					popover.setData("show", true);
				}
				else{
					if(popover){
						popover.setData("show", false);//no i18n
					}
				}
    	},
    	stopPropagation : function(){
    		this.stopPropagation();
    	},
    	onFocusInput : function(onfocus){
			const rightIconBox = this.$node.querySelector(".cxBoxWithRightIcon");
			if(onfocus){
				this.setData("showLoading" , false);
				rightIconBox.classList.remove("cxBoxInputFocused");//No I18n
			} else if (this.data.cxPropPrefixYield){
				rightIconBox.classList.add("cxBoxInputFocused"); //No I18n
			}
		},
	},
	setValueForMultiSelect : function(records){
		var field = this.data.cxPropField , i , api_name = this.data.cxPropType === "multi_module_multi_select" ? field.multiselect_multimodule_lookup.connectedMML_apiname : field.api_name;
		var cxValue = this.data.cxPropValue , len = records.length , assigned = [] , unassigned = [];
		var selectedArr = cxValue ? JSON.parse(cxValue) : [];
		for(i = 0 ; i < len ; i++){
			if(records[i]._delete === null){
				unassigned.push(records[i]);
			}else{
				assigned.push(records[i]);
			}
		}
		var assignLen = assigned.length , unassignLen = unassigned.length , newAssigned = [] , newUnassigned = [] , ind;
		for(i = 0 ; i < assignLen ; i++){
			ind = selectedArr.findIndex(x => x[api_name].id === assigned[i].id);
			if(ind === -1){
				if(this.data.cxPropType === "multiple"){
					newAssigned.push({[api_name] : assigned[i]});
				}else{
					newAssigned.push({[api_name] : assigned[i] , 'id' : field.id });
				}
			}
		}
		for(i = 0 ; i < unassignLen ; i++){
			ind = selectedArr.findIndex(x => x[api_name].id === unassigned[i].id);
			if(ind !== -1){
				newUnassigned.push(unassigned[i]);
			}
		}
		var result = newAssigned.concat(newUnassigned);
		var stringified = result.length ? JSON.stringify(result) : "";
		this.cxValue = stringified;
		this.modalCxValue = assigned;
		this.setData("selectedRecsCount",assigned.length);
		this.setData("cxPropValue" , stringified);
		if(this.getMethods("onValueChange")){
			this.executeMethod("onValueChange", stringified);// No I18n
		}
	},
	observeDropdownProp : function(){
		var obj = {preventParentScroll : this.data.cxPropPreventParentScroll , boxButtonWidth : "min-button" , disabledList : this.data.cxPropDisabledList , placeholder : "For autocomplete selection remove"};
		this.setData('dropdownProp' , JSON.stringify(obj));
	}.observes('cxPropDisabledList.[]' , 'cxPropPreventParentScroll').on('init'),
	ftenToRecord : function(){
		if( !this.initial ){
			this.setData('ften',this.getData('record'));//no i18n
			this.initial=true;
		}
		if(this.getData("cxPropMetaMoreRecords") && this.getData("record").$ && (this.getData("record").$[this.getData("cxPropMetaMoreRecords")] == false || (this.getData("record").$.meta && this.getData("record").$.meta[this.getData("cxPropMetaMoreRecords")] == false))){
			this.noMoreScroll = true;
		}
		else{
			this.noMoreScroll = false
		}
	}.observes('record'),// No I18n
	ftenTorepRecord : function(){
		this.noMoreScroll = false
	}.observes('repRecord'),// No I18n
	saveAndAssocRec : function(){
		this.$node.classList.remove('currentLookupModal') //no i18n
		this.saveNewRecord(this)
	}.observes('save','newCreatedid'),// No I18n
	observeSelectedId : function(){
		var moduleData = this.getData('moduledataUicomp') //no i18n
		var _this=this,id=this.getData('selectedSingleId'),module=this.getData('module'),newLookupcreated=this.getData('newLookupcreated'); //no i18n
		moduleData.selectedId = id
		moduleData.lookupSingle = this.getData('lookupSingle')//no i18n
		this.setData('moduledataUicomp',moduleData)//no i18n
		if(newLookupcreated){//no i18n
			var modName = moduleData.lookup.module.id;
			if(modName){
				if(!module.id && moduleData.module.id !== modName){
					store.findRecord('module',modName).then(function(res){//no i18n
						_this.setData({'module':res[0],'moduleName':res[0].module_name,'displayField':res[0].display_field.api_name})//no i18n
						_this.setSelectedId(modName,id)
					})
				}else if(module.id || moduleData.module.id === modName){
					_this.setData({'module':moduleData.module[0],'moduleName':moduleData.module[0].module_name,'displayField':moduleData.module[0].display_field.api_name}) //no i18n
					_this.setSelectedId(modName,id)
				}
			}
		}
	}.observes('selectedSingleId'), // no i18n
	singleValueSet : function(){
		var moduledataUicomp=this.getData('moduledataUicomp'),comp=this.getData('relatedFieldComp');//no i18n
		moduledataUicomp.selectedId = this.getData('selectedSingle').id//No I18n
		moduledataUicomp.lookupSingle = this.getData('lookupSingle')//no i18n
		this.setData('moduledataUicomp',moduledataUicomp)//no i18n
	}.observes('selectedSingle'),//no i18n
	beforeShowFunc : function(event,ddelem,bool,resolveBefore){
		var _this=this, prom , val = this.$node.querySelector("lyte-autocomplete").ltProp('value');  //no i18n
		val = val === undefined ? val : val.trim();
		if(!val){
			var Obj = this.data.queryParamObject || {};
			Obj.page = 1;
			Obj.per_page = this.data.cxPropPerpage;
			if(this.data.cxPropQueryParam){
				for(var key in this.data.cxPropQueryParam){
					Obj[key] = this.data.cxPropQueryParam[key];
				}
			}
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			let qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", this.data.module.id, qp);
			}else{
				prom = this.fetchRecords(this.data.module.id , qp);
			}
			return Lyte.resolvePromises(prom).then(function(recs){ //no i18n
				recs = (recs && recs.length)?recs:[];
				// _this.noMoreScroll = false;
				_this.setData({'record':recs,'ften':recs,'queryParamObject':Obj})// No I18n
				_this.setData("showLoading", false);//No I18n
				if(!_this._modalOpened && _this.inputFocused){
					_this.setData('initComp',true)//no i18n
					_this.$node.querySelector(":not(crux-dropdown) > lyte-dropdown").open();//No I18n
					if(_this._initRes){
						_this._initRes()
					}
					if(resolveBefore){
						resolveBefore()
					}
				}else if(_this._initRej){
				    _this._initRej();
				}
			}, function(errRes){
				//rejected
				_this.initFromField=false;
				_this.setData("showLoading", false);//No I18n
				if(_this._initRej){
				    _this._initRej();
				}
				if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		}else{
			this.setData('initComp',true)//no i18n
		this.onSearchFun(val,resolveBefore, ddelem.data.ltPropSelected || this.data.value ? this.data.value.id : "");
		}
	},
	showLookupFunc : function(elem,lookup){
		if(this.getMethods("onBeforeShowLookup")){
			/**
			 * It will trigger before show the lookup dropdown.
			 * @method onBeforeShowLookup
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			var res = this.executeMethod("onBeforeShowLookup");
			if(res == false){
				return false;
			}
		}
	    if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv){
			commonUtils.showHideLoadingDiv(true);
		}
		if(this.selectedIds){
			this.setData('selectedIds', this.selectedIds); // Prevent the binding call to lookup modal using cxProValue observes
		}
		if(!lookup &&!this.getData('renderLookup')){ //no i18n
			if(elem.getData('moduledataUicomp').data_type==='lookup'){//no i18n
				elem.setData('isSingle',true)//no i18n
			}else{
				elem.setData('isSingle',false)//no i18n
			}
			elem.setData('renderLookup',true)//no i18n
			elem.setData('dispInit',true); //no i18n
			elem.setData('cxPropShow',true); //no i18n
		}
		else{
			elem.setData({ 'modalCxValue' : this.modalCxValue && this.modalCxValue.length ? JSON.stringify(this.modalCxValue) : "" , 'cxPropShow' : true }); //no i18n
			var elem=(lookup)?elem:this.$node.querySelector(this.lookupModalName).component,isSingle=elem.data.isSingle;//module=elem.data.module,api=module.module_name,id = module.id ;
				if(isSingle){
					elem.records = [];
					// elem.getRecs();
					elem.lookupInit(elem, elem.getData("modId"), true);//No I18n
					// var Obj={page:1,per_page:10} //no i18n
				}
		}
	},
	onSearchFun : function(val,resolveBefore, id){
		var disp = this.getData('displayField') , prom ,Obj = this.data.queryParamObject || {}, _this = this;//no i18n
		/*
		var lookupSingle=this.getData('lookupSingle'),sel = this.getData('selectedSingle'); //no i18n
		if(disp==='Full_Name' && lookupSingle === sel[disp]){
			val = (sel.First_Name)?sel.First_Name+' '+sel.Last_Name:sel.Last_Name
		}*/
		let searchFormat = this.data.cxPropSearchFormat;
		if(val){
			let searchCri = this.constructSearchFilter(disp, val,(this.data.module && this.data.module.display_field) ? store.peekRecord('field',this.data.module.display_field.id) : disp ? store.peekAll("field").filterBy({api_name : disp})[0] : undefined,searchFormat);
			if(this.initialCriteria){
				if(searchFormat){
					Obj.filters = this.joinSearchApiCriteria(this.initialCriteria, searchCri); // No I18n
				}else{
					Obj.filters = {group : [this.initialCriteria , searchCri] , group_operator : "AND"};
				}
			}else{
				Obj.filters = searchCri;
			}
		}else if(this.initialCriteria){
			Obj.filters = this.initialCriteria;
		}else{
			delete Obj.filters;
		}
		Obj.page = 1;
		Obj.per_page = this.data.cxPropPerpage;
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				Obj[key] = this.data.cxPropQueryParam[key];
			}
		}
		if(!disp){
			this.lookupInit(this,this.data.cxPropType=="multi_module_lookup" ? this.data.modId : this.getData('moduledataUicomp').lookup.module.id,false,undefined,this)//No I18n
		}
		else{
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			let qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", this.getData("modId"), qp);
			}else{
				prom = this.fetchRecords(this.getData("modId"), qp);
			}
			Lyte.resolvePromises(prom).then(function(recs){ //No I18n
				_this.setData("searchPerformed", true);//no i18n
				var _val = _this.$node.querySelector("input").value , dropdownComp = _this.$node.querySelector("lyte-dropdown").component , dList = _this.data.cxPropDisabledList;//No I18n
				var dropChildComp = dropdownComp.childComp;
				if(val === "" || val &&  _val !== ""){
					_this.setData({'ften':recs,'queryParamObject':Obj}) //no i18n
					if(_this.getData("cxPropMetaMoreRecords") && _this.getData("record").$ && (_this.getData("record").$[_this.getData("cxPropMetaMoreRecords")] == false || (_this.getData("record").$.meta && _this.getData("record").$.meta[_this.getData("cxPropMetaMoreRecords")] == false))){
						_this.noMoreScroll = true;
					}
					else{
						_this.noMoreScroll = false;
					}
					if(dropdownComp && dList && dList.length){
						dropdownComp.setData('ltPropDisabledList' , []);
						dropdownComp.setData('ltPropDisabledList' , dList);
					}
					recs=(recs)?recs:[]
					// if(!recs.length){
					// 	_this.search=true
					// }
					if(resolveBefore){
						resolveBefore()
					}
					if(_this._initRes && _this.inputFocused){
						_this._initRes()
					}else if(_this._initRej){
				   	 	_this._initRej();
					}
					_this.setData("showLoading", false);//No I18n
					if(!_this._modalOpened && _this.inputFocused){
						_this.$node.querySelector(":not(crux-dropdown) > lyte-dropdown").open();//No I18n
					}
					if(_val != val){
						_this.$node.querySelector("lyte-autocomplete").setValue(_val);//No I18n
					}
					if(val == ""){
						_this.setData("searchPerformed", false);
					}
					if(dropChildComp){
						let elem = dropChildComp.querySelector("[data-value='"+id+"']");
						if(elem){
							elem.setAttribute("selected", true);//No I18n
						}
					}
				}
			}, function(errRes){
			   _this.setData("showLoading", false);//No I18n
			   if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					_cruxUtils.showPermissionDeniedModal();
				}
			    if(_this._initRej){
					_this._initRej()
				}
			})
		}
	},
	scrollRequest : function(_this,Obj,scrollElem,record,lookup){
		if((!_this.scrl) &&(scrollElem.scrollTop + scrollElem.offsetHeight >= scrollElem.scrollHeight-10)){
			Obj.page += 1;
			Obj.per_page = this.data.cxPropPerpage;
			if(this.data.cxPropQueryParam){
				for(var key in this.data.cxPropQueryParam){
					Obj[key] = this.data.cxPropQueryParam[key];
				}
			}
			_this.scrl = true
			if(lookup){
				var loader=_this.$node.querySelector('#modalElem').component.childComp.querySelector('.lookupFetchLoad')//no i18n
				if(loader){
					loader.style.display='block'//no i18n
				}
			}
			var modId=_this.data.module.id , prom;
			if(this.getMethods("beforeRequestChangeData")){
	    		this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
	    	}
			this.setData('showDropdownLoading' , true);
			var qp = Object.assign({}, Obj);
			if(this.getMethods("fetchRecords")){
				prom = this.executeMethod("fetchRecords", modId, qp );
			}else{
				prom = this.fetchRecords(modId , qp);
			}
			Lyte.resolvePromises(prom).then(function(recs){ //No I18n
				_this.setData('showDropdownLoading' , false);
				if(recs){
					record=record.concat(recs)
					_this.setData( 'record', record ) // No I18n
					if(lookup){
						Lyte.arrayUtils( _this.data.displayArray, 'push', recs ) // No I18n
					}else{
						Lyte.arrayUtils( _this.data.ften, 'push', recs ) // No I18n
					}
					_this.setData('queryParamObject',Obj)  //no i18n
					recs = {};
					var id = _this.data.value ? _this.data.value.id : "" , dropdownComp = _this.$node.querySelector("lyte-dropdown").component , dList = _this.data.cxPropDisabledList;//No I18n
					var dropChildComp = dropdownComp.childComp;
					if(dropChildComp){
						let dElem = dropChildComp.querySelector("[data-value='"+id+"']");
						if(dElem){
							dElem.setAttribute("selected", true);//No I18n
						}
					}
					if(dropdownComp && dList && dList.length){
						dropdownComp.setData('ltPropDisabledList' , []);
						dropdownComp.setData('ltPropDisabledList' , dList);
					}
				}else{
					_this.noMoreScroll=true;
				}
				setTimeout( function(){
					_this.scrl=false;
				}, 20 )
				if(lookup&& loader){
					loader.style.display='none'//no i18n
				}
			}, function(errRes){
				if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
				{
					this.setData('showDropdownLoading' , false);
					_cruxUtils.showPermissionDeniedModal();
				}
			})
		}
	},
	didDestroy : function(){
		var ele = document.getElementById("cruxLookupPopover");
		if(ele){
			ele.remove();
		}
	},
	getValue : function(){
		if (this.$node.querySelector("#cruxLoadingElem")) {
			return this.data.cxPropValue;
		}
		if(this.data.cxPropFrom == 'criteria'){
			if(this.data.cxPropRenderAutoCompleteInCriteria){
				return this.data.cxPropValue;
			}
			var textVal = this.data.cxPropHideTextComponent ? "" : this.$node.querySelector('#lookupTextComponent').component.getValue();
			if(this.data.cxPropType == 'multi_module_lookup'){
				textVal = Object.assign({module : {api_name : this.data.module.api_name,id : this.data.modId}},{name : textVal});
			}
			return textVal;
		}
		var selectedVal = this.getData("cxPropValue"), parsedVal = this.getData("value");//No i18n
		if(this.data.cxPropType == 'multi_module_lookup' && selectedVal){
			selectedVal = Object.assign({module : {api_name : this.data.module.api_name,id : this.data.modId}},JSON.parse(selectedVal));
			selectedVal = JSON.stringify(selectedVal)
		}else if(this.data.cxPropType === 'multi_module_multi_select' || this.data.cxPropType === 'multiple'){
			selectedVal = this.cxValue;
		}
		if(parsedVal && parsedVal.id){
			var currentInpVal = this.$node.querySelector('lyte-input #'+this.data.cxPropInputId);//No i18n
			if(currentInpVal && currentInpVal.value && currentInpVal.value.trim() == parsedVal.name.trim()){
				if(this.data.cxPropReturnFullObjectOnGet){
					return this.data.selectedSingle;
				}
				return selectedVal;
			}
			return undefined; //fix for ZCRM-91703
		}
		return selectedVal;
	},
	validate : function(){
		if(this.data.cxPropFrom == 'criteria'){
			if(this.data.cxPropRenderAutoCompleteInCriteria){

				if(!this.getValue()){

					this.showAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.data.cxPropField.field_label)));//No I18n

					this.$node.querySelector("input").focus();//No I18n

					return false;

				}

				return true;

			}
			return this.data.cxPropHideTextComponent ? true : this.$node.querySelector('#lookupTextComponent').component.validate()
		}else{
			let input = this.$node.querySelector("input");
			let isEmptyVal = input === null || this.$node.querySelectorAll("input").length === 0 || input.value === "" || input.value.trim() === "";
			if( this.$node.querySelector("#cruxLoadingElem") ){
				isEmptyVal = !this.getValue();
			}
			var val = this.validateMandatory( isEmptyVal );//No I18n
			if(val){
				val = this.validateMandatory(!this.getValue(), function(){
					if(this.getMethods("onError")){
						/**
						 * Triggered when there is an error on validation
						 * @method onError
						 * @author anuja.manoharan
						 * @version 1.0.0
						 */
						this.executeMethod("onError", this.errorCodes.ERR02, this);//No I18n
					}
					else{
						this.setData("cxPropErrorMessage", _cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData("cxPropField").field_label)));//No I18n
					}
				}.bind(this));
			}
			if(!val){
				this.setData("cxPropValue",this.getValue());//No i18n
				if(!this.data.cxPropPreventFocusOnError){
					this.$node.querySelector("lyte-autocomplete") ? this.$node.querySelector("lyte-autocomplete").focus() : "";//No I18n
				}
			}
			return val;
		}
	},
	resetData:function(){
		var input = this.$node.querySelector('lyte-input');
		if(input){
			input.ltProp('value','');
		}
		this.setData({cxPropValue : {}, lookupSingle : ""})
	},
	observePrefixYield: function () {
		this.observePrefixAndSuffixYieldMixin(this.data.cxPropPrefixYield, this.data.cxPropSuffixYield, "crux-lookup-component");
	}.observes('cxPropPrefixYield', 'cxPropSuffixYield', 'cxPropFrom', "lyteViewPort").on('didConnect'),
	observeErrorMessage : function(){
		this.setData("isError", this.getData("cxPropErrorMessage") == "" ? false : true);//No I18n
	}.observes("cxPropErrorMessage").on("init"),//No I18n
	observeValue : function(){
		if(this.getData("cxPropFrom") == "view"){
			var value = this.data.cxPropValue , field = this.data.cxPropField;
			if(value){
				if(this.data.cxPropType === "multiple" && !this.data.cxPropEmptyValue){
					this.setMultiSelectValues();
					this.setData({"cxPropEmptyValue" : this.data.lookupSingle , "showEmptyValue" : true});
				}else{
					try{
						if(value == "null" || typeof JSON.parse(value) != 'object'){
							throw 'number'
						}
						value = JSON.parse(value);
						this.setData({lookupValue : value.name, lookupId : value.id});
						if(this.data.cxPropType === "multi_module_lookup"){
							this.setData("modulePluralLabel", moduleRecordMapping[idModuleMapping[value.module.id]].plural_label);
						}
	//					this.data.lookupValue = value.name;
	//					this.data.lookupId = value.id;
						this.setData("showEmptyValue", false)//No I18n
					}
					catch(err){
					// 	this.data.lookupValue = value;
						this.setData("lookupValue", value);//No I18n
					}
					if(typeof value != "string" && typeof value != "object"){
						value = value.toString();
						// this.data.lookupValue = value;
						this.setData("lookupValue", value);//No I18n
					}
				}
			}
			else{
				this.setData({value : {}, lookupSingle : "" , lookupValue : "" , lookupId : ""});
				if(this.getData("cxPropEmptyValue")){
					this.setData("showEmptyValue", true);//No i18n
				}
			}
		}else if((this.getData("cxPropFrom") === "create" || this.data.cxPropRenderAutoCompleteInCriteria ) && this.getData("cxPropValue") && ['single' , 'multi_module_lookup'].includes(this.data.cxPropType)){
			if(!this.data.moduledataUicomp){
				this.setData('moduledataUicomp' , this.data.cxPropField);
			}
			if(this.data.cxPropValue){
				try{
					var value = JSON.parse(this.data.cxPropValue);
					this.setData('selectedSingle',value);
					if(value.name){
						this.setData("value", value);
						this.setData("lookupSingle", value.name);
					}
				}
				catch(err){
					if(this.data.cxPropValue.name){
						this.setData("value", this.data.cxPropValue);// No I18n
						this.setData("lookupSingle", this.data.value.name);// No I18n
					}
				}
				var inputElem = $L("lyte-autocomplete" , this.$node).find('input')[0];// No I18n
				if(inputElem){
					inputElem.selectionStart = inputElem.selectionEnd = this.data.lookupSingle.length;
				}
			}else{
				this.setData({value : "", lookupSingle : ""});
			}
		}else if(this.data.cxPropFrom === 'criteria' && this.data.cxPropType === 'multi_module_lookup'){
			var value = this.data.cxPropValue;
			if(value){
				value = JSON.parse(value);
				this.setData({lookupValue : value.name, lookupId : value.id});
				if(this.data.cxPropType == "multi_module_lookup"){
					this.setData("modulePluralLabel", moduleRecordMapping[idModuleMapping[value.module.id]].plural_label);
				}

			}
		}else if(this.data.cxPropType === 'multiple' || this.data.cxPropType === 'multi_module_multi_select'){
			this.setMultiSelectValues(this.data.cxPropValue);
		}else{
			this.setData('lookupValue',this.data.cxPropValue);
		}
		// if(this.data.cxPropValue && (!val || ( val && val.item === 'cxPropFrom'))){  //Catch the initial value
		// 	this.initCxValue = Lyte.deepCopyObject(JSON.parse(this.data.cxPropValue));
		// }
	}.observes("cxPropValue", "cxPropFrom").on("init"),//No I18n
	setMultiSelectValues : function(value){
		var name , field = this.data.cxPropField , ids = "";
			if(value){
				value = JSON.parse(value);
				var len = value.length , recObj = [];
				if(this.data.cxPropType === 'multiple'){
					if(len === 1){
						name = value[0][field.api_name].name;
					}else if(len >= 2){
						name = value[0][field.api_name].name + ', ' + value[1][field.api_name].name;
						if(len > 2){
							name = name + ".. & More";
						}
					}
					this.setData("lookupSingle" , name);
					ids = value.map(x => x[field.api_name].id);
					this.selectedIds = JSON.stringify(ids);
					recObj = value.map(function(x){ return  {"id" : x[field.api_name].id , "name" : x[field.api_name].name};});
					// this.setData("selectedIds", JSON.stringify(ids));
				}else{
					var mmlApiName = field.multiselect_multimodule_lookup.connectedMML_apiname;
					for(var i = 0; i < len ; i++){
						recObj.push(value[i][mmlApiName]);
					}
					this.setData("selectedRecsCount",len);
				}
				this.modalCxValue = recObj;
				this.setData("modalCxValue" , recObj && recObj.length ? JSON.stringify(recObj) : "");
			}
	},
	refresh : function(opt){
		if(this.lookupModalName === "crux-lookup-filter-modal"){
			this.setData("renderLookup",true); //No I18N
			return;
		}
		var elem = this.$node.querySelector(this.lookupModalName);
		if(!elem){
			return;
		}
		elem = elem.component;
		var Obj = this.data.queryParamObject || {}; //No I18n
		Obj.page = 1;
		Obj.per_page = this.data.cxPropPerpage;
		if(this.data.cxPropQueryParam){
			for(var key in this.data.cxPropQueryParam){
				Obj[key] = this.data.cxPropQueryParam[key];
			}
		}
		if(this.getMethods("beforeRequestChangeData")){
			this.executeMethod("beforeRequestChangeData", Obj, undefined, this.data.cxPropField);
		}
		var qp = Object.assign({}, Obj) , prom;
		if(this.getMethods("fetchRecords")){
			prom = this.executeMethod("fetchRecords", this.getData("module").id, qp );
		}else{
			prom = this.fetchRecords(this.getData("module").id, qp);
		}
		Lyte.resolvePromises(prom).then(function(recs){ //No I18n
			recs = (recs && recs.length) ? recs : [];
			if(opt && opt.cxPropValue){
				this.setData({cxPropValue : opt.cxPropValue, value : JSON.parse(opt.cxPropValue), lookupSingle : JSON.parse(opt.cxPropValue).name});
				elem.setData({lookupSingle : JSON.parse(opt.cxPropValue).name, selectedSingle : JSON.parse(opt.cxPropValue).id})
			}
			elem.setData({record : recs, queryParamObject : Obj});
			if(recs.length < 10){
				elem.setNavigator(recs.length);
			}
			else{
				elem.setNavigator(recs.length, true);
			}
			elem.rendHome();
		}.bind(this), function(errRes){
			if(errRes.status === 403 || (errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION'))
			{
				_cruxUtils.showPermissionDeniedModal();
			}
		}.bind(this));
	},
	observeMandatory : function(){
		this.observeMandatoryMixin(this.data.cxPropPrefixYield ? ".cxBoxWithRightIcon" : ".cxLookupComponent");//No I18n

	}.observes("cxPropField.required", "cxPropMandatory", "cxPropFrom", "cxPropPrefixYield"),//No I18n
	observesdidConnect : function(){
		if(this.getData("cxPropFrom") == "create"){
			this.$node.classList.add("cxFlex");//No I18n
		}
		this.observeMandatoryMixin(".cxLookupComponent");//No I18n
		if(this.getData("cxPropToggle")){
			var autoCompleteNode = this.$node.querySelector("lyte-autocomplete");//no i18n
			if(autoCompleteNode){
				autoCompleteNode.toggle();
			}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	close : function(){
		this.$node.querySelector(this.lookupModalName).component.close();
	},
	observeIsError : function(){

		// if (this.data.cxPropPrefixYield) {
					// Yield Support Not Provided (Remember)
		// } else {
			
		// }


		if(this.getData("cxPropFrom") == "create" && this.$node.querySelector("lyte-input")){
            var compNodeObj = $L(this.$node);
            var lyteInput = compNodeObj.find("lyte-input");
            var boxRightIcon = compNodeObj.find('.cxBoxWithRightIcon');
            var errorMsg = compNodeObj.find('crux-error-message');
			if(this.getData("isError")){
                boxRightIcon.addClass('cxErrorBoxWithRightIcon');
                if(errorMsg.hasClass('cxErrorMsgMultiLines')) {
                    boxRightIcon.addClass('cxErrorMsgMultiLinesBoxInside');
                }
			}
			else{
                boxRightIcon.removeClass('cxErrorBoxWithRightIcon');
                boxRightIcon.removeClass('cxErrorMsgMultiLinesBoxInside');
			}
		}
	}.observes("isError").on("didConnect"),//No I18n

	observeMultiModules : function(){
		if(this.data.cxPropType === "multi_module_lookup" && this.data.cxPropFrom !== 'view'){
			var a=[];
			if(this.data.cxPropField.multi_module_lookup.modules && this.data.cxPropField.multi_module_lookup.modules.length){
				this.data.cxPropField.multi_module_lookup.modules.map(function(item){return item.id}).forEach(function(item){a.push(moduleRecordMapping[idModuleMapping[item]])});
			}
			if(this.data.cxPropValue){
				var valueMod = JSON.parse(this.data.cxPropValue).module;
				if(valueMod){
					var selectedModule = moduleRecordMapping[idModuleMapping[valueMod.id]];
					this.setData('module',selectedModule);
					this.setData({'modId' : selectedModule.id , 'cxPropMultiModuleSelectId' : selectedModule.id});
					this.setData('cxPropModule',selectedModule.module_name);
					if(a.cruxFindIndexOfObject('id',valueMod.id) == -1){
						a.unshift(selectedModule);
						this.setData('moduleDisabledList',[valueMod.id]);
					}
				}
			}else if(a[0]){ // In some cases the module options is not available in the field info. Added the check here to prevent the console error.
				var sIndex = 0;
				if(this.data.cxPropMultiModuleSelectId){
					var index = a.findIndex( x => x.id === this.data.cxPropMultiModuleSelectId);
					if(index !== -1){
						sIndex = index;
					}
				}
				this.setData('module',a[sIndex]);
		    	this.setData('modId',a[sIndex].id);
		    	this.setData('cxPropModule',a[sIndex].module_name);
			}
			this.setData('multiModuleModules',a);
		}
	}.observes("cxPropField.multi_module_lookup" , "cxPropValue" , 'cxPropFrom').on('init'),//No I18n
	observeFrom : function(){
		if(this.getData("cxPropFrom") === "create" || this.data.cxPropRenderAutoCompleteInCriteria){
			this.setData("modulenameUicomp", this.data.cxPropModule);//No I18n
			var field = this.getData("cxPropField");//no i18n
			this.setData({columnName : field.column_name, apiName : field.api_name});
			if(!this.data.moduledataUicomp){
				this.setData('moduledataUicomp' , this.data.cxPropField);
			}
			if(field.data_type === "lookup"){
				if(field.lookup && this.getData("cxPropModule") === field.lookup.module.api_name && typeof moduleRecordMapping !== "undefined"){
					this.setData("module", moduleRecordMapping[this.data.cxPropModule]);
				}
				this.setData({modId : field.lookup.module.id, isSingle : true});
			}else if(field.data_type === "multiselectlookup" && field.multiselectlookup && field.multiselectlookup.connected_module){
				this.setData("modId" , field.multiselectlookup.connected_module.id);
			}else if(this.data.cxPropType === "multi_module_lookup" && this.data.cxPropField.multi_module_lookup.modules && this.data.cxPropField.multi_module_lookup.modules.length){
				var mml , sIndex = 0 , cxValue = this.data.cxPropValue;
				if(!this.data.multiModuleModules.length){
					this.setData("multiModuleModules",this.data.cxPropField.multi_module_lookup.modules.map(function(item){return item.id}).forEach(function(item){a.push(moduleRecordMapping[idModuleMapping[item]])}));
				}
				var modules = this.data.multiModuleModules , moduleSelectId = this.data.cxPropMultiModuleSelectId || cxValue && JSON.parse(cxValue).module.id;
				if(moduleSelectId){
					var index = modules.findIndex( x => x.id === moduleSelectId);
					if(index !== -1){
						sIndex = index;
					}
				}
				this.setData({modId : modules[sIndex].id, isSingle : true,module : modules[sIndex]});
			}
			this.$node.refresh = function(opt){
				return this.component.refresh(opt);
			}
			this.$node.close = function(){
				return this.component.close();
			}
			this.$node.clear = function(){
				this.component.clear();
			}
			this.$node.showLookup = function(){
				this.component.showLookupFunc(this.component);
			}
			this.setFocusUtil();
		}
	}.observes("cxPropFrom", "cxPropDisabled").on("init"),//No I18n
	observeName : function(){
		var input = this.$node.querySelector("input");
	    if(this.data.cxPropFrom === "create" && input){
			$L.fastdom.measure(()=>{
				var isTitleNeeded = (input.scrollWidth-1) > input.offsetWidth;
				$L.fastdom.mutate(()=>{
					if(isTitleNeeded){
						input.setAttribute("title", this.data.lookupSingle);
					}else{
						input.setAttribute("title", "");

					}
				});
			});
		}
	}.observes("lookupSingle").on("didConnect"),//no i18n
	observeTooltip : function(){
		this.observeAndSetTooltip();
	}.observes("cxPropTooltip" , "cxPropDisabled").on("init"),//No I18n
	observeRender : function(a){
		if(!this.data.lyteViewPort){
				if(this.getMethods('onElementRendered')){
					/**
					 * It will trigger after rendering the component.
					 * @method onElementRendered
					 * @author anuja.manoharan
					 * @version 1.0.0
					 * @param { * } this
					 */
					this.executeMethod('onElementRendered',this);
				}
		}
	}.observes("lyteViewPort").on("didConnect"),//No I18n
	ele : ".cxLookupComponent",//No I18n
	clear : function(focusElem){
		if(this.getMethods("onClear")){ 
			/**
			 * It will trigger while clear the search value.
			 * @method onClear
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			var res = this.executeMethod("onClear");//No I18n
			if(res == false){
				return false;
			}
		}
		if(this.getData("cxPropClearErrorMessage")){
			this.setData("cxPropErrorMessage", "");//No I18n
		}
		this.setData('selectedSingle',{});//no i18n
		this.setData('lookupSingle','');//no i18n
		// this.$node.querySelector("lyte-autocomplete").ltProp("value", "")//No I18n
		this.setData('selectedSingleId','');//no i18n
		this.setData("cxPropValue", undefined);//No i18n
		// this.$node.querySelector('lyte-autocomplete').ltProp('selected','')//no i18n
		var lookupCreateRecord = this.getData('lookupCreateRecord');// no i18n
		this.setData('ften',this.getData('record')) // no i18n
		if(lookupCreateRecord && lookupCreateRecord.module){

			lookupCreateRecord.createNew=false;
			this.setData('lookupCreateRecord',lookupCreateRecord);	//No I18n
		}
		var lyteAutoComp = this.$node.querySelector('lyte-autocomplete');
		if(lyteAutoComp){
			lyteAutoComp.ltProp("value", "");//No I18n
			lyteAutoComp.ltProp('selected','');//no i18n
			if(focusElem){
				$L("lyte-input" , lyteAutoComp)[0].focus();//eslint-disable-line @zoho/webperf/no-complex-selector
			}
		}
		if(this.initialCriteria){
			this.data.queryParamObject.filters = this.initialCriteria;
		}else{
			delete this.data.queryParamObject.filters;
		}
		//fix for ZCRM-91152
		// this.$node.querySelector("lyte-autocomplete lyte-input").focus();//No I18n
		this.setData("cxPropShowCloseIcon", false);//No I18n
		this.data.value = undefined;
	},
	mandatoryType : function(){
		this.observeMandatoryTypeMixin(".cxLookupComponent");//No I18n
	}.observes("cxPropMandatoryType", "cxPropFrom").on("didConnect"),
	keyEvent : function(){
		var thisComp = this;
		if(this.$node){
			thisComp = this.$node;
		}
		if(thisComp.querySelector('.cxLookupIcon')){
			var focusableIcon = thisComp.querySelector('.cxLookupIcon');
			if(this.data.cxPropTabIndex === undefined && this.data.cxPropTabindex === undefined && (focusableIcon.tabIndex === -1 || focusableIcon.tabIndex === '-1')){
				focusableIcon.tabIndex = 0;
			}
			function iconRefocus(event){
				if(event.type == 'mousedown' || (event.type == 'keydown' && (event.key == ' ' || event.key == 'Enter'))){
					setTimeout(() => {
						var lyteModal = focusableIcon;
						if(lyteModal.parentElement){
							lyteModal = lyteModal.parentElement.querySelector('crux-lookup-modal lyte-modal'); // eslint-disable-line @zoho/webperf/no-complex-selector
						}
						if(lyteModal){
							lyteModal.component.childComp.addEventListener('keydown', function(){
								var currThis = this;
								var currTableComp = currThis;
								if(!this.$node){
									currThis = this.component;
									currTableComp = currTableComp.querySelector('crux-table-component');
								}else{
									currTableComp = currTableComp.$node.querySelector('crux-table-component');
								}
								if((event.key === ' ' && currThis.parent && currThis.parent.tagName.includes('MODAL') && (currThis.parent.attributes.ltPropCloseOnEscape === true || currThis.parent.attributes.ltPropCloseOnEscape === 'true' || currThis.parent.component.data.ltPropCloseOnEscape === true)) && (currTableComp && (currTableComp.attributes.listener || currTableComp.querySelector('[listener]')))){
									currThis.parent.ltProp('closeOnEscape', false);
								}else if(event.key == 'Escape'){
									setTimeout(() => {
										if(currThis.parent.ltProp('closeOnEscape')){
											focusableIcon.focus();
										}
										if(currThis.parent && currThis.parent.tagName.includes('MODAL') && (currThis.parent.attributes.ltPropCloseOnEscape === false || currThis.parent.attributes.ltPropCloseOnEscape === 'false' || currThis.parent.component.data.ltPropCloseOnEscape === false) && !(currTableComp && (currTableComp.attributes.listener || currTableComp.querySelector('[listener]')))){
											currThis.parent.ltProp('closeOnEscape', true);
										}
									}, 50);
								}
								focusableIcon.removeEventListener('mousedown', iconRefocus);
								focusableIcon.removeEventListener('keydown', iconRefocus);
							})
						}
					}, 50);
				}
			}
			focusableIcon.addEventListener('mousedown', iconRefocus);
			focusableIcon.addEventListener('keydown', iconRefocus);
		}
	}.on('didConnect'),
	observeAndSetAria : function(){
		if(this.data.cxPropAria){
			this.ariaSetForView();
		}
	}.observes('cxPropAria').on('didConnect'),
	setElementClass : function(){
		if(this.data.cxPropFrom === "create"){
			this.setData({elementClass : "cxElementValue "+(this.data.cxPropReadonly ? "cxElementReadOnly ":"")+((this.data.cxPropDisabled && !this.data.cxPropReadonly)? "cxElementDisabled " : "")+(this.data.cxPropType === "multiple" ? "cP " : "")});
		}
	}.observes("cxPropFrom", "cxPropReadonly", "cxPropDisabled", "cxPropType").on("init")
}, {mixins : ["crux-lookup-mixin", "crux-element-validation"]}); //No I18N
Lyte.Component.registerHelper('isDisabledRecord',function(id , disabledList){
	if(disabledList && disabledList.length){
		return disabledList.includes(id);
	}
	return false;
});
// var a = $0;
// store.findRecord('module',moduleRecordMapping.Appointments.id).then(()=>{
//   var comp = Lyte.Component.render('crux-lookup-component',{cxPropFrom : 'create',cxPropField : store.peekRecord('field','832108000000948251'),cxPropType : 'multi_module_lookup'},a)
//     comp.setMethods({fetchModuleData : function (id) { // NO I18N
// 			return store.findRecord("module",id,undefined,undefined,undefined).then(function (e) {// NO I18N
// 				return e[0];
// 			});
// 		},
//         fetchRecords : function(id,params){
//                 return store.findAll(id, params)
//             }
//         })
// })

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

/**
 * @component crux-table-component
 * @author anuja.manoharan
 * @version 1.0.0
 * @alias crm-custom-table 1
 */
Lyte.Component.register("crux-table-component", {
_template:"<template tag-name=\"crux-table-component\"> <template is=\"if\" value=\"{{cxPropExpress}}\"><template case=\"true\"> <lyte-expresstable lt-prop-aria=\"{{cxPropAria}}\" lt-prop-content=\"{{content}}\" lt-prop-role=\"{{cxPropRole}}\" lt-prop-height=\"{{cxPropHeight}}\" lt-prop-header-label-key=\"field_label\" lt-prop-full-yield=\"{{cxPropFullYield}}\" lt-prop-yield=\"true\" lt-prop-header=\"{{header}}\" lt-prop-fixed-table-scroll=\"true\" id=\"{{cxPropTableId}}\" lt-prop-dual-resize=\"{{cxPropDualResize}}\" onscroll=\"{{action('scroll',event)}}\" lt-prop-scrollbar-option=\"{&quot;showOn&quot; : &quot;{{cxPropShowScrollOn}}&quot;, &quot;containerClass&quot; : &quot;scrollbarClass&quot;}\" on-resize-select=\"{{method('resizeSelect')}}\" on-resize-end=\"{{method('resizeEnd')}}\" class=\"pR {{cxPropTableClass}}\" before-set-fix-table-column-width=\"{{method('beforeSetFixTableColumnWidth')}}\" after-set-fix-table-column-width=\"{{method('afterSetFixTableColumnWidth')}}\" lt-prop-prevent-content-observer=\"true\" lt-prop-prevent-width=\"{{cxPropPreventWidth}}\" lt-prop-sticky-table=\"{{cxPropStickyTable}}\" onmouseover=\"{{action('hoverOnTable',index,true)}}\" onmouseout=\"{{action('hoverOnTable',index)}}\"> <template is=\"registerYield\" yield-name=\"fullYield\"> <lyte-exptable> <lyte-exptable-thead> <lyte-exptable-tr id=\"{{cxPropHeaderRowId}}\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{cxPropResizeCheckbox}}\" fixed=\"{{cxPropFixCheckbox}}\"> <lyte-checkbox></lyte-checkbox> </lyte-exptable-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}} cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\"></lyte-yield> </lyte-exptable-th> </template><template case=\"false\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} cxSortQuery cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-text class=\"{{if(cruxAnd(cxPropEnableSort,negate(cxPropShowSortIcon)),'cP','')}} cxTableHeadingElem\" lt-prop-tooltip-config=\"{{cruxStringify(cxPropHeaderTooltipConfig)}}\" lt-prop-value=\"{{field[cxPropLabelSelector]}}\" onclick=\"{{action('sort',field,event)}}\" lt-prop-tooltip-class=\"{{cxPropHeaderTooltipClass}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn)),'&amp;&amp;',cxPropShowSortIcon)}}\"><template case=\"true\"> <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropNewListView,'&amp;&amp;',cxPropIsAlphaSearchShown),'&amp;&amp;',cxPropModuleDisplayField[cxPropModule])}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxContains(cxPropModuleDisplayField[cxPropModule],field.api_name,cxPropModuleDisplayField[cxPropModule].length)}}\"><template case=\"true\"> <span><lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield></span> </template></template></template></template> <template is=\"if\" value=\"{{cxPropShowSortIcon}}\"><template case=\"true\"> <span class=\"cxTableSortIcon\" onclick=\" {{action('sortIconClick',field,event)}}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> <span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropNewListView,'!')}}\"><template case=\"true\"> <span class=\"cx_sortIconPlaceholder dIB mL5 vam\"></span> </template></template></template></template></template></template> </lyte-exptable-th> </template></template></template></template> </template> </lyte-exptable-tr> {{log(cxPropContentSearch)}} <template is=\"if\" value=\"{{cxPropContentSearch}}\"><template case=\"true\"><lyte-exptable-tr colspan=\"{{cruxArithResult(ltPropHeader.length,&quot;-&quot;,3)}}\"> <lyte-input lt-prop-type=\"search\" lt-prop-value=\"{{lbind(cxPropSearchInputValue)}}\" lt-prop-placeholder=\"{{cxPropSearchPlaceholder}}\" lt-prop-maxlength=\"{{cxPropSearchMaxlength}}\" lt-prop-direction=\"horizontal\" data-zcqa=\"{{cxPropSearchZcqa}}\" on-value-change=\"{{method('onTableSearch')}}\" on-focus=\"{{method('onSearchFocus')}}\" on-blur=\"{{method('onSearchBlur')}}\" on-clear=\"{{method('onSearchClear')}}\" lt-prop-appearance=\"{{cxPropSearchAppearance}}\" lt-prop-class=\"{{cxPropSeachInputClass}}\" lt-prop-id=\"{{cxPropSeachInputId}}\" lt-prop-autofocus=\"{{cxPropSearchAutofocus}}\"></lyte-input> </lyte-exptable-tr></template></template> <template is=\"if\" value=\"{{cxPropSuffixHeader}}\"><template case=\"true\"><lyte-yield yield-name=\"header-suffix\" hide-template=\"{{cxPropHideTemplate}}\"> </lyte-yield></template></template> </lyte-exptable-thead> <template is=\"if\" value=\"{{cxPropContent.length}}\"><template case=\"true\"><template is=\"if\" value=\"{{showLoadingUp}}\"><template case=\"true\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableUpRow\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <lyte-td-wrap> <div class=\"content-animated-line zcrm-contentloading\" style=\"height: 10px;\"> </div> </lyte-td-wrap> </td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template><template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{row.cxGroupName}}\"><template case=\"true\"> <lyte-exptable-tbody class=\"{{if(row.cxPropContent.length,&quot;&quot;,&quot;lyteExpTbodyClosed&quot;)}}\"> <lyte-exptable-tr class=\"lyteExpTableAccordionHeader\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild\" onclick=\"{{action('toggleAccordion',row,this)}}\"> <lyte-yield yield-name=\"body-checkbox\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"></lyte-yield> <div class=\"cxTdGroupbyHead\"> <span class=\"cxTableArrowDown\"> </span>{{row.cxGroupName}} <span class=\"cxTableGroupbyCount\">{{row.total_count}}</span> </div> </div> </td> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild cP dIB\"> <lyte-yield yield-name=\"body-record-selection\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </div> </td> <td colspan=\"{{cruxArithResult(ltPropHeader.length,&quot;-&quot;,3)}}\"></td> <template is=\"if\" value=\"{{row.start_record}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td class=\"cxExpTableStickyTd\"> <div class=\"lyteExpressAccordionTdChild\"> <span class=\"cxPageCount crm-font-bold f14 mR10\">{{row.start_record}} - {{row.end_record}}</span> <lyte-navigator on-next=\"{{method('navigate','next',row,contentIndex)}}\" on-previous=\"{{method('navigate','previous',row,contentIndex)}}\" lt-prop-value=\"{{lbind(row.startIndex)}}\" lt-prop-records=\"{{row.total_count}}\" lt-prop-perpage=\"{{row.per_page}}\" lt-prop-show-only-icon=\"true\" start-record=\"{{lbind(row.startIndex)}}\" end-record=\"{{lbind(row.end_record)}}\"></lyte-navigator> </div> </td></tr></tbody></table></template></template> </tr></tbody></table></template></template> </lyte-exptable-tr> <template is=\"for\" items=\"{{row.cxPropContent}}\" item=\"single_row\" index=\"indexVal\"> <lyte-exptable-tr dd-class=\"test\" id=\"{{single_row.id}}\" onclick=\"{{action('onRowClick',single_row,event)}}\" onmouseover=\"{{action('onMouseOver',single_row.id,this)}}\" onmouseout=\"{{action('onMouseOut',single_row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,single_row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,single_row.id),cxPropRowZcqa)}}\" class=\"lyteExpTableAccordionContent {{if(cruxContains(cxPropSelectedRows,single_row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(single_row.hideRecord,'cruxHideRow','')}} {{single_row.cxPropClass}} lyteExpTableAccordionContent1\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td fixed=\"{{cxPropFixCheckbox}}\"> <div class=\"lyteExpressAccordionTdChild\"><lyte-checkbox></lyte-checkbox> </div></td> </tr></tbody></table></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" width=\"{{field.width}}\" class=\"{{field.cxPropClass}} {{cxPropColumnCellClass}}\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <div class=\"lyteExpressAccordionTdChild\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{single_row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </div> </td> </tr></tbody></table></template><template case=\"false\" depth=\"3\"><table><tbody><tr> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}}\" style=\"{{field.style}}\"> <div class=\"lyteExpressAccordionTdChild\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(single_row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',single_row[field.api_name])),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{single_row[field.api_name]}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{single_row.Currency}}\" cx-prop-exchange-rate=\"{{single_row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{single_row.ExchangeRate}}\" cx-prop-home-currency=\"{{single_row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{single_row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{field.tagWidth}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,single_row,cxPropModule,cxPropTooltip,cxPropTooltipProps,undefined,cxPropPhoneIconTooltip))}} </template></template> </div> </td> </tr></tbody></table></template></template></template></template> </template> </lyte-exptable-tr> </template> </lyte-exptable-tbody> </template><template case=\"false\"> {{log(\"number2\")}} <lyte-exptable-tbody> <lyte-exptable-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this)}}\" onmouseout=\"{{action('onMouseOut',row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,row.id),cxPropRowZcqa)}}\" class=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(row.hideRecord,'cruxHideRow','')}} {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-td fixed=\"{{cxPropFixCheckbox}}\"><lyte-checkbox></lyte-checkbox></lyte-exptable-td> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <lyte-exptable-td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" width=\"{{field.width}}\" class=\"{{field.cxPropClass}} {{cxPropColumnCellClass}}\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </lyte-exptable-td> </template><template case=\"false\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',row[field.api_name])),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{row[field.api_name]}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{field.tagWidth}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip))}} </template></template> </lyte-exptable-td> </template></template></template></template> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template></template> <template is=\"if\" value=\"{{showLoadingDown}}\"><template case=\"true\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableDownRow dN\"> <template is=\"for\" items=\"{{ltPropHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template> </template><template case=\"false\"> <lyte-exptable-tbody> <lyte-exptable-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"lyteExpressAccordionTdChild\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </div> </td> </template> </lyte-exptable-tr> </lyte-exptable-tbody> </template></template> </lyte-exptable> </template> <template is=\"registerYield\" yield-name=\"headerYield\" class=\"tablecomponent1 tableBdrCollapse tablecomponent\"> <lyte-exptable-tr id=\"{{cxPropHeaderRowId}}\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"headerIndex\"> <template is=\"if\" value=\"{{cxPropHeaderCellPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerCellPrefixYield\" field-obj=\"{{field}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{cxPropResizeCheckbox}}\" fixed=\"{{cxPropFixCheckbox}}\" sticky-position=\"{{field.cxPropStickyPosition}}\"> <lyte-checkbox></lyte-checkbox> </lyte-exptable-th> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}} \" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\" field-obj=\"{{field}}\"></lyte-yield> </lyte-exptable-th> </template><template case=\"false\"> <lyte-exptable-th resize=\"{{field.cxPropResize}}\" class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} cxSortQuery cxPropTh{{index}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" data-zcqa=\"{{field[cxPropZcqaSelector]}}\" onmouseover=\"{{action('hoverOnTh',index,true)}}\" onmouseout=\"{{action('hoverOnTh',index)}}\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <lyte-text tabindex=\"{{headerTabIndex}}\" class=\"{{cruxGetTableTextClass(cxPropEnableSort,cxPropShowSortIcon)}}\" lt-prop-tooltip-config=\"{{cruxStringify(cxPropHeaderTooltipConfig)}}\" lt-prop-value=\"{{field[cxPropLabelSelector]}}\" onclick=\"{{action('sort',field,event)}}\" lt-prop-tooltip-class=\"{{cxPropHeaderTooltipClass}}\"></lyte-text> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn)),'&amp;&amp;',cxPropShowSortIcon)}}\"><template case=\"true\"> <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template> <template is=\"if\" value=\"{{field.cxShowDropdown}}\"><template case=\"true\"> <span><lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield></span> </template></template> <template is=\"if\" value=\"{{showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)}}\"><template case=\"true\"> <span tabindex=\"{{headerTabIndex}}\" title=\"Column options\" id=\"cxTableSortIcon_{{cxPropId}}\" class=\"cxTableSortIcon\" data-zcqa=\"sorticon_{{field[cxPropZcqaSelector]}}\" onclick=\" {{action('sortIconClick',field,event)}}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',cxPropSortedColumn),'||',expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> <span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" tabindex=\"{{headerTabIndex}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropNewListView,'!')}}\"><template case=\"true\"> <span class=\"cx_sortIconPlaceholder dIB mL5 cxVam\"></span> </template></template></template></template></template></template> </lyte-exptable-th> </template></template></template></template> </template> </lyte-exptable-tr> <template is=\"if\" value=\"{{cxPropSuffixHeader}}\"><template case=\"true\"><lyte-yield yield-name=\"header-suffix\" hide-template=\"{{cxPropHideTemplate}}\"></lyte-yield></template></template> </template> <template is=\"registerYield\" yield-name=\"contentYield\" class=\"tableBdrCollapse tablecomponent2\" id=\"{{cxPropBodyId}}\"> <template is=\"if\" value=\"{{cxPropContent.length}}\"><template case=\"true\"><template is=\"if\" value=\"{{showLoadingUp}}\"><template case=\"true\"> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableUpRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"content-animated-line zcrm-contentloading\" style=\"height: 10px;\"> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> <template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <lyte-exptable-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this)}}\" onmouseout=\"{{action('onMouseOut',row.id,this)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{if(cxPropZcqaWithId,concat(cxPropZcqaWithId,row.id),cxPropRowZcqa)}}\" class=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowClass)}} {{if(row.hideRecord,'cruxHideRow','')}} {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{field.cxCheckbox}}\"><template case=\"true\"> <lyte-exptable-td fixed=\"{{cxPropFixCheckbox}}\" data-zcqa=\"select_{{row.id}}\"><lyte-checkbox></lyte-checkbox></lyte-exptable-td> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(field.yield,'||',field.yieldName)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxContains(field.yieldName,&quot;prefix-&quot;),'!'),'&amp;&amp;',row.cruxTableGroup)}}\"><template case=\"true\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" style=\"{{field.style}}\" data-zcqa=\"td_{{row.id}}_{{field.yieldName}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <template is=\"if\" value=\"{{isgroupRendered(row)}}\"><template case=\"true\"> {{log(row.cruxTableGroup)}} {{row.cruxTableGroup}} </template></template> </lyte-exptable-td> </template><template case=\"false\"> <lyte-exptable-td style=\"{{field.style}}\" fixed=\"{{field.fixed}}\" data-zcqa=\"td_{{row.id}}_{{field.yieldName}}\" class=\"{{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{cxPropColumnCellClass}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" mask-toggle=\"{{expHandlers(field.mask_details,'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></lyte-yield> </lyte-exptable-td> </template></template> </template><template case=\"false\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor mW100','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"column_{{row.id}}_{{field[cxPropZcqaSelector]}}\" style=\"{{field.style}}\" onmouseover=\"{{action('showSortIcon',headerIndex,true)}}\" onmouseout=\"{{action('showSortIcon',headerIndex)}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropCellPrefixYield,'||',field.cxCellPrefixYield)}}\"><template case=\"true\"><lyte-yield yield-name=\"cellPrefixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;tag&quot;),'&amp;&amp;',expHandlers(row[field.api_name].length,'!=',0)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;user&quot;),'&amp;&amp;',getCruxTableValue1(row,field))),'||',expHandlers(field.cxTypeMapping,'==',&quot;number&quot;)),'||',expHandlers(expHandlers(field.cxTypeMapping,'==',&quot;picklist&quot;),'&amp;&amp;',field.enable_colour_code)),'&amp;&amp;',expHandlers(row.cruxTableGroup,'!'))}}\"><template case=\"true\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-width=\"{{if(field.tagWidth,field.tagWidth,field.width)}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-user-detail-view-path=\"{{cxPropUserDetailViewPath}}\" cx-prop-show-mask-unmask-icon=\"{{showEmMaskUnmaskIcon}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{row.cruxTableGroup}}\"><template case=\"true\"> <template is=\"if\" value=\"{{isgroupRendered(row)}}\"><template case=\"true\"> {{log(row.cruxTableGroup)}} {{row.cruxTableGroup}} </template></template> </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,field.unmask,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield)}}\"><template case=\"true\"><lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield></template></template> </lyte-exptable-td> </template></template></template></template> </template> </lyte-exptable-tr> </template> <template is=\"if\" value=\"{{showLoadingDown}}\"><template case=\"true\"> <lyte-exptable-tr class=\"cxTableEmptyRow cxTableDownRow cxdN\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> </template><template case=\"false\"> <lyte-exptable-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{ltPropTableHeader}}\" item=\"field\" index=\"index\"> <lyte-exptable-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </lyte-exptable-td> </template> </lyte-exptable-tr> </template></template> </template> </lyte-expresstable> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(content.length,'||',expHandlers(cxPropHideHeaderOnNoContent,'!'))}}\"><template case=\"true\"> <lyte-table lt-prop-content=\"{{content}}\" lt-prop-cell-intersection=\"{{cxPropCellIntersection}}\" lt-prop-intersection-type=\"{{cxPropIntersectionType}}\" lt-prop-resize-fixed-column=\"{{cxPropResizeFixedColumn}}\" lt-prop-prevent-scrollbar=\"{{cxPropStickyTable}}\" lt-prop-scroll-element=\"{{cxPropScrollElement}}\" lt-prop-sticky-table=\"{{cxPropStickyTable}}\" lt-prop-custom-copy=\"{{cxPropCustomCopy}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-yield=\"true\" id=\"{{cxPropTableId}}\" lt-prop-role=\"{{cxPropRole}}\" lt-prop-width=\"{{cxPropTableWidth}}\" lt-prop-dual-resize=\"{{cxPropDualResize}}\" style=\"height : {{cxPropHeight}}; position: relative; overflow:hidden\" onscroll=\"{{action('scroll',event)}}\" lt-prop-scrollbar-option=\"{&quot;showOn&quot; : &quot;{{cxPropShowScrollOn}}&quot;, &quot;containerClass&quot; : &quot;scrollbarClass&quot;}\" on-before-resize-select=\"{{method('resizeSelect')}}\" on-resize-end=\"{{method('resizeEnd')}}\" class=\"cxCommonTable {{cxPropTableClass}} {{if(cruxOr(cxPropEditMode,cxPropShowMandatoryOnHeader),'cxHideMandatoryForInput')}} {{expHandlers(cxPropStickyTable,'?:','lyteStickyTable','')}}\" onmouseover=\"{{action('hoverOnTable',index,true)}}\" onmouseout=\"{{action('hoverOnTable',index)}}\"> <template is=\"if\" value=\"{{cxPropShowFilterIcon}}\"><template case=\"true\"> <div class=\"cxTableFilterIcons filterIcons cxTableHeaderIcons\"> <div data-zcqa=\"{{cxPropFilterProperties.zcqa}}\" class=\"dIB cxTableHeaderFilterIcon {{if(cxPropShowFilter,'cxTableHeaderFilterOpenedIcon')}}\" onclick=\"{{action('toggleFilter')}}\" lt-prop-title=\"{{cxPropFilterProperties.title}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\"> </div> </div> </template></template> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure class=\"cruxTableStructure\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'&amp;&amp;',expHandlers(content.length,'!')),'!')}}\"><template case=\"true\"> <lyte-thead class=\"tablecomponent {{cxPropTableProperties.thead_class}}\"> <lyte-tr id=\"{{cxPropHeaderRowId}}\" class=\"{{cxPropTableProperties.thead_tr_class}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"headerIndex\"> <lyte-th resize=\"{{field.cxPropResize}}\" fixed=\"{{field.fixed}}\" lt-prop-width=\"{{field.width}}\" style=\"{{field.style}}\" class=\"{{cxPropTableProperties.th_class}} {{field.cxPropClass}} {{cxPropHeaderProperties[field.id].cxPropClass}} {{if(negate(field.yield),cxPropColumnCellClass,'')}} {{if(cruxAnd(expHandlers(field.yield,'!'),expHandlers(cxPropHeaderCellPrefixYield,'!'),showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)),'cxTableHasSortIcon')}} {{if(cruxAnd(cruxOr(cxPropEditMode,cxPropShowMandatoryOnHeader),field.required),'cxTableHeaderMandatory')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}\" data-zcqa=\"{{if(cxPropHeaderZcqaPrefix,concat(cxPropHeaderZcqaPrefix,'_',field[cxPropZcqaSelector]),field[cxPropZcqaSelector])}}\" id=\"{{field[cxPropHeaderIdSelector]}}\" sticky-position=\"{{field.cxPropStickyPosition}}\" onclick=\"{{action('sort',field,event)}}\"> <template is=\"if\" value=\"{{cxPropHeaderCellPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"headerCellPrefixYield\" field-obj=\"{{field}}\"></lyte-yield> </template></template><template is=\"if\" value=\"{{expHandlers(field.yield,'==',true)}}\"><template case=\"true\"> <lyte-yield yield-name=\"header-{{field.yieldName}}\"></lyte-yield> </template><template case=\"false\"> <span class=\"cxHeaderWrapper\"> <span class=\"cxThFieldSortEnabled {{if(cruxAnd(field.sortable,cxPropEnableFieldSort,expHandlers(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'!')),'cxCP','')}} \" tabindex=\"{{headerTabIndex}}\"> <lyte-text lt-prop-value=\"{{field[cxPropLabelSelector]}}\" class=\"cxTableHeadingElem {{if(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'cxSkipFocusable')}}\"> </lyte-text> <template is=\"if\" value=\"{{cxPropHeaderProperties[field.id].cxHeaderLabelSuffixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerLabelSuffixYield\" field-obj=\"{{field}}\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId),'!')}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',cxPropSortedColumn)}}\"><template case=\"true\"><span id=\"sorted_column_{{field.id}}\" title=\"{{field.field_label}}\" class=\"cxTableSortIconNew cxTableColumnSort_{{cxPropSortedOrder}}\" data-param=\"{&quot;fieldid&quot; : &quot;{{field.id}}&quot;}\"> </span></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cruxOr(expHandlers(field.api_name,'==',cxPropSortedColumn),expHandlers(field.id,'==',cxPropSortedColumn))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <span class=\"cxTableStarLabel\" id=\"sorted_column_{{field.id}}\" data-param=\"{&quot;fieldid&quot;:&quot;{{field.id}}&quot;}\">*</span> </template></template></template></template> </span> <template is=\"if\" value=\"{{expHandlers(cxPropIsAlphaSearchShown,'&amp;&amp;',cxPropModuleDisplayField[cxPropModule])}}\"><template case=\"true\"><template is=\"if\" value=\"{{cruxContains(cxPropModuleDisplayField[cxPropModule],field.api_name)}}\"><template case=\"true\"> <span class=\"cxSfAlphaSearchYeild\"> <lyte-yield yield-name=\"header-alpha-search\" field-name=\"{{field.api_name}}\"></lyte-yield> </span> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(field.tooltip,'&amp;&amp;',expHandlers(field.tooltip.name,'==',&quot;Info Icon&quot;)),'&amp;&amp;',field.tooltip.value),'||',expHandlers(expHandlers(cxPropHeaderProperties[field.id].tooltip,'&amp;&amp;',expHandlers(cxPropHeaderProperties[field.id].tooltip.name,'==',&quot;Info Icon&quot;)),'&amp;&amp;',cxPropHeaderProperties[field.id].tooltip.value))}}\"><template case=\"true\"> <div class=\"cxSubformInfoIcon\" lt-prop-title=\"{{if(cxPropHeaderProperties[field.id].tooltip.value,cxPropHeaderProperties[field.id].tooltip.value,field.tooltip.value)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;top&quot;}\"> </div> </template></template> </span> <template is=\"if\" value=\"{{showCxTableMenuIcon(cxPropShowSortIcon,field.sortable,cxPropHeaderProperties[field.id].cxPropShowMenuIcon,cxPropEnableAllFieldSort,field.mask_details,cxPropProfileId)}}\"><template case=\"true\"> <span tabindex=\"{{headerTabIndex}}\" title=\"Column options\" id=\"cxTableSortIcon_{{cxPropId}}\" class=\"cxTableSortIcon {{if(cruxAnd(expHandlers(cxPropEnableFieldSort,'!'),expHandlers(expHandlers(checkForMaskPermission(field.mask_details,cxPropProfileId),'&amp;&amp;',cxPropMaskUnmaskIcon),'!')),'pointerEventsNone','')}}\" data-zcqa=\"{{if(cxPropSortZcqaPrefix,concat(cxPropSortZcqaPrefix,'_',field[cxPropZcqaSelector],'_sort'),concat(field[cxPropZcqaSelector],'_sort'))}}\" onclick=\"{{action('sortIconClick',field,event)}}\"></span> </template></template> </template></template> </lyte-th> </template> </lyte-tr> <lyte-yield yield-name=\"row-1\" class=\"lyteRowCopy\" style=\"display: table-row;background: #f2f2f2;\"></lyte-yield> <template is=\"if\" value=\"{{cxPropFilterComponent}}\"><template case=\"true\"> <template is=\"component\" cx-prop-lookupfilter-wrapper-class=\"{{cxPropTableWrapperClass}}\" component-name=\"{{cxPropFilterComponent}}\" cx-prop-show-filter=\"{{cxPropShowFilter}}\" cx-prop-display-fields=\"{{header}}\" cx-prop-comparator=\"{{cxPropComparator}}\" apply-filter=\"{{method('applyFilter')}}\" cx-prop-module-name=\"{{cxPropModule}}\" cx-prop-show-clear=\"{{cxPropFilterShowClear}}\" clear-filter=\"{{method('clearFilter')}}\" set-lookup-filter-conditions=\"{{method('setLookupFilterConditionsCall')}}\" class=\"cxTableLookupFilterComponent lyteRowCopy\" on-before-show=\"{{method('beforeShow')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-show=\"{{method('show')}}\" on-hide=\"{{method('hide')}}\"> </template> </template></template> </lyte-thead> </template></template> <lyte-tbody class=\"tablecomponent2 {{cxPropTableProperties.tbody_class}}\" id=\"{{cxPropBodyId}}\"> <template is=\"for\" items=\"{{content}}\" item=\"row\" index=\"contentIndex\" unbound=\"{{cxPropDataBind}}\"> <template is=\"if\" value=\"{{lyteViewPort(cruxOr(row.disableViewPort,expHandlers(cxPropViewPortLoading,'!')))}}\"><template case=\"true\"><lyte-tr class=\"cxSubformTdLoadingWrapper {{row.cxPropClass}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\" unbound=\"lyteFastRender\"> <lyte-td class=\"cxLoaderHorTd\" style=\"{{field.style}}\"> <span class=\"cxPlaceholderLoader\"></span> <span class=\"cxdN\">{{if(row[field.api_name].name,row[field.api_name].name,row[field.api_name])}} <template is=\"if\" value=\"{{expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield)}}\"><template case=\"true\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" view-port=\"{{if(true,true,false)}}\"> </lyte-yield> </template></template> </span> </lyte-td> </template> </lyte-tr></template><template case=\"false\"><lyte-tr id=\"{{row.id}}\" onclick=\"{{action('onRowClick',row,event)}}\" onmouseover=\"{{action('onMouseOver',row.id,this,row)}}\" onmouseleave=\"{{action('onMouseOut',row.id,this,row)}}\" style=\"{{if(cruxContains(cxPropSelectedRows,row.id,cxPropSelectedRows.length),cxPropSelectedRowStyle)}}\" data-zcqa=\"{{getCruxTableBodyTrZcqa(cxPropZcqaWithId,row.id,cxPropRowZcqa)}}\" class=\"{{getCruxTableRowClass(row,cxPropSelectedRows,row.id,cxPropSelectedRows.length,cxPropSelectedRowClass,row.cxPropClass,cxPropAjaxEditId,cxPropFreezeRow,cxPropTableProperties.tbody_tr_class)}}\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"bodyHeaderIndex\" unbound=\"{{cxPropDataBind}}\"> <lyte-td class=\"{{getCruxTableBodyTdClass(cxPropColumnCellClass,field.cxPropClass,field.cxTypeMapping,cxPropTableProperties.td_class,intPinnedColumn,field.id,field.yield,field.yieldName,cxPropHeaderProperties[field.id].cxPropClass,cxPropCellProperties[row.id][field.api_name].cxPropClass)}}\" style=\"{{field.style}}\" data-zcqa=\"{{getCruxTableBodyTdZcqa(field,cxPropTableId,cxPropCellZcqaWithRowNo,field.field_label,contentIndex)}}\"> <template is=\"switch\" value=\"{{getCxTableRenderingCase(cxPropEditMode,field.cxTypeMapping,getCruxTableValue1(row,field),row[field.api_name].length,field.enable_colour_code,cxPropTextareaProperties.lineClamp,field,row,cxPropNumberProperties,cxPropClipMode,field.yield,field.yieldName,cxPropAllRowsEditable,cxPropAjaxEditId,row.id)}}\"><template case=\"editableRow\"> <lyte-yield yield-name=\"edit-yield\" field-obj=\"{{field}}\" record-obj=\"{{row}}\" index-val=\"{{contentIndex}}\"> </lyte-yield> </template><template case=\"yield\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}}</span> </template><template case=\"false\"> <lyte-yield yield-name=\"body-{{field.yieldName}}\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\" visible-status=\"{{visibleStatus}}\" invisible-td-style-value=\"{{getInVisibleTdCssAttrValue('style',row,field,true)}}\" invisible-td-class-value=\"{{getInVisibleTdCssAttrValue('class',row,field,true)}} lyteTextEllipsisNode\" invisible-td-node-value=\"{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}}\" column-index=\"{{bodyHeaderIndex}}\" mask-toggle=\"{{expHandlers(field.mask_details,'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"> </lyte-yield> </template></template> </template><template case=\"editMode\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop=\"{{field.cxProp}}\" cx-prop-maxlength=\"{{field.length}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-from=\"create\" id=\"row{{contentIndex}}_column{{bodyHeaderIndex}}\" cx-prop-id=\"{{cxElement}}_row{{contentIndex}}_column{{bodyHeaderIndex}}\" class=\"cxEditElement\" cx-prop-remove-disable-selected=\"true\" cx-prop-value=\"{{getCruxTableValue1(row,field,'',row[field.api_name])}}\" cx-prop-exclude=\"{{cxPropUserProperties[field.api_name].exclude}}\" cx-prop-disabled-list=\"{{cxPropUserProperties[field.api_name].disabledList}}\" cx-prop-mandatory-type=\"{{cxPropCellMandatoryType}}\" cx-prop-error-on-hovercard=\"{{cxPropErrorOnHovercard}}\" cx-prop-field=\"{{field}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-appearance=\"box\" cx-prop-disabled=\"{{getCruxTableFieldData('disabled',field,row.id,cxPropCellProperties)}}\" cx-prop-height=\"{{cxPropTextareaProperties.height}}\" on-value-change=\"{{method('valueChange',row,field,contentIndex,this)}}\" on-before-select=\"{{method('onBeforeUserSelect')}}\" cx-prop-icon-class=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'iconClass')}}\" fetch-module-data=\"{{method('fetchmodule')}}\" fetch-total-count=\"{{method('fetchTotalCountFn')}}\" fetch-records=\"{{method('fetchrecord')}}\"> </template> </template><template case=\"lookup\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> {{addMurhyInfo(\"crux-table-component.html\",\"Feb Default Changes\")}} <crux-lookup-component cx-prop-field=\"{{field}}\" cx-prop-route-name=\"{{cxPropLookupProperties.routeName}}\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-zcqa=\"{{cxPropLookupProperties.zcqa}}\" cx-prop-module=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'module')}}\" cx-prop-dynamic-params=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'dynamicParams')}}\" cx-prop-query-params=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'queryParams')}}\" cx-prop-id=\"{{cxPropLookupProperties.id}}\" cx-prop-transition-data=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'transitionData')}}\" cx-prop-target=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'target')}}\" cx-prop-icon-class=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'iconClass')}}\" cx-prop-show-bc=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'showBc')}}\" cx-prop-hide-icon-for-view=\"{{getTableLookupProperty(cxPropLookupProperties,row,field,'hideIconForView')}}\" on-lookup-hover-fetch-bc-data=\"{{method('onLookupHoverFetchBcDataPopup')}}\" cx-prop-hover-callback=\"{{cxPropLookupProperties.hoverCallback}}\"> </crux-lookup-component> </template></template> </template><template case=\"component\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> <template is=\"component\" component-name=\"crux-{{field.cxTypeMapping}}-component\" cx-prop-value=\"{{getCruxTableValue1(row,field)}}\" cx-prop-field=\"{{field}}\" cx-prop-iso-code=\"{{row.Currency}}\" cx-prop-exchange-rate=\"{{row.Exchange_Rate}}\" cx-prop-exchange-rate-finance=\"{{row.ExchangeRate}}\" cx-prop-home-currency=\"{{row.$home_converted_currency[field.api_name]}}\" on-show-more-tags=\"{{method('tagsShowMore')}}\" cx-prop-formatted-currency=\"{{row.$formatted_currency[field.api_name]}}\" cx-prop-clip-mode=\"{{cxPropClipMode}}\" cx-prop-popover-class=\"{{cxPropTextareaProperties.popoverProperties.class}}\" cx-prop-popover-height=\"{{cxPropTextareaProperties.popoverProperties.height}}\" cx-prop-popover-width=\"{{cxPropTextareaProperties.popoverProperties.width}}\" cx-prop-width=\"{{if(field.tagWidth,field.tagWidth,field.width)}}\" cx-prop-tooltip=\"{{if(field.cxPropTooltip,field.cxPropTooltip,if(cxPropTooltip,cxPropTooltip,''))}}\" cx-prop-tooltip-props=\"{{cxPropTooltipProps}}\" cx-prop-show-business-card=\"{{cxPropShowBusinessCard}}\" cx-prop-masking-properties=\"{{field.cxPropMaskingProperties}}\" cx-prop-is-color-code-enabled=\"{{field.enable_colour_code}}\" cx-prop-user-detail-view-path=\"{{cxPropUserDetailViewPath}}\" cx-prop-line-clamp=\"{{cxPropTextareaProperties.lineClamp}}\" cx-prop-highlight-url=\"{{cxPropTextareaProperties.highlightUrl}}\" on-show-less=\"{{method('showLess')}}\" cx-prop-minified=\"{{cxPropImageProperties.minified}}\" cx-prop-type=\"{{cxPropImageProperties.type}}\" on-expand-image-view=\"{{method('expandImageView')}}\" on-crop-success=\"{{method('cropSuccess')}}\" on-preview-close=\"{{method('previewClose')}}\" cx-prop-show-mask-unmask-icon=\"{{showEmMaskUnmaskIcon}}\" cx-prop-toggle-masking=\"{{expHandlers(expHandlers(cruxOr(row[field.api_name],expHandlers(row[field.api_name],'==',0)),'&amp;&amp;',field.mask_details),'&amp;&amp;',expHandlers(field.unmask,'!'))}}\"> </template> </template></template> </template><template case=\"unescape\"> <template is=\"if\" value=\"{{isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex])}}\"><template case=\"true\"> <span style=\"{{getInVisibleTdCssAttrValue('style',row,field)}}\" class=\"{{getInVisibleTdCssAttrValue('class',row,field)}} lyteTextEllipsisNode\">{{getInVisibleStatusTdValue(row,field,cxPropNumberProperties)}} </span> </template><template case=\"false\"> <template is=\"if\" value=\"{{field.unmask}}\"><template case=\"true\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,true,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template><template case=\"false\"> {{unescape(getCruxTableValue(field,row,cxPropModule,cxPropTooltip,cxPropTooltipProps,cxPropLookupProperties,cxPropPhoneIconTooltip,cxPropNumberProperties,cxPropTextareaProperties,cxPropTwitterUrl,cxPhoneProperties,cxPropRecordId,false,cxPropIsMaskingFeatureEnabled,cxPropProfileId))}} </template></template> </template></template> </template><template case=\"customEditable\"> <lyte-checkbox lt-prop-checked=\"{{lbind(row[field.api_name])}}\"> </lyte-checkbox> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropCellSuffixYield,'||',field.cxPropCellSuffixYield),'&amp;&amp;',expHandlers(isFillerTdContentNeeded(cxPropCellIntersection,visibleStatus[contentIndex][bodyHeaderIndex]),'!'))}}\"><template case=\"true\"> <lyte-yield yield-name=\"cellSuffixYield\" record-obj=\"{{row}}\" field-obj=\"{{field}}\" index-val=\"{{contentIndex}}\"></lyte-yield> </template></template> </lyte-td> </template> </lyte-tr></template></template> </template> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <lyte-tr class=\"cxTableEmptyRow\"> <template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\"> <lyte-td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <template is=\"if\" value=\"{{cxPropShowLoading}}\"><template case=\"true\"> <div class=\"cxListViewLazyLoad\"> <div class=\"cxListViewLazyLoadRunner\"></div> </div> </template></template> </lyte-td> </template> </lyte-tr> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'!'),'&amp;&amp;',isSlyteTable),'&amp;&amp;',expHandlers(cxPropShowNoRecordsMessage,'||',expHandlers(expHandlers(expHandlers(cxPropContent.length,'!'),'&amp;&amp;',expHandlers(cxPropShowLoading,'!')),'||',showNoRecord)))}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr class=\"cxSlyteTableCompNoResultsTr\"> <td colspan=\"{{header.length}}\"> <span class=\"cxSlyteTableCompNoResults\">{{cxPropNoRecordsMessage}}</span> </td> </tr> </tbody></table></template></template> </lyte-tbody> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\" depth=\"1\"><table> <tfoot> <tr> <td is=\"for\" lyte-for=\"true\" items=\"{{header}}\" item=\"field\" index=\"index\" depth=\"3\"></td> </tr> </tfoot> </table></template></template> </lyte-table-structure> </template> </lyte-table> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropHideHeaderOnNoContent,'||',expHandlers(isSlyteTable,'!')),'&amp;&amp;',expHandlers(cxPropShowNoRecordsMessage,'||',expHandlers(expHandlers(expHandlers(cxPropContent.length,'!'),'&amp;&amp;',expHandlers(cxPropShowLoading,'!')),'||',showNoRecord)))}}\"><template case=\"true\"> <div class=\"{{if(cxPropNoContentClass,cxPropNoContentClass,'cxTableCompNoResults p30 cxAlignCenter')}}\" data-zcqa=\"{{cxPropNoRecordsZcqa}}\">{{cxPropNoRecordsMessage}}</div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"insertYield","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"text","position":[1,1,3,2]},{"type":"text","position":[1,1,3,4,0]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"insertYield","position":[3,1,1]},{"type":"attr","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,1,2]},{"type":"attr","position":[0,1,3]},{"type":"componentDynamic","position":[0,1,3]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","single_row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"insertYield","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[3,1]},{"type":"insertYield","position":[3,1]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"insertYield","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"for","position":[2],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height : '","cxPropHeight","'; position: relative; overflow:hidden'"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"insertYield","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,3,2]},{"type":"if","position":[1,3,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxContains","args":["cxPropSelectedRows","row.id","cxPropSelectedRows.length"]}},"cxPropSelectedRowStyle"]}}}},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"editableRow":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"yield":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},"editMode":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"lookup":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"component":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]},"unescape":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"getInVisibleTdCssAttrValue","args":["'style'","row","field"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]},"customEditable":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"field.style"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}],"actualTemplate":"<template is=\"for\" items=\"{{header}}\" item=\"field\" index=\"index\" depth=\"3\"><table><tbody><tr> <td class=\"{{cxPropColumnCellClass}} {{field.cxPropClass}}\" style=\"{{field.style}}\"> <lyte-yield yield-name=\"footerYield\" field-obj=\"{{field}}\"> </lyte-yield> </td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}],
_observedAttributes :["cxPropTableProperties","cxPropResizeFixedColumn","cxPropEnableAllFieldSort","cxPropCellIntersection","cxPropExpress","cxPropHeader","cxPropContent","cxPropYieldForPrefix","cxPropYieldForSuffix","cxPropLabelSelector","cxPropHeaderRowId","cxPropFilterComponent","cxPropShowFilter","cxPropContentSearch","cxPropSearchInputValue","cxPropSearchMaxlength","cxPropSearchPlaceholder","cxPropFilterShowClear","cxPropDualResize","cxPropHideHeaderOnNoContent","cxPropTableId","cxPropSortColumns","cxPropSortedColumn","cxPropSortedOrder","cxPropBodyId","cxPropNoRecordsMessage","cxPropNoRecordsZcqa","cxPropColumnCellClass","cxPropSelectedRows","cxPropSelectedRowStyle","cxPropFieldTypeMapping","cxPropFieldTypeMappingSelector","header","headerFields","cxPropHeight","content","cxPropEnableBodyScroll","cxPropZcqaSelector","cxPropRowZcqa","cxPropModule","nextRender","new","cxPropDisplayRowNumber","cxPropTableClass","cxPropPrefixYields","lyteUnbound","cxPropSuffixYields","cxPropDataBind","cxPropHeaderIdSelector","cxPropSelectedRowClass","showLoadingDown","showLoadingUp","cxPropHeaderYield","beingSorted","options","cxPropShowSortDropdown","cxPropMaxcharacter","cxPropCheckboxPosition","cxPropResizeCheckbox","cxPropFixCheckbox","cxPropModuleDisplayField","cxPropNewListView","cxPropIsAlphaSearchShown","cxPropPreventWidth","cxPropClipMode","cxPropStickyTable","cxPropTooltip","cxPropTooltipProps","beingResized","cxPropHeaderTooltipConfig","cxPropHeaderTooltipClass","cxPropShowScrollOn","telephonyEnabled","zpbEnabled","cxPropEnableSort","cxPropNoContentClass","cxPropEnableFieldSort","cxPropZcqaWithId","cxPropShowBusinessCard","cxPropShowLoading","cxPropShowSortIcon","mouseOverTable","cxPropLookupProperties","cxPropShowFilterIcon","cxPropDefaultFields","cxPropFreezeRow","cxPropAllRowsEditable","cxPropTableWidth","cxPropPhoneIconTooltip","cxPropRenderOnlyViewportRecords","cxPropCurrency","cxPropExchangeRate","cxPropNumberProperties","cxPropUserDetailViewPath","cxPropCellSuffixYield","cxPropUserDetailViewPath","cxPropScrollRecordCount","cxPropFormulaMapping","cxPropViewPortLoading","cxPropCellPrefixYield","cxPropShowSortIconOnHover","cxPropTextareaProperties","cxPropFilterProperties","cxPropCellZcqaWithRowNo","cxPropHeaderCellPrefixYield","cxPropDateProperties","cxPropDatetimeProperties","cxPropComparator","cxPropImageProperties","cxPropTwitterUrl","cxPropShowNoRecordsMessage","cxPropRole","cxPropAria","cxPropEditMode","cxPropCellProperties","cxPropUserProperties","cxPropHeaderZcqaPrefix","cxPhoneProperties","cxPropErrorOnHovercard","cxPropCellProperties","cxPropFooterYield","cxPropTableWrapperClass","cxPropIsRtlEnabled","cxPropCustomCopy","cxPropHeaderProperties","cxPropShowMandatoryOnHeader","cxPropSortZcqaPrefix","cxPropRecordId","cxPropResetScroll","cxPropIntersectionType","cxPropResetExpressScroll","isSlyteTable","cxPropHideTemplate","cxPropMaskUnmaskIcon","cxPropIsMaskingFeatureEnabled","showEmMaskUnmaskIcon","cxPropTableWrapperClass","cxPropProfileId","cxPropSuffixHeader","cxPropFullYield","headerTabIndex"],
_observedAttributesType :["object","boolean","boolean","boolean","boolean","array","array","boolean","boolean","string","string","string","boolean","boolean","string","number","string","boolean","boolean","boolean","string","boolean","string","string","string","string","string","string","array","string","object","string","array","array","string","array","boolean","string","string","string","number","boolean","number","string","array","boolean","array","string","string","string","boolean","boolean","object","string","array","boolean","number","number","boolean","string","object","boolean","boolean","boolean","boolean","boolean","boolean","object","boolean","object","string","string","boolean","boolean","boolean","string","boolean","string","boolean","boolean","boolean","boolean","object","boolean","object","boolean","boolean","string","string","boolean","string","number","object","string","boolean","string","number","object","boolean","boolean","boolean","object","object","boolean","boolean","object","object","boolean","object","string","boolean","string","boolean","boolean","object","object","string","object","boolean","object","boolean","string","boolean","boolean","object","boolean","string","string","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","string","string","boolean","boolean","number"],
//No I18n

	data : function(){
		return {
			
			cxPropTableProperties: Lyte.attr("object", { default: {} }),
			cxPropResizeFixedColumn: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to show sort icon irrespective of sortable value in field meta for lyte table component
			 * @componentProperty { boolean } cxPropEnableAllFieldSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableAllFieldSort: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to enable cell intersection observes for the table cells. It will show the cell only when it is in viewport.
			 * @componentProperty { boolean } cxPropCellIntersection=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellIntersection: Lyte.attr('boolean', { default: false }),//No I18n
			/**
			 * Set to true to render express table
			 * @componentProperty { boolean } cxPropExpress=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropExpress : Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * The array contains the header information like field label, ui type/data type, api_name etc.
			 * @componentProperty { array } cxPropHeader
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropHeader : Lyte.attr("array",{"input" : true}),//No I18n
			/**
			 * This array contains the data to be rendered in the body
			 * @componentProperty { array } cxPropContent
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropContent : Lyte.attr("array", {default : [] ,"input" : true}),//No I18n
			/**
			 * Set to true to render prefix for each row
			 * @componentProperty { boolean } cxPropYieldForPrefix=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYieldForPrefix : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * Set to true to render suffix for each row
			 * @componentProperty { boolean } cxPropYieldForSuffix=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropYieldForSuffix : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { string } cxPropLabelSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLabelSelector : Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderRowId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderRowId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropFilterComponent
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFilterComponent : Lyte.attr("string",{default:''}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowFilter=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowFilter : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFilterShowClear=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropContentSearch : Lyte.attr("boolean", {default : true}),//No I18n
			cxPropSearchInputValue : Lyte.attr("string"),//No I18n
			cxPropSearchMaxlength : Lyte.attr("number"),//No I18n
			cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
			cxPropFilterShowClear : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropDualResize=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDualResize : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropHideHeaderOnNoContent=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropHideHeaderOnNoContent : Lyte.attr("boolean", {default : false , "input" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTableId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropSortColumns=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortColumns : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { string } cxPropSortedColumn
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortedColumn : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropSortedOrder
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSortedOrder : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropBodyId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropBodyId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropNoRecordsMessage
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropNoRecordsMessage : Lyte.attr("string", {default : _cruxUtils.getI18n('crm.no.data.found') , "input" : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropNoRecordsZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNoRecordsZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropColumnCellClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropColumnCellClass : Lyte.attr("string",{"input" : true}),//No I18n
			/**
			 * @componentProperty { array } cxPropSelectedRows
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRows : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { string } cxPropSelectedRowStyle
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRowStyle : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { object } cxPropFieldTypeMapping
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldTypeMapping : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { string } cxPropFieldTypeMappingSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFieldTypeMappingSelector : Lyte.attr("string", {default : "ui_type"}),//No I18n
			/**
			 * @componentProperty { array } header
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			header : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { array } headerFields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			headerFields : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { string } cxPropHeight
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeight : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } content
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			content : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableBodyScroll=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableBodyScroll : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqaSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqaSelector : Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * @componentProperty { string } cxPropRowZcqa
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRowZcqa : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropModule
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModule : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { number } nextRender
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			nextRender : Lyte.attr("number", {default : 5}),//No I18n
			/**
			 * @componentProperty { boolean } new=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			new : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { number } cxPropDisplayRowNumber
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropDisplayRowNumber : Lyte.attr("number", {default : 1}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropTableClass : Lyte.attr("string", {default : "" , "input" : true}),//No I18n
			/**
			 * @componentProperty { array } cxPropPrefixYields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPrefixYields : Lyte.attr("array", {default : []}),// No I18n
			/**
			 * @componentProperty { boolean } lyteUnbound=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			lyteUnbound : Lyte.attr("boolean", {"default" : false}), // No I18n
			/**
			 * @componentProperty { array } cxPropSuffixYields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSuffixYields : Lyte.attr("array", {default : []}),// No I18n
			/**
			 * @componentProperty { string } cxPropDataBind
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDataBind : Lyte.attr("string", {default : "false"}),//No I18n
			/**
			 * @componentProperty { string } cxPropHeaderIdSelector
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderIdSelector : Lyte.attr("string", {default : "id"}),//No I18n
			/**
			 * @componentProperty { string } cxPropSelectedRowClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropSelectedRowClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } showLoadingDown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			showLoadingDown : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } showLoadingUp=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			showLoadingUp : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropHeaderYield
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderYield : Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { string } beingSorted
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			beingSorted : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { array } options
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			options : Lyte.attr("array"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowSortDropdown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortDropdown : Lyte.attr("boolean", {default : true}), //no i18n
			/**
			 * @componentProperty { number } cxPropMaxcharacter
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxcharacter : Lyte.attr('number',{default : 0}), //no i18n
			/**
			 * @componentProperty { number } cxPropCheckboxPosition
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropCheckboxPosition : Lyte.attr("number", {default : -1}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropResizeCheckbox=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropResizeCheckbox : Lyte.attr("boolean", {default : false}),//no i18n
			/**
			 * @componentProperty { string } cxPropFixCheckbox
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFixCheckbox : Lyte.attr("string", {default : "enable"}),//no i18n
			/**
			 * @componentProperty { object } cxPropModuleDisplayField
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropModuleDisplayField : Lyte.attr("object", {default : {}}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropNewListView=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNewListView : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropIsAlphaSearchShown=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropIsAlphaSearchShown : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropPreventWidth=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPreventWidth : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropClipMode=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropClipMode : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropStickyTable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropStickyTable : Lyte.attr("boolean"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropTooltip=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltip : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropTooltipProps
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTooltipProps : Lyte.attr("object", {default : {}}),//No I18n
			/**
			 * @componentProperty { boolean } beingResized=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			beingResized : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { object } cxPropHeaderTooltipConfig
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderTooltipConfig : Lyte.attr("object", {default : {"position":"bottom"}}),//No i18n
			/**
			 * @componentProperty { string } cxPropHeaderTooltipClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderTooltipClass : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { string } cxPropShowScrollOn
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowScrollOn : Lyte.attr("string", {default : "hover"}),//No I18n
			/**
			 * @componentProperty { boolean } telephonyEnabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			telephonyEnabled : Lyte.attr("boolean", {default : (typeof Crm != "undefined" ? Crm.userDetails.TELEPHONY_ENABLED : false)}),//No I18n
			/**
			 * @componentProperty { boolean } zpbEnabled=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			zpbEnabled : Lyte.attr("boolean", {default : (typeof Crm != "undefined" ? Crm.userDetails.ZPBENABLED : false)}),//No I18n
			//display_field_api_name : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableSort : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropNoContentClass
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @input
			 */
			cxPropNoContentClass : Lyte.attr("string",{"input" : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropEnableFieldSort=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropEnableFieldSort : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { string } cxPropZcqaWithId
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropZcqaWithId : Lyte.attr("string"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowBusinessCard=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowBusinessCard : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowLoading=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowLoading : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropShowSortIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortIcon : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty { boolean } mouseOverTable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			mouseOverTable : Lyte.attr('boolean'), //no i18n
			/**
			 * @componentProperty { object } cxPropLookupProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropLookupProperties : Lyte.attr("object", {default : {routeName : "crm.tab.module.entity.detail"}}),
			/**
			 * @componentProperty { boolean } cxPropShowFilterIcon=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowFilterIcon: Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { object } cxPropDefaultFields
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDefaultFields: Lyte.attr("object"),//No I18n
			/**
			 * @componentProperty { boolean } cxPropFreezeRow=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFreezeRow:  Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropAllRowsEditable=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropAllRowsEditable: Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { string } cxPropTableWidth
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTableWidth: Lyte.attr('string',{default:'100%'}),
			/**
			 * @componentProperty { string } cxPropPhoneIconTooltip
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropPhoneIconTooltip : Lyte.attr("string", {default : _cruxUtils.getI18n("crm.phoneNo.Link.Title")}),
			/**
			 * @componentProperty { boolean } cxPropRenderOnlyViewportRecords=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropRenderOnlyViewportRecords : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropCurrency
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCurrency : Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropExchangeRate
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropExchangeRate : Lyte.attr("number"),
			/**
			 * @componentProperty { object } cxPropNumberProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropNumberProperties : Lyte.attr("object"),
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			/**
			 * @componentProperty { boolean } cxPropCellSuffixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellSuffixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { string } cxPropUserDetailViewPath
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropUserDetailViewPath : Lyte.attr("string", {default : (typeof Crm != "undefined" && Crm.getCrmBasePath() && Crm.getCrmBasePath().indexOf("crm") != -1) ? Crm.getCrmBasePath()+"/settings/users/" : ""}),
			/**
			 * @componentProperty { number } cxPropScrollRecordCount
			 * @author anuja.manoharan
			 * @version 1.0.0
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropScrollRecordCount : Lyte.attr("number"),
			/**
			 * @componentProperty { object } cxPropFormulaMapping
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFormulaMapping : Lyte.attr("object", {default : {currency : "number", text : "text",longinteger : "number", boolean : "boolean", "datetime" : "date-time", date : "date", double : "number" , decimal : "number" , integer : "number" }}),
			/**
			 * @componentProperty { boolean } cxPropViewPortLoading=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropViewPortLoading: Lyte.attr('boolean',{default:false}),
			/**
			 * @componentProperty { boolean } cxPropCellPrefixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellPrefixYield: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropShowSortIconOnHover
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropShowSortIconOnHover: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropTextareaProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropTextareaProperties: Lyte.attr("object", {default : {popoverProperties:{}, highlightUrl : false}}),
			/**
			 * @componentProperty { object } cxPropFilterProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropFilterProperties: Lyte.attr("object", {default : {}}),
			/**
			 * @componentProperty { boolean } cxPropCellZcqaWithRowNo=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropCellZcqaWithRowNo : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropHeaderCellPrefixYield=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropHeaderCellPrefixYield : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { object } cxPropDateProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDateProperties:  Lyte.attr("object"),
			/**
			 * @componentProperty { object } cxPropDatetimeProperties
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropDatetimeProperties:  Lyte.attr("object"),
			/**
			 * @componentProperty { boolean } cxPropComparator=false
			 * @author anuja.manoharan
			 * @version 1.0.0
			 */
			cxPropComparator	: Lyte.attr("boolean", {default : true}),
			/**
			 * @componentProperty { boolean } cxPropImageProperties
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropImageProperties	: Lyte.attr("object"),
			cxPropTwitterUrl : Lyte.attr("string", {default : (typeof RebrandLinkUtil !== "undefined" ? RebrandLinkUtil.getProperty("TW_URL") : "")}),
			cxPropShowNoRecordsMessage: Lyte.attr("boolean", {default : false}),
			cxPropRole : Lyte.attr('string', {default : 'grid'}),
			cxPropAria : Lyte.attr('boolean', {default : false}),
			/**
			 * @componentProperty { boolean } cxPropEditMode=true
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropEditMode	: Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropCellProperties=false
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropCellProperties : Lyte.attr("object"),
				/**
			 * @componentProperty { object } cxPropNumberProperties
			 * @author gowtham.mp
			 * @version 1.0.0
			 */
			cxPropUserProperties : Lyte.attr("object"),

			cxPropHeaderZcqaPrefix : Lyte.attr("string"),

			cxPhoneProperties: Lyte.attr("object"),

			cxPropErrorOnHovercard: Lyte.attr("boolean"),
			cxPropCellProperties: Lyte.attr("object"),
			cxPropFooterYield: Lyte.attr("boolean"),
			cxPropTableWrapperClass : Lyte.attr("string"),
			cxPropIsRtlEnabled: Lyte.attr('boolean',{default:typeof Crm!=="undefined"?Crm.userDetails.RTL_ENABLED:false}),
			cxPropCustomCopy: Lyte.attr("boolean"),
			cxPropHeaderProperties : Lyte.attr("object" , {default : {}}),
			cxPropShowMandatoryOnHeader: Lyte.attr("boolean"),
			cxPropSortZcqaPrefix: Lyte.attr("string"),
			cxPropRecordId: Lyte.attr("string"),
			cxPropResetScroll: Lyte.attr("boolean", {default : true}),
			cxPropIntersectionType: Lyte.attr("string",{default:'cell'}),
			cxPropResetExpressScroll: Lyte.attr("boolean", {default : false}),
			isSlyteTable: Lyte.attr('boolean'),

			/* hide template tags */
			cxPropHideTemplate : Lyte.attr('boolean'),
			cxPropMaskUnmaskIcon : Lyte.attr("boolean",{ default : true }),
			cxPropIsMaskingFeatureEnabled : Lyte.attr("boolean",{default : (typeof Crm !== "undefined" ? Crm.isMaskingFeatureEnabled : false)}),
			showEmMaskUnmaskIcon : Lyte.attr("boolean",{default :false}),
			cxPropTableWrapperClass : Lyte.attr("string"),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			/**
			 * @componentProperty { boolean } cxPropSuffixHeader=false
			 * @author silambarasan.rt
			 */
			cxPropSuffixHeader : Lyte.attr("boolean", {default : false}),
			/**
			 * @componentProperty { boolean } cxPropFullYield=false
			 * @author mahalakshmi
			 */
			cxPropFullYield : Lyte.attr("boolean", {default : false}),
			headerTabIndex: Lyte.attr("number",{default:0})

		}
	},
	init: function(){
		this.setData('isSlyteTable',this.$node && (this.$node.hasAttribute('pb-css-id') || this.$node.hasAttribute("comp-in-parent")) && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard));
		if(this.data.isSlyteTable){
			if((!this.getData('cxPropFieldTypeMapping') || Object.keys(this.getData('cxPropFieldTypeMapping')).length === 0) || !this.getData('cxPropFieldTypeMappingSelector')){
				this.setData('cxPropFieldTypeMappingSelector','data_type');
				this.setData('cxPropFieldTypeMapping',{"layout":"layout","autonumber":"text","multiselectpicklist":"text","textarea":"text","text":"text","phone":"text","email":"text","mobile":"text","website":"text","decimal":"number","integer":"number","bigint":"number","double":"number","currency":"number","picklist":"picklist","datetime":"date","date":"date","multiuserlookup":"user","ownerlookup":"user","userlookup":"user","boolean":"boolean","lookup":"text","date_time":"date-time","longinteger":"number","user":"user"});
			}
			if(!this.getData('cxPropDateProperties')){
				this.setData('cxPropDateProperties',{dateInUserPattern:false});
			}
			if(!this.getData('cxPropDatetimeProperties')){
				this.setData('cxPropDatetimeProperties',{datetimeInUserPattern:false});
			}
		}
	},
	isSelected : function() {
		return window.getSelection().isCollapsed == false;
	},
	actions : {

		toggleAccordion : function( data, elem ){

			var isAccOpen = elem.closest("lyte-exptable-tbody");
			if(isAccOpen && isAccOpen.className && isAccOpen.className.includes('lyteExpTbodyClosed')){
				isAccOpen = false;
			}else{
				isAccOpen = true;
			}

			var toggleAcc = true;
			if(!isAccOpen && this.getMethods("onBeforeOpen")){
				/**
				 * @method onBeforeOpen
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				toggleAcc = this.executeMethod("onBeforeOpen");//No I18n
			}else if(isAccOpen && this.getMethods("onBeforeClose")){
				/**
				 * @method onBeforeClose
				 * @author mariswaran.sv
				 * @version 1.0.0
				 */
				toggleAcc = this.executeMethod("onBeforeClose");//No I18n
			}
			toggleAcc = (toggleAcc===undefined)?true:toggleAcc;
			if(toggleAcc){
			var exp_table = elem.closest('lyte-expresstable');
			if(!data.cxPropContent.length){
				Lyte.objectUtils( data , "add" , "cxPropContent" , data.content );
				exp_table.reset();
				}
				else{
					exp_table.toggleRows( elem.closest( 'lyte-exptable-tbody' ) );
					if(!isAccOpen && this.getMethods("onOpen")){
						/**
						 * @method onOpen
						 * @author mariswaran.sv
						 * @version 1.0.0
						 */
						this.executeMethod("onOpen");//No I18n
					}else if(isAccOpen && this.getMethods("onClose")){
						/**
						 * @method onClose
						 * @author mariswaran.sv
						 * @version 1.0.0
						 */
						this.executeMethod("onClose");//No I18n
					}
				}
			}
    		
    	},
		sort : function(field,event){
			if(!this.data.cxPropShowSortIcon){
				this.sortFn(field,event);
			}
		},
		sortIconClick : function(field,event){
			this.sortFn(field,event);
		},
		onRowClick : function(row,event){
			if(this.isSelected() || event.target.classList.contains("cruxPreventClick")) {
				return false;
			}
			// if(this.$node._actions["on-body-row-click"]){
				/**
				 * @event on-body-row-click
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } row
				 * @param { * } event
				 */
				this.throwEvent("on-body-row-click", row,event);//No I18n
			// }
		},
		onMouseOver : function(id, self,row){
			// if(this.$node._actions["on-mouse-over"]){
				/**
				 * @event on-mouse-over
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } rowObject
				 */
				if(this.data.isSlyteTable){
					this.throwEvent("on-mouse-over", row);//No I18n
				}else{
					this.throwEvent("on-mouse-over",id, self);//No I18n
				}
			// }
		},
		onMouseOut : function(id, self,row){
			// if(this.$node._actions["on-mouse-out"]){
				/**
				 * @event on-mouse-out
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { * } rowObject
				 */
				if(this.data.isSlyteTable){
					this.throwEvent("on-mouse-out", row);//No I18n
				}else{
					this.throwEvent("on-mouse-out", id, self);//No I18n
				}
			// }
		},
		scroll : function(ev){
			var body = ev.target;
			if(this.getData('beingResized')){
				return;
			}
			if(this.getMethods("onScroll")){
				/**
				 * @method onScroll
				 * @author anuja.manoharan
				 * @version 1.0.0
				 * @param { number } contentLength - Number of rows currently rendered in the table.
				 */
				this.executeMethod("onScroll", this.data.content.length);//No I18n
			}
			if(this.getData("new")){
				this.fetchNextDataNew(body);
				// this.fetchNextData(body);
			}
			else if(this.moreContent && (body.scrollHeight-300 <= (Math.ceil(body.offsetHeight) + Math.ceil(body.scrollTop)))){
				this.scrollTop = body.scrollTop;
				this.moreContent = false;
				var more = this.getData("cxPropContent").slice(this.rendered, this.getData("nextRender")+this.rendered);//No I18n
				if(more && more.length){
					Lyte.arrayUtils(this.getData("content"), "push", more);//No I18n
					this.rendered += more.length;//No I18n
					this.moreContent = true;
					this.scrollTable();
					if(this.getMethods("onScrollRecordsHaveBeenRendered")){
						// /**
						//  * @method onScrollRecordsHaveBeenRendered
						//  * @author anuja.manoharan
						//  * @version 1.0.0
						//  */
						this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
					}
				}
				else if(this.getMethods("onScrollFetchMoreRecords")){
					// /**
					//  * @method onScrollFetchMoreRecords
					//  * @author anuja.manoharan
					//  * @version 1.0.0
					//  */
					this.executeMethod("onScrollFetchMoreRecords", this.rendered).then(function(res){//No I18n
						if(res && res.length){
							Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
							this.rendered+=res.length;
							this.moreContent = true;
							this.scrollTable();
						}
						else{
							this.moreContent = false;
						}
						if(this.getMethods("onScrollRecordsHaveBeenRendered")){
							// /**
							//  * @method onScrollRecordsHaveBeenRendered
							//  * @author anuja.manoharan
							//  * @version 1.0.0
							//  */
							this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
						}
					}.bind(this))
				}
			}
		},
		getOnMouseDown : function(event){
			if(event.target.tagName === "LYTE-TABLEHEAD-RESIZE") {
				$L(event.target).closest('lyte-th').addClass('resizeStart'); //No i18N
			}
		},
		hoverOnTh : function(ele, show){
			var elem = this.$node.querySelector(".cxPropTh"+(ele-1));//No i18N
			if(elem){
				if(show){
					elem.classList.add("nLThHover");//No i18N
				}
				else{
					elem.classList.remove("nLThHover");//No i18N
				}
			}
			if(this.data.cxPropShowSortIconOnHover){
				elem = this.$node.querySelector(".cxPropTh"+ele+" .cxTableSortIcon");
				if(show){
					elem.classList.remove("cxTableSortIconHide");
				}
				else{
					elem.classList.add("cxTableSortIconHide");
				}
			}

		},
		phoneClick : function(row, field){
			Lyte.registeredMixins["crux-element-validation"].phoneClick(row[field.api_name],this.getData('cxPropRecordId') ?  this.getData('cxPropRecordId') : row.id, this.data.cxPropModule, row[moduleRecordMapping[this.data.cxPropModule].display_field.api_name]);
		},
		stopEvent : function(){
			event.preventDefault();
		},
		hoverOnTable : function(index,over){
			this.setData('mouseOverTable',over);
		},
		toggleFilter: function(){
			this.throwEvent("toggle-filter");//No I18n
		},
		showSortIcon : function(index, show){
			var elem;
			if(this.data.cxPropShowSortIconOnHover && (elem = this.$node.querySelector(".cxPropTh"+index+" .cxTableSortIcon"))){
					if(show){
						elem.classList.remove("cxTableSortIconHide");
					}
					else{
						elem.classList.add("cxTableSortIconHide");
					}
			}
		}
	},
	sortFn : function(field,ev){
		let eventClone = {target : ev.target};
		if(this.isSelected()) {
			return false;
		}
		clearTimeout(this.sortTimer);
		this.sortTimer = setTimeout(function(){
			if(this.beingResized){
				clearTimeout(this.sortTimer);
				return false;
			}
			if(!this.getData("cxPropShowSortDropdown")){
				this.triggerSortClick(field, ev);
			}
			// else if(this.getData("cxPropEnableSort")){
			// 	this.performSort(field);
			// }
			else if(this.getData("cxPropSortColumns") == true){
				// /**
				//  * @event on-sort
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } field
				//  * @param { * } event
				//  */
				this.throwEvent("on-sort", field, ev , eventClone);//No I18n
			}
		}.bind(this), 100);
	},
	checkIfRowPresent: function(rowIdx){
		let originalContent = this.getData('cxPropContent'), content = this.getData('content');
		if(rowIdx>content.length-1 && rowIdx+1<originalContent.length){
			Lyte.arrayUtils(content,'push',originalContent.slice(content.length,rowIdx+1));
			this.rendered = rowIdx+1;
		}
	},
	scrollToCell: function(rowIdx,colIdx,scrollIfNeeded=true){
		if(!Number.isInteger(rowIdx) && !Number.isInteger(colIdx)){
			return
		}
		let rowElem,columnElem,newScrollLeft,newScrollTop;
		let table = this.$node.querySelector('lyte-table'),headElem = this.$node.querySelector('lyte-thead');
		let tableHeight = table.offsetHeight, tableWidth = table.offsetWidth;
		let scrollDiv = table.querySelector('.lyteTableScroll');
		if(Number.isInteger(rowIdx)){
			this.checkIfRowPresent(rowIdx);
			rowElem = this.$node.querySelector(`.tablecomponent2 lyte-tr:nth-child(${rowIdx+1})`);
			if(rowElem && headElem){
				//if scroll if needed is true, we have to check if the row is hidden and then srcolled
				if((scrollIfNeeded && !(	scrollDiv.scrollTop < (rowElem.offsetTop-headElem.offsetHeight) && (scrollDiv.scrollTop > rowElem.offsetTop-(tableHeight-headElem.offsetHeight))	)) || !scrollIfNeeded){		
					newScrollTop = rowElem.offsetTop-headElem.offsetHeight;
				}
			}
		}
		if(Number.isInteger(colIdx) && headElem){
			columnElem = headElem.querySelector(`lyte-th:nth-child(${colIdx+1})`);
			if(columnElem){
				let offLeft = columnElem.offsetLeft;
				let scrollLeft = scrollDiv.scrollLeft;
				let fixedColumnWidth = 0;
				//checking if there are any fixed columns
				headElem.querySelectorAll("lyte-th[fixed='enable']").forEach((elem)=>{
						fixedColumnWidth += elem.offsetWidth;
				})
				if(this.getData('cxPropIsRtlEnabled')){
					offLeft = scrollDiv.scrollWidth - (offLeft+columnElem.offsetWidth);
					scrollLeft *= -1;
				}
				if((scrollIfNeeded && !(	scrollDiv.scrollLeft < (offLeft-fixedColumnWidth) && (scrollDiv.scrollLeft > offLeft-(tableWidth-fixedColumnWidth))	)) || !scrollIfNeeded){
					newScrollLeft = offLeft - fixedColumnWidth;
					newScrollLeft = this.getData('cxPropIsRtlEnabled') ? -1*newScrollLeft : newScrollLeft;
				}
			}
		}
		table.scrollTable(newScrollLeft,newScrollTop);	
	},
	focusElement: function(rowIdx=0,colIdx=0){
		var elem = this.$node.querySelector(`#row${rowIdx}_column${colIdx}`);
		if(elem){
			elem.focus();
		}
	},
	validateElements: function(){
		let rowElems = this.$node.querySelectorAll('.tablecomponent2 lyte-tr'), isValid = true,focused; //eslint-disable-line @zoho/webperf/no-complex-selector
		rowElems.forEach((rowElem,idx)=>{
			rowElem.children.forEach((cellElem,celIdx)=>{
				if(cellElem){
					let elem = cellElem.firstElementChild;
					if(elem.classList.contains('cxEditElement')){
						isValid = elem.component.validate() && isValid;
						if(!focused && !isValid){
							this.scrollToCell(idx,celIdx);
							elem.focus();
							focused = true;
						}
					}
				}
			});
		});
		return isValid;
	},
	didConnect : function(){
//To add a common class for the Crux table element to achieve "no result" handling by Karthipan
		this.$node.classList.add('cxTableContainer');
		this.$node.focus = (rowIdx,colIdx)=>{
			this.focusElement(rowIdx,colIdx);
		};
		this.$node.validate = ()=>{
			return this.validateElements();
		};
		this.$node.scrollElemIntoView  = (rowIdx,coldIx,scrollIfNeeded)=>{
			this.scrollToCell(rowIdx,coldIx,scrollIfNeeded);
		}
		this.$node.resize = ()=>{
			this.checkIfMoreRecordsNeeded();
		}
		// $L(this.$node).scroll({showOn : "scroll", handlerClass : "scrollbarClass", containerClass : "scrollbarClass"});//No I18n
		if (this.pos && this.pos > 2 && !this.data.cxPropExpress) { // this.pos > 2 added, since it scrolls the 1st element always -> temp fix
			this.$node.querySelector(".lyteTableScroll").scrollTop = this.$node.querySelectorAll("lyte-tr")[this.pos].offsetTop;//No I18n
		}
		if(this.getData("cxPropEnableBodyScroll")){
			this.boundEvent = this.resize.bind(this);
			window.addEventListener("resize", this.boundEvent, true);
		}
		// this.$node.insertContent = function(index, contentarray){
		// 	Lyte.arrayUtils(this.getData("content"), "insertAt", index, contentarray);
		// 	this.scrollTable();

		// },
		// this.$node.showLoadingDown = function(val){
		// 	this.setData("showLoadingDown", val);
		// }
		this.$node.maskUnmask=(api_name,unmask)=>{
			this.maskUnmask(api_name,unmask);
		};
		this.checkIfMoreRecordsNeeded();
	},
	checkIfMoreRecordsNeeded: function(){
		if(this.data.cxPropEnableBodyScroll && !this.data.cxPropScrollRecordCount
		&& !this.data.cxPropExpress 
		&& this.data.content && this.data.cxPropContent
		&& this.data.content.length!==this.data.cxPropContent.length
		&& this.data.new){
			let scrollDiv = this.$node.querySelector('.lyteTableScroll');
			if(scrollDiv){
				let clientHeight = scrollDiv.clientHeight;
				let rowCount = Math.ceil((clientHeight)/this.minHeightOfRow);
				if(rowCount > this.data.content.length){
					let diff = rowCount - this.data.content.length;
					Lyte.arrayUtils(this.getData("content"), "push", this.getData("cxPropContent").slice(this.endIndex,this.endIndex+diff));//No I18n
					this.maxRenderCount = rowCount;
					this.endIndex+=diff;//No I18n
				}
			}
		}
	},
	observeFields : function(){
		if(!this.data.cxPropHeader){
			this.data.cxPropHeader = [];
		}
		this.setData('intPinnedColumn',"");
		var header = this.data.cxPropHeader.slice(0);//No I18n
		var mapping = this.data.cxPropFieldTypeMapping;//NO I18n
		var subTypeMapping = {'text':{medium:'text-area',large:'text-area'}}
		var selector = this.data.cxPropFieldTypeMappingSelector;//NO I18n
		var formulaMapping = this.data.cxPropFormulaMapping;//No I18n
		for(var i=0; i<header.length; i++){
			// if( !this.data.cxPropHeaderProperties.hasOwnProperty(header[i].id) ){
			// 	this.data.cxPropHeaderProperties[header[i].id] = {};
			// }
			if(header[i].cxPropPinned){
				this.setData('intPinnedColumn',header[i].id);
			}
			if(header[i].ui_type == 116 && subTypeMapping[formulaMapping[header[i].formula.return_type]] && subTypeMapping[formulaMapping[header[i].formula.return_type]][header[i].formula.sub_return_type]){
				header[i].cxTypeMapping = subTypeMapping[formulaMapping[header[i].formula.return_type]][header[i].formula.sub_return_type];
			}
			else if(header[i].ui_type == 116 || header[i].ui_type == 117){
				header[i].cxTypeMapping = formulaMapping[header[i].formula.return_type];
			}
			else if(header[i].ui_type == 118){
				header[i].cxTypeMapping = formulaMapping[header[i].rollup_summary.return_type];
			}
			else if(!header[i].custom_field && (header[i].api_name === "Solution_Number" || header[i].api_name === "Quote_Number" || !mapping[header[i][selector]] || header[i].api_name === "Invoice_Number" || header[i].api_name === "Case_Number" || header[i].api_name === "SO_Number")){
				header[i].cxTypeMapping = "text";
			}
			else if((header[i].ui_type == 333 || header[i].ui_type == 14 || header[i].ui_type == 786) && this.getData("cxPropModule") == "Activities"){
				header[i].cxTypeMapping = "allday";
			}
			else{
				header[i].cxTypeMapping = mapping[header[i][selector]];
			}
			if(this.data.cxPropIsAlphaSearchShown && this.data.cxPropModuleDisplayField[this.data.cxPropModule] && this.data.cxPropModuleDisplayField[this.data.cxPropModule].indexOf(header[i].api_name) > -1){
				header[i].cxShowDropdown = true;
			}
			if(this.getData('cxPropEditMode')){
				this.copyProperties(header[i],this.getData(`cxProp${header[i].cxTypeMapping.charAt(0).toUpperCase()+header[i].cxTypeMapping.substring(1)}Properties`));
			}
		}
		if(this.data.cxPropYieldForPrefix == true || this.data.cxPropYieldForSuffix == true){
			var prefixYields , prefixLength , suffixYields , suffixLength;
			if(this.getData("cxPropHeaderYield")){
				prefixYields = this.getData("cxPropHeaderYield").prefix ? this.getData("cxPropHeaderYield").prefix : [] , prefixLength = prefixYields.length;//eslint-disable-line no-unused-expressions
				for(i=0; i < prefixLength; i++){
					header.splice(i, 0, {yield : true, fixed : prefixYields[i].fixed, width : prefixYields[i].width, yieldName : "prefix-"+(i+1),
						style : prefixYields[i].style, cxPropClass : prefixYields[i].class})
				}
				suffixYields = this.getData("cxPropHeaderYield").suffix ? this.getData("cxPropHeaderYield").suffix : [] , suffixLength = suffixYields.length;//eslint-disable-line no-unused-expressions
				for(i=0; i<suffixLength; i++){
					header.push({yield : true, fixed : suffixYields[i].fixed, width : suffixYields[i].width, yieldName : "suffix-"+(i+1),
						style : suffixYields[i].style, cxPropClass : suffixYields[i].class})
				}
			}
			else if((this.data.cxPropPrefixYields && this.data.cxPropPrefixYields.length > 0) || (this.data.cxPropSuffixYields && this.data.cxPropSuffixYields.length > 0)){
				prefixYields = this.data.cxPropPrefixYields , prefixLength = prefixYields.length; //eslint-disable-line no-unused-expressions
				for(i=0; i < prefixLength; i++){
					header.splice(i, 0, {yield : true, fixed : prefixYields[i].fixed, width : prefixYields[i].width, yieldName : "prefix-"+(i+1),
						style : prefixYields[i].style, cxPropClass : prefixYields[i].class})
				}
				suffixYields = this.data.cxPropSuffixYields , suffixLength = suffixYields.length; //eslint-disable-line no-unused-expressions
				for(i=0; i<suffixLength; i++){
					header.push({yield : true, fixed : suffixYields[i].fixed, width : suffixYields[i].width, yieldName : "suffix-"+(i+1),
						style : suffixYields[i].style, cxPropClass : suffixYields[i].class})
				}
			}else{
				var count = 1;
				var prefix = this.$node.querySelector("template[yield-name='header-prefix-"+count+"']");//No I18n
				var suffix = this.$node.querySelector("template[yield-name='header-suffix-"+count+"']");//No I18n
				if(prefix || suffix){
					var start = 0, end = 1;
					while(prefix || suffix){
						if(prefix){
							header.splice(start, 0, {yield : true, fixed : prefix.getAttribute("cx-prop-fixed"), width : prefix.getAttribute("cx-prop-width"),
								yieldName : "prefix-"+(start+1), style : prefix.getAttribute("cx-prop-style")});//No I18n
							start++;
						}
						if(suffix){
							header.push({yield : true, fixed : suffix.getAttribute("cx-prop-fixed"), width : suffix.getAttribute("cx-prop-width"),
								yieldName : "suffix-"+end, style : suffix.getAttribute("cx-prop-style")});//No I18n
							end++;
						}
						count++;
						prefix = this.$node.querySelector("template[yield-name='header-prefix-"+count+"']");//No I18n
						suffix = this.$node.querySelector("template[yield-name='header-suffix-"+count+"']");//No I18n
					}
				}
			}
		}
		if(this.data.cxPropCheckboxPosition > -1){
			header.splice(this.data.cxPropCheckboxPosition, 0, {cxCheckbox : true, fixed : "enable"});//no i18n
		}
		this.setData("header", header);//No I18n
		var headerFields = header.slice(0)
		this.setData('headerFields',headerFields)//No I18n
		// this.setData("display_field_api_name", (this.data.cxPropModule && (typeof moduleRecordMapping != "undefined") && moduleRecordMapping[this.data.cxPropModule].display_field) ? moduleRecordMapping[this.data.cxPropModule].display_field.api_name : "");//No I18n
	}.observes("cxPropHeader", "cxPropPrefixYields", "cxPropSuffixYields", "cxPropHeaderYield", "cxPropYieldForPrefix", "cxPropYieldForSuffix").on("init"),//No I18n
	copyProperties: function(header,properties){
		if(properties){
			let cxProp = {};
			let apiSet = new Set();
			if(this.getData('cxPropHeader') && this.getData('cxPropHeader').length){
				this.getData('cxPropHeader').forEach((head)=>{ apiSet.add(head.api_name); });
			};
			Object.keys(properties).filter((prop)=> !apiSet.has(prop.api_name)).forEach((prop)=>{
				cxProp[prop] = properties[prop];
			});
			if(properties[header.api_name]){
				let fieldProp = properties[header.api_name];
				Object.keys(fieldProp).forEach((prop)=>{
					cxProp[prop] = fieldProp[prop];
				});
			}
			header.cxProp = JSON.stringify(cxProp);
		}
	},
	minHeightOfRow : 37,
	validateDisplayRowNumber : function() {
        if(this.data.cxPropDisplayRowNumber == undefined || isNaN(this.getData("cxPropDisplayRowNumber"))) {
            this.setData('cxPropDisplayRowNumber',1);//No I18n
        }
    }.observes('cxPropDisplayRowNumber').on('init'),//No I18n
	observeContent : function(change){
		if(this.obj) {
			clearInterval(this.obj.interval);
		}
		if(this.obju) {
			clearInterval(this.obju.interval)
		}
		this.clearValues();
		this.obj = undefined;
		this.obju = undefined;
		if(!this.data.cxPropContent){
			this.data.cxPropContent = [];
		}
		this.data.renderedGroups = [];
		var groupTable = this.data.cxPropContent.length && this.data.cxPropContent[0].cxGroupName ? true : false;
		if(this.data.cxPropEnableBodyScroll == true){
			this.maxRenderCount = Math.ceil(window.innerHeight/this.minHeightOfRow);		
			var halfCount = this.data.cxPropContent.length/2;
			if(halfCount >= 50){
				halfCount = 50;
			}
			if(this.data.cxPropScrollRecordCount){
				this.maxRenderCount = this.data.cxPropScrollRecordCount;
			}
			else if(halfCount >= this.maxRenderCount && !this.data.cxPropRenderOnlyViewportRecords){
				this.maxRenderCount = Math.ceil(halfCount);
				this.setData("showLoadingDown", true);//No I18n
			}
			if(this.data.new){
				this.upContent = true;
				this.downContent = true;
				this.startIndex = this.data.cxPropDisplayRowNumber >= (this.data.cxPropContent.length -5) ? this.data.cxPropDisplayRowNumber - this.maxRenderCount : this.data.cxPropDisplayRowNumber -5;
				if(this.startIndex <= 0){
					this.startIndex = 0;
					this.upContent = false;
				}
				if(this.startIndex != 0){
					this.setData("showLoadingUp", true);//No I18n
				}
				this.endIndex = this.startIndex+this.maxRenderCount;
				if(this.endIndex >= this.data.cxPropContent.length){
					var diff = this.endIndex-this.data.cxPropContent.length;
					this.startIndex = this.startIndex-diff;
					if(this.startIndex <= 0){
						this.startIndex = 0;
						this.upContent = false;	
						this.setData("showLoadingUp", false);
					}
					this.setData("showLoadingDown", false);// No I18n
				}
				else{
					this.setData("showLoadingDown", true);// No I18n
				}
				this.pos = this.data.cxPropDisplayRowNumber-this.startIndex;//No I18n
				var more = this.data.cxPropContent.slice(this.startIndex, this.endIndex);
				for(var i=0; i<more.length; i++){
					delete more[i].hideRecord;
				}
				if(groupTable){
					more[this.startIndex].cxPropContent = more[this.startIndex].content.slice(this.startIndex,more[this.startIndex].per_page);
					// for( var i =this.startIndex+1 ; i<more.length; i++ ){
					// 	more[this.startIndex+i].cxPropContent = []
					// }
					
				}
				this.setData("content", more);//No I18n
				this.endIndex = this.endIndex - 1;
				if(change){
					this.checkIfMoreRecordsNeeded();
				}
				if(this.getData("showLoadingUp") == true){
					$L.fastdom.mutate(function(){
						var width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").clientWidth;//No i18n
						var ele = this.$node.querySelectorAll(".cxTableLoadingDiv");//No i18n
						for(var i=0; i<ele.length; i++){
							ele[i].style.width = width+"px";
						}
						var more = this.getData("cxPropContent").slice(0, this.startIndex);//No I18n
						if(more && more.length){
							this.countDown = 0;
							this.intervalDown = setInterval(function(){
								for(var i=0; i<2; i++){
									if(more[this.countDown]){
										more[this.countDown].hideRecord = true;
										Lyte.arrayUtils(this.getData("content"), "insertAt", this.countDown, more[this.countDown]);// No I18n
										this.countDown++;
									}
									else{
										clearInterval(this.intervalDown);
										var rows = document.querySelectorAll(".cruxHideRow");//No I18n
										for(var j=0; j<rows.length; j++){
											rows[j].classList.remove("cruxHideRow");
										}
										//this.$node.querySelector("lyte-expresstable").fixRowHeight();//No I18n
										//this.$node.querySelector("lyte-expresstable").setHeaderWidth();//No I18n
										this.$node.querySelector("lyte-expresstable") ? this.$node.querySelector("lyte-expresstable").contentObserver() : "";//No I18n
										// var height = (more.length)*this.minHeightOfRow;
										// this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop+height;//No I18n
										// var height = (this.getData("cxPropDisplayRowNumber")+1)*this.minHeightOfRow;//No I18n
										// var height = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup lyte-exptable-tr:nth-child(11)").offsetTop-this.minHeightOfRow;//No I18n
										// this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").scrollTop = height;//No I18n
										// var height = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup lyte-exptable-tr:nth-child(11)").offsetTop;//No I18n
										this.setData("showLoadingUp", false);//No I18n
										if(this.getMethods("onScrollSetLatestEntityPosition")){
											// /**
											//  * @method onScrollSetLatestEntityPosition
											//  * @author anuja.manoharan
											//  * @version 1.0.0
											//  */
											this.executeMethod("onScrollSetLatestEntityPosition");//No I18n
										}
										if(this.getMethods("onScrollRecordsHaveBeenRendered")){
											// /**
											//  * @method onScrollRecordsHaveBeenRendered
											//  * @author anuja.manoharan
											//  * @version 1.0.0
											//  */
											this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
										}
									}
								}
							}.bind(this), 10);
						}
					}.bind(this))
				}
			}
			else{
				this.rendered = 0;
				this.moreContent = true;


				if(change && change.hasOwnProperty('index')){
					if(this.data.cxPropContent!=this.data.content){ //eslint-disable-line eqeqeq, @zoho/zstandard/proper-usage-of-if
						if(change.index<=this.data.content.length){
							if(change.removedItems){
								Lyte.arrayUtils(this.data.content,'removeAt',change.index,change.removedItems.length);
							}
							if(change.insertedItems){
								Lyte.arrayUtils(this.data.content,'insertAt',change.index,change.insertedItems);
							}
						}
					}else{
						this.setData("content", this.data.cxPropContent);//No I18n
					}

				}else{
					if(this.data.cxPropContent.length > this.maxRenderCount){
						this.setData("content", this.data.cxPropContent.slice(0,this.maxRenderCount));//No I18n
					}else{
						this.setData("content", this.data.cxPropContent);//No I18n
					}
				}
				this.rendered = this.data.content.length;//No I18n

			}
		}
		else{
		var table_data = this.data.cxPropContent;
		if(groupTable){
			table_data[0].cxPropContent = table_data[0].content.slice(0,table_data[0].per_page);
			var table_data_len = table_data.length;
			for( var j = 1; j < table_data_len; j++ ){
				table_data[j].cxPropContent = [];
			}
		}
			this.setData("content", table_data);//No I18n
			this.moreContent = false;

			if($L('.lyteTableScroll',this.$node) && this.data.mouseOverTable){
				$L('.lyteTableScroll',this.$node).resetScrollbar()//No I18n
			}
		}
		let tableScroll = this.$node.querySelector(".lyteTableScroll")
		if(!this.getData('cxPropEditMode') && tableScroll){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
			$L.fastdom.mutate(function(){
				tableScroll.scrollLeft = 0;//No I18n
				tableScroll.scrollTop = 0;//No I18n
			})
		}
		let expressTable = this.$node.querySelector("lyte-expresstable");
		if(expressTable){
			if(this.getData('cxPropResetExpressScroll')){
				expressTable.scrollTo(0,0);
			}
			expressTable.reset();
		}
		this.data.content.length ? this.$node.classList.remove('cxTableNoContent') : this.$node.classList.add('cxTableNoContent');
	}.observes("cxPropContent.[]").on("init"),//No I18n 
	resize : function(event){
		clearTimeout(this.timeout);
		var self = this;
		this.timeout = setTimeout(function(){
			var noOfRows = Math.ceil(window.innerHeight/self.minHeightOfRow);
			if(self.getData("new")){
				if(noOfRows > self.maxRenderCount){
					self.maxRenderCount = noOfRows;
					self.fetchNextDataNew(document.querySelector(".lyteTableScroll"))//No I18n
					// self.fetchNextData(document.querySelector(".lyteTableScroll"));//No i18n
				}
			}
			else if(self.moreContent && noOfRows > self.rendered && self.getData("cxPropContent")){
				Lyte.arrayUtils(self.getData("content"), "push", self.getData("cxPropContent").slice(self.rendered, noOfRows));//No I18n
				self.maxRenderCount = self.rendered = noOfRows;
			}
		}, 300);
	},
	maskUnmask:function(api_name,unmask){
		if( this.data.cxPropDataBind==="lyteFastRender"){
			const header = [...this.data.cxPropHeader];
    		const index = header.findIndex(item => item.api_name === api_name);
			if (index !== -1) {
				header[index].unmask = unmask; 
				this.setData("cxPropHeader", header);
			}
			var content=this.data.cxPropContent;
			let resetNeeded;
			if(this.getData('cxPropExpress') && this.getData('cxPropResetExpressScroll')){
				this.setData('cxPropResetExpressScroll',false);
				resetNeeded = true;
			}
			this.setData("cxPropContent",[]);
			this.setData("cxPropContent",content);
			if(resetNeeded){
				this.setData('cxPropResetExpressScroll',true);
			}
		}else{
			var curr_obj=this.data.cxPropHeader.filter((item)=>item.api_name === api_name);
			Lyte.objectUtils( curr_obj[0] , "add" , "unmask" , unmask );
		}
	},
	didDestroy : function(){
		window.removeEventListener("resize", this.boundEvent, true);
		if(this.obj) {
			clearInterval(this.obj.interval);
		}
		if(this.obju) {
			clearInterval(this.obju.interval)
		}
		clearInterval(this.intervalUp);
		clearInterval(this.intervalDown);
		this.removeUnmaskProps();
		this.obj = undefined;
		this.obju = undefined;
		if(document.getElementById("cxTableSortMenu")){
			document.getElementById("cxTableSortMenu").remove();
		}
	},
	removeUnmaskProps : function(){
		let header = this.data.cxPropHeader || [];
		header.forEach((fld)=>{
			delete fld.unmask;
		});
	},
	scrollTable : function(left, top){
		if(!this.getData("cxPropExpress")){
			var table = this.$node.querySelector("lyte-table");//No I18n
			delete table._scrolldiv._alive
			if(top){
				table.scrollTable(left, top);
			}
			else{
				table.scrollTable();
			}
		}else{
			this.$node.querySelector("lyte-expresstable") ? this.$node.querySelector("lyte-expresstable").reset() : "";
		}
	},
	fetchNextData :  function(body){
		// clearTimeout( this._debounce );
		// this._debounce = setTimeout( function(){
			var scrollT =  this.scrollTop;
			this.scrollTop = body.scrollTop;
			if(this.disableScroll) {
					return;
			}
			// if(this.downContent && !this.waitDown && body.scrollTop > scrollT){
			if(this.downContent && !this.waitDown && (body.scrollTop > (document.querySelector(".lyteExpTableRowGroup").offsetHeight-500))){
				this.downContent = false;
				var start = this.endIndex+1;
				var end = this.endIndex+this.maxRenderCount;
				// this.endIndex = this.endIndex+this.maxRenderCount;
				var more = this.getData("cxPropContent").slice(start, end);//No I18n
				var self = this;
				if(more && more.length){
				var obj;
				if(this.obj ) {
					obj = this.obj;
					Lyte.arrayUtils(obj.moreArr, 'push', more);//No I18n
				} else {
					obj = this.obj = {};
					if(this.upContent) {
						obj.startIndex = this.endIndex - this.startIndex + 1;
					} else {
						obj.startIndex = this.endIndex + 1;
					}
					obj.moreArr = more;
					obj.count = 0;
					obj.interval = setInterval(function() {
						for(var i=0;i<2;i++) {
							if(obj.moreArr[obj.count]) {
								Lyte.arrayUtils(self.getData("content"), 'push', obj.moreArr[obj.count++]);//No I18n
								// Lyte.arrayUtils(self.getData("content"), 'insertAt', obj.startIndex++, );//No I18n
							} else {
								clearInterval(obj.interval);
								self.waitDown = false;
								self.obj = undefined;
							}
						}
					},10);
				}
				// this.waitDown = true;
				this.endIndex+=more.length;
				this.downContent = true;
				// obj.endIndex = this.endIndex;
				this.setData("showLoadingDown", false);//No I18n
				}
				else if(this.getMethods("onScrollFetchMoreRecords")){
					// /**
					//  * @method onScrollFetchMoreRecords
					//  * @author anuja.manoharan
					//  * @version 1.0.0
					//  */
					this.executeMethod("onScrollFetchMoreRecords", this.endIndex).then(function(res){//No I18n
						if(res && res.length){
							Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
							this.endIndex+=res.length;
							this.downContent = true;
							this.scrollTable();
							this.setData("showLoadingDown", false);//No I18n
						}
					}.bind(this))
				}
				else{
					this.setData("showLoadingDown", false);//No I18n
				}
			}
			if(this.upContent && !this.waitUp && body.scrollTop < scrollT){
				this.upContent = false;
				var end = this.startIndex;
				if(end == 0){
					return;
				}
				// this.endIndex = this.startIndex-1;
				this.startIndex = end-this.maxRenderCount;
				if(this.startIndex < 0){
					this.startIndex = 0;
				}
				var more = this.getData("cxPropContent").slice(this.startIndex, end);//No I18n
				if(more && more.length){
					var obju;
					if(this.obju) {
						obju = this.obju;
						Lyte.arrayUtils(obju.moreArr, 'insertAt', 0, more);//No I18n
					} else {
						obju = this.obju = {};
						obju.moreArr = more;
						obju.count = 0;
						var self = this;
						obju.interval = setInterval(function() {
							var length = obju.moreArr.length;
							for(var i=0;i<2;i++) {
								var index = length - 1 - obju.count;
								obju.count++;
								if(obju.moreArr[index]) {
									Lyte.arrayUtils(self.getData("content"), 'insertAt', 0, obju.moreArr[index])//No I18n
								} else {
									clearInterval(obju.interval);
									self.obju = undefined;
									self.waitUp = false;
									break;
								}
							}
						}, 10);
					}
					// this.waitUp = true;
					// Lyte.arrayUtils(this.getData("content"), "insertAt", 0, more);//No I18n
					// Lyte.arrayUtils(this.getData("content"), "push", more);
					this.upContent = true;
					// var tbScrl = this.$node.getElementsByClassName(".lyteTableScroll")[0];
					// this.scrollTable(tbScrl.scrollLeft, tbScrl.scrollTop+(this.maxRenderCount*this.minHeightOfRow)-350);//No I18n
				}
				this.setData("showLoadingUp", false);//No I18n
			}
		// }.bind( this ), 100 )
	},
	fetchNextDataNew : function(body){
		if(this.data.cxPropExpress){
			var compareHeight = this.$node.querySelector(".lyteExpOriginalTable .lyteExpTableRowGroup").offsetHeight-this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetHeight-100;			
		}
		else{
			var compareHeight = this.$node.querySelector("lyte-tbody").offsetHeight-this.$node.querySelector(".lyteTableScroll").offsetHeight;
		}
		if(this.downContent && (body.scrollTop > compareHeight)){
			this.downContent = false;
			var start = this.endIndex+1;
			var end = this.endIndex+this.maxRenderCount+1;
			var more, moreThan50 = false;
			if(end+50 <= this.getData("cxPropContent").length){
				more = this.getData("cxPropContent").slice(start, end);//No I18n
				moreThan50 = true;
			}
			else{
				more = this.getData("cxPropContent").slice(start);// No I18n
			}
			if(more && more.length){
				this.countUp = 0;
				this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow") ? this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow").classList.remove("dN") : "";//No I18n
				this.intervalUp = setInterval(function() {
					for(var i=0;i<2;i++) {
				// 		if(more[this.countUp]) {
							more[this.countUp].hideRecord = true;
							Lyte.arrayUtils(this.getData("content"), 'push', more[this.countUp++]);//No I18n
				// 		} else {
				        if(!more[this.countUp]){
							clearInterval(this.intervalUp);
							var rows = document.querySelectorAll(".cruxHideRow");//No I18n
							for(var j=0; j<rows.length; j++){
								rows[j].classList.remove("cruxHideRow");
							}
							if(moreThan50 || this.getMethods("onScrollFetchMoreRecords")){
								this.downContent = true;
								this.endIndex = this.endIndex+this.maxRenderCount;
								this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow") ? this.$node.querySelector(".lyteExpTableOrigTableInnerWrap .cxTableDownRow").classList.add("dN") : "";//No I18n
							}
							else{
								this.setData("showLoadingDown", false);//No I18n
							}
							//this.$node.querySelector("lyte-expresstable").fixRowHeight();//No I18n
							//this.$node.querySelector("lyte-expresstable").setHeaderWidth();//NO I18n
							let expTableNode = this.$node.querySelector("lyte-expresstable"); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
							if (expTableNode) {
								expTableNode.contentObserver();//No I18n
							}
							if(this.getMethods("onScrollRecordsHaveBeenRendered")){
								// /**
								//  * @method onScrollRecordsHaveBeenRendered
								//  * @author anuja.manoharan
								//  * @version 1.0.0
								//  */
								this.executeMethod("onScrollRecordsHaveBeenRendered");//No I18n
							}
							break;
						}
					}
				}.bind(this),10);
			}
			else if(this.getMethods("onScrollFetchMoreRecords")){
				this.executeMethod("onScrollFetchMoreRecords", this.endIndex).then(function(res){//No I18n
					if(res && res.length){
						Lyte.arrayUtils(this.getData("content"), "push", res);//No I18n
						this.endIndex+=res.length;
						this.downContent = true;
						this.scrollTable();
						this.setData("showLoadingDown", false);//No I18n
					}
				}.bind(this))
			}
			else{
				this.setData("showLoadingDown", false);//No I18n
			}
		}
		// var scrollT =  this.scrollTop;
		// this.scrollTop = body.scrollTop;
		// if(this.upContent && body.scrollTop < scrollT){
		// 	this.upContent = false;
		// 	var end = this.startIndex;
		// 	if(end == 0){
		// 		return;
		// 	}
		// 	this.startIndex = end-this.maxRenderCount;
		// 	if(this.startIndex < 0){
		// 		this.startIndex = 0;
		// 	}
		// 	var more = this.getData("cxPropContent").slice(this.startIndex, end);//No I18n
		// 	if(more && more.length){
		// 		this.countDown = 0;
		// 		this.intervalDown = setInterval(function(){
		// 			for(var i=0; i<2; i++){
		// 				if(more[this.countDown]){
		// 					more[this.countDown].hideRecord = true;
		// 					Lyte.arrayUtils(this.getData("content"), "insertAt", 0, more[this.countDown++]);// No I18n
		// 				}
		// 				else{
		// 					clearInterval(this.intervalDown);
		// 					var rows = document.querySelectorAll(".cruxHideRow");//No I18n
		// 					for(var i=0; i<rows.length; i++){
		// 						rows[i].classList.remove("cruxHideRow");
		// 					}
		// 					this.setData("showLoadingUp", false);//No I18n
		// 				}
		// 			}
		// 		}.bind(this), 10);
		// 	}
		// 	// this.setData("showLoadingUp", false);// No I18n
		// }
	},
	methods : {
		onTableSearch: function(obj) {
			let contentObj = this.getData("cxPropContent");
			let headerObj = this.getData("cxPropHeader");
			let contentArr = [];
			let value = obj.newValue;
			let keysToSearch = headerObj.map(item => item.api_name).filter(Boolean);
			let addedRecord = new Set(); // Use Set for unique values
		
			const matchValue = (field, item) => {
				return item[field] && item[field].toString().includes(value);
			};
		
			for (let item of contentObj) {
				for (let field_name of keysToSearch) {
					// Check properties directly on the item
					if (matchValue(field_name, item)) {
						let recordKey = item.id || item.cxGroupName;
						if (!addedRecord.has(recordKey)) {
						contentArr.push(item);
						addedRecord.add(recordKey); 
						}
						
						
					}
		
					// Check for arrays in item properties
					for (let key in item) {
						if (Array.isArray(item[key])) {
							for (let subItem of item[key]) {
								if (matchValue(field_name, subItem)) {
									
									let recordKey = item.id || item.cxGroupName; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
									if (!addedRecord.has(recordKey)) { //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
										contentArr.push(item);
										addedRecord.add(recordKey);
									}
								}
							}
						} else if (typeof item[key] === 'object') {
							for (let subKey in item[key]) {
								if (matchValue(field_name, item[key][subKey])) {
									
									let recordKey = item.id || item.cxGroupName; //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
									if (!addedRecord.has(recordKey)) { //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
										contentArr.push(item);
										addedRecord.add(recordKey);
									}
								}
							}
						}
					}
				}
			}
			if(this.getMethods("onAfterSearch")){
				this.executeMethod("onAfterSearch",contentArr);
				this.setData("content", contentArr);
			}
		},
		onSearchFocus :  function(event , element){
			if(this.getMethods("onSearchFocus")){
				/**
	    		 * @method onSearchFocus
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchFocus",event , element);
			}
		},
		onSearchBlur :  function(event , element){
			if(this.getMethods("onSearchBlur")){
				/**
	    		 * @method onSearchBlur
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchBlur",event , element);
			}
		},
		onSearchClear : function(event , element){
			if(this.getMethods("onSearchClear")){
				/**
	    		 * @method onSearchBlur
	    		 * @author mahalakshmi.m
	    		 * @version 1.0.0
	    		 * @param { * } arg1
	    		 */
				return this.executeMethod("onSearchClear",event , element);
			}
		},
		onBeforeUserSelect :  function(event, selected_value,component, lyte_drop_item,value ){
			if(this.getMethods('onBeforeSelect')){ //NO I18n
				return this.executeMethod('onBeforeSelect', event, selected_value,component, lyte_drop_item,value); //NO I18n
			}
		},
		valueChange: function(row,field,contentIndex,comp,value){
			if(this.getMethods('onValueChange')){
				this.executeMethod('onValueChange',value,row,field,contentIndex,comp);
			}
		},
		previewClose: function(comp){
			if(this.getMethods('onPreviewClose')){
				return this.executeMethod("onPreviewClose",comp)
			}
		},
		cropSuccess: function(res,value){
			if(this.getMethods("onCropSuccess")){
	    		return this.executeMethod("onCropSuccess",res,value)
			}
		},
		expandImageView: function(comp){
			if(this.getMethods("onExpandImageView")){
	    		return this.executeMethod("onExpandImageView",comp)
			}
		},
		showLess: function(arg1){
			if(this.getMethods("onShowLess")){
	    		// /**
	    		//  * @method onShowLess
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  */
	    		return this.executeMethod("onShowLess",arg1);
	    	}
		},
		beforeShow: function(arg1,arg2){
			if(this.getMethods("onBeforeShow")){
	    		// /**
	    		//  * @method onBeforeShow
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		return this.executeMethod("onBeforeShow",arg1,arg2);
	    	}
		},
		beforeHide: function(arg1,arg2){
			if(this.getMethods("onBeforeHide")){
	    		// /**
	    		//  * @method onBeforeHide
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		return this.executeMethod("onBeforeHide",arg1,arg2);
	    	}
		},
		show: function(arg1,arg2){
			if(this.getMethods("onShow")){
	    		// /**
	    		//  * @method onShow
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		this.executeMethod("onShow",arg1,arg2);
	    	}
		},
		hide: function(arg1,arg2){
			if(this.getMethods("onHide")){
	    		// /**
	    		//  * @method onHide
	    		//  * @author anuja.manoharan
	    		//  * @version 1.0.0
	    		//  * @param { * } arg1
	    		//  * @param { * } arg2
	    		//  */
	    		this.executeMethod("onHide", arg1,arg2);
	    	}
		},
		fetchmodule: function(modId){
			if(this.getMethods('fetchModuleData')){
				// /**
				//  * @method fetchModuleData
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  */
				return this.executeMethod('fetchModuleData',modId);
			}
		},
		fetchrecord: function(modId, obj){
			if(this.getMethods('fetchRecords')){
				// /**
				//  * @method fetchRecords
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  * @param { * } obj
				//  */
				return this.executeMethod('fetchRecords',modId, obj);
			}
		},
		fetchTotalCountFn : function(modId, cvid){
			if(this.getMethods('fetchTotalCount')){
				return this.executeMethod('fetchTotalCount', modId, cvid , this.$node);
			}
		},
		resizeSelect : function(source ,table ,event){
			this.setData('beingResized',true);//No I18n
			if(this.getMethods("onResizeSelect")){
				// /**
				//  * @method onResizeSelect
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } source
				//  * @param { * } table
				//  * @param { * } event
				//  */
				this.executeMethod("onResizeSelect", source ,table ,event);//No I18n
			}
		},
		resizeEnd : function(source ,table ,event){
			this.beingResized = true;
			this.setData('beingResized',false);//No I18n
			setTimeout(function(){
				this.beingResized = false;
			}.bind(this), 200);
			$L(source).removeClass('resizeStart');
			if(this.getMethods("onResizeEnd")){
				// /**
				//  * @method onResizeEnd
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } source
				//  * @param { * } table
				//  * @param { * } event
				//  */
				this.executeMethod("onResizeEnd", source ,table ,event);//No I18n
			}
		},
		applyLookupFilter : function(elem,event,validation){
			if(this.getMethods('applyFilter')){
				// /**
				//  * @method applyFilter
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } elem
				//  * @param { * } event
				//  * @param { * } validation
				//  */
				this.executeMethod('applyFilter',elem,event,validation); //No I18n
			}
		},
		setLookupFilterConditionsCall : function(elem){
			if(this.getMethods('setLookupFilterConditions')){
				// /**
				//  * @method setLookupFilterConditions
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } elem
				//  */
				return this.executeMethod('setLookupFilterConditions',elem); //no i18n
			}
			return {};
		},
		navigate : function(from, row, rowIndex){
			var data = Array.from(this.getData("cxPropContent"));
			row.page = from === "next" ? (row.page+1) : row.page-1;//no i18n
			row.startIndex = from === "next" ? ((row.page - 1) * (row.per_page)) : ((row.startIndex) - (row.per_page));
				
			var content= data[rowIndex].content.slice(row.startIndex, row.startIndex * row.per_page);
			Lyte.objectUtils( data[rowIndex] , "add" , "cxPropContent" , content );

			
		},
		// afterRenderTable : function(){
		// 	$L.fastdom.mutate(function(){
		// 		if(this.$node.querySelector(".cxUpLoading")){
		// 			this.$node.querySelector(".cxUpLoading").style.top = this.$node.querySelector(".cxTableUpRow").getBoundingClientRect().top+42;
		// 			this.$node.querySelector(".cxUpLoading").style.width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetWidth;
		// 		}
		// 		if(this.$node.querySelector(".cxDownLoading")){
		// 			this.$node.querySelector(".cxDownLoading").style.top = this.$node.querySelectorAll("lyte-exptable-tr")[107].offsetTop;
		// 			// this.$node.querySelector(".cxDownLoading").style.top = this.$node.querySelector(".cxTableDownRow").getBoundingClientRect().top+42;
		// 			this.$node.querySelector(".cxDownLoading").style.width = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap").offsetWidth;
		// 		}
		// 	}.bind(this));
		// }
		tagsShowMore : function(){
			if(this.getMethods("onShowMoreTags")){
				// /**
				//  * @method onShowMoreTags
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  */
				this.executeMethod("onShowMoreTags");//No I18n
			}
		},
		sortClick : function(value, ev, menu, elem){
			this.sortClick(value, ev, menu, elem);
		},
		beforeSetFixTableColumnWidth : function(table){
			if(this.getMethods('onBeforeSetFixTableColumnWidth'))
			{
				// /**
				//  * @method onBeforeSetFixTableColumnWidth
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } table
				//  */
				this.executeMethod('onBeforeSetFixTableColumnWidth', table);//No I18n
			}
		},
		afterSetFixTableColumnWidth : function(table){
			if(this.getMethods('onAfterSetFixTableColumnWidth'))
			{
				// /**
				//  * @method onAfterSetFixTableColumnWidth
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } table
				//  */
				this.executeMethod('onAfterSetFixTableColumnWidth', table);//No I18n
			}
		},
		onLookupHoverFetchBcDataPopup : function(modId, recId){
			if(this.getMethods("onLookupHoverFetchBcData")){
				// /**
				//  * @method onLookupHoverFetchBcData
				//  * @author anuja.manoharan
				//  * @version 1.0.0
				//  * @param { * } modId
				//  * @param { * } recId
				//  */
				return this.executeMethod("onLookupHoverFetchBcData",modId, recId);
			}
			},
		afterAriaAdd : function(){
			// console.log('After Aria Add Method Executed...');
		}
	},
	clearValues : function(){
		clearInterval(this.intervalUp);
		clearTimeout(this.intervalDown);
		this.setData({showLoadingUp : false, showLoadingDown : false});
	},
	performSort : function(field){
		if(field.cxPropPreventSort){
			return;
		}
		var options = ["asc", "desc"];//No I18n
		if(field.cxPropSortOptions){
			options = field.cxPropSortOptions;
		}
		else if(this.getMethods("onSort") && this.getData("cxPropSortedColumn") && (this.getData("cxPropSortedColumn") == field.api_name || this.getData("cxPropSortedColumn") == field.id)){
			if(this.getData("cxPropSortedOrder") == "asc"){
				options = ["desc", "unsort"];//No I18n
			}
			else{
				options = ["asc", "unsort"];//No I18n
			}
		}
		var labels = {asc : "crm.column.sort.asc", desc : "crm.column.sort.desc", unsort: "crm.column.unsort"}//No I18n
		for(var i=0; i<options.length; i++){
			options[i] = {label : _cruxUtils.getI18n(labels[options[i]]), value : options[i]};
		}
		this.setData("options", options);//No I18n
		this.setData("beingSorted", field.api_name)//No I18n
		// document.getElementById("cxTableSortMenu").setData({ltPropShow : true});
	},
	sortClick : function(value, ev, menu, elem){
		var self = this;
		self.setData("cxPropSortedColumn", self.getData("beingSorted"));//No I18n
		self.setData("cxPropSortedOrder", value);//No I18n
		if(this.getMethods("onSort")){
			this.executeMethod("onSort", this.getData("cxPropSortedColumn"), value, ev, menu, elem);//No I18n
		}
		else{
			var api_name = this.getData("beingSorted");//No I18n
			var content = this.getData("cxPropContent").slice(0);//No I18n
			content.sort(function(row1, row2){
				if(row1[api_name] == undefined || row1[api_name] == ""){
					return (value == "asc") ? 1: -1;
				}
				if(row2[api_name]== undefined || row2[api_name] == ""){
					return (value == "desc") ? 1 : -1;
				}
				return row1[api_name].localeCompare(row2[api_name]);
			});
			this.setData("cxPropContent", content);//No I18n
		}
	},
	triggerSortClick : function(field, ev){
		var sort = "asc";
		if(this.getData("cxPropSortedOrder") && (this.getData("cxPropSortedColumn") == field.api_name || this.getData("cxPropSortedColumn") == field.id)){
			sort = this.getData("cxPropSortedOrder") == "asc" ? "desc" : "asc";
		}
		this.setData("beingSorted", field.api_name);
		this.sortClick(sort, ev)
		//this.sortClick(value, ev, menu, elem);
	},
	observeFilter : function(){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
		if(!this.data.cxPropExpress && this.data.cxPropShowFilter){
			var self = this
			$L.fastdom.measure(function(){
				var height = self.data.cxPropShowFilter ? self.$node.querySelector(".cxTableLookupFilterComponent").offsetHeight : 0;
				var prevHeight = self.$node.querySelector("lyte-tr").offsetHeight;
				$L.fastdom.mutate(function(){
					self.$node.querySelector(".lyteScrollContainer.lyteScrollContainerY").style.top = self.data.cxPropShowFilter ? (prevHeight+height+"px") : (prevHeight+"px");
				})
			})			
		}
	}.observes("cxPropShowFilter").on("didConnect"),
	observeFields1 : function(){
		if(this.data.cxPropShowSortIconOnHover){
			var ele = this.$node.querySelectorAll(".cxTableSortIcon") , len = ele.length;
			for(var i=0; i<len; i++){
				ele[i].classList.add("cxTableSortIconHide");
			}
		}
	}.observes("cxPropHeader").on("didConnect"),
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAria();
		}
	}.observes("cxPropContent", 'cxPropAria').on('didConnect')
}, {
	mixins: ['crux-element-validation', 'crux-aria-table-mixin'],
	alias: 'crm-custom-table'
});
//This helper is exposed to crm developers, do not change the argument order or use this reference inside helper
Lyte.Component.registerHelper("getCruxTableValue", function (field, row, module, showToolTip, toolTipProps, lookupProperties, phoneTooltip, numProps, textareaProps, twitterUrl, cxPhoneProperties ,  cxPropRecordId,toggleMasking , isMaskingFeatureEnabled,profileId) { //eslint-disable-line block-spacing
	var lyteWidgetAttribute = _cruxUtils.isLyteWidgetBuild ? 'lyte-widget' : '';
	var value =  Lyte.Component.registeredHelpers.getCruxTableValue1(row, field);
	var tooltipData='';
	if(value!=='undefined' && field.cxTypeMapping==='boolean' && field.cxDisplayText){
		return value;
	}
	// if(!value && field.api_name.indexOf(".") > -1){
	// 	value = row[field.api_name.split(".")[0]];
	// 	if(value){
	// 		value = value[[field.api_name.split(".")[1]]];
	// 	}
	// }
	if((!value || value.length == 0) && field.cxTypeMapping != "number"){
		return "";
	}
	let fldMaskPermission = true, orignalVal = value;
	if(isMaskingFeatureEnabled && !toggleMasking &&  ( value || (field.cxTypeMapping==='number' && typeof value!=='undefined' && value!==null)) && field.mask_details){ // eslint-disable-next-line eqeqeq
		var phone_masking=field.cxTypeMapping==='phone' || field.data_type==='phone';
		value=Lyte.Component.registeredHelpers.cruxMaskValue(value,field.mask_details,true,phone_masking);
		fldMaskPermission = Lyte.Component.registeredHelpers.checkForMaskPermission(field.mask_details , profileId);
	}else if(field.cxPropMaskingProperties && Object.keys(field.cxPropMaskingProperties).length>0 && typeof value!=='undefined'){
		value = Lyte.Component.registeredHelpers.cruxMaskValue(value, field.cxPropMaskingProperties);
		fldMaskPermission = false;
	}
	if(showToolTip && toolTipProps){
		if(toolTipProps.config){
			tooltipData = `lt-prop-tooltip-config='${JSON.stringify(toolTipProps.config)}'`;
		}
		if(toolTipProps.class){
			tooltipData += `lt-prop-tooltip-class=${toolTipProps.class}`
		}
	}
	// let getDataZcqaAttr = (field , value)=>{ //eslint-disable-line no-unused-vars,@zoho/zohocrm/no-unused-vars
	// 	let labelSelector = this.getData && this.getData('cxPropLabelSelector') ? this.getData('cxPropLabelSelector') : 'field_label';
	// 	let tableId = this.getData && this.getData('cxPropTableId') ? this.getData('cxPropTableId')+'_' : '';
	// 	return `data-zcqa="${tableId}${field[labelSelector]}_${value}"`;
	// };
	switch(field.cxTypeMapping){
		case "phone":
			if(field.cxPropMaskingProperties){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			var cxPropCallAllowed = true;
			if(row.Data_Processing_Basis_Details){
				cxPropCallAllowed = row.Data_Processing_Basis_Details.Contact_Through_Phone;
			}
			var res = "<div class='phoneRtl";
			var toBeContinued = 0;
			if(cxPropCallAllowed == false || (field.private && field.private.restricted)){
				res+="' style='min-width : 100%;'>";
			}
			else if(typeof Crm !== "undefined" && Crm.userDetails && Crm.userDetails.TELEPHONY_ENABLED){
				res+=" cruxPreventClick cxPhoneViewOutbound'>";
				toBeContinued = 1;
			}
			else if(typeof Crm !== "undefined" && Crm.userDetails && Crm.userDetails.ZPBENABLED){
				res+=" cxPhoneViewZPBEnabled cruxPreventClick'>";
				toBeContinued = 2;
			}
			else{
				res+=" cruxPreventClick' onmouseover='Lyte.registeredMixins[\"crux-aria-table-mixin\"].phoneMouseOver(this);' onmouseout='Lyte.registeredMixins[\"crux-aria-table-mixin\"].phoneMouseOut(this);' style='min-width:100%;'><zpb-phone phoneno='"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"' callbackparam='{\"module\" : \""+module+"\", \"searchid\" : \""+(cxPropRecordId ? cxPropRecordId : row.id)+"\"}'>";
				toBeContinued = 3;
			}
			var entityName = (typeof moduleRecordMapping != "undefined") && moduleRecordMapping[module] && moduleRecordMapping[module].display_field ? row[moduleRecordMapping[module].display_field.api_name] : "";
			if(showToolTip){
				res += "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+ " lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value) + "'></lyte-text>";
			}
			else{
				res+=$ESAPI.encoder().encodeForHTML(value);
			}
			if(toBeContinued == 1){
				res+="<span class='cxCalliconOuter' onclick='Lyte.registeredMixins[\"crux-element-validation\"].phoneClick(\""+$ESAPI.encoder().encodeForJavaScript(value)+"\", \""+(cxPropRecordId ? cxPropRecordId : row.id)+"\", \""+module+"\",\""+$ESAPI.encoder().encodeForJavaScript(entityName)+"\");'><i class='cxCallIcon cruxPreventClick'></i><span id='calllabel1' class='cruxPreventClick cxPhoneViewCallLabel'>"+_cruxUtils.getI18n("Call")+"</span></span>";
			}
			else if(toBeContinued == 2){
				var callbackparamfn = "asyncFn(crmCallsNew.getClick2CallPromise,'" + (cxPropRecordId ? cxPropRecordId : row.id ) + "','" + module + "','" + entityName + "','','"+$ESAPI.encoder().encodeForJavaScript(value)+"','"+field.column_name+"','"+field.id+"')";	//no i18N
				res+="<span class='cxPhoneViewZPBEnabledIconWrap'><zpb-phone number='"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"' module='"+module+"' recordid='"+(cxPropRecordId ? cxPropRecordId : row.id)+"' callbackparamfn="+$ESAPI.encoder().encodeForHTMLAttribute(callbackparamfn)+"></zpb-phone></span>";
			}
			else if(toBeContinued == 3){
				res += `</zpb-phone><a style='visibility : hidden;' class='pH2 phoneRtl' title='${phoneTooltip}' href='${cxPhoneProperties && cxPhoneProperties.mode === 'tel' ? "tel:" + $ESAPI.encoder().encodeForHTMLAttribute(value) : "skype:" + $ESAPI.encoder().encodeForHTMLAttribute(value) + '?call'}' onclick='sE();'></a>`;
			}
			return res+="</div>";
		case "allday":
		case "date":
		case "date-time":
			var isAllDayEventFld = row.All_day && (module === 'Events' || module === 'Meetings') && ['Start_DateTime','End_DateTime'].indexOf(field.api_name) !== -1 ? true : false;
			var formatDate = this.getData('cxPropDateProperties') ? 
								this.getData('cxPropDateProperties')[field.api_name] && this.getData('cxPropDateProperties')[field.api_name].hasOwnProperty('dateInUserPattern') ? 
								!this.getData('cxPropDateProperties')[field.api_name].dateInUserPattern: 
								this.getData('cxPropDateProperties').hasOwnProperty('dateInUserPattern') ? !this.getData('cxPropDateProperties').dateInUserPattern : false 
								: false;
			var formatDatetime = this.getData('cxPropDatetimeProperties') ? 
								this.getData('cxPropDatetimeProperties')[field.api_name] && this.getData('cxPropDatetimeProperties')[field.api_name].hasOwnProperty('datetimeInUserPattern') ? 
								!this.getData('cxPropDatetimeProperties')[field.api_name].datetimeInUserPattern: 
								this.getData('cxPropDatetimeProperties').hasOwnProperty('datetimeInUserPattern') ? !this.getData('cxPropDatetimeProperties').datetimeInUserPattern : false 
								: false;
		
			if((toggleMasking || !field.mask_details ) && (formatDate || formatDatetime || (isAllDayEventFld && value.indexOf("T") !== -1))){
				if(field.cxTypeMapping == "date" && formatDate){
					return "<crux-date-component " + lyteWidgetAttribute + " cx-prop-value='"+value+"' cx-prop-date-in-user-pattern=false></crux-date-component>";
				}
				else if(field.cxTypeMapping == "date-time" && formatDatetime){
					return "<crux-date-time-component " + lyteWidgetAttribute + " cx-prop-value='"+value+"' cx-prop-datetime-in-user-pattern=false></crux-date-time-component>";
				}
			}
			if((isAllDayEventFld || field.cxTypeMapping == "date") && value.indexOf(":") > -1){
				value = value.substring(0, value.split(":")[0].lastIndexOf(" "));//No I18n
			}
			if(showToolTip){
					return "<lyte-text " + lyteWidgetAttribute + " class='newDTField' "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTMLAttribute(value) +"'></lyte-text>";//No I18n
			}else{
					return "<span>"+$ESAPI.encoder().encodeForHTMLAttribute(value)+"</span>";
			}
		case "boolean":
			return "<span class="+(value == true ? 'criteria-yes' : '')+"></span>";
		case "email":
		if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
			return $ESAPI.encoder().encodeForHTML(value);
		}
		if(showToolTip){   
				return "<a class='cxEmailViewLink cruxPreventClick emailUnblock' href='mailto:"+$ESAPI.encoder().encodeForHTMLAttribute(orignalVal)+"'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
		}else{
				return "<a class='cxEmailViewLink cruxPreventClick emailUnblock' href='mailto:"+$ESAPI.encoder().encodeForHTMLAttribute(orignalVal)+"'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
		} 
		case "layout":
			if(showToolTip){
				return "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value.display_label) +"'></lyte-text>";//No I18n
			}else{
				return $ESAPI.encoder().encodeForHTML(value.display_label);
			}
		case "number":
				var currencyTypeField = false;
				if(field.data_type == "currency" || (field.data_type == "formula" && field.formula.return_type == "currency")){
					currencyTypeField = true;
				}
				var dataType = field.data_type;
				if(dataType == "formula" || (field.formula && field.formula.return_type)){
					if(field.formula.return_type == "currency"){
						dataType = "currency";//No i18n
					}
					else{
						dataType = "number";//No I18n
					}
				}
				if(toggleMasking || !field.mask_details || !value){
					//check for no currecy type handling for masked data
					value = (value || value===0) ? this.component.getNumberValueForView(value.toString(), dataType, numProps && numProps.isoCode ? numProps.isoCode : row.Currency, field.ui_type, numProps && numProps.currencyDetails ? numProps.currencyDetails :Crm.userDetails.CURRENCY_DETAILS,field.hasOwnProperty('decimal_place')?field.decimal_place:numProps && numProps.defaultRoundOff ? numProps.defaultRoundOff: Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2, numProps && numProps.currencyCode ?numProps.currencyCode : Crm.userDetails.BASE_CURRENCY,numProps && numProps.exchangeRate ?numProps.exchangeRate:undefined,numProps && numProps.exchangeRateFinance ?numProps.exchangeRateFinance:undefined,row.$home_converted_currency ? row.$home_converted_currency[field.api_name]:undefined,numProps && numProps.hasOwnProperty('displayCurrency') ? numProps.displayCurrency : true,row.$formatted_currency ? row.$formatted_currency[field.api_name]:undefined,field.separator,numProps && numProps.defaultOrgCurrency? numProps.defaultOrgCurrency: Crm.userDetails.defaultOrgCurrency,field.currency ? field.currency.rounding_option:undefined,field.currency?field.currency.precision:undefined) : '';//No I18n
				}
			return `<div class="${(currencyTypeField ? 'numberDivCurrencyView' : 'numberDivNumberView')}">${showToolTip ? `<lyte-text  ${lyteWidgetAttribute} lt-prop-value='${value}'></lyte-text>`:value}</div>`;
		case "text-area":
			if(showToolTip){
				return "<div class='pR'><pre style='word-wrap : break-word; white-space : pre-wrap; min-width : 200px;'>"+$ESAPI.encoder().encodeForHTML(value)+"</pre>" + "<span id='showMoreDesc' class='showMoreAddedEvents'></span></div>";
			}else{
				return "<pre style='word-wrap : break-word; white-space : pre-wrap; min-width : 200px; max-width : 500px;'>"+$ESAPI.encoder().encodeForHTML(value)+"</pre>";
			}
		case "twitter":
			if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			if(showToolTip){
				return "<a data-zcqa='dummy' class='link cruxPreventClick' href='"+twitterUrl+"/"+$ESAPI.encoder().encodeForURL(orignalVal)+"' target='_blank'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
			}else{
				return "<a data-zcqa='dummy' class='link cruxPreventClick' href='"+twitterUrl+"/"+$ESAPI.encoder().encodeForURL(orignalVal)+"' target='_blank'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
			}
		case "website":
			var href = "";
			var http="http"; //No i18N
			var https="https"; //No i18N
			if(orignalVal && orignalVal!=="" && !(orignalVal.indexOf(http)===0 || orignalVal.indexOf(https)===0)){
				href = http+"://"+orignalVal;//No I18n
			}
			else if(orignalVal){
				href = orignalVal;
			}
			if((field.cxPropMaskingProperties || field.mask_details) && !fldMaskPermission){
				return $ESAPI.encoder().encodeForHTML(value);
			}
			if(showToolTip){
				return "<a class='link cruxPreventClick' href='"+$ESAPI.encoder().encodeForHTMLAttribute(href)+"' target='_blank'> <lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='"+$ESAPI.encoder().encodeForHTML(value)+"'></lyte-text></a>";
			}else{
				return "<a class='link cruxPreventClick' href='"+$ESAPI.encoder().encodeForHTMLAttribute(href)+"' target='_blank'>"+$ESAPI.encoder().encodeForHTML(value)+"</a>";
			}
			case "lookup":
			case "multi_module_lookup":
			var toPass = ["routeName","dynamicParams", "queryParams", "transitionData", "target", "iconClass","showBc","hideIconForView","module","cxPropShowImage","cxPropShowLookupPopupFields"];
			var props = {field : field, row : row};
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
			let currentLookupProp = lookupProperties && lookupProperties[field.api_name] ? lookupProperties[field.api_name] : {};
			if(field.cxTypeMapping === "multi_module_lookup" && Array.isArray(currentLookupProp)){ //eslint-disable-line valid-typeof
				currentLookupProp = currentLookupProp.find(function(item){
					return item.api_name === row[field.api_name].module.api_name;
				});
			}
			toPass.forEach(function(item){
				props[item] = currentLookupProp.hasOwnProperty(item) ? currentLookupProp[item] : lookupProperties[item] ? lookupProperties[item] : "";
			});
			if(props.iconClass){
				props.iconClass = props.iconClass ;
				if(props.iconClass.indexOf("{{")===-1){
					props.iconClass=props.iconClass;
				}else{
					props.iconClass=row.cxPropIconClass?row.cxPropIconClass:"";
				}
			}
			if(props.dynamicParams){
				props.dynamicParams = JSON.parse(props.dynamicParams);
				props.dynamicParams = props.dynamicParams.map(function(item){
					if(item.indexOf("{{") == -1){
						return item;
					}
					var keys = item.split("{{")[1].split("}}")[0].split(".");
					
					var ret = props[keys[0]];
					/* eslint-disable @zoho/zstandard/proper-usage-of-loop */
					var keys_len=keys.length ;
					for(var i=1; i<keys_len; i++){
						var key = keys[i];
						if(key.indexOf("[") !== -1){
							if(key.indexOf("]") !== -1){
									key=keys[i];
							}
							else{
								 key = key.split("[")[1];
								var _ret = props[key];
								var key_length=keys.length;
								for(i=i+1; i<key_length; i++){
									key = keys[i];
									if(key.indexOf("]") !== -1){
										key = key.split("]")[0];
										_ret = _ret[key];
										break;
									}
								}
								ret = ret[_ret];
							}
						}
						else if(ret &&ret[key]){
							// if(ret &&ret[key] ){
								ret = ret[key];	
							// }
						 				        
						}
					}
					/* eslint-enable @zoho/zstandard/proper-usage-of-loop */
					if(props.cxPropIdModuleMap && props.cxPropIdModuleMap[ret] ){
						return props.cxPropIdModuleMap[ret];
					}
					return ret;
				})
				props.dynamicParams = JSON.stringify(props.dynamicParams)
			}
			else if(field.cxTypeMapping === "multi_module_lookup"){
				props.dynamicParams = [row[field.api_name].module.api_name, row[field.api_name].id];
				props.dynamicParams = JSON.stringify(props.dynamicParams);
				props.module = row[field.api_name].module.api_name;
			}
			if(props.queryParams){
				props.queryParams = JSON.parse(props.queryParams);
				for(var key in props.queryParams){
					if(props.queryParams[key].indexOf("{{") != -1){
						var _val = props.queryParams[key].split("{{")[1].split("}}")[0].split(".");
						var ret = props[_val[0]];
						for(var i=1; i<_val.length; i++){
							ret = ret[_val[i]];
						}
						props.queryParams[key] = ret;
					}
				}
				props.queryParams = JSON.stringify(props.queryParams);
			}
			var valObj ;
			if(typeof value === "string"){
				value = {name : value};
			}
			var label_selector = 'name';
			if (typeof value !== "string") {
				label_selector = value[label_selector] ? label_selector : 'display_label';
				valObj = Object.assign({}, value);
				valObj.name = $ESAPI.encoder().encodeForHTML(value.name);
			}
			var lookupVal = valObj ? valObj[label_selector] : value;     //temp fix for
			if(field.cxTypeMapping === "multi_module_lookup"){
				lookupVal = JSON.stringify(valObj);
			}
			var cxPropField = field instanceof Record ? JSON.stringify(store.peekRecord(field.$.model._name , field.id).$.toJSON()) : JSON.stringify(field);
			return "<crux-lookup-component " + lyteWidgetAttribute + " cx-prop-show-lookup-popup-fields='" + (props.cxPropShowLookupPopupFields !== "" ? props.cxPropShowLookupPopupFields : false) + "' cx-prop-field='" + cxPropField + "' cx-prop-route-name='" + lookupProperties.routeName + "' cx-prop-value='" + lookupVal + "' lookup-id='" + (valObj ? valObj.id : "") + "' cx-prop-zcqa='" + (lookupProperties.zcqa ? lookupProperties.zcqa : valObj ? valObj.name : value) + "' cx-prop-dynamic-params='" + props.dynamicParams + "' cx-prop-query-params='" + props.queryParams + "' cx-prop-id='" + (lookupProperties.id ? lookupProperties.id : row.id) + "' cx-prop-transition-data='" + props.transitionData + "' cx-prop-target='" + props.target + "' cx-prop-icon-class='" + props.iconClass + "'   cx-prop-show-bc='" + (props.showBc !== "" ? props.showBc : false) + "' cx-prop-module='" + (props.dynamicParams !== "" ? JSON.parse(props.dynamicParams)[0] : "") + "' cx-prop-hide-icon-for-view='" + (props.hideIconForView !== "" ? props.hideIconForView : false) + "'></crux-lookup-component>";
		case "picklist":
			if (value && typeof value != "string") {
				value = value.join("; ");
			}
			return showToolTip ? `<lyte-text ${lyteWidgetAttribute} ${tooltipData} lt-prop-value="${$ESAPI.encoder().encodeForHTML(value)}"></lyte-text>` : $ESAPI.encoder().encodeForHTML(value);
		case "role":
			return showToolTip ? `<lyte-text ${lyteWidgetAttribute} ${tooltipData} lt-prop-value="${$ESAPI.encoder().encodeForHTML(value.name)}"></lyte-text>`:value.name;
		default:
			if (showToolTip) {
				return "<lyte-text " + lyteWidgetAttribute + " "+tooltipData+" lt-prop-value='" + $ESAPI.encoder().encodeForHTML(value && typeof value === 'object' && value.name ? value.name.toString() : value.toString()) + "'></lyte-text>";//No i18n
			} else {
				return $ESAPI.encoder().encodeForHTML(value.toString());
			}
	}
});

Lyte.Component.registerHelper("cruxGetDateValue", function(row, field){//No I18n
	if(row.All_day || field.cxTypeMapping == "date" && row[field.api_name].indexOf(":") > -1){
		return row[field.api_name].substring(0, row[field.api_name].split(":")[0].lastIndexOf(" "));
	}
	return row[field.api_name];
});

Lyte.Component.registerHelper("cruxGetWebsiteHref", function(value){//No I18n
	var http = "http";//No I18n
	var https = "https";//No I18n
	if(value && value != "" && !(value.indexOf(http) == 0 || value.indexOf(https) == 0)){
		return http+"://"+value;
	}
	else if(value){
		return value;
	}
	return "";
});
Lyte.Component.registerHelper("isgroupRendered", function(rec,a){//No I18n
	if(this.component.data.renderedGroups.indexOf(rec.id)  == -1){
		this.component.data.renderedGroups.push(rec.id);
		return true
	}else{
		return false
	}
})
//third argument is dummy, it is used to observe value change for edit mode
//eslint-disable-next-line no-unused-vars
Lyte.Component.registerHelper("getCruxTableValue1", function(row, field ,obs){ //eslint-disable-line @zoho/zohocrm/no-unused-vars
	var value = row[field.api_name];
	if(!value &&field.api_name && field.api_name.indexOf(".") > -1){
		value = row[field.api_name.split(".")[0]];
		if(value){
			value = value[[field.api_name.split(".")[1]]];
		}
	}
	return value;
})

Lyte.Component.registerHelper("getTableLookupProperty", function(lookupProps, row, field, name){
		_cruxUtils.addMurhyInfo("crux-table-component.js", "Feb Default Changes");
	//showbc must have default value as true
	var prop = lookupProps[field.api_name] 
		&& lookupProps[field.api_name].hasOwnProperty(name) 
		? lookupProps[field.api_name][name] 
		: lookupProps.hasOwnProperty(name) ? lookupProps[name] : name === "showBc" ? true : undefined;
	if(prop){
		let props =  Lyte.deepCopyObject(lookupProps);
		props.row = row;
		props.field = field;
		switch (name) {
			case "dynamicParams":
				prop = JSON.parse(prop);
				prop = prop.map(function (item) {
					if (item.indexOf("{{") == -1) {
						return item;
					}
					var key = item.split("{{")[1].split("}}")[0].split(".");
					var ret = props[key[0]];
					for (var i = 1; i < key.length; i++) {
						ret = ret[key[i]];
					}
					return ret;
				})
				return JSON.stringify(prop);
			case "queryParams":
				prop = JSON.parse(prop);
				for (var key in prop) {
					if (prop[key].indexOf("{{") != -1) {
						var _val = prop[key].split("{{")[1].split("}}")[0].split(".");
						var ret = props[_val[0]];
						for (var i = 1; i < _val.length; i++) {
							ret = ret[_val[i]];
						}
						prop[key] = ret;
					}
				}
				return JSON.stringify(prop);
			default:
				return prop;
		}
	}
});
//class="{{if(cruxContains(cxPropSelectedRows, row.id, cxPropSelectedRows.length), cxPropSelectedRowClass)}} {{row.cxPropClass}} {{if(cruxAnd(ifEquals(cxPropAjaxEditId,row.id),cxPropAjaxEditId),if(cxPropFreezeRow,'cxSubformRowEditMode cxSubformRowFreeze','cxSubformRowEditMode'))}} {{cxPropTableProperties.tbody_tr_class}}">
Lyte.Component.registerHelper("getCruxTableRowClass", function (currentRow, selectedRows, id, selectedRowsLength, cxPropSelectedRowClass, currentRowcxPropClass, cxPropAjaxEditId, cxPropFreezeRow, tbody_tr_class) {
	let returnClass = `${currentRowcxPropClass || ''} ${tbody_tr_class || ''}`.trim();
	if (selectedRows && id) {
		returnClass += selectedRows.indexOf(id) > -1 ? ` ${cxPropSelectedRowClass}` : '';
	}
	if (cxPropAjaxEditId && id && cxPropAjaxEditId === id) {
		returnClass += cxPropFreezeRow ? ' cxSubformRowEditMode cxSubformRowFreeze' : ' cxSubformRowEditMode';//No I18n
	}
	return returnClass;
});
//data-zcqa="{{getCruxTableBodyTrZcqa(cxPropZcqaWithId,row.id,cxPropRowZcqa)}}"
Lyte.Component.registerHelper("getCruxTableBodyTrZcqa", function (cxPropZcqaWithId, id, cxPropRowZcqa) {
	let finalZcqa = cxPropRowZcqa || '';
	if (cxPropZcqaWithId) {
		finalZcqa = `${cxPropZcqaWithId}${id}`;
	}
	return finalZcqa;
});
//data-zcqa="{{if(cxPropTableId, concat('value_', cxPropTableId, '_', if(cxPropCellZcqaWithRowNo,concat(field.field_label,'_',contentIndex+1),field.field_label)), concat('value_', if(cxPropCellZcqaWithRowNo,concat(field.field_label,'_',contentIndex+1),field.field_label)))}}">
Lyte.Component.registerHelper("getCruxTableBodyTdZcqa", function (field, cxPropTableId, cxPropCellZcqaWithRowNo, fieldLabel, contentIndex) {
	return `value_${cxPropTableId ? `${cxPropTableId}_` : ''}${(cxPropCellZcqaWithRowNo ? `${fieldLabel}_${contentIndex + 1}` : fieldLabel)}`;
});
Lyte.Component.registerHelper("isCxTableComponentNeeded", function (fieldData, fieldDataLength, enable_colour_code, lineClamp, field, row, cxPropNumberProperties, cxPropClipMode, cxTypeMapping) {
	return (
		(cxTypeMapping === "tag" && row[field.api_name].length !== 0) ||
		(cxTypeMapping === "user" && row[field.api_name]) ||
		(cxTypeMapping === "picklist" && enable_colour_code) ||
		(cxTypeMapping === "number" && !cxPropNumberProperties) ||
		(cxTypeMapping === 'text-area' && (cxPropClipMode || lineClamp)) ||
		(cxTypeMapping === 'image')
	);
});
//class="{{field.cxPropClass}} {{if(ifEquals(field.yieldName,'ajaxActions'),'cxTableStickycolumn')}}" --->if(cxPropAllRowsEditable || cxPropAjaxEditId !==undefined && cxPropAjaxEditId===row.id)
//class="{{cxPropTableProperties.td_class}} {{cxPropColumnCellClass}} {{field.cxPropClass}} {{if(ifEquals(field.cxTypeMapping,'multi-picklist'),'wspaceNor ','')}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}" --> non-yield
//class="{{cxPropTableProperties.td_class}} {{field.cxPropClass}} {{cxPropColumnCellClass}} {{if(ifEquals(field.id,intPinnedColumn),'cxTableLastPinnedColumn')}}" -->yield
Lyte.Component.registerHelper("getCruxTableBodyTdClass", function (cxPropColumnCellClass, cxPropClass, cxTypeMapping, tdClass, intPinnedColumn, fieldId, fieldYield, yieldName,headerPropClass,cellClass) {
	let finalClass = `${tdClass || ''} ${cxPropClass || ''} ${headerPropClass || ''} ${cxPropColumnCellClass || ''} ${cellClass || ''}  ${!(fieldYield || yieldName) && cxTypeMapping === 'multi-picklist' ? 'wspaceNor mW100' : ''} ${fieldId === intPinnedColumn ? 'cxTableLastPinnedColumn' : ''}`;
	return finalClass && finalClass.trim();
});
Lyte.Component.registerHelper("getInVisibleStatusTdValue", function (row, field, numProps) {
	let returnValue = field.api_name ? row[field.api_name] : undefined;
	if (returnValue !== undefined && returnValue !==null ) {
		if (field.cxTypeMapping === 'user') { //eslint-disable-line @zoho/zstandard/no-ifel
			return returnValue.name;
		} else if (field.cxTypeMapping === 'number') {
			if (this.component.getNumberValueForView && returnValue && returnValue !== "null" && returnValue !== "undefined") {
				let dataType = field.data_type;
				if (dataType === "formula" || (field.formula && field.formula.return_type) || (field.dataparam && field.dataparam.return_type) || (field.rollup_summary && field.rollup_summary.return_type)) {
					if ((field.formula && field.formula.return_type === "currency") || (field.dataparam && field.dataparam.return_type === "currency") || (field.rollup_summary && field.rollup_summary.return_type === "currency")) {
						dataType = "currency";//No i18n
					} else {
						dataType = "number";//No I18n
					}
				}
				returnValue = this.component.getNumberValueForView(returnValue.toString(),
					dataType,
					numProps && numProps.isoCode ? numProps.isoCode : row.Currency,
					field.ui_type,
					numProps && numProps.currencyDetails ? numProps.currencyDetails : Crm.userDetails.CURRENCY_DETAILS,
					field.hasOwnProperty('decimal_place') ? field.decimal_place : numProps && numProps.defaultRoundOff ? numProps.defaultRoundOff : Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2,
					numProps && numProps.currencyCode ? numProps.currencyCode : Crm.userDetails.BASE_CURRENCY,
					numProps && numProps.exchangeRate ? numProps.exchangeRate : undefined,
					numProps && numProps.exchangeRateFinance ? numProps.exchangeRateFinance : undefined,
					row.$home_converted_currency ? row.$home_converted_currency[field.api_name] : undefined,
					numProps && numProps.hasOwnProperty('displayCurrency') ? numProps.displayCurrency : true,
					row.$formatted_currency ? row.$formatted_currency[field.api_name] : undefined,
					field.separator, numProps && numProps.defaultOrgCurrency ? numProps.defaultOrgCurrency : Crm.userDetails.defaultOrgCurrency,
					field.currency ? field.currency.rounding_option : undefined,
					field.currency ? field.currency.precision : undefined);
			}
			return returnValue;
		} else if (field.cxTypeMapping === "boolean") {
			return "";
		}else if(field.cxTypeMapping === "lookup"){
			return returnValue.name;
		}
		return returnValue;
	}
});
Lyte.Component.registerHelper("getInVisibleTdCssAttrValue", function (attributeName, row, field) {
	let finalAttributeValue = "";
	switch (field.cxTypeMapping) {
		case 'boolean': {
			if (attributeName === 'class' && row[field.api_name]) {
				finalAttributeValue = "criteria-yes";
			}
			break;
		}
		case 'email':
		case 'twitter': {
			if (attributeName === 'class' && row[field.api_name]) {
				finalAttributeValue = "cxInvisibleTdLinkSpan";
			}
			break;
		}
		case 'picklist': {
			if (field.enable_colour_code) {
				let attributeVal = this.component.getColouredPicklistStyleDetails(field,
					Lyte.Component.registeredHelpers.getCruxTableValue1(row, field),
					'-None-');
				if (attributeName === 'class' && attributeVal.pkColorEnabledClass) {
					finalAttributeValue = attributeVal.pkColorEnabledClass;
				} else if (attributeName === 'style' && attributeVal.propColorStyleObj) {
					finalAttributeValue = attributeVal.propColorStyleObj;
				}
			}
			break;
		}
	}
	return finalAttributeValue;
});
Lyte.Component.registerHelper("isFillerTdContentNeeded", function (cxPropCellIntersection, isCellVisible) {
	let showFillerContent = false;
	if (cxPropCellIntersection) {
		showFillerContent = isCellVisible ? false : true;
	}
	return showFillerContent;
});

Lyte.Component.registerHelper("getCruxTableFieldData", function(prop,field,rowId,cellProp) {
	switch(prop){
		case 'disabled':
			return cellProp && cellProp[rowId] && cellProp[rowId][field.api_name] && cellProp[rowId][field.api_name].hasOwnProperty('read_only') ?  cellProp[rowId][field.api_name]['read_only'] : (field.disabled || field.read_only);

	}
});
Lyte.Component.registerHelper("getCxTableRenderingCase", function (cxPropEditMode,
	cxTypeMapping,
	fieldData,
	fieldDataLength,
	enable_colour_code,
	lineClamp,
	field,
	row,
	cxPropNumberProperties,
	cxPropClipMode,
	fieldYield,
	yieldName,
	cxPropAllRowsEditable,
	cxPropAjaxEditId,
	rowId) {

	//<%if(cxPropAllRowsEditable || cxPropAjaxEditId !==undefined && cxPropAjaxEditId===row.id){%>
	if (cxPropAllRowsEditable || cxPropAjaxEditId !== undefined && cxPropAjaxEditId === rowId) {
		return 'editableRow';
	}
	//<%if(field.yield || field.yieldName){%>
	if (fieldYield || yieldName) {
		return 'yield';
	}
	//<%if(cxPropEditMode){%>
	if (cxPropEditMode) {
		return 'editMode';
	}
	//<%if(field.cxTypeMapping == "lookup" && row[field.api_name]){%>
	if (cxTypeMapping === "lookup" && fieldData) {
		return 'lookup';
	}
	//<%}else if((field.cxTypeMapping == "tag" && row[field.api_name].length != 0) || (field.cxTypeMapping == "user" && row[field.api_name]) || (field.cxTypeMapping == "picklist" && field.enable_colour_code) || (field.cxTypeMapping == "number" && !cxPropNumberProperties) || (field.cxTypeMapping=='text-area' && (cxPropClipMode || cxPropTextareaProperties.lineClamp)) || (field.cxTypeMapping=='image')){%>
	if ((cxTypeMapping === "tag" && fieldData && fieldData.length !== 0) ||
		(cxTypeMapping === "user" && fieldData) ||
		(cxTypeMapping === "picklist" && enable_colour_code) ||
		(cxTypeMapping === "number" && !cxPropNumberProperties) ||
		(cxTypeMapping === 'text-area' && ( lineClamp || cxPropClipMode)) ||
		(cxTypeMapping === 'image')
	) {
		return 'component';
	}
	return (cxTypeMapping === "boolean" && field && field.cxPropEditable )? "customEditable" : 'unescape';
});
//(cxPropShowSortIcon && (field.sortable || cxPropEnableAllFieldSort)) || (checkForMaskPermission(field.mask_details , cxPropProfileId) && cxPropMaskUnmaskIcon) || (!field.mask_details && cxPropShowNoMaskFieldSortIcon)
Lyte.Component.registerHelper("showCxTableMenuIcon", function(cxPropShowSortIcon,sortable,showMenuIcon,cxPropEnableAllFieldSort,maskDetails,cxPropProfileId) {
	if( showMenuIcon ){ return showMenuIcon; } // This check is to enable the sort icon only for specific fields when cxPropShowSortIcon is set to false.
	if( !cxPropShowSortIcon ){ return false; }
	if(cxPropEnableAllFieldSort){ return cxPropEnableAllFieldSort; }
	if(maskDetails ){
		return Lyte.Component.registeredHelpers.checkForMaskPermission(maskDetails , cxPropProfileId);
	}
	return  sortable;
	// return (cxPropShowSortIcon && (showMenuIcon!==undefined ? showMenuIcon : sortable || cxPropEnableAllFieldSort)) || (Lyte.Component.registeredHelpers.checkForMaskPermission(maskDetails , cxPropProfileId) && cxPropMaskUnmaskIcon) || (!maskDetails && cxPropShowNoMaskFieldSortIcon);
});
/**
 * @syntax nonYielded
 * <crux-table-component
 * cx-prop-header='[{"api_name":"SingleLine","field_label":"Single Line","data_type":"text"},{"api_name":"Annual_Revenue","field_label":"Annual Revenue","data_type":"currency"},{"api_name":"is_Email_Optout","field_label":"is Email Optout","data_type":"boolean"},{"api_name":"CF_Picklist","field_label":"CF Picklist","data_type":"picklist","enable_colour_code":true,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"3201447000000002203","type":"used"},{"display_value":"Acquired","sequence_number":2,"reference_value":"Acquired","colour_code":"#25b52a","actual_value":"Acquired","id":"3201447000000002205","type":"used"},{"display_value":"Active","sequence_number":3,"reference_value":"Active","colour_code":"#ffd6bc","actual_value":"Active","id":"3201447000000002207","type":"used"},{"display_value":"Market Failed","sequence_number":4,"reference_value":"Market Failed","colour_code":"#eb4d4d","actual_value":"Market Failed","id":"3201447000000002209","type":"used"},{"display_value":"Project Cancelled","sequence_number":5,"reference_value":"Project Cancelled","colour_code":"#eb4d4d","actual_value":"Project Cancelled","id":"3201447000000002211","type":"used"},{"display_value":"Shut Down","sequence_number":6,"reference_value":"Shut Down","colour_code":"#eb4d4d","actual_value":"ShutDown","id":"3201447000000002213","type":"used"}]},{"api_name":"Total_Employees","field_label":"Total Employees"},{"api_name":"Email","field_label":"Custom Email","data_type":"email"},{"api_name":"Phone","field_label":"Mobile Number","data_type":"phone"}]'
 * cx-prop-content='[{"SingleLine":"Custom TextValue","is_Email_Optout":true,"Annual_Revenue":133,"CF_Picklist":"Shut Down","Email":"new@zmail.com"},{"SingleLine":"2 TextValue","is_Email_Optout":false,"Annual_Revenue":789,"CF_Picklist":"Project Cancelled","Phone":"9918902290","Email":"test-new@zmail.com"},{"SingleLine":"Old Old Old TextValue","is_Email_Optout":true,"Annual_Revenue":666,"Total_Employees":1020},{"SingleLine":"qiwoqeujilsjndifjl sfiansfikjiosfj","is_Email_Optout":false,"Annual_Revenue":35,"CF_Picklist":"Active","Phone":"9918902290","Email":"test-new@zmail.com"},{"Total_Employees":15001,"SingleLine":"Custom TextValue","is_Email_Optout":true,"Annual_Revenue":133234},{"SingleLine":"CustomTable One","is_Email_Optout":true,"CF_Picklist":"Market Failed"},{"SingleLine":"Table textcontent TextValue","is_Email_Optout":true,"Annual_Revenue":30000,"Phone":"9918902290","Email":"test-new@zmail.com"},{"Total_Employees":15001,"SingleLine":"qwerty","is_Email_Optout":false,"Annual_Revenue":112010928,"CF_Picklist":"Acquired"},{"SingleLine":"new sample","is_Email_Optout":true,"CF_Picklist":"Shut Down"},{"is_Email_Optout":false,"Annual_Revenue":900,"Phone":"9918902290","Email":"records.tes@gmail.com","CF_Picklist":"Active"}]'>
 * </crux-table-component>
 */

/**
 * @component crux-list-view
 * @author rafik.shaik
 * @version 1.0.0
 * @summary crux-list-view component
 */
Lyte.Component.register("crux-list-view", {
_template:"<template tag-name=\"crux-list-view\"> <template is=\"if\" value=\"{{ShowLvLoading}}\"><template case=\"true\"> <div class=\"cxLvLoadingDiv\"><div class=\"cxSpinloader cxLvLoader\"></div></div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(isLvWrapper,'&amp;&amp;',errorDetails.show_error)}}\"><template case=\"true\"> <div class=\"cxPropLayoutShowErrorDiv\"> {{errorDetails.message}} </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropShowLvHeader}}\"><template case=\"true\"><div class=\"cxLvHeader\"> <span class=\"cxLvHeadLeftCont\"> <template is=\"if\" value=\"{{cxPropLvSummaryYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"summary-yield\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{selectedRecords}}\"><template case=\"true\"> <div class=\" {{if(expHandlers(cxPropSelectedIds.length,'>',0),'cxdN','cxFlex cxAlignItemCenter')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSelectedIds.length,'==',0),'&amp;&amp;',cxPropShowTotalRecordCount)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropPerPage,'||',expHandlers(cxPropPerPage,'===',0)),'||',expHandlers(cxPropPage,'>',1)),'&amp;&amp;',expHandlers(cxPropSelectedIds.length,'==',0))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropFetchCountValues,'!'),'&amp;&amp;',expHandlers(total_new_count,'==',&quot;###&quot;))}}\"><template case=\"true\"> <span onclick=\"{{action('fetchCountOnReq')}}\">{{cruxGetI18n(\"totalrecords\")}}<span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\"> {{total_new_count}}</span></span> </template><template case=\"false\"> {{cruxGetI18n(\"totalrecords\")}} <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropRecordCount,'!'),'&amp;&amp;',expHandlers(cxPropRecordCount,'!=',0)),'||',show_loading)}}\"><template case=\"true\"> <span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\"> <div class=\"cxLvRecordCountLoader\"></div> </span> </template><template case=\"false\"> <span class=\"cxLvHeaderTextSemiBold cxLvRecordCount\">{{cxPropRecordCount}}</span> </template></template></template></template></template></template> <template is=\"if\" value=\"{{cxPropSmartFilterYield}}\"><template case=\"true\"><lyte-yield yield-name=\"filter-yield\"></lyte-yield></template></template> <template is=\"if\" value=\"{{expHandlers(sorted_column,'&amp;&amp;',expHandlers(cxPropSelectedIds.length,'==',0))}}\"><template case=\"true\"> <span class=\"cxLvSeparationCircle\"></span> {{cruxGetI18n(\"crm.api.apidashboard.SortBy\")}} <span class=\"cxLvHeaderTextSemiBold cxLvHeaderSortedColName\"> {{sorted_column}}</span> <span class=\"cxLvHeaderActionBtn\" onclick=\"{{action('onUnsortClick','unsort')}}\" data-zcqa=\"lv_unsortLink\">{{cruxGetI18n(\"crm.column.unsort\")}}</span> </template></template> </template></template> </div> <div class=\"{{if(expHandlers(cxPropSelectedIds.length,'>',0),'cxFlex cxAlignCenter','cxdN')}}\"> {{unescape(selectedCount)}} <span onclick=\"{{action('clearFields')}}\" id=\"selectAllEntity\" class=\"cxLvHeaderActionBtn\" data-zcqa=\"clearRecords\">{{cruxGetI18n('crm.title.clear.name')}}</span> <template is=\"if\" value=\"{{expHandlers(expHandlers(showSelectedDiv,'&amp;&amp;',expHandlers(expHandlers(cxPropSearchLetter,'!'),'||',expHandlers(cxPropSearchField,'!'))),'&amp;&amp;',cxPropShowSelectAll)}}\"><template case=\"true\"> <span id=\"selectAllRecords\" class=\"cxLvHeaderSelectAllBtn\" onclick=\"{{action('selectedAllEntity')}}\">{{cruxGetI18n('crm.module.selectall',cruxGetI18n('records'))}} </span> </template></template> </div> </template><template case=\"false\"> <div class=\"cxFlex cxAlignCenter\"> {{unescape(cruxGetI18n('crm.mass.actions.all.selected',selected_count,cruxGetI18n('records')))}} <span onclick=\"{{action('clearFields')}}\" class=\"cxLvHeaderActionBtn\">{{cruxGetI18n('crm.title.clear.name')}}</span> </div> </template></template> </template></template> </span> <template is=\"if\" value=\"{{expHandlers(cxPropRecordCount,'>',0)}}\"><template case=\"true\"> <span class=\"cxLvHeadRightCont\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSelectedIds.length,'==',0),'&amp;&amp;',cxPropShowPerPageDropdown)}}\"><template case=\"true\"> <crux-dropdown data-zcqa=\"dash_currentOption\" class=\"cxLvRecPerPageDd\" cx-prop-box-class=\"cxLvRecPerPageDropBox\" cx-prop-options=\"{{dropDownOptions}}\" cx-prop-selected=\"{{per_page_val}}\" cx-prop-user-value=\"user_value\" cx-prop-system-value=\"system_value\" on-option-select=\"{{method('openDropdown')}}\"> </crux-dropdown> <span class=\"cxLvSeparationCircle\"></span> </template></template> <template is=\"if\" value=\"{{expHandlers(selectAllEntity,'!')}}\"><template case=\"true\"> <span class=\"cxLvPageCountLabel\">{{start_record}} - {{end_record}}</span> <lyte-navigator on-next=\"{{method('viewNavigate','next')}}\" on-previous=\"{{method('viewNavigate','previous')}}\" lt-prop-value=\"{{lbind(startIndex)}}\" lt-prop-records=\"{{cxPropRecordCount}}\" lt-prop-perpage=\"{{per_page_val}}\" lt-prop-show-only-icon=\"true\" start-record=\"{{lbind(start_record)}}\" end-record=\"{{lbind(end_record)}}\"></lyte-navigator> </template></template> </span> </template></template> </div></template></template> <div class=\"cxLvLoaderWrap\"> <span class=\"cxLvTableLoader\"></span> </div> <div class=\"cxLvContWrapper\"> <template is=\"if\" value=\"{{cxPropSmartFilterYield}}\"><template case=\"true\"><lyte-yield yield-name=\"custom-filter\"></lyte-yield></template></template> <div class=\"cxLvViewContainer {{if(ifEquals(selectedRecords,false),'cxLvShowOverlay')}}\" id=\"cxLvViewContainer\"> <template is=\"if\" value=\"{{cxPropShowManageColumn}}\"><template case=\"true\"> <span class=\"cxLvTableManageMenuBtn {{if(isOptionOpened,'','')}}\" data-zcqa=\"listView_addColumn\" onclick=\"{{action('showOptionsPopup')}}\" id=\"cxLvTableManageSetting_{{cxPropId}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;Bottom-Left&quot;}\" aria-label=\"{{cruxGetI18n('crm.listview.options.manage')}}\" lt-prop-title=\"{{cruxGetI18n('crm.listview.options.manage')}}\"> <span type=\"button\" class=\"cxLvTableManageMenuBtnIcon\"></span> </span> </template></template> {{addMurhyInfo(\"crux-list-view.html\",\"Feb Default Changes\")}} <crux-table-component cx-prop-id=\"{{cxPropId}}\" cx-prop-cell-suffix-yield=\"{{cxPropCellSuffixYield}}\" cx-prop-row-zcqa=\"detailView\" cx-prop-label-selector=\"list_display_label\" cx-prop-prevent-width=\"{{cv_width_updated}}\" cx-prop-data-bind=\"lyteFastRender\" on-scroll=\"{{method('tableScroll')}}\" cx-prop-body-id=\"lvTred\" cx-prop-column-cell-class=\"{{cxPropColumnCellClass}}\" cx-prop-dual-resize=\"{{cxPropIsResizeEnabled}}\" cx-prop-module-display-field=\"{{cxPropDisplayField}}\" cx-prop-tooltip=\"true\" class=\"cxLvTableComp {{if(expHandlers(cv_width_updated,'!'),'cxLvAutoWidthTable')}} {{cxPropModule}} {{if(ifEquals(LvContent.length,0),'NoDataInRecord')}}\" data-zcqa=\"cxListViewTable\" id=\"listcrux\" cx-prop-sorted-order=\"{{custom_view.sort_order}}\" cx-prop-selected-rows=\"{{cxPropSelectedIds}}\" cx-prop-selected-row-class=\"cxLvTableRowSelected\" on-mouse-out=\"{{action('hideIcons')}}\" on-mouse-over=\"{{action('showIcons')}}\" cx-prop-header-yield=\"{{headerYields}}\" cx-prop-sticky-table=\"{{isStickyTable}}\" cx-prop-header-row-id=\"cxLvTableHeaderRow\" on-resize-end=\"{{method('resizeColumn')}}\" on-resize-select=\"{{method('onResizeSelect')}}\" cx-prop-clip-mode=\"{{clip_mode}}\" cx-prop-table-id=\"cxListViewTable\" cx-prop-enable-all-field-sort=\"{{cxPropEnableAllFieldSort}}\" cx-prop-enable-field-sort=\"{{cxPropEnableFieldSort}}\" cx-prop-sorted-column=\"{{if(ifEquals(from_page,'listview'),if(cxPropSortByComp.api_name,cxPropSortByComp.api_name,cxPropSortByComp.id))}}\" cx-prop-prefix-yields=\"{{cxPropPrefixYields}}\" cx-prop-suffix-yields=\"{{cxPropSuffixYields}}\" on-body-row-click=\"{{action('onRowClick')}}\" cx-prop-enable-body-scroll=\"true\" cx-prop-show-sort-icon=\"{{cxPropShowSortIcon}}\" cx-prop-enable-sort=\"false\" cx-prop-new-list-view=\"true\" cx-prop-is-alpha-search-shown=\"{{cxPropShowSearchLetter}}\" cx-prop-express=\"{{cxPropExpressTable}}\" cx-prop-header=\"{{LvHeader}}\" cx-prop-content=\"{{LvContent}}\" cx-prop-yield-for-suffix=\"{{if(list_cv_btn.length,true)}}\" cx-prop-yield-for-prefix=\"true\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-add-search=\"false\" cx-prop-field-type-mapping-selector=\"api_name\" on-sort=\"{{action('showSortDropdown')}}\" cx-prop-no-records-zcqa=\"lvNoRecordsFound\" cx-prop-no-records-message=\"{{cxPropNoRecordsMessage}}\" on-scroll-set-latest-entity-position=\"{{method('latestEntityIdFromTable')}}\" cx-prop-sort-columns=\"{{if(ifEquals(from_page,'listview'),true,if(ifNotEquals(cxPropSortColumns,undefined),cxPropSortColumns,false))}}\" new=\"true\" cx-prop-field-type-mapping=\"{{cxPropFieldMapping}}\" cx-prop-header-properties=\"{{cxPropHeaderProperties}}\" cx-prop-date-properties=\"{{cxPropDateProperties}}\" cx-prop-datetime-properties=\"{{cxPropDatetimeProperties}}\" cx-prop-table-class=\"{{if(clip_mode,'cxLvWrapTextIncluded','')}} {{if(expHandlers(isStickyTable,'!'),'lyteNoStickyTable','')}} {{if(doEnablePinnedColAnim,'cxTableLastPinnedColEnableUiAnim','')}} {{cxPropTableClass}}\" cx-prop-lookup-properties=\"{{lookupProperties}}\" cx-prop-header-tooltip-class=\"\" cx-prop-header-tooltip-config=\"{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot;}\" cx-prop-tooltip-props=\"{&quot;config&quot;:{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot;}, &quot;class&quot; : &quot;&quot;}\"> <template is=\"yield\" yield-name=\"header-prefix-1\" cx-prop-fixed=\"enable\" cx-prop-style=\"width:30px\" lt-prop-class=\"\" on-show-more-tags=\"{{method('showMoreTags')}}\" on-before-set-fix-table-column-width=\"{{method('beforeSetFixTableColumnWidth')}}\" on-after-set-fix-table-column-width=\"{{method('afterSetFixTableColumnWidth')}}\"> </template> <template is=\"registerYield\" yield-name=\"header-prefix-2\" cx-prop-style=\"width:18px\" data-zcqa=\"dummy\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(LvContent.length,'>',0),'&amp;&amp;',expHandlers(clientAccount,'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropHeaderPrefixYield}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropHeaderPrefixYield}}\"><template case=\"true\"><lyte-yield yield-name=\"headerprefix-yield\"></lyte-yield></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowSelectBox}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-list-view.html\",\"Feb Default Changes\")}} <lyte-checkbox class=\"cxLvUserSelNone {{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;IMAGEVALIDATION&quot;,&quot;>=&quot;,0)),&quot;cxLvDNImp&quot;,&quot;&quot;)}} {{if(diableHeaderCheckbox,&quot;cxLvShowOverlay&quot;,&quot;&quot;)}}\" lt-prop-title=\"{{if(cxPropShowMaxSelectTooltip,cruxGetI18n(&quot;crm.listview.maximum.records.alert&quot;,cxPropMaxSelectCount),&quot;&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\" id=\"selectCheckbox\" data-zcqa=\"listView_selectAllEntity\" lt-prop-id=\"selectAllEntity\" lt-prop-class=\"cxListVwCustomCheckBox\" on-changed=\"{{method(&quot;selectAllEntity&quot;)}}\"></lyte-checkbox> </template></template></template></template> </template></template> </template> <template is=\"yield\" yield-name=\"header-prefix-3\" cx-prop-fixed=\"enable\" cx-prop-style=\"min-width:0px;padding-left:0px !important; padding-right:0px;\"> </template> <template is=\"yield\" yield-name=\"body-prefix-1\"> <div class=\"cxLvEditIconWrapCont\" id=\"icons{{recordObj.id}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowEditIcon,'&amp;&amp;',expHandlers(expHandlers(recordObj.cxPropShowEditIcon,'==',true),'||',expHandlers(recordObj.cxPropShowEditIcon,'==',undefined)))}}\"><template case=\"true\"> <div onclick=\"{{action('stopPropagation',event)}}\" class=\"cxLvActEditIconWrap\" id=\"cxLvIcons_{{record.id}}\"> <template is=\"if\" value=\"{{cxPropShowMoreOption}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" data-zcqa=\"appMoreOptionList\" id=\"cxLvAppMore_{{record.id}}\" href=\"javascript:;\"> <span class=\"cxLvMoreIcon\"></span> </a> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowEditIcon}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" data-cid=\"editbtn\" lt-prop-id=\"cxLvEdit_{{record.id}}\" data-zcqa=\"listViewEdit_{{record.id}}\" onclick=\"{{action('eventEditPopup',this)}}\" id=\"cxLvEdit_{{record.id}}\" href=\"{{if(clientPortalName,concat('/portal/',clientPortalName,getCrmBasePath(),'/EditEntity.do?module=',record.$activity_type,'&amp;id=',record.id,'&amp;cvid=',cvid,'&amp;recordNum=',record.recnum,'&amp;FROM_INDEX=',fromIndex,'&amp;TO_INDEX=',toIndex),concat(getCrmBasePath(),'/',crmPortal,'/EditEntity.do?module=',record.$activity_type,'&amp;id=',record.id,'&amp;cvid=',cvid,'&amp;recordNum=',record.recnum,'&amp;FROM_INDEX=',fromIndex,'&amp;TO_INDEX=',toIndex))}}\" data-params=\"{&quot;module&quot;:&quot;{{record.$activity_type}}&quot;,&quot;id&quot;:&quot;{{record.id}}&quot;,&quot;cvid&quot;:&quot;{{cvid}}&quot;,&quot;recordNum&quot;:&quot;{{record.recnum}}&quot;,&quot;from&quot;:&quot;listview&quot;}\"> <span class=\"cxLvEditIcon\"></span> </a> </template></template></template></template> <template is=\"if\" value=\"{{cxPropShowMoreOptionAfterEdit}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditSecondIcon\" data-zcqa=\"callMoreOption\" id=\"cxLvMore_{{record.id}}\" href=\"javascript:;\"> <span class=\"cxLvMoreIcon\"></span> </a> </template><template case=\"false\"><template is=\"if\" value=\"{{cxPropShowCloseIcon}}\"><template case=\"true\"> <a class=\"cxLvTableIconWrap cxLvActEditSecondIcon\" href=\"javascript:void(0)\" close-task=\"{{concat('closeTask(&quot;',getCrmBasePath(),'/closeTask.do?action=CloseTask&amp;taskid=',record.id,'&amp;id=',record.id,'&amp;module=Tasks&quot;)')}}\" data-zcqa=\"listViewClose_{{record.id}}\" id=\"cxLvClose_{{record.id}}\" onclick=\"{{action('closeTask',record.id)}}\"> <span class=\"cxLvTickIcon\"></span> </a> </template></template></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropShowQuickActionsMenu,'&amp;&amp;',expHandlers(expHandlers(recordObj.cxPropShowQuickActionsMenu,'==',true),'||',expHandlers(recordObj.cxPropShowQuickActionsMenu,'==',undefined)))}}\"><template case=\"true\"> <span data-zcqa=\"quickActionsMenu\" id=\"quickActionsOptions_{{recordObj.id}}\" class=\"cxLvTableIconWrap cxLvActEditFirstIcon\" lt-prop-title=\"{{cruxGetI18n('crm.dashboard.more.options')}}\" aria-label=\"{{cruxGetI18n('crm.dashboard.more.options')}}\"> <span class=\"cxLvMoreIcon\"></span> </span> </template></template></template></template> </div> </template> <template is=\"registerYield\" yield-name=\"body-prefix-2\"> <template is=\"if\" value=\"{{cxPropBodyPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"bodyprefix-yield\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.cxPropPrefixClass}}\"><template case=\"true\"> <span class=\"{{recordObj.cxPropPrefixClass}}\" lt-prop-title=\"{{recordObj.cxPropPrefixTooltip}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"> <template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_pending')}}\"><template case=\"true\"> <span class=\"cxLvVisionWaitingIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.record.failure.msg&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_rejected')}}\"><template case=\"true\"> <span class=\"cxLvStopProcessIcon cxLvVisionRejectIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.rejected.msg&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(recordObj.$approval_state,'zia_vision_validation')}}\"><template case=\"true\"> <span class=\"cxLvVisionProcessIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.zia.vision.processing&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(recordObj.$stop_processing,'&amp;&amp;',expHandlers(featureName,'!==',&quot;COMPLIANCE&quot;))}}\"><template case=\"true\"> <span class=\"cxLvStopProcessIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.privacy.listview.consent.locked&quot;)}}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.$in_merge}}\"><template case=\"true\"> <span class=\"cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.approvalProcess.label.waitingForFindAndMerge&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(ifEquals(recordObj.$approved,false),'&amp;&amp;',ifEquals(recordObj.$approval.resubmit,false)),'||',expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropAdmin,'&amp;&amp;',expHandlers(recordObj.$review,'==',&quot;Rejected&quot;)),'&amp;&amp;',cxPropShowCheckbox)}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity dd\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"></lyte-checkbox> </template><template case=\"false\"> <span class=\"{{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)),&quot;cxLvWaitingReviewIcon&quot;,&quot;cxLvWaitingApprovalIcon&quot;)}}\" lt-prop-title=\"{{if(expHandlers(cxPropSystemName,'&amp;&amp;',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;>=&quot;,0)),cruxGetI18n(&quot;crm.reviewprocess.record.review.pending&quot;),cruxGetI18n(&quot;crm.approvalProcess.label.waitingForApproval&quot;))}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottomright&quot;, &quot;appearance&quot; : &quot;box&quot;, &quot;showdelay&quot; : 1000}\"></span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{recordObj.Locked__s}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(clientAccount,'!')}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"></lyte-checkbox> </template></template> <template is=\"if\" value=\"{{recordObj.$locked_for_me}}\"><template case=\"true\"> <span data-zcqa=\"lockedforMe_{{recordObj.id}}\" class=\"{{if(expHandlers(clientAccount,'!'),'cxLvLockIconWithCB','')}} cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.record.lock.record.locked&quot;)}}\"></span> </template><template case=\"false\"> <span data-zcqa=\"lockedforOthers_{{recordObj.id}}\" class=\"{{if(expHandlers(clientAccount,'!'),'cxLvLockIconWithCB','')}} cxLvLockIcon\" lt-prop-title=\"{{cruxGetI18n(&quot;crm.record.record.locked.other&quot;)}}\"></span> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropShowCheckbox,'&amp;&amp;',expHandlers(clientAccount,'!'))}}\"><template case=\"true\"> <lyte-checkbox data-id=\"selectEntity\" id=\"selectEntity_{{recordObj.id}}\" lt-prop-class=\"{{if(cxContains(cxPropSelectedIds,recordObj.id),'cxListVwCustomCheckBoxChecked','cxListVwCustomCheckBox')}}\" data-zcqa=\"selectEntity\" on-changed=\"{{method(&quot;selectedEntity&quot;)}}\" onclick=\"{{action(&quot;stopPropagation&quot;,event)}}\" lt-prop-id=\"{{recordObj.id}}\" data-recnum=\"{{recordObj.recnum}}\"> </lyte-checkbox> </template></template></template></template></template></template></template></template></template></template></template></template></template></template></template></template> </template></template></template></template> </template> <template is=\"yield\" yield-name=\"body-prefix-3\"> <template is=\"if\" value=\"{{recordObj.$upcoming_activity}}\"><template case=\"true\"> <div class=\"cxLvActivityColDiv\"> <span class=\"cxLvActivityIcon {{cxGetActivityIcon(recordObj.$upcoming_activity.module.api_name)}}\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropIsLinkToNotSupported,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropIsActivitySplitDone,'!')}}\"><template case=\"true\"> <span> {{recordObj.$upcoming_activity.date}}</span> <link-to lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" lt-prop-class=\"cxLvActivityColLink {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;Activities&quot;,&quot;{{recordObj.$upcoming_activity.id}}&quot;]\" lt-prop-qp=\"{&quot;sub_module&quot; : &quot;{{recordObj.$upcoming_activity.module.api_name}}&quot; }\" lt-prop-rel=\"noopener noreferrer\"> {{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}} </link-to> </template><template case=\"false\"> <link-to lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" lt-prop-class=\"cxLvActivityColLink {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{recordObj.$upcoming_activity.module.api_name}}&quot;,&quot;{{recordObj.$upcoming_activity.id}}&quot;]\" lt-prop-rel=\"noopener noreferrer\"> <a> {{recordObj.$upcoming_activity.date}}</a> {{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}} </link-to> </template></template> </template><template case=\"false\"> <div data-zcqa=\"activityBadge_{{recordObj.id}}\" lt-prop-title=\"{{recordObj.$upcoming_activity.name}}\" lt-prop-tooltip-style=\"max-width: 400px;\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;apperance&quot; : &quot;callout&quot;}\" lt-prop-tooltip-class=\"cxLvActivityTooltip\" class=\"cxLvActivityColLink cxCP {{cxGetTagColor(recordObj.$upcoming_activity.date)}}\" onclick=\"{{action('onLvActivityBadgeClick',recordObj,event)}}\">{{cxGetDateInUsrLocaleFormat(recordObj.$upcoming_activity.date,recordObj.$upcoming_activity.isNew)}}</div> </template></template> </div> </template></template> </template> <template is=\"yield\" yield-name=\"header-suffix-1\"></template> <template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"header-suffix-2\"></template> </template></template> <template is=\"yield\" yield-name=\"body-suffix-1\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(recordObj.$stop_processing,'!'),'&amp;&amp;',list_cv_btn.length),'&amp;&amp;',expHandlers(recordObj.$review,'!=',&quot;Rejected&quot;)),'&amp;&amp;',expHandlers(expHandlers(cxPropSystemName,'!'),'||',cxIndexOf(cxPropSystemName,&quot;REVIEWPROCESS&quot;,&quot;==&quot;,expHandlers(1,'-'))))}}\"><template case=\"true\"> <span id=\"customButtonDetails_{{recordObj.id}}\" class=\"cxLvCustomButtonWrap\" onclick=\"{{action('stopEvent')}}\"> <div id=\"cxLvCustomBtn\" class=\"lyteClubbedButton\"> <lyte-button lt-prop-appearance=\"default\" class=\"cvButtonQuery{{list_cv_btn[0].id}}{{recordObj.id}}\" lt-prop-text=\"{{list_cv_btn[0].name}}\" lt-prop-value=\"{{list_cv_btn[0].name}}\" onmouseover=\"{{action('mouseOverCustomButton','cvButtonQuery',list_cv_btn[0].id,cxEncodeJS(list_cv_btn[0].name),cxEncodeJS(list_cv_btn[0].description),recordObj.id)}}\" onmouseout=\"{{action('mouseOutCustomButton')}}\" lt-prop-id=\"cxLv_custom_button\" lt-prop-size=\"small\" onclick=\"{{action(&quot;executeCustomButtonAction&quot;,list_cv_btn[0].id,this)}}\"> </lyte-button> <template is=\"if\" value=\"{{expHandlers(list_cv_btn.length,'>',1)}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" lt-prop-size=\"small\" id=\"customBtnList_{{cxPropId}}\" onclick=\"{{action('stopCvBtnPropagation',event)}}\"> <template is=\"registerYield\" yield-name=\"text\"></template> </lyte-button> </template></template> </div> </span> </template></template> </template> <template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"body-suffix-2\"></template> </template></template> <template is=\"yield\" yield-name=\"body-eventtypecolour\"> <span class=\"cxLvEventTypeElemCont\"> <template is=\"if\" value=\"{{recordObj.$colour_code}}\"><template case=\"true\"> <span class=\"cxLvEventTypeColorIndicator\" data-zcqa=\"colorspanpl_{{recordObj[fieldObj.api_name]}}\" style=\"background: {{recordObj.$colour_code}}\"></span> </template></template> {{recordObj[fieldObj.api_name]}} </span> </template> <template is=\"yield\" yield-name=\"body-lookup\"> <lyte-yield yield-name=\"listview-{{fieldObj.yieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template> <template is=\"yield\" yield-name=\"body-campaign-type\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldObj.ui_type,'==',2),'&amp;&amp;',expHandlers(fieldObj.enable_colour_code,'==',true))}}\"><template case=\"true\"> <span class=\"cxLvColorAppliedPicklist {{if(recordObj[fieldObj.api_name],'','cxLvColorAppliedPKNone')}}\" data-zcqa=\"colorspanpl_{{recordObj.id}}_{{fieldObj.id}}\" style=\"{{cxGetCVPicklistStyleObj(recordObj[fieldObj.api_name],fieldObj)}}\">{{recordObj[fieldObj.api_name]}}</span> </template><template case=\"false\"> <lyte-text class=\"cxLvCampignTypeText\" lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600 }\" lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{cxContains(&quot;[1,2,3]&quot;,recordObj.$campaign_type)}}\"><template case=\"true\"> <span class=\"cxLvCampignTypeIcon\" data-params=\"{&quot;campaignId&quot;:&quot;{{recordObj.id}}&quot;}\" onclick=\"{{action(&quot;viewCampSummaryOnClick&quot;,event,this)}}\"></span> </template></template> </template> <template is=\"yield\" yield-name=\"body-current_state\"> <template is=\"if\" value=\"{{expHandlers(recordObj[fieldObj.api_name],'==',cruxGetI18n('pf.deleted.state'))}}\"><template case=\"true\"> <lyte-text class=\"cxLvNotFoundColor\" lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{recordObj[fieldObj.api_name]}}\"></lyte-text> </template></template> </template> <template is=\"yield\" yield-name=\"body-best_time\"> <template is=\"for\" items=\"{{recordObj[fieldObj.api_name]}}\" item=\"value\" index=\"index\"> <span class=\"cxLvBestTimeTagList\">{{value}}</span> </template> </template> <template is=\"yield\" yield-name=\"body-pf_email_lookup\"> <lyte-text lt-prop-value=\"{{recordObj[fieldObj.api_name].name}}\"></lyte-text> </template> <template is=\"yield\" yield-name=\"body-activity_type\"> <div> <template is=\"if\" value=\"{{expHandlers(recordObj[fieldObj.api_name],'!=',cruxGetI18n(&quot;Events&quot;))}}\"><template case=\"true\"> <div> {{recordObj[fieldObj.api_name]}} </div> </template><template case=\"false\"> <div> {{cxGetModuleDisplayName(false,true,true,cxPropGetModuleDisplayNameInActivities)}}</div> </template></template> </div> </template> <template is=\"yield\" yield-name=\"body-territory\"> <lyte-text lt-prop-tooltip-config=\"{&quot;showdelay&quot; : 600, &quot;appearance&quot; : &quot;box&quot; }\" lt-prop-value=\"{{cxGetTerritorityValue(recordObj[fieldObj.api_name])}}\"></lyte-text> </template> <template is=\"if\" value=\"{{cxPropShowSearchLetter}}\"><template case=\"true\"> <template is=\"yield\" yield-name=\"header-alpha-search\"> <span id=\"cxLvAlphaSortBtn_{{cxPropId}}\" class=\"cxLvAlphaSortBtn {{if(expHandlers(ifNotEquals(cxPropSearchLetter,'All'),'&amp;&amp;',ifEquals(cxPropSearchField,fieldName)),'cxLvAlphaSortBtnSel')}}\"> <span id=\"cxLvAlphaSearch\" class=\"cxLvAlphaSearch\" data-zcqa=\"alphaSearch\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSearchLetter,'!==',&quot;All&quot;),'&amp;&amp;',expHandlers(cxPropSearchField,'===',fieldName))}}\"><template case=\"true\"> {{cruxGetI18n(cxPropSearchLetter)}} </template><template case=\"false\"> All </template></template> </span> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSearchLetter,'!=',&quot;All&quot;),'&amp;&amp;',expHandlers(cxPropSearchField,'===',fieldName))}}\"><template case=\"true\"> <span onclick=\"{{action(&quot;alphaSearchHandling&quot;,event)}}\" class=\"cxLvAlphaSortEdit\"> <span class=\"cxLvAlphaSortEditIcon\"></span> </span> </template><template case=\"false\"> <span class=\"cxLvAlphaSortBtnDdIcon\"></span> </template></template> </span> </template> </template></template> <template is=\"yield\" yield-name=\"cellSuffixYield\" from-parent=\"\"></template> </crux-table-component> </div> </div> <template is=\"if\" value=\"{{cxPropShowSearchLetter}}\"><template case=\"true\"> <lyte-menu id=\"cxLvAlphaSortMenu_{{cxPropId}}\" lt-prop-freeze=\"false\" lt-prop-yield=\"true\" lt-prop-query=\"span#cxLvAlphaSortBtn_{{cxPropId}}\" lt-prop-tabindex=\"10\" lt-prop-event=\"click\" lt-prop-prevent-inside-click=\"true\" on-before-open=\"{{method('showDropbox')}}\" on-before-close=\"{{method('hideDropBox')}}\" on-menu-click=\"{{method('AlphasortRecord')}}\" lt-prop-wrapper-class=\"cxLvAlphaSortMenu\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvAlphaSortMenuBody\" class=\"cxLvAlphaSortMenuBody\"> <template is=\"if\" value=\"{{showAlphaDropBox}}\"><template case=\"true\"> <lyte-menu-item data-value=\"All\" class=\"{{if(expHandlers(expHandlers(cxPropSearchField,'&amp;&amp;',expHandlers(cxPropSearchField,'!==',alphaDropBoxField)),'||',expHandlers(cxPropSearchLetter,'==','All')),'cxLvAlphaSortMenuSel','')}}\"> {{cruxGetI18n(\"All\")}}</lyte-menu-item> <template is=\"for\" items=\"{{sortingOrder}}\" item=\"item\" index=\"indeval\"> <lyte-menu-item data-value=\"{{item}}\" data-zcqa=\"alphaSearch_{{item}}\" class=\"{{if(expHandlers(expHandlers(cxPropSearchField,'==',alphaDropBoxField),'&amp;&amp;',expHandlers(cxPropSearchLetter,'==',item)),'cxLvAlphaSortMenuSel','')}}\"> {{item}}</lyte-menu-item> </template></template></template> </lyte-menu-body> </template> </lyte-menu> </template></template> <lyte-menu lt-prop-yield=\"true\" id=\"cxLvSortUnsortMenu\" lt-prop-event=\"click\" lt-prop-query=\"#cxTableSortIcon_{{cxPropId}}\" on-menu-click=\"{{method('sortRecord')}}\" data-zcqa=\"sort_div\" lt-prop-freeze=\"false\" on-before-open=\"{{method('sortBtnDisplay')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvSortMenuBody\" class=\"cxLvSortMenuBody\"> <template is=\"for\" items=\"{{sortDetails}}\" item=\"order\" index=\"index\"> <lyte-menu-item data-value=\"{{order.data_value}}\" data-zcqa=\"sorting_{{order.data_value}}\" id=\"pinHidden\" class=\"cxSortItemMenu {{if(expHandlers(expHandlers(expHandlers(expHandlers(cxPropPinedFieldsLength,'>=',cxPropPinedFieldsLimit),'&amp;&amp;',expHandlers(order.data_value,'===','Pin Column')),'||',expHandlers(islockedListView,'&amp;&amp;',expHandlers(expHandlers(order.data_value,'===','Pin Column'),'||',expHandlers(order.data_value,'===','UnPin Column')))),'||',expHandlers(disableHideOpt,'&amp;&amp;',expHandlers(order.data_value,'===','Hide Column'))),'cxLvDisabled','')}}\"> {{order.label}} <span class=\"cxLvSortMenuIcon {{order.class}}\"></span> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-modal lt-prop-wrapper-class=\"cxColumnListNew cxColumnListOnPopup\" id=\"newPopup\" lt-prop-allow-multiple=\"true\" lt-prop-show-close-button=\"false\" lt-prop-offset=\"{&quot;top&quot;:&quot;0&quot;}\" lt-prop-width=\"395px\" lt-prop-show=\"{{showModal}}\" on-before-show=\"{{method('beforePopoverShow')}}\" on-show=\"{{method('onPopoverShow')}}\" on-close=\"{{method('closePopover')}}\" on-before-close=\"{{method('beforePopoverClose')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-modal-header> <lyte-modal-content class=\"cxLvMangeColumnModalContent\"> <crux-column-list cx-prop-hide-search=\"false\" cx-prop-id=\"addColumnContainer\" id=\"columnListId\" cx-prop-max-select-column=\"{{cxPropMaxSelectColumn}}\" cx-prop-fields=\"{{ordered_fields1}}\" cx-prop-selected-fields=\"{{selected_fields1}}\" on-search=\"{{method(&quot;columnResize&quot;)}}\" on-drop-item=\"{{method(&quot;itemDrop&quot;)}}\" on-before-unchecked=\"{{method(&quot;beforeUnchecking&quot;)}}\" on-before-checked=\"{{method(&quot;beforeSelection&quot;)}}\" cx-prop-data-bind=\"{{cxPropColumnListDataBind}}\" cx-prop-disable-sort-for-unselected-fields=\"true\" cx-prop-pin-unpin-option=\"{{cxPropPinUnpinColumn}}\" cx-prop-property-fields=\"{{property_fields}}\" cx-prop-pin-field-limit=\"1\" on-pin-option-changed=\"{{method(&quot;PinOptionChanged&quot;)}}\"> </crux-column-list> </lyte-modal-content> <template is=\"if\" value=\"{{showPopoverfooter}}\"><template case=\"true\"> <lyte-modal-footer class=\"right\"> <lyte-button data-zcqa=\"listViewCancelbtn\" onclick=\"{{action('closePopover')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.cancel\")}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-disabled=\"{{isColumnListSaveDisabled}}\" id=\"columnlistPrimaryBtn\" lt-prop-class=\"primarybtn\" data-zcqa=\"listViewSubmitbtn\" onclick=\"{{action('saveCustomView')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <template is=\"if\" value=\"{{ifEquals(from,&quot;mBuilderBusinessCard&quot;)}}\"><template case=\"true\"> {{cruxGetI18n(\"crm.button.done\")}} </template><template case=\"false\"> {{cruxGetI18n(\"crm.button.save\")}} </template></template> </template> </lyte-button> </lyte-modal-footer> </template></template> </template> </lyte-modal> <lyte-menu lt-prop-yield=\"true\" id=\"cxLvTableManagePopup\" lt-prop-event=\"click\" lt-prop-query=\"#cxLvTableManageSetting_{{cxPropId}}\" lt-prop-freeze=\"false\" on-close=\"{{method('popoverClose')}}\" on-open=\"{{method(&quot;onManageColumnListOpen&quot;)}}\" lt-prop-position=\"downAlignLeft\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxLvTableManageMenuBody\"> <template is=\"if\" value=\"{{cxPropShowManageColumn}}\"><template case=\"true\"><template is=\"if\" value=\"{{isManageColumnsEnabled}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('showColumnList')}}\" id=\"addColumnOrginate\" data-zcqa=\"lv_manageColumn\">{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item lt-prop-title=\"{{cruxGetI18n(&quot;crm.listview.customview.locked&quot;)}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;followcursor&quot;, &quot;appearance&quot; : &quot;box&quot;}\" class=\"cxLvTableManagePopLiDisabled\" data-zcqa=\"lv_manageColumn\">{{cruxGetI18n(\"crm.listview.options.manage\")}}</lyte-menu-item> </template></template> </template></template><template is=\"if\" value=\"{{expHandlers(featureName,'!==','PORTALS')}}\"><template case=\"true\"><template is=\"if\" value=\"{{cxPropIsResizeEnabled}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('resetColumnWidth')}}\" class=\"{{if(disableResetOption,'cxLvTableManagePopLiDisabled')}}\" data-zcqa=\"lv_resetWidth\">{{cruxGetI18n(\"crm.listview.options.reset.width\")}}</lyte-menu-item> </template></template><template is=\"if\" value=\"{{clip_mode}}\"><template case=\"true\"> <lyte-menu-item onclick=\"{{action('changeWrap','wrap')}}\" data-zcqa=\"lv_clipWrapSwitch\">{{cruxGetI18n(\"crm.listview.options.text.wrap\")}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item onclick=\"{{action('changeWrap','clip')}}\" data-zcqa=\"lv_clipWrapSwitch\">{{cruxGetI18n(\"crm.listview.options.text.clip\")}}</lyte-menu-item> </template></template></template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"quickActionsOptionsmenu_{{entityId}}\" on-before-open=\"{{method('onBeforeQuickActionsMenuOpen',event)}}\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu cxLvMoreOptionLongMenu\" lt-prop-event=\"click\" lt-prop-query=\"#quickActionsOptions_{{entityId}}\" lt-prop-freeze=\"true\" lt-prop-position=\"down\" on-close=\"{{method('onMenuClose','quickAction')}}\" on-before-close=\"{{method('onbeforeMenuClose')}}\" on-open=\"{{method('onQuickActionsMenuOpen')}}\" on-menu-click=\"{{method('onQuickActionsMenuClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvQuickActionsOptionsList\" data-zcqa=\"quickActionsOptionsList\"> <template is=\"for\" items=\"{{quickActionMenu}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;Edit&quot;)}}\"><template case=\"true\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}\" class=\"menuNoPadd\"> {{cruxGetI18n(\"crm.button.edit\")}} </lyte-menu-item> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;add_tag&quot;),'||',expHandlers(item.value,'==',&quot;edit_tag&quot;))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;add_tag&quot;)}}\"><template case=\"true\"> <lyte-menu-item data-value=\"add\" data-zcqa=\"tagOptions_Add\" id=\"tagOptions_{{entityId}}_add\">{{item.name}}</lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item data-value=\"edit\" data-zcqa=\"tagOptions_edit\" id=\"tagOptions_{{entityId}}_edit\">{{item.name}}</lyte-menu-item> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;mass_convert&quot;),'&amp;&amp;',expHandlers(expHandlers(cxPropModule,'===',&quot;Quotes&quot;),'||',expHandlers(cxPropModule,'===',&quot;SalesOrders&quot;)))}}\"><template case=\"true\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}_{{cxPropModule}}\" class=\"cxLvCDefault\"> {{item.name}} <span class=\"cxLvMoreOptDropdownIcon\"></span> </lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item data-value=\"{{item.value}}\" data-zcqa=\"qAOptions_{{item.value}}\" id=\"qAOptions_{{entityId}}_{{item.value}}\" class=\"{{if(expHandlers(item.value,'==','more'),'cxLvCDefault','')}}\"> {{item.name}} <template is=\"if\" value=\"{{expHandlers(item.value,'==',&quot;more&quot;)}}\"><template case=\"true\"> <span class=\"cxLvMoreOptDropdownIcon\"></span> </template></template> </lyte-menu-item> </template></template></template></template></template></template> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu on-open=\"{{method('addMoreOptions')}}\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsActivityMenu cxLvMoreOptionsMenu cxLvMoreOptionLongMenu\" lt-prop-event=\"hover\" lt-prop-query=\"#qAOptions_{{entityId}}_more\" lt-prop-freeze=\"false\" lt-prop-position=\"right\" on-close=\"{{method('clearSelected','more')}}\" on-before-close=\"{{method('onbeforeCallsMenuClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"moreOptions_{{entityId}}\" data-zcqa=\"moreOptions_{{entityId}}\"> <template is=\"for\" items=\"{{activitiesMenu}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"{{if(expHandlers(expHandlers(item.value,'==','create_call'),'&amp;&amp;',item.isNewCallView),'cxLvCDefault','')}}\" data-value=\"{{item.value}}\" data-zcqa=\"moreOptInQAOpt_{{item.value}}\" id=\"moreOptions_{{entityId}}_{{item.value}}\" onclick=\"{{action('moreActionsValue',item.value,this,event)}}\" onmouseenter=\"{{action('callsMenuOpen',item.value,this,event)}}\" onmouseleave=\"{{action('callsMenuClose',event)}}\"> {{item.name}} <template is=\"if\" value=\"{{expHandlers(expHandlers(item.value,'==',&quot;create_call&quot;),'&amp;&amp;',item.isNewCallView)}}\"><template case=\"true\"> <span class=\"cxLvMoreOptDropdownIcon\"></span> </template></template> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-query=\"#moreOptions_{{entityId}}_create_call\" lt-prop-event=\"hover\" lt-prop-position=\"right\" id=\"cxLvMoreOptionsCallMenu\" lt-prop-force-click=\"true\" lt-prop-yield=\"true\" lt-prop-show=\"{{lbind(showMenu)}}\" data-zcqa=\"manual_call_list_popover\" lt-prop-callout=\"true\" lt-prop-wrapper-class=\"cxLvMoreOptionsCallMenu cxLvMoreOptionsMenu {{if(isFromQuickAction,'cxLvMoreOptionLongMenu','')}}\" lt-prop-height=\"auto\" lt-prop-duration=\"0\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" on-close=\"{{method(&quot;onClose&quot;)}}\" on-before-open=\"{{method('onBeforeShow')}}\" on-menu-click=\"{{method('subMenuClick')}}\" on-before-close=\"{{method(&quot;onBeforeMenuClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvCallSubMenu\"> <lyte-menu-item data-zcqa=\"manual_schedule_call\" data-value=\"schedule\">{{cruxGetI18n('crm.label.schedule.call')}}</lyte-menu-item> <lyte-menu-item data-zcqa=\"manual_complete_call\" class=\"{{if(isLiteUser,'cxLvDisabled','')}}\" data-value=\"manual\">{{cruxGetI18n('crm.manualcalllist.complete.call')}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <lyte-menu on-before-open=\"{{method('onCallsMenuOpen')}}\" on-close=\"{{method('onMenuClose')}}\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\"#cxLvMore_{{entityId}}\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cxLvCallMoreOption\" data-zcqa=\"callMoreOption\"> <template is=\"if\" value=\"{{hasCompleteAction}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvCompleteCallMoreOption\" onclick=\"{{action('showCallPopup','Completed')}}\" data-zcqa=\"completeCallMoreOption\">{{cruxGetI18n('crm.label.mark.completed')}} </lyte-menu-item> </template></template><template is=\"if\" value=\"{{cxPropHasEditPermissionForCalls}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvScheduleCallMoreOption\" onclick=\"{{action('showCallPopup','Scheduled')}}\" data-zcqa=\"scheduleCallMoreOption\">{{cruxGetI18n('crm.label.reschedule.call','call')}}</lyte-menu-item> <lyte-menu-item id=\"cxLvCancelCallMoreOption\" onclick=\"{{action('showCallPopup','Cancelled')}}\" data-zcqa=\"cancelCallMoreOption\">{{cruxGetI18n('crm.label.cancel.call','call')}}</lyte-menu-item> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu id=\"cxLvAppoinmentMoreOptionsMenu\" on-before-open=\"{{method('onCallsMenuOpen')}}\" on-close=\"{{method('onMenuClose')}}\" lt-prop-wrapper-class=\"cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\"#cxLvAppMore_{{entityId}}\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"appMoreOptionList\" data-zcqa=\"appMoreOptionList\"> <template is=\"if\" value=\"{{expHandlers(isScheduled,'&amp;&amp;',cxPropHasEditPermissionForApp)}}\"><template case=\"true\"><template is=\"if\" value=\"{{hasCompleteAction}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvCompleteAppMoreOption\" onclick=\"{{action('showAppPopup','appointmentCompletePopup',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"completeAppMoreOption\"> {{cruxGetI18n('crm.appointments.status.markcompleted1')}}</lyte-menu-item> </template></template> <lyte-menu-item id=\"cxLvRescheduleAppMoreOption\" onclick=\"{{action('showAppPopup','Reschedule_Information',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"rescheduleMoreOption\"> {{cruxGetI18n('crm.appointments.status.markreschedule',cxGetSingularLabel('Appointments'))}}</lyte-menu-item> <lyte-menu-item id=\"cxLvCancelAppMoreOption\" onclick=\"{{action('showAppPopup','Cancellation_Information',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"cancelAppMoreOption\" class=\"cxLvAppointMenuItemSplit\"> {{cruxGetI18n('crm.appointments.status.markcancel',cxGetSingularLabel('Appointments'))}}</lyte-menu-item> </template></template> <template is=\"if\" value=\"{{cxPropHasEditPermissionForApp}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvEditAppRecordbtn\" onclick=\"{{action('eventEditPopup',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"editAppRecordbtn\">{{cruxGetI18n('Edit')}}</lyte-menu-item> </template></template><template is=\"if\" value=\"{{cxPropHasDeletePermissionForApp}}\"><template case=\"true\"> <lyte-menu-item id=\"cxLvDeleteAppRecordbtn\" onclick=\"{{action('deleteApp',this)}}\" data-params=\"{&quot;module&quot;:&quot;Appointments&quot;,&quot;id&quot;:&quot;{{entityId}}&quot;,&quot;from&quot;:&quot;listview&quot;}\" data-zcqa=\"deleteAppRecordbtn\"> {{cruxGetI18n('Delete')}}</lyte-menu-item> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-position=\"downAlignLeft\" id=\"cxLvCustomBtnMenu\" lt-prop-wrapper-class=\"cxLvCustBtnMenu cxLvMoreOptionsMenu\" lt-prop-yield=\"true\" lt-prop-freeze=\"false\" lt-prop-event=\"click\" lt-prop-query=\"#customBtnList_{{cxPropId}}\" on-before-open=\"{{method('customBtnClick')}}\" on-menu-click=\"{{method('executeCustomButtonMethod')}}\" on-open=\"{{method('makeSortableBtn')}}\" on-close=\"{{method('hideMenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"cvBtnContainer_{{cxPropId}}\"> <template is=\"if\" value=\"{{expHandlers(list_cv_btn.length,'>',5)}}\"><template case=\"true\"> <lyte-search id=\"cxLvBtnSearch_{{cxPropId}}\" lt-prop-placeholder=\"Search Button\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;#customButtonsList_{{cxPropId}}&quot;, &quot;search&quot; : &quot;lyte-menu-item&quot;}\" data-zcqa=\"CVBtnSearchBox\" on-search=\"{{method('setCss')}}\"> </lyte-search> </template></template> <div id=\"customButtonsList_{{cxPropId}}\" class=\"cxLvCustomButtonsMenuList\" onmouseleave=\"{{action('customBtnMouseOut',this)}}\"> <template is=\"for\" items=\"{{list_cv_btn}}\" item=\"action\" index=\"index\"> <lyte-menu-item data-value=\"{{action.id}}\" class=\"customButtonQuery{{action.id}}\" cscript-tag=\"customBtn_{{action.id}}\" onmouseover=\"{{action('mouseOverCustomButton','customButtonQuery',action.id,cxEncodeJS(action.name),cxEncodeJS(action.description))}}\" onmouseout=\"{{action('mouseOutCustomButton')}}\">{{action.name}}</lyte-menu-item> </template> </div> </lyte-menu-body> </template> </lyte-menu> <div id=\"cxLvCustomButtonPopover\"> <lyte-popover lt-prop-wrapper-class=\"cxLvCustomButtonPopover\" id=\"cxLvCustomButtonPopover\" lt-prop-max-width=\"400px\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <div class=\"cxLvCustPopFormElem\"> <div class=\"cxLvCustPopLabel\">{{cruxGetI18n('crm.custombutton.name')}}:</div> <div class=\"cxLvCustPopValue\">{{popoverName}}</div> </div> <template is=\"if\" value=\"{{popoverDescription}}\"><template case=\"true\"> <div class=\"cxLvCustPopFormElem cxLvCustPopFormDesc\"> <div class=\"cxLvCustPopLabel\">{{cruxGetI18n('crm.customize.custombutton.function.desc')}}:</div> <div class=\"cxLvCustPopValue\">{{popoverDescription}}</div> </div> </template></template> </lyte-popover-content> </template> </lyte-popover> </div> <lyte-menu lt-prop-query=\"span#showMoreDesc\" id=\"LvMoreDescMenu\" lt-prop-freeze=\"false\" lt-prop-wrapper-class=\"cxLvDescMenuPopup LvDescMenuPopup_{{cxPropId}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"10\" lt-prop-event=\"click\" lt-prop-prevent-inside-click=\"true\" lt-prop-type=\"box\" lt-prop-width=\"auto\" lt-prop-height=\"auto\" on-before-open=\"{{method('onBeforeDescMenuOpen')}}\" on-before-close=\"{{method('onHideDescMenu')}}\" on-open=\"{{method('onDescMenuOpen')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxLvDescMenuBody\"> <span class=\"cxLvDescCloseIcon\" onclick=\"{{action('onDescMenuClose')}}\"></span> <pre class=\"cxLvDescContDiv\">{{descDescription}}</pre> </lyte-menu-body> </template> </lyte-menu> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"text","position":[1,2,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3]},{"type":"text","position":[5,1]},{"type":"attr","position":[7]},{"type":"text","position":[7,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"text","position":[3,3,0]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"attr","position":[5,3,1]},{"type":"if","position":[5,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[5,3,3]},{"type":"attr","position":[5,3,5]},{"type":"attr","position":[5,3,5,1]},{"type":"registerYield","position":[5,3,5,1],"dynamicNodes":[]},{"type":"registerYield","position":[5,3,5,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,5],"dynamicNodes":[]},{"type":"registerYield","position":[5,3,5,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[3]},{"type":"text","position":[3,1]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"text","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,13],"dynamicNodes":[]},{"type":"attr","position":[5,3,5,15]},{"type":"if","position":[5,3,5,15],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,17],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[5,3,5,19]},{"type":"if","position":[5,3,5,19],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,21],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background: '","recordObj.$colour_code"]}}}}]}},"default":{}},{"type":"text","position":[1,3]}]},{"type":"registerYield","position":[5,3,5,23],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[5,3,5,25],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxGetCVPicklistStyleObj","args":["recordObj[fieldObj.api_name]","fieldObj"]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,27],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,29],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]},{"type":"registerYield","position":[5,3,5,31],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"registerYield","position":[5,3,5,33],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"registerYield","position":[5,3,5,35],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5,3,5,37]},{"type":"if","position":[5,3,5,37],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]}},"default":{}},{"type":"registerYield","position":[5,3,5,39],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,3,5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"registerYield","position":[9,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[9]},{"type":"attr","position":[11]},{"type":"registerYield","position":[11,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[11]},{"type":"attr","position":[13]},{"type":"registerYield","position":[13,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[13]},{"type":"attr","position":[15]},{"type":"registerYield","position":[15,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[15]},{"type":"attr","position":[17]},{"type":"registerYield","position":[17,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[17]},{"type":"attr","position":[19]},{"type":"registerYield","position":[19,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[19]},{"type":"attr","position":[21]},{"type":"registerYield","position":[21,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[21]},{"type":"attr","position":[23]},{"type":"registerYield","position":[23,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"text","position":[2,1]},{"type":"componentDynamic","position":[2]},{"type":"attr","position":[4]},{"type":"text","position":[4,1]},{"type":"componentDynamic","position":[4]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[23]},{"type":"attr","position":[25]},{"type":"registerYield","position":[25,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[25]},{"type":"registerYield","position":[27,1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,3,0]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[27,1]},{"type":"attr","position":[29]},{"type":"registerYield","position":[29,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[29]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropNoRecordsMessage","cxPropPinedFieldsLimit","cxPropShowSelectBox","cxPropPinedFieldsLength","cxPropDisplayField","cxPropFieldMapping","cxPropSortByComp","cxPropModuleActionsMenu","cxPropCvid","cxPropShowManageColumn","cxPropPerPage","cxPropSearchLetter","cxPropPage","cxPropSearchField","cxPropModule","cxPropHasEditPermissionForCalls","cxPropHasDeletePermissionForApp","cxPropHasEditPermissionForApp","cxPropMaxColCnt","cxPropAdmin","cxPropSystemName","cxPropFetchCountValues","cxPropId","cxPropUserDetailsId","cxPropMassOperationTotalLimit","cxPropUserDetailsIsPaidUser","cxPropUserDetailsMaxRange","cxPropIsActivitySplitDone","cxPropUserDetailsProfileName","cxPropUserDetailsCrmImpliedCreateCalls","cxPropUserDetailsCrmImpliedCreateEvents","cxPropUserDetailsCrmImpliedCreateAppointments","cxPropCrmImpliedEditModule","cxPropIsInventoryModule","cxPropModuleApiName","cxPropIdModuleMapping","cxPropModuleInfo","cxPropDefaultUiTypeCruxMapping","cxPropGetModuleDisplayNameInActivities","cxPropMaxSelectCount","cxPropModuleId","cxPropModuleApiMapping","cxPropModuleRecordMapping","cxPropIsLinkToNotSupported","cxPropShowEditIcon","cxPropShowQuickActionsMenu","cxPropShowCheckbox","cxPropShowSearchLetter","cxPropShowMoreOption","cxPropShowMoreOptionAfterEdit","cxPropShowCloseIcon","cxPropSuffixYields","cxPropShowPerPageDropdown","cxPropShowMaxSelectTooltip","cxPropProfileId","cxPropColumnCellClass","cxPropDisabledList","cxPropSortColumns","cxPropDisableRowClass","diableHeaderCheckbox","cxPropExpressTable","cxPropAllowEncryptedFields","cxPropPerPageOptions","cxPropPrefixYields","cxPropCustomButton","cxPropCustomView","cxPropListViewContent","cxPropRelatedList","cxPropRecordCount","cxPropIsLookupYield","cxPropSmartFilterYield","cxPropShowSortIcon","cxPropBodyPrefixYield","cxPropHeaderPrefixYield","cxPropShowLvHeader","cxPropSelectedIds","cxPropShowCustomButton","cxPropShowActivityBadge","cxPropIsNewCallView","cxPropPinUnpinColumn","cxPropShowSelectAll","cxPropShowTotalRecordCount","cxPropFireBulkRequest","cxPropLvSummaryYield","cxPropActivityBadgeUpgradeEnabled","cxPropPermissions","cxPropMaxSelectColumn","cxPropEnableHideColumn","cxPropColumnListDataBind","cxPropEnableFieldSort","cxPropHeaderProperties","cxPropDateProperties","cxPropDatetimeProperties","cxPropEnableAllFieldSort","cxPropTableClass","LvHeader","LvContent","show_loading","total_new_count","doEnablePinnedColAnim","persistPinUpdate","persistWidthUpdate","persistWrapUpdate","selectedCount","actionsForStopProcessingRec","countFetched","manage_columns_visible","popoverName","popoverDescription","position","customButtonFocus","isOptionOpened","activity_badge","selected_count","cxPropLookupProperties","lookupProperties","updateWidthValue","width_prev_cvid","clip_mode","startRecord","dropDownOptions","isManageColumnsEnabled","list_cv_btn","selectedRecords","selectViewArray","showSelectedDiv","showAlphaDropBox","sortingOrder","startIndex","start_record","end_record","selected_fields","selected_fields1","ordered_fields","ordered_fields1","showPopoverfooter","showModal","appointmentHiddenFields","tasksHiddenFields","servicesHiddenFields","from","type","featureName","property_fields","columnListOpen","disableResetOption","showCont","cxPropIsResizeEnabled","selectAllEntity","islockedListView","recordObjForQuickAction","hasCompleteAction","quickActionMenu","headerYields","cv_width_updated","isStickyTable","sortDetails","clientAccount","from_page","activitiesMenu","custom_view","cv_mod_fields","cv_mod_pined_fields","showToolTip","sortIconFieldId","last_pop_entity","ShowLvLoading","errorDetails","descDescription","isLvWrapper","per_page_val","disableHideOpt","cxPropCellSuffixYield","isColumnListSaveDisabled"],
_observedAttributesType :["string","number","boolean","number","object","object","object","array","string","boolean","number","string","number","string","string","boolean","boolean","boolean","number","boolean","string","boolean","string","string","number","boolean","number","boolean","string","boolean","boolean","boolean","boolean","boolean","string","object","object","object","string","number","string","object","object","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","boolean","boolean","string","string","array","boolean","string","boolean","boolean","boolean","array","array","array","object","array","array","number","boolean","boolean","boolean","boolean","boolean","boolean","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","object","number","boolean","string","boolean","object","object","object","boolean","string","array","array","boolean","string","boolean","boolean","boolean","boolean","string","array","boolean","boolean","string","string","string","boolean","boolean","string","number","object","object","boolean","string","boolean","number","array","boolean","array","boolean","array","boolean","boolean","array","number","number","number","array","array","array","array","boolean","boolean","array","array","array","string","string","string","array","boolean","boolean","boolean","boolean","boolean","boolean","object","boolean","array","object","boolean","boolean","array","boolean","string","array","object","object","array","boolean","string","string","boolean","object","string","boolean","number","boolean","boolean","boolean"],

	data : function(){
		return {
			/**
			 * @componentProperty { string } cxPropNoRecordsMessage
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropNoRecordsMessage:Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropPinedFieldsLimit
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPinedFieldsLimit : Lyte.attr('number',{default : 1}), //No I18N
			/**
			 * @componentProperty { boolean } cxPropShowSelectBox=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowSelectBox:Lyte.attr('boolean',{default:true}),
			/**
			 * @componentProperty { number } cxPropPinedFieldsLength
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPinedFieldsLength : Lyte.attr("number"), //No I18N
			/**
			 * @componentProperty { object } cxPropDisplayField
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDisplayField : Lyte.attr("object",{default :typeof crmConstants !== "undefined" && crmConstants.moduleDisplayField ? crmConstants.moduleDisplayField : {}}),//No I18N
			/**
			 * @componentProperty { object } cxPropFieldMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFieldMapping:Lyte.attr('object'),
			/**
			 * @componentProperty { object } cxPropSortByComp
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSortByComp : Lyte.attr('object',{default : {}}),
			/**
			 * @componentProperty { array } cxPropModuleActionsMenu
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleActionsMenu : Lyte.attr('array',{default :  []}),//No I18n
			/**
			 * @componentProperty { string } cxPropCvid
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropCvid : Lyte.attr("string"), //No I18n
			/**
			 * @componentProperty { boolean } cxPropShowManageColumn=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowManageColumn : Lyte.attr("boolean",{default : true}),//No I18N
            /**
             * @componentProperty { number } cxPropPerPage
             * @author rafik.shaik
             * @version 1.0.0
             */
            cxPropPerPage:Lyte.attr('number'),
			/**
			 * @componentProperty { string } cxPropSearchLetter
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSearchLetter : Lyte.attr('string',{default:"All"}),
			/**
			 * @componentProperty { number } cxPropPage
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropPage:Lyte.attr('number',{default:1}),
			/**
			 * @componentProperty { string } cxPropSearchField
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSearchField : Lyte.attr('string'),
			/**
			 * @componentProperty { string } cxPropModule
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModule:Lyte.attr('string'),
			/**
			 * @componentProperty { boolean } cxPropHasEditPermissionForCalls=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasEditPermissionForCalls : Lyte.attr("boolean", {"default" : typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Edit_Calls : false }), //No i18n
			/**
			 * @componentProperty { boolean } cxPropHasDeletePermissionForApp=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasDeletePermissionForApp : Lyte.attr('boolean', {"default" :typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Delete_Appointments : false}), 
			/**
			 * @componentProperty { boolean } cxPropHasEditPermissionForApp=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropHasEditPermissionForApp : Lyte.attr('boolean', {"default" :typeof Crm !== "undefined" ? Crm.userDetails.permissions.Crm_Implied_Edit_Appointments : false}), //No i18n
			/**
			 * @componentProperty { number } cxPropMaxColCnt
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMaxColCnt:Lyte.attr("number",{default:typeof Search !== 'undefined' ? Search.MAX_COL_CNT : 100}),
			/**
			 * @componentProperty { boolean } cxPropAdmin=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropAdmin : Lyte.attr("boolean", {"default":typeof Crm !== "undefined" ? Crm.userDetails.IS_ADMIN : false}),//No i18n
			/**
			 * @componentProperty { string } cxPropSystemName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSystemName:Lyte.attr("string"),
			/**
			 * @componentProperty { boolean } cxPropFetchCountValues=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropFetchCountValues : Lyte.attr("boolean", {default :typeof Crm !== "undefined" ? Crm.userDetails.fetchCountValues : false }), //No i18n
			/**
			 * @componentProperty { string } cxPropId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropId:Lyte.attr("string",{default:""}),
			/**
			 * @componentProperty { string } cxPropUserDetailsId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsId:Lyte.attr("string",{default:typeof Crm !== "undefined" ? Crm.userDetails.USER_ID : ""}),
			/**
			 * @componentProperty { number } cxPropMassOperationTotalLimit
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMassOperationTotalLimit:Lyte.attr("number",{default:typeof Crm !== "undefined" ? Crm.massOperationTotalLimit : 0}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsIsPaidUser=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsIsPaidUser:Lyte.attr("boolean",{default:typeof Crm !== "undefined" ? Crm.userDetails.ISPAID_USER : false}),
			/**
			 * @componentProperty { number } cxPropUserDetailsMaxRange
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsMaxRange:Lyte.attr("number",{default:typeof Crm !== 'undefined' ? Crm.userDetails.maxRange : 0}),
			/**
			 * @componentProperty { boolean } cxPropIsActivitySplitDone=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsActivitySplitDone:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.isActivitySplitDone : false}),
			/**
			 * @componentProperty { string } cxPropUserDetailsProfileName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsProfileName:Lyte.attr("string",{default:typeof Crm !== 'undefined' ? Crm.userDetails.PROFILE_NAME : ""}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateCalls=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateCalls:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Calls : false}),
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateEvents=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateEvents:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Events : false}),  
			/**
			 * @componentProperty { boolean } cxPropUserDetailsCrmImpliedCreateAppointments=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropUserDetailsCrmImpliedCreateAppointments:Lyte.attr("boolean",{default:typeof Crm !== 'undefined' ? Crm.userDetails.permissions.Crm_Implied_Create_Appointments : false}),
			/**
			 * @componentProperty { boolean } cxPropCrmImpliedEditModule=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropCrmImpliedEditModule:Lyte.attr("boolean",{default:false}),  
			/**
			 * @componentProperty { boolean } cxPropIsInventoryModule=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsInventoryModule:Lyte.attr("boolean",{default:false}),    
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleApiName:Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropIdModuleMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIdModuleMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropModuleInfo
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleInfo:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropDefaultUiTypeCruxMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropDefaultUiTypeCruxMapping:Lyte.attr("object",{default:typeof crmConstants !== "undefined" && crmConstants.defaultUiTypeToCruxMapping ? crmConstants.defaultUiTypeToCruxMapping : {}}),
			/**
			 * @componentProperty { string } cxPropGetModuleDisplayNameInActivities
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropGetModuleDisplayNameInActivities:Lyte.attr("string"),
			/**
			 * @componentProperty { number } cxPropMaxSelectCount
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropMaxSelectCount:Lyte.attr("number",{default:typeof crmConstants !== "undefined" && crmConstants.maxSelectCount ? crmConstants.maxSelectCount : 500}),
			/**
			 * @componentProperty { string } cxPropModuleId
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleId:Lyte.attr("string"),
			/**
			 * @componentProperty { object } cxPropModuleApiMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleApiMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleRecordMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { boolean } cxPropIsLinkToNotSupported=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropIsLinkToNotSupported:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowEditIcon=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowEditIcon:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowQuickActionsMenu=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowQuickActionsMenu:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowCheckbox=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowCheckbox:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { boolean } cxPropShowSearchLetter=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowSearchLetter:Lyte.attr("boolean",{default:true}),
			/**
			 * @componentProperty { boolean } cxPropShowMoreOption=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowMoreOption:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowMoreOptionAfterEdit=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowMoreOptionAfterEdit:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { boolean } cxPropShowCloseIcon=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowCloseIcon:Lyte.attr("boolean",{default:false}),
			/**
			 * @componentProperty { array } cxPropSuffixYields
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropSuffixYields:Lyte.attr("array" , {default:[]}),
			/**
			 * @componentProperty { array } cxPropPrefixYields
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowPerPageDropdown:Lyte.attr("boolean",{default:true}),
			cxPropShowMaxSelectTooltip : Lyte.attr("boolean",{default:true}),
			cxPropProfileId:Lyte.attr('string',{default:(typeof Crm !== "undefined" ? Crm.userDetails.PROFILE_ID : "")}),
			cxPropColumnCellClass : Lyte.attr("string",{"input" : true}),
			cxPropDisabledList : Lyte.attr("array",{default:[]}),
			cxPropSortColumns : Lyte.attr("boolean"),
			cxPropDisableRowClass : Lyte.attr("string",{default:""}),
			diableHeaderCheckbox : Lyte.attr("boolean",{default:false}),
			cxPropExpressTable : Lyte.attr("boolean",{default:true}),
			cxPropAllowEncryptedFields : Lyte.attr("boolean",{default:true}),
			cxPropPerPageOptions : Lyte.attr("array"),
			cxPropPrefixYields:Lyte.attr("array"),
			cxPropCustomButton:Lyte.attr("array"),
			cxPropCustomView:Lyte.attr("object"),
			cxPropListViewContent:Lyte.attr("array",{default:[]}),
			cxPropRelatedList:Lyte.attr("array"),
			cxPropRecordCount:Lyte.attr("number"),
			cxPropIsLookupYield:Lyte.attr("boolean",{default:false}),
			cxPropSmartFilterYield:Lyte.attr("boolean",{default:false}),
			cxPropShowSortIcon:Lyte.attr("boolean",{default:true}),
			cxPropBodyPrefixYield:Lyte.attr("boolean",{default:false}),
			cxPropHeaderPrefixYield:Lyte.attr("boolean",{default:false}),
			cxPropShowLvHeader:Lyte.attr("boolean",{default:true}),
			cxPropSelectedIds:Lyte.attr('array',{default:[]}),
			cxPropShowCustomButton:Lyte.attr("boolean",{default:false}),
			cxPropShowActivityBadge:Lyte.attr("boolean",{default:false}),
			cxPropIsNewCallView : Lyte.attr("boolean",{default : typeof isNewCallView !== "undefined" ? isNewCallView : true}),
			cxPropPinUnpinColumn:Lyte.attr("boolean",{default:true}),
			cxPropShowSelectAll : Lyte.attr("boolean", {default : true}),
			cxPropShowTotalRecordCount : Lyte.attr("boolean", {default:true}),
			cxPropFireBulkRequest : Lyte.attr("boolean", {default :true}),
			cxPropLvSummaryYield : Lyte.attr("boolean",{default:false}),
			cxPropActivityBadgeUpgradeEnabled : Lyte.attr("boolean",{ default : typeof Crm !== 'undefined' ? Crm.userDetails.activityBadgeUpgradeEnabled : false}),
			cxPropPermissions : Lyte.attr("object",{ default : typeof Crm !== 'undefined' ? Crm.userDetails.permissions : {}}),
			cxPropMaxSelectColumn : Lyte.attr("number"),
			cxPropEnableHideColumn : Lyte.attr("boolean", {default :true}),
			cxPropColumnListDataBind : Lyte.attr("string", {default : "lyteFastRender"}),//No I18n
			cxPropEnableFieldSort : Lyte.attr("boolean"),
			cxPropHeaderProperties: Lyte.attr("object"),
			cxPropDateProperties: Lyte.attr('object'),
			cxPropDatetimeProperties: Lyte.attr('object'),
			cxPropEnableAllFieldSort : Lyte.attr("boolean", {default :true}),
			
			cxPropTableClass: Lyte.attr("string", {default : ""}),

			//local props
			LvHeader:Lyte.attr('array',{default:[]}),
			LvContent:Lyte.attr('array',{default:[]}),
			show_loading : Lyte.attr("boolean", {default : true}), 
			total_new_count : Lyte.attr("string",{default:"###"}),
			doEnablePinnedColAnim : Lyte.attr("boolean",{default : false}), 
			persistPinUpdate : Lyte.attr("boolean", {default : true}),
			persistWidthUpdate :  Lyte.attr("boolean",{default : true}),
			persistWrapUpdate :  Lyte.attr("boolean",{default : true}),
			selectedCount:Lyte.attr("string"),
			actionsForStopProcessingRec:Lyte.attr("array",{default:[]}),
			countFetched:Lyte.attr("boolean",{default:false}),
			manage_columns_visible: Lyte.attr('boolean',{default:true}), 
			popoverName : Lyte.attr('string'), 
			popoverDescription :Lyte.attr('string'),  
			position : Lyte.attr('string'), 
			customButtonFocus : Lyte.attr('boolean',{default :false}) ,
			isOptionOpened : Lyte.attr("boolean", {default : false}),
			activity_badge : Lyte.attr("string",{default : "enabled"}), 
			selected_count:Lyte.attr("number"),
			cxPropLookupProperties : Lyte.attr("object" , {default : {}}),
			lookupProperties : Lyte.attr("object", {default : {routeName : "crm.tab.module.entity.detail", target : "_self"}}),
			updateWidthValue : Lyte.attr("boolean",{default : false}),
			width_prev_cvid : Lyte.attr("string",{default : ""}),
			clip_mode : Lyte.attr("boolean",{default : false}),
			startRecord:Lyte.attr('number',{"default":0}),
			dropDownOptions:Lyte.attr('array'),
			isManageColumnsEnabled : Lyte.attr("boolean",{default : true}),
			list_cv_btn : Lyte.attr("array",{default:[]}),
			selectedRecords:Lyte.attr('boolean',{default:true}),
			selectViewArray:Lyte.attr('array',{default:[]}),
			showSelectedDiv:Lyte.attr('boolean',{default:false}),
			showAlphaDropBox:Lyte.attr('boolean',{default:false}),
			sortingOrder:Lyte.attr('array',{default:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']}),
			startIndex:Lyte.attr('number',{default:0}),
			start_record : Lyte.attr('number'), 
			end_record : Lyte.attr('number'),
			selected_fields : Lyte.attr("array", { default : [] }),
			selected_fields1 : Lyte.attr("array", { default : [] }),
			ordered_fields : Lyte.attr("array", { default : [] }),
			ordered_fields1 : Lyte.attr("array", { default : [] }),
			showPopoverfooter : Lyte.attr("boolean", {default : false}),
			showModal : Lyte.attr("boolean", {default : false}),
			appointmentHiddenFields:  Lyte.attr("array", { default : ["RESCHEDULEDFROM","REMINDER","ENDTIME","JOBSHEETSECTION","ISJOBSHEETCREATED"]}),
			tasksHiddenFields: Lyte.attr("array", { default : ["REMINDAT","SENDNOTIFICATION"]}),
			servicesHiddenFields : Lyte.attr("array", { default : ["AVAILABLE_DATES","AVAILABLE_DAYS","UNAVAILABLE_TILL","STARTING_DATE","CLOSING_DATE","JOBSHEETLAYOUT", "APPOINTMENTFOR","SEID", "APPOINTMENTLOCATION", "APPOINTMENTID", "APPOINTMENTADDRESS", "APPOINTMENTDATEANDTIME", "RESCHEDULEDFROM", "SERVICEID", "RESCHEDULEDTO", "RESCHEDULEDREASON", "RESCHEDULEDNOTE", "CANCELLATIONREASON", "CANCELLATIONNOTE", "SERVICEAVAILABILITY", "AVAILABLE_CUSTOM_TIMING","UNAVAILABLE_FROM"]}),
			from : Lyte.attr("string",{default:"list"}),
			type : Lyte.attr("string", { default : "popup" }),
			featureName : Lyte.attr("string"),
			property_fields : Lyte.attr("array", { default : [] }),
			columnListOpen : Lyte.attr("boolean",{default : false}),
			disableResetOption : Lyte.attr("boolean",{default : true}),
			showCont : Lyte.attr("boolean",{default:false}),
			cxPropIsResizeEnabled : Lyte.attr("boolean",{default : true}),
			selectAllEntity : Lyte.attr('boolean',{default :false}), 
			islockedListView : Lyte.attr("boolean", {default : false}),
			recordObjForQuickAction : Lyte.attr('object',{default : {}}), 
			hasCompleteAction : Lyte.attr('boolean', {"default" : true}),
			quickActionMenu : Lyte.attr('array',{default : []}),
			headerYields : Lyte.attr("object"),
			cv_width_updated : Lyte.attr("boolean", {default : false}),
			isStickyTable : Lyte.attr("boolean"),
			sortDetails:Lyte.attr('array',{default:[]}),
			// showActionBtn : Lyte.attr("boolean", { default: false }), 
			clientAccount:Lyte.attr('boolean',{default:typeof window.clientPortalName !== "undefined" && window.clientPortalName ? true : false}),
			from_page : Lyte.attr("string",{default : "listview"}), 
			activitiesMenu:Lyte.attr('array',{default:[]}),
			custom_view : Lyte.attr("object"),
			cv_mod_fields : Lyte.attr("object" , { default : {}}),
			cv_mod_pined_fields : Lyte.attr("array",{default : []}),
			showToolTip:Lyte.attr('boolean',{default:true}),
			sortIconFieldId : Lyte.attr("string"),
			last_pop_entity : Lyte.attr("string",{default : ""}),
			ShowLvLoading:Lyte.attr("boolean",{default:true}),
			errorDetails:Lyte.attr("object",{default:{"show_error":false}}),
			descDescription : Lyte.attr("string",{default : ""}),
			isLvWrapper : Lyte.attr("boolean",{default:false}),
			per_page_val : Lyte.attr("number"),
			disableHideOpt : Lyte.attr("boolean", {default : false}),
			cxPropCellSuffixYield: Lyte.attr("boolean", { default: true }),
			isColumnListSaveDisabled : Lyte.attr("boolean", {default : true})
		};
	},
	init: function(){
			var module_name = this.data.cxPropModule;
			if(this.data.cxPropPerPage == undefined){
				this.setData('cxPropPerPage',10);
			}
			if(module_name ){
				var mod_rec_map = this.data.cxPropModuleRecordMapping;
				if(mod_rec_map && Object.keys(mod_rec_map).length>0){
					if(!this.data.cxPropModuleId){
						this.setData("cxPropModuleId",mod_rec_map[module_name].id);
					}
					// if(!this.data.cxPropCvid && mod_rec_map[module_name] && mod_rec_map[module_name].custom_view){
					// 	this.setData("cxPropCvid",mod_rec_map[module_name].custom_view.id);
					// }
				} 
				if(!this.data.cxPropModuleApiName){
					this.setData("cxPropModuleApiName",this.data.cxPropModuleApiMapping[module_name]);
				}
				this.setData({'module':this.data.cxPropModule,"isStickyTable":this.checkForStickyTable()}); 
				var Lv_con=this.data.cxPropListViewContent;
				if( Lv_con && Lv_con.length > 0){
					this.setDataBeforeRender(this.data.cxPropListViewContent);
				}
				this.setData("dropDownOptions",this.constructRCOptions()); //No I18n
				this.records=[];
				this.onDataLoad=false;
				this.onBeforeLoad = true;
				this.makeApiRequests();
			}else if(this.data.isLvWrapper){
				this.setData("ShowLvLoading",false);
				if(this.getMethods("onBeforeLoadFailure")){
					/**
					* This method will be executed on failure resp at initial load;
					* @method onBeforeLoadFailure
					* @author rafik.shaik
					*/	
					this.executeMethod("onBeforeLoadFailure");//No I18n
				}
				var msg;
				if([10,20,30,40,50,100,500].indexOf(this.data.cxPropPerPage)===-1){
					msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
				}else{
					msg="Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect.";
				}
				this.setErrorMsg(msg);
			}
	},
	getFieldMeta : function(value , key='id'){
		return this.data.LvHeader.filter(fld=>fld[key] === value)[0];
	},
	didDestroy : function(){
		// window.removeEventListener('resize', this._resize, true);
		// clearTimeout(this.timerForRelatedFields);
		// this.checkForPropsUpdate();
		// window.removeEventListener('beforeunload',this._propsSave);
	},

	didConnect : function(){
		//some handling is pending
		// this._resize = true;
		if(this.data.cxPropSelectedIds && this.getData("cxPropSelectedIds").length){
			this.headerSelection();
		}
		// window.addEventListener('resize', this._resize, true);
		var getElement = $L('.lyteExpTableOrigTableInnerWrap')[0];
		var setElement = $L('#cxListViewTable');
		// this._propsSave =this.checkForPropsUpdate.bind(this);
		// window.addEventListener('beforeunload',this._propsSave);
		this.setWidthForTable();
		if(getElement && getElement.scrollWidth > getElement.clientWidth) {
			setElement.addClass('setMaxWidthForTable');
		}
		// var cxLvTableManagePopup = this.$node.querySelector('#cxLvTableManagePopup');
		// if(cxLvTableManagePopup){
		// 	cxLvTableManagePopup.ltProp({"headerPadding" : "0px 5px 0px 5px","contentPadding" : "0","footerPadding" : "8px 15px"});
		// }
		this.$node.clearSelectedRecords=()=>{
			this.clearSelectedRecords();
		}
		this.$node.getSelectedIds = ()=>{
			return this.data.cxPropSelectedIds;
		};
	},

	actions : {
		moreActionsValue:function(item){
			
		},
		showCallPopup : function(status){
			
		},
		fetchCountOnReq : function(){
			if(this.getMethods('onFetchRecordCount')){
					this.executeMethod("onFetchRecordCount",this.data.cxPropModule ,this.data.cxPropCvid);
			}else{
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== 'undefined'){
					commonUtils.showHideLoadingDiv(true);
				}
				var qp = {};
				var _this = this;
				store.triggerAction(this.data.cxPropModuleInfo.id,"count",qp).then(function(res){
					_this.setData({'total_new_count':res.count,'cxPropRecordCount':res.count,'show_loading':false});
					_this.getData('cxPropModuleInfo').total_count = res.count;//no i18n
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== 'undefined'){
						commonUtils.showHideLoadingDiv();
					}
				});
			}
			
		},
		stopEvent:function(){
			
		},
		customBtnMouseOut : function(_self){
			if(_self.parent){
				_self.parent.ltProp('show', false);
			}
		},
		executeCustomButtonAction : function(buttonId){
			var recordid  = this.getData("entityId"); //No i18n
			this.executeCustomButton(buttonId,recordid);
		},	
		stopCvBtnPropagation : function(event){
			event.stopPropagation();
		},
		mouseOverCustomButton : function(query,id,name,description,recordId){
			this.mouseOverCustomButton(query,id,name,description,recordId);
		},
		mouseOutCustomButton : function(){
			this.mouseOutCustomButton();
		},
		callsMenuOpen:function(value){
			var $manualCallListPopover = $L('#cxLvMoreOptionsCallMenu',this.$node);
			if($manualCallListPopover[0]){
				if(value === "create_call" && this.data.cxPropIsNewCallView) {
					$manualCallListPopover[0].ltProp({'show' : true});
				}else{
					$manualCallListPopover[0].ltProp({'show' : false});
				}
			}
		},
		callsMenuClose:function(event){
			var closePopOver =  ! ( event.relatedTarget._callee !== undefined && event.relatedTarget._callee.nodeName === 'CRUX-LIST-VIEW' || event.relatedTarget.className !== undefined && event.relatedTarget.className.indexOf('aOptMenuIcon') !== -1  || event.relatedTarget.id !== undefined && event.relatedTarget.id.indexOf('_create_call') !== -1 || event.fromElement !== undefined && event.fromElement.id.indexOf('_create_call') !== -1 || event.currentTarget.id !== undefined && event.currentTarget.id.indexOf('_create_call') !== -1 ) ;
			if (closePopOver){
				var $manualCallListPopover = $L('#cxLvMoreOptionsCallMenu',this.$node);
				if($manualCallListPopover[0]){
					$manualCallListPopover[0].ltProp({'show' : false});
				}
			}
		},
		selectedAllEntity:function(){
			var mod_info = this.data.cxPropModuleInfo;
			var _self = this;
			if(!_self.getData('countFetched')){
				var queryObj = {"cvid" : this.data.cxPropCvid, module: mod_info.module_name, "approved" : true };
				// searchLetter = Lyte.Router.getRouteInstance().getQueryParams().cxPropSearchLetter;
				var searchLetter = _self.data.cxPropSearchLetter;
				//added for ZOHO-CRM-I242930
				if(mod_info.territory && mod_info.territory.id){
					queryObj.territory_id = mod_info.territory.id;
					if(mod_info.territory.subordinates){
						queryObj.include_child =  mod_info.territory.subordinates;
					}
				}if(searchLetter && searchLetter !== "All"){
					queryObj.alphabet = searchLetter;
				}
				store.triggerAction(mod_info.id,"count",queryObj).then(function(res){ //No i18n
					var module_info  = _self.data.cxPropModuleInfo;
					// module_info.selected_count = res.count;
					_self.setData("selected_count",res.count);
					_self.selectAllDivAction(module_info, _self);
					if(!queryObj.alphabet){
						_self.setData('countFetched',true);//no i18n
					}
				},function(error) {
					var eResp = error.response ? JSON.parse(error.response) : undefined;
					if(error.status === 403 || eResp && eResp.code === "NO_PERMISSION"){
						if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
							renderingUtils.displayPermissionDenied();
						}else{
							Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
						}
			        }
				}.bind(this));
			}else{
				this.selectAllDivAction(mod_info,_self);
			}
		},
		stopPropagation:function(event){
			event.stopPropagation();
			event.cancelBubble = true;
		},
		onUnsortClick:function(value){
			// var sort_by=store.peekRecord('custom_view',this.data.cvid).sort_by
			if(!(this.getData("custom_view.sort_by") && this.getData("custom_view.sort_by.id"))){
				return;
			}
			this.sortRecord(value,undefined,undefined,undefined,this.getData("custom_view.sort_by"),this.getData("custom_view.sort_by").id);//No I18N
		},
		alphaSearchHandling: function() {
			this.setData({"cxPropSearchLetter":"All","cxPropSearchField":undefined});
			if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
				this.selectAllEntity(true);
			}
			this.getCount = true;
			this.setData("show_loading",true);
			// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// this.setData({"custom_view":resp,'listfields':resp.fields})
				this.fetchRelatedRecords();
			// }.bind(this))
        },
		showIcons:function(id,_self){
			var selfList = _self.classList;
				if(!selfList.contains('cxLvTableRowHover')){ //No I18N
					selfList.add( 'cxLvTableRowHover' );//No I18N
				}
				var relList = _self._relatedRow ? _self._relatedRow.classList : undefined;
				if( relList && !relList.contains('cxLvTableRowHover')){ //No I18N
					relList.add('cxLvTableRowHover');//No I18N
				}	
				var customBtnId = ".lyteExpTableOrigTableInnerWrap #customButtonDetails_" + id; //No I18N
				var customBtn = $L("#cxLvCustomBtn");
				this.setData('entityId',id)	;
			if(customBtn[0] && $L(customBtnId)[0] && $L(customBtnId)[0].childElementCount === 0){
				LyteComponent.appendChild($L(customBtnId)[0],customBtn[0]);
				// this.addsortable();
			}
			if(this.getData("clip_mode") && id !== this.getData('last_pop_entity')){
				this.setData('last_pop_entity',id);//No I18N
				var textFields = _self.getElementsByClassName('cxLvTextAreaElem'),//No I18N
				relRowFields = _self._relatedRow ? _self._relatedRow.getElementsByClassName('cxLvTextAreaElem') : [];//No I18N
				//For text fields popup
				var showDesc = function(field){
					var popElem = field.getElementsByClassName('showMoreAddedEvents')[0];
					if(popElem){
						var preElem = field.getElementsByTagName('pre')[0];
						if(preElem){
							if( preElem.scrollWidth > preElem.offsetWidth){
								popElem.classList.remove('cxLvDescBtnHide');//No I18N
							}else{
								popElem.classList.add('cxLvDescBtnHide');//No I18N
							}
						}
					}
				};
				if (textFields && Array.isArray(textFields) && textFields.forEach) {
					textFields.forEach(showDesc);
				}
				// if (relRowFields && Array.isArray(relRowFields)) {
					 relRowFields.forEach(showDesc);
				// }
		}
		if(_self){
			_self.classList.remove("trialyellowbox", "list-border-left");
			if(_self._relatedRow){
				_self._relatedRow.classList.remove("trialyellowbox", "list-border-left");
			}
		}
		// _self ? _self.classList.remove("trialyellowbox", "list-border-left") : "";//No I18n
		// _self && _self._relatedRow ? _self._relatedRow.classList.remove("trialyellowbox", "list-border-left") : "";//No I18n



		},
		hideIcons:function(id,_self){
			var selfList = _self.classList;
			var editIcon = $L('.moreOptionIcon'); //No I18N
			var moreIcon = $L(_self).find('crmutil-icon.moreOptionSvg'); //No I18N
			if(selfList.contains('cxLvTableRowHover') && !(editIcon.length > 0 && editIcon[0].classList.contains('lyteMenuSelected') || moreIcon.length > 0 && moreIcon[0].classList.contains('lyteMenuSelected'))){ //No I18N
				selfList.remove('cxLvTableRowHover');//No I18N
			}
			var relList = _self._relatedRow ? _self._relatedRow.classList : undefined;
			if( relList && !relList.contains('cxLvTableRowHover')){ //No I18N
				relList.remove('cxLvTableRowHover');//No I18N
			}

		},
		resetColumnWidth:function(){
			 var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
			 if(!custom_view){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			 }
			var cv_fields = [],
			updateNeeded = false,
			_expTable = $L('#cxListViewTable',this.$node) ,tmpObj;
			this.setData("showCont",false);
			if(this.getData("cv_width_updated")){
				this.loderStarts(true);
				setTimeout( function() {
					if(_expTable[0] && _expTable[0].getData('ltPropStickyTable')){
						_expTable.find('.lyteExpOriginalTable').css("width","");//No I18N	
					}
					custom_view.fields.forEach(function(field){
						tmpObj = Object.assign({},field);
						if(tmpObj._width){
							updateNeeded =  this.getData('persistWidthUpdate');
							tmpObj._width = undefined;
							delete tmpObj._width;
						}
						cv_fields.push(tmpObj);
					}.bind(this));
					var cfLen = this.getData("LvHeader").length,tagWidth;
					if(updateNeeded){
						custom_view.$ ? custom_view.$.set("fields", cv_fields) : custom_view.fields = cv_fields;//No I18N
						var LoadingDiv=typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined";
						if(LoadingDiv){
							commonUtils.showHideLoadingDiv(true);
						}
						// var cvObj = {id : module_info.custom_view.id};
						// var qp = {module : module_info.api_name};
						// if(this.data.isFromModal){
						// 	this.setFeatureSpecificParams(qp, this.data.featureName);
						// }
						//comment out
						// store.triggerAction("custom_view","reset_width",cvObj,qp).then(function(res){ //No I18N
							if(LoadingDiv){
								commonUtils.showHideLoadingDiv(false);
							}
							for(var i = 0 ; i < cfLen ; i++){
								//Added since crux-table is unbound
								if(this.data.LvHeader[i].api_name === "Tag"){
									tagWidth = this.getDefaultWidthForField(this.data.LvHeader[i].ui_type) + "px"; //No I18n
									this.reRenderTagComponent(this.data.clip_mode, tagWidth);
									Lyte.objectUtils(this.data.LvHeader[i],"add","tagWidth",tagWidth);//No I18N
								}
								Lyte.objectUtils(this.data.LvHeader[i],"delete","width");//No I18N
								Lyte.objectUtils(this.data.LvHeader[i],"add","style","");//No I18N
							}
							this.setData({"cv_width_updated":false,"width_prev_cvid":"","cv_mod_fields":new Map()});
							if(_expTable[0]){
								
								_expTable[0].setColumnWidth();
								_expTable[0].setVisibleFixedHeader();
							}
							setTimeout(function(){
								if(!this.getData('clip_mode')){
									// this.setHeight();
								}
								this.loderStarts(false);
							}.bind(this),0);
						// },function(res){
						// 	custom_view.$.rollBack();
						// 	if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
						// 		commonUtils.showHideLoadingDiv(false);
						// 	}
						// 	_self.loderStarts(false);
						// }.bind(this));
					}else{
						for( var j = 0 ; j < cfLen ; j++ ){
							if(this.data.LvHeader[j].api_name === "Tag"){
								tagWidth = this.getDefaultWidthForField(this.data.LvHeader[j].ui_type) + "px"; //No I18n
								this.reRenderTagComponent(this.data.clip_mode, tagWidth);
								Lyte.objectUtils(this.data.LvHeader[j],"add","tagWidth",tagWidth);//No I18N
							}
							Lyte.objectUtils(this.data.LvHeader[j] ,"add" ,"style","");//No I18
						}
						this.setData({"cv_mod_fields":new Map(),"cv_width_updated":false,"width_prev_cvid": ""});
						if( _expTable ){
							_expTable[0].setColumnWidth();
							_expTable[0].setVisibleFixedHeader();
						}
						setTimeout(function(){
							if(!this.getData('clip_mode')){
								// this.setHeight();
							}
							this.loderStarts(false);
						}.bind(this),0);
					}
				}.bind(this), 0);
				// event.stopPropagation();
				this.setData('isResetClick',true);
			}
		},
		changeWrap:function(view){
			this.loderStarts(true);
			 this.setData("showCont",false);//No I18N
			 setTimeout( function() {
					var clip_mode = view === 'clip',//No I18N
					_expTable = $L('#cxListViewTable',this.$node)[0];
					this.setData({'isOptionOpened':false,"clip_mode":clip_mode});
					// this.setData("isNeedWrapPersist", true);//No I18N
					//Added since crux-table is unbound
					var tagField = this.data.LvHeader.filter(function(field){ return field.api_name === 'Tag' ; });//No I18N
					if(tagField.length){
						this.reRenderTagComponent(clip_mode, tagField[0].tagWidth);
					}
					if(_expTable){
						_expTable.fixRowHeight();
						_expTable.fixColumn();
					}
					setTimeout(function(){	
						// _this.setHeight();
						this.loderStarts(false);
					}.bind(this),0);
			 }.bind(this), 0);
			// event.stopPropagation();
		},
		closePopover:function(){
			// this.setData('closePopover',true);
			this.hidePopover();
		},
		saveCustomView:function(){
			this.addCVFieldsInRecordFetch = true
			var columnList = $L("crux-column-list" , this.columnListModal)[0].component,
			ordered_fields = columnList.getSelectedFields(), property_fields =  columnList.getSelectedPropertyFields(),activity_badge_selected_Ui,pined_fields_Change = false,containsPinField = false;
			var arr = [];
			var lookarr = [];
			var lookText = "";
			var _self = this;
	
			var prev_cv_width_conf = new Map();
			var pined_fields = this.getData('cv_mod_pined_fields');
			var cv_width_map = this.getData("cv_mod_fields") ? this.data.cv_mod_fields : new Map();
			var widthChanged = cv_width_map.size > 0;
			var customview = this.data.custom_view ||  store.peekRecord('custom_view',this.getData('cxPropCvid')) ;
			var tmpMap = new Map();
			_self.pinUpdateFailed = false;
			var prevPinLength = pined_fields.length;
			if(_self.data.from === 'list'){
				customview.fields.forEach(function(field){
					if(field._width){
						prev_cv_width_conf.set(field.id , field._width);
			    	}
				});
			}
			pined_fields.forEach(function(pined_field) {
				var pined_field_present;
				ordered_fields.forEach(function(field) {
					if(pined_field_present === undefined && field.id === pined_field) {
						pined_field_present = true;
					}
				});
				if(!pined_field_present) {
					pined_fields.removeFirstOccurenceOfElement(pined_field);
				}
			});
			var _pinFieldWidth = 0, _pinFieldLen = 0;
			/* eslint-disable @zoho/webperf/no-multipleDOMLookup */
			ordered_fields.forEach(function(item){
				if(item && item.selected && (item.pinned || pined_fields.includes(item.id))){
					_pinFieldWidth += widthChanged  ? cv_width_map.has(item.id) ? cv_width_map.get(item.id) : item.width ? item.width : _self.getDefaultWidthForField(item.ui_type) : prev_cv_width_conf.has(item.id) ? prev_cv_width_conf.get(item.id) : _self.getDefaultWidthForField(item.ui_type);
					_pinFieldLen++;
				}
			});
			var presentPinFields = [];
			ordered_fields.forEach(function(item){
				if(item && item.selected){
					var obj = { api_name : item.api_name, id : item.id, _pin : item.pinned !== undefined ? item.pinned :  pined_fields.includes(item.id)};
				
				var index = pined_fields.indexOf(item.id);
				switch(obj._pin){
					case true:
						if(item._pin_order){
							obj._pin_order = item._pin_order;
						}
						// if(index===-1){
						// 	pined_fields.push(item.id)
						// 	presentPinFields.push(obj);
						// 	pined_fields_Change = true;
						// }
						if(index === -1 || item._pin_order && index + 1 !== item._pin_order){
							if(index !== -1){
								pined_fields.splice(index,1);
							}
							pined_fields.splice(item._pin_order - 1,0,item.id);
							presentPinFields.push(obj);
							pined_fields_Change = true;
						}
						containsPinField = true;
							break;
					case false:
						if(index !== -1){
							pined_fields.splice(index,1);
								pined_fields_Change = true;
						}
						break;
				}
				if(_self.data.from === 'list'){
					var pinedWidthChanged = false;
					if(obj._pin){
						var columnWidth = widthChanged  ? cv_width_map.has(item.id) ? cv_width_map.get(item.id) : item.width ? item.width : _self.getDefaultWidthForField(item.ui_type) : prev_cv_width_conf.has(item.id) ? prev_cv_width_conf.get(item.id) : _self.getDefaultWidthForField(item.ui_type);
						// var tableWidth = document.querySelector('.lyteExpTableOrigTableInnerWrap').clientWidth; //No I18n
						var tableWidth = $L(".lyteExpTableOrigTableInnerWrap",this.$node)[0].clientWidth;
						var fixedPrefixColumnsWidth = _self.calculatefixedColumnWidth();
						// if(columnWidth && tableWidth) {
							// 100 px - for ManageColumns and remaining pixel(10%)
							if(columnWidth && tableWidth && fixedPrefixColumnsWidth + _pinFieldWidth + 100 > tableWidth) {
								cv_width_map.set(item.id, Math.round((tableWidth - fixedPrefixColumnsWidth - 100) / _pinFieldLen));
								pinedWidthChanged = true;
							}
				
						// }
					}
					if(!pinedWidthChanged) {
						if( widthChanged ){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
							if(!cv_width_map.has(item.id)){
								var width = item.width ? item.width : _self.getDefaultWidthForField(item.ui_type);
								cv_width_map.set(item.id, width);
							}
						}else if(prev_cv_width_conf.has(item.id)){
							cv_width_map.set( item.id, prev_cv_width_conf.get(item.id) );
						}
						else{
							tmpMap.set(item.id, _self.getDefaultWidthForField(item.ui_type));
						}
					}
				}
				if(item.data_type === "lookup"){
					lookarr.push(item);
					lookText = lookText.concat(item.field_label + ', ');
				}
				arr.push(obj);
			}
			});
			/* eslint-enable @zoho/webperf/no-multipleDOMLookup */
			if(_self.data.from === 'list'){
				if(tmpMap.size > 0 && cv_width_map.size > 0){
					tmpMap.forEach(function(width, id){
						cv_width_map.set(id , width);
					});
				}
				if(cv_width_map.size > 0 ){
					_self.setData('cv_width_updated',true);//No I18n
					_self.setData("width_prev_cvid", customview.id);//No I18n
				}
			}
			var moduleInfo = this.data.cxPropModuleInfo ;
			var activity_badge_selected = property_fields.find(element => element.api_name === 'activity_badge');
			var activityBadge = this.getData('activity_badge').toLowerCase() , tempObj;
			let selFields1 = this.data.selected_fields1.map(function(x) {
				tempObj = {api_name: x.api_name, id: x.id , _pin: x.pinned !== undefined ? x.pinned : pined_fields.includes(x.id)};
				if(tempObj._pin && x._pin_order){
					tempObj._pin_order = x._pin_order;
				}
				return tempObj;
			});
			if(  activity_badge_selected === undefined && activityBadge && activityBadge === "enabled")
			{
				activity_badge_selected_Ui = "disabled"; //No I18n
			}
			else if( activity_badge_selected !== undefined && activityBadge && activityBadge === "disabled")
			{
				activity_badge_selected_Ui = "enabled"; //No I18n
			}
			if(this.data.selected_fields1.map(x => x.api_name).join() === arr.map(x => x.api_name).join() && JSON.stringify(selFields1) === JSON.stringify(arr) && activity_badge_selected_Ui === undefined) {
				this.fieldmodified = false;
				// if(this.data.ordered_fields.length === this.data.selected_fields1.length){
					this.hidePopover();
				// }
				return;
			}

			var isFieldUpdate = false;
			if(this.data.selected_fields1.length !== arr.length){
				isFieldUpdate = true;
			}
			if(!isFieldUpdate){
				var fieldsLength = arr.length;
				for(var i = 0;i < fieldsLength;i++){
					if(arr[i].id !== this.data.selected_fields1[i].id || arr[i].api_name !== this.data.selected_fields1[i].api_name){
						isFieldUpdate = true;
						break;
					}
				}
			}

			if(lookarr.length > 5){
				// getElemById('lookupCrt').style.display='none';
				// getElemById('lookupSelect').style.display='';
				// getElemById('lookupSelectCol').innerText = lookText;
				this.setData("closePopover",false); //No I18N
				// showAnimatePopup('lookupErrorMsg'); //No I18N
				$L('.cxColumnListNew').addClass('popupLookupEnable');
			}else if(this.getMethods("onSaveCustomView")){
					/**
					 * This method will be executed on save of custome view
					 * @method onSaveCustomView
					 * @author rafik.shaik
					 */
					this.executeMethod("onSaveCustomView",arr);//no i18n
				}else{
					var columPrimBtn = $L("#columnlistPrimaryBtn")[0];
					// columPrimBtn.setData("ltPropDisabled", true); //no i18n
					// if(this.getMethods("onSaveCustomView")){
					// 	this.executeMethod("onSaveCustomView",arr,this);//no i18n
					// }
		_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

					var paramObj = {"module":_self.data.cxPropModuleInfo.api_name};//No I18N
					// if(customview.$==undefined){
					// 	_self.hidePopover();
					// 	_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid meta Data/custom_view info has been provided'}});
					// 	return ;
					// }
					customview.$ ? customview.$.set("fields",arr) : ( customview.fields = arr ); //No I18n
					var noPrevPinField = !prevPinLength && pined_fields_Change;
					var cvObj = {fields : noPrevPinField ? presentPinFields : customview.fields, id : this.getData('cxPropCvid')}; //No I18N
					// var _self = this;
					if(!isFieldUpdate){
						if(activity_badge_selected_Ui){
							this.activityBadgeUpdate(moduleInfo,activity_badge_selected_Ui,columPrimBtn,isFieldUpdate);
						}
						if(pined_fields_Change){
							this.pinUnpinUpdate(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField);
						}
						this.fieldmodified = false;
						// if(this.data.ordered_fields.length === this.data.selected_fields1.length){
						// 	this.hidePopover();
						// }
						this.hidePopover();
						return;
					}
					// customview.$.set("fields",arr); //No I18n
					if(this.data.custom_view.sort_by && this.data.custom_view.sort_order){
						this.setData("show_loading",true);
						this.getCount = true;
					}
					customview.$ ? customview.$.set("sort_order",null) : (customview.sort_order=null);
					customview.$ ? customview.$.set("sort_by",null) : (customview.sort_by=null);
					columPrimBtn.setData("ltPropDisabled", true); 
					if(activity_badge_selected_Ui !== undefined){
							this.activityBadgeUpdate(moduleInfo,activity_badge_selected_Ui,columPrimBtn,true);
					}
					// customview.$.save({crux_feature_type:"listviewSave"},paramObj).then(function(){
						if(pined_fields_Change){
							_self.pinUnpinUpdate(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField);
						} else {
							_self.setData({cv_mod_pined_fields:pined_fields, cxPropPinedFieldsLength:pined_fields.length});
						}
						this.onDataLoad=false;
						this.setData('cxPropListViewContent',[]);
						this.onDataLoad=true;
						this.records=[];
						// store.unloadAll(_self.data.cxPropModuleInfo.id);
						var qp = {};
						var page = qp && qp.page || _self.data.startIndex > 1 ? Math.round(_self.data.startIndex / Number(_self.data.cxPropPerPage)) + 1 : 1;
						var queryObj = {"module" :_self.data.cxPropModule ,  "page" : page, "per_page" : _self.data.cxPropPerPage,approved: "both",cvid:_self.data.cxPropCvid }; //No I18n
						if(_self.data.cxPropSearchLetter && _self.data.cxPropSearchField){
							queryObj.alphabet = _self.data.cxPropSearchLetter;
							queryObj.alphabetical_index_field = _self.data.cxPropSearchField;
						}
						//  this.beforeRecordAPI(queryObj);
						if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
							commonUtils.showHideLoadingDiv(true);
						}
						var doesFieldModified = _self.fieldmodified;
						_self.setData("listfields",customview.fields); //No I18n
						//  columPrimBtn.setData("ltPropDisabled", false); 
						//  _self.flag=true;
						_self.fetchRelatedRecords().then(function(){
							columPrimBtn.setData("ltPropDisabled", false); 
							_self.hidePopover();
							customview.sort_by = null;
							customview.sort_order = null;
							if( containsPinField && doesFieldModified && _self.pinFieldModified && pined_fields_Change){
								_self.setData('doEnablePinnedColAnim',true); //No I18n
								setTimeout(function(){
									_self.setData('doEnablePinnedColAnim',false); //No I18n
								},2000);
							}
							if(_self.pinUpdateFailed){
								customview.fields.forEach((obj) => {
									obj._pin = false;
									});
							}
							if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
								commonUtils.showHideLoadingDiv();
							}
						});
						_self.fieldmodified = false;
						
					// },function(XHR){
					// 	if(XHR.status == 403 || XHR.status == 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
					// 		if(typeof renderingUtils!='undefined'  && renderingUtils.displayPermissionDenied!='undefined'){
					// 			renderingUtils.displayPermissionDenied(XHR);
					// 		}else{
					// 			Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body")
					// 		}
					// 	}else if(XHR.status == 400){
					// 		_cruxUtils.showCustomAlert({
					// 			params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
					// 			close : function(){
					// 				if(_self.getMethods('onCloseShowCustomAlert')){
					// 					_self.executeMethod('onCloseShowCustomAlert');
					// 				}	
					// 		   }
					// 		 });
					// 	}else{
					// 		_self.hidePopover();
					// 	store.findRecord('module',_self.data.cxPropModuleId).then(function(){
					// 		_self.callForArrangement()
					// 	});
					// 	}
					// customview.$.rollBack();
					// columPrimBtn.setData("ltPropDisabled", false); //no i18n
					// if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
					// 	commonUtils.showHideLoadingDiv();
					// }
					// })
		}
		},
		showOptionsPopup:function(){
			var chkManageColForLockedCV = this.chkManageColForLockedCVAvail(this.data.custom_view,this.data.cxPropAdmin) && this.data.manage_columns_visible;
			if(this.getData('isOptionOpened')){
				this.setData({'isOptionOpened':false,"showCont":false});
			}else{
				var showManageCol = this.data.cxPropShowManageColumn && !(this.data.cxPropSystemName && this.data.cxPropSystemName.indexOf("CONVERTEDVIEWS") !== -1 && !this.data.LvContent.length);
				this.setData({'isOptionOpened':true,'cxPropShowManageColumn':showManageCol,'isManageColumnsEnabled':chkManageColForLockedCV,
				'showCont':true,'disableResetOption':!this.getData("cv_width_updated")});
			}

		},
		showColumnList : function(){
			var custom_view= this.data.custom_view || store.peekRecord('custom_view',this.getData('cxPropCvid'));
			if(!custom_view){
				this.setData("showCont",false);
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var LoadingDiv=typeof commonUtils !== 'undefined' && typeof commonUtils.showHideLoadingDiv !== "undefined";
			if(LoadingDiv){
				commonUtils.showHideLoadingDiv(true);
			}
			this.setData("showCont",false);//No I18N
			
			// this.setData('freeze',true);
			if(! $L("#newPopup")[0]){
				// this.setData('columnListOpen',true); //no i18n
				this.setData({'columnListOpen':true,from:"list",type:"modal",showModal:true});
			}
			else if(this.getData('columnListOpen')){
					this.setData({'columnListOpen':false,"showModal":false});
				}else{
					this.setData({  "showModal" : true, "from" : "list" , "type" : "modal",'columnListOpen':true });  //No I18n
				}
			if(LoadingDiv){
				commonUtils.showHideLoadingDiv(false);
			}
			// event.stopPropagation();
		},
		onRowClick:function(record,event){
			
			if(event.target.classList.contains('cxLvTableIconWrap') || event.target.classList.contains('cxLvMoreIcon') || event.target.tagName === 'CRUX-VIEW-EDIT-ICON' || event.target.classList.contains('iconlock_ap')  || event.target.classList.contains('rlc_lockIcon') ||  event.target.classList.contains('showMoreAddedEvents') || event.target.classList.contains('uline1') || event.target.tagName === 'LYTE-TEXT' && event.target.parentElement.tagName === 'A'){
				return;
			}
			if(this.getMethods("onListViewRowClick")){
				/**
				 * This method will be executed on RowClick
				 * @method onListViewRowClick
				 * @author rafik.shaik
				 */
				this.executeMethod('onListViewRowClick',record,event);
			}
		},
		showSortDropdown:function(field){
			
		},
		clearFields:function(){
			this.clearSelectedRecords();
		},
		viewCampSummaryOnClick:function(){
			if(crmListView !== undefined && crmListView.viewCampSummaryOnClick){
				crmListView.viewCampSummaryOnClick(event,element);
			}
			event.stopPropagation();
		},
		onLvActivityBadgeClick:function(recordObj,event){
			if(this.getMethods("onListViewActivityBadgeClick")){
				/**
				 * This method will be executed on ActivityBadgeClick
				 * @method onListViewActivityBadgeClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onListViewActivityBadgeClick",recordObj)
			}
			event.stopPropagation();
			event.preventDefault();
		},
		onDescMenuClose : function (){
			$L('#LvMoreDescMenu')[0].ltProp('show',false);//No I18N
			this.setData('descDescription' , "");//No I18N
		},
		
	},
	clearSelectedRecords:function(){
		if(!this.data.selectedRecords){
			this.setData('selectedRecords',true);
		}
		this.setData('selectViewArray',[]);
		this.selectAllEntity(true);
		this.setData({'showSelectedDiv':false,'selectAllEntity':false});
	},
	reRenderTagComponent : function(clip_mode, tagWidth){
		$L.fastdom.measure(function(){
			//Since crux-table is unbound tag component is re rendered
			var tags = document.querySelectorAll("crux-tag-component"),//No I18N
			tagLen = tags.length;
			$L.fastdom.mutate(function(){
				for(var i = 0; i < tagLen; i++){
					tags[i].resize({cxPropClipMode : clip_mode, cxPropWidth : tagWidth});
				}
			});
		});
	},
	findObjectFromArray : function(arr,val,param){
		return arr.filter(function(field){ return field[param] === val ; });
	},
	hidePopover:function(){
		this.setData({"showModal":false,"columnListOpen":false,"showCont":false});
	},
	checkForStickyTable : function(){
		if( !/firefox/ig.test( navigator.userAgent )){
            var span = document.createElement( 'th' ),
            isIntersection = "IntersectionObserver" in window;//No I18n
            span.style.position = "sticky";
            if( span.style.position === "sticky" && isIntersection ){ //No I18n
               return true;
            } 
            // else {
            span.style.position = "-webkit-sticky";
            if( span.style.position === "-webkit-sticky" && isIntersection ){
                return true;
            }
                // else{
            return false;
                // }
            // }
        }
		return false;
	},
	setYieldInfo:function(modName, cvbtn,resp){
		var cvrecord = resp ? resp : this.getData("LvContent"); //No i18n
		var cvrecordLen  = cvrecord ? cvrecord.length : 0; 
		var setwidth = false;
		var isLockIcon = false;
		var isLockIconWithCB = false;
		for(var i = 0; i < cvrecordLen; i++ ){
			if(setwidth && isLockIcon){
				break;
			}
			if(cvrecord[i].$upcoming_activity){
				setwidth = true;
			}
			if(cvrecord[i].Locked__s){
				isLockIcon = true;
				if(!this.data.clientAccount){
					isLockIconWithCB = true;
				}
			}
		}
		var prefixYields = [], suffixYields = [];
		var previousValue = this.getData("headerYields") ? this.getData("headerYields") : {prefix : [], suffix : []};//No I18n
		var changed = false;
		// if(! (modName.startsWith("Orchestration") || modName.startsWith("PathFinder")) ){
		if(this.data.cxPropShowEditIcon || this.data.cxPropShowQuickActionsMenu){  
			prefixYields = [{fixed: "enable", width:"10px", class : this.data.cxPropShowMoreOptionAfterEdit || this.data.cxPropShowCloseIcon ? "cxLvActEditIconCol" : "cxLvEditIconCol"}];//no i18n			
		}else{
			prefixYields.push({class : "cxdN", fixed : "enable"})
		}
				_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");
		if(this.data.cxPropHeaderPrefixYield || this.data.cxPropShowSelectBox){
			var iconClass = isLockIconWithCB && isLockIcon ? "cxLvCheckboxCol cxLvLockIconCol cxLvCheckboxWithLockCol" : isLockIcon ? "cxLvCheckboxCol cxLvLockIconCol" : "cxLvCheckboxCol";//NO I18N
			prefixYields.push( { fixed: "enable", width:"10px", class : iconClass});
		}

		if(setwidth && this.getData('activity_badge') === "enabled"){
			prefixYields.push({class  : "cxLvActivityCol", fixed : "enable"});
		}else{
			prefixYields.push({class : "cxLvActivityCol cxLvHideActivityCol", fixed : "enable"});
		}
		// }else{
		// 	prefixYields = [{width:"30px", class : "cxLvEditIconCol"}];//no i18n
		// }
		if(previousValue.prefix[0] && prefixYields[0] && previousValue.prefix[0].class !== prefixYields[0].class || previousValue.prefix[1] && prefixYields[1] && previousValue.prefix[1].class !== prefixYields[1].class || previousValue.prefix[2] && prefixYields[2] && previousValue.prefix[2].class !== prefixYields[2].class || previousValue.prefix.length !== prefixYields.length){
			changed = true;
		}
		if(cvbtn && cvbtn.length > 0){
			suffixYields = [{width:"100px", class : "cxLv_customBtnTd"}];//no i18n
		}else{
			suffixYields = [{width:"100px", class : "cxLv_noCustomBtn cxLv_customBtnTd"}];//no i18n
		}
		if(this.data.cxPropShowManageColumn){
			suffixYields.push({width:"53px", class : "cxLvFixedLastCol"});
		}else{
			suffixYields.push({width:"12px", class : "cxLvNoManageLastCol"});
		}
		if(previousValue.suffix[0] && suffixYields[0] && previousValue.suffix[0].class !== suffixYields[0].class){
			changed = true;
		}
		var yields = {prefix : prefixYields, suffix : suffixYields};
		if( this.getMethods('onConstructYield') ){
			let cus_yield = this.executeMethod('onConstructYield' , yields);
			if( cus_yield && typeof cus_yield === 'object'){
				yields = cus_yield;
			}
		}
		if(changed){
			this.setData("headerYields", yields);//no i18n		
		}		
	},
	headerSelection:function(){
		var headercheckbox = $L("#selectCheckbox",this.$node);
		if(headercheckbox.length){
			  var cv_records = this.data.LvContent;
			  var selectedIds = this.getData("cxPropSelectedIds");//No i18n
			  var className = "cxListVwCustomCheckBox";//No i18n
 			var count = 0;
 			var totalCount = cv_records.length;
			 this.lastRecNum = -1;
			 var len = cv_records.length;
			 for(var i = 0; i < len; i++){
				if(selectedIds.indexOf(cv_records[i].id) > -1){
					count++;
					this.lastRecNum = cv_records[i].recnum;
					className = "cxListVwPartialselect";//No i18n
				}
				else if(this.waitingForApproval(cv_records[i])){
					totalCount--;
					this.lastRecNum = cv_records[i].recnum;
				}
				else if(count > 0){
					className = "cxListVwPartialselect";//No i18n
					break;
				}
				
			}
			if(count === totalCount && count !== 0){
				className = "cxListVwCustomCheckBoxChecked";//No i18n
			}
			var headercheckboxes = this.$node.querySelectorAll("[id='selectCheckbox']"); //No I18n 
			headercheckboxes.forEach(function(headercheckbox){
				headercheckbox.ltProp("class", className); //No I18n
				var checkBoxSpan = headercheckbox.querySelector("span"); 
				checkBoxSpan.classList.remove(checkBoxSpan.classList.value); //No I18n
				checkBoxSpan.classList.add(className); //No I18n
			});
			}
	},
	selectAllDivAction:function(){
		if(this.data.cxPropMassOperationTotalLimit >= this.data.selected_count){
			this.setData('selectAllEntity',true); //no i18n
			var selectAllCheckbox = $L("#selectCheckbox",this.$node)[0];
			var selectAllCheckboxClass = selectAllCheckbox ? selectAllCheckbox.ltProp("class") : ""; //No i18n
			if(selectAllCheckbox && (selectAllCheckboxClass === "cxListVwCustomCheckBox" || selectAllCheckboxClass === "cxListVwPartialselect")){
				this.selectAllEntity(undefined, true);
			}
		}else{
			_cruxUtils.showCustomMessage({ params : { ltPropMessage : _cruxUtils.getI18n("crm.listview.maximum.records.alert",[this.data.cxPropMassOperationTotalLimit]) ,ltPropDuration:"4000"} } );
		}
		this.setData({'showSelectedDiv':false,'selectedRecords':false});

	},
	
	resize:function(){
		if(this.getMethods("onColumnListResize")){
			/**
			 * This method will be executed on onColumnListResize
			 * @method onColumnListResize
			 * @author rafik.shaik
			 */
			this.executeMethod("onColumnListResize");//no i18n
		}else{
			// var columnContainer = $L("#columnListId");
		var columnMenu = $L("#columnListId lyte-menu-item");//eslint-disable-line @zoho/webperf/no-complex-selector
		columnMenu && columnMenu.length ? this.setData('showPopoverfooter',true) : this.setData('showPopoverfooter',false);//no i18n
		}

	},
	sortRecord:function(value ,event ,element ,sortElem ,sortObj,sortId){
		sortId = sortId || (sortElem && sortElem.parentElement.id || "");
		var field = this.getFieldMeta( sortId );	//No I18n
		if(value=="Hide Column"){
			if(  this.getData("disableHideOpt") ){
				return;
			}
			if(!sortId){
				sortId=sortElem.closest("lyte-exptable-th").id
			}
			commonUtils.showHideLoadingDiv(true);
			var new_arr=this.data.listfields.filter((item)=>item.id!=sortId) ;
			this.setData("listfields",new_arr);
			this.constructCustomFields();
			var Lv_contect=this.data.LvContent ;
			this.setData("LvContent",[]);
			this.setDisableRows(Lv_contect);
			this.setData("LvContent",Lv_contect);
			commonUtils.showHideLoadingDiv(false);
			var fieldLabel = field.list_display_label ? field.list_display_label : field.field_label;
			_cruxUtils.showCustomMessage({ 
				params : { 
					ltPropType : "success",	//No I18n
					ltPropMessage : _cruxUtils.getI18n("crm.customview.hide.column.success", fieldLabel) //No I18n
				}
			});
			return ;
		}

		//masking/unmasking handling start
		if(value === 'mask' || value === 'unmask'){
			if(value === 'mask'){
				field.cxMasked = true;
			}else{
				field.cxMasked = false;
			}
			$L("crux-table-component" , this.$node)[0].maskUnmask(field.api_name , value === 'unmask');
			return;
		}
		//masking/unmasking handling end

		
		// var modInfo = this.data.cxPropModuleInfo,
		var cvid = this.data.cxPropCvid,
		// _self = this,
		customview = this.data.custom_view || store.peekRecord('custom_view',cvid); //No I18N
		sortElem = $L(".lyteMenuSelected")[0] || sortElem;
		var sort_id = sortElem ? sortElem.parentElement.id : value === "unsort" ? sortObj.id : this.getData('sortIconFieldId'); //No I18N
		if(!sort_id) {
			sort_id = sortId;
		}
		var api_name;
		var prev = customview.sort_by ? customview.sort_by.id : undefined;
		if(sort_id && customview.$!=undefined){
			api_name = field.api_name; //No i18n
			if(value === "unsort"){
				customview.$ ? customview.$.set('sort_by',{}) : customview.sort_by = {};//No I18N
			}else{
				customview.$ ? customview.$.set('sort_by', { "id": sort_id, "api_name": api_name }) : customview.sort_by = { id: sort_id, api_name: api_name };//No I18N
			}
			// sort_by = store.peekRecord("field",sort_id).id;//No I18N
		}else{
			api_name = field.api_name; //No i18n
			if(value === "unsort"){
				customview.sort_by={};//No I18N
			}else{
				customview.sort_by={"id" : sort_id, "api_name" : api_name};//No I18N
			}
		}
		if(api_name === "BEST_TIME" && prev === customview.sort_by.id && customview.sort_order === value){
			return;
		}
		if(customview.$!=undefined){
			if(value === "unsort"){
				customview.$.set('sort_order',undefined); 
				customview.$.set('sort_by',{});	 //No I18N
			}else{
				customview.$.set('sort_order',value); //No I18N
			}
		}else{
			if(value === "unsort"){
				customview.sort_order=undefined;
				 customview.sort_by={};	 //No I18N
			}else{
				customview.sort_order=value; //No I18N
			}
		}
		
		if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
			this.selectAllEntity(true);
		}
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		// var paramObj = {sort_by : customview.sort_by, sort_order: customview.sort_order, module : modInfo.api_name, id : cvid };
		// store.triggerAction("custom_view", "change_sort", paramObj).then(function(resp) { //NO i18n
		this.onDataLoad=false;
		this.setData("cxPropListViewContent",[]);
		this.onDataLoad=true;
		this.records=[];
				// store.unloadAll(this.data.cxPropModuleInfo.id);
				// this.setData("page",1);
				// this.setData('startIndex',0)
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// 	this.setData({"custom_view":resp,'listfields':resp.fields})
		if(this.getMethods('onSortUnsortClick')){
			this.setData("cxPropPage" , 1);
			var qp = {page:1, per_page:this.data.cxPropPerPage , cvid: this.data.cxPropCvid , module: this.data.cxPropModule , sort_by: customview.sort_by , sort_order : customview.sort_order};
			this.executeMethod('onSortUnsortClick',value,field, qp).then(function(){
				this.onBeforeLoad = true;
				this.fetchRelatedRecords(1,0,undefined,true);
			}.bind(this));
			// this.executeMethod('onSortUnsortClick',value,store.peekRecord("field",sort_id), qp);
		}else{
			this.fetchRelatedRecords(1,0,undefined,true);
		}
				// }.bind(this))
		// }.bind(this),function(XHR){
		// 	if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
		// 		if(typeof renderingUtils !='undefined' && renderingUtils.displayPermissionDenied!='undefined'){
		// 			renderingUtils.displayPermissionDenied(XHR);
		// 		}else{
		// 			Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body")
		// 		}
		// 	}else if(XHR.status === 400){
		// 		_cruxUtils.showCustomAlert({
		// 			 params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.sort.error')} //no i18n
		// 		});
		// 	}
		// 	customview.$.rollBack();
		// 	if(typeof commonUtils !='undefined' &&commonUtils.showHideLoadingDiv!='undefined'){
		// 		commonUtils.showHideLoadingDiv();
		// 	}
		// }.bind(this));

	},
	loderStarts : function(status){
		var contDiv = $L('.cxLvLoaderWrap');
		contDiv.css('display', status ? 'block' : 'none'); //No I18N
	},
	pinUnpinfield: function (value) {

		var modInfo = this.data.cxPropModuleInfo, //No I18N
			cvid = this.data.cxPropCvid,
			_self = this,
			customview = this.data.custom_view || store.peekRecord('custom_view', cvid) ,//No I18N
			// fields = customview.fields,
			// pinned_fields,
			isPinedFieldsWidthChanged = false;
		var id = _self.getData('sortIconFieldId');  //No I18N
		// if(id){
		// 	var api_name = store.peekRecord("field",id).api_name; //No i18n
		// 	pinned_fields = [{ 'api_name' : api_name, 'id' : id, '_pin' : value === 'UnPin Column' ? false : true, '_pin_order' : value === 'UnPin Column' ? null : _self.getData("cxPropPinedFieldsLength") + 1 }]; //No I18N
		// }
		// var cvObj = {fields : pinned_fields ? pinned_fields : fields, id : cvid};
		// var paramObj = {module : modInfo.api_name};
		if (typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined") {
			commonUtils.showHideLoadingDiv(true);
		}
		// if(persistPinUpdate){
		// store.triggerAction("custom_view", "pin_unpin_fields",cvObj,paramObj).then(function(){
		// _self.changePinUnpin(_self,value,modInfo,isPinedFieldsWidthChanged,customview,id,cvid);

		// },function(XHR){
		// 	if(XHR.status === 400){
		// 		var msgTxt = XHR.responseText.indexOf("Maximum Limit Reached to Pin the Field") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.maximum.limit.new',1) : XHR.responseText.indexOf("Given Field is not associated with the mentioned Custom View") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.column.error.msg') : _cruxUtils.getI18n('crm.customview.pin.unpin.issue'); //NO I18N
		// 		_cruxUtils.showCustomAlert({
		// 			params : {ltPropPrimaryMessage : msgTxt}
		// 		});
		// 	}
		// 	if(typeof commonUtils!='undefined' && commonUtils.showHideLoadingDiv!='undefined'){
		// 		commonUtils.showHideLoadingDiv();
		// 	}
		// });
		// }else{
		_self.changePinUnpin(_self, value, modInfo, isPinedFieldsWidthChanged, customview, id, cvid);
		// }
	},
	changePinUnpin:function(_self,value,modInfo,isPinedFieldsWidthChanged,customview,id,cvid){
		var fields = this.data.LvHeader;
		var lv_field = this.getFieldMeta( id );	//No I18n
		var pinedArr = _self.getData('cv_mod_pined_fields'),fieldsArr = []; //No I18N
		if(value === "Pin Column")
		{
			pinedArr.push(id);
		}
		else if (value === "UnPin Column")
		{
			pinedArr = pinedArr.filter(function(e) { return e !== id ; });
		}
		_self.setData('cv_mod_pined_fields',pinedArr); //No I18N
			_self.setData('cxPropPinedFieldsLength',pinedArr.length); //No I18N
			var prev_cv_width_conf = new Map(),
			
			cv_width_map = _self.data.cv_mod_fields ? _self.getData("cv_mod_fields") : new Map(), //No I18n
			widthChanged = cv_width_map.size > 0;

			if(_self.data.from === 'list' ){
				fields.forEach(function(field){
					if(field._width){
						prev_cv_width_conf.set(field.id , field._width);
			    	}
				});
			}
			var _pinFieldWidth = 0;
			fields.forEach(function(field){
				if(pinedArr && pinedArr.includes(field.id)){
					_pinFieldWidth += widthChanged  ? cv_width_map.has(field.id) ? cv_width_map.get(field.id) : field._width ? field._width : _self.getDefaultWidthForField(lv_field.ui_type) : prev_cv_width_conf.has(field.id) ? prev_cv_width_conf.get(field.id) : field._width ? field._width : _self.getDefaultWidthForField(lv_field.ui_type); //No I18n
				}
			});
			pinedArr.forEach(function(item){
				var _pinField = fields.filter(function(e) { return e.id === item ; } )[0];
				if(_pinField) {
					_pinField._pin = true;
					var hasItem = cv_width_map.has(item);
					//Calculating the width of the pinned column if its width exceeds the viewPort
					var columnWidth = widthChanged  ? hasItem ? cv_width_map.get(item) : _pinField._width ? _pinField._width : _self.getDefaultWidthForField(lv_field.ui_type) : prev_cv_width_conf.has(item) ? prev_cv_width_conf.get(item) : _pinField._width ? _pinField._width : _self.getDefaultWidthForField(lv_field.ui_type); //No I18n
					var tableWidth = _self.$node.querySelector('.lyteExpTableOrigTableInnerWrap').clientWidth; //No I18n					
					var fixedPrefixColumnsWidth = _self.calculatefixedColumnWidth();
					// if(columnWidth && tableWidth) {
						// 100 px - for ManageColumns and remaining pixel(10%)
						if(columnWidth && tableWidth && fixedPrefixColumnsWidth + _pinFieldWidth + 100 >= tableWidth) {
							if(hasItem) {
								cv_width_map.delete(item);
							}
							_pinField._width = tableWidth - fixedPrefixColumnsWidth - 100;
							cv_width_map.set(item, _pinField.width);
							isPinedFieldsWidthChanged = true;
						}
					// }
				}
				else 
				{
					_pinField = { 'api_name' : this.getFieldMeta( item ).api_name, 'id' : item, '_pin' : true }; //No I18n
				}
				_pinField._pin_order = pinedArr.indexOf(item) + 1;
				fieldsArr.push(_pinField);
			});
			fields.forEach(function(field){
				if(!pinedArr.includes(field.id))
				{
					if(id === field.id && value === "UnPin Column") {
						field._pin = false;
						delete field._pin_order;
					}
					fieldsArr.push(field);
				}
			});
			if(isPinedFieldsWidthChanged) {
				_self.setData({'cv_mod_fields': cv_width_map,"updateWidthValue":true,'width_prev_cvid':cvid});
				// _self.setData('cv_mod_fields', cv_width_map); //No I18n
				// _self.setData("updateWidthValue",true); //No I18n
				// _self.setData('width_prev_cvid', cvid); //No I18n
				_self.checkForWidthUpdate(true);
			}
			this.onDataLoad=false;
			this.setData("cxPropListViewContent",[]);
			this.onDataLoad=true;
			this.records=[];
			// store.unloadAll(modInfo.id);
			_self.setData({listfields : fieldsArr   }); //No I18n
			_self.fetchRelatedRecords(undefined,undefined,value);
	},
	getDefaultWidthForField : function(uiType){
		return uiType === 209 || uiType === 3 || uiType === 110 ? 400 : 200;
	},

	calculatefixedColumnWidth : function() {
		var fixedPrefixColumns = $L('crux-table-component',this.$node)[0].component.data.cxPropHeaderYield.prefix, fixedPrefixColumnsWidth = 0,fixedPrefixColumnsLength = fixedPrefixColumns.length;
		for(var i = 0; i < fixedPrefixColumnsLength; i++) {
			var fixedColumn = fixedPrefixColumns[i];
			if(fixedColumn.fixed === "enable") {
				var cssJson = getComputedStyle(this.$node.getElementsByClassName(fixedColumn.class.indexOf("cxLvActivityCol") !== -1 ? "cxLvActivityCol" : fixedColumn.class)[0]); //NO I18n
				if(cssJson) {
					var width = cssJson.width !== undefined && cssJson.width !== "0px" ? cssJson.width.substring(0, cssJson.width.indexOf('px')) : fixedColumn.class.indexOf("cxLvActivityCol") !== -1 ? 120 : 36; //NO I18n
					fixedPrefixColumnsWidth = fixedPrefixColumnsWidth + Math.round(width);
				}
			}
		}
		return fixedPrefixColumnsWidth;
	},

	checkforListViewLock : function(){
		var custom_view = this.data.custom_view; //No I18N
		var admin = this.data.cxPropAdmin;
		if (custom_view.locked) {
				if(custom_view.system_defined && admin)
				{
					return false;
				}
				else if(!custom_view.system_defined && (admin || custom_view.created_by.id === this.data.cxPropUserDetailsId))
				 {
					 return false;
				 }
				return true;
			}
			// else
			// 	{
			return false;
				// }
	},
	
	activityBadgeUpdate : function(moduleInfo,activity_badge_selected_Ui,columPrimBtn,isFieldUpdate){
		moduleInfo.$ ? moduleInfo.$.set({'activity_badge': activity_badge_selected_Ui}) : moduleInfo.activity_badge = activity_badge_selected_Ui; //No I18N
		// var removecv;
		var _self = this;
		// if(isFromModal) { // For Complience Page Activity_badge Update
		// 	removecv = moduleInfo.$.get("custom_view");
		// 	moduleInfo.$.rollBackAttributes("custom_view"); //No I18n
		// }
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		moduleInfo.$.triggerAction('view_preference_configurations',{module:this.data.cxPropModuleApiName},{},"PUT",{'activity_badge': activity_badge_selected_Ui}).then(function(){
			this.setData("activity_badge",activity_badge_selected_Ui); //No I18N
			if(!isFieldUpdate){
				  var records = Object.assign([],this.data.LvContent);
				  _self.setYieldInfo(_self.getData("cxPropModule"),_self.data.list_cv_btn,records);
				  this.setDisableRows(records);
				  this.setData({"LvContent": records }); //No I18n
				  _self.headerSelection();
				  if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
			}
	}.bind(this),
		function(){
			_cruxUtils.showCustomAlert({
				params : {ltPropPrimaryMessage : _cruxUtils.getI18n('crm.customview.activity.badge.update.failure')}
			});
			moduleInfo.$.rollBackAttributes("activity_badge"); //No I18n
			columPrimBtn.setData("ltPropDisabled", false); //no i18n
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
		});
		
		// if(isFromModal) {
		// 	moduleInfo.$.set({"custom_view" : removecv}); // For Complience Page Activity_badge Update //No I18n
		// }
	},

	pinUnpinUpdate:function(cvObj,paramObj,pined_fields,customview,columPrimBtn,isFieldUpdate,containsPinField){
		var _self = this;
		var moduleInfo = this.data.cxPropModuleInfo; //No I18n
		// var persistPinUpdate = this.getData('persistPinUpdate');//No I18n
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		// if(persistPinUpdate){
			// store.triggerAction("custom_view", "pin_unpin_fields",cvObj,{module : paramObj.module}).then(function(){
				// _self.doPinUnpin(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField);
			// },function(XHR){
			// 	var msgTxt = XHR.responseText.indexOf("Maximum Limit Reached to Pin the Field") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.maximum.limit.new',1) : XHR.responseText.indexOf("Given Field is not associated with the mentioned Custom View") !== -1 ? _cruxUtils.getI18n('crm.customview.pin.unpin.column.error.msg') : _cruxUtils.getI18n('crm.customview.pin.unpin.issue'); //NO I18N
			// 	if(pined_fields.length && containsPinField){
			// 		_self.pinUpdateFailed = true;
			// 	}
			// 	_cruxUtils.showCustomAlert({
			// 		params : {ltPropPrimaryMessage : msgTxt},
			// 		 close : function(){
			// 				 if(_self.getMethods('onCloseShowCustomAlert')){
			// 					_self.executeMethod('onCloseShowCustomAlert',msgTxt)
			// 				 }
			// 		}});
			// 		_self.hidePopover();
			// 		customview.$.rollBack();
			// 		columPrimBtn.setData("ltPropDisabled", false); //no i18n
			// 		if(typeof commonUtils != "undefined" && commonUtils.showHideLoadingDiv!='undefined'){
			// 			commonUtils.showHideLoadingDiv();
			// 		}
				
			// }.bind(this));
		// }else{
			_self.doPinUnpin(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField);
		// }
	},
	doPinUnpin:function(moduleInfo, pined_fields, customview, isFieldUpdate, containsPinField)
	{
		var _self = this;
		_self.setData({cv_mod_pined_fields:pined_fields, cxPropPinedFieldsLength:pined_fields.length});
			if(!isFieldUpdate){
				var records = Object.assign([],_self.data.LvContent);
				if(_self && containsPinField && _self.pinFieldModified){
			    	_self.setData('doEnablePinnedColAnim',true); //No I18n
			    	setTimeout(function(){
			    		_self.setData('doEnablePinnedColAnim',false); //No I18n
					},2000);
				}
				_self.setData({listfields:customview.fields }); //No I18n
				_self.constructCustomFields();
				// _self.setData("LvContent",[])
				_self.setDisableRows(records);
				_self.setData("LvContent",records);
					_self.setYieldInfo(_self.getData("cxPropModule"),_self.getData("list_cv_btn"));
				_self.headerSelection();
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}
	},
	mouseOutCustomButton : function(){
		var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
		var popover = popoverParent.querySelector('lyte-popover');  //no i18n
		// var cvBtnPopover = $L("#cxLvCustomButtonPopover");
		if(popover){
			popover.ltProp("show",false);
		}
		clearTimeout(this.disp_popover);
	},

	mouseOverCustomButton : function(query,id,name,description,recordId){
		var _self = this;
		clearTimeout( this.disp_popover );
		this.disp_popover =  setTimeout(function(){
			var rec = store.peekRecord("custom_button", id);//No I18n
		  if(recordId) {
		       _self.onMouseOver('.' + query + id + recordId,rec.name,rec.description,'left') ;
		     } else {
		      _self.onMouseOver('.' + query + id,rec.name,rec.description,'left') ;
		     }
		},3000);
	},
	onMouseOver : function(query,name,description,position){
		var _self = this;
		this.setData('customButtonFocus',true);  //no i18n
		if(_self.getData('customButtonFocus')){
			_self.setData({'popoverName':name,'popoverDescription':description !== null ? description : ''});
			var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
			var popover = popoverParent.querySelector('lyte-popover');  //no i18n
			if(position){
				_self.setData('position',position); //no i18n
			}
			popover.ltProp('placement',this.getData('position')); //no i18n
			popover.ltProp('originElem',query); //no i18n
			popover.ltProp('show',true); //no i18n
		}
	},
	onMouseOut : function(){
		var popoverParent = this.$node.querySelector("#cxLvCustomButtonPopover");
		var popover = popoverParent.querySelector('lyte-popover');  //no i18n
		popover.ltProp('show',false); //no i18n
		this.setData('customButtonFocus',false);  //no i18n
	},
	menumousemove : function( evt ){
		var openMenu = $L('lyte-menu-box:not(.lyteMenuHidden)' )[0], button = $L('.cxLvTableRowHover #cxLvCustomBtn')[0];
		if( openMenu && button && !(openMenu.contains(evt.target) || button.parentNode.contains(evt.target)) ){
			openMenu.parent.ltProp('show', false); //No i18n
		}
	},
	executeCustomButton:function(btnId,recId){
			//callback for clicking btn
			if(this.getMethods('onCustomButtonClick')){
				/**
				 * This method will be executed on custom button click
				 * @method onCustomButtonClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onCustomButtonClick",btnId,recId);
			}
	},
	constructCustomFields:function(){
		
		var fieldDetails = this.fieldYieldMapping(this.data.listfields, this.getData('cxPropIsResizeEnabled')); //No i18n
		var customfields = fieldDetails.customfields;
		var fieldMapping = fieldDetails.fieldMapping;
		this.setData({'cxPropFieldMapping':fieldMapping,'LvHeader':customfields});
		// // this.setExpTableScroll();
	},	
	chkManageColForLockedCVAvail:function(custom_view,admin){
		if( custom_view.locked ){
			if(custom_view.system_defined && admin){
				return true;
			}
			else if(!custom_view.system_defined && (admin || custom_view.created_by.id === this.data.cxPropUserDetailsId)){
	    	 	return true;
	    	 }
		}
		else{
				return true;
			}
	},
	setWidthForTable : function(){
		if(this.getData('cv_width_updated') && this.getData('isStickyTable')){
			var tableNode = this.$node.querySelector('.lyteExpOriginalTable');//No I18N
			if(tableNode){
				tableNode.style.width = this.getData('current_table_width') + 'px';
			}
		}
	},
	checkForPropsUpdate:function(){
		// if(this.getData('cxPropIsResizeEnabled')){
			this.checkForWidthUpdate.call(this);
		// }
		this.checkForWrapUpdate.call(this);
	},
	checkForWidthUpdate:function(fromPinUnPin){
		if(this.data.cv_mod_fields.size > 0 && this.data.persistWidthUpdate )
		{
			if(this.data.updateWidthValue || this.persistWidthToStore()){
				// var module_info = this.data.cxPropModuleInfo ,
				// var cvid = this.data.cv_width_updated ? this.getData("width_prev_cvid") : this.data.cxPropCvid,//No I18N
				// custom_view = store.peekRecord('custom_view',cvid) || this.data.custom_view;//No I18n
				
				// var cus_view_len = custom_view.fields.length;
				// for(var i = 0;i < cus_view_len;i++){
				// 	custom_view.fields[i]._width = this.data.cv_mod_fields.get(custom_view.fields[i].id);
				// }
				// this.setData("listfields",custom_view.fields);
				
				// store.triggerAction("custom_view","customize_width",cvObj,qp);//No I18N
				// this.setData("isResetClick",false);
				this.setData({"cv_width_updated":fromPinUnPin === true ? true : false,"updateWidthValue":false});
			}
			this.setData("width_prev_cvid","");//No I18N
			
		}
	},
	checkForWrapUpdate : function(){
		if(this.getData('persistWrapUpdate')){
			// var module_info = this.data.cxPropModuleInfo,
			var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid),//No I18N
			isWrap = !this.data.clip_mode;
			if(custom_view && custom_view.wrap_text !== isWrap){
				custom_view.$ ? custom_view.$.set("wrap_text",isWrap) : custom_view.wrap_text = isWrap ;//No I18N
				// var cvObj = {wrap_text : isWrap, id : this.data.cxPropCvid};
				// var qp = {module : module_info.api_name};
				// if(this.data.isFromModal){
				// 	this.setFeatureSpecificParams(qp, this.data.featureName);
				// }
				// store.triggerAction("custom_view", "customize_wrap_text", cvObj, qp);
			}
		}
	},
	persistWidthToStore : function(){
		if(this.data.cv_mod_fields.size > 0 )
		{
			// var module_info = this.data.cxPropModuleInfo ,
			var comp = this, updated = false ,
			cvid = comp.data.cv_width_updated ? comp.getData("width_prev_cvid") !== "" ? comp.getData("width_prev_cvid") : this.data.cxPropCvid : this.data.cxPropCvid ,//No I18N
			custom_view = this.data.custom_view || store.peekRecord('custom_view', cvid);
			if(!custom_view){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var cv_mod_fields = comp.getData("cv_mod_fields"),
			cv_fields = [],obj,tmp_width,
			fields = custom_view.fields ? custom_view.fields : comp.data.custom_view.fields;
			if(fields){
				fields.forEach(function(field){
					obj = Object.assign({},field);
					if(!obj.id){
						var fieldObj = comp.findObjectFromArray(this.data.LvHeader, obj.api_name , "api_name");
						if(fieldObj[0]){
							obj.id = fieldObj[0].id;
						}
					}
					tmp_width = cv_mod_fields.get(obj.id);//No I18N
					if(tmp_width)
					{
						if(!updated && obj._width !== tmp_width){
							updated = true ;
						}
						obj._width = Number(tmp_width) ;
					}
					cv_fields.push(obj);
				});
			}
			if(updated && custom_view.$)
			{
				custom_view.$ ? custom_view.$.set("fields", cv_fields) : custom_view.fields = cv_fields;//No I18n
				comp.setData("updateWidthValue",true);//No I18n
				return true;
			}
		}
		return false;
	},
	calculateWidthForTable: function(){
		var total_width = 0,tmp;
		var comp = this ;
		var is_width_updated= !this.data.isResetClick ;
		if(comp.getData("cv_mod_fields").size > 0){
			comp.getData("cv_mod_fields").forEach(function(width){
				total_width += width ;
			});
			if(total_width!==0){
				is_width_updated=true;
			}
		}
		else{
			comp.getData("LvHeader").forEach(function(cv_field){	//No I18N
				tmp = cv_field.style ? cv_field.style : "";
				if(tmp.indexOf("width") > -1){
					total_width += Number(tmp.replace("width: ","").replace("px;",""));
				}
			});
		}
		if(total_width !== 0 ){
			var cvrecord = comp.getData("LvContent"); //No i18n
			var cvrecordLen  = cvrecord ? cvrecord.length : 0;
			var isActPres = false;
			for(var i = 0; i < cvrecordLen; i++ ){
				if(cvrecord[i].$upcoming_activity){
					isActPres = true;
					break;
				}
			}
			var cvbtn = comp.getData("list_cv_btn");//No I18N
			var extra_elem_width = 89;
			extra_elem_width += comp.getData('cxPropModule') === "Activities" || comp.getData('cxPropModule') === "Tasks" || comp.getData('cxPropModule') === "Events" || comp.getData('cxPropModule') === "Calls" ? 70 : 35;//No I18N
			extra_elem_width += isActPres ? 120 : 0;
			if(cvbtn && cvbtn.length > 0 && comp.getData("cxPropSystemName").indexOf('REVIEWPROCESS LEADS') === -1){
				extra_elem_width += 225;
			}
			total_width += extra_elem_width;
			this.setData({"cv_width_updated": is_width_updated ,"current_table_width":total_width});
			this.setWidthForTable();
		}else{
			comp.setData("cv_width_updated",false);//No I18n
		}
	},
	setBodyLookUp:function(recordObj,fieldObj){
		var lookupProp = this.data.cxPropLookupProperties;
		var obj = {routeName : "crm.tab.module.entity.detail",target: lookupProp  && lookupProp.target ? lookupProp.target : "_self"}; //No I18N
		var module = this.data.cxPropModule,rec_len=recordObj.length,field_len=fieldObj.length;
		for(var i = 0;i < rec_len;i++){
			for(var j = 0;j < field_len;j++){
				if(Object.keys(this.data.cxPropDisplayField).length !== 0 &&  this.data.cxPropDisplayField[this.data.cxPropModule] &&  this.data.cxPropDisplayField[this.data.cxPropModule].indexOf(fieldObj[j].api_name) > -1){
						obj[fieldObj[j].api_name] = {dynamicParams :`["${module}","{{row.id}}"]`,showBc : false,cxPropShowImage:false};
				}
				if(recordObj[i][fieldObj[j].api_name] && recordObj[i][fieldObj[j].api_name].name){
					if(fieldObj[j].column_name === "SEID" && fieldObj[j].ui_type === 4){
						obj[fieldObj[j].api_name] = {dynamicParams :'["{{row.$se_module}}","{{row.[field.api_name].id}}"]',iconClass:'["{{row.$se_module}}"]',cxPropShowImage:false,cxPropShowLookupPopupFields:true,showBc:true };
					}else if(fieldObj[j].ui_type === 46){
						obj[fieldObj[j].api_name] = {dynamicParams :'["{{row.$se_module}}","{{row.[field.api_name].id}}"]',showBc : false,cxPropShowImage:false};
					}else if(fieldObj[j].column_name === "CONTACTID"){
							obj[fieldObj[j].api_name] = {dynamicParams :'["Contacts","{{row.[field.api_name].id}}"]',showBc : true,cxPropShowImage:false,cxPropShowLookupPopupFields:true };
					}else if(fieldObj[j].column_name === "SEID" &&  fieldObj[j].ui_type === 132){
						if(recordObj[i][fieldObj[j].api_name]){
							let moduleName = this.data.cxPropIdModuleMapping[recordObj[i][fieldObj[j].api_name].module.id];
							moduleName = moduleName || store.peekRecord("module",recordObj[i][fieldObj[j].api_name].module.id).module_name;
							obj[fieldObj[j].api_name] = {dynamicParams :'["' + moduleName +'","{{row.[field.api_name].id}}"]',showBc : false,cxPropShowImage:false};
						}
					}
					else if(recordObj[i][fieldObj[j].api_name] && recordObj[i][fieldObj[j].api_name].id  && fieldObj[j].lookup && fieldObj[j].lookup.module && fieldObj[j].lookup.module.id){
						// if(fieldObj[j].lookup.module && fieldObj[j].lookup.module.id){
							var sub_module = this.data.cxPropIdModuleMapping[fieldObj[j].lookup.module.id];
							sub_module=sub_module || store.peekRecord("module",fieldObj[j].lookup.module.id).module_name ;
							//{{field.cxModule}}
							obj[fieldObj[j].api_name] = {dynamicParams :`["${sub_module}","{{row.[field.api_name].id}}"]`,showBc : false,cxPropShowImage:false };
							if(fieldObj[j].api_name === "What_Id"){
								var iconClass = sub_module.slice(0,sub_module.lastIndexOf("s")) + "Small";
								obj[fieldObj[j].api_name].iconClass = `${iconClass}`;
							}
						// }
						
					}
				}
			}
		}
		this.setData('lookupProperties',obj);
		
	},
	constructRCOptions:function(){

		if( this.data.cxPropPerPageOptions && this.data.cxPropPerPageOptions.length ){
			return this.data.cxPropPerPageOptions;
		}
		var recordPerPage =  _cruxUtils.getI18n("crm.label.no.of.records");
		var options = [{"user_value" : "10 " + recordPerPage,"system_value" : 10 },{"user_value" : "20 " + recordPerPage,"system_value" : 20 },{"user_value" : "30 " + recordPerPage,"system_value" : 30 },{"user_value" : "40 " + recordPerPage,"system_value" : 40 },{"user_value" : "50 " + recordPerPage,"system_value" : 50 }]; //No i18n
		if(this.data.cxPropUserDetailsIsPaidUser){
			options.push({"user_value" : "100 " + recordPerPage,"system_value" : 100 });
		}
		if(this.data.cxPropUserDetailsMaxRange === 500)
		{
			options.push({"user_value" : "500 " + recordPerPage,"system_value" : 500 });
		}
		return options;
	},
	callForArrangement:function(){
		var module = this.data.cxPropModule;
		var moduleInfo = this.data.cxPropModuleInfo;
		var allfields = moduleInfo.fields.slice(0); //No I18n
		var displayFieldMap = this.getData('cxPropDisplayField'); //No I18n
		var allowEncrypt = this.data.cxPropAllowEncryptedFields;
		var newarr = [];
		var allFieldLen = allfields.length;
		var j = 0;
		var tagFlag = false;
		for(var i = 0; i < allFieldLen; i++){
			var field = allfields[i];
			if(field.show_type === 0 && !(field.column_name === "FULLNAME" || field.column_name === "PROCESSINGBASIS" || field.column_name === "SE_STATUS") || (field.column_name === "S_MODIFIEDTIME" && field.show_type === 17) || (field.crypt !== null && !allowEncrypt)){
				continue;
			}
			if(field.visible  && field.available_in_user_layout && !((module === "Cases" || module === "Solutions") && field.column_name === "ADDCOMMENT") && !(field.column_name === "TAGMODULEREFID" && tagFlag) && !( module === "Tasks" && this.data.tasksHiddenFields.indexOf(field.column_name) > -1) && !( module === "Appointments" && this.data.appointmentHiddenFields.indexOf(field.column_name) > -1) && !( module === "Services" && this.data.servicesHiddenFields.indexOf(field.column_name) > -1)  && !(module === 'DealHistory' && field.column_name === "LASTACTIVITYTIME") && !(this.data.cxPropIsInventoryModule && (field.column_name === "DISCOUNT_TYPE" || field.column_name === "DISCOUNT_PERCENTAGE"))) {
				var displayMap = displayFieldMap[module] ? displayFieldMap[module] : [] ;
				if(module.indexOf("CustomModule") < 0 && module.indexOf("LinkingModule") < 0 && displayMap.length === 1 && displayMap[0] === field.api_name) {
					field.mandatory = true;
				} else if(module.indexOf("CustomModule") < 0 &&  module.indexOf("LinkingModule") < 0 ) {
					for(var m = 0; m < 2; m ++) {
						if(displayMap[m] === field.api_name) {
							field.mandatory = true;
						}
					}
				} else if("Name" === field.api_name) {
						field.mandatory = true;
					}
				if(field.column_name === 'TAGMODULEREFID'){
					tagFlag = true;
				}
				// if((module.startsWith("Orchestration") || module.startsWith("PathFinder")) && field.api_name === "id"){
				// 	field.mandatory = true;
				// }
				if(module === "Activities" && field.column_name === "ACTIVITYTYPE") {
					field.mandatory = true;
				}	
				if(module === 'DealHistory' && (field.column_name === 'STAGE' || field.column_name === "STAGEDURATION")){
					field.mandatory = true;
				}
				if( (module === 'Tasks' || module === 'Calls' || module === 'Events') && (field.column_name === 'SMOWNERID' || field.column_name === 'CALLSTARTDATETIME' || field.column_name === 'ENDDATETIME' || field.column_name === 'ALLDAYEVENT' || field.column_name === 'DUEDATE' || field.column_name === 'STARTDATETIME')){
					field.mandatory = false ; //No i18n
				}
				if((field.column_name === 'APPOINTMENTDATEANDTIME' || field.column_name === 'SMOWNERID') && module === 'Appointments' && this.data.cxPropModule !== 'Services'){
					field.mandatory = false ; //No i18n
				}
				if(field.api_name === "Full_Name" && (moduleInfo.module_name === "Contacts" || moduleInfo.module_name === "Leads")){
					field.field_label = _cruxUtils.getI18n("custommodule.crmfield.fl.name",moduleInfo.singular_label);
		        }
				// if(!(module.startsWith("Orchestration") || module.startsWith("PathFinder")) && field.api_name === "id"){
				// 	continue;
				// }
				//rich text fields are not supported in manage columns as of now, so skipping those fields
				if(field.api_name === "id" || field.ui_type === 250){
					continue;
				}
				
				newarr[j] = field;
				j++;
			}
		}
		let fields =  (this.data.custom_view && this.data.custom_view.fields) || moduleInfo.custom_view.fields;
		this.setData({
			'ordered_fields' : newarr,//No I18n
			"selected_fields" : fields.slice(0),//No I18n
			"property_fields" : this.data.activity_badge === "Not_Supported" ? [] : [{'api_name':'activity_badge','selected': this.data.activity_badge === "enabled" ? true : false,'field_label' : _cruxUtils.getI18n('crm.customview.activty.badge')}] //No I18N
			});


	},
	setSortBySummary:function(){
		var sorted_column = "",
			custom_view = this.data.custom_view  || store.peekRecord('custom_view',this.data.cxPropCvid);
		if(custom_view && custom_view.sort_by && custom_view.sort_by.id && custom_view.sort_by.api_name)
		{
			var fieldlen = this.data.cxPropModuleInfo.fields.length;
			var fields = this.data.cxPropModuleInfo.fields, data_type = "",
			api_name = custom_view.sort_by.api_name ? custom_view.sort_by.api_name : fields.find( function(field){ if (field.id === custom_view.sort_by.id) { return field; } } ).api_name;
			for(var i = 0 ; i < fieldlen ; i++)
			{
				if(fields[i].api_name === api_name)
					{
					sorted_column = fields[i].field_label;
					data_type = fields[i].data_type;
						break;
					}
			}
			if(sorted_column.length){
				sorted_column += " (";
				if(["phone","currency","integer"].includes(data_type) && api_name !== "BEST_TIME"){
					sorted_column += custom_view.sort_order === 'asc' ? "0-9" : "9-0";
				}else{
					sorted_column += custom_view.sort_order === 'asc' ? _cruxUtils.getI18n('crm.column.sort.asc') : _cruxUtils.getI18n('crm.column.sort.desc');//No I18N
				}
				sorted_column += ")";
			}
		}
		this.setData('sorted_column',sorted_column);
	},
	getCVFieldsWOWidth : function(cv_fields){
		var cvLen = cv_fields.length,
		isWidthPresent = false;
		for (var i = 0; i < cvLen; i++){
			if(cv_fields[i]._width){
				isWidthPresent = true;
				break;
			}
		}
		if(isWidthPresent){
			var cvFields = [];
			cv_fields.forEach(function(field){
				var obj = Object.assign({},field);
				delete obj._width;
				cvFields.push(obj);
			});
			return cvFields;
		}
		return cv_fields;
		// }
	},
	actionsAvailForComplianceRec:function(){
		var actions = [];
		var notIncludedActions = ["Edit","tag_op","change_owner","sendmail","mass_convert","sendmail_potential"]; //No I18N
		this.data.cxPropModuleActionsMenu.forEach(function(obj){
			if(!notIncludedActions.includes(obj.value)){
				actions.push(obj);
			}
		});
		return actions;

	},
	fetchRecords:function(start_num,page,per_page){
		per_page = per_page ? per_page : this.data.cxPropPerPage;
		start_num = start_num ? start_num : (page - 1) * per_page + 1;
		// this.setData('startIndex',start_num-1);
		var sortedRecord = this.data.cxPropListViewContent;
		if(sortedRecord && sortedRecord.length > 0){
			sortedRecord = sortedRecord.sort((a, b) => a.recnum - b.recnum);
		}
		// var sortedRecord=store.peekAll(this.data.cxPropModuleInfo.id)?store.peekAll(this.data.cxPropModuleInfo.id).sortBy("recnum"):[]

		// var sortedRecord=store.model?store.model[this.data.cxPropModuleInfo.id].data.sortBy("recnum"):[]
			var startRecNum = (page - 1) * this.data.cxPropPerPage + 1;
			var endRecNum = startRecNum + this.data.cxPropPerPage - 2;
			if(endRecNum >= this.data.cxPropRecordCount){
				endRecNum = this.data.cxPropRecordCount - 1;
			}
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv(true);
			}
			if( sortedRecord.length > 0 && sortedRecord[startRecNum - 1] && sortedRecord[endRecNum] &&  sortedRecord[startRecNum - 1].recnum === startRecNum){
				var records = sortedRecord.slice(startRecNum - 1,this.data.cxPropPerPage + startRecNum - 1);
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
					this.setData({'startIndex':start_num - 1,"cxPropPage":page});
					this.setSortBySummary();
					// this.setData({"custom_view":resp,'listfields':resp.fields})
					this.constructCustomFields();
					this.setYieldInfo(this.getData("cxPropModule"),this.getData("list_cv_btn"),records);
					this.setData("lookupProperties",{});
					this.setBodyLookUp(records,this.data.LvHeader);
					this.setDisableRows(records);
					this.setData('LvContent',records);
					this.headerSelection();
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
				// }.bind(this))
			}else{
				// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// 	this.setData({"custom_view":resp,'listfields':resp.fields})
					this.fetchRelatedRecords(page,start_num - 1);
				// }.bind(this))
			}
	},	
	makeApiRequests:function(no_activith_badge_req){
		var module = this.data.cxPropModuleApiName;
		var custom_button;
		var view_preference;
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		if(!this.data.cxPropCustomButton &&  this.data.cxPropShowCustomButton){  //No I18n
			custom_button = new Promise((resolve)=>{
				store.findAll("custom_button",{module:module},true,undefined,{apiVersion:6}).then(resp=>resolve(resp)).catch(()=>resolve([]));
			});
		}
		let promiseArray = ()=>{
			return Lyte.resolvePromises([
				custom_button,
				(!this.data.cxPropCustomView  || Object.keys(this.data.cxPropCustomView).length === 0 )   && this.data.cxPropCvid ? store.findRecord("custom_view",this.data.cxPropCvid,{module:module}) : this.data.cxPropCustomView ,
				Object.keys(this.data.cxPropModuleInfo).length === 0 ||  !this.data.cxPropModuleInfo.fields || !this.data.cxPropModuleInfo.fields.length? store.findRecord("module",this.data.cxPropModuleId, undefined, undefined,true,  {allowMultiple : true} ) : [this.data.cxPropModuleInfo],
				view_preference
				// store.findAll("field", { module: "Tasks", type: "all" }, false, undefined, { apiVersion: '2.2' }),
				// !this.data.cxPropRelatedList ? store.findAll('related_list', { module:module }, false, undefined, { from: 'Chronological' }) : undefined
			]).then( function( res ){
				this.onDataLoad=true;
				//set custom_button data
				this.setCustom_buttonData(res[0]);
				//set custom_view data
				this.setData('custom_view',res[1] || (res[2] && res[2][0] && res[2][0].custom_view));
				this.setData("clip_mode",!this.data.custom_view.wrap_text)
				// set module data
				if(res[3] && res[3].modules && res[3].modules[0].activity_badge){
					this.setData("activity_badge",res[3].modules[0].activity_badge);
				}
				this.setModule_info(res[2]);
			
			}.bind(this),function( XHR ){
				this.setData("ShowLvLoading",false)
				if(this.getMethods("onBeforeLoadFailure")){
					/**
					 * This method will be executed on failute resp 
					 * @method onBeforeLoadFailure
					 * @author rafik.shaik
					 */
					this.executeMethod("onBeforeLoadFailure");//No I18n
				}
				if(this.data.isLvWrapper){
					var msg;
					if(XHR.status===404){
						msg='Mandatory module meta data / customviewId  for rendering listview component is missing/incorrect';
					}else{
						msg='Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect';
					}
					this.setErrorMsg(msg);
				}
				else if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
					if(typeof renderingUtils !== 'undefined' &&  renderingUtils.displayPermissionDenied !== 'undefined'){
						renderingUtils.displayPermissionDenied(XHR);
					}else{
						Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
					}
				}else if(XHR.status === 400){
					var _self = this;
					_cruxUtils.showCustomAlert({
						params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
						close : function(){
							if(_self.getMethods('onCloseShowCustomAlert')){
								_self.executeMethod('onCloseShowCustomAlert');
							}	
					   }
					 });
				}else{
					_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid Data has been provided'}})
				}
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}.bind(this));
		};
		if( module && (!this.data.cxPropCustomView  || Object.keys(this.data.cxPropCustomView).length === 0 ) && !this.data.cxPropCvid ){
			return store.triggerAction('module','view_preference_configurations',{module:module},{},"GET").then((resp)=>{
				let cvObj = resp.modules[0].last_accessed_views.filter(item=>item.type === 'custom_view')[0];
				this.setData('cxPropCvid' , cvObj.custom_view.id);
				return promiseArray();
			},()=>{
				return this.setErrorMsg("Mandatory module meta data / moduleApiName  for rendering listview component is missing/incorrect.");
			});
		}
		if(!this.data.cxPropShowActivityBadge && this.data.activity_badge !== 'Not_Supported'){
			this.setData("activity_badge","disabled");
		}
		
		if( this.data.cxPropShowActivityBadge && !no_activith_badge_req && !view_preference){
			view_preference = new Promise((resolve)=>{
				store.triggerAction('module','view_preference_configurations',{module:module},{},"GET")
						 .then(resp=>resolve(resp))
						 .catch(()=>resolve({}));
			});
		}
		return promiseArray();
		
	},
	setCustom_buttonData:function(resp){
		if(resp && resp.length){
			var cvbtnlen = resp.length,
			listCvbtn = [],
			layerBtn = [];
			for (var i = 0; i < cvbtnlen; i++){
				if(resp[i].position === "list_view_each_record" || resp[i].position === "list_view_without_record"){
					var profileLen = resp[i].profiles.length;
					for (var j = 0; j < profileLen; j++){
						if(this.data.cxPropUserDetailsProfileName === resp[i].profiles[j].name){
							if(resp[i].position === "list_view_each_record"){
								listCvbtn.push(resp[i]);
							}else{
								layerBtn.push(resp[i]);
							}
						}
					}
				}
			}
			this.setData('list_cv_btn',JSON.stringify(listCvbtn));
		}
	},
	setModule_info:function(resp){ 
		this.setData("cxPropModuleInfo", resp[0]);
		this.data.cv_mod_fields = new Map();
		// var fields = this.data.custom_view.fields;
		//sort Icon
		if(!this.data.custom_view || !this.data.custom_view.fields){
			this.setData("ShowLvLoading",false)
			if(this.data.isLvWrapper){
				var msg='Mandatory module meta data / customviewId  for rendering listview component is missing/incorrect';
				this.setErrorMsg(msg);
			}
			// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Mandatory module meta data / moduleApiName / customviewId  for rendering listview component is missing/incorrect'}})
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
			return;
		}
		var fields = this.data.custom_view.fields,fieldsLen = fields.length,pinedArr = []; //No I18N
		this.setData('listfields',fields);
		var moduleFieldIds = this.data.cxPropModuleInfo.fields.map(function(field) { return field.id ; } ) ;
		for(var i = 0;i < fieldsLen;i++){
			if(fields[i]._pin && moduleFieldIds.includes(fields[i].id) && this.data.cxPropPinUnpinColumn){
				pinedArr.push(fields[i].id);
			}
		}
		this.setData('cv_mod_pined_fields',pinedArr);
		this.data.cxPropPinedFieldsLength = pinedArr.length;
		if(this.data.cxPropRecordCount === undefined){
			this.getCount = true;
		}else{
			this.setData({"show_loading":false});
			this.setData('total_new_count' , this.data.cxPropRecordCount);
			this.getData('cxPropModuleInfo').total_count = this.data.cxPropRecordCount;
			this.getCount = false;
		}
		this._menumove = this.menumousemove.bind(this);
		//column list
		this.callForArrangement();
		this.data.islockedListView = this.checkforListViewLock();
		this.setData({ "cxPropSystemName": this.data.custom_view.system_name ? this.data.custom_view.system_name : "", "actionsForStopProcessingRec": this.actionsAvailForComplianceRec() });
		this.setData("cxPropNoRecordsMessage", _cruxUtils.getI18n("crm.module.empty.message", this.data.cxPropModuleInfo.plural_label));
		this.fetchRelatedRecords();
	},
	fetchRelatedRecords:function(page,startIndex,value,delete_cvid){
		// _cruxUtils.removeCustomAlert();
		if(!this.isValidListViewData()){
			return ;
		}
		this.setData("errorDetails",{});
		var _self = this;
		var custom_view = this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
		var module_id = this.data.cxPropModuleId || this.data.cxPropModuleInfo.id,
		sort_by = custom_view.sort_by,
		 sort_order = custom_view.sort_order,
		 qp = {page:page ? page : this.data.cxPropPage,per_page:this.data.cxPropPerPage,approved: "both",cvid:this.data.cxPropCvid};
		 if(!qp.fields){
			qp.fields = this.data.cxPropModuleInfo.$properties;
			if(this.data.cxPropModuleInfo && this.data.cxPropModuleInfo.$on_demand_properties){
			qp.fields = qp.fields.concat(this.data.cxPropModuleInfo.$on_demand_properties);
			}
			function filterKey(key){
				return key === "$notes_view" ? false : true; //No i18n
			}
			qp.fields =  qp.fields ? qp.fields.filter(filterKey) : undefined;
		 }
		 if(qp.fields){
			if(typeof crmTab !== 'undefined' &&  crmTab.isZBCustomModule(this.data.cxPropModuleInfo.module_name)){
				qp.fields.push("ExchangeRate");
			}
			else{
				qp.fields.push("Exchange_Rate");
			}
			if(this.data.cxPropModuleInfo.module_name === "Activities"){
				qp.fields.push("$activity_type");
				this.data.cxPropIsNewCallView ? qp.fields.push("Outgoing_Call_Status") : qp.fields.push("Call_Status");
				qp.fields.push("Call_Type");
				qp.fields.push("Owner");
			}
			if(this.data.cxPropModuleInfo.module_name === "Calls"){
				this.data.cxPropIsNewCallView ? qp.fields.push("Outgoing_Call_Status") : qp.fields.push("Call_Status");
				qp.fields.push("Call_Type");
				qp.fields.push("Owner");
			}
			if(this.data.cxPropModuleInfo.module_name === "Events" || this.data.cxPropModuleInfo.module_name === "Tasks"){
				qp.fields.push("Owner");
			}
			qp.fields.push("Data_Processing_Basis_Details");
			if(this.data.cxPropModuleInfo.api_name === "Leads" || this.data.cxPropModuleInfo.api_name === "Contacts"){
				qp.fields.push("First_Name");
				qp.fields.push("Last_Name");
				qp.fields.push("Full_Name");
			}
			qp.fields.push("Currency");//No I18n
			qp.fields.push("Tag");//No I18N
			qp.fields.push("Owner");//No I18N
			qp.fields.push("Locked__s");//No I18n
		}
		else{
			delete qp.fields;
		}
		qp.home_converted_currency = true;
		qp.formatted_currency = true;
	
		if(sort_by && sort_order){
			qp.sort_by = sort_by.api_name;
			qp.sort_order = sort_order;
		}
		if(this.data.cxPropSearchLetter && this.data.cxPropSearchField){
			qp.alphabet = this.data.cxPropSearchLetter;
			if(this.data.cxPropDisplayField[this.data.cxPropModule].length > 1){
					qp.alphabetical_index_field = this.data.cxPropSearchField;
			}
		}
		var filetr_store = $L("crux-smart-filter");
		var smart_filter = filetr_store && filetr_store[0] ? filetr_store[0].component.getFilterCriteria() : undefined;
		if(smart_filter && smart_filter.queryParams){
			qp.filters = smart_filter.queryParams.filters;
			if(smart_filter.queryParams.cross_filters){
				qp.cross_filters = smart_filter.queryParams.cross_filters;
			}
			// smart_filter.queryParams.cross_filters ? qp.cross_filters = smart_filter.queryParams.cross_filters : "";
		}
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		if(qp.fields && (delete_cvid || this.data.cv_width_updated || this.addCVFieldsInRecordFetch)){
			// delete qp.cvid;
			var list_field_length = this.data.listfields.length;
			for(var i = 0;i < list_field_length;i++){
				if(qp.fields.indexOf(this.data.listfields[i].api_name) === -1){
					qp.fields.push(this.data.listfields[i].api_name);
				}
			}
			delete this.addCVFieldsInRecordFetch;
		}
		var recordData;
		var Lv_con=this.data.cxPropListViewContent;
		if(Lv_con &&  Lv_con.length && this.onBeforeLoad){
			var startRecNum = ((page ? page : this.data.cxPropPage) - 1) * this.data.cxPropPerPage + 1;
			recordData = this.data.cxPropListViewContent.slice(startRecNum - 1,this.data.cxPropPerPage + startRecNum - 1);
		}
		return Lyte.resolvePromises({
			count : _self.getCount ? store.triggerAction(module_id,"count",qp) : {count:undefined},
			records: recordData && recordData.length > 0 ? recordData : (this.data.cxPropFireBulkRequest ? store.findAll(module_id,qp) :[])
		}).then(function(res){
			this.setData("ShowLvLoading",false);
			this.onBeforeLoad = false;
			this.constructCustomFields();
			if(this.data.LvHeader.length==0 && this.data.isLvWrapper){
				var msg="Provided moduleData doesn't contains the customview field information. Please provide valid moduleData / moduleApiName for rendering lisview.";
				this.setErrorMsg(msg);
				return ;
			}
			//pin value handling
			if(value && value === 'Pin Column'){
				this.setData('doEnablePinnedColAnim',true); //No I18n
				setTimeout(function(){
					this.setData('doEnablePinnedColAnim',false); //No I18n
				}.bind(this),2000);
			}
			this.setData({"cxPropPage":page ? page : this.data.cxPropPage,"startIndex":startIndex !== undefined ? startIndex : (this.data.cxPropPage - 1) * this.data.cxPropPerPage});
			var resp = res.records;
			this.setDataBeforeRender(resp);
			if(!recordData || recordData.length === 0){
				var rec_len = resp.length;
				if(!this.data.cxPropListViewContent){
					this.setData("cxPropListViewContent",[]);
				}
				for(var i = 0;i < rec_len;i++){
					if(this.records.indexOf(resp[i].id) === -1){
						this.data.cxPropListViewContent.push(resp[i]);
						this.records.push(resp[i].id);
					}
				}
			}
			if(this.getMethods("onBeforeLoadSuccess")){
				/**
				 * This method will be executed on success resp at initial load ;
				 * @method onBeforeLoadSuccess
				 * @author rafik.shaik
				 */
				this.executeMethod("onBeforeLoadSuccess", this.data.cxPropCvid,res);//No I18n
			}
			if(res.count.count !== undefined){
				this.setData({'cxPropRecordCount':res.count.count,"show_loading":false});
			}
			this.getCount = false;
			// this.setData('LvContent',resp);
			
			this.setSortBySummary();
			this.setYieldInfo(this.getData("cxPropModule"),this.data.list_cv_btn,resp); //No I18N
			this.setBodyLookUp(resp,this.data.LvHeader);
			// this.flag=false
			if(this.getMethods('onGetRecordData')){
				/**
				 * This method will be executed on success resp of bulk request;
				 * @method onGetRecordData
				 * @author rafik.shaik
				 */
				this.executeMethod('onGetRecordData',this.data.cxPropCvid, resp , qp).then(function(res){
					this.setDisableRows(res);
					this.setData('LvContent',res);
					this.headerSelection();
					if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
						commonUtils.showHideLoadingDiv();
					}
				}.bind(this));
			}else{
				this.setDisableRows(resp);
				this.setData('LvContent',resp);
				this.headerSelection();
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
			}
		}.bind(this),function(XHR){
			this.setData("ShowLvLoading",false);
			if(this.getMethods("onBeforeLoadFailure")){
				/**
				* This method will be executed on failure resp at initial load;
				* @method onBeforeLoadFailure
				* @author rafik.shaik
				*/	
				this.executeMethod("onBeforeLoadFailure");//No I18n
			}
			if(this.data.isLvWrapper){
				var msg='Mandatory module meta data /customviewId info  for rendering listview component is missing/incorrect';
				this.setErrorMsg(msg);
			}
			else if(XHR.status === 403 || XHR.status === 401){ //getting 401 for customview put fails informed to core team to change the status. for now added this
				if(typeof renderingUtils !== "undefined"  && renderingUtils.displayPermissionDenied !== 'undefined'){
					renderingUtils.displayPermissionDenied(XHR);
				}else{
					Lyte.Component.render('crux-permission-denied-alert',{cxPropReason:'You do not have sufficient permissions to perform this operation. Contact your administrator.',cxPropShow:true},"body");
				}
			}else if(XHR.status === 400){
				var _self = this;
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage :_cruxUtils.getI18n('crm.field.permission.error')}, //no i18n
					close : function(){
						if(_self.getMethods('onCloseShowCustomAlert')){
							_self.executeMethod('onCloseShowCustomAlert');
						}	
				   }
				 });
			}else{
				_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid Data has been provided'}})
			}
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
		}.bind(this));
	},
	isValidListViewData:function(){
		if(this.data.isLvWrapper){
			var error_msg;
			var {cxPropPerPage :per_page , cxPropPage: page}=this.data;
			if([10,20,30,40,50,100,500].indexOf(per_page)===-1){
				error_msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
			}else if((per_page===100 || per_page==500) && typeof Crm !== "undefined" && !this.data.cxPropUserDetailsIsPaidUser ){
				error_msg = 'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.';
			}
			else if(per_page==500 && typeof Crm !== 'undefined' && this.data.cxPropUserDetailsMaxRange <500 ){
				error_msg = 'Your maximum allowed range is less than 500. Please select a smaller per page size.';
			}else if(!page || page<0){
				error_msg='Mandatory module meta data / page  for rendering listview component is missing/incorrect.';
			}
			if(error_msg){
				this.setData("ShowLvLoading",false);
				this.setErrorMsg(error_msg);
				if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
					commonUtils.showHideLoadingDiv();
				}
				return false;
			}
		}
		return true;
	},
	setErrorMsg:function(msg){
		var obj=this.data.errorDetails;
		obj.show_error=true;
		obj.message=msg;
		this.setData("errorDetails",{});
		this.setData({"ShowLvLoading" : false,"errorDetails":obj });
	},
	addClassForSelectAll:function(){
		
		var tableBody = $L(".lyteExpTableOrigTableInnerWrap .lyteExpTableRowGroup",this.$node),
		uncheckedCheckBoxCount = tableBody.find(".cxListVwCustomCheckBox").length,
		checkedCheckboxCount = tableBody.find(".cxListVwCustomCheckBoxChecked").length,
		className = "cxListVwPartialselect"; //No i18n
		if(uncheckedCheckBoxCount === 0){
			className = "cxListVwCustomCheckBoxChecked"; //No i18n
		}else if(checkedCheckboxCount === 0){
			className = "cxListVwCustomCheckBox"; //No i18n
		}
		var tarElems =  this.$node.querySelectorAll("[id='selectCheckbox']"); //No i18n
		tarElems.forEach(function(tarElem){					
			if(tarElem){
				var targetSpan = tarElem.querySelector("span"); //No i18n
				targetSpan.classList = "";
				targetSpan.classList = className;
				tarElem.ltProp("class", className); //No i18n					
			}
		});

		if(this.data.from_page === 'listview'){
			if(className === "cxListVwCustomCheckBoxChecked" && this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1){
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) === -1 ){
					Lyte.arrayUtils(this.getData('selectViewArray') , 'push', this.data.cxPropPage);
				// }
			}
			else if((className === "cxListVwCustomCheckBox" || className === "cxListVwPartialselect") && this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1){
				// if(this.data.selectViewArray.indexOf(this.data.cxPropPage) > -1){
					Lyte.arrayUtils(this.data.selectViewArray, "removeAt", this.data.selectViewArray.indexOf(this.data.cxPropPage), 1);
				// }
			}
			var smrt_flt=$L("crux-smart-filter")[0], filter;
			if(smrt_flt){
				filter=smrt_flt.component.getFilterCriteria() ;
			}
			// var filter = $L("crux-smart-filter")[0] ? $L("crux-smart-filter")[0].component.getCriteria() : undefined;
			if(this.data.selectViewArray.length > 0 && this.data.cxPropMassOperationTotalLimit >= this.data.cxPropRecordCount && this.data.cxPropRecordCount >= this.data.cxPropPerPage && (filter && filter.noFieldSelected || !filter )){
				this.setData("showSelectedDiv", true); 
			}else{
				this.setData("showSelectedDiv", false); 
			}
		}
	},
	setDataBeforeRender:function(res){
		if(res.length){
			var start = (this.data.cxPropPage - 1) * this.data.cxPropPerPage + 1;
			res.forEach(function(rec){ 
				rec.recnum = start++ ; 
			})	;	
		}
	},
	onPageNateCallback:function(page,per_page){
		if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
			commonUtils.showHideLoadingDiv(true);
		}
		this.executeMethod("onListviewPaginate",page,per_page).then(function(resp){
			if(typeof commonUtils !== "undefined" && typeof commonUtils.showHideLoadingDiv !== "undefined"){
				commonUtils.showHideLoadingDiv();
			}
			this.setData({"cxPropPage":page ,"startIndex":(page - 1) * this.data.cxPropPerPage});
			this.setDataBeforeRender(resp);
			var rec_len=resp.length;
			for(var i = 0;i < rec_len;i++){
				if(this.records.indexOf(resp[i].id) === -1){
					this.data.cxPropListViewContent.push(resp[i]);
					this.records.push(resp[i].id);
				}
			}
			this.setSortBySummary();
			// this.constructCustomFields();
			this.setYieldInfo(this.getData("cxPropModule"),this.data.list_cv_btn,resp); //No I18N
			this.setBodyLookUp(resp,this.data.LvHeader);
			this.setDisableRows(resp);
			this.setData('LvContent',resp);
			this.headerSelection();
		}.bind(this));
	},
	setRecordCount:function(arg){
		var seletedIdslen = this.data.cxPropSelectedIds ? this.data.cxPropSelectedIds.length : 0;
		if( !this.internalSelectionChange && arg && arg.item !== "cxPropModule" ){
			let oldValue = arg.oldValue ? arg.oldValue : [], newValue = arg.newValue ? arg.newValue : [];
			let addedIds = newValue.filter(x => !oldValue.includes(x)),
				removedIds = oldValue.filter(x => !newValue.includes(x));
				addedIds = addedIds.length > 0 ? addedIds : arg.insertedItems ? arg.insertedItems : [];
				removedIds = removedIds.length > 0 ? removedIds : arg.removedItems ? arg.removedItems : [];
			if( addedIds.length > 0){
				let container;
				addedIds.forEach(function(id){
					container = $L("#selectEntity_"+id)[0]; //No I18N
					if( container ){
						this.selectedEntity(container.querySelector('input'),this.data.LvContent); //No I18N
					}
				}.bind(this));
			}
			if( removedIds.length > 0){
				let container;
				removedIds.forEach(function(id){
					container = $L("#selectEntity_"+id)[0]; //No I18N
					if(container){
						this.selectedEntity(container.querySelector('input'),this.data.LvContent); //No I18N
					}
				}.bind(this));
			}
		}
		delete this.internalSelectionChange;
		if(seletedIdslen === 0){
			this.setData("selectedCount","");
		}else{
			var recordMsg =  seletedIdslen === 1  ? _cruxUtils.getI18n('crm.record.not.accessible') : _cruxUtils.getI18n('records');
			this.setData('selectedCount',_cruxUtils.getI18n('crm.listview.selected.records',seletedIdslen, recordMsg)); 
		}
	}.observes('cxPropSelectedIds.[]','cxPropModule'),
	observerField:function(){
		// if(this.getData('cxPropIsResizeEnabled') )
		// {
			this.checkForWidthUpdate();
			this.calculateWidthForTable();
		// }

	}.observes("LvHeader").on("init"),
	observeCustomview:function(){
		if(!this.data.isLvWrapper){ //this.onDataLoad &&    While set the customview using property it should allow to set the fields.
			this.setData({"listfields" : this.data.cxPropCustomView.fields , 'custom_view' : this.data.cxPropCustomView});
			this.constructCustomFields();
		}
	}.observes("cxPropCustomView","cxPropCustomView.{}"),
	observePerPage : function(arg){
		var arr=[10,20,30,40,50,100,500];
		var {cxPropPerPage : per_page , cxPropUserDetailsIsPaidUser : paid_user ,cxPropUserDetailsMaxRange : max_Range}=this.data;
		if(arr.indexOf(per_page)===-1 || (per_page === 100 && !paid_user) || (per_page === 500 && max_Range < 500)){
			if(arg && arg.oldValue){
				this.setData("per_page_val",arg.oldValue) ;
			}else{
				this.setData("per_page_val",10) ;
			}
		}else{
			this.setData("per_page_val", per_page) ;
		}
	}.observes("cxPropPerPage").on("init"),
	observeRecords : function(){
		if(this.onDataLoad && !this.data.isLvWrapper){
			var records=this.data.cxPropListViewContent;
			this.setData({"startIndex":0,"cxPropPage":1});
			this.setDataBeforeRender(records);
			this.setSortBySummary();
			this.constructCustomFields();
			this.setYieldInfo(this.getData("cxPropModule"),this.getData("list_cv_btn"),records);
			this.setData("lookupProperties",{});
			this.records=[];
			var rec_len=records.length;
			for(var i = 0;i < rec_len;i++){
					this.records.push(records[i].id);
			}
			this.setBodyLookUp(records,this.data.LvHeader);
			this.headerSelection();
			this.setDisableRows(records);
			this.setData("LvContent",records);
		}
	}.observes("cxPropListViewContent"),
	observeManageColumnsCscript: function  () {
			this.setData('isManageColumnsEnabled', this.chkManageColForLockedCVAvail(this.data.custom_view, this.data.cxPropAdmin) && this.data.manage_columns_visible);
	}.observes('manage_columns_visible'),
	setDisableRows : function(records) {
		var disableRows = this.data.cxPropDisabledList ? this.data.cxPropDisabledList : [] , dClass = this.data.cxPropDisableRowClass , disableCount = 0;
		if (disableRows.length > 0) {
			records.forEach(function(record) {
				if (disableRows.indexOf(record.id) > -1) {
					record.cxPropClass = record.cxPropClass ? record.cxPropClass + ' ' + dClass : dClass;
					disableCount++;
				}
			});
			if(disableCount === records.length){
				this.setData({'diableHeaderCheckbox' : true , "cxPropShowMaxSelectTooltip" : false});
			}else{
				this.setData({'diableHeaderCheckbox' : false , "cxPropShowMaxSelectTooltip" : true});
			}
		} else {
			this.setData({'diableHeaderCheckbox' : false , "cxPropShowMaxSelectTooltip" : true});
		}
	},
	getDefaultMenuValues : function(field){
		var isNumericField = ["phone","currency","integer","double"].includes(field.data_type) ;//No I18N
		return {
			asc  : {data_value : 'asc' , label : isNumericField ? '0-9' : _cruxUtils.getI18n('crm.column.sort.asc') , class : 'cxLvSortAscIcon'},
			desc : {data_value : 'desc' , label : isNumericField ? '9-0' : _cruxUtils.getI18n('crm.column.sort.desc') , class : 'cxLvSortAscIcon cxLvSortDesIcon'},
			unsort : {data_value : 'unsort' , label : _cruxUtils.getI18n('crm.column.unsort') , class : 'cxLvSortCloseIcon'},
			pin : {data_value : 'Pin Column' , label : _cruxUtils.getI18n('crm.customview.pin.column') , class : 'cxLvSortPinIcon'},
			unPin : {data_value : 'UnPin Column' , label : _cruxUtils.getI18n('crm.customview.unpin.column') , class : 'cxLvSortUnpinIcon'},
			hideCol : {data_value : 'Hide Column' , label : _cruxUtils.getI18n('crm.calendar.hide.events', _cruxUtils.getI18n('crm.report.column')) , class : 'zcicncss-eye-closed zcicn-cssIcons mR10'},
			mask : {data_value : 'mask' , label : _cruxUtils.getI18n('crm.masking.hide_masked_data') , class : 'cxMaskIcon cxSprite'},
			unmask : {data_value : 'unmask' , label : _cruxUtils.getI18n('crm.masking.view_masked_data') , class : 'cxUnmaskIcon cxSprite'}
		};
	},
	methods : {
		onClose : function(){
			if(this.getMethods('onCloseCallMenu')){
				/**
				 * This method will be executed on close of call menu
				 * @method onCloseCallMenu
				 * @author rafik.shaik
				 */
				this.executeMethod('onCloseCallMenu');
			}
		},
		onBeforeMenuClose:function(menu,event){
			if(event && event.target && event.target.closest( menu.ltProp( 'query' ) )){
				return false ;
			}
			// if(this.getMethods('onBeforeCallMenuClose')){
			// 	this.executeMethod('onBeforeCallMenuClose');
			// }
		},
		onBeforeShow:function(elem,event){
			if(event.type !== "click" && event.target){
				return false;
			}
			if(this.getMethods('onBeforeCallMenuShow')){
				/**
				 * This method will be executed on onBefore call menu show
				 * @method onBeforeCallMenuShow
				 * @author rafik.shaik
				 */
				this.executeMethod('onBeforeCallMenuShow',elem,event);
			}
		},
		subMenuClick:function(item,toMod){
			if(this.getMethods('onCallMenuClick')){
				/**
				 * This method on sub menu click
				 * @method onCallMenuClick
				 * @author rafik.shaik
				 */
				this.executeMethod('onCallMenuClick',item,"quickAction",this.getData("entityId"),toMod);
			}
		},
		setCss:function(result){
			var menu = $L('#cxLvCustomBtnMenu')[0].component;
			menu.setCss.call(menu);
			if(result.length === 0){ 
				if($L('.noresultstyle')[0]){
					return ;
				}
				var container = $L('#cvBtnContainer_' + this.data.cxPropId)[0];  // No I18N
				var div = document.createElement('div');
				div.setAttribute('class','noresultstyle');
				div.textContent = _cruxUtils.getI18n("crm.social.integ.no.result");
				container.appendChild(div) ;
			}else{
				var noresultdiv = $L('.noresultstyle')[0];
				if(noresultdiv){
					noresultdiv.remove();
				}
			}

		},
		customBtnClick : function(event){
			event.stopPropagation();
			event.preventDefault();
		},
		executeCustomButtonMethod : function(buttonId){
			this.executeCustomButton(buttonId,this.data.entityId);
		},
		makeSortableBtn : function(_menu,_event,menuOrigin){
			var cvSearchBtn = $L('#cxLvBtnSearch_' + this.data.cxPropId); //No i18n
			if(cvSearchBtn[0]){
				cvSearchBtn[0].setValue("");
			}
			$L(menuOrigin).closest('lyte-exptable-tr').addClass('cxLvTableRowHover'); //No i18n
			document.addEventListener( 'mouseover', this._menumove, true ); //eslint-disable-line @zoho/zstandard/no-body-events
		},
		hideMenu : function(){
			document.removeEventListener( 'mouseover', this._menumove, true );
			$L('.cxLvTableRowHover').removeClass('cxLvTableRowHover');
			var cvSearchBtn = $L('#cxLvBtnSearch_' + this.data.cxPropId); //No i18n
			if(cvSearchBtn[0]){
				cvSearchBtn[0].setValue("");
			}
		},
		onCallsMenuOpen : function(){
			var entityId = this.getData('entityId');//no i18n
			this.setData('callentityId',entityId);//no i18n
			var record = this.getData('LvContent').filter(function(record){
				return record.id === entityId ;
			});
			if( this.getData("cxPropModule") === "Appointments"){
				// var record = this.getData('LvContent').filter(function(record){
				//     return record.id === entityId ;
				// });
				this.setData({'serviceId': record[0].Service_Name.id,
				'isScheduled':record && record[0] && (record[0].Status === _cruxUtils.getI18n("Scheduled") || _cruxUtils.getI18n(record[0].Status) === _cruxUtils.getI18n("Overdue")) ? true : false,
				'appEndTime':record && record[0] ? record[0].Appointment_End_Time : undefined}) ;
				if(_cruxUtils.getI18n(record[0].Status) !== _cruxUtils.getI18n("Overdue")){
				store.findAll('servapp_preferences',{},false,true,{'module':"Appointments"}).then(function(res){
					if(res && res.length){
						this.setData('hasCompleteAction', res[0].appointments.when_duration_exceeds === "mark_as_complete" ? false : true);//no i18n
				$L('#appMoreOptionList').css("display","block");//No i18n
					}
				}.bind(this));
				}else{
					this.setData('hasCompleteAction', true);//no i18n
					$L('#appMoreOptionList').css("display","block");//No i18n
				}
			}
			else if(this.data.cxPropIsNewCallView){
				// var record = this.getData('LvContent').filter(function(record){//no i18n
				//     return record.id === entityId ;
				// });
				if(record && record[0] && record[0].Owner.id === this.data.cxPropUserDetailsId){
					this.setData('hasCompleteAction', true);//no i18n
				}else{
					this.setData('hasCompleteAction', false);//no i18n
				}
			}
		},
		onbeforeMenuClose:function(event){
			if(this.getData('cxPropModule') === 'Appointments'){
				Lyte.resolvePromises({
					'filesResolved' : Lyte.injectResources(networkUtils.returnDependencyFiles(["zohocrm_services.js"],ResourceConstants.CRM).concat(networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("businesshours")],ResourceConstants.CRM)).concat(networkUtils.returnDependencyFiles(["business_hours-model.js","crm-services-appointments.js","servapp_preferences_model.js"],ResourceConstants.CRMClient)))//no i18n
				}) ;
				}
			if(event && event.target && (event.target.id.indexOf('_more') !== -1 || event.target.id.indexOf('_mass_convert_Quotes') !== -1 || event.target.id.indexOf('_mass_convert_SalesOrders') !== -1)) {
				return false;
			}
		},
		addMoreOptions:function(){
			
			$L('#qAOptions_' + this.getData('entityId') + '_mass_convert_' + this.getData("cxPropModule")).removeClass('lvSelectItem');
			var activitiesMenu = [];
			var module = this.getData("cxPropModule");//No I18N
			var appointRL, activityRL, related_lists = this.relatedListForModule;
			if(related_lists === undefined) {
				if(this.data.cxPropModuleInfo.related_lists) {
					related_lists = this.data.cxPropModuleInfo.related_lists;
				}
				else {
					related_lists = this.data.cxPropRelatedList; //No I18N
				}
			}
			if(related_lists) {
				related_lists.filter(function(lists){
					appointRL = !appointRL ? lists.personality_name === "APPOINTMENTSPERSONALITY" : appointRL;  //No I18N
					activityRL = !activityRL ? lists.personality_name === "ACTIVITYPERSONALITY" : activityRL; //No I18N
				});
			}
			var mod_rec_map = this.data.cxPropModuleRecordMapping;
			if(activityRL && this.data.cxPropUserDetailsCrmImpliedCreateCalls && mod_rec_map.Calls && mod_rec_map.Calls.visible){
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.button.create.call"), value : "create_call", isNewCallView : this.data.cxPropIsNewCallView}); //No I18n
			}
			if(activityRL && this.data.cxPropUserDetailsCrmImpliedCreateEvents && mod_rec_map.Events && mod_rec_map.Events.visible){
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.module.create",_cruxUtils.getI18n("Meeting")), value : "create_meetings"}); //No I18n
			}
			if(appointRL && this.data.cxPropUserDetailsCrmImpliedCreateAppointments && mod_rec_map.Appointments && mod_rec_map.Appointments.visible) {
				activitiesMenu.push({name : _cruxUtils.getI18n("crm.module.create",_cruxUtils.getI18n("Appointment")), value : "create_appointment"}); //No I18n
			}
			$L('#qAOptions_' + this.getData('entityId') + '_more').addClass('lvSelectItem');
			this.setData('activitiesMenu',activitiesMenu); //No I18N

		},
		beforeSetFixTableColumnWidth:function(table){
			
			if(!this.getData('cv_width_updated')){
				table.classList.add("setMinWidthList");//No I18N
			}
		},
		afterSetFixTableColumnWidth : function(table){
			if(!this.getData('cv_width_updated')){
				table.classList.remove("setMinWidthList");//No I18N
		}
		},
		showMoreTags:function(){
			// some handling is pending
		},
		latestEntityIdFromTable:function(){
			
			var p = this.origEntRow;//No i18n
			if(p){
				var fn = $L.fastdom.mutate(function(){
					setTimeout(function(){
						var ele = this.$node.querySelector(".lyteExpTableOrigTableInnerWrap lyte-exptable-tr:nth-child(" + p + ")");//No i18n
						var height = ele.offsetTop - 45;
						$L(".lyteExpTableOrigTableInnerWrap",this.$node).scrollTop(height);	
					}, 60);	
					$L.fastdom.clear(fn);
				});
			}

		},
		itemDrop:function(){
			this.callcleasrselectedFields = true;
		},
		selectAllEntity:function(){
			this.selectAllEntity();
			this.addClassForSelectAll();
		},
		selectedEntity:function(element){
			
			this.selectedEntity(element,this.data.LvContent);
		// 	if(this.data.cxPropSelectedIds.length){
		// 		this.setData("showActionBtn",true); //No I18N
		// 	}else{
		// 	this.setData("showActionBtn",false); //No I18N
		// }
		this.addClassForSelectAll();
		},
		tableScroll:function(){
			var sortMenu = $L("#cxLvSortUnsortMenu",this.$node)[0];
			if(sortMenu){
				sortMenu.ltProp("show",false); //No i18n
			}

			// this.$node.querySelector('#sort_menu').ltProp('show',false);
			// this.setData('sortDetailshow',false);
			var $node = this.$node;
			var aplhaMenu = $L("#cxLvAlphaSortMenu_" + this.data.cxPropId,$node)[0];
			var descMenu = $L("#LvMoreDescMenu")[0];
			if(aplhaMenu){
				aplhaMenu.ltProp("show",false);
			}
			if(descMenu){
				descMenu.ltProp("show",false);
			}

			// this.setData('sortDetailshow',false)
		},
		clearSelected:function(option){
			var callList = $L('#cxLvMoreOptionsCallMenu')[0];
			if(callList){
				callList.ltProp("show", false); //No I18N
			}
			$L('#qAOptions_' + this.getData('entityId') + '_' + option).removeClass('lvSelectItem');

		},
		onbeforeCallsMenuClose:function(menu, event){
			if(event && event.target && (event.target.id.indexOf('_create_call') !== -1 && this.data.cxPropIsNewCallView || event.target.id.indexOf('_more') !== -1)) {
				return false;
			}

		},
		sortRecord:function(value ,event ,element ,sortElem, sortObj){
			var persistPinUpdate = this.getData('persistPinUpdate');//No I18n
			if(value === "Pin Column" || value === "UnPin Column")
			{
				if(this.getData("cxPropPinedFieldsLength") >= 1 && value === "Pin Column" || this.getData("islockedListView")) {
					return;
				}
				this.pinUnpinfield(value,persistPinUpdate);	
			}
			else
			{
				this.sortRecord(value, event, element, sortElem, sortObj);
				// this.setSortBySummary()
			}
		},
		sortBtnDisplay:function(ele,event,org_ele){	
			var field =  this.getFieldMeta( org_ele.parentElement.id );
			var custom_view= this.data.custom_view || store.peekRecord('custom_view',this.data.cxPropCvid);
			if( !field || !custom_view){
				_cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'invalid meta Data / custom_view info has been provided'}})
				var sortMenu = $L("#cxLvSortUnsortMenu",this.$node)[0];
				if(sortMenu){
					sortMenu.ltProp("show",false); //No i18n
				}
				return;
			}
			this.data.sortIconFieldId = field.id;
			let sortVal = this.getDefaultMenuValues(field);
			var sortObj = $L('#sorted_column_' + field.id,this.$node)[0];
			var sortDetails = [];
			// var sortDisplayDetails = {};
			var isNumericField = ["phone","currency","integer","double"].includes(field.data_type) ;//No I18N
			if(field.sortable){
				if(field.column_name === "BEST_TIME"){
					sortDetails = [sortVal.asc , sortVal.unsort]; //No I18N
					// sortDisplayDetails = {'asc' : _cruxUtils.getI18n('crm.column.sort.asc'), 'unsort' : 'unsort'}; //No I18N
				}
				else{
					if(sortObj && custom_view.sort_order === 'asc'){
						sortDetails = [sortVal.desc,sortVal.unsort]; //No I18N
					}
					else if(sortObj && custom_view.sort_order === 'desc'){
						sortDetails = [sortVal.asc,sortVal.unsort]; //No I18N
					}
					else{
						sortDetails = [sortVal.asc,sortVal.desc]; //No I18N
					}	
					// sortDisplayDetails = {'asc' : isNumericField ? '0-9' : _cruxUtils.getI18n('crm.column.sort.asc'), 'desc' : isNumericField ? '9-0' : _cruxUtils.getI18n('crm.column.sort.desc')}; //No I18N
			}
				
			}
			if(!window.clientPortalName && this.data.cxPropPinUnpinColumn) {
				var modInfo = this.data.cxPropModuleInfo ;
				var fieldsArr = custom_view.fields ;
				fieldsArr.forEach(function(item){
					if(field.id === item.id){
						switch(item._pin) {
							case true :
								sortDetails.push(sortVal.unPin); //No I18N
								// sortDisplayDetails['UnPin Column'] = "UnPin Column" ;
								break;
							case false :
								default :
								sortDetails.push(sortVal.pin); //No I18N
								// sortDisplayDetails['Pin Column'] = "Pin Column" ;
								break;
						}
					}
				});
			}; 
			if(this.data.cxPropActivityBadgeUpgradeEnabled){
				var {cxPropSystemName , cxPropModule , cxPropModuleRecordMapping , cxPropPermissions , LvContent , cxPropIsActivitySplitDone} = this.data;
				var isTeamModule= cxPropModuleRecordMapping[cxPropModule] ? cxPropModuleRecordMapping[cxPropModule].ccess_type === "team_based"  ? true : false : false ;
				var permission=isTeamModule ? cxPropPermissions["Crm_Implied_Manage_CustomViews_" + cxPropModule] : cxPropPermissions.Crm_Implied_Manage_CustomViews;	
				var showHideColumn =  ((cxPropSystemName && cxPropSystemName.indexOf("CONVERTEDVIEWS") !== -1 && !LvContent.length)  || !permission) ? false : (cxPropModule === "Activities" && cxPropIsActivitySplitDone) ? false : true;	//No I18N		
				if(this.data.cxPropEnableHideColumn && showHideColumn && this.data.cxPropShowManageColumn){
					sortDetails.push(sortVal.hideCol);
					// sortDisplayDetails['Hide Column'] = _cruxUtils.getI18n('crm.calendar.hide.events', _cruxUtils.getI18n('crm.report.column'));	//No I18N
				}	
			}
			var displayFields=this.data.cxPropDisplayField[this.data.cxPropModule] || [];
			var totDisplayFieldInView = 0;
			(this.getData("LvHeader")).forEach(function(item){	//No I18N
                if(displayFields.includes(item.api_name )){
                    totDisplayFieldInView+=1;
                }
            })
			var fieldColumn = this.getData("LvHeader").filter(obj=>obj.id ===  field.id)[0];
			var fieldPinned = fieldColumn.cxPropPinned || this.data.cv_mod_pined_fields.includes(field.id);
			if(fieldPinned || (displayFields.includes(field.api_name) && totDisplayFieldInView === 1) || this.getData("islockedListView")){
                this.setData("disableHideOpt",true);	
            }else{
                this.setData("disableHideOpt",false);	
            }
			var profileId = this.data.cxPropProfileId; //masking unmasking handling
			if(profileId && field.mask_details){
				var isMaskingNeeded = profileId && field.mask_details.profiles && field.mask_details.profiles.find((profile)=> profileId===profile.id);
				if(!isMaskingNeeded){
					return false;
				}else if(isMaskingNeeded){
					if(field.cxMasked || field.cxMasked === undefined){
						sortDetails.push(sortVal.unmask);
					}else{
						sortDetails.push(sortVal.mask);
					}
				}
			}
			this.setData({'sortDetails':sortDetails}) ; //'sortDisplayDetails':sortDisplayDetails
			return true;
		},
		//side Icon methods
		onMenuClose:function(fromAction){
			var recordId = fromAction === "quickAction" ? this.getData('recordObjForQuickAction') ? this.getData('recordObjForQuickAction').id : this.getData('entityId') : this.getData('callentityId'), //No I18N
			id = 'icons' + recordId,len = $L('.cxLvTableRowHover').length;//no i18n
			for(var i = 0;i < len;i++){
				// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
				if($L('#' + id,$L($L('.cxLvTableRowHover')[i])).length > 0){
					// eslint-disable-next-line @zoho/webperf/no-multipleDOMLookup
					$L($L('.cxLvTableRowHover')[i]).removeClass('cxLvTableRowHover');
				}	
			}
		},
		onManageColumnListOpen:function(){
			this.$node.querySelector(".cxLvTableManageMenuBtn").classList.add("cxLvMenuOpen");
		},
		onQuickActionsMenuOpen:function(ele,event,orgin_ele){
			orgin_ele.closest('lyte-exptable-tr').classList.add('cxLvTableRowHover');
		},
		onQuickActionsMenuClick:function(item,toMod){
			if(this.getMethods('onCallMenuClick')){
				/**
				 * This method  will be executed on quick action menu click
				 * @method onCallMenuClick
				 * @author rafik.shaik
				 */
				this.executeMethod("onCallMenuClick",item,"quickAction",this.getData("entityId"),toMod);
			}
		},
		onBeforeQuickActionsMenuOpen:function(){
					_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

			var actionsMenu = [];
			var moduleActions = this.data.cxPropModuleActionsMenu;
			var cxPropSystemName = this.data.cxPropSystemName;
			var entityId = this.getData('entityId');//no i18
			var module = this.getData('cxPropModule'); //No i18n
			var record = this.data.LvContent.filter(function(record){
				return record.id === entityId ;
			});
			record = record[0];
			this.setData("recordObjForQuickAction",record); //No I18N
			moduleActions.forEach(function(item){
				if(item.value === "Edit") { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					  if(!(record.$approved === false && record.$approval && record.$approval.resubmit === false || cxPropSystemName && cxPropSystemName.indexOf("REVIEWPROCESS") >= 0) && (record.$approval && record.$approval.resubmit || record.$approved   || record.$review || module === "Appointments") && !record.$stop_processing && !record.$in_merge && record.$review !== "Rejected" && this.data.cxPropCrmImpliedEditModule)
					  {
						  actionsMenu.push({name : "Edit", value : "Edit"}); //No I18N
					  } 
				} else if(item.value === "tag_op") {
					  if(record.Tag && record.Tag.length){
						  actionsMenu.push({name : _cruxUtils.getI18n("crm.label.edit.module",_cruxUtils.getI18n("crm.label.small.tags")), value : "edit_tag" }); //No I18N
					  } else  {
						  actionsMenu.push({name : _cruxUtils.getI18n("crm.label.add.tags"), value : "add_tag" }); //No I18N
					  }
				} else {
					  actionsMenu.push(item);
				}
	  }.bind(this));
	  this.setData('quickActionMenu', record.$stop_processing  ?  this.data.actionsForStopProcessingRec : actionsMenu); 
		},
		//crux-column-list methods
		columnResize:function(result){
			result && result.length ? this.setData('showPopoverfooter',true) : this.setData('showPopoverfooter',false);//no i18n
		},
		beforePopoverShow:function(modalComp){
			var customview = this.data.custom_view || store.peekRecord('custom_view',this.getData('cxPropCvid')); //No I18N
			this.columnListModal = modalComp.childComp;
			if(!customview){
				_cruxUtils.showCustomAlert({
					params : {ltPropPrimaryMessage : "Sorry, you don't have permission for that field. Please choose another one."}
				});
				return;
			}
			var cvFields = [];
			this.data.listfields.forEach(function(field){
				var obj = Object.assign({},field);
				cvFields.push(obj);
			});
			this.setData({"ordered_fields1": this.data.ordered_fields, //No i18n
			"selected_fields1":  this.data.listfields ? this.getCVFieldsWOWidth(cvFields) : cvFields} ); //No i18n

			if(this.callcleasrselectedFields){
				$L("crux-column-list" , this.columnListModal)[0].component.clearSelectedFields();
				this.callcleasrselectedFields = false;
			}

			if(this.data.activity_badge !== "Not_Supported" && this.data.activity_badge){
				Lyte.objectUtils( this.data.property_fields[0] , "add" , 'selected', this.data.activity_badge === "enabled"); //No I18N
			}

			this.resize();
		},
		onPopoverShow : function(){
			this.setData('isColumnListSaveDisabled',true);
		},
		beforeUnchecking:function(item){
			this.fieldmodified = true;
			var module = this.getData("cxPropModule"); //No I18n
			if(item.api_name === 'Name' && item.mandatory){
				return false;
			}
			if(item.pinned) {
				return false;
			}
			if((module === "Leads" || module === "Contacts") && item.mandatory){
				var fields = this.data.cxPropModuleInfo.fields, //No I18n
				lastnameid = fields.cruxFilterBy({"api_name" : "Last_Name"})[0].id, //No I18n
				fullnameid = fields.cruxFilterBy({"api_name" : "Full_Name"})[0].id,  //No I18n
				lastnameapi = this.data.ordered_fields.filter(function(item){ return item.id === lastnameid ; } )[0].api_name,
				fullnameapi = this.data.ordered_fields.filter(function(item){ return item.id === fullnameid ; } )[0].api_name,
				// lastName = document.getElementById(lastnameid+"_"+lastnameapi).checked,
				// fullName = document.getElementById(fullnameid+"_"+fullnameapi);
				lastName = $L("#" + lastnameid + "_" + lastnameapi)[0].checked,
				fullName = $L("#" + fullnameid + "_" + fullnameapi)[0];
				fullName = fullName ? fullName.checked : false;//no i18n
				if(lastName && fullName) {
					return true;
				}
				return false;
			}
			else if(item.mandatory){
				return false;
			}
			this.setData('isColumnListSaveDisabled',false);
			return true;

		},
		beforeSelection:function(field, elem){
			this.fieldmodified = true;
			var selectedFieldLen = $L("crux-column-list" , this.columnListModal)[0].component.getSelectedFields().length;
			if(!elem.classList.contains('cxColPropField') && selectedFieldLen >= this.data.cxPropMaxColCnt)
			{
				_cruxUtils.showCustomMessage({params : {ltPropType : "error", ltPropMessage :  _cruxUtils.getI18n("crm.alert.max.cvcols.reached",this.data.cxPropMaxColCnt)}}); //No i18n
					return false;
			}
			this.setData('isColumnListSaveDisabled',false);

		},
		PinOptionChanged:function(){
				this.fieldmodified = true;
				this.pinFieldModified = true;
				this.setData('isColumnListSaveDisabled',false);
		},
		beforePopoverClose:function(){
			if(this.getMethods('onBeforeColumnListClose')){
				/**
				 * This method will be executed on onBeforeColumnListClose
				 * @method onBeforeColumnListClose
				 * @author rafik.shaik
				 */
				this.executeMethod('onBeforeColumnListClose');
			}
		},
		//lyte-modal methods
		closePopover:function(){
			if(this.fieldmodified){
				this.callcleasrselectedFields = true;
			}
			this.fieldmodified = false;
			if(this.data.type === "modal")
			{
				this.setData("showModal",false);//No I18n
				$L('.cxColumnListNew').find('.divTopBorder').scrollTop(0);
			}
			else{ 
				this.$node.querySelector('#newPopup').ltProp("show",false); //No I18n
				$L('.addColumnPopover').find('.divTopBorder').scrollTop(0);
				this.setData('showModal',false);
			}

			if(this.data.from === "list")
			{
				// var comp = document.querySelector('crm-listview-options');//No I18n
				// if(comp){
					this.setData('columnListOpen',false);//No I18n
				// }
			}
			$L("#cruxColumnSearch")[0].setValue("");

		},
		//side icon lyte-popover methods
		popoverClose : function(){
			this.setData({'isOptionOpened':false,"showCont":false}) ;
		},
		//crux-table methods
		onResizeSelect:function(source){
			 if(source !== undefined) {
			var resizedColumn ;
			var nodes = this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow").children , node_len=nodes.length;
			for(var i = 0;i < node_len;i++){
				if(nodes[i].id === source.id){
					resizedColumn = nodes[i];
					break;
				}
			}
			if(resizedColumn){
				resizedColumn.classList.add("resizeSelect");
			}
			// resizedColumn ? resizedColumn.classList.add("resizeSelect") : ""
		}
			// if(source !== undefined) {
			// 	var resizedColumn = this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow").children.filter(function(item) { //No I
			// 		return item.id === source.id;
			// 	});
			// 	resizedColumn[0].classList.add("resizeSelect");
			// }
			//Fix for intial resize issue
			$L.fastdom.measure(function(){
				$L.fastdom.mutate(function(){
					if(this.data.cv_mod_fields.size === 0)
					{
						this.setData("cv_width_updated",true);//No I18N
					}
				}.bind(this));
			}.bind(this));

		},
		resizeColumn:function(source){
		
			// this.setData('disableResetOption',false);
			// this.setData("cv_width_updated",true);//No I18N
			var width ,
			id = source.id,
			_self = this ;
			 var field = this.findObjectFromArray(this.data.LvHeader,id , "id");
			 var resizedColumn;
			var originalHeader =  this.$node.querySelector(".lyteExpOriginalTable").querySelector("#cxLvTableHeaderRow"); //No I18N
			var nodes =  originalHeader.children , node_length=nodes.length;
			for(var n = 0;n < node_length;n++){
				if(id === nodes[n].id){
					resizedColumn = nodes[n];
					break;
				}
			}
			// var resizedColumn = originalHeader.children.filter(function(item) {
			// 	return item.id === id;
			// });
			// resizedColumn[0].classList.remove("resizeSelect");
			if(resizedColumn){
				resizedColumn.classList.remove("resizeSelect");
			}
			// resizedColumn ? resizedColumn.classList.remove("resizeSelect") : "";
			if(_self.data.cv_mod_fields.size === 0)	
			{
				$L.fastdom.measure(function(){
					var mapObj = _self.data.cv_mod_fields,
					headObj = originalHeader.querySelectorAll("lyte-exptable-th"),//No I18N
					headlen = headObj.length ;
					for(var it = 0 ; it < headlen ; it++)
					{
						if(headObj[it].id.length !== 0){
							var tmp = headObj[it].offsetWidth;
							var fieldObj = _self.findObjectFromArray(this.data.LvHeader,headObj[it].id , "id");
							fieldObj[0].style = "width:" + tmp + "px";//No I18N
							if(typeof CrmField !== 'undefined' && fieldObj[0].ui_type === CrmField.UITYPES.TAGS)
							{
								width = tmp;
							}
							mapObj.set(headObj[it].id , tmp);
						}
					}//No I18n
					$L.fastdom.mutate(function(){
						_self.setData({"cv_width_updated":true,"width_prev_cvid":_self.data.cxPropCvid});
						// _self.setData("cv_width_updated",true);//No I18N
						// _self.setData("width_prev_cvid",_self.data.cxPropModuleInfo.cvid);//No I18n
					}.bind(this));
				}.bind(this));
			}
			else
			{
				$L.fastdom.measure(function(){
					width = source.offsetWidth;
					field[0].style = "width:" + width + "px";//No I18N
					// this.setData('cv_mod_fields',[id,width])
					_self.data.cv_mod_fields.set(id , width);
					_self.setData("width_prev_cvid",_self.data.cxPropCvid);//No I18n
				}.bind(this));
			}
			
			if(field[0].api_name === 'Tag'){
				$L.fastdom.measure(function(){
					var tagWidth = width + "px";//No I18N
					field[0].tagWidth = tagWidth;
					_self.reRenderTagComponent(_self.data.clip_mode, tagWidth);
					// _self.setHeight();
				});
			}
			_self.setData('last_pop_entity',"");//No I18N
			setTimeout(function(){
				if(!_self.data.clip_mode){
					// this.setHeight();
				}
			}.bind(this),0);
		},
		showDropbox:function(menu,event,originElem){
			if(event && event.target.classList.contains("cxLvAlphaSortEdit")){
				return false;
			}
			if(originElem){
				this.setData({'alphaDropBoxField': this.getFieldMeta( originElem.closest("lyte-exptable-th").id ).api_name,
				"showAlphaDropBox":true}) ;
			}

		},
		hideDropBox:function(){
			this.setData({'alphaDropBoxField':"",'showAlphaDropBox':false});
		},
		AlphasortRecord:function(value, event, element, menuOriginElem){
					_cruxUtils.addMurhyInfo("crux-list-view.js", "Feb Default Changes");

				// var module_id = this.data.cxPropModuleInfo.id;
				this.setData("cxPropSearchLetter",value);
				if(this.data.cxPropSelectedIds && this.data.cxPropSelectedIds.length){
					this.selectAllEntity(true);
				}
			var orgin_field = menuOriginElem ? this.getFieldMeta( menuOriginElem.closest("lyte-exptable-th").id ) : undefined;//No I18N
			value !== "All" ? this.setData("cxPropSearchField",orgin_field.api_name) : this.setData("cxPropSearchField",undefined);
			this.setData('fieldName',orgin_field.api_name);
			this.onDataLoad=false;
			this.setData("cxPropListViewContent",[]);
			this.onDataLoad=true;
			this.records=[];
			// store.unloadAll(this.data.cxPropModuleInfo.id);
			// this.setData('page',1);
			// this.setData('startIndex',0)
			this.getCount = true ;
			this.setData("show_loading",true) ;
			// store.findRecord("custom_view",this.data.cxPropCvid,{module:this.data.cxPropModuleApiName}).then(function(resp){
				// this.setData({"custom_view":resp,'listfields':resp.fields})
				this.fetchRelatedRecords(1,0);
			// }.bind(this))
		},
		viewNavigate:function(from){
			var per_page = this.data.cxPropPerPage;
			var page = this.getData("cxPropPage");//no i18n
			page = from === "next" ? page + 1 : page - 1;//no i18n
			// this.setData("page", page);//no i18n
			
			if(this.getMethods("onListviewPaginate")){
				this.onPageNateCallback(page,per_page);
			}else{
				this.fetchRecords((page - 1) * per_page + 1,page,per_page) ;
			}
		},
		openDropdown:function(ev,value){
			if (Number(value) !== this.data.cxPropPerPage) {
				this.setData('cxPropPerPage', Number(value));
			}
			var page = this.data.startIndex > 1 ? Math.round(this.data.startIndex / Number(value) ) + 1 : 1;
			page = Number(value) * (page - 1) > this.data.startIndex ? page - 1 : page;
			var b = Number(value) * (page - 1) ;
			this.setData({'startIndex':b,'cxPropPage':page});
			if(this.getMethods("onListviewPaginate")){
				this.onPageNateCallback(page,this.data.cxPropPerPage);
			}else{
				this.fetchRecords(undefined,page,undefined) ;
			}
			
		},
		onBeforeDescMenuOpen : function(	menu ,event ,target_ele ){
			var parentWidthCheckList = 0;
			var lvFilterEle = $L('#lv_left_filter');
			var filterOuterWidth = lvFilterEle.outerWidth();
			var eventTar = $L(target_ele,this.$node);
			var {cxPropId,cxPropModuleInfo}=this.data;
			var menuElem = $L(`lyte-menu-box.LvDescMenuPopup_${cxPropId}`);
			var parentElementWidEle = eventTar.closest('.cxLvTextAreaElem');//No i18N
			var parentElemOffsetLeft = parentElementWidEle.offset().left;
			var parentWdithCheck = parentElementWidEle.outerWidth();
			this.setData("descDescription" , eventTar.closest('lyte-exptable-td')[0].innerText);//No I18N
			var elementTr = eventTar.closest('lyte-exptable-tr'); //No i18N
			var elementID = elementTr[0].id;
			var filterCheckWidth = cxPropModuleInfo.filter_status ? filterOuterWidth + 30 : 29;
			if(parentElemOffsetLeft < filterCheckWidth){
				parentWidthCheckList = parentWdithCheck - filterCheckWidth - Math.abs(parentElemOffsetLeft);
				if(parentWidthCheckList <= 400){
					parentWidthCheckList = 400;
				}
			}else {
				if(parentWdithCheck < 400) {
					parentWidthCheckList = 400;
				}else {
					parentWidthCheckList = parentWdithCheck;
				}
			}
			$L('#' + elementID).addClass('listTableHoverLabel');
			elementTr.addClass('listTableHoverLabel'); //No i18N
			menuElem.width(parentWidthCheckList);
			// $L('body').addClass('oH');
		},
		onHideDescMenu : function(ele,event){
			if(event.target.className === 'descCont' || event.target.className === 'descPre'){
				return false;
			}
			$L(`.LvDescMenuPopup_${this.data.cxPropId} .descCont`).scrollTo(0,0);
			$L('lyte-expresstable',this.$node).find('.listTableHoverLabel').removeClass('listTableHoverLabel'); //No i18N
			this.setData("descDescription" , "");//No I18N
			// $L('body').removeClass('oH');
		},	
		onDescMenuOpen : function (menu ,event ,target_ele){
			var {cxPropId,cxPropModuleInfo}=this.data;
			var lvFilterEle = $L('#lv_left_filter');
			var filterOuterWidth = lvFilterEle.outerWidth();
			var elemParent = $L(target_ele).closest('.cxLvTextAreaElem'),//No i18N
			winowWidth = $(document).outerWidth(),
			elemTargeOff = elemParent.offset(),
			menuElem = $L(`lyte-menu-box.LvDescMenuPopup_${cxPropId}`),
			offsetLef = elemTargeOff.left,
			menuTop = elemTargeOff.top,
			menuHeight = menuElem.outerHeight(),
			menuTopLayer = renderingUtils.windowOuterHeight - menuTop - 28;
			if(menuTopLayer < menuHeight){
				menuTop = menuTop + elemParent.outerHeight() - menuHeight;
			}
			var filterCheckWidth = cxPropModuleInfo.filter_status && filterOuterWidth && filterOuterWidth ? filterOuterWidth + 30 : 29;
			if(offsetLef < filterCheckWidth) {
				var remWid = offsetLef + elemParent.outerWidth();
				var forLeftVal = remWid - filterCheckWidth - 400;
				if(forLeftVal < 400 ){
					offsetLef = forLeftVal + filterCheckWidth;
				}else {
					offsetLef =  filterCheckWidth;
				}
			}
			var leftBal = winowWidth - offsetLef;
			if(leftBal < 400 ){
				offsetLef = offsetLef - (400 - leftBal);
			}
			menuElem.css({'top': menuTop - 1, 'left': offsetLef}); //No i18n
		}
	}
},{mixins : ["crux-mass-action-mixin"]});
// Lyte.Component.registerHelper('isActivitySplitNotDone', function(cxPropIsActivitySplitDone) {// no i18n
//     return !cxPropIsActivitySplitDone;
// });

Lyte.Component.registerHelper("cxGetActivityIcon", function(activityType){
	return activityType === "Events" ? "cxLvActEventIcon" : activityType === "Tasks" ? "cxLvActTaskIcon" : "cxLvActCallIcon";//No I18N
});
Lyte.Component.registerHelper("cxGetTagColor", function(date){
	//	var format = "MMM D, YYYY"; //NO I18N
	//	var formattedDate = Lyte.Transform.date.deserialize(date, format);
	//	return Utils.isToday(new Date(formattedDate)) ? "h_todaytask" : Utils.compareDates(new Date(), new Date(formattedDate)) ? "h_latertask" : "h_overdue"; //No I18n
		var month = date.split("-")[1];
		var year = new Date(date).getFullYear();
		var today = new Date();
		var day = date.split("-")[2];
		if(year > new Date().getFullYear()){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(year < new Date().getFullYear()){
			return "cxLvActOverdue"; //NO I18N
		}
		if(month > today.getMonth() + 1){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(month < today.getMonth() + 1){
			return "cxLvActOverdue"; //NO I18N
		}
		if(day > today.getDate()){
			return "cxLvActLaterTask"; //NO I18N
		}
		if(day < today.getDate()){
			return "cxLvActOverdue"; //NO I18N
		}
		return "cxLvActTodayTask"; //NO I18N
	
	
});
Lyte.Component.registerHelper("cxGetDateInUsrLocaleFormat", function(date, isNew){
		if(isNew || !date){
			return date;
		}
		var mixin = Lyte.registeredMixins["crux-element-validation"];//No I18n
		var format = "MMM D, YYYY"; //NO I18N
		function deserialize(value, pattern){
			if(value && mixin.isValidDate.call(this,value,"yyyy-mm-dd")){
				value = value.replace(/[+-]\d{2}:\d{2}/,'');
				var res = /^(.*)T/.exec(value);
				if(res){
					value = res[1];
				}
				var formattedDate = mixin.getDateInUserDatePattern(mixin.getDateObjectFromString(value, "YYYY-MM-DD"), pattern ? pattern : Crm.userDetails.DATE_PATTERN);//No I18n
				if(formattedDate){
					var month = formattedDate.slice(0,3);
					return formattedDate.replace(month,_cruxUtils.getI18n(month));
				}
			}
			return value;
		};
		var formattedDate = deserialize.call(this.component,date, format);
		var sameYear = false;
		var year;
		if(date &&  mixin.isValidDate.call(this.component,date,"YYYY-MM-DD", undefined, true)){
			year = mixin.getDateObjectFromString(date, "YYYY-MM-DD").getFullYear();//No I18n
		}
		else{
			year = $L.moment(date).toDate().getFullYear();
		}
		if( year === $L.moment().toDate().getFullYear()) {
			 format = format.split(",")[0];
			 sameYear = true;
		 }
		 formattedDate = deserialize.call(this.component,date, format).toUpperCase();
		var month = date.split("-")[1];
		var today = new Date();
		if(formattedDate.split(" ")[1] == today.getDate() && sameYear && month == today.getMonth() + 1){ //eslint-disable-line eqeqeq
			return _cruxUtils.getI18n("crm.livedesk.pot.today");
		}
		return formattedDate;
});
Lyte.Component.registerHelper("cxIndexOf", function(str, sub, opr, value){ //No I18N
	if(str && sub){
		return Lyte.Component.registeredHelpers.cxCheckComparison(str.indexOf(sub), value, opr);
	}
	return false;
});
Lyte.Component.registerHelper("cxContains",function(str1, str2) {
	if (str1 && typeof str1 === "string") {
		str1 = str1.replace(/'/g, '"');
		str1 = JSON.parse(str1);
	}
	if (str1 && str1.includes(str2)) {
		return true;
	}
	return false;
});
// Lyte.Component.registerHelper("isVisitorOnline", function(module, record_id){//No I18n
// 	if(typeof CrmTracking === 'object'){
// 		return CrmTracking.isEntityOnline(module,record_id);
// 	}
// 	return false;
// });
// Lyte.Component.registerHelper("getDynamicArray", function() {//No I18n
// 	return Array.from(arguments); //eslint-disable-line @zoho/zstandard/no-reserved-words
// });
// Lyte.Component.registerHelper('getModuleNameByApiName', function(apiname) //NO I18N
// {
// 	var moduleInfo = Crm.moduleInfo;
// 	for(var key in moduleInfo){
// 		var moduleObj = moduleInfo[key];
// 		if(moduleObj.apiname === apiname){
// 			return key;
// 		}
// 	}
// 	return undefined;
// });
// Lyte.Component.registerHelper("getLink",function(route, dynamicParam, queryParam){//NO I18N
// 	return Lyte.Router.getURL({"route" : route, "dynamicParams" : dynamicParam, "queryParams" : queryParam });  //NO I18N
// });
Lyte.Component.registerHelper("cxGetCVPicklistStyleObj", function(fieldVal,fieldObj) { //NO i18n
	return getPicklistStyleObj(fieldVal,fieldObj.pick_list_values);
});
Lyte.Component.registerHelper('cxCheckComparison', function (param1, param2, operator) {
	switch (operator) {
		case ">=": if (param1 >= param2) { return true; } break;
		case "<=": if (param1 <= param2) { return true; } break;
		case ">": if (param1 > param2) { return true; } break;
		case "<": if (param1 < param2) { return true; } break;
		case "=": if (param1 === param2) { return true; } break;
		case "==": if (param1 == param2) { return true; } break; //eslint-disable-line eqeqeq
		case "!=": if (param1 != param2) { return true; } break; //eslint-disable-line eqeqeq
	}
	return false;
});
// Lyte.Component.registerHelper('isEngLocale', function() {//No I18N
// 	var userInfo = Crm.userDetails;
// 	if(Crm.userDetails.CLIENT_ACCOUNT)
// 	{
// 		return false;
// 	}
// 	else if(userInfo && (userInfo.LOCALE === 'en_US' || userInfo.LOCALE === 'en_GB'))
// 	{
// 		return true;
// 	}
// });
Lyte.Component.registerHelper("cxGetModuleDisplayName", function(isSingular, isFirstLetterCaps, i18nNeeded,cxPropGetModuleDisplayNameInActivities) { // NO I18N
	if(typeof crm !== undefined){
		return Crm.getModuleDisplayName(isSingular, isFirstLetterCaps, i18nNeeded);
	}
	return cxPropGetModuleDisplayNameInActivities;
});
Lyte.Component.registerHelper("cxGetTerritorityValue",function(value){ //no i18n
	var s = [];
	if(value){
		value.forEach(function(item){
			s.push(item.Name);
		});
		return s.join(', ');
	}
	return '';
});
Lyte.Component.registerHelper('cxGetSingularLabel', function(moduleSysName, moduleId) {
	if(!moduleSysName && moduleId) {
		moduleSysName = idModuleMapping[moduleId];
	}
	return  moduleRecordMapping && moduleRecordMapping[moduleSysName] ? moduleRecordMapping[moduleSysName].singular_label : "";
});
Lyte.Component.registerHelper("cxEncodeJS", (function(e) {
    return $ESAPI.encoder().encodeForJavaScript(e)
}))
/**
* @syntax nonYielded
<crux-list-view
cx-prop-cvid="" 
cx-prop-module="Leads"
cx-prop-module-record-mapping="{{recordMapping}}" 
cx-prop-record-count="5"   
cx-prop-is-link-to-not-supported="true"
cx-prop-module-record-mapping='{"Leads":{"api_name":"Leads","module_name":"Leads","id":"1837270000000000125","singular_label":"Lead","display_field":{"api_name":"Last_Name"},"plural_label":"Naveens","generated_type":"custom"},"Contacts":{"api_name":"Contacts","singular_label":"Contact"}}'
cx-prop-custom-view='{"module":{"api_name":"Leads","id":"1837270000000000125"},"id":"1837270000000091501","fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner"},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company"},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862"}]}' 
cx-prop-list-view-content='[{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170150","Company":"Company_0","First_Name":"First Name_0","Last_Name":"Last Name_0","Full_Name":"Full Name_0","Email":"Email_0","Phone":"Phone_0","Mobile":"Mobile_0","Lead_Status":"Lead Status_0"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170151","Company":"Company_1","First_Name":"First Name_1","Last_Name":"Last Name_1","Full_Name":"Full Name_1","Email":"Email_1","Phone":"Phone_1","Mobile":"Mobile_1","Lead_Status":"Lead Status_1"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170152","Company":"Company_2","First_Name":"First Name_2","Last_Name":"Last Name_2","Full_Name":"Full Name_2","Email":"Email_2","Phone":"Phone_2","Mobile":"Mobile_2","Lead_Status":"Lead Status_2"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170153","Company":"Company_3","First_Name":"First Name_3","Last_Name":"Last Name_3","Full_Name":"Full Name_3","Email":"Email_3","Phone":"Phone_3","Mobile":"Mobile_3","Lead_Status":"Lead Status_3"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170154","Company":"Company_4","First_Name":"First Name_4","Last_Name":"Last Name_4","Full_Name":"Full Name_4","Email":"Email_4","Phone":"Phone_4","Mobile":"Mobile_4","Lead_Status":"Lead Status_4"}]'
cx-prop-module-info='{"custom_view":{"display_value":"All Leads","created_time":null,"access_type":"public","wrap_text":true,"criteria":{"comparator":"equal","field":{"api_name":"$converted"},"value":false},"system_name":"ALLVIEWS","module":{"api_name":"Leads","id":"1837270000000000125"},"sort_by":null,"created_by":null,"shared_to":null,"default":true,"modified_time":"2024-03-11T15:35:32+05:30","name":"All Open Leads","system_defined":true,"modified_by":{"name":"Shaik Rafik","id":"1837270000000438001"},"id":"1837270000000091501","fields":[
{"webhook":true,"field_label":"Company","tooltip":null,"type":"used","field_read_only":false,"display_label":"Company","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002860","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Company","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":1,"quick_sequence_number":"1","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":null,"Deals":null,"Accounts":"Account_Name"},"length":100,"column_name":"COMPANY","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":true,"multiselectlookup":{},"auto_number":{},"list_display_label":"Company","cxPropResize":"enable","style":"","cxPropPinned":false,"cxTypeMapping":"text"},
{"webhook":true,"field_label":"First Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"First Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002862","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"First_Name","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":27,"quick_sequence_number":"2","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"First_Name","Deals":null,"Accounts":null},"length":40,"column_name":"FIRSTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{}},
{"webhook":true,"field_label":"Last Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"Last Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002864","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Last_Name","unique":{},"pick_list_values":[],"system_mandatory":true,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":127,"quick_sequence_number":"3","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"Last_Name","Deals":null,"Accounts":null},"length":80,"column_name":"LASTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":1,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{},"mandatory":true,"cxTypeMapping":"text","list_display_label":"Last Name","cxPropClass":"undefined cxLvAlphaSearchIncl","cxPropResize":"enable","style":"","cxPropPinned":false}],"category":"public_views","last_accessed_time":"2024-03-20T18:42:55+05:30","locked":false,"sort_order":null,"favorite":null,"module_default":{"api_name":"Leads","id":"1837270000000000125"}},"fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner","lookup":{}},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company","lookup":{}},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862","lookup":{}}],"display_field":{"id":"","api_name":"Owner"},"module_name":"Leads","lookup_field_properties":{"fields":[{"api_name":"Owner","id":"111111000000002858"},{"api_name":"Mobile","id":"111111000000002876"}]}}'  >
</crux-list-view>
 */

/**
 * @component crm-listview
 * @author rafik.shaik
 * @summary  CRM wrapper component  for crux-list-view component
 */
Lyte.Component.register("crm-listview", {
_template:"<template tag-name=\"crm-listview\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxLvLoadingDiv\"><div class=\"cxSpinloader cxLvLoader\"></div></div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> {{addMurhyInfo(\"crm-listview.html\",\"Feb Default Changes\")}} <crux-list-view cx-prop-selected-ids=\"{{cxPropSelectedIds}}\" cx-prop-module=\"{{cxPropModule}}\" cx-prop-module-api-name=\"{{cxPropModuleApiName}}\" cx-prop-cvid=\"{{cxPropCvid}}\" cx-prop-is-link-to-not-supported=\"{{cxPropIsLinkToNotSupported}}\" cx-prop-module-record-mapping=\"{{cxPropModuleRecordMapping}}\" cx-prop-id-module-mapping=\"{{cxPropIdModuleMapping}}\" cx-prop-module-api-mapping=\"{{cxPropModuleApiMapping}}\" cx-prop-is-inventory-module=\"{{cxPropIsInventoryModule}}\" cx-prop-crm-implied-edit-module=\"{{cxPropCrmImpliedEditModule}}\" cx-prop-per-page=\"{{cxPropPerPage}}\" cx-prop-page=\"{{cxPropPage}}\" cx-prop-show-check-box=\"{{cxPropShowCheckBox}}\" cx-prop-show-edit-icon=\"{{cxPropShowEditIcon}}\" cx-prop-show-quick-actions-menu=\"{{cxPropShowQuickActionsMenu}}\" cx-prop-show-more-option=\"{{cxPropShowMoreOption}}\" cx-prop-show-more-option-after-edit=\"{{cxPropShowMoreOptionAfterEdit}}\" cx-prop-show-close-icon=\"{{cxPropShowCloseIcon}}\" cx-prop-show-search-letter=\"{{cxPropShowSearchLetter}}\" cx-prop-module-actions-menu=\"{{cxPropModuleActionsMenu}}\" cx-prop-search-letter=\"{{cxPropSearchLetter}}\" cx-prop-search-field=\"{{cxPropSearchField}}\" on-list-view-row-click=\"{{method('onWprListViewRowClick')}}\" on-custom-button-click=\"{{onWprCustomButtonClick}}\" on-before-load-failure=\"{{method('onWprBeforeLoadFailure')}}\" on-get-record-data=\"{{method('onWprGetRecordData')}}\" on-before-load-success=\"{{method('onWprBeforeLoadSuccess')}}\" on-call-menu-click=\"{{method('onWprCallMenuClick')}}\" cx-prop-fetch-count-values=\"{{cxPropFetchCountValues}}\" cx-prop-module-info=\"{{cxPropModuleData}}\" cx-prop-custom-button=\"{{cxPropCustomButton}}\" cx-prop-custom-view=\"{{cxPropCustomViewInfo}}\" cx-prop-list-view-content=\"{{cxPropListViewContent}}\" cx-prop-related-list=\"{{cxPropRelatedList}}\" cx-prop-record-count=\"{{cxPropRecordCount}}\" cx-prop-is-lookup-yield=\"{{cxPropIsLookupYield}}\" error-details=\"{{ErrorMsgData}}\" cx-prop-show-activity-badge=\"{{cxPropShowActivityBadge}}\" on-list-view-activity-badge-click=\"{{method('onWprActivityBadgeClick')}}\" is-lv-wrapper=\"true\" cx-prop-show-select-all=\"false\" cx-prop-show-manage-column=\"{{cxPropShowManageColumn}}\" cx-prop-show-sort-icon=\"{{cxPropShowSortIcon}}\" cx-prop-show-per-page-dropdown=\"{{cxPropShowPerPageDropdown}}\"> <template is=\"yield\" yield-name=\"listview-lookup\"> <lyte-yield yield-name=\"crmlist-{{fieldObj.yieldName}}\" record-obj=\"{{recordObj}}\" field-obj=\"{{fieldObj}}\" index-val=\"{{indexVal}}\"></lyte-yield> </template> </crux-list-view> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}],
_observedAttributes :["lyteViewPort","cxPropShowManageColumn","cxPropModuleInformationType","cxPropModuleApiName","cxPropModuleData","cxPropCustomViewInformationType","cxPropCvid","cxPropCustomViewInfo","cxPropPerPage","cxPropPage","cxPropSelectedIds","cxPropModuleRecordMapping","cxPropListViewContent","cxPropShowPerPageDropdown","cxPropContentOverflow","cxPropShowSortIcon","cxPropRecordCount","cxPropRelatedList","cxPropModuleApiMapping","cxPropIdModuleMapping","cxPropSearchLetter","cxPropSearchField","cxPropIsLinkToNotSupported","cxPropIsLookupYield","cxPropModule","cxPropFetchCountValues","cxPropIsInventoryModule","cxPropCrmImpliedEditModule","cxPropShowActivityBadge","cxPropShowCheckbox","cxPropShowEditIcon","cxPropShowQuickActionsMenu","cxPropShowMoreOption","cxPropShowMoreOptionAfterEdit","cxPropShowCloseIcon","cxPropShowSearchLetter","cxPropModuleActionsMenu","cxPropCustomButton","ErrorMsgData","isFieldChanged"],
_observedAttributesType :["boolean","boolean","string","string","object","string","string","object","number","number","array","object","array","boolean","boolean","boolean","number","array","object","object","string","string","boolean","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","array","object","boolean"],

	_lyteUtilFunctions: ["refresh","getSelectedIds"],
	data : function(){
		return {
			lyteViewPort: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
			 /**
             * @componentProperty { moduleApiName | moduleData  } cxPropModuleInformationType=moduleApiName
             * @author kuralarasan.s
             * @version 1.0.0
			 * @input
             */
			/**
			 * @componentProperty { boolean } cxPropShowManageColumn=false
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropShowManageColumn : Lyte.attr("boolean",{default : true}),//No I18N
			 cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true ,  "input" : true }),//no i18n
			/**
			 * @componentProperty { string } cxPropModuleApiName
			 * @author authorName
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleApiName
			 * @input
			 */
			cxPropModuleApiName:Lyte.attr("string",{default:"" ,"input" : true}),
			/**
			 * @componentProperty { object } cxPropModuleData
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @condition cxPropModuleInformationType moduleData
			 * @input
			 */
			cxPropModuleData:Lyte.attr("object",{default:{} , "input" : true}),
			 /**
             * @componentProperty { customviewId | customviewInfo  } cxPropCustomViewInformationType=customviewId
             * @author kuralarasan.s
             * @version 1.0.0
			 * @input
             */
			 cxPropCustomViewInformationType: Lyte.attr("string", { default: "", hideAttr: true , "input" : true }),//no i18n
			/**
			 * @componentProperty { string } cxPropCvid
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @condition cxPropCustomViewInformationType customviewId
			 * @input
			 */
			cxPropCvid : Lyte.attr("string",{"input" : true}), 
			/**
			 * @componentProperty { object } cxPropCustomViewInfo
			 * @author authorName
			 * @version 1.0.0
			 * @condition cxPropCustomViewInformationType customviewInfo
			 * @input
			 */
			cxPropCustomViewInfo:Lyte.attr("object",{"input" : true}),
			/**
			 * @componentProperty { 10 | 20 | 30 | 40 | 50  } cxPropPerPage=10
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @input
			 */
			cxPropPerPage:Lyte.attr('number',{"input" : true}),
			/**
			 * @componentProperty { number } cxPropPage
			 * @author rafik.shaik
			 * @version 1.0.0
			 * @input
			 */
			cxPropPage:Lyte.attr('number',{default:1 , "input" : true}),
			/**
			 * @componentProperty { array } cxPropSelectedIds
			 * @author siilambarasan.rt
			 * @version 1.0.0
			 * @input @output
			 */
			cxPropSelectedIds:Lyte.attr('array',{default:[] ,  "input" : true , "output" : true }),
			/**
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropModuleRecordMapping:Lyte.attr("object",{default:{}}),
			/**
			 * @componentProperty { array } cxPropListViewContent
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			cxPropListViewContent:Lyte.attr("array",{default:[]}),
			/**
			 * @componentProperty { number } cxPropRecordCount
			 * @author rafik.shaik
			 * @version 1.0.0
			 */
			/**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author rafik.shaik
             * @version 1.0.0
             */
			cxPropShowPerPageDropdown : Lyte.attr("boolean",{default:true}),
            cxPropContentOverflow: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropShowSortIcon:Lyte.attr("boolean",{default:true}),
			cxPropRecordCount:Lyte.attr("number"),
			cxPropRelatedList:Lyte.attr("array"),
			cxPropModuleApiMapping:Lyte.attr("object",{default:{}}),
			cxPropIdModuleMapping:Lyte.attr("object",{default:{}}),
			cxPropSearchLetter : Lyte.attr('string',{default:"All"}),
			cxPropSearchField : Lyte.attr('string'),
			cxPropIsLinkToNotSupported:Lyte.attr("boolean",{default:true}),
			cxPropIsLookupYield:Lyte.attr("boolean",{default:false}),
			cxPropModule:Lyte.attr('string'),
			cxPropFetchCountValues : Lyte.attr("boolean", {default :true}),
			cxPropIsInventoryModule:Lyte.attr("boolean",{default:false}),
			cxPropCrmImpliedEditModule:Lyte.attr("boolean",{default:false}),
			cxPropShowActivityBadge:Lyte.attr("boolean",{default:true}),
			cxPropShowCheckbox:Lyte.attr("boolean",{default:true}),
			cxPropShowEditIcon:Lyte.attr("boolean",{default:false}),
			cxPropShowQuickActionsMenu:Lyte.attr("boolean",{default:true}),
			cxPropShowMoreOption:Lyte.attr("boolean",{default:false}),
			cxPropShowMoreOptionAfterEdit:Lyte.attr("boolean",{default:false}),
			cxPropShowCloseIcon:Lyte.attr("boolean",{default:false}),
			cxPropShowSearchLetter:Lyte.attr("boolean",{default:true}),
			cxPropModuleActionsMenu : Lyte.attr('array',{default : [{"name":"Edit","value":"Edit"},{"name":"Change Owner","value":"change_owner"},{"name":"Delete","value":"mass_delete"}]}),
			cxPropCustomButton:Lyte.attr("array"),
			ErrorMsgData:Lyte.attr("object",{default:{"show_error":false}}),
			isFieldChanged : Lyte.attr("boolean",{default:false})
		};		
	},
	init:function(){
		if( typeof moduleRecordMapping !== "undefined" ){ 
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping);

		}
		if(Object.keys(this.data.cxPropIdModuleMapping).length === 0 && Object.keys(this.data.cxPropModuleApiMapping).length === 0){
			var idModuleMap = {}, moduleApiMap={} , moduleMap = this.data.cxPropModuleRecordMapping;
			for (var key in moduleMap) {
				idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
				moduleApiMap[key]= moduleMap[key].api_name;
			}
			this.setData({"cxPropIdModuleMapping":idModuleMap,"cxPropModuleApiMapping":moduleApiMap});
		}		
		if(!this.data.cxPropModule && !this.data.cxPropModuleApiName && this.data.cxPropModuleData){
			 this.setData("cxPropModule",this.data.cxPropModuleData.module_name);
			// this.setData("orginalModuleData",Lyte.deepCopyObject(this.data.cxPropModuleData));
		}else{
			this.setData({cxPropModuleData:  {} , cxPropCustomViewInfo: {}});	
		}
		if(!this.data.cxPropCvid && this.data.cxPropCustomViewInfo){
			// this.setData("cxPropCvid",this.data.cxPropCustomViewInfo.id);
			this.setData("orginalCustomViewInfo",Lyte.deepCopyObject(this.data.cxPropCustomViewInfo));
		}else{
			this.setData('cxPropCustomViewInfo',{});
		}
		if(!this.data.cxPropModule && this.data.cxPropModuleApiName){
			this.setModuleName() ;
		}
		this.setData("orginalModuleData",Lyte.deepCopyObject(this.data.cxPropModuleData));
		var crm_imp_edit_mod=(typeof Crm !== 'undefined')?Crm.userDetails.permissions["Crm_Implied_Edit_"+this.data.cxPropModule]:this.data.cxPropCrmImpliedEditModule;
		var is_inv_mod=(typeof Crm !== 'undefined') && Crm.isInventoryModule?Crm.isInventoryModule(this.data.cxPropModule):this.data.cxPropIsInventoryModule;
		this.setData({"cxPropCrmImpliedEditModule":crm_imp_edit_mod,"cxPropIsInventoryModule":is_inv_mod});
		this.moduleRecFlag=false;
		var {cxPropListViewContent : Lv_content}=this.data;
		if(Lv_content && Lv_content.length==0){
			this.setData("isFieldChanged",true) ;  
		}
		// else{
		// 	this.setData("cxPropModuleApiName",""); //  widget case observer issue fix when  module name entered for initial case .
		// }
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		onWprListViewRowClick:function(record,event){
			if(this.getMethods("onListViewRowClick")){
				/**
				 * This method will be triggered on Rowclick of list view
				 * @method onListViewRowClick
				 * @author rafik.shaik
				 */
				if( record && record.$ && record.$.toJSON ){
					record = record.$.toJSON();
				}
				this.executeMethod('onListViewRowClick',record,event);
			}
		},
		onWprCustomButtonClick:function(btnId,recId){
			if(this.getMethods('onCustomButtonClick')){
				this.executeMethod("onCustomButtonClick",btnId,recId);
			}
		},
		onWprBeforeLoadFailure:function(){
			if(this.getMethods("onBeforeLoadFailure")){
				/**
				 * This method will be triggered on failure  resp at initial load of component
				 * @method onBeforeLoadFailure
				 * @author rafik.shaik
				 */
				this.executeMethod("onBeforeLoadFailure");//No I18n
			}
		},
		onWprGetRecordData:function(cvid,resp){
			var _self=this;
			if(this.getMethods('onGetRecordData')){
				return new Promise((resolve) => {
					_self.executeMethod('onGetRecordData',cvid,resp)
					.then(resp=>resolve(resp))
					.catch(()=>resolve([]));
				});
			}
			return new Promise((resolve) => {
				resolve(resp);
			});
			
		},
		onWprBeforeLoadSuccess:function(cvid){
			if( this.getMethods("onBeforeLoadSuccess")){
				/**
				 * This method will be triggered on success resp at initial load of component
				 * @method onBeforeLoadSuccess
				 * @author rafik.shaik
				 */
				// resp = {};// temporary fix for builder issue.records are synched with iframe causing issue in builder
				this.executeMethod("onBeforeLoadSuccess", cvid);//No I18n
			}
		},
		onWprCallMenuClick:function(item,action_type,id,t_mod){
			var Lyte = window.Lyte;
			var action = item === "mass_delete" ? "delete" : item;
			if(this.getMethods("onBeforeQuickActionMenuClick")){
				/**
				* This method will be triggered on before Call menu  option click.
				* @method onBeforeQuickActionMenuClick
				* @author rafik.shaik
				*/
				this.executeMethod("onBeforeQuickActionMenuClick",action,id);
			}
			switch(item){
				case "Edit":
						var editUrl=window.location.origin + Lyte.Router.getURL({
							"route" : "crm.tab.module.entity.edit",//No I18N
							"dynamicParams" : [this.data.cxPropModule,id] //No I18N
						});
						if(this.getMethods("onEditQuickActionMenuClick")){
							/**
				 			* This method will be triggered on Call menu edit option click.
				 			* @method onEditQuickActionMenuClick
				 			* @author rafik.shaik
				 			*/
							this.LvExecuteHandler("onEditQuickActionMenuClick",{editUrl,item,action_type,id});
						}else{
							networkUtils.openUrl(editUrl, '_blank'); //No I18N
						}
					break;
				case "mass_delete":
				case "change_owner": 
						var comp=this.$node.querySelector("crux-list-view").component;
						Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-mass-action-mixin.js'], ResourceConstants.CRMClient) , networkUtils.returnDependencyFiles([networkUtils.getI18nJSUrl("MassTools")],ResourceConstants.CRM)], undefined, function () {
							if(item==='mass_delete'){
								action_type=undefined;
								customViewObject.selectedIds=[id];
							}else{
								customViewObject.selectedIdForQuickAction = [id];
							}
							this.updateAction(item, action_type, id, t_mod,comp);
						}.bind(this));
					break;
				default:
					if(this.getMethods('onQuickActionMenuClick')){
						this.executeMethod('onQuickActionMenuClick',action);
					}
					break;
			}
		},
		onWprActivityBadgeClick:function(recordObj){
			if(this.getMethods("onListViewActivityBadgeClick")){
			/**
			 * This method will be executed on activityBadgeClick
			 * @method onListViewActivityBadgeClick
			 * @author rafik.shaik
			 */
			if( recordObj && recordObj.$ && recordObj.$.toJSON ){
				recordObj = recordObj.$.toJSON();
			}
			this.executeMethod("onListViewActivityBadgeClick",recordObj);
			}
		}
	},
	LvExecuteHandler:async function(methodName,callBackObj){ 
		if(methodName=="onEditQuickActionMenuClick"){
			var {editUrl,item,action_type,id}=callBackObj;
			var resp=await Promise.resolve(this.executeMethod("onEditQuickActionMenuClick",item,action_type,id));
			if(resp){
				networkUtils.openUrl(editUrl, '_blank');
			}
		}
	},
	onComplete:function(){
		this.updateLvComponent();
	},
	onFailure:function(XHR){
		var check=this.onRecordDeleteFailure(XHR);
		if(check){
			this.updateLvComponent();
		}
	},
	updateLvComponent:function(){
		var _self=this.$node.querySelector("crux-list-view").component;
		_self.setData({'selectedRecords':true,'selectViewArray':[],'showSelectedDiv':false,'selectAllEntity':false});
		_self.getCount=true;
		_self.selectAllEntity(true);
		_self.fetchRelatedRecords();
	},
	updateAction:function(name,fromPlace,entityId,toMod,_self){
		var Lyte = window.Lyte;
		var module=this.data.cxPropModule;
			customViewObject.fromQuickActionsMenu = fromPlace === "quickAction" ? true : false;
		 var obj = {'ids':customViewObject.fromQuickActionsMenu ? entityId:{}};//no i18n
		 if(customViewObject.fromQuickActionsMenu){
			obj.from = "quickAction";//no i18n
			obj.old_owner_id = _self.data.recordObjForQuickAction.Owner ? _self.data.recordObjForQuickAction.Owner.id : "";
		} 
		var mixin=Lyte.registeredMixins['crm-mass-action-mixin']
		if(mixin){
			mixin.massAction(name,module,obj,this.onComplete.bind(this),this.onFailure.bind(this),fromPlace === "quickAction" ?"change_owner" : "mass_transfer"); //no i18n
		}
		
	},
	setModuleName:function(){
		var mod_name=Object.keys(this.data.cxPropModuleApiMapping).find(key => this.data.cxPropModuleApiMapping[key] === this.data.cxPropModuleApiName);
		if(this.data.cxPropModuleRecordMapping[mod_name] !==undefined && this.data.cxPropModuleRecordMapping[mod_name].show_as_tab){
			this.setData("cxPropModule",mod_name);
			return true;
		}
		return false;
	},
	didConnect:function(){
		/**
         * This function will render the listview component with given data. All mandatory properties required for rendering should be passed.
         * @utility refresh
        */
		this.$node.refresh=( cxPropModuleApiName , cxPropCvid , cxPropPage , cxPropPerPage ) => {
			this.setData("cxPropListViewContent",[]);
			this.reRenderListview(cxPropModuleApiName,cxPropCvid,cxPropPage,cxPropPerPage);
		};
		 /**
         * This utility function can be used to get the selected ids 
         * @utility getSelectedIds
         * @author siilambarasan.rt
         * @version 1.0.0
         */
		this.$node.getSelectedIds = ()=>{
			return $L('crux-list-view ' ,this.$node)[0].getSelectedIds();//no i18n
		};
	},
	reRenderListview:function(cxPropModuleApiName,cxPropCvid,cxPropPage,cxPropPerPage,cxPropModuleData,cxPropRecordCount,cxPropCustomViewInfo){
			if(this.setModuleName()){
				var list_view=this.$node.querySelector("crux-list-view");
				if( !list_view ){ return; }
				list_view = list_view.component;
				cxPropPage    	   = 	cxPropPage 	       || this.getData("cxPropPage");
				cxPropPerPage	   = 	cxPropPerPage      || this.getData("cxPropPerPage");
				cxPropSearchLetter =     this.getData("cxPropSearchLetter");
				cxPropSearchField  =     this.getData("cxPropSearchField");
				cxPropModuleData   =    cxPropModuleData   || {};
				list_view.onDataLoad=false;
				list_view.setData({ "cxPropModuleId":"" , cxPropCvid : cxPropCvid ,cxPropRecordCount : cxPropRecordCount , ShowLvLoading : true , show_loading : true });
				this.setData({ cxPropPage:cxPropPage , cxPropPerPage:cxPropPerPage , cxPropSearchLetter:cxPropSearchLetter , cxPropSearchField:cxPropSearchField, 
					cxPropModuleData:cxPropModuleData,
					cxPropCustomViewInfo:cxPropCustomViewInfo,
					cxPropRecordCount :cxPropRecordCount
				});
				if(typeof this.data.cxPropCvid !== 'undefined'){
					this.setData("cxPropCvid",cxPropCvid);
				}
				this.setData("ErrorMsgData",{});
				if(list_view){     
					list_view.init(true);
				}
			}
	},
	ConstructNewMapping:function(){
		if( typeof moduleRecordMapping !== "undefined" ){ 
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping);
			var idModuleMap = {}, moduleApiMap={} , moduleMap = this.data.cxPropModuleRecordMapping;
			for (var key in moduleMap) {
				idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
				moduleApiMap[key]= moduleMap[key].api_name;
			}
			this.setData({"cxPropIdModuleMapping":idModuleMap,"cxPropModuleApiMapping":moduleApiMap});
		}
	},
	ErrorMsgFn:function(msg){
		var obj=this.data.ErrorMsgData;
		obj.show_error=true;
		obj.message=msg;
		this.setData("ErrorMsgData",{});
		this.setData("ErrorMsgData",obj);
	},
	triggerCallbackFn : function(callBackName="",args=""){
		if( callBackName && this.getMethods(callBackName) ){
			this.executeMethod(callBackName, args);//No I18n
		}
	},
	observeModule:function(args){
		let calledFromObs = args && args.hasOwnProperty('newValue') && args.type === 'change' ;
		if(this.data.cxPropModuleApiName){
			this.setData("isFieldChanged",true);
			if(!this.moduleRecFlag){
				this.ConstructNewMapping();
				this.moduleRecFlag=true;
			}
			if(this.setModuleName()){
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data','cx-prop-list-view-content','cx-prop-module-record-mapping','cx-prop-record-count' , 'cx-prop-selected-ids']);
				}
				this.setData("cxPropListViewContent",[]);
				var cvid=this.data.oldModule===this.data.cxPropModule ? this.data.cxPropCvid : undefined ;
				if(calledFromObs && !cvid && this.getMethods('onBuilderPropertyRemove')){
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-cvid','cx-prop-custom-view-info']);
				}
				this.setData("oldModule",this.data.cxPropModule);
				this.reRenderListview(this.data.cxPropModuleApiName,cvid);
			}else{
				this.triggerCallbackFn('onBeforeLoadFailure' );//No I18n
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data']);
				}
				var msg="Mandatory module meta data / moduleApiName   for rendering listview component is missing/incorrect";
				this.ErrorMsgFn(msg);
			}
		}else{
			this.triggerCallbackFn('onBeforeLoadFailure');//No I18n
			var msg="Mandatory module meta data / moduleApiName   for rendering listview component is missing/incorrect."
			this.ErrorMsgFn(msg);
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropModuleApiName").on('init'),
	observeCvid:function(){
		if (this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', ['cx-prop-custom-view-info','cx-prop-list-view-content','cx-prop-module-record-mapping','cx-prop-record-count','cx-prop-selected-ids']);
		}
			this.setData("isFieldChanged",true);
			if(!this.moduleRecFlag){
				this.ConstructNewMapping();
				this.moduleRecFlag=true;
			}
			if(this.setModuleName()){
				this.setData("oldModule",this.data.cxPropModule);
			}
			this.setData("cxPropListViewContent",[]);
			this.reRenderListview(this.data.cxPropModuleApiName,this.data.cxPropCvid , undefined , undefined , this.data.cxPropModuleData );
			_cruxUtils.removeCustomAlert();
	}.observes("cxPropCvid"),
	observePerPage:function(){
		if(this.data.cxPropModule){
			if(this.data.cxPropPerPage == undefined ){
				this.setData("cxPropPerPage",10);
			}
			if(typeof this.data.cxPropPerPage !== 'undefined' && [10,20,30,40,50,100,500].indexOf(this.data.cxPropPerPage)===-1){
				var msg = 'The provided Per page value is invalid. It should be one of the following: 10, 20, 30, 40, 50, 100 or 500.';
				this.ErrorMsgFn(msg);
				return ;
			}
			if((this.data.cxPropPerPage===100 || this.data.cxPropPerPage==500) && typeof Crm !== "undefined" && !Crm.userDetails.ISPAID_USER ){
				var msg = 'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.';
				this.ErrorMsgFn(msg);
				// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Since this is a non-paid user account, they can only choose up to 50 records in the list view component.'}})
				return ;
			}
			if(this.data.cxPropPerPage==500 && typeof Crm !== 'undefined' && Crm.userDetails.maxRange <500 ){
				var msg = 'Your maximum allowed range is less than 500. Please select a smaller per page size.';
				this.ErrorMsgFn(msg);
				// _cruxUtils.showCustomAlert({params : {ltPropPrimaryMessage :'Your maximum allowed range is less than 500. Please select a smaller per page size.'}})
				return ;
			}
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			if(Lv_comp && Lv_comp.onDataLoad){
				_cruxUtils.removeCustomAlert();
				if(!this.data.isFieldChanged){
					Lv_comp.onBeforeLoad=true;
				}
				Lv_comp.fetchRelatedRecords();
			}
		}
	}.observes("cxPropPerPage"),
	observePage:function(){
		if(this.data.cxPropModule){
			if(this.data.cxPropPage && this.data.cxPropPage>0){
				var Lv_comp=this.$node.querySelector("crux-list-view").component;
				if(Lv_comp && Lv_comp.onDataLoad){
					_cruxUtils.removeCustomAlert();
					if(!this.data.isFieldChanged){
						Lv_comp.onBeforeLoad=true;
					}
					Lv_comp.fetchRelatedRecords();
				}
			}else{
				var msg='Mandatory module meta data / page  for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
			}
		}
	}.observes("cxPropPage"),
	observeModuleData:function(){
		var {cxPropModuleData, orginalModuleData}=this.data;
		if(!$u.isEqual( cxPropModuleData , orginalModuleData ,false) && cxPropModuleData){
			this.setData("orginalModuleData",cxPropModuleData);
			this.setData("isFieldChanged",true);
			var {api_name,module_name,fields,custom_view}=cxPropModuleData;
			if(!api_name || !module_name || !Array.isArray(fields) || fields.length === 0 || typeof custom_view !== 'object' || custom_view === null || Object.keys(custom_view).length === 0 ){
				var msg= 'Mandatory module meta data (moduleData) for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
				return ;
			}
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			if(cxPropModuleData && Lv_comp.onDataLoad){
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name']);
				}
				if(Object.keys(cxPropModuleData).length>0){
					this.setData("cxPropModuleApiName",cxPropModuleData.api_name);
					Lv_comp.setData("cxPropModuleId",cxPropModuleData.id);
					var {cxPropModuleApiName , cxPropCvid , cxPropRecordCount , cxPropCustomViewInfo}=this.data;
					Lv_comp.makeApiRequests(true);
				}
			}else if(Lv_comp.onDataLoad){
				var msg='Mandatory module meta data  / ModuleData  for rendering listview component is missing/incorrect';
				this.ErrorMsgFn(msg);
			}
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropModuleData","cxPropModuleData.{}"),
	observeCustomViewInfo:function(){
		var {cxPropCustomViewInfo,orginalCustomViewInfo}=this.data;
		if(!$u.isEqual( cxPropCustomViewInfo , orginalCustomViewInfo ,false) && cxPropCustomViewInfo && Object.keys(cxPropCustomViewInfo).length !== 0){
			var Lv_comp=this.$node.querySelector("crux-list-view").component;
			this.setData("orginalCustomViewInfo",cxPropCustomViewInfo);
			this.setData("isFieldChanged",true);
			var {id,fields}=cxPropCustomViewInfo;
			if(!id || !Array.isArray(fields) || fields.length === 0 ){
				var msg= 'Mandatory module meta data (customViewInfo) for rendering listview component is missing/incorrect.';
				this.ErrorMsgFn(msg);
				return ;
			}else{
				if(this.getMethods('onBuilderPropertyRemove')){
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-cvid']);
				}
				if(Object.keys(cxPropCustomViewInfo).length>0){
					this.setData("cxPropCvid",this.data.cxPropCustomViewInfo.id);
					var {cxPropModuleApiName,cxPropCvid,cxPropModuleData,cxPropRecordCount}=this.data;
					Lv_comp.makeApiRequests(true);
				}else if(Lv_comp.onDataLoad){
					var msg= 'Mandatory module meta data  / customviewId  for rendering listview component is missing/incorrect.';
					this.ErrorMsgFn(msg);
				}
			}
		}
		_cruxUtils.removeCustomAlert();
	}.observes("cxPropCustomViewInfo","cxPropCustomViewInfo.{}")
},{mixins : ["crux-mass-action-mixin"]});
/**
* @syntax nonYielded
<crm-listview
cx-prop-content-overflow="true"
cx-prop-module-information-type="moduleData"
cx-prop-custom-view-information-type="customviewInfo"
cx-prop-record-count="5"
cx-prop-page="1"
cx-prop-per-page="10"
cx-prop-module-record-mapping='{"Leads":{"api_name":"Leads","module_name":"Leads","id":"1837270000000000125","singular_label":"Lead","display_field":{"api_name":"Last_Name"},"plural_label":"Naveens","generated_type":"custom","show_as_tab":true},"Contacts":{"api_name":"Contacts","singular_label":"Contact","show_as_tab":true}}'
cx-prop-custom-view-info='{"module":{"api_name":"Leads","id":"1837270000000000125"},"id":"1837270000000091501","fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner"},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company"},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862"}]}' 
cx-prop-list-view-content='[{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170150","Company":"Company_0","First_Name":"First Name_0","Last_Name":"Last Name_0","Full_Name":"Full Name_0","Email":"Email_0","Phone":"Phone_0","Mobile":"Mobile_0","Lead_Status":"Lead Status_0"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170151","Company":"Company_1","First_Name":"First Name_1","Last_Name":"Last Name_1","Full_Name":"Full Name_1","Email":"Email_1","Phone":"Phone_1","Mobile":"Mobile_1","Lead_Status":"Lead Status_1"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170152","Company":"Company_2","First_Name":"First Name_2","Last_Name":"Last Name_2","Full_Name":"Full Name_2","Email":"Email_2","Phone":"Phone_2","Mobile":"Mobile_2","Lead_Status":"Lead Status_2"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170153","Company":"Company_3","First_Name":"First Name_3","Last_Name":"Last Name_3","Full_Name":"Full Name_3","Email":"Email_3","Phone":"Phone_3","Mobile":"Mobile_3","Lead_Status":"Lead Status_3"},{"Owner":{"name":"rafik.shiak","id":"1999180000000451001","email":"rafik.shaik+sdfsd@zohotest.com"},"id":"18372700000000170154","Company":"Company_4","First_Name":"First Name_4","Last_Name":"Last Name_4","Full_Name":"Full Name_4","Email":"Email_4","Phone":"Phone_4","Mobile":"Mobile_4","Lead_Status":"Lead Status_4"}]'
cx-prop-module-data='{"custom_view":{"display_value":"All Leads","created_time":null,"access_type":"public","wrap_text":true,"criteria":{"comparator":"equal","field":{"api_name":"$converted"},"value":false},"system_name":"ALLVIEWS","module":{"api_name":"Leads","id":"1837270000000000125"},"sort_by":null,"created_by":null,"shared_to":null,"default":true,"modified_time":"2024-03-11T15:35:32+05:30","name":"All Open Leads","system_defined":true,"modified_by":{"name":"Shaik Rafik","id":"1837270000000438001"},"id":"1837270000000091501","fields":[{"webhook":true,"field_label":"Company","tooltip":null,"type":"used","field_read_only":false,"display_label":"Company","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002860","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Company","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":1,"quick_sequence_number":"1","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":null,"Deals":null,"Accounts":"Account_Name"},"length":100,"column_name":"COMPANY","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":true,"multiselectlookup":{},"auto_number":{},"list_display_label":"Company","cxPropResize":"enable","style":"","cxPropPinned":false,"cxTypeMapping":"text"},
{"webhook":true,"field_label":"First Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"First Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002862","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"First_Name","unique":{},"pick_list_values":[],"system_mandatory":false,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":27,"quick_sequence_number":"2","currency":{},"custom_field":false,"lookup":{},"convert_mapping":{"Contacts":"First_Name","Deals":null,"Accounts":null},"length":40,"column_name":"FIRSTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":0,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{}},{"webhook":true,"field_label":"Last Name","tooltip":null,"type":"used","field_read_only":false,"display_label":"Last Name","read_only":false,"association_details":null,"businesscard_supported":false,"multi_module_lookup":{},"id":"111111000000002864","filterable":true,"visible":true,"refer_from_field":null,"profiles":[{"permission_type":"read_write","name":"Administrator","id":"111111000000044611"}],"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"subform":null,"separator":false,"searchable":true,"show_type":7,"external":null,"api_name":"Last_Name","unique":{},"pick_list_values":[],"system_mandatory":true,"virtual_field":false,"json_type":"string","crypt":null,"created_source":"default","available_in_user_layout":true,"display_type":-1,"ui_type":127,"quick_sequence_number":"3","currency":{},"custom_field":false,"lookup":{},"convert_mapping":
{"Contacts":"Last_Name","Deals":null,"Accounts":null},"length":80,"column_name":"LASTNAME","pick_list_values_sorted_lexically":false,"sortable":true,"history_tracking":null,"data_type":"text","formula":{},"category":1,"decimal_place":null,"mass_update":false,"multiselectlookup":{},"auto_number":{},"mandatory":true,"cxTypeMapping":"text","list_display_label":"Last Name","cxPropClass":"undefined cxLvAlphaSearchIncl","cxPropResize":"enable","style":"","cxPropPinned":false}],"category":"public_views","last_accessed_time":"2024-03-20T18:42:55+05:30","locked":false,"sort_order":null,"favorite":null,"module_default":{"api_name":"Leads","id":"1837270000000000125"}},"fields":[{"field_label":"Lead Owner","type":"used","display_label":"Lead Owner","ui_type":8,"available_in_user_layout":true,"visible":true,"id":"111111000000002858","api_name":"Owner","lookup":{}},{"field_label":"Company","type":"used","display_label":"Company","ui_type":1,"available_in_user_layout":true,"visible":true,"id":"111111000000002860","api_name":"Company","lookup":{}},{"field_label":"First Name","api_name":"First_Name","available_in_user_layout":true,"ui_type":27,"type":"used","visible":true,"display_label":"First Name","id":"111111000000002862","lookup":{}}],"display_field":{"id":"","api_name":"Owner"},"module_name":"Leads","api_name":"Leads","lookup_field_properties":{"fields":[{"api_name":"Owner","id":"111111000000002858"},{"api_name":"Mobile","id":"111111000000002876"}]}}'>
</crm-listview>
*/
//# sourceMappingURL=list-view.js.map