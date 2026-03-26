( function() {
	$L.snippets.registerLanguage( 'js', {
		tokenConfig: [ {
			'token': 'literal',
			// 'regex': /(?<stringStart>['"]).*?(?<!\\)(\\\\)*\k<stringStart>/,
			/*
				Match even number of slashes at the end
				If its odd number keep matching more stuff

				Eg: "abc\"abc" "abc\\\"abc" "abc\\\\\"abc" are valid strings
				"abc \\"abc" is not valid and the second double quote is the close of the string
			*/
			/**
			 * The strings to be matched after considering the escape characters
			 * Hence the number of backslashes has to be considered
			 * But the lookbehind assertions are removed
			 */
			'regex': /(['"])(?:[^\\]|\\.)*?\1/,
			'class': 'lyteJSStringLiteral'

			// 'regex': /(['"])(.*?(?:(?:\\\\)*(\\\\)*)*)\1/, 
		},
			//https://stackoverflow.com/questions/4726295/division-regexp-conflict-while-tokenizing-javascript
			/**
			 * The regex has to be identified by considering the previous token
			 */
			{
				'token': 'regex',
				'class': 'lyteJSRegex',
				'regex': /\/(?![\/\*]).*?\/\s*[a-zA-Z]*/,
				// 'regex': /\/(?![\/\*]).*?\/\s*[a-zA-Z]*?/,
				'preceededBy': ['opening-punctuator', 'operator', 'punctuator', 'whitespace', 'comment']
			},
			{
				'token': 'keyword',
				'regex': /\b(?:break|export|super|case|extends|switch|catch|finally|this|class|for|throw|const|function|try|continue|if|typeof|debugger|import|var|default|in|void|delete|instanceof|while|do|new|with|else|return|yield|enum|implements|package|public|interface|private|static|let|protected|await)\b/,
				'class': 'lyteJSKeyword'
			},
			{
			'group': 'Indentifiers',
			'regex': /[a-zA-Z\_$][a-zA-Z0-9\_$]*(\()?/,
				'matched-elements': [{
				'token': 'boolean',
				'regex': /\b(?:true|false)\b/,
				'class': 'lyteJSBoolean'
			}, {
				'token': 'undefined',
				'regex': /\b(?:undefined)\b/,
				'class': 'lyteJSUndefined'
			}, {
				'token': 'null',
				'regex': /\b(?:null)\b/,
				'class': 'lyteJSNull'
			}, {
				'group': 'function-call',
				'regex': /[a-zA-Z\_][a-zA-Z0-9\_]*\(/,
				'matched-elements': [
					{
						'token': 'function-call',
						'regex': /[a-zA-Z\_][a-zA-Z0-9\_]*/,
						'class': 'lyteJSFunction'
					},{
						'token': 'opening-punctuator',
						'regex': /\(/,
						'class': 'lyteJSPunctuator'
					}
				]
			}, {
				'token': 'Indentifier',
				'regex': 'remaining',
				'class': 'lyteJSIndentifier'
			} ]
		}, {
			'token': 'comment',
			'regex': /(\/\/.*|\/\*[\s\S]*?\*\/)/,
			'class': 'lyteJSComment'
		}, {
			'token': 'operator',
			'regex': /(>>>=|===|!==|\*\*=|<<=|>>=|>>>|\.\.\.|\+=|-=|\*=|\/=|%=|&=|\^=|\|=|==|!=|>=|<=|\+\+|--|\*\*|<<|>>|&&|\|\||=>|\.|\?|~|>|<|=|!|\+|-|\*|%|&|\||\^|\\|\/)/,
			'class': 'lyteJSOperator'
		}, {
				'token': 'opening-punctuator',
				'regex': /\(|\{|\[/,
				'class': 'lyteJSPunctuator'
			}, {
				'token': 'closing-punctuator',
				'regex': /\)|\}|\]/,
				'class': 'lyteJSPunctuator'
			}, {
			'token': 'punctuator',
			'regex': /;|,|:|"|'/,
			'class': 'lyteJSPunctuator'
		}, {
			'token': 'number',
			'regex': /[0-9]+(\.[0-9]+)?/,
			'class': 'lyteJSNumber'
			}]
	});
})();
