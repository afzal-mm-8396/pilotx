/**
 * @author naveen.winson
 * This mixin is to be included when using components like crux-criteria-editor and crux-smart-filter. This mixin will set comparators based on data type. This mixin will set the conditions in the callee component's scope and one can overwrite it like any object.
 */
Lyte.Mixin.register("crux-criteria-conditions", {//No I18n
/**
 * @author naveen.winson
 * This is the mail util to set the comparators.
 * @params from - string - either criteria or filter
 */
	initCruxConditions : function(from){
		var isObj = {system : "equal", display : _cruxUtils.getI18n("is")};//NO I18n
		var isntObj = {system : "not_equal", display : _cruxUtils.getI18n("isn't")};//NO I18n
		var containsObj = {system : "contains", display : _cruxUtils.getI18n("contains")};//NO I18n
		var doesntContainObj = {system : "not_contains", display : _cruxUtils.getI18n("doesn't contain")};//NO I18n
		var startsWithObj = {system : "starts_with", display : _cruxUtils.getI18n("starts with")};//NO I18n
		var endsWithObj = {system : "ends_with", display : _cruxUtils.getI18n("ends with")};//NO I18n
		var dueInDaysObj = {system : "Due in Days", display : _cruxUtils.getI18n("Due in Days")};//NO I18n
		var todayObj = {display : _cruxUtils.getI18n("Today"), system : "${TODAY}"};//NO I18n
		var yesterdayObj = {system : "${YESTERDAY}", display : _cruxUtils.getI18n("Yesterday")};//NO I18n
		var lastWeekObj = {system : "${LASTWEEK}", display : _cruxUtils.getI18n("Last Week")};//NO I18n
		var lastMonthObj = {system : "${LASTMONTH}", display : _cruxUtils.getI18n("Last Month")};//NO I18n
		var emptyObj = {system : "${EMPTY}", display : _cruxUtils.getI18n("is\ empty")};//NO I18n
		var notEmptyObj = {system : "${NOTEMPTY}", display : _cruxUtils.getI18n("is not empty")};//NO I18n
		var betweenObj = {display : _cruxUtils.getI18n("between"), system : "between"};//NO I18n
		var notBetweenObj = {display : _cruxUtils.getI18n("not between"), system : "not_between"};		//NO I18n
		var belongsToRoleObj = {display : _cruxUtils.getI18n('crm.condition.belongs.to',_cruxUtils.getI18n('crm.security.role')), system : "equal_role"};
		var notBelongsToRoleObj = {display : _cruxUtils.getI18n('crux.condition.not.belongs.to',_cruxUtils.getI18n('crm.security.role')), system : "not_equal_role"};
		var belongsToGroupObj = {display : _cruxUtils.getI18n('crm.condition.belongs.to',_cruxUtils.getI18n('crm.security.group')), system : "equal_group"};
		var belongsToTypeObj = {display : "Belongs to Type", system : "equal_type"};
		var notBelongsToTypeObj = {display : "Does not belongs to Type", system : "not_equal_type"};
		
		from = from ? from : "criteria"; //no i18n
		if(from == "criteria"){
			this.textConditions = [{system : "None", display : _cruxUtils.getI18n("None")}, isObj, isntObj, containsObj, doesntContainObj,//NO I18n
				startsWithObj, endsWithObj, emptyObj, notEmptyObj];
			this.dateConditions = [isObj, isntObj, {system : "less_than", display : _cruxUtils.getI18n("is before")},//NO I18n
				{system : "greater_than", display : _cruxUtils.getI18n("is after")}, betweenObj, notBetweenObj, todayObj,//NO I18n
				{display : _cruxUtils.getI18n("Tommorow"), system : "${TOMORROW}"},//NO I18n
				{system : "${TOMORROWPLUS}", display : _cruxUtils.getI18n("Tommorow Onwards")}, yesterdayObj,//NO I18n
				{system : "${YESTERDAYMINUS}", display : _cruxUtils.getI18n("Till Yesterday")}, lastMonthObj,//NO I18n
				{system : "${THISMONTH}", display : _cruxUtils.getI18n("Current Month")},//NO I18n
				{system : "${NEXTMONTH}", display : _cruxUtils.getI18n("Next Month")}, lastWeekObj,//NO I18n
				{system : "${THISWEEK}", display : _cruxUtils.getI18n("Current Week")},//NO I18n
				{system : "${NEXTWEEK}", display : _cruxUtils.getI18n("Next Week")},//NO I18n
				{system : "${THISYEAR}", display : _cruxUtils.getI18n("crm.thisyear")},//NO I18n
				{system : "${THISFY}", display : _cruxUtils.getI18n("Current\ FY")},//NO I18n
				{system : "${THISFQ}", display : _cruxUtils.getI18n("Current\ FQ")},//NO I18n
				{system : "${LASTYEAR}", display : _cruxUtils.getI18n("crm.prediction.analytics.filter.year")},//NO I18n
				{system : "${PREVFY}", display : _cruxUtils.getI18n("Previous\ FY")},//NO I18n
				{system : "${PREVFQ}", display : _cruxUtils.getI18n("Previous\ FQ")},//NO I18n
				{system : "${NEXTYEAR}", display : _cruxUtils.getI18n("crm.label.next.year")},//NO I18n
				{system : "${NEXTFY}", display : _cruxUtils.getI18n("Next\ FY")},//NO I18n
				{system : "${NEXTFQ}", display : _cruxUtils.getI18n("Next\ FQ")},//NO I18n
				{system : "Age in Days", display : _cruxUtils.getI18n("Age in Days")}, dueInDaysObj,
				emptyObj, notEmptyObj];//NO I18n
			this.ageInDaysConditions = [{system : "equal", display : "="}, {system : "not_equal", display : "!="}, {system : "less_than", display : "<"},//NO I18n
				{system : "less_equal", display : "<="}, {system : "greater_than", display : ">"}, {system : "greater_equal", display : ">="}];//no i18n
			this.defaultConditions = [isObj, isntObj]; //NO I18n
			this.stageConditions = [{system : "None", display : _cruxUtils.getI18n("None")},isObj, isntObj,{system : "${OPEN}", display : _cruxUtils.getI18n("is OPEN")},{system : "${CLOSEDWON}", display : _cruxUtils.getI18n("is WON")},{system : "${CLOSEDLOST}", display : _cruxUtils.getI18n("is LOST")}, containsObj, doesntContainObj,//NO I18n
		startsWithObj, endsWithObj, emptyObj, notEmptyObj];//NO I18n
			this.multimodulelookupConditions = [{system : "None", display : _cruxUtils.getI18n("None")}, isObj, isntObj, containsObj, doesntContainObj,//NO I18n
				startsWithObj, endsWithObj, emptyObj, notEmptyObj];
			this.defWithEmptyConditions = [isObj, isntObj,emptyObj, notEmptyObj];
			this.defWithEmptyUserConditions = this.data.cxPropRoleSupport ? this.defWithEmptyConditions.concat([belongsToRoleObj, notBelongsToRoleObj]) : this.defWithEmptyConditions; //addition of roles and group for UserLookup
			if(this.data.cxPropGroupSupport){
				this.defWithEmptyUserConditions = this.defWithEmptyUserConditions.concat([belongsToGroupObj]);
			}
			if(this.data.cxPropBelongsTypeSupport){
				this.defWithEmptyUserConditions = this.defWithEmptyUserConditions.concat([belongsToTypeObj,notBelongsToTypeObj]);
			}

		}
		else if(from == "filter"){
			this.textConditions = [isObj, isntObj, containsObj, doesntContainObj, startsWithObj, endsWithObj, emptyObj, notEmptyObj];
			dueInDaysObj = {system : "Due in Days", showDynamicInput : true, comparator : "less_equal", display : _cruxUtils.getI18n("crm.zinvoice.dueIn")};//no i18n
			this.dateConditions = [{system : "Age in Days", showDynamicInput : true , comparator : "less_equal" , display : _cruxUtils.getI18n("crm.condition.in.last")}, dueInDaysObj,//NO I18n
				{system : "equal", display : _cruxUtils.getI18n("on")}, {system : "less_than", display : _cruxUtils.getI18n("before")},//NO I18n
				{system : "greater_than", display : _cruxUtils.getI18n("crm.label.general.small.after")},//NO I18n
				{system : "between", display : _cruxUtils.getI18n("between")}, //NO I18n
				todayObj,
				{ system : "${TOMORROW}",display : _cruxUtils.getI18n("Tommorow")},
				{system : "${TOMORROWPLUS}", display : _cruxUtils.getI18n("Tommorow Onwards")},
				yesterdayObj,
				{system : "${THISWEEK}", display : _cruxUtils.getI18n("crm.thisweek")},//NO I18n
				{system : "${THISMONTH}", display : _cruxUtils.getI18n("crm.label.this.month")},//NO I18n
				lastWeekObj, lastMonthObj,
				{system : "${THISYEAR}", display : _cruxUtils.getI18n("crm.thisyear")},//NO I18n
				{system : "${THISFY}", display : _cruxUtils.getI18n("Current\ FY")},//NO I18n
				{system : "${THISFQ}", display : _cruxUtils.getI18n("Current\ FQ")},//NO I18n
				{system : "${LASTYEAR}", display : _cruxUtils.getI18n("crm.prediction.analytics.filter.year")},//NO I18n
				{system : "${PREVFY}", display : _cruxUtils.getI18n("Previous\ FY")},//NO I18n
				{system : "${PREVFQ}", display : _cruxUtils.getI18n("Previous\ FQ")},//NO I18n
				{system : "${NEXTYEAR}", display : _cruxUtils.getI18n("crm.label.next.year")},//NO I18n
				{system : "${NEXTFY}", display : _cruxUtils.getI18n("Next\ FY")},//NO I18n
				{system : "${NEXTFQ}", display : _cruxUtils.getI18n("Next\ FQ")},emptyObj,notEmptyObj];//NO I18n
			this.defaultConditions = [isObj, {system : "not_equal", display : _cruxUtils.getI18n("crm.filter.is.not")}]; //NO I18n
			this.stageConditions = [isObj, {system : "not_equal", display : _cruxUtils.getI18n("crm.filter.is.not")},{system : "${OPEN}", display : _cruxUtils.getI18n("is OPEN")},{system : "${CLOSEDWON}", display : _cruxUtils.getI18n("is WON")},{system : "${CLOSEDLOST}", display : _cruxUtils.getI18n("is LOST")},//NO I18n
		emptyObj, notEmptyObj];
			this.defWithEmptyConditions = [isObj, {system : "not_equal", display : _cruxUtils.getI18n("crm.filter.is.not")}, emptyObj, notEmptyObj]; //NO I18n
			this.defWithEmptyUlConditions = this.data.cxPropRoleSupport ? this.defWithEmptyConditions.concat([belongsToRoleObj, notBelongsToRoleObj]) : this.defWithEmptyConditions; //addition of roles and group for UserLookup
			if(this.data.cxPropGroupSupport){
				this.defWithEmptyUlConditions = this.defWithEmptyUlConditions.concat([belongsToGroupObj]);
			}
		}
		this.defEmptyConditions = [emptyObj,notEmptyObj];//no i18n
		this.encryptNumberConditions = [{system : "equal", display : "="}, {system : "not_equal", display : "!="},emptyObj,notEmptyObj];//no i18n
		this.enc_textConditions = [isObj, isntObj, emptyObj, notEmptyObj];
		this.booleanConditions = [isObj];
		this.numberConditions = [{system : "equal", display : "="}, {system : "not_equal", display : "!="}, {system : "less_than", display : "<"},//NO I18n
				{system : "less_equal", display : "<="}, {system : "greater_than", display : ">"}, {system : "greater_equal", display : ">="},//NO I18n
				betweenObj, notBetweenObj, emptyObj, notEmptyObj];
		this.numberWithOEmptyConditions = [{system : "equal", display : "="}, {system : "not_equal", display : "!="}, {system : "less_than", display : "<"},//NO I18n
				{system : "less_equal", display : "<="}, {system : "greater_than", display : ">"}, {system : "greater_equal", display : ">="},//NO I18n
				betweenObj, notBetweenObj];
		this.csConditions = [{system : "${Calls.Call Status.Scheduled}", display : _cruxUtils.getI18n("Scheduled")}, {system : "${Calls.Call Status.Attended Dialled}", display : _cruxUtils.getI18n("Attended Dialled")},//NO I18n
			{system : "${Calls.Call Status.Unattended Dialled}", display : _cruxUtils.getI18n("Unattended Dialled")}, {system : "${Calls.Call Status.Overdue}", display : _cruxUtils.getI18n("Overdue")},//NO I18n
			{system : "${Calls.Call Status.Cancelled}", display : _cruxUtils.getI18n("Cancelled")}, {system : "${Calls.Call Status.Received}", display : _cruxUtils.getI18n("Received")},//NO I18n
			{system : "${Calls.Call Status.Missed}", display : _cruxUtils.getI18n("Missed")}];//NO I18n
	},
	/**
	 * @author naveen.winson
	 * This columns are restricted for criteria editor and smart filter. You can pass more column names from application by writing your own cruxAssets.
	 */
	restrictedColumnNames : function(from){
		from = from ? from : "criteria"; //No I18n
		if(typeof cruxAssets != "undefined" && cruxAssets['restrictedColumnNames_'+from]){
			return cruxAssets['restrictedColumnNames_'+from];
		}
		if(from == 'criteria'){
			return ["COMMENTCONTENTS","PARTICIPANTID","ISCALLBILLABLE","CHECKINLONGITUDE","CHECKINLATITUDE","PUBLISHED","PRODUCTDETAILS","PREDICTIONSCORE","ACCOUNTCF501","ZCAMPAIGNID","ISCTICALL","BEST_TIME","ISDUPLICATE","ISAPPROVED","CONVERTEDDATE","SENDNOTIFICATION", "REMINDAT"]; //no i18n
		}
	},
	/**
	 * @author naveen.winson
	 * This fields with the specified ui_types are restricted for criteria editor and smart filter. You can pass more ui_types from application by writing your own cruxAssets.
	 */
	restrictedUITypes : function(from){
		from = from ? from : "criteria"; //No I18n
		if(typeof cruxAssets != "undefined" && cruxAssets['restrictedUITypes_'+from]){
			return cruxAssets['restrictedUITypes_'+from];
		}
		if(from == 'criteria'){
			return [66,999,3,123,1234,134,500,444,445,51,104];
		}
	}
});
