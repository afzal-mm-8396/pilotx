/**
 * @component lyte-prompt
 * @version 1.0.0
 */
_lyteUiUtils.promptRandomIdCounter = _lyteUiUtils.promptRandomIdCounter || 0;

Lyte.Component.register("lyte-prompt", {
_template:"<template tag-name=\"lyte-prompt\"> <div class=\"lytePromptRoot {{promptRootClass}}\"> <template is=\"if\" value=\"{{ltPropShowSidebar}}\"><template case=\"true\"><div class=\"lytePromptSidebar\"> <div class=\"lytePromptSidebarTitle\">{{ltPropSidebarTitle}}</div> <div class=\"lytePromptSidebarHeader\"> <span class=\"lytePromptSidebarLabel\">{{ltPropHistoryLabel}}</span> <lyte-button class=\"lytePromptChatButton\" onclick=\"{{action('onNewChat')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropChatLabel}} </template> </lyte-button> </div> <div class=\"lytePromptSidebarSearch\"> <lyte-input class=\"lytePromptSidebarSearchInput\" on-value-change=\"{{method('onSidebarSearchChange',event)}}\" lt-prop-appearance=\"box\" lt-prop-placeholder=\"{{ltPropSearchPlaceholder}}\" lt-prop-value=\"{{lbind(ltPropSearchText)}}\"> </lyte-input> </div> <div class=\"lytePromptSidebarSection\">{{ltPropRecentLabel}}</div> <lyte-nav lt-prop-nav-yield=\"true\" lt-prop-arrow=\"false\" lt-prop-alignment=\"vertical\" lt-prop-selected=\"{{lbind(ltPropSelected)}}\" class=\"lytePromptHistoryNav\" onscroll=\"{{action('onRecentScroll',event)}}\" on-item-selected=\"{{method('onRecentItemSelected')}}\"> <template is=\"registerYield\" yield-name=\"nav\"> <template is=\"for\" items=\"{{ltPropRecents}}\" item=\"item\" index=\"index\"> <lyte-nav-item data-value=\"{{item.id}}\" data-index=\"{{index}}\"> <div class=\"lytePromptRecentRow\"> <template is=\"if\" value=\"{{ltPropUseLinkTo}}\"><template case=\"true\"> <link-to lt-prop-route=\"{{item.route}}\" lt-prop-dp=\"{{stringify(item.dp)}}\" class=\"lytePromptHistoryItem\" lt-prop-custom=\"\"> {{item.label}} </link-to> </template><template case=\"false\"> <a class=\"lytePromptHistoryItem lytePromptRecentLink\" href=\"{{item.href}}\"> {{item.label}} </a> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropRecentMenuYield,'||',ltPropRecentMenuActions.length)}}\"><template case=\"true\"><lyte-button class=\"lytePromptRecentMenuButton\" onclick=\"{{action('openRecentMenu',item,index,event)}}\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <circle cx=\"8\" cy=\"3.5\" r=\"1.2\" fill=\"currentColor\"></circle> <circle cx=\"8\" cy=\"8\" r=\"1.2\" fill=\"currentColor\"></circle> <circle cx=\"8\" cy=\"12.5\" r=\"1.2\" fill=\"currentColor\"></circle> </svg> </template> </lyte-button></template></template> </div> </lyte-nav-item> </template> <template is=\"if\" value=\"{{ltPropShowLeftPaneLoader}}\"><template case=\"true\"><lyte-nav-item class=\"lytePromptRecentLoaderItem\"> <div class=\"lytePromptRecentLoaderSkeleton\"> <span class=\"lytePromptRecentLoaderLine\"></span> <span class=\"lytePromptRecentLoaderLine\"></span> <span class=\"lytePromptRecentLoaderLine\"></span> </div> </lyte-nav-item></template></template> </template> </lyte-nav> </div></template></template> <div class=\"lytePromptMain\"> <template is=\"if\" value=\"{{ltPropShowAgentDropdown}}\"><template case=\"true\"><div class=\"lytePromptTopBar\"> <lyte-dropdown class=\"lytePromptAgentDropdown\" lt-prop-selected=\"{{lbind(ltPropSelectedAgent)}}\" on-option-selected=\"{{action('onAgentSelected',event)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropAgents}}\" item=\"agent\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(typeofagent,'===','string')}}\"><template case=\"true\"> <lyte-drop-item data-value=\"{{agent}}\">{{agent}}</lyte-drop-item> </template><template case=\"false\"> <lyte-drop-item data-value=\"{{agent.value}}\">{{agent.label}}</lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div></template></template> <div class=\"lytePromptCanvas\"> <div class=\"lytePromptWelcome {{if(isSelectedChatEmpty,'','lytePromptWelcomeHidden')}}\"> <div class=\"lytePromptWelcomeTitle\">{{ltPropWelcomeTitle}}</div> <div class=\"lytePromptWelcomeMessage\">{{ltPropWelcomeMessage}}</div> </div> <div class=\"lytePromptChatStream {{if(isSelectedChatEmpty,'lytePromptChatStreamHidden','')}}\" onscroll=\"{{action('stopAutoScrolling',event)}}\"></div> <template is=\"if\" value=\"{{showScrollToBottom}}\"><template case=\"true\"><lyte-button class=\"lytePromptScrollBottomButton\" onclick=\"{{action('scrollToBottom')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <path d=\"M8 3v8M4 8l4 4 4-4\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg> </template> </lyte-button></template></template> <div class=\"{{if(ltPropChatLoading,'lytePromptCanvasLoader','')}}\"> <lyte-loader lt-prop-inline=\"true\" lt-prop-close-icon=\"false\" lt-prop-progress-bar=\"{&quot;mode&quot;:&quot;indefinite&quot;}\" lt-prop-timeout=\"10000000\" lt-prop-show=\"{{ltPropChatLoading}}\"> </lyte-loader> </div> <div class=\"lytePromptCard {{if(isFocused,'is-focused','')}} {{if(isDragActive,'is-dragover','')}}\" ondragenter=\"{{action('onDragEnter',event)}}\" ondragover=\"{{action('onDragOver',event)}}\" ondragleave=\"{{action('onDragLeave',event)}}\" ondrop=\"{{action('onDrop',event)}}\"> <template is=\"if\" value=\"{{ltPropAttachments.length}}\"><template case=\"true\"><div class=\"lytePromptAttachmentRow\"> <template is=\"for\" items=\"{{ltPropAttachments}}\" item=\"att\" index=\"index\"> <div class=\"lytePromptAttachment\"> <img class=\"lytePromptAttachmentPreview\" src=\"{{expHandlers(att.thumbnail,'||',att.url)}}\" data-lytecbox-href=\"{{att.url}}\" data-lytecbox-title=\"{{att.name}}\" alt=\"{{att.name}}\"> <lyte-button class=\"lytePromptAttachmentRemove\" onclick=\"{{action('removeAttachment',index,event)}}\"> <template is=\"registerYield\" yield-name=\"text\">x</template> </lyte-button> </div> </template> </div></template></template> <div class=\"lytePromptInputRow\"> <lyte-input lt-prop-text-area-resize=\" { &quot;vertical&quot; : false , &quot;horizontal&quot; : false } \" class=\"lytePromptTextarea\" lt-prop-type=\"textarea\" lt-prop-placeholder=\"{{if(ltPropListening,listeningText,ltPropPlaceholder)}}\" lt-prop-value=\"{{lbind(ltPropValue)}}\" on-focus=\"{{action('onFocus')}}\" on-blur=\"{{action('onBlur')}}\" on-keydown=\"{{action('onKeyDown',event)}}\" oninput=\"{{action('onInput',event)}}\"> </lyte-input> </div> <template is=\"if\" value=\"{{ltPropFooterYield}}\"><template case=\"true\"> <div class=\"lytePromptFooter\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </div> </template><template case=\"false\"> <div class=\"lytePromptFooter\"> <div class=\"lytePromptActionsLeft\"> <lyte-button id=\"{{menuButtonId}}\" class=\"lytePromptIconButton\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <path d=\"M8 2v12M2 8h12\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"></path> </svg> </template> </lyte-button> <lyte-button class=\"lytePromptIconButton\" onclick=\"{{action('onSettings')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <path d=\"M3 4h10M5.5 4v8M3 12h10M10.5 12V4\" stroke=\"currentColor\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"></path> </svg> </template> </lyte-button> <lyte-button class=\"lytePromptCoCreateButton\" onclick=\"{{action('onCoCreate')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropCoCreateLabel}} </template> </lyte-button> </div> <div class=\"lytePromptActionsRight\"> <lyte-button class=\"lytePromptIconButton lytePromptMicButton {{if(ltPropListening,'is-active','')}}\" onclick=\"{{action('toggleListening')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <rect x=\"6\" y=\"3\" width=\"4\" height=\"7\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.4\" fill=\"none\"></rect> <path d=\"M4.5 7.5a3.5 3.5 0 0 0 7 0M8 11.5v2\" stroke=\"currentColor\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"></path> </svg> </template> </lyte-button> <lyte-button class=\"lytePromptSendButton\" onclick=\"{{action('send')}}\"> <template is=\"registerYield\" yield-name=\"text\"> <svg class=\"lytePromptIcon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"> <path d=\"M3 8h8M8 4l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg> </template> </lyte-button> </div> </div> </template></template> <template is=\"if\" value=\"{{isDragActive}}\"><template case=\"true\"><div class=\"lytePromptDropOverlay\"> <div class=\"lytePromptDropText\">{{ltPropDropText}}</div> </div></template></template> </div> </div> </div> </div> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"#{{menuButtonId}}\" on-menu-click=\"{{method('onUploadMenuClick')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"for\" items=\"{{ltPropUploadOptions}}\" item=\"opt\" index=\"index\"> <lyte-menu-item data-value=\"{{opt.value}}\"> <lyte-menu-label>{{opt.label}}</lyte-menu-label> </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> <lyte-menu lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\".lytePromptRecentMenuButton\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <template is=\"if\" value=\"{{ltPropRecentMenuYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"recentMenu\" item=\"{{recentMenuItem}}\" index=\"{{recentMenuIndex}}\"></lyte-yield> </template><template case=\"false\"> <template is=\"for\" items=\"{{ltPropRecentMenuActions}}\" item=\"menuAction\" index=\"index\"> <lyte-menu-item onclick=\"{{action('onRecentMenuAction',menuAction,event)}}\" data-value=\"{{expHandlers(expHandlers(menuAction.value,'||',menuAction.label),'||',menuAction)}}\"> <lyte-menu-label>{{expHandlers(menuAction.label,'||',menuAction)}}</lyte-menu-label> </lyte-menu-item> </template> </template></template> </lyte-menu-body> </template> </lyte-menu> <lyte-colorbox lt-prop=\"{&quot;selectors&quot;: [&quot;.lytePromptAttachmentPreview&quot;, &quot;.lytePromptChatFilePreview&quot;]}\" lt-prop-type=\"image\"></lyte-colorbox> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,1,0]},{"type":"attr","position":[0,3,3]},{"type":"registerYield","position":[0,3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[0,3,3]},{"type":"attr","position":[0,5,1]},{"type":"componentDynamic","position":[0,5,1]},{"type":"text","position":[0,7,0]},{"type":"attr","position":[0,9]},{"type":"registerYield","position":[0,9,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[0,9]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,3,1]},{"type":"text","position":[1,3,3,1,1,0]},{"type":"text","position":[1,3,3,1,3,0]},{"type":"attr","position":[1,3,3,3]},{"type":"attr","position":[1,3,3,5]},{"type":"if","position":[1,3,3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,3,7]},{"type":"attr","position":[1,3,3,7,1]},{"type":"componentDynamic","position":[1,3,3,7,1]},{"type":"attr","position":[1,3,3,9]},{"type":"attr","position":[1,3,3,9,1]},{"type":"if","position":[1,3,3,9,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3]}]}]}},"default":{}},{"type":"attr","position":[1,3,3,9,3,1]},{"type":"componentDynamic","position":[1,3,3,9,3,1]},{"type":"attr","position":[1,3,3,9,5]},{"type":"if","position":[1,3,3,9,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"registerYield","position":[1,1,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"registerYield","position":[1,1,5,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[1,1,5]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"registerYield","position":[1,3,3,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,3,3]}]}},"default":{}},{"type":"attr","position":[1,3,3,9,7]},{"type":"if","position":[1,3,3,9,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]},{"type":"componentDynamic","position":[7]}],
_observedAttributes :["ltPropPlaceholder","ltPropValue","ltPropListening","ltPropAgents","ltPropSelectedAgent","ltPropChats","ltPropChatLoading","ltPropEnableTypewriter","ltPropTypewriterRate","ltPropRecents","ltPropSelected","ltPropShowSidebar","ltPropShowAgentDropdown","ltPropUploadOptions","ltPropAttachments","ltPropWorkerBasePath","ltPropWorkletBasePath","ltPropSidebarTitle","ltPropHistoryLabel","ltPropRecentLabel","ltPropChatLabel","ltPropWelcomeTitle","ltPropWelcomeMessage","ltPropSearchPlaceholder","ltPropCoCreateLabel","ltPropDropText","ltPropUseLinkTo","ltPropRecentMenuActions","ltPropRecentMenuYield","ltPropFooterYield","ltPropShowLeftPaneLoader","listeningText","ltPropSearchText","isFocused","isDragActive","isSelectedChatEmpty","promptId","promptRootClass","menuButtonId","uploadOptions","recentMenuItem","recentMenuIndex","isMicTransitioning","showScrollToBottom","colorboxProp"],
_observedAttributesType :["string","string","boolean","array","string","array","boolean","boolean","number","array","string","boolean","boolean","array","array","string","string","string","string","string","string","string","string","string","string","string","boolean","array","boolean","boolean","boolean","string","string","boolean","boolean","boolean","number","string","string","array","object","number","boolean","boolean","object"],

    data: function() {
        var promptId = _lyteUiUtils.promptRandomIdCounter++;
        var promptRootClass = "lytePromptRoot-" + promptId;
        return {
            ltPropPlaceholder: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.placeholder"), input: true }),
            ltPropValue: Lyte.attr("string", { default: "", input: true }),
            ltPropListening: Lyte.attr("boolean", { default: false, input: true }),
            ltPropAgents: Lyte.attr("array", { default: [], input: true }),
            ltPropSelectedAgent: Lyte.attr("string", { default: "", input: true }),
            ltPropChats: Lyte.attr("array", { default: [], input: true }),
            ltPropChatLoading: Lyte.attr("boolean", { default: false, input: true }),
            ltPropEnableTypewriter: Lyte.attr("boolean", { default: true, input: true }),
            ltPropTypewriterRate: Lyte.attr("number", { default: 10, input: true }),
            ltPropRecents: Lyte.attr("array", { default: [], input: true }),
            ltPropSelected: Lyte.attr("string", { default: "", input: true }),
            ltPropShowSidebar: Lyte.attr("boolean", { default: true, input: true }),
            ltPropShowAgentDropdown: Lyte.attr("boolean", { default: true, input: true }),
            ltPropUploadOptions: Lyte.attr("array", { default: [], input: true }),
            ltPropAttachments: Lyte.attr("array", { default: [], input: true }),
            ltPropWorkerBasePath: Lyte.attr("string", { default: "", input: true }),
            ltPropWorkletBasePath: Lyte.attr("string", { default: "", input: true }),
            ltPropSidebarTitle: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.ask.anything"), input: true }),
            ltPropHistoryLabel: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.history"), input: true }),
            ltPropRecentLabel: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.recent"), input: true }),
            ltPropChatLabel: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.chat"), input: true }),
            ltPropWelcomeTitle: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.welcome"), input: true }),
            ltPropWelcomeMessage: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.welcome.message"), input: true }),
            ltPropSearchPlaceholder: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.search"), input: true }),
            ltPropCoCreateLabel: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.co.create"), input: true }),
            ltPropDropText: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.drop.files"), input: true }),
            ltPropUseLinkTo: Lyte.attr("boolean", { default: true, input: true }),
            ltPropRecentMenuActions: Lyte.attr("array", { default: [], input: true }),
            ltPropRecentMenuYield: Lyte.attr("boolean", { default: false, input: true }),
            ltPropFooterYield: Lyte.attr("boolean", { default: false, input: true }),
            ltPropShowLeftPaneLoader: Lyte.attr("boolean", { default: false, input: true }),

            listeningText: Lyte.attr("string", { default: _lyteUiUtils.i18n("lyte.prompt.listening") }),
            ltPropSearchText: Lyte.attr("string", { default: "" }),
            isFocused: Lyte.attr("boolean", { default: false }),
            isDragActive: Lyte.attr("boolean", { default: false }),
            isSelectedChatEmpty: Lyte.attr("boolean", { default: true }),

            promptId: Lyte.attr("number", { default: promptId }),
            promptRootClass: Lyte.attr("string", { default: promptRootClass }),
            menuButtonId: Lyte.attr("string", { default: "lytePromptMenuBtn-" + promptId }),
            uploadOptions: Lyte.attr("array", { default: [] }),
            recentMenuItem: Lyte.attr("object", { default: null }),
            recentMenuIndex: Lyte.attr("number", { default: -1 }),
            isMicTransitioning: Lyte.attr("boolean", { default: false }),
            showScrollToBottom: Lyte.attr("boolean", { default: false }),
            colorboxProp: Lyte.attr("object", {
                default: {
                    selectors: [
                        "." + promptRootClass + " .lytePromptAttachmentPreview",
                        "." + promptRootClass + " .lytePromptChatFilePreview"
                    ],
                    animation: "slide"
                }
            })
        };
    },

    _buildAttachmentsFromFiles: function(files) {
        if (!files || !files.length) {
            return [];
        }
        var list = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file || !file.type || file.type.indexOf("image/") !== 0) {
                continue;
            }
            var objectUrl = URL.createObjectURL(file);
            list.push({
                name: file.name,
                type: file.type,
                size: file.size,
                url: objectUrl,
                thumbnail: objectUrl,
                file: file,
                __isObjectUrl: true
            });
        }
        return list;
    },

    _appendAttachments: function(newAttachments) {
        if (!newAttachments || !newAttachments.length) {
            return;
        }
        var list = (this.data.ltPropAttachments || []).slice();
        list = list.concat(newAttachments);
        this.setData("ltPropAttachments", list);
    },

    removeAttachments: function() {
        var attachments = this.data.ltPropAttachments || [];
        var i;

        if (!attachments.length) {
            return;
        }

        for (i = 0; i < attachments.length; i++) {
            this._revokeAttachmentUrl(attachments[i]);
        }

        this.setData("ltPropAttachments", []);
        this.reinitColorbox();
    },

    _revokeAttachmentUrl: function(attachment) {
        if (attachment && attachment.__isObjectUrl && attachment.url) {
            try {
                URL.revokeObjectURL(attachment.url);
            } catch (e) {
                // ignore revoke failures
            }
        }
    },

    _isImageFile: function(file) {
        var type = file && file.type ? String(file.type).toLowerCase() : "";
        var candidate;

        if (type.indexOf("image/") === 0) {
            return true;
        }

        candidate = (
            (file && file.url) ||
            (file && file.thumbnail) ||
            (file && file.name) ||
            ""
        ).toLowerCase();

        return /\.(avif|bmp|gif|ico|jpe?g|png|svg|webp)(\?|#|$)/.test(candidate);
    },

    _buildChatFilesNode: function(chat, owner, index) {
        var files;
        var container;
        var i;

        if (owner !== "user") {
            return null;
        }

        files = this._getFilesForChatRender(chat, index, owner);
        if (!files.length) {
            return null;
        }

        container = document.createElement("div");
        container.className = "lytePromptChatFiles";

        for (i = 0; i < files.length; i++) {
            var file = files[i];
            var item = document.createElement("div");
            var isImage = file && (file.isImage || this._isImageFile(file));

            item.className = "lytePromptChatFile";

            if (file.isLoading) {
                item.className += " is-loading";

                var loadingNode = document.createElement("span");
                loadingNode.className = "lytePromptChatFileLoader";
                loadingNode.setAttribute("aria-hidden", "true");
                item.appendChild(loadingNode);
            } else if (isImage && (file.url || file.thumbnail)) {
                var image = document.createElement("img");
                var imageSrc = file.thumbnail || file.url;

                image.className = "lytePromptChatFilePreview";
                image.src = imageSrc;
                image.alt = file.name || "Attachment";
                image.setAttribute("data-lytecbox-href", file.url || imageSrc);
                image.setAttribute("data-lytecbox-title", file.name || "Attachment");
                item.appendChild(image);
            } else {
                var fileNode;

                if (file.url) {
                    fileNode = document.createElement("a");
                    fileNode.href = file.url;
                    fileNode.target = "_blank";
                    fileNode.rel = "noopener noreferrer";
                } else {
                    fileNode = document.createElement("span");
                }

                fileNode.className = "lytePromptChatFileLink";
                fileNode.textContent = file.name || "File";
                item.appendChild(fileNode);
            }

            container.appendChild(item);
        }

        return container;
    },

    _callMethod: function(methodName, args) {
        if (this.getMethods(methodName)) {
            this.executeMethod.apply(this, [methodName].concat(args || []));
        }
        if (this.data[methodName] && typeof this.data[methodName] === "function") {
            this.data[methodName].apply(this, args || []);
        }
    },

    _callMethodWithReturn: function(methodName, args) {
        var response;

        if (this.getMethods(methodName)) {
            response = this.executeMethod.apply(this, [methodName].concat(args || []));
        }
        if (this.data[methodName] && typeof this.data[methodName] === "function") {
            response = this.data[methodName].apply(this, args || []);
        }

        return response;
    },

    _clearPendingUploadState: function() {
        this._pendingComposerFilesQueue = [];
        this._pendingUploadChatKeys = [];
        this._pendingChatFilesByKey = {};
    },

    _queuePendingFilesFromComposer: function(attachments) {
        var list = [];
        var i;

        if (!Array.isArray(attachments) || !attachments.length) {
            return;
        }

        for (i = 0; i < attachments.length; i++) {
            var attachment = attachments[i];

            if (!attachment) {
                continue;
            }

            list.push({
                name: attachment.name || attachment.fileName || "Attachment",
                type: attachment.type || "",
                isImage: true,
                isLoading: true
            });
        }

        if (list.length) {
            this._pendingComposerFilesQueue.push(list);
        }
    },

    _consumePendingFilesForInsertedChat: function(chat, index) {
        var owner = this._getChatOwner(chat);
        var key;
        var directFiles;
        var pendingFiles;
        var pendingKeyIndex;

        if (owner !== "user") {
            return;
        }

        key = this._getChatKey(chat, index);
        directFiles = Array.isArray(chat && chat.files) ? chat.files : [];

        if (directFiles.length) {
            if (this._pendingComposerFilesQueue.length) {
                this._pendingComposerFilesQueue.shift();
            }

            delete this._pendingChatFilesByKey[key];
            pendingKeyIndex = this._pendingUploadChatKeys.indexOf(key);
            if (pendingKeyIndex !== -1) {
                this._pendingUploadChatKeys.splice(pendingKeyIndex, 1);
            }
            return;
        }

        if (!this._pendingComposerFilesQueue.length) {
            return;
        }

        pendingFiles = this._pendingComposerFilesQueue.shift();
        this._pendingChatFilesByKey[key] = pendingFiles;

        if (this._pendingUploadChatKeys.indexOf(key) === -1) {
            this._pendingUploadChatKeys.push(key);
        }
    },

    _getFilesForChatRender: function(chat, index, owner) {
        var directFiles;
        var key;

        if (owner !== "user") {
            return [];
        }

        directFiles = Array.isArray(chat && chat.files) ? chat.files : [];
        if (directFiles.length) {
            return directFiles;
        }

        key = this._getChatKey(chat, index);
        return this._pendingChatFilesByKey[key] || [];
    },

    _findChatRowByKey: function(chatKey) {
        var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");
        var rows;
        var i;
        var keyString = String(chatKey);

        if (!streamNode) {
            return null;
        }

        rows = streamNode.querySelectorAll(".lytePromptChatItem[data-chat-key]");

        for (i = 0; i < rows.length; i++) {
            if (rows[i].getAttribute("data-chat-key") === keyString) {
                return rows[i];
            }
        }

        return null;
    },

    _findChatIndexByIdentity: function(chat) {
        var chats = this.data.ltPropChats || [];
        var i;

        if (!chat || !chats.length) {
            return -1;
        }

        for (i = 0; i < chats.length; i++) {
            if (chats[i] === chat) {
                return i;
            }
        }

        return -1;
    },

    _resolveChatKeyForFileUpdate: function(chat) {
        var index;

        if (!chat) {
            return null;
        }

        if (chat.id != null) {
            return String(chat.id);
        }

        index = this._findChatIndexByIdentity(chat);
        if (index !== -1) {
            return this._getChatKey(chat, index);
        }

        return null;
    },

    _updateRenderedChatFiles: function(chatKey) {
        var row = this._findChatRowByKey(chatKey);
        var bubble;
        var messageNode;
        var existingFilesNode;
        var filesNode;
        var files = this._pendingChatFilesByKey[chatKey];

        if (!row) {
            return;
        }

        bubble = row.querySelector(".lytePromptChatBubble");
        messageNode = row.querySelector(".lytePromptChatMessage");

        if (!bubble || !messageNode) {
            return;
        }

        existingFilesNode = bubble.querySelector(".lytePromptChatFiles");
        if (existingFilesNode) {
            existingFilesNode.remove();
        }

        if (!Array.isArray(files) || !files.length) {
            this.reinitColorbox();
            return;
        }

        filesNode = this._buildChatFilesNode({ files: files }, "user", 0);
        if (filesNode) {
            bubble.insertBefore(filesNode, messageNode);
        }

        this.reinitColorbox();
    },

    addImagesToChat: function(chat, newFiles) {
        var chatKey;
        var pendingKeyIndex;
        var filesToAdd;

        // Backward compatibility: addImagesToChat(files)
        if (Array.isArray(chat) && newFiles === undefined) {
            newFiles = chat;
            chat = null;
        }

        filesToAdd = Array.isArray(newFiles) ? newFiles : [];

        if (!this._pendingUploadChatKeys.length) {
            return;
        }

        chatKey = this._resolveChatKeyForFileUpdate(chat);
        if (!chatKey) {
            chatKey = this._pendingUploadChatKeys[0];
        }

        if (!chatKey) {
            return;
        }

        pendingKeyIndex = this._pendingUploadChatKeys.indexOf(chatKey);
        if (pendingKeyIndex !== -1) {
            this._pendingUploadChatKeys.splice(pendingKeyIndex, 1);
        }

        if (!filesToAdd.length) {
            delete this._pendingChatFilesByKey[chatKey];
        } else {
            this._pendingChatFilesByKey[chatKey] = filesToAdd;
        }

        this._updateRenderedChatFiles(chatKey);
    },

    onChatsChange: function( changesMade ) {
        var type = changesMade.type;

        if( type === 'array' && changesMade.insertedItems ) {
            this.renderIndividualItem( changesMade.insertedItems[ 0 ] );
        }
        else {
            this.renderEntireChat();
        }
        
    }.observes("ltPropChats.[]", "ltPropChats"),

    onRecentsChange: function() {
        var recents = this.data.ltPropRecents || [];
        var currentLength = recents.length;
        var previousLength = this._recentItemsLength || 0;

        if (currentLength !== previousLength) {
            this._isRecentScrollEndPending = false;
            if (this.data.ltPropShowLeftPaneLoader) {
                this.setData("ltPropShowLeftPaneLoader", false);
            }
        }

        this._recentItemsLength = currentLength;
    }.observes("ltPropRecents.[]", "ltPropRecents"),

    onSelectedChange: function() {
        this.setData("isSelectedChatEmpty", this._isSelectedChatEmpty());
    }.observes("ltPropSelected"),

    reinitColorbox: function() {
        var colorbox = this.$node.querySelector( 'lyte-colorbox' );

        colorbox.reinitialize();
    },

    didConnect: function() {
        this._renderedChatKeys = {};
        this.jsScroll = false;
        this.preventScrolling = false;
        this._isRecentScrollEndPending = false;
        this._recentItemsLength = (this.data.ltPropRecents || []).length;
        this._clearPendingUploadState();
        this.$node.addImagesToChat = this.addImagesToChat.bind(this);
        this.setData("isSelectedChatEmpty", this._isSelectedChatEmpty());
        this.renderEntireChat();
    },

    _isSelectedChatEmpty: function() {
        var selected = this.data.ltPropSelected;

        return selected === "" || selected === null || selected === undefined;
    },

    _selectFirstRecentInNav: function() {
        var recents = this.data.ltPropRecents || [];
        var firstRecent = recents[0];
        var selectedValue;
        var navNode;

        if (!firstRecent || firstRecent.id === undefined || firstRecent.id === null) {
            return;
        }

        selectedValue = firstRecent.id;
        this.setData("ltPropSelected", selectedValue);
        this.setData("isSelectedChatEmpty", false);

        navNode = this.$node && this.$node.querySelector("lyte-nav");
        if (navNode) {
            navNode.ltProp("selected", selectedValue);
        }
    },

    _triggerSendFlow: function() {
        var value = this.data.ltPropValue;
        var attachments = this.data.ltPropAttachments || [];
        var hasContent = !!(value && String(value).trim().length);
        var hasAttachments = !!attachments.length;
        var creationPromise;
        var that = this;

        if (!hasContent && !hasAttachments) {
            return;
        }

        var fireOnSend = function() {
            that._callMethod("onSend", [value, attachments]);
            that.$node.querySelector( '.lytePromptTextarea' ).ltProp( 'value', '' );
            that.removeAttachments();
        };

        if (this._isSelectedChatEmpty()) {
            creationPromise = this._callMethodWithReturn("onNewChat", [value, attachments]);

            if (creationPromise && typeof creationPromise.then === "function") {
                creationPromise.then(function() {
                    that._selectFirstRecentInNav();
                    fireOnSend();
                });
                return;
            }
        }

        fireOnSend();
    },

    _shouldTriggerRecentScrollEnd: function() {
        var hasMethod = this.getMethods("onScrollEnd");
        var hasDirectFn = this.data.onScrollEnd && typeof this.data.onScrollEnd === "function";

        return hasMethod || hasDirectFn;
    },

    _triggerRecentScrollEnd: function(event) {
        if (this._isRecentScrollEndPending || !this._shouldTriggerRecentScrollEnd()) {
            return;
        }

        this._isRecentScrollEndPending = true;
        this._callMethod("onScrollEnd", [event, (this.data.ltPropRecents || []).length]);
    },

    _renderChatRange: function(chats, startIndex, endIndex) {
        var fragment = document.createDocumentFragment();
        var i;

        for (i = startIndex; i < endIndex; i++) {
            var entry = this.buildChatNode(chats[i], i, false);
            fragment.appendChild(entry.row);
        }

        return fragment;
    },

    renderEntireChat: function() {
        var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");
        var chats = this.data.ltPropChats || [];
        var fragment;

        if (!streamNode) {
            return;
        }

        fragment = this._renderChatRange(chats, 0, chats.length);

        streamNode.innerHTML = "";
        streamNode.appendChild(fragment);
        this.reinitColorbox();

        this.jsScroll = true;
        streamNode.scrollTop = streamNode.scrollHeight;
        this._updateScrollToBottomVisibility(streamNode);
    },

    renderIndividualItem: function( itemGettingInserted ) {
        var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");
        var chatIndex;

        if (!streamNode) {
            return;
        }

        chatIndex = this.data.ltPropChats.length - 1;
        var chatOwner = this._getChatOwner( itemGettingInserted );
        var shouldTypewrite = chatOwner === 'agent';

        this._consumePendingFilesForInsertedChat(itemGettingInserted, chatIndex);

        if( shouldTypewrite ) {
            var entry = this.buildChatNode( itemGettingInserted, chatIndex, shouldTypewrite, this.getAddedRow() );
            this.reinitColorbox();
            this._runTypewriter(entry);
        }
        else {
            var entry = this.buildChatNode( itemGettingInserted, chatIndex, shouldTypewrite );
            streamNode.appendChild(entry.row);
            this.reinitColorbox();
            var row = this.buildPlaceholder( itemGettingInserted );
            streamNode.appendChild( row );
            this.addHeightForPlaceHolderRow( entry.row, row );
            this.scrollQuestionToTop( entry, streamNode );
            this._updateScrollToBottomVisibility(streamNode);
        }
    },

    addHeightForPlaceHolderRow: function( previousRow, placeHolderRow ) {
        var topPaddingForQuestionToBeScrolledToTheTop = 20,
        previousRowStartPosition = topPaddingForQuestionToBeScrolledToTheTop,
        previousRowHeight = previousRow.offsetHeight || 0,
        bottomOfPreviousRow = previousRowStartPosition + previousRowHeight,
        heightOfChatWindow = this.$node.querySelector(".lytePromptChatStream").offsetHeight,
        bottomPaddingForPlaceHolder = 20,
        heightOfPlaceHolder = heightOfChatWindow - bottomOfPreviousRow - bottomPaddingForPlaceHolder;

        placeHolderRow.style.minHeight = heightOfPlaceHolder + 'px';
    },

    getAddedRow: function() {
        var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");
        
        return streamNode && streamNode.querySelector(".lytePlaceHolderRow");
    },

    buildPlaceholder: function( chat ) {
        var row = document.createElement("div");

        row.className = "lytePromptChatItem lytePlaceHolderRow";

        return row;
    },

    buildChatNode: function(chat, index, shouldTypewrite, addedRow) {
        var row = addedRow || document.createElement("div");
        var bubble = document.createElement("div");
        var messageNode = document.createElement("div");
        var filesNode;
        var owner = this._getChatOwner(chat);
        var chatKey = this._getChatKey(chat, index);
        var content = chat && chat.content != null ? String(chat.content) : "";
        var htmlSnippet = this._renderMarkdownContent(content, chat);

        row.className = "lytePromptChatItem " + (owner === "user" ? "is-user" : "is-agent");
        row.setAttribute("data-chat-key", chatKey);
        if (chat && chat.id != null) {
            row.setAttribute("data-chat-id", String(chat.id));
        }

        bubble.className = "lytePromptChatBubble";
        messageNode.className = "lytePromptChatMessage";

        filesNode = this._buildChatFilesNode(chat, owner, index);
        if (filesNode) {
            bubble.appendChild(filesNode);
        }

        if (!shouldTypewrite) {
            messageNode.innerHTML = htmlSnippet;
        } else {
            messageNode.innerHTML = "";
        }

        bubble.appendChild(messageNode);
        row.appendChild(bubble);
        return {
            row: row,
            bubble: bubble,
            messageNode: messageNode,
            chatKey: chatKey,
            chat: chat,
            index: index,
            owner: owner,
            htmlSnippet: htmlSnippet
        };
    },

    _getChatOwner: function(chat) {
        return (chat && chat.owner ? String(chat.owner) : "agent").toLowerCase();
    },

    _getChatKey: function(chat, index) {
        if (chat && chat.id != null) {
            return String(chat.id);
        }
        return "index-" + index;
    },

    _renderMarkdownContent: function(content, chat) {
        if ($L && typeof $L.markdown === "function") {
            try {
                return $L.markdown(content, { type: "domstring" }) || "";
            } catch (error) {
                this._callMethod("onChatRenderError", [error, chat]);
                return content;
            }
        }
        return content;
    },

    _findPreviousUserRow: function(row) {
        var prev = row && row.previousElementSibling;

        while (prev) {
            if (prev.classList && prev.classList.contains("is-user")) {
                return prev;
            }
            prev = prev.previousElementSibling;
        }

        return null;
    },

    scrollQuestionToTop: function(entry, streamNode) {
        if (!entry || !entry.row || !streamNode) {
            return;
        }

        this.preventScrolling = false;
        this.jsScroll = true;
        $L( streamNode ).scrollTo( { top: entry.row.offsetTop - 20 }, { duration: 1000 } );
        this._updateScrollToBottomVisibility(streamNode);
    },

    _followTypingResponse: function(entry, streamNode) {
        var viewportBottom;
        var responseBottom;
        var nextScrollTop;

        if (!entry || !entry.row || !streamNode) {
            return;
        }

        if (this.preventScrolling) {
            this._updateScrollToBottomVisibility(streamNode);
            return;
        }

        viewportBottom = streamNode.scrollTop + streamNode.clientHeight;
        responseBottom = entry.row.offsetTop + entry.row.offsetHeight;

        if (responseBottom > viewportBottom) {
            nextScrollTop = responseBottom - streamNode.clientHeight;
            this.jsScroll = true;
            streamNode.scrollTop = Math.max(0, nextScrollTop);
        }

        this._updateScrollToBottomVisibility(streamNode);
    },

    _isNearBottom: function(streamNode) {
        if (!streamNode) {
            return true;
        }

        if( this.isTypeWriterEnabled ) {
            return false;
        }

        return (streamNode.scrollHeight - (streamNode.scrollTop + streamNode.clientHeight)) <= 24;
    },

    _updateScrollToBottomVisibility: function(streamNode) {
        this.setData("showScrollToBottom", !this._isNearBottom(streamNode));
    },

    _scrollChatToBottom: function(streamNode) {
        if (!streamNode) {
            return;
        }

        this.preventScrolling = false;
        this.jsScroll = true;
        $L( streamNode ).scrollTo( { top: streamNode.scrollHeight }, { duration: 1000 } );
        this._updateScrollToBottomVisibility(streamNode);
    },

    _runTypewriter: function(entry) {
        var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");

        if (!entry || !entry.messageNode) {
            return;
        }

        if (!$L || !$L.typeWriter || typeof $L.typeWriter.enable !== "function") {
            entry.messageNode.innerHTML = entry.htmlSnippet;
            this._followTypingResponse(entry, streamNode);
            return;
        }

        var that = this;

        that.preventScrolling = false;
        this.isTypeWriterEnabled = true;

        $L.typeWriter.enable({
            container: entry.messageNode,
            type: "html",
            rate: this.data.ltPropTypewriterRate || 10,
            htmlSnippet: entry.htmlSnippet,
            onTyped: function() {
                that._followTypingResponse(entry, streamNode);
            }
        }).then(function() {
            that._followTypingResponse(entry, streamNode);
            that.preventScrolling = false;
        }).catch(function() {
            entry.messageNode.innerHTML = entry.htmlSnippet;
            that._followTypingResponse(entry, streamNode);
        });
    },

    didDestroy: function() {
        if (this.$node && this.$node.addImagesToChat) {
            delete this.$node.addImagesToChat;
        }
        this._clearPendingUploadState();

        if (this.data.ltPropListening && $L && $L.media && typeof $L.media.stop === "function") {
            try {
                $L.media.stop();
            } catch (e) {
                // ignore stop errors on destroy
            }
        }
    },


    actions: {
        onInput: function(event) {
            this._callMethod("onInput", [event, this.data.ltPropValue]);
        },

        onRecentScroll: function(event) {
            var listNode = event && event.target;
            var remainingDistance;

            if (!listNode) {
                return;
            }

            remainingDistance = listNode.scrollHeight - (listNode.scrollTop + listNode.clientHeight);

            if (remainingDistance <= 24) {
                this._triggerRecentScrollEnd(event);
            }
        },

        stopAutoScrolling: function( event ) {
            var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");

            if (!streamNode) {
                return;
            }

            if( this.jsScroll ) {
                this.jsScroll = false;
                this._updateScrollToBottomVisibility(streamNode);

                return ;
            }

            this.isTypeWriterEnabled = false;
            this.preventScrolling = true;
            this._updateScrollToBottomVisibility(streamNode);

        },

        scrollToBottom: function() {
            var streamNode = this.$node && this.$node.querySelector(".lytePromptChatStream");

            this._scrollChatToBottom(streamNode);

        },

        onKeyDown: function(event) {
            if (!event) {
                return;
            }
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                this._triggerSendFlow();
            }
        },

        onFocus: function() {
            this.setData("isFocused", true);
            this._callMethod("onFocus", []);
        },

        onBlur: function() {
            this.setData("isFocused", false);
            this._callMethod("onBlur", []);
        },

        toggleListening: async function() {
            var self = this;

            if (this.data.isMicTransitioning) {
                return;
            }

            if (this.data.ltPropListening) {
                $L.media.stop();
                return;
            }

            this.setData("isMicTransitioning", true);

            await $L.media.record({
                workletBasePath: this.data.ltPropWorkletBasePath || "",
                workerBasePath: this.data.ltPropWorkerBasePath || "",
                onStop: function(blob, sampleData) {
                    self.setData("ltPropListening", false);
                    self._callMethod("onAudioStop", [blob, sampleData]);
                }
            });

            this.setData("ltPropListening", true);
            
            this.setData("isMicTransitioning", false);
        },

        send: function() {
            this._queuePendingFilesFromComposer(this.data.ltPropAttachments);
            this._triggerSendFlow();
        },

        removeAttachment: function(index, event) {
            if (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
            }
            var list = (this.data.ltPropAttachments || []).slice();
            if (index < 0 || index >= list.length) {
                return;
            }
            var removed = list.splice(index, 1)[0];
            this._revokeAttachmentUrl(removed);
            this.setData("ltPropAttachments", list);
        },

        onUploadSelect: function(option) {
            this._callMethod("onUploadSelect", [option]);
        },

        onAgentSelected: function(event) {
            this._callMethod("onAgentChange", [this.data.ltPropSelectedAgent, event]);
        },

        onNewChat: function() {
            var that = this;
            var creationPromise = this._callMethodWithReturn("onNewChat", []);

            if (creationPromise && typeof creationPromise.then === "function") {
                creationPromise.then(function() {
                    that._selectFirstRecentInNav();
                });
                return;
            }

            this._selectFirstRecentInNav();
        },

        onCoCreate: function() {
            this._callMethod("onCoCreate", []);
        },

        onSettings: function() {
            this._callMethod("onSettings", []);
        },

        openRecentMenu: function(item, index, event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            this.setData("recentMenuItem", item);
            this.setData("recentMenuIndex", index);
            this._callMethod("onRecentMenuOpen", [item, index]);
        },

        onRecentMenuAction: function(action, event) {
            var item = this.data.recentMenuItem;
            var index = this.data.recentMenuIndex;
            this._callMethod("onRecentMenuAction", [action, item, index, event]);
        },

        onDragEnter: function(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            this.setData("isDragActive", true);
        },

        onDragOver: function(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            if (!this.data.isDragActive) {
                this.setData("isDragActive", true);
            }
        },

        onDragLeave: function(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            this.setData("isDragActive", false);
        },

        onDrop: function(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            this.setData("isDragActive", false);
            var files = event && event.dataTransfer ? event.dataTransfer.files : null;
            var newAttachments = this._buildAttachmentsFromFiles(files);
            this._appendAttachments(newAttachments);
            this.reinitColorbox();
            this._callMethod("onFilesDrop", [event, newAttachments]);
        }
    },

    methods: {
        onUploadMenuClick: function(value) {
            var options = this.data.ltPropUploadOptions || [];
            var selectedOption = null;
            var i;

            for (i = 0; i < options.length; i++) {
                if (String(options[i].value) === String(value)) {
                    selectedOption = options[i];
                    break;
                }
            }

            this._callMethod("onUploadSelect", [selectedOption]);
        },

        onSidebarSearchChange: function() {
            var input = this.$node.querySelector( '.lytePromptSidebarSearchInput' ),
            value = input.ltProp( 'value' );
            
            this._callMethod("onSearch", [value]);
        },

        onRecentItemSelected: function(selectedItem) {
            var indexAttr;
            var index;
            var item;

            indexAttr = selectedItem.getAttribute("data-index");
            index = parseInt(indexAttr, 10);

            item = (this.data.ltPropRecents || [])[index];

            if (!item) {
                return;
            }
            this._clearPendingUploadState();
            this.setData( 'ltPropChats', [] );
            this._callMethod("onRecentSelect", [item, index]);
        }
    }
});
