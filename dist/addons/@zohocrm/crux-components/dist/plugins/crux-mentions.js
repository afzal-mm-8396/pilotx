(function() {
  if($L) {
    $L.prototype.cruxMention = function(featureObj , values) {
      //here 'this' points to $L(selector);
      if(!this.length){
        console.warn("Textarea element is doesn't exist.Please check."); //eslint-disable-line no-console
        return;
      }
      var mentionInputBox = this[0];
      var features = featureObj ? featureObj : {};
      var textarea , bindEle;
      if(mentionInputBox.nodeName === "TEXTAREA" || mentionInputBox.nodeName === "LYTE-INPUT") { //NO I18n
        bindEle = this;
      }else if(mentionInputBox.nodeName === "CRUX-TEXT-AREA-COMPONENT"){
        bindEle = $L("lyte-input" , mentionInputBox); //NO I18N
      }
      textarea = bindEle[0].querySelector("textarea");
      textarea = textarea ? textarea : bindEle[0];
      //removes all the event bindings to the textarea
      if(features.destroy === true) {
        if(window.cruxMentionUtil){
          //removes the input event bound to textarea for formattedText content in the plugin.
          textarea.removeEventListener('input', window.cruxMentionUtil.getTextContent); //NO I18n

          if(textarea && textarea._mIData) {
            var cruxMentionElem = textarea._mIData.lyteMIList.querySelector("#cruxMention"); //NO I18n

            //removes all events bound by mentionsInput plugin.
            if(cruxMentionElem) {
              cruxMentionElem.remove();
            } else {
              this.mentionsInput("destroy"); //NO I18N
            }
          }
        }
        delete window.cruxMentionUtil; //For codecheck we put this code to the out of the if block.
      }else if(featureObj === "setMessage"){
        if(values && typeof values === 'object'){
          var collections = values.collection , textMessage = values.message ,tChar =  cruxMentionUtil.triggerChar , proName = cruxMentionUtil.productName;
          var regMatch = textMessage.matchAll(proName + "[[aA-zZ]*#[0-9]+#[0-9]+]" + proName);
          var matches = Array.from(regMatch) , sortedArr = [] , inputTxt = textMessage , str , mention;
          for(let i = 0; i < matches.length; i++){
            str = matches[i] , mention = collections[i];
            mention.cxPosition = {};
            mention.cxPosition.start = inputTxt.indexOf(str[0]);
            if(mention.$setype === "Users"){
              mention.name = mention.full_name;
            }
            mention.cxPosition.end = mention.cxPosition.start + mention.name.length;
            sortedArr[i] = $L.extend(true , {} , mention);
            inputTxt = inputTxt.replace(str[0] , tChar + mention.name );
            // textMessage = textMessage.replace(str[0] , tChar + tChar + "[" + mention.name + ":" + mention.id + "]");
          }
          // inputTxt = inputTxt + " ";  // Given a space for the next sentence start.
          // textMessage = textMessage + " ";  // Given a space for the next sentence start.
          cruxMentionUtil.mentionedMentions = sortedArr;
          cruxMentionUtil.cxOldNotes = inputTxt;
          // bindEle.mentionsInput("setMessage" , {message : textMessage , collection : sortedArr});
          var triggerElem = bindEle[0].nodeName === 'TEXTAREA' ? bindEle : bindEle.find('textarea');
          triggerElem[0].value = inputTxt;
          // var evt = new Event('input'); //NO I18N
          // triggerElem[0].dispatchEvent(evt); //NO I18n
        }
      } else {
        //default values for features provided by cruxMention plugin
        var defaultFeatures = {
          textboxSelector: "", //NO i18n
          searchModules: ["users", "groups", "roles"], //NO I18n
          minChars: 2,
          triggerChar: "@", //NO i18n
          componentName: "crux-mentions-body", //NO i18n
          cxPropCacheQuery: true,
          existingMentions: [],
          queryParam: {},
          productName: "crm", //NO i18n
          requestInterval: 0,
          maxMentionNameLength: 101,
          preventParentScroll : false
        }

        // initializing data attributes.
        var textboxSelector = features.textboxSelector ? features.textboxSelector : defaultFeatures.textboxSelector;
        var searchModules = features.searchModules ? features.searchModules : defaultFeatures.searchModules;
        var minChars = !isNaN(features.minChars) ? features.minChars : defaultFeatures.minChars;
        var triggerChar = features.triggerChar ? features.triggerChar : defaultFeatures.triggerChar;
        var componentName = features.componentName ? features.componentName : defaultFeatures.componentName;
        var cxPropCacheQuery = features.cxPropCacheQuery ? features.cxPropCacheQuery : defaultFeatures.cxPropCacheQuery;
        var existingMentions = features.existingMentions ? features.existingMentions : defaultFeatures.existingMentions;
        var queryParam = features.queryParam ? features.queryParam : defaultFeatures.queryParam;
        var productName = features.productName ? features.productName : defaultFeatures.productName;
        var requestInterval = features.requestInterval ? features.requestInterval : defaultFeatures.requestInterval;
        var maxMentionNameLength = features.maxMentionNameLength ? features.maxMentionNameLength : defaultFeatures.maxMentionNameLength;
        var preventParentScroll = features.preventParentScroll ? features.preventParentScroll : defaultFeatures.preventParentScroll;
        var dropdownClass = features.dropdownClass ? features.dropdownClass : "";
        var allowDuplicates = features.allowDuplicates !== undefined ? features.allowDuplicates : true;

        //adds start and end position to mentions as position property from mention is not available on editing the mentions.
        var mentionsLen = existingMentions.length;
        if(mentionsLen) {
          var noteContent = textarea.value;
          var startPos, endPos, mentionName;
          for(var i = 0; i < mentionsLen; i++) {
            // mentionName = existingMentions[i].$setype === "Users" ? existingMentions[i].full_name : existingMentions[i].name; //NO I18N
            if(existingMentions[i].$setype === "Users"){
                existingMentions[i].name = existingMentions[i].full_name;
            }
            mentionName = existingMentions[i].name;
            startPos  = noteContent.indexOf("@" + mentionName); //NO I18N
            endPos = startPos + mentionName.length;
            existingMentions[i].cxPosition = {start: startPos, end: endPos};
            existingMentions[i].position = {start: startPos, end: endPos};
          }
          existingMentions = existingMentions.sort(function(mention1, mention2) {
            return mention1.cxPosition.start - mention2.cxPosition.start;
          });
        }
        //crux mentions utility methods
          window.cruxMentionUtil = {};
          cruxMentionUtil.cxOldNotes = textarea.value;
          cruxMentionUtil.triggerChar = triggerChar;
          cruxMentionUtil.mentionedMentions = existingMentions;
          cruxMentionUtil.productName = productName;

          window.cruxMentionUtil.getPosition = function(charA, charB){
            var startPos , charALen = charA.length;
            for(var i = 0 ; i < charALen ; i++){
              if(charA[i] !== charB[i]){
                startPos = i;
                break;
              }
            }
            return startPos;
          };
          window.cruxMentionUtil.setPosition = function(startPos,mention , diff , newTxt){
            var mentions = cruxMentionUtil.mentionedMentions , len = mentions ? mentions.length : 0;
            if(len){
              for(var i = 0 ; i < len ; i++){
                var curMention =  mentions[i] , curMentionPos = curMention.cxPosition;
                if(curMention && curMention.currentSelect){
                  delete mention.currentSelect;
                  continue;
                }else if((curMentionPos.start + 1 <= startPos && curMentionPos.end >= startPos) || (curMentionPos.start >= startPos && (newTxt.substring(curMentionPos.start + diff , curMentionPos.end + diff + 1) !== (cruxMentionUtil.triggerChar + curMention.name)))){
                  cruxMentionUtil.mentionedMentions.splice(i , 1);
                  i--;len--;
                  continue;
                }
                if(curMention.cxPosition.start >= startPos){
                  curMention.cxPosition.start += diff;
                  curMention.cxPosition.end += diff;
                }
              }
            }
          }
          window.cruxMentionUtil.getTextContent = function (event , mention){
            // clearTimeout(cruxMentionUtil.timeOutRead);
            // cruxMentionUtil.timeOutRead = setTimeout(function(){
              if(event.type !== 'input'){
                return;
              }
              var textarea = event.target;
                var mentionedMentions = cruxMentionUtil.mentionedMentions || [];
                // var triggerChar = cruxMentionUtil.triggerChar;
                // var triggerCharIndices = [];
                var pos , diffCount , newTxt = textarea.value ;
                // if(mention){
                //   pos = {start : mention.cxPosition.start , end : mention.cxPosition.end};
                //   diffCount = pos.end - pos.start;
                //   pos = pos.start;
                // }else{
                  var oldTxt = cruxMentionUtil.cxOldNotes;
                  var oldTxtLen = oldTxt.length , newTxtLen = newTxt.length;
                  if(oldTxtLen < newTxtLen){
                    pos = cruxMentionUtil.getPosition( newTxt , oldTxt );
                  }else{
                    pos = cruxMentionUtil.getPosition( oldTxt , newTxt );
                  }
                  diffCount = newTxtLen  - oldTxtLen;
                // }
                cruxMentionUtil.setPosition(pos , mention , diffCount , newTxt);
                cruxMentionUtil.cxOldNotes = textarea.value;
                cruxMentionUtil.mentionedMentions = mentionedMentions;
                existingMentions = mentionedMentions;
                //callback for formatted text in the textarea, data used to make n/w call while saving the note.
                if(features.cxPropContent && features.cxPropContent.constructor === Function) {
                  if(textarea) {
                    textarea._mIData.lyteMICollection = cruxMentionUtil.mentionedMentions;
                  }
                  var formattedText = cruxMentionUtil.formatMentions(textarea.value, mentionedMentions);
                  features.cxPropContent(formattedText);
                }
            // },400);
          };

        cruxMentionUtil.formatMentions = function(text, mentionedMentions) {
      		var productName = cruxMentionUtil.productName;
          var formatted ,extraLen = 0;

          mentionedMentions.forEach(function(mention) {
            if(mention.$setype === "Users") { //NO i18n
              formatted = productName + "[user#" + mention.id + "#" + mention.zuid + "]" + productName ;
              text = text.slice(0, mention.cxPosition.start + extraLen) + formatted + text.slice(mention.cxPosition.end + extraLen + 1);
              extraLen += (formatted.length - mention.full_name.length) -1;
      			} else if(mention.$setype === "Roles") { //NO i18n
              formatted = productName + "[role#" + mention.id + "#" + mention.id + "]" + productName ;
              text = text.slice(0, mention.cxPosition.start + extraLen) + formatted + text.slice(mention.cxPosition.end + extraLen + 1);
              extraLen += (formatted.length - mention.name.length) - 1;
      			} else if(mention.$setype === "Groups") { //NO i18n
              formatted = productName + "[group#" + mention.id + "#" + mention.id + "]" + productName ;
      				text = text.slice(0, mention.cxPosition.start + extraLen) + formatted + text.slice(mention.cxPosition.end + extraLen + 1);
              extraLen += (formatted.length - mention.name.length) - 1;
      			}
          });
      		return text;
        }

        if(mentionInputBox.nodeName === "TEXTAREA") { //NO I18n
          mentionInputBox.addEventListener('input', window.cruxMentionUtil.getTextContent); //NO I18n
        } else if(mentionInputBox.nodeName === "LYTE-INPUT" || mentionInputBox.nodeName === "CRUX-TEXT-AREA-COMPONENT") { //NO I18n
          mentionInputBox.querySelector("textarea").addEventListener('input', window.cruxMentionUtil.getTextContent); //NO I18n
        }

        // mentionsInput starts here
        var self = this;
        bindEle.mentionsInput({
          'minChars': minChars, //NO i18n
          'triggerChar': triggerChar, //NO i18n
          'dropbody': false, //NO i18n
          'interval': requestInterval, //NO I18n
          'preventParentScroll' : preventParentScroll , //NO I18n
          'onHide':function(list,textarea){ //NO i18n
            list.classList.remove('lyteMIDisplayBlock'); //NO i18n
            list.classList.remove('cx_cruxMentionDropdown'); //NO i18n
          },
          'onDataRequest': function(query) { //NO i18n
            if(query.length > maxMentionNameLength || query.split("  ").length > 1) {
              return [];
            }

            if(features.customRequest && features.customRequest.constructor === Function) {
              return features.customRequest(query);
            } else {
              var qp = {"searchword": query, "meta_resources": searchModules.join(), "display_field": true, page: 1, per_page: 200}; //NO I18N

              for(var key in queryParam) {
                qp[key] = queryParam[key];
              }

              return store.findAll("global-search", qp, cxPropCacheQuery); //NO i18n
            }
          },
          'displayMentions': function(mentions, mentionText) { //NO i18n
            var mentionLen = mentions ? mentions.length : 0 , textarea;
            if(mentionText === self.mIManager.currentDataQuery && mentions && mentionLen > 0) {
              //categorize users, roles and groups
              var userMentions = [];
              var roleMentions = [];
              var groupMentions = [];

              for(var i = 0; i < mentionLen; i++) {
                if(mentions[i].$setype === "Users") { //NO I18n
                  userMentions.push(mentions[i]);
                } else if(mentions[i].$setype === "Roles") { //NO I18n
                  roleMentions.push(mentions[i]);
                } else if(mentions[i].$setype === "Groups") { //NO I18n
                  groupMentions.push(mentions[i]);
                }
              }

              mentions = userMentions.concat(roleMentions).concat(groupMentions);
              //binds each component to its calling textbox.
              // var bindingClass = textboxSelector.startsWith("#") || textboxSelector.startsWith(".") ? textboxSelector.slice(1) : textboxSelector;
              // var cruxMentionComp = document.querySelector("#cruxMention." + bindingClass); //NO i18n
              // var elem = document.querySelector(textboxSelector);
              if(mentionInputBox.nodeName === "TEXTAREA") { //NO I18n
                textarea = mentionInputBox;
              } else if(mentionInputBox.nodeName === "LYTE-INPUT" || mentionInputBox.nodeName === "CRUX-TEXT-AREA-COMPONENT") { //NO I18n
                textarea = mentionInputBox.querySelector("textarea"); //NO I18N
              }
              var dropArea = textarea._mIData.lyteMIList , isDropdownShown = false;
              textarea._mIData.lyteMIList.classList.add("cx_cruxMentionDropdown"); //NO i18n
              var cruxMentionComp = $L(componentName , dropArea)[0];
              if(mentionInputBox && !cruxMentionComp) {
                // filters out existing mentions in the textarea when editing a note.
                var existingMentionsLen = existingMentions.length;
                if(existingMentionsLen > 0 && !allowDuplicates) {
                  mentions = mentions.filter(function(mention) {
                    var mentionFound = false;

                    for(var i = 0; i < existingMentionsLen; i++) {
                      if(existingMentions[i].full_name && existingMentions[i].full_name === mention.full_name) {
                        mentionFound = true;
                        break;
                      } else if(existingMentions[i].name && existingMentions[i].name === mention.name) {
                        mentionFound = true;
                        break;
                      }
                    }

                    //return false to prevent from being added to unmentionedMentions and vice versa
                    return !mentionFound;
                  });
                }
                if(mentions && mentions.length){
                  cruxMentionComp = Lyte.Component.render(componentName, {'lyteDom': self, 'mentions': mentions, 'textboxSelector': textboxSelector, 'triggerChar': triggerChar, 'mentionText': mentionText, 'features': features , 'dropdownClass' : dropdownClass}, ".cx_cruxMentionDropdown"); //NO i18n

                  // sets already mentioned mentions while editing the note.
                  cruxMentionComp.setData("mentionedMentions", existingMentions); //NO I18N
                  // cruxMentionUtil.mentionedMentions = mentionedMentions;
                  cruxMentionComp.setAttribute("id", "cruxMention"); //NO i18n
                  isDropdownShown = true;
                }else{
                  return false;
                }
              } else if(mentionInputBox){
                cruxMentionComp.setData("mentionedMentions", existingMentions); //NO I18N
                var mentionedMentions = cruxMentionComp.getData("mentionedMentions"); //NO i18n
                var mentionedMentionsLen = mentionedMentions.length;

                //filters out already mentioned mentions
                if(!allowDuplicates){
                  mentions = mentions.filter(function(mention) {
                    var mentionFound = false;
  
                    for(var i = 0; i < mentionedMentionsLen; i++) {
                      if(mentionedMentions[i].full_name && mentionedMentions[i].full_name === mention.full_name) {
                        mentionFound = true;
                        break;
                      } else if(mentionedMentions[i].name && mentionedMentions[i].name === mention.name) {
                        mentionFound = true;
                        break;
                      }
                    }
  
                    //return false to prevent from being added to unmentionedMentions and vice versa
                    return !mentionFound;
                  });
                }

                if(mentions.length > 0) {
                  cruxMentionComp.setData({
                    'mentions': mentions,  //NO i18n
                    'textboxSelector': textboxSelector,  //NO i18n
                    'triggerChar': triggerChar,  //NO i18n
                    'mentionText': mentionText //NO i18n
                  });
                  cruxMentionComp.querySelector(".mentionBody").setAttribute("style", "display: block"); //NO i18n
                  dropArea.classList.add('lyteMIDisplayBlock'); //NO I18n
                  isDropdownShown = true;
                } else {
                  self.mIManager.inputBuffer = [];
                  return false;
                }
              }
              if(isDropdownShown && features.onDisplayMentions){
                features.onDisplayMentions(textarea);
              }
            } else {
              return false;
            }
          }
        });
        // mentionsInput ends here
      }
    }
  }
})();
