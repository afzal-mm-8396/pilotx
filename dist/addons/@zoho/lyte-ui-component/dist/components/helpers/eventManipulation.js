( function() {
	var eventManipulator = function( format , month, weekstart, view, isMultiUser, maxEvent, timelineMaxEvent, businessDays, isWorkingOnly, isUserBased, startViewDate, selectedUser, interval, customTimeline ) {
		this.events = [];
		this.format = format;
		this.month = month;
		this.weekstart = weekstart;
		this.view = view;
		this.isMultiUser = isMultiUser;
		this.maxEvent = maxEvent;
		this.timelineMaxEvent = timelineMaxEvent;
		this.businessDays = businessDays;
		this.isWorkingOnly = isWorkingOnly;
		this.isUserBased = isUserBased;
		this.startViewDate = startViewDate;
		this.selectedUser = selectedUser;
		this.interval = interval;
		this.customTimeline = customTimeline && Object.keys(customTimeline).length ? customTimeline : {start : '12:00 AM', end : '11:59 PM'};
		this.customTimeline.start = $L.moment( this.customTimeline.start, 'hh:mm A' );
		this.customTimeline.end = $L.moment( this.customTimeline.end, 'hh:mm A' );
	};
	var hiddenObj;
	var allDayHidden = {};
	eventManipulator.prototype.addEvents = function( events ) {
		this.events = this.events.concat( events );
		this.sortEvents();
	}
	eventManipulator.prototype.removeEvents = function( eventsToRemove ) {
		var that = this;

		this.events.filter( function( event ) {
			return that.shouldRemoveEvent( eventsToRemove, event );
		} );
	}
	eventManipulator.prototype.shouldRemoveEvent = function( eventsToRemove, event ) {
		for( var i = 0; i < eventsToRemove.length; i++ ) {
			if( event.id === eventsToRemove[ i ].id ) {
				return false;
			}
		}

		return true;
	}
	eventManipulator.prototype.sortEvents = function(events) {
		
		var that = this;
		if(!events){
			events = this.events;
		}
		events.sort( function( eventA, eventB ) {
			if(eventA.overdue){
				return -1;
			} 
			if(eventB.overdue){
				return 1;
			}
			const sortBAfterA = -1,
			sortAAfterB = 1;
			var format = that.format,
			eventAStartDate = eventA.start,
			eventBStartDate = eventB.start;
			if(format == ''){
				var eventAStart = new Date(eventAStartDate),
				eventBStart = new Date(eventBStartDate),
				eventAEnd = new Date(eventA.end),
				eventBEnd = new Date(eventB.end);
				if((eventAEnd.getTime() - eventAStart.getTime()) >= 86400000){
					eventAStart.setHours(0,0,0,0);
				}
				if((eventBEnd.getTime() - eventBStart.getTime()) >= 86400000){
					eventBStart.setHours(0,0,0,0);
				}
				eventAStart = eventAStart.getTime();
				eventBStart = eventBStart.getTime();
				var dateCompareObj = eventBStart - eventAStart,
				differenceBetweenDates = dateCompareObj;
			}else{
				var eventAStart = $L.moment( eventAStartDate, format ),
				eventAEnd = $L.moment( eventA.end || '', format ),
				eventBStart = $L.moment( eventBStartDate, format ),
				eventBEnd = $L.moment( eventB.end || '', format );
				if( eventAEnd.get('time') - eventAStart.get('time') >= 86400000 ){
					eventAStart.set('hours',0);
					eventAStart.set('minutes',0);
					eventAStart.set('seconds',0);
				}
				if( eventBEnd.get('time') - eventBStart.get('time') >= 86400000){
					eventAStart.set('hours',0);
					eventAStart.set('minutes',0);
					eventAStart.set('seconds',0);
				}
				dateCompareObj = eventAStart.fromNow( eventBStart ),
				differenceBetweenDates = dateCompareObj.timestamp;	
			}

			if( differenceBetweenDates != 0 ) {
				return differenceBetweenDates > 0 ? sortBAfterA : sortAAfterB;
			}
			else {
				return that.compareEndDates( eventAEnd, eventBEnd );
			}
		} );
	}
	eventManipulator.prototype.compareEndDates = function( eventA, eventB ) {
		const sortBAfterA = -1,
		sortAAfterB = 1;
		var eventAEndDate = eventA || '',
		eventBEndDate = eventB || '',
		format = this.format;
		if(format == ''){
			var eventAEnd = new Date(eventAEndDate).getTime(),
			eventBEnd = new Date(eventBEndDate).getTime(),
			dateCompareObj = eventBEnd -  eventAEnd,
			differenceBetweenDates = dateCompareObj;
		}else{
			var dateCompareObj = eventAEndDate.fromNow( eventBEndDate ),
			differenceBetweenDates = dateCompareObj.timestamp;	
		}
		return differenceBetweenDates >= 0 ? sortAAfterB : sortBAfterA;
		
	}
	eventManipulator.prototype.generateEventObjArr = function( schedulerevent ){
		this.eventObj = {};
		this.hiddenObj = {};
		this.viewStartDate =  new Date( this.startViewDate.toString() );
		this.viewStartDate.setMinutes(0);
		this.viewStartDate.setHours(0);
		var lastDayOfView;
		lastDayOfView = new Date(this.viewStartDate);
		if(this.view == 'week'){
			lastDayOfView.setDate( lastDayOfView.getDate() + 6 );
		}else if(this.view == 'month'){
			var year = this.viewStartDate.getFullYear();
			if( this.month == 0 && this.viewStartDate.getMonth() !== this.month){
                year++;
			}
			lastDayOfView = new Date(year,this.month + 1,0);
			var weekStart = this.weekstart;
			var start_diff = lastDayOfView.getDay() - weekStart;
			if( lastDayOfView.getDay() > weekStart ){
			   lastDayOfView.setDate(lastDayOfView.getDate() - ( start_diff ) );
		    }else{
			    lastDayOfView.setDate(lastDayOfView.getDate() - ((7 + start_diff) % 7));
		    }
			lastDayOfView.setDate(lastDayOfView.getDate() + 6);
		}else {
			lastDayOfView = new Date(this.viewStartDate);
		}
		lastDayOfView = setDateTime( lastDayOfView, 23, 59, 59 );
		for(var index = 0; index < schedulerevent.length; index++){
			var item = schedulerevent[ index ];
			this.start_date = createDateObj( item.start, this.format );
			this.end_date =  createDateObj(item.end, this.format );
			this.start_format = getFormatDate( this.start_date, 'DD-MM-YYYY' );
			this.end_format = getFormatDate( this.end_date, 'DD-MM-YYYY' );
			var nextDay = new Date( this.start_date.toString() );
			nextDay.setDate( this.start_date.getDate() + 1  );
			var next_format = getFormatDate(nextDay, 'DD-MM-YYYY');
			if(this.viewStartDate.getTime() > this.end_date.getTime() || lastDayOfView.getTime() < this.start_date.getTime() ){
				continue;
			}
			item.allDayEvent = true;
			if( ( this.start_format === this.end_format && !isAllDay(this.start_date,this.end_date) ) || (next_format == this.end_format && ( !this.end_date.getHours() && !this.end_date.getMinutes() ) ) ){
				item.allDayEvent = false;
			}
			if( (this.viewStartDate.getTime() > this.start_date.getTime()) && (this.viewStartDate !== this.start_format) ){
				this.start_date.setFullYear(this.viewStartDate.getFullYear());
				this.start_date.setMonth(this.viewStartDate.getMonth())
				this.start_date.setDate(this.viewStartDate.getDate())				
				this.start_format = getFormatDate(this.start_date, 'DD-MM-YYYY');
			}
			this.eventData = item;
			this.isallDay = false;
			this.addEventObj( this.start_date, this.start_format, this.end_format, this.eventData );
		}
		delete this.viewStartDate;
		delete this.start_date;
		delete this.end_date;
		delete this.start_format;
		delete this.end_format;
		var eventObj = this.eventObj;
		var hiddenObj = this.hiddenObj;
		delete this.eventObj;
		delete this.hiddenObj;
		return {'eventObj': eventObj, 'hiddenObj': hiddenObj};
	}
	eventManipulator.prototype.addEventObj = function( date, indexDate, end_format, event, isHiddenObj ){
		var start_format = indexDate;
		var cloneObject =  { ...event };
		var weekstart = weekstart === undefined ? 0 : this.weekstart;
		if(start_format == getFormatDate(date,'DD-MM-YYYY')){
			cloneObject.StartOfEvent = true;
		}else{
			delete cloneObject.middleofevent;
			cloneObject.endOfevent  = true;
		}
		this.clonedEvent = cloneObject;
		if( this.isexceedMaxevent( this.eventObj, indexDate ) && ( cloneObject.allDayEvent || this.view == 'month' || ( this.isMultiUser && this.view == 'week' ))  ){
			this.addHiddenObj( indexDate, end_format, cloneObject, isHiddenObj );
		}else{
			this.userid = cloneObject.userid;
			this.pushEvent( indexDate, cloneObject, null, null, isHiddenObj, this.eventObj );
		}	
		this.createDummyEvent( date, end_format, start_format, this.eventObj, null, event, isHiddenObj );
	}
	eventManipulator.prototype.pushEvent =  function( date, event, isparticipant, rowIndex, isHiddenObj, eventObj, preventWorkingDayCheck ){
		var user = (event.participantId && !Array.isArray(event.participantId)) ? event.participantId : event.userid;
		if(this.view == 'week' && this.isWorkingOnly && !preventWorkingDayCheck ){
			var newStart = $L.moment( date, 'DD-MM-YYYY' );
			while( !this.businessDays.includes( newStart.get( 'day' ) ) ){
				newStart.add( 1, 'date' );
			}
			var endDate = $L.moment( event.end, this.format );
			if( !endDate.fromNow( newStart ).past && endDate.format( 'DD-MM-YYYY' ) !== newStart.format( 'DD-MM-YYYY' ) ){
				return;
			}
			date = newStart.format('DD-MM-YYYY');
			if( !isHiddenObj && this.isexceedMaxevent( eventObj, date ) ){
				var end_format = this.end_format;
				this.addHiddenObj( date, end_format, event, isparticipant );
				return;
			}
		}
		if(this.isMultiUser && !isparticipant && Array.isArray(event.participantId) && !event.participantEvent){
			for( var index = 0; index < event.participantId.length; index++ ){
				var participantEvent = event.participantId[index];
				var clonedEvent = structuredClone(event);
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				clonedEvent.userid = participantEvent.id;
				var Og_eventObj = Og_eventObj ? Og_eventObj : this.eventObj;
				var end_date = createDateObj( clonedEvent.end, this.format );
				var end_format = getFormatDate( end_date, 'DD-MM-YYYY' );
				var isHiddenObjHasEvent = isEventAvailableInDate( Og_eventObj, this.hiddenObj,date, clonedEvent.participantId, clonedEvent.id );
				if( this.isexceedMaxevent( Og_eventObj, date, clonedEvent.participantId )){
					if(!isHiddenObjHasEvent){
						this.addHiddenObj( date, end_format, clonedEvent, true );
					}
				}else if(!isHiddenObjHasEvent){
					this.pushEvent( date, clonedEvent, true, rowIndex, false, this.eventObj );
					this.createDummyEvent( $L.moment( date, 'DD-MM-YYYY' ).getDObj(), end_format, getFormatDate( createDateObj( clonedEvent.start, this.format ), 'DD-MM-YYYY' ), this.eventObj, true, clonedEvent )
				}
			}
		}
		if(this.isMultiUser && this.view !== 'month' ){
			if( this.view == 'day' && this.isUserBased ){	
				eventObj[ date ] = eventObj[ date ] ? eventObj[ date ] : {};
				eventObj[ date ][ user ] = eventObj[ date ][ user ] ? eventObj[ date ][ user ] : [];
				eventObj[ date ][ user ].push( structuredClone( event ) );
			}else if( this.view == 'week' && this.isUserBased ){
				eventObj[ date ] = eventObj[ date ] ? eventObj[ date ] : [];
				eventObj[ date ][ user ] = eventObj[ date ][ user ] ? eventObj[ date ][ user ] : [];
				eventObj[ date ][ user ].push( structuredClone( event ) );
			}else{
				eventObj[ date ] = eventObj[ date ] ? eventObj[ date ] : {};
				eventObj[ date ][ user ] = eventObj[ date ][ user ] ? eventObj[ date ][ user ] : [];
				if(!eventObj[ date ][ user ].count){
					eventObj[ date ][ user ].count = 0;
				}
				this.pushEventToArray( event, rowIndex, eventObj, date, isHiddenObj, user );
				if(Object.keys(event).length){
					eventObj[date][user].count += 1;		
				}
			}	
		}else{
			eventObj[date] = eventObj[date] ? eventObj[date] : [];
			this.pushEventToArray( event, rowIndex, eventObj, date, isHiddenObj );
		}
	}
	var isEventAvailableInDate = function( eventObj, hiddenObj, date, userId, eventId ){
		var flag = false;
		if( eventObj[ date ] && eventObj[ date ][ userId ]){
			flag = !!$u.findWhere( eventObj[ date ][ userId ], { dummy_id : eventId } );
		}
		if( hiddenObj[ date ] && hiddenObj[ date ][ userId ] ){
			flag = !!$u.findWhere( hiddenObj[ date ][ userId ], { id : eventId } );
		}
		return flag;
	}
	eventManipulator.prototype.isexceedEventObjMaxevent = function( Og_eventObj, date, event ){
		if( !this.isMultiUser && this.view == 'month' ){
			var dateObj = createDateObj( date,'DD-MM-YYYY' );
			var end_date = createDateObj( event.end, this.format );
			var endOfWeek = findStartOfWeek( dateObj, this.weekstart );
			endOfWeek.setDate( endOfWeek.getDate() + 6 )
			var flag = false;
			var start = getFormatDate( dateObj, 'DD-MM-YYYY' );
			while( endOfWeek.getTime() > dateObj.getTime() && dateObj.getTime() < end_date.getTime() ){
				Og_eventObj[ start ] = Og_eventObj[ start ] ? Og_eventObj[ start ] : [ ];
				var count = 0;
				var length = 0;
				for( var index = 0; index < Og_eventObj[ start ].length; index++ ){
					if( Og_eventObj[ index ] ){
						count++;
					}
				}
				length = count;
				if( length >= this.maxEvent ){
					flag = true;
					break;
				}
				dateObj.setDate( dateObj.getDate() + 1 );
				start = getFormatDate( dateObj, 'DD-MM-YYYY' );
			}
			return flag;
		}
	}
	eventManipulator.prototype.isexceedMaxevent = function( eventObj, indexDate, userid ){
		var maxEvent = this.maxEvent;
		userid = userid ? userid : this.eventData.userid;
		var length = 0;
		if(this.isMultiUser  && this.view !== 'month' ){
			if( this.isMultiUser && this.view == 'day' && this.isUserBased && this.eventData.allDayEvent ){
				eventObj[ indexDate ] = eventObj[ indexDate ] ? eventObj[ indexDate ] : { };
			}else{
				eventObj[ indexDate ] = eventObj[ indexDate ] ? eventObj[ indexDate ] : { };
			}
			eventObj[ indexDate ][ userid ] = eventObj[ indexDate ][ userid ] ? eventObj[ indexDate ][ userid ] : [ ];
			length = findEventCount( eventObj[ indexDate ][ userid ] );
		}else{
			eventObj[ indexDate ] = eventObj[ indexDate ] ? eventObj[ indexDate ] : [ ];
			if( this.view !== 'month' ){
				length = $u.groupBy( eventObj[ indexDate ], 'allDayEvent' ).true;
				length = length ? length.length : 0;
			}else{
				length = findEventCount( eventObj[ indexDate ] );
			}
		}
		return length >= maxEvent;
	}
	findEventCount = function(eventArr){
        let count = 0;
        eventArr.forEach(function(item){
            if(item){
                count++;
            }
        })
        return count;
    }
	eventManipulator.prototype.pushEventToArray = function( event, rowIndex, eventObj, date, isHiddenObj, user ){
		var pushEvent = eventObj[ date ];
		pushEvent = user ? pushEvent[ user ] : pushEvent;
		if( !isHiddenObj && rowIndex !== undefined && rowIndex !== null ){
			pushEvent[rowIndex] = event;
		}else{
			if( isHiddenObj ){
				if( this.isexceedEventObjMaxevent( this.eventObj, date, event ) ){
					if( !$u.findWhere( pushEvent, { id : event.id } ) ){
						pushEvent.push( structuredClone( event ) )
					}	
				}else{
					pushEvent.push( structuredClone( event ) )
				}
			}else{
				var findEmptySpace = findEmpty( pushEvent, date );
				var pos = this.findOverdueActivity( eventObj, event, date, user );
				if( this.view !== 'day' && pos ){
					pos = pos > pushEvent.length ? pos : pushEvent.length;
					pushEvent[ pos ] = event;
				}else if( findEmptySpace !== undefined ){
					pushEvent[ findEmptySpace ] = event;
				}else{
					pushEvent.push( structuredClone( event ) )
				}
			}
		}
	}
	eventManipulator.prototype.addHiddenObj = function( indexDate, end_format, cloneObject, isparticipant ){
		isparticipant = isparticipant == undefined ? false : isparticipant;
		if(this.isallDay){
			this.pushEvent( indexDate, cloneObject, isparticipant, null, true, this.allDayHidden );
			this.createDummyEvent( createDateObj( indexDate , 'DD-MM-YYYY'), end_format, indexDate, this.allDayHidden, isparticipant, cloneObject, true);
		}else{
			this.pushEvent( indexDate, cloneObject, isparticipant, null, true, this.hiddenObj );
			this.createDummyEvent( createDateObj( indexDate , 'DD-MM-YYYY'), end_format, indexDate, this.hiddenObj, isparticipant, cloneObject, true);
		}
	}

	eventManipulator.prototype.createDummyEvent = function( date, end_format, start_format, eventObj, isparticipant, event, isHiddenObj ){
		if( this.view !== 'day' && !( this.view == 'day' && !this.isMultiUser  ) ){
			if( this.isWorkingOnly && this.view == 'week'){
				date = findStartOfWorkingDay( date, this.businessDays );
				if( date.getTime() > this.end_date.getTime() ){
					return;
				}
			}
			var EndOftheWeek = new Date( date.toString() );
			var curr_date = ( ( 6 - this.weekstart ) + EndOftheWeek.getDay() + 1 ) % 7;
			EndOftheWeek.setDate( EndOftheWeek.getDate() + ( 6 - curr_date ) );
			var EoW_format = getFormatDate(EndOftheWeek,'DD-MM-YYYY');
			var start = start_format;
			if( isinBetween( start_format, EoW_format, end_format, 'DD-MM-YYYY' ) ){
				if( !event.StartOfEvent ){
					delete event.endOfevent;
					event.middleofevent = true;
				}
				if( event.allDayEvent ){
					this.addDummyEvent( start, EoW_format, event, eventObj, date, isparticipant, isHiddenObj );
				}
				EndOftheWeek.setDate( EndOftheWeek.getDate() + 1 )
				EoW_format = getFormatDate( EndOftheWeek,'DD-MM-YYYY' );
				if( this.view == 'month' && ( EndOftheWeek.getMonth() == this.month ) && !isHiddenObj ){
					this.addEventObj( EndOftheWeek, EoW_format, end_format, event, isHiddenObj );
				}
			}else if( event.allDayEvent ){
				this.addDummyEvent( start, end_format, event, eventObj, date, isparticipant, isHiddenObj );
			}
		}
	}

	eventManipulator.prototype.addDummyEvent = function( start, end, event, eventObj, StartDate, isparticipant, isHiddenObj){
		if( start == end ){
			return;
		}
		let endDate = $L.moment( event.end, this.format );
		var StartOfDay = $L.moment( StartDate.toString() ).startOf( 'date' );
		if( StartOfDay.format('DD-MM-YYYY') == end){
			return;
		}
		var interval = $L.moment( end, 'DD-MM-YYYY' ).fromNow( StartOfDay ).days;
		interval = interval ? interval.value : 1;
		if( endDate.format( 'DD-MM-YYYY' ) == end && ( !endDate.getDObj().getMinutes() && !endDate.getDObj().getHours() ) ){
			interval -= 1;
		}
		var index = 0; 
		var Sformat = getFormatDate(StartDate,'DD-MM-YYYY');
		if( this.isMultiUser && this.view == 'week' ){
			eventObj[Sformat] = eventObj[Sformat] ? eventObj[Sformat] : [];
			var rowIndex =  findIndex(eventObj[Sformat][event.userid],event.id);
		}else{
			var rowIndex =  findIndex(eventObj[Sformat],event.id);
		}
		while(index < interval){
			StartDate.setDate(StartDate.getDate()+1);
			Sformat = getFormatDate(StartDate,'DD-MM-YYYY');
			
			if( ( isHiddenObj || !this.isexceedMaxevent( eventObj, Sformat, event.participantEvent ? event.participantId : null ) ) && this.isHiddenEventAdded( getFormatDate(StartDate,'DD-MM-YYYY') , event ) ){
				var dummyEvent = { 
					dummy_id : event.id, 
					allDayEvent : event.allDayEvent, 
					userid : (event.participantId && !Array.isArray(event.participantId)) ? event.participantId : event.userid 
				};
				if( ( this.isUserBased && this.isMultiUser ) || isHiddenObj ){
					dummyEvent = structuredClone( event );
				}
				this.pushEvent( getFormatDate( StartDate, 'DD-MM-YYYY' ) , dummyEvent , isparticipant, rowIndex, isHiddenObj, eventObj, true );
			}
			index++;
		}
	}
	eventManipulator.prototype.isHiddenEventAdded = function( StartDate, eventData ){
		var user = (eventData.participantId && !Array.isArray(eventData.participantId)) ? eventData.participantId : eventData.userid;
		if( this.view == 'month' || ( this.isMultiUser && this.view == 'week' ) ){
			var hiddenData = this.hiddenObj[ StartDate ];
			hiddenData = hiddenData ? hiddenData : [];
			if( this.view == 'week' ){
				hiddenData = hiddenData[ user ];
			}
			return !hiddenData || !$u.findWhere( hiddenData, { id : eventData.id } );
		}else if( !this.isMultiUser && this.view == 'week' ){
			return !this.allDayHidden[ StartDate ] || !$u.findWhere( this.allDayHidden[ StartDate ], { id : eventData.id } );
		}
	}
	eventManipulator.prototype.generateEventObjArrNmore = function( event ){	
		var schedulerevent =  event;
		this.eventObj = {}, this.eventObjInfo = {};
		this.hiddenObj = {};
		this.allDayHidden = {};
		this.timelineEventObj = {};
		this.viewStartDate =  new Date( this.startViewDate.toString() );
		this.viewStartDate.setMinutes( 0 );
		this.viewStartDate.setHours( 0 );
		var lastDayOfView;
		this.viewStartDate.setMinutes( this.customTimeline.start.get('minutes') );
		this.viewStartDate.setHours(  this.customTimeline.start.get('hours') );
		lastDayOfView = new Date(this.viewStartDate);
		if(this.view == 'week'){
			this.viewStartDate.setMinutes( this.customTimeline.start.get('minutes') );
			this.viewStartDate.setHours(  this.customTimeline.start.get('hours') );
			lastDayOfView.setDate( lastDayOfView.getDate() + 6 );
			lastDayOfView.setMinutes( this.customTimeline.end.get('minutes') );
			lastDayOfView.setHours(  this.customTimeline.end.get('hours') );
		}else if(this.view == 'month'){
			var year = this.viewStartDate.getFullYear();
			if( this.month == 0 && this.viewStartDate.getMonth() !== this.month){
                year++;
			}
			lastDayOfView = new Date(year,this.month + 1,0);
			var weekStart = this.weekstart;
			var start_diff = lastDayOfView.getDay() - weekStart;
			if( lastDayOfView.getDay() > weekStart ){
			   lastDayOfView.setDate(lastDayOfView.getDate() - ( start_diff ) );
		    }else{
			    lastDayOfView.setDate(lastDayOfView.getDate() - ((7 + start_diff) % 7));
		    }
			lastDayOfView.setDate(lastDayOfView.getDate() + 6);
		}else {
			lastDayOfView = new Date(this.viewStartDate);
		}
		if(this.customTimeline.end){
			lastDayOfView = setDateTime( lastDayOfView, this.customTimeline.end.get('hours'), this.customTimeline.end.get('minutes'), 59 );
		}else{
			lastDayOfView = setDateTime( lastDayOfView, 23, 59, 59 );
		}
		for( var index = 0; index < schedulerevent.length; index++ ){
			var item = schedulerevent[index];
			this.eventData = item;
			this.start_date = createDateObj( item.start, this.format );
			this.end_date =  createDateObj( item.end, this.format );
			this.start_format =  getFormatDate( this.start_date, 'DD-MM-YYYY' );
			this.end_format =  getFormatDate( this.end_date, 'DD-MM-YYYY' );
			var nextDay = new Date( this.start_date.toString() );
			nextDay.setDate( this.start_date.getDate() + 1  );
			var next_format = getFormatDate( nextDay, 'DD-MM-YYYY' );
			item.allDayEvent = true;
			this.isallDay = true;
			if( this.view === 'month' && this.isMultiUser ){
				if( this.end_date.getMinutes() || this.end_date.getHours() ){
					this.end_date = setDateTime( this.end_date, 23, 59, 59 );
				}
				var loop_date = createDateObj( item.start, this.format ), loop_format;
				while( isPast( loop_date, this.end_date ) === false ) {
					loop_format = getFormatDate(loop_date, 'DD-MM-YYYY');
					this.pushToEventObjWithoutGrp( item, loop_format, null, undefined, this.selectedUser );
					loop_date.setDate(loop_date.getDate()+1);
				}
			}else if(!isAllDay( this.start_date, this.end_date ) || (next_format == this.end_format && ( !this.end_date.getHours() && !this.end_date.getMinutes() ) ) ){
				if(this.viewStartDate.getTime() > this.end_date.getTime() || lastDayOfView.getTime() < this.start_date.getTime()){
					continue;
				}
				item.allDayEvent = false;
				if(this.view == 'day' && this.isMultiUser && !this.isUserBased){
					this.pushToTimeline( item, this.start_format );
				}else{
					this.pushToEventObj( item, this.start_format, this.timelineEventObj );
				}
			}else{
				if( this.viewStartDate.getTime() > this.end_date.getTime() || lastDayOfView.getTime() < this.start_date.getTime()){
					continue;
				}
				if( ( this.viewStartDate.getTime() > this.start_date.getTime() ) && ( this.viewStartDate !== this.start_format ) ){
					this.start_date.setFullYear( this.viewStartDate.getFullYear() );
					this.start_date.setMonth( this.viewStartDate.getMonth() )
					this.start_date.setDate( this.viewStartDate.getDate() )
					this.start_format = getFormatDate( this.start_date, 'DD-MM-YYYY' );
				}
				allDay = this.addEventObj( this.start_date, this.start_format, this.end_format, item );
			}

		}
		if(this.view == 'day'){
			if(!this.isMultiUser){
				this.timelineEventObj = getGetDeepArray( this.timelineEventObj, this.format, this.interval );
			}else if(this.isUserBased){
				for(var key in this.timelineEventObj) {
					this.timelineEventObj[key] = getGetDeepArray( this.timelineEventObj[key], this.format, this.interval );
				}
			}
		}else if(this.view == 'week'){
			this.timelineEventObj = getGetDeepArray( this.timelineEventObj, this.format, this.interval );
		}
		if(this.isMultiUser && this.view == 'month'){
			this.timelineEventObj = this.eventObj;
		}else{
			this.timelineEventObj.allDay = this.eventObj;
			this.hiddenObj.allDay = this.allDayHidden;
		}
		var eventObj = this.timelineEventObj;
		return { 'eventObj': eventObj, 'hiddenObj': this.hiddenObj };
	}
	eventManipulator.prototype.pushToEventObjWithoutGrp = function( event, date, userid, isparticipant ){
		var user = userid ? userid : event.userid;
		var eventObj = this.eventObj;
		var hiddenObj = this.hiddenObj;
		var maxEvent = this.maxEvent;
		if( !eventObj[date] || !eventObj[date][user] ){
			eventObj[date] = eventObj[date] ? eventObj[date] : {};
		}
		if(event.participantId && !isparticipant){
			for( var index = 0; index < event.participantId.length; index++ ){
				var participantEvent = event.participantId[index];
				var clonedEvent = structuredClone(event);
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				this.pushToEventObjWithoutGrp( clonedEvent, date, participantEvent.id, true );
			}
		}
		var objLen = Object.keys(eventObj[date]).length;
		if( objLen >= maxEvent && !eventObj[date][user]  ){
			if(!this.selectedUser.length || this.selectedUser.includes(user)){
				hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
				hiddenObj[date][user] = hiddenObj[date][user] ? hiddenObj[date][user] : [];
				hiddenObj[date][user].push( event );
			}
			return;
		}
		if(!this.selectedUser.length || this.selectedUser.includes(user)){
			if(!eventObj[date][user]){
				eventObj[date][user] = eventObj[date][user] ? eventObj[date][user] : [];
			}
			eventObj[date][user].push(structuredClone(event));
		}
	}
	eventManipulator.prototype.pushToEventObj = function( event, date, eventObj, parentElement ){
		if( parentElement ){
			eventObj = parentElement;
		}
		var eventObjInfo = this.eventObjInfo;
		var hiddenObj = this.hiddenObj;
		var user = event.userid;
		if( this.isMultiUser && this.view !== 'month' ){
			if( !eventObj[date] || !eventObjInfo[date] || !eventObj[date][user] || !eventObjInfo[date][user] ){
				eventObj[date] = eventObj[date] ? eventObj[date] : {};
				eventObjInfo[date] = eventObjInfo[date] ? eventObjInfo[date] : {};
				eventObj[date][user] = eventObj[date][user] ? eventObj[date][user] : {};
				eventObjInfo[date][user] = eventObjInfo[date][user] ? eventObjInfo[date][user] : {};
				this.createNewGrp( event, eventObj[date][user], eventObjInfo[date][user], eventObj, eventObjInfo );
			}
			else{
				var ret = isEventIntersect( event, eventObjInfo[date][user], this.format );
				if( ret !== false ){
					var objLen = eventObj[date][user]['grp'+ret].length;
					
					if( objLen >= this.timelineMaxEvent ){
							hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
							hiddenObj[date][user] = hiddenObj[date][user] ? hiddenObj[date][user] : {};
							hiddenObj[date][user]['grp'+ret] = hiddenObj[date][user]['grp'+ret] ? hiddenObj[date][user]['grp'+ret] : [];

							hiddenObj[date][user]['grp'+ret].push( event );
							return;
					}
					
					eventObj[date][user]['grp'+ret].push( structuredClone( event ) );

					var oldStart = $L.moment( eventObjInfo[date][user]['grp'+ret].start, this.format ), oldEnd = $L.moment( eventObjInfo[date][user]['grp'+ret].end, this.format );
					var newStart = $L.moment( event.start, this.format ), newEnd = $L.moment( event.end, this.format );

					if( oldStart.fromNow( newStart ).past ){
						eventObjInfo[date][user]['grp'+ret].start = event.start;
					}
					if( !(oldEnd.fromNow( newEnd ).past) ){
						var newEnd = findMinDiffEvent({...event}, this.format, this.interval);
						eventObjInfo[date][user]['grp'+ret].end = newEnd.end;
					}
				}
				else{
					this.createNewGrp( event, eventObj[date][user], eventObjInfo[date][user], eventObj, eventObjInfo );
				}
			}
		}else{
			if( !eventObj[date] || !eventObjInfo[date] ){
				eventObj[date] = {};
				eventObjInfo[date] = {};
				this.createNewGrp( event, eventObj[date], eventObjInfo[date], eventObj, eventObjInfo  );
			}
			else{
				var ret = isEventIntersect( event, eventObjInfo[date], this.format );
				if( ret !== false ){
					var objLen = eventObj[date]['grp'+ret].length;

					if( objLen >= this.timelineMaxEvent ){
							hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
							hiddenObj[date]['grp'+ret] = hiddenObj[date]['grp'+ret] ? hiddenObj[date]['grp'+ret] : [];

							hiddenObj[date]['grp'+ret].push( event );
							return;
					}
					var cloneEvent = structuredClone( event );
					var start_date = createDateObj( event.start, this.format );
					var end_date = createDateObj( event.end, this.format );
					var start_format =  getFormatDate( start_date, 'DD-MM-YYYY' );
					var end_format =  getFormatDate( end_date, 'DD-MM-YYYY' );
					if(start_format != end_format && ( end_date.getHours() || end_date.getMinutes() )){
						this.createExentenedEvent( start_date, end_date, eventObj[date], cloneEvent, ret, eventObj, event, getFormatDate( end_date, 'DD-MM-YYYY' ) );
					}else{
						eventObj[ date ][ 'grp' + ret ].push( structuredClone( event ) );
					}
					var oldStart = $L.moment( eventObjInfo[date]['grp'+ret].start, this.format ), oldEnd = $L.moment( eventObjInfo[date]['grp'+ret].end, this.format );
					var newStart = $L.moment( event.start, this.format ), newEnd = $L.moment( event.end, this.format );

					if( oldStart.fromNow(newStart).past ){
						eventObjInfo[date]['grp'+ret].start = event.start;
					}
					if( !(oldEnd.fromNow(newEnd).past) ){
						var newEnd = findMinDiffEvent({...event}, this.format, this.interval);
						eventObjInfo[date]['grp'+ret].end = newEnd.end;
					}
				}
				else{
					this.createNewGrp( event, eventObj[date], eventObjInfo[date] );
				}
			}
		}
	}
	eventManipulator.prototype.createNewGrp = function( event, eventObj, eventObjInfo, parentElement ) {
		var len = Object.keys( eventObj ).length;
		eventObj[ 'grp' + len ] = [];
		var start_date = createDateObj( event.start, this.format );
		var end_date =  createDateObj( event.end, this.format );
		var start_format =  getFormatDate( start_date, 'DD-MM-YYYY' );
		var end_format =  getFormatDate( end_date, 'DD-MM-YYYY' );
		var cloneEvent = structuredClone( event );
		var grpEvent;
		eventObjInfo[ 'grp' + len ] = {
			start: event.start,
			end: event.end
		};
		if( !end_date.getHours() || !end_date.getMinutes() ){
			var newEnd = findMinDiffEvent( {...event}, this.format, this.interval );
			eventObjInfo[ 'grp' + len ].end = $L.moment( newEnd.end , this.format ).add( -1 , 'minutes' ).format( this.format );
		}
		if( start_format !== end_format && ( end_date.getHours() || end_date.getMinutes() ) ){
			if(!grpEvent){
				this.createExentenedEvent( start_date, end_date, eventObj, cloneEvent, len, parentElement, event, end_format )
			}
		}else{
			eventObj[ 'grp' + len ].push( structuredClone(event) );
		}
	}
	eventManipulator.prototype.createExentenedEvent = function( start_date, end_date, eventObj, cloneEvent, len, parentElement, event, end_format ){
		end_date = setDateTime( end_date, 0, 0, 0 );
		if( this.format ){
			cloneEvent._actualStart = $L.moment( end_date ).format( this.format );
		}else{
			cloneEvent._actualStart = getFormatDate( end_date, 'YYYY-MM-DDTHH:mm:ss' );
		}
		cloneEvent.start = cloneEvent._actualStart;
		cloneEvent._actualStart = event.start;
		cloneEvent.end = event.end;
		cloneEvent.id = 'dummy' + event.id;
		start_date = setDateTime( start_date, 23, 59, 59 );
		var orginalClone = structuredClone( event );
		orginalClone._actualEnd = event.end;
		if( this.format ){
			orginalClone.end = $L.moment( start_date ).format( this.format );
		}else{
			orginalClone.end = getFormatDate( start_date, 'YYYY-MM-DDTHH:mm:ss' );
		}
		
		orginalClone._editable = event.editable;
		eventObj[ 'grp' + len ].push( orginalClone );
		this.pushToEventObj( cloneEvent, end_format, this.timelineEventObj, parentElement );
	}
	eventManipulator.prototype.pushToTimeline = function( event, date, userid, isparticipant){
		var eventObj = this.timelineEventObj;
		var hiddenObj = this.hiddenObj;
		var user = userid ? userid : event.userid;
		var start = createDateObj( event.start , this.format );
		var end = createDateObj( event.end, this.format )
		var startDate = getFormatDate( start, 'DD-MM-YYYY' );
		var endDate = getFormatDate( end, 'DD-MM-YYYY' );
		var intervalMinutes = this.interval || 60;
		var hour = start.getHours(); 
		var minutes = start.getMinutes();
		var intervalSlotMinutes = Math.floor(minutes / intervalMinutes) * intervalMinutes;
		var timeAmPm = (hour >= 12 ? 'pm' : 'am');
		hour %= 12;
		hour = hour ? hour : 12;
		var start_time =  hour + ('0' + intervalSlotMinutes).slice(-2) + timeAmPm;
		 if(!eventObj[ startDate ]){
			eventObj[ startDate ] = {};
		}
		if(!eventObj[ startDate ][ user ]){
			eventObj[ startDate ][ user ] = {};
			eventObj[ startDate ][ user ].count = 0;
		}
		if( event.participantId && !isparticipant ){
			for( var Index = 0; Index < event.participantId.length; Index++ ){
				var participantEvent = event.participantId[ Index ];
				var clonedEvent = structuredClone( event );
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				this.pushToTimeline( clonedEvent, date, participantEvent.id, true )
			}
		}
		if(!eventObj[ startDate ][ user ][start_time]){
			eventObj[ startDate ][ user ][start_time] = [];
		}	
		var diffMs = end.getTime() - start.getTime();
		var diff =  Math.round( ( diffMs / 1000 ) / 60 )
		if( diff < 15 ){
			end.setMinutes( end.getMinutes() + ( 15 - diff ) );
		}
		var timelineArray = eventObj[ startDate ][ user ][ start_time ];
		var index = 0;
		for( index; index < timelineArray.length ; index++ ){
			var flag = false;
			for(var rowIndex = 0; timelineArray[ index ] && rowIndex  < timelineArray[ index ].length; rowIndex++){
				var existingEvent = timelineArray[ index ][ rowIndex ];
				if( existingEvent.hiddenid ){
					flag = true;
					continue;
				}
				if(!isinBetween( existingEvent.start, new Date( start.toString() ) , existingEvent.end, this.format, true, 15 ) && !isinBetween( existingEvent.start, new Date( start.toString() ), existingEvent.end, this.format, true, 15 ) ){
					flag = true;
				}else{
					flag = false;
					break;
				}
			}
			if(flag){
				break;
			}
		}
		var clonedEvent = structuredClone( event );
		if( startDate != endDate && ( end.getMinutes() || end.getHours() ) ){
			var exetendedEvent = this.createDayExentenedEvent( start, end, event );
			clonedEvent = exetendedEvent.orginalEvent;
			if( exetendedEvent ){
				this.pushToTimeline( exetendedEvent.cloneEvent, endDate, userid, isparticipant );
			}
		}
		if( this.timelineMaxEvent > eventObj[ startDate ][ user ][ start_time ].length || flag ){
			if(!eventObj[ startDate ][ user ][ start_time ][ index ]){
				eventObj[ startDate ][ user ][ start_time ][ index ] = [];
			}
			eventObj[ startDate ][ user ][ start_time ][ index ].push( structuredClone( event ) );
			var hour = end.getHours(); 
			
			timeAmPm = (hour >= 12 ? 'pm' : 'am');
			hour %= 12;
			hour = hour ? hour : 12;
	 		end_time = hour + timeAmPm;
			
			var currentTime = new Date( start.toString() );
			var startMinutes = currentTime.getMinutes();
			var nextIntervalMinutes = Math.ceil( ( startMinutes + 1 ) / intervalMinutes ) * intervalMinutes;
			currentTime.setMinutes( nextIntervalMinutes );
			currentTime.setSeconds( 0 );
			
			while( !isPast( currentTime, end ) && startDate == getFormatDate( currentTime, 'DD-MM-YYYY' ) ){
				hour = currentTime.getHours(); 
				minutes = currentTime.getMinutes();
				timeAmPm = ( hour >= 12 ? 'pm' : 'am' );
				hour %= 12;
				hour = hour ? hour : 12;
	 			start_time = intervalMinutes < 60 ? hour + ('0' + minutes).slice(-2) + timeAmPm : hour + timeAmPm;
				eventObj[ startDate ][ user ][ start_time ] = eventObj[ startDate ][ user ][ start_time ] ? eventObj[ startDate ][ user ][ start_time ] : [ ];
				var dummyEvent = structuredClone( clonedEvent );
				dummyEvent.hiddenid = true;
				if(!eventObj[ startDate ][ user ][ start_time ][index]){
					eventObj[ startDate ][ user ][ start_time ][index] = []
				}
				eventObj[ startDate ][ user ][ start_time ][index].push( dummyEvent );
				currentTime.setMinutes( currentTime.getMinutes() + intervalMinutes );
			}
			eventObj[ startDate ][ user ].count += 1; 
		}else{
			hiddenObj[ startDate ] = hiddenObj[ startDate ] ? hiddenObj[ startDate ] : { };
			if(!hiddenObj[ startDate ][ user ]){
				hiddenObj[ startDate ][ user ] = { };
			}
			hiddenObj[ startDate ][ user ] = hiddenObj[ startDate ][ user ] ? hiddenObj[ startDate ][ user ] : [ ];
			if(!hiddenObj[ startDate ][ user ][ start_time ]){
				hiddenObj[ startDate ][ user ][ start_time ] = [ ];
			}
			eventObj[ startDate ][ user ].count += 1; 
			hiddenObj[ startDate ][ user ][ start_time ].push( clonedEvent );
		}
		return eventObj;
	}
	eventManipulator.prototype.createDayExentenedEvent = function( start_date, end_date, event ){
		var cloneEvent = structuredClone( event );
		end_date = setDateTime( end_date, 0, 0, 0 );
		if( this.format ){
			cloneEvent._actualStart = $L.moment( end_date ).format( this.format );
		}else{
			cloneEvent._actualStart = getFormatDate( end_date, 'YYYY-MM-DDTHH:mm:ss' );
		}
		cloneEvent.start = cloneEvent._actualStart;
		cloneEvent._actualStart = event.start;
		cloneEvent.end = event.end;
		cloneEvent.id = 'dummy' + event.id;
		start_date = setDateTime( start_date, 23, 59, 59 );
		var orginalClone = structuredClone( event );
		orginalClone._actualEnd = event.end;
		if( this.format ){
			orginalClone.end = $L.moment( start_date ).format( this.format );
		}else{
			orginalClone.end = getFormatDate( start_date, 'YYYY-MM-DDTHH:mm:ss' );
		}
		
		orginalClone._editable = event.editable;
		return { orginalEvent : orginalClone, cloneEvent: cloneEvent };
	}
	getGetDeepArray = function(eventObj,format,interval){
		for (key in eventObj) {
			var prevElem = null;
			for( group in  eventObj[key] ){
				if(group == 'allday'){
					continue;
				}
				
				var depthArray = [];
				prevElem = null;
				eventObj[key][group].forEach(function(event){
					let placed = false;
					var intersectArray = [];
					var obj = {};
					obj.start = event.start;
					obj.end = event.end;
					obj = findMinDiffEvent( obj, format, interval );
					var depth;
					for (depth = 0; depth < depthArray.length; depth++) {
						var column = depthArray[depth];
						if(!event.intersect){event.intersect = [];}
						if (!column.some(prevEvent => {if(isBetweenEvents( prevEvent.start, obj.start, prevEvent.end, format , true ) || isBetweenEvents( prevEvent.start, obj.end, prevEvent.end, format, true ) ){  prevElem = prevEvent.event; intersectArray.push(prevEvent); return true;  }})) {
							obj.col = depth + 1;
							obj.event = event;
							if(prevElem){
								obj.prevElem = prevElem.id;
							} 
							column.push(obj);
							placed = true;
							break;
						}
					}
					if(depth < depthArray.length){
						for(var i = depth; i < depthArray.length; i++){
							var column = depthArray[depth];
							if(!event.intersect){
								event.intersect = [];
							}
							for( var index = 0; index < column.lenght; index++ ){
								prevEvent = column[index];
								if(isBetweenEvents( prevEvent.start, obj.start, prevEvent.end, format , true ) || isBetweenEvents( prevEvent.start, obj.end, prevEvent.end, format, true ) ){  
									intersectArray.push(prevEvent); 
								}
							}
						}
					}
					if (!placed) {
						obj.col = depthArray.length + 1;
						obj.event = event;
						if(prevElem){
							obj.prevElem = prevElem.id;
						} 
						depthArray.push([obj]);
					}
					intersectArray.forEach(function(intersect){
						if(!intersect.intersect){
							intersect.intersect = [];
						}
						if(!intersect.intersect.includes(obj.col)){
							intersect.intersect.push(obj.col);
						}
					})
				});
				depthArray.forEach(function(eventArray){
					eventArray.forEach(function(event){
						var index = event.col - 2;
						while(index >= 0 ){
							for(var i = 0; i < depthArray[index].length; i++){
								var depthevent = depthArray[index][i];
								if(isBetweenEvents( depthevent.start, event.start, depthevent.event.end, format ) || isBetweenEvents( depthevent.start, event.end, depthevent.event.end, format, true )){
									if(!depthevent.intersect){
										depthevent.intersect = [];
									}
									if(!depthevent.intersect.includes(event.col)){
										depthevent.intersect.push(event.col);
									}
									if(index == event.col - 2){
										event.prevElem = depthevent.event.id;
									}
								}
							}
							index--;
						}
						var index = event.col;
						var flag = true;
						while(index < depthArray.length && flag){
							for(var i = 0; i < depthArray[index].length; i++){
								var depthevent = depthArray[index][i];
								if(isBetweenEvents( depthevent.start, event.start, depthevent.end, format ) || isBetweenEvents( depthevent.start, event.end, depthevent.end, format, true )){
									event.nextIntersetCol = depthevent.col;
									flag = false;
									break;
								}
							}
							index++;
						}
					})
				})	
				eventObj[key][group] = depthArray;
			}
		}
		return eventObj;
	}
	findMinDiffEvent = function( event, format, interval ){
		var minDiff = interval / 4;
		var start = createDateObj( event.start, format );
		var end = createDateObj( event.end, format );
		var diffMs = end.getTime() - start.getTime();
		var diff =  Math.round((diffMs / 1000) / 60)
		if( diff < minDiff ){
			format = format ? format : 'YYYY-MM-DDTHH:mm:ss';
			event.end = $L.moment( event.start, format ).add( minDiff , 'minutes' ).format( format );
		}
		return event;
	}
	getFormatDate = function(date,format){
		var Mregex = /MM/;
		var Dregex = /DD/;
		var Yregex = /YYYY/;
		var Hregex = /HH/;
		var mregex = /mm/;
		var sregex = /ss/;
		format = format.replace(Hregex, ('0' + date.getHours()).slice(-2) );
		format = format.replace(mregex, ('0' + date.getMinutes()).slice(-2) );
		format = format.replace(sregex, ('0' + date.getSeconds()).slice(-2) );
		format = format.replace(Mregex, ('0' + (date.getMonth() + 1)).slice(-2) );
		format = format.replace(Dregex, ('0' + date.getDate()).slice(-2) );
		format = format.replace(Yregex, date.getFullYear());
		return format;
	}
	createDateObj = function(date,format){
		if(format == ''){
			return new Date(date); 
		}
		return $L.moment(date,format).getDObj();
	}
	isPast = function(start_date,end_date){
		return end_date < start_date;
	}
	isAllDay = function(start_date,end_date){
		const diffInMilliseconds = Math.abs(end_date - start_date);
		const diffInSeconds = diffInMilliseconds / 1000;
		if( diffInSeconds >= 86399 ){
			return true;
		}
		return false;
	}
	isEventIntersect = function( event, eventObjInfo, format){
		var ind = 0;
		if(Object.keys(eventObjInfo).length === 0){
			return false;
		}
		for( var key in eventObjInfo ){
			var cur = eventObjInfo[key];

			if( isBetweenEvents( cur.start, event.start, cur.end, format ) || isBetweenEvents( cur.start, event.end, cur.end, format ) ){
				return ind;
			}
			ind += 1;
		}
		return false;
	}

	setDateTime = function(date, hours, minutes, seconds) {
		var date = new Date(date.toString());
		if(hours !== undefined){
			date.setHours(hours);
		}
		if(minutes !== undefined){
			date.setMinutes(minutes);
		}
		if(seconds !== undefined){
			date.setSeconds(seconds);
		}
		return date;
	}
	isBetweenEvents = function( start, curr_date, end, format ,isequal) {
		function parseTime(timeStr) {
			if(format == ''){
				return new Date(timeStr);
			}else{
				return $L.moment(timeStr,format).getDObj();
			}
		}
	
		const time = parseTime(curr_date);
		start = parseTime(start);
		end = parseTime(end);
		if (start < end) {
			if(isequal){
				return start <= time && time <= end;
			}else{
				return start <= time && time < end;
			}
			
		} else { // Over midnight scenario
			if(isequal){
				return start <= time || time <= end;
			}else{
				return start <= time && time <= end;
			}
		}
	}
	eventManipulator.prototype.isinBetween = function(date,eventObj,event,indexDate,view,format , weekStart, isMultiUser , maxEvent){
		return isinBetween(date,eventObj,event,indexDate,view,format , weekStart, isMultiUser , maxEvent);
	}
	isinBetween =  function(start , curr_date, end, format, isfullformat, MinimumMin){
		if(!isfullformat){
			format = 'DD-MM-YYYY';
		}
		var start = createDateObj(start,format);
		var end =  createDateObj(end,format);
		if(typeof curr_date == 'string'){
			var curr_date = createDateObj(curr_date,format);
		}
		if(MinimumMin){
			var diffMs = end.getTime() - start.getTime();
			var diff =  Math.round((diffMs / 1000) / 60)
			if(diff < MinimumMin){
				end.setMinutes(end.getMinutes()+(MinimumMin - diff))
			}
		}
		return !isPast(start,curr_date) && isPast(end,curr_date);
	}
	findStartOfWeek = function(date, weekStart){
		var start_diff = date.getDay()  - weekStart  ;
		if( date.getDay() > weekStart ){
			return new Date(date.setDate(date.getDate() - (start_diff)));
		}else{
			return new Date(date.setDate(date.getDate() - ((7 + start_diff) % 7)));
		}
  	}
	parseDate = function(dateString) {
		// Define regex patterns for the date formats
		const patterns = [
			{ regex: /^(\d{2})-(\d{2})-(\d{4})$/, format: 'DD-MM-YYYY' },
			{ regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: 'MM/DD/YYYY' },
			{ regex: /^(\d{4})-(\d{2})-(\d{2})$/, format: 'YYYY-MM-DD' },
			{ regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: 'DD/MM/YYYY' },
			{ regex: /^(\d{4})\/(\d{2})\/(\d{2})$/, format: 'YYYY/MM/DD' }
		];
	
		for (const pattern of patterns) {
			const match = dateString.match(pattern.regex);
			if (match) {
				const [_, d1, d2, d3] = match;
				let day, month, year;
	
				switch (pattern.format) {
					case 'DD-MM-YYYY':
					case 'DD/MM/YYYY':
						[day, month, year] = [d1, d2, d3];
						break;
					case 'MM/DD/YYYY':
						[month, day, year] = [d1, d2, d3];
						break;
					case 'YYYY-MM-DD':
					case 'YYYY/MM/DD':
						[year, month, day] = [d1, d2, d3];
						break;
				}
	
				return new Date(`${year}-${month}-${day}`);
			}
		}
	
		throw new Error('Invalid date format');
	}
	eventManipulator.prototype.findOverdueActivity = function(eventObj,event,start,user){
		var startDate= parseDate(start);
		if(this.format){
			var endDate = $L.moment(event.end,this.format).getDObj();
		}else{
			var endDate = new Date(event.end);
		}
		
		var count = 0
		for( const dateObj in eventObj){
			if(user){
				if(!eventObj[dateObj][user]){
					continue;
				}
			}
			var currentDate = parseDate(dateObj);
			var currenDate_end = new Date(currentDate);
			currenDate_end.setHours(23,59,59,999);
			currentDate.setHours(0,0,0,0);
			if( currentDate < endDate && (startDate < currenDate_end)){
				if(user){
					dummyArray = eventObj[dateObj][user];
				}else{
					dummyArray = eventObj[dateObj];
				}
				for(var index = 0 ; index < dummyArray.length ; index++){
					var event = dummyArray[index];
					if(event && event.overdue){
						count = dummyArray.length;
					}
				}
			}
			
		}
		return count;

	}
	findEmpty = function( eventObj ){
		for(var index = 0 ; index < eventObj.length ; index++){
			var event = eventObj[index];
			if(!event){
				return index;
			}
		}
		return undefined;
	}
	findStartOfWorkingDay = function(date,businessDays){
		var newStart = $L.moment( date );
		while( !businessDays.includes(newStart.get('day')) ){
			newStart.set('date',newStart.get('date')+1);
		}
		return newStart.getDObj();
	} 
	findIndex = function(eventArray,id){
		var index = 0;
		for(;eventArray && index < eventArray.length ; index++){
			if(eventArray[index] && eventArray[index].id == id){
				return index;
			}
		}
		return index - 1;

	}
	_lyteUiUtils.eventManipulator = eventManipulator;
} )();
