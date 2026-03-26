/*Currently Binary class feature works for fixed tags not request for tags.*/
Lyte.Component.register("crux-tag", {
_template:"<template tag-name=\"crux-tag\"> <lyte-dropdown lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-data-tabindex=\"{{cxPropDataTabindex}}\" lt-prop-aria=\"{{cxPropAria}}\" lt-prop-aria-body=\"{{cxPropAriaBody}}\" lt-prop-aria-button=\"{{cxPropAriaButton}}\" lt-prop-aria-box=\"{{cxPropAriaBox}}\" onmousedown=\"{{action('onMouseDown',this,event)}}\" onclick=\"{{action('onFocus',this)}}\" class=\"cxBoxDropdown {{if(cxPropTags.length,'cxTagTagsPresent','cxTagNoTagsPresent lyteDropNoOptSelected')}}\" lt-prop-selected=\"{{lbind(selectedList)}}\" lt-prop-yield=\"true\" on-before-add=\"{{method('beforeAddToList')}}\" on-add=\"{{method('addToList')}}\" on-before-remove=\"{{method('beforeRemoveFromList')}}\" on-remove=\"{{method('removeFromList')}}\" lt-prop-type=\"multisearch\" on-before-show=\"{{method('onBeforeOpenDropBox')}}\" on-hide=\"{{method('hideDropBox')}}\" on-before-hide=\"{{method('onBeforeHide')}}\" on-show=\"{{method('onOpenDropBox')}}\" lt-prop-boundary=\"{{cxPropBoundary}}\" on-before-scroll-close=\"{{method('dropdownScrollClose')}}\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-disable-item-tooltip=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <div class=\"lyteMultiselect {{if(cxPropRequestForTags.enable,'cxTagButtonHeight','')}}\"> <ul class=\"lyteMultipleSelect {{if(cxPropRequestForTags.enable,'cxTagSelectedListWrapper','')}}\"> <div id=\"cxSelectedLoader\" class=\"cxFlexCenter cxTagDropButtonInitialLoaderWrap\" style=\"{{if(loadingStateObj.initialSelectedLoader,'','display: none')}}\"> <span class=\"cxTagSearchLoader\"></span> </div> <div id=\"cxSelectedTagListContainer\" class=\"{{if(cxPropRequestForTags.enable,'cxTagSelectedList','cxSelectedTagListWrap')}}\" onscroll=\"{{action('selectedTagsScroll',event)}}\" style=\"{{if(loadingStateObj.initialSelectedLoader,'visibility: hidden;','')}}\"> <div class=\"cxFlexCenter\" style=\"{{if(loadingStateObj.scrollSelectedLoader,'','display: none')}}\"> <span class=\"cxTagSearchLoader\"></span> </div> <template is=\"for\" items=\"{{cxPropTags}}\" item=\"selitem\" index=\"indeval\"> <li onanimationend=\"{{action('animationEnd',indeval)}}\" id=\"{{concat('tag_',selitem[cxPropSystemValue])}}\" data-value=\"{{selitem[cxPropSystemValue]}}\" class=\"{{concat(tagAnimationArr[indeval].class,' ',if(selitem.class,selitem.class,''),' ',if(cxPropBinaryColor,selitem.binaryColor,' '))}}\" style=\"{{tagAnimationArr[indeval].style}}\"> <lyte-text class=\"lyteDropdownVisible\" lt-prop-value=\"{{selitem[cxPropDisplayValue]}}\"> </lyte-text> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input lt-prop-disabled=\"{{cxPropInputDisabled}}\" on-blur=\"{{method('onBlur')}}\" lt-prop-update-delay=\"{{unDef}}\" lt-prop-value=\"{{lbind(cxPropInputValue)}}\" data-zcqa=\"searchTags\" class=\"cxTagSearch\" lt-prop-type=\"text\" lt-prop-placeholder=\"{{cxPropInputPlaceholder}}\" onkeydown=\"{{action('onKeyDown',this,event)}}\" oninput=\"{{action('onInput',event,this)}}\" on-focus=\"{{method('onInputFocus',this)}}\"></lyte-input> </li> </div> </ul> </div> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox cxTagDropBox {{cxPropBoxClass}}\"> <lyte-drop-body onscroll=\"{{action('tagOptionsScroll',event)}}\"> <div class=\"cxTagDropboxInitialLoaderWrap\" style=\"{{if(loadingStateObj.initialOptionLoader,'','display: none')}}\"> <span class=\"cxTagSearchLoader\"></span> </div> <lyte-drop-item id=\"newTagId\" data-zcqa=\"newTag\" class=\"cxNewTagItem cxAlignItemCenter {{if(newTag,'','cxHideTagOption')}}\" data-value=\"{{newTagMsg}}\" lt-prop-title=\"{{newTagMsgTooltip}}\" style=\"{{if(loadingStateObj.initialOptionLoader,'display: none','display: flex')}}\"> <template is=\"if\" value=\"{{cxPropColorTags}}\"><template case=\"true\"> <crux-color-palette cx-prop-wrapper-class=\"tagsColorPalettePopover\" cx-palette-open=\"{{lbind(paletteOpen)}}\" cx-prop-id=\"{{cxPropId}}\" on-before-color-palette-hide=\"{{method('colorPaletteHide')}}\" cx-prop-show-text=\"{{cxPropShowText}}\" cx-prop-add-custom-colors-to-palette=\"{{cxPropAddCustomColorsToPalette}}\" cx-prop-default-colors=\"{{cxPropDefaultColors}}\" cx-prop-popover-width=\"{{cxPropPopoverWidth}}\"></crux-color-palette> </template></template> <span class=\" mR5 cxPropNewTagOptionMsg \">{{cxPropNewTagOptionMsg}}</span> <span class=\"cxNewTagLabel dIB cxVam\"> <lyte-text lt-prop-value=\"{{newTagMsg}}\"> </lyte-text> </span> </lyte-drop-item> <div class=\"cxDropdownNoResult\" style=\"{{if(duplicateSelected,if(loadingStateObj.initialOptionLoader,'display: none','display: block'),'display: none')}}\">{{duplicateSelectedMessage}}</div> <template is=\"if\" value=\"{{cxPropAllowDropdown}}\"><template case=\"true\"> <div style=\"{{if(loadingStateObj.initialOptionLoader,'display: none','display: block')}}\"> <template is=\"for\" items=\"{{cxPropTagOptions}}\" item=\"item\" index=\"indval\"> <lyte-drop-item id=\"{{concat('tagItem_',item[cxPropSystemValue])}}\" class=\"tagOptionsItems {{tagOptionsMirror[indval].class}}\" data-zcqa=\"tag_{{item[cxPropSystemValue]}}\" data-value=\"{{item[cxPropSystemValue]}}\"> <span class=\"cxTagDropItemChild {{if(cruxOr(ifEquals(item.color_code,'noFill'),negate(item.color_code)),'cxTagNoFillCol','')}}\" style=\"background: {{if(cruxOr(ifEquals(item.color_code,'noFill'),negate(item.color_code)),'white',concat(item.color_code,' !important;'))}}; color : {{cruxGetPicklistFontColor(item.color_code)}}\"> <lyte-text lt-prop-tooltip-class=\"cxTagDropboxTooltip\" class=\"pR\" lt-prop-value=\"{{item[cxPropDisplayValue]}}\"> </lyte-text> </span> </lyte-drop-item> </template> </div> <div class=\"cxDropdownNoResult\" style=\"{{if(noValue,if(loadingStateObj.initialOptionLoader,'display: none','display: block'),'display: none')}}\">{{cxPropNoMoreTagOptionsMsg}}</div> </template></template> <div class=\"cxFlexCenter\" style=\"{{if(loadingStateObj.scrollOptionLoader,'','display: none')}}\"> <div class=\"cxTagSearchLoader\"></div> </div> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.initialSelectedLoader","''","'display: none'"]}}}},{"type":"attr","position":[1,1,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.initialSelectedLoader","'visibility: hidden;'","''"]}}}},{"type":"attr","position":[1,1,1,3,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.scrollSelectedLoader","''","'display: none'"]}}}},{"type":"attr","position":[1,1,1,3,3]},{"type":"for","position":[1,1,1,3,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"tagAnimationArr[indeval].style"}}},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,5,1]},{"type":"componentDynamic","position":[1,1,1,3,5,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.initialOptionLoader","''","'display: none'"]}}}},{"type":"attr","position":[3,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.initialOptionLoader","'display: none'","'display: flex'"]}}}},{"type":"attr","position":[3,1,3,1]},{"type":"if","position":[3,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[3,1,3,3,0]},{"type":"attr","position":[3,1,3,5,1]},{"type":"componentDynamic","position":[3,1,3,5,1]},{"type":"componentDynamic","position":[3,1,3]},{"type":"attr","position":[3,1,5],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["duplicateSelected",{"type":"helper","value":{"name":"if","args":["loadingStateObj.initialOptionLoader","'display: none'","'display: block'"]}},"'display: none'"]}}}},{"type":"text","position":[3,1,5,0]},{"type":"attr","position":[3,1,7]},{"type":"if","position":[3,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.initialOptionLoader","'display: none'","'display: block'"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'background: '",{"type":"helper","value":{"name":"if","args":[{"type":"helper","value":{"name":"cruxOr","args":[{"type":"helper","value":{"name":"ifEquals","args":["item.color_code","'noFill'"]}},{"type":"helper","value":{"name":"negate","args":["item.color_code"]}}]}},"'white'",{"type":"helper","value":{"name":"concat","args":["item.color_code","' !important;'"]}}]}},"'; color : '",{"type":"helper","value":{"name":"cruxGetPicklistFontColor","args":["item.color_code"]}}]}}}},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["noValue",{"type":"helper","value":{"name":"if","args":["loadingStateObj.initialOptionLoader","'display: none'","'display: block'"]}},"'display: none'"]}}}},{"type":"text","position":[3,0]}]}},"default":{}},{"type":"attr","position":[3,1,9],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["loadingStateObj.scrollOptionLoader","''","'display: none'"]}}}},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropTagOptions","cxPropTags","cxPropAllowDropdown","cxPropCommaSeperation","cxPropPreventKeyList","cxPropCreteTagKey","cxPropNoMoreTagOptionsMsg","cxPropNewTagOptionMsg","cxPropInputPlaceholder","cxPropMaxOptionsLimit","cxPropMaxTagLimit","cxPropCreateOnAdd","cxPropAllowNewTagCreations","cxPropInputValue","cxPropMaxTagLength","cxPropBoxClass","cxPropInputDisabled","cxPropId","cxPropBoundary","cxPropScope","cxPropDoubleBackSpace","cxPropColorTags","cxPropClass","cxPropDisabled","cxPropTagModelDetails","cxPropBinaryColor","cxPropDisplayValue","cxPropSystemValue","cxPropColorCodeKey","cxPropUpdateNewTagDetails","cxPropRequestForTags","cxPropNewlySelectedTags","cxPropNewlyUnSelectedTags","cxPropSelectedColor","cxPropShowText","cxPropAddCustomColorsToPalette","cxPropWrapperClass","cxPropDefaultColors","duplicateSelectedMessage","loadingStateObj","selectedList","noValue","newTag","duplicateSelected","newTagMsg","onFocus","tagAnimationArr","paletteOpen","selectedTagsInstance","tagOptionsInstance","tagOptionsMirror","cxPropCreateTagOnBlur","cxPropAria","cxPropPopoverWidth"],
_observedAttributesType :["array","array","boolean","boolean","array","array","string","string","string","number","number","boolean","boolean","string","number","string","boolean","string","object","string","boolean","boolean","string","boolean","object","object","string","string","string","boolean","object","array","array","string","boolean","boolean","string","array","string","object","string","boolean","boolean","boolean","string","boolean","array","boolean","object","object","array","boolean","boolean","string"],
 //NO I18N
  data: function() {
    return {
      //Exposed to the Developers to interact

      //Exp : List of tags to be to populate the drop-downs options
      cxPropTagOptions: Lyte.attr('array', { //NO I18N
        default: []
      }),
      //Exp : List of tags to be shown in the drop buttons as the created tags
      cxPropTags: Lyte.attr('array', { //NO I18N
        default: []
      }),
      //Exp : Hold to enable or disable the ability of the drop-down to show the list i.e cxPropTagOptions
      cxPropAllowDropdown: Lyte.attr('boolean', { //NO I18N
        default: true
      }),
      //Exp : Hold to enable or disable the ability to split the current input into multiple tags using the keyword ',' as the seperator
      cxPropCommaSeperation: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : List of keywords or keycodes to block while creating a tag.
      cxPropPreventKeyList: Lyte.attr('array', { //NO I18N
        default: []
      }),
      //Exp : List of keywords or keycodes to be used to create a tag.
      cxPropCreteTagKey: Lyte.attr('array', { //NO I18N
        default: [",", 13, 9] //NO I18N
      }),
      //Exp : Text to be shown when there are no more tags to select from the list of tags i.e cxPropTagOptions
      cxPropNoMoreTagOptionsMsg: Lyte.attr('string', { //NO I18N
        default: _cruxUtils.getI18n("crm.template.listview.search.no.results") //NO I18N
      }),
      //Exp : Text to be shown when a new tag has been entered in the input box.
      cxPropNewTagOptionMsg: Lyte.attr('string', { //NO I18N
        default: _cruxUtils.getI18n('crm.label.tag.new') //NO I18N
      }),
      //Exp : Text to be the set as the place holder for the input box.
      cxPropInputPlaceholder: Lyte.attr('string', { //NO I18N
        default: _cruxUtils.getI18n('crm.label.enter.tag') //NO I18N
      }),
      //Exp : The limit to the number of options the component can have i.e cxPropTagOptions
      cxPropMaxOptionsLimit: Lyte.attr('number', { //NO I18N
        default: 0
      }),
      //Exp : The limit to the number of tag the user can create
      cxPropMaxTagLimit: Lyte.attr('number', { //NO I18N
        default: 0
      }),
      //Exp : Hold to enable or diable validation when a tag is created.
      cxPropCreateOnAdd: Lyte.attr('boolean', { //NO I18N
        default: true
      }),
      //Exp : Hold to enable or diable tag creation.
      cxPropAllowNewTagCreations: Lyte.attr('boolean', { //NO I18N
        default: true
      }),
      //Exp : Hold to access the the value in the input box.
      cxPropInputValue: Lyte.attr('string', { //NO I18N
        default: "" //NO I18N
      }),
      //Exp : Hold to set the max length off an tag.
      cxPropMaxTagLength: Lyte.attr('number', { //NO I18N
        default: 25
      }),
      //Exp : Hold to pass a class to the dropdown box i.e lyte-drop-box
      cxPropBoxClass: Lyte.attr('string', { //NO I18N
        default: "" //NO I18N
      }),
      //Exp : Hold to enable or disable the input box.
      cxPropInputDisabled: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : Hold to pass the cxPropId off the crux-color-palette
      cxPropId: Lyte.attr('string'), //NO I18N
      //Exp : Hold to set the ltPropBoundry of dropdown
      cxPropBoundary: Lyte.attr('object', { //NO I18N
        default: {}
      }),
      //Exp : Hold to set the ltpropScope of dropdown
      cxPropScope: Lyte.attr('string'), //NO I18N
      //Exp : Hold to enable or disable removal of tag using double back backspacs.
      cxPropDoubleBackSpace: Lyte.attr('boolean', { //NO I18N
        default: true
      }),
      //Exp : Boolean to enable or disable color tags
      cxPropColorTags : Lyte.attr('boolean',{ //NO I18N
        default : true
      }),
      //EXP : Currently Not Used
      cxPropClass : Lyte.attr("string"), //NO I18N
      //Exp : Passed the  boolean value to ltPropDisabled of dropdown to determins disaboes status of the entire component
      cxPropDisabled : Lyte.attr('boolean',{default : false}), //NO I18N
      //Exp : A object to get the tag request details
      cxPropTagModelDetails: Lyte.attr('object', { //NO I18N
        default: {}
      }),
      //Exp : A boolean to know if binary tags is enabled or not.
      cxPropBinaryColor : Lyte.attr('object',{ //NO I18N
        default : {
          enable : false,
          existingTagClass : "", //NO I18N
          newTagClass : "" //NO I18N
        }
      }),
      //Exp : By default the tag display value will be got using the key called name, If needed to be changed we can do so by updating this variable.
      cxPropDisplayValue: Lyte.attr('string', { //NO I18N
        default: "name" //NO I18N
      }),
      //Exp : By default the tag system value will be got using the key called name, If needed to be changed we can do so by updating this variable.
      cxPropSystemValue: Lyte.attr('string', { //NO I18N
        default: "name" //NO I18N
      }),
      //Exp : By default the colour_code will be set into the key called color_code, If needed to be changed we can do so by updating this variable.
      cxPropColorCodeKey: Lyte.attr('string', { //NO I18N
        default: "color_code" //NO I18N
      }),
      //Exp : Key is New tag will be pushed into the cxPropTags , If it is not required we can use this boolean to prevent it from getting set.
      cxPropUpdateNewTagDetails: Lyte.attr('boolean', { //NO I18N
        default: "true" //NO I18N
      }),
      //Exp : This object contains the details for enabling request for tags.
      cxPropRequestForTags: Lyte.attr('object', { //NO I18N
        default: {
          enable : false,
          reverseOrder: true,
          lazyLoadDetails : {
            selected: {
              batchSize: 20,
              perPage: 200,
              excludeList: []
            },
            unselected: {
              batchSize : 20,
              perPage: 200,
              excludeList: []
            }
          }
        }
      }),
      /*//Exp : So the key passed to this will be taken and shown as info to the user when a duplicate tag present in the selected list.
      cxPropDuplicateSelectedMessage: Lyte.attr('string', { //NO I18N
        default: "Is already Selected" //NO I18N
      }),*/
      //Exp : A list of newly selected tags.
      cxPropNewlySelectedTags: Lyte.attr('array', { //NO I18N
        default: []
      }),
      //Exp : A list of newly unSelected tags.
      cxPropNewlyUnSelectedTags: Lyte.attr('array', { //NO I18N
        default: []
      }),
      cxPropSelectedColor: Lyte.attr('string', { //NO I18N
        default: ""
      }),

      //NEW FROM COLOR PALETTE
      cxPropShowText : Lyte.attr("boolean", {default : false}),//NO I18N
      cxPropAddCustomColorsToPalette : Lyte.attr("boolean", {default : false}),//NO I18N
      cxPropWrapperClass : Lyte.attr("string", {default :''}),//NO I18N
      cxPropDefaultColors : Lyte.attr('array',{default : ['#F17574','#F48435','#E7A826','#FEDA62','#A8C026','#63C57E','#1DB9B4','#57B1FD','#879BFC','#D297EE','#FD87BD',"#969696",'#658BA8','#B88562','#A35164']}), //NO I18N



      //Internal data variiables not to be set from outside
      //Exp : The final constructed message used to display the info info to the user when a duplicate tag present in the selected list.
      duplicateSelectedMessage: Lyte.attr('string', { //NO I18N
        default: "" //NO I18N
      }),
      //Exp : An object which contains the info as to which loader is to be shown.
      loadingStateObj: Lyte.attr('object', { //NO I18N
        default: {
          initialSelectedLoader: false,
          scrollSelectedLoader:false,
          initialOptionLoader:false,
          scrollOptionLoader:false
        }
      }),
      //Exp : This is the selected list of tags i.e the stringified unique keys of tags passed to ltPropSelected
      selectedList: Lyte.attr('string'), //NO I18N
      //Exp : boolean set to decide if no tag options are available or not
      noValue: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : boolean set to decide if the current tag is new or not.
      newTag: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      duplicateSelected:Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : String which holds the tag name to be show along with the new tag message.
      newTagMsg: Lyte.attr('string'), //NO I18N
      //Exp : A boolean set to decide if the component is focused or not.
      onFocus: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : A list of parallel to cxPropTags which contains the triggers used to identify states of a current tag being interacted with.
      tagAnimationArr: Lyte.attr('array', { //NO I18N
        default: []
      }),
      //Exp : A boolean whiich is tied to cxPaletteOpen of crux-color-Palette
      paletteOpen: Lyte.attr('boolean', { //NO I18N
        default: false
      }),
      //Exp : This variable contains the instance of lazy loading for the selected tags list
      selectedTagsInstance: Lyte.attr('object', { //NO I18N
        default: {}
      }),
      //Exp : This variable contains the instance of lazy loading for the unselected tags list
      tagOptionsInstance: Lyte.attr('object', { //NO I18N
        default: {}
      }),
      //Exp : 
      tagOptionsMirror: Lyte.attr('array', { //NO I18N
        default: []
      }),
      cxPropCreateTagOnBlur: Lyte.attr('boolean'), //NO I18N
      cxPropAria : Lyte.attr('boolean', {default : false}),
      cxPropPopoverWidth: Lyte.attr('string', { default: '240px' }) //no i18n
    }
  },

  //Observers -- Start
  //Will observe cxPropInputDisabled and blur the component.
  inputDisabled: function() {
    var reqDiv = this.$node.querySelector(".lyteDummyEventContainer"); //NO I18N
    if (this.data.cxPropInputDisabled) {
      reqDiv.onblur = function() {
        this.setData("onFocus", false); //NO I18N
      }.bind(this);
    } else {
      reqDiv.onblur = null;
    }
  }.observes("cxPropInputDisabled").on("didConnect"), //NO I18N

  //Observes cxPropTagOptions to determine weather or not to show no result div or not
  resetNoResultDiv: function() {
    if (this.data.cxPropTagOptions.length > 0) {
      this.setData("noValue", false); //NO I18N
    }
  }.observes('cxPropTagOptions'), //NO I18N

  tagOptionsMirrorObs: function(observedValue){
    var output;
      if(!observedValue){
        output = this.setOptionsDetails(this.data.cxPropTagOptions);
        this.setData("tagOptionsMirror" , output); //NO I18N
      } else if (observedValue.type === "change") {
          output = this.setOptionsDetails(this.data.cxPropTagOptions);
          this.setData("tagOptionsMirror" , output); //NO I18N
        } else if (observedValue.type === "array") {
          var options, optionsLen;
          if (observedValue.removedItems && observedValue.removedItems.length) {
            optionsLen = observedValue.removedItems.length;
              for (var i = 0; i < optionsLen; i++) {
                Lyte.arrayUtils(this.data.tagOptionsMirror, 'removeAt', observedValue.index + i, 1); //NO I18N
              }
          } 
          if (observedValue.insertedItems && observedValue.insertedItems.length) {
            options = observedValue.insertedItems;
            output = this.setOptionsDetails(options);
            Lyte.arrayUtils(this.getData("tagOptionsMirror"), 'insertAt', observedValue.index , output); //NO I18N
          }
        }
  }.observes('cxPropTagOptions.[]').on('didConnect'), //NO I18N

  //The tag animation array is an mirror of cxPropTags so when the user changes cxPropTags this observer will do the same to tag animation array.
  //Operations need to be acted upon through data likke trigerriing animations etc will push into this rather than cxPropTags.
  resetTagAnimationArr: function(observedValue) {
    var binaryColorDetails = this.data.cxPropBinaryColor;
    if(binaryColorDetails.enable && !this.internalSelectedUpdate){
      this.setBinaryClass(binaryColorDetails);
    }
    if (!observedValue) {
      this.checkIfSelectedIsToBeSet(false);
    } else {
      var tags = this.data.cxPropTags;
      if (!this.preventTagsObserver) {
        if (observedValue.type == "change") {
          var newValues = observedValue.newValue;
          var newLength = newValues.length;
          var newAnimationArr = [];
          var newSelectedList = [];
          for (let i = 0; i < newLength; i++) {
            Lyte.arrayUtils(newAnimationArr, 'push', { //NO I18N
              doAnimation: false,
              highlightTag: false,
              color_code: "", //NO I18N
              class : "", //NO I18N
              style : "" //NO I18N
            });
            newAnimationArr[i] = this.calculateTagClass(newAnimationArr[i] , i);
            newSelectedList.push(newValues[i][this.data.cxPropSystemValue]);
          }
          this.setData('selectedList', JSON.stringify(newSelectedList)); //NO I18N
          this.setData("tagAnimationArr", newAnimationArr); //NO I18N
        } else if (observedValue.type == "array") {
          var observedInsertLen;
          if (observedValue.removedItems && observedValue.removedItems.length) {
            observedInsertLen = observedValue.removedItems.length;
            for (let i = 0; i < observedInsertLen; i++) {
              Lyte.arrayUtils(this.data.tagAnimationArr, 'removeAt', observedValue.index + i, 1); //NO I18N
              this.removeLatestSelected(observedValue.removedItems[i][this.data.cxPropSystemValue]);
            }
          }
          if (observedValue.insertedItems && observedValue.insertedItems.length) {
            observedInsertLen = observedValue.insertedItems.length;
            for (let i = 0; i < observedInsertLen; i++) {
              var newAnimationObj = {};
              if (observedValue.index == tags.length - 1) {
                newAnimationObj = {
                  doAnimation: false,
                  highlightTag: false,
                  color_code: "", //NO I18N
                  class : "", //NO I18N
                  style : "" //NO I18N
                };
                newAnimationObj = this.calculateTagClass(newAnimationObj , observedValue.index);
                Lyte.arrayUtils(this.getData("tagAnimationArr"), 'push', newAnimationObj); //NO I18N
              } else {
                newAnimationObj = {
                  doAnimation: false,
                  highlightTag: false,
                  color_code: "", //NO I18N
                  class : "", //NO I18N
                  style : "" //NO I18N
                };
                newAnimationObj = this.calculateTagClass(newAnimationObj , observedValue.index + i);
                Lyte.arrayUtils(this.getData("tagAnimationArr"), 'insertAt', observedValue.index + i, newAnimationObj); //NO I18N
              }
              this.addToSelectedList(observedValue.insertedItems[i][this.data.cxPropSystemValue]);
            }
          }
        }
      } else {
        this.preventTagsObserver = false;
      }
    }
  }.observes('cxPropTags.[]').on('didConnect'), //NO I18N

  //This obeservs variable onFocus to set/remove an class to the lyte-drop-button
  focusObserver: function(value) {
    if (value.newValue) {
      this.$node.querySelector('lyte-drop-button').classList.add('cxDropButtonFocused') //NO I18N
    } else {
      this.$node.querySelector('lyte-drop-button').classList.remove('cxDropButtonFocused') //NO I18N
    }
  }.observes('onFocus'), //NO I18N

  //This observer is used to decide weather or not to show tool tip.
  newTagMsgObserver : function(){
    var item = this.bodyDrop && this.bodyDrop.querySelector('#newTagId'); //NO I18N
    if(item){
      var width = item.offsetWidth,scrollWidth = item.scrollWidth;
      if(width < scrollWidth){
        this.setData('newTagMsgTooltip',this.data.newTagMsg)//NO I18N
      }else{
        this.setData('newTagMsgTooltip','')//NO I18N
      }
    }
  }.observes('newTagMsg'),//NO I18N


  //!!Check This Below Function
  newTag: function(obj) {
    if (this.getData("cxPropAllowDropdown")) {
      var drop = this.$node.querySelector("lyte-dropdown"); //NO I18N
      var child = drop.component.childComp ? drop.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N
      if (!child.classList.contains("lyteDropdownHidden")) {
        if (obj.newValue) {
          /*if (event.keyCode > 40 || event.keyCode < 37) {*/
          $L('.lyteDropdownSelection', this.bodyDrop).removeClass('lyteDropdownSelection'); //NO I18N
          $L('.cxNewTagItem', this.bodyDrop).addClass('lyteDropdownSelection'); //NO I18N
          /*}*/
        } else {
          if (!$L('.lyteDropdownSelection', this.bodyDrop).length) {
            var listofitems = $L('lyte-drop-item', this.bodyDrop); //NO I18N
            if (listofitems[0].id === 'newTagId') {
              if(listofitems[1]){
                listofitems[1].classList.add('lyteDropdownSelection'); //NO I18N
              }
            } else {
              listofitems[0].classList.add('lyteDropdownSelection'); //NO I18N
            }
          }
        }
      }
    }
  }.observes('newTag'), //NO I18N

  //Observers -- End

  //Lyte Function -- Start
  init: function(){

    if(!this.data.cxPropCreateTagOnBlur && this.data.cxPropCreateTagOnBlur !== false){
      if(this.data.cxPropAllowDropdown){
        this.setData("cxPropCreateTagOnBlur", false); //NO I18N
      } else {
        this.setData("cxPropCreateTagOnBlur", true); //NO I18N
      }
    }

    if(this.data.cxPropRequestForTags.enable){
      this.checkForIncompleteLazyLoadData();
      //Setting the mixin variables with the data passed from the user if not then set it with default value
      this.tagOptionsInstance = $L.cruxLazyLoad({
        lzCustomData : {
          type : "options" //NO I18N
        },
        lzProperties : {
          customRequest : true,
          triggerSearchLength : 1,
          searchRequestDetails : {
            parseResponseKey : "tags"
          },
          primaryKey : this.data.cxPropSystemValue,
          perPage : this.data.cxPropRequestForTags.lazyLoadDetails.unselected.perPage,
          batchSize : this.data.cxPropRequestForTags.lazyLoadDetails.unselected.batchSize,
          excludeList : this.data.cxPropRequestForTags.lazyLoadDetails.unselected.excludeList
        },
        lzMethods : {
          onCustomRequest : this.optionsCustomRequestFunc.bind(this),
          onLoadingStateUpdate : this.loadingStateUpdateFunc.bind(this),
          onNewBatch : this.optionsNextBatchFunc.bind(this),
          onRequestResolved : this.optionsAfterRequestFunc.bind(this),
          onBeforeRequestTriggered : this.optionsBeforeRequestFunc.bind(this),
          onInvalidResponse : this.optionsInvalidResponseFunc.bind(this),
          beforeSearchRequestTriggered : this.optionsBeforeSearchRequestFunc.bind(this),
          cancelResponse : this.optionsCancelResponse.bind(this)
        }
      });
      this.selectedTagsInstance = $L.cruxLazyLoad({
        lzCustomData : {
          type : "selected" //NO I18N
        },
        lzProperties : {
          customRequest : true,
          reverseLazyLoadScroll : true,
          primaryKey : this.data.cxPropSystemValue,
          perPage : this.data.cxPropRequestForTags.lazyLoadDetails.selected.perPage,
          batchSize : this.data.cxPropRequestForTags.lazyLoadDetails.selected.batchSize,
          excludeList : this.data.cxPropRequestForTags.lazyLoadDetails.selected.excludeList
        },
        lzMethods : {
          updateQueryParams : this.selectedQueryParams.bind(this),
          onLoadingStateUpdate : this.loadingStateUpdateFunc.bind(this),
          onNewBatch : this.selectedNextBatchFunc.bind(this),
          onCustomRequest : this.selectedCustomRequestFunc.bind(this),
          onInvalidResponse : this.selectedInvalidResponseFunc.bind(this)
        }
      });

      this.openCount = 0;
      this.openingReq = true;
      this.selectedTagsInstance.constructNextBatch();
      this.isInitialOptionsReqPending = false;
    }
  },
  optionsCancelResponse: function(instance, response, isSearchRequest){
    var retValue = false;
    if(!isSearchRequest && instance.properties.searchValue){
      retValue = true;
    } else if(isSearchRequest && !instance.properties.searchValue){
      retValue = true;
    }
    return retValue;
  },
  //Destroying the DOM Stored when component is closed.
  didDestroy: function() {
    delete this.bodyDrop;
  },

  //Set the functions which can be accessed by the user and also set the initial values of tag animation array
  didConnect: function() {
    this.setDataToScope();

    //Utilitys to the user of this component -- start
    //Used to perform validation off the tag name provided
    this.$node.checkList = function(value) {
      this.callFromOut = true;
      var returnVal = this.checkCharacter(value);
      this.callFromOut = false;
      return returnVal;
    }.bind(this);

    //Can be invoked to toggle the component where the attributes is to invoke specific toggle states.
    this.$node.toggle = function(value) {
      this.setFromExternalDeveloper = true;
      this.toggleComp(value);
      setTimeout(function(){
        this.setFromExternalDeveloper = false;
      }.bind(this),10)
    }.bind(this);

    //Utility to focus the component
    this.$node.focus = function() {
      this.setData("onFocus", false); //NO I18N
      this.setData("onFocus", true); //NO I18N
      this.$node.querySelector(".cxTagSearch").focus(); //NO I18N
    }.bind(this);

    //Utility to blur the component
    this.$node.blur = function() {
      this.setData("onFocus", false); //NO I18N
      this.$node.querySelector(".cxTagSearch").blur(); //NO I18N
    }.bind(this);

    //Utility to reset the component properly i.e remove the data typed and reset data variables
    this.$node.resetSearch = function() {
      this.resetSearch();
    }.bind(this);

    //!!Check This Below Function
    this.$node.resetPosition = function() {
      this.$node.querySelector('lyte-dropdown').resetPosition(); //NO I18N
      if (this.data.paletteOpen) {
        this.bodyDrop.querySelector('crux-color-palette').alignColorPalette(); //NO I18N
      }
    }.bind(this);

    //!!Check this below Code Block
    this.$node.addNewTag = function() {
      if (this.data.cxPropInputValue) {
        this.addNewTag(this.data.cxPropInputValue, "out"); //NO I18N
      }
    }.bind(this);

    //Utilitys to the user of this component -- end

    /*EXTRA CODE CHECK OUT*/
    if(!this.data.cxPropRequestForTags.enable){
      var tags = this.getData("cxPropTags"); //NO I18N
      var tagLen = 0;
      if(tags){
        var tagLen = tags.length;
      }
      for (var i = 0; i < tagLen; i++) {
        var valueToPush = {
          doAnimation: false,
          highlightTag: false,
          color_code: "", //NO I18N
          class : "", //NO I18N
          style : "" //NO I18N
        };
        if(this.data.cxPropColorTags){
          if(tags[i].color_code){
            valueToPush.color_code = tags[i].color_code;
          }
        }
        valueToPush = this.calculateTagClass(valueToPush , i);
        Lyte.arrayUtils(this.getData("tagAnimationArr"), 'push', valueToPush); //NO I18N
      }
    }


    /*DEVELOPMENT*/
    if(this.data.cxPropRequestForTags.enable){
      var selectedTagListContainer = $L('#cxSelectedTagListContainer', this.$node); //NO I18n
      selectedTagListContainer.scroll({showOn : 'hover', nested : true}); //NO I18n
    }
  },

  //Lyte Function -- End

  //Functions -- Start

  setOptionsDetails: function(options){
    var optionsLen = options.length;
    var output = [];
    if(optionsLen){
      for(var i = 0; i < optionsLen; i++){
        var optClass = "cxTagDropItem"; //NO I18N
        var obj = {};
        //optClass = optClass + " tag_" + options[i][this.data.cxPropSystemValue] + "_class"; //No I18N
        if(this.data.cxPropNewlySelectedTags.length){
          var newelySelected = this.data.cxPropNewlySelectedTags;
          var newelySelectedLen = newelySelected.length;
          for(var j = 0; j < newelySelectedLen; j++){
            if(newelySelected[j][this.data.cxPropSystemValue] === options[i][this.data.cxPropSystemValue]){
              optClass = optClass + " lyteDropdownActive"; //No I18N
            }
          }
        }
        obj.class = optClass;
        obj.id = options[i][this.data.cxPropSystemValue];
        output.push(obj);
      }
    }
    return output;
  },
  updateOptionActiveClass: function(type,value){
    if(type === "add"){
      var options = this.data.tagOptionsMirror;
      var optLen = options.length;
      for(var i = optLen - 1; i >= 0; i--){
        if(options[i].id === value){
          var output = options[i];
          if(!output.class.includes("lyteDropdownActive")){
            output.class = output.class + " lyteDropdownActive"; //NO I18N
          }
          Lyte.arrayUtils(this.getData("tagOptionsMirror"), 'replaceAt', i , output); //NO I18N
        }
      }
    } else {
      var options = this.data.tagOptionsMirror;
      var optLen = options.length;
      for(var i = optLen - 1; i >= 0; i--){
        if(options[i].id === value){
          var output = options[i];
          if(output.class.includes("lyteDropdownActive")){
            output.class = output.class.split(" lyteDropdownActive");//NO I18N
            output.class = output.class[0].concat(output.class[1]);
          }
          Lyte.arrayUtils(this.getData("tagOptionsMirror"), 'replaceAt', i , output); //NO I18N
        }
      }
    }
  },

  //This function will set the binary color of tags.
  checkForIncompleteLazyLoadData: function(){
    var updateRequestDetails = false, updateRequestDetailsObj = this.data.cxPropRequestForTags;
    if(!this.data.cxPropRequestForTags.reverseOrder && this.data.cxPropRequestForTags.reverseOrder !== false){
      updateRequestDetails = true;
      updateRequestDetailsObj.reverseOrder = true
    }
    if(!this.data.cxPropRequestForTags.lazyLoadDetails){
      updateRequestDetails = true;
      updateRequestDetailsObj.lazyLoadDetails = {
        selected: {
          batchSize: 20,
          perPage: 200,
          excludeList: []
        },
        unselected: {
          batchSize : 20,
          perPage: 200,
          excludeList: []
        }
      }
    } else {
      if(!this.data.cxPropRequestForTags.lazyLoadDetails.selected){
        updateRequestDetails = true;
        updateRequestDetailsObj.lazyLoadDetails.selected = {
          batchSize: 20,
          perPage: 200,
          excludeList: []
        }
      } else {
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.selected.batchSize){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.selected.batchSize = 20;
        }
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.selected.perPage){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.selected.perPage = 200;
        }
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.selected.excludeList){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.selected.excludeList = [];
        }
      }
      if(!this.data.cxPropRequestForTags.lazyLoadDetails.unselected){
        updateRequestDetails = true;
        updateRequestDetailsObj.lazyLoadDetails.unselected = {
          batchSize: 20,
          perPage: 200,
          excludeList: []
        }
      } else {
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.unselected.batchSize){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.unselected.batchSize = 20;
        }
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.unselected.perPage){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.unselected.perPage = 200;
        }
        if(!this.data.cxPropRequestForTags.lazyLoadDetails.unselected.excludeList){
          updateRequestDetails = true;
          updateRequestDetailsObj.lazyLoadDetails.unselected.excludeList = [];
        }
      }
    }
    if(updateRequestDetails){
      this.setData("cxPropRequestForTags", updateRequestDetailsObj);//NO I18N
    }
  },
  setBinaryClass: function(binaryColorDetails){
    var selectedTags = this.getData("cxPropTags");//NO I18N
    var options = this.getData("cxPropTagOptions");//NO I18N
    if(selectedTags){
      var selectedTagLen = selectedTags.length;
      var optionsLen = options.length;
        for(var i = 0; i < selectedTagLen; i++){
          var found = false;
          for(var j = 0 ; j < optionsLen; j++){
            if(options[j][this.data.cxPropDisplayValue].toLowerCase() === selectedTags[i][this.data.cxPropDisplayValue].toLowerCase()){
              found = true;
            }
          }
          if(found){
            Lyte.objectUtils( selectedTags[i] , "add" , "binaryColor" , binaryColorDetails.existingTagClass); //NO I18N
          } else {
            Lyte.objectUtils( selectedTags[i] , "add" , "binaryColor" , binaryColorDetails.newTagClass); //NO I18N
          }
        }
    }
  },

  //This function will check and set the lt prop selected if there is a mismatch with the tag present
  checkIfSelectedIsToBeSet: function(performSearch) {
    if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
      var newItems = [],
        i, j;
      var selectedList = this.getData("selectedList").slice(); //NO I18N
      selectedList = JSON.parse(selectedList);
      if (selectedList.length == 0 && this.data.cxPropTags.length != 0) {
        for (i = 0; i < this.data.cxPropTags.length; i++) {
          this.addToSelectedList(this.getData("cxPropTags")[i][this.data.cxPropSystemValue]); //NO I18N
        }
      } else if (selectedList.length != this.data.cxPropTags.length) {
        for (i = 0; i < this.data.cxPropTags.length; i++) {
          var allow = true;
          for (j = 0; j < selectedList.length; j++) {
            if (this.data.cxPropTags[i][this.data.cxPropSystemValue] == selectedList[j]) {
              allow = false;
            }
          }
          if (allow) {
            this.addToSelectedList(this.getData("cxPropTags")[i][this.data.cxPropSystemValue]); //NO I18N
          }
        }
      }
      if (performSearch) {
        if(!this.data.cxPropRequestForTags.enable){
          this.checkListCount();
        }
        if (this.getData("cxPropInputValue") && (this.getData("cxPropCreateOnAdd"))) {
          this.processSearch({
            keyCode: null
          }, this.getData('cxPropInputValue')) //NO I18N
        }
      }
    }
  },

  //This function sets required Data to scope
  setDataToScope: function() {
    this.newTagCount = 0;
    this.allowSearch = true;
    this.callFromOut = false;
    this.onErrorReturn = false;
    this.valuesToRemove = [];
    this.preventTagsObserver = false;
    this.preventBlurFromDrop = false;
    this.onTagRemovalHighlight = false;
    this.preventInput = false;
    this.preventOnAdd = false;
    this.preventBlurOnError = false;
    this.internalSelectedUpdate = false;

    /*Introduced After Tags Lazy Loading*/
    this.selectedTagList = [];
    this.minOptionSize = 10;
    //this.preventDropFromOpening = false;
    this.previousSearchReqValue = ""; //NO I18N
    this.selectedReqMade = false;
    this.selectedDataAvailable = false;
    this.reqForTagMatchObj = {};
    this.forceOrdinaryReq = false;
    this.preventFutherTagReq = false;
    this.preventCheckFornextResponse = false;
  },

  getTagColorIndex: function(color, colorObject){
    if(!this.data.colorObject){
      var colorObject = {Col1: "#F17574",Col2: "#F48435",Col3: "#E7A826",Col4: "#A8C026",Col5: "#63C57E",Col6: "#1DB9B4",Col7: "#57B1FD",Col8: "#879BFC",Col9: "#D297EE",Col10: "#FD87BD",Col11: "#969696",Col12: "#658BA8",Col13: "#B88562"}//NO I18N
    }
    var col = Object.keys(colorObject).filter(function(item){return colorObject[item] == color});
    return col.length ? col[0] : 'Col0'; // NO I18N
  },
  getPicklistFontColor: function(colourCode){
    return Lyte.Component.registeredHelpers.cruxGetPicklistFontColor(colourCode);
  },

  calculateTagClass: function(tagObj, position){
    var tagClass = "cxAddedTags "; //NO I18N
    if(tagObj.doAnimation){
      tagClass = tagClass.concat("cxExistingTag "); //NO I18N
    }
    if(tagObj.highlightTag){
      tagClass = tagClass.concat("cxTagHighlight "); //NO I18N
    }
    /*if(this.data.cxPropColorTags){
      //if(!tagObj.color_code){
        if(!this.data.cxPropTags[position][this.data.cxPropColorCodeKey]){
          finalColorClass = "cxTagCol0"; //NO I18N
          tagObj.color_code = finalColorClass;
        } else {
          finalColorClass = this.getTagColorIndex(this.data.cxPropTags[position][this.data.cxPropColorCodeKey],this.data.colorObject);
          tagObj.color_code = "cxTag" + finalColorClass;
        }
      //}
    } else{
      tagObj.color_code = "cxTagCol0"; //NO I18N
    }*/
    var finalColorClass,background,colorValue;
    if(this.data.cxPropTags[position][this.data.cxPropColorCodeKey] === "noFill" || !this.data.cxPropTags[position][this.data.cxPropColorCodeKey]){
      finalColorClass = 'cxTagCol0 cxTagNoFillCol'; //NO I18N
      background = "white";
    } else {
      finalColorClass = ''; //NO I18N
      background = this.data.cxPropTags[position][this.data.cxPropColorCodeKey] + ' !important;'; //No I18N
    }
    var getPicklistFontColorValue = this.getPicklistFontColor(this.data.cxPropTags[position][this.data.cxPropColorCodeKey]);
    if(getPicklistFontColorValue === "white"){
      finalColorClass = finalColorClass + ' cxTagDarkBg'; //NO I18N
    }
    colorValue = getPicklistFontColorValue;
    tagObj.color_code = this.data.cxPropTags[position][this.data.cxPropColorCodeKey]; //NO I18N
    tagClass = tagClass.concat(finalColorClass + " "); //NO I18N
    tagObj.class = tagClass;
    tagObj.style = "background: " + background + "; " + "color: " + colorValue;
    //"background: {{if(cruxOr(ifEquals(selitem.color_code, 'noFill'), negate(selitem.color_code)), 'white', concat(selitem.color_code, ' !important;'))}}; 
    //color : {{cruxGetPicklistFontColor(selitem.color_code)}}"
    return tagObj;
  },

  //This function is used to check the current tag text and process it into a tag.
  addNewTag: function(value, type) {
    var returnVal = null;

    //var value = this.getData("cxPropInputValue"); //NO I18N
    var data, isCommaSeperation = false;
    if (this.getData("cxPropCommaSeperation")) {
      if (value.indexOf(',') != -1) {
        isCommaSeperation = true;
        data = value.split(',');
      } else {
        data = [value];
      }
    } else {
      data = [value];
    }
    var allow = true,
      number = data.length,
      j = 0;
    if (number <= 0) {
      allow = false;
    }
    this.valuesToRemove = [];
    while (allow) {
      if (data[j] && data[j] != "") {
        if (!this.checkCharacter(data[j])) {
          allow = false;
          returnVal = "CE"; //NO I18N
        } else {
          var avaliability = this._isPresent(data[j]);
          if (avaliability.message == "newTag") {

            if (type === "keyDown") {
              if (this.data.paletteOpen) {
                this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
              }
              if (!this.getData("cxPropAllowDropdown")) {
                this.toggleComp("close"); //NO I18N
              }
            }

            //!!Check if the if condition at below line is required
            if (data[j].length > 0) {
              var isFromDropdown = false;
              if(type === "DropDown"){
                isFromDropdown = true;
              }
              if (this.addToSelectedTags(event, data[j] , isFromDropdown, isCommaSeperation)) {
                this.addToSelectedList(data[j]);
              } else {
                if (type !== "DropDown") {
                  allow = false;
                  returnVal = "NTE"; //NO I18N
                } else {
                  if (this.onErrorReturn) {
                    allow = false;
                    returnVal = "NTE"; //NO I18N
                  } else if (this.externalError){
                    allow = false;
                    returnVal = "NTEE"; //NO I18N
                  } else {
                    this.valuesToRemove.push(data[j]);
                  }
                }
              }
            }
            if (this.bodyDrop && type !== "DropDown") {
              this.bodyDrop.querySelector("#newTagId").classList.remove('lyteDropdownActive') //NO I18N
            }
          } else if (avaliability.message == "existingTag") {
            if (type !== "DropDown") {
              this.preventBlurOnError = true;
            }

            if (this.getMethods('onError')) { //NO I18N
              this.executeMethod('onError', data[j], {
                errorCode: 4,
                reason: "Already existing tag" //NO I18N
              }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
            }

            if (type !== "DropDown") {
              this.preventBlurOnError = false;
            }

            //var listOfTags = this.getData("cxPropTags"); //NO I18N
            if(!this.getData('cxPropColorTags')){
              if( ( this.data.cxPropRequestForTags.enable && avaliability.pos != -1 ) || !this.data.cxPropRequestForTags.enable){
                var requiredReplaceObj = this.getData("tagAnimationArr")[avaliability.pos];
                requiredReplaceObj.doAnimation = true;
                requiredReplaceObj = this.calculateTagClass(requiredReplaceObj , avaliability.pos);
                Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', avaliability.pos, requiredReplaceObj); //NO I18N
              }
            }
          } else if (avaliability.message == "dropOption") {
            if (this.addToSelectedTags(event, data[j], true, isCommaSeperation)) {
              //!!Check if below if condition is required
              if (type !== "DropDown" || (type === "DropDown" && isCommaSeperation)) {
                this.addToSelectedList(this.getData("cxPropTagOptions")[avaliability.pos][this.data.cxPropSystemValue]);
              }
              if(this.data.cxPropRequestForTags.enable && type === "DropDown" && avaliability.pos === -1){
                this.addToSelectedList(avaliability.value[this.data.cxPropSystemValue]);
              }
            } else {
              if (type !== "DropDown") {
                allow = false;
                returnVal = "DOE"; //NO I18N
              } else {
                if (this.onErrorReturn) {
                  allow = false;
                  returnVal = "DOE"; //NO I18N
                } else if (this.externalError){
                  allow = false;
                  returnVal = "DOEE"; //NO I18N
                } else {
                  this.valuesToRemove.push(data[j]);
                }
              }
            }
          }
        }
      }
      if (allow) {
        j = j + 1;
        while (data[j] == "") {
          j = j + 1;
        }
        if (j >= number) {
          allow = false;
        }
      }
    }
    if(!returnVal) {
      returnVal = "succ";//NO I18N
    }
    //this.valuesToRemove = valuesToRemove;

    //!!Check This Below code
    if (this.bodyDrop && (type === "Blur" || type === "out")) {
      if(this.bodyDrop.querySelector('crux-color-palette')){
        var selectedColor;
        if(!this.data.cxPropSelectedColor){
          selectedColor = this.bodyDrop.querySelector('crux-color-palette').cxProp('defaultColors')[Math.floor(Math.random() * 13)] //NO I18N
          while (selectedColor == this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor')) { //NO I18N
            selectedColor = this.bodyDrop.querySelector('crux-color-palette').cxProp('defaultColors')[Math.floor(Math.random() * 13)] //NO I18N
          }
        } else {
          selectedColor = this.data.cxPropSelectedColor;
        }
        this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor', selectedColor) //NO I18N
      }
    }

    return returnVal;
  },

  //Handle the before and after of adding a new tag
  handleAddNewTag: function(value, type/*, event*/){
    if (value && value !== "" && value.trim() != "") {
      var newTagCreationStatus = this.addNewTag(value, type);
      if (newTagCreationStatus === "CE" || newTagCreationStatus === "NTE" || newTagCreationStatus === "DOE") {
        if(newTagCreationStatus === "CE"){
          // if (type === "keyDown" && event.keyCode == 13) {
          //   this.preventOnAdd = true;
          // }
          this.setData("cxPropInputValue", value); //NO I18N
          return false;
        } else if(newTagCreationStatus === "NTE" || newTagCreationStatus === "DOE"){
          // if(newTagCreationStatus === "NTE" && event.keyCode == 13 && type === "keyDown"){
          //   this.preventOnAdd = true;
          // }
          if (this.onErrorReturn) {
            this.onErrorReturn = false;
            this.setData("cxPropInputValue", value); //NO I18N
            return false;
          }
        }
      } else if(newTagCreationStatus === "succ"){
        if(this.data.cxPropRequestForTags.enable){
          this.preventOpenScroll = true;
          var selectedTagListContainer = $L('#cxSelectedTagListContainer', this.$node)[0]; //NO I18N
          selectedTagListContainer.scrollTop = selectedTagListContainer.scrollHeight;
        }
        return true;
      } else if(newTagCreationStatus === "DOEE" || newTagCreationStatus === "NTEE" ){
        if (this.externalError) {
          this.externalError = false;
          return false;
        }
      }
    } else {
      return false;
    }
  },

  //Not used check it out.
  /*toggle: function() {
    if (this.getData("cxPropAllowDropdown")) {
      var DropDownNode = this.$node.querySelector("lyte-dropdown"); //NO I18N
      DropDownNode.toggle(); //NO I18N
    }
  },*/

  //Used to toggle the component based on the value passed to it . Default is ordinary toggle.
  toggleComp: function(value) {
    var drop = this.$node.querySelector("lyte-dropdown"); //NO I18N
    var child = drop.component.childComp ? drop.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N
    if (value == "open") {
      if (child.classList.contains("lyteDropdownHidden")) {
        if (this.getData('cxPropInputValue')) {
          this.processSearch({
            keyCode: null
          }, this.getData('cxPropInputValue')) //NO I18N
        }
        if (child.classList.contains("lyteDropdownHidden")) {
          drop.toggle();
        }
      }
    } else if (value == "close") { //NO I18N
      if (!child.classList.contains("lyteDropdownHidden")) {
        drop.toggle();
      }
    } else {
      drop.toggle();
    }
  },

  //The below function is used to preserveText after backspace
  // preserveText : function(value,method){
  //   if(method!="click"){
  //     this.setData("cxPropInputValue",value);//NO I18N
  //   }
  // },

  //This deside if local or server search is to be done
  processSearch: function(evt, value) {
    if (/^\s+$/.test(value)) {
      if (evt.keyCode == 32) {
        return
      }
    }
    value = value.trim();

    //this.localSearch(evt, value);

    //DEVELOPMENT
    if(!this.data.cxPropRequestForTags.enable){
      this.localSearch(evt, value);
    } else {
      this.allowSearch = true;
      if(this.forceOrdinaryReq || (!this.forceOrdinaryReq && this.previousSearchReqValue !== value)){
        if(this.forceOrdinaryReq){
          this.forceOrdinaryReq = false;
          this.tagOptionsInstance.resetSearch();
        } else {
          this.previousSearchReqValue = value;
          this.dynamicSearch(value);
        }
      }
    }
  },

  //This function is used to search for the tag based on the value in the input
  localSearch: function(evt, value) {
    var hiddenArray = [],
      matchArr = [];
    var drop = this.bodyDrop ? this.bodyDrop : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N
    var items = drop.querySelectorAll('lyte-drop-item:not(.cxNewTagItem)'), //NO I18N
        arr = [];
    for (var i = 0; i < items.length; i++) {
      arr.push(items[i].textContent);
    }
    for (var i = 0; i < items.length; i++) {
      if (arr[i].toLowerCase().indexOf(value.toLowerCase()) != -1) {
        items[i].classList.remove('cxHideTagOption');
        if (!items[i].classList.contains('lyteDropdownActive')) {
          matchArr.push(items[i]);
        }
      } else {
        items[i].classList.add('cxHideTagOption');
        hiddenArray.push(items[i]);
      }
    }
    if (hiddenArray.length == 0) {
      this.setData("noValue", false); //NO I18N
    }
    this.showNoResult(evt, value, /*hiddenArray, items,*/ matchArr);
  },
  dynamicSearch: function(value) {
    this.tagOptionsInstance.properties.searchValue = this.data.cxPropInputValue;
    var scrollEle = this.bodyDrop ? this.bodyDrop.querySelector('lyte-drop-body') : undefined; //NO I18N
    this.localSearchResponse = this.unselectedLocalSearch(value);
    this.tagOptionsInstance.performSearch(scrollEle);
  },
   checkInList: function(value,list,listToBeUsed){
    var listToUse;
        if(!listToBeUsed){
          if(list === "added"){
            listToUse = this.data.cxPropNewlySelectedTags;
          } else {
            listToUse = this.data.cxPropNewlyUnSelectedTags;
          }
        } else {
            listToUse = listToBeUsed;
        }
    var listLen = listToUse.length,found = false;
    for(var i = 0; i < listLen; i++){
      if(listToUse[i][this.data.cxPropSystemValue] === value[this.data.cxPropSystemValue]){
        found = true;
        break;
      }
    }
    if(found){
      return { found : true, pos : i, value : listToUse[i]};
    } else {
      return { found : false, pos : -1 , value : undefined};
    }
  },
  unselectedLocalSearch: function(value){
    var list = this.data.cxPropNewlyUnSelectedTags,
    listLen = list.length,
    searchedList = [];
    if(value){
      for(var i = 0; i < listLen; i++){
        if(list[i][this.data.cxPropSystemValue].toLowerCase().indexOf(value.toLowerCase()) != -1){
          searchedList.push(list[i]);
        }
      }
    }
    return searchedList;
  },

  //This function clears value in input box and resets values.
  resetSearch: function() {
    if (this.getData("cxPropInputValue").length > 0) {
      this.allowSearch = false;
      this.setData("newTag", false); //NO I18N
      this.setData("duplicateSelected", false); //NO I18N
      this.setData("newTagMsg", ""); //NO I18N
      this.setData("cxPropInputValue", ""); //NO I18N
      if(this.data.cxPropRequestForTags.enable){
        this.tagOptionsInstance.properties.searchValue = ""; //NO I18N
        this.previousSearchReqValue = ""; //NO I18N
        this.forceOrdinaryReq = true;
      }
      this.processSearch({}, "");
    }
  },

  //Not used check out
  /*toggleAndFocus: function() {
    var dropDownNode = this.$node.querySelector("lyte-dropdown"); //NO I18N
    var child = dropDownNode.component.childComp ? dropDownNode.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N
    if (!child.classList.contains("lyteDropdownHidden")) {
      dropDownNode.toggle(); //NO I18N
    }
    this.$node.querySelector("lyte-input").blur(); //NO I18N
  },*/

  //This function will decide weather to show the new tag div or no result found div
  showNoResult: function(event, value, /*hiddenList, currentList,*/ matchList) {
    var activeItems;
    if (!this.allowSearch) {

      if (this.bodyDrop) {
        this.allowSearch = true;
        activeItems = this.bodyDrop.querySelectorAll(".tagOptionsItems.lyteDropdownActive"); //NO I18N
        if ((activeItems.length == this.getData("cxPropTagOptions").length) && value == "") {
          this.setData("noValue", true); //NO I18N
        } else {
          this.setData("noValue", false); //NO I18N
        }
      }
    } else {
      //var dropDownNode = this.$node.querySelector("lyte-dropdown"); //NO I18N
      //var child = dropDownNode.component.childComp ? dropDownNode.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N
      if (value.trim() != "") {
        var avaliability = this._isPresent(value);
        if (avaliability.message == "newTag" && this.getData("cxPropAllowNewTagCreations")) {
          this.setData("newTagMsg", value); //NO I18N
          this.setData("newTag", true); //NO I18N
          this.setData("noValue", false); //NO I18N
          this.setData("duplicateSelected", false); //NO I18N
          this.setData("duplicateSelectedMessage" , ""); //NO I18N
        } else {
          this.setData("duplicateSelected", false); //NO I18N
          this.setData("duplicateSelectedMessage" , ""); //NO I18N
          this.setData("newTagMsg", ""); //NO I18N
          this.setData("newTag", false); //NO I18N

          //!!Check This Below code
          if (this.data.paletteOpen) {
            this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
          }

          //!!Check This Below code
          if (!this.data.cxPropAllowDropdown) {
            this.toggleComp('close'); //NO I18N
          }

          if (!this.getData("newTag") && avaliability.message == "existingTag") {
            /*if (!matchList.length) {
              //this.setData("noValue", true); //NO I18N
              
              this.setData("duplicateSelectedMessage" , _cruxUtils.getI18n("crux.existing.tag", value)); //NO I18N
              this.setData("duplicateSelected", true); //NO I18N
            } else {
              this.setData("duplicateSelectedMessage" , _cruxUtils.getI18n("crux.existing.tag", value)); //NO I18N
              this.setData("duplicateSelected", true); //NO I18N
              this.setData("noValue", false); //NO I18N
            }*/
            this.setData("duplicateSelectedMessage" , _cruxUtils.getI18n("crux.existing.tag", value)); //NO I18N
            this.setData("duplicateSelected", true); //NO I18N
            this.setData("noValue", false); //NO I18N
          } else {
            if (!matchList.length && !this.getData("newTag")) {
              this.setData("noValue", true); //NO I18N
            } else {
              this.setData("noValue", false); //NO I18N
            }
          }
        }
      } else {
        this.setData("newTagMsg", ""); //NO I18N
        this.setData("newTag", false); //NO I18N
        this.setData("duplicateSelected", false); //NO I18N
        this.setData("duplicateSelectedMessage" , ""); //NO I18N

        //!!Check This Below code
        if (this.data.paletteOpen) {
          this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
        }

        //!!Check This Below code
        if (!this.data.cxPropAllowDropdown) {
          this.toggleComp('close'); //NO I18N
        }

        if (!this.getData("newTag")) {
          if (this.bodyDrop) {
            activeItems = this.bodyDrop.querySelectorAll(".tagOptionsItems.lyteDropdownActive"); //NO I18N
            if (activeItems.length == this.getData("cxPropTagOptions").length) {
              this.setData("noValue", true); //NO I18N
            } else {
              this.setData("noValue", false); //NO I18N
            }
          }
        }
      }
    }
    if(this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)){
      var drop = this.$node.querySelector("lyte-dropdown");//NO I18N
      var child=drop.component.childComp ? drop.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box");//NO I18N
      if(!child.classList.contains("lyteDropdownHidden")){
        if(this.getData("newTag")){
          if( (event && event.keyCode && event.keyCode !== 13 && ( event.keyCode > 40 || event.keyCode < 37 ) ) || (!event || !event.keyCode|| Object.keys(event).length === 0)){
            $L('.lyteDropdownSelection',this.bodyDrop).removeClass('lyteDropdownSelection'); //NO I18N
            $L('.cxNewTagItem',this.bodyDrop).addClass('lyteDropdownSelection');//NO I18N
          }
        }
      }
    }
  },

  //This function is used to add data the the selected of the dropdown
  addToSelectedList: function(data) {
    var selectedList = this.getData("selectedList").slice(); //NO I18N
    selectedList = JSON.parse(selectedList);
    selectedList.push(data);
    selectedList = JSON.stringify(selectedList);
    this.setData("selectedList", selectedList); //NO I18N
    this.checkListCount();
  },

  //This function is used to remove data the the selected of the dropdown
  removeLatestSelected: function(value) {
    var selectedList = this.getData("selectedList").slice(); //NO I18N
    selectedList = JSON.parse(selectedList);
    var len = selectedList.length;
    if(!value){
      if (len > 0) {
        Lyte.arrayUtils(selectedList, 'removeAt', len - 1, 1); //NO I18N
      }
    } else {
      for(var i = 0; i < len; i++){
        if(value === selectedList[i]){
          Lyte.arrayUtils(selectedList, 'removeAt', i, 1); //NO I18N
        }
      }
    }
    
    selectedList = JSON.stringify(selectedList);
    this.setData("selectedList", selectedList); //NO I18N
  },

  //This function is used to remove Latest tag
  removeLatestTag: function(src, method) {
    if (this.onTagRemovalHighlight) {
      this.onTagRemovalHighlight = false;
      return false;
    }
    var test = true;
    var renderItems = this.getData('cxPropTags'); //NO I18N
    var len = renderItems.length;
    var pos;
    for (var i = 0; i < len; i++) {
      if (renderItems[i][this.data.cxPropSystemValue] == src) {
        pos = i;
      }
    }
    if (this.getMethods('onBeforeRemoveTag')) { //NO I18N
      test = this.executeMethod('onBeforeRemoveTag', src, pos); //NO I18N
    }
    if (test == true || test == undefined || test == null) {
      var valueToReturn = true;
      if (!this.data.cxPropRequestForTags.enable && this.selectedTagList && this.selectedTagList.length && this.selectedTagList[pos] && this.selectedTagList[pos].isNewTag) {
        this.newTagCount = this.newTagCount - 1;
      } else {
        this.checkListCount();
      }
      var animatioArr = this.getData("tagAnimationArr"); //NO I18N
      this.preventTagsObserver = true;
      if (animatioArr[pos].doAnimation) {
        var requiredRemoveObj = this.getData("tagAnimationArr")[pos];
        requiredRemoveObj.doAnimation = false;
        requiredRemoveObj = this.calculateTagClass(requiredRemoveObj , pos);
        Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', pos, requiredRemoveObj); //NO I18N
      }
      var valueBeingRemoved = renderItems[pos];
      Lyte.arrayUtils(this.getData("tagAnimationArr"), 'removeAt', pos, 1); //NO I18N
      this.internalSelectedUpdate = true;
      Lyte.arrayUtils(renderItems, 'removeAt', pos, 1); //NO I18N
      this.internalSelectedUpdate = false;
      this.$node.querySelector('lyte-dropdown').resetPosition(); //NO I18N
      var tagAnimationArr = this.getData("tagAnimationArr"); //NO I18N
      if (tagAnimationArr.length > 0 && tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
        tagAnimationArr[tagAnimationArr.length - 1].highlightTag = false;
        Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
      }
      var selectedTagListLen = this.selectedTagList.length,
      isNewTagDeletion = false;
      for(var r = 0; r < selectedTagListLen; r++){
        if(this.selectedTagList[r][this.data.cxPropSystemValue].toLowerCase() === valueBeingRemoved[this.data.cxPropSystemValue].toLowerCase()){
          isNewTagDeletion = true;
          Lyte.arrayUtils(this.selectedTagList, 'removeAt', r, 1); //NO I18N
          selectedTagListLen-=1
        }
      }
      var foundInListResp = this.checkInList(valueBeingRemoved,"added");//NO I18N
      if(foundInListResp.found){
        Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'removeAt', foundInListResp.pos, 1); //NO I18N
      }

      if(this.data.cxPropRequestForTags.enable && !isNewTagDeletion){
        //var foundInListResp = this.checkInList(valueBeingRemoved,"added");//NO I18N
        //if(foundInListResp.found){
        //  Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'removeAt', foundInListResp.pos, 1); //NO I18N
        //} else {
        if(!foundInListResp.found){
          Lyte.arrayUtils(this.data.cxPropNewlyUnSelectedTags , 'push', valueBeingRemoved); //NO I18N
        }
        
          // var allOptions = this.data.cxPropTagOptions; //NO I18N
          // var allOptLen = allOptions.length;
          // var posToReplace = -1;
          // for(var i = 0; i < allOptLen; i++){
          //   if(valueBeingRemoved[this.data.cxPropSystemValue] === allOptions[i][this.data.cxPropSystemValue]){
          //     posToReplace = i;
          //     break;
          //   }
          // }
          
        Lyte.arrayUtils(this.data.cxPropTagOptions, 'push', valueBeingRemoved); //NO I18N
        this.showNoResult(undefined, this.tagOptionsInstance.properties.searchValue, []);
        //valueToReturn = false;
        // setTimeout(function(){
        //   if(posToReplace !== -1){
        //     Lyte.arrayUtils(this.data.cxPropTagOptions, 'removeAt', posToReplace, 1); //NO I18N
        //   }
        // }.bind(this), 0);
      }
      if (this.getMethods('onRemoveTag')) { //NO I18N
        test = this.executeMethod('onRemoveTag', src, pos); //NO I18N
      }
      if(this.data.cxPropRequestForTags.enable){
        this.checkNoResultDivStatus(src);
      }
      return valueToReturn;
    } else {
      return false;
    }
  },
  checkNoResultDivStatus: function(valueRemoved){
    var tagOptions = this.data.cxPropTagOptions,
    tagOptonsLen = this.data.cxPropTagOptions.length;
    for(var i = 0; i < tagOptonsLen; i++){
      if(tagOptions[i][this.data.cxPropSystemValue] === valueRemoved){
        this.setData("noValue" , false); //NO I18N
        break;
      }
    }
  },
  //This function checks to see if the current tag being created is an new tag or an existiing tag or a tag from the dropdown
  _isPresent: function(data) {
    var renderItems = this.getData("cxPropTags"); //NO I18N
    var allTags = this.getData("cxPropTagOptions"); //NO I18N
    var i = 0;
    var foundInCurrentView = false;
    var ob = {
      message: "newTag", //NO I18N
      pos: 0
    };

    var renderItemLen = renderItems.length,
      alltagLen = allTags.length;

        for (var i = 0; i < renderItemLen; i++) {
          if (renderItems[i][this.data.cxPropDisplayValue].toUpperCase().trim() == data.toUpperCase().trim()) {
            foundInCurrentView = true;
            ob.message = "existingTag"; //NO I18N
            ob.pos = i;
            return ob;
          }
        }

      for (var i = 0; i < alltagLen; i++) {
        if (allTags[i][this.data.cxPropDisplayValue].toUpperCase() == data.toUpperCase()) {
          foundInCurrentView = true;
          ob.message = "dropOption"; //NO I18N
          ob.pos = i;
          return ob;
        }
      }

      if(this.data.cxPropRequestForTags.enable && !foundInCurrentView){
        if(this.reqForTagMatchObj.selectedMatch && this.reqForTagMatchObj.selectedMatch[this.data.cxPropSystemValue] === this.tagOptionsInstance.properties.searchValue){
          ob.message = "existingTag"; //NO I18N
          ob.pos = -1;
          ob.value = this.reqForTagMatchObj.selectedMatch;
          return ob;
        }
        if(this.reqForTagMatchObj.unselectedMatch && this.reqForTagMatchObj.unselectedMatch[this.data.cxPropSystemValue] === this.tagOptionsInstance.properties.searchValue ){
          ob.message = "dropOption"; //NO I18N
          ob.pos = -1;
          ob.value = this.reqForTagMatchObj.unselectedMatch;
          return ob;
        }
    }
    return ob;
  },

  //this function is to validate the tag being created
  validation: function(data) {
    var value;
    var allow = true;
    var preventKeyList = this.getData("cxPropPreventKeyList"); //NO I18N
    for (var i = 0; i < preventKeyList.length; i++) {
      if (data.indexOf(preventKeyList[i]) != -1) {
        allow = false;
        break;
      }
    }
    if (allow) {
      if (this.getMethods('onValidation')) { //NO I18N
        return this.executeMethod('onValidation', data, this.$node); //NO I18N
      } else {
        return true;
      }
    } else {
      this.preventBlurOnError = true;
      if (this.getMethods('onError')) { //NO I18N
        this.executeMethod('onError', data, { //NO I18N
          errorCode: 1,
          reason: "Contains Invalid Key" //NO I18N
        }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
      }
      this.preventBlurOnError = false;
      return false;
    }
  },

  //This function is the controller for validation decides process for validation
  checkCharacter: function(data) {
    var allow;
    if (this.callFromOut && !this.getData("cxPropCreateOnAdd")) {
      allow = this.validation(data);
    } else if (!this.callFromOut && this.getData("cxPropCreateOnAdd")) { //NO I18N
      allow = this.validation(data);
    } else if (!this.callFromOut && !this.getData("cxPropCreateOnAdd")) { //NO I18N
      allow = true;
    }
    if (allow == true || allow == undefined || allow == null) {
      return true;
    } else {
      return false;
    }
  },
  //This function is the main function which handles adding the tag
  addToSelectedTags: function(event, data, isDropOption, isCommaSeperation) {
    var test = true;
    if (this.getMethods('onBeforeAddTag')) { //NO I18N
      var dropOptionVal;
      if (isDropOption != undefined && isDropOption == true) {
        dropOptionVal = true;
      } else {
        dropOptionVal = false;
      }
      if (this.getData("cxPropMaxTagLimit") && this.getData("cxPropTags").length >= this.getData("cxPropMaxTagLimit")) {
        this.setData("newTag", false);
        this.setData("cxPropInputValue", "");
        this.onInputTriggerSearch(event, this.$node.querySelector("lyte-input"));
      }
      test = this.executeMethod('onBeforeAddTag', data, this.$node, dropOptionVal); //NO I18N
    }
    if (test == true || test == undefined || test == null) {
      var binaryColorDetails = this.getData("cxPropBinaryColor");//NO I18N
      var flag = false;
      var allItems = this.getData('cxPropTagOptions') //NO I18N
      var renderItems = this.getData('cxPropTags'); //NO I18N
      var len = allItems.length;
      if (this.getData("cxPropMaxTagLimit") == 0 || renderItems.length < this.getData("cxPropMaxTagLimit")) {
        for (var i = 0; i < len; i++) {
          if (allItems[i][this.data.cxPropDisplayValue].toUpperCase().trim()==data.toUpperCase().trim()) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.preventTagsObserver = true;
          if(binaryColorDetails.enable){
            if(isDropOption){
              Lyte.objectUtils( allItems[i] , "add" , "binaryColor" , binaryColorDetails.existingTagClass); //NO I18N
            } else {
              Lyte.objectUtils( allItems[i] , "add" , "binaryColor" , binaryColorDetails.newTagClass); //NO I18N
            }
          }
          this.internalSelectedUpdate = true;
          Lyte.arrayUtils(renderItems, 'push', allItems[i]); //NO I18N
          this.internalSelectedUpdate = false;
          this.resetSearch();
          var tagAnimationArr = this.getData("tagAnimationArr"); //NO I18N
          if (tagAnimationArr.length > 0 && tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
            tagAnimationArr[tagAnimationArr.length - 1].highlightTag = false;
            Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
          }
          if(this.data.cxPropRequestForTags.enable){
            if(this.data.cxPropInputValue){
              if(allItems[i][this.data.cxPropSystemValue].toLowerCase().indexOf(this.data.cxPropInputValue.toLowerCase()) != -1 ){
                var foundInListResp = this.checkInList(allItems[i],"removed");//NO I18N
                if(foundInListResp.found){
                  Lyte.arrayUtils(this.data.cxPropNewlyUnSelectedTags , 'removeAt', foundInListResp.pos, 1); //NO I18N
                  foundInListResp = this.checkInList(allItems[i],"removed", this.data.cxPropTagOptions);//NO I18N
                  Lyte.arrayUtils(this.data.cxPropTagOptions , 'removeAt', foundInListResp.pos, 1); //NO I18N
                  this.showNoResult(undefined, this.tagOptionsInstance.properties.searchValue, []);
                } else {
                  Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'push', allItems[i]); //NO I18N
                }
              }
            } else {
              var foundInListResp = this.checkInList(allItems[i],"removed");//NO I18N
              if(foundInListResp.found){
                Lyte.arrayUtils(this.data.cxPropNewlyUnSelectedTags , 'removeAt', foundInListResp.pos, 1); //NO I18N
                foundInListResp = this.checkInList(allItems[i],"removed", this.data.cxPropTagOptions);//NO I18N
                Lyte.arrayUtils(this.data.cxPropTagOptions , 'removeAt', foundInListResp.pos, 1); //NO I18N
                this.showNoResult(undefined, this.tagOptionsInstance.properties.searchValue, []);
              } else {
                Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'push', allItems[i]); //NO I18N
              }
            }
          }
          if (this.getMethods('onAddTag')) { //NO I18N
            test = this.executeMethod('onAddTag', data, this.$node); //NO I18N
          }
        } else {
          if (this.getData("cxPropMaxOptionsLimit") > 0 && allItems.length + this.newTagCount >= this.getData("cxPropMaxOptionsLimit")) {
            this.preventBlurOnError = true;
            if (this.getMethods('onError')) { //NO I18N
              test = this.executeMethod('onError', data, { //NO I18N
                errorCode: 2,
                reason: "Max Tag Option Creation Limit Reached" //NO I18N
              }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
            }
            this.preventBlurOnError = false;
            this.onErrorReturn = true;
            return false;
          }
          this.preventTagsObserver = true;
          this.newTagCount = this.newTagCount + 1;

          //!!Check This Below code
          var valueToAdd;
          if (this.data.cxPropColorTags) {
            var tagDetails = {
              name: data
            }
            if(this.data.cxPropUpdateNewTagDetails){
              tagDetails.isNewTag = true;
            }
            tagDetails[this.data.cxPropColorCodeKey] = this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor'); //NO I18N
            Lyte.arrayUtils(renderItems, 'push', tagDetails); //NO I18N
            valueToAdd = tagDetails;
            /*if (!this.data.cxPropRequestForTags.enable){*/
              tagDetails.isNewTag = true;
              Lyte.arrayUtils(this.selectedTagList, 'push', tagDetails); //NO I18N
            /*}*/
            if (!isCommaSeperation) {
              var selectedColor;
              if(!this.data.cxPropSelectedColor){
                selectedColor = this.bodyDrop.querySelector('crux-color-palette').cxProp('defaultColors')[Math.floor(Math.random() * 13)] //NO I18N
                while (selectedColor == this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor')) { //NO I18N
                  selectedColor = this.bodyDrop.querySelector('crux-color-palette').cxProp('defaultColors')[Math.floor(Math.random() * 13)] //NO I18N
                }
              } else {
                selectedColor = this.data.cxPropSelectedColor;
              }
              
              this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor', selectedColor) //NO I18N
            }
          } else {
            var newItemToPush = {
              name: data
            }
            if(this.data.cxPropUpdateNewTagDetails){
              newItemToPush.isNewTag = true;
            }
            if(binaryColorDetails.enable){
              if(isDropOption){
                Lyte.objectUtils( newItemToPush , "add" , "binaryColor" , binaryColorDetails.existingTagClass); //NO I18N
              } else {
                Lyte.objectUtils( newItemToPush , "add" , "binaryColor" , binaryColorDetails.newTagClass); //NO I18N
              }
            }
            valueToAdd = newItemToPush;
            this.internalSelectedUpdate = true;
            Lyte.arrayUtils(renderItems, 'push', newItemToPush); //NO I18N
            /*if (!this.data.cxPropRequestForTags.enable){*/
              newItemToPush.isNewTag = true;
              Lyte.arrayUtils(this.selectedTagList, 'push', newItemToPush); //NO I18N
            /*}*/
            this.internalSelectedUpdate = false;
          }
          this.resetSearch();
          var tagAnimationArr = this.getData("tagAnimationArr"); //NO I18N
          if (tagAnimationArr.length > 0 && tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
            tagAnimationArr[tagAnimationArr.length - 1].highlightTag = false;
            Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
          }
          if(this.data.cxPropRequestForTags.enable){
            if(this.data.cxPropInputValue){
              if(allItems[i][this.data.cxPropSystemValue].toLowerCase().indexOf(this.data.cxPropInputValue.toLowerCase()) != -1 ){
                var foundInListResp = this.checkInList(valueToAdd,"removed");//NO I18N
                if(foundInListResp.found){
                  Lyte.arrayUtils(this.data.cxPropNewlyUnSelectedTags , 'removeAt', foundInListResp.pos, 1); //NO I18N
                  foundInListResp = this.checkInList(allItems[i],"removed", this.data.cxPropTagOptions);//NO I18N
                  Lyte.arrayUtils(this.data.cxPropTagOptions , 'removeAt', foundInListResp.pos, 1); //NO I18N
                  this.showNoResult(undefined, this.tagOptionsInstance.properties.searchValue, []);
                } else {
                  Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'push', valueToAdd); //NO I18N
                }
              }
            } else {
              var foundInListResp = this.checkInList(valueToAdd,"removed");//NO I18N
              if(foundInListResp.found){
                Lyte.arrayUtils(this.data.cxPropNewlyUnSelectedTags , 'removeAt', foundInListResp.pos, 1); //NO I18N
                foundInListResp = this.checkInList(allItems[i],"removed", this.data.cxPropTagOptions);//NO I18N
                Lyte.arrayUtils(this.data.cxPropTagOptions , 'removeAt', foundInListResp.pos, 1); //NO I18N
                this.showNoResult(undefined, this.tagOptionsInstance.properties.searchValue, []);
              } else {
                Lyte.arrayUtils(this.data.cxPropNewlySelectedTags, 'push', valueToAdd); //NO I18N
              }
            }
          }
          if (this.getMethods('onAddTag')) { //NO I18N
            test = this.executeMethod('onAddTag', data, this.$node); //NO I18N
          }
        }
        this.checkListCount();

        //!!Check This Below code
        if (!this.data.cxPropAllowDropdown) {
          this.toggleComp('close'); //NO I18N
        }
      } else {
        this.preventBlurOnError = true;
        if (this.getMethods('onError')) { //NO I18N
          test = this.executeMethod('onError', data, { //NO I18N
            errorCode: 3,
            reason: "Max Tag Creation Limit Reached" //NO I18N
          }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
        }
        this.preventBlurOnError = false;
        this.onErrorReturn = true;
        return false;
      }
      var newTagObject = {
        doAnimation: false,
        highlightTag: false,
        color_code: "", //NO I18N
        class:"",  //NO I18N
        style : "" //NO I18N
      }
      newTagObject = this.calculateTagClass(newTagObject , tagAnimationArr.length);
      Lyte.arrayUtils(this.getData("tagAnimationArr"), 'push', newTagObject); //NO I18N
      return true;
    } else {
      this.externalError = true;
      return false;
    }
  },

  //Function used to determine if no value is to be shown or not
  checkListCount: function() {
    if(!this.data.cxPropRequestForTags.enable){
      var allItems = this.getData('cxPropTagOptions') //NO I18N
      var childComp = this.bodyDrop;
      if (childComp) {
        var activeItems = this.bodyDrop.querySelectorAll(".tagOptionsItems.lyteDropdownActive"); //NO I18N
        if (activeItems.length >= allItems.length) {
          if (this.getData("newTag")) {
            this.setData("noValue", false); //NO I18N
          } else {
            this.setData("noValue", true); //NO I18N
          }
        } else {
          this.setData("noValue", false); //NO I18N
        }
      }
    }
  },

  /*DEVELOPMENT*/
  checkForNextRequest: function(){
    var list = this.bodyDrop.querySelectorAll(".tagOptionsItems:not(.lyteDropdownActive)"); //NO I18N
    var listLen = list.length;
    if(listLen < this.minOptionSize && !this.tagOptionsInstance.properties.allRecordsFetchedAndConsumed){
      this.tagOptionsInstance.constructNextBatch();
    }
  },
  //!!Check Not required
  /*removeHighlight: function(tag) {
    var curr = this;
    setTimeout(function() {
      tag.classList.remove("cxExistingTag"); //NO I18N
    }, 2001);
  },*/

  //Functions -- End

  onInputTriggerSearch: function (evt, _this) {
    if (this.getMethods("onValueChange")) {
      this.executeMethod("onValueChange", this.data.cxPropInputValue); //NO I18N
    }
    var shouldShowDropdown = this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag);

    if (_this.ltProp('value').length > 0) {
      if (this.data.cxPropMaxTagLength !== 0 && (_this.ltProp('value').length > this.getData("cxPropMaxTagLength"))) {
        var value = _this.ltProp('value'); //NO I18N
        this.preventInput = true;
        this.preventBlurOnError = true;
        if (this.getMethods('onError')) { //NO I18N
          this.executeMethod('onError', value, { //NO I18N
            errorCode: 5,
            reason: "Max length of the tag has been reached" //NO I18N
          }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //eslint-disable-line  @zoho/webperf/no-complex-selector
        }
        this.preventBlurOnError = false;
        var input = _this.querySelector('input'); //NO I18N
        var start = input.selectionStart;
        this.setData("cxPropInputValue", value.slice(0, start - (value.length - this.getData("cxPropMaxTagLength"))) + value.slice(start)); //NO I18N

        if (shouldShowDropdown) {
          this.toggleComp("open"); //NO I18N
        }
      } else if (shouldShowDropdown) {
        this.toggleComp("open"); //NO I18N
      }
    } else if (shouldShowDropdown) {
      this.toggleComp("open"); //NO I18N
    }
    this.processSearch(evt, this.getData("cxPropInputValue")); //NO I18N
  },


  actions: {
    //When X icon is clicked blur is not to be called so this action makes sure of that
    onMouseDown: function(ele, evt) {
      var isInputFocused = this.getData("onFocus"); //NO I18N
      if (isInputFocused) {
        var reqLi = $L(evt.target).closest('lyte-close-icon,li', this.$node).get(0); //NO I18N
        if (reqLi) {
          var val = false;
          if (reqLi.tagName == "LI") {
            val = reqLi.classList.contains("lyteMultiselectInput"); //NO I18N
          }
          if (!val) {
            this.preventBlurFromDrop = true;
          }
        }
      }
    },

    //This Function will get called on animation end of the tag being highlighted this function is used to stop the animation
    animationEnd: function(pos) {
      var requiredReplaceObj = this.getData("tagAnimationArr")[pos];
      requiredReplaceObj.doAnimation = false;
      requiredReplaceObj = this.calculateTagClass(requiredReplaceObj , pos);
      Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', pos, requiredReplaceObj); //NO I18N
    },

    //This function set the focus to the component
    onFocus: function(ele) {
      this.setData("onFocus", true); //NO I18N
      if (!this.getData("cxPropInputDisabled")) {
        ele.querySelector(".cxTagSearch").focus(); //NO I18N
      }
    },

    /*//!!Check this below function
    onKeyUp: function(evt, _this) {
      if (!this.preventInput) {
        if (evt.keyCode != 27) {
          clearTimeout(this._timeout);
          this.processSearch(evt, _this.ltProp('value')) //NO I18N
          if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
            this.toggleComp("open"); //NO I18N
          }
        }
      } else {
        this.preventInput = false;
      }
    },
    //!!Check this below function
    input: function(evt, _this) {
      if (!this.preventInput) {
        if (evt.keyCode != 27) {
          clearTimeout(this._timeout);
          this.processSearch(evt, _this.ltProp('value')) //NO I18N
          if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
            this.toggleComp("open"); //NO I18N
          }
        }
      } else {
        this.preventInput = false;
      }
    },*/

    //During on input the function processSearch is called to determine to show new tag div or no result div . Also used to stop length of tag crossing max length
    onInput: function(evt, _this) {
      this.onInputTriggerSearch(evt, _this);
    },

    //This function is to perform action on keyDown in the input described below
    onKeyDown: function(Obj, event) {
      var returnStatus;

      /*this.processSearch(event, this.getData("cxPropInputValue")); //NO I18N
      if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
        this.toggleComp("open"); //NO I18N
      }*/

      //If any key other than backspace is clicked then reset the selected [i.e the highleighted] tag
      if (event.keyCode !== 8) {
        var tagAnimationArr = this.getData("tagAnimationArr"); //NO I18N
        if (tagAnimationArr.length > 0 && tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
          tagAnimationArr[tagAnimationArr.length - 1].highlightTag = false;
          Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
        }
      } else if (this.getData("cxPropDoubleBackSpace")) {

        //if the last tag is not selected [i.e highlighted] then select it and prevent removal else continue remove process*/
        var totaltagList = this.getData('cxPropTags'); //NO I18N

        if (this.getData("cxPropInputValue").length == 0 && totaltagList.length != 0) {
          var tagAnimationArr = this.getData("tagAnimationArr"); //NO I18N
          if (tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
            return
          } else {
            tagAnimationArr[tagAnimationArr.length - 1].highlightTag = true;
            //this.setData("tagAnimationArr", tagAnimationArr); //NO I18N
            Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
            this.onTagRemovalHighlight = true;
            return
          }
        }
      }

        if (this.getData("cxPropAllowNewTagCreations")) {

          var keycode, value = Obj.ltProp("value"); //NO I18N

          //If there is nothing typed and space is clicked do not accpet this space by preventing futher propagations
          if (event.keyCode == 32) {
            if (value.length < 1) {
              event.preventDefault();
              return
            }
          }

          //if backspace is clicked
          if (event.keyCode == 8 && !this.data.cxPropRequestForTags.enable) {
            var totaltagList = this.getData('cxPropTags'); //NO I18N

            //If the input value becomes empty by backspace reset the component , i.e remove newtag div or no result div if shown
            if (this.getData("cxPropInputValue").length == 1) {

              //!!Check lines [thisline +1] ,[thisline +3] and [thisline +5] if required or not
              /*this.setData("cxPropInputValue", ""); //NO I18N*/
              this.setData("newTag", false); //NO I18N
              /*this.allowSearch = false;*/
              this.setData("newTagMsg", ""); //NO I18N
              /*this.processSearch({}, "");*/

              var activeItems = this.bodyDrop.querySelectorAll(".tagOptionsItems.lyteDropdownActive"); //NO I18N
              if (activeItems.length == this.getData("cxPropTagOptions").length) {
                this.setData("noValue", true); //NO I18N
              } else {
                this.setData("noValue", false); //NO I18N
              }
            }
          }

          //If max length of a tag has been reached then this error is thrown and futher propagations is to be stopped
          if (this.data.cxPropMaxTagLength !== 0 && this.getData("cxPropInputValue").length > this.getData("cxPropMaxTagLength")) {
            if (event.keyCode != 8) {
              this.preventBlurOnError = true;
              if (this.getMethods('onError')) { //NO I18N
                this.executeMethod('onError', this.getData("cxPropInputValue"), { //NO I18N
                  errorCode: 5,
                  reason: "Max length of the tag has been reached" //NO I18N
                }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
              }
              this.preventBlurOnError = false;
              event.preventDefault();
              return
            }
          }

          var preventKeyList = this.getData("cxPropPreventKeyList"); //NO I18N
          var creteTagKey = this.getData("cxPropCreteTagKey"); //NO I18N

          //if the dropdown is open and a value is highlighted then nothing continue with normal propergation
          if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
            if (event.keyCode == 13) {
              if(!this.getData("noValue")){
                var drop = this.$node.querySelector("lyte-dropdown"); //NO I18N
                var child = drop.component.childComp ? drop.component.childComp : this.$node.querySelector("lyte-dropdown lyte-drop-box"); //NO I18N  
                var selectedOptions = $L(".lyteDropdownSelection",this.bodyDrop); //NO I18N
                if (!child.classList.contains("lyteDropdownHidden") && selectedOptions.length > 0) {
                  return;
                }
              }
            }
          }

          //If the current key is a create Tag key then create the tag
          for (var i = 0; i < creteTagKey.length; i++) {
            var creteTag = creteTagKey[i];
            if (typeof(creteTagKey[i]) == "string") {
              keycode = event.key;
            } else if (typeof(creteTagKey[i]) == "number") {
              keycode = event.keyCode;
            }
            if (keycode === creteTag) {
              this.handleAddNewTag(value, "keyDown",event); //NO I18N
              if(event.key !== "Tab" && event.key !== "Enter"){
                event.preventDefault();
              }
              return;
            }
          }

          //If the current key is an key to be excluded then it will be prevented here
          for (var i = 0; i < preventKeyList.length; i++) {
            var preventKey = preventKeyList[i];
            if (typeof(preventKeyList[i]) == "string") {
              keycode = event.key;
            } else if (typeof(preventKeyList[i]) == "number") {
              keycode = event.keyCode;
            }
            if (keycode === preventKey) {
              event.preventDefault();
              return
            }
          }
        }
      },
      selectedTagsScroll: function(event){
        if(this.data.cxPropRequestForTags.enable){
          if(!this.preventOpenScroll){
            this.selectedTagsInstance.performScroll(event);
          } else {
            this.preventOpenScroll = false;
          }

        }
      },
      tagOptionsScroll: function(event){
        if(this.data.cxPropRequestForTags.enable){
          this.tagOptionsInstance.performScroll(event);
        }
      }
    },
    keyDownEvent : function(){
      if(this.$node.querySelector('lyte-dropdown') && this.$node.cxProp('aria')){
        this.bindEventForAria();
      }
    }.observes('cxPropAria').on('didConnect'),

  _proceedWithDropBoxOpen: function () {
    if (!this.data.openCount) {
      this.openCount = this.openCount + 1;
    }

    if (!this.data.cxPropRequestForTags.enable || (this.data.cxPropRequestForTags.enable && !this.preventDropFromOpening)) {
      this.bodyDrop = this.$node.querySelector('lyte-dropdown').component.childComp; // NO I18N

      if (!this.getData("cxPropAllowDropdown") && !(this.data.cxPropColorTags && this.data.newTag)) {
        return false;
      }
    } else {
      return false;
    }

  },
  
    methods: {
      onInputFocus: function(inputEle){
        if( inputEle && inputEle.classList.contains("lyteInputFocus") && !this.data.onFocus){
          this.setData("onFocus", true); //NO I18N
          this.$node.querySelector('lyte-drop-button').classList.add('cxDropButtonFocused') //NO I18N
        }
      },
      //!!Check the below three function
      dropdownScrollClose: function() {
        if (this.data.paletteOpen) {
          try {
            this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
          } catch (e) {
            return;
          }
        }
      },
      colorPaletteHide: function(id, event) {
        if (this.getMethods('onColorTagPaletteHide')) {
          this.executeMethod('onColorTagPaletteHide', id, event); //NO I18N
        }
      },
      onBeforeHide: function(event) {
        if (this.data.paletteOpen && !this.setFromExternalDeveloper) {
          return false;
        }
        if (event && (event.target.classList.contains('cxPaletteCircle') || event.target.classList.contains('cxPalettePopoverContent'))) {
          return false;
        }
        if(this.data.cxPropColorTags){
          this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
        }
      },
      //This function is to create a tag on blur
      onBlur: function(event) {
        this.setData("onFocus", false); //NO I18N
        if (this.data.tagAnimationArr.length) {
          var newTagObj = {
            doAnimation: false,
            highlightTag: false,
            color_code: "", //NO I18N
            class: "", //NO I18N
            style : "" //NO I18N
          };
          Lyte.arrayUtils(this.data.tagAnimationArr, 'replaceAt', this.data.tagAnimationArr.length - 1, this.calculateTagClass(newTagObj , this.data.tagAnimationArr.length - 1)); //NO I18N
        }
        if (!this.preventBlurFromDrop) {
          if (!this.preventBlurOnError) {
            if (!this.getData("cxPropAllowDropdown") && !(this.data.cxPropColorTags && this.data.newTag) && this.data.cxPropCreateTagOnBlur) {
              if (this.data.cxPropMaxTagLength !== 0 && this.getData("cxPropInputValue").length > this.getData("cxPropMaxTagLength")) {
                this.preventBlurOnError = true;
                if (this.getMethods('onError')) { //NO I18N
                  this.executeMethod('onError', this.getData("cxPropInputValue"), { //NO I18N
                    errorCode: 5,
                    reason: "Max length of the tag has been reached" //NO I18N
                  }, this.$node.querySelector("lyte-dropdown"), this.$node.querySelector("lyte-dropdown lyte-drop-box"), this.$node.querySelector("lyte-input"), this.$node); //NO I18N
                }
                this.preventBlurOnError = false;
                event.preventDefault();
                return
              } else {
                var value = this.getData("cxPropInputValue"); //NO I18N
                this.handleAddNewTag(value, "Blur", event); //NO I18N
              }
            }
          }
        } else {
          this.preventBlurFromDrop = false;
        }
      },

      //This function is used to add tag when user clicks on the dropitem
      beforeAddToList: function(event, value, ltPropSelected, component, dropItem) {
        this.valuesToRemove = [];
        if (this.data.paletteOpen && dropItem.id == 'newTagId') {
          return false;
        }
        if(this.data.cxPropColorTags){
          this.bodyDrop.querySelector('crux-color-palette').closePalette(); //NO I18N
        }
        this.setData("onFocus", true); //NO I18N
        if (!this.preventOnAdd) {
        //this.preventFutherTagReq = true;
        if(this.data.cxPropRequestForTags.enable && this.tagOptionsInstance.properties.isSearchReq){
          this.preventCheckFornextResponse = true;
        }
        var retValue = this.handleAddNewTag(value, "DropDown", event); //NO I18N
        
        if(!retValue){
          this.preventCheckFornextResponse = false;
        }
        return retValue;
        } else {
          this.preventOnAdd = false;
          return false
        }
      },

      //This function is used to add tag when user clicks on the dropitem
      addToList: function(event, data, ltPropSelected, component, dropItem) {
        var selectedVals = JSON.parse(ltPropSelected);
        var selectedLength = selectedVals.length;
        var removeVals = this.valuesToRemove;
        var removeValuesLength = removeVals.length;

        for (var i = 0; i < selectedLength; i++) {
          if (selectedVals[i] == "") {
            var doRemove = true;
            if (i == selectedVals.length - 1) {
              doRemove = false;
            }
            Lyte.arrayUtils(selectedVals, 'removeAt', i, 1); //NO I18N
            selectedLength = selectedVals.length;
            if (doRemove) {
              i--;
            }
            continue;
          }
          if (removeValuesLength > 0) {
            for (var j = 0; j < removeValuesLength; j++) {
              if (selectedVals[i] == removeVals[j]) {
                var doRemove = true;
                if (i == selectedVals.length - 1) {
                  doRemove = false;
                }
                Lyte.arrayUtils(selectedVals, 'removeAt', i, 1); //NO I18N
                selectedLength = selectedVals.length;
                if (doRemove) {
                  i--;
                }
                continue;
              }
            }
          }
        }
        this.setData("selectedList", selectedVals); //NO I18N

        this.updateOptionActiveClass("add" , data); //NO I18N

        this.valuesToRemove = [];
        var activeItems = this.bodyDrop.querySelectorAll(".tagOptionsItems.lyteDropdownActive"); //NO I18N
        if(!this.data.cxPropRequestForTags.enable){
          if (activeItems.length == this.getData("cxPropTagOptions").length) {
            this.setData("noValue", true); //NO I18N
          } else {
            this.setData("noValue", false); //NO I18N
          }
        } else if( activeItems.length === this.data.cxPropTagOptions.length  &&  this.tagOptionsInstance.properties.allRecordsFetched === true ){
          this.setData("noValue", true); //NO I18N
        } else {
          this.setData("noValue", false); //NO I18N
        }

        this.bodyDrop.querySelector("#newTagId").classList.remove('lyteDropdownActive') //NO I18N

        if(this.data.cxPropRequestForTags.enable){
          if(!this.preventCheckFornextResponse){
              this.checkForNextRequest();
          } else {
            this.preventCheckFornextResponse = false;
          }
        }
      },

      //This function is used to remove tag when user clicks on the dropitem
      beforeRemoveFromList: function(event, src, selected, component, method, item) {
        this.setData("onFocus" , true);//NO I18N
        var onTagRemovalHighlight = this.onTagRemovalHighlight;
        var response = this.removeLatestTag(src, method);
        return response;
      },

      //This function is used to remove tag when user clicks on the dropitem
      removeFromList: function(event, src, selected, component, method, item) {
        if(!this.data.cxPropRequestForTags.enable){
          this.processSearch({}, this.getData("cxPropInputValue"));//NO I18N
        } else {
          var list = this.data.cxPropNewlyUnSelectedTags, listLen = list.length, found = false;
          for(var i = 0; i < listLen; i++){
            if(src === list[i][this.data.cxPropSystemValue]){
              found = true;
              break;
            }
          }
          if(!found){
            list = this.data.cxPropTagOptions;
            listLen = list.length;
            for(var i = 0; i < listLen; i++){
              if(src === list[i][this.data.cxPropSystemValue]){
                Lyte.arrayUtils(this.getData("cxPropTagOptions") , 'removeAt', i, 1); //NO I18N
                break;
              }
            }
          }
        }

        this.updateOptionActiveClass("remove" , src); //NO I18N

        this.checkListCount();
        if(this.data.paletteOpen){
          try{
            this.bodyDrop.querySelector('crux-color-palette').alignColorPalette();  //NO I18N
          }catch(e){
            return;
          }
        }
      },

      // Used to determine if dropdown is to be shown or not and set common values
      onBeforeOpenDropBox: function (event, component) {
        let beforeOpenResult = this.getMethods('onBeforeOpen') 
        ? this.executeMethod('onBeforeOpen', event, this.$node) // NO I18N 
        : true;

        // Handle Promise case
        if (beforeOpenResult instanceof Promise) {
          return beforeOpenResult.then((result) => {
            if (result === false) {
              return false;
            }
            this.setData('cxPropTagOptions', result); // NO I18N
            return this._proceedWithDropBoxOpen();
          }).catch(() => false); // In case of an error, prevent dropdown opening
        }

        // Handle synchronous return
        if (beforeOpenResult === false) {
          return false;
        }

        return this._proceedWithDropBoxOpen();
      },


      // //Used to determine if dropdown is to be shown or not and set common values
      // onBeforeOpenDropBox: function(event, component) {
      //   if (this.getMethods('onBeforeOpen')) { // NO I18N
      //     let result = this.executeMethod('onBeforeOpen', event, this.$node); // NO I18N
      //     if (result === false) {
      //       return false;
      //     }
      //   }
        
      //   if(!this.data.openCount){
      //     this.openCount = this.openCount + 1;
      //   }
      //   if(!this.data.cxPropRequestForTags.enable || (this.data.cxPropRequestForTags.enable && !this.preventDropFromOpening) ){
      //     this.bodyDrop = this.$node.querySelector('lyte-dropdown').component.childComp; //NO I18N
      //     if (!this.getData("cxPropAllowDropdown") && !(this.data.cxPropColorTags && this.data.newTag)) {
      //       return false
      //     }
      //   } else {
      //     return false;
      //   }
      // },

      //Used to trigger checkIfSelectedIsToBeSet
      onOpenDropBox: function(event) {
        if (this.data.cxPropColorTags && this.bodyDrop.querySelector("crux-color-palette").cxProp("selectedColor") === 'noFill') {
          if(!this.data.cxPropSelectedColor){
            this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor', this.bodyDrop.querySelector('crux-color-palette').cxProp('defaultColors')[Math.floor(Math.random() * 13)]) //NO I18N
          } else {
            this.bodyDrop.querySelector('crux-color-palette').cxProp('selectedColor', this.data.cxPropSelectedColor) //NO I18N
          }
        }
        this.checkIfSelectedIsToBeSet(true);
        if(this.getMethods('onOpen')){ //NO I18N
         return this.executeMethod('onOpen',event,this.$node); //NO I18N
       }

       /*Develpoment*/
       if(this.data.cxPropRequestForTags.enable && !this.selectedReqMade && !this.selectedDataAvailable && !this.data.cxPropSelected){
         this.selectedReqMade = true;
         var prom = this.tagOptionsInstance.constructNextBatch();
         if (prom && prom.then) {
           Promise.resolve(prom).then(function(response) {
             this.selectedReqMade = false;
             this.selectedDataAvailable = true;
           }.bind(this));
         }
       }
      },

      //remove focun when dropdown is closed
      hideDropBox: function() {
        //this.setData("onFocus", false); //NO I18N
        if(this.getMethods('onClose')){ //NO I18N
         return this.executeMethod('onClose',event,this.$node); //NO I18N
        }
      }
    },

    /*Mixin functions*/
    /*Options functions*/
    optionQueryParams: function(instance, qp){
      if(this.getMethods("setReqQueryParams")){
        return this.executeMethod("setReqQueryParams" , "options", instance, qp);//No I18N
      } else {
        return undefined;
      }
    },
    optionsNextBatchFunc: function(instance, nextBatch){
      var nextBatchLen = nextBatch.length;
      var listToCheck = JSON.parse(this.data.selectedList);
      var listToCheckLen = listToCheck.length;
      var addActiveClass = [];
      for(var j = 0; j < nextBatchLen; j++){
        for(var i = 0; i < listToCheckLen; i++){
          if(listToCheck[i] === nextBatch[j][this.data.cxPropSystemValue]){
            addActiveClass.push(nextBatch[j]);
            break;
          }
        }
      }

      var pushedThisBatch = nextBatch;
      Lyte.arrayUtils( this.getData("cxPropTagOptions") , 'push' , nextBatch); //No I18N
      if(this.localSearchResponse && this.localSearchResponse.length){
        pushedThisBatch = pushedThisBatch.concat(this.localSearchResponse);
        Lyte.arrayUtils( this.getData("cxPropTagOptions") , 'push' , this.localSearchResponse); //No I18N
        this.localSearchResponse = [];
      } 
      if(!this.data.cxPropInputValue && this.data.cxPropNewlyUnSelectedTags.length){
        if(this.openCount === 1){
          var list = this.data.cxPropTagOptions, listLen = list.length, listClone = this.data.cxPropTagOptions.slice();
          var list2 = this.data.cxPropNewlyUnSelectedTags, list2len = list2.length;
          var posToRemove = [];
          for(var i = 0; i < listLen; i++){
            for(var j = 0; j < list2len; j++){
              if(list[i][this.data.cxPropSystemValue] === list2[j][this.data.cxPropSystemValue]){
                Lyte.arrayUtils(listClone, 'removeAt', i, 1); //NO I18N
                break;
              }
            }
          }
          this.setData("cxPropTagOptions" , listClone); //NO I18N
        }
        
        pushedThisBatch = pushedThisBatch.concat(this.data.cxPropNewlyUnSelectedTags);
        Lyte.arrayUtils( this.getData("cxPropTagOptions") , 'push' , this.data.cxPropNewlyUnSelectedTags); //No I18N
      }

      //if(instance.properties.isSearchReq){
        this.showNoResult(undefined, instance.properties.searchValue, nextBatch);
      //}
      if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
        this.toggleComp("open"); //NO I18N
      }
      if(nextBatch.length >= 0)
      {
        if(!this.data.cxPropTagOptions.length){
          this.setData('noValue' , false);//No I18N
        }
        //this.setData('noValue' , false);//No I18N
      }

      /*var addActiveClassLen = addActiveClass.length;
      for(var i = 0; i < addActiveClassLen; i++){
        var allOptions = this.data.cxPropTagOptions;
        var allOptionsLen = allOptions.length;
        var lengthToEnd = allOptionsLen - pushedThisBatch.length - 1;
        for(var j = allOptionsLen - 1; j >= lengthToEnd; j--){
          if(allOptions[j][this.data.cxPropSystemValue] === addActiveClass[i][this.data.cxPropSystemValue]){
            var valToSet = this.data.tagOptionsMirror[j].class + " lyteDropdownActive"; //NO I18N
            Lyte.arrayUtils(this.getData("tagOptionsMirror"), 'insertAt', j, { "class" : valToSet }); //NO I18N
         }
        }
      }*/

      this.checkForNextRequest();
    },
    loadingStateUpdateFunc: function(instance){
      var reqDataVariable = "" , type;//NO I18N
      switch(instance.properties.currentLoadingStage){
        case "initial":
          if(instance.userCustomData.type === "options"){
            reqDataVariable = "initialOptionLoader";//NO I18N
          } else {
            reqDataVariable = "initialSelectedLoader";//NO I18N
            this.preventDropFromOpening = true;
          }
          type = 1;
          break;
        case "scroll":
          if(instance.userCustomData.type === "options"){
            reqDataVariable = "scrollOptionLoader";//NO I18N
          } else {
            reqDataVariable = "scrollSelectedLoader";//NO I18N
          }
          type = 1;
          break;
        case "search":
          if(instance.userCustomData.type === "options"){
            reqDataVariable = "initialOptionLoader";//NO I18N
          }
          type = 1;
          break;
        case "":
          if(!this.openingReq){
            this.preventDropFromOpening = false;
            var loadingStateObj = JSON.parse(JSON.stringify(this.data.loadingStateObj));
            if(instance.userCustomData.type === "options"){
              loadingStateObj.initialOptionLoader = false;
              loadingStateObj.scrollOptionLoader = false;
            } else {
              loadingStateObj.initialSelectedLoader = false;
              loadingStateObj.scrollSelectedLoader = false;
            }
            this.setData("loadingStateObj" , loadingStateObj); //NO I18N
            type = 0;
          }
          break;
      }
      if(type){
        Lyte.objectUtils(this.data.loadingStateObj , "add" , reqDataVariable, true); //NO I18N
      }
    },
    optionsAfterRequestFunc: function(instance, response){
      if(response){
        this.reqForTagMatchObj = {
          selectedMatch : response.selectedMatch,
          unselectedMatch : response.unselectedMatch
        };
      }
      if(instance.properties.pageNo === 1 && this.isInitialOptionsReqPending && !instance.properties.isSearchReq){
        this.isInitialOptionsReqPending = false;
      }
      /*if(instance.properties.isSearchReq && instance.properties.pageNo === 1){
        this.setData("cxPropTagOptions" , []); //NO I18N
        //this.selectedDataAvailable = false;
      }*/
    },
    optionsBeforeRequestFunc: function(instance){
      this.reqForTagMatchObj = {};
      var returnValue = false;
      if(!instance.properties.isSearchReq && instance.properties.pageNo === 1){
        if(!this.isInitialOptionsReqPending) {
          this.isInitialOptionsReqPending = true;
          returnValue = false;
        } else if(this.isInitialOptionsReqPending){
          returnValue = true;
        }
      }
      return returnValue;
    },
    optionsInvalidResponseFunc: function(instance,response){


      if(instance.properties.pageNo === 1 && this.isInitialOptionsReqPending && !instance.properties.isSearchReq){
        this.isInitialOptionsReqPending = false;
      }
      
      if(!response || (response && response.tags && !response.tags.length)){
        if(this.localSearchResponse && this.localSearchResponse.length){
          Lyte.arrayUtils( this.getData("cxPropTagOptions") , 'push' , this.localSearchResponse); //No I18N
          this.showNoResult(undefined, instance.properties.searchValue, this.localSearchResponse);
          this.localSearchResponse = [];
        }
      }

      if(!this.data.cxPropInputValue && this.data.cxPropNewlyUnSelectedTags.length){
        if(this.openCount === 1){
          var list = this.data.cxPropTagOptions, listLen = list.length, listClone = this.data.cxPropTagOptions.slice();
          var list2 = this.data.cxPropNewlyUnSelectedTags, list2len = list2.length;
          var posToRemove = [];
          for(var i = 0; i < listLen; i++){
            for(var j = 0; j < list2len; j++){
              if(list[i][this.data.cxPropSystemValue] === list2[j][this.data.cxPropSystemValue]){
                Lyte.arrayUtils(listClone, 'removeAt', i, 1); //NO I18N
                break;
              }
            }
          }
          this.setData("cxPropTagOptions" , listClone); //NO I18N
        }
        Lyte.arrayUtils( this.getData("cxPropTagOptions") , 'push' , this.data.cxPropNewlyUnSelectedTags); //No I18N
      }

      if(!this.data.cxPropTagOptions.length){
        this.showNoResult(undefined, instance.properties.searchValue, []);
      }
      if (this.getData("cxPropAllowDropdown") || (this.data.cxPropColorTags && this.data.newTag)) {
        this.toggleComp("open"); //NO I18N
      }
    },
    optionsCustomRequestFunc: function(instance,qp){
      if(this.getMethods("onCustomRequest")){
        return this.executeMethod("onCustomRequest" , "options", qp, {isSearch : instance.properties.isSearchReq , searchValue : instance.properties.searchValue}); //NO I18N
      }
    },
    optionsBeforeSearchRequestFunc: function(instance,type){
      this.setData("cxPropTagOptions" , []); //No I18N
      if(type === "clearSearch"){
        this.setData("duplicateSelected", false); //NO I18N
        this.setData("duplicateSelectedMessage" , ""); //NO I18N
        this.setData("newTag" , false); //NO I18N
      }
      if(type === "rejected"){
        if(this.data.duplicateSelected){
          this.showNoResult(undefined, instance.properties.searchValue, []);
          //this.setData("duplicateSelectedMessage" , instance.properties.searchValue + " is already selected"); //NO I18N
        }
        if(this.data.newTag){
          this.showNoResult(undefined, instance.properties.searchValue, []);
        }
      }
    },
    /*optionsBeforeNextBatchFunc: function(instance, nextBatch){
      var selectedList = JSON.parse(this.data.selectedList),
      selectedListlen = selectedList.length,
      nextBatchLen = nextBatch.length,
      newNextBatch = [];

      for(var j = 0; j < nextBatchLen; j++){
        var found = false;
        for(var i = 0; i < selectedListlen; i++){
          if(nextBatch[j][this.data.cxPropSystemValue] === selectedList[i]){
            found = true;
            break;
          }
        }
        if(!found){
          newNextBatch.push(nextBatch[j]);
        }
      }
      return newNextBatch;
    },*/
    /*Selected functions*/
    selectedQueryParams: function(instance, qp){
      if(this.getMethods("setReqQueryParams")){
        return this.executeMethod("setReqQueryParams" , "selected", instance, qp);//No I18N
      } else {
        return undefined;
      }
    },
    selectedNextBatchFunc: function(instance , nextBatch){

      var tagAnimationArr = this.data.tagAnimationArr;
      if (tagAnimationArr.length > 0 && tagAnimationArr[tagAnimationArr.length - 1].highlightTag) {
        tagAnimationArr[tagAnimationArr.length - 1].highlightTag = false;
        Lyte.arrayUtils(this.getData("tagAnimationArr"), 'replaceAt', tagAnimationArr.length - 1, this.calculateTagClass(tagAnimationArr[tagAnimationArr.length - 1] , tagAnimationArr.length - 1)); //NO I18N
      }

      var selectedTagListContainer = $L('#cxSelectedTagListContainer', this.$node)[0], //NO I18N
      oldScrollHeight = selectedTagListContainer.scrollHeight,
      newScrollheight;
      if(this.data.cxPropRequestForTags.reverseOrder){
        this.setData("cxPropTags" , nextBatch.concat(this.getData("cxPropTags"))); //No I18N
      } else {
        nextBatch = nextBatch.reverse();
        this.setData("cxPropTags" , nextBatch.concat(this.getData("cxPropTags"))); //No I18N
      }

      /*setTimeout(function() {*/
        if(!this.openingReq){
          this.preventOpenScroll = true;
          newScrollheight = selectedTagListContainer.scrollHeight;
          selectedTagListContainer.scrollTop = newScrollheight - oldScrollHeight;
        } else {
          if(selectedTagListContainer.scrollHeight <= selectedTagListContainer.offsetHeight + 5){
            if(!this.selectedTagsInstance.properties.allRecordsFetched){
              this.selectedTagsInstance.constructNextBatch();
            } else {
              this.openingReq = false;
              var loadingStateObj = JSON.parse(JSON.stringify(this.data.loadingStateObj));
              loadingStateObj.initialSelectedLoader = false;
              loadingStateObj.scrollSelectedLoader = false;
              this.setData("loadingStateObj" , loadingStateObj); //NO I18N
            }
          } else {
            this.preventOpenScroll = true;
            selectedTagListContainer.scrollTop = selectedTagListContainer.scrollHeight;
            this.openingReq = false;
            var loadingStateObj = JSON.parse(JSON.stringify(this.data.loadingStateObj));
            loadingStateObj.initialSelectedLoader = false;
            loadingStateObj.scrollSelectedLoader = false;
            this.setData("loadingStateObj" , loadingStateObj); //NO I18N
          }
        }
      /*}.bind(this), 100);*/
    },
    selectedCustomRequestFunc: function(instance,qp){
      if(this.getMethods("onCustomRequest")){
         return this.executeMethod("onCustomRequest" , "selected", qp, {isSearch : instance.properties.isSearchReq , searchValue : instance.properties.searchValue}); //NO I18N
      }
    },
    selectedInvalidResponseFunc: function(instance,response){
      if(this.openingReq){
        this.openingReq = false;
        var loadingStateObj = JSON.parse(JSON.stringify(this.data.loadingStateObj));
        loadingStateObj.initialSelectedLoader = false;
        loadingStateObj.scrollSelectedLoader = false;
        this.setData("loadingStateObj" , loadingStateObj); //NO I18N
      }
    }
  }, {mixins : ["crux-aria-dropdown-mixin"]}); //NO I18N
