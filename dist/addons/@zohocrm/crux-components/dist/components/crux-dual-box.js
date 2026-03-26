/**
 * @component crux-dual-box
 * @author Mahalakshmi
 * @version 1.0.0
 * @summary This Component written on top of lyte-dual-listbox
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-dual-box", {
_template:"<template tag-name=\"crux-dual-box\"> <lyte-dual-listbox lt-prop-left-data=\"{{cxPropLeftData}}\" lt-prop-show-toolbar=\"{{cxPropShowToolbar}}\" lt-prop-right-data=\"{{rightData}}\" lt-prop-short-cut=\"{{cxPropShortcut}}\" lt-prop-sortable=\"{{cxPropSortable}}\" lt-prop-search-scope=\"{{cxPropSearchScope}}\" lt-prop-no-result-message=\"{{cxPropNoResultMessage}}\" lt-prop-ignore-sorting=\"cxPinnedCol\" lt-prop-mandate-key=\"{{cxPropMandatory}}\" lt-prop-allow-mandate-sortable=\"true\" lt-prop-has-pin-option=\"{{cxPropHasPinOption}}\" lt-prop-pinned-data=\"{{pinned_fields}}\" lt-prop-show-search=\"{{cxPropShowSearch}}\" lt-prop-minimum-required-count=\"{{cxPropMinimumRequiredCount}}\" on-drop=\"{{method('onDrop')}}\" on-before-drop=\"{{method('onBeforeDrop')}}\" on-move-right=\"{{method('onMoveRight')}}\" on-move-left=\"{{method('onMoveLeft')}}\" on-before-left=\"{{method('onBeforeLeft')}}\" on-before-right=\"{{method('onBeforeRight')}}\" use-self=\"true\"> <div class=\"lyteLBLeftWidgets\"> <template is=\"registerYield\" yield-name=\"leftWidget\"> <div class=\"cxDualBoxContent\"> <span class=\"cxDualBoxLabel\" data-zcqa=\"{{if(leftWidgetValue[cxPropDataZcqaLabel],leftWidgetValue[cxPropDataZcqaLabel],concat('leftvalue_',leftWidgetValue.id))}}\"> {{leftWidgetValue[cxPropDisplayLabel]}} <template is=\"if\" value=\"{{leftWidgetValue[cxPropMandatory]}}\"><template case=\"true\"> <span class=\"cxDualBoxMandatorySign\">*</span> </template></template> </span> </div> </template> <template is=\"registerYield\" yield-name=\"rightWidget\"> <div class=\"cxDualBoxContent\" onmouseover=\"{{action('mouseEnterAction',rightWidgetValue,this)}}\"> <span class=\"cxDualBoxDragIcon\"></span> <span class=\"cxDualBoxLabel\" data-zcqa=\"{{if(rightWidgetValue[cxPropDataZcqaLabel],rightWidgetValue[cxPropDataZcqaLabel],concat('rightvalue_',rightWidgetValue.id))}}\"> {{rightWidgetValue[cxPropDisplayLabel]}} <template is=\"if\" value=\"{{rightWidgetValue[cxPropMandatory]}}\"><template case=\"true\"> <span class=\"cxDualBoxMandatorySign\">*</span> </template></template> </span> <template is=\"if\" value=\"{{cxPropPinUnpinOption}}\"><template case=\"true\"> <span id=\"cxPinUnpinIcon\" class=\"{{if(rightWidgetValue._pin,'cxColPinActiveIcon','cxColPinIcon')}}\" data-zcqa=\"{{if(rightWidgetValue[cxPropDataZcqaLabel],concat('pin_unbin_',rightWidgetValue[cxPropDataZcqaLabel]),concat('pin_unbin_',rightWidgetValue.id))}}\" onclick=\"{{action('doPinOrUnpin',rightWidgetValue,this)}}\"></span> </template></template> </div> </template> </div> </lyte-dual-listbox> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},{"type":"registerYield","position":[1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropLeftData","cxPropRightData","rightData","cxPropDisplayLabel","cxPropDataZcqaLabel","cxPropSortable","cxPropShortcut","cxPropShowToolbar","cxPropMaxSelectedCount","cxPropDoubleClick","cxPropSearchScope","cxPropShowSearch","cxPropNoResultMessage","cxPropPinFieldLimitMessage","cxPropUniqueNameSelector","cxPropMandatory","cxPropMinimumRequiredCount","cxPropOneMandatory","cxPropPinUnpinOption","cxPropPinFieldLimit","pinned_fields","pinnedFieldCount","cxPropHasPinOption"],
_observedAttributesType :["array","array","array","string","string","boolean","boolean","boolean","number","boolean","string","boolean","string","string","string","string","number","boolean","boolean","number","array","number","boolean"],

	data : function(){
		return {
			/**
			 * This property used for display left side fields
			 * @componentProperty { array } cxPropLeftData
			 */
			cxPropLeftData : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * This property used for display right side fields
			 * @componentProperty { array } cxPropRightData
			 */
			cxPropRightData : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * This property used for display right side fields
			 * @componentProperty { array } cxPropRightData
			 */
			rightData : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * The value given in this will be considered as display value key, from the field object
			 * @componentProperty { string } cxPropDisplayLabel
			 */
			cxPropDisplayLabel :  Lyte.attr("string", {default : "field_label"}),//No I18n
			/**
			 * Data zcqa attribute name
			 * @componentProperty { string } cxPropDataZcqaLabel
			 */
			cxPropDataZcqaLabel :  Lyte.attr("string"),//No I18n
			/**
			 * Field sorting will be allowed based on this property, by default it will be true
			 * @componentProperty { boolean } cxPropSortable=false
			 */
			cxPropSortable : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * The "cx-prop-shortcut" is a boolean attribute used to either enable or disable the shortcut using keyboard functionality.
			 * @componentProperty { boolean } cxPropShortcut=false
			 */
			cxPropShortcut : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * The "cx-prop-show-toolbar" is a boolean attribute used to either enable or disable the toolbar.
			 * @componentProperty { boolean } cxPropShowToolbar=false
			 */
			cxPropShowToolbar : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This is used for fixing the maximum number of fields to be allowed in right panel of the dual listbox.
			 * @componentProperty { number } cxPropMaxSelectedCount
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMaxSelectedCount : Lyte.attr("number"),//No I18n
			/**
			 * The "cx-prop-double-click" is a boolean attribute that when set false the add or remove operation on double clicking on the field will be stopped.
			 * @componentProperty { boolean } cxPropDoubleClick=false
			 */
			cxPropDoubleClick : Lyte.attr("boolean", {default : false}),//No I18n
			/**
			 * This will be the search scope
			 * @componentProperty { string } cxPropSearchScope
			 */
			cxPropSearchScope: Lyte.attr('string', { default: 'lyteListboxLeftPanel'}),
				/**
			 * The "cxPropShowSearch" is a boolean attribute that when set false to remove search option from left box. By default the search option will be visible.
			 * @componentProperty { boolean } cxPropShowSearch=true
			 */
			cxPropShowSearch :  Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * The "cx-prop-no-result-message" is a property which takes a string value that will show the message to be displayed when no items is present during search.
			 * @componentProperty { string } cxPropNoResultMessage
			 */
			cxPropNoResultMessage : Lyte.attr("string", {default : "No Results Found"}), //No I18n
			/**
			 * @componentProperty { string } cxPropPinFieldLimitMessage
			 */
			cxPropPinFieldLimitMessage : Lyte.attr("string", {default : "Allowed columns are pinned"}), //No I18n
			/**
			 * @componentProperty { string } cxPropUniqueNameSelector
			 */
			cxPropUniqueNameSelector : Lyte.attr("string", {default : "api_name"}),//No I18n
			/**
			 * @componentProperty { string } cxPropMandatory
			  */
			cxPropMandatory : Lyte.attr("string", {default : "mandatory"}),//No I18n
			/**
			 * The "cx-prop-minimum-required-count" takes a number input and restricts the given number of required elements from moving from right to left if the number of required elements is more than the given count then the required elements will be treated as a normal element that can be moved to left from right.
			 * @componentProperty { number } cxPropMinimumRequiredCount
			 * @minValue 1
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropMinimumRequiredCount :  Lyte.attr("number", {default : 1}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropOneMandatory=false
			 */
			cxPropOneMandatory : Lyte.attr("boolean", {default : true}),//no i18n
			/**
			 * @componentProperty { boolean } cxPropPinUnpinOption=false
			 */
			cxPropPinUnpinOption : Lyte.attr("boolean", {default : true}),//No I18n
			/**
			 * @componentProperty { number } cxPropPinFieldLimit
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			cxPropPinFieldLimit : Lyte.attr("number", {default : 3}),//No I18n
			/**
			 * @componentProperty { array } pinned_fields
			 */
			pinned_fields : Lyte.attr("array", {default : []}),//No I18n
			/**
			 * @componentProperty { number } pinnedFieldCount
			 * @minValue minimum
			 * @maxValue maximum
			 * @step 1
			 * @suffix 'comma seprated allowed suffix values for the property'
			 */
			pinnedFieldCount : Lyte.attr("number", {default : 0}),//No I18n
			/**
			 * This used for pin support in right element. By default it will be true
			 * @componentProperty { boolean } cxPropHasPinOption=false
			 */
			cxPropHasPinOption : Lyte.attr("boolean", {default : true})//No I18n
		}		
	},
	selectedCount : function( key ){
		var items = this.getData("cxPropRightData");//No I18n
		var selected = 0;
		for(var i=0; i<items.length; i++){
			if(items[i] && items[i][key]){
				selected++;
			}
		}
		return selected
	},
	init : function(){
		var cxPropRightData = this.getData("cxPropRightData"),
		rightLen = cxPropRightData.length,
		pinned_fields = this.getData("pinned_fields"),
		rightData = this.getData("rightData");
		for (var i=0; i < rightLen;  i++){
			if(cxPropRightData[i]._pin_order){
				pinned_fields.push(cxPropRightData[i])
				pinned_fields.sort((a, b) => {
					if (a._pin_order < b._pin_order) return -1;
					if (a._pin_order > b._pin_order) return 1;
					return 0;
				  });
				// cxPropRightData.splice(i,1)
				// rightLen--;
				// i--;
			}else{
				rightData.push(cxPropRightData[i]);
			}
		}
		this.setData({"rightData" : rightData, "cxPropRightData" : cxPropRightData, "pinned_fields" : pinned_fields, "pinnedFieldCount" : pinned_fields.length});
	},
	actions : {
		mouseEnterAction : function(item,element){
			var pinIcon = element.querySelector("#cxPinUnpinIcon");//No I18n
			if( item._pin ){
				pinIcon.setAttribute('lt-prop-title', _cruxUtils.getI18n("crm.customview.unpin.column"))//No I18n
				return
			}
			var pinnedFieldCnt = this.getData("pinnedFieldCount");//No I18n
			if(pinnedFieldCnt >= this.data.cxPropPinFieldLimit ){
				pinIcon.classList.add("cxColPinDisabled")//No I18n
				pinIcon.setAttribute('lt-prop-title', this.data.cxPropPinFieldLimitMessage)
			}else{
				pinIcon.classList.remove("cxColPinDisabled")//No I18n
				pinIcon.setAttribute('lt-prop-title', _cruxUtils.getI18n("crm.customview.pin.column"))
			}

		},
		doPinOrUnpin : function(field , ele){
			var pinned = field._pin ? false : true;
			var pinned_fields = this.getData("pinned_fields") //No I18n
			var pinnedFieldCnt = pinned_fields.length; //No I18n
			if(pinned){
				if(  this.data.cxPropPinFieldLimit >  pinnedFieldCnt){
					this.checkUncheck("check",field , ele , "pinned");
					this.setData("pinnedFieldCount", pinnedFieldCnt + 1);	//NO I18N
					//pinned_fields.push(field)
				}
				if( pinnedFieldCnt+1  == this.data.cxPropPinFieldLimit){
					this.setData("disablePinOption",true);//no i18n
				}
			}else{
				this.checkUncheck("uncheck",field , ele , "pinned");
				this.setData("pinnedFieldCount", pinnedFieldCnt - 1);	//NO I18N
				// for(var i=0; i<pinnedFieldCnt; i++){
				// 	if(pinned_fields[i].api_name == field.api_name){
				// 		pinned_fields.splice(i,1)
				// 		break;
				// 	}
				// }
				// var parentElement = $L("#lyte_listbox_right_panel")[0];
				// parentElement.addToSortable(ele.closest(".cxPinnedCol"));
				//this.unPinnedAction( field , ele , "pinned");
				this.setData("disablePinOption",false);//no i18n
				
			}
			//  this.setData("pinned_fields", pinned_fields)
			
		}
	},

	methods : {
		onBeforeDrop : function(source , destination, index, elements){
			if(source === destination){
				// var rightData = this.getData("cxPropRightData");
				//var pinnedElem = this.getData("pinned_fields");
				var selectedRightData = this.getData("cxPropRightData");
				var elemLen = elements.length;
				// var pinnedElementsLen = pinnedElem.length;
				// var from_num;
				// if(elements[0]._pin){
				// 	Lyte.arrayUtils( pinnedElem , 'insertAt' , index , elements);
				// }else{
				// 	Lyte.arrayUtils( this.getData("rightData") , 'insertAt' , index , elements);
				// }
				for (var e=0; e<elemLen; e++){
					var elem = elements[e];
					var currentPosition = selectedRightData.indexOf(elem);
					if(!elem._pin){
						Lyte.arrayUtils( selectedRightData , 'removeAt' , currentPosition , 1 );
						Lyte.arrayUtils( selectedRightData , 'insertAt' , index , elem);
					}
					index++;
				}
				
				
				
			}
		},
		onDrop : function(source , destination,index){	
			if(this.getMethods("onDataDrop")){
				 
				/**
				 * @method onDataDrop
				 * The "on-data-drop" is the callback function provided by the component to the user. Using this callback function the user can make changes on the selected datas after dropping it to the other side.
				 * @param { * } source
				 * @param { * } destination
				 */
				return this.executeMethod("onDataDrop", source , destination);
			}
		},
		onMoveRight : function(leftData , rightData , selectedDatas, ondrop, index){
			var insertData = true;
			if(this.getMethods("onDataMoveRight")){
				/**
				 * @method onMoveRight
				 * The "on-move-right" is the callback function provided by the component to the user. Using this callback function the user can make changes on the selected datas after moving it to the right side using the toolbar buttons.
				 * @param { * } leftData
				 * @param { * } selectedDatas
				 */
				insertData =  this.executeMethod("onDataMoveRight", leftData , this.getData("cxPropRightData") , selectedDatas);
			}
			if(insertData){
				if(ondrop){
					var selLen = selectedDatas.length;
					for (var l = 0; l < selLen; l++) {
						Lyte.arrayUtils(this.getData('cxPropRightData'), 'insertAt', index+l, selectedDatas[l]);
					}	
				} else {
					Lyte.arrayUtils(this.getData('cxPropRightData'), 'push', selectedDatas);
				}
			}	
			return insertData;
		},
 		onBeforeRight  : function(leftData , rightData , selectedDatas, ondrop, index){
			if(this.data.cxPropMaxSelectedCount>0 && rightData.length + selectedDatas.length > this.data.cxPropMaxSelectedCount){
 				return false
 			}
			var insertData = true
			if(this.getMethods("onDataBeforeRight")){
				/**
				 * @method onBeforeRight
				 * The "on-before-right" is the callback function provided by the component to the user. Using this callback function the user can make changes on the selected datas before moving it to the right side using the toolbar buttons.
				 * @param { * } leftData
				 * @param { * } rightData
				 * @param { * } selectedDatas
				 */
				insertData =  this.executeMethod("onDataBeforeRight", leftData , this.getData("cxPropRightData") , selectedDatas);
			}
			// if(insertData){
			// 	if(ondrop){
			// 		for (var l = 0; l < selectedDatas.length; l++) {
			// 			Lyte.arrayUtils(this.getData('cxPropRightData'), 'insertAt', index+l, selectedDatas[l]);
			// 		}	
			// 	} else {
			// 		Lyte.arrayUtils(this.getData('cxPropRightData'), 'push', selectedDatas);
			// 	}
			// }	
			return insertData;
		},
 		onBeforeLeft : function(leftData , rightData , selectedDatas){
			var insertData = true;
			if(this.getMethods("onDataBeforeLeft")){
				 
				/**
				 * @method onDataBeforeLeft
				 * The "on-data-before-left" is the callback function provided by the component to the user. Using this callback function the user can make changes on the selected datas before moving it to the left side using the toolbar buttons.
				 * @param { * } leftData
				 * @param { * } rightData
				 * @param { * } selectedDatas
				 */
				insertData =  this.executeMethod("onDataBeforeLeft", leftData , rightData , selectedDatas);
				
			}
			// if(insertData){
			// 	// var posLen = positionArray.length;
			// 	Lyte.arrayUtils( this.getData('cxPropRightData') , 'removeObjects' , selectedDatas );
			// }
			return insertData;
    	},
 		onMoveLeft : function(leftData , rightData , selectedDatas){
			var insertData = true;
    		if(this.getMethods("onDataMoveLeft")){
				/**
				 * @method onMoveLeft
				 * The "on-move-left" is the callback function provided by the component to the user. Using this callback function the user can make changes on the selected datas after moving it to the left side using the toolbar buttons.
				 * @param { * } leftData
				 * @param { * } RightData
				 * @param { * } selectedDatas
				 */
    			insertData = this.executeMethod("onDataMoveLeft", leftData , this.getData("cxPropRightData") , selectedDatas);
    		}
			if(insertData){
				// var posLen = positionArray.length;
				Lyte.arrayUtils( this.getData('cxPropRightData') , 'removeObjects' , selectedDatas );
			}
			return insertData;
    	}
	},
	getSelectedDatas : function(){
		/**
    	 * @utility getSelectedDatas
		 * This util is used for get the all right Data
    	 * @version 1.0.2
        */ 
		// var rightData = this.getData("rightData")
		var pinnedFields = this.getData("pinned_fields");
		var pinnedLen = pinnedFields.length;
		// var ind
		for(var i=0; i< pinnedLen; i++){
			pinnedFields[i]._pin_order = i + 1;
		}
		return this.getData("cxPropRightData");
	},
    getHiddenCount : function(menuItem,start,end){
		var startIndex = Math.min( start, end ),
		endIndex = Math.max( start, end ),
		count=0;
		for( var i = startIndex; i < endIndex; ++i ){
			if( menuItem[ i ].classList.contains( 'lyteSearchHidden' ) ){
				count++;
			}
		}
		return count;
	},
    checkUncheck : function(checkUncheck, item, chkBox , key){
	    	var liItem = chkBox.closest(".lyteListBoxRightWrap");//No I18n
			var events = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend", "animationend"];//No I18n
			var items = this.getData("pinned_fields");
			events.forEach(function(eve){
				liItem.addEventListener(eve, function uncheckListener(e){
					if(e.currentTarget.dataset.triggered) {return};
					e.currentTarget.dataset.triggered = true;
					var index = (checkUncheck == "check" ) ? self.data.pinnedFieldCount : self.itemInd;
					$L("lyte-dual-listbox")[0].pinElement(liItem, index, checkUncheck == "check" ? true : false)
					Lyte.objectUtils( item , "add" , "_pin" , checkUncheck == "check" ? true : false )
					Lyte.objectUtils( item , "add" , "_pin_order" , index );
					if(checkUncheck == "uncheck"){
						Lyte.objectUtils( item , "delete" , "_pin_order")
					}
					events.forEach(function(eve1){
						liItem.removeEventListener(eve1, uncheckListener);
					});
					if(key == "pinned" && self.getMethods("onPinOptionChanged")){
    					self.executeMethod("onPinOptionChanged",self.getData("cxPropRightData"), self.$node.querySelector("#"+element.id).parentElement, self.data.cxPropRightData , selected , checkUncheck == "check" ? "PinAction" : "unPinAction");//No I18n
					}
				});
			});

			var menuItem = this.$node.querySelectorAll(".lyteListBoxRightWrap:not(#dummy):not(.cxNotSortable)");//No I18n
			var curPos = Array.prototype.slice.call(menuItem).indexOf(liItem);//No I18n
			
			if(checkUncheck == "check"){
				var index=this.data.pinnedFieldCount;//No I18n
				var selected = curPos<index?curPos:index;//No I18n				
				var c=this.getHiddenCount(menuItem,curPos,selected);
				var diffLen = (curPos - selected - c)*liItem.getBoundingClientRect().height;
				liItem.style.transition = "0.3s all ease";//No I18n
				liItem.style.transform = "translateY(-"+diffLen+"px)";//No I18n
				liItem.style.background = "#ebebeb";//No I18n
				liItem.style.zIndex="1";//No I18n
			}
			else{
				var index = this.data.pinnedFieldCount-1;//No I18n
				if(key == "pinned"){
					var ind;
					var itemInd = this.getData("cxPropRightData").indexOf(item);
					ind = itemInd;
					//delete item._pin_order;
					var pinlessCount = 0, pinaddCount = 0;
					for(var k = 0 ; k < items.length ; k++){
						let it = items[k];
						// if( !it.pinned ){
						// 	break;
						// }
						if( it.id != item.id){
							if(ind > this.getData("cxPropRightData").indexOf(it)){
								itemInd = itemInd-1;
								//pinaddCount++;	
							}
						}
					}
					// itemInd = itemInd - index;
					// if(item.cxFrom > this.getData("cxPropRightData").length){
					// 	this.itemInd = index = this.getData("cxPropRightData").length;
					// }else{
					// 	this.itemInd = index =  itemInd;
					// }
					this.itemInd = index = itemInd;
				}
				var selected=((index+this.data.pinnedFieldCount) <curPos?curPos:(index+this.data.pinnedFieldCount))		
				var c=this.getHiddenCount(menuItem,curPos,selected);	
				var diffLen = (selected-curPos-c)*liItem.getBoundingClientRect().height;
				liItem.style.transition = "0.3s all ease";//No I18n
				liItem.style.transform = "translateY(+"+diffLen+"px)";//No I18n
				liItem.style.background = "#ebebeb";//No I18n
				liItem.style.zIndex="1";//No I18n
			}
			var self = this;
	    }

});
