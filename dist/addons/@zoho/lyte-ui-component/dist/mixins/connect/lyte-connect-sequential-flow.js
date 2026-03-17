; Lyte.Mixin.register('lyte-connect-sequential-flow', {
    sequentialDidConnect: function () {
        if (this.data.ltPropSequentialFlow) {
            var $node = this.$node;
            $node.insertSequentialItem = this.insertSequentialItem.bind(this);
            $node.deleteSequentialItem = this.deleteSequentialItem.bind(this);
            $node.sequentialItemAction = this.sequentialItemAction.bind(this);
            $node.sequentialDraggable = this.sequentialDraggable.bind(this);
            $node.sequentialRefreshDraggable = function () {
                $L('.draggable-element', $node).draggable("destroy");
                window.requestAnimationFrame(function () {
                    this.addDraggable();
                }.bind(this));
            }.bind(this);
            $node.sequentialToggle = this.sq_toggle.bind(this);
            var ret = this.setSequentialConnections(this.__wrapper);
            requestAnimationFrame(function () {
                this.sq_toggle(ret, true);
            }.bind(this));
            this.addDraggable();
        }
    }.observes('ltPropSequentialFlow').on('didConnect'),

    getChildrenGroup: function (item) {
        var isContainer = $L(item.closest('lyte-connect-item')).hasClass('lyteSequentialContainerType');
        return item.children[isContainer ? 0 : 1];
    },

    getSequentialObj: function (item) {
        var isItem = item.tagName == 'LYTE-CONNECT-ITEM',
            itemData = item.closest('lyte-connect-item').ltProp('data');
        return (isItem ? itemData : itemData.branches[parseInt(item.getAttribute('data-index'))]);
    },

    calculate_padding: function (elem, ns, is_hori) {
        var __style = window.getComputedStyle(elem);

        if (__style.boxSizing == "border-box") {
            return 0;
        }

        ns = ns || "padding";

        if (is_hori) {
            return parseFloat(__style[ns + "Left"]) + parseFloat(__style[ns + "Right"]);
        } else {
            return parseFloat(__style[ns + "Top"]) + parseFloat(__style[ns + "Bottom"]);
        }
    },

    getValidCollapseItem: function (node) {
        var original_node;
        if ($L(node).hasClass('lyteSequentialCustomType')) {
            original_node = $L(node).children('.lyteSequentialCustomYield')[0];
        } else {
            Array.from(node.children).forEach(function (item) {
                var tag = item.tagName;
                if (/lyte\-sequential\-group\-wrapper|lyte\-sequential\-wrapper/i.test(tag)) {
                    original_node = item;
                }
            });
        }
        return original_node;
    },

    getFollupNodes: function (__node) {
        var item = __node,
            ret = [],
            __child = item.closest('.parentNode'),
            query = 'lyte-connect-item';

        ret.__original_top_node = __child;

        while (true) {
            var next = __child.nextElementSibling;
            if (next && next.tagName.toLowerCase() == query) {
                ret.push(next);
                __child = next;
            } else {
                break;
            }
        }
        return ret;
    },

    sq_toggle: function (node, avoidAnime, avoidMovement) {

        if (Array.isArray(node) && node.length) {
            node.forEach(function (item) {
                this.sq_toggle(item, avoidAnime, avoidMovement);
            }.bind(this));
            return;
        }

        if (!(node instanceof HTMLElement)) {
            return;
        }

        var original_node = this.getValidCollapseItem(node),
            cls_name = "lyteSequentialToggle",
            anime_class = "lyteSequentialToggleAnime",
            conn_anime_class = "lyteSequentialCloseAnime",
            con_sq_anime = 'lyteSequentialConnectionAnime',
            shape_def_prop = "lyteSequentialToggleAnimeProps",
            followup_anime = "lyteFollowupAnime",
            __this = this,
            connector_hidden_cls = 'lyteConnectHiddenElem',
            collapse_visible_cls = 'lyteSequentialCollapseVisible',
            __details = this.data.details;

        if (original_node) {

            var connections = this.$node.getConnections(original_node, true),
                $original = $L(original_node),
                scale = __this.data.ltPropScale,
                next_elem_hgt = (function () {

                    if (node.tagName.toLowerCase() != 'lyte-sequential-group') {
                        return 0;
                    }

                    var siblings = Array.from(node.closest('lyte-sequential-group-wrapper').children),
                        max = 0,
                        prevMargin = 0;

                    siblings.forEach(function (item) {
                        var curItem = $L(item.children[0]).children('lyte-sequential-wrapper')[0],
                            itemMargin = parseFloat(window.getComputedStyle(item).marginTop);
                        if (curItem == original_node) {
                            prevMargin = itemMargin;//only handled for catch case
                            return;
                        }
                        var __style = curItem ? window.getComputedStyle(curItem) : void 0,
                            hgt = (curItem.getBoundingClientRect().height / scale) + parseFloat(__style.marginTop) + parseFloat(__style.marginBottom) + (itemMargin - prevMargin);

                        max = Math.max(hgt, max);
                    });

                    return max;
                })(),
                __raf,
                parentNode = node.closest('.parentNode'),
                followup = avoidMovement ? [] : this.getFollupNodes(node),
                original_top_node = avoidMovement ? parentNode : followup.__original_top_node,
                original_top_node_id = original_top_node.id.replace(this.data.ltPropIdPrefix, ""),
                autoConnRefresh = function () {
                    __this.update_ignore(true);
                    refresh_fn()
                },
                refreshNrmFn = function (ignore) {
                    !ignore && refresh_fn();
                    // __this.update_position(node);
                    followup.forEach(function (item) {
                        __this.update_position(item, void 0, void 0, !ignore);
                    });
                    __this.updateCondTxtBoxPos(original_node);
                    __this.updateCondTxtBoxPos(original_node, true);

                    original_top_node && __this.update_position(original_top_node, void 0, void 0, !ignore);

                    if (ignore) {
                        __this.set_detail(__details, original_top_node_id, __details[original_top_node_id], original_top_node)
                    }
                },
                refresh_fn = function (ignore) {
                    __raf = window.requestAnimationFrame(function () {
                        refreshNrmFn(ignore);
                    });
                },
                update_followup_position = function (diff) {
                    followup.forEach(function (item) {
                        var $item = $L(item),
                            __data = item.component.data.ltPropData,
                            old_pos = __data.position;
                        $item.removeClass(followup_anime).css('transform', '');

                        Lyte.objectUtils(__data, 'add', 'position', {
                            left: old_pos.left,
                            top: old_pos.top + diff
                        });
                    });
                },
                hide_direct_connections = function ($item) {
                    var $parent = $item.parent();
                    if ($parent.hasClass('lyteSequentialLastConnection')) {
                        $L($parent.addClass(connector_hidden_cls).data('clone')).addClass(connector_hidden_cls);
                    }
                },
                collapse_node = original_node.nextElementSibling,
                $collapse,
                collapse_connectors = { src: [], target: [] },
                show_connector = function ($parent) {
                    var __src = $parent.data('src').get(0),
                        __target = $parent.data('target').get(0);

                    if (__src.closest('.' + cls_name) || __target.closest('.' + cls_name)) {
                        return false;
                    }
                    return true;
                },
                modify_textbox = function (node, to_hide) {
                    if (!node) {
                        return;
                    }

                    var cls = conn_anime_class,
                        __index = parseInt(node.getAttribute('index')),
                        __data = __this.data.textBoxArray[__index],
                        exst_cls = __data.class || "";

                    exst_cls = exst_cls.replace(cls, "").trim().replace(/\s+/g, " ");

                    if (to_hide) {
                        exst_cls += (" " + cls);
                    }

                    Lyte.objectUtils(__data, 'add', 'class', exst_cls);
                },
                collapseNodeTranslate = function () {
                    if (collapse_node && !mainNodeCollapsed) {
                        var children = collapse_node.parentElement.children,
                            topDiff = (children[1].getBoundingClientRect().top / scale - parseFloat(window.getComputedStyle(children[1]).marginTop)) - (collapse_node.getBoundingClientRect().top / scale - parseFloat(window.getComputedStyle(collapse_node).marginTop));
                        if (topDiff > 0) {
                            collapse_node.style.transform = "translateY(" + topDiff + "px)";
                        }
                    }
                },
                alterCollapsedData = function (add) {
                    var orgParent = original_node.parentNode,
                        groupData = __this.getSequentialObj(orgParent);
                    $L(orgParent)[add ? 'addClass' : 'removeClass']('lyteSequentialCollapsed');
                    Lyte.objectUtils(groupData, add ? 'add' : 'delete', 'collapsed', true);
                },
                mainNodeCollapsed = original_node.tagName != 'LYTE-SEQUENTIAL-WRAPPER';

            connections = connections.src.concat(connections.target).map(function (item) {
                return item.connection_elem.children[0];
            })

            if ($original.data("sequential_transition")) {
                return;
            }

            if (!collapse_node || !/lyte\-sequential\-collapsible\-item/i.test(collapse_node.tagName)) {
                $collapse = $L();
                collapse_node = void 0;
            } else {
                $collapse = $L(collapse_node);
                collapse_connectors = __this.$node.getConnections(collapse_node, true);
            }

            $original.data("sequential_transition", true);
            this.__seq_trans_happening = true;

            if ($original.hasClass(cls_name)) {

                var fn = function () {
                    var margin = __this.calculate_padding(original_node, 'margin'),
                        newOriginalHeight = original_node.getBoundingClientRect().height / scale,
                        min_hgt = parseFloat(node.style.minHeight || 0);

                    $L(node).css({
                        width: "",
                        minHeight: ""
                    });

                    original_node.style.width = "";
                    collapse_node && (collapse_node.style.width = "");
                    parentNode.style.transitionDuration = "";
                    parentNode.style.transitionDelay = "";

                    $L(parentNode).removeClass(anime_class);

                    $original.removeClass(anime_class).off('transitionend', fn).css({
                        height: ""
                    }).data("sequential_transition", false);
                    delete __this.__seq_trans_happening;
                    window.cancelAnimationFrame(__raf);
                    Lyte.objectUtils(parentNode.component.data.ltPropData, 'add', 'position', {
                        left: parseFloat(parentNode.style.left),
                        top: parseFloat(parentNode.style.top)
                    });
                    requestAnimationFrame(function () {
                        __this.__cb = function () {
                            connections.forEach(function (item) {
                                var $parent = $L(item).removeClass(conn_anime_class).css('opacity', "").parent();
                                if (show_connector($parent)) {
                                    modify_textbox($parent.removeClass(connector_hidden_cls).data('text_box'));
                                    $L($parent.data('clone')).removeClass(connector_hidden_cls, conn_anime_class);
                                    $L(__this.$node).connection('updateConnection', $parent);
                                }
                            });
                            __this.update_position(node);
                        }
                        __this.update_ignore(false);
                        __this._boundary(true);
                    });
                    refresh_fn(true);

                    update_followup_position(Math.max(0, newOriginalHeight + margin - Math.max(next_elem_hgt, min_hgt)));

                    collapse_node && (collapse_node.style.transform = "");
                    $collapse.removeClass(collapse_visible_cls, con_sq_anime, conn_anime_class);
                    alterCollapsedData();
                    __this.getMethods('onAfterSequentialExpanded') && __this.executeMethod('onAfterSequentialExpanded', $original, $collapse, $L(node), this.$node);
                },
                oldParentWidth = parentNode.getBoundingClientRect().width;
                $original.removeClass(cls_name);
                connections.forEach(function (item) {
                    $L(item).addClass(conn_anime_class);
                });

                followup.forEach(function (item) {
                    item.style.transform = "translateY(0)";
                });

                $collapse.addClass(con_sq_anime);
                collapseNodeTranslate();

                window.requestAnimationFrame(function () {//start
                    var originalBcr = original_node.getBoundingClientRect(),
                        newOriginalHeight = originalBcr.height / scale,
                        newOriginalExtraY = __this.calculate_padding(original_node) + __this.calculate_padding(original_node, 'border'),
                        newOriginalMarginY = __this.calculate_padding(original_node, 'margin'),
                        newOriginalExtraX = __this.calculate_padding(original_node, 'padding', true) + __this.calculate_padding(original_node, 'border', true),
                        newOriginalWidth = originalBcr.width / scale - newOriginalExtraX,
                        collapseBcr = collapse_node ? collapse_node.getBoundingClientRect() : void 0,
                        minWidth = collapseBcr ? (collapseBcr.width / scale) + __this.calculate_padding(collapse_node, 'margin', true) : 0,
                        newParentWidth = (parentNode.getBoundingClientRect().width - oldParentWidth) / scale,
                        defOriginalWidth = minWidth - newOriginalExtraX - __this.calculate_padding(original_node, 'margin', true);

                    $original.addClass(shape_def_prop);

                    connections.forEach(function (item) {
                        var $item = $L(item),
                            $parent = $item.parent();

                        if (show_connector($parent)) {
                            modify_textbox($parent.removeClass(connector_hidden_cls).data('text_box'), true);
                            $L($parent.data('clone')).removeClass(connector_hidden_cls);
                            hide_direct_connections($item/*.addClass(con_sq_anime)*/);
                        }
                    });

                    avoidAnime || followup.forEach(function (item) {
                        $L(item).addClass(followup_anime);
                    });

                    var min_hgt = collapseBcr ? collapseBcr.height / scale + __this.calculate_padding(collapse_node, 'margin') : 0;
                    $L(node).css('minHeight', min_hgt);
                    if(!avoidAnime){
                        $L(parentNode).addClass(anime_class);

                        var childDuration = parseFloat(getComputedStyle(parentNode).transitionDuration),
                            transDur = (newParentWidth * childDuration) / (newOriginalWidth - defOriginalWidth);
                        
                        parentNode.style.transitionDuration = transDur + "s";
                        parentNode.style.transitionDelay = (childDuration - transDur) + "s";
                    }
                    original_node.style.width = defOriginalWidth + "px";

                    window.requestAnimationFrame(function () {
                        $original.addClass(avoidAnime ? '' : anime_class).removeClass(shape_def_prop).css({
                            height: newOriginalHeight - newOriginalExtraY,
                            width: newOriginalWidth
                        }).on('transitionend', fn);
                        // mainNodeCollapsed || connections.forEach(function (item) {
                        //     $L(item).css("opacity", 1);
                        // });

                        followup.forEach(function (item) {
                            item.style.transform = "translateY(" + Math.max(0, newOriginalHeight + newOriginalMarginY - Math.max(next_elem_hgt, min_hgt)) + 'px)';
                        });

                        parentNode.style.left = parseFloat(parentNode.style.left) - newParentWidth / 2 + "px";

                        $collapse.addClass(conn_anime_class);

                        collapse_connectors.src.concat(collapse_connectors.target).forEach(function (item) {
                            $L($L(item.connection_elem).addClass(connector_hidden_cls).data('clone')).addClass(connector_hidden_cls);
                        });

                        autoConnRefresh();
                        avoidAnime && window.requestAnimationFrame(function () {
                            fn();
                        });
                    });
                });
            } else {
                var fn = function () {
                        var min_hgt = parseFloat(node.style.minHeight || 0);
                        $L(node).css('minHeight', "");
                        parentNode.style.transitionDuration = "";
                        $L(parentNode).removeClass(anime_class);/*.addClass('lyteSequentialCollapsed');*/
                        $original.removeClass(anime_class, shape_def_prop).addClass(cls_name).off('transitionend', fn).data("sequential_transition", false);
                        alterCollapsedData(true);
                        delete __this.__seq_trans_happening;
                        window.cancelAnimationFrame(__raf);
                        // collapse_node && (collapse_node.style.width = (parseFloat(original_node.style.width) + __this.calculate_padding(original_node, 'padding', true) + __this.calculate_padding(original_node, 'border', true) + __this.calculate_padding(original_node, 'margin', true)) - (__this.calculate_padding(collapse_node, 'border', true) + __this.calculate_padding(collapse_node, 'margin', true) + __this.calculate_padding(collapse_node, 'padding', true)) + 'px');
                        original_node.style.width = "";
                        collapse_connectors.src.concat(collapse_connectors.target).forEach(function (item) {
                            $L($L(item.connection_elem).removeClass(connector_hidden_cls).data('clone')).removeClass(connector_hidden_cls);
                        });

                        avoidMovement || Lyte.objectUtils(parentNode.component.data.ltPropData, 'add', 'position', {
                            left: parseFloat(parentNode.style.left),
                            top: parseFloat(parentNode.style.top)
                        });
                        __this.update_ignore(false);
                        __this._boundary(true);
                        window.requestAnimationFrame(function () {//to avoid clear of __raf in next loop, for preiew
                            refreshNrmFn(true);
                            __this.update_position(node);
                        });

                        connections.forEach(function (item) {
                            $L($L(item).removeClass(conn_anime_class, con_sq_anime).parent().addClass(connector_hidden_cls).data('clone')).addClass(connector_hidden_cls);
                        });

                        update_followup_position(Math.min(0, -oldOriginalHeight + Math.max(min_hgt, next_elem_hgt)));

                        collapse_node && (collapse_node.style.transform = "");
                        $collapse.removeClass(con_sq_anime);
                        __this.getMethods('onAfterSequentialCollapsed') && __this.executeMethod('onAfterSequentialCollapsed', $original, $collapse, $L(node), this.$node);
                    },
                    level1 = function () {
                        avoidAnime || $original.addClass(anime_class).on('transitionend', fn);
                        connections.forEach(function (item) {
                            hide_direct_connections($L(item).addClass(avoidAnime ? '' : con_sq_anime));
                            $L($L(item).parent().data('clone')).addClass(conn_anime_class);
                        });

                        avoidAnime || followup.forEach(function (item) {
                            $L(item).addClass(followup_anime);
                        });

                        $collapse.addClass(collapse_visible_cls, con_sq_anime);
                        collapseNodeTranslate();
                    },
                    level2 = function () {
                        var newOrgNodeWidth = min_width + originalExtraX + originalMarginX,
                            orgNodeChangeX = (oldOriginalWidth + originalMarginX) - newOrgNodeWidth;

                        $original.css({
                            height: "",
                            transform: "",
                            width: oldOriginalWidth - originalExtraX + "px"
                        }).addClass(shape_def_prop);

                        $L(node).css({
                            'minHeight': min_hgt + "px"
                        });

                        avoidAnime || $L(parentNode).addClass(anime_class);
                        avoidAnime || (orgNodeChangeX && parentChangeWidth) && (parentNode.style.transitionDuration = ((parentChangeWidth * parseFloat(window.getComputedStyle(parentNode).transitionDuration)) / orgNodeChangeX) + "s");

                        original_node.offsetWidth;
                        original_node.style.width = min_width + "px";

                        collapse_node && (collapse_node.style.width = newOrgNodeWidth - __this.calculate_padding(collapse_node, 'margin', true) - __this.calculate_padding(collapse_node, 'padding', true) - __this.calculate_padding(collapse_node, 'border', true) + 'px');

                        connections.forEach(function (item) {
                            modify_textbox($L(item).addClass(conn_anime_class).parent().data('text_box'), true);
                        });

                        avoidMovement || (parentNode.style.left = parseFloat(parentNode.style.left) + (parentChangeWidth / 2) + "px");

                        followup.forEach(function (item) {
                            item.style.transform = "translateY(-" + Math.max(0, oldOriginalHeight - Math.max(next_elem_hgt, min_hgt)) + 'px)';
                        });

                        autoConnRefresh();
                        $collapse.removeClass(conn_anime_class);
                        avoidAnime && fn();
                    },
                    oldOriginalBcr = original_node.getBoundingClientRect(),
                    originalExtraX = __this.calculate_padding(original_node, 'padding', true) + __this.calculate_padding(original_node, 'border', true),
                    originalMarginX = __this.calculate_padding(original_node, 'margin', true),
                    oldOriginalWidth = (oldOriginalBcr.width / scale),
                    originalMarginY = __this.calculate_padding(original_node, 'margin'),
                    oldOriginalHeight = oldOriginalBcr.height / scale + originalMarginY,
                    oldParentWidth = parentNode.getBoundingClientRect().width / scale;

                original_node.style.display = 'none';
                $collapse.addClass(collapse_visible_cls);
                //collapse node
                var collapseBcr = collapse_node ? collapse_node.getBoundingClientRect() : void 0,
                    min_hgt = collapseBcr ? collapseBcr.height / scale + __this.calculate_padding(collapse_node, 'margin') : 0,
                    collapsibleMinWidth = __this.data.ltPropSequentialAtrributes.collapsibleMinWidth || 0,
                    collapseSize = collapseBcr ? (collapseBcr.width / scale) + __this.calculate_padding(collapse_node, 'margin', true) : 0,
                    condition = $L(node).children('lyte-sequential-icon, lyte-sequential-condition')[0],
                    conditionWidth = condition ? (condition.getBoundingClientRect().width / scale) + __this.calculate_padding(condition, 'margin', true) : 0,
                    min_width = Math.ceil(collapse_node ? Math.min(Math.max(collapseSize, conditionWidth, collapsibleMinWidth) - originalMarginX, oldOriginalWidth) - originalExtraX : 0),
                    parentChangeWidth;
                    
                original_node.style.display = '';
                $collapse.removeClass(collapse_visible_cls);
                $original.css({//setting it's original height and width
                    height: (oldOriginalHeight - __this.calculate_padding(original_node) - __this.calculate_padding(original_node, 'border') - originalMarginY) + "px",
                    width: (oldOriginalWidth - originalExtraX) + "px"
                });

                original_node.style.width = min_width + "px";
                parentChangeWidth = oldParentWidth - parentNode.getBoundingClientRect().width / scale;
                original_node.style.width = '';

                followup.forEach(function (item) {
                    item.style.transform = "translateY(0)";
                });

                $collapse.addClass(conn_anime_class);

                if (avoidAnime) {
                    level1();
                    level2();
                } else {
                    window.requestAnimationFrame(function () {
                        level1();
                        window.requestAnimationFrame(function () {
                            level2();
                        });
                    });
                }
            }
        }
    },

    getElem: function (id) {
        return $L(typeof id == "string" ? '#' + id.replace('#', '') : id, this.$node);
    },

    getRandId: function () {
        return 'lyteSequential' + Date.now() + parseInt(Math.random() * 100000000);
    },

    getGroupChild: function (elem) {
        var wrapper = $L(elem).children('lyte-sequential-group-wrapper'),
            container = $L(wrapper).children('lyte-sequential-group-container'),
            ret = [];

        if (container.length) {
            ret = container.children('lyte-sequential-group');
        } else {
            ret = wrapper.children('lyte-sequential-group');
        }
        return ret;
    },

    getSequentialData: function (elemGroup, elem, groupType) {
        if (elemGroup.length) {
            var closeItem = elemGroup.closest('lyte-connect-item'),
                parData = closeItem[0].getData('ltPropData'),
                validConnectItem = elem.tagName == 'LYTE-CONNECT-ITEM',
                isCond = elem.tagName == 'LYTE-SEQUENTIAL-CONDITION',
                nodeInd = validConnectItem ? parseInt(elem.getAttribute('data-index')) : isCond ? -1 : undefined,
                groupInd = elem.tagName == 'LYTE-SEQUENTIAL-ICON' ? -1 : parseInt(elemGroup[0].getAttribute('data-index')),
                isContainer = closeItem.hasClass('lyteSequentialContainerType');

            return { data: ((groupType || isContainer) ? parData : parData.branches[groupInd])[groupType ? 'branches' : 'children'], ind: groupType ? groupInd : nodeInd };
        }
    },

    getSequentialElemIndPath: function (elem, order) {
        var tagName = elem && elem.tagName;
        if (!tagName || (tagName != 'LYTE-CONNECT-ITEM' && tagName != 'LYTE-SEQUENTIAL-GROUP')) {
            return;
        }
        if (tagName == "LYTE-SEQUENTIAL-GROUP") {
            order.unshift(parseInt(elem.getAttribute('data-index')));
            elem = elem.closest('lyte-connect-item');
        }
        order.unshift(parseInt(elem.getAttribute('data-index')));
        this.getSequentialElemIndPath(elem.closest('lyte-sequential-group'), order);
    },

    getSequentialElemConn: function (order, getFromParent) {

        order = $L.extend([], order);

        var data = this.__wrapper,
            orderLen = order.length,
            retInd;

        if (orderLen) {
            if (orderLen == 1 && getFromParent) {
                data = this.$node;
                retInd = { ind: order.pop() };
            } else {
                data = data.children[order.shift()];
                if (getFromParent) {
                    retInd = { ind: order.pop(), groupInd: order.pop() };
                    if (retInd.groupInd == undefined) {
                        retInd.groupInd = retInd.ind;
                        delete retInd.ind;
                    }
                }
            }
            orderLen = order.length;

            for (var ind = 0; ind < orderLen; ind++) {
                var pos = order[ind],
                    getGroup = data.tagName == 'LYTE-CONNECT-ITEM';

                if (getGroup) {
                    data = this.getGroupChild(data)[pos];
                } else {
                    data = this.getChildrenGroup(data).children[pos];
                }

                if (getFromParent && getGroup && ind == orderLen - 1) {
                    order.push(retInd.groupInd);
                    orderLen++;
                    retInd.groupInd = retInd.ind;
                    delete retInd.ind;
                }
            }

            return { data: data, position: retInd };
        }
    },

    updateCondTxtBoxPos: function (elem, forLoop) {// this is for the condition text box position and forloop dummy connection
        if (!elem) {
            return;
        }

        var $elem = $L(elem).closest(forLoop ? '.lyteSequentialLoopType' : '.lyteSequentialBranchingType'),
            $node = $L(this.$node);

        if($elem[0] && !$elem[0].closest('.lyteSequentialCollapsed')){
            if (forLoop) {
                if ($elem.hasClass('lyteSequentialLoopType')) {
                    var loopContainer = this.getGroupChild($elem)[0].children[1],
                        ind = loopContainer.children.length - 1,
                        dummyLastElem = loopContainer.children[ind];
    
                    if (dummyLastElem) {
                        $node.connection('getConnections', dummyLastElem).src.every(function (conn) {
                            var connData = conn.data();
                            if (connData.target.get(0).tagName == 'LYTE-SEQUENTIAL-CONDITION') {
                                var dummyChildPar = dummyLastElem.parentElement,
                                    dummyChildParStyle = window.getComputedStyle(dummyChildPar),
                                    dummyChildParExtra = parseInt(dummyChildParStyle.paddingLeft) + parseInt(dummyChildParStyle.marginLeft);
    
                                connData.options.modifiers = [-(dummyLastElem.offsetLeft - dummyChildParExtra + (dummyLastElem.offsetParent.offsetLeft + dummyChildParExtra) / 2)];
                                $node.connection('updateConnection', conn);
                            } else {
                                return true;
                            }
                        })
                    }
                }
            } else {
                if ($elem.hasClass('lyteSequentialBranchingType')) {
                    Array.from(this.getGroupChild($elem)).forEach(function (item) {
                        var condition = item.children[0];
                        $node.connection('getConnections', condition).src.forEach(function (conn) {
                            var connData = conn.data();
                            if (connData.target.get(0).tagName == 'LYTE-SEQUENTIAL-CONDITION') {
                                var textElem = connData.options.textBox;
    
                                textElem.modifiers = [condition.parentElement.offsetWidth - 1 - (condition.offsetLeft + condition.offsetWidth)];
                                $node.connection('updateConnection', conn);
                            }
                        });
                    });
                }
            }
        }

        if ($elem.hasClass('.parentNode')) {
            return;
        }
        $elem[0] && this.updateCondTxtBoxPos($elem[0].parentNode.closest(forLoop ? '.lyteSequentialLoopType' : '.lyteSequentialBranchingType'), forLoop);
    },

    updateDetails: function (id) {
        if (this.updateDetailsId && this.updateDetailsId == id) {
            return;
        }
        this.updateDetailsId = id;
        setTimeout(() => {
            var details = this.data.details;
            if (details[id]) {
                this.set_detail(details, id, details[id]);
            }
            delete this.updateDetailsId;
        }, 1000);
    },

    makeCollapseConnections: function (collapseData, addClass) {
        var $node = this.$node;
        collapseData.forEach(function (item) {
            if (item.collapseSrc && item.collapseTrg && item.collapseFinalTrg) {
                $node.connect(item.collapseSrc, item.collapseTrg, {
                    src_position: {
                        x: 0.5, y: 1
                    },
                    target_position: {
                        x: 0.5, y: 0
                    },
                    textBox: false,
                    class: 'lyteSequentialCollapsibleConnection lyteConnectHiddenElem' + (' ' + addClass || '')
                })
                $node.connect(item.collapseTrg, item.collapseFinalTrg, {
                    src_position: {
                        x: 0.5, y: 1
                    },
                    target_position: {
                        x: 0.5, y: 1
                    },
                    angle: { end: 270 },
                    textBox: false,
                    class: 'lyteSequentialCollapsibleConnection lyteConnectHiddenElem lyteSequentialBeforeLastConnection' + (' ' + addClass || '')
                })
            }
        });

    },

    alterConditionIcons: function (elem, prevElem, connClass) {
        if (prevElem) {
            var prevGroupData = this.getSequentialObj(prevElem);
            var cond = $L(prevElem).children('lyte-sequential-condition'),
                icon = cond.children('lyte-condition-icon');

            if (icon.length) {
                this.$node.disConnect($L(this.getConnections(icon).target[0].connection_elem));
            }
            Lyte.objectUtils(prevGroupData, 'delete', 'addBranchIcon');
        }
        if (elem) {
            var curGroupData = this.getSequentialObj(elem);
            if (!curGroupData.last) {
                Lyte.objectUtils(curGroupData, 'add', 'addBranchIcon', true);
                var cond = $L(elem).children('lyte-sequential-condition'),
                    icon = cond.children('lyte-condition-icon');

                if (icon.length) {
                    this.$node.connect(cond, icon, {
                        src_position: {
                            x: 1, y: 0.5
                        },
                        target_position: {
                            x: 0, y: 0.5
                        },
                        textBox: false,
                        class: 'lyteConditionIconConnection' + (connClass ? ' ' + connClass : '')
                    });
                }
            }
        }
    },

    setSequentialConnections: function (container, childInd, addClass, avoidText) {//other than foreach dummynode, all elem has only one inc and more out connection

        container = this.getElem(container)[0];

        var $cotainer = $L(container),
            loopType = $cotainer.hasClass('lyteSequentialLoopType'),
            containerType = $cotainer.hasClass('lyteSequentialContainerType'),
            branchType = $cotainer.hasClass('lyteSequentialBranchingType'),
            intraRender = loopType || branchType || $cotainer.hasClass('lyteSequentialTryCatchType') || containerType,
            wrapper = $cotainer.hasClass('lyteConnectWrapper'),
            seqAttr = this.data.ltPropSequentialAtrributes,
            getValidChild = function (child, start) {//start is fot end conn
                var itemType = child.tagName == 'LYTE-CONNECT-ITEM',
                    others = child.tagName == 'LYTE-SEQUENTIAL-ICON' || child.tagName == 'LYTE-SEQUENTIAL-CONDITION';
                if (itemType || others) {
                    var retChild = (start || $L(child).hasClass('lyteSequentialBlockType') || others) ? child : $L(child).children('lyte-sequential-icon')[0];
                    return retChild;
                }
            },
            needToCollapse = [];

        if (intraRender || wrapper) {
            var children = Array.from($L(container).children(wrapper ? 'lyte-connect-item' : 'lyte-sequential-icon')),
                childLen = children.length,
                dummyLast = {},
                lastElemInd, expanded;

            if (!wrapper) {
                children = children.concat(Array.from(this.getGroupChild(container)));
                childLen = children.length;
            }

            for (var i = childInd || 0; i < childLen; i++) {
                var nextInd = i + 1,
                    groupLast = lastElemInd && i == lastElemInd,
                    curGroup = children[nextInd],
                    curChild;

                if (!expanded && curGroup && curGroup.tagName == 'LYTE-SEQUENTIAL-GROUP') {//always first will be icon so second is renderend
                    var extraChild = Array.from(curGroup.children[containerType ? 0 : 1].children),
                        nextGroup = children[nextInd + 1],
                        curHead = curGroup.children[0],
                        nextHead = nextGroup && nextGroup.children[0];

                    if (loopType) {
                        dummyLast = { child: extraChild.pop(), head: curHead };
                    }

                    if (!extraChild.length) {//placeholder (addHere) is added
                        var parData = container.getData('ltPropData');
                        Lyte.arrayUtils((containerType ? parData : parData.branches[parseInt(curGroup.getAttribute('data-index'))]).children, 'push', { nodeType: 'block', placeholder: true, class: 'lyteSequentialPlaceholderType' });
                        extraChild = Array.from(this.getChildrenGroup(curGroup).children);//due to again recalculation, the dummyLast is removed, below
                        loopType && extraChild.pop();
                        this.sequentialPlaceholderAdded != undefined && (this.sequentialPlaceholderAdded = true);
                    }

                    containerType ? children.splice(nextInd, 1, ...extraChild) : children.splice(nextInd, 1, curHead, ...extraChild);
                    lastElemInd = (containerType ? i : nextInd) + extraChild.length;
                    childLen = children.length;

                    if (nextHead) {//this is for creating connections between the headers // like between if and else, try and catch
                        var srcPos = { x: 1, y: 0.5 },
                            trgPos = { x: 0, y: 0.5 },
                            text = { class: 'lyteSequentialConditionAdd', modifiers: [curHead.parentElement.offsetWidth - 1 - (curHead.offsetLeft + curHead.offsetWidth)] };

                        if ($cotainer.hasClass('lyteSequentialTryCatchType')) {
                            curHead = $L(curHead.parentElement);
                            var errorFLowData = container.getData('ltPropData');
                            srcPos = { x: 1, y: (nextHead.getBoundingClientRect().top - curHead[0].getBoundingClientRect().top) / 2 + 'px' };
                            trgPos = { x: 0.5, y: 0 };
                            text = {
                                "text": [
                                    {
                                        "text": errorFLowData.errorFlowMessage
                                    }
                                ],
                                class: errorFLowData.errorFlowClass
                            };
                        }
                        this.$node.connect(curHead, nextHead, {
                            src_position: srcPos,
                            target_position: trgPos,
                            textBox: !avoidText && text,
                            class: 'lyteSequentialConditionalConnection' + (' ' + addClass || '')
                        });
                    } else if (branchType) {
                        this.alterConditionIcons(curGroup, undefined, addClass);
                    }

                    if (intraRender) {
                        var hasMainCollapsible = $cotainer.children('lyte-sequential-collapsible-item'),
                            collapseData = [];

                        if (children[i].tagName == 'LYTE-SEQUENTIAL-ICON' && hasMainCollapsible.length) {
                            collapseData.push({ collapseSrc: children[i], collapseTrg: hasMainCollapsible[0].children[0], collapseFinalTrg: $cotainer });
                        }
                        if (curGroup.children[2]) {
                            collapseData.push({ collapseSrc: curGroup.children[0], collapseTrg: curGroup.children[2].children[0], collapseFinalTrg: curGroup });
                        }
                        this.makeCollapseConnections(collapseData, addClass);
                    }

                    if (childInd != undefined) {
                        expanded = true;
                        continue;
                    }

                    if (!containerType && this.getValidCollapseItem(curGroup) && this.getSequentialObj(curGroup).collapsed) {
                        needToCollapse.push(curGroup);
                    }
                }

                if (groupLast) {//last elem connection
                    var src = children[i];
                    if (loopType) {//this for the dummyChild (connection returning from last to condition)
                        this.$node.connect(src, dummyLast.child, {
                            src_position: {
                                x: 0.5, y: 1
                            },
                            target_position: {
                                x: 0.5, y: 0
                            },
                            class: 'lyteSequentialDummyConnection' + (' ' + addClass || ''),
                            textBox: !avoidText && { class: 'lyteSequentialTextboxHidden' }
                        });
                        var dummyChildPar = dummyLast.child.parentElement,
                            dummyChildParStyle = window.getComputedStyle(dummyChildPar),
                            dummyChildParExtra = parseInt(dummyChildParStyle.paddingLeft) + parseInt(dummyChildParStyle.marginLeft);
                        this.$node.connect(dummyLast.child, dummyLast.head, {
                            src_position: {
                                x: 0, y: 0.5
                            },
                            target_position: {
                                x: 0, y: 0.5
                            },
                            textBox: false,
                            modifiers: [-(dummyLast.child.offsetLeft - dummyChildParExtra + (dummyLast.child.offsetParent.offsetLeft + dummyChildParExtra) / 2)],
                            class: addClass
                        });
                        src = dummyLast.child;
                    }
                    if (intraRender) {
                        var curTarget = src.closest('lyte-sequential-group');
                        this.$node.connect(src, curTarget, {
                            src_position: {
                                x: 0.5, y: 1
                            },
                            target_position: {
                                x: 0.5, y: 1
                            },
                            angle: { end: 270 },
                            textBox: (loopType || avoidText) ? false : { class: 'lyteSequentialTextboxHidden' },
                            class: 'lyteSequentialBeforeLastConnection' + (' ' + addClass || '')
                        })
                        src = curTarget;
                    }
                    this.$node.connect(src, container, {
                        src_position: {
                            x: 0.5, y: 1
                        },
                        target_position: {
                            x: 0.5, y: 1
                        },
                        angle: { end: 270 },
                        modifiers: seqAttr.lastLineModifier ? seqAttr.lastLineModifier : ["100% - 10"],
                        textBox: false,
                        class: 'lyteSequentialLastConnection' + (' ' + addClass || '')
                    });
                    curChild = children[i];
                } else {//normal child connection
                    var nxtChild = children[nextInd] && getValidChild(children[nextInd]),
                        isIcon = children[i].tagName == 'LYTE-SEQUENTIAL-ICON';

                    curChild = getValidChild(children[i], true);

                    curChild && nxtChild && this.$node.connect(curChild, nxtChild, {
                        src_position: {
                            x: 0.5, y: 1
                        },
                        target_position: {
                            x: 0.5, y: 0
                        },
                        textBox: !avoidText && (isIcon ? false : { class: 'lyteSequentialTextboxHidden' }),
                        class: addClass
                    });
                }

                if (curChild) {
                    needToCollapse = needToCollapse.concat(this.setSequentialConnections(curChild, undefined, addClass, avoidText, needToCollapse));
                    curChild.getData && curChild.getData('ltPropData').collapsed && needToCollapse.push(curChild);
                }

                if (groupLast && childInd != undefined) {
                    return needToCollapse;
                }
            }
        }
        return needToCollapse;

    },

    insertSequentialItem: function (data, location, readOnly) {//last is only for group || only else

        var connection, custData, collapseItems;

        if (location.tagName == 'LYTE-TEXTBOX') {
            connection = $L(location).data().connector;
        } else if ($L(location).hasClass('lyteConnectionContainer')) {
            connection = $L(location);
        } else if (location.src || location.trg) {
            var loc = this.getElem(location.src || location.trg),
                conn = $L(this.$node).connection('getConnections', loc);
            if (location.src && location.trg) {
                var locTrg = this.getElem(location.trg)[0];
                conn.src.every(function (conn) {
                    if (locTrg == conn.data().target.get(0)) {
                        connection = conn;
                        return;
                    }
                    return true;
                });
            } else {
                connection = location.src ? conn.src[0] : conn.target[0];
            }
            var curIndex = loc[0] && parseInt(loc[0].getAttribute('data-index'));
            if (!connection && curIndex != undefined && (curIndex == this.data.ltPropData.length - 1 || curIndex == 0)) {
                return this.insertSequentialItem(data, { parentData: this.$node, index: location.src ? curIndex + 1 : curIndex });
            }
        } else if (location.parentData) {
            var cpyData = location.parentData instanceof HTMLElement ? location.parentData.getData('ltPropData') : location.parentData,
                group = cpyData.branches,
                groupInd = 0,
                ind = location.index,
                custClass = 'lyteSequentialCustomInsert' + Date.now() + parseInt(Math.random() * 100000000),
                isGroup = ind == undefined;
            if (location.branchIndex != undefined && group) {
                var groupLen = group.length;
                groupInd = location.branchIndex;
                if (location.branchIndex >= groupLen) {
                    groupInd = isGroup ? groupLen : groupLen - 1;
                }
                if (isGroup) {
                    ind = groupInd;
                }
            }
            if (!isGroup) {
                var groupChildLen = ((group ? group[groupInd] : cpyData).children || Object.keys(cpyData)).length;
                if (ind > groupChildLen) {
                    ind = groupChildLen;
                }
            }
            data.class = data.class ? data.class + ' ' + custClass : custClass;
            cpyData = isGroup ? cpyData.branches : ((group ? cpyData.branches[groupInd] : cpyData).children || cpyData);
            custData = { parData: cpyData, ind: ind, groupInd: groupInd, groupType: isGroup, class: custClass, mainNodeIns: location.parentData.getData('ltPropData') == this.data.ltPropData };
        }

        if (!connection && !custData) {
            return;
        }

        var connData = connection && $L.extend(true, {}, connection.data()),
            src = connection && connData.src[0],
            trg = connection && connData.target[0],
            $node = this.$node,
            elemGroup = connection && (src.tagName == 'LYTE-SEQUENTIAL-ICON' ? $L(this.getGroupChild(src.parentNode)[0]) : $L(src).closest('lyte-sequential-group')),
            groupType = custData ? custData.groupType : connection && trg.tagName == 'LYTE-SEQUENTIAL-CONDITION',
            dataType = data.nodeType,
            newItemData = custData ? { data: custData.parData, ind: custData.ind - 1 } : this.getSequentialData(elemGroup, src, groupType),
            setConnection = function () {
                if (groupType) {//this is only for else if kind a thing
                    var addedGroup = this.getGroupChild(newItemPar);
                    if (last) {
                        var curHead = curItem[0].children[0];
                        this.$node.connect(corresElem, curHead, {
                            src_position: { x: 1, y: 0.5 },
                            target_position: { x: 0, y: 0.5 },
                            textBox: { class: 'lyteSequentialConditionAdd', modifiers: [corresElem.parentElement.offsetWidth - 1 - (corresElem.offsetLeft + curHead.offsetWidth)] },
                            class: 'lyteSequentialConditionalConnection lyteSequentialOpacityHide'
                        });
                    } else {
                        addedGroup = $L(addedGroup[newItemData.ind])
                        $node.updateConnectionOrigin(connection, undefined, addedGroup.children('lyte-sequential-condition'));
                    }
                    collapseItems = this.setSequentialConnections(newItemPar, newItemData.ind, 'lyteSequentialOpacityHide');
                } else {
                    collapseItems = this.setSequentialConnections(curItem, undefined, 'lyteSequentialOpacityHide');
                    if (last || first) {
                        var srcNode = last ? corresElem : curItem,
                            trgNode = last ? curItem.hasClass('lyteSequentialBlockType') ? curItem : $L(curItem).children('lyte-sequential-icon')[0] : corresElem;
                        srcNode && trgNode && this.$node.connect(srcNode, trgNode, {
                            src_position: {
                                x: 0.5, y: 1
                            },
                            target_position: {
                                x: 0.5, y: 0
                            },
                            textBox: { class: 'lyteSequentialTextboxHidden lyteSequentialOpacityHide' },
                            class: 'lyteSequentialOpacityHide'
                        })
                    } else {
                        var connTrg = dataType == 'block' ? curItem : $L(curItem).children('lyte-sequential-icon')[0];
                        if (hasPlaceHolder) {//remove placeholder elem
                            var placeholderInd = newItemData.ind ? 0 : 1,
                                placeholderConn = $L($node).connection('getConnections', itemWrapper.children[placeholderInd]),
                                incConn = placeholderConn.target[0],
                                outConn = placeholderConn.src[0];

                            $node.updateConnectionOrigin(incConn, undefined, connTrg);
                            $node.updateConnectionOrigin(outConn, curItem);
                            Lyte.arrayUtils(newItemData.data, 'removeAt', placeholderInd);
                            incConn.addClass('lyteSequentialOpacityHide');
                            outConn.addClass('lyteSequentialOpacityHide');
                        } else {
                            $node.updateConnectionOrigin(connection, curItem);
                            $node.connect(connData.src_query, connTrg, {
                                src_position: {
                                    x: 0.5, y: 1
                                },
                                target_position: {
                                    x: 0.5, y: 0
                                },
                                textBox: { class: 'lyteSequentialTextboxHidden lyteSequentialOpacityHide' },
                                class: 'lyteSequentialOpacityHide'
                            });
                            connection.addClass('lyteSequentialOpacityHide');
                        }
                    }
                }

            }.bind(this),
            findConn = function () {
                if (custData) {
                    var curItem = $L('.' + custData.class, $node).removeClass(custData.class)[0],
                        index = parseInt(curItem.getAttribute('data-index')),
                        prevGroup = groupType && this.getGroupChild($L(curItem).closest('lyte-connect-item'))[index - 1];

                    if (groupType && !prevGroup) {
                        prevGroup = $L(curItem).closest('lyte-connect-item').children('lyte-sequential-icon')[0];
                    }

                    if (prevGroup && prevGroup.tagName == 'LYTE-SEQUENTIAL-GROUP') {
                        prevGroup = prevGroup.children[0];
                    }

                    if (groupType && curItem.closest('lyte-sequential-group-wrapper').children.length - 1 <= index) {
                        last = true;
                    }

                    elemGroup = $L(curItem.closest('lyte-sequential-group'));
                    corresElem = prevGroup || ((elemGroup.length ? this.getChildrenGroup(elemGroup[0]) : this.__wrapper).children[index ? index - 1 : 1]);

                    if (!elemGroup.length) {
                        if (this.data.ltPropData.length - 1 == index) {
                            last = true;
                        } else if (index == 0) {
                            first = true;
                        }
                    }

                    if (!prevGroup && !index && corresElem.getData('ltPropData').nodeType != 'block') {//this is for the first elem of the group, wehere we check next elem
                        corresElem = $L(corresElem).children('lyte-sequential-icon')[0];
                    }

                    if (!last && !first) {
                        connection = last || $L($node).connection('getConnections', corresElem)[(index || groupType) ? 'src' : 'target'];

                        if (groupType) {
                            last || connection.every(function (conn) {
                                var connData = conn.data();
                                if (!conn.hasClass('lyteSequentialCollapsibleConnection') && (connData.active_src.tagName == 'LYTE-SEQUENTIAL-ICON' || conn.hasClass('lyteSequentialConditionalConnection'))) {
                                    connection = conn;
                                } else {
                                    return true;
                                }
                            });
                        } else {
                            connection = connection[0];
                        }
                        connData = connection.length && $L.extend(true, {}, connection.data());
                    }
                }
            }.bind(this),
            getBcr = function (node) {
                var bcr = node.getBoundingClientRect(),
                    scale = this.data.ltPropScale;

                return {
                    width: (bcr.width / scale) + this.calculate_padding(node, 'margin'),
                    height: (bcr.height / scale) + this.calculate_padding(node, 'margin', true)
                }
            }.bind(this),
            updatePreviewVal = function () {
                var previewElem = this._preview.querySelector( "#preview_" + curItem[0].id );
                if(previewElem){
                    var style = curItem[0].style;
                    previewElem.style.left = style.left;
                    previewElem.style.top = style.top;
                    previewElem.style.opacity = 1;
                }
            }.bind(this),
            subShapeInsert = custData ? !custData.mainNodeIns : newItemData,
            curItem, newItemPar, curPar, hasPlaceHolder, itemWrapper, last, corresElem, first, oldParentBcr = {};

        if (readOnly) {
            var retData = newItemData || { data: this.data.ltPropData, ind: parseInt(src.getAttribute('data-index')), parentElement: true };
            retData.ind++;
            return retData;
        }

        if (subShapeInsert) {//add sequential item
            newItemData.ind++;
            Lyte.arrayUtils(newItemData.data, 'insertAt', newItemData.ind, data);
            findConn();
            newItemPar = elemGroup.closest('lyte-connect-item')[0];
            itemWrapper = this.getChildrenGroup(elemGroup[0]);
            curItem = curItem || $L(groupType ? this.getGroupChild(newItemPar)[newItemData.ind] : itemWrapper.children[newItemData.ind]);
            curItem.addClass('lyteSequentialPosAbs lyteSequentialOpacityHide');
            curPar = newItemPar.closest('.parentNode');
            oldParentBcr = getBcr(curPar);
            oldDetails = $L.extend(true, {}, this.data.details[curPar.id].position);
            hasPlaceHolder = newItemData.data.length == 2 && newItemData.data[newItemData.ind ? 0 : 1].placeholder;
            // $node.arrange();
            this.alterConditionIcons(undefined, this.getGroupChild(newItemPar)[newItemData.ind - 1]);
            setConnection();
        } else {
            var index = custData ? custData.ind : parseInt(src.getAttribute('data-index')) + 1;
            delete data.position;
            data.id && (Object.keys(this.data.details).includes(data.id)) && (delete data.id);
            $node.insertShape(data, index);
            curItem = $L(this.__wrapper.children[index]);
            findConn();
            curItem.addClass('lyteSequentialOpacityHide');
            var fastdom = $L.fastdom;
            fastdom.mutate(function () {//setimeout is used because while inserting a shape, takes some time to update the position, so after that the conn are made/avoid filckering while undo
                fastdom.measure(function () {
                    setTimeout(function () {
                        this.sequentialPlaceholderAdded = false;
                        setConnection();
                        this.updateCondTxtBoxPos(curItem);
                        this.updateCondTxtBoxPos(curItem, true);
                        this.sequentialPlaceholderAdded && $node.arrange();
                        delete this.sequentialPlaceholderAdded;
                        requestAnimationFrame(function () {
                            data.collapsed && collapseItems.push(curItem[0]);
                            this.sq_toggle(collapseItems || [], true);
                            $L('.lyteSequentialOpacityHide').removeClass('lyteSequentialOpacityHide');
                            updatePreviewVal();
                        }.bind(this));
                    }.bind(this), 0);
                }.bind(this));
            }.bind(this));
        }

        this.addDraggable(curItem[0]);

        if (!this.isUndo()) {
            var undoPostition = [],
                dataCpy = $L.extend(true, {}, data);

            this.getSequentialElemIndPath(curItem[0], undoPostition);
            this.pushToQueue({
                type: "insertSequentialElement",
                data: this.stringify({ data: dataCpy, position: undoPostition })
            });
        }

        var updIndv = function () {
            curItem.removeClass('lyteSequentialPosAbs');
            this.updateCondTxtBoxPos(curItem);
            this.updateCondTxtBoxPos(curItem, true);

            var newParentBcr = getBcr(curPar),
                heightDiff = newParentBcr.height - oldParentBcr.height,
                widthDiff = newParentBcr.width - oldParentBcr.width;
                
            if(heightDiff){
                var followup = this.getFollupNodes(curPar);
                followup.forEach(function (item) {
                    var old_pos = item.component.data.ltPropData;
                    Lyte.objectUtils(old_pos, 'add', 'position', {
                        left: old_pos.position.left,
                        top: old_pos.position.top + heightDiff
                    });
                    this.update_position(item);
                }.bind(this));
            }

            if(widthDiff){
                var old_pos = curPar.component.data.ltPropData;
                Lyte.objectUtils(old_pos, 'add', 'position', {
                    left: old_pos.position.left - widthDiff / 2,
                    top: old_pos.position.top
                });
            }

            if(heightDiff || widthDiff){
                this.update_position(curPar);
            }

            this.updateDetails(curPar.id);//update preview
            this.setup_boundary(true);

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    $L('.lyteSequentialOpacityHide').removeClass('lyteSequentialOpacityHide');
                    updatePreviewVal();
                });
            });
        }.bind(this);

        if(subShapeInsert){
            data.collapsed && collapseItems.push(curItem[0]);
            if(collapseItems.length){
                setTimeout(function () {
                    this.sq_toggle(collapseItems || [], true, true);
                    updIndv();
                }.bind(this), 0);
            } else {
                updIndv();
            }
        }

        return curItem;
    },

    deleteSequentialItem: function (item) {
        var $node = this.$node,
            elem = this.getElem(item),
            groupType = elem[0].tagName == 'LYTE-SEQUENTIAL-GROUP',
            blockType = elem.hasClass('lyteSequentialBlockType'),
            parentConnectItem = elem.closest('lyte-connect-item'),
            containerType = parentConnectItem.hasClass('lyteSequentialContainerType');

        if (!((elem[0].tagName == 'LYTE-CONNECT-ITEM' && !elem.hasClass('lyteSequentialPlaceholderType')) || (groupType && !containerType))) {
            return;
        }

        var condition = elem.children('lyte-sequential-condition')[0],
            itemConn = $L($node).connection('getConnections', groupType ? condition : elem),
            parentNode = elem.closest('.parentNode')[0],
            parentOldDetails = this.data.details[parentNode.id].position,
            elemGroup = elem.closest('lyte-sequential-group'),
            remElemData = this.getSequentialData(elemGroup, elem[0], groupType),
            oldTarget, undoPostition = [], shapeData;

        if (this.data.ltPropUndo) {
            this.getSequentialElemIndPath(elem[0], undoPostition);
        }

        if (groupType) {//this is to remove connection from a whole sector like if/else-if/else
            var connElem;
            if (remElemData.data.length == 1) {
                this.deleteSequentialItem(elem.closest('lyte-connect-item'));
                return;
            }
            itemConn.src.every(function (trg) {
                if (trg.data().target.get(0).tagName == 'LYTE-SEQUENTIAL-CONDITION') {
                    connElem = trg;
                    return
                }
                return true
            });
            if (connElem) {//here inc connection is altered and out connection is deleted// because in group first will have a different connection
                var out = $node.disConnect(connElem);//out connection
                oldTarget = out.target;
                $node.updateConnectionOrigin(itemConn.target[0], undefined, oldTarget);
            } else {//for else del inc connection
                $node.disConnect(itemConn.target[0]);
            }
        } else {
            var outConn = itemConn.src[0],
                inConn = (blockType ? itemConn : $L($node).connection('getConnections', elem.children('lyte-sequential-icon')[0])).target[0];
            if (remElemData && remElemData.ind == 0 && remElemData.data.length == 1) {//this is to add placeholder elem
                Lyte.arrayUtils(remElemData.data, 'push', { nodeType: 'block', placeholder: true, class: 'lyteSequentialPlaceholderType' });
                var placeholderElem = this.getChildrenGroup(elemGroup[0]).children[1];
                $node.updateConnectionOrigin(inConn, undefined, placeholderElem);
                $node.updateConnectionOrigin(outConn, placeholderElem);
            } else {//here inc connection is deleted and out connection is altered
                var inc = inConn && $node.disConnect(inConn);//inc connection
                inc && $node.updateConnectionOrigin(outConn, inc.src);
            }
        }

        $node.getConnections(elem[0], true).src.forEach((conn) => { $node.disConnect($L(conn.connection_elem)) });//delete all internal connections

        if (elemGroup.length) {//delete sequential item
            var totParNode = elem.closest('.parentNode')[[0]],
                isBranching = groupType && parentConnectItem.hasClass('lyteSequentialBranchingType'),
                imdPar = isBranching ? elem.closest('lyte-sequential-group-wrapper')[0]: elem[0].parentElement;
            shapeData = remElemData.data[remElemData.ind];
            Lyte.arrayUtils(remElemData.data, 'removeAt', remElemData.ind);
            if(isBranching && remElemData.ind == remElemData.data.length){
                var previousCond = this.getGroupChild(parentConnectItem)[remElemData.ind - 1];
                this.alterConditionIcons(previousCond);
            }
            this.updateDetails(totParNode.id);
            $node.arrange();
            this.updateCondTxtBoxPos(imdPar);
            this.updateCondTxtBoxPos(imdPar, true);
            var newDetails = this.data.details[parentNode.id].position;
            if (parentOldDetails.left == newDetails.left && parentOldDetails.top == newDetails.top) {
                this.update_position(parentNode);
            }
        } else {
            shapeData = $node.deleteShape(elem[0].id).data;
            delete shapeData.anchor_points;
            delete shapeData.position;
            $node.arrange();
        }

        if (!this.isUndo() && undoPostition.length) {
            this.pushToQueue({
                type: "removeSequentialElement",
                data: this.stringify({ data: shapeData, position: undoPostition })
            });
        }
    },

    sequentialItemAction: function (action, selected) {
        var passedItem = selected ? selected : this._item,
            passedItemLen = passedItem.length,
            _this = this,
            refreshSeqCpy = function (push, del) {
                _this.seqCopyElems = [];
                passedItem.forEach(item => {
                    var curItem = item[0] || item,
                        data = curItem.getData && curItem.getData('ltPropData');
                    if (data && !data.placeholder) {
                        push && _this.seqCopyElems.push($L.extend(true, {}, data));
                        del && _this.deleteSequentialItem(curItem);
                    }
                });
            };

        if (this.getMethods('onSequentialAction') && this.executeMethod('onSequentialAction', action, passedItem, action == 'paste' ? this.seqCopyElems : undefined, this.$node) == false) {
            return false;
        }

        switch (action) {
            case 'copy': {
                if (passedItemLen) {
                    refreshSeqCpy(true, false);
                    return true;
                }
            }
                break;

            case 'cut': {
                if (passedItemLen) {
                    refreshSeqCpy(true, true);
                    this._item = [];
                    return true;
                }
            }
                break;

            case 'paste': {
                var seqCopyElems = this.seqCopyElems;
                if (seqCopyElems && seqCopyElems.length && passedItemLen) {//target as (connection)
                    seqCopyElems.reverse().forEach(data => {
                        passedItem.forEach(item => {
                            var targetItem = item[0] || item,
                                newData = $L.extend(true, {}, data),
                                parGroup = targetItem.closest('lyte-sequential-group'),
                                parItem = parGroup && parGroup.closest('lyte-connect-item');
                            this.insertSequentialItem(newData, {
                                parentData: parItem || this.$node,
                                branchIndex: parGroup ? parseInt(parGroup.getAttribute('data-index')) : undefined,
                                index: (targetItem.tagName == 'LYTE-SEQUENTIAL-CONDITION' || targetItem.tagName == 'LYTE-SEQUENTIAL-GROUP') ? this.getChildrenGroup(parGroup).children.length : parseInt(targetItem.getAttribute('data-index')) + 1
                            });
                        });
                    });
                    if (passedItemLen) {
                        return true;
                    }
                }
            }
                break;

            case 'delete': {
                if (passedItemLen) {
                    refreshSeqCpy(false, true);
                    this._item = [];
                    return true;
                }
            }
                break;
        }
        return false;
    },

    handleSequentialKeyEvents: function (evt) {
        var code = evt.which || evt.keyCode,
            ctrl = evt.metaKey || evt.ctrlKey;

        if (![90, 8, 67, 88, 86].includes(code)) {
            return;
        }

        switch (code) {
            case 67: // Copy (Ctrl+C)
                return ctrl && this.sequentialItemAction('copy');
            case 88: // Cut (Ctrl+X)
                return ctrl && this.sequentialItemAction('cut');
            case 86: // Paste (Ctrl+V)
                return ctrl && this.sequentialItemAction('paste');
            case 8:  // Delete
                return this.sequentialItemAction('delete');
            case 90: { // Undo
                if (ctrl && this.data.ltPropUndo) {
                    var $node = this.$node;
                    evt.shiftKey ? $node.redo() : $node.undo();
                    return true;
                }
            }
                break;
        }
    },

    dragELemTextHide: function (elem) {
        if (elem) {
            var conn = this.getConnections(elem);
            conn.src.push(conn.target[0]);
            conn.src.forEach(conn => {
                conn && $L(conn.textBox).removeClass('lyteSequentialTextboxShow');
            });
        }
        //hide the placeHolder and custom textbox
        $L('.lyteSequentialPlaceholderType, .lyteSequentialDroppableAllowed', this.__wrapper).each(function (index, item) {
            var conn = this.getConnections(item);
            for (var i in conn) {
                conn[i][0] && $L(conn[i][0].textBox).removeClass('lyteSequentialTextboxShow');
            }
        }.bind(this));
    },

    updateDropPos: function () {
        var scale = this.data.ltPropScale,
            seqAttrBoundary = $L.extend({ left: 100, right: 100, top: 30, bottom: 30 }, this.data.ltPropSequentialAtrributes.dropabbleBoundary);
        this.droppablePos = Array.from($L(".lyteSequentialTextboxShow, .lyteSequentialPlaceholderType, .lyteSequentialDroppableAllowed", this.__wrapper)).map((el) => {
            var bcr = el.getBoundingClientRect(),
                centerX = bcr.left + bcr.width / 2,
                centerY = bcr.top + bcr.height / 2,
                isPlaceholder = $L(el).hasClass('lyteSequentialPlaceholderType') || $L(el).hasClass('lyteSequentialDroppableAllowed');
            return { element: el, left: centerX - (seqAttrBoundary.left * scale), right: centerX + (seqAttrBoundary.right * scale), top: centerY - (seqAttrBoundary.top * scale), bottom: centerY + (seqAttrBoundary.bottom * scale), placeholder: isPlaceholder };
            // var conn = $L(el).data().connector,
            //     corrElem = conn.data(),
            //     isLast = conn.hasClass('lyteSequentialLastConnection'),
            //     srcBcr = corrElem.active_src.getBoundingClientRect(),
            //     trgBcr = isLast ? el.getBoundingClientRect() : corrElem.active_target.getBoundingClientRect();

            // if (isLast) {
            //     return { element: el, left: srcBcr.left, right: srcBcr.right, top: srcBcr.top, bottom: srcBcr.bottom + (trgBcr.bottom - srcBcr.bottom) * 2 };
            // }

            // return {
            //     element: el,
            //     left: Math.min(srcBcr.left, trgBcr.left),
            //     right: Math.max(srcBcr.right, trgBcr.right),
            //     top: Math.min(srcBcr.top, trgBcr.top),
            //     bottom: Math.max(srcBcr.bottom, trgBcr.bottom)
            // };
        });
    },

    deleteStoredVar: function () {
        ['droppablePos', 'mainDrag', 'prevDrag', 'preventDrag', 'prevActiveDroppable', 'prevDroppableClose', 'draggableStop', 'tempHiddenTxtBox', 'lastDragPos', 'connUpdateOnAnimate', 'connUpdateOnAnimateClose'].forEach(name => {
            if (this[name] != undefined) {
                delete this[name];
            }
        });
    },

    checkBoundary: function (event) {
        var boundary = this.$node.getBoundingClientRect();
        if (event.clientX < boundary.left || event.clientX > boundary.right || event.clientY < boundary.top || event.clientY > boundary.bottom) {
            return false;
        }
    },

    sequentialContDrag: function (event, elem) {
        if (this.mainDrag != undefined || !$L(this.$node).hasClass('lyteSequentialDragging')) {
            return;
        }

        if (this.prevDrag != undefined) {
            cancelAnimationFrame(this.prevDrag);
            delete this.prevDrag;
        }

        this.mainDrag = requestAnimationFrame(() => {
            var data = this.data,
                boundary = data.ltPropBoundary,
                min = { x: boundary.max_x, y: boundary.max_y },
                max = { x: boundary.min_x, y: boundary.min_y },
                currentX = data.ltPropScrollLeft,
                currentY = data.ltPropScrollTop,
                clientX = event.clientX,
                clientY = event.clientY,
                actBoundary = this.$node.getBoundingClientRect(),
                newTranslateX = currentX,
                newTranslateY = currentY,
                scale = this.data.ltPropScale,
                seqAttr = this.data.ltPropSequentialAtrributes,
                threshold = seqAttr.autoScrollBoundaryOffset == undefined ? 10 : seqAttr.autoScrollBoundaryOffset,
                incSpeed = seqAttr.draggableSpeed == undefined ? 5 : seqAttr.draggableSpeed;

            if (clientX < actBoundary.left + threshold) {
                newTranslateX = Math.min(currentX + incSpeed /*(actBoundary.left + threshold - clientX) / 2*/, min.x); // Move right
            } else if (clientX > actBoundary.right - threshold) {
                newTranslateX = Math.max(currentX - incSpeed /*(clientX - (actBoundary.right - threshold)) / 2*/, max.x); // Move left
            }

            if (clientY < actBoundary.top + threshold) {
                newTranslateY = Math.min(currentY + incSpeed /*(actBoundary.top + threshold - clientY) / 2*/, min.y); // Move down
            } else if (clientY > actBoundary.bottom - threshold) {
                newTranslateY = Math.max(currentY - incSpeed /*(clientY - (actBoundary.bottom - threshold)) / 2*/, max.y); // Move up
            }

            newTranslateX = newTranslateX == currentX ? undefined : newTranslateX;
            newTranslateY = newTranslateY == currentY ? undefined : newTranslateY;

            delete this.mainDrag;
            if (newTranslateX != undefined || newTranslateY != undefined) {
                this.preventDrag = true;
                this.removeDroppableElem();
                if (newTranslateX != undefined) {
                    var oldX = elem && elem.getBoundingClientRect().left;
                    this.setData('ltPropScrollLeft', newTranslateX);
                    requestAnimationFrame(() => {
                        if (oldX) {
                            elem.style.left = parseFloat(elem.style.left) + ((oldX - elem.getBoundingClientRect().left) / scale) + 'px';
                            this.update_position(elem, undefined, undefined, true);
                        }
                    });
                }
                if (newTranslateY != undefined) {
                    var oldY = elem && elem.getBoundingClientRect().top;
                    this.setData('ltPropScrollTop', newTranslateY);
                    requestAnimationFrame(() => {
                        if (oldY) {
                            elem.style.top = parseFloat(elem.style.top) + ((oldY - elem.getBoundingClientRect().top) / scale) + 'px';
                            this.update_position(elem, undefined, undefined, true);
                        }
                    });
                }
                this.prevDrag = requestAnimationFrame(() => {
                    this.sequentialContDrag(event, elem);
                });
            } else {
                this.preventDrag || this.updateDropPos();
                this.preventDrag = false;
            }
        });
    },

    droppableValueOverride: function(droppElem, value) {
        droppElem.style.height = value;
        droppElem.style.paddingTop = value;
        droppElem.style.paddingBottom = value;
        droppElem.style.marginTop = value; 
        droppElem.style.marginBottom = value;
        droppElem.style.opacity = value;
    },

    removeDroppableElem: function (custom) {
        var $node = this.$node,
            elem = $L('.lyteSequentialDroppableElem', $node),
            prevDrop = this.prevActiveDroppable;
        
        if (!prevDrop) {
            return;
        }
        
        $L('.lyteSequentialDroppableHovered', $node).removeClass('lyteSequentialDroppableHovered');
        
        if (prevDrop.placeholder) {
            delete this.prevActiveDroppable;
            return;
        }
        
        if (this.prevDroppableClose) {
            if (custom) {
                this.draggableStop = true;
            }
            return;
        }
        
        elem.length && this._performRemoval(elem, prevDrop, custom);
    },

    _performRemoval: function(elem, prevDrop, custom) {
        var $node = this.$node,
            curParent = elem[0].closest('.parentNode'),
            stopDrag = custom || this.draggableStop;
        
        // Cleanup animation RAF
        if (this.connUpdateOnAnimate) {
            cancelAnimationFrame(this.connUpdateOnAnimate);
            delete this.connUpdateOnAnimate;
        }
        
        delete this.prevActiveDroppable.position;
        this.prevDroppableClose = true;
        
        var finalizeRemoval = function () {

                var closestLoop = elem.closest('.lyteSequentialLoopType'),
                    closestBranching = elem.closest('.lyteSequentialBranchingType');

                Lyte.arrayUtils(prevDrop.location.data, 'removeAt', prevDrop.location.ind);
                
                if (!stopDrag && this.tempHiddenTxtBox) {
                    this.tempHiddenTxtBox.addClass('lyteSequentialTextboxShow');
                }
                
                curParent.style.transform = '';
                
                if (stopDrag) {
                    $L('.lyteSequentialRollbackElements', $node)
                        .removeClass('lyteSequentialRollbackElements')
                        .each(function (index, item) {
                            item.style.transform = '';
                            this.update_position(item, undefined, undefined, true);
                        }.bind(this));
                }
                
                this.update_position(curParent, undefined, undefined, true);
                this.updateCondTxtBoxPos(closestLoop, true);
                this.updateCondTxtBoxPos(closestBranching);
                
                requestAnimationFrame(() => {
                    this._cleanupRemovalState(stopDrag);
                });
            }.bind(this);
        
        if (custom) {
            finalizeRemoval();
        } else {
            this._animateRemoval(elem, curParent, finalizeRemoval);
        }
    },

    _animateRemoval: function(elem, curParent, callback) {
        var $node = this.$node;
        
        var updateConnections = function () {
            $L('.lyteSequentialRollback', $node).each(function (index, item) {
                this.update_position(item, undefined, undefined, true);
            }.bind(this));
            this.update_position(curParent, undefined, undefined, true);
        }.bind(this);

        var autoRefreshConnections = function () {
            if (!this.connUpdateOnAnimateClose) {return;}
            
            updateConnections();
            
            if (this.connUpdateOnAnimateClose) {
                this.connUpdateOnAnimateClose = requestAnimationFrame(autoRefreshConnections);
            }
        }.bind(this);
        
        var onTransitionStart = function () {
            elem.off('transitionstart', onTransitionStart);
            updateConnections();
            this.connUpdateOnAnimateClose = requestAnimationFrame(autoRefreshConnections);
        }.bind(this);
        
        var onTransitionEnd = function () {
            if (this.connUpdateOnAnimateClose) {
                cancelAnimationFrame(this.connUpdateOnAnimateClose);
                delete this.connUpdateOnAnimateClose;
            }
            elem.off('transitionend', onTransitionEnd);
            updateConnections();
            $L('.lyteSequentialRollback', $node).removeClass('lyteSequentialRollback');
            callback();
        }.bind(this);
        
        elem.on('transitionstart', onTransitionStart);
        elem.on('transitionend', onTransitionEnd);

        this.droppableValueOverride(elem[0], '0');
        $L('.lyteSequentialRollbackElements', $node)
            .removeClass('lyteSequentialRollbackElements')
            .addClass('lyteSequentialRollback')
            .each(function (index, item) {
                item.style.transform = '';
            });
    },

    _cleanupRemovalState: function(stopDrag) {
        delete this.prevDroppableClose;
        delete this.prevActiveDroppable;
        delete this.tempHiddenTxtBox;
        delete this.draggableStop;
        
        if (!stopDrag && this.lastDragPos) {
            this.checkProximity({ 
                clientX: this.lastDragPos.x, 
                clientY: this.lastDragPos.y 
            }, undefined, true);
            delete this.lastDragPos;
        }
    },

    checkProximity: function (event, elem, custom) {
        var dragX = event.clientX,
            dragY = event.clientY,
            activeDroppable = null,
            minDistance = Infinity,
            prevDrop = this.prevActiveDroppable,
            prevBounds = prevDrop && prevDrop.position,
            scale = this.data.ltPropScale;

        if (!custom) {
            this.sequentialContDrag(event, elem);
            if (this.preventDrag) {
                return;
            }
        }

        if (prevDrop) {
            this.lastDragPos = { x: dragX, y: dragY };
            if (!prevBounds) {
                return;
            }
        }

        var proxArr = prevBounds || this.droppablePos;

        proxArr && proxArr.forEach(function (drop) {
            if (dragX > drop.left && dragX < drop.right && dragY > drop.top && dragY < drop.bottom) {
                var centerX = (drop.left + drop.right) / 2,
                    centerY = (drop.top + drop.bottom) / 2,
                    distance = Math.hypot(dragX - centerX, dragY - centerY);

                if (distance < minDistance) {
                    minDistance = distance;
                    activeDroppable = drop;
                }
            }
        });

        if (activeDroppable) {
            if (prevBounds) {
                return;
            }

            this.tempHiddenTxtBox && this.tempHiddenTxtBox.addClass('lyteSequentialTextboxShow');

            if (activeDroppable.placeholder) {
                $L(activeDroppable.element).addClass('lyteSequentialDroppableHovered');
                this.prevActiveDroppable = { 
                    textBox: activeDroppable.element, 
                    position: [activeDroppable], 
                    placeholder: true 
                };
            } else {
                this._createDroppableElement(activeDroppable, elem);
            }
        } else {
            if (prevBounds) {
                this.removeDroppableElem();
            }
        }
    },

    _createDroppableElement: function(activeDroppable, elem) {
        var data = { nodeType: 'block', droppable: true, class: 'lyteSequentialDroppableElem' },
            position = this.insertSequentialItem(data, activeDroppable.element, true),
            curParent = $L(activeDroppable.element).data().connector.data().src[0].closest('.parentNode'),
            scale = this.data.ltPropScale,
            oldHeight = curParent.getBoundingClientRect().height / scale,
            oldWidth = curParent.getBoundingClientRect().width / scale;

        Lyte.arrayUtils(position.data, 'insertAt', position.ind, data);

        this._animateDroppableElement(position, curParent, activeDroppable, oldHeight, oldWidth, elem);

        this.tempHiddenTxtBox = $L(activeDroppable.element).removeClass('lyteSequentialTextboxShow');
        this.prevActiveDroppable = { 
            textBox: activeDroppable.element, 
            location: { data: position.data, ind: position.ind } 
        };
    },

    _animateDroppableElement: function(position, curParent, activeDroppable, oldHeight, oldWidth, elem) {
        var droppable = $L('.lyteSequentialDroppableElem', this.$node),
            droppElem = droppable[0],
            child = $L(this.__wrapper).children('lyte-connect-item'),
            curChildInd = parseInt(curParent.getAttribute('data-index')),
            draggedItem = $L('.lyteSequentialDragClone', this.$node)[0],
            scale = this.data.ltPropScale;

        // STEP 1: Measure final parent height (element renders with user's CSS)
        var newHeight = curParent.getBoundingClientRect().height / scale,
            heightDiff = newHeight - oldHeight,
            newWidth = curParent.getBoundingClientRect().width / scale,
            droppableHeight = droppElem.getBoundingClientRect().height / scale + this.calculate_padding(droppElem, 'margin'),
            droppableWidth = droppElem.getBoundingClientRect().width / scale + this.calculate_padding(droppElem, 'margin', true);

        // STEP 2: Set starting state (everything to 0)
        this.droppableValueOverride(droppElem, '0');

        // Position the droppable element
        if (position.parentElement) {
            var curTextBoxStyle = activeDroppable.element.style;
            droppElem.style.left = (parseFloat(curTextBoxStyle.left) - droppableWidth / 2) + 'px';
            droppElem.style.top = (parseFloat(curTextBoxStyle.top) - activeDroppable.element.offsetHeight / 2) + 'px';
            heightDiff = droppableHeight;
        } else {
            var widthDiff = -(newWidth - oldWidth);
            widthDiff && (curParent.style.transform = 'translateX(' + widthDiff / 2 + 'px)');
            this.update_position(curParent, undefined, undefined, true);
            this.updateCondTxtBoxPos(droppable);
            this.updateCondTxtBoxPos(droppable, true);
        }

        // Set siblings to starting position
        if (heightDiff && heightDiff > 0) {
            for (var i = curChildInd + (position.parentElement ? 2 : 1); i < child.length; i++) {
                if (child[i] != draggedItem) {
                    $L(child[i]).addClass('lyteSequentialRollbackElements lyteSequentialRollback');
                    child[i].style.transform = 'translateY(0px)';
                }
            }
        }

        // Force reflow
        droppElem.offsetHeight;

        // RAF only for connection updates
        var updateConnections = function () {
            for (var i = curChildInd + (position.parentElement ? 2 : 1); i < child.length; i++) {
                if (child[i] != draggedItem) {
                    this.update_position(child[i], undefined, undefined, true);
                }
            }
            this.update_position(curParent, undefined, undefined, true);
        }.bind(this);

        var autoRefreshConnections = function () {
            if (!this.connUpdateOnAnimate) {return;}
            
            updateConnections();
            
            if (this.connUpdateOnAnimate) {
                this.connUpdateOnAnimate = requestAnimationFrame(autoRefreshConnections);
            }
        }.bind(this);
        
        var onTransitionStart = function () {
            droppable.off('transitionstart', onTransitionStart);
            
            // Animate siblings to final position
            if (heightDiff && heightDiff > 0) {
                for (var i = curChildInd + (position.parentElement ? 2 : 1); i < child.length; i++) {
                    if (child[i] != draggedItem) {
                        child[i].style.transform = 'translateY(' + heightDiff + 'px)';
                    }
                }
            }

            updateConnections();
            this.connUpdateOnAnimate = requestAnimationFrame(autoRefreshConnections);
        }.bind(this);
        
        var onTransitionEnd = function () {
            if (this.connUpdateOnAnimate) {
                cancelAnimationFrame(this.connUpdateOnAnimate);
                delete this.connUpdateOnAnimate;
            }
            droppable.off('transitionend', onTransitionEnd);
            $L('.lyteSequentialRollback', this.$node).removeClass('lyteSequentialRollback');
            
            if (!droppable.hasClass('lyteSequentialDroppableAnimate')) {
                return;
            }
            
            this.prevActiveDroppable.position = [droppable[0].getBoundingClientRect(), activeDroppable];
            droppable.addClass('lyteSequentialDroppableHovered');
            updateConnections();
            
            if (this.lastDragPos) {
                this.checkProximity({ 
                    clientX: this.lastDragPos.x, 
                    clientY: this.lastDragPos.y 
                }, elem, true);
                delete this.lastDragPos;
            }
        }.bind(this);
        
        droppable.on('transitionstart', onTransitionStart);
        droppable.on('transitionend', onTransitionEnd);

        droppable.addClass('lyteSequentialDroppableAnimate');
        // STEP 3: Animate to user's CSS values by removing inline styles
        requestAnimationFrame(() => {
            this.droppableValueOverride(droppElem, '');
        });
    },

    insertDraggableCollapseElem: function (elem) {

        var elemCollapseNode = $L(elem).children('lyte-sequential-collapsible-item')[0],
            elemData = $L.extend(true, {}, elem.getData('ltPropData')),
            scale = this.data.ltPropScale;
            
        elemData.id = elemData.position = undefined;
        elemData.class = elemData.class ? elemData.class + ' lyteSequentialDragClone' : 'lyteSequentialDragClone';
        elemCollapseNode && (elemData.branches = undefined);

        Lyte.arrayUtils(this.data.ltPropData, 'push', elemData);

        var cloneNode = $L('.lyteSequentialDragClone', this.$node)[0];

        if(!elemCollapseNode){
            return this.setSequentialConnections(cloneNode, undefined, 'lyteSequentialDragCloneConn', true);
        }

        var collapse_node = $L(cloneNode).children('lyte-sequential-collapsible-item').addClass('lyteSequentialCollapseVisible')[0],
            groupWrapper = $L(cloneNode).children('lyte-sequential-group-wrapper')[0],
            newCollapseWidth;

        if(elemData.collapsed){
            newCollapseWidth = (elemCollapseNode.getBoundingClientRect().width / scale) - this.calculate_padding(elemCollapseNode, 'padding', true) - this.calculate_padding(elemCollapseNode, 'border', true);
        } else {
            var actElemBcr = $L(elem).children('lyte-sequential-group-wrapper')[0].getBoundingClientRect(),
                collapsibleMinWidth = this.data.ltPropSequentialAtrributes.collapsibleMinWidth || 0,
                collapseSize = (collapse_node.getBoundingClientRect().width / scale) + this.calculate_padding(collapse_node, 'margin', true),
                condition = $L(cloneNode).children('lyte-sequential-icon, lyte-sequential-condition')[0],
                conditionWidth = condition ? (condition.getBoundingClientRect().width / scale) + this.calculate_padding(condition, 'margin', true) : 0,
                wrapperMargin = this.calculate_padding(groupWrapper, 'margin', true);

            newCollapseWidth = (Math.ceil(Math.min(Math.max(collapseSize, conditionWidth, collapsibleMinWidth) - wrapperMargin, actElemBcr.width / scale)) + wrapperMargin) - this.calculate_padding(collapse_node, 'padding', true) - this.calculate_padding(collapse_node, 'border', true) - this.calculate_padding(collapse_node, 'margin', true);    
        }

        var collapseItem = collapse_node.children[0];
        collapseItem && [[$L(cloneNode).children('lyte-sequential-icon')[0], collapseItem], [collapseItem, cloneNode]].forEach(function(item){
            this.$node.connect(item[0], item[1], {
                src_position: { x: 0.5, y: 1 },
                target_position: { x: 0.5, y: 1 },
                textBox: false,
                class: 'lyteSequentialDragCloneConn',
                angle: { end: 270 }
            });
        }.bind(this));

        collapse_node.style.width = newCollapseWidth + 'px';
        groupWrapper.style.display = 'none';
    },

    addDraggable: function (elem) {
        var _this = this,
            $node = this.$node,
            elems = $L('lyte-connect-item:not(.lyteSequentialPlaceholderType):not(.lyteSequentialCollapsedNode):not(.lyteSequentialDroppableAllowed)', elem || $node),
            seqAttrThreshold = this.data.ltPropSequentialAtrributes.draggableTriggerThreshold;
        elem && elems.push(elem);
        elems.draggable({
            appendTo: '.lyteConnectWrapper',
            threshold: seqAttrThreshold == undefined ? 5 : seqAttrThreshold,
            helper: function (elem) {
                _this.insertDraggableCollapseElem(elem);
                $L('.lyteSequentialTextboxHidden', _this.__wrapper).addClass('lyteSequentialTextboxShow');
                _this.dragELemTextHide(elem);
                _this.updateDropPos();
                $L($node).addClass('lyteSequentialDragging');
                $L(elem).addClass('lyteSequentialDragged');
                _this.getConnections(elem).src.forEach((item) => {
                    item.src != elem && $L(item.connection_elem).addClass('lyteSequentialDraggedConnection');
                });
                return $L('.lyteSequentialDragClone', $node)[0];
            },
            onStart: function (elem, event) {
                if (_this.getMethods('onBeforeSequentialDragStart') && _this.executeMethod('onBeforeSequentialDragStart', elem, event, $node) == false) {
                    return false;
                }
                var valid = true,
                    scale = _this.data.ltPropScale;
                ['.lyteSequentialPlaceholderType', 'lyte-sequential-condition', '.lyteSequentialCollapsedNode'].every(function (item) {
                    if (event.target.closest(item)) {
                        valid = false;
                    } else {
                        return true;
                    }
                });
                elem.modifyScaleValue({ x: scale, y: scale });
                return valid;
            },
            onDrag: function (elem) {
                _this.update_position(elem, undefined, undefined, true);
                _this.checkProximity(arguments[2], elem);
                return _this.checkBoundary(arguments[2]);
            },
            onStop: function () {
                var hovered = $L('.lyteSequentialDroppableHovered', $node)[0],
                    txtBox = hovered && _this.prevActiveDroppable && _this.prevActiveDroppable.textBox;

                if (!txtBox) {
                    _this.removeDroppableElem();//this will remove by animation
                }
                _this.removeDroppableElem(true);//the above if is true, then it will remove by force, false this.draggableStop will get true
                delete _this.droppablePos;
                requestAnimationFrame(() => {
                    cancelAnimationFrame(_this.prevDrag);
                });
                $L('.lyteSequentialTextboxShow', _this.__wrapper).removeClass('lyteSequentialTextboxShow');
                $L($node).removeClass('lyteSequentialDragging');
                $L('.lyteSequentialDragCloneConn', $node).each((index, conn) => { $node.disConnect($L(conn)) });
                Lyte.arrayUtils(_this.data.ltPropData, 'pop');
                _this.deleteStoredVar();
                $L('.lyteSequentialDragged', $node).removeClass('lyteSequentialDragged');
                $L('.lyteSequentialDraggedConnection', $node).removeClass('lyteSequentialDraggedConnection');
                if (txtBox) {
                    var actElem = arguments[5],
                        oldData = actElem.getData('ltPropData');
                    if (_this.getMethods('onSequentialDrop') && _this.executeMethod('onSequentialDrop', actElem, txtBox, event, $node) == false) {
                        return;
                    }
                    _this.deleteSequentialItem(actElem);
                    delete oldData.position;
                    _this.insertSequentialItem(oldData, txtBox.tagName == 'LYTE-CONNECT-ITEM' ? { trg: hovered } : txtBox);
                }

            },
            cursorAt: { left: 0, top: 0 }
        });
    },

    sequentialDraggable: function (param) {
        var $node = this.$node;
        if (param.show) {
            $L('.lyteSequentialTextboxHidden', this.__wrapper).addClass('lyteSequentialTextboxShow');
            this.dragELemTextHide();
            this.updateDropPos();
        } else if (param.location) {
            $L($node).addClass('lyteSequentialDragging');
            this.checkProximity(param.location);
        } else if (param.drop) {
            var hovered = $L('.lyteSequentialDroppableHovered', $node)[0],
                txtBox = hovered && this.prevActiveDroppable && this.prevActiveDroppable.textBox;
            $L('.lyteSequentialTextboxShow', this.__wrapper).removeClass('lyteSequentialTextboxShow');
            $L($node).removeClass('lyteSequentialDragging');
            if (!txtBox) {
                this.removeDroppableElem();//this will remove by animation
            }
            this.removeDroppableElem(true);//the above if is true, then it will remove by force, false this.draggableStop will get true
            this.deleteStoredVar();
            return txtBox;
        }
    },

    actions: {
        branchIconClick: function (elem, event, _this) {
            this.getMethods('onBranchIconClick') && this.executeMethod('onBranchIconClick', elem, _this.$node, event, this.$node);
        }
    }
});