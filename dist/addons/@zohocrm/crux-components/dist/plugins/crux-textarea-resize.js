/**
 * It is a plugin written so that non-crux textarea components (lyte-input or textarea) can follow the UI guidelines we follow for it.
 * @plugin cruxTextareaBindResize
 * @author anuja.manoharan
 * @version 1.0.0
 * @param {object} op It primarily contains a height that determines the default height of the textarea. 71px is the default height
 */
$L.prototype.extend({
	cruxTextareaBindResize : function(op){
		var self = this[0];
		if(!self.getData("ltPropDisabled") && !self.getData("ltPropReadonly")){
			self.setMethods({
				onResizeEnd : function(){
					self.cxResized = true;
				}
			})
			Lyte.Component.addLyteEventListener(self, "click", increaseHeight);
			Lyte.Component.addLyteEventListener(self, "keyup", function(ev){
				if((ev && ev.key != "Tab") || !ev){
					increaseHeight();
				}
			});
			function increaseHeight(){
				if(self.cxResized){
					return false;
				}
				var height = (op && op.height) ? op.height.split("px")[0] : 71;
				self.querySelector("textarea").style.height = height+"px";
				(self.getData("ltPropDirection") == "vertical" && self.querySelector(".lyteLabel")) ? height+=self.querySelector(".lyteLabel").offsetHeight : "";
				self.style.height = (height+2)+"px";
			}
			self.getData("ltPropValue") ? increaseHeight() : "";
			self.ltProp("textAreaResize", {vertical : true, horizontal : false});
		}
	}
 })
