Lyte.Mixin.register("crux-create-base-mixin", {
	/**
	 * callbacks -
	 * 	onFormCancel
	 * 	onCustomButtonClick
	 * 	onCustomButtonActionTrigger
	 * 	onCustomButtonBeforeShow
	 * 	onFormValueChange
	 * 	onInstanceObjKeyCreation
	 * 	onFormBeforeRender
	 * 	onFormAfterRender
	 * 	onSubformValueChange
	 * 	onVrFunctionResponse
	 * 	fetchLookupModuleData
	 * 	fetchLookupRecords
	 * 	onFormSave
	 * 	onFormAfterSave
	 * 	formFieldOfLookup
	 * 	onFormLayoutSwitch
	 */
	actions: {
		openQuickCreateForm: function (fromModal, fromSubform, cxPropFieldData, cruxLookupElmId, subSectionCurntInstObj, recordObj) {
			let qcObject = { fromModal, fromSubform, cxPropFieldData, cruxLookupElmId, subSectionCurntInstObj, recordObj };
			qcObject.currentFieldNode = this.$node;
			let fieldMeta = cxPropFieldData || this.data.cxPropFieldData;
			qcObject.cxPropFieldData = fieldMeta;
			var onBeforeSaveCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onQuickCreateClick', onQuickCreateClick: qcObject });//no i18n
			onBeforeSaveCallBackResponse.then((promiseResponse) => {
				if (promiseResponse === 'NO_MATCHING_CALLBACKS') {
					setTimeout(() => {
						this.quickCreateFromModal = fromModal;
						let subformDetailsObj = { fromSubform, cxPropFieldData, cruxLookupElmId, subSectionCurntInstObj, recordObj };
						this.hideLookupDropdown(Object.assign({ fromModal }, subformDetailsObj));
						let layoutComponentData = this.data.cxPropLayoutComponentData, newLayoutRenderingObj = {},
							lookupModuleDetails = Lyte.deepCopyObject(fieldMeta.lookup.module || {}),
							originalLayoutComponentData = (layoutComponentData.layoutComponentDomNode.component.data.originalLayoutComponentData || {}),
							{ cxPropOutletValue } = originalLayoutComponentData;
						let lookupModuleRecord = layoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[lookupModuleDetails.id];
						if (lookupModuleRecord) {
							lookupModuleDetails.moduleName = lookupModuleRecord.module_name;
						}
						newLayoutRenderingObj.cxPropModuleName = lookupModuleDetails.moduleName;
						newLayoutRenderingObj.cxPropModuleId = lookupModuleDetails.id;
						newLayoutRenderingObj.cxPropModuleApiName = lookupModuleDetails.api_name;
						newLayoutRenderingObj.cxPropOutletValue = (cxPropOutletValue || "body");//no i18n
						newLayoutRenderingObj.isQuickCreate = true;
						let callbackObject = {};
						callbackObject.onFormAfterSave = this.onFormAfterSave.bind(this, newLayoutRenderingObj, subformDetailsObj);
						callbackObject.onFormCancel = this.onFormCancel.bind(this, newLayoutRenderingObj, subformDetailsObj);
						newLayoutRenderingObj.cruxFormCallbacks = callbackObject;
						Lyte.Component.render('crux-createform', {//no i18n
							cxPropLayoutComponentData: newLayoutRenderingObj,
							cxPropRenderMode: "modal",//no i18n
						}, cxPropOutletValue);
						if (fromModal) {
							this.hideLookupModal(Object.assign({ fromModal }, subformDetailsObj));
						}
					}, 25);
				}
			});
		}
	},
	methods: {
		// Common methods across components
		dropdownBeforeShow: function () {
			//dropdownBeforeShow - crux
		},
		cruxOpenDropdown: function () {
			//cruxOpenDropdown - crux
		},
		commonDropDownOnHide: function () {
			//commonDropDownOnHide - crux
		},
		setdropdownData: function () {
			//setdropdownData - crux
		},
		fetchModuleData: function (fieldMeta, id) {
			return this.invokeCruxFormCallBacks({ callbackEventName: 'fetchLookupModuleData', fetchLookupModuleData: { id, fieldMeta } });//no i18n
		},
		cxfetchLookupRecords: function (fieldMeta, moduleId, queryParams) {
			return this.invokeCruxFormCallBacks({ callbackEventName: 'fetchLookupRecords', fetchLookupRecords: { moduleId, queryParams, fieldMeta } });//no i18n
		},
		onLookupBeforeRequestChangeData: function (query, customData, field) {
			return this.invokeCruxFormCallBacks({
				callbackEventName: 'beforeRequestChangeData', //no i18n
				beforeRequestChangeData: { query, customData, field }
			});
		}
	},
	generateDynamicInstanceKey: function () {
		//Generate and create dynamic current instance object if not available
		var currentInstObjKey = this.data.currentInstObjKey;
		if (!currentInstObjKey) {
			currentInstObjKey = this.getDynamicCurrentInstanceObjKey({ actionName: "cxCreate" });//no i18n
			this.setData('currentInstObjKey', currentInstObjKey);//no i18n
		}
		if (currentInstObjKey) {
			currentInstObjKey = this.generateCurrentInstanceObject({ instanceObjKey: currentInstObjKey, moduleData: this.data.cxPropModuleData });
		}
		return currentInstObjKey;
	},
	getDynamicCurrentInstanceObjKey: function (customData) {
		if (!customData) {
			customData = {};
		}
		var actionName = customData.actionName || "", finalString = "cxInstObj" + actionName, len = customData.charLen || 3;//No I18n
		for (var k = 0; k < len; k++) { //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
			finalString += Math.floor(Math.random() * 100).toString(36);
		}
		return finalString;
	},
	generateCurrentInstanceObject: function (customData) {
		if (!customData) {
			customData = {};
		}
		if (!customData.instanceObjKey && this.getDynamicCurrentInstanceObjKey) {
			customData.instanceObjKey = this.getDynamicCurrentInstanceObjKey(customData);
		}
		var currentInstObjKey = customData.instanceObjKey, copyFromExisting;
		if (customData.hasOwnProperty('copyFromExisting')) {
			copyFromExisting = true;
		}
		if (currentInstObjKey) {
			if (customData.moduleData && this.isEmptyObj(customData.moduleData[currentInstObjKey])) {
				customData.moduleData[currentInstObjKey] = {};
				if (copyFromExisting && customData.parentInstObjKey && customData.copyFromExisting.indexOf('moduleData') !== -1 && !this.isEmptyObj(customData.moduleData[customData.parentInstObjKey])) {
					customData.moduleData[currentInstObjKey] = Lyte.deepCopyObject(customData.moduleData[customData.parentInstObjKey]);
				}
			}
			if (customData.moduleSections) {
				var moduleSections = customData.moduleSections || [];
				moduleSections.forEach(function (section) {
					if (this.isEmptyObj(section[currentInstObjKey])) {
						section[currentInstObjKey] = {};
					}
				}.bind(this));
			}
			if (customData.moduleFields) {
				var moduleFields = customData.moduleFields || [];
				moduleFields.forEach(function (field) {
					if (this.isEmptyObj(field[currentInstObjKey])) {
						field[currentInstObjKey] = {};
					}
				}.bind(this));
			}
		}
		return customData.instanceObjKey;
	},
	deleteCurrentInstanceObject: function (customData) {
		if (!customData) {
			customData = {};
		}
		var currentInstObjKey = customData.instanceObjKey;
		if (currentInstObjKey) {
			if (customData.moduleData) {
				delete customData.moduleData[currentInstObjKey];
			}
			if (customData.moduleSections) {
				var moduleSections = customData.moduleSections || [];
				moduleSections.forEach(function (section) {
					delete section[currentInstObjKey];
					var sectionFields = section.fields || [];
					sectionFields.forEach(function (sfield) {
						delete sfield[currentInstObjKey];
					});
				});
			}
			if (customData.moduleFields) {
				var moduleFields = customData.moduleFields || [];
				moduleFields.forEach(function (field) {
					delete field[currentInstObjKey];
				});
			}
		}
	},
	isValidFieldToRender: function (fieldInfo, customData) {
		customData = customData || {};
		var columnsToSkip = customData.columnsToSkip || [], apiNamesToSkip = customData.apiNamesToSkip || [], uiTypeToSkip = customData.uiTypeToSkip || [];
		if (fieldInfo) {
			var isValid = fieldInfo.visible &&
				(
					columnsToSkip.indexOf(fieldInfo.column_name) === -1
					&& apiNamesToSkip.indexOf(fieldInfo.api_name) === -1 //no i18n
					&& uiTypeToSkip.indexOf(fieldInfo.ui_type) === -1
				);
			if (isValid && fieldInfo.column_name === "LAYOUTID" && customData.currentPage === "create") {
				isValid = false;
			}
			return isValid;
		}
		return false;
	},
	isValidVRFieldForInventory: function (fldMeta, moduleName) {
		let isInvModule = this.isInventoryModule(moduleName);
		if (isInvModule && ['DISCOUNT', 'TAX'].includes(fldMeta.column_name) &&//NO I18N
			!fldMeta.custom_field && !this.isEmptyObj(fldMeta.subform)) {
			return true;
		}
		return false;
	},
	addCustomValidationsforField: function (customData) {
		if (!customData) {
			customData = {};
		}
		var fieldMeta = customData.cxPropFieldData || {}, formFieldList = customData.formFieldList && customData.formFieldList[fieldMeta.api_name];
		formFieldList.validation = [];
		if (fieldMeta.required) {
			formFieldList.validation.push('cxFormEmptyValueValidation');//no i18n
			if (fieldMeta.data_type === 'picklist') {
				formFieldList.validation.push('cxFormPicklistValidation');//no i18n
			}
		}
		if (fieldMeta.data_type === 'email') { //no i18n
			formFieldList.validation.push('cxFormEmailValidation');//no i18n
		} else if (fieldMeta.data_type === 'website') { //no i18n
			formFieldList.validation.push('cxFormWebsiteValidation');//no i18n
		} else if (fieldMeta.data_type === 'date' || fieldMeta.data_type === 'datetime') { //no i18n
			formFieldList.validation.push('datetimeValidation');//no i18n
		} else if (fieldMeta.data_type === "currency" || (fieldMeta.data_type === 'double' && fieldMeta.column_name !== 'EXCHANGERATE')) {
			formFieldList.validation.push('cxFormDecimalValidation');//no i18n
		} else if (fieldMeta.data_type === 'phone' || fieldMeta.column_name === 'FAX') {
			formFieldList.validation.push('cxFormPhonenumValidation');//no i18n
		} else if (fieldMeta.data_type === 'fileupload' || fieldMeta.data_type === 'imageupload') {
			formFieldList.validation.push('cxFormFileUploadValidation');//no i18n
		} else if ((fieldMeta.data_type === 'integer' || fieldMeta.data_type === 'bigint' && fieldMeta.column_name !== "PARTICIPANTID") && fieldMeta.column_name !== 'LAYOUTID' && fieldMeta.column_name !== "WIZARDID") {
			formFieldList.validation.push('cxFormIntegerValidation');//no i18n
		} else if (fieldMeta.column_name === 'TWITTER') { //no i18n
			formFieldList.validation.push('cxFormTwitteridValidation');//no i18n
		}
	},
	validateFieldValues: function () {
		let layoutComponentData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			formFieldList = cxUtilityObj.formFieldList,
			isErrorPresent = false,
			cxPropFormData = layoutComponentData.cxPropFormData,
			instanceObjKey = layoutComponentData.currentInstObjKey || cxUtilityObj.currentInstObjKey;
		if (cxUtilityObj.subFormFieldApiVsMetaObject && Object.keys(cxUtilityObj.subFormFieldApiVsMetaObject).length) {
			isErrorPresent = this.validateCruxSubformData();
		}
		var parentRecordErrObj = this.validateRecordForError({ formFieldList: formFieldList, cxPropFormData, layoutComponentData });
		if (!cxPropFormData.$RECORD__Error__Object) {
			cxPropFormData.$RECORD__Error__Object = {};
		}
		if (!this.isEmptyObj(parentRecordErrObj) || !this.isEmptyObj(cxPropFormData.$RECORD__Error__Object)) {
			for (let eachErrField in parentRecordErrObj) {
				if (!cxPropFormData.$RECORD__Error__Object.hasOwnProperty(eachErrField)) {
					cxPropFormData.$RECORD__Error__Object[eachErrField] = parentRecordErrObj[eachErrField];
				}
			}
			try {
				let allCombinedErrors = Object.assign(Object.assign({}, (parentRecordErrObj || {})),
					(cxPropFormData.$RECORD__Error__Object || {})) || {},
					haveAtleastOneValidError,
					layoutFieldApiVsSectionMeta = cxUtilityObj.layoutFieldApiVsSectionMeta || {};
				for (let fieldApiName in allCombinedErrors) {
					if (layoutFieldApiVsSectionMeta[fieldApiName] && layoutFieldApiVsSectionMeta[fieldApiName][instanceObjKey]
						&& layoutFieldApiVsSectionMeta[fieldApiName][instanceObjKey].isvalidSection
					) {
						haveAtleastOneValidError = true;
						break;
					}
					if (!layoutFieldApiVsSectionMeta[fieldApiName]) {
						haveAtleastOneValidError = true;
						break;
					}
				}
				if (haveAtleastOneValidError) {
					isErrorPresent = true;
				}
			} catch (exception) {
				isErrorPresent = true;
			}
		}
		return isErrorPresent;
	},
	getCruxSubFormData: function (customData) {
		customData = customData || {};
		if (!customData.hasOwnProperty('getAllSubformData')) {
			customData.getAllSubformData = true;
		}
		let layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj, subformApiNames = {}, cxPropFormData = this.data.cxPropFormData;
		if (customData.getAllSubformData) {
			subformApiNames = cxUtilityObj.subFormFieldApiVsMetaObject;
		} else if (customData.subformApiName) {
			subformApiNames[customData.subformApiName] = cxUtilityObj.subFormFieldApiVsMetaObject[customData.subformApiName];
		}
		subformApiNames = subformApiNames || {};
		let returnObj = {};
		for (var subformKey in subformApiNames) {
			returnObj[subformKey] = cxPropFormData[subformKey];
		}
		return returnObj;
	},
	validateCruxSubformData: function (customData) {
		customData = customData || {};
		if (!customData.hasOwnProperty('validateAllSubforms')) {
			customData.validateAllSubforms = true;
		}
		if (!customData.hasOwnProperty('getAllSubformData')) {
			customData.getAllSubformData = true;
		}
		let layoutComponentData = this.data.cxPropLayoutComponentData, subformApiNames = {},
			cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			currentInstObjKey = cxUtilityObj.currentInstObjKey,
			subApinameVsSectionMeta = cxUtilityObj.subformApinameVsSectionMeta || {};
		if (customData.getAllSubformData) {
			subformApiNames = cxUtilityObj.subFormFieldApiVsMetaObject;
		} else if (customData.subformApiName) {
			subformApiNames[customData.subformApiName] = cxUtilityObj.subFormFieldApiVsMetaObject[customData.subformApiName];
		}
		subformApiNames = subformApiNames || {};
		let isErrorPresent = false;
		for (var subformKey in subformApiNames) {
			let subformNodeData = this.getSubformNode(subformKey);
			if (subformNodeData.cruxSubformNode) {
				let val = subformNodeData.cruxSubformNode.component.validate();
				if (!val && isErrorPresent === false) {
					isErrorPresent = true;
				}
				if (!val) {
					let sectionMeta = subApinameVsSectionMeta[subformKey];
					if (sectionMeta) {
						this.addRemoveErrorFocusClass({
							currentInstObjKey,
							subformSectionMeta: sectionMeta,
							isSubform: true,
							type: 'add'
						});
					}
				}
			}
		}
		return isErrorPresent;
	},
	getSubformNode: function (subformApiName) {
		let layoutComponentData = this.data.cxPropLayoutComponentData,
			subformSelector = `.${layoutComponentData.layoutComponentDomNode.getContentWrapperClass()} #cxCreateSubform_${subformApiName}`,
			cruxSubformNodeSelector = `${subformSelector} crux-subform`;
		return {
			cruxSubformNode: $L(cruxSubformNodeSelector)[0],
			cxCreateFormSubformSectionNode: $L(subformSelector)[0]
		};
	},
	validateRecordForError: function (customData) {
		var { cxPropFormData, formFieldList, layoutComponentData } = customData, errObj = {};
		for (var formField in formFieldList) {
			var fldMetaInfo = formFieldList[formField];
			let layoutFieldApiVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject || {},
				layoutFieldColumnNameVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldColumnNameVsMetaObject || {},
				instanceObjKey = layoutComponentData.currentInstObjKey;
			if (fldMetaInfo.fieldDataType === "subform" || fldMetaInfo.data_type === "static_subform") {
				continue;
			}
			//crux validation
			if (!errObj[formField] && layoutFieldApiVsMetaObject[formField]) {
				let currentField = layoutFieldApiVsMetaObject[formField];
				if (currentField[instanceObjKey]) {
					Lyte.Component.set(currentField[instanceObjKey], 'triggerCruxValidation', !currentField[instanceObjKey].triggerCruxValidation);//no i18n
				}
			}
			var lytePropertyToCheck = { mandatory: fldMetaInfo.mandatory, type: fldMetaInfo.lyteAtrrType, validation: fldMetaInfo.validation };
			for (var lyteProp in lytePropertyToCheck) {
				if (lyteProp !== "validation") {
					let fieldValue = cxPropFormData[formField];
					if (cxPropFormData && cxPropFormData.$ && cxPropFormData.$.error && cxPropFormData.$.error[formField]) {
						fieldValue = cxPropFormData.$.error[formField].value;
					}
					if (lyteProp === "type") {
						switch (fldMetaInfo.json_type) {
							case 'double':
							case 'integer':
								fieldValue = this.getReverseTypeConvertedValue(fldMetaInfo.json_type, fieldValue, cxPropFormData, formField);
								break;
							default:
								if (fldMetaInfo.fieldDataType === "multiselectpicklist") {
									fieldValue = this.getReverseTypeConvertedValue(fldMetaInfo.fieldDataType, fieldValue, cxPropFormData, formField);
								} else if (fldMetaInfo.fieldDataType === "multiuserlookup") {
									fieldValue = this.getReverseTypeConvertedValue(fldMetaInfo.fieldDataType, fieldValue, cxPropFormData, formField);
								}
								break;
						}
					}
					var response = Lyte.checkProperty(lyteProp, fieldValue, formField, lytePropertyToCheck[lyteProp]);
					if (response !== true && !errObj[formField]) {
						errObj[formField] = response;
					}
				} else if (!errObj[formField]) {
					var fldValidation = lytePropertyToCheck[lyteProp] || [], validationLen = fldValidation.length;
					for (var k = 0; k < validationLen; k++) {
						var validatorName = fldValidation[k];
						if (this[validatorName]) {
							var validatorData = {}; validatorData.fieldProperties = fldMetaInfo;
							validatorData.fieldName = formField;
							validatorData.fieldValue = cxPropFormData[formField];
							var returnValue = this[validatorName](validatorData);
							if (returnValue !== true) {
								errObj[formField] = returnValue; break;
							}
						}
					}
				}
			}
			if (!errObj[formField] && layoutFieldApiVsMetaObject[formField] && layoutFieldApiVsMetaObject[formField].data_type === 'date') {
				let start_end_map = [
					{ "start": "SALES_START_DATE", "end": "SALES_END_DATE" },
					{ "start": "SUPPORT_START_DATE", "end": "SUPPORT_EXPIRY_DATE" }
				],
					mapLength = start_end_map.length;
				// Validate start and end date ranges
				for (let i = 0; i < mapLength; i++) {
					let startField = start_end_map[i].start;
					let endField = start_end_map[i].end,
						currentField = layoutFieldApiVsMetaObject[formField],
						formFieldColumnName = currentField.column_name,
						currentVal = formFieldColumnName === startField ? "startField" : (formFieldColumnName === endField ? "endField" : ""),
						startValue,
						endValue,
						startFieldLabel,
						endFieldLabel,
						startField_api,
						endField_api;
					if (currentVal === "startField") {
						startValue = cxPropFormData[currentField.api_name];
						startField_api = currentField.api_name;
						startFieldLabel = currentField.field_label;
						if (layoutFieldColumnNameVsMetaObject[endField]) {
							endValue = cxPropFormData[layoutFieldColumnNameVsMetaObject[endField].api_name];
							endFieldLabel = layoutFieldColumnNameVsMetaObject[endField].field_label;
							endField_api = layoutFieldColumnNameVsMetaObject[endField].api_name;
						}
					} else if (currentVal === "endField") {
						endValue = cxPropFormData[currentField.api_name];
						endFieldLabel = currentField.field_label;
						endField_api = currentField.api_name;
						if (layoutFieldColumnNameVsMetaObject[startField]) {
							startValue = cxPropFormData[layoutFieldColumnNameVsMetaObject[startField].api_name];
							startFieldLabel = layoutFieldColumnNameVsMetaObject[startField].field_label;
							startField_api = layoutFieldColumnNameVsMetaObject[startField].api_name;
						}
					}
					if (currentVal && startValue && endValue) {
						// Convert to Date objects for comparison
						let startDateObj, endDateObj;
						let user_date_format = typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.DATE_PATTERN;
						if (user_date_format) {
							let start_moment_obj = $L.moment(startValue, user_date_format.toUpperCase(), { i18n: true });
							if (start_moment_obj && start_moment_obj._isValid && start_moment_obj._dateObj) {
								startDateObj = start_moment_obj._dateObj;
							}
							let end_moment_obj = $L.moment(endValue, user_date_format.toUpperCase(), { i18n: true });
							if (end_moment_obj && end_moment_obj._isValid && end_moment_obj._dateObj) {
								endDateObj = end_moment_obj._dateObj;
							}
						}

						if (startDateObj && endDateObj && Utils.compareDate) {
							if (currentVal === "startField") {
								let isStartDateValid = Utils.compareDate(startDateObj, endDateObj);
								if (!isStartDateValid) {
									errObj[startField_api] = {
										code: "ERRDATE01", //no i18n
										message: _cruxUtils.getI18n('crm.custom.field.less.than.equalto', startFieldLabel, endFieldLabel) //no i18n
									};
								}
							} else if (currentVal === "endField") {
								let isEndDateValid = Utils.compareDate(startDateObj, endDateObj);
								if (!isEndDateValid) {
									errObj[endField_api] = {
										code: "ERRDATE02", //no i18n
										message: _cruxUtils.getI18n('crm.custom.field.greater.than.equalto', endFieldLabel, startFieldLabel) //no i18n
									};
								}
							}
						}
					}
				}
			}
		}
		return errObj;
	},
	getReverseTypeConvertedValue: function (fieldType, fieldValue, cxPropFormData, fieldApiname) {
		var returnValue = fieldValue;
		switch (fieldType) {
			case 'multiselectpicklist':
				try {
					returnValue = JSON.parse(fieldValue);
				} catch (exe) {
					if (Array.isArray(fieldValue)) {
						returnValue = fieldValue;
					} else if (typeof fieldValue === "string") {
						returnValue = fieldValue ? fieldValue.split('; ') : [];
					}
				}
				break;
			case 'multiuserlookup':
				returnValue = fieldValue;
				if (cxPropFormData.$ && cxPropFormData.$.model && cxPropFormData.$.model.fieldList[fieldApiname]) {
					let transformType = cxPropFormData.$.model.fieldList[fieldApiname].type;
					try {
						if (Lyte.Transform[transformType]) {
							returnValue = Lyte.Transform[transformType].serialize(fieldValue);
						}
					} catch (exception) {
						returnValue = fieldValue;
					}
				}
				break;
			case 'double':
			case 'integer':
				returnValue += '';
				break;
		}
		return returnValue;
	},
	/*
	setSubFormFieldErrorDetailsinDom: function (errorObject) {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropFormData = layoutComponentData.cxPropFormData;
		if (layoutComponentData.subFormFieldApiVsMetaObject && Object.keys(layoutComponentData.subFormFieldApiVsMetaObject).length) {
			for (var subformKey in layoutComponentData.subFormFieldApiVsMetaObject) {
				var currentSubformRecords = cxPropFormData[subformKey] || [];
				currentSubformRecords.forEach(function (eachSubformRec) {
					var currentFormErrorDetails = errorObject || eachSubformRec.$RECORD__Error__Object || {};
					if (Object.keys(currentFormErrorDetails).length) {
						Lyte.Component.set(eachSubformRec, '$Toggle__Error__Observer', !eachSubformRec.$Toggle__Error__Observer);//no i18n
					}
				}.bind(this));
			}
		}
	},
	*/
	setParentFieldErrorDetailsinDom: function (errorObject) {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj, cxPropFormData = layoutComponentData.cxPropFormData;
		if (errorObject && errorObject.readyState && errorObject.responseText) {
			errorObject = (errorObject.responseText ? JSON.parse(errorObject.responseText) : {}).data || {};
		}
		var currentInstObjKey = layoutComponentData.currentInstObjKey, currentFormErrorDetails = errorObject || cxPropFormData.$RECORD__Error__Object || {};
		var errorKeys = Object.keys(currentFormErrorDetails) || [];
		errorKeys.forEach(function (eachErrorField) {
			var entityField = cxUtilityObj.layoutFieldApiVsMetaObject[eachErrorField];
			entityField[currentInstObjKey].fieldErrorDetails = currentFormErrorDetails[entityField.api_name];
			if (entityField[currentInstObjKey].isSubFormAggField) {
				var currentError = entityField[currentInstObjKey].fieldErrorDetails;
				if (currentError && currentError.message) {
					var finalErrorMessage = currentError.message;
					if (!currentError.ignoreActualErrorMessage) {
						finalErrorMessage = this.getActualErrorMessage({ errorData: currentError, fieldMeta: entityField });
					}
					Lyte.Component.set(entityField[currentInstObjKey], 'errorMesage', finalErrorMessage);//no i18n
				} else {
					Lyte.Component.set(entityField[currentInstObjKey], 'errorMesage', "");//no i18n
				}
			} else {
				Lyte.Component.set(entityField[currentInstObjKey], 'observeErrorDetails', !entityField[currentInstObjKey].observeErrorDetails);//no i18n
			}
			$L.fastdom.measure(function (entityField) {
				this.addRemoveErrorFocusClass({
					currentInstObjKey,
					fieldMeta: entityField,
					type: 'add'
				});
				var fieldsNode = this.getCxFieldsDomNode(entityField);
				if (!cxUtilityObj.hasOwnProperty('errorFocusDetails')) {
					cxUtilityObj.errorFocusDetails = {};
				}
				if (fieldsNode) {
					var currNodeOffset = fieldsNode.getBoundingClientRect();
					this.setErrorFocusField({ errFocusDetails: cxUtilityObj.errorFocusDetails, currOffsetTop: currNodeOffset.top, currOffsetLeft: currNodeOffset.left, fieldsNode: fieldsNode });
				}
			}.bind(this, entityField));
		}.bind(this));
	},
	addRemoveErrorFocusClass: function (customData) {
		customData = customData || {};
		let finalValue = customData.type === "add" ? 'cxErrorFocusClass' : '',//no i18n
			{ fieldMeta, currentInstObjKey, subformSectionMeta, isSubform } = customData;
		if (isSubform && subformSectionMeta) {
			let sectionInstanceObj = subformSectionMeta[currentInstObjKey];
			if (sectionInstanceObj) {
				Lyte.Component.set(sectionInstanceObj, 'errorFocusClass', finalValue);//no i18n
			}
			return;
		}
		if (currentInstObjKey && fieldMeta && fieldMeta[currentInstObjKey]) {
			Lyte.Component.set(fieldMeta[currentInstObjKey], 'errorFocusClass', finalValue);//no i18n
		}
	},
	focusFirstErrorFieldInDom: function () {
		$L.fastdom.measure(function () {
			let layoutComponentData = this.data.cxPropLayoutComponentData,
				errFocusDetails = layoutComponentData.cxInternalUtilityObj.errorFocusDetails,
				contentWrapperClass = layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.getContentWrapperClass(),
				finalSelector = '';
			if (contentWrapperClass) {
				finalSelector += '.' + contentWrapperClass;
			}
			finalSelector += ' [cx-error-focus-class="cxErrorFocusClass"]';
			finalSelector = finalSelector.trim();
			let errorFocusNodes = $L(finalSelector)[0];
			if (errorFocusNodes && /crux-create-subformsection/i.test(errorFocusNodes.nodeName)) {
				let subformNode = errorFocusNodes.querySelector('crux-subform'),//no i18n
					subSectionCurntInstObj = errorFocusNodes.component && errorFocusNodes.component.data.subSectionCurntInstObj;
				if (subSectionCurntInstObj && subformNode) {
					let { cxApiName, cxRowId, cxErrorNode } = subSectionCurntInstObj.latestSubformError || {};
					if (cxApiName) {
						if (cxErrorNode && cxErrorNode.scrollIntoView) {
							cxErrorNode.scrollIntoView({ block: "center", behavior: 'smooth' });//no i18n
						}
						//setTimeout added to ensure scrollIntoView is executed before focusing the field -> picklist field issue
						setTimeout(() => {
							subformNode.focus(cxApiName, cxRowId);
						}, 100);
					}
				}
				return;
			}
			if (errFocusDetails && errFocusDetails.errorFieldToFocus) {
				var fldsComponent = errFocusDetails.errorFieldToFocus;
				if (fldsComponent && fldsComponent.component && fldsComponent.component.data.lyteViewPort) {
					fldsComponent.setData('lyteViewPort', false);
				}
				var lyteInputNode = fldsComponent.querySelector('lyte-input');//no i18n
				if (lyteInputNode) {
					lyteInputNode.focus();
				}
				if (fldsComponent.scrollIntoView) {
					fldsComponent.scrollIntoView({ block: "center", behavior: 'smooth' });//no i18n
				}
			}
		}.bind(this));
	},
	setErrorFocusField: function (customData) {
		customData = customData || {};
		var errFocusDetails = customData.errFocusDetails;
		if (errFocusDetails.hasOwnProperty('prevOffsetTop')) {
			if (errFocusDetails.prevOffsetTop === 0 || errFocusDetails.prevOffsetTop > customData.currOffsetTop) {
				errFocusDetails.prevOfftop = customData.currOffsetTop; errFocusDetails.prevOffsetLeft = customData.currOffsetLeft;
				errFocusDetails.errorFieldToFocus = customData.fieldsNode;
			} else if (errFocusDetails.prevOffsetTop === customData.currOffsetTop && errFocusDetails.prevOffsetLeft > customData.currOffsetLeft) {
				errFocusDetails.prevOffsetTop = customData.currOffsetTop; errFocusDetails.prevOffsetLeft = customData.currOffsetLeft;
				errFocusDetails.errorFieldToFocus = customData.fieldsNode;
			}
		} else {
			errFocusDetails.prevOffsetTop = customData.currOffsetTop; errFocusDetails.prevOffsetLeft = customData.currOffsetLeft;
			errFocusDetails.errorFieldToFocus = customData.fieldsNode;
		}
	},
	getCxFieldsDomNode: function (entityField) {
		var layoutComponentData = this.data.cxPropLayoutComponentData, parentNode = document;
		if (layoutComponentData && layoutComponentData.layoutComponentDomNode) {
			parentNode = layoutComponentData.layoutComponentDomNode;
		}
		var selector = '.' + layoutComponentData.currentInstObjKey + 'Cx' + layoutComponentData.cxPropModuleName + entityField.column_name;
		return parentNode.querySelector(selector);
	},
	clearFieldErrorDetailsinDom: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj, cxPropFormData = layoutComponentData.cxPropFormData;
		var currentInstObjKey = cxUtilityObj.currentInstObjKey, allFields = this.getCurrentLayoutValidFields(cxUtilityObj) || [];
		let apinameVsSectionMeta = cxUtilityObj.subformApinameVsSectionMeta || {};
		allFields.forEach(function (entityField) {
			entityField[currentInstObjKey].fieldErrorDetails = {};
			Lyte.Component.set(entityField[currentInstObjKey], 'observeErrorDetails', !entityField[currentInstObjKey].observeErrorDetails);//no i18n
			Lyte.Component.set(entityField[currentInstObjKey], 'errorFocusClass', "");//no i18n
		});
		if (cxUtilityObj.subFormFieldApiVsMetaObject && Object.keys(cxUtilityObj.subFormFieldApiVsMetaObject).length) {
			for (var subformKey in cxUtilityObj.subFormFieldApiVsMetaObject) {
				var currentSubformRecords = cxPropFormData[subformKey] || [];
				currentSubformRecords.forEach(function (eachSubformRec) {
					Object.defineProperty(eachSubformRec, '$RECORD__Error__Object', {
						enumerable: false,
						writable: true,
						value: {}
					});
					if (!eachSubformRec.hasOwnProperty('$Toggle__Error__Observer')) {
						Object.defineProperty(eachSubformRec, '$Toggle__Error__Observer', {
							enumerable: false,
							writable: true,
							value: undefined
						});
					}
					Lyte.Component.set(eachSubformRec, '$Toggle__Error__Observer', !eachSubformRec.$Toggle__Error__Observer);//no i18n
				}.bind(this));
				//clear subform mandatory Error
				let sectionMeta = apinameVsSectionMeta[subformKey];
				if (sectionMeta) {
					Lyte.Component.set(sectionMeta[currentInstObjKey], 'toggleMandatorySubformError', !sectionMeta[currentInstObjKey].toggleMandatorySubformError);//no i18n
					this.addRemoveErrorFocusClass({
						currentInstObjKey,
						subformSectionMeta: sectionMeta,
						isSubform: true,
						type: 'remove'
					});
				}
			}
		}
	},
	validateAndSaveForm: function (customData) {
		customData = customData || {};
		if (!customData.hasOwnProperty('validateAndSave')) {
			customData.validateAndSave = true;
		}
		if (!customData.hasOwnProperty('validateCruxCreateForm')) {
			customData.validateCruxCreateForm = true;
		}
		if (!customData.hasOwnProperty('validateCruxSubform')) {
			customData.validateCruxSubform = true;
		}
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropFormData = layoutComponentData.cxPropFormData;
		Object.defineProperty(cxPropFormData, '$RECORD__Error__Object', {
			enumerable: false,
			writable: true,
			value: {}
		});
		this.clearFieldErrorDetailsinDom();
		delete layoutComponentData.cxInternalUtilityObj.errorFocusDetails;
		var isErrorPresent = this.validateFieldValues();
		if (isErrorPresent) {
			this.setParentFieldErrorDetailsinDom();
			//this.setSubFormFieldErrorDetailsinDom();
			this.focusFirstErrorFieldInDom();
			return true;
		}
		if (customData.validateAndSave) {
			this.processValidationRules({ dontFocus: false, callbackFunc: this.saveCreateForm.bind(this, customData.currentButtonObj) });
		}
	},
	saveCreateForm: function (currentButtonObj, vRCallbackDetails = {}) {
		var layoutComponentData = this.data.cxPropLayoutComponentData;
		if (layoutComponentData.isValidationRulePassed) {
			return;
		}
		var onBeforeSaveCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormBeforeSave', onFormBeforeSave: { currentButtonObj, 'vrErrorDetails': vRCallbackDetails.valErrorDetails && Object.keys(vRCallbackDetails.valErrorDetails).length ? vRCallbackDetails.valErrorDetails : undefined } });//no i18n
		onBeforeSaveCallBackResponse.then(function (promiseResponse) {
			let skippedExecution = true;
			if (promiseResponse === false) {
				return skippedExecution;
			} this.afterBeforeSaveCallBackResponse(promiseResponse, currentButtonObj);
		}.bind(this));
		return false;
	},
	afterBeforeSaveCallBackResponse: function (beforeSavePromiseResponse, currentButtonObj) {
		var moduleData = (this.data.cxPropModuleData || this.data.cxPropLayoutComponentData.cxPropModuleData) || {};
		var onSaveCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormSave', onFormSave: { currentButtonObj } });//no i18n
		onSaveCallBackResponse.then(function (promiseResponse = {}) {
			if (promiseResponse === false) {
				return;
			}
			if (promiseResponse.isSaveFailed) {
				this.handleFailureResponse(promiseResponse, currentButtonObj);
			} else {
				let returnObj = {};
				if (promiseResponse.hasOwnProperty('saveResponse')) {
					returnObj = promiseResponse;
				} else if (promiseResponse.hasOwnProperty(moduleData.id)) {
					returnObj.saveResponse = promiseResponse[moduleData.id];
				} else {
					returnObj.saveResponse = promiseResponse;
				}
				this.handleSuccessResponse(returnObj, currentButtonObj);
			}
		}.bind(this));
	},
	handleFailureResponse: function (promiseResponse) {
		var errResponse = promiseResponse && promiseResponse.errorObject, cxUtilityObj = this.data.cxPropLayoutComponentData.cxInternalUtilityObj;
		if (errResponse.onreadystatechange) {
			var data, response = errResponse.responseText ? JSON.parse(errResponse.responseText) : {};
			if (response.data) {
				for (var key in response) {
					data = response[key];
				}
				var dL = data ? data.length : 0;
				for (var i = 0; i < dL; i++) {
					var eObject = this.getFinalErrorObjectDetails(data[i], cxUtilityObj);
					eObject = this.getFinalErrorObjectDetails(eObject, cxUtilityObj);
					var fieldName = eObject.details && eObject.details.api_name,
						finalErrObj = {},
						fieldMeta;
					if (fieldName) {
						finalErrObj[fieldName] = eObject;
						fieldMeta = cxUtilityObj.layoutFieldApiVsMetaObject && cxUtilityObj.layoutFieldApiVsMetaObject[fieldName];
					} else {
						let multipleErrors = eObject.details.errors || [];
						multipleErrors.forEach((eachError) => {
							let subErrorObject = this.getFinalErrorObjectDetails(eachError, cxUtilityObj),
								subErrorFieldName = subErrorObject.details && subErrorObject.details.api_name;
							if (subErrorFieldName) {
								finalErrObj[subErrorFieldName] = subErrorObject;
							}
						});
					}
					this.setParentFieldErrorDetailsinDom(finalErrObj);
					this.invokeCruxFormCallBacks({ callbackEventName: 'onFormFailureResponse', onFormFailureResponse: { errorDetails: eObject, fieldMeta, fieldApiVsMetaObject: cxUtilityObj.layoutFieldApiVsMetaObject } });//no i18n
				}
			} else {
				switch (response.code) {
					case 'NO_PERMISSION':
						//renderingUtils.displayPermissionDenied();
						break;
					case "INVALID_DATA":
						/*	
						if (response.message === "can't update the converted record") {

						}
						if (response.message === "the id given seems to be invalid") {

						}
						*/
						break;
				}
			}
		} else {
			let finalErrObj = errResponse || {};
			this.setParentFieldErrorDetailsinDom(finalErrObj);
		}
	},
	getFinalErrorObjectDetails: function (eObject, cxUtilityObj) {

		function parseValidApiname(fldList, pPath, pInd, pArr, pVal) {
			if (fldList[pVal] && pVal !== "id") {
				eObject.details.api_name = pVal;
				return;
			}
			var isvalidfldfound = false;
			while (!isvalidfldfound) {
				if (pPath.indexOf('[') !== -1) {
					pPath = pPath.split('[')[0];
				}
				if (fldList[pPath] && pPath !== "id") {
					isvalidfldfound = true;
					eObject.details.api_name = pPath;
				} else {
					pPath = pArr[pInd - 1];
					pInd -= 1;
				}
				if (pPath === undefined) {
					isvalidfldfound = true;
				}
			}
		}

		//added for jsonpath issue
		if (eObject && eObject.details && eObject.details.json_path) {
			var pathArr = eObject.details.json_path.split('.');
			var pathLen = pathArr.length, formFldList = cxUtilityObj.formFieldList, errApiname = eObject.details.api_name;;
			for (var k1 = 0; k1 < pathLen; k1++) {
				var pathval = pathArr[k1];
				if (pathval.indexOf('[') !== -1) {
					var parseAPI = pathval.split('[');
					if (parseAPI && parseAPI[0] && formFldList[parseAPI[0]] && formFldList[parseAPI[0]].type === "relation") {
						eObject.details.parent_api_name = parseAPI[0];
						eObject.details.index = Number(parseAPI[1].split(']')[0]);
					}
				}

				if (pathval === errApiname) {
					var prevInd = k1 - 1, prevPath = pathArr[prevInd];
					if (eObject.details.parent_api_name) {
						parseValidApiname(cxUtilityObj.subformFieldList[eObject.details.parent_api_name], prevPath, prevInd, pathArr, pathval);
					} else {
						parseValidApiname(formFldList, prevPath, prevInd, pathArr, pathval);
					}
				}
			}
			return eObject;
		}
		return eObject;
	},
	handleSuccessResponse: function (promiseResponse, currentButtonObj) {
		let respObj = { saveResponse: promiseResponse.saveResponse, currentButtonObj };
		if (respObj && respObj.saveResponse && respObj.saveResponse.hasOwnProperty('quickCreatedRecord')) {
			respObj.quickCreatedRecord = respObj.saveResponse.quickCreatedRecord;
		} else if (promiseResponse && promiseResponse.hasOwnProperty('quickCreatedRecord')) {
			respObj.quickCreatedRecord = promiseResponse.quickCreatedRecord;
		}
		var afterSaveCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormAfterSave', onFormAfterSave: respObj });//no i18n
		afterSaveCallBackResponse.then(function (afterPromiseResponse) {
			let skippedExecution = true;
			if (afterPromiseResponse === false) {
				return skippedExecution;
			}
		}.bind(this));
	},
	invokeCruxFormCallBacks: async function (customData) {
		customData = customData || {};
		let callbackEventName = customData.callbackEventName, layoutComponentData = this.data.cxPropLayoutComponentData, cruxFormCallbacks = layoutComponentData.cruxFormCallbacks || {},
			callBackObject = Object.assign({}, (customData[callbackEventName] || {})),
			layoutDomNode = layoutComponentData.layoutComponentDomNode;
		if (layoutDomNode && layoutDomNode.getFormData) {
			callBackObject.formData = layoutDomNode.getFormData();
		}
		if (layoutComponentData.isQuickCreate) {
			callBackObject.isQuickCreate = layoutComponentData.isQuickCreate;
		}
		let currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;
		if (['onFormSave', 'onFormAfterSave', 'onFormBeforeSave'].includes(callbackEventName) && currentPage !== 'create' && layoutDomNode && layoutDomNode.getFormDirtyAttributes) {
			callBackObject.formDirtyAttributes = layoutDomNode.getFormDirtyAttributes();
		}
		if (['onFormValueChange', 'onFormAfterRender', 'onFormBeforeRender'].includes(callbackEventName)) {
			if (callbackEventName === 'onFormAfterRender' && layoutComponentData.layoutComponentDomNode && layoutComponentData.layoutComponentDomNode.getContentWrapperClass) {
				callBackObject.contentWrapperClass = layoutComponentData.layoutComponentDomNode.getContentWrapperClass();
			}
			callBackObject.allFieldMetaDetails = {};
			callBackObject.allFieldMetaDetails.fieldApiVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject;
			callBackObject.allFieldMetaDetails.fieldIdVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldIdVsMetaObject;
			callBackObject.allFieldMetaDetails.fieldColumnNameVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldColumnNameVsMetaObject;
			callBackObject.allFieldMetaDetails.fieldDatatypeVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldDatatypeVsMetaObject;
			callBackObject.allFieldMetaDetails.subFormFieldApiVsMetaObject = layoutComponentData.cxInternalUtilityObj.subFormFieldApiVsMetaObject;
			callBackObject.allFieldMetaDetails.subFormFieldIdVsMetaObject = layoutComponentData.cxInternalUtilityObj.subFormFieldIdVsMetaObject;
			callBackObject.allFieldMetaDetails.subFormFieldDatatypeVsMetaObject = layoutComponentData.cxInternalUtilityObj.subFormFieldDatatypeVsMetaObject;
		}
		return new Promise(async function (resolve) {
			let callBackMethod = cruxFormCallbacks[callbackEventName], isMethod = false, componentScope = layoutDomNode.component;
			if (componentScope.getMethods(callbackEventName)) {
				callBackMethod = componentScope.getMethods(callbackEventName);
				isMethod = true;
			}
			if (callBackMethod) {
				let callBackResponse;
				if (isMethod) {
					callBackResponse = componentScope.executeMethod(callbackEventName, callBackObject);
				} else {
					callBackResponse = cruxFormCallbacks[callbackEventName].call(this, callBackObject);
				}
				if (callBackResponse && callBackResponse.then) {
					callBackResponse.then(
						function (sucessReponse = {}) {
							resolve(sucessReponse);
						},
						function (failureReponse = {}) {
							resolve(failureReponse);
						}.bind(this));
				} else {
					resolve(callBackResponse);
				}
			} else if (layoutComponentData.isRequestLayerSupported) {
				switch (callbackEventName) {
					case "fetchLookupModuleData": {
						let moduleResp = await this.fetchLookupModuleData(callBackObject);
						resolve(moduleResp || {});
						break;
					}
					case "fetchLookupRecords": {
						let getRecordsResp = await this.fetchLookupRecordsData(callBackObject);
						resolve(getRecordsResp || {});
						break;
					}
					case "onFormSave": {
						callBackObject.moduleId = layoutComponentData.cxPropModuleId || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.id);
						callBackObject.moduleName = layoutComponentData.cxPropModuleName || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name);
						callBackObject.currentPage = currentPage;
						let recordSaveResp = await this.saveCurrentForm(callBackObject, layoutComponentData.isQuickCreate, layoutComponentData);
						resolve(recordSaveResp || {});
						break;
					}
					case "formFieldOfLookup": {
						callBackObject.layoutComponentDomNode = layoutComponentData.layoutComponentDomNode;
						let recordSaveResp = await this.setFieldOfLookupData(callBackObject);
						resolve(recordSaveResp || {});
						break;
					}
					case 'onFormAfterSave': {
						this.setSaveResponseInMessage(callBackObject, layoutComponentData);
						break;
					}
					default:
						resolve("NO_MATCHING_CALLBACKS");
						break;
				}
			} else {
				resolve("NO_MATCHING_CALLBACKS");
			}
		}.bind(this));
	},
	invokeCruxModalPopverCallBacks: function (customData) {
		customData = customData || {};
		let callbackEventName = customData.callbackEventName, layoutComponentData = this.data.cxPropLayoutComponentData, cruxModalPopverCallBacks = {};
		if (customData.isPopover) {
			cruxModalPopverCallBacks = layoutComponentData.cruxPopverCallBacks || {};
		} else if (customData.isModal) {
			cruxModalPopverCallBacks = layoutComponentData.cruxModalCallBacks || {};
		}
		return new Promise(function (resolve) {
			if (cruxModalPopverCallBacks[callbackEventName]) {
				var callBackResponse = cruxModalPopverCallBacks[callbackEventName].apply(this, (customData.lyteUiCompArgs || []));
				if (callBackResponse && callBackResponse.then) {
					callBackResponse.then(
						function (sucessReponse) {
							resolve(sucessReponse);
						},
						function (failureReponse) {
							resolve(failureReponse);
						});
				} else {
					resolve(callBackResponse);
				}
			} else {
				resolve("NO_MATCHING_CALLBACKS");
			}
		}.bind(this));
	},
	getActualErrorMessage: function (customData) {
		customData = customData || {};
		let errorData = customData.errorData || {}, fieldMeta = customData.fieldMeta || {},
			displayLabel = typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(fieldMeta.field_label) : fieldMeta.field_label;//No I18N
		switch (errorData.code) {
			case 'ERR02'://Empty Check
				return _cruxUtils.getI18n("crm.field.empty.check", displayLabel);//no i18n
			case 'ERR06'://max length Check
				return _cruxUtils.getI18n("crm.field.length.check", displayLabel);//no i18n
			case 'ERR03'://Type mismatch Check
			case 'ERR08'://pattern mismatch Check
			case 'INVALID_DATA'://to handle server side issue
				return _cruxUtils.getI18n("crm.field.valid.check", displayLabel);//no i18n
			case 'ERR04'://exceeding decimal length Check
				return _cruxUtils.getI18n("crm.field.valid.decimal.check2", displayLabel, errorData.allowedDecimal);//no i18n
		}
		return errorData.message;
	},
	showHideLoadingDiv: function (show) {
		if (typeof commonUtils !== "undefined" && commonUtils.showHideLoadingDiv) {
			commonUtils.showHideLoadingDiv(show);
		}
	},
	setTabIndexForFields: function (customData = {}) {
		let { sectionsArray, currentInstObjKey, layoutComponentData } = customData;
		let entryTabIndex = 1, currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;;
		let currentViewType = layoutComponentData.cxInternalUtilityObj.currentViewType ? layoutComponentData.cxInternalUtilityObj.currentViewType : (currentPage === "clone" ? "create" : currentPage);//no i18n
		let selectedLayoutid = layoutComponentData.cxPropLayoutId;
		let formConfigurations = layoutComponentData.formConfigurations || {};
		var fldVisiblityCustomData = { currentPage };
		fldVisiblityCustomData.columnsToSkip = layoutComponentData.columnsToSkip || [];
		if (!fldVisiblityCustomData.columnsToSkip.includes('SALUTATION')) {
			fldVisiblityCustomData.columnsToSkip.push('SALUTATION');
		}
		fldVisiblityCustomData.apiNamesToSkip = layoutComponentData.apiNamesToSkip || [];
		fldVisiblityCustomData.uiTypeToSkip = layoutComponentData.uiTypeToSkip || [];
		if (sectionsArray && sectionsArray.length) {
			sectionsArray.forEach((sectionObj) => {
				let secInstObj = sectionObj[currentInstObjKey] || {},
					tab_traversal_value = secInstObj.tab_traversal || sectionObj.tab_traversal;
				if (sectionObj && sectionObj.fields &&
					sectionObj.fields.length &&
					secInstObj.isvalidSection &&
					(!secInstObj.hasOwnProperty('type') || secInstObj.hasOwnProperty('type') && secInstObj.type === "used")
				) {
					function getTabIndexbasedonField(type, tabIndex) {
						if (type && tabIndex) {
							tabIndex = type.includes('lookup') ? tabIndex + 4 : tabIndex + 1;//no i18n
						}
						return tabIndex;
					};

					function applyTabIndexFromFormConfig(fieldMeta) {
						if (formConfigurations) {
							let fldSpecificConfig = this.getFieldSpecificFormConfigData({ formConfigurations, cxPropFieldData: fieldMeta });
							if (currentInstObjKey && fieldMeta[currentInstObjKey] && fldSpecificConfig && fldSpecificConfig.hasOwnProperty('tab_index')) {
								Lyte.Component.set(fieldMeta[currentInstObjKey], 'tab_index', fldSpecificConfig.tab_index);
							}
						}
					};

					let singleArr = [], temparrL = [], temparrR = [];
					let sortedArray = sectionObj.fields.sort((a, b) => {
						let a_seqNumber = a[selectedLayoutid] && a[selectedLayoutid].sequence_number || a.sequence_number;
						let b_seqNumber = b[selectedLayoutid] && b[selectedLayoutid].sequence_number || b.sequence_number;
						return a_seqNumber - b_seqNumber;
					});
					if (sortedArray && sortedArray.length) {
						sortedArray.forEach((field) => {
							if (!(this.isValidFieldToRender(field, fldVisiblityCustomData) && field.view_type[currentViewType])) {
								return;
							}
							if (sectionObj.column_count === 1) {
								singleArr.push(field);
							} else {
								var sequenceNumber = field[selectedLayoutid] && field[selectedLayoutid].sequence_number || field.sequence_number;
								if (sequenceNumber % 2 !== 0) {
									temparrL.push(field);
								} else {
									temparrR.push(field);
								}
							}
						});
					}
					var arrRIndex = 0, tLLen = temparrL.length, tRLen = temparrR.length, k;
					for (var m = 0; m < tLLen; m++) {
						if (temparrL[m].data_type !== "formula" && temparrL[m].data_type !== "autonumber") {
							Lyte.Component.set(temparrL[m][currentInstObjKey], 'tab_index', entryTabIndex);
							entryTabIndex = getTabIndexbasedonField(temparrL[m].data_type, entryTabIndex);
							if (tab_traversal_value === 2) {
								for (var n = arrRIndex; n < tRLen; n++) {
									arrRIndex++;
									if (temparrR[n].data_type !== "formula" && temparrR[n].data_type !== "autonumber") {
										Lyte.Component.set(temparrR[n][currentInstObjKey], 'tab_index', entryTabIndex);
										applyTabIndexFromFormConfig.bind(this)(temparrR[n]);
										entryTabIndex = getTabIndexbasedonField(temparrR[n].data_type, entryTabIndex);
										break;
									} else {
										Lyte.Component.set(temparrR[n][currentInstObjKey], 'tab_index', -1);
									}
								}
							}
						} else {
							Lyte.Component.set(temparrL[m][currentInstObjKey], 'tab_index', -1);
						}
						applyTabIndexFromFormConfig.bind(this)(temparrL[m]);
					}
					for (k = arrRIndex; k < tRLen; k++) {
						if (temparrR[k].data_type !== "formula" && temparrR[k].data_type !== "autonumber") {
							Lyte.Component.set(temparrR[k][currentInstObjKey], 'tab_index', entryTabIndex);
							entryTabIndex = getTabIndexbasedonField(temparrR[k].data_type, entryTabIndex);
						} else {
							Lyte.Component.set(temparrR[k][currentInstObjKey], 'tab_index', -1);
						}
						applyTabIndexFromFormConfig.bind(this)(temparrR[k]);
					}
					var sRLen = singleArr.length;
					for (k = 0; k < sRLen; k++) {
						if (singleArr[k].data_type !== "formula" && singleArr[k].data_type !== "autonumber") {
							Lyte.Component.set(singleArr[k][currentInstObjKey], 'tab_index', entryTabIndex);
							entryTabIndex = getTabIndexbasedonField(singleArr[k].data_type, entryTabIndex);
						} else {
							Lyte.Component.set(singleArr[k][currentInstObjKey], 'tab_index', -1);
						}
						applyTabIndexFromFormConfig.bind(this)(singleArr[k]);
					}

				}
			});
		}
	},
	isInventoryModule: function (module) {
		return module === "Quotes" || module === "Invoices" || module === "SalesOrders" || module === "PurchaseOrders";//NO I18N
	},
	getApiVsFieldMetaMappingObject: function (customData) {
		var paramObject = {
			currencyFieldsArray: customData.currencyFieldsArray,
			jsonTypeConversionFields: customData.jsonTypeConversionFields,
			fieldDatatypeVsMetaObject: customData.fieldDatatypeVsMetaObject,
			fieldUitypeVsMetaObject: customData.fieldUitypeVsMetaObject,
			fieldColumnNameVsMetaObject: customData.fieldColumnNameVsMetaObject,
			fieldsArray: customData.fieldsArray,
			mapProperty: 'api_name'
		};
		if (customData.hasOwnProperty('fieldOfLookupDetails')) {
			paramObject.fieldOfLookupDetails = customData.fieldOfLookupDetails;
		}
		return this.getMetaMappingObject(paramObject);
	},
	getIdVsFieldMetaMappingObject: function (customData) {
		return this.getMetaMappingObject({ fieldsArray: customData.fieldsArray, mapProperty: 'id' });
	},
	getMetaMappingObject: function (customData) {
		var { fieldsArray,
			mapProperty,
			currencyFieldsArray,
			fieldOfLookupDetails,
			jsonTypeConversionFields,
			fieldDatatypeVsMetaObject,
			fieldUitypeVsMetaObject,
			fieldColumnNameVsMetaObject
		} = customData, returnObj = {};
		fieldsArray = fieldsArray || [];
		fieldsArray.forEach(function (eachFld) {
			if (!returnObj.hasOwnProperty(eachFld[mapProperty])) {
				returnObj[eachFld[mapProperty]] = eachFld;
			}
			var isValidCurrencyField = eachFld.data_type === "currency" || (eachFld.data_type === "formula" && eachFld.formula && eachFld.formula.return_type === "currency");
			if (customData.hasOwnProperty('currencyFieldsArray') && isValidCurrencyField) {
				currencyFieldsArray.push(eachFld);
			}
			if (customData.hasOwnProperty('fieldOfLookupDetails') && !this.isEmptyObj(eachFld.association_details)) {
				var lookupField = eachFld.association_details.lookup_field, relatedField = eachFld.association_details.related_field;
				if (!fieldOfLookupDetails.hasOwnProperty(lookupField.api_name)) {
					fieldOfLookupDetails[lookupField.api_name] = [];
				}
				var folObj = { currentFormField: eachFld.api_name, lookupModuleMapField: relatedField };
				fieldOfLookupDetails[lookupField.api_name].push(folObj);
			}
			if (customData.hasOwnProperty('jsonTypeConversionFields') &&
				(["integer", "double"].indexOf(eachFld.json_type) !== -1 || ["multiselectpicklist", "multiuserlookup"].indexOf(eachFld.data_type) !== -1) &&
				jsonTypeConversionFields.indexOf(eachFld.api_name) === -1) {
				jsonTypeConversionFields.push(eachFld.api_name);
			}
			if (customData.hasOwnProperty('fieldDatatypeVsMetaObject')) {
				if (!fieldDatatypeVsMetaObject.hasOwnProperty(eachFld.data_type)) {
					fieldDatatypeVsMetaObject[eachFld.data_type] = [];
				}
				fieldDatatypeVsMetaObject[eachFld.data_type].push(eachFld);
			}
			if (fieldUitypeVsMetaObject && customData.hasOwnProperty('fieldUitypeVsMetaObject')) {
				if (!fieldUitypeVsMetaObject.hasOwnProperty(eachFld.ui_type)) {
					fieldUitypeVsMetaObject[eachFld.ui_type] = [];
				}
				fieldUitypeVsMetaObject[eachFld.ui_type].push(eachFld);
			}
			if (fieldColumnNameVsMetaObject && customData.hasOwnProperty('fieldColumnNameVsMetaObject')
				&& !fieldColumnNameVsMetaObject.hasOwnProperty(eachFld.column_name)) {
				fieldColumnNameVsMetaObject[eachFld.column_name] = eachFld;
			}
		}.bind(this));
		return returnObj;
	},
	processModuleFormulaFields: function (apiName) {
		let cxPropLayoutComponentData = this.data.cxPropLayoutComponentData, currentInstObjKey = cxPropLayoutComponentData.currentInstObjKey,
			cxUtilityObj = cxPropLayoutComponentData.cxInternalUtilityObj,
			subformsObj = cxUtilityObj.subformApinameVsSectionMeta || {};
		for (var subformApi in subformsObj) {
			let subformObj = subformsObj[subformApi], instObj = subformObj[currentInstObjKey] || {};
			if (instObj.evaluateModuleFormula) {
				//instObj.evaluateModuleFormula(apiName);
				apiName = `Modified API Name ${apiName}`;
			}
		}
	},
	getTypeConvertedFieldValue: function (formModelFieldObj, fieldApiname, fieldValue) {
		var finalValue = fieldValue, fieldModelProperties = formModelFieldObj[fieldApiname];
		if (fieldModelProperties && fieldModelProperties.lyteAtrrType) {
			switch (fieldModelProperties.lyteAtrrType) {
				case 'string':
					if (typeof fieldValue !== "string") {
						finalValue = (fieldValue !== null && fieldValue !== undefined) ? (fieldValue + "") : fieldValue;
					}
					break;
				case 'boolean':
					if (typeof fieldValue !== "boolean") {
						finalValue = fieldValue === 'true';
					}
					break;
			}
		}
		return finalValue;
	},
	getMapDependencyOptions: function (customData) {
		var { layoutComponentData, cxPropFieldData, isSubform, subformApiname } = customData, selectedLayoutid = layoutComponentData.cxPropLayoutId;
		var cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
		var layoutFieldApiVsMetaObject = isSubform ? cxUtilityObj.subFormFieldApiVsMetaObject[subformApiname] : cxUtilityObj.layoutFieldApiVsMetaObject;
		var currentPickListOptions = cxPropFieldData[selectedLayoutid] && cxPropFieldData[selectedLayoutid].pick_list_values ? cxPropFieldData[selectedLayoutid].pick_list_values : cxPropFieldData.pick_list_values;
		var optionsLen = currentPickListOptions.length || 0, finalMapOptions = {};
		for (var k = 0; k < optionsLen; k++) {
			var currentOption = currentPickListOptions[k], mapArray = currentOption.maps || [];
			if (!mapArray.length) {
				break;
			} else {
				if (isSubform && cxUtilityObj.subformMapDependencyFields[subformApiname].indexOf(cxPropFieldData.api_name) === -1) {
					cxUtilityObj.subformMapDependencyFields[subformApiname].push(cxPropFieldData.api_name);
				} else if (cxUtilityObj.mapDependencyFields.indexOf(cxPropFieldData.api_name) === -1) {
					cxUtilityObj.mapDependencyFields.push(cxPropFieldData.api_name);
				}
				finalMapOptions[currentOption.display_value] = {};
			}
			mapArray.forEach(function (mapObject) {
				var mapDependencyFldApiname = mapObject.api_name;
				var mapFieldDetails = layoutFieldApiVsMetaObject[mapDependencyFldApiname];
				var mapPickListOptions = mapFieldDetails[selectedLayoutid] && mapFieldDetails[selectedLayoutid].pick_list_values ? mapFieldDetails[selectedLayoutid].pick_list_values : mapFieldDetails.pick_list_values;
				if (mapObject.pick_list_values && mapObject.pick_list_values.length) {
					var mapObjectOptnArr = [];
					mapObject.pick_list_values.forEach(option => mapObjectOptnArr.push(option.display_value));
					var validOriginalOption = mapPickListOptions.filter(function (orginalOption) {
						return mapObjectOptnArr.indexOf(orginalOption.display_value) !== -1;
					});
					finalMapOptions[currentOption.display_value][mapDependencyFldApiname] = validOriginalOption;
				} else {
					finalMapOptions[currentOption.display_value][mapDependencyFldApiname] = mapPickListOptions;
				}
			});
		}
		return { mapDependencyDetails: finalMapOptions };
	},
	setMapDependencyOption: function (customData) {
		var { isInitialRender, cxPropFormData, isSubform, subformApiname, layoutCompData, fieldValue, fieldMeta, currentInstObjKey } = customData;
		var cxUtilityObj = layoutCompData.cxInternalUtilityObj, instObj = fieldMeta[currentInstObjKey], mapDependencyDetails = instObj.mapDependencyDetails || {};
		if (Object.keys(mapDependencyDetails).length) {
			var layoutFieldApiVsMetaObject = isSubform ? cxUtilityObj.subFormFieldApiVsMetaObject[subformApiname] : cxUtilityObj.layoutFieldApiVsMetaObject;
			var selectedOptionMappings = instObj.mapDependencyDetails[fieldValue];
			if (!this.isEmptyObj(selectedOptionMappings)) {
				for (var childField in selectedOptionMappings) {
					var mapDepChildField = layoutFieldApiVsMetaObject[childField];
					if (mapDepChildField) {
						Lyte.Component.set(mapDepChildField[currentInstObjKey], 'pick_list_values', selectedOptionMappings[childField]);
						var skipValueUpdate = isInitialRender && cxUtilityObj.currentPage !== "create";
						if (!isSubform && !skipValueUpdate) {
							var finalDisplayValue = selectedOptionMappings[childField][0].display_value;
							if (mapDepChildField.data_type === "multiselectpicklist") {
								finalDisplayValue = [];
								if (cxPropFormData.hasOwnProperty(mapDepChildField.api_name)) {
									var existingValue = cxPropFormData[mapDepChildField.api_name] || [];
									var existingOptionsArray = selectedOptionMappings[childField].filter(eachOption => existingValue.indexOf(eachOption.display_value) !== -1);
									finalDisplayValue = existingOptionsArray.map(function (optObj) { return optObj.display_value; });
								}
								cxPropFormData[mapDepChildField.api_name] = finalDisplayValue;
							} else {
								if (cxPropFormData.hasOwnProperty(mapDepChildField.api_name)) {
									let existingValue = cxPropFormData[mapDepChildField.api_name];
									var existingOptionObject = selectedOptionMappings[childField].filter(eachOption => eachOption.display_value === existingValue)[0];
									finalDisplayValue = existingOptionObject ? cxPropFormData[mapDepChildField.api_name] : finalDisplayValue;
								}
								cxPropFormData[mapDepChildField.api_name] = finalDisplayValue;
							}
							Lyte.Component.set(mapDepChildField[currentInstObjKey], 'setValueIntoDom', !mapDepChildField[currentInstObjKey].setValueIntoDom);
							Lyte.Component.set(mapDepChildField[currentInstObjKey], 'triggerValueChangeCallback', !mapDepChildField[currentInstObjKey].triggerValueChangeCallback);
						}
					}
				}
			}
		}
	},
	setExchangeRateValue: function (customData) {
		var { cxPropFormData, currencyDetail, cxPropFieldData } = customData;
		if (cxPropFieldData.column_name === "EXCHANGERATE" && currencyDetail && currencyDetail.hasOwnProperty('er')) {
			Lyte.Component.set(cxPropFormData, cxPropFieldData.api_name, currencyDetail.er);
		}
	},
	handleCurrencyConversion: function (customData) {
		let { layoutCompData, cxPropFormData, selectedCurrency } = customData;
		let cxUtilityObj = layoutCompData.cxInternalUtilityObj,
			currentInstObjKey = layoutCompData.currentInstObjKey,
			exchangeRateFld = cxUtilityObj.layoutFieldApiVsMetaObject.Exchange_Rate;
		let selectedCurrencyObj = this.getCurrencyData(selectedCurrency);
		if (selectedCurrencyObj) {
			var previousExchangeRate = cxPropFormData.Exchange_Rate;
			Lyte.Component.set(layoutCompData, 'cxPropCurrencyData', Lyte.deepCopyObject(selectedCurrencyObj));
			Lyte.Component.set(layoutCompData, 'cxPropCurrencySymbol', selectedCurrencyObj.symbol);
			Lyte.Component.set(layoutCompData, 'cxPropCurrencyKey', selectedCurrency);
			var subformLayoutCurrencyFields = cxUtilityObj.subformLayoutCurrencyFields || {};
			var currencyParamObject = { currentInstObjKey, selectedCurrencyObj, previousExchangeRate };
			for (var subform_apiname in subformLayoutCurrencyFields) {
				var subCurrencyFields = subformLayoutCurrencyFields[subform_apiname] || [], currSubformRecords = cxPropFormData[subform_apiname] || [];
				currSubformRecords.forEach(function (subformRecords) {
					subCurrencyFields.forEach(function (currencyField) {
						this.setConvertedValueInRecord(Object.assign({ currencyField: currencyField, formData: subformRecords }, currencyParamObject));
					}.bind(this));
				}.bind(this));
			}
			var layoutCurrencyFields = cxUtilityObj.layoutCurrencyFields || [];
			layoutCurrencyFields.forEach(function (parentCurrencyField) {
				this.setConvertedValueInRecord(Object.assign({ currencyField: parentCurrencyField, formData: cxPropFormData }, currencyParamObject));
				Lyte.Component.set(parentCurrencyField[currentInstObjKey], 'setValueIntoDom', !parentCurrencyField[currentInstObjKey].setValueIntoDom);
			}.bind(this));
			this.setExchangeRateValue({ cxPropFormData, currencyDetail: selectedCurrencyObj, cxPropFieldData: exchangeRateFld });
			Lyte.Component.set(exchangeRateFld[currentInstObjKey], 'setValueIntoDom', !exchangeRateFld[currentInstObjKey].setValueIntoDom);
		}
	},
	setConvertedValueInRecord: function (currencyParamObject) {
		var { formData, currencyField, currentInstObjKey, selectedCurrencyObj, previousExchangeRate } = currencyParamObject;
		var currencyFieldApiname = currencyField.api_name, previousCurrencyValue = formData[currencyFieldApiname];
		var convertedValue = this.getConvertedCurrencyValue({ previousCurrencyValue, previousExchangeRate, selectedCurrencyObj });
		if (!isNaN(convertedValue)) {
			convertedValue = Number(convertedValue).toFixed(selectedCurrencyObj.decimals);
			var fieldDecimalPlaceValue = currencyField[currentInstObjKey].decimal_place;
			convertedValue = (selectedCurrencyObj.decimals !== undefined && fieldDecimalPlaceValue !== undefined && selectedCurrencyObj.decimals > fieldDecimalPlaceValue) ? Number(convertedValue).toFixed(fieldDecimalPlaceValue) : convertedValue;
			Lyte.Component.set(formData, currencyFieldApiname, convertedValue + "");
		}
	},
	getConvertedCurrencyValue: function (customData) {
		var { previousCurrencyValue, previousExchangeRate, selectedCurrencyObj } = customData;
		return (previousCurrencyValue / previousExchangeRate) * selectedCurrencyObj.er;
	},
	getLookupIconClass: function (lookupFieldData) {
		if (["multiselectlookup", "lookup"].indexOf(lookupFieldData.data_type) === -1) {
			return "";
		}
		var corres_moduleName, isCustommodule = false, returnValue = "cxModulecustomModule", havemoduleId = true;
		if (lookupFieldData.data_type === 'multiselectlookup') {
			corres_moduleName = lookupFieldData.multiselectlookup.connected_module.api_name;
			if (!lookupFieldData.multiselectlookup.connected_module.id) {
				havemoduleId = false;
			}
			if (lookupFieldData.multiselectlookup.connected_module && lookupFieldData.multiselectlookup.connected_module.hasOwnProperty("generated_type")) {
				isCustommodule = lookupFieldData.multiselectlookup.connected_module.generated_type === 'default' ? false : true;//no i18n
			}
		} else if (lookupFieldData.data_type === 'lookup') {
			corres_moduleName = lookupFieldData.lookup.module.api_name;
			if (!lookupFieldData.lookup.module.id) {
				havemoduleId = false;
			}
			if (lookupFieldData.lookup.module && lookupFieldData.lookup.module.hasOwnProperty("generated_type")) {
				isCustommodule = lookupFieldData.lookup.module.generated_type === 'default' ? false : true;//no i18n
			} else if (havemoduleId) {
				let lookupModuleRecord = store.peekRecord('module', lookupFieldData.lookup.module.id);
				if (lookupModuleRecord && lookupModuleRecord.hasOwnProperty("generated_type")) {
					isCustommodule = lookupModuleRecord.generated_type === 'default' ? false : true;//no i18n
				}
			}
		}
		if (isCustommodule === false) {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : 'cxModule' + corres_moduleName;//no i18n
		} else {
			returnValue = !havemoduleId ? "cxModuleSearchicon" : "cxModulecustomModule";	//no i18n
		}
		return returnValue;
	},
	processFieldsOfLookup: function (customData) {
		var fieldMeta = customData.fieldMeta;
		var isFOLSupportedField = ["lookup", "ownerlookup", "userlookup"].indexOf(fieldMeta.data_type) !== -1 ? true : false;
		if (!isFOLSupportedField) { return; };
		var { selectedLookupRecord, layoutCompData, cxPropFormData, currentInstObjKey, isSubform, subformApiname } = customData;
		var cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		var currentField = fieldMeta.api_name, folDetails = (isSubform ? (cxUtilityObj.subformFieldOfLookupDetails && cxUtilityObj.subformFieldOfLookupDetails[subformApiname]) : cxUtilityObj.fieldOfLookupDetails) || {};
		if (folDetails.hasOwnProperty(currentField)) {
			var dataObject = { selectedLookupRecord, fieldMeta, cxPropFormData, currentInstObjKey, isSubform, subformApiname };
			dataObject.fieldOfLookupDetails = folDetails[currentField];
			var folCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'formFieldOfLookup', formFieldOfLookup: dataObject });//no i18n
			folCallBackResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return skippedExecution;
				}
			}.bind(this));
		}
	},
	setFormData: function (customData) {
		customData = customData || {};
		var cruxFormData = (customData.hasOwnProperty('cruxFormData') ? customData.cruxFormData : customData) || {}, layoutCompData = this.data.cxPropLayoutComponentData, currentInstObjKey = layoutCompData.currentInstObjKey;
		var formDataKeys = Object.keys(cruxFormData) || [];
		formDataKeys.forEach(function (key) {
			var fieldMeta = layoutCompData.cxInternalUtilityObj.layoutFieldApiVsMetaObject[key];
			if (!fieldMeta) { return; }
			var fieldApiname = fieldMeta.api_name;
			if (fieldMeta.data_type !== "subform" && fieldMeta.data_type !== "static_subform") {
				Lyte.Component.set(layoutCompData.cxPropFormData, fieldApiname, cruxFormData[fieldApiname]);
				Lyte.Component.set(fieldMeta[currentInstObjKey], 'setValueIntoDom', !fieldMeta[currentInstObjKey].setValueIntoDom);
			} else {
				this.setSubformData({ fieldApiname, newSubformData: cruxFormData[fieldApiname], cxPropFormData: layoutCompData.cxPropFormData });
			}
		}.bind(this));
	},
	setSubformData: function (customData) {
		let { cxPropFormData, newSubformData, fieldApiname } = customData,
			currentSubformData = cxPropFormData[fieldApiname] || [],
			isValueArray = Array.isArray(newSubformData);
		let subformNodeData = this.getSubformNode(fieldApiname);
		if (newSubformData === null || (isValueArray && !newSubformData.length)) {
			let currentSubformDataLen = currentSubformData.length;
			while (currentSubformDataLen > 0) {
				if (subformNodeData.cruxSubformNode) {
					subformNodeData.cruxSubformNode.deleteRow(0);
				}
				currentSubformDataLen--;
			}
		} else if (isValueArray) {
			for (const [index, eachSubformRecord] of newSubformData.entries()) {
				if (!currentSubformData[index] && subformNodeData.cruxSubformNode) {
					subformNodeData.cruxSubformNode.createRow(eachSubformRecord);
				}
				if (currentSubformData[index]) {
					let layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
					if (cxUtilityObj.subFormFieldApiVsMetaObject && Object.keys(cxUtilityObj.subFormFieldApiVsMetaObject).length) {
						let subormMetaDetails = cxUtilityObj.subFormFieldApiVsMetaObject[fieldApiname] || {};
						for (var sKey in eachSubformRecord) {
							if (subormMetaDetails[sKey]) {
								Lyte.Component.set(currentSubformData[index], sKey, eachSubformRecord[sKey]);
							}
						}
					}
				}
			}
		}
	},
	getComponentInitData: function (customData) {
		var { customFieldComponentData, requiredCompDataProperties, isSubform } = customData;
		requiredCompDataProperties = requiredCompDataProperties || ['cxPropFieldData', 'cxPropFormData', 'cxPropLayoutComponentData', 'currentInstObjKey'];
		var returnObj = {}, yieldGlobalData = this.data.yieldGlobalData;
		customFieldComponentData = customFieldComponentData || {};
		var { cxPropFormData, cxPropFieldData, cxPropLayoutComponentData, currentInstObjKey } = this.data;
		if (isSubform) {
			cxPropFormData = this.data.cxPropSubformRowData;
			returnObj.parentFormData = this.data.cxPropFormData;
		}
		var yieldLayoutGlobalData = cxPropLayoutComponentData.yieldLayoutGlobalData || {};
		requiredCompDataProperties.forEach(function (dataProperty) {
			if (customFieldComponentData.hasOwnProperty(dataProperty)) {
				returnObj[dataProperty] = customFieldComponentData[dataProperty];
			} else {
				switch (dataProperty) {
					case 'lyteViewPort':
						returnObj[dataProperty] = isSubform ? false : true;
						break;
					case 'fromSubform':
						returnObj[dataProperty] = isSubform ? true : false;
						break;
					case 'currentInstObjKey':
						returnObj[dataProperty] = currentInstObjKey;
						break;
					case 'fieldsCurntInstObj':
						returnObj[dataProperty] = cxPropFieldData[currentInstObjKey];
						break;
					case 'cxPropLayoutComponentData':
						returnObj[dataProperty] = cxPropLayoutComponentData;
						break;
					case 'fieldlabelMaxwidth':
						returnObj[dataProperty] = yieldGlobalData && (yieldGlobalData.containerName === 'singleContainer' ? yieldLayoutGlobalData.singleContainerfieldLabelWidth : yieldGlobalData.containerName === 'leftContainer' ? yieldLayoutGlobalData.container1fieldLabelWidth : yieldLayoutGlobalData.container2fieldLabelWidth);
						break;
					case 'createFieldsClass':
						returnObj[dataProperty] = yieldGlobalData && yieldGlobalData.containerName ? (yieldGlobalData.containerName + (isSubform ? 'subformCrtField' : 'CrtField')) : '';//no i18n
						break;
					case 'moduledataUicomp':
					case 'cxPropFieldData':
						returnObj[dataProperty] = cxPropFieldData;
						break;
					case 'cxPropFormData':
						returnObj[dataProperty] = cxPropFormData;
						break;
				}
			}
		}.bind(this));
		return returnObj;
	},
	getInitialFormDataForClone: function (originalFormData) {
		let layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
		function createEntityobject(originalFormData) {
			let currentSubforms = Object.keys(cxUtilityObj.subformFieldList || {}),
				newSubformRecords = {};
			if (currentSubforms.length) {
				currentSubforms.forEach((subformApiName) => {
					newSubformRecords[subformApiName] = [];
					if (originalFormData[subformApiName] && originalFormData[subformApiName].length) {
						originalFormData[subformApiName].forEach((subformRecord) => {
							let newSubRec;
							try {
								newSubRec = subformRecord.$.toJSON();
							} catch (e) {
								newSubRec = subformRecord;
							}
							newSubRec.mappingID = subformRecord.id;
							if (["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(subformApiName)) {
								newSubRec.$clone_reference_id = subformRecord.id;
							}
							delete newSubRec.id; delete newSubRec.__parent_module__;
							newSubformRecords[subformApiName].push(store.createRecord(subformRecord.$.model._name, newSubRec, true));
						});
					}
				});
				this.data.subfRecordcloned = newSubformRecords;
			}
			try {
				originalFormData = originalFormData.$.toJSON();
			} catch (e) {
				originalFormData = originalFormData;
			}
			delete originalFormData.__parent_module__; delete originalFormData.id;
			if (!this.isEmptyObj(newSubformRecords)) {
				for (var sKey in newSubformRecords) {
					originalFormData[sKey] = newSubformRecords[sKey];
				}
			}
			return originalFormData;
		};
		function handleCloneReadOnlyFields(originalFormData) {
			let formFields = cxUtilityObj.layoutFieldApiVsMetaObject;
			for (var fKey in formFields) {
				let eachField = formFields[fKey],
					fldVisiblityCustomData = { currentPage: cxUtilityObj.currentPage };
				fldVisiblityCustomData.columnsToSkip = layoutComponentData.columnsToSkip || [];
				fldVisiblityCustomData.apiNamesToSkip = layoutComponentData.apiNamesToSkip || [];
				fldVisiblityCustomData.uiTypeToSkip = layoutComponentData.uiTypeToSkip || [];
				let isValidField = this.isValidFieldToRender(eachField, fldVisiblityCustomData),
					systemReadOnlyFlds = ["EXPECTEDREVENUE"],//no i18n
					moduleName = this.data.cxPropModuleData && this.data.cxPropModuleData.module_name;
				if (isValidField && eachField.read_only && eachField.data_type !== "subform" && eachField.data_type !== "static_subform" && eachField.data_type !== "formula" && !(systemReadOnlyFlds.includes(eachField.column_name) && moduleName !== "Campaigns")) {
					originalFormData[eachField.api_name] = null;
				} else if (eachField.data_type === "subform" || eachField.data_type === "static_subform") { //no i18n
					let subformData = originalFormData[eachField.api_name];
					if (subformData && subformData.length) {
						let currentSubformsFields = cxUtilityObj.subFormFieldApiVsMetaObject && cxUtilityObj.subFormFieldApiVsMetaObject[eachField.api_name] || {};
						for (var sKey in currentSubformsFields) {
							let eachSField = currentSubformsFields[sKey];
							let isValidSField = this.isValidFieldToRender(eachSField, fldVisiblityCustomData),
								isValidVRFieldForInventory = isValidSField ? this.isValidVRFieldForInventory(eachSField, moduleName) : false;
							if (isValidSField && (eachSField.read_only && !isValidVRFieldForInventory) && eachSField.data_type !== "subform" && eachSField.data_type !== "static_subform" && eachSField.data_type !== "formula") {
								subformData.forEach((subRow) => {
									if (["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(eachField.api_name) && eachSField.column_name === "DISCOUNT") {
										subRow[eachSField.api_name] = 0;
									} else {
										subRow[eachSField.api_name] = null;
									}
								});
							}
						}
					}
				}
			}
			return originalFormData;
		};
		let returnObject = {};
		try {
			returnObject = Lyte.deepCopyObject(originalFormData);
		} catch (e) {
			returnObject = originalFormData;
		}
		returnObject = createEntityobject.call(this, originalFormData);
		returnObject = handleCloneReadOnlyFields.call(this, returnObject);
		let cloneRecord = store.createRecord(this.data.cxPropModuleId, returnObject ? returnObject : {}, true);
		return cloneRecord;
	},
	getCruxFormData: function (originalData) {
		var cxPropFormData = {}, layoutCompData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutCompData.cxInternalUtilityObj, currentPage = cxUtilityObj.currentPage;
		if (typeof Record !== 'undefined' && originalData && originalData.$) {
			return originalData;
		}
		if (this.isEmptyObj(originalData)) {
			return cxPropFormData;
		}
		var parentModuleFieldLists = cxUtilityObj.formFieldList || {};
		var subformFieldList = cxUtilityObj.subformFieldList || {};
		function getFinalData(fldList, orgRecData, finalFormData) {
			for (var fieldApiName in orgRecData) {
				if ((currentPage === "edit" && ['id'].includes(fieldApiName)) || (fldList.hasOwnProperty(fieldApiName) && !subformFieldList.hasOwnProperty(fieldApiName))) {
					finalFormData[fieldApiName] = typeof orgRecData[fieldApiName] === 'object' && orgRecData[fieldApiName] ? Lyte.deepCopyObject(orgRecData[fieldApiName]) : orgRecData[fieldApiName];
				}
			}
		}
		getFinalData(parentModuleFieldLists, originalData, cxPropFormData);
		for (var sKeys in subformFieldList) {
			var currentSubformFieldList = subformFieldList[sKeys] || {}; cxPropFormData[sKeys] = [];
			let allSubRecs = originalData[sKeys] || [];
			allSubRecs.forEach(function (eachRecord) {
				var subformData = {};
				getFinalData(currentSubformFieldList, eachRecord, subformData);
				cxPropFormData[sKeys].push(subformData);
			});
		}
		return cxPropFormData;
	},
	getFinalFormData: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			formData = layoutComponentData.cxPropFormData,
			subformFieldList = cxUtilityObj.subformFieldList,
			parentFieldList = cxUtilityObj.formFieldList;
		let isRecordObject = false;
		if (formData && formData.$ && formData.$.model) {
			isRecordObject = true;
		}
		var finalFormData = isRecordObject ? formData : Lyte.deepCopyObject(formData),
			skipTypeConversion = layoutComponentData.skipTypeConversion;
		if (!skipTypeConversion) {
			var jsonTypeConversionFields = cxUtilityObj.jsonTypeConversionFields || [];
			jsonTypeConversionFields.forEach(function (fieldApiname) {
				let typeValue = isRecordObject && formData.$.model.fieldList[fieldApiname] && formData.$.model.fieldList[fieldApiname].type;
				if (typeValue && ['expected-revenue', 'millisec-to-time', 'time-in-hrs', 'time-in-minutes'].includes(typeValue)) {
					return;
				}
				let cData = { formData: finalFormData, fieldApiname, formFieldList: parentFieldList, recordErrorObject: isRecordObject ? formData.$.error : {} };
				cData.fieldFullMeta = cxUtilityObj.layoutFieldApiVsMetaObject[fieldApiname];
				if (formData.hasOwnProperty(fieldApiname) || cData.recordErrorObject.hasOwnProperty(fieldApiname)) {
					var convertedNumberVal = this.getTypeConvertedValue(cData);
					Lyte.Component.set(finalFormData, fieldApiname, convertedNumberVal);
				}
			}.bind(this));
			if (!this.isEmptyObj(subformFieldList)) {
				for (var skey in subformFieldList) {
					if (finalFormData[skey]) {
						var subformRecords = finalFormData[skey] || [];
						var subnumberJsonTypeFields = (cxUtilityObj.subformJsonTypeConversionFields && cxUtilityObj.subformJsonTypeConversionFields[skey]) || [];
						subformRecords.forEach(function (sRec) {
							subnumberJsonTypeFields.forEach(function (fieldApiname) {
								var cData = { formData: sRec, fieldApiname, formFieldList: subformFieldList[skey], recordErrorObject: isRecordObject ? sRec.$.error : {} };
								cData.fieldFullMeta = cxUtilityObj.subFormFieldApiVsMetaObject[skey] && cxUtilityObj.subFormFieldApiVsMetaObject[skey][fieldApiname];
								if (sRec.hasOwnProperty(fieldApiname) || cData.recordErrorObject.hasOwnProperty(fieldApiname)) {
									var convertedNumberVal = this.getTypeConvertedValue(cData);
									Lyte.Component.set(sRec, fieldApiname, convertedNumberVal);
								}
							}.bind(this));
						}.bind(this));
					}
				}
			}
		}
		return finalFormData;
	},
	getTypeConvertedValue: function (customData) {
		var { formData, fieldApiname, fieldFullMeta, formFieldList, recordErrorObject } = customData, returnValue = formData[fieldApiname], fldListObject = formFieldList[fieldApiname] || {};
		recordErrorObject = recordErrorObject || {};
		let fieldValue = recordErrorObject.hasOwnProperty(fieldApiname) ? recordErrorObject[fieldApiname].value : formData[fieldApiname];
		returnValue = fieldValue;
		switch (fldListObject.fieldDataType) {
			case 'multiselectpicklist':
				if (Array.isArray(fieldValue)) {
					returnValue = JSON.stringify(fieldValue);
				} else if (typeof fieldValue === "string") {
					try {
						if (JSON.parse(fieldValue)) {
							returnValue = fieldValue;
						}
					} catch (e) {
						returnValue = fieldValue ? JSON.stringify(fieldValue.split('; ')) : JSON.stringify([]);
					}
				}
				break;
			case 'multiuserlookup':
				returnValue = fieldValue;
				if (formData.$ && formData.$.model && formData.$.model.fieldList[fieldApiname]) {
					let connectedApiname = fieldFullMeta.multiuserlookup.connectedlookup_apiname || fieldApiname;
					try {
						if (Array.isArray(fieldValue)) {
							let finalArr = [];
							fieldValue.forEach(userObj => {
								let finObj = {};
								finObj[connectedApiname] = { id: userObj.id };
								finObj[connectedApiname].name = userObj.full_name || userObj.name;
								finalArr.push(finObj);
							});
							returnValue = finalArr && finalArr.length ? { users: finalArr } : {};
						}
					} catch (exception) {
						returnValue = fieldValue;
					}
				}
				break;
			default:
				if (fieldValue !== null && !isNaN(fieldValue)) {
					returnValue = Number(fieldValue);
				}
		}
		return returnValue;
	},
	appendInsObjectProperties: function (customData) {
		var { fieldsArray, currentInstObjKey, fieldMeta, isSubform, subformFieldList } = customData, _this = this;
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
		fieldsArray = fieldsArray || [];
		var formFieldList = isSubform ? subformFieldList : cxUtilityObj.formFieldList;
		function fillFldProperties(eachField) {
			if (_this.isEmptyObj(eachField[currentInstObjKey])) {
				eachField[currentInstObjKey] = {};
			}
			var instObjSubFld = eachField[currentInstObjKey], fieldUiType = eachField.ui_type, cruxType = "text", cxPropType;
			var instanceObjKeys = ["required", "read_only", "view_type", "tab_index", "length", "visible", "decimal_place"], instanceObjKeysLen = instanceObjKeys.length;
			for (var n = 0; n < instanceObjKeysLen; n++) {
				var fieldProp = instanceObjKeys[n];
				if (!instObjSubFld.hasOwnProperty(fieldProp)) {
					let _value = eachField[fieldProp];
					if (eachField.ui_type === 208 && fieldProp === 'read_only' && ['clone', 'edit'].includes(cxUtilityObj.currentPage)) {
						_value = true;
					}
					instObjSubFld[fieldProp] = typeof _value === 'object' && _value ? Lyte.deepCopyObject(_value) : _value;
				}
			}
			var defaultUiTypeToCruxMapping = cxUtilityObj.defaultUiTypeToCruxMapping;
			switch (fieldUiType) {
				case 35:
					cruxType = "phone";//No I18n
					break;
				case 445:
					cruxType = "user";
					cxPropType = "multiple";//No I18n
					break;
				case 100:
				case 96:
					cruxType = "picklist";
					cxPropType = "multisearch";//No I18n
					break;
				case 556:
					cruxType = "imageupload";
					break;
				case 555:
					cruxType = "fileupload";
					break;
				case 444:
					cruxType = "multiselectlookup";
					break;
				case 208:
					cruxType = "text";
					break;
				case 99:
					cruxType = "create-comments";
					break;
				default:
					if (defaultUiTypeToCruxMapping && defaultUiTypeToCruxMapping[fieldUiType]) {
						cruxType = defaultUiTypeToCruxMapping[fieldUiType];
					}
					break;
			}
			instObjSubFld.cruxType = cruxType;
			instObjSubFld.cxPropType = cxPropType;
			if (!formFieldList[eachField.api_name]) {
				formFieldList[eachField.api_name] = {};
			}
			var fieldListRequiredProperty = {
				mandatory: 'required', fieldLength: 'length', fieldId: 'id', fieldDataType: 'data_type',
				fieldUiType: 'ui_type', displayLabel: 'display_label', fieldLabel: 'field_label', isCustomField: 'custom_field',
				columnName: 'column_name', decimalPlace: 'decimal_place', json_type: 'json_type', lyteAtrrType: 'json_type'
			};
			for (var key in fieldListRequiredProperty) {
				formFieldList[eachField.api_name][key] = eachField[fieldListRequiredProperty[key]];
				if (key === "fieldDataType" && (eachField[fieldListRequiredProperty[key]] === "subform" || eachField[fieldListRequiredProperty[key]] === "static_subform")) {
					formFieldList[eachField.api_name].isSubformRelation = true;
				}
				if (key === "lyteAtrrType") {
					switch (eachField[fieldListRequiredProperty[key]]) {
						case 'double':
						case 'integer':
							formFieldList[eachField.api_name][key] = "string";//no i18n
							break;
						case 'jsonobject':
							formFieldList[eachField.api_name][key] = "object";//no i18n
							break;
						case 'jsonarray':
							formFieldList[eachField.api_name][key] = "array";//no i18n
							break;
					}
					if (eachField.ui_type === 208 && key === 'lyteAtrrType') {
						formFieldList[eachField.api_name][key] = "object";//no i18n
					}
				}
			}
			_this.addCustomValidationsforField({ formFieldList, cxPropFieldData: eachField });
		};
		if (fieldMeta) {
			fillFldProperties(fieldMeta);
		} else {
			fieldsArray.forEach(function (indvField) {
				fillFldProperties(indvField);
			});
		}
	},
	getDefaultModalMaxWidth: function (width, layoutColumnCount) {
		var fieldWidth = 390,
			paddingLeftRight = 60,
			scrollBarWidth = 15,
			actualFieldWidth = width || 180,
			modalWidth = fieldWidth + paddingLeftRight + actualFieldWidth + scrollBarWidth;
		modalWidth = layoutColumnCount === 2 ? (modalWidth * 2) : modalWidth;
		return `${modalWidth}px`;
	},
	constructLyteUiComponentProperties: function (customData) {
		let { layoutCompData, cxPropRenderMode } = customData,
			cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		if (cxPropRenderMode === "modal") {
			let givenModalProps = layoutCompData.cxPropModalProperties || {},
				defaultModalProps = {
					show: true,
					wrapperClass: `${cxUtilityObj.cxCreateFormContentWrapperClass}_modal_wc cxQCModalWrapper`,
					preventFocus: 'true',
					transition: '{"animation":"slideFromTop","duration":"0.1"}',//no i18n
					offset: '{"top":"0","left":"center"}',//no i18n
					maxWidth: this.getDefaultModalMaxWidth(cxUtilityObj.fieldLabelMaxWidth, cxUtilityObj.layoutColumnCount),
					maxHeight: "95%",
					allowMultiple: 'true',
					scrollable: 'true',
					closeOnEscape: 'true',
					showCloseButton: 'true'
				};
			for (var propertyKey in defaultModalProps) {
				if (!givenModalProps.hasOwnProperty(propertyKey)) {
					givenModalProps[propertyKey] = defaultModalProps[propertyKey];
				} else if (propertyKey === 'wrapperClass') {
					givenModalProps[propertyKey] = `${givenModalProps[propertyKey]} ${defaultModalProps[propertyKey]}`;
				}
			}
			cxUtilityObj.cxPropModalProperties = JSON.stringify(Object.assign({}, givenModalProps));
		} else if (cxPropRenderMode === "popover") {
			let givenPopoverProps = layoutCompData.cxPropPopoverProperties || {},
				defaultPopoverProps = {
					show: true,
					type: "callout",
					freeze: true,
					showCloseButton: true,
					closeOnEscape: true,
					originElem: "",
					placement: "bottom",
					dimmer: { "color": "#000", "opacity": "0.4" },
					draggable: false,
					allowMultiple: false,
					scrollable: false,
					maxWidth: "70%",
					maxHeight: "70%",
					width: "50%",
					height: "auto",
					wrapperClass: `${cxUtilityObj.cxCreateFormContentWrapperClass}_popover_wc cxQCPopoverWrapper`,
					preventFocus: "true",
					offset: { "top": "50px", "left": "500px", "height": "50px", "width": "500px" }
				};
			for (var property_key in defaultPopoverProps) {
				if (!givenPopoverProps.hasOwnProperty(property_key)) {
					givenPopoverProps[property_key] = defaultPopoverProps[property_key];
				} else if (property_key === 'wrapperClass') {
					givenPopoverProps[property_key] = `${givenPopoverProps[property_key]} ${defaultPopoverProps[property_key]}`;
				}
			}
			cxUtilityObj.cxPropPopoverProperties = JSON.stringify(Object.assign({}, givenPopoverProps));
		}
	},
	getDefaultLayoutDetails: function (moduleData, profileName, cxPropLayoutId) {
		let currentProfileName = profileName || (typeof Crm !== 'undefined' && Crm.userDetails.PROFILE_NAME) || "Administrator",//no i18n
			layDet = moduleData.layouts || [],
			currentLayoutName,
			currentLayoutId,
			layoutddValues = [],
			showIntegrationLayoutDD = false,
			module_name = moduleData.module_name;
		if (layDet && layDet.length) {
			layDet = $L.extend(true, [], layDet);//ZCRM-118843
			layDet = layDet.sort((layout1, layout2) => {
				let name1 = layout1.name.toUpperCase(),
					name2 = layout2.name.toUpperCase();
				if (name1 < name2) {
					return -1;
				}
				if (name1 > name2) {
					return 1;
				}
				return 0;
			});
		}
		let len = layDet && layDet.length || 0;
		for (var i = 0; i < len; i++) {
			if (layDet[i].status >= 0 || layDet[i].status === true || layDet[i].status === "active") {
				showIntegrationLayoutDD = module_name === "Campaigns" && layDet[i].status === "active" && layDet[i].source === "campaign_integration" ? true : showIntegrationLayoutDD;//no i18n
				let isValidLayout = false;
				if (layDet[i].profiles) {
					var profL = layDet[i].profiles.length, isDefault = false;
					for (var c = 0; c < profL; c++) {
						if (currentProfileName === layDet[i].profiles[c].name) {
							isValidLayout = true;
							if (layDet[i].profiles[c].default) {
								currentLayoutName = layDet[i].name;
								currentLayoutId = layDet[i].id;
								isDefault = true;
								break;
							}
						}
					}
					if (isValidLayout) {
						let layoutDetailsObj = {
							uservalue: layDet[i].name,
							systemvalue: layDet[i].id,
							id: layDet[i].id,
							isDefault: isDefault,
							status: layDet[i].status,
							source: layDet[i].source
						};
						layoutddValues.push(layoutDetailsObj);
					}
				}
			}
		}
		if (cxPropLayoutId) {
			currentLayoutId = cxPropLayoutId;
			let currentLayoutDetails = layoutddValues.filter((option) => { return option.id === currentLayoutId; })[0];
			currentLayoutName = (currentLayoutDetails && currentLayoutDetails.uservalue) || currentLayoutName;
		}
		if (module_name === "Campaigns" && cxPropLayoutId) {
			let currLayout = layoutddValues.filter((f) => { return f.id === cxPropLayoutId; })[0];
			if (currLayout) {
				currentLayoutName = currLayout.uservalue;
				currentLayoutId = currLayout.id;
			}
		}
		if (!currentLayoutId && layoutddValues && layoutddValues.length) { //when none of the layout is default layout for the profile
			if (module_name === "Campaigns") {
				let layoutToRender = layoutddValues.filter((lay) => { return lay.source === "crm"; })[0];
				layoutToRender = layoutToRender || layoutddValues[0];
				currentLayoutName = layoutToRender.name;
				currentLayoutId = layoutToRender.id;
				layoutToRender.isDefault = true;
			} else {
				currentLayoutName = layoutddValues[0].name;
				currentLayoutId = layoutddValues[0].id;
				layoutddValues[0].isDefault = true;
			}
		}
		return { layoutddValues, showIntegrationLayoutDD, currentLayoutName, currentLayoutId };
	},
	setFieldOfLookupData: function (customData) {
		customData = customData || {};
		let folDetails = customData.fieldOfLookupDetails || [],
			lookupRecord = customData.selectedLookupRecord || {},
			setDataObject = {};
		if (this.isEmptyObj(lookupRecord)) {
			return;
		}
		// if (lookupRecord && lookupRecord._$ && lookupRecord._$.original) {
		// 	originalValues = lookupRecord._$.original;
		// }
		// originalValues = originalValues || {};
		folDetails.forEach((details) => {
			let { currentFormField, lookupModuleMapField } = details,
				fieldValue = lookupRecord[lookupModuleMapField.api_name];
			/*
			if(originalValues.hasOwnProperty(lookupModuleMapField.api_name)){
				fieldValue = originalValues[lookupModuleMapField.api_name];
			}
			*/
			setDataObject[currentFormField] = fieldValue;
		});
		setDataObject = setDataObject || {};
		if (customData.layoutComponentDomNode) {
			customData.layoutComponentDomNode.setFormData({ cruxFormData: setDataObject });
		}
	},
	getNewLayoutRenderingObj: function (layoutId, cxPropLayoutComponentData) {
		var originalLayoutComponentData, newRecord = {};
		if (cxPropLayoutComponentData.cxPropFormData && cxPropLayoutComponentData.cxPropFormData.$) {
			let moduleId = cxPropLayoutComponentData.cxPropModuleId || (cxPropLayoutComponentData.cxPropModuleData && cxPropLayoutComponentData.cxPropModuleData.id);
			newRecord = store.createRecord(moduleId, {}, true);
		}
		if (cxPropLayoutComponentData.layoutComponentDomNode) {
			let copiedObj = (cxPropLayoutComponentData.layoutComponentDomNode.component.data.originalLayoutComponentData || {});
			originalLayoutComponentData = $L.extend(true, {}, copiedObj);
		}
		if (!originalLayoutComponentData.hasOwnProperty('cxPropRenderMode')) {
			originalLayoutComponentData.cxPropRenderMode = cxPropLayoutComponentData.cxPropRenderMode;
		}
		let newLayoutRenderingObj = Object.assign({}, originalLayoutComponentData);
		if (layoutId) { newLayoutRenderingObj.cxPropLayoutId = layoutId; }
		delete newLayoutRenderingObj.cxPropLayoutData; delete newLayoutRenderingObj.cxPropLayoutSections;
		newLayoutRenderingObj.cxPropFormData = newRecord;
		return newLayoutRenderingObj;
	},
	destroyComponent: async function (layoutComponentData, reRender) {
		let proceedDestroy = await this.invokeCruxFormCallBacks({ callbackEventName: 'onFormBeforeDestroy', onFormBeforeDestroy: {} });//no i18n
		if (proceedDestroy === false) {
			return false;
		}
		if (["popover", "modal"].includes(layoutComponentData.cxPropRenderMode)) {
			let renderMode;
			if (layoutComponentData.cxPropRenderMode === "modal") {
				renderMode = "Modal";
			} else if (layoutComponentData.cxPropRenderMode === "popover") {
				renderMode = "Popover";
			}
			let elementId = `#cruxCreateForm${renderMode}${layoutComponentData.currentInstObjKey}`, elemntNode = $L(elementId)[0];
			if (elemntNode) {
				elemntNode.remove();
			}
		}
		if (layoutComponentData.layoutComponentDomNode) {
			layoutComponentData.layoutComponentDomNode.remove();
		}
		if (layoutComponentData.crmCruxCreateFormDomNode && !reRender) {
			layoutComponentData.crmCruxCreateFormDomNode.remove();
		}
	},
	isQuickCreateButtonNeeded: function (layoutComponentData, cxPropFieldData) {
		let showQCButton = false, currentInstObjKey = layoutComponentData.currentInstObjKey;
		if (layoutComponentData.isQuickCreate) {
			showQCButton = false;
		} else {
			if (layoutComponentData.hasOwnProperty('isLookupQuickCreateSupported')) {
				return layoutComponentData.isLookupQuickCreateSupported;
			} else if (cxPropFieldData[currentInstObjKey] && cxPropFieldData[currentInstObjKey].hasOwnProperty('isLookupQuickCreateSupported')) {
				return cxPropFieldData[currentInstObjKey].isLookupQuickCreateSupported;
			}
			showQCButton = true;
			if (cxPropFieldData.lookup && cxPropFieldData.lookup.module && cxPropFieldData.lookup.module.api_name &&
				['Quotes', 'Purchase_Orders', 'Sales_Orders', 'Invoices', 'Price_Books', 'Services__s'].includes(cxPropFieldData.lookup.module.api_name)) {
				showQCButton = false;
			}
		}
		return showQCButton;
	},
	getCurrentLookupNode: function (customData = {}) {
		let { cruxLookupElmId, fromSubform } = customData,
			qSel = `${fromSubform ? `#${cruxLookupElmId}` : 'crux-lookup-component'}`;
		return this.$node.querySelector(qSel);
	},
	showLookupModal: function (customData = {}) {
		let lookupNode = this.getCurrentLookupNode(customData);
		if (lookupNode) {
			lookupNode.showLookup();
		}
	},
	hideLookupDropdown: function (customData = {}) {
		let { cruxLookupElmId, fromSubform } = customData;
		let qSel = `${fromSubform ? `#${cruxLookupElmId}` : 'crux-lookup-component'} lyte-autocomplete lyte-dropdown`,//no i18n
			ddNode = this.$node.querySelector(qSel);
		if (ddNode) {
			ddNode.close();
		}
	},
	hideLookupModal: function (customData = {}) {
		let lookupNode = this.getCurrentLookupNode(customData);
		if (lookupNode) {
			lookupNode.close();
		}
	},
	lookupCallBackHandler: function (dataObj = {}, subformData = {}) {
		let currentButtonObj = dataObj.currentButtonObj,
			fieldMeta = subformData.cxPropFieldData || this.data.cxPropFieldData,
			newRecordDetails = dataObj.quickCreatedRecord;
		if (["cancel", "save"].includes(currentButtonObj.name) && (this.quickCreateFromModal || currentButtonObj.name === "save")) {
			this.showLookupModal(subformData);
		} else if (currentButtonObj.name === "saveandassociate" && newRecordDetails) {
			let layoutCompData = this.data.cxPropLayoutComponentData,
				lookupModuleId = fieldMeta.lookup.module.id,
				currentApiname = fieldMeta.api_name,
				lookupModuleInfo = layoutCompData.cxInternalUtilityObj.lookupModuleMetaInfo,
				fieldValue = { id: newRecordDetails.id };

			if (lookupModuleInfo[lookupModuleId] && lookupModuleInfo[lookupModuleId].display_field) {
				fieldValue.name = newRecordDetails[lookupModuleInfo[lookupModuleId].display_field.api_name];
			}

			if (subformData && subformData.fromSubform && subformData.recordObj) {
				Lyte.Component.set(subformData.recordObj, currentApiname, fieldValue);
			} else {
				let formDataObj = { cruxFormData: {} };
				formDataObj.cruxFormData[currentApiname] = fieldValue;
				if (layoutCompData.layoutComponentDomNode) {
					layoutCompData.layoutComponentDomNode.setFormData(formDataObj);
				}
			}
		}
	},
	getCurrentLayoutValidFields: function (cxUtilityObj) {
		try {
			return (Object.entries(cxUtilityObj.layoutFieldApiVsMetaObject).map(fieldEntryObj => { return fieldEntryObj[1]; }) || []);
		} catch (err) {
			return [];
		}
	},
	serializeFormDataBeforeSave: function (formData, formFieldList) {
		if (formData && (!formData.$ || !formData.$.model)) {
			for (var fieldKey in formData) {
				let fieldList = formFieldList[fieldKey], fieldValue = formData[fieldKey];
				if (fieldList && fieldList.fieldDataType === "multiselectpicklist" &&
					fieldList.json_type === "jsonarray" && fieldValue && typeof fieldValue === "string") {
					try {
						formData[fieldKey] = JSON.parse(fieldValue);
					} catch (exe) {
						formData[fieldKey] = fieldValue;
					}
				}
			}
		}
		return formData;
	},
	setSaveResponseInMessage: function (detailsObj, layoutCompData) {
		if (detailsObj && detailsObj.saveResponse) {
			let utilityObj = layoutCompData.cxInternalUtilityObj;
			this.setDefautMessageDetails();
			Lyte.objectUtils(utilityObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
			let msg = `Entity Record got ${utilityObj.currentPage === 'edit' ? 'updated' : 'created'} succesfully. Record Id : ${detailsObj.saveResponse.id}`;
			Lyte.objectUtils(utilityObj.commonMessageData, "add", "message", msg);//No I18n
			Lyte.objectUtils(utilityObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeSuccess');//No I18n
		}
	},
	setDefautMessageDetails: function () {
		if (!this.data) { return; }
		let layoutCompData = this.data.cxPropLayoutComponentData;
		if (!layoutCompData) {
			Lyte.objectUtils(this.data, "add", "cxPropLayoutComponentData", {});//No I18n
		}
		layoutCompData = this.data.cxPropLayoutComponentData;
		if (!layoutCompData.cxInternalUtilityObj) {
			Lyte.objectUtils(layoutCompData, "add", "cxInternalUtilityObj", {});//No I18n
		}
		if (!layoutCompData.cxInternalUtilityObj.commonMessageData) {
			Lyte.objectUtils(layoutCompData.cxInternalUtilityObj, "add", "commonMessageData", {});//No I18n
		}
	},
	getCruxFormDirtyAttributes: function (newRecord = {}, originalRecord = {}) {
		let layoutCompData = this.data.cxPropLayoutComponentData, returnObj = {},
			cxUtilityObj = layoutCompData.cxInternalUtilityObj,
			formFieldList = cxUtilityObj.formFieldList,
			fieldIdVsMetaObject = cxUtilityObj.layoutFieldIdVsMetaObject,
			subformApiNames = Object.keys(cxUtilityObj.subformApinameVsSectionMeta || {}),
			newRecordJson = newRecord.$ && newRecord.$.toJSON() || newRecord,
			currentViewType = cxUtilityObj.currentViewType ? cxUtilityObj.currentViewType : (cxUtilityObj.currentPage === "clone" ? "create" : cxUtilityObj.currentPage);//no i18n
		for (var fieldApiName in newRecordJson) {
			if (formFieldList[fieldApiName]) {
				let fieldMeta = fieldIdVsMetaObject[formFieldList[fieldApiName].fieldId];
				if ((fieldApiName === 'Owner' || fieldApiName === "Layout") && (originalRecord[fieldApiName] && newRecordJson[fieldApiName] && newRecordJson[fieldApiName].id !== originalRecord[fieldApiName].id)) {
					returnObj[fieldApiName] = newRecordJson[fieldApiName];
				} else if (formFieldList[fieldApiName].fieldDataType === "multiuserlookup") {
					returnObj[fieldApiName] = newRecordJson[fieldApiName] && newRecordJson[fieldApiName].length ? newRecordJson[fieldApiName] : [];
				} else if (!$u.isEqual(newRecordJson[fieldApiName], originalRecord[fieldApiName]) && !(subformApiNames && subformApiNames.indexOf(fieldApiName) !== -1)) {
					returnObj[fieldApiName] = newRecordJson[fieldApiName];
				} else if (subformApiNames && subformApiNames.indexOf(fieldApiName) !== -1) {
					returnObj[fieldApiName] = newRecord[fieldApiName];
				} else if (formFieldList[fieldApiName].fieldDataType === "picklist" &&
					newRecordJson[fieldApiName] && originalRecord[fieldApiName] &&
					$u.isEqual(newRecordJson[fieldApiName], originalRecord[fieldApiName]) &&
					formFieldList[fieldApiName].fieldId &&
					(fieldMeta && fieldMeta.default_value && fieldMeta.default_value === newRecordJson[fieldApiName])) {
					returnObj[fieldApiName] = newRecordJson[fieldApiName];
				}
				if (!(fieldMeta && fieldMeta.view_type[currentViewType])) {
					delete returnObj[fieldApiName];
				}
			}
		}
		return returnObj;
	},
	getCurrencyData: function (currencyKey, recordData) {
		let fullCurrencyDetails = {},
			userDetails = typeof Crm !== "undefined" && Crm.userDetails || {},
			finalCurrencyKey;
		if (recordData && recordData.Currency) {
			finalCurrencyKey = recordData.Currency;
		} else {
			let storeScope = window.store || store;
			if (storeScope && storeScope.peekRecord) {
				let usrRecord = storeScope.peekRecord('user', userDetails.USER_ID);//no i18n
				finalCurrencyKey = usrRecord ? usrRecord.Currency : undefined;
			}
		}
		finalCurrencyKey = currencyKey ? currencyKey : finalCurrencyKey;
		let currCurrencySymbol = finalCurrencyKey ? finalCurrencyKey :
			(userDetails.IS_MULTI_CURRENCY_ENABLED ? (userDetails.PREFERRED_CURRENCY || userDetails.BASE_CURRENCY || "") :
				(userDetails.defaultOrgCurrency || userDetails.BASE_CURRENCY || "")
			);
		fullCurrencyDetails.currentCurrency = currCurrencySymbol;
		fullCurrencyDetails.currencyDetails = userDetails.CURRENCY_DETAILS;
		let finalCurrencyData = {};
		if (this.isEmptyObj(fullCurrencyDetails.currencyDetails)) {
			if (currCurrencySymbol && typeof currCurrencySymbol === "string") { //no i18n
				finalCurrencyData.symbol = currCurrencySymbol;
			} else {
				finalCurrencyData = currCurrencySymbol;
			}
		}
		for (let key in fullCurrencyDetails.currencyDetails) {
			if (key === fullCurrencyDetails.currentCurrency || (fullCurrencyDetails.currencyDetails[key] && fullCurrencyDetails.currencyDetails[key].symbol === fullCurrencyDetails.currentCurrency)) {
				finalCurrencyData = fullCurrencyDetails.currencyDetails[key];
				finalCurrencyData.key = key;
				break;
			}
		}
		let currencyExchangeRate = finalCurrencyData ?
			(finalCurrencyData.er && finalCurrencyData.decimals ?
				Number(finalCurrencyData.er).toFixed(finalCurrencyData.decimals) :
				finalCurrencyData.er) : "";

		if (finalCurrencyData && currencyExchangeRate) {
			finalCurrencyData.updatedER = currencyExchangeRate;
		}
		if (!finalCurrencyData || !Object.keys(finalCurrencyData).length) {
			finalCurrencyData = finalCurrencyData || {};
			finalCurrencyData.symbol = currCurrencySymbol;
		}
		if (finalCurrencyData) {
			finalCurrencyData = Lyte.deepCopyObject(finalCurrencyData);
		}
		let currentERValue = recordData && recordData.__currencyERValues || {};
		if (currentERValue && currentERValue !== "" && currentERValue.Currency === finalCurrencyData.key && currentERValue.Exchange_rate !== finalCurrencyData.er) {
			finalCurrencyData.er = currentERValue.Exchange_rate;
		}
		return finalCurrencyData;
	},
	getValidFieldDetails: function (mappingKey = 'api_name', layoutCompData) {
		let layoutFieldApiVsMetaObject = layoutCompData.cxInternalUtilityObj.layoutFieldApiVsMetaObject || {},
			{ currentInstObjKey, cxPropCurrentPage } = layoutCompData;

		let viewTypeValue, returnObject = {};
		switch (cxPropCurrentPage) {
			case 'create':
			case 'clone':
				viewTypeValue = 'create';
				break;
			case 'edit':
				viewTypeValue = 'edit';
				break;
		}
		if (['api_name', 'id', 'column_name'].indexOf(mappingKey) === -1) {
			mappingKey = 'api_name';
		}
		if (layoutCompData.isQuickCreate) {
			viewTypeValue = 'quick_create';
		}
		let apiNamesToSkip = layoutCompData.apiNamesToSkip || [],
			uiTypeToSkip = layoutCompData.uiTypeToSkip || [],
			columnsToSkip = layoutCompData.columnsToSkip || [];
		for (let fieldKey in layoutFieldApiVsMetaObject) {
			let fieldReturnObject = {},
				metaDetails = layoutFieldApiVsMetaObject[fieldKey], instanceObject = metaDetails[currentInstObjKey] || {},
				isVisible = instanceObject.hasOwnProperty('visible') ? instanceObject.visible : metaDetails.visible,
				isReadOnly = instanceObject.hasOwnProperty('read_only') ? instanceObject.read_only : metaDetails.read_only,
				isMandatory = instanceObject.hasOwnProperty('required') ? instanceObject.required : metaDetails.required,
				isVisibleViewType = instanceObject.hasOwnProperty('view_type') ? instanceObject.view_type[viewTypeValue] : metaDetails.view_type[viewTypeValue];

			let isValid = isVisible && isVisibleViewType && (columnsToSkip.indexOf(metaDetails.column_name) === -1 &&
				apiNamesToSkip.indexOf(metaDetails.api_name) === -1 &&
				uiTypeToSkip.indexOf(metaDetails.ui_type) === -1);

			if (isValid && metaDetails.column_name === "LAYOUTID" && cxPropCurrentPage === "create") {
				isValid = false;
			}
			fieldReturnObject.isVisible = isValid;
			fieldReturnObject.isReadOnly = isReadOnly;
			fieldReturnObject.isMandatory = isMandatory;
			['api_name', 'ui_type', 'column_name', 'data_type', 'id'].forEach(prop => {
				fieldReturnObject[prop] = metaDetails[prop];
			});
			returnObject[metaDetails[mappingKey]] = fieldReturnObject;
		}
		return returnObject;
	},
	executeGivenValidationRules: function (vrFieldDetail, layoutCompData) {
		let vrFieldDetails = [];
		if (vrFieldDetail && !Array.isArray(vrFieldDetail)) {
			vrFieldDetails.push(vrFieldDetail);
		} else if (vrFieldDetail) {
			vrFieldDetails = vrFieldDetail;
		}
		let configuredVRules = layoutCompData.cxPropValidationRules || [],
			vrRules = [];
		const { idToApi, apiToId } = configuredVRules.reduce((finalObj, singleRule) => {
			if (singleRule && singleRule.field) {
				finalObj.idToApi[singleRule.field.id] = finalObj.apiToId[singleRule.field.api_name] = singleRule;
			}
			return finalObj;
		}, { idToApi: {}, apiToId: {} });

		if (vrFieldDetails && vrFieldDetails.length) {
			vrFieldDetails.forEach(vrField => {
				if (idToApi && idToApi.hasOwnProperty(vrField)) {
					vrRules.push(idToApi[vrField]);
				} else if (apiToId && apiToId.hasOwnProperty(vrField)) {
					vrRules.push(apiToId[vrField]);
				}
			});
		}
		return new Promise((resolve, reject) => {
			try {
				this.processValidationRules({
					dontFocus: false,
					vrRules,
					callbackFunc: vrExecutionResponse => {
						resolve({ errorDetails: vrExecutionResponse && vrExecutionResponse.valErrorDetails });
					}
				});
			} catch (error) {
				reject({ error, exception: true });
			}
		});
	},
	setDataAndRenderErrorYield: function (customData, layoutComponentData) {
		let { fieldApiName, yieldDataObject } = customData;
		let layoutFieldApiVsMetaObject = layoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject || {},
			{ currentInstObjKey } = layoutComponentData,
			fieldMeta = layoutFieldApiVsMetaObject[fieldApiName];
		if (fieldMeta && fieldMeta[currentInstObjKey]) {
			Lyte.Component.set(fieldMeta[currentInstObjKey], 'yieldDataObject', yieldDataObject);//no i18n
			Lyte.Component.set(fieldMeta[currentInstObjKey], 'isErrorYieldNeeded', true);//no i18n
		}
	},
	setFormConfigurations: function (dataObj) {
		let { fieldCurntInstObj, formConfigurations, cxPropFieldData } = dataObj,
			supportedProperties = ['api_name', 'column_name', 'data_type', 'ui_type', 'id'],
			sLen = supportedProperties.length,
			fieldSpecificFormConfigData;
		fieldSpecificFormConfigData = dataObj.fieldSpecificFormConfigData || {};
		if (formConfigurations && !this.isEmptyObj(formConfigurations)) {
			for (let s = 0; s < sLen; s++) {
				let currentProperty = supportedProperties[s];
				if (formConfigurations[currentProperty] && typeof formConfigurations[currentProperty] === 'object' && formConfigurations[currentProperty].hasOwnProperty(cxPropFieldData[currentProperty])) {
					fieldSpecificFormConfigData = formConfigurations[currentProperty][cxPropFieldData[currentProperty]];
					break;
				}
			}
		}
		if (fieldSpecificFormConfigData) {
			for (let prop in fieldSpecificFormConfigData) {
				Lyte.Component.set(fieldCurntInstObj, prop, fieldSpecificFormConfigData[prop]);
			}
		}
	},
	getFieldSpecificFormConfigData: function (dataObj) {
		let { formConfigurations, cxPropFieldData } = dataObj,
			supportedProperties = ['api_name', 'column_name', 'data_type', 'ui_type', 'id'],
			sLen = supportedProperties.length,
			fieldSpecificFormConfigData = {};
		if (formConfigurations && !this.isEmptyObj(formConfigurations)) {
			for (let s = 0; s < sLen; s++) {
				let currentProperty = supportedProperties[s];
				if (formConfigurations[currentProperty] && typeof formConfigurations[currentProperty] === 'object' && formConfigurations[currentProperty].hasOwnProperty(cxPropFieldData[currentProperty])) {
					fieldSpecificFormConfigData = formConfigurations[currentProperty][cxPropFieldData[currentProperty]];
					break;
				}
			}
		}
		return fieldSpecificFormConfigData;
	}
});

Lyte.Mixin.register("crux-entity-common-utils", {
    getFieldVal: function (customData) {
        var fieldApiName = customData.fieldMetaDetails.api_name, fieldDatatype = customData.fieldMetaDetails.data_type, formData = customData.cxPropFormData;
        if (customData.executionType !== "failure") {
            if (fieldDatatype === "text" && typeof formData[fieldApiName] === "string") {
                return formData[fieldApiName].trim();
            }
            return formData[fieldApiName];
        } else if (fieldDatatype === "text" && typeof formData[fieldApiName] === "string") { //no i18n
            if (formData[fieldApiName].trim() === "") {
                return undefined;
            }
            return formData[fieldApiName].trim();
        } else if (fieldDatatype === "picklist" && formData[fieldApiName] === "-None-") { //no i18n
            return undefined;
        }
        return formData[fieldApiName];
    },
    getSectionMetaByGivenField: function (customData) {
        var { layoutSections, fieldId } = customData;
        layoutSections = layoutSections || [];
        var layoutSectionsLen = layoutSections.length, sectionMetaData, fieldMetaData;
        for (var k1 = 0; k1 < layoutSectionsLen; k1++) {
            var currentSection = layoutSections[k1];
            if (currentSection.fields) {
                var currntSectionFields = currentSection.fields || [], currntSectionFieldsLen = currntSectionFields.length;
                for (var k2 = 0; k2 < currntSectionFieldsLen; k2++) {
                    var eachCurrntSectionField = currntSectionFields[k2];
                    if (eachCurrntSectionField.id === fieldId) {
                        fieldMetaData = eachCurrntSectionField;
                        sectionMetaData = currentSection; break;
                    }
                }
            }
        }
        return { sectionMetaData: sectionMetaData, fieldMetaData: fieldMetaData };
    },
    isEmptyObj: function (obj) {
        try {
            var tempObj = null;
            if (!obj || obj === "null" || obj === "NULL" || obj === "empty" || obj === "EMPTY" || obj === "undefined" || obj === "UNDEFINED") { //No I18N
                return true;
            } else if (typeof obj !== "object" && typeof obj === "string") { //No I18N
                tempObj = obj.replace(/[ ]/g, "");
            } else if (typeof obj === "object") { //No I18N
                return Object.keys(obj).length < 1 ? true : false;
            }
            if (tempObj === "") {
                return true;
            }
            return false;
        }
        catch (e) {
            return true;
        }
    }
});
Lyte.Mixin.register("crux-create-requesthandler-mixin", {
    fetchModuleMetaData: async function (moduleId) {
        return new Promise(function (resolve) {
            try {
                store.findRecord('module', moduleId).then(
                    (successResponse) => {
                        resolve({ success: successResponse });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (moduleFetchException) {
                resolve({ isExceptionOccured: true, moduleFetchException });
            }
        }.bind(this));
    },
    fetchLayoutMetaData: async function (layoutCompData, layoutId) {
        let layoutDetails = (this.getDefaultLayoutDetails(layoutCompData.cxPropModuleData, layoutCompData.cxPropProfileName, layoutId)) || {},
            layoutCacheCustomdata = { layoutId: layoutId || layoutDetails.currentLayoutId, moduleSet: true, peekField: false, from: "lyteCreate" };//no i18n
        if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
            layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
        }
        if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
            layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
        }
        return new Promise(function (resolve) {
            try {
                store.findRecord("module", layoutCompData.cxPropModuleData.id, { include_inner_details: "lookup.query_details.criteria" }, undefined, true, layoutCacheCustomdata).then(
                    (successResponse) => {
                        resolve({ success: successResponse, layoutId: layoutCacheCustomdata.layoutId });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (layoutFetchException) {
                resolve({ isExceptionOccured: true, layoutFetchException });
            }
        }.bind(this));
    },
    fetchLayoutRuleData: async function (layoutCompData, cxPropLayoutId) {
        return new Promise(function (resolve) {
            try {
                let currentLayoutId = cxPropLayoutId || (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id);
                if (typeof Crm !== 'undefined' &&
                    (Crm.userDetails.LAYOUTRULEAVAILABLE === undefined || Crm.userDetails.LAYOUTRULEAVAILABLE === true &&
                        Crm.userDetails.LRINVOLVEDMODULES.includes(layoutCompData.cxPropModuleData.module_name))) {
                    store.findAll("layout_rule", { module: layoutCompData.cxPropModuleData.api_name }, false, false, {layout_id : currentLayoutId }).then(
                        (successResponse) => {
                            resolve({ success: successResponse });
                        },
                        (failureResponse) => {
                            resolve({ failure: failureResponse });
                        });
                } else {
                    resolve();
                }
            } catch (layoutRuleFetchException) {
                resolve({ isExceptionOccured: true, layoutRuleFetchException });
            }
        }.bind(this));
    },
    fetchValidationRuleData: async function (layoutCompData, cxPropLayoutId) {
        return new Promise(function (resolve) {
            try {
                let currentLayoutId = cxPropLayoutId || (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id);
                if (typeof Crm !== 'undefined' &&
                    (Crm.userDetails.VALIDATIONRULEAVAILABLE === undefined || Crm.userDetails.VALIDATIONRULEAVAILABLE === true &&
                        Crm.userDetails.VRINVOLVEDMODULES.includes(layoutCompData.cxPropModuleData.module_name))) {
                    store.findAll("validation_rule", {
                        layout_id: currentLayoutId,
                        module: layoutCompData.cxPropModuleData.api_name,
                        download_rules: true
                    }, false).then(
                        (successResponse) => {
                            resolve({ success: successResponse });
                        },
                        (failureResponse) => {
                            resolve({ failure: failureResponse });
                        });
                } else {
                    resolve();
                }
            } catch (validationRuleFetchException) {
                resolve({ isExceptionOccured: true, validationRuleFetchException });
            }
        }.bind(this));
    },
    fetchLookupModuleData: function (customData) {
        customData = customData || {};
        let { id } = customData;
        return new Promise((resolve) => {
            store.findRecord("module", id).then(
                (moduleResponse) => {
                    resolve(moduleResponse[0]);
                },
                (failureResponse) => {
                    resolve(failureResponse);
                });
        });
    },
    fetchLookupRecordsData: function (customData) {
        customData = customData || {};
        let { moduleId, queryParams } = customData;
        return new Promise((resolve) => {
            store.findAll(moduleId, queryParams).then(
                (entityRecords) => {
                    resolve(entityRecords);
                },
                (failureResponse) => {
                    resolve(failureResponse);
                });
        });
    },
    saveCurrentForm: function (customData, isQuickCreate, layoutComponentData) {
        customData = customData || {};
        var entityRecord = customData.formData && customData.formData.$ && customData.formData.$.model ? customData.formData : store.createRecord(customData.moduleId, customData.formData, true);
        this.showHideLoadingDiv(true);
        return new Promise((resolve) => {
            let saveCustomData = { crux_feature_type: 'entitySave', currentPage: customData.currentPage, moduleId: customData.moduleId, moduleName: customData.moduleName };
            entityRecord = this.serializeFormDataBeforeSave(entityRecord, layoutComponentData.cxInternalUtilityObj.formFieldList);
            entityRecord.$.save(saveCustomData).then(
                (successResponse) => {
                    let returnObj = {
                        saveResponse: successResponse.hasOwnProperty(customData.moduleId) ? successResponse[customData.moduleId] : successResponse
                    };
                    if (successResponse.data && successResponse.data[0] && successResponse.data[0].details) {
                        returnObj.saveResponse = successResponse.data[0].details;
                    }
                    if (customData.currentButtonObj && customData.currentButtonObj.name === 'saveandassociate' &&
                        isQuickCreate && returnObj.saveResponse && returnObj.saveResponse.id) {
                        store.findRecord(customData.moduleId, returnObj.saveResponse.id).then(
                            (successResponse) => {
                                this.showHideLoadingDiv();
                                returnObj.quickCreatedRecord = (Array.isArray(successResponse) && successResponse[0]) || successResponse;
                                resolve(returnObj);
                            },
                            () => {
                                this.showHideLoadingDiv();
                                resolve(returnObj);
                            }).catch(() => {
                                this.showHideLoadingDiv();
                                resolve(returnObj);
                            });
                    } else {
                        this.showHideLoadingDiv();
                        resolve(returnObj);
                    }
                },
                (failureResponse) => {
                    this.showHideLoadingDiv();
                    resolve({ errorObject: failureResponse, isSaveFailed: true });
                });
        });
    },
    fetchAndSetLookupModuleMeta: function (cxUtilityObj, modId) {
        return new Promise((resolve) => {
            store.findRecord('module', modId).then(
                (sucessReponse) => {
                    if (Array.isArray(sucessReponse) && sucessReponse[0]) {
                        Lyte.objectUtils(cxUtilityObj.lookupModuleMetaInfo, 'add', modId, sucessReponse[0]);
                    } else {
                        delete cxUtilityObj.lookupModuleMetaInfo[modId];
                    }
                    resolve();
                },
                () => {
                    delete cxUtilityObj.lookupModuleMetaInfo[modId];
                    resolve();
                }
            ).catch(() => {
                delete cxUtilityObj.lookupModuleMetaInfo[modId];
                resolve();
            });
        });
    },
    fetchEntityRecordData: function (layoutCompData) {
        let { cxPropRecordId, cxPropModuleId } = layoutCompData,
            qp = { approved: "both", converted: "both" };
        return new Promise(function (resolve) {
            try {
                store.findRecord(cxPropModuleId, cxPropRecordId, qp).then(
                    (successResponse) => {
                        resolve({ success: successResponse });
                    },
                    (failureResponse) => {
                        resolve({ failure: failureResponse });
                    }).catch(() => {
                        resolve();
                    });
            } catch (recordFetchException) {
                resolve({ isExceptionOccured: true, recordFetchException });
            }
        }.bind(this));
    }
});
Lyte.Mixin.register("crux-entity-date-time-mixin", {
    cxCrmConvertUsrtoDefaultDatePattern: function (customData) {
        var newDate = customData.date, datePattern = customData.datePattern;
        if (!newDate) {
            return '';
        }
        if (!newDate.getMonth) {
            datePattern = datePattern && datePattern.toUpperCase();
            try {
                newDate = $L.moment(newDate, datePattern).getDObj();
            } catch (e) {
                throw e;
            }
        }
        return newDate;
    },
    getDateInGivenPattern: function (newDate, pattern) {
        if (!newDate || !(newDate instanceof Date)) {
            var newDate = new Date();
        }
        var newToDay = newDate.getDate();
        var newMonth = newDate.getMonth();
        var str = newToDay + " " + newMonth + " " + newDate.getFullYear();
        return this.convertToUserDatePattern(str, pattern);
    },
    convertToUserDatePattern: function (date, pattern) {
        var dateArray = date.split(" ");//No I18n
        var dateObj = new Date(dateArray[2], dateArray[1], dateArray[0]);
        pattern = pattern || "";
        return this.convertDateToUserPattern(dateObj, pattern.toUpperCase());
    },
    convertDateToUserPattern: function (dateObj, formatPattern) {
        if (!formatPattern) {
            return;
        }
        return $L.moment(new Date(dateObj)).format(formatPattern);
    },
    getDateTimeWithTimezone: function (dateObj) {
        function trailingZero(num) {
            return num < 10 ? '0' + num : num;
        }
        var serverFormatTime;
        if (dateObj) {
            serverFormatTime = dateObj.getFullYear() +
                '-' + trailingZero(dateObj.getMonth() + 1) +
                '-' + trailingZero(dateObj.getDate()) +
                'T' + trailingZero(dateObj.getHours()) + //no i18n
                ':' + trailingZero(dateObj.getMinutes()) +
                ':' + trailingZero(dateObj.getSeconds());
        }
        return serverFormatTime;
    },
    getfinalTimeObjectfromTime: function (time, currentTimePattern = "") {
        if (time) {
            var obj = {};
            var usertimeF = currentTimePattern.split(' ');
            var format = usertimeF.length > 1 ? "12" : "24";
            var timeV = time.split(' ');
            var spaceIndexVal = time.indexOf(' ');
            if (spaceIndexVal !== -1) {
                var parsedMeridiemVal = time.slice(spaceIndexVal + 1);
                parsedMeridiemVal = parsedMeridiemVal && typeof parsedMeridiemVal === "string" ? parsedMeridiemVal.trim() : parsedMeridiemVal;//no i18n
                if (parsedMeridiemVal && timeV[1]) {
                    timeV[1] = parsedMeridiemVal;
                }
            }
            var splitdTime = timeV[0].split(':');
            if (format == "12") {
                if (timeV[1]) {
                    timeV[1] = timeV[1].toUpperCase();
                    obj.hrs = (timeV[1] == I18n.getMsg("AM").toUpperCase() ? (splitdTime[0] == 12 ? 0 : splitdTime[0]) : 12 + (splitdTime[0] == 12 ? 0 : Number(splitdTime[0])));//no i18n
                }
                obj.mins = splitdTime[1];
            } else {
                obj.hrs = splitdTime[0];
                obj.mins = splitdTime[1];
            }
            return obj;
        }
    }
});


/**
    
    This mixin utils will process the layout rules and returns the result as boolean.

    Mandatory utils/mixins needed for this to work
    
    1.crux-entity-date-time-mixin.js
    2.crux-entity-common-utils.js
    3.currentInstObjKey -> an unique need be generated for each section and fields, meta/internal properties will be maintained here

 */
Lyte.Mixin.register("crux-common-rules-utils", {
    checkCriteriaMatch: function (customData) {
        var criteriaDetails = customData.criteriaDetails, methodCustomData1 = {};
        for (var cKeys in customData) {
            methodCustomData1[cKeys] = customData[cKeys];
        }
        if (!criteriaDetails.group_operator && (criteriaDetails.length === undefined || criteriaDetails.length === null)) {
            methodCustomData1.criteriaDetails = criteriaDetails;
            return this.checkingMatch(methodCustomData1);
        } else if (criteriaDetails.group_operator) {
            let temp = [], i = 0, condition = criteriaDetails.group_operator;
            var _internalCriteria = criteriaDetails.group, _inL = _internalCriteria.length;
            for (var l = 0; l < _inL; l++) {
                methodCustomData1.criteriaDetails = _internalCriteria[l];
                if (!_internalCriteria[l].group_operator) {
                    temp[i++] = this.checkingMatch(methodCustomData1);
                } else {
                    temp[i++] = this.checkCriteriaMatch(methodCustomData1);
                }
            }
            if (condition === "and") {
                return temp[0] && temp[1];
            } else if (condition === "or") {
                return temp[0] || temp[1];
            }
        } else {
            let condition, temp = [], i = 0, criteria = criteriaDetails || [];
            criteria.forEach(eachCriteriaItem => {
                methodCustomData1.criteriaDetails = eachCriteriaItem;
                if ((eachCriteriaItem && eachCriteriaItem.length === undefined) || typeof eachCriteriaItem === 'string') {
                    if (typeof eachCriteriaItem === 'object') {
                        temp[i++] = this.checkingMatch(methodCustomData1);
                    } else if (typeof eachCriteriaItem === 'string') { //no i18n
                        condition = eachCriteriaItem;
                    }
                } else if (typeof eachCriteriaItem !== 'function') {
                    temp[i++] = this.checkCriteriaMatch(methodCustomData1);
                }
            });
            if (condition === "and") {
                return temp[0] && temp[1];
            } else if (condition === "or") {
                return temp[0] || temp[1];
            }
        }
    },
    checkingMatch: function (customData) {
        var { currentInstObjKey, isVR_Subcondition, executionType, criteriaDetails, layoutFieldIdVsMetaObject, layoutSections } = customData;
        var criteriaFieldApiName = criteriaDetails.field.api_name, criteriaFieldId = criteriaDetails.field.id, currentViewType = customData.currentViewType;
        layoutFieldIdVsMetaObject = layoutFieldIdVsMetaObject || {};
        var fieldMetaDetails = layoutFieldIdVsMetaObject[criteriaFieldId], isreturnUndefined;
        if (fieldMetaDetails === undefined || !fieldMetaDetails.visible) {
            isreturnUndefined = true;
        }
        if (isVR_Subcondition && (!fieldMetaDetails || (fieldMetaDetails && (!fieldMetaDetails.view_type[currentViewType] || !fieldMetaDetails.visible)))) {
            return true;
        }
        if (isreturnUndefined) {
            return undefined;
        }
        var fieldVal = this.getFieldVal({ fieldApiName: criteriaFieldApiName, fieldMetaDetails, cxPropFormData: customData.cxPropFormData, executionType });
        fieldVal = fieldVal === undefined && currentViewType !== "edit" && fieldMetaDetails.default_value ? fieldMetaDetails.default_value : fieldVal; // NO I18N
        var criteriaValue = criteriaDetails.value;
        if (fieldMetaDetails.column_name === "STAGE") {
            var pickListValues = fieldMetaDetails.pick_list_values, stageValues = [], stageLength = pickListValues.length;
            for (var i = 0; i < stageLength; i++) {
                if (criteriaValue === "${OPEN}" && (pickListValues[i].forecast_type === "Open" || pickListValues[i].deal_category === "Open")) {
                    stageValues.push(pickListValues[i].display_value);
                } else if (criteriaValue === "${CLOSEDWON}" && (pickListValues[i].forecast_type === "Closed Won" || pickListValues[i].deal_category === "Closed Won")) {
                    stageValues.push(pickListValues[i].display_value);
                } else if (criteriaValue === "${CLOSEDLOST}" && (pickListValues[i].forecast_type === "Closed Lost" || pickListValues[i].deal_category === "Closed Lost")) {
                    stageValues.push(pickListValues[i].display_value);
                }
            }
            if (stageValues.length > 0) {
                criteriaValue = stageValues;
            }
        }
        var checkComparatorDataObj = { currentDatePattern: customData.currentDatePattern, currentTimePattern: customData.currentTimePattern, currentTimeZone: customData.currentTimeZone };
        checkComparatorDataObj.fieldVal = fieldVal; checkComparatorDataObj.criteriaValue = criteriaValue;
        checkComparatorDataObj.comparator = criteriaDetails.comparator;
        checkComparatorDataObj._api = criteriaFieldApiName; checkComparatorDataObj.fieldId = criteriaFieldId;
        checkComparatorDataObj.executionType = executionType;
        checkComparatorDataObj.isVR_Subcondition = isVR_Subcondition;
        checkComparatorDataObj.formFieldList = customData.formFieldList;
        checkComparatorDataObj.userCurrencyDetails = customData.userCurrencyDetails;
        checkComparatorDataObj.cxPropFormData = customData.cxPropFormData;
        var _flag = this.checkComparator(checkComparatorDataObj);
        if (isVR_Subcondition) {
            var secFieldMetaDetails = this.getSectionMetaByGivenField({ layoutSections, fieldId: criteriaFieldId });
            var currSectiondata = secFieldMetaDetails.sectionMetaData && secFieldMetaDetails.sectionMetaData[currentInstObjKey] || {};
            var currentFieldInfo = secFieldMetaDetails.fieldMetaData && secFieldMetaDetails.fieldMetaData[currentInstObjKey] || {};
            if (currSectiondata.isvalidSection === false || !currentFieldInfo.view_type[currentViewType] || !currentFieldInfo.visible) {
                return undefined;
            }
            return _flag;
        }
        return _flag;
    },
    checkComparator: function (customData) {
        var { fieldVal, formFieldList, cxPropFormData, comparator, _api, executionType, fieldId, isVR_Subcondition, userCurrencyDetails, currentUserId } = customData,
            _val = customData.criteriaValue;
        formFieldList = formFieldList || {};
        var currentFieldModelObj = formFieldList[_api], atrrType = currentFieldModelObj.lyteAtrrType, fieldDataType = currentFieldModelObj.fieldDataType, jsonType = currentFieldModelObj.json_type;
        var currentDatePattern = customData.currentDatePattern || "", currentTimePattern = customData.currentTimePattern || "", currentTimeZone = customData.currentTimeZone || "";
        fieldVal = fieldVal && typeof fieldVal === "string" ? fieldVal.trim() : fieldVal;//no i18n
        if (fieldDataType === 'date' && fieldVal) {
            if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = cxPropFormData.$ && cxPropFormData.$.error[_api].errorValue;
            }
            switch (_val) {
                case '${TODAY}': {
                    comparator = 'equal';//no i18n
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: $L.moment().toDate(), datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${TOMORROW}': {
                    comparator = 'equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${TOMORROWPLUS}': {
                    comparator = 'greater_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${YESTERDAY}': {
                    comparator = 'equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${YESTERDAYMINUS}': {
                    comparator = 'less_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${LASTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${THISMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${NEXTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${LASTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${THISWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
                case '${NEXTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() + 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateInGivenPattern(firstDateObj, "yyyy-mm-dd");//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateInGivenPattern(lastDateObj, "yyyy-mm-dd");//no i18n
                    break;
                }
            }
            if (_val.match('AGEINDAYS') || _val.match('DUEINDAYS')) { //no i18n
                let dateDifference, ageFlag;
                if (_val.match('AGEINDAYS')) {
                    ageFlag = true;
                }
                try {
                    dateDifference = _val.substring(_val.indexOf('+') + 1);
                } catch (e) {
                    throw e;
                }
                if (ageFlag) {
                    dateDifference = '-' + dateDifference;
                }
                let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: new Date(), datePattern: currentDatePattern });
                currDateObj = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
                dateDifference = parseInt(dateDifference);
                let date = new Date();
                date.setDate(date.getDate() + dateDifference);
                let checkDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                checkDateObj = this.getDateInGivenPattern(checkDateObj, "yyyy-mm-dd");//no i18n
                _val = checkDateObj;
                switch (comparator) {
                    case 'greater_than':
                    case 'greater_equal':
                        if (ageFlag) {
                            comparator = comparator === 'greater_equal' ? 'less_equal' : 'less_than';//no i18n
                        }
                        break;
                    case 'less_than':
                    case 'less_equal':
                        if (ageFlag) {
                            comparator = 'between'; //no i18n
                            _val = [];
                            _val[0] = checkDateObj;
                            _val[1] = currDateObj;
                        } else {
                            comparator = 'between'; //no i18n
                            _val = [];
                            _val[0] = currDateObj;
                            _val[1] = checkDateObj;
                        }
                        break;
                }
            }
            let isValidDate;
            try {
                isValidDate = $L.moment(fieldVal, currentDatePattern.toUpperCase(), { i18n: true }).validate();
            }
            catch (e) {
                isValidDate = false;
            }
            if (isValidDate) {
                let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: fieldVal, datePattern: currentDatePattern });
                fieldVal = this.getDateInGivenPattern(currDateObj, "yyyy-mm-dd");//no i18n
            } else {
                return false;
            }
        } else if (fieldDataType === 'datetime' && fieldVal) {
            if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = cxPropFormData.$ && cxPropFormData.$.error[_api].errorValue;
            }
            var fieldValD, fieldV;

            var upperCaseUserDatePattern = Crm.userDetails.DATE_PATTERN.toUpperCase(),
                upperCaseUserTimeFormat = Crm.userDetails.TIME_FORMAT;
            var constructPattern = upperCaseUserDatePattern + " " + upperCaseUserTimeFormat.replace(':MM', ':mm');
            fieldValD = $L.moment(fieldVal, constructPattern).format(upperCaseUserDatePattern);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
            fieldV = [];
            if (!fieldValD) {
                try {
                    fieldValD = $L.moment(fieldVal, constructPattern, { i18n: true }).format(upperCaseUserDatePattern);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
                } catch (exe) { murphy.error(exe); }
            }
            fieldV[0] = fieldValD;
            var expectedTimeFormat = Crm.userDetails.TIME_FORMAT.split(" ").length > 1 ? upperCaseUserTimeFormat.replace('a', 'A') : Crm.userDetails.TIME_FORMAT;
            fieldV[1] = $L.moment(fieldVal, constructPattern).format(expectedTimeFormat);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
            if (!fieldV[1]) {
                try {
                    fieldV[1] = $L.moment(fieldVal, constructPattern, { i18n: true }).format(expectedTimeFormat);//eslint-disable-line @zoho/zohocrm/Date-Util-Usage
                } catch (exe) { murphy.error(exe); }
            }
            fieldV[1] = fieldV[1] ? fieldV[1].toUpperCase() : fieldV[1];
            let isValidDate;
            try {
                isValidDate = $L.moment(fieldValD, currentDatePattern.toUpperCase(), { i18n: true }).validate();
            }
            catch (e) {
                isValidDate = false;
            }
            switch (_val) {
                case '${TODAY}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = []; let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${TOMORROW}': {
                    comparator = 'between';//no i18n
                    let date = new Date(new Date().setDate(new Date().getDate() + 1)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${TOMORROWPLUS}': {
                    comparator = 'greater_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0);
                    let currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateTimeWithTimezone(currDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${YESTERDAY}': {
                    comparator = 'between';//no i18n
                    let date = new Date(new Date().setDate(new Date().getDate() - 1)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${YESTERDAYMINUS}': {
                    comparator = 'less_equal';//no i18n
                    let date = new Date();
                    date.setDate(date.getDate() - 1);
                    var currDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: date, datePattern: currentDatePattern });
                    _val = this.getDateTimeWithTimezone(currDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${LASTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${THISMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth(), 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${NEXTMONTH}': {
                    comparator = 'between';//no i18n
                    let date = new Date(), firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1), lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${LASTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - 7 - curr.getDay(), last = first + 6, firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${THISWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() - curr.getDay(), last = first + 6,
                        firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
                case '${NEXTWEEK}': {
                    comparator = 'between';//no i18n
                    let curr = new Date(), first = curr.getDate() + 7 - curr.getDay(), last = first + 6,
                        firstday = new Date(curr.setDate(first)), lastday = new Date(curr.setDate(last));
                    _val = [];
                    let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstday, datePattern: currentDatePattern });
                    _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastday, datePattern: currentDatePattern });
                    _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                    break;
                }
            }

            if (typeof _val === "string" ? _val.match('AGEINDAYS') || _val.match('DUEINDAYS') : null) { //NOI18N
                let dateDifference, ageFlag = false;
                try {
                    dateDifference = _val.substring(_val.indexOf('+') + 1);
                } catch (e) {
                    throw e;
                }
                if (_val.match('AGEINDAYS')) {
                    ageFlag = true;
                    dateDifference = '-' + dateDifference;
                }
                dateDifference = parseInt(dateDifference);
                let date = new Date(new Date().setDate(new Date().getDate() + dateDifference)), firstDay = new Date(date.setHours(0, 0, 0, 0)), lastDay = new Date(date.setHours(23, 59, 59, 999));
                _val = [];
                let firstDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstDay, datePattern: currentDatePattern });
                _val[0] = this.getDateTimeWithTimezone(firstDateObj) + currentTimeZone.replace('.', ':');//no i18n
                let lastDateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastDay, datePattern: currentDatePattern });
                _val[1] = this.getDateTimeWithTimezone(lastDateObj) + currentTimeZone.replace('.', ':');//no i18n
                let firstCurDay = $L.moment($L.moment().toDate().setHours(0, 0, 0, 0)).toDate(), lastCurDay = $L.moment($L.moment().toDate().setHours(23, 59, 59, 999)).toDate();
                firstCurDay = this.cxCrmConvertUsrtoDefaultDatePattern({ date: firstCurDay, datePattern: currentDatePattern });
                firstCurDay = this.getDateTimeWithTimezone(firstCurDay) + currentTimeZone.replace('.', ':');//no i18n
                lastCurDay = this.cxCrmConvertUsrtoDefaultDatePattern({ date: lastCurDay, datePattern: currentDatePattern });
                lastCurDay = this.getDateTimeWithTimezone(lastCurDay) + currentTimeZone.replace('.', ':');//no i18n
                switch (comparator) {
                    case 'equal':
                        comparator = 'between';//no i18n
                        break;
                    case 'not_equal':
                        comparator = 'not_between'; //no i18n
                        break;
                    case 'greater_than':
                    case 'greater_equal':
                        if (ageFlag) {
                            _val = _val[0];
                            comparator = comparator === 'greater_equal' ? 'less_equal' : 'less_than';//no i18n
                        } else {
                            _val = _val[1];
                        }
                        break;
                    case 'less_than':
                    case 'less_equal':
                        if (ageFlag) {
                            comparator = 'between'; //no i18n
                            _val[1] = lastCurDay;
                        } else {
                            comparator = 'between'; //no i18n
                            _val[0] = firstCurDay;
                        }
                        break;
                }
            }
            if (isValidDate) {
                var dateObj = this.cxCrmConvertUsrtoDefaultDatePattern({ date: fieldValD, datePattern: currentDatePattern });
                if (fieldV[1]) {
                    var timeObj = this.getfinalTimeObjectfromTime(fieldV[1], currentTimePattern);//no i18n
                    if (!this.isEmptyObj(timeObj)) {
                        dateObj.setHours(timeObj.hrs);
                        dateObj.setMinutes(timeObj.mins);
                    }
                }
                fieldVal = this.getDateTimeWithTimezone(dateObj) + currentTimeZone.replace('.', ':');//no i18n
            } else {
                return false;
            }
        } else if (['currency', 'double', 'integer'].includes(fieldDataType)) { //no i18n
            if (fieldVal === undefined || fieldVal === null) {
                if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                    fieldVal = isNaN(parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value)) ? (_val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : undefined) : parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value);
                } else if (executionType && executionType !== "failure") { //no i18n
                    fieldVal = _val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : fieldVal;//no i18n
                }
                if (executionType && fieldVal === 0) { // if field dosent have any value, we should consider it as empty value only
                    fieldVal = undefined;
                }
            } else if (!this.isEmptyObj(cxPropFormData.$ && cxPropFormData.$.error[_api])) {
                fieldVal = isNaN(parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value)) ? (_val !== '${EMPTY}' && _val !== '${NOTEMPTY}' ? 0 : undefined) : parseFloat(cxPropFormData.$ && cxPropFormData.$.error[_api].value);
            }
            //to handle multiCurrency - convert the currency
            if (fieldDataType === "currency" && (_val || _val === 0) && typeof _val === 'number') {
                var base = userCurrencyDetails;
                if (cxPropFormData.Currency && base && base[cxPropFormData.Currency]) {
                    _val = base[cxPropFormData.Currency].er * _val;
                }
            }
        } else if (fieldDataType === "lookup" && (!this.isEmptyObj(fieldVal))) { //no i18n
            fieldVal = fieldVal.name;
        } else if (fieldDataType === "userlookup" || fieldDataType === "ownerlookup") { //no i18n
            if (_val === '${EMPTY}' && this.isEmptyObj(fieldVal)) {
                return false;
            } else if (_val === '${NOTEMPTY}' || (comparator === 'not_equal' && _val === '${EMPTY}') && !this.isEmptyObj(fieldVal)) { //no i18n
                return true;
            }
            if (!this.isEmptyObj(fieldVal)) {
                fieldVal = fieldVal.id;
            }
            _val = _val.id ? _val.id : (currentUserId || _val);
        } else if (fieldDataType === "bigint" && atrrType === 'object') {
            if (!this.isEmptyObj(fieldVal)) {
                fieldVal = fieldVal.id;
            }
            if (_val.id) {
                _val = _val.id;
            } else {
                var valArr = [];
                _val.forEach(function (item) { valArr.push(item.id); });
                _val = valArr;
            }
            comparator = comparator === 'equal' ? 'contains' : comparator === 'not_equal' ? 'not_contains' : comparator; //no I18n
        }
        var _f;
        if (executionType) {
            _f = this.chkFieldemptyVR({ fieldVal, executionType, isVR_Subcondition });
            if (_f === undefined && isVR_Subcondition && jsonType === "integer" && fieldVal === undefined && ["not_equal", "less_equal", "less_than"].indexOf(comparator) !== -1) {
                return false;
            }
        }
        if (_val && typeof _val === "string" && _val.indexOf('${NOC') >= 0) {
            _val = _val.replace('${NOC', '').replace('}', '');
            if (executionType) {
                if (fieldVal) {
                    fieldVal = fieldVal.length || 0;
                } else {
                    fieldVal = fieldVal !== undefined ? undefined : fieldVal;
                }
            } else {
                fieldVal = fieldVal ? fieldVal.length : 0;
            }
        }
        switch (comparator) {
            case 'between':
            case 'not_between':
                if (_f === true || _f === false) { return _f; }
                if (_val && _val.length === 2) {
                    if ((typeof _val[0] === 'string' && typeof _val[1] === 'string') &&
                        (_val[0].indexOf('${NOC') >= 0 && _val[1].indexOf('${NOC') >= 0)) {
                        var a = _val[0].replace('${NOC', '').replace('}', '');
                        var b = _val[1].replace('${NOC', '').replace('}', '');
                        fieldVal = fieldVal ? fieldVal.length : 0;
                        let flag = fieldVal >= a.trim() && fieldVal <= b.trim() ? true : false;
                        return comparator === 'between' ? flag : !flag;//no i18n

                    }
                    let flag = fieldVal >= (typeof _val[0] === 'string' ? _val[0].trim() : _val[0]) && fieldVal <= (typeof _val[1] === 'string' ? _val[1].trim() : _val[1]) ? true : false;
                    return comparator === 'between' ? flag : !flag;//no i18n
                }
                break;
            case 'less_equal':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) <= new Date(_val);
                }
                return Number(fieldVal) <= Number(_val) ? true : false;
            case 'less_than':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) < new Date(_val);
                }
                return Number(fieldVal) < Number(_val) ? true : false;
            case 'greater_equal':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) >= new Date(_val);
                }
                return Number(fieldVal) >= Number(_val) ? true : false;
            case 'greater_than':
                if (_f === true || _f === false) { return _f; }
                if (fieldDataType === 'datetime' || fieldDataType === 'date') {
                    return new Date(fieldVal) > new Date(_val);
                }
                return Number(fieldVal) > Number(_val) ? true : false;
            case 'equal':
            case 'not_equal':
                var eqObj = { fieldVal, _val, comparator, executionType, fieldId, isVR_Subcondition, fieldDataType };
                eqObj.type = typeof _val;
                return this.equalCheckBasedOnType(eqObj);
            case 'starts_with':
            case 'ends_with':
                if (_f === true || _f === false) { return _f; }
                if (_val && typeof _val === "string") {
                    _val = _val ? _val.toLowerCase() : _val;
                    if (fieldVal && typeof fieldVal === "string") {
                        fieldVal = fieldVal.toLowerCase();
                        return comparator === "starts_with" ? fieldVal.startsWith(_val) : fieldVal.endsWith(_val);//no i18n
                    }
                    return false;
                } else if (Array.isArray(_val)) {
                    let _finalBool = _val.some(function (eachItem) {
                        eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                        if (fieldVal && typeof fieldVal === "string") {
                            fieldVal = fieldVal.toLowerCase();
                            return comparator === "starts_with" ? fieldVal.startsWith(eachItem) : fieldVal.endsWith(eachItem);//no i18n
                        }
                        return false;
                    });
                    return _finalBool;
                }
                return false;
            case 'contains':
            case 'not_contains':
                if (_f === true || _f === false) { return _f; }
                //added for handling failure criteria(VR) if v give some values and remove that value from input field
                if (fieldVal === "" && executionType === 'failure') {
                    return true;
                }
                if (executionType === undefined && comparator === 'not_contains' && !fieldVal) {
                    return true;
                }
                if (fieldVal) {
                    if (typeof _val === 'string') {
                        _val = _val ? _val.toLowerCase() : _val;
                        fieldVal = fieldVal ? fieldVal.toLowerCase() : fieldVal;
                        let val = fieldVal.indexOf(_val), dval = val === -1 ? false : true;
                        return comparator === 'contains' ? dval : !dval;//no i18n
                    } else if (Array.isArray(_val) && _val.length) {
                        if (comparator === "not_contains") {
                            var val_arr_len = _val.length, nc_finalBool;
                            for (var c = 0; c < val_arr_len; c++) {
                                var each_item = _val[c];
                                each_item = each_item && typeof each_item === "string" ? each_item.toLowerCase() : each_item;//no i18n
                                if (typeof fieldVal === "string") {
                                    fieldVal = fieldVal.toLowerCase();
                                    let val = fieldVal.indexOf(each_item), dval = val === -1 ? false : true;
                                    if (dval) {
                                        nc_finalBool = true;
                                    }
                                }
                            }
                            return nc_finalBool ? false : true;
                        }
                        let _finalBool = _val.some(function (eachItem) {
                            eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                            if (typeof fieldVal === "string") {
                                fieldVal = fieldVal.toLowerCase();
                                var val = fieldVal.indexOf(eachItem);
                                var dval = val === -1 ? false : true;
                                return comparator === 'contains' ? dval : !dval;//no i18n
                            }
                            return false;
                        });
                        return _finalBool;
                    } else if (typeof _val === 'object' && _val.length) { //no i18n
                        var _flag = _val.indexOf(fieldVal) !== -1;
                        return comparator === 'contains' ? _flag : !_flag;//no i18n
                    }
                }
                return false;
        }
    },
    chkFieldemptyVR: function (customData) {
        var { fieldVal, executionType, isVR_Subcondition } = customData;
        if ((fieldVal === undefined || fieldVal === null) && (executionType && !isVR_Subcondition)) {
            if (executionType !== "failure") {
                return false;
            }
            return true;
        }
    },
    equalCheckBasedOnType: function (customData) {

        function checkIsEmptyOrNot(fieldVal) {
            if (fieldVal === '0' || fieldVal === 0) { //no i18n
                fieldVal = 'notEmpty';//no i18n
            }
            return fieldVal;
        };

        var { fieldVal, type, comparator, executionType, isVR_Subcondition, fieldDataType } = customData;
        var criteriaVal = customData._val;
        if (criteriaVal === '${NOTEMPTY}') { //no i18n
            comparator = 'not_equal'; criteriaVal = '';//no i18n
            fieldVal = fieldVal === '-None-' ? '' : ((fieldVal === undefined || fieldVal === null) ? '' : fieldVal);//no i18n
            fieldVal = checkIsEmptyOrNot(fieldVal);
        } else if (criteriaVal === '${EMPTY}') { //no i18n
            criteriaVal = '';//no i18n
            fieldVal = fieldVal === '-None-' ? '' : ((fieldVal === undefined || fieldVal === null) ? '' : fieldVal);//no i18n
            fieldVal = checkIsEmptyOrNot(fieldVal);
        }

        if (criteriaVal && typeof criteriaVal === "string" && criteriaVal.indexOf('${NOC') >= 0) {
            criteriaVal = criteriaVal.replace('${NOC', '').replace('}', '');
            fieldVal = fieldVal ? fieldVal.length : 0;
        }

        var _f, flag;
        if (executionType) {
            _f = this.chkFieldemptyVR({ fieldVal, executionType, isVR_Subcondition });
            if (fieldDataType === "picklist" && fieldVal === '-None-' && comparator === "not_equal") {
                return false;
            }
        }
        if (_f === true || _f === false) { return _f; }
        switch (type) {
            case 'string':
                flag = (fieldVal && isNaN(fieldVal) ? fieldVal.toString().toLowerCase() : fieldVal) === (criteriaVal && isNaN(fieldVal) ? criteriaVal.toLowerCase() : criteriaVal) ? true : false;
                return comparator === 'equal' ? flag : !flag;//no i18n
            case 'boolean':
            case 'number': {
                let currentFieldVal = fieldVal;
                try {
                    if (type === "number" && typeof fieldVal === "string" && !isNaN(fieldVal)) {
                        currentFieldVal = parseFloat(fieldVal);
                    }
                } catch (e) {
                    currentFieldVal = fieldVal;
                }
                flag = currentFieldVal === criteriaVal ? true : false;
                return comparator === 'equal' ? flag : !flag;//no i18n
            }
            case 'array':
            case 'object':
                var isSatisfied = false;
                criteriaVal.forEach(function (eachItem) {
                    eachItem = eachItem && typeof eachItem === "string" ? eachItem.toLowerCase() : eachItem;//no i18n
                    fieldVal = fieldVal && typeof fieldVal === "string" ? fieldVal.toLowerCase() : fieldVal;//no i18n
                    if (fieldVal && typeof fieldVal === "string") {
                        var dval = eachItem === fieldVal ? true : false;
                        if (dval && !isSatisfied) {
                            isSatisfied = true;
                        }
                    }
                });
                return comparator === 'equal' ? isSatisfied : !isSatisfied;//no i18n
        }
    }
});
Lyte.Mixin.register("crux-create-rules-mixin", {
	processLayoutRules: function () {
		var layoutCompData = this.data.cxPropLayoutComponentData, currentInstObjKey = layoutCompData.currentInstObjKey, currentViewType = layoutCompData.cxInternalUtilityObj.currentViewType;
		var layoutRules = layoutCompData.cxPropLayoutRules,
			currLayout = layoutCompData.cxPropLayoutId,
			layoutSections = layoutCompData.cxPropLayoutSections,
			utilityObj = layoutCompData.cxInternalUtilityObj,
			idvsMetaObj = utilityObj.layoutFieldIdVsMetaObject || {};
		if (layoutRules) {
			layoutRules = layoutRules || [];
			layoutRules.forEach(function (rule) {
				var _id = rule.layout ? (rule.layout.id || rule.layout) : currLayout, haveValidLayout = _id === currLayout;
				if (haveValidLayout) {
					var primFld = rule.primary_field && idvsMetaObj[rule.primary_field.id];
					primFld = primFld && primFld[currentInstObjKey] ? primFld[currentInstObjKey] : undefined;
					if (primFld && primFld.visible && (primFld.view_type[currentViewType] || primFld.isHiddenInLayoutRules)) {
						var methodCustomData1 = { queries: rule.queries, layoutCompData: layoutCompData };
						methodCustomData1.currentInstObjKey = currentInstObjKey; methodCustomData1.currentViewType = currentViewType;
						this.handleOneLayoutrule(methodCustomData1);
					}
				}
			}.bind(this));
			if (layoutSections && layoutSections.length) { //if LR satisfied first and failed later
				layoutSections.forEach(function (sec) {
					if (sec && sec[currentInstObjKey]) {
						delete sec[currentInstObjKey].isValidSectionByLayoutRule;
					}
				}.bind(this));
			}
		}
		//set/reorder tab index
		this.setTabIndexForFields({
			sectionsArray: layoutSections,
			currentInstObjKey,
			layoutComponentData: layoutCompData
		});
	},
	handleOneLayoutrule: function (customData) {
		var layoutCompData = customData.layoutCompData, cxPropFormData = layoutCompData.cxPropFormData, currActions = [], queries = customData.queries || [];
		queries.forEach(function (eachQuery) {
			if (eachQuery.actions && eachQuery.actions.length) {
				currActions.push(eachQuery.actions);
			}
			var methodCustomData1 = { layoutCompData: layoutCompData };
			methodCustomData1.currentInstObjKey = customData.currentInstObjKey; methodCustomData1.currentViewType = customData.currentViewType;
			methodCustomData1.query = eachQuery; methodCustomData1.cxPropFormData = cxPropFormData;
			this.handleOneLayoutruleQuery(methodCustomData1);
		}.bind(this));
		//to revert MandatoryFlags
		var _aclen = currActions && currActions.length ? currActions.length : 0;
		if (_aclen) {
			for (var k1 = 0; k1 < _aclen; k1++) {
				var cAcc = currActions[k1], cAlen = currActions[k1].length;
				for (var k2 = 0; k2 < cAlen; k2++) {
					var intAcc = cAcc[k2];
					if (!this.isEmptyObj(intAcc)) {
						switch (intAcc.type) {
							case 'Mandatory_Fields':
								this.revertValidationFlag({ type: 1, lrFields: intAcc.fields });
								break;
							case 'Show_Fields':
								this.revertValidationFlag({ type: 2, lrFields: intAcc.fields });
								break;
							case 'Show_Sections':
								this.revertHiddenSectionMandatoryFields(intAcc.sections);
								break;
						}
					}
				}
			}
		}
	},
	handleOneLayoutruleQuery: function (customData) {
		var lrQuery = customData.query;
		var criteriaDetails = lrQuery.criteria, methodCustomData1 = { currentInstObjKey: customData.currentInstObjKey, currentViewType: customData.currentViewType, cxPropFormData: customData.cxPropFormData, query: customData.query };
		methodCustomData1.criteriaDetails = criteriaDetails;
		let layoutCompData = customData.layoutCompData;
		methodCustomData1.layoutSections = layoutCompData.cxPropLayoutSections;
		methodCustomData1.cxPropFormData = layoutCompData.cxPropFormData;
		methodCustomData1.currentTimePattern = layoutCompData.cxPropTimeFormat || layoutCompData.currentTimePattern;
		methodCustomData1.currentDatePattern = layoutCompData.cxPropDatePattern || layoutCompData.currentDatePattern;
		methodCustomData1.currentTimeZone = layoutCompData.cxPropTimeZone || layoutCompData.currentTimeZone;
		methodCustomData1.layoutFieldIdVsMetaObject = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.layoutFieldIdVsMetaObject;
		methodCustomData1.formFieldList = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.formFieldList;
		methodCustomData1.userCurrencyDetails = layoutCompData.cxPropUserCurrencyData || {};
		if (lrQuery.actions && lrQuery.actions.length) {
			var ismatching = this.checkCriteriaMatch(methodCustomData1);
			if (ismatching === undefined) {
				ismatching = false;
			}
			methodCustomData1.ismatching = ismatching;
			this.triggerLayoutruleActions(Object.assign({ layoutCompData }, methodCustomData1));
		}
	},
	handleLayoutruleActions: function (customData) {
		var currentFieldInfo = customData.actionField, ismatching = customData.ismatching;
		var currentViewType = customData.layoutCompData.cxInternalUtilityObj.currentViewType, currentInstObjKey = customData.layoutCompData.currentInstObjKey;
		var secFieldMetaDetails = this.getSectionMetaByGivenField({ layoutSections: customData.layoutCompData.cxPropLayoutSections, fieldId: customData.actionField.id });
		var currSectiondata = secFieldMetaDetails.sectionMetaData || {};
		currentFieldInfo = secFieldMetaDetails.fieldMetaData || {};
		var sectionCurrentInstObj = currSectiondata[currentInstObjKey] || {};
		if (!this.isEmptyObj(currentFieldInfo)) {
			var methodCustomData1 = { layoutCompData: customData.layoutCompData, currentViewType: currentViewType, currentInstObjKey: currentInstObjKey };
			methodCustomData1.fieldDetail = currentFieldInfo;
			var fieldCurrentInstObj = currentFieldInfo[currentInstObjKey];
			switch (customData.actionType) {
				case 'Mandatory_Fields':
					if (fieldCurrentInstObj.isMandatoryByDefault) {
						return;
					}
					if (ismatching !== fieldCurrentInstObj.required) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
						if (!fieldCurrentInstObj.read_only && fieldCurrentInstObj.visible &&
							(sectionCurrentInstObj.isvalidSection || !ismatching) &&
							!fieldCurrentInstObj.isCustomMandatory &&
							!fieldCurrentInstObj.MandFldsValidatedAndPassed) {
							fieldCurrentInstObj.MandFldsValidatedAndPassed = ismatching;
							methodCustomData1.mandatoryValue = ismatching;
							methodCustomData1.actionType = 'Mandatory_Fields';//no i18n
							this.toggleMandatoryInFormFieldList(methodCustomData1);
							Lyte.Component.set(fieldCurrentInstObj, 'required', ismatching);//no i18n
							if (!ismatching && !this.isEmptyObj(fieldCurrentInstObj.fieldErrorDetails) && fieldCurrentInstObj.fieldErrorDetails.code === 'ERR02') {
								fieldCurrentInstObj.clearedRecordError = Lyte.deepCopyObject(fieldCurrentInstObj.fieldErrorDetails);
								Lyte.Component.set(fieldCurrentInstObj, 'fieldErrorDetails', {});//no i18n
								Lyte.Component.set(fieldCurrentInstObj, 'observeErrorDetails', !fieldCurrentInstObj.observeErrorDetails);//no i18n
							}
							if (ismatching && !this.isEmptyObj(fieldCurrentInstObj.clearedRecordError)) {
								Lyte.Component.set(fieldCurrentInstObj, 'fieldErrorDetails', fieldCurrentInstObj.clearedRecordError);//no i18n
								Lyte.Component.set(fieldCurrentInstObj, 'observeErrorDetails', !fieldCurrentInstObj.observeErrorDetails);//no i18n
							}
						}
					} else if (ismatching) {
						if (fieldCurrentInstObj.isCustomMandatory) {
							Lyte.Component.set(fieldCurrentInstObj, 'isCustomMandatory', false);//no i18n
						}
						fieldCurrentInstObj.MandFldsValidatedAndPassed = ismatching;
						if (!this.isEmptyObj(fieldCurrentInstObj.clearedRecordError)) {
							Lyte.Component.set(fieldCurrentInstObj, 'fieldErrorDetails', fieldCurrentInstObj.clearedRecordError);//no i18n
							Lyte.Component.set(fieldCurrentInstObj, 'observeErrorDetails', !fieldCurrentInstObj.observeErrorDetails);//no i18n
						}
					}
					break;
				case 'Show_Fields':
					if (ismatching && fieldCurrentInstObj.view_type[currentViewType]) {
						fieldCurrentInstObj.ShowFldsValidatedAndPassed = true;
					}
					if (ismatching !== fieldCurrentInstObj.view_type[currentViewType]) {
						var viewTypeclone = JSON.parse(JSON.stringify(fieldCurrentInstObj.view_type));
						if (ismatching) {
							viewTypeclone[currentViewType] = true;
							fieldCurrentInstObj.isHiddenInLayoutRules = false;
							fieldCurrentInstObj.ShowFldsValidatedAndPassed = true;
							fieldCurrentInstObj.disableLyteViewPortForField = true;
							Lyte.Component.set(fieldCurrentInstObj, 'view_type', viewTypeclone);//no i18n
							if (currentFieldInfo.column_name === "EMAIL" && customData.layoutCompData.cxPropModuleName === "Cases") { //no i18n
								this.checkEmailforCaseOrigin({});
							}
							methodCustomData1.currentFieldApiName = currentFieldInfo.api_name;
							methodCustomData1.sectionData = currSectiondata;
							var haveVFlds = this.haveValidFldsinSection(methodCustomData1);
							if (!sectionCurrentInstObj.isvalidSection && !haveVFlds && !sectionCurrentInstObj.hiddenbyLR && sectionCurrentInstObj.haveValidFields) {
								Lyte.Component.set(sectionCurrentInstObj, 'isvalidSection', true);//no i18n
							}
							methodCustomData1.mandatoryValue = true;
							this.toggleMandatoryInFormFieldList(methodCustomData1);
							customData.layoutCompData.cxInternalUtilityObj.skipMandatoryLR = false;
						} else if (!fieldCurrentInstObj.ShowFldsValidatedAndPassed) {
							viewTypeclone[currentViewType] = false;
							fieldCurrentInstObj.isHiddenInLayoutRules = true;//ZCRM-110845
							Lyte.Component.set(fieldCurrentInstObj, 'view_type', viewTypeclone);//no i18n
							if (currentFieldInfo.column_name === "EMAIL" && customData.layoutCompData.cxPropModuleName === "Cases") { //no i18n
								this.checkEmailforCaseOrigin({});
							}
							if (!currSectiondata.isSubformSection) {
								methodCustomData1.sectionData = currSectiondata;
								this.hideEmptySection(methodCustomData1);//no i18n
							}
							methodCustomData1.mandatoryValue = false;
							this.toggleMandatoryInFormFieldList(methodCustomData1);
							customData.layoutCompData.cxInternalUtilityObj.skipMandatoryLR = true;
						}
					}
			}
		}
	},
	checkEmailforCaseOrigin: function (customData) {
		customData.setDummyValue = true;
	},
	toggleMandatoryInSubformRecord: function (customData) {
		customData.setDummyValue = true;
	},
	haveValidFldsinSection: function (customData) {
		var currSectionfields = customData.sectionData.fields, haveValidFields = false, len = currSectionfields.length;
		let currentInstObjKey = customData.currentInstObjKey;
		for (var l = 0; l < len; l++) {
			let fldInstObj = currSectionfields[l] && currSectionfields[l][currentInstObjKey],
				metaInformation = fldInstObj && Object.keys(fldInstObj).length ? fldInstObj : currSectionfields[l];
			if (metaInformation && metaInformation.visible && metaInformation.view_type[customData.currentViewType]) {
				haveValidFields = currSectionfields[l].api_name !== customData.currentFieldApiName ? true : false;
				customData.sectionData[currentInstObjKey].haveValidFields = true;
			}
		}
		return haveValidFields;
	},
	triggerLayoutruleActions: function (customData) {
		var query = customData.query, layoutSections = customData.layoutCompData.cxPropLayoutSections, ismatching = customData.ismatching;
		if (query.actions) {
			query.actions.forEach(function (action) {
				var methodCustomData1 = { layoutCompData: customData.layoutCompData, ismatching: customData.ismatching };
				switch (action.type) {
					case 'Show_Fields':
					case 'Mandatory_Fields':
						if (action.fields) {
							action.fields.forEach(function (field) {
								methodCustomData1.actionType = action.type; methodCustomData1.action = action;
								methodCustomData1.actionField = field;
								this.handleLayoutruleActions(methodCustomData1);
							}.bind(this));
						}
						break;
					case 'Show_Sections':
						if (action.sections) {
							var lrSectionsDetails = layoutSections.filter(function (sec) {
								if (action.sections.indexOf(sec.name) !== -1) {
									return sec;
								}
							}) || [];
							lrSectionsDetails.forEach(function (lrSection) {
								var lrSectionInstObj = lrSection[customData.currentInstObjKey];
								if (!lrSection.isSubformSection) {
									if (!ismatching && lrSectionInstObj.isValidSectionByLayoutRule) {
										return;
									}
									var lrSecFields = lrSection.fields || [];
									if (ismatching) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
										if (lrSectionInstObj.isvalidSection === false) {
											Lyte.Component.set(lrSectionInstObj, 'isvalidSection', true);//no i18n
										}
									} else {
										Lyte.Component.set(lrSectionInstObj, 'isvalidSection', false);//no i18n
									}
									lrSecFields.forEach(function (sfld) {
										if (sfld.column_name === "EMAIL" && customData.layoutCompData.cxPropModuleName === "Cases") { //no i18n
											this.checkEmailforCaseOrigin({});
										}
										methodCustomData1.fieldDetail = sfld;
										methodCustomData1.mandatoryValue = ismatching;
										this.toggleMandatoryInFormFieldList(methodCustomData1);
									}.bind(this));
									//hide the section if no valid fields are present
									if (ismatching && lrSectionInstObj.haveValidFields === false) {
										Lyte.Component.set(lrSectionInstObj, 'isvalidSection', false);//no i18n
									}
									lrSectionInstObj.isValidSectionByLayoutRule = ismatching ? true : false;
									lrSectionInstObj.hiddenbyLR = ismatching ? false : true;
								}
							}.bind(this));
						}
						break;
					case 'Show_Subforms':
						if (action.subforms) {
							var lrSubSectionsDetails = layoutSections.filter(function (sec) {
								var secInstObj = sec[customData.currentInstObjKey] || {};
								if (action.subforms.indexOf(secInstObj.subform_apiname) !== -1 && sec.isSubformSection) {
									return sec;
								}
							}) || [];
							lrSubSectionsDetails.forEach(function (lrSubSection) {
								var lrSubSectionInstObj = lrSubSection[customData.currentInstObjKey] || {};
								if (!ismatching && lrSubSectionInstObj.isValidSectionByLayoutRule) {
									return;
								}
								if (ismatching) { //eslint-disable-line @zoho/zstandard/proper-usage-of-if
									if (!lrSubSectionInstObj.isvalidSection) {
										Lyte.Component.set(lrSubSectionInstObj, 'isvalidSection', true);//no i18n
									}
								} else {
									Lyte.Component.set(lrSubSectionInstObj, 'isvalidSection', false);//no i18n
								}
								this.toggleMandatoryInSubformRecord({});
								lrSubSectionInstObj.isValidSectionByLayoutRule = ismatching ? true : false;
							}.bind(this));
						}
						break;
				}
			}.bind(this));
		}
	},
	revertHiddenSectionMandatoryFields: function (lr_sections) {
		var layoutCompData = this.data.cxPropLayoutComponentData, currentInstObjKey = layoutCompData.currentInstObjKey, currentViewType = layoutCompData.cxInternalUtilityObj.currentViewType;
		let layoutSections = layoutCompData.cxPropLayoutSections || [], lrSections = lr_sections || [];
		var lrSectionsDetails = layoutSections.filter(function (sec) {
			if (lrSections.indexOf(sec.name) !== -1) {
				return sec;
			}
		}) || [];
		lrSectionsDetails.forEach(function (eachSection) {
			var secflds = eachSection.fields || [];
			secflds.forEach(function (sectionField) {
				var fieldInstanceData = sectionField[currentInstObjKey];
				if (fieldInstanceData && fieldInstanceData.required && (!fieldInstanceData.visible || !fieldInstanceData.view_type[currentViewType] || fieldInstanceData.read_only)) {
					var methodCustomData1 = { layoutCompData: layoutCompData };
					methodCustomData1.fieldDetail = sectionField;
					this.revertMandatoryForHiddenField(methodCustomData1);
				}
			}.bind(this));
		}.bind(this));
	},
	revertValidationFlag: function (customData) {
		var layoutCompData = this.data.cxPropLayoutComponentData, currentInstObjKey = layoutCompData.currentInstObjKey, currentViewType = layoutCompData.cxInternalUtilityObj.currentViewType;
		var type = customData.type, lrFields = customData.lrFields, moduleFields = this.getCurrentLayoutValidFields(layoutCompData.cxInternalUtilityObj) || [], lrFieldsIds = [];
		lrFields.forEach(function (lFld) { lrFieldsIds.push(lFld.id); });
		var lrFieldsMeta = moduleFields.filter(function (mField) {
			if (lrFieldsIds.indexOf(mField.id) !== -1) {
				return mField;
			}
		}) || [];
		var methodCustomData1 = { layoutCompData: layoutCompData, currentViewType: currentViewType, currentInstObjKey: currentInstObjKey };
		lrFieldsMeta.forEach(function (eachLRFieldData) {
			var fldInstObj = eachLRFieldData[currentInstObjKey];
			methodCustomData1.fieldDetail = eachLRFieldData;
			if (fldInstObj.isCurrentFieldHiddenInLR) {
				if (!fldInstObj.ShowFldsValidatedAndPassed) {
					this.handleCurrentFieldInLR(methodCustomData1);
				}
				delete fldInstObj.isCurrentFieldHiddenInLR;
			}
			if (type === 1) {
				fldInstObj.MandFldsValidatedAndPassed = false; delete fldInstObj.clearedRecordError;
			} else {
				fldInstObj.ShowFldsValidatedAndPassed = false;
			}
			if (fldInstObj.required && !(fldInstObj.visible && fldInstObj.view_type[currentViewType] && !fldInstObj.read_only)) {
				this.revertMandatoryForHiddenField(methodCustomData1);
			}
		}.bind(this));
	},
	revertMandatoryForHiddenField: function (customData) {
		var layoutCompData = customData.layoutCompData, currentLRField = customData.fieldDetail, formFieldList = layoutCompData.cxInternalUtilityObj.formFieldList;
		var currentFormFieldList = formFieldList[currentLRField.api_name];
		if (currentFormFieldList && currentFormFieldList.mandatory) {
			currentFormFieldList.mandatory = false;
		}
	},
	handleCurrentFieldInLR: function (customData) {
		var layoutCompData = customData.layoutCompData, currentInstObjKey = customData.currentInstObjKey, currentViewType = customData.currentViewType, currentLRField = customData.fieldDetail, cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		var secFieldMetaDetails = this.getSectionMetaByGivenField({ layoutSections: customData.layoutCompData.cxPropLayoutSections, fieldId: currentLRField.id });
		var sectionData = secFieldMetaDetails.sectionMetaData || {};
		currentLRField = secFieldMetaDetails.fieldMetaData || {};
		var methodCustomData1 = { layoutCompData: layoutCompData, currentViewType: currentViewType, currentInstObjKey: currentInstObjKey };
		methodCustomData1.fieldDetail = currentLRField;
		var currentLRFieldInstObj = currentLRField[currentInstObjKey];
		if (currentLRFieldInstObj) {
			var viewTypeclone = JSON.parse(JSON.stringify(currentLRFieldInstObj.view_type));
			viewTypeclone[currentViewType] = false;
			Lyte.Component.set(currentLRFieldInstObj, 'isHiddenInLayoutRules', true);
			Lyte.Component.set(currentLRFieldInstObj, 'view_type', viewTypeclone);//no i18n
			if (sectionData && !sectionData.isSubformSection) {
				methodCustomData1.sectionData = sectionData;
				this.hideEmptySection(methodCustomData1);
			}
			methodCustomData1.mandatoryValue = false;
			this.toggleMandatoryInFormFieldList(methodCustomData1);
			cxUtilityObj.skipMandatoryLR = true;
		}
	},
	hideEmptySection: function (customData) {
		if (!customData.sectionData) {
			return;
		}
		let currentInstObjKey = customData.currentInstObjKey;
		var currSectionfields = customData.sectionData.fields || [], haveValidF = false, slen = currSectionfields.length;
		var sectionCurntInstObj = customData.sectionData[customData.currentInstObjKey];
		for (var l = 0; l < slen; l++) {
			let fldInstObj = currSectionfields[l] && currSectionfields[l][currentInstObjKey],
				metaInformation = fldInstObj && Object.keys(fldInstObj).length ? fldInstObj : currSectionfields[l];
			if (metaInformation && metaInformation.visible && metaInformation.view_type[customData.currentViewType]) {
				haveValidF = true;
				break;
			}
		}
		if (!haveValidF) {
			Lyte.Component.set(sectionCurntInstObj, 'isvalidSection', false);//no i18n
			Lyte.Component.set(sectionCurntInstObj, 'haveValidFields', false);//no i18n
		}
	},
	toggleMandatoryInFormFieldList: function (customData) {
		var layoutCompData = customData.layoutCompData,
			currentLRField = customData.fieldDetail,
			formFieldList = layoutCompData.cxInternalUtilityObj.formFieldList,
			currentFormField = formFieldList[currentLRField.api_name],
			instanceObjKey = customData.currentInstObjKey || layoutCompData.currentInstObjKey || (layoutCompData.cxInternalUtilityObj.currentInstObjKey),
			fieldInstanceData = currentLRField[instanceObjKey] || currentLRField,
			updateMandatory = (customData.actionType === 'Mandatory_Fields' || (fieldInstanceData.required && fieldInstanceData.visible));//no i18n
		if (currentFormField && updateMandatory) {
			currentFormField.mandatory = customData.mandatoryValue;
		}
		return currentFormField;
	},
	isValidVRFieldForInventory: function (customData) {
		var { moduleName, fldMeta } = customData;
		var isInvModule = this.isInventoryModule(moduleName);
		if (isInvModule && ['DISCOUNT', 'TAX'].indexOf(fldMeta.column_name) !== -1 && !fldMeta.custom_field && !this.isEmptyObj(fldMeta.subform)) { //NO I18N
			return true;
		}
		return false;
	},
	filterValidUITypes: function (customData) {
		var { layoutComponentData } = customData;
		return layoutComponentData.cxPropFormData;
	},
	handleVRFunctionResponse: function (customData = {}) {
		let returnObj = {};
		returnObj.vrErrorArray = customData.vrErrorArray;
		returnObj.functionFieldDetails = customData._funcnArr;
		returnObj.serverResponse = customData.afterPromiseResponse;
		let vrFuncCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onVrFunctionResponse', onVrFunctionResponse: returnObj });//no i18n
		return vrFuncCallBackResponse.then(function (afterPromiseResponse) {
			return afterPromiseResponse;
		}.bind(this));
	},
	handleValidationRuleCondition: function (customData) {
		var { condition, _targetField, rule, _targetFieldid, vrErrorArray, currentInstObjKey, currentViewType, cxPropFormData } = customData;
		var executionType = rule.execution_type, _primCond = condition.primary_condition, layoutCompData = customData.layoutComponentData;
		var methodCustomData1 = { currentInstObjKey, currentViewType, cxPropFormData, executionType };
		methodCustomData1.criteriaDetails = _primCond;
		methodCustomData1.layoutSections = layoutCompData.cxPropLayoutSections;
		methodCustomData1.currentTimePattern = layoutCompData.currentTimePattern;
		methodCustomData1.currentDatePattern = layoutCompData.currentDatePattern;
		methodCustomData1.layoutFieldIdVsMetaObject = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.layoutFieldIdVsMetaObject;
		methodCustomData1.formFieldList = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.formFieldList;
		methodCustomData1.userCurrencyDetails = layoutCompData.cxPropUserCurrencyData || {};
		var isPrimC_matching = this.checkCriteriaMatch(methodCustomData1);
		if (isPrimC_matching === undefined) {
			return;
		}
		if (executionType === "success" && isPrimC_matching) {
			this.handleExecutionType({ condition, _targetField, cxPropFormData, executionType, _targetFieldid, vrErrorArray, currentInstObjKey, currentViewType, layoutCompData });
		}
		else if (executionType === "failure" && !isPrimC_matching) {
			this.handleExecutionType({ condition, _targetField, cxPropFormData, executionType, _targetFieldid, vrErrorArray, currentInstObjKey, currentViewType, layoutCompData });
		}
	},
	handleExecutionType: function (customData) {
		var { condition, _targetField, cxPropFormData, currentInstObjKey, currentViewType, layoutCompData, executionType, _targetFieldid, vrErrorArray } = customData;
		var _l = condition.sub_conditions.length;
		var fld = layoutCompData.cxInternalUtilityObj.layoutFieldIdVsMetaObject[_targetFieldid];
		let valAlertPref = layoutCompData.isVRAlertPreference !== undefined && layoutCompData.isVRAlertPreference;
		if (_l > 0) {
			for (var k = 0; k < _l; k++) {
				var subC = condition.sub_conditions[k];
				var methodCustomData1 = { currentInstObjKey, currentViewType, cxPropFormData, executionType };
				methodCustomData1.criteriaDetails = subC.criteria; methodCustomData1.isVR_Subcondition = true;
				methodCustomData1.layoutSections = layoutCompData.cxPropLayoutSections;
				methodCustomData1.currentTimePattern = layoutCompData.currentTimePattern;
				methodCustomData1.currentDatePattern = layoutCompData.currentDatePattern;
				methodCustomData1.layoutFieldIdVsMetaObject = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.layoutFieldIdVsMetaObject;
				methodCustomData1.formFieldList = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj.formFieldList;
				methodCustomData1.userCurrencyDetails = layoutCompData.cxPropUserCurrencyData || {};
				var flag = this.checkCriteriaMatch(methodCustomData1);
				if (flag) {
					vrErrorArray.push({
						message: subC.alert,
						targetField: _targetField,
						targetFieldId: _targetFieldid,
						targetFieldMeta: fld,
						alert_preference: subC.alert_preference,
						alert_type: subC.alert_type,
						query_id: subC.id
					});
					if (!valAlertPref) {
						fld[currentInstObjKey].isSecVal = true;
						break;
					}
				}
			}
		} else {
			if (!valAlertPref) {
				fld[currentInstObjKey].isSecVal = true;
			}
			vrErrorArray.push({
				message: condition.alert,
				targetField: _targetField,
				targetFieldId: _targetFieldid,
				targetFieldMeta: fld,
				alert_preference: condition.alert_preference,
				alert_type: condition.alert_type,
				query_id: condition.id
			});
		}
	},
	setValidationPreferenceError: function (customData) {
		let { layoutComponentData, valErrorDetails } = customData;
		if (valErrorDetails && Object.keys(valErrorDetails).length && layoutComponentData.isValidationRulePassed) {
			layoutComponentData.isValidationRulePassed = false;
		}
	},
	setValidationError: function (customData) {
		let { message, dontFocus, targetFieldMeta, currentInstObjKey, currentViewType } = customData,
			fldDet = targetFieldMeta || {},
			qKey = fldDet[currentInstObjKey] && fldDet[currentInstObjKey].fieldCompSelectorValue,
			lyteC = $L('crux-create-field' + qKey)[0],//no i18n
			dummyO = {},
			userDetails = typeof Crm !== "undefined" && Crm.userDetails || {};

		dummyO.isError = true;
		dummyO.inFocusNow = !dontFocus; dummyO.isVRError = true;
		dummyO.message = typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(message) : message;//No I18N

		let compDataN = lyteC ? lyteC.component.data : undefined;
		if (fldDet[currentInstObjKey] && fldDet[currentInstObjKey].view_type[currentViewType] &&
			fldDet[currentInstObjKey].visible && !fldDet[currentInstObjKey].read_only) {
			if (compDataN) {
				//added for lyte viewport fix
				if (lyteC && lyteC.getData('lyteViewPort')) {
					lyteC.setData('lyteViewPort', false);//no i18n
				}
				fldDet[currentInstObjKey].fieldErrorDetails = dummyO;
				//eslint-disable-next-line @zoho/zstandard/no-commoncode-in-ifelse
				Lyte.Component.set(fldDet[currentInstObjKey], 'observeErrorDetails', !fldDet[currentInstObjKey].observeErrorDetails);//no i18n
				if (dontFocus) {
					return;
				}
				if (fldDet.data_type === "picklist") {
					var dd_field = lyteC.querySelector('lyte-dropdown');//no i18n
					dd_field = dd_field ? dd_field.querySelector('.lyteDummyEventContainer') : undefined;//no i18n
					if (dd_field) {
						dd_field.focus();
						setTimeout(function () {
							$(dd_field).blur();
						}, 500);
					}
				} else {
					var inp_F = fldDet.data_type === "boolean" ? lyteC.querySelector('lyte-checkbox') : lyteC.querySelector('lyte-input');//no i18n
					if (inp_F) {
						inp_F.focus();
					} else if (userDetails.isPhoneNoNewView && fldDet.data_type === "phone") { //no i18n
						lyteC.querySelector('input').focus();//no i18n
					}
				}
			} else {
				fldDet[currentInstObjKey].fieldErrorDetails = dummyO;
				//eslint-disable-next-line @zoho/zstandard/no-commoncode-in-ifelse
				Lyte.Component.set(fldDet[currentInstObjKey], 'observeErrorDetails', !fldDet[currentInstObjKey].observeErrorDetails);//no i18n
			}
		}
	},
	processValidationRules: function (customData) {
		var vrErrorArray = [], _this = this, { callbackFunc } = customData;
		var layoutComponentData = this.data.cxPropLayoutComponentData, currentInstObjKey = layoutComponentData.currentInstObjKey, dontFocus = customData.dontFocus;
		var _vRules = customData.hasOwnProperty('vrRules') ? (customData.vrRules || []) : (layoutComponentData.cxPropValidationRules || []),
			layoutSections = layoutComponentData.cxPropLayoutSections,
			utilityObj = layoutComponentData.cxInternalUtilityObj,
			idvsMetaObj = utilityObj.layoutFieldIdVsMetaObject || {};
		var currentViewType = layoutComponentData.cxInternalUtilityObj.currentViewType, currentLayout = layoutComponentData.cxPropLayoutId, cxPropFormData = layoutComponentData.cxPropFormData;
		layoutComponentData.isValidationRulePassed = false;

		function vrErrorCallbackFunction(fRes) {
			let valAlertPref = layoutComponentData.isVRAlertPreference !== undefined && layoutComponentData.isVRAlertPreference,
				valErrorDetails = {}, fieldIds = [];
			if (vrErrorArray.length !== 0) {
				layoutComponentData.isValidationRulePassed = true;
				vrErrorArray.forEach(function (errorObj) {
					if (valAlertPref) {
						let alertShow = [];
						alertShow.push(errorObj);
						if (valErrorDetails && valErrorDetails.hasOwnProperty(errorObj.targetFieldId)) {
							alertShow = valErrorDetails[errorObj.targetFieldId];
							alertShow.push(errorObj);
							valErrorDetails[errorObj.targetFieldId] = alertShow;
						} else {
							fieldIds.push(errorObj.targetFieldId);
							Lyte.objectUtils(valErrorDetails, "add", errorObj.targetFieldId, alertShow);//NO I18N
						}
					} else {
						let detailsObj = {
							message: errorObj.message,
							_targetField: errorObj.targetField,
							_targetFieldid: errorObj.targetFieldId,
							targetFieldMeta: errorObj.targetFieldMeta || idvsMetaObj[errorObj.targetFieldId],
							dontFocus,
							layoutComponentData,
							cxPropFormData,
							currentInstObjKey,
							currentViewType
						}
						_this.setValidationError(detailsObj);
					}
				});
				if (valAlertPref) {
					let detailsObj = {
						valErrorDetails,
						fieldIds,
						dontFocus,
						layoutComponentData,
						cxPropFormData,
						currentInstObjKey,
						currentViewType
					};
					_this.setValidationPreferenceError(detailsObj);
				}
			}
			callbackFunc({ fRes, valErrorDetails });
		}

		if (_vRules) {
			var _vrExeCount = 0;
			var _vrFun = _vRules.filter(function (vr) {
				var _id = vr.layout.id ? vr.layout.id : vr.layout;
				return currentLayout === _id && vr.active && vr.validation_type === "function";//no i18n
			});
			var _vrCrit = _vRules.filter(function (vr) {
				var _id = vr.layout.id ? vr.layout.id : vr.layout;
				return currentLayout === _id && vr.active && vr.validation_type === "criteria";//no i18n
			});
			if (_vrCrit.length + _vrFun.length) {
				var _funcnArr = [], validFun = 0;
				_vrFun.forEach(function (fnRl) {
					var _apiN = fnRl.field.api_name,
						curr_Fld = fnRl.field && idvsMetaObj[fnRl.field.id];
					if (!curr_Fld) {
						return;
					}
					if (curr_Fld[currentInstObjKey].fieldErrorDetails) {
						curr_Fld[currentInstObjKey].fieldErrorDetails = {};
					}
					if (curr_Fld[currentInstObjKey].aggerrorDetails) {
						curr_Fld[currentInstObjKey].aggerrorDetails = {};
					}
					var isValidVRField = _this.getSectionVisiblity({ fieldMeta: curr_Fld, layoutSections: layoutSections, currentInstObjKey: currentInstObjKey });
					var isValidVRFieldForInventory = curr_Fld ? _this.isValidVRFieldForInventory({ moduleName: layoutComponentData.cxPropModuleName, fldMeta: curr_Fld }) : false;//no i18n
					if (curr_Fld && isValidVRField && curr_Fld[currentInstObjKey].visible && curr_Fld[currentInstObjKey].view_type[currentViewType] && (!curr_Fld[currentInstObjKey].read_only || isValidVRFieldForInventory)) {
						++validFun;
						var _finObject = {}; _finObject.column_name = curr_Fld.column_name; _finObject.uitype = curr_Fld.ui_type;
						_finObject.value = cxPropFormData[_apiN] === "" || cxPropFormData[_apiN] === undefined ? "" : cxPropFormData[_apiN] + "";
						_finObject.api_name = curr_Fld.api_name; _finObject.field_label = curr_Fld.field_label;
						_finObject.id = fnRl.associated_function.id; _finObject._targetFieldid = curr_Fld.id;
						_finObject.record = _this.filterValidUITypes({ layoutComponentData });//no i18n
						if (_finObject.value && [24, 14, 30, 202, 333, 786].indexOf(_finObject.uitype) !== -1) {
							_finObject.value = _finObject.record[_finObject.api_name];
						}
						_funcnArr.push(_finObject);
					}
				});
				var validTotalLen = validFun + _vrCrit.length;
				if (validFun) {
					var vrFuncCallBackResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'executeVrFunction', executeVrFunction: { jsonData: _funcnArr } });//no i18n
					vrFuncCallBackResponse.then(async (afterPromiseResponse) => {
						_vrExeCount += validFun;
						if (afterPromiseResponse === false && (validTotalLen === _vrExeCount)) {
							vrErrorCallbackFunction();
						} else {
							let vrResponse;
							if (afterPromiseResponse && (afterPromiseResponse.functions || (afterPromiseResponse.success && afterPromiseResponse.success.functions))) {
								vrResponse = await _this.handleVRFunctionResponse({ layoutComponentData, afterPromiseResponse, _funcnArr, vrErrorArray, dontFocus }); //no i18n
								if (vrResponse && vrResponse.vrPassed) {
									layoutComponentData.isValidationRulePassed = true;
								}
							}
							if (validTotalLen === _vrExeCount) {
								vrErrorCallbackFunction();
							}
						}
					});
				}
				_vrCrit.forEach(function (rule) {
					var _targetField, _targetFieldid;
					if (rule.field) {
						_targetField = rule.field.api_name;
						_targetFieldid = rule.field.id;
						var curr_Fld = _targetFieldid && idvsMetaObj[_targetFieldid];
						if (!curr_Fld) {
							++_vrExeCount;
							if (validTotalLen === _vrExeCount) {
								vrErrorCallbackFunction();
							}
							return;
						}
						delete curr_Fld[currentInstObjKey].isSecVal;
						if (curr_Fld[currentInstObjKey].fieldErrorDetails) {
							curr_Fld[currentInstObjKey].fieldErrorDetails = {};
						}
						if (curr_Fld[currentInstObjKey].aggerrorDetails) {
							curr_Fld[currentInstObjKey].aggerrorDetails = {};
						}
						var isValidVRField = _this.getSectionVisiblity({ fieldMeta: curr_Fld, layoutSections: layoutSections, currentInstObjKey: currentInstObjKey });
						var isValidVRFieldForInventory = _this.isValidVRFieldForInventory({ moduleName: layoutComponentData.cxPropModuleName, fldMeta: curr_Fld });//no i18n
						if (curr_Fld && isValidVRField && curr_Fld[currentInstObjKey].visible && (!curr_Fld[currentInstObjKey].read_only || isValidVRFieldForInventory) && curr_Fld[currentInstObjKey].view_type[currentViewType] && rule.conditions) {
							rule.conditions.forEach(function (condition) {
								if (!curr_Fld[currentInstObjKey].isSecVal) {
									_this.handleValidationRuleCondition({ condition, _targetField, rule, _targetFieldid, vrErrorArray, layoutComponentData, cxPropFormData, currentInstObjKey, currentViewType });
								}
							});
						}
					}
					++_vrExeCount;
					if (validTotalLen === _vrExeCount) {
						vrErrorCallbackFunction();
					}
				});
				if (validFun === 0 && _vrCrit.length === 0) {
					vrErrorCallbackFunction();
				}
			} else {
				vrErrorCallbackFunction();
			}
		} else {
			vrErrorCallbackFunction();
		}
	},
	getSectionVisiblity: function (customData) {
		var { fieldMeta, layoutSections, currentInstObjKey } = customData, isVisible = false;
		layoutSections = layoutSections || [];
		let layoutSecLen = layoutSections.length;
		for (var k1 = 0; k1 < layoutSecLen; k1++) {
			if (isVisible) { break; }
			var currSec = layoutSections[k1], secInstObj = currSec[currentInstObjKey] || {};
			if (secInstObj.type === "used" && currSec.fields) {
				var currSecFields = currSec.fields || [], currSecFldLen = currSecFields.length;
				for (var k2 = 0; k2 < currSecFldLen; k2++) {
					var currSecFld = currSecFields[k2];
					if (currSecFld.id === fieldMeta.id) {
						isVisible = currSec[currentInstObjKey].isvalidSection ? true : false;
						break;
					}
				}
			}
		}
		return isVisible;
	}
});
Lyte.Mixin.register("crux-create-validators-mixin", {
    emailRegex: /^[\p{L}\p{M}\p{N}_]([\p{L}\p{M}\p{N}!#$%&'*+\-/=?^_`{|}~.]*)@(?=.{4,256}$)(([\p{L}\p{N}\p{M}]+)(([-_]*[\p{L}\p{M}\p{N}])*)[.])+[\p{L}\p{M}]{2,22}$/,  //No I18N
    emailRegexOfUser: /^[\w](['A-Za-z0-9._%\-+]*@[A-Za-z0-9-]+(\.[a-zA-Z0-9-]{1,30}){0,9}\.[a-zA-Z]{2,22})$/,
    cxFormTwitteridValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.isValidTwitter(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormEmailValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.cxFormIsValidEmail(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormIsValidEmail: function (emailId) {
        if (emailId == "") {
            return true;
        } else if (emailId == undefined) {
            return false;
        }
        var objRegExp = new XRegExp(this.emailRegex.source, "i");//No I18N
        return XRegExp.test(emailId.trim(), objRegExp);
    },
    cxFormWebsiteValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue && fieldValue.trim()) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            isValid = this.isValidWebUrl(fieldValue.trim());
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormPhonenumValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps) {
                if (!this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                    return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
                }
                isValid = this.isValidPhoneNo(fieldValue, fieldListProps.fieldLength);
                return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
            }
        }
        return true;
    },
    cxFormDecimalValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var isValidDecimal = this.isValidDecimal(fieldValue);
            if (!isValidDecimal) {
                return { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
            }
            var fieldListProps = customData.fieldProperties;
            if (!this.cxFormHaveValidLength(fieldListProps, fieldValue, true)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            if (fieldListProps) {
                isValid = this.decimalLengthCheck(fieldValue, { decimal_place: fieldListProps.decimalPlace });
                return isValid ? isValid : { code: "ERR04", message: Lyte.errorCodes.ERR04, allowedDecimal: fieldListProps.decimalPlace, fieldValue: fieldValue };//no i18n
            }
        }
        return true;
    },
    cxFormPicklistValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue;
        var fieldListProps = customData.fieldProperties;
        if (fieldListProps
            && fieldListProps.mandatory && fieldValue == "-None-") {
            return { code: "ERR02", message: Lyte.errorCodes.ERR02 };//no i18n
        }
        return true;
    },
    cxFormEmptyValueValidation: function (customData) {
        var fieldListProps = customData.fieldProperties; customData = customData || {};
        var fieldName = customData.fieldName, fieldValue = customData.fieldValue;
        if (fieldListProps.mandatory) {
            //survey integration special handling
            if (['Native__Survey__Extn__Survey', 'Native__Survey__Extn__Survey_Department', 'Native__Survey__Extn__Survey_Type'].indexOf(fieldName) !== -1 && (!fieldValue || fieldValue === 'zsurvey___crm__SYSTEM__NONE')) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            }
            if (fieldValue && typeof fieldValue == 'object' && this.isEmptyObj(fieldValue)) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else if (fieldValue && typeof fieldValue == 'string' && !fieldValue.trim()) { //no i18n
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else if (fieldValue && typeof fieldValue == 'string' && fieldListProps.fieldDataType === "multiselectpicklist" && //no i18n
                (fieldValue.indexOf('[') != -1 && fieldValue.indexOf('; ') == -1) && !JSON.parse(fieldValue).length) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02, value: fieldValue };//no i18n
            } else {
                if (fieldValue && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) { //ZCRM-123887
                    return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
                }
                return true;
            }
        }
        return true;
    },
    cxFormIntegerValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue, isValid = false;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (!this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
            if (fieldListProps.columnName === "PROBABILITY" && !(fieldValue >= 0 && fieldValue <= 100)) {
                return { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n	
            }
            isValid = this.isValidInteger(String(fieldValue));
            return isValid ? isValid : { code: "ERR03", message: Lyte.errorCodes.ERR03 };//no i18n
        }
        return true;
    },
    cxFormBasicFieldLengthValidator: function (customData) {
        customData = customData || {};
        var fieldName = customData.fieldName, fieldValue = customData.fieldValue;
        if (fieldValue) {
            var fieldListProps = customData.fieldProperties;
            if (fieldListProps && (["string", "double", "integer"].indexOf(fieldListProps.lyteAtrrType) !== -1) && !this.cxFormHaveValidLength(fieldListProps, fieldValue)) {
                return { code: "ERR06", message: Lyte.errorCodes.ERR06 };//no i18n
            }
        }
        return true;
    },
    cxFormHaveValidLength: function (fieldListProps, fieldValue, skipDot) {
        if (fieldListProps && fieldListProps.fieldLength) {
            fieldValue = Array.isArray(fieldValue) ? fieldValue : fieldValue + '';
            var valLen = fieldValue.length;
            if (skipDot && fieldValue.indexOf(".") !== -1) {
                valLen = valLen ? --valLen : valLen;
            }
            return valLen <= fieldListProps.fieldLength ? true : false;
        }
        return true;
    },
    cxFormFileUploadValidation: function (customData) {
        customData = customData || {};
        var fieldValue = customData.fieldValue;
        var fieldListProps = customData.fieldProperties;
        if (fieldListProps) {
            var isEmpty = this.isEmptyObj(fieldValue);
            if (!isEmpty) {
                isEmpty = fieldValue.every((obj) => '_delete' in obj) //no i18n
            }
            if (fieldListProps.mandatory && isEmpty) {
                return { code: "ERR02", message: Lyte.errorCodes.ERR02 };//no i18n
            }
        }
        return true;
    },
    registerUtilityMethods: function () {
        this.$node.setFormData = (customData) => {
            this.setFormData(customData);
        };
        this.$node.getFormData = () => {
            return this.getFinalFormData();
        };
        this.$node.getFormDirtyAttributes = () => {
            let layoutCompData = this.data.cxPropLayoutComponentData,
                cxPropFormData = layoutCompData.cxPropFormData,
                cxPropRecordData = this.data.originalLayoutComponentData.cxPropRecordData;
            return this.getCruxFormDirtyAttributes(cxPropFormData, cxPropRecordData);
        };
        this.$node.getSubFormData = (customData) => {
            customData = customData || {};
            return this.getCruxSubFormData(customData);
        };
        this.$node.validateForm = (customData) => {
            customData = customData || {};
            let saveUtilData = { validateCruxCreateForm: true };
            if (!customData.validateCruxSubform) {
                saveUtilData.validateCruxSubform = true;
            }
            if (!customData.validateAndSave) {
                saveUtilData.validateAndSave = false;
            }
            saveUtilData = Object.assign(saveUtilData, customData);
            return this.validateAndSaveForm(saveUtilData);
        };
        this.$node.validateSubform = (customData) => {
            customData = customData || {};
            return this.validateCruxSubformData(customData);
        };
        this.$node.destroyComponent = () => {
            this.destroyComponent(this.data.cxPropLayoutComponentData);
        };
        this.$node.getContentWrapperClass = () => {
            return this.getContWrapperClass(this.data.cxPropLayoutComponentData);
        };
        this.$node.formUiHandler = (customData = {}) => {
            return this.cxFormUiHandler(customData, this.data.cxPropLayoutComponentData);
        };
        this.$node.getFieldDetails = (mappingKey) => {
            return this.getValidFieldDetails(mappingKey, this.data.cxPropLayoutComponentData);
        };
        this.$node.executeValidationRule = (vrFieldDetail) => {
            return this.executeGivenValidationRules(vrFieldDetail, this.data.cxPropLayoutComponentData);
        };
        this.$node.renderErrorYield = (customData = {}) => {
            return this.setDataAndRenderErrorYield(customData, this.data.cxPropLayoutComponentData);
        };
        this.$node.setFormConfigurations = (customData = {}) => {
            let supportedProperties = ['api_name', 'column_name', 'data_type', 'ui_type', 'id'],
                layoutCompData = this.data.cxPropLayoutComponentData,
                currentInstObjKey = layoutCompData.currentInstObjKey,
                _setFormConfigurations = (fieldMetaDetails, currentPropertyObj) => {
                    let instanceObject = fieldMetaDetails && fieldMetaDetails[currentInstObjKey],
                        formconfigCustomData = {};
                    formconfigCustomData.fieldCurntInstObj = instanceObject;
                    formconfigCustomData.fieldSpecificFormConfigData = currentPropertyObj;
                    formconfigCustomData.cxPropFieldData = fieldMetaDetails;
                    if (fieldMetaDetails) {
                        this.setFormConfigurations(formconfigCustomData, layoutCompData);
                    }
                };
            supportedProperties.forEach(prop => {
                if (customData.hasOwnProperty(prop)) {
                    let currentPropertyObj = customData[prop] || {},
                        correspondingMapKey = {
                            api_name: 'layoutFieldApiVsMetaObject',
                            column_name: 'layoutFieldColumnNameVsMetaObject',
                            id: 'layoutFieldIdVsMetaObject',
                            data_type: 'layoutFieldDatatypeVsMetaObject',
                            ui_type: 'layoutFieldUitypeVsMetaObject'
                        },
                        currentMapKey = correspondingMapKey[prop],
                        metaDetails = layoutCompData.cxInternalUtilityObj && layoutCompData.cxInternalUtilityObj[currentMapKey] || {};
                    if (['api_name', 'column_name', 'id'].indexOf(prop) !== -1) {
                        for (let eachPropKey in currentPropertyObj) {
                            let fieldMetaDetails = metaDetails[eachPropKey];
                            _setFormConfigurations(fieldMetaDetails, currentPropertyObj[eachPropKey]);
                        }
                    } else if (['data_type', 'ui_type'].indexOf(prop) !== -1) {
                        for (let eachPropKey in currentPropertyObj) {
                            let allFieldMetaDetails = metaDetails[eachPropKey];
                            if (allFieldMetaDetails && Array.isArray(allFieldMetaDetails) && allFieldMetaDetails.length) {
                                allFieldMetaDetails.forEach(fieldMetaDetails => {
                                    _setFormConfigurations(fieldMetaDetails, currentPropertyObj[eachPropKey]);
                                });
                            }
                        }
                    }
                }
            });
        };
    }
});

Lyte.Mixin.register("crux-create-formcallbacks-mixin", {
    onFormAfterSave: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    },
    onFormCancel: function (layoutCompData, subformDetails = {}, customData) {
        if (customData && customData.layoutComponentData) {
            layoutCompData = customData.layoutComponentData;
        }
        layoutCompData.layoutComponentDomNode.destroyComponent();
        this.lookupCallBackHandler(customData, subformDetails);
    }
});
Lyte.Mixin.register("crux-create-ui-handler-utils", {
    // customData: {
    //     component_type: 'button',
    //     component_details: {
    //         type: 'Click',
    //         details: {
    //             buttonName: 'Save'
    //         }
    //     }
    // },
    // customData: {
    //     component_type: 'field',
    //     component_details: {
    //         type: 'Read',
    //         details: {
    //             field_name: 'Email'
    //         }
    //     }
    // },
    // $L('crux-createform')[0].formUiHandler({
    //     component_type: 'field',
    //     component_details: {
    //         type: 'Info',
    //         details: {
    //             field_name: 'Website',
    //             field_data: 'ToolTip set via cscript..cscript..cscript'
    //         }
    //     }
    // })
    cxFormUiHandler: function (customData, layoutComponentData) {
        customData = customData || {};
        switch (customData.component_type) {
            case 'button': {
                return this.buttonComponentHandler(customData, { layoutComponentData });
            }
            case 'field': {
                return this.fieldComponentHandler(customData, { layoutComponentData });
            }
        }
    },
    buttonComponentHandler: function (customData, otherData = {}) {
        let actionDetails = customData.component_details || {},
            { layoutComponentData } = otherData,
            givenButtonDetails = actionDetails.details,
            formButtons = layoutComponentData.cxInternalUtilityObj.cxPropButtons,
            currentInstObjKey = layoutComponentData.currentInstObjKey,
            formButtonDetails = formButtons.filter(btn => { return btn.name === givenButtonDetails.name; })[0];
        switch (actionDetails.type) {
            case 'Click': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.click();
                    }
                }
                break;
            }
            case 'Enable': {
                if (formButtonDetails) {
                    Lyte.objectUtils(formButtonDetails, "add", "disabled", false);//no i18n
                }
                break;
            }
            case 'Disable': {
                if (formButtonDetails) {
                    Lyte.objectUtils(formButtonDetails, "add", "disabled", true);//no i18n
                }
                break;
            }
            case 'Show': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.classList.remove('vH');
                    }
                }
                break;
            }
            case 'Hide': {
                if (formButtonDetails) {
                    let buttonNode = $L(`.${formButtonDetails.id}${currentInstObjKey}`)[0];
                    if (buttonNode) {
                        buttonNode.classList.add('vH');
                    }
                }
                break;
            }
            case 'SetValue': {
                if (formButtonDetails && givenButtonDetails.data) {
                    Lyte.objectUtils(formButtonDetails, "add", "label", givenButtonDetails.data);//no i18n
                }
                break;
            }
            case 'GetValue': {
                if (formButtonDetails) {
                    return formButtonDetails.label;
                }
                break;
            }
            case 'GetAll': {
                if (formButtons && formButtons.length) {
                    return formButtons.map((button) => {
                        if (['cancel', 'saveAndNew', 'save'].includes(button.name)) {
                            return { api_name: button.name, type: 'system' };
                        }
                    });
                }
                break;
            }
        }
    },
    fieldComponentHandler: function (customData, otherData = {}) {
        let componentDetails = customData.component_details || {},
            { layoutComponentData } = otherData,
            givenfieldDetails = componentDetails.details,
            currentInstObjKey = layoutComponentData.currentInstObjKey;

        let fieldMetaInfo = layoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject[givenfieldDetails.name];
        if (!fieldMetaInfo) {
            return { error: `no such field present - ${givenfieldDetails.name}` };
        }
        const { ui_type, api_name } = fieldMetaInfo;
        let formFieldList = layoutComponentData.cxInternalUtilityObj.formFieldList,
            current_formFieldList = formFieldList[api_name];

        if (componentDetails.type === 'setRequired') {
            if (typeof givenfieldDetails.data === "string") {
                givenfieldDetails.data = givenfieldDetails.data === "true";
            }
            componentDetails.type = givenfieldDetails.data ? "Mandate" : "UnMandate";//no i18n
        }
        switch (componentDetails.type) {
            case 'Read': {
                if (layoutComponentData.layoutComponentDomNode) {
                    let fldValue = layoutComponentData.layoutComponentDomNode.getFormData()[givenfieldDetails.name];
                    return fldValue === undefined ? null : fldValue;
                }
                break;
            }
            case 'Write': {
                if (layoutComponentData.layoutComponentDomNode) {
                    let apiName = givenfieldDetails.name, finalObj = {};
                    finalObj[apiName] = givenfieldDetails.data;
                    layoutComponentData.layoutComponentDomNode.setFormData(finalObj);
                }
                break;
            }
            case 'SetCriteria': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'SetSuggestions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'GetSuggestions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'GetOptions': {
                if ([2, 100, 26].includes(ui_type)) {
                    let plValues = fieldMetaInfo[currentInstObjKey].pick_list_values || fieldMetaInfo.pick_list_values;
                    const current_options = new Set(plValues.map(option => option.id));
                    let validOptions = fieldMetaInfo[currentInstObjKey].originalPickListValues || fieldMetaInfo.pick_list_values;
                    return validOptions.map(({ id, display_value, actual_value }) => ({ ...(actual_value !== '-None-' && { id, filtered: !current_options.has(id) }), display_value, actual_value })); // no i18n
                }
                return { error: 'action supported only for picklist and multiselect picklist fields' };//no i18n
            }
            case 'SetOptions': {
                return { error: 'action yet to be supported' };//no i18n
            }
            case 'Error': {
                let errObj = {
                    code: "ERR02",//no i18n
                    isError: true,
                    message: typeof $ESAPI !== "undefined" ? $ESAPI.encoder().encodeForHTML(givenfieldDetails.data) : givenfieldDetails.data,//No I18N
                    isCustomError: true,
                    ignoreActualErrorMessage: true
                };
                fieldMetaInfo[currentInstObjKey].fieldErrorDetails = errObj;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                break;
            }
            case 'Mandate': {
                if (current_formFieldList && !current_formFieldList.mandatory) {
                    fieldMetaInfo[currentInstObjKey].isCustomMandatory = true;
                    current_formFieldList.mandatory = true;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'required', true);//no i18n
                    if (!Array.isArray(current_formFieldList.validation)) {
                        current_formFieldList.validation = [];
                    }
                    current_formFieldList.validation.push('cxFormEmptyValueValidation');//no i18n
                    if (fieldMetaInfo.data_type === 'picklist') {
                        current_formFieldList.validation.push('cxFormPicklistValidation');//no i18n
                    }
                }
                break;
            }
            case 'UnMandate': {
                if (current_formFieldList && fieldMetaInfo[currentInstObjKey].isCustomMandatory && (fieldMetaInfo[currentInstObjKey].required || current_formFieldList.mandatory)) {
                    fieldMetaInfo[currentInstObjKey].isCustomMandatory = false;
                    current_formFieldList.mandatory = false;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'required', false);//no i18n
                    fieldMetaInfo[currentInstObjKey].fieldErrorDetails = {};
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                }
                break;
            }
            case 'MaxLength': {
                if (current_formFieldList) {
                    if (fieldMetaInfo.data_type === "fileupload" || fieldMetaInfo.data_type === "imageupload") {
                        return { error: 'unsupported action for fileupload/imageupload fields' };//no i18n
                    }
                    current_formFieldList.fieldLength = givenfieldDetails.data;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'length', givenfieldDetails.data);//no i18n
                }
                break;
            }
            case 'ReadOnly': {
                if (!fieldMetaInfo[currentInstObjKey].isReadonlyByDefault) {
                    if (typeof givenfieldDetails.data === "string") {
                        givenfieldDetails.data = givenfieldDetails.data === "true";
                    }
                    fieldMetaInfo[currentInstObjKey].isCustomReadOnly = givenfieldDetails.data;
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'read_only', givenfieldDetails.data);//no i18n
                }
                break;
            }
            case 'Visibility': {
                let value = !!givenfieldDetails.data;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'isCustomHidden', !value);//no i18n
                if (value && !this.isEmptyObj(fieldMetaInfo[currentInstObjKey].fieldErrorDetails)) {
                    fieldMetaInfo[currentInstObjKey].fieldErrorDetails = {};
                    Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'observeErrorDetails', !fieldMetaInfo[currentInstObjKey].observeErrorDetails);//no i18n
                }
                break;
            }
            case 'Info': {
                let ttValue = givenfieldDetails.data === null ? null : { // no i18n
                    name: "Info Icon", // no i18n
                    value: `${givenfieldDetails.data}`
                };
                fieldMetaInfo[currentInstObjKey].tooltip = ttValue;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'setTooltipValue', !fieldMetaInfo[currentInstObjKey].setTooltipValue);//no i18n
                break;
            }
            case 'ToolTip': {
                let ttValue = givenfieldDetails.data === null ? null : { // no i18n
                    name: "Static Text", // no i18n
                    value: `${givenfieldDetails.data}`
                };
                fieldMetaInfo[currentInstObjKey].tooltip = ttValue;
                fieldMetaInfo[currentInstObjKey].ignorePlaceholderValue = givenfieldDetails.ignorePlaceholderValue;
                Lyte.Component.set(fieldMetaInfo[currentInstObjKey], 'setTooltipValue', !fieldMetaInfo[currentInstObjKey].setTooltipValue);//no i18n
                delete fieldMetaInfo[currentInstObjKey].ignorePlaceholderValue;
                break;
            }
        }
    }
});
Lyte.Component.register("crux-createform", {
_template:"<template tag-name=\"crux-createform\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.showCommonMessage}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.isSuccessMessage}}\"><template case=\"true\"> <div class=\"cxSuccessMessageWrapper\"> <span class=\"cxSuccessTickIcon\"></span> <div class=\"cxSuccessMsgTextWrap\"> <span class=\"cxSuccessHeaderMsg\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.successMessageInfo.headerMessage}}</span> <span class=\"cxSuccessRecordName\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.successMessageInfo.recordName}}</span> </div> <lyte-button lt-prop-appearance=\"primary\" class=\"cxSuccessViewRecordBtn\" data-zcqa=\"btn_viewRecord\" onclick=\"{{action('viewRecord',cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData)}}\"> <template is=\"registerYield\" yield-name=\"text\">View Record <span class=\"cxSuccessViewRecordArwIcon\"></span></template> </lyte-button> </div> </template><template case=\"false\"> <div class=\"cxErrorMessageWrapper\"> <span class=\"cxErrorAlertIcon\"></span> <span class=\"cxErrorMsgText\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.message}}</span> </div> </template></template> </template><template case=\"false\"> <div class=\"{{parentDivClass}}\"> <template value=\"{{cxPropRenderMode}}\" is=\"switch\">    <template case=\"outlet\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-header cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> <crux-create-layout-content cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> <crux-create-layout-footer cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </form> </div> </template><template case=\"modal\"> <lyte-modal id=\"cruxCreateFormModal{{cxPropLayoutComponentData.currentInstObjKey}}\" lt-prop=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.cxPropModalProperties}}\" on-before-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnBeforeShow&quot;,true)}}\" on-resize=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnResize&quot;,true)}}\" on-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnClose&quot;,true)}}\" on-before-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnBeforeClose&quot;,true)}}\" on-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;modalOnShow&quot;,true)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> <crux-create-layout-header instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> </lyte-modal-header> <lyte-modal-content class=\"cxCreateFormModalContent\"> <crux-form-component id=\"cxQuickCreateFormComp\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-content instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> </form> </div> </crux-form-component> </lyte-modal-content> <lyte-modal-footer class=\"cxCreateFormModalFooter\"> <crux-create-layout-footer instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </lyte-modal-footer> </template> </lyte-modal> </template><template case=\"popover\"> <lyte-popover id=\"cruxCreateFormPopover{{cxPropLayoutComponentData.currentInstObjKey}}\" lt-prop=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.cxPropPopoverProperties}}\" on-position-change=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnPositionChange&quot;,false)}}\" on-scroll=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnScroll&quot;,false)}}\" on-resize=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnResize&quot;,false)}}\" on-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnClose&quot;,false)}}\" on-before-close=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnBeforeClose&quot;,false)}}\" on-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnShow&quot;,false)}}\" on-before-show=\"{{method(&quot;ltPopoverModalCallBack&quot;,&quot;popoverOnBeforeShow&quot;,false)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-header> <crux-create-layout-header instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-header> </lyte-popover-header> <lyte-popover-content class=\"cxCreateFormPopoverContent\"> <div class=\"cruxFormComponent cruxCreateFormComponent\"> <form onclick=\"{{action('cruxFormOnClick',event)}}\" method=\"POST\" onsubmit=\"{{action('cruxFormOnSubmit',event)}}\"> <input type=\"submit\" style=\"left: -2000px;position: absolute;visibility: hidden;\"> <crux-create-layout-content instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" is-subform=\"{{isSubform}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-content> </form> </div> </lyte-popover-content> <lyte-popover-footer> <crux-create-layout-footer instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-render-mode=\"{{cxPropRenderMode}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" yield-layout-global-data=\"{{yieldLayoutGlobalData}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutYield\"> <lyte-yield yield-name=\"{{ydPropActualYieldName}}\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-layout-global-data=\"{{yieldLayoutGlobalData}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-layout-footer> </lyte-popover-footer> </template> </lyte-popover> </template></template> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"outlet":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,3]},{"type":"registerYield","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"registerYield","position":[1,1,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,5]},{"type":"attr","position":[1,1,7]},{"type":"registerYield","position":[1,1,7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1,7]}]},"modal":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,1,3]},{"type":"registerYield","position":[3,1,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]},"popover":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"registerYield","position":[3,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3,1,1,3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropRenderMode","cxPropModuleId","cxPropRecordId","cxPropRecordData","cxPropCurrentPage","cxPropLayoutId","cxPropOutletValue","cxPropLayoutData","cxPropModuleData","cxPropLayoutSections","moduleCurntInstObj","cxPropFormData","cxPropOtherData","yieldLayoutGlobalData","showLoading","cxPropLayoutRulesRequired","cxPropValidationRulesRequired","cxPropEntityRecord"],
_observedAttributesType :["object","string","string","string","string","object","string","string","string","object","object","array","object","object","object","object","boolean","boolean","boolean","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropModuleId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropRecordId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropRecordData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropCurrentPage: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropLayoutId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropOutletValue: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxPropLayoutData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropLayoutSections: Lyte.attr('array', { 'default': [] }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropOtherData: Lyte.attr('object', { 'default': {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} }), //no i18n
			showLoading: Lyte.attr("boolean", { "default": true }), //no i18n
			cxPropLayoutRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropValidationRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
			cxPropEntityRecord: Lyte.attr('object')//no i18n
		}
	},
	emptyLayoutDetails: function (validLayoutProperty) {
		let toEmptyProperties = '';
		if (validLayoutProperty) {
			switch (validLayoutProperty) {
				case 'cxPropLayoutId':
					this.data.cxPropLayoutName = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutData = {};
					toEmptyProperties = "cx-prop-layout-name,cx-prop-layout-sections,cx-prop-layout-data";
					break;
				case 'cxPropLayoutName':
					this.data.cxPropLayoutId = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutData = {};
					toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-data";
					break;
				case 'cxPropLayoutData':
					this.data.cxPropLayoutId = "";
					this.data.cxPropLayoutSections = [];
					this.data.cxPropLayoutName = "";
					toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name";
					break;
			}
		} else {
			this.data.cxPropLayoutId = "";
			this.data.cxPropLayoutName = "";
			this.data.cxPropLayoutSections = [];
			this.data.cxPropLayoutData = {};
			toEmptyProperties = "cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name,cx-prop-layout-data";
		}
		this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
		if (this.getMethods('onBuilderPropertyRemove')) {
			this.executeMethod('onBuilderPropertyRemove', toEmptyProperties.split(','));
		}
	},
	observeLayoutDataAndRefresh: function () {
		this.emptyLayoutDetails('cxPropLayoutData');
		this.reRenderComponent({ cxPropLayoutData: this.data.cxPropLayoutData || {} });
	}.observes('cxPropLayoutData', 'cxPropLayoutData.{}'),
	reRenderComponent: function (customData, isRefresh) {
		this.setData('showLoading', true);
		this.data.cxPropLayoutComponentData = {};
		if (customData.cxPropModuleApiName && !customData.cxPropModuleId) {
			let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: customData.cxPropModuleApiName });
			if (moduleDetails && moduleDetails.moduleId) {
				customData.cxPropModuleId = moduleDetails.moduleId;
			}
		}
		for (var eachDataProp in customData) {
			if (eachDataProp === "cxPropModuleId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				if (!customData.hasOwnProperty('cxPropModuleData')) {
					this.data.cxPropModuleData = {};
					if (this.getMethods('onBuilderPropertyRemove')) {
						this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data']);
					}
				}
				if (!customData.hasOwnProperty('cxPropLayoutId')) {
					this.emptyLayoutDetails();
				}
				this.data.cxPropLayoutRulesRequired = false; this.data.cxPropValidationRulesRequired = false;
			}
			if (eachDataProp === "cxPropLayoutId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				let layoutPropsToEmpty = [];
				if (!customData.hasOwnProperty('cxPropLayoutSections')) {
					this.data.cxPropLayoutSections = [];
					layoutPropsToEmpty.push('cx-prop-layout-sections');
				}
				if (!customData.hasOwnProperty('cxPropLayoutData')) {
					this.data.cxPropLayoutData = {};
					layoutPropsToEmpty.push('cx-prop-layout-data');
				}
				if (!customData.hasOwnProperty('cxPropLayoutName')) {
					this.data.cxPropLayoutName = "";
					layoutPropsToEmpty.push('cx-prop-layout-name');
				}
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', layoutPropsToEmpty);
				}
			}
			if (eachDataProp === "cxPropRecordId" && (!isRefresh || (isRefresh && (customData.reloadAll || this.data[eachDataProp] !== customData[eachDataProp])))) {
				if (!customData.hasOwnProperty('cxPropRecordData')) {
					this.data.cxPropRecordData = {};
				}
				if (!customData.hasOwnProperty('cxPropLayoutId')) {
					this.emptyLayoutDetails();
				}
			}
			if (eachDataProp === 'cxPropMode' && customData[eachDataProp] === 'create') {
				if (!customData.hasOwnProperty('cxPropRecordData')) {
					this.data.cxPropRecordData = {};
				}
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-information-type']);
				}
			}
			this.data[eachDataProp] = customData[eachDataProp];
		}
		if (!customData.hasOwnProperty('cxPropFormData')) {
			this.data.cxPropFormData = {};
		}
		this.initHandler();
	},

	getExposedCXPropertiesList: function () {
		return ['cxPropCurrentPage', 'cxPropModuleData', 'cxPropLayoutRulesRequired', 'cxPropValidationRulesRequired',
			'cxPropRecordData', 'cxPropRecordId', 'cxPropOutletValue',
			'cxPropModuleId', 'cxPropLayoutSections', 'cxPropLayoutData',
			'cxPropLayoutId', 'cxPropFormData'];
	},
	initHandler: function () {
		var layoutCompData = this.data.cxPropLayoutComponentData || {};
		let dataProps = this.getExposedCXPropertiesList();
		dataProps.forEach((dataProps) => {
			if (this.data.hasOwnProperty(dataProps) && !layoutCompData.hasOwnProperty(dataProps)) {
				layoutCompData[dataProps] = this.data[dataProps];
			}
		});
		let otherUserData = this.data.cxPropOtherData || {};
		for (var otherDataProps in otherUserData) {
			layoutCompData[otherDataProps] = otherUserData[otherDataProps];
		}
		if (layoutCompData && !layoutCompData.cxPropRecordId && layoutCompData.cxPropRecordData && layoutCompData.cxPropRecordData.id) {
			layoutCompData.cxPropRecordId = layoutCompData.cxPropRecordData.id;
			if (!this.data.cxPropRecordId) { this.data.cxPropRecordId = layoutCompData.cxPropRecordId; }
		}
		if (!this.isEmptyObj(layoutCompData)) {
			this.data.originalLayoutComponentData = $L.extend(true, {}, layoutCompData);
			layoutCompData.cxInternalUtilityObj = { formFieldList: {}, subformFieldList: {} };
			if (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id && (!layoutCompData.cxPropLayoutId || layoutCompData.cxPropLayoutId !== layoutCompData.cxPropLayoutData.id)) {
				layoutCompData.cxPropLayoutId = layoutCompData.cxPropLayoutData.id;
			}
			if (layoutCompData.cxPropLayoutData && (!layoutCompData.cxPropLayoutSections || !layoutCompData.cxPropLayoutSections.length)) {
				this.data.cxPropLayoutSections = layoutCompData.cxPropLayoutSections = layoutCompData.cxPropLayoutData.sections || [];
			}
			if (!layoutCompData.instanceObjKey && !layoutCompData.cxInternalUtilityObj.instanceObjKey && !this.data.instanceObjKey) {
				let currentInstObjKey = this.getDynamicCurrentInstanceObjKey();
				layoutCompData.instanceObjKey = layoutCompData.cxInternalUtilityObj.currentInstObjKey = currentInstObjKey;
			}
			if (!layoutCompData.hasOwnProperty('cxPropSubformProperties')) {
				layoutCompData.cxPropSubformProperties = {
					isSubformRecordSupported: true,
					cxPropLimitRows: true,
					enableCountryCode: typeof Crm !== "undefined" && Crm.userDetails ? Crm.userDetails.isPhoneNoNewView : false
				};
			}
			if (!layoutCompData.cxPropContentWrapperClass) {
				layoutCompData.cxPropContentWrapperClass = "";
			}
			this.checkAndFetchMetaData(layoutCompData);
			if (this.data.haveAllDefaultMetaData) {
				if (layoutCompData.cxPropModuleData) {
					this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
					layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
					layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
					let layoutDetails = (this.getDefaultLayoutDetails(layoutCompData.cxPropModuleData, layoutCompData.cxPropProfileName, layoutCompData.cxPropLayoutId)) || {};
					if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
						layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
					}
					if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
						layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
					}
				}
				if (layoutCompData.cxPropLayoutSections && layoutCompData.cxPropLayoutSections.length) {
					this.setData('cxPropLayoutSections', layoutCompData.cxPropLayoutSections);
				}
				this.actual_init();
			}
		} else {
			this.setDefautMessageDetails();
			let cxInternalObj = this.data.cxPropLayoutComponentData.cxInternalUtilityObj;
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
			Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", "cxPropLayoutComponentData is empty. It's a mandatory data property to render create form.");//no i18n
		}
	},
	init: function () {
		this.initHandler();
	},
	actual_init: function (moduleResponseData, layoutSectionsData) {
		var layoutCompData = this.data.cxPropLayoutComponentData;
		if (!this.data.cxPropRenderMode) {
			if (this.data.cxPropOtherData && this.data.cxPropOtherData.cxPropRenderMode) {
				this.setData('cxPropRenderMode', this.data.cxPropOtherData.cxPropRenderMode);//no i18n
			} else {
				let cxPropRenderMode = layoutCompData.isQuickCreate ? "modal" : "outlet";//no i18n
				this.setData('cxPropRenderMode', cxPropRenderMode);//no i18n
			}
		}
		var layoutSections = this.data.cxPropLayoutSections || [];
		if (!layoutSections.length) {
			layoutSections = (layoutSectionsData || []);
		}
		var cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		if (layoutCompData.cxPropLayoutSections) {
			let validSections = [];
			if (layoutCompData.isQuickCreate) {
				let qcSec = layoutCompData.cxPropLayoutSections.filter((sec) => {
					return (sec.name === "Quick create" ||
						sec.name === "Quick Create") && sec.generated_type === "default";//no i18n
				})[0];
				if (qcSec) {
					var firstNameField, salututationField;
					qcSec.fields.filter(field => {
						if (field.column_name === "FIRSTNAME") {
							firstNameField = field;
						} else if (field.column_name === "SALUTATION") {
							salututationField = field;
						}
					});
					if (firstNameField && !salututationField) {
						let currentModuleFields = [];
						if (layoutCompData.cxPropModuleData && layoutCompData.cxPropModuleData.fields && layoutCompData.cxPropModuleData.fields.length) {
							currentModuleFields = layoutCompData.cxPropModuleData.fields;
						}
						let fLen = currentModuleFields.length;
						for (let k1 = 0; k1 < fLen; k1++) {
							let currentField = currentModuleFields[k1];
							if (currentField && currentField.column_name === "SALUTATION" && Array.isArray(qcSec.fields)) {
								qcSec.fields.push(currentField);
							}
						}
					}
					validSections.push(qcSec);
					layoutCompData.cxInternalUtilityObj.layoutColumnCount = qcSec.column_count;
				};
			} else {
				let nonQCSections = layoutCompData.cxPropLayoutSections.filter((sec) => {
					return !(sec.generated_type === "default" && (["Quick create", "Quick Create", "Business Card"].includes(sec.name)));//no i18n
				});
				if (nonQCSections) {
					validSections = validSections.concat(nonQCSections);
				};
			}
			if (!layoutCompData.cxInternalUtilityObj.layoutColumnCount && layoutCompData.layoutColumnCount) {
				layoutCompData.cxInternalUtilityObj.layoutColumnCount = layoutCompData.layoutColumnCount;
			}
			layoutCompData.allLayoutSections = layoutCompData.cxPropLayoutSections.slice(0);
			layoutCompData.cxPropLayoutSections = validSections;
			this.setData('cxPropLayoutSections', layoutCompData.cxPropLayoutSections);
			layoutSections = layoutCompData.cxPropLayoutSections;
		}
		if (!cxUtilityObj.hasOwnProperty('defaultUiTypeToCruxMapping')) {
			if (layoutCompData.hasOwnProperty('defaultUiTypeToCruxMapping')) {
				cxUtilityObj.defaultUiTypeToCruxMapping = layoutCompData.defaultUiTypeToCruxMapping;
			} else if (!layoutCompData.hasOwnProperty('defaultUiTypeToCruxMapping') && typeof crmConstants !== "undefined") {
				cxUtilityObj.defaultUiTypeToCruxMapping = crmConstants.defaultUiTypeToCruxMapping;
			}
		}
		layoutCompData.cxPropRenderMode = this.data.cxPropRenderMode;
		var currentInstObjKey = this.generateCurrentInstanceObject({ instanceObjKey: layoutCompData.instanceObjKey, moduleData: layoutCompData.cxPropModuleData, moduleSections: layoutCompData.cxPropLayoutSections, moduleFields: layoutCompData.cxPropModuleData.fields });
		cxUtilityObj.currentInstObjKey = currentInstObjKey;
		this.setData('instanceObjKey', currentInstObjKey);//no i18n
		layoutCompData.layoutComponentDomNode = this.$node;
		layoutCompData.currentInstObjKey = currentInstObjKey;
		layoutCompData.cxFormYieldNames = {
			cxFormCompleteFieldYield: 'cxFormCompleteFieldYield',
			cxFormFieldHeaderYield: 'cxFormFieldHeaderYield',
			cxFormFieldFooterYield: 'cxFormFieldFooterYield',
			cxFormCompleteSectionYield: 'cxFormCompleteSectionYield',
			cxFormSectionHeaderYield: 'cxFormSectionHeaderYield',
			cxFormSectionFooterYield: 'cxFormSectionFooterYield',
			cxFormHeaderYield: 'cxFormHeaderYield',
			cxFormFooterYield: 'cxFormFooterYield',
			cxFormHeaderPrefixYield: 'cxFormHeaderPrefixYield',
			cxFormHeaderSuffixYield: 'cxFormHeaderSuffixYield',
			cxFormFieldErrorYield: 'cxFormFieldErrorYield',
			cxFormSectionLabelYield: 'cxFormSectionLabelYield'
		};
		let class_list = this.getData('class');//no i18n
		if (currentInstObjKey) {
			class_list = class_list || "";//No i18N
			cxUtilityObj.layoutCompSelectorValue = `.cxLayComp${currentInstObjKey}`;
			cxUtilityObj.cxCreateFormContentWrapperClass = `cxCreateLayout_cw_${currentInstObjKey}`;
			class_list += (' cxLayComp' + currentInstObjKey);//No i18N
			this.setData('class', class_list);//No i18N
		}
		this.data.parentDivClass = `${cxUtilityObj.cxCreateFormContentWrapperClass} ${layoutCompData.cxPropContentWrapperClass || ''} ${layoutCompData.cxPropRenderMode === "modal" && layoutCompData.isQuickCreate ? 'cxQuickCreateModal' : ''}`;
		this.constructLyteUiComponentProperties({ cxPropRenderMode: this.data.cxPropRenderMode, layoutCompData });
		var cxPropModuleData = this.isEmptyObj(this.data.cxPropModuleData) ? moduleResponseData : this.data.cxPropModuleData;
		var moduleCurntInstObj = cxPropModuleData[currentInstObjKey], pageMode = "Create", currentViewType = "create";
		if (!cxUtilityObj.currentPage) {
			cxUtilityObj.currentPage = this.data.cxPropCurrentPage || layoutCompData.cxPropCurrentPage || "create";
		}
		switch (cxUtilityObj.currentPage) {
			case 'create':
				currentViewType = "create"; pageMode = "Create";
				if (layoutCompData.isQuickCreate) {
					pageMode = "Quick Create :"; currentViewType = "quick_create";
				}
				break;
			case 'edit':
				currentViewType = "edit"; pageMode = "Edit"; break;
			case 'clone':
				currentViewType = "create"; pageMode = "Clone"; break;
		}
		moduleCurntInstObj.currentPageTitle = layoutCompData.cxPropPageTitle ? layoutCompData.cxPropPageTitle : (`${pageMode} ${cxPropModuleData.singular_label || cxPropModuleData.module_name || ""}`);
		cxUtilityObj.currentViewType = currentViewType;
		this.setData('moduleCurntInstObj', moduleCurntInstObj);
		cxUtilityObj.mapDependencyFields = []; cxUtilityObj.subformMapDependencyFields = {};
		cxUtilityObj.layoutCurrencyFields = []; cxUtilityObj.subformLayoutCurrencyFields = {};
		cxUtilityObj.fieldOfLookupDetails = {}; cxUtilityObj.subformFieldOfLookupDetails = {};
		cxUtilityObj.jsonTypeConversionFields = []; cxUtilityObj.subformJsonTypeConversionFields = {};
		cxUtilityObj.layoutFieldIdVsMetaObject = {}; cxUtilityObj.layoutFieldApiVsMetaObject = {};
		cxUtilityObj.subFormFieldIdVsMetaObject = {}; cxUtilityObj.subFormFieldApiVsMetaObject = {};
		cxUtilityObj.layoutFieldDatatypeVsMetaObject = {}; cxUtilityObj.subFormFieldDatatypeVsMetaObject = {};
		cxUtilityObj.layoutFieldUitypeVsMetaObject = {};
		cxUtilityObj.layoutFieldColumnNameVsMetaObject = {};
		layoutSections.forEach(function (eachSection) {
			var secFieldsArray = [], aggFields = [], subformFields = [], subFormApiname = "";
			secFieldsArray = eachSection.fields && eachSection.fields.length ? eachSection.fields : secFieldsArray;
			if (eachSection.isSubformSection) {
				var subformFieldList = {};
				secFieldsArray.forEach(function (sFields) {
					if (sFields.data_type === "subform" || sFields.data_type === "static_subform") {
						subFormApiname = sFields.api_name;
						cxUtilityObj.subformMapDependencyFields[subFormApiname] = [];
						cxUtilityObj.subformLayoutCurrencyFields[subFormApiname] = [];
						cxUtilityObj.subformJsonTypeConversionFields[subFormApiname] = [];
						cxUtilityObj.subformFieldOfLookupDetails[subFormApiname] = {};
						cxUtilityObj.subFormFieldDatatypeVsMetaObject[subFormApiname] = {};
					}
					if (this.isEmptyObj(sFields.subform)) {
						subformFields.push(sFields);
						this.appendInsObjectProperties({ fieldMeta: sFields, currentInstObjKey, subformFieldList, isSubform: true });
					} else {
						aggFields.push(sFields);
					}
				}.bind(this));
				if (subFormApiname) {
					cxUtilityObj.subformFieldList[subFormApiname] = subformFieldList;
					var sidvsMetaObj = this.getIdVsFieldMetaMappingObject({ fieldsArray: subformFields });
					cxUtilityObj.subFormFieldIdVsMetaObject[subFormApiname] = sidvsMetaObj;
					let newMapObj = {
						fieldOfLookupDetails: cxUtilityObj.subformFieldOfLookupDetails[subFormApiname],
						jsonTypeConversionFields: cxUtilityObj.subformJsonTypeConversionFields[subFormApiname],
						currencyFieldsArray: cxUtilityObj.subformLayoutCurrencyFields[subFormApiname],
						fieldDatatypeVsMetaObject: cxUtilityObj.subFormFieldDatatypeVsMetaObject[subFormApiname],
						fieldsArray: subformFields
					};
					var sapivsMetaObj = this.getApiVsFieldMetaMappingObject(newMapObj);
					cxUtilityObj.subFormFieldApiVsMetaObject[subFormApiname] = sapivsMetaObj;
				} else {
					aggFields = [];
				}
			}
			if (aggFields && aggFields.length) {
				secFieldsArray = aggFields;
			}
			this.appendInsObjectProperties({ fieldsArray: secFieldsArray, currentInstObjKey });
			var idvsMetaObj = this.getIdVsFieldMetaMappingObject({ fieldsArray: secFieldsArray });
			$L.extend(cxUtilityObj.layoutFieldIdVsMetaObject, idvsMetaObj);
			let mapObj = {
				jsonTypeConversionFields: cxUtilityObj.jsonTypeConversionFields,
				fieldOfLookupDetails: cxUtilityObj.fieldOfLookupDetails,
				currencyFieldsArray: cxUtilityObj.layoutCurrencyFields,
				fieldDatatypeVsMetaObject: cxUtilityObj.layoutFieldDatatypeVsMetaObject,
				fieldUitypeVsMetaObject: cxUtilityObj.layoutFieldUitypeVsMetaObject,
				fieldColumnNameVsMetaObject: cxUtilityObj.layoutFieldColumnNameVsMetaObject,
				fieldsArray: secFieldsArray
			};
			var apivsMetaObj = this.getApiVsFieldMetaMappingObject(mapObj);
			$L.extend(cxUtilityObj.layoutFieldApiVsMetaObject, apivsMetaObj);
		}.bind(this));
		var originalData = layoutCompData.cxPropFormData;
		var cxPropFormData = this.getCruxFormData(originalData);
		if (cxUtilityObj.currentPage === 'clone' && layoutCompData.isFromCrmWrapperComponent) {
			cxPropFormData = this.getInitialFormDataForClone(cxPropFormData);
		} else if (cxUtilityObj.currentPage === 'edit' && this.isEmptyObj(cxPropFormData) && !this.isEmptyObj(layoutCompData.cxPropRecordData)) {
			cxPropFormData = layoutCompData.cxPropRecordData;
		}
		layoutCompData.cxPropFormData = cxPropFormData;
		this.setData('cxPropFormData', cxPropFormData);
		this.invokeCruxFormCallBacks({ callbackEventName: 'onInstanceObjKeyCreation', onInstanceObjKeyCreation: { currentInstObjKey } });//no i18n
		if (layoutCompData.cxPropModuleData) {
			this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
			layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
			layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
		}
		if (!layoutCompData.cxPropLayoutDropDownData || !layoutCompData.cxPropLayoutDropDownData.length) {
			let layoutDetails = (this.getDefaultLayoutDetails(this.data.cxPropModuleData, layoutCompData.cxPropProfileName, layoutCompData.cxPropLayoutId)) || {};
			if (layoutDetails.layoutddValues && layoutDetails.layoutddValues.length) {
				layoutCompData.cxPropLayoutDropDownData = layoutDetails.layoutddValues;
			}
			if (layoutDetails.hasOwnProperty('showIntegrationLayoutDD') && !layoutCompData.cxInternalUtilityObj.hasOwnProperty('showIntegrationLayoutDD')) {
				layoutCompData.cxInternalUtilityObj.showIntegrationLayoutDD = layoutDetails.showIntegrationLayoutDD;
			}
			if (!layoutCompData.cxPropLayoutId && layoutDetails.currentLayoutId) {
				layoutCompData.cxPropLayoutId = layoutDetails.currentLayoutId;
			}
		}
		this.setLookupModuleMetaInfo(layoutCompData);
		if (!layoutCompData.hasOwnProperty('cxPropDatePattern') || !layoutCompData.cxPropDatePattern) {
			layoutCompData.cxPropDatePattern = typeof Crm !== "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy";//No I18n
		}
		if (!layoutCompData.hasOwnProperty('cxPropTimeZone') || !layoutCompData.cxPropTimeZone) {
			layoutCompData.cxPropTimeZone = typeof Crm !== "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30";//No I18n
		}
		if (!layoutCompData.hasOwnProperty('cxPropTimeFormat') || !layoutCompData.cxPropTimeFormat) {
			layoutCompData.cxPropTimeFormat = typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : "hh:mm a";//No I18n
		}
		try {
			if (this.isEmptyObj(layoutCompData.originalEntityRecordData) && cxUtilityObj.currentPage !== 'create') {
				let fullFormData = (!this.isEmptyObj(this.data.cxPropRecordData) ? this.data.cxPropRecordData : this.data.cxPropFormData) || {};
				if (!this.isEmptyObj(fullFormData)) {
					layoutCompData.originalEntityRecordData = Lyte.deepCopyObject(fullFormData);
				} else {
					layoutCompData.originalEntityRecordData = {};
				}
			}
		} catch (e) {
			layoutCompData.originalEntityRecordData = {};
		}
		var oncxFormBeforeRenderCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormBeforeRender', onFormBeforeRender: { currentInstObjKey: cxUtilityObj.currentInstObjKey } });//no i18n
		oncxFormBeforeRenderCBResponse.then(() => {
			this.setData('showLoading', false);
			setTimeout(() => {
				this.actual_didConnect();
			}, 0);
		});
	},
	didConnect: function () {
		if (this.data.haveAllDefaultMetaData && !this.data.showLoading) {
			this.actual_didConnect();
		}
	},
	actual_didConnect: function () {
		this.registerUtilityMethods();
		if (!['modal', 'popover'].includes(this.data.cxPropRenderMode)) {
			this.postNodeInsertionHandler();
		}
		var oncxFormAfterRenderCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormAfterRender', onFormAfterRender: { currentInstObjKey: this.data.cxPropLayoutComponentData.cxInternalUtilityObj.currentInstObjKey } });//no i18n
		oncxFormAfterRenderCBResponse.then(function (promiseResponse) {
			var layoutCompData = this.data.cxPropLayoutComponentData, cxPropFormData = layoutCompData.cxPropFormData, layoutFieldApiVsMetaObject = layoutCompData.cxInternalUtilityObj.layoutFieldApiVsMetaObject;
			var currentInstObjKey = layoutCompData.currentInstObjKey,
				mapDependencyFields = layoutCompData.cxInternalUtilityObj.mapDependencyFields || [];
			mapDependencyFields.forEach(function (mapParentField) {
				var fieldApiName = mapParentField, fieldValue = cxPropFormData[mapParentField], fieldMeta = layoutFieldApiVsMetaObject[mapParentField];
				this.setMapDependencyOption({ isInitialRender: true, cxPropFormData, layoutCompData, fieldApiName, fieldValue, fieldMeta, currentInstObjKey });
			}.bind(this));
		}.bind(this));
	},
	postNodeInsertionHandler: function () {
		// this.calculateFieldLabelWidth();
		this.executeLayoutRules();
		let cxFormComp = $L('#cxQuickCreateFormComp')[0];
		if (cxFormComp && cxFormComp.component) {
			cxFormComp.component.updateFormLabelWidth();
		}
	},
	executeLayoutRules: function () {
		let layoutFields = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.layoutFieldApiVsMetaObject,
			currentInstObjKey = this.data.cxPropLayoutComponentData.currentInstObjKey,
			layoutFieldsArr = Object.entries(layoutFields),
			lfLength = layoutFieldsArr.length,
			cruxField;
		for (let k1 = 0; k1 < lfLength; k1++) {
			let currentField = layoutFieldsArr[k1][1];
			if (currentField && currentField[currentInstObjKey] && currentField[currentInstObjKey].isCruxCreateField) {
				cruxField = currentField; break;
			}
		}
		if (cruxField && cruxField[currentInstObjKey]) {
			Lyte.objectUtils(cruxField[currentInstObjKey], "add", 'triggerLayoutRules', !cruxField[currentInstObjKey].triggerLayoutRules);
		}
	},
	didDestroy: function () {
		let layoutCompData = this.data.cxPropLayoutComponentData,
			instDestroyObj = { instanceObjKey: layoutCompData.cxInternalUtilityObj.currentInstObjKey, moduleData: this.data.cxPropModuleData };
		instDestroyObj.moduleSections = this.data.cxPropLayoutSections;
		instDestroyObj.moduleFields = this.data.cxPropModuleData && this.data.cxPropModuleData.fields;
		this.deleteCurrentInstanceObject(instDestroyObj);
	},
	cruxFormOnSubmitWrapper: function (ev) {
		var onBeforeSaveClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormSaveClick', onFormSaveClick: { isEnterKeyPressed: true } });//no i18n
		onBeforeSaveClickCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return;
			} else {
				this.validateAndSaveForm({ callBackDataObject: promiseResponse, event: ev });
			}
		}.bind(this));
	},
	actions: {
		cruxFormOnClick: function (ev, customData) {
			if (customData) {
				customData.setDummyValue = true;
			}
		},
		viewRecord: function (successData) {
			let info = successData && successData.successMessageInfo;
			if (info && info.moduleName && info.recordId) {
				let _parentLyte = window.Lyte,
					detailViewUrl = _parentLyte.Router.getURL({
						route: "crm.tab.module.entity.detail",
						dynamicParams: [
							info.moduleName,
							info.recordId
						]
					});
				networkUtils.openUrl(window.location.origin + detailViewUrl, '_blank'); //No I18N
			}
		},
		cruxFormOnSubmit: function (ev) {
			if (ev) {
				ev.preventDefault();
			}
			setTimeout(() => {
				this.cruxFormOnSubmitWrapper(ev);
			}, 0);
		}
	},
	methods: {
		ltPopoverModalCallBack: function (cbName, isModal) {
			let args = arguments, aLen = args && args.length, newArgsArr = [];
			for (let k = 2; k < aLen; k++) {
				newArgsArr.push(args[k]);
			}
			return this.popoverModalCBWrapper({ cbName, newArgsArr, isModal });
		}
	},
	popoverModalCBWrapper: function (customData) {
		customData = customData || {};
		let cbObject = {
			isPopover: !customData.isModal,
			isModal: customData.isModal,
			callbackEventName: customData.cbName,
			lyteUiCompArgs: customData.newArgsArr
		};
		if (['popoverOnShow', 'modalOnShow'].includes(cbObject.callbackEventName)) {
			this.postNodeInsertionHandler();
		}
		let popoverCBResponse = this.invokeCruxModalPopverCallBacks(cbObject);
		return popoverCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return false;
			}
		}.bind(this));
	},
	calculateFieldLabelWidth: function () {
		let containerValues = ['cxCreateSingleContainer', 'cxCreateContainer1', 'cxCreateContainer2'];
		containerValues.forEach(function (selectors) {
			let actualContentWrapperClass = this.$node.getContentWrapperClass(),
				elementLabelSelectorBase = `.${actualContentWrapperClass}  .${selectors}`,
				elementLabelSelector = `${elementLabelSelectorBase} .cxElementLabel`, elementLabelNode = $L(elementLabelSelector)[0];
			if (!elementLabelNode) {
				elementLabelSelector = `${elementLabelSelectorBase} .cxFieldLabel`;
				elementLabelNode = $L(elementLabelSelector)[0];
			}
			if (elementLabelNode) {
				Lyte.objectUtils(this.data.yieldLayoutGlobalData, "add", `${selectors}fieldLabelWidth`, elementLabelNode.offsetWidth);
				this.data.cxPropLayoutComponentData.yieldLayoutGlobalData = this.data.yieldLayoutGlobalData;
				//Lyte.objectUtils(this.data.cxPropLayoutComponentData.yieldLayoutGlobalData ,"add",`${selectors}fieldLabelWidth`,elementLabelNode.offsetWidth);
			}
		}.bind(this));
	},
	checkAndFetchMetaData: async function (layoutCompData) {
		try {
			let defaultKeysObject = {
				isModuleMetaDataEmpty: 'cxPropModuleData',
				isSectionsMetaDataEmpty: 'cxPropLayoutSections'
			};
			if (layoutCompData.cxPropLayoutRulesRequired || this.data.cxPropLayoutRulesRequired) {
				defaultKeysObject.isLayoutRulesMetaDataEmpty = 'cxPropLayoutRules';
			}
			if (layoutCompData.cxPropValidationRulesRequired || this.data.cxPropValidationRulesRequired) {
				defaultKeysObject.isValidationRulesMetaDataEmpty = 'cxPropValidationRules';
			}
			for (var emptyKey in defaultKeysObject) {
				if (this.isEmptyObj(layoutCompData[defaultKeysObject[emptyKey]])) {
					this.data[emptyKey] = true;
				}
			}
			if (this.data.cxPropRecordId && ['edit', 'clone'].includes(this.data.cxPropCurrentPage) && this.isEmptyObj(layoutCompData.cxPropRecordData)) {
				this.data.isRecordDataEmpty = true;
			}
			let haveAllDefaultMetaData = !this.data.isModuleMetaDataEmpty && !this.data.isSectionsMetaDataEmpty &&
				!this.data.isLayoutRulesMetaDataEmpty && !this.data.isValidationRulesMetaDataEmpty && !this.data.isRecordDataEmpty;
			this.setData('haveAllDefaultMetaData', haveAllDefaultMetaData);//no i18n
			if (haveAllDefaultMetaData) {
				return;
			} else {
				if (this.data.isModuleMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: "Mandatory moduleData / moduleId / moduleApiName for rendering create form is missing/incorrect. If newly created module given, refresh and check once." });//no i18n
				} else if (this.data.isSectionsMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: "Mandatory layoutData / layoutName / layoutId for rendering create form is missing/incorrect" });//no i18n
				} else if (this.data.isRecordDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Mandatory entity record data / entity record id is missing. unable to render the create form.' });//no i18n
				} else if (this.data.isLayoutRulesMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Layout rules is made as mandatory, but mandatory layoutrules meta data is missing. unable to render the create form.' });//no i18n
				} else if (this.data.isValidationRulesMetaDataEmpty) {
					this.setLayoutComponentError({ primaryErrorMessage: 'Validation rules is made as mandatory, but mandatory validationrules meta data is missing. unable to render the create form.' });//no i18n
				}
				return;
			}
			let promiseObj = {};
			if (this.data.isModuleMetaDataEmpty && layoutCompData.cxPropModuleId) {
				promiseObj.moduleDetail = await this.fetchModuleMetaData(layoutCompData.cxPropModuleId);
				if (!promiseObj.moduleDetail) {
					promiseObj.moduleDetail = {};
				}
				if (promiseObj.moduleDetail.success && promiseObj.moduleDetail.success[0]) {
					layoutCompData.cxPropModuleData = promiseObj.moduleDetail.success[0];
					this.data.refetchLayoutMetaData = true;
				} else if (promiseObj.moduleDetail.isExceptionOccured) {
					this.setLayoutComponentError({ isExceptionOccured: true, errorDetails: promiseObj.moduleDetail.moduleFetchException, primaryErrorMessage: 'Exception occured while trying to fetch Module meta data' });//no i18n
				} else if (promiseObj.moduleDetail.failure) {
					this.setLayoutComponentError({ errorDetails: promiseObj.moduleDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Module meta data request' });//no i18n
				}
			}
			if ((this.data.isSectionsMetaDataEmpty || this.data.refetchLayoutMetaData) && !this.isEmptyObj(layoutCompData.cxPropModuleData)) {
				promiseObj.layoutDetail = await this.fetchLayoutMetaData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (!promiseObj.layoutDetail) {
					promiseObj.layoutDetail = {};
				}
				if (promiseObj.layoutDetail && promiseObj.layoutDetail.success && promiseObj.layoutDetail.success[0]) {
					let layoutCacheResponse = promiseObj.layoutDetail.success[0] || {},
						layoutResponse = layoutCacheResponse.layouts && layoutCacheResponse.layouts.filter((f) => { return f.id === promiseObj.layoutDetail.layoutId })[0] || {},
						currentLayoutSections = layoutResponse && layoutResponse.sections || [];
					layoutCompData.cxPropLayoutSections = currentLayoutSections;
					layoutCompData.cxPropLayoutData = layoutResponse;
					layoutCompData.cxPropLayoutId = layoutResponse.id;
				} else if (promiseObj.layoutDetail.isExceptionOccured) {
					this.setLayoutComponentError({ isExceptionOccured: true, errorDetails: promiseObj.layoutDetail.layoutFetchException, primaryErrorMessage: 'Exception occured while trying to fetch Layout meta data' });//no i18n
				} else if (promiseObj.layoutDetail.failure) {
					this.setLayoutComponentError({ errorDetails: promiseObj.layoutDetail.failure, primaryErrorMessage: 'Request failed / failure response received for GET Layout meta data request' });//no i18n
				}
			}
			if (this.data.isLayoutRulesMetaDataEmpty) {
				promiseObj.layoutRulesDetails = await this.fetchLayoutRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (promiseObj.layoutRulesDetails && promiseObj.layoutRulesDetails.success && promiseObj.layoutRulesDetails.success.layout_rule) {
					layoutCompData.cxPropLayoutRules = promiseObj.layoutRulesDetails.success.layout_rule;
				}
			}
			if (this.data.isValidationRulesMetaDataEmpty) {
				promiseObj.validationRulesDetails = await this.fetchValidationRuleData(layoutCompData, layoutCompData.cxPropLayoutId);
				if (promiseObj.validationRulesDetails && promiseObj.validationRulesDetails.success && promiseObj.validationRulesDetails.success.length) {
					layoutCompData.cxPropValidationRules = promiseObj.validationRulesDetails.success;
				}
			}
			if (this.data.isRecordDataEmpty) {
				promiseObj.recordDataDetails = await this.fetchEntityRecordData(layoutCompData);
				if (promiseObj.recordDataDetails && promiseObj.recordDataDetails.success) {
					let successValue = promiseObj.recordDataDetails.success[0] || promiseObj.recordDataDetails.success;
					layoutCompData.cxPropFormData = successValue;
					if (this.isEmptyObj(successValue)) {
						this.setLayoutComponentError({ primaryErrorMessage: 'Empty response received for GET Entity record request' });//no i18n
					}
				}
			}
			await this.actual_init(layoutCompData.cxPropModuleData, layoutCompData.cxPropLayoutSections);
			await this.actual_didConnect();
		} catch (error) {
			this.setLayoutComponentError({ errorDetails: error, isExceptionOccured: true });
		}
	},
	setLayoutComponentError: function (customData) {
		let layoutCompData = this.data.cxPropLayoutComponentData;
		if (layoutCompData.__isRequestInProgress) {
			return; // to avoid issue when already request in progress(means current error is invalid) -- #Typing fast error with network delay
		}
		customData = customData || {};
		this.setDefautMessageDetails();
		let cxInternalObj = layoutCompData.cxInternalUtilityObj;
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "showCommonMessage", true);//No I18n
		let errDetails = (customData.errorDetails || {}), errMessageSecondary;
		if (customData.isExceptionOccured) {
			errMessageSecondary = errDetails.message;
		} else {
			errMessageSecondary = this.isEmptyObj(errDetails) ? '' : (errDetails.message || errDetails.statusText || '');
		}
		finalError = `${customData.primaryErrorMessage || ''}
		
		${errMessageSecondary || ''}`;
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "messageClassType", 'cxPropMessageTypeFailure');//No I18n
		Lyte.objectUtils(cxInternalObj.commonMessageData, "add", "message", finalError);//no i18n
		this.setData('showLoading', false);
	},
	getContWrapperClass: function (layoutComponentData) {
		let contentWrapperClass = layoutComponentData.cxInternalUtilityObj.cxCreateFormContentWrapperClass,
			actualContentWrapperClass = contentWrapperClass;
		if (["popover", "modal"].includes(this.data.cxPropRenderMode)) {
			actualContentWrapperClass = `${contentWrapperClass}${this.data.cxPropRenderMode === 'modal' ? '_modal_wc' : '_popover_wc'}`;
		}
		return actualContentWrapperClass;
	},
	setLookupModuleMetaInfo: function (layoutComponentData) {
		let cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			currentViewType = cxUtilityObj.currentViewType;
		cxUtilityObj.lookupModuleMetaInfo = {};
		let requiredModuleIds = [],
			layoutFlds = cxUtilityObj.layoutFieldDatatypeVsMetaObject || {},
			subformFlds = cxUtilityObj.subFormFieldDatatypeVsMetaObject || {};

		function addRequiredLookupModuleIds(lFlds) {
			if (lFlds.lookup && lFlds.lookup.length) {
				lFlds.lookup.forEach((lookupField) => {
					if (lookupField.visible && lookupField.view_type[currentViewType] && lookupField.lookup && lookupField.lookup.module && !requiredModuleIds.includes(lookupField.lookup.module.id)) {
						requiredModuleIds.push(lookupField.lookup.module.id);
					}
				});
			}
		};

		addRequiredLookupModuleIds(layoutFlds);
		for (var subformName in subformFlds) {
			addRequiredLookupModuleIds(subformFlds[subformName]);
		}
		if (typeof store.peekRecord !== 'undefined') {
			requiredModuleIds.forEach((modId) => {
				let modRecord = store.peekRecord('module', modId);
				if (modRecord) {
					cxUtilityObj.lookupModuleMetaInfo[modId] = modRecord;
				} else {
					this.fetchAndSetLookupModuleMeta(cxUtilityObj, modId);
				}
			});
		} else {
			requiredModuleIds.forEach((modId) => {
				if (!cxUtilityObj.lookupModuleMetaInfo[modId]) {
					this.fetchAndSetLookupModuleMeta(cxUtilityObj, modId);
				}
			});
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-entity-date-time-mixin",
		"crux-formula-utils",
		"crux-element-validation",
		"crux-create-validators-mixin",
		"crux-create-requesthandler-mixin",
		"crux-create-ui-handler-utils"
	]
});
Lyte.Component.register("crux-create-layout-header", {
_template:"<template tag-name=\"crux-create-layout-header\"> <div class=\"cx-layout-header-wrapper\"> <div class=\"cx-layout-header-yield-wrapper\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormHeaderYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </div> <div class=\"cxcreateTitlebar {{expHandlers(stickHeader,'?:','stick','')}}\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormHeaderPrefixYield}}\"> </lyte-yield> <div id=\"heading_title\" class=\"cxcreateHeadingTitle\"> <label class=\"cxcreateHeadingLabel\">{{moduleCurntInstObj.currentPageTitle}}</label> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropLayoutComponentData.cxPropLayoutDropDownData.length,'>',1),'&amp;&amp;',expHandlers(cxPropLayoutComponentData.cxInternalUtilityObj.currentPage,'===','create'))}}\"><template case=\"true\"> <crux-create-layout-dropdown layout-dropdown-data=\"{{cxPropLayoutComponentData.cxPropLayoutDropDownData}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-module-name=\"{{cxPropModuleData.module_name}}\" show-integration-layout-dropdown=\"{{showIntegrationLayoutDD}}\"> </crux-create-layout-dropdown> </template></template> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" cx-prop-form-data=\"{{cxPropFormData}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormHeaderSuffixYield}}\" current-inst-obj-key=\"{{currentInstObjKey}}\"> </lyte-yield> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropLayoutComponentData.isQuickCreate,'!'),'&amp;&amp;',expHandlers(expHandlers(cxPropLayoutComponentData.buttonData.button_position,'!'),'||',expHandlers(cxPropLayoutComponentData.buttonData.button_position,'!==','bottom')))}}\"><template case=\"true\"> <div class=\"cxcreateTitleBtns\"> <template is=\"if\" value=\"{{expHandlers(cxPropLayoutComponentData.skipDefaultButtons,'!')}}\"><template case=\"true\"> <crux-create-button module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\"> </crux-create-button> </template></template> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxPropCustomButtonSupported}}\"><template case=\"true\"> <crux-create-custom-buttons cx-prop-module-data=\"{{cxPropModuleData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-form-data=\"{{cxPropFormData}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\"> </crux-create-custom-buttons> </template></template> </div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"insertYield","position":[1,3,1]},{"type":"text","position":[1,3,3,1,0]},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"insertYield","position":[1,3,7]},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropRenderMode","cxPropModuleData","moduleCurntInstObj","yieldLayoutGlobalData"],
_observedAttributesType :["object","string","string","object","object","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "outlet", "hideAttr": true }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} })//no i18n
		}
	},
	actions: {
		// Functions for event handling
	},
	methods: {
		// Functions which can be used as callback in the component.
	}
});
Lyte.Component.register("crux-create-layout-dropdown", {
_template:"<template tag-name=\"crux-create-layout-dropdown\"> <div class=\"crux-create-row\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(defaultLayoutDropdownData.length,'>',1),'&amp;&amp;',cxPropLayoutComponentData.isQuickCreate)}}\"><template case=\"true\"><div class=\"cxElementLabel\">Layout</div></template></template> <template is=\"if\" value=\"{{expHandlers(showIntegrationLayoutDropdown,'&amp;&amp;',expHandlers(integrationDropdownData.length,'>',1))}}\"><template case=\"true\"> <crux-dropdown on-option-select=\"{{method('onLayoutSelection',true)}}\" cx-prop-display-value=\"{{lbind(currentIntegrationLayoutDisplayValue)}}\" cx-prop-selected=\"{{lbind(currentIntegrationLayoutSelectedValue)}}\" cx-prop-options=\"{{integrationDropdownData}}\" cx-prop-system-value=\"systemvalue\" cx-prop-user-value=\"uservalue\"> </crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(defaultLayoutDropdownData.length,'>',1)}}\"><template case=\"true\"> <crux-dropdown on-option-select=\"{{method('onLayoutSelection',false)}}\" cx-prop-display-value=\"{{lbind(currentDefaultLayoutDisplayValue)}}\" cx-prop-selected=\"{{lbind(currentDefaultLayoutSelectedValue)}}\" cx-prop-options=\"{{defaultLayoutDropdownData}}\" cx-prop-system-value=\"systemvalue\" cx-prop-user-value=\"uservalue\"> </crux-dropdown> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","layoutDropdownData","instanceObjKey","integrationDropdownData","defaultLayoutDropdownData","cxPropModuleName","currentDefaultLayoutDisplayValue","currentDefaultLayoutSelectedValue","currentIntegrationLayoutDisplayValue","currentIntegrationLayoutSelectedValue","showIntegrationLayoutDropdown"],
_observedAttributesType :["object","array","string","array","array","string","string","string","string","string","boolean"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			layoutDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			integrationDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			defaultLayoutDropdownData: Lyte.attr('array', { 'default': [] }), //no i18n
			cxPropModuleName: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentDefaultLayoutDisplayValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentDefaultLayoutSelectedValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentIntegrationLayoutDisplayValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			currentIntegrationLayoutSelectedValue: Lyte.attr('string', { hideAttr: true }),//no i18n
			showIntegrationLayoutDropdown: Lyte.attr("boolean", { "default": false }) //no i18n
		}
	},
	setRespectiveDropdownData: function () {
		let dropdownData = this.data.layoutDropdownData || [], integrationDropdownData = [], defaultLayoutDropdownData = [];
		dropdownData.forEach((options) => {
			if (!(options.status === "active")) {
				return;
			}
			if (options.source === "campaign_integration") {
				integrationDropdownData.push(options);
			} else {
				defaultLayoutDropdownData.push(options);
			}
		});
		this.setData('integrationDropdownData', integrationDropdownData);
		this.setData('defaultLayoutDropdownData', defaultLayoutDropdownData);
		let currentSelectedLayoutDetails = defaultLayoutDropdownData.filter((f) => { return f.id === this.data.cxPropLayoutComponentData.cxPropLayoutId })[0];
		if (currentSelectedLayoutDetails) {
			this.setData({
				'currentDefaultLayoutDisplayValue': currentSelectedLayoutDetails.uservalue,
				'currentDefaultLayoutSelectedValue': currentSelectedLayoutDetails.id
			});
		}
	},
	observeLayoutDropdownData: function () {
		this.setRespectiveDropdownData();
	}.observes('layoutDropdownData.[]').on('init'),
	methods: {
		onLayoutSelection: function (isIntegrationLayout, ev, selectedLayoutId) {
			let cxPropLayoutComponentData = this.data.cxPropLayoutComponentData;
			if (selectedLayoutId === cxPropLayoutComponentData.cxPropLayoutId) {
				return;
			}
			let ddOptions = this.data.defaultLayoutDropdownData || [];
			if (isIntegrationLayout) {
				ddOptions = this.data.integrationDropdownData || [];
			}
			let currentLayoutInfo = ddOptions.filter(layoutInfo => layoutInfo.id === selectedLayoutId)[0];
			let selectedLayoutName = currentLayoutInfo && currentLayoutInfo.uservalue;
			this.invokeCruxFormCallBacks({
				callbackEventName: 'onFormLayoutSwitch',//no i18n
				onFormLayoutSwitch: {
					selectedLayoutId,
					selectedLayoutName,
					cxPropLayoutComponentData,
					newLayoutRenderObj: this.getNewLayoutRenderingObj(selectedLayoutId, cxPropLayoutComponentData)
				}
			});
			//this.getNewLayoutRenderingObj(selectedLayoutId, cxPropLayoutComponentData);
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils"
	]
});
Lyte.Component.register("crux-create-layout-content", {
_template:"<template tag-name=\"crux-create-layout-content\"> <div class=\"cxcreateSectionsCont\"> <template items=\"{{cxPropLayoutSections}}\" item=\"section\" index=\"index\" is=\"for\"> <crux-create-section cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-section=\"{{section}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormLayoutContentYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" is-subform=\"{{isSubform}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{section}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-section> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["cxPropLayoutComponentData","cxPropRenderMode","instanceObjKey","cxPropModuleData","cxPropLayoutSections","moduleCurntInstObj","yieldLayoutGlobalData"],
_observedAttributesType :["object","string","string","object","array","object","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "outlet", "hideAttr": true }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropLayoutSections: Lyte.attr('array', { 'default': [] }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} })//no i18n
		}
	},
	actions: {
		// Functions for event handling
	},
	methods: {
		// Functions which can be used as callback in the component.
	}
});
Lyte.Component.register("crux-create-layout-footer", {
_template:"<template tag-name=\"crux-create-layout-footer\"> <div class=\"cx-layout-footer-wrapper\"> <div class=\"cx-layout-footer-yield-wrapper\"> <lyte-yield yield-name=\"cxCreateFormLayoutYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFooterYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </div> <template is=\"if\" value=\"{{expHandlers(cxPropLayoutComponentData.isQuickCreate,'||',expHandlers(cxPropLayoutComponentData.buttonData.button_position,'===','bottom'))}}\"><template case=\"true\"> <div class=\"cx-layout-footer-button-wrapper\"> <crux-create-button module-curnt-inst-obj=\"{{moduleCurntInstObj}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\"> </crux-create-button> </div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropRenderMode","cxPropModuleData","showButton","moduleCurntInstObj","yieldLayoutGlobalData"],
_observedAttributesType :["object","string","string","object","boolean","object","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropRenderMode: Lyte.attr("string", { "default": "outlet", "hideAttr": true }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			showButton: Lyte.attr("boolean", { "default": true }), //no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }),//no i18n
			yieldLayoutGlobalData: Lyte.attr("object", { "default": {} })//no i18n
		}
	}
});
Lyte.Component.register("crux-create-button", {
_template:"<template tag-name=\"crux-create-button\"> <template items=\"{{cxPropButtons}}\" item=\"btn\" index=\"index\" is=\"for\"> <template is=\"if\" value=\"{{expHandlers(btn.visible,'&amp;&amp;',expHandlers(renderedBtnCnt,'<',buttonLimit))}}\"><template case=\"true\"> <lyte-button lt-prop-disabled=\"{{expHandlers(moduleCurntInstObj.disableFormbuttons,'?:',moduleCurntInstObj.disableFormbuttons,btn.disabled)}}\" data-zcqa=\"{{btn.name}}\" lt-prop-name=\"{{btn.name}}\" onclick=\"{{action('createFormSubmit',btn,this,event)}}\" lt-prop-appearance=\"{{expHandlers(btn.appearance,'?:',btn.appearance,'default')}}\" lt-prop-class=\"{{expHandlers(btn.class,'?:',btn.class,'basicbutton')}}\" lt-prop-id=\"{{btn.id}}\" class=\"{{btn.id}}{{instanceObjKey}} {{btn.buttonClass}}\" id=\"{{btn.id}}{{cxPropModuleData.module_name}}\"> <template is=\"registerYield\" yield-name=\"text\">{{btn.label}}</template> </lyte-button> {{Increment('renderedBtnCnt')}} </template></template> </template> <template is=\"if\" value=\"{{expHandlers(visibleBtnlen,'>',buttonLimit)}}\"><template case=\"true\"> <lyte-button data-zcqa=\"cxQcMoreOptionBtn\" lt-prop-name=\"cxQcMoreOptionBtn\" lt-prop-appearance=\"primary\" lt-prop-id=\"\" class=\"cxQcMoreOptionBtn\" id=\"cxQcMoreOptionBtn{{instanceObjKey}}\"> <template is=\"registerYield\" yield-name=\"text\"><span class=\"cxDropdown cxDropdownWhite\"></span> </template> </lyte-button> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"lyte-button#cxQcMoreOptionBtn{{instanceObjKey}}\" lt-prop-freeze=\"false\" on-menu-click=\"{{method('menuSelection',this)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{cxPropButtons}}\" item=\"btn\" index=\"index\"> <template is=\"if\" value=\"{{btn.visible}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(index,'>=',buttonLimit)}}\"><template case=\"true\"><lyte-menu-item data-value=\"{{btn.name}}\"> <lyte-menu-label>{{btn.label}} </lyte-menu-label> </lyte-menu-item></template></template> </template></template> </template> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3]}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}],
_observedAttributes :["cxPropButtons","buttons","cxPropLayoutComponentData","instanceObjKey","moduleCurntInstObj","cxPropModuleData","visibleBtnlen","buttonLimit","renderedBtnCnt"],
_observedAttributesType :["array","array","object","string","object","object","number","number","number"],

	data: function () {
		return {
			cxPropButtons: Lyte.attr('array', { 'default': [] }), //no i18n
			buttons: Lyte.attr('array', { 'default': [] }), //no i18n
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			moduleCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			visibleBtnlen: Lyte.attr('number', { default: 0 }),//no i18n
			buttonLimit : Lyte.attr('number', { default: 0 }),//no i18n
			renderedBtnCnt : Lyte.attr('number', { default: 0 })//no i18n
			
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData;
		var defaultButtons = [
			{
				"disabled": false,
				"visible": true,
				"name": "cancel",//no i18n
				"id": "cx_create_cancelbutn",//no i18n
				"label": _cruxUtils.getI18n("crm.button.cancel")//no i18n
			},
			{
				"disabled": false,
				"visible": true,
				"name": "save",//no i18n
				"id": "cx_create_savebutn",//no i18n
				'label': _cruxUtils.getI18n("crm.button.save"),//no i18n
				'appearance': 'primary',
				'class': 'primarybtn'//no i18n
			}
		];
		if (layoutComponentData.isQuickCreate) {
			Lyte.arrayUtils(defaultButtons, "insertAt", 1, {
				"disabled": false,
				"visible": true,
				"name": "saveandassociate",//no i18n
				"id": "cx_create_saveandassociatebutn",//no i18n
				"label": I18n.getMsg('crm.button.save.and.associate'),//no i18n
				'appearance': 'primary',
				'class': '',
				'buttonClass': 'cxBtnHasShowMore'//no i18n
			});
		} else {
			Lyte.arrayUtils(defaultButtons, "insertAt", 1, {
				"disabled": false,
				"visible": true,
				"name": "saveAndNew",//no i18n
				"id": "cx_create_saveandnewbutn",//no i18n
				"label": _cruxUtils.getI18n("crm.button.save&new")//no i18n
			});
		}
		let defaultButtonsOriginal = Lyte.deepCopyObject(defaultButtons),
			buttonProperties = ['disabled', 'visible', 'name', 'id', 'label', 'appearance', 'class', 'buttonClass'];//no i18n
		let givenButtonData;
		if (layoutComponentData.buttonData) {
			if (Array.isArray(layoutComponentData.buttonData)) {
				givenButtonData = layoutComponentData.buttonData;
			} else if (typeof layoutComponentData.buttonData === 'object' && layoutComponentData.buttonData.buttons) {
				givenButtonData = layoutComponentData.buttonData.buttons;
			}
		}
		if (givenButtonData && givenButtonData.length) {
			try {
				givenButtonData.forEach(formButton => {
					let currentButtons = defaultButtons.map(butn => { return butn.name; }),
						existingIndex = currentButtons.indexOf(formButton.name);
					if (existingIndex !== -1) {
						let finalButtonObj = Object.assign({}, formButton),
							existingButtonInfo = defaultButtons[existingIndex];
						buttonProperties.forEach(key => {
							if (!formButton.hasOwnProperty(key) && existingButtonInfo.hasOwnProperty(key)) {
								finalButtonObj[key] = existingButtonInfo[key];
							}
						});
						if (finalButtonObj.hasOwnProperty('position')) {
							let indexVal = Number(finalButtonObj.position),
								isValidIndex = defaultButtons.length >= indexVal;
							if (isValidIndex) {
								Lyte.arrayUtils(defaultButtons, "removeAt", existingIndex, 1);
								Lyte.arrayUtils(defaultButtons, "insertAt", (--indexVal), finalButtonObj);
							}
						} else {
							Lyte.arrayUtils(defaultButtons, "replaceAt", existingIndex, finalButtonObj);
						}
					} else {
						if (formButton.hasOwnProperty('position')) {
							let indexVal = Number(formButton.position),
								isValidIndex = defaultButtons.length >= indexVal;
							if (isValidIndex) {
								Lyte.arrayUtils(defaultButtons, "insertAt", (--indexVal), formButton);
							}
						} else {
							defaultButtons.push(formButton);
						}
					}
				});
			} catch (exe) {
				defaultButtons = defaultButtonsOriginal;
			}
		}
		this.setData('cxPropButtons', defaultButtons);//no i18n
		this.setData('visibleBtnlen', defaultButtons.filter((btn=>btn.visible)).length);
		this.setData('buttonLimit' , defaultButtons.length);
		if (layoutComponentData.isQuickCreate && defaultButtons.length > 2) {
			this.setData('buttonLimit', 2);
		}
		layoutComponentData.cxInternalUtilityObj.cxPropButtons = this.data.cxPropButtons;
	},
	actions: {
		// Functions for event handling
		createFormSubmit: async function (buttonObj, lyteButtonNode, event) {
			this.formButtonHandling(buttonObj, lyteButtonNode, event);
		}
	},
	methods: {
		// Functions which can be used as callback in the component.
		menuSelection: function (menuNode, btnName, event) {
			let buttonObj = this.data.cxPropButtons.filter(btn => btn.name == btnName)[0];
			this.formButtonHandling(buttonObj, menuNode, event);
		}
	},
	showCancelConfirmationAlert: function () {
		_cruxUtils.showCustomAlert({
			params: {
				ltPropPrimaryMessage: 'Confirm Action',//no i18n
				ltPropSecondaryMessage: 'Are you sure you want to cancel? Any unsaved changes will be lost and the form will be removed from the view.',//no i18n
				ltPropButtonPosition: 'center', //No I18n
				ltPropContentAlign: 'center', //No I18n
				ltPropShowCloseButton: 'false',//No I18n
				ltPropButtons: [
					{
						"type": "failure",
						"text": "Cancel",
						"appearance": "default"
					},
					{
						"type": "accept",
						"text": "Confirm",
						"appearance": "failure"
					}
				]
			},
			accept: function () {
				this.destroyComponent(this.data.cxPropLayoutComponentData);
			}.bind(this)
		});
	},
	formButtonHandling: async function (buttonObj, lyteButtonNode, event) {
		var cbObject = { currentButtonObj: buttonObj, currentButtonNode: lyteButtonNode, eventDetails: event },
			layoutComponentData = this.data.cxPropLayoutComponentData;
		if (buttonObj.name !== 'cancel') {
			var onBeforeSaveClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormSaveClick', onFormSaveClick: cbObject });//no i18n
			onBeforeSaveClickCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				} else {
					this.validateAndSaveForm({ callBackDataObject: promiseResponse, currentButtonObj: buttonObj, currentButtonNode: lyteButtonNode, event: event });
				}
			}.bind(this));
		} else {
			let cbValue = await this.invokeCruxFormCallBacks({ callbackEventName: 'onFormCancel', onFormCancel: cbObject });//no i18n
			if (cbValue === false) {
				return;
			}
			this.showCancelConfirmationAlert();//ZCRM-686119
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-element-validation",
		"crux-create-validators-mixin",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-create-requesthandler-mixin",
		"crux-entity-date-time-mixin"
	]
});
Lyte.Component.registerHelper("Increment", function( data ) { //No I18n
	var val = this.getData(data);
	this.setData(data,val+=1);
});
Lyte.Component.register("crux-create-custom-buttons", {
_template:"<template tag-name=\"crux-create-custom-buttons\"> <template is=\"if\" value=\"{{cxPropCustomButtons.length}}\"><template case=\"true\"> <div class=\"pxClubbedButton\"> <lyte-button id=\"{{cbCommonData.selectedCBId}}\" onclick=\"{{action('executeCustomButton',cxPropCustomButtons[0].id)}}\" onmouseover=\"{{action('mouseOverCustomButton',cxPropCustomButtons[0].id,cxPropCustomButtons[0].name,cxPropCustomButtons[0].description,this)}}\" onmouseout=\"{{action('mouseOutCustomButton',this)}}\" data-zcqa=\"{{cxPropCustomButtons[0].name}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cxPropCustomButtons[0].name}}</template> </lyte-button> <lyte-button id=\"{{cbCommonData.CBDropDownArrowId}}\" class=\"cxcreateCBDropDownIcon\" data-zcqa=\"downArrow\"> <template is=\"registerYield\" yield-name=\"text\">...</template> </lyte-button> </div> <lyte-menu on-before-open=\"{{method('onCustomButtonBeforeShow')}}\" on-close=\"{{method('onCustombuttonHide')}}\" lt-prop-yield=\"true\" lt-prop-query=\"#{{cbCommonData.CBDropDownArrowId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"if\" value=\"{{expHandlers(cxPropCustomButtons.length,'>',1)}}\"><template case=\"true\"> <lyte-search lt-prop-placeholder=\"Search Button\" on-search=\"{{method('searchCustomButtons')}}\" id=\"{{cbCommonData.cbSearchID}}\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;#{{cbCommonData.cbSortableID}}&quot;, &quot;search&quot; : &quot;lyte-menu-item&quot;}\" data-zcqa=\"LCCustmBtnSearchBox\"> </lyte-search> </template></template> <div id=\"{{cbCommonData.cbSortableID}}\"> <template is=\"for\" items=\"{{cxPropCustomButtons}}\" item=\"currentCB\" index=\"index\"> <lyte-menu-item data-value=\"{{currentCB.id}}\" class=\"customButtonQuery{{currentCB.id}}\" data-zcqa=\"{{currentCB.name}}\" onclick=\"{{action('executeCustomButton',currentCB.id)}}\" onmouseover=\"{{action('mouseOverCustomButton',currentCB.id,currentCB.name,currentCB.description,this)}}\" onmouseout=\"{{action('mouseOutCustomButton',this)}}\"> <lyte-menu-label>{{currentCB.name}}</lyte-menu-label> </lyte-menu-item> </template> </div> <template is=\"if\" value=\"{{cbCommonData.showNoResultsMessage}}\"><template case=\"true\"> <span>{{cruxGetI18n('crm.custombutton.nobuttons.found')}}</span> </template></template> <div class=\"footerCBMenus\"> <template is=\"if\" value=\"{{isPremiumUser()}}\"><template case=\"true\"> <lyte-menu-item id=\"createCustomButtons\" onclick=\"{{action('cbFooterMenuAction','createCustomBtn',module,buttonPosition)}}\" data-zcqa=\"create_buttons\">{{cruxGetI18n('crm.custombutton.create.newbutton')}} </lyte-menu-item> </template></template> <lyte-menu-item id=\"manageCustomButtons\" onclick=\"{{action('cbFooterMenuAction','manageCustomBtn',module,buttonPosition)}}\" data-zcqa=\"manage_buttons\">{{cruxGetI18n('crm.custombutton.manage.button')}} </lyte-menu-item> </div> </lyte-menu-body> </template> </lyte-menu> </template></template> <lyte-popover lt-prop-content-padding=\"15px\" id=\"{{cbtooltipPopoverId}}\" lt-prop-width=\"250px\" lt-prop-wrapper-class=\"cxcreateCBpopoverWrapper\" lt-prop-show-close-button=\"false\" lt-prop-allow-multiple=\"false\" lt-prop-type=\"callout\" lt-prop-freeze=\"false\" lt-prop-origin-elem=\".{{cbtooltipPopoverOriginClass}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <div class=\"cxcreateCBpopoverBtnLabel\">{{cruxGetI18n(\"crm.custombutton.name\")}}:</div> <div class=\"cbTooltipNameLC\">{{custombuttonTooltip.name}}</div> <template is=\"if\" value=\"{{custombuttonTooltip.description}}\"><template case=\"true\"> <div class=\"cxcreateCBpopoverBtnLabel cxcreateCBpopoverBtnDesc\">{{cruxGetI18n(\"crm.customize.custombutton.function.desc\")}}:</div> <div class=\"cbTooltipDescLC\">{{custombuttonTooltip.description}}</div> </template></template> </lyte-popover-content> </template> </lyte-popover> <lyte-modal id=\"cbEmptyfieldsmodal\" class=\"crmBoxModal\" lt-prop-wrapper-class=\"modalCoverCB crmBoxModal\"> <template is=\"registerYield\" yield-name=\"modal\"> <div class=\"w550\"> <div class=\"formBldPopHd\">{{cruxGetI18n('crm.custombutton.action')}}</div> <div class=\"p30\"> <div class=\"crm-font-regular f13 \">{{cruxGetI18n('crm.custombutton.empty.field.values')}}</div> <div class=\"pT10 pB10 pL15 pR15 mT10 bg_fdfddc\"> <template is=\"for\" items=\"{{custombuttonEmptymodal.modulesArr}}\" item=\"mod\" index=\"index\"> <div class=\"crm-font-bold f12 mT10\">{{mod.module}}:</div> <ul class=\"bullet oA mT10 mB10 mH100\"> <template is=\"for\" items=\"{{mod.fields}}\" item=\"field\" index=\"index\"> <li style=\"margin-bottom:5px\">{{field}}</li> </template> </ul> </template> </div> <div class=\"mT10 f13\">{{cruxGetI18n('crm.custombutton.proceed.action')}}</div> </div> <div class=\"popup-model-footer pTop0\"> <lyte-button onclick=\"{{action('closeEmptyfieldsModal')}}\" data-zcqa=\"cancel_custom_buttons_action\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('zb.common.Cancel')}}</template> </lyte-button> <lyte-button lt-prop-type=\"default\" lt-prop-class=\"redbtn\" onclick=\"{{action('invokeEmptyfieldsurl',currntButtonid)}}\" data-zcqa=\"proceed_custom_buttons_action\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.yes.proceed')}}</template> </lyte-button> </div> </div> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7,1]},{"type":"if","position":[1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,7,3]},{"type":"text","position":[1,7,3,0]},{"type":"componentDynamic","position":[1,7,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3,1]},{"type":"for","position":[1,3,3,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]},{"type":"text","position":[1,3,5,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,5,1]},{"type":"attr","position":[1,5,3]},{"type":"registerYield","position":[1,5,3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,5,3]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropLayoutComponentData","cxPropModuleData","instanceObjKey","cxPropFormData","cbCommonData","currentInstObjKey","cbtooltipPopoverId","cbtooltipPopoverOriginClass","cbinFocus","isPremiumUser","cbinFocusName","custombuttonTooltip","cxPropCustomButtons","cxPropCompleteCBData"],
_observedAttributesType :["object","object","string","object","object","string","string","string","boolean","boolean","string","object","array","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cbCommonData: Lyte.attr('object', { 'default': {} }),//no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbtooltipPopoverId: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbtooltipPopoverOriginClass: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cbinFocus: Lyte.attr('boolean', { default: false }),//no i18n
			isPremiumUser: Lyte.attr('boolean', { default: false }),//no i18n
			cbinFocusName: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			custombuttonTooltip: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropCustomButtons: Lyte.attr('array', { 'default': [] }),//no i18n
			cxPropCompleteCBData: Lyte.attr('object', { 'default': {} })//no i18n
		}
	},
	init: function () {
		var cxPropCustomButtons = this.data.cxPropLayoutComponentData.cxPropCustomButtons || [], currentInstObjKey = this.data.cxPropLayoutComponentData.currentInstObjKey;
		this.setData('cxPropCustomButtons', cxPropCustomButtons);
		var cbtooltipPopoverId = 'cxCBTooltipPopover' + currentInstObjKey;
		this.setData('cbtooltipPopoverId', cbtooltipPopoverId);
		var cbtooltipPopoverOriginClass = 'cxCBTooltipPopoverOriginSel' + currentInstObjKey;
		this.setData('cbtooltipPopoverOriginClass', cbtooltipPopoverOriginClass);
		var cbCommonDataObj = this.data.cbCommonData || {};
		cbCommonDataObj.selectedCBId = 'CBSelectedButnID' + currentInstObjKey; cbCommonDataObj.cbSortableID = 'CBSortableID' + currentInstObjKey;
		cbCommonDataObj.CBDropDownArrowId = 'CBDropDownArrowId' + currentInstObjKey; cbCommonDataObj.cbSearchID = 'cbSearchID' + currentInstObjKey;
		this.setData('cbCommonData', cbCommonDataObj);
	},
	actions: {
		// Functions for event handling
		mouseOverCustomButton: function (id, name, description, sourceElem) {
			var custombuttonTooltip = {};
			custombuttonTooltip.name = name; custombuttonTooltip.description = description;
			var cbtooltipPopoverId = this.data.cbtooltipPopoverId, cbtooltipPopoverOriginClass = this.data.cbtooltipPopoverOriginClass;
			if (sourceElem) {
				sourceElem.classList.add(cbtooltipPopoverOriginClass);
			}
			this.setData({ 'cbinFocus': true, 'cbinFocusName': name });//no i18n
			setTimeout(function () {
				var _popNode = document.querySelector('#' + cbtooltipPopoverId);// no i18n
				if (_popNode) {
					_popNode.ltProp('placement', 'left'); //no i18n
					if (this.data.cbinFocus && this.data.cbinFocusName === name) {
						this.setData('custombuttonTooltip', custombuttonTooltip);//no i18n
						_popNode.ltProp('show', true); //no i18n
					}
				}
			}.bind(this), 2000);
		},
		mouseOutCustomButton: function (sourceElem) {
			var cbtooltipPopoverId = this.data.cbtooltipPopoverId, cbtooltipPopoverOriginClass = this.data.cbtooltipPopoverOriginClass;
			var _popNode = document.querySelector('#' + cbtooltipPopoverId);// no i18n
			if (sourceElem) {
				sourceElem.classList.remove(cbtooltipPopoverOriginClass);
			}
			if (_popNode) {
				this.setData('cbinFocus', false);//no i18n
				_popNode.ltProp('show', false); //no i18n
			}
		},
		executeCustomButton: function (buttonID) {
			var cbClickCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonClick', onCustomButtonClick: { buttonID } });//no i18n
			cbClickCBResponse.then(function (promiseResponse) {
				// var obj = {};
				// obj['111111000000069585'] = '{"sequence_number":2,"name":"David","profiles":[{"name":"Administrator","id":"111111000000000403"}],"description":"Ornstien","id":"111111000000069585","position":"create_clone","widget":null,"display":"new_tab","device_permissions":{"location":false},"url_encoding":"UTF-8","url":"http://www.google.com/search?q=Ornstien${Leads.Aggregate_Field_4}${users.fax}${users.zip}&&r=${Leads.Zip_Code}","custom_function":null,"modified_time":"2023-08-10T15:52:15+05:30","modified_by":{"name":"Kural S","id":"111111000000050755"},"action":"url","web_tab":null,"arguments":["Leads.Aggregate_Field_4","users.fax","users.zip","Leads.Zip_Code"]}';//no i18n
				// obj['111111000000069597'] = '{"sequence_number":2,"name":"TestFunction","profiles":[{"name":"Administrator","id":"111111000000000403"}],"description":null,"id":"111111000000069597","position":"create_clone","widget":null,"display":"new_tab","device_permissions":{"location":false},"url_encoding":null,"url":null,"custom_function":{"name":"F1 Name","description":null,"arguments":[],"id":"41430000000004019"},"modified_time":"2023-08-09T11:17:19+05:30","modified_by":{"name":"Kural S","id":"111111000000050755"},"action":"custom_function","web_tab":null}';//no i18n
				// promiseResponse = {}; promiseResponse.customButtonSuccessDetails = JSON.parse(obj[buttonID]);
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('customButtonSuccessDetails')) {
					this.executeCustomButtonflow(promiseResponse);
				}// else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('customButtonFailureDetails')) {}
			}.bind(this));
		},
		cbFooterMenuAction: function (butnType, module, buttonPosition) {
			return { butnType, module, buttonPosition, isAction: true };
		}
	},
	executeCBFunctionAction: function () {
		if (wizButtonId) {
			custombuttonEmptymodal.skip = false;
		}
		var _arg = res.custom_function.arguments;
		var cxFormData = this.data.cxPropFormData;
		var info = {}, layoutComponentData = this.data.cxPropLayoutComponentData, cxUtilityObj = layoutComponentData.cxInternalUtilityObj;
		var lookup_values = {};
		if (!wizButtonId) {
			if (_arg && _arg.length) {
				_arg.forEach(function (arg) {
					if (!["variables"].includes(arg.type)) {
						var mergeFields = this.getAPINameFromMergeField(arg.api_name);
						var apiN = mergeFields[0].module_field, paramModule = mergeFields[0].module;
						var data, formFieldList = cxUtilityObj.formFieldList, errObject = cxFormData.$RECORD__Error__Object || {};;
						if (formFieldList[apiN] || apiN === "id" || apiN === "ownerId") {
							var fldValue, isLookupField = false;
							if (formFieldList[apiN].fieldUiType && formFieldList[apiN].fieldUiType === 133) {
								isLookupField = true;
							}
							if (!(apiN === "id" || apiN === "ownerId") && paramModule === self.data.module) {
								fldValue = cxFormData[apiN];
								if (errObject[apiN]) {
									fldValue = errObject[apiN].value;
								}
							}
							if (paramModule === self.data.module && !mergeFields[0].hasOwnProperty("lookup_field")) {
								if (apiN === "id") {
									fldValue = entityId;
								} else if (apiN === "ownerId") { //no i18n
									fldValue = ownerID;
								}
							}
							if (fldValue) {
								if (mergeFields[0].hasOwnProperty("lookup_field") && typeof fldValue === "object" && fldValue.hasOwnProperty('id')) { //no i18n
									lookup_values[apiN] = fldValue.id;
								} else if (isLookupField && fldValue.id && Crm.userDetails.CUSTOM_BUTTON_CUSTOM_FUNCTION_LOOKUP_ID_SUPPORT) {
									data = fldValue.id;
								} else if (typeof fldValue === "object") { //no i18n
									data = fldValue.full_name ? fldValue.full_name : (fldValue.name ? fldValue.name : "");//no i18n
								} else {
									if (fldValue && typeof fldValue === "string" && fldValue.indexOf('TV') !== -1) {
										var curntFld = self.data.moduleData.fields.filter(function (f) { return f.api_name === apiN })[0];
										if (curntFld && curntFld.data_type === "datetime") {
											fldValue = fldValue.split('TV')[0];
										}
									}
									data = fldValue;
								}
							}
							if (data) {
								info[arg.name] = data;
							}
						}
						if ((apiN === "parameters" || apiN === "all_fields") && paramModule === "request") {
							var argRecords = self.filterValidUITypes(cxFormData, self.getData('initRoute'), self.getData('moduleData.fields'), "customButtons");//no i18n
							argRecords = argRecords || {};
							for (var keys in argRecords) {
								if (argRecords[keys] === undefined || (argRecords[keys] === "" || (typeof argRecords[keys] === "string" && argRecords[keys].trim() === ""))) {
									delete argRecords[keys];
								}
							}
							info[arg.name] = argRecords;
						}
					}

				});
			}
			else {
				var argRecords = self.filterValidUITypes(cxFormData, self.getData('initRoute'), self.getData('moduleData.fields'), "customButtons");//no i18n
				argRecords = argRecords || {};
				for (var keys in argRecords) {
					if (argRecords[keys] === undefined || (argRecords[keys] === "" || (typeof argRecords[keys] === "string" && argRecords[keys].trim() === ""))) {
						delete argRecords[keys];
					}
				}
				Object.assign(info, argRecords);
			}
		}
		custombuttonEmptymodal.arginfo = info;
		custombuttonEmptymodal.lookup_values = lookup_values;
		this.callCustomFunctionAction(buttonId, info, custombuttonEmptymodal);
	},
	executeCBWidgetsAction: function () {
		var position = "createclone";//No I18n
		var widgetData = {
			Entity: self.getData("module")//No I18n
		}
		if (entityId && entityId !== 1) {
			widgetData.EntityId = entityId;
			position = "cbedit";//No I18n
		}
		var widget = typeof WidgetHandler != "undefined" ? WidgetHandler.getWidget("CustomButtons", buttonId) : undefined; //no i18n
		if (widget) {
			var formData = WidgetHandler.Utils.readForm();
			widgetData = jQuery.extend(widgetData, formData);
			WidgetHandler.CustomButtons.render(widget, widgetData, position);
		}
		self.removeLoading();
	},
	executeCBUrlAction: function (cbCustomData) {
		var { customButtonDetails, custombuttonEmptymodal, entityId, moduleName, ownerID } = cbCustomData;
		var mergeFields = this.getAPINameFromMergeField(customButtonDetails.url);
		mergeFields = mergeFields || [];
		var cxFormData = this.data.cxPropFormData, layoutComponentData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutComponentData.cxInternalUtilityObj,
			info = {};
		mergeFields.forEach(function (arrItem) {
			var apiN, data, formFieldList = cxUtilityObj.formFieldList, errObject = cxFormData.$RECORD__Error__Object || {};
			if (arrItem && arrItem.module === moduleName && arrItem.module_field) {
				apiN = arrItem.module_field;
			}
			if (formFieldList[apiN] || apiN === "id" || apiN === "ownerId") {
				var fldValue = cxFormData[apiN], isLookupField = false;
				if (formFieldList[apiN].fieldUiType && formFieldList[apiN].fieldUiType === 133) {
					isLookupField = true;
				}
				if (errObject[apiN]) {
					fldValue = errObject[apiN].value;
				}
				if (apiN === "id") {
					fldValue = entityId;
				} else if (apiN === "ownerId") { //no i18n
					fldValue = ownerID;
				}
				if (fldValue) {
					if (typeof fldValue === "string") {
						data = encodeURIComponent(fldValue);
					} else if (Array.isArray(fldValue)) {
						data = encodeURIComponent("[" + fldValue + "]");
					} else if (typeof fldValue === "object") { //no i18n
						if (isLookupField && fldValue.id && (Crm && Crm.userDetails && Crm.userDetails.CUSTOM_BUTTON_INVOKE_URL_LOOKUP_ID_SUPPORT)) {
							data = encodeURIComponent(fldValue.id);
						} else if (fldValue.full_name) {
							data = encodeURIComponent(fldValue.full_name);
						} else if (fldValue.name) {
							data = encodeURIComponent(fldValue.name);
						}
					} else {
						data = fldValue;
					}
				}
				if (data) {
					info[apiN] = data;
				}
			}
		}.bind(this));
		custombuttonEmptymodal.arginfo = info;
		this.callCustomFunctionAction({ customButtonDetails, info, custombuttonEmptymodal });
	},
	executeCBCircuitsAction: function () {
		var info = {}; info.id = entityId; custombuttonEmptymodal.arginfo = info;
		this.callCustomFunctionAction(buttonId, info, custombuttonEmptymodal);
	},
	executeCustomButtonflow: function (cbResponse) {
		var customButtonDetails = cbResponse.customButtonDetails || {}, custombuttonEmptymodal = {};
		if (customButtonDetails && customButtonDetails.id) {
			Lyte.objectUtils(this.data.cxPropCompleteCBData, "add", customButtonDetails.id, customButtonDetails);
			var currentPage = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.currentPage, cxPropFormData = this.data.cxPropFormData || {}, moduleName = this.data.cxPropLayoutComponentData.cxPropModuleName;
			var entityId = currentPage === "edit" ? cxPropFormData.id : 1, ownerID = cxPropFormData.Owner && cxPropFormData.Owner.id ? cxPropFormData.Owner.id : (Crm && Crm.userDetails && Crm.userDetails.USER_ID);//no i18n
			var actionParamsObj = { customButtonDetails, custombuttonEmptymodal, entityId, moduleName, ownerID };
			switch (customButtonDetails.action) {
				case 'circuits':
					this.executeCBCircuitsAction(actionParamsObj);
					break;
				case 'url':
				case 'web_tab':
					this.executeCBUrlAction(actionParamsObj);
					break;
				case 'widget':
					this.executeCBWidgetsAction(actionParamsObj);
					break;
				case 'custom_function':
					this.executeCBFunctionAction(actionParamsObj);
					break;
			}
		}
	},
	callCustomFunctionAction: function (cbCustomData) {
		var { customButtonDetails, info, custombuttonEmptymodal } = cbCustomData;
		var queryparm = {}, layoutComponentData = this.data.cxPropLayoutComponentData;
		if (layoutComponentData.cxInternalUtilityObj.currentPage === 'edit') { //no i18n
			queryparm.ids = nself.getData('dataBind.id'); //no i18n
		}
		if (custombuttonEmptymodal.recordId) {
			queryparm.ids = custombuttonEmptymodal.recordId;
		}
		if (custombuttonEmptymodal.proceed_empty) {
			queryparm.proceed_empty = true;
		}
		var custom_buttons = { arguments: info ? info : {} };
		if (custombuttonEmptymodal.lookup_values) {
			custom_buttons.lookup_values = custombuttonEmptymodal.lookup_values;
		}
		var cbActionTriggerCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonActionTrigger', onCustomButtonActionTrigger: { customButtonDetails, queryparm, custom_buttons } });//no i18n
		return cbActionTriggerCBResponse.then(function (promiseResponse) {
			if (promiseResponse === false) {
				return false;
			} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('cbActionSuccessDetails')) {
				//this.executeCustomButtonActionsflow(promiseResponse);
				return { promiseResponse, onSuccess: true };
			} else if (typeof promiseResponse === 'object' && promiseResponse.hasOwnProperty('cbActionFailureDetails')) {
				//this.executeCBActionsFailureflow(promiseResponse);
				return { promiseResponse, onFailure: false };
			}
		}.bind(this));
	},
	/*
	executeCBActionsFailureflow: function (cbActionFailureResp) {
		var errResp = cbActionFailureResp && cbActionFailureResp.responseText ? JSON.parse(cbActionFailureResp.responseText) : {};
		if (errResp) {
			if (errResp.code === "UNABLE_EXECUTE_THE_SCRIPT") {
				if (errResp.details && errResp.details.creator_error) {

					switch (errResp.details.creator_error) {
						case 'SOCKET_CLOSED':
							crmui.showMsgBand('warning', I18n.getMsg('crm.custombutton.function.time.exceed'), 7000);  //No I18N
							break;
						case 'TOO_MANY_REQUESTS':
							crmui.showMsgBand('error', I18n.getMsg('crm.custombutton.function.limit.exceed'), 5000);  //No I18N
							break;
						case 'CIRCUITS_EXECUTION_LIMIT_REACHED':
							crmui.showMsgBand('error', I18n.getMsg('crm.circuits.limit.exceeded'), 5000);  //No I18N
							break;
						case 'CIRCUITS_FEATURE_NOT_AVAILABLE':
							crmui.showMsgBand('error', I18n.getMsg('crm.circuits.button.feature.not.available', Crm.brandName), 5000);  //No I18N
							break;
						case 'CIRCUITS_ACCOUNT_FREEZED':
							crmui.showMsgBand('error', I18n.getMsg(Crm.userDetails.IS_ADMIN_ROLE ? 'crm.circuits.accfreeze.button.admin' : 'crm.circuits.accfreeze.button.nonadmin', Crm.brandName), 5000);  //No I18N
							break;
						case 'CIRCUITS_TYPE_NOT_ALLOWED':
							if (Crm.userDetails.IS_ADMIN_ROLE) {
								crmui.showMsgBand('error', I18n.getMsg("crm.circuits.associate.non.payment", Crm.brandName), 5000);  //No I18N
							} else {
								crmui.showMsgBand('error', I18n.getMsg("crm.circuits.associate.non.payment", Crm.brandName) + ". " + I18n.getMsg("crm.circuits.contact.admin"), 5000);  //No I18N
							}
							break;
						default:
							crmui.showMsgBand('warning', I18n.getMsg('crm.label.button.function.execute.error'), 1500);  //No I18N
							break;
					}
				} else {
					crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				}
				return;
			} else if (errResp.code === "INVALID_DATA" && errResp.message === "invalid custom button id") {//no i18n
				crmui.showMsgBand('error', I18n.getMsg('crm.label.insufficient.privileges'), 5000);//No I18N
				return;
			} else if (errResp.code === "INTERNAL_ERROR") {//No I18N
				crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				return;
			} else if (errResp.message) {
				crmui.showMsgBand('error', errResp.message, 5000);//No I18N
				return;
			}
			return
		}
		var response;
		try {
			response = cbActionFailureResp.response ? JSON.parse(error.response) : response;
		} catch (ignored) {
			response = cbActionFailureResp;
		}
		var errCode = response && response.details && response.details.creator_error;
		if (errCode) {
			if (errCode === 'TOO_MANY_REQUESTS') {
				crmui.showMsgBand('error', I18n.getMsg('crm.custombutton.function.limit.exceed'), 5000);  //No I18N
				return;
			} else if (errCode === 'SOCKET_CLOSED') {//No I18N
				crmui.showMsgBand('warning', I18n.getMsg('crm.custombutton.function.time.exceed'), 7000);  //No I18N
				return;
			} else {
				crmui.showMsgBand('warning', I18n.getMsg('crm.security.error.add.user'), 1500);  //No I18N
				return;
			}
		}
	},
	executeCustomButtonActionsflow: function (cbActionSuccResp) {
		nself.custombuttonWizardDetails = undefined;
		var serverDetails = res.actionResolved.details;
		var creator_response = serverDetails.custom_function ? serverDetails.custom_function.creator_response : undefined;
		if (creator_response instanceof Object) {
			creator_response = JSON.stringify(creator_response);
		}
		var execution_status = serverDetails.custom_function ? serverDetails.custom_function.status : undefined;
		var reloadRecord = true;
		var isCascadeEnabled = false;
		var responseObj = creator_response;


		nself.removeLoading();
		if (validationUtils.isNotEmpty(serverDetails.empty_fields)) {
			var compData = nself.data;
			var api_name = compData.moduleData.api_name, plural_label = compData.moduleData.plural_label, modFlds = compData.moduleData.fields, currMode = nself.data.initRoute === "edit" ? "edit" : "create";//no i18n 
			var validErrorArr = [];
			$L.each(serverDetails.empty_fields, function (key, val) {
				if (key === api_name || key === plural_label) {
					var validFLdsarr = [];
					if (val && val.length) {
						var errFlds = modFlds.filter(function (fld) { return val.includes(fld.api_name) || val.includes(fld.display_label); });
						var apiNames = errFlds.mapByKey("api_name");//no i18n
						var dispLabel = errFlds.mapByKey("display_label");//no i18n
						val.forEach(function (sfld) {
							var indVal = apiNames.indexOf(sfld) !== -1 ? apiNames.indexOf(sfld) : dispLabel.indexOf(sfld);
							if (indVal > -1) {
								var curerrFlds = errFlds[indVal];
								if (curerrFlds.view_type[currMode] && !["207", "208"].includes(curerrFlds.ui_type)) {
									validFLdsarr.push(curerrFlds.field_label);
								}
							}
						});
						if (validFLdsarr.length) {
							var newObj = { module: key, fields: validFLdsarr };
							validErrorArr.push(newObj);
						}
					}

				} else {
					var otherObj = { module: key, fields: val };
					validErrorArr.push(otherObj);
				}
			});
			if (validErrorArr.length) {
				custombuttonEmptymodal.proceed_empty = true;
				custombuttonEmptymodal.modulesArr = validErrorArr;
				custombuttonEmptymodal.response = serverDetails;
				return nself.displayEmptyModal(custombuttonEmptymodal, buttonId);
			} else if (serverDetails.action === "custom_function") {
				custombuttonEmptymodal.proceed_empty = true;
				custombuttonEmptymodal.response = serverDetails;
				return nself.callCustomFunction(buttonId, custombuttonEmptymodal.arginfo, custombuttonEmptymodal, nself.data.isWizard ? true : false);
			}
		}

		if (serverDetails.action === "invoke_url" || serverDetails.action === "web_tab") {
			return nself.invokeURL(serverDetails, custombuttonEmptymodal.wizButtonId);
		}
		else if (serverDetails.action === "custom_function" && serverDetails.custom_function.url && Object.keys(serverDetails.custom_function.url).length !== 0 && serverDetails.custom_function.url.constructor === Object) {
			nself.invokeURL(serverDetails.custom_function, custombuttonEmptymodal.wizButtonId);
		}
		else if (serverDetails.action === "circuits") {
			var isCircuitsPermissionAvailable = Crm.userDetails.permissions.hasOwnProperty("Crm_Implied_Advanced_Dev_Access") && Crm.userDetails.permissions.Crm_Implied_Advanced_Dev_Access;//NO I18N
			if (serverDetails.hasOwnProperty('circuits') && serverDetails.circuits.hasOwnProperty('circuitId') && !serverDetails.circuits.hasOwnProperty('scheduled') && isCircuitsPermissionAvailable && serverDetails.circuits.status === "success") {
				if (!serverDetails.circuits.hasOwnProperty('executionUrl')) {
					var executionLogsUrl = Crm.getCrmBasePath() + '/settings/circuits/executionLogs?circuit_id=' + serverDetails.circuits.circuitId;//NO I18N
					crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success') + ". " + "<span class='link1' onClick='networkUtils.openUrl(\"" + executionLogsUrl + "\", \"_blank\", \"\");'>" + I18n.getMsg('crm.circuits.rl.view.execution') + "</span>", 5000);  //No I18N
				} else {
					var executionLogsUrl = serverDetails.circuits.executionUrl, circuitName = serverDetails.circuits.name;
					crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success') + ". " + '<span class="link1" onClick="crmRelatedList.showCircuitPreview(\'' + executionLogsUrl + '\',\'' + circuitName + '\')">' + I18n.getMsg('crm.circuits.rl.view.execution') + "</span>", 5000);  //No I18N
				}
			} else if (serverDetails.hasOwnProperty('circuits') && serverDetails.circuits.hasOwnProperty('scheduled') && isCircuitsPermissionAvailable) {//no i18n
				crmui.showMsgBand("success", I18n.getMsg("crm.circuits.schedule.success"), 4000);//no i18n
			} else {
				crmui.showMsgBand('success', I18n.getMsg('crm.circuits.trigger.success'), 4000);  //No I18N
			}
			return;
		}
		if (serverDetails.custom_function && execution_status === "success" && creator_response) {
			Handlebars.registerPartial('cbSuccessPopup', Handlebars.templates.cbSuccessPopup);//No I18N
			$("body").append(Handlebars.templates.cbSuccessPopup());//eslint-disable-line @zoho/zstandard/no-body-events
			$("#cbSuccessPopup").addClass('zcrm-show');
			setTimeout(function () { $("#cbSuccessPopup").show(); }, 150)
			$("#cbSuccessPopupRespContent").text(creator_response);
			$("#cbExecutedPage").val("create");
		}
	},
	*/
	methods: {
		onCustomButtonBeforeShow: function (evt) {
			var cbBeforeShowCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onCustomButtonBeforeShow', onCustomButtonBeforeShow: { evt } });//no i18n
			return cbBeforeShowCBResponse.then(function (promiseResponse) {
				if (promiseResponse === false) {
					return false;
				}
				return true;
			}.bind(this));
		},
		onCustombuttonHide: function () {
			var cbSearchID = this.data.cbCommonData.cbSearchID, searchNode = $L('#' + cbSearchID)[0];//No i18n
			if (searchNode) {
				searchNode.setValue("");//No i18n
			}
		},
		searchCustomButtons: function (result) {
			Lyte.objectUtils(this.data.cbCommonData, "add", "showNoResultsMessage", result && result.length ? false : true);//No I18n
		}
	},
	getAPINameFromMergeField: function (mergeField) {
		var fieldsused = [], matcher, pattern = new RegExp(/\$\{([^\}].*?)\}/g);
		while (matcher = pattern.exec(mergeField)) {
			var moduleFields = matcher[1].split('.');
			var fieldData = {};
			fieldData.module = moduleFields[0];
			fieldData.module_field = moduleFields[1];
			if (moduleFields.length > 2) {
				fieldData.lookup_field = moduleFields[2];
			}
			fieldsused.push(fieldData);
		}
		return fieldsused;
	}
}, {
	mixins: [
		"crux-create-base-mixin",//No I18n
		"crux-entity-common-utils",//No I18n
		"crux-create-requesthandler-mixin"//No I18n
	]
});
Lyte.Component.register("crux-create-section", {
_template:"<template tag-name=\"crux-create-section\"> <template is=\"if\" value=\"{{isYieldSupported}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormCompleteSectionYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{sectionCurntInstObj.isValidSectionToRender}}\"><template case=\"true\"> <div style=\"{{cxHelperGetNodeDisplayValue(sectionCurntInstObj.isvalidSection,'section')}}\" class=\"cxcreateSectionInnerCont\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionHeaderYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> <div class=\"cxCreateSectionDetailsContainer\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropSection.generated_type,'===','default'),'&amp;&amp;',expHandlers(cxPropSection.name,'===','Record Image'))}}\"><template case=\"true\"> <div id=\"entityImageDiv\"></div> </template><template case=\"false\"><template is=\"if\" value=\"{{sectionCurntInstObj.isSubformSection}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(sectionCurntInstObj.haveVisiblefieldsInSubform,'&amp;&amp;',expHandlers(expHandlers(sectionCurntInstObj.subformPermissions,'!'),'||',expHandlers(sectionCurntInstObj.subformPermissions,'&amp;&amp;',sectionCurntInstObj.subformPermissions.viewable)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{sectionCurntInstObj.isSectionLabelYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionLabelYield}}\" cx-prop-section=\"{{cxPropSection}}\" yield-data-object=\"{{sectionCurntInstObj.yieldDataObject}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template><template case=\"false\"> <div id=\"{{concat('secHead_',sectionCurntInstObj.parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont\"> <div id=\"sectitle\" class=\"cxDIB\">{{cxPropSection.display_label}}</div> </div> </template></template> <crux-create-subformsection cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-subform-section=\"{{cxPropSection}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" is-subform=\"{{isSubform}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" yield-data-object=\"{{yieldDataObject}}\" cx-prop-section=\"{{cxPropSubformSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-subformsection> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(isQuickCreateSection,'!')}}\"><template case=\"true\"><div id=\"{{concat('secHead_',sectionCurntInstObj.parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont\"> <div id=\"sectitle\" class=\"cxDIB\">{{cxPropSection.display_label}}</div> </div></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSection.column_count,'===',1)}}\"><template case=\"true\"> <div class=\"cxCreateSingleContainer\"> <template items=\"{{sectionCurntInstObj.singleContainer}}\" item=\"sectionField\" index=\"index\" is=\"for\"> <crux-create-field container-name=\"singleContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> </template><template case=\"false\"> <div class=\"cxcreateSectionTwoColumn\"> <div class=\"cxCreateContainer1\"> <template is=\"for\" items=\"{{sectionCurntInstObj.leftContainer}}\" item=\"sectionField\" index=\"indO\"> <crux-create-field container-name=\"leftContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> <div class=\"cxCreateContainer2\"> <template items=\"{{sectionCurntInstObj.rightContainer}}\" item=\"sectionField\" index=\"index\" is=\"for\"> <crux-create-field container-name=\"rightContainer\" lyte-view-port=\"{{isLyteViewPort}}\" instance-obj-key=\"{{instanceObjKey}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-field-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{sectionField}}\" data-cy=\"{{sectionField.api_name}}\"> <template is=\"registerYield\" yield-name=\"cxCreateFormSectionYield\"> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-global-data=\"{{ydPropGlobalData}}\" yield-data-object=\"{{yieldDataObject}}\" yd-prop-actual-yield-name=\"{{ydPropActualYieldName}}\" cx-prop-section=\"{{cxPropSection}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> </crux-create-field> </template> </div> </div> </template></template> </template></template></template></template> </div> <lyte-yield yield-name=\"cxCreateFormLayoutContentYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormSectionFooterYield}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxHelperGetNodeDisplayValue","args":["sectionCurntInstObj.isvalidSection","'section'"]}}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"insertYield","position":[1,5]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropModuleData","sectionCurntInstObj","isYieldSupported","isQuickCreateSection","isLyteViewPort","cxPropSection"],
_observedAttributesType :["object","string","object","object","boolean","boolean","boolean","object"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			sectionCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			isYieldSupported: Lyte.attr("boolean", { "default": false }),//no i18n
			isQuickCreateSection: Lyte.attr("boolean", { "default": false }),//no i18n
			isLyteViewPort: Lyte.attr("boolean", { "default": false }),//no i18n
			cxPropSection: Lyte.attr('object', { 'default': {} })//no i18n
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropSection = this.data.cxPropSection;
		var currentInstObjKey = layoutComponentData.cxInternalUtilityObj && layoutComponentData.cxInternalUtilityObj.currentInstObjKey;
		if (currentInstObjKey && !Object.keys(this.data.sectionCurntInstObj || {}).length) {
			if (!Object.keys(cxPropSection[currentInstObjKey] || {}).length) {
				cxPropSection[currentInstObjKey] = {};
			}
			this.setData('sectionCurntInstObj', cxPropSection[currentInstObjKey]);
		}
		if (layoutComponentData.isLyteViewPort) {
			this.setData('isLyteViewPort', !!layoutComponentData.isLyteViewPort);
		}
		if (!layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta) {
			layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta = {};
		}
		layoutComponentData.cxInternalUtilityObj.nameVsSectionMeta[cxPropSection.name] = cxPropSection;
		var sectionCurntInstObj = this.data.sectionCurntInstObj, selectedLayoutid = layoutComponentData.cxPropLayoutId, currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;
		sectionCurntInstObj.tab_traversal = cxPropSection.tab_traversal, sectionCurntInstObj.type = cxPropSection.type;
		if ((cxPropSection.name === "Quick create" || cxPropSection.name === "Quick Create") && cxPropSection.generated_type === "default" && layoutComponentData.isQuickCreate) {
			sectionCurntInstObj.type = "used";//no i18n
			this.setData('isQuickCreateSection', true);
		}
		if (sectionCurntInstObj.type === "used") {
			sectionCurntInstObj.isValidSectionToRender = true;
		}
		var currentViewType = layoutComponentData.cxInternalUtilityObj.currentViewType ? layoutComponentData.cxInternalUtilityObj.currentViewType : (currentPage === "clone" ? "create" : currentPage);//no i18n
		var newArr, temparrL = [], temparrR = [], singleArr = [], seqNoPropertyKey = 'sequence_number';//no i18n
		if (this.data.isQuickCreateSection) {
			seqNoPropertyKey = "quick_sequence_number";
		}
		if (selectedLayoutid && cxPropSection.fields) {
			newArr = cxPropSection.fields.sort(function (field1, field2) {
				var field1_sequenceNumber, field2_sequenceNumber;
				field1_sequenceNumber = (field1[selectedLayoutid] && field1[selectedLayoutid].hasOwnProperty(seqNoPropertyKey) && field1[selectedLayoutid][seqNoPropertyKey]) ||
					(field1.hasOwnProperty(seqNoPropertyKey) && field1[seqNoPropertyKey]) || field1.sequence_number;
				field2_sequenceNumber = (field2[selectedLayoutid] && field2[selectedLayoutid].hasOwnProperty(seqNoPropertyKey) && field2[selectedLayoutid][seqNoPropertyKey]) ||
					(field2.hasOwnProperty(seqNoPropertyKey) && field2[seqNoPropertyKey]) || field2.sequence_number;
				return field1_sequenceNumber - field2_sequenceNumber;
			}.bind(this));
		} else {
			newArr = cxPropSection.fields;
		}
		newArr = newArr || [];
		var fldVisiblityCustomData = { currentPage };
		fldVisiblityCustomData.columnsToSkip = layoutComponentData.columnsToSkip || [];
		if (!fldVisiblityCustomData.columnsToSkip.includes('SALUTATION')) {
			fldVisiblityCustomData.columnsToSkip.push('SALUTATION');
		}
		fldVisiblityCustomData.apiNamesToSkip = layoutComponentData.apiNamesToSkip || [];
		let uiTypeToSkip = layoutComponentData.uiTypeToSkip || [];
		// 116-formula, 250-rich-text, 118-rollup_summary, 556-Image upload, 555-File upload
		let unsupportedUiTypes = [116, 118];
		unsupportedUiTypes.forEach((uiType) => {
			if (!uiTypeToSkip.includes(uiType)) {
				uiTypeToSkip.push(uiType);
			}
		});
		fldVisiblityCustomData.uiTypeToSkip = uiTypeToSkip;
		if (!cxPropSection.isSubformSection && currentViewType) {
			newArr.forEach(function (field) {
				if (!(this.isValidFieldToRender(field, fldVisiblityCustomData) && field.view_type[currentViewType])) {
					return;
				}
				if (cxPropSection.column_count === 1) {
					singleArr.push(field);
				} else {
					var sequenceNumber = field[selectedLayoutid] && field[selectedLayoutid].sequence_number || field.sequence_number;
					if (sequenceNumber % 2 != 0) {
						temparrL.push(field);
					} else {
						temparrR.push(field);
					}
				}
			}.bind(this));
		}
		Lyte.Component.set(sectionCurntInstObj, 'leftContainer', temparrL);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'rightContainer', temparrR);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'singleContainer', singleArr);//No i18n
		var yieldNeededSections = layoutComponentData.yieldNeededSections || {};
		if (yieldNeededSections.hasOwnProperty(cxPropSection.name)) {
			this.setData('isYieldSupported', true);
		}
		if (cxPropSection.isSubformSection || cxPropSection.type === "subforms") {
			sectionCurntInstObj.isSubformSection = true;
		}
		var isSubformFieldPresent, haveVisiblefieldsInSubform, fieldsLen = newArr.length;
		if (sectionCurntInstObj.isSubformSection) {
			for (var z = 0; z < fieldsLen; z++) {
				if (newArr[z].data_type === 'subform' || newArr[z].data_type === 'static_subform') {
					isSubformFieldPresent = true;
					sectionCurntInstObj.subform_apiname = newArr[z].api_name;
					sectionCurntInstObj.subformFieldId = newArr[z].id;
					sectionCurntInstObj.isMandatorySubform = newArr[z].required === true;
				} else if (newArr[z].column_name !== 'SERIAL_NUMBER' && !newArr[z].subform && newArr[z].visible && newArr[z].view_type[currentViewType]) {
					haveVisiblefieldsInSubform = true;
				}
			}
			if (!layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta) {
				layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta = {};
			}
			layoutComponentData.cxInternalUtilityObj.subformApinameVsSectionMeta[sectionCurntInstObj.subform_apiname] = cxPropSection;
		}
		if (sectionCurntInstObj.subform_apiname) {
			sectionCurntInstObj.subformPermissions = layoutComponentData.subformPermissions && layoutComponentData.subformPermissions[sectionCurntInstObj.subform_apiname];
		}
		Lyte.Component.set(sectionCurntInstObj, 'isunusedSubform', sectionCurntInstObj.isSubformSection && !isSubformFieldPresent ? true : false);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'isSubformSection', isSubformFieldPresent);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'haveVisiblefieldsInSubform', haveVisiblefieldsInSubform);//No i18n
		Lyte.Component.set(sectionCurntInstObj, 'parsedSectionLabel', cxPropSection.name.replace(/ |'/g, "_"));//No i18n
		this.setData('id', 'secDiv_' + this.data.sectionCurntInstObj.parsedSectionLabel);//no i18n
		for (var i = 0; i < fieldsLen; i++) {
			if (newArr[i].view_type[currentViewType] && this.isValidFieldToRender(newArr[i], fldVisiblityCustomData)) {
				Lyte.Component.set(sectionCurntInstObj, 'isvalidSection', true);//No i18n
				Lyte.Component.set(sectionCurntInstObj, 'haveValidFields', true);//No i18n
				break;
			}
		}
		if (!layoutComponentData.isQuickCreate && cxPropSection.generated_type === "default" && ["Businesss Card", "Quick create","Quick Create"].includes(cxPropSection.name)) {
			Lyte.Component.set(sectionCurntInstObj, 'isvalidSection', false);//No i18n
		}
	}
}, {
	mixins: [
		"crux-create-base-mixin",//No I18n
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",//No I18n
		"crux-entity-date-time-mixin"//No I18n
	]
});
Lyte.Component.register("crux-create-field", {
_template:"<template tag-name=\"crux-create-field\" data-cy=\"{{cxPropFieldData.api_name}}\" cx-error-focus-class=\"{{fieldCurntInstObj.errorFocusClass}}\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div id=\"cruxLoadingElem\" class=\"cxLoadOnViewElement\"> <div class=\"cxLoadOnViewLabel\"> {{cxPropFieldData.field_label}} <div class=\"cxLoadOnViewLoader\"></div> </div> <div class=\"cxLoadOnViewValue\"> {{cxPropFormData[cxPropFieldData.api_name]}} <div class=\"cxLoadOnViewLoader\"></div> </div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <div style=\"{{cxHelperGetNodeDisplayValue(fieldCurntInstObj.view_type[cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType],'field',fieldCurntInstObj.isHiddenInLayoutRules,fieldCurntInstObj.isCustomHidden)}}\" class=\"cruxFormFieldParentContainer\"> <template is=\"if\" value=\"{{isCustomComponentPresent}}\"><template case=\"true\"> <div class=\"{{expHandlers(isFirstNameField,'?:','cxFormFirstNameDiv cxcreateFormComponentRow','')}}\" lt-prop-tooltip-class=\"lcreateTooltip\" lt-prop-appearance=\"box\" lt-prop-title=\"{{fieldCurntInstObj.staticTooltipValue}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;,&quot;hidedelay&quot; : &quot;50&quot;}\" id=\"{{concat(fldId,'_FValue')}}\"> <template is=\"if\" value=\"{{customFieldComponentData.skipFieldLabel}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" component-data=\"{{customFieldComponentData.componentData}}\" form-data=\"{{cxPropFormData}}\" field-instance-details=\"{{fieldCurntInstObj}}\" field-meta=\"{{cxPropFieldData}}\" on-value-change=\"{{method('customCompValueChange',cxPropFieldData.api_name)}}\" get-init-component-data=\"{{method('getCustomComponentInitData',customFieldComponentData)}}\"> </template> </template><template case=\"false\"> <div class=\"cxcreateFormComponentRow cruxFormComponentRow\"> <div class=\"cxElementLabel\">{{cxPropFieldData.field_label}}</div> <div class=\"cxElementValue\"> <template is=\"if\" value=\"{{customFieldComponentData.isCruxComponent}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" cx-prop-field=\"{{cxPropFieldData}}\" cx-prop=\"{{customFieldComponentData.cxPropData}}\"> </template> </template><template case=\"false\"> <template is=\"component\" component-name=\"{{customFieldComponentData.componentName}}\" component-data=\"{{customFieldComponentData.componentData}}\" form-data=\"{{cxPropFormData}}\" field-meta=\"{{cxPropFieldData}}\" on-value-change=\"{{method('customCompValueChange',cxPropFieldData.api_name)}}\" get-init-component-data=\"{{method('getCustomComponentInitData',customFieldComponentData)}}\"> </template> </template></template> </div> </div> </template></template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{fieldCurntInstObj.fieldHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldHeaderYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> <div class=\"{{expHandlers(isFirstNameField,'?:','cxFormFirstNameDiv cxcreateFormComponentRow cruxFormComponentRow','')}}\" lt-prop-tooltip-class=\"lcreateTooltip\" lt-prop-appearance=\"box\" lt-prop-title=\"{{fieldCurntInstObj.staticTooltipValue}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;,&quot;hidedelay&quot; : &quot;50&quot;}\" id=\"{{concat(fldId,'_FValue')}}\"> <template is=\"if\" value=\"{{isFirstNameField}}\"><template case=\"true\"> <div class=\"cxElementLabel\">{{cxPropFieldData.field_label}}</div> <div class=\"{{cxSalutationFieldClasss}} cxElementValue\"> <crux-picklist-component on-value-change=\"{{method('salutationValueChange',fieldCurntInstObj.salutationFieldData.fieldMeta.api_name)}}\" cx-prop-from=\"{{fieldCurntInstObj.cxPropFrom}}\" cx-prop-id=\"{{salutationFldCurntInstObj.cxPropId}}\" cx-prop-zcqa=\"{{unbound(salutationFldCurntInstObj.fieldZcqaValue)}}\" cx-prop-option-info-tooltip=\"{{salutationFldCurntInstObj.optionInfoTooltip}}\" cx-prop-dropdown-zcqa=\"{{unbound(salutationFldCurntInstObj.fieldZcqaValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxSalutationFldDisplayValue}}\" cx-prop-field=\"{{fieldCurntInstObj.salutationFieldData.fieldMeta}}\"> </crux-picklist-component> <template is=\"component\" component-name=\"crux-{{fieldCurntInstObj.cruxType}}-component\" cx-prop-tooltip-class=\"lcreateTooltip\" cx-prop-id=\"{{fieldCurntInstObj.cxPropId}}\" cx-prop-dropdown-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tooltip=\"{{fieldCurntInstObj.staticTooltipValue}}\" cx-prop-info-tooltip=\"{{fieldCurntInstObj.infoTooltipValue}}\" cx-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;}\" cx-prop-freeze=\"false\" cx-prop-clear-error-message=\"false\" cx-prop-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tab-index=\"{{fieldCurntInstObj.tab_index}}\" cx-prop-autofocus=\"{{isAutofocusfield}}\" cx-prop-placeholder=\"{{if(shownonePlaceholder,cruxGetI18n('crm.label.picklist.none'),fieldCurntInstObj.placeholderValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxFieldDisplayValue}}\" id=\"{{unbound(fldId)}}\" cx-prop-disabled=\"{{fieldCurntInstObj.disabled}}\" cx-prop-readonly=\"{{fieldCurntInstObj.read_only}}\" class=\"{{cxHelpgetCruxComponentTemplateClass(cxPropFieldData,cxPropFormData[cxPropFieldData.api_name])}}\" cx-prop-maxlength=\"{{fieldCurntInstObj.length}}\" cx-prop-from=\"{{fieldCurntInstObj.cxPropFrom}}\" cx-prop-field=\"{{cxPropFieldData}}\" on-value-change=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" cx-prop-type=\"{{fieldCurntInstObj.cxPropType}}\" cx-prop-error-message=\"{{fieldCurntInstObj.errorMesage}}\" cx-prop-mandatory=\"{{fieldCurntInstObj.required}}\" cx-prop-disable-extra-value=\"true\" cx-prop-appearance=\"box\" cx-prop-error-yield=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\" on-error=\"{{method('onCruxElementValueError')}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-enable-lbind=\"false\"> </template> </div> </template><template case=\"false\"> <template is=\"component\" component-name=\"crux-{{fieldCurntInstObj.cruxType}}-component\" cx-prop-module=\"{{expHandlers(cxPropFieldData.lookup.module.api_name,'||',cxPropModuleData.module_name)}}\" cx-prop-icon-class=\"{{fieldCurntInstObj.lookupIconClass}} cxSprite\" fetch-module-data=\"{{method('fetchModuleData',cxPropFieldData)}}\" fetch-records=\"{{method('cxfetchLookupRecords',cxPropFieldData)}}\" cx-prop-currency-code=\"{{cxPropLayoutComponentData.cxPropCurrencyKey}}\" cx-prop-currency-details=\"{{cxPropLayoutComponentData.cxPropUserCurrencyData}}\" cx-prop-show-calculator=\"{{fieldCurntInstObj.showCalculator}}\" cx-prop-date-pattern=\"{{cxPropLayoutComponentData.cxPropDatePattern}}\" cx-prop-time-zone=\"{{cxPropLayoutComponentData.cxPropTimeZone}}\" cx-prop-time-format=\"{{cxPropLayoutComponentData.cxPropTimeFormat}}\" cx-prop-is-color-code-enabled=\"{{fieldCurntInstObj.enable_colour_code}}\" cx-prop-tooltip-class=\"lcreateTooltip\" cx-prop-tooltip=\"{{fieldCurntInstObj.staticTooltipValue}}\" cx-prop-info-tooltip=\"{{fieldCurntInstObj.infoTooltipValue}}\" cx-prop-id=\"{{fieldCurntInstObj.cxPropId}}\" cx-prop-tooltip-config=\"{&quot;position&quot; : &quot;followcursor&quot;,&quot;margin&quot; : &quot;10&quot;}\" cx-prop-freeze=\"false\" cx-prop-clear-error-message=\"false\" cx-prop-dropdown-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-picklist-values=\"{{fieldCurntInstObj.pick_list_values}}\" on-before-show=\"{{method(&quot;dropdownBeforeShow&quot;)}}\" cx-prop-zcqa=\"{{unbound(fieldCurntInstObj.fieldZcqaValue)}}\" cx-prop-tab-index=\"{{fieldCurntInstObj.tab_index}}\" cx-prop-autofocus=\"{{isAutofocusfield}}\" cx-prop-placeholder=\"{{if(shownonePlaceholder,cruxGetI18n('crm.label.picklist.none'),fieldCurntInstObj.placeholderValue)}}\" cx-prop-value=\"{{fieldCurntInstObj.cxFieldDisplayValue}}\" id=\"{{unbound(fldId)}}\" cx-prop-disabled=\"{{fieldCurntInstObj.disabled}}\" cx-prop-readonly=\"{{fieldCurntInstObj.read_only}}\" class=\"{{cxHelpgetCruxComponentTemplateClass(cxPropFieldData,cxPropFormData[cxPropFieldData.api_name])}}\" cx-prop-maxlength=\"{{fieldCurntInstObj.length}}\" cx-prop-from=\"{{unbound(fieldCurntInstObj.cxPropFrom)}}\" cx-prop-field=\"{{cxPropFieldData}}\" cx-prop-max-limit=\"{{fieldCurntInstObj.maxLimit}}\" on-value-change=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" before-request-change-data=\"{{method('onLookupBeforeRequestChangeData')}}\" on-clear=\"{{method('cruxValueChange',cxPropFieldData.api_name)}}\" max-user-drop-limit-err=\"{{method('onUserMaxLimiError')}}\" cx-prop-type=\"{{fieldCurntInstObj.cxPropType}}\" cx-prop-return-full-object-on-get=\"true\" cx-prop-create-yield=\"{{showQuickCreateButton}}\" cx-prop-footer-yield=\"{{showQuickCreateButton}}\" cx-prop-default-fields=\"{{fieldCurntInstObj.fieldOfLookupFields}}\" cx-prop-error-message=\"{{fieldCurntInstObj.errorMesage}}\" cx-prop-mandatory=\"{{fieldCurntInstObj.required}}\" cx-prop-disable-extra-value=\"true\" on-show=\"{{method('cruxOpenDropdown')}}\" on-hide=\"{{method(&quot;commonDropDownOnHide&quot;)}}\" cx-prop-appearance=\"box\" cx-prop-input-appearance=\"box\" cx-prop-field-key=\"{{unbound(fieldCurntInstObj.cruxFieldKey)}}\" cx-prop-filterable=\"false\" cx-prop-date-in-user-pattern=\"true\" cx-prop-datetime-in-user-pattern=\"true\" cx-prop-min-date=\"{{expHandlers(fieldCurntInstObj.min_date,'||','')}}\" cx-prop-max-date=\"{{expHandlers(fieldCurntInstObj.max_date,'||','')}}\" cx-prop-start-time=\"{{expHandlers(fieldCurntInstObj.start_time,'||','')}}\" cx-prop-end-time=\"{{expHandlers(fieldCurntInstObj.end_time,'||','')}}\" cx-prop-option-info-tooltip=\"{{fieldCurntInstObj.optionInfoTooltip}}\" on-error=\"{{method('onCruxElementValueError')}}\" cx-prop-related-name=\"{{fieldCurntInstObj.relatedRecordName}}\" cx-prop-related-module-id=\"{{fieldCurntInstObj.relatedRecordModuleId}}\" cx-prop-related-id=\"{{fieldCurntInstObj.relatedRecordId}}\" cx-prop-dont-show-related-dropdown=\"{{fieldCurntInstObj.dontShowRelatedDropdown}}\" cx-prop-search-format=\"true\" cx-prop-is-display-format-enabled=\"{{fieldCurntInstObj.isDisplayFormatEnabled}}\" cx-prop-prevent-focus-on-error=\"true\" cx-prop-enable-country-code=\"{{fieldCurntInstObj.isPhoneNoNewView}}\" cx-prop-error-yield=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\" cx-prop-enable-lbind=\"false\" cx-prop-text-area-resize=\"{&quot;horizontal&quot; : false, &quot;vertical&quot; : true }\"> <template is=\"registerYield\" yield-name=\"errorYield\"> <template is=\"if\" value=\"{{fieldCurntInstObj.isErrorYieldNeeded}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldErrorYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yield-data-object=\"{{fieldCurntInstObj.yieldDataObject}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> </template> <template is=\"registerYield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{showQuickCreateButton}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" data-zcqa=\"btn_Lookup_CreateNewRecord\" lt-prop-class=\"outlineprimaryflat mR0\" class=\"pR\" onclick=\"{{action('openQuickCreateForm',true)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[cxPropFieldData.lookup.module.id].singular_label}} </template> </lyte-button> </template></template> </template> <template is=\"registerYield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{showQuickCreateButton}}\"><template case=\"true\"> <div class=\"dropFooterList\" data-zcqa=\"AddNewRecord\" onclick=\"{{action('openQuickCreateForm',false)}}\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[cxPropFieldData.lookup.module.id].singular_label}} </div> </template></template> </template> </template> </template></template> </div> <template is=\"if\" value=\"{{fieldCurntInstObj.fieldFooterYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCreateFormSectionYield\" yd-prop-actual-yield-name=\"{{cxPropLayoutComponentData.cxFormYieldNames.cxFormFieldFooterYield}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template></template> </template></template> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"text","position":[2,1,1]},{"type":"text","position":[2,3,1]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"cxHelperGetNodeDisplayValue","args":["fieldCurntInstObj.view_type[cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType]","'field'","fieldCurntInstObj.isHiddenInLayoutRules","fieldCurntInstObj.isCustomHidden"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"component","position":[3,3],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]}]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropLayoutComponentData","cxPropModuleData","instanceObjKey","cxPropFieldSection","cxPropFieldData","cxPropFormData","fieldCurntInstObj","salutationFldCurntInstObj","yieldGlobalData","isCustomComponentPresent","isFirstNameField","showQuickCreateButton","customFieldComponentData","currentInstObjKey","containerName","cxSalutationFieldClasss","lyteViewPort"],
_observedAttributesType :["object","object","string","object","object","object","object","object","object","boolean","boolean","boolean","object","string","string","string","boolean"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropFieldSection: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFieldData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			fieldCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			salutationFldCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			yieldGlobalData: Lyte.attr("object", { "default": {} }), //no i18n
			isCustomComponentPresent: Lyte.attr("boolean", { "default": false }),//no i18n
			isFirstNameField: Lyte.attr("boolean", { "default": false }),//no i18n
			showQuickCreateButton: Lyte.attr("boolean", { "default": false }),//no i18n
			customFieldComponentData: Lyte.attr("object", { "default": {} }), //no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			containerName: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			cxSalutationFieldClasss: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			lyteViewPort: Lyte.attr("boolean", { "default": false })//no i18n
		}
	},
	init: function () {
		var layoutComponentData = this.data.cxPropLayoutComponentData, cxPropFieldData = this.data.cxPropFieldData, fieldUiType = cxPropFieldData.ui_type;
		var cxInternalUtilityObject = layoutComponentData.cxInternalUtilityObj || {};
		var currentInstObjKey = cxInternalUtilityObject && cxInternalUtilityObject.currentInstObjKey;
		this.setData('currentInstObjKey', currentInstObjKey || "");
		this.setData('cxPropFormData', layoutComponentData.cxPropFormData);
		if (cxInternalUtilityObject) {
			if (!cxInternalUtilityObject.layoutFieldApiVsSectionMeta) {
				cxInternalUtilityObject.layoutFieldApiVsSectionMeta = {};
			}
			cxInternalUtilityObject.layoutFieldApiVsSectionMeta[cxPropFieldData.api_name] = this.data.cxPropFieldSection;
		}
		if (currentInstObjKey && !Object.keys(this.data.fieldCurntInstObj || {}).length) {
			if (!Object.keys(cxPropFieldData[currentInstObjKey] || {}).length) {
				cxPropFieldData[currentInstObjKey] = {};
			}
			this.setData('fieldCurntInstObj', cxPropFieldData[currentInstObjKey]);
		}
		var fieldCurntInstObj = this.data.fieldCurntInstObj, selectedLayoutid = layoutComponentData.cxPropLayoutId;
		fieldCurntInstObj.cxPropFrom = 'create';
		fieldCurntInstObj.isCruxCreateField = true;
		if (['edit', 'clone'].includes(cxInternalUtilityObject.currentPage) && cxPropFieldData.columnName === "LAYOUTID") {
			fieldCurntInstObj.cxPropFrom = 'view';
		}
		if (cxPropFieldData[selectedLayoutid]) {
			var layoutSpecificProp = cxPropFieldData[selectedLayoutid];
			layoutSpecificProp = layoutSpecificProp || {};
			for (var prop in layoutSpecificProp) {
				if (!fieldCurntInstObj.hasOwnProperty(prop)) {
					fieldCurntInstObj[prop] = layoutSpecificProp[prop];
					if (prop === 'pick_list_values') {
						fieldCurntInstObj.originalPickListValues = Lyte.deepCopyObject(fieldCurntInstObj[prop]);
					} else if (prop === 'required' && layoutSpecificProp[prop]) {
						fieldCurntInstObj.isMandatoryByDefault = true;
					}
				}
			}
		}
		if (cxPropFieldData.read_only) {
			fieldCurntInstObj.isReadonlyByDefault = true;
		}
		if (!cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name]) {
			cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name] = {};
		}
		var class_list = this.getData('class');//no i18n
		class_list = class_list ? class_list : "";//No i18N
		let idclassObject = this.getFieldIdClassValues();
		let className = idclassObject.class, idName = idclassObject.id;
		fieldCurntInstObj.cxPropId = idName;
		class_list += (' ' + className);
		fieldCurntInstObj.fieldCompSelectorValue = '.' + className;
		this.setData('class', class_list);//No i18N
		var fieldListRequiredProperty = {
			mandatory: 'required', fieldLength: 'length', fieldId: 'id', fieldDataType: 'data_type',
			fieldUiType: 'ui_type', displayLabel: 'display_label', fieldLabel: 'field_label', isCustomField: 'custom_field',
			columnName: 'column_name', decimalPlace: 'decimal_place', json_type: 'json_type', lyteAtrrType: 'json_type'
		}
		for (var key in fieldListRequiredProperty) {
			cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = cxPropFieldData[fieldListRequiredProperty[key]];
			if (key === "lyteAtrrType") {
				switch (cxPropFieldData[fieldListRequiredProperty[key]]) {
					case 'double':
					case 'integer':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "string";//no i18n
						break;
					case 'jsonobject':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "object";//no i18n
						break;
					case 'jsonarray':
						cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "array";//no i18n
						break;
				}
				if (cxPropFieldData.ui_type === 208 && key === 'lyteAtrrType') {
					cxInternalUtilityObject.formFieldList[cxPropFieldData.api_name][key] = "object";//no i18n
				}
			}
		}
		this.addCustomValidationsforField({ formFieldList: cxInternalUtilityObject.formFieldList, cxPropFieldData });
		var instanceObjKeys = ["required", "read_only", "view_type", "tab_index", "length", "visible", "decimal_place", "tooltip"], instanceObjKeysLen = instanceObjKeys.length;
		for (var n = 0; n < instanceObjKeysLen; n++) {
			var fieldProp = instanceObjKeys[n];
			if (!fieldCurntInstObj.hasOwnProperty(fieldProp)) {
				let _value = cxPropFieldData[fieldProp];
				if (cxPropFieldData.ui_type === 208 && fieldProp === 'read_only' && ['clone', 'edit'].includes(cxInternalUtilityObject.currentPage)) {
					_value = true;
				}
				fieldCurntInstObj[fieldProp] = typeof _value === 'object' && _value ? Lyte.deepCopyObject(_value) : _value;
			}
		}
		/**
		 *  --> commented to fix the lock-icon not showing for read-only fields
			if (!fieldCurntInstObj.hasOwnProperty('disabled')) {
				fieldCurntInstObj.disabled = fieldCurntInstObj.read_only;
			}
		*/
		var cxPropFormData = layoutComponentData.cxPropFormData;
		//setting Default value in record - for picklist,multi-select picklist
		if (cxPropFieldData.data_type === "picklist" || cxPropFieldData.data_type === "multiselectpicklist") {
			var finalPicklistObj = this.getMapDependencyOptions({ layoutComponentData, cxPropFieldData });
			fieldCurntInstObj.mapDependencyDetails = finalPicklistObj.mapDependencyDetails;
			fieldCurntInstObj.enable_colour_code = cxPropFieldData.enable_colour_code;
			if (!layoutComponentData.cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
				if (cxPropFieldData.data_type === "picklist") {
					var otherValue = (fieldCurntInstObj.pick_list_values && fieldCurntInstObj.pick_list_values[0] && fieldCurntInstObj.pick_list_values[0].display_value) || '-None-';
					if (cxPropFieldData.column_name === 'CURRENCYISOCODE' && layoutComponentData.cxPropCurrencyKey) {
						let currencyValues = fieldCurntInstObj.pick_list_values || [],
							keyMap = currencyValues.map(pl => { return pl.display_value; });
						if (keyMap.indexOf(layoutComponentData.cxPropCurrencyKey) !== -1) {
							otherValue = layoutComponentData.cxPropCurrencyKey;
						}
					}
					cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value ? fieldCurntInstObj.default_value : otherValue;
				} else {
					cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value ? [fieldCurntInstObj.default_value] : [];
				}
			}
		}
		if (cxPropFieldData.data_type === "lookup") {
			let fieldOfLookupDetails = cxInternalUtilityObject.fieldOfLookupDetails || {};
			if (fieldOfLookupDetails.hasOwnProperty(cxPropFieldData.api_name)) {
				let detailsArray = fieldOfLookupDetails[cxPropFieldData.api_name] || [],
					apiArray = detailsArray.map((flds) => {
						return flds.lookupModuleMapField.api_name;
					});
				fieldCurntInstObj.fieldOfLookupFields = { api_names: apiArray };
			}
		}
		fieldCurntInstObj.lookupIconClass = this.getLookupIconClass(cxPropFieldData);
		let customCompFields = layoutComponentData.customFieldComponents || {},
			isCustomComponentPresent, customFieldComponentData,
			supportedProperties = ['data_type', 'ui_type', 'column_name', 'api_name'],
			sLen = supportedProperties.length,
			fieldMetaProperty;
		if (customCompFields && !this.isEmptyObj(customCompFields)) {
			for (let s = 0; s < sLen; s++) {
				let currentProperty = supportedProperties[s];
				if (customCompFields[currentProperty] && typeof customCompFields[currentProperty] === 'object' && customCompFields[currentProperty].hasOwnProperty(cxPropFieldData[currentProperty])) {
					isCustomComponentPresent = true;
					customFieldComponentData = customCompFields[currentProperty][cxPropFieldData[currentProperty]];
					fieldMetaProperty = currentProperty;
					break;
				}
			}
		}
		if (isCustomComponentPresent && customFieldComponentData && fieldMetaProperty) {
			this.setData('isCustomComponentPresent', true);
			this.setData('customFieldComponentData', customCompFields[fieldMetaProperty][cxPropFieldData[fieldMetaProperty]]);
		}
		if (this.data.containerName) {
			this.data.yieldGlobalData.containerName = this.data.containerName;
		}
		//set default value for owner field
		if (cxInternalUtilityObject.currentPage === 'create' && cxPropFieldData.ui_type === 8 && !cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			var userDetails = layoutComponentData.userDetails || {};
			if (!this.isEmptyObj(userDetails)) {
				var userObj = { id: userDetails.USER_ID, name: userDetails.DISPLAY_NAME };
				cxPropFormData[cxPropFieldData.api_name] = userObj;
			}
		}
		//set default value for checkbox field
		if (!cxPropFormData.hasOwnProperty(cxPropFieldData.api_name) && cxInternalUtilityObject.currentPage !== 'edit' && cxPropFieldData.data_type === "boolean" && fieldCurntInstObj.default_value) {
			cxPropFormData[cxPropFieldData.api_name] = fieldCurntInstObj.default_value;
		}
		if (['phone'].includes(cxPropFieldData.data_type)) {
			let isPhoneNoNewView = typeof Crm !== "undefined" && Crm.userDetails ? Crm.userDetails.isPhoneNoNewView : false;
			fieldCurntInstObj.isPhoneNoNewView = isPhoneNoNewView;
		}
		this.setExchangeRateValue({ cxPropFormData, currencyDetail: layoutComponentData.cxPropCurrencyData, cxPropFieldData });
		this.setErrorDetailsInDom();
		this.setFieldValueInDom();
		this.setSalutationFieldData();
		this.setFieldTooltipValues();
		//better to call it at the end of the init
		this.setFieldSpecificConfigs();
	},
	methods: {
		// Functions which can be used as callback in the component.
		cruxValueChange: function (fieldApiName, fieldValue) {
			this.cxValueChange(fieldApiName, fieldValue);
		},
		salutationValueChange: function (fieldApiName, fieldValue) {
			var cxPropFormData = this.data.cxPropFormData;
			Lyte.Component.set(cxPropFormData, fieldApiName, fieldValue);
			//callback to the user on field value change
			let cbObject = {
				fieldApiName,
				fieldValue,
				cxPropFormData,
				fieldMeta: this.data.cxPropFieldData
			},
				onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormValueChange', onFormValueChange: cbObject });//no i18n
			onValueChangeCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				}
			});
		},
		customCompValueChange: function (fieldApiName, fieldValue) {
			this.cxValueChange(fieldApiName, fieldValue);
		},
		onCruxElementValueError: function (errors) {
			this.setFieldErrorDetailsInRecord(errors);
		},
		dropdownBeforeShow: function () {
			//dropdownBeforeShow - crux
		},
		cruxOpenDropdown: function () {
			//cruxOpenDropdown - crux
		},
		commonDropDownOnHide: function () {
			//commonDropDownOnHide - crux
		},
		setdropdownData: function () {
			//setdropdownData - crux
		},
		getCustomComponentInitData: function (customFieldComponentData, requiredCompDataProperties) {
			return this.getComponentInitData({ customFieldComponentData, requiredCompDataProperties });
		},
		onUserMaxLimiError: function () {
			_cruxUtils.showCustomMessage({
				params: {
					ltPropMessage: _cruxUtils.getI18n("crm.field.maxlimit.mxnuser.warning", this.data.fieldCurntInstObj.maxLimit), //no i18n
					ltPropType: "warning",
					ltPropDuration: 4000
				}
			});
		}
	},
	setFieldValueInRecord: function (fieldApiName, fieldValue) {
		let cxPropFormData = this.data.cxPropFormData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			fieldMeta = this.data.cxPropFieldData,
			currentInstObjKey = this.data.currentInstObjKey,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			formModelFieldObj = layoutCompData.cxInternalUtilityObj.formFieldList;

		fieldApiName = fieldApiName || fieldMeta.api_name;

		var finalValue = this.getTypeConvertedFieldValue(formModelFieldObj, fieldApiName, fieldValue), basicLookupFieldValue = {};
		if (fieldMeta.data_type === "lookup") {
			finalValue = finalValue || {};
			let value = {}; value.id = finalValue.id; value.name = finalValue.name
			basicLookupFieldValue = this.isEmptyObj(finalValue) ? undefined : value;
			var lookupNode = this.$node.querySelector('crux-lookup-component');//no i18n
			if (lookupNode && lookupNode.component) {
				fieldMeta[currentInstObjKey].selectedLookupRecFullData = fieldValue;
			}
			finalValue = basicLookupFieldValue;
		}
		if (fieldMeta.data_type === "datetime" && finalValue) {
			let dateTimeNode = this.$node.querySelector('crux-date-time-component');//no i18n
			finalValue = dateTimeNode && dateTimeNode.component.getValue({ userFormat: true }) || finalValue;
		}
		if (["ownerlookup", "userlookup"].indexOf(fieldMeta.data_type) !== -1) {
			var userLookupNode = this.$node.querySelector('crux-user-component');//no i18n
			if (userLookupNode && userLookupNode.component) {
				fieldMeta[currentInstObjKey].selectedLookupRecFullData = userLookupNode.component.data.cxPropUserRecord;
			}
			finalValue = finalValue || {};
			let value = {}; value.id = finalValue.id; value.full_name = finalValue.full_name;
			basicLookupFieldValue = this.isEmptyObj(finalValue) ? undefined : value;
			finalValue = basicLookupFieldValue;
		}
		if ("multiuserlookup" === fieldMeta.data_type) {
			finalValue = this.getMultiUserLookupDataForRecord({
				selectedIds: finalValue,
				currentPage: layoutCompData.cxInternalUtilityObj.currentPage,
				fieldMeta,
				originalFieldValue: layoutCompData.originalEntityRecordData && layoutCompData.originalEntityRecordData[fieldMeta.api_name]
			});
		}
		Lyte.Component.set(cxPropFormData, fieldApiName, finalValue);
		fieldCurntInstObj.cxFieldDisplayValue = finalValue;
		return finalValue;
	},
	cxValueChange: function (fieldApiName, fieldValue) {
		let cxPropFormData = this.data.cxPropFormData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			fieldMeta = this.data.cxPropFieldData,
			currentInstObjKey = this.data.currentInstObjKey;
		let finalValue = this.setFieldValueInRecord(fieldApiName, fieldValue);
		//Map Dependency flow
		if (layoutCompData.cxInternalUtilityObj.mapDependencyFields.indexOf(fieldApiName) !== -1) {
			this.setMapDependencyOption({ cxPropFormData, layoutCompData, fieldApiName, fieldValue: finalValue, fieldMeta, currentInstObjKey });
		}
		//Currency Conversion
		if (fieldMeta.column_name === "CURRENCYISOCODE") {
			this.handleCurrencyConversion({ layoutCompData, cxPropFormData, selectedCurrency: finalValue });
		}
		//Field of Lookup Execution
		this.processFieldsOfLookup({ selectedLookupRecord: fieldMeta[currentInstObjKey].selectedLookupRecFullData, layoutCompData, cxPropFormData, currentInstObjKey, fieldMeta });
		//Parent Form - Formula execution
		this.processModuleFormulaFields(fieldApiName);
		//LayoutRule Execution - need to executed at the end only
		this.processLayoutRules();
		//callback to the user on field value change
		var cbObject = { fieldApiName, fieldValue, cxPropFormData, fieldMeta };
		var onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onFormValueChange', onFormValueChange: cbObject });//no i18n
		onValueChangeCBResponse.then(function (promiseResponse) {
			let skippedExecution = true;
			if (promiseResponse === false) {
				return { skippedExecution };
			}
		});
	},
	getFieldIdClassValues: function () {
		let moduleName = this.data.cxPropModuleData.module_name,
			columnName = this.data.cxPropFieldData.column_name,
			currentInstObjKey = this.data.currentInstObjKey;
		let finalClass = (currentInstObjKey || "") + 'Cx' + moduleName + columnName,
			finalId = `idProp_${currentInstObjKey || ""}_${moduleName}_${columnName}`;
		return { class: finalClass, id: finalId };
	},
	setErrorDetailsInDom: function () {
		var fieldCurntInstObj = this.data.fieldCurntInstObj, currentError = fieldCurntInstObj.fieldErrorDetails;
		Lyte.Component.set(fieldCurntInstObj, 'isErrorYieldNeeded', false);//no i18n
		if (currentError && currentError.message) {
			var finalErrorMessage = currentError.message;
			if (!currentError.ignoreActualErrorMessage) {
				finalErrorMessage = this.getActualErrorMessage({ errorData: currentError, fieldMeta: this.data.cxPropFieldData });
			}
			Lyte.Component.set(fieldCurntInstObj, 'errorMesage', finalErrorMessage);//no i18n
		} else {
			Lyte.Component.set(fieldCurntInstObj, 'errorMesage', "");//no i18n
		}
	},
	setFieldValueInDom: function (fieldMeta) {
		var fieldCurntInstObj = this.data.fieldCurntInstObj,
			cxPropFormData = this.data.cxPropFormData,
			cxPropFieldData = fieldMeta || this.data.cxPropFieldData,
			layoutCompData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		if (cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			let fieldValue = cxPropFormData[cxPropFieldData.api_name];
			if (cxPropFieldData.ui_type === 208 && ['clone', 'edit'].includes(cxUtilityObj.currentPage)) {
				fieldValue = fieldValue.name || fieldValue;
			}
			if (cxPropFieldData.column_name === "SALUTATION") {
				Lyte.Component.set(fieldCurntInstObj, 'cxSalutationFldDisplayValue', fieldValue);//no i18n
			} else {
				Lyte.Component.set(fieldCurntInstObj, 'cxFieldDisplayValue', fieldValue);//no i18n
			}
		}
	},
	setSalutationFieldData: function () {
		let fieldData = this.data.cxPropFieldData,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			currentInstObjKey = this.data.currentInstObjKey,
			layoutCompData = this.data.cxPropLayoutComponentData,
			cxUtilityObj = layoutCompData.cxInternalUtilityObj;
		let formConfigurations = layoutCompData.formConfigurations || {};
		if (fieldData.column_name === "FIRSTNAME") {
			let sal_class = 'cxSalutationElemWrapper cxFormFirstNameDiv';
			if (fieldCurntInstObj.required) {
				sal_class += ' cxSalutationMandatory';
			}
			this.data.cxSalutationFieldClasss = sal_class;
			this.data.isFirstNameField = true;
			fieldCurntInstObj.salutationFieldData = {};
			let sal_Obj = {};
			sal_Obj.fieldMeta = cxUtilityObj.layoutFieldApiVsMetaObject.Salutation;
			let salFldCurntInstObj = sal_Obj.fieldMeta[currentInstObjKey];
			let finalId = `idProp_${currentInstObjKey || ""}_${sal_Obj.fieldMeta.column_name}`;
			salFldCurntInstObj.cxPropId = finalId;
			this.setFormConfigurations({
				cxPropFieldData: sal_Obj.fieldMeta,
				fieldCurntInstObj: salFldCurntInstObj,
				formConfigurations
			}, layoutCompData);
			if (!salFldCurntInstObj.hasOwnProperty('fieldZcqaValue') || !salFldCurntInstObj.fieldZcqaValue) {
				salFldCurntInstObj.fieldZcqaValue = sal_Obj.fieldMeta.field_label;
			}
			this.setData('salutationFldCurntInstObj', salFldCurntInstObj || {});
			fieldCurntInstObj.salutationFieldData = sal_Obj;
			this.setFieldValueInDom(sal_Obj.fieldMeta);
		}
	},
	setFieldTooltipValues: function () {
		let fieldMeta = this.data.cxPropFieldData,
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			infoTooltipValue = '', staticTooltipValue = '';

		let tooltipDetails = (!this.isEmptyObj(fieldCurntInstObj.tooltip) && fieldCurntInstObj.tooltip) ||
			(!this.isEmptyObj(fieldMeta.tooltip) && fieldMeta.tooltip);
		if (tooltipDetails) {
			if (tooltipDetails.name === 'Info Icon') {
				infoTooltipValue = tooltipDetails.value;
				Lyte.Component.set(fieldCurntInstObj, 'placeholderValue', '');
			} else if (tooltipDetails.name === 'Static Text') {
				staticTooltipValue = tooltipDetails.value;
				if (!fieldCurntInstObj.ignorePlaceholderValue) {
					Lyte.Component.set(fieldCurntInstObj, 'placeholderValue', staticTooltipValue);
				}
			}
		}
		if (fieldCurntInstObj.read_only) {
			staticTooltipValue = _cruxUtils.getI18n('crm.lable.read.only'); //no i18n
		}
		Lyte.Component.set(fieldCurntInstObj, 'staticTooltipValue', staticTooltipValue);
		Lyte.Component.set(fieldCurntInstObj, 'infoTooltipValue', infoTooltipValue);
	},
	setFieldSpecificConfigs: function () {
		let layoutComponentData = this.data.cxPropLayoutComponentData,
			formConfigurations = layoutComponentData.formConfigurations || {},
			fieldCurntInstObj = this.data.fieldCurntInstObj,
			currentModuleData = this.data.cxPropModuleData,
			cxPropFormData = this.data.cxPropFormData,
			cxPropFieldData = this.data.cxPropFieldData;

		this.setFormConfigurations({
			cxPropFieldData,
			fieldCurntInstObj,
			formConfigurations
		}, layoutComponentData);
		if ([36, 143, 144, 145].includes(cxPropFieldData.ui_type)) {
			fieldCurntInstObj.showCalculator = true;
		}
		if (cxPropFieldData.data_type === 'multiuserlookup') {
			fieldCurntInstObj.maxLimit = 10;
		}
		if (!this.isEmptyObj(layoutComponentData.originalEntityRecordData) &&
			!fieldCurntInstObj.hasOwnProperty('originalFieldValue')) {
			fieldCurntInstObj.originalFieldValue = layoutComponentData.originalEntityRecordData[cxPropFieldData.api_name];
		}
		if ([301, 300].includes(cxPropFieldData.ui_type) && !cxPropFormData.hasOwnProperty(cxPropFieldData.api_name)) {
			cxPropFormData[cxPropFieldData.api_name] = [true, false].includes(cxPropFieldData.default_value) ? cxPropFieldData.default_value : false;
		}
		if (['multiselectlookup', 'lookup'].includes(cxPropFieldData.data_type)) {
			let showQCButton = this.isQuickCreateButtonNeeded(layoutComponentData, cxPropFieldData);
			this.setData('showQuickCreateButton', showQCButton);//no i18n
		}
		if (!fieldCurntInstObj.hasOwnProperty('fieldZcqaValue') || !fieldCurntInstObj.fieldZcqaValue) {
			fieldCurntInstObj.fieldZcqaValue = cxPropFieldData.field_label;
		}
		let cruxElementContainerClass = '';
		if (this.data.isFirstNameField) {
			cruxElementContainerClass += ' cxFormFirstNameDiv cxcreateFormComponentRow cruxFormComponentRow';//no i18n
		}
		fieldCurntInstObj.cruxElementContainerClass = cruxElementContainerClass;
		fieldCurntInstObj.cruxComponentName = `crux-${fieldCurntInstObj.cruxType}-component`;//no i18n
		fieldCurntInstObj.cxPropFieldModule = (cxPropFieldData.lookup && cxPropFieldData.lookup.module && cxPropFieldData.lookup.module.api_name) || (currentModuleData && currentModuleData.module_name) || "";//no i18n
		fieldCurntInstObj.cruxFieldKey = this.data.isFirstNameField ? '' : 'field_label';//no i18n
	},
	setFieldErrorDetailsInRecord: function (errors) {
		let errorMap = {
			"value_empty": "ERR01",
			"value_invalid": "ERR02",
			"decimal_check": "ERR03",
			"maxlength_check": "ERR04",
			"maxdate_check": "ERR05",
			"mindate_check": "ERR06"
		};
		let cxPropFormData = this.data.cxPropFormData,
			fieldMeta = this.data.cxPropFieldData,
			errorObject = cxPropFormData.$RECORD__Error__Object || {},
			currentErrorCode = errorMap[errors],
			existingError = errorObject[fieldMeta.api_name];
		let updateError = !errorObject.hasOwnProperty(fieldMeta.api_name) ||
			(existingError && existingError.code !== currentErrorCode);
		if (updateError) {
			switch (errors) {
				case 'value_empty':
					errorObject[fieldMeta.api_name] = { "code": "ERR02", "message": "Mandatory field cannot be empty" };//no i18n
					break;
				case 'value_invalid':
					errorObject[fieldMeta.api_name] = { "code": "ERR03", "message": "Type of value does not match the specified data type" };//no i18n
					break;
			}
		}
	},
	getMultiUserLookupDataForRecord: function (dataObject) {
		let { selectedIds, currentPage, fieldMeta, originalFieldValue } = dataObject,
			connectAPiname = fieldMeta && fieldMeta.multiuserlookup.connectedlookup_apiname,
			finArr = [];
		let existingData = originalFieldValue && originalFieldValue.users || [],
			existingDataLength = existingData && existingData.length;
		let newSelectedIds = selectedIds;
		if (selectedIds && Array.isArray(selectedIds) && selectedIds.length) {
			newSelectedIds = selectedIds.map(function (idDetails) {
				let actualId = idDetails;
				if (idDetails && idDetails.id) {
					actualId = idDetails.id;
				}
				return actualId;
			});
		}
		switch (currentPage) {
			case 'create':
			case 'clone':
				newSelectedIds.forEach(function (id) {
					let singleObj = {};
					singleObj[connectAPiname] = { 'id': id };
					let usrRecord = store.peekRecord('user', id);//no i18n
					if (usrRecord && usrRecord.full_name) {
						singleObj[connectAPiname].name = usrRecord.full_name;
					}
					finArr.push(singleObj);
				});
				break;
			case 'edit':
				let existingRec = [], newRec = [], removeRec = [];
				for (var l = 0; l < existingDataLength; l++) {
					if (newSelectedIds.includes(existingData[l][connectAPiname].id)) {
						existingRec.push(existingData[l][connectAPiname].id);
					} else {
						removeRec.push(existingData[l][connectAPiname].id);
					}
				}
				let currL = newSelectedIds.length;
				for (var lm = 0; lm < currL; lm++) {
					if (!(existingRec.includes(newSelectedIds[lm]) || removeRec.includes(newSelectedIds[lm]))) {
						newRec.push(newSelectedIds[lm]);
					}
				}
				removeRec.forEach(function (rA) {
					var a = Lyte.deepCopyObject(existingData.filter(function (usr) { return usr[connectAPiname].id === rA })[0]);
					a._delete = null;
					finArr.push(a);
				});
				newRec.forEach(function (nA) {
					var b = {};
					b[connectAPiname] = { id: nA };
					let usrRecord = store.peekRecord('user', nA);//no i18n
					if (usrRecord && usrRecord.full_name) {
						b[connectAPiname].name = usrRecord.full_name;
					}
					finArr.push(b);
				});
				break;
		}
		return finArr.length ? { users: finArr } : {};
	},
	//Field Instance Object - Observers - Start
	observeTooltipValueChange: function () {
		this.setFieldTooltipValues();
	}.observes('fieldCurntInstObj.setTooltipValue'),//no i18n
	observeFieldValueChange: function () {
		this.setFieldValueInDom();
	}.observes('fieldCurntInstObj.setValueIntoDom'),//no i18n
	observeValidation: function () {
		let cruxNode = this.$node.querySelector('.cxCreateElementCommonClass');//no i18n
		if (cruxNode && cruxNode.component && cruxNode.component.validate) {
			cruxNode.component.validate();
		}
	}.observes('fieldCurntInstObj.triggerCruxValidation'),//no i18n
	observeSalutationFieldValueChange: function () {
		let salutationMeta = this.data.fieldCurntInstObj.salutationFieldData && this.data.fieldCurntInstObj.salutationFieldData.fieldMeta;
		this.setFieldValueInDom(salutationMeta);
	}.observes('salutationFldCurntInstObj.setValueIntoDom'),//no i18n
	observeErrorDetails: function () {
		this.setErrorDetailsInDom();
	}.observes('fieldCurntInstObj.observeErrorDetails'),//no i18n
	triggerValueChangeCallback: function () {
		var cxPropFormData = this.data.cxPropFormData, cxPropFieldData = this.data.cxPropFieldData;
		this.cxValueChange(cxPropFieldData.api_name, cxPropFormData[cxPropFieldData.api_name]);
	}.observes('fieldCurntInstObj.triggerValueChangeCallback'),//no i18n
	observeLayoutRuleTrigger: function () {
		this.processLayoutRules();
	}.observes('fieldCurntInstObj.triggerLayoutRules')//no i18n
	//End
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-common-rules-utils",
		"crux-create-rules-mixin",
		"crux-formula-utils",
		"crux-entity-date-time-mixin",
		"crux-create-requesthandler-mixin",
		"crux-create-formcallbacks-mixin"
	]
});//No I18n
Lyte.Component.register("crux-create-comments-component", {
_template:"<template tag-name=\"crux-create-comments-component\"> <template is=\"if\" value=\"{{cxPropField[cxPropFieldKey]}}\"><template case=\"true\"> <div class=\"cxElementLabel {{cxPropLabelClass}}\">{{cxPropField[cxPropFieldKey]}}</div> </template></template> <div class=\"cxElementValue {{expHandlers(cxPropClass,'||','')}} {{expHandlers(cxPropDisabled,'?:','cxElementDisabled','')}} {{expHandlers(cxPropReadonly,'?:','cxElementReadOnly','')}}\"> <template items=\"{{commentsDetails}}\" item=\"comment\" index=\"index\" is=\"for\"> <div class=\"cx-comments-section\"> <pre class=\"cx-comments-info\" wrap=\"soft\">{{comment.commentInfo}}</pre> <div class=\"cx-commented-time\">{{comment.commented_time}}</div> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}],
_observedAttributes :["cxPropFieldData","cxPropValue","cxPropClass","cxPropLabelClass","cxPropDisabled","cxPropReadonly","cxPropFieldKey","cxPropTimeFormat","commentsDetails"],
_observedAttributesType :["object","array","string","string","boolean","boolean","string","string","array"],

    data: function () {
        return {
            cxPropFieldData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropValue: Lyte.attr('array', { default: [] }),//no i18n
            cxPropClass: Lyte.attr("string", { default: '' }),//No I18n
            cxPropLabelClass: Lyte.attr("string", { default: "" }), //NO I18n
            cxPropDisabled: Lyte.attr("boolean", { default: false }),//No I18n
            cxPropReadonly: Lyte.attr("boolean", { default: false }),//No I18n
            cxPropFieldKey: Lyte.attr("string", { default: "" }),//No I18n
            cxPropTimeFormat: Lyte.attr("string", { default: typeof Crm !== 'undefined' && Crm.userDetails && Crm.userDetails.TIME_FORMAT }),//No I18n
            commentsDetails: Lyte.attr('array', { default: [] })//no i18n
        };
    },
    init: function () {
        this.setCommentsDetails();
    },
    setCommentsDetails: function () {
        let commentsDetails = [],
            cxPropValue = this.data.cxPropValue || [];
        if (cxPropValue && cxPropValue.length) {
            let is24HourFormat = this.data.cxPropTimeFormat && this.data.cxPropTimeFormat.indexOf('a') !== -1 ? false : true,
                outputFormat = !is24HourFormat ? "ddd, DD MMM YYYY hh:mm A" : "ddd, DD MMM YYYY HH:mm";//no i18n
            cxPropValue.forEach((comment) => {
                if (comment) {
                    let eachCommentDetails = {
                        commentInfo: comment.comment_content
                    };
                    let momentInfo = $L.moment(comment.commented_time);
                    if (momentInfo && momentInfo._isValid) {
                        let final_commented_time = momentInfo.i18N(outputFormat);
                        eachCommentDetails.commented_time = `${comment.commented_by} ${_cruxUtils.getI18n('on')} ${final_commented_time}`;
                    }
                    commentsDetails.push(eachCommentDetails);
                }
            });
            this.setData('commentsDetails', commentsDetails.reverse());
        }
    }
});
Lyte.Component.register("crux-create-subformsection", {
_template:"<template tag-name=\"crux-create-subformsection\" cx-error-focus-class=\"{{subSectionCurntInstObj.errorFocusClass}}\"> <crux-subform cx-prop-type=\"{{expHandlers(expHandlers(cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType,'===','quick_create'),'?:','create',cxPropLayoutComponentData.cxInternalUtilityObj.currentViewType)}}\" cx-prop-section=\"{{cxPropSubformSection}}\" cx-prop-content=\"{{cxPropFormData}}\" cx-prop-limit-rows=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropLimitRows}}\" cx-prop-show-filter-icon=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropShowFilterIcon}}\" cx-prop-show-add-row-button=\"{{expHandlers(expHandlers(subSectionCurntInstObj.cruxSubformProperties.cxPropShowAddRowButton,'===',false),'?:',false,true)}}\" cx-prop-show-delete-row-button=\"{{expHandlers(expHandlers(subSectionCurntInstObj.cruxSubformProperties.cxPropShowDeleteRowButton,'===',false),'?:',false,true)}}\" cx-prop-show-scroll-to-top=\"{{subSectionCurntInstObj.cruxSubformProperties.cxPropShowScrollToTop}}\" on-value-change=\"{{method('subformValueChange')}}\" cx-prop-currency-data=\"{{cxPropLayoutComponentData.cxPropCurrencyData}}\" disable-error-callback=\"true\" fetch-records=\"{{method('cxSubformfetchLookupRecords')}}\" on-subform-error=\"{{method('onCxSubformError')}}\" cx-prop-phone-properties=\"{{subSectionCurntInstObj.subformPhoneProps}}\" cx-prop-module-data=\"{{cxPropModuleData}}\" disable-criteria=\"true\" cx-prop-prevent-focus-on-error=\"{{subSectionCurntInstObj.preventFocusOnError}}\" cx-prop-lookup-properties=\"{{subSectionCurntInstObj.cruxSubformLookupProps}}\" cx-prop-disable-delete=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.deletable,'!'),false)}}\" cx-prop-disable-edit=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.editable,'!'),false)}}\" cx-prop-disable-create=\"{{if(subSectionCurntInstObj.subformPermissions,expHandlers(subSectionCurntInstObj.subformPermissions.creatable,'!'),false)}}\" cx-prop-module-sections=\"{{cxPropLayoutComponentData.cxPropLayoutSections}}\"> <template is=\"yield\" yield-name=\"createYield\"> <template is=\"if\" value=\"{{isQuickCreateSupported(cxPropLayoutComponentData,fieldObj,cxPropLayoutComponentData.subformConfigurations[subformApiname])}}\"><template case=\"true\"> <lyte-button lt-prop-appearance=\"default\" data-zcqa=\"btn_Lookup_CreateNewRecord\" lt-prop-class=\"outlineprimaryflat mR0\" class=\"pR\" onclick=\"{{action('openQuickCreateForm',true,true,fieldObj,cruxLookupElmId,subSectionCurntInstObj,recordObj)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[fieldObj.lookup.module.id].singular_label}} </template> </lyte-button> </template></template> </template> <template is=\"yield\" yield-name=\"footer\"> <template is=\"if\" value=\"{{isQuickCreateSupported(cxPropLayoutComponentData,fieldObj,cxPropLayoutComponentData.subformConfigurations[subformApiname])}}\"><template case=\"true\"> <div class=\"dropFooterList\" data-zcqa=\"AddNewRecord\" onclick=\"{{action('openQuickCreateForm',false,true,fieldObj,cruxLookupElmId,subSectionCurntInstObj,recordObj)}}\"> {{cruxGetI18n(\"New\")}} {{cxPropLayoutComponentData.cxInternalUtilityObj.lookupModuleMetaInfo[fieldObj.lookup.module.id].singular_label}} </div> </template></template> </template> <template is=\"yield\" yield-name=\"body-customFieldYieldContent\"> <template is=\"if\" value=\"{{fieldObj[instanceObjKey].customFieldComponentData.isCruxComponent}}\"><template case=\"true\"> <template is=\"component\" class=\"cxSubformField\" cx-prop-field=\"{{fieldObj}}\" component-name=\"{{fieldObj[instanceObjKey].customFieldComponentData.componentName}}\" cx-prop=\"{{fieldObj[instanceObjKey].customFieldComponentData.cxPropData}}\"> </template> </template></template> </template> </crux-subform> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]},{"type":"text","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["cxPropLayoutComponentData","instanceObjKey","cxPropModuleData","cxPropFormData","cxPropSubformSection","subSectionCurntInstObj","subformApiname","currentPage","subformLookupProps","currentInstObjKey"],
_observedAttributesType :["object","string","object","object","object","object","string","string","object","string"],

	data: function () {
		return {
			cxPropLayoutComponentData: Lyte.attr('object', { 'default': {} }),//no i18n
			instanceObjKey: Lyte.attr("string", { "default": "" }),//no i18n
			cxPropModuleData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropFormData: Lyte.attr('object', { 'default': {} }),//no i18n
			cxPropSubformSection: Lyte.attr('object', { 'default': {} }),//no i18n
			subSectionCurntInstObj: Lyte.attr("object", { "default": {} }), //no i18n
			subformApiname: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			currentPage: Lyte.attr("string", { "default": "", "hideAttr": true }),//no i18n
			subformLookupProps: Lyte.attr("object", { "default": {} }), //no i18n
			currentInstObjKey: Lyte.attr("string", { "default": "", "hideAttr": true })//no i18n
		}
	},
	init: function () {
		let layoutComponentData = this.data.cxPropLayoutComponentData, cxPropSubFormSecData = this.data.cxPropSubformSection,
			currentInstObjKey = layoutComponentData.currentInstObjKey;
		this.setData({
			'currentInstObjKey': currentInstObjKey || "",
			'cxPropFormData': layoutComponentData.cxPropFormData,
			'currentPage': layoutComponentData.cxInternalUtilityObj.currentPage
		});
		if (currentInstObjKey && !Object.keys(this.data.subSectionCurntInstObj || {}).length) {
			if (!Object.keys(cxPropSubFormSecData[currentInstObjKey] || {}).length) {
				cxPropSubFormSecData[currentInstObjKey] = {};
			}
			this.setData('subSectionCurntInstObj', cxPropSubFormSecData[currentInstObjKey]);
		}
		var subSectionCurntInstObj = this.data.subSectionCurntInstObj, instanceObjKeys = ["display_label", "tab_traversal", "properties", "name", "column_count", "api_name"], instanceObjKeysLen = instanceObjKeys.length;
		subSectionCurntInstObj.cruxSubformProperties = (layoutComponentData.cxPropSubformProperties || {});
		subSectionCurntInstObj.preventFocusOnError = true;
		for (var n = 0; n < instanceObjKeysLen; n++) {
			var fieldProp = instanceObjKeys[n];
			if (!subSectionCurntInstObj.hasOwnProperty(fieldProp)) {
				subSectionCurntInstObj[fieldProp] = typeof subSectionCurntInstObj[fieldProp] === 'object' && subSectionCurntInstObj[fieldProp] ? Lyte.deepCopyObject(cxPropSubFormSecData[fieldProp]) : cxPropSubFormSecData[fieldProp];
			}
		}
		subSectionCurntInstObj.subformPhoneProps = {};
		if (subSectionCurntInstObj.cruxSubformProperties && subSectionCurntInstObj.cruxSubformProperties.hasOwnProperty('enableCountryCode')) {
			Lyte.Component.set(subSectionCurntInstObj.subformPhoneProps, 'enableCountryCode', subSectionCurntInstObj.cruxSubformProperties.enableCountryCode);
		} else {
			Lyte.Component.set(subSectionCurntInstObj.subformPhoneProps, 'enableCountryCode', false);
		}
		var cxPropFormData = this.data.cxPropFormData;
		this.setData('subformApiname', subSectionCurntInstObj.subform_apiname || "");//no i18n
		this.setData('id', `cxCreateSubform_${this.data.subformApiname}`);//no i18n
		if (subSectionCurntInstObj.subform_apiname && !subSectionCurntInstObj.cruxSubformProperties.isSubformRecordSupported) {
			var subformRecords = cxPropFormData[subSectionCurntInstObj.subform_apiname];
			if ((!subformRecords || !subformRecords.length)) {
				cxPropFormData[subSectionCurntInstObj.subform_apiname] = [];
				cxPropFormData[subSectionCurntInstObj.subform_apiname].push({});
			}
		}
		subSectionCurntInstObj.subformPermissions = layoutComponentData.subformPermissions && layoutComponentData.subformPermissions[this.data.subformApiname] || {};
		if (subSectionCurntInstObj.subformPermissions && subSectionCurntInstObj.subformPermissions.subformPermissionMessage) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.subformPermissionMessage = subSectionCurntInstObj.subformPermissions.subformPermissionMessage;
			existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
		}
		if (subSectionCurntInstObj.isMandatorySubform) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.isMandatorySubform = true;
			existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
			Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryStyle', 'red_accent_line');//no i18n
		}
		this.setLookupIconClass();
		let currentSubformDetails = layoutComponentData.cxInternalUtilityObj.subFormFieldApiVsMetaObject && layoutComponentData.cxInternalUtilityObj.subFormFieldApiVsMetaObject[this.data.subformApiname] || {};
		for (let fieldApiName in currentSubformDetails) {
			let customCompFields = layoutComponentData.customFieldComponents || {},
				isCustomComponentPresent, customFieldComponentData,
				supportedProperties = ['data_type', 'ui_type', 'column_name', 'api_name'],
				sLen = supportedProperties.length,
				fieldMetaProperty,
				fieldData = currentSubformDetails[fieldApiName],
				sfieldCurntInstObj = fieldData[currentInstObjKey] || {};
			if (customCompFields && !this.isEmptyObj(customCompFields)) {
				for (let s = 0; s < sLen; s++) {
					currentProperty = supportedProperties[s];
					if (customCompFields[currentProperty] && typeof customCompFields[currentProperty] === 'object' && customCompFields[currentProperty].hasOwnProperty(fieldData[currentProperty])) {
						isCustomComponentPresent = true;
						customFieldComponentData = customCompFields[currentProperty][fieldData[currentProperty]];
						fieldMetaProperty = currentProperty;
						break;
					}
				}
			}
			if (isCustomComponentPresent && customFieldComponentData && fieldMetaProperty) {
				sfieldCurntInstObj.isCustomComponentPresent = true;
				sfieldCurntInstObj.customFieldComponentData = customCompFields[fieldMetaProperty][fieldData[fieldMetaProperty]];
				fieldData.yieldName = 'customFieldYieldContent';//no i18n
			}
		}
	},
	setLookupIconClass: function () {
		let currentSubformDetails = this.data.cxPropLayoutComponentData.cxInternalUtilityObj.subFormFieldDatatypeVsMetaObject[this.data.subformApiname];
		let existingProps = (this.data.subSectionCurntInstObj.cruxSubformLookupProps || {});
		if (currentSubformDetails) {
			if (currentSubformDetails.lookup && currentSubformDetails.lookup.length) {
				currentSubformDetails.lookup.forEach((lookupField) => {
					if (!existingProps[lookupField.api_name]) {
						existingProps[lookupField.api_name] = {};
					}
					existingProps[lookupField.api_name].iconClass = `${this.getLookupIconClass(lookupField)} cxSprite`;
					existingProps[lookupField.api_name].searchFormat = true;
				});
			}
		}
		Lyte.Component.set(this.data.subSectionCurntInstObj, 'cruxSubformLookupProps', existingProps);//no i18n
	},
	didConnect: function () {
		let subSectionCurntInstObj = this.data.subSectionCurntInstObj, cruxSubformNode = this.$node.querySelector('crux-subform');//no i18n
		if (cruxSubformNode && cruxSubformNode.evaluateModuleFormula) {
			subSectionCurntInstObj.evaluateModuleFormula = function (apiName) {
				cruxSubformNode.evaluateModuleFormula(apiName);
			}.bind(this);
		}
	},
	methods: {
		subformValueChange: function (apiName, rowId, componentName, value, element) {
			let cbObject = {
				apiName, rowId,
				componentName, value, element,
				cxPropFormData: this.data.cxPropFormData,
				subformApiname: this.data.subformApiname
			};
			var onValueChangeCBResponse = this.invokeCruxFormCallBacks({ callbackEventName: 'onSubformValueChange', onSubformValueChange: cbObject });//no i18n
			onValueChangeCBResponse.then(function (promiseResponse) {
				let skippedExecution = true;
				if (promiseResponse === false) {
					return { skippedExecution };
				}
			});
		},
		cxSubformfetchLookupRecords: function (moduleId, queryParams, fieldMeta) {
			return this.invokeCruxFormCallBacks({ callbackEventName: 'fetchLookupRecords', fetchLookupRecords: { moduleId, queryParams, fieldMeta } });//no i18n
		},
		onCxSubformError: function (errorObj) {
			errorObj = errorObj || {};
			let { cxMandatorySubformError, cxApiName, cxRowId, cxErrorNode } = errorObj,
				subSectionCurntInstObj = this.data.subSectionCurntInstObj;
			if (cxMandatorySubformError && subSectionCurntInstObj.isMandatorySubform) {
				this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
				let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
				existingYieldData.isMandatorySubform = true;
				existingYieldData.isSubformSection = true;
				Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
				Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryError', true);//no i18n
				Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryStyle', 'red_accent_line');//no i18n
			}
			if (cxApiName) {
				subSectionCurntInstObj.latestSubformError = { cxApiName, cxRowId, cxErrorNode };
			}
		}
	},
	clearMandatorySubformError: function () {
		let subSectionCurntInstObj = this.data.subSectionCurntInstObj;
		if (subSectionCurntInstObj.isMandatorySubform) {
			this.setData('subSectionCurntInstObj.isSectionLabelYield', true);//no i18n
			let existingYieldData = subSectionCurntInstObj.yieldDataObject || {};
			existingYieldData.isMandatorySubform = true; existingYieldData.isSubformSection = true;
			Lyte.Component.set(subSectionCurntInstObj, 'yieldDataObject', existingYieldData);//no i18n
			Lyte.Component.set(subSectionCurntInstObj.yieldDataObject, 'mandatoryError', false);//no i18n
		}
	},
	//subform Instance Object - Observers - Start
	observeTooltipValueChange: function () {
		this.clearMandatorySubformError();
	}.observes('subSectionCurntInstObj.toggleMandatorySubformError')//no i18n
	//subform Instance Object - Observers - End
}, {
	mixins: [
		"crux-create-base-mixin",
		"crux-entity-common-utils",
		"crux-create-formcallbacks-mixin"
	]
});
Lyte.Component.registerHelper("cxHelperGetNodeDisplayValue", function (showNode, source, isHiddenInLayoutRules, isCustomHidden) { //No I18n
    var val = "display : ", blockValue = (val + "block !important;"), hiddenValue = (val + "none !important;");//No I18n
    if (source === "section") {
        return showNode ? blockValue : hiddenValue;
    } else if (source === "field") {
        return showNode && !(isHiddenInLayoutRules || isCustomHidden) ? blockValue : hiddenValue;
    }
});
Lyte.Component.registerHelper("cxHelpgetCruxComponentTemplateClass", function (fieldMeta, val, isSubform) { //no i18n
    var classVal = "cxCreateElementCommonClass";
    if (["userlookup", "ownerlookup", "multiuserlookup"].indexOf(fieldMeta.data_type) !== -1) {
        classVal = classVal + " cxClassUserLookup";
    }
    if (!isSubform) {
        classVal = classVal + " cxcreateFormComponentRow cruxFormComponentRow";
    }
    return classVal;
});
Lyte.Component.registerHelper("cxHelpisValuePresent", function (valueToLookFor, stringToBeSplitted) { //no i18n
    //splits the string by comma(,) and looks for value in it
    if (stringToBeSplitted && typeof stringToBeSplitted == "string") {
        return stringToBeSplitted.split(',').indexOf(valueToLookFor) !== -1;
    }
});
Lyte.Component.registerHelper("cxGetSubformFieldWidth", function (subFldMeta, tableOriginalWidth) { //no i18n
    var type = subFldMeta.ui_type, cName = subFldMeta.column_name;
    type = cName === 'SERIAL_NUMBER' ? 'a' : type;//no i18n
    var returnWidth = "195px";//no i18n
    switch (type) {
        case 'a':
            returnWidth = "75px"; //no i18n
            break;
        case 1:
        case 11:
        case 25:
        case 37:
        case 35:
        case 33:
        case 19:
        case 127:
        case 21:
            returnWidth = "265px"; //no i18n
            break;
        case 2:
        case 133:
        case 221:
            returnWidth = tableOriginalWidth >= 1410 ? "195px" : "265px"; //no i18n
            returnWidth = cName === "PRODUCTID" ? "345px" : returnWidth; //no i18n
            break;
        case 110:
        case 100:
        case 3:
            returnWidth = tableOriginalWidth >= 1410 ? "315px" : "365px"; //no i18n
            break;
        case 555:
            returnWidth = tableOriginalWidth >= 1410 ? "315px" : "365px"; //no i18n
            break;
        case 24:
        case 202:
            returnWidth = tableOriginalWidth >= 1410 ? "125px" : "145px"; //no i18n
            break;
        case 333:
            returnWidth = "268px"; //no i18n
            break;
        case 301:
            returnWidth = "91px"; //no i18n
            break;
        case 52:
        case 34:
        case 32:
        case 36:
        case 38:
        case 143:
        case 144:
        case 145:
            returnWidth = tableOriginalWidth >= 1410 ? "160px" : "160px";//no i18n
            var widthObj = { "QUANTITY": "110px", "TAX": "158px", "DISCOUNT": "170px" };//no i18n
            if (widthObj.hasOwnProperty(cName)) {
                returnWidth = widthObj[cName];
            }
            break;
        case 116:
            returnWidth = tableOriginalWidth >= 1410 ? "155px" : "195px";//no i18n
            returnWidth = "NETTOTAL,TOTAL".indexOf(cName) !== -1 ? "171px" : returnWidth;//no i18n
            break;
    }
    return returnWidth;
});
Lyte.Component.registerHelper('cxGetSubformFieldClass', function (subFldMeta) { //no i18n
    var type = subFldMeta.ui_type, cName = subFldMeta.column_name;
    type = cName === 'SERIAL_NUMBER' ? 'a' : type;//no i18n
    switch (type) {
        case 'a':
            return "cxSubFrmSnFld"; //no i18n
        case 1:
        case 11:
        case 25:
        case 37:
        case 35:
        case 33:
        case 19:
        case 127:
        case 21:
            return ""; //no i18n
        case 110:
        case 3:
            return "cxSubFrmMulLinFld"; //no i18n
        case 100:
            return "cxSubFrmMulSelFld"; //no i18n
        case 2:
            return "cxSubFrmSelFld"; //no i18n
        case 24:
        case 202:
            return "cxSubFrmDateFld";//no i18n
        case 333:
            return "cxSubFrmDateAndTimeFld";//no i18n
        case 301:
            return "cxNSubFrmCheckBFld";//no i18n
        case 133:
            var returnClass = "cxSubFrmLookupFld";//no i18n
            if (cName === "PRODUCTID") {
                returnClass += " cxSubInvDefaultProdLookupFLd";//no i18n
                //no i18n
            }
            return returnClass;
        case 221:
            return "cxSubFrmUserLookupFld";//no i18n
        case 52:
            return "cxSubFrmLongIntFld";//no i18n
        case 34:
            return "cxSubFrmPrecentFld";//no i18n
        case 38:
            return "cxSubFrmDecimalFld";//no i18n
        case 36:
        case 143:
        case 144:
        case 145:
            return "cxSubFrmCurncyFld";//no i18n
        case 32:
            return "cxSubFrmNumbFld";//no i18n
        case 116:
            return "cxSubFrmFormulaFld";//no i18n
        case 555:
            return "cxSubFrmFileUploadFld";//no i18n
    }
});
Lyte.Component.registerHelper("cxGetSubformFieldValues", function (fieldInfo, recordData, fType, currentTime, currentPage, isdefaultInvSubform) { //no i18n
    var fValue = recordData[fieldInfo.api_name];
    switch (fieldInfo.data_type) {
        case 'multiselectpicklist':
            if (currentPage === 'clone' && fieldInfo.default_value && fValue === '[]') {
                fValue = JSON.stringify([fieldInfo.default_value]);
            }
            if (fValue && typeof fValue == 'string') {
                try {
                    fValue = JSON.parse(fValue);
                } catch (e) {
                    fValue = fValue.split('; ');
                }
            }
            if (fValue && fValue.length) {
                return fValue;
            } else {
                return 'None';//no i18n
            }
        case 'datetime':
            if (fValue) {
                var t, cT;
                if (fValue.indexOf('TV') == -1) {
                    t = fValue.split(' ');
                    cT = t.length >= 2 ? t.length == 2 ? t[1] : t[1] + ' ' + t[2].toUpperCase() : '';
                } else {
                    t = fValue.split('TV');
                    cT = t.length >= 2 ? t[1] : '';
                }
                if (fType == 'date') {
                    return t[0];
                } else if (fType == 'time') { //no i18n
                    return cT;
                }
            } else {
                return currentTime;
            }
        case 'picklist':
            if (currentPage === 'clone' && fieldInfo.default_value && !fValue) {
                return fieldInfo.default_value;
            } else {
                return "-None-";//no i18n
            }
        case 'userlookup':
            if (currentPage === 'clone' && fieldInfo.default_value && !fValue) {
                return fieldInfo.default_value;
            } else {
                return "None";//no i18n
            }
        case 'fileupload':
            if (currentPage === 'clone') {
                return [];
            }
            else if (fValue) {
                var details = [];
                var fls = fileupload.uploadedFileObject ? fileupload.uploadedFileObject : [];
                var fllen = fls.length;
                if (fValue.length > 0) {
                    if (fValue[0].attachment_Id === undefined) {
                        for (var k = 0; k < fllen; k++) {
                            if (fls[k].fieldId === fieldInfo.id
                                && fValue[0].file_id === fls[k].encryptedUploadId) {
                                var flobj = {};
                                flobj.file_Size = fls[k].fileSize && parseInt(fls[k].fileSize) !== 0 ? fileupload.formatBytes(fls[k].fileSize, 2) : "";
                                flobj.file_Name = fls[k].fileName;
                                flobj.attachment_Id = fls[k].uploadId;
                                flobj.fromService = fls[k].fromService;
                                flobj.currView = currentPage;
                                details.push(flobj);

                            }
                        }
                    }
                    else {
                        return fValue;
                    }

                }
                return details;
            }
            else {
                return fValue ? fValue : [];
            }
        case 'lookup':
            if (fValue) {
                if (fieldInfo.column_name === "PRODUCTID" && !fieldInfo.custom_field && isdefaultInvSubform) {
                    var pCode = fieldInfo.lookup.show_fields && fieldInfo.lookup.show_fields[0].field.api_name === 'Product_Code' && fieldInfo.lookup.show_fields[0].show_data ? recordData[fieldInfo.api_name].Product_Code : undefined
                    return pCode ? recordData[fieldInfo.api_name].name + ' (' + pCode + ')' : recordData[fieldInfo.api_name].name
                } else {
                    return recordData[fieldInfo.api_name].name
                }
            } else {
                return '';
            }
    }
});
Lyte.Component.registerHelper("cxneedAlignright", function (datatype) { //no i18n
    switch (datatype) {
        case 'double':
        case 'bigint':
        case 'integer':
        case 'currency':
        case 'formula':
            return true;
        default:
            return false;
    }
});
Lyte.Component.registerHelper("cxIsValuePresent", function (valueToLookFor, stringToBeSplitted) { //no i18n
    //splits the string by comma(,) and looks for value in it
    if (stringToBeSplitted && typeof stringToBeSplitted == "string") {
        return stringToBeSplitted.split(',').indexOf(valueToLookFor) !== -1;
    }
});
Lyte.Component.registerHelper('cxArithResult', function (param1, param2, operator) { //No I18N
    param1 = parseFloat(param1);
    param2 = parseFloat(param2);
    switch (operator) {
        case "+": return param1 + param2;
        case "-": return param1 - param2;
        case "*": return param1 * param2;
        case "/": return param1 / param2;
        case "%": return param1 % param2;
    }
});
Lyte.Component.registerHelper("cxShowIntegLayoutSearch", function (layoutDropdownData) { //no i18n
    layoutDropdownData = layoutDropdownData || [];
    let count = layoutDropdownData.filter((ddData) => { return ddData.source !== "crm" }).length;//no i18n
    count++;//for offline layout
    return count >= 8;
});
Lyte.Component.registerHelper("cxShowLayoutSearch", function (layoutDropdownData, moduleName, wizardData) { //no i18n
    layoutDropdownData = layoutDropdownData || [];
    let count = layoutDropdownData.length;
    if (moduleName === "Campaigns") {
        count = layoutDropdownData.filter((ddData) => { return ddData.source === "crm" }).length;//no i18n
    }
    if (wizardData instanceof Array) {
        var wizLength = wizardData.length
        for (var i = 0; i < wizLength; i++) {
            count = count + wizardData[i].layouts.length
        }
    }
    return count >= 8;
});
Lyte.Component.registerHelper("isQuickCreateSupported", (layoutComponentData, cxPropFieldData, currentSubformConfiguration) => {
    let showQCButton = false;
    if (layoutComponentData.isQuickCreate) {
        showQCButton = false;
    } else {
        showQCButton = true;
        if (cxPropFieldData.lookup && cxPropFieldData.lookup.module && cxPropFieldData.lookup.module.api_name &&
            ['Quotes', 'Purchase_Orders', 'Sales_Orders', 'Invoices', 'Price_Books', 'Services__s'].includes(cxPropFieldData.lookup.module.api_name)) {
            showQCButton = false;
        }
        if (currentSubformConfiguration && currentSubformConfiguration.api_name && currentSubformConfiguration.api_name.hasOwnProperty(cxPropFieldData.api_name) && currentSubformConfiguration.api_name[cxPropFieldData.api_name].isLookupQuickCreateSupported === false) {
            showQCButton = false;
        }
    }
    return showQCButton;
});

//# sourceMappingURL=crux-create-form.js.map