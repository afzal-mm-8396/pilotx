; (function () {
    if ($L) {
        $L.typeWriter = {};
        $L.typeWriter.enable = function (typeWriterObj) {
            return new Promise((resolve, reject) => {
                var type = typeWriterObj.type || 'text';
                var rate = typeWriterObj.rate || 10;
                var text = typeWriterObj.text;
                var revealSelectors = typeWriterObj.revealSelectors || [];
                var htmlSnippet = typeWriterObj.htmlSnippet;
                var container = typeWriterObj.container;
                var onTyped = typeWriterObj.onTyped || function() {};

                if (!container) {
                    return reject("No container provided for typewriter effect.");
                }

                if (type === 'html') {
                    enableHTML(container, htmlSnippet, rate, revealSelectors,onTyped).then(resolve);
                } else if (type === 'text') {
                    enableText(container, text, rate,onTyped).then(resolve);
                } else {
                    reject("Unknown type provided. Use 'text' or 'html'.");
                }
            });
        };

        function enableText(container, text, rate,onTyped) {
            return new Promise((resolve) => {
                var fullText = text || container.innerText || '';
                if (!fullText) {
                    console.error("No text provided for typewriter effect.");
                    return resolve();
                }
                rate = rate || 10;
                container.textContent = '';
                var index = 0;
                var startTime = Date.now();
                var buffer = '';

                function typeWriter() {
                    var elapsed = Date.now() - startTime;
                    var expectedIndex = Math.floor(elapsed / rate);
                    while (index < expectedIndex && index < fullText.length) {
                        buffer += fullText.charAt(index);
                        index++;
                    }
                    container.textContent = buffer; // Only one DOM update per tick
                    onTyped();
                    if (index < fullText.length) {
                        setTimeout(typeWriter, rate);
                    } else {
                        resolve();
                    }
                }
                typeWriter();
            });
        }

        function enableHTML(container, htmlSnippet, rate, revealSelectors, onTyped) {
            return new Promise(function (resolve) {
                rate = rate || 10;

                var defaultSelectors = ['p', 'li'];
                revealSelectors = Array.isArray(revealSelectors)
                    ? revealSelectors.concat(defaultSelectors)
                    : defaultSelectors;

                // Clear the container first
                container.innerHTML = '';


                var tempContainer = document.createElement('div');
                tempContainer.innerHTML = htmlSnippet || '';


                // hide selected parent elements initially
                for (var s = 0; s < revealSelectors.length; s++) {
                    var sel = revealSelectors[s];
                    var els = tempContainer.querySelectorAll(sel);
                    for (var i = 0; i < els.length; i++) {
                        els[i].style.visibility = 'hidden';
                    }
                }

                function getTextNodes(node, list) {
                    node.childNodes.forEach(child => {
                        if (child.nodeType === 3 && child.nodeValue.trim().length > 0) {
                            list.push(child);
                        } else {
                            getTextNodes(child, list);
                        }
                    });
                }

                var textNodes = [];
                getTextNodes(tempContainer, textNodes);

                // store original strings and compute total length
                var originals = [];
                var totalLength = 0;
                for (var i = 0; i < textNodes.length; i++) {
                    originals.push(textNodes[i].nodeValue);
                    totalLength += originals[i].length;
                }

                // append to real container, but clear text
                container.appendChild(tempContainer);
                for (var i = 0; i < textNodes.length; i++) {
                    textNodes[i].nodeValue = '';
                }

                // helpers to reveal parent and set node substrings
                function revealParentIfNeeded(node) {
                    for (var r = 0; r < revealSelectors.length; r++) {
                        var sel = revealSelectors[r];
                        // closest might not exist in old browsers; using loop up parents
                        var el = node.parentElement;
                        while (el) {
                            if (el.matches && el.matches(sel)) {
                                if (el.style.visibility === 'hidden') {
                                    el.style.visibility = 'visible';
                                }
                                break;
                            }
                            el = el.parentElement;
                        }
                    }
                }

                function renderUpToChars(chars) {
                    // chars is how many characters should be visible in total
                    if (chars <= 0) {
                        return;
                    }
                    if (chars >= totalLength) {
                        // reveal everything
                        for (var ni = 0; ni < textNodes.length; ni++) {
                            textNodes[ni].nodeValue = originals[ni];
                            revealParentIfNeeded(textNodes[ni]);
                            onTyped();
                        }
                        return;
                    }

                    var remaining = chars;
                    for (var ni = 0; ni < textNodes.length; ni++) {
                        var str = originals[ni];
                        if (remaining >= str.length) {
                            textNodes[ni].nodeValue = str;
                            revealParentIfNeeded(textNodes[ni]);
                            onTyped();

                            remaining -= str.length;
                        } else if (remaining > 0) {
                            textNodes[ni].nodeValue = str.substring(0, remaining);
                            revealParentIfNeeded(textNodes[ni]);
                            onTyped();
                            // clear rest
                            for (var k = ni + 1; k < textNodes.length; k++) {
                                textNodes[k].nodeValue = '';
                            }
                            remaining = 0;
                            break;
                        } else {
                            textNodes[ni].nodeValue = '';
                        }
                    }
                }

                // time tracking
                var startTime = Date.now();
                var finished = false;
                var tickTimer = null;

                function tick() {
                    if (finished) {
                        return;
                    }
                    var elapsed = Date.now() - startTime;
                    var expectedChars = Math.floor(elapsed / rate);

                    if (expectedChars >= totalLength) {
                        // finish
                        renderUpToChars(totalLength);
                        finished = true;
                        cleanupAndResolve();
                        return;
                    }

                    renderUpToChars(expectedChars);

                    // schedule next tick. Use a reasonable interval but exact timing doesn't matter
                    clearTimeout(tickTimer);
                    tickTimer = setTimeout(tick, rate);
                }

                // visibility handler: when page becomes visible, immediately fast-forward render
                function onVisibilityChange() {
                    if (document.visibilityState === 'visible') {
                        // Immediately compute and render expected characters.
                        var elapsed = Date.now() - startTime;
                        var expectedChars = Math.floor(elapsed / rate);
                        if (expectedChars >= totalLength) {
                            renderUpToChars(totalLength);
                            finished = true;
                            cleanupAndResolve();
                            return;
                        }
                        renderUpToChars(expectedChars);
                    }
                }

                function cleanupAndResolve() {
                    clearTimeout(tickTimer);
                    document.removeEventListener('visibilitychange', onVisibilityChange);
                    resolve();
                }

                // Start ticking and listen for visibility changes
                document.addEventListener('visibilitychange', onVisibilityChange);
                tick(); // initial start
            });
        }

    }
})();