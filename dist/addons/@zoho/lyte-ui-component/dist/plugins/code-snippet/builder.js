(function () {
    $L.snippets = {
        getBuilder: function (language, str) {
            return new builder(language, str);
        }
    };

    var builder = function (language, str) {
        this.tokenizer = $L.snippets.getTokenizer(language, str);
    }

    var space = {
        "value": " ",
        "tokenInfo": {
            "token": "whitespace"
        }
    };
    /**
     * Create a whitepsace token with the given value
     * @param {string} value 
     * @returns the whitespace token
     */
    function createWhitespaceToken(value) {
        return {
            value: value,
            tokenInfo: {
                token: "whitespace"
            }
        };
    }

    /**
     * The tab spaces are added based on the number of nested blocks
     * Used for CSS, HTML, JSON, XML, JS
     * @param {int} nestedLoop the number of loops
     * @returns the whitespace string after adding required number of tab spaces
    */
    function addTabSpaces(nestedLoop) {
        var tabSpaces = "";
        for (let i = 0; i < nestedLoop; i++) {
            tabSpaces = tabSpaces + '\t';
        }
        tabSpaces = "\n" + tabSpaces
        return tabSpaces
    }

    /**
     * Used to find the end of the corresponding Switch block of java and javascript
     * @param {object} tokens The tokens array
     * @param {int} startIndex The index where the corresponding block starts
     * @returns the end index of switch block
     */
    function identifySwitchEnd(tokens, startIndex) {
        var nestedBlocks = 0;
        for (var i = startIndex; i < tokens.length; i++) {
            var token = tokens[i];
            var value = token.value;

            if (value === '{') {
                nestedBlocks++;
            }
            else if (value === '}') {
                if (nestedBlocks === 1) {
                    return i;
                }
                nestedBlocks--;
            }
        }
        return 0
    }

    /**
     * used to identify each case blocks of a switch statements of Java and Javascript
     * @param {object} tokens
     * @param {int} index
     * @returns the end index of the corresponding case block
     */
    function identifyCaseBlocks(tokens, index) {
        for (let i = index; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;

            if (tokenValue === 'case' || tokenValue === 'default') {
                var endIndex = i - 1;
                return endIndex;
            }
        }
        return tokens.length - 1;
    }

    // CSS
    /**
     * Add spaces, tab spaces and new line to indent the code
     * @param {object} tokens
     * @returns the indented tokens array
     */
    function indentCss(tokens) {
        let nestedLoop = 0;
        const newTokens = [];
        const space = { value: " ", tokenInfo: { token: "whitespace" } };

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const { tokenInfo, value: tokenValue } = token;
            const tokenType = tokenInfo.token;
            const nextToken = tokens[i + 1];
            var nextTokenValue = nextToken && nextToken.value;
            var nextTokenType = nextToken && nextToken.tokenInfo.token;


            if (tokenType === 'punctuation') {
                if (tokenValue === '{') {
                    nestedLoop++;
                    newTokens.push(token, createWhitespaceToken(addTabSpaces(nestedLoop)));
                }
                else if (tokenValue === '}') {
                    nestedLoop--;
                    newTokens.push(token);
                    if (i !== tokens.length - 1) {
                        const indentLevel = (nextTokenType === 'selector') ? nestedLoop : nestedLoop - 1;
                        newTokens.push(createWhitespaceToken(addTabSpaces(indentLevel)));
                    }
                }
                else if (tokenValue === ';') {
                    newTokens.push(token);
                    const indentLevel = (nextTokenValue === '}') ? nestedLoop - 1 : nestedLoop;
                    newTokens.push(createWhitespaceToken(addTabSpaces(indentLevel)));
                }
                else if (tokenValue === ':') {
                    newTokens.push(token, space);
                }
                else if (tokenValue === '=') {
                    newTokens.push(space, token, space);
                }
                else {
                    newTokens.push(token);
                }
            }

            else if (tokenType === 'whitespace') {
                if (!/^[\s\t\n]*$/.test(tokenValue)) {
                    newTokens.push(token, space);
                } else {
                    newTokens.push(token);
                }
            }

            else if (tokenType === 'selector') {
                if (nextTokenValue && nextTokenValue !== '{' && nextTokenValue !== '[') {
                    token.value = tokenValue.replace(/,/g, ", ");
                    newTokens.push(token, space);
                } else {
                    newTokens.push(token);
                }
            }

            else if (tokenType === 'rule-value') {
                newTokens.push(token);
                if (nextToken && !nextToken.value.startsWith(';')) {
                    newTokens.push(space);
                }
            }

            else if (tokenType === 'rule-name') {
                const lastToken = newTokens[newTokens.length - 1];
                if (!lastToken.value.includes('\n') && lastToken.tokenInfo.token !== 'whitespace') {
                    newTokens.push(createWhitespaceToken(addTabSpaces(tokenValue, nestedLoop)), token);
                } else {
                    newTokens.push(token);
                }
            }

            else if (tokenType === 'comment' || tokenType === 'media-words') {
                newTokens.push(token);
                if (nextTokenType && nextTokenType !== 'whitespace' && !nextTokenValue.includes('\n')) {
                    newTokens.push(createWhitespaceToken(tokenType === 'comment' ? "\n" : " "));
                }
            }

            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }

    /**
     * Manages the indentation of CSS code
     * remove the whitespaces and clean the code
     * @param {object} tokens
     * @returns the indented array
     */
    function handleCSS(tokens) {
        var newTokens = [];

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;

            if (tokenType === 'whitespace') {
                if (/^[\s\t\n]*$/.test(tokenValue)) {
                    // Skip adding this token (remove it)
                    continue;
                } else {
                    var replacedStr = tokenValue.replace(/[^\S\n\t]+/g, '').trim();
                    var whitespace = { value: replacedStr, tokenInfo: { token: 'whitespace' } };
                    newTokens.push(whitespace);
                }
            }
            else if (tokenType === 'selector' || tokenType === 'rule-name' || tokenType === 'rule-value') {
                tokenValue = tokenValue.trim();
                token.value = tokenValue;
                newTokens.push(token);
            }
            else {
                // For any other token types, just keep them as they are
                newTokens.push(token);
            }
        }

        newTokens = indentCss(newTokens);
        return newTokens;
    }

    // JSON
    /**
     * Find the json object blocks and indent them rightly
     * @param {object} tokens
     * @returns the tokens array
    */
    function handleObject(tokens) {
        tokens = tokens.filter(t => t.tokenInfo.token !== 'whitespace');

        let nestedLoops = 0;
        let newTokens = [];

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let tokenType = token.tokenInfo.token;
            let tokenValue = token.value;
            let nextToken = tokens[i + 1];

            newTokens.push(token);

            if (tokenType === 'punctuation' || tokenType === 'punctuator') {
                if (tokenValue === '{') {
                    nestedLoops++;
                    if (nextToken && nextToken.value !== "}") {
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else if (tokenValue === '}') {
                    nestedLoops--;
                    let prevToken = newTokens[newTokens.length - 2]; // because last token is the '}'
                    if (prevToken && prevToken.tokenInfo.token !== 'whitespace' && prevToken.value !== '{') {
                        // Insert whitespace before '}'
                        newTokens.splice(newTokens.length - 1, 0, createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else if (tokenValue === ',') {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
                else if (tokenValue === ':') {
                    if (nextToken && nextToken.tokenInfo.token !== 'whitespace') {
                        newTokens.push(space);
                    }
                }
            }
        }

        return newTokens;
    }

    // JS
    /**
     * Manages the spacing of parenthesis, ie, the conditions of if, else if and while blocks
     * @param {integer} startIndex
     * @param {object(Array)} tokens
     * @returns the updated tokens
     */
    function handleCondBlock(startIndex, tokens) {
        var loop = 0;
        var newTokens = [];
        const space = { value: " ", tokenInfo: { token: "whitespace" } };
        for (let i = startIndex; i < tokens.length; i++) {
            const token = tokens[i];
            var tokenValue = token.value;
            var tokenType = token.tokenInfo.token;
            let nextToken, nextTokenType;
            let prevToken, prevTokenType, prevTokenValue;

            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenType = nextToken.tokenInfo.token;
            }
            if (i > 0) {
                prevToken = newTokens[newTokens.length - 1] || tokens[i - 1];
                // prevToken = newTokens[i - 1] || tokens[i-1];
                prevTokenType = prevToken.tokenInfo.token;
                prevTokenValue = prevToken.value;
            }

            if (tokenType === "opening-punctuator") {
                newTokens.push(token);
                if (tokenValue === "(") {
                    // if (prevTokenType !== "closing-punctuator" && prevTokenType !== "opening-punctuator" && prevTokenType !== "punctuator" && nextTokenType !== "punctuator" && nextTokenType !== "opening-punctuator" && nextTokenType !== "closing-punctuator" && nextTokenType !== "whitespace") {
                    //     newTokens.push(space);
                    // }
                    loop++;
                }
            }
            else if (tokenType === "closing-punctuator") {
                if (tokenValue === ")") {
                    loop--;
                    // if (prevTokenType !== "closing-punctuator" && prevTokenType !== "opening-punctuator" && prevTokenType !== "punctuator" && prevTokenType !== "whitespace") {
                    //     newTokens.push(space);
                    // }
                    newTokens.push(token, space);

                    if (loop === 0) {
                        return ({ endIndex: i, tokens: newTokens });
                    }
                } else {
                    newTokens.push(token);
                }
            }
            else if (tokenType === "punctuator") {
                if (tokenValue === ";") {
                    if (nextToken) {
                        if (prevTokenValue === "(") {
                            newTokens.push(space);
                        }
                        newTokens.push(token);
                        if (nextTokenType !== "whitespace") {
                            newTokens.push(space);
                        }
                    }
                    else {
                        newTokens.push(token, space);
                    }
                } else {
                    newTokens.push(token);
                }
            }
            else if (tokenType === "keyword" && nextTokenType !== "operator" && nextTokenType !== "punctuator" && nextTokenType !== "closing-punctuator" && nextTokenType !== "opening-punctuator") {
                newTokens.push(token, space);
            }

            else if (tokenType === "operator" && tokenValue !== ".") {
                if (prevTokenType !== "whitespace") {
                    if (!(tokenValue === "++" || tokenValue === "--" || tokenValue === "**" || tokenValue === "-")) {
                        newTokens.push(space);
                    }
                }
                newTokens.push(token);
                if (tokenValue !== "!" && tokenValue !== "-" && nextTokenType !== "whitespace") {
                    newTokens.push(space);
                }

            }
            else if (tokenType === "function-call") {
                newTokens.push(token, space);
            }
            else {
                newTokens.push(token);
            }

        }
        return ({ endIndex: 0, tokens: newTokens });
    }

    /**
     * New line characters and tab spaces are added based on the number of blocks
     * @param {object} tokens
     * @returns the tokens with added new line, tab spaces and spaces as whitespace token
     */
    function indentJs(tokens) {
        var nestedLoops = 0;
        var newTokens = [];
        var tokenPushed;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;
            let nextToken, nextTokenValue, nextTokenType, prevToken, prevTokenValue, prevTokenType;

            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenValue = nextToken.value;
                nextTokenType = nextToken.tokenInfo.token;
            }
            if (i - 1 >= 0) {
                prevToken = newTokens[newTokens.length - 1];
                prevTokenValue = prevToken.value;
                prevTokenType = prevToken.tokenInfo.token;
            }

            if (tokenType === "punctuator" || tokenType === "opening-punctuator" || tokenType === "closing-punctuator") {
                if (tokenValue === "{") {
                    nestedLoops++;
                }
                else if (tokenValue === "}") {
                    nestedLoops--;

                }
                // if (tokenValue === "[" && prevTokenValue !== "{") {
                //     // if (tokenValue === "[" && prevTokenValue !== "(" && prevTokenValue !== "{") {
                //     squareLoops++;
                // }
                // else if (tokenValue === "]") {
                //     squareLoops--;
                //     if (squareLoops < 0) {
                //         squareLoops = 0;
                //     }

                // }

                if (tokenValue === ';') {
                    newTokens.push(token);
                    if (i !== tokens.length - 1) {
                        if (nextToken && nextTokenValue === "}" && nextTokenType !== "whitespace") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        }
                        else if (nextToken && nextTokenType !== "whitespace") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                }
                else if (tokenValue === '{') {
                    newTokens.push(token);
                    if (nextToken && nextTokenValue !== "}" && nextTokenType !== "whitespace") {
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else if (tokenValue === '}') {
                    var tokenPushed = false;
                    if (prevTokenValue !== "{") {
                        // if (prevTokenValue !== "{" && nextTokenValue !== ",") {
                        if (prevToken && prevTokenType !== "whitespace") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                        if (i - 1 >= 0) {
                            prevToken = newTokens[newTokens.length - 1];
                            prevTokenValue = prevToken.value;
                            prevTokenType = prevToken.tokenInfo.token;
                        }
                        if (i + 1 < tokens.length) {
                            nextToken = tokens[i + 1];
                            nextTokenValue = nextToken.value;
                            nextTokenType = nextToken.tokenInfo.token;
                        }
                        if (nextToken && nextTokenValue !== ")" && nextTokenValue !== "," && nextTokenValue !== "." && nextTokenValue !== ";" && nextTokenValue !== "]" && nextTokenValue !== "else" && nextTokenValue !== "catch" && nextTokenValue !== "finally" && i !== tokens.length - 1) {
                            if (prevToken && (prevTokenType !== "whitespace") && prevTokenValue !== "{") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                            newTokens.push(token);
                            tokenPushed = true;
                            if (nextToken && (nextTokenType === "function-call" || nextTokenType === "comment" || nextTokenType === "Indentifier" || nextTokenType === "keyword")) {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                            else if (nextToken && nextTokenType !== "whitespace") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                            }
                        }
                        else if (nextToken && nextTokenValue === ")") {
                            if (i + 2 < tokens.length && (tokens[i + 2].value === "," || tokens[i + 2].value === ";") && i + 2 !== tokens.length - 1) {
                                if (i + 3 < tokens.length && tokens[i + 3].value !== "}" && tokens[i + 3].tokenInfo.token !== "whitespace") {
                                    // }),
                                    // });
                                    newTokens.push(token, nextToken, tokens[i + 2], createWhitespaceToken(addTabSpaces(nestedLoops)));
                                    tokenPushed = true;
                                    // var tab_spaces = addTabSpaces(nestedLoops);
                                    // tokens.splice(i + 3, 0, {
                                    //     "value": tab_spaces,
                                    //     "tokenInfo": {
                                    //         "token": "whitespace"
                                    //     }
                                    // });
                                    i = i + 2;
                                }
                            }
                        }
                        else if (nextToken && nextTokenValue === "," && i + 1 !== tokens.length - 1) {
                            if (i + 2 < tokens.length && tokens[i + 2].value === "}") {
                                // var tab_spaces = addTabSpaces(nestedLoops - 1)
                                // tokens.splice(i + 2, 0, {
                                //     "value": tab_spaces,
                                //     "tokenInfo": {
                                //         "token": "whitespace"
                                //     }
                                // });
                                tokenPushed = true;
                                newTokens.push(token, nextToken, createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                                i++;
                            }
                            else if (i + 2 < tokens.length && tokens[i + 2].tokenInfo.token !== "whitespace") {
                                // var tab_spaces = addTabSpaces(nestedLoops)
                                // tokens.splice(i + 2, 0, {
                                //     "value": tab_spaces,
                                //     "tokenInfo": {
                                //         "token": "whitespace"
                                //     }
                                // });
                                tokenPushed = true;

                                newTokens.push(token, nextToken, createWhitespaceToken(addTabSpaces(nestedLoops)));
                                i++;
                            }
                            else if (i + 2 < tokens.length) {
                                tokenPushed = true;

                                newTokens.push(token, nextToken, createWhitespaceToken(addTabSpaces(nestedLoops)));
                                // var tab_spaces = addTabSpaces(nestedLoops)
                                // tokens.splice(i + 2, 0, {
                                //     "value": tab_spaces,
                                //     "tokenInfo": {
                                //         "token": "whitespace"
                                //     }
                                // });
                                i++;
                            }
                        }
                        // else if (nextToken && nextTokenValue === "]") {
                        //     tokenPushed = true;
                        //     newTokens.push(token);
                        //     if ((nestedLoops) > 1) {
                        //         newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        //     }
                        // }
                        else if (nextToken && (nextTokenValue === "else" || nextTokenValue === "catch" || nextTokenValue === "finally")) {
                            tokenPushed = true;
                            newTokens.push(token, createWhitespaceToken(' '));
                        }
                    }
                    else if (nextToken && nextTokenValue === "," && i + 1 !== tokens.length - 1) {
                        if (i + 2 < tokens.length && tokens[i + 2].tokenInfo.token !== "whitespace") {
                            i++;
                            newTokens.push(token, nextToken, createWhitespaceToken(addTabSpaces(nestedLoops)));
                            tokenPushed = true;
                        }
                    }

                    if (!tokenPushed) {
                        newTokens.push(token);
                    }
                }
                else if (tokenValue === ",") {
                    newTokens.push(token);
                    if (nestedLoops > 0) {
                        if (nextToken) {
                            if (nextTokenType === "literal" || nextTokenType === "Indentifier" || nextTokenType === "string") {
                                if (i + 2 < tokens.length) {
                                    var next2Token = tokens[i + 2];
                                    if (next2Token.value === ":") {
                                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));

                                    } else {
                                        newTokens.push(createWhitespaceToken(' '));
                                    }
                                }
                            } else {
                                newTokens.push(createWhitespaceToken(' '));
                            }
                        }
                    }
                    else if (nextTokenType !== "whitespace") {
                        newTokens.push(createWhitespaceToken(' '));
                    }
                }
                    // else if (tokenValue === "(" && nextTokenValue !== "{" && nextTokenValue !== "[" && nextTokenValue !== ")") {
                    //     newTokens.push(token, createWhitespaceToken(' '));
                    // }
                    // else if (tokenValue === ")" && prevTokenValue !== "}" && prevTokenValue !== ")" && prevTokenValue !== "]" && prevTokenValue !== "(") {
                    //     newTokens.push(createWhitespaceToken(' '), token);
                    // }
                // else if (tokenValue === '[' && (nextTokenType === "Indentifier" || nextTokenType === "keyword" || nextTokenType === "literal")) {
                else if (tokenValue === '[') {
                    if (nextTokenType === "Indentifier" || nextTokenType === "keyword" || nextTokenType === "literal") {
                        if (prevToken && prevTokenType !== "whitespace" && prevTokenType !== "Indentifier") {
                            newTokens.push(createWhitespaceToken(' '), token);
                        }
                        else {
                            newTokens.push(token);
                        }
                    } else {
                        newTokens.push(token);
                    }
                }
                // else if (tokenValue === ']' && (prevTokenType === "Indentifier" || prevTokenType === "keyword" || prevTokenType === "literal")) {
                else if (tokenValue === ']') {
                    var tokenPushed = false;
                    if (prevTokenType === "Indentifier" || prevTokenType === "keyword" || prevTokenType === "literal") {
                        if (i - 2 >= 0) {
                            var prev2Token = tokens[i - 2];
                            var prev2TokenValue = prev2Token.value;
                            if (prev2TokenValue === '[' || prev2TokenValue === ',') {
                                newTokens.push(token);
                                tokenPushed = true;
                            }
                        }
                        if (tokenPushed === false) {
                            if (nextToken && nextTokenValue !== '}') {
                                newTokens.push(token, createWhitespaceToken(' '));
                            } else {
                                if (nestedLoops >= 0) {
                                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 1)), token);
                                } else {
                                    newTokens.push(token);
                                }
                            }
                        }
                    } else {
                        newTokens.push(token);
                    }
                }
                // Dealing the objects of javascript
                else if (tokenValue === ":") {
                    newTokens.push(token);
                    if (nextToken) {
                        newTokens.push(createWhitespaceToken(' '));
                        if (nextTokenType === "literal" || nextTokenType === "Indentifier" || nextTokenType === "string") {
                            if (i + 2 < tokens.length) {
                                let next2Token = tokens[i + 2];
                                let next2TokenValue = next2Token.value;
                                if (next2TokenValue === ",") {
                                    newTokens.push(nextToken, next2Token, createWhitespaceToken(addTabSpaces(nestedLoops)));
                                    i = i + 2;
                                    continue;
                                }
                            }
                        }
                    }
                    // if (nextToken && nextTokenType !== "whitespace") {
                    //     newTokens.push(createWhitespaceToken(' '));
                    // }
                }
                else {
                    newTokens.push(token);
                }
            }
            else if (tokenType === 'comment') {
                if (i !== 0 && prevToken && prevTokenType !== "whitespace") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
                else if (i !== 0 && prevToken && prevTokenType === "whitespace" && !prevTokenValue.includes("\n")) {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
                newTokens.push(token);
                if (nextTokenValue === "}") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                }
                else if (i !== tokens.length - 1 && nextTokenType !== "whitespace") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
            }
            else if (tokenType === "operator" && tokenValue !== "." && tokenValue !== "-" && tokenValue !== "\\") {
                var tempTokenFlag = false;
                if (prevTokenType !== "whitespace" && prevTokenType !== "operator" && tokenValue !== "++" && tokenValue !== "--" && tokenValue !== "**") {
                    newTokens.push(createWhitespaceToken(' '), token);
                    tempTokenFlag = true;
                }
                if (tokenValue !== "!" && nextTokenType !== "whitespace" && nextTokenType !== "operator" && nextTokenValue !== ";") {
                    if (!tempTokenFlag) {
                        newTokens.push(token);
                    }
                    tempTokenFlag = true;
                    newTokens.push(createWhitespaceToken(' '));
                }
                if (!tempTokenFlag) {
                    newTokens.push(token);
                }

            }
            else if (tokenType === "keyword" || tokenType === "function-call") {
                tokenValue = tokenValue.trim();
                tokens[i].value = tokenValue;
                if (tokenValue === "else" || tokenValue === "catch" || tokenValue === "finally") {

                    newTokens.push(token, createWhitespaceToken(' '));
                }
                else if (nextTokenType !== "operator" && nextTokenType !== "punctuator" && nextTokenType !== "opening-punctuator" && tokenValue !== 'for' && tokenValue !== 'if' && tokenValue !== 'while') {
                    newTokens.push(token, createWhitespaceToken(' '));
                }
                else if (tokenValue === "return") {
                    newTokens.push(token, createWhitespaceToken(' '));
                }
                else {
                    if (tokenValue !== 'for' && tokenValue !== 'if' && tokenValue !== 'while') {
                        newTokens.push(token);
                    }
                }
                if (tokenValue === "if" || tokenValue === "for" || tokenValue === "while") {
                    if (prevToken && prevTokenType !== "whitespace") {
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                    var result = handleCondBlock(i, tokens);
                    var condTokens = result.tokens;
                    for (var j = 0; j < condTokens.length; j++) {
                        newTokens.push(condTokens[j]);
                    }
                    if (result.endIndex !== 0) {
                        i = result.endIndex;
                        var j = result.endIndex;
                        // tokens = result.tokens
                        if (i + 1 < tokens.length) {
                            var tempToken = tokens[j + 1];
                            var tempTokenValue = tempToken.value;

                            if (tempTokenValue !== "{" && tempTokenValue !== ";") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 1)));
                            }
                        }
                    }
                }
                if (tokenValue === "switch") {
                    var switchEnd = identifySwitchEnd(tokens, i);
                    if (switchEnd > 0) {
                        var switchBlock = tokens.slice(i + 1, switchEnd + 1);
                        const part1 = tokens.slice(0, i + 1);
                        const newPart1 = JSON.parse(JSON.stringify(part1));
                        const part3 = tokens.slice(switchEnd + 1, tokens.length);
                        const newPart3 = JSON.parse(JSON.stringify(part3));
                        var newPart2 = indentSwitchJs(switchBlock, nestedLoops);
                        tokens = newPart1.concat(newPart2, newPart3);
                    }
                }
            }
            else if (tokenType === "Indentifier") {
                newTokens.push(token);
                if (nextToken && nextTokenType !== "operator" && nextTokenType !== "punctuator" && nextTokenType !== "opening-punctuator" && nextTokenType !== "closing-punctuator") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
            }
            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }

    /**
    * Handles the indentation of the switch blocks in Js
    * @param {object} tokens
    * @returns the tokens array
    */
    function indentSwitchJs(tokens, nestedLoops) {
        var newTokens = [];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;
            if (i > 0) {
                var prevTokenType = newTokens[newTokens.length - 1].tokenInfo.token
            }
            if (tokenValue === 'case' || tokenValue === 'default') {
                if (prevTokenType !== "whitespace") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 1)));
                }
                var startIndex = i + 1;
                var end = identifyCaseBlocks(tokens, startIndex);
                while (i < end) {

                    var token = tokens[i];
                    var tokenValue = token.value;
                    var tokenType = token.tokenInfo.token
                    let nextToken, nextTokenValue, nextTokenType;

                    if (i + 1 < tokens.length) {
                        nextToken = tokens[i + 1];
                        nextTokenValue = tokens[i + 1].value;
                        nextTokenType = tokens[i + 1].tokenInfo.token;
                    }
                    if (tokenType === "punctuator") {
                        newTokens.push(token);
                        if (tokenValue === ":") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 2)));
                        }
                        else if (tokenValue === ";" && nextTokenValue !== "case" && nextTokenValue !== "default") {
                            if (nextToken && nextTokenValue === "}" && nextTokenType !== "whitespace") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                            else if (nextToken && nextTokenType !== "whitespace") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 2)));
                            }
                        }

                    }
                    else if (tokenType === "comment") {
                        newTokens.push(token);
                        if (nextToken && nextTokenValue !== "}") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 2)));
                        }
                        if (nextToken && nextTokenValue === "}") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                    else {
                        newTokens.push(token);
                    }
                    i++;
                }
                i--;
            }
            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }
    /**
     * Remove the whitespaces of Js and add the right indentation
     * @param {object} tokens
     * @returns the tokens array
     */
    function handleJs(tokens) {
        // Remove end trailing whitespace
        var whitespacePattern = /^[\s\n\t]*$/;
        var endIndex = tokens.length;
        if (tokens[endIndex - 1].tokenInfo.token === 'whitespace' && whitespacePattern.test(tokens[endIndex - 1].value)) {
            tokens.splice(endIndex - 1, 1)
        }

        //remove all the whitespaces
        tokens = tokens.filter(t => t.tokenInfo.token !== 'whitespace');
        tokens = indentJs(tokens);
        return tokens;
    }

    // HTML
    /**
     * Identify the end index of the corresponding html tag
     * Used in the case of style and script tags
     * @param {object} tokens
     * @param {int} startIndex
     * @param {*string} startingTag
     * @returns the end index of the html tag block
     */
    function identifyEndHtml(tokens, startIndex, startingTag) {
        var nestedBlocks = 0;
        for (var i = startIndex + 2; i < tokens.length; i++) {
            var token = tokens[i];

            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;

            if (tokenType === 'tag-name') {
                if (tokenValue === startingTag) {
                    var prevValue = tokens[i - 1].value;
                    if (prevValue === '</') {
                        if ((i + 1 < tokens.length) && (tokens[i + 1].value === '>')) {
                            if (nestedBlocks === 0) {
                                return i + 1;
                            }
                            else {
                                nestedBlocks--;
                            }
                        }
                    }
                    else {
                        nestedBlocks++;
                    }
                }
            }
        }
        return 0
    }

    /**
     * Removes the unwanted spacings and remove them
     * @param {object} tokens
     * @returns the tokens array
     */
    function trimSpacesHtml(tokens) {
        tokens = tokens.filter(t => t.tokenInfo.token !== 'whitespace' && !/^[\n\t\s]*$/.test(t.value));
        return tokens;
    }

    /**
    * Add indentation for tokens inside script and style tags
    * @param {object} tokens
    * @returns the tokens array
    */
    function indentSpecialTagsHtml(tokens, nestedLoops, blockName) {
        var tabSpaces = addTabSpaces(nestedLoops)
        tabSpaces = tabSpaces.replace(/\n/g, '');
        var new_line_tabspace
        if (nestedLoops > 1) {
            var tab_spaces = tabSpaces;
            new_line_tabspace = {
                "value": "\n" + tabSpaces,
                "tokenInfo": {
                    "token": "whitespace"
                }
            };
        }
        else {
            tab_spaces = "\t";
            new_line_tabspace = {
                "value": "\n\t",
                "tokenInfo": {
                    "token": "whitespace"
                }
            };
        }

        // indent CSS can't be used because trailing spaces has to be eliminated
        if (blockName === "style") {
            tokens = handleCSS(tokens)
        }
        else if (blockName === "script") {
            tokens = indentJs(tokens)
        }

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;
            var tokenType = token.tokenInfo.token;
            let nextTokenValue, nextToken;

            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenType = nextToken.tokenInfo.token;
                nextTokenValue = nextToken.value;
            }
            if (tokenType === "whitespace" && tokenValue.includes("\n")) {
                if (nextToken && nextTokenValue === '}') {
                    tokenValue = tokenValue + tab_spaces;
                }
                else {
                    tokenValue = tokenValue + tab_spaces;
                }
                token.value = tokenValue;
                tokens[i] = token;
            }
        }
        tokens.unshift(new_line_tabspace)
        return tokens;
    }

    /**
     * Add different class for quotes of attribute values
     * return the new token array
     */
    function splitAttributeValue(tokens, i) {
        var token = tokens[i];
        var tokenValue = token.value;
        var tokenInfo = Lyte.deepCopyObject(token.tokenInfo);
        if (tokenValue.startsWith('"') || tokenValue.startsWith("'")) {
            tokenInfo.class = 'lyteAttributeValQuoteCls';
            var newToken = {
                value: tokenValue[0],
                tokenInfo: tokenInfo
            }
            var part1 = tokens.slice(0, i);
            var part2 = tokens.slice(i + 1);
            tokenValue = tokenValue.slice(1, tokenValue.length - 1);
            token.value = tokenValue;
            var newTokens = [newToken, token, Lyte.deepCopyObject(newToken)];
        }
        return newTokens;
    }
    /**
     * Add indentation using the count of nested tags
     * @param {object} tokens
     * @returns
     */
    function indentHtml(tokens) {
        var nestedLoops = 0;
        var newTokens = [];

        var blockName = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;
            var tokenType = token.tokenInfo.token;
            let prevToken, prevTokenType, prevTokenValue;
            let nextToken, nextTokenType, nextTokenValue;
            var spaces = "";
            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenValue = nextToken.value;
                nextTokenType = nextToken.tokenInfo.token;
            }
            if (i > 0) {
                prevToken = newTokens[newTokens.length - 1];
                prevTokenValue = prevToken.value;
                prevTokenType = prevToken.tokenInfo.token;
            }

            if (tokenType === "punctuation") {
                if (tokenValue === "<") {
                    if (nextToken && nextTokenType === "tag-name") {
                        nestedLoops++;
                    }
                    if (prevToken && prevTokenType !== "whitespace") {
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                    }
                    newTokens.push(token);
                }
                else if (tokenValue === "</") {
                    if (blockName !== "textarea") {
                        if (nextToken && nextTokenType !== "whitespace" && prevTokenType !== "content") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        }
                        else if (!nextToken) {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        }
                    }
                    newTokens.push(token);
                    nestedLoops--;
                }

                else if (tokenValue === ">") {
                    newTokens.push(token);
                    if (blockName !== "textarea") {
                        if (nextToken && (nextTokenValue === "<" || nextTokenType === "comment")) {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                }
                else if (tokenValue === '/>') {
                    nestedLoops--;
                    newTokens.push(token);
                    if (nextToken && nextTokenType !== "whitespace" && nextTokenValue !== "</") {
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else {
                    newTokens.push(token)
                }
            }
            else if (tokenType === "content" && nextToken && nextTokenValue === "<" && prevToken && prevTokenType !== "whitespace") {
                newTokens.push(token)
                if (nextTokenType !== "whitespace" && blockName !== "textarea" && blockName !== 'pre') {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
            }

            else if (tokenType === 'tag-name' && prevTokenValue !== "</") {
                blockName = tokenValue;
                newTokens.push(token);
                if (blockName === "style" || blockName === "script") {
                    var blockStartIndex = i - 1;
                    var blockEndIndex = identifyEndHtml(tokens, blockStartIndex, blockName);

                    var startIndex, endIndex;
                    for (var j = blockStartIndex; i < blockEndIndex - 2; j++) {
                        var token = tokens[j];
                        var tokenValue = token.value;

                        if (tokenValue === '>') {
                            if ((tokens[j - 2].value !== ('</'))) {
                                startIndex = j + 1;
                                endIndex = blockEndIndex - 2;
                                break;
                            }
                        }
                    }
                    if (startIndex !== endIndex) {
                        var part1 = tokens.slice(0, startIndex);
                        var part2 = tokens.slice(startIndex, endIndex);
                        var part3 = tokens.slice(endIndex, tokens.length);

                        if (blockName === "style" || blockName === "script") {
                            part2 = indentSpecialTagsHtml(part2, nestedLoops, blockName)
                        }
                        tokens = part1.concat(part2, part3);
                        // i = blockEndIndex - 1;
                    }
                    else {
                        // i = endIndex - 1;
                        nestedLoops--;
                    }
                }
            }

            else if (tokenType === 'attribute-name') {
                tokenValue = tokenValue.trim();
                token.value = tokenValue;
                tokens[i] = token;

                if (prevToken && prevTokenType !== 'whitespace') {
                    newTokens.push(createWhitespaceToken(' '));
                }
                newTokens.push(token);
                newTokens.push(createWhitespaceToken(' '));
            }

            else if (tokenType === 'attribute-equals') {
                tokenValue = tokenValue.trim();
                token.value = tokenValue;
                tokens[i] = token;
                newTokens.push(token, createWhitespaceToken(' '));
            }

            else if (tokenType === 'attribute-value') {
                tokenValue = tokenValue.replace(/:/g, ":").replace(/;/g, ";");
                token.value = tokenValue;
                tokens[i] = token;
                if ((tokenValue.startsWith('"') || tokenValue.startsWith("'")) && (tokenValue.endsWith('"') || tokenValue.endsWith("'"))) {
                    attributeTokens = splitAttributeValue(tokens, i);
                    newTokens.push(attributeTokens[0], attributeTokens[1], attributeTokens[2]);
                }
                else {
                    newTokens.push(token);
                }
            }

            else if (tokenType === 'comment') {
                if (prevToken && prevTokenType !== "whitespace") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
                newTokens.push(token);
                if (nextToken && nextTokenType === "content") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
            }
            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }

    /**
     * Add indentation to the html code
     * @param {object} tokens
     * @returns the tokens array
     */
    function handleHtml(tokens) {
        tokens = trimSpacesHtml(tokens);
        tokens = indentHtml(tokens);
        return tokens;
    }

    // XML

    /**
     * Add indentation using the count of nested tags
     * @param {object} tokens
     * @returns
     */
    function indentXml(tokens) {
        var nestedLoops = 0;
        var result = [];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;
            var tokenType = token.tokenInfo.token;
            let prevToken, prevTokenType, prevTokenValue;
            let nextToken, nextTokenType, nextTokenValue;

            var spaces = "";
            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenValue = nextToken.value;
                nextTokenType = nextToken.tokenInfo.token;
            }
            if (i > 0) {
                prevToken = result[result.length - 1];
                prevTokenValue = prevToken.value;
                prevTokenType = prevToken.tokenInfo.token;
            }

            if (tokenType === "punctuation") {
                if (tokenValue === "<") {
                    if (nextToken && nextTokenType === "tag-name") {
                        nestedLoops++;
                    }
                    if (prevToken && (prevTokenValue.trim() === "+" || prevTokenValue.trim() === "-")) {
                        prevTokenValue = prevTokenValue.trim() + " ";
                        tokens[i - 1].value = prevTokenValue;
                    }
                    else if (prevToken && prevTokenType !== "whitespace") {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                    }
                    result.push(token);
                }
                else if (tokenValue === "</") {
                    if (prevToken && prevTokenType !== "whitespace") {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                    }
                    result.push(token);
                    nestedLoops--;
                }
                else if (tokenValue === ">") {
                    result.push(token);
                    if (nextToken && (nextTokenValue === "<" || nextTokenType === "content" || nextTokenType === "comment")) {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else if (tokenValue === '/>') {
                    nestedLoops--;
                    result.push(token);
                    if (nextToken && nextTokenType !== "whitespace" && nextTokenValue !== "</") {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }

                    // This works only if the xml tokenizer is corrected
                    else if (!nextToken) {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                }
                else {
                    result.push(token);
                }
            }

            else if (tokenType === "content" && nextToken && nextTokenValue === "<" && prevToken && prevTokenType !== "whitespace") {
                result.push(token)
                if (nextTokenType !== "whitespace") {
                    result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
            }

            else if (tokenType === 'attribute-name') {
                tokenValue = tokenValue.trim();
                token.value = tokenValue;
                tokens[i] = token;
                result.push(createWhitespaceToken(' '), token, createWhitespaceToken(' '));
            }

            else if (tokenType === 'attribute-equals') {
                tokenValue = tokenValue.trim();
                token.value = tokenValue;
                tokens[i] = token;
                result.push(token, createWhitespaceToken(' '));
            }

            else if (tokenType === 'attribute-value') {
                tokenValue = tokenValue.replace(/:/g, ": ").replace(/;/g, "; ");
                token.value = tokenValue;
                tokens[i] = token;
                result.push(token);
            }
            else {
                result.push(token);
            }
        }
        return result;
    }

    /**
     * Handle the xml blocks
     * @param {object} tokens
     * @returns the tokens array
     */
    function handleXml(tokens) {
        tokens = trimSpacesHtml(tokens);
        tokens = indentXml(tokens);
        return tokens;
    }

    // Python
    /**
     * The whitespace is added based on types of token
     * Extra whitespaces are removed
     * @param {object} tokens
     * @returns the tokens array
     */
    function manageSpacePy(tokens) {
        var excludePunctuators = ['(', ')', '{', '}', '[', ']', ';', ":"];
        var excludeOperators = ['.'];
        var result = [];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;

            var tokenType = tokenInfo.token;
            var tokenValue = token.value;
            let nextToken, nextTokenType;
            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenType = nextToken.tokenInfo.token;
                nextTokenValue = nextToken.value;
            }

            let prevToken, prevTokenType;
            if (i - 1 > -1) {
                prevToken = result[result.length - 1];
                // prevToken = tokens[i - 1];
                prevTokenType = prevToken.tokenInfo.token;
                prevTokenValue = prevToken.value;
            }

            if (tokenType === 'punctuator') {
                result.push(token);
                if (!excludePunctuators.includes(tokenValue)) {
                    if (nextToken && nextTokenType !== 'whitespace') {
                        result.push(createWhitespaceToken(' '));
                    }
                }
            }
            else if (tokenType === 'operator') {
                result.push(token);
                if (!excludeOperators.includes(tokenValue)) {
                    if (prevToken && prevTokenType !== 'whitespace') {
                        result.push(createWhitespaceToken(' '));
                    }
                    result.push(token);
                    if (nextToken && nextTokenType !== 'whitespace') {
                        result.push(createWhitespaceToken(' '));
                    }
                }
            }
            else {
                result.push(token);
            }
        }
        return tokens;
    }

    /**
     * Indent the tokens and return the intended tokens of python code
     * @param {object} tokens Array of all the tokens
     * @returns the indented tokens
     */
    function handlePython(tokens) {
        var whitespacePattern = /^[\s\n\t]*$/;

        var endIndex = tokens.length;
        if (tokens[endIndex - 1].tokenInfo.token === 'whitespace' && whitespacePattern.test(tokens[endIndex - 1].value)) {
            tokens.splice(endIndex - 1, 1)
        }
        // Remove the trailing spaces from the beginning
        if (tokens[0].tokenInfo.token === 'whitespace') {
            tokens.shift();
        }
        tokens = manageSpacePy(tokens)
        return tokens;
    }

    // Java
    /**
     * Find the parenthesis of condition block of the for loop of Java
     * @param {object} tokens
     * @returns
     */
    function identifyParenthesisOfForBlockJava(tokens) {
        for (var i = 0; i < tokens.length; i++) {

            var token = tokens[i];
            var tokenValue = token.value;

            if (tokenValue === '(') {
                // Start of the condition block
                var conditionStartIndex = i;
                var parenthesesCount = 1;

                // Iterate through the tokens to find the end of the condition block
                for (var j = i + 1; j < tokens.length; j++) {
                    let nextToken = tokens[j];
                    let nextValue = nextToken.value;

                    if (nextValue === '(') {
                        parenthesesCount++;
                    }
                    else if (nextValue === ')') {
                        parenthesesCount--;
                        if (parenthesesCount === 0) {
                            // End of the condition block
                            var conditionEndIndex = j;
                            // Process the condition block as needed
                            return ([conditionStartIndex, conditionEndIndex]);
                        }
                    }
                }
            }
        }
        return [];
    }

    /**
     * The whitespace is added based on operators, identifiers, keywords and punctuators
     * @param {object} tokens
     * @returns the tokens array
     */
    function manageSpaceJava(tokens) {
        var excludeOperators = ['.', '++', '--', '**'];
        var result = [];
        var space = { tokenInfo: { token: 'whitespace' }, value: ' ' };

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;

            var tokenType = tokenInfo.token;
            var tokenValue = token.value;

            var nextToken = tokens[i + 1];
            var nextTokenType = nextToken && nextToken.tokenInfo.token;
            var nextTokenValue = nextToken && nextToken.value;

            var prevToken = result.length > 0 ? result[result.length - 1] : null;
            // var prevToken = tokens[i - 1];
            var prevTokenType = prevToken && prevToken.tokenInfo.token;
            var prevTokenValue = prevToken && prevToken.value;

            // --- Handling logic ---
            // For each case, push token and optionally push spaces before or after

            if (tokenType === 'keyword' || tokenType === 'utilClasses') {
                if (prevToken && prevTokenType !== 'whitespace') {
                    result.push(space);
                }
                result.push(token);
                if (nextToken && nextTokenType !== 'whitespace' && nextTokenValue !== '.' && nextTokenValue !== ';') {
                    result.push(space);
                }
            } else if (tokenType === 'operator') {
                if (!excludeOperators.includes(tokenValue)) {
                    if (prevToken && prevTokenType !== 'whitespace' && result.length > 0 && result[result.length - 1].tokenInfo.token !== 'whitespace') {
                        result.push(space);
                    }
                    result.push(token);
                    if (nextToken && nextTokenType !== 'whitespace') {
                        result.push(space);
                    }
                } else {
                    result.push(token);
                }
            } else if (tokenType === 'punctuator') {
                if (tokenValue === ',' || tokenValue === '|') {
                    result.push(token);
                    if (nextToken && nextTokenType !== 'whitespace') {
                        result.push(space);
                    }
                } else if (tokenValue === '->') {
                    if (prevToken && prevTokenType !== 'whitespace' && result.length > 0 && result[result.length - 1].tokenInfo.token !== 'whitespace') {
                        result.push(space);
                    }
                    result.push(token);
                } else {
                    result.push(token);
                }
            } else if (tokenType === 'identifier') {
                if (prevToken && prevTokenType !== 'whitespace' && prevTokenValue !== '.' && prevTokenValue !== '(' && result.length > 0 && result[result.length - 1].tokenInfo.token !== 'whitespace') {
                    result.push(space);
                }
                result.push(token);
                if (nextToken && !excludeOperators.includes(nextTokenValue)) {
                    if (nextTokenType !== 'whitespace' && nextTokenType !== 'punctuator' && nextTokenValue !== '.') {
                        result.push(space);
                    }
                }
            } else {
                result.push(token);
            }
        }

        // Remove trailing whitespace if any
        if (result.length > 0) {
            var lastToken = result[result.length - 1];
            if (lastToken.tokenInfo.token === 'whitespace') {
                result.pop();
            }
        }

        return result;
    }
    function handleCondBlockJava(startIndex, tokens) {
        var loop = 0;
        var newTokens = [];
        const space = { value: " ", tokenInfo: { token: "whitespace" } };
        for (let i = startIndex; i < tokens.length; i++) {
            const token = tokens[i];
            var tokenValue = token.value;
            var tokenType = token.tokenInfo.token;
            let nextToken, nextTokenType;
            let prevToken, prevTokenType, prevTokenValue;

            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenType = nextToken.tokenInfo.token;
            }
            if (i > 0) {
                prevToken = newTokens[newTokens.length - 1] || tokens[i - 1];
                // prevToken = newTokens[i - 1] || tokens[i-1];
                prevTokenType = prevToken.tokenInfo.token;
                prevTokenValue = prevToken.value;
            }

            if (tokenType === "opening-punctuator") {
                newTokens.push(token);
                if (tokenValue === "(") {
                    if (prevTokenType !== "closing-punctuator" && prevTokenType !== "opening-punctuator" && prevTokenType !== "punctuator" && nextTokenType !== "punctuator" && nextTokenType !== "opening-punctuator" && nextTokenType !== "closing-punctuator" && nextTokenType !== "whitespace") {
                        newTokens.push(space);
                    }
                    loop++;
                }
            }
            else if (tokenType === "closing-punctuator") {
                if (tokenValue === ")") {
                    loop--;
                    if (prevTokenType !== "closing-punctuator" && prevTokenType !== "opening-punctuator" && prevTokenType !== "punctuator" && prevTokenType !== "whitespace") {
                        newTokens.push(space);
                    }
                    newTokens.push(token);
                    if (loop === 0) {
                        return ({ endIndex: i, tokens: newTokens });
                    }
                }
            }
            else if (tokenType === "punctuator") {
                if (tokenValue === ";") {
                    if (nextToken) {
                        if (prevTokenValue === "(") {
                            newTokens.push(space);
                        }
                        newTokens.push(token);
                        if (nextTokenType !== "whitespace") {
                            newTokens.push(space);
                        }
                    }
                    else {
                        newTokens.push(token, space);
                    }
                } else {
                    newTokens.push(token);
                }
            }
            else if (tokenType === "keyword" && nextTokenType !== "operator" && nextTokenType !== "punctuator" && nextTokenType !== "closing-punctuator" && nextTokenType !== "opening-punctuator") {
                newTokens.push(token, space);
            }

            else if (tokenType === "operator" && tokenValue !== ".") {
                if (prevTokenType !== "whitespace") {
                    if (!(tokenValue === "++" || tokenValue === "--" || tokenValue === "**" || tokenValue === "-")) {
                        newTokens.push(space);
                    }
                }
                newTokens.push(token);
                if (tokenValue !== "!" && tokenValue !== "-" && nextTokenType !== "whitespace") {
                    newTokens.push(space);
                }

            }
            else {
                newTokens.push(token);
            }

        }
        return ({ endIndex: 0, tokens: newTokens });
    }

    /**
     * New line character added after the semicolon
     * @param {object} tokens
     * @returns the tokens with added new line character as whitespace
     */
    function identifyLinesJava(tokens) {
        var result = [];
        var i;
        var nestedLoops = 0;
        var startIndex, endIndex = null;
        var forLoopFlag = false;
        for (i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;
            var nextToken = tokens[i + 1];
            if (i > 70) {
                debugger
            }
            if (endIndex && i === endIndex) {
                forLoopFlag = false;
            }
            var nextTokenValue = nextToken && nextToken.value;
            var nextTokenType = nextToken && nextToken.tokenInfo.token;

            var prevToken = result.length > 0 ? result[result.length - 1] : null;
            var prevTokenValue = prevToken && prevToken.value;
            var prevTokenType = prevToken && prevToken.tokenInfo.token;

            var newLineToken = {
                value: "\n",
                tokenInfo: {
                    token: "whitespace"
                }
            };

            if (tokenValue === '{') {
                nestedLoops++;
            }
            else if (tokenValue === '}') {
                nestedLoops--;
            }

            if (tokenType === 'punctuator') {
                if (tokenValue === ';') {
                    result.push(token);
                    if (!forLoopFlag) {
                        if (nextToken && nextTokenType !== 'whitespace') {
                            if (newLineToken && nextTokenValue === '}') {
                                result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                            } else {
                                result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                        }
                    }
                } else if (tokenValue === '{') {
                    result.push(token);
                    if (nextToken && nextTokenValue !== '}' && nextTokenType !== 'whitespace') {
                        result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                    }
                } else if (tokenValue === '}') {
                    result.push(token);
                    if (nextToken) {
                        if (nextTokenValue === '}') {
                            result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        } else if (nextTokenValue !== ';' && nextTokenValue !== ')' && nextTokenType !== 'whitespace') {
                            result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                }
                else {
                    result.push(token);
                }
            }
            else if (tokenType === 'comment') {
                result.push(token);
                if (nextToken) {
                    if (nextTokenType !== 'whitespace') {
                        if (nextTokenValue === '}') {
                            result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                        } else {
                            result.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                }
            }
            else if (tokenType === 'keyword') {
                result.push(token);
                if (tokenValue === 'switch') {
                    switchEnd = identifySwitchEnd(tokens, i);
                    if (switchEnd > 0) {
                        var switchBlock = tokens.slice(i, switchEnd + 1);
                        const part1 = tokens.slice(0, i);
                        const newPart1 = JSON.parse(JSON.stringify(part1));
                        const part3 = tokens.slice(switchEnd + 1, tokens.length);
                        const newPart3 = JSON.parse(JSON.stringify(part3));
                        var newPart2 = indentSwitchJava(switchBlock, nestedLoops);
                        tokens = newPart1.concat(newPart2, newPart3);
                    }
                }
                else if (tokenValue === 'for') {
                    forLoopFlag = true;
                    var newTok = handleCondBlockJava(i, tokens)
                    var forBlock = tokens.slice(i, tokens.length);

                    var [startIndex, endIndex] = identifyParenthesisOfForBlockJava(forBlock);
                    startIndex = i + startIndex;
                    endIndex = i + endIndex;

                    if (startIndex && endIndex) {
                        for (let j = startIndex + 1; j < endIndex; j++) {
                            var tempToken = tokens[j];
                            var tempTokenValue = tempToken.value;
                            var tempTokenType = tempToken.tokenInfo.token;
                            if (tempTokenType === 'whitespace' && tempTokenValue.includes('\n')) {
                                tempToken.value = ' '
                                tokens[j] = tempToken;
                            }
                        }
                    }
                }
            }
            else if (tokenType === 'whitespace') {
                result.push(token);
            }
            else {
                result.push(token);
                if (nextToken && nextTokenType !== 'whitespace' && nextTokenValue === '}') {
                    result.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                }
            }
        }
        return result;
    }

    /**
    * Handles the indentation of the switch blocks in java
    * @param {object} tokens
    * @returns the tokens array
    */

    function indentSwitchJava(tokens, nestedLoops) {
        var flagNestedLoops = nestedLoops;
        nestedLoops++;
        var newTokens = [];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenValue = token.value;
            if (i > 0) {
                var prevTokenType = newTokens[newTokens.length - 1].tokenInfo.token;
                var prevTokenValue = newTokens[newTokens.length - 1].value;
            }
            if (tokenValue === 'case' || tokenValue === 'default') {
                if (prevTokenValue === ":") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }
                else if (prevTokenType !== "whitespace") {
                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                }

                var startIndex = i + 1;
                var end = identifyCaseBlocks(tokens, startIndex);
                while (i < end) {

                    var token = tokens[i];
                    var tokenValue = token.value;
                    var tokenType = token.tokenInfo.token
                    let nextToken, nextTokenValue, nextTokenType;

                    if (i + 1 < tokens.length) {
                        nextToken = tokens[i + 1];
                        nextTokenValue = tokens[i + 1].value;
                        nextTokenType = tokens[i + 1].tokenInfo.token;
                    }
                    if (tokenType === "punctuator") {
                        newTokens.push(token);
                        if (tokenValue === '{') {
                            nestedLoops++;
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                        else if (tokenValue === '}') {
                            nestedLoops--;
                            if (nextTokenType !== 'whitespace') {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                        }
                        else if (tokenValue === ";" && nextTokenValue !== "case" && nextTokenValue !== "default") {
                            if (nextToken && nextTokenValue === "}" && nextTokenType !== "whitespace") {
                                if (i === tokens.length - 2) {
                                    newTokens.push(createWhitespaceToken(addTabSpaces(flagNestedLoops)));
                                } else {
                                    newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops - 1)));
                                }
                            }
                            else if (nextToken && nextTokenType !== "whitespace") {
                                newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                            }
                        }

                    }
                    else if (tokenType === "comment") {
                        newTokens.push(token);
                        if (nextToken && nextTokenValue !== "}") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 2)));
                        }
                        if (nextToken && nextTokenValue === "}") {
                            newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops)));
                        }
                    }
                    else if (tokenValue === ':') {
                        newTokens.push(token);
                        newTokens.push(createWhitespaceToken(addTabSpaces(nestedLoops + 1)));
                        nestedLoops++;
                    }
                    else {
                        newTokens.push(token);
                    }
                    i++;
                }
                nestedLoops = flagNestedLoops + 1;
                i--;
            }
            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }

    /**
     * Remove the whitespaces of Java and add the right indentation
     * @param {object} tokens
     * @returns the tokens array
     */
    function handleJava(tokens) {

        // Remove end trailing whitespace
        var whitespacePattern = /^[\s\n\t]*$/;
        var endIndex = tokens.length;
        if (tokens[endIndex - 1].tokenInfo.token === 'whitespace' && whitespacePattern.test(tokens[endIndex - 1].value)) {
            tokens.pop();
        }

        //remove all the whitespaces
        tokens = tokens.filter(t => t.tokenInfo.token !== 'whitespace');
        tokens = identifyLinesJava(tokens);
        tokens = manageSpaceJava(tokens)
        return tokens;
    }

    // Sql
    /**
     * Add the number of tab spaces according to nestedLoops and return the new whitespace value
     * @param {string} tokenValue
     * @param {integer} nestedLoop
     * @returns the string with added spaces
     */
    function addTabSpacesSql(tokenValue, nestedLoop) {
        for (let i = 0; i < nestedLoop; i++) {
            tokenValue = tokenValue + '    ';
        }
        return tokenValue
    }

    /**
     * Add proper tab spaces to indent the queries
     * @param {array} tokens
     * @returns the array
     */
    function indentSql(tokens) {
        var nestedLoop = 0;
        var nestedBraces = 0;
        for (let i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;

            if (tokenType === 'keyword') {
                tokenValue = tokenValue.toLowerCase();
                var cases = ['select', 'insert', 'update', 'delete', 'alter', 'create', 'alter', 'show', 'with', 'cancel'];
                if (cases.includes(tokenValue)) {
                    nestedLoop++;
                }
            }
            else if (tokenType === 'punctuator') {
                if (tokenValue === '(') {
                    nestedLoop++;
                    nestedBraces++;
                }
                else if (tokenValue === ')') {
                    nestedLoop--;
                    nestedBraces--;
                }
                else if (tokenValue === ';') {
                    nestedLoop = 0;
                    nestedBraces = 0;
                }
            }

            else if (tokenType === 'whitespace') {
                var nextToken, nextTokenValue, nextTokenType;
                if (i + 1 < tokens.length) {
                    nextToken = tokens[i + 1];
                    nextTokenValue = nextToken.value;
                    nextTokenType = nextToken.tokenInfo.token;
                }
                if (nextToken && nextTokenType !== 'keyword' && nextTokenType !== 'punctuator') {
                    tokenValue = addTabSpacesSql(tokenValue, nestedLoop);
                    tokens[i].value = tokenValue;
                }
                else if (nextToken && nextTokenType === 'keyword' && (nextTokenValue === 'and' || nextTokenValue === 'or' || nextTokenValue === 'not')) {
                    tokenValue = addTabSpacesSql(tokenValue, nestedLoop);
                    tokens[i].value = tokenValue;
                }
                else if (nextToken && nextTokenType === 'keyword' && nestedBraces > 0) {
                    tokenValue = addTabSpacesSql(tokenValue, nestedBraces + 1);
                    tokens[i].value = tokenValue;
                }
                else if (nextToken && nextTokenValue === ')') {
                    tokenValue = addTabSpacesSql(tokenValue, nestedBraces);
                    tokens[i].value = tokenValue;
                }
            }
        }
        return tokens;
    }
    /**
     * Add spaces after the tokens for better viewability
     * @param {array} tokens
     * @returns the array with added space
     */
    function manageSpaceSql(tokens) {
        var newTokens = [];
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;
            let nextToken, nextTokenType, nextTokenValue;
            if (i + 1 < tokens.length) {
                nextToken = tokens[i + 1];
                nextTokenType = nextToken.tokenInfo.token;
                nextTokenValue = nextToken.value;
            }
            if (nextToken && nextTokenType !== 'whitespace') {
                newTokens.push(token);
                if (tokenType === 'keyword' && nextTokenType !== 'punctuator') {
                    newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                }
                else if (tokenType === 'punctuator') {
                    if ((tokenValue === ',') || (nextTokenType !== 'whitespace' && (tokenValue !== ')' || (nextTokenValue !== ',' && nextTokenValue !== ';')))) {
                        newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                    }
                }
                else if (tokenType === 'identifier' && nextTokenValue !== '.') {
                    if (nextToken && (nextTokenValue === ')' || nextTokenValue === '(')) {
                        newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                    } else if (nextToken && nextTokenType !== 'punctuator') {
                        newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                    }
                }
                else if (tokenType === 'operator' && tokenValue !== '.') {
                    newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                }
                else if (tokenType === 'dataType' && nextTokenType !== 'punctuator') {
                    newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                }
                else if ((tokenType === 'string' || tokenType === 'integer') && nextTokenValue !== ',' && nextTokenValue !== ';') {
                    newTokens.push({ tokenInfo: { token: 'whitespace' }, value: ' ' });
                }
            }
            else {
                newTokens.push(token);
            }
        }
        return newTokens;
    }

    /**
     * Create line breaks at required positions
     * @param {array} tokens
     * @returns the array with the new lines added
     */
    function identifyLinesSql(tokens) {
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var tokenInfo = token.tokenInfo;
            var tokenType = tokenInfo.token;
            var tokenValue = token.value;

            let nextToken, nextTokenValue, nextTokenType, prevToken, prevTokenValue, prevTokenType;
            var prev2Token, prev2TokenValue, next2Token, next2TokenValue;

            if (i + 1 < tokens.length) {
                var next = i + 1;
                nextToken = tokens[i + 1];
                nextTokenValue = nextToken.value;
                nextTokenType = nextToken.tokenInfo.token;
            }

            if (i + 2 < tokens.length) {
                var next = i + 2;
                next2Token = tokens[i + 2];
                next2TokenValue = next2Token.value;
            }

            if (i - 1 >= 0) {
                var prev = i - 1;
                prevToken = tokens[i - 1];
                prevTokenValue = prevToken.value;
                prevTokenType = prevToken.tokenInfo.token;
            }

            if (i - 2 >= 0) {
                var prev = i - 2;
                prev2Token = tokens[i - 2];
                prev2TokenValue = prev2Token.value;
            }

            if (tokenType === 'punctuator') {
                if (tokenValue === ';' && i !== tokens.length - 1) {
                    if (nextToken) {
                        if (nextTokenType === 'whitespace') {
                            nextToken.value = '\n' + nextTokenValue;
                            tokens[i + 1] = nextToken;
                        }
                        else {
                            tokens.splice(i + 1, 0, {
                                "value": "\n",
                                "tokenInfo": {
                                    "token": "whitespace"
                                }
                            });
                            i++;
                        }
                    }
                    else {
                        tokens.splice(i + 1, 0, {
                            "value": "\n",
                            "tokenInfo": {
                                "token": "whitespace"
                            }
                        });
                        i++;
                    }
                }
                else if (tokenValue === '(') {
                    if (nextToken && nextTokenValue !== ')' && nextTokenType !== 'integer' && next2Token && next2TokenValue !== ')') {
                        if (nextTokenType !== 'whitespace') {
                            tokens.splice(i + 1, 0, {
                                "value": "\n",
                                "tokenInfo": {
                                    "token": "whitespace"
                                }
                            });
                            i++;
                        }
                    }
                }
                else if (tokenValue === ')') {
                    if (nextToken && nextTokenValue !== ';' && nextTokenValue !== '(' && nextTokenValue !== ',') {
                        if (nextTokenType === 'comment' && !nextTokenValue.startsWith("--")) {
                            tokens.splice(i + 1, 0, {
                                "value": "\n",
                                "tokenInfo": {
                                    "token": "whitespace"
                                }
                            });
                            i++;
                        }
                        else if (nextToken && nextTokenType !== 'comment') {
                            tokens.splice(i + 1, 0, {
                                "value": "\n",
                                "tokenInfo": {
                                    "token": "whitespace"
                                }
                            });
                            i++;
                        }
                    }
                    else {
                        // add check whether prevtoken is whitespace
                        if (prev2Token && prev2TokenValue !== ',' && prev2TokenValue !== '(' && prevTokenType !== 'whitespace') {
                            tokens.splice(i, 0, {
                                "value": "\n",
                                "tokenInfo": {
                                    "token": "whitespace"
                                }
                            });
                            i++;
                        }
                    }
                }
                else if (tokenValue === ',' && nextToken && nextTokenType !== 'integer') {
                    tokens.splice(i + 1, 0, {
                        "value": "\n",
                        "tokenInfo": {
                            "token": "whitespace"
                        }
                    });
                    i++;
                }
            }
            else if (tokenType === 'operator' && tokenValue === "*" && nextTokenValue !== ")" && nextTokenType !== 'integer' && nextTokenType !== 'decimal') {
                tokens.splice(i + 1, 0, {
                    "value": "\n",
                    "tokenInfo": {
                        "token": "whitespace"
                    }
                });
                i++;
            }
            else if (tokenType === 'comment') {
                if (i !== 0) {
                    if (prevToken && prevTokenType === 'whitespace' && !prevTokenValue.includes('\n')) {
                        prevToken.value = prevTokenValue + '\n';
                        tokens[prev] = prevToken;
                    }
                    else if (prevToken && prevTokenType !== 'whitespace' && !tokenValue.startsWith("--")) {
                        tokens.splice(i, 0, {
                            "value": "\n",
                            "tokenInfo": {
                                "token": "whitespace"
                            }
                        });
                        i++;
                    }
                }
                if (nextToken && nextTokenType === 'whitespace' && !nextTokenValue.includes('\n')) {
                    nextToken.value = '\n' + nextTokenValue;
                    tokens[next] = nextToken;
                }
                else if (nextToken && nextTokenType !== 'whitespace') {
                    tokens.splice(i + 1, 0, {
                        "value": "\n",
                        "tokenInfo": {
                            "token": "whitespace"
                        }
                    });
                    i++;
                }
            }
            else if (tokenType === 'keyword') {
                if (i !== 0 && prevTokenType !== 'operator' && prevTokenType !== 'punctuator' && prevTokenType !== 'whitespace' && prevTokenType !== 'keyword' && prevTokenType !== 'dataType') {
                    tokens.splice(i, 0, {
                        "value": "\n",
                        "tokenInfo": {
                            "token": "whitespace"
                        }
                    });
                    i++;
                }
            }
            else {
                if (nextToken && nextTokenValue === ")" && tokenType !== 'integer' && tokenValue !== '*' && prevToken && prevTokenValue !== '(' && prev2Token && prev2TokenValue !== '(') {
                    tokens.splice(i + 1, 0, {
                        "value": "\n",
                        "tokenInfo": {
                            "token": "whitespace"
                        }
                    });
                    i++;
                }
            }
        }
        return tokens;
    }
    /**
     * Remove the whitespaces of Sql and add the right indentation
     * @param {object} tokens
     * @returns the tokens array
     */
    function handleSql(tokens) {
        // Remove end trailing whitespace
        var whitespacePattern = /^[\s\n\t]*$/;
        var endIndex = tokens.length;
        if (tokens[endIndex - 1].tokenInfo.token === 'whitespace' && whitespacePattern.test(tokens[endIndex - 1].value)) {
            tokens.splice(endIndex - 1, 1)
        }
        //remove all the whitespaces
        tokens = tokens.filter(t => t.tokenInfo.token !== 'whitespace');

        tokens = identifyLinesSql(tokens);
        tokens = indentSql(tokens);
        tokens = manageSpaceSql(tokens)
        return tokens;
    }

    builder.prototype.indentCode = function (tokens) {
        var data = this.tokenizer;
        var language = data.language;
        if (tokens.length === 0) {
            return tokens;
        }
        if (language === 'json') {
            tokens = handleObject(tokens);
        }
        else if (language === 'js') {
            tokens = handleJs(tokens);
        }
        else if (language === 'html') {
            tokens = handleHtml(tokens);
        }
        else if (language === 'css') {
            tokens = handleCSS(tokens);
        }
        else if (language === 'xml') {
            tokens = handleXml(tokens);
        }
        else if (language === 'python') {
            tokens = handlePython(tokens);
        }
        else if (language === 'java') {
            tokens = handleJava(tokens);
        }
        else if (language === 'sql') {
            tokens = handleSql(tokens);
        }
        return tokens;
    }

    builder.prototype.buildSnippets = function (tokens) {
        var lazyLoading = $L.snippets.lazyLoading;
        var that = this;

        var curLineNumber = 1;

        function calculateLineBreaks(value) {
            return (value.match(/\n/g) || []).length;
        }

        if (!lazyLoading) {
            var result = document.createDocumentFragment();
            tokens.forEach(function (token) {
                var value = token.value,
                    tokenObject = token.tokenInfo,
                    cls = tokenObject.class || that.getClassForCommonTokens(tokenObject),
                    span = document.createElement('span');

                span.setAttribute('class', cls);
                curLineNumber += calculateLineBreaks(value);
                span.textContent = value;
                result.appendChild(span);
            });
            return {
                snippet: result,
                lineCount: curLineNumber,
                lazy: false
            };
        } else {
            var index = 0;
            var container = document.createElement('div');
            var result = document.createDocumentFragment();
            container.appendChild(result); // one-time fragment append
            return {
                snippet: container,
                lazy: true,
                processNext: function (batchSize = 100) {
                    let count = 0;
                    let lineCountInBatch = 0;

                    while (index < tokens.length && count < batchSize) {
                        let token = tokens[index++];
                        let value = token.value;
                        let tokenObject = token.tokenInfo;
                        let cls = tokenObject.class || that.getClassForCommonTokens(tokenObject);
                        let span = document.createElement('span');

                        span.setAttribute('class', cls);

                        let newLines = calculateLineBreaks(value);
                        curLineNumber += newLines;
                        lineCountInBatch += newLines;

                        span.textContent = value;
                        container.appendChild(span);

                        count++;
                    }

                    return {
                        done: index >= tokens.length,
                        lineCount: curLineNumber,
                        lineCountInBatch: lineCountInBatch
                    };
                }
            };
        }
    };


    builder.prototype.getClassForCommonTokens = function (tokenObject) {
        switch (tokenObject.token) {
            case 'whitespace':
                return 'lyteCSWhiteSpace';
            case 'unmatched-token':
                return 'lyteCSUnmatchedToken';
        }
    }

    builder.prototype.build = function () {
        var tokens = this.tokenizer.build();
        if ($L.snippets.indent !== false) {
            $L.snippets.indent = true;
        }
        if ($L.snippets.indent) {
            if ($L.snippets.specificIndent === true) {
                tokens = this.indentCode(tokens);
            }
        }
        return this.buildSnippets(tokens);
    }

})();