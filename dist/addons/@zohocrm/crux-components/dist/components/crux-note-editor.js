/**
 * @component crux-note-editor
 * @author naveen.winson
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-note-editor", {
_template:"<template tag-name=\"crux-note-editor\"> <div class=\"notesTextInputBoxWrap cxNotesTextInputBoxWrap {{if(expandedArea,'cxNoteTextareaOpen')}} {{if(cxPropErrorMessage,'cxErrorBox','')}} {{cxPropWrapperClass}}\"> <template is=\"if\" value=\"{{expHandlers(expandedArea,'!')}}\"><template case=\"true\"> <lyte-input id=\"noteTextarea{{cxPropId}}\" data-zcqa=\"notesProcess\" class=\"inputBeforeNote\" lt-prop-appearance=\"box\" lt-prop-class=\"cxNoteBeforeOpenInput\" onfocus=\"{{action('openNotesTextarea')}}\" lt-prop-placeholder=\"{{cxPropMinimizedPlaceholder}}\"></lyte-input> </template><template case=\"false\"> <div class=\"cxNoteTitleInputSection titleInputSection\"> <template is=\"if\" value=\"{{cxPropShowTitle}}\"><template case=\"true\"> <lyte-input id=\"noteTextTitle{{cxPropId}}\" class=\"cxNoteTitleInput noteTitle\" lt-prop-placeholder=\"{{cxPropTitlePlaceholder}}\" lt-prop-maxlength=\"120\" onkeydown=\"{{action('saveNoteOnEnter',event)}}\" lt-prop-class=\"cxNoteTitleInputElem\" lt-prop-value=\"{{lbind(cxNoteTitle)}}\" onfocus=\"{{action('titleMadeFocus')}}\" lt-prop-update-delay=\"{{undefinedData}}\" on-value-change=\"{{method('titleChange')}}\"></lyte-input> </template></template> </div> <div class=\"cxNotesTextareaWrap\"> <template is=\"if\" value=\"{{cxPropRichTextFormat}}\"><template case=\"true\"> <lyte-texteditor id=\"noteTextarea{{cxPropId}}\" data-zcqa=\"notesContentTxt\" class=\"cxNotesTextarea notesTextInputBox {{if(scrollDisabledClass,'','cxNoteEditorScrollDisable')}}\" on-trigger=\"{{method('mentionRequest')}}\" lt-prop-cursor-class=\"note_editorCursor\" lt-prop-placeholder=\"{{cxPropContentPlaceholder}}\" on-undo-redo-queue-update=\"{{method(&quot;textEditorWordChange&quot;)}}\" lt-prop-replace-style=\"{{cxPropReplaceStyle}}\" lt-prop-word-to-para-style=\"{{cxPropWordToParaStyle}}\" lt-prop-para-to-word-style=\"{{cxPropParaToWordStyle}}\" lt-prop-allowed-tags=\"{{cxPropAllowedTags}}\" lt-prop-allowed-styles=\"{{cxPropAllowedStyles}}\" lt-prop-mentions-editable=\"false\" style=\"height: {{cxPropTextEditorHeight}}px;\" lt-prop-trigger-delay=\"{{undefinedData}}\" lt-prop-remove-default-style=\"true\" lt-prop-list-variable=\"false\" lt-prop-list-style=\"{{cxPropListStyle}}\" lt-prop-clear-para-on-full-selection=\"true\" lt-prop-url-detection=\"true\" lt-prop-url-detection-options=\"{{cxPropUrlDetectionOptions}}\" onkeydown=\"{{action('keyPressInContent',event,this)}}\" lt-prop-shortcuts=\"{{cxPropEditorShortCuts}}\" on-editor-resize-end=\"{{method(&quot;editorResized&quot;)}}\" lt-prop-un-ordered-list=\"{{cxPropAllowedOrderedList}}\" lt-prop-clear-para-properties=\"true\" lt-prop-checkbox=\"{{checkboxPreventLink}}\" on-focus=\"{{method('contentMadeFocus')}}\" lt-prop-freeze=\"false\" lt-prop-wrapper-class=\"cxNotesEditorWrapperClass\" on-cursor-change=\"{{method('textEditorCursorChange')}}\" lt-prop-max-margin=\"{{maxMargin}}\" lt-prop-custom-list-color=\"true\" on-shortcut-apply=\"{{method('noteShortCuts')}}\" on-paste=\"{{method('textEditorOnPaste')}}\" on-word-change=\"{{method('textEditorWordChangeCl')}}\" lt-prop-word-style=\"{{textEditorStyle}}\" lt-prop-resize=\"{{cxPropTextAreaResize}}\" lt-prop-anchor-text-edit=\"true\" lt-prop-context-menu=\"true\" lt-prop-mentions-bg-editable=\"true\" on-editor-resize-start=\"{{method('resizeStart',this)}}\" on-before-paste=\"{{method('textEditorOnBeforePaste')}}\" lt-prop-disable-anchor-in-mentions=\"true\" after-render=\"{{method(&quot;textEditorAfterRender&quot;)}}\" on-anchor-show=\"{{method('onTextEditorAnchorShow')}}\" lt-prop-detect-list=\"{{cxPropDetectList}}\" lt-prop-list-match-map=\"{{cxPropListMatchMap}}\" on-before-input=\"{{method('onBeforeEditorInputCall')}}\" lt-prop-mentions-bg=\"\" on-node-process=\"{{method('textEditorNodeProcess')}}\" lt-prop-anchor-style=\"{{cxPropAnchorStyle}}\" lt-prop-relaxed-url-rgx=\"true\" lt-prop-para-style=\"{{cxPropParaStyle}}\" lt-prop-handle-white-space=\"true\" lt-prop-blue-pencil=\"{{cxPropBluePencil}}\" lt-prop-selection-delay=\"{{undefinedData}}\" lt-prop-disabled-paste-tooltip=\"{{editorDisabledPasteTooltip}}\" lt-prop-retain-input=\"{{cxPropRetainInput}}\" lt-prop-diacrtic-handler=\"{{negate(cxPropRetainInput)}}\"></lyte-texteditor> </template><template case=\"false\"> <lyte-input data-zcqa=\"notesContentTxt\" class=\"cxNotesTextarea notesTextInputBox\" id=\"noteTextarea{{cxPropId}}\" lt-prop-type=\"textarea\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"{{cxPropContentPlaceholder}}\" lt-prop-class=\"cxNotesTextareaElem\" lt-prop-text-area-resize=\"{{cxPropTextAreaResize}}\" ontransitionend=\"{{action('onTextAreaTransition',this)}}\" onkeydown=\"{{action('keyPressInContent',event,this)}}\" on-focus=\"{{method('contentMadeFocus')}}\"></lyte-input> </template></template> <div id=\"noteMoreFiles\" class=\"noteMoreFiles cxNoteMoreFiles {{if(cruxOr(currentNoteUploadedAttachments.length,showAttachmentBorder),'cxNoteWithMoreFiles','')}} attachzone cruxNoteFiles{{cxPropId}}\"> <template is=\"if\" value=\"{{expHandlers(currentNoteUploadedAttachments.length,'>',0)}}\"><template case=\"true\"> <template is=\"for\" items=\"{{currentNoteUploadedAttachments}}\" item=\"attachment\" index=\"index\"> <div class=\"cxAtt_{{attachment.id}} cxNotesAttachmentWrap\"> <span class=\"cxDIB cx-{{attachment.mappedFileExtn}}-icon cxNotesAttachmentIcons vam mR5\"></span> <span class=\"cxNotesAttachedListName\">{{attachment.File_Name}}</span> <span class=\"vam cxDIB\"> {{concat(' ( ',attachment.formattedSize,' ) ')}} </span> <template is=\"if\" value=\"{{expHandlers(cxPropDisableAttachmentActions,'!')}}\"><template case=\"true\"> <span class=\"cxNotesAttachmentRemoveIcon\" onclick=\"{{action('removeAttachment',event)}}\"></span> </template></template> </div> </template> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropRichTextFormat,'||',expHandlers(cxPropDisableAttachmentActions,'!')),'||',cxPropFooterRightPrefixYield),'||',cxPropShowSaveCancelButton)}}\"><template case=\"true\"> <div class=\"cxNotesFooter notesTextAreaWrap\"> <div class=\"cxNotesFooterLeft\"> <template is=\"if\" value=\"{{cxPropRichTextFormat}}\"><template case=\"true\"> <span data-zcqa=\"cxNotesRichTextFormatIcon\" class=\"cxEditorPanelSpan{{cxPropId}} cxRtfIconWrap cxNotesFooterIcoWrap {{if(showEditorPanel,'cxNotesFooterIconActive','')}} {{if(formattingDsiabled,'cxDisableEditBtn','')}}\" lt-prop-title=\"{{cruxGetI18n('crux.note.formatting.options')}}\" tabindex=\"{{if(cxPropStandardNavigation,cxPropTabindex,expHandlers(1,'-'))}}\" onkeydown=\"{{action('openHideEditorPanel',true)}}\" onclick=\"{{action('openHideEditorPanel')}}\"> <i class=\"cxNoteRichTextIcon\"></i> </span> <div class=\"cxNoteEditorPanelPopover {{if(cxPropShowSaveCancelButton,'','cxNoteEditorPanelPopoverFullWidth')}} {{if(showEditorPanel,'cxNoteShowTransition','cxNoteHideTransition')}} {{if(formattingDsiabled,'cxDisableEditBtn','')}}\" data-zcqa=\"cxNotesRichTextFormatPanel\"> <lyte-editorpanel lt-prop-editor=\"lyte-texteditor#noteTextarea{{cxPropId}}\" lt-prop-icons=\"{{cxPropEditorPanelIcons}}\" lt-prop-wrapper-class=\"cxNotesEditorWrapperClass\" lt-prop-more-options-wrapper-class=\"cxNotesEditorMoreWrapper\" lt-prop-more-options-popover=\"{{textEditorMoreOptionsPopover}}\" lt-prop-popover=\"{{textEditorPopover}}\" on-before-emoji-close=\"{{method('beforeEmojiClose')}}\" lt-prop-color-picker=\"{{colorPickerOptions}}\" lt-prop-freeze=\"false\" lt-prop-tabindex=\"{{if(cxPropStandardNavigation,cxPropTabindex,expHandlers(1,'-'))}}\"></lyte-editorpanel> </div> </template></template> <div class=\"cxEditorCheckboxWrap {{if(showEditorPanel,'cxdN')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(currentNoteUploadedAttachments.length,'<',5),'&amp;&amp;',expHandlers(cxPropDisableAttachmentActions,'!'))}}\"><template case=\"true\"> <span data-zcqa=\"notesAttachFile\" class=\"attachementActionArea{{cxPropId}} cxNotesFooterIcoWrap\" lt-prop-title=\"{{cruxGetI18n('crm.email.entattach.label.attachfile')}}\" tabindex=\"{{if(cxPropStandardNavigation,cxPropTabindex,expHandlers(1,'-'))}}\"> <i class=\"cxNotesAttachIcon\"></i> </span> </template></template> <template is=\"if\" value=\"{{cxPropShowShareToCustomer}}\"><template case=\"true\"> <lyte-checkbox class=\"cxNoteFooterLinkSep cxNoteCheckbox notesgray\" lt-prop-disabled=\"{{disableShare}}\" lt-prop-label-class=\"cxNoteCkboxLabel\" lt-prop-label=\"{{cruxGetI18n(&quot;custmr.prtl.notes.shr.to.custmr&quot;)}}\" lt-prop-checked=\"{{lbind(shareToCustomerCheck)}}\" on-changed=\"{{method('shareToCustomerChange')}}\" lt-prop-tabindex=\"{{if(cxPropStandardNavigation,cxPropTabindex,expHandlers(1,'-'))}}\"> </lyte-checkbox> </template></template> </div> </div> <div class=\"cxMlAuto cxNotesFooterRight\"> <div class=\"cxFooterRightPrefixYield {{if(showEditorPanel,'cxdN')}}\"> <template is=\"if\" value=\"{{cxPropFooterRightPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxNoteRightPrefixYield\"></lyte-yield> </template></template> </div> <template is=\"if\" value=\"{{cxPropShowSaveCancelButton}}\"><template case=\"true\"> <lyte-button data-zcqa=\"notesCancelComment\" lt-prop-size=\"small\" class=\"cruxNoteCancelBtn{{cxPropId}} cxCancelbtn\" onclick=\"{{action('closeNotesTextarea')}}\" lt-prop-tabindex=\"{{if(cxPropStandardNavigation,cxPropTabindex,expHandlers(1,'-'))}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cruxGetI18n('crm.button.cancel')}}</template> </lyte-button> <lyte-button data-zcqa=\"notesSaveComment\" lt-prop-size=\"small\" class=\"cruxNoteSaveBtn{{cxPropId}}\" lt-prop-disabled=\"{{cxPropDisableSave}}\" lt-prop-appearance=\"primary\" onclick=\"{{action('saveNote')}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cxPropSaveButtonText}}</template> </lyte-button> </template></template> </div> </div> </template></template> </div> </template></template> </div> <template is=\"if\" value=\"{{cxPropErrorMessage}}\"><template case=\"true\"> <crux-error-message error-message=\"{{cxPropErrorMessage}}\"></crux-error-message> </template></template> <lyte-modal class=\"noteDataStorageLimit\" lt-prop-show-close-button=\"false\" lt-prop-offset=\"{&quot;top&quot;:&quot;40px&quot;}\" lt-prop-close-on-escape=\"false\" lt-prop-wrapper-class=\"cxNoteStorageLimitModalWrapper\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content class=\"cxNoteStorageLimitContent\"> <div class=\"cxNotesStorageLimitShadow\"></div> <div class=\"cxNotesStorageLimitWarnIcon\"></div> <div class=\"cxNotesStorageLimitInfo\"> <div class=\"f16\"> <template is=\"if\" value=\"{{isClientPortalUser}}\"><template case=\"true\"> {{unescape(cruxGetI18n(\"crm.storage.create.error.client\",cruxGetI18n(\"crm.feed.group.admin\")))}} </template><template case=\"false\"> {{unescape(cruxGetI18n(\"crm.storage.create.error\"))}} </template></template> <div class=\"cxNotesStorageLimitWarnMsg\"> {{cruxGetI18n(\"crm.storage.avail.info\",cruxNumToStorage(0,2,if(ifEquals(storageCalcType,\"count\"),true,false)),cruxNumToStorage(maxStorage,2,if(ifEquals(storageCalcType,\"count\"),true,false)))}} </div> </div> </div> <template is=\"if\" value=\"{{expHandlers(isClientPortalUser,'!')}}\"><template case=\"true\"> <lyte-button data-zcqa=\"dS_manage_data_storage\" lt-prop-appearance=\"primary\" class=\"cxNoteStorageLimitManageBtn\"> <template is=\"registerYield\" yield-name=\"text\"> <a data-zcqa=\"data_storageUsage\" href=\"{{concat(cruxGetCrmBasePath(),&quot;/settings/storage&quot;)}}\" class=\"cxNotesStorageLimitLink\" rel=\"noopener noreferrer\" target=\"_blank\"> {{cruxGetI18n('crm.storage.error.key.manage')}} </a> </template> </lyte-button> </template></template> <div class=\"cxNotesStorageLimitClose\" onclick=\"{{action('closeDSInfoPopup')}}\"> </div> </lyte-modal-content> </template> </lyte-modal> <template is=\"if\" value=\"{{expandedArea}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-wrapper-class=\"cxNotesMentionWrapperClass\" lt-prop-event=\"click\" lt-prop-query=\".note_editorCursor\" lt-prop-show=\"{{lbind(showMention)}}\" lt-prop-freeze=\"false\" lt-prop-callout=\"true\" on-close=\"{{method('mentionMenuClosed')}}\" on-before-close=\"{{method('onBeforeMentionMenuClose')}}\" on-open=\"{{method('mentionMenuOpen')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxMentionsWrapper\"> <template is=\"for\" items=\"{{mentions}}\" item=\"mention\" index=\"index\"> <lyte-menu-item class=\"cruxMentionsLi\" onclick=\"{{action('addMention',event,mention)}}\"> <template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Users&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage\"> <template is=\"if\" value=\"{{expHandlers(mention.image_link,'!')}}\"><template case=\"true\"> <span class=\"mentionsNoPhoto\"></span> </template><template case=\"false\"> <img src=\"{{mention.image_link}}\" class=\"mentionsUserImage\"> </template></template> </div> <div class=\"cruxMentionItem\"> <div class=\"cxMentionsPrimaryDetail\">{{mention.full_name}}</div> <div class=\"cxMentionsSecondaryDetail\">{{mention.email}}</div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Groups&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage groupsLi\"> <span class=\"mentionsGroupIcon\"></span> </div> <span><span class=\"mentionsLiName\">{{mention.name}} - </span><span class=\"mentionsLiLabel\">{{cruxGetI18n('crm.security.group')}}</span></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Roles&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage rolesLi\"> <span class=\"mentionsRoleIcon\"></span> </div> <span><span class=\"mentionsLiName\">{{mention.name}} - </span><span class=\"mentionsLiLabel\">{{cruxGetI18n('crm.security.role')}}</span></span> </template></template></template></template></template></template> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height: '","cxPropTextEditorHeight","'px;'"]}}}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"if","position":[1,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,5,1,1]},{"type":"if","position":[1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"text","position":[1,5,1,3,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,0,0]},{"type":"text","position":[3,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,0,0]},{"type":"text","position":[3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["undefinedData","expandedArea","currentNoteUploadedAttachments","cxPropEntity","cxPropNote","cxPropModule","cxPropId","cxNoteTitle","cxPropShowTitle","cxPropRichTextFormat","cxPropShowShareToCustomer","shareToCustomerCheck","cxPropShowSaveCancelButton","cxPropDisableAttachmentActions","editorPanelWidth","cxPropDisableSave","cxPropEditorPanelIcons","cxPropEditorShortCuts","cxPropUrlDetectionOptions","cxPropListStyle","cxPropReplaceStyle","cxPropWordToParaStyle","cxPropParaToWordStyle","cxPropAllowedStyles","cxPropAllowedTags","showEditorPanel","cxPropBoundary","textEditorPopover","textEditorMoreOptionsPopover","cxPropTextEditorHeight","cxPropAllowedOrderedList","checkboxPreventLink","colorPickerOptions","formattingDsiabled","cxPropMaxNoteContentLimit","cxPropMaxContentHeight","maxMargin","textEditorStyle","cxPropTextAreaResize","scrollDisabledClass","disableShare","cxPropFooterRightPrefixYield","cxPropErrorMessage","cxPropMinimizedPlaceholder","cxPropContentPlaceholder","cxPropTitlePlaceholder","cxPropParentElementScroll","editorHasBeenResized","cxPropSaveButtonText","cxPropResizeEditor","cxPropDetectList","cxPropListMatchMap","mentionedMentions","cxPropWrapperClass","cxPropAnchorStyle","cxPropTabindex","cxPropStandardNavigation","cxPropMentionQueryParam","cxPropParaStyle","cxPropBluePencil","cxPropUserLocale","editorDisabledPasteTooltip","cxPropRetainInput"],
_observedAttributesType :["object","boolean","array","object","object","string","string","string","boolean","boolean","boolean","boolean","boolean","boolean","string","boolean","array","object","object","object","object","array","array","array","object","boolean","object","object","object","number","array","object","object","boolean","number","number","number","object","object","boolean","boolean","boolean","string","string","string","string","string","boolean","string","boolean","boolean","object","array","string","object","number","boolean","object","object","boolean","string","string","boolean"],

	data : function(){
		return {
			undefinedData : Lyte.attr('object',{default : undefined}), //no i18n
			expandedArea : Lyte.attr('boolean',{default : false}), //no i18n
			currentNoteUploadedAttachments : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * @componentProperty {object} cxPropEntity
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEntity : Lyte.attr('object',{default : {}}), //no i18n
			/**
			 * @componentProperty {object} cxPropNote
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNote : Lyte.attr('object',{default : {}}), //no i18n
			/**
			 * @componentProperty {string} cxPropModule
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropModule : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty {string} cxPropId='1'
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropId : Lyte.attr('string',{default : '1'}), //no i18n
			cxNoteTitle : Lyte.attr('string',{default : ''}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowTitle=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowTitle : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropRichTextFormat=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropRichTextFormat : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowShareToCustomer=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowShareToCustomer : Lyte.attr('boolean',{default : false}), //no i18n
			shareToCustomerCheck : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowSaveCancelButton=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowSaveCancelButton : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropDisableAttachmentActions=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropDisableAttachmentActions : Lyte.attr('boolean',{default : false}), //no i18n
			editorPanelWidth : Lyte.attr('string',{default : '500px'}),
			/**
			 * @componentProperty {boolean} cxPropDisableSave=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropDisableSave : Lyte.attr('boolean',{default : true}),
			/**
			 * @componentProperty {array} cxPropEditorPanelIcons
			 * @default this.getCruxNoteEditorIcons()
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEditorPanelIcons : Lyte.attr('array',{default : this.getCruxNoteEditorIcons()}),
			/**
			 * @componentProperty {object} cxPropEditorShortCuts
			 * @default this.getCruxNoteEditorShortcuts()
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEditorShortCuts : Lyte.attr('object',{default : this.getCruxNoteEditorShortcuts()}),
			/**
			 * @componentProperty {object} cxPropUrlDetectionOptions
			 * @default {"insert":false,"paste":true,"input":true,"output":true}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropUrlDetectionOptions : Lyte.attr('object',{default : {"insert":false,"paste":true,"input":true,"output":true}}),
			/**
			 * @componentProperty {object} cxPropListStyle
			 * @default {"list-style-position":"inside"}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropListStyle : Lyte.attr('object',{default : {"list-style-position" : "inside"}}),
			/**
			 * @componentProperty {object} cxPropReplaceStyle
			 * @default {"fontWeight":{value:"bold",name:"fontFamily",replaceValue:"var(--crm-font-bold)",fallBackValue:"var(--crm-font-regular)"}}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropReplaceStyle: Lyte.attr('object', { default: { "fontWeight": { value: "bold", name: "fontFamily", replaceValue: "var(--crm-font-bold)", fallBackValue: "var(--crm-font-regular)" } } }), //No I18n
			/**
			 * @componentProperty {array} cxPropWordToParaStyle
			 * @default ['color','fontWeight','fontStyle','fontFamily']
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropWordToParaStyle: Lyte.attr('array', { default: ['color', 'fontWeight', 'fontStyle', 'fontFamily'] }), //No I18n
			/**
			 * @componentProperty {array} cxPropParaToWordStyle
			 * @default ['color','fontSize','fontWeight','fontStyle','fontFamily','backgroundColor']
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropParaToWordStyle: Lyte.attr('array', { default: ['color', 'fontSize', 'fontWeight', 'fontStyle', 'fontFamily','backgroundColor'] }), //No I18n
			/**
			 * @componentProperty {array} cxPropAllowedStyles
			 * @default ['font-style','font-weight','text-decoration','color','background-color','background','vertical-align','--tablevel','margin-left','margin-right','list-style-type','padding-inline-start','text-decoration-line','text-decoration-thickness','text-decoration-style','text-decoration-color','margin-inline-start','padding-left','list-style-position','display','white-space','white-space-collapse','text-wrap-mode']
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAllowedStyles: Lyte.attr('array', { default: ['font-style', 'font-weight', 'text-decoration', 'color', 'background-color', 'background', 'vertical-align', '--tablevel', 'margin-left', 'margin-right', 'list-style-type', 'padding-inline-start', 'text-decoration-line', 'text-decoration-thickness', 'text-decoration-style', 'text-decoration-color', 'margin-inline-start', 'padding-left', 'list-style-position', 'display','white-space', 'white-space-collapse','text-wrap-mode'] }), //No I18n
			/**
			 * @componentProperty {object} cxPropAllowedTags
			 * @default {word:['b','i','u','em','strong','a','mark','del','small','sub','sup','span','mention_div','pre'],//NoI18nparagraph:['ul','li','ol','p','div','br','pre']//NoI18n}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAllowedTags: Lyte.attr('object', {  default: {
					word: ['b', 'i', 'u', 'em', 'strong', 'a', 'mark', 'del', 'small', 'sub', 'sup', 'span','mention_div','pre'],  //No I18n
					paragraph: ['ul', 'li', 'ol', 'p', 'div', 'br','pre']  //No I18n
				}
			}),
			showEditorPanel : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {object} cxPropBoundary
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropBoundary : Lyte.attr('object'), //no i18n 
			textEditorPopover : Lyte.attr('object',{default : {"showCloseButton" : false, "headerPadding" : "", "contentPadding" : "", "footerPadding": "", "scrollable" : true, "focusOnClose" : false,"freeze" : false }}),
			textEditorMoreOptionsPopover : Lyte.attr('object',{default : {"duration":"","allowMultiple":true,"showCloseButton":false,"placement":"topLeft top bottom","type":"callout","scrollable":true,"freeze" : false }}),
			/**
			 * @componentProperty {number} cxPropTextEditorHeight=84
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropTextEditorHeight : Lyte.attr('number',{default : 84}), //no i18n
			/**
			 * @componentProperty {array} cxPropAllowedOrderedList
			 * @default this.getCruxNoteAllowedUnorderedList()
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAllowedOrderedList : Lyte.attr('array', { default: this.getCruxNoteAllowedUnorderedList()}),  //No I18n
			checkboxPreventLink : Lyte.attr('object',{default : {prevent : true}}),
			colorPickerOptions : Lyte.attr('object',{default :{"doneBtnText":_cruxUtils.getI18n("Done"),"backBtnText" : _cruxUtils.getI18n("crm.button.back.alone") } }), //no i18n
			formattingDsiabled : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {number} cxPropMaxNoteContentLimit=65535
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxNoteContentLimit : Lyte.attr('number',{default : 65535}), //no i18n
			/**
			 * @componentProperty {number} cxPropMaxContentHeight=405
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxContentHeight : Lyte.attr('number',{default : 405}), //no i18n
			maxMargin : Lyte.attr('number',{default : 200}), //no i18n
			textEditorStyle : Lyte.attr('object',{default : {whiteSpace: "break-spaces",fontWeight : "normal",color : "rgba(51, 51, 51, 1)",fontStyle : 'normal',fontFamily : "var(--crm-font-regular)"}}), //no i18n
			/**
			 * @componentProperty {object} cxPropTextAreaResize
			 * @default {horizontal:false,vertical:true}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropTextAreaResize : Lyte.attr('object',{default : { horizontal : false, vertical : true }}),
			scrollDisabledClass : Lyte.attr('boolean',{default : false}), //no i18n
			disableShare : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropFooterRightPrefixYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropFooterRightPrefixYield : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {string} cxPropErrorMessage
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropErrorMessage : Lyte.attr('string'), //no i18n
			/**
			 * @componentProperty {string} cxPropMinimizedPlaceholder=_cruxUtils.getI18n('crm.general.addnote')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropMinimizedPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.general.addnote')}), //no i18n
			/**
			 * @componentProperty {string} cxPropContentPlaceholder=_cruxUtils.getI18n('crux.new.note.msg')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropContentPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crux.new.note.msg')}), //no i18n
			/**
			 * @componentProperty {string} cxPropTitlePlaceholder=_cruxUtils.getI18n('crm.html.subject')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropTitlePlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.html.subject')}),
			/**
			 * @componentProperty {string} cxPropParentElementScroll
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropParentElementScroll : Lyte.attr('string'), //no i18n
			editorHasBeenResized : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {string} cxPropSaveButtonText=_cruxUtils.getI18n('crm.button.save')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropSaveButtonText : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.button.save')}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropResizeEditor=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropResizeEditor : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropDetectList=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropDetectList: Lyte.attr('boolean', { default: true }), //No I18n
			/**
			 * @componentProperty {object} cxPropListMatchMap
			 * @default {disc:"disc",olDecimal:"olDecimal",olLowerAlpha:"olLowerAlpha",olLowerRoman:"olLowerRoman",olUpperAlpha:"olUpperAlpha",olUpperRoman:"olUpperRoman",olDecimalLeadingZero:"olDecimalLeadingZero",hyphen:"disc"}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropListMatchMap: Lyte.attr('object', { default: {disc : "disc", olDecimal : "olDecimal", olLowerAlpha : "olLowerAlpha", olLowerRoman : "olLowerRoman", olUpperAlpha : "olUpperAlpha", olUpperRoman : "olUpperRoman", olDecimalLeadingZero : "olDecimalLeadingZero", hyphen : "disc"} }), //No I18n
			mentionedMentions : Lyte.attr('array',{default : []}), //no i18n
			/**
			 * @componentProperty {string} cxPropWrapperClass
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropWrapperClass : Lyte.attr('string'),
			/**
			 * @componentProperty {object} cxPropAnchorStyle
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAnchorStyle : Lyte.attr('object'),
			/**
			 * @componentProperty {number} cxPropTabindex=0
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropTabindex : Lyte.attr('number', { default : 0 }),
			/**
			 * @componentProperty {boolean} cxPropStandardNavigation=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropStandardNavigation : Lyte.attr('boolean', { default : false }),
			/**
			 * @componentProperty {object} cxPropMentionQueryParam
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropMentionQueryParam : Lyte.attr("object", {"default": {}}), //NO I18n
			/**
			 * @componentProperty {object} cxPropParaStyle
			 * @default {"maxWidth":"100%","lineHeight":1.25,"overflowWrap":"break-word"}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropParaStyle : Lyte.attr("object",{default : {"maxWidth": "100%","lineHeight": 1.25,"overflowWrap": "break-word"}}),
			/**
			 * @componentProperty {boolean} cxPropBluePencil=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropBluePencil : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {string} cxPropUserLocale=typeofCrm!=="undefined"?Crm.userDetails.LOCALE:"en-US"
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropUserLocale : Lyte.attr('string',{default : (typeof Crm !== "undefined" ? Crm.userDetails.LOCALE : "en-US")}),
			editorDisabledPasteTooltip : Lyte.attr('string',{default : navigator.userAgent.indexOf("Mac") !== -1 ? _cruxUtils.getI18n('crm.richtext.tool.mac.paste.notsupport') : _cruxUtils.getI18n('crm.richtext.tool.paste.notsupport')}),
			cxPropRetainInput : Lyte.attr('boolean',{default : true}) //no i18n
		}		
	},
	extensionMap : {
		"png": ["jpeg","jpg","gif","png","webp","bmp","svg"], //NO I18N
		"word": ["doc","docx","odt","rtf"], //NO I18N
		"excel": ["csv","xls","xlsx","ods","xlsm","sxc","tsv"], //NO I18N
		"ppt": ["odp", "pps", "pot", "pptx", "ppt"], //NO I18N
		"movie": ["avi", "wmv", "mp4", "mpeg", "mpg", "mov", "flv", "mkv", "webm"], //NO I18N
		"mp3": ["mp3", "ogg", "oga", "wma", "m4p", "m4a", "au", "3gp"], //NO I18N
		"zip": ["zip","zipx","tar","gz","z","cab","rar","bz2","lzh","7z","img","iso"], //NO I18N
		"pdf": ["pdf"], //NO I18N
		"txt": ["txt"], //NO I18N
		"htm": ["htm"], //NO I18N
		"html": ["html"], //NO I18N
		"sxw": ["sxw"] //NO I18N
	},
	init : function(){
		/**
		 * @utility openNoteArea
		 * @author naveen.winson
		 * @version 1.0.0
		 */
		this.$node.openNoteArea = function(options={}){
			this.component.withoutScroll = options.withoutScroll;
			this.component.openNoteArea();
		}

		/**
		 * @utility closeNoteArea
		 * @author naveen.winson
		 * @version 1.0.0
		 */
		this.$node.closeNoteArea = function(){
			this.component.closeNoteArea();
		}

		/**
		 * @utility getNoteValue
		 * @author naveen.winson
		 * @version 1.0.0
		 * @return { * }
		 */
		this.$node.getNoteValue = function(){
			return this.component.getNoteValue(); 
		}

		/**
		 * @utility getNoteContent
		 * @author naveen.winson
		 * @version 1.0.0
		 * @return { * }
		 */
		this.$node.getNoteContent = function(){
			return this.component.getNoteContent();
		};

		/**
		 * @utility setNoteContent
		 * @author naveen.winson
		 * @version 1.0.0
		 * @param { * } msg
		 * @param { * } collection
		 * @param { * } options
		 */
		this.$node.setNoteContent = function(msg,collection,options={}){
			this.component.withoutScroll = options.withoutScroll;
			var textarea;
			if(this.getData('cxPropRichTextFormat')){
				textarea = this.querySelector("lyte-texteditor"); //NO i18n
				var temp = this.component.editorMentions.call(this.component,msg);
				msg = temp.noteContent
				this.setData('mentionedMentions',temp && temp.mentions ? temp.mentions : []);
				textarea.ltProp('data','')
				textarea.clear()
				textarea.ltProp('data',msg)
			}else{
				var instanceNo = this.getData("cxPropId"); //NO I18N
				textarea = $L("#noteTextarea" + instanceNo,this);
				textarea.cruxMention("setMessage" , {message : msg,collection : collection});
				var evt;
				if(typeof(Event) === 'function') { //NO I18N
				    evt = new Event('input'); //NO I18N
				} else {
				    evt = document.createEvent('Event'); //NO I18N
				    evt.initEvent('input', true, true); //NO I18N
				}
				textarea[0].querySelector('textarea').dispatchEvent(evt);
				this.component.onTextAreaTransitionFn(textarea);
			}
		};

		/**
		 * @utility saveNoteValue
		 * @author naveen.winson
		 * @version 1.0.0
		 * @return { * }
		 */
		this.$node.saveNoteValue = function(){
			return this.component.saveNoteArea();
		}

		/**
		 * @utility scrollNoteIntoView
		 * @author naveen.winson
		 * @version 1.0.0
		 */
		this.$node.scrollNoteIntoView = function(){
			this.component.onTextAreaTransitionFn();
		};

		/**
		 * @utility setNoteTitle
		 * @author naveen.winson
		 * @version 1.0.0
		 * @param { * } title
		 */
		this.$node.setNoteTitle = function(title){
			this.setData('cxNoteTitle',title)
		};

		/**
		 * @utility getNoteTitle
		 * @author naveen.winson
		 * @version 1.0.0
		 * @return { * }
		 */
		this.$node.getNoteTitle = function(){
			return this.getData('cxNoteTitle')
		};
		this.popoverEvent = (event)=>{
			var node = event.target.parentElement
			if(node.classList.contains('cxNotesEditorWrapperClass') && !node.getAttribute('cxEventListener')){
				node.addEventListener('click',(event)=>{
					if(!event.target.closest('lyte-popover-content') && !event.target.closest('.lyteColorPicker__morecolorbutton') && event.target.nodeName !== 'LYTE-EDITOR-ITEM'){
						LytePopup.closePopup(undefined,true,new Event('click'));
					}
				});
				node.setAttribute('cxEventListener','true')
			}
		}
		document.addEventListener('lytePopoverBeforeOpen',this.popoverEvent)
		//to be removed
		this.removedAttachments = []
		this.attachmentObj = []
		this.originalContent = "";
		this.formattedNoteText = "";
		this.setData('currentNoteUploadedAttachments',this.data.cxPropNote.$attachments ? Array.from(this.data.cxPropNote.$attachments) : [] )
	},
	didDestroy : function(){
		this.bindMentionPlugin([],true)
		document.removeEventListener('lytePopoverBeforeOpen',this.popoverEvent)
	},
	observeNoteRecord : function(){
		if(this.data.cxPropNote && (this.data.cxPropNote.Note_Content || this.data.cxPropNote.Note_Title)){
			this.openNoteArea();
			if(this.data.cxPropNote.Note_Title){
				this.setData('cxNoteTitle',this.data.cxPropNote.Note_Title);
			}
			this.setData("disableShare", !this.getData("isClientPortalUser") && this.data.cxPropNote.Owner && !store.peekRecord("user", this.data.cxPropNote.Owner.id) ? true : false); //NO I18N
			function assignMode(attachment) {
				var fileExtn = attachment.File_Name.substr(attachment.File_Name.lastIndexOf(".") + 1).toLowerCase(); //NO I18N
				var extensionFound = false;
				var s = attachment.Size;
				if(s > 1000){
					s = s / 1000;
					if(s > 1000){
						s = s / 1000;
						s = parseFloat(s).toFixed(1) + ' ' + I18n.getMsg('MB');
					}else if(s !== 0){
						s = parseFloat(s).toFixed(2) + ' ' + I18n.getMsg('KB');
					}
				}else{
					s = parseFloat(s).toFixed(1) + ' ' + I18n.getMsg('B');
				}
				attachment.formattedSize = s;
				for(var key in this.extensionMap) {
					if(this.extensionMap[key].indexOf(fileExtn) !== -1) {
						extensionFound = true;
						attachment.mappedFileExtn = key;
						attachment.isImage = false;
						if(key === "png") {
							if(fileExtn !== "svg") {
								attachment.isImage = true;
							}
						attachment.downLoadMode = ""; //NO I18n
						break;
						} else if(key === "excel") { //NO I18n
							attachment.downLoadMode = "sheet"; //NO I18n
							break;
						} else if(key === "ppt") { //NO I18n
							attachment.downLoadMode = "show"; //NO I18n
							break;
						} else if(key === "word" || key === "txt" || key === "htm" || key === "html" || key === "sxw") { //NO I18n
							attachment.downLoadMode = "writer"; //NO I18n
							break;
						} else if(key === "pdf") { //NO I18n
							attachment.downLoadMode = "pdfViewPlugin"; //NO I18n
							break;
						}
					}
				}
				if(!extensionFound) {
					attachment.mappedFileExtn = "file"; //NO I18N
				}
			}
			if(this.data.cxPropNote.$attachments) {
				this.data.cxPropNote.$attachments.forEach(assignMode.bind(this));
			}
			this.setData('currentNoteUploadedAttachments',this.data.cxPropNote.$attachments ? Array.from(this.data.cxPropNote.$attachments) : [] );
			this.setData('shareToCustomerCheck',this.data.cxPropNote.$is_shared_to_client)
			var noteContent = this.data.cxPropNote.Note_Content ? this.data.cxPropNote.Note_Content : "";
			var temp
			if(noteContent) {
				temp = this.editorMentions(noteContent);
				noteContent = this.data.cxPropRichTextFormat ? temp.noteContent : noteContent ;
			}
			var textarea
			if(this.data.cxPropRichTextFormat){
				textarea = this.$node.querySelector("lyte-texteditor"); //NO i18n
				this.setData('mentionedMentions',temp && temp.mentions ? temp.mentions : []);
				this.updateOnInit = true;
				textarea.ltProp('data',noteContent)
				this.originalContent = this.getNoteContent();
				this.updateOnInit = true;
			}else{
				textarea = this.$node.querySelector("lyte-input textarea"); //NO i18n
				// textarea.value = noteContent;
				this.formattedNoteText = noteContent;
				this.originalContent = noteContent;
				var evt;
				if(typeof(Event) === 'function') { //NO I18N
				    evt = new Event('change'); //NO I18N
				} else {
				    evt = document.createEvent('Event'); //NO I18N
				    evt.initEvent('change', true, true); //NO I18N
				}
				this.bindMentionPlugin(temp && temp.mentions ? temp.mentions : [], false);
				$L(textarea).cruxMention("setMessage" , {message : noteContent,collection : temp.mentions});
				textarea.dispatchEvent(evt);
				this.onTextAreaTransitionFn(textarea);
			}
			this.originalNote = Object.assign(Lyte.deepCopyObject(this.data.cxPropNote),{Note_Content : this.originalContent})

			textarea.focus();
		}
	}.observes('cxPropNote').on('didConnect'),
	actions : {
		keyPressInContent : function(event,node){
			if(this.data.showMention && [9,38,40,13].indexOf(event.keyCode) > -1){
				if(event.keyCode === 9){
					event.preventDefault();
					event.stopPropagation();
				}
				var item = this.mentionMenuBody.querySelector('.lyteMenuSelection');
				if(!item){
					this.mentionMenuBody.querySelector('lyte-menu-item').classList.add('lyteMenuSelection');
					return;
				}
				if(event.keyCode === 13 || event.keyCode === 9){
					item.click();
					event.preventDefault();
					event.stopPropagation();
				}else{
					var newElement = event.keyCode === 38 ? item.previousElementSibling : item.nextElementSibling;
					if(newElement && newElement.nodeName === 'LYTE-MENU-ITEM'){
						newElement.classList.add('lyteMenuSelection');
						item.classList.remove('lyteMenuSelection');
					}
					
				}

			}
			if(this.data.cxPropShowTitle &&  event && event.keyCode === 38 && ((this.data.cxPropRichTextFormat && (this.currentCursor === 0 || this.currentCursor === 0.5) && node.findIndex(this.currentWord).wordIndex === 0 && node.findIndex(this.currentWord).paraIndex === 0 )|| (event.target.selectionStart === 0))){
				this.$node.querySelector('#noteTextTitle'+this.data.cxPropId).focus();
			}
		},
		titleMadeFocus : function(){
			this.setData('formattingDsiabled',true);
		},
		addMention : function(event,record){
			var texteditor = $L('lyte-texteditor',this.$node);
			var text;
			var queuelength = this.mentionQuery.length;//NO I18N
			// var i = 0;
			// while(i<queuelength){
			// 	texteditor[0].undo();
			// 	i++;
			// } 
			// texteditor[0].undo();
			Lyte.arrayUtils(this.data.mentionedMentions,'push',record);
			texteditor[0].removeLetters(queuelength+1)
			if(record.$setype === "Users") { //NO i18n
  				text = '@['+_lyteUiEditor.escapeText(record.full_name)+':'+record.id+':user]'
  			} else if(record.$setype === "Roles") { //NO i18n
  				text = '@['+_lyteUiEditor.escapeText(record.name)+':'+record.id+':role]'
  			} else if(record.$setype === "Groups") { //NO i18n
  				text = '@['+_lyteUiEditor.escapeText(record.name)+':'+record.id+':group]'
  			}
			texteditor[0].insertHTML('<span style="color : var(--linkColor);">'+text+'</span><span> </span>');
			this.setData('showMention',false);
			texteditor[0].focus()
		},
		openHideEditorPanel : function(key){
			if(key){
				if(event.keyCode !== 32){
					return;
				}
				event.preventDefault();
			}
			if(!this.data.formattingDsiabled){
				this.setData('showEditorPanel',!this.data.showEditorPanel);
			}
			if(this.data.showEditorPanel){
				if(this.getMethods('onEditorPanelOpen')){
					/**
					 * @method onEditorPanelOpen
					 * @author naveen.winson
					 * @version 1.0.0
					 */
					this.executeMethod('onEditorPanelOpen')
				}
			}else{
				if(this.getMethods('onEditorPanelClose')){
					/**
					 * @method onEditorPanelClose
					 * @author naveen.winson
					 * @version 1.0.0
					 */
					this.executeMethod('onEditorPanelClose')
				}
			}
		},
		saveNoteOnEnter: function(event) {
			// this.checkSaveButtonStatus();
			if(event && event.target.value.length === event.target.selectionStart && (event.keyCode === 13 || event.keyCode === 40)) {
				this.$node.querySelector('#noteTextarea'+this.data.cxPropId).focus();
			}
		},
		openNotesTextarea : function(){
			this.openNoteArea();
		},
		saveNote : function(){
			this.saveNoteArea();
		},
		closeNotesTextarea : function(){
			this.closeNoteArea();
		},
		removeAttachment: function(event) {
			var attachDiv = event.target.parentElement;
			var classes = attachDiv.classList;
			var classesLen = classes.length;
			var attachmentId = undefined;

			for(var i = 0; i < classesLen; i++) {
				if(classes[i].indexOf("cxAtt_") !== -1) {
					attachmentId = classes[i].substring(6);
					break;
				}
			}

			if(attachmentId && this.removedAttachments.indexOf(attachmentId) === -1) {
				Lyte.arrayUtils(this.data.currentNoteUploadedAttachments,'removeAt',this.data.currentNoteUploadedAttachments.cruxFindIndexOfObject('id',attachmentId))
				this.removedAttachments.push(attachmentId);
				this.checkSaveButtonStatus();
			}

			if(!this.isFileUploadPluginBound && FileUploader) {
				this.uploadFile(true);
			} else if(typeof FileUploader !== "undefined" && this.uploaderObj.maxFiles < this.uploaderObj.maxAllowedFiles) {
				this.uploaderObj.maxFiles += 1;
				this.uploaderIns.options.maxFiles = this.uploaderObj.maxFiles;
			}
		},
		onTextAreaTransition : function(node){
			this.onTextAreaTransitionFn(node);
		},
	},
	methods : {
		textEditorNodeProcess : function(node){
			if(node.style.fontWeight == 'var(--font-weight-bold)'){
				node.style.fontWeight = 'bold'
			}
		},
		onBeforeEditorInputCall : function(word,text,cursor,entered_text,element){
			if(this.getMethods('onBeforeEditorInput')){
				/**
				 * @method onBeforeEditorInput
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } word
				 * @param { * } text
				 * @param { * } cursor
				 * @param { * } entered_text
				 * @param { * } element
				 */
				return this.executeMethod('onBeforeEditorInput',word,text,cursor,entered_text,element)
			}
			return entered_text
		},
		onTextEditorAnchorShow : function(editor,popover){
			popover.querySelector(".lyteEditorLinkUserInput").setAttribute("data-zcqa", "cx_notes_lyteEditor_link_text_input"),
            popover.querySelector(".lyteEditorLinkURLInput").setAttribute("data-zcqa", "cx_notes_lyteEditor_link_url_input"),
            popover.querySelector("lyte-button").setAttribute("data-zcqa", "cx_notes_lyteEditor_link_url_button")
		},
		resizeStart : function(node){
			node.classList.remove('cxNoteEditorScrollDisable');
		},
		titleChange : function(){
			this.checkSaveButtonStatus();
		},
		shareToCustomerChange : function(){
			setTimeout(()=>{
				this.checkSaveButtonStatus();	
			},10);
		},
		contentMadeFocus : function(){
			this.setData('formattingDsiabled',false);
			if(this.getMethods('onNoteEditorFocused')){
				/**
				 * @method onNoteEditorFocused
				 * @author naveen.winson
				 * @version 1.0.0
				 */
				this.executeMethod('onNoteEditorFocused')
			}
		},
		textEditorWordChange : function(undo,redo,queue,comp){
			var html = this.removeTabLevel(comp.getHTML(true,true).trim());
			this.formattedNoteText = html === "<br>" ? "" : html;
			if(this.formattedNoteText.length > this.data.cxPropMaxNoteContentLimit) {
				comp.undo()
				var check = true;
				if(this.getMethods('onBeforeCustomMessage')){
					/**
					 * @method onBeforeCustomMessage
					 * @author naveen.winson
					 * @version 1.0.0
					 * @param { * } _cruxUtils.getI18n('crux.note.content.limit.warning.msg', this.data.cxPropMaxNoteContentLimit)
					 * @param { * } 'crux.note.content.limit.warning.msg'
					 * @param { * } this.data.cxPropMaxNoteContentLimit
					 */
					check = this.executeMethod('onBeforeCustomMessage',_cruxUtils.getI18n('crux.note.content.limit.warning.msg', this.data.cxPropMaxNoteContentLimit),'crux.note.content.limit.warning.msg',this.data.cxPropMaxNoteContentLimit);
				}
				if(check){
					_cruxUtils.showCustomMessage({ params: { ltPropMessage: _cruxUtils.getI18n('crux.note.content.limit.warning.msg', this.data.cxPropMaxNoteContentLimit), ltPropType: "warning" } }); // No I18N
				}
				return;
			}
			if(!this.data.editorHasBeenResized && this.data.cxPropResizeEditor){
				var height,editorNode,top;
				$L.fastdom.mutate(function(){
					editorNode = comp.querySelector('.lyteEditorMainDiv');
				    $L.fastdom.measure(function(){
				    	var sT=0;
				    	if(this.data.cxPropTextEditorHeight -25 <= this.data.cxPropMaxContentHeight){
				    		sT = editorNode.scrollTop;
				    		editorNode.style.height = 'auto';

				    	}
				        height = editorNode.scrollHeight;
				        if(this.data.cxPropTextEditorHeight -25 <= this.data.cxPropMaxContentHeight){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				    		editorNode.style.height = '';
				    	}
				        $L.fastdom.mutate(function(){
				        	if(this.data){
				        		if(height > this.data.cxPropMaxContentHeight){
					        		height = this.data.cxPropMaxContentHeight;
					        		// this.setData('scrollDisabledClass',true);
					        		comp.classList.remove('cxNoteEditorScrollDisable');
					        	}else{
					        		// var top = editorNode.scrollTop
					        		editorNode.style.height = 'auto';
							        height = editorNode.scrollHeight; //eslint-disable-line @zoho/webperf/layout-thrashing
							        editorNode.style.height = '';
							        comp.classList.add('cxNoteEditorScrollDisable');
							        // editorNode.scrollTop = top
					        	}
				        	}
				            this.setData('cxPropTextEditorHeight',height+25);
				            if(!this.withoutScroll){
				            	editorNode.scrollTop = sT;
				            }
				        }.bind(this));
				    }.bind(this));
				}.bind(this));
			}
			if(!this.withoutScroll){
				this.onTextAreaTransitionFn();
			}
			this.withoutScroll = undefined	
			this.formattedNoteText = this.getNoteContent();
			this.checkSaveButtonStatus(this.formattedNoteText);
		},
		mentionRequest : function(query,node){
			var aleradyMentioned = node.getMentions().map(function(item){return item.id})
			if(query.length < 2 || query.split("  ").length > 1) {
              this.displayMention([]);
              return false;
            }
            if(this.getMethods('onShowMentions')){
													/**
													 * @method onShowMentions
													 * @author naveen.winson
													 * @version 1.0.0
													 */
            	this.executeMethod('onShowMentions');
            }
			var queryParam = this.data.cxPropMentionQueryParam;
            var qp = {"searchword": query, "meta_resources": ["users", "groups", "roles"].join(), "display_field": true, page: 1, per_page: 200}; //NO I18N

	        for(var key in queryParam) {
	          qp[key] = queryParam[key];
	        }
	        this.mentionQuery = query;
	        store.findAll("global-search", qp).then(function(res){
	        	// var arr = []
	        	// res.forEach(function(item){
	        	// 	if(aleradyMentioned.indexOf(item.id) == -1){
	        	// 		arr.push(item)
	        	// 	}
	        	// })
	          	this.displayMention(res);
	        }.bind(this),function(error){
	        	this.response = error;
	        }.bind(this)); //NO i18n
            
			return false
		},
		editorResized : function(){
			// this.$node.querySelector('.editorPanelPopover').alignPopover();
			this.setData('editorHasBeenResized',true)
		},
		beforeEmojiClose : function(eve){
			if(eve && eve.target && eve.target.nodeName === 'LYTE-POPOVER-FREEZE'){
				return true;
			}
			var node = eve && eve.target && eve.target.closest('.cxNotesEditorWrapperClass')
			if(node){
				return false;
			}
		},
		mentionMenuClosed : function(){
			// if(this.data.showMention)
			this.setData('showMention',false);
			this.setData('cxPropEditorShortCuts',this.getCruxNoteEditorShortcuts());
		},
		onBeforeMentionMenuClose : function(menu,event){
			if(event.keyCode === 9){
				return false;
			}
		},
		mentionMenuOpen : function(m){
			var a = Object.assign(this.data.cxPropEditorShortCuts);
			delete a[13];
			delete a[38];
			delete a[40];
			this.setData('cxPropEditorShortCuts',a);
			this.mentionMenuBody = m.component.childComp;
			this.mentionMenuBody.querySelector('lyte-menu-item').classList.add('lyteMenuSelection');
		},
		textEditorCursorChange : function(a,b,c,d,event){
			this.currentCursor = b;
			if(event && (event.keyCode === 38 || event.keyCode === 40)){
				this.onTextAreaTransitionFn();
			}
		},
		textEditorWordChangeCl : function(a,b,c,node){
			this.currentCursor = node.getCursor();
			this.currentWord = b;
		},
		noteShortCuts : function(event,shortCut){
			if(shortCut.value === 'saveNote' && !this.data.cxPropDisableSave){
				this.saveNoteArea();
			}
		},
		textEditorOnPaste : function(node){
			node.querySelectorAll('*').forEach(el => el.removeAttribute('class'));
			var te = $L('#noteTextarea'+ this.data.cxPropId,this.$node)[0];
			var json = te.component.convertHtmlToData(node.innerHTML);
			te.component.remove_style( json );
			var str = te.component.stringFromData( json );
			var fs = _lyteUiEditor.convert_simple( te.component, str, true ).replace(/<br\s*\/?>$/, "");
			if(fs.length > this.data.cxPropMaxNoteContentLimit) {
				_cruxUtils.showCustomMessage({ params: { ltPropMessage: _cruxUtils.getI18n('crux.note.content.limit.warning.msg', this.data.cxPropMaxNoteContentLimit), ltPropType: "warning" } }); // No I18N
				return new Promise((res,rej)=>{
					rej();
				});
			}
			node.innerHTML = node.innerHTML.replace( /<span([^>]+)>@\[([^<]+?):([^<]+?):(.{0,}?)\]<\/span>/g , function(){
				return arguments[2]; //eslint-disable-line @zoho/zstandard/no-reserved-words
			});
			if(this.getMethods('onBeforeEditorPaste')){
				/**
				 * @method onBeforeEditorPaste
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } node
				 */
				return this.executeMethod('onBeforeEditorPaste',node);
			}
		    return node;
		},
		textEditorOnBeforePaste : function(clipboard){
			// var te = $L('#noteTextarea'+ this.data.cxPropId,this.$node)[0];
			// var json = te.component.convertHtmlToData(clipboard.clipboardData.getData('text/html'));
			// te.component.remove_style( json );
			// var str = te.component.stringFromData( json );
			// var fs = _lyteUiEditor.convert_simple( te.component, str, true ).replace(/<br\s*\/?>$/, "");
			// if(fs.length > this.data.cxPropMaxNoteContentLimit) {
			// 	_cruxUtils.showCustomMessage({ params: { ltPropMessage: _cruxUtils.getI18n('crux.note.content.limit.warning.msg', this.data.cxPropMaxNoteContentLimit), ltPropType: "warning" } }); // No I18N
			// 	return false;
			// }
			// return true;
		},
		textEditorAfterRender : function(elem){
			if(this.getMethods('onTextEditorElementAfterRender')){
				/**
				 * @method onTextEditorElementAfterRender
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } elem
				 */
				this.executeMethod('onTextEditorElementAfterRender',elem)
			}
		}
	},
	editorMentions : function(noteContent){
		var userMentions = [];
		var roleMentions = [];
		var groupMentions = [];
		var regExp = new RegExp("crm[[aA-zZ]*#[0-9]*#[0-9]*]crm","gi"); //No I18n
		noteContent = noteContent.replace("&#x5b;", "["); //No i18n
		noteContent = noteContent.replace("&#x23;", "#"); //No i18n
		noteContent = noteContent.replace("&#x5d;", "]"); //No i18n

		var matches = noteContent.match(regExp);
		var matchesLen = matches ? matches.length : 0;
		var mention;

		for(var j = 0; j < matchesLen; j++) {
			var startPos = matches[j].indexOf("#");
			var endPos = matches[j].lastIndexOf("#");
			var mentionId = matches[j].slice(startPos + 1,endPos);

			if(matches[j].indexOf("user") !== -1) { //No I18n
				mention = store.peekRecord("user", mentionId); //NO I18N
				if(this.data.cxPropRichTextFormat){
					noteContent = noteContent.replace(matches[j], mention ? "<span style='color : var(--linkColor);'>@["+_lyteUiEditor.escapeText(mention.full_name)+':'+mention.id+':user]</span>' : ""); //No I18n
				}else{
					noteContent = noteContent.replace(matches[j], mention ? "@" + mention.full_name : ""); //No I18n
				}
				

				if(mention) {
					mention.$setype = "Users"; //NO I18N
					userMentions.push(mention);
				}
			} else if(matches[j].indexOf("role") !== -1) { //No I18n
				mention = store.peekRecord("role", mentionId); //NO I18N
				if(this.data.cxPropRichTextFormat){
					noteContent = noteContent.replace(matches[j], mention ? "<span style='color : var(--linkColor);'>@["+_lyteUiEditor.escapeText(mention.name)+':'+mention.id+':role]</span>': ""); //No I18n
				}else{
					noteContent = noteContent.replace(matches[j], mention ? "@" + mention.name : ""); //No I18n
				}
				if(mention) {
					mention.$setype = "Roles"; //NO I18N
					roleMentions.push(mention);
				}
			} else if(matches[j].indexOf("group") !== -1) { //No I18n
				mention = store.peekRecord("user_group", mentionId); //NO I18N
				if(this.data.cxPropRichTextFormat){
					noteContent = noteContent.replace(matches[j], mention ? "<span style='color : var(--linkColor);'>@["+_lyteUiEditor.escapeText(mention.name)+':'+mention.id+':group]</span>' : ""); //No I18n
				}else{
					noteContent = noteContent.replace(matches[j], mention ? "@" + mention.name : ""); //No I18n
				}

				if(mention) {
					mention.$setype = "Groups"; //NO I18N
					groupMentions.push(mention);
				}
			}
		}
		return {noteContent : noteContent,mentions : userMentions.concat(roleMentions).concat(groupMentions)}
	},
	onTextAreaTransitionFn : function(node){
		if(!node){
			node = $L('.cxNotesTextarea',this.$node)[0];
			if(!node){
				node = $L('#noteTextarea'+ this.data.cxPropId)[0];
			}
		}
		var scrollParent = this.data.cxPropParentElementScroll ? this.$node.closest(this.data.cxPropParentElementScroll) :  $L(node).cxGetScrollParent();
		if(scrollParent){
			if(this.data.cxPropRichTextFormat){
				var cursorNode = this.$node.querySelector('.note_editorCursor');
				if(cursorNode){
					cursorNode.style.display = 'block';
					if(cursorNode.cxVisbleInViewPort(this.data.cxPropBoundary)){
						cursorNode.style.display = '';
						return;
					}
					cursorNode.scrollIntoView();
					cursorNode.style.display = '';
				}else{
					if(node.cxVisbleInViewPort(this.data.cxPropBoundary)){
						return;
					}
					node.scrollIntoView();
				}
				scrollParent.scrollTop = scrollParent.scrollTop - (scrollParent.clientHeight/2);
			}else{
				// node.scrollIntoView();
				// scrollParent.scrollTop = scrollParent.scrollTop + node.clientHeight -170;
			}
			if(this.data.cxPropScrollPosition && this.data.cxPropScrollPosition.top){
				scrollParent.scrollTop = scrollParent.scrollTop-this.data.cxPropScrollPosition.top;
			}
		}
	},
	displayMention : function(records){
		if(records.length > 0){
			this.setData('showMention',true);
			this.setData('mentions',records)
		}else{
			this.setData('showMention',false);
		}
	},
	checkSaveButtonStatus : function(cont){
		if(this.uploaderIns && this.uploaderIns.files && this.uploaderIns.files.length){
			this.setData('showAttachmentBorder',true);
		}
		if(this.uploaderIns && this.uploaderIns.files && this.uploaderIns.files.cruxFilterBy({status : 'uploading'}).length){
			this.setData('cxPropDisableSave',true);
			return;
		}
		var title = this.data.cxNoteTitle ? this.data.cxNoteTitle.trim() : "";
		var content = cont ? cont : this.getNoteContent();
		if(title == "" && content == ""){
			this.setData('cxPropDisableSave',true);
			return;
		}
		if(this.data.cxPropNote){
			var note = this.data.cxPropNote
			var noteTitle = note.Note_Title ? note.Note_Title : "";
			if(((title || title === '') && title !== noteTitle) || ((content || content === '') && content !== this.originalContent) || this.removedAttachments.length || (this.uploaderObj && this.uploaderObj.newUploadCount > 0) || (this.data.cxPropShowShareToCustomer && (note.$is_shared_to_client !== this.data.shareToCustomerCheck))){
				this.setData('cxPropDisableSave',false);
			}else{
				this.setData('cxPropDisableSave',true);
			}
		}else{
			this.setData('cxPropDisableSave',false);
		}
		
	},
	closeNoteArea : function(){
		if(this.data.expandedArea){
			if(this.uploaderIns && this.uploaderIns.destroy){
				this.uploaderIns.destroy() 
			}
			this.bindMentionPlugin([],true)
			if(this.data.cxPropBluePencil){
				this.proofingInstance.destroyInstance();
			}
			this.setData('expandedArea',false);
			this.formattedNoteText = "";
			this.setData('shareToCustomerCheck',false);
			this.setData("currentNoteUploadedAttachments", []); //NO I18N
			this.setData('showEditorPanel',false)
			this.setData('cxPropTextEditorHeight',84);
			this.setData('scrollDisabledClass',false);
			this.setData('editorHasBeenResized',false);
			this.isFileUploadPluginBound = false;
			this.onTextAreaTransitionFn();
			this.checkSaveButtonStatus();
			if(this.getMethods('onCloseNotesEditor')){
				/**
				 * @method onCloseNotesEditor
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } this.data.cxPropNote
				 */
				this.executeMethod('onCloseNotesEditor',this.data.cxPropNote)
			}
		}
	},
	removeTabLevel: function (inputString) {
		var regex = /--tablevel:\d+;/g;
		var newregec = /--tablevel:\d+/g;
		return inputString.replace(regex, '').replace(newregec,'');
	},
	getNoteContent : function(){
		var currentNoteId = this.data.cxPropNote && this.data.cxPropNote.id || '';
		var formattedNoteHTML,formattedNoteText;
		if(this.data.cxPropRichTextFormat){
			var textEditor = this.$node.querySelector('lyte-texteditor')
			formattedNoteText = textEditor ? textEditor.getText().trim() : "";
			if(!formattedNoteText){
				return "";
			}
			formattedNoteHTML = this.removeTabLevel(textEditor.getHTML(true,true).trim());
			formattedNoteHTML = formattedNoteHTML.replace(/<br>$/,'');
			formattedNoteHTML = formattedNoteHTML.trim()
			textEditor.getMentions().forEach(function(item){
				var mentionText = '@['+_lyteUiEditor.escapeText(item.text)+':'+item.id+':'+item.module+']'
				var mention = this.data.mentionedMentions.cruxFilterBy({id : item.id})[0]
				var crmMentionText
				if(item.module == 'user'){
					crmMentionText = 'crm['+'user'+'#'+item.id+'#'+mention.zuid+']crm'
				}else if(item.module == 'role'){
					crmMentionText= 'crm['+'role'+'#'+item.id+'#'+item.id+']crm'
				}else{
					crmMentionText= 'crm['+'group'+'#'+item.id+'#'+item.id+']crm'
				}
				var fullMentionText = "<span editable='false' style='color: var(--linkColor);'>"+mentionText+"</span>"
				if(formattedNoteHTML.indexOf(fullMentionText) > -1){
					formattedNoteHTML = formattedNoteHTML.replace(fullMentionText,crmMentionText);
				}else{
					formattedNoteHTML = formattedNoteHTML.replace(mentionText,crmMentionText);
				}	
			}.bind(this))
			formattedNoteText = textEditor.getText();
		}else{
			formattedNoteText = this.formattedNoteText.trim();
		}
		formattedNoteText = formattedNoteText ? formattedNoteText : ""; //NO I18N
		if(formattedNoteText.length > this.data.cxPropMaxNoteContentLimit) {
			var check = true;
			if(this.getMethods('onBeforeErrorAlert')){
				/**
				 * @method onBeforeErrorAlert
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } _cruxUtils.getI18n.apply(undefined, ['crm.message.limit.exceed', this.data.cxPropMaxNoteContentLimit+"", 'Content'])
				 * @param { * } 'crm.message.limit.exceed'
				 * @param { * } this.data.cxPropMaxNoteContentLimit
				 */
				check = this.executeMethod('onBeforeErrorAlert',_cruxUtils.getI18n.apply(undefined, ['crm.message.limit.exceed', this.data.cxPropMaxNoteContentLimit+"", 'Content']),'crm.message.limit.exceed',this.data.cxPropMaxNoteContentLimit);
			}
			if(check){
				_cruxUtils.showCustomAlert({
					 params : {ltPropSecondaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.message.limit.exceed', this.data.cxPropMaxNoteContentLimit+"", 'Content'])} //no i18n
				})
			}
			return;
		}
		if(this.data.cxPropRichTextFormat){
			formattedNoteText = formattedNoteHTML
		}
		return formattedNoteText
	},
	saveNoteArea : async function(){
		var currentNoteId = this.data.cxPropNote && this.data.cxPropNote.id || '';
		var formattedNoteText = this.getNoteContent()

		var noteTitle = this.data.cxNoteTitle; //NO I18n
		noteTitle = noteTitle ? noteTitle.trim() : ""; //NO I18N
		if(!noteTitle && !formattedNoteText.trim()) {
			return;
		}
			
		if(!currentNoteId && (noteTitle || formattedNoteText)) {
			if(this.checkPermission("create", currentNoteId) === false) {
				_cruxUtils.showCustomAlert({
					 params : {ltPropSecondaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error'])} //no i18n
				})
				return;
			}
		}
		if(this.requestResolved !== undefined && !this.requestResolved) {
			return;
		}
		var makeRequest = true;
		var noteRec;
		var shareToCustomer = this.getData("isClientPortalUser") ? true : this.data.shareToCustomerCheck; //NO I18N

		if(currentNoteId) {
			noteRec = store.peekRecord("note", currentNoteId); //NO I18N
			if(noteRec) {
				var existingNoteTitle = noteRec.Note_Title || "";
				var existingNoteContent = noteRec.Note_Content || "";
				if(noteTitle || formattedNoteText) {
					noteRec.$.set("$is_shared_to_client", shareToCustomer); //NO I18N
					if(noteTitle === existingNoteTitle && formattedNoteText === existingNoteContent && noteRec.$.isDirty() === false) {
						makeRequest = false;
					} else {
						noteRec.$.set("Note_Title", noteTitle); //NO I18n
						noteRec.$.set("Note_Content", formattedNoteText); //NO I18n
					}
					if(this.removedAttachments.length > 0) {
						makeRequest = false;
						if(this.getMethods("onBeforeAddNote")) {
                 /**
                  * @method onBeforeAddNote
                  * @author naveen.winson
                  * @version 1.0.0
                  * @param { * } noteRec
                  * @param { * } this.originalNote
                  */
							noteRec = await this.executeMethod("onBeforeAddNote", noteRec,this.originalNote); //NO I18N
						}
						this.clearRemovedFilesFromNote(currentNoteId);
					} else if(this.uploaderObj && this.uploaderObj.newUploadCount > 0) {
						makeRequest = false;
						if(this.getMethods("onBeforeAddNote")) {
							noteRec = await this.executeMethod("onBeforeAddNote", noteRec,this.originalNote); //NO I18N
						}
						this.uploadNewFiles(currentNoteId);
					}
				} else {
					makeRequest = false;
				}
			}
		}
		if(makeRequest) {
			var moduleApi = this.moduleApi;
			var entityId = this.getData("cxPropEntity").id; //NO I18N
			if(!currentNoteId && (noteTitle || formattedNoteText)) {
				var newRecord = !currentNoteId;
				var currentNoteEntityId = this.currentNoteEntityId ? this.currentNoteEntityId : entityId;
				var currentNoteModuleApi = this.currentNoteModuleApi ? this.currentNoteModuleApi : moduleApi;
				var attachmentObj = this.attachmentObj;

				var noteRecord = {
					"Parent_Id": {id: currentNoteEntityId}, //NO i18n
					"$se_module": currentNoteModuleApi, //NO i18n
					"Note_Title": noteTitle, //NO i18n
					"Note_Content": formattedNoteText, //NO i18n
					"$attachments": attachmentObj, //NO I18N
					"$is_shared_to_client": shareToCustomer //NO I18N
				}
				noteRec = store.createRecord("note", noteRecord); //NO i18n

			}
			if(this.getMethods("onBeforeAddNote")) {
				noteRec = await this.executeMethod("onBeforeAddNote", noteRec,this.originalNote); //NO I18N
			}

			if(noteRec && (noteRec.$.isDirty() || noteRec.$.isNew)) {
				this.requestResolved = false;
				this.setData('cxPropDisableSave',true);
				if(this.getMethods('onBeforeNoteRequest')){
					/**
					 * @method onBeforeNoteRequest
					 * @author naveen.winson
					 * @version 1.0.0
					 * @param { * } noteRec
					 */
					this.executeMethod("onBeforeNoteRequest", noteRec); //NO I18N
				}
				noteRec.$.save({"noteId": currentNoteId}).then(async function(saveStatus) { //NO i18n
					store.clearCachedQuery('note')
					var noteId = newRecord ? saveStatus.note.id : currentNoteId;
					this.requestResolved = true;
					await this.updateCurrentNote(noteId, newRecord);
					this.setData('cxPropDisableSave',false);
				}.bind(this), function(error) {
					noteRec.$.rollBack();
					this.setData('cxPropDisableSave',false);
					this.requestResolved = true;
					
					if(error) {
						var response = JSON.parse(error.response);
						response = response.data ? response.data[0] : response;

						if(response.code === "INVALID_DATA" || (response.code === "NO_PERMISSION" && (response.message === "permission denied" || response.details && response.details.permissions[0] === "Crm_Implied_Create_Attachments"))) {
							if(response.details && response.details.api_name === 'id'){
								_cruxUtils.showCustomMessage({params : {ltPropMessage : _cruxUtils.getI18n('crm.translation.refresh.cases'),ltPropType : 'error'}});
								this.closeNoteArea();
							}else{
								_cruxUtils.showCustomAlert({ params : {ltPropSecondaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } });
							}
							
						} else if(response.code === "MAX_RECORDS_LIMIT_REACHED") {
							this.setData("maxStorage", error.details.size); //NO I18N
							this.$node.querySelector(".noteDataStorageLimit").ltProp("show", true); //NO I18N
						}
					} else {
						this.closeNoteArea();
						this.currentNoteId = ""; //NO I18N
					}
					if(this.getMethods('onNotesRequestError')){
						/**
						 * @method onNotesRequestError
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } error
						 * @param { * } 'edit'
						 */
						this.executeMethod('onNotesRequestError',error,'edit');
					}
				}.bind(this));
			}
		} else if(noteRec && noteRec.$.isDirty() === false && this.uploaderObj && !this.uploaderObj.newUploadCount && !this.removedAttachments.length){
			this.closeNoteArea();
		}
	},
	getNoteValue : function(){
		if(this.data.cxPropDisableSave || !this.data.expandedArea){
			return false;
		}
		var formattedNoteText = this.getNoteContent()

		var noteTitle = this.data.cxNoteTitle; //NO I18n
		noteTitle = noteTitle ? noteTitle.trim() : ""; //NO I18N
		if(!noteTitle && !formattedNoteText.trim()) {
			return;
		}

		var shareToCustomer = this.getData("isClientPortalUser") ? true : this.data.shareToCustomerCheck; //NO I18N
		var moduleApi = this.moduleApi;
		var entityId = this.getData("cxPropEntity").id; //NO I18N
		var currentNoteEntityId = this.currentNoteEntityId ? this.currentNoteEntityId : entityId;
		var currentNoteModuleApi = this.currentNoteModuleApi ? this.currentNoteModuleApi : moduleApi;
		var attachmentObj = this.attachmentObj;

		var noteRec = {
			"Parent_Id": {id: currentNoteEntityId}, //NO i18n
			"$se_module": currentNoteModuleApi, //NO i18n
			"Note_Title": noteTitle, //NO i18n
			"Note_Content": formattedNoteText, //NO i18n
			"$attachments": attachmentObj, //NO I18N
			"$is_shared_to_client": shareToCustomer //NO I18N
		}
		noteRec = store.createRecord("note", noteRec); //NO i18n
		return noteRec;

	},
	openNoteArea : function(){
		if(!this.data.expandedArea){
			this.openNoteAreaSet = true;
			this.setData('expandedArea',true);
			this.bindMentionPlugin([],false)
			if(this.getData("currentNoteUploadedAttachments").length < 5 && typeof FileUploader !== "undefined") {
				this.uploadFile();
			}
			var _self = this;
			this.setData('cxNoteTitle','');

			if(this.data.cxPropBluePencil){
				// ZBluePencil.setConfiguration({
				//     enableDarkMode: true,  //To set Popup card dark mode
				//     hideCardIcon: true //To hide zia in Popup card 
				// });
				function setProofingInstance(){
					var instanceOptions = {
					   spell: {
						   ignoreUpperCaseWords: false,
						   ignoreMixedCaseWords: true,
						   ignoreNumberedWords: true
					   },
					   style: {
						   wordyPhrases: true,
						   rephrasableSentences: true,
						   improperWordChoice: true,
						   informalWriting: true,
						   nonInclusiveLanguage: false
					   }
					};
					var te = $L('#noteTextarea'+ _self.data.cxPropId,_self.$node)[0];
					_self.proofingInstance = ZBluePencil.getInstance(te.querySelector('.lyteEditorMainDiv'), instanceOptions);
					_self.proofingInstance.checkStyle(_self.data.cxPropUserLocale);
				}
				if(!Crm.userDetails.IS_BLUEPENCIL_LOADED){
					var optionsJSON = {
					   onLoad: function (){
						   Crm.userDetails.IS_BLUEPENCIL_LOADED = true;
						   setProofingInstance();
					   },
					   from: "crm"//No I18N
					};
					ZBluePencil.load(optionsJSON);
				//	Crm.userDetails.IS_BLUEPENCIL_LOADED = true;
				}
				else{
					setProofingInstance();
				}
				
			}
			if(this.getMethods('onOpenNoteEditor')){
				/**
				 * @method onOpenNoteEditor
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } this.data.cxPropNote
				 */
				this.executeMethod('onOpenNoteEditor',this.data.cxPropNote);
			}
			// noteEditor.style.height = "84px" //no i18n
			// this.setData('textEditorHeight')
			// var width = this.$node.querySelector('.cxNotesFooter').getBoundingClientRect().width
			// // if(width > 330){
			// 	width -= 220
			// // }else{
			// // 	width -= 40
			// // }
			// var yieldWidth = this.$node.querySelector('.cxFooterRightPrefixYield').getBoundingClientRect().width
			// width-=yieldWidth
			// this.setData('editorPanelWidth',width+'px')
			this.openNoteAreaSet = false;
		}
		var noteEditor = this.$node.querySelector('.cxNotesTextarea');
		noteEditor.focus();
	},
	uploadFile: function(fromRemoveAttach) {
		if(this.data.cxPropDisableAttachmentActions){
			return true;
		}
		var self = this;
		var entityId = this.getData("cxPropEntity").id; //NO I18n
		var moduleApi = this.moduleApi;
		var currentNoteId = this.data.cxPropNote && this.data.cxPropNote.id || '';
		var isEdit = currentNoteId || false;
		if(currentNoteId) {
			var attachments = store.peekRecord("note", currentNoteId).$attachments; //NO I18N
			self.alreadyAttachedFilesCount = attachments ? attachments.length : 0;
			if(fromRemoveAttach) {
				self.alreadyAttachedFilesCount -= 1;
			}
		}else{
			self.alreadyAttachedFilesCount = 0;
		}
		if(!this.isFileUploadPluginBound) {
			this.isFileUploadPluginBound = true;
			this.uploaderObj = {
				previewsContainer :this.$node.querySelector('.cruxNoteFiles' + self.getData("cxPropId")),// No I18N
				createImageThumbnails : true,
				needWMSFallback : true,
				needVirusFilter : true,
				virusFilter : {
					okMessage : function() {
						var virusfiles = this.getFilesWithMaliciousContents();
						return (this.files.length === virusfiles.length)
						? _cruxUtils.getI18n("crm.fileuploader.message.savenoteswithoutattachments") : (// No I18N
							(this.files.length-virusfiles.length) < 2
							? _cruxUtils.getI18n("crm.fileuploader.message.noteattachremainingfile") // No I18N
							: _cruxUtils.getI18n("crm.fileuploader.message.noteattachremainingfiles")); 	// No I18N
						}
					},
				clickable : this.$node.querySelector('.attachementActionArea' + self.getData("cxPropId")),// No I18N
				previewTemplate : '<div class="dz-preview dz-file-preview cB"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size"><span data-dz-size></span></div></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span class="virusAlert"></span>&nbsp;<span data-dz-errormessage></span></div><div class="dz-remove cxNotesAttachmentRemoveIcon vam" data-dz-remove></div>',// No I18N
				uploadMethod : "normal", // No I18N
				//do not hit api while editing as there is limit check in server on how many files can be attached yo a existing note.
				autoProcessQueue: this.data.cxPropNote.Note_Content ? false : true, 
				url: isEdit ? "/crm/v2/Notes/" + currentNoteId + '/Attachments' : "/crm/v2/files", //NO I18N
				needFolderUpload : false,
				maxFiles: 5 - self.alreadyAttachedFilesCount,
				totalFilesize : ((20000000-(Notes.alreadyAttachSize))/1000000), // final value must be in MB
				maxAllowedFiles: 5,
				parallelUploads : 1,
				headers :{ crmHandback : JSON.stringify({entityId : entityId,module : moduleApi,action : "notes"})}, // No I18N
				progressRatio : this.data.cxPropNote.Note_Content ? 1.0 : 0.9,
				save : this.data.cxPropShowSaveCancelButton ? this.$node.querySelector('.cruxNoteSaveBtn' + self.getData("cxPropId")) : '',// No I18N
				cancel : this.data.cxPropShowSaveCancelButton ? this.$node.querySelector('.cruxNoteCancelBtn' + self.getData("cxPropId")) : '',// No I18N
				init : function() {
					var _self = this;
					self.uploaderIns = this;
					_self.on( "proceed", function(e) {
						e.preventDefault();
						e.stopPropagation();
						var subjectObj = self.$node.querySelector(".titleInputSection .noteTitle input"); //NO i18n
						var descObj = self.$node.querySelector(".notesTextInputBoxWrap .notesTextInputBox textarea"); //NO i18n
						if(descObj && subjectObj){
							var descValue = descObj.value.trim();
							var subjValue = subjectObj.value.trim();
							if (descValue == "" && subjValue == ""){
								descObj.focus();
								return false;
							}
						}
					});

					$('#alreadyAttached').click( function(_this) {
						return function(e) {
							e.preventDefault();
							e.stopPropagation();
							_this.maxFiles = 5 - self.alreadyAttachedFilesCount;
							_this.totalFilesize = (20000000-(Notes.alreadyAttachSize))/1000000;
						}
					}(_self));

					_self.on("error", function( file ) { // No I18N
						if( !file.previewElement ) {
							return;
						}
						if( file.virus ) {
							$(file.previewElement).find(".virusAlert").css("display", "inline-block");
						}
						var node = file.previewElement.querySelector("[data-dz-errormessage]"); // No I18N
						if( node && (node.innerHTML).length > 20 ) {
							$(node).attr( "title", node.innerHTML );
						}
					});

					_self.on("success", function(file, msg) { //No I18N
						var isEdit = Boolean(self.data.cxPropNote.id);
						try {
							self.uploaderObj.cancelledFiles -= 1;
							var msg = JSON.parse(msg);
							file.attachmentId = msg.data[0].details.id;
						} catch(err) {
							var node = file.previewElement.querySelector(".dz-error-message"); // No I18N
							if(node && node.innerHTML.length > 20) {
								$(node).attr( "title", node.innerHTML );  //NO i18n
							}
							file.previewElement.classList.add("dz-error"); //NO I18N
							if(node && node.children[1]) {
								node.children[1].innerHTML = _cruxUtils.getI18n.apply(undefined, ["crm.fileuploader.message.responseerror"]); //NO I18N
							}
							self.checkSaveButtonStatus()
						}
	        		});

					_self.on("canceled", function() {
						if(self.uploaderObj.cancelledFiles > 0) {
							self.uploaderObj.cancelledFiles -= 1;
						}
						if(self.uploaderObj.cancelledFiles < 1) {
							self.requestResolved = true;
							self.checkSaveButtonStatus()
						}
					});

					_self.on("batchclientcomplete", function(files) {
						self.uploaderObj.cancelledFiles = 0;
						self.uploaderObj.newUploadCount = 0;
						var filesLen = files.length;
						var fileUploadSuccess = true;
						var attachments = [];
						var file;
						for(var i = 0, j= 0; i < filesLen; i++) {
							file = files[i]
							if(file.status === "error") {
								fileUploadSuccess = false;
								break;
							} else {
								attachments[j++] = {id: file.attachmentId};
							}
						}
						self.requestResolved = true;
						if(fileUploadSuccess && self.data.cxPropNote.id) {
							var currentNoteId = self.data.cxPropNote.id;
							var noteRec = store.peekRecord("note", currentNoteId); //NO I18N

							if(noteRec.$.isModified) {
								self.updateNote(currentNoteId);
							} else {
								self.updateCurrentNote(currentNoteId);
							}
						} else {
							// self.setData("attachmentObj", attachments); //NO i18n
							self.attachmentObj = attachments;
							self.checkSaveButtonStatus()
						}
					});

					_self.on("removedfile", function(file) { //No I18N
						var isEdit = Boolean(self.data.cxPropNote.id); 
						if(isEdit && self.uploaderObj.newUploadCount > 0) {
							self.uploaderObj.newUploadCount -= 1;
						}
						if(file.status !== "error" && !isEdit) {
							var attachmentObj = self.attachmentObj;
							attachmentObj = attachmentObj.filter(function(attachment) {
								return attachment.id !== file.attachmentId;
							});
							self.attachmentObj = attachmentObj;
						}
						self.checkSaveButtonStatus()
	       			});

					_self.on("clean",function( ){ // No I18N
				  		self.isFileUploadPluginBound = false;
						self.uploaderObj.newUploadCount = 0;
						self.uploaderObj.cancelledFiles = 0;
						self.requestResolved = true;
	     			});

					_self.on("customizepreviewtemplate", function(file) { //No I18N
						var node = file.previewElement.querySelector("[data-dz-name]"); // No I18N
						var nodes=$(node);
						var name = file.name;
						if( name && name.length > 20 ) {
							nodes.attr( "title", name ); //No I18N
						}
						var extension = "";
						if( name && name !== "" && name.lastIndexOf(".") !== -1 ) {
							extension = name.slice(name.lastIndexOf(".")+1);
						}
						node = file.previewElement.querySelector(".dz-filename"); // No I18N
						if( node ) {
							nodes.prepend(FileUploader.createElement("<span class=\"mR5 vab dIB cxNotesAttachmentIcons cx-" + Notes.getExtensionGroup( extension ) + "-icon\"></span>")); // NO OUTPUTENCODING // No I18N
						}
						node = file.previewElement.querySelector("[data-dz-size]"); // No I18N
						if( node ) {
							node.innerHTML = "(" + this.options.getFileSize(file.size) + ")"; // NO OUTPUTENCODING
						}
					});

					_self.on("addedfile", function(file) { //No I18N

						if(!self.uploaderObj.newUploadCount) {
							self.uploaderObj.newUploadCount = 1;
						} else {
							self.uploaderObj.newUploadCount += 1;
						}

						if(!self.uploaderObj.cancelledFiles) {
							self.uploaderObj.cancelledFiles = 1;
						} else {
							self.uploaderObj.cancelledFiles += 1;
						}

						if(Boolean(self.data.cxPropNote.id)) {
							this.options.autoProcessQueue = false;
							var elem = file.previewElement;
							elem.classList.add("dz-callbackcomplete", "dz-complete", "dz-success"); //NO i18n
							elem.querySelector(".dz-progress .dz-upload").style.width = "100%"; //NO i18n
						} 
						setTimeout(()=>{
							self.checkSaveButtonStatus();
						},10);
						self.$node.querySelector(".noteMoreFiles").style.display = "block"; //NO I18N
	        		});

				},
				uploadBean : { // upload bean configurations
					crmHandback : {
						entityId : entityId,
						module : moduleApi,
						action : "notes" // No I18N
					},
					user : {
						zgid : typeof Crm !== "undefined" ? Crm.userDetails.ZGID : "" //NO I18N
					},
					uploadTo : "EntityAttachments", // No I18N
					folderId : "WS_ATTACHMENT_LIBRARY"// No I18N
				}
			}
			$L.fastdom.mutate(()=>{
				$(this.$node).FileUploader(this.uploaderObj);
			});
			Lyte.triggerEvent('cruxNoteCancelEvent',{origin : this});
		}
	},
	bindMentionPlugin: function(existingMentions, destroy) {
		if(this.data.cxPropRichTextFormat){
			return;
		}
		var self = this;
		if(destroy === true) {
			$L("#noteTextarea" + this.getData("cxPropId"),this.$node).cruxMention({ //NO I18n
				destroy: true
			});
		} else {
			var cxPropMentionQueryParam = this.getData("cxPropMentionQueryParam"); //NO I18N
			$L("#noteTextarea" + this.data.cxPropId,this.$node).cruxMention({ //NO I18n
				textboxSelector: "#noteTextarea" + this.data.cxPropId, //NO I18n
				cxPropContent: function(formattedNoteText) {
					self.formattedNoteText = formattedNoteText
					if(self.getMethods('onBeforeEditorInput')){
						self.executeMethod('onBeforeEditorInput',formattedNoteText);
					}
					self.checkSaveButtonStatus();
				},
				onDisplayMentions : function(){
					if(self.getMethods('onShowMentions')){
		            	self.executeMethod('onShowMentions');
		            }
				},
				existingMentions: existingMentions ? existingMentions : [],
				queryParam: cxPropMentionQueryParam
			});
		}
	},
	clearRemovedFilesFromNote: function(currentNoteId) {
		var rec = store.createRecord("dummy", {}); //NO I18N
		var url = "crm/v2/Notes/" + currentNoteId + "/Attachments?ids="+ this.removedAttachments.join(","); //NO I18N
		this.requestResolved = false;
		var cancelBtn = this.$node.querySelector(".cruxNoteSaveBtn" + this.getData("cxPropId")); //NO I18N

		if(this.uploaderObj && this.uploaderObj.newUploadCount > 0 && cancelBtn) {
			cancelBtn.ltProp("disabled", true); //NO I18N
		}

		if(this.getMethods('onBeforeNoteRequest')){
			this.executeMethod("onBeforeNoteRequest", this.data.cxPropNote); //NO I18N
		}
		rec.$.save({
		    url: url,
		    method: "DELETE" //NO I18N
		}).then(function(){
			this.removedAttachments = [];
			this.requestResolved = true;

			var noteRec = store.peekRecord("note", currentNoteId); //NO I18N
			if(this.uploaderObj && this.uploaderObj.newUploadCount > 0) {
				this.uploadNewFiles(currentNoteId);
			} else if(noteRec.$.isModified){
				this.updateNote(currentNoteId);
			} else {
				this.updateCurrentNote(currentNoteId);
			}
		}.bind(this)).catch(function(error){
			if(this.uploaderObj && this.uploaderObj.newUploadCount > 0) {
				cancelBtn.ltProp("disabled", true); //NO I18N
			}

			//cross tab notes permission disabled
			this.requestResolved = true;
			if(error && error.status === 403) {
				var response = JSON.parse(error.response);
				response = response.data ? response.data[0] : response;

				if(response.code === "NO_PERMISSION") {
					_cruxUtils.showCustomAlert({
						 params : {ltPropSecondaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error'])} //no i18n
					})
				}
			}
		}.bind(this));

	},
	updateNote: async function(currentNoteId) {
		var noteRec = store.peekRecord("note", currentNoteId); //NO I18N

		// if(this.getMethods("onBeforeAddNote")) {
		// 	noteRec = await this.executeMethod("onBeforeAddNote", noteRec); //NO I18N
		// }

		if(noteRec && noteRec.$.isModified) {
			if(this.getMethods('onBeforeNoteRequest')){
				this.executeMethod("onBeforeNoteRequest", noteRec); //NO I18N
			}
			noteRec.$.save({"noteId": currentNoteId}).then(function(saveStatus) { //NO i18n
				this.updateCurrentNote(currentNoteId);
			}.bind(this), function(error) {
				noteRec.$.rollBack();
				//cross tab notes  permission disabled
				if(error) {
					var response = JSON.parse(error.response);
					response = response.data ? response.data[0] : response;

					if(response.code === "NO_PERMISSION" && (response.message === "permission denied" || response.details && response.details.permissions[0] === "Crm_Implied_Create_Attachments")) {
						_cruxUtils.showCustomAlert({
							 params : {ltPropSecondaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error'])} //no i18n
						});
					} else if(response.code === "MAX_RECORDS_LIMIT_REACHED") {
						this.setData("maxStorage", error.details.size); //NO I18N
						this.$node.querySelector(".noteDataStorageLimit").ltProp("show", true); //NO I18N
					}
				} else {
					this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("cxPropId")).click(); //NO I18N
					this.currentNoteId = "";
				}
			}.bind(this));
		} else {
			this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("cxPropId")).click(); //NO I18N
			this.$node.querySelector(".cruxNotesList .cx_" + currentNoteId).style.display = ""; //NO I18N
		}
	},
	updateCurrentNote: function(currentNoteId, newRecord) {
		this.onTextAreaTransitionFn();
		if(this.getMethods('updateNoteList')){
			/**
			 * @method updateNoteList
			 * @author naveen.winson
			 * @version 1.0.0
			 * @param { * } currentNoteId
			 * @param { * } newRecord
			 * @param { * } this.originalNote
			 * @param { * } {module:this.moduleApi,entityId:this.data.cxPropEntity.id}
			 */
			return this.executeMethod('updateNoteList',currentNoteId, newRecord,this.originalNote,{module:this.moduleApi,entityId:this.data.cxPropEntity.id}); //NO I18N
		}
	},
	uploadNewFiles: function(currentNoteId) {
		this.requestResolved = false;
		this.setData('cxPropDisableSave',true);
		this.uploaderIns.options.autoProcessQueue = true;
		this.uploaderIns.processQueue();
	},
	checkPermission : function(type,currentNoteId){
		if(this.getMethods('getNotePermission')){
			/**
			 * @method getNotePermission
			 * @author naveen.winson
			 * @version 1.0.0
			 * @param { * } type
			 * @param { * } currentNoteId
			 */
			return this.executeMethod('getNotePermission',type,currentNoteId)
		}
	},
	observeBoundary : function(){
		this.setData('textEditorPopover.boundary',this.data.cxPropBoundary)
		this.setData('textEditorMoreOptionsPopover.boundary',this.data.cxPropBoundary)
	}.observes('cxPropBoundary').on('init'),
	observeModule : function(){
		this.moduleApi = typeof moduleRecordMapping !== "undefined" && this.data.cxPropModule && moduleRecordMapping[this.data.cxPropModule] ? moduleRecordMapping[this.data.cxPropModule].api_name : ""; //NO I18N
	}.observes('cxPropModule').on('init')
},{mixins : ['crux-note-util']});
