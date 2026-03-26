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