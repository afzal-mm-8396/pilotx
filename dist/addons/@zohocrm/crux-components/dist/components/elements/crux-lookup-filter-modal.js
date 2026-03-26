//$Id$
Lyte.Component.register("crux-lookup-filter-modal", {
_template:"<template tag-name=\"crux-lookup-filter-modal\"> <lyte-modal id=\"modalElem\" lt-prop-wrapper-class=\"cxLookupModal LookupModal cxBoxModal lookupListTable {{cxPropModalWrapperClass}}\" lt-prop-show=\"{{lbind(show)}}\" lt-prop-show-close-button=\"false\" lt-prop-bind-to-body=\"{{ltPropBindToBody}}\" lt-prop-offset=\"{&quot;top&quot; : &quot;0&quot;, &quot;left&quot; : &quot;center&quot;}\" lt-prop=\"{&quot;allowMultiple&quot; : &quot;true&quot;, &quot;width&quot; : &quot;80%&quot;, &quot;left&quot; : &quot;5%&quot;}\" on-before-close=\"{{method(&quot;closeModal&quot;)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <div class=\"componentWrapper\"> <crux-lookup-filter-view cx-prop-lookup-filter-wrapper-class=\"{{cxPropModalWrapperClass}}\" cx-prop-search-placeholder=\"{{cxPropSearchPlaceholder}}\" field-of-lookup-val=\"{{cxPropFieldOfLookupVal}}\" parent-module=\"{{cxPropParentModule}}\" default-criteria=\"{{cxPropDefaultCriteria}}\" default-criteria-str=\"{{cxPropDefaultCriteriaStr}}\" id=\"lookup_view_{{idIndex}}\" module=\"{{lbind(module)}}\" show=\"{{lbind(show)}}\" disp-init=\"{{dispInit}}\" on-data-loaded=\"{{method('onDataLoaded')}}\" mod-id=\"{{modId}}\" is-single=\"{{isSingle}}\" cx-prop-header=\"{{cxPropHeader}}\" display-field=\"{{lbind(displayField)}}\" record=\"{{lbind(record)}}\" selected-single=\"{{selectedSingle.id}}\" selected-single-record=\"{{lbind(selectedSingle)}}\" lookup-single=\"{{lbind(lookupSingle)}}\" module-name=\"{{lbind(moduleName)}}\" on-value-change=\"{{method('onValueChange')}}\" cx-prop-value=\"{{cxPropValue}}\" render-lookup=\"{{lbind(renderLookup)}}\" fields-obj=\"{{fieldsObj}}\" cx-prop-create-yield=\"{{cxPropCreateYield}}\" temp-close=\"{{lbind(tempClose)}}\" cx-prop-additional-params=\"{{cxPropAdditionalParams}}\" disable-related-to=\"{{cxPropDontShowRelatedDropdown}}\" related-record-data=\"{{relatedRecordData}}\" cx-prop-field=\"{{cxPropField}}\" cx-prop-return-full-object-on-get=\"{{cxPropReturnFullObjectOnGet}}\" cx-prop-default-fields=\"{{cxPropDefaultFields}}\" cx-prop-all-fields-needed=\"{{cxPropAllFieldsNeeded}}\" cx-prop-query-param=\"{{cxPropQueryParam}}\" is-related-record-passed=\"{{isRelatedRecordPassed}}\" before-request-change-data=\"{{method('changeData')}}\" cx-prop-profile-id=\"{{cxPropProfileId}}\" cx-prop-disabled-list=\"{{cxPropDisabledList}}\" on-module-get-success=\"{{method('moduleSuccess')}}\" cx-prop-show-all-fields=\"{{cxPropShowAllFields}}\"> <template is=\"yield\" yield-name=\"createYield\"><lyte-yield yield-name=\"createYield\"></lyte-yield></template> </crux-lookup-filter-view> </div> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"insertYield","position":[0]}]},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropDefaultCriteria","cxPropDefaultCriteriaStr","cxPropFieldOfLookupVal","cxPropParentModule","tempClose","fieldsObj","renderLookup","module","cxPropHeader","cxPropCreateYield","lookupSingle","sortedColumn","modId","show","cxPropHideHeaderOnNoContent","header","ltPropBindToBody","headerYields","relatedRecordData","cxPropDontShowRelatedDropdown","cxPropReturnFullObjectOnGet","cxPropSearchPlaceholder","cxPropDefaultFields","cxPropAllFieldsNeeded","cxPropQueryParam","isRelatedRecordPassed","cxPropField","cxPropShowAllFields","cxPropDisabledList","cxPropModalWrapperClass","cxPropProfileId"],
_observedAttributesType :["array","string","array","string","boolean","object","boolean","object","string","boolean","string","string","string","boolean","boolean","array","boolean","object","array","boolean","boolean","string","object","boolean","object","boolean","object","boolean","array","string","string"],
// No I18n
  data: function() {
    return {
      cxPropDefaultCriteria : Lyte.attr('array',{'default': []}),//NO I18N
      cxPropDefaultCriteriaStr : Lyte.attr('string'),//NO I18N 
      cxPropFieldOfLookupVal : Lyte.attr('array',{'default': []}),//NO I18N
      cxPropParentModule : Lyte.attr("string", {'default': ''}),//no i18n
      tempClose: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      fieldsObj: Lyte.attr("object", {// No I18n
        default: {}
      }),
      renderLookup: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      module: Lyte.attr("object", {// No I18n
        default: {}
      }),
      cxPropHeader: Lyte.attr("string"), //No I18n
      cxPropCreateYield: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      lookupSingle: Lyte.attr("string", {// No I18n
        default: ''
      }),
      sortedColumn: Lyte.attr("string"), // No I18n
      modId: Lyte.attr("string", {// No I18n
        default: ""
      }),
      show: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      cxPropHideHeaderOnNoContent: Lyte.attr("boolean", {// No I18n
        default: true
      }),
      header: Lyte.attr("array", {// No I18n
        default: []
      }),
      ltPropBindToBody: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      headerYields: Lyte.attr("object"), //No I18n
      relatedRecordData: Lyte.attr('array', {// No I18n
        'default': []// No I18n
      }),
      cxPropDontShowRelatedDropdown: Lyte.attr("boolean", {// No I18n
        default: false
      }),
      cxPropReturnFullObjectOnGet : Lyte.attr("boolean", {default : false}),//No I18n
      cxPropSearchPlaceholder : Lyte.attr("string"),//No I18n
      cxPropDefaultFields : Lyte.attr("object", {default : {}}),//NO I18N
      cxPropAllFieldsNeeded : Lyte.attr( 'boolean', { 'default' : false} ),//NO I18N
      cxPropQueryParam : Lyte.attr("object"),
      isRelatedRecordPassed : Lyte.attr("boolean", {default : false}),
      cxPropField : Lyte.attr("object"),
      cxPropShowAllFields: Lyte.attr("boolean", {default : false}),
      cxPropDisabledList : Lyte.attr("array", { default: []}),
      cxPropModalWrapperClass : Lyte.attr("string"), // No I18n
      cxPropProfileId: Lyte.attr('string',{default:typeof Crm!=="undefined"? Crm.userDetails.PROFILE_ID:''})
    }
  },
  init: function() {
    this.setData("headerYields", {// No I18n
      prefix: [{
        fixed: "enable",// No I18n
        class: "cxLookupWidthOnePerc"// No I18n
      }]
    })
    this.setData("ltPropBindToBody", true); //No I18n
  },
  didConnect: function() {
    if (this.data.cxPropRelatedId && this.data.relatedRecordData.length < 1 && !this.data.isRelatedRecordPassed) {
      this.setRelatedDropDown(this.data.cxPropRelatedId, this.data.cxPropRelatedName, this.data.cxPropRelatedModuleId)
    }

  },
  close: function() {
    this.setData("show", false); // No I18n
  },
  lookupInit: function(comp, modId, lookup, event, ddelem) {
    // var ele = this.$node.querySelector("crux-lookup-filter-view"); //No I18n
    var modal = this.$node.querySelector("lyte-modal");
    if(modal){
      var lookupViewComp = modal.component.childComp.querySelector("crux-lookup-filter-view").component;
      if(lookupViewComp){
        lookupViewComp.lookupInit(lookupViewComp, this.getData("modId"), true, ddelem); //No I18n
      }
    }
  },
  openModalAfterQuickCreate: function(elem) {
    //		elem.lookupInit(elem,elem.getData("modId"), true,ddelem);//No I18n
    elem.getRecs();
    //		elem.setData("show", true);// No I18n
  },
  setRelatedDropDown(relatedId, relatedName, relatedModuleId) {
    var dropDownArray = [],
      apiName;
    switch (store.peekRecord("module", relatedModuleId).api_name) { //No I18n
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
    //Need to handle if multiple IDS are passed. Not supported in parent component.
    dropDownArray.push({
      apiName: apiName,
      id: relatedId,
      name: _cruxUtils.getI18n("crm.related.contact.account", store.peekRecord('module', this.data.modId).plural_label, this.data.cxPropRelatedName) //No I18n
    });
    // Default Show All case
    if (!this.data.cxPropDontShowRelatedDropdown) {
      dropDownArray.push({
        id: 'all', //No I18n
        name: I18n.getMsg("crm.label.show") + " " + I18n.getMsg("crm.allcontact.show", store.peekRecord('module',this.data.modId).plural_label) // NO I18N
      })
    }

    this.setData('relatedRecordData', dropDownArray); //No I18n
  },
  methods: {
    onDataLoaded: function() {
      this.setData("show", true); // No I18n
    },
    closeModal: function() {
      //			if(this.getData("tempClose") && false){
      //				this.setData("show", false); //No I18N
      //			}else{
      this.setData({
        show: false,
        renderLookup: false
      });
      if(this.getMethods("onClose")){
        this.executeMethod("onClose");//No I18n
      }
      //			}
    },
    changeData : function(query, customData){
      if(this.getMethods("beforeRequestChangeData")){
        this.executeMethod("beforeRequestChangeData", query, customData, this.data.cxPropField)
      }
    },
    moduleSuccess : function(res){
        if(this.getMethods("onModuleGetSuccess")){
					this.executeMethod("onModuleGetSuccess" , res);
				}
    }
  }
});
