Lyte.Mixin.register("crm-crux-module-mixin", { //No I18n
    setProperty: function (layout, customData) {
        var layoutId = layout.id;
        var sections = layout.sections;
        if (sections) {
            var sectionsLength = sections.length;
            var lay_fields = [];
            var module = layout.module ? layout.module.id : undefined;
            if (customData && customData.set_available_user_layout && (layout.status === "active" || layout.status === "hidden")) {
                var profileName = store.peekRecord("user", Crm.userDetails.USER_ID).profile.name; //No I18n
                var isProfileAvail = layout.profiles.find(x => x.name === profileName);
            }
            for (var j = 0; j < sectionsLength; j++) {
                var section = sections[j];
                if (customData && customData.apiVersion && customData.apiVersion === "2.2") {
                    section.uid = section.id;
                }
                section.id = layoutId + "_" + j;
                var fields = section.fields;
                var fieldsLength = fields.length;
                for (var k = 0; k < fieldsLength; k++) {
                    var field = fields[k];
                    //need to show "lead name" instead of "full name" for leads and contact module alone.
                    if (field.column_name === "FULLNAME") {
                        let mod_info = store.peekRecord("module", module);//no i18n
                        if (mod_info && ["Leads", "Contacts"].indexOf(mod_info.api_name) !== -1 && mod_info.singular_label) {
                            field.field_label = field.display_label = I18n.getMsg("crm.label.vendor.name", mod_info.singular_label);//no i18n
                        }
                    }

                    if (section.isSubformSection) {
                        field.subform_api = true;
                    }
                    //added subform check, since it is setting subform fields into entity module fields
                    if (customData && customData.moduleSet && (customData.subformModuleSet || !field.subform_api || field.subform_api && (field.data_type === "subform" || field.data_type === "static_subform"))) {
                        field.module = module ? [module] : [];
                    }
                    if (isProfileAvail) {
                        field.available_in_user_layout = true;
                    }
                    lay_fields.push(field.id);
                    /*handling for static lookup criteria being over written*/
                    if (field.lookup && field.lookup.query_details) {
                        const cachedField = store.peekRecord("field", field.id);//no i18n
                        if (cachedField && cachedField.lookup && cachedField.lookup.query_details) {
                            field.lookup.query_details.criteria = cachedField.lookup.query_details.criteria || field.lookup.query_details.criteria;
                        }
                    }
                    var NewField = [];
                    if (field.pick_list_values && field.pick_list_values.length) {
                        NewField = store.peekAll("field").filterBy({ id: field.id });//no i18n
                    }
                    if (section.type === "used" || section.screen || (!customData || customData.from !== "lyteCreate")) { //added for sequence num mismatch when business card fields,quick create fields comes in layoutCache req
                        if (field.pick_list_values && field.pick_list_values.length) {
                            if (!store.model.field.fieldList.hasOwnProperty(layoutId)) {
                                store.addField("field", layoutId, "object");//No I18n
                                field[layoutId] = { pick_list_values: field.pick_list_values, default_value: field.default_value };
                            } else if (validationUtils.isNotEmpty(field[layoutId])) {
                                var temp = field[layoutId];
                                temp.pick_list_values = field.pick_list_values;
                                temp.default_value = field.default_value;
                                field[layoutId] = temp;
                            } else {
                                field[layoutId] = { pick_list_values: field.pick_list_values, default_value: field.default_value };
                            }
                            //id fix for ZCRM-92662
                            if (NewField[0] && NewField[0].pick_list_values && !(customData && customData.peekField === false)) {
                                field.pick_list_values = NewField[0].pick_list_values;
                            }
                            if (field.enable_colour_code) {
                                field.picklist_colour_codes = field.pick_list_values.slice(0);
                            }
                            field.colour_code_enabled = field.enable_colour_code;
                        }

                        if (field.sequence_number !== undefined) {
                            if (!store.model.field.fieldList.hasOwnProperty(layoutId)) {
                                store.addField("field", layoutId, "object");//No I18n
                                field[layoutId] = { sequence_number: field.sequence_number, required: field.required };
                                if (field.data_type === "boolean" && field.default_value) {
                                    field[layoutId].default_value = field.default_value;
                                }
                            }
                            else if (validationUtils.isNotEmpty(field[layoutId])) {
                                let temp = field[layoutId];
                                temp.sequence_number = field.sequence_number;
                                temp.required = field.required;
                                if (field.data_type === "boolean" && field.default_value) {
                                    temp.default_value = field.default_value;
                                }
                                field[layoutId] = temp;
                            } else {
                                field[layoutId] = { sequence_number: field.sequence_number, required: field.required };
                                if (field.data_type === "boolean" && field.default_value) {
                                    field[layoutId].default_value = field.default_value;
                                }
                            }
                        }
                        if (field.convert_mapping) {
                            if (field[layoutId] === undefined) {
                                field[layoutId] = {};
                            }
                            field[layoutId].convert_mapping = field.convert_mapping;
                        }
                    }
                    if(field.sequence_number !== undefined){
						var key=layoutId+'_'+section.id;
						field[key] = {sequence_number : field.sequence_number};
					}
                    if (NewField[0] && NewField[0].pick_list_values && customData && customData.peekField === false) {
                        delete field.pick_list_values;
                    }
                }
            }
            if (store.model.layout.fieldList.hasOwnProperty("fields")) {
                layout.fields = lay_fields;
            }
        }
    },
    addSubformFieldsintoLyteModel: function (currSec) {
        var isubform = false, layout_id;
        if (currSec) {
            currSec.forEach(function (sec) {
                var field = {};
                field.id = Lyte.attr('string');//No I18N
                isubform = false;
                var isInventorySubform;
                if (sec.isSubformSection && sec.fields) {
                    sec.fields.forEach(function (fields) {
                        if (fields.data_type === 'subform' || fields.data_type === 'static_subform') {
                            isubform = true;
                            layout_id = fields.subform ? fields.subform.id : fields.associated_module.id;
                            if (["Invoiced_Items", "Purchase_Items", "Ordered_Items", "Quoted_Items"].includes(fields.api_name)) {
                                isInventorySubform = true;
                            }
                        }
                        else if (!fields.subform) {
                            field[fields.api_name] = Lyte.attr(Lyte.registeredMixins["crm-crux-module-mixin"].getfieldattributeType(fields));
                            field[fields.api_name].fieldID = fields.id;
                            field[fields.api_name].uiType = fields.ui_type;
                            field[fields.api_name].columnName = fields.column_name;
                            field[fields.api_name].fieldType = fields.data_type;
                            field[fields.api_name].length = fields.length;
                            field[fields.api_name].displayLabel = fields.display_label;
                            field[fields.api_name].isCustomField = fields.custom_field;
                            if (fields.column_name === "LINETAX") {
                                field[fields.api_name].watch = true;
                            }
                        }
                    });
                }
                var _model = store.model[layout_id];
                if (_model && isubform && field) {
                    //to handle reordering subform in edit case
                    field.__CUSTOM_sequence_NUMBER__ = { type: 'string' };//no i18n
                    field.removedRow = { type: 'string' };//no I18n
                    if (isInventorySubform) {
                        field.$clone_reference_id = { type: 'string' };//no I18n
                    }
                    for (var key in field) {
                        if (!_model.fieldList[key]) { // added this check for same module lookup issue ->validation removes
                            store.addField(layout_id, key, field[key].type, field[key], undefined, true);
                        }
                    }
                }
            });
        }
    },
    getfieldattributeType: function (fieldList) {
        var attrType;
        if (fieldList.ui_type === 116 && crmConstants.entityforumlaMapping[fieldList.formula.return_type]) {
            attrType = crmConstants.entityforumlaMapping[fieldList.formula.return_type];
        } else if (fieldList.ui_type === 118 && crmConstants.entitydataParamMapping[fieldList.rollup_summary.return_type]) {
            attrType = crmConstants.entitydataParamMapping[fieldList.rollup_summary.return_type];
        } else if (crmConstants.entityuiTypeMapping[fieldList.ui_type]) {
            attrType = crmConstants.entityuiTypeMapping[fieldList.ui_type];
        } else if (crmConstants.entitycolumnMapping[fieldList.column_name]) {
            attrType = crmConstants.entitycolumnMapping[fieldList.column_name];
        } else if (crmConstants.entityjsonTypeMapping[fieldList.json_type]) {
            attrType = crmConstants.entityjsonTypeMapping[fieldList.json_type];
        } else if (fieldList.json_type === 'string' && fieldList.data_type === "currency") { //No I18N
            attrType = 'number';//No I18N
        } else if (fieldList.json_type) {
            attrType = fieldList.json_type;
        } else {
            attrType = "string";//no i18n
        }
        //used for special handling
        if (fieldList.column_name === "REMINDAT") {
            attrType = "object";//no i18n
        }
        return attrType;
    }
});