$L.prototype.extend({
    cruxMergeField:function(data){ 
        if(!this.length){
            return;
        }
        var mer_field=this[0];
        var keysDown = {};
        // mer_field.classList.add("cx_drop_down_field");
        var id=mer_field.id?"#"+mer_field.id:"."+mer_field.classList[0];
        var featureData=data;
        var textareaNode=this
        //return if the plugin already binded to the node 
        if(mer_field.nodeName === "LYTE-INPUT" || mer_field.nodeName === "CRUX-TEXT-AREA-COMPONENT"){
            textareaNode= $L("textarea" , mer_field); //NO I18N
        }
        if(mer_field.nodeName=="LYTE-INPUT" && !textareaNode[0]){
            textareaNode= $L("input" , mer_field); //NO I18N
        }
        mer_field=textareaNode[0];
        if(mer_field.cruxMergeField &&!featureData.destroy){
            return;
        }

        //removing all events and closing the popup
        if(featureData.destroy===true){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
            // document.removeEventListener("click",window.cruxMergeField.bodyClick)
            if(mer_field.cruxMergeField){
                this[0].removeEventListener("keyup",mer_field.cruxMergeField.onKeyUpEvent,true);
                this[0].removeEventListener("keydown",mer_field.cruxMergeField.onKeyDownEvent)
                this[0].removeEventListener("click", mer_field.cruxMergeField.onClickEvent);
                this[0].removeEventListener("select",mer_field.cruxMergeField.selectAllContent);
                // if(mer_field && mer_field.classList.contains('cx_drop_down_field')){
                //     mer_field.classList.remove('cx_drop_down_field')
                // }
                var merge_field_body= $L("crux-merge-field-body")[0];
                if(  merge_field_body && merge_field_body.querySelector(".mergeFeildPopOver")){
                    $L("crux-merge-field-body")[0].querySelector(".mergeFeildPopOver").ltProp("show",false)
                }
                delete mer_field.merge_renderd;
                delete mer_field.cruxMergeField;
            }
        }else{
            //default Values Initilization 
            var defaulValues={
                cxPropSectionKeyName:"name",
                cxPropUserValue:"field_label",
                cxPropSystemValue:"id",
                cxPropReferenceId:"module_ref_id",
                cxPropType:"callout",
                cxPropWidth:"232px",
                cxPropOptSupport:false,
                cxPropRenderHtmlInUserValue:false,
                cxPropOpenMergeFieldOnClick:false,
                cxPropShowWithoutHash:false,
			    cxPropIsMergeFieldSort:false,
                cxPropCloseOnEscape:true,
                cxPropCloseOnScroll:false,
                cxPropZcqa:"",
                cxPropHeight:"300px",
                cxPropMaxsearch:10,
                cxPropAutoWidthAlign:false,
                cxPropPlacement:"bottom",
                cxPropInvokeCharacter:'#',
                cxPropIsLyteTextEditorEnabled : false,
                cxPropWrapperClass : ""
            }
            //Initialization of cxPropdata
            var cxPropUserValue=featureData.cxPropUserValue?featureData.cxPropUserValue:defaulValues.cxPropUserValue;
            var cxPropSystemValue=featureData.cxPropSystemValue?featureData.cxPropSystemValue:defaulValues.cxPropSystemValue;
            var cxPropField=featureData.cxPropField&&featureData.cxPropField.field_details?featureData.cxPropField.field_details:featureData.cxPropField
            var KeyCodes={"LEFT":37,"RIGHT":39,"ESC":27,"UP":38,"DOWN":40,'Alt':18};
            var cxPropSelectAll=false
            var currentPoint=0;
            var currentSearch=false;
            var cxPropDropOptions=featureData&& featureData.cxPropField &&featureData.cxPropField.modules;
            var cxPropSectionKeyName=featureData.cxPropSectionKeyName?featureData.cxPropSectionKeyName:defaulValues.cxPropSectionKeyName;
            var cxPropReferenceId=featureData.cxPropReferenceId?featureData.cxPropReferenceId:defaulValues.cxPropReferenceId
            var cruxMergeComp;
            var offsetValu={};
            var cxPropType=featureData.cxPropType?featureData.cxPropType:defaulValues.cxPropType;
            var cxPropWidth=featureData.cxPropWidth?featureData.cxPropWidth:defaulValues.cxPropWidth;
            var cxPropOptSupport=featureData.cxPropOptSupport?featureData.cxPropOptSupport:defaulValues.cxPropOptSupport;
            var cxPropRenderHtmlInUserValue=featureData.cxPropRenderHtmlInUserValue?featureData.cxPropRenderHtmlInUserValue:defaulValues.cxPropRenderHtmlInUserValue;
            var cxPropOpenMergeFieldOnClick=featureData.cxPropOpenMergeFieldOnClick?featureData.cxPropOpenMergeFieldOnClick:defaulValues.cxPropOpenMergeFieldOnClick;
            var cxPropShowWithoutHash=featureData.cxPropShowWithoutHash?featureData.cxPropShowWithoutHash:defaulValues.cxPropShowWithoutHash;
            var cxPropIsMergeFieldSort=featureData.cxPropIsMergeFieldSort?featureData.cxPropIsMergeFieldSort:defaulValues.cxPropIsMergeFieldSort;
            var cxPropCloseOnEscape=featureData.cxPropCloseOnEscape?featureData.cxPropCloseOnEscape:defaulValues.cxPropCloseOnEscape;
            var cxPropCloseOnScroll=featureData.cxPropCloseOnScroll?featureData.cxPropCloseOnScroll:defaulValues.cxPropCloseOnScroll;
            var mergefield_tag;
            var cxPropZcqa=featureData.cxPropZcqa?featureData.cxPropZcqa:defaulValues.cxPropZcqa;
            var cxPropHeight=featureData.cxPropHeight?featureData.cxPropHeight:defaulValues.cxPropHeight;
            var cxPropMaxsearch=featureData.cxPropMaxsearch?featureData.cxPropMaxsearch:defaulValues.cxPropMaxsearch;
            var cxPropAutoWidthAlign    =   featureData.cxPropAutoWidthAlign || defaulValues.cxPropAutoWidthAlign;
            var cxPropPlacement         =   featureData.cxPropPlacement      || defaulValues.cxPropPlacement;
            var cxPropMaxWidth          =   featureData.cxPropMaxWidth       || defaulValues.cxPropMaxWidth;
            var cxPropInvokeCharacter   =  featureData.cxPropInvokeCharacter || defaulValues.cxPropInvokeCharacter;
            var cxPropIsLyteTextEditorEnabled = featureData.cxPropIsLyteTextEditorEnabled || defaulValues.cxPropIsLyteTextEditorEnabled ;
            var cxPropWrapperClass      =   featureData.cxPropWrapperClass    || defaulValues.cxPropWrapperClass ;
            //rendering the crux-merge-field-body
            cruxMergeComp= $L("crux-merge-field-body" , mer_field)[0];
            if(cruxMergeComp){
                cruxMergeComp.setData({
                    cxPropDropOptions:cxPropDropOptions,
                    cxPropUserValue:cxPropUserValue,
                    cxPropSystemValue:cxPropSystemValue,
                    cxPropSectionKeyName:cxPropSectionKeyName,
                    cxPropReferenceId:cxPropReferenceId,
                    cxPropType:cxPropType,
                    cxPropWidth:cxPropWidth
                 })
            }else{
                cruxMergeComp=Lyte.Component.render("crux-merge-field-body",{
                    cxPropDropOptions:cxPropDropOptions,
                    cxPropUserValue:cxPropUserValue,
                    cxPropSystemValue:cxPropSystemValue,
                    cxPropSectionKeyName:cxPropSectionKeyName,
                    cxPropReferenceId:cxPropReferenceId,
                    cxPropType:cxPropType,
                    cxPropWidth:cxPropWidth,
                    cxPropMaxsearch:cxPropMaxsearch
                },mer_field);
            }
            // eslint-disable-next-line no-use-before-define
            getRequiredCallBacks();
            //onClick method for popupclick
            cruxMergeComp.setMethods({
                onMergeFieldOptionClick:function(event,value){
                    if(this.$node.onMergeFieldOptionClick){
                        this.$node.onMergeFieldOptionClick(event,value);
                    }else {
                        //module name
                        if(this.data.cxPropShowWithoutHash){
                            var text= this.$node._element; //eslint-disable-line @zoho/zstandard/no-reserved-words
                            if(text.value){
                                text.value=value[this.data.cxPropUserValue];
                            }else{
                                text.textContent=value[this.data.cxPropUserValue];
                            } 
                        }else{
                            var replace_string;
                            if(!this.$node.onMergeFieldGetReplaceData){
                                var module=   this.data.cxPropDropOptions.filter(function(item){
                                return item[this.data.cxPropSystemValue]==value[this.data.cxPropReferenceId]
                                }.bind(this));
                                var lookup=module[0].isLookupModule;
                                var module_name=module[0][this.data.cxPropUserValue];
                            }else{
                                replace_string=this.$node.onMergeFieldGetReplaceData(event,value);
                            }
                            //eslint-disable-next-line @zoho/zstandard/no-reserved-words
                            var text= this.$node._element;
                            var pos=$L(text).caret("pos"); //eslint-disable-line no-redeclare 
                            if(text.tagName=="DIV"){
                                pos=this.$node.selectionPoint
                            }else if(this.data.cxPropIsLyteTextEditorEnabled){
                                // pos=$L('lyte-texteditor').get(0).getCursor() ;
                                pos=mer_field.getCursor();
                            }
                            //textContent till cxPropInvokeCharacter
                            var  begin_text=text.value?text.value.substring(0,pos):text.textContent.substring(0,pos);
                            //content after cxPropInvokeCharacter
                            var remaining=text.value?text.value.substring(pos):text.textContent.substring(pos);
                            //position of cxPropInvokeCharacter in the begin_text
                            var index=begin_text.lastIndexOf(cxPropInvokeCharacter);
                            if(!replace_string){
                                if(lookup){
                                    replace_string="${Lookup:"+module_name+'.'+value[this.data.cxPropUserValue]+"}";
                                }else{
                                    replace_string="${"+module_name+'.'+value[this.data.cxPropUserValue]+"}";
                                }
                            }
                        
                            var content=begin_text.substring(0,index)+replace_string+remaining;
                            //setting the content to lyte-input
                            var tag_type=text.parentNode && text.parentNode.parentNode
                            if(tag_type && text.parentNode.parentNode.tagName=="LYTE-INPUT"){
                                tag_type.setData("ltPropValue",content);
                            }else{
                                if(this.data.cxPropIsLyteTextEditorEnabled){
                                    var lyte_editor=$L(mer_field);
                                    lyte_editor.get(0).removeLetters(pos-index);
                                    lyte_editor.get(0).insertHTML(replace_string) ;
                                    lyte_editor.get( 0 ).focus();
                                    return ;
                                }
                               else if(text.value){
                                    text.value=content;
                                }else{
                                    text.textContent=content
                                }
                                // selectionflag=true;
                                var cal_length=begin_text.substring(0,index).length+replace_string.length;
                                //set the cursor postion
                                    $L(text).caret("pos",cal_length)
                            }
                            text.focus();
                        }
                    }
                },
                onMergerFieldClose:function(event,element){
                    if(this.$node.onMergerFieldClose){
                        this.$node.onMergerFieldClose(event,element);
                    }
                },
                onBeforeMergeFieldShow:function(element){
                    if(this.$node.onBeforeMergeFieldShow){
                        this.$node.onBeforeMergeFieldShow(element) ;
                    }
                },
                onMergeFieldShow:function(element){
                    if(this.$node.onMergeFieldShow){
                        this.$node.onMergeFieldShow(element) ;
                    }
                }
            })
            //binding all events to mer_field(binded to this)
            mer_field.cruxMergeField={};
            //onKeyDownEvent
            mer_field.cruxMergeField.onKeyUpEvent=function(event) {
                var textContent;
                if(cxPropIsLyteTextEditorEnabled){
                    var lyte_editor=$L(mer_field);
                    mergefield_tag=lyte_editor[0].querySelector(".lyteEditorCursor") ;
                    if(lyte_editor[0].component.data.ltPropTextMode){
                        textContent = lyte_editor.find('textarea')[0].value;
                    }else{
                        var node_text=lyte_editor.get(0).getCurrentNode() ;
                        textContent= node_text.textContent ;
                    }
                }
                else if(featureData.SearchEvent && featureData.SearchEvent.constructor === Function) {
                    mergefield_tag= featureData.SearchEvent();
                    textContent=$(mergefield_tag).attr('_text_content');
                    $(mergefield_tag).removeAttr('_text_content');
                }else{
                    textContent =event.target.value?event.target.value:event.target.textContent;
                }
                cruxMergeComp = $L(this).find('crux-merge-field-body')[0] || cruxMergeComp;
                if(cxPropShowWithoutHash){
                    if(checkForKeyEventFn(event)===false){ //eslint-disable-line no-use-before-define
                        return ;
                    }
                    showMergeFieldWithoutHash(textContent); //eslint-disable-line no-use-before-define
                }else if(event.key !== "Shift"){
                    if((textContent.length!=0  && textContent!=undefined) &&textContent.includes(cxPropInvokeCharacter) ){ //eslint-disable-line eqeqeq
                            if(checkForKeyEventFn(event)===false){ //eslint-disable-line no-use-before-define
                                return ;
                            };
                            if(keysDown[event.key] && event.key === 'Meta' && (event.key==='a'||event.key==='A')){
                                cruxMergeComp.setData("cxPropShow",false);
                                delete keysDown[event.key];
                                keysDown={}
                                return;
                            }
                            var cxMerComp=cruxMergeComp&&cruxMergeComp.component? cruxMergeComp.component.$node.querySelector(".mergeFeildPopOver"):undefined;
                            if(cxMerComp && cxMerComp.component.data.ltPropShow==false && currentSearch==true){
                                currentSearch=false
                            }
                            var lyteEditor=$L(mer_field);  //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                            if(currentSearch==false && cruxMergeComp.component.$node.querySelector(".mergeFeildPopOver").component.data.ltPropShow==false){
                                if(cxPropIsLyteTextEditorEnabled){
                                    currentPoint=  lyteEditor.get(0).getCursor();
                                }else{
                                    currentPoint=this.tagName=="DIV" || this.tagName=="TD" || this.tagName=="P" ?window.getSelection().getRangeAt(0).startOffset:mer_field.selectionStart;
                                }
                               
                            }
                            var searchPoint ;
                            if(cxPropIsLyteTextEditorEnabled){
                                searchPoint= lyte_editor.get(0).getCursor();
                            }else{
                                searchPoint =this.tagName=="DIV" || this.tagName=="TD" || this.tagName=="P" ?window.getSelection().getRangeAt(0).startOffset:mer_field.selectionStart;  //eslint-disable-line eqeqeq
                            }
                           
                            //setting the selection point to component
                            if(this.tagName=="DIV" || this.tagName=="P"){
                                cruxMergeComp.selectionPoint=searchPoint
                            }
                            //callback for handling the entire data
                            getRequiredCallBacks(); //eslint-disable-line no-use-before-define
                            if(event.key=='Backspace'){
                                var hashIndexValue=0;
                                for (var i = searchPoint-1 ; i >= 0; i--) {
                                    if (textContent[i] === cxPropInvokeCharacter) {
                                        hashIndexValue = i+1;
                                    break;
                                    }
                                }
                                if(hashIndexValue==0){
                                    cruxMergeComp.setData("cxPropShow",false);
                                    return;
                                }
                                currentPoint=hashIndexValue;
                                if(searchPoint==hashIndexValue){
                                    currentSearch=false;
                                }
                            }
                        
                            //open the popup along with the dropdown for cxPropInvokeCharacter 
                            if(!cxPropSelectAll&& currentSearch==false && (event.key == cxPropInvokeCharacter || textContent.charAt(searchPoint-1) == cxPropInvokeCharacter) &&currentPoint==searchPoint){ //eslint-disable-line eqeqeq
                                //popover move along with the cxPropInvokeCharacter
                                getMergeFieldBodyDetails(); //eslint-disable-line no-use-before-define
                                    currentSearch=true
                                // }, 0.1);
                                
                            }else{
                                if(cxMerComp && cxMerComp.component.data.ltPropShow==false && event.key!='Backspace'){
                                    return;
                                }
                                //  hide the dropdown and show the search content
                                var searchContent;
                                if(currentPoint>searchPoint){
                                    return ;
                                }
                                    searchContent=textContent.substring(currentPoint,searchPoint);
                                var arr = cxPropField; //NO I18n
                                var _name = cxPropUserValue; //NO I18n
                                var arr_values = [];
                                // var arr_un = [];
                                if(searchContent.length > 0){
                                    // if(arr[0][name] !== undefined && val.length > 0){
                                    //  arr_un = $L.search(arr,name,val,"includes",{caseSensitive : false});//NO I18N
                                    //  cruxMergeComp.setData("cxPropField",arr_un);//NO I18N
                                    // }else if(val.length > 0){
                                    searchContent = searchContent.replace(/\u00A0/, " ");
                                    arr_values=getSearchArray(arr,_name,searchContent); //eslint-disable-line no-use-before-define
                                    // }
                                }
                                if(arr_values.length==0){
                                    currentSearch=false;
                                    cruxMergeComp.setData("cxPropShow",false);
                                }else{
                                    if(event.key=="Backspace"){
                                        if(cxPropType!="box"){
                                            var style = getComputedStyle(mer_field);
                                            var content=searchContent
                                            var pos_pix=textContentToPixels(content,style.getPropertyValue('font-size'),style.getPropertyValue('font-family'),style.getPropertyValue('font-weight')); //eslint-disable-line no-use-before-define
                                            if(cxPropIsLyteTextEditorEnabled){
                                                var { left, top, height } = $L(mer_field)[0].getCursorClient(); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
                                                offsetValu = { left, top, height };
                                            }else{
                                                offsetValu=mergefield_tag?$L(mergefield_tag).caret('offset'):$L(mer_field).caret('offset');
                                            }
                                                offsetValu.left=(offsetValu.left-10-pos_pix)+"px";
                                                offsetValu.top=(offsetValu.top)+"px";
                                                if(mergefield_tag){
                                                    offsetValu.top=parseFloat(offsetValu.top)-10+parseFloat(window.getComputedStyle(mergefield_tag).getPropertyValue('font-size'))+"px";
                                                }
                                                offsetValu.height=15+"px";
                                                offsetValu.width=15+"px";
                                        }else{
                                            var d_f= cxPropWidth.replace(/[^\d]/g, '');
                                            offsetValu=$L(mer_field).offset();
                                            offsetValu.left=offsetValu.left+d_f/2+"px";
                                            offsetValu.top=offsetValu.top+mer_field.clientHeight+"px" ;
                                        }
                                    }
                                    var _self=cruxMergeComp
                                    // setTimeout(() => {
                                    currentSearch=true;
                                    _self.setData("cxPropOffset",offsetValu);
                                    _self.merge_field_text_content=searchContent;
                                        // _self.setData("cxPropOrigin",id);
                                        _self.component.$node.querySelector(".mergeFeildPopOver").component.setData("ltPropShow",true);
                                        _self.setData({"cxPropShow":true,"cxPropShowDropdown":false,"cxPropField":arr_values})
                                        // _self.setData("cxPropShow",true);
                                        // _self.setData("cxPropShowDropdown",false);
                                        // _self.setData("cxPropField",arr_values);
                                    
                                // }, 0.1);
                                }
                            }
                        }else{
                            currentPoint=textContent.trim().length;
                            cruxMergeComp&& cruxMergeComp.setData("cxPropShow",false);
                            currentSearch=false
                        }
                }
            delete keysDown[event.key];  
            cxPropSelectAll=false
            }

            mer_field.cruxMergeField.onClickEvent=function(event){
                if(cxPropShowWithoutHash){
                    getRequiredCallBacks(); //eslint-disable-line no-use-before-define
                    showMergeFieldWithoutHash(event.target.value?event.target.value:event.target.textContent); //eslint-disable-line no-use-before-define
                }else{
                    if(cxPropOpenMergeFieldOnClick){
                        getRequiredCallBacks(); //eslint-disable-line no-use-before-define
                        var clk_txt=mer_field.value;
                        if(clk_txt.charAt(clk_txt.length-1) != cxPropInvokeCharacter){ //eslint-disable-line eqeqeq
                            var val=clk_txt + cxPropInvokeCharacter;
                            mer_field.parentNode.parentNode.setData("ltPropValue",val)
                        }
                        mer_field.focus();
                        currentPoint=this.tagName=="DIV" || this.tagName=="TD" || this.tagName=="P" ?window.getSelection().getRangeAt(0).startOffset:mer_field.selectionStart;
                        getMergeFieldBodyDetails(); //eslint-disable-line no-use-before-define
                    }else{
                        currentSearch=false;
                    }
                }
            }
            // window.cruxMergeField.bodyClick=function(event){
            //     currentSearch=false;
            // }
            mer_field.cruxMergeField.onKeyDownEvent=function(event){
                keysDown[event.key] = true;
            }
            mer_field.cruxMergeField.selectAllContent= function(event){
                cruxMergeComp = $L(this).find('crux-merge-field-body')[0] || cruxMergeComp;
                if(cxPropOpenMergeFieldOnClick){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
                    if(keysDown.Meta==true && keysDown.a==true){
                        cruxMergeComp.setData("cxPropShow",false);
                    }
                }else{
                    cruxMergeComp.setData("cxPropShow",false);
                }
                keysDown={}
                // if(!selectionflag){
                //     cxPropSelectAll=true
                // }
                // selectionflag=false
            }
            
            // document.addEventListener("click",window.cruxMergeField.bodyClick)
            this[0].addEventListener("keyup",mer_field.cruxMergeField.onKeyUpEvent,true);
            this[0].addEventListener("keydown",mer_field.cruxMergeField.onKeyDownEvent)
            this[0].addEventListener("click", mer_field.cruxMergeField.onClickEvent);
            this[0].addEventListener("select", mer_field.cruxMergeField.selectAllContent);
            function textContentToPixels(textContent, fontSize,fontFamily,fontWeight) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    context.font =fontWeight + ' ' +fontSize + ' ' + fontFamily ;
                    var textWidth = context.measureText(textContent).width;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    return textWidth;
            }
            function getSearchArray(arr,name,val){
                var dummy_array=[]
                arr.forEach(function(item) {
                    if(item[name] != undefined){
                    var res = $L.search(item,name,val,"includes",{caseSensitive : false})
                        if(res.length > 0){
                            dummy_array.push(res[0]);//NO I18N
                        }
                    }else if(cxPropOptSupport){
                        for (var key in item) {
                            var obj = {};
                            obj[key] = $L.search(item[key], name, val,"includes",{caseSensitive : false});//NO I18N
                            if(obj[key].length > 0){
                                dummy_array.push(obj);
                                }
                        }
                    }
                    else{
                        var moduleName=item.module[cxPropUserValue]
                        item=item.sections
                        var obj = {}; //eslint-disable-line no-redeclare
                        var arr=[]; //eslint-disable-line @zoho/zstandard/no-param-variable
                        for (var i=0;i<item.length;i++) {
                        arr=[...arr,...$L.search(item[i].fields, name, val,"includes",{caseSensitive : false})];
                        } 
                        obj[moduleName] = arr//NO I18N
                            if(obj[moduleName].length > 0 ){
                                dummy_array.push(obj);
                            }
                    }
                });
                return dummy_array;
            }
            function getMergeFieldBodyDetails(field_arr,left_adj){
                if(cxPropType!="box"){
                    if(cxPropIsLyteTextEditorEnabled){
                        var { left, top, height } = $L(mer_field)[0].getCursorClient();
                        offsetValu = { left, top, height };
                    }else{
                        offsetValu=mergefield_tag?$L(mergefield_tag).caret('offset'):$L(mer_field).caret('offset');
                    }
                    offsetValu.left=(offsetValu.left-10)+"px";
                    offsetValu.top=(offsetValu.top)+"px";
                    if(mergefield_tag){
                        var get_boundrydata=mergefield_tag?mergefield_tag.getBoundingClientRect():mer_field.getBoundingClientRect();
                        var viewportHeight = window.innerHeight;
                        var bottom_height = viewportHeight - get_boundrydata.top;
                    if( bottom_height < parseFloat(cxPropHeight) ){
                            offsetValu.bottom=parseFloat(offsetValu.top)+10-parseFloat(window.getComputedStyle(mergefield_tag?mergefield_tag:mer_field).getPropertyValue('font-size'))+"px";
                    }else{
                            offsetValu.top=parseFloat(offsetValu.top)-10+parseFloat(window.getComputedStyle(mergefield_tag?mergefield_tag:mer_field).getPropertyValue('font-size'))+"px";
                    }
                    }
                    offsetValu.height=15+"px";
                    offsetValu.width=15+"px";
                }else{
                    //popover will be sticky along with the field
                    var d_f=0;
                    if(cxPropWidth!=='auto'){
                        d_f= cxPropWidth.replace(/[^\d]/g, '');
                    }
                    offsetValu=$L(mer_field).offset();
                    var left_adj_width=left_adj?left_adj:0;
                    offsetValu.left=offsetValu.left+d_f/2+left_adj_width+"px";
                    offsetValu.top=offsetValu.top+mer_field.clientHeight+"px";
                }
                var _self=cruxMergeComp
            //   setTimeout(() => {
                    // _self.setData("cxPropOrigin",id);
                    _self.setData({"cxPropOffset":offsetValu,"cxPropWidth":cxPropWidth , "cxPropPlacement" : cxPropPlacement ,"cxPropMaxWidth": cxPropMaxWidth ? `${cxPropMaxWidth}px` : cxPropMaxWidth});
                    // _self.setData("cxPropOffset",offsetValu)
                    // _self.setData("cxPropWidth",cxPropWidth)
                    // _self.setData("cxPropShow",true);
                    if(!cxPropOptSupport){
                        _self.setData({"cxPropDropOptions":cxPropDropOptions,"cxPropSelected":cxPropDropOptions[0][cxPropSystemValue],"cxPropShowDropdown":true,cxPropMaxsearch:cxPropMaxsearch});
                        //  _self.setData("cxPropDropOptions",cxPropDropOptions);
                        //  _self.setData("cxPropSelected",cxPropDropOptions[0][cxPropSystemValue]);
                        // _self.setData("cxPropShowDropdown",true);
                    }else{
                        _self.setData("cxPropShowDropdown",false);
                    }
                    _self.setData({"cxPropOptSupport":cxPropOptSupport, 
                    "cxPropIsMergeFieldSort":cxPropIsMergeFieldSort,
                    "cxPropRenderHtmlInUserValue":cxPropRenderHtmlInUserValue,
                    "cxPropSystemValue":cxPropSystemValue,"cxPropUserValue":cxPropUserValue,
                    "cxPropField":cxPropShowWithoutHash?field_arr:cxPropField,
                    "cxPropType":cxPropType,"cxPropCloseOnEscape":cxPropCloseOnEscape, "cxPropCloseOnScroll" : cxPropCloseOnScroll,
                    "cxPropShowWithoutHash":cxPropShowWithoutHash, "cxPropIsLyteTextEditorEnabled" :cxPropIsLyteTextEditorEnabled , "cxPropZcqa":cxPropZcqa, "cxPropWrapperClass":cxPropWrapperClass, "cxPropShow":true
                    })
                    // _self.setData("cxPropOptSupport",cxPropOptSupport);
                    // _self.setData("cxPropRenderHtmlInUserValue",cxPropRenderHtmlInUserValue);
                    // _self.setData("cxPropSystemValue",cxPropSystemValue);
                    // _self.setData("cxPropUserValue",cxPropUserValue);
                    //   _self.setData("cxPropField",cxPropShowWithoutHash?field_arr:cxPropField);
                    //   _self.setData("cxPropType",cxPropType);
                    //   _self.setData("cxPropShowWithoutHash",cxPropShowWithoutHash);
                    if(cxPropIsLyteTextEditorEnabled){
                        _self._element = mer_field.getCurrentNode();
                    }else{
                        _self._element = mer_field;
                    }
                    _self.component.$node.querySelector(".mergeFeildPopOver").component.setData("ltPropShow",true);
            }
            function getRequiredCallBacks(){
                cruxMergeComp.onMergeFieldOptionClick    = featureData.onMergeFieldOptionClick || undefined;
                cruxMergeComp.onMergeFieldGetReplaceData = featureData.onMergeFieldGetReplaceData || undefined;
                cruxMergeComp.onMergerFieldClose         = featureData.onMergerFieldClose || undefined;
                cruxMergeComp.onBeforeMergeFieldShow     = featureData.onBeforeMergeFieldShow || undefined;
                cruxMergeComp.onMergeFieldShow           = featureData.featureData || undefined;
            }
            function showMergeFieldWithoutHash(get_ctnt){
                if(get_ctnt.length===0 && cruxMergeComp.getData('cxPropShow')===true){
                    cruxMergeComp.setData("cxPropShow",false);
                }
                if(get_ctnt.length>0){
                    return new Promise((resolve) => {
                            featureData.onMergeFieldApiResponse(get_ctnt)
                            .then((resp)=>{
                                if(resp && resp.length>0){
                                    if(typeof resp[0].index_to_replace!=="undefined"){
                                        var style = getComputedStyle(mer_field);
                                        var content=mer_field.value?mer_field.value.slice(0,resp[0].index_to_replace):"";
                                        var left_adj=textContentToPixels(content,style.getPropertyValue('font-size'),style.getPropertyValue('font-family'),style.getPropertyValue('font-weight'))+10;
                                    }
                                    if(cxPropAutoWidthAlign){
                                        cxPropWidth="auto";
                                        cxPropPlacement="bottomLeft";
                                        cxPropMaxWidth=mer_field.offsetWidth-(left_adj || 0);
                                    }
                                    getMergeFieldBodyDetails(resp,left_adj);
                                }else{
                                    cruxMergeComp.setData("cxPropShow",false);
                                    return ; //eslint-disable-line no-useless-return
                                }
                            })
                            .catch(()=>resolve([]));
                        });
                }
            }
            function checkForKeyEventFn(event){
                if(event.key==="Meta"  || event.key === "Control" || event.key=== 'CapsLock' || event.keyCode===KeyCodes.ESC  || event.keyCode===KeyCodes.RIGHT || event.keyCode===KeyCodes.LEFT  || event.keyCode===KeyCodes.DOWN || event.keyCode===KeyCodes.UP || event.keyCode===KeyCodes.Alt || event.key==="Enter"){
                    if((event.keyCode===KeyCodes.RIGHT || event.keyCode===KeyCodes.LEFT || keysDown.a) && !cxPropShowWithoutHash){
                        setTimeout(() => {
                            cruxMergeComp.setData("cxPropShow",false);
                        }, 10);
                    }
                    var bool = false;
                    if(event.key==="Meta" && keysDown['v']){ //temp fix for paste action.
                        bool = true;
                    }
                    keysDown={};
                    return bool;
                }
                delete keysDown[event.key];
                return true;
            }
        }
    }
})
