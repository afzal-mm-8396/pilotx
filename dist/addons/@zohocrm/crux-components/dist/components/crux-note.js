// $Id$
/**
 * @component crux-note
 * @author naveen.winson
 * @version 1.0.0
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-note", {
_template:"<template tag-name=\"crux-note\"> <div class=\"{{concat(if(cxPropClass,cxPropClass,''),' cxNoteNewUI cruxNotesCompWrap pR ',if(cxPropPrintPreview,'cxNotesPrintPreview',''))}} {{if(cxPropRichTextFormat,'','cxNoteNormal')}} {{if(cxPropShowContentInBubble,'cxBubbleNotesContent','')}}\" style=\"{{if(cxPropNoteWidth,concat('width: ',concat(cxPropNoteWidth,'px')),'')}}\"> <div class=\"cxNoteHeadingSection\"> <div class=\"cxNoteHeadingInnerDiv\"> <template is=\"if\" value=\"{{cxPropNoteHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxNoteHeaderYield\"></lyte-yield> </template><template case=\"false\"> <div class=\"ntit cxNoteHeading showHideCruxNote {{if(cxPropPreventHeaderNotesHide,'',cP)}} \" onclick=\"{{action('showHideCruxNote')}}\"> {{cxPropNoteHeaderTitle}} <template is=\"if\" value=\"{{cxPropNoteCountNeeded}}\"><template case=\"true\"> <span class=\"cxNoteCount\">{{cxPropNotesMetaData.count}}</span> </template></template> </div> </template></template> <span data-zcqa=\"notesOrderChange\" class=\"cruxNoteToggleArrow mT5 mB3\"></span> <div class=\"cxNoteHeaderSuffixWrap\"> <template is=\"if\" value=\"{{cxPropNoteHeaderSuffixYield}}\"><template case=\"true\"> <lyte-yield class=\"cxNoteHeaderSuffixYield\" yield-name=\"cxNoteHeaderSuffixYield\"></lyte-yield> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropPrintPreview,'!')}}\"><template case=\"true\"> <lyte-dropdown class=\"cxNotesSortDropdown\" data-zcqa=\"notesOrderChange\" on-before-add=\"{{method('setSelectionClass')}}\" on-show=\"{{method('noteFilterShow')}}\" lt-prop-type=\"multiple\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-scope=\"{{cxPropDropdownScope}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button> <span> {{cxPropNotesOrder}} </span> </lyte-drop-button> <lyte-drop-box> <lyte-drop-body class=\"cruxNoteToggleOptions\"> <lyte-drop-group class=\"moduleBasedGroup\"> <template is=\"for\" items=\"{{notesFilters}}\" item=\"notesFilter\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(notesFilter.api_name,'===',&quot;All&quot;)}}\"><template case=\"true\"> <lyte-drop-item class=\"{{if(ifEquals(cxPropSelectedFilter,'All'),'cruxNoteSelectedToggle','')}} moduleBasedSorting\" data-value=\"{{notesFilter.api_name}}\">{{cruxGetI18n('crm.globalsearch.option.all')}}</lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item class=\"moduleBasedSorting {{if(ifEquals(cxPropSelectedFilter,notesFilter.api_name),'cruxNoteSelectedToggle','')}}\" data-value=\"{{notesFilter.api_name}}\">{{cruxGetI18n('crm.territory.label.only',notesFilter.display)}} <template is=\"if\" value=\"{{expHandlers(notesFilter.api_name,'==','Projects')}}\"><template case=\"true\"> <span class=\"cxVam cxInfoIcon mL5\" lt-prop-title=\"{{cruxGetI18n('crm.project.sync.notes.info')}}\"></span> </template></template> </lyte-drop-item> </template></template> </template> </lyte-drop-group> <lyte-drop-group> <lyte-drop-item class=\"timeBasedSorting {{if(ifEquals(cxPropNotesOrder,cruxGetI18n('crm.note.recent.first')),'cruxNoteSelectedToggle','')}}\" data-value=\"{{cruxGetI18n('crm.note.recent.first')}}\">{{cruxGetI18n('crm.note.recent.first')}}</lyte-drop-item> <lyte-drop-item class=\"timeBasedSorting {{if(ifEquals(cxPropNotesOrder,cruxGetI18n('crm.note.recent.last')),'cruxNoteSelectedToggle','')}}\" data-value=\"{{cruxGetI18n('crm.note.recent.last')}}\">{{cruxGetI18n('crm.note.recent.last')}}</lyte-drop-item> </lyte-drop-group> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> </div> </div> <div class=\"cruxNotes\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropNotesOrder,'===',cruxGetI18n('crm.note.recent.first')),'&amp;&amp;',expHandlers(noteEditModeId,'!')),'&amp;&amp;',expHandlers(newTextbox,'!')),'&amp;&amp;',cxPropShowAddNote)}}\"><template case=\"true\"> <crux-note-editor cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity=\"{{cxPropEntity}}\" update-note-list=\"{{method('updateNoteListCall')}}\" cx-prop-id=\"{{instanceNo}}\" cx-prop-show-share-to-customer=\"{{cxPropShowShareToCustomer}}\" on-before-note-request=\"{{method('beforeNoteRequest')}}\" get-note-permission=\"{{method('getNotePermissionCall')}}\" cx-prop-rich-text-format=\"{{cxPropRichTextFormat}}\" cx-prop-replace-style=\"{{cxPropReplaceStyle}}\" cx-prop-editor-panel-icons=\"{{cxPropEditorPanelIcons}}\" cx-prop-word-to-para-style=\"{{cxPropWordToParaStyle}}\" cx-prop-para-to-word-style=\"{{cxPropParaToWordStyle}}\" cx-prop-allowed-styles=\"{{cxPropAllowedStyles}}\" cx-prop-allowed-tags=\"{{cxPropAllowedTags}}\" on-before-add-note=\"{{method('onBeforeAddNoteFn')}}\" cx-prop-editor-shortcuts=\"{{cxPropEditorShortCuts}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-max-note-content-limit=\"{{cxPropMaxNoteContentLimit}}\" on-notes-request-error=\"{{method('onNotesRequestErrorMt')}}\" is-client-portal-user=\"{{isClientPortalUser}}\" cx-prop-footer-right-prefix-yield=\"{{cxPropFooterRightPrefixYield}}\" cx-prop-disable-attachment-actions=\"{{cxPropDisableAttachmentActions}}\" cx-prop-max-content-height=\"{{cxPropMaxEditorContentHeight}}\" cx-prop-parent-element-scroll=\"{{cxPropParentElementScroll}}\" on-text-editor-element-after-render=\"{{method('onTextEditorElementAfterRenderCall')}}\" cx-prop-show-title=\"{{cxPropShowTitleInEditor}}\" on-before-editor-input=\"{{method('onBeforeEditorInputCall')}}\" cx-prop-content-placeholder=\"{{cxPropEditorContentPlaceholder}}\" cx-prop-minimized-placeholder=\"{{cxPropEditorMinimizedPlaceholder}}\" on-before-editor-paste=\"{{method('onBeforeEditorInputPasteCall')}}\" cx-prop-anchor-style=\"{{cxPropAnchorStyle}}\" on-editor-panel-open=\"{{method('onEditorPanelOpenFn')}}\" cx-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-standard-navigation=\"{{cxPropStandardNavigation}}\" cx-prop-mention-query-param=\"{{cxPropMentionQueryParam}}\" on-close-notes-editor=\"{{method('onCloseNoteEditorFn')}}\" on-open-note-editor=\"{{method('onOpenNoteEditorFn')}}\" cx-prop-blue-pencil=\"{{cxPropBluePencil}}\" cx-prop-user-locale=\"{{cxPropUserLocale}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\"> <template is=\"registerYield\" yield-name=\"cxNoteRightPrefixYield\" from-parent=\"\"></template> </crux-note-editor> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropNotesLoading,'!'),'&amp;&amp;',expHandlers(expHandlers(notesDownloaded,'&amp;&amp;',expHandlers(allNotesCount,'>',defaultDisplayedNotesCount)),'&amp;&amp;',expHandlers(cxPropNotesOrder,'===',cruxGetI18n('crm.note.recent.last'))))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropShowMoreNotesYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxShowMoreNoteYield\" displayed-count=\"{{defaultDisplayedNotesCount}}\" total-count=\"{{allNotesCount}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"cxShowMoreNotes showMoreNotes recentLastLink\" onclick=\"{{action('showMoreNotes')}}\"> <div class=\"cxShowMoreNotesLinkWrap\"> <div class=\"cxNotesMoreLink cxNotesCommonLinkColor\">{{cxPropViewPreviousText}}</div> </div> <div class=\"cxShowMoreNotesCountWrap\"> <span class=\"cxShowMoreDisplayCount displayedNotesCount\">{{defaultDisplayedNotesCount}}</span> <span class=\"cxNotesGreyColorWithoutHover f13\">{{cruxGetI18n('of')}}</span> <span class=\"cxTotalNotesCount\">{{allNotesCount}}</span> </div> </div> </template></template> </template></template> <ul class=\"cruxNotesList cxNotesUl {{if(ifEquals(cxPropNotesOrder,cruxGetI18n('crm.note.recent.first')),'cxNoteRecentFirst','cxNoteRecentLast')}}\" data-zcqa=\"cruxNotesListHolder\"> <template is=\"if\" value=\"{{cxPropNotesLoading}}\"><template case=\"true\"> <crux-note-loading></crux-note-loading> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropEmptyNoteMessage,'&amp;&amp;',expHandlers(expHandlers(allNotes,'!'),'||',expHandlers(allNotes.length,'==',0))),'&amp;&amp;',expHandlers(cxPropShowAddNote,'!'))}}\"><template case=\"true\"> <div class=\"cxNotesNoRecord\"> {{cxPropEmptyNoteMessage}} </div> </template><template case=\"false\"><template is=\"for\" items=\"{{allNotes}}\" item=\"note\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(note.Parent_Id,'||',cxPropRenderNotesWithoutParent)}}\"><template case=\"true\"> <li class=\"cx_{{note.id}} cxNotesLi\" data-zcqa=\"{{getNoteZcqa(index,allNotes,cxPropNotesOrder)}}\"> <template is=\"if\" value=\"{{expHandlers(note.imageLink,'==','noPhoto')}}\"><template case=\"true\"> <span class=\"cxNotesAddedUserImg cxNoteDefaultUserImage cxDIB\"></span> </template><template case=\"false\"> <img class=\"cxNotesAddedUserImg\" src=\"{{note.imageLink}}\"> </template></template> <div class=\"cxNotesContentWrap\"> <template is=\"if\" value=\"{{cxPropPrefixYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxNotePrefixYield\" note-data=\"{{note}}\"></lyte-yield> </template></template> <template is=\"if\" value=\"{{expHandlers(noteEditModeId,'==',note.id)}}\"><template case=\"true\"> <crux-note-editor cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity=\"{{cxPropEntity}}\" update-note-list=\"{{method('updateNoteListCall')}}\" cx-prop-id=\"{{instanceNo}}\" cx-prop-show-share-to-customer=\"{{cxPropShowShareToCustomer}}\" on-before-note-request=\"{{method('beforeNoteRequest')}}\" get-note-permission=\"{{method('getNotePermissionCall')}}\" cx-prop-note=\"{{editingNote}}\" on-close-notes-editor=\"{{method('onCloseNoteEditorFn')}}\" on-open-note-editor=\"{{method('onOpenNoteEditorFn')}}\" cx-prop-rich-text-format=\"{{cxPropRichTextFormat}}\" cx-prop-replace-style=\"{{cxPropReplaceStyle}}\" cx-prop-editor-panel-icons=\"{{cxPropEditorPanelIcons}}\" cx-prop-word-to-para-style=\"{{cxPropWordToParaStyle}}\" cx-prop-para-to-word-style=\"{{cxPropParaToWordStyle}}\" cx-prop-allowed-styles=\"{{cxPropAllowedStyles}}\" cx-prop-allowed-tags=\"{{cxPropAllowedTags}}\" on-before-add-note=\"{{method('onBeforeAddNoteFn')}}\" cx-prop-editor-shortcuts=\"{{cxPropEditorShortCuts}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-max-note-content-limit=\"{{cxPropMaxNoteContentLimit}}\" on-notes-request-error=\"{{method('onNotesRequestErrorMt')}}\" is-client-portal-user=\"{{isClientPortalUser}}\" cx-prop-footer-right-prefix-yield=\"{{cxPropFooterRightPrefixYield}}\" cx-prop-disable-attachment-actions=\"{{cxPropDisableAttachmentActions}}\" cx-prop-max-content-height=\"{{cxPropMaxEditorContentHeight}}\" cx-prop-parent-element-scroll=\"{{cxPropParentElementScroll}}\" on-text-editor-element-after-render=\"{{method('onTextEditorElementAfterRenderCall')}}\" cx-prop-show-title=\"{{cxPropShowTitleInEditor}}\" on-before-editor-input=\"{{method('onBeforeEditorInputCall')}}\" cx-prop-content-placeholder=\"{{cxPropEditorContentPlaceholder}}\" cx-prop-minimized-placeholder=\"{{cxPropEditorMinimizedPlaceholder}}\" on-before-editor-paste=\"{{method('onBeforeEditorInputPasteCall')}}\" cx-prop-anchor-style=\"{{cxPropAnchorStyle}}\" on-editor-panel-open=\"{{method('onEditorPanelOpenFn')}}\" cx-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-standard-navigation=\"{{cxPropStandardNavigation}}\" cx-prop-mention-query-param=\"{{cxPropMentionQueryParam}}\" cx-prop-blue-pencil=\"{{cxPropBluePencil}}\" cx-prop-user-locale=\"{{cxPropUserLocale}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\"> <template is=\"registerYield\" yield-name=\"cxNoteRightPrefixYield\" from-parent=\"\"></template> </crux-note-editor> </template><template case=\"false\"> <div id=\"noteMainDiv\" class=\"cxNotesAddressWrapper\"> <template is=\"if\" value=\"{{note.Note_Title}}\"><template case=\"true\"> <lyte-text class=\"cxNoteTitleSpan\" lt-prop-value=\"{{note.Note_Title}}\"></lyte-text> </template></template> <template is=\"if\" value=\"{{expHandlers(note.Parent_Id.Check_In_City,'||',note.Parent_Id.Check_In_Sub_Locality)}}\"><template case=\"true\"> <span class=\"map-marker-greenbg\"></span> <span class=\"cxNotesAddressLookupWrap\"> <span class=\"cxVat\">{{getI18n('crm.label.checkedin')}}</span> <template is=\"if\" value=\"{{cxPropEntity.What_Id}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropEntity.Who_Id}}\"><template case=\"true\"> <crux-lookup-component cx-prop-value=\"{{cxPropEntity.What_Id.name}}\" cx-prop-route-name=\"crm.tab.module.entity.detail\" cx-prop-dynamic-params=\"[&quot;{{if(ifEquals(getModuleNameByApiName(cxPropEntity.$se_module),&quot;Deals&quot;),&quot;Potentials&quot;,getModuleNameByApiName(cxPropEntity.$se_module))}}&quot;, &quot;{{cxPropEntity.What_Id.id}}&quot;]\" onclick=\"{{action('stopPropagation',event)}}\" cx-prop-icon-class=\"{{concat(getModuleNameForIcon(recordObj.$se_module),'Small')}}\" cx-prop-zcqa=\"{{recordObj[fieldObj.api_name].name}}\"></crux-lookup-component> ( <crux-lookup-component cx-prop-value=\"{{cxPropEntity.Who_Id.name}}\" cx-prop-route-name=\"crm.tab.module.entity.detail\" cx-prop-dynamic-params=\"[&quot;Contacts&quot;, &quot;{{cxPropEntity.Who_Id.id}}&quot;]\" onclick=\"{{action('stopPropagation',event)}}\" cx-prop-zcqa=\"{{recordObj[fieldObj.api_name].name}}\"></crux-lookup-component> ) </template><template case=\"false\"> <crux-lookup-component cx-prop-value=\"{{cxPropEntity.What_Id.name}}\" cx-prop-route-name=\"crm.tab.module.entity.detail\" cx-prop-dynamic-params=\"[&quot;{{if(ifEquals(getModuleNameByApiName(cxPropEntity.$se_module),&quot;Deals&quot;),&quot;Potentials&quot;,getModuleNameByApiName(cxPropEntity.$se_module))}}&quot;, &quot;{{cxPropEntity.What_Id.id}}&quot;]\" onclick=\"{{action('stopPropagation',event)}}\" cx-prop-icon-class=\"{{concat(getModuleNameForIcon(recordObj.$se_module),'Small')}}\" cx-prop-zcqa=\"{{recordObj[fieldObj.api_name].name}}\"></crux-lookup-component> </template></template> </template></template> <span class=\"cxNotesCommonLinkColor vat\">@</span> <span class=\"cxNotesCommonLinkColor vat cxCP\" onclick=\"{{action('openMap',note)}}\" title=\"{{concat(if(note.Parent_Id.Check_In_Sub_Locality,concat(note.Parent_Id.Check_In_Sub_Locality,if(note.Parent_Id.Check_In_City,', ',''),''),''),if(note.Parent_Id.Check_In_City,note.Parent_Id.Check_In_City,''))}}\"> {{concat(if(note.Parent_Id.Check_In_Sub_Locality,concat(note.Parent_Id.Check_In_Sub_Locality,if(note.Parent_Id.Check_In_City,', ',''),''),''),if(note.Parent_Id.Check_In_City,note.Parent_Id.Check_In_City,''))}} </span> </span> </template></template> <template is=\"if\" value=\"{{cxPropRichTextFormat}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(note.$has_more,'&amp;&amp;',note.$has_more.Note_Content),'||',note.Note_Content),'||',note.showingShortContent)}}\"><template case=\"true\"><div class=\"cxNotesAddedContent notesAddedContent\" data-zcqa=\"cruxNoteContent\">{{unescape(convertToLinks(note.unformattedNoteContent,cxPropAnchorStyle))}}<template is=\"if\" value=\"{{expHandlers(expHandlers(note.$has_more,'&amp;&amp;',note.$has_more.Note_Content),'||',note.showingShortContent)}}\"><template case=\"true\"> ... <span class=\"cruxNoteSeeMore cxNotesCommonLinkColor\" onclick=\"{{action('showFullNoteContent',note.id)}}\">{{cruxGetI18n(\"crm.wf.summary.label.ShowInstantActions\")}} <span class=\"cxDIB vaM zcicn-arrow-solid-down-md-mask zcicn-cssIcons zcicn_blue_mask\"></span></span></template></template><template is=\"if\" value=\"{{note.showingLongContent}}\"><template case=\"true\"> <span class=\"cruxNoteSeeMore cxNotesCommonLinkColor\" onclick=\"{{action('showShortNoteContent',note.id)}}\">{{cruxGetI18n(\"crm.wf.summary.label.HideInstantActions\")}}<span class=\"cxDIB vaM zcicn-arrow-solid-up-md-mask zcicn-cssIcons zcicn-rotate-180 zcicn_blue_mask\"></span></span> </template></template> </div></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(note.actualContent.length,'>',cxPropNoteContentLimit),'&amp;&amp;',expHandlers(currentSavedNote,'!=',note.id))}}\"><template case=\"true\"> <pre class=\"cxNonRTF cxNotesAddedContent notesAddedContent showSeeMore cxNotesShowMore\" data-zcqa=\"cruxNoteContent\"><template is=\"if\" value=\"{{expHandlers(expHandlers(note.hasLinks,'===',&quot;true&quot;),'&amp;&amp;',expHandlers(note.startPos[0],'<',cxPropMaxNoteContentLength))}}\"><template case=\"true\">{{cruxStringSeg(note.unformattedNoteContent,0,note.startPos[0])}}<template is=\"for\" items=\"{{note.startPos}}\" item=\"startIndex\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(note.endPosIdx,'>=',note.endPos[index])}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(index,'===',0)}}\"><template case=\"true\"><span>{{unescape(cruxStringSeg(note.unformattedNoteContent,note.startPos[index],note.endPos[index]))}}</span></template><template case=\"false\">{{cruxStringSeg(note.unformattedNoteContent,cruxGetItemAtIndex(note.endPos,expHandlers(index,'-',1)),note.startPos[index])}}<span>{{unescape(cruxStringSeg(note.unformattedNoteContent,note.startPos[index],note.endPos[index]))}}</span></template></template></template></template></template><template is=\"if\" value=\"{{expHandlers(note.endPosIdx,'<',cxPropMaxNoteContentLength)}}\"><template case=\"true\">{{cruxStringSeg(note.unformattedNoteContent,note.endPosIdx,cxPropMaxNoteContentLength)}}</template></template></template><template case=\"false\">{{cruxSubstr(note.unformattedNoteContent,cxPropMaxNoteContentLength)}}</template></template> <span class=\"cruxNoteSeeMore cxNotesCommonLinkColor\" onclick=\"{{action('showFullNoteContent',note.id)}}\">{{cruxGetI18n(\"crm.label.More\")}}</span></pre> </template></template> <pre class=\"cxNonRTF cxNotesAddedContent notesAddedContent showFullContent cxNotesShowMore\" data-zcqa=\"cruxNoteContent\" style=\"{{if(cruxAnd(cruxIfGt(note.actualContent.length,cxPropNoteContentLimit),ifNotEquals(currentSavedNote,note.id)),'display: none','')}}\"><template is=\"if\" value=\"{{expHandlers(note.hasLinks,'===',&quot;true&quot;)}}\"><template case=\"true\">{{cruxStringSeg(note.unformattedNoteContent,0,note.startPos[0])}}<template is=\"for\" items=\"{{note.startPos}}\" item=\"startIndex\" index=\"index\"><template is=\"if\" value=\"{{expHandlers(index,'===',0)}}\"><template case=\"true\"><span>{{unescape(cruxStringSeg(note.unformattedNoteContent,note.startPos[index],note.endPos[index]))}}</span></template><template case=\"false\">{{cruxStringSeg(note.unformattedNoteContent,cruxGetItemAtIndex(note.endPos,expHandlers(index,'-',1)),note.startPos[index])}}<span>{{unescape(cruxStringSeg(note.unformattedNoteContent,note.startPos[index],note.endPos[index]))}}</span></template></template></template>{{cruxStringSeg(note.unformattedNoteContent,note.lastIndex)}}</template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(note.hasLinks,'===',&quot;false&quot;)}}\"><template case=\"true\">{{note.unformattedNoteContent}}</template></template></template></template></pre> </template></template> <template is=\"if\" value=\"{{note.$attachments}}\"><template case=\"true\"> <div class=\"cxNotesAttachementWrap\"> <ul class=\"cxNotesAttachementUl\"> <template is=\"for\" items=\"{{note.$attachments}}\" item=\"attachment\" index=\"index\"> <li class=\"cxNotesAttachementList\"> <div class=\"cxNotesAttachElem\"> <template is=\"if\" value=\"{{attachment.isImage}}\"><template case=\"true\"> <a title=\"{{attachment.File_Name}}\" class=\"cxNotesAttachElemImgWrap cxNotesAttachImage cxDIB oH\" href=\"{{cruxGetCrmBasePath()}}/ViewImage?fileId={{cruxEncodeURL(attachment.$file_id)}}&amp;name={{cruxEncodeURIComponent(attachment.File_Name)}}&amp;downLoadMode=default&amp;creatorId={{cruxEncodeURL(attachment.Created_By.id)}}&amp;parentId={{cruxEncodeURL(if(note.entity.id,note.entity.id,attachment.Parent_Id.id))}}&amp;nId={{cruxEncodeURL(note.id)}}&amp;module={{cruxEncodeURL(cxPropModule)}}\"> <img lt-prop-title=\"{{attachment.File_Name}}\" class=\"cxNotesAttachElemImg\" src=\"{{cruxGetCrmBasePath()}}/EntityImageAttach.do?&amp;actionName=readImage&amp;fileId={{cruxEncodeURL(attachment.encAttachFileId)}}&amp;entityId={{cruxEncodeURL(note.entity.id)}}&amp;action_module={{cruxEncodeURL(cxPropModule)}}\"> </a> </template><template case=\"false\"><template is=\"if\" value=\"{{attachment.downLoadMode}}\"><template case=\"true\"> <a lt-prop-title=\"{{attachment.File_Name}}\" class=\"cxNotesAttachNameWrap\" onclick=\"{{action('openSheetForExport',event,cruxGetCrmBasePath(),cruxEncodeURL(attachment.$file_id),cruxEncodeURL(cxPropModule),cruxEncodeURL(note.id),cruxEncodeURL(note.entity.id),cruxEncodeURL(attachment.Created_By.id),cruxEncodeURL(attachment.id),cruxEncodeURIComponent(attachment.File_Name),attachment.downLoadMode)}}\"> {{cruxShortFileNameLength(attachment.File_Name,12)}} </a> </template><template case=\"false\"> <a lt-prop-title=\"{{attachment.File_Name}}\" class=\"cxNotesAttachNameWrap\" href=\"{{cruxGetCrmBasePath()}}/specific/ViewAttachment?fileId={{cruxEncodeURL(attachment.$file_id)}}&amp;module={{cruxEncodeURL(cxPropModule)}}&amp;nId={{cruxEncodeURL(note.id)}}&amp;parentId={{cruxEncodeURL(if(note.entity.id,note.entity.id,attachment.Parent_Id.id))}}&amp;creatorId={{cruxEncodeURL(attachment.Created_By.id)}}&amp;id={{cruxEncodeURL(attachment.id)}}&amp;name={{cruxEncodeURIComponent(attachment.File_Name)}}&amp;downLoadMode=default\"> {{cruxShortFileNameLength(attachment.File_Name,12)}} </a> </template></template></template></template> <div class=\"cxNotesAttachActions cxAlignCenter\"> <template is=\"if\" value=\"{{attachment.isImage}}\"><template case=\"true\"> <a class=\"cxSprite cxPreviewIcon\" data-zcqa=\"{{concat('cxNotePreview',attachment.File_Name)}}\" lt-prop-title=\"{{cruxGetI18n('crm.label.view')}}\" onclick=\"{{action('fireClickEvent',event)}}\" href=\"{{cruxGetCrmBasePath()}}/ViewImage?fileId={{cruxEncodeURL(attachment.$file_id)}}&amp;name={{cruxEncodeURIComponent(attachment.File_Name)}}&amp;downLoadMode=default&amp;creatorId={{cruxEncodeURL(attachment.Created_By.id)}}&amp;parentId={{cruxEncodeURL(if(note.entity.id,note.entity.id,attachment.Parent_Id.id))}}&amp;nId={{cruxEncodeURL(note.id)}}&amp;module={{cruxEncodeURL(cxPropModule)}}\"></a> </template><template case=\"false\"><template is=\"if\" value=\"{{attachment.downLoadMode}}\"><template case=\"true\"> <a class=\"cxDIB oH cxSprite cxPreviewIcon\" data-zcqa=\"{{concat('cxNotePreview',attachment.File_Name)}}\" lt-prop-title=\"{{cruxGetI18n('crm.label.view')}}\" onclick=\"{{action('openSheetForExport',event,cruxGetCrmBasePath(),cruxEncodeURL(attachment.$file_id),cruxEncodeURL(cxPropModule),cruxEncodeURL(note.id),cruxEncodeURL(note.entity.id),cruxEncodeURL(attachment.Created_By.id),cruxEncodeURL(attachment.id),cruxEncodeURIComponent(attachment.File_Name),attachment.downLoadMode)}}\"></a> </template><template case=\"false\"> <a class=\"cxDIB oH cxSprite cxPreviewIcon\" data-zcqa=\"{{concat('cxNotePreview',attachment.File_Name)}}\" lt-prop-title=\"{{cruxGetI18n('crm.label.view')}}\" href=\"{{cruxGetCrmBasePath()}}/specific/ViewAttachment?fileId={{cruxEncodeURL(attachment.$file_id)}}&amp;module={{cruxEncodeURL(cxPropModule)}}&amp;nId={{cruxEncodeURL(note.id)}}&amp;parentId={{cruxEncodeURL(if(note.entity.id,note.entity.id,attachment.Parent_Id.id))}}&amp;creatorId={{cruxEncodeURL(attachment.Created_By.id)}}&amp;id={{cruxEncodeURL(attachment.id)}}&amp;name={{cruxEncodeURIComponent(attachment.File_Name)}}&amp;downLoadMode=default\"></a> </template></template></template></template> <a lt-prop-title=\"{{cruxGetI18n('crm.view.attachment.download')}}\" class=\"cxSprite cxDownloadIcon\" data-zcqa=\"{{concat('cxNoteDownload',attachment.File_Name)}}\" href=\"{{cruxGetCrmBasePath()}}/specific/ViewAttachment?fileId={{cruxEncodeURL(attachment.$file_id)}}&amp;module={{cruxEncodeURL(cxPropModule)}}&amp;nId={{cruxEncodeURL(note.id)}}&amp;parentId={{cruxEncodeURL(if(note.entity.id,note.entity.id,attachment.Parent_Id.id))}}&amp;creatorId={{cruxEncodeURL(attachment.Created_By.id)}}&amp;id={{cruxEncodeURL(attachment.id)}}&amp;name={{cruxEncodeURIComponent(attachment.File_Name)}}&amp;downLoadMode=default\"></a> </div> </div> <p class=\"cxNoteImageName\" lt-prop-title=\"{{concat(attachment.File_Name,' -(',attachment.formattedSize,')')}}\"> {{cruxShortFileNameLength(attachment.File_Name,12)}} </p> </li> </template> </ul> </div> </template></template> <div class=\"cxFlex cxNotesNoteActionDetails notesOtherActionDetails {{if(cxPropPrintPreview,'pE','')}}\"> <template is=\"if\" value=\"{{note.Parent_Id}}\"><template case=\"true\"><span class=\"notesModdet\"> <span class=\"cxNotesModuleName\" lt-prop-title=\"{{note.moduleSingularLabel}}\"> {{note.moduleSingularLabel}} </span> <span class=\"pL5 pR5\">-</span> <template is=\"if\" value=\"{{cxPropPrintPreview}}\"><template case=\"true\"> <lyte-text class=\"cxNotesModuleRecordName\" lt-prop-value=\"{{note.Parent_Id.name}}\"></lyte-text> </template><template case=\"false\"> <a class=\"cxNotesCommonLinkColor cxNotesModuleRecordName\" id=\"moduleRecordName{{note.id}}{{instanceNo}}\" onmouseover=\"{{action('showModuleRecordTooltip',true,this,note)}}\" onmouseout=\"{{action('showModuleRecordTooltip',false,this)}}\" target=\"_blank\" href=\"{{cruxGetCrmBasePath()}}/EntityInfo.do?module={{note.module}}&amp;id={{note.Parent_Id.id}}\" lt-prop-title=\"{{note.Parent_Id.name}}\"> {{note.Parent_Id.name}} </a> </template></template> </span></template></template> <template is=\"if\" value=\"{{cxPropShowAddNote}}\"><template case=\"true\"> <template is=\"if\" value=\"{{note.Parent_Id}}\"><template case=\"true\"><span class=\"cxNotesListDot\"></span></template></template> <span data-zcqa=\"notesAdd\" class=\"cxNotesGreyColor cxNotesAddAnotherNote cP cxDIB\" onclick=\"{{action('openNotesTextarea',note.entity,note.module)}}\"> {{cxPropAddNoteText}} </span> </template></template> <span class=\"cxNotesListDot\"></span> <span class=\"pR5 cxNotesGreyColor cxDIB cxNotesModifiedTimeInfo\" data-title=\"{{note.modified_time_full}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;bottom&quot;, &quot;appearance&quot;: &quot;box&quot;, &quot;margin&quot;: 0, &quot;showdelay&quot;: 0, &quot;hidedelay&quot;: 0, &quot;maxdisplaytime&quot;: 5000 }\" lt-prop-title=\"{{note.modified_time_full}}\"> <span class=\"timerIcon-notes mT4 fL mR5 cxSprite cxNotesTimerIcon\"></span> {{note.modified_time}} </span> <span class=\"pR5 cxNotesGreyColorWithoutHover cxDIB\">{{cruxGetI18n('crm.label.simply.by')}}</span> <span class=\"pR5 cxNotesGreyColor cxNotesGreyColorWithoutHover cxDIB cxNotesModifiedName\" data-title=\"{{note.Modified_By.name}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;bottom&quot;, &quot;appearance&quot;: &quot;box&quot;, &quot;margin&quot;: 0, &quot;showdelay&quot;: 0, &quot;hidedelay&quot;: 0, &quot;maxdisplaytime&quot;: 5000 }\" lt-prop-title=\"{{note.Modified_By.name}}\"> {{note.Modified_By.name}} </span> <template is=\"if\" value=\"{{note.$voice_note}}\"><template case=\"true\"> <a class=\" cxVoiceNoteContent cxDIB cP\" id=\"voice_{{note.id}}\">{{note.$voice_note.file_name}}<span class=\"cxNoteVoiceFileIcon cxDIB cxVam\"></span> </a> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\"#voice_{{note.id}}\" lt-prop-freeze=\"false\" id=\"downloadVoice_{{note.id}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body id=\"callMoreOption\" class=\"callMoreOptionLyteNew cscript-attachment-menubody\" data-zcqa=\"callMoreOption\"> <lyte-menu-item id=\"downloadAttach\" onclick=\"{{action('downloadVoice',note)}}\" data-zcqa=\"lnk_download_voice\" class=\"crm-font-regular\">{{getI18n('crm.view.attachment.download')}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <span class=\"cP mL5 icon_play cxDIB\" onclick=\"{{action('playVoiceNote',this,note.id)}}\" lt-prop-title=\"Play\"></span> <audio id=\"audio_{{note.id}}\" class=\"mt10\" hidden=\"true\" src=\"{{idVsVoice[note.id]}}\" controls=\"\" preload=\"none\"></audio> </template></template> <template is=\"if\" value=\"{{expHandlers(isClientPortalUser,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{note.isPortalUser}}\"><template case=\"true\"> <span class=\"fL pR5 notesgray cxDIB pL5 mR3 cxPortalErrorNote portal_roll_name h20 boxBB crm-base-font-size\">{{cruxGetI18n(\"custmr.prtl.user.role\")}}</span> </template><template case=\"false\"><template is=\"if\" value=\"{{note.$is_shared_to_client}}\"><template case=\"true\"> <span class=\"cxNotesGreyColor\">{{cruxGetI18n(\"custmr.prtl.notes.shrd.with.custmr\")}}</span> </template></template></template></template> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(note.Parent_Id.Check_In_City,'!'),'&amp;&amp;',expHandlers(note.Parent_Id.Check_In_Sub_Locality,'!'))}}\"><template case=\"true\"> <div class=\"addedNotesActionArea cxNoteEditDeleteWrap\"> <template is=\"if\" value=\"{{expHandlers(note._showEditable,'&amp;&amp;',cxPropShowNotesEdit)}}\"><template case=\"true\"> <div data-zcqa=\"notesEdit\" class=\"cxNoteEditIconWrap editAddedNote {{if(note._editable,'','cxDisableEditBtn')}}\" lt-prop-title=\"{{if(note._editable,cruxGetI18n('Edit'),cruxGetI18n('crm.security.error'))}}\" onclick=\"{{action('editNote',event,note.id)}}\"> <span class=\"cxNoteEditIcon\"></span> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(note._showDeletable,'&amp;&amp;',cxPropShowNotesDelete)}}\"><template case=\"true\"> <div data-zcqa=\"notesDelete\" class=\"cxNoteDeleteIconWrap deleteAddedNote {{if(note._deletable,'','cxDisableDeleteBtn')}}\" lt-prop-title=\"{{if(note._deletable,cruxGetI18n('crm.button.mass.delete'),cruxGetI18n('crm.security.error'))}}\" onclick=\"{{action('showDeleteConfirmationModal',event,note.id,note.Note_Title,note.Note_Content)}}\"> <span class=\"cxNoteDeleteIcon\"></span> </div> </template></template> </div> </template></template> </div> </template></template> </div> </li> </template></template></template></template></template></template></template> </ul> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropNotesLoading,'!'),'&amp;&amp;',expHandlers(expHandlers(notesDownloaded,'&amp;&amp;',expHandlers(allNotesCount,'>',defaultDisplayedNotesCount)),'&amp;&amp;',expHandlers(cxPropNotesOrder,'===',cruxGetI18n('crm.note.recent.first'))))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropShowMoreNotesYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxShowMoreNoteYield\" displayed-count=\"{{defaultDisplayedNotesCount}}\" total-count=\"{{allNotesCount}}\"></lyte-yield> </template><template case=\"false\"> <div class=\"cxShowMoreNotes showMoreNotes recentFirstLink\" id=\"showPreviousNote\" onclick=\"{{action('showMoreNotes')}}\"> <div class=\"cxShowMoreNotesLinkWrap\"> <div class=\"cxNotesMoreLink cxNotesCommonLinkColor\">{{cxPropViewPreviousText}}</div> </div> <div class=\"cxShowMoreNotesCountWrap\"> <span class=\"cxShowMoreDisplayCount displayedNotesCount\">{{defaultDisplayedNotesCount}}</span> <span class=\"cxNotesGreyColorWithoutHover f13\">{{cruxGetI18n('of')}}</span> <span class=\"cxTotalNotesCount\">{{allNotesCount}}</span> </div> </div> </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(cxPropNotesOrder,'===',cruxGetI18n('crm.note.recent.last')),'&amp;&amp;',expHandlers(noteEditModeId,'!')),'&amp;&amp;',expHandlers(newTextbox,'!')),'&amp;&amp;',cxPropShowAddNote)}}\"><template case=\"true\"> <crux-note-editor cx-prop-module=\"{{cxPropModule}}\" cx-prop-entity=\"{{cxPropEntity}}\" update-note-list=\"{{method('updateNoteListCall')}}\" cx-prop-id=\"{{instanceNo}}\" cx-prop-show-share-to-customer=\"{{cxPropShowShareToCustomer}}\" on-before-note-request=\"{{method('beforeNoteRequest')}}\" get-note-permission=\"{{method('getNotePermissionCall')}}\" cx-prop-rich-text-format=\"{{cxPropRichTextFormat}}\" cx-prop-replace-style=\"{{cxPropReplaceStyle}}\" cx-prop-editor-panel-icons=\"{{cxPropEditorPanelIcons}}\" cx-prop-word-to-para-style=\"{{cxPropWordToParaStyle}}\" cx-prop-para-to-word-style=\"{{cxPropParaToWordStyle}}\" cx-prop-allowed-styles=\"{{cxPropAllowedStyles}}\" cx-prop-allowed-tags=\"{{cxPropAllowedTags}}\" on-before-add-note=\"{{method('onBeforeAddNoteFn')}}\" cx-prop-editor-shortcuts=\"{{cxPropEditorShortCuts}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-max-note-content-limit=\"{{cxPropMaxNoteContentLimit}}\" on-notes-request-error=\"{{method('onNotesRequestErrorMt')}}\" is-client-portal-user=\"{{isClientPortalUser}}\" cx-prop-footer-right-prefix-yield=\"{{cxPropFooterRightPrefixYield}}\" cx-prop-disable-attachment-actions=\"{{cxPropDisableAttachmentActions}}\" cx-prop-max-content-height=\"{{cxPropMaxEditorContentHeight}}\" cx-prop-parent-element-scroll=\"{{cxPropParentElementScroll}}\" on-text-editor-element-after-render=\"{{method('onTextEditorElementAfterRenderCall')}}\" cx-prop-show-title=\"{{cxPropShowTitleInEditor}}\" on-before-editor-input=\"{{method('onBeforeEditorInputCall')}}\" cx-prop-content-placeholder=\"{{cxPropEditorContentPlaceholder}}\" cx-prop-minimized-placeholder=\"{{cxPropEditorMinimizedPlaceholder}}\" on-before-editor-paste=\"{{method('onBeforeEditorInputPasteCall')}}\" cx-prop-anchor-style=\"{{cxPropAnchorStyle}}\" on-editor-panel-open=\"{{method('onEditorPanelOpenFn')}}\" cx-prop-tabindex=\"{{if(cxPropTabIndex,cxPropTabIndex,cxPropTabindex)}}\" cx-prop-standard-navigation=\"{{cxPropStandardNavigation}}\" cx-prop-mention-query-param=\"{{cxPropMentionQueryParam}}\" on-close-notes-editor=\"{{method('onCloseNoteEditorFn')}}\" on-open-note-editor=\"{{method('onOpenNoteEditorFn')}}\" cx-prop-blue-pencil=\"{{cxPropBluePencil}}\" cx-prop-user-locale=\"{{cxPropUserLocale}}\" cx-prop-retain-input=\"{{cxPropRetainInput}}\"> <template is=\"registerYield\" yield-name=\"cxNoteRightPrefixYield\" from-parent=\"\"></template> </crux-note-editor> </template></template> <lyte-modal class=\"deleteConfirmationModal\" lt-prop-show-close-button=\"false\" lt-prop-wrapper-class=\"cxBoxModal\" lt-prop-offset=\"{&quot;top&quot;:&quot;0px&quot;,&quot;left&quot;:&quot;center&quot;}\" lt-prop-transition=\"{&quot;animation&quot;:&quot;slideFromTop&quot;,&quot;duration&quot;:&quot;0.1&quot;}\" on-close=\"{{method('deleteConfirmationModalClosed')}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-header> {{if(cxPropRichTextFormat,cruxGetI18n('crm.settings.wizard.delete.confirm.banner',cruxGetI18n('crux.note.this.note')),cruxGetI18n('crm.warning.delete.record',cruxSubstr(if(currentNoteTitle,currentNoteTitle,currentNoteContent),35)))}} </lyte-modal-header> <lyte-modal-footer class=\"center\"> <lyte-button lt-prop-appearance=\"failure\" class=\"confirmNoteDeleteButton\" onclick=\"{{action('deleteNote')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.label.yes')}} </template> </lyte-button> <lyte-button onclick=\"{{action('hideDeleteconfirmationModal')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n('crm.button.cancel')}} </template> </lyte-button> </lyte-modal-footer> </template> </lyte-modal> <lyte-modal class=\"noteDataStorageLimit\" lt-prop-show-close-button=\"false\" lt-prop-offset=\"{&quot;top&quot;:&quot;40px&quot;}\" lt-prop-close-on-escape=\"false\" lt-prop-wrapper-class=\"cxNoteStorageLimitModalWrapper\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content class=\"cxNoteStorageLimitContent\"> <div class=\"cxNotesStorageLimitShadow\"></div> <div class=\"cxNotesStorageLimitWarnIcon\"></div> <div class=\"cxNotesStorageLimitInfo\"> <div class=\" cxNotesStorageLimitInfoContent \"> <template is=\"if\" value=\"{{isClientPortalUser}}\"><template case=\"true\"> {{unescape(cruxGetI18n(\"crm.storage.create.error.client\",cruxGetI18n(\"crm.feed.group.admin\")))}} </template><template case=\"false\"> {{unescape(cruxGetI18n(\"crm.storage.create.error\"))}} </template></template> <div class=\"cxNotesStorageLimitWarnMsg\"> {{cruxGetI18n(\"crm.storage.avail.info\",cruxNumToStorage(0,2,if(ifEquals(storageCalcType,\"count\"),true,false)),cruxNumToStorage(maxStorage,2,if(ifEquals(storageCalcType,\"count\"),true,false)))}} </div> </div> </div> <template is=\"if\" value=\"{{expHandlers(isClientPortalUser,'!')}}\"><template case=\"true\"> <lyte-button data-zcqa=\"dS_manage_data_storage\" lt-prop-appearance=\"primary\" class=\"cxNoteStorageLimitManageBtn\"> <template is=\"registerYield\" yield-name=\"text\"> <a data-zcqa=\"data_storageUsage\" href=\"{{concat(cruxGetCrmBasePath(),&quot;/settings/storage&quot;)}}\" class=\"cxNotesStorageLimitLink\" rel=\"noopener noreferrer\" target=\"_blank\"> {{cruxGetI18n('crm.storage.error.key.manage')}} </a> </template> </lyte-button> </template></template> <div class=\"cxNotesStorageLimitClose\" onclick=\"{{action('closeDSInfoPopup')}}\"></div> </lyte-modal-content> </template> </lyte-modal> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["cxPropNoteWidth",{"type":"helper","value":{"name":"concat","args":["'width: '",{"type":"helper","value":{"name":"concat","args":["cxPropNoteWidth","'px'"]}}]}},"''"]}}}},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,1,5,1]},{"type":"if","position":[1,1,1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,1,5,3]},{"type":"if","position":[1,1,1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1,1]},{"type":"for","position":[3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[3,1,1]},{"type":"attr","position":[3,1,3,1]},{"type":"text","position":[3,1,3,1,0]},{"type":"componentDynamic","position":[3,1,3,1]},{"type":"attr","position":[3,1,3,3]},{"type":"text","position":[3,1,3,3,0]},{"type":"componentDynamic","position":[3,1,3,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"text","position":[1,3,5,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"attr","position":[1,3,5,1]},{"type":"if","position":[1,3,5,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,7]},{"type":"text","position":[3,7,1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]},{"type":"attr","position":[0,2]},{"type":"if","position":[0,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"if","position":[1,0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]},{"type":"attr","position":[2]},{"type":"for","position":[2],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]},{"type":"text","position":[2,0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"text","position":[1,2,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":[{"type":"helper","value":{"name":"cruxAnd","args":[{"type":"helper","value":{"name":"cruxIfGt","args":["note.actualContent.length","cxPropNoteContentLimit"]}},{"type":"helper","value":{"name":"ifNotEquals","args":["currentSavedNote","note.id"]}}]}},"'display: none'","''"]}}}},{"type":"attr","position":[3,0]},{"type":"if","position":[3,0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]},{"type":"attr","position":[2]},{"type":"for","position":[2],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]},{"type":"text","position":[2,0]}]}},"default":{}}]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,3]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]}]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"attr","position":[1,9,1]},{"type":"if","position":[1,9,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,1]},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,9,3]},{"type":"if","position":[1,9,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,1]}]}},"default":{}},{"type":"attr","position":[1,9,7]},{"type":"text","position":[1,9,7,3]},{"type":"text","position":[1,9,9,0]},{"type":"attr","position":[1,9,11]},{"type":"text","position":[1,9,11,1]},{"type":"attr","position":[1,9,13]},{"type":"if","position":[1,9,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"attr","position":[7]}]}},"default":{}},{"type":"attr","position":[1,9,15]},{"type":"if","position":[1,9,15],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"if","position":[1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"text","position":[1,3,5,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,9]},{"type":"if","position":[1,3,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,11]},{"type":"registerYield","position":[1,3,11,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,3,11]},{"type":"registerYield","position":[1,3,13,1],"dynamicNodes":[{"type":"attr","position":[1,5,1,1]},{"type":"if","position":[1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"text","position":[1,5,1,3,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3,13]}],
_observedAttributes :["cxPropModule","noteModule","cxPropEntity","allNotes","cxPropNotesOrder","contactServerUrl","currentNoteContent","currentNoteTitle","currentNoteUploadedAttachments","defaultDisplayedNotesCount","allNotesCount","businessCardFields","useAnchor","useSpan","cxPropNoteWidth","notesFilters","cxPropSelectedFilter","isClientPortalUser","showAttachments","cxPropNoteContentLimit","cxPropMaxNoteContentLength","instanceNo","notesDownloaded","cxPropNotesMetaData","cxPropNoteCountNeeded","newTextbox","cxPropQueryParam","cxPropForcedFetch","cxPropMentionQueryParam","disableShare","storageCalcType","maxStorage","userInfoRevoked","idVsVoice","cxPropNotesLoading","cxPropPrefixYield","cxPropPreventHeaderNotesHide","cxPropScrollPosition","cxPropShowNotesEdit","cxPropShowNotesDelete","cxPropShowAddNote","cxPropDisableAttachmentActions","cxPropRelatedList","cxPropEmptyNoteMessage","cxPropNoteHeaderYield","cxPropNoteHeaderTitle","cxPropFooterRightPrefixYield","cxPropRichTextFormat","cxPropPrintPreview","seperateEditor","cxPropShowShareToCustomer","cxPropEditorPanelIcons","cxPropEditorShortCuts","cxPropReplaceStyle","cxPropWordToParaStyle","cxPropParaToWordStyle","cxPropAllowedStyles","cxPropAllowedTags","cxPropBoundary","showEditorPanel","cxPropNoteHeaderSuffixYield","cxPropMaxNoteContentLimit","cxPropMaxEditorContentHeight","cxPropDropdownScope","cxPropClass","cxPropParentElementScroll","currentSavedNote","cxPropRenderNotesWithoutParent","cxPropShowTitleInEditor","cxPropViewPreviousText","cxPropAddNoteText","cxPropEditorContentPlaceholder","cxPropEditorMinimizedPlaceholder","cxPropShowContentInBubble","cxPropShowMoreNotesYield","cxPropAnchorStyle","cxPropTabindex","cxPropStandardNavigation","cxPropCustomNoteRequest","cxPropBluePencil","cxPropUserLocale","cxPropRetainInput"],
_observedAttributesType :["string","object","object","array","string","string","string","string","array","number","number","array","boolean","boolean","string","array","string","boolean","boolean","number","number","number","boolean","object","boolean","boolean","object","boolean","object","boolean","string","number","boolean","object","boolean","boolean","boolean","object","boolean","boolean","boolean","boolean","object","string","boolean","string","boolean","boolean","boolean","boolean","boolean","array","object","object","array","array","array","object","object","boolean","boolean","number","number","string","string","string","string","boolean","boolean","string","string","string","string","boolean","boolean","object","number","boolean","boolean","boolean","string","boolean"],
 //NO I18N
	data : function(){
		return {
			/**
			 * The module for which the Notes have to be fetched and created.
			 * @componentProperty {string} cxPropModule=""
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropModule: Lyte.attr("string", {"default": ""}), //NO I18n
			noteModule: Lyte.attr("object", {"default": (typeof moduleRecordMapping !== "undefined" ? moduleRecordMapping.Notes : {creatable: true, editable: true, deletable: true})}), //NO I18N
			// moduleSingularLabel: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * The record id for which the Notes have to be fetched or created.
			 * @componentProperty {object} cxPropEntity
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEntity: Lyte.attr("object", {"default": {}}), //NO i18n
			// moduleApi: Lyte.attr("string", {"default": ""}), //NO I18n
			allNotes: Lyte.attr("array", {"default": []}), //NO I18n
			/**
			 * The sort order in which the Notes have to be displayed.
			 * @componentProperty {string} cxPropNotesOrder=_cruxUtils.getI18n.apply(undefined,['crm.note.recent.last'])
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNotesOrder: Lyte.attr("string", {"default": _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])}), //NO I18n
			contactServerUrl: Lyte.attr("string", {'default': (typeof Crm !== "undefined" ? Crm.userDetails.contactServerUrl : "")}), //NO I18n
			// isMentionPluginBound: Lyte.attr("boolean", {"default": false}), //NO I18n
			// currentNoteId: Lyte.attr("string", {"default": ""}), //NO I18n
			currentNoteContent: Lyte.attr("string", {"default": ""}), //NO I18n
			currentNoteTitle: Lyte.attr("string", {"default": ""}), //NO i18n
			currentNoteUploadedAttachments: Lyte.attr("array", {"default": []}), //NO I18N
			defaultDisplayedNotesCount: Lyte.attr("number", {"default": 3}), //NO I18n
			allNotesCount: Lyte.attr("number", {"default": 0}), //NO I18n
			businessCardFields: Lyte.attr("array", {"default": []}), //NO I18n
			// profileInfoBCField: Lyte.attr("object", {"default": {}}), //NO I18n
			useAnchor: Lyte.attr("boolean", {"default": false}), //NO I18N
			useSpan: Lyte.attr("boolean", {"default": false}), //NO I18n
			// entityNameWithoutSalutation: Lyte.attr("string", {"default": ""}), //NO I18n
			/**
			 * Width to be set to the Note component.
			 * @componentProperty {string} cxPropNoteWidth=""
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNoteWidth: Lyte.attr("string", {"default": ""}), //NO I18N
			notesFilters: Lyte.attr("array", {'default': []}), //NO i18n
			// unModifiedNotes: Lyte.attr("array", {"default": []}), //NO i18n
			/**
			 * Preset the selected option in the filter options.
			 * @componentProperty {string} cxPropSelectedFilter="All"
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropSelectedFilter: Lyte.attr("string", {"default": "All"}), //NO I18N
			isClientPortalUser: Lyte.attr("boolean", {"default": (typeof Crm !== "undefined" && Crm.userDetails.CLIENT_ACCOUNT ? Crm.userDetails.CLIENT_ACCOUNT : false)}), //NO I18N
			// isEdit: Lyte.attr("boolean", {"default": false}), //NO I18N
			// attachmentObj: Lyte.attr("array", {"default": []}), //NO I18n
			showAttachments: Lyte.attr("boolean", {"default": false}), //NO I18N
			/**
			 * The limit of characters to be displayed in a note content.
			 * @componentProperty {number} cxPropNoteContentLimit=200
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropNoteContentLimit: Lyte.attr("number", {"default": 200}), //NO I18N
			/**
			 * @componentProperty {number} cxPropMaxNoteContentLength=140
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxNoteContentLength: Lyte.attr("number", {"default": 140}), //NO I18n
			instanceNo: Lyte.attr("number", {'default': 1}), //NO I18N
			notesDownloaded: Lyte.attr("boolean", {'default': false}), //NO i18n
			/**
			 * Pass meta data, such as page, per_page and count, of the Notes as an object.
			 * @componentProperty {object} cxPropNotesMetaData
			 * @default {page:1,per_page:200,count:0}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNotesMetaData: Lyte.attr("object", {"default": {page: 1, per_page: 200, count: 0}}), //NO I18N
			/**
			 * Set to true, to display the note count.
			 * @componentProperty {boolean} cxPropNoteCountNeeded=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNoteCountNeeded: Lyte.attr("boolean", {'default': false}), //NO I18N
			newTextbox: Lyte.attr("boolean", {'default': false}), //NO I18N
			/**
			 * Pass the object that needs to be sent as query params to the Notes request.
			 * @componentProperty {object} cxPropQueryParam
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropQueryParam: Lyte.attr("object", {"default": {}}), //NO I18N
			/**
			 * Set to true to always make a Notes request, else data will be fetched from cache if available.
			 * @componentProperty {boolean} cxPropForcedFetch=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropForcedFetch: Lyte.attr("boolean", {"default": false}), //NO I18N
			// editingNoteId: Lyte.attr("string", {"default": ""}), //NO I18N
			// shareToCustomer: Lyte.attr("boolean", {"default": false}), //NO I18N
			/**
			 * Pass the object that needs to be sent as query params to the Mentions request.
			 * @componentProperty {object} cxPropMentionQueryParam
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropMentionQueryParam: Lyte.attr("object", {"default": {}}), //NO I18n
			disableShare: Lyte.attr("boolean", {"default": false}), //NO I18N
			storageCalcType: Lyte.attr("string", {"default": (typeof  Crm !== "undefined" && typeof Crm.userDetails.data_storage !== 'undefined'? Crm.userDetails.data_storage.calculation_type : "")}), //NO i18n
			maxStorage: Lyte.attr("number", {"default": 0}), //NO I18N
			userInfoRevoked: Lyte.attr("boolean", {"default": false}), //NO I18N
			idVsVoice : Lyte.attr('object',{default : {}}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropNotesLoading=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNotesLoading: Lyte.attr('boolean', {default: true}),	//NO I18N
			/**
			 * Set to true to render a prefix content to the note editor.
			 * @componentProperty {boolean} cxPropPrefixYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropPrefixYield : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropPreventHeaderNotesHide=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropPreventHeaderNotesHide : Lyte.attr('boolean',{default : false}), //no i18n 
			/**
			 * @componentProperty {object} cxPropScrollPosition
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropScrollPosition : Lyte.attr('object'), //no i18n
			/**
			 * Notes are editable by default. Set to false, to disable edit.
			 * @componentProperty {boolean} cxPropShowNotesEdit=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowNotesEdit : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * Notes are deletable by default. Set to false, to hide delete option.
			 * @componentProperty {boolean} cxPropShowNotesDelete=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowNotesDelete : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowAddNote=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowAddNote : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * Set to true to disable attachment action in Notes.
			 * @componentProperty {boolean} cxPropDisableAttachmentActions=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropDisableAttachmentActions : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * The id of the related list is passed as query params to the Notes count request.
			 * @componentProperty {object} cxPropRelatedList
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropRelatedList : Lyte.attr('object'), //no i18n
			/**
			 * The message to be displayed when there are no Notes to display.
			 * @componentProperty {string} cxPropEmptyNoteMessage
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEmptyNoteMessage : Lyte.attr('string'), //no i18n
			/**
			 * Set to true to render custom header content
			 * @componentProperty {boolean} cxPropNoteHeaderYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNoteHeaderYield : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * The title to be set to the Notes.
			 * @componentProperty {string} cxPropNoteHeaderTitle=_cruxUtils.getI18n('crm.label.notes')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNoteHeaderTitle : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.label.notes')}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropFooterRightPrefixYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropFooterRightPrefixYield : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropRichTextFormat=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropRichTextFormat : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Set to true to render the Notes in Print Preview mode.
			 * @componentProperty {boolean} cxPropPrintPreview=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropPrintPreview : Lyte.attr('boolean',{default : false}), //no i18n
			seperateEditor : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowShareToCustomer=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowShareToCustomer : Lyte.attr('boolean',{default : false}), //no i18n
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
			 * @default ['font-style','font-weight','text-decoration','color','background-color','background','vertical-align','--tablevel','margin-left','margin-right','list-style-type','padding-inline-start','text-decoration-line','text-decoration-thickness','text-decoration-style','text-decoration-color','margin-inline-start','list-style-position','display','white-space','white-space-collapse','text-wrap-mode']
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAllowedStyles: Lyte.attr('array', { default: ['font-style', 'font-weight', 'text-decoration', 'color', 'background-color', 'background', 'vertical-align', '--tablevel', 'margin-left', 'margin-right', 'list-style-type', 'padding-inline-start', 'text-decoration-line', 'text-decoration-thickness', 'text-decoration-style', 'text-decoration-color', 'margin-inline-start', 'list-style-position', 'display','white-space', 'white-space-collapse','text-wrap-mode'] }), //No I18n
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
			/**
			 * It represents a rectangular area(dimensions calculated from the window) beyond which the dropdown closes. When the lyte-drop-button crosses this boundary(by scrolling), it automatically closes the dropdown.
			 * @componentProperty {object} cxPropBoundary
			 * @default {}
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropBoundary : Lyte.attr('object',{default : {}}), //no i18n
			showEditorPanel : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Set to true to render custom suffix next to the header
			 * @componentProperty {boolean} cxPropNoteHeaderSuffixYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropNoteHeaderSuffixYield : Lyte.attr('boolean',{default : false}), //no i18n
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
			 * @componentProperty {number} cxPropMaxEditorContentHeight=405
			 * @author naveen.winson
			 * @version 1.0.0
			 * @step 1
			 * @minValue minimum
			 * @maxValue maximum
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxEditorContentHeight : Lyte.attr('number',{default : 405}), //no i18n
			/**
			 * This represents the dom element within which the lyte-drop-box must be contained. The lyte-drop-box never leaves the boundary of its scope element. Used in dropdowns inside modals.
			 * @componentProperty {string} cxPropDropdownScope
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropDropdownScope : Lyte.attr('string'),
			/**
			 * The class set to the Note component.
			 * @componentProperty {string} cxPropClass=""
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropClass	: Lyte.attr('string',{default : ""}),//no i18n
			/**
			 * @componentProperty {string} cxPropParentElementScroll
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropParentElementScroll : Lyte.attr('string'), //no i18n
			currentSavedNote : Lyte.attr('string',{default : ""}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropRenderNotesWithoutParent=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropRenderNotesWithoutParent : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowTitleInEditor=true
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowTitleInEditor : Lyte.attr('boolean',{default : true}), //no i18n
			/**
			 * The text displayed on the link used to render previously loaded Notes.
			 * @componentProperty {string} cxPropViewPreviousText=_cruxUtils.getI18n('crm.note.view.previous')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropViewPreviousText : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.note.view.previous')}), //no i18n
			/**
			 * The text displayed on the link used to render add Notes.
			 * @componentProperty {string} cxPropAddNoteText=_cruxUtils.getI18n('crm.label.add.note')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAddNoteText : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.label.add.note')}), //no i18n
			/**
			 * @componentProperty {string} cxPropEditorContentPlaceholder=_cruxUtils.getI18n('crux.new.note.msg')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEditorContentPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crux.new.note.msg')}), //no i18n
			/**
			 * @componentProperty {string} cxPropEditorMinimizedPlaceholder=_cruxUtils.getI18n('crm.general.addnote')
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropEditorMinimizedPlaceholder : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.general.addnote')}), //no i18n
			/**
			 * @componentProperty {boolean} cxPropShowContentInBubble=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowContentInBubble : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * Set to true to render custom Show More Notes content.
			 * @componentProperty {boolean} cxPropShowMoreNotesYield=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropShowMoreNotesYield : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * @componentProperty {object} cxPropAnchorStyle
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropAnchorStyle : Lyte.attr('object'),
			/**
			 * Sets the tabindex.
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
			 * Set to true to make custom request for Notes.
			 * @componentProperty {boolean} cxPropCustomNoteRequest=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropCustomNoteRequest : Lyte.attr('boolean',{default : false}),
			/**
			 * @componentProperty {boolean} cxPropBluePencil=false
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropBluePencil : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * The locale of the user.
			 * @componentProperty {string} cxPropUserLocale=typeofCrm!=="undefined"?Crm.userDetails.LOCALE:"en-US"
			 * @author naveen.winson
			 * @version 1.0.0
			 */
			cxPropUserLocale : Lyte.attr('string',{default : (typeof Crm !== "undefined" ? Crm.userDetails.LOCALE : "en-US")}),
			cxPropRetainInput : Lyte.attr('boolean',{default : true}) //no i18n 
		}
	},
	init: function() {

		/**
		 * Call this util to open the note editor.
		 * @utility openNoteEditor
		 * @author naveen.winson
		 * @version 1.0.0
		 */
		this.$node.openNoteEditor = function(){
			this.component.openNotesTextareaFn();
		}

		/**
		 * Call this util to set the note content once it is rendered.
		 * @utility setNoteContent
		 * @author naveen.winson
		 * @version 1.0.0
		 * @param { * } msg
		 * @param { * } collection
		 */
		this.$node.setNoteContent = function(msg,collection){
			var instanceNo = this.getData("instanceNo"); //NO I18N
			$L("#noteTextarea" + instanceNo,this.$node).cruxMention("setMessage" , {message : msg,collection : collection});
		}

		/**
		 * Call this util to fetch the note content entered.
		 * @utility getNoteContent
		 * @author naveen.winson
		 * @version 1.0.0
		 * @return { * }
		 */
		this.$node.getNoteContent = function(){
			return this.component.formattedNoteText;
		}
		/**
		 * @utility setColorBox
		 * @author naveen.winson
		 * @version 1.0.0
		 */
		this.$node.setColorBox = function(){
			this.component.setColorBox();
		}

		if(this.data.cxPropPrintPreview){
			this.setData({cxPropShowNotesEdit : false,cxPropShowNotesDelete : false,cxPropShowAddNote : false})
		}
		this.formattedNoteText = "";
		this.title = "";
		this.isMentionPluginBound = false;
		this.currentNoteId = "";
		this.unModifiedNotes = [];
		this.isEdit = false;
		this.attachmentObj = [];
		this.editingNoteId = "";
		this.shareToCustomer = false;
		this.pageQuery = {per_page : 200,page : 1};

		// this.setData("cxPropSelectedFilter", "All"); //NO I18N
		// var cxPropModule = this.getData("cxPropModule"); //NO I18n
		var moduleApi = typeof moduleRecordMapping !== "undefined" && moduleRecordMapping[this.data.cxPropModule]? moduleRecordMapping[this.data.cxPropModule].api_name : ""; //NO I18N

		// this.setData("moduleApi", moduleApi); //NO I18n
		this.moduleApi = moduleApi;
		this.batchNo = 0;
		// this.setData("moduleSingularLabel", moduleRecordMapping[cxPropModule].singular_label); //NO I18n

		if(typeof moduleApiMapping !== "undefined") {
			for(var key in moduleApiMapping) {
				this.apiModuleMapping[moduleApiMapping[key]] = key;
			}
		}

		var cxPropEntity = this.getData("cxPropEntity"); //NO I18n
		if(cxPropEntity.$notes_view && cxPropEntity.$notes_view.length > 0) {
			var filters  = cxPropEntity.$notes_view;

			filters.splice(filters.indexOf('All'), 1);
			var fil = [];
			filters.forEach(function(item,index){
			     // filters[index] = moduleRecordMapping[item] ?  moduleRecordMapping[item].plural_label : filters[index];
				fil.push({api_name : item,display : moduleRecordMapping[item] ?  moduleRecordMapping[item].plural_label : item});
			})

			filters.unshift("All"); //NO i18n
			fil.unshift({api_name : "All",display : "All"});
			if(this.getMethods('setNotesFilter')){
				/**
				 * The method is called when the component is rendered, so that one make changes in the predefined filter options
				 * @method setNotesFilter
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { array } fil
				 */
				fil = this.executeMethod('setNotesFilter',fil);
			}
			this.setData("notesFilters", fil); //NO i18n
		}

		if(!this.data.isClientPortalUser && this.data.cxPropEntity.$client_portal_permission && this.data.cxPropEntity.$client_portal_permission.notes){
			this.setData('cxPropShowShareToCustomer',true);
		}
		if(!Lyte.registeredCustomComponent['crux-note-loading']){
			Lyte.createCustomElement( "crux-note-loading", {
				static : {
					"observedAttributes": {
						get : function() {
							return [];
						}
					}
				},
				"connectedCallback": function() {
					this.innerHTML = `<div class="cxNotesAddedNotesLoader">
						<div class="cxNotesLoaderCircle">
							<div class="cxNotesCircleLoaderRunner"></div>
						</div>
						<div class="cxNotesLoaderRightSection">
							<div class="cxNotesLoaderLine cxNotesLoaderLine1">
								<div class="cxNotesLoaderRunner"></div>
							</div>
							<div class="cxNotesLoaderLine cxNotesLoaderLine2">
								<div class="cxNotesLoaderRunner"></div>
							</div>
						</div>
					</div>`
				}
			});
		}
		this.noteLoadingElement = document.createElement('crux-note-loading');
		if(cxPropEntity.id) {
			// if component has already hit the note api, it would also add global event for updating notes everywhere used in current page, so if the global event is registed
			// note api has been hit. below line prevents multiple request to be fired.
			var events = Lyte.registeredGlobalEvents.noteAddedOrDeleted;
			var apiReqMade = false;

			if(events) {
				var len = events.listeners ? events.listeners.length : 0;

				for(var i = 0; i < len; i++) {
					if(events.listeners[i]) {
						apiReqMade = true;
						break;
					}
				}
			}

			if(!apiReqMade || this.getData("cxPropForcedFetch")) {

				// store.unloadAll("note"); //NO I18N
				var noteReq;
				if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
					/**
					 * When cxPropCustomNoteRequest is passed as true, this method will be called where one has to make the request and return the promise.
					 * @method onCustomNoteRequest
					 * @author naveen.winson
					 * @version 1.0.0
					 * @param { string } 'findAll'
					 * @param { string } 'note'
					 * @param { object } Object.assign(this.pageQuery,this.getData("cxPropQueryParam"))
					 */
					noteReq = this.executeMethod('onCustomNoteRequest','findAll','note',Object.assign(this.pageQuery,this.getData("cxPropQueryParam")))
				}else{
					noteReq = store.findAll("note", Object.assign(this.pageQuery,this.getData("cxPropQueryParam")), false, true, {"module": moduleApi, "entityId": cxPropEntity.id})
				}
				noteReq.then(function(notesData) { //NO I18n
					this.pageQuery.page = this.pageQuery.page ? this.pageQuery.page+1 : 2;
					var allNoteComponentsInPage = document.querySelectorAll(".cxNoteElem"); //NO I18N
					len = allNoteComponentsInPage.length;
					var notesDataLen = notesData.length;
					var entityIds = [cxPropEntity.id]; //NO I18N
					var promisesData = {};
					var promises = [];
					var undefinedModelDefinition = [];
					var undefinedModelDefinitionPromises = []
					var comp;
					var entityModel;
					var hiddenNotesCount = 0;
					this.data.moreNotes = notesData.$ && notesData.$.meta.more_records;
					promises.push(this.getNoteCount(this.data.moreNotes,notesData))
					//hits user api to know sort order of the notes
					notesData = Lyte.deepCopyObject(notesData)
					//fetches all different entity records to which current entity record is related to.
					//removes $notes_view check as Tasks, Events and Calls modules records' notes do not have $notes_view when associated with any other module like Accounts
					// if(cxPropEntity.$notes_view && cxPropEntity.$notes_view.length > 0) {
						for(var i = 0; i < notesDataLen; i++) {
							moduleApi = notesData[i].$se_module ? notesData[i].$se_module : notesData[i].Parent_Id.module.api_name;
							if(notesData[i].Parent_Id){
								if(typeof moduleRecordMapping !== "undefined" && entityIds.indexOf(notesData[i].Parent_Id.id) === -1) {
									entityIds.push(notesData[i].Parent_Id.id);
									entityModel = moduleRecordMapping[this.apiModuleMapping[moduleApi]].id;

									if(store.modelFor(entityModel)) {
										notesData[i].entity = store.peekRecord(entityModel, notesData[i].Parent_Id.id);

										if(!notesData[i].entity) {
											if(!promisesData[entityModel]){
												promisesData[entityModel] = []
											}
											promisesData[entityModel].push(notesData[i].Parent_Id.id);
										}
									} else if(undefinedModelDefinition.indexOf(entityModel) === -1){
										undefinedModelDefinition.push(entityModel);
										if(!promisesData[entityModel]){
											promisesData[entityModel] = []
										}
										promisesData[entityModel].push(notesData[i].Parent_Id.id);
									} else{
										if(!promisesData[entityModel]){
											promisesData[entityModel] = [];
										}
										promisesData[entityModel].push(notesData[i].Parent_Id.id);
									}
								} else if(notesData[i].Parent_Id.id === cxPropEntity.id) {
									notesData[i].entity = cxPropEntity;
								}
							}else if(!this.data.cxPropRenderNotesWithoutParent){
								hiddenNotesCount++;
							}
						}

						this.setData('hiddenNotesCount',hiddenNotesCount)

						function fetchEntities(promises) {
							if(typeof Crm !== "undefined" && (!store.peekRecord('user',Crm.userDetails.USER_ID) || !store.peekRecord('user',Crm.userDetails.USER_ID).customize_info)) {
								promises.push(store.findRecord('user',Crm.userDetails.USER_ID,{type : 'CurrentUser'})); //NO i18N
							}
							Lyte.resolvePromises(promises).then(function(res) {
								for(var i = 0; i < notesDataLen; i++) {
									moduleApi = notesData[i].$se_module ? notesData[i].$se_module : notesData[i].Parent_Id.module.api_name;
									if( notesData[i].Parent_Id && typeof moduleRecordMapping !== "undefined" && !notesData[i].entity) {
										notesData[i].entity = store.peekRecord(moduleRecordMapping[this.apiModuleMapping[moduleApi]].id, notesData[i].Parent_Id.id);
									}
								}
								var order = store.peekRecord('user',Crm.userDetails.USER_ID).customize_info;
								this.setData("cxPropNotesOrder", order && order.notes_desc === false ? _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.first']) : _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])); //NO I18N
								// for(var i = 0; i < len; i++) {
								// 	comp = allNoteComponentsInPage[i].component;
								// 	if(comp) {
								// 		if(res[1] && res[1].length) {
								// 			var order = res[1][0].customize_info;
								// 			comp.setData("cxPropNotesOrder", order && order.notes_desc === false ? _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.first']) : _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])); //NO I18N
								// 		}
								// 		// Creates extension maps for files.
								// 		comp.createExtensionMap();
								// 		if(notesData && !comp.getData("notesDownloaded")) {
								// 			comp.processNotes(notesData); //NO I18n
								// 			// comp.setData("unModifiedNotes", notesData); //NO I18n
								// 			comp.unModifiedNotes = notesData;
								// 			comp.setData("notesDownloaded", true); //NO I18N
								// 		}
								// 	}
								// }
								this.createExtensionMap();
								if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
									notesData = notesData.reverse()
								}
								this.processNotes(notesData); //NO I18n
											// comp.setData("unModifiedNotes", notesData); //NO I18n
								this.unModifiedNotes = notesData;
								this.setData("notesDownloaded", true); //NO I18N
							}.bind(this));
						}

						var promisesDataLen = Object.keys(promisesData).length;
						if(promisesDataLen > 0 || (typeof Crm !== "undefined" && (!store.peekRecord('user',Crm.userDetails.USER_ID) || !store.peekRecord('user',Crm.userDetails.USER_ID).customize_info))) {
							var undefinedModelDefinitionLen = undefinedModelDefinition.length;

							if(undefinedModelDefinitionLen > 0) {
								for(var i = 0; i < undefinedModelDefinitionLen; i++) {
									undefinedModelDefinitionPromises.push(store.findRecord("module", undefinedModelDefinition[i], {}, false, true, {allowMultiple: true}));
								}

								Lyte.resolvePromises(undefinedModelDefinitionPromises).then(function(){
									for(var storeModel in  promisesData) {
										promises.push(store.findAll(storeModel, {ids : promisesData[storeModel].join(',')}))
									}

									fetchEntities.call(this, promises);
								}.bind(this));
							} else {
								for(var storeModel in  promisesData) {
									promises.push(store.findAll(storeModel, {ids : promisesData[storeModel].join(',')}))
								}
								fetchEntities.call(this, promises);
							}
						}else{
						// for(var i = 0; i < len; i++) {
						// 	comp = allNoteComponentsInPage[i].component;
						// 	if(comp) {
						// 		// Creates extension maps for files.
						// 		comp.createExtensionMap();
						// 		if(notesData && !comp.getData("notesDownloaded")) {
						// 			comp.processNotes(notesData); //NO I18n
						// 			// comp.setData("unModifiedNotes", notesData); //NO I18n
						// 			comp.unModifiedNotes = notesData;
						// 			comp.setData("notesDownloaded", true); //NO I18N
						// 		}
						// 	}
						// }
							this.createExtensionMap();
							var order = store.peekRecord('user',Crm.userDetails.USER_ID).customize_info;
							this.setData("cxPropNotesOrder", order && order.notes_desc === false ? _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.first']) : _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])); //NO I18N
							if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
								notesData = notesData.reverse()
							}
							this.processNotes(notesData); //NO I18n
										// comp.setData("unModifiedNotes", notesData); //NO I18n
							this.unModifiedNotes = notesData;
							this.setData("notesDownloaded", true); //NO I18N
						}

				}.bind(this),function(res){
					if(this.getMethods('onNotesRequestError')){
						/**
						 * This method is invoked when there is an error in the request made to fetch the Notes
						 * @method onNotesRequestError
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } res
						 */
						this.executeMethod('onNotesRequestError',res)
					}
				}.bind(this));
			} else {
				//handles the case when component is invoked and already one or more component is available in the current page.
				var notesData = store.peekAll("note"); //NO I18N

				if(notesData.length > 0 && !this.getData("notesDownloaded")) {
					// Creates extension maps for files.
					this.createExtensionMap();
					if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
						notesData = notesData.reverse()
					}
					this.processNotes(notesData); //NO I18n
					// this.setData("unModifiedNotes", notesData); //NO I18n
					this.unModifiedNotes = notesData;
					this.setData("notesDownloaded", true); //NO I18N
				}
			}
		}
	},

	didConnect: function() {
		// var deleteConfirmationModal = this.$node.querySelector(".cruxNotes lyte-modal.deleteConfirmationModal"); //NO I18n
		// deleteConfirmationModal.ltProp("offset", {"top":"0px","left":"center"}); //NO I18n
		// deleteConfirmationModal.ltProp("transition",{"animation":"slideFromTop","duration":"0.1"}); //NO I18n

		this.$node.classList.add("cxNoteElem"); //NO I18n

		this.setData("instanceNo", document.querySelectorAll(".cruxNotes").length); //NO I18N

		this.listenerId = Lyte.addEventListener("noteAddedOrDeleted", this.refreshNotes.bind(this));
	},
	getNoteCount : function(moreNotes,notesData){

		if(moreNotes && typeof Crm !== "undefined" && Crm.userDetails.isRLCountQuerySupported){
			try{
				var cd = {type : 'POST',apiVersion : 'v4'}
				var qp =[{related_list : {id : this.data.cxPropRelatedList.id}}]
				if(this.data.cxPropQueryParam && this.data.cxPropQueryParam.filters){
					qp[0].params = this.data.cxPropQueryParam;
					cd.apiVersion = 'v6';
				}
				if(this.data.cxPropSelectedFilter && this.data.cxPropSelectedFilter !== 'All'){
					var filterObj = {"comparator":"not_equal","field":{"api_name":"Parent_Id->"+this.data.cxPropSelectedFilter+".id"},"value":"${EMPTY}"}
					if(!qp[0].params){
						qp[0].params = {filters : filterObj}
						cd.apiVersion = 'v6';
					}else{
						qp[0].params.filters = {group_operator : 'and',group : [qp[0].params.filters,filterObj]}
					}
				}
				if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
					return this.executeMethod('onCustomNoteRequest','triggerAction','get_related_records_count',{get_related_records_count : qp}).then(function(count){
						this.setData("allNotesCount",count)
					}.bind(this))
				}else{
					return this.data.cxPropEntity.$.triggerAction('get_related_records_count',cd,'','', {get_related_records_count : qp}).then(function(countRes){
						this.setData("allNotesCount",countRes.get_related_records_count[0].count)
					}.bind(this))
				}
			}catch(e){
				this.setData("allNotesCount", notesData.length); //NO I18n
			}
		}else{
			this.setData("allNotesCount", notesData.length); //NO I18n
		}
	},
	refreshNotes: async function(params) {
		if(this.data){
			if(params.cxPropSelectedFilter){
				this.setData('cxPropSelectedFilter',params.cxPropSelectedFilter)
			}
			if( ((Object.keys(this.data.cxPropQueryParam).length == 0 || !this.data.cxPropQueryParam.filters) && (!params || !params.queryParam || !params.queryParam.filters) ) || (params && params.queryParam && JSON.stringify(this.data.cxPropQueryParam) == JSON.stringify(params.queryParam))) {
				this.setData("defaultDisplayedNotesCount", params.defaultDisplayedNotesCount); //NO I18n
				this.unModifiedNotes = params.allNotes;
				await this.getNoteCount(params.allNotes.length >= 200 || this.unModifiedNotes.length === params.allNotes.length,params.allNotes);
				if(params.allNotes.length < 200 && params.allNotes.length !== this.data.allNotesCount){
					var noteReq;
					if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
						noteReq = this.executeMethod('onCustomNoteRequest','findAll','note',Object.assign(this.pageQuery,this.getData("cxPropQueryParam")))
					}else{
						noteReq = store.findAll("note", Object.assign({page : 1,per_page : 200},this.getData("cxPropQueryParam")), false, true, {"module": this.moduleApi, "entityId": this.data.cxPropEntity.id})
					}
					noteReq.then(function(data){
						if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
							data = data.reverse()
						}
						this.unModifiedNotes =data;
						this.processNotes(data, undefined, true);
					}.bind(this))
				}else{
					this.processNotes(params.allNotes, undefined, true);
				}
				
			}else{
				this.processNotes(this.data.allNotes, undefined, true);
			}

		}
		
	},

	didDestroy: function() {
		// store.unloadAll("note"); //NO I18N
		Lyte.removeEventListener(this.listenerId);
	},

	createExtensionMap: function() {
		this.extensionMap = {
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
		}
	},

	apiModuleMapping: {},
	notesBatchCount: 10,

	processNotes: function(notesData, showPreviousNotes, fromRefreshNotes) {
		if(notesData.$) {
			this.setData("cxPropNotesMetaData", notesData.$.meta); //NO I18n
		} else {
			// this.getData("cxPropNotesMetaData").count = notesData.length; //NO I18N
			Lyte.Component.set(this.getData("cxPropNotesMetaData"), "count", notesData.length);
		}

		var cxPropNotesOrder = this.getData("cxPropNotesOrder"); //NO I18n
		var cxPropSelectedFilter = this.getData("cxPropSelectedFilter"); //NO I18N
		var moduleApi = this.moduleApi;

		// if(cxPropSelectedFilter !== "All") {
		// 	notesData = notesData.filter(function(note) {
		// 		return note.$se_module === moduleApi;
		// 	});
		// }

		var notesDataLen = notesData.length;
		notesDataLen = cxPropSelectedFilter === "All" ? notesDataLen-this.data.hiddenNotesCount : notesDataLen
		
		// this.setData("allNotesCount", notesDataLen); //NO I18n

		
		var defaultDisplayedNotesCount = this.getData("defaultDisplayedNotesCount"); //NO I18n
		if(defaultDisplayedNotesCount > notesDataLen || (defaultDisplayedNotesCount < 3 && notesDataLen <= 3)) {
			defaultDisplayedNotesCount = notesDataLen;
			this.setData("defaultDisplayedNotesCount", notesDataLen); //NO I18N
		}

		// on first load, 20 new records are shown, later batch of 10 notes
		var viewableNotesCount = this.batchNo === 1 ? (this.notesBatchCount * 2) : (this.batchNo * this.notesBatchCount + this.notesBatchCount);

		if(cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.first'])) { //NO I18n
			//Desc order sort
			notesData.sort(function(note1, note2) {
				return new Date(note2.Created_Time) - new Date(note1.Created_Time);
			});

			if(showPreviousNotes) {
				notesData = notesData.slice(0, notesDataLen >= viewableNotesCount ? viewableNotesCount : notesDataLen);
			} else {
				notesData = notesData.slice(0, defaultDisplayedNotesCount);
			}
		} else if(cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])) { //NO I18n
			//Asc order sort
			// notesData.reverse();
			notesData.sort(function(note1, note2) {
				return new Date(note1.Created_Time) - new Date(note2.Created_Time);
			});

			var startIdx = showPreviousNotes ? notesDataLen - viewableNotesCount : notesDataLen - defaultDisplayedNotesCount;
			startIdx = startIdx < 0 ? 0 : startIdx;
			notesData = notesData.slice(startIdx, notesDataLen);
		}

		notesData = notesData.slice(0);
		notesDataLen = notesData.length;
		this.setData("defaultDisplayedNotesCount", notesDataLen); //NO i18n
		this.setData('cxPropNotesLoading', false);
		// this.setData("allNotes", notesData); //NO I18n

		// first fetches users from local store and checks if all the note owners are present in the store,
		// if so, zuid of the note owners will be pulled from local store to show user's image
		var allUsers = store.peekAll("user").filter((item)=>{ return item.image_link; }); //NO I18n
		allUsers = allUsers ? allUsers : [];

		var allUserIds = allUsers.map(function(user) {
			return user.id;
		});

		var ownerId, modifierId;
		var allUsersPresentInStore = true;
		var unavailableUserIds = [];

		//finds all the unique user's Ids who has posted a note.
		for(var i = 0, j = 0; i < notesDataLen; i++) {
			ownerId = notesData[i].Owner.id;
			modifierId = notesData[i].Modified_By.id;

			if(unavailableUserIds.indexOf(ownerId) === -1 && allUserIds.indexOf(ownerId) === -1) {
				unavailableUserIds[j++] = ownerId;
				allUsersPresentInStore = false;
			} else if(unavailableUserIds.indexOf(modifierId) === -1 && allUserIds.indexOf(modifierId) === -1) {
				unavailableUserIds[j++] = modifierId;
				allUsersPresentInStore = false;
			}
		}

		if(allUsersPresentInStore) {
			this.setAllNotes(notesData, fromRefreshNotes);
		} else {
			var _promises = []
			//fetches all the users who has posted a note and uses their zuid to show their image before the note
			if(unavailableUserIds.length > 100){
				for(var n=0;n<userIds.length;n+=100){
					_promises.push(store.findAll("user", {type__s : 'Regular User,Client Portal User,Lite User', ids: unavailableUserIds.slice(n,n+100).join()})); //NO I18n
				}
			}else{
				_promises.push(store.findAll("user", {type__s : 'Regular User,Client Portal User,Lite User', ids: unavailableUserIds.join()})) //no i18n
			}
			Lyte.resolvePromises(_promises).then(function(users) {
				this.setAllNotes(notesData, fromRefreshNotes);
			}.bind(this));
		}
		// this.setColorBox();
		this.setData('cxPropNotesLoading',false);
		// colorbox preview plugin
		
	},
	setColorBox : function(){
		if($.colorbox) {
			$(this.$node.querySelectorAll(".cxNotesAttachImage")).colorbox({
				photo: true, 
				rel: "photonavigation",
				onOpen:function(){
					if(this.getMethods('onColorBoxOpen')){
						/**
						 * It is invoked when the colorbox is opened but before the picture is loaded.
						 * @method onColorBoxOpen
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } component
						 */
						this.executeMethod('onColorBoxOpen',...arguments);
					}
				}.bind(this),
				onClosed:function(){
					if(this.getMethods('onColorBoxClosed')){
						/**
						 * 	It is invoked when the colorbox is closed.
						 * @method onColorBoxClosed
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } component
						 */
						this.executeMethod('onColorBoxClosed',...arguments);
					}
				}.bind(this),

			}); //NO I18N
		}
	},
	convertTextUrlToLink: function(text) {
		var patt = new RegExp(/((https?|ftps?|mailto)(:|&#x3a;)(\/\/|&#x2f;&#x2f;))((www\.){0,1}[a-zA-Z0-9-_]+(\.[a-z0-9-_]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s]*)*)|www\.([a-zA-Z0-9-_]+(\.[a-z0-9]+)+)((:|&#x3a;)[0-9]*(\.[a-z0-9]+)*)*(((\/|&#x2f;)[^\s]*)*)/); //NO I18N
		var patt1 = new RegExp("(https?|ftps?|mailto)://"); //NO I18n

		var formattedString = "", temp, temp1, temp2, match, linkText, prependText, appendText, linkStartPos, linkEndPos, uniqueText = "_cruxNotelink";
		var texts = text.split(" ");
		var newLineTexts, newLineTextsLen, formattedNewArray;
		var textsLen = texts.length;
		
		for(var i = 0; i < textsLen; i++) {
			newLineTexts = texts[i].split("\n"); //NO I18N
			newLineTextsLen = newLineTexts.length;
			formattedNewArray = [];

			for(var j = 0; j < newLineTextsLen; j++) {
				prependText = "";
				appendText = "";
				match = patt.exec(newLineTexts[j]);

				linkStartPos = match ? match.index : -1;
				linkEndPos = match ? match[0].length + match.index : 0;

				appendText = newLineTexts[j].substring(linkEndPos > 0 ? linkEndPos : newLineTexts[j].length);
				newLineTexts[j] = newLineTexts[j].substring(0, linkEndPos > 0 ? linkEndPos : newLineTexts[j].length);

				if(patt.test(newLineTexts[j]) && newLineTexts[j].indexOf("mailto://") > -1) {

					prependText = newLineTexts[j].substring(0, linkStartPos);
					linkText = newLineTexts[j].substring(linkStartPos, linkEndPos > 0 ? linkEndPos : newLineTexts[j].length);

					linkText = linkText.replace("mailto://", "mailto:"); //NO I18N

					temp = prependText + newLineTexts[j].replace(newLineTexts[j], 'mailto://<a href="' + linkText + '" target="_blank">' + linkText.replace("mailto:", "") + '</a>') + (appendText ? appendText : ""); //NO I18N
				} else if(patt.test(newLineTexts[j])) {

					prependText = newLineTexts[j].substring(0, linkStartPos);
					linkText = newLineTexts[j].substring(linkStartPos, linkEndPos > 0 ? linkEndPos : newLineTexts[j].length);
					var extLink = patt1.exec(newLineTexts[j]);
					extLink = (extLink ? '' : '//')  + linkText;
					var linkA = document.createElement('a');
					linkA.setAttribute('href',extLink);
					linkA.setAttribute('rel','noreferrer noopener')
					linkA.setAttribute('target',"_blank")
					linkA.innerText = linkText;
					temp = prependText + newLineTexts[j].replace(newLineTexts[j], linkA.outerHTML) + (appendText ? appendText : ""); //NO I18N
				} else {
					temp = newLineTexts[j] + (appendText ? appendText : "");
				}
				newLineTexts[j] = temp;
			}

			temp2 = newLineTexts.join("\n"); //NO i18N
			temp2 = i === 0 ? temp2 : " " + temp2;
			formattedString += temp2;
		}

		return formattedString;
	},

	uniqueReplText1: " cruxNoteAnchorOpen", //NO I18N
	uniqueReplText2: " cruxNoteAnchorClose", //NO I18N

	findOccurrencesOfLinks: function(text) {
		var regex = new RegExp('<a href=', 'g'); //NO I18N
		var result, resultIndex, startPos = [], endPos = [], hasReplaceText = false, temp, i = 0, prevIdx = 0;

		while((result = regex.exec(text))) {
			resultIndex = result.index;

			if(startPos.indexOf(resultIndex) === -1) {
				temp = text.substring(prevIdx, resultIndex);

				if(temp.indexOf(this.uniqueReplText1) > -1) {
					resultIndex = resultIndex - (i + 1) * (this.uniqueReplText1.length - "<a ".length) - i * (this.uniqueReplText2.length - "</a>".length); //NO I18N
				}

				prevIdx = resultIndex;
				startPos.push(resultIndex);
				i++;
			} else {
				break;
			}
		}

		regex = new RegExp("</a>", 'g'); //NO I18N
		i = 0, prevIdx = 0;

		while ((result = regex.exec(text)) ) {
			resultIndex = result.index + 4;

			if(endPos.indexOf(resultIndex) === -1) {
				temp = text.substring(prevIdx, resultIndex);

				if(temp.indexOf(this.uniqueReplText1) > -1) {
					resultIndex = resultIndex - (i + 1) * (this.uniqueReplText1.length - "<a ".length) - i * (this.uniqueReplText2.length - "</a>".length); //NO I18N
				}

				prevIdx = resultIndex;
				endPos.push(resultIndex);
				i++;
			} else {
				break;
			}
		}

		return {startPos: startPos, endPos: endPos};
	},

	setAllNotes: function(notesData, fromRefreshNotes,setShortData) {
		var isClientPortalUser = this.getData("isClientPortalUser"); //NO I18N
		var cxPropMaxNoteContentLength = this.getData("cxPropMaxNoteContentLength"); //NO I18N
		var noteModule = this.getData("noteModule") ? this.getData("noteModule") : {}; //NO I18N
		var notesDataLen = notesData.length;
		var usertf = typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT.toLowerCase() : ""; //NO I18N
		var _date, formattedTime, hh, ampm, mt, dateFormat, _creatable, _editable, _deletable;
		var _showEditable = true,_showDeletable = true;

		function assignMode(attachment) {
			//below should be removed once api provides support fot it.
			// attachment.isImage = true;

			var fileExtn = attachment.File_Name.substr(attachment.File_Name.lastIndexOf(".") + 1).toLowerCase(); //NO I18N
			var extensionFound = false;
			var s = attachment.Size
			if(s > 1000){
				s = s / 1000;
				if(s > 1000){
					s = s / 1000;
					s = parseFloat(s).toFixed(1) + ' ' + I18n.getMsg('MB')
				}else if(s != 0){
					s = parseFloat(s).toFixed(2) + ' ' + I18n.getMsg('KB')
				}
			}else{
				s = parseFloat(s).toFixed(1) + ' ' + I18n.getMsg('B')
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


		for(var i = 0; i < notesDataLen; i++) {
			// Lyte.Component.set(notesData[i], 'created_time', Utils.getDisplayDateTime(_date, true)); //NO I18n

			moduleApi = notesData[i].$se_module ? notesData[i].$se_module : notesData[i].Parent_Id.module.api_name;
			notesData[i].module = this.apiModuleMapping[moduleApi];

			if(notesData[i].Parent_Id && typeof moduleRecordMapping !== "undefined") {
				notesData[i].entity = notesData[i].entity ? notesData[i].entity : store.peekRecord(moduleRecordMapping[this.apiModuleMapping[moduleApi]].id, notesData[i].Parent_Id.id);
				notesData[i].moduleSingularLabel = notesData[i].moduleSingularLabel ? notesData[i].moduleSingularLabel : moduleRecordMapping[this.apiModuleMapping[moduleApi]].singular_label;
			}


			if(notesData[i].$attachments) {
				notesData[i].$attachments.forEach(assignMode.bind(this));
			}
			if(notesData[i].$voice_note){
				var voiceNote = notesData[i].$voice_note;
			 	var url = Crm.getCrmBasePath()+'/specific/ViewAttachment?fileId='+$ESAPI.encoder().encodeForURL(voiceNote.file_id)+'&module='+$ESAPI.encoder().encodeForURL(this.apiModuleMapping[moduleApi])+'&parentId='+$ESAPI.encoder().encodeForURL(notesData[i].Parent_Id.id)+'&id='+$ESAPI.encoder().encodeForURL(notesData[i].id)+'&name='+$ESAPI.encoder().encodeForURL(voiceNote.file_name);
			 	Lyte.Component.set(this.data.idVsVoice,notesData[i].id,url);
			}
			
			mt = notesData[i].Modified_Time;
			_date = new Date(mt);

			var currDate = new Date();
			var modifiedTimeinDispFormat = "";

			var secDiff = Math.floor((currDate.getTime() - _date.getTime()) / 1000); //getTime returns time in milliseconds
			var minDiff = Math.floor(secDiff / 60);
			var hourDiff = Math.floor(minDiff / 60);
			var notOn = true;
			if(secDiff < 60) {
				modifiedTimeinDispFormat = _cruxUtils.getI18n("crm.lower.now"); //NO i18n
			} else if(minDiff < 60) {
				if(minDiff === 1) {
					modifiedTimeinDispFormat = _cruxUtils.getI18n("crm.time.min.ago", minDiff); //NO i18n
				} else {
					modifiedTimeinDispFormat = _cruxUtils.getI18n("crm.time.mins.ago", minDiff); //NO i18n
				}
			} else if(hourDiff < 24) {
				if(hourDiff === 1) {
					modifiedTimeinDispFormat = _cruxUtils.getI18n("crm.time.hr.ago", hourDiff); //NO i18n
				} else {
					modifiedTimeinDispFormat = _cruxUtils.getI18n("crm.time.hrs.ago", hourDiff); //NO i18n
				}
			} else {
				//weeks by names are not supported currently in CrmDate.js date utility methods
				if(typeof CrmDate !== "undefined"){
					var crmDate = new CrmDate(mt); // mt = Modified_Time
					var day = crmDate.userDisplayDate;
					var monthName = crmDate.userDisplayMonthName; // I18n translated
					var year = crmDate.userDisplayYear;
					var currentYear = (new Date()).getFullYear();
					var displayDate = monthName + " " + day;
					
					if (year !== currentYear) {
					displayDate += " " + year;
					}

					modifiedTimeinDispFormat = displayDate;
					notOn = false;
				}
			}
			Lyte.Component.set(notesData[i], 'modified_time', notesData[i].Created_Time === notesData[i].Modified_Time ? modifiedTimeinDispFormat : _cruxUtils.getI18n.apply(undefined, [notOn ? 'crm.label.edited' : 'crm.label.edited.on']) + " " + modifiedTimeinDispFormat);

			// Lyte.Component.set(notesData[i], 'created_time_full', Utils.getDateTimeInUsrViewFormat(new Date(notesData[i].Created_Time))); //NO I18n

			if(typeof CrmDate !== "undefined") {
				dateFormat = typeof Crm !== "undefined" && Crm.userDetails.COUNTRY_LOCALE.indexOf("GB") > -1 ? "DD MMM" : "MMM DD"; // NO I18N
				var dateObj = Utils.ISO8601toDateObject(notesData[i].Modified_Time);
				var dtStr = Utils.convertDateToUserPattern(dateObj,dateFormat);		
				formattedTime = dtStr += " " + Utils.getTimeInUserFormat(dateObj, true, true);
				var month = dateFormat === "MMM DD" ? formattedTime.slice(0,3) : formattedTime.slice(3,6);
        		formattedTime =  formattedTime.replace(month,I18n.getMsg(month));		
        	}

			Lyte.Component.set(notesData[i], 'modified_time_full', notesData[i].Created_Time === notesData[i].Modified_Time ? formattedTime : _cruxUtils.getI18n.apply(undefined, ['crm.label.edited.on']) + " " + formattedTime); //NO I18n

			if(!notesData[i].entity && notesData[i].Parent_Id && typeof moduleRecordMapping !== "undefined"){
				
					Lyte.Component.set(notesData[i],'entity', notesData[i].entity ? notesData[i].entity : store.peekRecord(moduleRecordMapping[this.apiModuleMapping[this.moduleApi]].id, notesData[i].Parent_Id.id));
				
			}
		}

		var notesContent = notesData.map(function(note) {
			return note.Note_Content;
		});

		var notesContentLen = notesContent.length;
		var unformattedNoteContents = this.unformatNoteContents(notesContent);

		function getEndIndex(notesContent, actualContent, _startPos, _endPos, mentions) {

			var endPosIdx = cxPropMaxNoteContentLength;
			var posLen = _startPos.length;

			for(var c = 0; c < posLen; c++) {
				if(_startPos[c] < cxPropMaxNoteContentLength) {
					endPosIdx = _endPos[c];
				} else {
					break;
				}
			}

			if(!endPosIdx && notesContent.length < cxPropMaxNoteContentLength) {
				endPosIdx = notesContent[i].length;
			}

			return endPosIdx;
		}

		if(unformattedNoteContents.constructor === Promise) {
			unformattedNoteContents.then(function() {
				var maxNoteContentLength = this.getData("maxNoteContentLength"); //NO I18N
				var regExp = new RegExp("crm[[aA-zZ]*#[0-9]+#[0-9]+]crm","gi"); //No I18n
				for(var i = 0; i < notesContentLen; i++) {
					// var _startPos = [];
					// var _endPos = [];
					var actualContent = "";
					var mentionName = "";
					// var lastIndex = undefined;
					var idx = undefined;
					// var endPosIdx = undefined;

					if(notesContent[i]) {
						//need to replace anchor tags to avoid treating them as links created using convertTextUrlToLink and mentions.
						if(!this.data.cxPropRichTextFormat){
							notesContent[i] = notesContent[i].replaceAll("<a ", this.uniqueReplText1); //NO I18N
							notesContent[i] = notesContent[i].replaceAll("</a>", this.uniqueReplText2); //NO I18N
						}
						

						notesContent[i] = notesContent[i].replace("&#x5b;", "["); //No i18n
						notesContent[i] = notesContent[i].replace("&#x23;", "#"); //No i18n
						notesContent[i] = notesContent[i].replace("&#x5d;", "]"); //No i18n
						actualContent = notesContent[i].slice();

						// converts notes text url to clickable links
						if(!this.data.cxPropRichTextFormat){
							notesContent[i] = this.convertTextUrlToLink(notesContent[i]);
						}
						

						var matches = notesContent[i].match(regExp);
						var matchesLen = matches ? matches.length : 0;

						for(var j = 0; j < matchesLen; j++) {
							var startPos = matches[j].indexOf("#");
							var endPos = matches[j].lastIndexOf("#");
							var mentionId = matches[j].slice(startPos + 1,endPos);
							var mentionRec;
							
							if(matches[j].indexOf("user") !== -1) { //No I18n
								mentionRec = store.peekRecord("user", mentionId) //NO I18N
								mentionName = mentionRec ? mentionRec.full_name : ""; //No I18n
								if(this.data.cxPropRichTextFormat){
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + $ESAPI.encoder().encodeForHTML(mentionName) + ",</a></span>" : ""); //No I18n
								}else{
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<a href='javascript:;'>" + $ESAPI.encoder().encodeForHTML(mentionName) + ",</a>" : ""); //No I18n
								}
								

								// notesContent[i] = notesContent[i].replace(matches[j], mentionName ? '<span style="white-space:break-spaces;color:#333;font-weight:bold">@['+mentionName+':'+mentionId+']</span>' : ""); //No I18n
								

								actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

							} else if(matches[j].indexOf("role") !== -1) { //No I18n
								mentionRec = store.peekRecord("role", mentionId); //No I18n
								mentionName = mentionRec ? mentionRec.name : '';
								if(this.data.cxPropRichTextFormat){
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + mentionName + ",</a></span>" : ""); //No I18n
								}else{
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<a href='javascript:;'>" + mentionName + ",</a>" : ""); //No I18n
								}
								actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

							} else if(matches[j].indexOf("group") !== -1) { //No I18n
								mentionRec = store.peekRecord("user_group", mentionId); //NO I18N
								mentionName = mentionRec ? mentionRec.name : ""; //NO I18N

								if(this.data.cxPropRichTextFormat){
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + mentionName + ",</a></span>" : ""); //No I18n
								}else{
									notesContent[i] = notesContent[i].replaceAll(matches[j], mentionName ? "<a href='javascript:;'>" + mentionName + ",</a>" : ""); //No I18n
								}
								actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

							}
						}
					}

					var noteOwner = store.peekRecord("user", notesData[i].Owner.id); //NO I18N
					var noteModifier = store.peekRecord("user", notesData[i].Modified_By.id); //NO i18n
					// notesData[i].endPosIdx = endPosIdx;
					notesData[i].disableShare = !isClientPortalUser && !noteOwner ? true : false;

					Lyte.Component.set(notesData[i], 'imageLink', noteModifier && noteModifier.image_link ?  noteModifier.image_link : "noPhoto"); //NO I18N
					Lyte.Component.set(notesData[i], 'isPortalUser', noteModifier && noteModifier.type__s == 'Client Portal User'); //NO I18N

					// if component is used in portal account and note is not created by portal user, then portal user should not be able to edit or delete the note.

					_editable = noteModule.editable === false ? false : isClientPortalUser && (!noteModifier || noteModifier.id != Crm.userDetails.USER_ID) ? false : true;
					_deletable = noteModule.deletable === false ? false : isClientPortalUser && (!noteModifier || noteModifier.id != Crm.userDetails.USER_ID) ? false : true;

					if(typeof moduleRecordMapping !== undefined && moduleRecordMapping[this.data.cxPropModule] &&moduleRecordMapping[this.data.cxPropModule].access_type === "team_based" ){
						_editable = Crm.userDetails.permissions["Crm_Implied_Edit_Notes_"+this.data.cxPropModule] ? true : false;
					}

					if(typeof moduleRecordMapping !== undefined && moduleRecordMapping[this.data.cxPropModule] &&moduleRecordMapping[this.data.cxPropModule].access_type === "team_based" ){
						_deletable = Crm.userDetails.permissions["Crm_Implied_Delete_Notes_"+this.data.cxPropModule] ? true : false;
					}
					if(notesData[i].cxEditable === false){
						_editable = false;
					}
					if(notesData[i].cxDeletable === false){
						_deletable = false;
					}

					if(Crm.userDetails.permissions.Crm_Implied_Edit_By_Owner_Notes){
						_showEditable = Crm.userDetails.USER_ID == notesData[i].Owner.id;
					}
					if(Crm.userDetails.permissions.Crm_Implied_Delete_By_Owner_Notes){
						_showDeletable = Crm.userDetails.USER_ID == notesData[i].Owner.id;
					}

					var occurrences, _startPos = [], _endPos = [], endPosIdx = 0;

					if(notesContent[i] && !this.data.cxPropRichTextFormat) {
						occurrences = this.findOccurrencesOfLinks(notesContent[i]);

						_startPos = occurrences.startPos;
						// _startPos = _startPos.sort(function(num1, num2) {return num1 - num2});
						_endPos = occurrences.endPos;
						// _endPos = _endPos.sort(function(num1, num2) {return num1 - num2});

						// var distinctEndPos = [], size = _endPos.length;
						// for(var k = 0, l = 0; k < size; k++) {
						// 	if(distinctEndPos.indexOf(_endPos[k]) === -1) {
						// 		distinctEndPos[l++] = _endPos[k];
						// 	}
						// }
						endPosIdx = getEndIndex(notesContent[i], actualContent, _startPos, _endPos, matchesLen);

						// undo all the replaces done for links.
						notesContent[i] = notesContent[i].replaceAll(this.uniqueReplText1, "<a "); //NO I18N
						notesContent[i] = notesContent[i].replaceAll(this.uniqueReplText2, "</a>"); //NO I18N
					}

					Lyte.Component.set(notesData[i], {
						'unformattedNoteContent': notesContent[i], //NO I18n
						'actualContent': actualContent, //NO I18n
						'lastIndex': _endPos.length > 0 ? _endPos[_endPos.length - 1] : 0, //NO I18n
						'endPosIdx': endPosIdx, //No I18n
						'startPos': _startPos, //NO I18n
						'endPos': _endPos, //NO I18n
						'seeMoreLastIdx': actualContent.length < cxPropMaxNoteContentLength ? actualContent : cxPropMaxNoteContentLength, //NO I18N
						'hasLinks': _startPos.length > 0 ? "true" : "false", //NO I18n
						'_creatable': _creatable, //NO I18N
						'_editable': _editable, //NO I18N
						'_deletable': _deletable, //NO I18N
						_showEditable : _showEditable, //no i18n
						_showDeletable : _showDeletable //no i18n
					});
					if(!setShortData){
						Lyte.Component.set(notesData[i], {
							'showingShortContent' : notesData[i].$has_more && notesData[i].$has_more.Note_Content
						});
					}
				}

				this.setData("allNotes", notesData); //NO I18n
				this.setColorBox()

				if(this.getMethods("onAfterRender")) {
					/**
					 * This method is executed once the component has rendered.
					 * @method onAfterRender
					 * @author naveen.winson
					 * @version 1.0.0
					 * @param { * } this
					 * @param { array } notesData
					 * @param { * } setShortData
					 */
					this.executeMethod("onAfterRender", this, notesData,setShortData); //NO I18N
				}
			}.bind(this));
		} else if(unformattedNoteContents === "hasNoMention") { //No I18n
			for(var i = 0; i < notesDataLen; i++) {
				var noteOwner = store.peekRecord("user", notesData[i].Owner.id); //NO I18N
				var noteModifier = store.peekRecord("user", notesData[i].Modified_By.id); //NO i18n

				notesData[i].disableShare = !isClientPortalUser && !noteOwner ? true : false;

				Lyte.Component.set(notesData[i], 'imageLink', noteModifier && noteModifier.image_link ?  noteModifier.image_link : "noPhoto"); //NO I18N
				Lyte.Component.set(notesData[i], 'isPortalUser', noteModifier && noteModifier.type__s == 'Client Portal User'); //NO I18N

				// if component is used in portal account and note is not created by portal user, then portal user should not be able to edit or delete the note.

				_editable = noteModule.editable === false ? false : isClientPortalUser && (!noteModifier || noteModifier.id != Crm.userDetails.USER_ID) ? false : true;
				_deletable = noteModule.deletable === false ? false : isClientPortalUser && (!noteModifier || noteModifier.id != Crm.userDetails.USER_ID) ? false : true;

				if(typeof moduleRecordMapping !== undefined && moduleRecordMapping[this.data.cxPropModule] &&moduleRecordMapping[this.data.cxPropModule].access_type === "team_based" ){
					_editable = Crm.userDetails.permissions["Crm_Implied_Edit_Notes_"+this.data.cxPropModule] ? true : false;
				}

				if(typeof moduleRecordMapping !== undefined && moduleRecordMapping[this.data.cxPropModule] &&moduleRecordMapping[this.data.cxPropModule].access_type === "team_based" ){
					_deletable = Crm.userDetails.permissions["Crm_Implied_Delete_Notes_"+this.data.cxPropModule] ? true : false;
				}
				if(notesData[i].cxEditable === false){
					_editable = false;
				}
				if(notesData[i].cxDeletable === false){
					_deletable = false;
				}

				if(Crm.userDetails.permissions.Crm_Implied_Edit_By_Owner_Notes){
					_showEditable = Crm.userDetails.USER_ID == notesData[i].Owner.id;
				}
				if(Crm.userDetails.permissions.Crm_Implied_Delete_By_Owner_Notes){
					_showDeletable = Crm.userDetails.USER_ID == notesData[i].Owner.id;
				}

				var occurrences, _startPos = [], _endPos = [], endPosIdx = 0, actualContent = "";

				if(notesContent[i] && !this.data.cxPropRichTextFormat) {
					//need to replace anchor tags to avoid treating them as links created using convertTextUrlToLink and mentions.
					notesContent[i] = notesContent[i].replaceAll("<a ", this.uniqueReplText1); //NO I18N
					notesContent[i] = notesContent[i].replaceAll("</a>", this.uniqueReplText2); //NO I18N

					actualContent = notesContent[i];
					//converts notes text url to clickable links
					notesContent[i] = this.convertTextUrlToLink(notesContent[i]);
					occurrences = this.findOccurrencesOfLinks(notesContent[i]);
					_startPos = occurrences.startPos;
					_endPos = occurrences.endPos;

					endPosIdx = getEndIndex(notesContent[i], actualContent, _startPos, _endPos);

					// undo all the replaces done for links.
					notesContent[i] = notesContent[i].replaceAll(this.uniqueReplText1, "<a "); //NO I18N
					notesContent[i] = notesContent[i].replaceAll(this.uniqueReplText2, "</a>"); //NO I18N
				}

				Lyte.Component.set(notesData[i], {
					'unformattedNoteContent': notesContent[i], //NO I18n
					'actualContent': actualContent, //NO I18n
					'lastIndex': _endPos.length > 0 ? _endPos[_endPos.length - 1] : 0, //NO I18n
					'endPosIdx': endPosIdx, //NO I18N
					'startPos': _startPos, //NO I18N
					'endPos': _endPos, //NO I18N
					'hasLinks': occurrences && occurrences.startPos.length > 0 ? "true" : "false", //NO I18n
					'_creatable': _creatable, //NO I18N
					'_editable': _editable, //NO I18N
					'_deletable': _deletable, //NO I18N
					_showEditable : _showEditable,//no i18n
					_showDeletable : _showDeletable //no i18n
				});
				if(!setShortData){
					Lyte.Component.set(notesData[i], {
						'showingShortContent' : notesData[i].$has_more && notesData[i].$has_more.Note_Content
					});
				}
			}

			this.setData("allNotes", notesData); //NO I18n

			if(this.getMethods("onAfterRender")) {
				this.executeMethod("onAfterRender", this, notesData,setShortData); //NO I18N
			}
			this.setColorBox();
		}
	},

	unformatNoteContents: function(notesContent) {
		var userIds = [];
		var roleIds = [];
		var groupIds = [];
		var notesContentLen = notesContent.length;
		var regExp = new RegExp("crm[[aA-zZ]*#[0-9]+#[0-9]+]crm","gi"); //No I18n

		for(var i = 0; i < notesContentLen; i++) {
			if(notesContent[i]) {
				notesContent[i] = notesContent[i].replace("&#x5b;", "["); //No i18n
				notesContent[i] = notesContent[i].replace("&#x23;", "#"); //No i18n
				notesContent[i] = notesContent[i].replace("&#x5d;", "]"); //No i18n

				var matches = notesContent[i].match(regExp);
				var matchesLen = matches ? matches.length : 0;

				for(var j = 0; j < matchesLen; j++) {
					var startPos = matches[j].indexOf("#");
					var endPos = matches[j].lastIndexOf("#");
					var mentionId = matches[j].slice(startPos + 1,endPos);

					if(matches[j].indexOf("user") !== -1) { //No I18n
						userIds.push(mentionId);
					} else if(matches[j].indexOf("role") !== -1) { //No I18n
						roleIds.push(mentionId);
					} else if(matches[j].indexOf("group") !== -1) { //No I18n
						groupIds.push(mentionId);
					}
				}
			}
		}

		var batchPromise = this.makeBatchRequest(userIds, roleIds, groupIds);
		return batchPromise;
	},

	makeBatchRequest: function(userIds, roleIds, groupIds) {
		var hasUserMention = userIds.length > 0 ? true : false;
		var hasRoleMention = roleIds.length > 0 ? true : false;
		var hasGroupMention = groupIds.length > 0 ? true : false;
		var _promises = [];

		if(hasUserMention) {
			if(userIds.length > 100){
				for(var n=0;n<userIds.length;n+=100){
					_promises.push(store.findAll("user", {type__s : 'Regular User,Client Portal User,Lite User', ids: userIds.slice(n,n+100).join()})); //NO I18n
				}
			}else{
				_promises.push(store.findAll("user", {type__s : 'Regular User,Client Portal User,Lite User', ids: userIds.join()})); //NO I18n
			}

		}
		if(hasRoleMention) {
			_promises.push(store.findAll("role", {ids: roleIds.join()})); //NO I18n
		}
		if(hasGroupMention) {
			_promises.push(store.findAll("user_group", {ids: groupIds.join()})); //NO I18n
		}

		if(hasUserMention || hasRoleMention || hasGroupMention) {
			return Lyte.resolvePromises(_promises);
		} else {
			return "hasNoMention"; //NO I18n
		}
	},

	alreadyAttachedFilesCount: 0,
	methods: {
		onBeforeEditorInputPasteCall : function(node){
			if(this.getMethods('onBeforeEditorPaste')){
				/**
				 * This method is invoked on before paste in the editor. Return false to cancel paste
				 * @method onBeforeEditorPaste
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } node
				 */
				return this.executeMethod('onBeforeEditorPaste',node)
			}
			return node;
		},
		onBeforeEditorInputCall : function(word,text,cursor,entered_text,element){
			if(this.getMethods('onBeforeEditorInput')){
				/**
				 * This method is invoked on before input in the editor. Return false to cancel the input.
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
		onEditorPanelOpenFn : function(){
			if(this.getMethods('onEditorPanelOpen')){
				/**
				 * This method is invoked before the editor panel opens.
				 * @method onEditorPanelOpen
				 * @author naveen.winson
				 * @version 1.0.0
				 */
				this.executeMethod('onEditorPanelOpen')
			}
		},
		onTextEditorElementAfterRenderCall : function(elem){
			if(this.getMethods('onTextEditorElementAfterRender')){
				/**
				 * This method is invoked once the text editor is rendered.
				 * @method onTextEditorElementAfterRender
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } elem
				 */
				this.executeMethod('onTextEditorElementAfterRender',elem)
			}
		},
		onBeforeAddNoteFn : async function(noteRec,previousContent){
			if(this.getMethods("onBeforeAddNote")) {
           /**
			* This method is rendered before a note is added. Return false to prevent the addition.
            * @method onBeforeAddNote
            * @author naveen.winson
            * @version 1.0.0
            * @param { * } noteRec
            * @param { * } previousContent
            */
				return await this.executeMethod("onBeforeAddNote", noteRec,previousContent); //NO I18N
			}
			return noteRec
		},
		onCloseNoteEditorFn : function(note){
			this.setData('noteEditModeId',undefined);
			if(this.getMethods('onCloseNoteEditor')){
				/**
				 * This method is invoked when a note is closed.
				 * @method onCloseNoteEditor
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } note
				 */
				this.executeMethod('onCloseNoteEditor',note);
			}
		},
		onOpenNoteEditorFn : function(note){
			if(this.getMethods('onOpenNoteEditor')){
				/**
				 * This method is invoked on open of the editor.
				 * @method onOpenNoteEditor
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } note
				 */
				this.executeMethod('onOpenNoteEditor',note);
			}
		},
		getNotePermissionCall : function(type,currentNoteId){
			return this.checkPermission(type,currentNoteId)
		},
		beforeNoteRequest : function(){
			this.noteLoadingTimeout = setTimeout(()=>{
				if(this.data.cxPropNotesOrder == _cruxUtils.getI18n('crm.note.recent.first')){
					Lyte.Component.insertBefore($L('.cruxNotesList',this.$node)[0].firstChild,this.noteLoadingElement)
				}else{
					Lyte.Component.appendChild($L('.cruxNotesList',this.$node)[0],this.noteLoadingElement)
				}
			},650);
		},
		noteFilterShow : function(event,dropdown){
			dropdown.childComp.querySelector('.lyteDropdownSelection').classList.remove('lyteDropdownSelection')
			dropdown.childComp.querySelector('.cruxNoteSelectedToggle').classList.add('lyteDropdownSelection')
		},
		updateNoteListCall : async function(currentNoteId, newRecord,note,moduleEntityObj){
			this.setData('currentSavedNote',currentNoteId);
			await this.updateCurrentNote(currentNoteId, newRecord,moduleEntityObj);
			clearTimeout(this.noteLoadingTimeout);
			var node = $L('crux-note-loading',this.$node)[0];
			node && node.remove();
			var noteEditor = this.$node.querySelector('crux-note-editor')
			if(noteEditor){
				noteEditor.setData('cxPropEntity',this.data.cxPropEntity);
				noteEditor.setData('cxPropModule',this.data.cxPropModule);
			}
			return;
		},
		onNotesRequestErrorMt : function(){
			clearTimeout(this.noteLoadingTimeout);
			var node = $L('crux-note-loading',this.$node)[0];
			if(node){
				node.remove();
			}
		},
		setSelectionClass: function(event,value , selectedArr,dropComp, menuItem) {
			if(this.getMethods('onNotesOrderToggle')){
				/**
				 * This method is invoked when the notes order is toggled.
				 * @method onNotesOrderToggle
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } event
				 * @param { * } value
				 */
				this.executeMethod('onNotesOrderToggle',event,value);
			}
			if(!menuItem.classList.contains("cruxNoteSelectedToggle")) {

				var cruxNoteComps = document.querySelectorAll(".cxNoteElem"); //NO I18N
				var cruxNoteCompsLen = cruxNoteComps.length;
				var comp;

				for(var i = 0; i < cruxNoteCompsLen; i++) {
					comp = cruxNoteComps[i].component;
					if(comp) {
						var noteEditor = cruxNoteComps[i].querySelector('crux-note-editor')
						if(noteEditor){
							noteEditor.closeNoteArea();	
						} 
						comp.toggleCruxNote(value);
					}
				}
			}
			dropComp.$node.close();
			return false;
		},
		deleteConfirmationModalClosed : function(){
			this.currentNoteId = "";
			this.setData("currentNoteTitle", ""); //NO I18n
			this.setData("currentNoteContent", ""); //NO I18n
		}
	},

		toggleCruxNote: function(cxPropNotesOrder) {
			var unModifiedNotes = this.unModifiedNotes;
			var requestFired = false;
			var isRecentFirstOrLast = cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.first']) || cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last']); //NO I18N

			function updateOrder() {
				this.batchNo = 0;
				this.setData("defaultDisplayedNotesCount", 3); //NO I18N
				this.setData("currentNoteUploadedAttachments", []); //NO I18N
				// this.processNotes(unModifiedNotes); //NO I18n
				if(isRecentFirstOrLast) {
					this.setData("cxPropNotesOrder", cxPropNotesOrder); //NO I18n
				} else {
					this.setData("cxPropSelectedFilter", cxPropNotesOrder); //NO i18n
				}
				store.unloadAll("note"); //NO I18N
				this.pageQuery = {per_page : 200,page : 1};
				this.setData('cxPropNotesLoading',true);
				if(isRecentFirstOrLast) {
					this.setData("cxPropNotesOrder", cxPropNotesOrder); //NO I18n
				} else {
					this.setData("cxPropSelectedFilter", cxPropNotesOrder); //NO i18n
				}
				var filters={};
				var cd = {"module": this.moduleApi, "entityId": this.getData("cxPropEntity").id}
				if(this.data.cxPropSelectedFilter !== 'All'){
					filters = {filters : {"comparator":"not_equal","field":{"api_name":"Parent_Id->"+this.data.cxPropSelectedFilter+".id"},"value":"${EMPTY}"}}
					cd.apiVersion = 'v6';
				}
				store.findAll("note", Object.assign(this.pageQuery,Object.assign(filters,this.getData("cxPropQueryParam"))), false, true, cd).then(function(notesData) { //NO I18n
					this.unModifiedNotes = notesData;
					// this.moreNotesAvailable = 
					this.data.moreNotes = notesData.$ && notesData.$.meta.more_records;
					Lyte.triggerEvent("noteAddedOrDeleted", {cxPropSelectedFilter : this.data.cxPropSelectedFilter, allNotes: notesData, defaultDisplayedNotesCount: this.getData("defaultDisplayedNotesCount"),queryParam : this.data.cxPropQueryParam}); //NO I18N
				}.bind(this),function(res){
					if(this.getMethods('onNotesRequestError')){
						this.executeMethod('onNotesRequestError',res)
					}
				}.bind(this));
			}

			if(isRecentFirstOrLast) {
				if(typeof Crm !== "undefined") {
					var user = store.peekRecord("user", Crm.userDetails.USER_ID); //NO I18N
					if(user){
						this.setData('cxPropNotesLoading',true);
						user.$.set("customize_info", {"notes_desc": cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])}); //NO I18N
						requestFired = true;

						user.$.save().then(function(res) {
							// this.setData("cxPropNotesOrder", cxPropNotesOrder); //NO I18n
							updateOrder.call(this);
						}.bind(this));
					}
				}
				// else {
				// 	requestFired = false;
				// 	// this.setData("cxPropNotesOrder", cxPropNotesOrder); //NO I18n
				// }

				// this.setData("isMentionPluginBound", false); //NO I18n
				this.isMentionPluginBound = false;
			} 

			if(requestFired === false) {
				updateOrder.call(this);
			}
		},

		currentNoteEntityId: "",
		currentNoteModuleApi: "",

		updateCurrentNote: function(currentNoteId, newRecord,moduleEntityObj) {
			store.unloadRecord("note", currentNoteId); //NO I18N

			// update the notes list.
			return store.findRecord("note", currentNoteId, {}, true, true,moduleEntityObj).then(function(resp) { //NO I18n
				this.requestResolved = true;
				this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("instanceNo")).click(); //NO I18N

				if(!newRecord && currentNoteId) {
					this.$node.querySelector(".cruxNotesList .cx_" + currentNoteId).style.display = ""; //NO I18N
				}

				this.setData("currentNoteUploadedAttachments", []); //NO I18N
				//hides all the uploaded attachments while opening notes notesTextArea
				this.setData("showAttachments", false); //NO I18N

				// this.setData('isEdit', false); //NO I18n
				this.isEdit = false;

				var notesData
				// if(this.data.cxPropQueryParam && Object.keys(this.data.cxPropQueryParam).length){
					var indexNot = this.unModifiedNotes.cruxFindIndexOfObject('id',resp[0].id)
					if(indexNot == -1){
						Lyte.arrayUtils(this.unModifiedNotes,'push',resp);
						this.setData('allNotesCount',this.data.allNotesCount +1)
					}else{
						Lyte.arrayUtils(this.unModifiedNotes,'replaceAt',indexNot,resp[0])
					}
					notesData = this.unModifiedNotes;
				// }else{
				// 	notesData = store.peekAll("note"); //NO i18n
				// 	this.setData('allNotesCount',notesData.length)
				// }
				if(notesData) {
					var defaultDisplayedNotesCount = this.getData("defaultDisplayedNotesCount"); //NO I18N
					//do not add if total no of notes are less than 3
					if(newRecord && defaultDisplayedNotesCount < notesData.length) {
						this.setData("defaultDisplayedNotesCount", defaultDisplayedNotesCount + 1); //NO I18n
					}
					// this.setData("unModifiedNotes", notesData); //NO I18n
					this.unModifiedNotes = notesData;
					Lyte.triggerEvent("noteAddedOrDeleted", {allNotes: this.unModifiedNotes, defaultDisplayedNotesCount: this.getData("defaultDisplayedNotesCount"),queryParam : this.data.cxPropQueryParam}); //NO I18N
				}

				if(currentNoteId && this.getMethods("onNoteEdited")) {
					/**
					 * This method is invoked when a note is edited.
					 * @method onNoteEdited
					 * @author naveen.winson
					 * @version 1.0.0
					 */
					this.executeMethod("onNoteEdited"); //NO I18n
				}
				if(newRecord && this.getMethods("onNoteAdded")) {
					/**
					 * This method is invoked when a note is added.
					 * @method onNoteAdded
					 * @author naveen.winson
					 * @version 1.0.0
					 */
					this.executeMethod("onNoteAdded"); //NO I18n
				}
				setTimeout(function(){
					var noteNode = this.$node.querySelector(".cruxNotesList .cx_" + currentNoteId)//eslint-disable-line @zoho/webperf/no-multipleDOMLookup
					if(noteNode && !noteNode.cxVisbleInViewPort(this.data.cxPropBoundary)){
						noteNode.scrollIntoView(); 
					}
				}.bind(this),newRecord ? 100 : 0)
			}.bind(this));
		},

		updateNote: function(currentNoteId) {
			var noteRec = store.peekRecord("note", currentNoteId); //NO I18N

			if(this.getMethods("onBeforeAddNote")) {
				noteRec = this.executeMethod("onBeforeAddNote", noteRec); //NO I18N
			}

			if(noteRec && noteRec.$.isModified) {
				noteRec.$.save({"noteId": currentNoteId}).then(function(saveStatus) { //NO i18n
					this.updateCurrentNote(currentNoteId);
				}.bind(this), function(error) {
					noteRec.$.rollBack();
					//cross tab notes  permission disabled
					if(error) {
						var response = JSON.parse(error.response);
						response = response.data ? response.data[0] : response;

						if(response.code == 'CANNOT_PERFORM_ACTION' || (response.code === "NO_PERMISSION" && (response.message === "permission denied" || response.details && response.details.permissions[0] === "Crm_Implied_Create_Attachments"))) {
							_cruxUtils.showCustomAlert({ params : {ltPropPrimaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } })
						} else if(response.code === "MAX_RECORDS_LIMIT_REACHED") {
							this.setData("maxStorage", error.details.size); //NO I18N
							this.$node.querySelector(".noteDataStorageLimit").ltProp("show", true); //NO I18N
						}
					} else {
						this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("instanceNo")).click(); //NO I18N
						// this.setData("currentNoteId", ""); //NO I18n
						this.currentNoteId = "";
					}
				}.bind(this));
			} else {
				this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("instanceNo")).click(); //NO I18N
				this.$node.querySelector(".cruxNotesList .cx_" + currentNoteId).style.display = ""; //NO I18N
			}
		},

		actions: {
			openNotesTextarea : function(currentEntity, module){
				this.openNotesTextareaFn(currentEntity,module);
			},
			editNote: async function(event,currentNoteId) {
				if(event.target.classList.contains('cxDisableEditBtn') || event.target.parentElement.classList.contains('cxDisableEditBtn') || this.checkPermission("edit", currentNoteId) === false) {
					return;
				}


				var note = store.peekRecord('note',currentNoteId);
				var showSeeMore = this.$node.querySelector(".cx_" + currentNoteId + " .cruxNoteSeeMore"); //no i18n
				if(this.data.cxPropRichTextFormat && note.$has_more && note.$has_more.Note_Content){
					var noteReq
					if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
						noteReq = this.executeMethod('onCustomNoteRequest','triggerAction','fetch_full_data',{fields : 'Note_Content'})
					}else{
						noteReq = note.$.triggerAction('fetch_full_data',{apiVersion : 'v7'},{fields : 'Note_Content'})
					}
					await noteReq.then(function(res){
						res.data[0].$has_more = {};
						res.data[0].$has_more.Note_Content  = false;
						if(!store.peekRecord('note',res.data[0].id).Short_content){
							res.data[0].Short_content = note.Note_Content;
						}
						res.data[0].Long_content = res.data.Note_Content;
						var noteNew= store.pushPayload('note',res.data);
						// note.showingLongContent = true;
						// note.showingShortContent = false;
						this.setData('editingNote',noteNew[0]);
						// var indexNot = this.data.allNotes.cruxFindIndexOfObject('id',note.id);
						// Lyte.arrayUtils(this.data.allNotes,'replaceAt',indexNot,noteNew);
						// this.setAllNotes(this.data.allNotes,undefined,true);
					}.bind(this))
				}else if(note.Long_content && note.showingShortContent){
					note.Short_content = note.Note_Content;
					note.Note_Content = note.Long_content;
					// note.showingLongContent = true;
					// note.showingShortContent = false;
					this.setData('editingNote',note);
					// var indexNot = this.data.allNotes.cruxFindIndexOfObject('id',note.id);
					// Lyte.arrayUtils(this.data.allNotes,'replaceAt',indexNot,note);
					// this.setAllNotes(this.data.allNotes,undefined,true);
				}else{
					this.setData('editingNote',note);
				}
				if(this.data.seperateEditor){
					this.setData('noteEditModeId',currentNoteId);
					return;
				}
			},

			showDeleteConfirmationModal: function(event,currentNoteId, currentNoteTitle, currentNoteContent) {
				if(event.target.classList.contains('cxDisableDeleteBtn') || event.target.parentElement.classList.contains('cxDisableDeleteBtn') || this.checkPermission("delete", currentNoteId) === false) {
					return;
				}

				var deleteConfirmationModal = this.$node.querySelector(".cruxNotes lyte-modal.deleteConfirmationModal"); //NO I18n
				deleteConfirmationModal.ltProp("show", true); //NO I18n
				// this.setData("currentNoteId", currentNoteId); //NO I18n
				this.currentNoteId = currentNoteId;
				this.setData("currentNoteTitle", currentNoteTitle); //NO I18n

				if(currentNoteContent) {
					var regExp = new RegExp("crm[[aA-zZ]*#[0-9]+#[0-9]+]crm","gi"); //No I18n
					currentNoteContent = currentNoteContent.replace("&#x5b;", "["); //No i18n
					currentNoteContent = currentNoteContent.replace("&#x23;", "#"); //No i18n
					currentNoteContent = currentNoteContent.replace("&#x5d;", "]"); //No i18n

					var matches = currentNoteContent.match(regExp);
					var matchesLen = matches ? matches.length : 0;

					for(var j = 0; j < matchesLen; j++) {
						var startPos = matches[j].indexOf("#");
						var endPos = matches[j].lastIndexOf("#");
						var mentionId = matches[j].slice(startPos + 1,endPos);
						var mentionRec;

						if(matches[j].indexOf("user") !== -1) { //No I18n
							mentionRec = store.peekRecord("user", mentionId); //NO I18N
							currentNoteContent = currentNoteContent.replace(matches[j], mentionRec ? mentionRec.full_name+"," : ""); //No I18n
						} else if(matches[j].indexOf("role") !== -1) { //No I18n
							mentionRec = store.peekRecord("role", mentionId); //NO I18N
							currentNoteContent = currentNoteContent.replace(matches[j], mentionRec ? mentionRec.name+"," : mentionRec); //No I18n
						} else if(matches[j].indexOf("group") !== -1) { //No I18n
							mentionRec  = store.peekRecord("user_group", mentionId); //NO I18N
							currentNoteContent = currentNoteContent.replace(matches[j], mentionRec ? mentionRec.name+"," : ""); //No I18n
						}
					}
				}
				deleteConfirmationModal.component.childComp.querySelector('.confirmNoteDeleteButton').focus()
				this.setData("currentNoteContent", currentNoteContent); //NO I18n
			},

			hideDeleteconfirmationModal: function() {
				var deleteConfirmationModal = this.$node.querySelector(".cruxNotes lyte-modal.deleteConfirmationModal"); //NO I18n
				deleteConfirmationModal.ltProp("show", false); //NO I18n
				// this.setData("currentNoteId", ""); //NO I18n
			},

			deleteNote: function() {
				if(this.deleteReqResolved !== undefined && !this.deleteReqResolved) {
					return;
				}
				var deleteConfirmationModal = this.$node.querySelector(".cruxNotes lyte-modal.deleteConfirmationModal"); //NO I18n
				var currentNoteId = this.currentNoteId;

				var noteRec = store.peekRecord("note", currentNoteId); //NO i18n
				if(!noteRec) {
					deleteConfirmationModal.ltProp("show", false); //NO I18n
					_cruxUtils.showCustomAlert({ params : {ltPropPrimaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } })
					return;
				}

				this.deleteReqResolved = false;
				var noteReq
				if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
					noteReq = this.executeMethod('onCustomNoteRequest','destroyRecord',noteRec)
				}else{
					noteReq = noteRec.$.destroyRecord({noteId: currentNoteId});
				}
				noteReq.then(function(res) {
					store.clearCachedQuery('note')
					this.deleteReqResolved = true;
					if(res && ((res.note && res.note[0].status === "success" || res.note[0].status === "error") || (res.data && res.data[0].status === "success" || res.data[0].status === "error"))) { //NO I18n
						var moduleApi = this.moduleApi;
						var cxPropEntity = this.getData("cxPropEntity"); //NO I18N
						deleteConfirmationModal.ltProp("show", false); //NO I18n

						if((res.note && res.note[0].status === "error") || (res.data && res.data[0].status === "error")) {
							_cruxUtils.showCustomAlert({ params : {ltPropPrimaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } })
							return;
						}

						// this.setData("currentNoteId", ""); //NO I18n

						// store.unloadAll("note"); //NO I18N
						// store.findAll("note", this.getData("cxPropQueryParam"), false, true, {"module": moduleApi, "entityId": cxPropEntity.id}).then(function(notesData) { //NO I18n
							var defaultDisplayedNotesCount = this.getData("defaultDisplayedNotesCount"); //NO I18N
							if(defaultDisplayedNotesCount > 0) {
								this.setData("defaultDisplayedNotesCount", defaultDisplayedNotesCount - 1); //NO I18n
							}
							this.data.allNotesCount > 0 && this.setData('allNotesCount',this.data.allNotesCount -1)
							//handles the case when one note is being edited and other one being deleted without closing the currently editing note.
							var editingNoteId = this.editingNoteId;

							Lyte.arrayUtils(this.data.allNotes,'removeAt',this.data.allNotes.cruxFindIndexOfObject('id',noteRec.id))
							Lyte.arrayUtils(this.unModifiedNotes,'removeAt',this.unModifiedNotes.cruxFindIndexOfObject('id',noteRec.id))
							if(editingNoteId) {
								//sets the currentNoteId to editingNoteId as it is required to close the opened textbox
								// this.setData("currentNoteId", editingNoteId); //NO I18n
								this.currentNoteId = editingNoteId;
								this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("instanceNo")).click(); //NO I18N
							}
							// var notesData = store.peekAll('note')
							// // this.processNotes(notesData ? notesData : []);

							// // this.setData("unModifiedNotes", notesData); //NO I18n
							// if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
							// 	notesData = notesData.reverse()
							// }
							// this.unModifiedNotes = notesData;
							// // this.refreshOtherNotesInCurrPage();
							// var unModifiedNotes = this.unModifiedNotes;
							var defaultDisplayedNotesCount = this.getData("defaultDisplayedNotesCount"); //NO I18N

							// Lyte.triggerEvent("noteAddedOrDeleted", {allNotes: unModifiedNotes, defaultDisplayedNotesCount: defaultDisplayedNotesCount}); //NO I18N

							if(editingNoteId) {
								var currentNoteLi = this.$node.querySelector(".cruxNotesList .cx_" + editingNoteId); //NO I18N
								var editIcon = currentNoteLi.querySelector(".editAddedNote"); //NO I18N
								//required for editNote.
								// this.setData("currentNoteId", editingNoteId); //NO I18n
								this.currentNoteId = editingNoteId;
								editIcon.click();
							}

							if(this.getMethods("onNoteDeleted")) {
								/**
								 * This method is invoked when a note is deleted.
								 * @method onNoteDeleted
								 * @author naveen.winson
								 * @version 1.0.0
								 * @param { * } this
								 */
								this.executeMethod("onNoteDeleted",this); //NO I18N
							}
						// }.bind(this));
					}
				}.bind(this),function(error) {
					noteRec.$.rollBack();
					deleteConfirmationModal.ltProp("show", false); //NO I18n
					//cross tab notes  permission disabled
					if(error) {
						var response = JSON.parse(error.response);
						response = response.data ? response.data[0] : response;

						if(error.status === 403 && (response.code === 'CANNOT_PERFORM_ACTION' || (response.code === "NO_PERMISSION" && response.message === "permission denied"))) {
							_cruxUtils.showCustomAlert({ params : {ltPropPrimaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } });
						}
						if(response.message === 'record not deleted' || response.message === 'the relation name given seems to be invalid'){
							_cruxUtils.showCustomMessage({params : {ltPropMessage : _cruxUtils.getI18n('crm.translation.refresh.cases'),ltPropType : 'error'}});
						}
					}



					this.deleteReqResolved = true;
					// this.setData("currentNoteId", ""); //NO I18n
					this.currentNoteId = "";
					this.setData("currentNoteTitle", ""); //NO I18n
					this.setData("currentNoteContent", ""); //NO I18n
					if(this.getMethods('onNotesRequestError')){
							this.executeMethod('onNotesRequestError',res)
						}
				}.bind(this));
			},

			showModuleRecordTooltip: function(show,node,note) {
				var popover = this.$node.querySelector("crux-lookup-view-popup");//no i18n
				if(show){
					node.classList.add('cxLookupBc');
					var moduleName = this.apiModuleMapping[note.$se_module ? note.$se_module : note.Parent_Id.module.api_name];
					var dp = [moduleName,note.Parent_Id.id];
					if(popover){
						popover.setData({entityId : note.Parent_Id.id, cxPropTypeMapping : crmConstants.defaultUiTypeToCruxMapping,module : moduleName,cxPropRouteName : "crm.tab.module.entity",cxPropDynamicParams : dp,lookupComp:node});
					}else{
						popover = Lyte.Component.render("crux-lookup-view-popup", {entityId : note.Parent_Id.id, cxPropTypeMapping : crmConstants.defaultUiTypeToCruxMapping,module : moduleName,lookupComp:node,cxPropRouteName : "crm.tab.module.entity",cxPropDynamicParams : dp}, this.$node);
					}
					popover.setData('show',true);
				}else{
					popover.setData("show", false);//no i18n
				}	
			},

			showMoreNotes: function() {
				var moduleApi = this.moduleApi;
				var cxPropEntity = this.getData("cxPropEntity"); //NO I18n

				if(this.reqPending) {
					return;
				}
				this.batchNo += 1;
				var req = [];
				this.reqPending = true;
				var viewableNotesCount = this.batchNo === 1 ? (this.notesBatchCount * 2) : (this.batchNo * this.notesBatchCount + this.notesBatchCount);
				if(viewableNotesCount+30 >= this.unModifiedNotes.length && this.data.moreNotes){
					var noteReq;
					if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
						noteReq = this.executeMethod('onCustomNoteRequest','findAll','note',Object.assign(this.pageQuery,this.getData("cxPropQueryParam")))
					}else{
						noteReq = store.findAll("note", Object.assign(this.pageQuery,this.getData("cxPropQueryParam")), false, true, {"module": moduleApi, "entityId": cxPropEntity.id})
					}
					req.push(noteReq.then(function(nD){
						this.pageQuery.page = this.pageQuery.page ? this.pageQuery.page+1 : 2;
						this.data.moreNotes = nD.$.meta.more_records;
						return nD;
					}.bind(this)))
				}
				Lyte.resolvePromises(req).then(function(req){
					this.reqPending = false;
					var notesData;
					if(this.getData("cxPropQueryParam")){
						if(req.length){
							Lyte.arrayUtils(this.unModifiedNotes,'push',req[0])
						}
						notesData = this.unModifiedNotes;
					}else{
						notesData = store.peekAll('note');
						notesData = Array.from(notesData);
						if(this.data.cxPropNotesOrder === _cruxUtils.getI18n.apply(undefined, ['crm.note.recent.last'])){
							notesData = notesData.reverse()
						}
						
					}
					var currentNoteId = this.currentNoteId
					if(currentNoteId) {
						//closes the notes textbox when no edit is made
						this.$node.querySelector(".cruxNoteCancelBtn" + this.getData("instanceNo")).click(); //NO I18N
					}
					
					this.processNotes(notesData, true);

					if(currentNoteId) {
						var currentNoteLi = this.$node.querySelector(".cruxNotesList .cx_" + currentNoteId); //NO I18N
						var editIcon = currentNoteLi.querySelector(".editAddedNote"); //NO I18N
						editIcon.click();
					}
				}.bind(this),function(res){
					this.reqPending = false;
					if(this.getMethods('onNotesRequestError')){
						this.executeMethod('onNotesRequestError',res)
					}
				}.bind(this))
			},
			trackSpotLight: function() {
				var moduleApi = this.moduleApi;
				Crm.trackSpotLightAction('Lookup Hover Click', {'Module': moduleApi}); //NO I18n
			},
			showHideCruxNote: function() {
				if((event && event.target.classList.contains("cxNoteCount")) || this.data.cxPropPreventHeaderNotesHide) {
					return;
				}
				var cruxNotes = this.$node.querySelector(".cruxNotes"); //NO I18n
				var cxNoteHeadingSection = this.$node.querySelector(".cxNoteHeadingSection"); //NO I18n
				if(cruxNotes.style.display === "") {
					cruxNotes.style.display = "none"; //NO I18n
					cxNoteHeadingSection.classList.add('cxNoteHeadNoBrdr'); //NO I18n
				} else {
					cruxNotes.style.display = ""; //NO I18n
					cxNoteHeadingSection.classList.remove("cxNoteHeadNoBrdr"); //NO I18n
				}
			},

			openSheetForExport: function(event, crmBasePath, fileId, module, nId, parentId, creatorId, id, name, downLoadMode) {
				if(event) {
					event.preventDefault();
					event.stopPropagation();
				}

				var url = crmBasePath + "/specific/ViewAttachment?fileId=" + fileId + "&module=" + module + "&nId=" + nId + "&parentId=" + parentId + "&creatorId=" + creatorId + "&id=" + id + "&name=" + name + "&downLoadMode=" + downLoadMode; //NO I18N

				//TODO: openSheetForExport method implementation.
				openSheetForExport(url, downLoadMode);

			},

			fireClickEvent: function(event) {
				//fix for image photonavigation issue. cxNotePreviewIcon class is removed from jquery's element selection for colorbox plugin.
				//triggers click event on image wrapper anchor tag to trigger colorbox plugin.
				event.preventDefault();
				event.stopPropagation();
				event.target.parentElement.parentElement.querySelector(".cxNotesAttachImage").click(); //No i18n
			},
			showFullNoteContent: function(noteId) {
				if(this.data.cxPropRichTextFormat){
					var note = store.peekRecord('note',noteId);
					note.showingShortContent = false;
					note.showingLongContent = true;
					if(note.Long_content){
						if(!note.Short_content){
							note.Short_content = note.Note_Content;
						}
						note.Note_Content = note.Long_content;
						var indexNot = this.data.allNotes.cruxFindIndexOfObject('id',noteId);
						Lyte.arrayUtils(this.data.allNotes,'replaceAt',indexNot,note);
						this.setAllNotes(this.data.allNotes,undefined,true);
						var noteNode = this.$node.querySelector(".cruxNotesList .cx_" + noteId);
						if(noteNode){
							var imgNode = noteNode.querySelector('.cxNotesAddedUserImg');
							if(imgNode && !imgNode.cxVisbleInViewPort(this.data.cxPropBoundary)){
								noteNode.scrollIntoView(); 
							}
						}
					}else{
						var noteReq
						if(this.getMethods('onCustomNoteRequest') && this.data.cxPropCustomNoteRequest){
							noteReq = this.executeMethod('onCustomNoteRequest','triggerAction',note,'fetch_full_data',{fields : 'Note_Content'})
						}else{
							noteReq = note.$.triggerAction('fetch_full_data',{apiVersion : 'v7'},{fields : 'Note_Content'})
						}
						noteReq.then(function(res){
							res.data[0].$has_more = {}
							res.data[0].$has_more.Note_Content  = false
							if(!store.peekRecord('note',res.data[0].id).Short_content){
								res.data[0].Short_content = note.Note_Content;
							}
							note = store.pushPayload('note',res.data);
							var indexNot = this.data.allNotes.cruxFindIndexOfObject('id',noteId);
							Lyte.arrayUtils(this.data.allNotes,'replaceAt',indexNot,note);
							this.setAllNotes(Array.from(this.data.allNotes),undefined,true);
							var noteNode = this.$node.querySelector(".cruxNotesList .cx_" + noteId);
							if(noteNode){
								var imgNode = noteNode.querySelector('.cxNotesAddedUserImg');
								if(imgNode && !imgNode.cxVisbleInViewPort(this.data.cxPropBoundary)){
									noteNode.scrollIntoView(); 
								}
							}
						}.bind(this))
					}
				}else{
					var fullContentElem = this.$node.querySelector(".cx_" + noteId + " .notesAddedContent.showFullContent"); //NO I18N
					var showSeeMore = this.$node.querySelector(".cx_" + noteId + " .notesAddedContent.showSeeMore"); //NO I18N
					showSeeMore.style.display = "none"; //NO I18N
					fullContentElem.style.display = "block"; //NO I18N
				}
			},
			showShortNoteContent : function(noteId){
				var note = store.peekRecord('note',noteId);
				note.Long_content = note.Note_Content;
				note.Note_Content = note.Short_content;
				note.showingLongContent = false;
				note.showingShortContent = true;
				var indexNot = this.data.allNotes.cruxFindIndexOfObject('id',noteId);
				Lyte.arrayUtils(this.data.allNotes,'replaceAt',indexNot,note);
				this.setAllNotes(this.data.allNotes,undefined,true);
				var noteNode = this.$node.querySelector(".cruxNotesList .cx_" + noteId);
				if(noteNode){
					var imgNode = noteNode.querySelector('.cxNotesAddedUserImg');
					if(imgNode && !imgNode.cxVisbleInViewPort(this.data.cxPropBoundary)){
						noteNode.scrollIntoView(); 
					}
				}
				

			},
			closeDSInfoPopup: function() {
				this.$node.querySelector(".noteDataStorageLimit").ltProp("show", false); //NO I18N
			},
			playVoiceNote : function(node,id){
				var audioNode = $L('#audio_'+id,this.$node)[0]
				node.classList.contains('icon_pause') ? audioNode.pause() : audioNode.play()
				$L(node).toggleClass('icon_pause');
			},
			downloadVoice : function(note){
				var a = document.createElement("a");
		        a.style = "display: none";
		        this.$node.appendChild(a);
		        a.href = this.data.idVsVoice[note.id];
		        a.click();
		        a.remove();
			},
			openMap : function(note){
				var mapURL;
				if(typeof Crm !== "undefined" && Crm.baiduAvailable!==null&&Crm.baiduAvailable==="true"&&Crm.baiduUrl!==null&&(RebrandLinkUtil.getProperty("DeploymentLocation") === 'China' || Crm.brandName==='skyDesk'))
				{
					mapURL = Crm.baiduUrl+"?location=" + note.Parent_Id.Latitude+','+note.Parent_Id.Longitude+"&coord_type=wgs84&output=html";
				}
				else{
					mapURL = httpprotocol + "maps.google.com/maps?q=" + note.Parent_Id.Latitude+','+note.Parent_Id.Longitude; //NO I18N
				}
			    window.open(mapURL);
			}
		},
		removedAttachments: [],
		checkPermission: function(opName, currentNoteId) {
			var note = store.peekRecord("note", currentNoteId); //NO I18N
			var noteModule = this.getData("noteModule") ? this.getData("noteModule") : {}; //NO I18N
			var permission;
			switch(opName) {
				case "create":
					permission =  note ? note._creatable : noteModule.creatable;
					break;
				case "edit":
					permission =  note ? note._editable : noteModule.editable;
					break;
				case "delete":
					permission =  note ? note._deletable : noteModule.deletable;
					break;
			}
			if(typeof moduleRecordMapping !== undefined && moduleRecordMapping[this.data.cxPropModule] &&moduleRecordMapping[this.data.cxPropModule].access_type === "team_based" ){
				permission = Crm.userDetails.permissions["Crm_Implied_"+(opName == 'delete' ? 'Delete' : (opName == 'create' ? 'Create' : 'Edit'))+"_Notes_"+this.data.cxPropModule] ? true : false;
				if(!permission){
					_cruxUtils.showCustomAlert({ params : {ltPropPrimaryMessage : _cruxUtils.getI18n.apply(undefined, ['crm.security.error']),ltPropWrapperClass:"crmCenterAlert" } });
				}
			}
			if(this.getMethods('getNotesPermisison')){
                 /**
                  * @method getNotesPermisison
                  * @author naveen.winson
                  * @version 1.0.0
                  * @param { * } permission
                  * @param { * } opName
                  * @param { * } note
                  * @param { * } this.data.cxPropEntity
                  * @param { * } this.data.cxPropModule
                  */
				permission = this.executeMethod('getNotesPermisison',permission,opName,note,this.data.cxPropEntity,this.data.cxPropModule) ? true : false;
			}
			return permission
		},
		openNotesTextareaFn : function(currentEntity, module){
			var noteEditor = this.$node.querySelector('crux-note-editor')
			if(noteEditor){
				noteEditor.setData('cxPropEntity',currentEntity ? currentEntity : this.data.cxPropEntity);
				noteEditor.setData('cxPropModule',module ? module : this.data.cxPropModule);
				noteEditor.openNoteArea();
				noteEditor.scrollNoteIntoView();
			}
		}
},{mixins : ['crux-note-util']});

Lyte.Component.registerHelper('cruxNumToStorage', function(number, decimals, isCount) {// NO I18N
	if((!number && number !== 0) || number === "NaN") {
		return "-"; //No i18N
	} else if(isCount) {
		var returnNumber = (number < 0) ? 0 : number;
		return returnNumber + " " + _cruxUtils.getI18n.apply(undefined, ['Records']); //NO I18n
	} else if(number === 0 || number < 0 || number === "0") {
		return '0 Bytes'; //No i18N
	}
	var k = 1024,
	dm = decimals || 2,
	sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], //No I18N
	i = Math.floor(Math.log(number) / Math.log(k));
	var returnVal = parseFloat((number / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

	return returnVal;
});

Lyte.Component.registerHelper('convertToLinks', function(text,cxPropAnchorStyle={}) { // NO I18N
	if(!text){
		return "";
	}
	if(_lyteUiEditor && _lyteUiEditor.url_detection){
		var node = _lyteUiEditor.url_detection(text, { ltPropAnchorStyle : cxPropAnchorStyle, ltPropRelaxedUrlRgx : true });
    	return node.innerHTML;
	}
	return text;
});

Lyte.Component.registerHelper('getNoteZcqa', function(index,notes,cxPropNotesOrder) { // NO I18N
	var a = "cx_note_";
	if(cxPropNotesOrder === _cruxUtils.getI18n('crm.note.recent.first')){
		a+= (index+1);
	}else{
		a+= (notes.length - index);
	}
	return a;
});
