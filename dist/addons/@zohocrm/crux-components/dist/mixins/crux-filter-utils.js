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

