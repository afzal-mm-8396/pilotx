Lyte.Mixin.register("crux-note-util", {
	convertTextToMentions : async function(notesContent){
		var regExp = new RegExp("crm[[aA-zZ]*#[0-9]*#[0-9]*]crm","gi"); //No I18n
		notesContent = notesContent.replace("&#x5b;", "["); //No i18n
		notesContent = notesContent.replace("&#x23;", "#"); //No i18n
		notesContent = notesContent.replace("&#x5d;", "]"); //No i18n
		actualContent = notesContent.slice();
		

		var matches = notesContent.match(regExp);
		var matchesLen = matches ? matches.length : 0;

		for(var j = 0; j < matchesLen; j++) {
			var startPos = matches[j].indexOf("#");
			var endPos = matches[j].lastIndexOf("#");
			var mentionId = matches[j].slice(startPos + 1,endPos);
			var mentionRec;
			if(matches[j].indexOf("user") !== -1) { //No I18n
				mentionRec = store.peekRecord("user", mentionId) //NO I18N
				if(!mentionRec){
					await store.findRecord('user',mentionId);
					mentionRec = store.peekRecord("user", mentionId) //NO I18N
				}
				mentionName = mentionRec ? mentionRec.full_name : ""; //No I18n

				notesContent = notesContent.replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + $ESAPI.encoder().encodeForHTML(mentionName) + ",</a></span>" : ""); //No I18n
				actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

			} else if(matches[j].indexOf("role") !== -1) { //No I18n
				mentionRec = store.peekRecord("role", mentionId); //No I18n
				if(!mentionRec){
					await store.findRecord('role',mentionId);
					mentionRec = store.peekRecord("role", mentionId) //NO I18N
				}
				mentionName = mentionRec ? mentionRec.name : '';

				notesContent = notesContent.replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + mentionName + ",</a></span>" : ""); //No I18n
				actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

			} else if(matches[j].indexOf("group") !== -1) { //No I18n
				mentionRec = store.peekRecord("user_group", mentionId); //NO I18N
				if(!mentionRec){
					await store.findRecord('user_group',mentionId);
					mentionRec = store.peekRecord("user_group", mentionId) //NO I18N
				}
				mentionName = mentionRec ? mentionRec.name : ""; //NO I18N

				notesContent = notesContent.replaceAll(matches[j], mentionName ? "<span style='color : var(--linkColor);'><a href='javascript:;'>" + mentionName + ",</a></span>" : ""); //No I18n
				actualContent = actualContent.replaceAll(matches[j], mentionName ? mentionName + "," : ""); //NO I18N

			}
		}
		return notesContent;
	},
	getCruxNoteEditorShortcuts : function(){
		if(typeof _lyteUiEditor != 'undefined'){
			var textEditorShortcuts =$L.extend(true, {}, _lyteUiEditor.shortcuts);
			textEditorShortcuts[13].push({value : 'saveNote',ctrl : true});
			delete textEditorShortcuts[9];
			delete textEditorShortcuts[187]; //Preventing subscript and superscript shortcuts.
			delete textEditorShortcuts[75]; //Preventing Insert Link shortcut.
			delete textEditorShortcuts[79]; //Preventing Order List shortcut.
			textEditorShortcuts[85].splice(1, 1); //Preventing UnOrder List shortcut.
			delete textEditorShortcuts[221]; //Preventing textIndentDecrease shortcut.
			delete textEditorShortcuts[219]; //Preventing textIndentIncrease shortcut.
			delete textEditorShortcuts[70]; //Preventing Center align shortcut.
			delete textEditorShortcuts[74]; //Preventing Align Justify shortcut.
			delete textEditorShortcuts[82]; //Preventing Align right shortcut.
			delete textEditorShortcuts[188]; //Preventing font Increase shortcut.
			delete textEditorShortcuts[190]; //Preventing font Decrease shortcut.
			var deleteShortCut = textEditorShortcuts[8];
			var dInd = deleteShortCut.cruxFindIndexOfObject('value', "backspaceLine");
			deleteShortCut[dInd].shift = true;
			var boldShortcut = textEditorShortcuts[66];
			boldShortcut[0].css = 'bold';
			boldShortcut[0].ctrl = true;
			boldShortcut[0].scope = 'Word';
			boldShortcut[0].value = 'fontWeight'; // No I18n
			return textEditorShortcuts;
		}
	},
	getCruxNoteAllowedUnorderedList : function(){
		var allowedUnorderList = ["removeUL", "disc", "circle", "square", "ulDiamond", "ulTick", "ulOutlineStar", "ulRightPointer"]; //No I18n
		var unorderList = typeof _lyteUiEditor == 'undefined' ? [] : _lyteUiEditor.unOrderedList;
		var allowableList = [];
		var unorderListLen = unorderList.length;
		for (var i = 0; i < unorderListLen; i++) {
			var eachListType = unorderList[i];
			if (allowedUnorderList.indexOf(eachListType.conversionName) > -1) {
				allowableList.push(eachListType);
			}
		}
		return allowableList;
	},
	getCruxNoteEditorIcons : function(){
		if(typeof _lyteUiEditor == 'undefined'){
			return ;
		}
		var allowedUnorderList = ["removeUL", "disc", "circle", "square", "ulDiamond", "ulTick", "ulOutlineStar", "ulRightPointer"]; //No I18n
		var textEditorUnorderListDefault;
		var iconsCount = _lyteUiEditor.icons.length;
		var boldTooltip;
		var italicTooltip;
		var underlineTooltip;
		if (navigator.appVersion.indexOf("Mac") !== -1) {
			boldTooltip = _cruxUtils.getI18n("crm.richtext.tool.mac.bold");
			italicTooltip = _cruxUtils.getI18n("crm.richtext.tool.mac.italics");
			underlineTooltip = _cruxUtils.getI18n("crm.richtext.tool.mac.underline");
		} else {
			boldTooltip = _cruxUtils.getI18n("crm.richtext.tool.bold");
			italicTooltip = _cruxUtils.getI18n("crm.richtext.tool.italics");
			underlineTooltip = _cruxUtils.getI18n("crm.richtext.tool.underline");
		}
		var unorderList = _lyteUiEditor.unOrderedList;
		var allowableList = [];
		var unorderListLen = unorderList.length;
		for (var i = 0; i < unorderListLen; i++) {
			var eachListType = unorderList[i];
			if (allowedUnorderList.indexOf(eachListType.conversionName) > -1) {
				allowableList.push(eachListType);
			}
		}
		// For selecting only required icons.
		for (var i = 0; i < iconsCount; i++) {
			var currentObject = _lyteUiEditor.icons[i];
			if (currentObject.class === "lyteUIEditorPanelList") {
				textEditorUnorderListDefault = $L.extend(true, {}, _lyteUiEditor.icons[i]);
				var subIcons = textEditorUnorderListDefault.subIcons;
				var subIconCount = subIcons.length;
				for (var j = 0; j < subIconCount; j++) {
					var subIcon = subIcons[j];
					if (subIcon.name === "Ul") {
						subIcon.title = _cruxUtils.getI18n("crm.richtext.tool.bullet") //No I18n
						subIcon.attr = {'data-zcqa': 'cx_notes_richtext_toolbar_Ul'}
						subIcon.dropdownType = 'toggle';
						subIcon.name = 'ToggleUl';
						var allowedList = [];
						var ulList = subIcon.list;
						var listTypeCount = ulList.length;
						for (var k = 0; k < listTypeCount; k++) {
							var eachType = ulList[k];
							var allListLen = allowableList.length;
							if (allowedUnorderList.indexOf(eachType.name) > -1) {
								for (var l = 0; l < allListLen; l++) {
									if (eachType.name === allowableList[l].conversionName) {
										eachType.selected = l + 1;
									}
								}
								eachType.attr = {'data-zcqa': 'cx_notes_richtext_toolbar_Ul_'+eachType.name}
								allowedList.push(eachType);
							}
						}
						subIcon.default = allowedList[1];
						subIcon.list = allowedList;
					}
					else {
						subIcon.title = _cruxUtils.getI18n("crm.richtext.tool.numbering") //No I18n
						subIcon.attr = {'data-zcqa': 'cx_notes_richtext_toolbar_Ol'}
						subIcon.dropdownType = 'toggle';
						subIcon.name = 'ToggleOl';
						var olList = subIcon.list,arr=[];
						olList.forEach((item)=>{
							item.attr = {'data-zcqa': 'cx_notes_richtext_toolbar_Ol_'+item.name}
							arr.push(item)
						})
						subIcon.default = arr[1];
						subIcon.list = arr;
					}
				}
			}
		}

		var rickTextIcons = [

			{
				class: "Formatting",  //No I18n
				subIcons: [
					{
						type: "switch",    /* type of icon */  //No I18n
						name: "bold",    /* will be set as class to the icon */  //No I18n
						display: 'B',    /* It will be displayed in span */  //No I18n
						functionName: "toggleWordClass",    /* This function of lyte-texteditor will be called */  //No I18n
						arguments: ['fontWeight', 'bold'],    /* Called with given argument */  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_bold'},
						active: false,    /* Indicates active status of icon */
						title: boldTooltip
						// ignore : true  /* wont mark that as active - like table button */
					},
					{
						type: "switch",  //No I18n
						name: "italic",  //No I18n
						display: 'I',  //No I18n
						functionName: "toggleWordClass",  //No I18n
						arguments: ['fontStyle', 'italic'],  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_italic'},
						title: italicTooltip,
						active: false
					},
					{
						type: "switch", //No I18n
						name: "underline",  //No I18n
						display: 'U',  //No I18n
						functionName: "toggleWordClass",  //No I18n
						arguments: ['textDecoration', 'underline'],  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_underline'},
						title: underlineTooltip,
						active: false
					},
					{
						type: "switch",  //No I18n
						name: "strike",  //No I18n
						display: '',
						functionName: "toggleWordClass",  //No I18n
						arguments: ['textDecoration', 'line-through'],  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_strike'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.strikeout"),
						active: false
					}

				]
			},
			{
				class: "colorPickers",  //No I18n
				subIcons: [
					{
						type: "colorpicker",  //No I18n
						name: "color",  //No I18n
						display: "color",  //No I18n
						selected: "rgba(51, 51, 51, 1)",  //No I18n
						functionName: "toggleWordClass",  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_color'},
						arguments: ['color', '{{selected}}'],  //No I18n
						title: _cruxUtils.getI18n("crm.editor.tool.option.fontcolor"),
						active: false
					},
					{
						type: "colorpicker", //No I18n
						name: "bg",  //No I18n
						display: "bg",  //No I18n
						selected: "rgba(255, 255, 255, 1)",  //No I18n
						functionName: "toggleWordClass",  //No I18n
						title: _cruxUtils.getI18n("crm.richtext.tool.fontbg"),
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_bg'},
						arguments: ['backgroundColor', '{{selected}}'],  //No I18n
						active: false
					}

				]
			},
			textEditorUnorderListDefault,

			{
				class: "anchor",  //No I18n
				subIcons: [
					{
						type: "anchor",  //No I18n
						name: "anchor",  //No I18n
						display: "anchor",  //No I18n
						functionName: "toggleWordClass",  //No I18n
						arguments: ['lyteEditorAnchor'],  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_anchor'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.insertLink"),
						active: false
					}
				]
			},
			{
				class: "indentSection",  //No I18n
				subIcons: [
					{
						type: "switch", //No I18n
						name: "textIndentIncrease",  //No I18n
						display: "textIndentIncrease",  //No I18n
						functionName: "textIndentIncrease",  //No I18n
						activeClass: "lyteEditorPanelIconDisabled",  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_textIndentIncrease'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.increaseIndent"),
						arguments: [''],
						ignore: false,
						active: false
					},
					{
						type: "switch",  //No I18n
						name: "textIndentDecrease",  //No I18n
						display: "textIndentDecrease",  //No I18n
						functionName: "textIndentDecrease",  //No I18n
						activeClass: "lyteEditorPanelIconDisabled",  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_textIndentDecrease'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.decreaseIndent"),
						arguments: [''],
						ignore: false,
						active: false
					}
				]
			},
			{
				class: "smiley",  //No I18n
				subIcons: [
					{
						type: "switch",  //No I18n
						name: "sub",  //No I18n
						display: 'sub',  //No I18n
						functionName: "toggleWordClass",  //No I18n
						arguments: ['lyteSubScript'],
						removeClass: ['lyteSuperScript'],
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_sub'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.subscript"),
						active: false
					},
					{
						type: "switch",  //No I18n
						name: "super",  //No I18n
						display: 'super',  //No I18n
						functionName: "toggleWordClass",  //No I18n
						arguments: ['lyteSuperScript'],
						removeClass: ['lyteSubScript'],
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_super'},
						title: _cruxUtils.getI18n("crm.editor.tool.option.superscript"),
						active: false
					}
				]
			},
			{
				class: "smiley",  //No I18n
				subIcons: [
					{
						type: "emoji",  //No I18n
						name: "emoji",  //No I18n
						display: "Emoji",  //No I18n
						title: _cruxUtils.getI18n("crm.richtext.tool.emojis"),
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_emoji'},
						active: false,
						ignore: true,
						input: {
							appearance: "box", //No I18n
							closeIcon: true,
							placeholder: _cruxUtils.getI18n("crm.richtext.tool.search.emoji"),
							type: "search" //No I18n
						},
						noMatchText: _cruxUtils.getI18n("crm.richtext.tool.emoji.noresult")

					}
				]
			},
			{
				class: 'clearformatting',  //No I18n
				subIcons: [
					{
						type: "switch",  //No I18n
						name: "clear",  //No I18n
						display: "",  //No I18n
						functionName: "clearFormat",  //No I18n
						attr: {'data-zcqa': 'cx_notes_richtext_toolbar_clear'},
						title: _cruxUtils.getI18n("crm.richtext.tool.clear.format"),  //No I18n
						arguments: [''],
						action: false
					}
				]
			}
		];
		return rickTextIcons;
	}

});


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

//# sourceMappingURL=crux-note-component.js.map