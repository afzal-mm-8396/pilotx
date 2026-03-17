Lyte.Component.register("pilotx-chat", {
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
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

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

    // ─── STATE ─────────────────────────────────────────────
    let sessions = [];
    let activeSessionId = null;
    let isProcessing = false;

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
                        var viewContainer = buildLyteView(dv.data, dv.activeView || 'table');
                        contentEl.appendChild(viewContainer);
                    }
                });
            } else if (msg.dataView && msg.dataView.data) {
                var viewContainer = buildLyteView(msg.dataView.data, msg.dataView.activeView || 'table');
                contentEl.appendChild(viewContainer);
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

    async function callCRMFunction(prompt) {
        _lastPrompt = prompt;

        // Try ZOHO.CRM.FUNCTIONS.execute first (only works inside CRM widget iframe)
        try {
            var isInIframe = window.parent !== window;
            if (isInIframe && typeof ZOHO !== 'undefined' && ZOHO.CRM && ZOHO.CRM.FUNCTIONS && typeof ZOHO.CRM.FUNCTIONS.execute === 'function') {
                var req_data = {
                    arguments: JSON.stringify({ prompt: prompt, model: 'gpt-5.1', mode: 'agent', feature: 'cscript' })
                };
                var data = await ZOHO.CRM.FUNCTIONS.execute(CRM_FUNC_NAME, req_data);
                console.log('[WorkPilot] ZOHO.CRM.FUNCTIONS response:', data);

                var parsed = null;
                if (data && data.details && data.details.output) {
                    parsed = typeof data.details.output === 'string' ? JSON.parse(data.details.output) : data.details.output;
                } else if (data && data.response) {
                    parsed = data;
                }

                if (parsed) {
                    var edits = (parsed && Array.isArray(parsed.edits)) ? parsed.edits : [];
                    var hasScript = edits.length > 0 && edits.some(function(e) { return e && e.content; });
                    if (hasScript || (parsed.response && parsed.response.content)) {
                        return parsed;
                    }
                }
                console.warn('[WorkPilot] ZOHO.CRM.FUNCTIONS returned no usable data.');
            }
        } catch (sdkErr) {
            console.warn('[WorkPilot] ZOHO.CRM.FUNCTIONS.execute failed:', sdkErr.message || sdkErr);
        }

        // Fallback: REST API via proxy (works locally, may fail on Render due to mTLS)
        try {
            var response = await fetch(CRM_FUNC_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt, model: 'gpt-5.1', mode: 'agent', feature: 'cscript' })
            });
            var text = await response.text();
            var result = JSON.parse(text);
            console.log('[WorkPilot] CRM Function REST response:', result);

            if (result && result.code && result.status === 'error') {
                console.warn('[WorkPilot] CRM Function returned error:', result.message);
                return null;
            }

            if (result && (result.response || result.edits)) {
                var edits = (result && Array.isArray(result.edits)) ? result.edits : [];
                var hasScript = edits.length > 0 && edits.some(function(e) { return e && e.content; });
                if (hasScript || (result.response && result.response.content)) {
                    return result;
                }
            }

            console.warn('[WorkPilot] CRM Function REST returned no usable data:', result);
        } catch (restErr) {
            console.warn('[WorkPilot] CRM Function REST call failed:', restErr.message || restErr);
        }

        // If both fail, return null to trigger callAPI fallback (mock data)
        return null;
    }

    // ─── FETCH API CALL (backup) ───────────────────────────

    async function callAPI(prompt) {
        _lastPrompt = prompt;
        console.log("sending API request with prompt:", prompt);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ prompt: prompt, model: 'gpt-5.1', mode: 'agent', feature: 'cscript' })
        };

        try {
            const response = await fetch(CRM_FUNC_URL, requestOptions);
            const text = await response.text();
            var parsed = JSON.parse(text);
            console.log("parsed response:", parsed);
            if(!parsed || !parsed.error) {
                return parsed;
            }
            
            // Validate that the API actually returned usable edits with script content
            // var edits = (parsed && Array.isArray(parsed.edits)) ? parsed.edits : [];
            // var hasScript = edits.length > 0 && edits.some(function(e) { return e && e.content; });
            // if (hasScript) {
                // return parsed;
            // }
            // console.log("No edits found:", edits);
            // API returned response but no script — fall through to fallback
            // console.warn('[WorkPilot] API returned no script content, using fallback script.');
        } catch (err) {
            console.warn('[WorkPilot] API call failed, using fallback script:', err.message);
        }

        // ── Fallback: build a response with a hardcoded script for this prompt ──
        var fallbackKey = getMockKey(prompt);
        var fb = FALLBACK_SCRIPTS[fallbackKey] || FALLBACK_SCRIPTS.records;
        return {
            response: { content: 'Using fallback script: **' + fb.explanation + '**\nExecuting client script against your CRM data.' },
            edits: [{ type: 'replace_file', explanation: fb.explanation, content: fb.content }]
        };
    }

    // ─── executeCScript ────────────────────────────────────
    // Executes the client script code via CScriptBridge and returns data.
    // Falls back to mock results if CScriptBridge is unavailable or fails.
    async function executeCScript(code) {
        try {
            if (typeof CScriptBridge !== 'undefined' && CScriptBridge && typeof CScriptBridge.run === 'function') {
                var result = await CScriptBridge.run(code);
                if(result.status !== 'success') {
                    throw new Error('CScript execution failed: ' + (result.error || 'Unknown error'));
                }
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
            throw new Error('Module not found: risk_analysis is not available in your CRM plan.');
        }

        var result = MOCK_CSCRIPT_RESULTS[key];
        return result !== undefined ? result : MOCK_CSCRIPT_RESULTS.records;
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
            // 1) Call CRM Function (primary: ZOHO SDK → REST proxy)
            var apiResult = await callCRMFunction(text.trim());
            if (!apiResult) {
                // 2) Fallback to callAPI (uses mock data when proxy fails)
                console.warn('[WorkPilot] CRM Function failed, falling back to callAPI.');
                apiResult = await callAPI(text.trim());
            }
            removeThinkingLoader();

            // 2) Safely extract response parts
            const responseText = (apiResult && apiResult.response && apiResult.response.content) ? apiResult.response.content : '';
            const edits = (apiResult && Array.isArray(apiResult.edits)) ? apiResult.edits : [];
            const hasEdits = edits.length > 0 && edits.some(function(e) { return e && e.content; });

            // 3) Create assistant message container
            const assistantMsg = { id: uid(), role: 'assistant', text: '', ts: Date.now() };
            session.messages.push(assistantMsg);

            const msgDiv = document.createElement('div');
            msgDiv.className = 'message assistant';
            msgDiv.innerHTML = `
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-body">
                    <div class="message-sender">WorkPilot</div>
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

                // Run the stepper animation and executeCScript in parallel
                var cscriptResult;
                var execError = null;

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
                    // Check if the result is an Error object
                    if (cscriptResult instanceof Error || (typeof cscriptResult === 'object' && cscriptResult && cscriptResult.message && cscriptResult.constructor && cscriptResult.constructor.name === 'Error')) {
                        var cscriptErrText = cscriptResult.message || String(cscriptResult);
                        var errHtml = '<div class="error-message"><i class="fas fa-exclamation-circle"></i><span>' + escapeHtml(cscriptErrText) + '</span></div>';
                        contentEl.insertAdjacentHTML('beforeend', errHtml);
                        allDataViews.push({ errorText: cscriptErrText });
                        continue;
                    }
                    var resultType = detectDataType(cscriptResult);
                    var bestView = getLyteDefaultView(resultType);
                    var viewContainer = buildLyteView(cscriptResult, bestView);
                    contentEl.appendChild(viewContainer);
                    allDataViews.push({ data: cscriptResult, activeView: bestView });
                }
            }

            // Save metadata for re-render on session reload
            if (allExecSteps.length > 0) {
                assistantMsg.execStepsList = allExecSteps;
                // Legacy compat — keep first one as execSteps too
                assistantMsg.execSteps = allExecSteps[0];
            }
            if (allDataViews.length >= 1) {
                assistantMsg.dataViewList = allDataViews;
                assistantMsg.dataView = allDataViews[0];
            }

            saveSessions();

        } catch (err) {
            removeThinkingLoader();
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
            if (data.length === 1 && typeof data[0] === 'object' && data[0] !== null) return 'single';
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

        // Ensure all values are strings for the table
        var content = normalized.map(function(item) {
            var row = {};
            keys.forEach(function(k) {
                var val = item[k];
                row[k] = (val !== null && val !== undefined) ? String(val) : '—';
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
            var card = { _title: item[titleKey] || '(No Name)', _fields: [] };
            Object.keys(item).forEach(function(k) {
                if (k === titleKey || k === groupKey) return;
                var val = item[k];
                if (val === null || val === undefined) return;
                card._fields.push({ label: formatFieldName(k), value: String(val) });
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
                // String array → bar chart counting occurrences (each = 1)
                chartData = data.map(function(val) {
                    return [[val, 1]];
                });
                columns = [
                    { dataindex: 0, columnname: 'Item', datatype: 'ordinal' },
                    { dataindex: 1, columnname: 'Count', datatype: 'numeric' }
                ];
            } else if (typeof data[0] === 'object' && data[0] !== null) {
                // Object array → find a title key and a numeric key
                var keys = Object.keys(data[0]);
                var titleKey = keys.find(function(k) { return /name|title|label/i.test(k); }) || keys[0];
                var numericKey = keys.find(function(k) { return typeof data[0][k] === 'number'; });

                if (numericKey) {
                    chartData = data.map(function(item) {
                        return [[(item[titleKey] || '').toString(), Number(item[numericKey]) || 0]];
                    });
                } else {
                    // No numeric key — count items per title
                    chartData = data.map(function(item, idx) {
                        return [[(item[titleKey] || 'Item ' + (idx + 1)).toString(), data.length - idx]];
                    });
                }
                columns = [
                    { dataindex: 0, columnname: formatFieldName(titleKey), datatype: 'ordinal' },
                    { dataindex: 1, columnname: numericKey ? formatFieldName(numericKey) : 'Count', datatype: 'numeric' }
                ];
            }
        }

        return {
            seriesData: { chartdata: [{ data: chartData }] },
            metaDataAxes: axes,
            metaDataColumns: columns
        };
    }

    // Renders the appropriate Lyte UI component into a container element
    function renderLyteView(containerEl, data, viewKey, dataType) {
        // Clear previous content and any rendered Lyte components
        containerEl.innerHTML = '';

        var renderTarget = document.createElement('div');
        renderTarget.id = 'lyteViewTarget_' + (++_lyteViewCounter);
        containerEl.appendChild(renderTarget);

        switch (viewKey) {
            case 'table': {
                var tableData = toLyteTableData(Array.isArray(data) ? data : [data]);
                Lyte.Component.render('data-view-table', {
                    ltPropHeader: tableData.header,
                    ltPropContent: tableData.content
                }, '#' + renderTarget.id);
                break;
            }
            case 'kanban': {
                var boardDetails = toLyteKanbanData(data);
                Lyte.Component.render('data-view-kanban', {
                    ltPropBoardDetails: boardDetails
                }, '#' + renderTarget.id);
                break;
            }
            case 'chart': {
                var chartInfo = toLyteChartData(data);
                Lyte.Component.render('data-view-chart', {
                    ltPropType: 'bar',
                    ltPropTitle: '',
                    ltPropSeriesData: chartInfo.seriesData,
                    ltPropMetaDataAxes: chartInfo.metaDataAxes,
                    ltPropMetaDataColumns: chartInfo.metaDataColumns
                }, '#' + renderTarget.id);
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
                renderLyteView(body, normalized, v.key, dataType);
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
            renderLyteView(body, normalized, defaultView, dataType);
        };
        setTimeout(function() {
            if (container._deferredRender) {
                container._deferredRender();
                container._deferredRender = null;
            }
        }, 0);

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
            const title = item[titleKey] || '(No Name)';

            let fieldsHtml = '';
            keys.forEach(k => {
                if (k === titleKey) return;
                const val = item[k];
                if (val === null || val === undefined) return;
                fieldsHtml += `
                    <div class="list-card-field">
                        <span class="field-label">${escapeHtml(formatFieldName(k))}</span>
                        <span class="field-value">${escapeHtml(String(val))}</span>
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
                tbody += `<td>${val !== null && val !== undefined ? escapeHtml(String(val)) : '—'}</td>`;
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
                const name = item[titleKey] || '(No Name)';
                const metaKey = Object.keys(item).find(k => k !== titleKey && item[k]);
                const meta = metaKey ? `${formatFieldName(metaKey)}: ${item[metaKey]}` : '';
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
            var maxN = isNumArr ? Math.max.apply(null, items.map(Number)) : items.length;
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            items.forEach(function(item, idx) {
                var v = isNumArr ? Number(item) : 1;
                var p = maxN > 0 ? (v / maxN) * 100 : 10;
                var c = COLORS[idx % COLORS.length];
                var l = isNumArr && items.length <= 12 ? monthNames[idx] || ('M' + (idx + 1)) : String(item);
                var g = document.createElement('div');
                g.className = 'chart-bar-group';
                g.innerHTML =
                    '<div class="chart-bar" style="height:' + Math.max(p, 5) + '%;background:' + c + ';">' +
                        '<span class="chart-bar-value">' + (isNumArr ? v : '') + '</span>' +
                    '</div>' +
                    '<span class="chart-bar-label" title="' + escapeHtml(l) + '">' + escapeHtml(l.substring(0, 10)) + '</span>';
                barsDiv.appendChild(g);
            });

            chart.appendChild(barsDiv);
            container.appendChild(chart);
            return;
        }

        // Object array chart
        const titleKey = Object.keys(items[0] || {}).find(k => /name|title|label/i.test(k)) || Object.keys(items[0] || {})[0];
        const numericKey = Object.keys(items[0] || {}).find(k => typeof items[0][k] === 'number');

        const maxVal = numericKey
            ? Math.max.apply(null, items.map(function(it) { return Number(it[numericKey]) || 0; }))
            : items.length;

        items.forEach(function(item, idx) {
            const val = numericKey ? (Number(item[numericKey]) || 0) : (items.length - idx);
            const pct = maxVal > 0 ? (val / maxVal) * 100 : 10;
            const color = COLORS[idx % COLORS.length];
            const label = (item[titleKey] || 'Item ' + (idx + 1)).toString();

            const group = document.createElement('div');
            group.className = 'chart-bar-group';
            group.innerHTML =
                '<div class="chart-bar" style="height:' + Math.max(pct, 5) + '%;background:' + color + ';">' +
                    '<span class="chart-bar-value">' + (numericKey ? val : '') + '</span>' +
                '</div>' +
                '<span class="chart-bar-label" title="' + escapeHtml(label) + '">' + escapeHtml(label.substring(0, 10)) + '</span>';
            barsDiv.appendChild(group);
        });

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
        var title = item[titleKey] || '(No Name)';

        // Header with avatar
        var header = document.createElement('div');
        header.className = 'detail-header';
        header.innerHTML =
            '<div class="detail-avatar" style="background:' + COLORS[0] + '">' +
                '<i class="fas fa-user"></i>' +
            '</div>' +
            '<div class="detail-title-block">' +
                '<h3 class="detail-name">' + escapeHtml(String(title)) + '</h3>' +
                '<span class="detail-subtitle">' + escapeHtml(formatFieldName(titleKey)) + '</span>' +
            '</div>';
        detail.appendChild(header);

        // Fields grid
        var fields = document.createElement('div');
        fields.className = 'detail-fields';

        keys.forEach(function(k) {
            if (k === titleKey) return;
            var val = item[k];
            var displayVal = val !== null && val !== undefined ? String(val) : '—';
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

        function connect() {
            if (_ok && _token) return Promise.resolve();
            if (_connectPromise) return _connectPromise;
            _connectPromise = new Promise(function (res, rej) {
                var tm = setTimeout(function () { _hp = null; _connectPromise = null; rej(new Error('Handshake timeout')); }, 5000);
                _hp = { resolve: function () { clearTimeout(tm); _connectPromise = null; res(); } };
                window.parent.postMessage({ type: 'WIDGET_CSCRIPT_HANDSHAKE' }, '*');
            });
            return _connectPromise;
        }

        // Auto-connect on load
        connect();

        return {
            /**
             * Execute CScript code and return the result.
             * Auto-connects if not already connected.
             * @param {string} code - The CScript code to execute
             * @param {number} [timeout=30000] - Timeout in ms
             * @returns {Promise} Resolves with {status, data} where data is the return value
             */
            run: function (code, timeout) {
                return connect().then(function () {
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
                });
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
