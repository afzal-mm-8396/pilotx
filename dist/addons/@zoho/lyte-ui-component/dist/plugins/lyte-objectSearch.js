(function () {
    if ($L) {
        $L.objectSearch = function (param) {
            let resultTreeData;
            if (param.linearData) {
                // <--- commented code for linear search with Nested Input Array --->
                // // Helper function to check if a node's index is a prefix of any target
                // function matchesIndex(nodeIndex, targets) {
                //     return targets.some(target =>
                //         target.index.length >= nodeIndex.length &&
                //         nodeIndex.every((val, i) => val === target.index[i])
                //     );
                // }
                // // Recursive function to filter the tree
                // function filterTree(nodes, targets) {
                //     return nodes
                //         .map(node => {
                //             if (matchesIndex(node.index, targets)) {
                //                 const filteredNode = { ...node };
                //                 if (filteredNode.children) {
                //                     filteredNode.children = filterTree(filteredNode.children, targets);
                //                 }
                //                 return filteredNode;
                //             } else if (node.children) {
                //                 const filteredChildren = filterTree(node.children, targets);
                //                 if (filteredChildren.length > 0) {
                //                     return { ...node, children: filteredChildren };
                //                 }
                //             }
                //             return null; // Exclude nodes that don't match and don't have matching children
                //         })
                //         .filter(Boolean);
                // }
                // function getLinearTree(flatArray) {
                //     const linearSearchResult = findAllPathsToValue(flatArray, "Name", "Arjun");
                //     linearSearchResult.sort((a, b) => a.index.length - b.index.length);
            
                //     let indexedArray = [];
                //     linearSearchResult.forEach(item => {
                //         for (let i = 0; i < item.index.length; i++){
                //             if (indexedArray[i] === undefined) {
                //                 indexedArray[i] = [];
                //             }
                //             indexedArray[i].push(item.index[i]);
                //         }
                //     });
            
                //     return filterTree(this.getData("ltPropData"), linearSearchResult);
                // }
                // <--- commented code for linear search with Nested Input Array --->

                function buildFromFlatArray (flatArray, linearSearchResult) { 
                    ;
                    // Step 1: Create a map of nodes by their id
                    const nodeMap = new Map();
                    flatArray.forEach(function (node) { nodeMap.set(node.id, { ...node }); });
            
                    // Step 2: Collect all nodes we need, including their ancestors
                    const resultSet = new Map();
            
                    function collectNodeAndAncestors(node) {
                        if (!node || resultSet.has(node.id)) { return; }
                            resultSet.set(node.id, { ...node });
                        if (node.parentId) {
                            collectNodeAndAncestors(nodeMap.get(node.parentId));
                        }
                    }
            
                    linearSearchResult.forEach(function ({ index }) {
                        // Find the node matching this index
                        const matchNode = flatArray.find(function (node) { 
                            return node.index && node.index.length === index.length &&
                            node.index.every((val, i) => val === index[i]);
                        });
                        if (matchNode) {
                            collectNodeAndAncestors(matchNode);
                        }
                    });
            
                // Step 3: Convert the resultSet back into a tree structure
                const idToNode = new Map();
                const roots = [];
            
                for (const node of resultSet.values()) {
                const newNode = { ...node, children: [] };
                idToNode.set(node.id, newNode);
                }
            
                for (const node of resultSet.values()) {
                const newNode = idToNode.get(node.id);
                if (node.parentId && idToNode.has(node.parentId)) {
                    idToNode.get(node.parentId).children.push(newNode);
                } else {
                    roots.push(newNode);
                }
                }
            
                // Step 4: Optional - remove empty children arrays
                    function pruneNodes(node) {
                        if (node.children.length === 0) { delete node.children }
                        else { node.children.forEach(pruneNodes) };
                }
                roots.forEach(pruneNodes);
            
                // Final result
                    // console.log(JSON.stringify(roots, null, '\t'));
                    return roots;
                }

                function findAllPathsToValue(flatArray, key, value) {
                    return flatArray.filter(function (item) { return item[key].toLowerCase() === value || item[key].toLowerCase().includes(value); });
                }
                const linearSearchResult = findAllPathsToValue(param.dataArray, param.key, param.value.toLowerCase());
                return buildFromFlatArray(param.dataArray, linearSearchResult);
            } else { 
                if (param.wantChildren) {

                    function cloneWithAllChildren(node) {
                        return {
                            [param.key] : node[param.key],
                            children: node.children?.map(cloneWithAllChildren) || []
                        };
                    }
                    
                    function findPathsToTarget(data, key, target) {
                        const results = [];
                    
                        function dfs(node, path) {
                            const newPath = [...path, node];
                    
                            if (node[key] === target) {
                                // Clone the match with all children
                                const fullMatch = cloneWithAllChildren(node);
                                results.push([...path, fullMatch]);
                            }
                    
                            if (node.children) {
                                for (const child of node.children) {
                                    dfs(child, newPath);
                                }
                            }
                        }
                    
                        for (const item of data) {
                            dfs(item, []);
                        }
                    
                        return results;
                    }
                    
                    // Merge multiple paths into a tree
                    function mergePaths(paths, key, target) {
                        const rootMap = new Map();
                    
                        for (const path of paths) {
                            let currentLevel = rootMap;
                    
                            for (const node of path) {
                                if (!currentLevel.has(node[key])) {
                                    currentLevel.set(node[key], {
                                        [key] : node[key],
                                        childrenMap: new Map()
                                    });
                                }
                                currentLevel = currentLevel.get(node[key]).childrenMap;
                            }
                    
                            // Add children to the final node (the matched "Arjun")
                            const lastNode = path[path.length - 1];
                            for (const child of lastNode.children || []) {
                                if (!currentLevel.has(child[key])) {
                                    currentLevel.set(child[key], {
                                        [key]: child[key],
                                        childrenMap: new Map()
                                    });
                                }
                            }
                        }
                    
                        function toTree(map) {
                            return [...map.values()].map(entry => ({
                                [key] : entry[key],
                                children: toTree(entry.childrenMap)
                            }));
                        }
                    
                        return toTree(rootMap);
                    }
                    
                    function printTree(tree, indent = "") {
                        for (const node of tree) {
                            console.log(indent + node[param.key]);
                            printTree(node.children, indent + "    ");
                        }
                    }
                    
                    // Run:
                    const resultPaths = findPathsToTarget(param.dataArray, param.key, param.value);
                    const tree = mergePaths(resultPaths, param.key, param.value);
                    resultTreeData = tree;
                    // printTree(tree);
                    
                } else { 
    
                  // their case working model
                    function buildMergedPathTree (data, key, target) {
                        const mergedTree = [];
                    
                        function dfs(nodeArray, path) {
                            for (const node of nodeArray) {
                                const newPath = [...path, node[key]];
                    
                                if (node[key].toLowerCase() === target || node[key].toLowerCase().includes(target)) {
                                    insertPath(mergedTree, newPath);
                                }
                    
                                if (node.children && node.children.length > 0) {
                                    dfs(node.children, newPath);
                                }
                            }
                        }
                    
                        function insertPath(tree, path) {
                            let currentLevel = tree;
                    
                            for (const segment of path) {
                                // Check if segment already exists at current level
                                let existing = currentLevel.find(node => node[key] === segment);
                                if (!existing) {
                                    existing = { [key]: segment, children: [] };
                                    currentLevel.push(existing);
                                }
                                currentLevel = existing.children;
                            }
                        }
                    
                        dfs(data, []);
    
                        // printTree(mergedTree);
                        return mergedTree;
                    }
    
                    function printTree(tree, indent = "") {
                        for (const node of tree) {
                            console.log(indent + node[param.key]);
                            if (node.children && node.children.length > 0) {
                                printTree(node.children, indent + "    ");
                            }
                        }
                    }
                    resultTreeData = buildMergedPathTree(param.dataArray, param.key, param.value.toLowerCase());
                }  
            }
            return resultTreeData;
        };
    }
})();



// Case for commented code:
// dataArray
// [
// 	{
// 		"Name": "Car",
// 		"index": [0],
// 		"children": [
// 			{
// 				"Name": "SKODA",
// 				"index": [0, 0],
// 				"children": [
// 					{
// 						"Name": "Rapid",
// 						"index": [0, 0, 0]
// 					},
// 					{
// 						"Name": "Arjun",
// 						"index": [0, 0, 1]
// 					}
// 				]
// 			},
// 			{
// 				"Name": "Audi",
// 				"index": [0, 1],
// 				"children": [
// 					{
// 						"Name": "A3",
// 						"index": [0, 1, 0],
// 						"children": [
// 							{
// 								"Name": "A3",
// 								"index": [0, 1, 0, 0]
// 							},
// 							{
// 								"Name": "A4",
// 								"index": [0, 1, 0, 1]
// 							},
// 							{
// 								"Name": "Arjun",
// 								"index": [0, 1, 0, 2]
// 							}
// 						]
// 					},
// 					{
// 						"Name": "A4",
// 						"index": [0, 1, 1]
// 					},
// 					{
// 						"Name": "Arjun",
// 						"index": [0, 1, 2]
// 					},
// 					{
// 						"Name": "Q7",
// 						"index": [0, 1, 3]
// 					}
// 				]
// 			}
// 		]
// 	}
// ]
// Expected Output
// [
// 	{
// 		"Name": "Car",
// 		"index": [0],
// 		"children": [
// 			{
// 				"Name": "SKODA",
// 				"index": [0, 0],
// 				"children": [
// 					{
// 						"Name": "Arjun",
// 						"index": [0, 0, 1]
// 					}
// 				]
// 			},
// 			{
// 				"Name": "Audi",
// 				"index": [0, 1],
// 				"children": [
// 					{
// 						"Name": "A3",
// 						"index": [0, 1, 0],
// 						"children": [
// 							{
// 								"Name": "Arjun",
// 								"index": [0, 1, 0, 2]
// 							}
// 						]
// 					},
// 					{
// 						"Name": "Arjun",
// 						"index": [0, 1, 2]
// 					}
// 				]
// 			}
// 		]
// 	}
// ]
// In Hold
// [
//     {
//         "Name": "Arjun",
//         "index": [
//             0,
//             0,
//             1
//         ]
//     },
//     {
//         "Name": "Arjun",
//         "index": [
//             0,
//             1,
//             2
//         ]
//     },
//     {
//         "Name": "Arjun",
//         "index": [
//             0,
//             1,
//             0,
//             2
//         ]
//     }
// ]