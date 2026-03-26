Lyte.Component.register("data-view-chart", {
_template:"<template tag-name=\"data-view-chart\"> <div class=\"lyte-chart-wrapper\"> <lyte-chart lt-prop-type=\"{{ltPropType}}\" lt-prop-title=\"{{ltPropTitle}}\" lt-prop-series-data=\"{{ltPropSeriesData}}\" lt-prop-meta-data-axes=\"{{ltPropMetaDataAxes}}\" lt-prop-meta-data-columns=\"{{ltPropMetaDataColumns}}\"> </lyte-chart> </div> </template>\n<style>.lyte-chart-wrapper {\n\twidth: 100%;\n\tmin-height: 300px;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n}\n.lyte-chart-wrapper lyte-chart {\n\twidth: 100%;\n\theight: 300px;\n}</style>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["ltPropType","ltPropTitle","ltPropSeriesData","ltPropMetaDataAxes","ltPropMetaDataColumns"],
_observedAttributesType :["string","string","object","object","array"],

	data : function(){
		return {
			ltPropType : Lyte.attr("string", { default : "bar" }),
			ltPropTitle : Lyte.attr("string", { default : "" }),
			ltPropSeriesData : Lyte.attr("object", { default : {} }),
			ltPropMetaDataAxes : Lyte.attr("object", { default : {} }),
			ltPropMetaDataColumns : Lyte.attr("array", { default : [] })
		}
	},
	actions : {},
	methods : {}
});

Lyte.Component.register("data-view-kanban", {
_template:"<template tag-name=\"data-view-kanban\"> <div class=\"lyte-kanban-wrapper\"> <lyte-kanbanview lt-prop-board-details=\"{{ltPropBoardDetails}}\"> <template is=\"registerYield\" yield-name=\"kanbanYield\"> <lyte-board lt-prop-board-sortable=\"true\" lt-prop-more-stage-record=\"{{lyteBoardItem.moreRecords}}\" on-board-scroll=\"{{method('boardScroll')}}\" lt-prop-id=\"{{lyteBoardItem.id}}\" lt-prop-kanban-id=\"{{lyteKanbanId}}\" lt-prop-board-detail=\"{{lyteBoardItem}}\" lt-prop-class=\"{{lyteBoardItem.class}}\" lt-prop-index=\"{{lyteIndex}}\"> <template is=\"registerYield\" yield-name=\"boardHeader\"> <div class=\"kanban-board-header\"> <span class=\"board-title\">{{lyteBoardItem.title}}</span> <span class=\"board-count\">{{lyteBoardItem.cards.length}}</span> </div> </template> <template is=\"registerYield\" yield-name=\"contentItem\"> <lyte-card> <template is=\"registerYield\" yield-name=\"yield\"> <div class=\"kanban-card-content\"> <div class=\"kanban-card-name\">{{lyteCardItem._title}}</div> <template items=\"{{lyteCardItem._fields}}\" item=\"field\" index=\"fIdx\" is=\"for\"> <div class=\"kanban-card-field\"> <span class=\"kfield-label\">{{field.label}}:</span> <span class=\"kfield-value\">{{field.value}}</span> </div> </template> </div> </template> </lyte-card> </template> </lyte-board> </template> </lyte-kanbanview> </div> <div></div> </template>\n<style>.lyte-kanban-wrapper {\n\twidth: 100%;\n\toverflow-x: auto;\n\tmin-height: 200px;\n}\n.lyte-kanban-wrapper lyte-kanbanview {\n\twidth: 100%;\n}\n.kanban-board-header {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 8px 12px;\n\tfont-weight: 600;\n\tfont-size: 13px;\n\tcolor: var(--text-primary, #1e293b);\n}\n.kanban-board-header .board-count {\n\tbackground: var(--primary, #3b82f6);\n\tcolor: #fff;\n\tborder-radius: 10px;\n\tpadding: 2px 8px;\n\tfont-size: 11px;\n\tfont-weight: 600;\n}\n.kanban-card-content {\n\tpadding: 10px;\n}\n.kanban-card-name {\n\tfont-weight: 600;\n\tfont-size: 13px;\n\tcolor: var(--text-primary, #1e293b);\n\tmargin-bottom: 6px;\n}\n.kanban-card-field {\n\tdisplay: flex;\n\tgap: 6px;\n\tfont-size: 12px;\n\tmargin-top: 3px;\n}\n.kfield-label {\n\tcolor: var(--text-tertiary, #94a3b8);\n}\n.kfield-value {\n\tcolor: var(--text-secondary, #64748b);\n}</style>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["ltPropBoardDetails"],
_observedAttributesType :["array"],

	data : function(){
		return {
			ltPropBoardDetails : Lyte.attr("array", { default : [] })
		}
	},
	actions : {},
	methods : {}
});

Lyte.Component.register("data-view-table", {
_template:"<template tag-name=\"data-view-table\"> <div class=\"lyte-table-wrapper\"> <lyte-table lt-prop-header=\"{{ltPropHeader}}\" lt-prop-content=\"{{ltPropContent}}\" lt-prop-header-label-key=\"name\" lt-prop-body-label-key=\"body\"> </lyte-table> </div> </template>\n<style>.lyte-table-wrapper {\n\twidth: 100%;\n\toverflow-x: auto;\n\tborder-radius: 8px;\n\tbackground: var(--bg-primary, #fff);\n}\n.lyte-table-wrapper lyte-table {\n\twidth: 100%;\n}\n.lyte-table-wrapper lyte-th {\n\tbackground: var(--bg-tertiary, #f3f4f6);\n\tcolor: var(--text-primary, #1e293b);\n\tfont-weight: 600;\n\tfont-size: 12px;\n\ttext-transform: uppercase;\n\tletter-spacing: 0.05em;\n}\n.lyte-table-wrapper lyte-td {\n\tfont-size: 13px;\n\tcolor: var(--text-secondary, #64748b);\n}</style>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}],
_observedAttributes :["ltPropHeader","ltPropContent"],
_observedAttributesType :["array","array"],

	data : function(){
		return {
			ltPropHeader : Lyte.attr("array", { default : [] }),
			ltPropContent : Lyte.attr("array", { default : [] })
		}
	},
	actions : {},
	methods : {}
});

Lyte.Component.register("pilotx-chat", {
_template:"<template tag-name=\"pilotx-chat\"> <div class=\"app-container\"> <aside class=\"sidebar\" id=\"sidebar\"> <div class=\"sidebar-header\"> <div class=\"logo\"> <i class=\"fas fa-robot\"></i> <span>WorkPilot</span> </div> <button class=\"new-chat-btn\" id=\"newChatBtn\" title=\"New Chat\"> <i class=\"fas fa-plus\"></i> <span>New Chat</span> </button> </div> <div class=\"sidebar-sessions\" id=\"sessionList\"> </div> <div class=\"sidebar-footer\"> <button class=\"clear-all-btn\" id=\"clearAllBtn\"> <i class=\"fas fa-trash-alt\"></i> <span>Clear All Chats</span> </button> </div> </aside> <main class=\"main-content\"> <header class=\"topbar\"> <button class=\"sidebar-toggle\" id=\"sidebarToggle\" title=\"Toggle Sidebar\"> <i class=\"fas fa-bars\"></i> </button> <div class=\"topbar-title\"> <span id=\"currentSessionTitle\">New Chat</span> </div> <div class=\"topbar-actions\"> <button class=\"topbar-btn\" id=\"deleteSessionBtn\" title=\"Delete Chat\"> <i class=\"fas fa-trash\"></i> </button> </div> </header> <div class=\"chat-container\" id=\"chatContainer\"> <div class=\"welcome-screen\" id=\"welcomeScreen\"> <div class=\"welcome-icon\"> <i class=\"fas fa-robot\"></i> </div> <h1>WorkPilot</h1> <p>Your AI-powered CRM assistant. Ask about leads, deals, follow-ups, or pipeline activity.</p> <div class=\"suggestions\" id=\"suggestions\"> <button class=\"suggestion-chip\" data-prompt=\"Get top 10 leads\"> <i class=\"fas fa-users\"></i> <span>Top 10 leads</span> <small>Array of records</small> </button> <button class=\"suggestion-chip\" data-prompt=\"Get first lead detail\"> <i class=\"fas fa-id-card\"></i> <span>Lead detail</span> <small>Single record</small> </button> <button class=\"suggestion-chip\" data-prompt=\"Get current CRM environment\"> <i class=\"fas fa-server\"></i> <span>CRM Environment</span> <small>String response</small> </button> <button class=\"suggestion-chip\" data-prompt=\"Get all the deal stages\"> <i class=\"fas fa-list-ul\"></i> <span>Deal stages</span> <small>String array</small> </button> <button class=\"suggestion-chip\" data-prompt=\"Get total expected revenue from deals\"> <i class=\"fas fa-dollar-sign\"></i> <span>Total revenue</span> <small>Number</small> </button> <button class=\"suggestion-chip\" data-prompt=\"Get Documents module\"> <i class=\"fas fa-exclamation-triangle\"></i> <span>Error scenario</span> <small>Error response</small> </button> </div> </div> <div class=\"messages-wrapper\" id=\"messagesWrapper\"></div> </div> <div class=\"input-area\"> <div class=\"input-container\"> <textarea id=\"promptInput\" placeholder=\"Ask WorkPilot about leads, deals, follow-ups, or pipeline changes\" rows=\"1\" autofocus=\"\"></textarea> <button class=\"send-btn\" id=\"sendBtn\" title=\"Send\"> <i class=\"fas fa-arrow-up\"></i> </button> </div> <div class=\"input-footer\"> <span>WorkPilot can make mistakes. Verify important information.</span> </div> </div> </main> </div> <div class=\"view-modal-overlay\" id=\"viewModalOverlay\"> <div class=\"view-modal\" id=\"viewModal\"> <div class=\"view-modal-header\"> <h3 id=\"viewModalTitle\">Data View</h3> <button class=\"view-modal-close\" id=\"viewModalClose\"> <i class=\"fas fa-times\"></i> </button> </div> <div class=\"view-modal-body\" id=\"viewModalBody\"></div> </div> </div> </template>\n<style>/* ============================================\n   WorkPilot – CRM AI Chat UI\n   Zoho CRM Design + ChatGPT UX\n   ============================================ */\n\n:root {\n    /* Zoho CRM-inspired palette */\n    --primary: #1F7AEC;\n    --primary-hover: #1565d8;\n    --primary-light: #e8f2ff;\n    --bg-main: #f5f6fa;\n    --bg-white: #ffffff;\n    --bg-sidebar: #1a1a2e;\n    --bg-sidebar-hover: #252545;\n    --bg-sidebar-active: #2d2d55;\n    --text-primary: #1a1a2e;\n    --text-secondary: #6b7280;\n    --text-sidebar: #c4c8d4;\n    --text-sidebar-active: #ffffff;\n    --border: #e5e7eb;\n    --border-light: #f0f1f4;\n    --success: #10b981;\n    --error: #ef4444;\n    --warning: #f59e0b;\n    --info: #3b82f6;\n    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);\n    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);\n    --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);\n    --radius-sm: 8px;\n    --radius-md: 12px;\n    --radius-lg: 16px;\n    --radius-xl: 20px;\n    --transition: 0.2s ease;\n    --sidebar-width: 280px;\n    --topbar-height: 56px;\n}\n\n/* ---- Reset ---- */\n*, *::before, *::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nhtml {\n    font-size: 16px;\n    -webkit-font-smoothing: antialiased;\n}\n\nbody {\n    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n    background: var(--bg-main);\n    color: var(--text-primary);\n    height: 100vh;\n    overflow: hidden;\n}\n\nbutton {\n    cursor: pointer;\n    border: none;\n    background: none;\n    font-family: inherit;\n    font-size: inherit;\n}\n\ntextarea {\n    font-family: inherit;\n    font-size: inherit;\n    border: none;\n    outline: none;\n    resize: none;\n}\n\n/* ---- Layout ---- */\n.app-container {\n    display: flex;\n    height: 100vh;\n    overflow: hidden;\n}\n\n/* ============================================\n   SIDEBAR\n   ============================================ */\n.sidebar {\n    width: var(--sidebar-width);\n    min-width: var(--sidebar-width);\n    background: var(--bg-sidebar);\n    display: flex;\n    flex-direction: column;\n    transition: transform var(--transition), width var(--transition);\n    z-index: 100;\n    overflow: hidden;\n}\n\n.sidebar-header {\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    border-bottom: 1px solid rgba(255,255,255,0.06);\n}\n\n.logo {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    color: #fff;\n    font-size: 18px;\n    font-weight: 700;\n    padding: 4px 0;\n}\n\n.logo i {\n    font-size: 22px;\n    color: var(--primary);\n}\n\n.new-chat-btn {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 10px 14px;\n    border-radius: var(--radius-sm);\n    border: 1px solid rgba(255,255,255,0.12);\n    color: var(--text-sidebar);\n    font-size: 14px;\n    font-weight: 500;\n    transition: all var(--transition);\n}\n\n.new-chat-btn:hover {\n    background: var(--bg-sidebar-hover);\n    color: #fff;\n    border-color: rgba(255,255,255,0.2);\n}\n\n/* Session list */\n.sidebar-sessions {\n    flex: 1;\n    overflow-y: auto;\n    padding: 8px;\n}\n\n.sidebar-sessions::-webkit-scrollbar {\n    width: 4px;\n}\n\n.sidebar-sessions::-webkit-scrollbar-thumb {\n    background: rgba(255,255,255,0.15);\n    border-radius: 4px;\n}\n\n.session-item {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 10px 12px;\n    border-radius: var(--radius-sm);\n    color: var(--text-sidebar);\n    font-size: 13px;\n    cursor: pointer;\n    transition: all var(--transition);\n    position: relative;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.session-item:hover {\n    background: var(--bg-sidebar-hover);\n    color: #fff;\n}\n\n.session-item.active {\n    background: var(--bg-sidebar-active);\n    color: var(--text-sidebar-active);\n}\n\n.session-item .session-icon {\n    font-size: 14px;\n    flex-shrink: 0;\n}\n\n.session-item .session-label {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    flex: 1;\n}\n\n.session-item .session-delete {\n    opacity: 0;\n    flex-shrink: 0;\n    color: var(--text-sidebar);\n    font-size: 12px;\n    padding: 4px;\n    border-radius: 4px;\n    transition: all var(--transition);\n}\n\n.session-item:hover .session-delete {\n    opacity: 1;\n}\n\n.session-item .session-delete:hover {\n    color: var(--error);\n    background: rgba(239,68,68,0.15);\n}\n\n/* Sidebar footer */\n.sidebar-footer {\n    padding: 12px 16px;\n    border-top: 1px solid rgba(255,255,255,0.06);\n}\n\n.clear-all-btn {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 10px 12px;\n    width: 100%;\n    border-radius: var(--radius-sm);\n    color: var(--text-sidebar);\n    font-size: 13px;\n    transition: all var(--transition);\n}\n\n.clear-all-btn:hover {\n    background: rgba(239,68,68,0.12);\n    color: var(--error);\n}\n\n/* ============================================\n   MAIN CONTENT\n   ============================================ */\n.main-content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    position: relative;\n}\n\n/* Topbar */\n.topbar {\n    height: var(--topbar-height);\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    padding: 0 16px;\n    background: var(--bg-white);\n    border-bottom: 1px solid var(--border);\n    flex-shrink: 0;\n}\n\n.sidebar-toggle {\n    display: none;\n    font-size: 18px;\n    color: var(--text-secondary);\n    padding: 8px;\n    border-radius: var(--radius-sm);\n    transition: all var(--transition);\n}\n\n.sidebar-toggle:hover {\n    background: var(--bg-main);\n    color: var(--text-primary);\n}\n\n.topbar-title {\n    flex: 1;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.topbar-actions {\n    display: flex;\n    gap: 4px;\n}\n\n.topbar-btn {\n    padding: 8px;\n    border-radius: var(--radius-sm);\n    color: var(--text-secondary);\n    font-size: 14px;\n    transition: all var(--transition);\n}\n\n.topbar-btn:hover {\n    background: var(--bg-main);\n    color: var(--error);\n}\n\n/* Exec stepper accent */\n.agent-steps.exec-steps .agent-steps-body {\n    border-left-color: var(--warning);\n}\n\n.agent-steps.exec-steps .steps-spinner {\n    border-top-color: var(--warning);\n}\n\n.agent-steps.exec-steps .step-icon.done {\n    color: var(--warning);\n}\n\n.agent-steps.exec-steps .steps-done-icon {\n    color: var(--warning);\n}\n\n.agent-steps.exec-steps .step-cursor {\n    background: var(--warning);\n}\n\n/* ============================================\n   CHAT CONTAINER\n   ============================================ */\n.chat-container {\n    flex: 1;\n    overflow-y: auto;\n    scroll-behavior: smooth;\n}\n\n.chat-container::-webkit-scrollbar {\n    width: 6px;\n}\n\n.chat-container::-webkit-scrollbar-thumb {\n    background: #d1d5db;\n    border-radius: 6px;\n}\n\n/* Welcome Screen */\n.welcome-screen {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: calc(100vh - var(--topbar-height) - 120px);\n    padding: 40px 20px;\n    text-align: center;\n}\n\n.welcome-screen.hidden {\n    display: none;\n}\n\n.welcome-icon {\n    width: 64px;\n    height: 64px;\n    border-radius: 50%;\n    background: linear-gradient(135deg, var(--primary), #6366f1);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 20px;\n}\n\n.welcome-icon i {\n    font-size: 28px;\n    color: #fff;\n}\n\n.welcome-screen h1 {\n    font-size: 28px;\n    font-weight: 700;\n    color: var(--text-primary);\n    margin-bottom: 8px;\n}\n\n.welcome-screen p {\n    font-size: 15px;\n    color: var(--text-secondary);\n    max-width: 480px;\n    line-height: 1.5;\n    margin-bottom: 32px;\n}\n\n.suggestions {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 10px;\n    max-width: 720px;\n    width: 100%;\n}\n\n.suggestion-chip {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 6px;\n    padding: 16px 12px;\n    border: 1px solid var(--border);\n    border-radius: var(--radius-md);\n    background: var(--bg-white);\n    color: var(--text-primary);\n    font-size: 12px;\n    font-weight: 500;\n    text-align: center;\n    transition: all var(--transition);\n    box-shadow: var(--shadow-sm);\n    position: relative;\n}\n\n.suggestion-chip i {\n    color: var(--primary);\n    font-size: 20px;\n    flex-shrink: 0;\n    margin-bottom: 2px;\n}\n\n.suggestion-chip span {\n    line-height: 1.3;\n}\n\n.suggestion-chip small {\n    display: block;\n    font-size: 10px;\n    font-weight: 400;\n    color: var(--text-secondary);\n    margin-top: 1px;\n    letter-spacing: 0.2px;\n}\n\n.suggestion-chip:hover {\n    border-color: var(--primary);\n    background: var(--primary-light);\n    box-shadow: var(--shadow-md);\n    transform: translateY(-1px);\n}\n\n/* Messages */\n.messages-wrapper {\n    max-width: 820px;\n    margin: 0 auto;\n    padding: 24px 20px 16px;\n    width: 100%;\n}\n\n/* Message bubble */\n.message {\n    display: flex;\n    gap: 14px;\n    margin-bottom: 24px;\n    animation: fadeInUp 0.3s ease;\n}\n\n@keyframes fadeInUp {\n    from { opacity: 0; transform: translateY(8px); }\n    to   { opacity: 1; transform: translateY(0); }\n}\n\n.message-avatar {\n    width: 34px;\n    height: 34px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 14px;\n    font-weight: 600;\n    margin-top: 2px;\n}\n\n.message.user .message-avatar {\n    background: var(--primary);\n    color: #fff;\n}\n\n.message.assistant .message-avatar {\n    background: linear-gradient(135deg, #6366f1, var(--primary));\n    color: #fff;\n}\n\n.message-body {\n    flex: 1;\n    min-width: 0;\n}\n\n.message-sender {\n    font-size: 13px;\n    font-weight: 600;\n    margin-bottom: 6px;\n    color: var(--text-primary);\n}\n\n.message-content {\n    font-size: 14px;\n    line-height: 1.65;\n    color: var(--text-primary);\n}\n\n.message.user .message-content {\n    background: var(--primary);\n    color: #fff;\n    padding: 12px 18px;\n    border-radius: var(--radius-md) var(--radius-md) 4px var(--radius-md);\n    display: inline-block;\n    max-width: 100%;\n    word-break: break-word;\n}\n\n.message.assistant .message-content {\n    background: var(--bg-white);\n    padding: 16px 20px;\n    border-radius: 4px var(--radius-md) var(--radius-md) var(--radius-md);\n    border: 1px solid var(--border-light);\n    box-shadow: var(--shadow-sm);\n}\n\n/* Typewriter / Marquee text */\n.typewriter-text {\n    display: inline;\n}\n\n.typewriter-cursor {\n    display: inline-block;\n    width: 2px;\n    height: 16px;\n    background: var(--primary);\n    margin-left: 2px;\n    vertical-align: text-bottom;\n    animation: blink 0.8s infinite;\n}\n\n@keyframes blink {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0; }\n}\n\n/* ── Agent Steps (Copilot-like thinking UI) ── */\n.agent-steps {\n    margin-bottom: 8px;\n}\n\n.agent-steps-toggle {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 8px 12px;\n    border-radius: var(--radius-sm);\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--text-secondary);\n    cursor: pointer;\n    transition: all var(--transition);\n    background: none;\n    width: 100%;\n    text-align: left;\n}\n\n.agent-steps-toggle:hover {\n    background: var(--bg-main);\n    color: var(--text-primary);\n}\n\n.agent-steps-toggle .toggle-icon {\n    transition: transform 0.25s ease;\n    font-size: 10px;\n}\n\n.agent-steps-toggle .toggle-icon.expanded {\n    transform: rotate(90deg);\n}\n\n.agent-steps-toggle .steps-spinner {\n    width: 14px;\n    height: 14px;\n    border: 2px solid var(--border);\n    border-top-color: var(--primary);\n    border-radius: 50%;\n    animation: spin 0.7s linear infinite;\n}\n\n.agent-steps-toggle .steps-done-icon {\n    color: var(--success);\n    font-size: 14px;\n}\n\n.agent-steps-body {\n    overflow: hidden;\n    transition: max-height 0.35s ease, opacity 0.25s ease;\n    max-height: 600px;\n    opacity: 1;\n    padding-left: 12px;\n    border-left: 2px solid var(--border-light);\n    margin-left: 18px;\n    margin-top: 4px;\n}\n\n.agent-steps-body.collapsed {\n    max-height: 0;\n    opacity: 0;\n    margin-top: 0;\n}\n\n.agent-step {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    padding: 7px 12px;\n    font-size: 13px;\n    color: var(--text-secondary);\n    animation: stepFadeIn 0.4s ease;\n    line-height: 1.5;\n}\n\n@keyframes stepFadeIn {\n    from { opacity: 0; transform: translateX(-6px); }\n    to   { opacity: 1; transform: translateX(0); }\n}\n\n.agent-step .step-icon {\n    flex-shrink: 0;\n    margin-top: 3px;\n    font-size: 11px;\n    width: 16px;\n    text-align: center;\n}\n\n.agent-step .step-icon.spinning {\n    width: 14px;\n    height: 14px;\n    border: 2px solid var(--border);\n    border-top-color: var(--primary);\n    border-radius: 50%;\n    animation: spin 0.7s linear infinite;\n    margin-top: 3px;\n}\n\n.agent-step .step-icon.done {\n    color: var(--success);\n}\n\n.agent-step .step-text {\n    flex: 1;\n}\n\n.agent-step .step-text .step-marquee {\n    display: inline;\n    overflow: hidden;\n}\n\n.agent-step .step-text .step-cursor {\n    display: inline-block;\n    width: 2px;\n    height: 13px;\n    background: var(--primary);\n    margin-left: 1px;\n    vertical-align: text-bottom;\n    animation: blink 0.8s infinite;\n}\n\n/* Loader */\n.thinking-loader {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 16px 20px;\n    background: var(--bg-white);\n    border-radius: 4px var(--radius-md) var(--radius-md) var(--radius-md);\n    border: 1px solid var(--border-light);\n    box-shadow: var(--shadow-sm);\n}\n\n.thinking-dots {\n    display: flex;\n    gap: 4px;\n}\n\n.thinking-dots span {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: var(--primary);\n    animation: dotPulse 1.2s infinite;\n}\n\n.thinking-dots span:nth-child(2) { animation-delay: 0.2s; }\n.thinking-dots span:nth-child(3) { animation-delay: 0.4s; }\n\n@keyframes dotPulse {\n    0%, 60%, 100% { transform: scale(0.6); opacity: 0.4; }\n    30% { transform: scale(1); opacity: 1; }\n}\n\n.thinking-label {\n    font-size: 13px;\n    color: var(--text-secondary);\n    font-weight: 500;\n}\n\n/* Execution Loader */\n.exec-loader {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 12px 16px;\n    background: #fefce8;\n    border: 1px solid #fde68a;\n    border-radius: var(--radius-sm);\n    margin-top: 12px;\n}\n\n.exec-spinner {\n    width: 18px;\n    height: 18px;\n    border: 2px solid #fde68a;\n    border-top-color: var(--warning);\n    border-radius: 50%;\n    animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n\n.exec-loader-text {\n    font-size: 13px;\n    color: #92400e;\n    font-weight: 500;\n}\n\n/* ============================================\n   DATA VIEW COMPONENT\n   ============================================ */\n.data-view-container {\n    margin-top: 16px;\n    border: 1px solid var(--border);\n    border-radius: var(--radius-md);\n    overflow: hidden;\n    background: var(--bg-white);\n}\n\n.data-view-toolbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 16px;\n    background: var(--bg-main);\n    border-bottom: 1px solid var(--border);\n    flex-wrap: wrap;\n    gap: 8px;\n}\n\n.view-tabs {\n    display: flex;\n    gap: 2px;\n    background: var(--bg-white);\n    border-radius: var(--radius-sm);\n    padding: 2px;\n    border: 1px solid var(--border);\n}\n\n.view-tab {\n    padding: 6px 14px;\n    font-size: 12px;\n    font-weight: 500;\n    border-radius: 6px;\n    color: var(--text-secondary);\n    transition: all var(--transition);\n    display: flex;\n    align-items: center;\n    gap: 6px;\n}\n\n.view-tab:hover {\n    color: var(--text-primary);\n    background: var(--bg-main);\n}\n\n.view-tab.active {\n    background: var(--primary);\n    color: #fff;\n}\n\n.data-view-actions {\n    display: flex;\n    gap: 6px;\n}\n\n.expand-btn {\n    padding: 6px 10px;\n    font-size: 12px;\n    color: var(--text-secondary);\n    border-radius: 6px;\n    border: 1px solid var(--border);\n    background: var(--bg-white);\n    transition: all var(--transition);\n}\n\n.expand-btn:hover {\n    color: var(--primary);\n    border-color: var(--primary);\n}\n\n/* ── Multi-view tab wrapper (multiple result sets per response) ── */\n.multi-view-tabs-wrapper {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n    width: 100%;\n}\n\n.multi-view-tab-strip {\n    /* inherits .view-tabs layout */\n    margin-bottom: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    border-bottom: none;\n}\n\n.multi-view-panels-host {\n    border: 1px solid var(--border);\n    border-top: none;\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n    overflow: hidden;\n}\n\n.multi-view-panel {\n    /* Each panel is a slot for a data-view-container */\n}\n\n.multi-view-panel > .data-view-container {\n    border: none;\n    border-radius: 0;\n}\n\n.data-view-body {\n    padding: 0;\n    max-height: 420px;\n    overflow: auto;\n}\n\n/* ---- List View ---- */\n.list-view {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: 12px;\n    padding: 16px;\n}\n\n.list-card {\n    background: var(--bg-white);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-sm);\n    padding: 16px;\n    transition: all var(--transition);\n    cursor: default;\n}\n\n.list-card:hover {\n    border-color: var(--primary);\n    box-shadow: var(--shadow-md);\n    transform: translateY(-1px);\n}\n\n.list-card-title {\n    font-size: 14px;\n    font-weight: 600;\n    color: var(--text-primary);\n    margin-bottom: 10px;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.list-card-title .card-icon {\n    width: 28px;\n    height: 28px;\n    border-radius: 6px;\n    background: var(--primary-light);\n    color: var(--primary);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12px;\n    flex-shrink: 0;\n}\n\n.list-card-field {\n    display: flex;\n    justify-content: space-between;\n    padding: 4px 0;\n    font-size: 12px;\n}\n\n.list-card-field .field-label {\n    color: var(--text-secondary);\n    text-transform: uppercase;\n    font-weight: 600;\n    letter-spacing: 0.5px;\n    font-size: 10px;\n}\n\n.list-card-field .field-value {\n    color: var(--text-primary);\n    font-weight: 500;\n    text-align: right;\n    max-width: 60%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n/* ---- Table View ---- */\n.table-view {\n    width: 100%;\n    overflow-x: auto;\n}\n\n.table-view table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 13px;\n}\n\n.table-view th {\n    background: var(--bg-main);\n    padding: 10px 16px;\n    text-align: left;\n    font-weight: 600;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    color: var(--text-secondary);\n    border-bottom: 1px solid var(--border);\n    white-space: nowrap;\n    position: sticky;\n    top: 0;\n    z-index: 1;\n}\n\n.table-view td {\n    padding: 10px 16px;\n    border-bottom: 1px solid var(--border-light);\n    color: var(--text-primary);\n    white-space: nowrap;\n    max-width: 200px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.table-view tr:hover td {\n    background: var(--primary-light);\n}\n\n.table-view tr:last-child td {\n    border-bottom: none;\n}\n\n/* ---- Kanban View ---- */\n.kanban-view {\n    display: flex;\n    gap: 14px;\n    padding: 16px;\n    overflow-x: auto;\n    min-height: 200px;\n}\n\n.kanban-column {\n    min-width: 220px;\n    max-width: 260px;\n    flex-shrink: 0;\n    background: var(--bg-main);\n    border-radius: var(--radius-sm);\n    display: flex;\n    flex-direction: column;\n}\n\n.kanban-column-header {\n    padding: 10px 14px;\n    font-size: 12px;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: 2px solid var(--primary);\n}\n\n.kanban-column-header .col-count {\n    background: var(--primary);\n    color: #fff;\n    width: 22px;\n    height: 22px;\n    border-radius: 50%;\n    font-size: 11px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.kanban-cards {\n    padding: 8px;\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n.kanban-card {\n    background: var(--bg-white);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-sm);\n    padding: 12px;\n    font-size: 13px;\n    transition: all var(--transition);\n    cursor: default;\n}\n\n.kanban-card:hover {\n    box-shadow: var(--shadow-md);\n    transform: translateY(-1px);\n}\n\n.kanban-card-title {\n    font-weight: 600;\n    margin-bottom: 6px;\n}\n\n.kanban-card-meta {\n    font-size: 11px;\n    color: var(--text-secondary);\n}\n\n/* ---- Chart View ---- */\n.chart-view {\n    padding: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    min-height: 300px;\n}\n\n.chart-bars {\n    display: flex;\n    align-items: flex-end;\n    gap: 16px;\n    height: 220px;\n    padding: 0 20px;\n    width: 100%;\n    max-width: 600px;\n}\n\n.chart-bar-group {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 100%;\n    justify-content: flex-end;\n}\n\n.chart-bar {\n    width: 100%;\n    max-width: 50px;\n    border-radius: 6px 6px 0 0;\n    transition: all 0.5s ease;\n    position: relative;\n    min-height: 4px;\n}\n\n.chart-bar:hover {\n    filter: brightness(1.1);\n}\n\n.chart-bar-value {\n    position: absolute;\n    top: -20px;\n    left: 50%;\n    transform: translateX(-50%);\n    font-size: 11px;\n    font-weight: 600;\n    color: var(--text-secondary);\n    white-space: nowrap;\n}\n\n.chart-bar-label {\n    margin-top: 8px;\n    font-size: 11px;\n    color: var(--text-secondary);\n    text-align: center;\n    max-width: 70px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n/* ---- Error Message ---- */\n.error-message {\n    padding: 14px 18px;\n    background: #fef2f2;\n    border: 1px solid #fecaca;\n    border-radius: var(--radius-sm);\n    color: #991b1b;\n    font-size: 13px;\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    margin-top: 12px;\n}\n\n.error-message i {\n    color: var(--error);\n    margin-top: 2px;\n    flex-shrink: 0;\n}\n\n/* ---- String Response ---- */\n.string-response {\n    margin-top: 12px;\n    padding: 14px 18px;\n    background: var(--bg-main);\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border);\n    font-size: 14px;\n    line-height: 1.6;\n    color: var(--text-primary);\n    display: flex;\n    align-items: center;\n}\n\n/* ---- Detail View (single record) ---- */\n.detail-view {\n    padding: 20px;\n}\n\n.detail-header {\n    display: flex;\n    align-items: center;\n    gap: 16px;\n    margin-bottom: 24px;\n    padding-bottom: 16px;\n    border-bottom: 1px solid var(--border);\n}\n\n.detail-avatar {\n    width: 52px;\n    height: 52px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #fff;\n    font-size: 20px;\n    flex-shrink: 0;\n}\n\n.detail-title-block {\n    flex: 1;\n    min-width: 0;\n}\n\n.detail-name {\n    font-size: 18px;\n    font-weight: 700;\n    color: var(--text-primary);\n    margin: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.detail-subtitle {\n    font-size: 12px;\n    color: var(--text-secondary);\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    font-weight: 500;\n}\n\n.detail-fields {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n    gap: 16px;\n}\n\n.detail-field {\n    padding: 12px 14px;\n    background: var(--bg-main);\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border-light);\n}\n\n.detail-field-label {\n    font-size: 10px;\n    text-transform: uppercase;\n    letter-spacing: 0.6px;\n    color: var(--text-secondary);\n    font-weight: 600;\n    margin-bottom: 4px;\n}\n\n.detail-field-value {\n    font-size: 14px;\n    font-weight: 500;\n    color: var(--text-primary);\n    word-break: break-word;\n}\n\n.detail-field-value a {\n    color: var(--primary);\n    text-decoration: none;\n}\n\n.detail-field-value a:hover {\n    text-decoration: underline;\n}\n\n/* ---- JSON View ---- */\n.json-view {\n    background: #1a1a2e;\n    color: #e2e8f0;\n    padding: 16px 20px;\n    border-radius: var(--radius-sm);\n    overflow-x: auto;\n    font-size: 13px;\n    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;\n    line-height: 1.55;\n    margin: 0;\n    max-height: 400px;\n}\n\n.json-view code {\n    background: none;\n    padding: 0;\n    color: inherit;\n    font-size: inherit;\n}\n\n/* ---- Text View ---- */\n.text-view {\n    padding: 16px 20px;\n    font-size: 14px;\n    line-height: 1.65;\n    color: var(--text-primary);\n}\n\n/* ---- Simple List View ---- */\n.simple-list-view {\n    padding: 12px 16px;\n}\n\n.simple-list-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 12px;\n    padding: 10px 12px;\n    border-bottom: 1px solid var(--border-light);\n    transition: background var(--transition);\n}\n\n.simple-list-item:last-child {\n    border-bottom: none;\n}\n\n.simple-list-item:hover {\n    background: var(--primary-light);\n}\n\n.simple-list-num {\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    background: var(--primary-light);\n    color: var(--primary);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12px;\n    font-weight: 600;\n    flex-shrink: 0;\n}\n\n.simple-list-val {\n    font-size: 14px;\n    color: var(--text-primary);\n    line-height: 1.5;\n    padding-top: 2px;\n    word-break: break-word;\n    flex: 1;\n}\n\n/* ---- Stat View (single number / boolean) ---- */\n.stat-view {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 40px 20px;\n    min-height: 180px;\n}\n\n.stat-icon {\n    font-size: 36px;\n    margin-bottom: 12px;\n    opacity: 0.8;\n}\n\n.stat-value {\n    font-size: 48px;\n    font-weight: 700;\n    line-height: 1;\n    margin-bottom: 8px;\n}\n\n.stat-label {\n    font-size: 12px;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    color: var(--text-secondary);\n    font-weight: 600;\n}\n\n@media (max-width: 480px) {\n    .suggestions {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .detail-fields {\n        grid-template-columns: 1fr;\n    }\n\n    .detail-header {\n        gap: 12px;\n    }\n\n    .detail-avatar {\n        width: 42px;\n        height: 42px;\n        font-size: 16px;\n    }\n\n    .detail-name {\n        font-size: 16px;\n    }\n\n    .stat-value {\n        font-size: 36px;\n    }\n}\n\n/* ============================================\n   INPUT AREA\n   ============================================ */\n.input-area {\n    padding: 12px 20px 16px;\n    background: var(--bg-main);\n    flex-shrink: 0;\n}\n\n.input-container {\n    max-width: 820px;\n    margin: 0 auto;\n    display: flex;\n    align-items: flex-end;\n    gap: 8px;\n    background: var(--bg-white);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-lg);\n    padding: 8px 8px 8px 18px;\n    transition: all var(--transition);\n    box-shadow: var(--shadow-sm);\n}\n\n.input-container:focus-within {\n    border-color: var(--primary);\n    box-shadow: 0 0 0 3px rgba(31,122,236,0.12);\n}\n\n.input-container textarea {\n    flex: 1;\n    min-height: 24px;\n    max-height: 160px;\n    padding: 6px 0;\n    color: var(--text-primary);\n    line-height: 1.5;\n    background: transparent;\n}\n\n.input-container textarea::placeholder {\n    color: #9ca3af;\n}\n\n.send-btn {\n    width: 36px;\n    height: 36px;\n    border-radius: 50%;\n    background: var(--primary);\n    color: #fff;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 14px;\n    flex-shrink: 0;\n    transition: all var(--transition);\n}\n\n.send-btn:hover {\n    background: var(--primary-hover);\n    transform: scale(1.05);\n}\n\n.send-btn:disabled {\n    background: #d1d5db;\n    cursor: not-allowed;\n    transform: none;\n}\n\n.input-footer {\n    text-align: center;\n    font-size: 11px;\n    color: var(--text-secondary);\n    margin-top: 8px;\n}\n\n/* ============================================\n   VIEW MODAL (expanded view)\n   ============================================ */\n.view-modal-overlay {\n    position: fixed;\n    inset: 0;\n    background: rgba(0,0,0,0.5);\n    z-index: 1000;\n    display: none;\n    align-items: center;\n    justify-content: center;\n    padding: 20px;\n    backdrop-filter: blur(2px);\n}\n\n.view-modal-overlay.active {\n    display: flex;\n}\n\n.view-modal {\n    background: var(--bg-white);\n    border-radius: var(--radius-lg);\n    width: 100%;\n    max-width: 1100px;\n    max-height: 85vh;\n    display: flex;\n    flex-direction: column;\n    box-shadow: var(--shadow-lg);\n    animation: modalIn 0.25s ease;\n}\n\n@keyframes modalIn {\n    from { opacity: 0; transform: scale(0.95) translateY(10px); }\n    to   { opacity: 1; transform: scale(1) translateY(0); }\n}\n\n.view-modal-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 16px 24px;\n    border-bottom: 1px solid var(--border);\n}\n\n.view-modal-header h3 {\n    font-size: 16px;\n    font-weight: 600;\n}\n\n.view-modal-close {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--text-secondary);\n    transition: all var(--transition);\n}\n\n.view-modal-close:hover {\n    background: var(--bg-main);\n    color: var(--text-primary);\n}\n\n.view-modal-body {\n    flex: 1;\n    overflow: auto;\n    padding: 0;\n}\n\n/* ============================================\n   RESPONSIVE\n   ============================================ */\n@media (max-width: 768px) {\n    .sidebar {\n        position: fixed;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        transform: translateX(-100%);\n    }\n\n    .sidebar.open {\n        transform: translateX(0);\n    }\n\n    .sidebar-toggle {\n        display: flex;\n    }\n\n    .suggestions {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .welcome-screen h1 {\n        font-size: 22px;\n    }\n\n    .list-view {\n        grid-template-columns: 1fr;\n    }\n\n    .kanban-view {\n        padding: 12px;\n        gap: 10px;\n    }\n\n    .kanban-column {\n        min-width: 200px;\n    }\n\n    .view-modal {\n        max-height: 95vh;\n        border-radius: var(--radius-md);\n    }\n}\n\n@media (max-width: 480px) {\n    .input-container {\n        border-radius: var(--radius-md);\n        padding: 6px 6px 6px 14px;\n    }\n\n    .message {\n        gap: 10px;\n    }\n\n    .message-avatar {\n        width: 28px;\n        height: 28px;\n        font-size: 12px;\n    }\n\n    .message.user .message-content,\n    .message.assistant .message-content {\n        padding: 10px 14px;\n    }\n\n    .topbar {\n        padding: 0 12px;\n    }\n\n    .data-view-toolbar {\n        padding: 8px 12px;\n    }\n}\n\n/* Sidebar overlay for mobile */\n.sidebar-overlay {\n    display: none;\n    position: fixed;\n    inset: 0;\n    background: rgba(0,0,0,0.4);\n    z-index: 99;\n}\n\n.sidebar-overlay.active {\n    display: block;\n}\n\n/* Scrollbar for data view body */\n.data-view-body::-webkit-scrollbar {\n    width: 5px;\n    height: 5px;\n}\n\n.data-view-body::-webkit-scrollbar-thumb {\n    background: #d1d5db;\n    border-radius: 5px;\n}\n\n/* Markdown-like content in messages */\n.message-content p {\n    margin-bottom: 8px;\n}\n\n.message-content p:last-child {\n    margin-bottom: 0;\n}\n\n.message-content ul, .message-content ol {\n    margin: 8px 0;\n    padding-left: 20px;\n}\n\n.message-content li {\n    margin-bottom: 4px;\n}\n\n.message-content code {\n    background: #f3f4f6;\n    padding: 2px 6px;\n    border-radius: 4px;\n    font-size: 13px;\n    font-family: 'SF Mono', 'Fira Code', monospace;\n}\n\n.message-content pre {\n    background: #1a1a2e;\n    color: #e2e8f0;\n    padding: 14px 18px;\n    border-radius: var(--radius-sm);\n    overflow-x: auto;\n    margin: 8px 0;\n    font-size: 13px;\n    font-family: 'SF Mono', 'Fira Code', monospace;\n    line-height: 1.5;\n}\n\n.message-content pre code {\n    background: none;\n    padding: 0;\n    color: inherit;\n}\n\n/* ─── CRM View Button ─────────────────────────────────── */\n.crm-view-btn-wrapper {\n    margin-bottom: 10px;\n}\n\n.crm-view-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 7px 14px;\n    background: var(--primary);\n    color: #fff;\n    border-radius: var(--radius-sm);\n    font-size: 13px;\n    font-weight: 500;\n    transition: background var(--transition), box-shadow var(--transition);\n    box-shadow: var(--shadow-sm);\n}\n\n.crm-view-btn:hover {\n    background: var(--primary-hover);\n    box-shadow: var(--shadow-md);\n}\n\n.crm-view-btn i {\n    font-size: 12px;\n}\n\n/* ─── CRM Iframe View ─────────────────────────────────── */\n.crm-iframe-wrapper {\n    margin-top: 10px;\n    border-radius: var(--radius-md);\n    overflow: hidden;\n    border: 1px solid var(--border);\n    box-shadow: var(--shadow-sm);\n}\n\n.crm-iframe-wrapper iframe {\n    display: block;\n    border: none;\n    width: 100%;\n    height: 500px;\n}\n\n/* ─── Context Badges (Memory + History indicators in message header) ─── */\n.ctx-badge-row {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    margin-left: 8px;\n    vertical-align: middle;\n}\n\n.ctx-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 3px;\n    font-size: 10px;\n    font-weight: 600;\n    letter-spacing: 0.02em;\n    padding: 2px 6px;\n    border-radius: 20px;\n    line-height: 1.4;\n    white-space: nowrap;\n}\n\n.memory-badge {\n    background: rgba(139, 92, 246, 0.12);\n    color: #7c3aed;\n    border: 1px solid rgba(139, 92, 246, 0.25);\n}\n\n.history-badge {\n    background: rgba(59, 130, 246, 0.10);\n    color: #2563eb;\n    border: 1px solid rgba(59, 130, 246, 0.22);\n}\n\n/* ─── Memory Chip (shown below response when new facts are stored) ─── */\n.memory-chip {\n    display: inline-flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 5px;\n    margin-top: 10px;\n    padding: 6px 10px;\n    background: rgba(139, 92, 246, 0.07);\n    border: 1px solid rgba(139, 92, 246, 0.2);\n    border-radius: 8px;\n    font-size: 11.5px;\n    color: #6d28d9;\n    animation: fadeInUp 0.3s ease;\n}\n\n.memory-chip i {\n    font-size: 12px;\n    color: #7c3aed;\n    flex-shrink: 0;\n}\n\n.memory-chip-label {\n    font-weight: 600;\n    color: #5b21b6;\n    flex-shrink: 0;\n}\n\n.memory-fact {\n    background: rgba(139, 92, 246, 0.12);\n    border-radius: 4px;\n    padding: 1px 6px;\n    font-family: 'SF Mono', 'Menlo', monospace;\n    font-size: 10.5px;\n    color: #4c1d95;\n}\n</style>",
_dynamicNodes : [],

	data : function(){
		return {

		}		
	},
	didConnect : async function(){
    const CRM_FUNC_NAME = 'pyfunction';
    const CRM_FUNC_API_KEY = '1003.6c7fc6fe32b7bd6d2b4c65c73d1e1f8c.623aaaba60931421e904f260ba7a83dd';
    const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const CRM_BASE = IS_DEV ? 'http://localhost:3001' : window.location.origin;
    const CRM_FUNC_URL = CRM_BASE + '/crm/v7/functions/' + CRM_FUNC_NAME + '/actions/execute?auth_type=apikey&zapikey=' + CRM_FUNC_API_KEY;

    const STORAGE_KEY = 'workpilot_sessions';
    const MEMORY_KEY  = 'workpilot_memory';
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

    // ─── MEMORY MANAGER ────────────────────────────────────
    // Persistent cross-session key/value store. Facts are auto-extracted
    // from AI responses and injected into future prompts as context.
    var Memory = (function() {
        var _store = {};

        function load() {
            try {
                var raw = localStorage.getItem(MEMORY_KEY);
                _store = raw ? JSON.parse(raw) : {};
            } catch(e) { _store = {}; }
        }

        function save() {
            localStorage.setItem(MEMORY_KEY, JSON.stringify(_store));
        }

        function set(key, value) {
            _store[key] = { value: value, updatedAt: Date.now() };
            save();
        }

        function get(key) {
            return _store[key] ? _store[key].value : null;
        }

        function getAll() {
            return _store;
        }

        function remove(key) {
            delete _store[key];
            save();
        }

        function clear() {
            _store = {};
            save();
        }

        // Auto-extract facts from any AI response text.
        // Returns array of { key, value } for facts that were stored.
        function extractAndStore(responseText) {
            if (!responseText) return [];
            var extracted = [];
            var patterns = [
                { regex: /(?:remember|noted)[^\n]*prefer(?:ence)?[s]?\s+(?:is|are|:)?\s*(.{3,60})/i, key: 'preference' },
                { regex: /your\s+(?:name|username)\s+is\s+(\w[\w\s]{0,30})/i, key: 'userName' },
                { regex: /working\s+on\s+(?:the\s+)?(.{3,30})\s+module/i, key: 'currentModule' },
                { regex: /(?:prefer|like)\s+(\w+)\s+view/i, key: 'preferredView' },
                { regex: /(?:crm|system)\s+is\s+in\s+(?:the\s+)?(\w+)\s+(?:environment|mode)/i, key: 'crmEnvironment' }
            ];
            patterns.forEach(function(p) {
                var match = responseText.match(p.regex);
                if (match && match[1]) {
                    var val = match[1].trim().replace(/[.,"']+$/, '');
                    set(p.key, val);
                    extracted.push({ key: p.key, value: val });
                }
            });
            return extracted;
        }

        // Returns a context summary string to prepend to outgoing prompts.
        function getSummary() {
            var entries = Object.keys(_store);
            if (entries.length === 0) return '';
            return entries.map(function(k) {
                return k + '="' + _store[k].value + '"';
            }).join(', ');
        }

        load();
        return { set: set, get: get, getAll: getAll, remove: remove, clear: clear, extractAndStore: extractAndStore, getSummary: getSummary };
    })();

    // ─── FALLBACK SCRIPTS (when API fails to generate cscript) ─────
    // Maps scenario keys to hardcoded client script code + explanation
    var FALLBACK_SCRIPTS = {
        records: {
            explanation: 'Fetch top 10 leads',
            content: 'return ZDK.Apps.CRM.Leads.fetch(0, 10);'
        },
        single: {
            explanation: 'Get first lead detail',
            content: 'return ZDK.Apps.CRM.Leads.fetch(0, 10)[0];'
        },
        string: {
            explanation: 'Check current CRM environment',
            content: 'return $Crm.environment;'
        },
        stringList: {
            explanation: 'Show all deal stages',
            content: 'var deals = ZDK.Apps.CRM.Deals.fetch(0, 100);\nvar arr = [];\ndeals.forEach(function (deal) {\n    if (arr.indexOf(deal.Stage) == -1) {\n        arr.push(deal.Stage);\n    }\n});\nreturn arr;'
        },
        number: {
            explanation: 'Calculate total expected revenue',
            content: 'var deals = ZDK.Apps.CRM.Deals.fetch(0, 100);\nvar revenue = 0;\ndeals.forEach(function (deal) {\n    revenue = revenue + deal.Expected_Revenue;\n});\nconsole.log("revenue", revenue);\nreturn revenue;'
        },
        error: {
            explanation: 'Fetch Documents module',
            content: 'try {\n    var response = await zrc.request({\n        url: "/crm/v8/Documents",\n        method: "GET",\n        params: { page: 1, per_page: 10 }\n    });\n    if (response && response.data && response.data.data && response.data.data.length > 0) {}\n} catch (error) {\n    return new Error("Failed to fetch Documents module : No permission");\n}'
        }
    };

    // ─── MOCK executeCScript RESULTS (fallback when CScriptBridge fails) ───
    var MOCK_CSCRIPT_RESULTS = {
        records: [
            { First_Name: "Sarah", Last_Name: "Connor", Company: "Skynet", Email: "sarah@sky.net", Lead_Status: "Contacted", Created_Time: "2025-08-12" },
            { First_Name: "John", Last_Name: "Doe", Company: "Acme", Email: "john@acme.com", Lead_Status: "New", Created_Time: "2025-07-30" },
            { First_Name: "Alice", Last_Name: "Wonderland", Company: "Rabbit", Email: "alice@rabbit.io", Lead_Status: "Qualified", Created_Time: "2025-07-15" },
            { First_Name: "Bob", Last_Name: "Builder", Company: "FixIt", Email: "bob@fixit.com", Lead_Status: "New", Created_Time: "2025-06-20" },
            { First_Name: "Eva", Last_Name: "Green", Company: "Bloom", Email: "eva@bloom.co", Lead_Status: "Contacted", Created_Time: "2025-05-10" },
            { First_Name: "Charlie", Last_Name: "Brown", Company: null, Email: "charlie@mail.com", Lead_Status: "New", Created_Time: "2025-04-05" },
            { First_Name: "Diana", Last_Name: "Prince", Company: "Themyscira", Email: "diana@wp.org", Lead_Status: "Qualified", Created_Time: "2025-03-22" },
            { First_Name: "Tony", Last_Name: "Stark", Company: "Stark Industries", Email: "tony@stark.com", Lead_Status: "Contacted", Created_Time: "2025-02-18" },
            { First_Name: "Bruce", Last_Name: "Wayne", Company: "Wayne Enterprises", Email: "bruce@wayne.com", Lead_Status: "New", Created_Time: "2025-01-10" },
            { First_Name: "Natasha", Last_Name: "Romanoff", Company: "SHIELD", Email: "nat@shield.gov", Lead_Status: "Qualified", Created_Time: "2024-12-05" }
        ],
        single: {
            First_Name: "Sarah", Last_Name: "Connor", Email: "sarah@sky.net", Company: "Skynet",
            Phone: "+1-800-555-0199", Lead_Source: "Web Form", Lead_Status: "Contacted",
            Annual_Revenue: 450000, Created_Time: "2025-08-12T09:30:00+05:30"
        },
        string: "production",
        stringList: ["Qualification", "Needs Analysis", "Value Proposition", "Proposal/Price Quote", "Negotiation/Review", "Closed Won", "Closed Lost", "On Hold"],
        number: 1285000,
        error: null  // will trigger the throw in executeCScript
    };

    // Maps a user prompt to a scenario key based on keyword matching
    function getMockKey(prompt) {
        var p = (prompt || '').toLowerCase();
        if (/detail|first lead|single record|look\s?up/.test(p))   return 'single';
        if (/environment|crm env/.test(p))                          return 'string';
        if (/stages|deal stages|show all.*stages/.test(p))          return 'stringList';
        if (/revenue|expected revenue|total revenue/.test(p))       return 'number';
        if (/error|document|fail|permission/.test(p))               return 'error';
        return 'records';
    }

    // ─── CONVERSATION HISTORY BUILDER ─────────────────────────
    // Returns the last N turns as [{role, content}] for LLM context.
    function buildConversationHistory(messages, maxTurns) {
        maxTurns = maxTurns || 10;
        if (!messages || messages.length === 0) return [];
        return messages
            .filter(function(m) { return !m.processing && m.text && (m.role === 'user' || m.role === 'assistant'); })
            .slice(-maxTurns)
            .map(function(m) {
                return {
                    role: m.role,
                    content: m.role === 'assistant' ? (m.agentSteps || m.text || '') : m.text
                };
            });
    }

    // ─── STATE ─────────────────────────────────────────────
    let sessions = [];
    let activeSessionId = null;
    let isProcessing = false;
    var _processingSessionId = null;
    var _processingMsgId = null;
    var _userSwitchedDuringProcessing = false;

    // ─── DOM REFS ──────────────────────────────────────────
    const $ = (sel) => document.querySelector(sel);
    const sidebar        = $('#sidebar');
    const sidebarToggle  = $('#sidebarToggle');
    const sessionListEl  = $('#sessionList');
    const newChatBtn     = $('#newChatBtn');
    const clearAllBtn    = $('#clearAllBtn');
    const deleteSessionBtn = $('#deleteSessionBtn');
    const chatContainer  = $('#chatContainer');
    const welcomeScreen  = $('#welcomeScreen');
    const messagesWrapper = $('#messagesWrapper');
    const promptInput    = $('#promptInput');
    const sendBtn        = $('#sendBtn');
    const currentSessionTitle = $('#currentSessionTitle');
    const viewModalOverlay = $('#viewModalOverlay');
    const viewModalClose = $('#viewModalClose');
    const viewModalBody  = $('#viewModalBody');
    const viewModalTitle = $('#viewModalTitle');

    // Mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // ─── INIT ──────────────────────────────────────────────
    function init() {
        loadSessions();
        if (sessions.length === 0) {
            createNewSession(true);
        } else {
            activeSessionId = sessions[0].id;
        }
        renderSessionList();
        renderActiveChat();
        bindEvents();
    }

    // ─── STORAGE ───────────────────────────────────────────
    function loadSessions() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            sessions = raw ? JSON.parse(raw) : [];
        } catch (e) { sessions = []; }
    }

    function saveSessions() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }

    // ─── SESSION MANAGEMENT ────────────────────────────────
    function createNewSession(silent) {
        const session = {
            id: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            title: 'New Chat',
            messages: [],
            createdAt: Date.now()
        };
        sessions.unshift(session);
        activeSessionId = session.id;
        saveSessions();
        if (!silent) {
            renderSessionList();
            renderActiveChat();
        }
    }

    function getActiveSession() {
        return sessions.find(s => s.id === activeSessionId);
    }

    function switchSession(id) {
        // Track if user switched away while a message is still processing
        if (_processingSessionId && activeSessionId === _processingSessionId && id !== _processingSessionId) {
            _userSwitchedDuringProcessing = true;
        }
        activeSessionId = id;
        renderSessionList();
        renderActiveChat();
        closeSidebar();
    }

    function deleteSession(id) {
        sessions = sessions.filter(s => s.id !== id);
        if (sessions.length === 0) {
            createNewSession(true);
        } else if (activeSessionId === id) {
            activeSessionId = sessions[0].id;
        }
        saveSessions();
        renderSessionList();
        renderActiveChat();
    }

    function clearAllSessions() {
        if (!confirm('Delete all chats? This cannot be undone.')) return;
        sessions = [];
        createNewSession(true);
        saveSessions();
        renderSessionList();
        renderActiveChat();
    }

    // ─── RENDER SESSION LIST ───────────────────────────────
    function renderSessionList() {
        sessionListEl.innerHTML = '';
        sessions.forEach(s => {
            const el = document.createElement('div');
            el.className = 'session-item' + (s.id === activeSessionId ? ' active' : '');
            el.innerHTML = `
                <i class="fas fa-comment-dots session-icon"></i>
                <span class="session-label">${escapeHtml(s.title)}</span>
                <button class="session-delete" data-id="${s.id}" title="Delete chat">
                    <i class="fas fa-times"></i>
                </button>
            `;
            el.addEventListener('click', (e) => {
                if (e.target.closest('.session-delete')) {
                    e.stopPropagation();
                    deleteSession(s.id);
                    return;
                }
                switchSession(s.id);
            });
            sessionListEl.appendChild(el);
        });
    }

    // ─── RENDER ACTIVE CHAT ────────────────────────────────
    function renderActiveChat() {
        const session = getActiveSession();
        if (!session) return;

        currentSessionTitle.textContent = session.title;

        if (session.messages.length === 0) {
            welcomeScreen.classList.remove('hidden');
            messagesWrapper.innerHTML = '';
        } else {
            welcomeScreen.classList.add('hidden');
            messagesWrapper.innerHTML = '';
            session.messages.forEach(msg => {
                appendMessageToDOM(msg, false);
            });
            scrollToBottom();
        }
    }

    // ─── MESSAGE RENDERING ─────────────────────────────────
    function appendMessageToDOM(msg, animate) {
        const div = document.createElement('div');
        div.className = `message ${msg.role}`;

        const avatarLetter = msg.role === 'user' ? 'U' : 'W';
        const senderName = msg.role === 'user' ? 'You' : 'WorkPilot';

        div.innerHTML = `
            <div class="message-avatar">${msg.role === 'assistant' ? '<i class="fas fa-robot"></i>' : avatarLetter}</div>
            <div class="message-body">
                <div class="message-sender">${senderName}</div>
                <div class="message-content" id="msg-${msg.id}"></div>
            </div>
        `;
        messagesWrapper.appendChild(div);

        const contentEl = div.querySelector('.message-content');

        if (msg.role === 'user') {
            contentEl.textContent = msg.text;
        } else if (msg.error) {
            contentEl.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>${escapeHtml(msg.text)}</span></div>`;
        } else {
            // If message is still being processed, show partial saved data + loader
            if (msg.processing) {
                // Render any agent steps saved so far (collapsed)
                if (msg.agentSteps) {
                    var pSteps = parseResponseIntoSteps(msg.agentSteps);
                    if (pSteps.length > 0) {
                        var pStepsWrap = document.createElement('div');
                        pStepsWrap.className = 'agent-steps';
                        var pToggle = document.createElement('button');
                        pToggle.className = 'agent-steps-toggle';
                        pToggle.innerHTML = '<span class="steps-done-icon"><i class="fas fa-check-circle"></i></span><span class="toggle-label">Worked through ' + pSteps.length + ' steps</span><i class="fas fa-chevron-right toggle-icon"></i>';
                        pStepsWrap.appendChild(pToggle);
                        var pBody = document.createElement('div');
                        pBody.className = 'agent-steps-body collapsed';
                        pSteps.forEach(function(s) {
                            var stepEl = document.createElement('div');
                            stepEl.className = 'agent-step';
                            stepEl.innerHTML = '<span class="step-icon done"><i class="fas fa-check-circle"></i></span><span class="step-text">' + escapeHtml(s) + '</span>';
                            pBody.appendChild(stepEl);
                        });
                        pStepsWrap.appendChild(pBody);
                        pToggle.addEventListener('click', function() {
                            this.querySelector('.toggle-icon').classList.toggle('expanded');
                            pBody.classList.toggle('collapsed');
                        });
                        contentEl.appendChild(pStepsWrap);
                    }
                }
                // Render any exec steps saved so far
                var pExecList = msg.execStepsList || [];
                pExecList.forEach(function(execStepsArr) {
                    if (!execStepsArr || execStepsArr.length === 0) return;
                    var ew = document.createElement('div');
                    ew.className = 'agent-steps exec-steps';
                    var et = document.createElement('button');
                    et.className = 'agent-steps-toggle';
                    et.innerHTML = '<span class="steps-done-icon"><i class="fas fa-bolt"></i></span><span class="toggle-label">Script executed (' + execStepsArr.length + ' steps)</span><i class="fas fa-chevron-right toggle-icon"></i>';
                    ew.appendChild(et);
                    var eb = document.createElement('div');
                    eb.className = 'agent-steps-body collapsed';
                    execStepsArr.forEach(function(s) {
                        var se = document.createElement('div');
                        se.className = 'agent-step';
                        se.innerHTML = '<span class="step-icon done"><i class="fas ' + (s.icon || 'fa-check-circle') + '"></i></span><span class="step-text">' + escapeHtml(s.text) + '</span>';
                        eb.appendChild(se);
                    });
                    ew.appendChild(eb);
                    et.addEventListener('click', function() { this.querySelector('.toggle-icon').classList.toggle('expanded'); eb.classList.toggle('collapsed'); });
                    contentEl.appendChild(ew);
                });
                // Render any data views saved so far
                if (msg.dataViewList && msg.dataViewList.length > 0) {
                    msg.dataViewList.forEach(function(dv) {
                        if (dv.errorText) {
                            contentEl.insertAdjacentHTML('beforeend', '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>' + escapeHtml(dv.errorText) + '</span></div>');
                        } else {
                            if (dv.crmPopupView) {
                                var crmBtnWrapper = document.createElement('div');
                                crmBtnWrapper.className = 'crm-view-btn-wrapper';
                                var crmBtn = document.createElement('button');
                                crmBtn.className = 'crm-view-btn';
                                crmBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> CRM View';
                                (function(code) {
                                    crmBtn.addEventListener('click', function() { executeCScript(code); });
                                })(dv.crmPopupView);
                                crmBtnWrapper.appendChild(crmBtn);
                                contentEl.appendChild(crmBtnWrapper);
                            }
                            var vc = buildMultiViewTabs(dv.viewDataItems || (dv.data ? [dv.data] : []));
                            contentEl.appendChild(vc);
                            if (dv.iframeUrl || dv.crmPopupView) {
                                var iframeWrapper = document.createElement('div');
                                iframeWrapper.className = 'crm-iframe-wrapper';
                                var iframe = document.createElement('iframe');
                                iframe.src = dv.iframeUrl || dv.crmPopupView;
                                iframe.style.width = '100%';
                                iframe.style.height = '500px';
                                iframeWrapper.appendChild(iframe);
                                contentEl.appendChild(iframeWrapper);
                            }
                        }
                    });
                }
                // Show processing indicator
                var procLoader = document.createElement('div');
                procLoader.className = 'thinking-loader';
                procLoader.innerHTML = '<div class="thinking-dots"><span></span><span></span><span></span></div><span class="thinking-label">Processing…</span>';
                contentEl.appendChild(procLoader);
                if (animate) scrollToBottom();
                return;
            }

            // Render agent steps as collapsed summary (on re-render)
            if (msg.agentSteps) {
                const steps = parseResponseIntoSteps(msg.agentSteps);
                if (steps.length > 0) {
                    const stepsWrapper = document.createElement('div');
                    stepsWrapper.className = 'agent-steps';

                    const toggle = document.createElement('button');
                    toggle.className = 'agent-steps-toggle';
                    toggle.innerHTML = `
                        <span class="steps-done-icon"><i class="fas fa-check-circle"></i></span>
                        <span class="toggle-label">Worked through ${steps.length} steps</span>
                        <i class="fas fa-chevron-right toggle-icon"></i>
                    `;
                    stepsWrapper.appendChild(toggle);

                    const body = document.createElement('div');
                    body.className = 'agent-steps-body collapsed';
                    steps.forEach(s => {
                        const stepEl = document.createElement('div');
                        stepEl.className = 'agent-step';
                        stepEl.innerHTML = `<span class="step-icon done"><i class="fas fa-check-circle"></i></span><span class="step-text">${escapeHtml(s)}</span>`;
                        body.appendChild(stepEl);
                    });
                    stepsWrapper.appendChild(body);

                    toggle.addEventListener('click', () => {
                        toggle.querySelector('.toggle-icon').classList.toggle('expanded');
                        body.classList.toggle('collapsed');
                    });

                    contentEl.appendChild(stepsWrapper);
                }
            }

            // Render collapsed exec stepper(s) if present
            var execList = msg.execStepsList || (msg.execSteps ? [msg.execSteps] : []);
            execList.forEach(function(execStepsArr) {
                if (!execStepsArr || execStepsArr.length === 0) return;

                var execWrapper = document.createElement('div');
                execWrapper.className = 'agent-steps exec-steps';

                var execToggle = document.createElement('button');
                execToggle.className = 'agent-steps-toggle';
                execToggle.innerHTML = '<span class="steps-done-icon"><i class="fas fa-bolt"></i></span>' +
                    '<span class="toggle-label">Script executed (' + execStepsArr.length + ' steps)</span>' +
                    '<i class="fas fa-chevron-right toggle-icon"></i>';
                execWrapper.appendChild(execToggle);

                var execBody = document.createElement('div');
                execBody.className = 'agent-steps-body collapsed';
                execStepsArr.forEach(function(s) {
                    var stepEl = document.createElement('div');
                    stepEl.className = 'agent-step';
                    stepEl.innerHTML = '<span class="step-icon done"><i class="fas ' + (s.icon || 'fa-check-circle') + '"></i></span><span class="step-text">' + escapeHtml(s.text) + '</span>';
                    execBody.appendChild(stepEl);
                });
                execWrapper.appendChild(execBody);

                execToggle.addEventListener('click', function() {
                    this.querySelector('.toggle-icon').classList.toggle('expanded');
                    execBody.classList.toggle('collapsed');
                });

                contentEl.appendChild(execWrapper);
            });

            // Render data views if present (using Lyte UI components)
            if (msg.dataViewList && msg.dataViewList.length > 0) {
                msg.dataViewList.forEach(function(dv) {
                    if (dv.errorText) {
                        contentEl.insertAdjacentHTML('beforeend', '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>' + escapeHtml(dv.errorText) + '</span></div>');
                    } else {
                        if (dv.crmPopupView) {
                            var crmBtnWrapper = document.createElement('div');
                            crmBtnWrapper.className = 'crm-view-btn-wrapper';
                            var crmBtn = document.createElement('button');
                            crmBtn.className = 'crm-view-btn';
                            crmBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> CRM View';
                            (function(code) {
                                crmBtn.addEventListener('click', function() { executeCScript(code); });
                            })(dv.crmPopupView);
                            crmBtnWrapper.appendChild(crmBtn);
                            contentEl.appendChild(crmBtnWrapper);
                        }
                        var viewContainer = buildMultiViewTabs(dv.viewDataItems || (dv.data ? [dv.data] : []));
                        contentEl.appendChild(viewContainer);
                        if (dv.iframeUrl || dv.crmPopupView) {
                            var iframeWrapper = document.createElement('div');
                            iframeWrapper.className = 'crm-iframe-wrapper';
                            var iframe = document.createElement('iframe');
                            iframe.src = dv.iframeUrl || dv.crmPopupView;
                            iframe.style.width = '100%';
                            iframe.style.height = '500px';
                            iframeWrapper.appendChild(iframe);
                            contentEl.appendChild(iframeWrapper);
                        }
                    }
                });
            } else if (msg.dataView && msg.dataView.data) {
                if (msg.dataView.crmPopupView) {
                    var crmBtnWrapper = document.createElement('div');
                    crmBtnWrapper.className = 'crm-view-btn-wrapper';
                    var crmBtn = document.createElement('button');
                    crmBtn.className = 'crm-view-btn';
                    crmBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> CRM View';
                    (function(code) {
                        crmBtn.addEventListener('click', function() { executeCScript(code); });
                    })(msg.dataView.crmPopupView);
                    crmBtnWrapper.appendChild(crmBtn);
                    contentEl.appendChild(crmBtnWrapper);
                }
                var viewContainer = buildMultiViewTabs(msg.dataView.viewDataItems || [msg.dataView.data]);
                contentEl.appendChild(viewContainer);
                if (msg.dataView.iframeUrl || msg.dataView.crmPopupView) {
                    var iframeWrapper = document.createElement('div');
                    iframeWrapper.className = 'crm-iframe-wrapper';
                    var iframe = document.createElement('iframe');
                    iframe.src = msg.dataView.iframeUrl || msg.dataView.crmPopupView;
                    iframe.style.width = '100%';
                    iframe.style.height = '500px';
                    iframeWrapper.appendChild(iframe);
                    contentEl.appendChild(iframeWrapper);
                }
            } else if (msg.text) {
                contentEl.innerHTML += formatMarkdown(msg.text);
            }
        }

        if (animate) scrollToBottom();
    }

    // ─── THINKING LOADER ───────────────────────────────────
    function showThinkingLoader() {
        const div = document.createElement('div');
        div.className = 'message assistant';
        div.id = 'thinking-message';
        div.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-body">
                <div class="message-sender">WorkPilot</div>
                <div class="thinking-loader">
                    <div class="thinking-dots"><span></span><span></span><span></span></div>
                    <span class="thinking-label">Thinking…</span>
                </div>
            </div>
        `;
        messagesWrapper.appendChild(div);
        scrollToBottom();
    }

    function removeThinkingLoader() {
        const el = document.getElementById('thinking-message');
        if (el) el.remove();
    }

    // ─── AGENT STEPS UI (Copilot-like thinking stepper) ────
    // Parses the response.content into logical steps and animates them
    function parseResponseIntoSteps(text) {
        if (!text) return [];
        const steps = [];
        const lines = text.split('\n').filter(l => l.trim());
        for (const line of lines) {
            const trimmed = line.trim();
            // Skip empty / section headers that are too short
            if (!trimmed) continue;
            // Merge small lines into previous step
            if (steps.length > 0 && trimmed.length < 15 && !/^\d+\./.test(trimmed) && !/^-/.test(trimmed)) {
                steps[steps.length - 1] += ' ' + trimmed;
            } else {
                steps.push(trimmed);
            }
        }
        return steps;
    }

    function createAgentStepsContainer(parentEl) {
        const wrapper = document.createElement('div');
        wrapper.className = 'agent-steps';

        // Toggle button
        const toggle = document.createElement('button');
        toggle.className = 'agent-steps-toggle';
        toggle.innerHTML = `
            <span class="steps-spinner"></span>
            <span class="toggle-label">Working…</span>
            <i class="fas fa-chevron-right toggle-icon expanded"></i>
        `;
        wrapper.appendChild(toggle);

        // Steps body (collapsible)
        const body = document.createElement('div');
        body.className = 'agent-steps-body';
        wrapper.appendChild(body);

        // Toggle collapse (use onclick to avoid duplicate handlers after innerHTML replace)
        toggle.onclick = function() {
            var icon = toggle.querySelector('.toggle-icon');
            if (icon) icon.classList.toggle('expanded');
            body.classList.toggle('collapsed');
        };

        parentEl.appendChild(wrapper);
        return { wrapper, toggle, body };
    }

    async function animateAgentSteps(stepsContainer, steps) {
        const { toggle, body } = stepsContainer;
        const totalSteps = steps.length;

        for (let idx = 0; idx < totalSteps; idx++) {
            const stepText = steps[idx];
            // Update toggle label
            toggle.querySelector('.toggle-label').textContent = `Working… (${idx + 1}/${totalSteps})`;

            // Create step element
            const step = document.createElement('div');
            step.className = 'agent-step';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'step-icon spinning';
            step.appendChild(iconSpan);

            const textSpan = document.createElement('span');
            textSpan.className = 'step-text';
            step.appendChild(textSpan);

            body.appendChild(step);
            scrollToBottom();

            // Typewriter reveal each step
            await typewriterStep(textSpan, stepText);

            // Mark step as done
            iconSpan.className = 'step-icon done';
            iconSpan.innerHTML = '<i class="fas fa-check-circle"></i>';

            // Small pause between steps
            await sleep(200);
        }

        // All done – update toggle to "done" state
        toggle.innerHTML = `
            <span class="steps-done-icon"><i class="fas fa-check-circle"></i></span>
            <span class="toggle-label">Worked through ${totalSteps} steps</span>
            <i class="fas fa-chevron-right toggle-icon expanded"></i>
        `;

        // onclick is already set on toggle from createAgentStepsContainer — no re-bind needed

        // Auto-collapse after a brief moment
        await sleep(600);
        body.classList.add('collapsed');
        toggle.querySelector('.toggle-icon').classList.remove('expanded');
    }

    function typewriterStep(container, text, speed = 12) {
        return new Promise(resolve => {
            const marquee = document.createElement('span');
            marquee.className = 'step-marquee';
            const cursor = document.createElement('span');
            cursor.className = 'step-cursor';
            container.appendChild(marquee);
            container.appendChild(cursor);

            let i = 0;
            function type() {
                if (i < text.length) {
                    const chunk = text.substring(i, i + 4);
                    marquee.textContent += chunk;
                    i += 4;
                    scrollToBottom();
                    setTimeout(type, speed);
                } else {
                    cursor.remove();
                    resolve();
                }
            }
            type();
        });
    }

    // ─── EXEC LOADER ──────────────────────────────────────
    function showExecLoader(parentEl, explanation) {
        const loader = document.createElement('div');
        loader.className = 'exec-loader';
        loader.id = 'exec-loader';
        loader.innerHTML = `
            <div class="exec-spinner"></div>
            <span class="exec-loader-text">Executing: ${escapeHtml(explanation)}</span>
        `;
        parentEl.appendChild(loader);
        scrollToBottom();
    }

    function removeExecLoader() {
        const el = document.getElementById('exec-loader');
        if (el) el.remove();
    }

    // ─── CRM FUNCTION CALL (primary) ───────────────────────
    // Calls ZOHO.CRM.FUNCTIONS.execute or REST API to get AI-generated cscript
    var _lastPrompt = '';

    async function callCRMFunction(prompt, history) {
        _lastPrompt = prompt;

        var isInIframe = window.parent !== window;

        // 1) Try ZOHO.CRM.HTTP.post (routes through Zoho's proxy — no CORS/mTLS issues)
        try {
            if (isInIframe && typeof ZOHO !== 'undefined' && ZOHO.CRM && ZOHO.CRM.HTTP && typeof ZOHO.CRM.HTTP.post === 'function') {
                // var apiUrl = 'https://crmdx4.localzoho.com/crm/v7/functions/' + CRM_FUNC_NAME + '/actions/execute?auth_type=apikey&zapikey=' + CRM_FUNC_API_KEY;
                var apiUrl = "http://10.59.2.220:8000/chat";
                var httpData = await ZOHO.CRM.HTTP.post({
                    url: apiUrl,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt, history: history || [], model: 'gpt-5.1', mode: 'agent', feature: 'cscript' })
                });
                console.log('prompt', prompt, "response", httpData);

                var parsed = null;
                if (typeof httpData === 'string') {
                    try { parsed = JSON.parse(httpData); } catch(e) { parsed = null; }
                } else {
                    parsed = httpData;
                }

                if (parsed) {
                    // Handle Zoho wrapper: details.output contains the actual response
                    if (parsed.details && parsed.details.output) {
                        parsed = typeof parsed.details.output === 'string' ? JSON.parse(parsed.details.output) : parsed.details.output;
                    }
                    var edits = (parsed && Array.isArray(parsed.edits)) ? parsed.edits : [];
                    console.log("response edits", edits);
                    var hasScript = edits.length > 0 && edits.some(function(e) { return e && e.content; });
                    if (hasScript || (parsed.response && parsed.response.content)) {
                        return parsed;
                    }
                }
                console.log('[WorkPilot] ZOHO.CRM.HTTP.post returned no usable data.');
            }
        } catch (httpErr) {
            console.log('[WorkPilot] ZOHO.CRM.HTTP.post failed:', httpErr.message || httpErr);
        }

        // If both fail, return null to trigger callAPI fallback (mock data)
        return null;
    }

    // ─── FETCH API CALL (backup) ───────────────────────────

    async function callAPI(prompt, history) {
        _lastPrompt = prompt;
        // history is available here for future real API integration
        // console.log("sending API request with prompt:", prompt);
        // const requestOptions = {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: JSON.stringify({ prompt: prompt, model: 'gpt-5.1', mode: 'agent', feature: 'cscript' })
        // };

        // try {
        //     const response = await fetch(CRM_FUNC_URL, requestOptions);
        //     const text = await response.text();
        //     var parsed = JSON.parse(text);
        //     console.log("parsed response:", parsed);
        //     if(!parsed || !parsed.error) {
        //         return parsed;
        //     }
            
        //     // Validate that the API actually returned usable edits with script content
        //     // var edits = (parsed && Array.isArray(parsed.edits)) ? parsed.edits : [];
        //     // var hasScript = edits.length > 0 && edits.some(function(e) { return e && e.content; });
        //     // if (hasScript) {
        //         // return parsed;
        //     // }
        //     // console.log("No edits found:", edits);
        //     // API returned response but no script — fall through to fallback
        //     // console.warn('[WorkPilot] API returned no script content, using fallback script.');
        // } catch (err) {
        //     console.warn('[WorkPilot] API call failed, using fallback script:', err.message);
        // }

        // ── Fallback: build a response with a hardcoded script for this prompt ──
        console.log("fallback mockup  execution for prompt:", prompt);
        var fallbackKey = getMockKey(prompt);
        var fb = FALLBACK_SCRIPTS[fallbackKey] || FALLBACK_SCRIPTS.records;
        return {
            response: { content: 'Using fallback script: **' + fb.explanation + '**\nExecuting client script against your CRM data.' },
            edits: [{ type: 'replace_file', explanation: fb.explanation, content: fb.content }]
        };
    }

    // ─── executeCScript ────────────────────────────────────
    // Executes the client script code via CScriptBridge and returns data.
    // Returns { type: 'views', data: [...], crmPopupView, crmPopupView } on success
    // Returns { type: 'errors', data: 'error message' } on error
    // Falls back to mock results if CScriptBridge is unavailable or fails.
    async function executeCScript(code) {
        try {
            if (typeof CScriptBridge !== 'undefined' && CScriptBridge && typeof CScriptBridge.run === 'function') {
                console.log('sent CScript via CScriptBridge…');
                var result = await CScriptBridge.run(code);
                if (result.data && result.data.type === 'errors') {
                    console.warn('[WorkPilot] CScript returned error:', result.data);
                    return result.data;
                }
                console.log('CScript result came');
                console.log('final result', result);
                return result.data;
            } else {
                console.warn('[WorkPilot] CScriptBridge not available, falling back to mock.');
            }
        } catch (err) {
            console.warn('[WorkPilot] CScriptBridge.run failed, falling back to mock:', err.message);
        }

        // ── Fallback to mock data ──
        await sleep(800 + Math.random() * 500);

        var key = getMockKey(_lastPrompt);

        // Simulate error for error scenario
        if (key === 'error') {
            return { type: 'errors', data: 'Module not found: risk_analysis is not available in your CRM plan.' };
        }

        var mockData = MOCK_CSCRIPT_RESULTS[key] !== undefined ? MOCK_CSCRIPT_RESULTS[key] : MOCK_CSCRIPT_RESULTS.records;
        return { type: 'views', data: [mockData], crmPopupView: null, crmPopupView: null };
    }

    // Execution steps derived from the script content
    function parseScriptIntoExecSteps(code, explanation) {
        const steps = [];
        if (explanation) {
            steps.push({ text: explanation, icon: 'fa-file-code' });
        }
        // Detect common patterns in the script to create meaningful steps
        if (/showLoader|showProgress/i.test(code)) {
            steps.push({ text: 'Initializing client environment…', icon: 'fa-cog' });
        }
        if (/zrc\.request|fetch|ajax/i.test(code)) {
            const urlMatch = code.match(/url:\s*["']([^"']+)["']/i);
            const endpoint = urlMatch ? urlMatch[1] : 'CRM API';
            steps.push({ text: `Calling ${endpoint}…`, icon: 'fa-plug' });
        }
        if (/params|per_page|page/i.test(code)) {
            steps.push({ text: 'Setting query parameters…', icon: 'fa-sliders-h' });
        }
        steps.push({ text: 'Executing client script…', icon: 'fa-play' });
        if (/\.data\.data|response\.data/i.test(code)) {
            steps.push({ text: 'Processing response data…', icon: 'fa-database' });
        }
        if (/for\s*\(|forEach|map/i.test(code)) {
            steps.push({ text: 'Transforming records…', icon: 'fa-sync-alt' });
        }
        steps.push({ text: 'Preparing results for display…', icon: 'fa-check-double' });
        return steps;
    }

    async function showExecStepper(parentEl, code, explanation) {
        const steps = parseScriptIntoExecSteps(code, explanation);

        const wrapper = document.createElement('div');
        wrapper.className = 'agent-steps exec-steps';

        const toggle = document.createElement('button');
        toggle.className = 'agent-steps-toggle';
        toggle.innerHTML = `
            <span class="steps-spinner"></span>
            <span class="toggle-label">Executing script…</span>
            <i class="fas fa-chevron-right toggle-icon expanded"></i>
        `;
        wrapper.appendChild(toggle);

        const body = document.createElement('div');
        body.className = 'agent-steps-body';
        wrapper.appendChild(body);

        // Use onclick to avoid duplicate handlers after innerHTML replace
        toggle.onclick = function() {
            var icon = toggle.querySelector('.toggle-icon');
            if (icon) icon.classList.toggle('expanded');
            body.classList.toggle('collapsed');
        };

        parentEl.appendChild(wrapper);
        scrollToBottom();

        // Animate steps
        for (let idx = 0; idx < steps.length; idx++) {
            const s = steps[idx];
            toggle.querySelector('.toggle-label').textContent = `Executing… (${idx + 1}/${steps.length})`;

            const stepEl = document.createElement('div');
            stepEl.className = 'agent-step';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'step-icon spinning';
            stepEl.appendChild(iconSpan);

            const textSpan = document.createElement('span');
            textSpan.className = 'step-text';
            stepEl.appendChild(textSpan);

            body.appendChild(stepEl);
            scrollToBottom();

            await typewriterStep(textSpan, s.text);

            iconSpan.className = 'step-icon done';
            iconSpan.innerHTML = `<i class="fas ${s.icon}"></i>`;

            await sleep(300 + Math.random() * 400);
        }

        // Done state
        toggle.innerHTML = `
            <span class="steps-done-icon"><i class="fas fa-bolt"></i></span>
            <span class="toggle-label">Script executed (${steps.length} steps)</span>
            <i class="fas fa-chevron-right toggle-icon expanded"></i>
        `;
        // onclick is already set on toggle — no re-bind needed

        await sleep(500);
        body.classList.add('collapsed');
        toggle.querySelector('.toggle-icon').classList.remove('expanded');

        return wrapper;
    }

    // ─── SEND MESSAGE FLOW ─────────────────────────────────
    async function sendMessage(text) {
        if (isProcessing || !text.trim()) return;
        isProcessing = true;
        sendBtn.disabled = true;

        const session = getActiveSession();

        // Hide welcome
        welcomeScreen.classList.add('hidden');

        // Add user message
        const userMsg = { id: uid(), role: 'user', text: text.trim(), ts: Date.now() };
        session.messages.push(userMsg);
        appendMessageToDOM(userMsg, true);

        // Update session title from first message
        if (session.messages.length === 1) {
            session.title = text.trim().substring(0, 50) + (text.length > 50 ? '…' : '');
            currentSessionTitle.textContent = session.title;
            renderSessionList();
        }

        saveSessions();
        promptInput.value = '';
        autoResizeTextarea();

        // Show thinking
        showThinkingLoader();

        try {
            // 1) Build conversation history (all turns before this new message)
            var convHistory = buildConversationHistory(session.messages.slice(0, -1));

            // 2) Enrich prompt with persistent memory context
            var memorySummary = Memory.getSummary();
            var enrichedPrompt = memorySummary
                ? '[Memory context: ' + memorySummary + ']\n\n' + text.trim()
                : text.trim();

            // 3) Call CRM Function (primary: ZOHO SDK → REST proxy)
            var apiResult = await callCRMFunction(enrichedPrompt, convHistory);
            if (!apiResult) {
                console.log("expected results not received from CRM function, using fallback Mockup call");
                apiResult = await callAPI(enrichedPrompt, convHistory);
            }
            removeThinkingLoader();

            // 2) Safely extract response parts
            const responseText = (apiResult && apiResult.response && apiResult.response.content) ? apiResult.response.content : '';
            const edits = (apiResult && Array.isArray(apiResult.edits)) ? apiResult.edits : [];
            const hasEdits = edits.length > 0 && edits.some(function(e) { return e && e.content; });

            // 3) Create assistant message container
            const assistantMsg = { id: uid(), role: 'assistant', text: '', ts: Date.now(), processing: true };
            _processingSessionId = session.id;
            _processingMsgId = assistantMsg.id;
            session.messages.push(assistantMsg);
            saveSessions();

            // Build context badge row (shown in chat header when memory/history is active)
            var ctxBadges = '';
            if (memorySummary) {
                ctxBadges += '<span class="ctx-badge memory-badge"><i class="fas fa-brain"></i> Memory</span>';
            }
            if (convHistory.length > 0) {
                ctxBadges += '<span class="ctx-badge history-badge"><i class="fas fa-history"></i> ' + convHistory.length + ' turn' + (convHistory.length > 1 ? 's' : '') + '</span>';
            }
            var ctxBadgeRowHtml = ctxBadges ? '<div class="ctx-badge-row">' + ctxBadges + '</div>' : '';

            const msgDiv = document.createElement('div');
            msgDiv.className = 'message assistant';
            msgDiv.innerHTML = `
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-body">
                    <div class="message-sender">WorkPilot${ctxBadgeRowHtml}</div>
                    <div class="message-content" id="msg-${assistantMsg.id}"></div>
                </div>
            `;
            messagesWrapper.appendChild(msgDiv);

            const contentEl = msgDiv.querySelector('.message-content');

            // ───────────────────────────────────────────────
            // PATH A: No edits → show response.content as readable output
            // ───────────────────────────────────────────────
            if (!hasEdits) {
                assistantMsg.text = responseText;
                contentEl.innerHTML = formatMarkdown(responseText);
                saveSessions();
                scrollToBottom();
                return;
            }

            // ───────────────────────────────────────────────
            // PATH B: Edits present → thinking steps + execute each script
            // ───────────────────────────────────────────────
            assistantMsg.agentSteps = responseText;
            saveSessions();

            // 4) Show response.content as agent thinking steps
            const steps = parseResponseIntoSteps(responseText);
            if (steps.length > 0) {
                const stepsUI = createAgentStepsContainer(contentEl);
                await animateAgentSteps(stepsUI, steps);
            }

            // 5) Loop through each edit with type replace_file and execute
            var allExecSteps = [];
            var allDataViews = [];

            for (var ei = 0; ei < edits.length; ei++) {
                var edit = edits[ei];
                if (!edit || !edit.content) continue;

                var scriptContent = edit.content;
                var explanation = edit.explanation || ('Script ' + (ei + 1));

                // Save exec steps metadata
                var execStepsMeta = parseScriptIntoExecSteps(scriptContent, explanation);
                allExecSteps.push(execStepsMeta);
                // Incrementally save so re-render shows partial progress
                assistantMsg.execStepsList = allExecSteps.slice();
                assistantMsg.execSteps = allExecSteps[0];
                saveSessions();

                // Run the stepper animation and executeCScript in parallel
                var cscriptResult;
                var execError = null;
                console.log('Gonna pass cscript content: -- ', scriptContent);
                await Promise.all([
                    showExecStepper(contentEl, scriptContent, explanation),
                    executeCScript(scriptContent)
                        .then(function(result) { cscriptResult = result; })
                        .catch(function(err) { execError = err; })
                ]);

                if (execError) {
                    var execErrText = 'Script execution failed: ' + (execError.message || String(execError));
                    var errorHtml = '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>' + escapeHtml(execErrText) + '</span></div>';
                    contentEl.insertAdjacentHTML('beforeend', errorHtml);
                    allDataViews.push({ errorText: execErrText });
                    continue;
                }

                // 6) Detect result type and render appropriate Lyte UI view
                if (cscriptResult !== null && cscriptResult !== undefined) {
                    console.log('CScript result came', cscriptResult);

                    // ─── Error result ───
                    if (cscriptResult.type === 'errors') {
                        var cscriptErrText = cscriptResult.data || 'Unknown error';
                        var errHtml = '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>' + escapeHtml(String(cscriptErrText)) + '</span></div>';
                        contentEl.insertAdjacentHTML('beforeend', errHtml);
                        allDataViews.push({ errorText: String(cscriptErrText) });
                        continue;
                    }

                    // ─── Views result ───
                    var crmPopupCode = cscriptResult.crmPopupView || null;
                    var resolvedIframeUrl = cscriptResult.crmPopupView || null;

                    // CRM Popup View button (above response component)
                    if (crmPopupCode) {
                        var crmBtnWrapper = document.createElement('div');
                        crmBtnWrapper.className = 'crm-view-btn-wrapper';
                        var crmBtn = document.createElement('button');
                        crmBtn.className = 'crm-view-btn';
                        crmBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> CRM View';
                        (function(code) {
                            crmBtn.addEventListener('click', function() { executeCScript(code); });
                        })(crmPopupCode);
                        crmBtnWrapper.appendChild(crmBtn);
                        contentEl.appendChild(crmBtnWrapper);
                    }

                    // Render each data item in result.data
                    var viewDataItems = Array.isArray(cscriptResult.data) ? cscriptResult.data : [cscriptResult.data];
                    console.log('[WorkPilot] viewDataItems:', viewDataItems);
                    var multiTabsContainer = buildMultiViewTabs(viewDataItems);
                    contentEl.appendChild(multiTabsContainer);

                    // CRM Iframe View (render below response component)
                    // resolvedIframeUrl is a script — execute it in the parent CRM to get the actual URL
                    if (resolvedIframeUrl && typeof resolvedIframeUrl === 'string') {
                        try {
                            var iframeScriptResult = await executeCScript(resolvedIframeUrl);
                            var actualIframeUrl = null;
                            if (typeof iframeScriptResult === 'string') {
                                actualIframeUrl = iframeScriptResult;
                            } else if (iframeScriptResult && typeof iframeScriptResult === 'object') {
                                actualIframeUrl = iframeScriptResult.url || iframeScriptResult.iframeUrl || iframeScriptResult.link || null;
                            }
                            if (actualIframeUrl) {
                                var iframeWrapper = document.createElement('div');
                                iframeWrapper.className = 'crm-iframe-wrapper';
                                var iframe = document.createElement('iframe');
                                iframe.src = actualIframeUrl;
                                iframe.style.width = '100%';
                                iframe.style.height = '500px';
                                iframeWrapper.appendChild(iframe);
                                contentEl.appendChild(iframeWrapper);
                                resolvedIframeUrl = actualIframeUrl; // store resolved URL for session save
                            } else {
                                console.warn('[WorkPilot] Iframe script did not return a valid URL:', iframeScriptResult);
                                resolvedIframeUrl = null;
                            }
                        } catch (iframeErr) {
                            console.warn('[WorkPilot] Failed to resolve iframe URL via script:', iframeErr);
                            resolvedIframeUrl = null;
                        }
                    }

                    allDataViews.push({ viewDataItems: viewDataItems, crmPopupView: crmPopupCode, iframeUrl: resolvedIframeUrl });
                }
                // Incrementally save data views
                assistantMsg.dataViewList = allDataViews.slice();
                assistantMsg.dataView = allDataViews[0];
                saveSessions();
            }

            // ─── Auto-extract facts from AI response and show memory chip if found ───
            var extractedFacts = Memory.extractAndStore(responseText);
            if (extractedFacts.length > 0) {
                var factsHtml = extractedFacts.map(function(f) {
                    return '<span class="memory-fact">' + escapeHtml(f.key) + ' = \u201c' + escapeHtml(f.value) + '\u201d</span>';
                }).join('');
                var memChip = document.createElement('div');
                memChip.className = 'memory-chip';
                memChip.innerHTML = '<i class="fas fa-brain"></i><span class="memory-chip-label">Memory updated:</span>' + factsHtml;
                contentEl.appendChild(memChip);
                scrollToBottom();
            }

            // Save final metadata for re-render on session reload
            if (allExecSteps.length > 0) {
                assistantMsg.execStepsList = allExecSteps;
                assistantMsg.execSteps = allExecSteps[0];
            }
            if (allDataViews.length >= 1) {
                assistantMsg.dataViewList = allDataViews;
                assistantMsg.dataView = allDataViews[0];
            }

            // Mark processing complete
            assistantMsg.processing = false;
            _processingSessionId = null;
            _processingMsgId = null;
            saveSessions();

            // Only re-render if user switched away and back during processing
            // (if they stayed, the DOM is already correct from live rendering)
            if (_userSwitchedDuringProcessing && activeSessionId === session.id) {
                _userSwitchedDuringProcessing = false;
                renderActiveChat();
            }
            _userSwitchedDuringProcessing = false;

        } catch (err) {
            removeThinkingLoader();
            // Clear processing flag on the in-progress message if it exists
            if (_processingMsgId) {
                var procMsg = session.messages.find(function(m) { return m.id === _processingMsgId; });
                if (procMsg) procMsg.processing = false;
            }
            _processingSessionId = null;
            _processingMsgId = null;
            var errMsg = { id: uid(), role: 'assistant', text: 'Something went wrong: ' + err.message, error: true, ts: Date.now() };
            session.messages.push(errMsg);
            appendMessageToDOM(errMsg, true);
            saveSessions();
        } finally {
            isProcessing = false;
            sendBtn.disabled = false;
            scrollToBottom();
        }
    }

    // ─── DATA TYPE DETECTION ───────────────────────────────
    function detectDataType(data) {
        if (data === null || data === undefined) return 'empty';
        if (typeof data === 'string') return 'string';
        if (typeof data === 'number') return 'number';
        if (typeof data === 'boolean') return 'boolean';
        if (Array.isArray(data)) {
            if (data.length === 0) return 'empty';
            if (data.every(function(it) { return typeof it === 'string'; })) return 'string-list';
            if (data.every(function(it) { return typeof it === 'number'; })) return 'number-list';
            if (data.every(function(it) { return typeof it === 'object' && it !== null && !Array.isArray(it); })) return 'records';
            return 'mixed-list';
        }
        if (typeof data === 'object') return 'single';
        return 'unknown';
    }

    // ─── VIEW CONFIGS PER DATA TYPE ────────────────────────
    function getViewsForType(dataType) {
        switch (dataType) {
            case 'records':
                return [
                    { key: 'list',    icon: 'fa-th-large',  label: 'Cards' },
                    { key: 'table',   icon: 'fa-table',     label: 'Table' },
                    { key: 'kanban',  icon: 'fa-columns',   label: 'Kanban' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' }
                ];
            case 'single':
                return [
                    { key: 'detail',  icon: 'fa-id-card',   label: 'Detail' },
                    { key: 'json',    icon: 'fa-code',      label: 'JSON' }
                ];
            case 'string':
                return [
                    { key: 'text',    icon: 'fa-align-left', label: 'Text' },
                    { key: 'json',    icon: 'fa-code',       label: 'Raw' }
                ];
            case 'string-list':
                return [
                    { key: 'slist',   icon: 'fa-list-ul',   label: 'List' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' }
                ];
            case 'number-list':
                return [
                    { key: 'slist',   icon: 'fa-list-ol',   label: 'List' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' },
                    { key: 'table',   icon: 'fa-table',     label: 'Table' }
                ];
            case 'number':
            case 'boolean':
                return [
                    { key: 'stat',    icon: 'fa-hashtag',   label: 'Value' }
                ];
            case 'mixed-list':
                return [
                    { key: 'slist',   icon: 'fa-list',      label: 'List' },
                    { key: 'json',    icon: 'fa-code',      label: 'JSON' }
                ];
            default:
                return [
                    { key: 'text',    icon: 'fa-align-left', label: 'Text' }
                ];
        }
    }

    function getDefaultView(dataType) {
        switch (dataType) {
            case 'records':     return 'list';
            case 'single':      return 'detail';
            case 'string':      return 'text';
            case 'string-list': return 'slist';
            case 'number-list': return 'chart';
            case 'number':      return 'stat';
            case 'boolean':     return 'stat';
            case 'mixed-list':  return 'slist';
            default:            return 'text';
        }
    }

    // ─── DATA VIEW BUILDER ─────────────────────────────────
    function buildDataView(data, initialView) {
        const container = document.createElement('div');
        container.className = 'data-view-container';

        var dataType = detectDataType(data);

        // Empty / null
        if (dataType === 'empty') {
            container.innerHTML = '<div class="string-response"><i class="fas fa-info-circle" style="margin-right:6px;color:var(--text-secondary)"></i>No data returned.</div>';
            return container;
        }

        // Determine available views and default
        var availableViews = getViewsForType(dataType);
        var defaultView = initialView || getDefaultView(dataType);
        // If the requested initial view isn't available for this type, use the type's default
        if (!availableViews.some(function(v) { return v.key === defaultView; })) {
            defaultView = availableViews[0].key;
        }

        // Normalize data for renderers
        var normalized = normalizeForRender(data, dataType);

        // Build toolbar (skip for single-value types with only 1 view)
        var toolbar = document.createElement('div');
        toolbar.className = 'data-view-toolbar';

        var tabs = document.createElement('div');
        tabs.className = 'view-tabs';

        var body = document.createElement('div');
        body.className = 'data-view-body';

        availableViews.forEach(function(v) {
            var btn = document.createElement('button');
            btn.className = 'view-tab' + (v.key === defaultView ? ' active' : '');
            btn.innerHTML = '<i class="fas ' + v.icon + '"></i><span>' + v.label + '</span>';
            btn.dataset.view = v.key;
            btn.addEventListener('click', function() {
                tabs.querySelectorAll('.view-tab').forEach(function(t) { t.classList.remove('active'); });
                btn.classList.add('active');
                renderSmartView(body, normalized, v.key, dataType);
            });
            tabs.appendChild(btn);
        });

        var actions = document.createElement('div');
        actions.className = 'data-view-actions';
        var expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.innerHTML = '<i class="fas fa-expand"></i> Expand';
        expandBtn.addEventListener('click', function() {
            openViewModal(data, tabs.querySelector('.view-tab.active').dataset.view);
        });
        actions.appendChild(expandBtn);

        toolbar.appendChild(tabs);
        toolbar.appendChild(actions);
        container.appendChild(toolbar);
        container.appendChild(body);

        renderSmartView(body, normalized, defaultView, dataType);

        return container;
    }

    function normalizeForRender(data, dataType) {
        switch (dataType) {
            case 'records':     return data;
            case 'single':      return Array.isArray(data) ? data : [data];
            case 'string':      return data;
            case 'number':      return data;
            case 'boolean':     return data;
            case 'string-list': return data;
            case 'number-list': return data;
            case 'mixed-list':  return data;
            default:            return data;
        }
    }

    // ─── LYTE VIEW BUILDER (uses Lyte UI Components) ─────
    // Parallel to buildDataView — uses lyte-table, lyte-kanbanview, lyte-chart via Lyte.Component.render()
    var _lyteViewCounter = 0;

    function getLyteViewsForType(dataType) {
        switch (dataType) {
            case 'records':
                return [
                    { key: 'list',    icon: 'fa-th-large',  label: 'Cards' },
                    { key: 'table',   icon: 'fa-table',     label: 'Table' },
                    { key: 'kanban',  icon: 'fa-columns',   label: 'Kanban' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' }
                ];
            case 'single':
                return [
                    { key: 'detail',  icon: 'fa-id-card',   label: 'Detail' },
                    { key: 'json',    icon: 'fa-code',      label: 'JSON' }
                ];
            case 'string':
                return [
                    { key: 'text',    icon: 'fa-align-left', label: 'Text' },
                    { key: 'json',    icon: 'fa-code',       label: 'Raw' }
                ];
            case 'string-list':
                return [
                    { key: 'slist',   icon: 'fa-list-ul',   label: 'List' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' }
                ];
            case 'number-list':
                return [
                    { key: 'slist',   icon: 'fa-list-ol',   label: 'List' },
                    { key: 'chart',   icon: 'fa-chart-bar', label: 'Chart' },
                    { key: 'table',   icon: 'fa-table',     label: 'Table' }
                ];
            case 'number':
            case 'boolean':
                return [
                    { key: 'stat',    icon: 'fa-hashtag',   label: 'Value' }
                ];
            case 'mixed-list':
                return [
                    { key: 'slist',   icon: 'fa-list',      label: 'List' },
                    { key: 'json',    icon: 'fa-code',      label: 'JSON' }
                ];
            default:
                return [
                    { key: 'text',    icon: 'fa-align-left', label: 'Text' }
                ];
        }
    }

    function getLyteDefaultView(dataType) {
        switch (dataType) {
            case 'records':     return 'table';
            case 'single':      return 'detail';
            case 'string':      return 'text';
            case 'string-list': return 'slist';
            case 'number-list': return 'chart';
            case 'number':      return 'stat';
            case 'boolean':     return 'stat';
            case 'mixed-list':  return 'slist';
            default:            return 'text';
        }
    }

    // ─── CELL VALUE SERIALIZER ───────────────────────────
    // Converts any value (string, number, nested object, array) into readable text for table/card display.
    function serializeCellValue(val) {
        if (val === null || val === undefined) return '—';
        if (typeof val === 'string') return val;
        if (typeof val === 'number' || typeof val === 'boolean') return String(val);

        // Arrays
        if (Array.isArray(val)) {
            if (val.length === 0) return '—';
            // Array of primitives → join with comma
            if (val.every(function(v) { return typeof v !== 'object' || v === null; })) {
                return val.map(function(v) { return v !== null && v !== undefined ? String(v) : ''; }).join(', ');
            }
            // Array of objects → extract labels
            return val.map(function(v) { return extractObjectLabel(v); }).join(', ');
        }

        // Object
        if (typeof val === 'object') {
            return extractObjectLabel(val);
        }

        return String(val);
    }

    // Extracts a human-readable label from an object by checking common CRM identifier fields.
    function extractObjectLabel(obj) {
        if (obj === null || obj === undefined) return '—';
        if (typeof obj !== 'object') return String(obj);

        // Priority order of keys to look for a display label
        var labelKeys = [
            'name', 'Name', 'display_name', 'Display_Name',
            'Full_Name', 'full_name', 'First_Name', 'Last_Name',
            'title', 'Title', 'label', 'Label',
            'email', 'Email',
            'subject', 'Subject',
            'module', 'Module'
        ];

        for (var i = 0; i < labelKeys.length; i++) {
            if (obj[labelKeys[i]] !== null && obj[labelKeys[i]] !== undefined && obj[labelKeys[i]] !== '') {
                return String(obj[labelKeys[i]]);
            }
        }

        // Check for id-only objects (common in CRM lookups)
        var idVal = obj.id || obj.Id || obj.ID;
        if (idVal) return 'ID: ' + String(idVal);

        // Fallback: first non-null primitive value
        var objKeys = Object.keys(obj);
        for (var j = 0; j < objKeys.length; j++) {
            var v = obj[objKeys[j]];
            if (v !== null && v !== undefined && typeof v !== 'object') {
                return String(v);
            }
        }

        // Last resort: compact JSON (truncated)
        try {
            var json = JSON.stringify(obj);
            return json.length > 60 ? json.substring(0, 57) + '…' : json;
        } catch (e) {
            return '[Object]';
        }
    }

    // Transforms raw data array into lyte-table header/content format
    function toLyteTableData(items) {
        if (!Array.isArray(items) || items.length === 0) return { header: [], content: [] };

        // Normalize primitives into objects
        var normalized = items.map(function(item, idx) {
            if (typeof item !== 'object' || item === null) {
                return { '#': idx + 1, 'Value': item };
            }
            return item;
        });

        var keys = [];
        var keysSet = {};
        normalized.forEach(function(item) {
            Object.keys(item).forEach(function(k) {
                if (!keysSet[k]) {
                    keysSet[k] = true;
                    keys.push(k);
                }
            });
        });

        var header = keys.map(function(k) {
            return { name: formatFieldName(k), body: k };
        });

        // Serialize all values to readable strings for the table
        var content = normalized.map(function(item) {
            var row = {};
            keys.forEach(function(k) {
                var val = item[k];
                row[k] = serializeCellValue(val);
            });
            return row;
        });

        return { header: header, content: content };
    }

    // Transforms raw data array into lyte-kanbanview board details format
    function toLyteKanbanData(items) {
        if (!Array.isArray(items) || items.length === 0) return [];

        var groupKey = findGroupKey(items);
        var titleKey = Object.keys(items[0] || {}).find(function(k) {
            return /name|title|label/i.test(k);
        }) || Object.keys(items[0] || {})[0];

        var groups = {};
        var groupOrder = [];
        items.forEach(function(item) {
            var groupVal = (item[groupKey] !== null && item[groupKey] !== undefined) ? String(item[groupKey]) : 'Ungrouped';
            if (!groups[groupVal]) {
                groups[groupVal] = [];
                groupOrder.push(groupVal);
            }

            // Build card with _title and _fields for template rendering
            var card = { _title: serializeCellValue(item[titleKey]) || '(No Name)', _fields: [] };
            Object.keys(item).forEach(function(k) {
                if (k === titleKey || k === groupKey) return;
                var val = item[k];
                if (val === null || val === undefined) return;
                card._fields.push({ label: formatFieldName(k), value: serializeCellValue(val) });
            });
            // Copy original fields for reference
            Object.keys(item).forEach(function(k) { card[k] = item[k]; });
            groups[groupVal].push(card);
        });

        return groupOrder.map(function(groupName, idx) {
            return {
                id: 'board_' + idx,
                title: groupName,
                cards: groups[groupName]
            };
        });
    }

    // Transforms raw data into lyte-chart series/meta format
    // ZC Charts expects:
    //   seriesData: { chartdata: [{ data: [[[label, val]], ...] }] }
    //   metaDataAxes: { x: [colIdx], y: [[colIdx]], tooltip: [colIdx, colIdx] }
    //   metaDataColumns: [{ dataindex: N, columnname: 'Name', datatype: 'ordinal'|'numeric' }]
    function toLyteChartData(data) {
        var chartData = [];
        var columns = [];
        var axes = { x: [0], y: [[1]], tooltip: [0, 1] };

        if (Array.isArray(data) && data.length > 0) {
            if (typeof data[0] === 'number') {
                // Number array → bar chart with index labels
                var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                chartData = data.map(function(val, idx) {
                    var label = data.length <= 12 ? (monthNames[idx] || 'M' + (idx + 1)) : String(idx + 1);
                    return [[label, val]];
                });
                columns = [
                    { dataindex: 0, columnname: 'Label', datatype: 'ordinal' },
                    { dataindex: 1, columnname: 'Value', datatype: 'numeric' }
                ];
            } else if (typeof data[0] === 'string') {
                // String array → frequency chart (count occurrences of each unique value)
                var freqMap = {};
                var freqOrder = [];
                data.forEach(function(val) {
                    var label = val || 'Unknown';
                    if (!freqMap[label]) {
                        freqMap[label] = 0;
                        freqOrder.push(label);
                    }
                    freqMap[label]++;
                });
                chartData = freqOrder.map(function(label) {
                    return [[label, freqMap[label]]];
                });
                columns = [
                    { dataindex: 0, columnname: 'Item', datatype: 'ordinal' },
                    { dataindex: 1, columnname: 'Count', datatype: 'numeric' }
                ];
            } else if (typeof data[0] === 'object' && data[0] !== null) {
                // Object array → find label key and numeric keys
                var allKeys = Object.keys(data[0]);
                var titleKey = allKeys.find(function(k) { return /name|title|label|subject/i.test(k); }) || allKeys[0];

                // Find all numeric keys (check across multiple items, skip id-like fields)
                var numericKeys = allKeys.filter(function(k) {
                    if (k === titleKey) return false;
                    if (/^id$|^Id$|^ID$|_id$/i.test(k)) return false;
                    var numCount = 0;
                    var checkCount = Math.min(data.length, 10);
                    for (var ci = 0; ci < checkCount; ci++) {
                        var v = data[ci][k];
                        if (v !== null && v !== undefined && typeof v === 'number' && !isNaN(v)) {
                            numCount++;
                        }
                    }
                    return numCount > checkCount * 0.4;
                });

                if (numericKeys.length > 0) {
                    // Has numeric fields → plot each record as a data point
                    var primaryNumKey = numericKeys[0];

                    if (numericKeys.length === 1) {
                        // Single numeric field → simple 2-column chart
                        chartData = data.map(function(item) {
                            var label = serializeCellValue(item[titleKey]);
                            label = label.length > 25 ? label.substring(0, 23) + '…' : label;
                            return [[label, Number(item[primaryNumKey]) || 0]];
                        });
                        columns = [
                            { dataindex: 0, columnname: formatFieldName(titleKey), datatype: 'ordinal' },
                            { dataindex: 1, columnname: formatFieldName(primaryNumKey), datatype: 'numeric' }
                        ];
                    } else {
                        // Multiple numeric fields → multi-series chart
                        var usedNumKeys = numericKeys.slice(0, 4); // max 4 series
                        chartData = data.map(function(item) {
                            var label = serializeCellValue(item[titleKey]);
                            label = label.length > 25 ? label.substring(0, 23) + '…' : label;
                            var row = [label];
                            usedNumKeys.forEach(function(nk) {
                                row.push(Number(item[nk]) || 0);
                            });
                            return [row];
                        });
                        columns = [{ dataindex: 0, columnname: formatFieldName(titleKey), datatype: 'ordinal' }];
                        var yIndices = [];
                        usedNumKeys.forEach(function(nk, ni) {
                            columns.push({ dataindex: ni + 1, columnname: formatFieldName(nk), datatype: 'numeric' });
                            yIndices.push(ni + 1);
                        });
                        axes = { x: [0], y: [yIndices], tooltip: [0].concat(yIndices) };
                    }
                } else {
                    // No numeric fields → group by a categorical field and count frequency
                    var groupKey = allKeys.find(function(k) {
                        return k !== titleKey && /status|stage|type|source|category|state|priority|group/i.test(k);
                    }) || titleKey;

                    var gFreqMap = {};
                    var gFreqOrder = [];
                    data.forEach(function(item) {
                        var label = serializeCellValue(item[groupKey]) || 'Unknown';
                        label = label.length > 25 ? label.substring(0, 23) + '…' : label;
                        if (!gFreqMap[label]) {
                            gFreqMap[label] = 0;
                            gFreqOrder.push(label);
                        }
                        gFreqMap[label]++;
                    });
                    chartData = gFreqOrder.map(function(label) {
                        return [[label, gFreqMap[label]]];
                    });
                    columns = [
                        { dataindex: 0, columnname: formatFieldName(groupKey), datatype: 'ordinal' },
                        { dataindex: 1, columnname: 'Count', datatype: 'numeric' }
                    ];
                }
            }
        } else if (typeof data === 'number') {
            // Single number → single bar
            chartData = [[[' ', data]]];
            columns = [
                { dataindex: 0, columnname: ' ', datatype: 'ordinal' },
                { dataindex: 1, columnname: 'Value', datatype: 'numeric' }
            ];
        } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            // Key-value object → treat keys as labels, values as numbers
            var objKeys = Object.keys(data);
            objKeys.forEach(function(k) {
                var v = data[k];
                if (v !== null && v !== undefined && !isNaN(Number(v))) {
                    chartData.push([[formatFieldName(k), Number(v)]]);
                }
            });
            if (chartData.length === 0) {
                chartData = [[[' ', 0]]];
            }
            columns = [
                { dataindex: 0, columnname: 'Field', datatype: 'ordinal' },
                { dataindex: 1, columnname: 'Value', datatype: 'numeric' }
            ];
        }

        // Fallback: if no data was built, provide an empty placeholder
        if (chartData.length === 0) {
            chartData = [[[' ', 0]]];
            columns = [
                { dataindex: 0, columnname: ' ', datatype: 'ordinal' },
                { dataindex: 1, columnname: ' ', datatype: 'numeric' }
            ];
        }

        return {
            seriesData: { chartdata: [{ data: chartData }] },
            metaDataAxes: axes,
            metaDataColumns: columns
        };
    }

    // Renders the appropriate Lyte UI component into a container element
    function renderLyteView(containerEl, data, viewKey, dataType, stableTargetId) {
        // Clear previous content and any rendered Lyte components
        containerEl.innerHTML = '';

        var renderTarget = document.createElement('div');
        // Use a stable ID if provided (from buildLyteView) to avoid race conditions
        // where Lyte.Component.render references an old incremented ID that was destroyed
        renderTarget.id = stableTargetId || ('lyteViewTarget_' + (++_lyteViewCounter));
        containerEl.appendChild(renderTarget);

        // Helper: safely call Lyte.Component.render after DOM is flushed
        // Lyte's internal selector fails if the element was created in the same frame,
        // so we always defer the render to the next setTimeout tick.
        function safeRender(componentName, props, targetId) {
            setTimeout(function() {
                var el = document.getElementById(targetId);
                if (!el || !document.body.contains(el)) {
                    return;
                }
                try {
                    Lyte.Component.render(componentName, props, '#' + targetId);
                } catch (e) {
                    console.warn('[WorkPilot] Lyte render failed for #' + targetId + ':', e.message);
                }
            }, 0);
        }

        switch (viewKey) {
            case 'table': {
                var tableData = toLyteTableData(Array.isArray(data) ? data : [data]);
                safeRender('data-view-table', {
                    ltPropHeader: tableData.header,
                    ltPropContent: tableData.content
                }, renderTarget.id);
                break;
            }
            case 'kanban': {
                var boardDetails = toLyteKanbanData(data);
                safeRender('data-view-kanban', {
                    ltPropBoardDetails: boardDetails
                }, renderTarget.id);
                break;
            }
            case 'chart': {
                var chartInfo = toLyteChartData(data);
                safeRender('data-view-chart', {
                    ltPropType: 'bar',
                    ltPropTitle: '',
                    ltPropSeriesData: chartInfo.seriesData,
                    ltPropMetaDataAxes: chartInfo.metaDataAxes,
                    ltPropMetaDataColumns: chartInfo.metaDataColumns
                }, renderTarget.id);
                break;
            }
            // For non-Lyte views, fall back to the existing DOM-based renderers
            case 'list':
                renderListView(containerEl, data);
                break;
            case 'detail':
                renderDetailView(containerEl, Array.isArray(data) ? data[0] : data);
                break;
            case 'json':
                renderJsonView(containerEl, data);
                break;
            case 'text':
                renderTextView(containerEl, data);
                break;
            case 'slist':
                renderSimpleListView(containerEl, data);
                break;
            case 'stat':
                renderStatView(containerEl, data);
                break;
            default:
                renderTextView(containerEl, String(data));
                break;
        }
    }

    // ─── VIEW DATA LABEL ──────────────────────────────────
    // Returns a human-readable tab label for a viewData item.
    function getViewDataLabel(item, idx) {
        // Explicit component name supplied in the data item (either shape)
        var explicitName = item && typeof item === 'object' && !Array.isArray(item)
            ? (item.component || item.componentName || null)
            : null;
        if (explicitName) {
            // Friendly aliases for well-known component names
            var friendlyNames = {
                'lyte-kanbanview':  'Kanban',
                'data-view-kanban': 'Kanban',
                'lyte-table':       'Table',
                'data-view-table':  'Table',
                'lyte-chart':       'Chart',
                'data-view-chart':  'Chart'
            };
            var lower = explicitName.toLowerCase();
            if (friendlyNames[lower]) return friendlyNames[lower] + ' ' + (idx + 1);
            // Generic: strip prefix, title-case
            return explicitName
                .replace(/^(data-view-|lyte-)/, '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, function(c) { return c.toUpperCase(); })
                + ' ' + (idx + 1);
        }
        // Auto-detected: derive label from the best view type, always include index for uniqueness
        var dataType = detectDataType(item);
        var viewType = getLyteDefaultView(dataType);
        var viewLabels = {
            'table':  'Table',
            'detail': 'Detail',
            'text':   'Text',
            'slist':  'List',
            'chart':  'Chart',
            'stat':   'Stat'
        };
        var base = viewLabels[viewType] || 'View';
        return base + ' ' + (idx + 1);
    }

    // ─── DIRECT COMPONENT VIEW ────────────────────────────
    // Builds a container that renders a named Lyte component directly via
    // Lyte.Component.render once the container is attached to the DOM.
    // Expected item shape: { component: 'lyte-table', props: { ... } }
    function buildDirectComponentView(componentName, props) {
        var container = document.createElement('div');
        container.className = 'data-view-container lyte-data-view direct-component-view';

        var renderTarget = document.createElement('div');
        renderTarget.id = 'lyteViewTarget_' + (++_lyteViewCounter);
        container.appendChild(renderTarget);

        var targetId = renderTarget.id;
        container._deferredRender = function() {
            setTimeout(function() {
                var el = document.getElementById(targetId);
                if (!el || !document.body.contains(el)) {
                    console.warn('[WorkPilot] Direct render target not found: #' + targetId);
                    return;
                }
                try {
                    Lyte.Component.render(componentName, props || {}, '#' + targetId);
                } catch(e) {
                    console.warn('[WorkPilot] Direct component render failed:', e.message);
                    el.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>Failed to render ' +
                        escapeHtml(componentName) + ': ' + escapeHtml(e.message) + '</span></div>';
                }
            }, 0);
        };

        var _retries = 0;
        function tryDeferredRenderDirect() {
            if (!container._deferredRender) return;
            if (document.body.contains(container)) {
                container._deferredRender();
                container._deferredRender = null;
            } else if (_retries < 20) {
                _retries++;
                setTimeout(tryDeferredRenderDirect, 50);
            } else {
                console.warn('[WorkPilot] Direct component deferred render timed out for: ' + componentName);
            }
        }
        setTimeout(tryDeferredRenderDirect, 0);
        return container;
    }

    // ─── COMPONENT ALIAS RESOLVER ─────────────────────────
    // Maps well-known Lyte UI component names to our custom data-view-* components
    // and transforms the raw data into the correct prop shape.
    function resolveComponentAndProps(compName, rawData) {
        switch ((compName || '').toLowerCase()) {
            case 'lyte-kanbanview':
            case 'data-view-kanban': {
                var boards = toLyteKanbanData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));
                return { component: 'data-view-kanban', props: { ltPropBoardDetails: boards } };
            }
            case 'lyte-table':
            case 'data-view-table': {
                var tableData = toLyteTableData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));
                return { component: 'data-view-table', props: { ltPropHeader: tableData.header, ltPropContent: tableData.content } };
            }
            case 'lyte-chart':
            case 'data-view-chart': {
                var chartData = toLyteChartData(rawData);
                return {
                    component: 'data-view-chart',
                    props: {
                        ltPropType: 'bar',
                        ltPropTitle: '',
                        ltPropSeriesData: chartData.seriesData,
                        ltPropMetaDataAxes: chartData.metaDataAxes,
                        ltPropMetaDataColumns: chartData.metaDataColumns
                    }
                };
            }
            default:
                // Unknown component — pass raw data directly as-is
                return { component: compName, props: rawData };
        }
    }

    // ─── RENDER SINGLE VIEW DATA ITEM ─────────────────────
    // If item has { component, props } → resolve alias → buildDirectComponentView
    // Otherwise → auto-detect type and use buildLyteView
    function renderViewDataItem(item) {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
            // Support both { component, props } and { componentName, data } shapes
            var compName = item.component || item.componentName;
            var rawData  = item.props    || item.data;
            if (compName) {
                var resolved = resolveComponentAndProps(compName, rawData);
                return buildDirectComponentView(resolved.component, resolved.props);
            }
        }
        var dataType = detectDataType(item);
        var bestView = getLyteDefaultView(dataType);
        return buildLyteView(item, bestView);
    }

    // ─── MULTI-VIEW TAB BUILDER ────────────────────────────
    // Wraps multiple viewData items in a tabbed interface.
    // - One item  → rendered directly, no tab chrome.
    // - Many items → labeled tabs; panels are lazy-rendered on first show.
    function buildMultiViewTabs(viewDataItems) {
        var wrapper = document.createElement('div');
        wrapper.className = 'multi-view-tabs-wrapper';

        if (!viewDataItems || viewDataItems.length === 0) {
            wrapper.innerHTML = '<div class="string-response"><i class="fas fa-info-circle" style="margin-right:6px;color:var(--text-secondary)"></i>No data returned.</div>';
            return wrapper;
        }

        // Single item – no tab chrome needed
        if (viewDataItems.length === 1) {
            var singleContainer = renderViewDataItem(viewDataItems[0]);
            wrapper.appendChild(singleContainer);
            return wrapper;
        }

        // Multiple items – tab strip + lazily rendered panels
        var tabStrip = document.createElement('div');
        tabStrip.className = 'multi-view-tab-strip view-tabs';

        var panelsHost = document.createElement('div');
        panelsHost.className = 'multi-view-panels-host';

        var panelRefs = [];

        viewDataItems.forEach(function(item, idx) {
            var label = getViewDataLabel(item, idx);

            // Tab button
            var tab = document.createElement('button');
            tab.className = 'view-tab multi-view-tab' + (idx === 0 ? ' active' : '');
            tab.innerHTML = '<i class="fas fa-layer-group"></i><span>' + escapeHtml(label) + '</span>';
            tabStrip.appendChild(tab);

            // Panel
            var panel = document.createElement('div');
            panel.className = 'multi-view-panel';
            if (idx !== 0) panel.style.display = 'none';
            panel._viewData = item;
            panel._rendered = false;
            panelsHost.appendChild(panel);
            panelRefs.push({ tab: tab, panel: panel });

            tab.addEventListener('click', function() {
                // Deactivate all
                panelRefs.forEach(function(ref) {
                    ref.tab.classList.remove('active');
                    ref.panel.style.display = 'none';
                });
                // Activate this one
                tab.classList.add('active');
                panel.style.display = '';
                // Lazy-render on first show
                if (!panel._rendered) {
                    panel._rendered = true;
                    var vc = renderViewDataItem(panel._viewData);
                    panel.appendChild(vc);
                    if (vc._deferredRender) {
                        vc._deferredRender();
                        vc._deferredRender = null;
                    }
                    scrollToBottom();
                }
            });
        });

        // Eagerly render the first panel
        if (panelRefs.length > 0 && !panelRefs[0].panel._rendered) {
            panelRefs[0].panel._rendered = true;
            var firstVc = renderViewDataItem(panelRefs[0].panel._viewData);
            panelRefs[0].panel.appendChild(firstVc);
            // _deferredRender is handled by the child component's own polling
        }

        wrapper.appendChild(tabStrip);
        wrapper.appendChild(panelsHost);
        return wrapper;
    }

    function buildLyteView(data, initialView) {
        var container = document.createElement('div');
        container.className = 'data-view-container lyte-data-view';

        var dataType = detectDataType(data);

        // Empty / null
        if (dataType === 'empty') {
            container.innerHTML = '<div class="string-response"><i class="fas fa-info-circle" style="margin-right:6px;color:var(--text-secondary)"></i>No data returned.</div>';
            return container;
        }

        var availableViews = getLyteViewsForType(dataType);
        var defaultView = initialView || getLyteDefaultView(dataType);
        if (!availableViews.some(function(v) { return v.key === defaultView; })) {
            defaultView = availableViews[0].key;
        }

        var normalized = normalizeForRender(data, dataType);

        // Assign a stable render target ID for this view instance
        // so tab switches and deferred renders reuse the same ID
        var stableTargetId = 'lyteViewTarget_' + (++_lyteViewCounter);

        // Toolbar
        var toolbar = document.createElement('div');
        toolbar.className = 'data-view-toolbar';

        var tabs = document.createElement('div');
        tabs.className = 'view-tabs';

        var body = document.createElement('div');
        body.className = 'data-view-body';

        availableViews.forEach(function(v) {
            var btn = document.createElement('button');
            btn.className = 'view-tab' + (v.key === defaultView ? ' active' : '');
            btn.innerHTML = '<i class="fas ' + v.icon + '"></i><span>' + v.label + '</span>';
            btn.dataset.view = v.key;
            btn.addEventListener('click', function() {
                tabs.querySelectorAll('.view-tab').forEach(function(t) { t.classList.remove('active'); });
                btn.classList.add('active');
                renderLyteView(body, normalized, v.key, dataType, stableTargetId);
            });
            tabs.appendChild(btn);
        });

        var actions = document.createElement('div');
        actions.className = 'data-view-actions';
        var expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.innerHTML = '<i class="fas fa-expand"></i> Expand';
        expandBtn.addEventListener('click', function() {
            openViewModal(data, tabs.querySelector('.view-tab.active').dataset.view);
        });
        actions.appendChild(expandBtn);

        toolbar.appendChild(tabs);
        toolbar.appendChild(actions);
        container.appendChild(toolbar);
        container.appendChild(body);

        // Defer initial render until the container is attached to the DOM
        // (Lyte.Component.render needs the target element to be queryable in the document)
        container._deferredRender = function() {
            renderLyteView(body, normalized, defaultView, dataType, stableTargetId);
        };
        // Poll until the container is actually in the document (handles re-renders)
        // Uses setTimeout to ensure the browser has fully flushed DOM changes
        // before Lyte.Component.render tries to querySelector the target
        var _retries = 0;
        function tryDeferredRender() {
            if (!container._deferredRender) return;
            if (document.body.contains(container)) {
                container._deferredRender();
                container._deferredRender = null;
            } else if (_retries < 20) {
                _retries++;
                setTimeout(tryDeferredRender, 16);
            } else {
                container._deferredRender = null;
            }
        }
        setTimeout(tryDeferredRender, 0);

        return container;
    }

    // ─── SMART VIEW ROUTER ─────────────────────────────────
    function renderSmartView(container, data, viewKey, dataType) {
        container.innerHTML = '';
        switch (viewKey) {
            case 'list':    renderListView(container, data); break;
            case 'table':   renderTableView(container, Array.isArray(data) ? data : [data]); break;
            case 'kanban':  renderKanbanView(container, data); break;
            case 'chart':   renderChartView(container, data); break;
            case 'detail':  renderDetailView(container, Array.isArray(data) ? data[0] : data); break;
            case 'json':    renderJsonView(container, data); break;
            case 'text':    renderTextView(container, data); break;
            case 'slist':   renderSimpleListView(container, data); break;
            case 'stat':    renderStatView(container, data); break;
            default:        renderTextView(container, String(data)); break;
        }
    }

    // ── List View (Card Grid) ──
    function renderListView(container, items) {
        const grid = document.createElement('div');
        grid.className = 'list-view';

        items.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'list-card';

            const keys = Object.keys(item);
            const titleKey = keys.find(k => /name|title|label/i.test(k)) || keys[0];
            const title = serializeCellValue(item[titleKey]) || '(No Name)';

            let fieldsHtml = '';
            keys.forEach(k => {
                if (k === titleKey) return;
                const val = item[k];
                if (val === null || val === undefined) return;
                fieldsHtml += `
                    <div class="list-card-field">
                        <span class="field-label">${escapeHtml(formatFieldName(k))}</span>
                        <span class="field-value">${escapeHtml(serializeCellValue(val))}</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="list-card-title">
                    <span class="card-icon" style="background:${COLORS[idx % COLORS.length]}20; color:${COLORS[idx % COLORS.length]};">
                        <i class="fas fa-user"></i>
                    </span>
                    ${escapeHtml(title)}
                </div>
                ${fieldsHtml}
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // ── Table View ──
    function renderTableView(container, items) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-view';

        // Normalize: wrap primitives into objects for table rendering
        var normalized = items.map(function(item, idx) {
            if (typeof item !== 'object' || item === null) {
                return { '#': idx + 1, 'Value': item };
            }
            return item;
        });

        const keys = getAllKeys(normalized);
        let thead = '<tr>';
        keys.forEach(k => { thead += `<th>${escapeHtml(formatFieldName(k))}</th>`; });
        thead += '</tr>';

        let tbody = '';
        normalized.forEach(item => {
            tbody += '<tr>';
            keys.forEach(k => {
                const val = item[k];
                tbody += `<td>${escapeHtml(serializeCellValue(val))}</td>`;
            });
            tbody += '</tr>';
        });

        wrapper.innerHTML = `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
        container.appendChild(wrapper);
    }

    // ── Kanban View ──
    function renderKanbanView(container, items) {
        const kanban = document.createElement('div');
        kanban.className = 'kanban-view';

        // Group by a suitable field (company, status, or split into chunks)
        const groupKey = findGroupKey(items);
        const groups = {};

        items.forEach(item => {
            const groupVal = (item[groupKey] || 'Ungrouped').toString();
            if (!groups[groupVal]) groups[groupVal] = [];
            groups[groupVal].push(item);
        });

        const titleKey = Object.keys(items[0] || {}).find(k => /name|title|label/i.test(k)) || Object.keys(items[0] || {})[0];

        Object.keys(groups).forEach((groupName, gIdx) => {
            const col = document.createElement('div');
            col.className = 'kanban-column';

            const borderColor = COLORS[gIdx % COLORS.length];
            col.innerHTML = `
                <div class="kanban-column-header" style="border-bottom-color:${borderColor}">
                    <span>${escapeHtml(groupName)}</span>
                    <span class="col-count" style="background:${borderColor}">${groups[groupName].length}</span>
                </div>
                <div class="kanban-cards"></div>
            `;

            const cardsContainer = col.querySelector('.kanban-cards');
            groups[groupName].forEach(item => {
                const card = document.createElement('div');
                card.className = 'kanban-card';
                const name = serializeCellValue(item[titleKey]) || '(No Name)';
                const metaKey = Object.keys(item).find(k => k !== titleKey && item[k]);
                const meta = metaKey ? `${formatFieldName(metaKey)}: ${serializeCellValue(item[metaKey])}` : '';
                card.innerHTML = `
                    <div class="kanban-card-title">${escapeHtml(name)}</div>
                    <div class="kanban-card-meta">${escapeHtml(meta)}</div>
                `;
                cardsContainer.appendChild(card);
            });

            kanban.appendChild(col);
        });

        container.appendChild(kanban);
    }

    // ── Chart View ──
    function renderChartView(container, items) {
        const chart = document.createElement('div');
        chart.className = 'chart-view';

        const barsDiv = document.createElement('div');
        barsDiv.className = 'chart-bars';

        // Handle primitive arrays (number[], string[])
        if (items.length > 0 && typeof items[0] !== 'object') {
            var isNumArr = items.every(function(it) { return typeof it === 'number'; });

            if (isNumArr) {
                var maxN = Math.max.apply(null, items.map(Number));
                var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                items.forEach(function(item, idx) {
                    var v = Number(item);
                    var p = maxN > 0 ? (v / maxN) * 100 : 10;
                    var c = COLORS[idx % COLORS.length];
                    var l = items.length <= 12 ? monthNames[idx] || ('M' + (idx + 1)) : String(idx + 1);
                    var g = document.createElement('div');
                    g.className = 'chart-bar-group';
                    g.innerHTML =
                        '<div class="chart-bar" style="height:' + Math.max(p, 5) + '%;background:' + c + ';">' +
                            '<span class="chart-bar-value">' + v + '</span>' +
                        '</div>' +
                        '<span class="chart-bar-label" title="' + escapeHtml(l) + '">' + escapeHtml(l.substring(0, 10)) + '</span>';
                    barsDiv.appendChild(g);
                });
            } else {
                // String array → frequency chart
                var strFreq = {};
                var strOrder = [];
                items.forEach(function(item) {
                    var label = String(item);
                    if (!strFreq[label]) { strFreq[label] = 0; strOrder.push(label); }
                    strFreq[label]++;
                });
                var strMax = Math.max.apply(null, strOrder.map(function(l) { return strFreq[l]; }));
                strOrder.forEach(function(label, idx) {
                    var v = strFreq[label];
                    var p = strMax > 0 ? (v / strMax) * 100 : 10;
                    var c = COLORS[idx % COLORS.length];
                    var g = document.createElement('div');
                    g.className = 'chart-bar-group';
                    g.innerHTML =
                        '<div class="chart-bar" style="height:' + Math.max(p, 5) + '%;background:' + c + ';">' +
                            '<span class="chart-bar-value">' + v + '</span>' +
                        '</div>' +
                        '<span class="chart-bar-label" title="' + escapeHtml(label) + '">' + escapeHtml(label.substring(0, 12)) + '</span>';
                    barsDiv.appendChild(g);
                });
            }

            chart.appendChild(barsDiv);
            container.appendChild(chart);
            return;
        }

        // Object array chart
        const titleKey = Object.keys(items[0] || {}).find(k => /name|title|label/i.test(k)) || Object.keys(items[0] || {})[0];
        const numericKey = Object.keys(items[0] || {}).find(k => typeof items[0][k] === 'number' && !/^id$|^Id$|^ID$/i.test(k));

        if (numericKey) {
            // Has numeric field → plot each item
            const maxVal = Math.max.apply(null, items.map(function(it) { return Number(it[numericKey]) || 0; }));
            items.forEach(function(item, idx) {
                const val = Number(item[numericKey]) || 0;
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 10;
                const color = COLORS[idx % COLORS.length];
                const label = serializeCellValue(item[titleKey]) || ('Item ' + (idx + 1));

                const group = document.createElement('div');
                group.className = 'chart-bar-group';
                group.innerHTML =
                    '<div class="chart-bar" style="height:' + Math.max(pct, 5) + '%;background:' + color + ';">' +
                        '<span class="chart-bar-value">' + val + '</span>' +
                    '</div>' +
                    '<span class="chart-bar-label" title="' + escapeHtml(label) + '">' + escapeHtml(label.substring(0, 12)) + '</span>';
                barsDiv.appendChild(group);
            });
        } else {
            // No numeric field → frequency count by a categorical field
            var catKey = Object.keys(items[0] || {}).find(function(k) {
                return k !== titleKey && /status|stage|type|source|category|state|priority|group/i.test(k);
            }) || titleKey;

            var catFreq = {};
            var catOrder = [];
            items.forEach(function(item) {
                var label = serializeCellValue(item[catKey]) || 'Unknown';
                if (!catFreq[label]) { catFreq[label] = 0; catOrder.push(label); }
                catFreq[label]++;
            });
            var catMax = Math.max.apply(null, catOrder.map(function(l) { return catFreq[l]; }));
            catOrder.forEach(function(label, idx) {
                var v = catFreq[label];
                var pct = catMax > 0 ? (v / catMax) * 100 : 10;
                var color = COLORS[idx % COLORS.length];

                var group = document.createElement('div');
                group.className = 'chart-bar-group';
                group.innerHTML =
                    '<div class="chart-bar" style="height:' + Math.max(pct, 5) + '%;background:' + color + ';">' +
                        '<span class="chart-bar-value">' + v + '</span>' +
                    '</div>' +
                    '<span class="chart-bar-label" title="' + escapeHtml(label) + '">' + escapeHtml(label.substring(0, 12)) + '</span>';
                barsDiv.appendChild(group);
            });
        }

        chart.appendChild(barsDiv);
        container.appendChild(chart);
    }

    // ── Detail View (single record) ──
    function renderDetailView(container, item) {
        if (!item || typeof item !== 'object') {
            renderTextView(container, String(item));
            return;
        }

        var detail = document.createElement('div');
        detail.className = 'detail-view';

        var keys = Object.keys(item);
        var titleKey = keys.find(function(k) { return /name|title|label/i.test(k); }) || keys[0];
        var title = serializeCellValue(item[titleKey]) || '(No Name)';

        // Header with avatar
        var header = document.createElement('div');
        header.className = 'detail-header';
        header.innerHTML =
            '<div class="detail-avatar" style="background:' + COLORS[0] + '">' +
                '<i class="fas fa-user"></i>' +
            '</div>' +
            '<div class="detail-title-block">' +
                '<h3 class="detail-name">' + escapeHtml(title) + '</h3>' +
                '<span class="detail-subtitle">' + escapeHtml(formatFieldName(titleKey)) + '</span>' +
            '</div>';
        detail.appendChild(header);

        // Fields grid
        var fields = document.createElement('div');
        fields.className = 'detail-fields';

        keys.forEach(function(k) {
            if (k === titleKey) return;
            var val = item[k];
            var displayVal = serializeCellValue(val);
            var isLink = typeof val === 'string' && (/^https?:\/\//i.test(val) || /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(val));

            var field = document.createElement('div');
            field.className = 'detail-field';
            field.innerHTML =
                '<div class="detail-field-label">' + escapeHtml(formatFieldName(k)) + '</div>' +
                '<div class="detail-field-value">' +
                    (isLink
                        ? '<a href="' + (/^https?/.test(val) ? val : 'mailto:' + val) + '" target="_blank" rel="noopener">' + escapeHtml(displayVal) + '</a>'
                        : escapeHtml(displayVal)
                    ) +
                '</div>';
            fields.appendChild(field);
        });

        detail.appendChild(fields);
        container.appendChild(detail);
    }

    // ── JSON View ──
    function renderJsonView(container, data) {
        var pre = document.createElement('pre');
        pre.className = 'json-view';
        var code = document.createElement('code');
        try {
            code.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            code.textContent = String(data);
        }
        pre.appendChild(code);
        container.appendChild(pre);
    }

    // ── Text View (for string responses) ──
    function renderTextView(container, text) {
        var wrapper = document.createElement('div');
        wrapper.className = 'text-view';

        var str = String(text);

        // Detect code block
        if (/^\s*[{\[]/.test(str) || /function\s|var\s|const\s|let\s|=>|import\s/.test(str)) {
            var pre = document.createElement('pre');
            pre.className = 'json-view';
            var code = document.createElement('code');
            code.textContent = str;
            pre.appendChild(code);
            wrapper.appendChild(pre);
        } else {
            // Render as formatted text with markdown
            wrapper.innerHTML = formatMarkdown(str);
        }

        container.appendChild(wrapper);
    }

    // ── Simple List View (for string[], number[], mixed[]) ──
    function renderSimpleListView(container, items) {
        var list = document.createElement('div');
        list.className = 'simple-list-view';

        items.forEach(function(item, idx) {
            var row = document.createElement('div');
            row.className = 'simple-list-item';

            var num = document.createElement('span');
            num.className = 'simple-list-num';
            num.textContent = String(idx + 1);

            var val = document.createElement('span');
            val.className = 'simple-list-val';

            if (typeof item === 'object' && item !== null) {
                val.textContent = JSON.stringify(item);
            } else {
                val.textContent = String(item);
            }

            row.appendChild(num);
            row.appendChild(val);
            list.appendChild(row);
        });

        container.appendChild(list);
    }

    // ── Stat View (for single number / boolean) ──
    function renderStatView(container, value) {
        var stat = document.createElement('div');
        stat.className = 'stat-view';

        var isBool = typeof value === 'boolean';
        var displayVal = isBool ? (value ? 'True' : 'False') : String(value);
        var icon = isBool ? (value ? 'fa-check-circle' : 'fa-times-circle') : 'fa-hashtag';
        var color = isBool ? (value ? 'var(--success)' : 'var(--error)') : 'var(--primary)';

        stat.innerHTML =
            '<div class="stat-icon" style="color:' + color + '">' +
                '<i class="fas ' + icon + '"></i>' +
            '</div>' +
            '<div class="stat-value" style="color:' + color + '">' + escapeHtml(displayVal) + '</div>' +
            '<div class="stat-label">' + (isBool ? 'Boolean' : (Number.isInteger(value) ? 'Integer' : 'Number')) + '</div>';

        container.appendChild(stat);
    }

    // ─── VIEW MODAL (expanded) ─────────────────────────────
    function openViewModal(data, viewType) {
        viewModalTitle.textContent = 'Data View';
        viewModalBody.innerHTML = '';

        // Build full view inside modal (using Lyte UI components)
        var fullContainer = buildLyteView(data, viewType);
        var expandBtnEl = fullContainer.querySelector('.expand-btn');
        if (expandBtnEl) expandBtnEl.remove();
        var dvBody = fullContainer.querySelector('.data-view-body');
        if (dvBody) dvBody.style.maxHeight = 'none';
        viewModalBody.appendChild(fullContainer);

        viewModalOverlay.classList.add('active');

        // Trigger deferred render now that the container is in the DOM
        if (fullContainer._deferredRender) {
            fullContainer._deferredRender();
            fullContainer._deferredRender = null;
        }
    }

    function closeViewModal() {
        viewModalOverlay.classList.remove('active');
    }

    // ─── EVENTS ────────────────────────────────────────────
    function bindEvents() {
        // Send
        sendBtn.addEventListener('click', () => sendMessage(promptInput.value));
        promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(promptInput.value);
            }
        });

        // Auto-resize textarea
        promptInput.addEventListener('input', autoResizeTextarea);

        // New chat
        newChatBtn.addEventListener('click', () => {
            if (isProcessing) return;
            createNewSession();
            closeSidebar();
        });

        // Clear all
        clearAllBtn.addEventListener('click', clearAllSessions);

        // Delete current session
        deleteSessionBtn.addEventListener('click', () => {
            if (activeSessionId) deleteSession(activeSessionId);
        });

        // Sidebar toggle (mobile)
        sidebarToggle.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Suggestions
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const prompt = chip.dataset.prompt;
                promptInput.value = prompt;
                sendMessage(prompt);
            });
        });

        // View modal close
        viewModalClose.addEventListener('click', closeViewModal);
        viewModalOverlay.addEventListener('click', (e) => {
            if (e.target === viewModalOverlay) closeViewModal();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeViewModal();
                closeSidebar();
            }
        });
    }

    // ─── SIDEBAR TOGGLE ────────────────────────────────────
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    // ─── HELPERS ───────────────────────────────────────────
    function uid() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatFieldName(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim();
    }

    function formatMarkdown(text) {
        if (!text) return '';
        let html = escapeHtml(text);
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Newlines to <br>
        html = html.replace(/\n/g, '<br>');
        // Numbered list
        html = html.replace(/(\d+)\.\s/g, '<br>$1. ');

        return html;
    }

    function getAllKeys(items) {
        const keysSet = new Set();
        items.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(k => keysSet.add(k));
            }
        });
        return Array.from(keysSet);
    }

    function findGroupKey(items) {
        const keys = Object.keys(items[0] || {});
        // Prefer grouping by company, status, category, stage
        const preferred = keys.find(k => /company|status|stage|category|group|type/i.test(k));
        if (preferred) return preferred;
        // Fallback: find a key with few unique values
        let bestKey = keys[0];
        let bestRatio = 1;
        keys.forEach(k => {
            const unique = new Set(items.map(i => i[k])).size;
            const ratio = unique / items.length;
            if (ratio < bestRatio && ratio > 0 && unique > 1) {
                bestRatio = ratio;
                bestKey = k;
            }
        });
        return bestKey || keys[0];
    }

    function autoResizeTextarea() {
        promptInput.style.height = 'auto';
        promptInput.style.height = Math.min(promptInput.scrollHeight, 160) + 'px';
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }

    // ─── START ─────────────────────────────────────────────
    init();

    var CScriptBridge = (function () {
        var _token = null, _ok = false, _hp = null, _pend = new Map(), _connectPromise = null;

        window.addEventListener('message', function (e) {
            if (!e.data) return;
            if (e.data.type === 'WIDGET_CSCRIPT_HANDSHAKE_ACK') {
                _token = e.data.token;
                _ok = true;
                if (_hp) { _hp.resolve(); _hp = null; }
            }
            if (e.data.type === 'WIDGET_CSCRIPT_RESULT') {
                var p = _pend.get(e.data.requestId);
                if (!p) return;
                _pend.delete(e.data.requestId);
                clearTimeout(p.t);
                if (e.data.error) {
                    if (e.data.error.type === 'AuthenticationError') { _token = null; _ok = false; _connectPromise = null; }
                    p.reject(e.data.error);
                } else {
                    p.resolve(e.data.result);
                }
            }
        });

        function rid() {
            var a = new Uint8Array(8);
            crypto.getRandomValues(a);
            return 'w_' + Array.from(a, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        }

        // function connect() {
        //     if (_ok && _token) return Promise.resolve();
        //     if (_connectPromise) return _connectPromise;
        //     _connectPromise = new Promise(function (res, rej) {
        //         var tm = setTimeout(function () { _hp = null; _connectPromise = null; rej(new Error('Handshake timeout')); }, 5000);
        //         _hp = { resolve: function () { clearTimeout(tm); _connectPromise = null; res(); } };
        //         window.parent.postMessage({ type: 'WIDGET_CSCRIPT_HANDSHAKE' }, '*');
        //     });
        //     return _connectPromise;
        // }

        // // Auto-connect on load
        // connect();

        return {
            /**
             * Execute CScript code and return the result.
             * Auto-connects if not already connected.
             * @param {string} code - The CScript code to execute
             * @param {number} [timeout=30000] - Timeout in ms
             * @returns {Promise} Resolves with {status, data} where data is the return value
             */
            run: function (code, timeout) {
                // return connect().then(function () {
                    return new Promise(function (res, rej) {
                        var id = rid(), to = timeout || 30000;
                        var tm = setTimeout(function () { _pend.delete(id); rej({ message: 'Timeout', type: 'TimeoutError' }); }, to);
                        _pend.set(id, { resolve: res, reject: rej, t: tm });
                        window.parent.postMessage({
                            type: 'WIDGET_CSCRIPT_EXECUTE',
                            requestId: id,
                            sourceCode: code,
                            token: _token
                        }, '*');
                    });
                // });
            },
            isConnected: function () { return _ok && !!_token; }
        };
    })();



	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

Lyte.Component.register("welcome-comp",{
_template:"<template tag-name=\"welcome-comp\"> <h1>Available features of LYTE</h1> <ul> <template items=\"{{features}}\" item=\"item\" index=\"index\" is=\"for\"><li> <a href=\"{{item.url}}\" target=\"_blank\">{{item.module}}</a> </li></template> </ul> </template>",
_dynamicNodes : [{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]}]}],
_observedAttributes :["features"],
_observedAttributesType :["array"],

	data : function(){
		return {
			features : Lyte.attr("array")
		}
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

