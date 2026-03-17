( function() {
	$L.snippets.registerLanguage( 'lyte', {
		tokenConfig: [ 
			...$L.snippets.getTokenConfig( 'html' ),
			{
				'group': 'lyte-syntax',
				'regex': /<%[\s\S]*?%>/,
				'matched-elements': [ {
					'token': 'lyte-punctuator',
					'regex': /<%|%>|{|}/,
					'class': 'lyteCSPunctuator'
				}, {
					'group': 'if-block',
					'regex': /if\s*\([\s\S]*?\)\s*{/,
					'matched-elements': [ {
						'group': 'if-statement',
						'regex': /if\s*\([\s\S]*?\)\s*{/,
						'matched-elements': [ {
							'group': 'if-statement',
							'regex': /if\s*/,
							'matched-elements': [ {
								'token': 'if-statement',
								'regex': /if/,
								'class': 'lyteCSKeyword'
							}, {
								'token': 'punctuator',
								'regex': /\(/,
								'class': 'lyteCSPunctuator'
							} ]
						}, {
							'group': 'condition-statement',
							'regex': /\((?:[^()]*|\([^()]*\))*\)/,
							'matched-elements': [ {
								'token': 'lyte-punctuator',
								'regex': /\(|\)|{|}/,
								'class': 'lyteCSPunctuator'
							}, {
								'group': 'condition',
								'regex': /[^(){}]+/,
								'matched-elements': [{
										'token': 'lyte-boolean',
										'regex': /\b(?:true|false)\b/,
										'class': 'lyteJSBoolean'
									},
									{
										'token': 'lyte-none',
										'regex': /\bnull\b|\bundefined\b/,
										'class': 'lyteJSKeyword'
									},
									{
										'token': 'lyte-variable',
										'regex': /[a-zA-Z_][a-zA-Z0-9_-]*/,
										'class': 'lyteCSVariable'
									},
									{
										'token': 'lyte-operator',
										'regex': /===|==|!==|!=|<=|&&|\|\||>=|<|>|\+|-|\*|\/|%/,
										'class': 'lyteCSOperator'
									},
									{
										'token': 'lyte-string',
										'regex': /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/,
										'class': 'lyteCSString'
									},
									{
										'token': 'lyte-number',
										'regex': /\b\d+(\.\d+)?\b/,
										'class': 'lyteCSNumber'
									}]
									}
								]
							}, {
								'token': 'lyte-punctuator',
								'regex': /\(|\)|{|}/,
								'class': 'lyteCSPunctuator'

							}]
					}]
				}, {
					'group': 'for-block',
					'regex': /[a-zA-Z][a-zA-Z0-9_-]*\s*\.\s*forEach\s*\(\s*function\s*\(\s*[\s\S]*?\){/,
					'matched-elements': [ {
						'group': 'loop-start',
						'regex': /[a-zA-Z][a-zA-Z0-9_-]*\s*\./,
						'matched-elements': [ {
							'token': 'lyte-variable',
							'regex': /[a-zA-Z][a-zA-Z0-9_-]*/,
							'class': 'lyteCSVariable'
						}, {
							'token': 'lyte-punctuator',
							'regex': /\./,
							'class': 'lyteCSPunctuator'
						} ]
					}, {
						'token': 'lyte-keywords',
						'regex': /(forEach|function)/,
						'class': 'lyteCSKeyword'
					}, {
						'token': 'lyte-punctuator',
						'regex': /\(|\)|{|,/,
						'class': 'lyteCSPunctuator'
					}, {
						'token': 'lyte-variable',
						'regex': /[a-zA-Z][a-zA-Z0-9_-]*/,
						'class': 'lyteCSVariable'
					} ]
				}, {
					'group': 'switch-block',
					'regex': /switch\s*\([a-zA-Z0-9_-]*\)\s*{/,
					'matched-elements': []
				} ]
			}
		]
	} );
} )();