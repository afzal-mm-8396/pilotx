/**
 * @component lyte-dual-listbox
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
 Lyte.Component.register("lyte-dual-listbox", {
_template:"<template tag-name=\"lyte-dual-listbox\" role=\"listbox\"> <div class=\"lyteListboxWrapper\"> <div class=\"lyteListboxLeftPanel lyteListboxPanels\" id=\"lyte_listbox_left_panel\" aria-label=\"left panel\" aria-multiselectable=\"true\" aria-orientation=\"vertical\" onfocus=\"{{action('focusPanel',this)}}\" onfocusout=\"{{action('blurPanel',this)}}\" aria-activedescendant=\"{{listboxLeftAriaDescendant}}\"> <template is=\"if\" value=\"{{ltPropShowSearch}}\"><template case=\"true\"><lyte-search class=\"lyteListBoxSearch\" lt-prop=\"{{stringify(ltPropSearch)}}\" lt-prop-class=\"lyteListboxInput\" lt-prop-close-icon=\"true\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.{{ltPropSearchScope}}&quot;, &quot;search&quot; : &quot;.lyteListBoxLeftWrap&quot;, &quot;target&quot; : &quot;.lyteListBoxLeftWrap&quot;}\" lt-prop-check-from-parent=\"true\" lt-prop-component=\"duallistbox\" lt-prop-trim=\"true\" on-search=\"{{method('onSearch')}}\"></lyte-search></template></template> <div class=\"lyteListboxleftElementWrap lyteListboxSortablePanels\"> <template is=\"for\" items=\"{{ltPropLeftData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListBoxLeftWrap {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'par','left')}}\"> <div class=\"lyteListBoxLeftElement lyteLeftLvl1 {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'child','left')}}\" ondblclick=\"{{action('moveElementRight',this,'doubleClick')}}\" onmouseup=\"{{action('elementFN',this,event)}}\" onmousedown=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\" dom-index=\"\" id=\"\" role=\"option\" aria-selected=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteListboxYield\" yield-name=\"leftWidget\" left-widget-value=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListboxDisplayNode\"> {{item[ltPropDisplayKey]}} </div> </template></template> <template is=\"if\" value=\"{{ltPropShowIcon}}\"><template case=\"true\"><lyte-lb-add class=\"lyteLbAdd\" onclick=\"{{action('addElementToRight',this,event)}}\"></lyte-lb-add></template></template> </div> </div> </template> <template is=\"if\" value=\"{{noResultsFound}}\"><template case=\"true\"><div class=\"lyteListBoxNoResultsFound\">{{ltPropNoResultMessage}}</div></template></template> </div> <template is=\"if\" value=\"{{showLeftpanelPlaceholder}}\"><template case=\"true\"><div class=\"lyteListBoxLeftWrapPlaceholder\"></div></template></template> </div> <template is=\"if\" value=\"{{ltPropShowToolbar}}\"><template case=\"true\"><div class=\"lyteListboxToolbar\"> <template is=\"if\" value=\"{{moveRight}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTNavBtn lyteLBTBMoveRight\" tabindex=\"0\" role=\"button\" aria-label=\"move selected elements right\" onclick=\"{{action('moveElementRight',this,'toolbarClick')}}\" lt-prop-title=\"Move Right\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveLeft}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTNavBtn lyteLBTBMoveLeft\" tabindex=\"0\" role=\"button\" aria-label=\"move selected elements left\" onclick=\"{{action('moveElementLeft',this,'toolbarClick')}}\" lt-prop-title=\"Move Left\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveTop}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTNavBtn lyteLBTBMoveUp\" tabindex=\"0\" role=\"button\" aria-label=\"move selected elements up\" onclick=\"{{action('moveElementUp',this)}}\" lt-prop-title=\"Move Up\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveBottom}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTNavBtn lyteLBTBMoveDown\" tabindex=\"0\" role=\"button\" aria-label=\"move selected elements down\" onclick=\"{{action('moveElementDown',this)}}\" lt-prop-title=\"Move Down\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveAllRight}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveAllRight\" tabindex=\"0\" role=\"button\" aria-label=\"move all elements right\" onclick=\"{{action('moveAllElementsRight',this)}}\" lt-prop-title=\"Move All Right\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"> AR </div></template></template> <template is=\"if\" value=\"{{moveAllLeft}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveAllLeft\" tabindex=\"0\" role=\"button\" aria-label=\"move all elements left\" onclick=\"{{action('moveAllElementsLeft',this)}}\" lt-prop-title=\"Move All Left\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"> AL </div></template></template> <template is=\"if\" value=\"{{deleteElement}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBDeleteMarked\" tabindex=\"0\" role=\"button\" aria-label=\"delete the selected element\" onclick=\"{{action('deleteElement')}}\" lt-prop-title=\"Delete\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> </div></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropHasPinOption,'!'),'&amp;&amp;',expHandlers(ltPropInfiniteScroll,'!'))}}\"><template case=\"true\"> <div class=\"lyteListboxRightPanel lyteListboxUnpinnedWrapper lyteListboxPanels lyteListboxSortablePanels\" tabindex=\"0\" id=\"lyte_listbox_right_panel\" aria-label=\"right panel\" aria-orientation=\"vertical\" onfocus=\"{{action('focusPanel',this)}}\" onfocusout=\"{{action('blurPanel',this)}}\" aria-activedescendant=\"{{listboxRightAriaDescendant}}\"> <template is=\"for\" items=\"{{ltPropRightData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListBoxRightWrap {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'par','right',ltPropAllowMandateSortable)}}\"> <div class=\"lyteListBoxRightElement lyteRightLvl1 {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'child','right',ltPropAllowMandateSortable)}}\" ondblclick=\"{{action('moveElementLeft',this,'doubleClick')}}\" onmouseup=\"{{action('elementFN',this,event)}}\" onmousedown=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\" setparent=\"{{lyteListBoxParentIndex(this,item,ltPropAssociateParent)}}\" dom-index=\"\" id=\"\" role=\"option\" aria-selected=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteListboxYield\" yield-name=\"rightWidget\" right-widget-value=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListboxDisplayNode\"> {{item[ltPropDisplayKey]}} </div> </template></template> <template is=\"if\" value=\"{{expHandlers(item[ltPropMandateKey],'!')}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> <template is=\"if\" value=\"{{expHandlers(item[ltPropMandateKey],'&amp;&amp;',showRemoveBtn)}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> </div> </div> </template> <template is=\"if\" value=\"{{noResultsFoundRight}}\"><template case=\"true\"><div class=\"lyteListBoxNoResultsFound\">{{ltPropNoResultMessage}}</div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{enableInfiniteScroll}}\"><template case=\"true\"> <div class=\"lyteListboxRightPanel lyteListboxUnpinnedWrapper lyteListboxPanels lyteListboxSortablePanels\" tabindex=\"0\" id=\"lyte_listbox_right_panel\" aria-label=\"right panel\" aria-orientation=\"vertical\" onfocus=\"{{action('focusPanel',this)}}\" onfocusout=\"{{action('blurPanel',this)}}\" aria-activedescendant=\"{{listboxRightAriaDescendant}}\"> <template is=\"forIn\" object=\"{{infiniteScrollPopulateData}}\" value=\"value\" key=\"index\"> <div class=\"lyteListBoxRightWrap {{lyteListBoxRequiredClassHelper(value.data,ltPropMandateKey,minCountReached,'par','right',ltPropAllowMandateSortable)}}\"> <div class=\"lyteListBoxRightElement lyteRightLvl1 {{lyteListBoxRequiredClassHelper(value.data,ltPropMandateKey,minCountReached,'child','right',ltPropAllowMandateSortable)}}\" ondblclick=\"{{action('moveElementLeft',this,'doubleClick')}}\" onmouseup=\"{{action('elementFN',this,event)}}\" onmousedown=\"{{action('elementFN',this,event)}}\" index=\"{{value.index}}\" setparent=\"{{lyteListBoxParentIndex(this,value.data,ltPropAssociateParent)}}\" dom-index=\"\" id=\"\" role=\"option\" aria-selected=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteListboxYield\" yield-name=\"rightWidget\" right-widget-value=\"{{value.data}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListboxDisplayNode\"> {{value.data[ltPropDisplayKey]}} </div> </template></template> <template is=\"if\" value=\"{{expHandlers(value.data[ltPropMandateKey],'!')}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> <template is=\"if\" value=\"{{expHandlers(value.data[ltPropMandateKey],'&amp;&amp;',showRemoveBtn)}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> </div> </div> </template> <template is=\"if\" value=\"{{noResultsFoundRight}}\"><template case=\"true\"><div class=\"lyteListBoxNoResultsFound\">{{ltPropNoResultMessage}}</div></template></template> </div> </template><template case=\"false\"> <div class=\"lyteListboxRightPanel lyteListboxPanels lyteLBRightPanelWithPinOption\" tabindex=\"0\" id=\"lyte_listbox_right_panel\" aria-label=\"right panel\" aria-orientation=\"vertical\" onfocus=\"{{action('focusPanel',this)}}\" onfocusout=\"{{action('blurPanel',this)}}\" aria-activedescendant=\"{{listboxRightAriaDescendant}}\"> <div class=\"lyteListboxPinnedWrapper lyteListboxSortablePanels\"> <template is=\"for\" items=\"{{ltPropPinnedData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListBoxRightWrap lyteListBoxRightPinnedWrap {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'par','right',ltPropAllowMandateSortable)}}\"> <div class=\"lyteListBoxRightElement lyteRightLvl1 {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'child','right',ltPropAllowMandateSortable)}}\" onmouseup=\"{{action('elementFN',this,event)}}\" onmousedown=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\" setparent=\"{{lyteListBoxParentIndex(this,item,ltPropAssociateParent)}}\" dom-index=\"\" id=\"\" role=\"option\" aria-selected=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteListboxYield\" yield-name=\"rightWidget\" right-widget-value=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListboxDisplayNode\"> {{item[ltPropDisplayKey]}} </div> </template></template> </div> </div> </template> </div> <div class=\"lyteListboxUnpinnedWrapper lyteListboxSortablePanels\"> <template is=\"for\" items=\"{{ltPropRightData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListBoxRightWrap {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'par','right',ltPropAllowMandateSortable)}}\"> <div class=\"lyteListBoxRightElement lyteRightLvl1 {{lyteListBoxRequiredClassHelper(item,ltPropMandateKey,minCountReached,'child','right',ltPropAllowMandateSortable)}}\" ondblclick=\"{{action('moveElementLeft',this,'doubleClick')}}\" onmouseup=\"{{action('elementFN',this,event)}}\" onmousedown=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\" setparent=\"{{lyteListBoxParentIndex(this,item,ltPropAssociateParent)}}\" dom-index=\"\" id=\"\" role=\"option\" aria-selected=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteListboxYield\" yield-name=\"rightWidget\" right-widget-value=\"{{item}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteListboxDisplayNode\"> {{item[ltPropDisplayKey]}} </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(item[ltPropMandateKey],'!'),'&amp;&amp;',ltPropShowIcon)}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(item[ltPropMandateKey],'&amp;&amp;',showRemoveBtn),'&amp;&amp;',ltPropShowIcon)}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this,event)}}\"></lyte-lb-remove></template></template> </div> </div> </template> </div> <template is=\"if\" value=\"{{noResultsFoundRight}}\"><template case=\"true\"><div class=\"lyteListBoxNoResultsFound\">{{ltPropNoResultMessage}}</div></template></template> </div> </template></template></template></template> <template is=\"if\" value=\"{{moreLBElements}}\"><template case=\"true\"><lyte-badge class=\"lyteListboxBadge\" lt-prop-position=\"topRight\" lt-prop-max-length=\"3\"></lyte-badge></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,9]},{"type":"if","position":[0,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,11]},{"type":"if","position":[0,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,13]},{"type":"if","position":[0,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"forIn","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["ltPropLeftData","ltPropRightData","ltPropPinnedData","ltPropSortable","ltPropShortcut","ltPropShowToolbar","ltPropSearchScope","ltPropToolbarItems","ltPropMaxCount","ltPropDoubleClick","ltPropSelectAllChild","ltPropNoResultMessage","ltPropAriaRoleDescription","ltPropKeepOriginal","ltPropMandateKey","ltPropMinimumRequiredCount","ltPropRestrictMandatoryElement","ltPropIgnoreSorting","ltPropTooltipMessage","ltPropAllowMandateSortable","ltPropHasPinOption","ltPropShowIcon","ltPropSearch","ltPropYield","ltPropDisplayKey","associateParent","ltPropInfiniteScroll","ltPropInfiniteScrollElementCount","ltPropShowSearch","enableInfiniteScroll","infiniteScrollPopulateData","listboxLeftAriaDescendant","listboxRightAriaDescendant","ariaLabelledById","focusActiveBoolean","ariaLiveContentBoolean","ariaLiveContent","dragHasStarted","noResultsFound","noResultsFoundRight","moveRight","moveLeft","moveTop","moveBottom","deleteElement","moreLBElements","selectedIndexLeft","selectedIndexRight","leftShiftSelectIndex","rightShiftSelectIndex","insertAtLeftInd","insertAtRightInd","elementPosition","activeSide","previousClickedElemDomInd","focusedOnTab","initialClientX","initialClientY","firstUpDownClick","showRemoveBtn","userDefinedMinCount","itemsMaxed","initialMouseDownVals","draggedElemDim","draggedSource","draggedDestination","elementRemoved","draggedDatas","rightToLeftMoveData","draggedFromIndex","useSelf"],
_observedAttributesType :["array","array","array","boolean","boolean","boolean","string","array","number","boolean","boolean","string","string","boolean","string","number","boolean","string","string","boolean","boolean","boolean","object","boolean","string","string","boolean","number","boolean","boolean","object","string","string","string","boolean","boolean","string","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","array","array","string","string","number","number","number","string","number","boolean","number","number","boolean","boolean","boolean","boolean","object","object","string","string","boolean","array","object","array","boolean"],

  _lyteUtilFunctions : ['moveAllElementsLeft','moveAllElementsRight','moveElementToRight','moveElementToLeft','keyboardEvents','clearAllActive','pinElement','resetListbox'],
  data: function() {
    return { 
      // ltPropLeftData: Lyte.attr('array', {
      //   default: [],
      //   watch : true
      // }),
      /**
       * @componentProperty {array} ltPropLeftData
       * @default []
       * @input
       * @output
       */
      ltPropLeftData: Lyte.attr('array', {
        default: [],input:true,output:true,watch : Lyte.isWidgetBuild ? true : false
      }),
      /**
       * @componentProperty {array} ltPropRightData
       * @default []
       * @input
       * @output
       */
      ltPropRightData: Lyte.attr('array', {
        default: [],input:true,output:true,watch : Lyte.isWidgetBuild ? true : false
      }),
      /**
       * @componentProperty {array} ltPropPinnedData
       * @default []
       * @condition useSelf true
       * @condition ltPropHasPinOption true
       * @input
       * @output
       */
      ltPropPinnedData : Lyte.attr('array' , {
        default : [],input:true,output:true
      }),
    
      ltPropSortable: Lyte.attr('boolean', {
        default: false
      }),

      ltPropShortcut: Lyte.attr('boolean', {
        default: false
      }),
      /**
       * @componentProperty {boolean} ltPropShowToolbar
       * @default false
       * @input
       */
      ltPropShowToolbar: Lyte.attr('boolean', {
        default: false,input:true,output:false
      }),
      /**
       * @componentProperty {string} ltPropSearchScope
       * @default lyteListboxLeftPanel
       * @input
       */
      ltPropSearchScope: Lyte.attr('string', {
        default: 'lyteListboxLeftPanel',input:true,output:false
      }),
      /**
       * @componentProperty {array} ltPropToolbarItems
       * @default ['moveRight', 'moveLeft', 'moveTop', 'moveBottom' , 'moveAllRight' , 'moveAllLeft'] 
       * @input
       */
      ltPropToolbarItems: Lyte.attr('array', {
        default: ['moveRight', 'moveLeft', 'moveTop', 'moveBottom' , 'moveAllRight' , 'moveAllLeft'],input:true,output:false
      }),
       /**
       * @componentProperty {number} ltPropMaxCount
       * @default -1
       * @input
       */
      ltPropMaxCount: Lyte.attr('number', {
        default: -1,input:true,output:false
      }),
       /**
       * @componentProperty {boolean} ltPropDoubleClick
       * @default true
       * @input
       */
      ltPropDoubleClick: Lyte.attr('boolean', {
        default: true,input:true,output:false
      }),
       
      ltPropSelectAllChild : Lyte.attr('boolean',{
        default: false
      }),
      /**
       * @componentProperty {string} ltPropNoResultMessage
       * @default No Results Found
       * @input
       * @output
       */
      ltPropNoResultMessage : Lyte.attr('string' , {
        default : _lyteUiUtils.i18n('lyte.dual.listbox.no.results.found'),input:true,output:false
      }),
       /**
       * @componentProperty {string} ltPropAriaRoleDescription
       * @default Dual listbox
       * @input
       */
      ltPropAriaRoleDescription : Lyte.attr('string' , {
        default : 'Dual listbox',input:true,output:false
      }),

      ltPropKeepOriginal : Lyte.attr('boolean' , {
        default : false
      }),
      /**
       * @componentProperty {string} ltPropMandateKey
       * @default required
       * @input
       */
      ltPropMandateKey : Lyte.attr('string' , {
        default : 'required',input:true,output:false
      }),
      /**
       * @componentProperty {number} ltPropMinimumRequiredCount
       * @default -1
       * @input
       */
      ltPropMinimumRequiredCount : Lyte.attr('number' , {
        default : -1,input:true,output:false
      }),
      
      ltPropRestrictMandatoryElement : Lyte.attr('boolean' , {
        default : false ,input:true,output:false
      }),
      
      ltPropIgnoreSorting : Lyte.attr('string' , {
        default : ''
      }),
      /**
       * @componentProperty {string} ltPropTooltipMessage
       * @default Select limit reached
       * @input
       * @output
       */
      ltPropTooltipMessage : Lyte.attr('string', {
        default : 'Select limit reached',input:true,output:true
      }),
      
      ltPropAllowMandateSortable : Lyte.attr('boolean' , {
        default : false
      }),
      /**
       * @componentProperty {boolean} ltPropHasPinOption
       * @default false
       * @input
       */
      ltPropHasPinOption : Lyte.attr('boolean' , {
        default : false,input:true,output:false
      }),
      /**
       * @componentProperty {boolean} ltPropShowIcon
       * @default true
       * @input
       */
      ltPropShowIcon : Lyte.attr('boolean' , {
        default : true,input:true,output:false
      }),
      /**
       * @componentProperty {object} ltPropSearch
       * @default {}
       * @input
       */
      ltPropSearch : Lyte.attr("object",{default:{},input:true,output:false}),

      /**
       * @componentProperty {boolean} ltPropYield=false
       * @version 1.0.0
       * @input
       */
      ltPropYield : Lyte.attr('boolean' , {
        default : false,input:true,output:false
      }),
      /**
       * @componentProperty {string} ltPropDisplayKey
       * @mandatory
       * @default ""
       * @input
       */
      ltPropDisplayKey : Lyte.attr('string' , {
        default : "",input:true,output:false
      }),

      associateParent: Lyte.attr('string', {
        default: 'value'
      }),
      
      ltPropInfiniteScroll : Lyte.attr('boolean' , {
        default : false,input:true,output:false
      }),

      ltPropInfiniteScrollElementCount: Lyte.attr('number', {
        default: 20
      }),

      /**
       * @componentProperty {boolean} ltPropShowSearch=true
       * @version 1.0.0
       * @input
       */
      ltPropShowSearch: Lyte.attr('boolean', {
        default : true,input:true,output:false
      }),


     
      enableInfiniteScroll: Lyte.attr('boolean', {
        default: false
      }),
    
     
      infiniteScrollPopulateData : Lyte.attr('object' ,{
        default : {}
      }),


     
      listboxLeftAriaDescendant:Lyte.attr('string', {
        default : ''
      }),
     
      listboxRightAriaDescendant:Lyte.attr('string', {
        default : ''
      }),
     
      ariaLabelledById : Lyte.attr('string' , {
        default : ''
      }),
      
      focusActiveBoolean : Lyte.attr('boolean' , {
        default : false
      }),
     
      ariaLiveContentBoolean : Lyte.attr('boolean' , {
        default : false
      }),
     
      ariaLiveContent : Lyte.attr('string' , {
        default : ''
      }),

    
      dragHasStarted : Lyte.attr('boolean',  {
        default : false
      }),
     
      noResultsFound : Lyte.attr('boolean' , {
        default : false
      }),
     
      noResultsFoundRight : Lyte.attr('boolean' , {
        default : false
      }),
     
      moveRight: Lyte.attr('boolean', {
        default: false
      }),
      
      moveLeft: Lyte.attr('boolean', {
        default: false
      }),
     
      moveTop: Lyte.attr('boolean', {
        default: false
      }),
    
      moveBottom: Lyte.attr('boolean', {
        default: false
      }),
      
      deleteElement: Lyte.attr('boolean', {
        default: false
      }),
     
      moreLBElements: Lyte.attr('boolean', {
        default: false
      }),
      
      selectedIndexLeft: Lyte.attr('array', {
        default: []
      }),
     
      selectedIndexRight: Lyte.attr('array', {
        default: []
      }),
      
      leftShiftSelectIndex: Lyte.attr('string', {
        default: ""
      }),
     
      rightShiftSelectIndex: Lyte.attr('string', {
        default: ""
      }),
     
      insertAtLeftInd: Lyte.attr('number', {
        default: 0
      }),
     
      insertAtRightInd: Lyte.attr('number', {
        default: 0
      }),
     
      elementPosition : Lyte.attr('number', {
        default : 0
      }),
      
      activeSide : Lyte.attr('string' , {
        default : ''
      }),
     
      previousClickedElemDomInd : Lyte.attr('number' , {
        default : 0
      }),
     
      focusedOnTab : Lyte.attr('boolean' , {
        default : false
      }),
     
      initialClientX : Lyte.attr('number' , {
        default : 0
      }),
     
      initialClientY : Lyte.attr('number' , {
        default : 0
      }),
      
      firstUpDownClick : Lyte.attr('boolean' , {
        default : false
      }),
     
      showRemoveBtn : Lyte.attr('boolean' , {
        default : false
      }),
      
      userDefinedMinCount : Lyte.attr('boolean' , {
        default : false
      }),
      
      itemsMaxed : Lyte.attr('boolean' , {
        default : false
      }),
     
      initialMouseDownVals : Lyte.attr('object',{
        default : {}
      }),
      
      draggedElemDim : Lyte.attr('object' , {
        default : {}
      }),

     
      draggedSource : Lyte.attr('string' , {
        default : ''
      }),
      
      draggedDestination : Lyte.attr('string' , {
        default : ''
      }),
     
      elementRemoved : Lyte.attr('boolean' , {
        default : false
      }),
     
      draggedDatas :Lyte.attr('array' , {
        default : []
      }),
     
      rightToLeftMoveData : Lyte.attr('object' , {
        default : {}
      }),
      draggedFromIndex : Lyte.attr('array' , {
        default : []
      }),
      /**
       * @componentProperty {boolean} useSelf=false
       * @version 1.0.0
       * @input
       */
      useSelf : Lyte.attr('boolean' , {
        default : _lyteUiUtils.resolveDefaultValue('lyte-dual-listbox' , 'useSelf' , false),input:true,output:false
      })
    }
  },

  init: function() {

    if(_lyteUiUtils.isWidget){
      this.setData('useSelf' , true)
    }

    var th = this;
    var lB = this.$node

    /**
     * @utility moveAllElementsLeft
     * @version 1.0.0
     */
    this.$node.moveAllElementsLeft = function(){
      this.component.moveAllElementsLeft()
    }
    /**
     * @utility moveAllElementsRight
     * @version 1.0.0
     */
    this.$node.moveAllElementsRight = function(){
      this.component.moveAllElementsRight()
    }

    /**
     * @utility moveElementToRight
     * @version 1.0.0
     * @param { object } selectedObject
     */
    this.$node.moveElementToRight = function(obj){

      var onBeforeRightVal = true
      if(this.getMethods('onBeforeRight')){
        /**
         * @method onBeforeRight
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
         * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } individualObject
         * @param { boolean } false
         * @param { number } rightDataLength
         */
        onBeforeRightVal = this.component.executeMethod('onBeforeRight', this.getData('ltPropLeftData'), this.getData('ltPropRightData'), obj , false , this.getData('ltPropRightData').length);
      }
      if(onBeforeRightVal !== false){
        Lyte.arrayUtils(this.getData('ltPropLeftData') , 'removeObjects' , obj)
        Lyte.arrayUtils(this.getData('ltPropRightData')  , 'push' , obj)
        /**
         * @method onMoveRight
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
         * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } individualObject
         * @param { boolean } false
         * @param { number } rightDataLength
         */
        this.component.executeMethod('onMoveRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), obj , false , this.getData('ltPropRightData').length)
      }
    }

    /**
     * @utility moveElementToLeft
     * @author surendran.m@zohocorp.com
     * @version 1.0.0
     * @param { object } selectedObject
     */
    this.$node.moveElementToLeft = function(obj){

      var onBeforeLeftVal = true
      if(this.getMethods('onBeforeLeft')){
        /**
         * @method onBeforeLeft
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
         * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } individualObject
         * @param { boolean } false
         * @param { number } rightDataLength
         */
        onBeforeLeftVal = this.component.executeMethod('onBeforeLeft', this.getData('ltPropLeftData'), this.getData('ltPropRightData'), obj , false , this.getData('ltPropRightData').length);
      }
      if(onBeforeLeftVal !== false){
        Lyte.arrayUtils(this.getData('ltPropRightData') , 'removeObjects' , obj)
        Lyte.arrayUtils(this.getData('ltPropLeftData')  , 'push' , obj)
        /**
         * @method onMoveLeft
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
        * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } individualObject
         * @param { boolean } false
         * @param { number } rightDataLength
         */
        this.component.executeMethod('onMoveLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), obj , false , this.getData('ltPropRightData').length)
      }
    }


    /**
     * @utility keyboardEvents
     * @version 1.0.0
     * @param { object } event
     */
    this.$node.keyboardEvents = function(event){
      switch (event.keyCode) {
        case 9:

        th.clearAllActive();

        break;
        case 37:
        // Left keydown
        if(event.shiftKey){
          $L(lB).find('.lyteLBTNavBtn').addClass('lyteDLBDisabledToolbar')
          th.mELFN();
          if (th.getData('ltPropSortable') && !(th.getData('useSelf'))) {
            th.dragDropFun();
          }
        }
        break;

        case 38:
        // Up keydown
        if(!th.getData('firstUpDownClick')){
          th.updateDomIndex()
          th.setData('firstUpDownClick' , true)
        }
        if(event.shiftKey){
          th.selectElementsUp();
          $L(lB).find('.lyteListBoxLeftElement').attr('aria-selected' , false)
          $L(lB).find('.lyteLBLeftActive').attr('aria-selected' , true)
          $L(lB).find('.lyteListBoxRightElement').attr('aria-selected' , false)
          $L(lB).find('.lyteLBRightActive').attr('aria-selected' , true)
        } else {
          th.changeActiveToUp()
        }
        break;

        case 39:
        // Right keydown
        if(event.shiftKey){
          $L(lB).find('.lyteLBTNavBtn').addClass('lyteDLBDisabledToolbar')
          th.mERFN();
          if (th.getData('ltPropSortable') && !(th.getData('useSelf'))) {
            th.dragDropFun();
          }
        }
        break;

        case 40:
        // Bottom keydown
        if(!th.getData('firstUpDownClick')){
          th.updateDomIndex()
          th.setData('firstUpDownClick' , true)
          th.changeActiveToDown()
        }
        if($L(document.activeElement).hasClass('lyteListboxInput')){
          document.activeElement.blur()
          $L(lB).find('.lyteListBoxLeftElement').eq(0).addClass('lyteLBLeftActive lyteLBLeftMoveElement')
          th.setData('activeSide' , 'left')
          $L(lB).find('.lyteListboxleftElementWrap')[0].scrollTop = 0;
          break;
        }
        if($L(document.activeElement).hasClass('lyteListboxRightPanel')&&($L(lB).find('.lyteLBRightActive').length<1)){
          $L(lB).find('.lyteListBoxRightElement').eq(0).addClass('lyteLBRightActive lyteLBRightMoveElement')
          th.setData('activeSide' , 'right')
          break;
        }
        if(event.shiftKey){
          th.selectElementsDown();
          $L(lB).find('.lyteListBoxLeftElement').attr('aria-selected' , false)
          $L(lB).find('.lyteLBLeftActive').attr('aria-selected' , true)
          $L(lB).find('.lyteListBoxRightElement').attr('aria-selected' , false)
          $L(lB).find('.lyteLBRightActive').attr('aria-selected' , true)
        } else {
          th.changeActiveToDown()
        }
        break;

        case 13:
          // if(th.getData('focusActiveBoolean')){
          //   if(document.activeElement === $L(th.$node).find('.lyteListboxLeftPanel')[0]){
          //     th.moveActiveToLeft()
          //   } else if(document.activeElement === $L(th.$node).find('.lyteListboxRightPanel')[0]){
          //     th.moveActiveToRight()
          //   }
          // }
          if($L(document.activeElement).hasClass('lyteLBToolbarItems')){
            $L(document.activeElement).click()
          }
        break;
      }
    }

    if (this.getData('ltPropShortcut')) {
        _lyteUiUtils.addEventListenerGlobal('keydown' , this.$node.keyboardEvents)
    }

    /**
     * @utility clearAllActive
     * @version 1.0.0
     * @param { object } event
     */
    this.$node.clearAllActive = function(event){
      if($L(event.target).closest('lyte-dual-listbox').length < 1){
        $L(lB).find('.lyteLBTNavBtn').addClass('lyteDLBDisabledToolbar')
        th.clearAllActive();
      }
    }

    _lyteUiUtils.addEventListenerGlobal('click' , this.$node.clearAllActive)

    /**
     * @utility pinElement
     * @version 1.0.0
     * @param { object } selectedData
     * @param { number } selectedIndex
     * @param { boolean } pin|unpin
     */
    this.$node.pinElement = function(elem , index , pin){
      if(!this.getData('ltPropHasPinOption')){
        if($L(elem).hasClass('lyteListBoxRightWrap')){
          if(pin){
            $L(this).find('.lyteListBoxRightWrap').eq(index).addClass(this.getData('ltPropIgnoreSorting'))
          } else {
            $L(this).find('.lyteListBoxRightWrap').eq(index).removeClass(this.getData('ltPropIgnoreSorting'))
          }
          var ind = parseInt($L(elem).find('.lyteListBoxRightElement').attr('index'))
          var obj = Lyte.arrayUtils(this.getData('ltPropRightData') , 'removeAt' , ind , 1)
          Lyte.arrayUtils(this.getData('ltPropRightData') , 'insertAt' , index , obj[0])
        } else if($L(elem).hasClass('lyteListBoxLeftWrap')){
          if(pin){
            $L(this).find('.lyteListBoxLeftWrap').eq(index).addClass(this.getData('ltPropIgnoreSorting'))
          } else {
            $L(this).find('.lyteListBoxLeftWrap').eq(index).removeClass(this.getData('ltPropIgnoreSorting'))
          }
          var ind = parseInt($L(elem).find('.lyteListBoxLeftElement').attr('index'))
          var obj = Lyte.arrayUtils(this.getData('ltPropLeftData') , 'removeAt' , ind , 1)
          Lyte.arrayUtils(this.getData('ltPropLeftData') , 'insertAt' , index , obj[0])
        }
      } else {
        if($L(elem).hasClass('lyteListBoxRightWrap')){
          if(pin){
            // $L(this).find('.lyteListBoxRightWrap').eq(index).addClass(this.getData('ltPropIgnoreSorting'))
            var ind = parseInt($L(elem).find('.lyteListBoxRightElement').attr('index'))
            var obj = Lyte.arrayUtils(this.getData('ltPropRightData') , 'removeAt' , ind , 1)
            Lyte.arrayUtils(this.getData('ltPropPinnedData') , 'push' , obj)
          } else {
            // $L(this).find('.lyteListBoxRightWrap').eq(index).removeClass(this.getData('ltPropIgnoreSorting'))
            var ind = parseInt($L(elem).find('.lyteListBoxRightElement').attr('index'))
            var obj = Lyte.arrayUtils(this.getData('ltPropPinnedData') , 'removeAt' , ind , 1)
            Lyte.arrayUtils(this.getData('ltPropRightData') , 'insertAt' , index , obj)
            // Lyte.arrayUtils(this.getData('ltPropRightData') , 'push' , obj)
          }
          var _this=this
          setTimeout(function(){
            _this.component.dragDropFun();
          },0)
        }
      }
      this.component.updateDomIndex()
    }

    /**
     * @utility resetListbox
     * @version 1.0.0
     */
    this.$node.resetListbox = function(){
      this.component.clearAllActive()
      this.setData('selectedIndexLeft', [])
      this.setData('selectedIndexRight', [])
    }

  },


  dragDropFun: function() {

    if($L(this.$node).find('.lyteSortableParent')[0]){
      $L(this.$node).find(".lyteListboxSortablePanels", this.$node).sortable('destroy');
    }

      var lB = this.$node

      var thisConnectedWith = $L(this.$node).find(".lyteListboxSortablePanels")
      // var childrenList = $L(this.$node).find('.lyteLBLeftChildWrap')

      var dragElemDim;
      var mouseDownDim;
    var restrictClass = undefined;

    if(this.getData('ltPropRestrictMandatoryElement')){
      restrictClass = ".lyteLBMandateParent"
    } 
    if(this.getData('ltPropIgnoreSorting').length > 0){
      if(this.getData('ltPropRestrictMandatoryElement')){
        if(this.getData('ltPropAllowMandateSortable')){
          restrictClass = "." + this.getData('ltPropIgnoreSorting')
        } else {
          restrictClass = ".lyteLBMandateParent,." + this.getData('ltPropIgnoreSorting')
        }
      } else {
        restrictClass = "."+this.getData('ltPropIgnoreSorting')
      }
    }

      var sortableObject = {
          multiSortable: true,
          cancelRemove : true,
      threshold : 3,
          cancel: ".lyteListBoxSearch,.lyteLBoxDisabledParent,.lyteLBDisabledElement .lyteListBoxLeftWrap .lyteListBoxNoResultsFound,.lyteLBDisabledElement,input, .lyteListBoxNoResultsFound",
          appendTo : "BODY",
      restrict : restrictClass,
          helper: function(ele) {

        var element = document.createElement("DIV");
              element.setAttribute('class', 'lyteLBDragElement')
        return element

          },
    

          onDragStart: function(draggableElement, source ,event, origin) {

        var th = $L(origin).closest('lyte-dual-listbox')[0];

        

        if(source.classList.contains('lyteListboxUnpinnedWrapper')){
                    $L(th).find('.lyteListboxPinnedWrapper').sortable('disableDroppable')
                }
                if(source.classList.contains('lyteListboxPinnedWrapper') ){
                    $L(th).find('.lyteListboxUnpinnedWrapper').sortable('disableDroppable')
                    $L(th).find('.lyteListboxleftElementWrap').sortable('disableDroppable')
                }
                if(source.classList.contains('lyteListboxleftElementWrap')){
                    $L(th).find('.lyteListboxPinnedWrapper').sortable('disableDroppable')
                }

        if(!$L(origin).find('.lyteListBoxLeftElement').hasClass('lyteLBLeftActive') && !event.shiftKey){
          $L('.lyteLBLeftActive').removeClass('lyteLBLeftActive lyteLBLeftMoveElement')
          $L(origin).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive lyteLBLeftMoveElement')
        }
        if(!$L(origin).find('.lyteListBoxRightElement').hasClass('lyteLBRightActive') && !event.shiftKey){
          $L('.lyteLBRightActive').removeClass('lyteLBRightActive lyteLBRightMoveElement')
          $L(origin).find('.lyteListBoxRightElement').addClass('lyteLBRightActive lyteLBRightMoveElement')
        }

              if((($L(origin).hasClass('lyteListBoxLeftWrap'))) && (!$L(origin).find('.lyteListBoxLeftElement').hasClass('lyteLBLeftActive')) && (!$L(th).find('.lyteLBLeftActive').length)){
                  $L(origin).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive lyteLBLeftMoveElement')
                  $L(lB)[0].setData('activeSide' , 'left')
              }
              if(($L(origin).hasClass('lyteListBoxRightWrap'))&&(!$L(origin).find('.lyteListBoxRightElement').hasClass('lyteLBRightActive')) && (!$L(th).find('.lyteLBRightActive').length)){
                  $L(origin).find('.lyteListBoxRightElement').addClass('lyteLBRightActive lyteLBRightMoveElement')
                  $L(lB)[0].setData('activeSide' , 'right')
              }

              var eleHeight = origin.getBoundingClientRect().height
              var eleTotalLen
              var allActive
              var currentActive
              var activeString

              if ($L(origin).hasClass('lyteListBoxRightWrap')) {
                  activeString = ".lyteLBRightActive"
                  allActive = $L(th).find('.lyteLBRightActive').toArray();
                  currentActive = $L(origin).find('.lyteLBRightActive')
              } else if ($L(origin).hasClass('lyteListBoxLeftWrap')) {
                  activeString = ".lyteLBLeftActive"
                  allActive = $L(th).find('.lyteLBLeftActive').toArray();
                  currentActive = $L(origin).find('.lyteLBLeftActive')
              }

              if (currentActive && currentActive.length > 0) {
                  var index = allActive.indexOf(currentActive[0])
                  var i = index
                  if (allActive.length > 5) {
                      var startInd = i - 2
                      if (allActive.length / 2 > 0) {
                          i += 1
                      }
                      var endInd = i + 2

                      if (startInd < 0) {
                          endInd = endInd + (-1 * startInd)
                          startInd = 0
                      }
                      if (endInd > allActive.length - 1) {
                          startInd = index - (endInd - (allActive.length - 2))
                          endInd = allActive.length
                      }

                      for (var i = startInd; i <= index - 1; i++) {
                          if ($L(th).find(activeString)[i]) {
                              var e = $L(th).find(activeString)[i].cloneNode(true)
                              $L(e).addClass('lyteLBdragClone')
                              draggableElement.appendChild(e)
                          }
                      }
                      var currentClone = currentActive[0].cloneNode(true)
                      $L(currentClone).addClass('lyteLBdragClone')
                      draggableElement.appendChild(currentClone)
                      for (var i = index + 1; i < endInd; i++) {
                          if ($L(th).find(activeString)[i]) {
                              var e = $L(th).find(activeString)[i].cloneNode(true)
                              $L(e).addClass('lyteLBdragClone')
                              draggableElement.appendChild(e)
                          }
                      }


                  } else {
                      for (var i = 0; i <= index - 1; i++) {
                          if ($L(th).find(activeString)[i]) {
                              var e = $L(th).find(activeString)[i].cloneNode(true)
                              $L(e).addClass('lyteLBdragClone')
                              draggableElement.appendChild(e)
                          }
                      }
                      var currentClone = currentActive[0].cloneNode(true)
                      $L(currentClone).addClass('lyteLBdragClone')
                      draggableElement.appendChild(currentClone)
                      for (var i = index + 1; i < allActive.length; i++) {
                          if ($L(th).find(activeString)[i]) {
                              var e = $L(th).find(activeString)[i].cloneNode(true)
                              $L(e).addClass('lyteLBdragClone')
                              draggableElement.appendChild(e)
                          }
                      }
                  }
              }

              $L(draggableElement)[0].style.height = eleHeight * (endInd - startInd) + "px"

              var currentHoldElem = origin
              var ind = 0
              if($L(th).find('.lyteLBLeftActive').length <= 0){
                  ind = $L(th).find('.lyteLBRightActive').length - 5 - $L(th).find('.lyteLBdragClone').length
              } else {
                  ind = $L(th).find('.lyteLBLeftActive').length - 5 - $L(th).find('.lyteLBdragClone').length
              }
              $L(th)[0].component.setData('moreLBElements', true)
              // var element = $L('.lyteLBDragElement')[0]
              $L(th).find('.lyteListboxBadge')[0].component.setData('ltPropData', ind)
              var badge = $L(th).find('.lyteListboxBadge')[0].cloneNode(true);
              badge.style.display = "block";
              draggableElement.style.position = "relative";
              if (ind > 0) {
                  draggableElement.appendChild(badge)
              }

              if(!dragElemDim){
                  dragElemDim = currentHoldElem.getBoundingClientRect()
                  mouseDownDim = event.clientY
              }
              if($L(th).find('.lyteLBLeftActive').length <= 0){
          if(!th.getData('ltPropKeepOriginal')){
            $L(th).find('.lyteLBRightActive').css({'display' : 'none'})
          }
              } else {
          if(!th.getData('ltPropKeepOriginal')){
            $L(th).find('.lyteLBLeftActive').css({'display' : 'none'})
          }
                  $L(th).find('.lyteListBoxLeftElement').css({'pointer-event' : 'none'})
              }
        if(th.getData('ltPropKeepOriginal')){
          draggableElement.style.opacity = '0.8';
        }
        th.setData('dragHasStarted' , true);

      this.setTopForDraggableElem(draggableElement , dragElemDim,mouseDownDim,event)
          }.bind(this),
          onEnter: function(event, object) {

        var th = $L(object.sortable).closest('lyte-dual-listbox')[0]

              if($L(object.sortable).hasClass('lyteListboxleftElementWrap')){
                  $L('.lyteLBDragElement.lyteSortablePlaceholder')[0].style.display = "none"
          if(th.component.getData('noResultsFound')){
            th.component.clearSearch();
          }
          if(!th.getData('noResultsFoundRight') && !((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) > 0)){
            th.setData('noResultsFoundRight' , true)
          }
              } else {
                  $L('.lyteLBDragElement.lyteSortablePlaceholder')[0].style.display = ""
                  if(th.getData('noResultsFoundRight')){
                    th.setData('noResultsFoundRight' , false)
                  }
              }
              if (($L(object.sortable).hasClass('lyteListboxleftElementWrap')) && (!$L(object.element._origin).hasClass('lyteListBoxLeftWrap'))) {
                  if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
                      $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
                  }
                  var leftPanelDropZone = document.createElement('DIV');
                  var leftPanelDropZoneBorder = document.createElement('DIV');
                  leftPanelDropZone.appendChild(leftPanelDropZoneBorder);
                  object.sortable.appendChild(leftPanelDropZone)
                  leftPanelDropZone.style.width = object.sortable.getBoundingClientRect().width + "px";
              } else {
                  if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
                      $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
                  }
              }
          },
          onMultiSelectDrag: function(cElem, evt, placeholder, pParent) {
        // if((Math.abs(lB.getData('initialClientX') - evt.clientX) > 3) || (Math.abs(lB.getData('initialClientY') - evt.clientY) > 3)){
          this.setTopForDraggableElem(cElem , dragElemDim,mouseDownDim,evt)
                var dragElemPlaceHolder = $L('.lyteLBDragElement.lyteSortablePlaceholder')[0]
                  if($L(placeholder).closest('.lyteListboxSortablePanels').hasClass('lyteListboxleftElementWrap')){
                      $L('.lyteLBDragElement.lyteSortablePlaceholder')[0].style.display = "none"
                  } else {
                      $L('.lyteLBDragElement.lyteSortablePlaceholder')[0].style.display = ""
                  }
        // }
          }.bind(this),
          onBeforeDrop: function(droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination) {

        var rightObj = {}
        if(source === destination){
          if($L(source).hasClass('lyteListboxPinnedWrapper')){
            rightObj = $L(source).closest('lyte-dual-listbox')[0].getData().ltPropPinnedData[parseInt(fromIndex)]
          } else {
            rightObj = $L(source).closest('lyte-dual-listbox')[0].getData().ltPropRightData[parseInt(fromIndex)]
          }
        } 

        var onBeforeDropFun = $L(source).closest('lyte-dual-listbox')[0].component.executeMethod('onBeforeDrop', source, destination , toIndex , rightObj)

        if(onBeforeDropFun !== false){

          if(source.classList.contains('lyteListboxUnpinnedWrapper')){
            $L('.lyteListboxPinnedWrapper').sortable('enableDroppable')
          }
          if(source.classList.contains('lyteListboxPinnedWrapper')){
            $L('.lyteListboxUnpinnedWrapper').sortable('enableDroppable')
            $L('.lyteListboxleftElementWrap').sortable('enableDroppable')
          }
          if(source.classList.contains('lyteListboxleftElementWrap')){
            $L('.lyteListboxPinnedWrapper').sortable('enableDroppable')
          }
        
          // $L(source).closest('lyte-dual-listbox')[0].component.executeMethod('onBeforeDrop', source, destination , toIndex)
          var th = $L(source).closest('lyte-dual-listbox')[0];
          if(th.getData('ltPropPinnedData')){
            if($L(source).hasClass('lyteListboxPinnedWrapper')){
              $L($L(th).find('.lyteListboxUnpinnedWrapper')[0]).sortable( "enableDroppable" );
            }
          }
          th.component.setData('dragHasStarted' , false);
          $L(th).find('.lyteListBoxLeftElement').css({'pointer-event' : ''})
          if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
            $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
          }
          var elementData;
        
          if (
            (($L(source).hasClass('lyteListboxleftElementWrap')) || ($L(source).hasClass('lyteLBLeftChildWrap'))) &&
            ($L(destination).hasClass('lyteListboxRightPanel') || ($L(destination).hasClass('lyteListboxPinnedWrapper') || $L(destination).hasClass('lyteListboxUnpinnedWrapper')))
          ) {
            th.component.setData('insertAtRightInd', toIndex)
            th.component.mERFN(undefined , true , toIndex);
            th.component.setData('insertAtRightInd', th.component.getData('ltPropRightData').length)
            $L(th).find('.lyteLBTNavBtn').addClass('lyteDLBDisabledToolbar')
            th.setData('dragHasStarted',false);
          }else {
            $L(th).find('.lyteLBLeftActive').css({'display' : ''})
          }
          if (
            ($L(source).hasClass('lyteListboxRightPanel') || ($L(source).hasClass('lyteListboxPinnedWrapper') || $L(source).hasClass('lyteListboxUnpinnedWrapper'))) &&
            (($L(destination).hasClass('lyteListboxleftElementWrap')) || ($L(destination).hasClass('lyteLBLeftChildWrap')))
          ) {
            th.component.setData('insertAtLeftInd', toIndex)
            th.component.mELFN(undefined , true);
            $L(th).find('.lyteLBTNavBtn').addClass('lyteDLBDisabledToolbar')
            th.setData('dragHasStarted',false);
          } else if ((source === destination) && ($L(source).hasClass('lyteListboxRightPanel') || ($L(source).hasClass('lyteListboxPinnedWrapper') || $L(source).hasClass('lyteListboxUnpinnedWrapper')))) {
            if(($L(source).hasClass('lyteListboxPinnedWrapper')) && ($L(destination).hasClass('lyteListboxPinnedWrapper'))){
              $L(source).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
              var actives = th.component.getActiveElements($L(th).find('.lyteLBRightActive'), 'ltPropPinnedData');
              th.component.sESPF($L(th).find('.lyteLBRightActive'), actives, 'ltPropPinnedData', toIndex, '.lyteRightLvl1' , destination);
              $L(th).find('.lyteLBRightActive').css({'display' : ''})
            } else {
              th.component.setData('insertAtLeftInd', toIndex)
              $L(source).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
              var actives = th.component.getActiveElements($L(th).find('.lyteLBRightActive'), 'ltPropRightData');
              th.component.sESPF($L(th).find('.lyteLBRightActive'), actives, 'ltPropRightData', toIndex, '.lyteRightLvl1' , destination);
              $L(th).find('.lyteLBRightActive').css({'display' : ''})
            }
          }
          
          $L(source).closest('lyte-dual-listbox')[0].component.executeMethod('onDrop', source, destination , toIndex)
          if (th.component.getData('ltPropSortable')) {
            th.component.dragDropFun();
          }
        } else {
          $L(th).find('.lyteLBLeftActive').css({'display' : ''})
          $L(th).find('.lyteLBRightActive').css({'display' : ''})
        }
              return false;
          }.bind(this)
      }

    $L(this.$node).find(".lyteListboxSortablePanels", this.$node).sortable(Object.assign({
          connectedWith:  Array.from($L(this.$node).find('.lyteListboxSortablePanels'))
      }, sortableObject));

    

      // $L(this.$node).find(".lyteListboxSortablePanels", this.$node).sortable(Object.assign({
      // 	connectedWith: Array.from(thisConnectedWith)
      // }, sortableObject));

      // var thisConnectedWithChild = []

      // for (var i = 0; i < childrenList.length; i++) {
      // 	thisConnectedWithChild = []

      // 	thisConnectedWithChild.push(childrenList[i]);

      // 	thisConnectedWithChild.push(thisConnectedWith[1]);

      // 	$L(childrenList[i]).sortable(Object.assign({
      // 		connectedWith: Array.from(thisConnectedWithChild)
      // 	}, sortableObject));

      // }


  },

  setTopForDraggableElem : function(cElem,dragElemDim,mouseDownDim,evt){
    var lB = this.$node;
    if($L(lB)[0].getData('activeSide') === "left"){
      var leftActiveElems = $L(lB).find('.lyteLBLeftActive').toArray()
      var totalActiveElems = $L('.lyteLBLeftActive').toArray()
      var currentHoldElem = $L(cElem._origin).find('.lyteListBoxLeftElement')[0]
      var currentHoldIndex = leftActiveElems.indexOf(currentHoldElem)

      var holdElemDomInd = $L(currentHoldElem).attr('dom-index')
      var holdElemInHelper = $L(cElem).find('.lyteLBLeftActive[dom-index="'+holdElemDomInd+'"]')
      var helperActives = $L(cElem).find('.lyteLBLeftActive').toArray()
      var holdElenInd =  helperActives.indexOf(holdElemInHelper[0])

    } else if($L(lB)[0].getData('activeSide') === "right"){

      var rightActiveElems = $L(lB).find('.lyteLBRightActive').toArray()
      var totalActiveElems = $L('.lyteLBRightActive').toArray()
      var currentHoldElem = $L(cElem._origin).find('.lyteListBoxRightElement')[0]
      var currentHoldIndex = rightActiveElems.indexOf(currentHoldElem)

      var holdElemDomInd = $L(currentHoldElem).attr('dom-index')
      var holdElemInHelper = $L(cElem).find('.lyteLBRightActive[dom-index="'+holdElemDomInd+'"]')
      var helperActives = $L(cElem).find('.lyteLBRightActive').toArray()
      var holdElenInd =  helperActives.indexOf(holdElemInHelper[0])

    }

    if(!dragElemDim){
      dragElemDim = currentHoldElem.getBoundingClientRect()
    }

    cElem.style.top = dragElemDim.top - (mouseDownDim - evt.clientY) - (dragElemDim.height * holdElenInd) + "px";

  },

  didConnect: function() {
    if(_lyteUiUtils.isWidget){
      this.setData('useSelf' , true)
    } else {
      this.setData('ltPropYield' , true)
    }
    if( this.getMethods('afterRender') ){
      this.executeMethod('afterRender',this.$node);
    }
    var _this = this
    var th = this
    if ((this.getData('ltPropMaxCount') <= (this.getData('ltPropRightData').length+this.getData('ltPropPinnedData').length)) && (this.getData('ltPropMaxCount') > -1)) {
      $L(this.$node).find('lyte-input')[0].setData('ltPropDisabled' , true)

      $L(this.$node).find('.lyteListboxLeftPanel').addClass('lyteLBDisabledElement')
      $L(this.$node).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')

      $L(this.$node).find('.lyteListboxLeftPanel').attr('lt-prop-title' , this.getData('ltPropTooltipMessage'))
      $L(this.$node).find('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config' ,'{ "position":"followcursor"}')

    }

    if(this.getData('useSelf')){
      $L(this.$node).find('.lyteListboxWrapper').addClass('lyteLBBeta')
    }

    if (th.getData('ltPropSortable') && !(th.getData('useSelf'))) {
        th.dragDropFun();
    }

    if(this.getData('ltPropMinimumRequiredCount') !== -1){
      this.setData('userDefinedMinCount' , true)
    } else {
      this.setData('ltPropMinimumRequiredCount' , 0)
      this.setData('userDefinedMinCount' , false)
    }

    var toolbarItems = this.getData('ltPropToolbarItems')

    for (var i = 0; i < this.getData('ltPropToolbarItems').length; i++) {
      this.setData(toolbarItems[i], true);
    }

    $L(this.$node).find('.lyteLBToolbarItems').addClass('lyteDLBDisabledToolbar')
    // if(this.getData('ltPropShowToolbar')){
      this.toolbardisableaction()
    // }

    if(this.getData('ltPropShowSearch') && this.getData('ltPropLeftData').length<1){
      $L(this.$node).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
      $L(this.$node).find('lyte-input')[0].setData('ltPropDisabled' , true)
    }
    

    this.setData('insertAtLeftInd', this.getData('ltPropLeftData').length)
    this.setData('insertAtRightInd', this.getData('ltPropRightData').length)

    var lB = $L(this)[0].$node;
    var leftPanel = $L(lB).find('.lyteListboxLeftPanel')[0];

    this.updateDomIndex();
    this.handleMinRequired('right')

   

    if(this.getData('useSelf')){
        if(this.getData('ltPropInfiniteScroll')){
          this.checkForInfinteScroll();
        }

        this.initializeLSFRP();
        $L(this.$node).find('.lyteListboxleftElementWrap').listSelection({
          disableUserSelect: true,
          deselectOnExternalClick:true,
          capturingPhase : true,
          selector:'.lyteListBoxLeftWrap',
          toAppendClass:'lyteLBLeftActive',
          toggleSingleSelection:false,
          onSelect : function(node){
            if(node[0] && !$L(node[0]).hasClass('lyteLBDisabledElement')){
              var _this = $L(node).closest('lyte-dual-listbox')[0].component
              if($L(node).closest('.lyteListboxLeftPanel')[0]){
                _this.disableButtons()
              }
            }
          },
          onBeforeDeselect : function(node , target){
            if($L(target).hasClass('lyteLBToolbarItems')){
              return false
            }
          },
          onExternalClick : function(node , target){
            if(node){
              var _this = $L(node).closest('lyte-dual-listbox')[0].component
              _this.disableButtons()
            }
          },
          onDeselect:function(node){
            // if(node[0]){
            //   var _this = $L(node).closest('lyte-dual-listbox')[0].component
            //   _this.disableButtons()
            // }
          }
        })
        
        if(this.getData('ltPropSortable')){
          this.$node.addEventListener('mousedown' , this.mouseDownFunction , true);
        }
    }

    

    // this.setData('doNotAnimate' , false)
    // if(($L(this.$node).find('.lyteListBoxRequiredParent').length > 0) && ($L(this.$node).find('.lyteListBoxRequiredParent').length <= this.getData('ltPropMinimumRequiredCount'))){
    //   $L(this.$node).find('.lyteListBoxRequiredParent').slice(0,this.getData('ltPropMinimumRequiredCount')).addClass('lyteLBPreventDrag')
    // }
  },

  initiateInfiniteScroll: function() { 
    if(this.getData('enableInfiniteScroll')){
      this.setData('ltPropSortable' , false);
      $L(this.$node).find('.lyteListboxRightPanel').infiniteScroll({
          dataArray: this.data.ltPropRightData,
          populateObject: this.data.infiniteScrollPopulateData,
          displayElem: this.data.ltPropInfiniteScrollElementCount,
          nonTable: true,
          disableInitialRendering : true,
          rowSelector: ".lyteListBoxRightWrap"
      })
    }
  },

  checkForInfinteScroll: function () { 
    if (this.data.ltPropInfiniteScroll && this.data.ltPropRightData.length >= this.data.ltPropInfiniteScrollElementCount && !this.getData("enableInfiniteScroll")) {
      this.setData("enableInfiniteScroll", true);
      this.initiateInfiniteScroll()
    } else if (!this.data.ltPropInfiniteScroll || this.data.ltPropRightData.length <= this.data.ltPropInfiniteScrollElementCount){ 
      this.setData("enableInfiniteScroll", false);
    }
  },

  initializeLSFRP: function () { // initialize listSelection for Right Panel
    $L(this.$node).find('.lyteListboxRightPanel').listSelection({
      pinnedWrapper : '.lyteListboxPinnedWrapper',
      selector:'.lyteListBoxRightWrap',
      deselectOnExternalClick : true,
      toAppendClass:'lyteLBRightActive',
      capturingPhase : true,
      toggleSingleSelection:false,
      onSelect : function(node){
        if(node[0]){
          var _this = $L(node).closest('lyte-dual-listbox')[0].component
          if($L(node).closest('.lyteListboxUnpinnedWrapper')[0]){
            _this.disableButtons()
          } else if($L(node).closest('.lyteListboxPinnedWrapper')[0]){
            _this.disableButtons()
          }
        }
      },
      onBeforeDeselect : function(node , target){
        if($L(target).hasClass('lyteLBToolbarItems')){
          return false
        }
        if(node[0]){
          var _this = $L(node).closest('lyte-dual-listbox')[0].component;
          if(_this.getData('elementsShiftingSamePanel')){
            _this.setData('elementsShiftingSamePanel' , false)
            return false
          }
        }
      },
      onExternalClick : function(node , target){
        if(node){
          var _this = $L(node).closest('lyte-dual-listbox')[0].component
          _this.disableButtons()
        }
      },
      onDeselect:function(node){
        // if(node[0]){
        //   var _this = $L(node).closest('lyte-dual-listbox')[0].component
        //   _this.disableButtons()
        // }
      }
    })
  },

  reInitializeLSFRP: function () {  // reinitialize listSelection for Right Panel
    $L(this.$node).find('.lyteListboxRightPanel').listSelection("destroy");
    this.initializeLSFRP();
  },

  mouseDownFunction : function(event){

    var _this = $L(event.target).closest('lyte-dual-listbox')[0].component

    if($L(event.target).closest('.lyteListBoxLeftWrap').hasClass('lyteLBDisabledElement')){
      return
    }

    if($L(event.target).closest('.lyteListboxPinnedWrapper')[0]){
      _this.setData('draggedSource' , 'lyteListboxPinnedWrapper')
    } else if($L(event.target).closest('.lyteListboxUnpinnedWrapper')[0]){
      _this.setData('draggedSource' , 'lyteListboxUnpinnedWrapper')
    } else if($L(event.target).closest('.lyteListboxleftElementWrap')[0]){
      _this.setData('draggedSource' , 'lyteListboxleftElementWrap')
    }

    if($L(event.target).closest('.lyteListBoxRightWrap')[0] || $L(event.target).closest('.lyteListBoxLeftWrap')[0]){

      var _thisNode = $L(event.target).closest('lyte-dual-listbox')[0]
      $L(event.target).closest('lyte-dual-listbox').addClass('lyteDLBDragRunning')

      if($L(event.target).closest('.lyteListBoxRightWrap')[0] && $L(event.target).closest('.lyteListBoxRightWrap').hasClass('lyteLBRightActive')){

        if($L(_this.$node).find('.lyteLBRightActive').length > 0 && !$L(event.target).closest('.lyteListBoxRightWrap').hasClass('lyteLBRightActive')){
          if(!event.metaKey && !event.shiftKey){
            $L(_this.$node).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(event.target).closest('.lyteListBoxRightWrap').addClass('lyteLBRightActive')
          }
        }

        var activeElements = $L(_thisNode).find('.lyteLBRightActive')
        var dim = $L(event.target).closest('.lyteListBoxRightWrap')[0].getBoundingClientRect()

        if(activeElements.length < 1 ){
          $L(event.target).closest('.lyteListBoxRightWrap').eq(0).addClass('lyteLBRightActive')
        }

        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'width' , dim.width)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'height' , dim.height)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'left' , dim.left)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'right' , dim.right)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'top' , dim.top)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'bottom' , dim.bottom)


        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'prevHeight' , 0)

        if( activeElements[0] && (activeElements[0] !== $L(event.target).closest('.lyteLBRightActive')[0])){
          Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'prevHeight' , dim.height*activeElements.indexOf($L(event.target).closest('.lyteLBRightActive')[0]))
        }

        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'clientX' , event.clientX)
        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'clientY' , event.clientY)

        if(this.getData('ltPropHasPinOption') && this.getData('ltPropPinnedData') && this.getData('ltPropPinnedData').length > 1){
          document.addEventListener('mousemove' , _this.mouseMoveFunction)
          document.addEventListener('mouseup' , _this.mouseLeaveFunction)
        } else if($L(event.target).closest('.lyteListboxUnpinnedWrapper')[0]){
          document.addEventListener('mousemove' , _this.mouseMoveFunction)
          document.addEventListener('mouseup' , _this.mouseLeaveFunction)
        }

      } else if($L(event.target).closest('.lyteListBoxLeftWrap')[0] && $L(event.target).closest('.lyteListBoxLeftWrap').hasClass('lyteLBLeftActive') ){

        if($L(_this.$node).find('.lyteLBLeftActive').length > 0 && !$L(event.target).closest('.lyteListBoxLeftWrap').hasClass('lyteLBLeftActive')){
          if(!event.metaKey && !event.shiftKey){
            $L(_this.$node).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            $L(event.target).closest('.lyteListBoxLeftWrap').addClass('lyteLBLeftActive')
          }
        }

        var activeElements = $L(_thisNode).find('.lyteLBLeftActive')
        var dim = $L(event.target).closest('.lyteListBoxLeftWrap')[0].getBoundingClientRect()

        if(activeElements.length < 1 ){
          $L(event.target).closest('.lyteListBoxLeftWrap').eq(0).addClass('lyteLBLeftActive')
        }
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'width' , dim.width)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'height' , dim.height)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'left' , dim.left)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'right' , dim.right)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'top' , dim.top)
        Lyte.objectUtils(this.getData('draggedElemDim') , 'add' , 'bottom' , dim.bottom)

        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'prevHeight' , 0)

        if( activeElements[0] && (activeElements[0] !== $L(event.target).closest('.lyteLBLeftActive')[0])){
          Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'prevHeight' , dim.height*activeElements.indexOf($L(event.target).closest('.lyteLBLeftActive')[0]))
        }

        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'clientX' , event.clientX)
        Lyte.objectUtils(this.getData('initialMouseDownVals') , 'add' , 'clientY' , event.clientY)


        document.addEventListener('mousemove' , _this.mouseMoveFunction)
        document.addEventListener('mouseup' , _this.mouseLeaveFunction)
        
      }

    }
  },

  mouseMoveFunction : function(event){
    var _this = $L('.lyteDLBDragRunning')[0].component
    _this.setData('showLeftpanelPlaceholder' , false)  
    if(
      (Math.abs(_this.getData('initialMouseDownVals').clientX - event.clientX) > 5) ||
      (Math.abs(_this.getData('initialMouseDownVals').clientY - event.clientY) > 5)) {
        _this.setData('dragHasStarted' , true) 

        var activeClass = ''
        var childElementsClass = ''
        if(_this.getData('draggedSource') === 'lyteListboxleftElementWrap'){
          activeClass = '.lyteLBLeftActive'
          childElementsClass = '.lyteListBoxLeftWrap'
        } else if(
          (_this.getData('draggedSource') === 'lyteListboxPinnedWrapper') ||
          (_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper') ||
          (_this.getData('draggedSource') === 'lyteListboxRightPanel')
        ){
          activeClass = '.lyteLBRightActive'
          childElementsClass = '.lyteListBoxRightWrap'
        }

        var appendParentNode = '.'+_this.getData('draggedSource')
        var lbRightPanel = $L(_this.$node).find(appendParentNode)[0]
        var currentActiveElement = $L(_this.$node).find(activeClass)
        

        if(!$L('.lyteLBDraggedElem')[0]){
          if($L(_this.$node).find(activeClass).length < 2){
            var draggedWrapper = document.createElement('DIV');
            var draggedElement = currentActiveElement[0].cloneNode(true)
            draggedWrapper.appendChild(draggedElement)
            _lyteUiUtils.appendChild( document.body, draggedWrapper )
            // document.body.appendChild(draggedWrapper)
            $L(draggedWrapper).addClass('lyteLBDraggedElem')
          } else if($L(_this.$node).find(activeClass).length > 1){
            var draggedWrapper = document.createElement('DIV');
            currentActiveElement.map(function(index , node){
              draggedWrapper.appendChild(node.cloneNode(true));
            })
            _lyteUiUtils.appendChild( document.body, draggedWrapper )
            // document.body.appendChild(draggedWrapper)
            $L(draggedWrapper).addClass('lyteLBDraggedElem')
          }
        }

        var currentDraggedElem = $L('.lyteLBDraggedElem')[0]

        currentDraggedElem.style.width = _this.getData('draggedElemDim').width + 'px'
        currentDraggedElem.style.height = _this.getData('draggedElemDim').height + 'px'
        currentDraggedElem.style.top = _this.getData('draggedElemDim').top + (event.clientY - _this.getData('initialMouseDownVals').clientY) - _this.getData('initialMouseDownVals').prevHeight + "px"
        currentDraggedElem.style.left = _this.getData('draggedElemDim').left + (event.clientX - _this.getData('initialMouseDownVals').clientX) + "px"

        if(_this.getData('draggedSource') === 'lyteListboxleftElementWrap'){
          var wrap
          if(_this.getData('ltPropHasPinOption')){
            wrap = '.lyteListboxUnpinnedWrapper'
          } else {
            wrap = '.lyteListboxRightPanel'
          }
          if($L(event.target).closest(wrap)[0]){
            lbRightPanel = $L(_this.$node).find(wrap)[0]
            var targetElem = $L(event.target).closest('.lyteListBoxRightWrap')[0]
            if(!$L(_this.$node).find('.lyteLBPlaceHolder')[0]){

              var placeHolder = document.createElement('DIV');
              lbRightPanel.insertBefore(placeHolder ,  targetElem)
              $L(placeHolder).addClass('lyteLBPlaceHolder')
              placeHolder.style.width = _this.getData('draggedElemDim').width + 'px'
              placeHolder.style.height = (_this.getData('draggedElemDim').height * $L(currentDraggedElem).find(childElementsClass).length) + 'px'
    
            }
            if(!$L(event.target).hasClass('lyteLBPlaceHolder') && targetElem){
              var placeHolder = $L(_this.$node).find('.lyteLBPlaceHolder')[0]
              if($L(_this.$node).find('.lyteListboxUnpinnedWrapper').eq(0).find('.lyteListBoxRightWrap:last-child')[0] === $L(event.target).closest('.lyteListBoxRightWrap')[0]){
                var lastElem = $L(event.target).closest('.lyteListBoxRightWrap')
                var lastElemDim = lastElem[0].getBoundingClientRect()
                if(event.clientY > lastElemDim.top + (lastElemDim.height/2)){
                  _lyteUiUtils.insertAfter(targetElem , placeHolder)
                } else {
                  lbRightPanel.insertBefore(placeHolder ,  targetElem)
                }
              } else {
                lbRightPanel.insertBefore(placeHolder ,  targetElem) 
              }
            }
          } else {
            if($L(_this.$node).find('.lyteLBPlaceHolder')[0]){
              $L(_this.$node).find('.lyteLBPlaceHolder')[0].remove()
            }
          }
        } else if(
          (_this.getData('draggedSource') === 'lyteListboxPinnedWrapper') ||
          (_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper') ||
          (_this.getData('draggedSource') === 'lyteListboxRightPanel')
        ){
          if($L(event.target).closest(appendParentNode)[0]){
            if(!$L(_this.$node).find('.lyteLBPlaceHolder')[0]){
              var placeHolder = document.createElement('DIV');
              lbRightPanel.insertBefore(placeHolder ,  currentActiveElement[0])
              $L(placeHolder).addClass('lyteLBPlaceHolder')
              placeHolder.style.width = _this.getData('draggedElemDim').width + 'px'
              placeHolder.style.height = (_this.getData('draggedElemDim').height * $L(currentDraggedElem).find(childElementsClass).length) + 'px'
              // $L(_this.$node).find('.lyteLBRightActive').addClass('lyteDLBHideActive')
    
            }

            if(!$L(event.target).hasClass('lyteLBPlaceHolder') && $L(event.target).closest('.lyteListBoxRightWrap')[0]){
              var placeHolder = $L(_this.$node).find('.lyteLBPlaceHolder')[0]
              if($L(_this.$node).find('.'+_this.getData('draggedSource')).eq(0).find('.lyteListBoxRightWrap:last-child')[0] === $L(event.target).closest('.lyteListBoxRightWrap')[0]){
                var lastElem = $L(event.target).closest('.lyteListBoxRightWrap')
                var lastElemDim = lastElem[0].getBoundingClientRect()
                if(event.clientY > lastElemDim.top + (lastElemDim.height/2)){
                  _lyteUiUtils.insertAfter($L(event.target).closest('.lyteListBoxRightWrap')[0] , placeHolder)
                } else {
                  lbRightPanel.insertBefore(placeHolder ,  $L(event.target).closest('.lyteListBoxRightWrap')[0])
                }
              } else {
                lbRightPanel.insertBefore(placeHolder ,  $L(event.target).closest('.lyteListBoxRightWrap')[0]) 
              }
            }
          } else {
            if($L(event.target).closest('.lyteListboxLeftPanel')[0] || $L(event.target).hasClass('lyteListBoxLeftWrapPlaceholder')){
              _this.setData('showLeftpanelPlaceholder' , true)
            }
            $L(_this.$node).find('.lyteListboxLeftPanel').addClass('lyteListboxLeftPanelHover')
            if($L(_this.$node).find('.lyteLBPlaceHolder')[0]){
              $L(_this.$node).find('.lyteLBPlaceHolder')[0].remove()
            }
          }
        }
        // if( event.clientY >= )

        // var topTreeDim = topTree[0].getBoundingClientRect()
        // var scrollTree = function(){

        //   if(!treeComponent.getData('scrollTriggered')){
        //     window.cancelAnimationFrame(treeComponent.animation)
        //     treeComponent.setData('stopScroll' , false)
        //     return
        //   }

        //   if(eve.clientY >= (topTreeDim.top + topTreeDim.height)){
        //     topTree[0].scrollTop += treeComponent.getData('ltPropScrollSpeed');
        //     if(topTree[0].scrollTop >= (topTree[0].scrollHeight-topTreeDim.height)){
        //       window.cancelAnimationFrame(treeComponent.animation)
        //       treeComponent.setData('stopScroll' , false)
        //       return
        //     }
        //   } else if (eve.clientY <= (topTreeDim.top)){
        //     topTree[0].scrollTop -= treeComponent.getData('ltPropScrollSpeed');
        //     if(topTree[0].scrollTop <= 0){
        //       window.cancelAnimationFrame(treeComponent.animation)
        //       treeComponent.setData('stopScroll' , false)
        //       return
        //     } 
        //   }
        //   treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(eve))
        // }
        // var rightPanelWrap = $L(lbRightPanel).closest('.lyteListboxRightPanel')[0]
        // if(rightPanelWrap){
        //   var rightPanelDim = rightPanelWrap.getBoundingClientRect()
        //   if(event.clientY >= (rightPanelDim.top + rightPanelDim.height)){
        //     console.log('scroll div to top');
        //     // treeComponent.setData('scrollTriggered' , true)
        //     // treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(event))
        //   } else if (event.clientY <= (rightPanelDim.top)){
        //     console.log('scroll div to bottom');
        //     // treeComponent.setData('scrollTriggered' , true)
        //     // treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(event))
        //   } else if((event.clientY < (rightPanelDim.top + rightPanelDim.height)) && event.clientY > (rightPanelDim.top)){
        //     console.log('stop scroll');
        //     // window.cancelAnimationFrame(treeComponent.animation)
        //     // treeComponent.setData('stopScroll' , true)
        //     // treeComponent.setData('scrollTriggered' , false)
        //   }
        // }
        
        

        // currentActiveElement.addClass('lyteDLBHideActive')

        if(!_this.getData('elementRemoved')&&(_this.getData('draggedSource') !== 'lyteListboxleftElementWrap')){

          _this.removeElements();

          _this.setData('elementRemoved' , true)
        }

    }
  },

  mouseLeaveFunction : function(event){

    var _this = $L('.lyteDLBDragRunning')[0].component
    $L('.lyteDLBDragRunning').removeClass('lyteDLBDragRunning')
    _this.setData('showLeftpanelPlaceholder' , false)

    if($L(event.target).closest('.lyteListboxPinnedWrapper')[0]){
      _this.setData('draggedDestination' , 'lyteListboxPinnedWrapper')
    } else if($L(event.target).closest('.lyteListboxUnpinnedWrapper')[0]){
      _this.setData('draggedDestination' , 'lyteListboxUnpinnedWrapper')
    } else if($L(event.target).closest('.lyteListboxleftElementWrap')[0]){
      _this.setData('draggedDestination' , 'lyteListboxleftElementWrap')
    }
    _this.setData('elementRemoved' , false)

    if(_this.getData('dragHasStarted') && (_this.getData('draggedDestination') !== '')){ 
      var source = $L(_this.$node).find("."+_this.getData('draggedSource'))[0];
      var destination = $L(_this.$node).find("."+_this.getData('draggedDestination'))[0];
      var toIndex = _this.getDropIndex()
      var rightObj = {}

      if(source === destination){
        rightObj = _this.getData('draggedDatas')
      } 
      var onBeforeDropFun = _this.executeMethod('onBeforeDrop', source, destination , toIndex,rightObj)

      if(onBeforeDropFun !== false){
        if(_this.getData('draggedSource') === 'lyteListboxPinnedWrapper'){
          if(_this.getData('draggedDestination') === 'lyteListboxPinnedWrapper'){
            _this.pinnedElementSortable();
          } else if(_this.getData('draggedDestination')=== 'lyteListboxUnpinnedWrapper'){
            _this.putBackInSamePlace('ltPropPinnedData');
          } else if(_this.getData('draggedDestination')=== 'lyteListboxleftElementWrap'){
            _this.putBackInSamePlace('ltPropPinnedData');
          }
        } else {
          if((_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper') && _this.getData('draggedDestination') === 'lyteListboxleftElementWrap'){
            var onBeforeLeftFun = true
            if(_this.getMethods('onBeforeLeft')){
              onBeforeLeftFun = _this.executeMethod('onBeforeLeft',_this.getData('ltPropLeftData'),_this.getData('ltPropRightData'),_this.getData('draggedDatas') , true)
            }
            if(onBeforeLeftFun !== false){
              _this.dropElementsToLeft()
              if((_this.getData('ltPropRightData').length+_this.getData('ltPropPinnedData').length) < _this.getData('ltPropMaxCount')){
                $L(_this.$node).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
                $L(_this.$node).find('lyte-input')[0].setData('ltPropDisabled' , false)
                if($L(_this.$node).find('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config')){
                  $L(_this.$node).find('.lyteListboxLeftPanel').removeAttr('lt-prop-title')
                  $L(_this.$node).find('.lyteListboxLeftPanel').removeAttr('lt-prop-tooltip-config')
                }
              } else {
                $L(_this.$node).find('.lyteListBoxLeftWrap').removeClass('lyteLBDisabledElement')
              }
              if(_this.getMethods('onMoveLeft')){
                _this.executeMethod('onMoveLeft', _this.getData('ltPropLeftData'), _this.getData('ltPropRightData') , _this.getData('draggedDatas') , true)
              }
            } else {
              _this.putBackInSamePlace('ltPropRightData')    
            }
          } else if(  _this.getData('draggedSource') === 'lyteListboxleftElementWrap' &&  (_this.getData('draggedDestination') === 'lyteListboxUnpinnedWrapper')){
            var onBeforeRight = true
            if(_this.getMethods('onBeforeRight')){
              onBeforeRight = _this.executeMethod('onBeforeRight',_this.getData('ltPropLeftData'),_this.getData('ltPropRightData'),_this.getActiveElements($L(_this.$node).find('.lyteLBLeftActive'), 'ltPropLeftData') , true , toIndex)
            }
            if(onBeforeRight !== false){
              _this.removeElements();
              _this.dropElementsToRight()
              if ((_this.getData('ltPropMaxCount') > -1) && ((_this.getData('ltPropRightData').length+_this.getData('ltPropPinnedData').length) >= _this.getData('ltPropMaxCount'))) {
                // $L(lB).find('.lyteListboxLeftPanel').addClass('lyteLeftPanelDisabled')
                $L(_this.$node).find('lyte-input')[0].setData('ltPropDisabled' , true)
                $L(_this.$node).find('.lyteListboxLeftPanel').attr('lt-prop-title' , _this.getData('ltPropTooltipMessage'))
                $L(_this.$node).find('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config' ,'{ "position":"followcursor"}')
                _this.executeMethod('onMaxCountReached', _this.getData('ltPropLeftData'), _this.getData('ltPropRightData'));
                $L(_this.$node).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')
                _this.setData('itemsMaxed' , true);
              }
              if(_this.getMethods('onMoveRight')){
                _this.executeMethod('onMoveRight', _this.getData('ltPropLeftData'), _this.getData('ltPropRightData') , _this.getData('draggedDatas') , true , toIndex)
              }
            }
          } else if((_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper') && _this.getData('draggedDestination') === 'lyteListboxUnpinnedWrapper'){
            _this.sortItemsInRight()
          } else if((_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper') && (_this.getData('draggedDestination') === 'lyteListboxPinnedWrapper')){
            _this.putBackInSamePlace('ltPropRightData')    
          }
        }
        _this.executeMethod('onDrop', source, destination , toIndex)
      } else {
        _this.putBackInSamePlace('ltPropRightData')
      }
      _this.updateInsertIndex();
      var draggedElem = $L('.lyteLBDraggedElem')[0]
      if(draggedElem){
        $L('.lyteLBDraggedElem')[0].remove()
      }

      if($L(_this.$node).find('.lyteDLBHideActive').length > 0){
        $L(_this.$node).find('.lyteDLBHideActive').removeClass('lyteDLBHideActive')
      } 
    
      if($L(_this.$node).find('.lyteLBRightActive')[0]){
        $L(_this.$node).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
      }
      if($L('.lyteLBPlaceHolder')[0]){
        $L('.lyteLBPlaceHolder')[0].remove()
      }
      _this.setData('dragHasStarted' , false)
    } else {
      if(_this.getData('draggedSource') === 'lyteListboxPinnedWrapper'){
        _this.putBackInSamePlace('ltPropPinnedData')
      } else if(_this.getData('draggedSource') === 'lyteListboxUnpinnedWrapper'){
        _this.putBackInSamePlace('ltPropRightData')
      }
      var draggedElem = $L('.lyteLBDraggedElem')[0]
      if(draggedElem){
        $L('.lyteLBDraggedElem')[0].remove()
      }
    }

    

    _this.setData('draggedElemDim' , {})
    _this.setData('initialMouseDownVals' , {})

    _this.setData('draggedSource' , '')
    _this.setData('draggedDestination' , '')

    _this.setData('draggedDatas' , [])
    _this.setData('draggedFromIndex' , [])
    _this.disableButtons()
    document.removeEventListener('mousemove' , _this.mouseMoveFunction)
    document.removeEventListener('mouseup' , _this.mouseLeaveFunction)

  },

  dropElementsToRight : function(){
    var dropIndex = $L(this.$node).find('.lyteLBPlaceHolder').prev().eq(0).find('.lyteListBoxRightElement').attr('index')
    if(!dropIndex){
      dropIndex = 0
    } else {
      dropIndex = parseInt(dropIndex)+1
    }
    Lyte.arrayUtils(this.getData('ltPropRightData') , 'insertAt' , dropIndex , this.getData('draggedDatas'))
  },

  dropElementsToLeft : function(){
    var toMoveDatasObj = this.getData('rightToLeftMoveData')
    if(toMoveDatasObj.mandateData && toMoveDatasObj.mandateData.length > 0){
      // Lyte.arrayUtils(this.getData('ltPropRightData') , 'insertAt' , toMoveDatasObj.mandateData.index , toMoveDatasObj.mandateData.obj)
      Lyte.arrayUtils(this.getData('ltPropRightData') , 'push' , toMoveDatasObj.mandateData)  
      Lyte.arrayUtils(this.getData('draggedDatas') , 'removeObjects' , toMoveDatasObj.mandateData)
    }
    Lyte.arrayUtils(this.getData('ltPropLeftData') , 'push' , toMoveDatasObj.toMoveDatas)
  },

  sortItemsInRight : function(){
    var dropIndex = $L(this.$node).find('.lyteLBPlaceHolder').prev().eq(0).find('.lyteListBoxRightElement').attr('index')
    if(!dropIndex){
      dropIndex = 0
    } else {
      dropIndex = parseInt(dropIndex)+1
    }
    Lyte.arrayUtils(this.getData('ltPropRightData') , 'insertAt' , dropIndex , this.getData('draggedDatas'))
    this.handleMinRequired('right')
  },

  pinnedElementSortable : function(){
    var dropIndex = $L(this.$node).find('.lyteLBPlaceHolder').prev().eq(0).find('.lyteListBoxRightElement').attr('index')
    if(!dropIndex){
      dropIndex = 0
    } else {
      dropIndex = parseInt(dropIndex)+1
    }
    Lyte.arrayUtils(this.getData('ltPropPinnedData') , 'insertAt' , dropIndex , this.getData('draggedDatas'))
  },

  removeElements : function(){
    var draggedDatas;
    switch(this.getData('draggedSource')){
      case 'lyteListboxPinnedWrapper': 
        draggedDatas = this.getActiveElements($L(this.$node).find('.lyteLBRightActive'), 'ltPropPinnedData');
        this.setData('draggedDatas' , draggedDatas)
        for(var i=0;i<draggedDatas.length;i++){
          Lyte.arrayUtils(this.getData('draggedFromIndex') , 'push' , this.getData('ltPropPinnedData').indexOf(draggedDatas[i]))
          Lyte.arrayUtils( this.getData('ltPropPinnedData') , 'removeObjects' , draggedDatas[i]);
        }
      break;
      case 'lyteListboxUnpinnedWrapper':
        draggedDatas = this.getActiveElements($L(this.$node).find('.lyteLBRightActive'), 'ltPropRightData');
        this.setData('rightToLeftMoveData' , this.getSelectedDatas($L(this.$node).find('.lyteLBRightActive')))
        this.setData('draggedDatas' , draggedDatas)
        for(var i=0;i<draggedDatas.length;i++){
          Lyte.arrayUtils(this.getData('draggedFromIndex') , 'push' , this.getData('ltPropRightData').indexOf(draggedDatas[i]))
          Lyte.arrayUtils( this.getData('ltPropRightData') , 'removeObjects' , draggedDatas[i]);
        }
      break;
      case 'lyteListboxleftElementWrap':
        draggedDatas = this.getActiveElements($L(this.$node).find('.lyteLBLeftActive'), 'ltPropLeftData');
        this.setData('draggedDatas' , draggedDatas)
        Lyte.arrayUtils( this.getData('ltPropLeftData') , 'removeObjects' , draggedDatas);
      break;
    }
  },

  putBackInSamePlace : function(data){
    var draggedDatas = this.getData('draggedDatas');
    var draggedIndex = this.getData('draggedFromIndex')
    for(var i=draggedDatas.length-1;i>=0;i--){
      Lyte.arrayUtils(this.getData(data) , 'insertAt' , draggedIndex[i] , draggedDatas[i])
    }
  },

  getDropIndex : function(){
    var dropIndex = $L(this.$node).find('.lyteLBPlaceHolder').prev().eq(0).find('.lyteListBoxRightElement').attr('index')
    if(!dropIndex){
      dropIndex = 0
    } else {
      dropIndex = parseInt(dropIndex)+1
    }
    return dropIndex
  },

  methods: {
    onBeforeDrop: function() {},
    onDrop: function() {},
    onMoveRight: function() {},
    onBeforeLeft: function() {},
    onMoveLeft: function() {},
    onMoveElementUp: function() {},
    onMoveElementDown: function() {},
    onMoveAllRight: function() {},
    onMaxCountReached: function() {},
    onMoveAllLeft: function() {},
    onDeleteElement: function() {},
    onSearch : function(arr ,searchTag, evt){
      if((evt.keyCode !== 16) && (evt.typr !== "keyup") && Object.keys(evt).length > 0){
          $L(this.$node).find('.lyteListBoxElementBg').removeClass('lyteListBoxElementBg');
          this.clearAllActive();
      }
      var lB = this.$node;
      if((arr.length === 0) && ($L(lB).find('.lyteListBoxLeftElement').length > 0)){
        this.setData('noResultsFound' , true)
        this.setData('ariaLiveContent' , this.getData('ltPropNoResultMessage'))
        this.setData('ariaLiveContentBoolean' , true);
        // $L(lB).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
        var th = this;

        setTimeout(function(){
          th.setData('ariaLiveContent' , '')
          th.setData('ariaLiveContentBoolean' , false)
        },1000)
      } else {
        this.setData('noResultsFound' , false)
        // $L(lB).find('.lyteLBTBMoveAllRight').removeClass('lyteDLBDisabledToolbar')
        // $L(arr[0]).closest('.lyteListBoxLeftWrap:not(.lyteListBoxRequiredParent)').addClass('leftShiftElement');
        // $L(arr[0]).closest('.lyteListBoxLeftWrap:not(.lyteListBoxRequiredParent)').find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent)').addClass('lyteLBLeftActive lyteLBLeftMoveElement');
        if(arr.length === $L(lB).find('.lyteListBoxLeftElement').length){
          this.clearAllActive('left')
        }
      }
    }
  },

  clearSearch : function(){
      var lB = this.$node;
        if(this.getData('noResultsFound') && this.getData('ltPropLeftData').length > 0){
          this.setData('noResultsFound' , false)
          if(this.getData('ltPropShowSearch')){
            $L(this.$node).find('.lyteListBoxSearch')[0].setValue('')
          }
        } 
  },

  indexCallback: function(x) {
    return parseInt(x)
  },

  moveElementInView: function(parent, elem) {
    if(elem){
      var parentHeight = parent.getBoundingClientRect().height
      var elemTop = (elem.getBoundingClientRect().top - parent.getBoundingClientRect().top)
      var elemBottom = elemTop + elem.getBoundingClientRect().height


      if (elemBottom > parentHeight) {
        parent.scrollTo({
          top: (parent.scrollTop + (elemBottom - parentHeight)),
          behavior: "smooth"
        });
      }
      if (elemTop < 0) {
        parent.scrollTo({
          top: (parent.scrollTop + elemTop),
          behavior: "smooth"
        });
      }
    }
  },

  moveAllElementsRight: function(th) {
    if(this.getData('useSelf')){
        if(this.getData('enableInfiniteScroll')){
          Lyte.arrayUtils(this.getData('ltPropRightData') , 'push' , this.getData('ltPropLeftData'))
          this.setData('ltPropLeftData', [])
          if (Object.keys(this.data.infiniteScrollPopulateData).length === 0) {
              this.initiateInfiniteScroll();
          } else { 
              $L(this.$node).find('.lyteListboxRightPanel')[0].rePopulate()
          }
          // this.setData('infiniteScrollPopulateData' , {})
        } else {
          var lB = this.$node;
          $L(lB).find('.lyteListBoxLeftWrap:not(.lyteListBoxRequiredParent):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').addClass('lyteLBLeftActive');
          this.mERFN();
          // $L(this.$node).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
          // $L(this.$node).find('.lyteLBTBMoveAllLeft').removeClass('lyteDLBDisabledToolbar')
        }
        this.clearSearch()
        this.checkForInfinteScroll()
        $L(this.$node).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')
        $L(this.$node).find('.lyteLBTBMoveUp').addClass('lyteDLBDisabledToolbar')
        $L(this.$node).find('.lyteLBTBMoveDown').addClass('lyteDLBDisabledToolbar')
    } else {
        this.clearSearch()
        var lB = this.$node;
        // $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent,.lyteSearchHidden)').addClass('lyteLBLeftActive lyteLBLeftMoveElement');
        // $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent,.lyteSearchHidden)').closest('.lyteListBoxLeftWrap:not(.lyteListBoxRequiredParent)').addClass('leftShiftElement');
        $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').addClass('lyteLBLeftActive lyteLBLeftMoveElement');
        $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').closest('.lyteListBoxLeftWrap:not(.lyteListBoxRequiredParent)').addClass('leftShiftElement');
        this.mERFN();
        // $L(this.$node).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
        // $L(this.$node).find('.lyteLBTBMoveAllLeft').removeClass('lyteDLBDisabledToolbar')
        this.dragDropFun();
    }
    this.toolbardisableaction()
  },

  moveAllElementsLeft: function(th) {
    if(this.getData('useSelf')){
        this.clearSearch()
        if(this.getData('enableInfiniteScroll')){
          Lyte.arrayUtils(this.getData('ltPropLeftData') , 'push' , this.getData('ltPropRightData'))
          this.setData('ltPropRightData' , [])
          this.setData('infiniteScrollPopulateData', {})
          this.reInitializeLSFRP();
          $L(this.$node).find('.lyteListboxRightPanel').infiniteScroll("destroy");
          
          
          // $L(this.$node).find('.lyteListboxRightPanel')[0].rePopulate()
    
        } else {
          var lB = this.$node;
          // $L(lB).find('.lyteListBoxRightElement:not(.lyteListBoxRequiredItem):not(.lyteLBMandateItem):not(.lyteLBoxDisabledParent)').addClass('lyteLBRightActive lyteLBRightMoveElement');
          // $L(lB).find('.lyteListBoxRightWrap:not(.lyteListBoxRequiredParent)').addClass('rightShiftElement');
          $L(lB).find('.lyteListBoxRightWrap:not(.lyteListBoxRequiredParent):not(.lyteListBoxRightPinnedWrap):not(.lyteLBMandateParent)').addClass('lyteLBRightActive')
          this.mELFN();
          // $L(this.$node).find('.lyteLBTBMoveAllLeft').addClass('lyteDLBDisabledToolbar')
          // $L(this.$node).find('.lyteLBTBMoveAllRight').removeClass('lyteDLBDisabledToolbar')
        }
        this.checkForInfinteScroll()
        $L(this.$node).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')
        $L(this.$node).find('.lyteLBTBMoveUp').addClass('lyteDLBDisabledToolbar')
        $L(this.$node).find('.lyteLBTBMoveDown').addClass('lyteDLBDisabledToolbar')
    } else {
        this.clearSearch()
        var lB = this.$node;
        $L(lB).find('.lyteListBoxRightElement:not(.lyteListBoxRequiredItem):not(.lyteLBMandateItem):not(.lyteLBoxDisabledParent)').addClass('lyteLBRightActive lyteLBRightMoveElement');
        $L(lB).find('.lyteListBoxRightWrap:not(.lyteListBoxRequiredParent)').addClass('rightShiftElement');
        this.mELFN();
        // $L(this.$node).find('.lyteLBTBMoveAllLeft').addClass('lyteDLBDisabledToolbar')
        // $L(this.$node).find('.lyteLBTBMoveAllRight').removeClass('lyteDLBDisabledToolbar')
        this.dragDropFun();
    }
    this.toolbardisableaction()
  },

  actions : {

    addElementToRight: function(th , eve) {
        if(this.getData('useSelf')){
            this.mERFN();
            if(this.getData('enableInfiniteScroll')){
              $L(this.$node).find('.lyteListboxRightPanel')[0].rePopulate()
            }
            this.checkForInfinteScroll()
        } else {
            var elem = $L(th).closest('.lyteListBoxLeftElement')
            this.selectionFunction(elem[0] , 'byBtn' , eve);
            this.mERFN();
            if (this.getData('ltPropSortable')) {
              this.dragDropFun();
            }
        }
    },

    removeElementFromRight: function(th , eve) {
        this.clearSearch()
        if(this.getData('useSelf')){
            $L(th).closest('.lyteListBoxRightWrap').addClass('lyteLBRightActive')
            this.mELFN();
    
            if(this.getData('enableInfiniteScroll')){
            $L(this.$node).find('.lyteListboxRightPanel')[0].rePopulate()
            }
            this.checkForInfinteScroll()
        } else {
            var elem = $L(th).closest('.lyteListBoxRightElement')
            this.selectionFunction(elem[0] , 'byBtn' , eve);
            this.mELFN();
            if (this.getData('ltPropSortable')) {
            this.dragDropFun();
            }
        }
    },

    elementFN: function(th, ev) {
        if(this.getData('useSelf')){
            if(this.getData('firstUpDownClick')){
                this.setData('firstUpDownClick' , false)
              }
              if(ev.type === "mousedown"){
                if(this.getData('noResultsFound')){
                  this.clearSearch()
                }
                this.setData('initialClientX' , ev.clientX)
                this.setData('initialClientY' , ev.clientY)
              }
        } else {
            if(this.getData('firstUpDownClick')){
                this.setData('firstUpDownClick' , false)
              }
              if(ev.type === "mousedown"){
                if(this.getData('noResultsFound')){
                  this.clearSearch()
                }
                this.setData('initialClientX' , ev.clientX)
                this.setData('initialClientY' , ev.clientY)
                if(ev.shiftKey){
                  this.selectionFunction(th ,'', ev);
                }
              } else if(ev.type ==="mouseup"){
                if(!this.getData('dragHasStarted')){
                  this.selectionFunction(th ,'', ev);
                }
              }
        }     
    },

    moveElementRight: function(th, clickType) {
      if(!$L(th).hasClass('lyteDLBDisabledToolbar') || (clickType === 'doubleClick')){
        if($L(this.$node).find('.lyteLBLeftActive').length >= 1){
          if ((this.getData('ltPropDoubleClick')) || (clickType === 'toolbarClick')) {
            if ($L(th).hasClass('lyteListBoxRequiredItem')) {
              return
            }
            this.mERFN();
            $L(this.$node).find('.lyteLBTBMoveRight').addClass('lyteDLBDisabledToolbar')
            // if($L(this.$node).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent,.lyteSearchHidden)').length < 1){
            if($L(this.$node).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').length < 1){
              this.setData('noResultsFound' , true)
            }
            if (this.getData('ltPropSortable') && !(this.getData('useSelf'))) {
                this.dragDropFun();
            }
          }
        }
      }
    },

    moveElementLeft: function(th, clickType) {
      if(!$L(th).hasClass('lyteDLBDisabledToolbar') || (clickType === 'doubleClick')){
        if($L(this.$node).find('.lyteLBRightActive').length >= 1){
          if ((this.getData('ltPropDoubleClick')) || (clickType === 'toolbarClick')) {
            if ($L(th).hasClass('lyteListBoxRequiredItem') || $L(this.$node).find('.lyteLBRightActive').hasClass('lyteListBoxRequiredParent')) {
              return
            }
            this.mELFN();
            $L(this.$node).find('.lyteLBTBMoveUp').addClass('lyteDLBDisabledToolbar')
            $L(this.$node).find('.lyteLBTBMoveDown').addClass('lyteDLBDisabledToolbar')
            $L(this.$node).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')
            if($L(this.$node).find('.lyteListBoxRightElement').length < 1){
              this.setData('noResultsFoundRight' , true)
            }
            if(this.getData('ltPropSortable') && !(this.getData('useSelf'))) {
                this.dragDropFun();
            }
          }
        }
        this.clearSearch()
      }
    },
    moveElementUp: function(thisBtn) {
      if(this.getData('useSelf')){
        var th = this;
        var lB = th.$node;
        var index;

        var rightClickedElement = $L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').find('.lyteListBoxRightElement')[0];
        var rightEles
        var index;
        var elementData
        var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]

        if ($L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').length === 1) {
            index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
            if (index[0] > 0) {
            elementData = th.getData('ltPropRightData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] - 1, elementData);
            rightEles = $L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteListBoxRightWrap');
            $L(rightEles[index[0] - 1]).addClass('lyteLBRightActive')
            this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
            this.setData('elementsShiftingSamePanel' , true)
            }
        }

        /**
         * @method onMoveElementUp
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
         * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } selectedObject
         */
        th.executeMethod('onMoveElementUp', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), elementData)
      } else {
        var th = this;
        var lB = th.$node;
        var activeElement;
        var elementArr;
        var index;
  
        var leftClickedElement = $L(lB).find('.lyteLBLeftMoveElement')[0];
        var rightClickedElement = $L(lB).find('.lyteLBRightMoveElement')[0];
        var leftEles
        var rightEles
        var index;
        var elementData
        var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]
  
        var lastActiveLeft = this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]
        if (($L(lB).find('.lyteLBLeftActive.lyteLeftLvl1').length === 1) || ($L(lB).find('.lyteLBRightActive.lyteRightLvl1').length === 1)) {
          if (!(th.panelSide(leftClickedElement) === 'left')) {
            index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
            if (index.length > 1) {
              if (index[1] > 0) {
                elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]]
                Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
                Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'insertAt', index[1] - 1, elementData);
                rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
                var rightChildren = $L(rightEles).find('.lyteRightLvl2')
                $L(rightChildren[index[1] - 1]).addClass('lyteLBRightActive')
                $L(rightChildren[index[1] - 1]).addClass('lyteLBRightMoveElement')
              }
            } else {
              if (index[0] > 0) {
                elementData = th.getData('ltPropRightData')[index[0]];
                Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
                Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] - 1, elementData);
                rightEles = $L(lB).find('.lyteRightLvl1');
                $L(rightEles[index[0] - 1]).addClass('lyteLBRightActive')
                $L(rightEles[index[0] - 1]).addClass('lyteLBRightMoveElement')
                this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
              }
            }
          }
        }
  
        th.executeMethod('onMoveElementUp', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), elementData)
  
        if (th.getData('ltPropSortable')) {
          th.dragDropFun();
        }
      }
    },
    moveElementDown: function(thisBtn) {
     if(this.getData('useSelf')){
        var th = this;
        var lB = th.$node;
        var index;
        var rightClickedElement = $L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').find('.lyteListBoxRightElement')[0];
        var rightEles
        var index;
        var elementData
        var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]
  
        if ($L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').length) {
          index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
          rightEles = $L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteListBoxRightWrap');
          if (index[0] < rightEles.length - 1) {
            elementData = th.getData('ltPropRightData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] + 1, elementData);
            rightEles = $L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteListBoxRightWrap');
            $L(rightEles[index[0] + 1]).addClass('lyteLBRightActive')
            this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
            this.setData('elementsShiftingSamePanel' , true)
          }
        }
  
        /**
         * @method onMoveElementDown
         * @author surendran.m@zohocorp.com
         * @version 1.0.0
         * @param { array } ltPropLeftData
         * @param { array } ltPropRightData
         * @param { object } selectedData
         */
        this.executeMethod('onMoveElementDown', this.getData('ltPropLeftData'), this.getData('ltPropRightData'), elementData)
     } else {
        var th = this;
      var lB = th.$node;
      var activeElement;
      var elementArr;
      var index;
      var leftClickedElement = $L(lB).find('.lyteLBLeftMoveElement')[0];
      var rightClickedElement = $L(lB).find('.lyteLBRightMoveElement')[0];
      var leftEles
      var rightEles
      var index;
      var elementData
      var lastActiveLeft = this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]
      var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]

      if (($L(lB).find('.lyteLBLeftActive.lyteLeftLvl1').length === 1) || ($L(lB).find('.lyteLBRightActive.lyteRightLvl1').length === 1)) {

        if (!(th.panelSide(leftClickedElement) === 'left')) {
          index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
          if (index.length > 1) {
            rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
            var rightChildren = $L(rightEles).find('.lyteRightLvl2')
            if (index[1] < rightChildren.length - 1) {
              elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]]
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'insertAt', index[1] + 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
              rightChildren = $L(rightEles).find('.lyteRightLvl2')
              $L(rightChildren[index[1] + 1]).addClass('lyteLBRightActive')
              $L(rightChildren[index[1] + 1]).addClass('lyteLBRightMoveElement')
            }
          } else {
            rightEles = $L(lB).find('.lyteRightLvl1');
            if (index[0] < rightEles.length - 1) {
              elementData = th.getData('ltPropRightData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] + 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1');
              $L(rightEles[index[0] + 1]).addClass('lyteLBRightActive')
              $L(rightEles[index[0] + 1]).addClass('lyteLBRightMoveElement')
              this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
            }
          }
        }
      }

      this.executeMethod('onMoveElementDown', this.getData('ltPropLeftData'), this.getData('ltPropRightData'), elementData)

      if (this.getData('ltPropSortable')) {
        this.dragDropFun();
      }
     }

    },
    moveAllElementsRight: function(th) {
      if(!$L(th).hasClass('lyteDLBDisabledToolbar')){
        this.moveAllElementsRight()
      }
    },
    moveAllElementsLeft: function(th) {
      if(!$L(th).hasClass('lyteDLBDisabledToolbar')){
        this.moveAllElementsLeft()
      }
    },

    deleteElement: function(th) {
      if (!th) {
        th = this;
      }
      var lB = th.$node;
      if ($L(lB).find('.lyteLBLeftActive')[0]) {
        var leftElements = $L(lB).find('.lyteListBoxLeftElement');
        var activeElement = $L(lB).find('.lyteLBLeftActive')

        for (var i = 0; i < activeElement.length; i++) {
          var elementData
          index = activeElement[i].getAttribute('index').split(' ').map(this.indexCallback);
          if ((index.length > 1) || ($L(activeElement[i]).hasClass('lyteListBoxLeftParentElement'))) {
            var childWrap = $L(activeElement[i]).closest('.lyteListBoxLeftWrap').find('.lyteLBLeftChildWrap')
            if (($L(activeElement[i]).hasClass('lyteListBoxLeftParentElement')) && (($L(childWrap[0]).find('.lyteLeftLvl2').length < 1) || ($L(childWrap[0]).find('.lyteLBLeftActive').length === $L(childWrap[0]).find('.lyteLeftLvl2').length))) {
              i += $L(childWrap[0]).find('.lyteLBLeftActive').length
              elementData = th.getData('ltPropLeftData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', index[0], 1);
            }
            if (index.length > 1) {
              elementData = th.getData('ltPropLeftData')[index[0]].childrenList[index[1]];
              Lyte.arrayUtils(th.getData('ltPropLeftData')[index[0]].childrenList, 'removeAt', index[1], 1);
            }
          } else {
            elementData = th.getData('ltPropLeftData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', index[0], 1);
          }
        }

      } else if ($L(lB).find('.lyteLBRightActive')[0]) {
        var rightElements = $L(lB).find('.lyteListBoxRightElement');
        var activeElement = $L(lB).find('.lyteLBRightActive');
        for (var i = 0; i < activeElement.length; i++) {
          var elementData
          index = activeElement[i].getAttribute('index').split(' ').map(this.indexCallback);
          if ((index.length > 1) || ($L(activeElement[i]).hasClass('lyteListBoxRightParentElement'))) {
            var childWrap = $L(activeElement[i]).closest('.lyteListBoxRightWrap').find('.lyteLBRightChildWrap')
            if (($L(activeElement[i]).hasClass('lyteListBoxRightParentElement')) && (($L(childWrap[0]).find('.lyteRightLvl2').length < 1) || ($L(childWrap[0]).find('.lyteLBRightActive').length === $L(childWrap[0]).find('.lyteRightLvl2').length))) {
              i += $L(childWrap[0]).find('.lyteLBRightActive').length
              elementData = th.getData('ltPropRightData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
            }
            if (index.length > 1) {
              elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]];
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
            }
          } else {
            elementData = th.getData('ltPropRightData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
          }

        }
      }



      th.executeMethod('onDeleteElement');

      if (th.getData('ltPropSortable') && !(this.getData('useSelf'))) {
        th.dragDropFun();
      }
    },
    focusPanel : function(th){
      if(document.activeElement === $L(this.$node).find('.lyteListboxLeftPanel')[0]){
        this.setData('ariaLabelledById' , 'lyte_listbox_left_panel')
        this.setData('focusActiveBoolean' , true);
      } else if(document.activeElement === $L(this.$node).find('.lyteListboxRightPanel')[0]){
        this.setData('ariaLabelledById' , 'lyte_listbox_right_panel')
        this.setData('focusActiveBoolean' , true);
      }
    },
    blurPanel : function(th){
      this.setData('ariaLabelledById' , '');
      this.setData('focusActiveBoolean' , false);
    }
  },
  __showToolbar : function(){
    var toolbarItems = this.getData('ltPropToolbarItems')

    for (var i = 0; i < this.getData('ltPropToolbarItems').length; i++) {
      this.setData(toolbarItems[i], true);
    }

    $L(this.$node).find('.lyteLBToolbarItems:not(.lyteLBTBMoveAllRight):not(.lyteLBTBMoveAllLeft)').addClass('lyteDLBDisabledToolbar')
  }.observes('ltPropShowToolbar'),
  toolbardisableaction : function(){

    if( this.getData('ltPropLeftData') && (this.getData('ltPropLeftData').length > 0)){

      if(this.getData('ltPropMaxCount') > -1 && (this.getData('ltPropRightData').length + this.getData('ltPropPinnedData').length + this.getData('ltPropLeftData').length) >= this.getData('ltPropMaxCount') ){
        $L(this.$node).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
      } else {
        $L(this.$node).find('.lyteLBTBMoveAllRight').removeClass('lyteDLBDisabledToolbar')
      }
      if(this.getData('ltPropMaxCount') > -1 && (this.getData('ltPropRightData').length + this.getData('ltPropPinnedData').length) >= this.getData('ltPropMaxCount') ){
        $L(this.$node).find('lyte-input')[0].setData('ltPropDisabled' , true)
      } else {
        $L(this.$node).find('lyte-input')[0].setData('ltPropDisabled' , false)
      }
      this.setData('noResultsFound' , false)
    } else {
      $L(this.$node).find('.lyteLBTBMoveAllRight').addClass('lyteDLBDisabledToolbar')
      $L(this.$node).find('lyte-input')[0].setData('ltPropDisabled' , true)
      this.setData('noResultsFound' , true)
    }

    if( this.getData('ltPropRightData') && (this.getData('ltPropRightData').length + this.getData('ltPropPinnedData').length) > 0){
      this.setData('noResultsFoundRight' , false)
      if(this.getData('ltPropRightData').length > 0){
        $L(this.$node).find('.lyteLBTBMoveAllLeft').removeClass('lyteDLBDisabledToolbar')
        if($L(this.$node).find('.lyteLBMandateItem').length === this.getData('ltPropRightData').length){
          $L(this.$node).find('.lyteLBTBMoveAllLeft').addClass('lyteDLBDisabledToolbar')
        }
      } else {
        $L(this.$node).find('.lyteLBTBMoveAllLeft').addClass('lyteDLBDisabledToolbar')
      }
    } else {
      $L(this.$node).find('.lyteLBTBMoveAllLeft').addClass('lyteDLBDisabledToolbar')
      this.setData('noResultsFoundRight' , true)
    }
  },
  __updateDisableClass : function(){

    // if(this.getData('ltPropShowToolbar')){
      this.toolbardisableaction()
    // }

  }.observes('ltPropLeftData.*','ltPropRightData.*'),

  animateBackgroundManual : function(side,ind , destination){

    var elem;
    var th = this.$node;

    if(side === "left"){
      elem = $L(th).find('.lyteListBoxLeftElement[index="'+ind+'"]')[0]
      $L(elem).addClass('lyteListBoxElementBg')
    } else if(side === "right"){
      if($L(destination)[0]){
        elem = $L(destination).find('.lyteListBoxRightElement[index="'+ind+'"]')[0]
        $L(elem).addClass('lyteListBoxElementBg')
      } else {
        elem = $L(th).find('.lyteListBoxRightElement[index="'+ind+'"]')[0]
        $L(elem).addClass('lyteListBoxElementBg')
      }
    }
    
  },

  selectionFunction: function(th , by , event) {

    var clickedEle = th;
    var lB = this.$node
    var self = this

    this.setData('previousClickedElemDomInd' , parseInt($L(clickedEle).attr('dom-index')))

    if($L(clickedEle).hasClass('lyteListBoxLeftElement') && $L(document.activeElement).hasClass('lyteListboxRightPanel')){
      document.activeElement.blur()
    }

    if(by === 'byBtn'){
      if ($L(clickedEle).hasClass('lyteListBoxLeftParentElement')) {
        $L(clickedEle.parentElement).find('.lyteLeftLvl2').addClass('lyteLBLeftActive')
        return
      }
    }

    if(this.getData('itemsMaxed')){
      return;
    }

    var leftEles = $L(lB).find('.lyteListBoxLeftElement').toArray()
    var rightEles = $L(lB).find('.lyteListBoxRightElement').toArray()
    var wrap = clickedEle.parentElement

    var lastActiveLeft = leftEles[this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]]
    var lastActiveRight = rightEles[this.getData('selectedIndexRight')[this.getData('selectedIndexRight').length - 1]]

    var notDisabled = (clickedEle.getAttribute("index").split(" ").map(this.indexCallback))
    // notDisabled = notDisabled[notDisabled.length-1]

    var isCurrentElementDisabled = false;

    if (
      ($L(clickedEle).closest('.lyteListboxLeftPanel').hasClass('lyteLBoxDisabledParent')) ||
      ($L(clickedEle).closest('.lyteListboxLeftPanel').hasClass('lyteLBDisabledElement')) ||
      ($L(clickedEle).hasClass('lyteLBoxDisabledParent'))
    ) {
      isCurrentElementDisabled = true
    }

    if ((event.shiftKey) && (lastActiveLeft || lastActiveRight)) {

      /*

      * Shift key down and select elements

      */

      var initialElement,initialWrap,initialParentWrap,initialChildren
      var previousElement,previousWrap,previousParentWrap,previousChildren
      var currentElement,currentWrap,currentParentWrap,currentChildren
      var atrStr
      var nextPrevCheck
      var newSelection = true

      function setUpLeftElems(){
        atrStr = "'" + self.getData('leftShiftSelectIndex') + "'";

        initialElement = lastActiveLeft
        initialWrap = $L(initialElement).closest('.lyteListBoxLeftWrap');
        initialParentWrap = $L(initialWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        initialChildren = initialParentWrap.find('.lyteListBoxLeftWrap')

        previousElement = $L(lB).find('.lyteListboxLeftPanel').find("[index*=" + atrStr + "]")[0]
        if(!previousElement){
          previousElement = initialElement
          newSelection = true
        } else {
          newSelection = false
        }
        previousWrap = $L(previousElement).closest('.lyteListBoxLeftWrap');
        if (!previousWrap[0]) {
          previousWrap = initialWrap;
        }
        previousParentWrap = $L(previousWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        previousChildren = previousParentWrap.find('.lyteListBoxLeftWrap')

        currentElement = clickedEle
        currentWrap = $L(currentElement).closest('.lyteListBoxLeftWrap');
        currentParentWrap = $L(currentWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        currentChildren = currentParentWrap.find('.lyteListBoxLeftWrap')

        if($L(currentElement).hasClass('lyteListBoxLeftParentElement')){
          currentChildren = currentWrap.find('.lyteListBoxLeftWrap')
        }
      }

      if (this.panelSide(clickedEle) === "left") {

          setUpLeftElems()

      } else {
        atrStr = "'" + this.getData('rightShiftSelectIndex') + "'";
        previousElement = $L(lB).find('.lyteListboxRightPanel').find("[index*=" + atrStr + "]")[0]
        previousWrap = $L(previousElement).closest('.lyteListBoxRightWrap');
        currentWrap = $L(clickedEle).closest('.lyteListBoxRightWrap');
        initialWrap = $L(lastActiveRight).closest('.lyteListBoxRightWrap');
        wrapArray = $L(lB).find('.lyteListBoxRightWrap')
        if(!previousElement){
          previousWrap = initialWrap
          previousElement = lastActiveRight
        }
      }

      /*

      To get indexes ===================================================================

      */

      function getClickedElemLevel(){
        if($L(clickedEle).hasClass('lyteLeftLvl1')){
          return 'lvl1'
        } else {
          return 'lvl2'
        }
      }

      function getPrevElemLevel(){
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if($L(previousElement).hasClass('lyteLeftLvl1')){
          return 'lvl1'
        } else {
          return 'lvl2'
        }
      }

      function getPrevElemType(){
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if($L(previousElement).hasClass('lyteListBoxLeftParentElement')){
          return 'parent'
        }
        return
      }

      function getClickedElemType(){
        if($L(clickedEle).hasClass('lyteListBoxLeftParentElement')){
          return 'parent'
        }
        return
      }

      function getIniParInd(){
        var iniEL = $L(initialWrap).find('.lyteListBoxLeftElement')[0]
        return parseInt($L(iniEL).attr('index').split(" ")[0]);
      }

      function getIniChildInd(){
        var iniEL = $L(initialWrap).find('.lyteListBoxLeftElement')[0]
        return parseInt($L(iniEL).attr('index').split(" ")[1]);
      }

      function getPreParInd() {
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        return parseInt($L(previousElement).attr('index').split(" ")[0]);
      }

      function getCurParInd() {
        return parseInt($L(clickedEle).attr('index').split(" ")[0]);
      }

      function getPreChildInd() {
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if(!$L(previousElement).attr('index').split(" ")[1]){
          return 0
        }
        return parseInt($L(previousElement).attr('index').split(" ")[1]);
      }

      function getCurChildInd() {
        if (!clickedEle) {
          clickedEle = $L(currentWrap).find('.lyteListBoxLeftElement')[0]
        }
        if(!$L(clickedEle).attr('index').split(" ")[1]){
          return 0
        }
        return parseInt($L(clickedEle).attr('index').split(" ")[1]);
      }

      function getCurLastIndex(){
        if(!currentChildren.length){
          return currentWrap.find('.lyteLeftLvl2Wrap').length-1
        }
        return currentChildren.length-1
      }

      function getPreLastIndex(){
        if(!previousChildren.length){
          return previousWrap.find('.lyteLeftLvl2Wrap').length-1
        }
        return previousChildren.length-1
      }

      /*

      To get indexes ends ===================================================================

      */

      if(clickedEle.getAttribute('index') === previousElement.getAttribute('index')){
        return
      }

      if ($L(clickedEle).hasClass('lyteListBoxLeftElement') && !(clickedEle === lastActiveLeft)) {

        // $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
        $L(lB).find('.leftShiftElement').find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')

        if(getIniParInd() < getCurParInd()){
          /*

          Selection from top to bottom

          */

          if((getIniParInd() > getPreParInd()) && (getCurParInd() > getIniParInd()) ||
             (getIniChildInd() > getPreChildInd()) && (getCurParInd() > getIniParInd())
            ){
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
            previousElement = initialElement
            previousWrap  = initialWrap
            previousParentWrap  = initialParentWrap
            previousChildren  = initialChildren
          }

          if(getPreParInd() < getCurParInd()){
            // console.log('add top to bottom');
            $L(previousWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
            if(getClickedElemLevel() === 'lvl1'){
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentWrap).addClass('leftShiftElement')
                $L(previousParentWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
                $L(currentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).nextUntil(currentWrap,'',true).addClass('leftShiftElement')
              }
              $L(previousWrap).nextUntil(currentWrap,'',true).addClass('leftShiftElement')
              if((getClickedElemType() === 'parent')){
                $L(previousWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
            } else {
              $L(previousWrap).nextUntil(currentParentWrap,'',true).addClass('leftShiftElement')
              $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentParentWrap).addClass('leftShiftElement')
                $L(currentParentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).addClass('leftShiftElement')
              }
              if(getCurChildInd() === 0){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            }
          } else if(getPreParInd() > getCurParInd()){
            // console.log('remove' , getClickedElemType());
            if(getClickedElemLevel() === 'lvl1'){
              // console.log('remove parent');
              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
            } else {
              // console.log('remove child 1');
              $L(previousWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
              if(getCurLastIndex() === getCurChildInd()){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).removeClass('leftShiftElement')
              }
              $L(currentParentWrap).addClass('leftShiftElement')
            }
            $L(currentWrap).addClass('leftShiftElement')
          } else if(getPreParInd() === getCurParInd()){
            if(getPreChildInd() <= getCurChildInd()){
              // console.log('add child');
              if(getCurChildInd() <= 0){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            } else {
              // console.log('remove child');
              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(currentWrap).addClass('leftShiftElement')
            }
          }


          /*

          Selection from top to bottom ends

          */


        } else if(getIniParInd() > getCurParInd()){
          /*

          Selection from bottom to top

          */
          // console.log('bottom to top');

          if((getIniParInd() < getPreParInd()) && (getCurParInd() < getIniParInd()) ||
             (getIniChildInd() < getPreChildInd()) && (getCurParInd() < getIniParInd())
            ){
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
            previousElement = initialElement
            previousWrap  = initialWrap
            previousParentWrap  = initialParentWrap
            previousChildren  = initialChildren
          }

          if(getPreParInd() > getCurParInd()){

            // console.log('add bottom to top');
            if(getClickedElemLevel() === 'lvl1'){
              $L(previousWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
              if(getPrevElemType() === 'parent'){
                $L(previousWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
                $L(previousWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
                $L(previousParentWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
              if(getPreChildInd()!==0){
                $L(previousParentWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
                $L(previousParentWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
              $L(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              $L(previousParentWrap).addClass('leftShiftElement')

            } else {
              $L(previousParentWrap).addClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              if(getCurChildInd() !== 0){
                $L(previousParentWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).addClass('leftShiftElement')
              }
              $L(previousChildren[getPreChildInd()]).prevUntil(previousChildren[0],'',true).addClass('leftShiftElement')
              if(getCurChildInd() === getCurLastIndex()){
                $L(currentChildren[getCurLastIndex()]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            }


          } else if(getPreParInd() < getCurParInd()){

            // console.log('remove bottom to top');

            if(getClickedElemLevel() === 'lvl1'){
              $L(previousWrap).nextUntil(currentWrap).removeClass('leftShiftElement')
              $L(previousParentWrap).nextUntil(currentWrap).removeClass('leftShiftElement')
              if(getClickedElemType() === 'parent'){
                $L(previousWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              }
              $L(previousWrap).removeClass('leftShiftElement')
            } else {
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                $L(previousParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              }
              if(getCurChildInd()===0){
                $L(currentChildren[0]).removeClass('leftShiftElement')
              } else {
                $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()],'',true).removeClass('leftShiftElement')
              }
            }
            $L(currentWrap).addClass('leftShiftElement')

          } else if(getPreParInd() === getCurParInd()){

            // console.log('bottom to top same parent');

            if((getPreChildInd() > getCurChildInd()) || (getClickedElemType() === 'parent')){

              // console.log('add child bottom to top');
              $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              if(getPreParInd() === getCurParInd()){
                $L(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }

            } else {

              // console.log('remove child bottom to top');
              if(getPrevElemType() === 'parent'){
                $L(previousWrap).removeClass('leftShiftElement')
                if(getCurChildInd()!==0){
                  $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).removeClass('leftShiftElement')
              }

            }
            $L(currentWrap).addClass('leftShiftElement')

          }


          /*

          Selection from bottom to top ends

          */


        } else if(getIniParInd() === getCurParInd()){
          // console.log('same parent');
          /*

          Selection within the same parent and child

          */

          if(getCurChildInd() < getIniChildInd()){
            if((getIniChildInd() < getPreChildInd()) && (getCurChildInd() < getIniChildInd()) ||
               (getIniChildInd() > getCurChildInd()) && (getCurParInd()<getPreParInd())
              ){
              $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
              previousElement = initialElement
              previousWrap  = initialWrap
              previousParentWrap  = initialParentWrap
              previousChildren  = initialChildren
            }
            // console.log('bottom to top in same parent');

            if(((getPreChildInd() > getCurChildInd()) || (getClickedElemType() === 'parent')) && (getPreParInd() === getCurParInd())){
              // console.log('add bottom to top same parent');
              if(getClickedElemType() === 'parent'){
                $L(currentWrap).addClass('leftShiftElement');
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[0] , '' , true).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).addClass('leftShiftElement')
              }
            } else {
              // console.log('remove bottom to top same parent');
              if(getPreParInd() === getCurParInd()){
                  $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                  $L(currentParentWrap).removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).removeClass('leftShiftElement')
                $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                if(getPrevElemType() === 'parent'){
                  $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                }
                if(getCurChildInd() === 0){
                  $L(currentChildren[getCurChildInd()]).removeClass('leftShiftElement')
                } else {
                  $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              }
              $L(currentWrap).addClass('leftShiftElement')
            }

          } else {
            // console.log('top to bottom in same parent');

            if((getIniChildInd() > getPreChildInd()) && (getCurChildInd() > getIniChildInd())){
              $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
              previousElement = initialElement
              previousWrap  = initialWrap
              previousParentWrap  = initialParentWrap
              previousChildren  = initialChildren
            }

            if(((getPreChildInd() < getCurChildInd()) || (getClickedElemType() === 'parent')) && (getPreParInd() === getCurParInd())){

              // console.log('add top to bottom in same parent');

              $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).addClass('leftShiftElement')

            } else {

              // console.log('remove top to bottom in same parent');

              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')

              if(getPreParInd() === getCurParInd()){
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
              } else {
                if(getCurChildInd() === getCurLastIndex()){
                  $L(currentChildren[getCurLastIndex()]).addClass('leftShiftElement')
                } else {
                  $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              }


              $L(currentWrap).addClass('leftShiftElement')
            }

          }

          /*

          Selection within the same parent and child ends

          */

        }

        $L(lB).find('.lyteListBoxRequiredParent').removeClass('leftShiftElement')
                $L(lB).find('.leftShiftElement').children('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')
        $L(lB).find('.leftShiftElement').children('.lyteListBoxLeftElement').addClass('lyteLBLeftMoveElement')

                this.setData('leftShiftSelectIndex' , $L(clickedEle)[0].getAttribute('index'));

      } else if ($L(clickedEle).hasClass('lyteListBoxRightElement') && !(clickedEle === lastActiveRight)) {

        if ($L(lB).find('.lyteLBLeftActive').length > 0) {
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
        }

        if (!isCurrentElementDisabled) {

          var lastActiveRightInd
          if (!(lastActiveRight.getAttribute('index').split(" ").length > 1)) {
            lastActiveRightInd = rightEles.indexOf(lastActiveRight)
          }
          lastActiveRight = rightEles[lastActiveRightInd]
          prevWrap = $L(lastActiveRight).closest('.lyteListBoxRightWrap');
          nextPrevCheck = parseInt(clickedEle.getAttribute('index')) < parseInt(lastActiveRight.getAttribute('index'))

          if (nextPrevCheck) {
            $L(previousWrap).prevUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            if (
              (wrapArray.indexOf(currentWrap[0]) > wrapArray.indexOf(previousWrap[0])) &&
              (wrapArray.indexOf(previousWrap[0]) < wrapArray.indexOf(prevWrap[0]))
            ) {
              $L(currentWrap).prevUntil(previousWrap,"",true).removeClass('rightShiftElement')
              $L(currentWrap).prevUntil(previousWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            }
            $L(previousWrap).prevUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).prevUntil(prevWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(prevWrap).prevUntil(currentWrap, '.lyteListBoxRightWrap',true).addClass('rightShiftElement')
          } else {
            $L(previousWrap).nextUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            if (
              (wrapArray.indexOf(currentWrap[0]) < wrapArray.indexOf(previousWrap[0])) &&
              (wrapArray.indexOf(previousWrap[0]) > wrapArray.indexOf(prevWrap[0]))
            ) {
              $L(currentWrap).nextUntil(previousWrap,"",true).removeClass('rightShiftElement')
              $L(currentWrap).nextUntil(previousWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            }
            $L(previousWrap).nextUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).nextUntil(prevWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(prevWrap).nextUntil(currentWrap, '.lyteListBoxRightWrap',true).addClass('rightShiftElement')
          }

          $L(lB).find('.lyteListBoxRequiredParent').removeClass('rightShiftElement')
          $L(lB).find('.lyteLBMandateItem').closest('.rightShiftElement').removeClass('rightShiftElement')
          $L(lB).find('.rightShiftElement').children('.lyteListBoxRightElement').addClass('lyteLBRightActive')
          $L(lB).find('.rightShiftElement').children('.lyteListBoxRightElement').addClass('lyteLBRightMoveElement')

          this.setData('rightShiftSelectIndex', $L(clickedEle)[0].getAttribute('index'));

        }
      }


    } else if ($L(clickedEle).hasClass('lyteListBoxLeftElement') || $L(clickedEle).hasClass('lyteListBoxRightElement')) {

      if (event.metaKey || event.ctrlKey) {

        /*

        * CTRL/CMD key down and select elements

        */


        if (this.panelSide(clickedEle) === "left") {
          this.setData('activeSide' , 'left')
          if ($L(lB).find('.lyteLBRightActive').length > 0) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
          }


          if (!isCurrentElementDisabled) {

            if ($L(clickedEle).hasClass('lyteListBoxLeftElement') && !$L(clickedEle).hasClass('lyteLBLeftActive')) {

              this.setData('leftShiftSelectIndex', '')
              var cwrap = clickedEle.parentElement
              cwrap = $L(cwrap).find('.lyteListBoxLeftWrap');
              if (cwrap.length > 1) {
                $L(cwrap).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')
              }

              $L(clickedEle).addClass('lyteLBLeftActive')
              Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))
              this.setData('leftShiftSelectIndex', '')
              $L(clickedEle).data('elementData', this.getData('ltPropLeftData')[leftEles.indexOf(clickedEle)]);

            } else {

              if (wrap.length > 1) {
                $L(wrap).find('.lyteListBoxLeftElement').removeClass('lyteLBLeftActive')
              }
              $L(clickedEle).removeClass('lyteLBLeftActive')
              Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'removeAt', $L(clickedEle).data().selectOrder - 1, 1)
              $L(clickedEle).data()
            }
          }

        } else {
          this.setData('activeSide' , 'right')
          if ($L(lB).find('.lyteLBLeftActive').length > 0) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            this.setData('activeSide' , 'left')
          }
          if ((!(this.getData('ltPropRightData')[notDisabled][this.getData('ltPropMandateKey')]))) {

            if ($L(clickedEle).hasClass('lyteListBoxRightElement') && !$L(clickedEle).hasClass('lyteLBRightActive')) {

              this.setData('rightShiftSelectIndex', $L(clickedEle)[0].getAttribute('index'));
              var cwrap = $L(clickedEle).closest('.lyteListBoxRightWrap')[0]
              cwrap = $L(cwrap).find('.lyteListBoxRightWrap');
              if (cwrap.length > 1) {
                $L(cwrap).find('.lyteListBoxRightElement').addClass('lyteLBRightActive')
              }

              // $L(clickedEle).closest('.lyteListBoxRightWrap').addClass('rightShiftElement')

              $L(clickedEle).addClass('lyteLBRightActive')
              Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))
              this.setData('rightShiftSelectIndex', rightEles.indexOf(clickedEle) - 1)
              $L(clickedEle).data('elementData', this.getData('ltPropRightData')[rightEles.indexOf(clickedEle)]);

            } else {

              if (wrap.length > 1) {
                $L(wrap).find('.lyteListBoxRightElement').removeClass('lyteLBRightActive')
              }

              $L(clickedEle).removeClass('lyteLBRightActive')
              Lyte.arrayUtils(this.getData('selectedIndexRight'), 'removeAt', $L(clickedEle).data().selectOrder - 1, 1)
              $L(clickedEle).data()
            }

          }
        }





      } else {

        $L(lB).find('.lyteListBoxLeftElement[aria-selected=true]').attr('aria-selected' , false)

        /*

        * Normal mouse clicks

        */


        if (this.panelSide(clickedEle) === "left") {
          this.setData('activeSide' , 'left')

          if ($L(lB).find('.lyteLBRightActive').length > 0) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
            $L(lB).find('.lyteLBRightMoveElement').removeClass('lyteLBRightMoveElement')
          }
          if ($L(lB).find('.leftShiftElement').length > 0) {
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
          }

          if (!isCurrentElementDisabled) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            $L(lB).find('.lyteLBLeftMoveElement').removeClass('lyteLBLeftMoveElement')
            this.setData('selectedIndexLeft', [])


            if (!$L(clickedEle).hasClass('lyteLBLeftActive')) {

              this.setData('leftShiftSelectIndex', "");

              if ($L(clickedEle).hasClass('lyteListBoxLeftElement')) {

                if (clickedEle.getAttribute('index').split(" ").length > 1) {

                  $L(clickedEle).addClass('lyteLBLeftActive');
                  $L(clickedEle).addClass('lyteLBLeftMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))

                } else {
                  if (wrap.length > 1) {
                    $L(wrap).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')
                  }

                  $L(clickedEle).addClass('lyteLBLeftActive');
                  $L(clickedEle).addClass('lyteLBLeftMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))

                }

              }

            }
          }

        } else {
          this.setData('activeSide' , 'right')
          if ($L(lB).find('.lyteLBLeftActive').length > 0) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
            $L(lB).find('.lyteLBLeftMoveElement').removeClass('lyteLBLeftMoveElement')
          }
          if ($L(lB).find('.rightShiftElement').length > 0) {
            $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
          }
          if ((!(this.getData('ltPropRightData')[notDisabled][this.getData('ltPropMandateKey')])) ||
              this.getData('showRemoveBtn')
             ) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(lB).find('.lyteLBRightMoveElement').removeClass('lyteLBRightMoveElement')
            this.setData('selectedIndexRight', [])

            if (!$L(clickedEle).hasClass('lyteLBRightActive')) {

              this.setData('rightShiftSelectIndex', "");

              if ($L(clickedEle).hasClass('lyteListBoxRightElement')) {
                if (clickedEle.getAttribute('index').split(" ").length > 1) {

                  $L(clickedEle).addClass('lyteLBRightActive');
                  $L(clickedEle).addClass('lyteLBRightMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))

                } else {

                  if (wrap.length > 1) {
                    $L(wrap).find('.lyteListBoxRightElement').addClass('lyteLBRightActive')
                  }

                  // $L(clickedEle).closest('.lyteListBoxRightWrap').addClass('rightShiftElement')
                  $L(clickedEle).addClass('lyteLBRightActive');
                  $L(clickedEle).addClass('lyteLBRightMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))


                }
              }
            }
          }
        }
      }
    }

    $L(lB).find('.lyteListBoxLeftElement').attr('aria-selected' , false)
    $L(lB).find('.lyteLBLeftActive').attr('aria-selected' , true)
    $L(lB).find('.lyteListBoxRightElement').attr('aria-selected' , false)
    $L(lB).find('.lyteLBRightActive').attr('aria-selected' , true)

    this.disableButtons();

  },

  disableButtons : function(){

    var lB = this.$node;
    if($L(lB).find('.lyteLBLeftActive').length > 0){
      $L(this.$node).find('.lyteLBTBMoveRight').removeClass('lyteDLBDisabledToolbar')
    } else {
      $L(this.$node).find('.lyteLBTBMoveRight').addClass('lyteDLBDisabledToolbar')
    }

    if($L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').length > 0){
      if(!$L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').hasClass('lyteListBoxRequiredParent')){
        $L(this.$node).find('.lyteLBTBMoveLeft').removeClass('lyteDLBDisabledToolbar')
      } else {
        $L(this.$node).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')
      }
      $L(this.$node).find('.lyteLBTBMoveUp').removeClass('lyteDLBDisabledToolbar')
      $L(this.$node).find('.lyteLBTBMoveDown').removeClass('lyteDLBDisabledToolbar')
      if($L(lB).find('.lyteListboxUnpinnedWrapper').find('.lyteLBRightActive').length > 1){
        $L(this.$node).find('.lyteLBTBMoveUp').addClass('lyteDLBDisabledToolbar')
        $L(this.$node).find('.lyteLBTBMoveDown').addClass('lyteDLBDisabledToolbar')
      }
    } else {
      $L(this.$node).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')
      $L(this.$node).find('.lyteLBTBMoveUp').addClass('lyteDLBDisabledToolbar')
      $L(this.$node).find('.lyteLBTBMoveDown').addClass('lyteDLBDisabledToolbar')
    }

  },

  panelSide: function(ele) {

    if ($L(ele).hasClass('lyteListBoxLeftElement')) {
      return 'left'
    } else if ($L(ele).hasClass('lyteListBoxRightElement')) {
      return 'right'
    }

  },

  updateInsertIndex: function(th) {
    this.setData('insertAtRightInd', this.getData('insertAtRightInd') + 1)
  },

  reduceInsertIndex: function(th) {
    var insertInd = this.getData('insertAtRightInd')
    if(insertInd <= 0){
      insertInd = 1
    }
    this.setData('insertAtRightInd',  (insertInd - 1))
  },

  getActiveElements: function(activeEles, dataString) {
    if(this.getData('useSelf')){
        var th = this
        var toMoveDatas = []
        var parInd;
        for (var i = 0; i < activeEles.length; i++) {
          var childElem = ''
          if($L(activeEles[i]).hasClass('lyteListBoxRightWrap')){
            childElem = '.lyteListBoxRightElement'
          } else if($L(activeEles[i]).hasClass('lyteListBoxLeftWrap')){
            childElem = '.lyteListBoxLeftElement'
          }
          var index = $L(activeEles[i]).find(childElem).attr('index').split(" ").map(this.indexCallback);
          var elemData;
          if (!$L(activeEles[i]).hasClass('lyteListBoxLeftParentElement')) {
            if (index.length > 1) {
              elemData = th.getData(dataString)[index[0]].childrenList[index[1]]
              if (!parInd) {
                parInd = toMoveDatas.length - 1;
              }
              toMoveDatas.push(elemData)
            } else {
              elemData = th.getData(dataString)[index[0]]
              toMoveDatas.push(elemData)
              if (parInd) {
                parInd = undefined
              }
            }
          }
        }
        return toMoveDatas
    } else {
        var th = this
        var toMoveDatas = []
        var parInd;
        for (var i = 0; i < activeEles.length; i++) {
          var index = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
          var elemData;
          if (!$L(activeEles[i]).hasClass('lyteListBoxLeftParentElement')) {
            if (index.length > 1) {
              elemData = th.getData(dataString)[index[0]].childrenList[index[1]]
              if (!parInd) {
                parInd = toMoveDatas.length - 1;
              }
              toMoveDatas.push(elemData)
            } else {
              elemData = th.getData(dataString)[index[0]]
              elemData = Object.assign({}, elemData);
              if (elemData.childrenList) {
                elemData.childrenList = []
              }
              toMoveDatas.push(elemData)
              if (parInd) {
                parInd = undefined
              }
            }
          }
        }
        return toMoveDatas
    }
  },

  getSelectedDatas : function(activeEles){
    var th = this
    var toMoveDatas = []
    var mandateData = {}
    var mandateDatas = []
    var count = -1
    var mandateCount = 0
    for (var i = 0; i < activeEles.length; i++) {
      count+=1;
      var index = $L(activeEles[i]).find('.lyteListBoxRightElement').attr('index').split(" ").map(this.indexCallback);
      var currentObj = th.getData('ltPropRightData')[index[0]]
      if(currentObj[th.getData('ltPropMandateKey')]){
        mandateCount+=1
        if(!mandateData.obj){
          mandateData.obj = currentObj
          mandateData.index = index - count
          mandateDatas.push(mandateData.obj)
          delete mandateData.obj
        } else {
          if(mandateCount <= this.getData('ltPropMinimumRequiredCount')){
            toMoveDatas.push(mandateData.obj)
          } else {
            mandateDatas.push(mandateData.obj)
            delete mandateData.obj
          }
          mandateData.obj = currentObj
          mandateData.index = index - count
        }
      } else {
        toMoveDatas.push(currentObj)
      }
    }
    if($L(this.$node).find('.lyteLBMandateParent').length > this.getData('ltPropMinimumRequiredCount') && mandateCount < 2 && mandateData && mandateData.obj){
      toMoveDatas.push(mandateData.obj)
      mandateData = {}
    }
    
    var retObj = {}
    retObj.toMoveDatas = toMoveDatas;
    retObj.mandateData = mandateDatas;
    return retObj
  },

  sESPF: function(activeEles, toMoveDatas, mainData, dropIndex, allElements , destination) {
    /*
     *  sort elements in same panel function
     */

    if(activeEles && activeEles.length > 0){

      var startInd = activeEles[0].getAttribute('index').split(" ").map(this.indexCallback);
      var dropElem = $L(destination).find(allElements)[dropIndex]
      for (var i = 0; i < activeEles.length; i++) {

        if ((!($L(activeEles[i]).hasClass('lyteListBoxLeftParentElement'))) && (!($L(activeEles[i]).hasClass('lyteListBoxRightParentElement')))) {
          var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
          Lyte.arrayUtils(this.getData(mainData), 'removeAt', ind, 1);
        }
      }

      if(dropElem){
        dropIndex = dropElem.getAttribute('index').split(" ").map(this.indexCallback)[0];
      } else {
        dropIndex = this.getData(mainData).length;
      }

      Lyte.arrayUtils(this.getData(mainData), 'insertAt', dropIndex, toMoveDatas);
    }

  },

  resetListValues : function(){
    this.setData('selectedIndexLeft', [])
    this.setData('selectedIndexRight', [])
    this.setData('leftShiftSelectIndex', '')
    this.setData('rightShiftSelectIndex', '')
    this.setData('insertAtLeftInd', 0)
    this.setData('insertAtRightInd', 0)
  },

  changeActiveToUp : function(){
    var lB = this.$node
    $L(lB).find('.lyteListBoxLeftElement[aria-selected=true]').attr('aria-selected' , false)
    var activeElements = $L('.lyteLBLeftActive')
    if(this.getData('activeSide') === "left"){
      activeElements = $L('.lyteLBLeftActive')
    } else if(this.getData('activeSide') === "right"){
      activeElements = $L('.lyteLBRightActive')
    }
    if(activeElements.length > 0){
      var lastActiveElement = parseInt(activeElements[0].getAttribute('dom-index'))
      var newActiveElementInd = lastActiveElement - 1
      if(newActiveElementInd < 1){
        newActiveElementInd = 1
      }
      if(this.getData('activeSide') === 'left'){
        if(lastActiveElement > 0){
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftMoveElement')
          $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
        }
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBLeftActive')
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBLeftMoveElement')
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").attr('aria-selected' , true);
        this.setData('listboxLeftAriaDescendant' , $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").attr('id'))
        this.moveElementInView($L(lB).find('.lyteListboxleftElementWrap')[0], $L(lB).find('.lyteLBLeftActive')[0])
      } else if(this.getData('activeSide') === "right"){
        if(lastActiveElement > 0){
          $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
          $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightMoveElement')
          $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
        }
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBRightActive')
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBRightMoveElement')
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").attr('aria-selected' , true);
        this.setData('listboxRightAriaDescendant' , $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").attr('id'))
        this.moveElementInView($L(lB).find('.lyteListboxRightPanel')[0], $L(lB).find('.lyteLBRightActive')[0])
      }
      this.setData('previousClickedElemDomInd' , newActiveElementInd)
    }
  },

  changeActiveToDown : function(){

    var lB = this.$node
    $L(lB).find('.lyteListBoxLeftElement[aria-selected=true]').attr('aria-selected' , false)
    var activeElements = $L('.lyteLBLeftActive')
    if(this.getData('activeSide') === "left"){
      activeElements = $L('.lyteLBLeftActive')
    } else if(this.getData('activeSide') === "right"){
      activeElements = $L('.lyteLBRightActive')
    }

    if(activeElements.length > 0){

      var lastActiveElement = parseInt(activeElements[activeElements.length-1].getAttribute('dom-index'))
      var newActiveElementInd = lastActiveElement + 1
      if(this.getData('activeSide') === 'left'){
        // if(newActiveElementInd > $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent,.lyteSearchHidden)').length){
        //   newActiveElementInd = $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent,.lyteSearchHidden)').length
        // }
        if(newActiveElementInd > $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').length){
          newActiveElementInd = $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').length
        }
        if(lastActiveElement > 0){
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftMoveElement')
          $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
        }
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBLeftActive')
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBLeftMoveElement')
        $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").attr('aria-selected' , true);
        this.setData('listboxLeftAriaDescendant' , $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']").attr('id'))
        this.moveElementInView($L(lB).find('.lyteListboxleftElementWrap')[0], $L(lB).find('.lyteLBLeftActive')[0])
      } else if(this.getData('activeSide') === "right"){
        if(newActiveElementInd > $L(lB).find('.lyteListBoxRightElement').length){
          newActiveElementInd = $L(lB).find('.lyteListBoxRightElement').length
        }
        if(lastActiveElement > 0){
          $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
          $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightMoveElement')
          $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
        }
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBRightActive')
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").addClass('lyteLBRightMoveElement')
        $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").attr('aria-selected' , true);
        this.setData('listboxRightAriaDescendant' , $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']").attr('id'))
        this.moveElementInView($L(lB).find('.lyteListboxRightPanel')[0], $L(lB).find('.lyteLBRightActive')[0])
      }
      this.setData('previousClickedElemDomInd' , newActiveElementInd)
    }
  },

  moveActiveToLeft : function(){
    var lB = this.$node
    $L(lB).find('[aria-selected=true]').attr('aria-selected' , false)
    $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
    $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
    $L(lB).find('.lyteLBRightMoveElement').removeClass('lyteLBRightMoveElement')
    this.setData('activeSide' , 'left')
    var leftElem = $L(lB).find('.lyteListBoxLeftElement')[0]
    $L(leftElem).addClass('lyteLBLeftActive')
    $L(leftElem).addClass('lyteLBLeftMoveElement')
    $L(leftElem).attr('aria-selected' , true)
  },

  moveActiveToRight : function(){
    var lB = this.$node
    $L(lB).find('[aria-selected=true]').attr('aria-selected' , false)
    $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
    $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
    $L(lB).find('.lyteLBLeftMoveElement').removeClass('lyteLBLeftMoveElement')
    this.setData('activeSide' , 'right')
    var rightElem = $L(lB).find('.lyteListBoxRightElement')[0]
    $L(rightElem).addClass('lyteLBRightActive')
    $L(rightElem).addClass('lyteLBRightMoveElement')
    $L(rightElem).attr('aria-selected' , true)
  },

  selectElementsUp : function(){

    var lB = this.$node
    var activeElements = $L('.lyteLBLeftActive')
    if(this.getData('activeSide') === "left"){
      activeElements = $L('.lyteLBLeftActive')
    } else if(this.getData('activeSide') === "right"){
      activeElements = $L('.lyteLBRightActive')
    }

    var firstDomInd = this.getData('previousClickedElemDomInd')
    var lastDomInd = parseInt($L(activeElements[activeElements.length-1]).attr('dom-index'))

    var lastActiveElement
    var newActiveElementInd

    if(this.getData('activeSide') === 'left'){
      var leftElem
      if(firstDomInd < lastDomInd){
        lastActiveElement = parseInt(activeElements[activeElements.length-1].getAttribute('dom-index')) + 1
        newActiveElementInd = lastActiveElement - 1
        leftElem = $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']")
        leftElem.removeClass('lyteLBLeftActive')
        leftElem.removeClass('lyteLBLeftMoveElement')
        leftElem.closest('.lyteListBoxLeftWrap').removeClass('leftShiftElement')
      } else if(firstDomInd >= lastDomInd){
        lastActiveElement = parseInt(activeElements[0].getAttribute('dom-index'))
        newActiveElementInd = lastActiveElement - 1
        leftElem = $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']")
        leftElem.addClass('lyteLBLeftActive')
        leftElem.addClass('lyteLBLeftMoveElement')
        leftElem.closest('.lyteListBoxLeftWrap').addClass('leftShiftElement')
      }
      $L('.lyteListBoxRequiredParent').removeClass('leftShiftElement')
      $L('.lyteListBoxRequiredParent').find('.lyteListBoxLeftElement').removeClass('lyteLBLeftActive lyteLBLeftMoveElement')
      this.setData('listboxLeftAriaDescendant',leftElem.attr('id'))
      this.setData('leftShiftSelectIndex' , leftElem.attr('index'))
    } else if(this.getData('activeSide') === 'right'){
      var rightElem
      if(firstDomInd < lastDomInd){
        lastActiveElement = parseInt(activeElements[activeElements.length-1].getAttribute('dom-index')) + 1
        newActiveElementInd = lastActiveElement - 1
        rightElem = $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']")
        rightElem.removeClass('lyteLBRightActive')
        rightElem.removeClass('lyteLBRightMoveElement')
        rightElem.closest('.lyteListBoxRightWrap').removeClass('rightShiftElement')
      } else if(firstDomInd >= lastDomInd){
        lastActiveElement = parseInt(activeElements[0].getAttribute('dom-index'))
        newActiveElementInd = lastActiveElement - 1
        rightElem = $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']")
        rightElem.addClass('lyteLBRightActive')
        rightElem.addClass('lyteLBRightMoveElement')
        rightElem.closest('.lyteListBoxRightWrap').addClass('rightShiftElement')
      }
      $L('.lyteListBoxRequiredParent').removeClass('rightShiftElement')
      $L('.lyteListBoxRequiredParent').find('.lyteListBoxRightElement').removeClass('lyteLBRightActive lyteLBRightMoveElement')
      this.setData('listboxRightAriaDescendant',rightElem.attr('id'))
      this.setData('rightShiftSelectIndex' , rightElem.attr('index'))
    }

  },

  selectElementsDown : function(){
    var lB = this.$node
    var activeElements = $L('.lyteLBLeftActive')
    if(this.getData('activeSide') === "left"){
      activeElements = $L('.lyteLBLeftActive')
    } else if(this.getData('activeSide') === "right"){
      activeElements = $L('.lyteLBRightActive')
    }

    var firstDomInd = this.getData('previousClickedElemDomInd')
    var lastDomInd = parseInt($L(activeElements[0]).attr('dom-index'))

    var lastActiveElement
    var newActiveElementInd

    if(this.getData('activeSide') === 'left'){
      var leftElem
      if(firstDomInd > lastDomInd){
        lastActiveElement = parseInt(activeElements[0].getAttribute('dom-index')) - 1
        newActiveElementInd = lastActiveElement + 1
        leftElem = $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']")
        leftElem.removeClass('lyteLBLeftActive')
        leftElem.removeClass('lyteLBLeftMoveElement')
        leftElem.closest('.lyteListBoxLeftWrap').removeClass('leftShiftElement')
      } else if(firstDomInd <= lastDomInd){
        lastActiveElement = parseInt(activeElements[activeElements.length-1].getAttribute('dom-index'))
        newActiveElementInd = lastActiveElement + 1
        leftElem = $L(".lyteListBoxLeftElement[dom-index='"+newActiveElementInd+"']")
        leftElem.addClass('lyteLBLeftActive')
        leftElem.addClass('lyteLBLeftMoveElement')
        leftElem.closest('.lyteListBoxLeftWrap').addClass('leftShiftElement')
      }
      $L('.lyteListBoxRequiredParent').removeClass('leftShiftElement')
      $L('.lyteListBoxRequiredParent').find('.lyteListBoxLeftElement').removeClass('lyteLBLeftActive lyteLBLeftMoveElement')
      this.setData('listboxLeftAriaDescendant',leftElem.attr('id'))
      this.setData('leftShiftSelectIndex' , leftElem.attr('index'))
    } else if(this.getData('activeSide') === 'right'){
      var rightElem
      if(firstDomInd > lastDomInd){
        lastActiveElement = parseInt(activeElements[0].getAttribute('dom-index')) - 1
        newActiveElementInd = lastActiveElement + 1
        rightElem = $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']")
        rightElem.removeClass('lyteLBRightActive')
        rightElem.removeClass('lyteLBRightMoveElement')
        rightElem.closest('.lyteListBoxRightWrap').removeClass('rightShiftElement')
      } else if(firstDomInd <= lastDomInd){
        lastActiveElement = parseInt(activeElements[activeElements.length-1].getAttribute('dom-index'))
        newActiveElementInd = lastActiveElement + 1
        rightElem = $L(".lyteListBoxRightElement[dom-index='"+newActiveElementInd+"']")
        rightElem.addClass('lyteLBRightActive')
        rightElem.addClass('lyteLBRightMoveElement')
        rightElem.closest('.lyteListBoxRightWrap').addClass('rightShiftElement')
      }
      $L('.lyteListBoxRequiredParent').removeClass('rightShiftElement')
      $L('.lyteListBoxRequiredParent').find('.lyteListBoxRightElement').removeClass('lyteLBRightActive lyteLBRightMoveElement')
      this.setData('listboxRightAriaDescendant',rightElem.attr('id'))
      this.setData('rightShiftSelectIndex' , rightElem.attr('index'))
    }
  },

  handleMinRequired : function(during){
    var lB = this.$node;
    if(during === 'right'){
      if(!this.getData('userDefinedMinCount')){
        this.setData('ltPropMinimumRequiredCount' , $L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').length)
      }
    }

    if($L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').length > this.getData('ltPropMinimumRequiredCount')){
      this.setData('showRemoveBtn' , true)
      $L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').removeClass('lyteListBoxRequiredItem')
      $L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').closest('.lyteListBoxRightWrap').removeClass('lyteListBoxRequiredParent')
    } else {
      this.setData('showRemoveBtn' , false)
      $L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').addClass('lyteListBoxRequiredItem')
      $L(lB).find('.lyteListboxRightPanel').find('.lyteLBMandateItem').closest('.lyteListBoxRightWrap').addClass('lyteListBoxRequiredParent')
    }
  },

  mERFN: function(th , fromDrop , toIndex) {

    if(this.getData('useSelf')){
       
    /*

    *  Move Elements Right Function
    *  Used to move either a selected single or more elements to move from left panel to right panel

    */


    if (!th) {
      th = this;
    }
    var lB = th.$node;
    if(!fromDrop){
      fromDrop = false
    }

    $L(lB).find('.lyteLBLeftActive.lyteLBdragClone').removeClass('lyteLBLeftActive')
    var activeEles = $L(lB).find('.lyteLBLeftActive')

    if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) + activeEles.length > th.getData('ltPropMaxCount')) && ((this.getData('ltPropMaxCount') > -1))) {
      $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
      $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
      $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , true)
      /**
       * @method onMaxCountReached
       * @author surendran.m@zohocorp.com
       * @version 1.0.0
       * @param { array } ltPropLeftData
       * @param { array } ltPropRightData
       * @param { array } toMoveDatas
       */
      th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
      return
    }
    var value = this.getData('associateParent')

    var parInd;

    var toMoveDatas = th.getActiveElements(activeEles, 'ltPropLeftData');

    var onBeforeRightVal = true
    if(this.getMethods('onBeforeRight')){
      onBeforeRightVal = th.executeMethod('onBeforeRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , fromDrop , toIndex);
    }

    if($L(lB).find('.lyteLBLeftActive').length <= 0){
      $L(lB).find('.lyteLBRightActive').css({'display' : ''})
    } else {
      $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
    }


    if(onBeforeRightVal !== false){

      toMoveDatas = []
      parInd = undefined

      function getIndex(arr, par) {
        var v = arr.findIndex(function(item) {
          return item[value] == par[value]
        })
        return v
      }

      for (var i = 0; i < activeEles.length; i++) {
        var elementData;
        var elemData;
        var childElem = ''
        if($L(activeEles[i]).hasClass('lyteListBoxRightWrap')){
          childElem = '.lyteListBoxRightElement'
        } else if($L(activeEles[i]).hasClass('lyteListBoxLeftWrap')){
          childElem = '.lyteListBoxLeftElement'
        }
        var ind = $L(activeEles[i]).find(childElem).attr('index').split(" ").map(this.indexCallback);
        var currentData = th.getData('ltPropLeftData')[ind[0]]

        var parentElement = $L(lB).find('.lyteListBoxLeftElement')[ind[0]]

        if (($L(activeEles[i]).hasClass('lyteListBoxLeftWrap')) && (!$L(activeEles[i]).closest('.lyteListBoxLeftWrap').hasClass('lyteLBDisabledElement'))) {
          if ((ind.length > 1)) {
            elementData = th.getData('ltPropLeftData')[ind[0]].childrenList[ind[1]]
            elemData = elementData
            var parentDiv = $L(activeEles[i]).closest('.lyteLBLeftChildWrap')
            var parData = th.getData('ltPropLeftData')[ind[0]]
            if (elementData) {
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
              th.animateBackgroundManual('right' , th.getData('insertAtRightInd') , '.lyteListboxUnpinnedWrapper');
              var selectedDiv = $L(lB).find('.lyteListBoxRightElement')[th.getData('insertAtRightInd')]
              selectedDiv.setAttribute('setParent', th.getData('ltPropLeftData')[ind[0]][th.getData('associateParent')])
              th.updateInsertIndex();
              Lyte.arrayUtils(th.getData('ltPropLeftData')[ind[0]].childrenList, 'removeAt', ind[1], 1);
              $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
              if (th.getData('ltPropLeftData')[ind[0]].childrenList.length <= 0) {
                $L(parentDiv).closest('.lyteListBoxLeftWrap').addClass('lyteLBoxDisabledParent')
              } else {
                $L(parentDiv).closest('.lyteListBoxLeftWrap').removeClass('lyteLBoxDisabledParent')
              }
            }
          } else { 
            if (!(currentData.childrenList)) { 
              elementData = th.getData('ltPropLeftData')[ind]
              // Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'push', elementData);
              th.animateBackgroundManual('right' , th.getData('insertAtRightInd') , '.lyteListboxUnpinnedWrapper');
              th.updateInsertIndex();
              Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', ind, 1);
              toMoveDatas.push(elementData)
            }
          }
        }
      }
      th.setData('selectedIndexLeft', [])
      th.setData('leftShiftSelectIndex', "")


      if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) >= th.getData('ltPropMaxCount')) && (this.getData('ltPropMaxCount') > -1)) {
        $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , true)
        $L(lB).find('.lyteListboxLeftPanel').attr('lt-prop-title' , th.getData('ltPropTooltipMessage'))
        $L(lB).find('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config' ,'{ "position":"followcursor"}')
        th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
        $L(lB).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')
        th.setData('itemsMaxed' , true);
      }

    } else {

      th.updateInsertIndex();
      th.setData('selectedIndexLeft', [])
      th.setData('leftShiftSelectIndex', "")

      th.setData('insertAtRightInd', th.getData('ltPropRightData').length)
      if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) >= th.getData('ltPropMaxCount')) && (this.getData('ltPropMaxCount') > -1)) {
        th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
        $L(lB).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')
      }
    }
    
    $L(lB).find('.lyteLBMandateItem').closest('.lyteListBoxRightWrap').addClass('lyteLBMandateParent')
    if(this.getData('ltPropShowSearch') && this.getData('ltPropLeftData').length < 1){
      $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , true)
    }

    this.updateDomIndex()

    this.handleMinRequired('right')

    if(toMoveDatas.length > 1){
      this.setData('ariaLiveContent' , (toMoveDatas.length + ' Elements moved to right'))
    } else {
      this.setData('ariaLiveContent' , (toMoveDatas.length + ' Element moved to right'))
    }
    this.setData('ariaLiveContentBoolean' , true);

    if($L(lB).find('.lyteListBoxLeftElement').length === $L(lB).find('.lyteSearchHidden').length){
      this.setData('noResultsFound' , true)
    } else {
      this.setData('noResultsFound' , false)
    }
    
    if($L(lB).find('.lyteListBoxRightElement').length < 1){
      this.setData('noResultsFoundRight' , true)
    } else {
      this.setData('noResultsFoundRight' , false)
    }

    setTimeout(function(){
      th.setData('ariaLiveContent' , '')
      th.setData('ariaLiveContentBoolean' , false)
    },1000)

    this.setData('listboxLeftAriaDescendant' , '')
    this.setData('listboxRightAriaDescendant' , '')

    // $L(lB).find('.lyteListboxRightPanel')[0].scrollTop = $L(lB).find('.lyteListboxRightPanel')[0].scrollHeight;

    var onRightVal = th.executeMethod('onMoveRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , fromDrop , toIndex)

    if((onRightVal !== undefined) && (!onRightVal)){
      return
    }

    // after

    } else {
         /*
  
      *  Move Elements Right Function
      *  Used to move either a selected single or more elements to move from left panel to right panel
  
      */
  
  
         if (!th) {
          th = this;
        }
        var lB = th.$node;
        if(!fromDrop){
          fromDrop = false
        }
    
        $L(lB).find('.lyteLBLeftActive.lyteLBdragClone').removeClass('lyteLBLeftActive')
        var activeEles = $L(lB).find('.lyteLBLeftActive')
    
        if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) + activeEles.length > th.getData('ltPropMaxCount')) && ((this.getData('ltPropMaxCount') > -1))) {
          $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
          th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
          return
        }
        var value = this.getData('associateParent')
    
        var parInd;
    
        var toMoveDatas = th.getActiveElements(activeEles, 'ltPropLeftData');
    
        var onBeforeRightVal = true
        if(this.getMethods('onBeforeRight')){
          onBeforeRightVal = th.executeMethod('onBeforeRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , fromDrop , toIndex);
        }
    
        if($L(lB).find('.lyteLBLeftActive').length <= 0){
          $L(lB).find('.lyteLBRightActive').css({'display' : ''})
        } else {
          $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
        }
    
    
        if(onBeforeRightVal !== false){
    
          toMoveDatas = []
          parInd = undefined
    
          function getIndex(arr, par) {
            var v = arr.findIndex(function(item) {
              return item[value] == par[value]
            })
            return v
          }
    
          for (var i = 0; i < activeEles.length; i++) {
            var elementData;
            var elemData;
            var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
            var currentData = th.getData('ltPropLeftData')[ind[0]]
    
            var parentElement = $L(lB).find('.lyteListBoxLeftElement')[ind[0]]
    
            if ((!$L(activeEles[i]).hasClass('lyteListBoxLeftParentElement')) && (!$L(activeEles[i]).closest('.lyteListBoxLeftWrap').hasClass('lyteLBDisabledElement'))) {
              if ((ind.length > 1)) {
                elementData = th.getData('ltPropLeftData')[ind[0]].childrenList[ind[1]]
                elemData = elementData
                var parentDiv = $L(activeEles[i]).closest('.lyteLBLeftChildWrap')
                var parData = th.getData('ltPropLeftData')[ind[0]]
                if (elementData) {
                  Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
                  th.animateBackgroundManual('right' , th.getData('insertAtRightInd') , '.lyteListboxUnpinnedWrapper');
                  var selectedDiv = $L(lB).find('.lyteListBoxRightElement')[th.getData('insertAtRightInd')]
                  selectedDiv.setAttribute('setParent', th.getData('ltPropLeftData')[ind[0]][th.getData('associateParent')])
                  th.updateInsertIndex();
                  Lyte.arrayUtils(th.getData('ltPropLeftData')[ind[0]].childrenList, 'removeAt', ind[1], 1);
                  $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
                  if (th.getData('ltPropLeftData')[ind[0]].childrenList.length <= 0) {
                    $L(parentDiv).closest('.lyteListBoxLeftWrap').addClass('lyteLBoxDisabledParent')
                  } else {
                    $L(parentDiv).closest('.lyteListBoxLeftWrap').removeClass('lyteLBoxDisabledParent')
                  }
                }
              } else {
                if (!(currentData.childrenList)) {
                  elementData = th.getData('ltPropLeftData')[ind]
                  Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
                  th.animateBackgroundManual('right' , th.getData('insertAtRightInd') , '.lyteListboxUnpinnedWrapper');
                  th.updateInsertIndex();
                  Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', ind, 1);
                  toMoveDatas.push(elementData)
                }
              }
            }
          }
    
          th.setData('selectedIndexLeft', [])
          th.setData('leftShiftSelectIndex', "")
    
    
          if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) >= th.getData('ltPropMaxCount')) && (this.getData('ltPropMaxCount') > -1)) {
            // $L(lB).find('.lyteListboxLeftPanel').addClass('lyteLeftPanelDisabled')
            $L(lB).find('.lyteListboxLeftPanel').attr('lt-prop-title' , th.getData('ltPropTooltipMessage'))
            $L(lB).find('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config' ,'{ "position":"followcursor"}')
            th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
            $L(lB).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')
            th.setData('itemsMaxed' , true);
          }
    
        } else {
    
          th.updateInsertIndex();
          th.setData('selectedIndexLeft', [])
          th.setData('leftShiftSelectIndex', "")
    
          th.setData('insertAtRightInd', th.getData('ltPropRightData').length)
          if (((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) >= th.getData('ltPropMaxCount')) && (this.getData('ltPropMaxCount') > -1)) {
            th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
            $L(lB).find('.lyteListboxLeftPanel').find('.lyteListBoxLeftWrap').addClass('lyteLBDisabledElement')
          }
        }
        
        $L(lB).find('.lyteLBMandateItem').closest('.lyteListBoxRightWrap').addClass('lyteLBMandateParent')
        if(this.getData('ltPropLeftData').length < 1){
          $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , true)
        }
    
        this.updateDomIndex()
    
        this.handleMinRequired('right')
    
        if(toMoveDatas.length > 1){
          this.setData('ariaLiveContent' , (toMoveDatas.length + ' Elements moved to right'))
        } else {
          this.setData('ariaLiveContent' , (toMoveDatas.length + ' Element moved to right'))
        }
        this.setData('ariaLiveContentBoolean' , true);
    
        if($L(lB).find('.lyteListBoxLeftElement').length === $L(lB).find('.lyteSearchHidden').length){
          this.setData('noResultsFound' , true)
        } else {
          this.setData('noResultsFound' , false)
        }
        
        if($L(lB).find('.lyteListBoxRightElement').length < 1){
          this.setData('noResultsFoundRight' , true)
        } else {
          this.setData('noResultsFoundRight' , false)
        }
    
        setTimeout(function(){
          th.setData('ariaLiveContent' , '')
          th.setData('ariaLiveContentBoolean' , false)
        },1000)
    
        this.setData('listboxLeftAriaDescendant' , '')
        this.setData('listboxRightAriaDescendant' , '')
    
        $L(lB).find('.lyteListboxRightPanel')[0].scrollTop = $L(lB).find('.lyteListboxRightPanel')[0].scrollHeight;
    
        var onRightVal = th.executeMethod('onMoveRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas)
    
        if((onRightVal !== undefined) && (!onRightVal)){
          return
        }
    
        // after
    }

  },

  clearAllActive : function(side){

    var lB = this.$node;

    if(!side){
      side = 'both'
    }

    if(side === "right" || side === "both"){
      $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive lyteLBRightMoveElement')
      $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
    }
    if(side === "left" || side === "both"){
      $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive lyteLBLeftMoveElement')
      $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
    }
    $L(lB).find('.lyteLBTBMoveRight').addClass('lyteDLBDisabledToolbar')
    $L(lB).find('.lyteLBTBMoveLeft').addClass('lyteDLBDisabledToolbar')

  },

  mELFN: function(th , fromDrop) {

    if(this.getData('useSelf')){


      /*

      *  Move Elements Left Function
      *  Used to move either a selected single or more elements to move from Right panel to left panel

      */

      if (!th) {
        th = this;
      }
      if(!fromDrop){
        fromDrop = false
      }
      var lB = th.$node;
      $L(lB).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
      var activeEles = $L(lB).find('.lyteLBRightActive')

      var value = this.getData('associateParent')

      var toMoveDatas = []
      var parInd;

      var toMoveDatas = th.getActiveElements(activeEles, 'ltPropRightData');

      var onBeforeLeftVal = th.executeMethod('onBeforeLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , fromDrop)

      if($L(lB).find('.lyteLBLeftActive').length <= 0){
        $L(lB).find('.lyteLBRightActive').css({'display' : ''})
      } else {
        $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
      }

      if(th.getData('itemsMaxed')){
        th.setData('itemsMaxed' , false);
      }

      if(onBeforeLeftVal !== false){

        toMoveDatas = []
        parInd = undefined

        function getIndex(arr, par) {
          var v = arr.findIndex(function(item) {
            return item[value] == par[value]
          })
          return v
        }

        function getI(arr, val) {
          var i = arr.findIndex(function(item) {
            return item[value] == val
          })
          return i;
        }

        for (var i = 0; i < activeEles.length; i++) {
          var elementData;
          var elemData;
          var childElem = ''
          if($L(activeEles[i]).hasClass('lyteListBoxRightWrap')){
            childElem = '.lyteListBoxRightElement'
          } else if($L(activeEles[i]).hasClass('lyteListBoxLeftWrap')){
            childElem = '.lyteListBoxLeftElement'
          }
          var ind = $L(activeEles[i]).find(childElem).attr('index').split(" ").map(this.indexCallback);

          var currentData = th.getData('ltPropRightData')[ind[0]]

          var parentElement = $L(lB).find('.lyteListBoxRightElement')[ind[0]]

          if($L('.lyteListboxLeftPanel').attr('lt-prop-title')){
            $L('.lyteListboxLeftPanel').removeAttr('lt-prop-title')
          }
          if($L('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config')){
            $L('.lyteListboxLeftPanel').removeAttr('lt-prop-tooltip-config')
          }

          if ($L(activeEles[i]).find('.lyteListBoxRightElement').attr('setParent').length > 0) {

            var parI = getI(th.getData('ltPropLeftData'), $L(activeEles[i]).find('.lyteListBoxRightElement').attr('setParent'));
            elementData = th.getData('ltPropRightData')[ind]
            Lyte.arrayUtils(th.getData('ltPropLeftData')[parI].childrenList, 'push', elementData);
            // Lyte.arrayUtils(th.getData('ltPropLeftData')[parI].childrenList, 'insertAt', 0 , elementData);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
            th.reduceInsertIndex();

            var newChildInd = parI.toString() + " " + (th.getData('ltPropLeftData')[parI].childrenList.length-1).toString()

            th.animateBackgroundManual('left' , newChildInd)

          } else {

            elementData = th.getData('ltPropRightData')[ind]
            Lyte.arrayUtils(th.getData('ltPropLeftData'), 'push', elementData);
            // Lyte.arrayUtils(th.getData('ltPropLeftData'), 'insertAt', 0 , elementData);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
            th.reduceInsertIndex();
            toMoveDatas.push(elementData)

            var newElemInd = th.getData('ltPropLeftData').length-1

            th.animateBackgroundManual('left' , newElemInd)

          }

        }

        th.setData('selectedIndexRight', [])
        th.setData('rightShiftSelectIndex', "")

        $L(lB).find('.lyteListboxleftElementWrap')[0].scrollTop = $L(lB).find('.lyteListboxleftElementWrap')[0].scrollHeight;

        if ((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) < th.getData('ltPropMaxCount')) {
          $L(lB).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
        }
      } else {

        th.setData('insertAtRightInd', th.getData('ltPropRightData').length)

        if ((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) < th.getData('ltPropMaxCount')) {
          $L(lB).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
        }

      }

      if((this.getData('ltPropShowSearch') && this.getData('ltPropLeftData').length > 0) && ((this.getData('ltPropRightData').length+this.getData('ltPropPinnedData').length) < this.getData('ltPropMaxCount'))){
        $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , false)
      }

      this.updateDomIndex()

      this.handleMinRequired('left')

      if(toMoveDatas.length > 1){
        this.setData('ariaLiveContent' , (toMoveDatas.length + ' Elements moved to left'))
      } else {
        this.setData('ariaLiveContent' , (toMoveDatas.length + ' Element moved to left'))
      }
      this.setData('ariaLiveContentBoolean' , true);

      setTimeout(function(){
        th.setData('ariaLiveContent' , '')
        th.setData('ariaLiveContentBoolean' , false)
      },1000)

      if($L(lB).find('.lyteListBoxRightElement').length < 1){
        this.setData('noResultsFoundRight' , true)
      } else {
        this.setData('noResultsFoundRight' , false)
      }

      this.setData('listboxLeftAriaDescendant' , '')
      this.setData('listboxRightAriaDescendant' , '')

      var onLeftVal = th.executeMethod('onMoveLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , true)

      if((onLeftVal !== undefined) && (!onLeftVal)){
        return
      }

      // after
    } else {
      /*
  
      *  Move Elements Left Function
      *  Used to move either a selected single or more elements to move from Right panel to left panel
  
      */
  
  
      if (!th) {
        th = this;
      }
      if(!fromDrop){
        fromDrop = false
      }
      var lB = th.$node;
      $L(lB).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
      var activeEles = $L(lB).find('.lyteLBRightActive')
  
      var value = this.getData('associateParent')
  
      var toMoveDatas = []
      var parInd;
  
      var toMoveDatas = th.getActiveElements(activeEles, 'ltPropRightData');
  
      var onBeforeLeftVal = th.executeMethod('onBeforeLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas , fromDrop)
  
      if($L(lB).find('.lyteLBLeftActive').length <= 0){
        $L(lB).find('.lyteLBRightActive').css({'display' : ''})
      } else {
        $L(lB).find('.lyteLBLeftActive').css({'display' : ''})
      }
  
      if(th.getData('itemsMaxed')){
        th.setData('itemsMaxed' , false);
      }
  
      if(onBeforeLeftVal !== false){
  
        toMoveDatas = []
        parInd = undefined
  
        function getIndex(arr, par) {
          var v = arr.findIndex(function(item) {
            return item[value] == par[value]
          })
          return v
        }
  
        function getI(arr, val) {
          var i = arr.findIndex(function(item) {
            return item[value] == val
          })
          return i;
        }
  
        for (var i = 0; i < activeEles.length; i++) {
          var elementData;
          var elemData;
          var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
          var currentData = th.getData('ltPropRightData')[ind[0]]
  
          var parentElement = $L(lB).find('.lyteListBoxRightElement')[ind[0]]
  
          if($L('.lyteListboxLeftPanel').attr('lt-prop-title')){
            $L('.lyteListboxLeftPanel').removeAttr('lt-prop-title')
          }
          if($L('.lyteListboxLeftPanel').attr('lt-prop-tooltip-config')){
            $L('.lyteListboxLeftPanel').removeAttr('lt-prop-tooltip-config')
          }
          
  
          if ($L(activeEles[i])[0].getAttribute('setParent').length > 0) {
  
            var parI = getI(th.getData('ltPropLeftData'), $L(activeEles[i])[0].getAttribute('setParent'));
            elementData = th.getData('ltPropRightData')[ind]
            Lyte.arrayUtils(th.getData('ltPropLeftData')[parI].childrenList, 'push', elementData);
            // Lyte.arrayUtils(th.getData('ltPropLeftData')[parI].childrenList, 'insertAt', 0 , elementData);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
            th.reduceInsertIndex();
  
            var newChildInd = parI.toString() + " " + (th.getData('ltPropLeftData')[parI].childrenList.length-1).toString()
  
            th.animateBackgroundManual('left' , newChildInd)
  
          } else {
  
            elementData = th.getData('ltPropRightData')[ind]
            Lyte.arrayUtils(th.getData('ltPropLeftData'), 'push', elementData);
            // Lyte.arrayUtils(th.getData('ltPropLeftData'), 'insertAt', 0 , elementData);
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
            th.reduceInsertIndex();
            toMoveDatas.push(elementData)
  
            var newElemInd = th.getData('ltPropLeftData').length-1
  
            th.animateBackgroundManual('left' , newElemInd)
  
          }
  
        }
  
        th.setData('selectedIndexRight', [])
        th.setData('rightShiftSelectIndex', "")
  
        $L(lB).find('.lyteListboxleftElementWrap')[0].scrollTop = $L(lB).find('.lyteListboxleftElementWrap')[0].scrollHeight;
  
        if ((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) < th.getData('ltPropMaxCount')) {
          $L(lB).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
        }
      } else {
  
        th.setData('insertAtRightInd', th.getData('ltPropRightData').length)
  
        if ((th.getData('ltPropRightData').length+th.getData('ltPropPinnedData').length) < th.getData('ltPropMaxCount')) {
          $L(lB).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
        }
  
      }
  
      if(this.getData('ltPropLeftData').length > 0  && ((this.getData('ltPropRightData').length+this.getData('ltPropPinnedData').length) < this.getData('ltPropMaxCount')) ){
        $L(lB).find('lyte-input')[0].setData('ltPropDisabled' , false)
      }
  
      this.updateDomIndex()
  
      this.handleMinRequired('left')
  
      if(toMoveDatas.length > 1){
        this.setData('ariaLiveContent' , (toMoveDatas.length + ' Elements moved to left'))
      } else {
        this.setData('ariaLiveContent' , (toMoveDatas.length + ' Element moved to left'))
      }
      this.setData('ariaLiveContentBoolean' , true);
  
      setTimeout(function(){
        th.setData('ariaLiveContent' , '')
        th.setData('ariaLiveContentBoolean' , false)
      },1000)
  
      if($L(lB).find('.lyteListBoxRightElement').length < 1){
        this.setData('noResultsFoundRight' , true)
      } else {
        this.setData('noResultsFoundRight' , false)
      }
  
      this.setData('listboxLeftAriaDescendant' , '')
      this.setData('listboxRightAriaDescendant' , '')
  
      var onLeftVal = th.executeMethod('onMoveLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas)
  
      if((onLeftVal !== undefined) && (!onLeftVal)){
        return
      }
  
      // after
    }

  },

  updateDomIndex : function(){
    var lB = this.$node;

    $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').map(function(x){
      $L(this).attr("dom-index" , x+1)
      $L(this).attr("id" , "lyteLbLeft_"+(x+1))
    })

    $L(lB).find('.lyteListBoxRightElement:not(.lyteListBoxRequiredItem):not(.lyteLBoxDisabledParent):not(.lyteSearchHidden)').map(function(x){
      $L(this).attr("dom-index" , x)
      $L(this).attr("id" , "lyteLbRight_"+(x))
    })

    // var firstLeftEle = $L(lB).find('.lyteListBoxLeftElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent)')[0]
    // var firstRightEle = $L(lB).find('.lyteListBoxRightElement:not(.lyteListBoxRequiredItem,.lyteLBoxDisabledParent)')[0]

    // $L(lB).find('.lyteListBoxLeftElement').removeAttr('tabindex')
    // $L(lB).find('.lyteListBoxRightElement').removeAttr('tabindex')

    // $L(firstLeftEle).attr('tabindex' , '0')
    // $L(firstRightEle).attr('tabindex' , '0')

  },

  didDestroy: function() {
    this.setData('selectedIndexLeft', [])
    this.setData('selectedIndexRight', [])
    this.setData('leftShiftSelectIndex', '')
    this.setData('rightShiftSelectIndex', '')
    this.setData('insertAtLeftInd', 0)
    this.setData('insertAtRightInd', 0)
    this.setData('listboxLeftAriaDescendant' , '')
    this.setData('listboxRightAriaDescendant' , '')
    this.setData('ariaLabelledById' , '');
    this.setData('focusActiveBoolean' , false);
    document.removeEventListener('click' , this.$node.clearAllActive)
    document.removeEventListener('keydown' , this.$node.keyboardEvents)
  }
});

/**
  * @syntax nonYielded
  *	 <lyte-dual-listbox lt-prop-left-data="{{firstWidgetArray}}" lt-prop-display-key="name" lt-prop-right-data="{{rightArray}}" use-self="true" lt-prop-yield="false"></lyte-dual-listbox>
*/
