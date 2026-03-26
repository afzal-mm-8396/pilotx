Lyte.Component.register("crux-merge-field-body", {
_template:"<template tag-name=\"crux-merge-field-body\"> <lyte-beta-popover class=\"mergeFeildPopOver\" lt-prop-wrapper-class=\"cxMergeFieldBodyPopover {{cxPropWrapperClass}}\" lt-prop-placement=\"{{cxPropPlacement}}\" lt-prop-close-on-scroll=\"{{cxPropCloseOnScroll}}\" lt-prop-close-on-escape=\"{{cxPropCloseOnEscape}}\" lt-prop-max-height=\"300px\" lt-prop-width=\"{{cxPropWidth}}\" lt-prop-scrollable=\"true\" lt-prop-duration=\"50\" lt-prop-prevent-focus=\"true\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{cxPropShow}}\" lt-prop-freeze=\"false\" lt-prop-close-on-body-click=\"{{cxPropCloseOnBodyClick}}\" on-close=\"{{method(&quot;onClosePopOver&quot;)}}\" on-show=\"{{method('onPopOverShow')}}\" lt-prop-offset=\"{{cxPropOffset}}\" on-before-close=\"{{method(&quot;onBeforePopupClose&quot;)}}\" lt-prop-type=\"{{cxPropType}}\" lt-prop-auto-align=\"true\" lt-prop-max-width=\"{{cxPropMaxWidth}}\" on-before-show=\"{{method(&quot;onBeforePopOverShow&quot;)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <template is=\"if\" value=\"{{expHandlers(cxPropShowDropdown,'&amp;&amp;',expHandlers(cxPropType,'!=',&quot;box&quot;))}}\"><template case=\"true\"> <crux-dropdown class=\"cxMegeFieldPopModuleDropdown\" cx-prop-selected=\"{{cxPropSelected}}\" on-show=\"{{method('onDropdownOpen')}}\" on-hide=\"{{method('onDropdownHide')}}\" cx-prop-user-value=\"{{cxPropUserValue}}\" cx-prop-system-value=\"{{cxPropSystemValue}}\" cx-prop-options=\"{{cxPropDropOptions}}\" on-option-select=\"{{method('OnDropdownOptionSelected')}}\" on-before-show=\"{{method('onBeforeDropdownShow')}}\" cx-prop-zcqa=\"{{cxPropDropdownDataZcqa}}\" cx-prop-maxsearch=\"{{cxPropMaxsearch}}\"></crux-dropdown> </template></template> <lyte-popover-content class=\"cxMegeFieldPopContent\"> <div class=\"focusDiv\"> <template is=\"for\" items=\"{{field}}\" item=\"value\" index=\"key\"> <template is=\"if\" value=\"{{cruxHasProperty(value,cxPropUserValue)}}\"><template case=\"true\"> <div class=\"cxMergeFieldPopFieldsLabel {{if(value.cxMergeFieldSuffix,'cxFlex','')}}\" onclick=\"{{action('popoverItemClick',event,value)}}\" onmouseover=\"{{action('mouseEvent','over',event)}}\" onmouseout=\"{{action('mouseEvent','out',event)}}\"> <template is=\"if\" value=\"{{cxPropRenderHtmlInUserValue}}\"><template case=\"true\"> {{unescape(value[cxPropUserValue])}} </template><template case=\"false\"> <template is=\"if\" value=\"{{value.highlight_text}}\"><template case=\"true\"> <lyte-text lt-prop-yield=\"true\" lt-prop-value=\"{{value[cxPropUserValue]}}\"> <template is=\"registerYield\" yield-name=\"lyte-text\">{{unescape(value.highlight_text)}}</template> </lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-value=\"{{value[cxPropUserValue]}}\"></lyte-text> </template></template> </template></template> <template is=\"if\" value=\"{{value.cxMergeFieldSuffix}}\"><template case=\"true\"> {{unescape(value.cxMergeFieldSuffix)}} </template></template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxIsObject(value),'===',false),'&amp;&amp;',expHandlers(expHandlers(cxPropType,'!=',&quot;box&quot;),'||',cxPropOptSupport))}}\"><template case=\"true\"> <div class=\"cxMergeFieldPopSubHeading\"><lyte-text lt-prop-value=\"{{captialize(value)}}\"></lyte-text></div> </template></template> </template></template> </template> </div> </lyte-popover-content> </template> </lyte-beta-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropField","cxPropShow","cxPropShowDropdown","cxPropUserValue","cxPropSystemValue","cxPropDropOptions","cxPropCloseOnBodyClick","cxPropCloseOnScroll","cxPropSelected","cxPropSectionKeyName","cxPropOffset","cxPropCloseOnEscape","cxPropType","cxPropWidth","cxPropReferenceId","cxPropOptSupport","cxPropRenderHtmlInUserValue","cxPropShowWithoutHash","cxPropIsMergeFieldSort","cxPropZcqa","cxPropMaxsearch","cxPropDropdownDataZcqa","cxPropPlacement","cxPropMaxWidth","cxPropIsLyteTextEditorEnabled","cxPropWrapperClass"],
_observedAttributesType :["array","boolean","boolean","string","string","array","boolean","boolean","string","string","object","boolean","string","string","string","boolean","boolean","boolean","boolean","string","number","string","string","string","boolean","string"],

	data : function(){
		return {
			cxPropField:Lyte.attr('array',{default:[]}),
		  	cxPropShow:Lyte.attr("boolean",{default:false}),
		  	cxPropShowDropdown:Lyte.attr("boolean",{"default":false}),
		  	cxPropUserValue : Lyte.attr("string", {default : "field_label"}),//No i18n
			cxPropSystemValue : Lyte.attr("string", {default : "system_value"}),//No i18n
			cxPropDropOptions:Lyte.attr("array"),
			cxPropCloseOnBodyClick:Lyte.attr("boolean",{default:true}),
			cxPropCloseOnScroll :Lyte.attr("boolean",{default:false}),
			cxPropSelected:Lyte.attr("string"),
			cxPropSectionKeyName:Lyte.attr("string",{default:"name"}),
			cxPropOffset:Lyte.attr("object"),
			cxPropCloseOnEscape:Lyte.attr("boolean",{default:true}),
			cxPropType:Lyte.attr("string",{default:"callout"}),
			cxPropWidth:Lyte.attr("string",{default:"232px"}),
			cxPropReferenceId:Lyte.attr("string",{default:"module_ref_id"}),
			cxPropOptSupport:Lyte.attr("boolean",{default:false}),
			cxPropRenderHtmlInUserValue:Lyte.attr("boolean",{default:false}),
			cxPropShowWithoutHash:Lyte.attr("boolean",{default:false}),
			cxPropIsMergeFieldSort:Lyte.attr("boolean",{default:false}),
			cxPropZcqa : Lyte.attr("string",{default:""}),
			cxPropMaxsearch:Lyte.attr('number',{"default":10}),
			cxPropDropdownDataZcqa:Lyte.attr('string',{default:''}),
			cxPropPlacement:Lyte.attr("string",{default:"bottom"}),
			cxPropMaxWidth:Lyte.attr("string"),
			cxPropIsLyteTextEditorEnabled : Lyte.attr("boolean",{default:false}),
			cxPropWrapperClass : Lyte.attr("string",{default:""})
		}		
	},
	init:function(){
		this.handleKeyDown=this.handleKeyDown.bind(this);
		document.addEventListener('keydown', this.handleKeyDown); //eslint-disable-line @zoho/zstandard/no-body-events
		// if(this.data.cxPropType=="box"){
		// 	this.setData("cxPropCloseOnEscape",true);
		// }
		this.$node.showMergeFieldPopup=function(field,offset){
			return this.component.showMergeFieldPopup(field,offset);
		}
		this.$node.closeMergeFieldPopup=function(){
			return this.component.closeMergeFieldPopup();
		};
	},
	didConnect : function(){
		this.$node.onMergeFieldKeyDown=(event)=>{
			this.handleKeyDown(event);
		}
  	},
	didDestroy: function() {
		document.removeEventListener("keydown",this.handleKeyDown);
		this.$node.onMergeFieldOptionClick=undefined;
		Array.from($L('.cx_drop_down_field')).forEach((item) => $L(item).cruxMergeField({'destroy' : true}));
	},
	actions : {
		popoverItemClick:function(event,selected_obj){
			if(this.getMethods("onMergeFieldOptionClick")){
				this.executeMethod('onMergeFieldOptionClick',event,selected_obj)
			}
			this.setData("cxPropShow",false);
		},
		mouseEvent:function(type,event){
			if(!this.stop_event){
				if(type=='over'){
					var lastHighlightedElement=$L(".cxMergeFieldLabelActive",this.$node.querySelector('.mergeFeildPopOver').component.childComp);
					if(lastHighlightedElement[0]&&lastHighlightedElement[0].classList.contains("cxMergeFieldLabelActive") ){
						lastHighlightedElement[0].classList.remove('cxMergeFieldLabelActive');
					}
					$L(event.target).closest('.cxMergeFieldPopFieldsLabel')[0].classList.add('cxMergeFieldLabelActive')

				}else{
					$L(event.target).closest('.cxMergeFieldPopFieldsLabel')[0].classList.remove('cxMergeFieldLabelActive')
				}
			}
		}
		// Functions for event handling
	},
	methods : {
		onBeforeDropdownShow:function(event){
			// if(event.type=='keydown'){
			// 	return false;
			// }
		},
		onDropdownOpen:function(){
			var popoverComp = this.$node.querySelector('.mergeFeildPopOver').component;
			var popoverContent = $L(".cxMegeFieldPopContent",popoverComp.childComp)[0];
			popoverContent.classList.add('cxMegeFieldPopDisabled');
			$L(".cxMegeFieldPopModuleDropdown",popoverComp.childComp)[0].querySelector(".lyteDummyEventContainer").blur();
			if(this.$node._element.focus && this.$node._element.focus){
				this.$node._element.focus();
			}
			// this.$node._element ? this.$node._element.focus():"";
			let popoverDiv = $L(popoverComp.actualPopoverDiv);
			popoverDiv.addClass('cxMergeFieldModuleDropdownVisible');
		},
		onDropdownHide:function(event){
			var popoverComp = this.$node.querySelector('.mergeFeildPopOver').component;
			var popoverContent = $L(".cxMegeFieldPopContent",popoverComp.childComp)[0];
			popoverContent.classList.remove('cxMegeFieldPopDisabled');
			let popoverDiv = $L(popoverComp.actualPopoverDiv);
			popoverDiv.removeClass('cxMergeFieldModuleDropdownVisible');
			if(!event.target.classList.contains("cxMergeFieldBodyPopover") && this.$node._element.focus && this.$node._element.focus){
				this.$node._element.focus();
			}
		},
		onPopOverShow:function(element){
			//blur dropdown
			var checkDropdown=$L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp);
			if(checkDropdown[0]){
				checkDropdown[0].querySelector(".cxFakeDummyEventContainer").blur();
			}
			this.updateDataZcqa();
			this.setData("cxPropShow",true);
			if(!this.popoverOpend){
				this.setDivLabelForScroll();
			}
			if(this.getMethods("onMergeFieldShow")){
				this.executeMethod('onMergeFieldShow',element) ;
			}
		},
		onBeforePopupClose:function(){
			var lis =  $L(".cxMegeFieldPopContent",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0].querySelectorAll(".cxMergeFieldPopFieldsLabel")
			var scrollDiv=lis[0].parentNode.parentNode;
			scrollDiv.scrollTop=0
		},
		onClosePopOver:function(event,element){
			var popoverComp = this.$node.querySelector('.mergeFeildPopOver').component;
			var popoverContent = $L(".cxMegeFieldPopContent",popoverComp.childComp)[0];
			popoverContent.classList.remove('cxMegeFieldPopDisabled');
			this.setData({"cxPropSelected":"","cxPropShowDropdown":false,"cxPropField":[]})
			if(this.getMethods("onMergerFieldClose")){
				this.executeMethod('onMergerFieldClose',event,element) ;
			}
		},
		OnDropdownOptionSelected:function(event,selected){
			var _self=this
			selected=this.data.cxPropDropOptions.find(item=>item[_self.data.cxPropSystemValue]===selected)
			var field=this.data.cxPropField.filter(function(item){
				if(selected[this.data.cxPropSystemValue]==item.module[this.data.cxPropSystemValue]){
					return item;
				}
			}.bind(this))
		// cxPropSectionKeyName is only for more then two fields in one section like organization
			if(field[0].sections.length>1){
				var dummy=[];
				for(var i=0;i<field[0].sections.length;i++){
					if(this.data.cxPropIsMergeFieldSort){
						field[0].sections[i].fields=this.sortMergeField(field[0].sections[i].fields);
					}
					dummy=[...dummy,...[field[0].sections[i][this.data.cxPropSectionKeyName]],...field[0].sections[i].fields];
				}
				this.setData("field",dummy);
			}else{
				var sec_field=field[0].sections[0].fields
				if(this.data.cxPropIsMergeFieldSort){
					sec_field=this.sortMergeField(sec_field);
				}
				this.setData("field",sec_field)
			}
			var lis =  $L(".cxMegeFieldPopContent",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0].querySelectorAll(".cxMergeFieldPopFieldsLabel")
			lis[0].classList.add('cxMergeFieldLabelActive');
			var scrollDiv=lis[0].parentNode.parentNode;
			scrollDiv.scrollTop=0;
			this.updateDataZcqa();
		},
		onBeforePopOverShow:function(element){
			if(this.getMethods("onBeforeMergeFieldShow")){
				this.executeMethod('onBeforeMergeFieldShow',element) ;
			}
		}
	},
	updateDataZcqa:function(){
		var checkDropdown=$L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp);
		if(checkDropdown && checkDropdown[0]){
			this.setData("cxPropDropdownDataZcqa", checkDropdown[0].component.data.selectValue+"_"+this.getData("cxPropZcqa"));
		}
	},
	setDivLabelForScroll:function(){
		var lis =  $L(".cxMegeFieldPopContent",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0].querySelectorAll(".cxMergeFieldPopFieldsLabel");
		var lis_length=lis.length;
		for(var i=0;i<lis_length;i++){
			if(lis[i]&&lis[i].classList.contains("cxMergeFieldLabelActive") ){
				lis[i].classList.remove('cxMergeFieldLabelActive');
			}
		}
		lis[0].classList.add('cxMergeFieldLabelActive');
		var scrollDiv=lis[0].parentNode.parentNode;
		scrollDiv.scrollTop=0;
	},
	observeField:function(){
		if(this.data.cxPropField.length){
			if(this.data.cxPropShowDropdown){
				var dropdownSelectedValue=this.data.cxPropSelected;
				var field=dropdownSelectedValue&&this.data.cxPropField.filter(function(item){
						if(dropdownSelectedValue==item.module[this.data.cxPropSystemValue]){
							return item.sections[0].fields;
						}
				}.bind(this))
				var drop_sec_field=field[0].sections[0].fields;
				if(this.data.cxPropIsMergeFieldSort){
					drop_sec_field=this.sortMergeField(drop_sec_field);
				}
				this.setData("field",drop_sec_field);
			}else{
				this.setField(this.data.cxPropField);
			}
			var lyte_popover=$L(".cxMegeFieldPopContent",this.$node.querySelector('.mergeFeildPopOver').component.childComp);
			if(lyte_popover[0] && lyte_popover[0].querySelector('.cxMergeFieldPopFieldsLabel')){
				this.setDivLabelForScroll();
				this.popoverOpend=true;
			}
		}
	}.observes("cxPropField").on("init"),
	observeZcqa : function(){
		this.updateDataZcqa();
	}.observes("cxPropZcqa","cxPropShowDropdown"),//no i18n
	 setField:function(options){
		var arr=[];
		for(var i=0;i<options.length;i++){
			if(options[i][this.data.cxPropUserValue] != undefined){
				arr.push(options[i]);
			}else{
				var key = Object.keys(options[i])[0];
				arr.push(key);
				if(this.data.cxPropIsMergeFieldSort){
					options[i][key]=this.sortMergeField(options[i][key]);
				}
				for(var j =0;j<options[i][key].length;j++){
					var query=this.$node.merge_field_text_content?this.$node.merge_field_text_content.toLowerCase():"";
					var val=options[i][key][j][this.data.cxPropUserValue];
					var newText;
					if(query){
						var text_val = val.toLowerCase();
						var index = text_val.indexOf(query);
						var highlightedText = val.substring(index, index + query.length);
						newText = val.replace(highlightedText, `<span class="cxMergeFieldTextBold">${highlightedText}</span>`);
					}
					var copy=Lyte.deepCopyObject(options[i][key][j]);
					copy.highlight_text=newText;
					arr.push(copy);
				}
			}
		}
		this.$node.merge_field_text_content="";
		this.setData("field",arr);
	},
	sortMergeField:function(field_data){
		var _self=this
		var fielddata=	field_data.sort((a, b) => {
			return a[_self.data.cxPropUserValue].localeCompare(b[_self.data.cxPropUserValue]); // Sort alphabetically
		});
		return fielddata;
	},
	//util for showing merge field
	showMergeFieldPopup:function(field,offset){
		this.setData({"cxPropOffset":offset,"cxPropShow":true,"cxPropDropOptions":field.modules,
		"cxPropSelected":field.modules[0][this.data.cxPropSystemValue],"cxPropShowDropdown":true,
		"cxPropField":field.field_details
		})
        // this.setData("cxPropOffset",offset);
        // this.setData("cxPropShow",true);
        // this.setData("cxPropDropOptions",field.modules);
        // this.setData("cxPropSelected",field.modules[0][this.data.cxPropSystemValue]);
        // this.setData("cxPropShowDropdown",true);
        // this.setData("cxPropField",field.field_details);
		this.$node.querySelector(".mergeFeildPopOver").component.setData("ltPropShow",true)
    },
	closeMergeFieldPopup : function(){
		var node=this.$node.querySelector(".mergeFeildPopOver");
		if(node){
			node.component.setData("ltPropShow",false);
		}
	},
	 handleKeyDown:function(event) {
		// var _self=$L('crux-merge-field-body')[0].component
		if(!this.$node || this.$node.tagName!='CRUX-MERGE-FIELD-BODY'){
			return;
		}
		var popover=$L(".mergeFeildPopOver",this.$node);
		if(popover[0] && popover[0].component.data.ltPropShow){
			if(this.data.cxPropType!="box"){
				var dropdown_opend=$L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp)
				var dropdown = dropdown_opend[0] ? dropdown_opend[0].querySelector("lyte-dropdown") : null;
				if(dropdown && dropdown.component.data.ltPropIsOpen){
					return;
				}
			}
			var lis =  $L(".cxMegeFieldPopContent",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0].querySelectorAll(".cxMergeFieldPopFieldsLabel")
			var scrollDiv=lis[0].parentNode.parentNode;
			var currentIndex = Array.from(lis).findIndex(li => li.classList.contains('cxMergeFieldLabelActive'));
			if (event.key === 'ArrowDown') {
				event.preventDefault(); // Prevents scrolling
				
				var nextIndex = (currentIndex + 1) 
				if(nextIndex==0){
					scrollDiv.scrollTop=0
					// nextIndex=0
				}
				if(lis.length-1<nextIndex){
					return
				}
				if(nextIndex !=0 && lis[nextIndex]){
					this.stop_event=true
				setTimeout(() => {
					this.stop_event=false
				}, 10);
					this.scrollIntoView(lis[nextIndex],'down',scrollDiv,nextIndex);
					// scrollDiv.scrollTop =scrollDiv.scrollTop+ lis[nextIndex].clientHeight-0.5
				}
				lis[currentIndex]?lis[currentIndex].classList.remove('cxMergeFieldLabelActive'):""
				lis[nextIndex].classList.add('cxMergeFieldLabelActive');
			} else if (event.key === 'ArrowUp') {
				event.preventDefault(); // Prevents scrolling
	
				var prevIndex = (currentIndex - 1 ) ;
				if(prevIndex==-1){
					return;
					
				}
				 if(prevIndex==-2){
					prevIndex=0;
					scrollDiv.scrollTop=0;
				}
				if( lis[prevIndex]){
					this.stop_event=true
					setTimeout(() => {
						this.stop_event=false
					}, 10);
					this.scrollIntoView(lis[prevIndex],'up',scrollDiv,prevIndex);
					// scrollDiv.scrollTop = scrollDiv.scrollTop -lis[prevIndex].clientHeight+0.5
				}
				lis[currentIndex]?lis[currentIndex].classList.remove('cxMergeFieldLabelActive'):"";
				lis[prevIndex]?lis[prevIndex].classList.add('cxMergeFieldLabelActive'):""
			}
			if(event.keyCode==13){
				if(!lis[currentIndex]){
					return; //eslint-disable-line no-useless-return
				}else{
					event.preventDefault();
					lis[currentIndex].click();
				}
			}
			
		}
	},
	scrollIntoView:function(element, move,scrollDiv,index){
		if (!this.isInView(element,scrollDiv)) {
			this.moveIntoView(element,scrollDiv,move,index);
		}
	},
	moveIntoView: function (element,scrollDiv,move,index) {
		var body = scrollDiv,
			containerScrollTop = body.scrollTop,
			elementTop = element.offsetTop;
		if(move==='up' && this.data.cxPropType!=='box' && $L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0]){
			containerScrollTop-=5;
			elementTop-=44
		}
		if (elementTop <= containerScrollTop) {
			this.moveDown(element,scrollDiv,index);
		}
		else {
			this.moveUp(element,scrollDiv);
		}
	},
	moveDown: function (element,scrollDiv,index) {
		var body = scrollDiv
		if(this.data.cxPropType==='box' || !$L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0] ){
			body.scrollTop = this.isFirstItem( element ) ? 0 : element.offsetTop;
			if(index===0){
				body.scrollTop=0;
			}
		}else{
			body.scrollTop = this.isFirstItem( element ) ? 0 : element.offsetTop-50;
		}
	},
	isFirstItem: function( node ) {
		var _parent = node.parentElement;
		return _parent && _parent.firstElementChild === node;
	},
	moveUp: function (element,scrollDiv) {
		var body = scrollDiv
		if(this.data.cxPropType==='box' || !$L(".cxMegeFieldPopModuleDropdown",this.$node.querySelector('.mergeFeildPopOver').component.childComp)[0]){
			body.scrollTop = element.offsetTop + element.offsetHeight - body.offsetHeight-10
		}else{
			body.scrollTop = element.offsetTop-13  - body.offsetHeight
		}
	},
	isInView: function (element,scrollDiv) {
		var body =scrollDiv,
			containerScrollTop = body.scrollTop,
			containerHeight = body.offsetHeight,
			elementTop = element.offsetTop,
			elementHeight = element.offsetHeight;
			if(this.data.cxPropType=='box'){
				return elementTop >= containerScrollTop && elementTop + elementHeight <= containerScrollTop + containerHeight;
			}else{
				return elementTop-44 >= containerScrollTop-5 && elementTop-7 <= containerScrollTop + containerHeight;
			}
	}
	
});
 Lyte.Component.registerHelper("cxIsObject",function(val) { //NO I18N
    if(typeof val == 'object'){
    	return true;
    }else{
		return false;
	}
});
 

