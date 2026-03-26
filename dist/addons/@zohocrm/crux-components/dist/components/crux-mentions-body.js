//$Id$
Lyte.Component.register("crux-mentions-body", {
_template:"<template tag-name=\"crux-mentions-body\"> <ul class=\"mentionBody {{dropdownClass}} cxMentionsWrapper\"> <template is=\"for\" items=\"{{mentions}}\" item=\"mention\" index=\"index\"> <lyte-mentions-item class=\"cruxMentionsLi\" onclick=\"{{action('addMention',event,mention)}}\"> <template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Users&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage cxMentionsImage\"> <template is=\"if\" value=\"{{expHandlers(mention.image_link,'!')}}\"><template case=\"true\"> <span class=\"mentionsNoPhoto cxMentionsNoImage\"></span> </template><template case=\"false\"> <img src=\"{{mention.image_link}}\" class=\"cxMentionsUserImage mentionsUserImage\"> </template></template> </div> <div class=\"cruxMentionItem\"> <div class=\"cxMentionsPrimaryDetail\">{{mention.full_name}}</div> <div class=\"cxMentionsSecondaryDetail\">{{mention.email}}</div> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Groups&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage groupsLi\"> <span class=\"mentionsGroupIcon\"></span> </div> <span><span class=\"mentionsLiName\">{{mention.name}} - </span><span class=\"mentionsLiLabel\">{{cruxGetI18n('crm.security.group')}}</span></span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(mention.$setype,'===',&quot;Roles&quot;)}}\"><template case=\"true\"> <div class=\"mentionsLiImage rolesLi\"> <span class=\"mentionsRoleIcon\"></span> </div> <span><span class=\"mentionsLiName\">{{mention.name}} - </span><span class=\"mentionsLiLabel\">{{cruxGetI18n('crm.security.role')}}</span></span> </template></template></template></template></template></template> </lyte-mentions-item> </template> </ul> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[3,1,0]},{"type":"text","position":[3,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,0,0]},{"type":"text","position":[3,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[3,0,0]},{"type":"text","position":[3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}],
_observedAttributes :["mentions","textboxSelector","triggerChar","mentionText","mentionedMentions","textareaWidth","features","replWord","lyteDom","dropdownClass"],
_observedAttributesType :["array","string","string","string","array","number","object","string","object","string"],
 //NO i18n
	data : function(){
		return {
			mentions: Lyte.attr("array", {"default": []}), //NO i18n
			textboxSelector: Lyte.attr("string", {"default": ""}), //NO i18n
			triggerChar: Lyte.attr("string", {"default": ""}), //NO i18n
			mentionText: Lyte.attr("string", {"default": ""}), //NO i18n
			mentionedMentions: Lyte.attr("array", {"default": []}), //NO i18n
			textareaWidth: Lyte.attr("number", {"default": 0}), //NO i18n
			// bindingClass: Lyte.attr("string", {"default": ""}), //NO i18n
			features: Lyte.attr("object", {"default": {}}), //NO i18n
			replWord: Lyte.attr("string", {"default": "crm"}), //NO i18n
			lyteDom: Lyte.attr("object", {}), //NO I18N
			dropdownClass : Lyte.attr("string", {"default": ""}) //NO i18n
		}
	},

	didConnect: function() {
		this._textarea = this.$node.parentElement._textarea; //NO I18n

		var textareaWidth = this._textarea.getBoundingClientRect().width;
		this.setData("textareaWidth", textareaWidth); //NO i18n
	},

	didDestroy: function() {
		$L( this._textarea).mentionsInput("destroy"); //NO I18n
	},
	actions: {
		addMention: function(event, mentionData) {
			var mention = $L.extend(true , {} , mentionData);
			if(event) {
				event.preventDefault();
				event.stopPropagation();
			}

			//caches already mentioned mentions in the textarea to prevent duplicates mention in the textarea
			// this.getData("mentionedMentions").push(mention); //NO i18n

			var displayContent = "";

			if(mention.$setype === "Users") { //NO i18n
				displayContent = mention.full_name;
			} else if(mention.$setype === "Groups") { //NO i18n
				displayContent = mention.name;
			} else if(mention.$setype === "Roles") { //NO i18n
				displayContent = mention.name;
			}

			function escapeRegExp(string) {
			  return string.replace(/[*+?^${}()|[\]\\]/g, '$&'); // $& means the whole matched string
			}

			var currentMessage = this._textarea.value;
			var mentionText = escapeRegExp(this.getData("mentionText")); //NO i18n
			var triggerChar = this.getData('triggerChar'); //NO i18n

			// var updatedMentionText;

			// //regular expression for mentions which are used at middle but right before any mention. e.g @user1 @u@user2.
			// var regexMatched = false;
			// var re = new RegExp(triggerChar + mentionText + triggerChar, "gi");
			// if(re.exec(currentMessage) !== null) {
			// 	var lastIndex = currentMessage.lastIndexOf(triggerChar + this.getData("mentionText") + triggerChar); //NO i18n
			// 	updatedMentionText = currentMessage.slice(0, lastIndex) + currentMessage.slice(lastIndex).replace(re, triggerChar + displayContent + " " + triggerChar); //NO i18n
			// 	regexMatched = true;
			// }
			//
			// //regular expression for mentions which are used at end and in middle but right after previous mention before the space.e.g @user1@u @user2.
			// var regex = new RegExp(triggerChar + mentionText + "$" + "|" + triggerChar + mentionText + " " + "|" + triggerChar + mentionText, "gi");
			// if(regex.exec(currentMessage) !== null && regexMatched === false) {
			// 	var lastIndex = currentMessage.lastIndexOf(triggerChar + this.getData("mentionText")); //NO i18n
			// 	updatedMentionText = currentMessage.slice(0, lastIndex) + currentMessage.slice(lastIndex).replace(regex, triggerChar + displayContent + " "); //NO i18n
			// }

			var cursorEndPos = this._textarea.selectionEnd;
			var cursorStartPos = this._textarea.selectionEnd - mentionText.length;
			var mentionFollowingChar = currentMessage.slice(cursorEndPos, cursorEndPos + 1) !== " " ? " " : ""; //NO I18N
			var updatedMentionText = currentMessage.slice(0, cursorStartPos) +
																currentMessage.slice(cursorStartPos, cursorEndPos).replace(mentionText, displayContent +  mentionFollowingChar) +
																currentMessage.slice(cursorEndPos);

			//appends the new mention.
			if(updatedMentionText) {
				this._textarea.value = updatedMentionText;
			}

			//Adds start and end position of the mention to disallow firing network request when any text is appended to already mentioned mentions.
			// if(lastIndex > -1) {
			// mention.position = {start: cursorStartPos - 1, end: cursorStartPos + displayContent.length};
			// }
			var mentionedMentions = this.getData("mentionedMentions") , startPos , endPos; //NO i18n
			startPos = cursorStartPos - 1;
			endPos = displayContent.length + startPos;
			if(mention.$setype === "Users"){
				mention.name = mention.full_name;
			}
			mention.cxPosition = {start: startPos, end: endPos};
			mention.position = {start: startPos, end: endPos};
			var mentionsLen = mentionedMentions.length , menTxtLen = (mentionText.length + 1) - mentionFollowingChar.length ;   //+1 is mentionChar length
			// for(var i = 0; i < mentionsLen; i++) {       //Reset the index after mentioned the name.
			// 	if(mentionedMentions[i].cxPosition.start > startPos){
			// 		mentionedMentions[i].cxPosition.start -= menTxtLen;
			// 		mentionedMentions[i].cxPosition.end -= menTxtLen;
			// 	}
			// }
			mention.currentSelect = true;
			mentionedMentions.push(mention);
			// var mentionsLen = mentionedMentions.length;
			// for(var i = 0; i < mentionsLen; i++) {
			// 	if(mentionedMentions[i].$setype === "Users"){
			// 			mentionedMentions[i].name = mentionedMentions[i].full_name;
			// 	}
			// 	mentionName = mentionedMentions[i].name;
			// 	startPos  = updatedMentionText.indexOf("@" + mentionName); //NO I18N
			// 	endPos = startPos + mentionName.length + 1;
			// 	mentionedMentions[i].position = {start: startPos, end: endPos};
			// }
			//sorts the mentions as per their position
			mentionedMentions = mentionedMentions.sort(function(mention1, mention2) {
				return mention1.cxPosition.start - mention2.cxPosition.start;
			});
			this._textarea._mIData.lyteMICollection = mentionedMentions;
			this.setData("mentionedMentions", mentionedMentions); //NO I18n
			cruxMentionUtil.mentionedMentions = mentionedMentions;
			this._textarea._addedMentions = true;

			//triggers change event to calculate the height of the textarea
			//needs to be validated
		// 	var evt;
		//   if(typeof(Event) === 'function') { //NO I18N
		//       evt = new Event('change'); //NO I18N
		//   }else{
		//       evt = document.createEvent('Event'); //NO I18N
		//       evt.initEvent('change', true, true); //NO I18N
		//   }
		  // textarea.dispatchEvent(evt);
		  	// var evt = new Event('input'); //NO I18N
			// this._textarea.dispatchEvent(evt); //NO I18n
			this._textarea.focus();
			this._textarea.selectionEnd = cursorStartPos + displayContent.length + mentionFollowingChar.length;
			window.cruxMentionUtil.getTextContent({target : this._textarea  , type : 'input'}, mention);

			// setTimeout(function(){
			// 	this._textarea.focus();
			// 	this._textarea.selectionEnd = cursorStartPos + displayContent.length + mentionFollowingChar.length;
			// }.bind(this),100);

			//hides the dropdown.
			// document.querySelector("." + this.getData("bindingClass")).classList.remove('lyteMIDisplayBlock'); //NO i18n
			this.$node.closest(".lyteMIDropdown").classList.remove('lyteMIDisplayBlock' , 'cx_cruxMentionDropdown'); //NO i18n
			this._textarea._lyteDisableParentScrollListeners(this._textarea);
			// document.querySelector("." + this.getData("bindingClass")).setAttribute("style", "width:" + this.getData("textareaWidth") +"px;"); //NO i18n
			var lyteDom = this.getData("lyteDom"); //NO I18N
			if(lyteDom.mIManager){
				lyteDom.mIManager.inputBuffer = [];
			}
		}
	}
});
