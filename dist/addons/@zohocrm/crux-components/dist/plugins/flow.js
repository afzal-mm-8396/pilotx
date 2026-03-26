/* 
 * FlowUp
 *
 * Based on Eric Wenn's PullupScroll https://github.com/ericwenn/pullupscroll)
 * Changes include: 
 * - custom namespace for functions
 * - Not dependent on "$" jquery namespace
 * - Works better on items stacked on top of each other in chrome (does not flicker)
 * - Added some custom options including durations and y-displacement
 * - Added ability to control plugin via external CSS instead appending <head>
 * 
 */

/**
 * It is a plugin used to bring a flow like animation during scroll.
 * @plugin flowUp
 * @author anuja.manoharan
 * @version 1.0.0
 * @param {string} The querySelector that finds the children for which the flowUp plugin is to be associated with.
 * @param {object} To be passed if one wants to overwrite the default settings, wherein translateY is 150px, duration is 0.8 and externalCSS is false.
 */
  $L.prototype.extend({
    flowUp : function(e, options){
    	var settings = $L.extend({
    		translateY : "150px",//No I18n
    		duration : 0.8,
    		externalCSS : false
    	}, options);
    	var ele = this.find(e);
      var parent = this[0];
    	ele.each(function(index, el){
    		el.classList.add("pullup-element");//No I18n
    		if(cruxFlowup.visible(parent,el)){
    			el.classList.add("already-visible");//No I18n
    		}
    	});
    	if(!settings.externalCSS){
    		var style = document.createElement("style");
    		style.innerText = '.come-in{-ie-transform:translateY('+settings.translateY+');-webkit-transform:translateY('+settings.translateY+');transform:translateY('+settings.translateY+');-webkit-animation:come-in '+settings.duration+'s ease forwards;animation:come-in '+settings.duration+'s ease forwards}.come-in:n-th child(odd){-webkit-animation-duration:.6s;animation-duration:.6s}.already-visible{-ie-transform:translateY(0);-webkite-transform:translateY(0);transform:translateY(0);-webkit-animation:none;animation:none;}@-webkit-keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}}';//No I18n
    		$L("head")[0].append(style);
    	}
      this[0].addEventListener("scroll", function(){
        var ele = document.querySelectorAll(".pullup-element");//No I18n
        ele.forEach(function(el){
          if(el.classList.contains("come-in") || el.classList.contains("already-visible")){
            return;
          }
          if(cruxFlowup.visible(parent, el)){
            el.classList.add("come-in");//No I18n
          }
          else{
            return false;
          }
        });
      });
    	return this;
    }
  });


  var cruxFlowup = {
	  /**
	   * function to check if element is visible after scroll
	   */
  	visible : function(parent, ele){
  		var viewTop = $L(parent).scrollTop();
		var viewBottom = viewTop + parent.offsetHeight;
		var top = ele.getBoundingClientRect().top;
		var bottom = top+ele.offsetHeight;
		return ((top <=viewBottom) && (bottom >= viewTop));
  	}
  }
