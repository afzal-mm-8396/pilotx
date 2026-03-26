Lyte.Mixin.register("crux-filter-utils", {//No I18n
	_cruxReplace : Lyte.Component.registeredHelpers.cruxReplace,
	specialfield : function(field,by,val,comparator,is_modified,subvalue,subcomp){
		var res, Obj1,Obj2,Obj3,temp;
		var Obj = { "UMT" : {field: {api_name : "User_Modified_Time",id : ''} ,comparator : null,value : null} , "SMT" : {field: {api_name : "System_Modified_Time",id : ''} ,comparator :null ,value : null} , "URAT" : {field: {api_name : "User_Related_Activity_Time",id : ''},comparator :null ,value : null} , "SRAT" : {field: {api_name : "System_Related_Activity_Time",id : ''},comparator :null ,value : null}, "LAT" : {field: {api_name : "Last_Activity_Time",id : ''},comparator :null ,value : null}} //no i18n
		if(field.api_name == "cxFilter_TouchedRecords"){
			// if(by.indexOf("Or")!='-1'){
			// 	Obj.LAT.comparator = comparator;Obj.LAT.value = val
			// 	Obj1 = JSON.parse(JSON.stringify(Obj.LAT))
			// 	Obj.SMT.comparator = comparator;Obj.SMT.value = val
			// 	res = this.construct_group(Obj1,Obj.SMT,"OR") //no i18n
			// }else{
			if(by.indexOf("User")!='-1' ){
				Obj.UMT.comparator = Obj.URAT.comparator =  comparator //no i18n
				Obj.UMT.value = Obj.URAT.value = val
				Obj1 = this.construct_group(Obj.UMT,Obj.URAT,"OR") //no i18n
				res =JSON.parse( JSON.stringify( Obj1 ) ); //no i18n
				if(by.indexOf("Only")!='-1'){
					Obj.SMT.comparator = Obj.SRAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.SMT.value = Obj.SRAT.value = val
					Obj1 = JSON.parse( JSON.stringify( Obj.SMT ) ); Obj2 = JSON.parse( JSON.stringify( Obj.SRAT ) ) //no i18n
					if(Obj.SMT.comparator == "greater_than"){//no i18n
						Obj.SMT.comparator = Obj.SRAT.comparator = "equal";//no i18n
						Obj.SMT.value = Obj.SRAT.value = "${EMPTY}"//no i18n
						Obj1 = this.construct_group(Obj1,Obj.SMT,"OR") //no i18n
						Obj2 = this.construct_group(Obj2,Obj.SRAT,"OR") //no i18n
					}
					temp = this.construct_group(Obj1,Obj2,"AND") //no i18n
					res = this.construct_group(res,temp,"AND") //no i18n
				}else{
					//combination of touched user , untouched system criteria and untouched only by user criteria are same. so dummy criteria added to overcome this issue
					Obj.UMT.comparator = "not_equal";Obj.UMT.value="${EMPTY}";//no i18n
					Obj.URAT.comparator = "not_equal";Obj.URAT.value="${EMPTY}";//no i18n
					temp = this.construct_group(Obj.UMT,Obj.URAT,"OR") //no i18n
					res = this.construct_group(res,temp,"AND")//no i18n
				}
			}
			if(by.indexOf("System")!='-1'){
				Obj.SMT.comparator = Obj.SRAT.comparator =  comparator //no i18n
				Obj.SMT.value = Obj.SRAT.value = val
				Obj2 = this.construct_group(Obj.SMT,Obj.SRAT,"OR") //no i18n
				res = JSON.parse( JSON.stringify( Obj2 ) ) //no i18n
				if(by.indexOf("Only")!='-1'){
					Obj.UMT.comparator = Obj.URAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.UMT.value = Obj.URAT.value = val
					Obj1 = JSON.parse( JSON.stringify( Obj.UMT ) ); Obj2 = JSON.parse( JSON.stringify( Obj.URAT ) ) //no i18n
					if(Obj.UMT.comparator == "greater_than"){//no i18n
						Obj.UMT.comparator = Obj.URAT.comparator = "equal";//no i18n
						Obj.UMT.value = Obj.URAT.value = "${EMPTY}"//no i18n
						Obj1 = this.construct_group(Obj1,Obj.UMT,"OR") //no i18n
						Obj2 = this.construct_group(Obj2,Obj.URAT,"OR") //no i18n
					}
					temp = this.construct_group(Obj1,Obj2,"AND") //no i18n
					res = this.construct_group(res,temp,"AND") //no i18n
				}else{
					//combination of touched system , untouched user criteria and untouched only by system criteria are same. so dummy criteria added to overcome this issue
					Obj.SMT.comparator = "not_equal";Obj.SMT.value="${EMPTY}";//no i18n
					Obj.SRAT.comparator = "not_equal";Obj.SRAT.value="${EMPTY}";//no i18n
					temp = this.construct_group(Obj.SMT,Obj.SRAT,"OR") //no i18n
					res = this.construct_group(res,temp,"AND")//no i18n
				}
			}
			if(by.indexOf('And')!='-1'){
				res = this.construct_group(Obj1,Obj2,"AND") //no i18n
			}
			if(by.indexOf("Or") != -1){
				res = this.construct_group(Obj1,Obj2,"OR") //no i18n
			}
			//}
		}else if(field.api_name == "cxFilter_UnTouchedRecords"){ //no i18n
			// if(by.indexOf('And')!='-1'){
			// 	Obj.LAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal" )?"greater_than":""  //no i18n
			// 	Obj.LAT.value = val
			// 	res = JSON.parse( JSON.stringify( Obj ) ) //no i18n
			// 	Obj.LAT.comparator = "equal" //no i18n
			// 	Obj.LAT.value = "${EMPTY}" //no i18n
			// 	res = this.construct_group(res.LAT,Obj.LAT,"OR") //no i18n
			// }else {
					if(by.indexOf("User")!='-1' ){
					Obj.UMT.comparator = Obj.URAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.UMT.value = Obj.URAT.value = val
					var temp1 =JSON.parse( JSON.stringify( Obj ) ) //no i18n
					Obj.UMT.comparator = Obj.URAT.comparator =  "equal" //no i18n
					Obj.UMT.value = Obj.URAT.value = "${EMPTY}" //no i18n
					temp = this.construct_group(temp1.UMT,Obj.UMT,"OR") //no i18n
					Obj1 = this.construct_group(temp1.URAT,Obj.URAT,"OR") //no i18n
					Obj1 = this.construct_group(temp,Obj1,"AND") //no i18n
					res = Obj1
					if(by.indexOf("Only")!='-1'){
						Obj.SMT.comparator = Obj.SRAT.comparator = comparator
						Obj.SMT.value = Obj.SRAT.value = val
						res = this.construct_group(Obj.SMT,Obj.SRAT,"OR") //no i18n
						res = this.construct_group(Obj1,res,"AND") //no i18n
					}
				}
				if(by.indexOf("System")!='-1'){
					Obj.SMT.comparator = Obj.SRAT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.SMT.value = Obj.SRAT.value = val
					var temp1 = JSON.parse(JSON.stringify( Obj))//no i18n
					Obj.SMT.comparator = Obj.SRAT.comparator = "equal" //no i18n
					Obj.SMT.value = Obj.SRAT.value = "${EMPTY}" //no i18n
					temp = this.construct_group(temp1.SMT,Obj.SMT,"OR") //no i18n
					Obj2 = this.construct_group(temp1.SRAT,Obj.SRAT,"OR") //no i18n
					Obj2 = this.construct_group(temp,Obj2,"AND") //no i18n
					res = Obj2
					if(by.indexOf("Only")!='-1'){
						Obj.UMT.comparator = Obj.URAT.comparator = comparator
						Obj.UMT.value = Obj.URAT.value = val
						res = this.construct_group(Obj.UMT,Obj.URAT,"OR") //no i18n
						res = this.construct_group(Obj2,res,"AND") //no i18n
					}
				}
				if(by.indexOf("Or")!='-1'){
					res = this.construct_group(Obj1,Obj2,"OR") //no i18n
				}
				if(by.indexOf('And')!='-1'){
					res = this.construct_group(Obj1,Obj2,"AND") //no i18n
				}
			//}
		}else if(field.api_name == "cxFilter_RecordAction"){ //no i18n
			var is_modified =is_modified
			if(by.indexOf("User") != '-1'){
				if( is_modified.toLowerCase() == "modified"){
					Obj.UMT.comparator = comparator
					Obj.UMT.value = val //no i18n
					Obj1 = JSON.parse( JSON.stringify( Obj.UMT ) )
					res = JSON.parse( JSON.stringify( Obj1 ) ) //no i18n
					if(by.indexOf("Only") != '-1'){
						Obj.SMT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
						Obj.SMT.value = val //no i18n
						temp = JSON.parse( JSON.stringify( Obj.SMT ) )//no i18n
						if(Obj.SMT.comparator == "greater_than"){//no i18n
							Obj.SMT.comparator = "equal";Obj.SMT.value = "${EMPTY}"//no i18n
							temp = this.construct_group(temp,Obj.SMT,"OR")//no i18n
						}
						res = this.construct_group(res,temp,"AND") //no i18n
					}
				}else{
					Obj.UMT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.UMT.value =  val //no i18n
					var temp1 = JSON.parse( JSON.stringify( Obj ) )
					Obj.UMT.comparator = "equal" //no i18n
					Obj.UMT.value = "${EMPTY}" //no i18n
					Obj1 = this.construct_group(temp1.UMT,Obj.UMT,"OR") //no i18n
					res = JSON.parse( JSON.stringify( Obj1 ) )//no i18n
					if(by.indexOf("Only") != '-1'){
						Obj.SMT.comparator = comparator
						Obj.SMT.value = val //no i18n
						res = this.construct_group(res,Obj.SMT,"AND") //no i18n
					}
				}
			}
			if(by.indexOf("System") != '-1'){
				if(is_modified&& is_modified.toLowerCase() == "modified"){
					Obj.SMT.comparator = comparator
					Obj.SMT.value = val //no i18n
					Obj2 = JSON.parse( JSON.stringify( Obj.SMT ) )
					res = JSON.parse( JSON.stringify( Obj2 ) ) //no i18n
					if(by.indexOf("Only") != '-1'){
						Obj.UMT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
						Obj.UMT.value = val //no i18n
						temp = JSON.parse( JSON.stringify( Obj.UMT ) )//no i18n
						if(Obj.UMT.comparator == "greater_than"){
							Obj.UMT.comparator = "equal";Obj.UMT.value = "${EMPTY}"//no i18n
							temp = this.construct_group(temp,Obj.UMT,"OR")//no i18n
						}
						res = this.construct_group(res,temp,"AND") //no i18n
					}
				}else{
					Obj.SMT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than" ||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.SMT.value = val //no i18n
					var temp1 = JSON.parse( JSON.stringify( Obj ) )
					Obj.SMT.comparator = "equal" //no i18n
					Obj.SMT.value = "${EMPTY}" //no i18n
					Obj2 = this.construct_group(temp1.SMT,Obj.SMT,"OR") //no i18n
					res = Obj2
					if(by.indexOf("Only") != '-1'){
						Obj.UMT.comparator = comparator
						Obj.UMT.value = val //no i18n
						res = this.construct_group(Obj2,Obj.UMT,"AND") //no i18n
					}
				}
			}
			if(by.indexOf("Or") != '-1'){
				res = this.construct_group(Obj1,Obj2,"OR") //no i18n
			}
			if(by.indexOf("And") != '-1'){
				res = this.construct_group(Obj1,Obj2,"AND") //no i18n
			}
		}else if(field.api_name == "cxFilter_RelatedRecordsAction"){ //no i18n
			var is_modified =is_modified
			if(by.indexOf("User") != '-1'){
				if( is_modified.toLowerCase() == "done" || is_modified.toLowerCase() == "modified"){
					Obj.URAT.comparator = comparator
					Obj.URAT.value = val //no i18n
					Obj1 = JSON.parse( JSON.stringify( Obj.URAT ) )
					res = JSON.parse( JSON.stringify( Obj1 ) )
					if(by.indexOf("Only") != '-1'){
						Obj.SRAT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than"||comparator == "less_equal")?"greater_than":""  //no i18n
						Obj.SRAT.value = val //no i18n
						Obj1 = JSON.parse( JSON.stringify( Obj.SRAT ) )
						if(Obj.SRAT.comparator == "greater_than"){//no i18n
							Obj.SRAT.comparator = "equal";Obj.SRAT.value = "${EMPTY}"//no i18n
							Obj1 = this.construct_group(Obj1,Obj.SRAT,"OR") //no i18n
						}
						res = this.construct_group(res,Obj1,"AND") //no i18n
					}
				}else{
					Obj.URAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than"||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.URAT.value =  val //no i18n
					var temp1 = JSON.parse( JSON.stringify( Obj ) )
					Obj.URAT.comparator = "equal" //no i18n
					Obj.URAT.value = "${EMPTY}" //no i18n
					Obj1 = this.construct_group(temp1.URAT,Obj.URAT,"OR") //no i18n
					res = Obj1
					if(by.indexOf("Only") != '-1'){
						Obj.SRAT.comparator = comparator
						Obj.SRAT.value = val //no i18n
						res = this.construct_group(Obj1,Obj.SRAT,"AND") //no i18n
					}
				}
				
			}
			if(by.indexOf("System") != '-1'){
				if( is_modified.toLowerCase() == "done" || is_modified.toLowerCase() == "modified"){
					Obj.SRAT.comparator = comparator
					Obj.SRAT.value = val //no i18n
					Obj2 = JSON.parse( JSON.stringify( Obj.SRAT ) )
					res = JSON.parse( JSON.stringify( Obj2 ) )
					if(by.indexOf("Only") != '-1'){
						Obj.URAT.comparator =  (comparator=="equal")?"not_equal" : ( comparator == "less_than"||comparator == "less_equal")?"greater_than":""  //no i18n
						Obj.URAT.value = val //no i18n
						Obj2 = JSON.parse( JSON.stringify( Obj.URAT ) )
						if(Obj.URAT.comparator == "greater_than"){//no i18n
							Obj.URAT.comparator = "equal";Obj.URAT.value = "${EMPTY}"//no i18n
							Obj2 = this.construct_group(Obj2,Obj.URAT,"OR") //no i18n
						}
						res = this.construct_group(res,Obj2,"AND") //no i18n
					}
				}else{
					Obj.SRAT.comparator = (comparator=="equal")?"not_equal" : ( comparator == "less_than"||comparator == "less_equal")?"greater_than":""  //no i18n
					Obj.SRAT.value = val //no i18n
					var temp1 = JSON.parse( JSON.stringify( Obj ) )
					Obj.SRAT.comparator = "equal" //no i18n
					Obj.SRAT.value = "${EMPTY}" //no i18n
					Obj2 = this.construct_group(temp1.SRAT,Obj.SRAT,"OR") //no i18n
					res = Obj2
					if(by.indexOf("Only") != '-1'){
						Obj.URAT.comparator = comparator
						Obj.URAT.value = val //no i18n
						res = this.construct_group(Obj2,Obj.URAT,"AND") //no i18n
					}
				}
			}
			if(by.indexOf("Or") != '-1'){
				res = this.construct_group(Obj1,Obj2,"OR") //no i18n
			}
			if(by.indexOf("And") != '-1'){
				res = this.construct_group(Obj1,Obj2,"AND") //no i18n
			}
		}else if(field.api_name == "cxFilter_Email_Status"){ //no i18n
			var email_status = {'sent' : ["Sent"], 'sent_bounced' : ["Bounced"], 'replied' : ["Replied"], 'responded' : ["Responded"],'clicked' : ["Clicked"],'opened' : ["Opened","Clicked","Responded"],'not_opened' : ["Opened","Clicked","Responded","Bounced"], 'bounced' : ["Bounced"] , 'opened_and_not_replied' : ["Opened","Clicked" ] , 'not_sent' : ["Opened","Clicked","Sent","Replied","Bounced","Responded" ] ,'received' : ["Received","Responded"] ,'not_received' :["Received","Responded"] }; //no i18n
			Obj = { 'LAT' : { field: {api_name : "LAST_ACTION_TIME",id : ''},comparator : null,value : null},'LST' : { field: {api_name : "LAST_SENT_TIME",id : ''}  ,comparator : null,value : null}, 'GEN_FORMAT' : { field: {api_name : "LAST_ACTION",id : ''} , comparator : null , value : null} } //no i18n
			var status = by,flag = true,sent_status
			if(status == "sent" || status === 'sent_bounced'){
				sent_status = is_modified
				Obj.LST.comparator = comparator;
				Obj.LST.value = val
				flag = (sent_status =="any_of_the_above")? false : true //no i18n
				Obj1 = JSON.parse( JSON.stringify( Obj.LST ) )
				status = sent_status
				if(by === 'sent_bounced'){
					status = 'bounced';
				}
			}else if(status == "not_sent"){//no i18n
				Obj.LST.comparator = val == "${EMPTY}" ? comparator : this.negative_Comparator(comparator);//no i18n
				Obj.LST.value = val
				if( Obj.LST.comparator === "greater_equal" ){
					//#117439998 cx issue.For latest email status "sent case" we are sending comparator  as "less_equal" for LAST_SENT_TIME field.For "not sent case" we should be sending the comparator as "greater_than" so that the nth day records won't  be fetched but from UI we are sending comparator as "greater_equal" so nth day records are being fetched
					Obj.LST.comparator = "greater_than";//no i18n
				}
				Obj1 = JSON.parse( JSON.stringify( Obj.LST ) )
				if(Obj.LST.comparator == "greater_than" || Obj.LST.comparator == "greater_equal"){ //no i18n
					Obj.LST.comparator == "greater_than" //no i18n
					Obj.LST.comparator = "equal";Obj.LST.value = "${EMPTY}";//no i18n
					Obj1 = this.construct_group(Obj1,Obj.LST,"OR")//no i18n
				}
				
			}else{
				Obj.LAT.value = val
				if((status == "not_opened" || status =="not_received") & !sent_status ) {
					Obj.LAT.comparator = this.negative_Comparator(comparator)//no i18n
					Obj1 = JSON.parse( JSON.stringify( Obj.LAT ) )
					if(Obj.LAT.comparator == "greater_than" || Obj.LAT.comparator == "greater_equal"){ //no i18n
						Obj.LAT.comparator == "greater_than" //no i18n
						Obj.LAT.comparator = "equal";Obj.LAT.value = "${EMPTY}"//no i18n
						Obj1 = this.construct_group(Obj1,Obj.LAT,"OR")//no i18n
					}
				
				}else{
					Obj.LAT.comparator = comparator
					Obj1 = JSON.parse( JSON.stringify( Obj.LAT ) )
				}
			}
			if(flag){
				Obj.GEN_FORMAT.comparator ="equal" //no i18n
				Obj.GEN_FORMAT.value = val == "${EMPTY}" ? val : email_status[status];//no i18n
				var group_operator = "AND" //no i18n
				if(status == "not_opened" || status == "not_sent" || status =="not_received" ){
					Obj.GEN_FORMAT.comparator = val == "${EMPTY}" ? "equal" : "not_equal" //no i18n
					group_operator = status == "not_opened" && sent_status? group_operator : "OR"//no i18n 
					group_operator = Obj.GEN_FORMAT.value == "${EMPTY}" ? "AND" : group_operator;//no i18n
				}
				res = this.construct_group(Obj1,Obj.GEN_FORMAT,group_operator) //no i18n
				if(status == "not_opened"){
					Obj.LST.comparator = "not_equal";Obj.LST.value = "${EMPTY}" //no i18n
					res = this.construct_group(res,Obj.LST,"AND") //no i18n
				}
			}else{
				res = this.construct_group(Obj1,null)
			}
			
		}else if(field.api_name == "cxFilter_Activities"){ //no i18n
			// let getCompletedVal = (fld)=>{
			// 	if(!fld){return "Completed"};
			// 	let compl_opt = fld.pick_list_values.filter((opt)=>opt.actual_value == "Completed")[0];
			// 	return compl_opt ? compl_opt.actual_value : "Completed";
			// };
			// let statusFld = moduleRecordMapping.Tasks.fields ? moduleRecordMapping.Tasks.fields.filter((fld)=>{return fld.column_name == "STATUS"})[0] : undefined;
			Obj = { 
			'TASKS' :[ {'status' :{ field: {api_name : "Activity_Status__s",id : ''},comparator : 'not_equal' ,value : '${PICKLIST.Completed}'} },
			{'Due_Date' :{ field: {api_name : "Activity_Due_Date__s",id : ''},comparator : 'equal' ,value : '${YESTERDAYMINUS}'} }],
			'CALLS' : [{ 'status' :{ field: {api_name : "Activity_Status__s",id : ''},comparator : 'equal' ,value : ['Overdue']} }, 
			{'Call_Start_Date_Time' :{field: {api_name : "Activity_Start_DateTime__s",id : ''},comparator : 'less_than' ,value : '${CURRENTTIME}'} } ] ,
			'EVENTS' :{ field: {api_name : "Activity_End_DateTime__s",id : ''} ,comparator : 'equal',value : '${TODAY}'},
			'APPOINTMENTS':[{'status':{field:{api_name:"Activity_Status__s",id:''},comparator:'equal',value:'${PICKLIST.Completed}'}},
			{'Appointment_StartTime':{field:{api_name:"Activity_Start_DateTime__s",id:""},comparator:'less_than',value:'${CURRENTTIME}'}},
			{'Appointment_EndTime':{field:{api_name:"Activity_End_DateTime__s",id:""},comparator:'equal',value:"${TODAY}"}}]
			}; //no i18n
 
			var modData = moduleRecordMapping[this.data.cxPropModule];
			var activity_type = { field : { api_name : 'Activity_Type' } , comparator : 'equal' , value : ''} //no i18n
			cross_filter = {}//this.getData('cross_filter') //no i18n
			cross_filter.include_objects = true
			if(by == "Tasks" || by == "Activities"){
				Obj1 = this.construct_group(Obj.TASKS[0].status,Obj.TASKS[1].Due_Date,'AND') //no i18n 
				activity_type.value = 'Tasks' //no i18n
				Obj1 = this.construct_group(Obj1,activity_type,"AND") //no i18n
				res = Obj1
			}
			if(by == "Calls"  || by == "Activities"){
				Obj2 = this.construct_group(Obj.CALLS[0].status,Obj.CALLS[1].Call_Start_Date_Time,'AND') //no i18n 
				activity_type.value = 'Calls' //no i18n
				Obj2 = this.construct_group(Obj2,activity_type,"AND") //no i18n
				res = Obj2
			} //no i18n	
			if(field.appointmentsOptEnabled && (by === "Appointments" || by ==="Activities")){
				Obj.APPOINTMENTS[0].status.value = "Overdue";//NO I18N
				activity_type.value = 'Appointments' //no i18n
				Obj3 = this.construct_group(Obj.APPOINTMENTS[0].status,activity_type,'AND') //no i18n
				res = Obj3
			}
			if(by == "Activities"){	
				res =  this.construct_group(Obj1,Obj2,'OR') //no i18n
				if(field.appointmentsOptEnabled){
					res = this.construct_group(res,Obj3,"OR")
				}
			}else if(by == "Without_Open_Activity"){ //no i18n
				cross_filter.include_objects = false
				Obj.CALLS[0].status.comparator = "equal" ; Obj.CALLS[0].status.value = ["Scheduled","Overdue"] //no i18n
				activity_type.value = "Calls" //no i18n
				var Calls_criteria = this.construct_group(Obj.CALLS[0].status,activity_type,"AND")//no i18n
				activity_type.value = "Tasks" //no i18n
				//Obj.TASKS[0].status.comparator="equal";
				var Tasks_criteria = this.construct_group(Obj.TASKS[0].status,activity_type,"AND")//no i18n				
				Obj1 = this.construct_group(Calls_criteria,Tasks_criteria,'OR')		
				Obj.EVENTS.comparator = "greater_equal" ; Obj.EVENTS.value = '${CURRENTTIME}' //NO I18N
				activity_type.value = "Events" //no i18n
				let Events_criteria = this.construct_group(Obj.EVENTS,activity_type,"AND");//no i18n
				res = this.construct_group(Obj1,Events_criteria,'OR') //no i18n
				if(field.appointmentsOptEnabled){
					activity_type.value = "Appointments"
					Obj.APPOINTMENTS[0].status.comparator="equal" //No I18N
					Obj.APPOINTMENTS[0].status.value=["Scheduled","Overdue"] //No I18N					
					var appointments_criteria = this.construct_group(Obj.APPOINTMENTS[0].status,activity_type,"AND")//No I18N
					res = this.construct_group(res,appointments_criteria,'OR') //no i18n
				}	
			}else if(by == "Activity_Due"){ //no i18n
				Obj.TASKS[1].Due_Date.comparator = comparator ; Obj.TASKS[1].Due_Date.value = val ;//no i18n
				Obj1 = this.construct_group(Obj.TASKS[0].status,Obj.TASKS[1].Due_Date,'AND') ;//no i18n
				activity_type.value = "Tasks"; //no i18n
				Obj1 = this.construct_group(Obj1,activity_type,"AND"); //no i18n
				Obj.CALLS[0].status.comparator = 'equal' ; Obj.CALLS[0].status.value = ["Scheduled","Overdue"];
				Obj.CALLS[1].Call_Start_Date_Time.comparator = comparator ; Obj.CALLS[1].Call_Start_Date_Time.value = val;
				Obj2 = this.construct_group(Obj.CALLS[0].status,Obj.CALLS[1].Call_Start_Date_Time,'AND'); //no i18n
				activity_type.value = "Calls"; //no i18n
				Obj2 = this.construct_group(Obj2,activity_type,"AND"); //no i18n
				temp = this.construct_group(Obj1,Obj2,'OR'); //no i18n
				if(field.appointmentsOptEnabled){
					//Appointments filter only applicable for contacts and custom module
					Obj.APPOINTMENTS[0].status.comparator="equal";
					Obj.APPOINTMENTS[0].status.value=["Scheduled","Overdue"];
					Obj.APPOINTMENTS[2].Appointment_EndTime.comparator=comparator;									
					Obj.APPOINTMENTS[2].Appointment_EndTime.value=val;					
					Obj3 = this.construct_group(Obj.APPOINTMENTS[0].status,Obj.APPOINTMENTS[2].Appointment_EndTime,"AND"); //NO I18N
					activity_type.value="Appointments"; //NO I18N
					Obj3=this.construct_group(Obj3,activity_type,"AND"); //No I18N
					temp = this.construct_group(temp,Obj3,"OR"); //No I18N
				}

				if(val ==="${TODAYANDOVERDUE}"){
					comparator = "equal"; //no i18n
					val = "${TODAY}"; //no i18n
				}
				Obj.EVENTS.comparator = comparator ; Obj.EVENTS.value = val; //no i18n
				activity_type.value = "Events"; //no i18n
				let Events_criteria = this.construct_group(Obj.EVENTS,activity_type,"AND"); //no i18n
				res =  this.construct_group(temp,Events_criteria,'OR'); //no i18n
			}else if(by == "Without_Any_Activity"){ //no i18n
				cross_filter.include_objects = false
				res = { field: {api_name : "Modified_Time",id : ''} , comparator : comparator ,value : val} //no i18n
			}else if( by == "Activity_Done"){//no i18n
				temp = { field: {api_name : "Activity_Closed_Time__s",id : ''} , comparator : comparator ,value : val} //no i18n
				activity_type.value = "Tasks"//no i18n
				temp = this.construct_group(temp,activity_type,"AND")//no i18n
				Obj.CALLS[0].status.comparator = 'not_equal' ; 
				Obj.CALLS[0].status.value = ["Scheduled","Overdue"]
				Obj.CALLS[1].Call_Start_Date_Time.comparator = comparator ; 
				Obj.CALLS[1].Call_Start_Date_Time.value = val;

				Obj1 = this.construct_group(Obj.CALLS[0].status,Obj.CALLS[1].Call_Start_Date_Time,'AND') //no i18n
				activity_type.value = "Calls"//no i18n
				Obj1 = this.construct_group(Obj1,activity_type,"AND")//no i18n
				temp = this.construct_group(temp,Obj1,'OR') //no i18n
				Obj.EVENTS.comparator = comparator ; Obj.EVENTS.value = val
				activity_type.value  = "Events"//no i18n
				var Events_criteria = this.construct_group(Obj.EVENTS,activity_type,"AND")//no i18n
				res = this.construct_group(temp,Events_criteria,'OR') //no i18n
				if(field.appointmentsOptEnabled){
					//Appontments filter changes for contacts and custom module
					activity_type.value="Appointments"//No I18N
					Obj.APPOINTMENTS[0].status.value=["Scheduled","Overdue"];
					Obj.APPOINTMENTS[0].status.comparator="not_equal"; //No I18N
					Obj.APPOINTMENTS[2].Appointment_EndTime.comparator=comparator; 
					Obj.APPOINTMENTS[2].Appointment_EndTime.value=val; //No I18N
					Obj3 = this.construct_group(Obj.APPOINTMENTS[0].status,Obj.APPOINTMENTS[2].Appointment_EndTime,"AND")
					var app_criteria = this.construct_group(Obj3,activity_type,"AND") //No I18N
					res = this.construct_group(res,app_criteria,'OR') //NO I18N
				}
			}
			cross_filter.relation = {}
			cross_filter.relation.relation_id = this.moduleRecordMapping.Activities.id;
			cross_filter.relation.api_name = this.moduleRecordMapping.Activities.api_name//no i18n
			cross_filter.criteria = res
			res = cross_filter
		}else if(field.api_name == "cxFilter_Notes"){ //no i18n
			cross_filter ={}// this.getData('cross_filter') //no i18n 
			cross_filter.include_objects = true
			if(by =="Without_Any_Notes"){
				cross_filter.include_objects = false
			}
			cross_filter.relation = {}
			cross_filter.relation.relation_id = this.moduleRecordMapping.Notes.id;
			cross_filter.relation.api_name = this.moduleRecordMapping.Notes.api_name//no i18n
			cross_filter.criteria = { field: {api_name : "Created_Time",id : ''}  , comparator : comparator , value : val} //no i18n
			res = cross_filter
		}else if(field.api_name == "cxFilter_Deals"){//no i18n
			cross_filter = {}//this.getData('cross_filter') //no i18n 
			Obj = [{ field: {api_name : "Stage",id : ''} ,comparator : 'equal',value : '${OPEN}'},{ field: {api_name : "Created_Time",id : ''},comparator : '',value : ''}] //no i18n
			cross_filter.include_objects = true;
			if(by == "Without_Open_Deal"){
				cross_filter.include_objects = false;
			}
			if(by == "With_Open_Deal" || by == "Without_Open_Deal"){
				Obj[1].comparator = comparator ; Obj[1].value = val;
				res = this.construct_group(Obj[0],Obj[1],'AND') //no i18n
			}else{ 
				cross_filter.include_objects = false;
				Obj[1].field.api_name = 'Deal_Name';Obj[1].comparator='not_equal' ; Obj[1].value = '${EMPTY}';
				res = Obj[1];
			}
			cross_filter.relation = {};
			cross_filter.relation.relation_id = this.moduleRecordMapping.Potentials.id;
			cross_filter.relation.api_name = this.moduleRecordMapping.Potentials.api_name; //no i18n
			cross_filter.criteria = res;
			res = cross_filter;
		}else if(field.api_name == "cxFilter_Contacts"){ //no i18n
			cross_filter = {};
			cross_filter.include_objects = true;
			if(by == "Without_Any_Contact"){
				cross_filter.include_objects = false;
			}
			cross_filter.relation = {};
			cross_filter.relation.relation_id = this.moduleRecordMapping.Contacts.id;
			cross_filter.relation.api_name = this.moduleRecordMapping.Contacts.api_name //no i18n
			cross_filter.criteria = {field: {api_name : "Full_Name",id : ''},comparator : 'not_equal',value : '${EMPTY}'}; //no i18n
			res = cross_filter
		}else if(field.api_name == "cxFilter_Chats"){ //no i18n
			var cross_filter = {}
			cross_filter.include_objects = true
			cross_filter.relation = {type : "related_list" ,relation : {api_name : "Actions_Performed"} }
			cross_filter.relation.relation_id = this.moduleRecordMapping.Visits.id;
			cross_filter.relation.api_name = "Visits_Zoho_Livedesk" //no i18n
			by = (by == "Missed")?"Missed Chat":by //no i18n
			by = (by == "Attended")?"Chat":by //no i18n 
			Obj1 = {field: {api_name : "Action_Type",id : ''},comparator : 'equal',value : by } //no i18n
			Obj2 = {field: {api_name : "Action_Performed_Time",id : ''},comparator : comparator,value : val } //no i18n
			res = this.construct_group(Obj1,Obj2,'AND') //no i18n
			cross_filter.criteria = res
			res = cross_filter
		}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages") {//no i18n
			var obj1 = {field: {api_name : "message_time__s",id : ''},comparator : comparator,value : val }; //no i18n
			var obj2 = {field: {api_name : "conversation_status__s",id : ''}};//no i18n
			switch(field.api_name) {
			case "cxFilter_Not_Replied_Messages" : obj2.comparator = 'not_equal';obj2.value = "Replied" ; break;//no i18n
			case "cxFilter_Replied_Messages" : obj2.comparator = 'equal';obj2.value = "Replied" ; break;//no i18n
			}
			res = this.construct_group(obj1,obj2,'AND') //no i18n

		}else if(field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
			var prefix = this.data && this.data.cxPropModule === "Accounts" ? "Email_Sentiment." : "";//no i18n
			var receivedDate =    { field: {api_name : prefix+"Received_Date",id : ''}, comparator: comparator, value: val} ,subStatus = is_modified,comp = "greater_than",val = 0//no i18n
			Obj1={field:{}};Obj2={field:{}}
			if(subStatus == "For_The_Last_Email"){
				val = (by == "PositiveOrNegative")?['Positive','Negative']:by //no i18n
				Obj1.field.api_name = prefix+"Last_Email_Sentiment"; Obj1.comparator = "equal"; Obj1.value = val //no i18n
				temp =JSON.parse(JSON.stringify(Obj1));
			}else{
				if(subStatus == "count" || subStatus == "percentage"){
					var comp = (subcomp)?subcomp: $('#DDV_'+subStatus)[0].ltProp('Selected')
					if(subvalue){
						val = subvalue
					}else{
						var node = $("#"+subStatus+"_crux_comp")[0]
						node.component.validate()
						val = node.component.getValue()
					}
					
				}
				if(by == "Positive" || by == "PositiveAndNegative" || by=="PositiveOrNegative" || by =="PositiveOnly"){
					subStatus = (subStatus=="")?"count":subStatus;
					Obj1.field.api_name =prefix+"Positive";Obj1.comparator = comp;Obj1.value = "${"+subStatus.toUpperCase()+"|"+val+"}" //no i18n
					temp = JSON.parse(JSON.stringify(Obj1));
				}
				if(by == "Negative"  || by == "PositiveAndNegative" || by=="PositiveOrNegative" || by == "NegativeOnly"){
					subStatus = (subStatus=="")?"count":subStatus;
					Obj2.field.api_name =prefix+"Negative";Obj2.comparator = comp;Obj2.value ="${"+subStatus.toUpperCase()+"|"+val+"}" //no i18n
					temp = JSON.parse(JSON.stringify(Obj2));
				}
				if(by == "PositiveAndNegative"){ //no i18n
					temp = this.construct_group(Obj1,Obj2,'AND') //no i18n
				}else if( by == "PositiveOrNegative"){ //no i18n
					temp = this.construct_group(Obj1,Obj2,'OR') //no i18n
				}else if(by == "PositiveOnly"){ //no i18n
					Obj2.field.api_name = prefix+"Negative" ;Obj2.comparator = "equal" , Obj2.value = "${COUNT|0}" //no i18n
					temp = this.construct_group(temp,Obj2,'AND') //no i18n
				}else if(by == "NegativeOnly"){ //no i18n
					Obj2.field.api_name = prefix+"Positive" ; Obj2.comparator = "equal" , Obj2.value = "${COUNT|0}" //no i18n
					temp = this.construct_group(temp,Obj2,'AND') //no i18n
				}else if( by == "Neutral"){ //no i18n
					subStatus = (subStatus=="")?"count":subStatus;
					Obj1.field.api_name = prefix+"Neutral";Obj1.comparator = comp;Obj1.value = "${"+subStatus.toUpperCase()+"|"+val+"}" //no i18n
					temp = JSON.parse(JSON.stringify(Obj1));
				}
			}
			res = res = this.construct_group(receivedDate,temp,'AND') //no i18n
			var cross_filter = {}
			cross_filter.include_objects = true
			cross_filter.relation = {}
			cross_filter.relation.api_name = prefix ? "Contacts" :"Email_Sentiment" //no i18n
			cross_filter.criteria = res
			res = cross_filter
		}
		return res;
	},
	// TODO: Surya
	getEmailBlockedCriteria : function(api_name){
		let blockType = api_name==='Email' ? $L('input[name=option_'+api_name+']:checked').val().split('_')[2] : $L('input[name=option_'+api_name+']:checked').val().split('_')[3];
		let fieldApiNameUpperCase = api_name === 'Email'? 'EMAIL' : 'ADDN_EMAIL';//no i18n
		if(blockType==="both"){
			value = "${BLOCKED}";
		}else{
			let subOption = $L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.data.selectedValues;//no i18n
			let bounceCategory = subOption.byDropDownValue;
			let firstDropDown = subOption.firstDropDownValue;
			let secondDropDown = subOption.secondDropDownValue;
			if(firstDropDown.includes('Age in') || firstDropDown.includes('Due in')){
				firstDropDown = firstDropDown.replace('Days',secondDropDown);
				let numComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0];
				let numberComp = numComp ? numComp.component.getValue() : '';
				if(!numberComp){
					this.showFilterAlert("Enter a valid number",numComp.component);//no i18n
					return {isValdationFailure: true}
				}
				firstDropDown = firstDropDown.replaceAll(' ','');
				firstDropDown = firstDropDown.toUpperCase();
				firstDropDown = 'less_than {' +firstDropDown+ '}+'+numberComp;
			}else if(firstDropDown === 'less_than' || firstDropDown === 'greater_than'){
				let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
				if(!dateComp){
					this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
					return {isValdationFailure: true}
				}
				dateComp = this.getISODateTime(dateComp,this.datePattern)
				firstDropDown = firstDropDown.toUpperCase();
				firstDropDown = firstDropDown+' '+dateComp;
			}else if(firstDropDown === 'equal'){
				let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
				if(!dateComp){
					this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
					return {isValdationFailure: true}
				}
				let dateComp1 = this.getISODateTime(dateComp,this.datePattern);
				let dateComp2 = this.getISODateTime(dateComp,this.datePattern,"end");
				//firstDropDown = firstDropDown.toUpperCase();
				firstDropDown = "between";
				firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
			}else if(firstDropDown === 'between'){
				let dateComp1 = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
				if(!dateComp1){
					this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
					return {isValdationFailure: true}
				}
				dateComp1 = this.getISODateTime(dateComp1,this.datePattern);
				let dateComp2 = $L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
				if(!dateComp2){
					this.showFilterAlert("Enter a valid date",$L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
					return {isValdationFailure: true}
				}
				dateComp2 = this.getISODateTime(dateComp2,this.datePattern,"end")
				//firstDropDown = firstDropDown.toUpperCase();
				firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
			}else{
				firstDropDown = comparator + ' '+ firstDropDown;
			}
				value = "${BLOCKED_" +bounceCategory.toUpperCase()+'}' +' '+firstDropDown ;
		}
		return value;
	},
	setEmailBlockedCriteria: function(api_name,criteria){
		let blockedArray = criteria.split(' ');
		let bounceCategory = blockedArray[0];
		let fieldApiNameUpperCase = api_name == 'Email'? 'EMAIL' : 'ADDN_EMAIL';//no i18n
		if(bounceCategory==='${BLOCKED}'){
			$L('#sub_field_cxFilter_'+fieldApiNameUpperCase+'_both')[0].ltProp('checked',true);
		}else{
			blockedArray[0] = blockedArray[0].replace('${BLOCKED_','');
			blockedArray[0] = blockedArray[0].replace('}','');
			let blockTypeAndCategory = blockedArray[0].split("_");
			let blockType = blockTypeAndCategory[0].toLowerCase();
			$L('#sub_field_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('checked',true);
			let subOption = {};
			bounceCategory = bounceCategory.replace('${BLOCKED_','').replace('}','').toLowerCase();
			subOption.byDropDownValue = bounceCategory; 
			if(blockedArray[2].endsWith('}')){ 
				subOption.firstDropDownValue = blockedArray[2];
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.setData('selectedValues',subOption); 
				// new chnages
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.triggerGetDropDownVal(subOption.firstDropDownValue,$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component);
				$L('#DDV_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('selected',subOption.firstDropDownValue);
			}else if(blockedArray[2].includes('+')){ 
				let subValues = blockedArray[2].split('+');
				subValues[0] = subValues[0].replace('{','').replace('}','');
				subOption.secondDropDownValue = subValues[0].endsWith('DAYS') ? 'DAYS' : (subValues[0].endsWith('MONTHS')?'MONTHS' : 'WEEKS'); 
				subValues[0].replace(subOption.secondDropDownValue,'DAYS');
				subOption.firstDropDownValue = (subValues[0].includes('AGEINDAYS') || subValues[0].includes('AGEINMONTHS') || subValues[0].includes('AGEINWEEKS')) ? 'Age in Days' : 'Due in Days'; 
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.setData('selectedValues',subOption);
				// new chnages
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.triggerGetDropDownVal(subOption.firstDropDownValue,$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component);
				$L('#DDV_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('selected',subOption.firstDropDownValue);
				$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].cxProp('value',subValues[1]); 
				// $L('#id_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('value',subValues[1]); 
			}else{ 
				subOption.firstDropDownValue = blockedArray[1].trim().toLowerCase();
				if(blockedArray[3] && blockedArray[2] &&blockedArray[2].substr(0,blockedArray[2].indexOf('T')) === blockedArray[2].substr(0,blockedArray[3].indexOf('T'))){
					subOption.firstDropDownValue = "equal";
				}
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.setData('selectedValues',subOption);
				// new chnages
				$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.triggerGetDropDownVal(subOption.firstDropDownValue,$L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component);
				$L('#DDV_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('selected',subOption.firstDropDownValue);
							
				$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp').attr('value',Utils.getDateInGivenPattern($L.moment(blockedArray[2]).toDate(),Crm.userDetails.DATE_PATTERN.toLowerCase()));
				if(subOption.firstDropDownValue!=='equal' && blockedArray[3]){
					$L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp').attr('value',Utils.getDateInGivenPattern($L.moment(blockedArray[3]).toDate(),Crm.userDetails.DATE_PATTERN.toLowerCase()));
				}
			}
		}
		$L('crux-smart-filter')[0].component.setData('blockedCriteria.'+api_name,'');
		let isPrimary = api_name==='Email';
		let $viewName = $L('#listViewModuleChange');
		let viewName = ($viewName.length && $viewName[0].ltProp) ? $viewName[0].ltProp('selected') : 'list';
		if(Crm.userDetails.EMAIL_BOUNCE_MANAGEMENT){
			if((viewName==='list' || viewName==='table' || viewName==='card' || viewName==='kanban') && isPrimary){
				$L('.emailUnblocking.Email').removeClass('hide');
			}
			else if((viewName==='list' || viewName==='table' || viewName==='card' || viewName==='kanban') && !isPrimary){
				$L('.emailUnblocking.Secondary_Email').removeClass('hide');
			}
			else if(viewName==='canvas' && isPrimary){
				$L('.emailUnblocking.Email').removeClass('hide');
				$L('.emailUnblocking.EMAIL').removeClass('hide');
			}
			else if(viewName==='canvas' && !isPrimary){
				$L('.emailUnblocking.Secondary_Email').removeClass('hide');
				$L('.emailUnblocking.ADDN_EMAIL').removeClass('hide');
			}
		}
	},
	construct_group : function(Obj1,Obj2,Op){
		var group=[];
		if(Obj1 == null || Obj1.length == 0){
			return Obj2
		}
		if(Obj2 == null || Obj2.length == 0){
			return Obj1
		}

		Lyte.arrayUtils(group, "push",JSON.parse(JSON.stringify(Obj1)));//No I18n
		Lyte.arrayUtils(group, "push", JSON.parse(JSON.stringify(Obj2)));//No I18n
		return { group_operator : Op , group : group}
	},
	sortArray : function(array,label){
		array.sort(function(a, b) {
			if(  !a[label] ){
				return 0;
			}
			  var nameA = a[label].toUpperCase(); 
			  var nameB = b[label].toUpperCase();
			  if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
			  return 0;
		});
		return array
	},
	getISODateTime : function(currDate,datePattern,time="start" , type ="datetime", addTimeZone = true){
		if(!currDate){
			return '';
		}
		datePattern = !datePattern ? "":datePattern;
		currDate =this.convertUsrtoDefaultDatePattern(currDate,datePattern);
		if( time != "start" ){
			currDate.setHours(23,59,59,999);
		}
		
		// Lyte.Component.registeredHelpers.stringToDate(currDate,Crm.userDetails.DATE_PATTERN) //no i18n
		//currDate =new Date( currDate.getUTCFullYear() + '/' + (currDate.getUTCMonth() +1) + '/' + currDate.getUTCDate() )
		currDate.setTime(currDate.getTime()-(currDate.getTimezoneOffset()*60000) )
		currDate = currDate.toISOString().split(/\./)[0] ;
		if( type == "date" ){
			currDate = /^(.*)T/.exec(currDate,datePattern)[1];
			return currDate
		}
		var timeZone = addTimeZone && this.getData("cxPropTimeZone") ? this.getData("cxPropTimeZone")  : "";
		return currDate+timeZone;
	},

	// getISODateStartTime : function(currDate,datePattern,type="start"){
	// 	if(!currDate){
	// 		return '';
	// 	}
	// 	var checkLocale = ( ['dd.mm.yyyy.','yyyy. mm. dd','yyyy.mm.dd',"yyyy'年'mm'月'dd'日'"].indexOf(Crm.userDetails.DATE_PATTERN.toLowerCase()) != -1) ? true : false;//no i18n
	// 	currDate =this.convertUsrtoDefaultDatePattern(currDate,checkLocale);
	// 	// Lyte.Component.registeredHelpers.stringToDate(currDate,Crm.userDetails.DATE_PATTERN) //no i18n
	// 	//currDate =new Date( currDate.getUTCFullYear() + '/' + (currDate.getUTCMonth() +1) + '/' + currDate.getUTCDate() )
	// 	currDate.setTime(currDate.getTime()-(currDate.getTimezoneOffset()*60000) )
	// 	currDate = currDate.toISOString().split(/\./)[0] ;
	// 	return currDate
	// },
	// getISODateEndTime : function(currDate){
	// 	if(!currDate){
	// 		return '';
	// 	}
	// 	var checkLocale = ( ['dd.mm.yyyy.','yyyy. mm. dd','yyyy.mm.dd',"yyyy'年'mm'月'dd'日'"].indexOf(Crm.userDetails.DATE_PATTERN.toLowerCase()) != -1) ? true : false;//no i18n
	// 	currDate = this.convertUsrtoDefaultDatePattern(currDate,checkLocale);
		
	// 	currDate.setTime(currDate.getTime()-(currDate.getTimezoneOffset()*60000) )
	// 	currDate = currDate.toISOString().split(/\./)[0] ;
	// 	return currDate;
	// },
	getMilliSecondsfromDuration : function (value, durationType) {
		if (!value || !durationType) {
			return '';
		}
		return value*this.durationClass(durationType);
	},
	getDurationfromMilliSeconds : function (value, durationType) {
		if (!durationType) {
			return this.getTimeValue(value);
		} else {
			return value/this.durationClass(durationType);
		}
	},
	durationClass: function (type) {
		const sec = 1000,
		min = 60 * sec,
		hour = 60 * min,
		day = 24 * hour,
		week = 7 * day,
		month = 30 * day,
		year = 365 * day;
		switch (type) {
			case "SECONDS":
				return sec;
			case "MINUTES":
				return min;
			case "HOURS":
				return hour;
			case "DAYS":
				return day;
			case "WEEKS":
				return week;
			case "MONTHS":
				return month;
			case "YEARS":
				return year;
			default:
				return 1;
		}
	},
	getTimeValue: function (milliSec) {
		var valueObj = {"value" : 0, "durationType" : ''};		//NO I18N
		const second = this.durationClass("SECONDS"),	//NO I18N
		minute = this.durationClass("MINUTES"),		//NO I18N
		hour = this.durationClass("HOURS"),		//NO I18N
		day = this.durationClass("DAYS"),		//NO I18N
		week = this.durationClass("WEEKS"),		//NO I18N
		month = this.durationClass("MONTHS"),	//NO I18N
		year = this.durationClass("YEARS");		//NO I18N
		if (milliSec >= year && milliSec%year === 0) {
			valueObj.value = milliSec/year;
			valueObj.durationType = "YEARS";	//NO I18N
		} else if (milliSec >= month && milliSec%month === 0) {
			valueObj.value = milliSec/month;
			valueObj.durationType = "MONTHS";	//NO I18N
		} else if (milliSec >= week && milliSec%week === 0) {
			valueObj.value = milliSec/week;
			valueObj.durationType = "WEEKS";	//NO I18N
		} else if (milliSec >= day && milliSec%day === 0) {
			valueObj.value = milliSec/day;
			valueObj.durationType = "DAYS";	//NO I18N
		} else if (milliSec >= hour && milliSec%hour === 0) {
			valueObj.value = milliSec/hour;
			valueObj.durationType = "HOURS";	//NO I18N
		} else if (milliSec >= minute && milliSec%minute === 0) {
			valueObj.value = milliSec/minute;
			valueObj.durationType = "MINUTES";	//NO I18N
		} else {
			valueObj.value = milliSec/second;
			valueObj.durationType = "SECONDS";	//NO I18N
		}
		return valueObj;
	},
	getMulSelLookUpField : function(module_name,relation){
		var ModFields = this.moduleRecordMapping[module_name].fields , len = ModFields.length , i=0
		for(;i < len ; i++){
			if( ModFields[i].data_type == "multiselectlookup"  || ModFields[i].data_type == "multiuserlookup" ){
				if(ModFields[i][ModFields[i].data_type].api_name == relation.api_name){
					return ModFields[i]
				}
				
			}
		}
		return
	},
	getRelationDetails : function(module_name,linking_module){
		var related_list = this.moduleRecordMapping[module_name].related_lists
		if(related_list){
			var len = related_list.length , i= 0
			for(;i < len ;i++){
				if(related_list[i].api_name == linking_module){
					return related_list[i]
				}
			}
		}
		return
	},
	isVisitsField  : function(criteria){
		var visitField = {LASTVISITEDTIME : "Last_Visited_Time", AVERAGETIMESPENT : "Average_Time_Spent_Minutes" , DAYSVISITED : "Days_Visited" , FIRSTVISITEDURL : "First_Visited_URL" , FIRSTVISITEDTIME : "First_Visited_Time" , NUMBEROFCHATS : "Number_Of_Chats" , REFERRER : "Referrer" , VISITORSCORE : "Visitor_Score" , ATTENDEDBY : "Attended_By" ,BROWSER : "Browser" ,OPERATINGSYSTEM : "Operating_System" ,PORTAL_NAME : "Portal_Name" ,SEARCHENGINE : "Search_Engine" ,TIMESPENT : "Time_Spent" ,VISITEDTIME : "Visited_Time"} //no i18n
		if(criteria == "AVERAGETIMESPENT" || criteria ==  "DAYSVISITED"|| criteria ==  "FIRSTVISITEDURL"|| criteria ==  "FIRSTVISITEDTIME"|| criteria ==  "LASTVISITEDTIME"|| criteria == "NUMBEROFCHATS" || criteria == "REFERRER" || criteria ==  "VISITORSCORE" ){
			return {isVisits : true, fieldtype : "normalField", api_name : visitField[criteria]} //no i18n
		}
		if(criteria ==  "ATTENDEDBY" || criteria == "BROWSER" ||criteria ==  "OPERATINGSYSTEM"||criteria ==  "PORTAL_NAME"||criteria ==  "SEARCHENGINE"||criteria ==  "TIMESPENT"||criteria == "VISITEDTIME" ) { //no i18n
			return {isVisits : true, fieldtype : "crossField",api_name : visitField[criteria]} //no i18n
		}
		return false
	},
	negative_Comparator : function(comparator){
		var op = { equal : "not_equal",not_equal : "equal",less_than : "greater_than",less_equal : "greater_equal",greater_than : "less_than", greater_equal : "less_equal",between : "not_between",not_between : "between"} //no i18n 
		return op[comparator] ? op[comparator] : comparator;
	},
	checkLimitValues : function(str,type){
		if(["text","textarea","phone","email","mobile","website"].type(type) != -1 && str.constructor == Array && str.length >50){
			this.showFilterAlert(_cruxUtils.getI18n('crm.alert.maximum.text.values.contains', 50));//no i18n
			return false;
		}
		return true;
	},
	isZBCustomModule : function(key){
		var zbModules = ["CustomModule5001", "CustomModule5002", "CustomModule5003", "CustomModule5004", "CustomModule5005"];	//No I18N
		return zbModules.indexOf(key) >= 0;
	},
	removeValue : function( values , key ,rem_val){
		for( var i = 0 ; values[i] ; i++ ){
			if( rem_val.indexOf(values[i][key]) != -1 ){
				values.splice(i,1);
				i = i - 1;
			}
		}
	},
	updateCrossFilter : function( array , relation , value ){
 		var  i = 0 , len = array.length , flag = false;
		for( ; i < len ; i++ ){
			if(array[i].relation && array[i].relation.type !== "related_list" &&  (array[i].relation.api_name === relation || (array[i].relation.relation && array[i].relation.relation.api_name === relation))
					&& (!value.relation || value.relation.type !== "related_list")){
				flag  = true;
				// if( !array[i].criteria.group ){
				// 	array[i].criteria = { group : [array[i].criteria] };
				// 	array[i].criteria.group_operator = "AND";
				// }
				array[i].include_objects = array[i].include_objects == false  || value.include_objects == false ? false : true;
				var criteria = this.construct_group( array[i].criteria , value.criteria , "AND" );//no i18n
				array[i].criteria = criteria
				// Lyte.arrayUtils(array[i].criteria.group, "push", value.criteria);//No I18n
				break;
			}
		}
		if( !flag ){
			Lyte.arrayUtils(array, "push", value);//No I18n
		}
	},
	getIndex : function(array,api_name,label,flag){
		var i=0,len = (array) ? array.length : 0;//no i18n 
		for(i=0;i<len;i++){
			if(array[i][label] == api_name){
				if(flag){
					return i
				}
				return array[i].index
			}
		}
		return false
	},
	getValueBasedonKeys : function(value,label){
		
		var i = 0 , len = value.length , res = []
		for(;i<len;i++){
			res.push({id : value[i].id,name : value[i][label]});
		}
		return res;
	},
	sendxhr :function(url,method,headers,formData){
		return new Promise(function(res, rej){
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			headers = headers ? headers : {};
			headers["X-ZCSRF-TOKEN"] = csrfParamName + "=" + csrfToken; //No I18n
			if(window.clientPortalName){
				headers["X-CRMPORTAL"] = window.clientPortalName //No I18N
			}
			if(typeof crmZgid !== 'undefined' && crmZgid ){
				headers["X-CRM-ORG"] = crmZgid; //No I18N
			}
			for(var header in headers){
				xhr.setRequestHeader(header, headers[header]);
			}
			xhr.send(formData);
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status.toString()[0] == "2" || xhr.status.toString()[0] == "3"){
						return res(xhr);
					}
					else{
						return rej(xhr);
					}
				}
			}
		})
	},
	convertUsrtoDefaultDatePattern : function(newDate, userDatePattern){ //No I18N
		if(!newDate)
		{
			return '';
		}	
		if( ! newDate.getMonth)
		{
			var	datePattern = userDatePattern.toUpperCase();			
			
			try{
				newDate = $L.moment(newDate, datePattern , {i18n : true }).getDObj();
			}catch(e){ 
				murphy.error(e);
			}	
		}
		return newDate;
	},
	showFilterAlert : function(msg,comp){
		var check=true;
		if(this.getMethods('onBeforeErrorAlert')){
			check=this.executeMethod('onBeforeErrorAlert',msg);//No I18N
		}
		if(check){
			// var alert=$L("#cxFilterAlert")[0]; //No I18N
			// var cruxSmartComp = $L("crux-smart-filter")[0];
			// cruxSmartComp.setData("alertMsg",msg);
		_cruxUtils.showCustomAlert({ 
			params : { 
			cxPropYield : true,
			cxPropHeading : Lyte.Component.registeredHelpers.cruxEncodeHTML(msg), 
			// cxPropType : "warning",
			cxPropButtonPosition : 'center',
			cxPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary", "cxPropZcqa": "button_primary"}],
			cxPropWrapperClass : "cxSmartFilterAlert",
			id : "cxFilterAlert"
			},
			show : function(){
				$L(".cxSmartFilterAlert lyte-button").focus(); //eslint-disable-line @zoho/webperf/no-complex-selector
			},
			close : function(){
				if(comp&&comp.$node ){
					comp = comp.$node;
				}

				if( comp ){
					var elem = comp.querySelector( 'lyte-input,lyte-number' );//no i18n
					elem && elem.focus();
				}
			}});	
			// this.setData('alertMsg',msg); //No I18N
		// 	if( alert.ltProp("show") == true ){
		// 		return
		// 	}
		// 	alert.ltProp('show',true); //No I18N
		// 	alert.setMethods({onClose : function(){
		// 		if(comp&&comp.$node ){
		// 			comp = comp.$node;
		// 		}

		// 		if( comp ){
		// 			var elem = comp.querySelector( 'lyte-input,lyte-number' );//no i18n
		// 			elem && elem.focus();
		// 		}
                
		// 		// if(comp && comp.querySelector("lyte-input")){
		// 		// 	comp.querySelector("lyte-input").focus();//No I18n
		// 		// }else if(comp && comp.querySelector("lyte-number")){//no i18n
		// 		// 	comp.querySelector("lyte-number").focus();//No I18n
		// 		// }
		// 	},onShow : function(){
		// 		$L(".cxSmartFilterAlert lyte-button").focus();//No I18N
		// 	}
		// })
			if(this.getMethods('onErrorAlert')){
				this.executeMethod('onErrorAlert',msg);//No I18N
			}
		}
	},
	getDisplayValue : function(value, field , key = 'actual_value' , pickListValues = [] , compKey = "display_value"){
		var ret = [] ;
		pickListValues = pickListValues.length ? pickListValues : field.pick_list_values;
		value.forEach(function(display_value){
			// var found = false;
			pickListValues.forEach(function(val){
				if(val[compKey] === display_value){
				// if( val.actual_value === display_value || val.display_value === display_value ){
					ret.push(val[key]);
					// found = true;
					return;
				}
			});
			// if(!found){
			// 	ret.push(display_value);
			// }
		});
		return ret;
	},
	setModuleMappingData : function(){
		if( Object.keys(this.data.cxPropModuleRecordMapping).length === 0 && typeof moduleRecordMapping !== "undefined" ){
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping);
		}
		var idModuleMap = {} , moduleMap = this.data.cxPropModuleRecordMapping;
		for (var key in moduleMap) {
			idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
		}
		this.setData("idModuleMapping",idModuleMap);
		this.idModuleMapping = idModuleMap;
		this.moduleRecordMapping = this.data.cxPropModuleRecordMapping;
	},
	getFieldDataType : function(fld){
		if( fld.column_name === "FULLNAME" && (this.data.cxPropModule === "Leads" || this.data.cxPropModule === "Contacts") ){ //no i18n
			fld.display_field_label = this.data.cxPropModule === "Leads" ? _cruxUtils.getI18n("crm.label.vendor.name",this.moduleRecordMapping.Leads.singular_label) : _cruxUtils.getI18n("crm.label.vendor.name",this.moduleRecordMapping.Contacts.singular_label);//no i18n
			fld.field_label = fld.display_field_label;
		}else if(fld.data_type === "formula" || (fld.rollup_summary && fld.rollup_summary.return_type)){ 
			fld.field_data_type =  fld.formula.return_type ?  fld.formula.return_type :  fld.rollup_summary.return_type;//no i18n
		}else if(["LAYOUTID","TAGMODULEREFID","ACTIVITYTYPE","WIZARDID"].indexOf(fld.column_name) !== -1){ //no i18n
			var typeMap = {LAYOUTID : "layout",TAGMODULEREFID : "tag",ACTIVITYTYPE : "picklist",WIZARDID : "layout"}; //no i18n
			fld.field_data_type = typeMap[fld.column_name];
			if( fld.api_name ===  "Service_Members"){ 
				fld[typeMap[fld.api_name]] = fld.multiselectlookup;//no i18n
			}
		}else if(fld.ui_type === 53 ){
			fld.cxGetValueInMS = fld.cxGetValueInMS === undefined ? true : fld.cxGetValueInMS;
			fld.field_data_type = "date";
		}else if( this.data.cxPropModule === "Services" && fld.column_name === "MXNDUMMYCOLUMN_SERVICE" ){
			fld.field_data_type = "multiuserlookup";
			fld.multiuserlookup = fld.multiselectlookup;
		}else if( fld.data_type === "multi_module_lookup" ){
			fld.field_data_type = "lookup";
		}
		if(fld.field_data_type === undefined){
			fld.field_data_type = fld.data_type;
		}
		if (this.data.cxPropEnableDateTime && fld.field_data_type === "datetime") {
			fld.field_data_type = "date_time";
		}
		return fld.field_data_type;
	}
});


/**
 * @component crux-smart-filter
 * @author silabmbarasan.rt
 * @notes Make sure each field as available_in_user_layout , filterable , visible property as true
 */
Lyte.Component.register("crux-smart-filter", {
_template:"<template tag-name=\"crux-smart-filter\"> <template is=\"if\" value=\"{{cxPropSearch}}\"><template case=\"true\"> <div class=\"filterSearchElement cxSmFrSearchWrapper\"> <template is=\"if\" value=\"{{cxPropHeaderYield}}\"><template case=\"true\"><lyte-yield yield-name=\"header-yield\" label=\"{{cxPropSearchLabel}}\"></lyte-yield></template><template case=\"false\"><template is=\"if\" value=\"{{cxPropSearchLabel}}\"><template case=\"true\"><lyte-text class=\"filterSearchHeader cxSmFrSearchHeader\" id=\"{{module_info.plural_label}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;followcursor&quot;,&quot;margin&quot;:20, &quot;appearance&quot;:&quot;box&quot;}\" lt-prop-value=\"{{cxPropSearchLabel}}\"></lyte-text></template></template></template></template> <div class=\"cxFilterLyteSearchWrapDiv cxColListSearchWrap cxSearchWrapper\"> <lyte-search id=\"searchId\" lt-prop-appearance=\"box\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;.leftFilterHead.{{cxPropClass}}_cxFilterContainer&quot;,&quot;target&quot;:&quot;.cxSmartFilterList.{{cxPropClass}}_cxFilterItem&quot;,&quot;search&quot;:&quot;.field_search:not(.cxdN)&quot;}\" on-search=\"{{method('filterSearch')}}\" on-after-search=\"{{method('showChildFieldsOnSearch')}}\" lt-prop-placeholder=\"{{cruxGetI18n('crm.label.search')}}\" data-zcqa=\"lv_filter_srch_input\"> </lyte-search> <span class=\"searchCloseOpen cxColListSearchClearWrap cxSmFrSearchCloseIconWrap cxdN\" data-zcqa=\"lv_filter_search_clear\" onclick=\"{{action('clearSearch')}}\"> <span class=\"cxSearchClearIcon\"></span> </span> </div> </div> </template></template> <div class=\"cxFilterScrollSection\"> <div id=\"lv_filter_scroll\" class=\"cxSmartFilterScrollElem leftFilterHead {{cxPropClass}}_cxFilterContainer {{cxPropClass}}\" onscroll=\"{{action('scrollAct')}}\"> <div class=\"setHorizontalPadding\"> <lyte-popover lt-prop-duration=\"{{defaultUndefined}}\" lt-prop-origin-elem=\".informationpredict\" lt-prop-show-close-button=\"false\" id=\"tooltipPredictionScore\" lt-prop-wrapper-class=\"predictionPopover\" lt-prop-freeze=\"false\"> <template is=\"registerYield\" yield-name=\"popover\"> <div class=\"tooltip_cnt\" style=\"max-height: 251.375px; overflow: auto;\"> <lyte-popover-header>{{cruxGetI18n('crm.lead.prediction.tooltip')}}</lyte-popover-header> <lyte-popover-content> <lyte-table lt-prop-content=\"{{unbound(predictionScoreContent)}}\" lt-prop-header=\"{{unbound(predictionScoreHeader)}}\" lt-prop-header-label-key=\"data\" lt-prop-body-label-key=\"bodyData\"> </lyte-table> </lyte-popover-content> </div> </template> </lyte-popover> <lyte-accordion lt-prop-nested=\"true\" lt-prop-dynamic=\"true\" lt-prop-duration=\"0.2s\" lt-prop-exclusive=\"false\" class=\"nLVFilterAcc\" on-changed=\"{{method('accStateChange')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{noResult.showNoResult}}\"><template case=\"true\"> <div class=\"cxSmFrNoresult\">{{cxPropNoResultMsg}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(cxPropReorderToSectionTop,'!')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{appliedFields}}\" item=\"fieldItem\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropChildModuleFields,'!'),'||',expHandlers(fieldItem.cxHide,'!'))}}\"><template case=\"true\"><div class=\"cvFilterList cxSmartFilterList {{cxPropClass}}_cxFilterItem {{cxPropClass}} {{fieldItem.classInFilter}}\" field-ind=\"{{fieldItem.cxFilterIndex}}\"> <template is=\"if\" value=\"{{cxPropChildModuleFields}}\"><template case=\"true\"> <span id=\"crossFilter_close_{{id}}_{{fieldItem.id}}\" data-zcqa=\"crossFilter_close_{{cxPropChildModuleDisplayLabel}}_{{index}}\" class=\"cxSmFrCrossFldCloseIcon\" onclick=\"{{action('onCloseChildField',fieldItem,this)}}\"> </span> </template></template> <div class=\"cxSmFrFieldWrap\"> <div class=\"cxSmFrDisplayFieldLabelWrapper\"> <template is=\"if\" value=\"{{cxPropChildModuleFields}}\"><template case=\"true\"> <lyte-dropdown id=\"customFilter_DropDown_{{id}}_{{fieldItem.id}}\" data-zcqa=\"crossFilter_dropDown_{{cxPropChildModuleDisplayLabel}}_{{index}}\" lt-prop-placeholder=\"{{cxPropCrossFilterTranslations.selectField}}\" lt-prop-freeze=\"true\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-selected=\"{{if(fieldItem.showDummyInput,'',fieldItem.id)}}\" lt-prop-show-empty-message=\"true\" lt-prop-box-button-width=\"same\" lt-prop-no-result=\"{{cruxGetI18n('crm.template.listview.search.no.results')}}\" before-select=\"{{method('updateDropSelectedFields')}}\" class=\"cxSmFrCrossFldChildDropdown\" field=\"{{fieldItem}}\" on-show=\"{{method('onDropDownShow')}}\" on-hide=\"{{method('onDropDownHide')}}\" drop-index=\"{{index}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-header> <lyte-search ind=\"{{fieldItem.id}}\" on-search=\"{{method('onSearchFieldDropDown')}}\" lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" lt-prop-close-icon=\"true\" lt-prop-query-selector=\" { &quot;scope&quot; : &quot;.customFilter_dropBody_{{id}}_{{fieldItem.id}}&quot; , &quot;search&quot; : &quot;lyte-drop-item:not(.cxdN)&quot; , &quot;label&quot; : &quot;lyte-drop-label&quot; } \"> </lyte-search> </lyte-drop-header> <lyte-drop-body class=\"customFilter_dropBody_{{id}}_{{fieldItem.id}}\"> <div class=\"pR noresultstyle cxdN\" id=\"customFilter_DropDownNoResult_{{id}}_{{fieldItem.id}}\">{{cruxGetI18n('crm.template.listview.search.no.results')}}</div> <template is=\"for\" items=\"{{cxPropDropBoxChildFields}}\" item=\"cfld\" index=\"index\"> <lyte-drop-item class=\"{{if(expHandlers(cfld.hideInDropDown,'&amp;&amp;',expHandlers(cfld.id,'!=',fieldItem.id)),'cxdN','')}}\" data-value=\"{{cfld.id}}\">{{cfld.field_label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <lyte-checkbox data-zcqa=\"{{fieldItem.display_field_label}}\" title=\"{{fieldItem.display_field_label}}\" lt-prop-type=\"default\" class=\"checkbox field_search checkFilter userSelectNone {{if(cxPropChildModuleFields,'cxdN','')}}\" index=\"{{fieldItem.cxFilterIndex}}\" field-ind=\"{{index}}\" id=\"field_{{cruxReplace(fieldItem.api_name,'[/.]','_')}}\" lt-prop-label=\"{{fieldItem.display_field_label}}\" on-before-checked=\"{{method('checkBoxBeforeCheck',fieldItem)}}\" on-changed=\"{{method('showHideSelectionFilter',fieldItem)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{expHandlers(fieldItem.subField,'&amp;&amp;',fieldItem.cxTooltipInfo)}}\"><template case=\"true\"> <span class=\"cxSmFrInfoIcon\" lt-prop-title=\"{{fieldItem.cxTooltipInfo}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;top&quot; } \" lt-prop-tooltip-style=\"max-width : 150px;\"></span> </template></template> </div> <template is=\"if\" value=\"{{fieldItem.rendered}}\"><template case=\"true\"> <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp {{if(ifEquals(fieldItem.subField,true),,'dN')}} {{if(cxPropChildModuleFields,'childFieldSmartInput','')}}\" id=\"option_{{cruxReplace(fieldItem.api_name,'[/.]','_')}}{{if(cxPropChildModuleFields,expHandlers(expHandlers(expHandlers('_','+',fieldItem.id),'+','_'),'+',cxPropChildModuleRelation),'')}}\" cx-prop-field=\"{{fieldItem}}\" module=\"{{if(cxPropChildModuleFields,cxPropChildModuleName,cxPropModule)}}\" index=\"{{fieldItem.cxFilterIndex}}\" field-ind=\"{{index}}\" module-display-field=\"{{cxPropModuleDisplayField}}\" on-value-change=\"{{method('inputValueChange')}}\" boundary=\"{{cxPropBoundary}}\" is-child-input=\"{{if(cxPropChildModuleFields,'true','false')}}\" prop-filter-view=\"{{cxPropFilterView}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" cx-prop-group-support=\"{{cxPropGroupSupport}}\" cx-prop-role-support=\"{{cxPropRoleSupport}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"> </crux-smart-filter-input> <template is=\"if\" value=\"{{expHandlers(expHandlers(fieldItem.data_type,'==',&quot;crossModule&quot;),'&amp;&amp;',expHandlers(fieldItem.childFields.length,'>',0))}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-smart-filter.html\",\"Feb Default Changes\")}} <div class=\"{{if(ifEquals(fieldItem.subField,true),,'dN')}}\"> <crux-smart-filter-crossfields cx-prop-user-field-properties=\"{{cxPropUserFieldProperties}}\" set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-module-field=\"{{fieldItem}}\" cx-prop-child-fields=\"{{fieldItem.childFields}}\" on-value-change=\"{{method('onChildValueChange')}}\" on-field-change=\"{{method('onChildFieldChanged')}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-child-field-limit=\"{{cxPropChildFieldLimit}}\" cx-prop-child-field-limit-tooltip=\"{{cxPropChildFieldLimitTooltip}}\" class=\"{{if(fieldItem.rendered,'crossFieldsChecked','crossFieldsUnChecked')}}\" cx-prop-module-display-field=\"{{cxPropModuleDisplayField}}\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\"> </crux-smart-filter-crossfields> </div> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropChildModuleFields,'&amp;&amp;',fieldItem.showDummyInput)}}\"><template case=\"true\"> <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp eventNone disable childFieldSmartInput\" id=\"option_dummy_input\" cx-prop-field=\"{{dummyField}}\" module=\"{{cxPropModule}}\" prop-filter-view=\"{{cxPropFilterView}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"></crux-smart-filter-input> </template></template></template></template> </div> </div></template></template> </template> </template></template> <template is=\"for\" items=\"{{allFields}}\" item=\"field\" index=\"index\"> <template is=\"if\" value=\"{{field.cxAccordion}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(field.cxHideAccordion,'!')}}\"><template case=\"true\"><lyte-accordion-item acc-ind=\"{{index}}\" class=\"lyteAccordionActive nLVFilterAccItems\" id=\"{{field.cxAccordionName}}\"> <lyte-accordion-header class=\"{{if(field.cxAccordionInfo,'cxSmFrAccHeadWithInfo','')}}\"> <lyte-text class=\"cxSmFrAccHeading\" lt-prop-value=\"{{field.cxAccordionLabel}}\"></lyte-text> <template is=\"if\" value=\"{{field.cxAccordionInfo}}\"><template case=\"true\"><crmutil-icon class=\"mL7 op7\" lt-prop-title=\"{{cruxGetI18n('abm.filters.info',cxPropCommonInfo.abmModuleInfo.parentModuleDisplayName,cxPropCommonInfo.abmModuleInfo.currentModuleDisplayName)}}\" icon-name=\"info-rounded\" icon-class=\"zcicn-info-rounded\"></crmutil-icon></template></template> <lyte-icon class=\"lyteAccordionArrow\"></lyte-icon> </lyte-accordion-header> <lyte-accordion-body class=\"{{field.cxClass}}\"> <template is=\"if\" value=\"{{field.cxNoResult}}\"><template case=\"true\"> <div class=\"cxSmFrNoresult\">{{cxPropNoResultMsg}}</div> </template></template> <div class=\"cxSmFrAccordionBodyDiv\"> <template is=\"for\" items=\"{{field.cxFields}}\" item=\"fld\" index=\"ind\"> <template is=\"if\" value=\"{{fld.cxHeader}}\"><template case=\"true\"> <div class=\"{{fld.cxClass}}\" id=\"{{fld.cxHeaderName}}\"> <div class=\"cxFilterHeader\">{{fld.cxHeaderLabel}}</div> <template is=\"for\" items=\"{{fld.cxFields}}\" item=\"subFld\" index=\"subInd\"> <div class=\"cvFilterList cxSmartFilterList {{cxPropClass}}_cxFilterItem {{cxPropClass}} {{subFld.classInFilter}}\" field-ind=\"{{subFld.cxFilterIndex}}\"> <div class=\"leftElements\"> <template is=\"if\" value=\"{{subFld.displayInFilter}}\"><template case=\"true\"> <div class=\"cxSmFrDisplayFieldLabelWrapper\"> <lyte-checkbox data-zcqa=\"{{subFld.display_field_label}}\" title=\"{{subFld.display_field_label}}\" lt-prop-type=\"default\" class=\"checkbox field_search checkFilter userSelectNone\" index=\"{{subFld.cxFilterIndex}}\" field-ind=\"{{index}}_{{ind}}_{{subInd}}\" id=\"field_{{cruxReplace(subFld.api_name,'[/.]','_')}}\" lt-prop-label=\"{{subFld.display_field_label}}\" on-before-checked=\"{{method('checkBoxBeforeCheck',subFld)}}\" on-changed=\"{{method('showHideSelectionFilter',subFld)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{expHandlers(subFld.subField,'&amp;&amp;',subFld.cxTooltipInfo)}}\"><template case=\"true\"> <span class=\"cxSmFrInfoIcon\" lt-prop-title=\"{{subFld.cxTooltipInfo}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;top&quot; } \" lt-prop-tooltip-style=\"max-width : 150px;\"></span> </template></template> </div> <template is=\"if\" value=\"{{subFld.rendered}}\"><template case=\"true\"> <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp {{if(ifEquals(subFld.subField,true),,'cxdN')}}\" id=\"option_{{cruxReplace(subFld.api_name,'[/.]','_')}}\" cx-prop-field=\"{{subFld}}\" module=\"{{cxPropModule}}\" index=\"{{subFld.cxFilterIndex}}\" field-ind=\"{{index}}_{{ind}}_{{subInd}}\" module-display-field=\"{{cxPropModuleDisplayField}}\" on-value-change=\"{{method('inputValueChange')}}\" boundary=\"{{cxPropBoundary}}\" prop-filter-view=\"{{cxPropFilterView}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" cx-prop-group-support=\"{{cxPropGroupSupport}}\" cx-prop-role-support=\"{{cxPropRoleSupport}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"></crux-smart-filter-input> </template></template> </template><template case=\"false\"> <span style=\"display:none\" id=\"field_{{cruxReplace(subFld.api_name,'[/.]','_')}}\" sindex=\"{{subFld.cxFilterIndex}}\" class=\"field_search cxHiddenLabel\">{{subFld.display_field_label}}</span> <div class=\"content-animated-line zcrm-contentloading\" style=\"width: 208px;height: 10px; margin-top: 5px; margin-bottom: 5px\"> </div> </template></template> </div> </div> </template> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(fld.cxHide,'!'),'||',fld.cxAppliedField)}}\"><template case=\"true\"><div class=\"cvFilterList cxSmartFilterList {{cxPropClass}}_cxFilterItem {{cxPropClass}} {{fld.classInFilter}}\" field-ind=\"{{fld.cxFilterIndex}}\"> <div class=\"leftElements\"> <template is=\"if\" value=\"{{fld.displayInFilter}}\"><template case=\"true\"> <div class=\"cxSmFrDisplayFieldLabelWrapper\"> <lyte-checkbox data-zcqa=\"{{fld.display_field_label}}\" title=\"{{fld.display_field_label}}\" lt-prop-type=\"default\" class=\"checkbox field_search checkFilter userSelectNone\" index=\"{{fld.cxFilterIndex}}\" field-ind=\"{{index}}_{{ind}}\" id=\"field_{{cruxReplace(fld.api_name,'[/.]','_')}}\" lt-prop-label=\"{{fld.display_field_label}}\" on-before-checked=\"{{method('checkBoxBeforeCheck',fld)}}\" on-changed=\"{{method('showHideSelectionFilter',fld)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{expHandlers(fld.subField,'&amp;&amp;',fld.cxTooltipInfo)}}\"><template case=\"true\"> <span class=\"cxSmFrInfoIcon\" lt-prop-title=\"{{fld.cxTooltipInfo}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;top&quot; } \" lt-prop-tooltip-style=\"max-width : 150px;\"></span> </template></template> </div> <template is=\"if\" value=\"{{fld.rendered}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-smart-filter.html\",\"Feb Default Changes\")}} <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp {{if(ifEquals(fld.subField,true),,'cxdN')}}\" id=\"option_{{cruxReplace(fld.api_name,'[/.]','_')}}\" cx-prop-field=\"{{fld}}\" module=\"{{cxPropModule}}\" index=\"{{fld.cxFilterIndex}}\" field-ind=\"{{index}}_{{ind}}\" module-display-field=\"{{cxPropModuleDisplayField}}\" on-value-change=\"{{method('inputValueChange')}}\" boundary=\"{{cxPropBoundary}}\" prop-filter-view=\"{{cxPropFilterView}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" cx-prop-group-support=\"{{cxPropGroupSupport}}\" cx-prop-role-support=\"{{cxPropRoleSupport}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"> </crux-smart-filter-input> <div class=\"{{if(ifEquals(fld.subField,true),,'cxdN')}}\"> <template is=\"if\" value=\"{{expHandlers(fld.data_type,'==',&quot;crossModule&quot;)}}\"><template case=\"true\"> <crux-smart-filter-crossfields cx-prop-user-field-properties=\"{{cxPropUserFieldProperties}}\" set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-module-field=\"{{fld}}\" cx-prop-child-fields=\"{{fld.childFields}}\" on-value-change=\"{{method('onChildValueChange')}}\" on-field-change=\"{{method('onChildFieldChanged')}}\" cx-prop-child-field-limit=\"{{cxPropChildFieldLimit}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-child-field-limit-tooltip=\"{{cxPropChildFieldLimitTooltip}}\" class=\"{{if(fld.rendered,'crossFieldsChecked','crossFieldsUnChecked')}}\" cx-prop-module-display-field=\"{{cxPropModuleDisplayField}}\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\"> </crux-smart-filter-crossfields> </template></template> </div> </template></template> </template><template case=\"false\"> <span style=\"display:none\" id=\"field_{{cruxReplace(fld.api_name,'[/.]','_')}}\" sindex=\"{{fld.cxFilterIndex}}\" class=\"field_search cxHiddenLabel\">{{fld.display_field_label}}</span> <div class=\"content-animated-line zcrm-contentloading\" style=\"width: 208px;height: 10px; margin-top: 5px; margin-bottom: 5px\"> </div> </template></template> </div> </div></template></template> </template></template> </template> </div> </lyte-accordion-body> </lyte-accordion-item></template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.cxHide,'!'),'||',field.cxAppliedField)}}\"><template case=\"true\"><div class=\"cvFilterList cxSmartFilterList {{cxPropClass}}_cxFilterItem {{cxPropClass}} {{field.classInFilter}}\" field-ind=\"{{field.cxFilterIndex}}\"> <template is=\"if\" value=\"{{cxPropChildModuleFields}}\"><template case=\"true\"> <span id=\"crossFilter_close_{{id}}_{{field.id}}\" data-zcqa=\"crossFilter_close_{{cxPropChildModuleDisplayLabel}}_{{index}}\" class=\"cxSmFrCrossFldCloseIcon\" onclick=\"{{action('onCloseChildField',field,this)}}\"> </span> </template></template> <div class=\"leftElements\"> <template is=\"if\" value=\"{{field.displayInFilter}}\"><template case=\"true\"> <div class=\"cxSmFrDisplayFieldLabelWrapper\"> <template is=\"if\" value=\"{{cxPropChildModuleFields}}\"><template case=\"true\"> <lyte-dropdown id=\"customFilter_DropDown_{{id}}_{{field.id}}\" data-zcqa=\"crossFilter_dropDown_{{cxPropChildModuleDisplayLabel}}_{{index}}\" lt-prop-placeholder=\"{{cxPropCrossFilterTranslations.selectField}}\" lt-prop-freeze=\"true\" lt-prop-boundary=\"{{cxPropBoundary}}\" lt-prop-show-empty-message=\"true\" lt-prop-box-button-width=\"same\" lt-prop-no-result=\"{{cruxGetI18n('crm.template.listview.search.no.results')}}\" before-select=\"{{method('updateDropSelectedFields')}}\" class=\"cxSmFrCrossFldChildDropdown\" field=\"{{field}}\" on-show=\"{{method('onDropDownShow')}}\" on-hide=\"{{method('onDropDownHide')}}\" drop-index=\"{{index}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-header> <lyte-search ind=\"{{field.id}}\" on-search=\"{{method('onSearchFieldDropDown')}}\" lt-prop-placeholder=\"{{cruxGetI18n('crm.globalsearch.search.title')}}\" lt-prop-close-icon=\"true\" lt-prop-query-selector=\" { &quot;scope&quot; : &quot;.customFilter_dropBody_{{id}}_{{field.id}}&quot; , &quot;search&quot; : &quot;lyte-drop-item:not(.cxdN)&quot; , &quot;label&quot; : &quot;lyte-drop-label&quot; } \"> </lyte-search> </lyte-drop-header> <lyte-drop-body class=\"customFilter_dropBody_{{id}}_{{field.id}}\"> <div class=\"pR noresultstyle cxdN\" id=\"customFilter_DropDownNoResult_{{id}}_{{field.id}}\">{{cruxGetI18n('crm.template.listview.search.no.results')}}</div> <template is=\"for\" items=\"{{cxPropDropBoxChildFields}}\" item=\"cfld\" index=\"index\"> <lyte-drop-item class=\"{{if(expHandlers(cfld.hideInDropDown,'&amp;&amp;',expHandlers(cfld.id,'!=',field.id)),'cxdN','')}}\" data-value=\"{{cfld.id}}\">{{cfld.field_label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <lyte-checkbox data-zcqa=\"{{field.display_field_label}}\" title=\"{{field.display_field_label}}\" lt-prop-type=\"default\" class=\"checkbox field_search checkFilter userSelectNone {{if(cxPropChildModuleFields,'cxdN','')}}\" index=\"{{field.cxFilterIndex}}\" field-ind=\"{{index}}\" id=\"field_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-label=\"{{field.display_field_label}}\" on-before-checked=\"{{method('checkBoxBeforeCheck',field)}}\" on-changed=\"{{method('showHideSelectionFilter',field)}}\"></lyte-checkbox> <template is=\"if\" value=\"{{expHandlers(field.subField,'&amp;&amp;',field.cxTooltipInfo)}}\"><template case=\"true\"> <span class=\"cxSmFrInfoIcon\" lt-prop-title=\"{{field.cxTooltipInfo}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;top&quot; } \" lt-prop-tooltip-style=\"max-width : 150px;\"></span> </template></template> </div> <template is=\"if\" value=\"{{field.rendered}}\"><template case=\"true\"> <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp {{if(ifEquals(field.subField,true),,'cxdN')}} {{if(cxPropChildModuleFields,'childFieldSmartInput','')}}\" id=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}{{if(cxPropChildModuleFields,expHandlers(expHandlers(expHandlers('_','+',field.id),'+','_'),'+',cxPropChildModuleRelation),'')}}\" cx-prop-field=\"{{field}}\" module=\"{{if(cxPropChildModuleFields,cxPropChildModuleName,cxPropModule)}}\" index=\"{{field.cxFilterIndex}}\" field-ind=\"{{index}}\" module-display-field=\"{{cxPropModuleDisplayField}}\" on-value-change=\"{{method('inputValueChange')}}\" boundary=\"{{cxPropBoundary}}\" prop-filter-view=\"{{cxPropFilterView}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" is-child-input=\"{{if(cxPropChildModuleFields,'true','false')}}\" cx-prop-group-support=\"{{cxPropGroupSupport}}\" cx-prop-role-support=\"{{cxPropRoleSupport}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"></crux-smart-filter-input> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(cxPropChildModuleFields,'&amp;&amp;',field.showDummyInput)}}\"><template case=\"true\"> <crux-smart-filter-input set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-aria=\"{{cxPropAria}}\" class=\"cvMainOption cxSmFrInputComp eventNone disable childFieldSmartInput\" id=\"option_dummy_input\" cx-prop-field=\"{{dummyField}}\" module=\"{{cxPropModule}}\" prop-filter-view=\"{{cxPropFilterView}}\" support-related-modules=\"{{lbind(supportRelatedModules)}}\" cx-prop-enable-date-time=\"{{cxPropEnableDateTime}}\"></crux-smart-filter-input> </template></template></template></template> </template><template case=\"false\"> <span style=\"display:none\" id=\"field_{{cruxReplace(field.api_name,'[/.]','_')}}\" sindex=\"{{field.cxFilterIndex}}\" class=\"field_search cxHiddenLabel\">{{field.display_field_label}}</span> <div class=\"content-animated-line zcrm-contentloading\" style=\"width: 208px;height: 10px; margin-top: 5px; margin-bottom: 5px\"> </div> </template></template> </div> </div></template></template> </template></template> </template> </template> </lyte-accordion> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"insertYield","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1,1]},{"type":"registerYield","position":[3,1,1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]}]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"attr","position":[3,1,1,3]},{"type":"registerYield","position":[3,1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3,1,1]},{"type":"if","position":[0,3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3]},{"type":"for","position":[1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3,1,3]},{"type":"componentDynamic","position":[0,3,1,3]},{"type":"attr","position":[0,3,1,5]},{"type":"if","position":[0,3,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3,3]},{"type":"if","position":[0,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"for","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1]},{"type":"componentDynamic","position":[0,1,1]},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"componentDynamic","position":[0,1,5]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[0,3,3,1]},{"type":"for","position":[0,3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"if","position":[5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[0,3]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[0,3,1]},{"type":"if","position":[0,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3]},{"type":"for","position":[1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]},{"type":"componentDynamic","position":[3,1,1,3]}],
_observedAttributes :["cxPropHeaderYield","cxPropEnableAccordion","cxPropCriteriaCondition","cxPropSearchLabel","cxPropSearch","cxPropModule","cxPropFields","cxPropIsSpecialFields","cxPropIsModuleFields","cxPropDisplayAsAccord","cxPropClass","cxPropFieldSelectLimit","cxPropMaxLimitErrorMsg","cxPropNoResultMsg","seriesArr","cxPropBoundary","cxPropCriteria","cxPropSort","cxPropUserFieldProperties","module_info","cxPropCommonInfo","checked","allFields","abmFields","abmScoreFieldList","abmScoreFieldLength","abmTechniqueFieldList","abmTechniqueFieldsLength","displayVisitField","special_field","visits_field","predictionScoreContent","predictionScoreHeader","cxPropModuleDisplayField","cxPropPreventUiType","cxPropPreventColumnName","defaultUndefined","alertMsg","cxPropEnableScrollLoading","cxPropFilterView","noResult","appliedFields","appliedCriteria","undefinedValue","email_status","cxPropYieldCriteriaFields","cxPropCurrentUserDetails","cxPropPreventReordering","cxPropReorderToSectionTop","cxPropModuleRecordMapping","idModuleMapping","cxPropChildModuleFields","supportRelatedModules","cxPropChildModules","cxPropTimeZone","cxPropRoleSupport","cxPropGroupSupport","cxPropChildFieldLimit","cxPropChildFieldLimitTooltip","cxPropRelatedModulesLimit","cxPropRelatedModulesLimitMsg","cxPropDropBoxChildFields","cxPropDropSelectedChildFields","dummyField","blockedCriteria","cxPropAria","cxPropEnableDateTime"],
_observedAttributesType :["boolean","boolean","object","string","boolean","string","array","boolean","boolean","boolean","string","number","string","string","array","object","object","boolean","object","object","object","array","array","array","array","number","array","number","array","array","array","array","array","object","array","array","string","string","boolean","string","object","array","object","string","boolean","array","object","boolean","boolean","object","object","boolean","boolean","array","string","boolean","boolean","number","string","number","string","array","array","object","object","boolean","boolean"],
 //no i18n
	data : function(){
		return {
			/**
			 * To customize the header
			 * @componentProperty { boolean } cxPropHeaderYield
			 */
			cxPropHeaderYield :  Lyte.attr("boolean", {"default" : false}), //No I18N
			cxPropEnableAccordion : Lyte.attr("boolean", {"default" : true}), //No I18N
			cxPropCriteriaCondition : Lyte.attr("object",{default : {}}),//no i18n
			/**
			 * To set the Header of the Filter
			 * @componentProperty { string } cxPropSearchLabel
			 */
			cxPropSearchLabel : Lyte.attr("string" , { default : _cruxUtils.getI18n("crm.label.search")}),//no i18n
			/**
			 * To set true to enable the search
			 * @componentProperty { boolean } cxPropSearch=false
			 */
			cxPropSearch : Lyte.attr("boolean", {"default" : false}), //No I18N
			/**
			 * Set a module name 
			 * @componentProperty { string } cxPropModule
			 */
			cxPropModule : Lyte.attr("string"),//no i18n
			// cxPropCustomview : Lyte.attr("string",{default : ""}),//no i18n
			cxPropFields : Lyte.attr("array",{default : []}), //no i18n
			/**
			 * Set this property to true to show/hide special fields lik Touched Records, UnTouched Records, Record Actions, etc.
			 * @componentProperty { boolean } cxPropIsSpecialFields=false
			 */
			cxPropIsSpecialFields : Lyte.attr('boolean',{default : true}), //no i18n
			
			cxPropIsModuleFields : Lyte.attr('boolean',{default : true}), //no i18n
			// cxPropNewListKey : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropDisplayAsAccord : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * This will be used to set a class for filter scroll container
			 * @componentProperty { string } cxPropClass
			 */
			cxPropClass : Lyte.attr("string", { default : "cxFilterClass" }),//no i18n
			/**
			 * This specifies the maximum number of criterias that can be selected
			 * @componentProperty { number } cxPropFieldSelectLimit
			 */
			cxPropFieldSelectLimit : Lyte.attr("number", { default : 15 }),//no i18n
			cxPropMaxLimitErrorMsg :  Lyte.attr("string" , { default : _cruxUtils.getI18n('crm.criteria.max.rowcnt.exceeds') }),//no i18n
			cxPropNoResultMsg : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.customview.nofields.found')}), //NO I18n
			seriesArr :  Lyte.attr("array",{default : []}), //no i18n
			cxPropBoundary : Lyte.attr("object", { default : {} }),//no i18n
			/**
			 * This specifies the criteria to be set to the filter.
			 * @componentProperty { object } cxPropCriteria
			 */
			cxPropCriteria : Lyte.attr("object"),//no i18n
			/**
			 * This property used to render a field with the given criteria
			 * @componentProperty { boolean } cxPropSort=false
			 */
			cxPropSort : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropUserFieldProperties : Lyte.attr("object",{default : {}}),//no i18n
			module_info : Lyte.attr("object"),//no i18n
			cxPropCommonInfo: Lyte.attr("object", {default: {}}),//no i18n
			/**
			 * @componentProperty { array } checked
			 */
			checked:Lyte.attr("array",{default : []}),//no i18n
			allFields : Lyte.attr("array",{default : []}),//no i18n
			abmFields : Lyte.attr("array",{default : []}),//no i18n
			abmScoreFieldList: Lyte.attr('array', {default: []}), // NO I18N
			abmScoreFieldLength: Lyte.attr('number'), // NO I18N
			abmTechniqueFieldList: Lyte.attr('array', {default: []}), // NO I18N
			abmTechniqueFieldsLength : Lyte.attr("number", {default: 2}), // NO I18N
			displayVisitField : Lyte.attr('array',{default:[]}),//no i18n
			special_field : Lyte.attr('array',{default:[]}),//no i18n
			visits_field : Lyte.attr("array",{default : []}),//no i18n
			predictionScoreContent : Lyte.attr("array",{default : [{range : _cruxUtils.getI18n('crm.lead.prediction.convert.high'), score : _cruxUtils.getI18n('crm.inv.mail.time.two.days.subject','61','100')},{range : _cruxUtils.getI18n('crm.lead.prediction.convert.medium'), score : _cruxUtils.getI18n('crm.inv.mail.time.two.days.subject','41','60')},{range : _cruxUtils.getI18n('crm.lead.prediction.convert.low'), score : _cruxUtils.getI18n('crm.inv.mail.time.two.days.subject','1','40')}]}), //no i18n
			predictionScoreHeader : Lyte.attr("array", {default : [{data : _cruxUtils.getI18n('crm.lead.prediction.tooltip.convert'), bodyData : 'range'},{data : _cruxUtils.getI18n('crm.lead.prediction.tooltip.score'), bodyData : 'score'}]}), //no i18n
			// visitsFieldLimit : Lyte.attr("number", { default : 3 }),//no i18n
			cxPropModuleDisplayField : Lyte.attr("object", {default : {}}),//no i18n
			cxPropPreventUiType : Lyte.attr("array",{default : []}),//no i18n
			cxPropPreventColumnName : Lyte.attr("array",{default : []}),//no i18n
			// cxPropLookupLimit : Lyte.attr("number", { default : 5 }),//no i18n
			defaultUndefined : Lyte.attr("string"),//no i18n
			//alertButton : Lyte.attr('array',{default : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}]}), //no i18n
			alertMsg : Lyte.attr("string"),//no i18n
			// remaning_field : Lyte.attr("array",{default : []}),//no i18n
			cxPropEnableScrollLoading : Lyte.attr("boolean", {"default" : false}),//no i18n
			/**
			 * this property used to render a filter vertical/horizantal
			 * @componentProperty { string } cxPropFilterView
			 */
			cxPropFilterView : Lyte.attr("string",{default : "vertical"}),//no i18n
			noResult : Lyte.attr("object" , {default : {} }),//no i18n
			appliedFields	: Lyte.attr("array" , { default : [] }),//no i18n
			// cxPropBlockedReason : Lyte.attr("boolean",{default : false}),//no i18n
			appliedCriteria : Lyte.attr("object"),//no i18n
			undefinedValue : Lyte.attr("string" , { default : undefined}),//no i18n
			email_status : Lyte.attr("boolean" , { default : false }),//No I18n
			cxPropYieldCriteriaFields : Lyte.attr("array" ,{default : []}),//no i18n
			/**
			 * this property used to get the user details like time zone,locale and other details
			 * @componentProperty { object } cxPropCurrentUserDetails
			 */
			cxPropCurrentUserDetails : Lyte.attr("object"),//no i18n
			/**
			 * This property used to prevent reordering fields while applying a filter
			 * @componentProperty { boolean } cxPropPreventReordering=false
		 	 */
			cxPropPreventReordering : Lyte.attr("boolean", {default : false}),//no i18n
			cxPropReorderToSectionTop	:	Lyte.attr("boolean", {default : false}),//no i18n
			cxPropModuleRecordMapping 	: Lyte.attr("object" , {default : {}}),//no i18n
			/**
			 * @componentProperty { object } idModuleMapping
			 * @author authorName
			 * @version 1.0.0
			 */
			idModuleMapping				:  Lyte.attr("object",{default : {}}),//no i18n
			cxPropChildModuleFields : Lyte.attr('boolean',{default : false}), //no i18n
			supportRelatedModules : Lyte.attr("boolean", {default : false}), //No I18N
			cxPropChildModules	: Lyte.attr("array" , { default : [] }),//no i18n
			// locked_crossfield : Lyte.attr("boolean" , { default : false })//No I18N
			cxPropTimeZone : Lyte.attr("string",{default : ""}),
			/**
			 * @componentProperty { boolean } cxPropRoleSupport=false
			 */
			cxPropRoleSupport :Lyte.attr("boolean",{default:false}),//No I18n
			/**
			 * @componentProperty { boolean } cxPropGroupSupport=false
			 */
			cxPropGroupSupport : Lyte.attr("boolean",{default:false}),//No I18n
			cxPropChildFieldLimit : Lyte.attr("number"), // NO I18N
			cxPropChildFieldLimitTooltip : Lyte.attr("string",{default : ""}), //NO I18n
			cxPropRelatedModulesLimit : Lyte.attr("number"), // NO I18N
			cxPropRelatedModulesLimitMsg : Lyte.attr("string",{default : ""}), //NO I18n
			cxPropDropBoxChildFields : Lyte.attr("array" , { default : [] }),//no i18n
			cxPropDropSelectedChildFields : Lyte.attr("array" , { default : [] }),//no i18n
			dummyField : Lyte.attr("object" , {default : {field_data_type:"text",isDummy : true}}),//no i18n
			blockedCriteria : Lyte.attr("object",{default:{'Email':'','Secondary_Email':''}}),//No I18n
			cxPropAria : Lyte.attr('boolean', {default : false}),
			cxPropEnableDateTime: Lyte.attr('boolean', { default: false })
		}
	},
	scoring_rules : [],
	series :[],
	assignment_thresholds : [],
	cloned_criteria : {},
	init : function(){
		/*if( Object.keys(this.data.cxPropModuleRecordMapping).length == 0 && typeof moduleRecordMapping != "undefined" ){
			this.setData("cxPropModuleRecordMapping",moduleRecordMapping)
		}
		var idModuleMap = {} , moduleMap = this.data.cxPropModuleRecordMapping;
		for (var key in moduleMap) {
			idModuleMap[moduleMap[key].id] = moduleMap[key].module_name;
		}
		this.setData("idModuleMapping",idModuleMap);
		this.idModuleMapping = idModuleMap;
		this.moduleRecordMapping = this.data.cxPropModuleRecordMapping*/
		this.setModuleMappingData();
		if( !this.data.cxPropCurrentUserDetails ){
			if( typeof Crm != "undefined" ){
				this.setData('cxPropCurrentUserDetails',Crm.userDetails);//no i18n
			}else{
				this.setData('cxPropCurrentUserDetails',{permissions : {},DATE_PATTERN : "dd/mm/yyyy"});//no i18n
			}
		}
		this.data.cxPropCurrentUserDetails.DATE_PATTERN = this.datePattern = this.data.cxPropCurrentUserDetails.DATE_PATTERN ?this.data.cxPropCurrentUserDetails.DATE_PATTERN :  "dd/mm/yyyy";
		this.scoring_rules = [];
		this.series = [];
		this.assignment_thresholds = [];
		this.cloned_criteria = {};
		// this.abmTechniqueFieldList = ["cxFilter_RFM_Label__s", "cxFilter_Firmographic_Label__s"]; // NO I18N
		this.$node.getFilterCriteria = function(arg){
			return this.component.getFilterCriteria(arg);
		}
		// this.$node.getCriteria = function(){
		// 	return this.component.getCriteria();
		// }
		this.$node.setCriteria =function(criteria){
			return this.component.setCriteria(criteria);
		}
		this.$node.clearFields =function(criteria){
			return this.component.clearFields(criteria);
		}
		this.$node.resetFields =function(criteria){
			return this.component.resetFields();
		}
		this.$node.getSelectedFields =function(){
			return this.component.getSelectedFields();
		}
		this.$node.filterByField = function(api_name){
			if( !api_name ){
				return;
			}
			var subFldName;
			if([ "Recency" , "Frequency"  , "Monetary"].indexOf(api_name) !== -1){
				subFldName = api_name;
				api_name = "Segment_Score";

			}
			var checkBoxNode = this.querySelector("#field_"+this.component._cruxReplace(api_name , '[/.]' ,'_'));
			if( !checkBoxNode ){
				return;
			}
			var lyteAccItem = checkBoxNode.closest('lyte-accordion-item');
			var timeDelay = 0;
			if( lyteAccItem && !lyteAccItem.classList.contains('lyteAccordionActive')){
				lyteAccItem.click();
				timeDelay = 1000;
			}
			
			if( checkBoxNode.classList.contains('cxHiddenLabel')){
				checkBoxNode.parentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				timeDelay = 1000;
			}
			this.timeInterval = setInterval(function(){
				var fldId = this.component._cruxReplace(api_name , '[/.]' ,'_');
				checkBoxNode =this.querySelector("#field_"+fldId);
				if( checkBoxNode.ltProp ){
					checkBoxNode.ltProp('checked',true);
					checkBoxNode.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
					 //eslint-disable-next-line @zoho/webperf/no-complex-selector
					var inputEle = this.querySelector('#option_'+fldId+' input');
					if( subFldName ){
						var subFld =this.querySelector("#sub_field_"+subFldName);
						subFld.ltProp('checked',true);
						inputEle = this.querySelector('#sub_option_'+subFldName+' input');
					}
					if( inputEle ){
						inputEle.focus();
					}
					clearInterval(this.timeInterval);
				}
				
			}.bind(this),timeDelay);
		};
		if( this.data.cxPropFilterView === "horizontal" ){
			this.setData("cxPropClass",this.data.cxPropClass+" horizontalFilter");//no i18n
		}
		this.cruxAssets = typeof cruxAssets !== 'undefined' ? cruxAssets : {};
		this.cruxAssetsCompMapping = this.cruxAssets.dataTypeToCompMapping ? this.cruxAssets.dataTypeToCompMapping : {}
		this.scrollTop = 0;
		this.setFieldValue();
	},
	getSelectedFields : function(){
		return this.getData("checked");
	},
	didConnect : function(){
		var criteria =  this.getData('cxPropCriteria')//no i18n
		if(criteria && ( criteria.filters || criteria.cross_filters ) ){
			this.setCriteria(criteria)
		}
		this.updateScrollToFilterContainer();
	},
	updateScrollToFilterContainer : function(){
		var scrollEle = $L("#lv_filter_scroll");	//No I18N
		if( scrollEle && scrollEle.scroll && !this.data.cxPropChildModuleFields){
			scrollEle.scroll({tabIndex : -1, nested: true});	//No I18N
		}
	},
	filterFieldByKey : function(filterFields , key , val , res){
		var fldLen = filterFields.length , i = 0;
		for(i = 0 ; i < fldLen ; i++){
			var fld = this.getField( filterFields[i] )
			if( fld.constructor == Array ){
				if( !key ){//to get start ind of acc field
					filterFields[i].startIndex=res.length;
				}
				this.filterFieldByKey(fld , key , val , res);
				if( !key ){//to get end ind of acc field
					filterFields[i].endIndex = res.length;
				}
				continue;
			}
			if( !key ){
				Lyte.objectUtils(fld ,"add",'cxFilterIndex', res.length+'');//no i18n
				res.push(fld);
			}else if(  !fld.cxHide && fld[key] === val ){
				res.push(fld);
			}
		}
	},
	getFieldByKeyValue : function(filterFields , key , val , res = []){
		if( !this.data.cxPropReorderToSectionTop ){
			var appliedFldLen = this.data.appliedFields.length , fld;
			for(var i = 0 ; i < appliedFldLen ; i++){
				fld = this.data.appliedFields[i];
				if( !key ){
					Lyte.objectUtils(fld ,"add",'cxFilterIndex', res.length+'');//no i18n
					res.push(fld);
				}else if( !fld.cxHide && fld[key] === val ){
					res.push(fld);
				}
			}
		}
		this.filterFieldByKey(filterFields , key , val , res)
		
	},
	clearFields : function(){
		var checked = this.cxFilterFields.filter((fld)=>fld.rendered);
		// this.getFieldByKeyValue(this.data.allFields , "subField" , true , checked);
		var field_id;
		var checkedLen =(checked) ? checked.length : 0;
		this.$node.querySelector("#lv_filter_scroll").scrollTop = 0 //no i18n
		for(var i=0;i<checkedLen;i++)
		{
			field_id="#field_"+ this._cruxReplace( checked[i].api_name, "[/.]","_");//No I18N
			Lyte.objectUtils(checked[i] ,"add",{"rendered" : false});//no i18n
			this.$node.querySelector(field_id).ltProp('checked',false);//No I18N
		}
		 this.setData('checked',[]) //no i18n
		//  this.setData("cxPropBlockedReason",false);//no i18n
		 this.blockedCriteriaSelected = false;
		 this.toggleDealsField("dB");//no i18n
	},
	resetFields : function(){
		this.clearFields();
		var fields = this.data.appliedFields , fldlen = fields.length;
		for(var i = 0 ; i < fldlen ; i++){
			this.removeAppliedField(fields[i])
			// var fld = fields[i];
			// if( this.data.cxPropReorderToSectionTop ){
			// 	Lyte.arrayUtils(fld.cxParent.cxFields, 'removeAt', fld.cxAppliedPosition , 1 ); //no i18n
			// 	Lyte.objectUtils(fld.cxOriginField , "delete","cxHide");
			// }else{
			// 	Lyte.arrayUtils(fld.cxFromArray, 'insertAt', fld.cxFromPosition ,fld ); //no i18n
			// }
			
		}
		this.setData("appliedFields",[]);
		$L.fastdom.mutate(function(){
			this.$node.querySelector("#lv_filter_scroll").scrollTop = 0 //no i18n
		}.bind(this))
		this.toggleDealsField("dB");//no i18n
/*
		var insertInd , i = 0 , tempField ,dubField , isCheckedSpecialField = false;//no i18n
		var keys = Object.keys(this.field_mapping).reverse() , len = keys.length;
		for(i=0;i<len;i++) {
			tempField = this.field_mapping[keys[i]]
			// if( tempField.fromArray === "special_field"){
			// 	isCheckedSpecialField = true;
			// }

			this.$node.querySelector("#field_"+ this._cruxReplace(tempField.field.api_name, "[/.]","_")).ltProp('checked',false);//No I18N
			Lyte.objectUtils(tempField.field ,"add",{"rendered" : false });//no i18n
			if(tempField.old_position !== undefined ){
				insertInd = tempField.old_position;dubField = this.data[tempField.toArray][tempField.node._attributes.index]
				Lyte.arrayUtils(this.data[tempField.toArray] ,"removeAt", tempField.node._attributes.index ,1);//no i18n
				Lyte.arrayUtils(this.data[tempField.fromArray], 'insertAt', insertInd ,dubField ) //no i18n
			}
			delete this.field_mapping[keys[i]]
		}
		this.toggleDealsField("dB");//no i18n
		this.setData("cxPropBlockedReason",false);//no i18n
		this.setData("locked_crossfield",false);//no i18n
		this.blockedCriteriaSelected = false;
		this.enableMoreVisitFun();//no i18n
		//this.changesArrayCnt = {};
		// if(isCheckedSpecialField){
		// 	this.setData( 'special_field' , this.getSpecialFields(this.getData('cxPropModule')) )//no i18n
		// }
		$L.fastdom.mutate(function(){
				this.$node.querySelector("#lv_filter_scroll").scrollTop = 0 //no i18n
		}.bind(this))

		this.setData('checked',[]) //no i18n
		this.field_mapping = {};
*/
	},
	removeAppliedField : function(fld){
		if( !this.data.cxPropReorderToSectionTop ){
			// Lyte.arrayUtils(fld.cxFromArray, 'insertAt', fld.cxFromPosition ,fld ); //no i18n
			if(fld.cxOriginField && fld.cxOriginField.cxHide){
                Lyte.objectUtils(fld.cxOriginField , "delete","cxHide");
			}
			if(fld.cxParent && fld.cxParent.cxHideAccordion){
				Lyte.objectUtils(fld.cxParent , "delete" , "cxHideAccordion");
			}
			return;
		}
		Lyte.objectUtils(fld.cxOriginField , "delete","cxHide");
		let appliedFlds = fld.cxParent.cxFields.filter((fld)=>fld.cxAppliedField);
		if( !appliedFlds.length ) {
			return;
		}
		var  ind = 0 , fieldsList = fld.cxParent && fld.cxParent.cxFields ? fld.cxParent.cxFields : [], fldsLen = fieldsList.length;
		for( var ind = 0 ; ind < fldsLen ; ind++ ){
			if( !fieldsList[ind].cxAppliedField ){
				break;
			}
			Lyte.arrayUtils(fieldsList, 'removeAt', ind , 1 ); //no i18n
			ind--;fldsLen--;
		}

	},
	getABMFields : function(){
		var abm_field = [],
			commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
			abmTechniqueFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
			abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [],
			abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
			abmTechniqueFieldsLength = 0,
			abmTechniqueFieldList = [],
			techniqueDisplayLabels = {
				RFM_Label__s: _cruxUtils.getI18n("abm.rfm.label"), // NO I18N
				Firmographic_Label__s: _cruxUtils.getI18n("abm.firmographics.label"), // NO I18N
				Recommendation_Label__s: _cruxUtils.getI18n('abm.recommendation.label'), // NO I18N
				VOICEOFCUSTOMERLABEL__s: _cruxUtils.getI18n('abm.voc.label'), // NO I18N
				Engagement_Label__s: _cruxUtils.getI18n('abm.engagement.label') // NO I18N
			},
			abmScoreFieldList = [],
			abmScoreFieldListLength = 0,
			scoreDisplayLabels = {
				Account_Score__s: _cruxUtils.getI18n('abm.overall.score'), // NO I18N
				Mood_Score__s:  _cruxUtils.getI18n('abm.mood.score'), // NO I18N
				Value_Score__s:  _cruxUtils.getI18n('abm.value.score'), // NO I18N
				Engagement_Score__s:  _cruxUtils.getI18n('abm.engagement.score') // NO I18N
			},
			fieldObj;
			
		store.peekAll('field').forEach((field) => {

			/** Technique fields */
			if (abmTechniqueFields.includes(field.api_name)) {
				abmTechniqueFieldsLength = abmTechniqueFieldsLength + 1;

				fieldObj = {
					api_name: "cxFilter_" + field.api_name, // NO I18N
					visible: true, // NO I18N
					name: field.api_name,
					data_type: 'picklist', // NO I18N
					pick_list_values: field.pick_list_values,
					field_label: techniqueDisplayLabels[field.api_name],
					display_field_label: techniqueDisplayLabels[field.api_name]
				};
				abmTechniqueFieldList.push('cxFilter_' + field.api_name); // NO I18N

				abm_field.push(fieldObj);
			} else if (abmScoreFields.includes(field.api_name)) {
				abmScoreFieldListLength += 1;
				fieldObj = {
					api_name: "cxFilter_" + field.api_name, // NO I18N
					visible: true,
					name: field.api_name,
					data_type: field.data_type,
					field_label: scoreDisplayLabels[field.api_name],
					display_field_label: scoreDisplayLabels[field.api_name],
					minValue: 1,
					maxValue: 100,
					cxDecimalAllowed: false
				};
				abmScoreFieldList.push('cxFilter_' + field.api_name); // NO I18N

				abm_field.push(fieldObj);
			}else if (abmAccountFields.includes(field.api_name)) {
				fieldObj = {
					api_name: "cxFilter_" + field.api_name, // NO I18N
					visible: true,
					name: field.api_name,
					data_type: field.data_type,
					field_label: field.field_label,
					display_field_label: field.field_label
				}

				abm_field.push(fieldObj);
			}
		});
		this.setData({
			abmTechniqueFieldList: abmTechniqueFieldList,
			abmTechniqueFieldsLength: abmTechniqueFieldsLength,
			abmScoreFieldList: abmScoreFieldList,
			abmScoreFieldLength: abmScoreFieldListLength
		});
		
		if (commonInfo.abmModuleInfo.renderSegmentFilter) {
			/** Segment field */
			abm_field.push({
				api_name: "cxFilter_Linked_Segment__s", // NO I18N
				visible: true, // NO I18N
				name: 'Linked_Segment__s', // NO I18N
				data_type: 'multirelation', // NO I18N
				field_label: _cruxUtils.getI18n('abm.abm.segment.name'), // NO I18N
				display_field_label: _cruxUtils.getI18n('abm.abm.segment.name'), // NO I18N
				linkingModule: {
					module_name: "Segment" // NO I18N
				}
			});
		}

		return abm_field;
	},

	setFieldValue : function(){

		var filterFields = [] , accordion = {};
		this.cxFilterFields = [];

		var commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
			abmModuleInfo,
			abmModuleName,
			abm_field;

		// this.setData("cxPropBlockedReason",false);//no i18n
		this.locked_crossfield=false;//no i18n
		this.blockedCriteriaSelected = false;
		this.field_mapping = {};
		this.rfm_avilable = false;
		var allfields, moduleInfo, module_name = this.getData('cxPropModule'); //no i18n
		this.setData( "appliedFields" , []); //no i18n
		var wrapperObj = {},module_info={};
		wrapperObj.moduleFields = [];wrapperObj.special_field = [];wrapperObj.displayVisitField = [];
		wrapperObj.abm_field = [];
		if(module_name && this.moduleRecordMapping[module_name]){
			module_info = store.peekRecord("module",this.moduleRecordMapping[module_name].id); 
			module_info = module_info ? module_info : this.moduleRecordMapping[module_name]; //getting undefined if module model is not registered.
			this.setData('module_info',module_info) //no i18n
		}
		this.convertedViews = false;
		if(this.data.module_info && this.data.module_info.custom_view && ["CONVERTEDVIEWS","MYCONVERTEDVIEWS"].indexOf(this.data.module_info.custom_view.system_name) != -1 ){
			this.convertedViews = true;
		}
		this.isScoreSupportedView = true;
		if(this.data.module_info && this.data.module_info.custom_view && this.data.module_info.custom_view.system_name && (this.data.module_info.custom_view.system_name.startsWith("REVIEWPROCESS") || this.data.module_info.custom_view.system_name.startsWith("IMAGEVALIDATION"))){
			this.isScoreSupportedView = false;
		}
		this.isSeriesSupportedView = true;
		if(this.data.module_info && this.data.module_info.custom_view && this.data.module_info.custom_view.system_name && (this.data.module_info.custom_view.system_name.startsWith("REVIEWPROCESS") || this.data.module_info.custom_view.system_name.startsWith("IMAGEVALIDATION"))){
			this.isSeriesSupportedView = false;
		}

		// if(this.getData("cxPropIsSpecialFields") && module_name && !this.isZBCustomModule(this.getData("cxPropModule")) && !window.clientPortalName && !module_name.startsWith("Orchestration") && !module_name.startsWith("PathFinder")){
		// 	var special_field = this.getSpecialFields(module_name)
		// 	wrapperObj.special_field = special_field;
		// }
		
		if(commonInfo && commonInfo.abmModuleInfo) {
			abmModuleInfo = commonInfo.abmModuleInfo;
			abmModuleName = abmModuleInfo && abmModuleInfo.module ? abmModuleInfo.module.api_name : null;
			moduleInfo = store.peekAll('module').find(module => {return module.module_name === module_name});
			
			if (moduleInfo && moduleInfo.api_name === abmModuleName) {
				abm_field = this.getABMFields();
				abm_field.forEach(function(fld){
					fld.visible = true;
					fld.filterable = true;
					fld.available_in_user_layout = true;
				})
				// if( this.data.cxPropDisplayAsAccord ){
					accordion = { cxAccordion : true ,
						cxAccordionLabel : _cruxUtils.getI18n("abm.filters"),
						cxAccordionName : "abm_field",
						cxFields : abm_field,
						cxSort : false,
						cxAccordionInfo : !this.data.cxPropCommonInfo.abmModuleInfo.isAccountModule ? _cruxUtils.getI18n('abm.filters.info',this.data.cxPropCommonInfo.abmModuleInfo.parentModuleDisplayName, this.data.cxPropCommonInfo.abmModuleInfo.currentModuleDisplayName) : ""
					}

					// cruxGetI18n('abm.filters.info', cxPropCommonInfo.abmModuleInfo.parentModuleDisplayName, cxPropCommonInfo.abmModuleInfo.currentModuleDisplayName)}}
					filterFields.push(accordion);
				// }else{
				// 	filterFields = filterFields.concat(abm_field);
				// }
				// wrapperObj.abm_field = abm_field;
			}
		}
		if(this.getData("cxPropIsSpecialFields") && module_name && !this.isZBCustomModule(this.getData("cxPropModule")) && !window.clientPortalName && !module_name.startsWith("Orchestration") && !module_name.startsWith("PathFinder")){
			var special_field = this.getSpecialFields(module_name);
			special_field.forEach(function(fld){
				fld.visible = true;
				fld.filterable = true;
				fld.available_in_user_layout = true;
			})
			// if( this.data.cxPropDisplayAsAccord ){
				accordion = { cxAccordion : true ,
					cxAccordionLabel : _cruxUtils.getI18n("crm.filter.header.secton.system"),
					cxAccordionName : "special_field", // do not change this name. becz it was used in QA automation.
					cxFields : special_field,
					cxSort : false
				}
				filterFields.push(accordion)
			// }else{
			// 	filterFields = filterFields.concat(special_field);
			// }
			// wrapperObj.special_field = special_field;
		}
		if( this.getData("cxPropFields").length){
			wrapperObj.moduleFields = this.getData("cxPropFields").slice(0)//no i18n
			this.getVisitsFields(module_name,wrapperObj.moduleFields,wrapperObj);//no i18n
		}
		else if( this.getData("cxPropIsModuleFields") ){//no i18n{//no i18n
			allfields = ( module_info.fields ) ? module_info.fields.slice(0) : [];
			wrapperObj.moduleFields = allfields;
			this.getVisitsFields(module_name,allfields,wrapperObj);//no i18n
		}

		if( wrapperObj.displayVisitField && wrapperObj.displayVisitField.length ){
			filterFields.push({ cxAccordion : true ,cxAccordionLabel : _cruxUtils.getI18n("crm.website.activity"),cxAccordionName : "displayVisitField",cxFields : wrapperObj.displayVisitField , cxSort : false})
			this.setData('displayVisitField', wrapperObj.displayVisitField);
		}
		if( wrapperObj.moduleFields && wrapperObj.moduleFields.length ){
			// filterFields.push({ cxAccordion : true ,cxAccordionLabel : _cruxUtils.getI18n("crm.filter.header.secton.fields"),cxAccordionName : "allFieldss",cxFields : [{cxHeader : true , cxHeaderLabel : "header1",cxHeaderName : "headerName", cxFields : wrapperObj.moduleFields}] })
			if(this.data.cxPropEnableAccordion && !wrapperObj.moduleFields[0].cxAccordion && !this.data.cxPropChildModuleFields){
				filterFields.push({ cxAccordion : true ,cxAccordionLabel : _cruxUtils.getI18n("crm.filter.header.secton.fields"),cxAccordionName : "allFields",cxFields : wrapperObj.moduleFields })  // do not change cxAccordionName name. becz it was used in QA automation.
			}else{
				filterFields = filterFields.concat( wrapperObj.moduleFields );
			}
			
		}
		this.cxFilterFields = [];
		let fld;
		if( this.cruxAssets.onBeforeFilterRender ){
			fld = this.cruxAssets.onBeforeFilterRender({fields : filterFields , module : this.data.cxPropModule});
			if( fld ){
				filterFields = fld;
			}
		}
		if( this.getMethods('onBeforeRender') ){
			 fld = this.executeMethod('onBeforeRender' , {fields : filterFields , module : this.data.cxPropModule});
			if( fld ){
				filterFields = fld;
			}
		}
		this.allfieldType = this.getType(this.allfieldType , filterFields);
		var rendFldLimit = this.cxFilterFields.length;
		if(this.data.cxPropEnableScrollLoading) {
			rendFldLimit = rendFldLimit > 50 ? 50 :rendFldLimit;//no i18n
			this.currRendFldInd = rendFldLimit;
		}
		for(var i=0;i<rendFldLimit;i++) {
			this.cxFilterFields[i].displayInFilter = true;
			// Lyte.objectUtils(this.cxFilterFields[i] ,"add","displayInFilter" , true );//no i18n
		}
		this.setData("allFields" , filterFields);
		if(this.data.cxPropChildModuleFields) {
		this.setData("cxPropDropBoxChildFields" , Lyte.deepCopyObject(filterFields));
		}
		/*this.setData({ 'special_field' : wrapperObj.special_field , displayVisitField : wrapperObj.displayVisitField}) //no i18n
		this.setData({'abmFields' : wrapperObj.abm_field}) //no i18n
		if(wrapperObj.moduleFields.length){
			var sortedFields = ( this.getData("cxPropSort") ) ? this.sortArray(wrapperObj.moduleFields,'display_field_label') : wrapperObj.moduleFields;//no i18n

			// var temp = sortedFields.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);
			// sortedFields = sortedFields.concat(sortedFields);sortedFields = sortedFields.concat(sortedFields);sortedFields = sortedFields.concat(temp);
			// this.setData('allFields' , sortedFields.splice(0,limitedFeildsCount)) //no i18n
			if(this.data.cxPropEnableScrollLoading) {
				var limitedFeildsCount = 50 - (wrapperObj.special_field.length+wrapperObj.displayVisitField.length);//no i18n
				limitedFeildsCount = sortedFields.length > limitedFeildsCount ? limitedFeildsCount :sortedFields.length;//no i18n
				// var temp = sortedFields.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);temp = temp.concat(sortedFields);
				// sortedFields = sortedFields.concat(sortedFields);sortedFields = sortedFields.concat(sortedFields);sortedFields = sortedFields.concat(temp);
				for(var i=0;i<limitedFeildsCount;i++) {
					sortedFields[i].displayInFilter = true;
				}
				this.maxCount = 20;
				this.initialCount = limitedFeildsCount;
				this.currCount = limitedFeildsCount;
				this.currArr = sortedFields;
			}
			this.setData('allFields' , sortedFields ) //no i18n
		}else{
			this.setData('allFields' , []);//no i18n
		}
		if( this.data.cxPropEnableScrollLoading && (!this.data.allFields || !this.data.allFields.length)){
			this.setData("cxPropEnableScrollLoading",false);//no i18n
		}
		*/
	},
	moduleObserver : function(){
		// if(this.getData("cxPropModule")  !== "Activities"){
			this.setFieldValue();
			this.updateScrollToFilterContainer()
		// }
	}.observes('cxPropModule' , 'cxPropFields.[]'),//no i18n
	 // CustomviewObserver : function(arg){
		// var moduleInfo = this.getData().module_info , specil_field = this.getData("special_field");//no i18n
		// if(this.data.module_info && this.data.module_info.custom_view && ["CONVERTEDVIEWS","MYCONVERTEDVIEWS"].indexOf(this.data.module_info.custom_view.system_name) != -1 ){
		// 	this.convertedViews = true;
		// }
		// var preValue = arg ? store.peekRecord("custom_view",arg.oldValue) : {};//no i18n
		// if( ( preValue && preValue.system_name && (["CONVERTEDVIEWS","MYCONVERTEDVIEWS"].indexOf(preValue.system_name) != -1 || preValue.system_name.startsWith("REVIEWPROCESS") ) ) || this.convertedViews || this.getData("cxPropModule")  === "Activities" || (moduleInfo.custom_view && moduleInfo.custom_view.system_name && moduleInfo.custom_view.system_name.startsWith("REVIEWPROCESS") ) ){
		// 	this.setFieldValue();
		// }
	 // }.observes('cxPropCustomview'),//no i18n
    setCriteriaObserver : function(){
		var criteria =  this.getData('cxPropCriteria')//no i18n
		if(criteria && ( criteria.filters || criteria.cross_filters ) ){
			this.setCriteria(criteria)
		}
	}.observes('cxPropCriteria'), //No I18N
	setMemberStatus : function(pick_list_values,field){
		var values= pick_list_values.slice(0);//no i8n
		// if(Crm && Crm.zohoCampaignEnabled){
		// 	this.removeValue(values,"name",["Sent","Opened","Clicked","Bounced","Marked as Spam", "Replied"]);//no i18n
		// 	values= values.concat([{'actual_value' : "Sent" , 'display_value' : "Sent" },{'actual_value' : "Opened" , 'display_value' : "Opened" },{'actual_value' : "Clicked" , 'display_value' : "Clicked" },{'actual_value' : "Bounced" , 'display_value' : "Bounced" },{'actual_value' : "Marked as Spam" , 'display_value' : "Marked as Spam" },{'actual_value' : "Replied" , 'display_value' : "Replied" }]);//no i18n
		// }
		field.pick_list_values = values;//no i18n
	},

	getCrossFieldsCount : function(field){
        var count = 0;
		var abmCount = 0;
		var visitsCount = 0;
		var checked = this.data.checked.concat([field]);
		var checkedLength = checked.length;
		var sysDefinedFilters = ["ABM_Techniques","ABM_Scores","cxFilter_Linked_Segment__s","cxFilter_Scoring_Rule","cxFilter_Activities","cxFilter_Campaigns","Similarity","best_time","Prediction","cxFilter_Competitor_Alert","next_best_experience","cxFilter_Email_Sentiment","cxFilter_Series","Recommendation","cxFilter_Chats"];
		var visits_columns = ['ATTENDEDBY' , 'BROWSER' , 'OPERATINGSYSTEM' , 'PORTAL_NAME' , 'SEARCHENGINE' , 'TIMESPENT' , 'VISITEDTIME']; //no i18n
		var ui_types = [444,445];
		for(var i=0;i<checkedLength;i++)
		{
			if(checked[i].api_name && ["ABM_Techniques","ABM_Scores"].includes(checked[i].api_name)){
				if(abmCount === 0){
					abmCount++;
					count++;
				}
				continue;
			}
			if((checked[i].column_name && visits_columns.includes(checked[i].column_name))){
				if(visitsCount === 0){
                    visitsCount++;
					count++;
				}
				continue;
			}
			if((checked[i].field_data_type && checked[i].field_data_type === 'crossModule') || (checked[i].api_name && sysDefinedFilters.includes(checked[i].api_name)) || (checked[i].ui_type && ui_types.includes(checked[i].ui_type))){
				count++;
			}
			if(count > this.data.cxPropRelatedModulesLimit){
				break;
			}
		}
		return count;
	},

	methods : {
		setConditionsCallback : function(args){
			if( this.getMethods("setConditions") ){
				/**
				 * This call is fired before the condition is set
				 * @method setConditions
				 * @author silambarasan.rt
				 * @param { * } field
				 */
				return this.executeMethod("setConditions",args)//no i18n
			}
		},
		beforeSelectDropDown : function(args){
			if(this.getMethods("beforeSelectDropdown")){
				return this.executeMethod("beforeSelectDropdown", args);	
			}
		},
		accStateChange : function(  eve , accItem , comp){
			var isOpenState = accItem.classList.contains("lyteAccordionActive") ;
			var accFld = accItem.querySelector(".cvFilterList");
			var accFldInd = accFld ? accFld.getAttribute("field-ind") : accItem.getAttribute('acc-ind'); 
			var fld = this.cxFilterFields[accFldInd];
			if(fld && fld.cxParent){
				fld.cxParent.cxOpenState = isOpenState;
			}
			
			if(!isOpenState){
				this.scrollFunc(50);
			}
		},
		beforeErrorCallback : function(msg){
			if(this.getMethods('onBeforeErrorAlert')){
				/**
				 * This callback is fired before the validation alert is shown
				 * @method onBeforeErrorAlert
				 * @author silambarasan.rt
				 * @param { string } msg - The message that will be displayed in the alert.
				*/
				return this.executeMethod('onBeforeErrorAlert',msg); //No I18N
			}
			return true;
		},
		onDropDownShow: function(event,_this){
            var dropBox = _this.getDropBox();
			// dropBox.querySelector('lyte-drop-body').scrollTo(0,0);
			_this.childComp.querySelector('lyte-search').focus();
		},
		onDropDownHide : function(event,_this){
			_this.childComp.querySelector('lyte-search').setValue('');
		},
		onSearchFieldDropDown : function(result,searchElem){
			var index = searchElem.component.data.ind;
			var id = "#customFilter_DropDownNoResult_"+this.data.id+"_"+index; //No I18n
			if(result.length == 0){
				 $L(id).removeClass('cxdN');
			 }
			 else{
				 $L(id).addClass('cxdN');
			 }
	   },
		filterSearch : function(res,searchNode){

			//eslint-disable-next-line no-complex-selector)
		var search_input = this.$node.querySelector('#searchId lyte-input input').value //no i18n
		//eslint-disable-next-line @zoho/zstandard/combine-properties
		search_input.length ? $L(".cxSmFrSearchCloseIconWrap",this.$node).addClass('cxdB').removeClass('cxdN') : $L(".cxSmFrSearchCloseIconWrap",this.$node).addClass('cxdN').removeClass('cxdB');// No I18N
		this.$node.querySelector("#lv_filter_scroll").scrollTop = 0 //no i18n
		var container = this.$node.querySelector('.leftFilterHead');//no i18n
		//to render a field from search result
		if(this.data.cxPropEnableScrollLoading) {
			var fldInd , filterFields = this.cxFilterFields;
			res.forEach(function(item) {
				if(item.attributes.sindex) {
					var fldInd = parseInt(item.getAttribute("sindex"));
					if(filterFields[fldInd] && !filterFields[fldInd].displayInFilter){
						Lyte.Component.set(filterFields[fldInd], 'displayInFilter', true)
					}
				}
			});
		}

		var accItems = container.querySelectorAll(".nLVFilterAcc .nLVFilterAccItems"),//no i18n
			count = accItems.length,
			accInd ,
			allFields = this.data.allFields;
		
		for(var i = 0 ; i < count ; i++){
			accInd = parseInt(accItems[i].getAttribute("acc-ind"));
			Lyte.objectUtils( allFields[accInd] ,"add", 'cxNoResult' , true);//no i18n
		}
		if(res.length){
			Lyte.objectUtils(this.data.noResult ,"add","showNoResult" , false );//no i18n
			var len = res.length;
			for(var i = 0; i < len && count > 0 ; i++)
			{
				var obj = res[i].closest(".nLVFilterAccItems");//No I18N
				accInd = obj ? parseInt(obj.getAttribute("acc-ind")) : undefined;
				if(obj && allFields[accInd] && allFields[accInd].cxNoResult){
					accInd = parseInt(obj.getAttribute("acc-ind"));
					Lyte.objectUtils( allFields[accInd] ,"add", 'cxNoResult' , false);//no i18n
					// Lyte.objectUtils( noResult,"add", obj.id , false);//no i18n
					count--;
				}
			}
		}else if(!count){
			Lyte.objectUtils(this.data.noResult ,"add","showNoResult" , true );//no i18n
		}
			
		/*
		if(node.getData('displayVisitField').length){
				if(search_input!=""){
					node.enableMoreVisitFun();
					searchNode.ltProp("value",search_input);//no i18n
				}
				setTimeout( function(){
					var visitFieldRes = $(".webSiteActivity:not('.lyteSearchHidden')");
					$L("#vtFieldOuterDivid").css("display", (visitFieldRes.length)?"block":"none"); //no i18n
				}, 100 )
			}
		*/
		},
		inputValueChange : function(arg){
			if( arg && arg.sub_field ){
				var sub_field = arg.sub_field
				if(sub_field &&  (sub_field.api_name == "Without_Open_Deal" || sub_field.api_name == "Without_Any_Deal")){
					this.toggleDealsField("hide");//no i18n
				}else if(sub_field && sub_field.api_name == "With_Open_Deal"){//no i18n
					this.toggleDealsField("dB");//no i18n
				}
			}
			
			// if(sub_field && sub_field.field_data_type == "recordlocks"){
			// 	$L("#recLock").css("display",sub_field.api_name == "Locked_True" ? "inline-block" : "none");//NO I18N
			// }
			if( this.getMethods("onValueChange")){
				/**
				 * This callback is fired when the value is changed from the input
				 * @method onValueChange
				 * @author silambarasan.rt
				*/
				this.executeMethod("onValueChange",arg);//No I18n
			}
		},
		checkBoxBeforeCheck : function(field){
			var checkedNodesLength = this.$node.querySelectorAll("lyte-checkbox:not(.cxdN) input:checked").length;
			if( checkedNodesLength >= this.getData("cxPropFieldSelectLimit") || ( this.data.supportRelatedModules && (this.getCrossFieldsCount(field) > this.data.cxPropRelatedModulesLimit) ) ){
				var msg = "";
				if( checkedNodesLength >= this.getData("cxPropFieldSelectLimit")){
					msg = this.data.cxPropMaxLimitErrorMsg;
				} else {
					_cruxUtils.showCustomAlert({
						params : {
							ltPropPrimaryMessage : this.data.cxPropRelatedModulesLimitMsg,
							ltPropSecondaryMessage : this.data.cxPropRelatedModulesLimitMsgNote,
							ltPropWrapperClass : "crmCenterAlert"
						}
					});
					return false;
				}
				this.showFilterAlert(msg); //no i18n
				return false;
			}
			if(this.getMethods("onBeforeFieldChecked")){
				/**
				 * This callback is fired before the field checkbox checked
				 * @method onBeforeFieldChecked
				 * @author authorName
				 * @version 1.0.0
				 * @param { field } - field meta
				 */
				return this.executeMethod("onBeforeFieldChecked",field);//No I18n
			}
		},
        
		onChildValueChange : function(arg){
			if( this.getMethods("onValueChange")){
				this.executeMethod("onValueChange", arg);//No I18n
			}
		},
		
		onChildFieldChanged : function(checkedFields,field,event,currentFieldData){
			if( this.getMethods("onFieldChange")){
				field.childField = true;
				this.executeMethod("onFieldChange", checkedFields,field,event,currentFieldData);//No I18n
			}
		},
		
		showChildFieldsOnSearch : function(){
			if(this.data.supportRelatedModules){
				$L(".cxSmFrCrossFldFilterList").removeClass("lyteSearchHidden"); //NO I18n	
			}
		},
		
		showHideSelectionFilter : function(field,input,comp,Event){
			if (field.api_name == "Recommendation_infield") {//no i18n
				field.api_name = "Recommendation"; //no i18n
			}
			var api_name = field.api_name;
			var checkbox = comp.$node;
			var option_id = "#option_"+this._cruxReplace(api_name, "[/.]","_");//No I18n
			option_id = this.data.cxPropChildModuleFields ? option_id+"_"+field.id+"_"+this.data.cxPropChildModuleRelation : option_id;
			var subfield,flag = false;
			var fromClick = arguments[4] == "click" ? true : false ;
            if(fromClick && checkbox.checked && option_id === "#option_Prediction" && typeof Crm != "undefined" && Crm.client_tracking){
                Crm.client_tracking("Field Prediction Smart Filter") ;//no i18n
            }

			if(checkbox.checked){
				if( this.$node.querySelectorAll("lyte-checkbox:not(.cxdN) input:checked").length > this.getData("cxPropFieldSelectLimit")){
					this.showFilterAlert(this.data.cxPropMaxLimitErrorMsg); //no i18n
					checkbox.ltProp('checked',false) //no i18n
					return
				}
				Lyte.Component.set(field, {"subField" : true});//no i18n
				if(!field.rendered){
					flag = true;
					Lyte.Component.set(field, {"rendered" : true});//no i18n

				}
				subfield = this.$node.querySelector(option_id);
				if(flag){
					// subfield.setMethods("setConditions",function(arg){//no i18n
					// 	if( this.getMethods("setConditions") ){
					// 		/**
					// 		 * This call is fired before the condition is set
					// 		 * @method setConditions
					// 		 * @author silambarasan.rt
					// 		 * @param { * } field
					// 		 */
					// 		return this.executeMethod("setConditions",arg)//no i18n
					// 	}
					// 	// else{
					// 	// 	return arg.condition;
					// 	// }
					// }.bind(this))
					var _self = this;
					subfield.setMethods("onCustomRequest",function(args){ //no i18n
						if( _self.getMethods('onCustomRequest') ){
							return _self.executeMethod('onCustomRequest',args);//no i18n
						}
					});
					if(field.cxDynamicFilterCriteriaComponent && this.cruxAssets.getDynamicFilterCriteriaComponent ){
						let compName = this.cruxAssets.getDynamicFilterCriteriaComponent(field);
						if( compName ){
							this.cruxAssetsCompMapping[field.api_name] = compName;
						}
					}
					subfield.component.render(this);
				}
				if( field.field_data_type == "picklist" && field.history_tracking && !( field.api_name == "Stage" && (this.getData("cxPropModule") == "Deals" || this.getData("cxPropModule") == "Potentials") ) ){
					var modInfo = this.moduleRecordMapping[this.idModuleMapping[field.history_tracking.module.id]];
					if(modInfo &&(! modInfo.fields || ! modInfo.fields.length)){
						store.findRecord("module", modInfo.id, {}, true, true, {getFields : true});//no i18n
					}
				}
				var _self=this;
				if( field.api_name=="cxFilter_Campaigns" && !this.member_Status){
					this.sendxhr("/crm/v2/Campaigns/status", "GET").then(function(res){ //no i18n
						res = JSON.parse(res.response);
						if( res.campaign_status && res.campaign_status.length){
							res.campaign_status.forEach(function(value){//no i18n
								value.actual_value = value.name;
								value.display_value = value.name;
							})
							_self.member_Status = res.campaign_status.slice(0);//no i18n
							_self.setMemberStatus(res.campaign_status.slice(0),field);//no i18n
						}
					})
				}else if( field.api_name=="cxFilter_Campaigns" && this.member_Status){//no i18n
					_self.setMemberStatus(this.member_Status.slice(0),field);//no i18n
				}
				else if(field.api_name =="cxFilter_UnallocatedRecords")
				{
					if(this.assignment_thresholds.length === 0 ) {
						var thresholdParamData = {module: this.getData("module_info").api_name};		//No I18N
						thresholdParamData.filters = '{"group":[{"comparator":"not_equal","field":{"api_name":"reallocation","id":null},"value":"${EMPTY}"}]}';		//No I18N
						store.findAll("assignment_threshold" , thresholdParamData ).then(function(data){ //NO I18N
							commonUtils.showHideLoadingDiv();
							var rulesArr = [];
							data.forEach(function(rule){
									rulesArr.push({'actual_value' : rule.id,'display_value' : _self.getThresholdUsersName(rule.restrict_to)});	
							})
							field.pick_list_values = rulesArr;
							_self.assignment_thresholds = rulesArr;
							if(rulesArr.length==0)
							{
								$L("#option_cxFilter_UnallocatedRecords")[0].setData("placeholderValue",[_cruxUtils.getI18n('crm.no.data.found')]); //NO I18N
								$L("#option_cxFilter_UnallocatedRecords lyte-dropdown")[0].ltProp("disabled", true); //NO I18N
							}
							if(Object.keys(_self.cloned_criteria).length > 0){
								_self.setFieldCriteria(_self.cloned_criteria);
								_self.cloned_criteria = {};
							}
						});
					}
					else {
						field.pick_list_values = this.assignment_thresholds;
					}
				}
				// if( typeof moduleRecordMapping != "undefined" && (field.field_data_type == "multiselectlookup" || field.field_data_type == "multiuserlookup" )){
				// 	var modName = field.api_name == "Service_Members"? idModuleMapping[field.multiselectlookup.linking_module.id] : idModuleMapping[field[field.field_data_type].linking_module.id]
				// 	var modInfo = moduleRecordMapping[modName];
				// 	if( modInfo && !modInfo.fields){
				// 		store.findRecord("module", modInfo.id, {}, true, true, {getFields : true});//no i18n
				// 		//store.findRecord("module", modInfo.id );//no i18n
				// 	}
				// 	// this.getModFields(modInfo);//no i18n
				// }
				
				// var temp = this.getData("checked").filter(function(item){return item.api_name == api_name})[0]
				// if(!temp){
					// Lyte.arrayUtils(this.getData("checked"), "push", {node : comp.$node ,api_name : api_name, field : field});//No I18n
					// this.field_mapping[api_name] = this.field_mapping[api_name] ? this.field_mapping[api_name] : {};
					// this.field_mapping[api_name].node = comp.$node;this.field_mapping[api_name].field = field;
				// }
				if(field.api_name === 'cxFilter_Series'){
						 if(this.series.length === 0 ) {
						  var data = {
						  	fields: 'name',
							filters: { comparator: "equal", field: { api_name: "module" }, value: this.getData("module_info").api_name },
							per_page: 100
						  };					
						  store.findAll("cadence", data).then(function(resp){ //no i18n
							commonUtils.showHideLoadingDiv();
							var rulesArr = [];
							resp.forEach(function(rule){
								rulesArr.push({'actual_value' : rule.id,'display_value' :rule.name});
							})
							field.pick_list_values = rulesArr;
							_self.series = rulesArr;
							_self.setData("seriesArr",rulesArr);
							if(Object.keys(_self.cloned_criteria).length > 0){
								_self.setFieldCriteria(_self.cloned_criteria);
								_self.cloned_criteria = {};
							}

							
                     });
                     }else{
	                         field.pick_list_values = this.series;
                     }		

				}
				if(field.api_name === 'cxFilter_Scoring_Rule'){
					if(this.scoring_rules.length === 0 ) {
						store.findAll("scoring_rule", {fields : 'name',module : this.getData("module_info").api_name,per_page : 100}).then(function(res){ //no i18n
							commonUtils.showHideLoadingDiv();
							var rulesArr = [];
							res.forEach(function(rule){
								rule.actual_value =  rule.id;
								rule.display_value = rule.name;
								rulesArr.push(rule);
								// rulesArr.push({'actual_value' : rule.id,'display_value' :rule.name , rule : rule});
							})
							field.pick_list_values = rulesArr;
							_self.scoring_rules = rulesArr;
							if(Object.keys(_self.cloned_criteria).length > 0){
								_self.setFieldCriteria(_self.cloned_criteria);
								_self.cloned_criteria = {};
							}
						});
					}
					else {
						field.pick_list_values = this.scoring_rules;
					}
				}
               /* if(field.api_name === 'cxFilter_Series'){
                      if(this.series.length === 0 ) {
						store.findAll("serie", {module : this.getData("module_info").api_name,per_page : 100}).then(function(res){ //no i18n
							commonUtils.showHideLoadingDiv();
							var rulesArr = [];
							res.forEach(function(rule){
								rulesArr.push({'actual_value' : rule.id,'display_value' :rule.name});
							})
							field.pick_list_values = rulesArr;
							_self.series = rulesArr;
							if(Object.keys(_self.cloned_criteria).length > 0){
								_self.setFieldCriteria(_self.cloned_criteria);
								_self.cloned_criteria = {};
							}
						});
					}
					else {
						field.pick_list_values = this.series;
					}	
                }*/
			}else{
				// var checkedLen = checked.length;
				// var flag = 0;
				// var x;
				// for(x=0; x<checkedLen; x++){
				// 	if(checked[x].api_name == api_name){
				// 		flag = 1;
				// 		break;
				// 	}
				// }
				// if(flag){
					// this.field_mapping[api_name].node = comp.$node;this.field_mapping[api_name].field = field;
					// if( this.field_mapping[api_name].old_position === undefined ){
					// 	delete this.field_mapping[api_name];
					// }
				// 	Lyte.arrayUtils(this.getData("checked"), "removeAt", x, 1);//No I18n
				// }
				this.blockedCriteriaSelected = false;
				Lyte.Component.set(field, {"subField" : false});//no i18n
				// to remove the filter input node for multiselectlookup field with include/eclude condition.
				if(field.persist_values == false){
					Lyte.Component.set(field, {"rendered" : false});//no i18n
				}
				if(field.data_type === 'crossModule'){
					var id = "#customFilter_" + field.api_name;
					var childCruxComponent = $L(id);
					if(childCruxComponent && childCruxComponent[0] && childCruxComponent[0].component.closeAllDummyFields	){
						childCruxComponent[0].component.closeAllDummyFields();
					}
				}
			}
			// if( ["cxFilter_Likely_to_convert","cxFilter_Recent_prediction_score","cxFilter_Prediction_Score","cxFilter_Records_to_focus"].indexOf(field.api_name) != -1 &&  (this.getData("cxPropModule") == "Deals" || this.getData("cxPropModule") == "Potentials") ){
			// 	this.togglePredictionField(field,checkbox.checked);//no i18n
			// }else 
			if(this.moduleRecordMapping.Potentials && field.api_name == this.moduleRecordMapping.Potentials.api_name && field.data_type == "crossfield") {//no i18n
				var tval = $("."+this.moduleRecordMapping.Potentials.api_name+"_selectedRadioBtn")[0];
				if(tval && (tval.ltProp("value") == "With_Open_Deal" ||  !checkbox.checked )){
					this.toggleDealsField("dB");//no i18n
				}else{
					this.toggleDealsField("hide");//no i18n
				}
			}
			var checked = [];
			this.getFieldByKeyValue(this.data.allFields , "subField" , true , checked);
			this.setData("checked", checked);
			if(this.getMethods("onFieldChange")){
				/**
				 * this callback is fired when the checkbox is checked
				 * @method onFieldChange
				 * @author authorName
				 * @param { * } checked - list of checked fields data available
				 * @param { * } checkbox - checkbox element
				 * @param { * } Event - Event
				 * @param { * } field - field meta
				 */
				this.executeMethod("onFieldChange", checked,checkbox,Event,field);//No I18n
			}
			var scrollBar = $L('.cxSmartFilterScrollElem')//no i18n
			if(scrollBar && scrollBar.resetScrollbar){
				scrollBar.resetScrollbar();
			}

	   },
	   updateDropSelectedFields : function(event,prevSelectedFieldId,dropDown,dropItem,currSelectedFieldId){
		   if(prevSelectedFieldId && currSelectedFieldId && prevSelectedFieldId === currSelectedFieldId)
		   {
			   return;
		   }
		   var selectedFields = this.data.cxPropDropSelectedChildFields;
		   var dropFields = this.data.cxPropDropBoxChildFields;
		   var droplength = dropFields.length;
		   for(var i=0;i<droplength;i++){
			   if(prevSelectedFieldId === dropFields[i].id){
				   Lyte.Component.set(this.data.cxPropDropBoxChildFields[i],{hideInDropDown : false});
				   selectedFields = selectedFields.removeAll([dropFields[i]]);
				   continue;
			   }
			   if(currSelectedFieldId === dropFields[i].id){
				   Lyte.Component.set(this.data.cxPropDropBoxChildFields[i],{hideInDropDown : true});
				   if(!selectedFields.contains(dropFields[i])){
					   selectedFields.push(dropFields[i]);
				   }
				   continue;
			   }
		   }
		   this.setData("cxPropDropSelectedChildFields", selectedFields);
		   var fields = this.data.appliedFields.concat(this.data.allFields);
		   var _len = fields.length;
		   var prevIdx, currIdx;
		   var isPrevEmpty = false;
		   for( i=0;i<_len;i++){
              if(prevSelectedFieldId === fields[i].id){
				prevIdx = i;
			  }
			  if(currSelectedFieldId === fields[i].id){
				currIdx = i;
			  }
		   }
		   if(prevIdx === undefined){
			 prevIdx =   this.data.appliedFields.contains(dropDown.data.field) ? dropDown.data.dropIndex : dropDown.data.dropIndex+(this.data.appliedFields.length);
			 isPrevEmpty = true;
		   }
		   var currField = Object.assign({} , fields[currIdx]);
		   var prevField =  Object.assign({} , fields[prevIdx]);
		   if(prevIdx === currIdx){
			  Lyte.Component.set(fields[prevIdx], {"showDummyInput" : false});//no i18n
			  this.$node.querySelector("#field_"+Lyte.Component.registeredHelpers.cruxReplace(currField.api_name , '[/.]' ,'_')).click();
			  return;
		   }
		   currField.cxHide = false;
		   currField.rendered = false;
		   if(currField.showDummyInput){
			  prevField.showDummyInput = true;
		   } else {
			  prevField.showDummyInput = false;
			  prevField.cxHide = true;
		   }
		   currField.showDummyInput = false;
		   if(!isPrevEmpty){
			 var prevCheckBox = this.$node.querySelector("#field_"+Lyte.Component.registeredHelpers.cruxReplace(prevField.api_name , '[/.]' ,'_'));
			 if(prevCheckBox.checked){
				prevCheckBox.click();
			 }
		   }
		   prevField.rendered = false;
		   prevField.cxAppliedField = false;
		   Lyte.Component.set(fields[prevIdx],currField);
		   Lyte.Component.set(fields[currIdx],prevField);
		   var currCheckBox = this.$node.querySelector("#field_"+Lyte.Component.registeredHelpers.cruxReplace(currField.api_name , '[/.]' ,'_'));
		   currCheckBox.click();
	   }
	},
	scrollFunc : function(maxRendCount) {
		
		var fields = this.cxFilterFields ,
			remFld = fields.filter(a=> !a.displayInFilter),
			fldLen = remFld.length , renFldCount = 0 , fld , updateFlag ;
		for(var i = 0 ; i < fldLen ; i++){
			fld = remFld[i];updateFlag = true;
			if(fld && (fld.cxParent && !fld.cxParent.cxOpenState) ){
				updateFlag = false;
				// let hiddenFlds = 
			}
			if( updateFlag ){
				Lyte.objectUtils(fld,"add",'displayInFilter',true);
				renFldCount++;
			}
			if( renFldCount >= maxRendCount ){
				break;
			}
		}

		/*
		var currCount = this.currCount;
		var maxCount = this.maxCount;
		var allFields = this.currArr;
		var lengthCount = allFields.length;
		var startIndex = currCount;
		var endIndex = currCount + maxCount;
		if(endIndex > lengthCount) {
			endIndex = lengthCount;

		}
		var obj = {};
		obj.currIndex = startIndex;
		obj.endIndex = endIndex;
		for(var i=obj.currIndex;i<obj.endIndex;i++) {
			if( allFields[i] ){
				Lyte.Component.set(allFields[i], 'displayInFilter', true);
			}
		}
		*/
		// obj.intervalId = setInterval(function() {
		// 	if(obj.currIndex == obj.endIndex) {
		// 		clearInterval(obj.intervalId);
		// 	}
		// 	for(var i=0;i<5;i++) {
		// 		if(obj.currIndex < obj.endIndex) {
		// 			if(!allFields[obj.currIndex].display) {
		// 				Lyte.Component.set(allFields[obj.currIndex], 'display', true);
		// 				Lyte.Component.set(allFields[obj.currIndex], 'loading', false);
		// 			}
		// 		} else {
		// 			break;
		// 		}
		// 		obj.currIndex++;
		// 	}
		// },50);

		// this.currCount = endIndex;
	},
	clearSearchValue : function( clearAll ){
		var node=this.$node.querySelector('#searchId');//no i18n
		var searchText=node.ltProp('value');//no i18n
		/*
		if(this.getData("cxPropNewListKey")){
				 if(searchText == "" || clearAll){
				 		$L(".searchCloseOpen").addClass('dN').removeClass('dB');//No I18N
				 }
				 else{
					node.setValue("");//no i18n
					node.focus();
				}
				 node.setValue("");//no i18n
				 $L(".searchCloseOpen").addClass('cxdN').removeClass('cxdB');//No I18N
				 // node.focus();
		}else {
				 if(searchText=="" || clearAll){
					 var node=document.querySelector('#searchIcon').parentNode; //no i18n
					 $L("#searchFilter")[0].style.display="none"
					 node.style.display = 'block';
					 node.style.visibility="";
				 }else{
					 node.setValue("");//no i18n
					//  node.focus();
				 }
		} */
		node.setValue("");//no i18n
		$L(".cxSmFrSearchCloseIconWrap",this.$node).addClass('cxdN').removeClass('cxdB');//No I18N

		this.currArr = this.getData("allFields");//no i18n
		this.currCount = this.initialCount;
		this.scrollTop = 0;
	},
	closeAllDummyFields : function()
	{
		var totalFields = (this.data.allFields).concat(this.data.appliedFields);
		var dummyFieldIds = [];
		var totalFieldsLength = totalFields.length;
		for(var i=0;i<totalFieldsLength;i++){
			if(totalFields[i].showDummyInput){
				dummyFieldIds.push(totalFields[i].id);
			}
			if(totalFields[i].data_type === 'multiselectpicklist' && !totalFields[i].persist_values && totalFields[i].rendered){
				Lyte.Component.set(totalFields[i] , { rendered : false});
				Lyte.Component.set(totalFields[i] , { rendered : true});
				var subfield = $L('#option_'+totalFields[i].api_name+'_'+totalFields[i].id+'_'+this.data.cxPropChildModuleRelation)[0];
				subfield.component.render(this);
			}
		}
        var dummyFieldsLength = dummyFieldIds.length;
		for( i=0;i<dummyFieldsLength;i++){
			var id = "#crossFilter_close_"+this.data.id+"_"+dummyFieldIds[i];
			var closeNode = $L(id);
			if(closeNode){
				closeNode.click();
			}
		}
	},
	actions : {
		searchIconClick : function(_this) {
			var parentNode= _this.parentNode;
			var node=parentNode.nextElementSibling;
			node.style.display = 'block';
			parentNode.style.display = 'none';
			node.querySelector('input').focus();//no i18n
	   },
	   clearSearch : function(){
			this.clearSearchValue();
			document.querySelector('#searchId').focus();
		},
		scrollAct : function() {
			if(!this.data.cxPropEnableScrollLoading) {
				return;
			}
			var scrollDiv = this.$node.querySelector("#lv_filter_scroll");//no i18n
			if(scrollDiv.scrollTop < this.scrollTop) {
				this.scrollTop = scrollDiv.scrollTop;
				return;
			}
			this.scrollTop = scrollDiv.scrollTop;
			this.scrollFunc(20);
		},
		showPredictionTooltip : function(){
			this.$node.querySelector("#tooltipPredictionScore").ltProp('show',true) //no i18n
		},
		closePredictionTooltip : function(){
			this.$node.querySelector("#tooltipPredictionScore").ltProp('show',false) //no i18n
		},
		onCloseChildField : function(field,_this){
			 var checkBoxComp = _this.parentNode.querySelector("#field_"+this._cruxReplace(field.api_name , '[/.]' ,'_')); //No I18n
			 if(checkBoxComp.checked){
                checkBoxComp.click();
				Lyte.Component.set(field, {"rendered" : false});
			 }
			 var dropDown = _this.parentNode.querySelector('lyte-dropdown').component;
			 if(dropDown.getData('ltPropSelected') != ''){
				var fieldId = dropDown.getData('ltPropSelected');
				dropDown.setData('ltPropSelected','');
				var selectedFields = this.data.cxPropDropSelectedChildFields;
				var dropFields = this.data.cxPropDropBoxChildFields;
				var droplength = dropFields.length;
				for(var i=0;i<droplength;i++){
					if(fieldId === dropFields[i].id){
						Lyte.Component.set(this.data.cxPropDropBoxChildFields[i],{hideInDropDown : false});
						selectedFields = selectedFields.removeAll([dropFields[i]]);
						break;
					}
				}
				this.setData("cxPropDropSelectedChildFields", selectedFields);
			 }
			 Lyte.Component.set(field, {"cxHide" : true});//no i18n
			 Lyte.Component.set(field, {"showDummyInput" : false});//no i18n
			 var totalFields = (this.data.allFields).concat(this.data.appliedFields);
			 var dropCruxComponent = this.$node.closest('crux-smart-filter-crossfields'); 
			 dropCruxComponent.component.updateFieldsOnRemove(totalFields);
		}
		// enableMoreVisit : function(){
		// 	this.enableMoreVisitFun()
		// }
	},
	getSpecialFields : function(module_name){
		if( !Object.keys(this.moduleRecordMapping).length ){
			return [];
		}
		var moduleRecordMapping = this.moduleRecordMapping;
		var special_field = []
		var custom_fields = [{'api_name' : "cxFilter_TouchedRecords",showCommonError : true ,visible : true, 'data_type' : 'custom' ,'field_label' : _cruxUtils.getI18n('crm.label.touched.records'),'display_field_label' : _cruxUtils.getI18n('crm.label.touched.records')},{ 'api_name' : 'cxFilter_UnTouchedRecords',showCommonError : true ,visible : true, 'data_type' : 'custom' ,'field_label' : _cruxUtils.getI18n('crm.label.untouched.records'),'display_field_label' : _cruxUtils.getI18n('crm.label.untouched.records')}, { 'api_name' : 'cxFilter_RecordAction',showCommonError : true ,visible : true, 'data_type' : 'custom' ,'field_label' : _cruxUtils.getI18n('crm.label.record.action'),'display_field_label' : _cruxUtils.getI18n('crm.label.record.action'),"cxFilter_RecordAction" : true , 'values' : [{'system' :'Modified' , 'display' : _cruxUtils.getI18n('workflow.rule.view.label.Modified')},{'system' : 'Not Modified' , 'display' : _cruxUtils.getI18n('crm.label.not.modified')}]}, { 'api_name' : 'cxFilter_RelatedRecordsAction',showCommonError : true ,visible : true, 'data_type' : 'custom' ,'field_label' : _cruxUtils.getI18n('crm.label.related.records.action'),'display_field_label' : _cruxUtils.getI18n('crm.label.related.records.action'),"cxFilter_RecordAction" : true, 'values' : [{'system' :'Done' , 'display' : _cruxUtils.getI18n('Done')},{'system' : 'Not Done' , 'display' : _cruxUtils.getI18n('crm.label.not.done')}]}]//no i18n
		var isCustomModule = module_name.startsWith("CustomModule");//No I18N
		var scoreListIndx = this.getIndex(this.getData('module_info').related_lists,"SCOREPERSONALITY",'personality_name',true); //No I18n
		if(scoreListIndx !== false && scoreListIndx >= 0 && this.isScoreSupportedView){
			var scoreMeta = {api_name: "cxFilter_Scoring_Rule",showCommonError: true,visible: true,field_data_type: "crossfield",field_label: _cruxUtils.getI18n("crm.label.scoring.rules"),display_field_label: _cruxUtils.getI18n("crm.label.scoring.rules"),disableExtraValue : true}//No I18n
			scoreMeta.crossFields = [{"api_name": "Positive_Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Positive Score"),"module_name": moduleRecordMapping[module_name].api_name},{"api_name": "Negative_Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Negative Score"),"module_name": moduleRecordMapping[module_name].api_name, allowNegativeValue : true},{"api_name": "Touch_Point_Positive_Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Positive Touch Point Score"),"module_name": moduleRecordMapping[module_name].api_name},{"api_name": "Touch_Point_Negative_Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Negative Touch Point Score"),"module_name": moduleRecordMapping[module_name].api_name, allowNegativeValue : true},{"api_name": "Touch_Point_Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Touch Point Score"),"module_name": moduleRecordMapping[module_name].api_name, allowNegativeValue : true},{"api_name": "Score","field_data_type": "integer","data_type": "number","field_label": _cruxUtils.getI18n("Score"),"module_name": moduleRecordMapping[module_name].api_name,allowNegativeValue : true}];//NO i18N
			var tpScoreAvailModules = ["Leads", "Contacts"];//no i18n
			if(!tpScoreAvailModules.contains(module_name)){
				scoreMeta.crossFields.splice(2, 3);
			}
			custom_fields.push(scoreMeta);
		}
		if( this.convertedViews && module_name != "Messages"){
			Lyte.arrayUtils(special_field, 'insertAt', 0, custom_fields)//no i18n
			return special_field;
		}
		if(this.isThresholdSupportedModule(module_name)){
			var thresholdMeta = {api_name : "cxFilter_UnallocatedRecords" , cxType : "single", visible : true, data_type : 'picklist' , field_label : _cruxUtils.getI18n("crm.unallocated.records") , pick_list_values : []}; //no i18n
			Lyte.arrayUtils(special_field, 'insertAt', 0, thresholdMeta)//no i18n
		}

		var campaigns = !moduleRecordMapping.Campaigns ? undefined : {'api_name' : "cxFilter_Campaigns" ,visible : true, 'data_type' : 'crossfield' ,'field_label' : moduleRecordMapping.Campaigns.plural_label, display_field_label :moduleRecordMapping.Campaigns.plural_label, pick_list_values : [{'actual_value' : 'Planned' , 'display_value' : _cruxUtils.getI18n('Planned')},{'actual_value' : 'Invited' , 'display_value' : _cruxUtils.getI18n('Invited')},{'actual_value' : 'Sent' , 'display_value' : _cruxUtils.getI18n('Sent')},{'actual_value' : 'Received' , 'display_value' : _cruxUtils.getI18n('Received')},{'actual_value' : 'Opened' , 'display_value' : _cruxUtils.getI18n('Opened')},{'actual_value' : 'Responded' , 'display_value' : _cruxUtils.getI18n('Responded')},{'actual_value' : 'Bounced' , 'display_value' : _cruxUtils.getI18n('Bounced')},{'actual_value' : 'Opted Out' , 'display_value' : _cruxUtils.getI18n('Opted\ Out')}]}; //no i18n
		var deal = !moduleRecordMapping.Potentials ? undefined : {'api_name' : "cxFilter_Deals" , visible : true, 'data_type' : 'crossfield' , 'field_label' : moduleRecordMapping.Potentials.plural_label , display_field_label : moduleRecordMapping.Potentials.plural_label,  'options' : [{ 'api_name' : 'With_Open_Deal','data_type' : 'date','field_label' : _cruxUtils.getI18n('crm.filter.label.with.open',moduleRecordMapping.Potentials.singular_label) }, { 'api_name' : 'Without_Open_Deal','data_type' : 'date','field_label' : _cruxUtils.getI18n('crm.filter.label.without.open',moduleRecordMapping.Potentials.singular_label) },{ 'api_name' : 'Without_Any_Deal','data_type' : 'nofield','field_label' : _cruxUtils.getI18n('crm.filter.label.without.any',moduleRecordMapping.Potentials.singular_label) }]} //no i18n
		var contacts = !moduleRecordMapping.Contacts ? undefined :  {api_name : "cxFilter_Contacts", visible : true, data_type : 'crossfield' , field_label :moduleRecordMapping.Contacts.plural_label,display_field_label :moduleRecordMapping.Contacts.plural_label, 'options' : [ {api_name : "With_Contact" ,data_type : 'nofield',field_label : _cruxUtils.getI18n('crm.filter.label.with.module',moduleRecordMapping.Contacts.singular_label)},{api_name : "Without_Any_Contact" ,data_type : 'nofield',field_label : _cruxUtils.getI18n('crm.filter.label.without.any',moduleRecordMapping.Contacts.singular_label)}]} //no i18n
		var activity = !moduleRecordMapping.Activities ? undefined : {'api_name' : "cxFilter_Activities", visible : true, 'data_type' : 'crossfield' ,'field_label' : moduleRecordMapping.Activities.plural_label,'display_field_label' : moduleRecordMapping.Activities.plural_label,'options' : [{'api_name' : 'Without_Open_Activity', 'data_type' : 'nofield','field_label' : _cruxUtils.getI18n('crm.filter.label.without.open',moduleRecordMapping.Activities.singular_label)},{'api_name' : 'Overdue'  ,  'data_type' : 'activity','field_label':_cruxUtils.getI18n('Overdue')},{'api_name' : 'Activity_Due' ,  'data_type' : 'activity','field_label' : _cruxUtils.getI18n('crm.filter.label.activity.due',moduleRecordMapping.Activities.singular_label)},{'api_name' : 'Without_Any_Activity' ,showCommonError : true, 'data_type' : 'date','field_label':_cruxUtils.getI18n('crm.filter.label.without.any',moduleRecordMapping.Activities.singular_label)},{'api_name' : 'Activity_Done', showCommonError : true, 'data_type' : 'date','field_label' : _cruxUtils.getI18n('crm.filter.label.activity.done',moduleRecordMapping.Activities.singular_label)}]} //no i18n
		var notes = !moduleRecordMapping.Notes ? undefined : {'api_name' : "cxFilter_Notes", visible : true,showCommonError : true, 'data_type' : 'crossfield' ,'field_label' : moduleRecordMapping.Notes.plural_label,'display_field_label' : moduleRecordMapping.Notes.plural_label,'options' : [{'api_name' : 'Without_Any_Notes',showCommonError : true, errorFieldLabel : _cruxUtils.getI18n("Date") , 'data_type' : 'date','field_label':_cruxUtils.getI18n('crm.filter.label.without.any',_cruxUtils.getI18n('Notes'))},{'api_name' : 'Notes_Added',showCommonError : true, errorFieldLabel : _cruxUtils.getI18n("Date"), 'data_type' : 'date','field_label':_cruxUtils.getI18n('crm.filter.label.notes.added')}]} //no i18n
		var email_status = {'api_name' : "cxFilter_Email_Status", cxTooltipInfo : _cruxUtils.getI18n("crm.label.filter.email.info"), showCommonError : true, visible : true, 'data_type' : 'custom' ,'field_label' : _cruxUtils.getI18n('crm.label.filter.email.status'),'display_field_label' : _cruxUtils.getI18n('crm.label.filter.email.status')} //no i18n
		var email_sentiments = {api_name : 'cxFilter_Email_Sentiment' ,showCommonError : true,  visible : true, 'data_type' : 'crossfield', 'field_label' : _cruxUtils.getI18n('sentiment.model'),'display_field_label' : _cruxUtils.getI18n('sentiment.model'), 'options' : [{ParentField : "cxFilter_Email_Sentiment",api_name : 'count' , showCommonError : true,'data_type' :'integer','field_label' : _cruxUtils.getI18n('sentiment.criteria.count')},{ParentField : "cxFilter_Email_Sentiment",api_name : 'percentage' ,showCommonError : true,'data_type' :'integer','field_label' : _cruxUtils.getI18n('sentiment.criteria.percentage')},{ParentField : "cxFilter_Email_Sentiment",api_name : 'For_The_Last_Email' ,'data_type' :'nofield','field_label' : _cruxUtils.getI18n('sentiment.criteria.lastmail')}]}//no i18n
		var locked_field = !moduleRecordMapping.LockingInformation || !(this.getData('module_info').fields && this.getData('module_info').fields.filterBy({api_name : "Locked__s"})[0]) ? undefined : {'api_name' : "cxFilter_Locked", visible : true, 'data_type' : 'crossfield' ,'field_label' : _cruxUtils.getI18n('crm.record.locked'),'display_field_label' : _cruxUtils.getI18n('crm.record.locked'),'options' :[{'api_name' : 'Locked_True', showSubField : false,'data_type' : 'recordlocks','field_label' : _cruxUtils.getI18n('crm.label.true')},{'api_name' : 'Locked_False'  , showSubField : false, 'data_type' : 'recordlocks','field_label':_cruxUtils.getI18n('crm.label.false')}]} //no i18n
		if( this.data.cxPropCurrentUserDetails.emailTrackingOption == "entprofon"){//no i18n
			email_status.sent_status = [{ 'api_name' : 'opened' , 'field_label' : _cruxUtils.getI18n('crm.filter.label.opened')},{ 'api_name' : 'clicked' , 'field_label' : _cruxUtils.getI18n('crm.label.filter.email.clicked')},{ 'api_name' : 'not_opened' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.not.opened')},{ 'api_name' : 'bounced' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.bounced')},{ 'api_name' : 'responded' ,  'field_label' : _cruxUtils.getI18n('crm.label.filter.email.responded')},{ 'api_name' : 'opened_and_not_replied' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.opened.not.replied')},{'api_name' : 'any_of_the_above'  , 'field_label' : _cruxUtils.getI18n('crm.filter.label.any')}];//no i18n
			email_status.options = [{'system' :'sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.sent')},{'system' :'not_sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.sent')},{'system' :'opened' , 'display' : _cruxUtils.getI18n('crm.filter.label.opened')},{'system' :'not_opened' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.opened')},{ 'system' : 'clicked' , 'display' : _cruxUtils.getI18n('crm.label.filter.email.clicked')},{'system' :'received' , 'display' : _cruxUtils.getI18n('crm.filter.label.received')},{'system' :'not_received' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.received')},{ 'system' : 'replied' , 'display' : _cruxUtils.getI18n('crm.filter.label.replied')},{'system' :'bounced' , 'display' : _cruxUtils.getI18n('crm.filter.label.bounced')},{ 'system' : 'responded' ,  'display' : _cruxUtils.getI18n('crm.label.filter.email.responded')},{'system' :'opened_and_not_replied' , 'display' : _cruxUtils.getI18n('crm.filter.label.opened.not.replied')}];//no i18n
		}else if(this.data.cxPropCurrentUserDetails.emailTrackingOption == "entprofoff"){//no i18n
			//email_status.sent_status = [{ 'api_name' : 'bounced' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.bounced')}];//no i18n
			email_status.options = [{'system' :'sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.sent')},{'system' :'not_sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.sent')},{'system' :'sent_bounced' , 'display' : _cruxUtils.getI18n('crm.label.filter.email.sentandbounced')},{'system' :'received' , 'display' : _cruxUtils.getI18n('crm.filter.label.received')},{'system' :'not_received' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.received')},{'system' :'bounced' , 'display' : _cruxUtils.getI18n('crm.filter.label.bounced')}];//no i18n
		}else if(this.data.cxPropCurrentUserDetails.emailTrackingOption == "stdon"){//no i18n
			email_status.sent_status = [{ 'api_name' : 'opened' , 'field_label' : _cruxUtils.getI18n('crm.filter.label.opened')},{ 'api_name' : 'clicked' , 'field_label' : _cruxUtils.getI18n('crm.label.filter.email.clicked')},{ 'api_name' : 'not_opened' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.not.opened')},{ 'api_name' : 'bounced' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.bounced')},{ 'api_name' : 'responded' ,  'field_label' : _cruxUtils.getI18n('crm.label.filter.email.responded')},{ 'api_name' : 'opened_and_not_replied' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.opened.not.replied')},{'api_name' : 'any_of_the_above'  , 'field_label' : _cruxUtils.getI18n('crm.filter.label.any')}];//no i18n
			email_status.options = [{'system' :'sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.sent')},{'system' :'not_sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.sent')},{'system' :'opened' , 'display' : _cruxUtils.getI18n('crm.filter.label.opened')},{'system' :'not_opened' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.opened')},{ 'system' : 'clicked' , 'display' : _cruxUtils.getI18n('crm.label.filter.email.clicked')},{ 'system' : 'replied' , 'display' : _cruxUtils.getI18n('crm.filter.label.replied')},{'system' :'bounced' , 'display' : _cruxUtils.getI18n('crm.filter.label.bounced')},{ 'system' : 'responded' ,  'display' : _cruxUtils.getI18n('crm.label.filter.email.responded')}];//no i18n
		}else{
			//email_status.sent_status = [{ 'api_name' : 'bounced' ,  'field_label' : _cruxUtils.getI18n('crm.filter.label.bounced')}];//no i18n
			email_status.options = [{'system' :'sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.sent')},{'system' :'not_sent' , 'display' : _cruxUtils.getI18n('crm.filter.label.not.sent')},{'system' :'sent_bounced' , 'display' : _cruxUtils.getI18n('crm.label.filter.email.sentandbounced')},{'system' :'bounced' , 'display' : _cruxUtils.getI18n('crm.filter.label.bounced')}];//no i18n
		}
		if( (moduleRecordMapping[module_name].api_name === "Contacts" || module_name.includes("CustomModule"))&& moduleRecordMapping.Services ){
			activity.appointmentsOptEnabled = true;
		}
		if(moduleRecordMapping[module_name] && moduleRecordMapping[module_name].generated_type == "custom" && notes &&  activity){
			var arr = [];
			if(this.data.cxPropCurrentUserDetails.EDITION_NAME != "Free"){
				arr.push(email_status);
			}
			if(moduleRecordMapping.Activities && activity && moduleRecordMapping.Activities.visible && moduleRecordMapping.Activities.viewable){
				arr.push(activity);
			}
			if(!this.data.supportRelatedModules){
				arr.push(notes);
			}
			Lyte.arrayUtils(special_field, 'insertAt', 0,arr) //no i18n
		}
		if(module_name == "Accounts" || module_name =="Contacts"){
			if(module_name == "Accounts" && moduleRecordMapping.Contacts && contacts && moduleRecordMapping.Contacts.visible && moduleRecordMapping.Contacts.viewable && !this.data.supportRelatedModules){
				Lyte.arrayUtils(special_field, 'insertAt', 0,contacts) //no i18n
			}else if(module_name != "Accounts" &&moduleRecordMapping.Campaigns && moduleRecordMapping.Campaigns.visible && moduleRecordMapping.Campaigns.viewable && campaigns){//no i18n
				Lyte.arrayUtils(special_field, 'insertAt', 0,campaigns) //no i18n
			}
			var DealsMod = moduleRecordMapping.Potentials ? store.peekRecord("module",moduleRecordMapping.Potentials.id) : undefined;//no i18n
			if(DealsMod && DealsMod.visible && DealsMod.viewable && DealsMod.fields && DealsMod.fields.length && deal && !this.data.supportRelatedModules){
				var DealStages = DealsMod.fields[this.getIndex(DealsMod.fields,"Stage",'api_name',true)].pick_list_values //no i18n

				var temp_field = [] //no i18n
				var t = DealsMod.fields.filterBy({api_name : "Amount"})[0];
				if(t){
					temp_field.push({api_name : "cxFilter_Deal_Amount", visible : true,name : 'Amount', data_type: "currency" , field_label : moduleRecordMapping.Potentials.singular_label+" "+t.field_label, display_field_label : moduleRecordMapping.Potentials.singular_label+" "+t.field_label});//no i18n
				}
				t = DealsMod.fields.filterBy({api_name : "Stage"})[0];
				if(t){
					temp_field.push({api_name: "cxFilter_Deal_Stage" ,visible : true,  name : 'Stage' , data_type: "picklist" , field_label : moduleRecordMapping.Potentials.singular_label+" "+t.field_label,display_field_label :  moduleRecordMapping.Potentials.singular_label+" "+t.field_label, pick_list_values : DealStages });//no i18n
				}
				t = DealsMod.fields.filterBy({api_name : "Owner"})[0];
				if(t){
					temp_field.push({api_name: "cxFilter_Deal_Owner", visible : true,name : 'Owner' ,data_type: "ownerlookup", field_label :t.field_label,display_field_label : t.field_label});//no i18n
				}
				t = DealsMod.fields.filterBy({api_name : "Closing_Date"})[0];
				if(t){
					temp_field.push({api_name: "cxFilter_Deal_Closing_Date" ,visible : true,  name:'Closing_Date',data_type: "date" , field_label :moduleRecordMapping.Potentials.singular_label+" "+t.field_label,display_field_label : moduleRecordMapping.Potentials.singular_label+" "+t.field_label});//no i18n
				}

				Lyte.arrayUtils(special_field, 'insertAt', 0,temp_field) //no i18n
				Lyte.arrayUtils(special_field, 'insertAt', 0,deal) //no i18n
			}
		}if(module_name == "Leads" || module_name== "Potentials" || module_name== "Deals" || module_name =="Contacts"){ //no i18n
			if(module_name == "Leads" && moduleRecordMapping.Campaigns && moduleRecordMapping.Campaigns.visible && moduleRecordMapping.Campaigns.viewable ){
				Lyte.arrayUtils(special_field, 'insertAt', 0,campaigns) //no i18n
			}
			if(notes && !this.data.supportRelatedModules){
				Lyte.arrayUtils(special_field, 'insertAt', 0,notes) //no i18n
			}
			if(moduleRecordMapping.Activities && activity && moduleRecordMapping.Activities.visible && moduleRecordMapping.Activities.viewable){
				Lyte.arrayUtils(special_field, 'insertAt', 0,activity) //no i18n
			}
			// if(this.data.cxPropCurrentUserDetails.EDITION_NAME != "Free"){
			// 	Lyte.arrayUtils(special_field, 'insertAt', 0,email_status) //no i18n
			// }

		}
		// if( this.data.cxPropCurrentUserDetails.isEmailsForModuleEnabled && ['Vendors'].indexOf(module_name) !== -1 && this.data.cxPropCurrentUserDetails.EDITION_NAME != "Free" && this.data.cxPropCurrentUserDetails.EDITION_NAME != "Standard"){
		// 	Lyte.arrayUtils(special_field, 'insertAt', 0,email_status)
		// }
		if( this.data.cxPropCurrentUserDetails.emailStausEnabledModule &&   this.data.cxPropCurrentUserDetails.emailStausEnabledModule.indexOf(this.data.cxPropModule) !== -1){
			Lyte.arrayUtils(special_field, 'insertAt', 0,email_status);
		}

		/*var predictionEnabled = false,prediction_field_1 = null;
		if(this.data.cxPropCurrentUserDetails.isLeadPredictionEnabled && module_name == "Leads" ){
			predictionEnabled = true;
			prediction_field_1 = {api_name : "cxFilter_Likely_to_convert", visible : true,data_type : "crossfield",zcqa : "lead_pre_con" ,field_label : _cruxUtils.getI18n('crm.lead.prediction.likely.convert') ,display_field_label : _cruxUtils.getI18n('crm.lead.prediction.likely.convert') , "options" : [{api_name : "high",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.lead.prediction.convert.high')},{api_name : "medium",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.lead.prediction.convert.medium')},{api_name : "low",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.lead.prediction.convert.low')}]};//no i18n
		}
		 if(this.data.cxPropCurrentUserDetails.isDealPredictionEnabled && module_name== "Potentials"){//no i18n
			predictionEnabled = true;
			prediction_field_1 = {api_name : "cxFilter_Likely_to_convert",visible : true,data_type : "crossfield",zcqa : "lead_pre_con" ,field_label : _cruxUtils.getI18n('crm.predictions.feature.label') ,display_field_label : _cruxUtils.getI18n('crm.predictions.feature.label') , "options" : [{api_name : "win",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.likelywin')},{api_name : "lose",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.likelylose')},{api_name : "halfchance",data_type : "nofield",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.halfchance')}]};//no i18n
		}
		if( predictionEnabled){
			var predictionField = [{api_name : "cxFilter_Prediction_Score",visible : true,data_type : "integer",zcqa : "lead_pre_score",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.score'),display_field_label : _cruxUtils.getI18n('crm.intelligence.prediction.score')},{api_name : "cxFilter_Recent_prediction_score",visible : true,data_type : "crossfield",zcqa : "" , field_label : _cruxUtils.getI18n('crm.lead.prediction.recent.score'),display_field_label : _cruxUtils.getI18n('crm.lead.prediction.recent.score'),'options' : [{api_name : "In_Last" , data_type : "datetime",field_label : "In last"}]},{api_name : "cxFilter_Records_to_focus" ,visible : true,field_label : _cruxUtils.getI18n('crm.intelligence.prediction.recordsfocus'),display_field_label : _cruxUtils.getI18n('crm.intelligence.prediction.recordsfocus'),data_type : "crossfield",'options' : [{api_name : "slowmoving",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.slowmoving')},{api_name : "gonedown",field_label : _cruxUtils.getI18n('crm.intelligence.prediction.trend.down')}]}] //no i18n
			Lyte.arrayUtils(predictionField, 'insertAt', 0, prediction_field_1 )//no i18n
			Lyte.arrayUtils(special_field, 'insertAt', 0, predictionField )//no i18n
		}*/
		if(module_name != "Visits" && module_name != "Messages"){
			if(this.data.cxPropCurrentUserDetails.emailsentimentEnabled && (["Leads","Contacts","Accounts","Deals","Potentials"].indexOf(module_name) != -1 || moduleRecordMapping[module_name].generated_type == "custom") ){
				Lyte.arrayUtils(special_field, 'insertAt', 0, email_sentiments)//no i18n
			}
			if(moduleRecordMapping.LockingInformation && locked_field){
				Lyte.arrayUtils(special_field, 'insertAt', 0,locked_field) //no i18n
			}
			Lyte.arrayUtils(special_field, 'insertAt', 0, custom_fields)//no i18n
		}
        if(moduleRecordMapping[module_name] && moduleRecordMapping[module_name].isRecommendationsEnable){
			if(moduleRecordMapping[module_name].recommendationsDetailsJson && moduleRecordMapping[module_name].recommendationsDetailsJson.what_to && moduleRecordMapping[module_name].recommendationsDetailsJson.what_to.tab_label){
				var recommendation = {"cxFilter_RecordAction":false, 'api_name' : 'Recommendation', 'data_type' : 'recommendation' , 'field_label' : _cruxUtils.getI18n("crm.setup.system.ziarecommendation"), 'display_field_label' : _cruxUtils.getI18n("crm.setup.system.ziarecommendation"), 'showCommonError':true,'visible':true,'values' : [{'system' :'all' , 'display' : _cruxUtils.getI18n('crm.filter.label.all.products',moduleRecordMapping[module_name].recommendationsDetailsJson.what_to.tab_label)}, {'system' :'selected' , 'display' : _cruxUtils.getI18n('crm.filter.label.select.products',moduleRecordMapping[module_name].recommendationsDetailsJson.what_to.tab_label)}]} //no i18n
				Lyte.arrayUtils(special_field, 'insertAt', special_field.length, recommendation)//no i18n
			}
        }

		if(moduleRecordMapping[module_name] && moduleRecordMapping[module_name].isSimilarityEnable){
			var similarityField = {"cxFilter_RecordAction":false,'api_name' : 'Similarity', 'data_type' : 'similarity' ,'field_label' : _cruxUtils.getI18n("crm.setup.system.ziasimilarity"),'display_field_label' : _cruxUtils.getI18n("crm.setup.system.ziasimilarity"),'showCommonError':true,'visible':true,'values' : [], 'options':[] };
			var moduleLabel = moduleRecordMapping[module_name].plural_label;
			similarityField.crossFields = [   //No I18n
											{
												api_name: "SimilarityAvailable", field_label: _cruxUtils.getI18n('crm.label.available'),
												"crossFields" : [   //No I18n
													{api_name: "SimilarityScore", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.score'), data_type: "integer"},  //No I18n
													{api_name: "SimilarityRecords", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.records.search', moduleLabel)}  //No I18n
												]
											},  //No I18n
											{api_name: "SimilarityNotAvailable", showSubField : false, field_label: _cruxUtils.getI18n('crm.gdpr.notavailable.field')}  //No I18n
										]
			Lyte.arrayUtils(special_field, 'insertAt', special_field.length, similarityField)//no i18n
		} 
		if (moduleRecordMapping[module_name] && moduleRecordMapping[module_name].best_time_data && moduleRecordMapping[module_name].best_time_data.isBestTimeEnabled){
			var best_time = {'api_name' : 'best_time', 'data_type' : 'BestTime', 'field_label' : _cruxUtils.getI18n("crm.best.time.column.label"), 'display_field_label' : _cruxUtils.getI18n("crm.best.time.column.label"), 'showCommonError':true,'visible':true,  options:[]};//no i18n
			Lyte.arrayUtils(special_field, 'insertAt', special_field.length, best_time);
		}
		var isNbx = this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_View_Calls || this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_View_Events || ["Potentials","Deals","Contacts"].contains(module_name) ? this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_Send_Mail_Potentials : this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_Send_Mail_Leads ;
		if(isNbx && ["Potentials","Deals","Leads","Contacts"].includes(module_name)  && moduleRecordMapping[module_name] && moduleRecordMapping[module_name].isNbxEnabled ){
			var nbx = {"cxFilter_RecordAction":false,'api_name' : 'next_best_experience', 'data_type' : 'NBX' ,'field_label' : _cruxUtils.getI18n(this.data.cxPropCurrentUserDetails.NBX_GOAL_UI ? "crm.zia.nbx.feature.goal.label" : "crm.zia.nba.feature.label" ),'display_field_label' : this.data.cxPropCurrentUserDetails.NBX_GOAL_UI ? _cruxUtils.getI18n("crm.zia.nbx.feature.goal.label") : _cruxUtils.getI18n("crm.zia.nba.feature.label"),'showCommonError':true,'visible':true,'values' : [] , 'nbx_details' : moduleRecordMapping[module_name].NBX} //NO I18n
			var option_values = undefined;
			if(!this.data.cxPropCurrentUserDetails.NBX_GOAL){
				option_values = [];
				if(this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_View_Calls){
					option_values.push({'actual_value' : 'Calls' , 'display_value' : _cruxUtils.getI18n('Call')});
				}
				if(this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_View_Events){
					option_values.push({'actual_value' : 'Events' , 'display_value' : _cruxUtils.getI18n('Meeting')});
				}
				if(this.data.cxPropCurrentUserDetails.permissions.Crm_Implied_Send_Mail_Potentials){
					option_values.push({'actual_value' : 'Emails' , 'display_value' : _cruxUtils.getI18n('crm.field.label.email')});
				}
			}
			var availableObj = option_values && option_values.length > 0 ? {api_name:"NBX_Available",field_label:_cruxUtils.getI18n('crm.label.available'),data_type : "NBX" , pick_list_values : option_values } : {api_name:"NBX_Available",field_label:_cruxUtils.getI18n('crm.label.available'),data_type : "NBX" ,  showSubField : false}; //no i18n
			nbx.crossFields = [ 
								availableObj , {api_name:"NBX_NotAvailable",field_label:_cruxUtils.getI18n('crm.gdpr.notavailable.field'),data_type : "nofield" ,  showSubField : false}  //No I18n
							]
			Lyte.arrayUtils(special_field, 'insertAt', special_field.length, nbx );
		}
		if(moduleRecordMapping[module_name] && moduleRecordMapping[module_name].isPredictionEnabled){
			var prediction = { 'api_name' : 'Prediction', 'data_type' : 'Prediction', 'field_label' : _cruxUtils.getI18n("crm.predictions.feature.label"), 'display_field_label' : _cruxUtils.getI18n("crm.predictions.feature.label"), 'showCommonError':true,'visible':true,  options:[]} //no i18n
			var trend = [{"system" : "no_trend", "display" : _cruxUtils.getI18n("crm.zia.prediction.notrend")},{"system" : "trend_up", "display":_cruxUtils.getI18n("crm.intelligence.prediction.trendup")},{"system" : "trend_down", "display" : _cruxUtils.getI18n("crm.intelligence.prediction.trenddown")}];//No I18n
			var data = moduleRecordMapping[module_name].prediction_details.slice();
			var fields = moduleRecordMapping[module_name].fields;
			var fieldLen = fields.length;
			var len = data.length;
			for(var indVal = 0; indVal < len; indVal++){
				var predictionField = undefined;
				var scoreField = undefined;
				for(var i = 0; i < fieldLen; i++){
					if(fields[i].id === data[indVal].prediction_field.id){
						predictionField = fields[i];
					}
					if(data[indVal].score_field){
						if(fields[i].id === data[indVal].score_field.id){
							scoreField = fields[i];
						}
					}
					if(scoreField && predictionField){
						break;
					}
				}
				if(predictionField && predictionField.visible && predictionField.available_in_user_layout){
					if(!scoreField && !data[indVal].score_field || scoreField && scoreField.visible && scoreField.available_in_user_layout){
						prediction.options.push({'api_name':"Prediction_" + indVal ,'system' :data[indVal].id, 'display' :data[indVal].name ,"criteria_field":data[indVal].prediction_field,"score_field":data[indVal].prediction_score_field,"trend":trend});//No I18n
					}
					else{
						moduleRecordMapping[module_name].prediction_details.splice(indVal,1);
					}
				}
				else{
					moduleRecordMapping[module_name].prediction_details.splice(indVal,1);
				}
			}
			if(prediction.options[0]){
				prediction.options.push({'api_name':"completed_prediction",'system' : "completed_prediction", 'display' : 'Completed Prediction'});//No I18n
				Lyte.arrayUtils(special_field, 'insertAt', special_field.length, prediction) //no i18n
			}
		}
		var customView = this.data.module_info.custom_view;
		if(customView && customView.system_name && customView.system_name.startsWith("REVIEWPROCESS")){//no i18n

			var review_field = store.peekAll("field").filterBy({api_name : "Record_status"});//no i18n

			if(review_field[0]){
				this.addReviewField(this,special_field,review_field[0]);//no i18n
			}else{
				var self_comp = this;
				store.findAll("field",{module : "Review_Processes"} , true , true , {apiVersion : "2.2"}).then(function(res){//no i18n
					var specialFlds = self_comp.getData("allFields").filter(item=> item.cxAccordionName == 'special_field')[0].cxFields; 
					self_comp.addReviewField(self_comp ,  specialFlds,res.filter(function(item){return item.api_name === "Record_status"})[0]);//no i18n
					if( self_comp.Record_status_field ){
						//need to handle in router
						self_comp.otherCrossFieldHandling(self_comp.Record_status_field);
						delete self_comp.Record_status_field;
					}
				})

			}

		}

		if(module_name == "Messages") {
			var mfield = [
				{'api_name' : 'cxFilter_Not_Replied_Messages',showCommonError : true ,visible : true, 'data_type' : 'datetime' , 'field_label' : _cruxUtils.getI18n('crm.msg.custom.view.not.replied'),'display_field_label' : _cruxUtils.getI18n('crm.msg.custom.view.not.replied')},//no i18n
				{ 'api_name' : 'cxFilter_Replied_Messages',showCommonError : true ,visible : true, 'data_type' : 'datetime' ,'field_label' : _cruxUtils.getI18n('crm.msg.custom.view.replied'),'display_field_label' : _cruxUtils.getI18n('crm.msg.custom.view.replied')}//no i18n
			];
			Lyte.arrayUtils(special_field, 'insertAt', 0, mfield)//no i18n
		}
		//Zia Competitor Alert Smartfilter
		if((module_name==="Contacts" || module_name==="Leads") && this.data.module_info.isCompetitorMentionEnabled){
			var competitorPickListValues = [];
			var sequence_number = 1;
			this.data.module_info.competitor_mention_details.competitors.forEach((competitor) => {
				competitorPickListValues.push({"actual_value": competitor,"display_value": competitor,"sequence_number":sequence_number});
				sequence_number++;
			})	
			var competitorSentiments = [{"actual_value":"Positive","display_value":_cruxUtils.getI18n("crm.sentiment.Positive"),"sequence_number":1,"type":"used"},{"actual_value":"Negative","display_value":_cruxUtils.getI18n("crm.sentiment.Negative"),"sequence_number":2,"type":"used"},{"actual_value":"Neutral","display_value":_cruxUtils.getI18n("crm.sentiment.Neutral"),"sequence_number":3,"type":"used"}];
			var competitorCrossField = {api_name: 'cxFilter_Competitor_Alert',showCommonError: true,visible: true,data_type: 'competitor',field_label : _cruxUtils.getI18n('crm.competitor.name'),options: [{api_name: 'Competitor_Name',data_type: 'picklist',field_label: 'Competitor Name',display_field_label: 'Competitor Name', pick_list_values: competitorPickListValues,isRadioBtn:false},{api_name: 'Competitor_Duration',data_type: 'date',field_data_type: 'date',field_label: 'Competitor_Duration',display_field_label: 'Competitor Duration', pick_list_values: competitorPickListValues,cxLabel: _cruxUtils.getI18n('crm.competitoralert.mentioned.in.email'),isRadioBtn:false,cxClass: 'mT10 mB10',cxStyle: 'font-size: 14px'},{api_name: 'Competitor_Sentiment',data_type: 'picklist',field_label: 'Competitor Sentiment',display_field_label: 'Competitor Sentiment', pick_list_values: competitorSentiments,cxLabel: _cruxUtils.getI18n('crm.competitoralert.with.sentiment'),isRadioBtn: false,cxClass: 'dB mT10 mB10',cxStyle: 'font-size: 14px'}]};
			Lyte.arrayUtils(special_field,"insertAt",special_field.length,competitorCrossField); 
		}
		if(this.data.cxPropCurrentUserDetails.seriesFilterEnabled){
			this.addSeriesField(special_field);
		}
		return special_field
	},
	addSeriesField : function(custom_fields){
		if(moduleRecordMapping.Entity_Cadences && moduleRecordMapping.Entity_Cadences.fields) {
			this.addSeriesFieldsIntoArr(moduleRecordMapping.Entity_Cadences.fields, custom_fields);
		}
		else {
			store.findAll("field",{module : "Entity_Cadences__s"} , true , true , {apiVersion : "4.0"}).then((res) => {
		   		this.addSeriesFieldsIntoArr(res);
			});		
		}
	},
	addSeriesFieldsIntoArr: function(res, custom_fields) {
		var scoreMeta = {api_name: "cxFilter_Series",displayInFilter : true,showCommonError: true,visible: true,field_data_type: "crossfield",field_label: _cruxUtils.getI18n("crm.label.series"),display_field_label: _cruxUtils.getI18n("crm.label.series"),disableExtraValue : true}//No I18n
			scoreMeta.crossFields = [];
			var len = res.length;
			for(i = 0 ; i < len ; i++){
				var jsonA = {};
				if(res[i].api_name  !== "Cadencesid__s"  && res[i].api_name  !== "Name" && res[i].api_name  !== "Seid__s" &&   res[i].api_name  !== "EntityCadencesid__s" && res[i].api_name  !== "id" ){
					jsonA.api_name =  res[i].api_name;
					if( res[i].api_name === "Cadencesid__s"){
						jsonA.pick_list_values = this.getData("seriesArr");
					}else{
					jsonA.pick_list_values = res[i].pick_list_values
					}
					jsonA.field_data_type =  res[i].field_data_type;
					jsonA.data_type = res[i].data_type;
					jsonA.field_label = res[i].field_label
					jsonA.module_name = moduleRecordMapping.Entity_Cadences.api_name
				    scoreMeta.crossFields.push(jsonA);
				 }
			}
			if(custom_fields) {
				custom_fields.push(scoreMeta);
			}
			else {
				// var cf = $L("crux-smart-filter")[0].component.getData("special_field");
				var cf = this.getData("allFields").filter(item=> item.cxAccordionName === 'special_field')[0].cxFields; 
				var cf1 = [];
				cf1.push(scoreMeta);
				// this.cxFilterFields.splice(cf.length , 0 ,scoreMeta );
				Lyte.arrayUtils(cf, 'insertAt', cf.length , cf1)//no i18n
				if(this.allfieldType && !this.allfieldType[scoreMeta.api_name]){
					this.allfieldType[scoreMeta.api_name] =  scoreMeta.data_type;
				}
				this.getFieldByKeyValue(this.data.allFields ,"","",this.cxFilterFields = []);
			}
	},
	addReviewField : function(_this,special_field,review_field){
		var temp_field , review_field_val = review_field.pick_list_values.slice(0);//no i18n
			var i , len = review_field_val.length;
			for(i = 0 ; i < len ; i++){
				if(["Approved" , "Unreviewed"].indexOf(review_field_val[i].actual_value) !== -1){
					Lyte.arrayUtils(review_field_val, 'removeAt', i , 1)//no i18n
					i = i-1;len = len - 1;
				}
			}
			temp_field = { api_name : "cxFilter_Record_status" ,displayInFilter : true, visible : true , data_type : "picklist" , field_label : _cruxUtils.getI18n("crm.reviewprocess.smart.filter"),'display_field_label' :  _cruxUtils.getI18n("crm.reviewprocess.smart.filter"), pick_list_values : review_field_val}//no i18n
			if(_this.allfieldType){
				_this.allfieldType[temp_field.api_name] =  temp_field.data_type;
			}
			temp_field.cxFromArray = special_field;
			Lyte.arrayUtils(special_field, 'insertAt', special_field.length , temp_field)//no i18n
			_this.getFieldByKeyValue(_this.data.allFields ,"","",_this.cxFilterFields = []);
	},
	getVisitsFields : function(module_name,modFields,wrapperObj){
		if( typeof Crm == "undefined"){
			return [];
		}
		var visits_field = [] , moduleRecordMapping = this.moduleRecordMapping;
		if(typeof CrmTracking == 'object' && CrmTracking.portalsInfo && Object.keys(CrmTracking.portalsInfo).length  && ( module_name == "Leads" || module_name== "Contacts") &&  moduleRecordMapping.Visits && moduleRecordMapping.Visits.viewable  && !window.clientPortalName){
			var allvisits = (moduleRecordMapping.Visits.fields) ? moduleRecordMapping.Visits.fields : [],allfields = (modFields) ? modFields : [],i=0,j=0;
			var len = ( allvisits ) ? allvisits.length : 0,isModuleField = false,isVisitsField=false;//no i18n
			var len1 =(allfields) ? allfields.length : 0;//no i18n
			var leadsField = [ 'Average_Time_Spent_Minutes' , 'Days_Visited' , 'First_Visited_URL' , 'First_Visited_Time' , 'Last_Visited_Time' , 'Number_Of_Chats' , 'Referrer' , 'Visitor_Score'] //no i18n
			var visits_columns = new Array(8),lead_contact_fields // [{'api_name' : 'No_Of_Chats', 'data_type' : 'integer' , 'field_label' : _cruxUtils.getI18n('Number\ Of\ Chats')},{'api_name' : 'Average_Time_Spent', 'data_type' : 'integer' , 'field_label' : _cruxUtils.getI18n('Average\ Time\ Spent\ (Minutes)')},{'api_name' : 'Days_Visited', 'data_type' : 'integer' , 'field_label' : _cruxUtils.getI18n('crm.livedesk.days.visited')},{'api_name' : 'Most_Recent_Visit', 'data_type' : 'date' , 'field_label' : _cruxUtils.getI18n('Last\ Visited\ Time')},{'api_name' : 'First_Page_Visited', 'data_type' : 'text' , 'field_label' : _cruxUtils.getI18n('First\ Visited\ URL')},{'api_name' : 'Visitor_Score', 'data_type' : 'integer' , 'field_label' : _cruxUtils.getI18n('Visitor\ Score')},{'api_name' : 'referre', 'data_type' : 'text' , 'field_label' : _cruxUtils.getI18n('Referrer')}] //no i18n
			var visits_array = ['ATTENDEDBY' , 'BROWSER' , 'OPERATINGSYSTEM' , 'PORTAL_NAME' , 'SEARCHENGINE' , 'TIMESPENT' , 'VISITEDTIME'] //no i18n
			var isAccordDisplay = this.data.cxPropDisplayAsAccord,accIndex = -1,accArray = [];
			if(isAccordDisplay){
				var _len = allfields.length;
				for( i=0;i<_len;i++){
					if(allfields[i].cxAccordionName === 'moduleFields'){
						accIndex = i;
						accArray = this.data.supportRelatedModules && allfields[accIndex].cxFields[0].cxFields ? allfields[accIndex].cxFields[0].cxFields : allfields[accIndex].cxFields;
						len1 = accArray.length;
						break;
					}
				}
			}
			lead_contact_fields = new Array(8);
			while(i<len || j<len1){
				if(allvisits[i] && i<len){
					if(visits_array.indexOf(allvisits[i].column_name) != -1 ){
						isVisitsField = true;
						visits_columns[visits_array.indexOf(allvisits[i].column_name)+1] = allvisits[i]
					}
					i = i+1
				}
				if(allfields[j] || (isAccordDisplay && accArray[j])){
					if( accIndex > -1 && leadsField.indexOf(accArray[j].api_name) != -1){
						isModuleField = true;
						lead_contact_fields[leadsField.indexOf(accArray[j].api_name)] = accArray[j]
						Lyte.arrayUtils(accArray, 'removeAt', j, 1); //no i18n
						j=j-1; len1 = len1 -1
					}
					else if( accIndex === -1 && leadsField.indexOf(allfields[j].api_name) != -1) {
						isModuleField = true;
						lead_contact_fields[leadsField.indexOf(allfields[j].api_name)] = allfields[j]
						Lyte.arrayUtils(allfields, 'removeAt', j, 1); //no i18n
						j=j-1; len1 = len1 -1
					}
					j = j+1;
				}
			}  
			if(isModuleField){
				Lyte.arrayUtils(visits_field, 'insertAt', 0,lead_contact_fields); //no i18n
			}
			if(isVisitsField){
				visits_columns[0]	=	{'api_name' : 'cxFilter_Chats', filterable : true,available_in_user_layout : true,visible : true, 'data_type' : 'crossfield' ,'field_label' : _cruxUtils.getI18n('Chats'),'display_field_label' :  _cruxUtils.getI18n('Chats'),'options' : [{'api_name' : 'Attended',showCommonError : true, errorFieldLabel : _cruxUtils.getI18n("Date") , 'data_type' : 'date','field_label':_cruxUtils.getI18n('Attended')},{'api_name' : 'Missed',showCommonError : true, errorFieldLabel : _cruxUtils.getI18n("Date") , 'data_type' : 'date','field_label':_cruxUtils.getI18n('Missed')}]} //no i18n
				Lyte.arrayUtils(visits_field, 'insertAt', 0,visits_columns) //no i18n
			}
			wrapperObj.displayVisitField = visits_field;
			modFields = allfields;
		}
		wrapperObj.moduleFields = modFields;
	},
	similarityClientTracking: function (moduleName, action, clientTrackingKey) {
		var similarityModule = this.moduleRecordMapping[moduleName];
		if(similarityModule) {
			var similarityModuleName = (!similarityModule.module_name.includes("CustomModule") && similarityModule.generated_type === "default") ? similarityModule.api_name : "CustomModule"; //NO I18N
			var properties = {};
			properties.Action = action;
			properties.module = similarityModuleName;
			Crm.client_tracking(clientTrackingKey , properties);
		}
	},
	getABMCriteria: function (api_name, comparator, value) {
		var commonInfo = this.getData('cxPropCommonInfo'), // NO I18N
			cross_filter,
			isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
			relation = {
				api_name: this.data.supportRelatedModules ? 'ABM_Account__r' : 'ABM_Accounts' // NO I18N
			},
			relationApiName = relation.api_name;
		if (!isAccountModule) {
			relation = {
				type: 'field', // NO I18N
				api_name: commonInfo.abmModuleInfo.account_name.api_name,
				relation: relation
			};
			relationApiName = relation.relation.api_name;
		}
		cross_filter = {
			include_objects: true,
			relation: relation,
			criteria: {
				comparator: comparator,
				field: {
					api_name: api_name
				},
				value: value
			}
		};
		return {cross_filter: cross_filter, relation_api_name: relationApiName};
	},
	getFilterCriteria : function( args = {} ){
		//var self = this;
		//this = ( comp ) ? comp : self;//no i18n
		var tempInd = 0,
			abmTechniqueIndex = 0,
			noFieldForABMTechniques = false,
			isAbmFieldUsed = false,
			commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
			abmTechniqueFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
			abmScoreIndex = 0,
			noFieldForABMScores = false,
			checked = []; // NO I18N
			this.getFieldByKeyValue(this.data.allFields , "subField" , true , checked); // NO I18N


		if(this.data.cxPropChildModuleFields && this.data.cxPropChildSelectedFieldCount && this.data.cxPropChildSelectedFieldCount > checked.length){
			return {dummyFieldSelected : true,display_label : this.data.cxPropChildModuleDisplayLabel};
	    }	
		if(!checked.length){ 
			// var msg = _cruxUtils.getI18n('crm.warning.select.filter') //no i18n
			// this.showFilterAlert(msg);
			return {noFieldSelected : true};
		}
		this.specialDateObject = {};
		var relationMappingObj = {} , noFieldForSeg , moduleRecordMapping = this.moduleRecordMapping , idModuleMapping = this.idModuleMapping;
		var header = this.getData("cxPropModuleDisplayField");//no i18n
		var len = checked.length,i,id,api_name,value,value1,crux_comp,comparator="";
		var customLookupField = [] , group=[], crossfilter = [], custom_filter = [], preventSaveFilter = false, flag = false, subTagCriteria = false, CustomLookupCount = 0;
		var queryParams = {},module_name = this.getData('cxPropModule') //no i18n
		var parentNode = $L('#option_Prediction')[0],childNode1 = $L("#sub_option_Prediction_0")[0],childNode2 = $L("#sub_option_Prediction_1")[0];//No I18n
		//NBX Element Start
		var $nbxAvlRadioButton = $L('#sub_field_NBX_Available')[0] , $NbxNotAvlRadioButton = $L('#sub_field_NBX_NotAvailable')[0] ;
		var $NbxPickListComp = undefined , nbxAvailableField = undefined ;
		if(!this.data.cxPropCurrentUserDetails.NBX_GOAL){
			$NbxPickListComp = $L('#NBX_ACTIVITY_OPTION')[0];
			nbxAvailableField = $L('#sub_option_NBX_Available')[0]
		}
		//NBX Element End 
		// checked.sort(function (a, b) {
		// 	  return a.node._attributes.index - b.node._attributes.index;
		// });
		for(i=0;i<len;i++){
			api_name = checked[i].api_name;
			if( checked[i] && checked[i].classInFilter == "hide" ){
				continue;
			}
			
			if(checked[i] && checked[i].field_data_type === "ABM_Techniques" && api_name === "ABM_Techniques" && abmTechniqueIndex < this.getData("abmTechniqueFieldsLength")) {
				api_name = "";
				
				if(abmTechniqueIndex === 0){
					noFieldForABMTechniques = false;
				}
				
				if($L("#sub_field_" + checked[i].crossFields[abmTechniqueIndex].api_name)[0].checked) {
					noFieldForABMTechniques = true;
					api_name = checked[i].crossFields[abmTechniqueIndex].api_name;
				}
				
				i = i - 1;
				abmTechniqueIndex = abmTechniqueIndex + 1;
			}

			if(checked[i] && checked[i].field_data_type === "ABM_Scores" && api_name === "ABM_Scores" && abmScoreIndex < this.getData("abmScoreFieldLength")) {
				api_name = "";
				
				if(abmScoreIndex === 0){
					noFieldForABMScores = false;
				}
				
				if($L("#sub_field_" + checked[i].crossFields[abmScoreIndex].api_name)[0].checked) {
					noFieldForABMScores = true;
					api_name = checked[i].crossFields[abmScoreIndex].api_name;
				}
				
				i = i - 1;
				abmScoreIndex += 1;
			}
			
			if(checked[i] && checked[i] && checked[i].field_data_type === "rfm" && api_name === "Segment_Score" && tempInd < 3){
				api_name ="";
				if( tempInd == 0 ){
					noFieldForSeg = false;
				}
				if( $L("#sub_field_"+checked[i].crossFields[tempInd].api_name)[0].checked  ) {
					noFieldForSeg = true;
					api_name = checked[i].crossFields[tempInd].api_name;
				}
				i = i - 1;tempInd = tempInd + 1;
			}
			if( noFieldForSeg == false && tempInd == 3 ){
				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check',checked[i+1].display_field_label));//no i18n
				return { isValdationFailure : true};
			}
			
			if(this.getData("abmTechniqueFieldsLength") !== 0 && noFieldForABMTechniques === false && abmTechniqueIndex === this.getData("abmTechniqueFieldsLength")) {
				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check', checked[i + 1].display_field_label)); // NO I18N
				return {isValdationFailure: true};
			}

			if(this.getData("abmScoreFieldLength") !== 0 && noFieldForABMScores === false && abmScoreIndex === this.getData("abmScoreFieldLength")) {
				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check', checked[i + 1].display_field_label)); // NO I18N
				return {isValdationFailure: true};
			}
			
			flag = true
			
			if(["Recency", "Frequency", "Monetary"].indexOf(api_name) !== -1 && this.rfm_avilable ||
					(this.getData('abmTechniqueFieldList') && this.getData('abmTechniqueFieldList').indexOf(api_name) !== -1) && this.abm_technique_field_avilable ||
					(this.getData('abmScoreFieldList') && this.getData('abmScoreFieldList').indexOf(api_name) !== -1) && this.abm_score_field_available) {
				id = "#sub_option_" + this._cruxReplace(api_name, "[/.]","_"); // NO I18N
			} else {
				id = "#option_" + this._cruxReplace(api_name, "[/.]","_"); // NO I18N
				id = this.data.cxPropChildModuleFields ? id+"_"+checked[i].id+"_"+this.data.cxPropChildModuleRelation : id;
			}
			
			var subfield = this.$node.querySelector(id);
			
			if(!subfield || api_name === "Segment_Score" || api_name === "ABM_Techniques" || api_name === 'ABM_Scores'){
				continue;
			}
			
			var field = subfield.getData("field");//no i18n
			if( field.classInFilter == "dN" ){
				continue;
			}
			if( this.data.cxPropYieldCriteriaFields.indexOf(field.api_name) != -1 && this.getMethods("onCriteriaConstruct")){
				var criteria = this.executeMethod("onCriteriaConstruct",{component : this,field : field , crossFilterCriteria : crossfilter,filterCriteria : custom_filter});//No I18n
				if( !criteria ){
					criteria = { isValdationFailure : true };
				}
				if( criteria.isValdationFailure ){
					this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(field.display_field_label)));//No I18n
					return criteria;
				}
				if( criteria.cross_filter   ){
					var cross_filter = criteria.cross_filter;
					this.updateCrossFilter(crossfilter, cross_filter.relation.api_name, cross_filter);
				}else{
					Lyte.arrayUtils(group  , "push", criteria);//No I18n 
				}
				continue;
			}
			var activity_option = "" , scoreParentCriteria;
			if(field.field_data_type === "crossModule"){
				var dropValue = $L("#option_"+field.api_name)[0].component.data.selectedValues.value;
				var includeObjects,relation ;
				if(dropValue === "with"){
					includeObjects = true;
				} else {
					includeObjects = false;
				}
				var moduleApiName = field.api_name;
				relation = {"relation_id" : field.id,"api_name": moduleApiName};
				var childCriteria = $L("#customFilter_"+field.api_name)[0].component.getFilterCriteria();
				var childCriteria1 = {comparator : "equal", field : this.data.cxPropRelatedModuleMapping[moduleApiName].field, value : "${NOTEMPTY}"}
				if(childCriteria.noFieldSelected && !childCriteria.dummyFieldSelected){
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": includeObjects, "relation": relation, "criteria":  childCriteria1 }); //no i18n
					continue;
				}
				
				if(childCriteria && childCriteria.queryParams && childCriteria.queryParams.filters){
					childCriteria = childCriteria.queryParams.filters;
				} else if (childCriteria && !childCriteria.queryParams) {
					    return childCriteria;
				} else {
					continue;
				}
				if(!childCriteria.group){
					childCriteria.group_operator = "AND";
					childCriteria.group = [{"comparator" : childCriteria.comparator,"field" : childCriteria.field,"value" : childCriteria.value}];
					delete childCriteria.comparator
					delete childCriteria.field;
					delete childCriteria.value;
				}
				childCriteria.group.push(childCriteria1);
				Lyte.arrayUtils(crossfilter, "push", {"include_objects": includeObjects, "relation": relation, "criteria":  childCriteria }); //no i18n
				continue;
			}
			if(field.field_data_type == "recommendation"){
				preventSaveFilter = "recommendation";//no i18n
				var $node = $('#option_Recommendation')[0];
				var recommendationBasedOn = $node.getData('recommendationBasedOn');//no i18n
				var recommendationTypeSelected = $node.getData('selectedValues').headDropDownValue === 'all'; //no i18n
				var criJson;
				var relationMap = {
					FirstTime: {"api_name": "first_buy_whom"}, //no i18n
					Dependent: {"api_name": "cross_selling_whom"}, //no i18n
					Bundle: {"api_name": "bundle_whom"}, //no i18n
					Repeat: {"api_name": "re_buy_whom"}, //no i18n
					Sequence: {"api_name": "next_buy_whom"} //no i18n
				};
				var fieldArrJson = {
					FirstTime: {api_name: "Item_Id__s"}, //no i18n
					Dependent: {api_name: "Item_Id__s"}, //no i18n
					Bundle: {api_name: "Item_Id__s"}, //no i18n
					Repeat: {api_name: "Item_Id__s"}, //no i18n
					Sequence: {api_name: "Item_Id__s"} //no i18n
				};

				if(recommendationTypeSelected === false){
					var $multiSelectLookupRecommendationInfieldElement = $('#multiSelect_lookup_Recommendation_infield')[0];
					var t = $L("#option_" + field.api_name)[0];//no i18n
					var selectVals = t.getData().renderItems2;//no i18n
					if (selectVals.length === 0) {
						this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupRecommendationInfieldElement.component);//no i18n
						return {isValdationFailure: true}
					}
					selectVals = this.getValueBasedonKeys(selectVals, t.getData().lookupDisplayField);//no i18n
					criJson = {
						comparator: "equal", value: selectVals //no i18n
					}
				}else {
					criJson = { comparator: "not_equal",value: "${EMPTY}" }; //no i18n
				}
				var isRecSelect = false;
				if(recommendationBasedOn.first_buy){
					isRecSelect = true;
					criJson.field = fieldArrJson.FirstTime;
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.FirstTime, "criteria": criJson }); //no i18n
				}
				if(recommendationBasedOn.cross_selling){
					isRecSelect = true;
					criJson.field = fieldArrJson.Dependent;
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Dependent, "criteria": criJson }); //no i18n
				}
				if(recommendationBasedOn.bundle){
					isRecSelect = true;
					criJson.field = fieldArrJson.Bundle;
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Bundle, "criteria": criJson }); //no i18n
				}
				if(recommendationBasedOn.next_buy){
					isRecSelect = true;
					criJson.field = fieldArrJson.Sequence;
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Sequence, "criteria": criJson }); //no i18n
				}
				if(recommendationBasedOn.re_buy != true && isRecSelect === false){
					this.showFilterAlert(_cruxUtils.getI18n('crm.recommendation.empty.value.alert'));//no i18n
					return {isValdationFailure: true}
				}
				if(recommendationBasedOn.re_buy){
					isRecSelect = true;
					criJson.field = fieldArrJson.Repeat;
					var timeValue = $node.getData("selectedValues").firstDropDownValue;//no i18n
					if( timeValue !== 'all') {
						var timVal;
						if (timeValue === "CUSTOM") { //no i18n
							var $RecommendationCustomElement = $('#Recommendation_custom')[0];
							timVal = $RecommendationCustomElement.component.getValue();
							timVal = [this.getISODateTime(timVal,this.datePattern), this.getISODateTime(timVal,this.datePattern,"end")];
							if (timVal === undefined || timVal === '') {
								this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $RecommendationCustomElement.component);//no i18n
								return {isValdationFailure: true};
							}
						} else {
							timVal = timeValue;
						}
						var criJson2 = {
							comparator: (timeValue !== "CUSTOM") ? "equal" : "between", //no i18n
							value: timVal,
							field: {api_name: "Bought_Date__s"} //no i18n
						};
						criJson = {
							group_operator: "and", group: [criJson, criJson2] //no i18n
						};
					}
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Repeat, "criteria": criJson }); //no i18n
				}
				if(isRecSelect === false){
					var $multiSelectLookupRecommendationElement = $('#by_Recommendation_dropdownSysValue')[0];
					this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupRecommendationElement.component);//no i18n
					return {isValdationFailure: true}
				}
				continue;
			}
			if(field.field_data_type === "similarity"){
				preventSaveFilter = "similarity";  //no i18n
				isRecSelect = false;
				var $sub_field_Available = $('#sub_field_SimilarityAvailable')[0];
				var isAvailable = $sub_field_Available.component.data.ltPropChecked;
				const clientTrackingKey = "Zia Similarity SmartFilter";  //no i18n

				if(isAvailable) {

					var $sub_field_Records = $('#sub_field_SimilarityRecords')[0];
					var isRecords = $sub_field_Records.component.data.ltPropChecked;
					var $sub_field_Score = $('#sub_field_SimilarityScore')[0];
					var isScore = $sub_field_Score.component.data.ltPropChecked;

					if(!isRecords && !isScore) {
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": {api_name: "similarity_whom"}, "criteria": {comparator: "not_equal", value: "${EMPTY}", field: {api_name: "Similar_User__s"}}}); //no i18n
						this.similarityClientTracking(module_name, "available", clientTrackingKey);
						continue;
					}

					var isGroup = isRecords && isScore;
					var groupCriJson = {"group_operator": "AND", "group":[]};

					if(isRecords) {

						isRecSelect = true;
						var $multiSelectLookupSimilarityRecordsElement = $('#multiSelect_lookup_SimilarityRecords')[0];
						var t = $L("#sub_option_SimilarityRecords")[0];//no i18n
						var selectVals = t.getData().renderItems;
						if (selectVals.length === 0) {
							this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupSimilarityRecordsElement.component);//no i18n
							return {isValdationFailure: true}
						}
						selectVals = this.getValueBasedonKeys(selectVals, t.getData().lookupDisplayField);//no i18n
						criJson = {
							comparator: "equal", value: selectVals //no i18n
						}
						criJson.field = {"api_name": "Similar_User__s"};
						var crossFilter = {"include_objects": true, "relation": {"api_name": "similarity_whom"}, "criteria": criJson};
						if(isGroup) {
							Lyte.arrayUtils(groupCriJson.group, "push", criJson); //no i18n
						} else {
							Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
							this.similarityClientTracking(module_name, "record", clientTrackingKey);
						}

					}

					if(isScore) {
						isRecSelect = true;
						id = "#DDV_SimilarityScore"//no i18n
						var tN = this.$node.querySelector(id);
						comparator = tN ? tN.ltProp("selected") : "";//no i18n
						id = '#SimilarityScore_crux_comp' //no i18n
						crux_comp  = $L(id)[0];

						if(comparator === "between" || comparator === "not_between") {
							var id1 = "#between_SimilarityScore_crux_comp";//no i18n
							var crux_comp1 = this.$node.querySelector(id1)
							if(!crux_comp.component.validate() || !crux_comp1.component.validate()){
								flag = false; return { isValdationFailure : true};
							}
							value = crux_comp.component.getValue();
							value1 = crux_comp1.component.getValue();
							if(value === value1 || parseInt(value) > parseInt(value1)){
								this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.to1"),crux_comp); //NO I18N
								flag = false;return { isValdationFailure : true};
							}
							value = [value,value1];

						} else if(comparator !== "${NOTEMPTY}" && comparator !== "${EMPTY}"){
							value = crux_comp.component.getValue();
							if (!crux_comp.component.validate()) {
								flag = false;
								return {isValdationFailure: true};
							}

						} else {
							value = comparator;
							comparator = "equal";

						}
						var criJson = {"comparator": comparator, "value": value}; //No I18n
						criJson.field = {"api_name": "Similar_Score__s"};
						var crossFilter = {
							"include_objects": true,
							"relation": {"api_name": "similarity_whom"},
							"criteria": criJson
						}
						if(isGroup) {
							Lyte.arrayUtils(groupCriJson.group, "push", criJson); //no i18n
						} else {
							Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
							this.similarityClientTracking(module_name, "score", clientTrackingKey);
						}

					}

					if(isGroup) {
						crossFilter = {
							"include_objects": true,
							"relation": {"api_name": "similarity_whom"},
							"criteria": groupCriJson
						}
						Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
						this.similarityClientTracking(module_name, "score and record", clientTrackingKey);
					}

				}

				var $sub_field_NotAvailable = $('#sub_field_SimilarityNotAvailable')[0];
				if($sub_field_NotAvailable.component.data.ltPropChecked){
					Lyte.arrayUtils(crossfilter, "push", {"include_objects": false, "relation": {api_name: "similarity_whom"}, "criteria": {comparator: "not_equal", value: "${EMPTY}", field: {api_name: "Similar_User__s"}}}); //no i18n
					this.similarityClientTracking(module_name, "not available", clientTrackingKey);
					continue;
				}

				if(isRecSelect === false){
					this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $sub_field_Available.component);//no i18n
					return {isValdationFailure: true}
				}
				continue;
			}
			//Best Time to Contact Smart Filter
			if(field.field_data_type === "BestTime") {
				preventSaveFilter = "best_time";  //NO I18N
				var $bestTimeAvl = $L('#by_best_time')[0];
				var time = $bestTimeAvl.component.getData('ltPropSelected');
				var today = new Date();
				var day = today.getDay();
				if ('${TOMORROW}' === time){
					today.setDate(today.getDate() + 1);
					day = today.getDay();	
				}
				var timeZoneOffset = today.getTimezoneOffset() * 60;
				var result = [];
				var bestTimeCriteria = {};
				var business_hours = [];
				if (moduleRecordMapping[module_name].best_time_data && moduleRecordMapping[module_name].best_time_data.businessHours){
					business_hours = '${TODAY}' === time ? moduleRecordMapping[module_name].best_time_data.businessHours.today : moduleRecordMapping[module_name].best_time_data.businessHours.tomorrow;
				}
				if (business_hours.length !== 0) {
					var [startHour, startMinute] = business_hours[0].split(":").map(time => parseInt(time, 10));
					var [endHour, endMinute] = business_hours[1].split(":").map(time => parseInt(time, 10));
				
					const SECOND = 1;
					const MINUTE = 60 * SECOND;
					const HOUR = 60 * MINUTE;
					const DAY = 24 * HOUR;
					let startTime = (day * DAY) + (startHour * HOUR) + (startMinute * MINUTE) + timeZoneOffset;
					let endTime = (day * DAY) + (endHour * HOUR) + (endMinute * MINUTE) + timeZoneOffset;
					if ('${TODAY}' === time){ 
						let currentTime = (day * DAY) + (today.getHours() * HOUR) + (today.getMinutes() * MINUTE) + timeZoneOffset;
						if ((currentTime > startTime) && (currentTime < endTime)) {
							startTime = currentTime;
							startHour = today.getHours();
							startMinute = today.getMinutes();
						}
					} 
					let startDay = Math.floor(startTime / DAY);
					let endDay = Math.floor(endTime / DAY);
					// Adjust days to the 0-6 range (where 0 is Sunday and 6 is Saturday)
					startDay = (startDay + 7) % 7;
					endDay = (endDay + 7) % 7;
					// Adjust times to be within a single day's boundary
					startTime = startTime % DAY;
					endTime = endTime % DAY;
					if (startTime < 0) {
						startTime += DAY;
					}
					if (endTime < 0) {
						endTime += DAY;
					}
					if (startHour === 0 && startMinute === 0 && endHour === 24 && endMinute === 0 && timeZoneOffset !== 0) {
						result.push([startDay, startTime, DAY]);
						result.push([endDay, 0, endTime]);
					} else if (startTime !== endTime) {
						if (startTime > endTime || ((endHour === 24 && endMinute === 0) && timeZoneOffset > 0)) {
							result.push([startDay, startTime, DAY]);
							if (endTime > 0) { // Not pushing the next day if endTime is exactly 0
								result.push([endDay, 0, endTime]);
							}
						} else {
							result.push([startDay, startTime, endTime]);
						}
					} else if (startHour === 0 && startMinute === 0 && endHour === 24 && endMinute === 0) {
						result.push([startDay, 0, DAY]);
					}
					if (result.length === 1) {
						var bestTimeDayCriteria = {comparator: "equal", value : result[0][0] , field: {api_name: "Day"}};
						var bestTimeRangeCriteria = {comparator: "between", value: [result[0][1], result[0][2]], field: {api_name: "Best_Time"}};
						bestTimeCriteria = {group_operator: "and", group: [bestTimeDayCriteria, bestTimeRangeCriteria]};
					} else if (result.length === 2) {
						var bestTimeStartDayCriteria = {comparator: "equal", value : result[0][0] , field: {api_name: "Day"}};
						var bestTimeStartRangeCriteria = {comparator: "between", value: [result[0][1], result[0][2]], field: {api_name: "Best_Time"}};
						var bestTimeStartCriteria = {group_operator: "and", group: [bestTimeStartDayCriteria, bestTimeStartRangeCriteria]};
						var bestTimeEndDayCriteria = {comparator: "equal", value : result[1][0] , field: {api_name: "Day"}};
						var bestTimeEndRangeCriteria = {comparator: "between", value: [result[1][1], result[1][2]], field: {api_name: "Best_Time"}};
						var bestTimeEndCriteria = {group_operator: "and", group: [bestTimeEndDayCriteria, bestTimeEndRangeCriteria]};
						bestTimeCriteria = {group_operator: "or", group: [bestTimeStartCriteria, bestTimeEndCriteria]};
					}
					if (!moduleRecordMapping[module_name].best_time_data.isBestTimeEnabledMail || !moduleRecordMapping[module_name].best_time_data.isBestTimeEnabledCall) {
						var bestTimeCallorEmailCriteria ={comparator: "not_equal", value : !moduleRecordMapping[module_name].best_time_data.isBestTimeEnabledMail ? 1 : 0, field: {api_name: "Best_Time_For"}}
						bestTimeCriteria = {group_operator: "and", group: [bestTimeCriteria, bestTimeCallorEmailCriteria]};
					}
				} else if (business_hours.length === 0) { // when business hour is not available for the day
					bestTimeCriteria = {comparator: "equal", value : 8 , field: {api_name: "Day"}};
				}
				var filterSaveCriteria = {comparator: "not_equal", value : time === '${TODAY}' ? "-1" : "-2", field: {api_name: "Best_Time_Category"}};
				var finalCriteria = {};
				if (Object.keys(bestTimeCriteria).length === 0) {
					finalCriteria = filterSaveCriteria;
				} else {
					finalCriteria = {group_operator: "and", group: [bestTimeCriteria, filterSaveCriteria]};
				}
				var apiName = "";
				if (moduleRecordMapping[module_name].best_time_data.moduleRelation && !this.data.supportRelatedModules) {
					apiName = moduleRecordMapping[module_name].best_time_data.moduleRelation.api_name;
				} else { // fail safe if the data doesn't fetch from server side
					if ("Leads" === module_name) {
						apiName = this.data.supportRelatedModules ? "Leads_Best_Time__r" : "Leads_Best_Time";
					} else if ("Contacts" === module_name) {
						apiName = this.data.supportRelatedModules ? "Contacts_Best_Time__r" : "Contacts_Best_Time";
					}
				}
				Lyte.arrayUtils(crossfilter, "push", {
					"include_objects": true, 
					"relation": {api_name: apiName},
					"criteria" : finalCriteria
				});
			}
			//NBX Smart Filter 
			if(field.field_data_type === "NBX"){
				preventSaveFilter = "NBX";
				var relation_obj = {api_name: field.nbx_details.relation};
				var isAvailable = $nbxAvlRadioButton.component.data.ltPropChecked;
				var isNotAvailable = $NbxNotAvlRadioButton.component.data.ltPropChecked;
				if(this.data.cxPropCurrentUserDetails.NBX_GOAL){
					isRecSelect = true;
					//NBX Criteria
					if(isAvailable){
						var moduleList = ["Calls","Emails","Events","SalesOrders","Invoices","Products","Quotes"];
						var values = ["Users"];
						for(var module of moduleList){
							if(moduleRecordMapping[module] && moduleRecordMapping[module].visible){
								values.push(module);
							}
						}

						var avlCri = {comparator: "equal", value: values, field: {api_name: field.nbx_details.action.api_name}}						
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation_obj, "criteria": avlCri});
					}
					else if(isNotAvailable){
						var notAvlCri = {comparator: "not_equal", value: "${EMPTY}", field: {api_name: field.nbx_details.action.api_name}}						
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": false, "relation": relation_obj, "criteria": notAvlCri}); //no i18n
					}
				}
				else{
					isRecSelect = false;
					var currDate = new Date();
					var checkLocale =  ['dd.mm.yyyy.','yyyy. mm. dd','yyyy.mm.dd',"yyyy'年'mm'月'dd'日'"].indexOf(this.datePattern.toLowerCase()) !== -1 ? true : false;//no i18n
					currDate = this.convertUsrtoDefaultDatePattern(currDate,checkLocale);
					currDate.setTime(currDate.getTime() - currDate.getTimezoneOffset() * 60000 )
					currDate = currDate.toISOString().split(/\./)[0] ;

					//NBX Criteria
					if(isAvailable){
						var $picklistComp = $NbxPickListComp;
						var selectedList = $picklistComp.component.getValue();
						var $sub_field_nbx_available = nbxAvailableField;
						isRecSelect = selectedList && selectedList.length > 0 ? true : false;
						if(isRecSelect){
							var disVsSys = {} ; 
							disVsSys[_cruxUtils.getI18n('Call')] = "Calls" ; //NO I18n
							disVsSys[_cruxUtils.getI18n('crm.field.label.email')] = "Emails" ;  //NO I18n
							disVsSys[_cruxUtils.getI18n('Meeting')] = "Events" ;  //NO I18n
							var sysNames = [];
							var selectedActivityLen = selectedList.length;
							for(var ind = 0 ; ind < selectedActivityLen ; ind++){
								sysNames.push(disVsSys[selectedList[ind]]);
							}
							var time = $sub_field_nbx_available.component.getData('selectedValues').firstDropDownValue;
							var activity_criteria = {comparator: "equal", value : sysNames , field: {api_name: field.nbx_details.action.api_name}};
							var time_criteria = {comparator: "less_equal", value : time , field: {api_name: field.nbx_details.duration.api_name}};
							var full_criteria = {group_operator: "and", group: [{comparator: "greater_than", value : currDate , field: {api_name: field.nbx_details.duration.api_name}}, time_criteria]};
							
							Lyte.arrayUtils(crossfilter, "push", {
											"include_objects": true, 
											"relation": relation_obj, 
											"criteria": {group_operator: "and", group: [activity_criteria, full_criteria]}
							});
						}
					}
					else if(isNotAvailable){
						isRecSelect = true;
						var notAvlCri = {
											group_operator: "and", 
											group: [
													{comparator: "not_equal", value: "${EMPTY}", field: {api_name: field.nbx_details.action.api_name}},
													{comparator: "greater_than", value : currDate , field: {api_name: field.nbx_details.duration.api_name}}
												   ]
										}			
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": false, "relation": relation_obj, "criteria": notAvlCri}); //no i18n
					}
				}
				if(["Deals","Potentials"].contains(this.getData('cxPropModule'))){
					//Stage 
					var stageCri =  {"comparator":"equal","field":{"api_name":"Stage"},"value":"${OPEN}","from":"NBX"};
					Lyte.arrayUtils(custom_filter, "push", stageCri);//No I18n
				}
				//Failure
				if(isRecSelect === false){
					this.showFilterAlert(_cruxUtils.getI18n('crm.zia.nbx.smartfilter.alert.msg', this.data.cxPropCurrentUserDetails.NBX_GOAL_UI ? _cruxUtils.getI18n("crm.zia.nbx.feature.goal.label") : _cruxUtils.getI18n("crm.zia.nba.feature.label")),  $nbxAvlRadioButton.component);//no i18n
					return {isValdationFailure: true}
				}
				continue;
			}
			//Prediction smart filter
			if(field.field_data_type === "Prediction"){
				preventSaveFilter = "prediction";//no i18n
				var $node = parentNode
				var selectedType =  $node.getData("predictionSelectedType");//No I18n
				var data = $node.getData("predictionData");//No I18n
				var selectedTrend = $node.getData("selectedTrend") === "trend_down" ? "-1" : $node.getData("selectedTrend") === "trend_up" ? "1" : "0";//No I18n
				var isPredictionSelected = false;
				var relation;
				var cri;
				var scoreCri;
				if(selectedType && selectedType.first || selectedType.second){
					isPredictionSelected = true;
					var configData = selectedType.first ? data[0] : data[1];
					var childNode = selectedType.first ? childNode1 :  childNode2;
					relation = configData.relation;
					var cri = $node.getData("predictionCriteria");//No I18n

					if(cri.value && (cri.value.toString().includes("${AGEIN") || cri.value.toString().includes("${DUEIN")) && childNode.getData("showSecondDropdownType") === "date"){
						cri.comparator = cri.value.startsWith("${AGEIN") ? "Age in Days" : "Due in Days"; // no i18n
						delete cri.value
					}
					var val = childNode.getData("selectedValues").criteriaValue , val1 = childNode.getData("selectedValues").criteriaValue0 , val2 = childNode.getData("selectedValues").criteriaValue1;//No I18n
					if(cri.comparator.startsWith("$")){
						cri.value = cri.comparator;
						cri.comparator = "equal"; //No I18n
					}
					else if(childNode.getData("predictionEle") === "date" || $node.getData("predictionEle") === "date"){
						var data_type = childNode.getData().predictionSelectedType.criteria_fields[0].data_type === "date" ? "date" : "datetime";//No I18n
						if(cri.comparator === "Due in Days" || cri.comparator === "Age in Days"){//no i18n
							var str = cri.comparator === "Due in Days" ? "DUEIN" : "AGEIN";//No I18n
							var backUp = cri.comparator;
							var numberValue = childNode.getData("selectedValues").dateVal;//No I18n
							cri.comparator = "less_equal"; //No I18n
							cri.value = numberValue.toString().length > 0 ? "${" + str + childNode.getData("selectedValues").secondDropDownValue + "}+" + numberValue + "" : undefined;
							cri.comparator = cri.value == undefined ? backUp : cri.comparator;
						}
						else if(cri.comparator === "between" || cri.comparator === "not_between"){
							if(val1 && val2 && val1 != "" && val2 != ""){
								if(val1 > val2){
									this.showFilterAlert(_cruxUtils.getI18n('crm.wf.usage.date.criteria.error.msg'));//no i18n
									return {isValdationFailure: true}
								}
								cri.value = [val1,val2] ;
							}
							else{
								cri.value = undefined;
							}
						}
						else{
							if(val && val != ""){
								cri.value = val ;
							}
							else if (childNode.getData("criteriaDisplay")){
								cri.value = undefined
							}
						}
					}
					else if(cri.comparator === "between" || cri.comparator === "not_between"){
						if(val1 && val2){
							if(Number(val1) > Number(val2)){
								this.showFilterAlert(_cruxUtils.getI18n('crm.custom.field.less.than.to1'));//no i18n
								return {isValdationFailure: true}
							}
							cri.value = [val1,val2] ;
						}
						else{
							cri.value = undefined;
						}
					}
					else if(cri.value === undefined && val !== undefined && val.toString().length > 0 || val !== undefined && val !== "" && val.toString().length > 0 && cri.value != val){
						cri.value = val;
					}
					else if($L("#criteria_prediction")[0] && $L("#criteria_prediction")[0].getData().cxPropField.data_type === "boolean"){
						cri.value = $L("#criteria_prediction")[0].getData('cxPropValue');//no I18n
					}else if(cri.value && ["${TODAY}","${YESTERDAY}","${LASTYEAR}","${EMPTY}","${NOTEMPTY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}"].indexOf(cri.value) == -1 && cri.value != val){ //no i18n
						delete cri.value;
					}
					if($node.getData("isScoreSelected")){
						scoreCri = $node.getData("scoreCriteria");//No I18n
						if(scoreCri.comparator.startsWith("$")){
							scoreCri.value = cri.comparator;
							scoreCri.comparator = "equal"; //No I18n
						}
						else{
							var value = childNode.getData("selectedValues").scoreValue;//No I18n
							if(scoreCri.comparator === "between" || scoreCri.comparator === "not_between"){
								var val1 = childNode.getData("selectedValues").scoreValue0;//no i18n
								var val2 = childNode.getData("selectedValues").scoreValue1;//no i18n
								if(val1 && val2){
									if(Number(val1) > Number(val2)){
										this.showFilterAlert(_cruxUtils.getI18n('crm.custom.field.less.than.to1'));//no i18n
										return {isValdationFailure: true}
									}
									scoreCri.value = [val1,val2]
								}
								else{
									scoreCri.value = undefined;
								}
							}
							else{
								scoreCri.value = value;
							}
						}
					}
					if(cri.value === undefined || $node.getData("isScoreSelected") && !scoreCri.value ){
						this.showFilterAlert(_cruxUtils.getI18n('crm.condition.cannot.empty'));//no i18n
						return {isValdationFailure: true}
					}
					var trendCri = {field :configData.insights_details.trend_field , comparator: "equal" , value : selectedTrend};//No I18n
					if(childNode.getData("isTrendSelected") || !configData.score_field && childNode.getData("isTrendSelected") && cri.value !== "${EMPTY}"){
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": trendCri }); //no i18n
					}
					if(cri.value && cri.value !== "${EMPTY}"){
						var isEndCri = {field :configData.insights_details.isEnded_field , comparator: "equal" , value : false , from : "not_completed"};//No I18n
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": isEndCri }); //no i18n
					}
				}
				else if(selectedType && selectedType.completed){
					isPredictionSelected = true;
					var selectedOption = $node.getData("selectedOptionSf");//No I18n
					var isSuccess = $node.getData("isSuccess");//No I18n
					var comp = isSuccess === "true" ? "greater_than" : "less_equal";//No I18n
					var criJson;
					var successCri;
					if(selectedOption === "both" || selectedOption === data[0].id && selectedOption !== "both"){
						criJson = { field :data[0].insights_details.isEnded_field , comparator : "equal", value : true };//No I18n
						successCri = { field :data[0].insights_details.accuracy_field,  comparator : comp , value : "80" };//No I18n
						relation = data[0].relation;
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": criJson }); //no i18n
						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": successCri }); //no i18n
					}
					if(selectedOption === "both" || data.length === 2 && selectedOption === data[1].id && selectedOption !== "both"){
						 criJson = { field :data[1].insights_details.isEnded_field, comparator : "equal", value : true };//No I18n
						 successCri = { field :data[1].insights_details.accuracy_field, comparator : comp , value : "80" };//No I18n
						 relation = data[1].relation;
						 Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": criJson }); //no i18n
						 Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": successCri }); //no i18n
					}
				}
				if(!isPredictionSelected || selectedType.completed && isSuccess === "undefined"){
					this.showFilterAlert(_cruxUtils.getI18n('crm.condition.cannot.empty'));//no i18n
					return {isValdationFailure: true}
				}
				if(scoreCri){
					var criJson = {group_operator: "and", group: [cri, scoreCri]};//No I18n
					cri.from = "Prediction";//No I18n
					scoreCri.from = "Prediction";//No I18n
					Lyte.arrayUtils(custom_filter, "push", criJson);//No I18n
				}
				else if(!selectedType.completed){
					cri.from = "Prediction";//No I18n
					Lyte.arrayUtils(custom_filter, "push", cri); //no i18n
				}
				continue;
			}
			//Competitor Mention starts
			if(field.api_name === "cxFilter_Competitor_Alert"){
				preventSaveFilter = "competitor_alert";
				var mention_criteria = this.$node.querySelector("#DDV_Competitor_Name").component.data.ltPropSelected;
				var mentioned_competitor = '';
				var mentioned_time = '';
				var competitor_mention_details = this.getData('module_info').competitor_mention_details; 
				var competitor_relation = competitor_mention_details.relation;
				var competitor_fields = competitor_mention_details.fields;
				var competitor_mention_fieldid = '';
				var comeptitor_mention_fieldname = '';
				var competitor_sentiment = '';
				var modified_competitors = [];
				if(mention_criteria !== "${EMPTY}" && mention_criteria !== "${NOTEMPTY}"){
					mentioned_competitor = this.$node.querySelector("#Competitor_Name_crux_comp").component.getValue();
					if(mentioned_competitor.length<1){
						this.showAlert(_cruxUtils.getI18n("crm.competitoralert.name.error"));
						return {isValdationFailure: true}
					}
					if(mention_criteria === 'starts_with' || mention_criteria === 'ends_with'){
						mentioned_competitor.forEach((competitor) => {
							modified_competitors.push(mention_criteria === 'starts_with' ? ';'+competitor : competitor+';');
						});
					}

					if(mention_criteria ===  'equal' || mention_criteria === 'not_equal'){
						mentioned_competitor = mentioned_competitor.sort().toString().replaceAll(',',';');
					}
					competitor_sentiment = this.$node.querySelector("#Competitor_Sentiment_crux_comp").component.getValue();
					if(!competitor_sentiment || competitor_sentiment.length<1){
						this.showAlert(_cruxUtils.getI18n('crm.competitoralert.sentiment.error'));
						return {isValdationFailure: true};
					}
					var positive = _cruxUtils.getI18n('crm.sentiment.Positive');
					var negative = _cruxUtils.getI18n('crm.sentiment.Negative');
					var neutral = _cruxUtils.getI18n('crm.sentiment.Neutral');
					switch(competitor_sentiment){
						case positive:
							comeptitor_mention_fieldname = "crmcompetitormentions_positive_competitors__s";
							break;
						case negative:
							comeptitor_mention_fieldname = "crmcompetitormentions_negative_competitors__s";
							break;
						case neutral:
							comeptitor_mention_fieldname = "crmcompetitormentions_neutral_competitors__s";
							break;
					}
					competitor_mention_fieldid = competitor_fields.filter((comp_field) => comp_field.api_name === comeptitor_mention_fieldname)[0].id;
					var competitor_name_field = {"field":{"api_name": comeptitor_mention_fieldname,"id":competitor_mention_fieldid},"comparator":mention_criteria,"value":mentioned_competitor.toString()}
					if(mention_criteria === 'starts_with' || mention_criteria === 'ends_with'){
						competitor_name_field = {
							group_operator: 'OR',
							group: [
								{
									field: {
										api_name: comeptitor_mention_fieldname,
										id: competitor_mention_fieldid
									},
									comparator: mention_criteria,
									value: mentioned_competitor.toString()
								},
								{
									field: {
										api_name: comeptitor_mention_fieldname,
										id: competitor_mention_fieldid
									},
									comparator: 'contains',
									value: modified_competitors.toString()
								}
							]
						}
					}
					var competitor_medium_field = {"field":{"api_name":"crmcompetitormentions_channel__s","id":competitor_fields.filter((comp_field) => comp_field.api_name === "crmcompetitormentions_channel__s")[0].id},"comparator":"equal","value":"1"};
					var competitor_mention_time = {"field":{"api_name":"crmcompetitormentions_created_time__s","id":competitor_fields.filter((comp_field) => comp_field.api_name === "crmcompetitormentions_created_time__s")[0].id},"comparator":"","value":""};
					mentioned_time = $L('#sub_option_Competitor_Duration')[0].component.data.selectedValues;
					if(['Age in Days','Due in Days'].includes(mentioned_time.firstDropDownValue)){
						competitor_mention_time.comparator = 'less_than';
						var dateValue = $L('#Competitor_Duration_crux_comp')[0].component.getValue();
						if(mentioned_time.value1 && dateValue.length>0){
						competitor_mention_time.value = '${'+mentioned_time.firstDropDownValue.replace('Days',mentioned_time.secondDropDownValue).replaceAll(' ','').toUpperCase()+'}+'+dateValue;
						}else{
							this.showAlert(_cruxUtils.getI18n('crm.competitoralert.date.error'));
							return {isValdationFailure: true};
						}
					}
					else if(['equal','less_than','greater_than'].includes(mentioned_time.firstDropDownValue)){
						competitor_mention_time.comparator = mentioned_time.firstDropDownValue;
						var mention_time = $L('#Competitor_Duration_crux_comp')[0].component.data.cxPropValue;
						if(mention_time){
							competitor_mention_time.value = this.getISODateTime($L('#Competitor_Duration_crux_comp')[0].component.data.cxPropValue,Crm.userDetails.DATE_PATTERN,'start');
						}
						else{
							this.showAlert(_cruxUtils.getI18n('crm.competitoralert.date.error'));
							return {isValdationFailure: true};
						}
						
					}
					else if(mentioned_time.firstDropDownValue === 'between'){
						competitor_mention_time.comparator = mentioned_time.firstDropDownValue;
						var fromDate = $L('#Competitor_Duration_crux_comp')[0].component.data.cxPropValue;
						var toDate = $L('#between_Competitor_Duration_crux_comp')[0].component.data.cxPropValue;
						if(fromDate && toDate){
							if($L.moment(fromDate,this.datePattern.toUpperCase()).toDate()>$L.moment(toDate,this.datePattern.toUpperCase()).toDate()){
								this.showAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp);
								return {isValdationFailure: true};
							}
							competitor_mention_time.value = [this.getISODateTime(fromDate,Crm.userDetails.DATE_PATTERN,'start'),this.getISODateTime(toDate,Crm.userDetails.DATE_PATTERN,'start')];
						}
						else{
							this.showAlert(_cruxUtils.getI18n('crm.competitoralert.date.error'));
							return {isValdationFailure: true};
						}
					}
					else{
						competitor_mention_time.comparator = 'equal';
						competitor_mention_time.value = mentioned_time.firstDropDownValue;
					}
					var competitor_source_mention_time = {"group_operator": "AND","group": [competitor_medium_field,competitor_mention_time]}
					competitor_criteria = {"include_objects":true,"relation":{"api_name":competitor_relation.api_name},"criteria": {"group_operator": "AND","group": [competitor_name_field,competitor_source_mention_time]}
					}
				}
				else{
					var seid_field = competitor_fields.filter((field) => field.api_name === "crmcompetitormentions_seid__s")[0];
					competitor_criteria = {
								"include_objects": mention_criteria === "${NOTEMPTY}",
								"relation": {
									"api_name": competitor_relation.api_name
								},
								"criteria": {
									"field": {
										"api_name": seid_field.api_name,
										"id": seid_field.id
									},
									"comparator": "equal",
									"value": "${NOTEMPTY}"
								}
							}
					}
				Lyte.arrayUtils(crossfilter,"push",competitor_criteria);
			}
			// if(field.field_data_type === "multirelation" && field.api_name === "cxFilter_Linked_Segment__s") {
			// 	var cross_filter,
			// 		cruxNode,
			// 		isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
			// 		include_objects = true,
			// 		value = comparator,
			// 		relation = {
			// 			type: 'related_list', // NO I18N
			// 			api_name: "ABM_Accounts", // NO I18N
			// 			relation: {
			// 				api_name: 'ABM_Account_Segment__s' // NO I18N
			// 			}
			// 		};
			// 		/*
			// 		 relation = {
			// 			 type: 'related_list',
			// 			 api_name: 'ABM_Account_Segment1'
			// 		 }; */
	
			// 	if (!isAccountModule) {
			// 		relation = {
			// 			type: 'field', // NO I18N
			// 			api_name: commonInfo.abmModuleInfo.account_name.api_name, // NO I18N,
			// 			relation: {
			// 				api_name: 'ABM_Account_Segment1' // NO I18N
			// 			}
			// 		};
			// 	}
				
			// 	isAbmFieldUsed = true;
				
			// 	if(comparator.indexOf("${") === -1) {
			// 		cruxNode = this.$node.querySelector("#option_" + this._cruxReplace(field.api_name, "[/.]","_")); // NO I18N
			// 		value = cruxNode.getData().renderItems;
					
			// 		if(!value.length){
			// 			this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check", field.field_label), crux_comp); // NO I18N
			// 			flag = false;
						
			// 			return {
			// 				isValdationFailure: true
			// 			};
			// 		}
					
			// 		value = this.getValueBasedonKeys(value, cruxNode.getData().lookupDisplayField);
			// 	} else {
			// 		include_objects = !(comparator === "${EMPTY}"); // NO I18N
					
			// 		if(comparator === "${NOTEMPTY}") {
			// 			value = "${EMPTY}"; // NO I18N
			// 		}
					
			// 		comparator = "not_equal"; // NO I18N
			// 	}
	
			// 	cross_filter = {
			// 		include_objects: include_objects,
			// 		relation: relation,
			// 		criteria: {
			// 			comparator: comparator,
			// 			field: {
			// 				api_name: "Linked_Segment__s" // NO I18N
			// 			},
			// 			value: value
			// 		}
			// 	};
	
			// 	this.updateCrossFilter(crossfilter, isAccountModule ? relation.api_name : relation.relation.api_name, cross_filter);
			// } 
			// if(field.data_type == "formula" || field.dataparam.return_type){
			// 	field.field_data_type = field.formula.return_type ? field.formula.return_type : field.dataparam.return_type
			// }else
			var criteria = subfield.component.getFieldCriteria(this);
			if(!criteria){
				continue;
			}
			if( criteria.isValdationFailure ){
				return criteria;
			}
			if( criteria.cross_filter ){
				var cross_filter = criteria.cross_filter;
				this.updateCrossFilter(crossfilter, criteria.relation_name ? criteria.relation_name : cross_filter.relation.api_name, cross_filter);
				// this checks for stage field. it will accept both filter and cross filter
				if( criteria.criteria ){ 
					Lyte.arrayUtils(group  , "push", criteria.criteria);//No I18n 
				}
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
			}else if( criteria.custom_filter ){
				Lyte.arrayUtils(custom_filter, "push", criteria.custom_filter);//No I18n
			}else{
				Lyte.arrayUtils(group  , "push", criteria);//No I18n 
			}
		}
		if(flag){
			let getGroupFormat = (criteria)=>{
				let finalCriteria;
				criteria.forEach((cri)=>{
					finalCriteria = this.construct_group(finalCriteria , cri , 'AND');
				});
				return finalCriteria;
			};
			var  criteria,filter_criteria = []
			criteria = group
			if(custom_filter.length != 0 || criteria.length !=0){
				Lyte.arrayUtils(custom_filter, "push", criteria);//No I18n
				// custom_filter.reverse()
				if( args.getGroupFormatCriteria ){
					filter_criteria = getGroupFormat(custom_filter);
				}else{
					filter_criteria =(custom_filter.length == 1)?custom_filter[0] : {group_operator : "AND", group : custom_filter} //no i18n
				}
				
			}
			if(filter_criteria.length != 0){
				queryParams.filters = filter_criteria
			}
			if(crossfilter.length !=0){
				// crossfilter.reverse()
				queryParams.cross_filters = crossfilter
			}
			
			// if(isAbmFieldUsed) {
			// 	preventSaveFilter = "abm"; // NO I18N
			// }
			return { queryParams : queryParams, preventSaveFilter : preventSaveFilter}
		}
		return

	},
// 	getCriteria : function(){
// 		//var self = this;
// 		//this = ( comp ) ? comp : self;//no i18n
// 		var tempInd = 0,
// 			abmTechniqueIndex = 0,
// 			noFieldForABMTechniques = false,
// 			isAbmFieldUsed = false,
// 			commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
// 			abmTechniqueFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
// 			abmScoreIndex = 0,
// 			noFieldForABMScores = false,
// 			checked = []; // NO I18N
// 			this.getFieldByKeyValue(this.data.allFields , "subField" , true , checked); // NO I18N
			
// 		if(!checked.length){ 
// 			// var msg = _cruxUtils.getI18n('crm.warning.select.filter') //no i18n
// 			// this.showFilterAlert(msg);
// 			return {noFieldSelected : true};
// 		}
// 		this.specialDateObject = {};
// 		var relationMappingObj = {} , noFieldForSeg , moduleRecordMapping = this.moduleRecordMapping , idModuleMapping = this.idModuleMapping;
// 		var header = this.getData("cxPropModuleDisplayField");//no i18n
// 		var len = checked.length,i,id,api_name,value,value1,crux_comp,comparator="";
// 		var customLookupField = [] , group=[], crossfilter = [], custom_filter = [], preventSaveFilter = false, flag = false, subTagCriteria = false, CustomLookupCount = 0;
// 		var queryParams = {},module_name = this.getData('cxPropModule') //no i18n
// 		var parentNode = $L('#option_Prediction')[0],childNode1 = $L("#sub_option_Prediction_0")[0],childNode2 = $L("#sub_option_Prediction_1")[0];//No I18n
// 		//NBX Element Start
// 		var $nbxAvlRadioButton = $L('#sub_field_NBX_Available')[0] , $NbxNotAvlRadioButton = $L('#sub_field_NBX_NotAvailable')[0] , $NbxPickListComp = $L('#NBX_ACTIVITY_OPTION')[0] , nbxAvailableField = $L('#sub_option_NBX_Available')[0];
// 		//NBX Element End 
// 		// checked.sort(function (a, b) {
// 		// 	  return a.node._attributes.index - b.node._attributes.index;
// 		// });
// 		for(i=0;i<len;i++){
// 			api_name = checked[i].api_name;
// 			if( checked[i] && checked[i].classInFilter == "hide" ){
// 				continue;
// 			}
			
// 			if(checked[i] && checked[i].field_data_type === "ABM_Techniques" && api_name === "ABM_Techniques" && abmTechniqueIndex < this.getData("abmTechniqueFieldsLength")) {
// 				api_name = "";
				
// 				if(abmTechniqueIndex === 0){
// 					noFieldForABMTechniques = false;
// 				}
				
// 				if($L("#sub_field_" + checked[i].crossFields[abmTechniqueIndex].api_name)[0].checked) {
// 					noFieldForABMTechniques = true;
// 					api_name = checked[i].crossFields[abmTechniqueIndex].api_name;
// 				}
				
// 				i = i - 1;
// 				abmTechniqueIndex = abmTechniqueIndex + 1;
// 			}

// 			if(checked[i] && checked[i].field_data_type === "ABM_Scores" && api_name === "ABM_Scores" && abmScoreIndex < this.getData("abmScoreFieldLength")) {
// 				api_name = "";
				
// 				if(abmScoreIndex === 0){
// 					noFieldForABMScores = false;
// 				}
				
// 				if($L("#sub_field_" + checked[i].crossFields[abmScoreIndex].api_name)[0].checked) {
// 					noFieldForABMScores = true;
// 					api_name = checked[i].crossFields[abmScoreIndex].api_name;
// 				}
				
// 				i = i - 1;
// 				abmScoreIndex += 1;
// 			}
			
// 			if(checked[i] && checked[i] && checked[i].field_data_type === "rfm" && api_name === "Segment_Score" && tempInd < 3){
// 				api_name ="";
// 				if( tempInd == 0 ){
// 					noFieldForSeg = false;
// 				}
// 				if( $L("#sub_field_"+checked[i].crossFields[tempInd].api_name)[0].checked  ) {
// 					noFieldForSeg = true;
// 					api_name = checked[i].crossFields[tempInd].api_name;
// 				}
// 				i = i - 1;tempInd = tempInd + 1;
// 			}
// 			if( noFieldForSeg == false && tempInd == 3 ){
// 				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check',checked[i+1].display_field_label));//no i18n
// 				return { isValdationFailure : true};
// 			}
			
// 			if(this.getData("abmTechniqueFieldsLength") !== 0 && noFieldForABMTechniques === false && abmTechniqueIndex === this.getData("abmTechniqueFieldsLength")) {
// 				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check', checked[i + 1].display_field_label)); // NO I18N
// 				return {isValdationFailure: true};
// 			}

// 			if(this.getData("abmScoreFieldLength") !== 0 && noFieldForABMScores === false && abmScoreIndex === this.getData("abmScoreFieldLength")) {
// 				this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check', checked[i + 1].display_field_label)); // NO I18N
// 				return {isValdationFailure: true};
// 			}
			
// 			flag = true
			
// 			if(["Recency", "Frequency", "Monetary"].indexOf(api_name) !== -1 && this.rfm_avilable ||
// 					(this.getData('abmTechniqueFieldList') && this.getData('abmTechniqueFieldList').indexOf(api_name) !== -1) && this.abm_technique_field_avilable ||
// 					(this.getData('abmScoreFieldList') && this.getData('abmScoreFieldList').indexOf(api_name) !== -1) && this.abm_score_field_available) {
// 				id = "#sub_option_" + this._cruxReplace(api_name, "[/.]","_"); // NO I18N
// 			} else {
// 				id = "#option_" + this._cruxReplace(api_name, "[/.]","_"); // NO I18N
// 			}
			
// 			var subfield = this.$node.querySelector(id);
			
// 			if(!subfield || api_name === "Segment_Score" || api_name === "ABM_Techniques" || api_name === 'ABM_Scores'){
// 				continue;
// 			}
			
// 			var field = subfield.getData("field");//no i18n
// 			if( field.classInFilter == "dN" ){
// 				continue;
// 			}
// 			if( this.data.cxPropYieldCriteriaFields.indexOf(field.api_name) != -1 && this.getMethods("onCriteriaConstruct")){
// 				var criteria = this.executeMethod("onCriteriaConstruct",{component : this,field : field , crossFilterCriteria : crossfilter,filterCriteria : custom_filter});//No I18n
// 				if( criteria.cross_filter   ){
// 					var cross_filter = criteria.cross_filter;
// 					this.updateCrossFilter(crossfilter, cross_filter.relation.api_name, cross_filter);
// 				}else{
// 					Lyte.arrayUtils(group  , "push", criteria);//No I18n 
// 				}
// 				continue;
// 			}
// 			var activity_option = "" , scoreParentCriteria , seriesParentCriteria;
// 			if(field.field_data_type == "recommendation"){
// 				preventSaveFilter = "recommendation";//no i18n
// 				var $node = $('#option_Recommendation')[0];
// 				var recommendationBasedOn = $node.getData('recommendationBasedOn');//no i18n
// 				var recommendationTypeSelected = $node.getData('selectedValues').headDropDownValue === 'all'; //no i18n
// 				var criJson;
// 				var relationMap = {
// 					FirstTime: {"api_name": "first_buy_whom"}, //no i18n
// 					Dependent: {"api_name": "cross_selling_whom"}, //no i18n
// 					Bundle: {"api_name": "bundle_whom"}, //no i18n
// 					Repeat: {"api_name": "re_buy_whom"}, //no i18n
// 					Sequence: {"api_name": "next_buy_whom"} //no i18n
// 				};
// 				var fieldArrJson = {
// 					FirstTime: {api_name: "Item_Id__s"}, //no i18n
// 					Dependent: {api_name: "Item_Id__s"}, //no i18n
// 					Bundle: {api_name: "Item_Id__s"}, //no i18n
// 					Repeat: {api_name: "Item_Id__s"}, //no i18n
// 					Sequence: {api_name: "Item_Id__s"} //no i18n
// 				};

// 				if(recommendationTypeSelected === false){
// 					var $multiSelectLookupRecommendationInfieldElement = $('#multiSelect_lookup_Recommendation_infield')[0];
// 					var t = $L("#option_" + field.api_name)[0];//no i18n
// 					var selectVals = t.getData().renderItems2;//no i18n
// 					if (selectVals.length === 0) {
// 						this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupRecommendationInfieldElement.component);//no i18n
// 						return {isValdationFailure: true}
// 					}
// 					selectVals = this.getValueBasedonKeys(selectVals, t.getData().lookupDisplayField);//no i18n
// 					criJson = {
// 						comparator: "equal", value: selectVals //no i18n
// 					}
// 				}else {
// 					criJson = { comparator: "not_equal",value: "${EMPTY}" }; //no i18n
// 				}
// 				var isRecSelect = false;
// 				if(recommendationBasedOn.first_buy){
// 					isRecSelect = true;
// 					criJson.field = fieldArrJson.FirstTime;
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.FirstTime, "criteria": criJson }); //no i18n
// 				}
// 				if(recommendationBasedOn.cross_selling){
// 					isRecSelect = true;
// 					criJson.field = fieldArrJson.Dependent;
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Dependent, "criteria": criJson }); //no i18n
// 				}
// 				if(recommendationBasedOn.bundle){
// 					isRecSelect = true;
// 					criJson.field = fieldArrJson.Bundle;
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Bundle, "criteria": criJson }); //no i18n
// 				}
// 				if(recommendationBasedOn.next_buy){
// 					isRecSelect = true;
// 					criJson.field = fieldArrJson.Sequence;
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Sequence, "criteria": criJson }); //no i18n
// 				}
// 				if(recommendationBasedOn.re_buy != true && isRecSelect === false){
// 					this.showFilterAlert(_cruxUtils.getI18n('crm.recommendation.empty.value.alert'));//no i18n
// 					return {isValdationFailure: true}
// 				}
// 				if(recommendationBasedOn.re_buy){
// 					isRecSelect = true;
// 					criJson.field = fieldArrJson.Repeat;
// 					var timeValue = $node.getData("selectedValues").firstDropDownValue;//no i18n
// 					if( timeValue !== 'all') {
// 						var timVal;
// 						if (timeValue === "CUSTOM") { //no i18n
// 							var $RecommendationCustomElement = $('#Recommendation_custom')[0];
// 							timVal = $RecommendationCustomElement.component.getValue();
// 							timVal = [this.getISODateTime(timVal,this.datePattern), this.getISODateTime(timVal,this.datePattern,"end")];
// 							if (timVal === undefined || timVal === '') {
// 								this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $RecommendationCustomElement.component);//no i18n
// 								return {isValdationFailure: true};
// 							}
// 						} else {
// 							timVal = timeValue;
// 						}
// 						var criJson2 = {
// 							comparator: (timeValue !== "CUSTOM") ? "equal" : "between", //no i18n
// 							value: timVal,
// 							field: {api_name: "Bought_Date__s"} //no i18n
// 						};
// 						criJson = {
// 							group_operator: "and", group: [criJson, criJson2] //no i18n
// 						};
// 					}
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relationMap.Repeat, "criteria": criJson }); //no i18n
// 				}
// 				if(isRecSelect === false){
// 					var $multiSelectLookupRecommendationElement = $('#by_Recommendation_dropdownSysValue')[0];
// 					this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupRecommendationElement.component);//no i18n
// 					return {isValdationFailure: true}
// 				}
// 				continue;
// 			}
// 			if(field.field_data_type === "similarity"){
// 				preventSaveFilter = "similarity";  //no i18n
// 				isRecSelect = false;
// 				var $sub_field_Available = $('#sub_field_SimilarityAvailable')[0];
// 				var isAvailable = $sub_field_Available.component.data.ltPropChecked;
// 				const clientTrackingKey = "Zia Similarity SmartFilter";  //no i18n

// 				if(isAvailable) {

// 					var $sub_field_Records = $('#sub_field_SimilarityRecords')[0];
// 					var isRecords = $sub_field_Records.component.data.ltPropChecked;
// 					var $sub_field_Score = $('#sub_field_SimilarityScore')[0];
// 					var isScore = $sub_field_Score.component.data.ltPropChecked;

// 					if(!isRecords && !isScore) {
// 						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": {api_name: "similarity_whom"}, "criteria": {comparator: "not_equal", value: "${EMPTY}", field: {api_name: "Similar_User__s"}}}); //no i18n
// 						this.similarityClientTracking(module_name, "available", clientTrackingKey);
// 						continue;
// 					}

// 					var isGroup = isRecords && isScore;
// 					var groupCriJson = {"group_operator": "AND", "group":[]};

// 					if(isRecords) {

// 						isRecSelect = true;
// 						var $multiSelectLookupSimilarityRecordsElement = $('#multiSelect_lookup_SimilarityRecords')[0];
// 						var t = $L("#sub_option_SimilarityRecords")[0];//no i18n
// 						var selectVals = t.getData().renderItems;
// 						if (selectVals.length === 0) {
// 							this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $multiSelectLookupSimilarityRecordsElement.component);//no i18n
// 							return {isValdationFailure: true}
// 						}
// 						selectVals = this.getValueBasedonKeys(selectVals, t.getData().lookupDisplayField);//no i18n
// 						criJson = {
// 							comparator: "equal", value: selectVals //no i18n
// 						}
// 						criJson.field = {"api_name": "Similar_User__s"};
// 						var crossFilter = {"include_objects": true, "relation": {"api_name": "similarity_whom"}, "criteria": criJson};
// 						if(isGroup) {
// 							Lyte.arrayUtils(groupCriJson.group, "push", criJson); //no i18n
// 						} else {
// 							Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
// 							this.similarityClientTracking(module_name, "record", clientTrackingKey);
// 						}

// 					}

// 					if(isScore) {
// 						isRecSelect = true;
// 						id = "#DDV_SimilarityScore"//no i18n
// 						var tN = this.$node.querySelector(id);
// 						comparator = tN ? tN.ltProp("selected") : "";//no i18n
// 						id = '#SimilarityScore_crux_comp' //no i18n
// 						crux_comp  = $L(id)[0];

// 						if(comparator === "between" || comparator === "not_between") {
// 							var id1 = "#between_SimilarityScore_crux_comp";//no i18n
// 							var crux_comp1 = this.$node.querySelector(id1)
// 							if(!crux_comp.component.validate() || !crux_comp1.component.validate()){
// 								flag = false; return { isValdationFailure : true};
// 							}
// 							value = crux_comp.component.getValue();
// 							value1 = crux_comp1.component.getValue();
// 							if(value === value1 || parseInt(value) > parseInt(value1)){
// 								this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.to1"),crux_comp); //NO I18N
// 								flag = false;return { isValdationFailure : true};
// 							}
// 							value = [value,value1];

// 						} else if(comparator !== "${NOTEMPTY}" && comparator !== "${EMPTY}"){
// 							value = crux_comp.component.getValue();
// 							if (!crux_comp.component.validate()) {
// 								flag = false;
// 								return {isValdationFailure: true};
// 							}

// 						} else {
// 							value = comparator;
// 							comparator = "equal";

// 						}
// 						var criJson = {"comparator": comparator, "value": value}; //No I18n
// 						criJson.field = {"api_name": "Similar_Score__s"};
// 						var crossFilter = {
// 							"include_objects": true,
// 							"relation": {"api_name": "similarity_whom"},
// 							"criteria": criJson
// 						}
// 						if(isGroup) {
// 							Lyte.arrayUtils(groupCriJson.group, "push", criJson); //no i18n
// 						} else {
// 							Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
// 							this.similarityClientTracking(module_name, "score", clientTrackingKey);
// 						}

// 					}

// 					if(isGroup) {
// 						crossFilter = {
// 							"include_objects": true,
// 							"relation": {"api_name": "similarity_whom"},
// 							"criteria": groupCriJson
// 						}
// 						Lyte.arrayUtils(crossfilter, "push", crossFilter); //no i18n
// 						this.similarityClientTracking(module_name, "score and record", clientTrackingKey);
// 					}

// 				}

// 				var $sub_field_NotAvailable = $('#sub_field_SimilarityNotAvailable')[0];
// 				if($sub_field_NotAvailable.component.data.ltPropChecked){
// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": false, "relation": {api_name: "similarity_whom"}, "criteria": {comparator: "not_equal", value: "${EMPTY}", field: {api_name: "Similar_User__s"}}}); //no i18n
// 					this.similarityClientTracking(module_name, "not available", clientTrackingKey);
// 					continue;
// 				}

// 				if(isRecSelect === false){
// 					this.showFilterAlert(_cruxUtils.getI18n('crm.dashboard.sharing.empty.value.alert'), $sub_field_Available.component);//no i18n
// 					return {isValdationFailure: true}
// 				}
// 				continue;
// 			}
// 			//NBX Smart Filter 
// 			if(field.field_data_type === "NBX"){
// 				preventSaveFilter = "NBX";
// 				isRecSelect = false;
// 				var relation_obj = {api_name: field.nbx_details.relation};
// 				var isAvailable = $nbxAvlRadioButton.component.data.ltPropChecked;
// 				var isNotAvailable = $NbxNotAvlRadioButton.component.data.ltPropChecked;

// 				//Current Time 
// 				var currDate = new Date();
// 				var checkLocale =  ['dd.mm.yyyy.','yyyy. mm. dd','yyyy.mm.dd',"yyyy'年'mm'月'dd'日'"].indexOf(this.datePattern.toLowerCase()) !== -1 ? true : false;//no i18n
// 				currDate = this.convertUsrtoDefaultDatePattern(currDate,checkLocale);
// 				currDate.setTime(currDate.getTime() - currDate.getTimezoneOffset() * 60000 )
// 				currDate = currDate.toISOString().split(/\./)[0] ;

// 				//NBX Criteria
// 				if(isAvailable){
// 					var $picklistComp = $NbxPickListComp;
// 					var selectedList = $picklistComp.component.getValue();
// 					var $sub_field_nbx_available = nbxAvailableField;
// 					isRecSelect = selectedList && selectedList.length > 0 ? true : false;
// 					if(isRecSelect){
// 						var disVsSys = {} ; 
// 						disVsSys[_cruxUtils.getI18n('Call')] = "Calls" ; //NO I18n
// 						disVsSys[_cruxUtils.getI18n('crm.field.label.email')] = "Emails" ;  //NO I18n
// 						disVsSys[_cruxUtils.getI18n('Meeting')] = "Events" ;  //NO I18n
// 						var sysNames = [];
// 						var selectedActivityLen = selectedList.length;
// 						for(var ind = 0 ; ind < selectedActivityLen ; ind++){
// 							sysNames.push(disVsSys[selectedList[ind]]);
// 						}
// 						var time = $sub_field_nbx_available.component.getData('selectedValues').firstDropDownValue;
// 						var activity_criteria = {comparator: "equal", value : sysNames , field: {api_name: "NBA"}};
// 						var time_criteria = {comparator: "less_equal", value : time , field: {api_name: "NBA_duration"}};
// 						var full_criteria = {group_operator: "and", group: [{comparator: "greater_than", value : currDate , field: {api_name: "NBA_duration"}}, time_criteria]};
						
// 						Lyte.arrayUtils(crossfilter, "push", {
// 										"include_objects": true, 
// 										"relation": relation_obj, 
// 										"criteria": {group_operator: "and", group: [activity_criteria, full_criteria]}
// 						});
// 					}
// 				}
// 				else if(isNotAvailable){
// 					isRecSelect = true;
// 					var notAvlCri = {
// 										group_operator: "and", 
// 										group: [
// 												{comparator: "not_equal", value: "${EMPTY}", field: {api_name: "NBA"}},
// 												{comparator: "greater_than", value : currDate , field: {api_name: "NBA_duration"}}
// 											   ]
// 									}

// 					Lyte.arrayUtils(crossfilter, "push", {"include_objects": false, "relation": relation_obj, "criteria": notAvlCri}); //no i18n
// 				}
				
// 				//Stage 
// 				var stageCri =  {"comparator":"equal","field":{"api_name":"Stage"},"value":"${OPEN}","from":"NBX"};
// 				Lyte.arrayUtils(custom_filter, "push", stageCri);//No I18n
				
// 				//Failure
// 				if(isRecSelect === false){
// 					this.showFilterAlert(_cruxUtils.getI18n('crm.zia.nbx.smartfilter.alert.msg', _cruxUtils.getI18n("crm.zia.nba.feature.label")),  $nbxAvlRadioButton.component);//no i18n
// 					return {isValdationFailure: true}
// 				}
// 				continue;
// 			}
// 			//Prediction smart filter
// 			if(field.field_data_type === "Prediction"){
// 				preventSaveFilter = "prediction";//no i18n
// 				var $node = parentNode
// 				var selectedType =  $node.getData("predictionSelectedType");//No I18n
// 				var data = $node.getData("predictionData");//No I18n
// 				var selectedTrend = $node.getData("selectedTrend") === "trend_down" ? "-1" : $node.getData("selectedTrend") === "trend_up" ? "1" : "0";//No I18n
// 				var isPredictionSelected = false;
// 				var relation;
// 				var cri;
// 				var scoreCri;
// 				if(selectedType && selectedType.first || selectedType.second){
// 					isPredictionSelected = true;
// 					var configData = selectedType.first ? data[0] : data[1];
// 					var childNode = selectedType.first ? childNode1 :  childNode2;
// 					relation = configData.relation;
// 					var cri = $node.getData("predictionCriteria");//No I18n

// 					if(cri.value && (cri.value.toString().includes("${AGEIN") || cri.value.toString().includes("${DUEIN")) && childNode.getData("showSecondDropdownType") === "date"){
// 						cri.comparator = cri.value.startsWith("${AGEIN") ? "Age in Days" : "Due in Days"; // no i18n
// 						delete cri.value
// 					}
// 					var val = childNode.getData("selectedValues").criteriaValue , val1 = childNode.getData("selectedValues").criteriaValue0 , val2 = childNode.getData("selectedValues").criteriaValue1;//No I18n
// 					if(cri.comparator.startsWith("$")){
// 						cri.value = cri.comparator;
// 						cri.comparator = "equal"; //No I18n
// 					}
// 					else if(childNode.getData("predictionEle") === "date" || $node.getData("predictionEle") === "date"){
// 						var data_type = childNode.getData().predictionSelectedType.criteria_fields[0].data_type === "date" ? "date" : "datetime";//No I18n
// 						if(cri.comparator === "Due in Days" || cri.comparator === "Age in Days"){//no i18n
// 							var str = cri.comparator === "Due in Days" ? "DUEIN" : "AGEIN";//No I18n
// 							var backUp = cri.comparator;
// 							var numberValue = childNode.getData("selectedValues").dateVal;//No I18n
// 							cri.comparator = "less_equal"; //No I18n
// 							cri.value = numberValue.toString().length > 0 ? "${" + str + childNode.getData("selectedValues").secondDropDownValue + "}+" + numberValue + "" : undefined;
// 							cri.comparator = cri.value == undefined ? backUp : cri.comparator;
// 						}
// 						else if(cri.comparator === "between" || cri.comparator === "not_between"){
// 							if(val1 && val2 && val1 != "" && val2 != ""){
// 								if(val1 > val2){
// 									this.showFilterAlert(_cruxUtils.getI18n('crm.wf.usage.date.criteria.error.msg'));//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								cri.value = [val1,val2] ;
// 							}
// 							else{
// 								cri.value = undefined;
// 							}
// 						}
// 						else{
// 							if(val && val != ""){
// 								cri.value = val ;
// 							}
// 							else if (childNode.getData("criteriaDisplay")){
// 								cri.value = undefined
// 							}
// 						}
// 					}
// 					else if(cri.comparator === "between" || cri.comparator === "not_between"){
// 						if(val1 && val2){
// 							if(Number(val1) > Number(val2)){
// 								this.showFilterAlert(_cruxUtils.getI18n('crm.custom.field.less.than.to1'));//no i18n
// 								return {isValdationFailure: true}
// 							}
// 							cri.value = [val1,val2] ;
// 						}
// 						else{
// 							cri.value = undefined;
// 						}
// 					}
// 					else if(cri.value === undefined && val !== undefined && val.toString().length > 0 || val !== undefined && val !== "" && val.toString().length > 0 && cri.value != val){
// 						cri.value = val;
// 					}
// 					else if($L("#criteria_prediction")[0] && $L("#criteria_prediction")[0].getData().cxPropField.data_type === "boolean"){
// 						cri.value = $L("#criteria_prediction")[0].getData('cxPropValue');//no I18n
// 					}else if(cri.value && ["${TODAY}","${YESTERDAY}","${LASTYEAR}","${EMPTY}","${NOTEMPTY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}"].indexOf(cri.value) == -1 && cri.value != val){ //no i18n
// 						delete cri.value;
// 					}
// 					if($node.getData("isScoreSelected")){
// 						scoreCri = $node.getData("scoreCriteria");//No I18n
// 						if(scoreCri.comparator.startsWith("$")){
// 							scoreCri.value = cri.comparator;
// 							scoreCri.comparator = "equal"; //No I18n
// 						}
// 						else{
// 							var value = childNode.getData("selectedValues").scoreValue;//No I18n
// 							if(scoreCri.comparator === "between" || scoreCri.comparator === "not_between"){
// 								var val1 = childNode.getData("selectedValues").scoreValue0;//no i18n
// 								var val2 = childNode.getData("selectedValues").scoreValue1;//no i18n
// 								if(val1 && val2){
// 									if(Number(val1) > Number(val2)){
// 										this.showFilterAlert(_cruxUtils.getI18n('crm.custom.field.less.than.to1'));//no i18n
// 										return {isValdationFailure: true}
// 									}
// 									scoreCri.value = [val1,val2]
// 								}
// 								else{
// 									scoreCri.value = undefined;
// 								}
// 							}
// 							else{
// 								scoreCri.value = value;
// 							}
// 						}
// 					}
// 					if(cri.value === undefined || $node.getData("isScoreSelected") && !scoreCri.value ){
// 						this.showFilterAlert(_cruxUtils.getI18n('crm.condition.cannot.empty'));//no i18n
// 						return {isValdationFailure: true}
// 					}
// 					var trendCri = {field :configData.insights_details.trend_field , comparator: "equal" , value : selectedTrend};//No I18n
// 					if(childNode.getData("isTrendSelected") || !configData.score_field && childNode.getData("isTrendSelected") && cri.value !== "${EMPTY}"){
// 						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": trendCri }); //no i18n
// 					}
// 					if(cri.value && cri.value !== "${EMPTY}"){
// 						var isEndCri = {field :configData.insights_details.isEnded_field , comparator: "equal" , value : false , from : "not_completed"};//No I18n
// 						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": isEndCri }); //no i18n
// 					}
// 				}
// 				else if(selectedType && selectedType.completed){
// 					isPredictionSelected = true;
// 					var selectedOption = $node.getData("selectedOptionSf");//No I18n
// 					var isSuccess = $node.getData("isSuccess");//No I18n
// 					var comp = isSuccess === "true" ? "greater_than" : "less_equal";//No I18n
// 					var criJson;
// 					var successCri;
// 					if(selectedOption === "both" || selectedOption === data[0].id && selectedOption !== "both"){
// 						criJson = { field :data[0].insights_details.isEnded_field , comparator : "equal", value : true };//No I18n
// 						successCri = { field :data[0].insights_details.accuracy_field,  comparator : comp , value : "80" };//No I18n
// 						relation = data[0].relation;
// 						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": criJson }); //no i18n
// 						Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": successCri }); //no i18n
// 					}
// 					if(selectedOption === "both" || data.length === 2 && selectedOption === data[1].id && selectedOption !== "both"){
// 						 criJson = { field :data[1].insights_details.isEnded_field, comparator : "equal", value : true };//No I18n
// 						 successCri = { field :data[1].insights_details.accuracy_field, comparator : comp , value : "80" };//No I18n
// 						 relation = data[1].relation;
// 						 Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": criJson }); //no i18n
// 						 Lyte.arrayUtils(crossfilter, "push", {"include_objects": true, "relation": relation, "criteria": successCri }); //no i18n
// 					}
// 				}
// 				if(!isPredictionSelected || selectedType.completed && isSuccess === "undefined"){
// 					this.showFilterAlert(_cruxUtils.getI18n('crm.condition.cannot.empty'));//no i18n
// 					return {isValdationFailure: true}
// 				}
// 				if(scoreCri){
// 					var criJson = {group_operator: "and", group: [cri, scoreCri]};//No I18n
// 					cri.from = "Prediction";//No I18n
// 					scoreCri.from = "Prediction";//No I18n
// 					Lyte.arrayUtils(custom_filter, "push", criJson);//No I18n
// 				}
// 				else if(!selectedType.completed){
// 					cri.from = "Prediction";//No I18n
// 					Lyte.arrayUtils(custom_filter, "push", cri); //no i18n
// 				}
// 				continue;
// 			}
// 			// if(field.data_type == "formula" || field.dataparam.return_type){
// 			// 	field.field_data_type = field.formula.return_type ? field.formula.return_type : field.dataparam.return_type
// 			// }else
// 			 if(field.Activity_tag){
// 				var RadioBtnValue = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0].ltProp("value");//no i18n
// 				subfield = this.$node.querySelector("#sub_option_"+RadioBtnValue);//no i18n
// 				field = subfield.getData("field");//no i18n
// 				api_name = field.api_name;
// 				//subTagCriteria = true;
// 			}
// 			// else if(field.field_data_type == "crossfield" && field.api_name == "cxFilter_Likely_to_convert"){//no i18n
// 			// 	var search_field = (this.getData('cxPropModule')=="Leads") ? "LPCON":"PREWIN";//no i18n
// 			// 	var score_range = {low : [1,40],medium : [41,60],high : [61,100]}
// 			// 	// no-attribute-selectors
// 			// 	activity_option =$L("."+field.api_name+"_selectedRadioBtn")[0]
// 			// 	activity_option = activity_option.ltProp('value') //no i18n
// 			// 	var node =this.$node.querySelector('#field_cxFilter_Prediction_Score');//no i18n
// 			// 	if(node.checked && this.getData("cxPropModule") == "Leads"){
// 			// 		var msg,node = this.$node.querySelector('#cxFilter_Prediction_Score_crux_comp');//no i18n
// 			// 		var score = node.component.getValue()
// 			// 		if( !(score_range[activity_option][0]<=score && score_range[activity_option][1]>=score) ){
// 			// 			var range = score_range[activity_option][0]+"-"+score_range[activity_option][1]
// 			// 			msg = '<p>'+_cruxUtils.getI18n('crm.lead.prediction.popup.text', activity_option,range)+'</p>';//no i18n
// 			// 			msg += "\n"+'<p class="mT15">'+_cruxUtils.getI18n('crm.lead.prediction.popup.final')+'</p>'; //no i18n
// 			// 			this.showFilterAlert(msg,node);
// 			// 			flag = false;return { isValdationFailure : true};
// 			// 		}
// 			// 	}
// 			// 	preventSaveFilter = "prediction";//no i18n
// 			// 	value = "${"+search_field+"|"+activity_option+"}" //no i18n
// 			// 	Lyte.arrayUtils(group, "push", {comparator:"equal" ,field :{ api_name : "Prediction_Score",id : '' } ,value : value});//No I18n
// 			// 	continue
// 			// }
// 			// if(field.field_data_type == "crossfield" && field.api_name == "cxFilter_Recent_prediction_score"){
// 			// 	var node,node1,search_field = (this.getData('cxPropModule')=="Leads") ? "LPREC": "PREGONEUP";//no i18n
// 			// 	node = this.$node.querySelector('#by_'+field.api_name)//no i18n
// 			// 	value = node.ltProp('selected')//no i18n
// 			// 	node1 = $L("."+field.api_name+"_selectedRadioBtn")[0];//no i18n
// 			// 	search_field = (this.getData('cxPropModule')=="Potentials" && value == "gonedown") ? "PREGONEDOWN" : search_field; //no i18n
// 			// 	var tempVal = "${"+search_field+"|";
// 			// 	if(node1){
// 			// 		activity_option = node1.ltProp('value');//no i18n
// 			// 		if(activity_option == "last3"){
// 			// 			if(this.getData('cxPropModule')=="Leads"){
// 			// 				tempVal = tempVal+value+",";
// 			// 			}
// 			// 			value = tempVal+activity_option+"}" //no i18n
// 			// 		}else{
// 			// 			if(this.getData('cxPropModule')=="Leads"){
// 			// 				tempVal = tempVal+value+",";
// 			// 			}
// 			// 			node = $L('#'+field.api_name+'_crux_comp')[0]//no i18n
// 			// 			var val = node.component.getValue() //no i18n
// 			// 			node1 =  this.$node.querySelector('#second_'+field.api_name+'_dropdown')//no i18n
// 			// 			var second_value =node1.ltProp('selected') //no i18n
// 			// 			second_value = second_value.toLowerCase()
// 			// 			value = tempVal+val+","+second_value+"}" //no i18n
// 			// 		}
// 			// 	}else{
// 			// 		value = "${"+search_field+"|"+value+"}"; //no i18n
// 			// 	}
// 			// 	preventSaveFilter = "prediction";//no i18n
// 			// 	Lyte.arrayUtils(group, "push", {comparator:"equal" ,field :{ api_name : "Prediction_Score",id : '' } ,value : value});//No I18n
// 			// 	continue;
// 			// }
// 			// if(field.field_data_type == "crossfield" && field.api_name == "cxFilter_Records_to_focus"){
// 			// 	 var str="",node = this.$node.querySelector('#sub_field_slowmoving'),search_field = (this.getData('cxPropModule')=="Leads") ? "LPRFOC": "PREFOCUS";//no i18n
// 			// 	value = "${"+search_field;
// 			// 	if(node.checked){
// 			// 		str +=node.getAttribute('value')
// 			// 	}
// 			// 	var node1 = this.$node.querySelector('#sub_field_gonedown')//no i18n
// 			// 	if(node1.checked){
// 			// 		str += (str=="")?node1.getAttribute('value'):","+node1.getAttribute('value')
// 			// 	}
// 			// 	preventSaveFilter = "prediction";//no i18n
// 			// 	if(str != ""){
// 			// 		value =  value+"|"+str;//no i18n
// 			// 	}
// 			// 	value = value+"}";//no i18n
// 			// 	Lyte.arrayUtils(group, "push", {comparator:"equal" ,field :{ api_name : "Prediction_Score",id : '' } ,value : value});//No I18n
// 			// 	continue;
// 			// }
// 			if(field.api_name === "cxFilter_Scoring_Rule"){
// 				var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
// 				if(!nodeElem.validate()){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 				var selectedVal = nodeElem.getValue("actual_value");//No I18n
// 				scoreParentCriteria = {comparator : "equal",field : {api_name : 'Scoring_Rule',id : ""},value : selectedVal};//No I18n
// 				var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
// 				if(!selectedELem){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 				field = $L("#" + selectedELem.id.replace("_field_","_option_")).e.component.data.field;
// 				api_name = field.api_name;
// 			}
// 			if(field.api_name === "cxFilter_UnallocatedRecords"){
// 				var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
// 				if(!nodeElem.validate()){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 				var thresholdId = nodeElem.getValue("actual_value");//No I18n
// 				var threshCri = {comparator : "equal",field : {api_name : 'Threshold__s',id : ""},value : thresholdId};//No I18n
// 				var allocType = {comparator : "equal",field : {api_name : 'Allocation_Type__s',id : ""},value : "2"};//No I18n
// 				var thrshldGrpCri = this.construct_group(threshCri,allocType,"AND");//no i18n
// 				var cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : moduleRecordMapping.Thresholds.api_name },criteria : tempCri1 };
// 				cross_filter.criteria = thrshldGrpCri;
// 				this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 				continue;
// 			}
// 			var srsPrnt;
// 			var srsField = field.api_name;
// 			if(field.api_name === "cxFilter_Series"){
// 				var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
// 				if(!nodeElem.validate()){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 			    var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
// 				if(!selectedELem){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 				var selectedVal = nodeElem.getValue("actual_value");//No I18n
// 				seriesParentCriteria = {comparator : "equal",field : {api_name : 'Cadencesid__s',id : ""},value : selectedVal};//No I18n
// 				var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
// 				field = $L("#" + selectedELem.id.replace("_field_","_option_")).e.component.data.field;
// 			    srsPrnt = "series";
// 				api_name = field.api_name;
// 			}
			
				
// 			if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Email_Sentiment","cxFilter_Locked"].indexOf(field.api_name) != -1 && (field.field_data_type == "crossfield" || field.field_data_type == "custom" )){
// //				var name = (field.api_name == "Activities")?"option_Activities": (field.api_name == "Notes")? "option_Notes" : (field.api_name == "Deals")?'option_Deals':(field.api_name == "cxFilter_Chats")?'option_Chats':(field.api_name == "cxFilter_Email_Sentiment")?'option_Email_Sentiment':'option_Contacts' //no i18n
// 				var node = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0];//no i18n
// 				activity_option = (node)?node.ltProp('value'):"";
// 			}

// 			if(["Without_Open_Activity" ,"Without_Any_Deal" ,'With_Contact','Without_Any_Contact'].indexOf(activity_option) == -1){
// 				id = "#DDV_"+ ( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Locked" || api_name == "cxFilter_Chats"  )?activity_option : this._cruxReplace(api_name, "[/.]","_") )//no i18n
// 				var tN= this.$node.querySelector(id);
// 				comparator = tN ? tN.ltProp("selected") : "";//no i18n
// 			}
// 			id = '#'+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats" || api_name == "cxFilter_Locked")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+'_crux_comp' //no i18n
// 			crux_comp  = $L(id)[0]; //no i18n
// 			if( !(field.api_name === "cxFilter_Email_Status" && field.data_type === "custom") && ( ["${OPEN}","${CLOSEDWON}","${CLOSEDLOST}","${EMPTY}","${BLOCKED}","${NOTBLOCKED}","${NOTEMPTY}"].indexOf(comparator) !== -1 ) && field.field_data_type !== "multiselectlookup" && field.field_data_type !== "multirelation" && field.field_data_type !== "multiuserlookup" && ["Without_Any_Activity","Without_Any_Notes","Attended"].indexOf(activity_option) === -1){/* eslint-disable-line no-extra-parens */ //NO I18N
// 				value = (comparator == "${NOTBLOCKED}")? "${BLOCKED}" : comparator //no i18n
// 				comparator =(comparator == "${NOTBLOCKED}")?"not_equal" : "equal" //no i18n
// 				if(field.api_name == "lookup"){
// 					api_name = api_name+"."+header[field.lookup.module.api_name][0]
// 				}
// 				// if(field.ui_type == 133 || field.data_type == "lookup"){
// 				// 	customLookupField.push(field.display_field_label);
// 				// 	CustomLookupCount = CustomLookupCount + 1;
// 				// }
// 				var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
// 				// TODO: Surya
// 				if(value==="${BLOCKED}" && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length<=0){
// 					let blockType = api_name==='Email' ? $L('input[name=option_'+api_name+']:checked').val().split('_')[2] : $L('input[name=option_'+api_name+']:checked').val().split('_')[3];
// 						let fieldApiNameUpperCase = api_name === 'Email'? 'EMAIL' : 'ADDN_EMAIL';//no i18n
// 						if(!blockType || blockType==="both"){
// 							value = "${BLOCKED}";
// 						}else{
// 							let subOption = $L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.data.selectedValues;//no i18n
// 							let bounceCategory = subOption.byDropDownValue;
// 							let firstDropDown = subOption.firstDropDownValue;
// 							let secondDropDown = subOption.secondDropDownValue;
// 							if(firstDropDown.includes('Age in') || firstDropDown.includes('Due in')){
// 								firstDropDown = firstDropDown.replace('Days',secondDropDown);
// 								let numberComp = $L('#id_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('value');
// 								if(!numberComp){
// 									this.showFilterAlert("Enter a valid number", $L('#id_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component);//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								firstDropDown = firstDropDown.replaceAll(' ','');
// 								firstDropDown = firstDropDown.toUpperCase();
// 								firstDropDown = 'less_than {' +firstDropDown+ '}+'+numberComp;
// 							}else if(firstDropDown === 'less_than' || firstDropDown === 'greater_than'){
// 								let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
// 								if(!dateComp){
// 									this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								dateComp = this.getISODateTime(dateComp,this.datePattern)
// 								firstDropDown = firstDropDown.toUpperCase();
// 								firstDropDown = firstDropDown+' '+dateComp;
// 							}else if(firstDropDown === 'equal'){
// 								let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
// 								if(!dateComp){
// 									this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								let dateComp1 = this.getISODateTime(dateComp,this.datePattern);
// 								let dateComp2 = this.getISODateTime(dateComp,this.datePattern,"end");
// 								//firstDropDown = firstDropDown.toUpperCase();
// 								firstDropDown = "between";
// 								firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
// 							}else if(firstDropDown === 'between'){
// 								let dateComp1 = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
// 								if(!dateComp1){
// 									this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								dateComp1 = this.getISODateTime(dateComp1,this.datePattern);
// 								let dateComp2 = $L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
// 								if(!dateComp2){
// 									this.showFilterAlert("Enter a valid date",$L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
// 									return {isValdationFailure: true}
// 								}
// 								dateComp2 = this.getISODateTime(dateComp2,this.datePattern,"end")
// 								//firstDropDown = firstDropDown.toUpperCase();
// 								firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
// 							}else{
// 								firstDropDown = comparator + ' '+ firstDropDown;
// 							}
// 								value = "${BLOCKED_" +bounceCategory.toUpperCase()+'}' +' '+firstDropDown ;
// 						}
// 				}else if(value && value.includes("${BLOCKED") && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length>0){
// 					this.setEmailBlockedCriteria(field.api_name);
// 				}
// 				if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent" || field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts") ){

// 					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue;
// 				}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" || field.api_name == "cxFilter_Deal_Stage" ){ //no i18n
// 					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue;
// 				} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
// 					var cross_filter, relation_api_name;
// 					({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
// 					isAbmFieldUsed = true;
// 					this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
// 					continue;
// 				} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
// 					var cross_filter, relation_api_name;
// 					({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
// 					isAbmFieldUsed = true;
// 					this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
// 					continue;
// 				} else if(field.api_name === "cxFilter_Record_status"){//no i18n
// 					cross_filter = {include_objects :true ,relation : { api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status"},value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue;
// 				}
// 				if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
// 					api_name = "Tag";//no i18n
// 					subTagCriteria =true;
// 				}
// 				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name ,id : field.id},value : value}
// 				if(srsPrnt){
// 					this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 					tempCri1 = "";
// 					srsPrnt=undefined;
// 					seriesParentCriteria = undefined;
// 				}
// 				if(subTagCriteria){
// 					var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
// 					var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
// 					tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
// 				}
// 				if(scoreParentCriteria){
// 					this.groupScoreCriteria(scoreParentCriteria ,tempCri1,crossfilter );
// 					scoreParentCriteria = undefined;
// 				}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
// 						Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
// 				}else{
// 					Lyte.arrayUtils(group, "push", tempCri1);//No I18n
// 				}
// 				//Lyte.arrayUtils(group, "push", {comparator : comparator ,field :{ api_name : api_name,id : field.id } ,value : value});//No I18n
// 			}else if(  !this.cruxAssetsCompMapping[field.api_name] &&	(comparator == "between" || comparator == "not_between") && !(field.field_data_type == "custom" || field.field_data_type=="crossfield")){//no i18n
// 				var id1 = "#between_"+this._cruxReplace(api_name, "[/.]","_")+"_crux_comp";//no i18n
// 				var crux_comp1 = this.$node.querySelector(id1)
// 				var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
// 				if(!crux_comp.component.validate() || !crux_comp1.component.validate()){
// 					flag = false; return { isValdationFailure : true};
// 				}
// 				value = crux_comp.component.getValue();
// 				 value1 = crux_comp1.component.getValue();
// 				if(["datetime" , "date" , "date_time"].includes(field.field_data_type)){
// 					if( field.field_data_type != "date_time" ){
// 						value =  this.getISODateTime(value,this.datePattern,"start",field.field_data_type);
// 						value1 = this.getISODateTime(value1,this.datePattern,"end",field.field_data_type);
// 					}
// 					// var a = /^(.*)T/.exec(value)[1];
// 					// var b = /^(.*)T/.exec(value1)[1];
// 					// if( field.field_data_type == "date" ){
// 					// 	value = a;
// 					// 	value1 = b;
// 					// }
// 					if( value > value1 ){
// 						this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
// 						flag = false;return { isValdationFailure : true};
// 					}
// 				}else{
// 					//value = parseInt(value); value1 = parseInt(value1);
// 					// var isDecimal1 = (value.split(".")[1]) ? value.split(".")[1] : false;
// 					// var isDecimal2 = (value1.split(".")[1]) ? value1.split(".")[1] : false;
// 					// if( ( isDecimal1 && isDecimal1.length > 2 ) || ( isDecimal2 && isDecimal2.length > 2 ) ){
// 					// 	this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
// 					// 	flag = false; return { isValdationFailure : true};
// 					// }
// 					//value = Number(value);value1 = Number(value1);
// 					if(value == value1 || parseInt(value) > parseInt(value1)){
// 						this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.to1"),crux_comp); //NO I18N
// 						flag = false;return { isValdationFailure : true};
// 					}
// 				}
// 				value = [value,value1]
// 				if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent") && (module_name == "Leads" || module_name == "Contacts")){
// 					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue
// 				}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" ){ //no i18n
// 					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue
// 				} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
// 					var cross_filter, relation_api_name;
// 					({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
// 					isAbmFieldUsed = true;
// 					this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
// 					continue;
// 				}
// 				var tempBtwCrt = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
// 				// if(api_name == "cxFilter_Prediction_Score"){
// 				// 	preventSaveFilter = "prediction"; //no i18n
// 				// 	api_name ="Prediction_Score";//no i18n
// 				// }
// 				if(scoreParentCriteria){
// 					this.groupScoreCriteria(scoreParentCriteria , tempBtwCrt,crossfilter);
// 					scoreParentCriteria = undefined;
// 				}
// 				else if(seriesParentCriteria){
// 					this.groupSeriesCriteria(seriesParentCriteria,tempBtwCrt,crossfilter );
//                     tempBtwCrt = ""
// 					seriesParentCriteria = undefined;
// 				}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
// 					Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
// 					continue;
// 				}else if(field.field_data_type != "custom" && field.field_data_type != "crossfield"){//No I18n
// 					Lyte.arrayUtils(group, "push", tempBtwCrt);//No I18n
// 				}

// 			}else if(field.api_name === "cxFilter_Locked"){//NO I18N
// 				var feature_type = comparator;
// 				comparator = "equal";//No I18n
// 				var lockVal = false;
// 				if("Locked_True" === activity_option){
// 					lockVal = true;
// 					// if(feature_type === "record_locking" || feature_type === "orchestration"){
// 					// 	var cross_filter = {include_objects :true ,relation : { relation_id : moduleRecordMapping.LockingInformation.id, api_name : moduleRecordMapping.LockingInformation.api_name},criteria : {comparator:comparator ,field :{ api_name : "Feature_Type__s" },value : feature_type }} //no i18n
// 					// 	this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// }
// 				}
// 				Lyte.arrayUtils(group, "push", {comparator:comparator ,field : { api_name : "Locked__s"},value : lockVal});//No I18n
// 			}else if( field.field_data_type == "custom" || field.field_data_type == "crossfield" ){ //no i18n
// 				var val = comparator ,sub_status
// 				by = comparator
// 				if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Campaigns","cxFilter_Locked"].indexOf(field.api_name) == -1){
// 					id = '#by_'+this._cruxReplace(api_name, "[/.]","_") // no i18n
// 					var by = this.$node.querySelector(id).ltProp("selected") //no i18n
// 				}
// 				if(activity_option!="" && activity_option != "Overdue" && field.api_name!="cxFilter_Email_Sentiment" ){
// 					by = activity_option
// 					val = null
// 				}
// 				if(field.api_name == "cxFilter_RecordAction" || field.api_name == "cxFilter_RelatedRecordsAction" ){
// 					var id = "#record_"+field.api_name //no i18n
// 					sub_status = this.$node.querySelector(id).ltProp('selected') //no i18n
// 				}
// 				if(field.api_name == "cxFilter_Email_Status" && by == "sent"){
// 					var node = $L("."+field.api_name+"_selectedRadioBtn")[0];//no i18n
// 					if(!node){
// 						 flag = false;return { isValdationFailure : true};
// 					}
// 					sub_status = node.ltProp('value') //no i18n
// 				}
// 				if(field.api_name == "cxFilter_Email_Sentiment"){
// 					sub_status = (activity_option)?activity_option:"";
// 					if(sub_status == "percentage" || sub_status == "count"){
// 						if(!this.$node.querySelector("#"+sub_status+"_crux_comp").component.validate()){
// 							flag = false;return { isValdationFailure : true};
// 						}
// 					}
// 				}
// 				if(comparator == "Age in Days"){
// 					id = "#second_"+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+"_dropdown"//no i18n
// 					value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
// 					val =value1
// 					if(api_name != "cxFilter_Deals"){
// 						if(!crux_comp.component.validate()){
// 							flag = false ; return { isValdationFailure : true};
// 						}
// 						value = crux_comp.component.getValue()
// 						val = '${AGEIN'+value1+'}+'+value+'';//no i18n
// 					}
// 					comparator = "less_equal" //no i18n
// 				}else if(field.api_name != "cxFilter_Campaigns"){ //no i18n
// 					val = comparator
// 					if(comparator == "${UNTILNOW}" || comparator == "${CURRENTTIME}"){ //no i18n
// 						comparator = 'less_equal' //no i18n
// 					}else if(comparator == '${AGEINDAYS}+30' || comparator == '${AGEINDAYS}+60' || comparator == '${AGEINDAYS}+90'){ //no i18n
// 						this.specialDateObject[api_name] = { value : comparator};
// 						comparator = "less_equal" //no i18n
// 					}else if( comparator == "${DUEINDAYS}+7"){ //no i18n
// 						comparator = "less_equal" //no i18n
// 					}else if(crux_comp &&(activity_option == "Without_Any_Activity" || activity_option == "Activity_Done" || field.api_name =="cxFilter_Email_Status" || field.api_name == "cxFilter_Notes" || field.api_name == "cxFilter_Chats" || field.api_name == "cxFilter_Email_Sentiment") && !(["${TODAY}","${YESTERDAY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}","${UNTILNOW}","${TODAYANDOVERDUE}","${EMPTY}"].indexOf(comparator) != -1)){ //no i18n
// 						if(!crux_comp.component.validate()){
// 							flag = false;return { isValdationFailure : true};
// 						}
// 						val = crux_comp.component.getValue();
// 						if(comparator == "equal"){
// 							comparator = "between" //no i18n
// 							val = [this.getISODateTime(val,this.datePattern),this.getISODateTime(val,this.datePattern,"end")]
// 						}else if(comparator == "between"){ //no i18n
// 							var id1 ="#between_"+((activity_option && api_name != "cxFilter_Email_Sentiment")?activity_option:this._cruxReplace(api_name, "[/.]","_"))+"_crux_comp";//no i18n
// 							var crux_comp1 = this.$node.querySelector(id1)
// 							value1 = crux_comp1.component.getValue();
// 							if(!crux_comp1.component.validate()){
// 								//this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.display_field_label)) //no i18n
// 								flag = false;return { isValdationFailure : true};
// 							}
// 							val = this.getISODateTime(val,this.datePattern);
// 							value1 = this.getISODateTime(value1,this.datePattern,"end");
// 							// var a = /^(.*)T/.exec(val)[1];
// 							// var b = /^(.*)T/.exec(value1)[1];
// 							if( val > value1 ){
// 								this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
// 								flag = false;return { isValdationFailure : true};
// 							}
// 							val = [val,value1]
// 						}else{
// 							val = (comparator == "greater_than") ? this.getISODateTime(val,this.datePattern,"end") : this.getISODateTime(val,this.datePattern) //no i18n
// 						}
// 					}else{
// 						comparator = "equal" //no i18n
// 					}
// 				}
// 				if(field.field_data_type == "custom"){
// 					Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
// 				}else{
// 					if(field.api_name ==  "cxFilter_Campaigns"){
// 						var t = $("#option_"+field.api_name)[0];//no i18n
// 						var sub_option_sel_value = t.getData("renderItems");//no i18n
// 						 this.campaigns_sel_value = t.getData("selectedValues");//no i18n
// 						//value = this.$node.querySelector("#multiSelect_lookup_"+field.api_name).ltProp('selected') //no i18n
// 						// value = JSON.parse(sub_option_sel_value.multiSelectFieldValue);
// 						value = this.getValueBasedonKeys(sub_option_sel_value , t.getData().lookupDisplayField);
// 						if(!value.length){
// 							this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",$("#option_"+field.api_name)[0].getData().placeholderValue[0]),this.$node.querySelector("#multiSelect_lookup_"+this._cruxReplace(field.api_name, "[/.]","_"))) //no i18n
// 							flag = false;return { isValdationFailure : true};
// 						}
// 						cross_filter = {include_objects :true ,relation : { api_name : "Campaigns"}} //no i18n
// 						var member_Status = this.$node.querySelector("#memberStatusField").component.getValue();//no i18n
// 						var Obj1 = {comparator:"equal" ,field :{ api_name : "Campaign_Name" },value : value} //no i18n
// 						if(member_Status.length){
// 							var Obj2 = {comparator:"equal" ,field :{ api_name : "Member_Status" },value : member_Status} //no i18n
// 							Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
// 						}
// 						var service_Status = this.$node.querySelector("#serviceStatusField") ? this.$node.querySelector("#serviceStatusField").component.getValue() : [];//no i18n
// 						if(service_Status.length){
// 							var Obj2 = {comparator:"equal" ,field :{ api_name : "Service_Status" },value : service_Status} //no i18n
// 							Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
// 						}
// 						cross_filter.criteria = Obj1;
// 						this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 						//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 						continue;
// 					}
// 					cross_filter = this.specialfield(field,by,val,comparator,sub_status);
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
// 				}
// 			} else if(field.ui_type == 53) {
// 				if(!crux_comp.component.validate()){
// 					flag = false ;return { isValdationFailure : true};
// 				}
// 				var t = $("#option_"+field.api_name)[0];	//NO I18N
// 				this.pf_timeToReach_value = t.getData("selectedValues");	//NO I18N
// 				value = crux_comp.component.getValue();
// 				id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
// 				value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
// 				if (field.cxGetValueInMS === false) {
// 					value = '${'+"AGEIN"+value1+'}+'+value+'';	//NO I18N
// 				} else {
// 					value = this.getMilliSecondsfromDuration(value, value1);
// 				}
// 				if (field.api_name === "time_to_reach__s") {
// 					preventSaveFilter = "PathFinder";	//NO I18N
// 				}
// 				Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
// 			} else if(!this.cruxAssetsCompMapping[field.api_name] && (field.field_data_type == "date" || field.field_data_type == "datetime" ||  field.field_data_type == "date_time") ){ //no i18n
// 				if(comparator.indexOf("${") != -1){
// 					value = comparator;comparator = "equal"; //no i18n
// 				}else{
// 					if(!crux_comp.component.validate()){
// 						flag = false ;return { isValdationFailure : true};
// 					}
// 					value = crux_comp.component.getValue();
// 					if(comparator == "Due in Days" || comparator == "Age in Days"){
// 						var str="";
// 						id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
// 						value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
// 						if(comparator == "Due in Days"){
// 							str = "DUEIN"//no i18n
// 						}
// 						if(comparator == "Age in Days"){
// 							str = "AGEIN"//no i18n
// 						}
// 						str = '${'+str+value1+'}+'+value+'';
// 						comparator = 'less_equal'; value = str; //no i18n
// 					}else{
// 						if(comparator == "equal"  && field.field_data_type == "datetime"){
// 							comparator = "between" ;//no i18n
// 							value = [this.getISODateTime(value,this.datePattern),this.getISODateTime(value,this.datePattern,"end")]
// 						}else if( field.field_data_type !== "date_time" ){
// 							var time = comparator == "greater_than" ? "end" : "start" ;
// 							value = this.getISODateTime(value,this.datePattern,time,field.field_data_type)
// 						}
// 						// else if(comparator == "greater_than"){ //no i18n
// 						// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern,"end") : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
// 						// }else{
// 						// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern) : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
// 						// }
// 					}
// 				}
// 				if( field.api_name == "cxFilter_Deal_Closing_Date" || ( field.api_name == "Visited_Time" && (module_name == "Leads" || module_name == "Contacts") )){
// 					var cross_filter
// 					if(field.api_name != "cxFilter_Deal_Closing_Date"){
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
// 					}else{
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
// 					}
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue
// 				}
// 				if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){
// 					Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
// 					continue;
// 				}
// 				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
// 				if(srsPrnt){
// 					this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 					srsPrnt=undefined;
// 					seriesParentCriteria = undefined;
// 					tempCri1 = "";

// 				}else{
// 				Lyte.arrayUtils(group, "push", tempCri1);//No I18n
// 				}
// 			}
// 			else if( !this.cruxAssetsCompMapping[field.api_name] &&( field.field_data_type == "num" || field.field_data_type == "currency" || field.field_data_type == "bigint" || field.field_data_type == "integer" || field.field_data_type == "longinteger" || field.field_data_type =="double" || field.field_data_type =="decimal"  ) ){
// 				value = crux_comp.component.getValue();
// 				var isDecimal = (value.split(".")[1]) ? value.split(".")[1] : false, 
// 					abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
// 					abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [];
// 				if( (field.data_type == "autonumber" || field.data_type == "bigint") && isDecimal){
// 					this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
// 					flag = false ; return { isValdationFailure : true};
// 				}
// 				if(!crux_comp.component.validate() ){
// 					flag = false ; return { isValdationFailure : true};
// 				}
// 				//value = Number(value);
// 				if( field.api_name == "cxFilter_Deal_Amount" || (field.api_name == "Time_Spent" && (module_name == "Leads" || module_name == "Contacts") )){
// 					var cross_filter
// 					if(field.api_name != "cxFilter_Deal_Amount"){
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
// 					}else{
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
// 					}
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 					continue
// 				} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
// 					var cross_filter, relation_api_name;
// 					({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
// 					isAbmFieldUsed = true;
// 					this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
// 					continue;
// 				}
// 				preventSaveFilter = (abmAccountFields.includes(field.api_name.replace('cxFilter_', '')) ? 'abm' : false); //no i18n
// 				var crtTemp = {comparator:comparator ,field :{ api_name : preventSaveFilter == "prediction" ? "Prediction_Score" : api_name,id : field.id },value : value}; //No I18n
// 				if(scoreParentCriteria){
// 					this.groupScoreCriteria(scoreParentCriteria,crtTemp,crossfilter);
// 					scoreParentCriteria = undefined;
// 				}else if(seriesParentCriteria){
// 					var tempCri1 = {comparator:comparator ,field :{ api_name : api_name},value : value}
// 					this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 					srsPrnt=undefined;
// 					seriesParentCriteria = undefined;

// 				}
// 				else {
// 					Lyte.arrayUtils(group, "push", crtTemp);//No I18n
// 				}

// 			}
// 			else if(["textarea","text","multiselectpicklist","phone","email","mobile","website","picklist","lookup","autonumber","tag","layout"].indexOf(field.field_data_type) !== -1 || this.cruxAssetsCompMapping[field.api_name]){
// 				if(comparator.indexOf("${") != -1){
// 					value = comparator;comparator = "equal"; //no i18n
// 				}else{
// 					if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.cxPropModule)!= -1 ){
// 						value = "${Calls.Call Status."+comparator+"}"//no i18n
// 						Lyte.arrayUtils(group, "push", {comparator:"equal" ,field :{ api_name : api_name,id : field.id },value :value });//No I18n
// 						continue
// 					}
// 					if(!crux_comp.component.validate()){
// 						flag = false;return { isValdationFailure : true};
// 					}
// 					// if(field.ui_type == 133 || field.data_type == "lookup"){
// 					// 	customLookupField.push(field.display_field_label);
// 					// 	CustomLookupCount = CustomLookupCount + 1;
// 					// }
// 					// if(field.field_data_type == "multiselectpicklist"){
// 					// 	value = crux_comp.querySelector("input").value;//No I18n
// 					// }
// 					// else{
// 						value = crux_comp.component.getValue();
// 						if(field.column_name == "ACTIVITYTYPE"){
// 							value = crux_comp.component.getValue("actual_value");//no i18n
// 						}
// 						// if(value.constructor == String && value.indexOf(",")!= -1 ){
// 						// 	value = this.SplitWord(value);
// 						// }
// 					// }
// 					// if(!this.checkLimitValues(value,"text")){
// 					// 	flag = false;return { isValdationFailure : true};
// 					// }
// 				}
// 				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name},value : value}
// 				if(srsPrnt){
// 					this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 					srsPrnt=undefined;
// 					seriesParentCriteria = undefined;

// 				}

// 				var checkbox = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];//no i18n
// 				if(field.field_data_type == "picklist" && field.history_tracking &&checkbox && checkbox.checked && comparator == "equal"){
// 					var comp =this.$node.querySelector('#DDV1_'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklistTracker').ltProp('selected');//no i18n
// 					var daysNode = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_historyTrackDurationDays')[0];//no i18n
// 					//daysNode.setData("cxPropErrorMessage" , )
// 					if(!daysNode.component.validate()){
// 						flag = false;return { isValdationFailure : true};
// 					}
// 					var days = daysNode.component.getValue();
// 					days = "${AGEINDAYS}+"+days+""; //no i18n
// 					var relation_details =this.getData('module_info').related_lists[ this.getIndex(this.getData('module_info').related_lists,'picklist_tracker','action',true) ] //no i18n
// 					//var relation_details = field.history_tracking.module;
// 					var Obj1 = {field : {api_name : 'Modified_Time'},comparator : comp,value : days} // no i18n
// 					var Obj2 = {field : {api_name : field.history_tracking.duration_configured_field.api_name} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
// 					// if( field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")  ){
// 					// 	Obj2 = {field : {api_name : 'Stage_Duration_Calendar_Days'} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
// 					// }
// 					var temp = this.construct_group(Obj1,Obj2,"AND"); //no i18n

// 					//moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields.filterBy({custom_field : false,data_type : "picklist"})[0].api_name
// 					if(field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")){
// 						Obj1 = {field : {api_name : 'Stage'} ,comparator : comparator,value : value} //no i18n
// 					}else{
// 						Obj1 = {field : {api_name : this.get_pick_track_enable_field(moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields,field)} ,comparator : comparator,value : value} //no i18n
// 					}

// 					cross_filter = {include_objects :true ,relation : { api_name :relation_details.api_name },criteria : this.construct_group(temp,Obj1,"AND")};//no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", {include_objects :true ,relation : { api_name :relation_details.api_name },criteria : this.construct_group(temp,Obj1,"AND")}) //no i18n
// 				}
// 				if(field.api_name == "cxFilter_Record_status"){
// 					cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status" },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 				}else if(field.field_data_type == "lookup" && !( this.data.cxPropModule == "Activities"&& ["CONTACTID","SEID"].indexOf(field.column_name)!= -1) ){// field.column_name !=  "CONTACTID" removed for contact lookup in salesorder module //no i18n
// 					if( field.ui_type == 132 ){
// 						var selectedId = subfield.getData().selectedValues.secondDropDownValue;
// 						var mod = store.peekRecord("module",selectedId);//no i18n
// 						Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"->"+mod.api_name+"."+( ( header[mod.module_name] && header[mod.module_name].length) ? header[mod.module_name][0] : "Name" )},value : value});//No I18n
// 					}else{
// 						var mod = idModuleMapping[field.lookup.module.id];
// 						Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" )},value : value});//No I18n
// 					}
// 				}else if( field.api_name == "cxFilter_Deal_Stage" || (( field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts")  ) ){ //no i18n
// 					var cross_filter
// 					if(field.api_name != "cxFilter_Deal_Stage"){
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : 'Visits_Zoho_Livedesk'},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
// 					}else{
// 						cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
// 					}
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 				} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
// 					var cross_filter, relation_api_name;
// 					({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
// 					isAbmFieldUsed = true;
// 					this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
// 				} else{
// 					subTagCriteria =false;
// 					if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
// 						api_name = "Tag";//no i18n
// 						subTagCriteria = true;
// 					}
// 					else if(api_name == "Status" && this.isZBCustomModule(this.getData("cxPropModule")) && value && field.pick_list_values){
// 						value = this.getDisplayValue(value, field);
// 					}
// 					var tempCri1 = {comparator:comparator ,field :{ api_name : api_name ,id : field.id},value : value}
// 					if(srsPrnt){
// 						this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 						srsPrnt=undefined;
// 						seriesParentCriteria = undefined;
// 				    }
// 				    if(srsField === "cxFilter_Series"){
// 					    tempCri1 = "";
// 				     }
// 					if(subTagCriteria){
// 						var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
// 						var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
// 						tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
// 					}else if(field.api_name == "Data_Processing_Basis"){//no i18n
// 						tempCri1.field.api_name = "Data_Processing_Basis_Details.Data_Processing_Basis";//no i18n
// 					}
					
// 					if(field.api_name !== "cxFilter_Competitor_Alert"){
// 						if((srsField && srsField !== "cxFilter_Series") || !srsField){
// 							Lyte.arrayUtils(group, "push", tempCri1);//No I18n
// 						}
// 					}
// 					// Lyte.arrayUtils(group, "push", tempCri1);//No I18n
// 				}
// 			}else if(field.field_data_type == "ownerlookup" || field.field_data_type == "userlookup"){ //no i18n
// 				if(!crux_comp.component.validate()){
// 					flag = false;return { isValdationFailure : true};
// 				}
// 				value = crux_comp.component.getValue();
// 				// if(!this.checkLimitValues(value,"text")){
// 				// 	flag = false;return { isValdationFailure : true};
// 				// }
// 				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name},value : value}
// 				if(srsPrnt){
// 					this.groupSeriesCriteria(seriesParentCriteria,tempCri1,crossfilter );
// 					srsPrnt=undefined;
// 					seriesParentCriteria = undefined;
// 				}
// 				var roleOrGroup = '';
// 				if(['equal_role','equal_group'].indexOf(comparator) > -1){
// 					roleOrGroup = comparator.indexOf('role') > -1 ? 'role' : 'group'; //For Group, api_name need not to be changes as per doc
// 					comparator = 'equal';
// 				}else if(comparator == 'not_equal_role'){ // not equal support is not there for groups
// 					roleOrGroup = 'role';
// 					comparator = 'not_equal';
// 				}
// 				if(roleOrGroup === 'group'){
// 					//For Groups, inner relation based cross fitler is being applied
// 					var cross_filter = {include_objects : true};
// 					var relatedListDetails = Crm.groupUserRelDetails.listRelation;
// 				    cross_filter.relation = {type : 'field' , api_name : field.api_name};
// 				    cross_filter.relation.relation = {type : 'related_list', api_name : relatedListDetails.api_name};
				        
// 				    var grpUserFldDetails = Crm.groupUserRelDetails.field ;
// 				    cross_filter.criteria = {comparator : comparator, field : { api_name : grpUserFldDetails.api_name , id : grpUserFldDetails.id} , value : value};
// 				    //doubtFull of multiple apiname based grps
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no i18n
				    
// 				}else if(roleOrGroup === 'role'){
// 						var roleField = Crm.userRoleField;
// 						Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+'.role' ,id : roleField.id },value : value});//No I18n
// 				}
// 				//This case need to be validated. Cross of crossfields
// 				if(field.api_name == "cxFilter_Deal_Owner"){
// 					var cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : roleOrGroup == 'role' ? field.name+'.role' : field.name,id : field.id },value : value}} //no i18n
// 					this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 					// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 				}
// 				else if(field.api_name === 'Enrolled_By__s'){
// 					seriesParentCriteria = undefined; 
// 				} 
// 				 else if(!roleOrGroup && field.api_name !== 'Enrolled_By__s'){
// 					Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
// 				}
// 			}else if(field.field_data_type == "boolean"){ //no i18n
// 				value = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp')[0].component.getValue() //no i18n
// 				Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
// 			}else if(field.field_data_type == "multiselectlookup" || field.field_data_type == "multiuserlookup"){ //no i18n
// 				// var modInfo = moduleRecordMapping[idModuleMapping[field[field.field_data_type].linking_module.id]],
// 				var include_objects = true
// 				value = comparator
// 				if(comparator.indexOf("${") == -1){
// 					if(field.ui_type == 445 || field.field_data_type == "multiuserlookup"){
// 						if(!crux_comp.component.validate()){
// 							flag = false;return { isValdationFailure : true};
// 						}
// 						value = crux_comp.component.getValue()
// 					}else{
// 						var option_id = '#option_'+this._cruxReplace(field.api_name, "[/.]","_"); //No I18n
// 					    option_id = this.data.cxPropChildModuleFields ? option_id+"_"+field.id+"_"+this.data.cxPropChildModuleRelation : option_id; //No I18n
// 						var t = this.$node.querySelector(option_id);//no i18n
// 						value = t.getData().renderItems //no i18n
// 						// value = JSON.parse(value)
// 						if(!value.length){
// 							this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp) //no i18n
// 							flag = false;return { isValdationFailure : true};
// 						}
// 						value = this.getValueBasedonKeys(value,t.getData().lookupDisplayField);
// 					}
// 				}else {
// 					include_objects = comparator == "${EMPTY}" ? false : true;//no i18n
// 					if( comparator == "${NOTEMPTY}" ){
// 						value = "${EMPTY}" //no i18n
// 					}
// 					comparator = "not_equal";//no i18n

// 				}
// 				//comparator = (field.data_type == "multiuserlookup") ? comparator :  "equal" //no i18n
// 				//var relation_details =this.getData('module_info').related_lists[this.getIndex(this.getData('module_info').related_lists,modInfo.module_name,'linkingmodule',true)] //no i18n
// 				//var link_field = this.findLinkingField(field,modInfo.fields)
// 				var cross_filter = {include_objects :include_objects ,relation : { api_name : field[field.field_data_type].api_name},criteria : {comparator:comparator ,field :{ api_name : field[field.field_data_type].connectedlookup_apiname,id : field.id },value : value }} //no i18n
// 				this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
// 				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
// 			} else if(field.field_data_type === "multirelation" && field.api_name === "cxFilter_Linked_Segment__s") {
// 				var cross_filter,
// 					cruxNode,
// 					isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
// 					include_objects = true,
// 					value = comparator,
// 					relation = {
// 						type: 'related_list', // NO I18N
// 						api_name: "ABM_Accounts", // NO I18N
// 						relation: {
// 							api_name: 'ABM_Account_Segment__s' // NO I18N
// 						}
// 					};
// 					/*
// 					 relation = {
// 					 	type: 'related_list',
// 					 	api_name: 'ABM_Account_Segment1'
// 					 }; */

// 				if (!isAccountModule) {
// 					relation = {
// 						type: 'field', // NO I18N
// 						api_name: commonInfo.abmModuleInfo.account_name.api_name, // NO I18N,
// 						relation: {
// 							api_name: 'ABM_Account_Segment1' // NO I18N
// 						}
// 					};
// 				}
				
// 				isAbmFieldUsed = true;
				
// 				if(comparator.indexOf("${") === -1) {
// 					cruxNode = this.$node.querySelector("#option_" + this._cruxReplace(field.api_name, "[/.]","_")); // NO I18N
// 					value = cruxNode.getData().renderItems;
					
// 					if(!value.length){
// 						this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check", field.field_label), crux_comp); // NO I18N
// 						flag = false;
						
// 						return {
// 							isValdationFailure: true
// 						};
// 					}
					
// 					value = this.getValueBasedonKeys(value, cruxNode.getData().lookupDisplayField);
// 				} else {
// 					include_objects = !(comparator === "${EMPTY}"); // NO I18N
					
// 					if(comparator === "${NOTEMPTY}") {
// 						value = "${EMPTY}"; // NO I18N
// 					}
					
// 					comparator = "not_equal"; // NO I18N
// 				}

// 				cross_filter = {
// 					include_objects: include_objects,
// 					relation: relation,
// 					criteria: {
// 						comparator: comparator,
// 						field: {
// 							api_name: "Linked_Segment__s" // NO I18N
// 						},
// 						value: value
// 					}
// 				};

// 				this.updateCrossFilter(crossfilter, isAccountModule ? relation.api_name : relation.relation.api_name, cross_filter);
// 			} 
// 		}
// 		if(flag){
// 			var  criteria,filter_criteria = []
// 			criteria = group
// 			if(custom_filter.length != 0 || criteria.length !=0){
// 				Lyte.arrayUtils(custom_filter, "push", criteria);//No I18n
// 				custom_filter.reverse()
// 				filter_criteria =(custom_filter.length == 1)?custom_filter[0] : {group_operator : "AND", group : custom_filter} //no i18n
// 			}
// 			if(filter_criteria.length != 0){
// 				queryParams.filters = filter_criteria
// 			}
// 			if(crossfilter.length !=0){
// 				crossfilter.reverse()
// 				queryParams.cross_filters = crossfilter
// 			}
			
// 			if(isAbmFieldUsed) {
// 				preventSaveFilter = "abm"; // NO I18N
// 			}
			
// 			return { queryParams : queryParams, preventSaveFilter : preventSaveFilter}
// 		}
// 		return

// 	},
	groupScoreCriteria : function(scoreParentCriteria ,crtTemp, crossfilter ){
		var crossCrt = this.construct_group(scoreParentCriteria,crtTemp,"AND"); //No I18n
		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping["Entity Scores"].id ,api_name : this.moduleRecordMapping["Entity Scores"].api_name},criteria : crossCrt }
		this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
	},
	groupSeriesCriteria : function(srsParentCriteria,crossCrt, crossfilter ){
		//var crossCrt
		var mod = crmListView.getObject().module;
		var realtedDetails = this.getData('module_info').related_lists;
		var crossCrt = this.construct_group(srsParentCriteria,crossCrt,"AND"); //No I18n
        var len = realtedDetails.length
        for(var i = 0; i< len ;i++){
	         if(realtedDetails[i].personality_name === 'SERIESPERSONALITY'){
		       		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping.Entity_Cadences.id ,api_name : realtedDetails[i].api_name},criteria : crossCrt }
		            this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
		            break;
	          }
         }
	},


	VisitsFieldHandling : function(field){
		if(!field.api_name){
			field = field.criteria;
			field.type =this.allfieldType[field.field.api_name];
			field.api_name =  field.field.api_name;delete field.field;
		}
		this.findField(field)
		this.setFieldCriteria(field)
	},
	otherCrossFieldHandling : function(field){
		if(!field.api_name){
			field.api_name = field.field.api_name;
		}
		field.type = this.allfieldType[field.api_name];
		this.findField( field); //no i18n
		this.setFieldCriteria(field);
	},
	checkDynamicFilter : function(criteria){
		let fld ;
		if( this.cruxAssets && this.cruxAssets.checkIsDynamicFilterCriteria){
			fld = this.cruxAssets.checkIsDynamicFilterCriteria(criteria);
		}
		return fld ? fld : false;
	},
	construct_rec_crossFilter : function(criteria , include_objects){
		var group = criteria ? criteria.group : []
		let field = this.checkDynamicFilter(criteria , include_objects);
		field = field ? field : this.isCross_field(criteria , include_objects);
		
		if(field && field.isVisits){
			this.VisitsFieldHandling(field);//no i1in
		}else if(field){
			this.otherCrossFieldHandling(field);//no i18n
		}else if(criteria.field && ["multiuserlookup","multiselectlookup"].indexOf(this.allfieldType[criteria.field.api_name])!= -1){
			criteria.field = this.data.allFields.filter(function(item){return item.api_name == criteria.field.api_name})[0]
			this.otherCrossFieldHandling(criteria);//no i18n
		}else if( group && group.length ) {
			this.construct_rec_crossFilter(group[0] , include_objects);//no i18n
			if(group[1]){
				this.construct_rec_crossFilter(group[1] , include_objects);//no i18n
			}
		}
	},
	construct_crossFilter : function(group){
		var i=0,len = group.length,field
		for(i=0;i<len;i++){
			if(this.data.supportRelatedModules && this.data.cxPropChildModules.length > 0 &&  this.data.cxPropChildModules.contains(group[i].relation.api_name)){
				this.construct_crossFilter_new(group[i]);
			} else {
				field = this.isCross_field(group[i])
				if(field && field.isVisits){
					this.VisitsFieldHandling(field);//no i1in
				}else if(field && field.api_name == "Duration_Days"){//no i18n
					this.setFieldCriteria(field);//no i18n
				}else if(field ){
					this.otherCrossFieldHandling(field);
				}else if( group[i].relation && group[i].relation.api_name ){
					var relationDetail = this.getRelationDetails(this.getData("module_info").module_name,group[i].relation.api_name) //no i18n
					var flag = false;
					if(relationDetail && !field){
						field = group[i].criteria
						var fieldInfo = this.getMulSelLookUpField(this.getData("module_info").module_name,relationDetail)//no i18n
						if(fieldInfo&& !group[i].criteria.group){
							flag = true;
							field.api_name = fieldInfo.api_name
							field.field = fieldInfo;
							// allFields = this.getData('allFields')//no i18n
							// swapField = true
							field.origCriteria = group[i];
							this.otherCrossFieldHandling(field);
						}
					}
					if(group[i].criteria && group[i].criteria.group && !flag){
						this.construct_rec_crossFilter(group[i].criteria , group[i].include_objects);//no i18n
					}
				}
		    }
		}
	},
	
	construct_crossFilter_new : function(crossFilter){
		 var _self = this;
	     var field = {};
	     field.api_name = crossFilter.relation.api_name;
	     _self.findField(field);
	     var fieldNode = $L('#field_'+_self._cruxReplace(field.api_name, "[/.]","_"))[0]; //No I18n
	     fieldNode.ltProp('checked',true);//no i18n
	     var smartInputNode = $L("#option_"+field.api_name)[0].component;
	     var includeObjects = crossFilter.include_objects;
	     var value = includeObjects ? "with" : "without" ; //No I18n
	     smartInputNode.setData("selectedValues" , {"value" : value}); //No I18n
	     var queryParams = {"filters" : crossFilter.criteria};
		 $L("#customFilter_"+field.api_name)[0].component.setCriteria(queryParams);
	},
	
	construct_filter : function(criteria){
		var group = criteria.group
		delete this.preventTouchedfield;
		var is_Custom_field = this.isCustomField(criteria)
		if(is_Custom_field !=false){
			var Obj = is_Custom_field;
			Obj.type = 'custom'; //no i18n
			this.findField(Obj) ;
			this.setFieldCriteria(Obj);
		}else if(criteria.group==undefined){
			criteria.api_name = criteria.field.api_name; //no i18n
			criteria.id = criteria.field.id;
			delete criteria.field;
			// if(criteria.api_name == "Prediction_Score" && ((this.data.cxPropCurrentUserDetails.isLeadPredictionEnabled && this.data.cxPropModule == "Leads") || (this.data.cxPropCurrentUserDetails.isDealPredictionEnabled && this.data.cxPropModule == "Potentials"))){
			// 	criteria = this.getPredictionField(criteria)
			// 	this.findField(criteria) ;
			// 	this.setFieldCriteria(criteria)
			// }else{
				if(this.isWebsiteActivityField(criteria) && this.data.displayVisitField.length){
					// this.enableMoreVisitFun()
					this.findField(criteria)
				}else{
					this.findField(criteria);
				}
				this.setFieldCriteria(criteria)
				return
			// }
		}else{
			this.renderField(group[0])
			if(group[1]){
				this.renderField(group[1])
			}
		}
	},
	renderField : function(fieldCriteria){
		var field , is_Custom_field = false;
		if( fieldCriteria && fieldCriteria.field ){
			if(fieldCriteria.field.api_name == "LAST_SENT_TIME" || fieldCriteria.field.api_name == "Locked__s") {
				if( fieldCriteria.field.api_name == "LAST_SENT_TIME" ){
					delete this.preventTouchedfield;
				}
				var is_Custom_field = this.isCustomField(fieldCriteria);
			}
			if(fieldCriteria.from === "NBX" && fieldCriteria.field.api_name === "Stage"){
				return;
			}
		}

		if(!is_Custom_field && fieldCriteria.group_operator == undefined){
			field = JSON.parse(JSON.stringify(fieldCriteria))
			field.api_name = field.field.api_name;
			field.id = field.field.id;
			delete field.field
			// if(field.api_name == "Prediction_Score"){
			// 	field = this.getPredictionField(field)
			// 	this.findField(field)
			// 	this.setFieldCriteria(field)
			// }else{
				if(this.getFieldType(field.api_name) == "customField"){
					delete this.preventTouchedfield;
					field = this.isCustomField(fieldCriteria)
					field.type = 'custom'
					this.findField(field)
				}else{
					if(this.isWebsiteActivityField(field)&& this.data.displayVisitField.length){
						// this.enableMoreVisitFun()
						this.findField(field)
					}else{
						this.findField(field) ;
					}
				}
				this.setFieldCriteria(field)
			// }
		}else if(fieldCriteria){
			this.construct_filter(fieldCriteria)
		}
	},
	isCross_field : function(Obj , include_objects){
		var criteria = (Obj.relation) ? Obj.criteria : Obj //no i18n
		var criteriaObj1,criteriaObj2,
			commonInfo = this.getData('cxPropCommonInfo'), // NO I18N
			abmTechniqueFieldList = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
			abmScoreFieldList = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
		if(criteria.group_operator && criteria.group_operator.toUpperCase().trim() == "AND" && criteria.group[0] && criteria.group[1]){
			criteriaObj1 = criteria.group[0],criteriaObj2 = criteria.group[1]
			if(criteriaObj1.field && criteriaObj2.field){
				criteriaObj1.field.api_name = criteriaObj1.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteriaObj1.field.api_name.split(".")[1] : criteriaObj1.field.api_name;
				criteriaObj2.field.api_name = criteriaObj2.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteriaObj2.field.api_name.split(".")[1] : criteriaObj2.field.api_name;

				if(criteriaObj1.field.api_name == "Campaign_Name" && criteriaObj2.field.api_name == "Service_Status" ){//no i18n
					return { api_name :"cxFilter_Campaigns" ,comparator : criteriaObj1.comparator,value : criteriaObj1.value,Service_Status : criteriaObj2.value} //no i18n
				}else if(criteriaObj1.field.api_name == "Campaign_Name" && criteriaObj2.field.api_name == "Member_Status"){//no i18n
					return { api_name :"cxFilter_Campaigns" ,comparator : criteriaObj1.comparator,value : criteriaObj1.value,Member_Status : criteriaObj2.value} //no i18n
				}if(criteriaObj1.field.api_name == "Member_Status" && criteriaObj2.field.api_name == "Campaign_Name"){//no i18n
					return { api_name :"cxFilter_Campaigns" ,comparator : criteriaObj2.comparator,value : criteriaObj2.value,Member_Status : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "Positive" && criteriaObj2.field.api_name == "Negative"){ //no i18n
					if(criteriaObj1.comparator == criteriaObj2.comparator && criteriaObj1.value == criteriaObj2.value){
						return { api_name :"cxFilter_Email_Sentiment" ,status : "PositiveAndNegative",comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
					}else{ //no i18n
						return { api_name :"cxFilter_Email_Sentiment" ,status : "PositiveOnly",comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
					}
				}else if(criteriaObj1.field.api_name == "Negative" && criteriaObj2.field.api_name == "Positive"){//no i18n
					return { api_name :"cxFilter_Email_Sentiment" ,status : "NegativeOnly",comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "Received_Date" && criteriaObj2.field.api_name == "Positive"){ //no i18n
					return { api_name : "cxFilter_Email_Sentiment",status : "Positive",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : criteriaObj2.value,subfieldComp : criteriaObj2.comparator } //no i18n
				}else if( criteriaObj1.field.api_name == "Received_Date" && criteriaObj2.field.api_name == "Negative"){ //no i18n
					return { api_name : "cxFilter_Email_Sentiment",status : "Negative",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : criteriaObj2.value,subfieldComp : criteriaObj2.comparator} //no i18n
				}else if( criteriaObj1.field.api_name == "Received_Date" && criteriaObj2.field.api_name == "Neutral"){ //no i18n
					return { api_name : "cxFilter_Email_Sentiment",status : "Neutral",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : criteriaObj2.value,subfieldComp : criteriaObj2.comparator} //no i18n
				}else if( criteriaObj1.field.api_name == "Received_Date" && criteriaObj2.field.api_name == "Last_Email_Sentiment"){ //no i18n
					var status =(criteriaObj2.value.length == 2)? "PositiveOrNegative" : criteriaObj2.value //no i18n
					return { api_name : "cxFilter_Email_Sentiment",status : status,comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : "Last_Email_Sentiment"} //no i18n
				}else if( criteriaObj1.field.api_name == "Modified_Time" && ( criteriaObj2.field.api_name == "Duration_Days" || criteriaObj2.field.api_name  == "Stage_Duration_Calendar_Days" || criteriaObj2.field.api_name  == "Duration_Time" ) ){ //no i18n
					return {api_name : "Duration_Days", comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "Action_Type" && criteriaObj2.field.api_name == "Action_Performed_Time"){ //no i18n
					if(criteriaObj1.value == "Missed Chat"){
						return {isVisits : true ,type : "crossfield",api_name  : 'cxFilter_Chats',subfield : 'Missed',comparator : criteriaObj2.comparator,value :criteriaObj2.value } //no i18n
					}
					return {isVisits : true ,type : "crossfield",api_name  : 'cxFilter_Chats',subfield : 'Attended',comparator : criteriaObj2.comparator,value :criteriaObj2.value } //no i18n
				}else if( criteriaObj1.field.api_name == "Stage" && criteriaObj2.field.api_name == "Created_Time"){ //no i18n
					if(Obj.include_objects == true || include_objects){
						return {api_name : "cxFilter_Deals",subfield : 'With_Open_Deal',comparator : 'equal',value :criteriaObj2.value } //no i18n
					}
					return {api_name : 'cxFilter_Deals',subfield : 'Without_Open_Deal',comparator : 'equal',value :criteriaObj2.value } //no i18n
				}else if( criteriaObj1.field.api_name == "Activity_Status__s" && criteriaObj2.field.api_name == "Activity_Due_Date__s"){ //no i18n
					if(criteriaObj2.value == "${TODAYANDOVERDUE}"){
						return {api_name : 'cxFilter_Activities',subfield : 'Activity_Due',comparator : '${TODAYANDOVERDUE}'} //no i18n
					}
					return {api_name : 'cxFilter_Activities',subfield : 'Overdue',comparator : 'Tasks'} //no i18n
				}else if( criteriaObj1.field.api_name == "Activity_Status__s" && criteriaObj2.field.api_name == "Activity_Start_DateTime__s"){ //no i18n
					return {api_name : 'cxFilter_Activities',subfield : 'Overdue',comparator : 'Calls'} //no i18n
				}else if (criteriaObj1.field.api_name == "Activity_Status__s" && (criteriaObj1.value==="Overdue" || criteriaObj1.value==="${PICKLIST.Overdue}") && (criteriaObj2.field.api_name === "Activity_Type" && criteriaObj2.value==="Appointments")){ //no i18n
					return {api_name : 'cxFilter_Activities',subfield : 'Overdue',comparator : 'Appointments'} //no i18n
				}else if(criteriaObj1.field.api_name == "Activity_Status__s" && criteriaObj2.field.api_name == "Activity_Status__s"){ //no i18n
					return {api_name : 'cxFilter_Activities',subfield : '',comparator : 'withoutopen'} //no i18n
				}else if( criteriaObj1.field.api_name == "Last_Modified_Time" && ( criteriaObj2.field.api_name == "Duration_Days" || criteriaObj2.field.api_name  == "Stage_Duration_Calendar_Days" || criteriaObj2.field.api_name  == "Duration_Time" ) ){ //no i18n
					return {api_name : 'Duration_Days' , comparator : criteriaObj1.comparator , value : criteriaObj1.value} //no i18n
				}else if(criteriaObj1.field.api_name ==  "Activity_Status__s" && (criteriaObj2.field.api_name == "Activity_Type" && criteriaObj2.value==="Calls")){//no i18n
					return { api_name : 'cxFilter_Activities' , subfield : 'withoutopen_call'}//no i18n
				}else if(criteriaObj1.field.api_name ==  "Activity_Status__s" && (criteriaObj2.field.api_name == "Activity_Type" && criteriaObj2.value==="Tasks")){//no i18n
					return { api_name : 'cxFilter_Activities' , subfield : 'withoutopen_task'}//no i18n
				}else if(criteriaObj1.field.api_name ==  "Activity_End_DateTime__s" && (criteriaObj2.field.api_name == "Activity_Type" && criteriaObj2.value==="Events")){//no i18n
					return { api_name : 'cxFilter_Activities' , subfield : 'withoutopen_event' ,comparator : criteriaObj1.comparator, value : criteriaObj1.value}//no i18n
				}else if(criteriaObj1.field.api_name ==  "Activity_Status__s" && (criteriaObj2.field.api_name == "Activity_Type" && criteriaObj2.value==="Appointments")){
					return { api_name : 'cxFilter_Activities' , subfield : 'withoutopen_appointments'}//no i18n
				}
				else if(criteriaObj1.field.api_name == "Item_Id__s"){ //no i18n
					var byRecommendation = {
						"first_buy_whom" : "FirstTime" , //no i18n
						"cross_selling_whom" : "Dependent" , //no i18n
						"bundle_whom" : "Bundle", //no i18n
						"re_buy_whom" : "Repeat", //no i18n
						"next_buy_whom" : "Sequence" //no i18n
					};
					return {api_name : 'Recommendation', field : byRecommendation[Obj.relation.api_name] ,comparator : criteriaObj1.comparator === "not_equal" ? 'all' : 'selected' , value : criteriaObj1.value ,  value1 : criteriaObj2.value  }; //no i18n
				}else if(criteriaObj1.field.api_name == "Activity_Closed_Time__s" && criteriaObj2.field.api_name == "Activity_Type"){ //no i18n
					return {api_name : "Activity_Done", comparator : "ClosedTime" } //no i18n
				}else if(Obj.relation && Obj.relation.api_name === "Entity_Scores__s"){ //no i18n
					return { api_name : 'cxFilter_Scoring_Rule',comparator : criteriaObj1.comparator,value : criteriaObj1.value, subfield : criteriaObj2.field.api_name , subfieldComp : criteriaObj2.comparator , subfieldValue :  criteriaObj2.value };//NO i18N
				}
				else if(Obj.relation && Obj.relation.api_name === "Thresholds__s"){ //no i18n
					return { api_name : 'cxFilter_UnallocatedRecords',comparator : criteriaObj1.comparator,value : criteriaObj1.value };//NO i18N
				}
				else if(criteriaObj1.field.api_name == "Cadencesid__s"){//no i18n
			
					return { api_name : 'cxFilter_Series',comparator : criteriaObj1.comparator,value : criteriaObj1.value, subfield : criteriaObj2.field.api_name , subfieldComp : criteriaObj2.comparator , subfieldValue :  criteriaObj2.value };//NO i18N
				}
				else if(!this.data.cxPropCurrentUserDetails.NBX_GOAL && ((criteriaObj1.field.api_name === "NBA_duration" && criteriaObj2.field.api_name === "NBA_duration")||
						(criteriaObj1.field.api_name.startsWith("NBX_") && criteriaObj1.field.api_name.endsWith("_Duration") && criteriaObj2.field.api_name.startsWith("NBX_") && criteriaObj2.field.api_name.endsWith("_Duration")) ||
						(criteriaObj1.field.api_name === "Action_Due_By" && criteriaObj2.field.api_name === "Action_Due_By"))){	//var activities = criteriaObj1.field.api_name === "NBA" ? criteriaObj1.value : criteriaObj2.value ;
					var duration =  criteriaObj1.value.toString().includes("$") ? criteriaObj1.value : criteriaObj2.value ;
					return {api_name : "next_best_experience" , field : 'NBX', comparator : 'Available' , val2 : duration};
				}
				
			}else{
				var Obj1 = this.isCross_field(criteriaObj1)//no i18n
				if(Obj1.api_name == "Duration_Days"){
					this.picklist_trackingObj = Obj1
					return Obj1
				}else if(Obj1.subfield == "Overdue" && criteriaObj2.field.api_name == "Activity_Type"){//no i18n
					return Obj1//no i18n
				}else if(Obj1.subfield == "Activity_Due" && criteriaObj2.field.api_name == "Activity_Type"){//no i18n
					return Obj1//no i18n
				}else if( Obj1.api_name == "cxFilter_Campaigns" && criteriaObj2.field.api_name == "Service_Status"){//no i18n
					Obj1.Service_Status = criteriaObj2.value;
					return Obj1;
				}
				// else if(Obj1.comparator == "withoutopen" && criteriaObj2.field && criteriaObj2.field.api_name == "End_DateTime"){//no i18n
				// 	return {api_name : 'Activities',subfield : 'Without_Open_Activity',comparator : ''} //no i18n
				// }

				var Obj2 = this.isCross_field(criteriaObj2)
				if(criteriaObj1.field){
					criteriaObj1.field.api_name = criteriaObj1.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteriaObj1.field.api_name.split(".")[1] : criteriaObj1.field.api_name;
					if(criteriaObj1.field.api_name == "Received_Date" && Obj2.status =="PositiveOrNegative"){
						return { api_name : "cxFilter_Email_Sentiment" ,status :"PositiveOrNegative",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : Obj2.value,subfieldComp : Obj2.comparator} //no i18n
					}else if(criteriaObj1.field.api_name == "Received_Date" && Obj2.status =="PositiveAndNegative"){ //no i18n
						return { api_name : "cxFilter_Email_Sentiment" ,status :"PositiveAndNegative",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : Obj2.value,subfieldComp : Obj2.comparator} //no i18n
					}else if(criteriaObj1.field.api_name == "Received_Date" && Obj2.status =="NegativeOnly"){ //no i18n
						return { api_name : "cxFilter_Email_Sentiment" ,status :"NegativeOnly",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : Obj2.value,subfieldComp : Obj2.comparator} //no i18n
					}else if(criteriaObj1.field.api_name == "Received_Date" && Obj2.status =="PositiveOnly"){ //no i18n
						return { api_name : "cxFilter_Email_Sentiment" ,status :"PositiveOnly",comparator : criteriaObj1.comparator,value : criteriaObj1.value,subfield : Obj2.value,subfieldComp : Obj2.comparator} //no i18n
					}else if((criteriaObj1.field.api_name === "NBA" || (criteriaObj1.field.api_name.startsWith( "NBX_") && criteriaObj1.field.api_name.includes("_Medium"))) && Obj1.field && Obj2.field && Obj1.field === "NBX" && Obj2.field === "NBX"){
						return  {api_name : "next_best_experience" , field : 'NBX', comparator : 'Available' ,val1 : Obj1.val1 , val2 : Obj2.val2};
					}
				}

			}
		}else if(criteria.group_operator && criteria.group_operator.toUpperCase().trim() == "OR"  && criteria.group[0] && criteria.group[1]){ //no i18n
			criteriaObj1 = criteria.group[0],criteriaObj2 = criteria.group[1]
			if(criteriaObj1.field && criteriaObj2.field){
				criteriaObj1.field.api_name = criteriaObj1.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteriaObj1.field.api_name.split(".")[1] : criteriaObj1.field.api_name;
				criteriaObj2.field.api_name = criteriaObj2.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteriaObj2.field.api_name.split(".")[1] : criteriaObj2.field.api_name;
				if( criteriaObj1.field.api_name == "Positive" && criteriaObj2.field.api_name == "Negative"){
					return { api_name : "cxFilter_Email_Sentiment" ,status :"PositiveOrNegative",comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				}
			}
			var Obj1 = this.isCross_field(criteriaObj1)

			var Obj2 = this.isCross_field(criteriaObj2)
			if(Obj1.comparator == "Tasks" && Obj2.comparator == "Calls"||(Obj1.comparator === "Activities" && Obj2.comparator === "Appointments")){
				return {api_name : 'cxFilter_Activities',subfield : 'Overdue',comparator : 'Activities'} //no i18n
			}else if(Obj1.comparator === "ClosedTime" && Obj2.comparator === "Calls"){ //no i18n
				return {api_name : 'cxFilter_Activities',subfield : 'Activity_Done',comparator : 'ClosedTime'} //no i18n
			}else if(Obj1.subfield == "withoutopen_call" && Obj2.subfield == "withoutopen_task"){//no i18n
				return {api_name : "Activity" , subfield : "withoutopen_call_task"}//no i18n
			}else if(Obj1.subfield =="withoutopen_call_task" && Obj2.subfield == "withoutopen_event"){//no i18n				
				return {api_name : 'cxFilter_Activities',subfield : 'Without_Open_Activity',comparator : ''} //no i18n
			}else if((Obj1.comparator === 'Activities' && Obj2.subfield === "withoutopen_event") || Obj1.comparator ==="${TODAYANDOVERDUE}" || (!Obj1 && (Obj2.subfield==="withoutopen_event"&&(Obj2.value==="${DUEINDAYS}+7"||Obj2.value==="${TOMORROW}"||Obj2.value==="${TODAY}")))	){ //no i18n
				if(Obj1.comparator ==="${TODAYANDOVERDUE}"){ //no i18n
					return Obj1;
				}
				return {api_name : 'cxFilter_Activities',subfield : 'Activity_Due',comparator : Obj2.value} //no i18n
			}else if(Obj1.comparator == "ClosedTime" && Obj2.subfield == "withoutopen_event"){ //no i18n
				return {api_name : 'cxFilter_Activities',subfield : 'Activity_Done',comparator : Obj2.comparator,value : Obj2.value} //no i18n
			}else if(Obj1.subfield==='Without_Open_Activity' && Obj2.subfield==='withoutopen_appointments'){
				return {api_name : 'cxFilter_Activities',subfield : 'Without_Open_Activity',comparator : ''} //No I18N
			}

		}else if(!criteria.group || !criteria.group_operator){ //no i18n
			criteria.field.api_name = criteria.field && criteria.field.api_name.indexOf("Email_Sentiment.") !== -1 ? criteria.field.api_name.split(".")[1] : criteria.field.api_name;
			if(criteria.field.api_name == "Item_Id__s" ){ //no i18n
				var apiName = Obj.relation.api_name;
				var byRecommendation = {
					"first_buy_whom" : "FirstTime" , //no i18n
					"cross_selling_whom" : "Dependent" , //no i18n
					"bundle_whom" : "Bundle", //no i18n
					"re_buy_whom" : "Repeat", //no i18n
					"next_buy_whom" : "Sequence" //no i18n
				};

				return {api_name : 'Recommendation', field : byRecommendation[apiName] ,comparator : criteria.comparator === "not_equal" ? 'all' : 'selected' , value : criteria.value  }; //no i18n
			}
			else if(criteria.field.api_name === "Similar_User__s"){
				if(criteria.comparator !== "equal") {
					return {
						api_name: 'Similarity',//no i18n
						field: 'Similarity',//no i18n
						comparator: Obj.include_objects === true ? 'Available' : 'NotAvailable',//no i18n
						value: ''
					};
				}
				return {api_name : 'Similarity' , field: 'Records', comparator: criteria.comparator, value: criteria.value}; //no i18n
			} else if(criteria.field.api_name === "Similar_Score__s"){
				return {api_name : 'Similarity' , field: 'Score', comparator: criteria.comparator, value: criteria.value}; //no i18n
			}
			else if(criteria.field.api_name === "Best_Time_Category"){ // Best Time to Contact 
				return {api_name : "best_time", value: criteria.value};
			}
			else if((criteria.field.api_name === "NBA" || (criteria.field.api_name.startsWith( "NBX_") && criteria.field.api_name.includes("_Medium"))) && criteria.value === "${EMPTY}"){
				return {api_name : "next_best_experience" , field : 'NBX', comparator : 'NotAvailable'};
			}
			else if((criteria.field.api_name === "NBA" || (criteria.field.api_name.startsWith( "NBX_") && criteria.field.api_name.includes("_Medium"))) && criteria.value !== "${EMPTY}"){
				var obj = this.data.cxPropCurrentUserDetails.NBX_GOAL ? {api_name : "next_best_experience" , field : 'NBX', comparator : 'Available'} : {api_name : "next_best_experience" , field : 'NBX', comparator : 'Available',val1 : criteria.value};
				return obj;
			}
			else if(criteria.field.api_name.toUpperCase().endsWith("ISEND") || criteria.field.api_name.toUpperCase().endsWith("ACCURACY") || criteria.field.api_name.toUpperCase().endsWith("TREND")){
			 		return {api_name : "Prediction",criteria : criteria};//No I18n
			}
			else if(criteria.field.api_name == "Modified_Time"){ //no i18n
				return {api_name : 'cxFilter_Activities',subfield : 'Without_Any_Activity',comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "Created_Time" ){ //no i18n
				if(Obj.include_objects ==true){
					return {api_name : 'cxFilter_Notes',subfield : 'Notes_Added',comparator : criteria.comparator,value : criteria.value} //no i18n
				}
				return {api_name : 'cxFilter_Notes',subfield : 'Without_Any_Notes',comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "Deal_Name"){ //no i18n
				return {api_name : 'cxFilter_Deals',subfield : 'Without_Any_Deal',comparator : '',value : ''} //no i18n
			}else if(criteria.field.api_name == "Amount"){ //no i18n
				return {api_name : "cxFilter_Deal_Amount",comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "Owner"){ //no i18n
				return {api_name : 'cxFilter_Deal_Owner',comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "GroupRel__s" && Obj.relation && Obj.relation.api_name){ //no i18n
				return {api_name : Obj.relation.api_name,comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "Closing_Date"){//no i18n
				return {api_name : 'cxFilter_Deal_Closing_Date',comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "Stage"){//no i18n
				return {api_name : 'cxFilter_Deal_Stage',comparator : criteria.comparator,value : criteria.value} //no i18n
			} else if(criteria.field.api_name === "Linked_Segment__s") { // NO I18N
				 
				if(criteria.value !== '${EMPTY}') {
					criteria.value.forEach((cri) => {
						cri.Segment_Name__s = cri.name;
					});
				}
				
				return {
					api_name: 'cxFilter_Linked_Segment__s', // NO I18N
					comparator : criteria.comparator,
					value : criteria.value
				};
			} else if (abmTechniqueFieldList.includes(criteria.field.api_name) || abmScoreFieldList.includes(criteria.field.api_name)) {
				return {
					api_name: 'cxFilter_' + criteria.field.api_name, //no i18n
					comparator: criteria.comparator,
					value: criteria.value
				};

			}else if(this.isWebsiteActivityField(criteria.field) && this.data.displayVisitField.length) { //no i18n
				// this.enableMoreVisitFun()
				return {isVisits : true , criteria : criteria}
			}else if(criteria.field.api_name ==  "Campaign_Name"){ //no i18n
				return {api_name : 'cxFilter_Campaigns',comparator : criteria.comparator,value : criteria.value} //no i18n
			}else if(criteria.field.api_name ==  "Full_Name"){ //no i18n
				if(Obj.include_objects){
					return {api_name : 'cxFilter_Contacts',subfield : "With_Contact"} //no i18n
				}else{
					return {api_name : 'cxFilter_Contacts',subfield : "Without_Any_Contact"} //no i18n
				}
			}else if(criteria.field.api_name == "Received_Date" || criteria.field.api_name === "Record_status"){ //no i18n
				criteria.field.api_name = criteria.field.api_name == "Record_status" ? "cxFilter_Record_status" : criteria.field.api_name;//no i18n
				return criteria;
			}else if(Obj.relation && Obj.relation.api_name === "Entity_Scores__s"){//no i18n
				return { api_name : 'cxFilter_Scoring_Rule',comparator : undefined,value : undefined, subfield : criteria.field.api_name , subfieldComp : criteria.comparator , subfieldValue :  criteria.value };//NO i18N
			}
			else if(Obj.relation && Obj.relation.api_name === "Locking_Information__s" && criteria.field.api_name ==  "Feature_Type__s"){//NO I18N
				this.data.locked_crossfield = true;
				return {api_name : 'cxFilter_Locked',subfield : 'Locked_True',comparator : criteria.value} //no i18n
			}
			else if(criteria.field.api_name === "crmcompetitormentions_positive_competitors__s" ||criteria.field.api_name === "crmcompetitormentions_negative_competitors__s" || criteria.field.api_name === "crmcompetitormentions_neutral_competitors__s" || criteria.field.api_name === "crmcompetitormentions_seid__s"){
				return {api_name : 'cxFilter_Competitor_Alert',comparator: criteria.comparator, value: criteria.value}
			}
			else if(criteria.field.api_name === "crmcompetitormentions_channel__s"){
				return {api_name: 'Competitor_Channel',comparator: criteria.comparator,value: criteria.value}
			}
			else if(criteria.field.api_name === "crmcompetitormentions_created_time_s"){
				return {api_name: 'Competitor_Duration', comparator: criteria.comparator,value: criteria.value}
			}
			else if(Obj.relation && Obj.relation.api_name === "Thresholds__s"){//no i18n
				return { api_name : 'cxFilter_UnallocatedRecords',comparator : criteria.comparator,value : criteria.value};//NO i18N
			}
			else if(Obj.relation && Obj.relation.api_name === "Entity_Cadences__s"){//no i18n
				return { api_name : 'cxFilter_Series',comparator : undefined,value : undefined, subfield : criteria.field.api_name , subfieldComp : criteria.comparator , subfieldValue :  criteria.value };//NO i18N
			}
			else{ // Don't change return false
				return false
			}
		}
		return false
	},
	isCustomField : function(criteria){
		var field=""
		var value = '';
		var criteriaObj1,criteriaObj2
		if(criteria.group_operator && criteria.group[0].field ){
			criteriaObj1 = criteria.group[0],criteriaObj2 = criteria.group[1]
			if(criteriaObj1.field.api_name == "LAST_SENT_TIME" || criteriaObj1.field.api_name == "LAST_ACTION_TIME" ){
				field = {api_name : "cxFilter_Email_Status",status : '',subfield :'',comparator :criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				if(criteriaObj2.group_operator && criteriaObj2.group_operator.toUpperCase() == "AND"){
					criteriaObj1 = criteriaObj2.group[0],criteriaObj2 = criteriaObj2.group[1]
					if(criteriaObj1.field.api_name == "LAST_SENT_TIME" || criteriaObj1.field.api_name == "LAST_ACTION"){//no i18n
						field.status = "sent";field.subfield = "not_opened";field.value = criteriaObj1.value;field.comparator = criteriaObj1.comparator//no i18n
						return field
					}
				}else if(criteriaObj2.group_operator && criteriaObj2.group_operator.toUpperCase() == "OR"){//no i18n
					criteriaObj1 = criteriaObj2.group[0],criteriaObj2 = criteriaObj2.group[1]
					value = (criteriaObj2.value!=undefined)? criteriaObj2.value.toString():''
					if(criteriaObj1.field.api_name == "LAST_ACTION_TIME" || criteriaObj1.field.api_name == "LAST_ACTION"){
						if(value.sort().toString() == ["Opened","Clicked","Responded","Bounced"].sort().toString()){//no i18n
							field.status = "not_opened";field.value = criteriaObj1.value;field.comparator = criteriaObj1.comparator //no i18n
							return field
						}
					}
				}
				if( criteriaObj1.value == "${EMPTY}" &&  criteriaObj2.value == "${EMPTY}"){
					field.status = "not_sent";field.comparator=criteriaObj1.value;//no i18n
					return field;
				}
				if(criteriaObj1.field.api_name == "LAST_SENT_TIME" &&  /equal|not_equal/.test(criteriaObj2.comparator)){
					field.status = 'sent' //no i18n
				}
				value = (criteriaObj2.value!=undefined)? criteriaObj2.value:[];//no i18n
				value = typeof value  === "string" ? value.split(",") : value; //no i18n
				if(criteriaObj2.field.api_name == "LAST_ACTION"){
					if(value.sort().toString() == ["Sent"].sort().toString() ){
						field.status = (field.status == '')?'sent':field.status;
						field.subfield = (field.status == 'sent')?'sent':'' //no i18n
					}
					else if((this.data.cxPropCurrentUserDetails && this.data.cxPropCurrentUserDetails.emailTrackingOption && this.data.cxPropCurrentUserDetails.emailTrackingOption === 'entprofoff' && (this.data.cxPropCurrentUserDetails.emailTrackingOption!=='entprofon' && this.data.cxPropCurrentUserDetails.emailTrackingOption!=='stdon')) && field.status && field.status === 'sent' && (value.sort().toString() == ["Bounced"].sort().toString() || value == "Bounced")){//no i18n
						field.status = (field.status == '' || field.status === 'sent')?'sent_bounced':field.status;
						//field.subfield = (field.status == 'sent')?'sent_bounced':'' //no i18n
					}
					else if(value.sort().toString() == ["Responded"].sort().toString() ){
						field.status = (field.status == '')?'responded':field.status;
						field.subfield = (field.status == 'sent')?'responded':'' //no i18n
					}
					else if(value.sort().toString() === ["Replied"].sort().toString() ){
						field.status = (field.status === '')?'replied':field.status;
						field.subfield = (field.status === 'sent')?'replied':''; //no i18n
					}
					else if(value.sort().toString() == ["Clicked"].sort().toString() ){
						field.status = (field.status == '')?'clicked':field.status;
						field.subfield = (field.status == 'sent')?'clicked':'' //no i18n
					}
					else if(value.sort().toString() == ["Opened","Clicked","Responded"].sort().toString() ){
						field.status = (field.status == '')?'opened':field.status;
						field.subfield = (field.status == 'sent')?'opened':'' //no i18n
					}else if(value.sort().toString() == ["Opened","Clicked","Responded","Bounced"].sort().toString() ){//no i18n
						field.status = (field.status == '')?'not_opened':field.status;
						field.subfield = (field.status == 'sent')?'not_opened':'' //no i18n
					}else if(value.sort().toString() == ["Bounced"].sort().toString() || value == "Bounced"){//no i18n
						field.status = (field.status == '')?'bounced':field.status;
						field.subfield = (field.status == 'sent')?'bounced':'' //no i18n
					}else if(value.sort().toString() == ["Opened","Clicked"].sort().toString()){//no i18n
						field.status = (field.status == '')?'opened_and_not_replied':field.status;
						field.subfield = (field.status == 'sent')?'opened_and_not_replied':'' //no i18n
					}else if(value.sort().toString() == ["Received","Responded"].sort().toString() && criteriaObj2.comparator == "equal"){//no i18n
						field.status = 'received' //no i18n
					}else if(criteriaObj2.value.sort().toString() == ["Received","Responded"].sort().toString() && criteriaObj2.comparator == "not_equal"){//no i18n
						field.status = 'not_received' //no i18n
					}else if(value.sort().toString() == ["Opened","Clicked","Sent","Replied","Bounced","Responded"].sort().toString()){//no i18n
						field.status = 'not_sent' //no i18n
					}
					return field
				}
			}
			if(criteriaObj2.field && criteriaObj1.field.api_name == "message_time__s" && criteriaObj2.field.api_name == "conversation_status__s") {
				field = {};
				field.value = criteriaObj1.value;
				field.comparator = criteriaObj1.comparator;
				if(criteriaObj2.value == "Replied") {
					if(criteriaObj2.comparator == "equal") {
						field.api_name = "cxFilter_Replied_Messages";//no i18n
					} else {
						field.api_name = "cxFilter_Not_Replied_Messages";//no i18n
					}
				} else {
					field.api_name = "cxFilter_Replied_Messages";//no i18n
				}
				return field;
			}
		}
		if(criteria.group_operator && criteria.group_operator.toUpperCase().trim() == "AND" && criteria.group[0] && criteria.group[1]){
			criteriaObj1 = criteria.group[0],criteriaObj2 = criteria.group[1]
			if(criteriaObj1.field && criteriaObj2.field){
				if( criteriaObj1.field.api_name == "Tag" && criteriaObj2.field.api_name == "Activity_Type" && this.getData("module_info").module_name == "Activities"  ){//no i18n
					if( this.getData("module_info").custom_view.activity_view ){
						return {api_name : "Tag",subfield : criteriaObj2.value,comparator : criteriaObj1.comparator,value :criteriaObj1.value};//no i18n
					}else if( this.getData("module_info").custom_view.event_view ||  this.getData("module_info").custom_view.calls_view || this.getData("module_info").custom_view.task_view ){//no i18n
						return {api_name : criteriaObj2.value+"_Tag",comparator : criteriaObj1.comparator,value :criteriaObj1.value};//no i18n
					}
				}else if( criteriaObj1.field.api_name == "LAST_SENT_TIME" || criteriaObj1.field.api_name == "LAST_ACTION_TIME" ){//no i18n
					field = {api_name : "cxFilter_Email_Status",status : '',subfield :'',comparator :criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
					if(criteriaObj1.field.api_name == "LAST_SENT_TIME"){
						field.status = 'sent' //no i18n
					}
					var value = (criteriaObj2.value!=undefined)? criteriaObj2.value:[];//no i18n
					if(criteriaObj2.field.api_name == "LAST_ACTION"){
						if(value.sort().toString() == ["Sent"].sort().toString() ){
							field.status = (field.status == '')?'sent':field.status;
							field.subfield = (field.status == 'sent')?'sent':'' //no i18n
						}
						else if((this.data.cxPropCurrentUserDetails && this.data.cxPropCurrentUserDetails.emailTrackingOption && this.data.cxPropCurrentUserDetails.emailTrackingOption === 'entprofoff' && (this.data.cxPropCurrentUserDetails.emailTrackingOption!=='entprofon' && this.data.cxPropCurrentUserDetails.emailTrackingOption!=='stdon')) && field.status && field.status === 'sent' && (value.sort().toString() == ["Bounced"].sort().toString() || value == "Bounced")){//no i18n
							field.status = (field.status == '' || field.status === 'sent')?'sent_bounced':field.status;
							//field.subfield = (field.status == 'sent')?'sent_bounced':'' //no i18n
						}
						else if(value.sort().toString() == ["Responded"].sort().toString() ){
							field.status = (field.status == '')?'responded':field.status;
							field.subfield = (field.status == 'sent')?'responded':'' //no i18n
						}
						else if(value.sort().toString() === ["Replied"].sort().toString() ){
							field.status = (field.status === '')?'replied':field.status;
							field.subfield = (field.status === 'sent')?'replied':''; //no i18n
						}
						else if(value.sort().toString() == ["Clicked"].sort().toString() ){
							field.status = (field.status == '')?'clicked':field.status;
							field.subfield = (field.status == 'sent')?'clicked':'' //no i18n
						}
						else if(value.sort().toString() == ["Opened","Clicked","Responded"].sort().toString() ){
							field.status = (field.status == '')?'opened':field.status;
							field.subfield = (field.status == 'sent')?'opened':'' //no i18n
						}else if(value.sort().toString() == ["Opened","Clicked","Responded","Bounced"].sort().toString() ){//no i18n
							field.status = (field.status == '')?'not_opened':field.status;
							field.subfield = (field.status == 'sent')?'not_opened':'' //no i18n
						}else if(value == "Bounced" || value.sort().toString() == ["Bounced"].sort().toString()){//no i18n
							field.status = (field.status == '')?'bounced':field.status;
							field.subfield = (field.status == 'sent')?'bounced':'' //no i18n
						}else if(value.sort().toString() == ["Opened","Clicked"].sort().toString()){//no i18n
							field.status = (field.status == '')?'opened_and_not_replied':field.status;
							field.subfield = (field.status == 'sent')?'opened_and_not_replied':'' //no i18n
						}else if(value.sort().toString() == ["Received","Responded"].sort().toString() && criteriaObj2.comparator == "equal"){//no i18n
							field.status = 'received' //no i18n
						}else if(criteriaObj2.value.sort().toString() == ["Received","Responded"].sort().toString() && criteriaObj2.comparator == "not_equal"){//no i18n
							field.status = 'not_received' //no i18n
						}else if(value.sort().toString() == ["Opened","Clicked","Sent","Replied","Bounced","Responded"].sort().toString()){//no i18n
							field.status = 'not_sent' //no i18n
						}
						return field
					}
				}else if(criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "System_Modified_Time"){ //no i18n
					if(criteriaObj2.comparator == "greater_than" || criteriaObj2.comparator == "not_equal"){
						return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'OnlyByUser',value : criteriaObj1.value} //no i18n
					}else if(criteriaObj1.comparator == "greater_than" || criteriaObj1.comparator == "not_equal"){//no i18n
						return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'OnlyBySystem',value : criteriaObj1.value} //no i18n
					}
					return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'UserAndSystem',value : criteriaObj1.value} //no i18n
				}else if(criteriaObj1.field.api_name == "System_Modified_Time" && criteriaObj2.field.api_name == "User_Modified_Time"){ //no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'OnlyBySystem',value : criteriaObj1.value} //no i18n
				}else if(criteriaObj1.field.api_name == "User_Related_Activity_Time" && criteriaObj2.field.api_name == "System_Related_Activity_Time"){//no i18n
					if(criteriaObj2.comparator == "greater_than" || criteriaObj2.comparator == "not_equal"){
						return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'OnlyByUser',value : criteriaObj1.value} //no i18n
					}else if(criteriaObj1.comparator == "greater_than" || criteriaObj1.comparator == "not_equal"){//no i18n
						return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'OnlyBySystem',value : criteriaObj1.value} //no i18n
					}
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'UserAndSystem',value : criteriaObj1.value} //no i18n
				}else if(criteriaObj1.field.api_name == "System_Related_Activity_Time" && criteriaObj2.field.api_name == "User_Related_Activity_Time"){//no i18n
						return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'OnlyBySystem',value : criteriaObj1.value} //no i18n
				}
				else if(criteriaObj1.field.api_name == "System_Modified_Time" && criteriaObj2.field.api_name == "System_Related_Activity_Time"){ //no i18n
					return {api_name : '',comparator : 'Only',value : ''} //no i18n //no i18n
				}else if(criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "User_Related_Activity_Time" ){ //no i18n
					return {api_name : '',comparator : 'Only',value : ''}  //no i18n
				}
				else if(criteriaObj1.from === "Prediction" || criteriaObj2.from === "Prediction"){
				 	if(criteriaObj1.from === "Prediction" && criteriaObj2.from === "Prediction"){
				 		return {api_name : "Prediction", criteria : criteriaObj1 , criteria1 : criteriaObj2}; //no i18n
				 	}
				 	else if(criteriaObj1.from === "Prediction"){
		 				this.renderField(criteriaObj2);
		 				return this.isCustomField(criteriaObj1);
		 			}
		 			else if(criteriaObj2.from === "Prediction"){
		 				this.renderField(criteriaObj1);
		 				return this.isCustomField(criteriaObj2);
		 			}
				}
				if(criteriaObj1.field.api_name == "message_time__s" && criteriaObj2.field.api_name == "conversation_status__s") {//no i18n
					field.comparator = criteriaObj2.comparator;
					if(criteriaObj2.value == "Replied") {
						if(criteriaObj2.comparator == "equal") {
							field.value = criteriaObj2.value;
							field.api_name = "cxFilter_Replied_Messages";//no i18n
						} else {
							field.value = criteriaObj2.value;
							field.api_name = "cxFilter_Not_Replied_Messages";//no i18n
						}
					} else {
						field.value = criteriaObj2.value;
						field.api_name = "cxFilter_Replied_Messages";//no i18n
					}
					return field;
				}
			}else{
				var Obj1 = this.isCustomField(criteriaObj1)
				if(Obj1.api_name === "Prediction"){
					this.construct_filter(criteriaObj2);
					return Obj1;
				}
				if(Obj1 == false || this.preventTouchedfield){
					// delete this.preventTouchedfield;
					return false
				}
				if(criteriaObj2.field){
					if(Obj1.isModified == "Not Modified" && Obj1.comparator == "User" && criteriaObj2.field.api_name =="System_Modified_Time"){ //no i18n
						return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
					}else if(Obj1.isModified == "Not Modified" && Obj1.comparator == "System"  && criteriaObj2.field.api_name =="User_Modified_Time"){ //no i18n
						return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
					}else if(Obj1.isModified == "Not Done" && Obj1.comparator == "User" &&  criteriaObj2.field.api_name =="System_Related_Activity_Time"){ //no i18n
						return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
					}else if(Obj1.isModified == "Not Done" && Obj1.comparator == "System"  && criteriaObj2.field.api_name =="User_Related_Activity_Time"){//no i18n
						return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
					}else if(Obj1.api_name == "cxFilter_Email_Status" && (Obj1.status == "not_opened" || Obj1.status == "sent") && criteriaObj2.field.api_name == "LAST_SENT_TIME"){//no i18n
						return {api_name : "cxFilter_Email_Status",status : Obj1.status,subfield : Obj1.subfield ,comparator :Obj1.comparator,value : Obj1.value} //no i18n
					}else if(Obj1.api_name == "cxFilter_TouchedRecords" &&( criteriaObj2.field.api_name == "User_Modified_Time" || criteriaObj2.field.api_name == "System_Modified_Time") ){//no i18n
						this.preventTouchedfield = true;
						return Obj1;
					}
				}
				var Obj2 = this.isCustomField(criteriaObj2)

				if( Obj2.api_name == "cxFilter_TouchedRecords" && Obj2.value == "${EMPTY}"){
					this.preventTouchedfield = true;
					return Obj1;
				}
				if(Obj2.api_name === "Prediction"){
					this.construct_filter(criteriaObj1);
					return Obj2;
				}
				if(Obj2 == false || this.preventTouchedfield){
					// delete this.preventTouchedfield;
					return false
				}if(Obj1.api_name == "cxFilter_UnTouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_UnTouchedRecords" && Obj2.comparator == "System"){//no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'UserAndSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified" && Obj1.comparator == "User" && Obj2.isModified == "Not Done" && Obj2.comparator == "User"){ //no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'User',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified" && Obj1.comparator == "System" && Obj2.isModified == "Not Done" &&  Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'System',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_UnTouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_TouchedRecords" && Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_UnTouchedRecords" && Obj1.comparator == "System" && Obj2.api_name == "cxFilter_TouchedRecords" && Obj2.comparator == "User"){ //no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "User" && Obj2.comparator == "Only" ){ //no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "System" && Obj2.comparator == "Only"){ //no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_TouchedRecords" && Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'UserAndSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified" && Obj1.comparator == "User" && Obj2.isModified == "Not Modified" &&  Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'UserAndSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Done" && Obj1.comparator == "User" &&Obj2.isModified == "Not Done" &&  Obj2.comparator == "System"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'UserAndSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Done"&& Obj1.comparator == "User" && Obj2.isModified == "Done" &&  Obj2.comparator == "System"){ //no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Done"&& Obj1.comparator == "System" && Obj2.isModified == "Done" &&  Obj2.comparator == "User"){ //no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified"&& Obj1.comparator == "User" && Obj2.isModified == "Modified" &&  Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified"&& Obj1.comparator == "System" && Obj2.isModified == "Modified" &&  Obj2.comparator == "User"){ //no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_UnTouchedRecords"){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "System" && Obj2.api_name == "cxFilter_UnTouchedRecords"){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_RecordAction" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_RecordAction" && Obj2.isModified == "Not Modified"){//no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_RecordAction" && Obj1.comparator == "System" && Obj2.api_name == "cxFilter_RecordAction" && Obj2.isModified == "Not Modified"){//no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_RelatedRecordsAction" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_RelatedRecordsAction" && Obj2.isModified == "Not Done"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'OnlyByUser',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_RelatedRecordsAction" && Obj1.comparator == "System" && Obj2.api_name == "cxFilter_RelatedRecordsAction" && Obj2.isModified == "Not Done"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'OnlyBySystem',value : Obj1.value} //no i18n
				}
				{
					return false
				}
			}
		}else if(criteria.group_operator && criteria.group_operator.trim() == "OR"  && criteria.group[0] && criteria.group[1]){ //no i18n
			criteriaObj1 = criteria.group[0],criteriaObj2 = criteria.group[1]
			if(criteriaObj1.field && criteriaObj2.field){
				if( criteriaObj1.field.api_name == "LAST_SENT_TIME" && criteriaObj2.field.api_name == "LAST_ACTION"){//no i18n
					var value = (criteriaObj2.value != undefined)? criteriaObj2.value.toString():''
					field = {api_name : "cxFilter_Email_Status",status : '',subfield :'',comparator :criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
					if(value.sort().toString() == ["Opened","Clicked","Sent","Replied","Bounced","Responded"].sort().toString()){ //no i18n
							field.status = 'not_sent' //no i18n
					}
				}else if(criteriaObj1.field.api_name == "Last_Activity_Time" && criteriaObj2.field.api_name == "System_Modified_Time"){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'UserOrSystem',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "Last_Activity_Time" && criteriaObj2.field.api_name == "Last_Activity_Time"){//no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'UserAndSystem',value : criteriaObj1.value} //no i18n
				}else if(  criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "System_Modified_Time"){//no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'UserOrSystem',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "User_Related_Activity_Time" && criteriaObj2.field.api_name == "System_Related_Activity_Time"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Done',comparator : 'UserOrSystem',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "User_Related_Activity_Time" ){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'User',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "System_Modified_Time" && criteriaObj2.field.api_name == "System_Related_Activity_Time"){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'System',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "User_Modified_Time"){//no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'User',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "System_Modified_Time" && criteriaObj2.field.api_name == "System_Modified_Time"){//no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'System',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "User_Related_Activity_Time" && criteriaObj2.field.api_name == "User_Related_Activity_Time"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'User',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "System_Related_Activity_Time" && criteriaObj2.field.api_name == "System_Related_Activity_Time"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'System',value : criteriaObj1.value} //no i18n
				}else if( criteriaObj1.field.api_name == "User_Modified_Time" && criteriaObj2.field.api_name == "User_Modified_Time"){//no i18n
					return {api_name : '',isModified : 'greater_only',comparator : ''} //no i18n
				}else if(criteriaObj1.field.api_name == "LAST_SENT_TIME" && criteriaObj2.field.api_name == "LAST_SENT_TIME" && criteriaObj2.value == "${EMPTY}"){//no i18n
					return {api_name : "LAST_SENT_TIME", comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				}else if(criteriaObj1.field.api_name == "LAST_ACTION_TIME" && criteriaObj2.field.api_name == "LAST_ACTION_TIME" && criteriaObj2.value == "${EMPTY}"){//no i18n
					return {api_name : "LAST_ACTION_TIME", comparator : criteriaObj1.comparator,value : criteriaObj1.value} //no i18n
				}
				else if(criteriaObj1.from === "Prediction" || criteriaObj2.from === "Prediction"){
				 	if(criteriaObj1.from === "Prediction" && criteriaObj2.from === "Prediction"){
				 		return {api_name : "Prediction", criteria : criteriaObj1 , criteria1 : criteriaObj2}; //no i18n
				 	}
				 	else if(criteriaObj2.from === "Prediction"){
		 				this.renderField(criteriaObj1);
		 				return this.isCustomField(criteriaObj2);
		 			}
				 	else if(criteriaObj1.from === "Prediction"){
		 				this.renderField(criteriaObj2);
		 				return this.isCustomField(criteriaObj1);
		 			}
				}
			}else{
				var Obj1 = this.isCustomField(criteriaObj1)
				if(Obj1 == false || this.preventTouchedfield){
					// delete this.preventTouchedfield;
					return false
				}
				if(Obj1.api_name === "Prediction"){
					this.construct_filter(criteriaObj1);
					return Obj1;
				}
				if(Obj1.api_name == "LAST_SENT_TIME" && criteriaObj2.field.api_name == "LAST_ACTION" && criteriaObj2.value.sort().toString() == ["Opened","Clicked","Sent","Replied","Bounced","Responded"].sort().toString() ){
					return {api_name : "cxFilter_Email_Status",status : 'not_sent',subfield :'',comparator :Obj1.comparator,value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "LAST_ACTION_TIME" && criteriaObj2.field.api_name == "LAST_ACTION" ){//no i18n
					if( criteriaObj2.value.sort().toString() == ["Opened","Clicked","Responded","Bounced"].sort().toString() ){//no i18n
						return {api_name : "cxFilter_Email_Status",status : 'not_opened',subfield :'',comparator :Obj1.comparator,value : Obj1.value} //no i18n
					}else if(criteriaObj2.value.sort().toString() == ["Received","Responded"].sort().toString()){//no i18n
						return {api_name : "cxFilter_Email_Status",status : 'not_received',subfield :'',comparator :Obj1.comparator,value : Obj1.value} //no i18n
					}

				}else if(Obj1.api_name == "cxFilter_Email_Status" && (Obj1.status == "not_opened" || Obj1.status == "sent") && criteriaObj2.field.api_name == "LAST_SENT_TIME"){//no i18n
					return {api_name : "cxFilter_Email_Status",status : Obj1.status,subfield : Obj1.subfield ,comparator :Obj1.comparator,value : Obj1.value} //no i18n
				}
				var Obj2 = this.isCustomField(criteriaObj2)
				if(Obj2 == false || this.preventTouchedfield){
					// delete this.preventTouchedfield;
					return false
				}
				if(Obj2.api_name === "Prediction"){
					this.construct_filter(criteriaObj1);
					return Obj2;
				}
				if(Obj1.api_name == "cxFilter_TouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_TouchedRecords" && Obj2.comparator == "System"){//no i18n
					return {api_name : "cxFilter_TouchedRecords",comparator : 'UserOrSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Modified" && Obj1.comparator == "User" &&Obj2.isModified == "Not Modified" && Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_RecordAction",isModified : 'Not Modified',comparator : 'UserOrSystem',value : Obj1.value} //no i18n
				}else if(Obj1.isModified == "Not Done" && Obj1.comparator == "User" &&Obj2.isModified == "Not Done" &&  Obj2.comparator == "System"){//no i18n
					return {api_name : 'cxFilter_RelatedRecordsAction',isModified : 'Not Done',comparator : 'UserOrSystem',value : Obj1.value} //no i18n
				}else if(Obj1.api_name == "cxFilter_UnTouchedRecords" && Obj1.comparator == "User" && Obj2.api_name == "cxFilter_UnTouchedRecords" && Obj2.comparator == "System"){ //no i18n
					return {api_name : "cxFilter_UnTouchedRecords",comparator : 'UserOrSystem',value : Obj1.value} //no i18n
				}
			}
		}else if(!criteria.group || !criteria.group_operator){ //no i18n
			if(criteria.field.api_name == "User_Modified_Time"){//no i18n
				return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'User',value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "User_Related_Activity_Time"){//no i18n
				return {api_name : "cxFilter_RelatedRecordsAction",isModified : 'Done',comparator : 'User',value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "System_Modified_Time"){//no i18n
				return {api_name : "cxFilter_RecordAction",isModified : 'Modified',comparator : 'System',value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "System_Related_Activity_Time"){//no i18n
				return {api_name : "cxFilter_RelatedRecordsAction",isModified : 'Done',comparator : 'System',value : criteria.value} //no i18n
			}else if(criteria.field.api_name == "LAST_SENT_TIME"){ //no i18n
				return {api_name : "cxFilter_Email_Status",status : 'sent',subfield :'any_of_the_above',comparator : criteria.comparator,value : criteria.value} //no i18n
			}
			else if(criteria.field.api_name.toUpperCase().endsWith('PREDICTION') || criteria.field.api_name.toUpperCase().endsWith('PREDICTION_SCORE') && criteria.field.api_name.toUpperCase() !== 'PREDICTION_SCORE'){
				if(criteria.field.api_name.toUpperCase().endsWith('PREDICTION') && criteria.from && criteria.from === "Prediction"){
					return {api_name : "Prediction", criteria : criteria}; //no i18n
				}
				else if(criteria.field.api_name.toUpperCase().endsWith('PREDICTION_SCORE')  && criteria.from && criteria.from === "Prediction"){
						return {api_name : "Prediction", criteria : criteria}; //no i18n
				}
			 }
else if(criteria.field.api_name == "Locked__s"){
				if(criteria.value === false){
					return {api_name : 'cxFilter_Locked',subfield : 'Locked_False',comparator : ''} //no i18n
				}
				else if(criteria.value === true && this.locked_crossfield === false){
					return {api_name : 'cxFilter_Locked',subfield : 'Locked_True',comparator : 'all_lock'} //no i18n
				}
			}
			return false
		}
		return false
	},
	get_pick_track_enable_field : function(fields,currField){
		var i, len = fields.length;
		for( i =0 ; i < len ; i++){
			if(fields[i].refer_from_field && fields[i].refer_from_field.id == currField.id ){
				return fields[i].api_name;
			}
		}
		return false;
	},
	getFieldType : function(api_name){
		if(api_name == "User_Modified_Time" || api_name == "User_Related_Activity_Time" || api_name == "System_Modified_Time" || api_name == "System_Related_Activity_Time" || api_name == " Last_Activity_Time"){
			return "customField" //no i18n
		}else{
			return "normalField" //no i18n
		}
	},
	setFieldCriteria : function(criteria){
		var comparator,node,value,val,flag,comp2,compNode;
		if( !this.$node.querySelector('#field_'+this._cruxReplace(criteria.api_name, "[/.]","_")) ){
			criteria.api_name = criteria.api_name.split('.')[0];
		}
		var type = (this.allfieldType[criteria.api_name])?this.allfieldType[criteria.api_name]:criteria.type;

		criteria.type = type;

		comparator = criteria.comparator;
		value = criteria.value;
		if( this.picklist_trackingObj && !this.loopStarted ){
			this.loopStarted = true;
			var _self = this;
			var loop = setInterval(function(){
				var picklist_tracker = $L("#picklist_tracker_field")[0];
				if( picklist_tracker ){
					var node = picklist_tracker.querySelector("lyte-checkbox"),Obj = _self.picklist_trackingObj;//no i18n
					if(node){
						clearInterval(loop);
						_self.loopStarted = false;
						node.ltProp("disabled",false) //no i18n
						node.ltProp('checked',true) //no i18n
						picklist_tracker.querySelector("lyte-dropdown").ltProp('selected',Obj.comparator);//no i18n
						picklist_tracker.querySelector("crux-number-component").set('cxPropValue',/\d+/i.exec(Obj.value)[0]);//no i18n
						delete _self.picklist_trackingObj
					}
				}
			},50)

		}
		var is_nbx = criteria.from === "NBX" && criteria.api_name === "Stage" ; //no I18n

		if( criteria.api_name == "Duration_Days" || is_nbx){
			return
		}
        var fieldCheckBoxId = this.data.cxPropChildModuleFields ? '#field_'+this._cruxReplace(criteria.api_name, "[/.]","_") : '#field_'+this._cruxReplace(criteria.api_name, "[/.]","_") + ':not(.cxdN)'; //no i18n
		var fieldNode = this.$node.querySelector(fieldCheckBoxId);//no i18n
		if(!fieldNode){
			return false;
		}
		fieldNode.ltProp('checked',true);//no i18n
		if(criteria.api_name === "cxFilter_Scoring_Rule" && this.scoring_rules.length === 0){
			this.cloned_criteria = criteria;
			return;
		}
		if(criteria.api_name === "cxFilter_UnallocatedRecords" && this.assignment_thresholds.length === 0){
			this.cloned_criteria = criteria;
			return;
		}
		if(criteria.api_name === "cxFilter_Series" && this.series.length === 0){
			this.cloned_criteria = criteria;
			return;
		}
		var option_id = '#option_'+this._cruxReplace(criteria.api_name, "[/.]","_"); //No I18n
        option_id = this.data.cxPropChildModuleFields ? option_id+"_"+criteria.id+"_"+this.data.cxPropChildModuleRelation : option_id; //No I18n
		node = this.$node.querySelector(option_id);//no i18n
		var criteriaElem = this.$node.querySelector("#DDV_"+this._cruxReplace(criteria.api_name, "[/.]","_"));//no i18n
		if(criteria.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.cxPropModule)!= -1 ){
			value = value.split(".")[2];
			value = value.slice(0,value.length-1);
			criteriaElem.ltProp('selected',value.split(".").pop().replace("}","")); //no i18n
			return
		}
		// if( ["cxFilter_Records_to_focus","cxFilter_Likely_to_convert","cxFilter_Recent_prediction_score"].indexOf(criteria.api_name) != -1 ){
		// 	if(criteria.api_name == "cxFilter_Likely_to_convert"){
		// 		this.$node.querySelector("#sub_field_"+criteria.value).ltProp('checked',true);//no i18n
		// 	}else if(criteria.api_name == "cxFilter_Recent_prediction_score"){ //no i18n
		// 		value = criteria.value.split(',')
		// 		this.$node.querySelector("#by_"+criteria.api_name).ltProp('selected',value[0]);//no i18n
		// 		if(value[1]){
		// 			if(value[1] == "last3"){
		// 				this.$node.querySelector("#sub_field_"+value[1]).ltProp('checked',true);//no i18n
		// 			}else{
		// 				this.$node.querySelector("#sub_field_In_Last").ltProp('checked',true);//no i18n
		// 				$L("#"+criteria.api_name+"_crux_comp")[0].component.set('cxPropValue',value[1])
		// 				this.$node.querySelector("#second_"+criteria.api_name+"_dropdown").ltProp('selected',value[2].toUpperCase() );//no i18n
		// 			}
		// 		}
		// 	}else if(criteria.api_name == "cxFilter_Records_to_focus"){ //no i18n
		// 		value = (value) ? criteria.value.split(',') :"";
		// 		if(value && value[0]){
		// 			this.$node.querySelector("#sub_field_"+value[0]).ltProp('checked',true);;//no i18n
		// 		}
		// 		if(value && value[1]){
		// 			this.$node.querySelector("#sub_field_"+value[1]).ltProp('checked',true);//no i18n
		// 		}
		// 	}
		// 	return ;
		// }else{
		// 	node.component.set("cxPropCriteria",criteria);//no i18n
		// }
		if(criteria.api_name === "cxFilter_Competitor_Alert"){
			value = this.getData('appliedCriteria').cross_filters.filter((crossFilter) => {return crossFilter.relation.api_name.includes('CrmCompetitorMention__r')});
			this.renderCompetitorFields(value[0],this);
			return;
		}

		node.component.set("cxPropCriteria",criteria);//no i18n
	},
	// enableMoreVisitFun : function(){
	// 	$L("#vtMoreSpan").css("display", "none")//no i18n
	// 	$L("#vMoreEnable").css("display", "block")//no i18n
	// 	this.setData("visitsFieldLimit",this.getData('displayVisitField').length)//no i18n
	// },
	findLinkingField : function(field,LinkingModuleFieldInfo){
		var i=0,fieldLen = LinkingModuleFieldInfo.length
		for(; i<fieldLen ; i++){
			if (! LinkingModuleFieldInfo[i].custom_field && LinkingModuleFieldInfo[i].data_type == "lookup" && LinkingModuleFieldInfo[i].lookup.module.api_name == field[field.field_data_type].connected_module.api_name){
				return LinkingModuleFieldInfo[i]
			}
			if(! LinkingModuleFieldInfo[i].custom_field && LinkingModuleFieldInfo[i].data_type == "userlookup" && field[field.field_data_type].connected_module.api_name == "users"){
				return LinkingModuleFieldInfo[i]
			}
		}
	},
	removeField : function(filterFields , field , parentObj ){
		 var fldLen = filterFields.length , j= 0;
		for(  j = 0 ; j < fldLen ; j++){
			var fld = this.getField( filterFields[j] )
			if( fld.constructor == Array ){
				var continueFlag = this.removeField(fld , field , filterFields[j]);
				if( continueFlag ){
					return true;
				}
			}
			if(fld && (this.data.cxPropChildModuleFields || !fld.cxHide) && fld.api_name === field.api_name){
				if(!this.data.cxPropPreventReordering){
					Lyte.objectUtils(fld ,"add",{"rendered" : false});//no i18n
					if(this.isZBCustomModule(this.getData("cxPropModule")) && field.api_name == "Status" && field.value && fld.pick_list_values){
						field.value = this.getActualValue(field.value, fld);
					}
					Lyte.objectUtils(fld ,"add",{"cxHide" : true });//no i18n
					var cloneFld = $L.extend( {}, fld );
					cloneFld.cxOriginField = fld;
					cloneFld.cxAppliedField = true;
					cloneFld.cxHide = false;
					if( this.data.cxPropReorderToSectionTop && fld.cxParent && fld.cxParent.cxFields){
						let appliedFlds = fld.cxParent.cxFields.filter((fld)=>fld.cxAppliedField);
						cloneFld.cxAppliedPosition = appliedFlds.length;
						Lyte.arrayUtils(fld.cxParent.cxFields, 'insertAt', cloneFld.cxAppliedPosition, cloneFld); //no i18n
					}
					Lyte.arrayUtils(this.data.appliedFields, 'push', cloneFld);//no i18n
					// else{
					// 	fld.cxFromPosition = j;
					// 	Lyte.arrayUtils(this.data.appliedFields, 'push', fld)//no i18n
					// 	Lyte.arrayUtils(filterFields, 'removeAt', j, 1) //no i18n
					// }
					if(this.data.cxPropChildModuleFields) {
						Lyte.arrayUtils(filterFields, 'removeAt', j, 1); //no i18n
						var _self = this;
						_self.removeFieldFromDropDownFields(fld.id,_self);
					}
				}
				return true;
			}
		}
	}, 
    
	removeFieldFromDropDownFields : function(fieldId,_self){
		var selectedFields = this.data.cxPropDropSelectedChildFields;
		var dropFields = this.data.cxPropDropBoxChildFields;
		var droplength = dropFields.length;
		for(var i=0;i<droplength;i++){
			if(fieldId === dropFields[i].id){
				Lyte.Component.set(this.data.cxPropDropBoxChildFields[i],{hideInDropDown : true});
				if(!selectedFields.contains(dropFields[i])){
					selectedFields.push(dropFields[i]);
				}
				break;
			}
		}
		this.setData("cxPropDropSelectedChildFields", selectedFields);
        var crossFieldComponent = _self.$node.closest('crux-smart-filter-crossfields');
		crossFieldComponent.component.incrementSelectedFieldCount();
	},

	findField :function(field){
		if(field){
			if( field.api_name === "Stage" && field.from === "NBX"){
				return false;
			}
			// label = "api_name" //no i18n
			if( field.api_name.indexOf && field.api_name.indexOf(".") != "-1"){
				let fldAvailable = this.cxFilterFields.filter(fld=>fld.api_name ==  field.api_name )[0];
				if( field.api_name === "Data_Processing_Basis_Details.Data_Processing_Basis" ){
					field.api_name = "Data_Processing_Basis"
				}else if( !fldAvailable ){ //!this.$node.querySelector('#field_'+this._cruxReplace(field.api_name, "[/.]","_"))
					field.api_name = field.api_name.split(".")[0] ;
				}
			}
			if( field.api_name.indexOf && field.api_name.indexOf("->") != "-1"){
				field.multi_module_lookup = field.api_name.split("->")[1] //no i18n
				field.api_name = field.api_name.split("->")[0] //no i18n
			}
		}
		if( this.rfm_avilable && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){
			field.subfield = field.api_name;
			field.api_name = "Segment_Score";//no i18n
		}
		if(this.abm_technique_field_avilable && this.data.abmTechniqueFieldList && this.data.abmTechniqueFieldList.indexOf(field.api_name) !== -1 ) {
			field.subfield = field.api_name;
			field.api_name = "ABM_Techniques"; // NO I18N
		}
		if(this.abm_score_field_available && this.getData('abmScoreFieldList').indexOf(field.api_name) !== -1) {
			field.subfield = field.api_name;
			field.api_name = "ABM_Scores"; // NO I18N
		}
		if( field.api_name == "cxFilter_Record_status" ){
			this.Record_status_field = field;
		}
		var isSuccessFlg = this.removeField(this.data.allFields , field)
		if( !isSuccessFlg ){
			if( this.cruxAssets && this.cruxAssets.checkIsDynamicFilterCriteria){
				field.field ={ api_name : field.api_name };
				var fld = this.cruxAssets.checkIsDynamicFilterCriteria( field );
				if(fld){
					field.criteria = {...field};
					delete field.value;delete field.comparator;
					delete field.field;
					for(var key in fld){
						field[key]=fld[key];
					}
					this.removeField(this.data.allFields , field);
				}
			}
		}
		/*var j=0,allfieldsLen = allfields.length,label;
		if(field){
			if( field.api_name === "Stage" && field.from === "NBX"){
				return false;
			}
			label = "api_name" //no i18n
			if( field.api_name.indexOf && field.api_name.indexOf(".") != "-1"){
				if( field.api_name === "Data_Processing_Basis_Details.Data_Processing_Basis" ){
					field.api_name = "Data_Processing_Basis"
				}else if( !this.$node.querySelector('#field_'+this._cruxReplace(field.api_name, "[/.]","_")) ){
					field.api_name = field.api_name.split(".")[0] ;
				}
			}
			if( field.api_name.indexOf && field.api_name.indexOf("->") != "-1"){
				field.multi_module_lookup = field.api_name.split("->")[1] //no i18n
				field.api_name = field.api_name.split("->")[0] //no i18n
			}
		}
		if( this.rfm_avilable && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){
			field.subfield = field.api_name;
			field.api_name = "Segment_Score";//no i18n
		}
		if(this.abm_technique_field_avilable && this.getData('abmTechniqueFieldList').indexOf(field.api_name) !== -1 ) {
			field.subfield = field.api_name;
			field.api_name = "ABM_Techniques"; // NO I18N
		}
		if(this.abm_score_field_available && this.getData('abmScoreFieldList').indexOf(field.api_name) !== -1) {
			field.subfield = field.api_name;
			field.api_name = "ABM_Scores"; // NO I18N
		}
		
		for(j=0;j<allfieldsLen;j++){
			if( allfields[j] && field && field[label] == allfields[j][label]){
				if(!this.data.cxPropPreventReordering){
					// if( j != 0 ||  isswapSpecialField){
						Lyte.objectUtils(allfields[j] ,"add",{"rendered" : false});//no i18n
					//}
					this.field_mapping[field.api_name] = { old_position : j,fromArray : fromArray , toArray : "appliedFields", field : allfields[j]}//no i18n
					Lyte.arrayUtils(this.data.appliedFields, 'insertAt', 0, allfields[j])//no i18n
					if(this.isZBCustomModule(this.getData("cxPropModule")) && field.api_name == "Status" && field.value && allfields[j].pick_list_values){
						field.value = this.getActualValue(field.value, allfields[j]);
					}
					Lyte.arrayUtils(allfields, 'removeAt', j, 1) //no i18n
					this.currCount = fromArray === "allFields" ? this.currCount - 1 : this.currCount;//no i18n

				}
				return true
			}
		}
		if( field.api_name == "cxFilter_Record_status" ){
			this.Record_status_field = field;
		}
		return false */
	},
	getField : function(fld){
		if( !fld ){
			return fld;
		}
		if( fld.cxAccordion  || fld.cxHeader){
			return fld.cxFields && fld.cxFields.length ? fld.cxFields : [];
		}
		return fld;
	}, 
	checkIsValidField : function(fld , parentObj){
		if( !fld ){
			return false;
		}
		var moduleRecordMapping = this.moduleRecordMapping , idModuleMapping = this.idModuleMapping;
		var uiType = this.getData( "cxPropPreventUiType" );//no i18n
		var columnName = this.getData( "cxPropPreventColumnName" );//no i18n
		if( !Object.keys( fld )){
			return false;
		}
		if( parentObj && parentObj.cxAccordion && ["special_field", "abmFields"].indexOf( parentObj.cxAccordionName ) !== -1 ){
			return true;
		}
		if(fld.data_type == "multiselectlookup" ){
			var cModule , tModule;
			skipField = false;
			if( idModuleMapping[fld.multiselectlookup.connected_module.id] && moduleRecordMapping[idModuleMapping[fld.multiselectlookup.connected_module.id]]){
				cModule = moduleRecordMapping[idModuleMapping[fld.multiselectlookup.connected_module.id]];
			}
			if( idModuleMapping[fld.multiselectlookup.linking_module.id] && moduleRecordMapping[idModuleMapping[fld.multiselectlookup.linking_module.id]]){
				tModule = moduleRecordMapping[idModuleMapping[fld.multiselectlookup.linking_module.id]];
			}

			if( cModule && !( cModule.visible &&cModule.viewable) ){
				return false;
			}
			if(tModule){
				var visible =tModule.visibility & 2 ;
				var hiddenModule = visible == 2?true:false;
				if(!hiddenModule && !(tModule.visible && tModule.viewable)){
					return false;
				}
			}

		}
		if( window.clientPortalName && ["multiuserlookup","ownerlookup","userlookup"].indexOf(fld.data_type) != -1){
			return false;
		}
		if(fld && ( fld.filterable || fld.data_type == "multiselectlookup" || fld.data_type == "multiuserlookup") && !fld.external && fld.visible && fld.available_in_user_layout && uiType.indexOf(fld.ui_type) == -1 && columnName.indexOf(fld.column_name) == -1 ) {
			if((fld.data_type === "lookup" && fld.custom_field === true && this.data.cxPropModule && (this.data.cxPropModule.startsWith("Orchestration") || this.data.cxPropModule.startsWith("PathFinder")) ) || ( this.data.cxPropModule && (this.data.cxPropModule.startsWith("Orchestration") || this.data.cxPropModule.startsWith("PathFinder")) && fld.column_name === "SMOWNERID") ){
				return false;
			}else{
				return true;
			}
		}
		return false;

	},
	getType : function(types , filterFields , parentObj){
		var  segmentField,
		abmTechniqueFields,
		abmTechniqueFieldsIndex = 0,
		abmSortFun = (a, b) => abmTechniqueFieldOrder.indexOf(a.api_name) - abmTechniqueFieldOrder.indexOf(b.api_name),
		abmScoresOrder = this.getData('cxPropCommonInfo').abmModuleInfo ? this.getData("cxPropCommonInfo").abmModuleInfo.scoreFields.map(s => 'cxFilter_' + s) : [], // NO I18N
		abmScoreSortFun = (a, b) =>  abmScoresOrder.indexOf(a.api_name) - abmScoresOrder.indexOf(b.api_name),
		abmScoreFields,
		abmScoreFieldsIndex = 0,
		abmScoreFields,
		abmTechniqueFieldOrder = this.getData('cxPropCommonInfo').abmModuleInfo ? this.getData("cxPropCommonInfo").abmModuleInfo.techniqueFields.map(s => 'cxFilter_' + s) : [],//no i18N
		rfmFieldLabel;
		
		var module = this.getData('cxPropModule') , moduleRecordMapping = this.moduleRecordMapping , idModuleMapping = this.idModuleMapping //no i18n
		var tagCount = 0 ;
		var uiType = this.getData( "cxPropPreventUiType" );//no i18n
		var columnName = this.getData( "cxPropPreventColumnName" );//no i18n
		var custom_view =  !moduleRecordMapping[module] || !module ? undefined : moduleRecordMapping[module].custom_view;
		types  = types ? types : {}
		var len = filterFields.length , i = 0 , checkIsValid , fld;
		if(filterFields[0] && (!filterFields[0].cxAccordion || !filterFields[0].cxHeader) && this.data.cxPropSort ){
			filterFields = this.sortArray(filterFields, "field_label");
		}
		for(i = 0 ; i < len ; i++){
			fld = this.getField( filterFields[i] )
			if(fld && fld.constructor == Array ){
				filterFields[i].cxOpenState = true;
				if(filterFields[i].cxSort ||  (filterFields[i].cxSort !== false && this.data.cxPropSort) ){
					fld = this.sortArray(fld, "field_label");
				}
				this.getType(types , fld , filterFields[i]);
				continue;
			}
			if( !this.checkIsValidField(fld , parentObj) ){
				filterFields.splice(i,1);
				i = i -1 ;len = len -1;
				continue;
			}
			filterFields[i] = Object.assign({} , filterFields[i]);
			fld = filterFields[i];
			Lyte.Component.set(fld, "display_field_label", fld.field_label) // no i18n
			if( fld.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(fld.api_name) !== -1){
				this.rfm_avilable = true;
				var rfmFieldOrder = { Recency : 0 , Frequency : 1, Monetary : 2 }
				if( !segmentField ){
					rfmFieldLabel = module === 'ABMAccount' ? _cruxUtils.getI18n('abm.rfm.score') : _cruxUtils.getI18n("crm.segmentation.segment.score"); // NO I18N
					segmentField = { ind : i , field : {crossFields : [] , api_name : "Segment_Score" , ui_type : "" ,field_data_type : "rfm", data_type : "rfm" , field_label : rfmFieldLabel , display_field_label : rfmFieldLabel }};//no i18n
					filterFields.splice( i, 0, segmentField.field);
					this.cxFilterFields.push(segmentField.field);
					i=i+1; len = len+1;

				}
				fld.isCheckBox = true;
				fld.showSubField = true;
				filterFields[segmentField.ind].crossFields[rfmFieldOrder[fld.api_name]] = fld
				filterFields.splice( i, 1)
				i=i-1;len = len-1;
				fld = segmentField.field;
			}

			if(this.getData('abmTechniqueFieldList') && this.getData('abmTechniqueFieldList').indexOf(fld.api_name) !== -1) { // NO I18N
				this.abm_technique_field_avilable = true;
				if(!abmTechniqueFields) {
					
					abmTechniqueFields = {
						ind: i,
						field: {
							crossFields: [],
							api_name: "ABM_Techniques", // NO I18N
							ui_type : "", // NO I18N
							field_data_type: "ABM_Techniques", // NO I18N
							data_type : "ABM_Techniques", // NO I18N
							field_label: _cruxUtils.getI18n('abm.segmentation.techniques'), // NO I18N
							display_field_label: _cruxUtils.getI18n('abm.segmentation.techniques') // NO I18N
						}
					};
					filterFields.splice(i, 0, abmTechniqueFields.field);
					i = i + 1;
				}
				fld.isCheckBox = true;
				filterFields[abmTechniqueFields.ind].crossFields[abmTechniqueFieldsIndex] = fld;
				filterFields.splice(i, 1);
				
				abmTechniqueFieldsIndex = abmTechniqueFieldsIndex + 1;
				i = i - 1;
				if(abmTechniqueFieldsIndex === this.getData("abmTechniqueFieldsLength")) {
					filterFields[abmTechniqueFields.ind].crossFields.sort(abmSortFun);
				}
				fld = abmTechniqueFields.field;
			}


			if (this.getData('abmScoreFieldList') && this.getData('abmScoreFieldList').indexOf(fld.api_name) !== -1) {
				this.abm_score_field_available = true;
					
				if(!abmScoreFields) {
					var accountScoreFieldLabel = store.peekAll('field').filter(f => f.api_name === 'Account_Score__s')[0].field_label; // NO I18N

					abmScoreFields = {
						ind: i,
						field: {
							crossFields: [],
							api_name: "ABM_Scores", // NO I18N
							ui_type : "", // NO I18N
							field_data_type: "ABM_Scores", // NO I18N
							data_type : "ABM_Scores", // NO I18N
							field_label: accountScoreFieldLabel, // NO I18N
							display_field_label: accountScoreFieldLabel // NO I18N
						}
					};

					filterFields.splice(i, 0, abmScoreFields.field);
					i = i + 1;
				}
				fld.isCheckBox = true;
				filterFields[abmScoreFields.ind].crossFields[abmScoreFieldsIndex] = fld;
				filterFields.splice(i, 1);

				abmScoreFieldsIndex = abmScoreFieldsIndex + 1;
				i = i - 1;
				if(abmScoreFieldsIndex === this.getData("abmScoreFieldLength")) { // NO I18N
					filterFields[abmScoreFields.ind].crossFields.sort(abmScoreSortFun);
				}
				fld = abmScoreFields.field;
			}

			if(fld.column_name == "TAGMODULEREFID" && module == "Activities"){
				tagCount +=1;
				if(tagCount > 1){
					filterFields.splice( i, 1)
					i = i-1;
					len = len -1;
					continue;
				}
				if( custom_view && !custom_view.activity_view && !custom_view.calls_view && !custom_view.event_view && !custom_view.task_view){
					filterFields.splice( i, 1)
					i = i-1;
					len = len -1;
				}else if( !custom_view.activity_view){
					if(custom_view.calls_view){
						filterFields.splice(i,0,{api_name : "Calls_Tag" , column_name : fld.column_name, ui_type : fld.ui_type,field_data_type:"tag", data_type : "tag", field_label : fld.field_label , display_field_label : fld.field_label, module_name : "Calls" ,visible : true});
					}else if(custom_view.event_view){
						filterFields.splice(i,0,{api_name : "Events_Tag" ,column_name : fld.column_name, ui_type : fld.ui_type,field_data_type:"tag", data_type  :"tag", field_label : fld.field_label , display_field_label : fld.field_label,module_name : "Events",visible : true});
					}else if(custom_view.task_view){
						filterFields.splice(i,0,{api_name : "Tasks_Tag" ,column_name : fld.column_name, ui_type : fld.ui_type, field_data_type:"tag", data_type  : "tag", field_label : fld.field_label , display_field_label : fld.field_label , module_name : "Tasks",visible : true});
					}
					filterFields.splice(i+1,1);
				}
			}
			this.getFieldDataType(fld);
			/*if( fld.column_name== "FULLNAME" && (module == "Leads" || module == "Contacts") ){//no i18n
				fld.display_field_label = module == "Leads" ? _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Leads.singular_label) : _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Contacts.singular_label);//no i18n
				fld.field_label = fld.display_field_label;
			}else if(fld.data_type == "formula" || (fld.rollup_summary && fld.rollup_summary.return_type)){
				fld.field_data_type =  fld.formula.return_type ?  fld.formula.return_type :  fld.rollup_summary.return_type;//no i18n
			}else if(["LAYOUTID","TAGMODULEREFID","ACTIVITYTYPE","WIZARDID"].indexOf(fld.column_name) != -1){//no i18n
				var typeMap = {LAYOUTID : "layout",TAGMODULEREFID : "tag",ACTIVITYTYPE : "picklist",WIZARDID : "layout"}//no i18n
				fld.field_data_type = typeMap[fld.column_name];
				if( fld.api_name ==  "Service_Members"){
					fld[typeMap[fld.api_name]] = fld.multiselectlookup;//no i18n
				}
			}else if(fld.ui_type == 53 ){
				fld.cxGetValueInMS = fld.cxGetValueInMS === undefined ? true : fld.cxGetValueInMS;
				fld.field_data_type = "date";
			}
			if( this.data.cxPropModule == "Services" && fld.column_name == "MXNDUMMYCOLUMN_SERVICE" ){
				fld.field_data_type = "multiuserlookup";
				fld.multiuserlookup = fld.multiselectlookup
			}*/
			fld.subField = false;fld.rendered = false;
			//fld.displayInFilter = key === "allFields" && !this.data.cxPropEnableScrollLoading ? true : false;
		/*	if(fld.field_data_type == undefined){
				fld.field_data_type = fld.data_type;
			}
			if( fld.data_type == "multi_module_lookup" ){
				fld.field_data_type = "lookup";
			}
			*/
			types[fld.api_name] = fld.field_data_type;
			Lyte.Component.set(fld, "cxFilterIndex", this.cxFilterFields.length+'') // no i18n
			fld.cxFromArray = filterFields;
			fld.cxParent = parentObj;
			// fld.cxFilterIndex = this.cxFilterFields.length;
			this.cxFilterFields.push(fld);
			if(fld.visible == undefined){
				fld.visible = true;
			}

		}
		return types;




/*
		var allFields , segmentField, filterFields = {},
			abmTechniqueFields,
			abmTechniqueFieldsIndex = 0,
			abmSortFun = (a, b) => abmTechniqueFieldOrder.indexOf(a.api_name) - abmTechniqueFieldOrder.indexOf(b.api_name),
			abmScoresOrder = this.getData('cxPropCommonInfo').abmModuleInfo ? this.getData("cxPropCommonInfo").abmModuleInfo.scoreFields.map(s => 'cxFilter_' + s) : [], // NO I18N
			abmScoreSortFun = (a, b) =>  abmScoresOrder.indexOf(a.api_name) - abmScoresOrder.indexOf(b.api_name),
			abmScoreFields,
			abmScoreFieldsIndex = 0,
			abmScoreFields,
			abmTechniqueFieldOrder = this.getData('cxPropCommonInfo').abmModuleInfo ? this.getData("cxPropCommonInfo").abmModuleInfo.techniqueFields.map(s => 'cxFilter_' + s) : []; // NO I18N
		
		var module = this.getData('cxPropModule') , moduleRecordMapping = this.moduleRecordMapping , idModuleMapping = this.idModuleMapping //no i18n
		filterFields.abmFields = wrapperObj.abm_field;
		filterFields.allFields = wrapperObj.moduleFields;
		filterFields.special_fields = wrapperObj.special_field;
		filterFields.visits_fields = wrapperObj.displayVisitField;
		var len , Obj = types ? types : {},tagCount = 0 , skipField = false;
		var uiType = this.getData( "cxPropPreventUiType" );//no i18n
		var columnName = this.getData( "cxPropPreventColumnName" );//no i18n
		var custom_view =  !moduleRecordMapping[module] || !module ? undefined : moduleRecordMapping[module].custom_view;
		for (var key in filterFields) {
			allFields = filterFields[key];len = allFields.length;
			for(var i=0;i<len;i++){
				allFields[i] = Object.assign({} , allFields[i]);
				if(!allFields[i] || !Object.keys(allFields[i]).length){
					allFields.splice(i,1);
					len = len -1;
					i = i -1 ;
					continue;
				}
				if(allFields[i].api_name === "Locked__s"){
					skipField = true;
				}
				if(allFields[i].data_type == "multiselectlookup" ){
					var cModule , tModule;
					skipField = false;
					if( idModuleMapping[allFields[i].multiselectlookup.connected_module.id] && moduleRecordMapping[idModuleMapping[allFields[i].multiselectlookup.connected_module.id]]){
						cModule = moduleRecordMapping[idModuleMapping[allFields[i].multiselectlookup.connected_module.id]];
					}
					if( idModuleMapping[allFields[i].multiselectlookup.linking_module.id] && moduleRecordMapping[idModuleMapping[allFields[i].multiselectlookup.linking_module.id]]){
						tModule = moduleRecordMapping[idModuleMapping[allFields[i].multiselectlookup.linking_module.id]];
					}

					if( cModule && !( cModule.visible &&cModule.viewable) ){
						skipField = true;
					}
					if(tModule){
						var visible =tModule.visibility & 2 ;
						var hiddenModule = visible == 2?true:false;
						if(!hiddenModule && !(tModule.visible && tModule.viewable)){
							skipField = true;
						}
					}

				}

				if( (window.clientPortalName && allFields[i] &&["Check_In_By"].indexOf(allFields[i].api_name) == -1 && ["multiuserlookup","ownerlookup","userlookup"].indexOf(allFields[i].data_type) != -1) ||  skipField){
					skipField = false;
					allFields.splice(i,1);
					i = i -1 ;len = len -1;
					continue;
				}
				if(allFields[i] && ( allFields[i].filterable || allFields[i].data_type == "multiselectlookup" || allFields[i].data_type == "multiuserlookup") && !allFields[i].external && allFields[i].visible && allFields[i].available_in_user_layout && uiType.indexOf(allFields[i].ui_type) == -1 && columnName.indexOf(allFields[i].column_name) == -1 ) {
					if((allFields[i].data_type === "lookup" && allFields[i].custom_field === true && this.data.cxPropModule && (this.data.cxPropModule.startsWith("Orchestration") || this.data.cxPropModule.startsWith("PathFinder")) ) || ( this.data.cxPropModule && (this.data.cxPropModule.startsWith("Orchestration") || this.data.cxPropModule.startsWith("PathFinder")) && allFields[i].column_name === "SMOWNERID") ){
						allFields.splice(i,1);
						i = i -1 ;len = len -1;
						continue;
					}
				}else if( key !== "special_fields" && key !== "abmFields"){//no i18n
					allFields.splice(i,1);
					i = i -1 ;len = len -1;
					continue;
				}
				Lyte.Component.set(allFields[i], "display_field_label", allFields[i].field_label) // no i18n
				if( allFields[i].show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(allFields[i].api_name) !== -1){
					this.rfm_avilable = true;
					var rfmFieldOrder = { Recency : 0 , Frequency : 1, Monetary : 2 },
						rfmFieldLabel = module === 'ABMAccount' ? _cruxUtils.getI18n('abm.rfm.score') : _cruxUtils.getI18n("crm.segmentation.segment.score"); // NO I18N
					if( !segmentField ){
						segmentField = { ind : i , field : {crossFields : [] , api_name : "Segment_Score" , ui_type : "" ,field_data_type : "rfm", data_type : "rfm" , field_label :  rfmFieldLabel, display_field_label : rfmFieldLabel }};//no i18n
						allFields.splice( i, 0, segmentField.field)
						i=i+1;

					}
					allFields[segmentField.ind].crossFields[rfmFieldOrder[allFields[i].api_name]] = allFields[i]
					allFields.splice( i, 1)
					i=i-1;
				}
				
				if(this.getData('abmTechniqueFieldList') && this.getData('abmTechniqueFieldList').indexOf(allFields[i].api_name) !== -1) { // NO I18N
					this.abm_technique_field_avilable = true;
					if(!abmTechniqueFields) {
						
						abmTechniqueFields = {
							ind: i,
							field: {
								crossFields: [],
								api_name: "ABM_Techniques", // NO I18N
								ui_type : "", // NO I18N
								field_data_type: "ABM_Techniques", // NO I18N
								data_type : "ABM_Techniques", // NO I18N
								field_label: _cruxUtils.getI18n('abm.segmentation.techniques'), // NO I18N
								display_field_label: _cruxUtils.getI18n('abm.segmentation.techniques') // NO I18N
							}
						};
						
						allFields.splice(i, 0, abmTechniqueFields.field);
						i = i + 1;
					}
					
					allFields[abmTechniqueFields.ind].crossFields[abmTechniqueFieldsIndex] = allFields[i];
					allFields.splice(i, 1);
					
					abmTechniqueFieldsIndex = abmTechniqueFieldsIndex + 1;
					i = i - 1;
					if(abmTechniqueFieldsIndex === this.getData("abmTechniqueFieldsLength")) {
						allFields[abmTechniqueFields.ind].crossFields.sort(abmSortFun);
					}
				}
				if (this.getData('abmScoreFieldList') && this.getData('abmScoreFieldList').indexOf(allFields[i].api_name) !== -1) {
					this.abm_score_field_available = true;
						
					if(!abmScoreFields) {
						var accountScoreFieldLabel = store.peekAll('field').filter(f => f.api_name === 'Account_Score__s')[0].field_label; // NO I18N

						abmScoreFields = {
							ind: i,
							field: {
								crossFields: [],
								api_name: "ABM_Scores", // NO I18N
								ui_type : "", // NO I18N
								field_data_type: "ABM_Scores", // NO I18N
								data_type : "ABM_Scores", // NO I18N
								field_label: accountScoreFieldLabel, // NO I18N
								display_field_label: accountScoreFieldLabel // NO I18N
							}
						};

						allFields.splice(i, 0, abmScoreFields.field);
						i = i + 1;
					}

					allFields[abmScoreFields.ind].crossFields[abmScoreFieldsIndex] = allFields[i];
					allFields.splice(i, 1);

					abmScoreFieldsIndex = abmScoreFieldsIndex + 1;
					i = i - 1;
					if(abmScoreFieldsIndex === this.getData("abmScoreFieldLength")) { // NO I18N
						allFields[abmScoreFields.ind].crossFields.sort(abmScoreSortFun);
					}
				}

				if(allFields[i].column_name == "TAGMODULEREFID" && module == "Activities"){
					tagCount +=1;
					if(tagCount > 1){
						allFields.splice( i, 1)
						i = i-1;
						len = len -1;
						continue;
					}
					if( custom_view && !custom_view.activity_view && !custom_view.calls_view && !custom_view.event_view && !custom_view.task_view){
						allFields.splice( i, 1)
						i = i-1;
						len = len -1;
					}else if( !custom_view.activity_view){
						if(custom_view.calls_view){
							allFields.splice(i,0,{api_name : "Calls_Tag" , column_name : allFields[i].column_name, ui_type : allFields[i].ui_type,field_data_type:"tag", data_type : "tag", field_label : allFields[i].field_label , display_field_label : allFields[i].field_label, module_name : "Calls" ,visible : true});
						}else if(custom_view.event_view){
							allFields.splice(i,0,{api_name : "Events_Tag" ,column_name : allFields[i].column_name, ui_type : allFields[i].ui_type,field_data_type:"tag", data_type  :"tag", field_label : allFields[i].field_label , display_field_label : allFields[i].field_label,module_name : "Events",visible : true});
						}else if(custom_view.task_view){
							allFields.splice(i,0,{api_name : "Tasks_Tag" ,column_name : allFields[i].column_name, ui_type : allFields[i].ui_type, field_data_type:"tag", data_type  : "tag", field_label : allFields[i].field_label , display_field_label : allFields[i].field_label , module_name : "Tasks",visible : true});
						}
						allFields.splice(i+1,1);
					}
				}
				 if( allFields[i].column_name== "FULLNAME" && (module == "Leads" || module == "Contacts") ){//no i18n
					//allFields[i].display_field_label = (module == "Leads") ? _cruxUtils.getI18n("Contact\ Name",moduleRecordMapping.Leads.singular_label) : _cruxUtils.getI18n("Contact\ Name",moduleRecordMapping.Contacts.singular_label) //no i18n
					allFields[i].display_field_label = module == "Leads" ? _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Leads.singular_label) : _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Contacts.singular_label);//no i18n
					allFields[i].field_label = allFields[i].display_field_label;
					//Lyte.Component.set(allFields[i], "display_field_label", (module == "Leads") ? _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Leads.singular_label) : _cruxUtils.getI18n("crm.label.vendor.name",moduleRecordMapping.Contacts.singular_label)); //no i18n
				}else if(allFields[i].data_type == "formula" || (allFields[i].rollup_summary && allFields[i].rollup_summary.return_type)){
					allFields[i].field_data_type =  allFields[i].formula.return_type ?  allFields[i].formula.return_type :  allFields[i].rollup_summary.return_type;//no i18n
				}else if(["LAYOUTID","TAGMODULEREFID","ACTIVITYTYPE","WIZARDID"].indexOf(allFields[i].column_name) != -1){//no i18n
					var typeMap = {LAYOUTID : "layout",TAGMODULEREFID : "tag",ACTIVITYTYPE : "picklist",WIZARDID : "layout"}//no i18n
					allFields[i].field_data_type = typeMap[allFields[i].column_name];
					if( allFields[i].api_name ==  "Service_Members"){
						allFields[i][typeMap[allFields[i].api_name]] = allFields[i].multiselectlookup;//no i18n
					}
				}else if(allFields[i].ui_type == 53 ){
					allFields[i].field_data_type = "date";
				}
				if( this.data.cxPropModule == "Services" && allFields[i].column_name == "MXNDUMMYCOLUMN_SERVICE" ){
					allFields[i].field_data_type = "multiuserlookup";
					allFields[i].multiuserlookup = allFields[i].multiselectlookup
				}
				if( allFields[i].data_type == "multi_module_lookup" ){
					allFields[i].field_data_type = "lookup";
				}
				allFields[i].subField = false;allFields[i].rendered = false;
				allFields[i].displayInFilter = key === "allFields" && !this.data.cxPropEnableScrollLoading ? true : false;
				if(allFields[i].field_data_type == undefined){
					allFields[i].field_data_type = allFields[i].data_type;
				}
				Obj[allFields[i].api_name] = allFields[i].field_data_type;
				if(allFields[i].visible == undefined){
					allFields[i].visible = true;
				}
			}
		}
		return Obj
		*/
	},
	// getPredictionField : function(criteria){
	// 	//PREWIN,PREGONEUP,PREFOCUS
	// 	var fields = (this.getData("cxPropModule") == "Leads") ?  {LPCON : "cxFilter_Likely_to_convert",LPREC : "cxFilter_Recent_prediction_score",LPRFOC : "cxFilter_Records_to_focus"} : {PREWIN : "Likely_to_convert",PREGONEUP : "cxFilter_Recent_prediction_score",PREGONEDOWN : "cxFilter_Recent_prediction_score",PREFOCUS : "cxFilter_Records_to_focus"}; //no i18n
	// 	if(/.*?{(.*)}.*?/.test(criteria.value)){
	// 		var value = /.*?{(.*)}.*?/.exec(criteria.value)[1]
	// 		value = value.split('|');
	// 		var tempVal = value[1];
	// 		if(value[0] == "PREGONEUP" || value[0] == "PREGONEDOWN"){
	// 			var newVal = (value[0] == "PREGONEUP") ? "goneup" : "gonedown";//no i18n
	// 			tempVal = newVal+","+tempVal;
	// 		}
	// 		return {type : "Prediction",api_name : fields[value[0]] , value:tempVal} //no i18n
	// 	}else{
	// 		return {type : "number",api_name : "cxFilter_Prediction_Score",comparator : criteria.comparator,value : criteria.value} //no i18n
	// 	}
	// },
	constructFilter : function(params){
		if(!params){
			return;
		}
		if(params.filters && params.filters.group.length){
			var criteria = params.filters.group
			var i=0,len = criteria.length,field,flag = true
			for(i =0 ;i<len ; i++){
				delete this.preventTouchedfield;
				field = this.isCustomField(criteria[i])
				if(field){
					if(params.crossField &&params.crossField.length && flag){
						flag = false
						this.construct_crossFilter(params.crossField)
					}
					field.type = "custom";
					this.findField(field);
					this.setFieldCriteria(field)

					if(!criteria[i+1] && params.cross_filters){
						this.construct_crossFilter(params.cross_filters)
					}
				}else{
					if(criteria[i].field){
						criteria[i].api_name = criteria[i].field.api_name;
						criteria[i].id = criteria[i].field.id;
						delete criteria[i].field
					}
					// if(criteria[i].api_name == "Prediction_Score"){
					// 	field = this.getPredictionField(criteria[i])
					// 	this.findField(field) //no i18n
					// 	this.setFieldCriteria(field)
					// 	continue
					// }
					if(this.isWebsiteActivityField(criteria[i]) && this.data.displayVisitField.length){
						// this.enableMoreVisitFun();
						this.findField(criteria[i])
					}else{
						this.findField(criteria[i]) 
					}
					this.setFieldCriteria(criteria[i])
					if(!criteria[i+1] && params.cross_filters){
						this.construct_crossFilter(params.cross_filters)
					}
				}
			}
		}else if(params.cross_filters && params.cross_filters.length){
			this.construct_crossFilter(params.cross_filters)
		}
	},
	isWebsiteActivityField : function(criteria){
		var fields = ["Average_Time_Spent_Minutes","Days_Visited","First_Visited_URL","First_Visited_Time","Last_Visited_Time","Number_Of_Chats","Referrer","Visitor_Score","Attended_By","Browser","Operating_System","Portal_Name","Search_Engine","Time_Spent","Visited_Time"] //no i18n
		if(fields.indexOf(criteria.api_name) != -1){
			return true
		}
		return false
	},
	setCriteria : function(queryParams , resetFields = false){
		if(!queryParams){
			return
		}
		this.setData("appliedCriteria",JSON.parse(JSON.stringify(queryParams)));//no i18n
		// this.setData("cxPropBlockedReason",false);//no i18n
		this.locked_crossfield = false;//no i18n
		this.blockedCriteriaSelected = false;
		var filters = queryParams.filters;
		if( resetFields ){
			this.resetFields();
		}
		if(filters && ( (filters.group && filters.group.length <= 2) || filters.field)){
			if(queryParams.cross_filters){
				this.construct_crossFilter(queryParams.cross_filters)
			}
			this.construct_filter(filters)
		}else{
			this.constructFilter(queryParams)
		}
		this.getFieldByKeyValue(this.data.allFields ,"","",this.cxFilterFields = []);
		this.checkIsEmptyAcc();
		this.toggleDealsField();
	},
	checkIsEmptyAcc : function(){
		if( this.data.cxPropReorderToSectionTop || this.data.cxPropPreventReordering){
			return;
		}
		var accItems = this.data.allFields.filter((item)=>item.cxAccordion),
			accLen = accItems.length,
			i = 0 , accFlds = [];
		for( i = 0 ; i < accLen ; i++ ){
			var listedFields =  accItems[i].cxFields.filter((fld)=>!fld.cxHide);
			if(!listedFields.length){
				Lyte.objectUtils(accItems[i] , "add" , "cxHideAccordion" , true);
			}
		}
		
	},
	// showAlert : function(msg,comp){
	// 	var check=true;
	// 	if(this.getMethods('onBeforeErrorAlert')){
	// 		check=this.executeMethod('onBeforeErrorAlert',msg);//No I18N
	// 	}
	// 	if(check){
	// 		var alert=this.$node.querySelector('#cxFilterAlert'); //No I18N
	// 		this.setData('alertMsg',msg); //No I18N
	// 		if( alert.ltProp("show") == true ){
	// 			return
	// 		}
	// 		alert.ltProp('show',true); //No I18N
	// 		alert.setMethods({onClose : function(){
	// 			if(comp&&comp.$node ){
	// 				comp = comp.$node;
	// 			}

	// 			if( comp ){
	// 				var elem = comp.querySelector( 'lyte-input,lyte-number' );//no i18n
	// 				elem && elem.focus();
	// 			}

	// 			// if(comp && comp.querySelector("lyte-input")){
	// 			// 	comp.querySelector("lyte-input").focus();//No I18n
	// 			// }else if(comp && comp.querySelector("lyte-number")){//no i18n
	// 			// 	comp.querySelector("lyte-number").focus();//No I18n
	// 			// }
	// 		},onShow : function(){
	// 			$L(".cxSmartFilterAlert lyte-button").focus();//No I18N
	// 		}
	// 	})
	// 		if(this.getMethods('onErrorAlert')){
	// 			this.executeMethod('onErrorAlert',msg);//No I18N
	// 		}
	// 	}
	// },
	toggleDealsField : function(value){
		var spclFldAcc = this.data.allFields.filter((fld)=>fld.cxAccordion && fld.cxAccordionName == "special_field")[0]
		var fields = spclFldAcc ? spclFldAcc.cxFields : [];
		len = fields ? fields.length : 0;
		for(i = 0;i<len;i++){
			if(["cxFilter_Deal_Amount","cxFilter_Deal_Stage","cxFilter_Deal_Owner","cxFilter_Deal_Closing_Date"].indexOf(fields[i].api_name) != -1){//no i18n
				Lyte.objectUtils(fields[i],"add",{"classInFilter" : value});//no i18n
				if( value == "hide" ){
					$("#field_"+fields[i].api_name)[0].ltProp("checked",false);
				}
			}
		}
		var fields = this.data.appliedFields , len = fields.length;
		for(i = 0;i<len;i++){
			if(["cxFilter_Deal_Amount","cxFilter_Deal_Stage","cxFilter_Deal_Owner","cxFilter_Deal_Closing_Date"].indexOf(fields[i].api_name) != -1 ){//no i18n
				Lyte.objectUtils(fields[i],"add",{"classInFilter" : value });//no i18n
				if( value == "hide" ){
					$("#field_"+fields[i].api_name)[0].ltProp("checked",false);
				}
			}
		}
		var searchNode = this.$node.querySelector('#searchId');
		if(searchNode && searchNode.ltProp("value")){
			searchNode.setValue(searchNode.ltProp("value"));//no i18n
		}
	},
	// togglePredictionField : function(field , status){
	// 	var predField = ["cxFilter_Likely_to_convert","cxFilter_Recent_prediction_score","cxFilter_Prediction_Score","cxFilter_Records_to_focus"];//no i18n
	// 	// if(predField.indexOf(field.api_name) != -1){
	// 		var node,i = 0 ; len = predField.length;
	// 		for( i = 0 ; i < len ; i++ ){
	// 			if( predField[i] != field.api_name ){
	// 				 // node = $L("#field_"+predField[i]);//no i18n
	// 				var f =this.data.special_field.filter(function(t){return t.api_name == predField[i]});//eslint-disable-line no-loop-func
	// 				if(!f[0]){
	// 					f =this.data.appliedFields.filter(function(t){return t.api_name == predField[i]});//eslint-disable-line no-loop-func
	// 				}
	// 				if( status ){
	// 					Lyte.objectUtils(f[0],"add","classInFilter","hide");//no i18n
	// 				}else{
	// 					Lyte.objectUtils(f[0],"add","classInFilter","dB");//no i18n
	// 				}
	// 			}
	// 		}
	// 		var searchNode = $("#searchId");
	// 		if(searchNode[0] && searchNode[0].ltProp("value")){
	// 			searchNode = searchNode[0];
	// 			searchNode.setValue(searchNode.ltProp("value"));//no i18n
	// 		}
	// 	},
		// getDisplayValue : function(value, field){
		// 	var ret = [];
		// 	value.forEach(function(display_value){
		// 		var found = false;
		// 		field.pick_list_values.forEach(function(val){
		// 			if(val.display_value == display_value){
		// 				ret.push(val.actual_value);
		// 				found = true;
		// 				return;
		// 			}
		// 		});
		// 		if(!found){
		// 			ret.push(display_value);
		// 		}
		// 	});
		// 	return ret;
		// },
		getActualValue : function(value, field){
			var ret = [];
			value.forEach(function(actual_value){
				var found = false;
				field.pick_list_values.forEach(function(val){
					if(val.actual_value == actual_value){
						ret.push(val.display_value);
						found = true;
						return;
					}
				});
				if(!found){
					ret.push(actual_value);
				}
			});
			return ret;
		},
		isThresholdSupportedModule: function(module_name){
			if(typeof moduleRecordMapping == "undefined" || typeof Crm == "undefined" || !moduleRecordMapping.Thresholds || !Crm.isRestrictionEnabled || (Crm.restrictionEnabledModules && !Crm.restrictionEnabledModules.contains(module_name)) || Crm.userDetails.PROFILE_NAME !== "Administrator"){
				return false;
			}
			return true;
		},
		getThresholdUsersName : function(users){
			var userListsName = "";
			users.forEach((user,index) => {
				userListsName += (index > 0 && index < users.length) ? ', ' : '';
				userListsName += user.name;
			})
			return userListsName;
		},
		renderCompetitorFields: function(crossFilter,thisScope){
			var competitor_name_criteria = {};
			var competitor_duration_criteria = {};
			var competitor_sentiment_criteria = {};
			var nameField = null;
			var isNameEmptyCheck = false;
			var sentiment = null;
			if(crossFilter.criteria){
				if(crossFilter.criteria.group){
					var innerGroup = crossFilter.criteria.group.filter((filter) => {return filter.group;})[0].group;
					// if(!innerGroup.group){
						var durationIndex = crossFilter.criteria.group[1].group.findIndex((field) => {return field.field.api_name === "crmcompetitormentions_created_time__s"});
						competitor_duration_criteria = {
							"api_name": "Competitor_Duration",
							"comparator": crossFilter.criteria.group[1].group[durationIndex].comparator,
							"value": crossFilter.criteria.group[1].group[durationIndex].value,
							"type": "date"
						}
					// }
					if(crossFilter.criteria.group[0].group){
						var crossFilterNameField = crossFilter.criteria.group[0].group.filter((field) => {return field.comparator.includes('starts_with') || field.comparator.includes('ends_with')})[0];
						sentiment = crossFilterNameField.field.api_name.includes('positive') ? _cruxUtils.getI18n('crm.sentiment.Positive') : crossFilterNameField.field.api_name.includes('negative') ? _cruxUtils.getI18n('crm.sentiment.Negative') : crossFilterNameField.field.api_name.includes('neutral') ? _cruxUtils.getI18n('crm.sentiment.Neutral') : _cruxUtils.getI18n('crm.sentiment.Positive');
						nameField = {comparator: crossFilterNameField.comparator,value: crossFilterNameField.value}
					}
					else{
						sentiment = crossFilter.criteria.group[0].field.api_name.includes('positive') ? _cruxUtils.getI18n('crm.sentiment.Positive') : crossFilter.criteria.group[0].field.api_name.includes('negative') ? _cruxUtils.getI18n('crm.sentiment.Negative') : crossFilter.criteria.group[0].field.api_name.includes('neutral') ? _cruxUtils.getI18n('crm.sentiment.Neutral') : _cruxUtils.getI18n('crm.sentiment.Positive');
					}
					competitor_name_criteria = {
						"api_name": "Competitor_Name",
						"comparator": nameField ? nameField.comparator : crossFilter.criteria.group[0].comparator,
						"value": nameField ? nameField.value : crossFilter.criteria.group[0].comparator === 'equal' || crossFilter.criteria.group[0].comparator === 'not_equal' ? crossFilter.criteria.group[0].value.split(';') :crossFilter.criteria.group[0].value,
						"type": "picklist"
					}
					competitor_sentiment_criteria = {
						"api_name": "Competitor_Sentiment",
						"comparator": "equal",
						"value": [sentiment],
						"type": "picklist"
					}
					
				}
				else{
					isNameEmptyCheck = true;
					 competitor_name_criteria = {
						"api_name": "Competitor_Name",
						"comparator": crossFilter.criteria.comparator ,
						"value": crossFilter.include_objects ? "${NOTEMPTY}" : "${EMPTY}",
						"type": "picklist"
					}
				}
				thisScope.$node.querySelector('#sub_option_Competitor_Name').component.setData('cxPropCriteria',competitor_name_criteria);
				if(!isNameEmptyCheck){
					thisScope.$node.querySelector('#sub_option_Competitor_Duration').component.setData('cxPropCriteria',competitor_duration_criteria);
					thisScope.$node.querySelector('#sub_option_Competitor_Sentiment').component.setData('cxPropCriteria',competitor_sentiment_criteria);
				}
			}
	},
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAriaFilter();
		}
	}.observes('cxPropAria').on('didConnect')
	// }
},{
	mixins: ["crux-filter-utils","crux-element-validation", "crux-aria-smart-filter-mixin"]//No I18N
});


/**
 * @syntax nonYielded
 * <crux-smart-filter cx-prop-fields='[{"api_name": "field_1", "filterable" : true,"visible" : true, "available_in_user_layout" : true, "data_type" : "text","field_label": "Lead Name"},{"api_name": "field_2", "filterable" : true,"visible" : true, "available_in_user_layout" : true,"data_type" : "text", "field_label": "Contact Name"}]' cx-prop-search-label="Filter By" cx-prop-search=true></crux-smart-filter>
 */

Lyte.Component.register("crux-smart-filter-input", {
_template:"<template tag-name=\"crux-smart-filter-input\"> <template is=\"if\" value=\"{{rendered}}\"><template case=\"true\"> <lyte-messagebox lt-prop-type=\"error\" id=\"errorMessage\"></lyte-messagebox> <template is=\"if\" value=\"{{expHandlers(field.cxFieldsDetails,'&amp;&amp;',field.renderNew)}}\"><template case=\"true\"> <div class=\"{{if(expHandlers(expHandlers(ifEquals(field.api_name,'Competitor_Duration'),'||',ifEquals(field.api_name,'Competitor_Sentiment')),'||',ifEquals(field.api_name,'Competitor_Name')),'','paddingElm cxSmFrInputWrapper')}}\"> <template is=\"for\" items=\"{{field.cxFieldsDetails}}\" item=\"rowObj\" index=\"fldInd\"> <div class=\"\"> <template is=\"if\" value=\"{{rowObj.cxLabel}}\"><template case=\"true\"> <span class=\"mR2\">{{rowObj.cxLabel}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxDropDown_1,'&amp;&amp;',rowObj.cxDropDown_1.cxShow)}}\"><template case=\"true\"> <lyte-dropdown class=\"{{rowObj.cxDropDown_1.class}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"cxDropDown_1_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"cxDropDown_1_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(rowObj.cxDropDown_1.selectedValue)}}\" on-option-selected=\"{{method('getDropDownVal')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{rowObj.cxDropDown_1.values}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxElement_1,'&amp;&amp;',rowObj.cxElement_1.cxShow)}}\"><template case=\"true\"> <template is=\"component\" class=\"{{rowObj.cxElement_1.class}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(rowObj.cxElement_1,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{rowObj.cxElement_1.maxValue}}\" cx-prop-minvalue=\"{{rowObj.cxElement_1.minValue}}\" cx-prop-maxlength=\"{{rowObj.cxElement_1.maxLength}}\" cx-prop-placeholder=\"{{rowObj.cxElement_1.placeholder}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{rowObj.cxElement_1.cxClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{rowObj.cxElement_1}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{rowObj.cxElement_1.selectedValue}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{rowObj.cxElement_1.cxDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"true\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{rowObj.cxElement_1.cxDisableExtraValue}}\" cx-prop-type=\"{{rowObj.cxElement_1.cxType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{rowObj.cxElement_1.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"id_{{cruxReplace(field.api_name,'[/.]','_')}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxElement_2,'&amp;&amp;',rowObj.cxElement_2.cxShow)}}\"><template case=\"true\"> <template is=\"component\" class=\"{{rowObj.cxElement_2.class}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(rowObj.cxElement_2,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{rowObj.cxElement_2.maxValue}}\" cx-prop-minvalue=\"{{rowObj.cxElement_2.minValue}}\" cx-prop-maxlength=\"{{rowObj.cxElement_2.maxLength}}\" cx-prop-placeholder=\"{{rowObj.cxElement_2.placeholder}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{rowObj.cxElement_2.cxClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{rowObj.cxElement_2}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{rowObj.cxElement_2.selectedValue}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{rowObj.cxElement_2.cxDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"true\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{rowObj.cxElement_2.cxDisableExtraValue}}\" cx-prop-type=\"{{rowObj.cxElement_2.cxType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{rowObj.cxElement_2.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"id_{{cruxReplace(field.api_name,'[/.]','_')}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(rowObj.cxDropDown_2,'&amp;&amp;',rowObj.cxDropDown_2.cxShow)}}\"><template case=\"true\"> <lyte-dropdown class=\"{{rowObj.cxDropDown_2.class}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"cxDropDown_2_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"cxDropDown_2_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(rowObj.cxDropDown_2.selectedValue)}}\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"for\" items=\"{{crossFields}}\" item=\"Obj\" index=\"index\"> <template is=\"if\" value=\"{{Obj.isCheckBox}}\"><template case=\"true\"> <div class=\"facet mL10\"><lyte-checkbox title=\"{{Obj.field_label}}\" value=\"{{Obj.api_name}}\" data-zcqa=\"\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,Obj)}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('inputValueChanged',Obj,true)}}\"></lyte-checkbox> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(Obj.isRadioBtn,'!==',false)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"{{field.column_name}}_{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{radioBtnIsSelected(field,Obj,true)}}\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('getCrossFieldOption',index,Obj)}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(Obj.showSubField,'!==',false)}}\"><template case=\"true\"> <crux-smart-filter-input class=\"{{Obj.cxClass}}\" id=\"sub_option_{{Obj.api_name}}\" cx-prop-field=\"{{Obj}}\" module=\"{{if(ifEquals(module,'Activities'),Obj.module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',Obj,false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> </template> </div> </template> </div> </template><template case=\"false\"> <div class=\"{{if(expHandlers(expHandlers(ifEquals(field.api_name,'Competitor_Duration'),'||',ifEquals(field.api_name,'Competitor_Sentiment')),'||',ifEquals(field.api_name,'Competitor_Name')),'','paddingElm cxSmFrInputWrapper')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.cxFilter_RecordAction,'==',true),'||',expHandlers(field.api_name,'==',&quot;Recommendation&quot;))}}\"><template case=\"true\"> <div class=\"cxSmartFilterTwoCol\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"record_{{field.field_label}}\" class=\"{{dropDownWidth.headDropDownWidth}}\" id=\"record_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-selected=\"{{lbind(selectedValues.headDropDownValue)}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{field.values}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'===',&quot;SimilarityAvailable&quot;)}}\"><template case=\"true\"> <div class=\"facet mB5\"> <div class=\"cxSmartFilterInputSimAvailable \"> <div class=\"facet mL20 mB10\"> <lyte-checkbox title=\"{{crossFields[0].field_label}}\" data-zcqa=\"{{field.column_name}}_{{crossFields[0].api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,crossFields[0])}}\" id=\"sub_field_{{crossFields[0].api_name}}\" lt-prop-value=\"{{crossFields[0].api_name}}\" lt-prop-label=\"{{crossFields[0].field_label}}\" on-changed=\"{{method('getCrossFieldOption',null,crossFields[0])}}\"> </lyte-checkbox> <template is=\"if\" value=\"{{similarity.isScore}}\"><template case=\"true\"> <crux-smart-filter-input id=\"sub_option_{{crossFields[0].api_name}}\" cx-prop-field=\"{{crossFields[0]}}\" module=\"{{if(ifEquals(module,'Activities'),crossFields[0].module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',crossFields[0],false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"> </crux-smart-filter-input> </template></template> </div> <div class=\"facet mL20 mB10\"> <lyte-checkbox title=\"{{crossFields[1].field_label}}\" data-zcqa=\"{{field.column_name}}_{{crossFields[1].api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,crossFields[1])}}\" id=\"sub_field_{{crossFields[1].api_name}}\" lt-prop-value=\"{{crossFields[1].api_name}}\" lt-prop-label=\"{{crossFields[1].field_label}}\" on-changed=\"{{method('getCrossFieldOption',null,crossFields[1])}}\"> </lyte-checkbox> <template is=\"if\" value=\"{{similarity.isRecords}}\"><template case=\"true\"> <crux-smart-filter-input id=\"sub_option_{{crossFields[1].api_name}}\" cx-prop-field=\"{{crossFields[1]}}\" module=\"{{if(ifEquals(module,'Activities'),crossFields[1].module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',crossFields[1],false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"> </crux-smart-filter-input> </template></template> </div> </div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;Recommendation&quot;),'&amp;&amp;',renderRecommendation)}}\"><template case=\"true\"> <div class=\"facet mB5\"> <div class=\"mB0\"> <template is=\"if\" value=\"{{expHandlers(selectedValues.headDropDownValue,'===',&quot;selected&quot;)}}\"><template case=\"true\"> <div class=\"dB mB5 \"> <lyte-dropdown lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" class=\"w260 cxMXNFld\" id=\"multiSelect_lookup_{{cruxReplace(field.api_name,'[/.]','_')}}_infield\" lt-prop-yield=\"true\" on-add=\"{{method('addToList','Recommendation_infield')}}\" on-remove=\"{{method('removeFromList')}}\" on-show=\"{{method('onShowDropBox')}}\" on-hide=\"{{method('onBeforeHide')}}\" lt-prop-type=\"multisearch\" on-option-selected=\"{{method('inputValueChanged')}}\" on-value-change=\"{{method('changeUserInputValue')}}\" lt-prop-selected=\"{{selectedValues.multiSelectFieldValue1}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"dB\"> <div class=\"lyteMultiselect\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{renderItems2}}\" item=\"selitem\" index=\"indexval\"> <li id=\"renderItems_{{selitem[lookupDisplayField]}}_infield\" class=\"rec\" data-value=\"{{selitem.id}}\"> <span class=\"lyteDropdownVisible\">{{selitem[lookupDisplayField]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input id=\"{{field.api_name}}_infield_Search_val\" on-value-change=\"{{method('onSearch')}}\" onclick=\"{{action('toggleDropDown',field,'Recommendation_infield')}}\" lt-prop-placeholder=\"{{placeholderValue[0]}}\"></lyte-input> </li> </ul> </div> </lyte-drop-button> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox lookup_result_Box\"> <lyte-drop-body class=\"result_items\"> <template is=\"if\" value=\"{{displayMsg.multiLookupMsg}}\"><template case=\"true\"> <div id=\"display_msg_{{cruxReplace(field.api_name,'[/.]','_')}}\" class=\"select2-results__option select2-results__message\">{{displayMsg.multiLookupMsg}}</div> </template></template> <template is=\"for\" items=\"{{lookUpArray}}\" item=\"item\" index=\"indval\"> <lyte-drop-item id=\"campaign_{{item[lookupDisplayField]}}\" class=\"campaigns_item\" data-value=\"{{item.id}}\" data-zcqa=\"{{field.field_label}}_{{item[lookupDisplayField]}}\"> {{item[lookupDisplayField]}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <div class=\"cxSmartFilterLabelWrap\"> <span class=\"cxSmartFilterLabel \">{{cruxGetI18n('crm.filter.label.in')}}</span> </div> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.FirstTime,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.first_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.FirstTime[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.FirstTime[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Dependent,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.cross_selling)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Dependent[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Dependent[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Bundle,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.bundle)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Bundle[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Bundle[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Repeat,'!==',undefined)}}\"><template case=\"true\"> <div class=\"cxSmartFilterLabelWrap\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.re_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Repeat[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Repeat[dropdownDispValue]}}\"></lyte-checkbox> </div> <div class=\"cxSmartFilterLabelWrap\"> <template is=\"if\" value=\"{{recommendationBasedOn.re_buy}}\"><template case=\"true\"> <span class=\"mR5 cxSmartFilterLabelContent \" style=\"font-size: 14px;\">{{cruxGetI18n('crm.filter.label.and.purchase.in')}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(selectedValues.firstDropDownValue,'==',&quot;CUSTOM&quot;)}}\"><template case=\"true\"> <div id=\"Recommendation_custom_div1\"> <crux-date-component cx-prop-from=\"filter\" cx-prop-class=\"w100\" id=\"Recommendation_custom\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{lbind(selectedValues.headDateValue)}}\"></crux-date-component> </div> </template></template> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(recommendationBasedOnOption.Sequence,'!==',undefined)}}\"><template case=\"true\"> <div class=\"dB mB5 mT10\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(recommendationBasedOn.next_buy)}}\" lt-prop-name=\"RecommendationBasedOn\" lt-prop-value=\"{{recommendationBasedOnOption.Sequence[dropdownSysValue]}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdownSysValue\" lt-prop-label=\"{{recommendationBasedOnOption.Sequence[dropdownDispValue]}}\"></lyte-checkbox> </div> </template></template> </div> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.cxFieldsDetails,'&amp;&amp;',field.cxFieldsDetails[0]),'||',expHandlers(field.field_data_type,'==',&quot;custom&quot;)),'||',expHandlers(field.api_name,'==',&quot;cxFilter_Email_Sentiment&quot;)),'||',expHandlers(field.api_name,'==',&quot;best_time&quot;))}}\"><template case=\"true\"> <div class=\"cxSmartFilterTwoCol {{if(expHandlers(field.api_name,'==','best_time'),'mT10')}}\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.cxFieldsDetails,'!'),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Status&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Sentiment&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;best_time&quot;))}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{cruxGetI18n('crm.label.By')}}</span> </template></template> <template is=\"if\" value=\"{{field.cxFieldsDetails}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{field.cxFieldsDetails[0].cxLabel}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;best_time&quot;)}}\"><template case=\"true\"> <span class=\"mR5\">{{cruxGetI18n('crm.label.available')}}</span> </template></template> <lyte-dropdown class=\"w150\" lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"by_{{field.field_label}}\" id=\"by_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('showSentStatus',field)}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.byDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{bydropdownOption}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(userDetails,'&amp;&amp;',expHandlers(userDetails.NBX_GOAL,'!')),'&amp;&amp;',expHandlers(field.data_type,'===',&quot;NBX&quot;)),'&amp;&amp;',expHandlers(field.api_name,'===',&quot;NBX_Available&quot;))}}\"><template case=\"true\"> <crux-picklist-component cx-prop-from=\"filter\" cx-prop-box-class=\"cxSmartFilterDropbox\" data-zcqa=\"NBX_ACTIVITY_OPTION\" id=\"NBX_ACTIVITY_OPTION\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-field=\"{{field}}\"> </crux-picklist-component> <div class=\"mT5\"> <span class=\"mR5 cxPickListContent dIB cxVam\">{{cruxGetI18n('crm.zia.nbx.filter.due')}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"NBX_TIME_OPTION\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <div class=\"cvRowField\"> <template is=\"if\" value=\"{{expHandlers(field.parent_field,'==',&quot;prediction&quot;)}}\"><template case=\"true\"> <div class=\"cxPredictionContent\"> <template is=\"if\" value=\"{{expHandlers(predictionSelectedType.first,'||',predictionSelectedType.second)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <span class=\" cxPredictionSelectedTypeContent mR5 dIB cxVam mB10\">{{predictionSelectedType.predict_field[0].field_label}}</span> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.api_name}}\" lt-prop-freeze=\"true\" id=\"criteria_comparator\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','prediction_criteria')}}\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{predictionOptions.criteria_operator}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" data-zcqa=\"{{item['display']}}\"> {{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(criteriaDisplay,'&amp;&amp;',expHandlers(isCriteriaBetween,'==',false)),'&amp;&amp;',expHandlers(showSecondDropdownType,'!=',&quot;date&quot;))}}\"><template case=\"true\"> <div class=\"{{if(ifEquals(predictionEle,'date'),'cxShowSecondDropdownType','')}}\"> <template is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-class=\"mB5 {{setWidth}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue}}\"></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(showSecondDropdownType,'==',&quot;date&quot;)}}\"><template case=\"true\"> <div class=\"cxShowSecondDropdownContent\"> <crux-number-component cx-prop-from=\"filter\" data-zcqa=\"dateInput\" id=\"dateInput\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.dateVal)}}\"> </crux-number-component> <lyte-dropdown class=\"w80\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.column_name}}_dateOptions\" id=\"second_{{field.api_name}}_dropdown\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.secondDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template></template></template> </div> <template is=\"if\" value=\"{{expHandlers(criteriaDisplay,'&amp;&amp;',isCriteriaBetween)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <div class=\"mB5\"> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction_0\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue0}}\"></template> <span class=\"cxCriteriaDisplayContent\"> - </span> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"criteria_prediction\" id=\"criteria_prediction_1\" component-name=\"crux-{{predictionEle}}-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{predictionSelectedType.criteria_fields[0]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{selectedValues.criteriaValue1}}\"></template> </div> </div> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{predictionSelectedType.completed}}\"><template case=\"true\"> <div class=\"mL10\"> <lyte-radiobutton tabindex=\"0\" data-zcqa=\"{{successFailureOption[0].display}}\" id=\"sub_field_{{successFailureOption[0].system}}\" lt-prop-name=\"option_{{field.api_name}}\" lt-prop-value=\"{{successFailureOption[0].system}}\" lt-prop-label=\"{{successFailureOption[0].display}}\" lt-prop-type=\"primary\" on-checked=\"{{method('getCrossFieldOption',0,successFailureOption[0])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <template is=\"if\" value=\"{{expHandlers(expHandlers(isSuccess,'==',&quot;true&quot;),'&amp;&amp;',expHandlers(isSuccess,'!=',&quot;undefined&quot;))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"successFailureDropDown\" class=\"mT10\" id=\"record_{{field.api_name}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_SF')}}\" lt-prop-selected=\"{{lbind(selectedOptionSf)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{successFailureDropDown}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <div class=\"mL10\"> <lyte-radiobutton tabindex=\"0\" data-zcqa=\"{{successFailureOption[1].display}}\" id=\"sub_field_{{successFailureOption[1].system}}\" lt-prop-name=\"option_{{field.api_name}}\" lt-prop-value=\"{{successFailureOption[1].system}}\" lt-prop-label=\"{{successFailureOption[1].display}}\" lt-prop-type=\"primary\" on-checked=\"{{method('getCrossFieldOption',1,successFailureOption[1])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <template is=\"if\" value=\"{{expHandlers(expHandlers(isSuccess,'!=',&quot;true&quot;),'&amp;&amp;',expHandlers(isSuccess,'!=',&quot;undefined&quot;))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"successFailureDropDown\" class=\"mT10\" id=\"record_{{field.api_name}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_SF')}}\" lt-prop-selected=\"{{lbind(selectedOptionSf)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{successFailureDropDown}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> </template></template></template></template> <template is=\"if\" value=\"{{expHandlers(predictionSelectedType.score_field,'!=',undefined)}}\"><template case=\"true\"> <div class=\"cvRowField\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(isScoreSelected)}}\" id=\"scoreCheckBox\" lt-prop-name=\"{{predictionSelectedType.score_field.api_name}}\" lt-prop-value=\"{{predictionSelectedType.score_field.id}}\" data-zcqa=\"by_{{field.field_label}}\" lt-prop-label=\"{{cruxGetI18n('crm.zia.prediction.likelihood')}}\" class=\"mT5 mB10\"> </lyte-checkbox> <template is=\"if\" value=\"{{isScoreSelected}}\"><template case=\"true\"> <lyte-dropdown class=\"{{setWidth}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.api_name}}\" lt-prop-freeze=\"true\" id=\"score_criteria_comparator\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','score_criteria')}}\" lt-prop-selected=\"{{lbind(selectedValues.scoreComparator)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{predictionOptions.score_operator}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" data-zcqa=\"{{item['display']}}\"> {{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(scoreCriteriaDisplay,'&amp;&amp;',expHandlers(isScoreBetween,'==',false))}}\"><template case=\"true\"> <template is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction\" component-name=\"crux-number-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-maxlength=\"3\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue)}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(scoreCriteriaDisplay,'&amp;&amp;',isScoreBetween)}}\"><template case=\"true\"> <div class=\"mB5\"> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction_0\" component-name=\"crux-number-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-maxlength=\"3\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue0)}}\"></template> <span class=\"cxScoreCriteriaDisplay\"> - </span> <template cx-prop-class=\"w100\" is=\"component\" data-zcqa=\"score_criteria_prediction\" id=\"score_criteria_prediction_1\" component-name=\"crux-number-component\" cx-prop-minvalue=\"0\" cx-prop-maxvalue=\"100\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" cx-prop-module=\"{{module}}\" cx-prop-maxlength=\"3\" cx-prop-field=\"{{if(predictionSelectedType.first,predictionSelectedType.score_field[0],predictionSelectedType.score_field[1])}}\" cx-prop-appearance=\"box\" on-value-change=\"{{method('changeUserInputValue',this)}}\" cx-prop-value=\"{{lbind(selectedValues.scoreValue1)}}\"></template> </div> </template></template> </template></template> </div> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(predictionSelectedType.first,'||',predictionSelectedType.second),'&amp;&amp;',isTrendShown)}}\"><template case=\"true\"> <lyte-checkbox on-changed=\"{{method('observeDropDownChanges')}}\" lt-prop-checked=\"{{lbind(isTrendSelected)}}\" id=\"trendCheckBox\" data-zcqa=\"by_{{field.field_label}}\" class=\"cxSfTrendCheckbox\"> </lyte-checkbox> <lyte-dropdown class=\"w150\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"trend\" id=\"record_{{field.api_name}}\" lt-prop-selected=\"{{lbind(selectedTrend)}}\" lt-prop-disabled=\"{{if(ifEquals(isTrendSelected,false),true,false)}}\" lt-prop-index=\"1\" on-change=\"{{method('observeDropDownChanges')}}\" on-option-selected=\"{{method('inputValueChanged','prediction_trend')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{trendOption}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(options.length,'&amp;&amp;',firstDropdown),'&amp;&amp;',expHandlers(field.api_name,'!==',&quot;SimilarityRecords&quot;)),'&amp;&amp;',expHandlers(field.data_type,'!==',&quot;NBX&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!==',&quot;Competitor_Sentiment&quot;)),'&amp;&amp;',expHandlers(field.field_data_type,'!==',&quot;crossModule&quot;))}}\"><template case=\"true\"> <lyte-dropdown class=\"{{setWidth}} {{setMargin}}\" lt-prop-boundary=\"{{boundary}}\" data-zcqa=\"filter_{{field.field_label}}\" lt-prop-freeze=\"true\" id=\"DDV_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('getDropDownVal')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.firstDropDownValue)}}\" before-select=\"{{method('beforeSelectDropDown')}}\" lt-prop-disabled-list=\"{{optionsDisabledList}}\" on-before-show=\"{{method('beforeOptionsSet')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{options}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\" data-custom-tooltip=\"{{if(item.cxTitle,'true','false')}}\" lt-prop-title=\"{{item.cxTitle}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxElement1,'&amp;&amp;',valuePrefixDropdownOpt.prefixOption),'&amp;&amp;',valuePrefixDropdownOpt.prefixOption.length)}}\"><template case=\"true\"> <crux-dropdown id=\"cxPrefixDD\" data-zcqa=\"cxPrefixdropdown\" cx-prop-options=\"{{valuePrefixDropdownOpt.prefixOption}}\" cx-prop-user-value=\"display_value\" cx-prop-system-value=\"actual_value\" on-option-select=\"{{method('onPrefixSelection')}}\" cx-prop-selected=\"{{valuePrefixDropdownOpt.selected.actual_value}}\"></crux-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(selectedValues.firstDropDownValue,'==',&quot;CUSTOM&quot;)}}\"><template case=\"true\"> <div id=\"Recommendation_custom_div\"> <crux-date-component cx-prop-from=\"filter\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-class=\"w100\" id=\"Recommendation_custom\" cx-prop-value=\"{{selectedValues.headDateValue}}\"></crux-date-component> </div> </template></template> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'||',expHandlers(expHandlers(field.field_data_type,'===',&quot;multirelation&quot;),'||',expHandlers(expHandlers(field.field_data_type,'==',&quot;multiselectlookup&quot;),'&amp;&amp;',expHandlers(field.ui_type,'!=',445)))),'||',expHandlers(field.api_name,'===',&quot;SimilarityRecords&quot;)),'||',isChildFieldLookup)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'&amp;&amp;',opt1.length)}}\"><template case=\"true\"> <div> <lyte-dropdown class=\"w250\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.field_label}}_filterOptions\" id=\"DDV1_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.headDropDownValue)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{opt1}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <lyte-dropdown lt-prop-freeze=\"true\" lt-prop-boundary=\"{{boundary}}\" class=\"cxBoxDropdown {{if(expHandlers(field.api_name,'===','SimilarityRecords'),w150,w250)}} dB cxMXNFld\" id=\"multiSelect_lookup_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-yield=\"true\" on-add=\"{{method('addToList',field.api_name)}}\" on-remove=\"{{method('removeFromList')}}\" on-show=\"{{method('onShowDropBox',field.api_name,this)}}\" on-hide=\"{{method('onBeforeHide')}}\" lt-prop-type=\"multisearch\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" lt-prop-selected=\"{{lbind(selectedValues.multiSelectFieldValue)}}\" lt-prop=\"{{childCompProps}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"dB\"> <div class=\"lyteMultiselect\"> <ul class=\"lyteMultipleSelect\"> <template is=\"for\" items=\"{{renderItems}}\" item=\"selitem\" index=\"indexval\"> <li id=\"renderItems_{{selitem[lookupDisplayField]}}\" class=\" lyteMultipleSelect {{if(ifEquals(indexval,0),'')}}\" data-value=\"{{selitem.id}}\"> <span class=\"lyteDropdownVisible\">{{selitem[lookupDisplayField]}}</span> <lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove> </li> </template> <li class=\"lyteMultiselectInput\"> <lyte-input id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_Search_val\" on-value-change=\"{{method('onSearch')}}\" onclick=\"{{action('toggleDropDown',field,'',this)}}\" lt-prop-placeholder=\"{{placeholderValue[0]}}\" onkeydown=\"{{action('preventDefault',this,event)}}\"></lyte-input> </li> </ul> </div> </lyte-drop-button> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox lookup_result_Box {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body class=\"result_items\"> <template is=\"if\" value=\"{{displayMsg.multiLookupMsg}}\"><template case=\"true\"> <div id=\"display_msg_{{cruxReplace(field.api_name,'[/.]','_')}}\" class=\"select2-results__option select2-results__message\">{{displayMsg.multiLookupMsg}}</div> </template></template> <template is=\"for\" items=\"{{lookUpArray}}\" item=\"item\" index=\"indval\"> <lyte-drop-item id=\"campaign_{{item[lookupDisplayField]}}\" class=\"campaigns_item\" data-value=\"{{item.id}}\" data-zcqa=\"{{field.field_label}}_{{item[lookupDisplayField]}}\"> {{item[lookupDisplayField]}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'==',&quot;cxFilter_Campaigns&quot;),'&amp;&amp;',memberStatus)}}\"><template case=\"true\"> <div id=\"memberStatus\"> <template is=\"component\" cx-prop-class=\"w250 dB\" data-zcqa=\"memberStatus\" id=\"memberStatusField\" component-name=\"crux-picklist-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-box-class=\"cxSmartFilterDropbox\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value2}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.filters.select.campaign.status',cruxGetI18n('campaign.Member'))}}\" cx-prop-id=\"memberStatus\" cx-prop-appearance=\"box\"></template> </div> <template is=\"if\" value=\"{{expHandlers(field.serviceStatus,'&amp;&amp;',field.serviceStatus.length)}}\"><template case=\"true\"> <div id=\"serviceStatus\"> <template is=\"component\" cx-prop-class=\"w250 dB\" data-zcqa=\"serviceStatus\" id=\"serviceStatusField\" component-name=\"crux-picklist-component\" cx-prop-disable-extra-value=\"true\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-box-class=\"cxSmartFilterDropbox\" cx-prop-field=\"{{field}}\" cx-prop-picklist-values=\"{{field.serviceStatus}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.Service_Status}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.filters.select.campaign.status',cruxGetI18n('Service'))}}\" cx-prop-id=\"serviceStatus\"></template> </div> </template></template> </template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(cruxElement1,'&amp;&amp;',expHandlers(isChildFieldLookup,'!')),'&amp;&amp;',expHandlers(showSecondDropdownType,'!=',&quot;between&quot;))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAssetsCompMapping[field.api_name]}}\"><template case=\"true\"> <template is=\"component\" component-name=\"{{cruxAssetsCompMapping[field.api_name]}}\" field=\"{{field}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" comparator=\"{{selectedValues.firstDropDownValue}}\" selected-value=\"{{selectedValues.value1}}\" criteria=\"{{cxPropCriteria}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" from=\"smart_filter\"></template> </template><template case=\"false\"> <template is=\"component\" cx-prop-box-class=\"cxSmartFilterDropbox\" class=\"{{field.cxFilterClass.cruxElement1}}\" cx-prop-request-model=\"{{roleRequestModel}}\" cx-prop-logged-in-user-role-required=\"{{if(ifEquals(roleRequestModel,'role'),'true','false')}}\" cx-prop-show-lookup-icon=\"{{if(ifEquals(cruxElement1,'role'),false,true)}}\" cx-prop-field-key=\"field_label\" cx-prop-zcqa=\"{{field.display_field_label}}_input\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-placeholder=\"{{placeholderValue[0]}}\" cx-prop-module=\"{{module}}\" cx-prop-class=\"{{numberDropClass}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement1}}-component\" cx-prop-from=\"filter\" cx-prop-value=\"{{selectedValues.value1}}\" cx-prop-field=\"{{field}}\" cx-prop-decimal-allowed=\"{{numberFieldDecimal}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-login-user=\"{{field.cxLoginUser}}\" onkeydown=\"{{action('inputValidate',this,event,field)}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-disable-extra-value=\"{{field.cxDisableExtraValue}}\" cx-prop-type=\"{{field.cxPropType}}\" cx-prop-appearance=\"box\" cx-prop-max-count=\"{{field.maxCount}}\" cx-prop-query-param=\"{{userProperty.queryParam}}\" cx-prop-is-subordinate=\"{{userProperty.isSubordinate}}\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop-id=\"{{elementsCompId}}\" cx-prop-callback-delay=\"{{defaultUndefined}}\" cx-prop=\"{{childCompProps}}\" cx-prop-min-max-validation=\"{{field.cxMinMaxValidate}}\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;percentage&quot;)}}\"><template case=\"true\"> <span class=\"present \">%</span> </template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cruxElement1,'&amp;&amp;',expHandlers(field.field_data_type,'==',&quot;picklist&quot;)),'&amp;&amp;',field.history_tracking),'&amp;&amp;',expHandlers(isChildInput,'!'))}}\"><template case=\"true\"> <div id=\"picklist_tracker_field\" class=\"facet p5 \"> <lyte-checkbox data-zcqa=\"history_Tracking\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_picklist_tracker\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone\" lt-prop-disabled=\"true\" lt-prop-label=\"{{cruxGetI18n('crm.events.duration')}}\" on-changed=\"{{method('picklistTrackerDuration')}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"></lyte-checkbox> <div id=\"durationField\" class=\"durationFilter pL20 pT10 eventNone op5\"> <lyte-dropdown data-zcqa=\"history_Tracking_Options\" lt-prop-freeze=\"true\" id=\"DDV1_{{cruxReplace(field.api_name,'[/.]','_')}}_picklistTracker\" lt-prop-index=\"1\" on-option-selected=\"{{method('getDropDownVal')}}\" lt-prop-user-value=\"display\" lt-prop-system-value=\"system\" lt-prop-options=\"{{durationOpt}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.HT_DropDownValue)}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"></lyte-dropdown> <template is=\"component\" data-zcqa=\"history_Tracking_value\" cx-prop-class=\"w100\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_historyTrackDurationDays\" component-name=\"crux-number-component\" cx-prop-maxlength=\"4\" cx-prop-decimal-allowed=\"false\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-value=\"{{value}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-appearance=\"box\"></template> <span class=\"cxAriaPrefixLabel present\" style=\"display: inline-block;\">{{cruxGetI18n('days')}}</span> </div> </div> </template></template></template></template><template is=\"if\" value=\"{{expHandlers(expHandlers(showSecondDropdownType,'==',&quot;date&quot;),'&amp;&amp;',expHandlers(expHandlers(field.api_name,'!=',&quot;Prediction_0&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;Prediction_1&quot;)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(field.ui_type,'==',132)}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\">{{cruxGetI18n('crm.label.simply.in')}}</span> </template></template> <lyte-dropdown class=\"{{field.cxFilterClass.secondDropDownClass}} mB7\" lt-prop-boundary=\"{{boundary}}\" lt-prop-freeze=\"true\" data-zcqa=\"{{field.column_name}}_dateOptions\" id=\"second_{{cruxReplace(field.api_name,'[/.]','_')}}_dropdown\" lt-prop-index=\"1\" on-option-selected=\"{{method('inputValueChanged','lyte-dropdown')}}\" on-change=\"{{method('observeDropDownChanges')}}\" lt-prop-selected=\"{{lbind(selectedValues.secondDropDownValue)}}\" lt-prop-box-class=\"cxSmartFilterDropbox\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox cxSmartFilterDropbox {{if(propFilterView,'newLvDropdown')}}\"> <lyte-drop-body> <template is=\"for\" items=\"{{dateoptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item[dropdownSysValue]}}\" data-zcqa=\"{{field.field_label}}_{{item[dropdownDispValue]}}\"> {{item[dropdownDispValue]}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(expHandlers(showSecondDropdownType,'==',&quot;between&quot;),'&amp;&amp;',expHandlers(expHandlers(field.api_name,'!=',&quot;Prediction_0&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;Prediction_1&quot;)))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxAssetsCompMapping[field.api_name]}}\"><template case=\"true\"> <div> <template is=\"component\" component-name=\"{{cruxAssetsCompMapping[field.api_name]}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" field=\"{{field}}\" selected-value=\"{{selectedValues.value1}}\" comparator=\"{{selectedValues.firstDropDownValue}}\" criteria=\"{{cxPropCriteria}}\" on-value-change=\"{{method('changeUserInputValue')}}\" on-error=\"{{method('beforeAlert')}}\" from=\"smart_filter\"></template> </div> </template><template case=\"false\"> <div> <template is=\"component\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-class=\"{{numberDropClass}}\" cx-prop-zcqa=\"fromdate_{{field.display_field_label}}\" id=\"{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement2}}-component\" cx-prop-from=\"filter\" cx-prop-module=\"{{module}}\" cx-prop-placeholder=\"{{placeholderValue[1]}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value1}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-appearance=\"box\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop=\"{{childCompProps}}\"></template> <span id=\"betweenDateText\"> - </span> <template is=\"component\" cx-prop-maxvalue=\"{{field.maxValue}}\" cx-prop-minvalue=\"{{field.minValue}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-class=\"{{numberDropClass}}\" cx-prop-zcqa=\"todate_{{field.display_field_label}}\" id=\"between_{{cruxReplace(field.api_name,'[/.]','_')}}_crux_comp\" component-name=\"crux-{{cruxElement2}}-component\" cx-prop-from=\"filter\" cx-prop-placeholder=\"{{placeholderValue[2]}}\" cx-prop-module=\"{{module}}\" cx-prop-field=\"{{field}}\" on-value-change=\"{{method('changeUserInputValue')}}\" cx-prop-value=\"{{selectedValues.value2}}\" on-error=\"{{method('beforeAlert')}}\" cx-prop-boundary=\"{{boundary}}\" cx-prop-appearance=\"box\" cx-prop-date-pattern=\"{{userDetails.DATE_PATTERN}}\" cx-prop=\"{{childCompProps}}\"></template> </div> </template></template> </template></template></template></template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cruxElement1,'!=',undefined),'&amp;&amp;',expHandlers(cruxElement1,'!=',&quot;&quot;)),'&amp;&amp;',expHandlers(field.field_data_type,'==',&quot;currency&quot;)),'&amp;&amp;',expHandlers(iscurrencyField,'==',true)),'&amp;&amp;',expHandlers(field.crypt,'!'))}}\"><template case=\"true\"> </template></template><template is=\"if\" value=\"{{expHandlers(field.api_name,'==',&quot;cxFilter_Email_Sentiment&quot;)}}\"><template case=\"true\"> <div class=\"andSectionEmailStat \">{{cruxGetI18n('and')}} <span id=\"clearEmailSentimentSubfield\" class=\"andsecClear cxTxtAR fR cxLink cP hide mR40\" style=\"display: inline;\" onclick=\"{{action('clearEmailSentiment')}}\">{{cruxGetI18n('crm.title.clear.name')}}</span> </div> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[0].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[0].api_name}}\" lt-prop-label=\"{{crossFields[0].field_label}}\" on-checked=\"{{method('getCrossFieldOption',0,crossFields[0])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <crux-smart-filter-input id=\"sub_option_{{crossFields[0].api_name}}\" cx-prop-field=\"{{crossFields[0]}}\" module=\"{{module}}\" on-value-change=\"{{method('inputValueChanged')}}\" ccx-prop-value=\"{{selectedValues.value1}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> <template is=\"if\" value=\"{{expHandlers(expHandlers(Email_Sentiment_Value,'==',2),'||',expHandlers(Email_Sentiment_Value,'==',3))}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[1].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[1].api_name}}\" lt-prop-label=\"{{crossFields[1].field_label}}\" on-checked=\"{{method('getCrossFieldOption',1,crossFields[1])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> <crux-smart-filter-input id=\"sub_option_{{crossFields[1].api_name}}\" cx-prop-field=\"{{crossFields[1]}}\" module=\"{{module}}\" on-value-change=\"{{method('inputValueChanged')}}\" cx-prop-value=\"{{selectedValues.value1}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> <template is=\"if\" value=\"{{expHandlers(Email_Sentiment_Value,'==',3)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"EMAILSENTIMENT:{{cruxReplace(field.api_name,'[/.]','_')}}\" id=\"sub_field_{{crossFields[2].api_name}}\" lt-prop-type=\"primary\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{crossFields[2].api_name}}\" lt-prop-label=\"{{crossFields[2].field_label}}\" on-checked=\"{{method('getCrossFieldOption',2,crossFields[2])}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template> </template></template> <template is=\"if\" value=\"{{sentStatusFlag}}\"><template case=\"true\"> <div style=\"margin-top: 5px; display: block;\"> <template is=\"if\" value=\"{{sentStatusFlag}}\"><template case=\"true\"> <strong class=\"cxAriaPrefixLabel\" style=\"color:#111\">{{cruxGetI18n('crm.label.status.is')}}</strong> </template></template> <template is=\"for\" items=\"{{sentStatus}}\" item=\"Obj\" index=\"index\"> <div><lyte-radiobutton data-zcqa=\"{{field.column_name}}:{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{if(ifEquals(sentStatus[0].api_name,Obj.api_name),true,false)}}\" lt-prop-name=\"{{if(ifEquals(field.api_name,'cxFilter_Email_Status'),'sent_status','RecentPrediction')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-checked=\"{{method('getCrossFieldOption')}}\" style=\"display: inline-block;\"></lyte-radiobutton> <span lt-prop-title=\"{{convesationTitle}}\" class=\"{{if(ifEquals(Obj.api_name,'last3'),'informationpredict','')}}\"></span> </div> </template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(crossFields.length,'||',expHandlers(field.api_name,'===',&quot;cxFilter_Competitor_Alert&quot;)),'||',expHandlers(field.field_data_type,'===',&quot;ABM_Scores&quot;)),'||',expHandlers(field.field_data_type,'===',&quot;ABM_Techniques&quot;)),'||',expHandlers(field.field_data_type,'==',&quot;rfm&quot;)),'||',expHandlers(field.api_name,'==',&quot;Similarity&quot;)),'||',field.Activity_tag),'||',expHandlers(expHandlers(expHandlers(field.field_data_type,'==',&quot;crossfield&quot;),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Campaigns&quot;)),'&amp;&amp;',expHandlers(field.api_name,'!=',&quot;cxFilter_Email_Sentiment&quot;))),'||',expHandlers(field.api_name,'==',&quot;Prediction&quot;)),'||',expHandlers(field.api_name,'===','next_best_experience'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{field.Activity_tag}}\"><template case=\"true\"> <div style=\"position: relative; top: 4px; margin-bottom: 10px; left: 8px; font-size: 12.5px; font-weight:bold;\">{{cruxGetI18n(\"crm.label.tag.related.to\")}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(field.api_name,'!=','cxFilter_Email_Sentiment'),'&amp;&amp;',expHandlers(field.api_name,'!=','SimilarityAvailable'))}}\"><template case=\"true\"><div class=\"{{if(field.Activity_tag,'pR left20','')}} \"> <template is=\"for\" items=\"{{crossFields}}\" item=\"Obj\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(Obj.cxHide,'!')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{Obj.isCheckBox}}\"><template case=\"true\"> <div class=\"facet mL10\"><lyte-checkbox title=\"{{Obj.field_label}}\" value=\"{{Obj.api_name}}\" data-zcqa=\"{{Obj.api_name}}\" lt-prop-type=\"default\" class=\"checkFilter userSelectNone {{radioBtnIsSelected(field,Obj)}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('inputValueChanged',Obj,true)}}\"></lyte-checkbox> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(Obj.isRadioBtn,'!==',false)}}\"><template case=\"true\"> <lyte-radiobutton data-zcqa=\"{{field.column_name}}_{{Obj.api_name}}\" id=\"sub_field_{{Obj.api_name}}\" lt-prop-type=\"primary\" class=\"{{radioBtnIsSelected(field,Obj)}}\" lt-prop-checked=\"{{radioBtnIsSelected(field,Obj,true)}}\" lt-prop-name=\"option_{{cruxReplace(field.api_name,'[/.]','_')}}\" lt-prop-value=\"{{Obj.api_name}}\" lt-prop-label=\"{{Obj.field_label}}\" on-changed=\"{{method('getCrossFieldOption',index,Obj)}}\" on-before-checked=\"{{method('crossFieldHideOption')}}\"></lyte-radiobutton> </template></template></template></template> <template is=\"if\" value=\"{{Obj.cxLabel}}\"><template case=\"true\"> <div class=\"{{if(Obj.cxClass,Obj.cxClass,'')}}\" style=\"{{if(Obj.cxStyle,Obj.cxStyle,'')}}\">{{unescape(Obj.cxLabel)}}</div> </template></template> <template is=\"if\" value=\"{{expHandlers(Obj.api_name,'==',&quot;Locked_True&quot;)}}\"><template case=\"true\"> <span class=\"cxAriaPrefixLabel mR2\" id=\"recLock\" style=\"display: none\">{{cruxGetI18n('crm.label.via')}}</span> </template></template> <template is=\"if\" value=\"{{expHandlers(Obj.showSubField,'!==',false)}}\"><template case=\"true\"> <crux-smart-filter-input class=\"{{Obj.cxClass}}\" id=\"sub_option_{{Obj.api_name}}\" cx-prop-field=\"{{Obj}}\" module=\"{{if(ifEquals(module,'Activities'),Obj.module_name,module)}}\" on-value-change=\"{{method('inputValueChanged',Obj,false)}}\" boundary=\"{{boundary}}\" on-before-error-alert=\"{{method('beforeErrorCallback')}}\" parent-field=\"{{field}}\"></crux-smart-filter-input> </template></template> </template></template> </template> </div></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(field.field_data_type,'===',&quot;crossModule&quot;)}}\"><template case=\"true\"> <div class=\"cxSmFrCrossFldModuleWrap\"> <span class=\"cxSmFrCrossFldModuleLable\">{{field.parentModuleLabel}}</span> <lyte-dropdown data-zcqa=\"crossModule_Input_{{field.field_label}}\" lt-prop-selected=\"{{lbind(selectedValues.value)}}\" class=\"cxSmFrCrossFldDropdown\" on-change=\"{{method('observeDropDownChanges')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxSmartFilterDropbox\"> <lyte-drop-body> <lyte-drop-item data-value=\"with\">{{cxPropCrossFilterTranslations.crossFilterConditions.opt1}}</lyte-drop-item> <lyte-drop-item data-value=\"without\">{{cxPropCrossFilterTranslations.crossFilterConditions.opt2}}</lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span>{{cruxGetI18n('crm.label.any')}} {{field.field_label}}</span> </div> </template></template> </div> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"for","position":[1,11],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"componentDynamic","position":[1,1,1,1]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"attr","position":[1,1,3,3]},{"type":"if","position":[1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"for","position":[3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"text","position":[1,1,3,1,0]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,7]},{"type":"if","position":[1,1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,9]},{"type":"if","position":[1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[1,1,11]},{"type":"if","position":[1,1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,13]},{"type":"if","position":[1,1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"registerYield","position":[1,7,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,7]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"registerYield","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,3]}]}},"default":{}},{"type":"attr","position":[1,11,1]},{"type":"if","position":[1,11,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"component","position":[1,1,1],"dynamicNodes":[]},{"type":"attr","position":[1,1,5]},{"type":"component","position":[1,1,5],"dynamicNodes":[]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"componentDynamic","position":[3,1]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,5]},{"type":"component","position":[1,5],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,3]},{"type":"if","position":[1,11,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,4]},{"type":"if","position":[1,11,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"registerYield","position":[2,1],"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,1,3,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"for","position":[3,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[2]},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,6]},{"type":"if","position":[1,11,6],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"attr","position":[1,3,3]},{"type":"component","position":[1,3,3],"dynamicNodes":[]},{"type":"text","position":[1,3,5,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,11,7]},{"type":"if","position":[1,11,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,5]},{"type":"component","position":[1,5],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,14]},{"type":"if","position":[1,14],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[1,2]},{"type":"text","position":[1,2,0]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,16]},{"type":"if","position":[1,16],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]},{"type":"attr","position":[1,2]}]}]}},"default":{}},{"type":"attr","position":[1,18]},{"type":"if","position":[1,18],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"componentDynamic","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["Obj.cxStyle","Obj.cxStyle","''"]}}}},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,20]},{"type":"if","position":[1,20],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"registerYield","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"componentDynamic","position":[1,1,1]},{"type":"text","position":[1,1,3,0]},{"type":"componentDynamic","position":[1,1,3]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,5,2]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropField","cxPropModule","cxPropCriteria","cxPropCommonInfo","cxPropCurrentUserDetails","cxPropModuleDisplayField","cxPropHideComparator","cxPropAutoCompleteInLookup","cxPropModuleRecordMapping","cxPropIgnoreCallbackInSetCriteria","cxPropIgnoreEmptyValue","idModuleMapping","field","rendered","options","cruxElement1","bydropdownOption","module","module_info","dateoptions","value","showSecondDropdownType","cruxElement2","sentStatusFlag","sentStatus","firstDropdown","crossFields","withOption","lookUpArray","renderItems","renderItems2","numberDropClass","iscurrencyField","recordDropdownValues","dropdownNames","durationOpt","lookupDisplayField","Email_Sentiment_Value","memberStatus","placeholderValue","maxLen","moduleDisplayField","selectedValues","tagSubModule","numberFieldDecimal","dropdownSysValue","dropdownDispValue","boundary","renderRecommendation","selectedRecommendations","crossSelling","reBuy","recommendationTypeSelected","recommendationBasedOnOption","recommendationBasedOn","reBuyVal","similarity","abmSegmentsList","abmSegmentsSearchedText","abmTechniqueFieldList","abmScoreFieldList","displayMsg","dropDownWidth","convesationTitle","predictionSelectedType","predictionData","trendOption","successFailureOption","successFailureDropDown","selectedOptionSf","sfAccuracyCount","sfEndCount","selectedTrend","isSuccess","isScoreSelected","isTrendSelected","isTrendShown","configLength","predictionOptions","criteriaDisplay","predictionEle","isCriteriaBetween","isScoreBetween","scoreCriteriaDisplay","roleRequestModel","predictionCriteria","scoreCriteria","userProperty","userDetails","cruxAssetsCompMapping","defaultUndefined","isChildInput","isChildFieldLookup","blockedCriteria","supportRelatedModules","optionsDisabledList","childCompProps","cxPropAria","valuePrefixDropdownOpt","cxPropEnableDateTime","elementsCompId","parentField"],
_observedAttributesType :["object","string","object","object","object","object","boolean","boolean","object","boolean","boolean","object","object","boolean","array","string","array","string","object","array","string","string","string","boolean","array","boolean","array","array","array","array","array","string","boolean","array","object","array","string","number","boolean","array","number","object","object","string","boolean","string","string","object","boolean","boolean","boolean","boolean","boolean","object","object","string","object","array","string","array","array","object","object","string","object","array","array","array","array","string","number","number","string","string","boolean","boolean","boolean","number","object","boolean","string","boolean","boolean","boolean","string","object","object","object","object","object","string","boolean","boolean","object","boolean","array","string","boolean","object","boolean","string","object"],
//no i18n
	data : function(){
		return{
			cxPropField : Lyte.attr("object"),//No I18n
			cxPropModule : Lyte.attr("string"),//No I18n
			cxPropCriteria : Lyte.attr("object"),//No I18n
			cxPropCommonInfo : Lyte.attr("object" , {default : {}}),//No I18n
			cxPropCurrentUserDetails : Lyte.attr("object"),//No I18n
			cxPropModuleDisplayField : Lyte.attr("object"),//no i18n
			cxPropHideComparator : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropAutoCompleteInLookup : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropModuleRecordMapping 	: Lyte.attr("object" , {default : {}}),//no i18n
			cxPropIgnoreCallbackInSetCriteria : Lyte.attr("boolean", {default : false}),//No I18n
			cxPropIgnoreEmptyValue : Lyte.attr("boolean", {default : false}),//No I18n
			idModuleMapping				:  Lyte.attr("object",{default : {}}),//no i18n
			field : Lyte.attr("object"),//No I18n
			// criteriaCondition : Lyte.attr("object" , { default : {} }),//No I18n
			
			rendered : Lyte.attr("boolean", {default : false}),//No I18n
			options : Lyte.attr("array"),//No I18n 
			cruxElement1 : Lyte.attr("string"),//No I18n
			bydropdownOption : Lyte.attr("array", {default : []}),//no i18n
			module : Lyte.attr("string"),//No I18n
			module_info :  Lyte.attr("object"),//No I18n
			dateoptions : Lyte.attr("array", {default : [{system : "DAYS", display : _cruxUtils.getI18n("days")}, {system : "WEEKS", display : _cruxUtils.getI18n("weeks")}, {system : "MONTHS", display : _cruxUtils.getI18n("months")}]}),//No I18n
			value : Lyte.attr("string"),//No I18n
			showSecondDropdownType : Lyte.attr("string"),//No I18n 
			cruxElement2 : Lyte.attr("string"),//No I18n
			sentStatusFlag : Lyte.attr('boolean',{default : false}), // no i18n
			sentStatus : Lyte.attr("array",{default : []}), //no i18n
			firstDropdown : Lyte.attr('boolean' ,{default : true}), //no i18n
			crossFields : Lyte.attr("array",{default : []}), //no i18n
			withOption : Lyte.attr("array",{default : [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{system : "equal", display : _cruxUtils.getI18n("on")},{system : "less_than", display : _cruxUtils.getI18n("before")},{system : "greater_than", display : _cruxUtils.getI18n("crm.label.general.small.after")},{system : "between", display : _cruxUtils.getI18n("between")},{system : '${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{system : "${YESTERDAY}", display : _cruxUtils.getI18n("Yesterday")},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{system : "${LASTWEEK}", display : _cruxUtils.getI18n("Last\ Week")},{system : "${LASTMONTH}", display : _cruxUtils.getI18n("Last\ Month")}]}), //no i18n
			lookUpArray : Lyte.attr('array', {default : []}), //no i18n
			renderItems : Lyte.attr('array',{default : []}), //no i18n
			renderItems2 : Lyte.attr('array',{default : []}), //no i18n
			numberDropClass : Lyte.attr("string",{default : ""}),//No I18n
			iscurrencyField : Lyte.attr("boolean",{default : false}), //No i18n
			recordDropdownValues : Lyte.attr('array',{default : []}), //no i18n
			dropdownNames : Lyte.attr('object'), //no i18n
			durationOpt : Lyte.attr('array',{default : []}), //no i18n
			lookupDisplayField : Lyte.attr('string'), //no i18n
			Email_Sentiment_Value : Lyte.attr('number',{default : 3}),//no i18n  
			memberStatus : Lyte.attr('boolean',{default : false}), //no i18n
			placeholderValue : Lyte.attr('array',{default : []}), //no i18n
			maxLen : Lyte.attr("number"),//no i18n
			moduleDisplayField : Lyte.attr("object"),//no i18n
			selectedValues : Lyte.attr("object", {default : {}}),//no i18n
			tagSubModule : Lyte.attr("string"),//no i18n
			numberFieldDecimal : Lyte.attr("boolean",{default : true}),//no i18n
			dropdownSysValue : Lyte.attr("string",{default : "system"}),//no i18n
			dropdownDispValue : Lyte.attr("string",{default : "display"}),//no i18n
			boundary : Lyte.attr("object",{default : {}}),//no i18n
            renderRecommendation : Lyte.attr("boolean", {default : true}),//No I18n
            selectedRecommendations : Lyte.attr("boolean", {default : false}),//No I18n
            crossSelling : Lyte.attr("boolean", {default : false}),//No I18n
            reBuy : Lyte.attr("boolean", {default : false}),//No I18n
			recommendationTypeSelected : Lyte.attr("boolean", {default : true}),//No I18n
			recommendationBasedOnOption : Lyte.attr("object", {default : {'first_buy':false,'cross_selling':false,'bundle':false,'re_buy':false,'next_buy':false}}),//No I18n
			recommendationBasedOn : Lyte.attr("object", {default : {'first_buy':false,'cross_selling':false,'bundle':false,'re_buy':false,'next_buy':false}}),//No I18n
			reBuyVal:Lyte.attr("string"),//no i18n
			similarity : Lyte.attr("object", {default : {'isScore':false, 'isRecords':false}}),//No I18n
			abmSegmentsList: Lyte.attr('array',{default : []}), // NO I18N
			abmSegmentsSearchedText: Lyte.attr('string',{default : ""}), // NO I18N
			abmTechniqueFieldList: Lyte.attr('array', {default: []}), // NO I18N
			abmScoreFieldList: Lyte.attr('array', {default: []}), // NO I18N
			displayMsg : Lyte.attr("object" ,{default : {}}),//no i18n
			dropDownWidth  :  Lyte.attr("object" , {default : {}}),//no i18n
			// zohoCampStatus : Lyte.attr("array",{default: [{'actual_value' : "Sent" , 'display_value' : "Sent" },{'actual_value' : "Opened" , 'display_value' : "Opened" },{'actual_value' : "Clicked" , 'display_value' : "Clicked" },{'actual_value' : "Bounced" , 'display_value' : "Bounced" },{'actual_value' : "Marked as Spam" , 'display_value' : "Marked as Spam" },{'actual_value' : "Replied" , 'display_value' : "Replied" }]}), //no i18n
			// otherMemberStatus :Lyte.attr("array"),//no i18n
			convesationTitle : Lyte.attr("string"),//no i18n
			predictionSelectedType : Lyte.attr("object",{default:{}}),//No I18n
			predictionData : Lyte.attr("array"),//No I18n
			trendOption : Lyte.attr("array"),//No I18n
			successFailureOption : Lyte.attr("array"),//No I18n
			successFailureDropDown : Lyte.attr("array"),//No I18n
			selectedOptionSf : Lyte.attr("string"),//No I18n
			sfAccuracyCount :  Lyte.attr("number",{default:0}),//No I18n
			sfEndCount : Lyte.attr("number",{default:0}),//No I18n
			selectedTrend : Lyte.attr("string"),//No I18n
			isSuccess : Lyte.attr("string",{default:"undefined"}),//No I18n
			isScoreSelected : Lyte.attr("boolean",{default:false}),//No I18n
			isTrendSelected : Lyte.attr("boolean",{default:false}),//No I18n
			isTrendShown : Lyte.attr("boolean",{default:true}),//No I18n
			configLength : Lyte.attr("number"),//No I18n
			predictionOptions : Lyte.attr("object",{default:{"criteriaValues":[],"score_operator":[],"criteria_operator":[]}}),//No I18n
			criteriaDisplay : Lyte.attr("boolean",{default:true}),//No I18n
			predictionEle:Lyte.attr("string"),//No I18n
			isCriteriaBetween:Lyte.attr("boolean",{default:false}),//No I18n
			isScoreBetween:Lyte.attr("boolean",{default:false}),//No I18n
			scoreCriteriaDisplay : Lyte.attr("boolean",{default:true}),//No I18n
			roleRequestModel : Lyte.attr("string", {default : ""}),//No I18n
			predictionCriteria : Lyte.attr("object",{default:{}}),//No I18n
			scoreCriteria : Lyte.attr("object",{default:{}}),//No I18n
			/* this is used for user field alone */
			userProperty : Lyte.attr("object" , { default : {} }),//No I18n
			userDetails : Lyte.attr("object" , { default : {} }),//No I18n
			cruxAssetsCompMapping : Lyte.attr("object" , { default : {} }),//No I18n
			defaultUndefined : Lyte.attr("string"),//no i18n
			isChildInput:Lyte.attr("boolean",{default:false}),//No I18n
			isChildFieldLookup:Lyte.attr("boolean",{default:false}),//No I18n
			blockedCriteria : Lyte.attr("object",{default:{'Email':'','Secondary_Email':''}}),//No I18n
			supportRelatedModules : Lyte.attr("boolean", {default : false}), //No I18N
			optionsDisabledList : Lyte.attr("array" , { default : [] }),//No I18n
			childCompProps		: Lyte.attr("string" , {default : ""}),//No I18n
			cxPropAria : Lyte.attr('boolean', {default : false}),
			valuePrefixDropdownOpt : Lyte.attr("object" , { default : {prefixOption : []} }),//No I18n
			cxPropEnableDateTime: Lyte.attr('boolean', { default: false }),
			elementsCompId : Lyte.attr("string" , {default : ""}),//No I18n
			parentField :  Lyte.attr("object")//No I18n
		}
	},
	init : function(){
		this.setModuleMappingData();
		if( this.data.cxPropField ){
			this.setData("field" , this.data.cxPropField );
			this.data.cxPropModule && this.render(); //eslint-disable-line no-unused-expressions
		}
		if(this.data.cxPropModuleDisplayField){
			this.setData('moduleDisplayField' , this.data.cxPropModuleDisplayField);//no i18N
		}
		if(this.data.field ){
			//this.setData("field", $L.extend( {} , this.data.field)); // Removed the clone — the data set in the parent (smart filter) is not reflecting here.
		   if(this.data.field.isDummy){
			  this.render();
		   }
		   if(this.data.isChildInput && this.data.field.field_data_type === 'lookup' && this.data.field.api_name !== 'Who_Id'){
			    this.setData("isChildFieldLookup" , true );
		   }
		}
		this.$node.resetField =function(criteria){
			return this.component.resetField(criteria);
		};
	},
	resetField : function(){
		this.setData('rendered'  , false);
		this.render();
		this.setData('rendered'  , true);
	},
	setFieldMethods : function(field){
		field = field ? field : this.data.field;
		if( field.cxChildCompMethods ){
			setTimeout(function(){
				this.setCriteria();
					var api_name = this._cruxReplace(field.api_name, "[/.]","_");//no i18n
					var childComp = $L("#"+api_name+"_crux_comp")[0],//no i18n
						childComp1 = $L("#between_"+api_name+"_crux_comp")[0],//no i18n
						methodsObject = field.cxChildCompMethods;
					for (var methodName in methodsObject) {
						childComp ? childComp.setMethods(methodName , methodsObject[methodName]) : ""; //eslint-disable-line no-unused-expressions
						childComp1 ? childComp1.setMethods(methodName , methodsObject[methodName]) : "";//eslint-disable-line no-unused-expressions
					}
				
			}.bind(this),100);
		}
	},
	render : function(parent){
		if(this.getData("rendered")){
			this.$node.style.display = "";
			return;
		}
		this.parentCompData = parent ? parent : this;
		this.cruxCompMapping = {layout : "layout",autonumber : "text",multiselectpicklist : "text",textarea : 'text' , text : "text", phone : "text", email : "text", mobile : "text", website : "text",decimal : "number", integer : "number", bigint : "number", double : 'number' ,currency : "number", picklist : "picklist", datetime : "date",//No I18n
								date : "date",multiuserlookup : "user", ownerlookup : "user",userlookup : "user", boolean : "boolean", lookup : "text" , date_time : "date-time",longinteger : "number"};//No I18n
		this.cruxCondMapping = {textarea : "text" ,multiselectpicklist : "text",text : "text",autonumber : "text", phone : "text", email : "text", mobile : "text", website : "text", integer : "number",decimal : "number", bigint : "number", double : 'number' , currency : "number", picklist : "defWithEmpty", datetime : "date", date_time :"date",//No I18n
								date : "date", ownerlookup : "defWithEmptyUl",multiuserlookup : "defWithEmpty" ,userlookup : "defWithEmptyUl" , boolean : "boolean", lookup : "text",longinteger : "number",fileupload : "defEmpty" , imageupload : "defEmpty"};//No I18n
		Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "w250" });//no i18n
		Lyte.objectUtils(this.getData("selectedValues") ,"add",{ headDropDownValue : undefined, byDropDownValue:undefined ,firstDropDownValue : undefined,secondDropDownValue : undefined,multiSelectFieldValue : undefined,HT_DropDownValue : undefined,HT_value : undefined,value1 : undefined,value2 : undefined ,Service_Status : undefined});//no i18n
		this.setData({'renderItems' : [] , 'renderItems2' : []});
		this.initCruxConditions("filter");//No I18n
		var field = this.getData("field"), //no i18n
			moduleRecordMapping = this.moduleRecordMapping,
			updObj = { cxFilterClass : { secondDropDownClass : "w80"} },
			opt , crossFields = field.crossFields ? $L.extend(true,[],field.crossFields) : []
		this.cruxAssets = typeof cruxAssets !== 'undefined' ? cruxAssets : {}; 
		this.cruxAssetsCompMapping = {};

		// if(typeof cruxAssets != "undefined" ){

		if( this.cruxAssets.getCruxFilterCriteriaConditions ){
			var conditons = cruxAssets.getCruxFilterCriteriaConditions();
			conditons = conditons ? conditons : {};
			for(var type in conditons){ 
				this[type+'Conditions']=conditons[type];
			}
		}
		if( this.cruxAssets.fieldDataTypeToCruxCompMapping ){
			var typeMapping = cruxAssets.fieldDataTypeToCruxCompMapping;
			for(var type in typeMapping){ 
				this.cruxCompMapping[type]=typeMapping[type];
			}
		}
		if(this.data.field.cxAutoCompleteInLookup || this.data.cxPropAutoCompleteInLookup){
			this.setData('isChildFieldLookup' , true);
		}
			
		// }

		if( parent ){
			this.idModuleMapping = parent.getData("idModuleMapping");
			moduleRecordMapping = this.moduleRecordMapping = parent.getData("cxPropModuleRecordMapping");
			// this.setData( "userDetails" ,  parent.getData("cxPropCurrentUserDetails"));//no i18n
			this.setData('cxPropCommonInfo' , parent.getData('cxPropCommonInfo'));
			if(!this.data.cxPropModule){
				this.setData('cxPropModule' , parent.getData('cxPropModule'));//no i18N
			}
			// this.cruxAssets =  parent.cruxAssets;
			this.cruxAssetsCompMapping = parent.cruxAssetsCompMapping ? parent.cruxAssetsCompMapping : {};
			this.setData("cruxAssetsCompMapping", this.cruxAssetsCompMapping);
			this.setData("supportRelatedModules",parent.data ? parent.data.supportRelatedModules : false); //No I18n
		}
		if( this.data.cxPropModule ){
			this.setData('module', this.data.cxPropModule);//no i18n
		}
		var module_name = this.data.module;
		if(module_name && moduleRecordMapping[module_name]){
			var module_info = store.peekRecord("module",moduleRecordMapping[module_name].id); 
			module_info = module_info ? module_info : moduleRecordMapping[module_name]; //getting undefined if module model is not registered.
			this.setData('module_info',module_info) //no i18n
		}
			
		this.setData('userDetails', this.data.cxPropCurrentUserDetails ? this.data.cxPropCurrentUserDetails : parent ? parent.getData("cxPropCurrentUserDetails") : this.getData('userDetails'));//no i18n
		this.datePattern = this.data.userDetails && this.data.userDetails.DATE_PATTERN ? this.data.userDetails.DATE_PATTERN : "dd/mm/yyyy";
		if(field.field_data_type == undefined){
			updObj.field_data_type = this.getFieldDataType(field);
			// Lyte.objectUtils(field ,"add","field_data_type",field.data_type);//no i18n
		}
		if( field.disableExtraValue ){ //depreicated check
			field.cxDisableExtraValue = field.disableExtraValue
		}
		field.cxLoginUser = field.cxLoginUser == undefined ? true : field.cxLoginUser 
		if( !field.display_field_label ){
			updObj.display_field_label = field.field_label
			// Lyte.objectUtils(field ,"add","display_field_label",field.field_label);//no i18n
		}
		Lyte.objectUtils(field ,"add",updObj);//no i18n
		this.setData({"showSecondDropdownType" : undefined , cruxElement1 : undefined , cruxElement2 : undefined});//no i18n
		if(!field.column_name){
			field.column_name = field.api_name
		}
		this.setData("numberDropClass","");//No I18n
		// if(field.api_name === "cxFilter_Scoring_Rule"){
		// 	this.setData("crossFields" , field.crossFields);//no i18n
		// }else if(field.api_name === "cxFilter_Series"){
		// 	this.setData("crossFields" , field.crossFields);//no i18n
		// }
		//  else 
		 if(field.field_data_type === "rfm" || field.field_data_type === "ABM_Techniques" || field.field_data_type === 'ABM_Scores') {
			this.setData({ "firstDropdown" : false});//no i18n
		}else if(field.field_data_type == "crossfield" && field.api_name !="cxFilter_Campaigns"){//no i18n
			ele = "";field.minValue = 0;
			crossFields = field.options ? $L.extend(true , [],field.options) : crossFields;
			// if( field.api_name == "cxFilter_Recent_prediction_score" ){ //no i18n
			// 	this.setData('sentStatus',field.options) //no i18n
			// 	this.setData('firstDropdown',false) //no i18n
			// }else 
			if(field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
				this.setData({maxLen : 4, showSecondDropdownType : "date", 'firstDropdown' : true});//No I18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
				ele = "number" //no i18n
			}else{
				this.setData('firstDropdown',false) //no i18n
			}
		}else if(field.field_data_type == 'nofield'){ //no i18n
			opt = [];ele = ""
			this.setData('firstDropdown',false) //no i18n
		}else if(field.api_name =="cxFilter_Campaigns"){ //no i18n
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name',_cruxUtils.getI18n('Campaign'))])//no i18n
			this.linkingModule =moduleRecordMapping.Campaigns;//no i18n
			// this.setData({"firstDropdown" : true,"otherMemberStatus" : field.pick_list_values.slice(0)}) //no i18n
			this.setData({"firstDropdown" : true}) //no i18n
			// ele = "lookup" //no i18n
			this.setData("setWidth","w250");//no i18n
		} else if(field.api_name === "cxFilter_Linked_Segment__s") {
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name', _cruxUtils.getI18n('abm.segment'))]) // NO I18N
			this.linkingModule = moduleRecordMapping.ABMSegment;
			this.setData({"firstDropdown" : true}); // NO I18N
		}else if(field.api_name == "Activity_Due"){//no i18n
			// this.setData("setWidth","w230");//no i18n
			ele = "";
		}else if(field.field_data_type == "custom"){ //no i18n
			field.minValue=0;
			this.setData({'recordDropdownValues' : field.values, "numberFieldDecimal" : false,"setMargin" : "setMarginLeft" , "setWidth" : ""}) //no i18n
			if(field.api_name == "cxFilter_Email_Status"){
				let sentStatusArr = this.getData("sentStatus"); //no i18n				
				let sentStatusFlag = sentStatusArr.length > 0 ? true : false;				
				
				Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "" });//no i18n
				this.setData({"setMargin" : "","setWidth" : "",'sentStatusFlag' : sentStatusFlag});//no i18n
			}
			ele = "number" //no i18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
			this.setData({maxLen : 4, showSecondDropdownType : "date", 'firstDropdown' : true});//No I18n
		}else if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1 ){ //no i18n
			this.setData({'firstDropdown' : true}) //no i18n
			ele = "";
		}else if(field.field_data_type === "crossModule"){
		   this.setData("selectedValues",{value : "with"}); //No I18n
		}else{
			this.setData("numberDropClass","cxW100Per");//No I18n
			var field_data_type
			// if(field.field_data_type == "formula" || field.dataparam.return_type){
			// 	Lyte.objectUtils(field , "add", "field_data_type", field.formula.return_type ? field.formula.return_type : field.dataparam.return_type) //no i18n
			// }
			if( field.cxDecimalAllowed !== undefined ){
				this.setData("numberFieldDecimal",field.cxDecimalAllowed);
			}
			if( field.cxModule !== undefined ){
				this.setData("module",field.cxModule);
			}
			if(["SOLUTIONNUMBER","INVOICENUMBER","SONUMBER","QUOTENUMBER","CASENUMBER"].indexOf(field.column_name) != -1 ){
				Lyte.objectUtils(field , "add", "field_data_type", "integer") //no i18n
			}
			field_data_type = field.field_data_type //no i18n
			if(field.field_data_type == "currency"){
				if(this.data.userDetails.BASE_CURRENCY!=""){
					this.setData("numberDropClass","w150");//No I18n
					this.setData('iscurrencyField',true) //no i18n
				}
			}
			var crux = this.cruxCompMapping
			var ele = this.cruxAssetsCompMapping[field.api_name];
			ele = ele ? ele : crux[field_data_type] ;
			if(ele == "text" || ele =="number"){
				this.setData("numberDropClass" , ele == "number" ? "w150" : this.data.numberDropClass);//no i18n
				this.setData('placeholderValue',[_cruxUtils.getI18n('crm.label.filter.typehere')]) //no i18n
			}
			if( field.ui_type == 80 ){
				this.setData('placeholderValue',[_cruxUtils.getI18n('crm.label.type.minutes')]) //no i18n
			}
			this.setData('firstDropdown',true) //no i18n
			if(field.field_data_type == "multiselectlookup" || (this.data.isChildFieldLookup)){
				if(field.ui_type == "445" ){
					ele = "user"; //no i18n
				}else{
					var id = this.data.isChildFieldLookup ? field.lookup.module.id : field.multiselectlookup.connected_module.id;
					this.linkingModule = moduleRecordMapping[this.idModuleMapping[id]];//no i18n
					this.setData('placeholderValue', this.linkingModule ? [_cruxUtils.getI18n('crm.module.name',this.linkingModule.singular_label)] : _cruxUtils.getI18n('crm.label.filter.typehere')); //no i18n
				}
			}
			if(field.column_name == "CALLDURATIONINSEC"){
				this.setData("numberFieldDecimal",false);//no i18n
			}
			// if(field.api_name === "cxFilter_Prediction_Score"){
			// 	field.maxValue = 100;
			// 	field.minValue = 1;
			// 	//Lyte.objectUtils(field ,"add","maxValue",100)//no i18n
			// }else 
			if( field.ParentField == "cxFilter_Email_Sentiment" && (field.api_name == "count" || field.api_name == "percentage") ){//no i18n
				var value =(field.api_name =="count")?"1":"50", //no i18n
				maxValue = (field.api_name =="count")?1000:100, //no i18n
				len = (field.api_name =="count")?4:3; //no i18n
				field.minValue = 1;field.maxValue=maxValue;
				//Lyte.objectUtils(field ,"add","maxValue",maxValue)//no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",value)//no i18n
				// this.setData('value',value)//no i18n
				// 'maxLen' : len ,
				this.setData({'numberDropClass' : "" , 'placeholderValue' : [''],"numberFieldDecimal" : false}) //no i18n
			}
		}
		if(field.ui_type == 132){
			Lyte.objectUtils(field.cxFilterClass ,"add",{'cruxElement1' : "dB mB7 cxSmartFilterMultiModuleLookup",secondDropDownClass : ""});//no i18n
			this.setData("showSecondDropdownType" , "date");//No I18n
		}
		if(typeof moduleRecordMapping != "undefined"  && field.field_data_type == "tag"){
			ele = "tag";//No I18n
			var moduleInfo =  moduleRecordMapping[this.getData("module")] ? moduleRecordMapping[this.getData("module")] : {};
			if(moduleInfo.module_name == "Activities"  && moduleInfo.custom_view && !moduleInfo.custom_view.activity_view){
				this.setData("module",field.module_name);//no i18n
			}else if(!field.PreventActivityTag  && moduleInfo.custom_view && moduleInfo.custom_view.activity_view){
				Lyte.objectUtils(field , "add", {"Activity_tag" : true}); //no i18n
				crossFields = [{api_name : "Events_Tag" , field_data_type  :"tag",data_type  :"tag", field_label : moduleRecordMapping.Events.plural_label,module_name : "Events",PreventActivityTag : true,parent_field : field},{api_name : "Calls_Tag" , field_data_type : "tag",data_type  :"tag", field_label : moduleRecordMapping.Calls.plural_label ,module_name : "Calls" , PreventActivityTag : true,parent_field : field},{api_name : "Tasks_Tag" , field_data_type  : "tag",data_type  :"tag", field_label : moduleRecordMapping.Tasks.plural_label , module_name : "Tasks",PreventActivityTag : true,parent_field : field}];//no i18n
				Lyte.objectUtils(field , "add", "crossFields", crossFields) //no i18n
				// this.setData("crossFields",crossFields);//no i18n
				ele = "";this.setData('firstDropdown',false) //no i18n
			}else{
				Lyte.objectUtils(field , "add", "Activity_tag", false) //no i18n
			}

		}else if(field.column_name == "ACTIVITYTYPE"){//no i18n
			Lyte.objectUtils(field , "add", "field_data_type", "picklist") //no i18n
			var pick_list_values = [{display_value :moduleRecordMapping.Tasks.plural_label ,actual_value :moduleRecordMapping.Tasks.api_name },{display_value :moduleRecordMapping.Calls.plural_label ,actual_value :moduleRecordMapping.Calls.api_name },{display_value :moduleRecordMapping.Events.plural_label ,actual_value :moduleRecordMapping.Events.api_name }];//no i18n
			Lyte.objectUtils(field,"add","pick_list_values",pick_list_values);//no i18n
			ele = "picklist";//no i18n
		}
		if(ele == "text"){
			this.setData("maxLen", field.maxLength || 2500);//no i18n
		}
		if(field.field_data_type == "date" || field.field_data_type == "datetime" || ele == "date" || field.api_name == "cxFilter_Email_Sentiment"){
			field.minValue=0;
			field.cxMinMaxValidate = true;
			this.setData({'placeholderValue' : [''] , numberFieldDecimal : false , numberDropClass : '' , setWidth : ""}) //no i18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add","value1",2);//no i18n
			this.setData({maxLen : 4, showSecondDropdownType : "date"});//No I18n
			if(field.api_name == "With_Open_Deal" || field.api_name == "Without_Open_Deal"){ //no i18n
				ele = ""
			}
		}else if( field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){//no i18n
			Lyte.objectUtils(field,"add",{"maxValue" : 5 , "minValue" : 1});//no i18n
			this.setData( {"numberDropClass" : 'w100' ,"placeholderValue" : [_cruxUtils.getI18n("crm.filter.number.range",1,5)]}) //no i18n
			//this.setData('placeholderValue',[I18n.getMsg('crm.filter.number.range',[1,5])]) //no i18n
		}
		if(field.api_name === 'cxFilter_Scoring_Rule'){
			ele = "picklist"; //No I18n
		}
		if(field.api_name === 'cxFilter_Series'){
			ele = "picklist"; //No I18n
		}

		this.setData("numberDropClass" , ele == "boolean" ? "" : this.data.numberDropClass);//no i18n
		this.setData({ cruxElement1 : ele});
		if( ele == "user" && parent ){
			this.setData( "userProperty" , field.cxUserProperties ? field.cxUserProperties : parent.getData("cxPropUserFieldProperties"));//no i18n
		}
		if(field.cxChildCompProps){
			var props = {}; 
			for(var property in field.cxChildCompProps){ 
				var tempProps = property.replace('cxProp','');
				tempProps = tempProps.replace('ltProp','');
				props[tempProps.charAt(0).toLowerCase()+tempProps.slice(1)] = field.cxChildCompProps[property];
			}
			this.setData('childCompProps' , JSON.stringify(props));//no i18n
		}
		if(( !field.cxHideComparator && !this.data.cxPropHideComparator) && field.api_name !== "Without_Open_Activity" && field.api_name !== "Without_Any_Deal" && field.api_name !== 'With_Contact' && field.api_name !== 'Without_Any_Contact' && field.api_name !== 'Locked_False'){
			this.setDropDownValuesFun(true);
		}
		if(field.api_name === "Recommendation"){ //no i18n
			var module = moduleRecordMapping[this.getData("module")]; //no i18n
			var label = module.recommendationsDetailsJson.what_to.display_label;
			this.setData( { "lookupDisplayField" : label , setWidth : ""}); //no i18n
			Lyte.objectUtils(this.getData("dropDownWidth") ,"add", { headDropDownWidth : "w150" });//no i18n
			this.setData('placeholderValue',[label]) //no i18n
			this.setData('options',[{"system":"all","display":_cruxUtils.getI18n('allTime')},{"system":"${TODAY}","display":_cruxUtils.getI18n('crm.filter.label.a.day')},{"system":"${THISWEEK}","display":_cruxUtils.getI18n('crm.filter.label.a.week')},{"system":"${THISMONTH}","display":_cruxUtils.getI18n('crm.filter.label.a.month')},{"system":"CUSTOM","display":_cruxUtils.getI18n('crm.cal.custom')}]) //no i18n
		}
		// if(field.api_name === "Similarity"){
		// 	this.setData("crossFields", field.crossFields);
		// }else if(field.api_name === "SimilarityAvailable") {
		// 	this.setData("crossFields", field.crossFields);
		// 	// var module = this.getData("module");
		// 	// var moduleLabel = moduleRecordMapping[module].plural_label;
		// 	// this.setData("crossFields", [   //No I18n
		// 	// 	{api_name: "SimilarityScore", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.score'), data_type: "integer"},  //No I18n
		// 	// 	{api_name: "SimilarityRecords", field_label: _cruxUtils.getI18n('zia.similarity.smartfilter.records.search', moduleLabel)}  //No I18n
		// 	// ]);
		// } 
		else if(field.api_name === "SimilarityScore") {
			this.setData("options", this.numberConditions);
			this.setData("firstDropdown", true);
			this.setData("cruxElement1", 'number');
			field.minValue = 0;
			field.maxValue = 100;
			this.setData("field", field);
			this.setData('placeholderValue',[_cruxUtils.getI18n('Score')]) //no i18n
			this.setData("numberDropClass", "w150");
		} else if(field.api_name === "SimilarityRecords") {
			this.setData("field.data_type", "multiselectlookup");
			var moduleDisplayField = this.getData("moduleDisplayField");
			var module = moduleRecordMapping[this.getData("module")]; //no i18n
			if(!moduleDisplayField) {
				var moduleApiName = module.api_name;
				var obj = {};
				obj[moduleApiName] = [module.display_field.api_name];
				this.setData("moduleDisplayField", obj);
			}
			var multiselectlookup = {};
			multiselectlookup.connected_module = {api_name : module.api_name, id : module.id  };
			// multiselectlookup.connected_module.id = module.id;
			// multiselectlookup.connected_module.api_name = module.api_name;
			this.setData("field.multiselectlookup", multiselectlookup);
			this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name', module.singular_label)])//no i18n
		}
		// if( field.api_name  === 'next_best_experience'){
		// 	var option_values = [];
		// 	if(this.data.userDetails.permissions.Crm_Implied_View_Calls){
		// 		option_values.push({'actual_value' : 'Calls' , 'display_value' : _cruxUtils.getI18n('Call')});
		// 	}
		// 	if(this.data.userDetails.permissions.Crm_Implied_View_Events){
		// 		option_values.push({'actual_value' : 'Events' , 'display_value' : _cruxUtils.getI18n('Meeting')});
		// 	}
		// 	if(this.data.userDetails.permissions.Crm_Implied_Send_Mail_Potentials){
		// 		option_values.push({'actual_value' : 'Emails' , 'display_value' : _cruxUtils.getI18n('crm.field.label.email')});
		// 	}
		// }
		if(field.api_name === "Prediction" || field.api_name === "Prediction_0" ||  field.api_name === "Prediction_1" ||  field.api_name === "completed_prediction"){
			var node = field.api_name === "Prediction" ? $L("#option_Prediction")[0] : $L("#sub_option_" + field.api_name)[0];//No I18n
			Lyte.objectUtils(node.getData("selectedValues"),"add","dateVal",2);//No I18n
			Lyte.objectUtils(node.getData("selectedValues"),"add","criteriaValue","");//No I18n
			var module = moduleRecordMapping[node.getData("module")];//No I18n
			node.setData('predictionData',module.prediction_details.slice());//No I18n
			node.setData('trendOption',[{"system" : "no_trend", "display" : _cruxUtils.getI18n("crm.zia.prediction.notrend")},{"system" : "trend_up", "display":_cruxUtils.getI18n("crm.intelligence.prediction.trendup")},{"system" : "trend_down", "display" : _cruxUtils.getI18n("crm.intelligence.prediction.trenddown")}]);//No I18n
			node.setData('successFailureOption', [{"system" : "success_prediction", "display" : _cruxUtils.getI18n("crm.label.success"), "parent_field": "completed_prediction"}, {"system":"failure_prediction", "display" : _cruxUtils.getI18n("crm.label.Failure"),  "parent_field": "completed_prediction" }]);//No I18n
			node.setData("configLength",module.prediction_details.length);//No I18n
			var len = node.getData('configLength');//No I18n
			if(field.api_name === "Prediction"){
				var crossFieldsData = [];
				for(var ind = 0;ind < len; ind++){
					var details = {};
					var predictField = node.getData('predictionData')[ind].predict_field;//No I18n
					var isPickList = node.getData('predictionData')[ind].values === undefined ? false : true;
					details.predict_field = predictField;
					details.prediction_field = node.getData('predictionData')[ind].prediction_field;//No I18n;//No I18n
					details.isPickList = isPickList;
					details.api_name = "Prediction_" + ind;//No I18n
					details.name = node.getData('predictionData')[ind].name;//No I18n
					details.id = node.getData('predictionData')[ind].id;//No I18n
					details.field_label = node.getData('predictionData')[ind].name;//No I18n
					details.parent_field = 'prediction';//No I18n
					if(isPickList){
						details.score_field = node.getData('predictionData')[ind].prediction_score_field;//No I18n
					}
					details.trend = node.getData('trendOption');//No I18n
					crossFieldsData.push(details);
				}
				var details = {};
				details.successFailureDropDown = node.getData('successFailureDropDown');//No I18n
				details.api_name = "completed_prediction";//No I18n
				details.id = "both";//No I18n
				details.field_label = _cruxUtils.getI18n("Completed");//No I18n
				details.parent_field = 'prediction';//No I18n
				crossFieldsData.push(details);
				crossFields = crossFieldsData
				// node.setData('crossFields',crossFieldsData);//No I18n
			}
			var SFoption = [];
			var newLen = node.getData('configLength');//No I18n
			for(var i = 0;i < newLen; i++){
				var config = {"system":this.getData('predictionData')[i].id , "display":node.getData('predictionData')[i].name};//No I18n
				SFoption.push(config);
			}
			if(newLen === 2){
				SFoption.push({"system":"both" , "display":_cruxUtils.getI18n("Both")});//No I18n
			}
			node.setData('successFailureDropDown',SFoption);//No I18n
			node.setData('selectedOptionSf',node.getData('successFailureDropDown')[0].system);//No I18n
		}
		this.setData("crossFields" , crossFields);//no i18n
		if( ele == "picklist" && !field.cxType){
			field.cxPropType =  ("cxFilter_Scoring_Rule" == field.api_name || field.api_name == "cxFilter_UnallocatedRecords" || "cxFilter_Series" == field.api_name) ? "single":"multiple";//No I18n
		}
		// if( ele == "picklist" ){
		// 	field.cxPropType =  "cxFilter_Series" == field.api_name ? "single":"multiple";//No I18n
		// }

		if(field.api_name === "cxFilter_Competitor_Alert"){
			this.setData('firstDropdown',false);
			this.setData('crossFields',Lyte.deepCopyObject(field.options));
		}
		if(field.api_name === "Competitor_Name"){
			this.setData("cruxElement1","picklist");
			var additionalOptions = this.textConditions;
			this.setData('options',additionalOptions);
		}
		if(field.api_name === "Competitor_Duration"){
			Lyte.arrayUtils(this.getData('options'),'removeAt',12,this.getData('options').length);
			this.setData("cruxElement1","number");
		}
		if(field.api_name === "Competitor_Sentiment"){
			this.setData('field.cxPropType','single');
		}
		let uniqueKey = ()=>{
			let finalString = '' , len = 5;
			for(var k = 0; k < len; k++){
				finalString += Math.floor(Math.random() * 100).toString(36);
			}
			return finalString;
		};

		this.setData('elementsCompId' , `id_${this.data.module}_${this._cruxReplace(field.api_name, "[/.]","_")}_${uniqueKey()}`);
		if( this.getMethods('onBeforeRender') ){
			let tempObj = this.executeMethod('onBeforeRender', { calledFrom : "init", field : field , cruxElementComponent : this.data.cruxElement1});//No I18N
			if(tempObj && tempObj.constructor === Object){
				if(tempObj.field){
					this.setData('field' , tempObj.field);//No I18n
				}
				if(tempObj.cruxElementComponent){
					this.setData('cruxElement1' , tempObj.cruxElementComponent);//No I18n
				}
			}
		}

		this.setData("rendered", true);//No I18n
		this.setFieldMethods(field);
		// if( field.api_name == "Likely_to_convert" ){//no i18n
		// 	$L("#sub_field_"+field.options[0].api_name)[0].classList.add("Likely_to_convert_selectedRadioBtn");//no i18n
		// }
	},
	actions : {
		preventDefault : function( node , event ){
			if( event.keyCode == 13 ){
				event.preventDefault();
			}
		},
		toggleDropDown : function(field, type, node){
			var eve,
				apiName = type === "Recommendation_infield" ? type : this._cruxReplace(field.api_name, "[/.]","_"); //no i18n
			
			if(apiName === "cxFilter_Linked_Segment__s" && !node.component.data.ltPropValue) {
				eve = {
					type: "change", // NO I18N
					oldValue: "",
					newValue: "",
					item: "ltPropValue" // NO I18N
				}
				
				this.methods.onSearch.call(this, eve, node);
			}

			var dropDownNode = this.$node.querySelector("#multiSelect_lookup_"+apiName);//no i18n
			if(dropDownNode.ltProp("show") == true){
				var t = $L("#"+ apiName+"_Search_val")[0];//no i18n
				if(t.querySelector("input").value){
					t.ltProp("value",'');//No I18n
				}
				dropDownNode.toggle();//No I18n
				return false;
			}


		},
		inputValidate : function(Obj,event,field){
			if(field.field_data_type == "date" || field.field_data_type == "datetime" || field.field_data_type == "custom"){
				if(event.keyCode == 189){
					event.preventDefault();
				}
			}
		},
		clearEmailSentiment : function(){
			var checked = $( '[name=option_cxFilter_Email_Sentiment]:checked' ).closest( 'lyte-radiobutton' ) //eslint-disable-line no-attribute-selectors
			if(checked.length){
				checked[0].ltProp('checked',false) //no i18n
				var id = "sub_option_" + checked[0].ltProp('value') //no i18n
				var node = document.getElementById(id)
				if(node){
					node.style.display = 'none'
				}
			}
			$L("#clearEmailSentimentSubfield")[0].classList.add("dNI");//no i18n
			$(".cxFilter_Email_Sentiment_selectedRadioBtn").removeClass("cxFilter_Email_Sentiment_selectedRadioBtn")
			if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
				this.executeMethod("onValueChange",{field : this.data.field});//No I18n
			}
		}

	},
	methods : {
		onPrefixSelection : function(ev , selectedValue){
			// var prefixOpts = this.data.valuePrefixDropdownOpt.prefixOption;
			// var selectedObj = prefixOpts.filter(function(item){
			// 	return item.display_value == selectedValue;
			// })
			this.checkValuePrefixDD('change', undefined, selectedValue);
			this.valueChanged(selectedValue);
		},
		beforeOptionsSet : function(){
			if(this.data.field.cxForceSetCondition){
				this.triggerConditionCallback(this.data.options , true , true , {bydropdownOption : this.data.bydropdownOption});
			}
		},
		beforeSelectDropDown : function(eve , prevSelVal , comp , dropItem , selVal){
			if(this.getMethods("beforeSelectDropdown")){
				return this.executeMethod("beforeSelectDropdown", { field : this.data.field , event : eve , oldValue : prevSelVal , newValue : selVal , dropdown : comp});	
			}
		},
		// setDropDownValues : function(node){
		// 	return;
		// 	if(!node.getAttribute("renderAllValues")){
		// 		this.setDropDownValuesFun(true)
		// 		var selected = node.ltProp("selected")//no i18n
		// 		node.ltProp("selected","") // no i18n
		// 		node.ltProp("selected",selected) //no i18n
		// 		node.setAttribute("renderAllValues",true)
		// 	}
		// },
		observeDropDownChanges : function(){
			this.valueChanged();
		},
		beforeErrorCallback : function(msg){
			if(this.getMethods('onBeforeErrorAlert')){
				return this.executeMethod('onBeforeErrorAlert',msg); //No I18N
			}
			return true;
		},
		beforeAlert : function(alertMsg,comp){
			var check=true;
			if(this.getMethods('onBeforeErrorAlert')){
				check=this.executeMethod('onBeforeErrorAlert',alertMsg);//No I18N
			}
			if(check){
				var field = this.getData("field");//no i18n
				if( ["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(field.api_name) != -1 && field.parent_field && field.parent_field.Activity_tag){
					this.showFilterAlert(_cruxUtils.getI18n('crm.field.valid.check',field.parent_field.display_label) );//no i18n
					return false;
				}else if(field.showCommonError){
					if(comp.$node.nodeName == "CRUX-NUMBER-COMPONENT" && comp.getValue() == ""){//no i18n
						this.showFilterAlert(_cruxUtils.getI18n('crm.mb.field.common.empt'),comp );//no i18n
						return false;
					}else if(comp.$node.nodeName == "CRUX-DATE-COMPONENT"){//no i18n
						this.showFilterAlert( _cruxUtils.getI18n('crm.field.valid.check',_cruxUtils.getI18n("Date")) ,comp);//no i18n
						return false;
					}
				}else if( this.getData("field").history_tracking && comp.$node.tagName === "CRUX-NUMBER-COMPONENT" ){//no i18n
					this.showFilterAlert( _cruxUtils.getI18n('crm.field.valid.check', _cruxUtils.getI18n("crm.events.duration") ) , comp);//no i18n
					return false;
				}
				return true;
			}
		},
		getDropDownVal : function( event,value,dropdown,dropItem,thisScope){ 
			var _this = thisScope ? thisScope : this;
			var field = _this.getData("field");//no i18n 
			if(   field.api_name == "Email" || field.api_name == "Secondary_Email"){
				let  emailOptionsArray = [] , skipUpdate = false; 
				if( value.includes("${BLOCKED") &&  _this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT){  
					let bounceCategories = Crm.bounceCategories;
					let moduleName = _this.getData('module'); //no i18n 
					emailOptionsArray = [ 
							{"api_name":"cxFilter_"+field.column_name+"_temporary","column_name":"Temporary","data_type":"date","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.temporary"),"field_data_type":"date","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.temporary"),"module_name":moduleName,"system":"hey","display":"hey",
								cxFieldsDetails : [ { cxLabel : _cruxUtils.getI18n("crm.email.unblock.filter.category") , cxElement : "dropdown" ,  cxOptions : bounceCategories.temporary } ]
							},
							{"api_name":"cxFilter_"+field.column_name+"_permanent","column_name":"Permanent","data_type":"date","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.permanent"),"field_data_type":"date","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.permanent"),"module_name":moduleName,"system":"hey","display":"hey",
								cxFieldsDetails : [ { cxLabel : _cruxUtils.getI18n("crm.email.unblock.filter.category") , cxElement : "dropdown" ,  cxOptions :bounceCategories.permanent  } ]
							},
							{"api_name":"cxFilter_"+field.column_name+"_both","column_name":"Both","data_type":"nofield","display_field_label":_cruxUtils.getI18n("crm.email.unblock.filter.both"),"field_data_type":"nofield","field_label":_cruxUtils.getI18n("crm.email.unblock.filter.both"),"module_name":moduleName,"system":"hey","display":"hey"}
					];
					skipUpdate = _this.data.crossFields.length ? true : false;
				}
				!skipUpdate ? _this.setData("crossFields",emailOptionsArray) : undefined; //no i18n
			}
			if(field.api_name == "cxFilter_Campaigns"){
				// if(Crm && Crm.zohoCampaignEnabled ){
				// 	if(value == Crm.partnerName + " Campaigns"){
				// 		field.pick_list_values = _this.data.zohoCampStatus;
				// 	}else if(value == ""){//no i8n
				// 		var value = _this.data.otherMemberStatus.slice(0);//no i18n
				// 		_this.removeValue(value,"actual_value",["Sent","Opened","Clicked","Bounced","Marked as Spam", "Replied"]);//no i18n
				// 		field.pick_list_values = value.concat(_this.data.zohoCampStatus);
				// 	}else{
				// 		field.pick_list_values = _this.data.otherMemberStatus;
				// 	}

				// }
				_this.setData("renderItems",[]);//no i18n
				$L("#"+_this._cruxReplace(field.api_name, "[/.]","_")+"_Search_val")[0].ltProp("value","");
				Lyte.objectUtils(_this.getData("selectedValues") ,"add",{Service_Status : [],"multiSelectFieldValue" :"[]"});//no i18n
			}
			_this.getValue(value , true , true);
		},
		showSentStatus : function(field,ev, value){
			if( this.data.selectedValues.firstDropDownValue === "${EMPTY}" ){
				Lyte.objectUtils(this.data.selectedValues ,"add","firstDropDownValue","Age in Days")//no i18n
				this.getValue("Age in Days");//no i18n
			}
			this.showHideEmailStatus(value,field)
			// this.valueChanged()
		},
		getCrossFieldOption : function(index,sub_field,input,comp){
			this.setData("isSuccess","undefined");//No I18n
			Lyte.objectUtils(this.getData("predictionCriteria") ,"add","value",undefined)//no i18n
			if(!comp){
				comp = sub_field
				sub_field = {api_name : ""}
			}
			if(sub_field.ParentField == "cxFilter_Email_Sentiment"){
				$L("#clearEmailSentimentSubfield")[0].classList.remove("dNI");//no i18n
			}else if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf( sub_field.api_name ) != -1){//no i18n
				this.setData("tagSubModule",sub_field.api_name)//no i18n
			}
			else if(sub_field.parent_field === "prediction"){
				var data = {};
				var scoreCheck = $L("#scoreCheckBox")[0];//No I18n
				if(scoreCheck && this.getData("isScoreSelected")){
					scoreCheck.ltProp("checked",false);//No I18n
				}
				var parentNode =  $('#option_Prediction')[0];//No I18n
				var $node = $('#sub_option_' + sub_field.api_name)[0]
				if(index === 0 || index === 1 && comp.data.id !== "sub_field_completed_prediction"){
					var prediction_field = parentNode.getData("predictionData")[index].prediction_field;
					var predict_field_values = parentNode.getData("predictionData")[index].values;//No I18n
					var predict_field = parentNode.getData("predictionData")[index].predict_field;
					Lyte.objectUtils(parentNode.getData("predictionCriteria"),"add","field",prediction_field);//No I18n
					var moduleFields = this.moduleRecordMapping[parentNode.getData("module")].fields;
					var criteria_fields = moduleFields.filter(function(item){
						return item.id === prediction_field.id
					});
					var predicted_field = moduleFields.filter(function(item){
						return item.id === predict_field.id
					});
					var actual_pick_list_values = [];

					if(criteria_fields[0].field_data_type === "picklist"){
						var valuesArray = [];
						var len = predict_field_values.length;;
						for(var valuesIndex = 0; valuesIndex < len ; valuesIndex++) {
							valuesArray.push(predict_field_values[valuesIndex].actual_value)
						}
						var len1 = predicted_field[0].pick_list_values.length
						for (var ind = 0; ind < len1; ind++){
							if(criteria_fields[0].pick_list_values[ind] && valuesArray.indexOf(criteria_fields[0].pick_list_values[ind].actual_value) !== -1){
								actual_pick_list_values.push(criteria_fields[0].pick_list_values[ind])
							}
						}
						criteria_fields[0].pick_list_values = actual_pick_list_values;
					}
					var dataType = criteria_fields[0].data_type;
					var options = this.cruxCondMapping;
					var criteria_operator = this[options[dataType] + "Conditions"];
					$node.setData("predictionEle",dataType);//No i18n
					parentNode.setData("predictionEle",dataType);//No i18n
					if(dataType === "integer"  || dataType == "longinteger" || dataType === "decimal" || dataType === "bigint" || dataType === "double" || dataType === "currency"){
						$node.setData("setWidth","w100");//No I18n
						$node.setData("predictionEle","number");//No I18n
						parentNode.setData("predictionEle","number");//No I18n
					}
					else if(dataType === "multiselectpicklist" || dataType === "picklist"){
						$node.setData("predictionEle","picklist");//No I18n
						parentNode.setData("predictionEle","picklist");//No I18n
					}
					else if(dataType === "userlookup" || dataType === "multiuserlookup"){
						$node.setData("predictionEle","user");//No I18n
						parentNode.setData("predictionEle","user");//No I18n
					}
					else if(dataType === "datetime" || dataType === "date"){
						$node.setData("predictionEle","date");//No I18n
						parentNode.setData("predictionEle","date");//No I18n
						var value = criteria_operator[0].system;
						if(value === "equal" || value === "less_than" || value === "greater_than"){
							Lyte.objectUtils($node.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
							$node.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
						}else if(value === "between"){//no i18n
							Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
							$node.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
						}else if(value === "Due in Days" || value === "Age in Days"){//no i18n
							$node.setData("showSecondDropdownType", "date");//No I18n
						}
					}

					Lyte.objectUtils($node.getData("predictionOptions"),"add","criteria_operator",criteria_operator);//No I18n
					var prediction_score_field ;
					if(parentNode.getData("predictionData")[index].score_field){
						var score_field = this.getData("predictionData")[index].score_field;//No I18n
						Lyte.objectUtils(parentNode.getData("scoreCriteria"),"add","field",score_field);//No I18n
						prediction_score_field = moduleFields.filter(function(item){
							return item.id === score_field.id
						});
						Lyte.objectUtils(data,"add","score_field",prediction_score_field); //No I18N
					}
					if(index === 0){
						data = {"first":true,"second":false,"completed":false};//No I18n
					}
					else if(index === 1 && comp.data.id !== "sub_field_completed_prediction"){
						data = {"first":false,"second":true,"completed":false};//No I18n
					}
				}
				else{

					data = {"first":false,"second":false,"completed":true};//No I18n
				}
				Lyte.objectUtils(data,"add","criteria_fields",criteria_fields);//No I18n
				Lyte.objectUtils(data,"add","predict_field",predicted_field);//No I18n

				if(prediction_score_field){
					Lyte.objectUtils(data,"add","score_field",prediction_score_field); //No I18N
				}
				$node.setData("predictionSelectedType",data);//No I18n
				parentNode.setData("predictionSelectedType",data);//No I18n
				if(index === 0 || index === 1 && comp.data.id !== "sub_field_completed_prediction"){
					var comparatorComp = $node.querySelector("#criteria_comparator");//No I18n
					if(comparatorComp){
						comparatorComp.ltProp("selected",criteria_operator[0].system);//No I18n
						var display = criteria_operator[0].system === "${EMPTY}" || criteria_operator[0].system === "${NOTEMPTY}" ? false : true;//No I18n
						var between = criteria_operator[0].system === "between" || criteria_operator[0].system === "not_between" ? true : false;//No I18n
						$node.setData("criteriaDisplay",display);//No I18n
						$node.setData("isCriteriaBetween",between);//No I18n
						Lyte.objectUtils(parentNode.getData("predictionCriteria"),"add","comparator",criteria_operator[0].system);//No I18n
						Lyte.objectUtils($node.getData("predictionCriteria"),"add","comparator",criteria_operator[0].system);//No I18n
					}
					var scoreComp = $node.querySelector("#score_criteria_comparator");//No i18n
					if(scoreComp){
						scoreComp.ltProp("selected",$node.getData("predictionOptions").score_operator[0].system);//No I18n
						var display =  $node.getData("predictionOptions").score_operator[0].system === "${EMPTY}" || $node.getData("predictionOptions").score_operator[0].system === "${NOTEMPTY}" ? false : true;//No I18n
						$node.setData("scoreCriteriaDisplay",display);//No I18n
					}
					Lyte.objectUtils(parentNode.getData("scoreCriteria"),"add","comparator",$node.getData("predictionOptions").score_operator[0].system);//No I18n
					Lyte.objectUtils($node.getData("scoreCriteria"),"add","comparator",$node.getData("predictionOptions").score_operator[0].system);//No I18n
				}
			}
			else if(sub_field.parent_field === "completed_prediction"){
				var $node = $L('#sub_option_' + sub_field.parent_field)[0];//No I18n
				var parentNode =  $L('#option_Prediction')[0];//No I18n
				parentNode.setData("selectedOptionSf",$node.getData("selectedOptionSf"));//No I18n
				$node.setData("isSuccess", index === 0 ? "true" : "false");//No I18n
				parentNode.setData("isSuccess", index === 0 ? "true" : "false");//No I18n
			} else if(sub_field.api_name === "SimilarityScore") {
				this.setData("similarity.isScore", input.checked);
			} else if(sub_field.api_name === "SimilarityRecords") {
				this.setData("similarity.isRecords", input.checked);
			} else if(sub_field.api_name === "SimilarityNotAvailable") {
				this.setData("similarity.isScore", false);
				this.setData("similarity.isRecords", false);
			}

			this.getField(sub_field,comp)
		},
		crossFieldHideOption : function(input,comp){
			this.hideSubfieldOption(input,comp)
		},
		// headDropDownValChanged :function(){

		// 	this.valueChanged()
		// },
		inputValueChanged : function( data , isSubfield , input , comp ){
			// var field = this.getData('field')//no i18n
			if(  data != "lyte-dropdown" ){
				this.valueChanged();
			}
			
			if(data && (data.show_type === 13 && ["Recency", "Frequency", "Monetary"].indexOf(data.api_name) !== -1 || this.getData('abmTechniqueFieldList').indexOf(data.api_name) !== -1 || this.getData('abmScoreFieldList').indexOf(data.api_name) !== -1 || data.showSubField !== false ) && isSubfield === true) {
				var subfield = $L("#sub_option_"+ this._cruxReplace(data.api_name, "[/.]","_"))[0];//no i18n
				if( comp.$node.checked ){
					subfield.component.render(this.parentCompData);
				}else{
					subfield.setData("rendered",false)//no i18n
				}
			}
			var parentComp = $L("#option_Prediction")[0];//No I18n
			if(data === "prediction_criteria"){
				if(this.getData("predictionEle") === "date" || parentComp.getData("predictionEle") === "date"){
					if(input === "equal" || input === "less_than" || input === "greater_than"){
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
					}else if(input === "between"){//no i18n
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
					}else if(input === "Due in Days" || input === "Age in Days"){//no i18n
						this.setData("showSecondDropdownType", "date");//No I18n
					}
					else{
						Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
						this.setData({"showSecondDropdownType": "", "predictionEle" : ""});//No I18n
					}
				}
				var display = ["${TODAY}","${YESTERDAY}","${LASTYEAR}","${EMPTY}","${NOTEMPTY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}"].indexOf(input) != -1 ? false : true;//No I18n
				var between = input === "between" || input === "not_between" ? true : false;//No I18n
				if(input === "${EMPTY}" && this.getData("field").score_field && !this.getData("isScoreSelected")){
					parentComp.setData({isTrendSelected:false,selectedTrend:"no_trend",isTrendShown:false});//No I18n
					this.setData({isTrendSelected:false,selectedTrend:"no_trend",isTrendShown:false});//No I18n
				}
				else{
					parentComp.setData("isTrendShown",true);//No I18n
					this.setData("isTrendShown",true);//No I18n
				}
				this.setData("criteriaDisplay",display);//No I18n
				this.setData("isCriteriaBetween",between);//No I18n
				Lyte.objectUtils(parentComp.getData("predictionCriteria"),"add","comparator",input);//No I18n
				Lyte.objectUtils(this.getData("predictionCriteria"),"add","comparator",input);//No I18n
			}
			else if(data === "score_criteria"){
				var display =  input === "${EMPTY}" || input === "${NOTEMPTY}" ? false : true;//No I18n
				var between = input === "between" || input === "not_between" ? true : false;//No I18n
				this.setData("scoreCriteriaDisplay",display);//No I18n
				this.setData("isScoreBetween",between);//No I18n
				Lyte.objectUtils(parentComp.getData("scoreCriteria"),"add","comparator",input);//No I18n
				Lyte.objectUtils(this.getData("scoreCriteria"),"add","comparator",input);//No I18n
			}
			if(data === "prediction_trend"){
				parentComp.setData("selectedTrend",input);//No I18n
			}
			else if(data === "prediction_SF"){
				parentComp.setData("selectedOptionSf",input);//No I18n
			}
		},
		changeUserInputValue : function(value,node){
			var field = this.getData('field'),value,maxValue //no i18n
			if( field.api_name === 'cxFilter_Scoring_Rule' ){// scoring rule Specific case. No Need to automate for this if check
				this.checkSubFieldOpt({field ,value});
			}
			if(field.history_tracking && !this.data.isChildInput){
				value = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp')[0].component.getValue()
				var node = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];
				var trackingNode = picklist_tracker_field
				if(value.length && value.length <= 10){
					// node.parentElement.style.opacity = 1;
					node.removeAttribute("lt-prop-title")
					node.ltProp('disabled',false) //no i18n
				}else{
					// node.parentElement.style.opacity = 0.5;
					if( value.length > 10 ){
						node.setAttribute("lt-prop-title" , _cruxUtils.getI18n("crm.smartfilter.picklist.options.msg"));//no i18n
					}
					node.ltProp('checked',false) // no i18n
					node.ltProp('disabled',true) //no i18n
				}
			}
			else if(field.api_name === "Prediction_0" || field.api_name === "Prediction_1"){
				var selectedValues = this.getData("selectedValues");//No I18n
				if(value.id === "criteria_prediction" || value.id === "criteria_prediction_0" || value.id === "criteria_prediction_1"){
					node = value.getData().cxPropField.data_type === "date" ? Lyte.Transform.date.serialize(node) : value.getData().cxPropField.data_type === "datetime" ? Lyte.Transform.datetime.serialize(node) : node ; //no i18n
				}
				switch(value.id){
					case "criteria_prediction":
						Lyte.objectUtils(selectedValues,"add","criteriaValue",node);//No I18n
						break;
					case "criteria_prediction_0":
						Lyte.objectUtils(selectedValues,"add","criteriaValue0",node);//No I18n
						break;
					case "criteria_prediction_1":
						Lyte.objectUtils(selectedValues,"add","criteriaValue1",node);//No I18n
						break;
					case "score_criteria_prediction":
						Lyte.objectUtils(selectedValues,"add","scoreValue",node);//No I18n
						break;
					case "score_criteria_prediction_0":
						Lyte.objectUtils(selectedValues,"add","scoreValue0",node);//No I18n
						break;
					case "score_criteria_prediction_1":
						Lyte.objectUtils(selectedValues,"add","scoreValue1",node);//No I18n
						break;
					case "dateInput":
						Lyte.objectUtils(selectedValues,"add","dateVal",node);//No I18n
						break;
				}
			}
			// else if(field.api_name == "Prediction_Score" || field.api_name == "percentage" || field.api_name=="count"){ //no i18n
			// 	maxValue = (field.api_name=="count") ? 1000 : 100;//no i18n
			// 	var maxLen = (field.api_name=="count") ? 3 : 2;//no i18n
			// 	var regex = new RegExp('\\d{'+maxLen+'}','g');
			// 	if(value > maxValue){
			// 		node.querySelector("lyte-number").ltProp("value",regex.exec(value)[0]) //no i18n
			// 		//node.component.set("cxPropValue",/\d{2}/g.exec(value)[0])//no i18n
			// 		var msg=_cruxUtils.getI18n('sentiment.criteria.wrongcriteria',maxValue);//no i18n
			// 		var errorMsg = $L("#errorMessage")[0]//no i18n
			// 		errorMsg.ltProp({
			// 			"show" : true, //no i18n
			// 			"message" : msg//no i18n
			// 		})
			// 	}
			// }
			// else if(value && node &&  node.getData && node.getData().cxPropMinvalue && value < node.getData().cxPropMinvalue){
			// 	node.querySelector("lyte-number").ltProp("value","");//no i18n
			// }
			this.valueChanged(value)
		},
		picklistTrackerDuration : function(input,checkbox){
			var node = $L('#durationField')[0]
			if(checkbox.$node.checked){
				$L(node).removeClass("eventNone op5")
				// node.classList.remove('eventNone op5') //no i18n
			}else{
				// node.querySelector("lyte-number").ltProp("value","");//no i18n
				$L(node).addClass("eventNone op5");//no i18n
				// node.classList.add('eventNone op5') //no i18n
			}
			this.valueChanged()
		},
		addToList : function(apiName,event,src,selected,comp){

			var renderItems = apiName ==="Recommendation_infield" ? this.getData('renderItems2') : this.getData('renderItems'); //no i18n
			var lookUpArray = this.getData('lookUpArray') //no i18n
			var len = lookUpArray.length,i
			for(i=0;i<len;i++){
				if(lookUpArray[i].id == src){
					break
				}
			}
			Lyte.arrayUtils(renderItems, 'push', lookUpArray[i]); //no i18n
			
			if(apiName === "cxFilter_Linked_Segment__s") {
				
				if(renderItems && renderItems.length >= 5) {
					this.setData('lookUpArray', []); // NO I18N
					Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names'))); // NO I18N
				} else {
					this.searchAbmSegments(this.getData("abmSegmentsSearchedText"), this.getData("renderItems")); // NO I18N
				}
				
			} else {
				this.setData('lookUpArray', []); // NO I18N
				
				$L("#" + this._cruxReplace(apiName, "[/.]","_") + "_Search_val",this.$node)[0].ltProp('value',''); // NO I18N
				this.hideDropDown();
			}
			
			var field = this.getData('field') //no i18n
			if(field.api_name == "cxFilter_Campaigns" && (!field.serviceStatus || !field.serviceStatus.length)){
				field.serviceStatus = [];
				this.setServiceStatus(this.data.selectedValues.firstDropDownValue , this);
				Lyte.objectUtils(this.data.selectedValues ,"add",{Service_Status : [] });//no i18n
			}
			this.valueChanged(renderItems,comp.$node);

		},
		removeFromList:function(event,id,val,comp){
			var renderItems = comp.$node.id === "multiSelect_lookup_Recommendation_infield" ? this.getData('renderItems2') : this.getData('renderItems'); //no i18n
			for(i=0;i<renderItems.length;i++){
				if(renderItems[i].id == id){
					Lyte.arrayUtils(renderItems, 'removeAt', i, 1) //no i18n
				}
			}
			this.valueChanged(renderItems,comp.$node)
			if( renderItems.length >=5 ){
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected',this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]))//no i18n
			} else if(this.data.field.api_name==="SimilarityRecords" && this.data.renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
			} else{
				
				if("multiSelect_lookup_cxFilter_Linked_Segment__s" === comp.$node.id) {
					comp.$node.close();
					return;
				}
				
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			}
		},
		onShowDropBox : function(fieldApiName, node){
			var eve,
				message;
			
			if( this.data.renderItems2.length >=5  || this.data.renderItems.length >= 5){
				
				if(fieldApiName === "cxFilter_Linked_Segment__s") {
					message = _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names')); // NO I18N
				} else {
					message = _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]); // NO I18N
				}
				
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", message); // NO I18N
			} else if(this.data.field.api_name==="SimilarityRecords" && this.data.renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
			} else{
				
				if(fieldApiName === "cxFilter_Linked_Segment__s" && !node.component.data.ltPropValue) {
					eve = {
						type: "change", // NO I18N
						oldValue: "",
						newValue: "",
						item: "ltPropValue" // NO I18N
					}
					
					Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg", _cruxUtils.getI18n('crm.chosen.searching.text')); // NO I18N
					this.methods.onSearch.call(this, eve, node);
					return;
				}
				
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			}

		},
		onBeforeHide : function(){
			this.hideDropDown()
		},
		onSearch : function(eve,ele){
			clearTimeout(this._timeout);
  			this._timeout = setTimeout(this.onSearchFun.bind(this,eve,ele), 100);
		}
	},
	triggerGetDropDownVal : function(value,thisScope){
		thisScope.methods.getDropDownVal(null,value,null,null,thisScope);
	},
	showHideEmailStatus : function(value,field){
		if(field && field.api_name =="cxFilter_Email_Sentiment"){
			if(value == "Positive" || value =="Negative"  || value == "PositiveOrNegative"  || value == "Neutral"){
				this.setData('Email_Sentiment_Value',3) //no i18n
			}else if(value == "PositiveAndNegative"){ //no i18n
				this.setData('Email_Sentiment_Value',2) //no i18n
			}else{
				this.setData('Email_Sentiment_Value',1) //no i18n
			}
		}else if(field && field.api_name == "cxFilter_Email_Status"){//no i18n
			if( value == "not_sent" ){
				Lyte.arrayUtils(this.data.options, 'insertAt',this.data.options.length, [{system : "${EMPTY}", display : _cruxUtils.getI18n("crm.condition.till.today")}]) //no i18n
			}else if(this.data.options[this.data.options.length-1].system === "${EMPTY}"){//no i18n
				Lyte.arrayUtils(this.data.options ,'pop');//no i18n
			}
			let sentStatusArr = this.getData("sentStatus"); //no i18n				
			let sentStatusFlag = sentStatusArr.length > 0 ? true : false;	

			this.setData('sentStatusFlag',value == "sent" && sentStatusFlag ? true : false) // no i18n
		}
	},
	getConditionOpt : function(sysVal){
		if( !sysVal || !this.data.options || !this.data.options.length)return {};
		let optObj = this.data.options.filter((item)=>item.system == sysVal)[0];
		if( !optObj && sysVal.includes('_N_')){
			let val = sysVal.replace('${','').replace('}','').split(':');
			// let inputVal = val.replace(/\D/g, '');
			let inputVal = val[1];
			let compVal = val[0].split('_N_');
			optObj = this.data.options.filter((item)=>item.system == compVal[0])[0];
			optObj.value = inputVal;
			optObj.secondDropDownOpt = compVal[1];	
		}
		return optObj ? optObj : {};
	},
	getValue : function(value , changeStatus , preventCallback){
		var field = this.getData("field") , comp;//No I18n
		if( field.persist_values == false){
			this.setData({'cruxElement1' : ''});
			Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
		}
		if( !preventCallback ){
			this.valueChanged()
		}
		if( value == "${NOTEMPTY}" || value == "${EMPTY}" ){
			this.setData({cruxElement1 : ""});
		}
		let condObj = this.getConditionOpt(value) || {};
		if( field.ui_type == 53 ){
			this.setData({numberDropClass : "" ,maxLen : 4,cruxElement1 : "number",placeholderValue : [""]});//No I18n
			Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value1" : "2","value2" : undefined});//no i18n
			return
		}
		// if(["cxFilter_TouchedRecords","cxFilter_UnTouchedRecords","cxFilter_RecordAction","cxFilter_RelatedRecordsAction","Activity_Due"].indexOf(field.api_name) != -1){
		// 	if(["${AGEINDAYS}+30","${AGEINDAYS}+60","${AGEINDAYS}+90","${TODAYANDOVERDUE}"].indexOf(value) != -1){
		// 		this.setData("setWidth","w230");//no i18n
		// 	}else{//no i18n
		// 		this.setData("setWidth","w100");//no i18n
		// 	}
		// }
		if(value == "not_contains"){
			this.setData("setWidth","w150");//no i18n
		}
		if( this.getMethods('onBeforeRender') ){
			let tempObj = this.executeMethod('onBeforeRender', { calledFrom : "comparatorChange", field : field , cruxElementComponent : this.data.cruxElement1 , comparator : value});//No I18N
			if(tempObj && tempObj.constructor === Object && tempObj.cruxElementComponent){
				// if(tempObj.cruxElementComponent){
					comp = tempObj.cruxElementComponent;
					// this.setData('cruxElement1' , tempObj.cruxElementComponent);//No I18n
				// }
			}
		}
		if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1){
			return
		}else if( ["date" , "datetime" , "custom" , "date_time"].includes(field.field_data_type) || field.api_name == 'cxFilter_Email_Sentiment' ){ //no i18n
			var ele = field.field_data_type == "date_time" ? "date-time" : "date";
			if( Object.keys(condObj).length ){
				let minVal= 0;
				if( condObj.cxDateOptions ){
					this.setData('dateoptions' , condObj.cxDateOptions);//no i18N
					let dateOptDD = $L(`#second_${field.api_name}_dropdown`)[0];
					if( dateOptDD ){
						dateOptDD.resetSelected();
					}
				}
				if( condObj.cxMinvalue !== undefined ){
					minVal = condObj.cxMinvalue;
				}
				Lyte.objectUtils(field,'add','minValue',minVal)
			}
			if( ["equal" , "less_than" , "greater_than"].includes(value)){
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({value : "","cruxElement1": ele,numberDropClass : "w150", showSecondDropdownType : ""});//No I18n
			}else if(value == "between" || value == "not_between"){ //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,cruxElement2 :ele, cruxElement1 : "",placeholderValue : ['',_cruxUtils.getI18n('workflow.option.webhookFailure.fromDate'),_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")]});//No I18n
			}else if(value == "Due in Days" || value == "Age in Days" || condObj.showDynamicInput){//no i18n
				this.setData("showSecondDropdownType", "date");//No I18n
				if(field.api_name != 'With_Open_Deal' && field.api_name != 'Without_Open_Deal'){
					this.setData({numberDropClass : "" ,maxLen : 4,cruxElement1 : "number",placeholderValue : [""]});//No I18n
					Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value1" : "2","value2" : undefined});//no i18n
				}
			}else {
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
				this.setData({"showSecondDropdownType": "", "cruxElement1" : ""});//No I18n
			}
		}
		else if( ["num" , "currency" , "double" , "bigint" , "integer" , "longinteger" , "decimal"].indexOf(field.field_data_type)  != -1 ){
			if( field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1 ){//no i18n
				this.setData("numberDropClass" , 'w100') //no i18n
			}else if(!/count|percentage/.test(field.api_name)){
				this.setData("numberDropClass" , "w150");//No I18n
			}
			if(this.data.selectedValues.value2){
				Lyte.objectUtils(this.getData("selectedValues") ,"add", {"value1" : undefined,"value2" : undefined });//no i18n
			}
			if(field.ui_type == 80){
				this.setData("placeholderValue",[_cruxUtils.getI18n('crm.label.type.minutes')]);//no i18n
			}
			else{
				this.setData("placeholderValue",[_cruxUtils.getI18n('crm.label.filter.typehere')]);//no i18n
			}
			if(value == "between" || value == "not_between"){
				Lyte.objectUtils(this.getData("selectedValues") ,"add", {"value1" : undefined,"value2" : undefined });//no i18n
				this.setData({"showSecondDropdownType": "between", cruxElement2 : "number",cruxElement1 : "number",numberDropClass : "w100",placeholderValue : ['',_cruxUtils.getI18n('crm.label.from'),_cruxUtils.getI18n("crm.label.to")]});//No I18n
				if( field.ui_type == 80 ){
					this.setData('placeholderValue', ['', _cruxUtils.getI18n("crm.label.in.minutes",_cruxUtils.getI18n('crm.label.from')) ,_cruxUtils.getI18n("crm.label.in.minutes",_cruxUtils.getI18n("crm.label.to"))]) //no i18n
				}
			}else if(value == "not_equal" || value == "equal" || value == "less_than" || value == "greater_than" || value == "less_equal" || value == "greater_equal"){//no i18n
				var comp = (field.column_name == "LAYOUTID")?"layout":"number" //no i18n
				this.setData({showSecondDropdownType : "", cruxElement1 : comp});//no i18n
			}else{
				this.setData({"showSecondDropdownType": "", cruxElement1 : ""});//No I18n
			}
			var tNode = this.$node.querySelector("lyte-number");//no i18n
			if(tNode && changeStatus){
				tNode.focus()
			}
		}
		else if( this.cruxAssetsCompMapping[field.api_name] ||  ["text","textarea","multiselectpicklist","phone","email","mobile","website","lookup","picklist","autonumber","tag"].indexOf(field.field_data_type)  != -1 && !this.data.isChildFieldLookup){
			if(!this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT &&["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field){
				var tname = field.column_name == "EMAIL" ? "Secondary_Email" : "Email" ; //no i18n
				var id = this.parentCompData.data.cxPropChildModuleFields ? "#option_"+tname+"_"+field.id+"_"+this.parentCompData.data.cxPropChildModuleRelation : "#option_"+tname , tNode = $(id)[0];//no i18n
				if( ["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 ){
					this.$node._callee.component.blockedCriteriaSelected = field.api_name;
				}else if( field.api_name == this.$node._callee.component.blockedCriteriaSelected ){//no i18n
					this.$node._callee.component.blockedCriteriaSelected = false;
				}
				if( tNode ){
					if( field.api_name == this.$node._callee.component.blockedCriteriaSelected){//no i18n
						Lyte.arrayUtils(tNode.getData("options") ,'removeAt',8,2);//no i18n
					}else if( tNode.getData("options").length<=8 ){//no i18n
						Lyte.arrayUtils(tNode.getData("options"), 'push', [{system : '${BLOCKED}',display : _cruxUtils.getI18n('crm.filter.email.isblocked')},{system :'${NOTBLOCKED}' ,display : _cruxUtils.getI18n('crm.filter.email.isnotblocked')}]) //no i18n
					}

				}
			}
			if(value.indexOf("$") != -1){
				this.setData({cruxElement1 : "" , showSecondDropdownType : ""});
			}
			else{
				comp = comp || (field.field_data_type === "tag"?"tag":this.cruxCompMapping[field.field_data_type] )//no i18n
				this.setData("cruxElement1", comp);//No I18n
				if(field.ui_type == 132){
					this.setData("showSecondDropdownType" , "date");//No I18n
				}
				if( field.history_tracking && value == "not_equal"){
					$L("#picklist_tracker_field").addClass("dN");//no i18n
				}else if( field.history_tracking && value == "equal" ){//no i18n
					$L("#picklist_tracker_field").removeClass("dN");//no i18n
				}
				var tNode = this.$node.querySelector("lyte-input");//no i18n
				if(tNode && changeStatus){
					tNode.focus()
				}
			}
		}else if(field.field_data_type == "multiselectlookup" || this.data.isChildFieldLookup){ //no i18n
			var node = $L("#multiSelect_lookup_"+this._cruxReplace(field.api_name, "[/.]","_"))[0]//no i18n
			if(node){
				node.style.display = (value === "${EMPTY}" || value === "${NOTEMPTY}")?"none": "block"
			}
		}else if(["ownerlookup","multiuserlookup","userlookup"].indexOf(field.field_data_type)  != -1 && value.indexOf("$") == -1 && ['equal_role','equal_group','not_equal_role'].indexOf(value) == -1){//no i18n
			this.setData("cruxElement1", "user");//No I18n
		} else if(field.field_data_type === "multirelation") {
			var node = $L("#multiSelect_lookup_" + this._cruxReplace(field.api_name, "[/.]","_"))[0]; // NO I18N
			node ? node.style.display = value === "${EMPTY}" ? "none" : "block" : undefined // NO I18N
		} else if(['equal_role','equal_group','not_equal_role'].indexOf(value) > -1){
			if(value.indexOf("group") > -1 && typeof Crm && !Crm.groupUserRelDetails){
				store.findAll("related_list", {
				            module: "Users"
				        },true).then(function(res){
				        	if (typeof Crm){
				        		if(!Crm.groupUserRelDetails){
				        			Crm.groupUserRelDetails = {listRelation : res.find( obj => obj.api_name == 'GroupUserRel__s')};
				        		}else{
				        			Crm.groupUserRelDetails.listRelation = res.find( obj => obj.api_name == 'GroupUserRel__s') ;
				        		}
				        }});
				store.findAll('field',{
							module : 'GroupUserRelations__s'
						},true).then(function(res){
				        	if (typeof Crm){
				        		if(!Crm.groupUserRelDetails){
				        			Crm.groupUserRelDetails = {field : res.find( fld => fld.api_name == 'GroupRel__s')};
				        		}else{
				        			Crm.groupUserRelDetails.field = res.find( fld => fld.api_name == 'GroupRel__s');
				        		}
				        }});
			}else if (value.indexOf("role") > -1 && typeof Crm  && !Crm.userRoleField){
				store.findAll('field',{
							module : 'Users'
						},true).then(function(res){
				        	Crm.userRoleField = res.find( fld => fld.api_name == 'role');	
				        });
			}
			this.setData("cruxElement1", "role");//No I18n
			// To differentiate store request in role component
			if(this.getData('roleRequestModel') && value.indexOf(this.getData('roleRequestModel')) === -1)  {
				Lyte.objectUtils(this.getData('selectedValues') ,"add","value1" , []  )//no i18n
			}
			this.setData('roleRequestModel', value.indexOf("group") > -1 ? 'user_group' : 'role' );
			
		}
	},
	
	/**
	 * No Ajax call
	 */
	findAbmSegments: function(text, renderItems) {
		var thisObj = this,
			abmSegmentsList = thisObj.getData('abmSegmentsList'), // NO I18N
			flag = true,
			segmentName;
		
		thisObj.setData('lookUpArray', []); // NO I18N
		
		abmSegmentsList.forEach(function(data){
			segmentName = data.Segment_Name__s.toLowerCase();
			
			if(!thisObj.isSelected(data, renderItems) && segmentName.startsWith(text)) {
				flag = false;
				Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
			}
		});
		
		if(flag){
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
		} else {
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", ""); // NO I18N
		}
	},
	
	searchAbmSegments: function(text, renderItems) {
		var url,
			abmSegmentsList = this.getData('abmSegmentsList'), // NO I18N
			thisObj = this;
		
		text = text.trim().toLowerCase();
		thisObj.setData("abmSegmentsSearchedText", text);
		
		if(abmSegmentsList && abmSegmentsList.length) {
			thisObj.findAbmSegments(text, renderItems);
			return;
		}
			
		thisObj.setData('lookupDisplayField', "Segment_Name__s"); // NO I18N
		Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.searching.text')); // NO I18N
		
		url = "/crm/v4/ABM_Segment__s?fields=Segment_Name__s"; // NO I18N
		
		thisObj.sendxhr(url, "GET").then(function(res) { // NO I18N
			var flag = true,
				segmentName,
				segmentLength;
			
			thisObj.setData('lookUpArray', []); // NO I18N
			
			if(res.response !== ""){
				Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", ""); // NO I18N
				res = JSON.parse(res.response).data;
				segmentLength = res.length;
				thisObj.setData('abmSegmentsList', res); // NO I18N
				
				if(segmentLength) {
					
					if(renderItems.length === 0) {
						
						res.forEach(function(data){
							segmentName = data.Segment_Name__s.toLowerCase();
							
							if(!text || segmentName.startsWith(text)) {
								flag = false;
								Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
							}
						});
					} else {
						
						res.forEach(function(data){
							segmentName = data.Segment_Name__s.toLowerCase();
							
							if(!thisObj.isSelected(data, renderItems) && (!text || segmentName.startsWith(text))) {
								flag = false;
								Lyte.arrayUtils(thisObj.getData('lookUpArray'), 'push', data); // NO I18N
							}
						});
					}
					
					if(flag){
						Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
					}
				}
			} else {
				Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.label.no.options.found')); // NO I18N
				thisObj.setData('lookUpArray', []); // NO I18N
			}
			
		}, function() {
			Lyte.objectUtils(thisObj.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n('crm.chosen.error.loading.text')); // NO I18N
		});
	},
	
	onSearchFun : function(event,ele){

		var module = this.moduleRecordMapping[this.getData('module')];

		var field = this.getData('field');//no i18n
		var apiName = $(ele).attr('id') === 'Recommendation_infield_Search_val' ? 'Recommendation_infield' :  field.api_name; //no i18n

		var renderItems = apiName === 'Recommendation_infield' ? this.getData('renderItems2') : this.getData('renderItems') //no i18n
		
		if(renderItems) {
			if(apiName==="SimilarityRecords" && renderItems.length>=1) {
				Lyte.objectUtils(this.getData("displayMsg"), "add", "multiLookupMsg", _cruxUtils.getI18n("crux.smartfilter.multiselect.maximum.selected", [1, this.linkingModule ? this.linkingModule.module_name : this.data.placeholderValue[0]]))  //no i18n
				return;
			} else if(renderItems.length>=5) {
				Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg", _cruxUtils.getI18n('crm.chosen.maximum.campaigns.selected', _cruxUtils.getI18n('abm.segment.names'))); // NO I18N
				return;
			}
		}

		if(this.$node.querySelector("#multiSelect_lookup_"+ this._cruxReplace(apiName, "[/.]","_"))){
				this.$node.querySelector("#multiSelect_lookup_"+this._cruxReplace(apiName, "[/.]","_")).open();//No I18n
			}
		//var head={"Leads":["Full_Name","Last_Name"],"Activities":["Subject"],"Accounts":["Account_Name"],"Contacts":["Full_Name"],"Deals":["Deal_Name"],"Potentials":["Deal_Name"],"Campaigns":["Campaign_Name"],"Cases":["Subject"],"Solutions":["Solution_Title"],"Products":["Product_Name"],"Vendors":["Vendor_Name"],"PriceBooks":["Price_Book_Name"],"Quotes":["Subject"],"SalesOrders":["Subject"],"PurchaseOrders":["Subject"],"Invoices":["Subject"], "Visits" : ["Visited_Page"], "Sales_Orders" : ["Subject"]}; //No I18N
		var head = this.getData("moduleDisplayField");//no i18n
		//crmConstants.moduleDisplayField;
		var self = this;



        // var search = $L("#searching_"+apiName)[0] //no i18n
		// var noresult = $L("#"+apiName+"_noOption")[0] //no i18n
		var text = event.newValue
		var msg = $L('#display_msg_'+this._cruxReplace(apiName, "[/.]","_"))[0] //no i18n
		
		if( apiName === "cxFilter_Linked_Segment__s" ) {
			this.searchAbmSegments(text, renderItems);
		} else if(text.length === 0){

			// search.classList.add('dNI') //no i18n
			// noresult.classList.add('dNI') //no i18n
			self.setData('lookUpArray',[]) //no i18n
			// msg.classList.remove('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','2'))//no i18n
			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.minimum.input.text','2') //no i18n
		}else if(text.length == 1){
			// msg.classList.remove('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.minimum.input.text','1'))//no i18n
			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.minimum.input.text','1') //no i18n
			self.setData('lookUpArray',[]) //no i18n
			// search.classList.add('dNI') //no i18n
			// noresult.classList.add('dNI') //no i18n
		} else{
			// msg.classList.add('dNI') //no i18n
			//search.classList.remove('dNI') //no i18n
			//noresult.classList.add('dNI') //no i18n
			Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.searching.text'))//no i18n

			//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.searching.text') //no i18n
			var display_field,moduleName;
			moduleName =(apiName == "cxFilter_Campaigns" && field.field_data_type === "crossfield") ? "Campaigns" : (apiName == "Recommendation" || apiName == 'Recommendation_infield') ? 	this.idModuleMapping[module.recommendationsDetailsJson.what_to.id] : this.data.isChildFieldLookup ? this.idModuleMapping[field.lookup.module.id] : this.idModuleMapping[field.multiselectlookup.connected_module.id];//no i18n
			if( head[moduleName]){
				display_field = head[moduleName][0]
			}else {
				display_field = moduleRecordMapping[moduleName].display_field ?  moduleRecordMapping[moduleName].display_field.api_name : "Name"//no i18n
			 }
			// var display_field = (apiName == "Campaigns")?head.Campaigns[0]: display_field
			this.setData('lookupDisplayField',display_field) //no i18n
			//this.displayField =head[ field.multiselectlookup.connected_module.api_name ][0]
			var mod_api_name = (apiName == "cxFilter_Campaigns"&&field.field_data_type === "crossfield")?"Campaigns": (apiName == "Recommendation" || apiName == 'Recommendation_infield') ? 	module.recommendationsDetailsJson.what_to.api_name : this.data.isChildFieldLookup ? moduleRecordMapping[moduleName].api_name : field.multiselectlookup.connected_module.api_name//no i18n
			let searchApiVersion = this.cruxAssets.cxFilterLookupSearchApiVersion || 'v2';//no i18n
			var url = `/crm/${searchApiVersion}/${mod_api_name}/search?` // "/crm/v2/"+mod_api_name+"/search?" //no i18n
			
			if(mod_api_name === "Campaigns" && field.field_data_type === "crossfield"){
				var criteria ="(Campaign_Name:starts_with:"+text.trim().replace(/([<>*()?\\])/g, "\\$1")+")"//and(Status:equals:"+status+"))and(Type:equals:"+type+"))" //no i18n
				var type = this.getData("selectedValues").firstDropDownValue;//no i18n
				if(type){
					criteria = "("+criteria+"and(Type:equals:"+this.data.options.filter(function(item){return item.actual_value == type })[0].display_value+"))"
				}
				var status = this.getData("selectedValues").headDropDownValue;//no i18n
				if(status){
					criteria = "("+criteria+"and(Status:equals:"+this.data.opt1.filter(function(item){return item.actual_value == status })[0].display_value+"))"
				}
			}else{
				criteria="("+this.getData('lookupDisplayField')+":starts_with:"+ text.trim().replace(/([<>*()?\\])/g, "\\$1") +")" //no i18n
			}
			url = url+"criteria="+encodeURIComponent(criteria) //no i18n
			let reqProm ;
			if( this.getMethods('onCustomRequest') ){
				reqProm = this.executeMethod('onCustomRequest',{searchWord : text});
			}
			if( !reqProm ){
				reqProm = this.sendxhr(url, "GET"); //no i18n
			}
			reqProm.then(function(res){ //no i18n
				if(res.response !=="" || res.data){
					 res = res.response ? JSON.parse(res.response).data : res.data;
					 //search.classList.add('dNI') //no i18n
					 Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg","")//no i18n
					 //msg.innerHTML="";
					 self.setData('lookUpArray',[])//no i18n
						if(res.length !=0){
							//self.setData('campaigns',res)	//no i18n
							var len =res.length


							if(renderItems.length == 0){
								self.setData('lookUpArray',res) //no i18n
								$L("#campaign_"+res[0][self.data.lookupDisplayField]).addClass("lyteDropdownSelection");//no i18n
							}else{var flag = false;
								for(var i=0;i<len;i++){
									if(!self.isSelected(res[i],renderItems)){
										flag =true;
										Lyte.arrayUtils(self.getData('lookUpArray'), 'push', res[i]) //no i18n
									}
								}
								if(!flag){
									Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.label.no.options.found'))//no i18n
									//msg.innerHTML = _cruxUtils.getI18n('crm.label.no.options.found') //no i18n
								}else if($L("#campaign_"+self.data.lookUpArray[0][self.data.lookupDisplayField])[0]){
									$L("#campaign_"+self.data.lookUpArray[0][self.data.lookupDisplayField]).addClass("lyteDropdownSelection");//no i18n
								}
							}
						}
				}else{
					Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.label.no.options.found'))//no i18n
					//msg.innerHTML = _cruxUtils.getI18n('crm.label.no.options.found') //no i18n
					// noresult.classList.remove('dNI') //no i18n
					// search.classList.add('dNI') //no i18n
					self.setData('lookUpArray',[]) //no i18n
				}
			},function(errRes){
				if(errRes.status === 403 && errRes.responseText && JSON.parse(errRes.responseText).code === 'NO_PERMISSION')
				{
					Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.security.error'))//no i18n
				}
				else
			    {
                    Lyte.objectUtils(self.getData("displayMsg") ,"add","multiLookupMsg",_cruxUtils.getI18n('crm.chosen.error.loading.text'))//no i18n
				}
				//msg.innerHTML = _cruxUtils.getI18n('crm.chosen.error.loading.text') //no i18n
			})
		}



	},
	valueChanged : function(val,node){

		var field = this.getData('field') //no i18n
		if(field.api_name == "cxFilter_Campaigns"){
			var value = JSON.parse($L("#multiSelect_lookup_"+field.api_name)[0].ltProp('selected'));//no i18n


			// if(   ["Zoho Campaigns","Zoho Webinar1","Zoho Backstage","Zoho Survey"].indexOf(this.data.selectedValues.firstDropDownValue) != -1){

			// }
			if( value.length == 0 ){
				this.setData('memberStatus',false) //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add",{"value2" : []});//no i18n
			}else{
				this.setData('memberStatus',true) //no i18n
			}
			if(node){
				node.open();//No I18n
			}
		}
		if(field.api_name === "Prediction_0" || field.api_name === "Prediction_1"){
			if(this.$node.querySelector("#scoreCheckBox")){
				var $node = $L("#sub_option_" + field.api_name)[0];//No I18n
				var parentNode = $L("#option_Prediction")[0];//No I18n
				if($node.querySelector("#scoreCheckBox").checked && !$node.getData("isScoreSelected")){
					$node.setData("isScoreSelected",true);//No I18n
					parentNode.setData("isScoreSelected",true);//No I18n
				}
				else if(!$node.querySelector("#scoreCheckBox").checked && $node.getData("isScoreSelected")){
					$node.setData("isScoreSelected",false);//No I18n
					parentNode.setData("isScoreSelected",false);//No I18n
				}
			}
		}

		if(field.api_name == "Recommendation" || field.api_name =="Recommendation_infield"){
			var selectedValues = this.getData("selectedValues");//no i18n
			var recommendationType = selectedValues.byDropDownValue;
			if(recommendationType == "Dependent"){
				this.setData("crossSelling",true);//no i18n
				this.setData("reBuy",false);//no i18n

			}else if(recommendationType == "Repeat"){//no i18n
				this.setData("crossSelling",false);//no i18n
				this.setData("reBuy",true);//no i18n
			}else{
				this.setData("crossSelling",false);//no i18n
				this.setData("reBuy",false);//no i18n
			}
		}

		if(field.api_name === "Competitor_Name"){
			var mention_criteria = this.getData('selectedValues').firstDropDownValue;
			if(mention_criteria === '${EMPTY}' || mention_criteria === '${NOTEMPTY}'){
				Lyte.arrayUtils($L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields,'removeAt',1,2);
			}
			else{
				var options = $L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields;
				if(options.length===1){
					// var competitorSentiments = [{"actual_value":"Positive","display_value":"Positive","sequence_number":1,"type":"used"},{"actual_value":"Negative","display_value":"Negative","sequence_number":2,"type":"used"},{"actual_value":"Neutral","display_value":"Neutral","sequence_number":3,"type":"used"}];
					// var competitorOptions = [{api_name: 'Competitor_Duration',data_type: 'date',field_data_type: 'date',field_label: 'Competitor Duration',display_field_label: 'Competitor Duration'},{api_name: 'Competitor_Sentiment',data_type: 'picklist',field_label: 'Competitor Sentiment',display_field_label: 'Competitor Sentiment', pick_list_values: competitorSentiments}];
					Lyte.arrayUtils(options,'push',$L('#option_cxFilter_Competitor_Alert')[0].component.data.field.options.slice(1));
				}
			}
		}

		if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
			this.executeMethod("onValueChange",{ field : field , value : val , comp : this });//No I18n
		}
	},
	hideSubfieldOption : function(ltPropname){
		var field = this.getData("field")//no i18n
//		comp.$node.classList.remove(field.api_name+"_selectedRadioBtn") //no i18n
		var name = this.$node.id;
		if(ltPropname){
			name =ltPropname
		}
		var Selected_node = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")
		if(name == "option_cxFilter_Email_Sentiment"){
			Selected_node[0].classList.remove("dNI")
		}
		var len = Selected_node.length
		if(len !='0'){
			var node = Selected_node[0]
			var id = "sub_option_"+node.ltProp('value'),//no i18n
			subOption = document.getElementById(id);
			if(subOption){
				subOption.style.display = "none";
			}
		}
	},
	getField : function(sub_field,comp){
		var node,field = this.getData("field")//no i18n
		var selected_id = "."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn"
		node = $L(selected_id)[0]
		if(node){
			node.classList.remove(field.api_name+"_selectedRadioBtn") //no i18n
		}
		comp.$node.classList.add(field.api_name+"_selectedRadioBtn") //no i18n
		var id = "sub_option_"+sub_field.api_name //no i18n
		node = document.getElementById(id);
		if(node!=null){
			node.classList.add("cvSubOption");//no i18n
			node.component.render(this.parentCompData)
		}
		if(this.getMethods("onValueChange") && !this.preventValChangeCallback){
			this.executeMethod("onValueChange",{ field : field , sub_field : sub_field });//No I18n
		}
	},
	isSelected : function(Obj,renderItems){
		// var label = this.getData('lookupDisplayField')//no i18n
		var len = renderItems.length
		for(var i=0;i<len;i++){
			if(renderItems[i].id ==Obj.id){
				return true
			}
		}
		return false
	},
	hideDropDown : function(){
		var field = this.getData('field') //no i18n
		// var msg = $L('#display_msg_'+field.api_name)[0] //no i18n
		// var noresult = $L("#"+field.api_name+"_noOption")[0] //no i18n
		Lyte.objectUtils(this.getData("displayMsg") ,"add","multiLookupMsg","")//no i18n
		// msg.classList.remove('dNI') //no i18n
		//noresult.classList.add('dNI') //no i18n
		//var node = document.querySelector("#"+field.api_name+"_Search_val") //no i18n
		this.setData('lookUpArray',[]) //no i18n
		//node.ltProp('value','')//no i18n
	},
	setServiceStatus : function(key , _this){
		if( this.cruxAssets.setOptForCampaignsServiceStatus ){
			Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , this.cruxAssets.setOptForCampaignsServiceStatus({campaign_type : key}) );//no i18n
			return ;
		}
			_this.serviceStatusMap = {"Zoho Webinar"  : [{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Registered",actual_value : "Registered"},{display_value : "Attended",actual_value : "Attended"}],//no i18n
								  "Zoho Backstage" : [{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Yet to check in" ,actual_value : "Yet to check in" },{display_value : "Purchased",actual_value :"Purchased" },{display_value :"Checked in" ,actual_value :"Checked in" },{display_value : "Cancelled" ,actual_value :  "Cancelled"}],//no i18n
								 "Zoho Survey"    : [{display_value : "Yet to visit",actual_value :"Yet to visit" },{display_value : "Visited",actual_value : "Visited"},{display_value : "Partially Completed",actual_value : "Partially Completed"},{display_value : "Completed",actual_value : "Completed"}]
								 }
			// _this.serviceStatusMap["Zoho Campaigns"] = [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Bounced",actual_value :  "Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" }]//no i18n
			// if( Crm && Crm.userDetails &&  Crm.userDetails.isSoftBouncedEnabled){
				_this.serviceStatusMap["Zoho Campaigns"]= [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Hard Bounced",actual_value :  "Hard Bounced"},{display_value:"Soft Bounced" , actual_value : "Soft Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" }]//no i18n
			// }
			// _this.allService = [{display_value :"Yet to Send" ,actual_value : "Yet to Send"} ,{display_value : "Sent",actual_value :"Sent" },{display_value : "Opened",actual_value : "Opened"},{display_value :"Clicked" ,actual_value : "Clicked"},{display_value :  "Bounced",actual_value :  "Bounced"},{display_value : "Marked As Spam",actual_value :"Marked As Spam" },{display_value : "Skipped",actual_value : "Skipped"},{display_value : "Replied",actual_value : "Replied"},{display_value : "Opted Out",actual_value : "Opted Out" },{display_value : "Registered",actual_value : "Registered"},{display_value : "Attended",actual_value : "Attended"},{display_value :"Invited" ,actual_value : "Invited"},{display_value : "Yet to check in" ,actual_value : "Yet to check in" },{display_value : "Purchased",actual_value :"Purchased" },{display_value :"Checked in" ,actual_value :"Checked in" },{display_value : "Cancelled" ,actual_value :  "Cancelled"},{display_value : "Yet to visit",actual_value :"Yet to visit" },{display_value : "Visited",actual_value : "Visited"},{display_value : "Completed",actual_value : "Completed"}];//no i18n
			// _this.allService = _this.sortArray(activeOptions , "display_value");//no i18n
			Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , []);//no i18n
			Lyte.objectUtils(_this.data.selectedValues ,"add",{Service_Status :[]});//no i18n
			if( ["Zoho Campaigns","Zoho Webinar","Zoho Backstage","Zoho Survey"].indexOf(key) != -1){
					Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.serviceStatusMap[key]);//no i18n
			}else if(!key){
				if( _this.allService && _this.allService.length){
					Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.allService);//no i18n
					return
				}
				if( !_this.data.options.length ){
					return "";
				}
				//to check active integration and concat the options
				var camType =_this.data.options,  camTypeLen = camType.length , activeOptions = []
				for( var i = 0 ; i < camTypeLen ; i++ ){
					if( _this.serviceStatusMap[camType[i].actual_value] ){
						var j = 0 , eachTypeOption = _this.serviceStatusMap[camType[i].actual_value] , optLen = eachTypeOption.length;
						for( j = 0 ; j < optLen ; j++ ){
							if( !activeOptions.filter(function(item){ return item.actual_value == eachTypeOption[j].actual_value })[0] ){ //eslint-disable-line no-loop-func
								activeOptions.push(eachTypeOption[j]);
							}
						}
					}
				}
				_this.allService = _this.sortArray(activeOptions , "display_value");//no i18n
				Lyte.objectUtils(_this.getData("field") ,"add","serviceStatus" , _this.allService);//no i18n
			}

	},

	setDropDownValuesFun : function(setAllVal){
		var options = this.cruxCondMapping;
			var field = this.getData("field"),bydropdownOption = [],opt1 = [],durationOpt = [],dateoptions = [],opt = [],dateOpt = []//No I18n
			var moduleRecordMapping = this.moduleRecordMapping
			if( field.data_type == "dynamicFilter" ){
				return
			} 
			if(field.field_data_type == "crossfield" && field.api_name !="cxFilter_Campaigns"){
				// if( field.api_name == "cxFilter_Recent_prediction_score" ){ //no i18n
				// 	this.setData("dateoptions",[{system : "DAY", display : _cruxUtils.getI18n("days")}, {system : "WEEK", display : _cruxUtils.getI18n("weeks")}, {system : "MONTH", display : _cruxUtils.getI18n("months")}]);//no i18n
				// 	bydropdownOption = [{system : "goneup" , display : _cruxUtils.getI18n('crm.intelligence.prediction.trendup')},{system : "gonedown" , display : _cruxUtils.getI18n('crm.intelligence.prediction.trenddown')}] //no i18n
				// }else 
				if(field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
					opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${TODAY}' , display : _cruxUtils.getI18n('Today')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{ 'system' : '${AGEINDAYS}+30' , display : _cruxUtils.getI18n('crm.condition.last.30.days')},{ 'system' : '${AGEINDAYS}+60' , display : _cruxUtils.getI18n('crm.condition.last.60.days')},{ 'system' : '${AGEINDAYS}+90' , display : _cruxUtils.getI18n('crm.condition.last.90.days')},{ 'system' : '${CURRENTTIME}' , display : _cruxUtils.getI18n('crm.condition.until.now')}] //no i18n
					bydropdownOption = [{'system' : 'Positive' , 'display' : _cruxUtils.getI18n('crm.sentiment.Positive') },{'system' : 'Negative' , 'display' : _cruxUtils.getI18n('crm.sentiment.Negative') },{'system' : 'PositiveAndNegative' , 'display' : _cruxUtils.getI18n('sentiment.positiveandnegative') },{'system' : 'PositiveOrNegative' , 'display' : _cruxUtils.getI18n('sentiment.positiveornegative') },{'system' : 'PositiveOnly' , 'display' : _cruxUtils.getI18n('sentiment.positiveonly') },{'system' : 'NegativeOnly' , 'display' : _cruxUtils.getI18n('sentiment.negativeonly') },{'system' : 'Neutral' , 'display' : _cruxUtils.getI18n('crm.sentiment.Neutral') }]//no i18n
				}
			}else if(field.api_name =="cxFilter_Campaigns"){ //no i18n
				//opt = [{'system' : '' , 'display' : _cruxUtils.getI18n('crm.filters.select.campaign.type',_cruxUtils.getI18n('Campaign')) },{'system' : 'Advertisement' , 'display' : _cruxUtils.getI18n('Advertisement') },{'system' : 'Banner Ads' , 'display' : _cruxUtils.getI18n('Banner\ Ads') },{'system' : 'Conference' , 'display' : _cruxUtils.getI18n('Conference') },{'system' : 'Direct mail' , 'display' : _cruxUtils.getI18n('Direct\ mail') },{'system' : 'Email' , 'display' : _cruxUtils.getI18n('crm.taskreminder.line8') },{'system' : 'Others' , 'display' : _cruxUtils.getI18n('Others') },{'system' : 'Partner' , 'display' : _cruxUtils.getI18n('Partner') },{'system' : 'Public Relations' , 'display' : _cruxUtils.getI18n('Public\ Relations') },{'system' : 'Referral Program' , 'display' : _cruxUtils.getI18n('Referral\ Program') },{'system' : 'Telemarketing' , 'display' : _cruxUtils.getI18n('Telemarketing') },{'system' : 'Trade Show' , 'display' : _cruxUtils.getI18n('Trade\ Show') },{'system' : 'Webinar' , 'display' : _cruxUtils.getI18n('Webinar') }] //no i18n
				this.setData({dropdownSysValue : "actual_value",dropdownDispValue : "display_value"});//no i18n
				var t_field = moduleRecordMapping.Campaigns.fields.filterBy({api_name : "Type"})[0];//no i18n
				if( t_field && t_field.visible && t_field.available_in_user_layout){
					opt =  t_field ? t_field.pick_list_values.slice(0) : [];//no i18n
					opt = opt.filter(function(item){return item.type != "unused"});//no i18n
					this.removeValue(opt,"actual_value",["-None-"]);opt = this.sortArray(opt,'display_value');//no i18n
					if(Crm && Crm.zohoCampaignEnabled){
						this.removeValue(opt,"actual_value",["Zoho Campaigns"])//no i18n
						 opt.unshift({'actual_value' : Crm.partnerName + " Campaigns" , 'display_value' : Crm.partnerName + " Campaigns" });//no i18n
					}
					opt.unshift({'actual_value' : '' , 'display_value' : "-"+_cruxUtils.getI18n('crm.filters.select.campaign.type',_cruxUtils.getI18n('Campaign'))+"-" });//no i18n
				}else{
					this.setData("firstDropdown",false);//no i18n
				}
				t_field = moduleRecordMapping.Campaigns.fields.filterBy({api_name : "Status"})[0];//no i18n
				if( t_field && t_field.visible && t_field.available_in_user_layout){
					var opt1 =  t_field ? t_field.pick_list_values.slice(0) : [];//no i18n
					opt1 = opt1.filter(function(item){return item.type != "unused"});//no i18n
					this.removeValue(opt1 , "actual_value" , ["-None-"]);opt1 = this.sortArray(opt1,'display_value');//no i18n
					opt1.unshift({'actual_value' : '' , 'display_value' : "-"+_cruxUtils.getI18n('crm.filters.select.campaign.status',_cruxUtils.getI18n('Campaign'))+"-" });//no i18n
				}

				//var opt1 = [{'system' : '' , 'display' : _cruxUtils.getI18n('crm.filters.select.campaign.status',_cruxUtils.getI18n('Campaign')) },{ 'system' : 'Active' , 'display' : _cruxUtils.getI18n('Active')},{ 'system' : 'Complete' , 'display' : _cruxUtils.getI18n('Complete')},{ 'system' : 'Inactive' , 'display' : _cruxUtils.getI18n('Inactive')},{ 'system' : 'Planning' , 'display' : _cruxUtils.getI18n('Planning')}] //no i18n
			}
			// else if(field.field_data_type == "recordlocks"){//NO I18N
				// $L("#recLock").css("display", "None");//NO I18N
			 // 	if(field.api_name == "Locked_True"){//no i18n
			 // 		$L("#recLock").css("display", "inline-block");//NO I18N
				// 	opt=[{'system' :'all_lock' , 'display' : _cruxUtils.getI18n('crm.globalsearch.option.all')},{'system' :'record_locking' , 'display' : _cruxUtils.getI18n('crm.record.label.recordlocking')},{'system' :'orchestration' , 'display' : _cruxUtils.getI18n('crm.label.automation.orchestration')}] //no i18n
				// 	Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "all_lock");//no i18n
				// }
				// else{
			 // 		$L("#recLock").css("display", "None");//NO I18N
				// }

			// }
			else if(field.field_data_type == "activity"){//no i18n
				if(field.api_name == "Overdue"){
					var modData=moduleRecordMapping[this.data.module];
					opt=[{'system' :'Activities' , 'display' : _cruxUtils.getI18n('Activities')},{'system' :'Tasks' , 'display' : _cruxUtils.getI18n('Tasks')},{'system' :'Calls' , 'display' : _cruxUtils.getI18n('Calls')}] //no i18n
					if(this.data.parentField && this.data.parentField.appointmentsOptEnabled){
						var appObj = {'system' :'Appointments' , 'display' : _cruxUtils.getI18n('Appointments')};
						opt.push(appObj);
					}
				}else if(field.api_name == "Activity_Due"){ //no i18n
					//eslint-disable-next-line no-useless-escape
					opt=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')},{'system' :'${DUEINDAYS}+7' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','7')},{'system' :'${TODAYANDOVERDUE}' , 'display' : _cruxUtils.getI18n('Today\ +\ Overdue')}] //no i18n
					Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAYANDOVERDUE}");//no i18n
				}
			}else if(field.field_data_type == "custom"){ //no i18n
				bydropdownOption = [{'system' : 'UserAndSystem' , 'display' : _cruxUtils.getI18n('crm.source.user.and.system') },{'system' :'UserOrSystem' , 'display' : _cruxUtils.getI18n('crm.source.user.or.system') },{'system' : 'User' , 'display' : _cruxUtils.getI18n('User') },{'system' : 'System', 'display' : _cruxUtils.getI18n('crm.label.system2') },{'system' : 'OnlyByUser' , 'display' : _cruxUtils.getI18n('crm.source.user.only') },{'system' : 'OnlyBySystem' , 'display' : _cruxUtils.getI18n('crm.source.system.only') }] //no i18n
				opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${TODAY}' , display : _cruxUtils.getI18n('Today')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{ 'system' : '${THISYEAR}' , display : _cruxUtils.getI18n('crm.thisyear')},{ 'system' : '${AGEINDAYS}+30' , display : _cruxUtils.getI18n('crm.condition.last.30.days')},{ 'system' : '${AGEINDAYS}+60' , display : _cruxUtils.getI18n('crm.condition.last.60.days')},{ 'system' : '${AGEINDAYS}+90' , display : _cruxUtils.getI18n('crm.condition.last.90.days')},{ 'system' : '${CURRENTTIME}' , display : _cruxUtils.getI18n('crm.condition.until.now')}] //no i18n
				this.setData('recordDropdownValues',field.values) //no i18n
				if(field.api_name == "cxFilter_Email_Status"){
					bydropdownOption = field.options
					opt = this.getData('withOption') //no i18n
				}
				//this.setData('bydropdownOption',optionVal)//no i18n
			}else if(field.api_name == "Recommendation"){ //no i18n
				//eslint-disable-next-line no-useless-escape
				// sthis.setData('recordDropdownValues',field.values) //no i18n
				this.setData('firstDropdown',false);//no i18n
				// renderRecommendation = false;
				var recommendationBasedOnOption = {
					FirstTime : {'system': 'FirstTime', 'display': _cruxUtils.getI18n('crm.filter.label.firstbuy')}, //no i18n
					Dependent : {'system': 'Dependent', 'display': _cruxUtils.getI18n('crm.filter.label.cwbab')}, //no i18n
					Bundle : {'system': 'Bundle', 'display': _cruxUtils.getI18n('crm.filter.label.fbt')}, //no i18n
					Repeat : {'system': 'Repeat', 'display': _cruxUtils.getI18n('crm.filter.label.rebuy')}, //no i18n
					Sequence: {'system': 'Sequence', 'display': _cruxUtils.getI18n('crm.filter.label.nextbuy')}  //no i18n
				};
				if(moduleRecordMapping && moduleRecordMapping[this.data.module] && moduleRecordMapping[this.data.module].isRecommendationsEnable && moduleRecordMapping[this.data.module].recommendationsDetailsJson){
					var recommendationsDetailsJson = moduleRecordMapping[this.data.module].recommendationsDetailsJson;
					if(recommendationsDetailsJson && recommendationsDetailsJson.suggestion_type){
						var suggestion_type = recommendationsDetailsJson.suggestion_type;
						bydropdownOption = [];
						if (suggestion_type.first_buy && suggestion_type.first_buy.enabled) {
							recommendationBasedOnOption.FirstTime = {'system' :'FirstTime' , 'display' : suggestion_type.first_buy.label}; //no i18n
						}else{
							recommendationBasedOnOption.FirstTime = undefined;
						}
						if (suggestion_type.customer_also_bought && suggestion_type.customer_also_bought.enabled) {
							recommendationBasedOnOption.Dependent = {'system' :'Dependent' , 'display' : suggestion_type.customer_also_bought.label};//no i18n
						}else{
							recommendationBasedOnOption.Dependent = undefined;
						}
						if (suggestion_type.frequently_bought_together && suggestion_type.frequently_bought_together.enabled) {
							recommendationBasedOnOption.Bundle = {'system' :'Bundle' , 'display' : suggestion_type.frequently_bought_together.label};//no i18n
						}else{
							recommendationBasedOnOption.Bundle = undefined;
						}
						if (suggestion_type.rebuy && suggestion_type.rebuy.enabled) {
							recommendationBasedOnOption.Repeat = {'system' :'Repeat' , 'display' : suggestion_type.rebuy.label};//no i18n
						}else{
							recommendationBasedOnOption.Repeat = undefined;
						}
						if (suggestion_type.next_buy && suggestion_type.next_buy.enabled) {
							recommendationBasedOnOption.Sequence = {'system' :'Sequence' , 'display' : suggestion_type.next_buy.label};//no i18n
						}else{
							recommendationBasedOnOption.Sequence = undefined;
						}
					}
				}

				this.setData("recommendationBasedOnOption",recommendationBasedOnOption); //no i18n
			}
			else if(field.api_name === "Prediction" || field.api_name === "Prediction_0" || field.api_name === "Prediction_1" ){
				var node = field.api_name === "Prediction" ? $L("#option_Prediction")[0] : $L("#sub_option_" + field.api_name)[0];//no i18n
				var scoreOperators = node.component.numberWithOEmptyConditions;
				Lyte.objectUtils(node.getData("predictionOptions"),"add","score_operator",scoreOperators);//No I18n
			}
			else if(field.data_type === "BestTime" && field.api_name === "best_time"){		
				bydropdownOption=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')}] //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAY}");//no i18n		
			}
			else if(field.data_type === "NBX" && field.api_name === "NBX_Available" && !this.data.userDetails.NBX_GOAL){
				opt=[{'system' :'${TODAY}' , 'display' : _cruxUtils.getI18n('Today')},{'system' :'${TOMORROW}' , 'display' : _cruxUtils.getI18n('Tomorrow')},{'system' :'${DUEINDAYS}+7' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','7')},{'system' :'${DUEINDAYS}+15' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','15')},{'system' :'${DUEINDAYS}+30' , 'display' : _cruxUtils.getI18n('crm.livedesk.pot.nextdays','30')}] //no i18n
				Lyte.objectUtils(this.getData("selectedValues") ,"add","firstDropDownValue" , "${TODAY}");//no i18n
			} 
			else if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.module)!= -1){ //no i18n
				//eslint-disable-next-line no-useless-escape
				opt = [{ 'system' : 'Scheduled' , display : _cruxUtils.getI18n('Scheduled')},{ 'system' : 'Attended Dialled' , display : _cruxUtils.getI18n('Attended\ Dialled')},{ 'system' : 'Unattended Dialled' , display : _cruxUtils.getI18n('Unattended\ Dialled')},{ 'system' : 'Overdue' , display : _cruxUtils.getI18n('Overdue')},{ 'system' : 'Cancelled' , display : _cruxUtils.getI18n('Cancelled')},{ 'system' : 'Received' , display : _cruxUtils.getI18n('Received')},{ 'system' : 'Missed' , display : _cruxUtils.getI18n('Missed')}] //no i18n
			}else{
				var field_data_type = field.field_data_type //no i18n
				// if( field.field_data_type == "formula" || field.dataparam.return_type){
				// 	field_data_type = (field.field_data_type == "formula")?field.formula.return_type : field.dataparam.return_type; //no i18n
				// }
				if( field_data_type == "multiselectpicklist" && this[field_data_type+"Conditions"]){
					opt = this[field_data_type+"Conditions"];
				}else{
					opt = this[options[field_data_type]+"Conditions"];
					// opt = opt ? opt : this.defaultConditions;
				}
				opt = opt ? opt : [];
				
// (field.show_type == 13 && [ "Recency" , "Frequency"  , "Monetary"].indexOf(field.api_name) !== -1) ||
				if(  field.ui_type == 80 ||  ([ "Positive_Score" , "Negative_Score"  , "Touch_Point_Positive_Score" , "Touch_Point_Negative_Score" , "Touch_Point_Score" , "Score"].indexOf(field.api_name) !== -1 && field.ui_type == undefined) ){
					opt.pop();opt.pop();
				}else if(["APPOINTMENTSTATUS","SERVICESTATUS"].indexOf(field.column_name)!= -1){//no i18n
					opt = this.defaultConditions;
				}
				if( "Email" ==  field.column_name && this.$node._callee.component.data.isFromModal){
					opt.pop();opt.pop();
				} else if(field.api_name == "cxFilter_Deal_Owner"){ //We can't apply cross of Cross filter in custom view. So restricting role and group operator in cross deal owner
					opt = this.defWithEmptyConditions;
				}
				if(["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field && (this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT ||  !this.$node._callee.component.blockedCriteriaSelected) ){
					Lyte.arrayUtils(opt, 'push', [{system : '${BLOCKED}',display : _cruxUtils.getI18n('crm.filter.email.isblocked')},{system :'${NOTBLOCKED}' ,display : _cruxUtils.getI18n('crm.filter.email.isnotblocked')}]) //no i18n
				}
				if(field.field_data_type == "multiselectlookup" || this.data.isChildFieldLookup){
					if(field.ui_type == "445"){
						ele = "user";opt = this.booleanConditions //no i18n
					}else{
						var id = this.data.isChildFieldLookup ? field.lookup.module.id : field.multiselectlookup.connected_module.id;
						this.setData('placeholderValue',[_cruxUtils.getI18n('crm.module.name',moduleRecordMapping[this.idModuleMapping[id]].singular_label)]) //no i18n
						opt = [{system : "equal", display : _cruxUtils.getI18n("is")},{system : "${EMPTY}", display : _cruxUtils.getI18n("is empty")}] //no i18n
					}
				}
				
				if(["cxFilter_Linked_Segment__s"].includes(field.api_name)) {
					opt = [{
						system: "equal", // NO I18N
						display: _cruxUtils.getI18n("is") // NO I18N
					}, {
						system: "${EMPTY}", // NO I18N
						display: _cruxUtils.getI18n("is empty") // NO I18N
					}];
				}
				
				if(field.field_data_type == "picklist" && field.history_tracking){
					 var durationOpt = [{system : "greater_than", display : ">"},{system : "less_than", display : "<"},{system : "greater_equal", display : ">="},{system : "less_equal", display : "<="},{system : "equal", display : "="}] //no i18n
					//this.setData('durationOpt',durationOpt) //no i18n
				}
				// if(field.api_name == "cxFilter_Prediction_Score"){
				// 	opt = [{system : "less_than", display : "<"},{system : "greater_than", display : ">"},{system : "less_equal", display : "<="},{system : "greater_equal", display : ">="},{system : "between", display : _cruxUtils.getI18n('between')}] //no i18n
				// }
				if(field.api_name == "count" || field.api_name == "percentage"){
					opt = [{system : "greater_than", display : ">"},{system : "less_than", display : "<"},{system : "greater_equal", display : ">="},{system : "less_equal", display : "<="},{system : "equal", display : "="}] //no i18n
				}
			}
			if(field.field_data_type == "tag"){
				opt = this.defWithEmptyConditions;
			}else if( ["ACTIVITYTYPE","LAYOUTID","PROCESSINGBASIS","SE_STATUS","WIZARDID"].indexOf(field.column_name) != -1 ){//no i18n
				opt = this.defaultConditions;
			}else if( field.column_name == "STAGE" || field.api_name == "cxFilter_Deal_Stage"){//no i18n
				opt = this.stageConditions;
			}
			if( ["date" , "datetime" , "date_time"].includes(field.field_data_type) || field.api_name == "cxFilter_Email_Sentiment" ){
				if(field.api_name == "Without_Any_Activity" || field.api_name == "Without_Any_Notes" || field.api_name == "Attended" || field.api_name == "cxFilter_Email_Sentiment"){ //no i18n
					opt=this.getData('withOption') //no i18n
					if(setAllVal){
						if(field.api_name == "cxFilter_Email_Sentiment" && opt.filter(function(item){return item.system == "${CURRENTTIME}"}).length == 0){
							Lyte.arrayUtils(opt, "push", {system : "${CURRENTTIME}", display : _cruxUtils.getI18n("condition.till.now")});//No I18n
						}else if(opt.filter(function(item){return item.system == "${EMPTY}"}).length == 0){ //no i18n
							Lyte.arrayUtils(opt, "push", {system : "${NOTEMPTY}", display : _cruxUtils.getI18n("crm.condition.till.today")});//No I18n
						}
					}
				}else if(field.api_name == "Activity_Done" || field.api_name =="Notes_Added" || field.api_name == "Missed"){ //no i18n
					opt = this.getData('withOption') //no i18n
				}else if(field.api_name == "With_Open_Deal" || field.api_name == "Without_Open_Deal"){ //no i18n
					opt = [{ 'system' : 'Age in Days' , display : _cruxUtils.getI18n('crm.condition.in.last')},{ 'system' : '${THISWEEK}' , display : _cruxUtils.getI18n('crm.thisweek')},{ 'system' : '${THISMONTH}' , display : _cruxUtils.getI18n('crm.label.this.month')},{system : "${LASTWEEK}", display : _cruxUtils.getI18n("Last\ Week")},{system : "${LASTMONTH}", display : _cruxUtils.getI18n("Last\ Month")}]  //no i18n
					dateOpt = [{'system' : '${AGEINMONTHS}+1' , display : _cruxUtils.getI18n('crm.recurring.no.months','1')},{'system' : '${AGEINMONTHS}+2' , display : _cruxUtils.getI18n('crm.recurring.no.months','2')},{'system' : '${AGEINMONTHS}+3' , display : _cruxUtils.getI18n('crm.recurring.no.months','3')},{'system' : '${AGEINMONTHS}+4' , display : _cruxUtils.getI18n('crm.recurring.no.months','4')},{'system' : '${AGEINMONTHS}+5' , display : _cruxUtils.getI18n('crm.recurring.no.months','5')},{'system' :'${AGEINMONTHS}+6' , display : _cruxUtils.getI18n('crm.recurring.no.months','6')}] //no i18n
					this.setData('dateoptions', (setAllVal) ? dateOpt : [dateOpt[0]]) //no i18n
				}
			}
			if(field.ui_type == 53){
				opt = this.numberConditions.slice(0,6);
				this.setData("dateoptions",[
					{system : "HOURS", display : _cruxUtils.getI18n("hours")},
					{system : "DAYS", display : _cruxUtils.getI18n("days")},		
					{system : "WEEKS", display : _cruxUtils.getI18n("weeks")},
					{system : "MONTHS", display : _cruxUtils.getI18n("months")},
					{system : "YEARS", display : _cruxUtils.getI18n("years")}
				]);
			}
			if( field.ui_type == 132 ){
				var moduleList = field.multi_module_lookup.modules , dateOpt = [] , moduleDet ;
				for(const module of moduleList){
					moduleDet = this.moduleRecordMapping[this.idModuleMapping[module.id]];
					dateOpt.push( { system : moduleDet.id, display : moduleDet.plural_label } );
				}
				this.setData('dateoptions', (setAllVal) ? dateOpt : [dateOpt[0]]) //no i18n
			}
			if( field.crypt ){
				var opt = this.encryptNumberConditions;
				if( this.data.cruxElement1 != "number" || ["date","datetime","currency"].indexOf(this.data.field.field_data_type) != -1 ){
					this.setData({"cruxElement1" : false , "showSecondDropdownType" : ""});//no i18n
					opt = this.defEmptyConditions;
				}
			}
			if( field.cxFieldsDetails && field.cxFieldsDetails[0] ){
				bydropdownOption = field.cxFieldsDetails[0].cxOptions;
			}
			if( field.api_name == "cxFilter_UnallocatedRecords"){
				this.setData("crossFields" , field.crossFields);//no i18n
				this.setData('firstDropdown', false) //no i18n
				opt = [];
			}
			this.triggerConditionCallback(opt , setAllVal , false , { bydropdownOption : bydropdownOption});
			// var callbackArgs = {field : this.data.field,condition : opt , type : options[field_data_type] , dateOption : this.data.dateoptions}
			// if(this.cruxAssets.setFieldBasedFilterComparator){
			// 	callbackArgs.condition = opt;
			// 	opt = cruxAssets.setFieldBasedFilterComparator(callbackArgs);
			// }
			// if( this.getMethods("setConditions") ){
			// 	opt = this.executeMethod("setConditions",callbackArgs)
			// }
			

			// if(opt && opt.length){
			// 	var optDisableList = opt.filter(a=>a.cxDisabled).map(item=>item.system);
			// 	this.setData('optionsDisabledList',optDisableList);
			// }
			if(setAllVal){
				this.setData({durationOpt : durationOpt,opt1 : opt1});
			}else{
				//this.setData("dateoptions",this.getData("dateoptions")[0])
				this.setData({durationOpt : [durationOpt[0]],opt1 : [opt1[0]]});
			}
	},
	showAlertMsg : function(alertMsg,comp){
		var ele = document.getElementById("cxFilterAlert");
		// if(!ele){
		// 	ele = Lyte.Component.render("lyte-alert", {ltPropWrapperClass:  "cxSmartFilterAlert", id : "cxFilterAlert", ltPropShowCloseButton : false, ltPropButtonPosition : "center",
		// 		ltPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}], ltPropContentAlign : "left"}, "body");//No I18n
		// }
		if( !ele ){
			return
		}
		$("crux-smart-filter")[0].setData("alertMsg",alertMsg);//no i18n
		ele.ltProp({"top" :'0px'});//No I18n
		ele.ltProp("show", true);//No I18n
		ele.setMethods({onClose : function(){
			if(comp && comp.$node.querySelector("lyte-input")){
				comp.$node.querySelector("lyte-input").focus();//No I18n
			}else if(comp && comp.$node.querySelector("lyte-number")){//no i18n
				comp.$node.querySelector("lyte-number").focus();//No I18n
			}
		},onShow : function(){
			$L(".cxSmartFilterAlert lyte-button").focus();//no i18n
		}
	})
	},
	triggerConditionCallback : function(opt , setAllVal , preventGetValueFn=false , moreData={}){
		var field = this.data.field , cond , selectedValue;
		var callbackArgs = {field : this.data.field,condition : opt ? opt : [], type : this.cruxCondMapping[field.field_data_type] , dateOption : this.data.dateoptions, comp : this}
		callbackArgs.fieldOption = moreData.bydropdownOption ? moreData.bydropdownOption : [];
		if( field.cxDynamicFilterCriteriaComponent && this.cruxAssets.getDynamicFilterCriteriaCondtions ){
			callbackArgs.condition = opt;
			cond = this.cruxAssets.getDynamicFilterCriteriaCondtions(field , opt);
			if( cond && cond.constructor === Array){
				opt = cond;
			}else if(cond && cond.constructor === Object ){
				opt = cond.condition ? cond.condition : opt;
				callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
				selectedValue = cond.selected ? cond.selected : selectedValue;
			}
		}
		if(this.cruxAssets.setFieldBasedFilterComparator){
				callbackArgs.condition = opt;
				cond = cruxAssets.setFieldBasedFilterComparator(callbackArgs);
				if(cond && cond.constructor == Array){
					opt = cond;
				}else if(cond && cond.constructor == Object ){
					opt = cond.condition ? cond.condition : opt;
					callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
					selectedValue = cond.selected ? cond.selected : selectedValue;
					callbackArgs.prefixDropdownOption = cond.prefixDropdownOption ? cond.prefixDropdownOption : [];
				}

				// if( cond && cond.length ){
				// 	opt = cond;
				// }
			}
			let compScope = this.parentCompData || this; // to Execute setConditions callback for parent component.
			if( compScope.getMethods("setConditions") ){
				callbackArgs.condition = opt;
				cond = compScope.executeMethod("setConditions",callbackArgs)
				if(cond && cond.constructor == Array){
					opt = cond;
				}else if(cond && cond.constructor == Object ){
					opt = cond.condition ? cond.condition : opt;
					callbackArgs.fieldOption = cond.fieldOption ? cond.fieldOption : callbackArgs.fieldOption;
					selectedValue = cond.selected ? cond.selected : selectedValue;
					Lyte.objectUtils(this.data.selectedValues ,"add","firstDropDownValue" , selectedValue);//no i18n
					callbackArgs.prefixDropdownOption = cond.prefixDropdownOption ? cond.prefixDropdownOption : [];
				}
			}
			selectedValue = selectedValue ? selectedValue : opt && opt[0] ?opt[0].system : "";
			if(setAllVal){
				this.setData({options : opt ,bydropdownOption :  callbackArgs.fieldOption});
			}else{
				//this.setData("dateoptions",this.getData("dateoptions")[0])
				this.setData({options : (field.api_name === "Activity_Due") ? [opt[3]] : [opt[0]] , bydropdownOption : callbackArgs.fieldOption});
			}
			if( selectedValue && this.data.firstDropdown && !preventGetValueFn){
				this.getValue( selectedValue ,undefined,true)
			}
			this.setData("sentStatus", field.sent_status ? field.sent_status : []);//no i18n
			if( callbackArgs.prefixDropdownOption && callbackArgs.prefixDropdownOption.length ){
				this.checkValuePrefixDD("get",callbackArgs.prefixDropdownOption);
			}

			let sentStatusArr = this.getData("sentStatus"); //no i18n				
			let sentStatusFlag = sentStatusArr.length > 0 ? true : false;
			
			this.setData('sentStatusFlag', sentStatusFlag); //no i18n

			if(opt && opt.length){
				var optDisableList = opt.filter(a=>a.cxDisabled).map(item=>item.system);
				this.setData('optionsDisabledList',optDisableList);
			}
			// if( field.cxForceSetCondition ){
				var dropdownNode = $L('#DDV_'+field.api_name)[0];
				if( dropdownNode ){
					dropdownNode.resetSelected();
				}
			// }

	},
	checkValuePrefixDD : function(type = "get" , options=[] , selectedPrefix , criteriaValue){ //no i18n
		var field = this.data.field , selectedItem;
		if(type === "set"){
			if( !this.data.valuePrefixDropdownOpt.prefixOption.length ){
				return "" ;
			}
			var checkSelectedOpt = function(opt, selVal){
				var pick_vals = opt[opt.api_name];
				var filtVal = pick_vals.filter(function(val){ return val[opt.getValueArgs] === selVal[0]; }) ;
				if( filtVal[0] ){
					return true;
				}
			};
			options = this.data.valuePrefixDropdownOpt.prefixOption;
			options.forEach(function(item){
				if( checkSelectedOpt(item , criteriaValue) ){
					selectedItem = item;
					Lyte.objectUtils(this.data.valuePrefixDropdownOpt , 'add' , 'selected' ,item );
					return "";
				}
			}.bind(this));
			// return "";
		}
		if( type === 'change' ){
			if(!selectedPrefix){
				return "";
			}
			options = this.data.valuePrefixDropdownOpt.prefixOption;
			selectedItem = options.filter(function(item){
				return item.actual_value === selectedPrefix;
			})[0];
			var ele = this.data.cruxElement1;
			this.setData('cruxElement1', "");
			Lyte.objectUtils(this.data.selectedValues , 'add' , {value1 : undefined});
			// selvalues = {picklistValues : selectedItem[selectedItem.api_name]};
			// this.setData('childCompProps', JSON.stringify(selvalues));//no i18n
			// Lyte.objectUtils(field , 'add' , 'pick_list_values' , selectedOpt[selectedOpt.api_name]);
			this.setData('cruxElement1', ele);
			Lyte.objectUtils(this.data.valuePrefixDropdownOpt , 'add' , 'selected' ,selectedItem );
			// return "";
		}
		if(!options.length){
			return "";
		}
		if( type === "get"){
			var valueOpt = {api_name : "pick_list_values" ,getValueArgs : "display_value", actual_value : "value",display_value : _cruxUtils.getI18n('crm.label.value') };
			valueOpt.cxDisableExtraValue = field.cxDisableExtraValue;
			options.unshift(valueOpt);
			// options.push({api_name : "record_state" ,getValueArgs : "actual_value" ,actual_value : "record_state",display_value : "Record State" , record_state : [{actual_value : "${STATE.open}" , display_value : "Open" , type :"used"},{actual_value : "${STATE.success}" , display_value : "Success" , type :"used"}]}); 
			
			options.forEach(function(item){
				if( !item.getValueArgs ){
					item.getValueArgs = "display_value";
				}
				if( !item.cxDisableExtraValue ){
					item.cxDisableExtraValue = false;
				}
				if(field[item.api_name]){
					item[item.api_name] = field[item.api_name];
				}
				if(item.selected){
					selectedItem = item;
				}
			});
			selectedItem = selectedItem ? selectedItem : options[0];
			Lyte.objectUtils(this.data.valuePrefixDropdownOpt , "add",{prefixOption : options , selected : selectedItem});
		}
		if(selectedItem){
			Lyte.objectUtils(field , 'add' , 'cxDisableExtraValue' , selectedItem.cxDisableExtraValue);//no i18n
			this.data.picklistValues = selectedItem[selectedItem.api_name];
			var selvalues = {picklistValues : this.data.picklistValues};
			this.setData('childCompProps', JSON.stringify(selvalues));//no i18n	
		}	
	},
	observesCriteria : function(){
		this.setCriteria();
	}.observes("cxPropCriteria"),//no i18n
	setCriteria : function(){
		if( !this.data.cxPropCriteria || !this.data.rendered ){
			return;
		}
		this.preventValChangeCallback = true;
		if( typeof Crm && !this.data.cxPropIgnoreCallbackInSetCriteria){ //getting error due to prevent callback. temp fix for CRM. need to remove once vamsi handled CRM side.
			delete this.preventValChangeCallback
		}
		var field = this.getData("field") , comp2;//no i18n
		var node = this.$node, selectedValues = this.getData("selectedValues");//no i18n
		var criteria = this.getData("cxPropCriteria");//no i18n
		criteria.type = criteria.type ? criteria.type : field.field_data_type;
		if(  criteria.type == "dynamicFilter"){
			return;
		}
		
		var cruxAssetsFldType = this.cruxAssets.fieldDataTypeToCruxCompMapping;
		cruxAssetsFldType = cruxAssetsFldType? cruxAssetsFldType : {};
		if(cruxAssetsFldType[field.field_data_type]){
			criteria.type = cruxAssetsFldType[field.field_data_type] ;
		}
		var comparator = criteria.comparator,type = criteria.type ? criteria.type : this.getData("field").field_data_type,value = criteria.value;
		var _self = this , moduleRecordMapping = this.moduleRecordMapping;
	   
	    if(this.data.userDetails.EMAIL_BOUNCE_MANAGEMENT && criteria.value && criteria.value.includes && criteria.value.includes("${BLOCKED") && criteria.comparator ==='equal'){
			$L('#DDV_'+criteria.api_name)[0].ltProp('selected','${BLOCKED}');
			let comp = $L('#option_'+criteria.api_name)[0].component;
			this.triggerGetDropDownVal(criteria.value,comp);
			this.setEmailBlockedCriteria(criteria.api_name,criteria.value);
			return;
		}
		if(criteria.api_name === 'cxFilter_Scoring_Rule' || criteria.api_name === 'cxFilter_Series'){ 
			 // var nameArr = [];
			// if(!Array.isArray(value)){
			// 	value = [value];
			// }
			// value.forEach(function(optionId){
				var isValueAvail  = false;
				value = value.id ? value.id : value;
				this.checkSubFieldOpt({field , value :value});
				_self.getData("field").pick_list_values.some(function(eachOptions){//no i18n
					if(eachOptions.actual_value + "" === value + ""){
						value = eachOptions.display_value;
						isValueAvail = true;
						return true;
					}
				})
			// });
			if( isValueAvail || criteria.api_name === 'cxFilter_Scoring_Rule' ){
				$L("#" + _self._cruxReplace(criteria.api_name, "[/.]","_") + "_crux_comp").e.component.set("cxPropValue",value);
			}
			//comparator = criteria.subfieldComp , value = criteria.subfieldValue;
		}

		var subCriteria , val = "";
		if( criteria.api_name != "cxFilter_Email_Sentiment" ){
			subCriteria = $L('#sub_field_'+criteria.subfield);//no i18n
		}
		if(typeof moduleRecordMapping != "undefined" &&  criteria.type == "crossfield"  && criteria.api_name == moduleRecordMapping.Contacts.api_name){
			if( subCriteria[0] ){
				subCriteria[0].ltProp("checked",true);//no i18n
			}
			return
		}else if((value == '${EMPTY}' || ( value == "${BLOCKED}" && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1  && !field.custom_field) ) && comparator == "not_equal"){//no i18n
			value =(value == '${EMPTY}') ?  '${NOTEMPTY}' :"${NOTBLOCKED}" //no i18n
			comparator = 'equal' //no i18n
			if(criteria.origCriteria && criteria.origCriteria.include_objects == false){
				value = '${EMPTY}';//no i18n
			}
			
			if(criteria.api_name === "cxFilter_Linked_Segment__s") {
				value = '${EMPTY}'; // NO I18N
			}

			if(criteria.api_name === "sub_option_Competitor_Name") {
				Lyte.arrayUtils($L('#option_cxFilter_Competitor_Alert')[0].component.data.crossFields,'removeAt',1,2);
			}
			
		}else if(value && value.indexOf && value!=true && value.indexOf("AGEIN") != '-1'){ //no i18n
			flag = true;
			comparator = "Age in Days"; //no i18n
			value = comparator;
			val = /\d+/i.exec(criteria.value)[0];
			comp2 = (criteria.value.indexOf('DAYS') !='-1')?"DAYS" : (criteria.value.indexOf('WEEKS') !='-1')?"WEEKS" : (criteria.value.indexOf('MONTHS') !='-1')?"MONTHS" : "YEARS"; //no i18n
		}
		else if(value && value.indexOf && value!=true && value.indexOf("DUEIN") != "-1"){
			flag = true
			comparator = "Due in Days" //no i18n
			value = comparator
			val = value = /\d+/i.exec(criteria.value)[0]
			comp2 = (criteria.value.indexOf('DAYS') !='-1')?"DAYS" : (criteria.value.indexOf('WEEKS') !='-1')?"WEEKS" : "MONTHS" //no i18n
		}else if(criteria.type === "rfm" || criteria.type === "ABM_Techniques" || criteria.type === 'ABM_Scores'){
			node = $L("#sub_option_"+criteria.subfield)[0];selectedValues = node.getData("selectedValues");//no i18n
			subCriteria[0].ltProp("checked",true);//no i18n
			type = "integer";//no i18n
		}else if(value && value.includes && value.includes("${") ){ //no i18n
			// ["${CURRENTTIME}","${TODAY}","${YESTERDAY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${THISFY}","${THISFQ}","${LASTYEAR}","${PREVFY}","${PREVFQ}","${NEXTYEAR}","${NEXTFY}","${NEXTFQ}","${LASTWEEK}","${LASTMONTH}","${TODAYANDOVERDUE}","${OPEN}","${CLOSEDWON}","${CLOSEDLOST}"].indexOf(value) != -1
			// comparator = value;
			// value = "";
			let condObject =  this.checkIsValidComparator(value , comparator);
			if( Object.keys(condObject).length ){
				comp2 = condObject.secondDropDownOpt || comp2; 
				comparator = condObject.system || value;
				val = value = condObject.value || "";
			}
		} 
		if( (criteria.type == "crossfield" || criteria.api_name == "cxFilter_Email_Sentiment") && criteria.api_name !="cxFilter_Campaigns" && criteria.api_name !== 'cxFilter_Scoring_Rule' && criteria.api_name !== 'cxFilter_Series'){
			if(criteria.api_name == "cxFilter_Email_Sentiment"){
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.status);//no i18n
				//$L("#by_"+criteria.api_name)[0].ltProp('selected',criteria.status)
				node.component.showHideEmailStatus(criteria.status,criteria)
				var suboption
				if(criteria.subfield == "Last_Email_Sentiment"){
					suboption = $L("#sub_field_For_The_Last_Email")[0].ltProp('checked',true);//no i18n
				}else{
					var val1 = ( /.*?{(.*)}.*?/.exec(criteria.subfield) ) ?  /.*?{(.*)}.*?/.exec(criteria.subfield)[1].split('|') : [];//no i18n
					if(val1[1] && val1[1] != 0){
						val1[0] = val1[0].toLowerCase();
						var suboption = $L("#sub_field_"+val1[0])[0];
						suboption.ltProp('checked',true) //no i18n
						selectedValues = $L("#sub_option_"+val1[0])[0].component.data.selectedValues;
						Lyte.objectUtils(selectedValues ,"add",{"firstDropDownValue" : criteria.subfieldComp, value1 : val1[1]});//no i18n
						// $L("#DDV_"+val1[0])[0].ltProp('selected',criteria.subfieldComp)
						// $L("#"+val1[0]+"_crux_comp")[0].component.set('cxPropValue',val1[1])
					}
				}
				selectedValues = this.data.selectedValues;
				criteria.subfield = criteria.api_name;suboption = node
			}else{
				var suboption = $L('#sub_option_'+criteria.subfield)[0]
				if(suboption){
					suboption.component.hideSubfieldOption() //no i18n
					selectedValues = suboption.component.data.selectedValues;
				}
				subCriteria[0].ltProp('checked',true) //no i18n
				//suboption.component.render()
				if(criteria.api_name == "cxFilter_Contacts" || criteria.subfield == "Without_Open_Activity" ||criteria.subfield == "Without_Any_Deal" || criteria.subfield == "Locked_False" || criteria.subfield == "Locked_True"){
					return
				}
				//suboption.component.setDropDownValuesFun(true)
			}
			//$L('#DDV_'+criteria.subfield)[0].ltProp('selected',comparator)
			if(value && value.indexOf("${") != -1 && ( comparator == "equal" || comparator == "not_equal")){
				comparator = value;
			}
			if(comparator === "between" || comparator === "not_between"){
				value[0] =  /^(.*)T/.exec(value[0]) && /^(.*)T/.exec(value[0])[1]  ? /^(.*)T/.exec(value[0])[1] : value[0];
				value[1] = /^(.*)T/.exec(value[1]) && /^(.*)T/.exec(value[1])[1]  ? /^(.*)T/.exec(value[1])[1] : value[1];
				if(value[0] == value[1]){
					comparator = "equal";//no i18n
					value = value[0];
				}
			}
			if(value && value.includes && value.includes("${") ){ //no i18n
				let condObject =  suboption.component.getConditionOpt(value);
				if( Object.keys(condObject).length ){
					comp2 = condObject.secondDropDownOpt || comp2; 
					comparator = condObject.system || value;
					val = value = condObject.value || "";
				}
			}

			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			suboption.component.getValue(comparator)
			 var input_node = $L('#'+criteria.subfield+'_crux_comp')[0]
			// var second_DD = $L('#second_'+criteria.subfield+'_dropdown')[0]
			if(comparator === "between" || comparator === "not_between"){
				Lyte.objectUtils(selectedValues ,"add",{value1 : value[0],value2 : value[1]});
				 //input_node.component.set('cxPropValue', /^(.*)T/.exec(value[0])[1])
				// $L('#between_'+criteria.subfield+'_crux_comp')[0].component.set('cxPropValue',/^(.*)T/.exec(value[1])[1])
			}else if(comp2 && criteria.api_name != "cxFilter_Deals"){ //no i18n
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				// input_node.component.set('cxPropValue',val) //no i18n
				// second_DD.ltProp('selected',comp2) //no i18n
			}else if(criteria.api_name == "cxFilter_Deals" && flag){ //no i18n
				Lyte.objectUtils(selectedValues ,"add",{secondDropDownValue : criteria.value});//no i18n
				//second_DD.ltProp('selected',criteria.value) //no i18n
			}else if(input_node){
				Lyte.objectUtils(selectedValues ,"add",{value1 : value});//no i18n
				//input_node.component.set('cxPropValue',/^(.*)T/.exec(criteria.value)[1]) //no i18n
			}

		}
		else if(criteria.type == "custom"){
			if(criteria.api_name =="cxFilter_RecordAction" || criteria.api_name =="cxFilter_RelatedRecordsAction"){
				Lyte.objectUtils(selectedValues ,"add","headDropDownValue" , criteria.isModified);//no i18n
				//$L('#record_'+criteria.api_name)[0].ltProp('selected',criteria.isModified)
			}
			if( this.$node._callee.component.specialDateObject &&  this.$node._callee.component.specialDateObject[criteria.api_name] && val){//no i18n
				comparator = "${AGEINDAYS}+"+val;//no i18n
				val="";
				delete this.$node._callee.component.specialDateObject[criteria.api_name];
			}
			if(criteria.api_name == "cxFilter_Email_Status"){
				comparator = ( ["not_opened","not_sent","not_received"].indexOf(criteria.status) !=-1 && comparator != "Age in Days" && comparator != "Due in Days" ) ? this.negative_Comparator(comparator) : comparator;//no i18n
				if(criteria.status == "sent" && subCriteria && subCriteria[0]){					
					subCriteria[0].ltProp('checked',true);
				}
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.status);//no i18n
				// $L('#by_'+criteria.api_name)[0].ltProp('selected',criteria.status)
				node.component.showHideEmailStatus(criteria.status,criteria)
			}else{
				Lyte.objectUtils(selectedValues ,"add","byDropDownValue" , criteria.comparator);//no i18n
				// $L('#by_'+criteria.api_name)[0].ltProp('selected',criteria.comparator)
			}
			if(comparator == "between"){
				value[0] = ( /^(.*)T/.exec(value[0])[1] ) ? /^(.*)T/.exec(value[0])[1] : value[0];
				value[1] = ( /^(.*)T/.exec(value[1])[1] ) ? /^(.*)T/.exec(value[1])[1] : value[1];
				if(value[0] == value[1]){
					comparator = "equal";//no i18n
					value = value[0];
				}
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			// compNode = $L('#DDV_'+criteria.api_name)
			// compNode[0].ltProp('selected',comparator)
			node.component.getValue(comparator);//no i18n
			//var crux_node = $L('#'+criteria.api_name+'_crux_comp')[0]
			if(comp2){
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				// crux_node.component.set('cxPropValue',val) //no i18n
				// $L('#second_'+criteria.api_name+'_dropdown')[0].ltProp('selected',comp2)
			}else{
				var temp = value
				if(comparator == "between"){
					temp = value[0]
					Lyte.objectUtils(selectedValues ,"add","value2" , value[1]);//no i18n
					// $L("#between_"+criteria.api_name+"_crux_comp")[0].component.set('cxPropValue',value[1])
				}
				Lyte.objectUtils(selectedValues ,"add","value1" , temp);//no i18n
				// crux_node.component.set('cxPropValue',temp) //no i18n
			}
		}
		else if((field.api_name === "Competitor_Name" && (value === '${EMPTY}' || value === '${NOTEMPTY}')) || field.api_name !== "Prediction" && field.api_name !== "Similarity" && comparator === "equal" &&  (value === "${EMPTY}" || value === "${NOTEMPTY}" || (["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) !== -1 && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field)) ) {
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',value) //no i18n
			if(["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 && ["EMAIL","ADDN_EMAIL"].indexOf(field.column_name)!== -1 && !field.custom_field){
				this.$node._callee.setData("cxPropBlockedReason",true);//no i18n
			}
			if(criteria.subfield && ["Calls","Tasks","Events"].indexOf(criteria.subfield) != -1){
				$L("#sub_field_"+criteria.subfield+"_Tag")[0].ltProp("checked",true);//no i18n
				node = $L("#sub_option_"+criteria.subfield+"_Tag")[0];//no i18n
				selectedValues = node.getData("selectedValues");//no i18n
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , value);//no i18n
			node.component.getValue(value,undefined,false)
		}else if((comparator  == "between" || comparator == "not_between") && type !== "similarity"){ //no i18n
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			// node.component.getValue(comparator)
			if(type == "datetime"){
				value[0] = /^(.*)T/.exec(value[0])[1]
				value[1] = /^(.*)T/.exec(value[1])[1]
			}
			if(comparator  == "between" && value[0] == value[1]){
				comparator = "equal";//no i18n
				value[1] = "";
			}
			Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" , comparator);//no i18n
			node.component.getValue(comparator);
			Lyte.objectUtils(selectedValues ,"add",{value1 : value[0],value2 : value[1]});//no i18n
			// $L('#'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value[0])
			//$L('#between_'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value[1])
		}else if(criteria.api_name === "Layout" ||  ["number","textarea" , "multiselectpicklist" ,"text" , "phone", "layout" , "email" , "mobile" , "website" , "picklist" , "integer" , "longinteger" , "double" , "bigint" , "currency" , "num" , "boolean" , "tag" , "autonumber" , "decimal"].includes(type) || (type == "lookup" && !this.data.isChildFieldLookup)){ //no i18n
			if(value.constructor === Array && ["autonumber","textarea","text","phone","email","mobile","website","lookup","multiselectpicklist"].indexOf(type) !== -1 && value[0].constructor === String){
				value = value.join(",")
			} 
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			if(criteria.subfield && ["Calls","Tasks","Events"].indexOf(criteria.subfield) != -1){
				$L("#sub_field_"+criteria.subfield+"_Tag")[0].ltProp("checked",true);//no i18n
				node = $L("#sub_option_"+criteria.subfield+"_Tag")[0];//no i18n
				selectedValues = node.getData("selectedValues");//no i18n
			}
			if( field.ui_type == 132 ){
				var module = field.multi_module_lookup.modules.filter( function( item ){ return item.api_name == criteria.multi_module_lookup } )[0]
				Lyte.objectUtils(selectedValues ,"add", "secondDropDownValue", module.id);//no i18n
			}
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true);//no i18n
			if(type == "layout"){
				// value = ( typeof(value) == "string") ? value.split() : value;//no i18n
				// for(var i =0 ; i<value.length;i++){
				// 	value[i] = {id : value[i], name : store.peekRecord("layout", value[i]).name}
				// }
				value = {layouts : value}
			}
			if(type == "tag" && value.constructor == Object){
				value = [value];
			}
			if(type === "picklist" && value){
				value = (value && typeof(value) == "string") ? value.split(",") : value //no i18n
				this.checkValuePrefixDD('set', undefined, undefined ,value );
				let act_value = this.getDisplayValue( value , field , 'display_value' , this.data.picklistValues ? this.data.picklistValues : [] , 'display_value' );
				if( this.data.field.cxGetActualValue || !act_value.length){
					act_value = this.getDisplayValue( value , field , 'display_value' , this.data.picklistValues ? this.data.picklistValues : [] , "actual_value" );
				}
				value = act_value.length ? act_value : value;
				if(criteria.api_name == "Activity_Type" && this.data.module == "Activities"){
					var k , tempLen = value.length , tempVal = [];

					for(var k = 0 ; k < tempLen ; k++){
						function a(key){return moduleApiMapping[key] === value[k]} //eslint-disable-line no-loop-func
						tempVal.push(moduleRecordMapping[Object.keys(moduleApiMapping).find(a)].plural_label);//no i18n
					}
					value = tempVal;
				}
				else if(criteria.api_name === "Competitor_Sentiment"){
					value = value[0];
				}
				else if(field.api_name === "cxFilter_UnallocatedRecords")
				{
					_self.getData("field").pick_list_values.some(function(eachOptions){//no i18n
					if(eachOptions.actual_value + "" === value[0] + ""){
						value = eachOptions.display_value;
						return true;
					}
				})
				}
			}
			// if( this.cruxAssetsCompMapping[field.ui_type] ){
			// 	let dyComp  = this.$node.querySelector('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp');
			// 	dyComp.setValue(value);
			// }else{
				Lyte.objectUtils(selectedValues ,"add",{value1 :value });//no i18n
			// }
			
			// if(type == "picklist" && $L("crux-smart-filter")[0].component.picklist_trackingObj ){ //no i18n
			// 	var smartFilterNode = $L("crux-smart-filter")[0];//no i18n
			// 	var node = $L("#"+criteria.api_name+"_picklist_tracker")[0],Obj = smartFilterNode.component.picklist_trackingObj;
			// 	if(node){
			// 		node.ltProp("disabled",false) //no i18n
			// 		node.ltProp('checked',true) //no i18n
			// 		$L("#DDV1_"+criteria.api_name+"_picklistTracker")[0].ltProp('selected',Obj.comparator);//no i18n
			// 		$L("#"+criteria.api_name+"_historyTrackDurationDays")[0].set('cxPropValue',/\d+/i.exec(Obj.value)[0]);//no i18n

			// 	}
			// 	smartFilterNode.component.picklist_trackingObj = undefined;
			// }else
			var tNode = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];
			if(tNode){

				if(value && value.length > 10){
					tNode.ltProp("disabled",true) //no i18n
					tNode.setAttribute("lt-prop-title" , _cruxUtils.getI18n("crm.smartfilter.picklist.options.msg"));//no i18n
				}else{
					tNode.ltProp("disabled",false) //no i18n
				}
			}
			//$L('#'+criteria.api_name+'_crux_comp')[0].component.set('cxPropValue',value)
		}else if ( field.ui_type === 53 && field.cxGetValueInMS !== false) {
			if(node._callee.component.pf_timeToReach_value){
				var convertedValue = this.getDurationfromMilliSeconds(parseInt(value),node._callee.component.pf_timeToReach_value.secondDropDownValue);
				Lyte.objectUtils(selectedValues ,"add",{firstDropDownValue : comparator, secondDropDownValue : node._callee.component.pf_timeToReach_value.secondDropDownValue , value1 : convertedValue});		//NO I18N
				node._callee.component.pf_timeToReach_value = undefined;
				// this.methods.getDropDownVal("",selectedValues.firstDropDownValue,"","",this);//no i18n
			}
			else {
				var valueObj = this.getDurationfromMilliSeconds(parseInt(value));
				Lyte.objectUtils(selectedValues ,"add",{firstDropDownValue : comparator, secondDropDownValue : valueObj.durationType , value1 : valueObj.value});		//NO I18N
			}
		}else if( ["date" , "datetime" , "date_time"].includes(type)){//no i18n
			if( field.ui_type === 53 ){
				comparator = criteria.comparator;
			}
			// let condObj = {};
			// if( value.includes('${') ){
			// 	condObj = this.getConditionOpt(value);
			// 	comp2 = condObj.secondDropDownOpt;
			// 	comparator = condObj.system;
			// 	val = condObj.value;
			// 	flag = true;
			// }
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true);
			var input_node = $L('#'+this._cruxReplace(criteria.api_name, "[/.]","_")+'_crux_comp')[0]
			if(comp2){
				Lyte.objectUtils(selectedValues ,"add",{value1 : val,secondDropDownValue : comp2});//no i18n
				//input_node.set('cxPropValue',val) //no i18n
				// $L('#second_'+criteria.api_name+'_dropdown')[0].ltProp('selected',comp2)
			}else if(input_node){
				if(type == "datetime"){
					value = /^(.*)T/.exec(value)[1]
				}
				Lyte.objectUtils(selectedValues ,"add",{value1 :value })//no i18n
				//input_node.set('cxPropValue',value) //no i18n
			}
		}else if(type == "ownerlookup" || type == "userlookup" || type == "multiuserlookup" ) { //no i18n
			// compNode = $L('#DDV_'+criteria.api_name)[0]
			// compNode.ltProp('selected',comparator) //no i18n
			Lyte.objectUtils(selectedValues ,"add", "firstDropDownValue", comparator);//no i18n
			node.component.getValue(comparator,undefined,true)
			if(comparator.indexOf('_role') > -1 || comparator.indexOf('_group') > -1 ){ //Role Group Components cxPropValue is of different pattern
				value = Array.isArray(value) ? value : [value];
				Lyte.objectUtils(selectedValues ,"add","value1" , value  )//no i18n
			}else{
				Lyte.objectUtils(selectedValues ,"add","value1" ,{users : value } )//no i18n
			}
		} else if(type === "multirelation" || criteria.api_name === "cxFilter_Linked_Segment__s") {
			var i,
				node = $L("#option_" + this._cruxReplace(criteria.api_name, "[/.]","_"))[0].component; /* eslint-disable-line no-multipleDOMLookup */ //NO I18N
				res = criteria.value,
				selected = [];
			
			node.setData('lookupDisplayField', 'Segment_Name__s'); // NO I18N
			
			res.forEach((data) => {
				selected.push(data.id);
			});
			
			node.setData('renderItems', res); // NO I18N
			Lyte.objectUtils(selectedValues, "add", "multiSelectFieldValue", JSON.stringify(selected)); // NO I18N
			this.setServiceStatus(this.data.selectedValues.firstDropDownValue, this);
		}else if(type == "multiselectlookup" || criteria.api_name == "cxFilter_Campaigns" || this.data.isChildFieldLookup){ //no i18n
			if( criteria.field && criteria.field.ui_type == 445  ){
				var res = {ids : value.join(',')}
				$L('#'+this._cruxReplace(criteria.field.api_name, "[/.]","_")+'_crux_comp')[0].component.set('cxPropValue',res);//no i18n

			}else{
				var ids = value.toString(),url,flag= true;
				var display_field =  this.getData("moduleDisplayField");//no i18n
				//crmConstants.moduleDisplayField;
				if(criteria.api_name != "cxFilter_Campaigns"){
					compNode = $L('#DDV_'+this._cruxReplace(criteria.api_name, "[/.]","_"))[0]
					if(compNode){
						compNode.ltProp('selected',comparator) //no i18n
						node.component.getValue(comparator,undefined,true);
					}
					flag = (comparator == "${EMPTY}")? false : true //no i18n
				}else{
					if(node._callee.component.campaigns_sel_value){
						Lyte.objectUtils(selectedValues ,"add",{ firstDropDownValue : node._callee.component.campaigns_sel_value.firstDropDownValue , headDropDownValue : node._callee.component.campaigns_sel_value.headDropDownValue });//no i18n
						node._callee.component.campaigns_sel_value = undefined;
						this.methods.getDropDownVal("",selectedValues.firstDropDownValue,"","",this);//no i18n
					}
				}
				if(flag){
					// url = "/crm/v2.1/"+ ( (criteria.api_name == "Campaigns")? "Campaigns" : criteria.field.multiselectlookup.connected_module.api_name )+"?ids="+ids //no i18n
					// Lyte.resolvePromises({
				        // "result" : this.sendxhr(url, "GET") //No I18n
					 // }).then(function(res){
						 var res = criteria.value.constructor == Array ? criteria.value : [criteria.value],len = res.length,i=0 , selected = []
						 var node = $L("#option_"+this._cruxReplace(criteria.api_name, "[/.]","_"))[0] ? $L("#option_"+this._cruxReplace(criteria.api_name, "[/.]","_"))[0].component : this;//no i18n
						//eslint-disable-next-line @zoho/zstandard/no-reserved-words
						 var label = "Name"; //NO I18n
						 if(this.data.isChildFieldLookup) {
                             label = (display_field[this.idModuleMapping[this.data.field.lookup.module.id]]) ? (display_field[this.idModuleMapping[this.data.field.lookup.module.id]])[0] : "Name"; //NO I18n
						 } else {
							 label = (criteria.api_name == "cxFilter_Campaigns")?"Campaign_Name" : (display_field[this.idModuleMapping[criteria.field.multiselectlookup.connected_module.id]] ) ? display_field[this.idModuleMapping[criteria.field.multiselectlookup.connected_module.id]][0] : "Name"; //no i18n
						 }
						 node.setData('lookupDisplayField', label) //no i18n
						 if(this.data.supportRelatedModules && criteria.api_name === "cxFilter_Campaigns" || (this.data.isChildFieldLookup && !(res[0].name || res[0][label]))){
                             var moduleApiName = criteria.api_name === "cxFilter_Campaigns" ? "Campaigns" : this.data.field.lookup.module.api_name;
							 var fieldApiName = this.data.field.api_name;
							 var url = "/crm/v2/" + moduleApiName + "/search?"
							 var idslength = res.length;
							 var searchCriteria = "";
							 for(var i=0;i<idslength;i++){
								searchCriteria+="(Id:equals:"+res[i].id+")";
								if(i<idslength-1){
									searchCriteria+="or";
								}
							 }
							 url = url + "criteria=" + encodeURIComponent(searchCriteria);
							 this.sendxhr(url, "GET").then(function(result) {
								if (result.response != "") {
									result = JSON.parse(result.response).data;
									if (result.length != 0) {
										var _len = result.length;
										var renderObjects = [];
										for(var i=0;i<_len;i++){
											var Obj = result[i];
                                            renderObjects.push({id:Obj.id,name:Obj[label], [label] :Obj[label] })
										}
										node.setData('renderItems',renderObjects) //no i18n
							            Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(res));//no i18n
									}
								}
							 },function(errRes) {
					             //need to handle error
							});
						 } else {
							for( ; i < len ; i++){
								res[i][label] = res[i][label] ? res[i][label] : res[i].name;
								selected.push(res[i].id)//no i18n
							}
							node.setData('renderItems',res) //no i18n
							Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(selected));//no i18n
						 }
						 //$L("#multiSelect_lookup_"+criteria.api_name)[0].ltProp('selected',selected)
						 node.setData('memberStatus',true) //no i18n
						 if(criteria.Member_Status && criteria.api_name === "cxFilter_Campaigns"){
						 	criteria.Member_Status = typeof criteria.Member_Status === "string" ? [ criteria.Member_Status ] : criteria.Member_Status;//no i18n
							Lyte.objectUtils(selectedValues ,"add",{value2 :criteria.Member_Status });//no i18n
							 // $L("#memberStatusField")[0].component.set('cxPropValue',criteria.Member_Status)
						 }
						 if(field.api_name === "cxFilter_Campaigns" ){
							this.setServiceStatus(this.data.selectedValues.firstDropDownValue , this);
						 }
						  if(criteria.Service_Status && criteria.api_name === "cxFilter_Campaigns"){
							criteria.Service_Status = typeof criteria.Service_Status === "string" ? [ criteria.Service_Status ] : criteria.Service_Status;//no i18n
							Lyte.objectUtils(selectedValues ,"add",{Service_Status :criteria.Service_Status });//no i18n
							// Lyte.objectUtils(this.data.field ,"add",{serviceStatus :criteria.Service_Status });//no i18n
							// $L("#memberStatusField")[0].component.set('cxPropValue',criteria.Member_Status)
						 }
					 // })
				}
			}

		}
		else if(field.api_name === "Prediction" || criteria.type === "Prediction"){  //No I18n
			var module = moduleRecordMapping[node.getData('module')];  //No I18n
			var childNode1 = $L("#sub_option_Prediction_0")[0],childNode2 = $L("#sub_option_Prediction_1")[0],childNode3 = $L("#sub_option_completed_prediction")[0];//No I18n
			var childRadio1 = $L("#sub_field_Prediction_0")[0],childRadio2 = $L("#sub_field_Prediction_1")[0],childRadio3 = $L("#sub_field_completed_prediction")[0];//No I18n
			var data = module.prediction_details;
			var len = node.getData('configLength');//No I18n
			for(var i = 0;i < len + 1; i++){
				if(len === 2 && i === 2 || len === 1 && i === 1){
					if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY") || criteria.criteria.field.api_name.toUpperCase().endsWith("ISEND") && !criteria.criteria.from){
						if(node.getData('isSuccess') === "undefined"){  //No I18n
							childRadio3.ltProp("checked",true);  //No I18n
						}
						if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY")){	//No I18n
							var sfSubField
							if(criteria.criteria.comparator === "greater_than"){	//No I18n
							 	sfSubField = $L("#sub_field_" + node.getData('successFailureOption')[0].system)[0];//No I18n
							}
							else if(criteria.criteria.comparator === "less_equal"){//No I18n
								 sfSubField = $L("#sub_field_" + node.getData('successFailureOption')[1].system)[0];//No I18n
							}
							sfSubField.ltProp("checked",true);//No I18n
						}
						var accuracyFieldId = module.prediction_details[0].insights_details.accuracy_field.id;
						var isEndFieldId = module.prediction_details[0].insights_details.isEnded_field.id ;
						if(criteria.criteria.field.api_name.toUpperCase().endsWith("ACCURACY")){
							childNode3.setData('sfAccuracyCount',this.getData('sfAccuracyCount') + 1); //No I18n
							this.setData('sfAccuracyCount',this.getData('sfAccuracyCount') + 1); //No I18n
						}
						else{
							childNode3.setData('sfEndCount',this.getData('sfEndCount') + 1); //No I18n
							this.setData('sfEndCount',this.getData('sfEndCount') + 1);//No I18n
						}
						var selectedOption = node.getData("sfAccuracyCount") > 1 && node.getData("sfEndCount") > 1 ? "both" : accuracyFieldId === criteria.criteria.field.id || isEndFieldId === criteria.criteria.field.id ? module.prediction_details[0].id : (module.prediction_details[1].insights_details.accuracy_field.id === criteria.criteria.field.id ||  module.prediction_details[1].insights_details.isEnded_field.id === criteria.criteria.field.id) && len === 2 ? module.prediction_details[1].id : undefined;
						this.setData("selectedOptionSf",selectedOption);//No I18n
						childNode3.setData("selectedOptionSf",selectedOption);//No i18n
						break;
					}
				}
				else{
					var subNode = i === 0 ? childNode1 : childNode2;
					var subField = i === 0 ? childRadio1 : childRadio2;
					if(criteria.criteria.field.api_name === data[i].insights_details.trend_field.api_name){
						subField.ltProp("checked",true);//No I18n
						var trendValue = criteria.criteria.value === "-1" ? "trend_down" : criteria.criteria.value === "1" ? "trend_up" : "no_trend" ;//No I18n
						if(subNode.getData("isTrendShown")){
							subNode.setData("isTrendSelected",true);//No I18n
							this.$node.setData("isTrendSelected",true);//No I18n
						}
						this.setData("selectedTrend",trendValue);//No I18n
						subNode.setData("selectedTrend",trendValue);//No I18n
						break;
					}
					else if(criteria.criteria.field.api_name.toUpperCase().endsWith('PREDICTION') && data[i].prediction_field.api_name === criteria.criteria.field.api_name){
						var predictionCri = this.getData("predictionCriteria");//No I18n
						var cri = criteria.criteria;
						if(!subField.ltProp("checked")){
							subField.ltProp("checked",true);//No I18n
						}
						if(cri.value[0] && cri.value[0].startsWith("$")){
							if(cri.value.startsWith("${AGEIN") || cri.value.startsWith("${DUEIN")){
								predictionCri.comparator = cri.value.startsWith("${AGEIN") ? "Age in Days" : "Due in Days";//No I18n
								var secondDropDownValue = cri.value.startsWith("${AGEINDAYS}") || cri.value.startsWith("${DUEINDAYS}") ? "DAYS" : cri.value.startsWith("${AGEINWEEKS}") || cri.value.startsWith("${DUEINWEEKS}") ? "WEEKS" : "MONTHS";//No I18n
								var numberInput = cri.value.match(/(\d+)/)[0];
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","dateVal",numberInput);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","secondDropDownValue",secondDropDownValue);//No I18n
								subNode.setData("showSecondDropdownType", "date");//No I18n
							}
							else{
								predictionCri.comparator = cri.value;
								subNode.setData('criteriaDisplay',false); //No I18n
								this.setData("criteriaDisplay",false);//No I18n
							}
						}
						else{
							predictionCri.comparator = cri.comparator;
							subNode.setData('criteriaDisplay',true); //No I18n
							this.setData("criteriaDisplay",true);//No I18n
						}
						Lyte.objectUtils(this.getData("selectedValues"),"add","firstDropDownValue",predictionCri.comparator),Lyte.objectUtils(subNode.getData("selectedValues"),"add","firstDropDownValue",predictionCri.comparator);//No I18n
						if(predictionCri.comparator === "between" || predictionCri.comparator === "not_between"){
							if(subNode.getData("predictionEle") === "date" || node.getData("predictionEle") === "date"){
								predictionCri.value = [];
								predictionCri.value[0] = /^(.*)T/.exec(cri.value[0]) ? /^(.*)T/.exec(cri.value[0])[1] : cri.value[0];
								predictionCri.value[1] = /^(.*)T/.exec(cri.value[1]) ? /^(.*)T/.exec(cri.value[1])[1] : cri.value[1];
								Lyte.objectUtils(subNode.getData("selectedValues") ,"add",{value1 : undefined,value2 : undefined});//no i18n
								subNode.setData({showSecondDropdownType : "between", numberDropClass : "w100" ,predictionEle : "date"});//No I18n
							}
							subNode.setData('isCriteriaBetween',true); //No I18n
							this.setData("isCriteriaBetween",true);//No I18n
						}
						else{
							if(subNode.getData("predictionEle") === "date"){
								if(predictionCri.comparator === "equal" || predictionCri.comparator === "less_than" || predictionCri.comparator === "greater_than"){
									subNode.setData({value : "","predictionEle": "date",numberDropClass : "w100", showSecondDropdownType : ""});//No I18n
								}else if(predictionCri.comparator === "${LASTMONTH}" || predictionCri.comparator === "${LASTWEEK}" || predictionCri.comparator === "${THISWEEK}" || predictionCri.comparator === "${THISYEAR}" || predictionCri.comparator === "${THISMONTH}" || predictionCri.comparator === "${TODAY}" || predictionCri.comparator === "${YESTERDAY}" || predictionCri.comparator === "${EMPTY}" || predictionCri.comparator === "${NOTEMPTY}"){//No I18n
									subNode.setData({"showSecondDropdownType": "", "predictionEle" : ""});//No I18n
								}
							}
							if(predictionCri.comparator === "${EMPTY}" && !data[i].score_field){
								subNode.setData("isTrendShown",false);//No i18n
								this.$node.setData("isTrendShown",false);//No i18n
							}
							subNode.setData('isCriteriaBetween',false); //No I18n
							this.setData("isCriteriaBetween",false);//No I18n
						}
						if(this.getData("criteriaDisplay")){
							predictionCri.value = cri.value;
							if(subNode.getData("isCriteriaBetween")){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue0",predictionCri.value[0]);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue1",predictionCri.value[1]);//No I18n
							}
							else if(predictionCri.value.toString().indexOf("$") < 0 ){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","criteriaValue",predictionCri.value);//No I18n
							}
						}
					}
					if(criteria.criteria.field.api_name.toUpperCase().endsWith('PREDICTION_SCORE') || criteria.criteria1 && (data[i].score_field && (data[i].score_field.api_name === criteria.criteria.field.api_name || data[i].score_field.api_name === criteria.criteria1.field.api_name))){
						this.setData("isScoreSelected",true),subNode.setData("isScoreSelected",true);//No i18n
						var scoreCri = this.getData("scoreCriteria");//No I18n
						var cri = criteria.criteria1 === undefined ? criteria.criteria : criteria.criteria1;
						if(cri.value[0].startsWith("$")){
							scoreCri.comparator = cri.value;data[i].score_field
							subNode.setData("scoreCriteriaDisplay",false);//No I18n
							this.setData("scoreCriteriaDisplay",false);//No I18n
						}
						else{
							scoreCri.comparator = cri.comparator;
							subNode.setData("scoreCriteriaDisplay",true);//No I18n
							this.setData("scoreCriteriaDisplay",true);//No I18n
						}
						Lyte.objectUtils(this.getData("selectedValues"),"add","scoreComparator",scoreCri.comparator),Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreComparator",scoreCri.comparator);//No I18n
						if(cri.comparator === "between" || cri.comparator === "not_between"){
							subNode.setData("isScoreBetween",true);//No I18n
							this.setData("isScoreBetween",true);//No I18n
						}
						else{
							subNode.setData("isScoreBetween",false);//No I18n
							this.setData("isScoreBetween",false);//No I18n
						}
						if(subNode.getData("scoreCriteriaDisplay")){
							scoreCri.value = cri.value;
							if(subNode.getData("isScoreBetween")){
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue0",scoreCri.value[0]);//No I18n
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue1",scoreCri.value[1]);//No I18n
							}
							else{
								Lyte.objectUtils(subNode.getData("selectedValues"),"add","scoreValue",scoreCri.value);//No I18n
							}
						}
						break;
					}
				}
			}
		}
		else if(field.api_name === "best_time"){
			var $bestTimeAvl = $L('#by_best_time')[0];
			if (criteria.value === "-1"){
				$bestTimeAvl.component.setData('ltPropSelected', '${TODAY}');
			} else {
				$bestTimeAvl.component.setData('ltPropSelected', '${TOMORROW}');
			}			
		}
		else if(field.api_name === "next_best_experience"){
			if(criteria.comparator === "Available"){
				var $sub_field_Available = $L('#sub_field_NBX_Available')[0];
				$sub_field_Available.setData("ltPropChecked",true);  //No I18n
				if(!this.data.userDetails.NBX_GOAL){
					var $sub_field_nbx_available = $L('#sub_option_NBX_Available')[0]
					var $picklistComp = $L('#NBX_ACTIVITY_OPTION')[0];
					var sysVsDisplay = {"Calls" : _cruxUtils.getI18n('Call'), "Emails" : _cruxUtils.getI18n('crm.field.label.email') , "Events" : _cruxUtils.getI18n('Meeting')}; //no i18n
							var disNames = [];
							var singleValueFromSave = typeof criteria.val1 === "string";
							if(singleValueFromSave){
								disNames.push(sysVsDisplay[criteria.val1]);
							}
							else{
								var valueLen = criteria.val1.length;
								for(var ind = 0 ; ind < valueLen ; ind++){
									disNames.push(sysVsDisplay[criteria.val1[ind]]);
								}	
							}
					$picklistComp.component.set('cxPropValue',disNames);
					Lyte.objectUtils($sub_field_nbx_available.getData('selectedValues') ,"add","firstDropDownValue" , criteria.val2 );//no i18n
				}
			}
			else{ 
				var $sub_field_NotAvailable = $('#sub_field_NBX_NotAvailable')[0];
				$sub_field_NotAvailable.setData("ltPropChecked",true); //No I18n
			}
		}
		else if(field.api_name  === 'Similarity'){
			if(criteria.comparator === 'NotAvailable') {
				var $sub_field_NotAvailable = $('#sub_field_SimilarityNotAvailable')[0];
				$sub_field_NotAvailable.setData("ltPropChecked",true); //No I18n
			} else {
				var $sub_field_Available = $('#sub_field_SimilarityAvailable')[0];
				$sub_field_Available.setData("ltPropChecked",true);  //No I18n
				if(criteria.field === 'Score') {
					var $sub_field_Score = $('#sub_field_SimilarityScore')[0];
					$sub_field_Score.setData("ltPropChecked",true); //No I18n
					var scoreDiv = $('#sub_option_SimilarityScore')[0];
					var scoreComponent = scoreDiv.component;
					if(criteria.value === "${NOTEMPTY}" || criteria.value === "${EMPTY}") {
						scoreComponent.setData("selectedValues.firstDropDownValue", criteria.value);
						scoreComponent.setData({cruxElement1 : ""});
					} else {
						scoreComponent.setData("selectedValues.firstDropDownValue", criteria.comparator);
						var splCases = ["between", "not_between"];
						if (splCases.contains(criteria.comparator)) {
							scoreComponent.getValue(criteria.comparator, true, true);
							var inputDiv = $('#SimilarityScore_crux_comp')[0];
							var inputComponent = inputDiv.component;
							inputComponent.setData("cxPropValue", criteria.value[0]);
							var betweenDiv = $('#between_SimilarityScore_crux_comp')[0];
							var betweenComponent = betweenDiv.component;
							betweenComponent.setData("cxPropValue", criteria.value[1]);
						} else {
							var inputDiv = $('#SimilarityScore_crux_comp')[0];
							var inputComponent = inputDiv.component;
							inputComponent.setData("cxPropValue", criteria.value);
						}
					}
				} else if(criteria.field === 'Records') {
					var $sub_field_Records = $('#sub_field_SimilarityRecords')[0];
					$sub_field_Records.setData("ltPropChecked",true); //No I18n
					var recordsDiv = $('#sub_option_SimilarityRecords')[0];
					var recordsComponent = recordsDiv.component;

					var res = criteria.value, len = res.length, i = 0, selected = [];
					var module = moduleRecordMapping[node.getData('module')];
					var moduleLabel = module.display_field.api_name;
					recordsComponent.setData('lookupDisplayField', moduleLabel) //no i18n

					for( ; i < len ; i++){
						res[i][moduleLabel] = res[i].name;
						selected.push(res[i].id)//no i18n
					}
					recordsComponent.setData('renderItems',res) //no i18n
					var selectedValues = recordsComponent.getData("selectedValues");
					Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue" ,JSON.stringify(selected));//no i18n

				}
			}
		}
		else if(field.api_name === "Recommendation"){

			var module = moduleRecordMapping[node.getData('module')];
			var url;


			Lyte.objectUtils(selectedValues ,"add","headDropDownValue" ,criteria.comparator === 'all' ? 'all' : 'selected' );//no i18n

			var recommendationBasedOn = node.getData('recommendationBasedOn'); //no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","first_buy" , recommendationBasedOn.first_buy || criteria.field === 'FirstTime');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","cross_selling" ,recommendationBasedOn.cross_selling || criteria.field === 'Dependent');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","bundle" ,recommendationBasedOn.bundle || criteria.field === 'Bundle');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","re_buy" ,recommendationBasedOn.re_buy || criteria.field === 'Repeat');//no i18n
			Lyte.objectUtils(recommendationBasedOn ,"add","next_buy" ,recommendationBasedOn.next_buy || criteria.field === 'Sequence');//no i18n


			if( criteria.comparator === "selected"){

				// var ids = criteria.value;
				// url = "/crm/v2.1/"+module.recommendationsDetailsJson.what_to.api_name+"?ids="+ids //no i18n

				// Lyte.resolvePromises({
				// 	"result" : this.sendxhr(url, "GET") //No I18n
				// }).then(function(res){
					var res = criteria.value,len = res.length,i=0 , selected = [];
					var label = module.recommendationsDetailsJson.what_to.display_field;
					node.setData('lookupDisplayField', label) //no i18n

					for( ; i < len ; i++){
						res[i][label] = res[i].name;
						selected.push(res[i].id)//no i18n
					}
					node.setData('renderItems2',res) //no i18n
					Lyte.objectUtils(selectedValues ,"add","multiSelectFieldValue1" ,JSON.stringify(selected));//no i18n


				// })
			}

			if(criteria.field === "Repeat" ){
				var dateVal = criteria.value1;
				if(dateVal){
					var reBuyOption = node.getData("options"); //no i18n
					if(reBuyOption.filter(function(e){ return e.system === dateVal }).length !== 0) {
						Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,dateVal);//no i18n
					}else{
						Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,"CUSTOM");//no i18n
						Lyte.objectUtils(selectedValues ,"add","headDateValue" ,dateVal[0]);//no i18n
					}
				}else{
					Lyte.objectUtils(selectedValues ,"add","firstDropDownValue" ,"all");//no i18n
				}

			}




		}
		if( criteria.subfield && criteria.subfieldComp && criteria.subfieldValue){
			let crit = { api_name : criteria.subfield , comparator : criteria.subfieldComp , value : criteria.subfieldValue,type : criteria.type }
			if(criteria.api_name === 'cxFilter_Scoring_Rule' || criteria.api_name === 'cxFilter_Series') {
				delete crit.type;
			}
			this.checkSubFieldOpt({field , value :criteria.value});
			$L("#sub_field_"+crit.api_name)[0].ltProp("checked",true);
			let subFldNode = $L("#sub_option_"+crit.api_name);
			if( subFldNode[0] ){
				subFldNode[0].setData("cxPropCriteria" , crit)
			}
		}
		delete this.preventValChangeCallback;
	},//no i18n
	checkIsValidComparator : function( value , comp){
		if( !comp ){
			return false;
		}
		if( value == "${NOTEMPTY}" || value == "${EMPTY}" ){ //empty ,not empty criteria will be handled bydefault.
			return false;
		}
		if(["${BLOCKED}","${NOTBLOCKED}"].indexOf(value) != -1 && ["EMAIL","ADDN_EMAIL"].indexOf(this.data.field.column_name)!== -1 && !this.data.field.custom_field){
			return false; 
		}

		// let option = this.data.options ? this.data.options : [];
		let opt = this.getConditionOpt(value);
		return opt;
	},
	didConnect: function() {
		var field = this.getData('field') //no i18n
		if(["Activity_Due" , "With_Open_Deal" , "Without_Any_Notes" , "Attended" , "Events_Tag" , "Positive_Score","Prediction_0","Prediction_1","completed_prediction","NBX_Available","Start_Date__s","Competitor_Duration","Competitor_Sentiment","Competitor_Name"].indexOf(field.api_name) >= 0){
			var subOption = $L('#sub_option_'+this._cruxReplace(field.api_name, "[/.]","_"));//no i18n
			if(subOption[0]){
				subOption[0].component.render(subOption[0]._callee._callee.component);
				subOption.addClass("cvSubOption");
			}
		}
		this.setCriteria();
	},
	keyDownEvent : function(){
		if(this.$node.cxProp('aria')){
			this.bindEventForAriaFilterInput();
		}
	}.observes('rendered', 'cxPropAria'),
    setDropdownMixin: function(){
        var lyteDrpdwn = this.$node.querySelectorAll('lyte-dropdown:not(crux-dropdown lyte-dropdown)');
		if(this.$node.cxProp('aria')){
			for(var i=0;i<lyteDrpdwn.length;i++){
				if(!lyteDrpdwn[i].bindFunc){
					lyteDrpdwn[i].bindFunc = Lyte.registeredMixins['crux-aria-dropdown-mixin'].bindEventForAria.bind(lyteDrpdwn[i].component);
					lyteDrpdwn[i].bindFunc();
				}
			}
		}
    }.observes('boundary'),
	getFieldCriteria : function(parent = this){
		this.handleFieldDisplayForCrossFilter();
		parent.specialDateObject = parent.specialDateObject ? parent.specialDateObject : {};
		var field = this.data.field,
			api_name = field.api_name,
			header = this.getData("moduleDisplayField"),//no i18n
			moduleRecordMapping = this.moduleRecordMapping,
			idModuleMapping = this.idModuleMapping,
			module_name = this.data.module,
			activity_option = "",
			commonInfo = this.getData("cxPropCommonInfo"), // NO I18N
			abmTechniqueFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.techniqueFields : [],
			abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
			abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [],
			scoreParentCriteria, subTagCriteria, seriesParentCriteria,
			comparator , value, crux_comp,subfield , mod;

			if(field.Activity_tag){
			var RadioBtnValue = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0].ltProp("value");//no i18n
			subfield = this.$node.querySelector("#sub_option_"+RadioBtnValue);//no i18n
			field = subfield.getData("field");//no i18n
			api_name = field.api_name;
			//subTagCriteria = true;
		}
		if(field.api_name === "cxFilter_Scoring_Rule"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				return { isValdationFailure : true};
			}
			var selectedVal = nodeElem.getValue("actual_value");//No I18n
			scoreParentCriteria = {comparator : "equal",field : {api_name : 'Scoring_Rule',id : ""},value : selectedVal};//No I18n
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			if(!selectedELem){
				return { isValdationFailure : true};
			}
			field = $L("#" + selectedELem.id.replace("_field_","_option_")).e.component.data.field;
			api_name = field.api_name;
		}

		var srsPrnt , srsField = field.api_name;
		if(field.api_name === "cxFilter_Series"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				flag = false;return { isValdationFailure : true};
			}
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			if(!selectedELem){
				flag = false;return { isValdationFailure : true};
			}
			var selectedVal = nodeElem.getValue("actual_value");//No I18n
			seriesParentCriteria = {comparator : "equal",field : {api_name : 'Cadencesid__s',id : ""},value : selectedVal};//No I18n
			var selectedELem = $L("." + field.api_name + "_selectedRadioBtn")[0]; //No I18n
			let subComp = $L("#" + selectedELem.id.replace("_field_","_option_"))[0];
		
			let criteria = subComp.component.getFieldCriteria();
			if( criteria.isValdationFailure ){
				return criteria;
			}
			let cross_filter = this.groupSeriesCriteria(seriesParentCriteria,criteria );
			seriesParentCriteria = undefined;//The seriesParentCriteria variable is used in this function but is not needed. set it to undefined.
			return { type : "cross_filter" , cross_filter : cross_filter };
		}

		if(field.api_name === "cxFilter_UnallocatedRecords"){
			var nodeElem = $("#" + field.api_name + "_crux_comp")[0].component;
			if(!nodeElem.validate()){
				flag = false;return { isValdationFailure : true};
			}
			var thresholdId = nodeElem.getValue("actual_value");//No I18n
			var threshCri = {comparator : "equal",field : {api_name : 'Threshold__s',id : ""},value : thresholdId};//No I18n
			var allocType = {comparator : "equal",field : {api_name : 'Allocation_Type__s',id : ""},value : "2"};//No I18n
			var thrshldGrpCri = this.construct_group(threshCri,allocType,"AND");//no i18n
			var cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : moduleRecordMapping.Thresholds.api_name },criteria : tempCri1 };
			cross_filter.criteria = thrshldGrpCri;
			// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
			// continue;
			return { type : "cross_filter" , cross_filter : cross_filter };
		}
		if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Email_Sentiment","cxFilter_Locked"].indexOf(field.api_name) != -1 && (field.field_data_type == "crossfield" || field.field_data_type == "custom" )){
//				var name = (field.api_name == "Activities")?"option_Activities": (field.api_name == "Notes")? "option_Notes" : (field.api_name == "Deals")?'option_Deals':(field.api_name == "cxFilter_Chats")?'option_Chats':(field.api_name == "cxFilter_Email_Sentiment")?'option_Email_Sentiment':'option_Contacts' //no i18n
			var node = $L("."+this._cruxReplace(field.api_name, "[/.]","_")+"_selectedRadioBtn")[0];//no i18n
			activity_option = (node)?node.ltProp('value'):"";
			subfield = this.$node.querySelector("#sub_option_"+activity_option);//no i18n
		}

		if(["Without_Open_Activity" ,"Without_Any_Deal" ,'With_Contact','Without_Any_Contact'].indexOf(activity_option) == -1){
			id = "#DDV_"+ ( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Locked" || api_name == "cxFilter_Chats"  )?activity_option : this._cruxReplace(api_name, "[/.]","_") )//no i18n
			var tN= this.$node.querySelector(id);
			comparator = tN ? tN.ltProp("selected") : "equal";//no i18n
		}
		id = '#'+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats" || api_name == "cxFilter_Locked")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+'_crux_comp' //no i18n
		crux_comp  = this.$node.querySelector(id);

		//Hanlding for dynamicFilter field
		if( field.field_data_type ===  "dynamicFilter"){
			return crux_comp.component.getFieldCriteria();
		}
		if( !(field.api_name === "cxFilter_Email_Status" && field.data_type === "custom") && ( ["${OPEN}","${CLOSEDWON}","${CLOSEDLOST}","${EMPTY}","${BLOCKED}","${NOTBLOCKED}","${NOTEMPTY}"].indexOf(comparator) !== -1 ) && field.field_data_type !== "multiselectlookup" && field.field_data_type !== "multirelation" && field.field_data_type !== "multiuserlookup" && ["Without_Any_Activity","Without_Any_Notes","Attended"].indexOf(activity_option) === -1){/* eslint-disable-line no-extra-parens */ //NO I18N
			value = (comparator == "${NOTBLOCKED}")? "${BLOCKED}" : comparator //no i18n
			comparator =(comparator == "${NOTBLOCKED}")?"not_equal" : "equal" //no i18n
			if(field.api_name == "lookup"){
				api_name = api_name+"."+header[field.lookup.module.api_name][0]
			}
			// if(field.ui_type == 133 || field.data_type == "lookup"){
			// 	customLookupField.push(field.display_field_label);
			// 	CustomLookupCount = CustomLookupCount + 1;
			// }
			var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
			// TODO: Surya
			if(value==="${BLOCKED}" && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length<=0){
				let blockType = api_name==='Email' ? $L('input[name=option_'+api_name+']:checked').val().split('_')[2] : $L('input[name=option_'+api_name+']:checked').val().split('_')[3];
					let fieldApiNameUpperCase = api_name === 'Email'? 'EMAIL' : 'ADDN_EMAIL';//no i18n
					if(!blockType || blockType==="both"){
						value = "${BLOCKED}";
					}else{
						let subOption = $L('#sub_option_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].component.data.selectedValues;//no i18n
						let bounceCategory = subOption.byDropDownValue;
						let firstDropDown = subOption.firstDropDownValue;
						let secondDropDown = subOption.secondDropDownValue;
						if(firstDropDown.includes('Age in') || firstDropDown.includes('Due in')){
							firstDropDown = firstDropDown.replace('Days',secondDropDown);
							// let numberComp = $L('#id_cxFilter_'+fieldApiNameUpperCase+'_'+blockType)[0].ltProp('value');
							let numComp =  $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0];
							let numberComp = numComp ? numComp.component.getValue() : '';
							if(!numberComp){
								this.showFilterAlert("Enter a valid number", numComp?numComp.component:'');//no i18n
								return {isValdationFailure: true};
							}
							firstDropDown = firstDropDown.replaceAll(' ','');
							firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = 'less_than {' +firstDropDown+ '}+'+numberComp;
						}else if(firstDropDown === 'less_than' || firstDropDown === 'greater_than'){
							let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp = this.getISODateTime(dateComp,this.datePattern)
							firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = firstDropDown+' '+dateComp;
						}else if(firstDropDown === 'equal'){
							let dateComp = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							let dateComp1 = this.getISODateTime(dateComp,this.datePattern);
							let dateComp2 = this.getISODateTime(dateComp,this.datePattern,"end");
							//firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = "between";
							firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
						}else if(firstDropDown === 'between'){
							let dateComp1 = $L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp1){
								this.showFilterAlert("Enter a valid date",$L('#cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp1 = this.getISODateTime(dateComp1,this.datePattern);
							let dateComp2 = $L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component.getValue();
							if(!dateComp2){
								this.showFilterAlert("Enter a valid date",$L('#between_cxFilter_'+fieldApiNameUpperCase+'_'+blockType+'_crux_comp')[0].component);//no i18n
								return {isValdationFailure: true}
							}
							dateComp2 = this.getISODateTime(dateComp2,this.datePattern,"end")
							//firstDropDown = firstDropDown.toUpperCase();
							firstDropDown = firstDropDown+' '+dateComp1+' '+dateComp2;
						}else{
							firstDropDown = comparator + ' '+ firstDropDown;
						}
							value = "${BLOCKED_" +bounceCategory.toUpperCase()+'}' +' '+firstDropDown ;
					}
			}else if(value && value.includes("${BLOCKED") && comparator==='equal' && this.getData('blockedCriteria')[field.api_name].length>0){
				this.setEmailBlockedCriteria(field.api_name);
			}
			if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent" || field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts") ){

				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" || field.api_name == "cxFilter_Deal_Stage" ){ //no i18n
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				// this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			} else if(field.api_name === "cxFilter_Record_status"){//no i18n
				cross_filter = {include_objects :true ,relation : { api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status"},value : value}} //no i18n
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
				api_name = "Tag";//no i18n
				subTagCriteria =true;
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id},value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				tempCri1 = "";
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			if(subTagCriteria){
				var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
				var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
				tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
			}
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria ,tempCri1 );
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter }
			}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) }	
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
			}else{
				if((this.data.supportRelatedModules) && field.ui_type === 133 && (field.field_data_type == "lookup" && !( this.data.cxPropModule == "Activities"&& ["CONTACTID","SEID"].indexOf(field.column_name)!= -1))){
					mod = idModuleMapping[field.lookup.module.id];
					return {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" )},value : value};
				}
				return tempCri1
				// Lyte.arrayUtils(group, "push", tempCri1);//No I18n
			}
			//Lyte.arrayUtils(group, "push", {comparator : comparator ,field :{ api_name : api_name,id : field.id } ,value : value});//No I18n
		}else if(	(comparator == "between" || comparator == "not_between") && !(field.field_data_type == "custom" || field.field_data_type=="crossfield")){//no i18n
			var id1 = "#between_"+this._cruxReplace(api_name, "[/.]","_")+"_crux_comp";//no i18n
			var crux_comp1 = this.$node.querySelector(id1)
			var abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [];
			if(!crux_comp.component.validate() || !crux_comp1.component.validate()){
				return { isValdationFailure : true};
			}
			value = crux_comp.component.getValue();
			 value1 = crux_comp1.component.getValue();
			if(["datetime" , "date" , "date_time"].includes(field.field_data_type)){
				if( field.field_data_type != "date_time" ){
					value =  this.getISODateTime(value,this.datePattern,"start",field.field_data_type);
					value1 = this.getISODateTime(value1,this.datePattern,"end",field.field_data_type);
				}
				// var a = /^(.*)T/.exec(value)[1];
				// var b = /^(.*)T/.exec(value1)[1];
				// if( field.field_data_type == "date" ){
				// 	value = a;
				// 	value1 = b;
				// }
				if( value > value1 ){
					this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
					return { isValdationFailure : true};
				}
			}else{
				//value = parseInt(value); value1 = parseInt(value1);
				// var isDecimal1 = (value.split(".")[1]) ? value.split(".")[1] : false;
				// var isDecimal2 = (value1.split(".")[1]) ? value1.split(".")[1] : false;
				// if( ( isDecimal1 && isDecimal1.length > 2 ) || ( isDecimal2 && isDecimal2.length > 2 ) ){
				// 	this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
				// 	flag = false; return { isValdationFailure : true};
				// }
				//value = Number(value);value1 = Number(value1);
				 //eslint-disable-next-line no-use-before-define
				if(parseFloat(value) === parseFloat(value1) || parseFloat(value) > parseFloat(value1)){
					this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.to1"),crux_comp); //NO I18N
					return { isValdationFailure : true};
				}
			}
			value = [value,value1]
			if( (field.api_name == "Visited_Time" || field.api_name == "Time_Spent") && (module_name == "Leads" || module_name == "Contacts")){
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			}else if(field.api_name == "cxFilter_Deal_Closing_Date" || field.api_name == "cxFilter_Deal_Amount" ){ //no i18n
				cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
			}
			var tempBtwCrt = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
			// if(api_name == "cxFilter_Prediction_Score"){
			// 	preventSaveFilter = "prediction"; //no i18n
			// 	api_name ="Prediction_Score";//no i18n
			// }
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria , tempBtwCrt);
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter }
			}else if(seriesParentCriteria){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempBtwCrt );
				tempBtwCrt = ""
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){ //no i18n
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) }
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
				// continue;
			}else if(field.field_data_type != "custom" && field.field_data_type != "crossfield"){//No I18n
				return tempBtwCrt;
				// Lyte.arrayUtils(group, "push", tempBtwCrt);//No I18n
			}

		}else if(field.api_name === "cxFilter_Locked"){//NO I18N
			var feature_type = comparator;
			comparator = "equal";//No I18n
			var lockVal = false;
			if("Locked_True" === activity_option){
				lockVal = true;
				// if(feature_type === "record_locking" || feature_type === "orchestration"){
				// 	var cross_filter = {include_objects :true ,relation : { relation_id : moduleRecordMapping.LockingInformation.id, api_name : moduleRecordMapping.LockingInformation.api_name},criteria : {comparator:comparator ,field :{ api_name : "Feature_Type__s" },value : feature_type }} //no i18n
				// 	this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// }
			}
			return {comparator:comparator ,field : { api_name : "Locked__s"},value : lockVal}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field : { api_name : "Locked__s"},value : lockVal});//No I18n
		}else if( field.field_data_type == "custom" || field.field_data_type == "crossfield" ){ //no i18n
			var val = comparator ,sub_status
			by = comparator
			if(["cxFilter_Activities","cxFilter_Notes","cxFilter_Deals","cxFilter_Contacts","cxFilter_Chats","cxFilter_Campaigns","cxFilter_Locked"].indexOf(field.api_name) == -1){
				id = '#by_'+this._cruxReplace(api_name, "[/.]","_") // no i18n
				var by = this.$node.querySelector(id).ltProp("selected") //no i18n
			}
			if(activity_option!="" && activity_option != "Overdue" && field.api_name!="cxFilter_Email_Sentiment" ){
				by = activity_option
				val = null
			}
			if(field.api_name == "cxFilter_RecordAction" || field.api_name == "cxFilter_RelatedRecordsAction" ){
				var id = "#record_"+field.api_name //no i18n
				sub_status = this.$node.querySelector(id).ltProp('selected') //no i18n
			}
			if(field.api_name == "cxFilter_Email_Status" && by == "sent"){
				var check = parent.data.cxPropCurrentUserDetails.emailTrackingOption;
				var node = $L("."+field.api_name+"_selectedRadioBtn")[0];//no i18n
				if(!node ){
					if( check === 'entprofoff' ){
						sub_status = 'sent'; //no i18n
					}else{
						flag = false;
						return { isValdationFailure : true};		
					}			
				}else if(node){
					sub_status = node.ltProp('value') //no i18n
				}
			}
			if(field.api_name == "cxFilter_Email_Sentiment"){
				sub_status = (activity_option)?activity_option:"";
				if(sub_status == "percentage" || sub_status == "count"){
					if(!this.$node.querySelector("#"+sub_status+"_crux_comp").component.validate()){
						flag = false;return { isValdationFailure : true};
					}
				}
			}
			let condObj = {};
			if( subfield ){
				condObj = subfield.component.getConditionOpt(comparator) || {};
			}
			if( !Object.keys(condObj).length ){
				condObj = this.getConditionOpt(comparator) || {};
			}
			if(comparator == "Age in Days" ||  condObj.showDynamicInput){
				id = "#second_"+( (api_name == "cxFilter_Activities" || api_name=="cxFilter_Notes" || api_name == "cxFilter_Deals" || api_name == "cxFilter_Chats")?activity_option : this._cruxReplace(api_name, "[/.]","_") )+"_dropdown"//no i18n
				value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
				val =value1
				if(api_name != "cxFilter_Deals"){
					if(!crux_comp.component.validate()){
						flag = false ; return { isValdationFailure : true};
					}
					value = crux_comp.component.getValue()
					if( condObj.showDynamicInput ){
						val = '${'+comparator+'_N_'+value1+'}:'+value;//no i18n
					}else{
						val = '${AGEIN'+value1+'}+'+value+'';//no i18n
					}
				}
				comparator = comparator = condObj.comparator ? condObj.comparator :"less_equal" //no i18n
			}else if(field.api_name != "cxFilter_Campaigns"){ //no i18n
				val = comparator
				if(comparator == "${UNTILNOW}" || comparator == "${CURRENTTIME}"){ //no i18n
					comparator = 'less_equal' //no i18n
				}else if(comparator == '${AGEINDAYS}+30' || comparator == '${AGEINDAYS}+60' || comparator == '${AGEINDAYS}+90'){ //no i18n
					parent.specialDateObject[api_name] = { value : comparator};
					comparator = "less_equal" //no i18n
				}else if( comparator == "${DUEINDAYS}+7"){ //no i18n
					comparator = "less_equal" //no i18n
				}else if(crux_comp &&(activity_option == "Without_Any_Activity" || activity_option == "Activity_Done" || field.api_name =="cxFilter_Email_Status" || field.api_name == "cxFilter_Notes" || field.api_name == "cxFilter_Chats" || field.api_name == "cxFilter_Email_Sentiment") && !(["${TODAY}","${YESTERDAY}","${THISWEEK}","${THISMONTH}","${THISYEAR}","${LASTWEEK}","${LASTMONTH}","${UNTILNOW}","${TODAYANDOVERDUE}","${EMPTY}"].indexOf(comparator) != -1)){ //no i18n
					if(!crux_comp.component.validate()){
						flag = false;return { isValdationFailure : true};
					}
					val = crux_comp.component.getValue();
					if(comparator == "equal"){
						comparator = "between" //no i18n
						val = [this.getISODateTime(val,this.datePattern),this.getISODateTime(val,this.datePattern,"end")]
					}else if(comparator == "between"){ //no i18n
						var id1 ="#between_"+((activity_option && api_name != "cxFilter_Email_Sentiment")?activity_option:this._cruxReplace(api_name, "[/.]","_"))+"_crux_comp";//no i18n
						var crux_comp1 = this.$node.querySelector(id1)
						value1 = crux_comp1.component.getValue();
						if(!crux_comp1.component.validate()){
							//this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.display_field_label)) //no i18n
							flag = false;return { isValdationFailure : true};
						}
						val = this.getISODateTime(val,this.datePattern);
						value1 = this.getISODateTime(value1,this.datePattern,"end");
						// var a = /^(.*)T/.exec(val)[1];
						// var b = /^(.*)T/.exec(value1)[1];
						if( val > value1 ){
							this.showFilterAlert(_cruxUtils.getI18n("crm.custom.field.less.than.equalto","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.fromDate")+"'","'"+_cruxUtils.getI18n("workflow.option.webhookFailure.toDate")+"'"),crux_comp); //NO I18N
							flag = false;return { isValdationFailure : true};
						}
						val = [val,value1]
					}else{
						val = (comparator == "greater_than") ? this.getISODateTime(val,this.datePattern,"end") : this.getISODateTime(val,this.datePattern) //no i18n
					}
				}else{
					comparator = "equal" //no i18n
				}
			}
			if(field.field_data_type == "custom"){
				return { type : "custom_filter" , custom_filter :  this.specialfield(field,by,val,comparator,sub_status) }
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
			}else{
				if(field.api_name ==  "cxFilter_Campaigns"){
					// var t = $("#option_"+field.api_name)[0];//no i18n
					var t = this.$node;
					var sub_option_sel_value = t.getData("renderItems");//no i18n
					 this.campaigns_sel_value = t.getData("selectedValues");//no i18n
					//value = this.$node.querySelector("#multiSelect_lookup_"+field.api_name).ltProp('selected') //no i18n
					// value = JSON.parse(sub_option_sel_value.multiSelectFieldValue);
					value = this.getValueBasedonKeys(sub_option_sel_value , t.getData().lookupDisplayField);
					if(!value.length){
						this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",$("#option_"+field.api_name)[0].getData().placeholderValue[0]),this.$node.querySelector("#multiSelect_lookup_"+this._cruxReplace(field.api_name, "[/.]","_"))) //no i18n
						flag = false;return { isValdationFailure : true};
					}
					cross_filter = {include_objects :true ,relation : { api_name : "Campaigns"}} //no i18n
					var member_Status = this.$node.querySelector("#memberStatusField").component.getValue();//no i18n
					var Obj1 = {comparator:"equal" ,field :{ api_name : "Campaign_Name" },value : value} //no i18n
					if(member_Status.length){
						var Obj2 = {comparator:"equal" ,field :{ api_name : "Member_Status" },value : member_Status} //no i18n
						Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
					}
					var service_Status = this.$node.querySelector("#serviceStatusField") ? this.$node.querySelector("#serviceStatusField").component.getValue() : [];//no i18n
					if(service_Status.length){
						var Obj2 = {comparator:"equal" ,field :{ api_name : "Service_Status" },value : service_Status} //no i18n
						Obj1 = this.construct_group(Obj1,Obj2,"AND") //no i18n
					}
					cross_filter.criteria = Obj1;
					return { type : "cross_filter" , cross_filter : cross_filter };
					// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
					//Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
					// continue;
				}
				cross_filter = this.specialfield(field,by,val,comparator,sub_status);
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", this.specialfield(field,by,val,comparator,sub_status));//No I18n
			}
		} else if(field.ui_type == 53) {
			if(!crux_comp.component.validate()){
				flag = false ;return { isValdationFailure : true};
			}
			var t = $("#option_"+field.api_name)[0];	//NO I18N
			this.pf_timeToReach_value = t.getData("selectedValues");	//NO I18N
			value = crux_comp.component.getValue();
			id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
			value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
			if (field.cxGetValueInMS === false) {
				value = '${'+"AGEIN"+value1+'}+'+value+'';	//NO I18N
			} else {
				value = this.getMilliSecondsfromDuration(value, value1);
			}
			if (field.api_name === "time_to_reach__s") {
				preventSaveFilter = "PathFinder";	//NO I18N
			}
			return  {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		} else if(field.field_data_type == "date" || field.field_data_type == "datetime" || field.field_data_type == "date_time" ){ //no i18n
			let condObj = this.getConditionOpt(comparator) || {};
			if(comparator.indexOf("${") != -1){
				value = comparator;comparator = condObj.comparator ? condObj.comparator : "equal"; //no i18n
			}else{
				if(!crux_comp.component.validate()){
					flag = false ;return { isValdationFailure : true};
				}
				// let condObj = this.getConditionOpt(comparator);
				value = crux_comp.component.getValue();
				if(comparator == "Due in Days" || comparator == "Age in Days" || condObj.showDynamicInput){
					var str="";
					id = "#second_"+this._cruxReplace(api_name, "[/.]","_")+"_dropdown"//no i18n
					value1 = this.$node.querySelector(id).ltProp("selected") //no i18n
					if(comparator == "Due in Days"){
						str = '${DUEIN'+value1+'}+'+value+'';
					}else if(comparator == "Age in Days"){
						str = '${AGEIN'+value1+'}+'+value+'';
					}else{
						str = '${'+comparator+'_N_'+value1+'}:'+value;
					}
					
					comparator = condObj.comparator ? condObj.comparator : 'less_equal'; value = str; //no i18n
				}else{
					if(comparator == "equal"  && field.field_data_type == "datetime"){
						comparator = "between" ;//no i18n
						value = [this.getISODateTime(value,this.datePattern),this.getISODateTime(value,this.datePattern,"end")]
					}else if( field.field_data_type !== "date_time" ){
						var time = comparator == "greater_than" ? "end" : "start" ;
						value = this.getISODateTime(value,this.datePattern,time,field.field_data_type)
					}
					// else if(comparator == "greater_than"){ //no i18n
					// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern,"end") : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
					// }else{
					// 	value = ( field.field_data_type == "datetime" ) ? this.getISODateTime(value,this.datePattern) : /^(.*)T/.exec(this.getISODateTime(value,this.datePattern))[1]
					// }
				}
			}
			if( field.api_name == "cxFilter_Deal_Closing_Date" || ( field.api_name == "Visited_Time" && (module_name == "Leads" || module_name == "Contacts") )){
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Closing_Date"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			}
			if(field.api_name == "cxFilter_Not_Replied_Messages" || field.api_name == "cxFilter_Replied_Messages"){
				return { type : "custom_filter" , custom_filter : this.specialfield(field,by,value,comparator,sub_status) };
				// Lyte.arrayUtils(custom_filter, "push", this.specialfield(field,by,value,comparator,sub_status));//No I18n
				// continue;
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value};
			if(srsPrnt){
				var cross_filter =this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				tempCri1 = "";
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else{
				return tempCri1
			}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		}
		else if( field.field_data_type == "num" || field.field_data_type == "currency" || field.field_data_type == "bigint" || field.field_data_type == "integer" ||  field.field_data_type == "longinteger" || field.field_data_type =="double" || field.field_data_type =="decimal" ){
			value = crux_comp.component.getValue();
			var isDecimal = (value.split(".")[1]) ? value.split(".")[1] : false,
				abmScoreFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.scoreFields : [],
				abmAccountFields = commonInfo && commonInfo.abmModuleInfo ? commonInfo.abmModuleInfo.abmAccountFields : [];
			if( (field.data_type == "autonumber" || field.data_type == "bigint") && isDecimal){
				this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp);//no i18n
				flag = false ; return { isValdationFailure : true};
			}
			if(!crux_comp.component.validate() ){
				flag = false ; return { isValdationFailure : true};
			}
			//value = Number(value);
			if( field.api_name == "cxFilter_Deal_Amount" || (field.api_name == "Time_Spent" && (module_name == "Leads" || module_name == "Contacts") )){
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Amount"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : "Visits_Zoho_Livedesk"},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
				// continue
			} else if (abmScoreFields.includes(field.api_name.replace('cxFilter_', ''))) { // NO I18N
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , relation_api_name , cross_filter);//no 18n
				// continue;
			}
			preventSaveFilter = (abmAccountFields.includes(field.api_name.replace('cxFilter_', '')) ? 'abm' : false); //no i18n
			var crtTemp = {comparator:comparator ,field :{ api_name : preventSaveFilter == "prediction" ? "Prediction_Score" : api_name,id : field.id },value : value}; //No I18n
			if(scoreParentCriteria){
				var cross_filter = this.groupScoreCriteria(scoreParentCriteria,crtTemp);
				scoreParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else if(seriesParentCriteria){
				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name},value : value}
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}else {
				return crtTemp;
				// Lyte.arrayUtils(group, "push", crtTemp);//No I18n
			}

		}
		else if(["textarea","text","multiselectpicklist","phone","email","mobile","website","picklist","lookup","autonumber","tag","layout"].indexOf(field.field_data_type) !== -1 && !this.data.isChildFieldLookup){
			if(comparator.indexOf("${") != -1){
				value = comparator;comparator = "equal"; //no i18n
			}else{
				if(field.api_name == "Call_Status" && ["Activities","Calls"].indexOf(this.data.cxPropModule)!= -1 ){
					value = "${Calls.Call Status."+comparator+"}"//no i18n
					return {comparator:"equal" ,field :{ api_name : api_name,id : field.id },value :value }
					// Lyte.arrayUtils(group, "push",{comparator:"equal" ,field :{ api_name : api_name,id : field.id },value :value } );//No I18n
					// continue
				}
				if(!crux_comp.component.validate()){
					flag = false;return { isValdationFailure : true};
				}
				// if(field.ui_type == 133 || field.data_type == "lookup"){
				// 	customLookupField.push(field.display_field_label);
				// 	CustomLookupCount = CustomLookupCount + 1;
				// }
				// if(field.field_data_type == "multiselectpicklist"){
				// 	value = crux_comp.querySelector("input").value;//No I18n
				// }
				// else{ 
					var args = field.cxGetActualValue ? "actual_value" : undefined;
					if(this.data.valuePrefixDropdownOpt.prefixOption.length){
						args = this.data.valuePrefixDropdownOpt.selected.getValueArgs ? this.data.valuePrefixDropdownOpt.selected.getValueArgs : "";
					}
					value = crux_comp.component.getValue(args);
					if(field.column_name == "ACTIVITYTYPE"){
						value = crux_comp.component.getValue("actual_value");//no i18n
					}
					// if(value.constructor == String && value.indexOf(",")!= -1 ){
					// 	value = this.SplitWord(value);
					// }
				// }
				// if(!this.checkLimitValues(value,"text")){
				// 	flag = false;return { isValdationFailure : true};
				// }
			}
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name, id : field.id},value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}

			var checkbox = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklist_tracker')[0];//no i18n
			var crossFilterCriteria ;
			if(field.field_data_type == "picklist" && field.history_tracking &&checkbox && checkbox.checked && comparator == "equal"){
				var comp =this.$node.querySelector('#DDV1_'+this._cruxReplace(field.api_name, "[/.]","_")+'_picklistTracker').ltProp('selected');//no i18n
				var daysNode = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_historyTrackDurationDays')[0];//no i18n
				//daysNode.setData("cxPropErrorMessage" , )
				if(!daysNode.component.validate()){
					flag = false;return { isValdationFailure : true};
				}
				var days = daysNode.component.getValue();
				days = "${AGEINDAYS}+"+days+""; //no i18n
				var relation_details =this.getData('module_info').related_lists[ this.getIndex(this.getData('module_info').related_lists,'picklist_tracker','action',true) ] //no i18n
				//var relation_details = field.history_tracking.module;
				var Obj1 = {field : {api_name : 'Modified_Time'},comparator : comp,value : days} // no i18n
				var Obj2 = {field : {api_name : field.history_tracking.duration_configured_field.api_name} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
				// if( field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")  ){
				// 	Obj2 = {field : {api_name : 'Stage_Duration_Calendar_Days'} ,comparator : 'equal',value : "${EMPTY}"} //no i18n
				// }
				var temp = this.construct_group(Obj1,Obj2,"AND"); //no i18n

				//moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields.filterBy({custom_field : false,data_type : "picklist"})[0].api_name
				if(field.api_name == "Stage" && ( module_name == "Deals" || module_name == "Potentials")){
					Obj1 = {field : {api_name : 'Stage'} ,comparator : comparator,value : value} //no i18n
				}else{
					Obj1 = {field : {api_name : this.get_pick_track_enable_field(moduleRecordMapping[idModuleMapping[field.history_tracking.module.id]].fields,field)} ,comparator : comparator,value : value} //no i18n
				}
                var relationApiName = this.data.supportRelatedModules ? this.getRelSysRefName(relation_details) : relation_details.api_name ;
				crossFilterCriteria = {include_objects :true ,relation : { api_name : relationApiName },criteria : this.construct_group(temp,Obj1,"AND")};//no i18n
					
				// return { type : "cross_filter" , cross_filter : cross_filter };
					
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", {include_objects :true ,relation : { api_name :relation_details.api_name },criteria : this.construct_group(temp,Obj1,"AND")}) //no i18n
			}
			if(field.api_name == "cxFilter_Record_status"){
				cross_filter = {include_objects :true ,relation : { relation_id: "" ,api_name : 'Review_Processes'},criteria : {comparator:comparator ,field :{ api_name : "Record_status" },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			}else if(field.field_data_type == "lookup" && !( this.data.cxPropModule == "Activities"&& ["CONTACTID","SEID"].indexOf(field.column_name)!= -1) ){// field.column_name !=  "CONTACTID" removed for contact lookup in salesorder module //no i18n
				if( field.ui_type == 132 ){
					var selectedId = this.getData().selectedValues.secondDropDownValue;
					mod = store.peekRecord("module",selectedId);//no i18n
					return {comparator:comparator ,field :{ api_name : api_name+"->"+mod.api_name+"."+( ( header[mod.module_name] && header[mod.module_name].length) ? header[mod.module_name][0] : "Name" )},value : value};
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"->"+mod.api_name+"."+( ( header[mod.module_name] && header[mod.module_name].length) ? header[mod.module_name][0] : "Name" )},value : value});//No I18n
				}else{
					mod = idModuleMapping[field.lookup.module.id];
					return {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" ) , id : field.id},value : value}
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+"."+( ( mod && header[mod] && header[mod].length) ? header[idModuleMapping[field.lookup.module.id]][0] : "Name" )},value : value});//No I18n
				}
			}else if( field.api_name == "cxFilter_Deal_Stage" || (( field.api_name == "Attended_By" || field.api_name == "Portal_Name" || field.api_name == "Browser" ||  field.api_name == "Search_Engine" ||  field.api_name == "Operating_System") && (module_name == "Leads" || module_name == "Contacts")  ) ){ //no i18n
				var cross_filter
				if(field.api_name != "cxFilter_Deal_Stage"){
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Visits.id ,api_name : 'Visits_Zoho_Livedesk'},criteria : {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}} //no i18n
				}else{
					cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : field.name,id : field.id },value : value}} //no i18n
				}
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			} else if (abmTechniqueFields.includes(field.api_name.replace('cxFilter_', ''))) {
				var cross_filter, relation_api_name;
				({cross_filter, relation_api_name} = this.getABMCriteria(field.api_name.replace('cxFilter_', ''), comparator, value)); // NO I18N
				isAbmFieldUsed = true;
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter, relation_api_name, cross_filter);
			} else{
				subTagCriteria =false;
				if(["Events_Tag","Calls_Tag","Tasks_Tag"].indexOf(api_name) != -1){
					api_name = "Tag";//no i18n
					subTagCriteria = true;
				}
				else if(api_name == "Status" && this.isZBCustomModule(this.getData("cxPropModule")) && value && field.pick_list_values){
					value = this.getDisplayValue(value, field , 'actual_value');
				}
				var tempCri1 = {comparator:comparator ,field :{ api_name : api_name , id : field.id},value : value}
				if(srsPrnt){
					var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
					srsPrnt=undefined;
					seriesParentCriteria = undefined;
					return { type : "cross_filter" , cross_filter : cross_filter };
				}
				if(srsField === "cxFilter_Series"){
					tempCri1 = "";
				}

				if(subTagCriteria){
					var apiMap = {Events_Tag : "Events", Calls_Tag : "Calls" , Tasks_Tag : "Tasks"};//no i18n
					var tempCr2 = {comparator:"equal" ,field :{ api_name : "Activity_Type"},value : apiMap[field.api_name]}//no i18n
					tempCri1 = this.construct_group(tempCri1,tempCr2,"AND");//no i18n
				}else if(field.api_name == "Data_Processing_Basis" && !(this.data.supportRelatedModules || this.data.isChildInput)){ //no i18n
					tempCri1.field.api_name = "Data_Processing_Basis_Details.Data_Processing_Basis";//no i18n
				}
				if(field.api_name !== "cxFilter_Competitor_Alert"){
					if((srsField && srsField !== "cxFilter_Series") || !srsField){
						if( crossFilterCriteria ){
							return { cross_filter : crossFilterCriteria , criteria : tempCri1};
						}
						return tempCri1
					}
				}
				
				// Lyte.arrayUtils(group, "push", tempCri1);//No I18n
			}
		}else if(field.field_data_type == "ownerlookup" || field.field_data_type == "userlookup"){ //no i18n
			if(!crux_comp.component.validate()){
				flag = false;return { isValdationFailure : true};
			}
			value = crux_comp.component.getValue();
			// if(!this.checkLimitValues(value,"text")){
			// 	flag = false;return { isValdationFailure : true};
			// }
			var tempCri1 = {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			if(srsPrnt){
				var cross_filter = this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				// this.groupSeriesCriteria(seriesParentCriteria,tempCri1 );
				srsPrnt=undefined;
				seriesParentCriteria = undefined;
				return { type : "cross_filter" , cross_filter : cross_filter };
			}
			var roleOrGroup = '';
			if(['equal_role','equal_group'].indexOf(comparator) > -1){
				roleOrGroup = comparator.indexOf('role') > -1 ? 'role' : 'group'; //For Group, api_name need not to be changes as per doc
				comparator = 'equal';
			}else if(comparator == 'not_equal_role'){ // not equal support is not there for groups
				roleOrGroup = 'role';
				comparator = 'not_equal';
			}
			if(roleOrGroup === 'group'){
				//For Groups, inner relation based cross fitler is being applied
				var cross_filter = {include_objects : true};
				var relatedListDetails = Crm.groupUserRelDetails.listRelation;
				cross_filter.relation = {type : 'field' , api_name : field.api_name};
				cross_filter.relation.relation = {type : 'related_list', api_name : relatedListDetails.api_name};
					
				var grpUserFldDetails = Crm.groupUserRelDetails.field ;
				cross_filter.criteria = {comparator : comparator, field : { api_name : grpUserFldDetails.api_name , id : grpUserFldDetails.id} , value : value};
				//doubtFull of multiple apiname based grps
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no i18n
				
			}else if(roleOrGroup === 'role'){
					var roleField = Crm.userRoleField;
					return {comparator:comparator ,field :{ api_name : api_name+'.role' ,id : roleField.id },value : value}
					// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name+'.role' ,id : roleField.id },value : value});//No I18n
			}
			//This case need to be validated. Cross of crossfields
			if(field.api_name == "cxFilter_Deal_Owner"){
				var cross_filter = {include_objects :true ,relation : { relation_id:moduleRecordMapping.Potentials.id ,api_name : moduleRecordMapping.Potentials.api_name},criteria : {comparator:comparator ,field :{ api_name : roleOrGroup == 'role' ? field.name+'.role' : field.name,id : field.id },value : value}} //no i18n
				return { type : "cross_filter" , cross_filter : cross_filter };
				// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
				// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
			}else if(!roleOrGroup){
				return tempCri1;
				// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
			}
		}else if(field.field_data_type == "boolean"){ //no i18n
			value = $L('#'+this._cruxReplace(field.api_name, "[/.]","_")+'_crux_comp')[0].component.getValue() //no i18n
			return  {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value}
			// Lyte.arrayUtils(group, "push", {comparator:comparator ,field :{ api_name : api_name,id : field.id },value : value});//No I18n
		}else if(field.field_data_type == "multiselectlookup" || field.field_data_type == "multiuserlookup" || this.data.isChildFieldLookup){ //no i18n
			// var modInfo = moduleRecordMapping[idModuleMapping[field[field.field_data_type].linking_module.id]],
			var include_objects = true
			value = comparator
			if(comparator.indexOf("${") == -1){
				if(field.ui_type == 445 || field.field_data_type == "multiuserlookup"){
					if(!crux_comp.component.validate()){
						flag = false;return { isValdationFailure : true};
					}
					value = crux_comp.component.getValue()
				}else{
					// var t = this.$node.querySelector("#option_"+this._cruxReplace(field.api_name, "[/.]","_"));//no i18n
					var t = this.$node;
					value = t.getData().renderItems //no i18n
					// value = JSON.parse(value)
					if(!value.length && !this.data.cxPropIgnoreEmptyValue){
						this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check",field.field_label),crux_comp) //no i18n
						flag = false;return { isValdationFailure : true};
					}
					value = this.getValueBasedonKeys(value,t.getData().lookupDisplayField);
				}
			}else {
				include_objects = comparator == "${EMPTY}" ? false : true;//no i18n
				if( comparator == "${NOTEMPTY}" ){
					value = "${EMPTY}" //no i18n
				}
				comparator = "not_equal";//no i18n

			}
			//comparator = (field.data_type == "multiuserlookup") ? comparator :  "equal" //no i18n
			//var relation_details =this.getData('module_info').related_lists[this.getIndex(this.getData('module_info').related_lists,modInfo.module_name,'linkingmodule',true)] //no i18n
			//var link_field = this.findLinkingField(field,modInfo.fields)
			var cross_filter = {include_objects :include_objects ,relation : { api_name : field[field.field_data_type].api_name},criteria : {comparator:comparator ,field : { api_name : this.data.isChildFieldLookup ? field.api_name : field[field.field_data_type].connectedlookup_apiname,id : field.id },value : value }} //no i18n
			if(this.data.isChildFieldLookup){
				return cross_filter.criteria;
			}
			return { type : "cross_filter" , cross_filter : cross_filter };
			// this.updateCrossFilter(crossfilter , cross_filter.relation.api_name , cross_filter);//no 18n
			// Lyte.arrayUtils(crossfilter, "push", cross_filter);//No I18n
		} else if(field.field_data_type === "multirelation" && field.api_name === "cxFilter_Linked_Segment__s") {
			var cross_filter,
				cruxNode,
				isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
				include_objects = true,
				value = comparator,
				relation = {
					type: 'related_list', // NO I18N
					api_name: this.data.supportRelatedModules ? 'ABM_Account__r' : "ABM_Accounts", // NO I18N
					relation: {
						api_name: 'ABM_Account_Segment__s' // NO I18N
					}
				};
				/*
				 relation = {
					 type: 'related_list',
					 api_name: 'ABM_Account_Segment1'
				 }; */

			if (!isAccountModule) {
				relation = {
					type: 'field', // NO I18N
					api_name: commonInfo.abmModuleInfo.account_name.api_name, // NO I18N,
					relation: {
						api_name: this.data.supportRelatedModules ? 'ABM_Account_Segment__r' : 'ABM_Account_Segment1' // NO I18N
					}
				};
			}
			
			isAbmFieldUsed = true;
			
			if(comparator.indexOf("${") === -1) {
				// cruxNode = this.$node.querySelector("#option_" + this._cruxReplace(field.api_name, "[/.]","_")); // NO I18N
				cruxNode = this.$node;
				value = cruxNode.getData().renderItems;
				
				if(!value.length){
					this.showFilterAlert(_cruxUtils.getI18n("crm.field.valid.check", field.field_label), crux_comp); // NO I18N
					flag = false;
					
					return {
						isValdationFailure: true
					};
				}
				
				value = this.getValueBasedonKeys(value, cruxNode.getData().lookupDisplayField);
			} else {
				include_objects = !(comparator === "${EMPTY}"); // NO I18N
				
				if(comparator === "${NOTEMPTY}") {
					value = "${EMPTY}"; // NO I18N
				}
				
				comparator = "not_equal"; // NO I18N
			}

			cross_filter = {
				include_objects: include_objects,
				relation: relation,
				criteria: {
					comparator: comparator,
					field: {
						api_name: "Linked_Segment__s" // NO I18N
					},
					value: value
				}
			};
			return { type : "cross_filter" , cross_filter : cross_filter , relation_name : isAccountModule ? relation.api_name : relation.relation.api_name  };
			// this.updateCrossFilter(crossfilter, isAccountModule ? relation.api_name : relation.relation.api_name, cross_filter);
		} 
	},
	getABMCriteria: function (api_name, comparator, value) {
		var commonInfo = this.getData('cxPropCommonInfo'), // NO I18N
			cross_filter,
			isAccountModule = commonInfo.abmModuleInfo.isAccountModule,
			relation = {
				api_name: this.data.supportRelatedModules ? 'ABM_Account__r' : 'ABM_Accounts' // NO I18N
			},
			relationApiName = relation.api_name;
		if (!isAccountModule) {
			relation = {
				type: 'field', // NO I18N
				api_name: commonInfo.abmModuleInfo.account_name.api_name,
				relation: relation
			};
			relationApiName = relation.relation.api_name;
		}
		cross_filter = {
			include_objects: true,
			relation: relation,
			criteria: {
				comparator: comparator,
				field: {
					api_name: api_name
				},
				value: value
			}
		};
		return {cross_filter: cross_filter, relation_api_name: relationApiName};
	},
	groupScoreCriteria : function(scoreParentCriteria ,crtTemp ){
		var crossCrt = this.construct_group(scoreParentCriteria,crtTemp,"AND"); //No I18n
		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping["Entity Scores"].id ,api_name : this.moduleRecordMapping["Entity Scores"].api_name},criteria : crossCrt }
		return crossFltr;
		// this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
	},
	groupSeriesCriteria : function(srsParentCriteria,crossCrt ){
		//var crossCrt
		var mod = crmListView.getObject().module;
		var realtedDetails = this.getData('module_info').related_lists;
		var crossCrt = this.construct_group(srsParentCriteria,crossCrt,"AND"); //No I18n
        var len = realtedDetails.length
        for(var i = 0; i< len ;i++){
	         if(realtedDetails[i].personality_name === 'SERIESPERSONALITY'){
				    var relationApiName = this.data.supportRelatedModules ? this.getRelSysRefName(realtedDetails[i]) :  realtedDetails[i].api_name;
		       		var crossFltr = {include_objects :true ,relation : { relation_id:this.moduleRecordMapping.Entity_Cadences.id ,api_name : relationApiName},criteria : crossCrt }
		            return crossFltr;
					// this.updateCrossFilter(crossfilter , crossFltr.relation.api_name , crossFltr);//no 18n
		            // break;
	          }
         }
	},
	getRelSysRefName : function(childDetails){
        var moduleApiName = childDetails.module.api_name;
		var relatedModules =this.getData('module_info').relatedModules;
		var relatedModule = relatedModules.find(item => item.module.api_name === moduleApiName);
		if(relatedModule){
            return relatedModule.api_name;
		} else {
			return childDetails.api_name;
		}
	},
	handleFieldDisplayForCrossFilter : function(){
		var originalFieldLabel = this.data.field.field_label;
		var _self = this;
		if(this.data.isChildInput && this.parentCompData && this.parentCompData.data.cxPropChildModuleDisplayLabel){ //handling to display alert containing field name along with module name for cross filters will be revert set at end of this method
			var fieldLabel = this.data.field.field_label+" of "+this.parentCompData.data.cxPropChildModuleDisplayLabel;
			Lyte.Component.set(this.data.field,{"field_label" : fieldLabel}); //NO I18n
		}
		setTimeout(function(){
            Lyte.Component.set(_self.data.field,{"field_label" : originalFieldLabel}); //NO I18n
		},100);
	},
	get_pick_track_enable_field : function(fields,currField){
		var i, len = fields.length;
		for( i =0 ; i < len ; i++){
			if(fields[i].refer_from_field && fields[i].refer_from_field.id === currField.id && fields[i].api_name !== 'Moved_To__s'){ // Skipping the 'Moved_To__s' field because it also refers to the same picklist field.
				return fields[i].api_name;
			}
		}
		return false;
	},
	checkSubFieldOpt : function(opt = {}){
		let {field , value} = opt;
		if(field.api_name === 'cxFilter_Scoring_Rule' && value){
			let selRule = field.pick_list_values.filter((pickVal)=>{return value == pickVal.display_value || value == pickVal.actual_value})[0],
				hide = false;
			this.data.crossFields.forEach((subFld)=>{
				Lyte.objectUtils(subFld , 'add' , 'cxHide' , true);
				hide = false;
				if(  selRule && selRule.type === 'zia_scoring' && subFld.api_name !== "Score"){
					hide = true;
				}
				Lyte.objectUtils(subFld , 'add' , 'cxHide' , hide);
			})
			// if(  ){
				$L(`#sub_field_Score`)[0].ltProp('checked',selRule.type === 'zia_scoring');//No i18N
			// }
		}
	}
 }, {mixins : ["crux-criteria-conditions","crux-filter-utils", "crux-aria-smart-filter-input-mixin"]});//No I18n
Lyte.Component.registerHelper("radioBtnIsSelected", function(field,Obj,isChecked) {//No I18n
	var defaultSelected = ["Positive_Score","Activity_Due","Without_Any_Notes", "high","win" , "opened" ,"With_Contact" , "With_Open_Deal" , "Attended","In_Last","Events_Tag","NBX_Available", "Locked_True","Start_Date__s"]; //no i18n
	if( field.sent_status && field.sent_status[0] && field.sent_status[0].api_name == Obj.api_name){
		return field.api_name+"_selectedRadioBtn"; //no i18n
	}
	if(defaultSelected.indexOf(Obj.api_name)!=-1){
		if(isChecked){
			return true;
		}
		return field.api_name+"_selectedRadioBtn"; //no i18n
	}
	if(Obj.api_name==="cxFilter_EMAIL_both" || Obj.api_name==="cxFilter_ADDN_EMAIL_both"){
		return true;
	}
	if(isChecked){
			return false;
	}
	return "";
});

Lyte.Component.register("crux-smart-filter-crossfields", {
_template:"<template tag-name=\"crux-smart-filter-crossfields\"> <template is=\"if\" value=\"{{expHandlers(cxPropChildFields.length,'>',0)}}\"><template case=\"true\"> {{addMurhyInfo(\"crux-smart-filter-crossfields.html\",\"Feb Default Changes\")}} <crux-smart-filter cx-prop-user-field-properties=\"{{cxPropUserFieldProperties}}\" cx-prop-fields=\"{{lbind(cxPropChildFields)}}\" cx-prop-class=\"cxSmFrCrossFldFilterList\" id=\"customFilter_{{cxPropModuleField.api_name}}\" cx-prop-child-module-fields=\"true\" cx-prop-child-module-relation=\"{{cxPropModuleField.api_name}}\" cx-prop-child-module-display-label=\"{{cxPropModuleField.field_label}}\" on-value-change=\"{{method('onChildValueChange')}}\" on-field-change=\"{{method('onChildFieldChanged')}}\" cx-prop-module-display-field=\"{{cxPropModuleDisplayField}}\" cx-prop-child-selected-field-count=\"{{selectedFieldCount}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" set-conditions=\"{{method('setConditionsCallback')}}\" cx-prop-child-module-name=\"{{cxPropModuleField.moduleName}}\" class=\"childCruxFilter\" cx-prop-cross-filter-translations=\"{{cxPropCrossFilterTranslations}}\" cx-prop-is-special-fields=\"false\"> </crux-smart-filter> </template></template> <div lt-prop-title=\"{{if(disableFieldAddition,cxPropChildFieldLimitTooltip,'')}}\" lt-prop-tooltip-config=\" { &quot;position&quot; : &quot;bottom&quot; , &quot;appearance&quot; : &quot;box&quot; , &quot;showdelay&quot; : 1000 , &quot;maxdisplaytime&quot; : 5000 } \"> <div data-zcqa=\"addField_{{cxPropModuleField.field_label}}\" onclick=\"{{action('onAddField')}}\" class=\"cxSmFrCrossFldDropdownWrap cxSmFilterCrossFieldDropBtn {{if(disableFieldAddition,'eventNone disable',)}}\"> <span class=\"cxSmFrCrFieldBtnText mL25\"> <lyte-text lt-prop-value=\"{{cruxGetI18n('crm.button.add')}} {{cruxGetI18n('crm.label.field')}}\"> </lyte-text> </span> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]}],
_observedAttributes :["cxPropModuleField","cxPropChildFields","selectedFieldCount","showLoader","disableFieldAddition","cxPropChildFieldLimit","cxPropBoundary","cxPropChildFieldLimitTooltip","cxPropModuleDisplayField","cxPropUserFieldProperties"],
_observedAttributesType :["object","array","number","boolean","boolean","number","object","string","object","object"],
//no i18n
	data : function(){
	    return {
	      cxPropModuleField :  Lyte.attr("object" , { default : {} }),//No I18n
	      cxPropChildFields : Lyte.attr("array", {default : []}),//no i18n
		  selectedFieldCount : Lyte.attr("number", {default : 0}), // NO I18N
		  showLoader:Lyte.attr("boolean",{default : false}),//No I18n
	      disableFieldAddition : Lyte.attr("boolean",{default : false}),//No I18n
	      cxPropChildFieldLimit : Lyte.attr("number"), // NO I18N
		  cxPropBoundary : Lyte.attr("object", { default : {} }),//no i18n
	      cxPropChildFieldLimitTooltip : Lyte.attr("string",{default : ""}),//no i18n
		  cxPropModuleDisplayField: Lyte.attr("object", {default : {}}),//no i18n
		  cxPropUserFieldProperties : Lyte.attr("object", {default : {}}) //no i18n
		}
	  },
	  
	  init : function(){
			if(this.data.cxPropChildFields.length === 0){
				this.setData("showLoader",true);
			} else {
				this.setDropDownFields(); 
			}
	  },
	  showDropDownFields : function(){
			if(this.data.showLoader) {
				this.setData("showLoader",false);
				this.setDropDownFields();
			}
	  }.observes('cxPropChildFields'),//No I18n

	  
	  setDropDownFields: function(){
			var childFields = Lyte.deepCopyObject(this.getData("cxPropChildFields"));
			for(var i=0;i<childFields.length;i++){
				childFields[i].cxHide = true;
				childFields[i].showDummyInput = false;
			}
			this.setData("cxPropChildFields",childFields); //NO I18n  
			if( this.data.cxPropChildFields.length < this.data.cxPropChildFieldLimit){
				this.setData("cxPropChildFieldLimitTooltip",I18n.getMsg('crm.smart.filter.child.fields.limit2'));
			}
	  },

		updateFieldsOnRemove : function(){
			this.setData("selectedFieldCount", this.data.selectedFieldCount - 1 );
			if(this.data.selectedFieldCount < this.data.cxPropChildFieldLimit){
				this.setData("disableFieldAddition",false);
			}
		},
		
        incrementSelectedFieldCount :function(){
        	this.setData("selectedFieldCount", this.data.selectedFieldCount + 1 );
			if((this.data.selectedFieldCount >= this.data.cxPropChildFieldLimit) || (this.data.selectedFieldCount >= this.data.cxPropChildFields.length)){
				this.setData("disableFieldAddition",true);
			}
        },
		onAddingFields : function(){
            if(this.data.disableFieldAddition){
				return;
			 }
			 var api_name = this.getData("cxPropModuleField").api_name;
			 var id = "#customFilter_"+api_name;
			 var cruxSmartFilComp = this.$node.querySelector(id);
			 var allFields = cruxSmartFilComp.getData("allFields"); //No I18n
			 var appliedFields = cruxSmartFilComp.getData("appliedFields"); //No I18n
			 var totalFields = appliedFields.concat(allFields);
			 var lastEmptyIndex = -1;
			 for(var i=totalFields.length -1;i>=0;i--) {
				 
				 if(totalFields[i].cxHide === false){
					 lastEmptyIndex = i;
					 break;
				 }
			 }
			 //handling for corner cases where arrayoutofbound index occurs
			 if(lastEmptyIndex+1 === totalFields.length){
				var fieldsMovedLast = [];
				for( i=0;i<appliedFields.length;i++){
				   if(appliedFields[i].cxHide === true){
					   fieldsMovedLast.push(appliedFields[i]);
					   Lyte.arrayUtils( appliedFields , 'removeAt' , i , 1 );
				   }
				}
				for( i=0;i<allFields.length;i++){
				   if(allFields[i].cxHide === true){
					   fieldsMovedLast.push(allFields[i]);
					   Lyte.arrayUtils( allFields , 'removeAt' , i , 1 );
				   }
				}
				if(fieldsMovedLast.length === 0){
					return;
				}
				Lyte.arrayUtils( allFields , 'push' , fieldsMovedLast);
				this.onAddingFields();
			 }
			 Lyte.Component.set(totalFields[lastEmptyIndex+1], {"cxHide" : false});//no i18n
			 Lyte.Component.set(totalFields[lastEmptyIndex+1], {"showDummyInput" : true});//no i18n
			 this.setData("selectedFieldCount", this.data.selectedFieldCount + 1 );
			 if((this.data.selectedFieldCount >= this.data.cxPropChildFieldLimit) || (this.data.selectedFieldCount >= this.data.cxPropChildFields.length)){
				 this.setData("disableFieldAddition",true);
			 }
			 var dropDownid = "#customFilter_DropDown_customFilter_"+api_name+"_"+totalFields[lastEmptyIndex+1].id; //no i18n
			 this.$node.querySelector(dropDownid).open();
			 if( this.getMethods("onFieldChange")){
				var checkedFields = [totalFields[lastEmptyIndex+1]];
                var field = {},_event= {};
				field.checked = true;
				_event.type = 'click';
				this.executeMethod("onFieldChange", checkedFields,field,_event,totalFields[lastEmptyIndex+1]);//No I18n
			}
		},
	 
		actions :{
			onAddField : function(){
				this.onAddingFields();
			}
	    },

	  methods : {
	     
		  onChildValueChange : function(arg){
				if( this.getMethods("onValueChange")){
					this.executeMethod("onValueChange", arg);//No I18n
				}
			},
			
			onChildFieldChanged : function(checkedFields,field,event,currentFieldData){
				if( this.getMethods("onFieldChange")){
					this.executeMethod("onFieldChange", checkedFields,field,event,currentFieldData);//No I18n
				}
			},
			setConditionsCallback : function(args)
			{
				if( this.getMethods("setConditions")){
					return this.executeMethod("setConditions", args);//No I18n
				}
				// if(args.field && args.field.data_type && ["text","website"].includes(args.field.field_data_type))
				// {
				// 	var _length = args.condition.length;
				// 	for(var i=0;i<_length;i++){
				// 		if(args.condition[i].system && args.condition[i].system === 'contains'){
				// 			return {conditions : args.condition , selected :'contains'}; //No I18N
				// 		}
				// 	}
				// }
				// else if(args.field && args.field.data_type && ["datetime" , "date" , "date_time"].includes(args.field.field_data_type))
				// {
				// 	var notBtwnObj = {display : I18n.getMsg("not between"), system : "not_between"}, //No I18N
				// 	tillYesObj = {system : "${YESTERDAYMINUS}", display : I18n.getMsg("Till Yesterday")}; //No I18N
				// 	args.condition.splice(6,0,notBtwnObj);
				// 	args.condition.splice(11,0,tillYesObj);
				// 	return args.conditions;
				// }
				// return args.conditions;
			}
	  }
	
});


//# sourceMappingURL=crux-filter-component.js.map