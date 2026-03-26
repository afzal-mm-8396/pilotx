Lyte.Component.register("crux-page-builder-section-navigator", {
_template:"<template tag-name=\"crux-page-builder-section-navigator\"> <template is=\"if\" value=\"{{expHandlers(sectionNavigatorData.length,'>',0)}}\"><template case=\"true\"><div class=\"cxPbSectionNavWrapper\"> <lyte-navigator on-next=\"{{method('next')}}\" on-previous=\"{{method('previous')}}\" lt-prop-yield=\"true\" lt-prop-value=\"{{lbind(startIndex)}}\" lt-prop-records=\"{{sectionNavigatorData.length}}\" lt-prop-perpage=\"1\"> <template is=\"registerYield\" yield-name=\"navigatorYield\"> <span class=\"cxPbSecNavIconWrap lyteNavigator lyteSingleBack\"> <i class=\" cxPbSprite cxPbUpArrowIcon\"></i> </span> <span lt-prop-title=\"Navigate To\" class=\"cxPbSecNavCount\" id=\"cxPbSectionNavigator_{{cxPropId}}\">{{startRecNum}}</span> <span class=\"cxPbSecNavIconWrap lyteNavigator lyteSingleFront\"> <i class=\"cxPbSprite cxPbDownArrowIcon\"></i> </span> </template> </lyte-navigator> </div></template></template> <lyte-menu lt-prop-yield=\"true\" lt-prop-content=\"{{sectionNavigatorData}}\" on-menu-click=\"{{method('onSectionNavMenuClick')}}\" lt-prop-query=\"#cxPbSectionNavigator_{{cxPropId}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"fieldallPermissions\"> <lyte-menu-header>Navigate To</lyte-menu-header> <template is=\"for\" items=\"{{sectionNavigatorData}}\" item=\"item\" index=\"index\"> <lyte-menu-item class=\"cxFlex cxAlignItemCenter\" data-value=\"{{item.id}}\"> {{item.display_label}} </lyte-menu-item> </template> </lyte-menu-body> </template> </lyte-menu> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[3]},{"type":"text","position":[3,0]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["sectionNavigatorData","startIndex","startRecNum","cxPropId"],
_observedAttributesType :["array","number","number","string"],

	data : function(){
		return {
			sectionNavigatorData:Lyte.attr('array',{default:[]}),
			startIndex : Lyte.attr('number', {default : 0}), //No I18N
			startRecNum : Lyte.attr('number', {default : 1}), //No I18N
			cxPropId : Lyte.attr('string') //No I18N
		};	
	},
	methods : {
		// Functions which can be used as callback in the component.
		onSectionNavMenuClick:function(id){
			this.isNavScrolling = true;
			const sectionDiv = $L(`[cx-section-id='${id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
			this.scrollToElemSection(sectionDiv);
			this.setData("startRecNum" , Number(this.data.sectionNavigatorData.cruxFilterBy({"id" : id})[0].sequence_number));
			this.setData("startIndex", this.data.startRecNum - 1);
		},
		next : function(value){
			this.isNavScrolling = true;
			let data = this.data.sectionNavigatorData[value];
			this.setData({"startRecNum" :this.data.startRecNum + 1, "startIndex": this.data.startIndex + 1});
			if(data){
				const sectionDiv =  $L(`[cx-section-id='${data.id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
				this.scrollToElemSection(sectionDiv);
			}
		},
		previous : function(value){
			this.isNavScrolling = true;
			let data = this.data.sectionNavigatorData[value];
			this.setData({"startRecNum" :this.data.startRecNum - 1, "startIndex": this.data.startIndex - 1});
			if(data){
				const sectionDiv =  $L(`[cx-section-id='${data.id}']`)[0]; //eslint-disable-line @zoho/webperf/no-attribute-selectors
				this.scrollToElemSection(sectionDiv);
			}
			
		}
	},
	scrollToElemSection:function(sectionDiv){
		sectionDiv.closest('.cxPbDropAreaContainer').scrollTop = sectionDiv.offsetTop - 35;
		// let titleSection = sectionDiv.querySelector('.cxPbTitleSection');
		// titleSection = (titleSection === null && sectionDiv.getData("cxPropSection").api_name ==="Record_Image") ?  sectionDiv.querySelector('.cxPbImgSecTitle') : titleSection ; 
		sectionDiv.classList.add('cxPbSectionHighlight');
		setTimeout(() => {
			sectionDiv.classList.remove('cxPbSectionHighlight');
			this.isNavScrolling = false;
		}, 2000);	
	},
	observeSectionData : function(){
		if(this.data.startRecNum  > this.data.sectionNavigatorData.length){
			this.setData({"startRecNum" : this.data.sectionNavigatorData.length, "startIndex": this.data.startIndex - 1});
		}
		this.setData('sectionNavigatorData',this.data.sectionNavigatorData.sort((a,b)=>{
			if (parseInt(a.sequence_number) < parseInt(b.sequence_number)){
				return -1;
			}
			if (parseInt(a.sequence_number) > parseInt(b.sequence_number)){
				return 1;
			}
			return 0;
		}));
	}.observes('sectionNavigatorData.[]','sectionNavigatorData')
});
