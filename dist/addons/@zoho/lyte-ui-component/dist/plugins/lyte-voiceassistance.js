( function( factory ) {
    if( typeof define === "function" && define.amd ) {
        define( [ "@zoho/lyte-dom" ], factory );
    }
    else {
        factory( $L );
    }
} )( function( $L ) {
	if($L){
        var nodeMapping, config, itemNumber, voiceConfig, firstTweleNumbers = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"], positionFixedEle, contextual_data, ltPropEnableNumbering, interval, scrollTimeOut;
        $L.VA = {};

        $L.VA.startVoiceListening = function(properties,from = null){
			if(!from && $L('lyte-voice-assistance').length == 0){
				Lyte.Component.render('lyte-voice-assistance',properties,'body');
				return;
			}
            config = properties || {};
            ltPropEnableNumbering = config.ltPropEnableNumbering;
            $L.media.record( {
                workletBasePath: config.ltPropVcProperties.workletBasePath,
                workerBasePath: config.ltPropVcProperties.workerBasePath,
                stopOnSilence: config.ltPropVcProperties.stopOnSilence,
                maxListenDuration: config.ltPropVcProperties.maxListenDuration,
                silenceThreshold : config.ltPropVcProperties.silenceThreshold,
                silenceDuration : config.ltPropVcProperties.silenceDuration,
                onStop: function(blob) {
                    // REFACTOR: Query component and maintain a state variable rather than comparing to Listening since it can be I18nd. - Done
					var voiceassistanceShortcut=$L('lyte-voice-assistance');
					if(voiceassistanceShortcut && voiceassistanceShortcut.length > 0 && voiceassistanceShortcut[0].component.data.isListening){
                        // REFACTOR: Maybe the name can be different if possible. Like requestVoiceAssitance(onRequestVoiceAssistance) - Done
						Lyte.triggerEvent("onRequestVoiceAssistance","fromEvent");// NO I18N
					}
					for(var key in voiceConfig){
						voiceConfig[key] = voiceConfig[key].slice(0,1000);
					}
					var formData = new FormData();
					formData.append("file", blob, "audioFile.mp3");
					formData.append("data", JSON.stringify(voiceConfig));

                    $L.ajax({
                        // REFACTOR: If possible can change to ltProp - Done 
                        url : config.lrPropVoiceApiUrl ? config.lrPropVoiceApiUrl : 'htt' + 'ps://crm.zoho.com/crm/zia/text/v2/voice_control_accessibility/detect?iscsignature=' + config.ltPropIscSignature,
                        type : "POST",
                        data : formData,
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        // headers : {
                        //     "Authorization" : 'SystemAuth ' + config.iscSignature
                        // },
                        success: function(res)
                        {
							if(res.status === "success" && res.response){
								handleVoiceAssistance(res.response,res.response.user_sentence);
							}else{
                                // REFACTOR: Can rename event if possible as: like voiceAssitanceFailure(onVoiceAssistanceFailure) - Done
								Lyte.triggerEvent("onVoiceAssistanceFailure",{type : 'error', message : res.response.user_sentence ? res.response.user_sentence : "Please give correct voice over."});
							}
							fromVoiceComponent = false;
							nodeMapping = {};
                        },
                        error : function(err)
                        {
                            var error = JSON.parse(err.responseText);
                            // REFACTOR: Can rename event as above. - Done
                            Lyte.triggerEvent("onVoiceAssistanceFailure",{type : 'error', message : error.status_details && error.status_details.message ? error.status_details.message : "Failure from server side."});
                        }
                    });
                }
            });
            configForVoiceAssistance();
        }

        $L.VA.stopVoiceListening = function(){
            var ac_mainVA = $L('#ac_mainVA');

            // REFACTOR: Consider this as well - Done
            var voiceassistanceShortcut=$L('lyte-voice-assistance');
			if(voiceassistanceShortcut && voiceassistanceShortcut.length > 0 && voiceassistanceShortcut[0].component.data.isListening){
                $L.media.stop();
            }
        }

        $L.VA.switchNumbering = function(value = null){
            ltPropEnableNumbering = value === null ? !ltPropEnableNumbering : value;
			value ? configForVoiceAssistance() : resetNumbering();
        }

        function configForVoiceAssistance(){
            itemNumber = 600000;
            voiceConfig = {};
            nodeMapping = {};
            var numberingItems = [];
            positionFixedEle = [];
            var isFreezeLayerApplied = findFreezeLayerApplied();
            contextual_data = {active_action:0,zia_response:{}};
            if(config.ltPropcustomAction){
                configforPredefinedAction('elements',voiceConfig);
            }
            var items = $L("body").find(":visible");
            var itemLen = items.length;
            // var bodyRect = document.body.getBoundingClientRect();
            for (var i = 0; i < itemLen; i++) {
                var itemCS = window.getComputedStyle(items[i]);
                var rect=items[i].getBoundingClientRect();
                if(isHidden(items[i]) && (!isFreezeLayerApplied || parseInt(itemCS.zIndex) > isFreezeLayerApplied) && checkFromPoint(items[i],rect)){
                    // REFACTOR: Looks like its a isLeafNode( items[ i ] ) check. Maybe it can be simplified. - Done
                    var display_names = items[i].innerText ? items[i].innerText : items[i].getAttribute('lt-prop-title');
                    if(ltPropEnableNumbering){
                        if(itemCS.position === "fixed" && rect.width !== 0 && rect.height !== 0 && !items[i].classList.contains('modalWrapper') && !items[i].classList.contains('alertWrapper') && !items[i].classList.contains('alertFreezeLayer') && !items[i].classList.contains('lytemenufreezelayer') && items[i].tagName !== "LYTE-MODAL-FREEZE"){
                            positionFixedEle.push(items[i]);
                        }
                        var item = {
                            element: items[i],
                            include: (items[i].tagName === "BUTTON" || items[i].tagName === "IMG" || items[i].tagName === "A" || items[i].onclick !== null || items[i].getAttribute('click') !== null || itemCS.cursor === "pointer" || itemCS.cursor === "text"),
                            rect: {
								left: Math.max(rect.left, 0),
                                top: Math.max(rect.top + parseInt(itemCS.paddingTop.endsWith('px') ? itemCS.paddingTop.substring(0,itemCS.paddingTop.length-2) : 0), 0)
                                // right: Math.min(rect.right - bodyRect.x, document.body.clientWidth),
                                // bottom: Math.min(rect.bottom - bodyRect.y, document.body.clientHeight)
							},
                            text: items[i].textContent.trim().replace(/\s{2,}/g, ' ')
                        };
                        if(item.include){// && (Math.abs((item.rect.right - item.rect.left) * (item.rect.bottom - item.rect.top)) >= 20)
                            numberingItems.push(item);
                        }
                    }else if(items[i].getAttribute('lyte-voice-attribute-label') && (items[i].getAttribute('lyte-voice-attribute-label')).split(" - ")[0] === 'scroll'){
                        getConfig('elements', items[i], undefined, items[i].getAttribute('lyte-voice-attribute-label'));
                    }else if(display_names){
                        getConfig('elements', items[i], undefined, display_names);
                    }else if(hasScroller(items[i])){
                        getConfig('elements', items[i], undefined, items[i].getAttribute('lyte-voice-attribute-label') ? items[i].getAttribute('lyte-voice-attribute-label') : (items[i].getAttribute('id') ? items[i].getAttribute('id') : items[i].getAttribute('class')));
                    }else if(items[i].getAttribute('lyte-voice-attribute-label')){
                        getConfig('elements', items[i], undefined, items[i].getAttribute('lyte-voice-attribute-label'));
                    }
                }
            }
            if(ltPropEnableNumbering){
                numberingItems = numberingItems.filter(x => !numberingItems.some(y => x.element.contains(y.element) && !(x === y)))
                var elementNumber = 1;
                numberingItems.forEach(function(item,index) {
                    if(checkForOverlapEle(item.element)){
						var newElement = document.createElement("div");
						newElement.style.left = ((item.rect.left - 25 < 0) ? 0 : item.rect.left - 25) + "px";
						newElement.style.top = ((item.rect.top - 8 < 0) ? 0 : item.rect.top - 8) + "px";
						newElement.style.boxSizering = "border-box";
						newElement.style.counterReset = "section";
						newElement.innerHTML = elementNumber++;
						newElement.className = "lyteVoAssNumberElement";
						document.body.appendChild(newElement);
						getConfig('elements', item, undefined, (index+1).toString());
                    }
                })
            }
        }
        function configforPredefinedAction(action,voiceConfig){
            var predefiendCommands = config.ltPropcustomAction.customCommands;
            for(var i=0;i<predefiendCommands.length;i++){

                // REFACTOR: Since voiceConfig is global in this closure, maybe it doesn't have to be passed, same for nodeMappings. - Done
                getConfig(action, "predefinedCommand", "unshift", predefiendCommands[i]);
            }
        }
        function checkFromPoint(item,rect){
            if(document.elementFromPoint(Math.round(rect.x + (rect.width/2)), Math.round(rect.y + (rect.height/2))) === item){
                return true;
            }
            return false;
        }
        function checkForOverlapEle(ele){
            var len = positionFixedEle.length;
            for(var i=0;i<len;i++){
                var itemCS = window.getComputedStyle(positionFixedEle[i]);
                var itemCSele = window.getComputedStyle(ele);
                var itemCSBC = positionFixedEle[i].getBoundingClientRect();
                var itemCSeleBC = ele.getBoundingClientRect();
                var itemCSZI = itemCS.zIndex === "auto" ? getStackingContextZIndex(positionFixedEle[i]): itemCS.zIndex;
                var itemCSeleZI = itemCSele.zIndex === "auto" ? getStackingContextZIndex(ele): itemCSele.zIndex;
                if(ele !== positionFixedEle[i] && itemCSeleBC.x >= itemCSBC.x && itemCSeleBC.y >= itemCSBC.y && itemCSBC.x+itemCSBC.width > itemCSeleBC.x+itemCSeleBC.width && itemCSBC.y+itemCSBC.height > itemCSeleBC.y+itemCSeleBC.height && parseInt(itemCSZI) > parseInt(itemCSeleZI) && !positionFixedEle[i].contains(ele)){
                    return false;
                }
            }
            return true;
        }
        function getStackingContextZIndex(el) {
            if (!el) {
                return "0";
            }
            const style = window.getComputedStyle(el);
            const position = style.getPropertyValue('position');
            const zIndex = style.getPropertyValue('z-index');
            if (position !== 'static' && zIndex !== 'auto') {
                return zIndex;
            }
            return getStackingContextZIndex(el.parentElement);
        }
        function findFreezeLayerApplied(){
            var freezeLayers = config.ltPropHandlingProperties.freezeLayers ? $L(config.ltPropHandlingProperties.freezeLayers.join(',')) : [];
            var len = freezeLayers.length;
            if(len > 0){
                var zindex = 0;
                for(var i=0;i<len;i++){
                    var style = window.getComputedStyle(freezeLayers[i])
                    if(parseInt(style.zIndex) > zindex && isHidden(freezeLayers[i])){
                        zindex = parseInt(style.zIndex);
                    }
                }
                return zindex;
            }
            return false;
        }
        function resetNumbering(){
            // if(ltPropEnableNumbering){
                const elements = document.getElementsByClassName('lyteVoAssNumberElement');
                var len = elements.length;
                while(len > 0 && elements[0] && elements[0].parentNode){
                    elements[0].parentNode.removeChild(elements[0]);
                }
                nodeMapping = {};
            // }
        }
        function isHidden(elem) {
            var style = window.getComputedStyle(elem);
            return (!!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) && ((style.display !== 'none') && (style.visibility !== 'hidden')));
        }
        function getConfig(action, actionNode, actionNodes, display_names, itemNumber = null){
            if(display_names && (typeof display_names !== "string" || display_names.trim())){
                var elements = voiceConfig[action] ? voiceConfig[action] : []; 
                var data = {
                    id : itemNumber ? itemNumber.toString() : (Math.floor(100000 + Math.random() * 900000)).toString(),
                    display_names : (ltPropEnableNumbering && parseInt(display_names) < 13) ? [(typeof display_names === "string" ? display_names.slice(0,200) : display_names),firstTweleNumbers[parseInt(display_names)-1]] : [(typeof display_names === "string" ? display_names.slice(0,200) : display_names)]
                }
                if(data.display_names[0]){
                    nodeMapping[data.id] = actionNode;
                    if(actionNodes === "unshift"){
                        elements.unshift(data);
                        nodeMapping[data.id] = actionNode;
                    }else{
                        elements.push(data);
                    }
                    voiceConfig[action] = elements;
                }
            }
        }

        //To find Scroll elements
        function getComputedStyle(elem) {
            if(document.body && document.body.currentStyle){
                return elem.currentStyle;
            }else{
                return document.defaultView.getComputedStyle(elem, null);
            }
        }
        function getActualCss(elem, style) {
            return getComputedStyle(elem)[style];
        }
        function isXScrollable(elem) {
            return elem.offsetWidth < elem.scrollWidth &&
            autoOrScroll(getActualCss(elem, 'overflow-x'));
        }
        function isYScrollable(elem) {
            return elem.offsetHeight < elem.scrollHeight &&
            autoOrScroll(getActualCss(elem, 'overflow-y'));
        }
        function autoOrScroll(text) {
            return text === 'scroll' || text === 'auto';
        }
        function hasScroller(elem) {
            return isYScrollable(elem) || isXScrollable(elem);
        }

        //Post Handling
        function handleVoiceAssistance(actionJson, user_sentence = null){
            if(actionJson.actions_found && actionJson.actions_found.length && actionJson.actions_found[0].params.length){
                if(handlecustomCommands(actionJson.actions_found)){
                    // REFACTOR: Can rename event if possible as: voiceAssistanceSuccess(onVoiceAssistanceSuccess) - Done
                    Lyte.triggerEvent("onVoiceAssistanceSuccess",{type : 'success', message : user_sentence});// NO I18N
                    return;
                }
                var len = actionJson.actions_found.length;
                for(var i = 0; i < len; i++){
                    if(actionJson.actions_found[i].action === "Click" || actionJson.actions_found[i].action === "Select" || actionJson.actions_found[i].action === "Toggle" || actionJson.actions_found[i].action === "Create"){
                        var action = actionJson.actions_found[i];
                        var paramLen = action.params.length;
                        for(var j = 0; j < paramLen; j++){
                            if(action.params[j].id === 'Element'){
                                var node = nodeMapping[(action.params[j].value && action.params[j].value.length > 0 ) ? action.params[j].value[0] : action.params[j].value];
                                node = node.element ? node.element : node;
                                var targetNode = $L(node).parent().find('lyte-dropdown');
                                var tarlen = targetNode.length;
                                if(tarlen > 0){
                                    for(var k=0;k<tarlen;k++){
                                        // REFACTOR: Will it not always be lyte-dropdown since you are querying for Lyte-Dropdown.
                                        if(targetNode[k].tagName === 'LYTE-DROPDOWN'){
                                            targetNode[k].open();
                                        }else if(targetNode[k].click){
                                            targetNode[k].click();
                                        }else{
                                            clickClosestElement(targetNode[k]);
                                        }
                                        break
                                    }
                                }else if(node.click){
                                    node.click();
                                }else{
                                    clickClosestElement(node);
                                }
                            }
                        }
                    }else if (actionJson.actions_found[i].action === "Enter" || actionJson.actions_found[i].action === "Clear"){
                        var action = actionJson.actions_found[i];
                        var paramLen = action.params.length;
                        for(var j = 0; j < paramLen; j+=2){
                            var node = nodeMapping[action.params[j].value[0]];
                            node = node.element ? node.element : node;
                            var value = actionJson.actions_found[i].action === "Clear" ? '' : action.params[j+1].value[0];
                            if(typeof value === "string" && value.endsWith(".")){
                                value = value.substring(0, value.length-1);
                            }

                            // REFACTOR: Maybe all of this can be combined into some smaller form.
                            if(node.tagName === 'LYTE-INPUT' || node.tagName === "LYTE-NUMBER" || node.tagName === "LYTE-AUTOCOMPLETE"){
                                node.component.setData('ltPropValue',value);
                            } else if(node.parentElement && node.parentElement.parentElement && (node.parentElement.parentElement.tagName === 'LYTE-INPUT' || node.parentElement.parentElement.tagName === "LYTE-NUMBER")){
                                node.parentElement.parentElement.component.setData('ltPropValue',value);
                            } else if(node.parentElement.parentElement.tagName ==="LYTE-AUTOCOMPLETE"){
                                node.parentElement.parentElement.setValue(value);
                            } else if(node.tagName.includes('SEARCH') || node.tagName.includes('INPUT')){
                                node.setValue ? node.setValue(value) : node.value = value;
                            } else{
                                var targetNode = $L(node).parent().find('lyte-input, lyte-number, lyte-autocomplete');
                                if(targetNode.length === 0){
                                    targetNode = $L(node).parent().find('input, textarea, select, search');
                                }
                                var tarlen = targetNode.length;
                                if(tarlen > 0){
                                    for(var k=0;k<tarlen;k++){
                                        if(targetNode[k].tagName === 'LYTE-INPUT' || targetNode[k].tagName === "LYTE-NUMBER"){
                                            targetNode[k].component.setData('ltPropValue',value);
                                        }else if(targetNode[k].tagName === "LYTE-AUTOCOMPLETE"){
                                            targetNode[k].setValue(value);
                                        }else if(targetNode[k].tagName.includes('SEARCH') || targetNode[k].tagName.includes('INPUT') || targetNode[k].tagName.includes('SELECT') || targetNode[k].tagName.includes('TEXTAREA')){
                                            targetNode[k].setValue ? targetNode[k].setValue(value) : targetNode[k].value = value;
                                        }
                                    }
                                }else if(node.tagName === ""){
                                    node.setValue ? node.setValue(value) : node.value = value;
                                }
                            }
                            // if(node.tagName === "lyte-search"){
                            //     node.setValue(value);
                            // }else{
                            //     node.setData('ltPropValue',value);
                            // }
                        }
                    }else if (actionJson.actions_found[i].action === "Scroll"){
                        var action = actionJson.actions_found[i];
                        var paramLen = action.params.length;
                        for(var j = 0; j < paramLen; j+=2){
                            var node = nodeMapping[action.params[j].value[0]];
                            node = node.element ? node.element : node;
                            if(!node && !action.params[j+1]){
                                if(action.params[j].value[0] === 'DOWN'){
                                    window.scrollTo(0, window.innerHeight)
                                }else if(action.params[j].value[0] === 'UP'){
                                    window.scrollTo(0, 0)
                                }
                            }else if(action.params[j+1].value[0] === 'DOWN'){
                                node.scrollTop = node.scrollHeight;
                            }else if(action.params[j+1].value[0] === 'UP'){
                                node.scrollTop = 0;
                            }
                        }
                    }
                }
                contextual_data.zia_response = actionJson;

                // REFACTOR: Rename event - Done
                Lyte.triggerEvent("onVoiceAssistanceSuccess",{type : 'success', message : user_sentence});
            }else{
                // REFACTOR: Rename event - Done
                Lyte.triggerEvent("onVoiceAssistanceFailure",{type : 'error', message : user_sentence ? user_sentence : "There is no voice input."});
            }
        }
        function handlecustomCommands(actionJson){
            var len = actionJson.length;
            for(var i = 0; i < len; i++){
                if(actionJson[i].action === "Click" || actionJson[i].action === "Select" || actionJson[i].action === "Enter"){
                    var action = actionJson[i];
                    var paramLen = action.params.length;
                    for(var j = 0; j < paramLen; j++){
                        var shortcutObj = nodeMapping[(action.params[j].value && action.params[j].value.length > 0 ) ? action.params[j].value[0] : action.params[j].value];
                        if(shortcutObj && shortcutObj === 'predefinedCommand'){
                            config.ltPropcustomAction.customActionHandle(actionJson);
                        }
                    }
                }
            }
        }
        function clickClosestElement(node){
            if(node.parentElement && node.parentElement.click){
                node.parentElement.click();
                return;
            }

            // REFACTOR: Are there cases when parentElement will not have click?
            clickClosestElement(node.parentElement);
        }

		//listeners handling
		function numberingHanlind(){
			resetNumbering();
			if(scrollTimeOut){
				clearTimeout(scrollTimeOut);
			}
			scrollTimeOut = setTimeout(() => {
				clearTimeout(scrollTimeOut);
				configForVoiceAssistance();
			}, 1000);
		}
		document.addEventListener('scroll', function(){
			var ac_mainVA = $L('#ac_mainVA');
			if(ltPropEnableNumbering && (!ac_mainVA || ac_mainVA.length === 0 || ac_mainVA[0].innerText ==="" || ac_mainVA[0].innerText === "Please give correct voice over." || ac_mainVA[0].innerText === 'Failure from server side.' || ac_mainVA[0].innerText === config.ltPropDisplayMessage )){
				numberingHanlind();
			}
		}, true);
		document.addEventListener('click', function(){
			var voiceassistanceShortcut=$L('lyte-voice-assistance');
			if(ltPropEnableNumbering){
				if(interval){
					clearInterval(interval);
				}
				interval = setInterval(function(){
					if(!voiceassistanceShortcut || voiceassistanceShortcut.length === 0 || !voiceassistanceShortcut[0].component || !voiceassistanceShortcut[0].component.data || (!voiceassistanceShortcut[0].component.data.isProcessing && !voiceassistanceShortcut[0].component.data.isListening)){
						clearInterval(interval);
						if(ltPropEnableNumbering){
							numberingHanlind();
						}
					}
				}, 50);
			}
		}, true);
    }
});