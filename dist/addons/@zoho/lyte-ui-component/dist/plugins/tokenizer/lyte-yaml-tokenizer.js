(function () {
    $L.snippets.registerLanguage('yaml', {
        tokenConfig: [
            {
                'token': 'comment',
                'regex': /#.*/,
                'class': 'lyteYamlComment'
            },
            {
                'token': 'punctuator',
                'regex': /^%(?:YAML|TAG).*|---|\.\.\./m,
                'class': 'lyteYamlPunctuator'
            },
            {
                'token': 'key',
                'regex': /(['"]?[^\s:#]+['"]?)(?=\s*:)/m,
                'class': 'lyteYamlKey'
            },
            {
                'token': 'string',
                'regex': /'(?:[^']|'')*'|"(?:\\.|[^"])*"|[|>][+-]?\d*/,
                'class': 'lyteYamlString'
            },
            {
                'token': 'integer',
                'regex': /\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+\.\d+(?:e[+-]?\d+)?|\d+e[+-]?\d+|\d+)\b/,
                'class': 'lyteYamlInteger'
            },
            {
                'token': 'dataType',
                'regex': /!!?[\w:-]+/,
                'class': 'lyteYamlDataType'
            },
            {
                'group': 'anchor',
                'regex': /&([a-zA-Z_][\w-]*)/,
                'matched-elements': [
                    {
                        'token': 'anchor-punctuation',
                        'regex': /&/,
                        'class': 'lyteYamlAnchorPunctuationCls'
                    },
                    {
                        'token': 'anchor-name',
                        'regex': /[\w-]+/,
                        'class': 'lyteYamlAnchorNameCls'
                    }
                ]
            },
            {
                'group': 'alias',
                'regex': /\*([a-zA-Z_][\w-]*)/,
                'matched-elements': [
                    {
                        'token': 'alias-punctuation',
                        'regex': /\*/,
                        'class': 'lyteYamlAliasPunctuationCls'
                    },
                    {
                        'token': 'anchor-name',
                        'regex': /[\w-]+/,
                        'class': 'lyteYamlAliasNameCls'
                    }
                ]
            },
            {
                'token': 'punctuator',
                'class': 'lyteYamlPunctuator',
                'regex': /<<:|:|,|-|\?|\{|\}|\[|\]/
            },
            {
                'token': 'whitespace',
                'regex': /\s+/
            },
            {
                'token': 'identifier',
                'class': 'lyteYamlIdentifier',
                'regex': /[^#:'"\[\]\{\},&*!?|>%\-\s\n]+/
            }
        ]
    });
})();