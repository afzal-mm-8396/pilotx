//new RegExp( "<" + NAME_RULE + "(" + SPACE_RULE + ATTRIBUTE_RULE + ")*" + SPACE_RULE + "?" + ">" )

(function () {
	var NAME_START_CHAR = "A-Za-z:_",
	NAME_CHAR = NAME_START_CHAR + ".0-9-",
	NAME_RULE = "[" + NAME_START_CHAR + "]" + "[" + NAME_CHAR + "]*"
	SPACE_RULE = "(?:[\\s]+)",
	EQ_RULE = SPACE_RULE + "?=" + SPACE_RULE + "?",
	ATTRIBUTE_VALUE_RULE = "(?:'[^']*'|\"[^\"]*\"|[^<>=\\s][^>\\s]*)",
		ATTRIBUTE_RULE = NAME_RULE + "(?:" + EQ_RULE + ATTRIBUTE_VALUE_RULE + ")?";


	$L.snippets.registerLanguage( 'html', {
		tokenConfig: [ {
			'group': 'start-tag',
			'regex': new RegExp("<(?<tagname>" + NAME_RULE + ")" + "(" + SPACE_RULE + ATTRIBUTE_RULE + ")*" + "(?:[\\s]*)\\/?" + "(?:[\\s]*)>"),
			// 'regex': new RegExp("<(?<tagname>" + "(?:[\\s]*)" + NAME_RULE + ")(" + SPACE_RULE + ATTRIBUTE_RULE + ")*" + SPACE_RULE + "?" + "\/?" + SPACE_RULE + "?" + ">"),
			'matched-elements': [
				{
					'group': 'punctuator-name-tokens',
					'regex': new RegExp('<' + "(?:[\\s]*)" + NAME_RULE),
					'matched-elements': [
						{
							'token': 'punctuation',
							'regex': new RegExp( /</ ),
							'class': 'lytePunctuationCls'
						},
						{
							'token': 'tag-name',
							'regex': new RegExp( NAME_RULE ),
							'class': 'lyteTagNameCls',
							'values': [ {
								'value': 'style',
								'language': 'css'
							} ]
						}
					]
				},
				{
					'token': 'attribute-name',
					'regex': new RegExp(NAME_RULE),
					// 'regex': new RegExp(SPACE_RULE + NAME_RULE),
					'class': 'lyteAttributeNameCls'
				},
				{
					'token': 'attribute-equals',
					'regex': new RegExp(EQ_RULE),
					'class': 'lyteAttributeEqualsCls'
				},
				{
					'token': 'attribute-value',
					// The quotes can't be split here, because when quotes are matched
					// the cursor will move to the the start of attribute value excluding quotes
					// which is not desired. And couldn't determine whether it is a attribute name or value
					// So handling quotes along with attribute value
					'regex': new RegExp("(?:\"[^\"]*\"|'[^']*'|[^\\s<>=\"']+)"),
					// 'regex': new RegExp(ATTRIBUTE_VALUE_RULE),
					'class': 'lyteAttributeValueCls'
				},
				{
					'token': 'punctuation',
					// 'regex': new RegExp(/[/>]/),
					'regex': new RegExp(/\/>|\/|>/),
					'class': 'lytePunctuationCls'
				}
			],

			'tokenizer': [
				{
					'matched-group': 'tagname',
					'value': 'style',
					'parseWith': 'css',
					'regex': /[\s\S]*?(?=<\/style>)/
				},
				{
					'matched-group': 'tagname',
					'value': 'script',
					'parseWith': 'js',
					'regex': /[\s\S]*?(?=<\/script>)/
				}
			]
		}, {
			'group': 'end-tag',
			'regex': new RegExp("</" + NAME_RULE + ">"),
			// 'regex': new RegExp("</" + "(?:[\\s]*)" + NAME_RULE + ">"),
			'matched-elements': [
				{
					'token': 'punctuation',
					'regex': new RegExp( "(?:</|>)" ),
					'class': 'lytePunctuationCls'
				},
				{
					'token': 'tag-name',
					'regex': new RegExp(NAME_RULE),
					'class': 'lyteTagNameCls'
				}
			]
		}, {
			'group': 'content',
			'regex': new RegExp( /[^<]+/ ),
			'matched-elements': [ {
				'token': 'entity',
				'regex': new RegExp( '&' + NAME_RULE + ';' ),
				'class': 'lyteEntityCls'
			}, {
				'token': 'content',
				'regex': new RegExp( /[^&]+/ ),
				'class': 'lyteContentCls'
				},
				{
					'token': 'content',
					'regex': new RegExp(/(&[#a-zA-Z0-9]+;)|(%[0-9A-Fa-f]{2}(%[0-9A-Fa-f]{2})*)|([\xC2-\xF4][\x80-\xBF]+)/),
					'class': 'lyteContentCls'
				},
				{
					'token': 'content',
					'regex': 'remaining',
					'class': 'lyteContentCls'
				}]
		}, {
			'token': 'comment',
			'class': 'lyteCommentCls',
			'regex': new RegExp( /<!--([\s\S]*?)-->/ )
			}, {
				'token': 'doc-type',
				'class': 'lyteContentCls',
				'regex': /<!DOCTYPE\s+html\s*>/i
			}]
	} );

} )();

