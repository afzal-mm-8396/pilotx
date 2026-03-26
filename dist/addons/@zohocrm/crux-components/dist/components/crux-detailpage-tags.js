Lyte.Component.register("crux-detailpage-tags", {
_template:"<template tag-name=\"crux-detailpage-tags\"> <span class=\"{{if(expHandlers(inEditMode,'!'),'zcicncss-tag zcicn-cssIcons zcicn_grey_mask mR7 vam left0 top2 dvTagIcon','')}} cruxDetailTag_{{componentUniqueId}} tagsIconHolder\"></span> <template is=\"if\" value=\"{{expHandlers(cxPropExistingTags.length,'&amp;&amp;',expHandlers(inEditMode,'!'))}}\"><template case=\"true\"><div class=\"cxDvCompParent cxDvTagsParent\"> <crux-tag-component cx-prop-module=\"{{cxPropModuleName}}\" cx-prop-trigger-tag-click=\"true\" cx-prop-clip-mode=\"true\" cx-prop-value=\"{{cxPropExistingTags}}\" cx-prop-is-color-code-enabled=\"true\" cx-prop-from=\"view\"></crux-tag-component> <template is=\"if\" value=\"{{cxPropSupportAjaxEdit}}\"><template case=\"true\"><span class=\"cxDvTagFieldEditIcon cxCP\" data-zcqa=\"detailViewLyteAddTag\" id=\"tags_edit_icon\" onclick=\"{{action('openEditPopup')}}\"> <span class=\"zcicncss-editFilled zcicn-cssIcons zcicncss13\"></span> </span></template></template> </div></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSupportAjaxEdit}}\"><template case=\"true\"><div onclick=\"{{action('openEditPopup')}}\"> {{cruxGetI18n(\"crm.label.add.tags\")}} </div></template></template></template></template> <lyte-popover id=\"crux-detailview_addtag\" lt-prop-width=\"570px\" lt-prop-origin-elem=\".cruxDetailTag_{{componentUniqueId}}\" lt-prop-placement=\"bottomLeft\" lt-prop-freeze=\"false\" lt-prop-show-close-button=\"false\" lt-prop-show=\"{{lbind(inEditMode)}}\" lt-prop-wrapper-class=\"crux_detailview_addtag\" lt-prop-type=\"box\" lt-prop-boundary=\"{&quot;left&quot;:&quot;100&quot;,&quot;top&quot;:&quot;0&quot;}\" lt-prop-content-padding=\"13px 35px\" lt-prop-footer-padding=\"5px 35px 25px\" lt-prop-close-on-body-click=\"true\" lt-prop-allow-multiple=\"true\" on-before-close=\"{{method('open_pop')}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content> <span class=\"zcicncss-tag zcicn-cssIcons zcicn_grey_mask pA mR7 lft10 top20\"></span> <crux-tag id=\"defaulttagedit\" cx-prop-id=\"view\" cx-prop-tag-options=\"{{lbind(cxPropRecordTags)}}\" cx-prop-tags=\"{{cxPropExistingTags}}\" cx-prop-allow-dropdown=\"true\" cx-prop-comma-seperation=\"true\" cx-prop-prevent-key-list=\"[&quot;<&quot;,&quot;>&quot;,&quot;,&quot;]\" on-before-add-tag=\"{{method('validate_tags')}}\" on-remove-tag=\"{{method('addToRecordTags')}}\" on-add-tag=\"{{method('addToallTags')}}\" cx-prop-max-tag-limit=\"{{cxPropMaxTagLimit}}\"> </crux-tag> </lyte-popover-content> <lyte-popover-footer class=\"alignright\"> <lyte-button lt-prop-size=\"small\" lt-prop-appearance=\"default\" onclick=\"{{action('hideAddTagPopup')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.cancel\")}} </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary\" lt-prop-size=\"small\" data-zcqa=\"crux_savetag_btn\" onclick=\"{{action('saveTags')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{cruxGetI18n(\"crm.button.save\")}} </template> </lyte-button> </lyte-popover-footer> </template> </lyte-popover> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[5]}],
_observedAttributes :["cxPropExistingTags","cxPropRecordTags","cxPropModule","inEditMode","addedCount","newlyCreatedTags","cxPropMaxTagLimit","cxPropSupportAjaxEdit","cxPropModuleName","componentUniqueId"],
_observedAttributesType :["array","array","string","boolean","number","array","number","boolean","string","string"],

	data : function(){
		return {
			cxPropExistingTags : Lyte.attr('array',{default : []}),
			cxPropRecordTags : Lyte.attr('array',{default : []}),
			cxPropModule : Lyte.attr('string'),
			inEditMode : Lyte.attr('boolean',{default:false}),
			addedCount : Lyte.attr('number',{default : 0}),
			newlyCreatedTags : Lyte.attr('array',{default : []}),
			cxPropMaxTagLimit : Lyte.attr('number'),
			cxPropSupportAjaxEdit : Lyte.attr('boolean',{default : true}),
			cxPropModuleName 	 : Lyte.attr('string'),
			componentUniqueId : Lyte.attr('string',{default : Math.floor(Math.random() * Date.now()).toString()})
		}		
	},
	init : function(){
		if(this.data.cxPropExistingTags){
			this.allAvailableTags = this.data.cxPropExistingTags.slice();
		}
		this.allAvailableTags = this.allAvailableTags ? this.allAvailableTags : [];
		if(this.data.cxPropRecordTags){
			Lyte.arrayUtils(this.allAvailableTags , 'push' , this.data.cxPropRecordTags.slice());
		}
	},
	actions : {
		openEditPopup : function(){	
			if(this.data.cxPropExistingTags){
				this.beforeEditExisting = this.getData('cxPropExistingTags').slice();
			}
			if(this.data.cxPropRecordTags){
				this.beforeEditRecordsTag = this.getData('cxPropRecordTags').slice();
			}
			this.setData('inEditMode',true);
		},
		hideAddTagPopup : function(){
			this.setData('inEditMode',false);
			this.setData({cxPropExistingTags : this.beforeEditExisting, newlyCreatedTags : [] , cxPropRecordTags : this.beforeEditRecordsTag});
		},
		saveTags : function(){
			if(this.getMethods('onTagSave')){
				var finalTags = this.executeMethod('onTagSave',this.data.cxPropExistingTags,this.data.newlyCreatedTags);
				this.setData({cxPropExistingTags : finalTags});
			}
			this.setData('inEditMode',false);
		}
	},
	methods : {
		validate_tags : function(tagName){
			var hasSplChar = this.validate_spl_char(tagName);
			if(!hasSplChar){
				this.setData('addedCount',this.data.addedCount+1);
			}
			return !hasSplChar;
		},
		addToRecordTags : function(tagName){
			var removedTag = this.allAvailableTags.filter(function (x) { return x.name === tagName });
			if(removedTag.length ){
				if(!this.getData('newlyCreatedTags').includes(removedTag[0])){
					Lyte.arrayUtils(this.getData('cxPropRecordTags'), 'push' , removedTag);
				}else{
					Lyte.arrayUtils(this.getData('newlyCreatedTags'), 'removeObjects' , removedTag);
				}
			}
			
		},
		open_pop :function(){
        	var alert_msg = document.querySelector('.alertPopup');//no i18n
        	if(alert_msg!=null){
        	    return false;
        	}
       	},
		addToallTags  : function(createdTag){
			var createdTagObj = this.data.cxPropExistingTags.filter(function (item) { return item.name === createdTag });
			Lyte.arrayUtils(this.getData('newlyCreatedTags') , 'push' , createdTagObj);
			Lyte.arrayUtils(this.allAvailableTags , 'push' , createdTagObj);
		}
	},
	validate_spl_char : function(tagname)
    {
    	var _splchar = false;
        if(tagname.match(/[/\\!@#$%^&*()[\].?":{}~`;'|]/) || tagname.indexOf("+")>-1 ||tagname.indexOf("-")>-1){
        	var taglen = tagname.length;
        	for(var i=0;i<taglen;i++){
				if(tagname[i].match(/[/\\!@#$%^&*()[\].?":{}~`;'|]/) || tagname[i] === "+" ||tagname[i] === "-"){
					_splchar = true;
				}else{
					_splchar = false;
				}
				if(!_splchar){
					break;
				}
			}           
            if(_splchar){
				document.querySelector("crux-tag").toggle("close")//no i18n
                _cruxUtils.showCustomAlert({params : {ltPropSecondaryMessage : 'Tag name should contain Alphanumeric characters.',ltPropContentAlign : "center"}});//no i18n
               return true;
            }
        }
        return false;
    }

});
