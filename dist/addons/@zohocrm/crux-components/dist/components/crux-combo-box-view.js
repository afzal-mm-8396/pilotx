/**
 * @component crux-combo-box-view
 * @author silambarasan.rt
 * @summary summary about the component if any
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-combo-box-view", {
_template:"<template tag-name=\"crux-combo-box-view\"> <div class=\"cxDIB {{cxPropClass}}\"> <ul id=\"usersList\" class=\"cxComboxViewBtnListCont\"> <template is=\"for\" items=\"{{localOptionModels}}\" item=\"model\" index=\"ind\"> <template is=\"if\" value=\"{{model.selectedItems.length}}\"><template case=\"true\"><li id=\"{{cxPropClass}}_{{model.prefix}}\" class=\"cxComboBoxViewButtonList\" data-zcqa=\"customview-usersCount\" onmouseover=\"{{action(&quot;showContent&quot;,event,model)}}\" onmouseout=\"{{action(&quot;hideContent&quot;)}}\" onclick=\"{{action(&quot;stopParentAction&quot;,event)}}\"> <span>{{if(expHandlers(model.selectedItems.length,'&gt;',1),model.display_plural_label,model.display_singular_label)}}</span> <span id=\"{{cxPropClass}}_{{model.prefix}}_cnt\" class=\"cxComboBoxViewButtonUserCount\">{{model.selectedItems.length}}</span> </li></template></template> </template> <template is=\"if\" value=\"{{cxPropRecipient.tags.length}}\"><template case=\"true\"><li id=\"recipients\" class=\"cxComboBoxViewButtonList\" data-zcqa=\"customview-usersCount\" onmouseover=\"{{action(&quot;showContent&quot;,event,cxPropRecipient)}}\" onmouseout=\"{{action(&quot;hideContent&quot;)}}\" onclick=\"{{action(&quot;stopParentAction&quot;,event)}}\"> <span>{{if(expHandlers(cxPropRecipient.tags.length,'&gt;',1),cxPropRecipient.display_plural_label,cxPropRecipient.display_singular_label)}}</span> <span id=\"recipients_cnt\" class=\"cxComboBoxViewButtonUserCount\">{{cxPropRecipient.tags.length}}</span> </li></template></template> </ul> </div> <lyte-hovercard lt-prop-auto-show=\"false\" id=\"cx_error_hovercard\" lt-prop-popover-wrapper-class=\"cxComboBoxViewPopover {{cxPropWrapperClass}}\" lt-prop-origin-elem=\"{{originElem}}\" lt-prop-max-width=\"550px\" class=\"cxErrorHoverCardEle\" lt-prop-hide-on-click=\"{{cxPropHideOnClick}}\" lt-prop-popover=\"{{popoverProps}}\" lt-prop-show=\"{{lbind(showPopover)}}\" lt-prop-close-on-scroll=\"false\" lt-prop-use-beta-popover=\"true\" lt-prop-placement=\"bottom top\" on-hovercard-before-hide=\"{{method('beforeHide')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"cxComboBoxViewContent\"> <ul> <template is=\"for\" items=\"{{displayData}}\" item=\"value\" index=\"position\"> <template is=\"if\" value=\"{{expHandlers(value.users,'&amp;&amp;',value.users.length)}}\"><template case=\"true\"> <li class=\"cxComboBoxViewHeader\"> <lyte-text class=\"cxComboBoxViewHeaderText\" lt-prop-value=\"{{value[displayLabel]}}\"></lyte-text> </li> <li class=\"cxComboBoxViewUsersUlWrapLi\"> <ul> <template is=\"for\" items=\"{{value.users}}\" item=\"user\" index=\"index\"> <li class=\"cxComboBoxViewUserLi\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(user[userModelsOption.imageSelector],'==',undefined),'||',expHandlers(user[userModelsOption.imageSelector],'==',null)),'||',expHandlers(user[userModelsOption.imageSelector].length,'==',0))}}\"><template case=\"true\"> <span class=\"cxComboBoxViewUserImage cxComboBoxViewNoPhoto\"></span> </template><template case=\"false\"> <img alt=\"userImg\" class=\"cxComboBoxViewUserImage cxComboBoxViewUserPhoto\" src=\"{{user[userModelsOption.imageSelector]}}\"> </template></template> <span class=\"cxComboBoxViewUserNameLabel\">{{user[displayLabel]}}</span> </li> </template> </ul> </li> </template><template case=\"false\"> <li class=\"cxComboBoxViewUserLi\"> <template is=\"if\" value=\"{{value[userModelsOption.imageSelector]}}\"><template case=\"true\"><img alt=\"userImg\" class=\"cxComboBoxViewUserImage cxComboBoxViewUserPhoto\" src=\"{{value[userModelsOption.imageSelector]}}\"></template><template case=\"false\"><template is=\"if\" value=\"{{displayModel.imageSelector}}\"><template case=\"true\"><span class=\"cxComboBoxViewUserImage cxComboBoxViewNoPhoto\"></span></template></template></template></template> <span class=\"cxComboBoxViewUserNameLabel\">{{value[displayLabel]}}</span> </li> </template></template> </template> </ul> </lyte-hovercard-content> </template> </lyte-hovercard> <lyte-popover lt-prop-wrapper-class=\"cxComboBoxViewPopover\" lt-prop-type=\"callout\" lt-prop-origin-elem=\"{{originElem}}\" lt-prop-show-close-button=\"false\" lt-prop-freeze=\"false\" lt-prop-placement=\"right left\" on-before-close=\"{{method(&quot;beforeClose&quot;)}}\" lt-prop-scrollable=\"true\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"cxComboBoxViewContent\"> <ul> <template is=\"for\" items=\"{{displayData}}\" item=\"value\" index=\"position\"> <template is=\"if\" value=\"{{expHandlers(value.users,'&amp;&amp;',value.users.length)}}\"><template case=\"true\"> <li class=\"cxComboBoxViewHeader\"> <lyte-text class=\"cxComboBoxViewHeaderText\" lt-prop-value=\"{{value[displayLabel]}}\"></lyte-text> </li> <li class=\"cxComboBoxViewUsersUlWrapLi\"> <ul> <template is=\"for\" items=\"{{value.users}}\" item=\"user\" index=\"index\"> <li class=\"cxComboBoxViewUserLi\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(user[userModelsOption.imageSelector],'==',undefined),'||',expHandlers(user[userModelsOption.imageSelector],'==',null)),'||',expHandlers(user[userModelsOption.imageSelector].length,'==',0))}}\"><template case=\"true\"> <span class=\"cxComboBoxViewUserImage cxComboBoxViewNoPhoto\"></span> </template><template case=\"false\"> <img class=\"cxComboBoxViewUserImage cxComboBoxViewUserPhoto\" src=\"{{user[userModelsOption.imageSelector]}}\"> </template></template> <span class=\"cxComboBoxViewUserNameLabel\">{{user[displayLabel]}}</span> </li> </template> </ul> </li> </template><template case=\"false\"> <li class=\"cxComboBoxViewUserLi\"> <template is=\"if\" value=\"{{value[userModelsOption.imageSelector]}}\"><template case=\"true\"><img class=\"cxComboBoxViewUserImage cxComboBoxViewUserPhoto\" src=\"{{value[userModelsOption.imageSelector]}}\"></template><template case=\"false\"><template is=\"if\" value=\"{{displayModel.imageSelector}}\"><template case=\"true\"><span class=\"cxComboBoxViewUserImage cxComboBoxViewNoPhoto\"></span></template></template></template></template> <span class=\"cxComboBoxViewUserNameLabel\">{{value[displayLabel]}}</span> </li> </template></template> </template> </ul> </lyte-popover-content> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]},{"type":"attr","position":[0,3]},{"type":"text","position":[0,3,0]}]}},"default":{}}]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[1,3,0]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,3,0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"text","position":[1,3,0]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,3,0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropWrapperClass","cxPropHideOnClick","popoverProps","originElem","cxPropSelected","showPopover","cxPropOptionModels","localOptionModels","userModelsOption","currentModelsOption","cxPropRecipient","displayData","displayLabel","cxPropClass","displayModel","typeMapping","displayData"],
_observedAttributesType :["string","boolean","object","string","array","boolean","array","array","object","object","object","array","string","string","object","object","array"],
//No I18n
	data : function(){
		return {
			cxPropWrapperClass	:  Lyte.attr("string" , {default : ""}),//no i18n
			cxPropHideOnClick : Lyte.attr('boolean' , {default : true}),
			popoverProps : Lyte.attr('object' , {default : {scrollable : true}}),
			originElem : Lyte.attr("string",{ default : "" }),//No I18n
			/**
			 * This property holds the records of the items selected by the user. If there are any pre-selected users, their IDs should also be included. Each data entry must contain the following keys: type: The name of the model, prefix: The prefix associated with that model.
			 * @componentProperty { array } cxPropSelected
			 */
			cxPropSelected : Lyte.attr('array',{default : []}), //No I18n
			showPopover : Lyte.attr("boolean" , { default : false }),//No I18n
			/**
			 * This property is an array where each item defines the functionality of the component. Each item in the array should be an object that includes the necessary key-value pairs. Some keys are mandatory, while others are optional.
			 * @componentProperty { array } cxPropOptionModels
			 * @author authorName
			 * @version 1.0.0
			 */
			cxPropOptionModels : Lyte.attr('array',{default : []}), //no i18n
			localOptionModels : Lyte.attr('array',{default : []}), //no i18n
			userModelsOption : Lyte.attr("object",{default : {}}),//no i18n 
			currentModelsOption : Lyte.attr("object",{default : {}}),//no i18n 
			/**
			 * This property should contain information about tags.
			 * @componentProperty { object } cxPropRecipient
			 * @default { display_singular_label : "",display_plural_label : "", singular_name : "",plural_name : "",tags : [],tag_selector : "email_id"}
			 */
			cxPropRecipient : Lyte.attr("object",{default : { display_singular_label : "",display_plural_label : "", singular_name : "",plural_name : "",tags : [],tag_selector : "email_id"}}),//no i18n
			displayData : Lyte.attr("array",{ default : [] }),//No I18n
			displayLabel : Lyte.attr("string",{ default : "name" }),//No I18n
			/**
			 * This property should be unique and is used to set the class for the parent element of the component.
			 * @componentProperty { string } cxPropClass
			 * @author authorName
			 * @version 1.0.0
			 * @default cxComboBoxView
			 */
			cxPropClass :  Lyte.attr("string",{ default : "cxComboBoxView" }),//No I18n
			displayModel : Lyte.attr("object",{default : {}}),//no i18n 
			typeMapping : Lyte.attr("object",{default : {}}),//no i18n 
			displayData : Lyte.attr("array",{default : []})//no i18n
		}		
	},
	observeOptionModels : function(){
		// var t = "[{\"name\":\"Groups\",\"model_name\":\"user_group\",\"idSelector\":\"id\",\"prefix\":\"G\",\"nameSelector\":\"name\",\"pagination\":false,\"cxPropEmptyDataMsg\":\"No groups available\"},{\"name\":\"Users\",\"model_name\":\"user\",\"idSelector\":\"id\",\"nameSelector\":\"full_name\",\"prefix\":\"U\",\"imageSelector\":\"image_link\",\"descriptionSelector\":\"email\",\"pagination\":true,\"setSearchCriteria\":\"\",\"cxPropQueryParams\":{\"type\":\"ActiveUsers\",\"include_lite_users\":true},\"cxPropEmptyDataMsg\":\"No users available\"},{\"name\":\"Roles\",\"model_name\":\"role\",\"idSelector\":\"id\",\"prefix\":\"R\",\"nameSelector\":\"display_label\",\"pagination\":false,\"cxPropEmptyDataMsg\":\"No roles available\"},{\"name\":\"Roles and Subordinates\",\"model_name\":\"role\",\"idSelector\":\"id\",\"prefix\":\"RS\",\"nameSelector\":\"name\",\"pagination\":false,\"cxPropEmptyDataMsg\":\"No roles and subordinates available\"},{\"name\":\"Territories\",\"model_name\":\"territory\",\"idselector\":\"id\",\"prefix\":\"T\",\"nameSelector\":\"name\",\"pagination\":false,\"cxPropEmptyDataMsg\":\"No territories available\",\"cxPropExclude\":[\"1126365000000502671\"]},{\"name\":\"Territories and Sub-territories\",\"model_name\":\"territory\",\"idselector\":\"id\",\"prefix\":\"TS\",\"nameSelector\":\"name\",\"pagination\":false,\"cxPropEmptyDataMsg\":\"No territories and sub-territories available\",\"cxPropExclude\":[\"1126365000000502671\"]}]";//No I18n
		// this.setData("cxPropOptionModels",JSON.parse(t));//No I18n
		// this.setData("cxPropSelected",JSON.parse("[{\"id\":\"1126365000000349001\",\"type\":\"user\",\"prefix\":\"U\"},{\"id\":\"1126365000000349033\",\"type\":\"user\",\"prefix\":\"U\"},{\"id\":\"1126365000000349048\",\"type\":\"user\",\"prefix\":\"U\"},{\"id\":\"1126365000000015969\",\"type\":\"role\",\"prefix\":\"RS\"},{\"id\":\"1126365000000015966\",\"type\":\"role\",\"prefix\":\"RS\"}]"));//No I18n
		// this.setData("localOptionModels",this.data.cxPropOptionModels);//No I18n
		// var selected = "[{\"prefix\":\"U\",\"user\":{\"id\":\"111111000000049850\",\"name\":\"testig\"},\"type\":\"users\",\"id\":\"111111000000049850\"},{\"prefix\":\"U\",\"user\":{\"id\":\"111111000000060184\",\"name\":\"user\"},\"type\":\"users\",\"id\":\"111111000000060184\"},{\"prefix\":\"U\",\"user\":{\"id\":\"111111000000060197\",\"name\":\"user2\"},\"type\":\"users\",\"id\":\"111111000000060197\"},{\"prefix\":\"R\",\"role\":{\"id\":\"111111000000047639\",\"name\":\"Manager\"},\"type\":\"roles\",\"user\":{\"id\":\"111111000000060210\",\"name\":\"user3\"},\"id\":\"111111000000047639\"}]";
		// this.setData("cxPropSelected",JSON.parse(selected));
		var typeMapping = {} , tempObj = JSON.parse(JSON.stringify(this.data.cxPropOptionModels));
		for(var i = 0 ; i < tempObj.length;i++){
			var modelObj = tempObj[i];
			// tempObj.model_name = modelObj.model_name;
			// tempObj.imageSelector = modelObj.imageSelector;
			modelObj.singular_name = modelObj.singular_name ? modelObj.singular_name : modelObj.name.toLowerCase().slice(0,-1);
			modelObj.plural_name = modelObj.plural_name ? modelObj.plural_name : modelObj.name;
			modelObj.selectedItems = [];
			if(modelObj.model_name == "user"){
				this.setData("userModelsOption",modelObj);//No I18n
			}
			// if( modelObj.prefix == this.data.cxPropShowType ){
			// 	this.setData("currentModelsOption",modelObj);//No I18n
			// }
			typeMapping[modelObj.prefix]=modelObj;
		}
		this.setData("localOptionModels",tempObj)
		this.setData("typeMapping",typeMapping);//No I18n
		this.preSelectedHandelingForView();
	}.observes('cxPropOptionModels.[]').on('init'),
	observesSelected : function(){
		this.preSelectedHandelingForView()
	}.observes('cxPropSelected.[]'),
	preSelectedHandelingForView : function(){
		var selected=this.getData("cxPropSelected");

		var userPrefix = this.data.userModelsOption.prefix;
		
		var isNewJson = selected.filter((item)=>{return item.prefix != userPrefix && item.user})[0]
		if( !isNewJson || !selected.length){ // to check old json if the selected doesn't contains user key.
			for(var j=0;j<this.getData('localOptionModels').length;j++){
				var localModel = this.getData('localOptionModels')[j];
				var selectedDataByModel = selected.filter(function(item){return item.prefix == localModel.prefix})//eslint-disable-line no-loop-func
				selectedDataByModel.forEach(function(data){//eslint-disable-line no-loop-func
					data.id = data[localModel.singular_name] ? data[localModel.singular_name].id : data.id;
	  				data.name = data[localModel.singular_name] ?data[localModel.singular_name].name : data.name;
				})
				Lyte.objectUtils(localModel, 'add', 'selectedItems',selectedDataByModel); //NO I18n
			}
			return;
		}
		for(var j=0;j<this.getData('localOptionModels').length;j++){
			Lyte.objectUtils(this.getData('localOptionModels')[j], 'add', 'selectedItems',[]); //NO I18n
  		 	var localModel = this.getData('localOptionModels')[j];
  			var temp , selectedDataByModel = selected.filter(function(item){return item.prefix == localModel.prefix}), resArray = []//eslint-disable-line no-loop-func
	  		selectedDataByModel.forEach(function(data){//eslint-disable-line no-loop-func
	  			data.id = data[localModel.singular_name].id
	  			data.name = data[localModel.singular_name].name;
	  			isDataAvail = resArray.filter(function(item){ return item.id == data[localModel.singular_name].id})[0];//eslint-disable-line no-loop-func
	  			if( localModel.prefix ==  this.data.userModelsOption.prefix){
	  				isDataAvail = resArray.filter(function(item){ return item.id == localModel.singular_name})[0];//eslint-disable-line no-loop-func
	  				temp = isDataAvail?isDataAvail : { type : localModel.model_name , prefix : localModel.prefix , id : localModel.singular_name , name : localModel.name ,users : [data.user]}
	  			}else{
	  				temp = { type : localModel.model_name , prefix : data.prefix , id : data.id , name : data.name }
	  				temp.users = data.user ? [data.user] : undefined;
	  			}
	  			if( !isDataAvail ){
	  				resArray.push(temp)
	  			}else{
	  				isDataAvail.users.push(data.user)
	  			}
	  			//Lyte.objectUtils(this.data.selectedUsersList,"add",data.user.id,data);//NO I18n
	  		}.bind(this))
	  		if(localModel.model_name == this.data.userModelsOption.model_name){
	  			resArray = resArray[0] && resArray[0].users ? resArray[0].users:[];
	  		}
  			Lyte.arrayUtils(this.getData('localOptionModels')[j].selectedItems, 'concat', resArray); //NO I18n
	  		// this.setData("totalSelectedItemsCount",this.getData("totalSelectedItemsCount")+selectedDataByModel.length); //No I18N
		}
	},
	actions : {
		// stopParentAction: function(ev){
		// 	ev.stopPropagation();
		// },
		stopParentAction : function(event){
			event.stopPropagation();
		},
		hideContent : function(){
			clearTimeout(this.timeout);
			this.setData('showPopover' , false);
		},
		showContent : function(ev,model){
			ev.stopPropagation();
	        let _this = this
			clearTimeout(this.timeout);
            this.timeout  = setTimeout(function(){
                var Origin;
                _this.setData('displayModel',model);
                if( model.tags ){ 
                    _this.setData({ "displayData" : _this.data.cxPropRecipient.tags, "displayLabel" : _this.data.cxPropRecipient.tag_selector});
                    Origin = "#recipients";
                }else{
                    _this.setData({ "displayData" : model.selectedItems, "displayLabel" : "name"});
                    Origin = "#"+_this.data.cxPropClass+"_"+model.prefix;
                }
				if( _this.data.originElem === Origin && _this.data.showPopover){
					return ;
				}
		_cruxUtils.addMurhyInfo("crux-combo-box-view.js", "Feb Default Changes");
				if( _this.data.originElem !== Origin  ){
					_this.setData('showPopover' , false);
					_this.setData("originElem",Origin);
				}
              	_this.setData('showPopover' , true);
            },300);
	    }
	},
	methods : {
		beforeHide : function(hovercard , event){
			// if(this.data.cxPropPreventClose && event.type !== "scroll"){
			// 	return false;
			// }
			if( event && event.target &&  event.target.classList.contains('cxComboBoxViewButtonUserCount') ){
				return false;
			}
			return true;
		}
		// beforeClose : function(event){
		// 	if( event && event.target &&  event.target.classList.contains('cxComboBoxViewButtonUserCount') ){
		// 		return false;
		// 	}
		// }
	}
	// reqestDataFromView : function(selectedList, dataModel){
	// 	promArray = [];
	// 	for(var k in selectedList) {
	// 		var lists = selectedList[k].list;
	// 		 for(var x=0;x<lists.length;x++){
	// 			 // for(var w=0;w<lists[x].length;w++){
	// 				 var currentQueryObj = {ids:lists[x].join(',')};//NO I18n
	// 				 var selectedParams = dataModel.selectedQueryParams ? dataModel.selectedQueryParams : {};
	// 				 if(Object.keys(selectedParams).length){
	// 					 for(var key in selectedParams) {
	// 						 currentQueryObj[key] = selectedParams[key];
	// 					 }
	// 				 }
	// 				 promArray.push(store.findAll(dataModel.model_name,currentQueryObj,false,false));
	// 			 }
	// 		// }
	// 	}
	// 	Lyte.resolvePromises(promArray).then(function(res){
	// 		if( res && res.length ){
	// 			var currentModel = this.data.currentModelsOption;
	// 			for( var i = 0 ; i < res.length ; i++ ){
	// 				if(res[i][currentModel.model_name]){
	// 					Lyte.arrayUtils(currentModel.selectedItems, 'concat', res[i][currentModel.model_name]); //NO I18n
	// 				}
	// 			}
	// 		}
	// 	}.bind(this))
	// }
});
/**
 * @syntax nonYielded
 * <crux-combo-box-view></crux-combo-box-view>
 */
