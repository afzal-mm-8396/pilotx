

// ===== WIDGET CSCRIPT BRIDGE =====
(function () {
    var _mixinLoading = null;
    /**
     * Send a response back to the widget iframe
     */
    function reply(win, origin, id, result, error) {
        try {
            win.postMessage({
                type: 'WIDGET_CSCRIPT_RESULT',
                requestId: id,
                result: error ? null : result,
                error: error ? {
                    message: typeof error === 'string' ? error : (error.message || 'Error'),
                    type: error.type || 'ExecutionError'
                } : null
            }, origin && origin !== 'null' ? origin : '*');
        } catch (e) { /* postMessage failed */ }
    }

    /**
     * Ensure the crm-cscript-engine-mixin is loaded; returns a Promise
     */
    function ensureMixin() {
        if (Lyte.registeredMixins && Lyte.registeredMixins['crm-cscript-engine-mixin']) {
            return Promise.resolve();
        }
        if (_mixinLoading) return _mixinLoading;

        _mixinLoading = new Promise(function (resolve, reject) {
            try {
                Lyte.injectResources(
                    [networkUtils.returnDependencyFiles(["cscript/crm-cscript-engine-mixin.js"], ResourceConstants.CRMClient)], // no i18n
                    undefined,
                    function () {
                        _mixinLoading = null;
                        if (Lyte.registeredMixins && Lyte.registeredMixins['crm-cscript-engine-mixin']) {
                            resolve();
                        } else {
                            reject(new Error('Mixin not available after injection'));
                        }
                    }
                );
                // Timeout fallback
                setTimeout(function () {
                    _mixinLoading = null;
                    reject(new Error('Mixin load timeout'));
                }, 15000);
            } catch (err) {
                _mixinLoading = null;
                reject(err);
            }
        });
        return _mixinLoading;
    }

    /**
     * Execute code via the engine mixin and return the result
     */
    async function executeCode(code, obj) {
        return ensureMixin().then(async function () {
            console.log('code passed to crm cscript execution environment', code);
            let result = await Lyte.registeredMixins['crm-cscript-engine-mixin'].execute(code);
            console.log('result from crm cscript execution environment', result);
            obj.result = result;
        });
    }


    // ==================== MESSAGE LISTENER ====================
    window.addEventListener('message', function (event) {
        if (!event.data || !event.source) return;
        var d = event.data;

        // ==================== HANDSHAKE ====================
        if (d.type === 'WIDGET_CSCRIPT_HANDSHAKE') {
            try {
                event.source.postMessage({
                    type: 'WIDGET_CSCRIPT_HANDSHAKE_ACK',
                    token: 'open'
                }, event.origin === 'null' ? '*' : event.origin);
            } catch (e) { /* postMessage failed */ }
            return;
        }

        // ==================== EXECUTE ====================
        if (d.type === 'WIDGET_CSCRIPT_EXECUTE') {
            var rid = d.requestId, code = d.sourceCode;
            var win = event.source, ori = event.origin;

            if (!code) {
                reply(win, ori, rid, null, { message: 'No code provided', type: 'ValidationError' });
                return;
            }

            // --- Execute directly ---
            let obj = {};
            executeCode(code, obj)
                .then(function (result) {
                    var resultData = obj.result && typeof obj.result === 'object' ? obj.result : { data: obj.result };
                    reply(win, ori, rid, { status: 'success', data: resultData }, null);
                })
                .catch(function (err) {
                    reply(win, ori, rid, null, {
                        message: err && err.message ? err.message : (typeof err === 'string' ? err : 'Execution failed'),
                        type: err && err.type ? err.type : 'ExecutionError'
                    });
                });
        }
    });

})();
