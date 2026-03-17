/**
 *                                  === Parameters ===
 *  
 * options = {
 *           component, // To specify the component,
 *           format,  // to specify the format of the report
 *           stateChanges, // to specify custom ARIA_STATE_CHANGES for the component
 *           activeButton, // to specify the button or triggers that will open popup like menu,modal
 *           }, 
 * classes = {
 *           ['componentName']:[className] ,... // to specfiy custom(your) component testing class
 *          }, 
 * ignore = [], // to ignore the queryselector and role check for components without role like (accordion,disclosure,carousel)
 * 
 *               === Classes to extend and use for user custom component class ===
 * 
 *  BaseTester               // Base tester class to which extends KeyboardSimulator to test aria-attr changes  
 *  KeyboardSimulator        // This class is used to key simulation of keys and tab key.  
 *  AriaAttributeValidator   // This class is contains  functions to compare the aria-attr changes after key is pressed using simulation.
 *  AccessibilityResult      // This class is used to flag the issues, passes, inapplicable,incomplete and error 
 *  AriaStateSnapshot        // This class is used to snapShot state of aria attributes
 * 
 *                                          === Returns ===
 * Object Instance of AccessibilityResult Class
 */

(function (window) {
    if (!$L) {
        return;
    }
    const patternUrl = {
        'accordion': 'accordion',
        'combobox': 'combobox',
        'disclosure': 'disclosure',
        'listbox': 'listbox',
        'dialog': 'dialog',
        'grid': 'grid',
        'tab': 'tabs',
        'tablist': 'tabs',
        'tree': 'tree',
        'alertdialog': 'alertdialog',
        'menu': 'menu',
        'menubar': 'menubar',
        'radiogroup': 'radiogroup',
        'checkbox': 'checkbox',
        'switch': 'switch',
        'progressbar': 'progressbar',
        'button': 'button',
        'table': 'table',
        'link': 'link',
        'spinbutton': 'spinbutton',
        'breadcrumb': 'breadcrumb',
        'slider': 'slider',
        'toolbar': 'toolbar',
        'treegrid': 'treegrid',
        'carousel': 'carousel',
    }
    const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';
    // ===== ARIA ATTRIBUTE CHANGE MAPPINGS =====
    const ARIA_STATE_CHANGES = {
        accordion: {
            'Enter': { 'aria-expanded': { from: 'false', to: 'true', or: null } },
            'Space': { 'aria-expanded': { from: 'true', to: 'false', or: null } }
        },
        button: {
            'Enter': { 'aria-pressed': { from: 'false', to: 'true', or: null } },
            'Space': { 'aria-pressed': { from: 'false', to: 'true', or: null } }
        },
        checkbox: {
            'Space': { 'aria-checked': { from: 'false', to: 'true', or: 'mixed' } }
        },
        combobox: {
            'ArrowDown': { 'aria-expanded': { from: 'false', to: 'true', or: null } },
            'Escape': { 'aria-expanded': { from: 'true', to: 'false', or: null } }
        },
        dialog: {
            'Escape': { 'aria-modal': { shouldRemain: 'true', or: null } },
            'Enter': { 'aria-selected': { from: 'false', to: 'true', isDateDialog: true } }
        },
        alertdialog: {
            'Escape': { 'aria-modal': { shouldRemain: 'true', or: null } },
        },
        disclosure: {
            'Enter': { 'aria-expanded': { from: 'false', to: 'true', or: null } },
            'Space': { 'aria-expanded': { from: 'false', to: 'true', or: null } }
        },
        listbox: {
            'ArrowDown': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'ArrowUp': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'Enter': { 'aria-selected': { from: 'false', to: 'true', or: null } },
            'Space': { 'aria-selected': { from: 'false', to: 'true', or: null } }
        },
        menu: {
            'ArrowDown': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'ArrowUp': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'Escape': { 'aria-expanded': { from: 'true', to: 'false', or: null, isTrigger: true } }
        },
        slider: {
            'ArrowUp': { 'aria-valuenow': { shouldIncrease: true, or: null } },
            'ArrowDown': { 'aria-valuenow': { shouldDecrease: true, or: null } },
            'ArrowRight': { 'aria-valuenow': { shouldIncrease: true, or: null } },
            'ArrowLeft': { 'aria-valuenow': { shouldDecrease: true, or: null } },
            'End': { 'aria-valuenow': { shouldEqual: 'aria-valuemax', or: null } },
            'Home': { 'aria-valuenow': { shouldEqual: 'aria-valuemin', or: null } }
        },
        spinbutton: {
            'ArrowUp': { 'aria-valuenow': { shouldIncrease: true, or: null } },
            'ArrowDown': { 'aria-valuenow': { shouldDecrease: true, or: null } },
            'Home': { 'aria-valuenow': { shouldEqual: 'aria-valuemin', or: null } },
            'End': { 'aria-valuenow': { shouldEqual: 'aria-valuemax', or: null } }
        },
        switch: {
            'Space': { 'aria-checked': { from: 'false', to: 'true', or: null } }
        },
        tab: {
            'ArrowRight': { 'aria-selected': { shouldUpdate: true, or: null } },
            'ArrowLeft': { 'aria-selected': { shouldUpdate: true, or: null } }
        },
        tablist: {
            'ArrowRight': { 'aria-selected': { shouldUpdate: true, or: null } },
            'ArrowLeft': { 'aria-selected': { shouldUpdate: true, or: null } }
        },
        tree: {
            'ArrowDown': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'ArrowUp': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'ArrowRight': { 'aria-expanded': { from: 'false', to: 'true', or: null } },
            'ArrowLeft': { 'aria-expanded': { from: 'true', to: 'false', or: null } }
        },
        grid: {
            'isPopup': true,
            'ArrowDown': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
            'ArrowUp': { 'aria-activedescendant': { shouldUpdate: true, or: null, isTrigger: true } },
        },
        radiogroup: {
            'Space': { 'aria-checked': { from: 'false', to: 'true', or: 'mixed', isTrigger: true } },
            'ArrowRight': { 'aria-activedescendant': { shouldUpdate: true, or: null }, 'aria-checked': { from: 'true', to: 'false', or: 'mixed', isTrigger: true } },
            'ArrowLeft': { 'aria-activedescendant': { shouldUpdate: true, or: null }, 'aria-checked': { from: 'true', to: 'false', or: 'mixed', isTrigger: true } },
            'ArrowDown': { 'aria-activedescendant': { shouldUpdate: true, or: null }, 'aria-checked': { from: 'true', to: 'false', or: 'mixed', isTrigger: true } },
            'ArrowUp': { 'aria-activedescendant': { shouldUpdate: true, or: null }, 'aria-checked': { from: 'true', to: 'false', or: 'mixed', isTrigger: true } },
        },
        treegrid: {
            'ArrowRight': { 'aria-expanded': { shouldUpdate: true } },
            'ArrowLeft': { 'aria-expanded': { shouldUpdate: true } }
        }
    };
    // ===== ARIA State Capture =====
    class AriaStateSnapshot {
        constructor(element) {
            this.timestamp = Date.now();
            this.attributes = this.captureAriaAttributes(element);
            this.activedescendant = element.getAttribute('aria-activedescendant');
            this.expanded = element.getAttribute('aria-expanded');
            this.selected = element.getAttribute('aria-selected');
            this.checked = element.getAttribute('aria-checked');
            this.pressed = element.getAttribute('aria-pressed');
            this.valuenow = element.getAttribute('aria-valuenow');
        }

        captureAriaAttributes(element) {
            const attrs = {};
            const ariaAttrs = Array.from(element.attributes).filter(attr =>
                attr.name.startsWith('aria-')
            );
            ariaAttrs.forEach(attr => {
                attrs[attr.name] = attr.value;
            });
            return attrs;
        }

        compareWith(after) {
            const changes = {};
            const allKeys = new Set([
                ...Object.keys(this.attributes),
                ...Object.keys(after.attributes)
            ]);

            allKeys.forEach(key => {
                const before = this.attributes[key];
                const afterValue = after.attributes[key];
                if (before !== afterValue) {
                    changes[key] = {
                        before: before || null,
                        after: afterValue || null,
                        changed: true
                    };
                }
            });

            return changes;
        }
    }
    // ===== Result Structure =====
    class AccessibilityResult {
        constructor(format = 'target', component = '') {
            this.format = format;
            this.component = component;
            this.passes = [];
            this.violations = [];
            this.incomplete = [];
            this.inapplicable = [];
            this.error = []
            this.ariaStateChanges = {};
        }
        toJSON() {
            return {
                passes: this.passes,
                violations: this.violations,
                incomplete: this.incomplete,
                inapplicable: this.inapplicable,
                ariaStateChanges: this.ariaStateChanges,
                error: this.error
            };
        }
        addError(data) {
            this.error.push(data)
        }
        addViolation(data) {
            this.pushReport(data.element, data, 'violations')
        }
        addPass(data) {
            this.pushReport(data.element, data, 'passes');
        }
        addIncomplete(data) {
            this.pushReport(data.element, data, 'incomplete');
        }
        addInapplicable(data) {
            this.pushReport(data.element, data, 'inapplicable');
        }
        recordAriaStateChange(key, element, keyPressed, before, after, expectedChanges) {
            if (!this.ariaStateChanges[key]) {
                this.ariaStateChanges[key] = [];
            }
            this.ariaStateChanges[key].push({
                element: this._getSelector(element),
                keyPressed,
                before,
                after,
                expectedChanges,
                timestamp: new Date().toISOString()
            });
        }
        _generateAxeViolation({ id, impact = 'serious', message = '', help = '', tags = ["cat.keyboard", "wcag2a", "wcag211", "wcag212", "section508", "section508.21.a", "EN-301-549", "EN-9.2.1.1", "EN-9.2.1.2", "ACT", "ACT-Keyboard", "RGAAv4", "RGAA-7.1", "RGAA-7.2"], role, helpUrl, fix } = {}) {
            return {
                id, impact, tags, description: message, help,
                helpUrl: helpUrl || `https://www.w3.org/WAI/ARIA/apg/patterns/${patternUrl[this.component]}`,
                nodes: [], fix
            };
        }
        pushReport(element, data, arrayPush) {
            const html = this._getOpeningTag(element.outerHTML);
            if (this.format === 'id') {
                let idObj = this[arrayPush].find(e => e.id == data.id);
                if (!idObj) {
                    idObj = this._generateAxeViolation({ ...data, role: element.getAttribute('role') });
                    this[arrayPush].push(idObj);
                }
                idObj.nodes.push({ any: [], all: [{ message: data.message }], none: [], impact: data.impact, html: html, target: [this._getSelector(element)] });
            } else {
                const target = this._getSelector(element);
                let targetObj = this[arrayPush].find(e => e.target == target);
                if (!targetObj) {
                    targetObj = { html: html, target: target, issueDetails: [] };
                    this[arrayPush].push(targetObj);
                }
                targetObj.issueDetails.push(this._generateAxeViolation({ ...data, role: element.getAttribute('role') }));
            }
        }
        _getSelector(element, parentPath = null) {
            if (!element || element.nodeType !== 1) {
                return '';
            }
            const esc = (str) => {
                if (typeof str !== 'string') {
                    return str;
                }
                if (window.CSS && typeof CSS.escape === 'function') {
                    return CSS.escape(str);
                }
                return str.replace(/([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, '\\$1');
            };
            const tag = (el) => el.tagName.toLowerCase();
            const testUnique = (sel, el) => {
                try {
                    const found = document.querySelector(sel);
                    return found === el;
                } catch (e) {
                    return false;
                }
            };
            const getAttributeSelector = (el) => {
                const t = tag(el);
                if (el.id) {
                    const idSel = `${t}#${esc(el.id)}`;
                    // include role if present and helpful
                    if (el.hasAttribute('role')) {
                        const roleSel = `${t}#${esc(el.id)}[role="${esc(el.getAttribute('role'))}"]`;
                        if (testUnique(roleSel, el)) {
                            return roleSel;
                        }
                    }
                    if (testUnique(idSel, el)) {
                        return idSel;
                    }
                }

                // label[for] (very specific)
                if (t === 'label' && el.hasAttribute('for')) {
                    const sel = `label[for="${esc(el.getAttribute('for'))}"]`;
                    if (testUnique(sel, el)) return sel;
                }

                // name attribute (may not be unique)
                if (el.hasAttribute('name')) {
                    const sel = `${t}[name="${esc(el.getAttribute('name'))}"]`;
                    if (testUnique(sel, el)) return sel;
                }

                // data-* attributes
                for (const attr of Array.from(el.attributes)) {
                    if (attr.name.startsWith('data-')) {
                        const value = attr.value;
                        if (value) {
                            const sel = `${t}[${attr.name}="${esc(value)}"]`;
                            if (testUnique(sel, el)) return sel;
                        }
                    }
                }

                return null;
            };
            const getNthOfType = (el, parent) => {
                let node = el;
                let parts = [];
                while (node.parentElement && node !== parent && node.tagName !== 'HTML') {
                    const tagName = node.tagName.toLowerCase();
                    const siblings = Array.from(node.parentElement.children)
                        .filter(child => child.tagName.toLowerCase() === tagName);
                    const index = siblings.indexOf(node) + 1;
                    node = node.parentElement;
                    parts.unshift(`${tagName}:nth-of-type(${index})`);
                }

                return parts.join('>');
            };
            const findUniqueAncestorSelector = (el) => {
                let current = el;
                while (current && current.nodeType === 1 && current.tagName !== 'HTML') {
                    const attrSel = getAttributeSelector(current);
                    if (attrSel) {
                        return { selector: attrSel, element: current };
                    }
                    current = current.parentElement;
                }
                return null;
            };
            const attrSelector = getAttributeSelector(element);
            if (attrSelector) {
                return attrSelector;
            }
            if (parentPath) {
                const parent = document.querySelector(parentPath);
                if (!parent) {
                    return 'body';
                }
                return `${parentPath} > ${getNthOfType(element, parent)}`;
            }
            const uniqueAncestor = findUniqueAncestorSelector(element.parentElement);
            if (uniqueAncestor) {
                const childNth = getNthOfType(element, uniqueAncestor.element);
                return `${uniqueAncestor.selector}>${childNth}`;
            }
            const parts = [];
            let cur = element;
            while (cur && cur.nodeType === 1 && cur.tagName !== 'BODY') {
                const parent = cur.parentElement;
                if (!parent) break;
                parts.unshift(getNthOfType(cur, parent));
                cur = parent;
            }
            return 'body > ' + parts.join(' > ');
        }
        _getOpeningTag(outerHTML) {
            if (typeof outerHTML !== 'string') { return ''; }
            if (outerHTML.length <= 500) { return outerHTML; }
            const match = outerHTML.match(/^<[^>]+?>/);
            return match ? match[0] : '';
        }
    }
    // ===== Keyboard Simulator=====
    class KeyboardSimulator {
        constructor() {
            this.highlightedElements = new WeakMap();
        }
        highlight(element) {
            if (!element) { return; }
            if (this.highlightedElements.has(element)) { return; }

            const backup = {
                background: element.style.background || '',
                outline: element.style.outline || '',
                boxShadow: element.style.boxShadow || ''
            };

            this.highlightedElements.set(element, backup);
            element.style.setProperty('background', 'rgba(255, 255, 0, 0.3)', 'important');
            element.style.setProperty('outline', '2px solid red', 'important');
            element.style.setProperty('box-shadow', '0 0 8px rgba(255, 0, 0, 0.5)', 'important');
        }
        removeHighlight(element) {
            if (!element || !this.highlightedElements.has(element)) {
                return;
            }
            const backup = this.highlightedElements.get(element);
            if (backup.background) {
                element.style.background = backup.background;
            }
            else {
                element.style.removeProperty('background');
            }
            if (backup.outline) {
                element.style.outline = backup.outline;
            }
            else {
                element.style.removeProperty('outline');
            }
            if (backup.boxShadow) {
                element.style.boxShadow = backup.boxShadow;
            }
            else {
                element.style.removeProperty('box-shadow');
            }
            this.highlightedElements.delete(element);
        }
        isVisible(element) {
            if (!element) { return false; }
            if (element.hasAttribute('hidden')) { return false; }

            const style = window.getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') { return false; }

            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
        }
        isFocusable(element) {
            if (!element) {
                return false;
            }
            if (element.hasAttribute('disabled')) {
                return false;
            }
            if (element.style.display === 'none' || element.offsetParent === null) {
                return false;
            }

            return element.matches(FOCUSABLE_SELECTOR) || element.querySelectorAll(FOCUSABLE_SELECTOR) ||
                (element.hasAttribute('tabindex') && parseInt(element.getAttribute('tabindex')) >= -1);
        }
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        createKeyEvent(type, key) {
            const keyCodeMap = {
                'Enter': 13, 'Escape': 27, 'ArrowUp': 38, 'ArrowDown': 40,
                'ArrowLeft': 37, 'ArrowRight': 39, 'Tab': 9, 'Space': 32,
                'Home': 36, 'End': 35, 'PageUp': 33, 'PageDown': 34
            };

            const keyChar = key === 'Space' ? ' ' : key;
            const keyCode = key.length === 1 ? key.charCodeAt(0) : (keyCodeMap[key] || 0);

            return new KeyboardEvent(type, {
                key: keyChar,
                code: key,
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true
            });
        }
        dispatchFocusEvents(el) {
            el.dispatchEvent(new FocusEvent('focus', {
                bubbles: false,
                cancelable: false
            }));

            el.dispatchEvent(new FocusEvent('focusin', {
                bubbles: true,
                cancelable: false
            }));
        };
        dispatchBlurEvents(el) {
            el.dispatchEvent(new FocusEvent('focusout', {
                bubbles: true,
                cancelable: false
            }));

            el.dispatchEvent(new FocusEvent('blur', {
                bubbles: false,
                cancelable: false
            }));
        };
        async simulateKeyPress(element, key, trigger, options = {}) {
            const { focus = true, humanDelay = true, delayBetweenPress = null, searchText = '' } = options;
            if (!element) { throw new Error('No element provided'); }
            const stateBefore = new AriaStateSnapshot(element);
            const triggerStateBefore = trigger && new AriaStateSnapshot(trigger);
            if (focus) {
                if (document.activeElement !== element) {
                    if (document.activeElement) {
                        this.dispatchBlurEvents(document.activeElement);
                    }
                }
                element.focus();
                this.dispatchFocusEvents(element);
                if (humanDelay) { await this.delay(this.random(5, 10)); }
            }
            element.dispatchEvent(this.createKeyEvent('keydown', key));
            if (trigger) { trigger.dispatchEvent(this.createKeyEvent('keydown', key)); }
            if (humanDelay) { await this.delay(this.random(5, 10)) };
            if (element.isContentEditable || ["INPUT", "TEXTAREA"].includes(element.tagName)) {
                const inputProps = {
                    inputType: "insertText",
                    data: key.length === 1 ? key : null,
                    bubbles: true,
                    cancelable: true
                };
                element.dispatchEvent(new InputEvent("beforeinput", inputProps));
                element.dispatchEvent(new InputEvent("input", { ...inputProps, cancelable: false }));
                for (let char of searchText) {
                    element.value += char;
                    element.dispatchEvent(new InputEvent("input", {
                        ...inputProps,
                        data: char
                    }));
                }
            }
            element.dispatchEvent(this.createKeyEvent('keyup', key));
            if (humanDelay) { await this.delay(this.random(5, 10)); }
            if (delayBetweenPress !== null) {
                await this.delay(delayBetweenPress);
            } else if (humanDelay) {
                await this.delay(this.random(5, 10));
            }

            // Capture state AFTER key press
            const stateAfter = new AriaStateSnapshot(element);
            const triggerStateAfter = trigger && new AriaStateSnapshot(trigger);
            const changes = stateBefore.compareWith(stateAfter);
            const triggerChanges = trigger && triggerStateBefore.compareWith(triggerStateAfter);
            const activeElement = document.activeElement;

            return {
                activeElement,
                stateBefore,
                stateAfter,
                triggerStateBefore,
                triggerStateAfter,
                triggerChanges,
                changes
            };
        }
        async didFocusMove(element, key) {
            if (!element) {
                return false;
            }
            element.focus();
            const before = document.activeElement;
            const result = await this.simulateKeyPress(element, key);
            const after = result.activeElement;
            return before !== after;
        }
        getFocusableElements(container = document) {
            return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
                .filter(el => el.offsetParent !== null);
        }
        async simulateTab(forward = true, container) {
            const focusable = this.getFocusableElements(container);
            const current = document.activeElement;
            const index = focusable.indexOf(current);
            let nextIndex = forward ? index + 1 : index - 1;
            if (nextIndex >= focusable.length) {
                nextIndex = 0;
            }
            if (nextIndex < 0) {
                nextIndex = focusable.length - 1;
            }
            if (focusable[nextIndex]) {
                focusable[nextIndex].focus();
                return focusable[nextIndex];
            }
            return current;
        }
    }
    // ===== ARIA Attribute Validator =====
    class AriaAttributeValidator {
        constructor(result = new AccessibilityResult(), component) {
            this.result = result;
            this.component = component;
        }
        async validateStateChange(element, key, stateChange, keyResult, trigger) {
            if (!stateChange) {
                this.result.addIncomplete({
                    element,
                    id: `${this.component}-${key}-state-change-unknown`,
                    message: `No state change definition for ${this.component} on ${key}`,
                    component: this.component
                });
                return null;
            }

            const changes = {};
            let isValid = true;

            for (const [attrName, expectation] of Object.entries(stateChange)) {
                const validateEl = expectation.isTrigger ? (trigger ? trigger : element) : element;

                changes[attrName] = await this._validateAttribute(
                    validateEl, attrName, expectation, key, keyResult
                );
                if (!changes[attrName].valid) {
                    isValid = false;
                }
            }

            return { valid: isValid, changes };
        }
        // Mapping for all the Validations .
        async _validateAttribute(element, attrName, expectation, key, keyResult) {
            const currentValue = element.getAttribute(attrName);
            // Type: Value transition (from X to Y)
            if (expectation.from !== undefined && expectation.to !== undefined) {
                return this._validateTransition(
                    element, attrName, currentValue, expectation, key, keyResult
                );
            }

            // Type: Should update (value changes)
            if (expectation.shouldUpdate !== undefined) {
                return this._validateUpdate(
                    element, attrName, currentValue, expectation, key, keyResult
                );
            }

            // Type: Should increase/decrease (numeric)
            if (expectation.shouldIncrease !== undefined) {
                return this._validateNumericChange(
                    element, attrName, currentValue, expectation, 'increase', key, keyResult
                );
            }

            if (expectation.shouldDecrease !== undefined) {
                return this._validateNumericChange(
                    element, attrName, currentValue, expectation, 'decrease', key, keyResult
                );
            }

            // Type: Should equal another attribute
            if (expectation.shouldEqual !== undefined) {
                return this._validateEquality(
                    element, attrName, currentValue, expectation, key, keyResult
                );
            }

            // Type: Should remain (no change needed)
            if (expectation.shouldRemain !== undefined) {
                return this._validateRemain(
                    element, attrName, currentValue, expectation, key, keyResult
                );
            }

            return { valid: false, issue: 'Unknown validation type' };
        }
        // {from , to ,or } transitions
        async _validateTransition(element, attrName, current, expectation, key, keyResult) {
            const { from, to, or } = expectation;
            if (current === to) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-updated`,
                    message: `${attrName} correctly changed from ${from} to ${to} on ${key}`,
                    component: this.component
                });
                return { valid: true, from, to, current };
            }

            if (or && current === or) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-updated`,
                    message: `${attrName} correctly changed to ${or} on ${key}`,
                    component: this.component
                });
                return { valid: true, from, to: or, current };
            }


            this.result.addViolation({
                element,
                id: `${this.component}-${key}-${attrName}-not-updated`,
                impact: 'serious',
                message: `${attrName} should change to ${to} on ${key} press, but is ${current}`,
                help: `Ensure ${attrName} is updated when ${key} is pressed`,
                fix: `Update ${attrName} to ${to} when ${key} is pressed for ${this.component}`,
                component: this.component
            });
            return { valid: false, from, to, current, issue: 'not-updated' };
        }
        // {shouldUpdate} Updates
        async _validateUpdate(element, attrName, current, expectation, key, keyResult) {
            if (current) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-exists`,
                    message: `${attrName} exists and should be updated on ${key}`,
                    component: this.component
                });
                return { valid: true, updated: true, current };
            }

            this.result.addViolation({
                element,
                id: `${this.component}-${key}-${attrName}-missing`,
                impact: 'serious',
                message: `${attrName} must exist to be updated on ${key}`,
                help: `Add ${attrName} attribute to ${this.component}`,
                fix: `Add ${attrName} attribute to ${this.component} to enable updates on ${key}`,
                component: this.component
            });
            return { valid: false, updated: false, current, issue: 'missing' };
        }
        // {shouldIncrease,shouldDecrease} Numeric change
        async _validateNumericChange(element, attrName, current, expectation, direction, key, keyResult) {
            if (!current || isNaN(current)) {
                this.result.addViolation({
                    element,
                    id: `${this.component}-${key}-${attrName}-not-numeric`,
                    impact: 'serious',
                    message: `${attrName} must be numeric for ${direction} validation on ${key}`,
                    help: `Ensure ${attrName} contains a numeric value`,
                    fix: `Set ${attrName} to a numeric value for ${this.component} to enable ${direction} validation on ${key}`,
                    component: this.component
                });
                return { valid: false, issue: 'not-numeric' };
            }

            const currentNum = parseInt(current, 10);
            const minValue = parseInt(element.getAttribute('aria-valuemin'), 10);
            const maxValue = parseInt(element.getAttribute('aria-valuemax'), 10);

            if (direction === 'increase' && currentNum > minValue) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-increased`,
                    message: `${attrName} correctly increased on ${key}`,
                    component: this.component
                });
                return { valid: true, changed: 'increased', current: currentNum };
            }

            if (direction === 'decrease' && currentNum < maxValue) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-decreased`,
                    message: `${attrName} correctly decreased on ${key}`,
                    component: this.component
                });
                return { valid: true, changed: 'decreased', current: currentNum };
            }

            this.result.addViolation({
                element,
                id: `${this.component}-${key}-${attrName}-not-${direction}`,
                impact: 'serious',
                message: `${attrName} should ${direction} on ${key} press`,
                help: `Implement ${direction} logic for ${attrName}`,
                fix: `Update ${attrName} to ${direction} value when ${key} is pressed for ${this.component}`,
                component: this.component
            });
            return { valid: false, changed: false, issue: `not-${direction}` };
        }
        // {shouldEqual} Equal to 
        async _validateEquality(element, attrName, current, expectation, key, keyResult) {
            const { shouldEqual } = expectation;
            const expectedValue = element.getAttribute(shouldEqual);

            if (current === expectedValue) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-equals-${shouldEqual}`,
                    message: `${attrName} correctly equals ${shouldEqual} on ${key}`,
                    component: this.component
                });
                return { valid: true, equals: shouldEqual, current };
            }

            this.result.addViolation({
                element,
                id: `${this.component}-${key}-${attrName}-not-equal`,
                impact: 'serious',
                message: `${attrName} should equal ${shouldEqual} on ${key}, but ${attrName}=${current} and ${shouldEqual}=${expectedValue}`,
                help: `Set ${attrName} to match ${shouldEqual} value`,
                fix: `Update ${attrName} to equal ${shouldEqual} for ${this.component} on ${key}`,
                component: this.component
            });
            return { valid: false, equals: shouldEqual, current, expected: expectedValue, issue: 'not-equal' };
        }
        // {shouldRemain} remain same 
        async _validateRemain(element, attrName, current, expectation, key, keyResult) {
            const { shouldRemain } = expectation;

            if (current === shouldRemain) {
                this.result.addPass({
                    element,
                    id: `${this.component}-${key}-${attrName}-remains`,
                    message: `${attrName} correctly remains ${shouldRemain} after ${key}`,
                    component: this.component
                });
                return { valid: true, remains: shouldRemain, current };
            }

            this.result.addViolation({
                element,
                id: `${this.component}-${key}-${attrName}-changed-unexpectedly`,
                impact: 'serious',
                message: `${attrName} should remain ${shouldRemain} but is ${current}`,
                help: `Ensure ${attrName} is not modified`,
                fix: `Prevent changes to ${attrName} for ${this.component} on ${key}`,
                component: this.component
            });
            return { valid: false, remains: shouldRemain, current, issue: 'changed-unexpectedly' };
        }
    }
    // =====Base Tester =====
    class BaseTester extends KeyboardSimulator {
        constructor(options = {}) {
            super();
            this.result = new AccessibilityResult(options.format || 'target', options.component);
            this.component = options.component || '';
            this.stateChanges = ARIA_STATE_CHANGES[this.component] || options.stateChanges || {};
            this.validator = new AriaAttributeValidator(this.result, this.component);
            this.testCell = 5;
            this.orientation = {
                'horizontal': { nextKey: "ArrowRight", prevKey: "ArrowLeft" },
                'vertical': { nextKey: "ArrowDown", prevKey: "ArrowUp" }
            };
            this.defaults = {
                tablist: 'horizontal',
                radiogroup: 'vertical',
                listbox: 'vertical',
                menubar: 'horizontal',
                toolbar: 'horizontal',
                slider: 'horizontal',
            };
            this.activeButton = options.activeButton;
            this.simulateEnter = options.simulateEnter || false;
            this.options = options || {};
        }
        async keyNavCheck(cell, arrowKey) {
            let isFocusMoved = await this.didFocusMove(cell, arrowKey);
            !isFocusMoved ? isFocusMoved = await this.didFocusMove(cell, arrowKey) : '';
            if (!isFocusMoved) {
                this.result.addViolation({
                    element: cell,
                    id: `${this.component}-no-${arrowKey}`,
                    message: `The ${arrowKey} key is not implemented for the ${this.component}.The focus is not moved to next element.`,
                    impact: 'serious',
                    fix: `Implement ${arrowKey} key navigation for ${this.component} to move focus to next element.`,
                    component: `${this.component}`
                })
            } else {
                this.result.addPass({
                    element: cell,
                    id: `${this.component}-${arrowKey}`,
                    message: `The ${arrowKey} key is implemented for the ${this.component}.The focus is moved to next element.`,
                    component: `${this.component}`
                })
            }
        }
        async checkSelect(option, popup) {
            if (!this.simulateEnter) { return }
            await this.simulateKeyPress(option, 'Enter');
            if (option.getAttribute('aria-selected') !== 'true' && !popup.querySelector('[aria-selected="true"]')) {
                await this.simulateKeyPress(option, 'Space');
                if (option.getAttribute('aria-selected') !== 'true' && !popup.querySelector('[aria-selected="true"]')) {
                    this.result.addViolation({
                        element: popup,
                        id: `${this.component}-invalid-selected`,
                        impact: 'serious',
                        message: `Invalid aria-selected value on ${this.component} or value is not updated when enter is triggered.`,
                        help: 'aria-selected should be: true',
                        fix: `Update aria-selected to true when an option is selected in ${this.component} through Enter or Space key.`,
                        component: this.component
                    });
                } else {
                    this.result.addPass({
                        element: popup,
                        id: `${this.component}-valid-selected`,
                        message: `Valid aria-selected value on ${this.component}`,
                        component: this.component
                    })
                }
            } else {
                this.result.addPass({
                    element: popup,
                    id: `${this.component}-valid-selected`,
                    message: `Valid aria-selected value on ${this.component}`,
                    component: this.component
                })
            }
        }
        async testAriaAttribute(element, attrName, expectedValue = new Set([])) {
            if (!element.hasAttribute(attrName)) {
                this.result.addViolation({
                    element,
                    id: `${this.component}-missing-${attrName}`,
                    impact: 'serious',
                    message: `Missing ${attrName} attribute on ${this.component}`,
                    help: `The ${attrName} attribute is required for ${this.component} accessibility`,
                    fix: `Add the ${attrName} attribute to the ${this.component} element.`,
                    component: this.component
                });
                return false;
            }
            if (expectedValue.size != 0 && !expectedValue.has(element.getAttribute(attrName))) {
                this.result.addViolation({
                    element,
                    id: `${this.component}-invalid-${attrName}`,
                    impact: 'serious',
                    message: `Invalid ${attrName} value on ${this.component}`,
                    help: `${attrName} should be: ${Array.from(expectedValue.values()).join(',')}`,
                    fix: `Ensure ${attrName} is set to one of the valid values (${Array.from(expectedValue.values()).join(',')}) for ${this.component}.`,
                    component: this.component
                });
                return false;
            }

            this.result.addPass({
                element,
                id: `${this.component}-has-${attrName}`,
                message: `${attrName} attribute present and valid`,
                component: this.component
            });
            return true;
        }
        async testKeyboardSupportWithAriaChanges(element, key, trigger) {
            if (!this.isFocusable(element)) {
                return false;
            }
            try {
                // Simulate key press with state tracking
                const keyResult = await this.simulateKeyPress(element, key, trigger,this.options);
                const moved = keyResult.activeElement !== element;
                // Get expected ARIA changes for this key
                const expectedChanges = this.stateChanges[key] || {};
                // Validate ARIA attribute changes
                if (Object.keys(expectedChanges).length > 0) {
                    const validation = await this.validator.validateStateChange(
                        element, key, expectedChanges, keyResult, trigger
                    );
                    if (validation) {
                        this.result.recordAriaStateChange(
                            `${this.component}-${key}`,
                            element,
                            key,
                            keyResult.stateBefore.attributes,
                            keyResult.stateAfter.attributes,
                            expectedChanges
                        );
                        if (!validation.valid) {
                            this.result.addViolation({
                                element: trigger || element,
                                id: `${this.component}-${key}-aria-changes-failed`,
                                impact: 'serious',
                                message: `ARIA attributes (${Object.keys(validation.changes).join(',')}) are not updated correctly when the ${key} key is pressed.`,
                                help: `Ensure that the ARIA states (${Object.keys(validation.changes).join(',')}) are properly updated in response to keyboard navigation, specifically on ${key} key interaction.`,
                                fix: `Update the ARIA attributes (${Object.keys(validation.changes).join(',')}) to reflect the correct state when the ${key} key is pressed for ${this.component}.`,
                                component: this.component
                            });
                            return false;
                        } else {
                            this.result.addPass({
                                element,
                                id: `${this.component}-${key}-aria-changes-passed`,
                                impact: 'serious',
                                message: `ARIA attributes change correctly on ${key}`,
                                help: 'Check that ARIA state is updated when handling keyboard navigation',
                                component: this.component
                            });
                        }
                    }
                } else if (moved) {
                    this.result.addPass({
                        element,
                        id: `${this.component}-${key}-navigation`,
                        message: `${key} navigation working (focus moved)`,
                        component: this.component
                    });
                }

                return true;
            } catch (e) {
                this.result.addIncomplete({
                    element,
                    id: `${this.component}-${key}-error`,
                    message: `Error testing ${key} navigation: ${e.message}`,
                    component: this.component
                });
                return false;
            }
        }
        async testFocusTrap(container) {
            const focusable = this.getFocusableElements(container);
            if (focusable.length === 0) {
                this.result.addInapplicable({
                    element: container,
                    id: `${this.component}-no-focusable-elements`,
                    impact: 'serious',
                    message: `${this.component} has no focusable elements`,
                    help: 'Add at least one focusable element (button, input, etc.)',
                    component: this.component
                });
                return false;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            last.focus();
            await this.simulateTab(true, container);
            const forwardTrap = document.activeElement === first;
            first.focus();
            await this.simulateTab(false, container);
            const backwardTrap = document.activeElement === last;
            if (!(forwardTrap && backwardTrap)) {
                this.result.addViolation({
                    element: container,
                    id: `${this.component}-focus-trap-failure`,
                    impact: 'serious',
                    message: 'Focus trap not working correctly',
                    help: 'Ensure Tab and Shift+Tab loop focus within the container',
                    fix: `Implement focus trapping logic to keep focus within the container for ${this.component}`,
                    component: this.component
                });
                return false;
            }

            this.result.addPass({
                element: container,
                id: `${this.component}-focus-trap-working`,
                message: 'Focus trap working correctly',
                component: this.component
            });
            return true;
        }
        async checkArrowKeys(focusOptions, focusEl, trigger, element, arrowKeys, nextKey = 'ArrowDown', isSelect = true) {
            const options = Array.from(focusOptions).slice(0, this.testCell);
            const keys = { 'ArrowUp': 'ArrowDown', 'ArrowDown': 'ArrowUp', 'ArrowLeft': 'ArrowRight', 'ArrowRight': 'ArrowLeft' }
            if (options.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    if (this.isFocusable(option)) {
                        for (const key of arrowKeys) {
                            if (i == 0 && (key == 'ArrowUp' || key == 'ArrowLeft')) { continue; }
                            if (i == options.length - 1 && (key == 'ArrowDown' || key == "ArrowRight")) { continue; }
                            await this.testKeyboardSupportWithAriaChanges(focusEl, key, trigger);
                            await this.simulateKeyPress(focusEl, keys[key], trigger);
                        }
                        await this.simulateKeyPress(focusEl, nextKey);
                        if ((i == 0 || i == options.length - 1) && isSelect) {
                            await this.checkSelect(focusEl, element);
                        }
                    }else{
                        this.checkRoleDisable(option, option.getAttribute('role'));
                    }
                }
            }
        }
        async openPopup(element, popup) {
            await this.simulateKeyPress(element, 'ArrowDown');
            if (!this.isVisible(popup)) {
                if (typeof element == 'string') {
                    document.querySelector(element).click();
                } else {
                    element.click();
                }
            }
            await this.delay(100);
            if (!popup) {
                popup = document.querySelector(`#${element.getAttribute('aria-controls')}`);
                if (!popup) { return }
            }
            if (element.getAttribute('hasPopup') == 'grid' || !this.isVisible(popup)) {
                const childRole = { 'listbox': 'option', 'grid': 'row', 'tree': 'treeitem' }
                const option = popup.querySelectorAll(`[role="${childRole[popup.getAttribute('role')]}"]`);
                const text = option[0]?.textContent?.trim();
                let input;
                if (element.tagName == 'INPUT') {
                    input = element;
                    await this.simulateKeyPress(element, 'Tab', null, { searchText: text });
                    await this.testKeyboardSupportWithAriaChanges(element, 'ArrowDown');
                } else {
                    input = element.querySelector('input');
                    if (input) {
                        await this.simulateKeyPress(input, 'Tab', null, { searchText: text });
                        await this.testKeyboardSupportWithAriaChanges(element, 'ArrowDown');
                        await this.simulateKeyPress(input, 'Enter');
                    }
                }
                if (input) {
                    await this.simulateKeyPress(input, 'Tab', null, { searchText: option[1].textContent.trim() });
                    await this.simulateKeyPress(input, 'Enter');
                    await this.simulateKeyPress(input, 'Tab', null, { searchText: option[2]?.textContent.trim() });
                }
            }
        }
        detectOrientation(container, childRole) {
            const issue = { element: container, id: 'orientation-missing', description: 'The Element has other orientation than default and does not have aria-orientation.', help: 'Ensure to give the aria-orientation to the element', impact: 'moderate', helpUrl: 'https://www.w3.org/WAI/ARIA/apg/example-index/' };
            const role = container.getAttribute('role') || childRole;
            if (this.orientation[container.getAttribute('aria-orientation')]) {
                return this.orientation[container.getAttribute('aria-orientation')];
            } else {
                const items = [...container.querySelectorAll('[role="tab"], [role="option"], button, li,[role="menuitems"],[role="radio"]')];
                if (items.length < 2) {
                    return this.orientation[this.defaults[role]];
                }
                let horizontalMoves = 0;
                let verticalMoves = 0;
                for (let i = 1; i < items.length; i++) {
                    const prevRect = items[i - 1].getBoundingClientRect();
                    const currRect = items[i].getBoundingClientRect();
                    const xDiff = Math.abs(currRect.left - prevRect.left);
                    const yDiff = Math.abs(currRect.top - prevRect.top);
                    if (xDiff > yDiff) { horizontalMoves++; }
                    else if (yDiff > xDiff) { verticalMoves++; }
                }
                if (horizontalMoves >= verticalMoves) {
                    return this.orientation.horizontal;
                } else {
                    return this.orientation.vertical;
                }
            }
        }
        checkRoleDisable(element, role) {
            if (element.hasAttribute('disabled')) {
                this.result.addViolation({
                    element: element,
                    id: role + '-disabled-aria-misuse',
                    impact: 'serious',
                    message: 'The ' + role + ' uses the native disabled attribute, which is invalid for role="' + role + '".',
                    help: 'Tabs must use aria-disabled="true" to indicate an unavailable state. The native disabled attribute is only valid for form controls and is ignored on ARIA roles.',
                    fix: 'Remove the disabled attribute and add <b>aria-disabled="true"</b> to the ' + role + '.',
                    component: this.component
                });
            }
        }
    }
    // ===== COMPONENT TESTERS=====
    class GridTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'grid' });
        }

        async gridAsPopup(element, trigger) {
            const cells = element.querySelectorAll('[role="gridcell"],td');
            await this.checkArrowKeys(cells, focusEl, trigger, element, ['ArrowDown', 'ArrowUp'], 'ArrowDown');
        }
        async gridAsData(element) {
            const cells = Array.from(element.querySelectorAll('[role="gridcell"],td')).slice(0, this.testCell);
            for (const cell of cells) {
                await this.keyNavCheck(cell, 'ArrowDown');
                await this.simulateKeyPress(cell, 'ArrowUp');   // back to cell
                await this.keyNavCheck(cell, 'ArrowUp');
                await this.simulateKeyPress(cell, 'ArrowDown'); // back to cell
                await this.keyNavCheck(cell, 'ArrowRight');
                await this.simulateKeyPress(cell, 'ArrowLeft'); // back to cell
                await this.keyNavCheck(cell, 'ArrowLeft');
                await this.simulateKeyPress(cell, 'ArrowRight');// back to cell
            }
        }
        async test(element, trigger) {
            await this.testAriaAttribute(element, 'role', new Set(['grid']));
            let rows = element.querySelectorAll('[role="row"],tr');
            if (rows.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'grid-no-rows',
                    impact: 'serious',
                    message: 'Grid has no rows',
                    help: 'Ensure to have elements with [role="row"] for the grid.',
                    fix: 'Add rows with [role="row"] to the grid element.',
                    component: 'grid'
                });
                return this.result;
            }
            for (const row of rows) {
                const cells = row.querySelectorAll('[role="gridcell"],td');
                if (cells.length === 0) {
                    continue;
                }
                for (const cell of cells) {
                    if (!this.isFocusable(cell) && !cell.hasAttribute('tabindex')) {
                        this.result.addViolation({
                            element: cell,
                            id: 'grid-cell-not-focusable',
                            impact: 'serious',
                            message: 'Gridcell must be focusable',
                            help: 'Add tabindex="0" to make cell focusable',
                            fix: 'Add tabindex="0" to the gridcell elements to make them focusable.',
                            component: 'grid'
                        });
                    }
                }
            }
            if (trigger) {
                await this.gridAsPopup(element, trigger)
            } else {
                await this.gridAsData(element);
            }

            return this.result;
        }
    }
    class DialogTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'dialog' });
        }
        async commonTest(element) {
            await this.testAriaAttribute(element, 'aria-modal', new Set(['true']));
            const labelledBy = element.getAttribute('aria-labelledby');
            if (!element.getAttribute('aria-label') && (!labelledBy || !document.getElementById(labelledBy))) {
                this.result.addViolation({
                    element,
                    id: 'dialog-missing-labelledby',
                    impact: 'moderate',
                    message: 'Missing or invalid aria-labelledby',
                    help: 'Specify the [aria-labelledby="#id"] to the dialog role',
                    fix: 'Add a valid aria-labelledby attribute pointing to an existing element that labels the dialog.',
                    component: 'dialog'
                });
            }
            await this.testFocusTrap(element);
            await this.testKeyboardSupportWithAriaChanges(element, 'Escape');
        }
        async test(element, trigger) {
            if (!trigger && this.activeButton) {
                const button = typeof this.activeButton == 'string' ? document.querySelector(this.activeButton) : this.activeButton;
                await this.openPopup(button, element);
            }
            await this.commonTest(element);
            return this.result;
        }
    }
    class DateDialogTester extends DialogTester {
        constructor(options) {
            super({ ...options, component: 'dialog' });
        }
        async checkSelectForGrid(grid, popup) {
            const cells = grid.querySelectorAll('[role="gridcell"],td');
            if (cells.length == 0) {
                return
            }
            await this.checkSelect(cells[0], popup);
        }
        async test(element, trigger) {
            const gridTable = element.querySelector('[role="grid"],table');
            const gridTester = new GridTester({ component: 'grid' });
            gridTester.result = this.result;
            await gridTester.test(gridTable);
            await this.checkSelectForGrid(gridTable, element);
            await this.openPopup(trigger, element);
            await this.commonTest(element);
        }
    }
    class ListboxTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'listbox' });
        }

        async test(element, trigger) {
            if (!trigger) {
                if (document.querySelector(`[aria-controls="${element.id}"]`)) {
                    return this.result;
                } else if (Array.from(document.querySelectorAll(`[aria-controls]`)).some(el => element.closest(`#${el.getAttribute('aria-controls')}`))) {
                    return this.result;
                }
                if (this.isFocusable(element)) { element.focus(); };
            }
            this.trigger = trigger;
            if (element.getAttribute('role') !== 'listbox' && !element.querySelector('[role="listbox"]')) {
                await this.testAriaAttribute(element, 'role', new Set(['listbox']));
            }

            const options = element.querySelectorAll('[role="option"]');
            if (options.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'listbox-no-options',
                    impact: 'serious',
                    message: 'Listbox has no options',
                    help: 'Ensure to have elements with [role="option"] inside the listbox.',
                    fix: 'Add options with [role="option"] to the listbox element.',
                    component: 'listbox'
                });
                return this.result;
            }
            const focusEl = trigger || element;
            await this.checkArrowKeys(options, focusEl, document.activeElement, element, ['ArrowDown', 'ArrowUp'], 'ArrowDown');
            return this.result;
        }
    }
    class TreeTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'tree' });
        }
        async treeAsLayout(items) {
            const treeItems = Array.from(items).slice(0, this.testCell);
            for (let i = 0; i < treeItems.length; i++) {
                const treeItem = treeItems[i];
                const expand = treeItem.getAttribute('aria-expanded');
                const group = treeItem.querySelector('[role="group"]') || treeItem.parentElement.querySelector('[role="group"]');
                const focusable = treeItem.querySelector('[tabindex="0"]') || treeItem;
                if (group) {
                    if (expand && expand == 'true') {
                        await this.testKeyboardSupportWithAriaChanges(focusable, 'ArrowLeft');
                    }
                    if (!expand || expand == 'false') {
                        await this.testKeyboardSupportWithAriaChanges(focusable, 'ArrowRight');
                    }
                }
                if (i !== 0) {
                    await this.keyNavCheck(focusable, 'ArrowUp');
                }
                if (i !== items.length - 1) {
                    await this.keyNavCheck(focusable, 'ArrowDown');
                }
                await this.simulateKeyPress(focusable, 'ArrowDown');
            }
        }
        async treeAsPopup(tree, trigger, items) {
            const focusEl = document.activeElement || trigger || tree;
            await this.checkArrowKeys(items, focusEl, document.activeElement, element, ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'], 'ArrowDown');
        }
        async test(element, trigger) {
            const tree = element.querySelector('[role="tree"]') || element;
            await this.testAriaAttribute(tree, 'role', new Set(['tree']));

            const items = tree.querySelectorAll('[role="treeitem"]');
            if (items.length === 0) {
                this.result.addViolation({
                    tree,
                    id: 'tree-no-items',
                    impact: 'serious',
                    message: 'Tree has no [role="treeitem"] children in it.',
                    help: 'Ensure to give the [role="treeitem] to the elements inside the tree"',
                    fix: 'Add elements with [role="treeitem"] inside the tree element.',
                    component: 'tree'
                });
                return this.result;
            }

            for (const item of items) {
                if (item.querySelector('[role="group"]')) {
                    await this.testAriaAttribute(item, 'aria-expanded', new Set(['true', 'false']));
                }
            }
            if (trigger) {
                await this.treeAsPopup(tree, trigger, items);
            } else {
                await this.treeAsLayout(items);
            }
            return this.result;
        }
    }
    class AlertDialogTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'alertdialog' });
        }

        async test(element) {
            const alertDialog = element.getAttribute('role') === 'alertdialog' ?
                element : element.querySelector('[role="alertdialog"]');

            if (!alertDialog) {
                this.result.addInapplicable({
                    element,
                    id: 'alertdialog-not-found',
                    message: 'No alertdialog found',
                    component: 'alertdialog'
                });
                return this.result;
            }

            await this.testAriaAttribute(alertDialog, 'role', new Set(['alertdialog']));
            await this.testAriaAttribute(alertDialog, 'aria-modal', new Set(['true']));

            const labelledBy = alertDialog.getAttribute('aria-labelledby');
            if (!alertDialog.getAttribute('aria-label') && (!labelledBy || !document.getElementById(labelledBy))) {
                this.result.addViolation({
                    element: alertDialog,
                    id: 'alertdialog-missing-labelledby',
                    impact: 'serious',
                    message: 'Missing or invalid aria-labelledby.Specify the ',
                    help: 'Aria-labelledby must reference a visible heading or text to describe the alert dialog.',
                    fix: 'Add a valid aria-labelledby value pointing to an existing element that labels the alert dialog.',
                    component: 'alertdialog'
                });
            }

            const focusableElements = this.getFocusableElements(alertDialog);
            if (focusableElements.length === 0) {
                this.result.addViolation({
                    element: alertDialog,
                    id: 'alertdialog-no-focusable',
                    impact: 'serious',
                    message: 'Alert dialog has no focusable elements',
                    help: 'Add at least one focusable element (button, input, etc.) inside the alert dialog',
                    fix: 'Include focusable elements within the alert dialog to ensure accessibility or make the alert dialog itself focusable.',
                    component: 'alertdialog'
                });
                return this.result;
            }

            await this.testFocusTrap(alertDialog);
            await this.testKeyboardSupportWithAriaChanges(alertDialog, 'Escape');

            return this.result;
        }
    }
    class MenuTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'menu' });
            this.orientation = {
                'horizontal': { nextKey: "ArrowRight", prevKey: "ArrowLeft" },
                'vertical': { nextKey: "ArrowDown", prevKey: "ArrowUp" }
            };
        }

        async checkActiveButton(button) {
            await this.testAriaAttribute(button, 'aria-expanded', new Set(['true']));
            await this.testAriaAttribute(button, 'aria-haspopup', new Set(['true', 'menu']));
        }
        async checkArrowKeysForButton(focusOptions, focusEl, trigger, menu, arrowKeys, nextKey) {
            const options = Array.from(focusOptions).slice(0, this.testCell);
            const keys = { 'ArrowUp': 'ArrowDown', 'ArrowDown': 'ArrowUp', 'ArrowLeft': 'ArrowRight', 'ArrowRight': 'ArrowLeft' }
            if (options.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    if (this.isFocusable(option)) {
                        for (const key of arrowKeys) {
                            if (i == 0 && (key == 'ArrowUp' || key == 'ArrowLeft')) { continue; }
                            if (i == options.length - 1 && (key == 'ArrowDown' || key == "ArrowRight")) { continue; }
                            await this.simulateKeyPress(option, key);
                            if (!menu.querySelector('[tabindex="0"]')) {
                                await this.testKeyboardSupportWithAriaChanges(focusEl, key, trigger);
                            }
                            await this.simulateKeyPress(focusEl, keys[key], trigger);
                        }
                        await this.simulateKeyPress(focusEl, nextKey);
                    }
                }
            }
        }
        async test(element, trigger) {
            const button = typeof this.activeButton == 'string' ? document.querySelector(this.activeButton) : this.activeButton;
            if (!trigger && this.activeButton) {
                await this.openPopup(button, element);
                if (this.isVisible(element)) {
                    await this.checkActiveButton(button);
                }
            }
            const menu = element.getAttribute('role') === 'menu' ? element : element.querySelector('[role="menu"]');
            if (!menu) {
                this.result.addInapplicable({
                    element,
                    id: 'menu-not-found',
                    message: 'No menu found',
                    component: 'menu'
                });
                return this.result;
            }

            await this.testAriaAttribute(menu, 'role', new Set(['menu']));

            const items = menu.querySelectorAll('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]');
            if (items.length === 0) {
                this.result.addViolation({
                    element: menu,
                    id: 'menu-no-items',
                    impact: 'serious',
                    message: 'Menu has no menuitems',
                    help: 'Ensure to have elements with [role="menuitem"], [role="menuitemcheckbox"], or [role="menuitemradio"] inside the menu.',
                    fix: 'Add menuitems([role="menuitem"], [role="menuitemcheckbox"], or [role="menuitemradio"]) with appropriate roles to the [role="menu"] element.',
                    component: 'menu'
                });
                return this.result;
            }

            for (const item of items) {
                if (!this.isFocusable(item)) {
                    this.result.addViolation({
                        element: item,
                        id: 'menu-item-not-focusable',
                        impact: 'serious',
                        message: 'Menuitem must be focusable',
                        help: 'Add tabindex="0" or make element natively focusable',
                        fix: 'Add tabindex="0" to the menuitem elements to make them focusable.',
                        component: 'menu'
                    });
                }
            }
            const focusEl = trigger || button || menu;
            if (items.length > 0) {
                if (trigger) {
                    await this.checkArrowKeys(items, focusEl, document.activeElement, menu, ['ArrowUp', 'ArrowDown'], 'ArrowDown');
                } else if (button) {
                    await this.checkArrowKeysForButton(items, focusEl, button, menu, ['ArrowUp', 'ArrowDown'], 'ArrowDown')
                }
            }
            if (!trigger) {
                const focusable = menu.querySelector('[tabindex="0"]') || button;
                await this.testKeyboardSupportWithAriaChanges(focusable, 'Escape', button);
            }
            return this.result;
        }
    }
    class PopupTester extends BaseTester {
        constructor(options) {
            super({ ...options });
        }

        async testPopup(element, popup) {
            const role = popup.getAttribute('role') || popup.querySelector('[role]')?.getAttribute('role');
            if (role == 'dialog' && popup.querySelector('[role="grid"]')) {
                const dateDialog = new DateDialogTester()
                dateDialog.result = this.result;
                await dateDialog.test(popup, element);
            } else {
                switch (role) {
                    case 'listbox':
                        const listbox = new ListboxTester()
                        listbox.result = this.result;
                        await listbox.test(popup, element);
                        break;
                    case 'grid':
                        const grid = new GridTester();
                        grid.result = this.result;
                        await grid.test(popup, element, isGrid);
                        break;
                    case 'dialog':
                        const dateDialog = new DialogTester();
                        dateDialog.result = this.result;
                        await dateDialog.test(popup, element);
                        break;
                    case 'tree':
                        const tree = new TreeTester();
                        tree.result = this.result;
                        await tree.test(popup, element);
                        break;
                    case 'menu':
                        const menu = new MenuTester();
                        menu.result = this.result;
                        await menu.test(popup, element);
                        break;
                }
            }
            if (popup.querySelectorAll('[aria-selected="true"]').length > 1) {
                await this.testAriaAttribute(popup, 'aria-multiselectable', new Set(['true']));
            }
        }
    }
    class AccordionTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'accordion' });
        }
        setTimeFromTo(header) {
            const expanded = header.getAttribute('aria-expanded');
            if (expanded == 'true') {
                this.stateChanges = {
                    'Enter': { 'aria-expanded': { from: 'true', to: 'false', or: null } },
                    'Space': { 'aria-expanded': { from: 'false', to: 'true', or: null } }
                }
            } else if (expanded == 'false') {
                this.stateChanges = {
                    'Enter': { 'aria-expanded': { from: 'false', to: 'true', or: null } },
                    'Space': { 'aria-expanded': { from: 'true', to: 'false', or: null } }
                }
            }
        }
        checkHeaders(header) {
            const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
            const nodeHeading = header.closest('h1,h2,h3,h4,h5,h6,[role="heading"]');
            if (!nodeHeading) {
                this.result.addViolation({
                    element: header,
                    id: "accordion-missing-heading",
                    message: 'The accordion header has no role="heading" or heading tags',
                    help: 'Ensure each accordion header button is wrapped in an element with [role = "heading"] that has a value set for aria-level.',
                    impact: 'moderate',
                    fix: 'Wrap each accordion header button in an element with [role="heading"] and set a valid aria-level attribute or inside a heading tag (h1-h6).',
                    helpUrl: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/#roles_states_properties"
                })
            } else if (!headingTags.has(nodeHeading.tagName) && !nodeHeading.getAttribute('aria-level')) {
                this.result.addViolation({
                    element: header,
                    id: 'accordion-missing-level',
                    message: 'The accordion header which has role="heading" has no aria-level attribute',
                    help: 'Ensure each accordion header with [role = "heading"] should has a value set for aria-level.',
                    fix: 'Add a valid aria-level attribute to the element with [role="heading"] that wraps the accordion header button.',
                    impact: 'moderate',
                    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/#roles_states_properties'
                })
            } else {
                this.result.addPass({
                    element: header,
                    message: "The accordion has heading role.",
                    id: "accordion-missing-heading",
                })
            }
        }
        async test(element) {
            const headers = element.querySelectorAll('[role="button"][aria-expanded], button[aria-expanded]');

            if (headers.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'accordion-no-headers',
                    impact: 'serious',
                    message: 'No accordion headers found',
                    help: 'Ensure to have accordion headers with [role="button"] and [aria-expanded] attribute.',
                    fix: 'Add accordion headers with [role="button"] element and [aria-expanded] attribute to the accordion element.',
                    component: 'accordion'
                });
                return this.result;
            }

            for (const header of headers) {
                if (this.component == 'accordion') {
                    this.checkHeaders(header);
                }
                await this.testAriaAttribute(header, 'aria-expanded');
                await this.testAriaAttribute(header, 'aria-controls');
                // Set the inital state for accordion in ARIA_STATE_CHANGES before keyboard test
                this.setTimeFromTo(header);

                // Test keyboard support WITH ARIA state changes
                await this.testKeyboardSupportWithAriaChanges(header, 'Enter');
                await this.testKeyboardSupportWithAriaChanges(header, 'Space');

                const panelId = header.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);
                if (!panel) {
                    this.result.addViolation({
                        element: header,
                        id: 'accordion-missing-panel',
                        impact: 'serious',
                        message: `aria-controls references missing element: ${panelId}`,
                        help: 'Ensure that the accordion header\'s aria-controls attribute points to an existing element that serves as the accordion panel.',
                        fix: `Add the missing [id = ${panelId}] to the accordion panel referenced by the [aria-controls=${panelId}] attribute of the header.`,
                        component: 'accordion'
                    });
                }
            }

            return this.result;
        }
    }
    class ComboboxTester extends PopupTester {
        constructor(options) {
            super({ ...options, component: 'combobox' });
        }
        roleMisplace(combobox) {
            if (combobox.querySelector('input') && combobox.querySelector('input').getAttribute('role') !== 'combobox') {
                this.result.addViolation({
                    element: combobox,
                    id: 'role-misplace',
                    message: 'The role="combobox" has to be in input.',
                    help: 'Ensure to give the [role="combobox"] to the input element inside the combobox component.',
                    fix: 'Move the [role="combobox"] on the input element within the combobox component.',
                    impact: 'serious',
                    component: 'combobox',
                    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/#rps_label_textbox'
                });
            } else {
                this.result.addPass({
                    element: combobox,
                    id: 'role-misplace',
                    message: 'The role="combobox" has to be in input.',
                    impact: 'serious',
                    component: 'combobox',
                    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/#rps_label_textbox'
                });
            }
        }
        async test(element) {
            if (element.tagName == 'SELECT') { return };
            const combobox = element.getAttribute('role') === 'combobox' ? element : element.querySelector('[role="combobox"]');
            if (!combobox) {
                this.result.addInapplicable({
                    element,
                    id: 'combobox-not-found',
                    message: 'No combobox found',
                    component: 'combobox'
                });
                return this.result;
            }
            if(combobox.getAttribute('aria-disabled') === 'true' || combobox.hasAttribute('disabled')) {
                this.checkRoleDisable(combobox,'combobox');
                return this.result;
            }
            if (combobox.querySelector('input') || combobox.tagName == 'INPUT') {
                await this.testAriaAttribute(combobox, 'aria-autocomplete', new Set(['list', 'inline', 'both', 'none']))
                this.roleMisplace(combobox);
            } else {
                this.result.addInapplicable({
                    element: combobox,
                    id: 'combobox-invalid-autocomplete',
                    impact: 'serious',
                    message: 'There is no input element to specify aria-autocomplete',
                    component: 'combobox'
                });
                this.result.addInapplicable({
                    element: combobox,
                    id: 'role-misplace',
                    message: 'There is no input element to specify the role',
                    component: 'combobox'
                })
            }
            // Test keyboard with ARIA state changes
            const popup = document.querySelector(`#${combobox.getAttribute('aria-controls')}`);
            await this.openPopup(combobox, popup);
            await this.testAriaAttribute(combobox, 'aria-controls');
            await this.testAriaAttribute(combobox, 'aria-haspopup');
            if (popup) {
                await this.testPopup(combobox, popup);
            } else {
                this.result.addIncomplete({
                    id: 'Popup-not-opened',
                    message: 'The popup is not there in the dom.',
                    element: combobox
                })
            }
            await this.testKeyboardSupportWithAriaChanges(combobox, 'Escape');
            return this.result;
        }
    }
    class TablistTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'tablist' });
            this.orientation = {
                'horizontal': { nextKey: "ArrowRight", prevKey: "ArrowLeft" },
                'vertical': { nextKey: "ArrowDown", prevKey: "ArrowUp" }
            };
        }
        async checkArrowKeys(focusOptions, arrowKeys, nextKey, element) {
            const options = Array.from(focusOptions).slice(0, this.testCell);
            const keys = { 'ArrowUp': 'ArrowDown', 'ArrowDown': 'ArrowUp', 'ArrowLeft': 'ArrowRight', 'ArrowRight': 'ArrowLeft' }
            if (options.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    if (this.isFocusable(option)) {
                        for (const key of arrowKeys) {
                            if (i == 0 && (key == 'ArrowUp' || key == 'ArrowLeft')) { continue; }
                            if (i == options.length - 1 && (key == 'ArrowDown' || key == "ArrowRight")) { continue; }
                            await this.keyNavCheck(option, key);
                        }
                        await this.simulateKeyPress(option, nextKey);
                        if (i == 0 || i == options.length - 1) {
                            await this.checkSelect(option, element);
                        }
                    }else{
                        this.checkRoleDisable(option, option.getAttribute('role'));
                    }
                }
            }
        }
        async test(element) {
            await this.testAriaAttribute(element, 'role', new Set(['tablist']));
            const tabs = element.querySelectorAll('[role="tab"]');
            if (tabs.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'tablist-no-tabs',
                    impact: 'serious',
                    message: 'Tablist has no tabs',
                    help: 'Ensure to have elements with [role="tab"] inside the tablist.',
                    fix: 'Add tabs with [role="tab"] to the [role="tablist"] element.',
                    component: 'tablist'
                });
                return this.result;
            }
            for (const tab of tabs) {
                await this.testAriaAttribute(tab, 'aria-selected');
                await this.testAriaAttribute(tab, 'aria-controls');

                const panelId = tab.getAttribute('aria-controls');
                const disabled = tab.getAttribute('aria-disabled') || tab.hasAttribute('disabled');
                if (disabled) {
                    this.checkRoleDisable(tab, 'tab');
                    continue;
                }
                if (panelId && !document.getElementById(panelId)) {
                    this.result.addViolation({
                        element: tab,
                        id: 'tab-missing-panel',
                        impact: 'serious',
                        message: `The tab’s aria-controls attribute points to a missing element (#${panelId}).`,
                        help: 'Ensure that the tab\'s aria-controls attribute points to an existing element that serves as the tab panel or it would be disabled.',
                        fix: `Add the missing <b>[id = ${panelId}]</b> to the tab panel referenced by the [aria-controls=${panelId}] attribute of the tab or add <b>[aria-disabled="true"]</b> attribute to the tab.`,
                        component: 'tablist'
                    });
                }
            }
            const { nextKey, prevKey } = this.detectOrientation(element);
            if (tabs.length > 0) {
                await this.checkArrowKeys(tabs, [prevKey, nextKey], nextKey, element);
            }
            return this.result;
        }
    }
    class MenubarTester extends PopupTester {
        constructor(options) {
            super({ ...options, component: 'menubar' });
            this.orientation = {
                'horizontal': { nextKey: "ArrowRight", prevKey: "ArrowLeft" },
                'vertical': { nextKey: "ArrowDown", prevKey: "ArrowUp" }
            };
        }
        async checkMenuPopup(menuitem) {
            if (menuitem.hasAttribute('aria-haspopup') && menuitem.getAttribute('aria-haspopup') !== 'false') {
                const controls = menuitem.getAttribute('aria-controls');
                const popup = document.querySelector('#' + controls);
                if (popup) {
                    await this.testPopup(menuitem, popup);
                }
            }
        }
        async checkArrowKeys(menuItems, menubar, arrowKeys, nextKey) {
            const options = Array.from(menuItems).slice(0, this.testCell);
            const keys = { 'ArrowUp': 'ArrowDown', 'ArrowDown': 'ArrowUp', 'ArrowLeft': 'ArrowRight', 'ArrowRight': 'ArrowLeft' }
            if (options.length > 0) {
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    if (this.isFocusable(option)) {
                        for (const key of arrowKeys) {
                            if (i == 0 && (key == 'ArrowUp' || key == 'ArrowLeft')) { continue; }
                            if (i == options.length - 1 && (key == 'ArrowDown' || key == "ArrowRight")) { continue; }
                            await this.checkMenuPopup(option);
                            await this.keyNavCheck(option, key);
                            await this.simulateKeyPress(option, keys[key]);
                        }
                        await this.simulateKeyPress(option, nextKey);
                    }else{
                        this.checkRoleDisable(option, option.getAttribute('role'));
                    }
                }
            }
        }
        async test(element) {
            await this.testAriaAttribute(element, 'role', new Set(['menubar']));
            const topMenuItems = element.querySelectorAll('[role="menuitem"]');
            if (topMenuItems.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'menubar-no-items',
                    impact: 'serious',
                    message: 'Menubar has no top-level menuitems',
                    help: 'Ensure to have elements with [role="menuitem"] inside the menubar.',
                    fix: 'Add menuitems with [role="menuitem"] to the [role="menubar"] element.',
                    component: 'menubar'
                });
                return this.result;
            }
            const { prevKey, nextKey } = this.detectOrientation(element);
            await this.checkArrowKeys(topMenuItems, element, [prevKey, nextKey], nextKey);
            return this.result;
        }
    }
    class RadioGroupTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'radiogroup' });
        }
        isTab(element) {
            return element.closest(FOCUSABLE_SELECTOR) || element;
        }
        async checkArrowKeys(radios, element, arrowKeys, nextKey) {
            const keys = { 'ArrowUp': 'ArrowDown', 'ArrowDown': 'ArrowUp', 'ArrowLeft': 'ArrowRight', 'ArrowRight': 'ArrowLeft' }
            for (const radio of radios) {
                const focusable = this.isTab(radio);
                this.checkRoleDisable(radio, radio.getAttribute('role'));
                if (radio == radios[0]) {
                    await this.testKeyboardSupportWithAriaChanges(focusable, 'Space', radio);
                }
                for (const key of arrowKeys) {
                    if (element.hasAttribute('aria-activedescendant')) {
                        await this.testKeyboardSupportWithAriaChanges(focusable, key, radio);
                    } else {
                        await this.keyNavCheck(focusable, key);
                    }
                    await this.simulateKeyPress(focusable, keys[key]);
                }
                await this.simulateKeyPress(focusable, nextKey);
            }
        }
        async test(element) {
            await this.testAriaAttribute(element, 'role', new Set(['radiogroup']));
            const radios = element.querySelectorAll('input[type="radio"], [role="radio"]');
            if (radios.length === 0) {
                this.result.addViolation({
                    element,
                    id: 'radiogroup-no-radios',
                    impact: 'serious',
                    message: 'Radio group has no radio inputs',
                    help: 'Ensure to have radio inputs or elements with [role="radio"] inside the radiogroup.',
                    fix: 'Add radio inputs or elements with [role="radio"] to the [role="radiogroup"] element.',
                    component: 'radiogroup'
                });
                return this.result;
            }
            if (Array.from(radios).every(r => r.tagName == 'INPUT')) {
                const value = radios[0].getAttribute('name');
                for (const radio of radios) {
                    await this.testAriaAttribute(radio, 'name', new Set([value]));
                }
                return this.result;
            }
            const { prevKey, nextKey } = this.detectOrientation(element);
            await this.checkArrowKeys(radios, element, [prevKey, nextKey], nextKey);
            return this.result;
        }
    }
    class CheckboxTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'checkbox' });
        }

        async test(element) {
            const checkbox = element.getAttribute('role') === 'checkbox' ? element : element.querySelector('[role="checkbox"]');
            if (!checkbox) {
                this.result.addInapplicable({
                    element,
                    id: 'checkbox-not-found',
                    message: 'No checkbox found',
                    component: 'checkbox'
                });
                return this.result;
            }

            await this.testAriaAttribute(checkbox, 'aria-checked');
            if(checkbox.localName !== "input" && checkbox.type !== "checkbox"){
                await this.testKeyboardSupportWithAriaChanges(checkbox, 'Space');
                await this.simulateKeyPress(checkbox, 'Space');
            }
            return this.result;
        }
    }
    class SwitchTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'switch' });
        }

        async test(element) {
            const switchElement = element.getAttribute('role') === 'switch' ? element : element.querySelector('[role="switch"]');
            if (!switchElement) {
                this.result.addInapplicable({
                    element,
                    id: 'switch-not-found',
                    message: 'No switch found',
                    component: 'switch'
                });
                return this.result;
            }

            await this.testAriaAttribute(switchElement, 'aria-checked');
            if(switchElement.localName !== "input" && switchElement.type !== "checkbox"){
                await this.testKeyboardSupportWithAriaChanges(switchElement, 'Space');
                await this.simulateKeyPress(switchElement, 'Space');
            }
            return this.result;
        }
    }
    class ProgressbarTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'progressbar' });
        }

        async test(element) {
            const progressbar = element.getAttribute('role') === 'progressbar' ?
                element : element.querySelector('[role="progressbar"]');

            if (!progressbar) {
                this.result.addInapplicable({
                    element,
                    id: 'progressbar-not-found',
                    message: 'No progressbar found',
                    component: 'progressbar'
                });
                return this.result;
            }

            await this.testAriaAttribute(progressbar, 'role', new Set(['progressbar']));

            // aria-valuenow is required for progress indication
            const valueNow = progressbar.getAttribute('aria-valuenow');
            if (!valueNow || isNaN(valueNow)) {
                this.result.addViolation({
                    element: progressbar,
                    id: 'progressbar-missing-valuenow',
                    impact: 'serious',
                    message: 'Progressbar must have numeric aria-valuenow',
                    help: "Ensure to provide a numeric value for aria-valuenow to indicate the current progress.",
                    fix: `Change the [aria-valuenow="${valueNow}"] to a numeric value representing the current progress.`,
                    component: 'progressbar'
                });
            } else {
                this.result.addPass({
                    element: progressbar,
                    id: 'progressbar-has-valuenow',
                    message: `Progressbar has aria-valuenow: ${valueNow}`,
                    component: 'progressbar'
                });
            }

            const valueMin = progressbar.getAttribute('aria-valuemin');
            const valueMax = progressbar.getAttribute('aria-valuemax');

            if (!valueMin || isNaN(valueMin)) {
                this.result.addInapplicable({
                    element: progressbar,
                    id: 'progressbar-missing-valuemin',
                    impact: 'moderate',
                    message: 'Progressbar should have aria-valuemin (defaults to 0)',
                    component: 'progressbar'
                });
            }

            if (!valueMax || isNaN(valueMax)) {
                this.result.addInapplicable({
                    element: progressbar,
                    id: 'progressbar-missing-valuemax',
                    impact: 'moderate',
                    message: 'Progressbar should have aria-valuemax (defaults to 100)',
                    component: 'progressbar'
                });
            }

            if (valueNow && valueMin && valueMax) {
                const current = parseInt(valueNow, 10);
                const min = parseInt(valueMin, 10);
                const max = parseInt(valueMax, 10);

                if (current < min || current > max) {
                    this.result.addViolation({
                        element: progressbar,
                        id: 'progressbar-invalid-range',
                        impact: 'serious',
                        message: `aria-valuenow (${current}) must be between ${min} and ${max}`,
                        help: 'Ensure that aria-valuenow is within the range defined by aria-valuemin and aria-valuemax.',
                        fix: `Set aria-valuenow to a value between ${min} and ${max}.`,
                        component: 'progressbar'
                    });
                } else {
                    this.result.addPass({
                        element: progressbar,
                        id: 'progressbar-valid',
                        message: `Progress: ${current}/${max}`,
                        component: 'progressbar'
                    });
                }
            }

            return this.result;
        }
    }
    class ButtonTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'button' });
        }

        async test(element) {
            const button = element.tagName === 'BUTTON' ?
                element : (element.getAttribute('role') === 'button' ? element : element.querySelector('button, [role="button"]'));

            if (!button) {
                this.result.addInapplicable({
                    element,
                    id: 'button-not-found',
                    message: 'No button found',
                    component: 'button'
                });
                return this.result;
            }

            const buttonText = button.textContent.trim();
            if (!buttonText && !button.hasAttribute('aria-label') && !button.hasAttribute('title')) {
                this.result.addViolation({
                    element: button,
                    id: 'button-no-accessible-name',
                    impact: 'serious',
                    message: 'Button has no accessible name',
                    help: 'Add text or aria-label',
                    fix: 'Provide an accessible name for the button by adding visible text,[aria-label="accessible name"], or [title="accessible name"].',
                    component: 'button'
                });
                return this.result;
            }

            if (buttonText.length > 0) {
                this.result.addPass({
                    element: button,
                    id: 'button-has-accessible-name',
                    message: `Button text: "${buttonText.substring(0, 50)}"`,
                    component: 'button'
                });
            }

            if (button.hasAttribute('aria-pressed')) {
                await this.testKeyboardSupportWithAriaChanges(button, 'Space');
                await this.testKeyboardSupportWithAriaChanges(button, 'Enter');
            }
            return this.result;
        }
    }
    class TableTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'table' });
        }

        async test(element) {
            const table = element?.tagName === 'TABLE' ? element : element.getAttribute('role') === 'table' ? element : element.querySelector('[role="table"]');
            if (!table) {
                this.result.addInapplicable({
                    element,
                    id: 'table-not-found',
                    message: 'No table found',
                    component: 'table'
                });
                return this.result;
            }
            // Validate table role and structure
            if (table.tagName !== 'TABLE' && table.getAttribute('role') !== 'table') {
                this.result.addViolation({
                    element: table,
                    id: 'table-missing-role',
                    impact: 'serious',
                    message: 'Static table must have role="table" if not native <table>',
                    help: 'Add role="table" to table container',
                    fix: "Add [role=\"table\"] to the element that serves as the table container.",
                    component: 'table'
                });
            }
            // Validate table has accessible name
            const hasLabel = table.hasAttribute('aria-label') ||
                table.hasAttribute('aria-labelledby') ||
                table.querySelector('caption');
            if (!hasLabel) {
                this.result.addViolation({
                    element: table,
                    id: 'table-missing-label',
                    impact: 'serious',
                    message: 'Table must have accessible name (aria-label, aria-labelledby, or <caption>)',
                    help: 'Add aria-label="Table description" or use <caption>',
                    fix: 'Provide an accessible name for the table by adding [aria-label="Table description"], [aria-labelledby="labelID"], or a <caption> element describing the table.',
                    component: 'table'
                });
            } else {
                this.result.addPass({
                    element: table,
                    id: 'table-has-label',
                    message: 'Table has accessible name',
                    component: 'table'
                });
            }
            // Validate Aria-Describedby
            if (table.hasAttribute('aria-describedby')) {
                const descId = table.getAttribute('aria-describedby');
                const descElement = document.getElementById(descId);
                if (!descElement) {
                    this.result.addViolation({
                        element: table,
                        id: 'table-invalid-describedby',
                        impact: 'moderate',
                        message: `aria-describedby references non-existent element: ${descId}`,
                        help: 'Ensure aria-describedby points to an existing element that provides additional description for the table.',
                        fix: `Add the missing [id="${descId}"] element that provides additional description for the table.`,
                        component: 'table'
                    });
                } else {
                    this.result.addPass({
                        element: table,
                        id: 'table-valid-describedby',
                        message: 'Table has valid aria-describedby description',
                        component: 'table'
                    });
                }
            }
            // Get rows
            const rows = table.querySelectorAll('tr,[role="row"]');
            if (rows.length === 0) {
                this.result.addViolation({
                    element: table,
                    id: 'table-no-rows',
                    impact: 'serious',
                    message: 'Table has no data rows',
                    help: "Add <tr> elements or elements with [role='row']",
                    fix: "Add <tr> elements or elements with [role='row'] to define the rows of the table.",
                    component: 'table'
                });
                return this.result;
            }
            this.result.addPass({
                element: table,
                id: 'table-has-rows',
                message: `Table has ${rows.length} row(s)`,
                component: 'table'
            });
            // Get headers
            const headers = table.querySelectorAll('th,[role="columnheader"],[role="rowheader"]');
            if (headers.length === 0) {
                this.result.addViolation({
                    element: table,
                    id: 'table-no-headers',
                    impact: 'moderate',
                    message: 'Table has no header cells (<th> or role="columnheader")',
                    help: 'Add <th> elements or cells with role="columnheader"',
                    fix: 'Add <th> elements or cells with [role="columnheader"] to define the header cells of the table.',
                    component: 'table'
                });
            } else {
                this.result.addPass({
                    element: table,
                    id: 'table-has-headers',
                    message: `Table has ${headers.length} header cell(s)`,
                    component: 'table'
                });
            }
            // Check for focusable/interactive elements (Grid conversion detection)
            const focusableInCells = this._detectInteractiveCells(table);
            if (focusableInCells.hasInteractive) {
                this.result.addViolation({
                    element: table,
                    id: 'table-has-interactive-elements',
                    impact: 'serious',
                    message: `Table contains ${focusableInCells.count} interactive element(s)`,
                    help: 'Consider using grid pattern (role="grid") instead of table for interactive content. Static tables should not contain focusable elements.',
                    fix: 'Convert the table to use [role="grid"] and appropriate grid roles for interactive content, or remove interactive elements from the static table.',
                    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/table/',
                    component: 'table'
                });

                // Provide detailed interactive elements report
                this.result.addIncomplete({
                    element: table,
                    id: 'table-conversion-suggestion',
                    message: `Grid Pattern Recommended: Table contains interactive widgets (${focusableInCells.details.join(', ')})`,
                    component: 'table'
                });
            } else {
                this.result.addPass({
                    element: table,
                    id: 'table-no-interactive',
                    message: 'Table is properly static (no interactive elements)',
                    component: 'table'
                });
            }

            // Validate row structure
            for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
                const row = rows[rowIdx];
                // Check row has role
                if (row.tagName !== 'TR' && row.getAttribute('role') !== 'row') {
                    this.result.addViolation({
                        element: row,
                        id: 'table-row-missing-role',
                        impact: 'serious',
                        message: `Row ${rowIdx + 1}: Missing role="row" on non-TR element`,
                        help: "Add <tr> elements or elements with [role='row'] to define the rows of the table.",
                        fix: 'Add [role="row"] to the element that serves as the table row if not using native <tr>.',
                        component: 'table'
                    });
                }
                // Get cells
                const cells = row.querySelectorAll('td, th, [role="cell"],[role="gridcell"],[role="columnheader"], [role="rowheader"]');
                if (cells.length === 0) {
                    this.result.addViolation({
                        element: row,
                        id: 'table-row-no-cells',
                        impact: 'serious',
                        message: `Row ${rowIdx + 1}: Has no cells`,
                        help: "Ensure to have <td>/<th> elements or elements with [role='cell']/[role='gridcell'] in the table row.",
                        fix: 'Add <td>/<th> elements or elements with [role="cell"]/[role="gridcell"] to the table row to define its cells.',
                        component: 'table'
                    });
                    continue;
                }

                // Validate each cell
                for (let cellIdx = 0; cellIdx < cells.length; cellIdx++) {
                    await this._validateCell(table, row, cells[cellIdx], rowIdx, cellIdx);
                }

                // Check for aria-rowcount and aria-rowindex
                if (rows.length > 1) {
                    if (!row.hasAttribute('aria-rowindex')) {
                        // Only warn if using explicit ARIA row indexing
                        if (table.hasAttribute('aria-rowcount')) {
                            this.result.addViolation({
                                element: row,
                                id: 'table-row-missing-index',
                                impact: 'moderate',
                                message: `Row ${rowIdx + 1}: Missing aria-rowindex when table has aria-rowcount`,
                                help: 'Ensure to have aria-rowindex to each row when using aria-rowcount on the table',
                                fix: 'Add [aria-rowindex] to each table row when the table has [aria-rowcount] defined.',
                                component: 'table'
                            });
                        }
                    }
                }
            }

            // Check for aria-sort on headers (sortable columns)
            const sortableHeaders = table.querySelectorAll('[aria-sort]');
            if (sortableHeaders.length > 0) {
                for (const header of sortableHeaders) {
                    const sortValue = header.getAttribute('aria-sort');
                    const has = v => v === "ascending" || v === "descending" || v === "none" || v === "other";
                    if (!has(sortValue)) {
                        this.result.addViolation({
                            element: header,
                            id: 'table-invalid-aria-sort',
                            impact: 'serious',
                            message: `Invalid aria-sort value: "${sortValue}"`,
                            help: 'Use: ascending, descending, none, or other',
                            fix: `Change the [aria-sort="${sortValue}"] to one of the valid values: "ascending", "descending", "none", or "other".`,
                            component: 'table'
                        });
                    } else {
                        this.result.addPass({
                            element: header,
                            id: 'table-valid-aria-sort',
                            message: `Header has valid aria-sort="${sortValue}"`,
                            component: 'table'
                        });
                    }
                }
            }
            // Check for colcount and colindex if rows have missing/hidden columns
            const hasColAttributes = Array.from(rows[0].children).some(cell =>
                cell.hasAttribute('aria-colindex') || cell.hasAttribute('aria-colcount')
            );
            if (hasColAttributes) {
                const firstRow = rows[0];
                if (!firstRow.hasAttribute('aria-colcount')) {
                    this.result.addViolation({
                        element: firstRow,
                        id: 'table-missing-colcount',
                        impact: 'moderate',
                        message: 'Table has aria-colindex but missing aria-colcount',
                        help: "Ensure to have aria-colcount on the first row when using aria-colindex on cells.",
                        fix: "Add [aria-colcount] to the first row when the table has cells with [aria-colindex].",
                        component: 'table'
                    });
                }
                for (const cell of firstRow.children) {
                    if (!cell.hasAttribute('aria-colindex') && firstRow.hasAttribute('aria-colcount')) {
                        this.result.addViolation({
                            element: cell,
                            id: 'table-cell-missing-colindex',
                            impact: 'moderate',
                            message: 'Cell missing aria-colindex when table has aria-colcount',
                            help: 'Ensure to have aria-colindex on each cell when using aria-colcount on the first row',
                            fix: 'Add [aria-colindex] to each cell when the table has [aria-colcount] defined on the first row.',
                            component: 'table'
                        });
                    }
                }
            }
            this.result.addPass({
                element: table,
                id: 'table-structure-validated',
                message: 'Table structure validation complete',
                component: 'table'
            });
            return this.result;
        }

        _detectInteractiveCells(table) {
            const interactiveElements = [];
            const allCells = table.querySelectorAll('td, th, [role="gridcell"], [role="cell"],[role="columnheader"], [role="rowheader"],[role="row"]');
            for (const cell of allCells) {
                if (parseInt(cell.getAttribute('tabindex')) >= -1 || cell.getAttribute('role') == 'gridcell') {
                    interactiveElements.push(cell);
                }
            }
            return {
                hasInteractive: interactiveElements.length > 0,
                count: interactiveElements.length,
                details: [...new Set(interactiveElements)]
            };
        }
        async _validateCell(table, row, cell, rowIdx, cellIdx) {
            const cellRole = cell.getAttribute('role');
            const isNativeCell = cell.tagName === 'TD' || cell.tagName === 'TH';
            const isAriaCell = cellRole === 'cell' || cellRole === 'gridcell' || cellRole === 'columnheader' || cellRole === 'rowheader';
            const isHeaderCell = cell.tagName === 'TH' || cellRole === 'columnheader' || cellRole === 'rowheader';
            // 1. Validate cell role
            if (!isNativeCell && !isAriaCell) {
                this.result.addViolation({
                    element: cell,
                    id: 'table-cell-invalid-role',
                    impact: 'serious',
                    message: `Cell [${rowIdx + 1},${cellIdx + 1}]: Invalid role "${cellRole}"`,
                    help: 'Use <td>, <th>, or role="cell|gridcell|columnheader|rowheader".',
                    fix: 'Replace with native table markup or valid ARIA roles.',
                    component: 'table'
                });
            }
            // 2. Native cell MUST NOT use aria-rowspan/colspan
            if (isNativeCell && (cell.hasAttribute('aria-colspan') || cell.hasAttribute('aria-rowspan'))) {
                this.result.addViolation({
                    element: cell,
                    id: 'native-table-cell-aria-misuse',
                    impact: 'minor',
                    message: `Cell [${rowIdx + 1},${cellIdx + 1}]: Native table cell must not use aria-colspan or aria-rowspan attributes`,
                    help: 'Native table elements already expose row/column span semantics.',
                    fix: 'Remove aria-colspan / aria-rowspan. Use colspan / rowspan attributes instead.',
                    component: 'table'
                });
            }
            // 3. Cell content accessibility
            const textContent = cell.textContent.trim();
            if (!textContent && !cell.hasAttribute('aria-label') && !cell.hasAttribute('aria-labelledby')) {
                const interactiveChildren = cell.querySelectorAll('button, a[href], input, select, textarea, [role="button"]');
                if (interactiveChildren.length === 0) {
                    this.result.addViolation({
                        element: cell,
                        id: 'table-cell-empty',
                        impact: 'moderate',
                        message: `Cell [${rowIdx + 1},${cellIdx + 1}]: Empty cell with no accessible content`,
                        help: 'Provide text content or an accessible name.',
                        fix: 'Add visible text or aria-label.',
                        component: 'table'
                    });
                }
            }
            // 4. Header cell must have accessible text
            if (isHeaderCell && !textContent && !cell.hasAttribute('aria-label') && !cell.hasAttribute('aria-labelledby')) {
                this.result.addViolation({
                    element: cell,
                    id: 'table-header-cell-empty',
                    impact: 'serious',
                    message: `Header cell [${rowIdx + 1},${cellIdx + 1}]: Missing accessible header text`,
                    help: 'Header cells must have visible or programmatic text.',
                    fix: 'Add descriptive text or [aria-label="descriptive text"].',
                    component: 'table'
                });
            }
        }
    }
    class LinkTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'link' });
        }

        async test(element) {
            if (element.tagName === 'A' || element.querySelector('a')) {
                return this.result;
            }
            const link = element.getAttribute('role') == 'link' ? element : element.querySelector('[role="link"]');
            if (!link) {
                this.result.addInapplicable({
                    element,
                    id: 'link-not-found',
                    message: 'No link found',
                    component: 'link'
                });
                return this.result;
            }
            const linkText = link.textContent.trim();
            if (!linkText && !link.hasAttribute('aria-label') && !link.hasAttribute('title')) {
                this.result.addViolation({
                    element: link,
                    id: 'link-no-accessible-name',
                    impact: 'serious',
                    message: 'Link has no accessible name',
                    help: 'Add text content or aria-label',
                    fix: 'Provide an accessible name for the link by adding visible text, [aria-label="accessible name"], or [title="accessible name"].',
                    component: 'link'
                });
                return this.result;
            }
            if (linkText.length > 0) {
                this.result.addPass({
                    element: link,
                    id: 'link-has-accessible-name',
                    message: `Link text: "${linkText.substring(0, 50)}"`,
                    component: 'link'
                });
            }
            const img = link.querySelector('img');
            if (img && (!img.getAttribute('alt') && !link.getAttribute('alt') && !link.hasAttribute('aria-label') && !link.hasAttribute('title'))) {
                this.result.addViolation({
                    element: link,
                    id: 'link-img-no-alt',
                    impact: 'serious',
                    message: 'Link image tag has neither accessible name nor alt',
                    help: 'Add text content or aria-label or alt',
                    fix: 'Provide an accessible name for the link by adding visible text, [aria-label="accessible name"], [title="accessible name"], or [alt="accessible name"] on the image.',
                    component: 'link'
                });
            }
            return this.result;
        }
    }
    class SpinbuttonTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'spinbutton' });
        }
        async test(element) {
            const spinBtn = element.getAttribute('role') == 'spinbutton' ? element : element.querySelector('[role="spinbutton"]');
            await this.testAriaAttribute(spinBtn, 'aria-valuenow');
            await this.testAriaAttribute(spinBtn, 'aria-valuemin');
            await this.testAriaAttribute(spinBtn, 'aria-valuemax');
            if (this.isFocusable(spinBtn)) {
                await this.testKeyboardSupportWithAriaChanges(spinBtn, 'ArrowUp');
                await this.testKeyboardSupportWithAriaChanges(spinBtn, 'ArrowDown');
                await this.testKeyboardSupportWithAriaChanges(spinBtn, 'Home');
                await this.testKeyboardSupportWithAriaChanges(spinBtn, 'End');
            } else {
                this.result.addViolation({
                    element: spinBtn,
                    id: 'spinbutton-not-focusable',
                    message: 'Spinbutton is not focusable.',
                    help: "Ensure to have tabindex ='0' for role='spinbutton' to focus",
                    fix: "Add [tabindex ='0'] to the [role=\"spinbutton\"] to make it focusable.",
                    component: 'spinbutton'
                })
            }
        }
    }
    class SliderTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'slider' });
        }
        detectOrientation(element) {
            const rect = element.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            if (width >= height) {
                return this.orientation.horizontal;
            }
            return this.orientation.vertical;
        }
        async testRole(element) {
            const slider = element.getAttribute('role') === 'slider' ? element : element.querySelector('[role="slider"]');
            if (!slider) {
                this.result.addInapplicable({
                    element,
                    id: 'slider-not-found',
                    message: 'No slider found',
                    component: 'slider'
                });
                return null;
            }
            await this.testAriaAttribute(slider, 'aria-valuenow');
            await this.testAriaAttribute(slider, 'aria-valuemin');
            await this.testAriaAttribute(slider, 'aria-valuemax');
            return slider;
        }
        async testKeyNav(slider, prevSlider, nextSlider) {
            const { nextKey, prevKey } = this.detectOrientation(slider.parentElement, 'slider');
            if (this.isFocusable(slider)) {
                await this.testKeyboardSupportWithAriaChanges(slider, nextKey);
                this.checkTheMaxMin(slider, prevSlider, nextSlider);
                await this.testKeyboardSupportWithAriaChanges(slider, prevKey);
                this.checkTheMaxMin(slider, prevSlider, nextSlider);
                await this.testKeyboardSupportWithAriaChanges(slider, 'Home');
                this.checkTheMaxMin(slider, prevSlider, nextSlider);
                await this.testKeyboardSupportWithAriaChanges(slider, 'End');
                this.checkTheMaxMin(slider, prevSlider, nextSlider);
            } else {
                this.result.addViolation({
                    element: slider,
                    id: 'slider-not-focusable',
                    message: 'Slider is not focusable.',
                    help: "Ensure to have tabindex ='0' for role='slider' to focus",
                    fix: "Add [tabindex ='0'] to the [role=\"slider\"] to make it focusable.",
                    component: 'slider'
                })
            }
        }
        checkTheMaxMin(current, previous, next) {
            if (!previous && !next) { return }
            const currentMax = current.getAttribute('aria-valuemax');
            const currentMin = current.getAttribute('aria-valuemin');
            if (previous) {
                const prevMax = previous.getAttribute('aria-valuemax') || previous.querySelector('[aria-valuemax]');
                if (parent(prevMax) > parseInt(currentMin)) {
                    this.result.addViolation({
                        element: current,
                        id: 'value-min-invalid',
                        help: 'The values of aria-valuemin or aria-valuemax of the dependent sliders are updated when the value changes of another slider in multi slider.',
                        message: 'The aria-valuemin is less than the previous slider aria-valuemax',
                        fix: `The value of [aria-valuemin="${currentMin}"] should be greater than or equal to the previous slider's [aria-valuemax="${prevMax}"].`,
                        helpUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/#roles_states_properties'
                    })
                }
            }
            if (next) {
                const nextMin = next.getAttribute('aria-valuemax') || next.querySelector('[aria-valuemax]');
                if (parseInt(nextMin) < parseInt(currentMax)) {
                    this.result.addViolation({
                        element: current,
                        id: 'value-max-invalid',
                        help: 'The values of aria-valuemin or aria-valuemax of the dependent sliders are updated when the value changes of another slider in multi slider.',
                        message: 'The aria-valuemax is greater than the next slider aria-valuemin',
                        fix: `The value of [aria-valuemax="${currentMax}"] should be less than or equal to the next slider's [aria-valuemin="${nextMin}"].`,
                        helpUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/#roles_states_properties'
                    })
                }
            }
        }
        async test(sliders) {
            for (let i = 0; i < sliders.length; i += 2) {
                const slider = await this.testRole(sliders[i]);
                if (!slider) { continue };
                const nextSlider = sliders[i + 1];
                const prevSlider = sliders[i - 1];
                await this.testKeyNav(slider, prevSlider, nextSlider);
            }
            return this.result;
        }
    }
    class ToolbarTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'toolbar' });
        }
        isFocusElement(flag, control) {
            if (flag) {
                this.result.addPass({
                    element: control,
                    id: 'toolbar-has-focusable-controls',
                    message: `Toolbar has focusable control(s)`,
                    component: 'toolbar'
                });
            } else {
                this.result.addViolation({
                    element: control,
                    id: 'toolbar-no-focusable-controls',
                    impact: 'serious',
                    message: 'Toolbar has no focusable controls',
                    help: "Ensure to have focusable controls like buttons, checkboxes, radio buttons inside the toolbar.",
                    fix: "Add focusable controls like buttons, checkboxes, radio buttons inside the [role=\"toolbar\"] to make it accessible.",
                    component: 'toolbar'
                });
            }
        }
        getFocus(toolBar) {
            return toolBar.querySelector('[tabindex="0"]')
        }
        async test(element) {
            const toolbar = element.querySelector('[role="toolbar"]') || element;
            await this.testAriaAttribute(toolbar, 'role', new Set(['toolbar']));
            const controls = toolbar.querySelectorAll('button, [role="button"], input[type="checkbox"], input[type="radio"]');
            if (controls.length === 0) {
                this.result.addViolation({
                    element: toolbar,
                    id: 'toolbar-no-controls',
                    impact: 'serious',
                    message: 'Toolbar has no controls',
                    help: "Ensure to have controls like buttons, checkboxes, radio buttons inside the toolbar.",
                    fix: "Add controls like buttons, checkboxes, radio buttons inside the [role=\"toolbar\"] to make it accessible.",
                    component: 'toolbar'
                });
                return this.result;
            }
            for (const control of controls) {
                if (this.isFocusable(control)) {
                    this.isFocusElement(true, control);
                    if(!this.getFocus(toolbar)){
                        return this.result;
                    }
                    await this.keyNavCheck(this.getFocus(toolbar), 'ArrowLeft');
                    await this.simulateKeyPress(this.getFocus(toolbar), 'ArrowRight');
                    await this.keyNavCheck(this.getFocus(toolbar), 'ArrowRight');
                } else {
                    this.isFocusElement(false, control);
                }
            }
            return this.result;
        }
    }
    class BreadcrumbTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'breadcrumb' });
        }

        async test(element) {
            const nav = element.tagName === 'NAV' ? element : element.querySelector('nav,[role="navigation"]');

            if (!nav && !element.hasAttribute('role') || (element.getAttribute('role') !== 'navigation')) {
                this.result.addViolation({
                    element,
                    id: 'breadcrumb-missing-nav',
                    impact: 'serious',
                    message: 'Breadcrumb should be in <nav> or have role="navigation"',
                    help: 'Wrap breadcrumb in <nav> tag',
                    fix: 'Wrap the breadcrumb component inside a <nav> element or add [role="navigation"] to the breadcrumb container.',
                    component: 'breadcrumb'
                });
            }
            this.testAriaAttribute(nav || element, 'aria-label');
            const container = nav || element;
            const links = container.querySelectorAll('a');
            if (links.length === 0) {
                this.result.addViolation({
                    element: container,
                    id: 'breadcrumb-no-links',
                    impact: 'serious',
                    message: 'Breadcrumb has no navigation links',
                    help: "Ensure to have anchor tags inside the breadcrumb for navigation.",
                    fix: "Add anchor tags(&lt;a&gt;) inside the breadcrumb for navigation.",
                    component: 'breadcrumb'
                });
                return this.result;
            }
            // Check last item for current page indicator
            const lastItem = links[links.length - 1];
            if (!lastItem.hasAttribute('aria-current')) {
                this.result.addViolation({
                    element: lastItem,
                    id: 'breadcrumb-missing-current',
                    impact: 'moderate',
                    message: 'Last breadcrumb item should have aria-current="page"',
                    help: 'Add aria-current="page" to current page breadcrumb',
                    fix: "Add [aria-current=\"page\"] to the current breadcrumb link to indicate the current page.",
                    component: 'breadcrumb'
                });
            }

            // Verify all links are accessible
            for (const link of links) {
                if (!link.textContent.trim()) {
                    this.result.addViolation({
                        element: link,
                        id: 'breadcrumb-link-no-text',
                        impact: 'serious',
                        message: 'Breadcrumb link has no text content',
                        help: 'Add text content to breadcrumb link',
                        fix: 'Provide visible text or [aria-label="accessible name"] for the breadcrumb link to ensure it is accessible.',
                        component: 'breadcrumb'
                    });
                }
            }

            this.result.addPass({
                element: container,
                id: 'breadcrumb-structure-valid',
                message: `Breadcrumb has ${links.length} navigation link(s)`,
                component: 'breadcrumb'
            });

            return this.result;
        }
    }
    class TreeGridTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'treegrid' });
        }

        async moveBetweenCells(cells, index, length) {
            for (const cell of cells) {
                if (cell !== cells[cells.length - 1]) {
                    await this.keyNavCheck(cell, 'ArrowRight');
                    await this.simulateKeyPress(document.activeElement, 'ArrowLeft');
                }
                if (cell !== cells[0]) {
                    await this.keyNavCheck(cell, 'ArrowLeft');
                    await this.simulateKeyPress(document.activeElement, 'ArrowRight');
                }
                if (index !== length) {
                    await this.keyNavCheck(cell, 'ArrowDown');
                    await this.simulateKeyPress(document.activeElement, 'ArrowUp');
                }
                if (index !== 0) {
                    await this.keyNavCheck(cell, 'ArrowUp');
                    await this.simulateKeyPress(document.activeElement, 'ArrowDown');
                }
                await this.simulateKeyPress(cell, 'ArrowRight');
            }
        }

        async test(element) {
            const treegrid = element.querySelector('[role="treegrid"]') || element;
            await this.testAriaAttribute(treegrid, 'role', new Set(['treegrid']));
            const rows = treegrid.querySelectorAll('[role="row"]');
            if (rows.length === 0) {
                this.result.addViolation({
                    element: treegrid,
                    id: 'treegrid-no-rows',
                    impact: 'serious',
                    message: 'Treegrid has no [role="row"] in it.Specify the [role="row"] to the elements in it.',
                    help: "Ensure to give [role='row'] to the child elements of treegrid.",
                    fix: "Add [role=\"row\"] to the elements inside the [role=\"treegrid\"] to define the rows of the treegrid.",
                    component: 'treegrid'
                });
                return this.result;
            }
            let i = 0;
            for (const row of rows) {
                const cells = row.querySelectorAll('[role="gridcell"]');
                if (cells.length === 0) {
                    this.result.addViolation({
                        element: row,
                        id: 'treegrid-row-no-cells',
                        impact: 'serious',
                        message: 'Treegrid row has no [role="cell"] elements in it.',
                        help: "Ensure to give the [role='cell'] to the child elements of [role='row'].",
                        fix: "Add [role=\"cell\"] to the elements inside the [role=\"row\"] to define the cells of the row.",
                        component: 'treegrid'
                    });
                    continue;
                }
                // Check for aria-expanded on expandable rows
                if (row == rows[0] && row.hasAttribute('aria-expanded')) {
                    if (row.getAttribute('aria-expanded') == 'true') {
                        await this.testKeyboardSupportWithAriaChanges(row, 'ArrowLeft');
                    }
                    await this.testKeyboardSupportWithAriaChanges(row, 'ArrowRight');
                    await this.keyNavCheck(row, 'ArrowRight');
                    await this.moveBetweenCells(cells, i, rows.length - 1);
                    await this.keyNavCheck(document.activeElement, 'ArrowLeft');
                    await this.testKeyboardSupportWithAriaChanges(row, 'ArrowLeft');
                }
                i++;
            }
            return this.result;
        }
    }
    class CarouselTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'carousel' })
        }
        getCarousel(images) {
            if (images.length > 1) {
                let length = 0
                let parent = images[0].parentElement;
                while (length !== images.length && parent.tagName !== 'BODY') {
                    length = parent.querySelectorAll('img,[role="img"]').length;
                    if (length == images.length || parent.tagName == 'BODY') {
                        break;
                    } else {
                        parent = parent.parentElement;
                    }
                }
                return parent;
            } else {
                return null;
            }
        }
        async test(element) {
            const images = element.querySelectorAll('img,[role="img"]');
            const parent = this.getCarousel(images);
            await this.testAriaAttribute(parent, 'aria-roledescription', "carousel");
            await this.testAriaAttribute(parent, 'aria-live', new Set(['polite', 'off']));
            for (const image of images) {
                if (!image.closest('[aria-roledescription="slide"]')) {
                    await this.testAriaAttribute(image.parentElement, 'aria-roledescription', 'slide');
                }
            }
        }
    }
    class TooltipTester extends BaseTester {
        constructor(options) {
            super({ ...options, component: 'tooltip' });
        }

        async test(element) {
            const tooltip = element.getAttribute('role') === 'tooltip' ?
                element : element.querySelector('[role="tooltip"]');

            if (!tooltip) {
                this.result.addInapplicable({
                    element,
                    id: 'tooltip-not-found',
                    message: 'No tooltip found',
                    component: 'tooltip'
                });
                return this.result;
            }

            await this.testAriaAttribute(tooltip, 'role', new Set(['tooltip']));

            // Check trigger element
            const triggerId = tooltip.getAttribute('aria-labelledby') || tooltip.getAttribute('aria-describedby');
            if (!triggerId) {
                this.result.addViolation({
                    element: tooltip,
                    id: 'tooltip-no-trigger',
                    impact: 'serious',
                    message: 'Tooltip must have aria-labelledby or aria-describedby',
                    help: 'Link tooltip to triggering element',
                    fix: "Add aria-labelledby or aria-describedby attribute to the tooltip element to reference the triggering element.",
                    component: 'tooltip'
                });
            } else if (!document.getElementById(triggerId)) {
                this.result.addViolation({
                    element: tooltip,
                    id: 'tooltip-invalid-trigger',
                    impact: 'serious',
                    message: `aria-labelledby/describedby references non-existent element: ${triggerId}`,
                    help: 'Ensure referenced element exists',
                    fix: `Create an element with id="${triggerId}" that triggers the tooltip.`,
                    component: 'tooltip'
                });
            }

            if (!tooltip.textContent.trim()) {
                this.result.addViolation({
                    element: tooltip,
                    id: 'tooltip-empty',
                    impact: 'serious',
                    message: 'Tooltip has no content',
                    help: 'Add visible text or an aria-label to the tooltip to provide accessible content.',
                    fix: 'Provide visible text content or add an aria-label attribute to the tooltip element.',
                    component: 'tooltip'
                });
                return this.result;
            }

            this.result.addPass({
                element: tooltip,
                id: 'tooltip-valid',
                message: 'Tooltip properly configured',
                component: 'tooltip'
            });

            return this.result;
        }
    }
    // ===== REGISTRY & RUNNER =====
    const COMPONENT_REGISTRY = {
        'accordion': AccordionTester,
        'combobox': ComboboxTester,
        'disclosure': class DisclosureTester extends AccordionTester { constructor(options) { super({ ...options, component: 'disclosure' }); } },
        'listbox': ListboxTester,
        'dialog': DialogTester,
        'grid': GridTester,
        'tablist': TablistTester,
        'tree': TreeTester,
        'alertdialog': AlertDialogTester,
        'menu': MenuTester,
        'menubar': MenubarTester,
        'radiogroup': RadioGroupTester,
        'checkbox': CheckboxTester,
        'switch': SwitchTester,
        'progressbar': ProgressbarTester,
        'button': ButtonTester,
        'table': TableTester,
        'link': LinkTester,
        'spinbutton': SpinbuttonTester,
        'breadcrumb': BreadcrumbTester,
        'slider': SliderTester,
        'toolbar': ToolbarTester,
        'treegrid': TreeGridTester,
        'carousel': CarouselTester,
    };
    function getMultiSliderWidgets(element) {
        const sliders = element.querySelectorAll('[role="slider"]');
        const map = new Map();
        sliders.forEach(slider => {
            const parent = slider.closest('[role="group"], [data-slider-group]') || slider.parentElement;
            if (!map.has(parent)) { map.set(parent, []) };
            map.get(parent).push(slider);
        });
        return [...map.values()];
    }
    function isVisible(el) {
        if (!el || el.nodeType !== 1) { return false; }
        if (el.hasAttribute('hidden')) { return false; }
        const style = window.getComputedStyle(el);
        if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.visibility === 'collapse'
        ) {
            return false;
        }
        if (el.getAttribute('aria-hidden') === 'true') { return false; }
        if (el.tabIndex >= 0) {
            return true;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            return false;
        }
        if (parseFloat(style.opacity) === 0) {
            return false;
        }
        return true;
    }
    async function runAccessibilityTest(element, options = {}) {
        const { component, format = 'id' } = options;

        if (!COMPONENT_REGISTRY[component]) {
            return null;
        }

        const TesterClass = COMPONENT_REGISTRY[component];
        const tester = new TesterClass(options);

        try {
            await tester.test(element);
        } catch (error) {
            console.error(error)
            tester.result.addError({
                element,
                id: 'test-error',
                message: `Error during testing: ${error.message}`,
                component
            });
        }

        return tester.result.toJSON();
    }
    $L.prototype.focusInspector = async function (options = {}, classes = {}, ignore = []) {
        const results = [];
        Object.assign(COMPONENT_REGISTRY, classes);
        const ignoreList = new Set(['accordion', 'carousel', 'disclosure', ...ignore])
        for (const element of Array.from(this)) {
            if (options.component == 'slider') {
                const sliders = getMultiSliderWidgets(element);
                for (const slide of sliders) {
                    if (isVisible(slide)) {
                        const result = await runAccessibilityTest(slide, options);
                        if (result) {
                            results.push(result);
                        }
                    }
                }
            } else if (ignoreList.has(options.component)) {
                if (isVisible(element)) {
                    const result = await runAccessibilityTest(element, options);
                    if (result) {
                        results.push(result);
                    }
                }
            }
            else {
                const eleRole = element.getAttribute('role')
                let roles;
                if (!options.component) {
                    roles = eleRole ? [element] : element.querySelectorAll(`[role]`);
                } else {
                    roles = eleRole == options.component ? [element] : element.querySelectorAll(`[role="${options.component}"]`);
                }
                for (const role of roles) {
                    const op = { ...options };
                    if (!op.component) {
                        op.component = role.getAttribute('role');
                    }
                    if (isVisible(role)) {
                        const result = await runAccessibilityTest(role, op);
                        if (result) {
                            results.push(result);
                        }
                    }
                }
            }
        }
        return results;
    };
    $L.prototype.focusInspector.BaseTester = BaseTester;
    $L.prototype.focusInspector.KeyboardSimulator = KeyboardSimulator;
    $L.prototype.focusInspector.AriaStateSnapshot = AriaStateSnapshot;
    $L.prototype.focusInspector.AccessibilityResult = AccessibilityResult;
    $L.prototype.focusInspector.AriaAttributeValidator = AriaAttributeValidator;
    $L.prototype.focusInspector.supported = ['accordion', 'combobox', 'disclosure', 'listbox', 'dialog', 'grid', 'tablist', 'tree',
        'alertdialog', 'menu', 'menubar', 'radiogroup', 'checkbox', 'switch', 'progressbar', 'button', 'table',
        'link', 'spinbutton', 'breadcrumb', 'slider', 'toolbar', 'treegrid', 'carousel'];
})(window);
