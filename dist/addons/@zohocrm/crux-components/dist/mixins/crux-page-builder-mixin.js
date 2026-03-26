Lyte.Mixin.register("crux-page-builder-mixin", {
	setTitleToInput : function(input,value){
		if(input){
			$L.fastdom.measure(()=>{
				var set = false;
				if(input.scrollWidth > input.clientWidth){
					set = true;
				}
				$L.fastdom.mutate(()=>{
					input.closest('lyte-input').setAttribute('lt-prop-title',set ? value : "");
				});
			});
		}
		
	}
});


if(typeof CruxPageBuilder === 'undefined'){
	CruxPageBuilder = {}; //eslint-disable-line @zoho/webperf/no-global-variables
}

CruxPageBuilder.templateJSONConvertFunction = function(sectionArray,type = 'standard',options ={}){
	if(!options.cxPropId){
		var a = 1;
		while($L('.cxPbUniqueClass'+a).length > 0){ //eslint-disable-line @zoho/zstandard/proper-usage-of-loop
			a++;
		}
		options.cxPropId = a;
	}
	var fieldConvertFunction = function(fields,section){
		var rows = [],r = 0,ret = [];
		rows[r] = {};
		var columns = section.column_count ? section.column_count === 'single_column_section' ? 1 : 2 :  2;
		var fieldLen = fields.length;
		for(var i=0;i<fieldLen;i++){
			var ind = parseInt(fields[i].sequence_number) % columns;
			if(!rows[r][ind]){
				rows[r][ind] = [];
			}
			rows[r][ind].push(fields[i]);
		}
		rows.forEach(function(item){
			var col = [];
			var inv = Object.values(item).reverse();

			inv.forEach(function(co,coind){
				var emp = [];
				co.forEach(function(field){
					if(field.address){
						return;
					}
					emp.push({
						"node":"element",
						"tag":"crux-page-builder-element",
						"attr":{
							"data-type" : field instanceof Record ? field.$.toJSON()['data_type'] : field.data_type,
							"lyte-pb-static-column-span":1,
							"lyte-pb-static-type":"STATIC_ELEMENT",
							'lyte-pb-static-label' : 'Element',
							"class":" entity__item lytePbEntityItem",
							"cx-prop-type" : type,
							"cx-prop-id" : options.cxPropId,
							"cx-prop-field" : JSON.stringify({id : field.id})

						},
						"child":[],
						"title":"Element",
						"systemAttributes":""
					});
				});
				col.push({
					"node":"element",
					"tag":"lyte-pb-column-template",
					"attr":{
						"class":"lytePbColumnItem",
						"lyte-pb-static-drop":"true",
						"lyte-pb-static-add-element":"false",
						"lyte-pb-static-column-span":1,
						"lyte-pb-static-column-start":coind,
						"data-zcqa" : "cxPbQcColumnZcqa"
					},
					"child":emp,
					"title":"",
					"systemAttributes":""
				});
			});


			ret.push({
				"node":"element",
				"tag":"lyte-pb-row-template",
				"attr":{
					"lyte-pb-static-ratio":columns === 2 ? "1:1" : "1",
					"lyte-pb-static-columns":columns,
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-option":"grid",
					// "lyte-pb-static-view":"false",
					'lyte-pb-static-basic-props' : 'true',
					"data-zcqa" : "cxPbQcRowZcqa"
				},
				"child":col,
				"title":"",
				"systemAttributes":""
			});

			
		});
		return ret;
	};
	var sectionConvertFunction = function(section){
		var output;
		if(options.cxSectionJsonUpdateCallback){
			var out = options.cxSectionJsonUpdateCallback(section);
			if(typeof out === 'object'){
				return out;
			}
		}
		if(section.api_name === 'Record_Image'){
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-record-image',title : "RecordImage"};
			output.attr = {class : 'cxPbElementSection','cx-section-id' : section.id,'cx-prop-section-id' : section.id, 'cx-prevent-new-section-creation' : options.cxPreventNewSectionCreation, 'lyte-pb-static-label' : 'Section',"lyte-pb-static-drag":"false","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];
		}else if(section.subform){
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-subform',title : "Subform"};
			output.attr = {class : 'cxPbElementSection','cx-section-id' : section.id,'cx-prop-section-id' : section.id, 'cx-prevent-new-section-creation' : options.cxPreventNewSectionCreation, 'lyte-pb-static-label' : 'Subform',"lyte-pb-static-drag":"true","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];
		}else{
			output = {node : 'element',systemAttributes : '',tag : 'crux-page-builder-section',title : "Section"};
			let sec_class = section.column_count === 'single_column_section' ? 'cxPbElementSection cxPbSingleColElemSection': 'cxPbElementSection';
			output.attr = {class : sec_class,'cx-section-id' : section.id,'lyte-pb-static-label' : 'Section',"lyte-pb-static-drag":"true","cx-prop-id" : options.cxPropId,"cx-prop-type":type};
			output.child = [];

			var columns = section.column_count ? section.column_count === 'single_column_section' ? 1 : 2 :  2;

			output.child.push({
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"false",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":columns,
					// "lyte-pb-static-view":"false",
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true',
					"lyte-pb-static-layout" : "moduleBuilderLayout"
				},
				child : fieldConvertFunction(section.section_field,section)
				,
				"title":"",
				"systemAttributes":""
			});
			// if(!options.cxPreventNewSectionCreation){
			// 	output.child.push({
			// 		"node":"element",
			// 		"tag":"span",
			// 		"attr":{
			// 			"class":"cxPbNewSectionBtn lytePbRejectDrag"
			// 		},
			// 		"child":[
			// 		{
			// 			"node":"element",
			// 			"tag":"span",
			// 			"attr":{
			// 				"class":"cxPbSprite cxPbPlusIcon"
			// 			},
			// 			"child":[],
			// 			"title":"",
			// 			"systemAttributes":""
			// 		},{
			// 			"node":"text",
			// 			"text":_cruxUtils.getI18n('crm.event.layout.new.section'),
			// 			"title":""
			// 		}],
			// 		"title":"",
			// 		"systemAttributes":""
			// 	});
			// }
		}
		return output;
	};


	var output = { node : 'root'};
	output.child = [];
	if(type === 'standard'){
		sectionArray.forEach((section)=>{
			output.child.push(sectionConvertFunction(section));
		});
	}else if(type === 'quickcreate'){ 
		var qcnode = {node : 'element',systemAttributes : '',tag : 'div'};
		qcnode.attr = {class : 'cxPbQuickCreateSection lytePbRejectDrag',"lyte-pb-static-label" : 'DummyDiv'};
		qcnode.child = [];
		// var childArray = []
		// sectionArray.section_field.forEach((fieldItem)=>{
		// 	childArray.push({
		// 		"node":"element",
		// 		"tag":"crux-page-builder-element",
		// 		"attr":{
		// 			"cx-mapping":"phone",
		// 			"data-type" : fieldItem instanceof Record ? fieldItem.$.toJSON()['data_type'] : fieldItem.data_type,
		// 			"lyte-pb-static-column-span":1,
		// 			"lyte-pb-static-type":"STATIC_ELEMENT",
		// 			'lyte-pb-static-label' : 'Element',
		// 			"class":" entity__item lytePbEntityItem",
		// 			"cx-prop-type" : type,
		// 			"cx-prop-id" : options.cxPropId,
		// 			"cx-prop-field" : JSON.stringify({id : fieldItem.id})

		// 		},
		// 		"child":[],
		// 		"title":"Element",
		// 		"systemAttributes":""
		// 	})
		// })
		// qcnode.child=childArray
		qcnode.child=
			[{
				"node":"element",
				"tag":"lyte-pb-grid-template",
				"attr":{
					"lyte-pb-static-drag":"false",
					"lyte-pb-static-add-utils":"true",
					"lyte-pb-static-add-default-row":"false",
					"lyte-pb-static-columns":"1",
					// "lyte-pb-static-view":"false",
					"lyte-pb-static-message":"Drag and Drop",
					'lyte-pb-static-basic-props' : 'true'
				},
				child : fieldConvertFunction(sectionArray.section_field,sectionArray)
				,
				"title":"",
				"systemAttributes":""
			}];
		output.child.push(qcnode);
	}
	return output;
};

//eslint-disable-next-line @zoho/zohocrm/no-unused-vars
class CruxCommonBuilder{ //eslint-disable-line no-unused-vars
	constructor(id){
		this.cruxNode = this['cruxNode'+id];
	}
	updateFieldList(opt,label){
		this.cruxNode.component.updateFieldList(opt,label);
	}
	updateSectionList(opt,label){
		this.cruxNode.component.updateSectionList(opt,label);
	}
	getData(dataName){
		return this.cruxNode.getData(dataName);
	}
	getMethods(methodName){
		return this.cruxNode.getMethods(methodName);
	}

	executeMethod(){
		return this.cruxNode.component.executeMethod.apply(this.cruxNode.component,arguments);
		// return
	}
}

