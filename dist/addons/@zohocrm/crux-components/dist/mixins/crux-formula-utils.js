/*changes made
    1. crmFormulaUtil changed to this
    2. crmFormulaUtil.self.userDetails changed this.userDetails(storing the user details reference in the component layer)
    3. crmFormulaUtil.self.isAgg changed to this.isAgg
    4. executeFunctionByName apply context changed from helper to this
    5. date time in crux does'nt contain 'TV', check added for it
    6. self.formulaObj changed to this.formulaObj
    7. adding bind in for each in evaluate aggregate
    8. rename getDateInUserDatePattern to getDateInUserDatePatternForFormula
    9. rename getTimeInUserFormat to getTimeInUserFormatForFormula
    10. rename getDateTimeInUserFormat to getDateTimeInUserFormatForFormula
*/

//userDetails
//isAgg
Lyte.Mixin.register("crux-formula-utils", {	
    self:{},
    indexVsFunctionMap:{},
    /*
    removing white spaces in formula and changing , to #& to avoid wrong split and ),( are skipped
    */
    removeWhiteSpaces: function name(formula) {
        var hasSingleQuote = false;
        var modifedFormula = '';
        for (var i = 0; i < formula.length; i++) {
            if (formula[i] == "'") {
                hasSingleQuote = !hasSingleQuote;
                modifedFormula += formula[i];
            }
            else {
                if (!hasSingleQuote && formula[i] != " ") {
                    if (formula[i] == ",") {
                        modifedFormula += '#&';
                    }
                    else {
                        modifedFormula += formula[i];
                    }
                }
                else {
                    if (formula[i] == "(") {
                        modifedFormula += '\\(';
                    }
                    else if (formula[i] == ")") {
                        modifedFormula += '\\)'
                    }
                    else {
                        modifedFormula += formula[i];
                    }

                }

            }
        }
        return modifedFormula;
    },
    executeFunctionByName : function(functionName, context){
        var args = Array.prototype.slice.call(arguments,2);//.splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        var namespaces_length=namespaces.length;
        for(var i = 0; i < namespaces_length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    },
    parserDate: function(dateStr, patternStr){
        dateStr = dateStr.split(/[^0-9^a-z^A-Z]+/);
        patternStr = patternStr.split(/[^dmyDMY]+/);
        var d = '',y = '',m = '', patternStrLen = patternStr.length;
        for(var i = 0; i < patternStrLen; i++) {
            if(patternStr[i]) {
                switch(patternStr[i][0]){
                    case 'D':
                        d = dateStr[i];
                        break;
                    case 'M':
                        m = dateStr[i];
                        break;
                    case 'Y':
                        y = dateStr[i];
                        break;
                }
            }
        }
        return (m+"/"+d+"/"+y);
    },
    validateSubformRowByAggCrt: function(subRow,fldInvolved,crt,fldList){
        var involvedFldsleng=fldInvolved.length;
        for(var i=0;i<involvedFldsleng;i++){
            var fldName=fldInvolved[i];
            var val=subRow[fldName];
            if(val && typeof val === "string"){
                val=val.trim();
            }
            var type=fldList[fldName]?fldList[fldName].type:null,fieldType=fldList[fldName]?fldList[fldName].fieldType:null;
            if(!val && val!==0 && fieldType!=="boolean"){
                val='';
                if(fieldType==="userlookup" || fieldType==="picklist"){
                    val='-None-';//no i18n
                }
            }
            else if(val && (type==='datetime')){
                if(val.includes('TV')){
                    val=val.split('TV')
                }else{
                    val = [val,$L.moment(val,Crm.userDetails.DATE_PATTERN.toUpperCase()+" "+Crm.userDetails.TIME_FORMAT.replace('a','A')).format(Crm.userDetails.TIME_FORMAT.replace('a','A'))]
                }
                val=this.parserDate(val[0],this.userDetails.DATE_PATTERN.toUpperCase())+" "+val[1];
            }
            else if(val && type==='date'){
                val=this.parserDate(val,this.userDetails.DATE_PATTERN.toUpperCase());
            }
            else if(val && type==='multi-picklist'){
                val=val.slice(2,-2).replaceAll('","',";").toLowerCase();
            }
            else if(val && fieldType==="userlookup"){
                val=val.id;
            }
            else if(val && fieldType==="lookup"){
                val=val.name;
                val = this.escapedContent(val);
            }
            crt=crt.replaceAll("${"+fldInvolved[i]+"}",val);
        }
        return this.evaluateFormula(crt)==='true';
    },
    
    validataSubformRowByNLAggCrt: function(subRow,crt,fldList){
        var fldsleng=Object.values(fldList).length;
        for(var i=0;i<fldsleng;i++){
            var fld = fldList[i];
            var fldName=fld.field_label;
            var data_type=fld?fld.data_type:null,type=fld?fld.type:null;
            var val=subRow[fldName];
            if(val && typeof val === "string"){
                val=val.trim();
            }
            if(!val && val!==0 && data_type!=="boolean"){
                val='';
                if(data_type==="userlookup" || data_type==="picklist"){
                    val='-None-';//no i18n
                }
            }
            else if(val && data_type==='datetime'){
                val=val.replace('TV',' ');
                val=new Date(val).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            }
            else if(val && type==='multi-picklist'){
                val=val.slice(2,-2).replaceAll('","',";").toLowerCase();
            }
            else if(val && data_type==="userlookup"){
                val=val.id;
            }
            else if(val && data_type==="lookup"){
                val=val.name;
            }
            if(typeof val === 'string'){
                val=val.trim();
            }
            crt=crt.replaceAll("${"+fld.subFormName+"."+fldName+"}",val);
        }
         return this.evaluateFormula(crt)==='true';
    },
    
    evaluateNLAggregate: function(obj){
        var aggrFun = obj.aggrFun;
        var subformDatas = obj.subformData;
        var subformDataKeys = Object.keys(subformDatas);
        var exp=obj.crtExp;
        var subfromFlds = obj.subfromFlds;
        var result = obj.result;
        var userDetails = obj.userDetails;
        var aggrFld = obj.aggrFld;
        switch(aggrFun)
        {
            case("SUM"):
            case("AVG"):
                var subformRowLen=subformDataKeys.length;
                var rowCount=0;
                for(var j=0;j<subformRowLen;j++)
                {
                    var subformData=subformDatas[subformDataKeys[j]];
                    if(!exp || this.validataSubformRowByNLAggCrt(subformData,exp,Object.values(subfromFlds))){
                        var value = null;
                        if(!isNaN(subformData[aggrFld]))
                        {
                            value = parseFloat(subformData[aggrFld]);
                        }
                        if(value){
                            result = Number(result) + value;
                        }
                        if(value === 0)
                        {
                            result =  Number(result) + value;
                        }
                        rowCount+=1;
                    }
                }
                if(aggrFun==="AVG"){
                    rowCount=Math.max(1,rowCount);
                    if(result !== "" )
                    {
                        result = result/rowCount;
                    }
                    else
                    {
                        result = result/rowCount;
                    }
                }
                break;
            case("MIN"):
                var subformRowLen=subformDataKeys.length;
                result = "";
                for(var j=0;j<subformRowLen;j++)
                {
                    var subformData=subformDatas[subformDataKeys[j]];
                    if(!exp || this.validataSubformRowByNLAggCrt(subformData,exp,Object.values(subfromFlds))){
                        if(!isNaN(subformData[aggrFld]))
                        {
                            var value = parseFloat(subformData[aggrFld]);
                        }
                        if(value && (result==="" || result > value || result===0)){
                            result = value;
                        }
                        if(value === 0)
                        {
                            result = value;
                        }
                    }
                }
                break;
            case("MAX"):
                var subformRowLen=subformDataKeys.length;
                result = "";
                for(var j=0;j<subformRowLen;j++)
                {
                    var subformData=subformDatas[subformDataKeys[j]];
                    if(!exp || this.validataSubformRowByNLAggCrt(subformData,exp,Object.values(subfromFlds))){
                        if(!isNaN(subformData[aggrFld]))
                        {
                            var value = parseFloat(subformData[aggrFld]);
                        }
                        if(value &&(result==="" || result < value)){
                            result = value;
                        }
                        if(value === 0)
                        {
                            result = value;
                        }
                    }
                }
                break;
            default:
                break;
        }
        return result;
    },
    
    evaluateAggregate: function(obj) {
        var _slbindData = obj.sublbindData;
        var _apiName = obj.apiName;
        var _userDetails = obj.userDetails;
        var _aggff = obj.aggFld;
        var _isdefaultInvSubform=obj.componentData.isdefaultInvSubform;
        var _fldList=obj.fldList;
        var _val;
            var _exp = _aggff.criteriaDetails?_aggff.criteriaDetails.crtExp:undefined;
            switch (_aggff.operation) {
                case "AVG":
                case "SUM":
                case "COUNT":
                    var sum = "";
                    var len = 0;
                    if(_aggff.operation === "COUNT" && _slbindData.length>0){
                        _slbindData = _slbindData.filter((data)=>{
                            return this.checkIfRecordIsEmpty && !this.checkIfRecordIsEmpty(data.id);
                        });
                    }
                    _slbindData.forEach(function(data) {
                        if((_exp && this.validateSubformRowByAggCrt(data,_aggff.criteriaDetails.fldsUsed,_exp,_fldList)) ||(!_exp)){
                            if (Number(data[_apiName]) || Number(data[_apiName]) === 0) {
                                sum = Number(sum) + Number(data[_apiName]);
                            } else if (!isNaN(data[_apiName]) && parseInt(data[_apiName])) {
                                sum = Number(sum) + parseFloat(data[_apiName]);
                            }
                            if ((data[_apiName]) === undefined && sum === "") {
                                sum = "";
                            }
                            len+=1;
                        }
                    }.bind(this));
                    if(_aggff.operation === "COUNT")
                    {
                        _val = Math.max(0,len);
                    }
                    len=Math.max(1,len);
                    if (_aggff.operation === "AVG") {//no i18n
                        var avrValue;
                        if (sum !== "") {
                            avrValue = sum / len;
                        }
                        if (sum === "") {
                            _val = undefined;
                        }
                        else {
                            _val = Number(Number(avrValue).toFixed(_aggff.decimalLength));
                        }
                    } else if (_aggff.operation === "SUM") {//no i18n
                        if (sum === "") {
                            _val = undefined;
                        }
                        else {
                            _val = Number(Number(sum).toFixed(_aggff.decimalLength));
                        }
                        var finnVal;
                        if (sum === "") {
                            finnVal = undefined;
                        }
                        else {
                            finnVal = Number(Number(sum).toFixed(_aggff.decimalLength));
                        }
                        if (_isdefaultInvSubform && _aggff.columnName === "SUBTOTAL") {
                            if (!isNaN(finnVal) && _userDetails.lineItemFormulaCalcFlow && Object.keys(_userDetails.lineItemFormulaCalcFlow).length > 0 &&
                                _userDetails.lineItemFormulaCalcFlow[obj.current__inventory__module].aggrFields[_aggff.columnName]) {
                                var invproductDetails = obj.current__inventory__RoundOffDetail;
                                var roundedOffVal = Math.sign(parseFloat(finnVal) * invproductDetails.roundOffPrecision) * Math.round(Math.abs((parseFloat(finnVal) * invproductDetails.roundOffPrecision).toFixed(invproductDetails.roundOff)));
                                finnVal = (roundedOffVal / invproductDetails.roundOffPrecision).toFixed(invproductDetails.roundOff);
                                finnVal = parseFloat(finnVal);
                            }
                        }
                        _val = finnVal;
                        //							if(_aggff.columnName === "SUBTOTAL" && isdefaultInvSubform){//commented for ZCRM-195367
                        //								currentComponent.component.updateInvGrandDisAndTaxValues(parentDatabind);
                        //							}
                    }
                    break;
                case "MAX":
                case "MIN":
                    var prev_max, prev_min;
                    var atleastoneValid = false;
                    _slbindData.forEach(function(data) {
                        if (((_exp && this.validateSubformRowByAggCrt(data,_aggff.criteriaDetails.fldsUsed,_exp,_fldList))||(!_exp)) && (!isNaN(data[_apiName]) && parseFloat(data[_apiName]) || parseFloat(data[_apiName]) === '0')) {
                            //Max
                            if (prev_max === undefined || prev_max < parseFloat(data[_apiName])) {
                                prev_max = parseFloat(data[_apiName]);
                            }
                            //min
                            if (prev_min === undefined || prev_min > parseFloat(data[_apiName])) {
                                prev_min = parseFloat(data[_apiName]);
                            }
                            atleastoneValid = true;
                        }
                    }.bind(this));
                    if (_aggff.operation === "MAX" && prev_max !== undefined) {//no i18n
                        _val = Number(Number(prev_max).toFixed(_aggff.decimalLength));
                    } else if (_aggff.operation === "MAX" && !atleastoneValid) {//no i18n
                        _val = undefined;
                    }

                    if (_aggff.operation === "MIN" && prev_min !== undefined) {//no i18n
                        _val = Number(Number(prev_min).toFixed(_aggff.decimalLength));
                    } else if (_aggff.operation === "MIN" && !atleastoneValid) {//no i18n
                        _val = undefined;
                    }
                    break;
            }
        return _val;
    },
    evaluateFormula : function(obj,fldsData){
//		if(!obj.match(/\)$/g)){
//		if(!obj.match(/^\(/g)||!obj.match(/\)$/g)){
            obj = "("+obj+")";
//		}
        var paranCount = obj.match(/\(/g);
        var escParanCount = obj.match(/\\\(/g);
        var numberOfExp = null;
        if(paranCount){
            numberOfExp = paranCount.length;
            if(escParanCount){
                numberOfExp	-= escParanCount.length; 
            }
        }else{
            obj = "("+obj+")";
            numberOfExp = 1;
        }
        //		obj = removeWhiteSpaces(obj);
        for(var i =0;i<numberOfExp;i++){
            obj = this.getParanthesisPos(obj,fldsData); 			
        }
        return this.unescapedContent(this.extractContent(obj));
    },
    
    //Here white spaces outside single quotes are removed and 
    //comma is replaced by the separator #& , since few need a specific separtor to differentiate between
    //arguments of a formula function and a simple comma string.
//		function removeWhiteSpaces(obj){
//			var foundSingleQuote = false;
//			var retString = "";
//			var prevChar = null;
//			for(var x = 0;x<obj.length;x++){
//				if(x!==0){
//					prevChar = obj[x-1];
//				}
//				if(prevChar!=="\\"&&obj[x]=="'"){
//					foundSingleQuote = (foundSingleQuote)?false:true;
//					retString += obj[x];
//				}else if(!foundSingleQuote && obj[x] != " "){
//					if(prevChar!=="\\"&&obj[x]==","){
//						retString +="#&"
//					}else{
//						retString += obj[x];
//					}
//				}else if(foundSingleQuote){
//					retString += obj[x];
//				}
//			}
//			return retString;		
//		}
    
    //To identify the position of parentheses and the executable blocks.
    //parentheses inside singles quotes are ignored and considered as part of user input string.
    getParanthesisPos:function(obj,fldsData){
        var stack = [];
        var bracketMap = [];
        var lastAction = null;
        this.findFunctions(obj);
        var foundSingleQuote = false; //To ignore any open/close bracket inside a string
        var prevChar = null;
        //obj = obj.replace(/[a-zA-Z]*\(/g,"#(");
        var obj_length=obj.length;
        for(var x = 0;x<obj_length;x++){
            if(x!==0){
                prevChar = obj[x-1];
            }
            if(prevChar!=="\\"){
                if(obj[x]=="'"){
                    foundSingleQuote = (foundSingleQuote)?false:true;
                }else if(!foundSingleQuote){
                    if(obj[x] == "("){		
                        lastAction = "push";//no i18n
                        stack.push(x);
                    }else if(obj[x] == ")"){				
                        var openIndex = stack.pop();		
                        if(lastAction=="push"){
                            var ret = this.splitObjInGivenRange(obj,openIndex,x-1-openIndex,fldsData);
                            bracketMap.push("nothing between "+openIndex+":"+x+":"+ret);
                            return ret;
                        }else{
                            bracketMap.push("something between "+openIndex+":"+x);
                        }
                        lastAction = "pop";//no i18n
                    }
                }
            }
        }
        return obj;
    },
     escapedContent:function(obj){
        return obj.replace(/'/g,"\\'").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/,/g,"\\,")
    },
    unescapedContent:function(obj){
        return obj.replace(/\\'/g,"'").replace(/\\\(/g,"(").replace(/\\\)/g,")").replace(/\\,/g,",");
    },
    findFunctions : function(obj){
        var regex = /[a-zA-Z0-9]*\(/g;
        var arrObj=[];
        this.indexVsFunctionMap = {};
        var val,endIndex;
        while((val=regex.exec(obj))!==null){
            arrObj.push(val);
            endIndex = (val.index+val[0].length);
            this.indexVsFunctionMap[endIndex] = val[0].split("(")[0];
        }	
    },
    
       splitObjInGivenRange:function(obj,s,e,fldsData){
//		if(e==0){
//			console.log("{empty}");
//		}else{
            var isTextField = fldsData && (fldsData.fromLyteC.sourcefieldData.ui_type === 1 ||fldsData.fromLyteC.sourcefieldData.ui_type === 110) && (fldsData.fromLyteC.fldData.fieldsInvolved.length === 1 && fldsData.fromLyteC.fldData.fieldsInvolved[0] !== "_NO_VALID_FIELDS");
            var isToStringFuc = this.indexVsFunctionMap[s+1] === 'Tostring' && isTextField && obj === '('+fldsData.toConvert+')' ? true : false;
            var isTextFormulaField = this.indexVsFunctionMap[s+1] === "" && isTextField && obj === '('+fldsData.toConvert+')' ? true : false;
            var str = obj.substr(s+1,e);
            if(isTextFormulaField || isToStringFuc)
            {
                return str;
            }
            var setVal = this.evalFunc(str,s,this.indexVsFunctionMap[s+1]);
            //var setVal = (evaledVal)?str.split(",")[1]:str.split(",")[2];
            var strPart1 = obj.substr(0,s-(this.indexVsFunctionMap[s+1].length))
            var strPart2= obj.substr(s+e+2);
            return strPart1+setVal+strPart2;
//		}
    },
    
       evalFunc:function(obj,startIndex,funcName){
        var funcName = funcName.toLowerCase()+"Func";//No i18n
        return this.executeFunctionByName(funcName,this.crmFormulaHelper,obj);
    },
    
    evaluateLogicalOperation: function(expression) {
        if(!(/^([0-9]*[.%^///*\-+><==!=null]*)*$/g.test(expression))){
        //if(!(/^([0-9a-zA-Z]*[\'%^*-+><==!=]*)*$/g.test(expression))){
            if(this.extractContent(expression)=="false"){
                return false;
            }else if(this.extractContent(expression)== "true"){
                return true;
            }
            
            // Evaluate string comparison '=='
            if ((/^[^!=]*[=]{2}.*$/g).test(expression)){
                var compareStrings = expression.split("==")
                var left = this.extractContent(compareStrings[0]);
                var right = this.extractContent(compareStrings[1]);
                // if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true)
                // {
                // 	if(left !== "" && right !== "")
                // 	{
                // 		return left.trim() == right.trim();
                // 	}
                // 	else
                // 	{
                // 		return "";
                // 	}
                // }
                // else
                // {
                    return left.trim() == right.trim();
                //}
            }
            
            // Evaluate string comparison '!='
            if ((/^[^!=]*[!]{1}[=]{1}.*$/g).test(expression)){
                var compareStrings = expression.split("!=")
                var left = this.extractContent(compareStrings[0]);
                var right = this.extractContent(compareStrings[1]);
                // if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true)
                // {
                // 	if(left !== "" && right !== "")
                // 	{
                // 		return left.trim() != right.trim();
                // 	}
                // 	else
                // 	{
                // 		return "";
                // 	}
                // }
                // else
                // {
                    return left.trim() != right.trim();
                //}
            }
          
//			if(checkForExpression(expression)){
//				return evaluateExpression(expression);
//			}
//			return extractContent(unescapedContent(expression));
            return expression;
        }
        return this.evaluateArithmetic(this.unescapedContent(expression));
    },
    
    //https://en.wikipedia.org/wiki/Shunting-yard_algorithm
      evaluate : function(expression)
    {
        if(!(/^(([0-9e|E]|[0-9])*[)(.%^///*\-+><==!=null]*)*$/g.test(this.unescapedContent(expression)))){
        //if(!(/^([0-9a-zA-Z]*[\'%^*-+><==!=]*)*$/g.test(expression))){
            if(this.extractContent(expression)=="false"){
                return false;
            }else if(this.extractContent(expression)== "true"){
                return true;
            }
            
//			if(checkForExpression(expression)){
//				return evaluateExpression(expression);
//			}
//			return extractContent(unescapedContent(expression));
            return this.evaluateLogicalOperation(expression);
        }
        return this.evaluateArithmetic(this.unescapedContent(expression));
    },
    
    evaluateArithmetic: function(expression) {
        if(expression==""){
            return "";  
        }
        if(this.checkForExpression(expression)){
            return this.evaluateExpression(expression);
        }
        var tokens = this.getIndividualTokens(expression);
        
        if(tokens.length>0&&tokens.length<2){
            if(isNaN(tokens[0]))
            {
                return "";
            }
            return parseFloat(expression);
        }
      
         // Stack for numbers: 'values'
        var values = [];
 
        // Stack for Operators: 'ops'
        var ops = [];
        if(!this.formulaObj.assume_default)
        {
            var countOps = 0,countZeros = 0,cnt=0;;
        }
        var tokens_length=tokens.length;
        for (var i = 0; i < tokens_length; i++)
        {
           //handle for only add and subtract operators
            if(!this.formulaObj.assume_default)
            {	
                if(tokens[i] === "null")
                {
                    values.push(null);
                }
                if(tokens[i] === '+' || tokens[i] === '-')
                {
                    countOps ++;
                }
                if(tokens[i] === '0')
                {
                    countZeros ++;
                }
                if(((countZeros+countOps) === tokens_length) && countZeros !== 0)
                {
                    return 0;
                }
            }
             // Current token is a number, push it to stack for numbers
            if (!isNaN(tokens[i]))
            {
                values.push(parseFloat(tokens[i]));
            }
            else if (tokens[i] == '('){
                ops.push(tokens[i]);
              }
             // Closing brace encountered, solve entire brace
            else if (tokens[i] == ')')
            {
                while (ops[ops.length-1] != '('){ //eslint-disable-line forLoopConditions
                    values.push(this.applyOp(ops.pop(), values.pop(), values.pop()));
                    if(ops.length===0){
                        return "";
                    }
                }
                ops.pop();
            }
            // Current token is an operator.
            else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/' || tokens[i] == '%' || tokens[i] == '^')
            {
                // While top of 'ops' has same or greater precedence to current
                // token, which is an operator. Apply operator on top of 'ops'
                // to top two elements in values stack
                while (!ops.length==0 && this.hasPrecedence(tokens[i], ops[ops.length-1])){ //eslint-disable-line forLoopConditions
                  values.push(this.applyOp(ops.pop(), values.pop(), values.pop()));
                }
                // Push current token to 'ops'.
                ops.push(tokens[i]);
                if(!this.formulaObj.assume_default && ((i === tokens_length-1 || i === 0) || (tokens[i+1] === '+' || tokens[i+1] === '-')) && (tokens[i] === '+' || tokens[i] === '-'))
                   {
                       values.push(0);
                       cnt++;
                       if(i === 0)
                       {
                           values.push(0);
                       }
                }
            }
            else{
              if (tokens[i] !== "null") {
                return "";
              }
            }
        }
 
        // Entire expression has been parsed at this point, apply remaining
        // ops to remaining values
        while (!ops.length==0){ //eslint-disable-line forLoopConditions
            values.push(this.applyOp(ops.pop(), values.pop(), values.pop()));
        }
 
        // Top of 'values' contains result, return it
        if(!this.formulaObj.assume_default)
        {
            var result = values.pop();
            if( result === 0 && cnt === tokens_length)
            {
                   return "";
               }
            return result;
        }
        else
        {
            return values.pop();
        }
    },
 
    // Returns true if 'op2' has higher or same precedence as 'op1',
    // otherwise returns false.
    hasPrecedence:function(op1,op2)
    {
        if (op2 == '(' || op2 == ')'){
            return false;}
        if ((op1 == '*' || op1 == '/' ||op1 == '%') && (op2 == '+' || op2 == '-')){
            return false;}
        else if(op1 == "^"&&(op1 == '*' || op1 == '/' ||op1 == '%' || op2 == '+' || op2 == '-')){
            return false;}
        else{
            return true;}
    },
 
    // A utility method to apply an operator 'op' on operands 'a' 
    // and 'b'. Return the result.
    applyOp : function(op, b,a)
    {
        if(!this.formulaObj.assume_default)
        {
            switch (op)
            {
            case '+':
                return a + b;
            case '-':
                if(a === "" && b ==="")
                {
                    return "";
                }
                return a - b;
            case '*':
                if(a && b)
                {
                    var commonMultiplier=1000;
                    return ((a * commonMultiplier) * b)/commonMultiplier;
                }
                else
                {
                    if((a === 0 && b !== null) || (b === 0 && a !== null))
                    {
                        return  a * b;
                    }
                    else
                    {
                        return "";
                    }
                }
            case '/':
                if(a && b)
                {
                    return a / b;
                }
                else
                {
                    if((a === 0 && b !== null) || (b === 0 && a !== null))
                    {
                        if (b == 0){
                            return 0;//no i18n
                        }
                        return  a / b;
                    }
                    else
                    {
                        return "";
                    }
                }
            case '%':
                if(a && b)
                {
                    return a % b;
                }
                else
                {
                    if((a === 0 && b !== null) || (b === 0 && a !== null))
                    {
                        if (b == 0){
                            return 0;//no i18n
                        }
                        return a % b;
                    }
                    else
                    {
                        return "";
                    }
                }
            case '^':
                if(a && b)
                {
                    return Math.pow(a,b);
                }
                else
                {
                    if((a === 0 && b !== null) || (b === 0 && a !== null))
                    {
                        return Math.pow(a,b);
                    }
                    else
                    {
                        return "";
                    }
                }
            }
            return 0;
        }
        else
        {
            switch (op)
            {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                var commonMultiplier=1000;
                return ((a * commonMultiplier) * b)/commonMultiplier;
            case '/':
                if (b == 0){
                    return "error";//no i18n
                }
                return a / b;
            case '%':
                if (b == 0){
                    return "error";//no i18n
                }
                return a % b;
            case '^':
                return Math.pow(a,b);
            }
            return 0;
        }
    },
    
    getIndividualTokens:function(obj){
        var valArr = [];
        var isNum;
        var obj_length=obj.length;
        for(var i=0;i<obj_length;i++){
            var isExpVal = (obj[i] === 'e' && (!isNaN(parseFloat(obj[i+1])) || ['-','+'].indexOf(obj[i+1]) > -1));
            if(!isNaN(parseFloat(obj[i]))||obj[i]=="." || isExpVal){
                var temp="";
                if(isNum){
                    temp = valArr.pop(obj[i]);
                }
//				if(obj[i]=="."&&!isNum){
//					obj[i]="0.";
//				}
                isNum=true;
                if(isExpVal){
                    var exp = i;
                    temp += obj[exp];
                    if(['-','+'].indexOf(obj[exp + 1]) > -1){
                        temp += obj[++exp];
                    }
                    while(!isNaN(parseFloat(obj[exp + 1]))){
                        temp += '' + obj[++exp] + '';
                    }
                    i = exp;
                    valArr.push(temp);
                }else{	
                    valArr.push(temp+obj[i]);
                }
            }else{
                if(isNum==false&& (obj[i]=="-" || obj[i] == "+") &&!isNaN(parseFloat(obj[i+1]))){
                    valArr.push(obj[i]+obj[i+1]+"");
                    i++;
                    isNum=true;
                }else if(i==0&& (obj[i]=="-" || obj[i]=='+')){
                    if(!this.formulaObj.assume_default)
                    {
                        if(obj[i] === '+' && obj[i+1]==="-" )
                        {
                            valArr.push(obj[i]+"");
                            isNum=false;
                        }
                        else if(obj[i]==="-" && obj[i+1]==="-" )
                        {
                            valArr.push(obj[i]+"");
                            isNum=false;
                        }
                        else if(obj[i+1]!="-" && obj[i+1]!== undefined)
                        {
                            if((!this.formulaObj.assume_default) && obj[i+1] === 'n' && obj.substring(i+1,i+5) === "null")
                            {
                                if(i !== 0)
                                {
                                    valArr.push(obj[i]);
                                }
                                valArr.push(obj.substring(i+1,i+5));
                                if(i+5 !== obj_length)
                                {
                                    valArr.push(obj[i+5]);
                                }
                                i+=5;
                            }
                            else
                            {
                                valArr.push(obj[i]+obj[i+1]+"");
                                i++;
                            }
                            isNum=true;
                        }
                        else
                        {
                            valArr.push(obj[i]+"");
                            isNum=false;
                        }
                    }
                    else
                    {
                        valArr.push(obj[i]+obj[i+1]+"");
                        i++;
                        isNum=true;
                    }
                }
                else{
                    if((!this.formulaObj.assume_default) && obj[i] === 'n' && obj.substring(i,i+4) === "null")
                    {
                        valArr.push(obj.substring(i,i+4));
                        if(i+4 !== obj_length)
                        {
                            valArr.push(obj[i+4]);
                        }
                        i+=4;
                    }
                    else
                    {
                        valArr.push(obj[i]);
                    }
                    isNum=false;
                }
            }
        }
        return valArr;
    },
    
    checkForExpression:function(expression){
        var regex = new RegExp(/>|<|<=|>=|>|==|!=/g);
        var regOutput = regex.exec(expression);
        return (regOutput)?true:false;
    },
    
    evaluateExpression:function(expression){
        var regex = new RegExp(/<=|<|>=|>|==|!=/g);
        var regOutput = regex.exec(expression);
        var comparator = (regOutput)?regOutput[0]:null;
        if(comparator){
            var operands = expression.split(comparator); 
            var lho = this.evaluate(this.extractContent(operands[0]));
            var rho = this.evaluate(this.extractContent(operands[1]));
            if(!this.formulaObj.assume_default)
            {
                if(lho !== "" || rho !== "")
                {
                    switch (comparator)
                    {
                    case "==":
                        return lho===rho;
                    case "!=":
                        return lho!==rho;
                    default:
                        if(lho === "" || rho === ""){
                            return "";
                        }
                        switch(comparator){
                            case ">":
                                return lho>rho;
                            case "<":
                                return lho<rho;
                            case ">=":
                                return lho>=rho;
                            case "<=":
                                return lho<=rho;
                        }
                    }
                }
                else
                {
                    return "";
                }
            }
            else
            {
                switch (comparator)
                {
                case ">":
                    return lho>rho;
                case "<":
                    return lho<rho;
                case ">=":
                    return lho>=rho;
                case "<=":
                    return lho<=rho;
                case "==":
                    return lho==rho;
                case "!=":
                    return lho!=rho;
                }
            }	
        }
    },
    
    extractContent:function(value){
        if(value && value.match(/^'/g)){
            return value.substring(1,value.length-1);
        }else{
            return value;
        }
    },
    dateToString: function(date,pattern) {
        if(String(date) === "Invalid Date"){
            return "";
        }
        var months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var values = {
            D: (""+date.getDate()).slice(-2),
            DD: ("0"+date.getDate()).slice(-2),
            M: date.getMonth()+1,
            MM: ("0"+(date.getMonth()+1)).slice(-2),
            MMM:months[date.getMonth()].slice(0,3),
            MMMM:months[date.getMonth()],
            YY: (""+date.getFullYear()).slice(-2),
            YYYY : date.getFullYear()
        };
           var dPattern=['DD','D']
           var mPattern=['MMMM','MMM','MM','M']
           var yPattern =['YYYY','YY'];
           var value=pattern;
           for(var d=0;d<2;d++){
            var dp=dPattern[d];
            if(pattern.indexOf(dp)!==-1){
                value=value.replace(dp,values[dp]);
                break;
            }
        }
        for(var m=0;m<4;m++){
            var mp=mPattern[m];
            if(pattern.indexOf(mp)!==-1){
                value=value.replace(mp,values[mp]);
                break;
            }
        }
        for(var y=0;y<2;y++){
            var yp=yPattern[y];
            if(pattern.indexOf(yp)!==-1){
                value=value.replace(yp,values[yp]);
                break;
            }
        }
        return value;
    },
    crmFormulaHelper:{
        Func:function(value){
            return this.evaluate(value);
    //		if(value.match(/^'/g)){
    //			return evaluate(value.substring(1,value.length-1));
    //		}else{
    //			return evaluate(value);
    //		}	
        },
        //******** Boolean Functions ********//
        ifFunc:function(obj){
            var criteria = obj.split("#&")[0];
            var evalVal =  this.evaluateLogicalOperation(criteria);
            if(evalVal === "")
            {
                return "";
            }
            return (evalVal)?this.evaluate(obj.split("#&")[1]):this.evaluate(obj.split("#&")[2]);
        },
        andFunc:function(obj){
            var splitObj = obj.split("#&");
            var splitObj_length=splitObj.length;
            var count = 0;
            for(var i=0;i<splitObj_length;i++){
                var res = this.evaluateLogicalOperation(splitObj[i]);
                if(!res){
                    if(!this.formulaObj.assume_default)
                    {
                        if(res===''){
                            count=1;
                        }
                        else{
                            return res;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            if(count>0){
                return '';
            }
            return true;
        },
        orFunc:function(obj){
            var splitObj = obj.split("#&");
            var splitObj_length=splitObj.length;
            if(!this.formulaObj.assume_default)
            {
                var count=0;
                for(var i=0;i<splitObj_length;i++){
                    if(this.evaluateLogicalOperation(splitObj[i])){
                        return true;
                    }
                    if(this.evaluateLogicalOperation(splitObj[i]) === "")
                    {
                        count++;
                    }
                }
                if(count === splitObj_length)
                {
                    return "";
                }
                return false;
            }
            else
            {
                for(var i=0;i<splitObj_length;i++){
                    if(this.evaluateLogicalOperation(splitObj[i])){
                        return true;
                    }
                }
                return false;
            }
        },
        notFunc:function(obj){
            if(this.evaluateLogicalOperation(obj)){
                return false;
            }
            else if(this.evaluateLogicalOperation(obj) === "")
            {
                return ""
            }
            return true;
        },
        //******** Boolean Functions ********//
        
        //******** Numeric Functions ********//
        absFunc:function(value){
            if(!this.formulaObj.assume_default)
            {
                if(value !== "")
                {
                    return Math.abs(this.evaluate(this.extractContent(value)));
                }
                else
                {
                    return "";
                }
            }
            else
            {
                return Math.abs(this.evaluate(this.extractContent(value)));
            }
        },
        
        ceilFunc:function(x){
            var arr = x.split("#&");
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true)
            {
                if(arr.length === 1 && arr[0] !== "")
                {
                    return Math.ceil(this.evaluate(this.extractContent(arr[0])));
                }
                else if(arr.length === 2 && arr[0] !== ""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    if(!arr[1]){
                        arr[1]=0;
                    }
                    if(arr[1]<0 || arr[1]%1){
                        return "";
                    }
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.ceil(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                else
                {
                    return "";
                }
            }
            else if(arr.length === 1)
            {
                return Math.ceil(this.evaluate(this.extractContent(arr[0])));
            }
            else if(arr.length === 2){
                if(arr[0]!=="" && arr[1]!==""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    arr[1]=arr[1]<0?0:Math.floor(arr[1]);
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.ceil(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                if(arr[1]!==""){
                    return 0;
                }
            }
            else{
                return "";
            }
        },
        
        floorFunc:function(x){
            var arr = x.split("#&");
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true)
            {
                if(arr.length === 1 && arr[0] !== "")
                {
                    return Math.floor(this.evaluate(this.extractContent(arr[0])));
                }
                else if(arr.length === 2 && arr[0] !== ""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    if(!arr[1]){
                        arr[1]=0;
                    }
                    if(arr[1]<0 || arr[1]%1){
                        return "";
                    }
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.floor(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                else
                {
                    return "";
                }
            }
            else if(arr.length === 1)
            {
                return Math.floor(this.evaluate(this.extractContent(arr[0])));
            }
            else if(arr.length === 2){
                if(arr[0]!=="" && arr[1]!==""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    arr[1]=arr[1]<0?0:Math.ceil(arr[1]);
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.floor(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                if(arr[1]!==""){
                    return 0;
                }
            }
            else{
                return "";
            }
        },
        
        roundFunc:function(x){
            var arr = x.split("#&");
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true)
            {
                if(arr.length === 1 && arr[0] !== "")
                {
                    return Math.round(this.evaluate(this.extractContent(arr[0])));
                }
                else if(arr.length === 2 && arr[0] !== ""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    if(!arr[1]){
                        arr[1]=0;
                    }
                    if(arr[1]<0 || arr[1]%1){
                        return "";
                    }
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.round(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                else
                {
                    return "";
                }
            }
            else if(arr.length === 1)
            {
                return Math.round(this.evaluate(this.extractContent(arr[0])));
            }
            else if(arr.length === 2){
                if(arr[0]!=="" && arr[1]!==""){
                    arr[1]=this.evaluate(this.extractContent(arr[1]));
                    arr[1]=arr[1]<0?0:Math.round(arr[1]);
                    var precision = Math.pow(10,Math.max(Math.min(Math.round(arr[1]),9),0));
                    return Math.round(this.evaluate(this.extractContent(arr[0]))*precision)/precision;
                }
                if(arr[1]!==""){
                    return 0;
                }
            }
            else{
                return "";
            }
        },
        
        naturallogFunc:function(value){
            if(!this.formulaObj.assume_default)
            {
                if(value !== "")
                {
                    return Math.log(this.evaluate(this.extractContent(value)));
                }
                else
                {
                    return "";
                }
            }
            else
            {
                return Math.log(this.evaluate(this.extractContent(value)));
            }
        },
        
        base10logFunc:function(value){
            if(!this.formulaObj.assume_default)
            {
                if(value !== "")
                {
                    return Math.log10(this.evaluate(this.extractContent(value)));
                }
                else
                {
                    return "";
                }
            }
            else
            {
                return Math.log10(this.evaluate(this.extractContent(value)));
            }
        },
        
        maxFunc:function(x){
            var arr = x.split("#&");
            if(!this.formulaObj.assume_default)
            {
                var filteredArray =  arr.filter(e => e);
                var arr_length=filteredArray.length;
                for(var k=0;k<arr_length;k++){
                    filteredArray[k] = this.extractContent(filteredArray[k]);
                }
                if(filteredArray.length !== 0)
                {
                    return Math.max.apply(null,filteredArray);
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var arr_length=arr.length;
                for(var k=0;k<arr_length;k++){
                    arr[k] = this.extractContent(arr[k]);
                }
                return Math.max.apply(null,arr);
            }
        },
        
        minFunc:function(x){
            var arr = x.split("#&");
            if(!this.formulaObj.assume_default)
            {
                var filteredArray =  arr.filter(e => e);
                var arr_length=filteredArray.length;
                for(var k=0;k<arr_length;k++){
                    filteredArray[k] = this.extractContent(filteredArray[k]);
                }
                if(filteredArray.length !== 0)
                {
                    return Math.min.apply(null, filteredArray);
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var arr_length=arr.length;
                for(var k=0;k<arr_length;k++){
                    arr[k] = this.extractContent(arr[k]);
                }
                return Math.min.apply(null, arr);
            }
        },
        
        sqrtFunc:function(value){
            if(!this.formulaObj.assume_default)
            {
                if(value !== "")
                {
                    return Math.sqrt(this.evaluate(this.extractContent(value)));
                }
                else
                {
                    return "";
                }
            }
            else
            {
                return Math.sqrt(this.evaluate(this.extractContent(value)));
            }
        },
        
        tonumberFunc:function(value){
            var evalValue = this.evaluate(this.extractContent(value));
            if(evalValue){
                evalValue = Number(evalValue);
            }
			var ret = parseFloat(evalValue);
            if(isNaN(ret)){
                if(!this.formulaObj.assume_default)
                {
                    return "";
                }
                else
                {
                    return 0;
                }
            }
            var ret = parseFloat(this.evaluate(this.extractContent(value)));
            return (!isNaN(ret))?ret:"";
        },
        
        //******** Numeric Functions ********//
        
        //******** String functions ********//
        
        lenFunc:function(value){
            if(!this.formulaObj.assume_default)
            {
                if(value !== "")
                {
                    value = this.unescapedContent(this.extractContent(value));
                    return value.length;
                }
                else
                {
                    return "";
                }
            }
            else
            {
                value = this.unescapedContent(this.extractContent(value));
                return value.length;
            }
    //		if(value.match(/^'/g)){
    //			return value.length-2;
    //		}else{
                
    //		}
        },
        findFunc:function(value){
            var args = value.split("#&");
            if(args[2] === "" || args[2] <= 0)
            {
                args[2] = "1";
            }
            else if(args[2] > args[0].replace(/(^'|'$)/g, '').trim().length)
            {
                args[2] = args[0].replace(/(^'|'$)/g, '').trim().length+"1";
            }
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    var args0 = args[0].replace(/(^'|'$)/g, '').trim();
                    var args1 = args[1].replace(/(^'|'$)/g, '').trim();
                    var str = this.extractContent(args0);
                    var len = str.indexOf(this.extractContent(args1),args[2]-1);
                    if(len!==-1){
                        return len+1; //+1 , since indexof returns one less than actual position
                    }else{
                        return "";
                    }
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var args0 = args[0].trim();
                var args1 = args[1].trim();
                var str = this.extractContent(args0)
                var len = str.indexOf(this.extractContent(args1),args[2].trim()-1);
                if(len!==-1){
                    return len+1; //+1 , since indexof returns one less than actual position
                }else{
                    return 0;
                }
            }
        },
        
        caseinsensitiveequalsFunc:function(value){
            value=value.split("#&");
            if(value[0] && value[1]){
                return value[0].toLowerCase()===value[1].toLowerCase();
            }
            
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true){
                if(value[0] || value[1]){
                    return false;
                }
                return "";
            }
            else{
                if(value[0] || value[1]){
                    return false;
                }
                return true;
            }
        },
        
        ispositiveFunc:function(value){
            if(value && !isNaN(parseFloat(value)) && isFinite(value)){
                return parseFloat(value)>0;
            }
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED){
                return "";
            }
            return false;
        },
        isnegativeFunc:function(value){
            if(value && !isNaN(parseFloat(value)) && isFinite(value)){
                return parseFloat(value)<0;
            }
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED){
                return "";
            }
            return false;
        },
        
        concatFunc:function(value){
            var args = value.split("#&");
            if(!this.formulaObj.assume_default)
            {
                var valueArgs = args.filter( e => e);
                var temp = "";
                var args_length=valueArgs.length;
                for(var i = 0;i<args_length;i++){
                    var arg = valueArgs[i];
                    if(!arg=="''"){
                        arg = arg.trim();
                        if(arg=="''"){
                            arg=" ";
                        }
                    }
                    temp += this.extractContent(arg);
                }
                return temp;
            }
            else
            {
                var temp = "";
                var args_length=args.length;
                for(var i = 0;i<args_length;i++){
                    var arg = args[i];
                    if(!arg=="''"){
                        arg = arg.trim();
                        if(arg=="''"){
                            arg=" ";
                        }
                    }
                    temp += this.extractContent(arg);
                }
                return temp;
            }
        },
        
        isemptyFunc:function(value){
            value= this.evaluate(value);
            if(value && value!=="false"){
                return (typeof value === "string" && value.trim().length === 0);//No I18N
            }
            return true;
        },

        
        containsFunc:function(value){
            if(this.isAgg){
                var splitIndex = value.lastIndexOf("#&");
                var arg0=value.substring(0,splitIndex);
                var args=value.substring(splitIndex+2);
                if(arg0.startsWith("[*")){
                    return arg0.indexOf(args)!==-1;
                }
                else if(arg0.startsWith("]*")){
                    arg0=arg0.substring(2);
                    args=args.split("*");
                    var argsLen=args.length;
                    for(var i=0;i<argsLen;i++){
                        if(arg0.indexOf(args[i])!==-1){
                            return true;
                        }
                    }
                    return false;
                }
                else if(arg0.startsWith("*]")){
                    arg0=arg0.substring(2);
                    args=args.split("*");
                    var argsLen=args.length;
                    for(var i=0;i<argsLen;i++){
                        if(arg0===args[i]){
                            return true;
                        }
                    }
                    return false;
                }
            }
            var args = value.split("#&");
            var arg0 = args[0].trim();
            var arg1 = args[1].trim();
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    if(this.extractContent(arg0).indexOf(this.extractContent(arg1))!=-1){
                    return true;
                    }else{
                    return false ;
                    }
                }
                else
                {
                    return ""
                }
            }
            else
            {
                if(this.extractContent(arg0).indexOf(this.extractContent(arg1))!=-1){
                    return true;
                    }else{
                    return false ;
                    }
            }
        },
        
        startswithFunc:function(value){
            if(this.isAgg){
                var splitIndex = value.lastIndexOf("#&");
                var arg0=value.substring(0,splitIndex);
                var args=value.substring(splitIndex+2).split("*");
                var argsLen=args.length;
                for(var i=0;i<argsLen;i++){
                    if(arg0.startsWith(args[i])){
                        return true;
                    }
                }
                return false;
            }
            var args = value.split("#&");
            var arg0 = args[0].trim();
            var arg1 = args[1].trim();
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    if(this.extractContent(arg0).trim().indexOf(this.extractContent(arg1))==0){
                    return true;
                    }else{
                    return false ;
                    }
                }
                else
                {
                    return "";
                }
            }
            else
            {
                if(this.extractContent(arg0).trim().indexOf(this.extractContent(arg1))==0){
                    return true;
                    }else{
                    return false ;
                    }
            }
        },
        
        endswithFunc:function(value){
            if(this.isAgg){
                var splitIndex = value.lastIndexOf("#&");
                var arg0=value.substring(0,splitIndex);
                var args=value.substring(splitIndex+2).split("*");
                var argsLen=args.length;
                for(var i=0;i<argsLen;i++){
                    if(arg0.endsWith(args[i])){
                        return true;
                    }
                }
                return false;
            }
            var args = value.split("#&");
            var arg0 = args[0].trim();
            var arg1 = this.extractContent(args[1].trim());
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    if(arg1.length>0)
                    {
                        arg1 = arg1.replace(/[!,$,+,-,.,,*,?,^,',),(,[,\],|,\\]/g,function(){
                            return "\\"+arguments[0];
                        });
                        var regex = new RegExp(arg1+'$','g');
                        return (this.extractContent(arg0).match(regex))?true:false;
                    }
                    return this.extractContent(arg0);
                }
                else
                {
                    return "";
                }
            }
            else
            {
                if(arg1.length>0){
                    arg1 = arg1.replace(/[!,$,+,-,.,,*,?,^,',),(,[,\],|,\\]/g,function(){
                        return "\\"+arguments[0];//eslint-disable-line @zoho/zstandard/no-reserved-words
                    });
                    var regex = new RegExp(arg1+'$','g');
                    return (this.extractContent(arg0).match(regex))?true:false;
                }
                return this.extractContent(arg0);
            }
        },
        
        lowerFunc:function(value){
            return this.extractContent(value).toLocaleLowerCase()
        },
        
        upperFunc:function(value){
            return this.extractContent(value).toLocaleUpperCase();
        },
        
        trimFunc:function(value){
            return this.extractContent(value).trim();
        },
        
        substringFunc:function(value){
            var args = value.split("#&");
            var arg0 = args[0].trim();
            var subStr;
            if(!this.formulaObj.assume_default)
            {
                if(args[1] === "" && (args[2] !== "" && args[2]>=1 && args[2]<=this.unescapedContent(this.extractContent(arg0)).length))
                {
                    subStr = this.unescapedContent(this.extractContent(arg0)).substring(0,parseInt(this.evaluateArithmetic(args[2])));
                }
                else if(args[2] === "" && (args[1] !== "" && args[1]>=1 && args[1]<=this.unescapedContent(this.extractContent(arg0)).length))
                {
                    subStr = this.unescapedContent(this.extractContent(arg0)).substring(parseInt(this.evaluateArithmetic(args[1]))-1);
                }
                else if(args[1] === "" && args[2] === "")
                {
                    subStr = this.unescapedContent(this.extractContent(arg0));
                }
                else if(args[1]<1 || args[2]<1 || args[1]>this.unescapedContent(this.extractContent(arg0)).length ||  args[2]>this.unescapedContent(this.extractContent(arg0)).length)
                {
                    subStr="";
                }
                else if(args[1]< args[2])
                {
                    subStr = this.unescapedContent(this.extractContent(arg0)).substring(parseInt(this.evaluateArithmetic(args[1]))-1,parseInt(this.evaluateArithmetic(args[2])));
                }
                else
                {
                    subStr="";
                }
            }
            else
            {
                subStr = this.unescapedContent(this.extractContent(arg0)).substring(parseInt(this.evaluateArithmetic(args[1]))-1,parseInt(this.evaluateArithmetic(args[2])));
            }
            return this.escapedContent(subStr);
        },
        
        replaceFunc:function(value){
            var args = value.split("#&");
            if(!this.formulaObj.assume_default)
            {
                if(args[0] !== "")
                {
                    var arg0 = args[0].trim();var arg1 = args[1].trim();var arg2 = args[2].trim();
                    arg1 = this.extractContent(arg1);
                    if(arg1.length>0)
                    {
                        arg1 = arg1.replace(/[!,$,+,-,.,,*,?,^,',),(,[,\],|,\\]/g,function(){
                        return "\\"+arguments[0];
                        });
                        var regex = new RegExp(arg1,'g');
                        return this.extractContent(arg0).replace(regex,this.extractContent(arg2));
                    }
                    return this.extractContent(arg0);
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var arg0 = args[0].trim();var arg1 = args[1].trim();var arg2 = args[2].trim();
                arg1 = this.extractContent(arg1);
                if(arg1.length>0)
                {
                    arg1 = arg1.replace(/[!,$,+,-,.,,*,?,^,',),(,[,\],|,\\]/g,function(){
                    return "\\"+arguments[0];//eslint-disable-line @zoho/zstandard/no-reserved-words
                    });
                    var regex = new RegExp(arg1,'g');
                    return this.extractContent(arg0).replace(regex,this.extractContent(arg2));
                }
                return this.extractContent(arg0);
            }
        },
        
        tostringFunc:function(value){
            return this.evaluate(this.extractContent(value)).toString();	
        },

        //******** String functions ********//
        
        //******** Datetime functions ********//
        
        newdateFunc:function(value){
            var args = value.split("#&");
            var extractedArg = [];
            extractedArg[0] = this.extractContent(args[0]);
            extractedArg[1] = this.extractContent(args[1]);
            extractedArg[2] = this.extractContent(args[2]);
            extractedArg[3] = this.extractContent(args[3]);
            extractedArg[4] = this.extractContent(args[4]);
            var min = this.evaluate(extractedArg[4]) >=0 && this.evaluate(extractedArg[4]) <= 59 ? this.evaluate(extractedArg[4]) : args[4] = "" ;
            var hour = this.evaluate(extractedArg[3]) >= 0 && this.evaluate(extractedArg[3]) <= 12 ? this.evaluate(extractedArg[3]) : args[3] = "";
            var day = this.evaluate(extractedArg[2]) >= 1 && this.evaluate(extractedArg[2]) <= 31 ? this.evaluate(extractedArg[2]) : args[2] = "";
            var month = this.evaluate(extractedArg[1]) > 0 &&  this.evaluate(extractedArg[1]) <= 12 ? this.evaluate(extractedArg[1]) : args[1] = "";
            var ampm = this.extractContent(args[5]).toUpperCase() === 'AM' || this.extractContent(args[5]).toUpperCase() === 'PM' ? this.extractContent(args[5]).toUpperCase() : args[5] = "" ;
            var year = this.evaluate(extractedArg[0]) >= 1900 && this.evaluate(extractedArg[0])  <= 9999 ? this.evaluate(extractedArg[0])  : args[0] = "" ;
            var monthV,yearV;
            if (month > 12) {
                yearV = month/12;
                monthV = month%12;
                if(monthV == 0) {
                    monthV = 12;
                    yearV--;
                }
                year = Number(year) + yearV;
                month = monthV;
            }
            if((year%4) == 0)
            {
                if(month == 2 && ( !(day >= 1 && day <= 29) ))
                {
                    args[0] = "";
                }
            }
            else
            {
                if(month == 2 && ( !(day >= 1 && day <= 28) ))
                {	
                    args[0] = "";
                }	
            }
            if(month >= 1 && month <= 7)// Odd Max --> 31, Even Max ---> 30.
            {
                if((month % 2)!= 0)
                {
                    if( !(day >= 1 && day <= 31))
                    {
                        args[0] = "";
                    }	
                }
                else
                {
                    if( !(day >= 1 && day <= 30))
                    {
                        args[0] = "";
                    }
                }
            }
            else if(month >= 8 && month <= 12) // Even Max ----> 31, Odd Max ---> 30 ...
            {
                if((month%2) == 0)
                {
                    if( !(day >= 1 && day <= 31))
                    {
                        args[0] = "";
                    }
                }
                else
                {
                    if( !(day >= 1 && day <= 30))
                    {
                        args[0] = "";
                    }
                }
            }
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    if(ampm=="PM"&&parseFloat(hour)<12){
                    hour = parseFloat(hour)+12;
                    }
                    var date = new Date(year,month-1,day,hour,min);//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    //var newDate = getDateTimeInUserFormatForFormula(getDateTimeInUserTimeZone(date),true)
                    var newDate = this.getDateTimeInUserFormatForFormula(date,true);
                    return newDate.replace(/\(.*\).*/,""); // To remove the paranthesis returned by the date object
                }
                else
                {
                    return "";
                }
            }
            else
            {
                if(ampm=="PM"&&parseFloat(hour)<12){
                hour = parseFloat(hour)+12;
                }
                var date = new Date(year,month-1,day,hour,min);//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                //var newDate = getDateTimeInUserFormatForFormula(getDateTimeInUserTimeZone(date),true)
                var newDate = this.getDateTimeInUserFormatForFormula(date,true);
                return newDate.replace(/\(.*\).*/,""); // To remove the paranthesis returned by the date object
            }
        },
        
        datepartFunc:function(date){
            if(!date){
                return date;
            }
            return "'"+this.dateToString(this.convertUsrtoDefaultDatePattern(date),this.userDetails.DATE_PATTERN.toUpperCase())+"'";//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            // var date = this.convertUsrtoDefaultDatePattern(date);
            // return "'"+this.getDateInUserDatePatternForFormula(date)+"'"; //enclosed inside single quotes inorder to prevent the returned value to be treated as a string
        },
        
        timepartFunc:function(date){
            if(!this.formulaObj.assume_default)
            {
                if(date !== "")
                {
                    var date = this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date));
                    return this.getTimeInUserFormatForFormula(date);
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var date = this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date));
                return this.getTimeInUserFormatForFormula(date);
            }
        },
        
        timestampFunc:function(value){
            var date = this.convertUsrtoDefaultDatePattern(value);
            if(date ){
                date = date.getTime();
                if(date){
                    return date/1000;
                }
            }
            date = isNaN(date)?"":date;
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true){
                return date?date:"";
            }
            return date?date:0;
        },
        
        fromtimestampFunc:function(value){
            value=this.evaluate(this.extractContent(value));
            if(value && !isNaN(value) && value<4133980800 && value>-1577923200){
                value=value*1000;
                var date=new Date(+value).toString(); //eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                if(date && date.toString()!=='Invalid Date'){
                    date=this.getDateTimeInUserFormatForFormula(this.getDateTimeInUserTimeZone(date),true);
                    return date.replace(/\(.*\).*/,"");
                }
            }
            return "";
        },
        
//			testFunc:function(value){
//				var splitIndex = value.indexOf("#&");
//				var val = this.extractContent(value.substring(0,splitIndex));
//				var regx = this.extractContent(value.substring(splitIndex+2));
//				if(val && regx){
//					return new RegExp(regx).test(val);
//				}
//				return "";
//			},
        
        adddateFunc:function(x){
            var args = x.split("#&");
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    var date = this.extractContent(args[0].trim());var count=this.extractContent(args[1].trim());var type=this.extractContent(args[2].trim()).toUpperCase();
                    date = new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date)));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    switch(type)
                    {
                        case "YEAR":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setYear(date.getFullYear()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            
                        case "MONTH":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setMonth(date.getMonth()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                
                        case "DAY":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setDate(date.getDate()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                
                        case "HOUR":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setHours(date.getHours()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            
                        case "MINUTE":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setMinutes(date.getMinutes()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    }
                    return "";
                }
                else
                {
                    return "";
                }
            }
            else
            {
                var date = this.extractContent(args[0].trim());var count=this.extractContent(args[1].trim());var type=this.extractContent(args[2].trim()).toUpperCase();
                date = new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date)));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                switch(type)
                {
                    case "YEAR":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setYear(date.getFullYear()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
    
                    case "MONTH":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setMonth(date.getMonth()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
        
                    case "DAY":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setDate(date.getDate()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
        
                    case "HOUR":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setHours(date.getHours()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
    
                    case "MINUTE":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setMinutes(date.getMinutes()+parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                }
                return "";
            }
        },
        subdateFunc:function(x){
            var args = x.split("#&");
            if(!this.formulaObj.assume_default)
            {
                if(!args.includes(""))
                {
                    var date = this.extractContent(args[0].trim());var count=this.extractContent(args[1].trim());var type=this.extractContent(args[2].trim().toUpperCase());
                    date = new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date)));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    switch(type)
                    {
                        case "YEAR":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setYear(date.getFullYear()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                        case "MONTH":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setMonth(date.getMonth()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                        case "DAY":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setDate(date.getDate()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                        case "HOUR":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setHours(date.getHours()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                        case "MINUTE":
                            // To remove the paranthesis returned by the date object;
                            return (new Date(date.setMinutes(date.getMinutes()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    }
                    return "";
                }
                else
                {	
                    return "";
                }
            }
            else
            {
                var date = this.extractContent(args[0].trim());var count=this.extractContent(args[1].trim());var type=this.extractContent(args[2].trim()).toUpperCase();
                date = new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date)));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                switch(type)
                {
                    case "YEAR":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setYear(date.getFullYear()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    case "MONTH":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setMonth(date.getMonth()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    case "DAY":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setDate(date.getDate()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    case "HOUR":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setHours(date.getHours()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                    case "MINUTE":
                        // To remove the paranthesis returned by the date object;
                        return (new Date(date.setMinutes(date.getMinutes()-parseInt(count)))).toString().replace(/\(.*\).*/,"");//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                }
                return "";
            }
        },
        
        nowFunc:function(){
            var date = new Date();
            var newDate = this.getDateTimeInUserFormatForFormula(this.getDateTimeInUserTimeZone(date),true)
            return newDate.replace(/\(.*\).*/,""); // To remove the paranthesis returned by the date object;
        },
        datecompFunc:function(value){
            var args = value.split("#&");
            if(this.isAgg && !(args[0] && args[1])){
                return 1;
            }
            var fd =  new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(args[0].trim()))); //eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            var sd = new Date(this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(args[1].trim())));  //eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
            if(!isNaN(fd-sd) && (args[0].indexOf(":")===-1 && args[1].indexOf(":")===-1)){
                var diffinMinutes =fd - sd;
                var diffDays = Math.ceil(diffinMinutes / (1000 * 60 * 60 * 24));
                return (diffDays*1440);
            }
            else if(!isNaN(fd-sd)){
                return (fd-sd)/60000;
            }else{
                if(this.isAgg){
                    return 1;
                }
                if(!this.formulaObj.assume_default)
                {
                    return "";
                }
                else{
                    return 0;
                }
            }
        },
        
        datebetweenFunc:function(value){
            value=value.split("#&");
            var date1=this.extractContent(value[0]),date2=this.extractContent(value[1]),unit=this.extractContent(value[2]);
            if(date1 && date2 && unit){
                date1=date1.startsWith("${")?"":new Date(this.convertUsrtoDefaultDatePattern(date1));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                date2=date2.startsWith("${")?"":new Date(this.convertUsrtoDefaultDatePattern(date2));//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                if(date1 && date2 && date1.toString() !== "Invalid Date" && date2.toString() !== "Invalid Date"){
                    unit=unit.toLowerCase();
                    var isNeg=date1>date2?-1:1;
                    var tempDate=date1;
                    if(isNeg===-1){
                        date1=date2;
                        date2=tempDate;
                    }
                    switch(unit){
                        case "years":
                            return Math.floor(Math.abs((((date2.getFullYear()*12+date2.getMonth())*32+date2.getDate())-((date1.getFullYear()*12+date1.getMonth())*32+date1.getDate()))/32)/12)*isNeg;
                        case "months":
                            tempDate = new Date(date1);//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                            tempDate.setDate(tempDate.getDate()+1);
                            if(tempDate.getMonth()!==date1.getMonth()){
                                date2.setDate(date2.getDate()+1);
                            }
                            return Math.floor(Math.abs((((date2.getFullYear()*12+date2.getMonth()-1)*32+date2.getDate())-((date1.getFullYear()*12+date1.getMonth()-1)*32+date1.getDate()))/32))*isNeg;
                        case "days":
                            if(date1.toDateString() === date2.toDateString()){
                                return 0;
                            }
                            var hrs1=(date1.getHours()*3600000)+(date1.getMinutes()*60000),hrs2=(date2.getHours()*3600000)+(date2.getMinutes()*60000);
                            if(hrs1>0 || hrs2>0){
                                var date3=date1;
                                date3=new Date((date3.getMonth()+1)+"/"+date3.getDate()+"/"+date3.getFullYear());//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                                date3.setDate(date3.getDate()+1);
                                var date4=date2;
                                date4=new Date((date4.getMonth()+1)+"/"+date4.getDate()+"/"+date4.getFullYear());//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                                //date4.setDate(date4.getDate()-1);
                                var days=Math.abs(Math.round(((date4-date3)/1000) / (3600 * 24)));
                                var hrs=Math.floor(Math.abs((date3-date1)/3600000))+Math.floor(Math.abs((date2-date4)/3600000));
                                days+=Math.floor(hrs/24);
                                return days*isNeg;
                            }
                            return Math.abs(Math.round(((date2-date1)/1000) / (3600 * 24)))*isNeg;
                        case "hours":
                            return Math.floor(Math.abs((date2-date1)/3600000))*isNeg;
                        case "minutes":
                            return Math.floor(Math.abs((date2-date1)/60000))*isNeg;
//							case "seconds":
//							 	return Math.floor(Math.abs((date2-date1)/1000))*isNeg;
//							case "milliseconds":
//								return Math.floor(Math.abs(date2-date1))*isNeg;
                        case "weeks":
                            var oneweek=1000*60*60*24*7;
                            return Math.floor(Math.abs((date2-date1)/oneweek))*isNeg;	
                    }
                }
            }
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true){
                return "";
            }
            return 0;
        },
        
        dayofmonthFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(date);
            var ret = (new Date(date)).getDate();
            return isNaN(ret)?"":ret;
        },
        
        dayofweekFunc:function(value){
            if(value){
                var newDate = this.convertUsrtoDefaultDatePattern(value);
                if(newDate.toString()!=='Invalid Date'){
                    return newDate.toLocaleDateString(this.userDetails.LOCALE.replaceAll("_","-"), { weekday: 'long' }).toLowerCase();
                }
            }
            return "";
        },
        
        dayofyearFunc:function(value){
            if(value){
                var newDate =this.convertUsrtoDefaultDatePattern(value);
                if(newDate.toString()!=='Invalid Date'){
                    return Math.floor((newDate - new Date(newDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);//eslint-disable-line @zoho/zohocrm/no-deprecated-fnc
                }
            }
            if(this.userDetails.FORMULA_NULL_HANDLING_ENABLED === true){
                return "";
            }
            return 0;
        },
        
        hourFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date));
            var ret = (new Date(date)).getHours();
            return isNaN(ret)?"":ret;
        },
        
        minuteFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(this.replaceDefaultMeridianInDateTime(date));
            var ret = (new Date(date)).getMinutes();
            return isNaN(ret)?"":ret;
        },
        
        monthFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(date);
            var ret = (new Date(date)).getMonth()+1;
            return isNaN(ret)?"":ret;
        },
        
        yearFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(date);
            var ret = (new Date(date)).getFullYear();
            return isNaN(ret)?"":ret;
        },
        
        weekdayFunc:function(date){
            date = this.convertUsrtoDefaultDatePattern(date);
            var ret = (new Date(date)).getDay()+1;
            return isNaN(ret)?"":ret;
        }
        //******** Datetime functions ********//
        
},

    //******* Date time utils ********//
   getMeridiem:function(dateObj,upCase){
        var meridiem = (upCase)?"AM":"am"; //No I18N
        var hr = dateObj.getHours();
        if(hr >= 12){
            meridiem =(upCase)?"PM":"pm"; }//No I18N
        return meridiem;
    },
    
    convertTimeTo12HoursFormat:function(hrs,meridiem){
        meridiem = meridiem.toLowerCase();
        if(meridiem == "pm"){
                return (hrs <= 12) ? hrs:hrs-12;
        }
        else if(meridiem == "am"){      
                return (hrs == 0)? 12 : hrs ;
        }       
    },
    
    convertTo12HoursFormatTimeObj:function(dateObj,upCase) {
        if (!dateObj) {
            dateObj = new Date();
        }
            var hr = dateObj.getHours();
        var amPm = this.getMeridiem(dateObj,upCase);
        var min = dateObj.getMinutes();
        hr = this.convertTimeTo12HoursFormat( hr,this.getMeridiem(dateObj) );    
        if(hr < 10) {
            hr = "0" + hr;
        }
        if (min < 10){
            min = "0" + min;
        }
        return {"hrs":hr,"mins": min,"meridiem":amPm};  //No I18N
    },
    //newDate - String in 'yyyy-mm-dd' pattern
    convertUsrtoDefaultDatePattern:function(newDate, checkLocale){
        if(!newDate)
        {
            return '';
        }			
        try{
            var tDate=newDate;
            newDate=newDate.replace(/\\,/g,",");
            newDate = new Date(newDate);
            if(String(newDate) === "Invalid Date"){
                newDate = this.parserDate(this.extractContent(tDate),this.userDetails.DATE_PATTERN.toUpperCase());
            }
        }catch(e){
            murphy.error(e);
        }			
         
        return newDate;
    },
    
    
    getDateInUserDatePatternForFormula:function(newDate)
    {	
        //Since this loads in worker thread, date is not formatted here as it requires lyte moment. Hence skipping it. 
        //formatting will be done in crmFormulaInit onMessage.
            return newDate;			
    },
    
/*		getDateInUsrViewFormat:function(newDate){
        newDate=this.convertUsrtoDefaultDatePattern(newDate);
//			var usrLocale=this.userDetails.COUNTRY_LOCALE;
//			var format="M d, yy"; //NO I18N
//			if(usrLocale == "en_GB"){
//			 format="d M, yy" //NO I18N
//			}
        return newDate;
    },*/
    
    getTimeInUserFormatForFormula:function (dateObj, upCase){
        if ( this.userDetails.TIME_FORMAT == "HH:mm" && dateObj instanceof Date ) {  //No I18n
            var hr = (dateObj.getHours()<10)?("0"+dateObj.getHours()):dateObj.getHours();//No I18n
            var min = (dateObj.getMinutes()<10)?("0"+dateObj.getMinutes()):dateObj.getMinutes();//No I18n
            return hr+":"+ min;//No I18n
        }else{
            var timeObj = this.convertTo12HoursFormatTimeObj(dateObj,upCase);
            return timeObj.hrs+":"+timeObj.mins+" "+this.userDetails[timeObj.meridiem.toLowerCase()];//No I18n
        }
    },
    
   getTimezoneOffset:function(timezone){
        var userTimezone = timezone || this.userDetails.TIME_ZONE;
        var toNegative = false; 
        if( userTimezone.indexOf("+") > -1 ){ 
            toNegative = true;
        }
        userTimezone = userTimezone.replace("+" , "").replace("-", "");
        var offsetHours = parseInt( userTimezone );
        var offsetMins = offsetHours * 60 ;
        var userOffsetMins = userTimezone.split(".")[1];
        userOffsetMins = parseInt( userOffsetMins );
        var totalMins = offsetMins + userOffsetMins ;
        if( toNegative ){  totalMins *= -1; }
        return totalMins;
    },
    
      getDateTimeInUserTimeZone:function(dateObj){
        var currDate = new Date(dateObj);
        var clientOffset = currDate.getTimezoneOffset();
        var userOffset = this.getTimezoneOffset();
        if( userOffset !== clientOffset ){
            var diff = clientOffset - userOffset;
            currDate.setMinutes( currDate.getMinutes() + diff );
        }
        return currDate;
    },
    
    getDateTimeInUserFormatForFormula:function (dateObj,upCase, isView) {  
        if(dateObj==""){
            return;
        }
        var	dtStr = this.getDateInUserDatePatternForFormula(dateObj);
        dtStr += " " + this.getTimeInUserFormatForFormula(dateObj, upCase);
        return dtStr;
    },
    //******* Datetime utils ********//
    evaluatePriceBookDiscount: function(rowId,priceBookCalObj){
        var pricingRange = priceBookCalObj.pricingRange;
        var pricingModel = priceBookCalObj.pricingModel;
        var listPrice = priceBookCalObj.listPrice;
        var quantity = priceBookCalObj.quantity;
        var expression = priceBookCalObj.expression;
        var subformDisplayLabel = priceBookCalObj.subformDisplayLabel;
        var leastFromRange = 1.7976931348623157e+308;
        var prevToRange = 0;
        var prevFlatDiscountPrice = 0;
        var prevDiffDiscountPrice = 0;
        var lastDiscount = 0;
        var tempPrice=0;
        var tempQty = quantity;
        var amount = 0;
        var size = pricingRange.length;
        pricingRange.forEach(function(pricing,index){
            var currPos = index+1 ;
            var fromRange = Number(pricing.From);
            var toRange = Number(pricing.To);
            var discount = Number(pricing.Discount);
            var diff = ((toRange - fromRange) + 1);
            amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,quantity));
            var discountPrice =  amount * (discount/100);
            if(fromRange < leastFromRange)
            {
                leastFromRange = fromRange;
                tempQty = tempQty - (fromRange - 1);
            }
            if(pricingModel === 'Flat'){//NO I18N
                if(quantity >= fromRange && quantity <= toRange){
                    tempPrice = discountPrice;
                }else if(quantity > prevToRange && quantity < fromRange){
                    tempPrice = prevFlatDiscountPrice;
                }else if(size == currPos && quantity > toRange){
                    tempPrice = discountPrice;
                }
            }else if(pricingModel === 'Differential'){//NO I18N
                if(quantity >= fromRange && quantity <= toRange){
                    var btwnDiff = fromRange-prevToRange-1;
                    if(btwnDiff > 0){
                        amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,btwnDiff));
                        tempPrice = prevDiffDiscountPrice + (amount * (lastDiscount/100));
                        diff = quantity - fromRange + 1;
                        amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,diff));
                        tempPrice = tempPrice + (listPrice * diff * (discount/100));
                    }else{
                        amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,tempQty));
                        tempPrice = prevDiffDiscountPrice + (amount * (discount/100));
                    }
                    lastDiscount = discount;
                }else if(quantity > prevToRange && quantity < fromRange){
                    amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,tempQty));
                    tempPrice = prevDiffDiscountPrice + (amount * (lastDiscount/100));
                }else if(quantity > toRange){
                    tempQty = tempQty - diff;				
                    amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,diff));
                    tempPrice = prevDiffDiscountPrice + (amount * (discount/100));
                    if(size == currPos){
                        var btwnDiff = fromRange-prevToRange-1;
                        if(btwnDiff > 0){
                            amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,btwnDiff));
                            tempPrice = tempPrice + (amount * (lastDiscount/100));
                            diff = tempQty - btwnDiff;
                            amount = this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,diff));
                            tempPrice = tempPrice + (amount * (discount/100));
                        }else{
                            amount =this.evaluateFormula(this.replaceFldLabelToValInAmountFormulaExpr(expression,rowId,subformDisplayLabel,tempQty));
                            tempPrice = tempPrice + (amount * (discount/100));
                        }
                    }
                    lastDiscount = discount;
                }
            }
            prevToRange = toRange;
            prevFlatDiscountPrice = discountPrice;
            prevDiffDiscountPrice = tempPrice;
        });
        return tempPrice;
    },
    replaceFldLabelToValInAmountFormulaExpr : function(formula,suffixId,subformDisplayLabel,qty){
        if(qty){
            formula = formula.replace('${' + subformDisplayLabel + '.Quantity' + '}',"" + qty + "");
        }
        return formula;
    },
    replaceDefaultMeridianInDateTime : function(obj) {
        if (this.userDetails.am != "AM") {
            obj = obj.replaceAll(this.userDetails.am, "AM");
            obj = obj.replaceAll(this.userDetails.pm, "PM");
        }
        return obj;
    }
    });

