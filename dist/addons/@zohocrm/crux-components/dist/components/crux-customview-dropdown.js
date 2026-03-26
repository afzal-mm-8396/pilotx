/**
 * @component crux-customview-dropdown
 * @author silambarasan.rt
 */
Lyte.Component.register("crux-customview-dropdown", {
_template:"<template tag-name=\"crux-customview-dropdown\"> <lyte-dropdown class=\" cxCV_DropDown {{cxPropClass}}\" lt-prop-disabled=\"{{cxPropDisabled}}\" lt-prop-yield=\"true\" lt-prop-freeze=\"{{cxPropFreeze}}\" lt-prop-selected=\"{{cxPropSelected.id}}\" on-before-show=\"{{method('beforeOpenDropBox')}}\" on-show=\"{{method('onOpenDropBox')}}\" on-hide=\"{{method('onCloseDropBox')}}\" on-before-hide=\"{{method('beforeDropBoxClose')}}\" data-zcqa=\"{{cxPropZcqa}}\" lt-prop-animate=\"true\" lt-prop-dynamic=\"true\" lt-prop-scope=\"{{cxPropScope}}\" lt-prop-tabindex=\"{{cxPropTabindex}}\" lt-prop-active-element=\"{{if(showSearchBox,'.cxCV_SearchBoxInput','.lyteDummyEventContainer')}}\" lt-prop-include-button-in-focus-loop=\"{{if(showSearchBox,'.cxCV_SearchBoxInput','.lyteDummyEventContainer')}}\" lt-prop-allow-focusable-elements=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button data-zcqa=\"cxCVButton\" id=\"cxCV_DropButton\" class=\"{{cxPropButtonClass}}\"> <template is=\"if\" value=\"{{cxPropButtonYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"cxCV_ButtonYield\"></lyte-yield> </template><template case=\"false\"> <span class=\"cxCvDropdown\"><lyte-text lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;, &quot;appearance&quot;: &quot;box&quot;}\" lt-prop-tooltip-class=\"lvTooltipClass\" lt-prop-value=\"{{cxPropSelected[cxPropDisplayLabel]}}\"></lyte-text></span> <lyte-icon class=\"dropdown\"></lyte-icon> </template></template> </lyte-drop-button> <lyte-drop-box data-zcqa=\"cxCV_DropBox\" id=\"cxCV_DropBox\" class=\"cxCvDropBox cxCV_DropBox cxCV_DropBox_{{cxPropClass}} {{cxPropClass}}\"> <template is=\"if\" value=\"{{showSearchBox}}\"><template case=\"true\"><lyte-drop-header> <lyte-input id=\"cxCV_SearchBox\" lt-prop-class=\"cxCV_SearchBoxInput\" lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" lt-prop-autofocus=\"true\" lt-prop-type=\"search\" data-zcqa=\"CVSearchBox\" lt-prop-appearance=\"box\" oninput=\"{{action('searchCustomView',this)}}\" on-clear=\"{{method('clearSearch')}}\" lt-prop-close-icon=\"'true\"> </lyte-input> </lyte-drop-header></template></template> <lyte-drop-body data-zcqa=\"cxCV_DropBody\" class=\"cxCvDropBody cxCV_DropDownBody\" onscroll=\"{{action('scrollFun',this,event)}}\"> <template is=\"if\" value=\"{{isDataFetched}}\"><template case=\"true\"><div class=\"cxCvDropBoxAccordion\" id=\"accordionContainer\"> <lyte-accordion lt-prop-exclusive=\"false\" lt-prop-duration=\"0.2s\" lt-prop-dynamic=\"true\" on-before-close=\"{{method(&quot;beforeAccClosing&quot;)}}\" on-before-open=\"{{method(&quot;beforeOpenAccItem&quot;)}}\" on-open=\"{{method(&quot;onOpenAccItem&quot;)}}\" on-changed=\"{{method(&quot;onAccStateChange&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"for\" items=\"{{renderCustomviewCatList}}\" item=\"customViewGrp\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(customViewGrp.cxViews.length,'||',expHandlers(customViewGrp.showAccordion,'&amp;&amp;',expHandlers(customViewGrp.dataFetched,'!'))),'||',customViewGrp.cxDisabled)}}\"><template case=\"true\"><lyte-accordion-item data-zcqa=\"cxCV_{{customViewGrp.cxAccordionName}}_item\" cx-accordion-item=\"{{customViewGrp.cxAccordionName}}\" class=\"{{checkAccordionStats(customViewGrp.cxDisabled,index)}} cxCV_AccItem_{{customViewGrp.cxAccordionName}} cxCVAccordionItem {{customViewGrp.cxAccordionClass}} {{if(customViewGrp.cxDisabled,'cxCvDisabledAccItem','')}}\"> <lyte-accordion-header data-cv-category=\"{{customViewGrp.cxAccordionLabel}}\" class=\"cxCV_AccHeader cxCV_AccHeader_{{customViewGrp.cxAccordionName}}\"> <lyte-icon class=\"cxCvAccordionArw\"></lyte-icon> <span lt-prop-title=\"{{customViewGrp.cxTitle}}\">{{customViewGrp.cxAccordionLabel}}</span> </lyte-accordion-header> <lyte-accordion-body cxaccordionname=\"{{customViewGrp.cxAccordionName}}\" class=\"{{customViewGrp.cxAccordionName}} cxCV_{{customViewGrp.cxAccordionName}}_body {{if(customViewGrp.cxSortable,expHandlers('cxSortableContainer cxCV_Sortable_','+',customViewGrp.cxAccordionName),'')}}\"> <template is=\"if\" value=\"{{expHandlers(customViewGrp.cxViews.length,'!')}}\"><template case=\"true\"><div class=\"cxNoResultStyle\" id=\"cxCatNoatch\"><span>{{cxPropNoResult}}</span></div></template></template> <template is=\"for\" items=\"{{customViewGrp.cxViews}}\" item=\"cvItem\" index=\"ind\"> <template is=\"if\" value=\"{{cvItem.showLoading}}\"><template case=\"true\"><lyte-drop-item class=\"cxCvHorizontalLoading\"> <div class=\"cxSingleLineLoader\"></div> </lyte-drop-item></template><template case=\"false\"><lyte-drop-item data-zcqa=\"cxCV_Item_{{cvItem[cxPropDisplayLabel]}}\" id=\"cxCV_Item_{{cvItem.id}}\" selected=\"{{setSelected(customViewGrp,favoriteCVList,cvItem,cxPropSelected.id)}}\" data-value=\"{{cvItem.id}}\" class=\"cxCV_DropDownItem cxCV_{{customViewGrp.cxAccordionName}}_item {{if(favoriteCVList[cvItem.id],'cxStarFavorited','')}} \" onclick=\"{{action('selectCVItem',cvItem)}}\"> <template is=\"if\" value=\"{{favoriteCVList[cvItem.id]}}\"><template case=\"true\"><span class=\"cxStarWrap\"> <span class=\"cxStar {{if(cvItem.cxStarred,'cxStarSelected','cxStarEmpty')}}\" data-zcqa=\"cxCV_DisableStar\" onclick=\"{{action('starCVItem',event,cvItem,customViewGrp,'remove')}}\"></span> </span></template></template> <template is=\"if\" value=\"{{expHandlers(cxPropFavoriteOption,'&amp;&amp;',expHandlers(favoriteCVList[cvItem.id],'!'))}}\"><template case=\"true\"><span class=\"cxStarWrap\"> <span data-zcqa=\"cxCV_EnableStar\" class=\"cxStar {{if(cvItem.cxStarred,'cxStarSelected','cxStarEmpty')}}\" onclick=\"{{action('starCVItem',event,cvItem,customViewGrp,'add')}}\"></span> </span></template></template> <div class=\"cxFlex cxAlignItemCenter\"> <lyte-text class=\"cbViews\" lt-prop-value=\"{{cvItem[cxPropDisplayLabel]}}\"></lyte-text> <template is=\"if\" value=\"{{cxPropSuffixYield}}\"><template case=\"true\"><lyte-yield class=\"cxDIB cxCVPrefixYieldWrapper\" cv-item=\"{{cvItem}}\" yield-name=\"cxSelectedCustomview\"></lyte-yield></template></template> </div> </lyte-drop-item></template></template> </template> </lyte-accordion-body> </lyte-accordion-item></template></template> </template> </template> </lyte-accordion> </div></template><template case=\"false\"><div class=\"cxDotLoaderWrap\"> <div class=\"cxDotBullet cxDotLoader1\"></div> <div class=\"cxDotBullet cxDotLoader2\"></div> <div class=\"cxDotBullet cxDotLoader3\"></div> <div class=\"cxDotBullet cxDotLoader4\"></div> </div></template></template> <template is=\"if\" value=\"{{expHandlers(isDataFetched,'&amp;&amp;',expHandlers(totalCVRecords,'==',0))}}\"><template case=\"true\"><div class=\"cxNoResultStyle\" id=\"nomatch\"><span>{{cxPropNoResult}}</span></div></template></template> </lyte-drop-body> <template is=\"if\" value=\"{{cxPropFooterYield}}\"><template case=\"true\"> <lyte-drop-footer> <lyte-yield yield-name=\"cxCV_Footer\"></lyte-yield> </lyte-drop-footer> </template></template> </lyte-drop-box> </template> </lyte-dropdown> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"text","position":[0,1,3,0]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0,0]}]}},"default":{}},{"type":"attr","position":[0,3,3]},{"type":"for","position":[0,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[0,5,1]},{"type":"componentDynamic","position":[0,5,1]},{"type":"attr","position":[0,5,3]},{"type":"if","position":[0,5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[0,3]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[0,1]}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropModule","cxPropModelName","cxPropCustomviewCategory","cxPropQueryParams","cxPropSelected","cxPropDisplayLabel","cxPropFreeze","cxPropDisabled","cxPropZcqa","cxPropClass","cxPropButtonClass","cxPropFavoriteOption","cxPropMaxFavorite","cxPropButtonYield","cxPropFooterYield","cxPropNoResult","favoriteCVList","isDataFetched","showSearchBox","searchInProgress","totalCVRecords","customviewCatList","cxPropCallbackDelay","renderCustomviewCatList","favoriteCategory","cxPropSuffixYield","cxPropScope","cxPropTabindex"],
_observedAttributesType :["string","string","array","object","object","string","boolean","boolean","string","string","string","boolean","number","boolean","boolean","string","object","boolean","boolean","boolean","number","array","number","array","object","boolean","string","number"],

	data : function(){
		return { 
			/**
			 *The module for which custom views are to be fetched 
			 * @componentProperty { string } cxPropModule
			 */
			cxPropModule		:	Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * By default, request is made to the custom_view model. But if your application chooses to have a different model, you can customize it by changing this property.
			 * @componentProperty { string } cxPropModelName
			 * @defaultValue custom_view
			 */
			cxPropModelName 	:	Lyte.attr("string",{default : "custom_view"}),//no i18n
			/**
			 * The array of custom views split into their categories.
			 * @componentProperty { array } cxPropCustomviewCategory
			 * @defaultValue []
			 */
			cxPropCustomviewCategory	:	Lyte.attr("array",{default : []}),//no i18n
			/**
			 * Query params, if any, that need to be passed to the store request.
			 * @componentProperty { object } cxPropQueryParams
			 * @defaultValue {}
			 */
			cxPropQueryParams	:	Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * The selected custom view object. Should contain the display label
			 * @componentProperty { object } cxPropSelected
			 * @defaultValue {}
			 */
			cxPropSelected		:	Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * The selector that determines which key holds the display label of the custom view
			 * @componentProperty { string } cxPropDisplyLabel
			 * @defaultValue display_value
			 */
			cxPropDisplayLabel	:	Lyte.attr("string",{default : "display_value"}),//no i18n
			/**
			 * You can choose to freeze or not to freeze the background using this property. When you set it to false, background view will be accessible to the user.
			 * @defaultValue false
			 * @componentProperty { boolean } cxPropFreeze=false
			 */
			cxPropFreeze		:	Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * Set to true to disable the dropdown from opening.
			 * @componentProperty { boolean } cxPropDisabled=false
			 * @defaultValue false
			 */
			cxPropDisabled		:	Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * The zcqa set to the dropdown
			 * @componentProperty { string } cxPropZcqa
			 */
			cxPropZcqa			:	Lyte.attr("string",{default : ""}),//no i18n
			/**
		 * The class set to the dropdown
			 * @componentProperty { string } cxPropClass
			 * @defaultValue Customview_DD
			 */
			cxPropClass			:	Lyte.attr("string",{default : "Customview_DD"}),//no i18n
			/**
			 * The class set to the button of the dropdown
			 * @componentProperty { string } cxPropButtonClass
			 */
			cxPropButtonClass			:	Lyte.attr("string",{default : ""}),//no i18n
			/**
			 * Set to true to display favorite option in dropdown.
			 * @componentProperty { boolean } cxPropFavoriteOption=false
			 * @defaultValue false
			 */
			cxPropFavoriteOption:	Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * The limit of custom views that can be marked as favorite.
			 * @componentProperty { number } cxPropMaxFavorite
			 * @author authorName
			 * @minValue n1
			 * @maxValue 10
			 * @defaultValue 10
			 */
			cxPropMaxFavorite	:	Lyte.attr("number",{default : 10}),//no i18n
			cxPropButtonYield	:	Lyte.attr("boolean",{default : false}),//no i18n
			cxPropFooterYield	:	Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * The message to be displayed when there are no options found on search.
			 * @componentProperty { string } cxPropNoResult
			 * @defaultValue No options found.
			 */
			cxPropNoResult		:	Lyte.attr("string" , {default : _cruxUtils.getI18n('crm.label.no.options.found')}),
			favoriteCVList		:	Lyte.attr("object",{default : {}}),//no i18n
			isDataFetched		:	Lyte.attr("boolean",{default : false}),//no i18n
			showSearchBox		: 	Lyte.attr("boolean",{default : false}),//no i18n
			searchInProgress	: 	Lyte.attr("boolean",{default : false}),//no i18n
			totalCVRecords		: Lyte.attr("number",{default : 0}),//no i18n
			customviewCatList	:	Lyte.attr("array",{default : []}),//no i18n
			/**
			 * Value change callback will be invoked after given delay. Set this to undefined for immediate callback
			 * @componentProperty { number } cxPropCallbackDelay
			 * @minValue 0
			 */
			cxPropCallbackDelay : Lyte.attr("number"),//no i18n 
			renderCustomviewCatList : Lyte.attr("array",{default : []}),//no i18n
			favoriteCategory	:	Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * Set to true to render an icon after the custom view label
			 * @componentProperty { boolean } cxPropPrefixYield=false
			 * @defaultValue false
			 */
			cxPropSuffixYield	: Lyte.attr("boolean",{default : false}),//no i18n
			/**
			 * This represents the dom element within which the lyte-drop-box must be contained. The lyte-drop-box never leaves the boundary of its scope element. Used in dropdowns inside modals.
			 * @componentProperty { string } cxPropScope
			 */
			cxPropScope		:	Lyte.attr("string",{default : ""}),//no i18n
			cxPropTabindex		: Lyte.attr("number",{default : 0})//no i18n
		}		
	},
	constructInitialValues : function( from ){
		var cvCategories = JSON.parse(JSON.stringify(this.data.cxPropCustomviewCategory));
		var seq = 0;
		for( var cvCategory of cvCategories ){
			if( cvCategory.cxAccordionName == "cxFavorites" ){
				this.setData("favoriteCategory" ,cvCategory );//no i18n;
			}
			// if( cvCategory.cxDisabled ){
			// 	cvCategory.cxAccordionClass = cvCategory.cxAccordionClass ? cvCategory.cxAccordionClass+" cxCvDisabledAccItem" : "cxCvDisabledAccItem";
			// }
			if( cvCategory.cxViews && cvCategory.cxViews.length && from == 'init' ){
				cvCategory.preventApiRequest = true;
				cvCategory.initialDataAvailable = true;
				cvCategory.initialData = cvCategory.cxViews.slice(0);
			}
			cvCategory.cxViews = cvCategory.cxViews ? cvCategory.cxViews : [];
			// cvCategory.cachedQueries = [];
			cvCategory.cxParams = cvCategory.cxParams ? cvCategory.cxParams : {};
			// cvCategory.initialDataAvailable = false;
			cvCategory.dataFetched = false;
			cvCategory.cxSequenceNumber = seq++;

		}
		this.setData("customviewCatList",cvCategories);
	},
	// nonCharKeyCodes: [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 130, 122, 122, 123, 144, 145],
	init : function(){
		this.searchObj = { oldSearchValue : "" , currentSearchValue : "" }
		this.fetchCustomViewData = true;
		this.starredCV = [];
		this.unStarredCV = [];
		// this.moreRecordsCustomView = [];
		this.constructInitialValues('init');

		this.$node.addCustomview = function(catName , cvIds ,rollback ){
			if( !catName || !cvIds){
				return;
			}
			var modelName = this.getData('cxPropModelName');
			var cvCat = this.getData('renderCustomviewCatList').filter(function(item){return item.cxAccordionName == catName})[0];
			if( !cvCat ){
				cvCat = this.getData('customviewCatList').filter(function(item){return item.cxAccordionName == catName})[0];
				cvCat.cxViews = [];
				Lyte.arrayUtils(this.getData('renderCustomviewCatList'), "insertAt",0, cvCat); //NO I18n
			}
			delete cvCat.doDataSearch;
			delete cvCat.initialDataAvailable;
			var cvList = [] , cvRec ;
			cvIds = cvIds.constructor == Array ? cvIds : [cvIds] ;
			for(var i = 0 ; i < cvIds.length ;i++){
				// cvRec = store.peekRecord(modelName,cvIds[i]);
				cvRec = cvIds[i].constructor == String ? store.peekRecord(modelName,cvIds[i]) : cvIds[i];
				if( cvRec ){
					cvList.push(cvRec);
				}
			}
			// var cvList = cvIds.map(function(cvId){ return store.peekRecord(modelName,cvId)})
			if( rollback && 'cxFavorites' == catName){
				for(var item of cvList){
					Lyte.objectUtils( item , "delete" , 'cxStarred' );
				}
			}else{
				Lyte.arrayUtils(cvCat.cxViews, "concat", cvList); //NO I18n
				// this.setData('totalCVRecords',this.getData('totalCVRecords')+cvList.length)
			}
			// this.component.constructFavoriteObj(cvCat.cxViews);
			'cxFavorites' == catName ? this.component.constructFavoriteObj(cvCat.cxViews) : undefined;
			this.component.setSortable();
			this.component.setTotalCvCount();
		},
		this.$node.removeCustomview = function(catName , cvIds , rollback){
			if( !catName || !cvIds){
				return;
			}
			var modelName = this.getData('cxPropModelName');
			// var cvList = cvIds.map(function(cvId){ return store.peekRecord(modelName,cvId)});
			var cvList = [] , cvRec ;
			cvIds = cvIds.constructor == Array ? cvIds : [cvIds] ;
			for(var i = 0 ; i < cvIds.length ;i++){
				cvRec = cvIds[i].constructor == String ? store.peekRecord(modelName,cvIds[i]) : cvIds[i];
				if( cvRec ){
					cvList.push(cvRec);
				}
			}
			var cvCat = this.getData('renderCustomviewCatList').filter(function(item){return item.cxAccordionName == catName})[0];
			
			if( !cvCat || !cvList.length){
				return
			}
			delete cvCat.doDataSearch;
			delete cvCat.initialDataAvailable;
			if( rollback ){
				for(var item of cvList){
					Lyte.objectUtils( item , "add" , 'cxStarred' , true );
				}
			}else{
				var favIds = cvCat.cxViews.map(function(item) {return item.id;}); //NO I18n
				for(var item of cvList){
					var index = favIds.indexOf(item.id);
					if(index > -1) {
						favIds.splice(index,1);
						Lyte.objectUtils( cvCat.cxViews[index] , "delete" , 'cxStarred' );
						Lyte.arrayUtils(cvCat.cxViews, "removeAt", index); //NO I18n
						// this.setData('totalCVRecords',this.getData('totalCVRecords')-1);//NO I18n
					}
				}
			}
			var selectedId = this.getData('cxPropSelected.id');
			if(selectedId && cvList.filter((item)=>{return item.id ==selectedId})[0]){
				var selectedEle = $L("#cxCV_Item_"+selectedId , this.modalWrapperElement)[0];
				selectedEle ? selectedEle.setAttribute('selected','true'):undefined;//no i18n
			}
			// this.component.constructFavoriteObj(favCat.cxViews);
			'cxFavorites' == catName ? this.component.setSortable() : undefined;
			this.component.setSortable();
			this.component.setTotalCvCount({disableSearch : true});
		}
		// this.$node.addCustomview = function(catName , data , position){
		// 	if( !catName || !data){
		// 		return;
		// 	}
		// 	var cat = this.getData('renderCustomviewCatList').filter(function(item){return item.cxAccordionName == catName})[0];
		// 	if( !cat ){
		// 		return;
		// 	}
		// 	position = position ? position : cat.cxViews.length;
		// 	Lyte.arrayUtils(cat.cxViews , 'insertAt' , position , data);//no i18n
		// } 
		var dispLabel = this.data.cxPropDisplayLabel;
		if( !this.data.cxPropButtonYield && !this.data.cxPropSelected[dispLabel] ){
			if( this.data.cxPropSelected.id ){
				var cvRec = store.peekRecord(this.data.cxPropModelName , this.data.cxPropSelected.id);
				if( cvRec ){
					Lyte.objectUtils( this.data.cxPropSelected , 'add' , dispLabel , cvRec[dispLabel] );
				}else{
					store.findRecord(this.data.cxPropModelName , this.data.cxPropSelected.id , {module : this.data.cxPropModule}).then(function(resData){
						Lyte.objectUtils( this.data.cxPropSelected , 'add' , dispLabel , Lyte.isRecord(resData) ? resData[dispLabel] : resData[0][dispLabel] );
					}.bind(this))
				}
			}else{
				Lyte.objectUtils( this.data.cxPropSelected , 'add' , dispLabel , _cruxUtils.getI18n('crm.select')  );
				this.fetchData(undefined , {} , 'setSelected');
			}
		}

	},
	moduleObserver: function() {
		this.init();
	}.observes('cxPropModule'),
	didConnect: function() {
		this._setHeightForCVDropdown = this.setHeightForCVDropdown.bind(this);
		window.addEventListener('resize', this._setHeightForCVDropdown, true);
		this.setHeightForCVDropdown(false,true);

		this.lyteDropdown = this.$node.querySelector('lyte-dropdown'); //NO I18n
		this.$node.open = function() {
			this.lyteDropdown.open();
		}.bind(this);
		this.$node.close = function() {
			this.lyteDropdown.close();
		}.bind(this);
		this.$node.toggle = function() {
			this.lyteDropdown.toggle();
		}.bind(this);
	},
	setHeightForCVDropdown : function(isDropdownFooter,isDDVisible){
		//to set height for drop box
		let cxCVDropBtn = $L('.cxCV_DropDown' , this.$node)[0];
		let isDropdownVisible=cxCVDropBtn.ltProp('isOpen');
		if(isDropdownVisible || isDDVisible){
			let cxCvDropBody =  $L('.cxCvDropBody' , this.modalWrapperElement)[0];
	
			let cxCVDropBtnHt = cxCVDropBtn.clientHeight;
			let cxCVDropBtnTop = cxCVDropBtn.getBoundingClientRect().top;
			let cxCvDropBoxHt = 0;
			if(cxCVDropBtn){
				if(isDropdownFooter && this.lyteDropFooterElem){
					let lyteDropFooterHeight=this.lyteDropFooterElem.clientHeight;
					cxCvDropBoxHt = window.innerHeight - (cxCVDropBtnHt + cxCVDropBtnTop + lyteDropFooterHeight + 120);
				}
				else{
					cxCvDropBoxHt = window.innerHeight - (cxCVDropBtnHt + cxCVDropBtnTop + 200);
					/* 200px is a gross value including wms bar, default bottom spacing, drop footer etc. */
				}
			}
			cxCvDropBody.style.maxHeight = cxCvDropBoxHt+'px';
		}
	},
	didDestroy : function(){
		window.removeEventListener('resize', this._setHeightForCVDropdown, true);
		this.checkCallBackFn();
		delete this.modalWrapperElement;
		delete this.lyteDropFooterElem;
	},
	checkCallBackFn : function(callbackName){
		
		if(this.starCVDebounceTime){
			clearTimeout(this.starCVDebounceTime);
			this.triggerCallBack('onChangeFavorites');
			delete this.starCVDebounceTime;
			
		}
		if(this.reoderDebounceTime){
			clearTimeout(this.reoderDebounceTime);
			this.triggerCallBack('onCustomviewReorder',this.reorderCallbackData);
			delete this.reoderDebounceTime;
		}
	},
	actions : {
		searchCustomView : $L.debounce(function(inputEle){
			// if(this.nonCharKeyCodes.indexOf(event.which) === -1) {
			// clearTimeout(this.debounceTimer);
			// this.debounceTimer = setTimeout(function(event){
				// this.searchObj = { oldSearchValue : "" , currentSearchValue : "" }
				this.searchObj.currentSearchValue = inputEle.ltProp('value');
				var searchValue = this.searchObj.currentSearchValue;

				if( searchValue && searchValue.length < 2 ){
					return;
				}

				var isSameStr = this.searchObj.oldSearchValue !== "" ? this.searchObj.currentSearchValue.startsWith(this.searchObj.oldSearchValue) : false;
				var dataToFetchCat = [] , cvList = this.data.customviewCatList  , currentCatViews , renderCv = [];
				if( isSameStr ){
					cvList = this.data.renderCustomviewCatList;
				}
				for( var cvCat of cvList ){
					var skipProcess = cvCat.initialDataAvailable == false || cvCat.cxDisabled ? true : false;
					if( cvCat.cxDisabled && !searchValue){
						renderCv.push(cvCat);
					}
					if( skipProcess ){
						continue;
					}
					if( cvCat.doDataSearch || ( isSameStr && cvCat.cxViews.length && cvCat.dataFetched)){ // data fetched check added becz search item added bydefault for closed accordion
						if( cvCat.moreData.more_records ){
							dataToFetchCat.push(cvCat);
							continue;
						}
						// cvCat.cvNextData = cvCat.cvNextData ? cvCat.cvNextData : [];
						currentCatViews =  cvCat.cxViews.concat(cvCat.cvNextData);
						currentCatViews = cvCat.doDataSearch ? cvCat.initialData : currentCatViews;
						var filteredCVItems = currentCatViews.filter(function(cvItem) {
							return cvItem.display_value.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ? true : false;
						})
						cvCat.skipRequest = true;
						cvCat.cvNextData = filteredCVItems.splice(20 , filteredCVItems.length);
						cvCat.cxViews = filteredCVItems;
						if( cvCat.cxViews.length && searchValue){ // searchValue cond added to fix for order changing issue.
							renderCv.push(cvCat);
						}
						dataToFetchCat.push( cvCat );
					}else if( typeof cvCat.initialDataAvailable == "undefined" || cvCat.initialDataAvailable){
						dataToFetchCat.push(cvCat);
					}
				}

				if( dataToFetchCat.length ){
					var qp = {} , from ;
					delete this.searchObj.searchCriteria;
					if( searchValue ){
						from = "search";
						var filterCriteria = { field : {api_name : "Display_Name"} , comparator : "contains" , value : searchValue };
						if(this.getMethods('onConstructSearchCriteria')){
							/**
							 * This callback is fired before the search
							 * @method onConstructSearchCriteria
							 * @author silambarasan.rt
							 * @param { object } searchValue
							 * @returns {object} searchCriteria
							*/
							filterCriteria = this.executeMethod('onConstructSearchCriteria',{ searchValue : searchValue }); //No I18N
						}
						qp.filters = filterCriteria;
						this.searchObj.searchCriteria = qp;
					}
					this.searchObj.oldSearchValue = searchValue;
					this.fetchData(dataToFetchCat, qp , from , renderCv);
				}else if( renderCv.length ){
					this.setData("renderCustomviewCatList" , renderCv )
					this.setSortable();
				}
			// }.bind(this),500);
			// }
		},500),
		selectCVItem : function(cvItem){
			if(this.getMethods('onBeforeCustomviewSelect')){
				/**
				 * This callback is fired before the customview select. Return false to prevent custom view selection
				 * @method onBeforeCustomviewSelect
				 * @author silambarasan.rt
				 * @param { object } selected
				 * @returns {boolean} true/false
				*/
				var stopClosing = this.executeMethod('onBeforeCustomviewSelect',{ selected : cvItem }); //No I18N
				if( stopClosing == false ){
					this.preventClosing = true;
					return false;
				}
			}
			this.setData("cxPropSelected" , cvItem);
			if(this.getMethods('onCustomviewSelect')){
				/**
				 * This callback is fired after the customview select
				 * @method onCustomviewSelect
				 * @author silambarasan.rt
				 * @param { object } selected
				*/
				return this.executeMethod('onCustomviewSelect',{ selected : cvItem }); //No I18N
			}
		},
		starCVItem : function(event , cvItem ,customViewGrp, action){

			if(!this.data.cxPropFavoriteOption){
				return
			}
			event.stopPropagation();
			var starSpan = event.target;
			if( action == "remove" ){
				if(this.unStarredCV.includes(cvItem.id)) {
					this.unStarredCV = this.unStarredCV.filter(function(cvItemId) {
						return cvItemId !== cvItem.id;
					});
					Lyte.objectUtils( cvItem , "add" , 'cxStarred' , true );
					// starSpan.className = "cxStar cxStarSelected"
				} else {
					this.unStarredCV.push(cvItem.id);
					Lyte.objectUtils( cvItem , "delete" , 'cxStarred'  );
					// starSpan.className = "cxStar cxStarEmpty"
				}				
			}else{
				var allFavLen = Object.keys(this.data.favoriteCVList).length;
				// var unstarLen = this.unStarredCV.len;

				if(this.starredCV.length + allFavLen < this.getData("cxPropMaxFavorite")) {
					if(this.starredCV.includes(cvItem.id)) {
						this.starredCV = this.starredCV.filter(function(cvItemId) {
							return cvItemId !== cvItem.id;
						});
						Lyte.objectUtils( cvItem , "delete" , 'cxStarred' );
						// starSpan.className = "cxStar cxStarEmpty"
					} else {
						this.starredCV.push(cvItem.id);
						Lyte.objectUtils( cvItem , "add" , 'cxStarred' , true );
						// starSpan.className = "cxStar cxStarSelected"
					}
				}else{
					_cruxUtils.showCustomAlert({ params: { ltPropPrimaryMessage: I18n.getMsg("crm.alert.favorite.reached.maxlimit",this.getData("cxPropMaxFavorite")) , ltPropType : "warning" } });//No I18N
				}
			}
			clearTimeout(this.starCVDebounceTime);
			this.starCVDebounceTime = setTimeout(function(){
				delete this.starCVDebounceTime;
				this.triggerCallBack('onChangeFavorites');
			}.bind(this), this.data.cxPropCallbackDelay)
		},
		scrollFun : function( node , ev ){
			// clearTimeout(this.scrollDebounce);
			// this.scrollDebounce = setTimeout(function(){
				$L.fastdom.measure( function(){
					var AccItem ;
					var scrollableEle = this.modalWrapperElement.getElementsByClassName("cxCV_DropDownBody")[ 0 ];
					for( var cvCategory of this.data.renderCustomviewCatList ){
						if( !cvCategory.cvNextData.length && !cvCategory.moreData.more_records){
							continue;
						}
						AccItem = scrollableEle.getElementsByClassName( "cxCV_AccItem_"+cvCategory.cxAccordionName )[0];
						if(!AccItem || !AccItem.classList.contains('lyteAccordionActive') ){
							continue;
						}

						var scrollEleBotm = scrollableEle.getBoundingClientRect().bottom;
						var accItemBotm = AccItem.getBoundingClientRect().bottom;
						var diffLen = accItemBotm - scrollEleBotm;
						if(diffLen < 200 ){
							$L.fastdom.mutate( function(){
								if( cvCategory.cvNextData.length ){
									// this.toggleScroll(); 
									var nextSetData = cvCategory.cvNextData.splice(0,20);
									Lyte.arrayUtils( cvCategory.cxViews , "push" ,  nextSetData);
									_this.setTotalCvCount();
								}else if(cvCategory.moreData.more_records){
									var _this = this;
									if( !_this.dataFetchingProcess ){
										_this.dataFetchingProcess = true;
										// Lyte.arrayUtils( cvCategory.cxViews , "push" , { showLoading : true } );
										this.toggleScroll(); 							
										var qp = { page :cvCategory.moreData.page+1 }
										this.fetchCVData(cvCategory , qp , false , "scroll").then(function(){
											_this.toggleScroll();
											delete _this.dataFetchingProcess;
										})
									}
								}
							}.bind(this))
							break

						}
						// }
					}
				}.bind(this))
			// }.bind(this),20);
		}
	},
	methods : {
		clearSearch : function(eve , inputEle){
			this.actions.searchCustomView.call(this,inputEle);
		},
		onAccStateChange : function(){
			this.renderFirstSetofCV(50);
		},
		beforeOpenAccItem : function(ev , accItem ){
			var accName = accItem.getAttribute('cx-accordion-item');
			var cvCategory = this.data.renderCustomviewCatList.filter(function(cat){return cat.cxAccordionName == accName})[0];//eslint-disable-line no-loop-func
			if( cvCategory.cxDisabled ){
				return false;
			}
		},
		onOpenAccItem : function( ev , accItem ){
			var accName = accItem.getAttribute('cx-accordion-item');
			var cvCategory = this.data.renderCustomviewCatList.filter(function(cat){return cat.cxAccordionName == accName})[0];//eslint-disable-line no-loop-func
			if( !cvCategory.dataFetched ){
				var searchCriteria ,from= undefined
				if( this.searchObj.searchCriteria ){
					searchCriteria = this.searchObj.searchCriteria ;
					from = "search";
				}
				
				this.fetchCVData(cvCategory ,  searchCriteria , undefined , from);
			}
		},
		beforeAccClosing : function(ev , accItem ){
			var accName = accItem.getAttribute('cx-accordion-item');
			var cvCategory = this.data.renderCustomviewCatList.filter(function(cat){return cat.cxAccordionName == accName})[0];//eslint-disable-line no-loop-func
			if( cvCategory.cxPreventClosing ){
				return false;
			} 
		},
		beforeDropBoxClose : function(ev){
			if( this.preventClosing ){
				delete this.preventClosing;
				return false;
			}
			var cruxAlertEle =$L(".cxAlertWrapper")[0];
			if( cruxAlertEle ){
				return false;
			}
			if( this.getMethods("onBeforeHide") ){
				return this.executeMethod("onBeforeHide");
			}
		},
		onCloseDropBox : function(){
			var searchBox = $L("#cxCV_SearchBox" , this.modalWrapperElement)[0];
			if( searchBox && searchBox.ltProp('value') ){
				searchBox.ltProp("value","");
				delete this.searchObj.searchCriteria;
				this.fetchCustomViewData = true;
			}
			if( this.fetchCustomViewData ){
				this.constructInitialValues();
				this.fetchData();
			}
			this.checkCallBackFn()
			if( this.getMethods('onHide') ){
				this.executeMethod('onHide');
			}
		},
		beforeOpenDropBox : function(){
			this.modalWrapperElement = this.$node.querySelector('lyte-dropdown').component.childComp;
			if(this.modalWrapperElement){
				this.lyteDropFooterElem=this.modalWrapperElement.querySelector('lyte-drop-footer');
			}
			if( this.getMethods("onBeforeShow") ){
				var cond = this.executeMethod("onBeforeShow", { customview : this.data.customviewCatList });
				if( cond === false ){
					return cond;
				}
				if( cond && cond.constructor === Object && cond.fetchCustomViewData){
					this.fetchCustomViewData = cond.fetchCustomViewData;
				}
			}
			if( !this.data.isDataFetched  || this.fetchCustomViewData){
				this.fetchData();
				this.fetchCustomViewData = false;
			}
			this.setHeightForCVDropdown(false,true);
			
		},
		onOpenDropBox : function(){
			this.setHeightForCVDropdown(true);
			this.modalWrapperElement.querySelector(".cxCV_DropDownBody").scrollTop = 0;
			var searchInput = $L(".cxCV_SearchBoxInput" , this.modalWrapperElement)[0];
			if(searchInput) {
				searchInput.focus();
			}
			if( this.getMethods("onShow") ){
				this.executeMethod("onShow", { customview : this.data.customviewCatList })
			}
			var accItems = $L('.cxCVAccordionItem' , this.modalWrapperElement),
				len = accItems.length , element ;
			for( var i = 0 ; i < len ; i++ ){
				element = $L(accItems[i]);
				if( !element.hasClass('lyteAccordionActive') ){
					element.click();
				}
			}
		}
	},
	setTotalCvCount : function(data={}){
		let forceEnableSearch = data.forceEnableSearch , 
			disableSearch = data.disableSearch;
		let cvData = this.data.renderCustomviewCatList , 
			totCnt = 0;
		cvData.forEach((cvItem)=>{
			if( cvItem.cxViews && cvItem.cxViews.length ){
				totCnt = totCnt + cvItem.cxViews.length;
			}
		})
		this.setData('totalCVRecords',totCnt);
		if( ( totCnt > 10 && !this.data.showSearchBox ) || forceEnableSearch){
			this.setData("showSearchBox",true);
			$L(".cxCV_SearchBoxInput",this.modalWrapperElement)[0].focus();
		}else if( totCnt < 10 && disableSearch){
			this.setData("showSearchBox",false);;
		}
	},
	fetchData : function( dataJson ,   qp = {} ,from , renderToCvList = []){
		var _self = this , enableSearch = false;
		dataJson = dataJson ? dataJson : _self.data.customviewCatList;
		_self.setData( "isDataFetched" , false );
		// _self.setData("totalCVRecords", 0);
		var len = dataJson.length , promise = []  , cvCategory , customData = {};
		var reqLimit = from == 'search' ? 2 : 3 , reqCount = 0;
		for(var i = 0 ; i < len ; i++){
			cvCategory = dataJson[i];
			if( cvCategory.cxDisabled ){
				renderToCvList.push(cvCategory);
				continue;
			}
			if( cvCategory.skipRequest ){
				// _self.setData("totalCVRecords" , _self.data.totalCVRecords + cvCategory.cxViews.length)
				delete cvCategory.skipRequest;
				continue;
			}
			cvCategory.dataFetched = false;
			if( reqCount < reqLimit || cvCategory.preventApiRequest){
				customData.unloadCustomview = !cvCategory.preventApiRequest && typeof _self.unloadCustomview == "undefined" && i == 0 ? true : false;
				qp.page =1;
				qp.customData = customData;
				reqCount = reqCount + 1;
				promise[i] = _self.fetchCVData( cvCategory , qp ,true , from);
			}else{
				cvCategory.cxViews = [];
				cvCategory.showAccordion = true;
				cvCategory.cxViews.push({ showLoading : true })
			}
		}
		Lyte.resolvePromises(promise).then(function(){
			var compareFn = function compareNumbers(a, b) {
				return a.cxSequenceNumber - b.cxSequenceNumber;
			}
			var firstCv , catLen = dataJson.length , cvCat , presFlg ;
			for(var i = 0 ; i < catLen ; i++){
				cvCat = dataJson[i];
				presFlg =  renderToCvList.filter( ( cvCatItem ) => { return cvCatItem.cxAccordionName == cvCat.cxAccordionName } )[0];
				if( cvCat.cxViews.length){
					if( !presFlg ){
						renderToCvList.push(cvCat)
					}
					firstCv = !firstCv && cvCat.dataFetched && cvCat.cxViews[0] && !cvCat.cxViews[0].showLoading ? cvCat.cxViews[0] : firstCv;
				}else if(presFlg && !cvCat.cxDisabled ){
					var ind = renderToCvList.findIndex( function( item ){ return item.cxAccordionName == cvCat.cxAccordionName } )//eslint-disable-line no-loop-func
					renderToCvList.splice(ind,1);
				}
			}
			// enableSearch =  _self.data.totalCVRecords > 10 ? true : false;
			var dataUnFetchedCat = dataJson.filter( (cvCat)=>{return !cvCat.dataFetched} );
			if( !firstCv){
				// var dataUnFetchedCat = dataJson.filter( (cvCat)=>{return !cvCat.dataFetched} );
				if( dataUnFetchedCat.length ){
					_self.unloadCustomview = false;
					return _self.fetchData( dataUnFetchedCat , qp , from , renderToCvList);
				}
			}else if( dataJson.length > 3 ){
				enableSearch = true;
			}
			if( from == "setSelected" ){
				_self.setData("cxPropSelected",firstCv);
			}
			renderToCvList.sort(compareFn);
			if(_self.getMethods("onBeforeRender")){
				var result = _self.executeMethod("onBeforeRender" , {cvCategory : renderToCvList , search : from == 'search' ? true : false})
				if( result && result.length ){
					renderToCvList = result;
					var totCVRecCount = 0;
					renderToCvList.forEach((cvGrp)=>{
						totCVRecCount = totCVRecCount + cvGrp.cxViews.length;
					})
					_self.setData('totalCVRecords',totCVRecCount);
				}
			}
			enableSearch = enableSearch ||  _self.data.totalCVRecords > 10 ? true : false;
			_self.setData("renderCustomviewCatList" , renderToCvList )
			_self.setData( "isDataFetched" , true );
			_self.fetchNextSet(dataUnFetchedCat);
			_self.renderFirstSetofCV(50);
			_self.setSortable();
			_self.setTotalCvCount({ forceEnableSearch :  enableSearch});
			// if( enableSearch ){
			// 	_self.setData("showSearchBox",true);
			// 	$L(".cxCV_SearchBoxInput")[0].focus();
			// }
		})
	},
	fetchCVData : function(cvCategory , queryParams={} , removeOldData=false ,from ){
		queryParams.module = this.data.cxPropModule;
		queryParams.page = queryParams.page ? queryParams.page : 1;
		queryParams.per_page = 200;
		var customData = queryParams.customData ? queryParams.customData  : {unloadCustomview : false},
			_self = this , qp;
		delete queryParams.customData ;
		cvCategory.cxParams = cvCategory.cxParams ? cvCategory.cxParams : {};
		qp = {...queryParams , ...this.data.cxPropQueryParams , ...cvCategory.cxParams};
		cvCategory.queryParams = qp;
		if( cvCategory.preventApiRequest ){
			return new Promise(function(resolve){
				_self.postRequestProcess(cvCategory.cxViews , cvCategory ,removeOldData, from);
				resolve();
			})
		}
		return store.findAll(this.data.cxPropModelName , qp , true , true , customData).then(function(result){
			_self.postRequestProcess(result , cvCategory ,removeOldData, from);
		})
	},
	postRequestProcess : function(result , cvCategory , removeOldData=false , from){
		var res = result ? result.slice(0) : []
		cvCategory.moreData = {};
		if(removeOldData){
			Lyte.objectUtils(cvCategory , "add" , "cxViews", []);
			cvCategory.cvNextData = [];
		}
		if( from !== "search" && from !== "scroll" ){
			cvCategory.initialDataAvailable = res && res.length ? true : false;
			cvCategory.initialData = res && res.length ? res.slice(0) : [];
			cvCategory.doDataSearch = cvCategory.initialDataAvailable ? true : false;
			if(result && result.$ && result.$.meta){
				cvCategory.doDataSearch =  !result.$.meta.more_records;
			}
		}
			Lyte.objectUtils(cvCategory , "add" , "dataFetched", true);
			//to remove a last item if loading is visible
			var lastItem = cvCategory.cxViews[cvCategory.cxViews.length-1];
			if( lastItem && lastItem.showLoading ){
				Lyte.arrayUtils( cvCategory.cxViews , 'removeAt' ,cvCategory.cxViews.length-1, 1 );
			}
			if( res && res.length ){
				if( this.getMethods("onBeforeCustomviewRender") ){
					/**
					 * This callback is fired after the customview rendering
					 * @method onBeforeCustomviewRender
					 * @author silambarasan.rt
					 * @param { object }
					*/
					var cv = this.executeMethod("onBeforeCustomviewRender", { cvCategory : cvCategory , customViews : res , search : from == 'search' ? true : false });
					if( typeof cv !== undefined ){
						res = cv;
						if( from !== "search" && from !== "scroll" ){
							cvCategory.initialDataAvailable = res && res.length ? true : false;
							cvCategory.initialData = res && res.length ? res.slice(0) : [];
						// cvCategory.doDataSearch = cvCategory.initialDataAvailable ? true : false;
						}
					}
				}
				// this.setData("totalCVRecords" , this.data.totalCVRecords + res.length)
				// _self.data.totalCVRecords = _self.data.totalCVRecords + res.length;
				cvCategory.cvNextData = res.splice(20 , res.length);

				Lyte.arrayUtils( cvCategory.cxViews , 'push' , res);
				this.setTotalCvCount();
				cvCategory.moreData = {};
				if(result.$ && result.$.meta){
					cvCategory.moreData =  result.$.meta;
					// if( cvCategory.moreData.more_records ){
					// 	_self.moreRecordsCustomView.push( cvCategory );
					// }
					
				}
				if( cvCategory.cxAccordionName == 'cxFavorites'  ){
					this.constructFavoriteObj(cvCategory.cxViews)
				}
			}
	},
	constructFavoriteObj : function(customViews){
		var mapObj = { };
		for( var cvItem of customViews ){
			Lyte.objectUtils( cvItem , "add" , 'cxStarred' , true );
			mapObj[cvItem.id] = cvItem;
		}
		this.setData("favoriteCVList",mapObj);
	},
	setSortable : function(){
		dataJson = this.data.renderCustomviewCatList;
		var length = dataJson.length , i = 0 , cvItem , _self = this;
		for( i = 0 ; i < length ; i++ ){
			cvCategory = dataJson[i];
			if( cvCategory.cxSortable && cvCategory.cxViews && cvCategory.cxViews.length > 1){
				var  sortableEle = this.modalWrapperElement.querySelector(".cxCV_DropDownBody .cxCV_Sortable_"+cvCategory.cxAccordionName);
				$L(sortableEle).sortable({
					omitRestricted : true,
					containment  : "parent", //No I18n
					preventDefault : { "mousedown" : false, "mousemove": true },//NO I18n
					onDrop  : function (droppedElement , destinantion , belowElement , from, to , source ){//eslint-disable-line no-loop-func
						var accName = destinantion.getAttribute('cxAccordionName');
						var cvCategory = _self.data.renderCustomviewCatList.filter(function(cat){return cat.cxAccordionName == accName})[0];//eslint-disable-line no-loop-func
						var item = Lyte.arrayUtils( cvCategory.cxViews , 'removeAt' , from ,1 )[0]
						Lyte.arrayUtils( cvCategory.cxViews , 'insertAt' ,  to , item );
						clearTimeout(_self.reoderDebounceTime);
						_self.reorderCallbackData = { reorderedCVList : cvCategory.cxViews };
						_self.setSortable();
						_self.reoderDebounceTime = setTimeout(function(){//eslint-disable-line no-loop-func
							delete _self.reoderDebounceTime;
							_self.triggerCallBack("onCustomviewReorder" , _self.reorderCallbackData )
						},_self.data.cxPropCallbackDelay)
					},
					restrict : ".cxStar"
					 });

			}
		}
	},
	triggerCallBack : function(callBack , callbackData = {}){
		if(this.getMethods(callBack)){
			if( callBack ==  'onChangeFavorites' ){
				callbackData.starredCV = this.starredCV;
				callbackData.unStarredCV = this.unStarredCV;
				callbackData.favoriteData = this.data.customviewCatList.filter((cvCatogory)=> cvCatogory.cxAccordionName == "cxFavorites" )[0];
				var starredCVList = [] , unStarredCVList = [];
				if( this.starredCV.length ){
					for(var cvId of this.starredCV) {
						starredCVList.push(store.peekRecord(this.getData('cxPropModelName'),cvId))
					}
				}
				if( this.unStarredCV.length ){
					for(var cvId of this.unStarredCV) {
						unStarredCVList.push(store.peekRecord(this.getData('cxPropModelName'), cvId))
					}
				}
			}
			callbackData.customviewCategoryList = this.data.customviewCatList
			this.executeMethod(callBack,callbackData); //No I18N
			store.clearCachedQuery(this.data.cxPropModelName);
			this.fetchCustomViewData = true;
			this.starredCV = [];
			this.unStarredCV = [];
		}
	},
	toggleScroll : function(){
		var scrollEle = $L( ".cxCV_DropDownBody" , this.modalWrapperElement );
		if( scrollEle.hasClass("oHidden") ){
			scrollEle.removeClass("oHidden")
		}else{
			scrollEle.addClass("oHidden")
		}
	},
	fetchNextSet : function(cvCategories = []){
		if( !cvCategories.length ){
			return;
		}
		var len = cvCategories.length , cvCat , element
			// dropBox = document.getElementsByClassName('cxCV_DropBox')[ 0 ];
		for( var i = 0 ; i < len ; i++ ){
			cvCat = cvCategories[i];
			element = $L('.cxCV_AccItem_'+cvCat.cxAccordionName , this.modalWrapperElement)[0];
			// if( !element.hasClass('lyteAccordionActive') ){
				this.methods.onOpenAccItem.call(this,{},element);
			// }
		}
	},
	renderFirstSetofCV : function(count){
		var cvCatList = this.data.renderCustomviewCatList , 
			len = cvCatList.length,
			cvCat , AccItem,
			dropBody = this.modalWrapperElement.getElementsByClassName("cxCV_DropDownBody")[ 0 ];
		for( var i = 0 ; i < len ; i++ ){
			if(count <= 0){
				return;
			}
			cvCat = cvCatList[i];
			AccItem = dropBody.getElementsByClassName( "cxCV_AccItem_"+cvCat.cxAccordionName )[0];
			if(!AccItem || !AccItem.classList.contains('lyteAccordionActive') ){
				continue;
			}
			count = count - cvCat.cxViews.length
			if( count > 0 && cvCat.cvNextData &&  cvCat.cvNextData.length){
				let cvItems = cvCat.cvNextData.splice(0,count);
				count = count - cvItems.length;
				Lyte.arrayUtils( cvCat.cxViews , "push" ,  cvItems);
			}
		}
	}
});

Lyte.Component.registerHelper("setSelected", function(customViewGrp, favoriteCVList ,cvItem,selectedId) {//No I18n
	if( cvItem.id == selectedId ){
		if( customViewGrp.cxAccordionName == 'cxFavorites' ){
			return 'true';
		}
		if( !favoriteCVList[selectedId] ){
			return 'true'
		}
	}
	return false;
})
Lyte.Component.registerHelper("checkAccordionStats", function( disabled , ind) {//No I18n
	if(!disabled &&  ind <= 2 ){
		return 'lyteAccordionActive';
	}
	return '';
})
/**
 * @syntax nonYielded
 * <crux-customview-dropdown cx-prop-selected='{"id":"503478000018638003","display_value":"Untitled View"}' cx-prop-customview-category='{"cxAccordion":true,"cxAccordionLabel":"Created By Me","cxAccordionName":"Created_By_Me","cxViews":[{"display_value":"Untitled View","created_time":"2023-11-02T12:09:30+05:30","system_name":null,"module":{"api_name":"Leads","id":"503478000000000125"},"created_by":{"name":"silambarasan R str","id":"503478000000211017"},"default":false,"modified_time":"2023-11-02T12:09:30+05:30","name":"Untitled View","system_defined":false,"modified_by":{"name":"silambarasan R str","id":"503478000000211017"},"id":"503478000018638003","category":"created_by_me","last_accessed_time":"2023-12-11T18:08:28+05:30","locked":false,"favorite":2,"cxStarred":true},{"display_value":"Untitled View1","created_time":"2020-07-23T14:32:58+05:30","system_name":null,"module":{"api_name":"Leads","id":"503478000000000125"},"created_by":{"name":"silambarasan R str","id":"503478000000211017"},"default":false,"modified_time":"2020-07-23T14:38:30+05:30","name":"Untitled View1","system_defined":false,"modified_by":{"name":"silambarasan R str","id":"503478000000211017"},"id":"503478000003826362","category":"created_by_me","last_accessed_time":"2024-04-16T12:38:38+05:30","locked":false,"favorite":null}],"cxSequenceNumber":1,"cvNextData":[],"doDataSearch":true}'></crux-customview-dropdown>
 */
