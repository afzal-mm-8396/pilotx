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
