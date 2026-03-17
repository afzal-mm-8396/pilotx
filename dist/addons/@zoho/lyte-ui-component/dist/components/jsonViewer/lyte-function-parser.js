Lyte.Component.register("lyte-function-parser", {
_template:"<template tag-name=\"lyte-function-parser\"> <div class=\"lyteJsonVrCodeSnippetWrapper\"> <template is=\"if\" value=\"{{functionOpened}}\"><template case=\"true\"> <template is=\"for\" items=\"{{outputStr}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(index,'===',0)}}\"><template case=\"true\"> <span class=\"lyteJsonVrCodeSnippet lyteJsonVrCodeSnippetFirstLine\" style=\"--lyte-jsonVr-function-padding-left:{{lyteJsonViewerIndentHelper(firstLineOpenedState)}}\" onclick=\"{{action('openCloseFunction')}}\">{{unescape(lyteJsonViewerFunctionHelper(firstLineOpenedState))}}</span> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(outputStr.length,'-',1),'===',index),'&amp;&amp;',ltPropShowComma)}}\"><template case=\"true\"> <span class=\"lyteJsonVrCodeSnippet\" style=\"--lyte-jsonVr-function-padding-left:{{lyteJsonViewerIndentHelper(item)}}\">{{lyteJsonViewerFunctionHelper(item)}},</span> </template><template case=\"false\"> <span class=\"lyteJsonVrCodeSnippet\" style=\"--lyte-jsonVr-function-padding-left:{{lyteJsonViewerIndentHelper(item)}}\">{{lyteJsonViewerFunctionHelper(item)}}</span> </template></template> </template></template> </template> </template><template case=\"false\"> <template is=\"if\" value=\"{{ltPropShowComma}}\"><template case=\"true\"><span class=\"lyteJsonVrCodeSnippet lyteJsonVrCodeSnippetFirstLine\" style=\"--lyte-jsonVr-function-padding-left:{{lyteJsonViewerIndentHelper(firstLineClosedState)}}\" onclick=\"{{action('openCloseFunction')}}\">{{unescape(lyteJsonViewerFunctionHelper(firstLineClosedState))}},</span></template><template case=\"false\"><span class=\"lyteJsonVrCodeSnippet lyteJsonVrCodeSnippetFirstLine\" style=\"--lyte-jsonVr-function-padding-left:{{lyteJsonViewerIndentHelper(firstLineClosedState)}}\" onclick=\"{{action('openCloseFunction')}}\">{{unescape(lyteJsonViewerFunctionHelper(firstLineClosedState))}}</span></template></template> </template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-jsonVr-function-padding-left:'",{"type":"helper","value":{"name":"lyteJsonViewerIndentHelper","args":["firstLineOpenedState"]}}]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-jsonVr-function-padding-left:'",{"type":"helper","value":{"name":"lyteJsonViewerIndentHelper","args":["item"]}}]}}}},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-jsonVr-function-padding-left:'",{"type":"helper","value":{"name":"lyteJsonViewerIndentHelper","args":["item"]}}]}}}},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-jsonVr-function-padding-left:'",{"type":"helper","value":{"name":"lyteJsonViewerIndentHelper","args":["firstLineClosedState"]}}]}}}},{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--lyte-jsonVr-function-padding-left:'",{"type":"helper","value":{"name":"lyteJsonViewerIndentHelper","args":["firstLineClosedState"]}}]}}}},{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropFunctionData","ltPropShowComma","outputStr","firstLineClosedState","firstLineOpenedState","functionOpened"],
_observedAttributesType :["string","boolean","array","string","string","boolean"],

	data : function(){
		return {
			ltPropFunctionData : Lyte.attr('string' , {
				default : ""
			}),
			ltPropShowComma : Lyte.attr('boolean' , {
				default : true
			}),
			outputStr : Lyte.attr('array' , {
				default : []
			}),
			firstLineClosedState : Lyte.attr('string' , {
				default : ''
			}),
			firstLineOpenedState : Lyte.attr('string' , {
				default : ''
			}),
			functionOpened : Lyte.attr('boolean' , {
				default : false
			})
		}			
	},
	didConnect : function(){
		var code = this.formatCodeSnippet(this.getData('ltPropFunctionData'))
		this.setData('outputStr' , code.split('\n'))
		var firstLineClosedState = this.getData('outputStr')[0]
		var firstLineOpenedState = this.getData('outputStr')[0]
		const regex = /\bfunction\b/g;
		const modifiedfirstLineClosedState = firstLineClosedState.replace(regex, '<span class="lyteJsonVrDataType lyteJsonVrFunctionNode">function</span>');
		const modifiedfirstLineOpenedState = firstLineOpenedState.replace(regex, '<span class="lyteJsonVrDataType lyteJsonVrFunctionNode">function</span>');

		function quoteFunctionName(str) {
			const regex = /^(.*?)\s*:/;
			return str.replace(regex, `<span class="lyteJsonVrTreeIndex">$1</span>:`);
		}
		this.setData('firstLineClosedState' , (quoteFunctionName(modifiedfirstLineClosedState) + ' ... }'))
		this.setData('firstLineOpenedState' , (quoteFunctionName(modifiedfirstLineOpenedState)))
	},
	formatCodeSnippet : function(codeString , tabSize=2) {
		const indent = '\\t'.repeat(tabSize);
		let normalized = codeString
			.replace(/\\n/g, ' ')
			.replace(/\\t/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	
		let output = '';
		let currentIndentLevel = 0;
	
		for (let i = 0; i < normalized.length; i++) {
			const char = normalized[i];
			
			if (char === '{') {
				output += ' ' + char + '\n' + indent.repeat(++currentIndentLevel);
			} else if (char === '}') {
				output += '\n' + indent.repeat(--currentIndentLevel) + char;
				if (i < normalized.length - 1) {
					 output += '\n' + indent.repeat(currentIndentLevel);
				}
			} else if (char === ';') {
				output += char + '\n' + indent.repeat(currentIndentLevel);
			} else if (char === ',' && normalized[i-1] === ' ') {
				output += char;
			} else if (char === ' ' && normalized[i-1] === ' ') {
				 continue;
			}
			else {
				output += char;
			}
		}
		return output.trim();
	},
	actions : {
		openCloseFunction : function(){
			if(this.getData('functionOpened')){
				this.setData('functionOpened' , false)
			} else {
				this.setData('functionOpened' , true)
			}
		}
	}
});


