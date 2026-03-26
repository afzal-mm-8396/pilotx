//$Id$
Lyte.Component.register("crux-pattern-editor", {
_template:"<template tag-name=\"crux-pattern-editor\"> <crux-criteria-pattern class=\"prevent\" pattern-node=\"{{editPatternNode}}\" pattern-array=\"{{cxPropPatternArray}}\"></crux-criteria-pattern> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["cxPropPattern","cxPropPatternArray","editPatternNode"],
_observedAttributesType :["string","array","object"],
 //No I18N
	data : function(){
		return {
			cxPropPattern : Lyte.attr('string'), //No I18N
			cxPropPatternArray : Lyte.attr('array'), //No I18N
			editPatternNode : Lyte.attr('object') //No I18N
		}		
	},
	init : function(){
		this.$node.getPattern = function(){
			return this.component.getPattern()
		}
		this.$node.clearPattern = function(){
			return this.component.data.bufferPattern;
		}
		this.setData('bufferPattern',this.data.cxPropPattern); //No I18N
		var patternNode = this.formCriteriaTree(this.data.cxPropPattern);
		_cruxUtils.addMurhyInfo("crux-pattern-editor.js", "Feb Default Changes");
		this.setData('editPatternNode',patternNode); //No I18N
	},
	didConnect : function(){
		this.sortableEditPattern();
	},
	getPattern : function(patternNode){
		var criteria = patternNode ? patternNode : JSON.parse(JSON.stringify(this.data.editPatternNode));
		var pattern = this.convertGroupToString(criteria);
		var selfVal = this;
		if(selfVal.data.cxPropPatternArray){
			pattern = pattern.replace(/\d{1,2}/g,function(match){
				return selfVal.data.cxPropPatternArray[match-1];
			});
		}
		return pattern;
	},
	sortableEditPattern : function(){
		var selfVal = this;
		$L('.cxGroupPattern',this.$node).sortable({ //NO I18N
			connectedWith : '.cxGroupPattern',//No I18N
			restrict : '.prevent', //NO I18N
 			onBeforeDrop  : function (droppableElement ,belowElement ,placeholderElement ,fromIndex ,toIndex ,source ,destination ){  
 				$L(selfVal.$node).find('.criteriaHide').removeClass('criteriaHide');//No I18N
 				if(belowElement.classList.contains('cxCritPtnNum')){
					var fromCriteria = droppableElement.getAttribute('data-value');
					var toCriteria = belowElement.getAttribute('data-value');
					var node = selfVal.removeCriteriaFromTree(selfVal.data.editPatternNode,fromCriteria);
					var finalNode = selfVal.addCriteriaToTree(node,toCriteria,fromCriteria);
					selfVal.setData('editPatternNode',finalNode);//No I18N
					selfVal.sortableEditPattern();
 				}else if(belowElement.classList.contains('criteriaCondition')){//No I18N
 					var fromCriteria = droppableElement.getAttribute('data-value')
 					var toCriteria = belowElement.parentElement.parentElement.component.data.patternNode;
		_cruxUtils.addMurhyInfo("crux-pattern-editor.js", "Feb Default Changes");
 					var node = selfVal.removeCriteriaFromTree(selfVal.data.editPatternNode,fromCriteria);
					var finalNode = selfVal.addCriteriaToTree(node,toCriteria,fromCriteria);
					selfVal.setData('editPatternNode',finalNode);//No I18N
					selfVal.sortableEditPattern();
 				}else{
 					droppableElement.classList.remove('wrongPlace');//No I18N
 				}
 				droppableElement.classList.remove('cxCursorGrab');//No I18N
 				$L(selfVal.$node).find('.cxCritSortBottomElem').removeClass('cxCritSortBottomElem');//No I18N
 				return false;
			},
			onSelect  : function(currentElem,index) { 
				return !(currentElem.classList.contains('prevent') || currentElem.classList.contains('criteriaCondition')) //NO I18N
			},
			onDragStart  : function(draggableElement,source) { 
				draggableElement.classList.add('cxCursorGrab');//No I18N
				draggableElement.previousElementSibling.classList.contains('criteriaCondition') ? draggableElement.previousElementSibling.classList.add('criteriaHide') : draggableElement.nextElementSibling.nodeName == 'TEMPLATE' ? draggableElement.nextElementSibling.nextElementSibling.classList.add('criteriaHide') : draggableElement.nextElementSibling.classList.add('criteriaHide');//No I18N
		 	},
		 	onDrag : function(draggableElement,belowElement){
		 		var a=selfVal.$node.querySelector('.cxCritSortBottomElem') //NO I18N
		 		var hoverCard = selfVal.$node.querySelector('lyte-hovercard') //no i18n
		 		var duplicatePattern = Lyte.deepCopyObject(selfVal.data.editPatternNode);
		 		if(belowElement){
		 			if(belowElement.classList.contains('cxCritPtnNum')){ 
		 				if(a != belowElement){
							belowElement.classList.add('cxCritSortBottomElem') //NO I18N
							if(a){
				 				a.classList.remove('cxCritSortBottomElem') //NO I18N
				 			}
		 				}
		 				draggableElement.classList.remove('wrongPlace')//No I18N
			 		}else if(belowElement.classList.contains('criteriaCondition')){//No I18N
			 			if(a != belowElement.parentElement){
							belowElement.parentElement.classList.add('cxCritSortBottomElem') //NO I18N
							if(a){
				 				a.classList.remove('cxCritSortBottomElem') //NO I18N
				 			}
		 				}
		 				draggableElement.classList.remove('wrongPlace')//No I18N
			 		}else{
			 			if(a){
			 				a.classList.remove('cxCritSortBottomElem') //NO I18N
			 			}
			 			draggableElement.classList.add('wrongPlace')//No I18N
			 		}
		 		}else{
		 			if(a){
			 				a.classList.remove('cxCritSortBottomElem') //NO I18N
			 			}
			 			draggableElement.classList.add('wrongPlace')//No I18N
		 		}
		 	}
		})
	},
	addCriteriaToTree : function(tree,toCriteria,fromCriteria){
		if(tree.group_operator && JSON.stringify(tree) != JSON.stringify(toCriteria)){
			if(tree.group[0].group_operator && tree.group[0] != toCriteria){
				Lyte.arrayUtils(tree.group,'replaceAt',0 ,this.addCriteriaToTree(tree.group[0],toCriteria,fromCriteria));
			}else if(tree.group[0] == toCriteria){
				var group=[];
				if(fromCriteria > toCriteria){
					group[0] = toCriteria;
					group[1]= fromCriteria
				}else{
					group[1] = toCriteria;
					group[0]= fromCriteria
				}
				Lyte.arrayUtils(tree.group,'replaceAt',0 ,{group_operator : 'and', group : group});//No I18N
			}
			if(tree.group[1].group_operator && tree.group[1] != toCriteria){
				Lyte.arrayUtils(tree.group,'replaceAt',1,this.addCriteriaToTree(tree.group[1],toCriteria,fromCriteria));
			}else if(tree.group[1] == toCriteria){
				var group=[];
				if(fromCriteria > toCriteria){
					group[0] = toCriteria;
					group[1]= fromCriteria
				}else{
					group[1] = toCriteria;
					group[0]= fromCriteria
				}
				Lyte.arrayUtils(tree.group,'replaceAt',1 ,{group_operator : 'and', group : group});//No I18N
			}
		}else if(JSON.stringify(tree) == JSON.stringify(toCriteria)){
			var tree= {};
			var group=[]
			group[0] = toCriteria;
			group[1] = fromCriteria;
			Lyte.Component.set(tree,'group_operator','and');//No I18N
			Lyte.Component.set(tree,'group',group);//No I18N
		}else{
			var tree= {};
			var group=[]
			group[0] = toCriteria;
			group[1] = fromCriteria;
			Lyte.Component.set(tree,'group_operator','and');//No I18N
			Lyte.Component.set(tree,'group',group);//No I18N
		}
		return tree;
	}
},{"mixins" : ["crux-criteria-util"]}); //No I18N

Lyte.Component.registerHelper('getNodeValue',function(array,node){ //No I18N
	if(node){
		return array ? array[node-1] : node;
	}
	return "";
});
