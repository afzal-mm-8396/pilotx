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
