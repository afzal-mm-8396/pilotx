Lyte.Component.register("lyte-scheduler-event-tag", {
_template:"<template tag-name=\"lyte-scheduler-event-tag\"> <lyte-yield yield-name=\"scheduler-event-badge\"> </lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropEvent"],
_observedAttributesType :["object"],

    data : function(){
        return {
            'ltPropEvent' : Lyte.attr('object',{default: {}})
        }       
    },
    isinBetween : function( curr_date, divPostion, endDate, scheduler ){
        var eventManipulator = new _lyteUiUtils.eventManipulator( scheduler.getData('ltPropFormat') );
        return eventManipulator.isinBetween(curr_date, divPostion, endDate, scheduler.getData('ltPropFormat'));
    },
    didDestroy : function(){
        if(this.fastdomMeasure){
            $L.fastdom.clear(this.fastdomMeasure);
            delete this.fastdomMeasure;
        }
        if(this.fastdomMutate){
            $L.fastdom.clear(this.fastdomMutate);
            delete this.fastdomMutate;
        }
    },
    didConnect: function () {
        var scheduler  =  $L(this.$node).closest('lyte-scheduler')[0].component;
        var view = scheduler.getData('ltPropSchedulerView');
        var isMultiView = scheduler.getData('ltPropMultiUserView');
        var isUserBased = scheduler.getData('ltPropUserBasedView');
        if( !scheduler.getData('hasEventHeight') && ( (!isMultiView && view =='month') || (isMultiView && view =='week') ) ){
            var height = this.$node.getBoundingClientRect().height;
            var marginTop = parseInt(window.getComputedStyle(this.$node).marginTop);
            var wrapper = scheduler.$node.querySelector('.lyteSchedulerViewWrapper');
            wrapper.style.setProperty('--lyte-scheduler-event-height',height);
            wrapper.style.setProperty('--lyte-scheduler-event-marginTop',marginTop);
            scheduler.setData('hasEventHeight',true);
        }
        if((isMultiView && view =='month') || (isMultiView && isUserBased  && view == 'week')){
            return;
        }
        var eventData = this.getData('ltPropEvent');
        var format = scheduler.getData('ltPropFormat');
        var startDate = $L.moment(eventData.start, format);
        var event_tag  = this.$node;
        var startDiv =  $L(event_tag).closest('.scheduler-event-div')[0];
        this.$node.dataset.date = startDate.format('DD-MM-YYYY HH:mm');
        var isUserBased = scheduler.getData('ltPropUserBasedView');
        if(eventData.allDayEvent || (view == 'month')){
            this.$node.classList.add('lyteSchedulerAllDayEventTag');
        }
        if(startDiv){
            var curr_date = $L.moment(startDiv.dataset.date,'DD-MM-YYYY');
        }
        if(eventData.participantEvent){
            this.$node.classList.add('lyteSchedulerParticipantEvent')
        }
        var _this = this;
        if( !isMultiView || (view == 'day' && isUserBased && isMultiView) ){
            _this.$node.style.position ='absolute';
            if( eventData.allDayEvent || view === 'month' ){
                _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
            }else{
                _this.fixTimeLineEvent(eventData,startDate,format,scheduler,view,startDiv);
            }
        }else if(view === 'day' && scheduler.getData('ltPropMultiUserView')){
            if(eventData.allDayEvent ){
                _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
            }else{
                var endDate = $L.moment(eventData.end,format);
                var start_time = startDate.format('hh') + ':00 ' + startDate.format('A');
                var isNotSameDay = (startDate.format('DD-MM-YYYY') != endDate.format('DD-MM-YYYY'));
                var useTimeline = scheduler.getData('ltPropEnableDayViewTimeline');
                var timelineInterval = useTimeline ? scheduler.getData('ltPropTimeLine') : 60;
                
                if(isNotSameDay){
                     var end_time = '11:' + ('0' + ( 60 - timelineInterval )).slice(-2) + ' PM';
                }else{
                    var end_time = endDate.format('hh') + ':00 ' + endDate.format('A');
                }
                var user = scheduler.$node.querySelector('[data-userid="'+eventData.userid+'"]');
                if(eventData.participantId && eventData.participantEvent){
                    user = scheduler.$node.querySelector('[data-userid="'+eventData.participantId+'"]');

                }
                var startTimeDiv = $L('[data-time="'+ start_time +'"]',user)[0];
                var left = 'left';
                if(_lyteUiUtils.getRTL()){
                    left = 'right';
                }
                if(startTimeDiv){
                    this.fastdomMeasure = $L.fastdom.measure(function(){
                        if(!scheduler.startTimeDiv_width){
                            var startTimeDiv_width = startTimeDiv.parentElement.getBoundingClientRect().width;
                            scheduler.startTimeDiv_width = startTimeDiv_width;
                        }else{
                            var startTimeDiv_width = scheduler.startTimeDiv_width ;
                        }
                        var starttimeDivision = startDate.get('minutes') / timelineInterval;
						var event_bounding = _this.$node.getBoundingClientRect();
						var marginTop = parseInt(window.getComputedStyle(_this.$node).marginTop);
						var event_top = _this.getData('eventIndex') *  ( event_bounding.height + marginTop);
						var event_left = starttimeDivision * startTimeDiv_width;
						var event_width;
						if(isNotSameDay){
                            var endMin = 59;
							var endTimeDiv = user.querySelector('[data-time="'+end_time+'"]');
							event_width =  Math.abs( endTimeDiv.getBoundingClientRect()[left] - (event_bounding[left] + event_left) ) +  (endMin / 60  ) * startTimeDiv_width;
						}else{
							var diffMs = startDate.fromNow(endDate).timestamp;
							var diff =  Math.round((diffMs / 1000) / 60);
                            var mindiff = timelineInterval / 4;
							var endMin = diff < mindiff  ? mindiff : diff;
							event_width =  (endMin / timelineInterval ) * startTimeDiv_width;
						}
                        delete _this.fastdomMeasure; 
						_this.fastdomMutate = $L.fastdom.mutate(function(){
							_this.$node.style.cssText += left + ':'+ event_left +'px; top:'+ event_top +'px; width:'+ event_width +'px;';
							_this.addHeightToDate(Math.ceil( ( starttimeDivision * startTimeDiv_width + event_width ) / startTimeDiv_width ),event_bounding.height + marginTop,startDiv.dataset.time,user,'time',scheduler,isMultiView,view);
                            delete _this.fastdomMutate;
						})
					})
                }
            }
        }else if(view == 'week'){
            _this.$node.style.position ='absolute';
            _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
        }else{
            var date_td = scheduler.$node.querySelector('.lyteSchedulerDate').children[0];
            var cs =  window.getComputedStyle(date_td);
        }
        if(!_this.$node.dataset.id){
            _this.$node.dataset.id = _this.$node.getAttribute('id');
        }
        if(this.getMethods('eventRender')){
            this.executeMethod('eventRender',this.$node);
        }
    },
    fixTimeLineEvent : function(eventData,startDate,format,scheduler,view,startDiv){
        var pos = _lyteUiUtils.eventPlacement.fixTimeLineEvent(eventData,startDate,format,scheduler,view,scheduler.$node.getData('ltPropCustomTimeline'));
        this.setWidthForTimeLine(startDiv,scheduler,(pos.top + 'px'),(pos.height + 'px'));
    },
    setSchedulerEvents : function(event_tag,scheduler,eventData,format,startDiv,curr_date,isMultiView,view){
        var user;
        event_tag  = this.$node;
        var isRTL = _lyteUiUtils.getRTL();
        var startDiv =  $L(event_tag).closest('.scheduler-event-div')[0];
        var startDivRect = getComputedStyle(startDiv);
        var top;
        var width;
        var isUserBased = scheduler.getData('ltPropUserBasedView');
        var eventTagcs = window.getComputedStyle(event_tag);
        if(view == 'week' || (view == 'day' && isMultiView) || isUserBased){
            user = scheduler.$node.querySelector('[data-userid="'+eventData.userid+'"]');
            if(eventData.participantId && eventData.participantEvent){
                user = scheduler.$node.querySelector('[data-userid="'+eventData.participantId+'"]');
            }
            top = parseInt(startDivRect.height) +  parseInt(eventTagcs.marginTop) +'px';
        }
        var divPosition = startDiv.dataset.date;
        if(eventData.end){
            var endDate = $L.moment(eventData.end, format);
            var isinBetween = this.isinBetween(curr_date.format('DD-MM-YYYY'),divPosition,endDate.format('DD-MM-YYYY'), scheduler);
            var number_height = 0;
            var eventTagRect = event_tag.getBoundingClientRect();
            var paddingTop = 0;
            var cs;
            var datetd_width = 0;
            var date_td =  $L(event_tag).closest('.lyteSchedulerDate')[0];
            cs = window.getComputedStyle(date_td);
            if(!scheduler._DayNumberHeight){
                paddingTop = parseInt(cs.paddingTop);
                if(view == 'month'){
                    number_height = $L('.lyteSchedulerDayNumber',scheduler.$node)[0].offsetHeight;
                }
                number_height += paddingTop;
                datetd_width = scheduler._DateWidth = date_td.offsetWidth;
                scheduler._DayNumberHeight = number_height;
            }else{
                datetd_width = scheduler._DateWidth;
                paddingTop =  parseInt(cs.paddingTop);
                number_height = scheduler._DayNumberHeight;
            }
            if(isinBetween  && view !== 'day'){
                var interval = scheduler.getEventInterval(divPosition,endDate.format('DD-MM-YYYY'),'DD-MM-YYYY') + 1 ;
                if(!endDate.getDObj().getMinutes() && !endDate.getDObj().getHours() ){
                    interval -= 1;
                }
                var paddingRight = parseInt(cs.paddingRight);
                paddingRight = isNaN(paddingRight) ? 0 : paddingRight;
                var paddingLeft = parseInt(cs.paddingLeft);
                paddingLeft = isNaN(paddingLeft) ? 0 : paddingLeft;
                var width = (interval * datetd_width) - 2 * paddingRight;
                var schedulerRect = scheduler.$node.getBoundingClientRect();
                var schedulerLeft = schedulerRect.left;
                var schedulerRight = schedulerRect.right;
                var eventLeft = eventTagRect.left;
                if( ( !isRTL && ( (width + eventLeft)  > schedulerRight ) ) || ( isRTL && ( ( schedulerRight - (schedulerRight  - eventLeft) - width ) < schedulerLeft ) )){
                    var overflow = $L('.lyteSchedulerViewWrapper',scheduler.$node)[0];
                    var scrollBar = 0;
                    if(overflow){
                        if(overflow.scrollHeight > overflow.clientHeight){
                            scrollBar = _lyteUiUtils.getScrollBarWidth() ;
                        }
                    }
                    if(isRTL){
                        width =   ( eventTagRect.right - schedulerLeft -  paddingRight) - scrollBar ;
                    }else{
                        width =   ( schedulerRight -  paddingRight - eventLeft) - scrollBar ;
                    }
                    
                }
                top = number_height + this.getData('eventIndex') *  ( eventTagRect.height + parseInt(eventTagcs.marginTop) ) + 'px';
            }else{
                var width = eventTagRect.width;
                top = number_height + this.getData('eventIndex') *  ( eventTagRect.height + parseInt(eventTagcs.marginTop) ) + 'px';
            }
        }

        if(isRTL){
            this.$node.style.cssText += 'right:'+ parseInt(cs.paddingRight) +'px; width:' + width + 'px; top:'+ top +';';
        }else{
            this.$node.style.cssText += 'left:'+ parseInt(cs.paddingLeft) +'px; width:' + width + 'px; top:'+ top +';';
        }
        var cs =  window.getComputedStyle(startDiv);
        if((!isMultiView && (view == 'day' || view == 'week')) || (isMultiView && view == 'day')){
            this.addHeightToDate(Math.round(width/parseInt(startDivRect.width)),eventTagRect.height + parseInt(eventTagcs.marginTop),divPosition,user,undefined,scheduler,isMultiView,view);
        }
    },
    addHeightToDate : function( interval, event_height, startDay, user ,selector, scheduler,isMultiView,view){
        var tr = this.$node.closest('tr');
        var dateHeight =0;
        if(scheduler.$node.dateHeight){
            dateHeight = scheduler.$node.dateHeight;
        }else{
            var dateHeight = $L('.lyteSchedulerDate',scheduler.$node)[0];
            var cs = window.getComputedStyle(dateHeight);
            if(dateHeight){
                dateHeight = parseInt(cs.paddingTop) + parseInt(cs.paddingBottom);
            }else{
                dateHeight = 0;
            }
            scheduler.$node.dateHeight = dateHeight;
        }
        var NewHeight = dateHeight + (this.getData('eventIndex') + 1) * event_height;
        if(NewHeight > parseInt(tr.style.getPropertyValue('--lyte-scheduler-td-height') || 0)){
            tr.style.setProperty('--lyte-scheduler-td-height', ( dateHeight + (this.getData('eventIndex') + 1) * event_height) + 'px');
            if(!isMultiView && view == "day"){
                var shadow_div = document.querySelectorAll('.lyteSchedulerDayViewAllDayRow')[1];
                if(shadow_div){
                    shadow_div.style.setProperty('--lyte-scheduler-td-height', ((this.getData('eventIndex') + 1) * event_height + dateHeight) + 'px');
                }
            }
        }
    },
    setWidthForTimeLine: function (parent, scheduler, top, height) {
        var view = scheduler.getData('ltPropSchedulerView');
        var gap = scheduler.getData('ltPropEventGap');
        var isRTL =_lyteUiUtils.getRTL();
        var depthArrayCount = this.getData('ltPropCount');
        var overlapCondition = (scheduler.getData('ltPropWeekEventOverlap') && view == 'week') || (view == 'day' && scheduler.getData('ltPropUserBasedView'));
        var parentElement = this.$node.offsetParent;
        var padding;
        if(isRTL){
            padding = parseInt(window.getComputedStyle(parentElement).paddingLeft);
        }else{
            padding = parseInt(window.getComputedStyle(parentElement).paddingRight)
        }
        var parentWidth = parentElement.offsetWidth - padding;
        var gapBetweenEvents = gap; 
        var columnWidth = (parentWidth - padding - (depthArrayCount - 1) * gapBetweenEvents ) / depthArrayCount;
        if( columnWidth < 0 ){
            columnWidth = (parentWidth - padding) / depthArrayCount;
        }
        var col = this.getData('ltPropCol');
        var minWidth = (parentWidth - padding)/ depthArrayCount;
        var totalWidth = parentWidth - padding;
        var prevElem = $L('#u'+this.getData('ltPropPrevelem'),this.$node.closest('scheduler-event-div'))[0];
        var width = minWidth;
        var right;
        var intersect = this.getData('ltPropIntersect');
        var nextIntersetcol = this.getData('ltPropNextIntersetcol');
        if (prevElem && col > 1) {
            var perv_intersect = $L('.lyteSchedulerTimelineEvent',prevElem)[0];
            var parentOffset = prevElem.offsetParent.getBoundingClientRect();
            var prevElem_offset = prevElem.getBoundingClientRect();
            if(overlapCondition){
                if( scheduler.getData('ltPropWeekEventOverlap') && (prevElem.offsetTop + perv_intersect.offsetHeight) < parseFloat(top)){
                    if(isRTL){
                        right = ( parentOffset.right - prevElem_offset.right ) + (prevElem.offsetWidth * 0.20);
                        totalWidth -= (( parentOffset.right - prevElem_offset.right ) + (prevElem.offsetWidth * 0.20));
                    }else{
                        left = prevElem.offsetLeft + (prevElem.offsetWidth * 0.20);
                        totalWidth -= (prevElem.offsetLeft + (prevElem.offsetWidth * 0.20));
                    }
                   
                }else{
                    if(isRTL){
                        right =   ( parentOffset.right - prevElem_offset.right ) + (prevElem.offsetWidth * 0.5);
                        totalWidth -= (( parentOffset.right - prevElem_offset.right ) + (prevElem.offsetWidth * 0.5));
                    }else{
                        left = prevElem.offsetLeft + (prevElem.offsetWidth * 0.8);
                        totalWidth -= (prevElem.offsetLeft + (prevElem.offsetWidth * 0.8));
                    }  
                }
                if(intersect && intersect.length > 0){
                    var ActualWidth = (totalWidth)/Math.min(intersect.length+1,depthArrayCount);
                }else{
                    var ActualWidth = totalWidth;
                }
                width = ActualWidth ;
            }else{
                if(isRTL){
                    right = (col - 1) * minWidth + (!overlapCondition ? gapBetweenEvents : 0);
                }else{
                    left = (col - 1) * minWidth + (!overlapCondition ? gapBetweenEvents : 0);
                }
                if(intersect && intersect.length > 0){
                    if(nextIntersetcol){
                        var ActualWidth = minWidth * (nextIntersetcol - col);
                    }else{
                         var ActualWidth = totalWidth/depthArrayCount;
                    }
                   
                }else{
                    if(isRTL){
                        var ActualWidth = totalWidth - right;
                    }else{
                        var ActualWidth = totalWidth - left;
                    }
                }
                width = ActualWidth - gapBetweenEvents;
            }
        } else {
            if(isRTL){
               right = gapBetweenEvents;
            }else{
                left = gapBetweenEvents;
            }
            if(intersect && intersect.length > 0){
                if(overlapCondition){
                    var ActualWidth = (totalWidth)/Math.min(intersect.length+1,depthArrayCount);
                }else{
                    if(nextIntersetcol){
                        var ActualWidth = minWidth * (nextIntersetcol - col);
                    }else{
                        var ActualWidth = totalWidth/depthArrayCount;
                    }
                }
            }else{
                var ActualWidth = totalWidth;
            }
            width = ActualWidth - gapBetweenEvents;
            if(overlapCondition ){
                width += gapBetweenEvents;
            }
        }
        if(isRTL){
            this.$node.style.cssText += 'right:'+ right +'px; width:' + width + 'px; top:'+ top +'; height:'+ height +'; position:absolute; z-index:'+ col;
        }else{
            this.$node.style.cssText += 'left:'+ left +'px; width:' + width + 'px; top:'+ top +'; height:'+ height +'; position:absolute; z-index:'+ col;
        }
        if(this.getData('ltPropIslast')){
            var nmore = $L('.lyteSchedulerEventMoreBtn[data-group="'+ this.$node.dataset.group +'"]',parent)[0];
            if (nmore) {
                nmore.style.height = 'fit-content';
                var LastEnd = $L('lyte-scheduler-event-tag[data-group="'+ this.$node.dataset.group +'"]');
                LastEnd = LastEnd[LastEnd.length - 1];
                nmore.style.top = LastEnd.offsetTop + LastEnd.offsetHeight - nmore.offsetHeight + 'px';
            }
        }
    },
    ResetWidth : function(prevSetted, scheduler){
        var keys = Object.keys(prevSetted);
        for(var index = 0 ; index < keys.length; index++){
            var interset = $L('#u'+ keys[index] ,scheduler.$node)[0];
            var events = prevSetted[keys[index]];
            var related =  interset;
            var precentage = ( interset.offsetWidth / interset.parentElement.offsetWidth ) * 100;
            for(var _index = 0 ; _index < events.length; _index++){
                var event = events[_index];
                event.style.left =  related.offsetLeft + related.offsetWidth + gap + 'px';
                event.style.width = 'calc(' + (100 - precentage)/ events.length + '% - '+ ( gap + gap /(events.length+1) ) + 'px)';
                related = event;
            }
        } 
    },
    isTimeOverlap : function(item,event_div){
        var item_offset = item.getBoundingClientRect();
        var event_offset = event_div.getBoundingClientRect();
        if((item_offset.top <= event_offset.top && item_offset.bottom >= event_offset.top)  || 
            (event_offset.bottom >= item_offset.top && event_offset.bottom <= item_offset.bottom) ){
            return true;
        }
    },
    actions : {
        // Functions for event handling
    },
    methods : {
        // Functions which can be used as callback in the component.
    }
});
