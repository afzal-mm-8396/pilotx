Lyte.Mixin.register("lyte-connect-level-arrange", {

    setLevels: function (obj_format) {
        var nonPositionedShapes = {},
            levelData = {},
            availableLevels = [],
            seperate_shapes = [],
            connected_shapes = [],
            dataCopy = $L.extend(true, {}, obj_format),
            chngLevelData = function (levelArr, level, val) {
                levelArr[level] || (levelArr[level] = []);
                levelArr[level].includes(val) || levelArr[level].push(val);
            },
            findRelative = function (id, level, visited, found) {
                var data = dataCopy[id];
                if (!visited.includes(id)) {
                    visited.push(id);
                    if (data.level == level) {
                        found.push(id);
                    }
                    var cmbData = data.from.concat(data.to);
                    cmbData.filter(function (item, index) { return (cmbData.indexOf(item) == index) }).forEach(function (item) {
                        findRelative(item, level, visited, found);
                    });
                }
            };

        for (var key in obj_format) {
            var cur = obj_format[key],
                to = $L.extend([], cur.to),
                level = parseInt(cur.level),
                id = cur.id,
                validLevel = level != undefined && !isNaN(level),
                prevLevel;// nextAvailLevel( level );

            if (validLevel) {
                availableLevels.indexOf(level) == -1 && availableLevels.push(level);
                connected_shapes.push(id);
            } else {
                seperate_shapes.push(id);
            }

            prevLevel = availableLevels[availableLevels.indexOf(level) - 1];

            to.forEach(function (parent) {//to allow only prevLevel Parent
                var parentData = obj_format[parent];
                if (parentData.level != prevLevel) {
                    var parentInd = cur.to.indexOf(parent),
                        childInd = parentData.from.indexOf(key);

                    cur.to.splice(parentInd, 1);
                    cur.to_position.splice(parentInd, 1);
                    parentData.from.splice(childInd, 1);
                    parentData.from_position.splice(childInd, 1);

                    if (parentData.from.length == 0) {
                        parentData.level != undefined && chngLevelData(nonPositionedShapes, parentData.level, parentData.id);
                        if (parentData.to.length == 0) {
                            var curDataLevel = levelData[parentData.level],
                                index = curDataLevel ? curDataLevel.indexOf(parentData.id) : -1;
                            index != -1 && levelData[parentData.level].splice(index, 1);
                        }
                    }
                }
            });

            if (validLevel) {
                if (cur.to.length) {
                    chngLevelData(levelData, level, key);
                } else {
                    chngLevelData(nonPositionedShapes, level, id);
                }
            }
        }
        for (var level in nonPositionedShapes) {
            var prevLevel = availableLevels[availableLevels.indexOf(parseInt(level)) - 1];
            if (prevLevel != undefined) {
                var defParArr = [];
                levelData[prevLevel].forEach(function (item) {//should be arranged in dom order
                    defParArr.push(item);
                })
                nonPositionedShapes[level].forEach(function (item) {
                    var parentArr = [],
                        minCh,
                        bestPar;
                    findRelative(item, prevLevel, [], parentArr);
                    if (!parentArr.length) {
                        parentArr = defParArr;
                    }
                    parentArr.forEach(function (par) {
                        var comb = dataCopy[par].from.concat(obj_format[par].from),
                            cur = comb.filter(function (item, index) {
                                return (comb.indexOf(item) == index)
                            }),
                            len = cur.length;
                        if (minCh == undefined || minCh > len) {
                            minCh = len;
                            bestPar = obj_format[par];
                        }
                    });
                    if (bestPar) {

                        bestPar.from.push(item);
                        bestPar.from_position.push({ x: 0.5, y: 1 });

                        var cur = obj_format[item];
                        cur.to.push(bestPar.id);
                        cur.to_position.push({ x: 0.5, y: 0 });

                        chngLevelData(levelData, level, item);
                    }
                });
            } else {
                nonPositionedShapes[level].forEach(function (item) {
                    chngLevelData(levelData, level, item);
                })
            }
            prevLevel = level;
        }
        levelData.seperate_shapes = seperate_shapes;

        return { connected: connected_shapes, seperate: seperate_shapes, levelData: levelData };
    },

    setConnections: function (levelData, to_move, obj_format) {
        var data = levelData.levelData,
            connData = {},
            keys = Object.keys(data).reverse(),
            oppSide = { top: 'bottom', bottom: 'top', right: 'left', left: 'right' },
            $node = this.$node,
            connSpace = this.data.ltPropLevelConnectionSpacing,
            crossConn = this.data.ltPropCrossLevelConnections,
            fallbackSides = {
                left: ["top", "bottom", "right"],
                right: ["top", "bottom", "left"],
                top: ["left", "right", "bottom"],
                bottom: ["left", "right", "top"]
            },
            srcPos, curSide, curItem, curData, altSideData,
            updPos = function (side, connPos) {
                var yDir = (side == 'top' || side == 'bottom'),
                    topLeftSide = (side == 'top' || side == 'left'),
                    pos = topLeftSide ? 0 : 1;
                return { x: yDir ? connPos : pos, y: yDir ? pos : connPos };
            },
            getAvailPos = function (obj, opp, side, stop, src) {
                var curObj = obj[side],
                    keys = opp ? Object.keys(curObj).reverse() : Object.keys(curObj),
                    posCount, retPos;

                keys.forEach(function (level) {
                    if (posCount == undefined || curObj[level] < posCount) {
                        posCount = curObj[level];
                        retPos = level;
                    }
                });

                if (crossConn) {
                    if (stop) {
                        return retPos && { position: parseFloat(retPos), count: posCount };
                    } else {
                        if (posCount > obj.lowestCount) {
                            var lowVal = undefined,
                                altValFound = false;
                            fallbackSides[side].every(function (altSides) {
                                lowVal = getAvailPos(obj, false, altSides, true);
                                if (lowVal && lowVal.count < posCount) {
                                    altSideData || (altSideData = {});
                                    if (src) {
                                        altSideData.src = altSides;
                                    } else {
                                        altSideData.target = altSides;
                                    }
                                    curObj = obj[altSides];
                                    retPos = lowVal.position;
                                    altValFound = true;
                                    return;
                                }
                                return true;
                            });
                            if (!altValFound) {
                                obj.lowestCount = posCount;
                            }
                        }
                    }
                }

                curObj[retPos]++;
                return parseFloat(retPos);

            },
            setConnPos = function (conn) {
                if (conn.src.id == curItem) {
                    var connElem = conn.connection_elem,
                        $connElem = $L(connElem),
                        options = $connElem.data('options'),
                        trgId = conn.target.id,
                        trgPos = to_move[trgId].position,
                        yDir = (curSide == 'top' || curSide == 'bottom'),
                        startDir = (yDir && trgPos.left > srcPos.left),
                        connSrcPos = getAvailPos(curData, startDir, curSide, false, true),
                        connTrgPos = getAvailPos(connData[trgId], (trgPos.left == srcPos.left || trgPos.top == srcPos.top) ? startDir : !startDir, oppSide[curSide]),
                        topLeftSide = (curSide == 'top' || curSide == 'left'),
                        srcDef = topLeftSide ? 0 : 1,
                        trgDef = topLeftSide ? 1 : 0;

                    if (altSideData) {
                        if (altSideData.src) {
                            var srcAltPos = updPos(altSideData.src, connSrcPos);
                            options.src_position = { x: srcAltPos.x, y: srcAltPos.y };
                        } else {
                            options.src_position = { x: yDir ? connSrcPos : srcDef, y: yDir ? srcDef : connSrcPos };
                        }

                        if (altSideData.target) {
                            var trgAltPos = updPos(altSideData.target, connTrgPos);
                            options.target_position = { x: trgAltPos.x, y: trgAltPos.y };
                        } else {
                            options.target_position = { x: yDir ? connTrgPos : trgDef, y: yDir ? trgDef : connTrgPos };
                        }

                        altSideData = undefined;
                    } else {
                        options.src_position = { x: yDir ? connSrcPos : srcDef, y: yDir ? srcDef : connSrcPos };
                        options.target_position = { x: yDir ? connTrgPos : trgDef, y: yDir ? trgDef : connTrgPos };
                    }
                    $L($node).connection('updateConnection', $connElem);
                }
            },
            getSide = function (conn, levelArr, src, sideObj) {
                conn.forEach(function (item) {
                    var source = src ? item.src.id : item.target.id,
                        target = src ? item.target.id : item.src.id,
                        trgInd = levelArr.indexOf(target),
                        itemInd = levelArr.indexOf(source),
                        sep = level == 'seperate_shapes',
                        srcLevel = obj_format[source].level,
                        targetLevel = obj_format[target].level,
                        side = 'right';// target is same level and target is in same order as item
                    if (srcLevel > targetLevel) {// target is higher level
                        side = "top";
                    } else if (srcLevel < targetLevel) {// target is lower level
                        side = "bottom";
                    } else if (trgInd == -1) {//conn to sep shape
                        side = sep ? "right" : "left";
                    } else if (trgInd > itemInd) {// target is same level and target is higher in dom order
                        side = sep ? "bottom" : "right";
                    } else if (trgInd < itemInd) {// target is same level and target is lower in dom order
                        side = sep ? "top" : "left";
                    }
                    sideObj[side].push(item);
                })
            },
            setSpace = function (id, side, count) {
                var xDir = (side == 'left' || side == 'right'),
                    dim = obj_format[id].dimension[xDir ? 'height' : 'width'],
                    dist = dim / (count + 1),
                    start = dist;

                connData[id][side] = {};
                if (dist < connSpace) {
                    var parts = parseInt(dim / connSpace),
                        lastSpace = dim - (parts * connSpace);
                    start = ((connSpace - lastSpace) / 2) + lastSpace;
                    dist = connSpace;
                    count = Math.floor(dim / dist);
                    connData[id].isFull[side] = true;
                }
                for (var i = start, curLen = 0; i < dim && curLen < count; i += dist) {//count check is there because, sometimes 0.00001 diff occurs
                    var foundVal = parseInt((i / dim) * 100) / 100;
                    if (foundVal && foundVal != 1) {
                        connData[id][side][foundVal] = 0;
                        curLen++;
                    }
                }
            };

        for (var level in data) {//find avail points based size and connections
            var levelArr = data[level];
            levelArr.forEach(function (item) {
                var connections = $node.getConnections('#' + item),
                    sideObj = { top: [], bottom: [], right: [], left: [] };
                getSide(connections.src, levelArr, true, sideObj);
                getSide(connections.target, levelArr, false, sideObj);
                connData[item] = {
                    top: {},
                    bottom: {},
                    right: {},
                    left: {},
                    levelObj: sideObj,
                    lowestCount: 0,
                    isFull: {}
                };
                for (var side in sideObj) {
                    var sideLen = sideObj[side].length;
                    if (sideLen) {
                        if (connSpace) {
                            sideLen += Object.keys(connData[item][side]).length;
                            var curFull = connData[item].isFull[side] || setSpace(item, side, sideLen) || connData[item].isFull[side];
                            if (curFull) {
                                var remaining = sideLen - Object.keys(connData[item][side]).length,
                                    altSides = fallbackSides[side];

                                for (var altSide of altSides) {
                                    if (remaining <= 0) {
                                        break;
                                    }
                                    var beforeLen = Object.keys(connData[item][altSide]).length;
                                    if (connData[item].isFull[altSide]) {
                                        continue;
                                    } else {
                                        setSpace(item, altSide, remaining + beforeLen);
                                    }
                                    remaining -= Object.keys(connData[item][altSide]).length - beforeLen;
                                }
                            }
                        } else {
                            setSpace(item, side, sideLen);
                        }
                    }
                }
            });
        }

        keys.shift();//to handle seperate shapes at last
        keys.push('seperate_shapes');

        keys.forEach(function (level) {
            data[level].forEach(function (item) {
                curData = connData[item];
                var levelObj = curData.levelObj;

                srcPos = to_move[item].position;
                curItem = item;

                for (var side in levelObj) {
                    curSide = side;
                    if (side == 'left' || side == 'right') {
                        levelObj[side].forEach(function (curItem) { setConnPos(curItem) });
                    } else {
                        var arr = levelObj[side],
                            left = 0,
                            right = arr.length - 1;

                        while (left <= right) {//this will itearte in firts, last, first+1, last-1, ...
                            setConnPos(arr[left]);
                            if (left !== right) {
                                setConnPos(arr[right]);
                            }
                            left++;
                            right--;
                        }
                    }
                }
            })
        });
    }

});