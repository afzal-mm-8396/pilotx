Lyte.Component.register("crux-page-builder-section", {
_template:"<template tag-name=\"crux-page-builder-section\"> <template is=\"if\" value=\"{{draggingState}}\"><template case=\"true\"> <div class=\"cxPbSectionOnDragHeading\">{{cxSection.display_label}}</div> </template></template> <div class=\"{{if(draggingState,'cxdN','')}}\"> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(cxSection.cxSectionActionHide)}}\"><template case=\"true\"><span class=\"cxPbElemSecActionIcons\"> <span id=\"sectionToolbar{{cxSectionId}}\" data-cx-builder-output=\"remove\" class=\"cxPbElemSecActionIconWrapper lytePbRejectDrag\"><i class=\"cxPbSprite cxPbSettingsIcon\"></i></span> <span class=\"cxPbElemSecActionIconWrapper {{if(cruxOr(xSection.actions_allowed.delete,allowedDelete),'','cxPbDisabled')}}\" lt-prop-title=\"{{sectionDeleteDisableTitle}}\" onclick=\"{{action('sectionDelete',this)}}\"><i class=\"cxPbSprite cxPbDeleteIcon\"></i></span> </span></template></template> </template></template> <div class=\"cxPbTitleSection\"> <crux-text-component class=\"lytePbRejectDrag\" cx-prop-enable-lbind=\"false\" cx-prop-value=\"{{cxSection.display_label}}\" cx-prop-from=\"{{if(cruxOr(isPreview,negate(cxSection.actions_allowed.rename)),'view','create')}}\" on-value-change=\"{{method('sectionLabelChange',this)}}\" cx-prop-error-on-hovercard=\"true\" cx-prop-id=\"subform_{{cxSection.id}}\" cx-prop-error-message=\"{{cxErrorMessage}}\" cx-prop-tooltip=\"\"></crux-text-component> <template is=\"if\" value=\"{{cxSection.cxInfoTitle}}\"><template case=\"true\"> <i class=\"cxPbSprite cxPbInfoIcon\" lt-prop-title=\"{{cxSection.cxInfoTitle}}\"></i> </template></template> </div> <div class=\"gridTemplateContainer\"></div> </div> <template is=\"if\" value=\"{{expHandlers(isPreview,'!')}}\"><template case=\"true\"> <lyte-menu data-cx-builder-output=\"remove\" lt-prop-yield=\"true\" lt-prop-event=\"click\" lt-prop-query=\"#sectionToolbar{{cxSectionId}}\" on-menu-click=\"{{method('onSectionSettingClicked')}}\" on-before-open=\"{{method('sectionSettingMenuBeforeOpen')}}\" on-before-close=\"{{method('sectionSettingsMenuClose')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body class=\"cxPbSectionSettingsMenuBody\"> <lyte-menu-group> <lyte-menu-header> {{cruxGetI18n('crm.mb.section.layout')}} </lyte-menu-header> <lyte-menu-item class=\"{{if(ifEquals(selectedColumnCount,'single_column_section'),'cxPbMenuSelected','')}}\" data-value=\"single_column_section\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbSingleColIcon cxPbSecSettingMenuIcon\"></span> {{cruxGetI18n('crm.custom.module.single.column')}}</lyte-menu-label> </lyte-menu-item> <lyte-menu-item class=\"{{if(ifEquals(selectedColumnCount,'double_column_section'),'cxPbMenuSelected','')}}\" data-value=\"double_column_section\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbDoubleColIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.custom.module.double.column')}}</lyte-menu-label> </lyte-menu-item> </lyte-menu-group> <lyte-menu-group> <lyte-menu-header> {{cruxGetI18n('crm.mb.tab.traversal')}} </lyte-menu-header> <lyte-menu-item class=\"{{if(cruxAnd(ifEquals(selectedTabTraversal,'left_right'),ifNotEquals(selectedColumnCount,'single_column_section')),'cxPbMenuSelected','')}}\" lt-prop-disabled=\"{{disableOrder}}\" data-value=\"left_right\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbLeftToRightIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.mb.left.right.traversal')}}</lyte-menu-label> </lyte-menu-item> <lyte-menu-item class=\"{{if(cruxAnd(ifEquals(selectedTabTraversal,'top_bottom'),ifNotEquals(selectedColumnCount,'single_column_section')),'cxPbMenuSelected','')}}\" lt-prop-disabled=\"{{disableOrder}}\" data-value=\"top_bottom\"> <lyte-menu-label class=\"cxFlexCenter\"><span class=\"cxPbSprite cxPbTopToBottomIcon cxPbSecSettingMenuIcon\"></span>{{cruxGetI18n('crm.mb.top.bottom.traversal')}}</lyte-menu-label> </lyte-menu-item> </lyte-menu-group> </lyte-menu-body> </template> </lyte-menu> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"componentDynamic","position":[3,3,1]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"text","position":[1,1,3,1,2]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"text","position":[1,1,5,1,1]},{"type":"componentDynamic","position":[1,1,5,1]},{"type":"componentDynamic","position":[1,1,5]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,1,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"text","position":[1,3,3,1,1]},{"type":"componentDynamic","position":[1,3,3,1]},{"type":"componentDynamic","position":[1,3,3]},{"type":"attr","position":[1,3,5]},{"type":"text","position":[1,3,5,1,1]},{"type":"componentDynamic","position":[1,3,5,1]},{"type":"componentDynamic","position":[1,3,5]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["cxPropId","cxPropType","cxSectionId","pageBuilderId","cxErrorMessage","cxPropSectionModelName","selectedColumnCount","cxSection","disableOrder","isPreview","allowedDelete","sectionDeleteDisableTitle","draggingState","lcData"],
_observedAttributesType :["string","string","string","string","string","string","string","object","boolean","boolean","boolean","string","boolean","object"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string'),
			cxPropType : Lyte.attr('string'),
			cxSectionId : Lyte.attr('string'),
			pageBuilderId : Lyte.attr('string'), 
			cxErrorMessage : Lyte.attr('string',{default : ''}),
			cxPropSectionModelName : Lyte.attr('string'), //no i18n
			selectedColumnCount : Lyte.attr('string'),
			cxSection :  Lyte.attr('object'),
			disableOrder :  Lyte.attr('boolean',{default : false}), //no i18n
			isPreview : Lyte.attr('boolean',{default : false}), //no i18n
			allowedDelete : Lyte.attr('boolean',{default : true}), //no i18n
			sectionDeleteDisableTitle : Lyte.attr('string',{default : ""}), //no i18n
			draggingState : Lyte.attr('boolean',{default : false}), //no i18n
			lcData : Lyte.attr('object')
		};
	},
	init : function(){
		Lyte.triggerEvent('cxPbAddedElement',{
			name : 'section',
			node : this.$node
		});
		this.$node.mandatoryArray = [];

		this.cruxPageBuilder = new CruxCommonBuilder(this.data.cxPropId);
		this.setData('cxSection',store.peekRecord('section',this.data.cxSectionId));
		this.cruxPageBuilder.updateSectionList('add',this.data.cxSection);
		this.setData("cxPropSectionModelName", this.cruxPageBuilder.cruxNode.component.data.cxPropSectionModelName);
		this.setData("isPreview", this.cruxPageBuilder.cruxNode.component.data.cxPropShowPreview);
		if(this.data.isPreview && this.data.cxSection && (this.data.cxSection.cxPropIsPreviewSupported === false || this.data.cxSection.fields.length === 0)){
			this.$node.remove();
		}
		this.$node.checkMandatory = function(field,mandatory){
			if(mandatory && this.mandatoryArray.indexOf(field) === -1){
				this.mandatoryArray.push(field);
			}else if(!mandatory){
				this.mandatoryArray.splice(this.mandatoryArray.indexOf(field),1);
			}
			if(this.mandatoryArray.length > 0){
				this.setData('allowedDelete',false);
				this.setData('sectionDeleteDisableTitle',_cruxUtils.getI18n('crm.section.remove.mandatoryfield.msg.v2'));
			}else{
				this.setData('allowedDelete',true);
				this.setData('sectionDeleteDisableTitle','');
			}
		};
		this.setData('lcData',this.$lc);
	},
	didDestroy : function(){
		delete this.cruxPageBuilder
		Lyte.removeEventListener(this.appendFieldToSection);
		Lyte.removeEventListener(this.sectionDeleteErrorEventId);
	}, 
	didConnect : function(){
		setTimeout(()=>{
			if(!this.data.cxSection.actions_allowed.reorder){
				this.$node.classList.add('lytePbRejectDrag');
			}
			if(!this.data.cxSection.actions_allowed.add_field){
				this.$node.classList.add('cxAvoidDrop');
			}

			if(this.data.cxSection.actions_allowed.rename && !this.data.isPreview){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				this.setTitleToInput(this.$node.querySelector('.cxPbTitleSection').querySelector('input'),this.data.cxSection.display_label);	
			} 
		},10);
		
		this.appendFieldToSection = Lyte.addEventListener("cxPbAppendFieldToSection",function(arg){
			if(this.data.cxSection.id === arg.section_id){
				var columns = this.$node.querySelectorAll('lyte-pb-column-template'),nodeId,columnToAppend,index;
				if(this.data.cxSection.column_count === 'double_column_section' && arg.sequenceNumber % 2 === 0){
					columnToAppend = columns[1];
					index = parseInt(arg.sequenceNumber/2)-1;
					nodeId = columns[1].getAttribute('node-id');
				}else{
					columnToAppend = columns[0];
					index = parseInt(arg.sequenceNumber/2);
					nodeId = columns[0].getAttribute('node-id');
				}
				
				this.$node.closest('lyte-page-builder').appendChildByNode(nodeId, columnToAppend, {outerHtml : {
						"node":"element",
						"tag":"crux-page-builder-element",
						"attr":{
							"data-type" : arg.field.data_type,
							"lyte-pb-static-column-span":1,
							"lyte-pb-static-type":"STATIC_ELEMENT",
							'lyte-pb-static-label' : 'Element',
							"class":" entity__item lytePbEntityItem",
							"cx-prop-type" : this.data.cxPropType,
							"cx-prop-id" : this.data.cxPropId,
							"cx-prop-field" : { id : arg.field.id}

						},
						"child":[],
						"title":"Element",
						"systemAttributes":""
					}}, index);
			}
		}.bind(this));
		this.sectionDeleteErrorEventId = Lyte.addEventListener("cxPbEventSectionDeleteError",function(arg){
			if(this.data.cxSection.id === arg.sectionId){
				if(arg.cxDeleteDisableTitle){
					this.setData('allowedDelete',false);
					this.setData('sectionDeleteDisableTitle',arg.cxDeleteDisableTitle);
				}else{
					this.setData('allowedDelete',true);
					this.setData('sectionDeleteDisableTitle',"");
				}
			}
		}.bind(this));
		var gridTemplate = this.$node.querySelector('lyte-pb-grid-template');
		if(gridTemplate){
			Lyte.Component.appendChild(this.$node.querySelector('.gridTemplateContainer'), gridTemplate);
		}else{
			// Lyte.Component.render('lyte-pb-grid-template',
			// 	{
			// 		lytePbStaticDrag : false,
			// 		lytePbStaticAddUtils : true,
			// 		lytePbStaticAddDefaultRow : true,
			// 		lytePbStaticColumn : 2,
			// 		lytePbStaticMessage : 'Drag and Drop',
			// 		lytePbStaticBasicProps :true,
			// 		lytePbStaticLayout : "moduleBuilderLayout",
			// 		lytePbStaticView : false,
			// 		pageBuilderId : this.data.pageBuilderId
			// 	},
			// 	this.$node.querySelector('.gridTemplateContainer'))
			this.$node.closest('lyte-page-builder').appendNodeInArtboard(this.$node.getAttribute('node-id'), 'appendChild', 'lyte-pb-grid-template', {outerHtml : {
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"false",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":2,
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true',
					"lyte-pb-static-layout" : "moduleBuilderLayout"
				}},
				"title":"",
				"systemAttributes":""
			}, undefined, this.$node.querySelector('.gridTemplateContainer'));
		}
	},
	actions : {
		newSectionClick : function(){
			Lyte.triggerEvent('cxPbAddElements',{
				name : 'section',
				node : this.$node
			});
		},
		sectionDelete : function(deleteBtn){
			if(deleteBtn.classList.contains('cxPbDisabled')){
				return;
			}
			var ch = true;
			if(this.getMethods('cxPbBeforeSectionDelete')){
				ch = this.executeMethod('cxPbBeforeSectionDelete',this.data.cxSection);
			}
			if(ch){
				Lyte.triggerEvent('cxPbDeleteElements',{
					name : 'section',
					node : this.$node
				});
			}
		}
	},
	methods : {
		sectionLabelChange : async function(comp,value){
			var errorMessage="";
   			this.$node.classList.remove('cxPbElementErrorDiv');
   			this.setData('cxErrorMessage',"");
   			if(!value){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.empt'); 
			}
			let regex = this.cruxPageBuilder.cruxNode.component.data.cxPropFieldLabelRegex || /[`~!#^*[\]{}\\"';:]/g;
			if(new RegExp(regex).test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.splc');
			}else if(new RegExp("^leadid$|^contactid$|^accountid$|^potentialid$|^activityid$|^productid$|^quoteid$|^salesorderid$|^purchaseorderid$|^invoiceid$|^campaignid$|^vendorid$|^bookid$|^caseid$|^solutionid$|^forecastid$|^visitid$|^callid$|^taskid$|^eventid$|^notesid$|^attachmentsid$|^custommodule([0-9]{1,2})_id$|^linkingmodule_id$|^layout$|^tags$|^tag$|^currency$|^exchange rate$|^tagged time$|^tagged by$|^score$|^positive score$|^negative score$|^touch point score$|^positive touch point score$|^negative touch point score$|^lead score$|^reporting to$|^data processing basis$|^data processing basis details$|^wizard$|^data source$|^services$|^appointments$|^duration \\(days\\)$|^duration \\(time\\)$|^stage duration \\(time\\)$|^stage duration \\(calendar days\\)$|^id$|^is converted$|^record status$|^record id$|^lead conversion time$|^lead conversion duration$|^tasks$|^events$|^meetings$|^calls$|^tasks history$|^calls history$|^events history$|^wizard path$|^wizard_path$|^change log time$|^appointments history$|^open appointments$|^locking information$|^locked$|^first follow-up by$|^first follow-up time$|^number of follow-ups$|^last follow-up by$|^last follow-up time$|^notes$|^record creation source id$|^moved to$|^voice of the customer$|^distance$|^zoho survey$|^connected to$|^last modified source$|^connected records$|^last activity time$|^deal team$|^connected record child$|^connected_record_child$|^job[^0-9|a-z|a-z]+sheets$|^rescheduled[^0-9|a-z|a-z]+history$|^services[^0-9|a-z|a-z]+x[^0-9|a-z|a-z]+users$|^bundles$|^bundle$|^days visited$|^average time spent \\(minutes\\)$|^number of chats$|^last visited time$|^first visited time$|^first visited url$|^referrer$|^visitor score$|^gclid$|^zcampaignid$|^adgroupid$|^adid$|^keywordid$|^keyword$|^click type$|^device type$|^ad network$|^search partner network$|^gad region$|^gad country$|^searchword$|^ad campaign name$|^adgroup name$|^ad$|^gadconfigid$|^ad click date$|^cost per click$|^cost per conversion$|^territories$|^salutation$|^converted account$|^converted contact$|^converted deal$|^converted potential$|^title$|^campaign source$|^chronologicalview$|^chronologicalview history$|^distance$|^entity creation source$|^reason for validation error$|^spam possibility$|^awaiting status$|^record source$|^submission ip address$|^lead name$").test(value)){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.sykw');
			} 

			let field_labels = this.cruxPageBuilder.cruxNode.component.section_field_list || [];
			let existing_label = field_labels.some(
			  label => label.toLowerCase() === value.toLowerCase()
			);
			if(existing_label && value.toLowerCase() !== this.data.cxSection.display_label.toLowerCase()){
				errorMessage = _cruxUtils.getI18n('crm.mb.section.label.dplk');
			}
			if(errorMessage){
				this.setData('cxErrorMessage',errorMessage);
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id,errorMessage);
				return;
			}
			var ch = true;
			if(this.cruxPageBuilder.getMethods('cxPbBeforePropertyChange')){
				ch = this.cruxPageBuilder.executeMethod('cxPbBeforePropertyChange',this.data.cxSection,'display_label',value,this.data.cxSection.display_label);
				if(ch &&  typeof ch.then === "function"){
					ch = await ch;
				}
				if((typeof ch === 'object' && ch.type === 'error')){
					this.setData('cxErrorMessage',ch.message);
					this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id,ch.message);
					return;
				}
			}
			if(ch){
				this.cruxPageBuilder.cruxNode.component.setError(this.data.cxSection.id);
				this.data.cxSection.$.set('display_label',value);
				if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
					this.cruxPageBuilder.executeMethod('cxPbPropertyChange',this.data.cxSection,'display_label',value);
				}
				this.setTitleToInput(comp.querySelector('input'),value);
			}
		},
		sectionSettingMenuBeforeOpen : function(){
			this.$node.classList.add('cxPbElementActiveSection');
			var section = this.data.cxSection;
			if(section){
				this.setData({selectedColumnCount : section.column_count,selectedTabTraversal : section.tab_traversal});
				if(section.column_count ===  "single_column_section"){
					this.setData("disableOrder", true);
					this.$node.classList.add('cxPbSingleColElemSection');
				}else{
					this.setData("disableOrder", false);
				}
			}
		},
		sectionSettingsMenuClose : function(){
			this.$node.classList.remove('cxPbElementActiveSection');
		},
		onSectionSettingClicked : function(column_value){
			var section = this.data.cxSection;
			if(section){
				if(column_value === 'single_column_section' || column_value === 'double_column_section'){
					section.$.set('column_count', column_value);
					this.setData('selectedColumnCount',column_value);
					if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
						this.cruxPageBuilder.executeMethod('cxPbPropertyChange',section,'column_count',column_value);
					}
					if(column_value ===  "single_column_section"){
						this.setData("disableOrder", true);
						this.$node.classList.add('cxPbSingleColElemSection');
					}else{
						this.setData("disableOrder", false);
					}
					this.$node.querySelector('lyte-pb-grid-template').component.setData('lytePbStaticColumns',column_value === 'single_column_section' ? '1' : '2');
				}else{
					section.$.set('tab_traversal', column_value);
					this.setData('selectedTabTraversal',column_value);
					if(this.cruxPageBuilder.getMethods('cxPbPropertyChange')){
						this.cruxPageBuilder.executeMethod('cxPbPropertyChange',section,'tab_traversal',column_value);
					}
				}
				
			}	
		},
		searchSubformPanelField : function(result){
			this.setData('noFieldsFound',result.length === 0);
		}
	},
	observeLcData : function(){
		this.setData('draggingState',this.$lc.draggingState);
		if(this.data.draggingState){
			this.$node.classList.add('cxPbElemSecOnDrag');
		}else{
			this.$node.classList.remove('cxPbElemSecOnDrag');
		}
	}.observes('lcData.draggingState')
},{mixins : ['crux-page-builder-mixin']});
