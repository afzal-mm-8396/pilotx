/**
 * @component crm-create-form
 * @author kuralarasan.s
 * @version 1.0.0
 * @summary CRM wrapper component for crux create form component
 */
Lyte.Component.register("crm-create-form", {
_template:"<template tag-name=\"crm-create-form\"><template is=\"if\" value=\"{{lyteViewPort}}\"><template case=\"true\"><dummy-port-element></dummy-port-element> <div class=\"cxCreateLayoutShowLoadingDivWrap\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </div> <dummy-port-element></dummy-port-element></template><template case=\"false\"> <template is=\"if\" value=\"{{showLoading}}\"><template case=\"true\"> <div class=\"cxCreateLayoutShowLoadingDivWrap\"> <div class=\"cxCreateLayoutShowLoadingDiv\"></div> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.showCommonMessage}}\"><template case=\"true\"> <div class=\"cxErrorMessageWrapper\"> <span class=\"cxErrorAlertIcon\"></span> <span class=\"cxErrorMsgText\">{{cxPropLayoutComponentData.cxInternalUtilityObj.commonMessageData.message}}</span> </div> </template><template case=\"false\"> <crux-createform cx-prop-module-data=\"{{cxPropModuleData}}\" cx-prop-record-data=\"{{cxPropRecordData}}\" cx-prop-layout-component-data=\"{{cxPropLayoutComponentData}}\" cx-prop-record-id=\"{{cxPropRecordId}}\" cx-prop-outlet-value=\"{{cxPropOutletValue}}\" cx-prop-module-id=\"{{cxPropModuleId}}\" cx-prop-layout-sections=\"{{cxPropLayoutSections}}\" cx-prop-layout-data=\"{{cxPropLayoutData}}\" cx-prop-layout-id=\"{{cxPropLayoutId}}\" cx-prop-form-data=\"{{cxPropFormData}}\" cx-prop-layout-rules-required=\"{{cxPropLayoutRulesRequired}}\" cx-prop-validation-rules-required=\"{{cxPropValidationRulesRequired}}\" cx-prop-other-data=\"{{cxPropOtherData}}\" cx-prop-current-page=\"{{cxPropCurrentPage}}\" on-form-cancel=\"{{method('onCrmCxFormCancel')}}\" on-form-value-change=\"{{method('onCrmCxFormValueChange')}}\" on-form-before-render=\"{{method('onCrmCxFormBeforeRender')}}\" on-form-after-render=\"{{method('onCrmCxFormAfterRender')}}\" on-form-after-save=\"{{method('onCrmCxFormAfterSave')}}\" on-form-before-save=\"{{method('onCrmCxFormBeforeSave')}}\" on-form-save=\"{{method('onCrmCxFormSave')}}\" on-form-save-click=\"{{method('onCrmCxFormSaveClick')}}\" on-subform-value-change=\"{{method('onCrmCxSubformValueChange')}}\" on-instance-obj-key-creation=\"{{method('onCrmCxFormInstanceObjKeyCreation')}}\" form-field-of-lookup=\"{{method('onCrmCxFormformFieldOfLookup')}}\" fetch-lookup-module-data=\"{{method('onCrmCxFormfetchLookupModuleData')}}\" fetch-lookup-records=\"{{method('onCrmCxFormfetchLookupRecords')}}\" execute-vr-function=\"{{method('onCrmCxFormExecuteVrFunction')}}\" on-vr-function-response=\"{{method('onCrmCxFormVrFunctionResponse')}}\" on-form-failure-response=\"{{method('onCrmCxFormFailureResponse')}}\" on-form-layout-switch=\"{{method('onCrmCxLayoutSwitchClick')}}\" on-form-before-destroy=\"{{method('onCrmCxFormBeforeDestroy')}}\" on-quick-create-click=\"{{method('onCrmCxQuickCreateClick')}}\"> <template is=\"registerYield\" yield-name=\"cxFormFieldErrorYield\"> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.errorDetails,'&amp;&amp;',yieldDataObject.errorDetails.type)}}\"><template case=\"true\"> <template value=\"{{yieldDataObject.errorDetails.type}}\" is=\"switch\">  <template case=\"duplicateError\"> <span class=\"cruxErrMsg cruxErrorMsgDesc cruxErrorMultiline {{yieldDataObject.errorDetails.duplicateErrorDetails.class}}\" id=\"errorMsg_{{cxPropModuleData.module_name}}_{{cxPropFieldData.column_name}}\"> {{unescape(expHandlers(yieldDataObject.errorDetails.errorMesage,'||',\"\"))}} <template is=\"if\" value=\"{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.isFieldEnc,'!'),'&amp;&amp;',yieldDataObject.errorDetails.duplicateErrorDetails.more_records),'&amp;&amp;',expHandlers(cxPropModuleData.generated_type,'==','default')),'&amp;&amp;',cxIsValuePresent(cxPropModuleData.api_name,'Leads,Contacts,Accounts,Vendors'))}}\"><template case=\"true\"> <link-to id=\"duplicateErrorLink{{cxPropFieldData.api_name}}_{{currentInstObjKey}}\" lt-prop-rel=\"noopener noreferrer\" data-zcqa=\"viewExistingRecord\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.find-and-merge\" lt-prop-qp=\"{&quot;findDupFldName&quot; : &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.dupColName}}&quot;}\" lt-prop-dp=\"[&quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.moduleName}}&quot;, &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.id}}&quot;]\"> {{cruxGetI18n('crm.label.module.merge',yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.modPluLabel)}}</link-to> </template><template case=\"false\"> <link-to id=\"duplicateErrorLink{{cxPropFieldData.api_name}}_{{currentInstObjKey}}\" lt-prop-rel=\"noopener noreferrer\" lt-prop-id=\"{{concat('viewExistingRecordQuickInfo',yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.key)}}\" onmouseenter=\"{{action(&quot;showDuplicateRecordDetail&quot;,this,yieldDataObject.errorDetails)}}\" onmouseleave=\"{{action(&quot;hideDuplicateRecordDetail&quot;,event,this)}}\" data-zcqa=\"viewExistingRecord\" lt-prop-target=\"_blank\" lt-prop-route=\"crm.tab.module.entity.detail\" lt-prop-dp=\"[&quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.moduleName}}&quot;, &quot;{{yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.id}}&quot;]\"> {{cruxGetI18n(\"crm.view.record\",yieldDataObject.errorDetails.duplicateErrorDetails.duplicateFdetails.modLabel)}}</link-to> </template></template> </template></template> </span> </template></template> </template></template> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionLabelYield\"> <template is=\"if\" value=\"{{yieldDataObject.isSubformSection}}\"><template case=\"true\"> <div class=\"create-det-title\"> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','asterisk'))}}\"><template case=\"true\"> <span class=\"requiredFieldAccessibilty\"><span class=\"crmNegativeColor\">*</span></span> </template></template> <div id=\"{{concat('secHead_',cxPropSection[currentInstObjKey].parsedSectionLabel)}}\" class=\"cxcreateSectionTitleCont {{expHandlers(yieldDataObject.subformPermissionMessage,'?:','dIB','')}}\"> <div id=\"sectitle\" class=\"cxDIB {{expHandlers(expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','red_accent_line')),'?:','cxSfTableHeaderMandatory','')}}\"> {{cxPropSection.display_label}}</div> <template is=\"if\" value=\"{{expHandlers(yieldDataObject.isMandatorySubform,'&amp;&amp;',expHandlers(yieldDataObject.mandatoryStyle,'===','required'))}}\"><template case=\"true\"> <span class=\"requiredFieldAccessibilty\">(<span class=\"crmNegativeColor\">{{cruxGetI18n('crm.label.required')}}</span>)</span> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropSection.properties.tooltip.name,'==','Info Icon')}}\"><template case=\"true\"> <i lt-prop-title=\"{{cxPropSection.properties.tooltip.value}}\" lt-prop-tooltip-class=\"toolTClass\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;topright&quot;,&quot;margin&quot; : &quot;5&quot;,&quot;hidedelay&quot; : &quot;250&quot;}\" class=\"cxDIB info_icon subformTooltip cP pRI\"> <crmutil-icon icon-name=\"info-rounded\" icon-class=\"zcicn-info-rounded crmBaseIcon \"></crmutil-icon> </i> </template></template> <template is=\"if\" value=\"{{yieldDataObject.subformPermissionMessage}}\"><template case=\"true\"> <div class=\"crmNotesSection dIB vaM mL10\"> <span class=\"zcicncss-info zcicn-cssIcons zcicncss13 zcicn_grey_mask mR3\"></span>{{yieldDataObject.subformPermissionMessage}} </div> </template></template> <template is=\"if\" value=\"{{yieldDataObject.mandatoryError}}\"><template case=\"true\"> <span class=\"cruxErrMsg cruxErrorMsgDesc\" data-zcqa=\"mandatory-error-msg-{{cxPropSection.display_label}}\" id=\"errorMsg_Crm_{{yieldDataObject.moduleName}}_{{cxPropSection.display_label}}\"> {{unescape(cruxGetI18n('crm.field.empty.check',cruxEncodeHTML(cxPropSection.display_label)))}} </span> </template></template> </div> </div> </template></template> </template> <template is=\"registerYield\" yield-name=\"cxFormHeaderYield\"> <lyte-yield yield-name=\"cxFormHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFooterYield\"> <lyte-yield yield-name=\"cxFormFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" yd-prop-global-data=\"{{ydPropGlobalData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionHeaderYield\"> <lyte-yield yield-name=\"cxFormSectionHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormSectionFooterYield\"> <lyte-yield yield-name=\"cxFormSectionFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormCompleteSectionYield\"> <lyte-yield yield-name=\"cxFormCompleteSectionYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{cxPropLayoutComponentData.currentInstObjKey}}\" cx-prop-section=\"{{cxPropSection}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFieldHeaderYield\"> <lyte-yield yield-name=\"cxFormFieldHeaderYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template> <template is=\"registerYield\" yield-name=\"cxFormFieldFooterYield\"> <lyte-yield yield-name=\"cxFormFieldFooterYield\" cx-prop-form-data=\"{{cxPropFormData}}\" current-inst-obj-key=\"{{currentInstObjKey}}\" cx-prop-field-data=\"{{cxPropFieldData}}\" yd-prop-global-data=\"{{yieldGlobalData}}\"> </lyte-yield> </template> </crux-createform> </template></template> <lyte-popover lt-prop-content-padding=\"0px\" id=\"cxCrmDuplicateInfoPopover{{currentInstObjKey}}\" lt-prop-wrapper-class=\"cxCrmDuplicateInfoPopover{{currentInstObjKey}}\" lt-prop-type=\"callout\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-origin-elem=\"a#{{duplicateInfoPopoverData.id}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <lyte-table lt-prop-yield=\"true\" class=\"cxDuplicateInfoTable\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"if\" value=\"{{expHandlers(duplicateInfoPopoverData.lead_name,'!=','null')}}\"><template case=\"true\"> <lyte-tr class=\"cxCrmDuplicateInfoRow\"> <lyte-td class=\"cxRecordLabel\" data-zcqa=\"QuickInfoPopover_LeadLabel\"><span class=\"cxDIB\">{{duplicateInfoPopoverData.lead_label}}</span></lyte-td> <lyte-td class=\"cxRecordValue\" data-zcqa=\"QuickInfoPopover_LeadName\"> <span class=\"cxDIB\">:</span> {{duplicateInfoPopoverData.lead_name}}</lyte-td> </lyte-tr> </template></template> <lyte-tr class=\"cxCrmDuplicateInfoRow\"> <lyte-td class=\"cxRecordLabel\" data-zcqa=\"QuickInfoPopover_OwnerLabel\"><span class=\"cxDIB\">{{duplicateInfoPopoverData.owner_label}}</span></lyte-td> <lyte-td class=\"cxRecordValue w300\"> <span class=\"pR5 dIB vaT\">:</span> <span class=\"cxDIB\" data-zcqa=\"QuickInfoPopover_Image\"> <img class=\"cxDuplicateRecordCard\" src=\"{{duplicateInfoPopoverData.image_url}}\"> </span> <span class=\"dIB vaT mT2 mL5 wbBreakAll\" data-zcqa=\"QuickInfoPopover_LeadOwner\">{{duplicateInfoPopoverData.lead_owner}}</span> </lyte-td> </lyte-tr> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> </lyte-popover-content> </template> </lyte-popover> </template></template> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]},{"type":"componentDynamic","position":[4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"duplicateError":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,2]}]}},"default":{}},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}}]},{"type":"registerYield","position":[1,5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,7],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,9],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,13],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,15],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"registerYield","position":[1,17],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0,0]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0,0]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,3,3,1]},{"type":"text","position":[1,1,3,3,5,0]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropMode","cxPropModuleInformationType","cxPropModuleId","cxPropModuleApiName","cxPropModuleData","cxPropLayoutInformationType","cxPropLayoutName","cxPropLayoutId","cxPropLayoutData","cxPropRecordInformationType","cxPropRecordId","cxPropRecordData","cxPropContentOverflow","lyteViewPort","cxPropLayoutSections","cxPropOutletValue","cxPropRenderMode","currentInstObjKey","cxPropCurrentPage","cxPropFormData","cxPropLayoutComponentData","cxPropLayoutRulesRequired","cxPropValidationRulesRequired","cxPropOtherData","showLoading"],
_observedAttributesType :["string","string","string","string","object","string","string","string","object","string","string","object","boolean","boolean","array","string","string","string","string","object","object","boolean","boolean","object","boolean"],

    _lyteUtilFunctions: ["refresh", "setFormData", "getFormData", "getSubFormData", "validateForm", "validateSubform", "destroyComponent"],
    data: function () {
        return {
            /**
             * @componentProperty { create | edit | clone } cxPropMode=create
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropMode: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { moduleApiName | moduleData | moduleId } cxPropModuleInformationType=moduleApiName
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropModuleInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropModuleId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleId
             * @input
             */
            cxPropModuleId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropModuleApiName
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleApiName
             * @input
             */
            cxPropModuleApiName: Lyte.attr("string", { default: "", input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropModuleData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropModuleInformationType moduleData
             * @input
             */
            cxPropModuleData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { layoutName | layoutData | layoutId } cxPropLayoutInformationType=layoutName
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropLayoutInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropLayoutName
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutName
             * @input
             */
            cxPropLayoutName: Lyte.attr("string", { default: "", input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropLayoutId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutId
             * @input
             */
            cxPropLayoutId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropLayoutData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropLayoutInformationType layoutData
             * @input
             */
            cxPropLayoutData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { recordId | recordData} cxPropRecordInformationType=recordData
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropMode edit,clone
             * @input
             */
            cxPropRecordInformationType: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { string } cxPropRecordId
             * @author kuralarasan.s
             * @version 1.0.0
             * @condition cxPropRecordInformationType recordId
             * @input
             */
            cxPropRecordId: Lyte.attr("string", { default: "", hideAttr: true, input: true }),//no i18n
            /**
             * @componentProperty { object } cxPropRecordData
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             * @condition cxPropMode create, edit, clone
             * @condition cxPropRecordInformationType recordData
             */
            cxPropRecordData: Lyte.attr('object', { default: {}, input: true }),//no i18n
            /**
             * @componentProperty { boolean } cxPropContentOverflow
             * @author kuralarasan.s
             * @version 1.0.0
             * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false, input: true }), //no i18n

            lyteViewPort: Lyte.attr("boolean", { "default": window.isSlyteUiViewPortDisabled ? false : true }),//no i18n
            cxPropLayoutSections: Lyte.attr('array', { default: [] }), //no i18n
            cxPropOutletValue: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            cxPropRenderMode: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            currentInstObjKey: Lyte.attr("string", { default: "", hideAttr: true }),//no i18n
            cxPropCurrentPage: Lyte.attr("string", { default: "create", hideAttr: true }),//no i18n
            cxPropFormData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropLayoutComponentData: Lyte.attr('object', { default: {} }),//no i18n
            cxPropLayoutRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
            cxPropValidationRulesRequired: Lyte.attr("boolean", { default: false }), //no i18n
            cxPropOtherData: Lyte.attr('object', { 'default': {} }),//no i18n
            showLoading: Lyte.attr("boolean", { default: true }) //no i18n
        };
    },
    viewPortObserver: function () {
        if (!this.data.lyteViewPort) {
            this.initHandler();
        }
    }.observes('lyteViewPort'),
    init: function () {
        let moduleApiName = this.data.cxPropModuleApiName,
            moduleData = this.data.cxPropModuleData;
        moduleApiName = moduleApiName && typeof moduleApiName === 'string' && moduleApiName.trim();
        this.__initFlag = true;
        if (moduleApiName && moduleData && moduleData.api_name && moduleData.api_name !== moduleApiName) {
            try {
                this.data.cxPropModuleData = {}; this.data.cxPropModuleId = "";
                this.data.cxPropLayoutId = ""; this.data.cxPropLayoutData = {}; this.data.cxPropLayoutName = ""; this.data.cxPropLayoutSections = [];
                let toEmptyProperties = "cx-prop-module-data,cx-prop-module-id,cx-prop-layout-id,cx-prop-layout-sections,cx-prop-layout-name,cx-prop-layout-data";
                this.throwEvent('onBuilderPropertyRemove', toEmptyProperties.split(","));  //No I18N
                this._l__rendering__inprogress_flag = this._m__rendering__inprogress_flag = true;//temp-fix
            } catch (e) {
                this.__builderPropertyRemoveException = true;
            }
        }
        if (!this.data.hasOwnProperty('cxPropLayoutComponentData') || !this.data.cxPropLayoutComponentData) {
            this.data.cxPropLayoutComponentData = {};
        }
        if (this.data.cxPropLayoutComponentData) {
            Lyte.Component.set(this.data.cxPropLayoutComponentData, 'isLyteViewPort', this.data.lyteViewPort);//no i18n
        }
        this.initHandler();
    },
    initHandler: function () {
        if (this.data.lyteViewPort) {
            return;
        }
        let moduleName = this.data.cxPropModuleName,
            moduleApiName = this.data.cxPropModuleApiName,
            moduleData = this.data.cxPropModuleData,
            moduleId = this.data.cxPropModuleId,
            userDetails = typeof Crm != "undefined" && Crm.userDetails || {}; //No I18n
        moduleApiName = moduleApiName && typeof moduleApiName === 'string' && moduleApiName.trim();
        if (!moduleName && moduleApiName) {
            let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: moduleApiName });
            if (moduleDetails && moduleDetails.moduleName) {
                moduleName = moduleDetails.moduleName;
            }
        } else if (!moduleName && (moduleId || (moduleData && moduleData.id))) {
            let idModMapping = typeof idModuleMapping !== 'undefined' ? idModuleMapping : {},
                givenModuleId = moduleId || (moduleData && moduleData.id);
            if (idModMapping[givenModuleId]) {
                moduleName = idModMapping[givenModuleId];
            }
        }
        if (!moduleName && (moduleData && moduleData.module_name)) {
            let moduleRecMapping = typeof moduleRecordMapping !== 'undefined' ? moduleRecordMapping : {};
            if (moduleRecMapping[moduleData.module_name]) {
                moduleName = moduleData.module_name;
            }
        }
        if (this.data.cxPropMode && ['create', 'edit', 'clone'].includes(this.data.cxPropMode)) {
            this.data.cxPropCurrentPage = this.data.cxPropMode;
        }
        if (moduleName) {
            let isModuleSupported = this.checkCruxCreateFormSupport(moduleName, this.data.cxPropCurrentPage);
            if (!isModuleSupported) {
                this.setLayoutComponentError({ primaryErrorMessage: 'unsupported module given to render create form.' });//no i18n
                return;
            }
        }
        if (this.data.cxPropCurrentPage === "clone" && moduleName && moduleName.indexOf("LinkingModule") > -1) {//ZCRM-685838
            this.setLayoutComponentError({ primaryErrorMessage: 'unsupported mode given to render create form.' });//no i18n
            return;
        }
        var layoutCompData = this.data.cxPropLayoutComponentData || {};
        if (!this.data.cxPropCurrentPage && (!this.isEmptyObj(this.data.cxPropRecordData)
            || this.data.cxPropRecordId)) {
            this.data.cxPropCurrentPage = 'edit';//No i18N
        }
        let dataProps = this.getExposedCXPropertiesList();
        dataProps.forEach((dataProps) => {
            if (this.data.hasOwnProperty(dataProps) && !layoutCompData.hasOwnProperty(dataProps)) {
                layoutCompData[dataProps] = this.data[dataProps];
            }
        });
        if (!this.isEmptyObj(layoutCompData)) {
            this.data.originalLayoutComponentData = $L.extend(true, {}, layoutCompData);
            if (moduleName && (['Deals', 'Potentials'].indexOf(moduleName) !== -1 ||
                (userDetails.LAYOUTRULEAVAILABLE === true && userDetails.LRINVOLVEDMODULES.indexOf(moduleName) !== -1))) {
                layoutCompData.cxPropLayoutRulesRequired = true;
            }
            if (moduleName && (userDetails.VALIDATIONRULEAVAILABLE === true && userDetails.VRINVOLVEDMODULES.indexOf(moduleName) !== -1)) {
                layoutCompData.cxPropValidationRulesRequired = true;
            }
            layoutCompData.cxInternalUtilityObj = { formFieldList: {}, subformFieldList: {} };
            if (layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.id && (!layoutCompData.cxPropLayoutId || layoutCompData.cxPropLayoutId !== layoutCompData.cxPropLayoutData.id)) {
                layoutCompData.cxPropLayoutId = layoutCompData.cxPropLayoutData.id;
            }
            if ((!layoutCompData.cxPropLayoutSections || !layoutCompData.cxPropLayoutSections.length) && layoutCompData.cxPropLayoutData && layoutCompData.cxPropLayoutData.sections && layoutCompData.cxPropLayoutData.sections.length) {
                layoutCompData.cxPropLayoutSections = layoutCompData.cxPropLayoutData.sections;
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
            layoutCompData.columnsToSkip = layoutCompData.columnsToSkip || [];
            layoutCompData.apiNamesToSkip = layoutCompData.apiNamesToSkip || [];
            layoutCompData.uiTypeToSkip = layoutCompData.uiTypeToSkip || [];
            let skipType = ['columnsToSkip', 'apiNamesToSkip', 'uiTypeToSkip'];
            skipType.forEach((skipType) => {
                if (Array.isArray(layoutCompData[skipType])) {
                    let columnsToSkip = this.getUnsupportFieldsList(skipType);
                    layoutCompData[skipType] = layoutCompData[skipType].concat(columnsToSkip);
                }
            });
            this.checkAndFetchMetaData(layoutCompData);
            if (this.data.haveAllDefaultMetaData) {
                if (layoutCompData.cxPropModuleData) {
                    this.setData('cxPropModuleData', layoutCompData.cxPropModuleData);
                    layoutCompData.cxPropModuleName = layoutCompData.cxPropModuleData.module_name;
                    layoutCompData.cxPropModuleApiName = layoutCompData.cxPropModuleData.api_name;
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
    didConnect: function () {
        this.didConnectHandler();
        /**
         * This function will render the component with given data. All mandatory properties required for rendering should be passed.
         * @utility refresh
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { object } componentData - The data to be set into the component. It can contain any of the component properties.
        */
        this.$node.refresh = (customData = {}) => {
            let {
                cxPropMode,
                cxPropModuleId,
                cxPropModuleApiName,
                cxPropRecordId,
                cxPropRecordData
            } = customData,
                currentPage = cxPropMode || this.data.cxPropCurrentPage,
                haveAllMandatoryData = false;

            cxPropModuleApiName = cxPropModuleApiName || this.data.cxPropModuleApiName;
            cxPropModuleId = cxPropModuleId || this.data.cxPropModuleId;
            cxPropRecordId = cxPropRecordId || this.data.cxPropRecordId;
            cxPropRecordData = cxPropRecordData || this.data.cxPropRecordData;
            if (currentPage === "create" && (cxPropModuleId || cxPropModuleApiName)) {
                haveAllMandatoryData = true;
            } else if ((cxPropModuleId || cxPropModuleApiName) && (cxPropRecordId || !this.isEmptyObj(cxPropRecordData))) {
                haveAllMandatoryData = true;
            }
            if (haveAllMandatoryData) {
                this.reRenderComponent(customData, true);
            }
        };
    },
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
                    if (this.getMethods('onBuilderPropertyRemove')) {
                        this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-data']);
                    }
                }
                if (!customData.hasOwnProperty('cxPropLayoutId')) {
                    this.emptyLayoutDetails();
                }
            }
            if (eachDataProp === "cxPropRecordData") {
                if (!customData.hasOwnProperty('cxPropRecordId')) {
                    this.data.cxPropRecordId = "";
                    if (this.getMethods('onBuilderPropertyRemove')) {
                        this.executeMethod('onBuilderPropertyRemove', ['cx-prop-record-id']);
                    }
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
    didDestroy: function () {
        if (this.observeRecordIdTimeout) { clearTimeout(this.observeRecordIdTimeout); }
        if (this.observeLayoutIdTimeout) { clearTimeout(this.observeLayoutIdTimeout); }
        if (this.observeLayoutNameTimeout) { clearTimeout(this.observeLayoutNameTimeout); }
    },
    //Observers - start
    observeRecordIdAndRefresh: function () {

        if (this.observeRecordIdTimeout) { clearTimeout(this.observeRecordIdTimeout); }

        // last observed record id
        this._pendingRecordId = this.data.cxPropRecordId;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeRecordIdTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            if (this.data.cxPropRecordId) {
                this.reRenderComponent({ cxPropRecordId: this._pendingRecordId });
            } else if (this.data.cxPropCurrentPage === 'create') {
                this.data.cxPropRecordData = {};
            }
        };

        this.observeRecordIdTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropRecordId'),
    observeRecordDataAndRefresh: function () {
        this.reRenderComponent({ cxPropRecordData: this.data.cxPropRecordData || {} });
    }.observes('cxPropRecordData', 'cxPropRecordData.{}'),
    observeLayoutIdAndRefresh: function () {

        if (this.observeLayoutIdTimeout) { clearTimeout(this.observeLayoutIdTimeout); }

        // last observed layout id
        this._pendingLayoutId = this.data.cxPropLayoutId;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeLayoutIdTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            this.emptyLayoutDetails('cxPropLayoutId');
            this.reRenderComponent({ cxPropLayoutId: this._pendingLayoutId });
        };

        this.observeLayoutIdTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropLayoutId'),
    observeLayoutNameAndRefresh: function () {

        if (this.observeLayoutNameTimeout) { clearTimeout(this.observeLayoutNameTimeout); }

        // last observed layout name
        this._pendingLayoutName = this.data.cxPropLayoutName;

        var actualRenderingHandler = () => {
            if (this.data.showLoading) {
                this.observeLayoutNameTimeout = setTimeout(actualRenderingHandler, 50);
                return;
            }

            this.emptyLayoutDetails('cxPropLayoutName');
            this.reRenderComponent({ cxPropLayoutName: this._pendingLayoutName });
        };

        this.observeLayoutNameTimeout = setTimeout(actualRenderingHandler, 50);

    }.observes('cxPropLayoutName'),
    observeLayoutDataAndRefresh: function () {
        if (this._l__rendering__inprogress_flag) {
            delete this._l__rendering__inprogress_flag;
            return;
        }
        this.emptyLayoutDetails('cxPropLayoutData');
        this.reRenderComponent({ cxPropLayoutData: this.data.cxPropLayoutData || {} });
    }.observes('cxPropLayoutData', 'cxPropLayoutData.{}'),
    observeModuleIdAndRefresh: function () {
        if (this.data.cxPropModuleId) {
            let moduleDetails = { cxPropModuleId: this.data.cxPropModuleId };
            let isValidModule = this.isValidModule(moduleDetails);
            if (!isValidModule) {
                this.setInvalidModuleError();
                this.data.cxPropModuleApiName = "";
                this.data.cxPropModuleData = {};
                return;
            }
            if (this.getMethods('onBuilderPropertyRemove')) {
                this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data', 'cx-prop-module-api-name']);
            }
            this.reRenderComponent(moduleDetails);
        }
    }.observes('cxPropModuleId'),
    observeModuleApinameAndRefresh: function () {
        if (this.data.cxPropModuleApiName) {
            let moduleDetails = { cxPropModuleApiName: this.data.cxPropModuleApiName };
            let isValidModule = this.isValidModule(moduleDetails);
            if (!isValidModule) {
                this.setInvalidModuleError();
                this.data.cxPropModuleId = "";
                this.data.cxPropModuleData = {};
                return;
            }
            if (this.getMethods('onBuilderPropertyRemove')) {
                this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-data', 'cx-prop-module-id']);
            }
            this.reRenderComponent(moduleDetails);
        }
    }.observes('cxPropModuleApiName'),
    observeModuleDataAndRefresh: function () {
        let dontRemoveLayoutDataFromBuilderProperty = this.__initFlag;
        delete this.__initFlag;
        if (this._m__rendering__inprogress_flag) {
            delete this._m__rendering__inprogress_flag;
            return;
        }
        let moduleDetails = { cxPropModuleData: this.data.cxPropModuleData || {} };
        let isValidModule = this.isValidModule(moduleDetails);
        if (!isValidModule) {
            let propertiesToIgnore = [];
            if (dontRemoveLayoutDataFromBuilderProperty) {
                propertiesToIgnore.push('cx-prop-layout-data');
            }
            this.setInvalidModuleError(propertiesToIgnore);
            this.data.cxPropModuleApiName = "";
            this.data.cxPropModuleId = "";
            return;
        }
        if (this.getMethods('onBuilderPropertyRemove')) {
            this.executeMethod('onBuilderPropertyRemove', ['cx-prop-module-api-name', 'cx-prop-module-id']);
        }
        this.reRenderComponent(moduleDetails);
    }.observes('cxPropModuleData', 'cxPropModuleData.{}'),
    observeModeAndRefresh: function () {
        if (this.data.cxPropMode) {
            this.reRenderComponent({ cxPropMode: this.data.cxPropMode });
        }
    }.observes('cxPropMode'),
    //Observers - end
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
    didConnectHandler: function () {
        if (this.data.haveAllDefaultMetaData) {
            this.actual_didConnect();
        }
    },
    isValidModule: function (dataObj = {}) {
        let { cxPropModuleApiName, cxPropModuleId, cxPropModuleData } = dataObj;
        cxPropModuleApiName = !cxPropModuleApiName && cxPropModuleData && cxPropModuleData.api_name ? cxPropModuleData.api_name : cxPropModuleApiName;
        if (cxPropModuleApiName) {
            let moduleDetails = this.getModuleIdFromModuleApiname({ moduleApiname: cxPropModuleApiName });
            if (moduleDetails && moduleDetails.moduleId) {
                cxPropModuleId = moduleDetails.moduleId;
            }
        }
        return cxPropModuleId ? true : false;
    },
    setInvalidModuleError: function (propertiesToIgnore = []) {
        this.setLayoutComponentError({ primaryErrorMessage: 'Mandatory moduleData / moduleId / moduleApiName for rendering create form is missing/incorrect. If newly created module given, refresh and check once.' });//no i18n
        if (this.getMethods('onBuilderPropertyRemove')) { //ZCRM-685500
            let moduleInfoType = this.data.cxPropModuleInformationType, propsToEmpty = [];
            propsToEmpty.push('cx-prop-layout-sections', 'cx-prop-layout-data', 'cx-prop-layout-name');
            switch (moduleInfoType) {
                case 'moduleApiName':
                    propsToEmpty.push('cx-prop-module-id', 'cx-prop-module-data');
                    break;
                case 'moduleId':
                    propsToEmpty.push('cx-prop-module-api-name', 'cx-prop-module-data');
                    break;
                case 'moduleData':
                    propsToEmpty.push('cx-prop-module-api-name', 'cx-prop-module-id');
                    break;
            }
            propsToEmpty = propsToEmpty.filter((prop) => !propertiesToIgnore.includes(prop));
            this.executeMethod('onBuilderPropertyRemove', propsToEmpty);
        }
    },
    methods: {
        onCrmCxFormSaveClick: function (callBackDataObject) {
            /**
             * This method will be triggered on click of Save or Save and New button
             * @method onFormSaveClick
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormSaveClick', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonNode,currentButtonObj,eventDetails,formData
        },
        onCrmCxFormBeforeSave: function (callBackDataObject) {
            /**
             * This method will be triggered before saving the form
             * @method onFormBeforeSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormBeforeSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData,vrErrorDetails
        },
        onCrmCxFormCancel: function (callBackDataObject) {
            /**
             * This method will be triggered on click of cancel button
             * @method onFormCancel
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormCancel', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonNode,currentButtonObj,eventDetails,formData
        },
        onCrmCxFormValueChange: function (callBackDataObject) {
            /**
             * This method will be triggered on any value change in form
             * @method onFormValueChange
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } fieldValue - The value of the field that has changed.
             * @param { string } fieldApiName - The API name of the field that has changed.
             */
            return this.executeMethodHandler('onFormValueChange', callBackDataObject);//no i18n
            //callBackDataObject keys - allFieldMetaDetails,cxPropFormData,fieldApiName,fieldMeta,fieldValue,formData
        },
        onCrmCxFormBeforeRender: function (callBackDataObject) {
            /**
             * This method will be triggered before form rendering
             * @method onFormBeforeRender
             * @author kuralarasan.s
             * @version 1.0.0
             */
            return this.executeMethodHandler('onFormBeforeRender', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey,allFieldMetaDetails
        },
        onCrmCxFormAfterRender: function (callBackDataObject) {
            /**
             * This method will be triggered after rendering the form
             * @method onFormAfterRender
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } contentWrapperClass - The class of the parent element which contains the form content.
             */
            return this.executeMethodHandler('onFormAfterRender', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey,allFieldMetaDetails,formData
        },
        onCrmCxFormSave: function (callBackDataObject) {
            /**
             * This method will be triggered when click of save button once client validation passed.
             * @method onFormSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             */
            return this.executeMethodHandler('onFormSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData
        },
        onCrmCxFormAfterSave: function (callBackDataObject) {
            /**
             * This method will be triggered after record creation.
             * @method onFormAfterSave
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { object } formData - The data of the form that was submitted.
             * @param { object } buttonDetails - This object contains the details of the button that was clicked.
             * @param { object } responseDetails - This object contains the details of the response from the server.
             */
            return this.executeMethodHandler('onFormAfterSave', callBackDataObject);//no i18n
            //callBackDataObject keys - currentButtonObj,formData, saveResponse
        },
        onCrmCxSubformValueChange: function (callBackDataObject) {
            /**
             * This method will be triggered for any value change in subform
             * @method onSubformValueChange
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } subformApiName - The API name of the subform that has changed.
             * @param { string } fieldApiName - The API name of the field that has changed.
             * @param { number } subformRowNumber - The row number of the subform that has changed.
             * @param { * } fieldValue - The value of the field that has changed.
             */
            return this.executeMethodHandler('onSubformValueChange', callBackDataObject);//no i18n
            //callBackDataObject keys - apiName,componentName,cxPropFormData,element,formData,rowId,value,subformApiname
        },
        onCrmCxFormInstanceObjKeyCreation: function (callBackDataObject) {
            return this.executeMethodHandler('onInstanceObjKeyCreation', callBackDataObject);//no i18n
            //callBackDataObject keys - currentInstObjKey
        },
        onCrmCxFormfetchLookupModuleData: function (callBackDataObject) {
            return this.executeMethodHandler('fetchLookupModuleData', callBackDataObject);//no i18n
            //callBackDataObject keys - fieldMeta,formData,id
        },
        onCrmCxFormfetchLookupRecords: function (callBackDataObject) {
            return this.executeMethodHandler('fetchLookupRecords', callBackDataObject);//no i18n
            //callBackDataObject keys - fieldMeta,formData,moduleId,queryParams
        },
        onCrmCxFormformFieldOfLookup: function (callBackDataObject) {
            return this.executeMethodHandler('formFieldOfLookup', callBackDataObject);//no i18n
        },
        onCrmCxQuickCreateClick: function (callBackDataObject) {
            /**
             * This method will be triggered when quick create button is clicked.
             * @method onQuickCreateClick
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { boolean } isFromModal - Indicates if the quick create popup is opened from lookup modal instead of lookup dropdown.
             * @param { boolean } isFromSubform - Indicates if the quick create popup is opened from subform instead of main form.
             * @param { string } fieldApiName - The API name of the lookup field that was clicked.
             * @param { string } subformApiName - The API name of subform in which the lookup field is present. This will be available only if the quick create popup is opened from subform.
             */
            return this.executeMethodHandler('onQuickCreateClick', callBackDataObject);//no i18n
            //callBackDataObject keys - cruxLookupElmId,currentFieldNode,cxPropFieldData,formData,fromModal,fromSubform,recordObj,subSectionCurntInstObj
        },
        onCrmCxLayoutSwitchClick: function (callBackDataObject) {
            /**
             * This method will be triggered on layout change.
             * @method onFormLayoutSwitch
             * @author kuralarasan.s
             * @version 1.0.0
             * @param { string } layoutId - The id of the layout that is being switched to.
             * @param { string } layoutName - The name of the layout that is being switched to.
             */
            return this.executeMethodHandler('onFormLayoutSwitch', callBackDataObject);//no i18n
            //callBackDataObject keys - cxPropLayoutComponentData,formData,newLayoutRenderObj,selectedLayoutId,selectedLayoutName
        },
        onCrmCxFormExecuteVrFunction: function (callBackDataObject) {
            return this.executeMethodHandler('executeVrFunction', callBackDataObject);//no i18n
        },
        onCrmCxFormVrFunctionResponse: function (callBackDataObject) {
            return this.executeMethodHandler('onVrFunctionResponse', callBackDataObject);//no i18n
        },
        onCrmCxFormFailureResponse: function (callBackDataObject) {
            return this.executeMethodHandler('onFormFailureResponse', callBackDataObject);//no i18n
        },
        onCrmCxFormBeforeDestroy: function (callBackDataObject) {
            return this.executeMethodHandler('onFormBeforeDestroy', callBackDataObject);//no i18n
        }
    },
    actions: {
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
        showDuplicateRecordDetail: function ($this, errorDetails) {
            this.crmShowDuplicateRecordDetail($this, errorDetails, this.getDuplicateRecordDetailsPopoverNode());
        },
        hideDuplicateRecordDetail: function (ev) {
            this.crmhideDuplicateRecordDetail(ev, this.getDuplicateRecordDetailsPopoverNode());
        }
    },
    getDuplicateRecordDetailsPopoverNode: function () {
        return this.$node.querySelector(`#cxCrmDuplicateInfoPopover${this.data.currentInstObjKey}`);//No I18N
    },
    getFormToJSONData: function (formData) {
        if (formData && formData.$ && formData.$.toJSON) {
            let subformJsonData = {};
            let relationsObject = formData.$.model.relations || {};
            for (let relationKey in relationsObject) {
                let relationArray = relationsObject[relationKey] || [];
                relationArray.forEach((eachRelation) => {
                    if (eachRelation && eachRelation.cusRelationFldType === "subform" && eachRelation.relKey && formData[eachRelation.relKey] && formData[eachRelation.relKey].length) {
                        let subformDataArray = [];
                        formData[eachRelation.relKey].forEach((eachSubformRecord) => {
                            if (eachSubformRecord && eachSubformRecord.$ && eachSubformRecord.$.toJSON) {
                                let _toJSONData = eachSubformRecord.$.toJSON();
                                if (_toJSONData && _toJSONData.__parent_module__) {
                                    delete _toJSONData.__parent_module__;
                                }
                                subformDataArray.push(_toJSONData);
                            } else {
                                subformDataArray.push(eachSubformRecord);
                            }
                        });
                        subformJsonData[eachRelation.relKey] = subformDataArray;
                    }
                });
            }
            formData = formData.$.toJSON();
            for (let eachSubformKey in subformJsonData) {
                formData[eachSubformKey] = subformJsonData[eachSubformKey];
            }
        }
        return formData;
    },
    executeMethodHandler: async function (methodName, callBackDataObject) {
        if (this.getMethods(methodName)) {
            let newCBObject = $L.extend(true, {}, callBackDataObject);
            let argsTobeRemoved = ['allFieldMetaDetails'];
            argsTobeRemoved.forEach((eachArg) => {
                if (newCBObject.hasOwnProperty(eachArg)) {
                    delete newCBObject[eachArg];
                }
            });
            if (newCBObject.hasOwnProperty('formData')) {
                if (!['onFormSave', 'onFormAfterSave'].includes(methodName)) {
                    delete newCBObject.formData;
                } else {
                    let formData;
                    try {
                        formData = this.getFormToJSONData(newCBObject.formData);
                    } catch (e) {
                        formData = newCBObject.formData;
                    }
                    newCBObject.formData = formData;
                }
            }
            let keyOrder = [
                "formData", "currentButtonObj", "fieldValue", "subformApiname",
                "saveResponse", "apiName", "rowId", "value", "id", "moduleId", "queryParams",
                "fromModal", "fromSubform", "selectedLayoutId", "contentWrapperClass", "selectedLayoutName"
            ];
            let orderedValues = keyOrder.filter(key => key in newCBObject).map(key => newCBObject[key]);
            if (methodName === 'onQuickCreateClick' && !newCBObject.hasOwnProperty('fromSubform')) {
                orderedValues.push(false);
            }
            if (newCBObject.hasOwnProperty('fieldMeta') && newCBObject.fieldMeta.api_name) {
                orderedValues.push(newCBObject.fieldMeta.api_name);
            } else if (newCBObject.hasOwnProperty('cxPropFieldData') && newCBObject.cxPropFieldData.api_name) {
                orderedValues.push(newCBObject.cxPropFieldData.api_name);
            }
            if (methodName === 'onQuickCreateClick' && newCBObject.hasOwnProperty('subSectionCurntInstObj') && newCBObject.subSectionCurntInstObj.subform_apiname) {
                orderedValues.push(newCBObject.subSectionCurntInstObj.subform_apiname);
            }
            let returnedValue;
            if (callBackDataObject.isQuickCreate) {
                callBackDataObject.layoutComponentData = this.data.cxPropLayoutComponentData;
                returnedValue = await this.executeMethod(methodName, callBackDataObject);
            } else {
                returnedValue = await this.executeMethod(methodName, ...orderedValues);
            }
            if (returnedValue === false &&
                (
                    [
                        'onFormBeforeSave',
                        'onFormSave',
                        'onFormAfterSave',
                        'onFormCancel',
                        'onQuickCreateClick',
                        'onFormLayoutSwitch',
                        'onFormBeforeDestroy'
                    ].includes(methodName)
                )
            ) {
                return false;
            }
        }
        return new Promise(async (resolve) => {
            let layoutComponentData = this.data.cxPropLayoutComponentData;
            switch (methodName) {
                case "fetchLookupModuleData": {
                    let moduleResp = await this.fetchLookupModuleData(callBackDataObject, layoutComponentData);
                    resolve(moduleResp || {});
                    break;
                }
                case "fetchLookupRecords": {
                    let getRecordsResp = await this.fetchLookupRecordsData(callBackDataObject, layoutComponentData);
                    resolve(getRecordsResp || {});
                    break;
                }
                case "onFormSave": {
                    callBackDataObject.moduleId = layoutComponentData.cxPropModuleId || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.id);
                    callBackDataObject.moduleName = layoutComponentData.cxPropModuleName || (layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name);
                    callBackDataObject.currentPage = layoutComponentData.cxInternalUtilityObj.currentPage;
                    let recordSaveResp = await this.saveCurrentForm(callBackDataObject, layoutComponentData.isQuickCreate, layoutComponentData);
                    resolve(recordSaveResp || {});
                    break;
                }
                case "formFieldOfLookup": {
                    callBackDataObject.layoutComponentDomNode = layoutComponentData.layoutComponentDomNode;
                    let recordSaveResp = await this.setFieldOfLookupData(callBackDataObject);
                    resolve(recordSaveResp || {});
                    break;
                }
                case 'onFormAfterSave': {
                    let isSaveAndNew = false;
                    if (callBackDataObject.currentButtonObj && callBackDataObject.currentButtonObj.name === 'saveAndNew') { //no i18n
                        isSaveAndNew = true;
                    }
                    let message = this.setSaveResponseInMessage(callBackDataObject, layoutComponentData, isSaveAndNew);
                    if (isSaveAndNew) {
                        _cruxUtils.showCustomMessage({
                            params: {
                                ltPropMessage: message,
                                ltPropType: "success", //no i18n
                                ltPropDuration: 3000
                            }
                        });
                        this.$node.refresh({
                            cxPropMode: 'create',
                            cxPropModuleApiName: layoutComponentData.cxPropModuleApiName
                        });
                    }
                    break;
                }
                case 'onQuickCreateClick': {
                    let quickCreateClickResp = await this.openQuickCreateForm(callBackDataObject);
                    resolve(quickCreateClickResp || {});
                    break;
                }
                case 'onFormLayoutSwitch': {
                    callBackDataObject.crmCxoriginalLayoutComponentData = $L.extend(true, {}, (this.data.originalLayoutComponentData || {}));
                    let layoutSwitchResp = await this.layoutSwitchHanlder(callBackDataObject);
                    resolve(layoutSwitchResp || {});
                    break;
                }
                case 'executeVrFunction': {
                    let vrDataArray = callBackDataObject.jsonData || [],
                        filterUiTypeDataObject = {
                            currentPage: this.data.cxPropCurrentPage || layoutComponentData.currentInstObjKey,
                            currentInstObjKey: layoutComponentData.currentInstObjKey,
                            fieldIdVsMetaObject: layoutComponentData.cxInternalUtilityObj.layoutFieldIdVsMetaObject || {},
                            subFormFieldIdVsMetaObject: layoutComponentData.cxInternalUtilityObj.subFormFieldIdVsMetaObject || {},
                            isVR: true,
                            recordObj: callBackDataObject && callBackDataObject.formData || this.data.cxPropFormData,
                            currentSections: this.data.cxPropLayoutSections || layoutComponentData.cxPropLayoutSections
                        }
                    vrDataArray.forEach(eachVrData => {
                        try {
                            let recordForFunction = this.filterValidUITypesInRecord(filterUiTypeDataObject);
                            eachVrData.record = recordForFunction;
                        } catch (e) {
                            callBackDataObject.isExceptionOccured = true;
                        }
                    });
                    let vrFunctionResp = await this.executeVrFunction(callBackDataObject);
                    resolve(vrFunctionResp || {});
                    break;
                }
                case 'onVrFunctionResponse': {
                    let vrFunctionsObject = callBackDataObject || {};
                    vrFunctionsObject.moduleName = layoutComponentData.cxPropModuleData.module_name;
                    let vrDetailsOj = this.parseAndHandleVRFunctionResponse(vrFunctionsObject, layoutComponentData);
                    resolve(vrDetailsOj);
                    break;
                }
                case 'onFormFailureResponse': {
                    let failureResponse = callBackDataObject || {};
                    this.handleFormFailureResponse(failureResponse, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormAfterRender': {
                    let cbDataObject = callBackDataObject || {};
                    this.handleFormAfterRender(cbDataObject, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormValueChange': {
                    let cbDataObject = callBackDataObject || {};
                    this.handleFormValueChange(cbDataObject, layoutComponentData);
                    resolve();
                    break;
                }
                case 'onFormBeforeRender': {
                    let cbDataObject = callBackDataObject || {},
                        fieldApiVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.fieldApiVsMetaObject || {},
                        fieldDatatypeVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.fieldDatatypeVsMetaObject || {};
                    this.disableQuickCreateForLookupField({ fieldDatatypeVsMetaObject }, layoutComponentData, 'formConfigurations');
                    let subformFieldDatatypeVsMetaObject = cbDataObject.allFieldMetaDetails && cbDataObject.allFieldMetaDetails.subFormFieldDatatypeVsMetaObject || {};
                    for (let subformKey in subformFieldDatatypeVsMetaObject) {
                        this.disableQuickCreateForLookupField({ fieldDatatypeVsMetaObject: subformFieldDatatypeVsMetaObject[subformKey] }, layoutComponentData, 'subformConfigurations', subformKey);
                        let subformField = fieldApiVsMetaObject[subformKey];
                        if (subformField !== undefined && subformField.subform !== undefined && subformField.subform.id !== undefined) {
                            let subformModuleData = store.peekRecord('module', subformField.subform.id);//no i18n
                            if (subformModuleData) {
                                let permissionsDetails = this.getSubformPermissionDetails(subformModuleData, subformKey, layoutComponentData.cxPropFormData);
                                let finalPermissons = layoutComponentData.subformPermissions || {};
                                finalPermissons[subformKey] = permissionsDetails;
                                layoutComponentData.subformPermissions = finalPermissons;
                            }
                        }
                    }
                    this.setFieldZcqaValue({ fieldApiVsMetaObject }, layoutComponentData, 'formConfigurations');
                    this.setCruxTypeValue({ fieldDatatypeVsMetaObject }, layoutComponentData, 'formConfigurations');
                    resolve();
                    break;
                }
                case 'onInstanceObjKeyCreation': {
                    let { currentInstObjKey } = callBackDataObject || {};
                    this.setData('currentInstObjKey', currentInstObjKey);
                    resolve();
                    break;
                }
                default:
                    resolve("NO_MATCHING_CALLBACKS");
                    break;
            }
        });
    },
    getSubformPermissionDetails: function (subformModuleData, subformKey, cxPropFormData) {
        let subformPermissions = {};
        if (subformModuleData && subformModuleData.module_name && typeof moduleRecordMapping !== "undefined" && moduleRecordMapping[subformModuleData.module_name]) {
            subformModuleData = moduleRecordMapping[subformModuleData.module_name];
        }
        if (subformModuleData) {
            subformPermissions = {
                "viewable": subformModuleData.viewable,
                "editable": subformModuleData.editable,
                "creatable": subformModuleData.creatable,
                "deletable": subformModuleData.deletable
            };
            if (!subformModuleData.editable) {
                if (!subformModuleData.creatable && !subformModuleData.deletable) {
                    subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.view');//no i18n
                }
                else if (cxPropFormData && cxPropFormData[subformKey] && cxPropFormData[subformKey].length > 0) {
                    subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.edit');//no i18n
                }
            }
            if (cxPropFormData && cxPropFormData[subformKey] && cxPropFormData[subformKey].length === 0 && !subformModuleData.creatable) {
                subformPermissions.subformPermissionMessage = _cruxUtils.getI18n('crm.sf.permission.no.create');//no i18n
            }
        }
        return subformPermissions;
    },
    actual_init: function () {
        let layoutCompData = this.data.cxPropLayoutComponentData;
        let dataProps = this.getExposedCXPropertiesList(),
            crmUserDetails = typeof Crm != "undefined" && Crm.userDetails;
        dataProps.forEach((dataProps) => {
            if (layoutCompData.hasOwnProperty(dataProps)) {
                this.data[dataProps] = layoutCompData[dataProps];
            }
        });
        layoutCompData.crmCruxCreateFormDomNode = this.$node;
        layoutCompData.isFromCrmWrapperComponent = true;
        if (!layoutCompData.cxPropUserCurrencyData) {
            layoutCompData.cxPropUserCurrencyData = typeof Crm != "undefined" ? Crm.userDetails.CURRENCY_DETAILS : {};
        }
        if (!layoutCompData.cxPropCurrencyData) {
            try {
                let cxPropCurrencyData = this.getCurrencyData(undefined, this.data.cxPropRecordData);
                if (cxPropCurrencyData) {
                    layoutCompData.cxPropCurrencyData = cxPropCurrencyData;
                    layoutCompData.cxPropCurrencySymbol = cxPropCurrencyData.symbol;
                    layoutCompData.cxPropCurrencyKey = cxPropCurrencyData.key;
                }
            } catch (e) {
                layoutCompData.cxPropCurrencyData = {};
            }
        }
        if (this.isEmptyObj(layoutCompData.customFieldComponents)) {
            let customFieldComponents = {},
                componentInfo = {
                    componentName: 'crux-text-component',
                    isCruxComponent: true,
                    cxPropData: JSON.stringify({
                        appearance: 'box',
                        from: 'create',
                        disabled: true,
                        tooltip: 'unsupported field'
                    })
                };
            customFieldComponents.data_type = {
                "multiselectlookup": Lyte.deepCopyObject(componentInfo),
                "fileupload": Lyte.deepCopyObject(componentInfo),
                "imageupload": Lyte.deepCopyObject(componentInfo)
            };
            customFieldComponents.ui_type = {
                250: Lyte.deepCopyObject(componentInfo)
            };
            layoutCompData.customFieldComponents = customFieldComponents;
        }
        if (layoutCompData.cxPropCurrentPage === "create" && this.data.cxPropFormData && !this.data.cxPropFormData.hasOwnProperty('Owner')) {
            let userDataDetails = this.getDefaultUserDetail(crmUserDetails);
            if (userDataDetails && userDataDetails.id && userDataDetails.name) {
                Lyte.Component.set(this.data.cxPropFormData, 'Owner', userDataDetails);
            }
        }
        /*
        if (!this.data.showLoading) {
            //temp fix for multiple parallel rendering issue
            this.setData('showLoading', true);//No i18N
        }
        */
        this.setData('showLoading', false);
    },
    actual_didConnect: function () {
        let layoutCompData = this.data.cxPropLayoutComponentData,
            cxUtilityObj = layoutCompData.cxInternalUtilityObj || {};
        this.registerUtilityMethods(this.data.cxPropLayoutComponentData.layoutComponentDomNode);
        if (cxUtilityObj.currentInstObjKey) {
            let class_list = this.getData('class');//no i18n
            class_list = class_list || "";//No i18N
            try {
                let existingClass = this.$node.getAttribute('class') || '';
                existingClass = existingClass.trim();
                if (existingClass && class_list.indexOf(existingClass) === -1) {
                    class_list += ` ${existingClass}`;//No i18N
                }
            } catch (e) {
                class_list = class_list || "";//No i18N
            }
            cxUtilityObj.crmCruxFormCompSelectorValue = `.crmCruxComp${cxUtilityObj.currentInstObjKey}`;
            let fullClassValue = class_list.trim(), classArr = fullClassValue.split(' '), oldCrmInstObjClass;
            classArr.forEach(eachClass => {
                if (eachClass) {
                    oldCrmInstObjClass = eachClass.indexOf('cxInstObj') !== -1 ? eachClass : "";
                }
            });
            let newcrmInstanceClassValue = `crmCruxComp${cxUtilityObj.currentInstObjKey}`;
            if (oldCrmInstObjClass && oldCrmInstObjClass !== newcrmInstanceClassValue) {
                class_list = class_list.replaceAll(oldCrmInstObjClass, '');
            }
            class_list += ` ${newcrmInstanceClassValue}`;//No i18N
            this.setData('class', class_list.trim());//No i18N
        }
        delete this._l__rendering__inprogress_flag;
        delete this._m__rendering__inprogress_flag;
    },
    setFieldZcqaValue: function (dataObject, layoutComponentData, formConfigurationsKey) {
        dataObject = dataObject || {};
        let fieldApiVsMetaObject = dataObject.fieldApiVsMetaObject || {},
            currentModuleName = layoutComponentData.cxPropModuleData && layoutComponentData.cxPropModuleData.module_name || "";
        if (fieldApiVsMetaObject && Object.keys(fieldApiVsMetaObject).length) {
            let finalFormConfig = layoutComponentData[formConfigurationsKey] || {};
            for (let fieldKey in fieldApiVsMetaObject) {
                let fieldMetaObject = fieldApiVsMetaObject[fieldKey];
                let isValidFieldToUpdate = !fieldMetaObject.custom_field && !(!fieldMetaObject.custom_field && currentModuleName.indexOf('LinkingModule') >= 0 && fieldMetaObject.data_type === "lookup");
                if (isValidFieldToUpdate) {
                    if (!finalFormConfig.hasOwnProperty('api_name')) {
                        finalFormConfig.api_name = {};
                    }
                    if (finalFormConfig.api_name && !finalFormConfig.api_name.hasOwnProperty(fieldMetaObject.api_name)) {
                        finalFormConfig.api_name[fieldMetaObject.api_name] = {};
                    }
                    finalFormConfig.api_name[fieldMetaObject.api_name].fieldZcqaValue = fieldMetaObject.column_name;
                }
            }
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    setCruxTypeValue: function (dataObject, layoutComponentData, formConfigurationsKey) {
        dataObject = dataObject || {};
        let fldDatatypeVsMetaObject = dataObject.fieldDatatypeVsMetaObject || {},
            userDetails = typeof Crm !== "undefined" && Crm.userDetails || {}, //No I18n
            isGrouperRadioComponentSupported = userDetails && userDetails.isRadioButtonAndSliderEnabled && userDetails.isRadioFieldSupported;
        let existingFormConfig = layoutComponentData[formConfigurationsKey] || {};
        let finalFormConfig = existingFormConfig;
        if (isGrouperRadioComponentSupported && fldDatatypeVsMetaObject.picklist &&
            Array.isArray(fldDatatypeVsMetaObject.picklist) && fldDatatypeVsMetaObject.picklist.length) {
            fldDatatypeVsMetaObject.picklist.forEach(eachPicklistField => {
                if (eachPicklistField && eachPicklistField.ui_type === 2 && eachPicklistField.display_format) {
                    if (!finalFormConfig.hasOwnProperty('api_name')) {
                        finalFormConfig.api_name = {};
                    }
                    if (finalFormConfig.api_name && !finalFormConfig.api_name.hasOwnProperty(eachPicklistField.api_name)) {
                        finalFormConfig.api_name[eachPicklistField.api_name] = {};
                    }
                    finalFormConfig.api_name[eachPicklistField.api_name].cruxType = "grouper-radio";
                    finalFormConfig.api_name[eachPicklistField.api_name].isDisplayFormatEnabled = true;
                }
            });
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    disableQuickCreateForLookupField: function (dataObject, layoutComponentData, formConfigurationsKey, subformKey) {
        dataObject = dataObject || {};
        let fldDatatypeVsMetaObject = dataObject.fieldDatatypeVsMetaObject || {};
        if (fldDatatypeVsMetaObject.lookup && Array.isArray(fldDatatypeVsMetaObject.lookup) && fldDatatypeVsMetaObject.lookup.length) {
            let existingFormConfig = layoutComponentData[formConfigurationsKey] || {};
            let finalFormConfig = existingFormConfig;
            if (subformKey) {
                existingFormConfig = existingFormConfig[subformKey] || {};
            }
            fldDatatypeVsMetaObject.lookup.forEach(eachLookupField => {
                if (eachLookupField && eachLookupField.lookup && eachLookupField.lookup.module && eachLookupField.lookup.module.id) {
                    let lookupModuleName, lookupModuleInfo = store.peekRecord('module', eachLookupField.lookup.module.id);
                    if (lookupModuleInfo && lookupModuleInfo.module_name) {
                        lookupModuleName = lookupModuleInfo.module_name;
                    } else if (eachLookupField.lookup.module.api_name) {
                        lookupModuleName = eachLookupField.lookup.module.api_name;
                    }
                    if (lookupModuleName === 'Campaigns') {
                        if (!existingFormConfig.hasOwnProperty('api_name')) {
                            existingFormConfig.api_name = {};
                        }
                        if (existingFormConfig.api_name && !existingFormConfig.api_name.hasOwnProperty(eachLookupField.api_name)) {
                            existingFormConfig.api_name[eachLookupField.api_name] = {};
                        }
                        existingFormConfig.api_name[eachLookupField.api_name].isLookupQuickCreateSupported = false;
                    }
                }
            });
            if (subformKey) {
                finalFormConfig[subformKey] = existingFormConfig;
            }
            Lyte.Component.set(layoutComponentData, formConfigurationsKey, finalFormConfig);
        }
    },
    registerUtilityMethods: function (layoutComponentDomNode) {
        /**
         * This utility function can be used to set the data into the form.
         * @utility setFormData
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { object } formData - The data to be set into the form.
         */
        this.$node.setFormData = (customData) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            layoutComponentDomNode.setFormData(customData);
        };
        /**
         * This utility function can be used to get the data of the form.
         * @utility getFormData
         * @author kuralarasan.s
         * @version 1.0.0
         */
        this.$node.getFormData = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getFormData();
        };
        this.$node.getFormDirtyAttributes = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getFormDirtyAttributes();
        };
        /**
         * This utility function can be used to get the subform data of the form. By default all subform data will be returned. If we need to a get a particular subform data, we can pass the subform api name as a parameter.
         * @utility getSubFormData
         * @author kuralarasan.s
         * @param { string } subformApiName - The api name of the subform for which the data is to be fetched.
         * @version 1.0.0
         */
        this.$node.getSubFormData = (subformApiName) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (subformApiName) {
                customData.subformApiName = subformApiName;
                customData.getAllSubformData = false;
            }
            return layoutComponentDomNode.getSubFormData(customData);
        };
        /**
         * This utility function can be used to validate the form.
         * @utility validateForm
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { boolean } validateSubform - If this parameter is passed as false, then the subform will not be validated.
         * @param { boolean } validateAndSave - If this parameter is passed as false, then the form will be validated but not saved.
         */
        this.$node.validateForm = (validateSubform, validateAndSave) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (validateSubform !== undefined) {
                customData.validateSubform = validateSubform;
            }
            if (validateAndSave !== undefined) {
                customData.validateAndSave = validateAndSave;
            }
            return layoutComponentDomNode.validateForm(customData);
        };
        /**
         * This utility function can be used to validate the subform.
         * @utility validateSubform
         * @author kuralarasan.s
         * @version 1.0.0
         * @param { string } subformApiName - The api name of the subform for which the data is to be validated.
         */
        this.$node.validateSubform = (subformApiName) => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            let customData = {};
            if (subformApiName) {
                customData.subformApiName = subformApiName;
            }
            return layoutComponentDomNode.validateSubform(customData);
        };
        /**
         * This utility function can be used to destroy the form.
         * @utility destroyComponent
         * @author kuralarasan.s
         * @version 1.0.0
         */
        this.$node.destroyComponent = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            layoutComponentDomNode.destroyComponent();
        };
        this.$node.getContentWrapperClass = () => {
            if (!layoutComponentDomNode) {
                layoutComponentDomNode = this.getLayoutDomNode();
            };
            if (!layoutComponentDomNode) { return; };
            return layoutComponentDomNode.getContentWrapperClass();
        };
    },
    getExposedCXPropertiesList: function () {
        return ['cxPropCurrentPage',
            'cxPropModuleData',
            'cxPropLayoutRulesRequired',
            'cxPropValidationRulesRequired',
            'cxPropRecordData',
            'cxPropRecordId',
            'cxPropOutletValue',
            'cxPropModuleId',
            'cxPropModuleApiName',
            'cxPropLayoutName',
            'cxPropLayoutSections',
            'cxPropLayoutData',
            'cxPropLayoutId',
            'cxPropFormData'];
    },
    // filterValidUITypes: async function (recordData, currentPage, moduleFields, argumentsObj = {}) {
    //     let lyteScope = window.Lyte || Lyte,
    //         recordForFunction = {};
    //     if (lyteScope) {
    //         try {
    //             if (!lyteScope.registeredMixins['crm-create-mixin']) {
    //                 await Lyte.injectResources([networkUtils.returnDependencyFiles(['crm-create-mixin.js'], ResourceConstants.CRMClient)]);
    //             }
    //             if (lyteScope.registeredMixins['crm-create-mixin']) {
    //                 recordForFunction = lyteScope.registeredMixins['crm-create-mixin'].filterValidUITypes(recordData, currentPage, moduleFields, argumentsObj);//no i18n
    //                 return recordForFunction;
    //             }
    //         } catch (exception) {
    //             argumentsObj.isExceptionOccured = true;
    //             argumentsObj.exception = exception;
    //         }
    //     }
    //     return recordForFunction
    // }
}, {
    mixins: [
        "crm-crux-create-base-mixin",//No I18n
        "crm-crux-create-requesthandler-mixin"//No I18n
    ],
    'alias': 'crm-create-form'
});

/**
* @syntax nonYielded
<crm-create-form
cx-prop-content-overflow="true"
cx-prop-layout-information-type="layoutData"
cx-prop-module-information-type="moduleData"
cx-prop-module-data='{"module_name":"DemoLead","api_name":"Demo_Lead","id":"111113000000002405","creatable":true,"editable":true,"profiles":[{"name":"Administrator","id":"111113000000000423"},{"name":"Standard","id":"111113000000000425"}],"layouts":[{"name":"Standard","display_label":"Standard","id":"111113000000003315","profiles":[{"default":true,"name":"Administrator","id":"111113000000000423","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}},{"default":true,"name":"Standard","id":"111113000000000425","_default_view":{"name":"Standard","id":"111113000000003315","type":"layout"}}],"generated_type":"system","source":"crm","status":"active","visible":true}]}'
cx-prop-layout-data='{"id":"111113000000003315","sections":[{"api_name":"DemoLead Information","column_count":2,"name":"DemoLead Information","display_label":"DemoLead Information","sequence_number":2,"tab_traversal":2,"type":"used","fields":[{"api_name":"Owner","sequence_number":3,"pick_list_values":[],"required":false,"length":120,"id":"111113000000004385","data_type":"ownerlookup","custom_field":false,"ui_type":8,"display_label":"DemoLead Owner","field_label":"DemoLead Owner","json_type":"jsonobject","column_name":"SMOWNERID","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Company","sequence_number":2,"pick_list_values":[],"required":true,"length":200,"id":"111113000000004387","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Company","field_label":"Company","json_type":"string","column_name":"COMPANY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},{"api_name":"First_Name","sequence_number":2,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","maps":[],"colour_code":null,"actual_value":"-None-","id":"111113000000017423","type":"used"},{"display_value":"Mr.","sequence_number":2,"reference_value":"Mr.","maps":[],"colour_code":null,"actual_value":"Mr.","id":"111113000000017426","type":"used"},{"display_value":"Mrs.","sequence_number":3,"reference_value":"Mrs.","maps":[],"colour_code":null,"actual_value":"Mrs.","id":"111113000000017429","type":"used"},{"display_value":"Ms.","sequence_number":4,"reference_value":"Ms.","maps":[],"colour_code":null,"actual_value":"Ms.","id":"111113000000017432","type":"used"}],"required":false,"length":40,"id":"111113000000004389","data_type":"text","custom_field":false,"ui_type":27,"display_label":"First Name","field_label":"First Name","json_type":"string","column_name":"FIRSTNAME","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Salutation","sequence_number":3,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017423","type":"used"},{"display_value":"Mr.","sequence_number":2,"reference_value":"Mr.","colour_code":null,"actual_value":"Mr.","id":"111113000000017426","type":"used"},{"display_value":"Mrs.","sequence_number":3,"reference_value":"Mrs.","colour_code":null,"actual_value":"Mrs.","id":"111113000000017429","type":"used"},{"display_value":"Ms.","sequence_number":4,"reference_value":"Ms.","colour_code":null,"actual_value":"Ms.","id":"111113000000017432","type":"used"}],"required":false,"length":25,"id":"111113000000004441","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"Salutation","field_label":"Salutation","json_type":"string","column_name":"SALUTATION","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Last_Name","sequence_number":1,"pick_list_values":[],"required":true,"length":80,"id":"111113000000004391","data_type":"text","custom_field":false,"ui_type":127,"display_label":"Last Name","field_label":"Last Name","json_type":"string","column_name":"LASTNAME","decimal_place":null,"read_only":false,"view_type":{"view":false,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Full_Name","sequence_number":4,"pick_list_values":[],"required":false,"length":120,"id":"111113000000004393","data_type":"text","custom_field":false,"ui_type":1,"display_label":"DemoLead Name","field_label":"DemoLead Name","json_type":"string","column_name":"FULLNAME","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":false,"quick_create":false,"create":false},"visible":true},{"api_name":"Designation","sequence_number":5,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004395","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Designation","field_label":"Title","json_type":"string","column_name":"DESIGNATION","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Email","sequence_number":4,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004397","data_type":"email","custom_field":false,"ui_type":25,"display_label":"Email","field_label":"Email","json_type":"string","column_name":"EMAIL","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},
{"api_name":"Phone","sequence_number":5,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004399","data_type":"phone","custom_field":false,"ui_type":33,"display_label":"Phone","field_label":"Phone","json_type":"string","column_name":"PHONE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":true,"create":true},"visible":true},{"api_name":"Fax","sequence_number":8,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004401","data_type":"text","custom_field":false,"ui_type":35,"display_label":"Fax","field_label":"Fax","json_type":"string","column_name":"FAX","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Mobile","sequence_number":6,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004403","data_type":"phone","custom_field":false,"ui_type":33,"display_label":"Mobile","field_label":"Mobile","json_type":"string","column_name":"MOBILE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Website","sequence_number":10,"pick_list_values":[],"required":false,"length":255,"id":"111113000000004405","data_type":"website","custom_field":false,"ui_type":21,"display_label":"Website","field_label":"Website","json_type":"string","column_name":"WEBSITE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},
{"api_name":"Lead_Source","sequence_number":11,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017228","type":"used"},{"display_value":"Advertisement","sequence_number":2,"reference_value":"Advertisement","colour_code":null,"actual_value":"Advertisement","id":"111113000000017231","type":"used"},{"display_value":"Cold Call","sequence_number":3,"reference_value":"Cold Call","colour_code":null,"actual_value":"Cold Call","id":"111113000000017234","type":"used"},{"display_value":"Employee Referral","sequence_number":4,"reference_value":"Employee Referral","colour_code":null,"actual_value":"Employee Referral","id":"111113000000017237","type":"used"}],"required":false,"length":120,"id":"111113000000004407","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"DemoLead Source","field_label":"DemoLead Source","json_type":"string","column_name":"LEADSOURCE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},
{"api_name":"Lead_Status","sequence_number":7,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017300","type":"used"},{"display_value":"Attempted to Contact","sequence_number":2,"reference_value":"Attempted to Contact","colour_code":"#add9ff","actual_value":"Attempted to Contact","id":"111113000000017294","type":"used"},{"display_value":"Contact in Future","sequence_number":3,"reference_value":"Contact in Future","colour_code":"#f8e199","actual_value":"Contact in Future","id":"111113000000017288","type":"used"},{"display_value":"Contacted","sequence_number":4,"reference_value":"Contacted","colour_code":"#ffd6bc","actual_value":"Contacted","id":"111113000000017285","type":"used"}],"required":false,"length":120,"id":"111113000000004409","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"DemoLead Status","field_label":"DemoLead Status","json_type":"string","column_name":"STATUS","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Industry","sequence_number":13,"pick_list_values":[{"display_value":"-None-","sequence_number":1,"reference_value":"-None-","colour_code":null,"actual_value":"-None-","id":"111113000000017309","type":"used"},{"display_value":"ASP (Application Service Provider)","sequence_number":2,"reference_value":"ASP (Application Service Provider)","colour_code":null,"actual_value":"ASP (Application Service Provider)","id":"111113000000017312","type":"used"},{"display_value":"Data/Telecom OEM","sequence_number":3,"reference_value":"Data/Telecom OEM","colour_code":null,"actual_value":"Data/Telecom OEM","id":"111113000000017330","type":"used"},{"display_value":"ERP (Enterprise Resource Planning)","sequence_number":4,"reference_value":"ERP (Enterprise Resource Planning)","colour_code":null,"actual_value":"ERP (Enterprise Resource Planning)","id":"111113000000017339","type":"used"}],"required":false,"length":120,"id":"111113000000004411","data_type":"picklist","custom_field":false,"ui_type":2,"display_label":"Industry","field_label":"Industry","json_type":"string","column_name":"INDUSTRY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]},
{"api_name":"Address Information","column_count":2,"name":"Address Information","display_label":"Address Information","sequence_number":2,"tab_traversal":2,"type":"used","fields":[{"api_name":"Street","sequence_number":1,"pick_list_values":[],"required":false,"length":250,"id":"111113000000004491","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Street","field_label":"Street","json_type":"string","column_name":"LANE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"City","sequence_number":2,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004493","data_type":"text","custom_field":false,"ui_type":1,"display_label":"City","field_label":"City","json_type":"string","column_name":"CITY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"State","sequence_number":3,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004495","data_type":"text","custom_field":false,"ui_type":1,"display_label":"State","field_label":"State","json_type":"string","column_name":"STATE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Zip_Code","sequence_number":4,"pick_list_values":[],"required":false,"length":30,"id":"111113000000004497","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Zip Code","field_label":"Zip Code","json_type":"string","column_name":"CODE","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true},{"api_name":"Country","sequence_number":5,"pick_list_values":[],"required":false,"length":100,"id":"111113000000004499","data_type":"text","custom_field":false,"ui_type":1,"display_label":"Country","field_label":"Country","json_type":"string","column_name":"COUNTRY","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]},
{"api_name":"Description Information","column_count":1,"name":"Description Information","display_label":"Description Information","sequence_number":2,"tab_traversal":1,"type":"used","fields":[{"api_name":"Description","sequence_number":1,"pick_list_values":[],"required":false,"length":32000,"id":"111113000000004501","data_type":"textarea","custom_field":false,"ui_type":3,"display_label":"Description","field_label":"Description","json_type":"string","column_name":"DESCRIPTION","decimal_place":null,"read_only":false,"view_type":{"view":true,"edit":true,"quick_create":false,"create":true},"visible":true}]}]}'>
</crm-create-form>
*/