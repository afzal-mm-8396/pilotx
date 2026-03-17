Lyte.Component.register("lyte-sign", {
_template:"<template tag-name=\"lyte-sign\"> <lyte-button-group class=\"lyteSignSignature\" lt-prop-width=\"115.5px\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-button class=\"lyteSignSignatureValue\" lt-prop-value=\"button1\" onclick=\"{{action('onSignButtonClick',event,this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Signature </template> </lyte-button> <lyte-button class=\"lyteSignSignatureEdit\" onclick=\"{{action('signatureEdit',event,this)}}\" lt-prop-value=\"button2\"> <template is=\"registerYield\" yield-name=\"text\"> <i>i</i> </template> </lyte-button> </template> </lyte-button-group> <lyte-button-group class=\"lyteSignInitial\" lt-prop-width=\"115.5px\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-button class=\"lyteSignInitialValue\" lt-prop-value=\"button1\" onclick=\"{{action('onInitButtonClick',event,this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Initial </template> </lyte-button> <lyte-button class=\"lyteSignInitialEdit\" onclick=\"{{action('initialEdit',event,this)}}\" lt-prop-value=\"button2\"> <template is=\"registerYield\" yield-name=\"text\"> <i>i</i> </template> </lyte-button> </template> </lyte-button-group> <lyte-modal lt-prop-width=\"712px\" lt-prop-wrapper-class=\"lyteSignModalWrapper\" class=\"lyteSignModal\" on-before-close=\"{{method('closeModal')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header>Insert Signature</lyte-modal-header> <lyte-modal-content> <lyte-tabs class=\"lyteSignTab\" lt-prop-height=\"auto\" lt-prop=\" { &quot;position&quot; : { &quot;pos&quot; : &quot;left&quot; } } \" on-open=\"{{method('onTabOpen')}}\"> <template is=\"registerYield\" yield-name=\"tabYield\"> <lyte-tab-head> <lyte-tab-title lt-prop-id=\"tabs1\"> Type Text </lyte-tab-title> <lyte-tab-title lt-prop-id=\"tabs2\"> Draw Signature </lyte-tab-title> <lyte-tab-title lt-prop-id=\"tabs3\"> Capture As Photo </lyte-tab-title> <lyte-tab-title lt-prop-id=\"tabs4\"> Upload As Photo </lyte-tab-title> <lyte-tab-title lt-prop-id=\"tabs5\"> Zoho Sign </lyte-tab-title> </lyte-tab-head> <lyte-tab-body> <lyte-tab-content id=\"tabs1\"> <div class=\"lyteSignTabInnerContainer\"> <div class=\"lyteSignPreviewSection lyteSignTextInputSection\"> <lyte-input lt-prop-label=\"Signature\" lt-prop-label-class=\"lyteSignFieldLabel\" lt-prop-class=\"lyteSignFieldInput\" lt-prop-direction=\"vertical\" class=\"lyteSignSignatureInput\" lt-prop-value=\"{{ltPropDefaultSignatureInputValue}}\" after-render=\"{{method('signatureInputAfterRender')}}\" on-value-change=\"{{method('signatureInputChanged')}}\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"Type your signature here\"> </lyte-input> <lyte-input lt-prop-label=\"Initial\" lt-prop-label-class=\"lyteSignFieldLabel\" lt-prop-class=\"lyteSignFieldInput\" lt-prop-direction=\"vertical\" class=\"lyteSignInitialInput\" lt-prop-value=\"{{ltPropDefaultInitialInputValue}}\" after-render=\"{{method('initialInputAfterRender')}}\" on-value-change=\"{{method('initialInputChanged')}}\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"Type your initial here\"> </lyte-input> </div> <div class=\"lyteSignTextFontsPreviewSection\" onclick=\"{{action('selectFont',event,this)}}\"> <h3 class=\"lyteSignSectionLabel\">Choose</h3> <ul class=\"lyteSignFontsList\"> <li data-font=\"one\" data-family=\"Mr De Haviland\"> <canvas class=\"signatureCanvas\" data-family=\"Mr De Haviland\" width=\"230\" height=\"50\"></canvas> <canvas class=\"initialCanvas\" data-family=\"Mr De Haviland\" width=\"110\" height=\"50\"></canvas> </li> <li data-font=\"two\" data-family=\"Qwigley\"> <canvas class=\"signatureCanvas\" data-family=\"Qwigley\" width=\"230\" height=\"50\"></canvas> <canvas class=\"initialCanvas\" data-family=\"Qwigley\" width=\"110\" height=\"50\"></canvas> </li> <li data-font=\"three\" data-family=\"Sacramento\"> <canvas class=\"signatureCanvas\" data-family=\"Sacramento\" width=\"230\" height=\"50\"></canvas> <canvas class=\"initialCanvas\" data-family=\"Sacramento\" width=\"110\" height=\"50\"></canvas> </li> <li data-font=\"four\" data-family=\"Dancing Script\"> <canvas class=\"signatureCanvas\" data-family=\"Dancing Script\" width=\"230\" height=\"50\"></canvas> <canvas class=\"initialCanvas\" data-family=\"Dancing Script\" width=\"110\" height=\"50\"></canvas> </li> <li data-font=\"five\" data-family=\"Montez\"> <canvas class=\"signatureCanvas\" data-family=\"Montez\" width=\"230\" height=\"50\"></canvas> <canvas class=\"initialCanvas\" data-family=\"Montez\" width=\"110\" height=\"50\"></canvas> </li> </ul> </div> </div> </lyte-tab-content> <lyte-tab-content id=\"tabs2\"> <div class=\"lyteSignTabInnerContainer\"> <div class=\"lyteSignPreviewSection lyteSignDrawSignPreviewSection\"> <div class=\"lyteSignCanvasPreviewColumn\"> <h3 class=\"lyteSignSectionLabel\">Signature</h3> <div class=\"lyteSignSignatureCanvasWrap lyteSignCanvasSignatureColumn\"> <p class=\"lyteSignCanvasPlaceholder lyteSignSignaturePlaceholder\" onclick=\"{{action('activateCanvasWrapper',event,this,'signature')}}\"> Click here to draw your signature </p> <lyte-signature class=\"lyteSignSignatureElem lyteSignImageHidden\" lt-prop-insert-stroke=\"{{ltPropDrawCanvasInsertStroke}}\" lt-prop-insert-line-width=\"{{ltPropDrawCanvasLineWidth}}\" lt-prop-insert-line-dash=\"{{ltPropDrawCanvasLineDash}}\"> </lyte-signature> <span class=\"lyteSignClearSignature lyteSignClearButton lyteSignImageHidden\" onclick=\"{{action('clearSignatureQueue',event,'signature')}}\"></span> </div> </div> <div class=\"lyteSignCanvasPreviewColumn\"> <h3 class=\"lyteSignSectionLabel\">Initial</h3> <div class=\"lyteSignSignatureCanvasWrap lyteSignCanvasInitialColumn\"> <p class=\"lyteSignCanvasPlaceholder lyteSignInitialPlaceholder\" onclick=\"{{action('activateCanvasWrapper',event,this,'initial')}}\"> Click here to draw your initial </p> <lyte-signature class=\"lyteSignInitialElem lyteSignImageHidden\" lt-prop-insert-stroke=\"{{ltPropDrawCanvasInsertStroke}}\" lt-prop-insert-line-width=\"{{ltPropDrawCanvasLineWidth}}\" lt-prop-insert-line-dash=\"{{ltPropDrawCanvasLineDash}}\"> </lyte-signature> <span class=\"lyteSignClearSignature lyteSignClearButton lyteSignImageHidden\" onclick=\"{{action('clearSignatureQueue',event,'initial')}}\"></span> </div> </div> </div> <div class=\"options\"> <h3 class=\"lyteSignSectionLabel\">Signature Color</h3> <lyte-button-group style=\"display: inline-block;\" lt-prop-width=\"150px\" lt-prop-type=\"radiobutton\" on-select=\"{{method('changeStrokeColor')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-button class=\"lyteSignSignatureColorButton\" lt-prop-value=\"black\"> <template is=\"registerYield\" yield-name=\"text\"> <span class=\"lyteSignSignatureColorButtonIndicator\" style=\"--lyte-sign-signature-color: #000\"></span> </template> </lyte-button> <lyte-button class=\"lyteSignSignatureColorButton\" lt-prop-value=\"red\"> <template is=\"registerYield\" yield-name=\"text\"> <span class=\"lyteSignSignatureColorButtonIndicator\" style=\"--lyte-sign-signature-color: #fb7175\"></span> </template> </lyte-button> <lyte-button class=\"lyteSignSignatureColorButton\" lt-prop-value=\"blue\"> <template is=\"registerYield\" yield-name=\"text\"> <span class=\"lyteSignSignatureColorButtonIndicator\" style=\"--lyte-sign-signature-color: #428ff2\"></span> </template> </lyte-button> </template> </lyte-button-group> <lyte-dropdown class=\"lyteSignStrokeSizeDropdown\" on-option-selected=\"{{method('changeStrokeSize')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <div class=\"lyteSignSampleStrokesIcon\"> <div class=\"lyteSignSampleStrokeThin\"></div> <div class=\"lyteSignSampleStrokeNormal\"></div> <div class=\"lyteSignSampleStrokeThick\"></div> </div> <lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"lyteSignStrokeSampleDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{signatureStrokeSize}}\" item=\"item\" index=\"indexVal\"> <lyte-drop-item data-value=\"{{item}}\"> <div class=\"lyteSignSampleStrokeElem\" style=\"--lyte-sign-sample-stroke-size: {{item}}\"></div> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-dropdown class=\"lyteSignSampleStrokeStyleDropdown\" on-option-selected=\"{{method('changeStrokeStyle')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <div class=\"lyteSignSampleStrokesIcon\"> <div class=\"lyteSignSampleStrokeSolid\"></div> <div class=\"lyteSignSampleStrokeDashed\"> <span class=\"lyteSignSampleStrokeDashedSpan\"></span> <span class=\"lyteSignSampleStrokeDashedSpan\"></span> <span class=\"lyteSignSampleStrokeDashedSpan\"></span> </div> <div class=\"lyteSignSampleStrokeDotted\"> <span class=\"lyteSignSampleStrokeDottedSpan\"></span> <span class=\"lyteSignSampleStrokeDottedSpan\"></span> <span class=\"lyteSignSampleStrokeDottedSpan\"></span> </div> </div> <lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"lyteSignStrokeSampleDropbox\"> <lyte-drop-body> <lyte-drop-item data-value=\"solid\"> <div class=\"lyteSignSampleStrokeStyleSolid\"></div> </lyte-drop-item> <lyte-drop-item data-value=\"dashed\"> <div class=\"lyteSignSampleStrokeStyleDashed\"></div> </lyte-drop-item> <lyte-drop-item data-value=\"dotted\"> <div class=\"lyteSignSampleStrokeStyleDotted\"></div> </lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </div> </lyte-tab-content> <lyte-tab-content id=\"tabs3\"> <div class=\"lyteSignTabInnerContainer\"> <div class=\"lyteSignPreviewSection lyteSignCaptureSection\"> <div class=\"lyteSignSignatureColumn lyteSignCaptureSignatureSection\"> <h3 class=\"lyteSignSectionLabel\">Signature</h3> <div class=\"lyteSignPreviewArea\"> <div class=\"lyteSignCaptureSectionPlaceholder\" onclick=\"{{action('captureImage',event,this,'signature')}}\"> Click here to capture a photo for signature </div> <div class=\"lyteSignCapturePreviewSection lyteSignImageHidden\"> <video class=\"lyteSignCaptureVideoElem\" id=\"video\" autoplay=\"\"></video> <lyte-button class=\"lyteSignTakeSnap\" lt-prop-text=\"Take Snap\" onclick=\"{{action('takeSnapHandler',this,'signature')}}\"></lyte-button> <canvas id=\"canvas\" style=\"display: none;\"></canvas> <img class=\"lyteSignImageHidden lyteSignCaptureSignatureImagePreview\" id=\"signPhoto\" src=\"\" alt=\"Captured Photo\"> <span class=\"clearSnapImg lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearSnap',event,'signature',this)}}\"></span> </div> </div> </div> <div class=\"lyteSignInitialColumn lyteSignCaptureInitialSection\"> <h3 class=\"lyteSignSectionLabel\">Initial</h3> <div class=\"lyteSignPreviewArea\"> <div class=\"lyteSignCaptureSectionPlaceholder\" onclick=\"{{action('captureImage',event,this,'initial')}}\"> Click here to capture a photo for initial </div> <div class=\"lyteSignCapturePreviewSection lyteSignImageHidden\"> <video class=\"lyteSignCaptureVideoElem\" id=\"videoInitial\" autoplay=\"\"></video> <lyte-button class=\"lyteSignTakeSnap\" lt-prop-text=\"Take Snap\" onclick=\"{{action('takeSnapHandler',this,'initial')}}\"></lyte-button> <canvas id=\"canvasInitial\" style=\"display: none;\"></canvas> <img class=\"lyteSignImageHidden lyteSignCaptureSignatureImagePreview\" id=\"initialPhoto\" src=\"\" alt=\"Captured Photo\"> <span class=\"clearSnapImg lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearSnap',event,'initial',this)}}\"></span> </div> </div> </div> </div> </div> </lyte-tab-content> <lyte-tab-content id=\"tabs4\"> <div class=\"lyteSignTabInnerContainer\"> <div class=\"lyteSignPreviewSection lyteSignUploadSection\"> <div class=\"lyteSignSignatureColumn lyteSignUploadSignatureSection\"> <h3 class=\"lyteSignSectionLabel\">Signature</h3> <div class=\"lyteSignPreviewArea\"> <lyte-fileupload lt-prop-thumb=\"true\" lt-prop-yield=\"true\" class=\"lyteSignSignatureUpload\" lt-prop-multiple=\"false\" lt-prop-accept=\"image/png,image/jpeg,image/jpg\" lt-prop-message=\"Choose Image\" lt-prop-appearance=\"btn\" on-add=\"{{method('onFileUploadAdd','signature',this)}}\"> <template is=\"registerYield\" yield-name=\"file\"> <lyte-file-select-area> <lyte-file-message class=\"lyteFileUpdMsgWrap {{if(queueList.length,'lyteHide','')}}\"> <span class=\"lyteFileUpdMsg\">Choose Image</span> </lyte-file-message> <div class=\"lyteFileUpdList\"> <template is=\"for\" items=\"{{queueList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile {{concat('lyteFile',lyteUiCapitalizeName(item.status))}}\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{item.src}}\"><template case=\"true\"> <img class=\"lyteSignUploadImagePreview\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <div class=\"lyteFileUpdFileStatus\" data-completed=\"{{item.percentage}}\"> <div class=\"lyteFileUpdProgressBar\"> <div class=\"lyteFileUpdProgressFill\" style=\"width:{{item.percentage}}%\"> </div> </div> </div> <template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <lyte-file-retry data-value=\"{{item.id}}\"> <span class=\"lyteFileUpdFailMsg\"> Failed </span> <span class=\"lyteFileUpdRetryMsg\"> Retry </span> </lyte-file-retry> </template></template> </div> </template> </div> </lyte-file-select-area> </template> </lyte-fileupload> <span class=\"lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearUpload',event,'signature',this)}}\"></span> </div> </div> <div class=\"lyteSignInitialColumn lyteSignUploadInitialSection\"> <h3 class=\"lyteSignSectionLabel\">Initial</h3> <div class=\"lyteSignPreviewArea\"> <lyte-fileupload lt-prop-thumb=\"true\" lt-prop-yield=\"true\" class=\"lyteSignInitialUpload\" lt-prop-multiple=\"false\" lt-prop-accept=\"image/png,image/jpeg,image/jpg\" lt-prop-message=\"Choose Image\" lt-prop-appearance=\"btn\" on-add=\"{{method('onFileUploadAdd','initial',this)}}\"> <template is=\"registerYield\" yield-name=\"file\"> <lyte-file-select-area> <lyte-file-message class=\"lyteFileUpdMsgWrap {{if(queueList.length,'lyteHide','')}}\"> <span class=\"lyteFileUpdMsg\">Choose Image</span> </lyte-file-message> <div class=\"lyteFileUpdList\"> <template is=\"for\" items=\"{{queueList}}\" item=\"item\" index=\"index\"> <div class=\"lyteFileUpdListFile {{concat('lyteFile',lyteUiCapitalizeName(item.status))}}\"> <div class=\"lyteFileUpdTypePreview\"> <template is=\"if\" value=\"{{item.src}}\"><template case=\"true\"> <img class=\"lyteSignUploadImagePreview\" src=\"{{item.src}}\"> </template><template case=\"false\"> <span class=\"lyteFileUpdTypeIcon {{item.fileType}}\"></span> </template></template> </div> <div class=\"lyteFileUpdFileStatus\" data-completed=\"{{item.percentage}}\"> <div class=\"lyteFileUpdProgressBar\"> <div class=\"lyteFileUpdProgressFill\" style=\"width:{{item.percentage}}%\"> </div> </div> </div> <template is=\"if\" value=\"{{expHandlers(item.status,'==',&quot;error&quot;)}}\"><template case=\"true\"> <lyte-file-retry data-value=\"{{item.id}}\"> <span class=\"lyteFileUpdFailMsg\"> Failed </span> <span class=\"lyteFileUpdRetryMsg\"> Retry </span> </lyte-file-retry> </template></template> </div> </template> </div> </lyte-file-select-area> </template> </lyte-fileupload> <span class=\"lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearUpload',event,'initial',this)}}\"></span> </div> </div> </div> </div> </lyte-tab-content> <lyte-tab-content id=\"tabs5\"> <lyte-yield yield-name=\"zohosigncontent\"></lyte-yield> <div class=\"lyteSignTabInnerContainer\"> <div class=\"lyteSignPreviewSection lyteSignZohoSignSection\"> <div class=\"lyteSignSignatureColumn lyteSignZohoSignSignatureSection\"> <h3 class=\"lyteSignSectionLabel\">Signature</h3> <div class=\"lyteSignPreviewArea\"> <img class=\"lyteSignZohoSignSignatureImage\" alt=\"Signature Image\"> <span class=\"lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearZohoSignImage',event,'signature',this)}}\"></span> </div> </div> <div class=\"lyteSignInitialColumn lyteSignZohoSignInitialSection\"> <h3 class=\"lyteSignSectionLabel\">Initial</h3> <div class=\"lyteSignPreviewArea\"> <img class=\"lyteSignZohoSignInitialImage\" alt=\"Initial Image\"> <span class=\"lyteSignImageHidden lyteSignClearSignature lyteSignClearButton\" onclick=\"{{action('clearZohoSignImage',event,'initial',this)}}\"></span> </div> </div> </div> </div> </lyte-tab-content> </lyte-tab-body> </template> </lyte-tabs> </lyte-modal-content> <lyte-modal-footer class=\"lyteSignModalFooter right\"> <template is=\"if\" value=\"{{expHandlers(currentLyteSignTab,'===',&quot;tabs5&quot;)}}\"><template case=\"true\"> <lyte-button class=\"lyteSignEditZohoSignButton\" lt-prop-text=\"Edit in Zoho Sign\" onclick=\"{{action('editZohoSign',event,this)}}\"></lyte-button> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(currentLyteSignTab,'!==',&quot;tabs1&quot;)}}\"><template case=\"true\"> <lyte-button class=\"lyteSignClearAllButton\" lt-prop-text=\"Clear All\" onclick=\"{{action('clearAll',event,this)}}\"></lyte-button> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(isSaveButtonDisabled,'==',true),'&amp;&amp;',expHandlers(currentLyteSignTab,'!=','tabs5'))}}\"><template case=\"true\"> <lyte-button class=\"lyteSignSaveButton\" lt-prop-disabled=\"true\" lt-prop-appearance=\"primary\" onclick=\"{{action('save',event,this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{footerButtonPlaceholder}} </template> </lyte-button> </template><template case=\"false\"> <lyte-button class=\"lyteSignSaveButton\" lt-prop-appearance=\"primary\" onclick=\"{{action('save',event,this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{footerButtonPlaceholder}} </template> </lyte-button> </template></template> <lyte-button onclick=\"{{action('cancel',event,this)}}\"> <template is=\"registerYield\" yield-name=\"text\"> Cancel </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> </template>",
_dynamicNodes : [{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1,9]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1,1]},{"type":"attr","position":[3,1,1,1,3]},{"type":"componentDynamic","position":[3,1,1,1,3]},{"type":"attr","position":[3,1,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3,1,1,1,3,1]},{"type":"attr","position":[3,3,1,1,1,3,3]},{"type":"componentDynamic","position":[3,3,1,1,1,3,3]},{"type":"attr","position":[3,3,1,1,1,3,5]},{"type":"attr","position":[3,3,1,1,3,3,1]},{"type":"attr","position":[3,3,1,1,3,3,3]},{"type":"componentDynamic","position":[3,3,1,1,3,3,3]},{"type":"attr","position":[3,3,1,1,3,3,5]},{"type":"attr","position":[3,3,1,3,3]},{"type":"registerYield","position":[3,3,1,3,3,1],"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]},{"type":"registerYield","position":[3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3]},{"type":"registerYield","position":[5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[3,3,1,3,3]},{"type":"attr","position":[3,3,1,3,5]},{"type":"registerYield","position":[3,3,1,3,5,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-sign-sample-stroke-size: '","item"]}}}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,3,1,3,5]},{"type":"attr","position":[3,3,1,3,7]},{"type":"registerYield","position":[3,3,1,3,7,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1,1]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,5]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,3,1,3,7]},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5,1,1,1,3,1]},{"type":"attr","position":[3,5,1,1,1,3,3,3]},{"type":"componentDynamic","position":[3,5,1,1,1,3,3,3]},{"type":"attr","position":[3,5,1,1,1,3,3,9]},{"type":"attr","position":[3,5,1,1,3,3,1]},{"type":"attr","position":[3,5,1,1,3,3,3,3]},{"type":"componentDynamic","position":[3,5,1,1,3,3,3,3]},{"type":"attr","position":[3,5,1,1,3,3,3,9]},{"type":"componentDynamic","position":[3,5]},{"type":"attr","position":[3,7,1,1,1,3,1]},{"type":"registerYield","position":[3,7,1,1,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","item.percentage","'%'"]}}}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,7,1,1,1,3,1]},{"type":"attr","position":[3,7,1,1,1,3,3]},{"type":"attr","position":[3,7,1,1,3,3,1]},{"type":"registerYield","position":[3,7,1,1,3,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","item.percentage","'%'"]}}}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,7,1,1,3,3,1]},{"type":"attr","position":[3,7,1,1,3,3,3]},{"type":"componentDynamic","position":[3,7]},{"type":"insertYield","position":[3,9,1]},{"type":"attr","position":[3,9,3,1,1,3,3]},{"type":"attr","position":[3,9,3,1,3,3,3]},{"type":"componentDynamic","position":[3,9]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5,5]},{"type":"registerYield","position":[5,5,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[5,5]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["ltPropDrawCanvasInsertStroke","ltPropDrawCanvasLineWidth","ltPropDrawCanvasLineDash","ltPropDefaultSignatureInputValue","ltPropDefaultInitialInputValue","initialInputValue","signatureInputValue","imageCapture","cameraStream","signatureSnapDataUrl","initialSnapDataUrl","signatureUploadBlobUrl","initialUploadBlobUrl","ltPropFontsDivSelectedClass","signatureStrokeSize","currentLyteSignTab","ltPropSignatureData","ltPropInitialData","footerButtonPlaceholder","isSaveButtonDisabled"],
_observedAttributesType :["string","number","array","string","string","string","string","object","object","string","string","string","string","string","array","string","object","object","string","boolean"],

	data : function(){
		return {

			'ltPropDrawCanvasInsertStroke': Lyte.attr( 'string', { default : 'black'} ),
			'ltPropDrawCanvasLineWidth': Lyte.attr( 'number', { default : 1} ),
			'ltPropDrawCanvasLineDash': Lyte.attr( 'array', { default : []} ),
			'ltPropDefaultSignatureInputValue': Lyte.attr( 'string', { default : 'John Doe'} ),
			'ltPropDefaultInitialInputValue': Lyte.attr( 'string', { default : 'J D'} ),
			'initialInputValue': Lyte.attr( 'string' ),
			'signatureInputValue': Lyte.attr( 'string' ),
			'imageCapture': Lyte.attr( 'object', { default : null} ),
			'cameraStream': Lyte.attr( 'object', { default : null } ),
			'signatureSnapDataUrl': Lyte.attr( 'string', { default : null } ),
			'initialSnapDataUrl': Lyte.attr( 'string', { default : null } ),
			'signatureUploadBlobUrl': Lyte.attr( 'string', { default : null } ),
			'initialUploadBlobUrl': Lyte.attr( 'string', { default : null } ),
			'ltPropFontsDivSelectedClass': Lyte.attr( 'string', { default : 'lyteSignFontSelected'} ),
			'signatureStrokeSize': Lyte.attr("array", {default: [1, 2, 3, 4, 5, 6, 7, 8, 9]}),
			'currentLyteSignTab': Lyte.attr('string', { default: 'tabs1' }),
			'ltPropSignatureData': Lyte.attr( 'object', { default : null } ),
			'ltPropInitialData': Lyte.attr( 'object', { default : null } ),
			'footerButtonPlaceholder': Lyte.attr( 'string', { default : 'Insert' } ),
			'isSaveButtonDisabled': Lyte.attr( 'boolean', { default : false } )
		} 
	},
	didConnect: function(){
		// this._tabs = this.$node.querySelector('lyte-tabs');
		// this.captureImage();
	},
	actions : {
		clearZohoSignImage: function( event, param, _this ){
			var modalDiv = $L(event.target).closest('div.lyteModal')[0];
			var tabContent = modalDiv.querySelector('lyte-tab-content#tabs5');	
			var className = param == 'signature' ? '.signatureImg' : '.initialImg';
			var img = tabContent.querySelector('img'+className);
			if( img ){
				img.src = '';
			}
		},
		clearAll: function( event, _this ){
			var modalDiv = $L(_this).closest('div.lyteModal')[0];
			var currentLyteSignTab = this.getData('currentLyteSignTab');
			var curTab = modalDiv.querySelector('lyte-tab-content#' + currentLyteSignTab );
			var spans = curTab.querySelectorAll('.lyteSignClearButton');

			var methodMaps = {
				'tabs2': 'clearSignatureQueue',
				'tabs3': 'clearSnap',
				'tabs4': 'clearUpload',
				'tabs5': 'clearZohoSignImage'
			};

			var actionName = methodMaps[currentLyteSignTab];
				if( actionName ){
					if( spans[0] ){
						this.actions[actionName].call( this, event, 'signature', spans[0] );
					}
					if( spans[1] ){
						this.actions[actionName].call( this, event, 'initial', spans[1] );
					}
				}
		},
		clearUpload: function( event, param, _this ){
			var modalDiv = $L(event.target).closest('div.lyteModal')[0];
			var tabContent = modalDiv.querySelector('lyte-tab-content#tabs4');	
			var className = param == 'signature' ? '.lyteSignSignatureUpload' : '.lyteSignInitialUpload';	
			var fileUpload = tabContent.querySelector('lyte-fileupload'+className);
			if( fileUpload ){
				fileUpload.removeUpload();
			}

			var f1 = tabContent.querySelector('lyte-fileupload.lyteSignSignatureUpload');
			var f2 = tabContent.querySelector('lyte-fileupload.lyteSignInitialUpload');

			if(f1 && !f1.getData('ltPropFiles') || !f1.getData('ltPropFiles').length) {
				f1.parentElement.querySelector('.lyteSignClearButton').classList.add('lyteSignImageHidden');
			}
			if(f2 && !f2.getData('ltPropFiles') || !f2.getData('ltPropFiles').length) {
				f2.parentElement.querySelector('.lyteSignClearButton').classList.add('lyteSignImageHidden');
			}
			if( f1 && f2 ){
				if( this.getData('isSaveButtonDisabled') && ( ( f1.getData('ltPropFiles') && f1.getData('ltPropFiles').length) || ( f2.getData('ltPropFiles') && f2.getData('ltPropFiles').length) ) ){
					this.setData('isSaveButtonDisabled', false);
				}
				else if( !this.getData('isSaveButtonDisabled') && ( ( !f1.getData('ltPropFiles') || !f1.getData('ltPropFiles').length) && ( !f2.getData('ltPropFiles') || !f2.getData('ltPropFiles').length) ) ){
					this.setData('isSaveButtonDisabled', true);
				}
			}
			
		},
		editZohoSign: function( event, _this ){
			if( this.getMethods('onEditZohoSign') ){
				this.executeMethod('onEditZohoSign', event, _this);
			}
		},
		selectFont: function( event, _this ){
			var fontsDiv = _this;
			var sign = this;
			var classToAdd = sign.getData('ltPropFontsDivSelectedClass');
			if( !fontsDiv ){
				return;
			}

			var li = $L( event.target ).closest( 'li' )[ 0 ];
			if( !li || !fontsDiv.contains( li ) ){
				return;
			}

			var previouslySelected = fontsDiv.querySelectorAll( 'li.' + classToAdd );
			previouslySelected.forEach( function( node ){
				node.classList.remove( classToAdd );
			});

			li.classList.add( classToAdd );
		},
		clearSignatureQueue: function( event, param ){
			if( event && typeof event.stopPropagation === 'function' ){
				event.stopPropagation();
			}
			var modalDiv = $L(event.target).closest('div.lyteModal')[0];
			var tabContent = modalDiv.querySelector('lyte-tab-content#tabs2'), sign;
			var className = param == 'signature' ? 'lyteSignSignatureElem' : 'lyteSignInitialElem';

			if( tabContent ){
				sign = tabContent.querySelector('lyte-signature'+'.'+className);
			}

			var placeholder = sign.parentElement.querySelector('.lyteSignCanvasPlaceholder');
			var clearButton = sign.parentElement.querySelector('.lyteSignClearButton');

			if( sign ){
				sign.clear();
				sign.reset();
			}
			this.toggleCanvasPlaceholderVisibility( param, placeholder, sign, clearButton, false );

			var par = $L(sign).closest(".lyteSignDrawSignPreviewSection")[0], signPlaceholder, initPlaceholder, isSignPlaceholderVisible, isInitPlaceholderVisible;
			if( par ){
				signPlaceholder = par.querySelector('.lyteSignSignaturePlaceholder');
				isSignPlaceholderVisible = signPlaceholder && !signPlaceholder.classList.contains('lyteSignImageHidden');
				initPlaceholder = par.querySelector('.lyteSignInitialPlaceholder');
				isInitPlaceholderVisible = initPlaceholder && !initPlaceholder.classList.contains('lyteSignImageHidden');
			}

			if( !this.getData('isSaveButtonDisabled') && isSignPlaceholderVisible && isInitPlaceholderVisible ){
				this.setData('isSaveButtonDisabled', true);
			}
			
		},
		activateCanvasWrapper: function( event, wrapper, type ){
			if( event && typeof event.stopPropagation === 'function' ){
				event.stopPropagation();
			}

			if( !wrapper ){
				return;
			}

			var canvas = wrapper.parentElement.querySelector('lyte-signature');
			var clearButton = wrapper.parentElement.querySelector('.lyteSignClearButton');
			
			this.toggleCanvasPlaceholderVisibility( type, wrapper, canvas, clearButton, true );

			if( this.getData('isSaveButtonDisabled') ){
				this.setData('isSaveButtonDisabled', false);
			}
		},
		signatureEdit: function( event, _this ){
			this.setData('footerButtonPlaceholder', 'Save');
			this.$node.querySelector('.lyteSignModal').setData('ltPropShow',true);
		},

		initialEdit: function( event, _this ){
			this.setData('footerButtonPlaceholder', 'Save');
			this.$node.querySelector('.lyteSignModal').setData('ltPropShow',true);
		},
		captureImage: function( event, _this, param ){
			var permissionBtn = event.target;
			var isSignBtn = param.includes('sign');
			var videoId = isSignBtn ? 'video' : 'videoInitial';
			var videoEl = document.getElementById( videoId );
			var mediaStream = this.getData('cameraStream');
			var imageCapture = this.getData('imageCapture');

			if( mediaStream && videoEl && !videoEl.srcObject ){
				videoEl.srcObject = mediaStream;
			}

			if( imageCapture ){
				this.takeSnap( permissionBtn, imageCapture, isSignBtn );
				return;
			}

			navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			})
			.then((mediaStream) => {
				this.setData('cameraStream', mediaStream);
				if( videoEl ){
					videoEl.srcObject = mediaStream;
				}
				var track = mediaStream.getVideoTracks()[0];
				
				// Check if ImageCapture is supported
				if( typeof ImageCapture !== 'undefined' ){
					try {
						imageCapture = new ImageCapture(track);
						imageCapture.track = track;
						this.setData('imageCapture', imageCapture);
					} catch( error ){
						console.warn('ImageCapture not supported, using video capture fallback', error);
						// Create a fallback object that uses video element for capture
						imageCapture = {
							track: track,
							isVideoFallback: true
						};
						this.setData('imageCapture', imageCapture);
					}
				} else {
					console.warn('ImageCapture API not available, using video capture fallback');
					// Create a fallback object that uses video element for capture
					imageCapture = {
						track: track,
						isVideoFallback: true
					};
					this.setData('imageCapture', imageCapture);
				}

				this.takeSnap( permissionBtn, imageCapture, isSignBtn );
			})
			.catch((error) => {
				console.log('Error accessing media devices.', error);
				return;
			});
		},
		clearSnap: function( event, param, _this ){
			var modalDiv = $L(event.target).closest('div.lyteModal')[0];
			var section = modalDiv.querySelector('lyte-tab-content#tabs3');
			if( !section ){
				return;
			}

			var isSignature = param === 'signature';
			var video = section.querySelector( isSignature ? '#video' : '#videoInitial' );
			var img = section.querySelector( isSignature ? '#signPhoto' : '#initialPhoto' );
			var which = video ? video : img, takeSnapBtn;
			if( which ){
				var sec = $L(which).closest('.lyteSignCapturePreviewSection')[0];
				takeSnapBtn = sec && sec.querySelector('.lyteSignTakeSnap');
			}

			if( img ){
				img.classList.add('lyteSignImageHidden');
				img.src = '';
				_this.classList.add('lyteSignImageHidden');
			}

			if( video ){
				video.classList.remove('lyteSignImageHidden');
				if( video.srcObject ){
					video.play().catch(function(){});
				}
			}

			if( takeSnapBtn ){
				takeSnapBtn.classList.remove('lyteSignImageHidden');
			}

			this.setData( isSignature ? 'signatureSnapDataUrl' : 'initialSnapDataUrl', null );

			if( !this.getData('isSaveButtonDisabled') ){
				var img1 = section.querySelector('img#signPhoto');
				var img2 = section.querySelector('img#initialPhoto');
				if( img1.classList.contains('lyteSignImageHidden') && img2.classList.contains('lyteSignImageHidden') ){
					this.setData('isSaveButtonDisabled', true);
				}
			}
		},
		onSignButtonClick: function( event, _this ){
			var signatureData = this.getData('ltPropSignatureData');
			if( !signatureData ){
				this.$node.querySelector('.lyteSignModal').setData('ltPropShow',true);
			}

			if( this.getMethods('onSignatureButtonClick') ){
				this.executeMethod('onSignatureButtonClick', event, _this, signatureData);
			}
		},
		onInitButtonClick: function( event, _this ){
			var initialData = this.getData('ltPropInitialData');
			if( !initialData ){
				this.$node.querySelector('.lyteSignModal').setData('ltPropShow',true);
			}
			
			if( this.getMethods('onInitialButtonClick') ){
				this.executeMethod('onInitialButtonClick', event, _this, initialData);
			}
		},
		save: function( event, btn ){
			var modal = this.$node.querySelector('lyte-modal');
			var childModal = modal.component.childComp;
			var tabs = childModal.querySelector('lyte-tabs');
			var curTab = tabs.getData('ltPropCurrentTab');
			var signData = {}, initData = {};

			switch( curTab.id ){
				case 'tabs1':
					var currentSignature = this.getData('signatureInputValue');
					var currentInitial = this.getData('initialInputValue');

					signData.type = 'tabs1';
					initData.type = 'tabs1';

					signData.inputValue = currentSignature ? currentSignature : this.getData('ltPropDefaultSignatureInputValue');
					initData.inputValue = currentInitial ? currentInitial : this.getData('ltPropDefaultInitialInputValue');

					var div = childModal.querySelector('div.lyteSignTextFontsPreviewSection');
					var sel = div.querySelector('li.' + this.getData('ltPropFontsDivSelectedClass'));
					if( sel ){
						signData.selectedFont = sel.getAttribute('data-font');
						signData.selectedFamily = sel.getAttribute('data-family');
						initData.selectedFont = sel.getAttribute('data-font');
						initData.selectedFamily = sel.getAttribute('data-family');
					}
					break;

				case 'tabs2':
					var tabContent = childModal.querySelector('lyte-tab-content#tabs2');
					var signSignature = tabContent.querySelector('lyte-signature.lyteSignSignatureElem');
					var initSignature = tabContent.querySelector('lyte-signature.lyteSignInitialElem');
					var signCanvas = signSignature ? signSignature.querySelector('canvas') : null;
					var initCanvas = initSignature ? initSignature.querySelector('canvas') : null;
					var signPlaceholder = tabContent.querySelector('.lyteSignSignaturePlaceholder');
					var initPlaceholder = tabContent.querySelector('.lyteSignInitialPlaceholder');

					signData.type = 'tabs2';
					initData.type = 'tabs2';

					signData.url = null;
					initData.url = null;

					if( signCanvas && signPlaceholder && signPlaceholder.classList.contains('lyteSignImageHidden') ){
						signData.url = signCanvas.toDataURL();
					}

					if( initCanvas && initPlaceholder && initPlaceholder.classList.contains('lyteSignImageHidden') ){
						initData.url = initCanvas.toDataURL();
					}

					break;


				case 'tabs3':
					var signImg = childModal.querySelector('lyte-tab-content#tabs3 img#signPhoto');
					var initImg = childModal.querySelector('lyte-tab-content#tabs3 img#initialPhoto');
					var signatureUrl = this.getData('signatureSnapDataUrl');
					var initialUrl = this.getData('initialSnapDataUrl');

					signData.type = 'tabs3';
					initData.type = 'tabs3';

					if( !signatureUrl && signImg && signImg.src ){
						signatureUrl = signImg.src;
					}

					if( !initialUrl && initImg && initImg.src ){
						initialUrl = initImg.src;
					}

					signData.imageUrl = signatureUrl;
					initData.imageUrl = initialUrl;
					
					break;


				case 'tabs4':
					var signUploadComp = childModal.querySelector('lyte-tab-content#tabs4 lyte-fileupload.lyteSignSignatureUpload');
					var initUploadComp = childModal.querySelector('lyte-tab-content#tabs4 lyte-fileupload.lyteSignInitialUpload');
					var signatureFiles = signUploadComp ? signUploadComp.getData('ltPropFiles') : null;
					var initialFiles = initUploadComp ? initUploadComp.getData('ltPropFiles') : null;
					var signaturePayload = this._prepareUploadPayload( signatureFiles, 'signatureUploadBlobUrl' );
					var initialPayload = this._prepareUploadPayload( initialFiles, 'initialUploadBlobUrl' );

					signData.type = 'tabs4';
					initData.type = 'tabs4';
					
					signData.fileUpload = signaturePayload;
					initData.fileUpload = initialPayload;
					signData.fileUploadBlobUrl = signaturePayload ? signaturePayload.blobUrl : null;
					initData.fileUploadBlobUrl = initialPayload ? initialPayload.blobUrl : null;
					break;

				case 'tabs5':
					signData.type = 'tabs5';
					initData.type = 'tabs5';

					var signZohoImg = childModal.querySelector('lyte-tab-content#tabs5 img.signatureImg');
					var initZohoImg = childModal.querySelector('lyte-tab-content#tabs5 img.initialImg');

					signData.url = signZohoImg ? signZohoImg.src : null;
					initData.url = initZohoImg ? initZohoImg.src : null;
					break;
			}

			if( this.getMethods('onSave') ){
				this.executeMethod('onSave', curTab, event, this, btn, signData, initData );
			}

			this.setData('ltPropSignatureData', signData);
			this.setData('ltPropInitialData', initData);

			var modal = this.$node.querySelector('lyte-modal');
			modal.setData('ltPropShow', false);

			if( this.getData('footerButtonPlaceholder') === 'Insert' ){
				this.setData('footerButtonPlaceholder', 'Save');
			}

			this.clearAllInputs( modal );
		},
		cancel: function( event, btn ){
			var modal = this.$node.querySelector('lyte-modal');
			var childModal = modal.component.childComp;
			var tabs = childModal.querySelector('lyte-tabs');
			var curTab = tabs.getData('ltPropCurrentTab');

			if( this.getMethods('onCancel') ){
				this.executeMethod('onCancel', curTab, event, this, btn );
			}

			modal.setData('ltPropShow', false);

			this.clearAllInputs( modal );
		},
		takeSnapHandler: function( takeSnap, param  ){
			var imageCapture = this.getData('imageCapture');
			var isSignBtn = param === 'signature';
			if( !imageCapture ){
				return;
			}

			var takeSnapParent = takeSnap.parentElement;
			var videoTag = takeSnapParent.querySelector('video');
			var canvas = takeSnapParent.querySelector( isSignBtn ? '#canvas' : '#canvasInitial' );
			var img = document.getElementById( isSignBtn ? 'signPhoto' : 'initialPhoto' );
			var clearSnapBtn = takeSnapParent.querySelector('.clearSnapImg');
			var loadingClass = 'lyteSignSnapInProgress';
			var component = this;
			var dataKey = isSignBtn ? 'signatureSnapDataUrl' : 'initialSnapDataUrl';

			takeSnapParent.classList.add( loadingClass );
			takeSnap.classList.add('lyteSignImageHidden');

			var showResult = function( src ){
				takeSnapParent.classList.remove( loadingClass );
				if( videoTag ){
					videoTag.classList.add('lyteSignImageHidden');
				}
				if( img ){
					img.src = src;
					img.classList.remove('lyteSignImageHidden');
				}
				if( clearSnapBtn ){
					clearSnapBtn.classList.remove('lyteSignImageHidden');
				}
				component.setData( dataKey, src );

				if( component.getData('isSaveButtonDisabled') && takeSnap ){
					var captureSection = $L(takeSnap).closest('.lyteSignCaptureSection')[0];
					var img1 = captureSection.querySelector('img#signPhoto');
					var img2 = captureSection.querySelector('img#initialPhoto');
					if( img1 && img2 ){
						if( !img1.classList.contains('lyteSignImageHidden') || !img2.classList.contains('lyteSignImageHidden') ){
							component.setData('isSaveButtonDisabled', false);
						}
					}

				}
			};

			var resetOnFailure = function(){
				takeSnapParent.classList.remove( loadingClass );
				takeSnap.classList.remove('lyteSignImageHidden');
				if( videoTag ){
					videoTag.classList.remove('lyteSignImageHidden');
				}
			};

			var captureWithGrabFrame = function(){
				if( imageCapture.grabFrame && canvas && canvas.getContext ){
					return imageCapture.grabFrame()
					.then(function( bitmap ){
						canvas.width = bitmap.width;
						canvas.height = bitmap.height;
						var ctx = canvas.getContext('2d');
						ctx.drawImage( bitmap, 0, 0 );
						showResult( canvas.toDataURL('image/png') );
					});
				}
				return Promise.reject();
			};

			var captureWithVideo = function(){
				if( imageCapture.isVideoFallback && videoTag && canvas && canvas.getContext ){
					return new Promise(function( resolve, reject ){
						try {
							canvas.width = videoTag.videoWidth || 640;
							canvas.height = videoTag.videoHeight || 480;
							var ctx = canvas.getContext('2d');
							ctx.drawImage( videoTag, 0, 0, canvas.width, canvas.height );
							var dataURL = canvas.toDataURL('image/png');
							showResult( dataURL );
							resolve( dataURL );
						} catch( error ){
							reject( error );
						}
					});
				}
				return Promise.reject();
			};

			captureWithGrabFrame()
			.catch(() => {
				return captureWithVideo();
			})
			.catch(() => {
				return this._captureStillPhoto( imageCapture, showResult, resetOnFailure );
			})
			.catch(() => {
				resetOnFailure();
			});
		}
	},
	methods : {
		onFileUploadAdd: function( param, fileUpload ){
			var tab = $L(fileUpload).closest('lyte-tab-content')[0];
			
			if( tab ){
				var f1 = tab.querySelector('lyte-fileupload.lyteSignSignatureUpload');
				var f2 = tab.querySelector('lyte-fileupload.lyteSignInitialUpload');

				if( f1 && f2 ){
					if(f1.getData('ltPropFiles') && f1.getData('ltPropFiles').length) {
						f1.parentElement.querySelector('.lyteSignClearButton').classList.remove('lyteSignImageHidden');
					}
					if(f2.getData('ltPropFiles') && f2.getData('ltPropFiles').length) {
						f2.parentElement.querySelector('.lyteSignClearButton').classList.remove('lyteSignImageHidden');
					}
					if( this.getData('isSaveButtonDisabled') && ( ( f1.getData('ltPropFiles') && f1.getData('ltPropFiles').length) || ( f2.getData('ltPropFiles') && f2.getData('ltPropFiles').length) ) ){
						this.setData('isSaveButtonDisabled', false);
					}
					else if( !this.getData('isSaveButtonDisabled') && ( ( !f1.getData('ltPropFiles') || !f1.getData('ltPropFiles').length) && ( !f2.getData('ltPropFiles') || !f2.getData('ltPropFiles').length) ) ){
						this.setData('isSaveButtonDisabled', true);
					}
				}
			}
		},
		changeStrokeColor: function( sel, btn, event ){
			var modal = this.$node.querySelector('lyte-modal');
			var wormhole = modal.component.childComp;

			this.setData('ltPropDrawCanvasInsertStroke', sel);

			var signatureCompSign = wormhole.querySelector('lyte-signature.lyteSignSignatureElem');
			var signatureCompInit = wormhole.querySelector('lyte-signature.lyteSignInitialElem');

			if( signatureCompSign ){
				signatureCompSign.redraw();
			}

			if( signatureCompInit ){
				signatureCompInit.redraw();
			}
		},
		changeStrokeSize: function( event, val ){
			var modal = this.$node.querySelector('lyte-modal');
			var wormhole = modal.component.childComp;

			var num = parseInt(val);
			this.setData('ltPropDrawCanvasLineWidth', num);

			var signatureCompSign = wormhole.querySelector('lyte-signature.lyteSignSignatureElem');
			var signatureCompInit = wormhole.querySelector('lyte-signature.lyteSignInitialElem');

			if( signatureCompSign ){
				signatureCompSign.redraw();
			}

			if( signatureCompInit ){
				signatureCompInit.redraw();
			}
		},

		changeStrokeStyle: function( event, val ){
			var modal = this.$node.querySelector('lyte-modal');
			var wormhole = modal.component.childComp;

			var ret = [];
			var lineWidth = this.getData('ltPropDrawCanvasLineWidth');

			switch(val){
				case 'solid':
					ret = [];
					break;
				case 'dashed':
					ret = [lineWidth * 3, lineWidth * 2];
					break;
				case 'dotted':
					// ret = [0.01, Math.max(2, lineWidth * 0.8)];
					ret = [2,6];
					break;
			}
			this.setData('ltPropDrawCanvasLineDash', ret);

			var signatureCompSign = wormhole.querySelector('lyte-signature.lyteSignSignatureElem');
			var signatureCompInit = wormhole.querySelector('lyte-signature.lyteSignInitialElem');

			if( signatureCompSign ){
				signatureCompSign.redraw();
			}

			if( signatureCompInit ){
				signatureCompInit.redraw();
			}
		},
		signatureInputChanged: function( val, lyteInput ){
			var initInput = lyteInput.closest('lyte-tab-content').querySelector('lyte-input.lyteSignInitialInput');
			var initInputValue = initInput ? initInput.getData('ltPropValue') : '';

			if( !this.getData('isSaveButtonDisabled') && !val.newValue && !initInputValue ){
				this.setData('isSaveButtonDisabled', true);
			}
			else if( this.getData('isSaveButtonDisabled') && (val.newValue || initInputValue) ){
				this.setData('isSaveButtonDisabled', false);
			}

			var tab = $L(lyteInput).closest('lyte-tab-content')[0];
			this.setData('signatureInputValue', val.newValue);
			var ul = tab.querySelector('ul');
			var liArr = ul.querySelectorAll('li');
			for( var i=0; i<liArr.length; i++ ){
				var canvas = liArr[i].querySelector('canvas.signatureCanvas');
				var ctx = canvas.getContext('2d');
				ctx.clearRect( 0, 0, canvas.width, canvas.height );
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText( val.newValue, canvas.width / 2, canvas.height / 2 );
			}
		},
		initialInputChanged: function( val, lyteInput ){
			var signInput = lyteInput.closest('lyte-tab-content').querySelector('lyte-input.lyteSignSignatureInput');
			var signInputValue = signInput ? signInput.getData('ltPropValue') : '';

			if( !this.getData('isSaveButtonDisabled') && !val.newValue && !signInputValue ){
				this.setData('isSaveButtonDisabled', true);
			}
			else if( this.getData('isSaveButtonDisabled') && (val.newValue || signInputValue) ){
				this.setData('isSaveButtonDisabled', false);
			}

			var tab = $L(lyteInput).closest('lyte-tab-content')[0];
			this.setData('initialInputValue', val.newValue);
			var ul = tab.querySelector('ul');
			var liArr = ul.querySelectorAll('li');
			for( var i=0; i<liArr.length; i++ ){
				var canvas = liArr[i].querySelector('canvas.initialCanvas');
				var ctx = canvas.getContext('2d');
				ctx.clearRect( 0, 0, canvas.width, canvas.height );
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText( val.newValue, canvas.width / 2, canvas.height / 2 );
			}
		},
		signatureInputAfterRender: function( lyteInput ){
			var tab = $L(lyteInput).closest('lyte-tab-content')[0];
			this.setData('signatureInputValue', this.getData('ltPropDefaultSignatureInputValue'));
			var ul = tab.querySelector('ul');
			var liArr = ul.querySelectorAll('li');
			for( var i=0; i<liArr.length; i++ ){
				var canvas = liArr[i].querySelector('canvas.signatureCanvas');
				var ctx = canvas.getContext('2d');
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText( this.getData('ltPropDefaultSignatureInputValue'), canvas.width / 2, canvas.height / 2 );
			}
		},
		initialInputAfterRender: function( lyteInput ){
			var tab = $L(lyteInput).closest('lyte-tab-content')[0];
			this.setData('initialInputValue', this.getData('ltPropDefaultInitialInputValue'));
			var ul = tab.querySelector('ul');
			var liArr = ul.querySelectorAll('li');
			for( var i=0; i<liArr.length; i++ ){
				var canvas = liArr[i].querySelector('canvas.initialCanvas');
				var ctx = canvas.getContext('2d');
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText( this.getData('ltPropDefaultInitialInputValue'), canvas.width / 2, canvas.height / 2 );
			}
		},
		closeModal: function(){
			var mediaStream = this.getData('cameraStream');
			if( mediaStream ){
				mediaStream.getTracks().forEach(function( track ){
					track.stop();
				});
			}

			['video','videoInitial'].forEach(function( id ){
				var video = document.getElementById( id );
				if( video ){
					video.pause();
					video.srcObject = null;
					video.classList.remove('lyteSignImageHidden');
				}
			});

			this.setData('signatureSnapDataUrl', null);
			this.setData('initialSnapDataUrl', null);
			this.setData('signatureUploadData', null);
			this.setData('initialUploadData', null);
			this._revokeUploadBlobUrl( 'signatureUploadBlobUrl' );
		},
		onTabOpen: function( cont, comp, sel ){
			this.setData('currentLyteSignTab', cont.getAttribute('id') );

			var sign = comp.$node.querySelectorAll('lyte-signature');
			if( sign && sign.length ){
				for(var i=0; i<sign.length; i++ ){
					sign[i].refresh();
				}
			}

			if( this.getData('isSaveButtonDisabled') && this.isInputInCurTab( cont ) ){
				this.setData('isSaveButtonDisabled', false);
			}
			else if( !this.getData('isSaveButtonDisabled') && !this.isInputInCurTab( cont ) ){
				this.setData('isSaveButtonDisabled', true);
			}
		}
	},

	isInputInCurTab: function( tabContent ){
		if( !tabContent ){
			return;
		}

		if( tabContent.getAttribute('id') === 'tabs1' ){
			var signInput = tabContent.querySelector('lyte-input.lyteSignSignatureInput');
			var initInput = tabContent.querySelector('lyte-input.lyteSignInitialInput');

			return ( signInput && signInput.getData('ltPropValue') ) || ( initInput && initInput.getData('ltPropValue') );
		}
		else if( tabContent.getAttribute('id') === 'tabs2' ){
			var signPlaceholder = tabContent.querySelector('.lyteSignSignaturePlaceholder');
			var initPlaceholder = tabContent.querySelector('.lyteSignInitialPlaceholder');

			return ( signPlaceholder && signPlaceholder.classList.contains('lyteSignImageHidden') ) || ( initPlaceholder && initPlaceholder.classList.contains('lyteSignImageHidden') );
		}
		else if( tabContent.getAttribute('id') === 'tabs3' ){
			var signPlaceholder = tabContent.querySelector('div.lyteSignCaptureSignatureSection div.lyteSignCaptureSectionPlaceholder');
			var initPlaceholder = tabContent.querySelector('div.lyteSignCaptureInitialSection div.lyteSignCaptureSectionPlaceholder');

			return ( signPlaceholder && signPlaceholder.classList.contains('lyteSignImageHidden') ) || ( initPlaceholder && initPlaceholder.classList.contains('lyteSignImageHidden') );
		}
		else if( tabContent.getAttribute('id') === 'tabs4' ){
			var signUpload = tabContent.querySelector('lyte-fileupload.lyteSignSignatureUpload');
			var initUpload = tabContent.querySelector('lyte-fileupload.lyteSignInitialUpload');

			return ( signUpload && signUpload.getData('ltPropFiles') && signUpload.getData('ltPropFiles').length ) || ( initUpload && initUpload.getData('ltPropFiles') && initUpload.getData('ltPropFiles').length );
		}
		else if( tabContent.getAttribute('id') === 'tabs5' ){
			var signImg = tabContent.querySelector('img.signatureImg');
			var initImg = tabContent.querySelector('img.initialImg');

			return ( signImg && signImg.src ) || ( initImg && initImg.src );
		}
	},

	resetSnap: function( modalChild, param ){
		var section = modalChild.querySelector('lyte-tab-content#tabs3');
		if( !section ){
			return;
		}

		var isSignature = param === 'signature';
		var previewSection = section.querySelector( isSignature ? '.lyteSignCaptureSignatureSection' : '.lyteSignCaptureInitialSection' );
		var innerSec = previewSection.querySelector( '.lyteSignCapturePreviewSection' );
		var placeholder = previewSection.querySelector( '.lyteSignCaptureSectionPlaceholder' );
		var takeSnapBtn = previewSection.querySelector('.lyteSignTakeSnap');
		var clearSnapBtn = previewSection.querySelector('.clearSnapImg');

		var mediaStream = this.getData('cameraStream');
		if( mediaStream ){
			mediaStream.getTracks().forEach(function( track ){
				track.stop();
			});
			this.setData('cameraStream', null);
		}

		if( innerSec ){
			innerSec.classList.add('lyteSignImageHidden');
		}

		if( takeSnapBtn ){
			takeSnapBtn.classList.add('lyteSignImageHidden');
		}

		if( clearSnapBtn ){
			clearSnapBtn.classList.add('lyteSignImageHidden');
		}

		if( placeholder ){
			placeholder.classList.remove('lyteSignImageHidden');
		}

		this.setData( isSignature ? 'signatureSnapDataUrl' : 'initialSnapDataUrl', null );
		this.setData('imageCapture', null);
	},

	clearAllInputs: function( modal ){
		var modalChild = modal.component.childComp;
		for(var i=2;i<=5;i++){
			var curTab = modalChild.querySelector('lyte-tab-content#tabs'+i);
			if( curTab ){
				var clearButtons = curTab.querySelectorAll('.lyteSignClearButton');
				clearButtons.forEach( (btn) => {
					btn.click();
				});
				if( i==3 ){
					this.resetSnap( modalChild, 'signature' );
					this.resetSnap( modalChild, 'initial' );
				}
			}
		}
	},

	toggleCanvasPlaceholderVisibility: function( type, placeholder, canvas, clearButton, hide ){
			if( canvas ){
				canvas.classList[ hide ? 'remove' : 'add' ]( 'lyteSignImageHidden' );
				canvas.reset();
			}

			if( clearButton ){
				clearButton.classList[ hide ? 'remove' : 'add' ]( 'lyteSignImageHidden' );
			}

			if( placeholder ){
				placeholder.classList[ hide ? 'add' : 'remove' ]( 'lyteSignImageHidden' );
			}
		},

	takeSnap: function( permissionBtn, imageCapture, isSignBtn ){
		var takeSnapParent = permissionBtn.parentElement;
		var takeSnap = takeSnapParent.querySelector('.lyteSignTakeSnap');
		var previewSection = takeSnapParent.querySelector('.lyteSignCapturePreviewSection');
		permissionBtn.classList.add('lyteSignImageHidden');
		previewSection.classList.remove('lyteSignImageHidden');
		takeSnap.classList.remove('lyteSignImageHidden');
	},

	_captureStillPhoto: function( imageCapture, showCb, errorCb ){
		// If using video fallback, skip ImageCapture methods
		if( imageCapture.isVideoFallback ){
			if( typeof errorCb === 'function' ){
				errorCb();
			}
			return Promise.reject('ImageCapture not available, using video fallback');
		}

		return imageCapture.takePhoto()
		.then((blob) => {
			return this._blobToDataURL( blob );
		})
		.then((dataUrl) => {
			showCb( dataUrl );
		})
		.catch((error) => {
			console.warn('Unable to capture photo', error);
			if( typeof errorCb === 'function' ){
				errorCb();
			}
			throw error;
		});
	},

	_blobToDataURL: function( blob ){
		return new Promise(function( resolve, reject ){
			var reader = new FileReader();
			reader.onloadend = function(){ resolve( reader.result ); };
			reader.onerror = function( err ){ reject( err ); };
			reader.readAsDataURL( blob );
		});
	},

	_prepareUploadPayload: function( files, blobKey ){
		if( !files || !files.length ){
			this._revokeUploadBlobUrl( blobKey );
			this.setData( blobKey, null );
			return null;
		}
		var file = files[ 0 ];
		var blobUrl = this._createUploadBlobUrl( file, blobKey );
		return {
			file: file,
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
			blobUrl: blobUrl
		};
	},

	_createUploadBlobUrl: function( file, key ){
		this._revokeUploadBlobUrl( key );
		var url = URL.createObjectURL( file );
		this.setData( key, url );
		return url;
	},

	_revokeUploadBlobUrl: function( key ){
		var url = this.getData( key );
		if( url ){
			URL.revokeObjectURL( url );
		}
	},
	
	didDestroy: function(){
		this.setData('imageCapture', null);
	}
});
