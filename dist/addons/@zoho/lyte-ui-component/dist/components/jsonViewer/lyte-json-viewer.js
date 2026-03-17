Lyte.Component.register("lyte-json-viewer", {
_template:"<template tag-name=\"lyte-json-viewer\"> <div class=\"lyteJsonVrTreeNodeWrap\"> <template is=\"switch\" value=\"{{dataType}}\"><template case=\"array\"> <div class=\"lyteJsonVrTreeArrayElemWrap\"> <template is=\"for\" items=\"{{ltPropArrayData}}\" item=\"item\" index=\"index\"> <template is=\"switch\" value=\"{{lyteTreeDataType(item)}}\"><template case=\"array\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrArray lyteJsonVrTreeClosed{{lyteJsonVrArrLengthHelper(item)}}\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,item,'array')}}\"> <div class=\"lyteJsonVrFullData\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <span>[</span> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(item)}} Items</span></template></template> </div> <div class=\"lyteJsonVrPreviewData\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"lyteJsonVrBrackets\">[...]</span> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(item)}} Items</span></template></template> </div> </div> <div class=\"lyteJsonVrTreeNodeContent\"> <lyte-json-viewer class=\"lyteDataTreeSubLevelTree\" lt-prop-show-comma=\"{{ltPropShowComma}}\" lt-prop-show-item-count=\"{{ltPropShowItemCount}}\" lt-prop-show-data-type=\"{{ltPropShowDataType}}\" lt-prop-structure-type=\"data\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"toolbar\" from-parent=\"\"></template> </lyte-json-viewer> </div> <div class=\"lyteJsonVrEndTag\"> <span class=\"lyteJsonVrEndBracket\">]</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('array')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template><template case=\"object\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrObject lyteJsonVrTreeClosed{{lyteJsonVrObjLengthHelper('item')}}\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openJson',this,item,'object')}}\"> <div class=\"lyteJsonVrFullData\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <span>{</span> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(item)}} Items</span></template></template> </div> <div class=\"lyteJsonVrPreviewData\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{expHandlers(lyteDataTreeObjLength(item),'>',0)}}\"><template case=\"true\"> <span>{...}</span> </template><template case=\"false\"> <span class=\"lyteJsonVrBrackets\">{ }</span> </template></template> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(item)}} Items</span></template></template> </div> </div> <div class=\"lyteJsonVrTreeNodeContent\"> <lyte-json-viewer class=\"lyteDataTreeSubLevelTree\" lt-prop-show-comma=\"{{ltPropShowComma}}\" lt-prop-show-item-count=\"{{ltPropShowItemCount}}\" lt-prop-show-data-type=\"{{ltPropShowDataType}}\" lt-prop-structure-type=\"data\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"toolbar\" from-parent=\"\"></template> </lyte-json-viewer> </div> <div class=\"lyteJsonVrEndTag\"> <span class=\"lyteJsonVrEndBracket\">}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('object')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template><template case=\"number\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrNumber lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,value,'array')}}\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">number</span></template></template> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{item}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('number')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template><template case=\"string\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrString lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,value,'array')}}\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">string</span></template></template> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">\"{{item}}\"</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('string')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template><template case=\"keyword\"> <div class=\"lyteJsonVrTreeNode lyteDataTreeKeyword lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,value,'array')}}\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"lyteJsonVrTreeNodeContent lyteDataTreeKeywordText\">{{lyteDataTreeKeywordParsing(item)}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('keyword')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template><template case=\"boolean\"> <div class=\"lyteJsonVrTreeNode lyteDataTreeBoolean lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,value,'array')}}\"> <span class=\"lyteJsonVrTreeIndex\">{{index}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{item}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropArrayData,item,'array')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('boolean')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> </template></template> </template> </div> </template><template case=\"object\"> <div class=\"lyteJsonVrTreeObjectElemWrap\"> <template is=\"forIn\" object=\"{{ltPropJsonData}}\" value=\"value\" key=\"key\"> <template is=\"switch\" value=\"{{lyteTreeDataType(value)}}\"><template case=\"array\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrArray lyteJsonVrTreeClosed{{lyteJsonVrArrLengthHelper(value)}}\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openArray',this,value,'array')}}\"> <div class=\"lyteJsonVrFullData\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <span>[</span> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(value)}} Items</span></template></template> </div> <div class=\"lyteJsonVrPreviewData\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{expHandlers(lyteDataTreeArrayLength(value),'>',0)}}\"><template case=\"true\"> <span class=\"lyteJsonVrBrackets\">[...]</span> </template><template case=\"false\"> <span class=\"lyteJsonVrBrackets\">[ ]</span> </template></template> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(value)}} Items</span></template></template> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('array')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> <div class=\"lyteJsonVrTreeNodeContent\"> <lyte-json-viewer class=\"lyteDataTreeSubLevelTree\" lt-prop-show-comma=\"{{ltPropShowComma}}\" lt-prop-show-item-count=\"{{ltPropShowItemCount}}\" lt-prop-show-data-type=\"{{ltPropShowDataType}}\" lt-prop-structure-type=\"data\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"toolbar\" from-parent=\"\"></template> </lyte-json-viewer> </div> <div class=\"lyteJsonVrEndTag\"> <span class=\"lyteJsonVrEndBracket\">]</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> </div> </div> </template><template case=\"object\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrObject lyteJsonVrTreeClosed{{lyteJsonVrObjLengthHelper(value)}}\"> <div class=\"lyteJsonVrTreeTitle\" onclick=\"{{action('openJson',this,value,'object')}}\"> <div class=\"lyteJsonVrFullData\"> <template is=\"if\" value=\"{{expHandlers(lyteJsonTreeWithoutKey(key,value),'!')}}\"><template case=\"true\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> </template></template> <span>{</span> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(value)}} Items</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-value=\"{{value}}\"></lyte-yield> </div> <div class=\"lyteJsonVrPreviewData\"> <template is=\"if\" value=\"{{expHandlers(lyteJsonTreeWithoutKey(key,value),'!')}}\"><template case=\"true\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> </template></template> <template is=\"if\" value=\"{{expHandlers(lyteDataTreeObjLength(value),'>',0)}}\"><template case=\"true\"> <span class=\"lyteJsonVrBrackets\">{...}</span> </template><template case=\"false\"> <span class=\"lyteJsonVrBrackets\">{ }</span> </template></template> <template is=\"if\" value=\"{{ltPropShowItemCount}}\"><template case=\"true\"><span class=\"lyteJsonVrItemLength\">{{lyteTreeDataLengthCalculator(value)}} Items</span></template></template> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('object')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </div> <div class=\"lyteJsonVrTreeNodeContent\"> <lyte-json-viewer class=\"lyteDataTreeSubLevelTree\" lt-prop-show-comma=\"{{ltPropShowComma}}\" lt-prop-show-item-count=\"{{ltPropShowItemCount}}\" lt-prop-show-data-type=\"{{ltPropShowDataType}}\" lt-prop-structure-type=\"data\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"toolbar\" from-parent=\"\"></template> </lyte-json-viewer> </div> <div class=\"lyteJsonVrEndTag\"> <span class=\"lyteJsonVrEndBracket\">}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> </div> </div> </template><template case=\"superLongString\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrString lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">string</span></template></template> </div> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText lyteJsonVrSuperLongString\" onclick=\"{{action('toggleSuperLongString',this)}}\">{{value}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('string')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"string\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrString lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">string</span></template></template> </div> <template is=\"if\" value=\"{{lyteJsonVrIsUrlHelper(value)}}\"><template case=\"true\"><a class=\"lyteJsonVrHyperlink\" href=\"{{value}}\"> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\" onclick=\"{{action('expandValue',this)}}\">{{value}}</span> </a></template><template case=\"false\"><span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\" onclick=\"{{action('expandValue',this)}}\">\"{{value}}\"</span></template></template> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('string')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"bigint\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrBigInt lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">bigint</span></template></template> </div> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{value}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('bigint')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"float\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrFloat lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDataType}}\"><template case=\"true\"><span class=\"lyteJsonVrDataType\">float</span></template></template> </div> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{value}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('float')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"function\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrFunction lyteJsonVrTreeClosed\"> <lyte-function-parser lt-prop-function-data=\"{{lyteJsonFunctionParser(key,value)}}\" lt-prop-show-comma=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"></lyte-function-parser> </div> </template><template case=\"keyword\"> <div class=\"lyteJsonVrTreeNode lyteDataTreeKeyword lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"{{lyteTreeDatatypePredictor(value,ltPropSuperLongStringMinLength)}}\"></span> </div> <span class=\"lyteJsonVrTreeNodeContent lyteDataTreeKeywordText\">{{lyteDataTreeKeywordParsing(value)}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('keyword')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"number\"> <div class=\"lyteJsonVrTreeNode lyteJsonVrNumber lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"{{lyteTreeDatatypePredictor(value,ltPropSuperLongStringMinLength)}} lyteJsonVrDataType\">number</span> </div> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{value}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('number')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template><template case=\"boolean\"> <div class=\"lyteJsonVrTreeNode lyteDataTreeBoolean lyteJsonVrTreeClosed\"> <div class=\"lyteJsonVrTreeTitle\"> <span class=\"lyteJsonVrTreeIndex lyteTreeObjectKeyNode\">{{key}}</span> <span class=\"lyteJsonVrColon\">:</span> <span class=\"{{lyteTreeDatatypePredictor(value,ltPropSuperLongStringMinLength)}} lyteJsonVrDataType\">bool</span> </div> <span class=\"lyteJsonVrTreeNodeContent lyteJsonVrNodeText\">{{value}}</span> <template is=\"if\" value=\"{{lyteJsonViewerCommaHelper(ltPropShowComma,ltPropJsonData,key,'object')}}\"><template case=\"true\"><span class=\"lyteJsonVrComma\">,</span></template></template> <lyte-yield class=\"lyteJsonVrToolbarYield\" yield-name=\"toolbar\" list-data=\"{{lyteJsonVrDatatypeObj('boolean')}}\" list-value=\"{{value}}\"></lyte-yield> </div> </template></template> </template> </div> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"array":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"array":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,1,7]},{"type":"if","position":[1,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,3,7]},{"type":"if","position":[1,1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5,5]},{"type":"insertYield","position":[1,5,5]}]},"object":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,1,7]},{"type":"if","position":[1,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,3,5]},{"type":"if","position":[1,1,3,5],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,7]},{"type":"if","position":[1,1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5,5]},{"type":"insertYield","position":[1,5,5]}]},"number":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,1,7,0]},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,11]},{"type":"insertYield","position":[1,1,11]}]},"string":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,1,7,1]},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,11]},{"type":"insertYield","position":[1,1,11]}]},"keyword":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,5,0]},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"insertYield","position":[1,1,9]}]},"boolean":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,5,0]},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"insertYield","position":[1,1,9]}]}},"default":{}}]}]},"object":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"forIn","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"array":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,1,0]},{"type":"attr","position":[1,1,1,7]},{"type":"if","position":[1,1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,3,5]},{"type":"if","position":[1,1,3,5],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,7]},{"type":"if","position":[1,1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,3,9]},{"type":"if","position":[1,1,3,9],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,11]},{"type":"insertYield","position":[1,1,3,11]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"object":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,1,1,5]},{"type":"if","position":[1,1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,1,7]},{"type":"insertYield","position":[1,1,1,7]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,5]},{"type":"if","position":[1,1,3,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,3,7]},{"type":"if","position":[1,1,3,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,3,9]},{"type":"insertYield","position":[1,1,3,9]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,5,3]},{"type":"if","position":[1,5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"superLongString":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"string":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"bigint":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"float":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"function":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},"keyword":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"number":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]},"boolean":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,5]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"insertYield","position":[1,7]}]}},"default":{}}]}]}},"default":{}}],
_observedAttributes :["ltPropArrayData","ltPropJsonData","ltPropSuperLongStringMinLength","ltPropArrayIndex","ltPropShowComma","ltPropShowDataType","ltPropShowItemCount","ltPropShowConnectingLines","lyteTreeJsonOpened","dataType","showFullFunction","showArrayInsideObject","showObjectInsideObject"],
_observedAttributesType :["array","object","number","number","boolean","boolean","boolean","boolean","boolean","string","boolean","boolean","boolean"],

	data : function(){
		return {
			'ltPropArrayData' : Lyte.attr('array' , {
				default : []
			}),
			'ltPropJsonData' : Lyte.attr('object' , {
				default : {}
			}),
			'ltPropSuperLongStringMinLength': Lyte.attr('number', {
				default: 100
			}),
			'ltPropArrayIndex': Lyte.attr('number', {
				default: 0
			}),
			'ltPropShowComma' : Lyte.attr('boolean' , {
				default : true
			}),
			'ltPropShowDataType' : Lyte.attr('boolean' , {
				default : true
			}),
			'ltPropShowItemCount' : Lyte.attr('boolean' , {
				default : true
			}),
			'ltPropShowConnectingLines' : Lyte.attr('boolean' , {
				default : true
			}),

			lyteTreeJsonOpened : Lyte.attr('boolean' , {
				default : false
			}),
			dataType : Lyte.attr('string' , {
				default : ''
			}),
			showFullFunction: Lyte.attr('boolean', {
				default: false
			}),
			showArrayInsideObject : Lyte.attr('boolean' , {
				default : false
			}),
			showObjectInsideObject : Lyte.attr('boolean' , {
				default : false
			})
		}		
	},
	didConnect : function(){
		if(!$L(this.$node.parentElement).closest('lyte-json-viewer')[0]){
			$L(this.$node).addClass('lyteJsonVrTopParent')
		}
		if(!this.getData('ltPropShowConnectingLines')){
			$L(this.$node).addClass('lyteJsonVrHideConnectingLines')
		}
		if(this.getData('ltPropArrayData').length > 0){
			this.setData('dataType' , 'array')
		} else if(this.getData('ltPropJsonData') && !this.getData('ltPropJsonData').lyteTreeEmptyObject && this.getData('ltPropArrayData').length <= 0){
			this.setData('dataType' , 'object')
		}
	},
	_showHideLines : function(){
		if(!this.getData('ltPropShowConnectingLines')){
			$L(this.$node).addClass('lyteJsonVrHideConnectingLines')
		} else {
			$L(this.$node).removeClass('lyteJsonVrHideConnectingLines')
		}
	}.observes('ltPropShowConnectingLines'),
	_objectDataUpdated : function(){
		this.setData('dataType' , 'object')
	}.observes('ltPropJsonData'),
	_arrayDataUpdated : function(){
		this.setData('dataType' , 'array')
	}.observes('ltPropArrayData'),
	openJsonTree : function(th,data , type){
		if(!data){
			return
		}
		if(type === 'array'){
			this.setData('showArrayInsideObject' ,true)
			if(data.length < 1){
				return
			}
		} else if(type === 'object'){
			this.setData('showObjectInsideObject' ,true)
			if(Object.keys(data).length < 1){
				return
			}
		}
		var th = $L(th).closest('.lyteJsonVrTreeNode')[0]
		if($L(th).hasClass('lyteJsonVrTreeClosed')){
			var beforeopen = true
			if(this.getMethods('onBeforeOpen')){
				beforeopen = this.executeMethod('onBeforeOpen' , data)	
			}
			if(beforeopen!==false){
				$L(th).find('.lyteDataTreeSubLevelTree')[0].setData('ltPropJsonData' , data)
				$L(th).removeClass('lyteJsonVrTreeClosed')
				$L(th).addClass('lyteJsonVrTreeOpened')
				if(this.getMethods('onOpen')){
					this.executeMethod('onOpen' , data)	
				}
			}
		} else {
			var beforeclose = true
			if(this.getMethods('onBeforeClose')){
				beforeclose = this.executeMethod('onBeforeClose')	
			}
			if(beforeclose!==false){
				$L(th).find('.lyteDataTreeSubLevelTree')[0].setData('ltPropJsonData' , {})
				$L(th).removeClass('lyteJsonVrTreeOpened')
				$L(th).addClass('lyteJsonVrTreeClosed')
				if(this.getMethods('onClose')){
					this.executeMethod('onClose')	
				}
			}
		}
	},
	
	  openArrayTree : function(th,data,type){
		if(!data){
			return
		}
		if(data.length > 100){
			function chunkArray(arr, chunkSize) {
				const result = [];
				
				// Loop through the original array
				for (let i = 0; i < arr.length; i += chunkSize) {
				  // Slice the array starting at the current index (i) 
				  // and ending at i + chunkSize.
				  const chunk = arr.slice(i, i + chunkSize);
				  
				  // Push the resulting chunk into the final array
				  result.push(chunk);
				}
				
				return result;
			}

			var newArr = chunkArray(data, 100)
			data = newArr
		}
		if(type === 'array'){
			this.setData('showArrayInsideObject' ,true)
			if(data.length < 1){
				return
			}
		} else if(type === 'object'){
			this.setData('showObjectInsideObject' ,true)
			if(Object.keys(data).length < 1){
				return
			}
		}
		var th = $L(th).closest('.lyteJsonVrTreeNode')[0]
		if($L(th).hasClass('lyteJsonVrTreeClosed')){
			var beforeopen = true
			if(this.getMethods('onBeforeOpen')){
				beforeopen = this.executeMethod('onBeforeOpen' , data)	
			}
			if(beforeopen!==false){
				$L(th).find('.lyteDataTreeSubLevelTree')[0].setData('ltPropArrayData' , data)
				$L(th).removeClass('lyteJsonVrTreeClosed')
				$L(th).addClass('lyteJsonVrTreeOpened')
				if(this.getMethods('onOpen')){
					this.executeMethod('onOpen' , data)	
				}
			}
		} else {
			var beforeclose = true
			if(this.getMethods('onBeforeClose')){
				beforeclose = this.executeMethod('onBeforeClose')	
			}
			if(beforeclose!==false){
				$L(th).find('.lyteDataTreeSubLevelTree')[0].setData('ltPropArrayData' , [])
				$L(th).removeClass('lyteJsonVrTreeOpened')
				$L(th).addClass('lyteJsonVrTreeClosed')
				if(this.getMethods('onClose')){
					this.executeMethod('onClose')	
				}
			}
		}
	},
	expandTreeValue: function (element, value) { 
		if ($L(element).css('overflow') === "hidden") {
			$L(element).css("overflow", "unset")
		} else {
			$L(element).css("overflow", "hidden")
		}
	},
	showFullFunction: function (elem) { 
		this.setData('showFullFunction', true);
	},
	collapseFullFunction: function (elem) {
		this.setData('showFullFunction', false);
	},
	formatCodeSnippet : function(codeString , tabSize=2) {
		// Define the indentation string (e.g., two spaces)
		const indent = ' '.repeat(tabSize);

		// 1. Normalize the code: remove all existing newlines, tabs, and excess spaces.
		//    We treat the input as a single, messy line of code first.
		let normalized = codeString
			.replace(/\\n/g, ' ') // Replace raw \n with a space
			.replace(/\\t/g, ' ') // Replace raw \t with a space
			.replace(/\s+/g, ' ') // Replace any sequence of whitespace with a single space
			.trim();
	
		let output = '';
		let currentIndentLevel = 0;
	
		// 2. Iterate through the string character by character to re-indent
		for (let i = 0; i < normalized.length; i++) {
			const char = normalized[i];
			
			if (char === '{') {
				// Found an opening brace:
				output += ' ' + char + '\n' + indent.repeat(++currentIndentLevel);
			} else if (char === '}') {
				// Found a closing brace:
				output += '\n' + indent.repeat(--currentIndentLevel) + char;
				// Add a newline and indent if the next char is NOT the end of the string
				if (i < normalized.length - 1) {
					 output += '\n' + indent.repeat(currentIndentLevel);
				}
			} else if (char === ';') {
				// Found a semicolon: end of statement, add a newline and indent
				output += char + '\n' + indent.repeat(currentIndentLevel);
			} else if (char === ',' && normalized[i-1] === ' ') {
				// If the comma is followed by a space (like in function params), keep it simple
				output += char;
			} else if (char === ' ' && normalized[i-1] === ' ') {
				 // Skip double spaces
				 continue;
			}
			else {
				// Regular character: append it
				output += char;
			}
		}
	
		// 3. Final cleanup and return
		// Clean up any extra newlines or spaces at the beginning/end
		return output.trim();
	},
	actions : {
		openArray : function(th , data,type){
			this.openArrayTree(th , data,type);
		},
		openJson : function(th,data , type){
			this.openJsonTree(th , data , type)
		},
		expandValue: function (elem) { 
			this.expandTreeValue(elem)
		},
		toggleSuperLongString : function(th){
			$L(th).toggleClass("lyteJsonVrViewFullText")
		},

		expandAndCollapseFunction: function (elem , key , value) {
			$L(elem).find('lyte-function-parser')[0].setData('ltPropFunctionData' , key +' : '+value)
		},
		collapseFunction: function (elem) {
			this.setData('showFullFunction', false);
		}
	},
	methods : {
		onBeforeOpen : function(){},
		onOpen : function(){},
		onBeforeClose : function(){},
		onClose : function(){}
	}
});

