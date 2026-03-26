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

