/**
 * @A component that allows users to select multiple chips from a group. It supports scrolling through chips when the number exceeds the visible area.
 * @component lyte-chip-group
 * @utility select, remove
 * @methods onChipSelected, onChipUnselected
 * @version 3.114.0
 */
Lyte.Component.register("lyte-chip-group", {
_template:"<template tag-name=\"lyte-chip-group\" lyte-chip-group=\"\"> <div class=\"lyteChipGroupContainer\"> <lyte-arrow class=\"lyteArrowControlForChip\" tabindex=\"0\"><i class=\"lyteArrowLeft\"></i></lyte-arrow> <div class=\"lyteChipScrollWrapper\" tabindex=\"0\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"chipgroup\" items=\"{{ltPropItems}}\"></lyte-yield> </template><template case=\"false\"> <template items=\"{{ltPropItems}}\" item=\"item\" index=\"index\" is=\"for\"> <lyte-chip data-value=\"{{item[ltPropSystemValue]}}\"> {{item[ltPropUserValue]}} </lyte-chip> </template> </template></template> </div> <lyte-arrow class=\"lyteArrowControlForChip\" tabindex=\"0\"><i class=\"lyteArrowRight\"></i></lyte-arrow> </div> </template>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,5]}],
_observedAttributes :["ltPropYield","ltPropItems","ltPropUserValue","ltPropSystemValue","ltPropSelected","ltPropMaxWidth","ltPropArrowEvent","ltPropScrollIncrement","stopHandler","arrowRid","arrowLid","leftW","rightW","iterationCounter","rightIterationCounter"],
_observedAttributesType :["boolean","array","string","string","array","string","string","number","boolean","string","string","number","number","number","number"],

    init: function () {

        /**
         * utility function to select a chip by its value.
         */
        this.$node.select = function (value) {
            if (value) {
                var selectedItems = this.getData('ltPropSelected') || [];
                if (selectedItems.includes(value)) {
                    return;
                } else {
                    var chipNode = document.querySelector('lyte-chip[data-value="' + value + '"]');
                    if (chipNode) {
                        chipNode.click();
                    }
                }
            }
        }
        /**
         * utility function to remove a chip by its value.
         */
        this.$node.remove = function (value) {
            if (value) {
                var selectedItems = this.getData('ltPropSelected') || [];
                if (selectedItems.includes(value)) {
                    var chipNode = document.querySelector('lyte-chip[data-value="' + value + '"]');
                    if (chipNode) {
                        chipNode.click();
                    }
                }
            }
        }
    },
    data: function () {
        var default_values = {
            userValue: 'name',
            systemValue: 'value',
            items: [],
            yielded: false,
            selected: [],
            maxWidth: '90%',
            arrowEvent: 'click',
            scrollIncrement: 2
        }
        return {

            /**
             * @componentProperty {boolean} ltPropYield Defines whether the content is yielded by user or not.
             * @default false
            * @version 3.114.0
             */
            ltPropYield: Lyte.attr('boolean', { 'default': default_values.yielded }),

            /**
             * @componentProperty {array} ltPropItems Defines the items to be displayed in the chip group.
             * @default []
             * @version 3.114.0
             */
            ltPropItems: Lyte.attr('array', { 'default': default_values.items }),

            /**
             * @componentProperty {string} ltPropUserValue Defines the property of the item to be used as the display value in the chip.
             * @default 'name'
             * @version 3.114.0
             */
            ltPropUserValue: Lyte.attr('string', { 'default': default_values.userValue }),

            /**
             * @componentProperty {string} ltPropSystemValue Defines the property of the item to be used as the data-value in the chip.
             * @default 'value'
             * @version 3.114.0
             */
            ltPropSystemValue: Lyte.attr('string', { 'default': default_values.systemValue }),
            /**
             * @componentProperty {string} ltPropSelected Defines the selected chips in the chip group.
             * @default []
             * @version 3.114.0
             */
            ltPropSelected: Lyte.attr('array', { 'default': default_values.selected }),
            /**
             * @componentProperty {string} ltPropMaxWidth Defines the maximum width of the chip group container as a percentage of the parent container.
             * @default '90%'
             * @version 3.114.0
             */
            ltPropMaxWidth: Lyte.attr('string', { 'default': default_values.maxWidth }),
            /**
             * @componentProperty {mouseover | click} ltPropArrowEvent Defines the event type for arrow click or hover actions.
             * @default 'click'
             * @version 3.114.0
             */
            ltPropArrowEvent: Lyte.attr('string', { 'default': default_values.arrowEvent }),
            /**
             * @componentProperty {number} ltPropScrollIncrement Defines the number of chips to scroll when the arrow is clicked.
             * @default 2
             * @version 3.114.0
             */
            ltPropScrollIncrement: Lyte.attr('number', { 'default': default_values.scrollIncrement }),



            stopHandler: Lyte.attr('boolean', { 'default': false }),
            arrowRid: Lyte.attr('string', { 'default': '' }),
            arrowLid: Lyte.attr('string', { 'default': '' }),
            leftW: Lyte.attr('number', { 'default': '' }),
            rightW: Lyte.attr('number', { 'default': '' }),
            iterationCounter: Lyte.attr('number', { 'default': -1 }),
            rightIterationCounter: Lyte.attr('number', { 'default': -1 })

        }
    },
    actions: {
        // Functions for event handling
    },
    methods: {
        // Functions which can be used as callback in the component.
    },
    didConnect: function () {
        // $L.fastdom.measure(this.show.bind(this));
        var arrows = this.getArrows();
        this.setData('leftW', arrows[0].getBoundingClientRect().width);
        this.setData('rightW', arrows[1].getBoundingClientRect().width);
        arrows[0].style.display = 'none';
        this.resizeDiv();
        this.addEventsForArrows();
    },

    /**
     * This function is used to resize the chip group container based on the maximum width and the widths of the left and right arrows.
     * It calculates the maximum width based on the parent container's width and the specified percentage.
     */
    resizeDiv: function () {
        var tag = this.$node,
            div = tag.querySelector('.lyteChipGroupContainer'),
            arrows = this.getArrows(),
            left = this.getData('leftW'),
            right = this.getData('rightW'),
            maxWidth = this.getMaxWidth();

        if (div) {
            div.style.maxWidth = maxWidth + 'px';
            div.style.width = maxWidth + 'px';
        }
        var innerDiv = tag.querySelector('.lyteChipScrollWrapper');
        if (innerDiv) {
            innerDiv.style.width = 'calc(100% - ' + (left + right) + 'px)';
        }
    },
    /**
    * Calculates the maximum width of the chip group container based on the parent container's width and the specified percentage.
    * @param {string}  
    * @returns the width in pixels.
    */
    getMaxWidth: function () {
        var widthPercent = parseFloat(this.getData('ltPropMaxWidth')) / 100,
            rects = this.$node.getBoundingClientRect();
        return rects.width * widthPercent;
    },

    /**
     * Adds event listeners to the left and right arrows based on the specified event type.
     */
    addEventsForArrows: function () {
        var arrows = this.getArrows(),
            isMobile = _lyteUiUtils.isMobile,
            event = this.getData('ltPropArrowEvent');
        if (isMobile) {
            arrows[0].addEventListener('touchstart', this.moveLeft.bind(this));
            arrows[1].addEventListener('touchstart', this.moveRight.bind(this));
            arrows[0].addEventListener('touchend', this.removeLeft.bind(this));
            arrows[1].addEventListener('touchend', this.removeRight.bind(this));
            arrows[0].addEventListener('touchcancel', this.removeLeft.bind(this));
            arrows[1].addEventListener('touchcancel', this.removeRight.bind(this));
        }
        else {
            if (event === 'mousehover') {
                arrows[0].addEventListener('mouseenter', this.moveLeft.bind(this));
                arrows[1].addEventListener('mouseenter', this.moveRight.bind(this));
                arrows[0].addEventListener('mouseleave', this.removeLeft.bind(this));
                arrows[1].addEventListener('mouseleave', this.removeRight.bind(this));
            }
            else if (event === 'click') {
                arrows[0].addEventListener('click', this.moveLeftOnClick.bind(this));
                arrows[1].addEventListener('click', this.moveRightOnClick.bind(this));
            }
            arrows.forEach(arrow => {
                arrow.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); // Prevent scroll on space
                        this.click();
                    }
                });
            });
        }
    },

    /**
     * To find all the lyte-arrow elements within the component.
     * @returns {NodeList} A NodeList of all lyte-arrow elements within the component.
     */
    getArrows: function () {
        var parent = this.$node;
        return parent.querySelectorAll('lyte-arrow');
    },

    /**
     * Removes the right arrow event listeners and cancels the animation frame.
     */
    removeRight: function () {
        this.setData('stopHandler', false);
        window.cancelAnimationFrame(this.getData('arrowRid'))
    },

    /**
     * Removes the left arrow event listeners and cancels the animation frame.
     */
    removeLeft: function () {
        this.setData('stopHandler', false);
        window.cancelAnimationFrame(this.getData('arrowLid'));
    },

    /**
     * Scrolls the chip group to the right by a small increment.
     * @param {} div 
     * @param {} ar 
     * @param {function} right 
     */
    right: function (div, ar, right) {
        var id,
            scrollL = div.scrollLeft,
            scrollW = div.scrollWidth,
            width = div.getBoundingClientRect().width;

        this.setData('stopHandler', true);
        if (scrollL + width < scrollW) {
            scrollL = div.scrollLeft = div.scrollLeft + 3
        }

        if (Math.floor(width) + Math.floor(scrollL) >= scrollW) {
            ar[1].style.display = 'none';
            div.style.width = 'calc(100% - ' + right + 'px)';
        }

        id = window.requestAnimationFrame(this.right.bind(this, div, ar, right));
        this.setData('arrowRid', id);
    },

    /**
     * Scrolls the chip group to the right by a ltPropIncrement value.
     * @param {number} scrollIncrement 
     */
    rightOnClick: function (scrollIncrement) {
        var tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(),
            right = this.getData('rightW'),
            chips = Array.from(div.getElementsByTagName('lyte-chip'));

        if (chips.length === 0) { return; }

        var scrollLeft = div.scrollLeft;
        var containerRect = div.getBoundingClientRect();
        var containerRight = containerRect.right;

        // Get container gap (use column-gap or gap, fallback to 0)
        var containerStyle = getComputedStyle(div);
        var gap = parseInt(containerStyle.columnGap || containerStyle.gap || 0);
        if (typeof gap !== 'number' || isNaN(gap)) {
            gap = 0;
        }
        // Find the index of the first chip that is outside to the right
        let startIndex = 0;
        for (let i = 0; i < chips.length; i++) {
            let chipRect = chips[i].getBoundingClientRect();
            if (chipRect.right > containerRight) {
                startIndex = i;
                break;
            }
        }

        // Scroll amount = total width of the next N chips + (N - 1) × gap
        let scrollAmount = 0;
        let count = 0;
        for (let i = startIndex; i < chips.length && count < scrollIncrement; i++, count++) {
            let chip = chips[i];
            let chipStyle = getComputedStyle(chip);
            let marginLeft = parseInt(chipStyle.marginLeft) || 0;
            let marginRight = parseInt(chipStyle.marginRight) || 0;

            scrollAmount += chip.offsetWidth + marginLeft + marginRight;
            if (count < scrollIncrement - 1) {
                scrollAmount += gap; // Add gap between chips
            }
        }

        // Perform the scroll
        div.scrollLeft += scrollAmount;

        // Update right arrow visibility
        var scrollW = div.scrollWidth;
        var newScrollLeft = div.scrollLeft;
        var width = containerRect.width;

        if (Math.ceil(newScrollLeft + width) >= scrollW) {
            ar[1].style.display = 'none';
            div.style.width = 'calc(100% - ' + right + 'px)';
        } else {
            ar[1].style.display = 'inline-block';
        }
    },

    /**
     * 
     * @param {} div 
     * @param {} ar 
     * @param {function} left 
     */
    left: function (div, ar, left) {
        var scrollL = div.scrollLeft, id;
        this.setData('stopHandler', true);

        if (scrollL !== 0) {
            scrollL = div.scrollLeft = div.scrollLeft - 3;
        }

        if (scrollL <= 0) {
            ar[0].style.display = 'none';
            div.style.width = 'calc(100% - ' + left + 'px)';
        }

        id = window.requestAnimationFrame(this.left.bind(this, div, ar, left));
        this.setData('arrowLid', id);
    },

    /**
     * Function to scroll the chip group to the left by a ltPropIncrement value.
     * @param {number} scrollIncrement 
     */
    leftOnClick: function (scrollIncrement) {
        var tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(),
            chips = Array.from(div.getElementsByTagName('lyte-chip'));

        if (chips.length === 0) { return; }

        var scrollLeft = div.scrollLeft;

        // Get container gap (use column-gap or gap, fallback to 0)
        var containerStyle = getComputedStyle(div);
        var gap = parseInt(containerStyle.columnGap || containerStyle.gap || 0);
        if (typeof gap !== 'number' || isNaN(gap)) {
            gap = 0;
        }
        // Find the chip that's currently visible at the left edge
        let startIndex = 0;
        for (let i = 0; i < chips.length; i++) {
            let chipRect = chips[i].getBoundingClientRect();
            let containerRect = div.getBoundingClientRect();
            if (chipRect.left >= containerRect.left) {
                startIndex = i;
                break;
            }
        }

        // Calculate total scroll size of previous N chips
        let scrollAmount = 0;
        let count = 0;
        for (let i = startIndex - 1; i >= 0 && count < scrollIncrement; i--, count++) {
            let chip = chips[i];
            let style = getComputedStyle(chip);
            let marginLeft = parseInt(style.marginLeft) || 0;
            let marginRight = parseInt(style.marginRight) || 0;

            scrollAmount += chip.offsetWidth + marginLeft + marginRight;
            if (count < scrollIncrement - 1) {
                scrollAmount += gap;
            }
        }

        // Perform the scroll left
        div.scrollLeft = Math.max(0, scrollLeft - scrollAmount);

        // Update left arrow visibility
        var left = this.getData('leftW');
        if (div.scrollLeft <= 0) {
            ar[0].style.display = 'none';
            div.style.width = 'calc(100% - ' + left + 'px)';
        } else {
            ar[0].style.display = 'inline-block';
        }
    },

    /**
     * Moves the chip group to the right when the right arrow is clicked or hovered.
     * @param {object} event 
     */
    moveRight: function (event) {
        var left, right, total,
            tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(),
            width = div.getBoundingClientRect().width,
            scroll = div.scrollWidth, id;

        ar[0].style.display = 'inline-block';
        left = this.getData('left');
        right = this.getData('right');
        total = left + right;

        div.style.width = 'calc(100% - ' + total + 'px)';

        // Call Animation inside a rAF.
        id = window.requestAnimationFrame(this.right.bind(this, div, ar, right));
        this.setData('arrowRid', id);
    },

    /**
     * Moves the chip group to the right when the right arrow is clicked.
     * @param {object} event 
     */
    moveRightOnClick: function (event) {
        var left, right, total,
            tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(), id,
            item = div.getElementsByTagName('lyte-chip')[0],
            leftMargin = parseInt(getComputedStyle(item).marginLeft),
            rightMargin = parseInt(getComputedStyle(item).marginRight),
            step = this.getData('ltPropScrollIncrement');
        ar[0].style.display = 'inline-block';
        left = this.getData('leftW');
        right = this.getData('rightW');
        total = left + right + leftMargin + rightMargin;

        div.style.width = 'calc(100% - ' + total + 'px)';

        // Reset the right iteration counter
        this.setData('rightIterationCounter', 0);

        // Call Animation inside a rAF.
        window.requestAnimationFrame(this.rightOnClick.bind(this, step));
    },

    /**
     * Moves the chip group to the left when the left arrow is clicked or hovered.
     */
    moveLeft: function () {
        var left, right, total,
            tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(), id,
            width = div.getBoundingClientRect().width,
            scroll = div.scrollWidth;

        ar[1].style.display = 'inline-block';
        left = this.getData('left');
        right = this.getData('right');
        total = left + right;

        div.style.width = 'calc(100% - ' + total + 'px)';

        // Call Animation inside a rAF
        id = window.requestAnimationFrame(this.left.bind(this, div, ar, left));
        this.setData('arrowLid', id);
    },

    /**
     * Moves the chip group to the left when the left arrow is clicked.
     */
    moveLeftOnClick: function () {
        var left, right, total,
            tag = this.$node,
            div = tag.querySelector('.lyteChipScrollWrapper'),
            ar = this.getArrows(),
            step = this.getData('ltPropScrollIncrement');
        ar[1].style.display = 'inline-block';
        left = this.getData('left');
        right = this.getData('right');

        total = left + right;

        div.style.width = 'calc(100% - ' + total + 'px)';
        // Reset the iteration counter
        this.setData('iterationCounter', 0);

        // Call Animation inside a rAF
        window.requestAnimationFrame(this.leftOnClick.bind(this, step));
    },

    /**
     * This will add selected attribute to the chips that are already selected when the component is connected.
     */
    onChipSelected: function () {
        var selectedChips = this.getData('ltPropSelected') || [];
        for (var i = 0; i < selectedChips.length; i++) {
            var chipValue = selectedChips[i];
            var chipElement = this.$node.querySelector('lyte-chip[data-value="' + chipValue + '"]');
            if (chipElement) {
                chipElement.setAttribute('selected', true);
            }
        }
    }.on('didConnect')

});


if (!_lyteUiUtils.registeredCustomElements['lyte-chip']) {
    _lyteUiUtils.registeredCustomElements['lyte-chip'] = true;

    /**
     * @A component that represents a single chip in a chip group. 
     * It can be selected or unselected by clicking on it.
     */
    Lyte.createCustomElement('lyte-chip', {
        connectedCallback: function () {
            var parent = this, component, align, div = this;

            while (
                parent
                && parent.tagName != 'LYTE-CHIP-GROUP'
                && parent.tagName != 'HTML'
            ) {
                parent = parent.parentNode;
            }

            if (!parent) {
                return;
            }

            if (parent.tagName == 'HTML' || parent.nodeType === 9) {
                return;
            }
            component = parent.component;
            this.setAttribute('selected', false);
            if (!this._eventRegistered) {
                this._eventRegistered = true;
                this.addEventListener('click', function (event) {
                    var isSelected = this.getAttribute('selected');
                    if (isSelected === 'true') {
                        this.setAttribute('selected', false);
                        var dv = this.getAttribute('data-value');
                        if (dv) {
                            var selected = component.getData('ltPropSelected') || [];
                            selected = selected.filter(function (item) {
                                return item !== dv;
                            });
                            component.setData('ltPropSelected', selected);
                            if (component.getMethods('onItemUnselected')) {
                                component.executeMethod('onItemUnselected', this, component);
                            }
                        }
                    } else {
                        this.setAttribute('selected', true);
                        var dv = this.getAttribute('data-value');
                        if (dv) {
                            var selected = component.getData('ltPropSelected') || [];
                            selected.push(dv);
                            component.setData('ltPropSelected', selected);
                            if (component.getMethods('onItemSelected')) {
                                component.executeMethod('onItemSelected', this, component);
                            }
                        }
                    }
                })
            }
        }
    });
}

var _lyteUiChipGroup = {
    chipgroupResize: function () {
        var chipGroups = _lyteUiUtils.querySelectorAll('lyte-chip-group'),
            length = chipGroups.length, i, chipGroup, comp;

        for (i = 0; i < length; i++) {
            chipGroup = chipGroups[i];
            comp = chipGroup.component;

            if (comp && comp.resizeDiv) {
                comp.resizeDiv();
            }
        }
    }
}
/**
 * This event listener is used to resize the chip group container when the window is resized.
 */
window.addEventListener('resize', function (event) {
    _lyteUiChipGroup.chipgroupResize();
})