Lyte.Component.register("crux-calendar", {
_template:"<template tag-name=\"crux-calendar\"> <lyte-calendar nav-yield=\"true\" lt-prop-current-date=\"{{lbind(cxPropCurrentDate)}}\" lt-prop-format=\"{{cxPropFormat}}\" lt-prop-body-yield=\"true\" lt-prop-fill-rows=\"true\" lt-prop-min-date=\"{{cxPropMinDate}}\" lt-prop-max-date=\"{{cxPropMaxDate}}\" lt-prop-number-of-rows=\"6\" show-today=\"false\" lt-prop-header-type=\"drilldown\" viewtype=\" \"> <template is=\"registerYield\" yield-name=\"navigator\"> <div class=\"lyteCalendarNavigator\"> <span class=\"yearAndMonthNav\" onclick=\"{{action('viewChange',event)}}\"> <span class=\"cruxCalsCalMonth\">{{selectedMonth}}</span> <span class=\"cruxCalsCalYear\">{{selectedYear}}</span> </span> <span class=\"navigation cxCalHeaderNavIcons\"> <span class=\"cruxCalNav\" onclick=\"{{action('previous',event)}}\"> <span class=\"cxCalNavIconPrev\"></span> </span> <span class=\"cruxCalNav\" onclick=\"{{action('current',event)}}\"> <span class=\"cxCalNavIconCur\"></span> </span> <span class=\"cruxCalNav\" onclick=\"{{action('next',event)}}\"> <span class=\"cxCalNavIconNext\"></span> </span> </span> </div> </template> <template is=\"registerYield\" yield-name=\"body\"> <div class=\"cruxCalTableContainer weekTable\"> <div class=\"cruxCalTableRowHeader\"> <template items=\"{{daysOfWeek}}\" item=\"day\" index=\"idod\" is=\"for\"> <div class=\"cruxCalTableCellHeader\">{{lyteUiI18n(day)}}</div> </template> </div> </div> <div class=\"cruxCalContainer\"> <div class=\"cruxMonthContainer\"> <div class=\"dummy1\"></div> <template is=\"for\" items=\"{{arrayOfMonths}}\" item=\"matrix\" index=\"monthid\"> <div class=\"cxCalSingleMonth_{{monthid}} cxSingleMonth_{{matrix['month']}} cxCalMonthContainer\" monthid=\"{{monthid}}\" year=\"{{matrix['year']}}\" month=\"{{matrix['month']}}\" name=\"{{matrix['name']}}\"> <div class=\"cruxCalTableContainer\"> <div class=\"cruxCalTableRowGroup\"> <template is=\"for\" items=\"{{matrix['dates']}}\" item=\"vector\" index=\"rowid\"> <template is=\"if\" value=\"{{lyteUiCheckEmpty(vector)}}\"><template case=\"true\"> <template case=\"false\"> <div class=\"cruxCalTableRow\"> <template items=\"{{vector}}\" item=\"date\" index=\"cellid\" is=\"for\"> <template is=\"if\" value=\"{{lyteUiCheckInRange(cxPropMinDate,cxPropMaxDate,date.val,cxPropFormat)}}\"><template case=\"true\"> <template case=\"true\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"><template case=\"true\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template></template> </template> <template case=\"false\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"><template case=\"true\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template></template> </template> </template></template> </template> </div> </template> </template></template> </template> </div> </div> </div> </template> </div> <div class=\"cruxCalYearContainer\"> <div class=\"dummy2\"></div> <template is=\"for\" items=\"{{arrayOfYear}}\" item=\"val\" index=\"index\"> <div class=\"cxSingleYear cxSingleYear_{{index}}\" year=\"{{val['year']}}\"> <span class=\"cxYearHeader\">{{val['year']}}</span><br> <span class=\"cruxCalTableRowGroup\"> <template is=\"for\" items=\"{{val['months']}}\" item=\"row\" index=\"rowIndex\"> <div class=\"cruxCalTableRow\"> <template is=\"for\" items=\"{{row}}\" item=\"column\" index=\"columnIndex\"> <div onclick=\"{{action('monthSelected',event)}}\" class=\" cruxYearTableCel {{column['class']}}\" year=\"{{column['year']}}\" month=\"{{column['systemValue']}}\"> {{column['displayValue']}} </div> </template> </div> </template> </span> </div> </template> </div> </div> </template> </lyte-calendar> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,3,0]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"attr","position":[1,3,5]}]},{"type":"registerYield","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"attr","position":[3,1,3]},{"type":"for","position":[3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}]},{"type":"attr","position":[3,3,3]},{"type":"for","position":[3,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,4,1]},{"type":"for","position":[1,4,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}]}]}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["currentYear","currentMonth","cxPropCurrentDate","cxPropFormat","today","viewDate","viewType","arrayOfYear","arrayOfMonths","cxPropStartWeekDay","cxPropMinDate","cxPropMaxDate","daysOfWeek","offsetArr","selectedMonth","selectedYear","scrollEvent","initialScrollTop","nextDate","prevDate","nextYear","prevYear","transformHeight","transCount","initialScrollHeight","prevScrollHeight","initialScroll","prevScroll","dummyHeight","preventMultiClick","monthSystemValues","monthNames","shortHands"],
_observedAttributesType :["string","string","string","string","object","object","string","array","array","number","string","string","array","array","string","string","boolean","number","object","object","number","number","number","number","number","number","boolean","string","number","boolean","array","array","array"],
 //No I18n
	data : function(){
		return {
			currentYear : Lyte.attr("string"),//No I18n
			currentMonth : Lyte.attr("string",{'default' : ''}),//No I18n
			cxPropCurrentDate : Lyte.attr("string",{'default' : ''}),//No I18n
			cxPropFormat : Lyte.attr( 'string', {default : 'MM/DD/YYYY'} ),//No I18n
			today : Lyte.attr("object",{'default' : new Date()}),//No I18n
			viewDate : Lyte.attr("object",{'default' : {}}),//No I18n
			viewType : Lyte.attr("string",{'default' : ''}),//No I18n
			arrayOfYear : Lyte.attr("array",{'default' : []}),//No I18n
			arrayOfMonths : Lyte.attr("array",{'default' : []}),//No I18n
			cxPropStartWeekDay : Lyte.attr( 'number', { 'default': 0 } ),//No I18n
			cxPropMinDate : Lyte.attr("string",{'default' : ''}),//No I18n
			cxPropMaxDate : Lyte.attr("string",{'default' : ''}),//No I18n
			daysOfWeek : Lyte.attr("array",{'default' : []}),//No I18n
			offsetArr : Lyte.attr("array",{'default' : []}),//No I18n
			selectedMonth : Lyte.attr("string",{'default' : ''}),//No I18n
			selectedYear : Lyte.attr("string",{'default' : ''}),//No I18n
			scrollEvent : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			initialScrollTop  : Lyte.attr("number"),//No I18n
			nextDate : Lyte.attr("object",{'default' : {}}),//No I18n
			prevDate : Lyte.attr("object",{'default' : {}}),//No I18n
			nextYear : Lyte.attr("number"),//No I18n
			prevYear : Lyte.attr("number"),//No I18n
			transformHeight : Lyte.attr("number",{'default' : 0}),//No I18n
			transCount : Lyte.attr("number",{'default' : 0}),//No I18n
			initialScrollHeight : Lyte.attr("number"),//No I18n
			prevScrollHeight : Lyte.attr("number"),//No I18n
			initialScroll : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			prevScroll :  Lyte.attr("string",{'default' : ''}),//No I18n
			dummyHeight : Lyte.attr("number",{'default' : 0}),//No I18n
			preventMultiClick : Lyte.attr( 'boolean', {'default': false } ),//No I18n
			monthSystemValues : Lyte.attr( 'array', {  	 //No I18n
				'default': [							 //No I18n
					'January',							 //No I18n
					'February',							 //No I18n
					'March',							 //No I18n
					'April',							 //No I18n
					'May',								 //No I18n
					'June',								 //No I18n
					'July',								 //No I18n
					'August',							 //No I18n
					'September',						 //No I18n
					'October',							 //No I18n
					'November',							 //No I18n
					'December' 							 //No I18n
				]										 //No I18n
			} ), 										//No I18n
			monthNames : Lyte.attr( 'array', { 			//No I18n
				'default': [							//No I18n
					'January',							//No I18n
					'February',							//No I18n
					'March',							//No I18n
					'April',							//No I18n
					'May',								//No I18n
					'June',								//No I18n
					'July',								//No I18n
					'August',							//No I18n
					'September',						//No I18n
					'October',							//No I18n
					'November',							//No I18n
					'December' 							//No I18n
				]										//No I18n
			} ),										//No I18n
			shortHands : Lyte.attr( 'array', { 			//No I18n
				'default': [							//No I18n
				'Jan',									//No I18n
				'Feb',									//No I18n
				'Mar',									//No I18n
				'Apr',									//No I18n
				'short.may',							//No I18n
				'Jun',									//No I18n
				'Jul',									//No I18n
				'Aug',									//No I18n
				'Sep',									//No I18n
				'Oct',									//No I18n
				'Nov',									//No I18n
				'Dec'									//No I18n
				]										//No I18n
			} )											//No I18n
		}		
	},
	init : function(){
		//this.getMonthHeader();
	},
	didConnect : function(){
		// this.$node.querySelector( 'lyte-calendar' ).component.setData( 'viewType', ' ' );
	 //    this.$node.querySelector( 'lyte-calendar' ).component.setData( 'ltPropHeaderType', 'drilldown' );
		// this.$node.querySelector( 'lyte-calendar' ).component.setData( 'showToday', false );
		this.lyteCal = this.$node.querySelector( 'lyte-calendar' ); //No I18n
		this.lyteCal.component.setData( 'showToday', false );//No I18n
		this.setData("viewDate",this.lyteCal.component.data.viewDate);//No I18n
		this.isMomentSupported = $L('lyte-calendar' , this.$node)[0].component.isMomentSupported;
		$L('.cruxCalYearContainer',this.$node)[0].classList.add('cxdN');//No I18n
		$L('.cruxCalContainer',this.$node)[0].style.height = '228px';
		$L('.cruxCalContainer',this.$node)[0].style.overflow = 'hidden';
		$L(".cruxMonthContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true, min : -20,max : 20});//No I18n
		$L(".cruxCalYearContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true,min : -20,max : 30});//No I18n
		this.changeDaysOfWeek();
		this.setCurrentDate();
		this.buildInitialDateViewContent();
	},
	actions : {
		viewChange : function(event){
			if(!this.getData('preventMultiClick')){
				this.setData('preventMultiClick',true);var _this = this;//No I18n
				if(this.getData('viewType') === 'dateView'){//No I18n
					this.showMonthAndYear(this.getData('selectedYear'),'viewChange'); //No I18n
				}else{
					this.showDateView('viewChange');//No I18n
				}
				setTimeout(function(){
					_this.getMethods( 'onViewChange' ) && _this.executeMethod( 'onViewChange');//No I18n
				},500);
			}

		},
		previous : function(val,event){
			if (!this.getData('preventMultiClick')) {
				this.setData('preventMultiClick',true);var _this = this;//NO I18n
				if(this.getData('viewType') === 'dateView'){
					if(!this.getData('initialScroll') || this.getData('transformHeight') < 0){
							this.navScroll('up',1);//No I18n
					}else{
						this.scrollToFn('cruxMonthContainer',1,400);//No I18n
					}
				}else{
					if(!this.getData('initialScroll') || this.getData('transformHeight') < 0 ){
						this.navScroll('up',0);//No I18n
					}else{
						this.scrollToFn('cruxCalYearContainer',0,500);//No I18n
					}	
				}
			}
		},
		next : function(val,event){
			if (!this.getData('preventMultiClick')) {
				this.setData('preventMultiClick',true);var _this = this;//NO I18n
				if(this.getData('viewType') === 'dateView'){
					if(this.getData('transformHeight') <= 0 && this.getData('initialScroll')){
							this.navScroll('down',3);//No I18n
					}else{
						this.scrollToFn('cruxMonthContainer',3,400);//No I18n
					}
				}else{
					if(this.getData('transformHeight') <= 0 && this.getData('initialScroll')){
						this.navScroll('down',6);//No I18n
					}else{
						this.scrollToFn('cruxCalYearContainer',6,500);//No I18n
					}
				}
			}
		},
		current : function(val,event){
			this.setData('navChange',true);//No I18n
			var today = this.getData('today');//No I18n
			this.redirectDate(today);

		},
		monthSelected : function(event){
			var target = event.target , ele;
			ele = this.$node.getElementsByClassName( 'selectedMonth' );//No I18n
			this.lyteCal.component.setData( 'showToday', false );//No I18n
			if( ele.length !== 0 ) {
				ele[0].classList.remove( 'cxCalSelMonth' );
			}
			currentSelectedyear = target.getAttribute('year'),
			currentSelectedMonth = target.getAttribute( 'month' );
			selectedMonth = this.getData( 'monthSystemValues' ).indexOf( currentSelectedMonth ) + 1;//No I18n
			this.setData( 'viewDate', new Date( selectedMonth + '/1/' + parseInt(currentSelectedyear )) );//No I18n
			//viewDate = this.getData("viewDate");
			this.setData("selectedYear",currentSelectedyear);//No I18n
			this.setData("selectedMonth",currentSelectedMonth);//No I18n
			$L('.lyteCalendarNavigator',this.$node)[0].classList.remove('cxHeaderBack');//No I18n
			this.buildInitialDateViewContent('viewChange');//No I18n
		},
		dateSelected : function(event){
			var target = this.getProper( event.target ), ele;
			if( event.button !== 0 ) {
				return ;
			}

			ele = this.$node.getElementsByClassName( 'lyteCalSel' ); //NO I18n
			if( ele.length !== 0 ) {
				ele[0].classList.remove( 'lyteCalSel' );
			}
			var date = target.getAttribute( 'data-date' );
			this.setData( 'preventObs', true );//No I18n
			this.setData( 'cxPropCurrentDate', date); //NO I18n
			this.setData( 'preventObs', false );//No I18n
			this.setData('viewDate',this.stringToDate(date, this.data.cxPropFormat));//No I18n
			target.classList.add( 'lyteCalSel' );//NO I18n
			if( this.getMethods( 'onDateSelected' ) ) {//NO I18n
				this.executeMethod( 'onDateSelected', event, target.getAttribute( 'data-date' ), this );//NO I18n
			}
		}
	},
	// addScrollEvents : function(){
	// 	$L(".cruxMonthContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true, min : -20,max : 20});
	// 	$L(".cruxCalYearContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true,min : -20,max : 30});
	// 	this.addMonthEvent();
	// 	this.addYearEvent();
	// },
	addMonthEvent : function(){
		var _this = this;
		$L(".cruxMonthContainer",this.$node).get( 0 ).addEventListener('scroll', function (event) {//No I18n
		if($L(".cruxMonthContainer",_this.$node)[0] && $L(".cruxMonthContainer",_this.$node)[0].scrollTop > _this.getData("prevScrollHeight")){
			if(_this.scroll){
				_this.addMonthWhenScroll("down");//No I18n
			}
		}else if(_this.getData("prevScrollHeight") > $L(".cruxMonthContainer" , this.$node)[0].scrollTop && _this.scroll){ //No I18n
			_this.addMonthWhenScroll("up");//No I18n
		}else{
			return
		}
		_this.setData('prevScrollHeight',$L(".cruxMonthContainer",_this.$node)[0].scrollTop);//No I18n
		}, false);
	},
	addYearEvent : function(){
		var _this = this;
		$L(".cruxCalYearContainer",this.$node).get( 0 ).addEventListener('scroll', function (event) {//No I18n//No I18n
		if($L(".cruxCalYearContainer",_this.$node)[0] && $L(".cruxCalYearContainer",_this.$node)[0].scrollTop > _this.getData("prevScrollHeight")){
			if(_this.scroll){
				_this.addYearWhenScroll("down");//No I18n
			}
		}else if(_this.getData("prevScrollHeight") > $L(".cruxCalYearContainer",_this.$node)[0].scrollTop){//No I18n
			if(_this.scroll){
				_this.addYearWhenScroll("up");//No I18n
			}
		}else{
			return
		}
		_this.setData('prevScrollHeight',$L(".cruxCalYearContainer",_this.$node)[0].scrollTop);//No I18n
		}, false);
	},
	getCalInitialData : function(){
		this.setCurrentDate(); 
		this.buildInitialDateViewContent(); 
	},
	scrollToFn : function(container,count,dur){
		var _this = this;
		$L('.' + container,this.$node).scrollTo(this.getData('offsetArr')[count].offsetTop,{ duration :  dur,
			onAfter : function(){
				_this.setData('preventMultiClick',false);//NO I18n
		}});
	},
	redirectDate : function(date,bool){
		var crMonth = date.getMonth(), crYear = date.getFullYear(),offsetArr = this.getData('offsetArr');//No I18n
		if(this.getData('viewType') === 'dateView'){
			var slYear1 = offsetArr[2].year,slMonth1 = offsetArr[2].month; //NO I18n
			var slYear2 = offsetArr[1].year , slMonth2 = offsetArr[1].month, slYear3 = offsetArr[3].year, slMonth3 = offsetArr[3].month;
			// date.getFullYear() , "currentMonth" : this.getData("monthNames")[date.getMonth()]
			if(slYear1 == crYear && slMonth1 == crMonth){	
				if(!bool){
					$L('.cruxMonthContainer',this.$node).scrollTo(offsetArr[2].offsetTop,{ duration :  300});
					this.setData('navChange',false);//No I18n
				}else{
					this.asld('', true);
				}
			}else if (slYear2 == crYear && slMonth2 == crMonth) {
				!bool ? this.navScroll('up',1) : this.autoScrollToFn(offsetArr,'cruxMonthContainer',1,'',true);//No I18n
			}else if (slYear3 == crYear && slMonth3 == crMonth) {
				!bool ? this.navScroll('down',3) : this.autoScrollToFn(offsetArr,'cruxMonthContainer',3,'',true);//No I18n
			}else{
				date.setDate(1);
				this.setData('viewDate',date);//No I18n
				this.scroll = false;var _this = this;
				_this.setCurrentDate()
				if(crYear < slYear1 || (crYear == slYear1 && crMonth < offsetArr[2].month)){
					this.autoScrollToFn(offsetArr,'cruxMonthContainer',0,'',true);//No I18n
				}else{
					this.autoScrollToFn(offsetArr,'cruxMonthContainer',4,'',true);//No I18n
				}
			}

		}else{
			date.setDate(1);
			this.setData('viewDate',date);//No I18n
			this.setCurrentDate();
			this.addClass();
			if(crYear == offsetArr[4].year){
				if(!bool){
					$L('.cruxCalYearContainer',this.$node).scrollTo(offsetArr[3].offsetTop,{ duration :  300});
					this.setData('navChange',false);//No I18n
				}else{
					this.asld(crYear, false);
				}
			}else if(crYear == offsetArr[3].year){
				!bool ? this.navScroll('up',2,1) : this.autoScrollToFn(offsetArr,'cruxCalYearContainer',2,crYear);//No I18n
			}else if(crYear == offsetArr[5].year){
				!bool ? this.navScroll('down',4,1) : this.autoScrollToFn(offsetArr,'cruxCalYearContainer',4,crYear);//No I18n
			}else{
				this.scroll = false;var _this = this;
				if(crYear < offsetArr[3].year){
					this.autoScrollToFn(offsetArr,'cruxCalYearContainer',0,crYear);//No I18n
				}else{
					this.autoScrollToFn(offsetArr,'cruxCalYearContainer',6,crYear);//No I18n
				}
			}
		}
	},
	addClass : function(){
		var addCl = $L('.cxCalCurMonth',this.$node)[0], remCl = $L('.cxCalSelMonth',this.$node)[0];
		addCl && remCl && remCl.classList.remove('cxCalSelMonth');//No I18n
		addCl && remCl && addCl.classList.add('cxCalSelMonth');//No I18n
	},
	asld : function(crYear,flag){
		flag ? this.buildInitialDateViewContent() : this.showMonthAndYear(crYear);
	},
	autoScrollToFn : function(offsetArr,container,count,crYear,flag){
		this.scroll = false;var _this = this;
		$L('.'+container,this.$node).scrollTo(offsetArr[count].offsetTop,{ duration :  300,
			onAfter  : function (){
				_this.asld(crYear,flag);
				_this.scroll = true;
				this.setData('navChange',false);//No I18n
		}});
	},
	getProper : function(elem){
		while( elem && !elem.classList.contains( 'cruxCalTableCell' ) ) {//NO I18n
			elem = elem.parentElement; //lyteCalTableCell
		}
		return elem;
	},
	navScroll : function(direction,offsetCount,itrCount){
		var _this = this;
		_this.scroll = false;
		_this.setData('navChange',true);//No I18n
		if(this.getData('viewType') === 'dateView'){
			$L('.cruxMonthContainer',this.$node).scrollTo(this.getData('offsetArr')[offsetCount].offsetTop,{ duration :  300,//No I18n
				onAfter  : function (){
					_this.addMonthWhenScroll(direction);
					_this.scroll = true;
					_this.setData('navChange',false);//No I18n
					_this.setData('preventMultiClick',false);//No I18n
			 }});
		}else{
			if(!itrCount){ itrCount = 3; }
			$L('.cruxCalYearContainer',this.$node).scrollTo(this.getData('offsetArr')[offsetCount].offsetTop,{ duration :  500,//No I18n
				onAfter  : function (){
					if(direction === 'up'){
						var year = _this.getData('offsetArr')[2].year;
						for(var i = 0 ; i < itrCount ; i++){
							var obj = {'year' : year};//No I18n
							_this.addYearWhenScroll(direction,obj);//No I18n
							year = year - 1;
						}
					}else{
						var year = _this.getData('offsetArr')[4].year;
						for(var i = 0 ; i < itrCount ; i++){
							var obj = {'year' : year};//No I18n
							_this.addYearWhenScroll(direction,obj);//No I18n
							year = year + 1;
						}
					}
					_this.scroll = true;
					_this.setData('preventMultiClick',false);//No I18n
					_this.setData('navChange',false);//No I18n
			 }});
		}
	},
	showDateView : function(type){
		$L('.lyteCalendarNavigator',this.$node)[0].classList.remove('cxHeaderBack');//No I18n
		var month = this.getData('monthNames').indexOf(this.getData('selectedMonth')) + 1//No I18n
		this.setData( 'viewDate', new Date( month + '/1/' + parseInt(this.getData('selectedYear')) ) );//No I18n
		this.buildInitialDateViewContent(type);
	},
	buildInitialDateViewContent : function(type){
		var _this = this;
		this.setData('arrayOfMonths',[]);//No I18n
		this.buildInitialDateView();
		$L(".dummy1",this.$node)[0].style.height = "0px";
		this.setData('viewType',"dateView");//No I18n
		if(type == 'viewChange'){
			this.scrollAnimation('dateView');
		}else{
			$L('.lyteCalendarNavigator',this.$node)[0].classList.remove('cxHeaderBack');//No I18n
			$L('.weekTable',this.$node)[0].classList.remove('cxdN');//No I18n
			$L('.cruxMonthContainer',this.$node)[0].classList.remove('cxdN');//No I18n
			$L('.cruxCalContainer',this.$node)[0].style.height = '228px';
			this.bindMonthData();
		}
	},
	showMonthAndYear : function(selectedYear,type){
		this.setData('arrayOfYear',[]);//No I18n
		this.buildInitialYearView(selectedYear);
	    this.setData('viewType', "yearView");//No I18n
	    if(type == 'viewChange'){
	    	this.scrollAnimation('yearView',selectedYear);
		}else{
			$L('.cruxCalContainer',this.$node)[0].style.height = '315px';
			this.bindYearData(selectedYear);
		}
	},
	bindYearData : function(selectedYear){
		$L(".dummy1",this.$node)[0].style.height = "0px";
		$L(".dummy2",this.$node)[0].style.height = "0px";
		this.setData("initialScrollTop",$L(".cxSingleYear_3",this.$node)[0].offsetTop);//No I18n
		$L(".cruxCalYearContainer",this.$node)[0].scrollTop = this.getData('initialScrollTop');//No I18n
	    this.setData({'arrayOfMonths': [], 'offsetArr' : [],'transCount' : 0,'initialScroll' : false,'transformHeight' : 0,'dummyHeight' : 0,'navChange' : false});//No I18n
		this.getCurrentOffsets("initial",'',9,'cxSingleYear','yearView');//No I18n
	    var displayYear = parseInt(selectedYear) - 1;
	    // $L(".cruxCalYearContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true,min : -20,max : 30});
		var height = $L(".cruxCalYearContainer",this.$node)[0].scrollHeight;
		this.setData('previousYear',displayYear)//No I18n
		this.scroll = true;
		this.setData({'initialScrollHeight' : height , 'prevScrollHeight' : $L(".cruxCalYearContainer" , this.$node)[0].scrollTop}); //eslint-disable-line @zoho/webperf/layout-thrashing
		this.addYearEvent();
	},
	bindMonthData : function(){
		$L(".dummy1",this.$node)[0].style.height = "0px";
		$L(".dummy2",this.$node)[0].style.height = "0px";
		$L(".cruxMonthContainer",this.$node)[0].scrollTop = $L(".cxCalSingleMonth_2",this.$node)[0].offsetTop;
		this.setData("initialScrollTop",$L(".cxCalSingleMonth_2",this.$node)[0].offsetTop); //No I18n
		// $L(".cruxMonthContainer",this.$node).scroll({ preventVertical  : true,preventHorizontal  : true, min : -20,max : 20});
		this.setData({'arrayOfYear': [], 'offsetArr' : [],'transCount' : 0,'initialScroll' : false,'transformHeight' : 0,'dummyHeight' : 0,'navChange' : false});//No I18n
		this.getCurrentOffsets("initial",'',5,'cxCalSingleMonth','dateView');//No I18n
		var height = $L(".cruxMonthContainer",this.$node)[0].scrollHeight;
		//$L(".cruxMonthContainer",this.$node)[0].scrollTop = $L(".cxCalSingleMonth_2")[0].offsetTop;
		this.scroll = true;
		this.setData({'initialScrollHeight' : height , 'prevScrollHeight' : $L(".cruxMonthContainer",this.$node)[0].scrollTop});//No I18n
		this.addMonthEvent();
	},
	buildInitialYearView : function(displayYear){
		var year = displayYear - 4, arrayOfYear = [];
		for(var i=0;i < 9 ;i++){
			var currentMonth = "",selectedMonth = "";
			if(this.getData('currentYear') == year){
				var currentMonth = this.getData('currentMonth');//No I18n
			}
			if(this.getData('selectedYear') == year){
				var selectedMonth = this.getData('selectedMonth');//No I18n
			}
			var monthList = this.buildYearView(year,currentMonth,selectedMonth);
			arrayOfYear.push(monthList);
			//Lyte.objectUtils(this.getData('arrayOfYear'),'add',year,{result : monthList});
			year = year + 1;
		}
		this.setData('arrayOfYear',arrayOfYear);//No I18n
		this.setData('nextYear',arrayOfYear[8].year);//No I18n
		this.setData('prevYear',arrayOfYear[0].year);//No I18n
	},
	buildYearView : function(year ,currentMonth,selectedMonth){
	    var systemValues = this.getData( 'monthSystemValues' ),//No I18n
	    displayValue = this.getData( 'shortHands' ),//No I18n
	    rowCount = 2, columnCount = 6,
	    columnIterator,
	    result = [], indexOfMonth;
	    var rowIterator = 0,result = [];
		    for( ; rowIterator < rowCount; rowIterator++ ) {
		      result.push( [] );

		      for( columnIterator = 0; columnIterator < columnCount; columnIterator++ ) {
		        indexOfMonth = ( rowIterator * columnCount ) + columnIterator;

		        result[ rowIterator ].push( 
		          {
		            displayValue: _lyteUiUtils.i18n( displayValue[ indexOfMonth ] ),
		            systemValue: systemValues[ indexOfMonth ],
		            // class: this.getProperClassForMonthView( indexOfMonth ),
		            year : year,
		            class : selectedMonth && selectedMonth === systemValues[ indexOfMonth ] ? 'cxCalSelMonth' : currentMonth && currentMonth === systemValues[ indexOfMonth ] ? 'cxCalCurMonth' : '' //No I18n
		          } 
		        );
		      }
		    }
		    return {'year' : year,'months' : result};//No I18n
		},
	scrollAnimation : function(viewType,selectedYear){
		var _this = this;
		this.scroll = false;
		if(viewType === 'dateView'){
			$L('.cruxCalContainer',this.$node)[0].style.height = '228px';
			$L(".cruxMonthContainer",this.$node)[0].scrollTop = $L(".cxCalSingleMonth_2",this.$node)[0].offsetTop;
			$L('.cruxMonthContainer',this.$node)[0].style.transform = "translateY(-228px)";//No I18n
			$L('.cruxCalYearContainer',this.$node)[0].style.transform = "translateY(-228px)";//No I18n
			$L('.weekTable',this.$node)[0].style.transform = "translateY(-228px)";//No I18n
			$L('.cruxMonthContainer',this.$node)[0].classList.remove('cxdN');//No I18n
			$L('.weekTable',this.$node).animate({ top  : '+=100%'} , function(){//No I18n
				$L('.weekTable',_this.$node)[0].style.top = '';
				$L('.weekTable',_this.$node)[0].style.transform = "translateY(0px)";//No I18n
				$L('.weekTable',_this.$node)[0].classList.remove('cxdN');//No I18n
			},400 );
			$L('.cruxMonthContainer',this.$node).animate({ top  : '+=100%'} , function(){//No I18n
				$L('.cruxMonthContainer',_this.$node)[0].style.top = '';
				$L('.cruxMonthContainer',_this.$node)[0].style.transform = "translateY(0px)";//No I18n
			},400 );
			$L('.cruxCalYearContainer',this.$node).animate({ top  : '228px'},function(){//No I18n
				$L('.cruxCalYearContainer',_this.$node)[0].style.top = '';
				$L('.cruxCalYearContainer',_this.$node)[0].classList.add('cxdN');//No I18n
				$L('.cruxCalYearContainer',_this.$node)[0].style.transform = "translateY(0px)";//No I18n
				_this.bindMonthData();
				_this.setData('preventMultiClick',false);//No I18n
			} ,400 );
		}else{
			$L('.cruxCalContainer',this.$node)[0].style.height = '315px';
			$L('.cruxCalYearContainer',this.$node)[0].classList.remove('cxdN');//No I18n
			$L(".cruxCalYearContainer",this.$node)[0].scrollTop = $L(".cxSingleYear_3",this.$node)[0].offsetTop;//No I18n
			$L('.lyteCalendarNavigator',this.$node)[0].classList.add('cxHeaderBack');//No I18n
			$L('.weekTable',this.$node).animate({ bottom  : '+=100%'} , function(){ //No I18n
				$L('.weekTable',_this.$node)[0].style.bottom = '';//No I18n
				$L('.weekTable',_this.$node)[0].classList.add('cxdN');//No I18n
			},400 );
			$L('.cruxCalYearContainer',this.$node).animate({ bottom  : '+=100%'},function(){//No I18n
				$L('.cruxCalYearContainer',_this.$node)[0].style.bottom = '';//No I18n
			} ,400 );
			$L('.cruxMonthContainer',this.$node).animate({ bottom  : '+=100%'}, function(){//No I18n
				$L('.cruxMonthContainer',_this.$node)[0].style.bottom = '';//No I18n
		 		$L('.cruxMonthContainer',_this.$node)[0].classList.add('cxdN');//No I18n
		 		_this.bindYearData(selectedYear)
		 		_this.setData('preventMultiClick',false);//No I18n
			} ,400 ); 
		}

	},
	getCurrentOffsets : function(type,count,maxCount,viewClass,viewType){
		if(type === 'initial'){
			var offsetArr = [];
			for(var i = 0 ; i < maxCount ; i++){
				var ele = $L("."+viewClass+"_" + i,this.$node)[0];
				viewType === 'dateView' ? offsetArr.push({offsetTop : ele.offsetTop,year:parseInt(ele.getAttribute('year')),month:parseInt(ele.getAttribute('month'))}) : offsetArr.push({offsetTop : ele.offsetTop,year:parseInt(ele.getAttribute('year'))});//No I18n
			}
			this.setData('offsetArr',offsetArr);//No I18n
		}else{
			var ele = $L("."+viewClass+"_" + count,this.$node)[0];
			var offsetArr = this.getData('offsetArr');//No I18n
				if(type === "down"){
					var offset = offsetArr[0].offsetTop + this.getData('initialScrollHeight');
					if(this.getData('dummyHeight') >= 0 && this.getData('transformHeight') <= 0){
						var offset = this.getData('initialScrollHeight')//No I18n
						offsetArr[0].offsetTop = this.getData('initialScrollHeight');
						for(var i = 0 ; i < maxCount ; i++){
							offsetArr[i].offsetTop = offsetArr[i].offsetTop - ele.offsetHeight;
						}
						var offset = offsetArr[0].offsetTop;
					}
					offsetArr.shift();
					viewType === 'dateView' ? offsetArr.push({offsetTop : offset,year:parseInt(ele.getAttribute('year')),month:parseInt(ele.getAttribute('month'))}) : offsetArr.push({offsetTop : offset,year:parseInt(ele.getAttribute('year'))});//No I18n
				}else{
					if(this.getData('dummyHeight') > 0 ){
						for(var i = 0 ; i < maxCount ; i++){
							offsetArr[i].offsetTop = offsetArr[i].offsetTop + ele.offsetHeight;
						}
					}
					var offset = offsetArr[maxCount - 1].offsetTop - this.getData('initialScrollHeight');//No I18n
					offsetArr.pop();
					viewType === 'dateView' ? offsetArr.unshift({offsetTop : offset,year:parseInt(ele.getAttribute('year')),month:parseInt(ele.getAttribute('month'))}) : offsetArr.unshift({offsetTop : offset,year:parseInt(ele.getAttribute('year'))});//No I18n
				}
				this.setData('offsetArr',offsetArr);//No I18n
		}
	},
	changeDaysOfWeek: function() {
		var days = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ], //No I18n
		startDay = this.getData( 'cxPropStartWeekDay' ), i, result = [] ;//No I18n
		for( i = 0; i < 7; i++ ) { 
			result.push( days[ ( i + startDay ) % 7 ] );
		}

		this.setData( 'daysOfWeek', result );//No I18n
		
	},
	buildInitialDateView : function(){
		var format = this.getData( 'cxPropFormat' ),isYYFormat = this.isYYFormat();//No I18n
		format = this.getRelevantFormat( format );
		inter = this.getData( 'viewDate' );//No I18n
		var _this = this;
		formattedDate = this.getDateFromFormat( inter, format );
		var preDate1 = $L.moment( formattedDate, format ).add( -1, 'month', isYYFormat ).getDObj();//No I18n
		var preDate2 = $L.moment( _this.getDateFromFormat( preDate1, format ), format ).add( -1, 'month', isYYFormat ).getDObj();//No I18n
		var NextDate1 = $L.moment( formattedDate, format ).add( 1, 'month', isYYFormat ).getDObj();//No I18n
		var NextDate2 = $L.moment( _this.getDateFromFormat( NextDate1, format ), format ).add( 1, 'month', isYYFormat ).getDObj();//No I18n
		_this.setData('nextDate',NextDate2); //No I18n
		_this.setData('prevDate',preDate2); //No I18n
		var dates = [preDate2,preDate1,inter,NextDate1,NextDate2];
		// dates.forEach(function(item,index){
		// 	Lyte.arrayUtils(_this.getData('arrayOfMonths'),'push',_this.setDatesFunction(item));
		// })
		dates.forEach(function(item,index){
			Lyte.arrayUtils(_this.getData('arrayOfMonths'),'push',_this.getDates(item)); //No I18n
		})

	},
	addMonth : function(value){
		var format = this.getData('cxPropFormat'), isYYFormat = this.isYYFormat();//No I18n
		if(value === 'next'){
			var next = this.getData('nextDate'); //No I18n
			date = $L.moment( this.getDateFromFormat( next, format ), format ).add( 1, 'month', isYYFormat ).getDObj(); //No I18n
			this.setData("nextDate",date);//No I18n
		}else{
			var prev = this.getData('prevDate'); //No I18n
			date = $L.moment( this.getDateFromFormat( prev, format ), format ).add( -1, 'month', isYYFormat ).getDObj();//No I18n
			this.setData("prevDate",date);//No I18n
		}
		//return this.setDatesFunction(date);
		return this.getDates(date);
	},
	addYear : function(value){
		if(value === 'next'){
			this.setData('nextYear',this.getData('nextYear') + 1); //No I18n
			var year = this.getData('nextYear');//No I18n
		}else{
			this.setData('prevYear',this.getData('prevYear') - 1);//No I18n
			var year = this.getData('prevYear');//No I18n
		}
		var currentMonth = "",selectedMonth = "";
		if(this.getData('currentYear') == year){
			var currentMonth = this.getData('currentMonth');//No I18n
		}
		if(this.getData('selectedYear') == year){
			var selectedMonth = this.getData('selectedMonth'); //No I18n
		}
		return this.buildYearView(year,currentMonth,selectedMonth);
	},
	getDates : function(dateObject){
		var dates = this.lyteCal.getDateArray( dateObject ), month = dateObject.getMonth(), name = this.getData('monthNames')[month];
		if(dates && dates.length === 7){
			dates.pop();
		}
		return {'dates' : dates, 'month' : month + 1 , 'name' : name , 'year' : dateObject.getFullYear()} //No I18n
	},
	addMonthWhenScroll : function(direction,obj){
			var obj  = this.medianFind($L(".cruxMonthContainer",this.$node)[0].scrollTop);
			var month = this.getData('monthNames')[obj.month]
			if(this.getData('selectedMonth') !== month ){
				this.setData("selectedMonth",month);//No I18n
				this.setData("selectedYear",obj.year);//No I18n
				var transCount = this.getData('transCount');//No I18n
				if( direction === "down" ){
					if(!this.getData("initialScroll")){
						this.setData("transformHeight",this.getData('initialScrollHeight'));//No I18n
						this.setData('initialScroll',true);//No I18n
						this.setData("transCount",0);//No I18n
						transCount = 0;
					}else if(this.getData('prevScroll') === 'up'){//No I18n
						if(transCount === 4){
							this.setData('transCount',0); //No I18n
							transCount = 0;
							this.setData('transformHeight',this.getData('transformHeight') + this.getData('initialScrollHeight'));//No I18n
						}else{							
							this.setData('transCount',transCount + 1);//No I18n
							transCount = transCount+1;
						}
						var ele = this.getData('offsetArr')[4], month = ele.month + 1;
						var date = new Date( month + '/1/' + ele.year );
						this.setData('nextDate',date);//No I18n
						this.setData('transformHeight',this.getData('transformHeight') + this.getData('initialScrollHeight'));//No I18n
					} 
					this.transformFn(transCount,'down','next','cruxMonthContainer','cxCalSingleMonth',5,'dateView','dummy1');//No I18n
					if(this.getData('offsetArr')[2].month !== obj.month){
						this.countMaintainFn('down',transCount,4);//No I18n
						transCount = this.getData('transCount');//No I18n
						this.transformFn(transCount,'down','next','cruxMonthContainer','cxCalSingleMonth',5,'dateView','dummy1');//No I18n
					}
					this.countMaintainFn('down',transCount,4)//No I18n
				}else{
					if(!this.getData("initialScroll")){
						this.setData('initialScroll',true);//No I18n
						this.setData("transformHeight",-this.getData('initialScrollHeight'));//No I18n
						this.setData("transCount",4);//No I18n
						transCount = 4;
					}else if(this.getData('prevScroll') === 'down'){//No I18n
						if(transCount === 0){
							this.setData('transCount',4);//No I18n
							transCount = 4;
							this.setData('transformHeight',this.getData('transformHeight') - this.getData('initialScrollHeight')); //No I18n
						}else{
							this.setData('transCount',transCount - 1); //No I18n
							transCount = transCount-1;
						}
						var ele = this.getData('offsetArr')[0],month = ele.month + 1;
						var date = new Date( month + '/1/' + ele.year );
						this.setData('prevDate',date); //No I18n
						this.setData('transformHeight',this.getData('transformHeight') - this.getData('initialScrollHeight')); //No I18n
					}
					this.transformFn(transCount,'up','previous','cruxMonthContainer','cxCalSingleMonth',5,'dateView','dummy1'); //No I18n
					if(this.getData('offsetArr')[2].month !== obj.month ){
						this.countMaintainFn('up',transCount,4); //No I18n
						transCount = this.getData('transCount');//No I18n
						this.transformFn(transCount,'up','previous','cruxMonthContainer','cxCalSingleMonth',5,'dateView','dummy1');//No I18n
					}
					this.countMaintainFn('up',transCount,4)//No I18n
				}
			}
	},
	addYearWhenScroll : function(direction,obj){
		if(!obj){
			obj  = this.medianFind($L('.cruxCalYearContainer',this.$node)[0].scrollTop);
		}
		var year = obj.year;
		if(this.getData('previousYear') !== year){
			this.setData('previousYear',year);//No I18n
			var transCount = this.getData('transCount');//No I18n
			if( direction === "down" ){
				if(!this.getData("initialScroll")){
					this.setData("transformHeight",this.getData('initialScrollHeight'));//No I18n
					this.setData('initialScroll',true);//No I18n
					this.setData("transCount",0);//No I18n
					transCount = 0;
				}else if(this.getData('prevScroll') === 'up'){//No I18n
					if(transCount === 8){
						this.setData('transCount',0);//No I18n
						transCount = 0;
						this.setData('transformHeight',this.getData('transformHeight') + this.getData('initialScrollHeight'));//No I18n
					}else{						
						this.setData('transCount',transCount + 1);//No I18n
						transCount = transCount+1;
					}
					var ele;
					if (transCount === 0) {
						ele = $L('.cxSingleYear_8' , this.$node)[0];
					}else{
						ele = $L('.cxSingleYear_' + (transCount - 1) ,  this.$node)[0];//No I18n
					}
					this.setData('nextYear',ele.getAttribute('year'));//No I18n
				this.setData('transformHeight',this.getData('transformHeight') + this.getData('initialScrollHeight'));//No I18n
				} 
				this.transformFn(transCount,'down','next','cruxCalYearContainer','cxSingleYear',9,'yearView','dummy2');//No I18n
				if(this.getData('offsetArr')[3].year !== obj.year && !this.getData('navChange')){
					this.countMaintainFn('down',transCount,8); //No I18n
					transCount = this.getData('transCount');//No I18n
					this.transformFn(transCount,'down','next','cruxCalYearContainer','cxSingleYear',9,'yearView','dummy2');//No I18n
				}
				this.countMaintainFn('down',transCount,8)//No I18n
			}else{
				if(!this.getData("initialScroll")){
					this.setData('initialScroll',true);//No I18n
					this.setData("transformHeight",-this.getData('initialScrollHeight'));//No I18n
					this.setData("transCount",8);//No I18n
					transCount = 8;
				}else if(this.getData('prevScroll') === 'down'){//No I18n
					if(transCount === 0){
						this.setData('transCount',8);//No I18n
						transCount = 8;
						this.setData('transformHeight',this.getData('transformHeight') - this.getData('initialScrollHeight'));//No I18n
					}else{
						this.setData('transCount',transCount - 1);//No I18n
						transCount = transCount-1;
					}
					if (transCount === 8) {
						var ele = $L('.cxSingleYear_0',this.$node)[0];
					}else{
						var ele = $L('.cxSingleYear_' + (transCount + 1),this.$node)[0];
					}
					this.setData('prevYear',ele.getAttribute('year'));//No I18n
					this.setData('transformHeight',this.getData('transformHeight') - this.getData('initialScrollHeight'));//No I18n
				}
				this.transformFn(transCount,'up','previous','cruxCalYearContainer','cxSingleYear',9,'yearView','dummy2');//No I18n
				if(this.getData('offsetArr')[3].year !== obj.year && !this.getData('navChange')){
					this.countMaintainFn('up',transCount,8);//No I18n
					transCount = this.getData('transCount');//No I18n
					this.transformFn(transCount,'up','previous','cruxCalYearContainer','cxSingleYear',9,'yearView','dummy2');//No I18n
				}
				this.countMaintainFn('up',transCount,8)//No I18n
			}
		}
	},
	countMaintainFn : function(scrollDir,transCount,maxCount){
		if(scrollDir === 'down'){
			if(transCount < maxCount){
				this.setData('transCount',transCount + 1);//No I18n
			}else if(transCount === maxCount){
				if(this.getData('transformHeight') === 0){
					this.setData('initialScroll',false);//No I18n
					return;
				}
				this.setData('transCount',0);//No I18n
				this.setData('transformHeight',this.getData('transformHeight') + this.getData('initialScrollHeight'));//No I18n
			}
		}else{
			if(transCount > 0){
				this.setData('transCount',transCount - 1);//No I18n
			}else if(transCount === 0){
				if(this.getData('transformHeight') === 0){
					this.setData('initialScroll',false);//No I18n
					return;
				}
				this.setData('transCount',maxCount);//No I18n
				this.setData('transformHeight',this.getData('transformHeight') - this.getData('initialScrollHeight'));//No I18n
			}
		}
	},
	transformFn : function(count,scrollDir,type,container,viewClass,maxCount,viewType,dummy){
		if(scrollDir === 'down'){
			if(this.getData('dummyHeight') > 0){
				this.setData("dummyHeight",this.getData('dummyHeight') - $L('.'+ viewClass + '_' + count,this.$node)[0].scrollHeight);//No I18n
				$L("."+dummy,this.$node)[0].style.height =  this.getData('dummyHeight') + "px";
				$L("." + container,this.$node).get(0).scrollTop = $L("." + container,this.$node).get(0).scrollTop - $L('.'+ viewClass + '_' + count,this.$node)[0].scrollHeight;
				$L("." + container , this.$node).resetScrollbar();
			}
		}else{
			if(this.getData('transformHeight') < 0){
				this.setData('dummyHeight', this.getData('dummyHeight') + $L('.'+ viewClass + '_' + count,this.$node)[0].scrollHeight)//No I18n
				$L("."+dummy,this.$node)[0].style.height =  this.getData('dummyHeight') + "px";
				$L("." + container,this.$node).get(0).scrollTop = $L("." + container,this.$node).get(0).scrollTop + $L('.'+ viewClass + '_' + count,this.$node)[0].scrollHeight;
				$L("." + container,this.$node).resetScrollbar();
			}
		}
		this.setData("prevScroll",scrollDir); //No I18n
		if(viewType === 'dateView'){
			var month = this.addMonth(type);
			Lyte.objectUtils(this.getData('arrayOfMonths')[count] ,"add","dates",month.dates);//No I18n
			Lyte.objectUtils(this.getData('arrayOfMonths')[count] ,"add","month",month.month);//No I18n
			Lyte.objectUtils(this.getData('arrayOfMonths')[count] ,"add","name",this.getData('monthNames')[month.month]);//No I18n
			Lyte.objectUtils(this.getData('arrayOfMonths')[count] ,"add","year",month.year);//No I18n
		}else{
			var year = this.addYear(type);
			Lyte.objectUtils(this.getData('arrayOfYear')[count] ,"add","months",year.months);  //No I18n
			Lyte.objectUtils(this.getData('arrayOfYear')[count] ,"add","year",year.year);//No I18n
		}
		$L('.'+ viewClass + '_' + count,this.$node)[0].style.transform = "translateY("+ this.getData('transformHeight') + "px)";//No I18n
		$L("." + container,this.$node).resetScrollbar();
		this.getCurrentOffsets(scrollDir,count,maxCount,viewClass,viewType);
	},
	medianFind : function(curscrollTop){
		var offsetArr = this.getData('offsetArr');//No I18n
	    var offsetArrLen = offsetArr.length;
	    var currentElem = 0;
	    for(var i = 0; i < (offsetArrLen - 1); i++){
		  if(((offsetArr[i].offsetTop <= curscrollTop) && (curscrollTop <= offsetArr[i+1].offsetTop)) ) {
				currentElem = i;
	              break;
	       }
	    }
		var startElemOffset = offsetArr[currentElem].offsetTop;
		var endElemOffset = offsetArr[currentElem + 1].offsetTop;
	    var diff = (endElemOffset - startElemOffset);
	    var halfDiff = diff / 2;
	    var median = (startElemOffset + halfDiff);
	    if(median >= curscrollTop){
	    	var ele = offsetArr[currentElem];
	    }else{
	    	var ele = offsetArr[currentElem + 1];
	    }
		return ele;
	},
	executeViewDateChanges : function() {
		if( this.getMethods( 'onViewdateChange' ) ) {
			this.executeMethod( 'onViewdateChange', this, this.getData( 'viewDate' ) ); //No I18n
		}
	}.observes( 'viewDate' ),//No I18n
	setCurrentDate : function(){
		viewDate = this.getData("viewDate"); //No I18n
		var year = viewDate.getFullYear(),month = this.getData("monthNames")[viewDate.getMonth()];
		var date = new Date();
		this.setData({"currentYear" : date.getFullYear() , "currentMonth" : this.getData("monthNames")[date.getMonth()] });//No I18n
		this.setData({"selectedYear" : year ,"selectedMonth" : month});//No I18n

	},
	getNumber : function(month,year) {
		var daysinmonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if( this.isLeapYear.call( this, year ) && month == 1 ) {
			return 29;
		}
		else{
			return daysinmonths[ month ];
		}
	},
	changeViewDate: function( val ) {
		var cur = this.getData( 'cxPropCurrentDate' );//No I18n
		this.lyteCal.component.setData( 'showToday', false );//No I18n
		if( this.getData( 'preventObs' ) ) {
			return ;
		}

		// Current Date is set to empty
		if( !cur ) {
			this.removeClass();
			return ;
		}

		// Bad current date
		if( this.stringToDate( cur, this.getData( 'cxPropFormat' ) ) == 'Invalid Date' ) {
			this.removeClass();
			return ;
		}

		val = this.getData( 'cxPropCurrentDate' );//No I18n
		var newDate = this.stringToDate( val, this.getData( 'cxPropFormat' ) );//No I18n
		newDate.setDate( 1 );
		this.setData( 'viewDate', newDate );//No I18n
		this.setCurrentDate();
		this.redirectDate(newDate,true);
		// if(this.getData('viewType') == 'dateView'){
		// 	this.buildInitialDateViewContent();
		// }else{
		// 	this.showMonthAndYear(this.getData('selectedYear'));
		// }		
	}.observes( 'cxPropCurrentDate' ),//No I18n
	stringToDate: function( cur, format ) {
		var ret;

			ret = this.getDateObjFromMoment( cur, format );

		return ret;
	},
	getDateObjFromMoment: function( dateString, format ) {
		var momentObj, ret;

		format = this.getRelevantFormat( format );

		if( !dateString ) {
			return 'Invalid Date';//No I18n
		}

		try {
			momentObj = $L.moment( dateString, format );
			ret = momentObj.getDObj();
		}
		catch( e ) {
			ret = 'Invalid Date';//No I18n
		}

		return ret || 'Invalid Date';//No I18n
	},
	removeClass: function() {
		if(this.getData('viewType') === 'dateView'){
			var node = this.$node.querySelector( '.lyteCalSel' );//No I18n
			if( node ) {
				node.classList.remove( 'lyteCalSel' );//No I18n
			}
		}else{
			var node = this.$node.querySelector( '.cxCalSelMonth' );//No I18n
			if( node ) {
				node.classList.remove( 'cxCalSelMonth' );//No I18n
			}
		}

	},

	getNumberOfFirstRowDates: function( firstday ) {
		var startDayOfMonth = this.getData( 'cxPropStartWeekDay' ),//No I18n
		firstRowDays;

		if( firstday == 0 ) {
			firstRowDays = startDayOfMonth === 0 ? 7 : startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				firstRowDays = startDayOfMonth - firstday;
			}
			else {
				firstRowDays = 7 - ( firstday - startDayOfMonth );
			}
		}

		return firstRowDays;

	},

	getNumberToSubtract: function( firstday ) {
		var numberToSubtract, startDayOfMonth = this.getData( 'cxPropStartWeekDay' );//No I18n

		if( firstday == 0 ) {
			numberToSubtract = startDayOfMonth == 0 ? 0 : 7 - startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				numberToSubtract = 7 - ( startDayOfMonth - firstday );
			}
			else {
				numberToSubtract = firstday - startDayOfMonth;
			}
		}

		return numberToSubtract;
	},

	getFirstDay: function( date, day ) {
		var first;

		first = date - Math.floor( date / 7 ) * 7 - 1;
		first = day - first;

		if( first < 0 ){
			first = 7 - first;
		}

		return first;
	},

	getRemainingDays: function( numberOfDaysInMonth, firstRowDays ) {
		var rem = numberOfDaysInMonth - firstRowDays;
		rem = rem - 28;

		return rem;
	},
	setDatesFunction: function(cur) {
		// Number of rows in the table
		var numberOfRows = 6, 
		fillRows = true, 
		format = this.getData( 'cxPropFormat' ),//No I18n
		reachedNextMonth = false, 
		result = [],
		//cur = this.getData( 'viewDate' ), 
		day = cur.getDay(),
		date = cur.getDate(), 
		firstday =  this.getFirstDay( date, day ),
		month = cur.getMonth(),
		year = cur.getFullYear(),
		numberOfDaysInMonth = this.getNumber( month, year ),
		firstRowDays = this.getNumberOfFirstRowDates( firstday ),
		rem = this.getRemainingDays( numberOfDaysInMonth, firstRowDays );


		numberOfRows = this.inc( rem, numberOfRows );

		var calStartDate = new Date( month + 1 + '/1/' + year ), 
		numberToSubtract = this.getNumberToSubtract( firstday );

		calStartDate.setDate( calStartDate.getDate() -  numberToSubtract );
		
		var todayDate = new Date(), firstRow;

		// Construct array
		for( var i = 0; i < numberOfRows; i++ ) {

			// This is to ensure that we don't create an empty row when we reach the next month when fillRows is false.
			if(reachedNextMonth) {
				break;
			}

			result.push( [] );

			for( var j = 0; j < 7; j++ ) {
				if( !fillRows && month !== calStartDate.getMonth() ) {
					result[i].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}
				else if( fillRows && this.isYYFormat() && this.outsideBoundary( calStartDate ) ) {
					result[ i ].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}

				var clsname = 'lyteCalCdate', newMonth = calStartDate.getMonth(), //No I18n
				curDate = new Date( this.getData( 'viewDate' ).getTime() ), //No I18n
				curMonth = curDate.getMonth(),
				ndate = calStartDate.getDate(),
				tdate = this.getData( 'cxPropCurrentDate' ) ? this.stringToDate( this.getData( 'cxPropCurrentDate' ), this.getData( 'cxPropFormat' ) ) : 'nodate', //No I18n
				nyear = calStartDate.getYear(),
				isInRange = this.checkDate( calStartDate ),
				isPresent = ( this.getData( 'cxPropMinDate' ) || "" ) !== "" || ( this.getData( 'cxPropMaxDate' ) || "" ) !== "";

				if( curMonth !== newMonth ) {
					if( !isPresent ) {
						clsname += ' lyteCalGray'; //No I18n
					}

					// Out of range in different month
					else if( !isInRange ) {
						clsname += ' lyteCalDisabled'; //No I18n
					}		
				}

				// Out of range in same month
				else if( isPresent 
					&& !isInRange ) {
					clsname += ' lyteCalDisabled'; //No I18n
				}

				if( tdate !== 'nodate' && tdate !== 'Invalid Date' && newMonth == tdate.getMonth() && tdate.getDate() == ndate && tdate.getYear() == nyear && this.getData( 'selectDate' ) ) {
					clsname += ' cruxCalSel' //No I18n
				}

				if( todayDate.getMonth() === newMonth && todayDate.getDate() === ndate && todayDate.getYear() === nyear && this.getData( 'selectDate' ) ) {
					clsname += ' lyteCalToday' //No I18n
				}

				// Add Classes for weekends
				if( calStartDate.getDay() == 0 || calStartDate.getDay() == 6 ) {
					clsname += ' lyteCalWeekend' //No I18n
				}

				// Store in array and increment date by 1
				clsname += ' cruxCalTableCell'; //No I18n
				var obj = {};
				obj.date = calStartDate.getDate();
				obj.clsname = clsname; //No I18n
				obj.val = this.getDateFromFormat.call( this, calStartDate, this.getData( 'cxPropFormat' ) ); //No I18n
				result[ i ].push( obj );
				// Lyte.arrayUtils( this.getData( 'matrix' )[ i ], 'push', obj )
				calStartDate.setDate( calStartDate.getDate() + 1 );
			}

		}

		//this.setData( 'matrix', result );
		if(result.length == 7){
			result.pop();
		}
		return {dates : result,year : year, month : month, name : this.getData('monthNames')[month]};

	},
	getDateFromFormat: function( dateObj, format ) {
			return this.getDateStringFromMoment( dateObj, format );
	},
	getDateStringFromMoment: function( dateObj, format ) {
		format = this.getRelevantFormat( format );

		return $L.moment( dateObj ).format( format );
	},
	resolveConflicts: function( format ) {
		var match = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/.exec( format ),
		index = ( match || {} ).index,
		matchLength = ( match || [] )[ 0 ].length || 0;

		if( !isNaN( index ) ) {
			return format.substring( 0, index + matchLength ) + ( format.substring( index + matchLength ) || '' ).toUpperCase();
		}

		return format.toUpperCase();
	},

	isConflictingFormat: function( format ) {
		var rdate = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/ig,
		match = format.match( rdate ) || [];

		return match.length > 1;
	},

	getRelevantFormat: function( format ) {

		if( this.isConflictingFormat( format ) ) {
			return this.resolveConflicts( format );
		}

		return format.toUpperCase();
	},
	isYYFormat: function() {
		var format = this.getData( 'cxPropFormat' ), //No I18n
		rYY = /\byy\b/ig;

		return rYY.test( format );
	},
	isLeapYear: function( year ) {
		return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
	},
	inc: function( rem, num ) {
		if( rem > 0 && num == 6 ) {
			return 7; 
		}

		return num;
	},
	checkDate: function( current ) {
		var start = this.getData( 'cxPropMinDate' ) || '', //No I18n
		end = this.getData( 'cxPropMaxDate' ) || '',//No I18n
		startDate, endDate;

		this.reset( current );

		if( start === '' && end === '' ) {
			return true;
		}
		else if( start !== '' && end === '' ) {
			startDate = this.stringToDate( start, this.getData( 'cxPropFormat' ) ); //No I18n
			this.reset( startDate );
			
			if( current >= startDate ) {
				return true;
			}
		}
		else if( start !== '' && end !== '' ) {
			startDate = this.stringToDate( start, this.getData( 'cxPropFormat' ) ); //No I18n
			this.reset( startDate );

			endDate = this.stringToDate( end, this.getData( 'cxPropFormat' ) );//No I18n
			this.reset( endDate );

			if( current >= startDate && current <= endDate ) {
				return true;
			}
		}
		else {
			endDate = this.stringToDate( end, this.getData( 'cxPropFormat' ) );//No I18n
			this.reset( endDate );

			if( current <= endDate ) {
				return true;
			}
		}

		return false;
	},
	reset: function( cur ) {
		cur.setHours( 0 );
		cur.setMinutes( 0 );
		cur.setSeconds( 0 );
		cur.setMilliseconds( 0 );
	}
});
