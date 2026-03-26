Lyte.Mixin.register("crux-criteria-util", {//No I18n
	validatePattern : function(str,rowcnt,inline){
		var error;
		str = str.replace(/#/g,"~");
		var o = str.match(/\(/gi);
		if(o)
		{
			var ol = o.length;
		}
		var c = str.match(/\)/gi);
		if(c)
		{
			var cl = c.length;
		}
		if(ol != cl)
		{
			error = _cruxUtils.getI18n("criteria.error.alert.brackets.count.mismatch")
			inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			this.setData('shownAlert',true);//No I18N
			return false;
		}
		var brackStr = str.replace(/(and|or)/g,"#").split(' ').join('').replace(/\n/g,"");
		if((brackStr.indexOf("(#") != -1)||(brackStr.indexOf("#)") != -1))
		{
			error = _cruxUtils.getI18n("criteria.error.alert.brackets.invalid")
			inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			this.setData('shownAlert',true);//No I18N
			return false;
		}
		if(brackStr.indexOf("()") != -1)
		{
			error = _cruxUtils.getI18n("criteria.error.alert.brackets.invalid")
			inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			this.setData('shownAlert',true);//No I18N
			return false;
		}
		var aaa = brackStr.replace(/[()]/g,"#");
		var noo = str.match(/[0-9]+/g);
		if(noo != null)
		{
			var nooLength = noo.length
			for(var i = 0; i < nooLength; i++)
			{
				if(noo[i] != i+1)
				{
					error = _cruxUtils.getI18n("crm.criteria.number.notmatch.check",noo[i]);
					inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
					this.setData('shownAlert',true);//No I18N
					return false;
				}
			}
		}
		var cstr = aaa.replace(/[0-9]+/g,"#").replace(/#/g,"");
		if(cstr && cstr.length >=1)//any extra param other than and, or ,brackets
		{
			error = _cruxUtils.getI18n("criteria.error.alert.other.params")
			inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			this.setData('shownAlert',true);//No I18N
			return false;
		}
		var n = str.match(/(and|or)/gi) ? str.match(/(and|or)/gi) : []
		if(n)
		{
			if((rowcnt-1) !== n.length)
			{
				error = _cruxUtils.getI18n("criteria.error.alert.andor.rowcount.mismatch")
				inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
				this.setData('shownAlert',true);//No I18N
				return false;
			}
		}
		// TODO - This will have problem while there are more than 9 criteria rows.
		var nc = aaa.replace(/[0-9]+/g,"$").replace(/#/g,"");
		if(rowcnt != nc.length)
		{
			error = _cruxUtils.getI18n("criteria.error.alert.critnum.rowcount.mismatch")
			inline ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			this.setData('shownAlert',true);//No I18N
			return false;
		}
		str = this.addSpaceBetweenParanthesis(str);
		str = str.replace(/\n/g,"");
		return str;
	},
	addSpaceBetweenParanthesis : function(str){
		var toRet = "";
		str=str.replace(/\s/g,"");
		var strLength=str.length;
		for(var i = 0; i < strLength; i++)
		{
			var ch = str.charAt(i);
			if(ch == "(" || ch == "d" || ch == "r" || ch == "D" || ch == "R")
			{
				toRet = toRet + ch + " ";
			}
			else if(ch == ")" || ch == "a" || ch == "o" || ch == "O" || ch == "A")
			{
				toRet = toRet + " " + ch;
			}
			else
			{
				toRet = toRet + ch;
			}
		}
		return toRet;
	},
	patternChanging : function(func,index,pattern,criteria){
		if(func=='add'){
			criteria='('+criteria+pattern[index-1]+index+')';
		}else if(func == 'remove'){//No I18N
			var t=0;
			var criteria=' '+criteria+' ';
			var replacei=index+' ';
			criteria=criteria.replace(/(and|or)/g, "#");
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t === (index!=1?(index-1):index)) ? "" : match;
			});
			var re = new RegExp(replacei,"g");
			criteria=criteria.replace(re, "");

			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});

			var t=1;
			criteria = criteria.replace(/[0-9]/g, "#");
			criteria = criteria.replace(/##/g,'#');
			criteria = criteria.replace(/#/g, function (match) {
				return (t <= criteria.match(/#/g).length) ? t++ : match;
			});
		}else if(func =='mod'){//No I18N
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}else if(func == 'specified'){ //no i18n
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}
		criteria=criteria.replace(/ /g,"");
		while(criteria.match(/\(\)/g,"")){
		    criteria=criteria.replace(/\(\)/g,"")
		}
		criteria=this.addSpaceBetweenParanthesis(criteria);
		return criteria;
	},
	changeToDeveloper : function(pattern){
		// if(pattern.match(/(\S*[\u0590-\u05FF]+\S*)/g) && pattern.match(/(\S*[\u0590-\u05FF]+\S*)/g).length){
		// 	return pattern.replace(/(\S*[\u0590-\u05FF]+\S*)/g,(str)=>{
		// 	    if(str == _cruxUtils.getI18n('and')){
		// 	        return 'and' //no i18n
		// 	    }else if(str == _cruxUtils.getI18n('or')){ //no i18n
		// 	        return 'or' //no i18n
		// 	    }
		// 	})
		// }else{
		// 	var and = new RegExp(`\\b${_cruxUtils.getI18n('and')}\\b`, 'g');
		// 	var or = new RegExp(`\\b${_cruxUtils.getI18n('or')}\\b`, 'g');
		// 	return pattern.replace(and,'and').replace(or,'or');
		// }
		return pattern.replace(new RegExp(/\S*([A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])/ug),function(str){
			    if(str == _cruxUtils.getI18n('and')){
			        return 'and' //no i18n
			    }else if(str == _cruxUtils.getI18n('or')){ //no i18n
			        return 'or' //no i18n
			    }else{
			    	return str
			    }
			}.bind(this));
		
	},
	changeToInternational : function(s){
		s = this.addSpaceBetweenParanthesis(s);
		pattern=s.replace(/and|or/g,function(match){
			if(match == 'and'){
			return _cruxUtils.getI18n("and") //No I18N
			}else if(match == 'or'){ //No I18N
			return _cruxUtils.getI18n("or") //No I18N
			}
		});
		return pattern
	},
	getModuleFromCriteria : function(criteria){
	    var s=criteria.field.api_name.split('.');
	    var n = s.shift();
	    criteria.field.api_name = s.join('.');
	    // var ss=moduleRecordMapping ? moduleRecordMapping[Object.keys(moduleRecordMapping).filter(function(item){return moduleRecordMapping[item].api_name == n})[0]].plural_label : n;
	    var _this = this;
	    var moduleCriteria = {};
		moduleCriteria.api_name = 'module'; //no i18n
		moduleCriteria.comparator = 'equal'; //no i18n
		moduleCriteria.value = n == -1 ? {api_name : '-1', display_label : _cruxUtils.getI18n('None')} : this.data.moduleMapping.filter(function(item){return item[_this.data.prefixArray.filter(function(item){return item.apiValue == 'module'})[0].systemValue] == n})[0]; //no i18n
		// moduleCriteria.value[this.data.prefixArray.filter(function(item){return item.apiValue == 'module'})[0].displayValue] = ss;
		return [].concat(moduleCriteria).concat(criteria);
	},
	getCriteriaArray : function(node,selectedArray){
		if(node.group_operator){
			if(node.group[0].field && node.group[0].field.api_name == 'Tag' && node.group[1].field && node.group[1].field.api_name == 'Activity_Type'){
				return [].concat(node.group[0])
			}
			selectedArray.concat(this.getCriteriaArray(node.group[0],selectedArray))
			selectedArray.concat(this.getCriteriaArray(node.group[1],selectedArray))
			return selectedArray;
		}else{
			selectedArray.push(node);
			return selectedArray;
		}
	},
	criteriaApiNameCheck : function(check,api_name,field){
		if(api_name == 'role' && field && field.ui_type){
			if(field.ui_type == '16'){
				return true;
			}
			return false;
		}else{
			var ret = false;
			if(check && api_name){
				var count = 0;
				check.split('->').forEach(function(item){
				    item.split('.').forEach(function(name){
				        if(name == api_name){
				            count++;
				            return;
				        }
				    });
				    if(count){
				    	ret = true;
				    	return ret;
				    }
				});
			}
			return ret;
		}
	},
	inorder :function(node,s){
		if(node !== null)
	    {
	    	if(node.left!=null){
	            s=s+'(';
	        }
	        s=this.inorder(node.left,s);
	        s=s+node.value;
	        s=this.inorder(node.right,s);
	        if(node.right != null){
	            s=s+')';
	        }
	    }
	    return s;
	},
	getModuleFromApiName : function(api_name,moduleMapping){
		if(this.moduleApiMapping[api_name]){
			return this.moduleApiMapping[api_name];
		}else{
			var module = Object.keys(moduleMapping).filter(function(item){return moduleMapping[item].api_name == api_name});
			try{
				this.moduleApiMapping[api_name] = module[0];
			}catch(e){
				this.moduleApiMapping[api_name] = undefined;
			}
			return this.moduleApiMapping[api_name];
		}
	},
	getModuleFromId : function(id,moduleMapping){
		if(this.moduleIdMapping[id]){
			return this.moduleIdMapping[id];
		}else{
			var module = Object.keys(moduleMapping).filter(function(item){return moduleMapping[item].id == id});
			try{
				this.moduleIdMapping[id] = module[0];
			}catch(e){
				this.moduleIdMapping[id] = undefined;
			}
			return this.moduleIdMapping[id];
		}
	},
	formCriteriaTree : function(a,criteriaArray){
		var regExp = /\(([^(^)]+)\)/g;
		a = a.replace(/ /g,'');
		a = a.replace(/and/g,'+').replace(/or/g,'-');
		var secondaryData = {},secodndaryIterator=1,output;
		nodeConversionFn = function(b){
		    var op = [],node = []
		    for (var i=0;i<b.length;i++){
		        if(b[i] == '+' || b[i] == '-'){
		            op.push(b[i])
		        }else{
		            var num = b[i]
		            if(b[i+1] && b[i+1] != '+' && b[i+1] != '-'){
		                num = num+""+b[i+1]
		                i++
		                if(b[i+1] && b[i+1] != '+' && b[i+1] != '-'){
		                	num = num+""+b[i+1]
		                	i++
		                }
		            }
		            if(num[0] == 'D'){
		                if(secondaryData[num]){
		                     node.push(secondaryData[num]);
		                }
		            }else{
		                num = parseInt(num)
		                if(!criteriaArray){
		                    node.push(num)
		                }else if(criteriaArray[num-1]){
		                    node.push(criteriaArray[num-1]);
		                }
		            }
		            
		        }
		        if(node.length >= 2 && op.length > 0){
		            var group=[]
		            group.push(node.pop());
		            group.push(node.pop());
		            group.reverse();
		            var root = op.pop();
		            if(root == '+'){
		                root="and" //No I18N
		            }else if(root== '-'){
		                root = 'or' //No I18N
		            }
		            node.push({group_operator : root , group : group});
		        }   
		    }
		    return node[0];
		}
		while(a.indexOf('(') > -1){
		    a = a.replaceAll(regExp,function(a,b,c){ //eslint-disable-line no-loop-func
		        var str = 'D'+secodndaryIterator
		        secondaryData[str] = nodeConversionFn(b);
		        secodndaryIterator++
		        return str
		    })
		}
		output = nodeConversionFn(a);
		return output;
	},
	convertGroupToString : function(criteria){
		var selfVal = this;
		function BinaryTree(val,criteria){
			if(val.group_operator){
					this.left= new BinaryTree(val.group[0],criteria);
					this.right=new BinaryTree(val.group[1],criteria);
					this.value=val.group_operator.trim().toLowerCase();
			}else{
				criteria.push(parseInt(val));
				this.value=parseInt(val);
				this.left = null
				this.right = null
			}
			this.criteria = criteria;
		}
		var tree = new BinaryTree(criteria,[]);
		return this.addSpaceBetweenParanthesis(this.inorder(tree,''));
	},
	removeCriteriaFromTree : function(tree,fromCriteria){
		if(tree.group_operator){
			if(tree.group[0].group_operator && tree.group[0] != fromCriteria){
				Lyte.arrayUtils(tree.group,'replaceAt',0 , this.removeCriteriaFromTree(tree.group[0],fromCriteria));
			}else if(tree.group[0] == fromCriteria){
				return tree.group[1];
			}

			if(tree.group[1].group_operator && tree.group[1] != fromCriteria){
				Lyte.arrayUtils(tree.group,'replaceAt',1,this.removeCriteriaFromTree(tree.group[1],fromCriteria));
			}else if(tree.group[1] == fromCriteria){
				return tree.group[0];
			}
		}
		return tree;
	},
	removeUnwantedFields : function(fields,hideId){
		if(!fields){
			return [];
		}
		var rFields = []
		fields.forEach(function(item){
			if(item.cxPropType == 'group'){
				item.cxPropFields = this.removeUnwantedFields(item.cxPropFields,hideId)
				if(item.cxPropFields.length){
					rFields.push(item)
				}
			}else{
				if(item.id != hideId && !item.unused && item.type != 'unused' && item.visible){
					rFields.push(item);
				}
			}
		}.bind(this));
		return rFields;
	},
	getDynamicComponent : function(field){
		var compName = undefined
		if(field.cxDynamicFilterCriteriaComponent && typeof cruxAssets != "undefined" && cruxAssets.getDynamicFilterCriteriaComponent){
			compName = cruxAssets.getDynamicFilterCriteriaComponent(field)
		}
		if(this.getMethods('cxDynamicCriteriaComponentCall')){
			compName =  this.executeMethod('cxDynamicCriteriaComponentCall',field,compName)
		}
		return compName;
	},
	convertCriteriaToCoql : function(criteria) {
        const keywords = {
            equal: "=",
            not_equal: "!=",
            ends_with: "like", // No I18n
            starts_with: "like", // No I18n
            contains: "like", // No I18n
            not_contains: "not like", // No I18n
            less_equal: "<=",
            less_than: "<",
            between: "between", // No I18n
            not_between: "not between", // No I18n
            greater_equal: ">=",
            greater_than: ">"
        };
        const compVal = keywords[criteria.comparator];
        let value = criteria.value;
        let keywordsArr = ["starts_with", "ends_with", "contains", "not_contains",  "between", "not_between"]; // No I18n
        if(keywordsArr.indexOf(criteria.comparator) !== -1) {
            switch(criteria.comparator) {
                case "starts_with":
                    value = `${value}%`;
                    break;
                case "ends_with":
                    value = `%${value}`;
                    break; 
                case "between":
                case "not_between":
                  	value = value.map(v => `'${v}'`).join(" and "); // No I18n
                  	return (`${criteria.field.api_name} ${compVal} ${value}`);
                case "contains":
                case "not_contains":
                    value = `%${value}%`;
                    break;
            }
        } else if(criteria.type === 'value' && (["equal", "not_equal"].includes(criteria.comparator) && ["${EMPTY}", "${NOTEMPTY}"].includes(value))){
          let compMap = {equal: 'is', not_equal: 'is not'}, valueMap = {'${EMPTY}': 'null', '${NOTEMPTY}': 'not null'};	//No I18n
          return (`${criteria.field.api_name} ${compMap[criteria.comparator]} ${valueMap[value]}`);
        } else if(Array.isArray(value)) {
          let strValue = JSON.stringify(value).replace('[', '(').replace(']', ')'); //No I18N
          let specialOperators = {"=": "in", "!=": "not in"};  //No 18N
          return (`${criteria.field.api_name} ${specialOperators[compVal]} ${strValue}`);
        }else if (typeof value === 'string' && value.includes(",")){
          strValue = `("${value.split(",").join('","')}")`;//No I18N
          let specialOperators = {"=": "in", "!=": "not in"};  //No I18N
          return (`${criteria.field.api_name} ${specialOperators[compVal]} ${strValue}`);
        }
        return (`${criteria.field.api_name} ${compVal} '${value}'`); // No I18n
      }
});


// $Id$
/**
 * @component crux-criteria-editor
 * @author authorName
 * @version 1.0.0
 * @alias crm-criteria-editor 1
 * @summary summary about the component if any
 * @utility  getCriteria
 * @notes notes about the component if any
 */
Lyte.Component.register("crux-criteria-editor", {
_template:"<template tag-name=\"crux-criteria-editor\"> <template is=\"if\" value=\"{{dxHubCheck}}\"><template case=\"true\"> <template is=\"if\" value=\"{{dxHubLoading}}\"><template case=\"true\"><div>Fetching Module fields Data...</div></template></template> <template is=\"if\" value=\"{{dxHubError}}\"><template case=\"true\"><div>Module Name given is not proper</div></template></template> <template is=\"if\" value=\"{{dxHubFieldError}}\"><template case=\"true\"><div>Fields are empty</div></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{dxHubLimitCheck}}\"><template case=\"true\"> <div>Given Criteria Contains more than the maximum count allowed</div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','create')}}\"><template case=\"true\"> <div class=\"cxCriteriaWrapper {{if(cxPropShowChildCriteria,'cxCriteriaChildWrapper','')}} {{if(cxPropContentOverflow,'cxCriteriaAutoHeight','')}}\"> <div id=\"criteriaDiv\" class=\"cxCriteriaTable {{if(cxPropSpecifiedCondition,'cxSpecified')}} {{if(cxPropHideFieldComparatorValue,'cxCriteriaAutoWidth','')}}\" total=\"{{totalCriteria}}\"> <template is=\"if\" value=\"{{expHandlers(cxPropColumnLabel,'&amp;&amp;',cxPropColumnLabel.length)}}\"><template case=\"true\"> <div class=\"criteriaRow criteriaCreateRow\"> <div class=\"criteriaTd criteriaNumber\"></div> <template is=\"for\" items=\"{{cxPropColumnLabel}}\" item=\"item\" index=\"index\"> <div class=\"criteriaTd cxCriteriaColumnLabel {{if(ifEquals(index,cruxArithResult(cxPropColumnLabel.length,'-',1)),'cxElementDiv','')}}\"> <lyte-text lt-prop-value=\"{{item}}\"></lyte-text> </div> </template> <div class=\"criteriaTd cxAddRemoveTd\"></div> </div> </template></template> <template is=\"for\" items=\"{{arr}}\" item=\"val\" index=\"index\"> <crux-criteria-editor-header class=\"criteriaRow criteriaCreateRow {{if(cxPropShowChildCriteria,'cxCriteriaParentRow','')}} {{if(ifEquals(arr.length,cruxArithResult(index,'+',1)),'cxCriteriaLastRowButton','')}} {{if(expHandlers(cruxArithResult(index,'+',1),'<=',cxPropDisabledRows),'cxCriteriaHeaderDisabled','')}}\" id=\"criteriaEditorHeader{{cruxArithResult(index,'+',1)}}\" prefix-array=\"{{cruxClone(cxPropPrefixArray)}}\" module=\"{{cxPropModule}}\" on-operator-change-call=\"{{method('onOperatorChangeCall')}}\" set-conditions=\"{{method('setConditions')}}\" get-fields-for-header=\"{{method('getFieldsForHeader')}}\" cx-prop-show-logged-in-user=\"{{cxPropShowLoggedInUser}}\" criteria-array-object-update=\"{{method('criteriaArrayObjectUpdate')}}\" on-value-change-call=\"{{method('onValueChangeCall')}}\" on-field-change-call=\"{{method('onFieldChangeCall')}}\" criteria-number=\"{{rowNumberArray[index]}}\" and-or-condition=\"{{patternArrDis[index]}}\" criteria-index=\"{{cruxArithResult(index,'+',1)}}\" show-add=\"{{if(ifEquals(arr.length,cruxArithResult(index,'+',1)),true,false)}}\" show-remove=\"{{if(ifEquals(arr.length,1),false,true)}}\" set-criteria-obj=\"{{unbound(if(setCriteriaObj[index],setCriteriaObj[index]))}}\" set-field-for-criteria=\"{{method('setCriteriaObjectField')}}\" cx-prop-none-field=\"{{cxPropShowNoneCondition}}\" module-list=\"{{moduleList}}\" multiple-module=\"{{multipleModule}}\" remove-pattern=\"{{cxPropRemovePattern}}\" on-value-error=\"{{method('valueErrorCall')}}\" get-prefix-values=\"{{method('sendPrefixValues')}}\" get-prefix-array=\"{{method('sendPrefixArray')}}\" module-mapping=\"{{cxPropModuleMapping}}\" module-record-mapping=\"{{cxPropModuleRecordMapping}}\" dynamic-column=\"{{cxPropDynamicColumns}}\" date-pattern=\"{{cxPropDatePattern}}\" time-format=\"{{cxPropTimeFormat}}\" criteria-format=\"{{cxPropCriteriaFormat}}\" total-criteria=\"{{totalCriteria}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" display-field=\"{{cxPropModuleDisplayFieldMapping}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" text-max-length=\"{{cxPropTextMaxLimit}}\" onfield-dropdown-open=\"{{method('onFieldDropdownOpenCall')}}\" oncondition-dropdown-open=\"{{method('onConditionDropdownOpenCall')}}\" oncondition-dropdown-hide=\"{{method('onConditionDropdownHideCall')}}\" onfield-dropdown-hide=\"{{method('onFieldDropdownHideCall')}}\" on-age-in-condition-change-call=\"{{method('onAgeInConditionChangeCall')}}\" currency-properties=\"{{cxPropCurrencyProperties}}\" tab-index=\"{{cxPropTabIndex}}\" cx-prop-show-all-fields=\"{{cxPropShowAllFields}}\" time-zone=\"{{cxPropTimeZone}}\" cx-prop-id=\"{{cxPropId}}\" api-version=\"{{cxPropCriteriaVersion}}\" secondary-module=\"{{cxPropSecondaryModule}}\" criteria-meta-method=\"{{method('pushingCriteriaMeta')}}\" on-sec-field-change-call=\"{{method('onSecFieldChangeCall')}}\" onsecfield-dropdown-open=\"{{method('onSecFieldDropdownOpenCall')}}\" onsecfield-dropdown-hide=\"{{method('onSecFieldDropdownHideCall')}}\" get-related-fields=\"{{method('getRelatedFields')}}\" dynamic-type-change-call=\"{{method('dynamicTypeChangeCall')}}\" dynamic-type-value=\"{{cxPropDynamicValueType}}\" on-before-dynamic-type-change-call=\"{{method('beforeDynamicTypeChangeCall')}}\" cx-prop-layout=\"{{cxPropLayout}}\" secondary-module-display-name=\"{{cxPropSecondaryModuleDisplayName}}\" on-field-set-call=\"{{method(&quot;onFieldSetCall&quot;)}}\" hide-seconday-module=\"{{cxPropHideSecondayModuleName}}\" show-secondary-module-dropdown=\"{{cxPropShowSecondaryFields}}\" on-condition-set-call=\"{{method('onConditionSetCall')}}\" user-component-properties=\"{{cxPropUserProperties}}\" role-component-properties=\"{{cxPropRoleProperties}}\" profile-component-properties=\"{{cxPropProfileProperties}}\" user-component-custom-request-call=\"{{method('userComponentCustomRequestFn')}}\" click-dynamic-field-value=\"{{method('clickDynamicFieldValueFn')}}\" dynamic-type-value-options=\"{{cruxClone(cxPropDynamicValueTypeOptions)}}\" hide-primary-selected-field=\"{{cxPropHidePrimaryFieldInSecondary}}\" show-error-for-empty-criteria=\"{{cxPropShowErrorForEmptyCriteria}}\" cx-prop-force-set-condition=\"{{cxPropForceSetCondition}}\" tooltip-config=\"{{cxPropTooltipConfig}}\" field-to-crux-comp-mapping=\"{{method('fieldToCruxCompMappingMt')}}\" text-area-max-length=\"{{cxPropTextAreaMaxLimit}}\" selected-field=\"{{lbind(selectedFieldArray[index])}}\" cx-dynamic-criteria-component-call=\"{{method('dynamicCriteriaComponentCall')}}\" show-fields-criteria=\"{{negate(cxPropHideFieldComparatorValue)}}\" child-criteria=\"{{cxPropShowChildCriteria}}\" set-methods-and-data-for-child-criteria-call=\"{{method('setMethodsAndDataForChildCriteriaCall')}}\" allow-empty-child-criteria=\"{{cxPropAllowEmptyChildCriteria}}\" always-show-child-criteria=\"{{cxPropAlwaysShowChildCriteria}}\" lookup-component-data-fetch-fn=\"{{method('lookupComponentDataFetchMt')}}\" hide-criteria-add-remove=\"{{cxPropHideCriteriaAddRemove}}\" on-element-dropdown-open=\"{{method('elementDropdownOpen')}}\" on-element-dropdown-close=\"{{method('elementDropdownClose')}}\" selected-sec-field=\"{{lbind(selectedSecFieldArray[index])}}\" get-custom-picklist-value=\"{{method('getCustomPicklistValueCriteria')}}\" disabled-record-state-config=\"{{cxPropDisableRecordCategoryConfiguration}}\" on-change-previous-next-condition-call=\"{{method('onChangePreviousNextConditionCall')}}\" prefix-changed=\"{{method('prefixChangedFn')}}\" cx-prop-disabled=\"{{expHandlers(cruxArithResult(index,'+',1),'<=',cxPropDisabledRows)}}\" cx-prop-disabled-group-operator=\"{{expHandlers(index,'<=',cxPropDisabledRows)}}\" masking-properties=\"{{cxPropMaskingProperties}}\"></crux-criteria-editor-header> </template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(arr.length,'>',1),'&amp;&amp;',expHandlers(cxPropRemovePattern,'!'))}}\"><template case=\"true\"> <div class=\"criteria_new_pat_edtr cxCriteriaPtrnContEditMode\" id=\"changePattern\"> <div class=\"criteriaTd {{if(showEdit,'editmodeLabel','')}}\"> <span class=\"cxCriteriaPtrnLabel cxCriteriaPatternText\">{{cruxGetI18n(\"crm.label.criteria.pattern\")}}</span> <template is=\"if\" value=\"{{expHandlers(cxPropShowHelp,'&amp;&amp;',expHandlers(cxPropAppearance,'==','box'))}}\"><template case=\"true\"> <span class=\"cxHelpIcon\" data-zcqa=\"criteria_patternhelp\" lt-prop-title=\"{{cruxGetI18n('crm.label.context.help')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;}\" onclick=\"{{action('openHelp')}}\"></span> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(showEdit,'!')}}\"><template case=\"true\"> <div class=\"cxCriteriaEditorPatternValue criteriaTd editPatternLabel\"> <span class=\"cxCriteriaPatternValue\" data-zcqa=\"criteria_pattern\">{{patternCriteria}}</span> <span class=\"cxCriteriaEditLink\" data-zcqa=\"criteria_patternedit\" onclick=\"{{action('openEditCriteria',this)}}\">{{cruxGetI18n(\"crm.label.edit.criteria.pattern\")}}</span> <template is=\"if\" value=\"{{expHandlers(cxPropShowHelp,'&amp;&amp;',expHandlers(cxPropAppearance,'==','flat'))}}\"><template case=\"true\"> <span class=\"cxHelpIcon\" data-zcqa=\"criteria_patternhelp\" lt-prop-title=\"{{cruxGetI18n('crm.label.context.help')}}\" lt-prop-tooltip-config=\"{&quot;position&quot;:&quot;bottom&quot;}\" onclick=\"{{action('openHelp')}}\"></span> </template></template> </div> </template><template case=\"false\"> <div class=\"cxCriteriaEditorPatternInput criteriaTd editPatternInput {{if(showPatternError,'cxCriteriaErrorPattern','')}}\"> <template is=\"if\" value=\"{{cxPropDraggablePattern}}\"><template case=\"true\"> <crux-pattern-editor cx-prop-pattern-array=\"{{rowNumberArray}}\" cx-prop-pattern=\"{{criteria}}\"></crux-pattern-editor> {{addMurhyInfo(\"crux-criteria-editor.html\",\"Feb Default Changes\")}} </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropDisabledRows}}\"><template case=\"true\"> <div class=\"cxCriteriaContainer\"> <div contenteditable=\"\" class=\"cxCriterEditorWrapper\" onkeydown=\"{{action('patternKeyDown',event)}}\" onpaste=\"{{action('patternPaste')}}\" onfocus=\"{{action('patternFocused',this)}}\"> <span contenteditable=\"false\" class=\"cxCriterEditorUnEditiableContent\">{{disabledPatternInternational}} <span class=\"cxCriterEditorEditiableContent\" contenteditable=\"true\"> {{subCriteriaEditPatternInternational}} </span> {{endDisabledPatternInternational}}</span> </div> </div> </template><template case=\"false\"> <lyte-input data-zcqa=\"criteria_pattern\" lt-prop-text-area-resize=\"{}\" lt-prop-type=\"textarea\" class=\"criteriaPatternText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput cxTextarea')}}\" lt-prop-value=\"{{lbind(patternCriteria)}}\" lt-prop-id=\"lyteInputCriteria\" lt-prop-rows=\"5\" lt-prop-cols=\"60\" lt-prop-appearance=\"{{cxPropAppearance}}\"></lyte-input> </template></template> </template></template> <template is=\"if\" value=\"{{showPatternError}}\"><template case=\"true\"> <span class=\"cxCriteriaPatternError cxCriteriaInlineError\">{{showPatternError}}</span> </template></template> <div class=\"patternButtons {{if(cxPropShowPatternActionsAsText,'cxPatternOnlyText')}} {{if(cxPropDraggablePattern,'cxCriteriaDraggablePatten','')}}\"> <span class=\"cxCriteriaSaveLink\" data-zcqa=\"criteria_patternsave\" onclick=\"{{action('saveCriteriaPattern')}}\"> <span class=\"cxCriteriaFlatLink\">{{cruxGetI18n(\"crm.button.save\")}}</span> </span> <span class=\"cxCriteriaCancelLink\" data-zcqa=\"criteria_patterncancel\" onclick=\"{{action('closeEditCriteria')}}\"> <span class=\"cxCriteriaFlatLink\">{{cruxGetI18n(\"crm.button.cancel\")}}</span> </span> </div> </div> </template></template> </div> </template></template> </div> </template></template><template is=\"if\" value=\"{{expHandlers(cxPropType,'==','view')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cxPropEmptyShowYield}}\"><template case=\"true\"> <template is=\"if\" value=\"{{dxHubViewError}}\"><template case=\"true\"><div>cxPropSetCriteria is empty</div></template></template> <lyte-yield yield-name=\"emptyCriteriaYield\"></lyte-yield> </template><template case=\"false\"> <div class=\"pwie\"> <div id=\"criteriaDiv\" class=\"cxCriteriaTable cxViewMode\"> <template is=\"for\" items=\"{{arr}}\" item=\"val\" index=\"index\"> <crux-criteria-editor-view-header secondary-module=\"{{cxPropSecondaryModule}}\" class=\"criteriaRow criteriaViewRow\" id=\"criteriaEditorHeader{{cruxArithResult(index,'+',1)}}\" prefix-array=\"{{cxPropPrefixArray}}\" module=\"{{cxPropModule}}\" set-field-for-criteria=\"{{method('setCriteriaObjectField')}}\" get-related-fields=\"{{method('getRelatedFields')}}\" set-conditions=\"{{method('setConditions')}}\" criteria-index=\"{{cruxArithResult(index,'+',1)}}\" and-or-condition=\"{{patternArrDis[index]}}\" fields=\"{{cxPropFields}}\" criteria=\"{{unbound(if(setCriteriaObj[index],setCriteriaObj[index]))}}\" total-criteria=\"{{totalCriteria}}\" module-mapping=\"{{cxPropModuleMapping}}\" date-pattern=\"{{cxPropDatePattern}}\" time-format=\"{{cxPropTimeFormat}}\" currency-properties=\"{{cxPropCurrencyProperties}}\" show-comparator=\"{{cxPropShowComparatorInView}}\" secondary-module-display-name=\"{{cxPropSecondaryModuleDisplayName}}\" dynamic-type-value=\"{{cxPropDynamicValueType}}\" hide-seconday-module=\"{{cxPropHideSecondayModuleName}}\" cx-prop-secondary-fields=\"{{cxPropSecondaryFields}}\" module-record-mapping=\"{{cxPropModuleRecordMapping}}\" value-criteria-view-change=\"{{method('valueCriteriaViewChangeFn')}}\" cx-dynamic-criteria-component-call=\"{{method('dynamicCriteriaComponentCall')}}\" show-fields-criteria=\"{{negate(cxPropHideFieldComparatorValue)}}\" criteria-format=\"{{cxPropCriteriaFormat}}\" set-methods-and-data-for-child-criteria-call=\"{{method('setMethodsAndDataForChildCriteriaCallForView')}}\" get-custom-picklist-value=\"{{method('getCustomPicklistValueCriteria')}}\" disabled-record-state-config=\"{{cxPropDisableRecordCategoryConfiguration}}\"></crux-criteria-editor-view-header> </template> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(arr.length,'>',1),'&amp;&amp;',expHandlers(cxPropRemovePattern,'!'))}}\"><template case=\"true\"> <div class=\"criteria_new_pat_edtr cxCriteriaPtrnContViewMode viewmode\" id=\"changePattern\"> <div class=\"criteriaTd\"> <span class=\"cxCriteriaPtrnLabel cxCriteriaPatternText\">{{cruxGetI18n(\"crm.label.criteria.pattern\")}}</span> </div> <div class=\"criteriaTd editPatternInput\"> <span data-zcqa=\"criteria_pattern\">{{patternCriteria}}</span> </div> </div> </template></template> </div> </template></template> </template></template> </template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"for","position":[1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,1,1,2,1]},{"type":"text","position":[1,1,1,4]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"attr","position":[1,5,1]},{"type":"text","position":[1,5,1,1,0]},{"type":"attr","position":[1,5,3]},{"type":"text","position":[1,5,3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"insertYield","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1,0]},{"type":"text","position":[1,3,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropFields","totalCriteria","cxPropModule","cxPropModuleApiName","arr","patternArr","pattern","showEdit","criteria","patternArrDis","bufferCriteria","shownAlert","criteriaArrayObject","cxPropSetCriteria","setCriteriaObj","moduleId","cxPropType","setCriteriaViewObj","getFields","cxPropMaxCount","cxPropRemovePattern","cxPropSpecifiedCondition","defaultCond","defaultCondition","defaultLabelCondition","internalFieldCall","cxPropShowLoggedInUser","cxPropEmptyShowYield","cxPropShowNoneCondition","patternCriteria","cxPropModuleDisplayFieldMapping","preventUIType","preventColumnName","numberFieldException","cxPropShowAllFields","cxPropShowHelp","cxPropHelpUrl","cxPropBoundary","cxPropAppearance","cxPropPrefixArray","cxPropDropArray","criteriaEditPattern","editPatternNode","cxPropDatePattern","cxPropModuleRecordMapping","cxPropDynamicColumns","cxPropTimeFormat","cxPropTimeZone","cxPropCriteriaFormat","rowNumberArray","cxPropTextMaxLimit","cxPropTextAreaMaxLimit","cxPropDropBoxWidth","cxPropCurrencyProperties","cxPropTabIndex","cxPropShowComparatorInView","cxPropSecondaryFields","cxPropSecondaryModule","cxPropSecondaryModuleDisplayName","cxPropCriteriaMeta","cxPropId","cxPropCriteriaVersion","cxPropLayout","cxPropUserProperties","cxPropColumnLabel","cxPropDataTypeMapping","cxPropDynamicValueType","cxPropDynamicValueTypeOptions","cxPropHideSecondayModuleName","cxPropShowSecondaryFields","cxPropCriteriaForValue","cxPropDraggablePattern","cxPropRoleSupport","cxPropGroupSupport","cxPropSortedFields","cxPropHidePrimaryFieldInSecondary","cxPropFilterSecondaryFields","cxPropShowInlineErrorMessage","cxPropShowPatternActionsAsText","cxPropTooltipConfig","cxPropShowErrorForEmptyCriteria","cxPropForceSetCondition","cxPropDisabledRows","cxPropRoleProperties","cxPropProfileProperties","cxPropDisableRecordCategoryConfiguration","selectedFieldArray","cxPropHideFieldComparatorValue","cxPropShowChildCriteria","cxPropAllowEmptyChildCriteria","cxPropAlwaysShowChildCriteria","cxPropHideCriteriaAddRemove","selectedSecFieldArray","dxHubCheck","dxHubError","cxPropMaskingProperties","dxHubLoading","cxPropContentOverflow"],
_observedAttributesType :["array","number","string","string","array","array","array","boolean","string","array","string","boolean","array","object","array","string","string","array","boolean","number","boolean","string","string","string","string","boolean","boolean","boolean","boolean","string","object","array","array","array","boolean","boolean","string","object","string","array","array","array","object","string","object","boolean","string","string","string","array","number","number","string","object","number","boolean","array","string","string","array","string","string","string","object","array","object","boolean","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","boolean","string","boolean","boolean","number","object","object","boolean","array","boolean","boolean","boolean","boolean","object","array","boolean","boolean","object","boolean","boolean"],
//No I18N
	_lyteUtilFunctions: ["getCriteria"],
	data : function(){
		return{
			/**
			 * This property specifies the fields that are needed to be shown in the criteria editor.
			 * @componentProperty { array } cxPropFields
			 * @version 1.0.0
			 * @input
			 */
			cxPropFields: Lyte.attr('array',{"input" : true}),//No I18N
			totalCriteria : Lyte.attr('number', {default : 1}),//No I18N
			/**
			 * This specifies the module of the Criteria editor
			 * @componentProperty { string } cxPropModule
			 * @input
			 */
			cxPropModule : Lyte.attr('string',{"input" : true}),//No I18N
			/**
			 * This specifies the module api name for the Criteria editor
			 * @componentProperty { string } cxPropModuleApiName
			 * @input
			 */
			cxPropModuleApiName : Lyte.attr('string'),//No I18N
			arr  : Lyte.attr("array", {default : []}),//No I18N
			patternArr : Lyte.attr("array",{default : [' ']}),//No I18N
			pattern : Lyte.attr("array",{default : [' ']}),//No I18N
			showEdit : Lyte.attr('boolean',{default : false}),//No I18N
			criteria : Lyte.attr('string',{default : "1"}),//No I18N
			patternArrDis : Lyte.attr('array',{default :[' ']}),//No I18N
			bufferCriteria : Lyte.attr('string'),//No I18N
			shownAlert : Lyte.attr('boolean',{default : false}),//No I18N
			criteriaArrayObject : Lyte.attr('array',{default : []}),//No I18N
			/**
			 * This property sets the criteria for the data to be given in the creteria editor. 
			 * @componentProperty { object } cxPropSetCriteria
			 * @input @output
			 */
			cxPropSetCriteria : Lyte.attr('object',{"input" : true,"output" : true}), //no i18n
			setCriteriaObj : Lyte.attr('array'), //No I18N
			moduleId : Lyte.attr('string'), //No I18n
			/**
			 * This property specifies the type of the criteria editor
			 * @componentProperty { create|view } cxPropType = create
			 * @input
			 */
			cxPropType : Lyte.attr('string',{"input" : true,default :'create'}), //no i18n
			setCriteriaViewObj : Lyte.attr('array'), //no i18n
			getFields : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * This property specifies the maximum number of criteria rows that can be added after showing an alert. 
			 * @componentProperty { number } cxPropMaxCount
			 * @input
			 */
			cxPropMaxCount : Lyte.attr('number',{"input" : true,default : 25}), //no i18n
			/**
			 * With this property, you can specify if the pattern has to be removed.
			 * @componentProperty { boolean } cxPropRemovePattern=false
			 * @input
			 */
			cxPropRemovePattern : Lyte.attr('boolean',{"input" : true,default : false}), // no i18n
			/**
			 * With this property, you can specify the mandatory condition to be provided. On setting this property, the user cannot edit the conditions.
			 * @componentProperty { and|or } cxPropSpecifiedCondition
			 * @input
			 */
			cxPropSpecifiedCondition : Lyte.attr('string'), //no i18n
			defaultCond : Lyte.attr('string',{default : 'and'}),//No I18N
			defaultCondition : Lyte.attr('string',{default : _cruxUtils.getI18n('and')}), //no i18n
			defaultLabelCondition : Lyte.attr('string',{default :_cruxUtils.getI18n('crm.label.and') }), //no i18n
			internalFieldCall : Lyte.attr('boolean',{default : false}), //no i18n
			/**
			 * With this property you can specify if the 'logged in user' field should be shown or not in the user dropdown.
			 * @componentProperty { boolean } cxPropShowLoggedInUser=true
			 * @input
			 */
			cxPropShowLoggedInUser : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property specifes if the yield has to be provided if the empty criteria is given in the view format.
			 * @componentProperty { boolean } cxPropEmptyShowYield=false
			 * @input
			 */
			cxPropEmptyShowYield : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property specifies if the None Field should be shown in the field dropdown.
			 * @componentProperty { boolean } cxPropShowNoneCondition=false
			 * @input
			 */
			cxPropShowNoneCondition : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			patternCriteria : Lyte.attr('string',{default : "1"}),
			/**
			 * This property is the map between the module and its respective display fields.
			 * @componentProperty { object } cxPropModuleDisplayFieldMapping
			 * @input
			 */
			cxPropModuleDisplayFieldMapping : Lyte.attr('object',{"input" : true}), //no i18n
			//alertButton : Lyte.attr('array',{default : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary"}]}), //no i18n
			preventUIType : Lyte.attr('array'),//no i18n
			preventColumnName : Lyte.attr('array'),//no i18n
			numberFieldException : Lyte.attr('array',{default : ["SOLUTIONNUMBER","INVOICENUMBER","SONUMBER","QUOTENUMBER","CASENUMBER"]}), //no i18n
			/**
			 * This property when given true will show all the field that are provided to the criteria editor without any filteration. Normally criteria editor will filter the unsupported fields, hidden fields and unused fields.
			 * @componentProperty { boolean } cxPropShowAllFields=false
			 * @input
			 */
			cxPropShowAllFields : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * With this property, you can choose to shown or hide the help icon. 
			 * @componentProperty { boolean } cxPropShowHelp=false
			 * @input
			 */
			cxPropShowHelp : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property specifies the url to which the user should be redirected if the help icon is clicked.
			 * @componentProperty { string } cxPropHelpUrl
			 * @input
			 */
			cxPropHelpUrl : Lyte.attr('string',{"input" : true,}), //no i18n
			/**
			 * This property specifies the boundary of the criteria editor dropdown.
			 * @componentProperty { object } cxPropBoundary
			 * @input
			 */
			cxPropBoundary : Lyte.attr("object",{"input" : true,default : {}}),//no i18n
            /**
			 * With this property, you can set the appearance of the criteria editor in the create type. It can be either box or flat.
             * @componentProperty { box|flat } cxPropAppearance
             * @input
             */
            cxPropAppearance: Lyte.attr('string', {"input" : true,default: 'box'}),    //NO I18N
            /**
			 * This property is used to display more dropdown for filtering before a user can select the field. Dropdown like base module, child module can be used here, this property can also be used to show the criteria editor without the field comparator value section.
			 * @componentProperty { array } cxPropPrefixArray
			 * @input
			 */
			cxPropPrefixArray : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			/**
			 * This property is used to populate the dropdown when the cxPropPrefixArray is given.
			 * @componentProperty { array } cxPropDropArray
			 * @input
			 */
			cxPropDropArray : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			criteriaEditPattern : Lyte.attr('array',{default : []}), //no i18n
			editPatternNode : Lyte.attr('object'), //no i18n
			/**
			 * With this property, you can define the date pattern for the dates to be used in the criteria editor.
			 * @componentProperty { string } cxPropDatePattern
			 * @input
			 */
			cxPropDatePattern : Lyte.attr('string',{"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.DATE_PATTERN : "dd/mm/yyyy"}), //no i18n
			/**
			 * This is the moduleRecordMapping data used in CRM. With this you provide the Consent Module fields when GDPR is enabled. This moduleRecordMapping data is also used for lookup fields in some scenarios.
			 * @componentProperty { object } cxPropModuleRecordMapping
			 * @input
			 */
			cxPropModuleRecordMapping : Lyte.attr('object',{"input" : true}), //no i18n
			/**
			 * This property when given true allows the developer to construct the prefix dropdown based on the input given in the previous dropdown. So the field comparator value section will also be displayed based on the input from the previous dropdowns.
			 * @componentProperty { boolean } cxPropDynamicColumns
			 * @input
			 */
			cxPropDynamicColumns : Lyte.attr('boolean',{"input" : true}), //no i18n
			/**
			 * This property defines the time format which can be used in the criteria editor.
			 * @componentProperty { string } cxPropTimeFormat
			 * @input
			 */
			cxPropTimeFormat : Lyte.attr('string',{"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.TIME_FORMAT : 'hh:mm'}), //no i18n
			/** 
			 * This property defines the time zone which can be used in the criteria editor.
			 * @componentProperty { string } cxPropTimeZone
			 * @input
			 */
			cxPropTimeZone : Lyte.attr("string", {"input" : true,default : typeof Crm !== "undefined" ? Crm.userDetails.TIME_ZONE : "+05.30"}),//No I18n
			cxPropCriteriaFormat : Lyte.attr('string'), //no i18n
			rowNumberArray : Lyte.attr('array',[1]), // no i18n
			/**
			 * This property is used to provide the text value limit to the criteria editor. By default, the criteria editor does not have a limit, but if needed it can be provided with this property.
			 * @componentProperty { number } cxPropTextMaxLimit
			 * @input
			 */
			cxPropTextMaxLimit : Lyte.attr('number'), //no i18n
			/**
			 * This property is used to provide the text area value limit to the criteria editor. By default, the criteria editor does not have a limit, but if needed it can be provided with this property.
			 * @componentProperty { number } cxPropTextMaxLimit
			 * @input
			 */
			cxPropTextAreaMaxLimit : Lyte.attr('number',{"input" : true}), //no i18n
			cxPropDropBoxWidth : Lyte.attr('string', {default: 'min-button'}), //no i18n
			/**
			 * With this property you can define the currency details which can be used in the criteria editor.
			 * @componentProperty { object } cxPropCurrencyProperties
			 * @input
			 */
			cxPropCurrencyProperties : Lyte.attr('object',{"input" : true,default : typeof Crm !== "undefined" ? {baseCurrency : Crm.userDetails.BASE_CURRENCY, currencyDetails : Crm.userDetails.CURRENCY_DETAILS,defaultRoundOff: Crm.userDetails.defaultRoundOff ? Crm.userDetails.defaultRoundOff : 2,defaultOrgCurrency : Crm.userDetails.defaultOrgCurrency} : {baseCurrency : "",currencyDetails : {},defaultRoundOff : 2,defaultOrgCurrency : ""}}), //no i18n
			/**
			 * This property sets the tabindex to all the actionable elements inside the criteria editor.
			 * @componentProperty { number } cxPropTabIndex
			 * @input
			 */
			cxPropTabIndex : Lyte.attr('number',{"input" : true,default : 0}), //no i18n
			/**
			 * This property is used to show the group operator of the condition between the criteria rows in the Criteria Summary or in the View.
			 * @componentProperty { boolean } cxPropShowComparatorInView=false
			 * @input
			 */
			cxPropShowComparatorInView : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property is used to populate the secondary field of the criteria editor when field to field matching is expected.
			 * @componentProperty { array } cxPropSecondaryFields
			 * @input
			 */
			cxPropSecondaryFields : Lyte.attr('array',{"input" : true}), //no i18n
			/**
			 * This specifies the module of the secondary fields which is similar to the cxPropModule for the primary fields.
			 * @componentProperty { string } cxPropSecondaryModule
			 * @input
			 */
			cxPropSecondaryModule : Lyte.attr('string',{"input" : true}), //no i18n
			/**
			 * This property will display the secondary module when the secondary field is selected.
			 * @componentProperty { string } cxPropSecondaryModuleDisplayName
			 * @input
			 */
			cxPropSecondaryModuleDisplayName : Lyte.attr('string',{"input" : true}), //no i18n
			cxPropCriteriaMeta : Lyte.attr('array',{default : []}), //no i18n //not used
			/**
			 * With this, you can pass an unique ID to the criteria editor, which is used for querySelection.
			 * @componentProperty { string } cxPropId
			 * @input
			 */
			cxPropId : Lyte.attr('string',{"input" : true,default : 'criteria'}), //no i18n
			cxPropCriteriaVersion : Lyte.attr('string',{default : 'query'}), //no i18n
			/**
			 * This property should be given if the value part is dependent  on a particular layout. Based on the given layout, you will be able to choose from the picklist values. This property is advised to use only for picklist values.
			 * @componentProperty { string } cxPropLayout
			 * @input
			 */
			cxPropLayout : Lyte.attr('string',{"input" : true}), //no i18n
			/**
			 * This property can be used to modify the properties of the user lookup value part.
			 * @componentProperty { object } cxPropUserProperties
			 * @input
			 */
			cxPropUserProperties : Lyte.attr('object',{"input" : true,default : {}}), //no i18n
			/**
			 * This property is used to show the label for each column of the criteria editor. The default column structure would be Field, Comparator and Value. The label would be added on the top of the column.
			 * @componentProperty { array } cxPropColumnLabel
			 * @input
			 */
			cxPropColumnLabel : Lyte.attr('array',{"input" : true,default : []}), //no i18n
			/**
			 * On selecting a field, This property is used to group the data type of the field and show them together in the secondary fields. Normally criteria editor will match the data type when showing the secondary fields, if you want to match the data type with one or more data type you can use this property.
			 * @componentProperty { object } cxPropDataTypeMapping
			 * @input
			 */
			cxPropDataTypeMapping : Lyte.attr('object',{"input" : true}), //no i18n
			/**
			 * When this is given true, the user can choose from the options. With this property, you get to compare the primary field with the options given such as field or value.
			 * @componentProperty { boolean } cxPropDynamicValueType
			 * @input
			 */
			cxPropDynamicValueType : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * With this property, you can set the options for the property 'DynamicValueType'. 
			 * @componentProperty { array } cxPropDynamicValueTypeOptions
			 * @input
			 */
			cxPropDynamicValueTypeOptions :  Lyte.attr('array',{"input" : true,default : [{display : _cruxUtils.getI18n('crm.label.value'),system : 'value'},{display : _cruxUtils.getI18n('crm.label.field'),system : 'field'}]}), //no i18n
			/**
			 * On setting true, the secondary module name gets hidden in the selected seondary field display.
			 * @componentProperty { boolean } cxPropHideSecondayModuleName
			 * @input
			 */
			cxPropHideSecondayModuleName : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * When setting true, the criteria editor works as Field to Field Comparator.
			 * @componentProperty { boolean } cxPropShowSecondaryFields
			 * @input
			 */
			cxPropShowSecondaryFields : Lyte.attr('boolean',{"input" : true}), //no i18n
			/**
			 * On setting this property as true, the criteria editor works to  perform its function only when the valid value in criteria is given by the user.
			 * @componentProperty { boolean } cxPropCriteriaForValue
			 * @input
			 */
			cxPropCriteriaForValue : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * Usually in criteria editor, the user types the pattern.  On setting this property as true, the user gets the flexibility to drag the rows in the pattern editor rather than tying it.   
			 * @componentProperty { boolean } cxPropDraggablePattern
			 * @input
			 */
			cxPropDraggablePattern : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * On setting this property, the user can add the condition  'belong to' and 'does not belongs to' role conditon for the user lookup fields.
			 * @componentProperty { boolean } cxPropRoleSupport
			 * @input
			 */
			cxPropRoleSupport : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			cxPropGroupSupport : Lyte.attr('boolean',{default : false}), //no i18n //shoud not be used
			/**
			 * With this property, you can choose to sort the provided fields alphabetically. 
			 * 
			 
			 * @componentProperty { boolean } cxPropSortedFields
			 * @input
			 */
			cxPropSortedFields : Lyte.attr('boolean',{"input" : true,default : true}), //no i18n
			/**
			 * This property is used to hide the primary field in the secondary field list when the similar two module fields are compared together.
			 * @componentProperty { boolean } cxPropHidePrimaryFieldInSecondary
			 * @input
			 */
			cxPropHidePrimaryFieldInSecondary : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This proeprty is used to filter out the unsupported field from the secondary field given to the criteria editor.
			 * @componentProperty { boolean } cxPropFilterSecondaryFields
			 * @input
			 */
			cxPropFilterSecondaryFields : Lyte.attr('boolean',{"input" : true,default : false}),//no i18n
			/**
			 * This property is used to display the error message as inline message below the corresponding input.
			 * @componentProperty { boolean } cxPropShowInlineErrorMessage
			 * @input
			 */
			cxPropShowInlineErrorMessage : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This property is used to show the save and cancel in the edit pattern as text or as icons.
			 * @componentProperty { boolean } cxPropShowPatternActionsAsText
			 * @input
			 */
			cxPropShowPatternActionsAsText : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * This is used to provide the configuration to the tooltips shown in the criteria editor.
			 * @componentProperty { string } cxPropTooltipConfig
			 * @input
			 */
			cxPropTooltipConfig : Lyte.attr('string',{"input" : true,default :  '{}'}), //no i18n
			/**
			 * When this is given as true, we will throw the error for the empty criteria as well.
			 * @componentProperty { boolean } cxPropShowErrorForEmptyCriteria
			 * @input
			 */
			cxPropShowErrorForEmptyCriteria : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			/**
			 * When this data is given as true the conditions will be fetched everytime the field is selected via the callbacks.
			 * @componentProperty { boolean } cxPropForceSetCondition
			 * @input
			 */
			cxPropForceSetCondition : Lyte.attr('boolean',{"input" : true,default : false}), //no i18n
			cxPropDisabledRows : Lyte.attr('number',{default : 0}), //no i18n
			/**
			 * This property is used to provide the configuration to the role value section when the role field is selected.
			 * @componentProperty { object } cxPropRoleProperties
			 * @input
			 */
			cxPropRoleProperties : Lyte.attr('object',{"input" : true,default : {}}),
			/**
			* This property is used to provide the configuration to the profile value section when the profile field is selected.
			 * @componentProperty { object } cxPropProfileProperties
			 * @input
			 */
			cxPropProfileProperties : Lyte.attr('object',{default : {}}),
			cxPropDisableRecordCategoryConfiguration : Lyte.attr('boolean',{default : false}), //no i18n
			selectedFieldArray : Lyte.attr('array',{default : []}), //no i18n
			cxPropHideFieldComparatorValue : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropShowChildCriteria : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropAllowEmptyChildCriteria : Lyte.attr('boolean',{default : true}), //no i18n
			cxPropAlwaysShowChildCriteria : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropHideCriteriaAddRemove : Lyte.attr('object',{default : {}}),
			selectedSecFieldArray : Lyte.attr('array',{default : []}),
			dxHubCheck : Lyte.attr('boolean',{default : false}), //no i18n
			dxHubError : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropMaskingProperties : Lyte.attr('object'), //no i18n
			dxHubLoading : Lyte.attr('boolean',{default : false}), //no i18n
			/**
             * @componentProperty { boolean } cxPropContentOverflow
			 * @input
             */
            cxPropContentOverflow: Lyte.attr("boolean", { default: false, input: true }), //no i18n
 		}
	},
	didConnect : function(){
		window.addEventListener('keydown',this.keydownFn , true);
		if(this.getMethods('onRender')){
			/**
			 * @method onRender
			 * @author authorName
			 * @version 1.0.0
			 */
			this.executeMethod('onRender')//no i18n
		}
	},
	didDestroy : function(){
		window.removeEventListener('keydown' , this.keydownFn , true)
	},
	keydownFn : function(event){
		var classes = event.target.classList
		if(event.keyCode == 32 && ( classes.contains('cx_prefixDropdownLabel') || classes.contains('cx_fieldDropdownLabel') || classes.contains('cx_compDropdownLabel') )) {
			event.preventDefault()
		}
	},
    onGetFieldsSucess :function(){
    	this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    },
    filterAndSetFields : function(fields){
    	function compare(a, b) {
			if(!a.field_label || !b.field_label){
				return 0;
			}
			var genreA = a.field_label;
			var genreB = b.field_label;
			return genreA.toLowerCase().localeCompare(genreB.toLowerCase());
		}
    	var fieldLen = fields.length;
		for(var k=0;k<fieldLen;k++){
			if(fields[k].cxPropType == 'group'){
				fields[k].cxPropFields = this.filterAndSetFields(fields[k].cxPropFields);
			}else{
				if(fields[k].api_name == "Data_Processing_Basis" && this.data.cxPropModuleRecordMapping.Consents && this.data.cxPropModuleRecordMapping.Consents.fields){
					var dPFieldForConsent = store.peekRecord("module",this.data.cxPropModuleRecordMapping.Consents.id).fields.filterBy({api_name : "Data_Processing_Basis"})[0]; //no i18n
					if(dPFieldForConsent){
						Lyte.Component.set(fields[k], {pick_list_values : dPFieldForConsent.pick_list_values} );
					}
				}
				if(this.data.cxPropModule == 'Activities' && fields[k].api_name == 'Tag' && fields[k].sub_module){
					fields[k].field_label = fields[k].field_label + ' (' + this.data.cxPropModuleRecordMapping[fields[k].sub_module.api_name].plural_label +')';
					fields[k].api_name = fields[k].sub_module.api_name+'.'+fields[k].api_name;
				}
				var alloweField = false;
				for(var allowedKey in this.allowedFieldsCriteria ){
					if(this.allowedFieldsCriteria[allowedKey].indexOf(fields[k][allowedKey]) > -1){
						alloweField = true;
					}
				}
				if(!this.data.cxPropShowAllFields && !alloweField){
					for(var key in this.preventField){
						if(this.preventField[key].indexOf(fields[k][key]) > -1){
							fields.splice(k,1);
							k--;
							fieldLen--;
							break;
						}
					}
					for(var i=0;i<this.restrictedFieldTypes.length;i++){
					    var match = true
					    for(var keyN in this.restrictedFieldTypes[i]){
					        if(fields[k][keyN] != this.restrictedFieldTypes[i][keyN]){
					            match = false;
					            break
					        }
					    }
					    if(match){
					        fields.splice(k,1);
							k--;
							fieldLen--;
							break;
					    }
					}
				}
			}
		}
		return this.data.cxPropSortedFields ? fields.sort(compare) : fields
    },
    setDatas : function(){
    	this.showObject={};
    	if(this.data.cxPropPrefixArray && this.data.cxPropPrefixArray.length > 0){
    		if(this.data.cxPropDropArray && this.data.cxPropDropArray.length > 0){
    			this.showObject[this.data.cxPropPrefixArray[0].apiValue]=this.getData('cxPropDropArray');
    			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    		}
    	}else{
    		if(this.data.cxPropFields){
    			this.setData('internalFieldCall',true); //No I18N
				this.setData('cxPropFields',this.filterAndSetFields(this.data.cxPropFields)) //no i18n
				this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
				this.setData('internalFieldCall',false); //No I18N
    		}else if(this.data.cxPropType == 'view'){ //no i18n
    			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
    		}
    	}
    	if(this.data.cxPropSecondaryFields && this.data.cxPropSecondaryFields.length){
    		// this.segregateSecondaryFields();
    		if(this.data.cxPropFilterSecondaryFields){
    			this.setData('cxPropSecondaryFields',this.filterAndSetFields(this.data.cxPropSecondaryFields)) //no i18n
    		}
    		this._relatedField = {}
    	}
    },
	init : function(){
		this.$node.getCriteria = function(opt){
			return this.component.getCriteria(opt);
		}
		this.$node.resetCriteria =function(){
			return this.component.resetCriteria();
		}
		this.$node.setCriteria = function(value){
			this.component.setCriteria(value);
		}
		this.$node.setCriteriaConditions = function(arg){
			for(var i in arg){
				this.component[i+'Conditions']=arg[i];
			}
		}
		this.$node.setPreventFieldsObject = function(arg){
			for(var i in arg){
				this.component.preventField[i]=arg[i];
			}
		}
		this.$node.setWidth = function(){
            // var t = this.getBoundingClientRect().width;
            // $L(this).find(".cxElementDiv").width(t - 475);
            console.warn('This function is deprecated. This function is no longer required to set the width for criteria editor in the modal'); //no i18n
		}
		this.$node.focusPattern = function(){
			this.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus()
		}
		this.$node.isCriteriaPatternOpen = function(){
			return this.getData('showEdit')
		}
		this.$node.getTotalCriteria = function(){
			return this.getData('totalCriteria');
		}
		this.$node.addCriteriaRow = function(){
			this.component.createNewCriteriaFn();
		}
		this.$node.deleteCriteriaRow = function(ind){
			this.component.removeCriteriaFn(ind);
		}
		this.$node.showCriteriaAlert = function(msg){
			this.component.showAlert(msg);
		};
		this.$node.showInlineError = function(row,error){
			if(row == 'pattern'){
				this.component.showErrorInPattern(error);
			}else{
				this.querySelector('#criteriaDiv').querySelectorAll(':scope > crux-criteria-editor-header')[row-1].component.setError(error)
			}
		}
		if(this.data.cxPropDisabledRows > 0){
			var pattern,endPattern;
			switch(this.data.cxPropDisabledRows){
			case 1:
				pattern = '( 1 and';
				endPattern = ')';
			}
			this.setData('disabledPattern',pattern);
			this.setData('endDisabledPattern',endPattern);
		}
		if(typeof crmConstants != "undefined" && !this.data.cxPropModuleDisplayFieldMapping){
			this.setData('cxPropModuleDisplayFieldMapping',crmConstants.moduleDisplayField); //no i18n
		}
		if(!this.data.cxPropModuleRecordMapping){
			this.setData('cxPropModuleRecordMapping',typeof moduleRecordMapping != 'undefined' ? moduleRecordMapping : {}); //no i18n
		}
		if(this.getMethods('cxSetDataAndMethods')){
			this.executeMethod('cxSetDataAndMethods',this);
		}
		this.setCriteriaFromComp = false;
		this.newCriteria = false;
		this.showValueError = false;
		var a;
		this.initCruxConditions('criteria');//No I18N
		if(typeof cruxAssets != "undefined" && cruxAssets.getCruxFilterCriteriaConditions){
			a = cruxAssets.getCruxFilterCriteriaConditions();
		}
		for(var i in a){
			this[i+'Conditions']=a[i];
		}
		if(this.getMethods('setCriteriaConditions')){
			a=this.executeMethod('setCriteriaConditions'); //No I18N
		}
		for(var i in a){
			this[i+'Conditions']=a[i];
		}
		if(typeof cruxAssets != "undefined" && cruxAssets.setCriteriaConditions){
			var condit={}
			for(var i in this){
			    if(i.endsWith('Conditions') && Array.isArray(this[i])){
			        condit[i.replace('Conditions','')] = this[i]
			    }
			}
			a = cruxAssets.setCriteriaConditions(condit);
			for(var i in a){
				this[i+'Conditions']=a[i];
			}
		}

		const cruxAssetService = Lyte.Service.getInjected('cruxAssests');
		if (typeof  cruxAssetService !== 'undefined' && cruxAssetService.getPropertiesForCruxComponents) {
			var node = this.$node;
			var props = cruxAssetService.getPropertiesForCruxComponents(node.cxProp(), node.tagName, this);
			this.setData(props);
		}
		
		this.restrictedFieldTypes = []
		if(typeof cruxAssets != "undefined" && cruxAssets.restrictedCriteriaFieldTypes){
			this.restrictedFieldTypes = cruxAssets.restrictedCriteriaFieldTypes;
		}
		this.setData('preventColumnName',this.restrictedColumnNames()); //no i18n
		this.setData('preventUIType',this.restrictedUITypes());//no i18n
		this.preventField = {ui_type : this.data.preventUIType, column_name : this.data.preventColumnName, show_type : [17]}
		if(this.getMethods('preventFieldsObject')){
			this.preventField = this.executeMethod('preventFieldsObject',this.preventField); //no i18n
		}
		this.allowedFieldsCriteria = typeof cruxAssets != "undefined" && cruxAssets.allowedFieldInCriteria ? cruxAssets.allowedFieldInCriteria : {};
		if(this.getMethods('allowedFieldsObject')){
			this.allowedFieldsCriteria = this.executeMethod('allowedFieldsObject',this.allowedFieldsCriteria); //no i18n
		}
        var criteriaClass = 'cxCriteriaFlatStyle';  //NO I18N
        if(this.getData('cxPropAppearance') === 'box') {
            criteriaClass = 'cxCriteriaBoxStyle';   //NO I18N
        }
        if(typeof this.data.cxPropShowSecondaryFields == 'undefined' && this.data.cxPropSecondaryFields && this.data.cxPropSecondaryFields.length){
        	this.setData('cxPropShowSecondaryFields',true);
        }
        $L(this.$node).addClass(`${criteriaClass} cxCriteriaEditorWrapper`);
		this.showObject={};
		this.setDatas();
		this.internalRowObj = 1;
	},
	resetCriteria: function(){
		this.setDatas();
		if(this.getData('cxPropSetCriteria')){
			this.setData('arr',[]); //no i18n
			this.setData('pattern',[' ']);//No I18N
			this.setData('patternArrDis',[' ']); //no i18n
			this.setData('patternArr',[' ']); //no i18n
			this.setData('rowNumberArray',[1]); //no i18n
			this.internalRowObj = 1;

			this.setCriteria(this.getData('cxPropSetCriteria')); //no i18n
		}else{
			this.setCriteria({});
		}
		this.setData('showEdit',false); //no i18n
		this.setData('showPatternError',undefined);
	},
	savePattern : function(string){
		if(this.data.cxPropDraggablePattern){
			this.setData('criteria',string); //no i18n
			this.setData('patternCriteria',this.changeToInternational(string));//No I18N
			if(this.getData('cxPropSpecifiedCondition')){
				this.criteriaOption('specified');
			}
			this.updateCriteriaRowsConditionBasedOnChangedPattern(this.getData('criteria')); //no i18n
			this.updateCriteriaRowsBasedOnChangedPattern(this.getData('criteria')); //no i18n
			return string;
		}else{
			var valstr = string.split(' ').join('');
			valstr = this.validatePattern(valstr,this.data.totalCriteria,this.data.cxPropShowInlineErrorMessage);
			if(!valstr)
			{
				return false;
			}
			this.setData('showPatternError',undefined);
			this.setData('criteria',valstr); //no i18n
			//subCriteriaEditPattern should be updated when disabled rows are present and pattern is changed from the pattern editor
			this.processDisabledCriteria(this.data.criteria);
			this.setData('patternCriteria',this.changeToInternational(valstr));//No I18N
			if(this.getData('cxPropSpecifiedCondition')){
				this.criteriaOption('specified');
			}
			this.updateCriteriaRowsConditionBasedOnChangedPattern(this.getData('criteria')); //no i18n
			return valstr;
		}
	},
	updateCriteriaRowsBasedOnChangedPattern : function(str){
		var criteriaObj = {}
		for(var i=0;i<this.getData('totalCriteria');i++){
			var checkObj = this.$node.getElementsByTagName('crux-criteria-editor-header')[i].component.getValue(true);
			criteriaObj[this.data.rowNumberArray[i]] = checkObj;
		}
		var row = str.match(/[0-9]+/g)
		row.forEach(function(item,index){row[index] = parseInt(item)})
		this.setData('rowNumberArray',row); //no i18n
		var criteriaArray = [];
		for(var i =0;i<row.length;i++){
			criteriaArray[i] = criteriaObj[row[i]-1];
			this.$node.getElementsByTagName('crux-criteria-editor-header')[i].component.setCriteria(criteriaObj[row[i]]);
		}
	},
	updateCriteriaRowsConditionBasedOnChangedPattern : function(str){
		var c=[" "];
		var n = str.match(/(and|or)/gi);
		var d=[" "];
		var s=[" "];
		var nLength= n.length;
		for(var i=0;i<nLength;i++){
			if(n[i]=="or"){
				s.push('or')
				c.push(_cruxUtils.getI18n("or"))
				d.push(_cruxUtils.getI18n("crm.label.or"));
			}else if(n[i]=="and"){
				s.push('and')
				c.push(_cruxUtils.getI18n("and"))
				d.push(_cruxUtils.getI18n("crm.label.and"));
			}
		}
		this.setData('pattern',s);//No I18N
		this.setData('patternArr',c) //No I18N
		this.setData('patternArrDis',d); //No I18N
	},
	processDisabledCriteria : function(criteria,opt,operator,index){
		if(criteria.indexOf(this.data.disabledPattern) > -1){
			criteria = criteria.replace(this.data.disabledPattern,'');
			criteria = criteria.cruxReplaceIndex(criteria.lastIndexOf(this.data.endDisabledPattern),'');
			if(opt === 'add'){
				criteria = '('+criteria+operator+index+')';
			}
			this.setData('subCriteriaEditPattern',criteria);
			return this.data.disabledPattern + this.data.subCriteriaEditPattern + this.data.endDisabledPattern;
		}
		if(opt === 'add'){
			criteria = '('+criteria+operator+index+')';
		}
		return criteria;
	},
	criteriaOption : function(func,index){
		var pattern = this.getData("pattern");//No I18N
		var criteria = this.getData('criteria');//No I18N
		if(func=='add'){
			if(this.data.cxPropDisabledRows){
				criteria = this.processDisabledCriteria(criteria,'add',pattern[index-1],index);
			}else{
				criteria='('+criteria+pattern[index-1]+index+')';
			}
		}else if(func == 'remove'){//No I18N
			// var t=0;
			// var criteria=' '+criteria+' ';
			// var removed = Lyte.arrayUtils(this.getData('rowNumberArray'),"removeAt",index-1)[0]//No I18N
			// this.data.rowNumberArray.forEach(function(item,index){
			// 	if(item > removed){
			// 		Lyte.arrayUtils(this.data.rowNumberArray,'replaceAt',index,item-1);//No I18N
			// 	}
			// }.bind(this))
			// var replacei=removed+' ';
			// criteria=criteria.replace(/(and|or)/g, "#");
			// criteria = criteria.replace(/#/g, function (match) {
			// t++;
			// return (t === (index!=1?(index-1):index)) ? "" : match;
			// });

			// var re = new RegExp(replacei,"g");
			// criteria=criteria.replace(re, "");

			// var t=0;
			// criteria = criteria.replace(/#/g, function (match) {
			// t++;
			// return (t <= pattern.length) ? pattern[t] : match;
			// });

			// var t=0;
			// criteria = criteria.replace(/[0-9]/g, "#");
			// criteria = criteria.replace(/##/g,'#');
			// criteria = criteria.replace(/ /g,"");
			// while(criteria.match(/#\(/)){
			// 	criteria = criteria.replaceAll(/#\(/g,function(str){
			// 	    str = str.replace('(',"");
			// 	    str = '('+str
			// 	    return str
			// 	});
			// }
			// criteria = criteria.replace(/#/g, function (match) {
			// 	return (t <= criteria.match(/#/g).length) ? this.data.rowNumberArray[t++] : match;
			// }.bind(this));
			var criTree = this.formCriteriaTree(criteria,this.data.rowNumberArray)
			var removed = Lyte.arrayUtils(this.getData("rowNumberArray"), "removeAt", index - 1)[0];
			criTree = this.removeCriteriaFromTree(criTree,removed)
			this.data.rowNumberArray.forEach(function(item,index){
				if(item > removed){
					Lyte.arrayUtils(this.data.rowNumberArray,'replaceAt',index,item-1);//No I18N
				}
			}.bind(this))
			criteria = this.convertGroupToString(criTree);
			var t=0;
			criteria = criteria.replace(/[0-9]/g, "#");
			criteria = criteria.replace(/##/g,'#');
			criteria = criteria.replace(/ /g,"");
			criteria = criteria.replace(/#/g, function (match) {
				return (t <= criteria.match(/#/g).length) ? this.data.rowNumberArray[t++] : match;
			}.bind(this));

		}else if(func =='mod'){//No I18N
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}else if(func == 'specified'){ //no i18n
			criteria=criteria.replace(/(and|or)/g, "#");
			var t=0;
			criteria = criteria.replace(/#/g, function (match) {
			t++;
			return (t <= pattern.length) ? pattern[t] : match;
			});
		}
		criteria=criteria.replace(/ /g,"");
		while(criteria.match(/\(\)/g,"")){
		    criteria=criteria.replace(/\(\)/g,"")
		}
		criteria=this.addSpaceBetweenParanthesis(criteria);
		if(func !== 'add' && this.data.cxPropDisabledRows){
			criteria = this.processDisabledCriteria(criteria);
		}
		this.setData('criteria',criteria);//No I18N
		this.setData('patternCriteria',this.changeToInternational(criteria));//No I18N
	},
	showAlert : async function(msg){
		var check=true;
		if(this.getMethods('onBeforeErrorAlert')){
			/**
			 * @method onBeforeErrorAlert
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } errorMessage
			 */
			check= await this.executeMethod('onBeforeErrorAlert',msg);//No I18N
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		}
		if(check){
				_cruxUtils.showCustomAlert(
				{ 
				params : { 
					cxPropYield : true,
					cxPropHeading : msg, 
					cxPropButtonPosition : 'center',
					id : "patternWarning",
					ltPropOutputNode : this.$node.querySelector('.cxCriteriaWrapper'), //eslint-disable-line @zoho/webperf/no-global-variables
					cxPropButtons : [{"type":"accept","text":_cruxUtils.getI18n('crm.mb.newversion.msg4'),"appearance":"primary", "cxPropZcqa": "button_primary"}]
				},
				accept : function(){
					if(this.showValueError){
						var inputElem = this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input');  //eslint-disable-line @zoho/webperf/no-complex-selector 
						var dropdownElem = this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown'); //eslint-disable-line @zoho/webperf/no-complex-selector 
						if(inputElem){
							inputElem.focus(); 
						}
						else if(dropdownElem){
							dropdownElem.focus(); //no i18n
						}
						this.showValueError = false;
					}else if(this.data.showEdit){
						if(this.data.cxPropDisabledRows){
							this.$node.querySelector('.cxCriteriaEditorPatternInput .cxCriterEditorWrapper').focus(); //eslint-disable-line @zoho/webperf/no-complex-selector
						}else{
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
							this.$node.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus(); //eslint-disable-line @zoho/webperf/no-complex-selector
						}
						
					}
				}.bind(this)});	
			// var alert=this.$node.querySelector('#patternWarning'); //No I18N
			// this.setData('alertMsg',msg); //No I18N
			// alert.ltProp('show',true); //No I18N
			if(this.getMethods('onErrorAlert')){
				/**
				 * @method onErrorAlert
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } errorMessage
				 */
				this.executeMethod('onErrorAlert',msg);//No I18N
			}
		}
	},
	showErrorInPattern : function(error){
		this.setData('showPatternError',error);
	},
	getCriteria : function(opt){
		if(this.getData('showEdit')){
			return false;
		}
		this.setData('bufferCriteriaMeta',[]); //no i18n
		var criteria=[],setCriteriaObj=[],patterSet=[],headerNodes = this.$node.querySelector('#criteriaDiv').querySelectorAll(':scope > crux-criteria-editor-header'),removedCriteriaRows = [],criteriaFlag = true;;
		var skiVal = opt && opt.skipValidation;
		for(var i=0,j=1;i<this.getData('totalCriteria');i++,j++){

			var checkObj = headerNodes[i].component.getValue(skiVal,!skiVal && this.data.cxPropCriteriaForValue,this.data.cxPropShowInlineErrorMessage)
			if(checkObj == false || typeof checkObj == 'undefined'){
				if(this.data.cxPropCriteriaForValue){
					_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
					if(checkObj == false){
						return false;
					}
					removedCriteriaRows.push(i+1);
					continue;
				}else{
					if(!this.data.cxPropShowInlineErrorMessage){
						return checkObj;
					}else if(typeof checkObj == 'undefined'){
						return undefined
					}
					if(criteriaFlag){
						headerNodes[i].scrollIntoView()
					}
					criteriaFlag = checkObj;
				}
			}else{			
				var selectedField = checkObj.fieldRecord;
				var selectedSecField =  null;
				if(checkObj.value && checkObj.value.fieldRecord){
					selectedSecField = checkObj.value.fieldRecord
					delete checkObj.value.fieldRecord;
				}
				delete checkObj.fieldRecord;
				if(this.getMethods('changeCriteriaObject') && checkObj){
					checkObj = this.executeMethod('changeCriteriaObject',checkObj,i,selectedField,selectedSecField); //no i18n  
				}
				if(checkObj.group_operator){
					patterSet.push({condition1 : j,condition2 : j+1})
					j++;
				}
				checkObj && criteria.push(checkObj);
			}
		}
		if(criteria.length == 0){
			return false;
		}
		if(!criteriaFlag){
			return criteriaFlag;
		}
		if(this.getMethods('serializeCriteriaObject')){
			criteria = this.executeMethod('serializeCriteriaObject',criteria);
		}
		var a=this.getData('criteria');//No I18N
		if(opt && opt.coql){
			a = a.replace(new RegExp(/\d+/g),(item)=>{
				return this.convertCriteriaToCoql(criteria[item-1]);
			});
			return {columns : '',condition : a};
		}
		if(removedCriteriaRows.length){
			var tempCriteria = this.formCriteriaTree(a);
			removedCriteriaRows.forEach(function(item){
				tempCriteria = this.removeCriteriaFromTree(tempCriteria,item)
			}.bind(this))
			a = this.convertGroupToString(tempCriteria);
			var i=1;
			a = a.replaceAll(new RegExp(/\d+/g),function(){
			    return i++
			})
		}
		if(this.data.cxPropCriteriaFormat == 'relatedModuleChildCriteria'){
			node={}
			node.cxCriteria = criteria;
		}else{
			node = this.formCriteriaTree(a,criteria)
		}
		this.setCriteriaFromComp = true;
		this.setData('cxPropSetCriteria',node); //no i18n
		this.setData('cxPropCriteriaMeta',this.data.bufferCriteriaMeta); //no i18n
		this.setData('setCriteriaObj',criteria); //No I18N
		if(patterSet.length && this.data.cxPropCriteriaFormat){
			return {pattern : patterSet,criteria : node}
		}
		return node;
	},
	setCriteria : function(criteria){
		this.setData('arr',[]); //no i18n
		this.setData('rowNumberArray',[]); //no i18n
		this.internalRowObj = undefined;
		var andOr;
		var fields = this.getData("cxPropFields");//No I18n
		var _this = this
		if(criteria && Object.keys(criteria).length > 0){
			var specialPattern = criteria.pattern ? criteria.pattern : undefined;
			var specialCriteria = this.data.cxPropCriteriaFormat;
			var flagIndex = 0;
			this.setData('cxPropEmptyShowYield',false); //no i18n
			this.setData('dxHubViewError',false);
			try{
				criteria = JSON.parse(JSON.stringify(criteria.criteria ? criteria.criteria : criteria));
			}catch(e){
				criteria = criteria.criteria ? criteria.criteria : criteria;
			}
			function BinaryTree(val,andOr,criteria){
				this.checkForSpecialCriteria = function(val){
					if(specialCriteria && specialCriteria == 'quoteLineItem'){
						if(criteria && criteria.length+1 == specialPattern[flagIndex].condition1-flagIndex && !val.group[0].group_operator && !val.group[1].group_operator){
							flagIndex++;
							return false;
						}
					}
					if(val.group[0].field && val.group[1].field && val.group[0].field.api_name.match(/Tag/) && val.group[1].field.api_name == 'Activity_Type'){
						return false;
					}
					if(val.group[0] && val.group[0].api_name && _this.data.cxPropPrefixArray.cruxFindIndexOfObject('apiValue',val.group[0].api_name) > -1){
						return false
					}
					return true;
				}
				if(val.group_operator && this.checkForSpecialCriteria(val)){
					this.left= new BinaryTree(val.group[0],andOr,criteria);
					this.right=new BinaryTree(val.group[1],andOr,criteria);
					this.value=val.group_operator.trim().toLowerCase();
					andOr.push(val.group_operator)
				}else{
					criteria.push(val);
					this.value=criteria.length;
					this.left = null
					this.right = null
				}
			    this.andOr=andOr;
				this.criteria = criteria;
			}
			var setCriteriaObj;
			if(this.data.cxPropCriteriaFormat == 'relatedModuleChildCriteria'){
				setCriteriaObj = criteria.cxCriteria;
				andOr = [];
				criteria.cxCriteria.forEach(()=>{
					andOr.push('and');
				});
				andOr.pop();
			}else{
				var tree = new BinaryTree(criteria,[],[]);
				s=this.inorder(tree,'');
				andOr = s.match(/and|or/g) ? s.match(/and|or/g) : s.match(/AND|OR/g);
				setCriteriaObj = tree.criteria;
			}
			if(this.getMethods('normalizeCriteriaObject')){
				setCriteriaObj = this.executeMethod('normalizeCriteriaObject',setCriteriaObj);
			}
			this.setData('setCriteriaObj',setCriteriaObj); //No I18N
			if(this.data.cxPropCriteriaFormat != 'relatedModuleChildCriteria'){
				this.setData('criteria',this.addSpaceBetweenParanthesis(s)); //No I18N
				if(this.data.cxPropDisabledRows){
					this.processDisabledCriteria(this.data.criteria);
				}
				this.setData('patternCriteria',this.changeToInternational(s)); //no getI18n
			}
			this.setData('totalCriteria',setCriteriaObj.length); //No I18N
		}else{
			if(this.getData('cxPropType') == 'view'){
				this.setData('cxPropEmptyShowYield',true); //no i18n
				if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
					this.setData('dxHubViewError',true);
				}
			}
			patternCriteria = ["1", undefined, 1];
			this.setData('criteria',patternCriteria[0]); //No I18N
			this.setData('setCriteriaObj',patternCriteria[1]); //No I18N
			this.setData("totalCriteria", patternCriteria[2]);//No I18N
		}
		if(this.data.totalCriteria > this.data.cxPropMaxCount && (_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
			this.setData('dxHubLimitCheck',true);
		}else{
			this.setData('dxHubLimitCheck',false)
		}
		if(andOr != null){
			var andOrLength = andOr.length;
			for(var i=0;i<andOrLength;i++){
				andOr[i]=andOr[i].replace(/"/g,'');
				if(andOr[i].trim().toLowerCase() == "and"){
					Lyte.arrayUtils(this.getData("pattern"),"push",'and');//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",_cruxUtils.getI18n("crm.label.and"));//No I18N
					Lyte.arrayUtils(this.getData("patternArr"),"push",_cruxUtils.getI18n("and"));//No I18N

				}else if(andOr[i].trim().toLowerCase() == "or"){
					Lyte.arrayUtils(this.getData("pattern"),"push",'or');//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",_cruxUtils.getI18n("crm.label.or"));//No I18N
					Lyte.arrayUtils(this.getData("patternArr"),"push",_cruxUtils.getI18n("or"));//No I18N
				}
			}
		}
		if(this.getData("totalCriteria") == 0){
			this.setData({criteria : "1", setCriteriaObj : undefined, totalCriteria : 1});
		}

		for(var i=0;i<this.getData('totalCriteria');i++){
			Lyte.arrayUtils(this.getData("arr"), "push", i+1);//No I18N
			Lyte.arrayUtils(this.getData("rowNumberArray"), "push", i+1);//No I18N
		}
		this.internalRowObj = this.data.totalCriteria;
	},
	createNewCriteriaFn : async function(){
		var check=true;
		var count=this.getData('totalCriteria');//No I18N
		if(this.getMethods('onBeforeAddCriteria')){
			/**
			 * @method onBeforeAddCriteria
			 * @author authorName
			 * @version 1.0.0
			 * @param { * } count
			 */
			check= await this.executeMethod('onBeforeAddCriteria',count+1);//No I18N
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		}
		if(check){
			if(this.getData('showEdit')){
				var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
				this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			}else{
				if(count>=this.getData('cxPropMaxCount')){
					this.showAlert(_cruxUtils.getI18n('crm.criteria.max.rowcnt.exceeds')); //No I18N
				}else{
					Lyte.arrayUtils(this.getData('pattern'),'push',this.getData('defaultCond'));//No I18N
					Lyte.arrayUtils(this.getData("patternArrDis"),"push",this.getData('defaultLabelCondition'));//No I18N
					count+=1;
					this.internalRowObj+=1
					Lyte.arrayUtils(this.getData("patternArr"),"push",this.getData('defaultCondition'));//No I18N
					Lyte.arrayUtils(this.getData("arr"), "push", count);//No I18N
					Lyte.arrayUtils(this.getData("rowNumberArray"), "push", count);//No I18N
					this.setData("totalCriteria", count);//No I18N
					this.criteriaOption("add",count);
					if(this.getMethods('onAddCriteria')){
						/**
						 * @method onAddCriteria
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } count
						 */
						this.executeMethod('onAddCriteria',count);//No I18N
					}
					if(this.getMethods('onChange')){
						/**
						 * @method onChange
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } typeOfChange, arguments
						 */
						this.executeMethod('onChange','New Criteria Added',count); //no i18n
					}
				}
			}
			return false;
		}
	},
	removeCriteriaFn : async function(a){
		var check=true;
			var count=this.getData('totalCriteria');//No I18N
			if(this.getMethods('onBeforeDeleteCriteria')){
				/**
				 * @method onBeforeDeleteCriteria
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } count
				 * @param { * } criteriaRow
				 * @param { * } selectedFieldsArray
				 */
				check= await this.executeMethod('onBeforeDeleteCriteria',count,a,this.data.selectedFieldArray[a-1]);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				if(this.getData('showEdit')){
					var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
					this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
				}else{
					count-=1;
					this.setData("totalCriteria", count);//No I18N
					Lyte.arrayUtils(this.getData('patternArrDis'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData('patternArr'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData('pattern'),"removeAt",(a!=1)?a-1:a);//No I18N
					Lyte.arrayUtils(this.getData("arr"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("selectedFieldArray"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("selectedSecFieldArray"), "removeAt", a-1);//No I18N
					Lyte.arrayUtils(this.getData("criteriaArrayObject"),"removeAt",a);//No I18N
					if(this.getData('setCriteriaObj') && this.getData('setCriteriaObj')[(a!=1)?a-1:a]){
						Lyte.arrayUtils(this.getData("setCriteriaObj"),"removeAt",(a!=1)?a-1:a);//No I18N
					}
					this.criteriaOption("remove",a);//No I18N
					if(this.getMethods('onDeleteCriteria')){
						/**
						 * @method onDeleteCriteria
						 * @author authorName
						 * @version 1.0.0
						 * @param { * } count, indexToBeRemoved
						 */
						this.executeMethod('onDeleteCriteria',count+1,a);//No I18N
					}
					if(this.getMethods('onChange')){
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
						this.executeMethod('onChange','Criteria Deleted',count+1); //no i18n
					}
				}
			}
			return false;
	},
	actions : {
		createNewCriteria : function(){
			this.createNewCriteriaFn();
			return false;
		},
		removeCriteria : function(a){
			this.removeCriteriaFn(a);
			return false;
		},
		openEditCriteria : async function(thisObj){
			var check=true;
			if(this.getMethods('onBeforeEditPattern')){
				/**
				 * @method onBeforeEditPattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern
				 */
				check= await this.executeMethod('onBeforeEditPattern',this.getData('criteria'));//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				// this.setData('editPatternNode',this.formCriteriaTree());//No I18N
				this.setData('bufferCriteria',this.getData('criteria'));//No I18N
				var patternTextHeight;
                if(this.getData('cxPropAppearance') == 'box') {
                    patternTextHeight = $L(thisObj).prev().height();
                }
				this.setData('showEdit',true);//No I18N
				if(this.data.cxPropDisabledRows){
					this.setData({
						disabledPatternInternational : this.changeToInternational(this.data.disabledPattern),
						subCriteriaEditPatternInternational : this.changeToInternational(this.data.subCriteriaEditPattern),
						endDisabledPatternInternational : this.changeToInternational(this.data.endDisabledPattern)
					});
				}
				if(this.getData('cxPropAppearance') === 'box' && !this.data.cxPropDraggablePattern && this.data.cxPropDisabledRows === 0) {
                    var criteriaPatternTextarea = $L(this.$node).find('.criteriaPatternText')[0];
                    criteriaPatternTextarea.setData('ltPropHeight', (patternTextHeight+15)+'px');    //No I18N
                    criteriaPatternTextarea.focus();
                }
				// this.setData('criteriaEditPattern',this.getData('patternCriteria').split(' ')); //NO I18N
				// this.setData('editPatternCriteriaArray',[].concat(this.getData('pattern'))); //NO I18N
				// this.sortableEditPattern();
				if(this.getMethods('onEditPattern')){
					/**
					 * @method onEditPattern
					 * @author authorName
					 * @version 1.0.0
					 * @param { * } newCriteriaPattern
					 */
					this.executeMethod('onEditPattern',this.getData('criteria'));//No I18N
				}
			}
		},
		// editPatternConditionChange : function(item,index){
		// 	if(item == _cruxUtils.getI18n('and')){
		// 		Lyte.arrayUtils(this.data.criteriaEditPattern,'replaceAt',index,_cruxUtils.getI18n('or')); //NO I18N
		// 	}else if(item == _cruxUtils.getI18n('or')){ //NO I18N
		// 		Lyte.arrayUtils(this.data.criteriaEditPattern,'replaceAt',index,_cruxUtils.getI18n('and')) //NO I18N
		// 	}
		// },
		closeEditCriteria : function(){
			var txt=this.getData('criteria'); //no i18n
			this.setData('criteria',this.getData('bufferCriteria')); //NO I18N
			this.setData('patternCriteria',this.changeToInternational(this.getData('criteria'))); //no i18n
			this.setData('showEdit',false);//No I18N
			this.setData('showPatternError',undefined);
			if(this.getMethods('onCancelPattern')){
				/**
				 * @method onCancelPattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern
				 */
				this.executeMethod('onCancelPattern',txt);//No I18N
			}
		},
		saveCriteriaPattern : async function(){
			var check=true;
			if(this.data.cxPropDisabledRows){
				this.setData('patternCriteria',this.$node.querySelector('.cxCriteriaEditorPatternInput .cxCriterEditorWrapper').innerText.replaceAll('\n',''));
			}
			if(this.getMethods('onBeforeSavePattern')){
				/**
				 * @method onBeforeSavePattern
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaPattern, editedCriteriaPattern
				 */
				check=await this.executeMethod('onBeforeSavePattern',this.getData('criteria'),this.data.patternCriteria);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check){
				// var criteria = JSON.parse(JSON.stringify(this.data.editPatternNode));
				// function BinaryTree(val,criteria){
				// 	if(val.group_operator){
				// 			this.left= new BinaryTree(val.group[0],criteria);
				// 			this.right=new BinaryTree(val.group[1],criteria);
				// 			this.value=val.group_operator.trim().toLowerCase();
				// 	}else{
				// 		criteria.push(parseInt(val));
				// 		this.value=parseInt(val);
				// 		this.left = null
				// 		this.right = null
				// 	}
				// 	this.criteria = criteria;
				// }
				// var tree = new BinaryTree(criteria,[]);
				

				if(this.data.cxPropDraggablePattern){
					var s = $L('crux-pattern-editor',this.$node)[0].getPattern()
					s=this.changeToInternational(s);
					this.setData('patternCriteria',s);//No I18N
				}
				if(this.getMethods('onSavePatternChanges')){
					this.setData('patternCriteria',this.executeMethod('onSavePatternChanges',this.data.criteria,this.data.patternCriteria));
				}
				var txt = this.changeToDeveloper(this.getData('patternCriteria'));//No I18N
				var t=this.savePattern(txt);

				if(this.getData('shownAlert')){
					this.setData('shownAlert',false);//No I18N
				}else{
					this.setData('showEdit',false);//No I18N
					if(this.getMethods('onSavePattern')){
						/**
						 * @method onSavePattern
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } criteriaPattern
						 */
						this.executeMethod('onSavePattern',this.getData('criteria'));//No I18N
					}
					if(this.getMethods('onChange')){
						this.executeMethod('onChange','Pattern Edited',this.getData('criteria')); //no i18n
					}
				}
			}
		},
		openHelp : function(){
			if(this.data.cxPropHelpUrl){
				open(this.data.cxPropHelpUrl)
			}else{
				if(Lyte.Component.registeredHelpers.getHelpUrl){
					open(Lyte.Component.registeredHelpers.getHelpUrl('help.change.criteria.pattern')); //no i18n
				}
			}
		},
		changeAndOr : async function(cond,i){
			var check=true;
			if(this.getMethods('onBeforeConditionChange')){
				/**
				 * @method onBeforeConditionChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } condition
				 */
				check= await this.executeMethod('onBeforeConditionChange',i,cond);//No I18N
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			}
			if(check && !this.getData('cxPropSpecifiedCondition') && !this.getData('showEdit')){
				var push,disPush;
				if(cond==_cruxUtils.getI18n("crm.label.or")){
					pu = 'and';//No I18N
					disPush = _cruxUtils.getI18n("crm.label.and")//No I18N
					push=_cruxUtils.getI18n("and")//No I18N
				}
				else if(cond==_cruxUtils.getI18n("crm.label.and")){
					pu = 'or';//No I18N
					push=_cruxUtils.getI18n("or");//No I18N
					disPush=_cruxUtils.getI18n("crm.label.or");//No I18N
				}
				Lyte.arrayUtils(this.getData('pattern'),'replaceAt',i-1,pu);//No I18N
				Lyte.arrayUtils(this.getData('patternArr'),'replaceAt',i-1,push);//No I18N
				Lyte.arrayUtils(this.getData('patternArrDis'),'replaceAt',i-1,disPush);//No I18N
				this.criteriaOption("mod",i);
				if(this.getMethods('onConditionChange')){
					/**
					 * @method onConditionChange
					 * @author authorName
					 * @version 1.0.0
					 * @param { * } criteriaRow
					 * @param { * } condition
					 */
					this.executeMethod('onConditionChange',i,cond);//No I18N
				}
				if(this.getMethods('onChange')){
					this.executeMethod('onChange','Group Operator Edited',i,cond); //no i18n
				}
			}
			if(this.getData('showEdit')){
				var error = _cruxUtils.getI18n("crm.alert.label.savepattern")
				this.data.cxPropShowInlineErrorMessage ? this.showErrorInPattern(error) : this.showAlert(error); //No I18N
			}
			return false;
		},
		alertEvent : function(msg,prefix,index){
			if(prefix && index && this.getMethods('setPrefixError')){
				this.showAlert(this.executeMethod('setPrefixError',prefix,index)); //no i18n
			}else{
				this.showAlert(msg);
			}
			return false;
		},
		patternKeyDown : function(event){
			if(event.key === 'Backspace' || [37,38,39,40].indexOf(event.keyCode) > -1){
				return;
			}
			var mat = event.key.match(new RegExp(/[^(andor0-9\s)]/g));
			if(mat && mat.length > 0){
				event.preventDefault();
			}
		},
		patternPaste : function(event){
			if(event.clipboardData.getData('text').match(new RegExp(/[^(andor0-9\s)]/g)).length > 0){
				event.preventDefault();
			}
		},
		patternFocused : function(node){
			node.querySelector('.cxCriterEditorEditiableContent').focus();
		}
	},
	methods : {
		onFieldChangeCall :function(a,b,c){
			if(this.getMethods('onFieldChange')){
				/**
				 * @method onFieldChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } field_label
				 * @param { * } fieldObject
				 */
				return this.executeMethod('onFieldChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Field Edited',a,b,c); //no i18n
			}
		},
		onFieldSetCall : function(index,field_label,field){
			if(this.getMethods('onFieldSet')){
				return this.executeMethod('onFieldSet',index,field_label,field); //no i18n
			}
		},
		onConditionSetCall : function(index,condition,field){
			if(this.getMethods('onConditionSet')){
				return this.executeMethod('onConditionSet',index,condition,field); //no i18n
			}
		},
		onOperatorChangeCall :function(a,b,c,field){
			if(this.getMethods('onOperatorChange')){
				/**
				 * @method onOperatorChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } comparatorName
				 * @param { * } comparatorObject
				 * @param { * } field
				 */
				return this.executeMethod('onOperatorChange',a,b,c,field);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Comparator Edited',a,b,c); //no i18n
			}
		},
		onValueChangeCall : function(){
			if(this.getMethods('onValueChange')){
				/**
				 * @method onValueChange
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } value
				 */
				this.executeMethod('onValueChange',arguments[0],arguments[1]);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Value Edited',arguments[0],arguments[1]); //no i18n
			}
		},
		onSecFieldChangeCall : function(index,field_label,field){
			if(this.getMethods('onSecondaryFieldChange')){
				/**
				 * @method onSecondaryFieldChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } field_label
				 * @param { * } fieldObject
				 */
				this.executeMethod('onSecondaryFieldChange',index,field_label,field);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Secondary Field Edited',index,field_label,field); //no i18n
			}
		},
		onFieldDropdownOpenCall : function(a,b){
			if(this.getMethods('onFieldDropdownOpen')){
				/**
				 * @method onFieldDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onFieldDropdownOpen',a,b);//No I18N
			}
		},
		onConditionDropdownOpenCall : function(a,b){
			if(this.getMethods('onConditionDropdownOpen')){
				/**
				 * @method onConditionDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode	
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onConditionDropdownOpen',a,b);//No I18N
			}
		},
		onSecFieldDropdownOpenCall : function(a,b){
			if(this.getMethods('onRelatedFieldDropdownOpen')){
				/**
				 * @method onRelatedFieldDropdownOpen
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onRelatedFieldDropdownOpen',a,b);//No I18N
			}
		},
		onFieldDropdownHideCall : function(a,b){
			if(this.getMethods('onFieldDropdownHide')){
				/**
				 * @method onFieldDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onFieldDropdownHide',a,b);//No I18N
			}
		},
		onConditionDropdownHideCall : function(a,b){
			if(this.getMethods('onConditionDropdownHide')){
				/**
				 * @method onConditionDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onConditionDropdownHide',a,b);//No I18N
			}
		},
		onAgeInConditionChangeCall : function(a,b,c){
			if(this.getMethods('onAgeInConditionChange')){
				/**
				 * @method onAgeInConditionChange
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } criteriaRow
				 * @param { * } condition
				 * @param { * } conditionObject
				 */
				this.executeMethod('onAgeInConditionChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Age In Condition Changed',a,b,c); //no i18n
			}
		},
		onChangePreviousNextConditionCall : function(a, b, c){
			if(this.getMethods('onChangePreviousNextConditionChange')){
				this.executeMethod('onChangePreviousNextConditionChange',a,b,c);//No I18N
			}
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Previous Next Condition Changed',a,b,c); //no i18n
			}
		},
		onSecFieldDropdownHideCall : function(a,b){
			if(this.getMethods('onRelatedFieldDropdownHide')){
				/**
				 * @method onRelatedFieldDropdownHide
				 * @author authorName
				 * @version 1.0.0
				 * @param { * } dropdownNode
				 * @param { * } criteriaRow
				 */
				this.executeMethod('onRelatedFieldDropdownHide',a,b);//No I18N
			}
		},
		criteriaArrayObjectUpdate:function(criteriaArray,criteriaIndex){
			var criteriaArrayObject=this.getData('criteriaArrayObject');//No I18N
			criteriaArrayObject[criteriaIndex]=criteriaArray;
			this.setData('criteriaArrayObject',criteriaArrayObject);//No I18N
		},
		setConditions: function (type, comp, field, dynamicValue, index) {
			if((type == 'picklist' || type == "multiselectpicklist" || type == 'user') && (this[type+'Conditions']==undefined || this[type+'Conditions'].length == 0)){
				type = type == 'user' ? 'defWithEmptyUser' : 'text'; //no i18n
			}
			type = type+'Conditions'; //No I18N
			var conditions = type != 'noneConditions' ? Array.from(this[type]) : [{system : "None", display : _cruxUtils.getI18n("None")}]//No I18N
			if(typeof cruxAssets != "undefined"){
				if(field && field.cxDynamicFilterCriteriaComponent && cruxAssets.getDynamicFilterCriteriaCondtions){
					conditions = cruxAssets.getDynamicFilterCriteriaCondtions(field,conditions,dynamicValue,comp,this.$node.cxProp());
				}else if(cruxAssets.setFieldBasedComparator){
					conditions = cruxAssets.setFieldBasedComparator(field,conditions,dynamicValue,index,comp,this.$node.cxProp());
				}
			}
			if(this.getMethods('setFieldBasedComparator') && field){
				conditions = this.executeMethod('setFieldBasedComparator',field,conditions,dynamicValue,index); //no i18n
			}
			if(comp){
				for(var i=0;i<conditions.length;i++){
					if(conditions[i].system == comp){
						var cond=[];
						cond.push(conditions[i])
						return cond
					}
				}
			}
			return conditions;
		},
		getFieldsForHeader : function(arg,rowNum,selectedArray,developerArgs){
			if(selectedArray){
				return this.getDropdownData(-1,selectedArray,developerArgs,undefined,rowNum)
			}else{
				if(arg){
					if(this.getData('cxPropFields')[0].cxPropType === 'group'){
						return this.getData('cxPropFields')[0].cxPropFields[0]
					}
					return this.getData('cxPropFields')[0]; //no i18n
				}else{
					var fields = this.getData('cxPropFields')
					if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
						fields = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(fields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
					}
					if(this.getMethods('onBeforeFieldDropdown')){
						/**
						 * @method onBeforeFieldDropdown
						 * @author naveen.winson
						 * @version 1.0.0
						 * @param { * } fields
						 * @param { * } criteriaRow
						 * @param { * } selectedFieldArray
						 * @param { * } selectedRelatedFieldArray
						 */
						return this.executeMethod('onBeforeFieldDropdown',fields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
					}
					return fields;//No I18N
				}
			}

		},
		getRelatedFields : function(arg,rowNum,field,comp){
			if(!field){
				// return this.data.cxPropSecondaryFields.filter(function(item){return item.id == arg.id})[0];
				try{
					return this.getSelectedField(arg,this.data.cxPropSecondaryFields);
				}catch(e){
					console.warn('cxPropSecondaryFields does not contain the selected secondary field'); //no i18n
					return;
				}
			}
			if(arg != "none"){
				if(arg == 'formula'){
					arg = field.formula.return_type;//no i18n
				}
				if(arg == 'rollup_summary'){
					arg = field.rollup_summary.return_type;//no i18n
				}
				var secondaryFields=[];
				if(this.data.cxPropDataTypeMapping && this.data.cxPropDataTypeMapping[arg]){
					this.data.cxPropDataTypeMapping[arg].forEach(function(item){
						if(!this._relatedField[item]){
							this._relatedField[item] = this.splitRelatedFields(item,this.data.cxPropSecondaryFields)	
						}
						// secondaryFields = secondaryFields.concat(this._relatedField[item])
						secondaryFields = this.mergeRelatedFields(secondaryFields,this._relatedField[item])
					}.bind(this));
				}else{
					if(!this._relatedField[arg]){
						this._relatedField[arg] = this.splitRelatedFields(arg,this.data.cxPropSecondaryFields)	
					}
					secondaryFields = this._relatedField[arg]
				}
				if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
					secondaryFields = cruxAssets.onBeforeCruxCriteriaSecondaryFieldDropdownOpen(secondaryFields,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
				}
				if(this.getMethods('onBeforeSecondaryFieldDropdown')){
					return this.executeMethod('onBeforeSecondaryFieldDropdown',secondaryFields,rowNum,arg,field,comp); //no i18n
				}
				return secondaryFields;
			}
			return [{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}]; //no i18n
		},
		valueErrorCall : function(index,msg,prefix){
			if(prefix){
				if(this.getMethods('setPrefixError')){
					msg = this.executeMethod('setPrefixError',prefix,index); //no i18n
				}
				if(this.data.cxPropShowInlineErrorMessage){
					return msg;
				}else{
					this.showAlert(msg);
				}
			}else{
				this.showValueError = true;
				this.setData('rowValueError',index); //no i18n
				this.showAlert(msg);
			}
		},
		// alertClosed : function(){
		// 	if(this.showValueError){
		// 		if(this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input')){
		// 			this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent input').focus(); //no i18n
		// 		}
		// 		else if(this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown')){
		// 			this.$node.querySelector('#criteriaEditorHeader'+this.getData("rowValueError")+' #elementComponent lyte-dropdown').focus(); //no i18n
		// 		}
		// 		this.showValueError = false;
		// 	}else if(this.data.showEdit){
		// 		this.$node.querySelector('.cxCriteriaEditorPatternInput lyte-input').focus()
		// 	}
		// },
		sendPrefixValues : function(index,selectedArray,developerArgs,change,forceFetch,criteriaRow){
		_cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
			if(this.getMethods('onChange') && change){
				this.executeMethod('onChange','Prefix Dropdown Selected'); //no i18n
			}
			return this.getDropdownData(index,selectedArray,developerArgs,forceFetch,criteriaRow);
		},
		prefixChangedFn : function(){
		    _cruxUtils.addMurhyInfo("crux-criteria-editor.js", "Feb Default Changes");
			if(this.getMethods('onChange')){
				this.executeMethod('onChange','Prefix Dropdown Selected'); //no i18n
			}
		},
		sendPrefixArray : function(index,selectedArray,developerArgs,criteriaIndex){
			return this.executeMethod('getNextPrefixDrop',developerArgs[0],criteriaIndex);
		},
		setCriteriaObjectField : function(criteria){
			try{
				if(criteria.field instanceof Record){
					return;
				}
			}catch(e){}
			if(this.data.cxPropFields && this.data.cxPropFields.length){
				try{
					if(criteria.field.api_name == 'None' || criteria.field.id == '-1'){
						criteria.field = {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"};
					}else{
						// criteria.field = this.data.cxPropFields.filter(this.filterFunction.bind(this,criteria.field))[0]
						var selField = this.getSelectedField(criteria.field,this.data.cxPropFields);
						if(!selField){
							console.error('cxPropFields does not contain the selected criteria field'); //no i18n
						}else{
							criteria.field = selField;
						}
					}
				}catch(e){
					console.warn('cxPropFields does not contain the selected criteria field'); //no i18n
				}
			}else{
				if(criteria.field.data_type && criteria.field.data_type == 'lookup'){
					criteria.field.api_name = criteria.field.api_name.substr(0,criteria.field.api_name.lastIndexOf('.'))
				}
			}
		},
		userComponentCustomRequestFn : function(a,b,c,d,e){
			if(this.getMethods('onCustomUserRequest')){
				return this.executeMethod('onCustomUserRequest', a,b,c,d,e);
			}
		return new Promise(function(res){
			res([]);	
		});
		},
		pushingCriteriaMeta : function(meta){
			Lyte.arrayUtils(this.data.bufferCriteriaMeta,'push',meta); //no i18n
		},
		dynamicTypeChangeCall : function(selectedField,selectedValue,selectedDynamivValue,index,dontTriggerOnChange){
			if(!dontTriggerOnChange){
				if(this.getMethods('onChange')){
					this.executeMethod('onChange','Dynamic Value Changed',selectedField,selectedValue,selectedDynamivValue,index); //no i18n
				}
			}
			if(this.getMethods('onDynamicValueTypeChanged')){
				/**
				 * @method onDynamicValueTypeChanged
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } selectedField
				 * @param { * } selectedValue
				 * @param { * } selectedDynamivValue
				 * @param { * } criteriaRow
				 */
				return this.executeMethod('onDynamicValueTypeChanged',selectedField,selectedValue,selectedDynamivValue,index,dontTriggerOnChange);
			}
		},
		beforeDynamicTypeChangeCall : function(selectedDynamivValue,selectedField,selectedComparator,criteriaIndex){
			if(this.getMethods('onBeforeDynamicValueTypeChanged')){
				return this.executeMethod('onBeforeDynamicValueTypeChanged',selectedDynamivValue,selectedField,selectedComparator,criteriaIndex);
			}
			return true;
		},
		dynamicCriteriaComponentCall : function(field,comp_name){
			if(this.getMethods('cxDynamicCriteriaComponent')){
				return this.executeMethod('cxDynamicCriteriaComponent',field,comp_name)
			}
			return comp_name;
		},
		valueCriteriaViewChangeFn : function(value,field,condition){
			if(this.getMethods('changeCriteriaValueInView')){
				return this.executeMethod('changeCriteriaValueInView',value,field,condition);
			}else{
				return value
			}
		},
		clickDynamicFieldValueFn : function(a,b,c){
			if(this.getMethods('onClickDynamicFieldValue')){
				return this.executeMethod('onClickDynamicFieldValue',a,b,c);
			}
		},
		setMethodsAndDataForChildCriteriaCall : function(node,selectedArray,arg,compValue,index){
			if(this.getMethods('setMethodsAndDataForChildCriteria')){
				this.executeMethod('setMethodsAndDataForChildCriteria',node,selectedArray,arg,compValue,index);
			}
		},
		setMethodsAndDataForChildCriteriaCallForView : function(node,selectedArray,criteria,index){
			if(this.getMethods('setMethodsAndDataForChildCriteriaForView')){
				this.executeMethod('setMethodsAndDataForChildCriteriaForView',node,selectedArray,criteria,index);
			}
		},
		lookupComponentDataFetchMt : function(a,b,c){
			if(a === 'module'){
				return this.executeMethod('fetchModuleData',b);
			}
			return this.executeMethod('fetchRecords',...arguments);
		},
		fieldToCruxCompMappingMt : function(field,element){
			if(this.getMethods('criteriaFieldCruxMapping')){
				return this.executeMethod('criteriaFieldCruxMapping',field,element);
			}
			return element;
		},
		elementDropdownOpen : function(event, element, comp){
			if(this.getMethods('onElementDropdownOpen')){
				/**
				 * @method onElementDropdownOpen
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } componentNode
				 * @param { * } event
				 * @param { * } element
				 * @param { * } component
				 */
				this.executeMethod('onElementDropdownOpen', this, event, element, comp);
			}
		},
		elementDropdownClose : function(event, element, comp){
			if(this.getMethods('onElementDropdownClose')){
				/**
				 * @method onElementDropdownClose
				 * @author naveen.winson
				 * @version 1.0.0
				 * @param { * } componentNode
				 * @param { * } event
				 * @param { * } element
				 * @param { * } component
				 */
				this.executeMethod('onElementDropdownClose', this, event, element, comp);
			}
		},
		getCustomPicklistValueCriteria : function(field){
			if(this.getMethods('getCustomPicklistValuesForCriteria')){
				return this.executeMethod('getCustomPicklistValuesForCriteria',field);
			}
			if(typeof cruxAssets !== "undefined" && cruxAssets.getCruxCriteriaCustomPicklist){
				return cruxAssets.getCruxCriteriaCustomPicklist(field);
			}
		}
	},
	filterFunction : function(criteriaField,field){
		if(field.api_name == 'Data_Processing_Basis'){
			if(criteriaField.api_name == 'Data_Processing_Basis_Details.Data_Processing_Basis'){
				return true;
			}
		}
		if(field.data_type == 'multi_module_lookup'){
			if(field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('->'))){
				return true;
			}
		}
		if(field.data_type == 'lookup' && !criteriaField.multiFields && (!criteriaField.data_type || criteriaField.data_type == 'lookup')){
			if(criteriaField.data_type && criteriaField.data_type == 'lookup'){
				if(field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('.'))){
					return true;
				}
				if((field.api_name.match(/role/) || field.api_name.match(/profile/)) && field.api_name == criteriaField.api_name){
					return true;
				}
				if(field.api_name == criteriaField.api_name && (field.api_name == 'What_Id' || field.api_name == 'What_Id.name')){
					return true;
				}
				if(this.data.cxPropCriteriaVersion && field.api_name == criteriaField.api_name && (field.api_name.endsWith('Who_Id') || field.api_name.endsWith('Who_Id.name'))){
					return true;
				}
			}else{
				if(field.api_name == criteriaField.api_name && (field.api_name == 'What_Id' || field.api_name == 'What_Id.name')){
					return true;
				}
				if(field.api_name == criteriaField.api_name.split('.')[0] || field.api_name == criteriaField.api_name.substr(0,criteriaField.api_name.lastIndexOf('.'))){
					return true;
				}
			}
			return false;
		}
		if((field.data_type == 'ownerlookup' || field.data_type == 'userlookup') && (this.data.cxPropRoleSupport || this.data.cxPropGroupSupport) && (!criteriaField.data_type || criteriaField.data_type == 'ownerlookup' || criteriaField.data_type == 'userlookup')){
			var role = criteriaField.api_name.indexOf('.role')
			role = role > -1 ? role : criteriaField.api_name.indexOf('.group')
			role = role > -1 ? role : criteriaField.api_name.indexOf('.type__s')
			if(role > -1 && field.api_name == criteriaField.api_name.substr(0,role)){
				return true;
			}
		}
		if(field.api_name == criteriaField.api_name){
			return true;
		}
		if(field.id == criteriaField.id && criteriaField.api_name == 'Tag'){
			return true;
		}
		return false
	},
	getSelectedField : function(criteriaField,fields){
		for(var i=0;i< fields.length;i++){
			if(fields[i].cxPropType == 'group'){
				var ch = this.getSelectedField(criteriaField,fields[i].cxPropFields);
				if(ch){
					return Object.assign({parentCriteriaFieldGroup : fields[i]},ch);
				}
			}else if(this.filterFunction(criteriaField,fields[i])){
				return fields[i];
			}
		}
	},
	getDropdownData : function(index,selectedArray,developerArgs,forceFetch,rowNum){
		if(index === 0 && !forceFetch){
			return this.showObject[this.data.cxPropPrefixArray[0].apiValue];
		}else{
			var s=developerArgs[1],arg = developerArgs[0];
			if(this.showObject[s] == undefined || !this.showObject[s] instanceof Promise || forceFetch){
				var a = this.executeMethod('getDropData',arg,this.showObject[s] ? this.showObject[s] : null,rowNum);
				if(a instanceof Promise){
					this.showObject[s] = a;
					return a.then(function(data){
						if(index == -1){
							data = this.filterAndSetFields(data);
							if(this.getMethods('onBeforeFieldDropdown')){
								return this.executeMethod('onBeforeFieldDropdown',data,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
							}
							if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
								data = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(data,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
							}
						}
						this.showObject[s]=data;
						return this.showObject[s]
					}.bind(this),function(){
						if(this.getMethods('onError')){
							this.executeMethod('onError') //no i18n
						}
						return 'Error'; //no i18n
					}.bind(this));
				}else if(a == true) {
					return this.showObject[s]
				}else{
					if(index == -1 && Array.isArray(a)){
						a = this.filterAndSetFields(a);
						if(this.getMethods('onBeforeFieldDropdown')){
							return this.executeMethod('onBeforeFieldDropdown',a,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
						}
						if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
							a = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(a,rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray)
						}
					}
					this.showObject[s]=a;
					return this.showObject[s];
				}
			}
			if(index == -1){
				if(this.getMethods('onBeforeFieldDropdown')){
					return this.executeMethod('onBeforeFieldDropdown',this.showObject[s],rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray); //no i18n
				}
				if(typeof cruxAssets !== 'undefined' && cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen){
					var a = cruxAssets.onBeforeCruxCriteriaFieldDropdownOpen(this.showObject[s],rowNum,this.data.selectedFieldArray,this.data.selectedSecFieldArray);
					this.showObject[s]=a;
				}
			}
			return this.showObject[s];
		}
	},
	splitRelatedFields : function(data,fields){
		var array = [];
		fields.forEach(function(item){
			item = Object.assign({},item);
			var data_type = item.data_type
			if(data_type == 'formula'){
				data_type = item.formula.return_type;
			}
			if(data_type == 'rollup_summary'){
				data_type = item.rollup_summary.return_type;//no i18n
			}
			if(data_type == data){
				array.push(item);
			}else if(data == 'number' && this.getData('numberFieldException').indexOf(item.column_name) > -1){
				array.push(item);
			}

			if(item.cxPropType == 'group'){
				var newA = this.splitRelatedFields(data,item.cxPropFields);
				if(newA.length > 0){
					array.push(Object.assign(item,{cxPropFields : newA}));
				}
			}
		}.bind(this));
		return array;
	},
	mergeRelatedFields:function(newArr,toBePushed){
		var returnNewArr = Lyte.deepCopyObject(newArr)
		toBePushed.forEach(function(item){
		    if(item.cxPropType == 'group'){
		    	var ind = returnNewArr.cruxFindIndexOfObject('cxPropLabel',item.cxPropLabel)
		    	if(ind == -1){
		    		returnNewArr.push(item)
		    	}else{
		    		returnNewArr[ind].cxPropFields = this.mergeRelatedFields(returnNewArr[ind].cxPropFields,item.cxPropFields);
		    	}
		    }else{
		    	returnNewArr.push(item)
		    }
		}.bind(this));
		return returnNewArr;
	},
	segregateSecondaryFields : function(){
		this._relatedField={}
		var arr=[],secField=this.data.cxPropSecondaryFields,secFieldLength = secField.length;
		for(var i=0;i<secFieldLength;i++){
			var selectId=secField[i].data_type; //No I18N
			if(selectId == 'formula'){
				selectId = secField[i].formula.return_type;//no i18n
			}
			if(this.getData('numberFieldException').indexOf(secField[i].column_name) > -1){
				if(!this._relatedField.number){
					this._relatedField.number = [];
				}
				this._relatedField.number.push(secField[i]);
			}else{
				if(!this._relatedField[selectId]){
					this._relatedField[selectId] = [];
				}
				this._relatedField[selectId].push(secField[i])
			}
		}
	},
	fieldObserver : function(){
		if(!this.getData('internalFieldCall') ){
			this.setData('getFields',false);//No I18N
			this.setData('criteriaArrayObject',[]);//No I18N
			if(!this.newCriteria){
				this.setData('cxPropSetCriteria',{});//No I18N
				this.setData('showEdit',false); //no i18n
				if (this.getMethods('onBuilderPropertyRemove')) {
				    this.executeMethod('onBuilderPropertyRemove', ['cx-prop-set-criteria']);
		        }
				this.setData('cxPropCriteriaMeta',[]); //no i18n
			}
			this.newCriteria = false;
			this.setDatas();
		}else{
			this.setData('internalFieldCall',false); //no i18n
		}
	}.observes('cxPropFields.[]'),//No I18N
	setCriteriaObserver : function(){
		if(!this.setCriteriaFromComp){
			this.newCriteria = true;
			this.setData('arr',[]); //no i18n
			this.setData('pattern',[' ']);//No I18N
			this.setData('patternArrDis',[' ']); //no i18n
			this.setData('patternArr',[' ']); //no i18n
			this.setData('rowNumberArray',[1]); //no i18n
			this.internalRowObj = 1
			this.setDatas();
		}
		this.setCriteriaFromComp = false;
	}.observes('cxPropSetCriteria'), //No I18N
	moduleObserver : function(){
		this.setData('cxPropFields',[]);//No I18N
		if (this.getMethods('onBuilderPropertyRemove')) {
		    this.executeMethod('onBuilderPropertyRemove', ['cx-prop-fields']);
        }
	}.observes('cxPropModule'), //no i18n
	moduleObserverDx : function(obj){
		this.setData('dxHubError',false);
		if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
			if(obj && obj.item === 'cxPropModuleApiName'){
				this.setData('cxPropFields',[]);//No I18N
				if (this.getMethods('onBuilderPropertyRemove')) {
					this.executeMethod('onBuilderPropertyRemove', ['cx-prop-fields']);
				}
			}
			if(this.data.cxPropModuleApiName){
				this.setData('dxHubCheck',true);
				try{
					var moduleKey = Object.keys(this.data.cxPropModuleRecordMapping).filter((item)=>{return this.data.cxPropModuleRecordMapping[item].api_name === this.data.cxPropModuleApiName})[0];
					this.setData('cxPropModule',moduleKey);
				}catch(e){
					this.setData('dxHubFieldError',true);
					return ;
				}
				this.setData('dxHubLoading',true);
				store.findAll('field',{module : this.data.cxPropModuleApiName,type : 'all'},undefined,false).then((res)=>{
					this.setData('dxHubLoading',false);
					if(res && res.field && res.field.length > 0){
						this.preventField.filterable = [false];
						this.setData('internalFieldCall',true); //No I18N
						this.setData('cxPropFields',res.field);
						this.setData('internalFieldCall',false); //No I18N
						this.setData('dxHubCheck',false);
						this.setDatas();
					}else{
						this.setData('dxHubFieldError',true);
					}
				},()=>{
					this.setData('dxHubLoading',false);
					this.setData('dxHubError',true);
				})
			}else if((!this.data.cxPropFields || this.data.cxPropFields.length == 0)){
				this.setData('dxHubFieldError',true);
				this.setData('dxHubLoading',false);
				this.setData('dxHubCheck',true);
			}
		}else{
			this.setData('dxHubCheck',false);
		}
	}.observes('cxPropModuleApiName').on('init'), //no i18n
	typeObserver : function(){
		if(this.getData('cxPropSetCriteria') == undefined || (this.getData('cxPropSetCriteria') && Object.keys(this.getData('cxPropSetCriteria')).length == 0)){
			if((_cruxUtils.isLyteWidgetBuild || Lyte.PageBuilderWhiteboard)){
				this.setData('dxHubViewError',true);
			}
			this.setData('cxPropEmptyShowYield',true); //no i18n
		}else{
			this.setData('cxPropEmptyShowYield',false); //no i18n
			this.setData('dxHubViewError',false);
		}
	}.observes('cxPropType'), //no i18n
	prefixArrayObserver : function(){
		if(!this.data.cxPropDynamicColumns){
			this.setDatas();
		}
	}.observes('cxPropPrefixArray.[]'), //no i18n
	dropArrayObserver : function(){
		this.setDatas();
	}.observes('cxPropDropArray.[]','cxPropSecondaryFields.[]'), //no i18n
	observeAppearance : function(){
		$L(this.$node).removeClass('cxCriteriaFlatStyle')
		$L(this.$node).removeClass('cxCriteriaBoxStyle')

		var criteriaClass = 'cxCriteriaFlatStyle';  //NO I18N
        if(this.getData('cxPropAppearance') === 'box') {
            criteriaClass = 'cxCriteriaBoxStyle';   //NO I18N
        }
        $L(this.$node).addClass(`${criteriaClass} cxCriteriaEditorWrapper`);
	}.observes('cxPropAppearance'), //no i18n
	observeSpecified : function(){
		if(this.getData('cxPropSpecifiedCondition')){
			if(this.getData('cxPropSpecifiedCondition') == 'and'){
				this.setData('defaultCond','and');//No I18N
				this.setData('defaultCondition',_cruxUtils.getI18n('and')); //No I18N
				this.setData('defaultLabelCondition',_cruxUtils.getI18n('crm.label.and')) //No I18N
			}else if(this.getData('cxPropSpecifiedCondition') == 'or'){ //No I18N
				this.setData('defaultCond','or');//No I18N
				this.setData('defaultCondition',_cruxUtils.getI18n('or')); //No I18N
				this.setData('defaultLabelCondition',_cruxUtils.getI18n('crm.label.or')) //No I18N
			}
			
			for (var i = 1; i <this.data.pattern.length ; i++) {
				Lyte.arrayUtils(this.getData('pattern'),'replaceAt',i,this.data.defaultCond);//No I18N
				Lyte.arrayUtils(this.getData('patternArr'),'replaceAt',i,this.data.defaultCondition);//No I18N
				Lyte.arrayUtils(this.getData('patternArrDis'),'replaceAt',i,this.data.defaultLabelCondition);//No I18N
			}
			this.criteriaOption('specified');
		}
	}.observes('cxPropSpecifiedCondition').on('init') //no i18n
},{mixins:["crux-criteria-conditions","crux-criteria-util"],
	'alias':'crm-criteria-editor'
}); //No I18N

Lyte.Component.registerHelper('getClassForEditPattern',function(item){ //NO I18N
 	if(item == '(' || item == ')'){
 		return 'prevent'; //NO I18N
 	}else if(isNaN(parseInt(item))){
 		return 'blue prevent'; //NO I18N
 	}else{
 		return 'cxCritPtnNum'; //NO I18N
 	}
});

Lyte.Component.registerHelper('isSearchNeeded',function(fields,prefix){
	if(!fields){
		return false;
	}
	if(fields.length > 9){
		return true;
	}else{
		var len = 0
		fields.forEach(function(item){
			if(item.cxPropType == 'group'){
				if(prefix){
					len += item.cxPropOptions.length;
				}else{
					len += item.cxPropFields.length;
				}
			}else{
				len++
			}
			if(len > 10){
				return;
			}
		});
		if(len > 10){
				return true; 
		}
	}

	return false
})

/**
 * @syntax nonYielded
 * <crux-criteria-editor cx-prop-fields='[{"id":"1","api_name":"text_field","field_label":"Text Field","data_type" : "text","visible" : "true"},{"id":"2","api_name":"Label 2","field_label":"Label 2","data_type" : "double","visible" : "true"}]'></crux-criteria-editor>
 */

// $Id$
Lyte.Component.register("crux-criteria-editor-header", {
_template:"<template tag-name=\"crux-criteria-editor-header\"> <template is=\"if\" value=\"{{expHandlers(showFieldsCriteria,'!')}}\"><template case=\"true\"> <div class=\"criteriaRow\"></div> </template></template> <div class=\"criteriaTd criteriaNumber\"> <div class=\"cxCriteriaNumWrap\"> <template is=\"if\" value=\"{{ifNotEquals(criteriaIndex,1)}}\"><template case=\"true\"> <div class=\"cxCriteriaAndOr {{if(cxPropDisabledGroupOperator,'cxCriteriaHeaderDisabled','')}}\"> <lyte-input class=\"cxCriteriaAndOrLyteInput\" lt-prop-class=\"cxCriteriaAndOrInput\" lt-prop-readonly=\"true\" lt-prop-value=\"{{andOrCondition}}\" data-zcqa=\"criteria_cond_{{criteriaIndex}}\" onclick=\"{{action('changeAndOr')}}\"></lyte-input> </div> </template></template> <input type=\"text\" data-zcqa=\"criteria_patternnum_{{criteriaIndex}}\" id=\"patternNum\" class=\"cxCriteriaPatternNum patterNum\" value=\"{{criteriaNumber}}\" readonly=\"\" tabindex=\"-1\"> </div> </div> <template is=\"for\" items=\"{{prefixArray}}\" item=\"item\" index=\"index\"> <div class=\"criteriaTd {{if(ifEquals(item.type,'text'),'cxCriteriaTextTd','')}}\"> <template is=\"if\" value=\"{{expHandlers(item.type,'==','text')}}\"><template case=\"true\"> <div class=\"cxCriteriaTdTextWrapper\"> <lyte-text class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedArray[index].value[item.displayValue]}}\"></lyte-text> </div> </template><template case=\"false\"> {{addMurhyInfo(\"crux-criteria-editor-header\",\"January Group Automation\")}} <div class=\"cxCriteriaDropdown pR {{if(item.dropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(item.dropdownOpen,if(item.dropdownOpenUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(item.showValue,&quot;&quot;,&quot;cxCriteriaDropdownDisabled&quot;)}}\"> <div class=\"cx_prefixDropdownLabel prefix_{{item.apiValue}} {{if(item.showValue,'','lyteDropdown-disabled')}}\" data-zcqa=\"criteria_{{item.apiValue}}_{{criteriaIndex}}\" onclick=\"{{action('showPrefixDropdown',index,event)}}\" onkeydown=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> {{addMurhyInfo(\"crux-criteria-editor-header.html\",\"Feb Default Changes\")}} <lyte-text class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedArray[index].value[item.displayValue]}}\" lt-prop-tooltip-config=\"{{tooltipConfig}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{item.showDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cxCriteriaPrefixOrigDropdown cx_PrefixDropdown{{item.apiValue}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" on-option-selected=\"{{method('changePrefixOption',index)}}\" lt-prop-selected=\"{{selectedArray[index].value[item.systemValue]}}\" on-before-show=\"{{method('onPrefixDropdownBeforeShow',index)}}\" on-show=\"{{method('onPrefixDropdownShow',index)}}\" on-hide=\"{{method('onDropdownHide')}}\" on-before-hide=\"{{method('prefixBeforeHide',index)}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{expHandlers(showArray[item.apiValue],'&amp;&amp;',isSearchNeeded(showArray[item.apiValue],true))}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"prefixSearchBox\" class=\"w100per prefixSearchStyle{{criteriaIndex}}{{item.apiValue}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lytePrefixDropbody{{criteriaIndex}}{{item.apiValue}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;,&quot;related&quot; : &quot;lyte-drop-group&quot;}\" on-search=\"{{method(&quot;onPrefixSearch&quot;,index)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lytePrefixDropbody{{criteriaIndex}}{{item.apiValue}}\"> <template is=\"if\" value=\"{{expHandlers(showArray[item.apiValue],'==','Loading')}}\"><template case=\"true\"> <div class=\"cxCriteriaInitialLoaderWrap\"> <span class=\"cxCriteriaScrollLoaderIcon\"></span> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(item.cxPropDisableNone,'!')}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{criteriaIndex}}\" data-zcqa=\"criteria{{item.apiValue}}drop_none\" data-value=\"-1\" id=\"-1\" index=\"-1\" value=\"none\"> {{cruxGetI18n('None')}} </lyte-drop-item> </template></template> <template is=\"for\" items=\"{{showArray[item.apiValue]}}\" item=\"value\" index=\"indexi\"> <crux-criteria-drop-item cx-prop-type=\"prefix\" cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{value}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-prefix-item=\"{{item}}\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{item.emptyOptionsShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{item.showError}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaFieldError\" class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(item.showError)}}</span> </template></template> </template></template> </div> </template> <template is=\"if\" value=\"{{showFieldsCriteria}}\"><template case=\"true\"> <div class=\"criteriaTd cxCriteriaTdField\"> <div class=\"cxCriteriaDropdown {{if(fieldDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(fieldDropdownOpen,if(fieldDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(showField,&quot;&quot;,&quot;cxCriteriaDropdownDisabled&quot;)}}\"> {{addMurhyInfo(\"crux-criteria-editor-header.html\",\"Feb Default Changes\")}} <div class=\"cx_fieldDropdownLabel {{if(showField,'','lyteDropdown-disabled')}} {{if(showFieldErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_field_{{criteriaIndex}}\" onclick=\"{{action('showFieldsDropdown',event)}}\" onkeyup=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedField.field_label}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showFieldsDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cx_fieldsDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" on-option-selected=\"{{method('changeField')}}\" lt-prop-selected=\"{{selectedField.api_name}}\" on-before-show=\"{{method('onFieldDropdownBeforeShow')}}\" on-show=\"{{method('onFieldDropdownShow')}}\" lt-prop-is-open=\"{{lbind(fieldDrodownOpen)}}\" on-before-hide=\"{{method('fieldBeforeHide')}}\" on-hide=\"{{method('onDropdownHide')}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{isSearchNeeded(fields)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"fieldSearchBox\" class=\" fieldSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteFieldsDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;,&quot;related&quot; : &quot;lyte-drop-group&quot;}\" on-search=\"{{method(&quot;onFieldSearch&quot;)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteFieldsDropbody{{criteriaIndex}}\"> <template is=\"if\" value=\"{{showFieldsLoading}}\"><template case=\"true\"> <div class=\"cxCriteriaInitialLoaderWrap\"> <span class=\"cxCriteriaScrollLoaderIcon\"></span> </div> </template><template case=\"false\"> <template is=\"if\" value=\"{{cxPropNoneField}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{criteriaIndex}}\" data-zcqa=\"criteriafielddrop_none\" data-value=\"None\" id=\"-1\" index=\"-1\" value=\"none\"> {{cruxGetI18n('None')}} </lyte-drop-item> </template></template> <template is=\"for\" items=\"{{fields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-show-all=\"{{cxPropShowAllFields}}\" cx-prop-display-selector=\"field_label\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{emptyFieldShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{showFieldErrorMsg}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaFieldError\" class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showFieldErrorMsg)}}</span> </template></template> </div> <div class=\"criteriaTd\"> <div class=\"cxCriteriaDropdown {{if(condDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(condDropdownOpen,if(condDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}} {{if(showComparator,&quot;cxCriteriaDropdownDisabled&quot;,&quot;&quot;)}}\" id=\"conditionDiv\"> <div class=\"cx_compDropdownLabel {{if(showComparator,'lyteDropdown-disabled','')}} {{if(showCondErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_comp_{{criteriaIndex}}\" onclick=\"{{action('showComparatorDropdown',event)}}\" onkeyup=\"{{action('keyUpDropdown',this,event)}}\" tabindex=\"{{tabIndex}}\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"lyteMarginRight lyteDropdownLabel\" lt-prop-value=\"{{selectedComparator.display}}\"></lyte-text> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showComparatorDropdown}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" class=\"cx_compDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{undefinedData}}\" id=\"comparator\" lt-prop-selected=\"{{selectedComparator.system}}\" on-option-selected=\"{{method('changeCondition')}}\" on-before-show=\"{{method('onConditionDropdownBeforeShow')}}\" on-show=\"{{method('onConditionDropdownShow')}}\" lt-prop-is-open=\"{{lbind(condDropdownOpen)}}\" on-before-hide=\"{{method('conditionBeforeHide')}}\" on-hide=\"{{method('onDropdownHide')}}\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\" lt-prop-prevent-parent-scroll=\"true\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{expHandlers(condArray.length,'>',9)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"conditionSearchBox\" class=\" conditionSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteConditionDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;}\" on-search=\"{{method(&quot;onConditionSearch&quot;)}}\" lt-prop-maxlength=\"{{undefinedData}}\" lt-prop-trim=\"true\" lt-prop-close-icon=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteConditionDropbody{{criteriaIndex}}\"> <template is=\"for\" items=\"{{condArray}}\" item=\"item\" index=\"index\"> <lyte-drop-item class=\"selector{{cxPropId}} {{if(item.cxDisabled,'cxCriteriaItemDisabled')}}\" data-zcqa=\"criteria_compdrop_{{item.system}}_{{criteriaIndex}}\" data-value=\"{{item.system}}\" index=\"{{index}}\" data-custom-tooltip=\"{{if(item.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(item.cxTitle,item.cxTitle,'')}}\" onclick=\"{{action('onCriteriaConditionItemClicked',this)}}\"> {{item.display}} </lyte-drop-item> </template> <template is=\"if\" value=\"{{emptyConditionShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </div> <template is=\"if\" value=\"{{showCondErrorMsg}}\"><template case=\"true\"> <span data-zcqa=\"cxCriteriaConditionError\" class=\"cxCriteriaConditionError cxCriteriaInlineError\">{{unescape(showCondErrorMsg)}}</span> </template></template> </div> <div class=\"criteriaTd cxElementDiv\"> <div class=\"cxFlexCenter\"> <div class=\"cxCriteriaValueCol {{if(cruxOr(dynamicTypeValue,cruxAnd(selectedField.enable_record_category,negate(disabledRecordStateConfig))),'cxFlex cxCriteriaValueColDropInputWrap')}} {{if(expHandlers(betweenCond,'&amp;&amp;',ifEquals(elementsCond,'date-time')),'cxCriteriaColBtwDTCase','')}} {{if(noneCondition,'cxCriteriaValueColDisabled')}}\" style=\"flex: 1;\"> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'||',expHandlers(expHandlers(selectedField.enable_record_category,'&amp;&amp;',expHandlers(disabledRecordStateConfig,'!')),'&amp;&amp;',expHandlers(expHandlers(selectedComparator.system,'==','equal'),'||',expHandlers(selectedComparator.system,'==','not_equal'))))}}\"><template case=\"true\"> <lyte-dropdown class=\"cxCriteriaValueColTypeDropdown\" lt-prop-selected=\"{{lbind(dynamicTypeValueSelected)}}\" lt-prop-disabled=\"{{cruxOr(noneCondition,disabledDynamicValueDropdown)}}\" on-option-selected=\"{{method('onDynamicTypeSelected')}}\" on-show=\"{{method('onDynamicValueOpen')}}\" on-hide=\"{{method('onDynamicValueHide')}}\" data-zcqa=\"cxDynamicDropdown_{{criteriaIndex}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{dynamicTypeValueOptions}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'||',expHandlers(item.system,'!=','field'))}}\"><template case=\"true\"> <lyte-drop-item data-zcqa=\"cxDynamic{{item.system}}\" data-value=\"{{item.system}}\">{{item.display}}</lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> <template is=\"if\" value=\"{{expHandlers(showSecondaryModuleDropdown,'&amp;&amp;',expHandlers(expHandlers(dynamicTypeValueSelected,'==','field'),'||',expHandlers(dynamicTypeValue,'!')))}}\"><template case=\"true\"> <div class=\"{{if(dynamicTypeValue,&quot;cxCriteriaValueColDropField&quot;,&quot;cxCriteriaDropdown&quot;)}} {{if(secFieldDropdownOpen,&quot;cxCriteriaDropdownOpen&quot;,&quot;&quot;)}} {{if(secFieldDropdownOpen,if(secFieldDropdownUp,&quot;cxCriteriaDropdownOpenUp&quot;,&quot;cxCriteriaDropdownOpenDown&quot;))}}\"> <template is=\"if\" value=\"{{expHandlers(noneCondition,'||',dynamicallyFedField)}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaDynamicFedInput disabledText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','')}}\" lt-prop-value=\"{{disableText}}\"></lyte-text> </template><template case=\"false\"> <div class=\"cx_fieldDropdownLabel {{if(showSecFieldErrorMsg,'cxCriteriaErrorCell')}}\" data-zcqa=\"criteria_sec_field_{{criteriaIndex}}\" onclick=\"{{action('showSecFieldsDropdown')}}\"> <span class=\"lyteMarginRight lyteDropdownLabel\"> <template is=\"if\" value=\"{{dynamicTypeValue}}\"><template case=\"true\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaValueColText\" lt-prop-value=\"{{if(cruxAnd(ifNotEquals(selectedSecField.id,'-1'),negate(hideSecondayModule)),concat(selectedSecField.field_label,' ( ',secondaryModuleDisplayName,' )'),selectedSecField.field_label)}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"lyte-text\"> <span class=\"cxCriteriaValueColFieldLabel\"> {{selectedSecField.field_label}} </span> <template is=\"if\" value=\"{{expHandlers(expHandlers(selectedSecField.id,'!=','-1'),'&amp;&amp;',expHandlers(hideSecondayModule,'!'))}}\"><template case=\"true\"> <span class=\"cxCriteriaValueColModuleLabel\"> ({{secondaryModuleDisplayName}}) </span> </template></template> </template> </lyte-text> </template><template case=\"false\"> <lyte-text lt-prop-tooltip-config=\"{{tooltipConfig}}\" class=\"cxCriteriaValueColText\" lt-prop-value=\"{{selectedSecField.field_label}}\"></lyte-text> </template></template> </span> <lyte-icon class=\"dropdown\"></lyte-icon> </div> <template is=\"if\" value=\"{{showSecondaryFieldsDropdown}}\"><template case=\"true\"> <lyte-dropdown class=\"cx_fieldsDropdown cxSecFieldDropdown\" lt-prop-yield=\"true\" lt-prop-tabindex=\"1\" on-before-hide=\"{{method('secFieldBeforeHide')}}\" on-option-selected=\"{{method('changeSecField')}}\" lt-prop-selected=\"{{selectedSecField.api_name}}\" on-before-show=\"{{method('onSecFieldDropdownBeforeShow')}}\" on-show=\"{{method('onSecFieldDropdownShow')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"cx_empty_dropbtn\"></lyte-drop-button> <lyte-drop-box class=\"cxDropbox criteriaDropbox\"> <template is=\"if\" value=\"{{isSearchNeeded(relatedFields)}}\"><template case=\"true\"> <lyte-drop-header> <lyte-search id=\"fieldSearchBox\" class=\" secFieldSearchStyle{{criteriaIndex}}\" lt-prop-query-selector=\"{&quot;scope&quot;:&quot;lyte-drop-box:not(.lyteDropdownHidden) .lyteSecFieldsDropbody{{criteriaIndex}}&quot;,&quot;search&quot;:&quot;lyte-drop-item:not(.prevent)&quot;, &quot;target&quot; : &quot;lyte-drop-item:not(.prevent)&quot;}\" on-search=\"{{method(&quot;onSecFieldSearch&quot;)}}\" lt-prop-close-icon=\"true\" lt-prop-trim=\"true\"> </lyte-search> </lyte-drop-header> </template></template> <lyte-drop-body class=\"lyteSecFieldsDropbody{{criteriaIndex}}\"> <template is=\"for\" items=\"{{relatedFields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{criteriaIndex}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"criteria_fielddrop\" cx-prop-show-all=\"{{cxPropShowAllFields}}\" cx-prop-display-selector=\"field_label\" cx-prop-hide-id=\"{{if(hidePrimarySelectedField,selectedField.id,'')}}\"></crux-criteria-drop-item> </template> <template is=\"if\" value=\"{{emptySecondaryFieldShow}}\"><template case=\"true\"> <div class=\"cxDropdownNoResult\" data-value=\"prevent\">{{cruxGetI18n(\"crm.label.no.options.found\")}}</div> </template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{showSecFieldErrorMsg}}\"><template case=\"true\"> <span class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showSecFieldErrorMsg)}}</span> </template></template> </template></template> <template is=\"if\" value=\"{{showSecFieldErrorMsg}}\"><template case=\"true\"> <span class=\"cxCriteriaFieldError cxCriteriaInlineError\">{{unescape(showSecFieldErrorMsg)}}</span> </template></template> </template></template> </div> </template><template case=\"false\"> <div id=\"searchval_div\" class=\"cxCriteriaValueSection\"> <template is=\"if\" value=\"{{noneCondition}}\"><template case=\"true\"> <lyte-input lt-prop-appearance=\"{{cxPropAppearance}}\" class=\"cxCriteriaNoneConditionInput disabledText {{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','')}}\" lt-prop-type=\"text\" lt-prop-disabled=\"true\" lt-prop-value=\"{{disableText}}\"> </lyte-input> </template><template case=\"false\"><template is=\"if\" value=\"{{dynamicElementComponentRender}}\"><template case=\"true\"> <template is=\"component\" class=\"cxCriteriaDynamicElement\" component-name=\"{{dynamicCond}}\" selected-value=\"{{value[0]}}\" field=\"{{selectedField}}\" comparator=\"{{selectedComparator}}\" on-value-change=\"{{method('changeValue')}}\" from=\"criteria_editor\" on-error=\"{{method('valueError')}}\" selected-dynamic-value=\"{{dynamicTypeValueSelected}}\"></template> </template><template case=\"false\"><template is=\"if\" value=\"{{ageInDaysCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaAgeInDays\"> <template is=\"if\" value=\"{{negate(previousNextComp)}}\"><template case=\"true\"><div class=\"ageInDaysComp cxDIB vab cxCriteriaAgeSpacing\"> <lyte-dropdown data-zcqa=\"criteria_age_{{criteriaIndex}}\" on-option-selected=\"{{method('changeAgeInDaysCondition')}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" lt-prop-selected=\"{{selectedAgeInDays.system}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{tabIndex}}\" id=\"ageindayscondition\" lt-prop-prevent-parent-scroll=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"cxDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{ageindays}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-zcqa=\"criteria_agedrop_{{item.system}}_{{criteriaIndex}}\" data-value=\"{{item.system}}\" index=\"{{index}}\">{{item.display}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div></template></template> <div class=\"ageInDaysVal cxDIB vab cxCriteriaAgeSpacing\"> <template is=\"if\" value=\"{{betweenAgeInDaysCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaBetweenCase\"> <crux-number-component class=\"cxCriteriaBetween1\" id=\"ageValueInput1\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_from_number_1\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[0]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-decimal-allowed=\"false\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\"></crux-number-component> <crux-number-component class=\"cxCriteriaBetween2\" id=\"ageValueInput2\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_to_number_1\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[1]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-decimal-allowed=\"false\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\"></crux-number-component> </div> </template><template case=\"false\"> <crux-number-component id=\"ageValueInput\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_number_{{criteriaIndex}}\" cx-prop-maxlength=\"4\" on-value-change=\"{{method('changeValue')}}\" cx-prop-maxvalue=\"{{ageInDaysMax}}\" cx-prop-allow-negative-value=\"false\" cx-prop-value=\"{{value[0]}}\" cx-prop-field=\"{{selectedField}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" class=\"{{if(ifEquals(cxPropAppearance,'box'),'cxBoxInput','cxFlatInput')}}\" cx-prop-decimal-allowed=\"false\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-minvalue=\"{{selectedComparator.cxMinvalue}}\" cx-prop-min-max-validation=\"true\"></crux-number-component> </template></template> </div> <template is=\"if\" value=\"{{previousNextComp}}\"><template case=\"true\"><div class=\"ageInDaysComp cxDIB cxCriteriaAgeSpacing\"> <lyte-dropdown data-zcqa=\"criteria_previous_next_{{criteriaIndex}}\" class=\"{{if(ifEquals(cxPropAppearance,'flat'),'cxFlatDropdown','cxBoxDropdown')}} {{cxPropClass}}\" lt-prop-selected=\"{{lbind(changePreviousNextSelected)}}\" lt-prop-yield=\"true\" lt-prop-tabindex=\"{{tabIndex}}\" id=\"ageindayscondition\" lt-prop-prevent-parent-scroll=\"true\" on-option-selected=\"{{method('changepreviousNextCondition')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{selectedComparator.cxDateOptions}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item['system']}}\" index=\"{{index}}\">{{item['display']}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{betweenCond}}\"><template case=\"true\"> <div class=\"cxFlex cxCriteriaBetweenCase\"> <template is=\"component\" id=\"betweenComponent1\" class=\"cxCriteriaBetween1\" component-name=\"crux-{{elementsCond}}-component\" on-value-change=\"{{method('changeValue')}}\" cx-prop-from=\"criteria\" cx-prop-data-zcqa=\"criteria_from_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-field=\"{{selectedField}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.from')}}\" cx-prop-value=\"{{value[0]}}\" cx-prop-maxlength=\"{{maxLen}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{if(ifEquals(cxPropAppearance,'box'),'box','flat')}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\"></template> <template is=\"component\" id=\"betweenComponent2\" class=\"cxCriteriaBetween2\" component-name=\"crux-{{elementsCond}}-component\" cx-prop-data-zcqa=\"criteria_to_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-maxlength=\"{{maxLen}}\" on-value-change=\"{{method('changeValue')}}\" cx-prop-from=\"criteria\" cx-prop-field=\"{{selectedField}}\" cx-prop-value=\"{{value[1]}}\" cx-prop-placeholder=\"{{cruxGetI18n('crm.label.to')}}\" on-error=\"{{method('valueError')}}\" cx-prop-appearance=\"{{if(ifEquals(cxPropAppearance,'box'),'box','flat')}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\"></template> </div> </template><template case=\"false\"> <template is=\"component\" id=\"elementComponent\" component-name=\"crux-{{elementsCond}}-component\" class=\"cxCriteriaElementComponent\" cx-prop-from=\"criteria\" cx-prop-placeholder=\"{{if(ifEquals(selectedField.ui_type,'80'),cruxGetI18n('crm.label.type.minutes'))}}\" cx-prop-maxlength=\"{{maxLen}}\" cx-prop-module=\"{{module}}\" cx-prop-data-zcqa=\"criteria_{{elementsCond}}_{{criteriaIndex}}\" cx-prop-type=\"{{if(selectedField.cxPropType,selectedField.cxPropType,if(ifEquals(elementsCond,'user'),'multiple'))}}\" cx-prop-disable-extra-value=\"{{if(cruxOr(customPicklistValues,ifEquals(dynamicTypeValueSelected,'record_category')),true,selectedField.cxPropDisableExtraValue)}}\" cx-prop-do-not-skip-first-value=\"{{selectedField.cxPropDoNotSkipFirstValue}}\" cx-prop-show-unused=\"{{selectedField.cxPropShowUnused}}\" on-value-change=\"{{method('changeValue')}}\" cx-prop-field=\"{{if(userTypeField,userTypeField,selectedField)}}\" cx-prop-login-user=\"{{cxPropShowLoggedInUser}}\" on-error=\"{{method('valueError')}}\" cx-prop-value=\"{{value[0]}}\" cx-prop-boundary=\"{{cxPropBoundary}}\" cx-prop-appearance=\"{{cxPropAppearance}}\" cx-prop-id=\"criteria_{{elementsCond}}_{{criteriaIndex}}_{{cxPropId}}\" cx-prop-currency-code=\"{{currencyProperties.baseCurrency}}\" cx-prop-currency-details=\"{{currencyProperties.currencyDetails}}\" cx-prop-default-round-off=\"{{currencyProperties.defaultRoundOff}}\" cx-prop-default-org-currency=\"{{currencyProperties.defaultOrgCurrency}}\" cx-prop-date-pattern=\"{{datePattern}}\" cx-prop-time-zone=\"{{timeZone}}\" cx-prop-tab-index=\"{{tabIndex}}\" cx-prop-time-format=\"{{timeFormat}}\" cx-prop-max-count=\"{{if(selectedField.cxPropMaxCount,selectedField.cxPropMaxCount,if(ifNotEquals(elementsCond,'role'),'50'))}}\" cx-prop-layout=\"{{cxPropLayout}}\" cx-prop-request-model=\"{{roleComponentRequestModal}}\" cx-prop-custom-data=\"{{if(ifEquals(elementsCond,'role'),if(ifEquals(roleComponentRequestModal,'role'),roleComponentProperties.customData,if(ifEquals(roleComponentRequestModal,'profile'),profileComponentProperties.customData,emptyObject)),emptyObject)}}\" cx-prop-query-param=\"{{queryParam}}\" cx-prop-exclude-ids=\"{{if(selectedField.cxPropExcludeIds,selectedField.cxPropExcludeIds,emptyArray)}}\" cx-prop-is-subordinate=\"{{userComponentProperties.isSubordinate}}\" cx-prop-custom-request=\"{{userComponentProperties.cxPropCustomRequest}}\" on-custom-request=\"{{method('userComponentCustomRequest')}}\" cx-prop-dropdown=\"{{selectedField.cxPropShowDropdown}}\" cx-prop-error-message=\"{{showValueErrorMsg}}\" cx-prop-ignore-empty-value=\"{{if(selectedField.cxPropIgnoreEmptyValue,true,false)}}\" cx-prop-prevent-parent-scroll=\"true\" cx-prop-render-auto-complete-in-criteria=\"{{selectedField.cxPropRenderAutoCompleteInCriteria}}\" fetch-module-data=\"{{method('lookupComponentDataFetch','module')}}\" fetch-records=\"{{method('lookupComponentDataFetch','records')}}\" cx-prop-minimum-characters-for-search=\"{{selectedField.cxPropMinimumCharactersForSearch}}\" cx-prop-fields=\"{{selectedField.cxPropFields}}\" cx-prop-assignee-module-name=\"{{selectedField.cxPropAssigneeModuleName}}\" cx-prop-icon-class=\"{{selectedField.cxPropIconClass}}\" cx-prop-calendar-properties=\"{{if(selectedField.cxPropCalendarProperties,selectedField.cxPropCalendarProperties,emptyObject)}}\" on-element-dropdown-open=\"{{method('onElementDropdownOpenCallback')}}\" on-element-dropdown-close=\"{{method('onElementDropdownCloseCallback')}}\" cx-prop-decimal-allowed=\"{{if(cxHasOwnProperty(selectedField,'cxPropDecimalAllowed'),selectedField.cxPropDecimalAllowed,true)}}\" cx-prop-skip-user-field-request=\"{{userComponentProperties.cxPropSkipUserFieldRequest}}\" cx-prop-picklist-values=\"{{customPicklistValues}}\" cx-prop-logged-in-user-role-required=\"{{selectedField.cxLoggedInUserRole}}\" cx-prop-hide-text-component=\"{{selectedField.cxHideTextComponent}}\" cx-prop-unassigned-user=\"{{selectedField.cxPropUnassignedUser}}\" cx-prop-masking-properties=\"{{maskingProperties}}\"></template> </template></template></template></template></template></template></template></template> </div> </template></template> </div> <template is=\"if\" value=\"{{expHandlers(dynamicallyFedField,'&amp;&amp;',expHandlers(dynamicTypeValueSelected,'==','field'))}}\"><template case=\"true\"> <span class=\"cxCriteriaDynamicConfig cxLink\" data-zcqa=\"cx_dynamic_set_value\" onclick=\"{{action('dynamicFedFieldClicked')}}\"> <template is=\"if\" value=\"{{expHandlers(disableText,'==','')}}\"><template case=\"true\"> {{cruxGetI18n('voc.gc.configure')}} </template><template case=\"false\"> {{cruxGetI18n('Edit')}} </template></template> </span> </template></template> </div> </div> </template><template case=\"false\"> </template></template> <div class=\"criteriaTd cxAddRemoveTd\"> <div class=\"cxCriteriaAddRemove\"> <template is=\"if\" value=\"{{showRemove}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(hideCriteriaAddRemove.cxRemove)}}\"><template case=\"true\"><a id=\"check1\" data_zcqa=\"criteria_remove_{{criteriaIndex}}\" class=\"cxCriteriaRemoveIcon\" onclick=\"{{action('removeCriteria')}}\"></a></template></template> </template></template><template is=\"if\" value=\"{{showAdd}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(hideCriteriaAddRemove.cxAdd)}}\"><template case=\"true\"><a id=\"addRow\" data_zcqa=\"criteria_add_{{criteriaIndex}}\" class=\"cxCriteriaAddIcon\" onclick=\"{{action('createNewCriteria')}}\"></a></template></template> </template></template> </div> </div> <template is=\"if\" value=\"{{childCriteria}}\"><template case=\"true\"> <div class=\"cxChildCriteria\"> <template is=\"if\" value=\"{{negate(alwaysShowChildCriteria)}}\"><template case=\"true\"><div class=\"cxChildCriteriaShowCheck\"> <lyte-checkbox lt-prop-checked=\"{{lbind(showChildCriteria)}}\" lt-prop-id=\"childCriteriaCheckbox\" lt-prop-label=\"{{childCriteriaCheckboxLael}}\" lt-prop-disabled=\"{{disabledChildCriteria}}\" lt-prop-title=\"{{if(disabledChildCriteria,childCriteriaCheckboxTitle,'')}}\"></lyte-checkbox> </div></template></template> <template is=\"if\" value=\"{{showChildCriteria}}\"><template case=\"true\"><crux-criteria-editor id=\"childCriteria_{{criteriaIndex}}\" cx-prop-fields=\"{{emptyArray}}\" cx-set-data-and-methods=\"{{method('setMethodsAndDataForChildCriteriaCaller')}}\" cx-prop-set-criteria=\"{{childSetCriteria}}\"></crux-criteria-editor></template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,1,1]},{"type":"if","position":[3,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3,1,3]},{"type":"attr","position":[5]},{"type":"for","position":[5],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"text","position":[3,1,1]},{"type":"attr","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,3]},{"type":"componentDynamic","position":[3,1,5]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"attr","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,1,1]},{"type":"attr","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,1]},{"type":"componentDynamic","position":[3,1,1,3]},{"type":"attr","position":[3,1,3]},{"type":"if","position":[3,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5,1,1]},{"type":"attr","position":[5,1,1,1]},{"type":"if","position":[5,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[5,1,1,3]},{"type":"if","position":[5,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"for","position":[3,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"registerYield","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"component","position":[1,1],"dynamicNodes":[]},{"type":"attr","position":[1,3]},{"type":"component","position":[1,3],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1,3]},{"type":"if","position":[5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[9,1,1]},{"type":"if","position":[9,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[9,1,2]},{"type":"if","position":[9,1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["module","fields","ageindays","criteria","showAdd","showRemove","selectCond","formCond","criteriaIndex","andOrCondition","ageindays","selectUser","ageInDays","dueInDays","nocCondition","users","dropdowndata","pickList","lookup","criteriaObject","setCriteriaObj","tags","layout","emptyFieldShow","emptyPicklistShow","searchValue","showEmpty","condArray","dataType","callModule","lookupField","betweenCond","elementsCond","noneCondition","ageInDaysCond","disableText","displayField","showComparator","selectedAgeInDays","showFieldsDropdown","cxPropShowLoggedInUser","gotFields","gotComparator","cxPropNoneField","showFieldInTitle","numberFieldException","unusedField","textAreaMaxLength","maxLen","cxPropShowAllFields","cxPropBoundary","cxPropAppearance","prefixArray","selectedArray","showArray","showExtraColumn","showField","showFieldsCriteria","dynamicColumn","textMaxLength","criteriaNumber","moduleMapping","moduleRecordMapping","disabledListDropdown","boxButtonWidth","undefinedData","currencyProperties","tabIndex","datePattern","timeFormat","timeZone","cxPropId","cxPropLayout","userComponentProperties","emptyObject","emptyArray","secondaryModule","dynamicTypeValue","showSecondaryModuleDropdown","secondaryModuleDisplayName","ageInDaysMax","dynamicTypeValueSelected","hideSecondayModule","disabledDynamicValueDropdown","showFieldErrorMsg","showCondErrorMsg","showValueErrorMsg","showSecFieldErrorMsg","dynamicallyFedField","dynamicTypeValueOptions","roleComponentRequestModal","hideFieldComparatorValue","relatedFields","hidePrimarySelectedField","tooltipConfig","showErrorForEmptyCriteria","cxPropForceSetCondition","cxPropDisabled","cxPropDisabledGroupOperator","roleComponentProperties","profileComponentProperties","queryParam","userTypeField","allowEmptyChildCriteria","alwaysShowChildCriteria","showChildCriteria","childCriteriaCheckboxLael","childCriteriaCheckboxTitle","hideCriteriaAddRemove","disabledChildCriteria","disabledRecordStateConfig","previousNextComp","changePreviousNextSelected","maskingProperties"],
_observedAttributesType :["string","array","array","number","boolean","boolean","string","string","number","string","array","boolean","boolean","boolean","boolean","array","array","boolean","boolean","object","object","array","array","boolean","boolean","string","boolean","array","string","string","string","boolean","string","boolean","boolean","string","object","boolean","object","boolean","boolean","boolean","boolean","boolean","boolean","object","object","number","number","boolean","object","string","array","array","object","boolean","boolean","boolean","boolean","number","string","array","object","array","string","object","object","number","string","string","string","string","string","object","object","array","string","boolean","boolean","string","number","string","boolean","boolean","string","string","string","string","boolean","array","string","boolean","array","boolean","string","boolean","boolean","boolean","boolean","object","object","object","object","boolean","boolean","boolean","string","string","object","boolean","boolean","boolean","string","object"],
 //No I18N
	data : function(){
		return {
			module : Lyte.attr("string"), //No I18N
			fields : Lyte.attr("array",{default : []}),//No I18N
			ageindays : Lyte.attr("array"),//No I18N
			criteria : Lyte.attr("number"),//No I18N
			showAdd : Lyte.attr('boolean'),//No I18N
			showRemove : Lyte.attr('boolean'),//No I18N
			selectCond : Lyte.attr('string'),//No I18N
			formCond : Lyte.attr('string'),//No I18N
			criteriaIndex : Lyte.attr('number'),//No I18N
			andOrCondition : Lyte.attr('string'), //No I18N
			ageindays :  Lyte.attr('array'), // no i18n
			selectUser : Lyte.attr('boolean',{default : false}),//No I18N
			ageInDays : Lyte.attr('boolean',{default : false}), //No I18N
			dueInDays :Lyte.attr('boolean',{default : false}), //No I18N
			nocCondition : Lyte.attr('boolean',{default : false}), //no i18n
			users : Lyte.attr('array'),//No I18N
			dropdowndata : Lyte.attr('array'),//No I18N
			pickList : Lyte.attr('boolean'),//No I18N
			lookup : Lyte.attr('boolean'), //No I18N
			criteriaObject : Lyte.attr('object'), //No I18N
			setCriteriaObj : Lyte.attr('object'), //No I18N
			tags : Lyte.attr('array'),//No I18N
			layout : Lyte.attr('array'),//No I18N
			emptyFieldShow : Lyte.attr('boolean',{default :false}), //NO I18N
			emptyPicklistShow : Lyte.attr('boolean',{default :false}), //No I18N
			searchValue : Lyte.attr('string'), // No I18N
			showEmpty : Lyte.attr('boolean',{default : false}), //No I18N
			condArray : Lyte.attr('array'), //No I18n
			dataType : Lyte.attr('string',{default : ''}), //no i18n
			callModule : Lyte.attr('string',{default : ''}), //no i18n
			lookupField : Lyte.attr('string',{default : ''}), //no i18n
			betweenCond : Lyte.attr('boolean',{default : false}), //no i18n
			elementsCond : Lyte.attr('string'),  //no i18n
			noneCondition : Lyte.attr('boolean',{default : true}),  //no i18n
			ageInDaysCond : Lyte.attr('boolean',{default : false}),  //no i18n
			disableText : Lyte.attr('string'), //no i18n
			displayField : Lyte.attr('object'), //No I18n
			showComparator : Lyte.attr('boolean',{default : true}),//No I18N
			selectedAgeInDays : Lyte.attr('object'), //No I18N
			showFieldsDropdown : Lyte.attr('boolean',{default : false}), //No I18N
			cxPropShowLoggedInUser : Lyte.attr('boolean'), //No I18N
			gotFields : Lyte.attr('boolean',{default : false}), //No I18N
			gotComparator : Lyte.attr('boolean',{default : false}), //no i18n
			cxPropNoneField : Lyte.attr('boolean'), //no i18n
			showFieldInTitle : Lyte.attr('boolean',{default : false}), //no i18n
			numberFieldException : Lyte.attr('object',{default : { 'Solutions':"Solution_Number",'Invoices':"Invoice_Number",'SalesOrders':"SO_Number",'Quotes':"Quote_Number",'Cases':"Case_Number"}}), //no i18n
			unusedField : Lyte.attr('object'), //no i18n
			textAreaMaxLength : Lyte.attr('number'), //no i18n
			maxLen : Lyte.attr('number'), //no i18n
			cxPropShowAllFields : Lyte.attr('boolean'), //no i18n
			cxPropBoundary : Lyte.attr("object",{default : {}}),//no i18n
            cxPropAppearance: Lyte.attr('string', {default: 'flat'}),    //NO I18N
			prefixArray : Lyte.attr('array',{default : []}), //no i18n
			selectedArray : Lyte.attr('array',{default : []}), //no i18n
			showArray : Lyte.attr('object',{default : {}}), //no i18n
			showExtraColumn : Lyte.attr('boolean',{default : []}), //no i18n
			showField : Lyte.attr('boolean',{default : true}), //no i18n
			showFieldsCriteria : Lyte.attr('boolean',{default : true}), //no i18n
			dynamicColumn : Lyte.attr('boolean'), //no i18n
			textMaxLength : Lyte.attr('number'), //no i18n
			criteriaNumber : Lyte.attr('string'), //no i18n
			moduleMapping : Lyte.attr('array'), //no i18n
			moduleRecordMapping : Lyte.attr('object'), //no i18n
		    disabledListDropdown : Lyte.attr('array',{default : ["prevent"]}),//no i18n
		    boxButtonWidth : Lyte.attr('string'),//no i18n
		    undefinedData : Lyte.attr('object'), //no i18n
		    currencyProperties : Lyte.attr('object'), //no i18n
		    tabIndex : Lyte.attr('number'), //no i18n
		    datePattern : Lyte.attr('string'), //no i18n
		    timeFormat : Lyte.attr('string'), //no i18n
		    timeZone : Lyte.attr('string'), //no i18n
		    cxPropId : Lyte.attr('string'), //no i18n
		    cxPropLayout : Lyte.attr('string'), //no i18n
		    userComponentProperties : Lyte.attr('object'), //no i18n
	      	emptyObject : Lyte.attr('object',{default : {}}), //no i18n
	      	emptyArray : Lyte.attr('array',{default : []}), //no i18n
			secondaryModule : Lyte.attr('string'), //no i18n
			dynamicTypeValue : Lyte.attr('boolean'), //no i18n
			showSecondaryModuleDropdown : Lyte.attr('boolean'), //no i18n
			secondaryModuleDisplayName : Lyte.attr('string'), //no i18n
	      	ageInDaysMax : Lyte.attr('number',{default : 9999}), //no i18n
	      	dynamicTypeValueSelected : Lyte.attr('string',{default : 'value'}), //no i18n
	      	hideSecondayModule : Lyte.attr('boolean',{default : false}), //no i18n
	      	disabledDynamicValueDropdown : Lyte.attr('boolean',{default : false}), //no i18n
	      	showFieldErrorMsg : Lyte.attr('string'), //no i18n
	      showCondErrorMsg : Lyte.attr('string'), //no i18n
	      showValueErrorMsg : Lyte.attr('string',{default : ""}), //no i18n
	      showSecFieldErrorMsg : Lyte.attr('string'), //no i18n
	      	dynamicallyFedField : Lyte.attr('boolean',{default : false}), //no i18n
	      	dynamicTypeValueOptions : Lyte.attr('array'), //no i18n
	      	roleComponentRequestModal : Lyte.attr('string',{default : 'role'}), //no i18n
	      	hideFieldComparatorValue : Lyte.attr('boolean',{default : false}), //no i18n
	      	relatedFields : Lyte.attr('array',{default : []}), //no i18n
	      	hidePrimarySelectedField : Lyte.attr('boolean',{default : false}), //no i18n
	      	tooltipConfig : Lyte.attr('string'), //no i18n
	      	showErrorForEmptyCriteria : Lyte.attr('boolean'), //no i18n
	      	cxPropForceSetCondition : Lyte.attr('boolean'), //no i18n
	      	cxPropDisabled : Lyte.attr('boolean',{default : false}), //no i18n
	      	cxPropDisabledGroupOperator : Lyte.attr('boolean',{default : false}), //no i18n
			roleComponentProperties : Lyte.attr('object'),
			profileComponentProperties : Lyte.attr('object'),
			queryParam : Lyte.attr('object', {default : {}}),
			userTypeField : Lyte.attr('object'),
	      	allowEmptyChildCriteria : Lyte.attr('boolean'), //no i18n
	      	alwaysShowChildCriteria : Lyte.attr('boolean'), //no i18n
	      	showChildCriteria : Lyte.attr('boolean'), //no i18n
	      	childCriteriaCheckboxLael : Lyte.attr('string',{default : 'Add condition'}),
	      	childCriteriaCheckboxTitle : Lyte.attr('string',{default : ''}),
	      	hideCriteriaAddRemove : Lyte.attr('object'),
	      	disabledChildCriteria : Lyte.attr('boolean',{default : true}),
	      	disabledRecordStateConfig : Lyte.attr('boolean'), //no i18n
			previousNextComp : Lyte.attr('boolean',{default : false}), //no i18n
			changePreviousNextSelected : Lyte.attr('string',{default : 'days'}), //no i18n
			maskingProperties : Lyte.attr('object') //no i18n
		}
	},
	init : function(){
		this.setData('showChildCriteria',this.data.alwaysShowChildCriteria); //no i18n
		this.moduleApiMapping = {};
		this.moduleIdMapping = {};
		this.hideDropdowns(0);
		if(this.data.prefixArray.length >= 1){
			this.setData('showField',false); //no i18n
		}
		this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
		if(this.getData('setCriteriaObj')&&Object.keys(this.getData('setCriteriaObj')).length!=0){
			this.setCriteria(this.getData('setCriteriaObj'));//No I18N
		}else if(!this.getData('cxPropNoneField') && this.data.prefixArray.length == 0){ //no i18n
			var field = this.executeMethod('getFieldsForHeader',true); //No I18N
			Lyte.arrayUtils(this.getData('fields'),'push',field);//No I18Nshow
			this.setData('selectedField',field); //No I18N
			this.changeFieldFunction(true);
		}else{
			if(this.data.prefixArray.length > 0){
				for(var i=0;i<this.data.prefixArray.length;i++){
					var prefix = this.getData('prefixArray')[i];
					var value={}
					if(i == 0 && (prefix.cxPropDisableNone || prefix.type == 'text')){
						var data = this.executeMethod("getPrefixValues", 0, this.getData("selectedArray"), this.getDeveloperArg(0 - 1, this.data.selectedArray),undefined,undefined,this.data.criteriaIndex); //no i18n
						Lyte.Component.set(this.getData('showArray'),prefix.apiValue,data)//No I18N
						value[prefix.systemValue] = data[0][prefix.systemValue];
						value[prefix.displayValue] = data[0][prefix.displayValue];
					}else{
						value[prefix.systemValue] = '-1';
						value[prefix.displayValue] = _cruxUtils.getI18n('None');
					}

					var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
					Lyte.arrayUtils(this.data.selectedArray,'push',criteria); //NO I18N
					if(prefix.type == 'text'){
						this.hideDropdowns(i+1);
					}
				}
			}
			var checkingSomething
			var _this = this;
			if(this.data.prefixArray && this.data.prefixArray.length > 0 && this.data.prefixArray[0].cxPropDisableNone && this.getData('showArray')[this.data.prefixArray[0].apiValue]){
				var prefix = this.getData('prefixArray')[0];
				if(prefix.apiValue == 'module'){
					this.setData('module',this.getData('showArray')[prefix.apiValue][0].lookup ? this.getModuleFromApiName(_this.getData('showArray')[prefix.apiValue][0].lookup.module.api_name,this.data.moduleRecordMapping) : this.getData('showArray')[prefix.apiValue][0].module_name ? this.getData('showArray')[prefix.apiValue][0].module_name : this.getData('showArray')[prefix.apiValue][0][prefix.systemValue])
				}
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : this.getData('showArray')[prefix.apiValue][0]};//No I18N
				this.executeMethod('getPrefixValues',this.getData('prefixArray')[1] ? 1 : -1,this.getData('selectedArray'),this.getDeveloperArg(0,this.data.selectedArray),undefined,undefined,this.data.criteriaIndex); //no i18n
				this.changePrefixFunction(0);
			}
			this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
			this.changeFieldFunction(true);
		}
		if(!this.data.showFieldsCriteria){
			var a = this.executeMethod('getPrefixArray',this.data.prefixArray.length-1,this.getData('selectedArray'),this.getDeveloperArg(this.data.prefixArray.length-1,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			if(a){
				if(typeof a.cxPropShowChildCriteria !== 'undefined'){
					this.setData('showChildCriteria',a.cxPropShowChildCriteria);
				}
				if(a.cxPropChildCriteriaConditionLabel){
					this.setData('childCriteriaCheckboxLael',a.cxPropChildCriteriaConditionLabel);
				}
				if(a.cxPropChildCriteriaConditionTitle){
					this.setData('childCriteriaCheckboxTitle',a.cxPropChildCriteriaConditionTitle);
				}
				if(typeof a.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',a.cxPropDisableChildCriteria);
				}
			}
		}
		if(this.data.dynamicColumn){
			this.setData('showFieldsCriteria',false);//No I18N
		}
	},
	hideDropdowns : function(index){
		var preLen = this.data.prefixArray ? this.data.prefixArray.length : 0;
		for(var i=0;i<preLen;i++){
			if(i<=index){
				Lyte.Component.set(this.getData('prefixArray')[i],'showValue',true); //no i18n
			}else{
				var prefix = this.getData('prefixArray')[i];
				var value={}
				value[prefix.systemValue] = '-1';
				value[prefix.displayValue] = _cruxUtils.getI18n('None');
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',i,criteria); //no i18n
				}
				Lyte.Component.set(this.getData('prefixArray')[i],'showValue',false); //no i18n
			}
		}
		this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
		this.setData('selectedComparator',{system: "None", display: _cruxUtils.getI18n('None')}) //no i18n
		this.setData('showEmpty',false); //No I18N
		this.setData('selectUser',false);//No I18N
		this.setData('pickList',false);//No I18N
		this.setData('showFieldErrorMsg',undefined);
		this.setData('showCondErrorMsg',undefined);
		this.setData('showSecFieldErrorMsg',undefined);
		this.setData('showValueErrorMsg',"")
		this.setData('lookup',false); //No I18N
		this.setData('betweenCond',false) //no i18n
		this.setData('ageInDaysCond',false); //no i18n
		this.setData('noneCondition',true); //no i18n
		this.setData('disableText',''); //no i18n
		this.setData('value',[""]); //no i18n
		this.setData('fcomp',undefined); //no i18n
		if(this.getData('prefixArray') && this.getData('prefixArray').length == index){
			this.setData('showField',true); //no i18n
		}else{
			this.setData('showField',false); //no i18n
		}
		this.setData('showComparator',true) //no i18n
	},
	getValue : function(skipValidation,valueValidation,inlineMessage,criteriaHeaderOpt){
		this.setData({showFieldErrorMsg : undefined,showCondErrorMsg : undefined,showValueErrorMsg : "",showSecFieldErrorMsg : undefined});
		this._skipVal = skipValidation;
		this.showInlineMsg = inlineMessage;
		var d=this.$node;
		var mainDiv = d.querySelector('#searchval_div'); //No I18N
		var value=this.getData('fvalue'); //No I18N
		var type = this.data.dynamicTypeValueSelected;//No I18N
		if(this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected == 'field' || !this.data.dynamicTypeValue) && !this.getData('noneCondition')){
			type = 'field';//No I18N
			if(!this.data.dynamicallyFedField){
				// value = '${!'+this.data.secondaryModule+'.'+this.data.selectedSecField.api_name+'}'
				value={};
				value.api_name = this.modifyApiName(this.data.selectedSecField.api_name,this.data.selectedSecField);
				value.id = this.data.selectedSecField.id;
				value.fieldRecord = this.data.selectedSecField
				// var metaData = {}
				// metaData.condition_value = value;
				// metaData.field = (({ api_name,field_label,id }) => ({ api_name,field_label,id }))(this.data.selectedSecField);
				// metaData.module = {api_name : this.data.secondaryModule};
				// this.executeMethod('criteriaMetaMethod',metaData); //no i18n
			}
		}else{
			type = this.data.dynamicTypeValueSelected;//No I18N
			var apiModification;
			if(this.data.dynamicElementComponentRender && !this.getData('noneCondition')){
				var dynamicDiv=mainDiv.querySelector('.cxCriteriaDynamicElement'); //No I18N
				if(!dynamicDiv || (!dynamicDiv.component.validate() && !skipValidation)){
					_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
					this._skipVal = undefined
					this.showInlineMsg = undefined
					return false;
				}
				value=dynamicDiv.component.getValue();
			}else{
				if(this.getData('ageInDaysCond')){
					if(this.data.betweenAgeInDaysCond){
						var numdiv1=mainDiv.querySelector('#ageValueInput1'); //No I18N
						var numdiv2=mainDiv.querySelector('#ageValueInput2'); //No I18N
						if((!numdiv1.component.validate() || !numdiv2.component.validate())  && !skipValidation){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						var value1 = numdiv1.component.getValue();
						value1 = value1.trim();
						var value2 = numdiv2.component.getValue();
						value2 = value2.trim();
						value= ['${NOC'+value1+'}' , '${NOC'+value2+'}']
					}else{
						var numdiv=mainDiv.querySelector('crux-number-component'); //No I18N
						if(!numdiv.component.validate() && !skipValidation){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						var val=numdiv.component.getValue();
						val = val.trim();
						if(this.data.previousNextComp){
							value="${"
							value+= this.data.selectedComparator.system === 'previous' ? 'LAST_N_' : 'NEXT_N_'
							value+= this.data.changePreviousNextSelected.toUpperCase();
							value+="}:"
							value+= val;
						}else if(this.getData('ageInDays')){
							value='${AGEINDAYS}+'+val;//No I18N
						}else if(this.getData('dueInDays')){//No I18N
							value='${DUEINDAYS}+'+val;//No I18N
						}else if(this.data.nocCondition){
							value='${NOC'+val+'}';//no i18n
						}
					}
				}
				else if(this.getData('betweenCond')){
					if((!mainDiv.querySelector('#betweenComponent1').component.validate() || !mainDiv.querySelector('#betweenComponent2').component.validate()) && !skipValidation){
						_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
						this._skipVal = undefined
						this.showInlineMsg = undefined
						return false;
					}
					var value1 = mainDiv.querySelector('#betweenComponent1').component.getValue();  //no i18n
					var value2 = mainDiv.querySelector('#betweenComponent2').component.getValue();  //no i18n
					if(this.data.elementsCond == 'number'){
						value1 = value1.trim();
						value2 = value2.trim();
					}
					value=[value1,value2]
				}else if(!this.getData('noneCondition')){ //no i18n
					if(!mainDiv.querySelector('#elementComponent').component.validate() && !skipValidation){
						this._skipVal = undefined
						this.showInlineMsg = undefined
						return false;
					}
					value = mainDiv.querySelector('#elementComponent').component.getValue(this.data.dynamicTypeValueSelected === 'record_category' ? 'actual_value' : ''); //eslint-disable-line @zoho/webperf/no-multipleDOMLookup
					value = Array.isArray(value) && value.length == 1 ? value[0] : value;
					if(value && typeof value == 'string'){
						value = value.trim();
					}
					if(this.data.elementsCond == 'number'){
						value = value.trim();
					}
					if(this.data.selectCond == 'text' && Array.isArray(value)){
						var temp = [];
						for(var i=0;i<value.length;i++){
							if(value[i].trim() != ""){
								temp.push(value[i].trim());
							}
						}
						if(temp.length == 0){
							this.executeMethod('onValueError',this.getData('criteriaIndex'),_cruxUtils.getI18n("crm.field.valid.check", Lyte.Component.registeredHelpers.cruxEncodeHTML(this.getData('selectedField').field_label))); //no i18n
							this._skipVal = undefined
							this.showInlineMsg = undefined
							return false;
						}
						value = temp;
					}
					if(this.data.selectedField.ui_type==137){
		                var temp=[]
		                if(Array.isArray(value)){
		                    for(var i=0;i<value.length;i++){
		                    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value[i]}  );//eslint-disable-line no-loop-func
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].api_name);
						    	}
						    	else{
		                            temp.push(value[i]);

						    	}
						    }
					    }
					    else{
					    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value}  );
					    	if(recordObj[0]){
					    		temp.push( recordObj[0].api_name);//eslint-disable-line no-loop-func
					    	}
					    	else{
		                        temp.push(value);
					    	}
					    }
		                value=temp;
		                temp = [];
		                if(Array.isArray(value)){
		                    for(var i=0;i<value.length;i++){
		                      	var api_name ={"api_name":value[i].trim()};
		                      	temp[i]=api_name;
		                    }
		                }
		                else{
		                    var api_name ={"api_name":value.trim()};  //no i18n
		                    temp[0]=api_name;
		                }
		                value=temp;
		            }
					if(this.data.selectedField.api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
						if(Array.isArray(value)){
							var temp=[]
							for(var i=0;i<value.length;i++){
								temp.push(Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value[i]})[0].api_name)//eslint-disable-line no-loop-func
							}
							value = temp
						}else{
							value = Object.values(moduleRecordMapping).filter(function(item){return item.plural_label == value})[0].api_name
						}
					}
					if(this.data.selectedField.data_type == 'multi_module_lookup'){
						apiModification = value.module
						value = value.name;
					}
				}
			}
		}
		var criteria={}
		field=Object.assign({},this.getData('selectedField')) //no i18n
		criteria.field = {};
		criteria.field.api_name = this.modifyApiName(field.api_name,field,apiModification);
		criteria.field=Object.assign(criteria.field,{id : field.id,field_label : field.field_label,data_type : field.data_type});
		if(criteria.field.data_type == 'formula'){
			criteria.field.formula = field.formula
		}
		if(criteria.field.data_type == 'rollup_summary'){
			criteria.field.rollup_summary = field.rollup_summary
		}
		if(field.decimal_place){
			criteria.field.decimal_place = field.decimal_place
		}
		if(field.separator){
			criteria.field.separator = field.separator
		}
		criteria.comparator = this.getData('ageInDaysCond') ? this.getData('selectedAgeInDays').system : this.getData('fcomp') ? this.getData('fcomp') : this.getData('selectedComparator').system; //No I18N
		criteria.value = value;
		criteria.type = type;
		if(this.data.selectedComparator.system == 'equal_role' || this.data.selectedComparator.system=='not_equal_role'){
			criteria.field.api_name = criteria.field.api_name+'.role';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-5)
		}
		if(this.data.selectedComparator.system == 'equal_group' || this.data.selectedComparator.system=='not_equal_group'){
			criteria.field.api_name = criteria.field.api_name+'.group';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-6)
		}
		if(this.data.selectedComparator.system == 'equal_type' || this.data.selectedComparator.system=='not_equal_type'){
			criteria.field.api_name = criteria.field.api_name+'.type__s';
			criteria.comparator = criteria.comparator.substr(0,criteria.comparator.length-5)
		}
		criteria.fieldRecord = this.getData('selectedField'); //no i18n
		var checField = skipValidation || !this.data.showFieldsCriteria ? true : this.checkValuesCondition(criteria,valueValidation);
		if(checField){
			if(criteria.field.api_name.match(/Tag/) && this.getData('selectedField').module && this.getData('selectedField').module[0].module_name == 'Activities'){
				var g = [];
				g.push({comparator:criteria.comparator  ,field :{api_name : 'Tag', id : criteria.field.id},value : criteria.value})
				g.push({comparator:"equal" ,field :{ api_name : "Activity_Type"},value : criteria.field.api_name.split('.')[0]})
				criteria = {group_operator : 'AND', group : g} //no i18n
			}
			if(this.data.prefixArray.length >= 1){
				if(this.data.criteriaFormat == 'quoteLineItem'){
					var secCri = {}
					var quoteModule = this.data.selectedArray[1].value[this.data.prefixArray[1].systemValue];
					secCri.field = {api_name : this.data.selectedArray[0].value[this.data.prefixArray[0].systemValue]+'->'+quoteModule+'.'+this.data.displayField[quoteModule][0]};
					secCri.comparator = 'equal' //no i18n
					secCri.value = this.data.selectedArray[2].value[this.data.prefixArray[2].displayValue]
					criteria = this.joinCriteria(secCri,criteria);
				}else if(this.data.criteriaFormat === 'relatedModuleChildCriteria' && (!criteriaHeaderOpt || !criteriaHeaderOpt.skipChildren)){
					var childC;
					if(this.data.showChildCriteria){
						var cNode =  this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex);
						childC = cNode && cNode.getCriteria({skipValidation : skipValidation});
					} 
					if(!childC && !this.data.allowEmptyChildCriteria){
						return childC;
					}
					var pC = {}
					this.data.selectedArray.forEach(function(item){
						pC[item.api_name] = item.value;
					})
					pC.criteria = childC;
					criteria = pC
				}else{
					var md = this.data.prefixArray.filter(function(item){return item.apiValue == 'module'})[0];
					if(md && criteria.field){
						var index = this.data.prefixArray.indexOf(md);
						criteria.field.api_name =this.data.selectedArray[index].value[this.data.prefixArray[index].systemValue]+'.'+criteria.field.api_name;
					}
					if(!this.data.showFieldsCriteria){
						criteria = {}
					}
					for(var i=this.data.prefixArray.length -1;i>=0;i--){
						if(this.data.prefixArray[i].apiValue != 'module'){
							criteria = this.joinCriteria(this.data.selectedArray[i],criteria);
						}
					}
				}
			}
			this._skipVal = undefined
			this.showInlineMsg = undefined
			return criteria;
		}
		this._skipVal = undefined
		this.showInlineMsg = undefined
		return checField;
	},
	modifyApiName : function(api,field,apiModification){
		if(["Activities","Calls","Events","Tasks"].indexOf(this.data.module) > -1){
			if(api.endsWith('What_Id') || field.api_name.endsWith('What_Id.name')){
		 		return api
		 	}
		 	if(this.data.apiVersion == 'criteria' && (api.endsWith('Who_Id') || field.api_name.endsWith('Who_Id.name'))){
		 		return api
		 	}
		}else if(api == 'Data_Processing_Basis' && this.data.apiVersion != 'EQL'){ //no i18n
			return 'Data_Processing_Basis_Details.Data_Processing_Basis'; //no i18n
		}

		if(field.data_type == 'lookup' && field.lookup && field.lookup.module){
			if(this.getData('displayField')[this.getModuleFromId(field.lookup.module.id,this.data.moduleRecordMapping)]){
				return api +'.'+this.getData('displayField')[this.getModuleFromId(field.lookup.module.id,this.data.moduleRecordMapping)][0];
			}else{
				return api +'.'+'Name';
			}
		}

		if(field.data_type == 'multi_module_lookup' && apiModification){
			if(this.getData('displayField')[this.getModuleFromId(apiModification.id,this.data.moduleRecordMapping)]){
				return api +'->'+apiModification.api_name+'.'+this.getData('displayField')[this.getModuleFromId(apiModification.id,this.data.moduleRecordMapping)][0];
			}else{
				return api +'->'+apiModification.api_name+'.Name';
			}
		}

		return api;
	},
	checkValuesCondition : function(item,valueValidation){
		var obj=item.field,errorMsg;
		if(this.data.selectedArray && this.data.selectedArray.length && this.data.selectedArray[0].value[this.data.prefixArray[0].systemValue] == -1){
			if(this.data.criteriaIndex != 1 || this.data.totalCriteria > 1){
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header.js", "Feb Default Changes");
				// this.throwEvent('alertEvent',this.data.prefixArray[0].cxPropErrorMsg,this.data.prefixArray[0],this.data.criteriaIndex);  //No I18N
				if(!this._skipVal){

					var em = this.executeMethod('onValueError',this.getData('criteriaIndex'),this.data.prefixArray[0].cxPropErrorMsg,this.data.prefixArray[0]); //no i18n
					if(em && this.showInlineMsg){
						Lyte.Component.set(this.data.prefixArray[0],'showError',em);
					}
				}
				return false;
			}
			return undefined;
		}
		if(obj.api_name == "" || obj.api_name=="None" || obj.api_name==null){
			if(this.data.prefixArray && this.data.prefixArray.length == 0 && this.data.criteriaIndex == 1 && this.data.totalCriteria == 1 && !this.data.showErrorForEmptyCriteria){
				return undefined
			}
			if(!this._skipVal){
				if(this.showInlineMsg){
					this.setData('showFieldErrorMsg',_cruxUtils.getI18n('crux.criteria.fieldlabel.valid.check',this.data.criteriaIndex) ) //No I18N 
				}else{
					this.throwEvent('alertEvent',_cruxUtils.getI18n('crm.criteria.fieldlabel.valid.check',this.data.criteriaIndex));  //No I18N
				}
			}
			return false;
		}
		else if(item.comparator == "" || item.comparator=="None" || item.comparator===null){
			errorMsg = _cruxUtils.getI18n('crm.criteria.condition.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)) //No I18N 
			if(!valueValidation && !this._skipVal){
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
				if(this.showInlineMsg){
					this.setData('showCondErrorMsg',errorMsg) //No I18N 
				}else{
					this.throwEvent('alertEvent',errorMsg);  //No I18N
				}
				return false;
			}
			return undefined;
		}else if(!this.data.selectedField.cxPropIgnoreEmptyValue && (item.value === "" || item.value === null)){
			errorMsg = _cruxUtils.getI18n('crm.field.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)) //No I18N 
			if(this.showInlineMsg){
				this.setData('showValueErrorMsg',errorMsg) //No I18N 
			}else{
				this.throwEvent('alertEvent',errorMsg);  //No I18N
			}
			return false;
		}else if(!this.data.dynamicallyFedField && this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected =='field' || !this.data.dynamicTypeValue) && this.data.selectedSecField.id == '-1'){
			errorMsg = _cruxUtils.getI18n('crm.field.valid.check',$ESAPI.encoder().encodeForHTML(obj.field_label)); //No I18N
			if(!this._skipVal){
				if(this.showInlineMsg){
					this.setData('showSecFieldErrorMsg',errorMsg ) //No I18N 
				}else{
					this.throwEvent('alertEvent',errorMsg);  //No I18N
				}
			}
			return false;
		}
		else if(item.comparator.match(/between/)){
			var data_type = item.field.data_type
			if(data_type == 'formula'){
				data_type = item.field.formula.return_type;
			}
			if(data_type == 'rollup_summary'){
				data_type = item.field.rollup_summary.return_type;
			}
			if(data_type == 'time'){
				return true;
			}
			if(data_type == 'datetime' || data_type == 'date'){
				if(item.value[0]>item.value[1]){
					errorMsg = _cruxUtils.getI18n('crm.custom.field.less.than.equalto',_cruxUtils.getI18n('workflow.option.webhookFailure.fromDate'),_cruxUtils.getI18n('workflow.option.webhookFailure.toDate')) //No I18N 
					if(this.showInlineMsg){
						this.setData('showValueErrorMsg',errorMsg) //No I18N 
					}else{
						this.throwEvent('alertEvent',errorMsg);  //No I18N
					}
					return false;
				}
			}else {
				if(( item.value[0].match('NOC') && parseFloat(item.value[0].replace(/\D/g, '')) >= parseFloat(item.value[1].replace(/\D/g, '')) ) || parseFloat(item.value[0]) >= parseFloat(item.value[1])) {
					errorMsg = _cruxUtils.getI18n('crm.custom.field.less.than.to') //No I18N 
					if(this.showInlineMsg){
						this.setData('showValueErrorMsg',errorMsg) //No I18N 
					}else{
						this.throwEvent('alertEvent',errorMsg);  //No I18N
					}
					return false;
				}
			}
		}
		return true;
	},
	joinCriteria : function(c1,c2){
		if(Object.keys(c1).length == 0){
			return c2
		}
		if(Object.keys(c2).length == 0){
			return c1
		}
		var c={};
		c.group_operator = 'and'; //no i18n
		c.group=[];
		c.group[0]=c1;
		c.group[1]=c2;
		return c;
	},
	setCriteria : function(criteriaObj){
		this.setData('showEmpty',false); //No I18N
		this.setData('selectUser',false);//No I18N
		this.setData('pickList',false);//No I18N
		this.setData('lookup',false); //No I18N
		this.setData('betweenCond',false) //no i18n
		this.setData('ageInDaysCond',false); //no i18n
		this.setData('noneCondition',true); //no i18n
		this.setData('value',undefined); //no i18n
		this.setData('fcomp',undefined); //no i18n
		var criteriaArray=[]
		if(criteriaObj.field == undefined){
			criteriaArray = this.getCriteriaArray(criteriaObj,[]);
		}
		else{
			criteriaArray.push(criteriaObj);
		}
		if(this.data.prefixArray.length > 0 && criteriaArray.length < 2 && this.data.prefixArray.cruxFindIndexOfObject('apiValue','module') > -1){
			var array=this.getModuleFromCriteria(criteriaArray[criteriaArray.length-1]);
			this.setData('module', array[0].value.lookup ? this.getModuleFromApiName(array[0].value.lookup.module.api_name,this.data.moduleRecordMapping) : array[0].value.module_name ? array[0].value.module_name : this.getModuleFromApiName(array[0].value.api_name,this.data.moduleRecordMapping))
			criteriaArray.splice(criteriaArray.length-1,1);
			criteriaArray = criteriaArray.concat(array);
		}
		var criteriaFormat = this.data.criteriaFormat;
		var criteria
		if(criteriaFormat == 'quoteLineItem' && criteriaArray[0].field && criteriaArray[0].field.api_name.match('->') && criteriaArray.length == 1){
			criteriaFormat = 'quoteLineItem5'; //no i18n
		}else{
			if(this.data.showFieldsCriteria){
				criteria= criteriaArray.pop();	
			}
 			
		}
		if(criteriaFormat == 'quoteLineItem' || criteriaFormat == 'quoteLineItem5'){
			this.setData('selectedArray',this.parseCriteriaArray(criteriaArray)); //NO I18N
		}else if(criteriaFormat == 'relatedModuleChildCriteria'){
			var criteriNewArray = []
			this.data.prefixArray.forEach(function(item,index){
			    criteriNewArray.push({api_name : item.apiValue,comparator : 'equal',value : criteriaObj[item.apiValue]})
			    Lyte.Component.set(this.getData('prefixArray')[index],'showValue',true); //no i18n
			}.bind(this));
			if(criteriaObj.criteria){
				
				this.setData('childSetCriteria',criteriaObj.criteria)
				this.setData('childCriteria',true);
				this.setData('disabledChildCriteria',false);
				this.setData('showChildCriteria',true);
			}
			this.setData('selectedArray',criteriNewArray)
		}else{
			this.setData('selectedArray',criteriaArray); //NO I18N
		}
		if(criteriaFormat != 'quoteLineItem5' && criteriaFormat != 'relatedModuleChildCriteria'){
			var unformattedFieldApi = criteria.field.api_name,multiModule;
			criteria.rawField = Object.assign({},criteria.field)
			this.executeMethod('setFieldForCriteria',criteria); //no i18n
			Lyte.arrayUtils(this.getData('fields'),'push',criteria.field);//No I18N
			// if(criteria.field.unused){
			// 	this.setData('unusedField',criteria.field); //no i18n
			// }
			this.setData('selectedField',criteria.field); //No I18N
			var formulaDate = false;
			if(criteria.field.data_type == 'formula' || criteria.field.data_type == 'rollup_summary'){
				formulaDate = true;
			}
			var ageCond,ageValue;
			var condition=criteria.comparator;
			var value=criteria.value;
			var val=[];
			if(criteria.type != 'dynamic_component' && ((Array.isArray(value) && typeof value[0] == 'string' && value[0].match('NOC')) || (typeof value == 'string' && value.match(/\{/)) && (this.getData('selectedField').data_type == 'datetime' || this.getData('selectedField').data_type == 'date'|| formulaDate || value.match('NOC') || value == '${EMPTY}' || value == '${OPEN}' || value == '${CLOSEDWON}' || value == "${CLOSEDLOST}" || value == '${C_OPEN}' || value == '${C_COMPLETED}' || value == '${C_FAILED}' || value == '${NOTEMPTY}' || this.getData('selectedField').api_name.match(/Call_Status/)))){
					if(Array.isArray(value) && value[0].match('NOC')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Number of Characters';//No I18N
						val[0]=value[0].replace(/\D/g, '');
						val[1]=value[1].replace(/\D/g, '');
						this.setData('betweenAgeInDaysCond',true);
					}else if(value.match('LAST_N')){
						condition = 'previous'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						value=value.replace(/\D/g, '');
						this.setData('previousNextComp',true);
					}else if(value.match('NEXT_N')){
						condition = 'next'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						value=value.replace(/\D/g, '');
						this.setData('previousNextComp',true);
					}else if(value.match('DUEINDAYS')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Due in Days';//No I18N
						value=value.replace(/\D/g, '');
					}else if(value.match('AGEINDAYS')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Age in Days';//No I18N
						value=value.replace(/\D/g, '');
					}else if(value.match('NOC')){
						ageCond=condition.split('!')[0];
						ageValue=value;
						condition='Number of Characters';//No I18N
						value=value.replace(/\D/g, '');
					}else{
						if((condition == 'equal' || condition == 'contains') && value == '${EMPTY}'){
							condition = '${EMPTY}'//No I18N
						}else if(value == '${EMPTY}' || value == '${NOTEMPTY}'){//No I18N
							condition = '${NOTEMPTY}'//No I18N
						}else{
							condition = value;
						}
					}
			}
			this.setData('dynamicTypeValueSelected',criteria.type);
			if(criteria.field.data_type == 'userlookup' || criteria.field.data_type == 'ownerlookup'){
				if(criteria.rawField.api_name.indexOf('.role') > -1){
					condition = condition+'_role'
				}else if(criteria.rawField.api_name.indexOf('.group') > -1){
					condition = condition+'_group'
				}else if(criteria.rawField.api_name.indexOf('.type__s') > -1){
					condition = condition+'_type'
				}
			}
			this.changeFieldFunction(undefined,condition);
			this.setData('showField',true); //no i18n
			if(criteria.type == 'field'){
				if(this.data.dynamicallyFedField){
					this.setData('showSecondaryModuleDropdown',true);
					this.setData('disableText',criteria.value.display)
					this.setData('fvalue',criteria.value); //No I18N
				}else{
					this.setData('selectedSecField',this.executeMethod('getRelatedFields',value)); //no i18n
					if(this.data.selectedSecField && this.data.selectedSecField.parentCriteriaFieldGroup){
						this.setData('secondaryModuleDisplayName',this.data.selectedSecField.parentCriteriaFieldGroup.cxPropLabel)
					}
					if(!this.data.secondaryModuleDisplayName && this.data.selectedSecField.module && this.data.selectedSecField.module.length){
						this.setData('secondaryModuleDisplayName',this.data.selectedSecField.module[0].plural_label)
					}
				}
				this.changeDynamicTypeFunction('field',true);
			}else{
				this.setData('showSecondaryModuleDropdown',false); //no i18n
				this.changeDynamicTypeFunction(this.data.dynamicTypeValueSelected,true);
				if(this.data.dynamicElementComponentRender){
					val[0] = value;
				}else{
					if(this.getData('pickList')){
						if(typeof value == 'string' && this.data.selectedField.cxPropType != "single"){
							value=[].concat(value);
						}
						if(this.data.selectedField.ui_type==137){
		                	var temp=[]
		                    if(Array.isArray(value)){
		                        for(var i=0;i<value.length;i++){
		                              if(value[i].api_name){
		                                 temp[i]=value[i].api_name;
		                              }
		                              else{
		                              	temp[i]=value[i];
		                              }
		                           }
		                        }
		                    else{
		                        if(value.api_name){
		                         	temp[0]=value.api_name;
		                        }
		                        else{
			                    	temp[0] = value;
			                    }
		                    }
			                value=temp;
			                temp = [];
		                    if(Array.isArray(value)){
		                        for(var i=0;i<value.length;i++){
		                        	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value[i]}  );//eslint-disable-line no-loop-func
							    	if(recordObj[0]){
								    		temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
								    	}
								    	else{
			                                temp.push(value);
			                            }
							    }
			                }else{
						    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value}  );
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
						    	}
						    	else{
	                                temp.push(value);
	                            }
						    }
		                    value=temp;
		                }else if(value[0] && value[0].indexOf('${CATEGORY') > -1 && !this.data.disabledRecordStateConfig){
							this.setData('dynamicTypeValueSelected','record_category');
							if(!this.data.selectedField.enable_record_category){
								Lyte.objectUtils(this.data.selectedField,'add','enable_record_category',true);
							}
							var cpV = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
							this.setData('customPicklistValues',cpV);
							var tempp = [];
							value.forEach((item)=>{
								var t = cpV.cruxFindIndexOfObject('actual_value',item);
								tempp.push(cpV[t] ? cpV[t].display_value : item);
							});
							value = tempp;
						}else if(this.data.dynamicTypeValueSelected === 'record_category'){
							var customp = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
							this.setData('customPicklistValues',customp);
						}
						if(this.data.selectedField.api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
							if(Array.isArray(value)){
								var temp=[]
								for(var i=0;i<value.length;i++){
									temp.push(moduleRecordMapping[value[i]].plural_label)
								}
								value = temp
							}else{
								value = moduleRecordMapping[value].plural_label
							}
						}
						val[0] = value;
					}else if(this.getData('selectUser')){ //no i18n
						if(criteria.rawField.api_name.indexOf('.role') > -1 || criteria.rawField.api_name.indexOf('.group') > -1 || criteria.rawField.api_name.indexOf('.type__s') > -1){
							if(!Array.isArray(value)){
								val[0] = [].concat(value);
							}else{
								val[0] = value
							}
						}else{
							val[0] = {'users' : value}
						}
					}else if(this.getData('elementsCond') == 'tag'){ //no i18n
						val[0] = [].concat(value)
					}else if(this.getData("elementsCond") == 'layout'){ //no i18n
						val[0] = {'layouts' : value}
					}else if(ageCond){
						for(var i=0;i<this.getData('ageindays').length;i++){
							if(this.getData('ageindays')[i].system == ageCond){
								this.setData('selectedAgeInDays',this.getData('ageindays')[i]); //No I18N
							}
						}
						if(typeof value == 'string'){
							val[0] = value;
						}
					}else if(this.getData('betweenCond')){ //No I18N
						val = value;
					}else if(this.data.selectedField.data_type == 'multi_module_lookup'){
						var moduleExtracted = unformattedFieldApi.substr(unformattedFieldApi.indexOf('->')+2,unformattedFieldApi.length)
						moduleExtracted = moduleExtracted.substr(0,moduleExtracted.indexOf('.'))
						multiModule = this.data.moduleRecordMapping[this.getModuleFromApiName(moduleExtracted,this.data.moduleRecordMapping)]
						if(multiModule){
							val[0] = {name : value,module : {api_name : multiModule.api_name,id : multiModule.id}}
						}
					}else if((this.getData('elementsCond') == 'text' || this.getData('elementsCond') == 'text-area' || this.getData('elementsCond') == 'lookup')  && value){ //no i18n
						// if(typeof value == 'object'){ //no i18n
						// 	val[0] = "";
						// 	value.forEach(function(item,index){
						// 		val[0]+=item.replace(',','\\\\,')
						// 		if(index != value.length-1){
						// 			val[0]+=","
						// 		}
						// 	})
						// }else{
						// 	val[0] = value.replace(',','\\\\,')
						// }
						if(Array.isArray(value)){
							val[0] = value.join(',');
						}else{
							val[0] = value;
						}
					}else if(this.data.elementsCond == 'role' && !Array.isArray(value)){ //no i18n
						val[0] = [].concat(value);
					}else if(!this.getData('noneCondition')){ //no i18n
						val[0] = value;
					}
				}
			}
			this.setData('value',val); //No I18N
		}
	},
	fieldConditionSet : function(args){
		if(typeof args.cxPropShowSecondaryFields != "undefined"){
			this.setData('showSecondaryModuleDropdown',args.cxPropShowSecondaryFields)
			if(!this.data.showSecondaryModuleDropdown){
				this.setData('dynamicTypeValue',false)
			}
		}
		if(typeof args.cxPropDynamicValueType != "undefined"){
			_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
			this.setData('dynamicTypeValue',args.cxPropDynamicValueType)
		}
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
		if(typeof args.cxPropDynamicValueSelected != "undefined"){
			this.setData('dynamicTypeValueSelected',args.cxPropDynamicValueSelected);
		}
		if(typeof args.cxPropDynamicDisabled !== "undefined"){
			this.setData('disabledDynamicValueDropdown',args.cxPropDynamicDisabled);
		}
		if(typeof args.cxPropHideSecondayModuleName != "undefined"){
			this.setData('hideSecondayModule',args.cxPropHideSecondayModuleName)
		}
		if(typeof args.cxPropShowLoggedInUser !== 'undefined'){
			this.setData('cxPropShowLoggedInUser',args.cxPropShowLoggedInUser);
		}
		if(typeof args.cxPropSelectedField != 'undefined'){
			this.setData('selectedField',args.cxPropSelectedField);
		}
		if(typeof args.cxPropDynamicValueTypeOptions !== 'undefined'){
			this.setData('dynamicTypeValueOptions',args.cxPropDynamicValueTypeOptions);
		}
		if(typeof args.cxPropUserTypeField !== 'undefined'){
			this.setData('userTypeField',args.cxPropUserTypeField);
		}
	},
	changeConditionFunction : function(){
		this.setData('userTypeField',undefined);
		var args = this.executeMethod('onConditionSetCall',this.getData('criteriaIndex'),this.data.selectedComparator,this.data.selectedField);//No I18N
		if(args){
			this.fieldConditionSet(args);
		}
		this.setData('noneCondition',true); //no i18n
		this.setData('previousNextComp',false);
		var select = this.getData('selectCond');//No I18N
		var comparator,value,form;
		form = this.getData('selectedComparator'); //No I18N
		if(!this.data.disabledRecordStateConfig){
			var recordStateIndex = this.data.dynamicTypeValueOptions.cruxFindIndexOfObject('system','record_category');
			if(this.data.selectedField.enable_record_category && (this.data.selectedComparator.system === 'equal' || this.data.selectedComparator.system === 'not_equal')){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(recordStateIndex === -1){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'push',{display : _cruxUtils.getI18n('crm.record.category'),system : 'record_category'});
				}				
			}else if(recordStateIndex !== -1){
				Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'removeAt',recordStateIndex);

			}	
		}
		comparator=form.system;
		var value=null;
		if(this.data.selectedField.data_type ==  "ownerlookup" || this.data.selectedField.data_type == "userlookup"){
			if(comparator == 'equal_role' || comparator=='not_equal_role'){
				this.setData('elementsCond','role'); //no i18n
				this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'role')
			}else if(comparator == 'equal_group'){
				this.setData('elementsCond','role'); //no i18n
				this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'user_group')
			}else if(comparator === 'equal_type' || comparator === 'not_equal_type'){
				this.setData('elementsCond','picklist'); //no i18n
			}else{
				this.setData('elementsCond','user'); //no i18n
			}	
		}
		
		if(comparator=="None"){
			this.setData('disableText',''); //no i18n
		}
		else if(comparator == "${EMPTY}"){
			this.setData('noneCondition',true); //no i18n
			this.setData('disableText','${EMPTY}'); //no i18n
			comparator='equal';//No I18N
			value='${EMPTY}'; //no i18n
		}
		else if(comparator == "${NOTEMPTY}"){
			this.setData('noneCondition',true); //no i18n
			this.setData('disableText','${NOTEMPTY}'); //no i18n
			comparator='not_equal';//No I18N
			value='${EMPTY}';//no i18n
		}
		else if(comparator == "between" || comparator =="not_between"){
			this.setData('noneCondition',false); //no i18n
			this.setData('betweenCond',true); //no i18n
		}
		else if(comparator.match('{')){
			this.setData('noneCondition',true); //no i18n
			var text = this.data.selectedField.api_name == 'Call_Status' ? form.display : form.system; //no i18n
			if(text == '${OPEN}'){
			    text = '${'+ _cruxUtils.getI18n('crm.potential.all.open')+'}'
			}else if(text == '${CLOSEDWON}'){ //no i18n
			    text = '${'+_cruxUtils.getI18n('crm.potential.all.won')+'}'
			}else if(text == '${CLOSEDLOST}'){ //no i18n
			    text = '${'+_cruxUtils.getI18n('crm.potential.all.lost')+'}'
			}else if(text == '${C_OPEN}'){
				text = '${All Open}';
			}else if(text == '${C_COMPLETED}'){
				text = '${All Completed} '
			}else if(text == '${C_FAILED}'){
				text = '${All Failed}'
			}
			this.setData('disableText',text); //no i18n
			comparator='equal';//No I18N
			value=form.system;
		}
		else if(comparator == "Age in Days"){
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]);  //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('ageInDays',true); //No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}else if(comparator == "Due in Days"){ //No I18N
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('dueInDays',true); //No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}else if(comparator == "Number of Characters"){ //No I18N
			this.setData('noneCondition',false); //no i18n
			this.setData('ageindays',this.executeMethod('setConditions','ageInDays')) //No I18N
			this.setData('selectedAgeInDays',this.getData('ageindays')[0]); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('nocCondition',true); //No I18N
			this.setData('ageInDaysMax',this.data.selectedField.length); //no i18n
		}else if(comparator == 'previous' || comparator == 'next'){
			this.setData('noneCondition',false); //no i18n
			this.setData('previousNextComp',true);
			this.setData('selectedAgeInDays',{system : 'equal',display : 'is'}); //No I18N
			this.setData('ageInDaysCond',true)//No I18N
			this.setData('ageInDaysMax',9999); //no i18n
		}
		else{
			this.setData('noneCondition',false); //no i18n
		}
		this.setData('fcomp',comparator); //No I18N
		this.setData('fvalue',value); //No I18N
	},
	changeFieldFunction : function(set,comp){
		if(typeof cruxAssets !== "undefined" && cruxAssets.onCriteriaFieldSet){
			var args = cruxAssets.onCriteriaFieldSet(this.data.selectedField,this.data.criteriaIndex,{cxUserComponentProperties : this.data.userComponentProperties,cxModule : this.data.module});
			if(typeof args.cxPropSelectedField !== 'undefined'){
				this.setData('selectedField',args.cxPropSelectedField);
			}
		}
		var args = this.executeMethod('onFieldSetCall',this.getData('criteriaIndex'),this.data.selectedField.field_label,this.data.selectedField);//No I18N
		if(args){
			this.fieldConditionSet(args);
			if(typeof args.cxSelectedComparator != 'undefined'){
				comp = args.cxSelectedComparator;
				this.setData('gotComparator',false)
			}
		}
		if(this.data.selectedField && this.data.selectedField.module && this.data.selectedField.module.length > 0 && typeof this.data.selectedField.module[0] === 'object'){
			this.setData('module',this.data.selectedField.module[0].module_name == 'Activities' && this.data.selectedField.api_name.match(/Tag/) ? this.data.selectedField.sub_module.api_name : this.data.selectedField.module[0].module_name);
		}
		var selectId=this.getData('selectedField').data_type; //No I18N
		var value = this.getData('selectedField').api_name; //No I18N
		if(selectId == 'formula'){
			selectId = this.getData('selectedField').formula.return_type;//no i18n
		}
		if(selectId == 'rollup_summary'){
			selectId = this.getData('selectedField').rollup_summary.return_type;//no i18n
		}
		this.setData('maxLen',undefined); //no i18n
		var select="default",elementsCond="text"; //no i18n
		switch(selectId){
		case "none":
			select="none";//No I18N
			elementsCond = "none"; //no i18n
			break;
		case "text": case "email": case "phone": case "website": case "autonumber":
			select="text";//No I18N
			elementsCond = "text"; //no i18n
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		case "textarea":
			select="text";//No I18N
			elementsCond = "text-area"; //no i18n
			this.setData('maxLen',this.data.textAreaMaxLength); //no i18n
			break;
		case "multiselectpicklist":
			elementsCond="text";//No I18N
			select = "multiselectpicklist"; //no i18n
			break;
		case "currency": case "double": case "integer": case "bigint": case "decimal": case "longinteger": case 'percent':
			select="number";//No I18N
			elementsCond = "number"; //no i18n
			if(this.data.apiVersion == 'EQL'){
				this.setData('maxLen',this.data.selectedField.length); //no i18n
			}else{
				this.setData('maxLen',19); //no i18n
			}
			break;
		case "datetime":
			select="date";//No I18N
			elementsCond = "date-time"; //no i18n
			break;
		case "date":
			select="date";  //no i18n
			elementsCond = "date"; //no i18n
			break;
		case "time":
			select="time";  //no i18n
			elementsCond = "time"; //no i18n
			if(this.data.selectedField.cxPropTimeFormat){
				this.setData('timeFormat',this.data.selectedField.cxPropTimeFormat);
			}
			if(this.data.selectedField.cxPropDefaultTime){
				this.setData('value',[this.data.selectedField.cxPropDefaultTime,this.data.selectedField.cxPropDefaultTime])
			}
			break;
		case "boolean":
			select="boolean";//No I18N
			elementsCond = "boolean"; //no i18n
			break;
		case "ownerlookup":
		case "userlookup":
			select = "user";//No I18N
			elementsCond = "user"; //no i18n
			this.setData('selectUser',true);//No I18N
			break;
		case "multiselectlookup":
		case "multiuserlookup":
			select = "defEmpty"; //No I18N
			elementsCond = "text"; //no i18n
			break;
		case "picklist":
		case "radiobutton":
			this.setData('pickList',true); //No I18N
			select = "picklist";//No I18N
			elementsCond = "picklist"; //no i18n
			this.setData('maxLen',500); //no i18n
			break;
		case "lookup":
			select = "text"; //No I18N
			elementsCond = "lookup"; //no i18n
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		case "fileupload": 
		case "imageupload":
			select = "defEmpty";
			elementsCond = "text"; //no i18n
			break;
		case "multi_module_lookup":
			select = "multimodulelookup"; //No I18N
			elementsCond = "lookup"; //no i18n
			Lyte.Component.set(this.data.selectedField,'cxPropType','multi_module_lookup')
			this.setData('maxLen',this.data.textMaxLength); //no i18n
			break;
		}
		if(this.getData('numberFieldException')[this.data.module] == this.getData('selectedField').api_name){
			select="number";//No I18N
			elementsCond = "number"; //no i18n
			this.setData('maxLen',19); //no i18n
		}else if(this.criteriaApiNameCheck(value,'Tag')){ //no i18n
			select="defWithEmpty"; //No I18N
			elementsCond = "tag"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'tag')
		}else if(this.criteriaApiNameCheck(value,'Layout')){ //no i18n
			select ="default"; //No I18N
			elementsCond = "layout"; //no i18n
		}else if(this.criteriaApiNameCheck(value,'Wizard')){ //no i18n
			select = "default"; //no i18n
			elementsCond = "layout"; //no i18n
		}else if(selectId == 'lookup' && this.criteriaApiNameCheck(value,'role',this.data.selectedField)){ //no i18n
			select ="default"; //No I18N
			elementsCond = "role"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'role')
		}else if(this.criteriaApiNameCheck(value,'profile')){ //no i18n
			this.setData('pickList',false); //No I18N
			select ="default"; //No I18N
			elementsCond = "role"; //no i18n
			this.setData('roleComponentRequestModal',this.data.selectedField.cxPropRequestModel ? this.data.selectedField.cxPropRequestModel : 'profile')
		}else if(this.criteriaApiNameCheck(value,'Call_Status') && (this.data.module == 'Activities' || this.data.module =='Calls')){ //no i18n
			select = "cs"; //No I18N
		}else if(value.match(/Activity_Type/) && this.data.module == 'Activities'){ //no i18n
			select = "default"; //No I18N
			elementsCond = "picklist" //No I18N
			this.setData('pickList',true); //No I18N
			var pick_list_values = [{display_value :this.data.moduleRecordMapping.Tasks.plural_label ,actual_value :this.data.moduleRecordMapping.Tasks.api_name },{display_value :this.data.moduleRecordMapping.Calls.plural_label ,actual_value :this.data.moduleRecordMapping.Calls.api_name },{display_value :this.data.moduleRecordMapping.Events.plural_label ,actual_value :this.data.moduleRecordMapping.Events.api_name }];
			// Lyte.objectUtils(this.data.selectedField,"add","pick_list_values",pick_list_values);//no i18n
			// Lyte.objectUtils(this.data.selectedField,"add","cxPropDisableExtraValue",true);//no i18n
			this.data.selectedField.pick_list_values = pick_list_values;
			this.data.selectedField.cxPropDisableExtraValue = true;
		}else if(this.getData('selectedField').column_name == 'APPOINTMENTSTATUS' || this.getData('selectedField').column_name == 'SERVICESTATUS'){ //no i18n
			select = "default"; //no i18n
		}else if(this.criteriaApiNameCheck(value,'Stage')&& (this.data.module == 'Potentials' || this.data.module =='Deals')){ //no i18n
			select = "stage"; //No I18N
		}
		if(this.getData('selectedField').ui_type == 80){
			select = 'numberWithOEmpty'; //NO I18N
		}else if(this.getData('selectedField').ui_type == 137){ //no i18n
			this.setData('pickList',true); //No I18N
			select = "picklist";//No I18N
			elementsCond = "picklist"; //no i18n
			this.setData('maxLen',500); //no i18n
		}else if(this.data.selectedField.api_name == 'Data_Source' && select == "picklist"){ //no i18n
			select = 'default'; //no i18n
		}
		if(this.getData('selectedField').crypt){
		    select = (select == 'number' && this.getData('selectedField').data_type != 'currency') ? 'encryptNumber' : 'defEmpty'; //no i18n
		}
		if(typeof cruxAssets != "undefined" && cruxAssets.fieldDataTypeToCruxCompMapping && cruxAssets.fieldDataTypeToCruxCompMapping[selectId]){
			elementsCond = cruxAssets.fieldDataTypeToCruxCompMapping[selectId];
		}
		elementsCond = this.executeMethod('fieldToCruxCompMapping',this.data.selectedField,elementsCond);
		if(this.getData('selectedField').cxPropDynamicFieldValue){
			this.setData('dynamicallyFedField',true);
		}
		this.setData('selectCond',select);//No I18N
		if(this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField)){
			this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField))
			this.setData('dynamicElementComponentRender',true);
			this.setData('elementsCond',elementsCond); //no i18n
		}else{
			this.setData('dynamicElementComponentRender',false);
			this.setData('elementsCond',elementsCond); //no i18n
		}
		if(set && !this.data.dynamicallyFedField && this.data.showSecondaryModuleDropdown && (this.data.dynamicTypeValueSelected == 'field' || !this.data.dynamicTypeValue) && this.data.selectedField.id != '-1'){
			var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type ,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
			check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
			if(!check || check.length == 0){
				// if(this.data.secondaryModule){
				// 	this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield.module',selectId,this.data.secondaryModule)); //No I18N
				// }else{
					this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',selectId == 'bigint' ? 'Long Integer' : selectId)); //No I18N
				// }
				if(!this.data.dynamicTypeValue){
					this.setData('selectedField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n('None') ,id: "-1"}); //No I18N
					this.hideDropdowns(0);
					return;
				}
				this.setData('dynamicTypeValueSelected','value');
			}
		}
		if(!this.data.disabledRecordStateConfig){
			var recordStateIndex = this.data.dynamicTypeValueOptions.cruxFindIndexOfObject('system','record_category');
			if(this.data.selectedField.enable_record_category){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
				if(recordStateIndex === -1){ //eslint-disable-line @zoho/zstandard/proper-usage-of-if
					Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'push',{display : _cruxUtils.getI18n('crm.record.category'),system : 'record_category'});
				}
			}else if(recordStateIndex !== -1){
				Lyte.arrayUtils(this.data.dynamicTypeValueOptions,'removeAt',recordStateIndex);

			}
		}
		select == 'none' ? this.setData('showComparator',true) : this.setData('showComparator',false); //No I18N
		if(set && !comp){
			this.setData("condArray",this.executeMethod('setConditions',select,undefined,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex));//No I18N
			this.setData('gotComparator',true); //No I18N
		}else{
			this.setData('condArray',this.executeMethod('setConditions',select,comp,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex)); //No I18N
		}
		this.setData('selectedComparator',this.getData('condArray')[0]); //No I18N

		this.setData('queryParam', {});
		if(elementsCond === 'user'){
			if(this.data.selectedField.cxUserProperties && this.data.selectedField.cxUserProperties.queryParam){
				this.setData('queryParam', this.data.selectedField.cxUserProperties.queryParam);
			}else if(this.data.userComponentProperties.queryParam){
				this.setData('queryParam', this.data.userComponentProperties.queryParam);
			}
		}else if(elementsCond === 'role'){
			if(this.data.roleComponentRequestModal === 'role' && this.data.roleComponentProperties.queryParam){
				this.setData('queryParam', this.data.roleComponentProperties.queryParam);
			}else if(this.data.roleComponentRequestModal === 'profile' && this.data.profileComponentProperties.queryParam){
				this.setData('queryParam', this.data.profileComponentProperties.queryParam);
			}
		}
		this.changeConditionFunction();
	},
	changePrefixFunction : async function(index){
		Lyte.Component.set(this.data.prefixArray[index],'showError',undefined);
		if(this.data.dynamicColumn){
			this.setData('showFieldsCriteria',false);//No I18N
			var column = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			Lyte.arrayUtils(this.data.selectedArray ,'splice',index+1,this.data.selectedArray.length -1); //no i18n
			Lyte.arrayUtils(this.data.prefixArray ,'splice',index+1,this.data.prefixArray.length -1); //no i18n
			if(!column.endCriteria){
				if(column.showFields){
					this.setData('showFieldsCriteria',true);//No I18N
				}else if(column.cxPropShowChildCriteria){
					this.setData('showChildCriteria',true);
				}else{
					this.criteriaFormat = column.criteriaFormat || this.criteriaFormat;
					Lyte.arrayUtils(this.data.prefixArray,'push',column);//No I18N
					var selectedColumn = {};
					selectedColumn.api_name = column.apiValue;
					selectedColumn.comparator = 'equal'; //no i18n
					selectedColumn.value={}
					selectedColumn.value[column.systemValue] = '-1'
					selectedColumn.value[column.displayValue] = 'None'
					Lyte.arrayUtils(this.data.selectedArray,'push',selectedColumn); //no i18n
				}

				if(typeof column.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',column.cxPropDisableChildCriteria);
				}
			}
		}else if(!this.data.showFieldsCriteria){
			var a = await this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
			if(a){
				if(typeof a.cxPropShowChildCriteria !== 'undefined'){
					this.setData('showChildCriteria',a.cxPropShowChildCriteria);
				}
				if(a.cxPropChildCriteriaConditionLabel){
					this.setData('childCriteriaCheckboxLael',a.cxPropChildCriteriaConditionLabel);
				}
				if(a.cxPropChildCriteriaConditionTitle){
					this.setData('childCriteriaCheckboxTitle',a.cxPropChildCriteriaConditionTitle);
				}
				if(typeof a.cxPropDisableChildCriteria !== 'undefined'){
					this.setData('disabledChildCriteria',a.cxPropDisableChildCriteria);
				}
			}
		}
		if(this.data.childCriteria && this.data.showChildCriteria){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex).component,this.data.selectedArray,this.getDeveloperArg(0,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
		}
		this.hideDropdowns(index+1);
	},
	changeDynamicTypeFunction : function(selected,dontTriggerOnChange){
		var arg = this.executeMethod('dynamicTypeChangeCall',this.data.selectedField,this.data.condArray,selected,this.data.criteriaIndex,dontTriggerOnChange);
		if(typeof arg != 'undefined'){
			if(arg.cxPropSetComparator){
				this.setData('condArray',arg.cxPropSetComparator)
				this.setData('gotComparator',true); //No I18N
				if(this.data.condArray.cruxFindIndexOfObject('system',this.data.selectedComparator.system) == -1){
					this.setData('selectedComparator',this.getData('condArray')[0]); //No I18N
					this.changeConditionFunction();
				}
			}
		}
		if(selected === 'dynamic_component' || (this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField))){
			this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField))
			this.setData('dynamicElementComponentRender',true);
		}
	},
	methods :{
		changeField : function(a,b,c,d){
			if(b!=undefined){
				var selectedField = (b == "None") ? {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"} : d.parentElement.component.data.cxPropItem //no i18n
				if(selectedField && this.data.selectedField.api_name == selectedField.api_name){
					return;
				}
				this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
				this.setData('showFieldErrorMsg',undefined);
				this.setData('showCondErrorMsg',undefined);
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('showValueErrorMsg',"")
				this.setData('dynamicElementComponentRender',false);
				this.setData('noneCondition',true); //no i18n
				this.setData('showEmpty',false); //No I18N
				this.setData('selectUser',false);//No I18N
				this.setData('dynamicTypeValueSelected','value'); // no i18n
				this.changeDynamicTypeFunction('value',true); //no i18n
				this.setData('relatedFields',[]); //no i18n
				this.setData('pickList',false);//No I18N
				this.setData('lookup',false); //No I18N
				this.setData('betweenCond',false) //no i18n
				this.setData('ageInDaysCond',false); //no i18n
				this.setData('disableText',''); //no i18n
				this.setData('value',[""]); //no i18n
				this.setData('fcomp',undefined); //no i18n
				this.setData('dynamicallyFedField',false);
				var fields=this.getData('fields'); //No I18N
				this.setData('selectedField',selectedField);//No I18N
				this.setData('customPicklistValues',undefined)
				this.changeFieldFunction(true);
				this.executeMethod('onFieldChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedField);//No I18N
			}else{
				this.executeMethod('onFieldChangeCall',this.getData('criteriaIndex'),d.innerText,{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"});//No I18N
			}
			try{
				c.$node.parentElement.querySelector('.cx_fieldDropdownLabel').focus(); //no i18n
			}catch(e){}
		},
		changeCondition : function(a,b,c,d){
			if(b!=undefined){
				var array = this.getData('condArray')[d.getAttribute('index')];//No I18N
				if(this.data.selectedComparator == array){
					return;
				}
				this.setData('showCondErrorMsg',undefined);
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('showValueErrorMsg',"")
				this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
				this.setData('noneCondition',false); //no i18n
				
				this.setData('dynamicTypeValueSelected','value'); // no i18n
				this.changeDynamicTypeFunction('value',true); //no i18n
				this.setData("betweenCond",false); //no i18n
				this.setData('ageInDaysCond',false); //No I18N
				this.setData('ageInDays',false); //no i18n
				this.setData('dueInDays',false); //no i18n
				this.setData('nocCondition',false); //No I18N
				this.setData('value',[""]); //no i18n
				this.setData('fcomp',undefined); //no i18n
				this.setData('disableText',''); //no i18n
				this.setData('selectedComparator',array); //No I18N
				this.setData('customPicklistValues',undefined);
				this.executeMethod('onOperatorChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedComparator,this.data.selectedField);//No I18N
				this.setData('changePreviousNextSelected','days')
				this.changeConditionFunction();
				
			}else{
				this.executeMethod('onOperatorChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedComparator,this.data.selectedField);//No I18N
			}
			try{
				c.$node.parentElement.querySelector('.cx_compDropdownLabel').focus() //no i18n
			}catch(e){}
		},
		changeValue : function(a){
			this.setData('showValueErrorMsg',"")
			this.executeMethod('onValueChangeCall',this.getData('criteriaIndex'),a); //no i18n
		},
		changeSecField : function(a,b,c,d){
			if(b!=undefined){
				var fields=this.getData('fields'); //No I18N
				this.setData('showSecFieldErrorMsg',undefined);
				this.setData('selectedSecField',b == "None" ? {api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"} : d.parentElement.component.data.cxPropItem);//No I18N
				if($L(d.parentElement.parentElement).closest('crux-criteria-drop-item').length > 0){
					this.setData('secondaryModuleDisplayName',$L(d.parentElement.parentElement).closest('crux-criteria-drop-item')[0].component.data.cxPropItem.cxPropLabel)
				}
				if(!this.data.secondaryModuleDisplayName && this.data.selectedSecField.module && this.data.selectedSecField.module.length){
					this.setData('secondaryModuleDisplayName',this.data.selectedSecField.module[0].plural_label)
				}
				this.executeMethod('onSecFieldChangeCall',this.getData('criteriaIndex'),d.innerText,this.data.selectedSecField);//No I18N
			}
		},
		onFieldSearch : function(list){
			var dropdownNode = this.$node.querySelector('.cx_fieldsDropdown'); //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				this.setData('emptyFieldShow',true);//No I18N
			}else{
				this.setData('emptyFieldShow',false);//No I18N
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onConditionSearch : function(list){
			var dropdownNode = this.$node.querySelector('.cx_compDropdown'); //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				this.setData('emptyConditionShow',true);//No I18N
			}else{
				this.setData('emptyConditionShow',false);//No I18N
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onSecFieldSearch : function(list){
			if(list.length==0){
				this.setData('emptySecondaryFieldShow',true);//No I18N
			}else{
				this.setData('emptySecondaryFieldShow',false);//No I18N
			}
		},
		onPrefixSearch : function(index,list,node){
			var dropdownNode = node.closest('lyte-drop-box').origindd //no i18n
			dropdownNode.ltProp('disabledList',[]); //no i18n
			if(list.length==0){
				Lyte.objectUtils(this.data.prefixArray[index],'add','emptyOptionsShow',true); //no i18n
			}else{
				Lyte.objectUtils(this.data.prefixArray[index],'add','emptyOptionsShow',false); //no i18n
			}
			dropdownNode.ltProp('disabledList',this.data.disabledListDropdown); //no i18n
		},
		onFieldDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('fieldDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
				try{
					this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
					// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
				}catch(e){}
			}.bind(this),10);
			this.setData('fieldDropdownOpen',true);//No I18N
			this.executeMethod('onfieldDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		onConditionDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('condDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
			}.bind(this),10);
			this.setData('condDropdownOpen',true);//No I18N
			this.executeMethod('onconditionDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		onSecFieldDropdownShow : function(a,b){
			this.focusSearch(b);
			setTimeout(function(){
				this.setData('secFieldDropdownUp',b.childComp.classList.contains('lyteDropdownUp'));//No I18N
				try{ //eslint-disable-line @zoho/zohocrm/murphy-error
					this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
					// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
				}catch(e){} //eslint-disable-line no-empty
			}.bind(this),10);
			this.setData('secFieldDropdownOpen',true)
			this.focusDynamicSet(true);
			this.executeMethod('onsecfieldDropdownOpen',b,this.data.criteriaIndex);//No I18N
		},
		fieldBeforeHide : function(a,b){
			this.setData('fieldDropdownOpen',false);//No I18N
			this.executeMethod('onfieldDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		secFieldBeforeHide : function(a,b){
			var searchi=b.childComp.querySelector('lyte-search');//No I18N
			if(searchi){
				searchi.setValue("");
			}
			this.focusDynamicSet();
			this.setData('secFieldDropdownOpen',false)
			this.executeMethod('onsecfieldDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		conditionBeforeHide : function(a,b){
			this.setData('condDropdownOpen',false);//No I18N
			this.executeMethod('onconditionDropdownHide',b,this.data.criteriaIndex);//No I18N
		},
		onDropdownHide : function(a,b){
			if(b.$node.parentElement.contains(a.target)){
				a.stopImmediatePropagation()
			}
		},
		changeAgeInDaysCondition : function(a,b,c,d){
			this.setData('betweenAgeInDaysCond',false);
			this.setData('value',[""]); //no i18n
			this.setData('selectedAgeInDays',this.getData('ageindays')[d.getAttribute('index')]); //No I18N
			if(this.data.selectedAgeInDays.system == "between" || this.data.selectedAgeInDays.system =="not_between"){
				this.setData('betweenAgeInDaysCond',true);
			}
			this.executeMethod('onAgeInConditionChangeCall',this.getData('criteriaIndex'),d.innerText,this.getData('ageindays')[d.getAttribute('index')]);//No I18N
		},
		changepreviousNextCondition : function(event, selVal, comp, dropItem){
			this.executeMethod('onChangePreviousNextConditionCall',this.getData('criteriaIndex'),dropItem.innerText,this.getData('selectedComparator').cxDateOptions[dropItem.getAttribute('index')]);//No I18N
		},
		onFieldDropdownBeforeShow : function(a,b){
			var s=b.$node.ltProp('selected'); //NO I18N
			var selfThis = this;
			var check = this.executeMethod('getFieldsForHeader',undefined,this.getData('criteriaIndex'),this.getData('prefixArray').length > 0 ? this.getData('selectedArray') : undefined,this.getData('prefixArray').length > 0 ? this.getDeveloperArg(this.getData('prefixArray').length-1,this.getData('selectedArray'))  : undefined); //no i18n
			if(check instanceof Promise){
				this.setData('showFieldsLoading',true); //no i18n
				check.then(function(data){
					selfThis.setData('fields',data); //no i18n
					selfThis.setData('showFieldsLoading',false); //no i18n
					selfThis.focusSearch(b);
					b.$node.ltProp('selected','')//No I18N
					b.$node.ltProp('selected',s)//No I18N
					b.$node.resetPosition();
					try{
						this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
						// b.childComp.querySelector('.lyteDropdownSelection').scrollIntoView(); //no i18n
					}catch(e){}
				});
			}
			else if(check){
				this.setData('fields',check);//No I18N
			}else{
				return false;
			}
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		onSecFieldDropdownBeforeShow : function(a,b){
			var a=b.$node.ltProp('selected'); //no i18n
			var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
			check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
			if(!check || check.length == 0){
				this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',this.data.selectedField.data_type == 'bigint' ? 'Long Integer' : this.data.selectedField.data_type)); //No I18N
				return false;
			}else{
				this.setData('relatedFields',check); //no i18n
			}
			try{ //eslint-disable-line @zoho/zohocrm/murphy-error
				this.moveIntoView(b.childComp.querySelector('.lyteDropdownSelection'),b.childComp); //no i18n
			}catch(e){} //eslint-disable-line no-empty
			b.$node.ltProp('selected','');//No I18N
			b.$node.ltProp('selected',a)//No I18N
		},
		onConditionDropdownBeforeShow : function(a,b){
			if(!this.getData('gotComparator') || this.data.cxPropForceSetCondition || this.data.selectedField.cxForceSetCondition){
				this.setData("condArray",this.executeMethod('setConditions',this.getData('selectCond'),undefined,this.data.selectedField,this.data.dynamicTypeValueSelected,this.data.criteriaIndex));//No I18N
				this.setData('gotComparator',true); //No I18N
			}
			var s=b.$node.ltProp('selected'); //NO I18N
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		valueError : function(errorMsg){
			if(!this._skipVal){
				_cruxUtils.addMurhyInfo("crux-criteria-editor-header", "January Group Automation");
				if(this.showInlineMsg){
					this.setData('showValueErrorMsg',errorMsg) //No I18N 
				}else{
					this.executeMethod('onValueError',this.getData('criteriaIndex'),errorMsg); //no i18n
				}
				
			}
			return false;
		},
		onPrefixDropdownBeforeShow : function(index,a,b){
			var s=b.$node.ltProp('selected'); //NO I18N
			var self=this;
			if(!this.getData('prefixArray')[index].forceFetch && this.getData('prefixArray')[index].cxPropOptions){
				Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,this.getData('prefixArray')[index].cxPropOptions)//No I18N
			}else{
				var a=this.executeMethod('getPrefixValues',index,this.getData('selectedArray'),this.getDeveloperArg(index-1,this.data.selectedArray),undefined,this.getData('prefixArray')[index].forceFetch,this.data.criteriaIndex); //no i18n
				if(a instanceof Promise){
					Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,'Loading')//No I18N
					a.then(function(data){
						Lyte.Component.set(self.getData('showArray'),self.getData('prefixArray')[index].apiValue,data)//No I18N
					})
				}else{
					if(a.showRecords){
						Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,'Loading')//No I18N
						store.findAll(this.data.moduleRecordMapping[a.module].id).then(function(data){
							Lyte.Component.set(self.getData('showArray'),self.getData('prefixArray')[index].apiValue,data)//No I18N
						});
					}else{
						Lyte.Component.set(this.getData('showArray'),this.getData('prefixArray')[index].apiValue,a)//No I18N
					}
				}
			}
			
			b.$node.ltProp('selected','')//No I18N
			b.$node.ltProp('selected',s)//No I18N
		},
		onPrefixDropdownShow : function(index,a,b){
			this.focusSearch(b);
			setTimeout(function(){
				Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpenUp',b.childComp.classList.contains('lyteDropdownUp')); //no i18n
			}.bind(this),10);
			Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpen',true); //no i18n
		},
		prefixBeforeHide : function(index){
			Lyte.Component.set(this.getData('prefixArray')[index],'dropdownOpen',false); //no i18n
		},
		changePrefixOption : function(index,a,b,c,d){
			var prefix = this.getData('prefixArray')[index];
			var _this=this;
			if(prefix.apiValue == 'module' && b != -1){
				this.setData('module',d.parentElement.component.data.cxPropItem.lookup ? this.getModuleFromApiName(d.parentElement.component.data.cxPropItem.lookup.module.api_name,this.data.moduleRecordMapping) : d.parentElement.component.data.cxPropItem.module_name ? d.parentElement.component.data.cxPropItem.module_name : d.parentElement.component.data.cxPropItem[prefix.systemValue])
			}
			if(b != -1){
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : d.parentElement.component.data.cxPropItem};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',index,criteria); //no i18n
				}else{
					Lyte.arrayUtils(this.getData('selectedArray'),'insertAt',index,criteria); //no i18n
				}
				// if(this.data.dynamicColumn){
				// 	var column = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray)); //no i18n
				// 	Lyte.arrayUtils (this.data.selectedArray ,'splice',index+1,this.data.selectedArray.length -1);
				// 	Lyte.arrayUtils (this.data.prefixArray ,'splice',index+1,this.data.prefixArray.length -1);
				// 	if(!column.endCriteria){
				// 		if(column.showFields){
				// 			this.setData('showFieldsCriteria',true);//No I18N
				// 		}else{
				// 			this.criteriaFormat = column.criteriaFormat;
				// 			Lyte.arrayUtils(this.data.prefixArray,'push',column);//No I18N
				// 			var selectedColumn = {};
				// 			selectedColumn.api_name = column.apiValue;
				// 			selectedColumn.comparator = 'equal'
				// 			selectedColumn.value={}
				// 			selectedColumn.value[column.systemValue] = '-1'
				// 			selectedColumn.value[column.displayValue] = 'None'
				// 			Lyte.arrayUtils(this.data.selectedArray,'push',selectedColumn)
				// 		}
				// 	}
				// }
				// this.hideDropdowns(index+1);
				this.changePrefixFunction(index)
			}else{
				var value={}
				value[prefix.systemValue] = '-1';
				value[prefix.displayValue] = _cruxUtils.getI18n('None');
				var criteria = {api_name : prefix.apiValue, comparator : 'equal', value : value};//No I18N
				if(this.getData('selectedArray')[index]){
					Lyte.arrayUtils(this.getData('selectedArray'),'replaceAt',index,criteria); //no i18n
				}else{
					Lyte.arrayUtils(this.getData('selectedArray'),'insertAt',index,criteria); //no i18n
				}
				// for(var i=0;)
				this.hideDropdowns(index);
				if(!this.data.showFieldsCriteria){
					var out = this.executeMethod('getPrefixArray',index+1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),this.data.criteriaIndex); //no i18n
					if(out){
						if(typeof out.cxPropShowChildCriteria !== 'undefined'){
							this.setData('showChildCriteria',out.cxPropShowChildCriteria);
						}
						if(typeof out.cxPropDisableChildCriteria !== 'undefined'){
							this.setData('disabledChildCriteria',out.cxPropDisableChildCriteria);
						}
						if(out.cxPropChildCriteriaConditionLabel){
							this.setData('childCriteriaCheckboxLael',out.cxPropChildCriteriaConditionLabel);
						}
						if(out.cxPropChildCriteriaConditionTitle){
							this.setData('childCriteriaCheckboxTitle',out.cxPropChildCriteriaConditionTitle);
						}
					}
				}
				if(this.data.childCriteria && this.data.showChildCriteria){
					this.executeMethod('setMethodsAndDataForChildCriteriaCall',this.$node.querySelector('#childCriteria_'+this.data.criteriaIndex).component,this.data.selectedArray,this.getDeveloperArg(index,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
				}
				
			}
		_cruxUtils.addMurhyInfo("crux-criteria-editor-header.js", "Feb Default Changes");
			this.executeMethod('prefixChanged');
			if(!(this.getData('prefixArray')[index+1] && this.getData('prefixArray')[index+1].cxPropOptions) && index+1 < this.data.prefixArray.length){
				this.executeMethod('getPrefixValues',this.getData('prefixArray')[index+1] ? index+1 : -1,this.getData('selectedArray'),this.getDeveloperArg(index,this.data.selectedArray),true,undefined,this.data.criteriaIndex); //no i18n
			}
			try{
				c.$node.parentElement.querySelector('.cx_prefixDropdownLabel').focus(); //no i18n
			}catch(e){}
		},
		userComponentCustomRequest : function(a,b,c,d,e){
			return this.executeMethod('userComponentCustomRequestCall',a,b,c,d,e);
		},
		onDynamicTypeSelected : function(event,selected){
			this.setData('noneCondition',true);
			this.setData('dynamicElementComponentRender',false);
			this.setData('customPicklistValues',undefined);
			this.setData('noneCondition',false);
			var ch = this.executeMethod('onBeforeDynamicTypeChangeCall',selected,this.data.selectedField,this.data.selectedComparator,this.data.criteriaIndex)
			if(ch === false){
				this.setData('dynamicTypeValueSelected',selected == 'field' ? 'value' : 'field' );
				return;
			}
			if(selected === 'record_category'){
				this.setData('dynamicTypeValueSelected',selected);
				var cp = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
				this.setData('customPicklistValues',cp);
			}
			this.setData('value',undefined)
			this.setData('selectedSecField',{api_name: "None",data_type: "none",field_label: _cruxUtils.getI18n("None"),id: "-1"})
			if(!this.data.dynamicallyFedField && selected == 'field' && (!this.data.relatedFields || this.data.relatedFields.length == 0)){
				var check = this.executeMethod('getRelatedFields',this.data.selectedField.data_type ,this.data.criteriaIndex,this.data.selectedField,this.data.selectedComparator); //no i18n
				check = this.removeUnwantedFields(check,this.data.hidePrimarySelectedField ? this.data.selectedField.id : '');
				if(!check || check.length == 0){
					var data_type = this.data.selectedField.data_type
					if(data_type == 'formula'){
						data_type = this.getData('selectedField').formula.return_type;//no i18n
					}
					if(data_type == 'rollup_summary'){
						data_type = this.getData('selectedField').rollup_summary.return_type;//no i18n
					}
					//if(this.data.secondaryModule){
					//	this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield.module',data_type,this.data.secondaryModule)); //No I18N
					//}else{
						this.throwEvent('alertEvent',_cruxUtils.getI18n('crux.criteria.empty.secondaryfield',data_type == 'bigint' ? 'Long Integer' : data_type)); //No I18N
					//}
					this.setData('dynamicTypeValueSelected','value');
					selected = 'value';
				}
			}
			this.setData('showSecondaryModuleDropdown',selected == 'field'); //no i18n
			this.changeDynamicTypeFunction(selected);
		},
		onDynamicValueOpen : function(){
			this.focusDynamicSet(true);
		},
		onDynamicValueHide : function(){
			this.focusDynamicSet();
		},
		setMethodsAndDataForChildCriteriaCaller : function(component){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',component,this.data.selectedArray,this.getDeveloperArg(0,this.data.selectedArray),this.getValue(true,undefined,undefined,{skipChildren : true}),this.data.criteriaIndex);
		},
		lookupComponentDataFetch : function(){
			return this.executeMethod('lookupComponentDataFetchFn',...arguments);
		},
		onElementDropdownOpenCallback : function(element, ev, comp){
			if(this.getMethods('onElementDropdownOpen')){
				this.executeMethod('onElementDropdownOpen', ev, element, comp);
			}
		},
		onElementDropdownCloseCallback : function(element, ev, comp){
			if(this.getMethods('onElementDropdownClose')){
				this.executeMethod('onElementDropdownClose', ev, element, comp);
			}
		}
	},
	actions : {
		createNewCriteria : function(){
			this.throwEvent('createNewCriteria');//No I18N
		},
		removeCriteria : function(){
			this.throwEvent('removeCriteria',this.getData('criteriaIndex'));//No I18N
		},
		changeAndOr : function(){
			this.throwEvent('changeAndOr',this.getData('andOrCondition'),this.getData('criteriaIndex'));//No I18N
		},
		showFieldsDropdown : function(event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			this.setData('showFieldsDropdown',true); //No I18N
			this.$node.querySelector('.cx_fieldsDropdown').toggle(); //No I18n
		},
		showComparatorDropdown : function(event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			this.setData('showComparatorDropdown',true); //No I18N
			this.$node.querySelector('.cx_compDropdown').toggle(); //No I18N
		},
		showPrefixDropdown : function(index,event){
			if(event.target.classList.contains('lyteDropdown-disabled') || event.target.parentElement.classList.contains('lyteDropdown-disabled')){
				return;
			}
			Lyte.Component.set(this.getData('prefixArray')[index],'showDropdown',true); //no i18n
			this.$node.querySelector('.cx_PrefixDropdown'+this.getData('prefixArray')[index].apiValue).toggle(); //no i18n
		},
		keyUpDropdown : function(element,event){
			if(event.keyCode == 32){
				event.stopImmediatePropagation();
				if(!element.classList.contains('lyteDropdown-disabled')){
					element.click();
				}
			}
		},
		showSecFieldsDropdown : function(){
			this.setData('showSecondaryFieldsDropdown',true); //No I18N
			this.$node.querySelector('.cxSecFieldDropdown').toggle(); //No I18N
		},
		dynamicFedFieldClicked : function(){
			var fvalue = this.executeMethod('clickDynamicFieldValue',this.data.selectedField,this.data.criteriaIndex,this.data.selectedComparator,this.data.fvalue)
			if(fvalue){
				if(fvalue instanceof Promise){
					fvalue.then(function(res){
						if(typeof res == 'object'){
							this.setData('fvalue',res);
							this.setData('disableText',res.display);
						}else{
							this.setData('fvalue',res);
							this.setData('disableText',res);
						}
						
					}.bind(this),function(){})
				}else{
					if(typeof res == 'object'){
						this.setData('fvalue',res);
						this.setData('disableText',res.display);
					}else{
						this.setData('fvalue',fvalue);
						this.setData('disableText',fvalue);
					}
				}
			}
		},
		onCriteriaConditionItemClicked : function(node){
			if(node.classList.contains('cxCriteriaItemDisabled')){
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		},
		showChildCriteriaAction : function(){
			this.setData('showChildCriteria',!this.data.showChildCriteria);
		}
	},
	getDeveloperArg : function(index,selectedArray){
		var arg={},s='';
		for(var i=0;i<=index;i++){
			arg[selectedArray[i].api_name] = selectedArray[i].value;
			s=s+selectedArray[i].value[this.data.prefixArray[i].systemValue]+'.'
		}
		return [arg,s];
	},
	focusSearch : function(dropdown){
		var searchi=dropdown.childComp && dropdown.childComp.querySelector('lyte-search');//No I18N
		if(searchi){
			searchi.setValue("");
			var s=searchi.querySelector("input");//No I18N
		   s.focus();
		}
		dropdown.$node.resetPosition();
	},
	focusDynamicSet : function(set){
		var a = $L('.cxCriteriaValueColDropInputWrap',this.$node)
		set ? a.addClass('cxCriteriaValueColDropInputWrapActive') : a.removeClass('cxCriteriaValueColDropInputWrapActive')
	},
	setError : function(error){
		if(error.type == 'prefix'){
			Lyte.Component.set(this.data.prefixArray[error.index],'showError',error.message);
		}
	},
	moveIntoView : function(element,box){
		var body = box.querySelector('lyte-drop-body'); //no i18n
		containerScrollTop = body.scrollTop,
		elementTop = element.offsetTop;
		containerHeight = body.offsetHeight;
		if(elementTop <= containerScrollTop){
			body.scrollTop = elementTop - (containerHeight/2);
		}else if(elementTop >=  (containerScrollTop+containerHeight-element.offsetHeight)){
			body.scrollTop = elementTop + element.offsetHeight - (containerHeight/2);
		}
	},
	prefixArrayObserver : function(){
		if(!this.data.dynamicColumn){
			this.hideDropdowns(0);
		}
	}.observes('prefixArray.[]'), //no i18n
	secondaryModuleObserver : function(){
		this.setData('showSecondaryModuleDropdown',this.data.secondaryModule); //no i18n
	}.observes('secondaryModule'), //no i18n
	setFocusEventListeners : function(){
		var dropdown = $L('.cxCriteriaValueColTypeDropdown',this.$node)
		if(dropdown.length){
			dropdown[0].addEventListener('focusin',function(){
				this.focusDynamicSet(true)
			}.bind(this));
			dropdown[0].addEventListener('focusout',function(){
				this.focusDynamicSet()
			}.bind(this));
		}
		if(this.data.dynamicTypeValueSelected == 'value'){
			var node = $L('.cxCriteriaValueSection',this.$node)
			if(node.length > 0){
				node[0].addEventListener('focusin',function(){
					this.focusDynamicSet(true)
				}.bind(this));
				node[0].addEventListener('focusout',function(){
					this.focusDynamicSet()
				}.bind(this));
			}
		}
	}.observes('showSecondaryModuleDropdown','dynamicTypeValueSelected','dynamicTypeValue').on('didConnect') //no i18n
},{mixins : ["crux-criteria-util"]});//No I18N

// $Id$
Lyte.Component.register("crux-criteria-editor-view-header", {
_template:"<template tag-name=\"crux-criteria-editor-view-header\"> <div class=\"criteriaTd\"> <span class=\"cxCriteriaViewIndexSpan\" data-zcqa=\"criteria_view_patternnum_{{criteriaIndex}}\">{{criteriaIndex}}</span> </div> <template is=\"if\" value=\"{{showComparator}}\"><template case=\"true\"> <div class=\"criteriaTd\"> <template is=\"if\" value=\"{{expHandlers(totalCriteria,'>',1)}}\"><template case=\"true\"> <span class=\" andOrConditionView dIB\" data-zcqa=\"criteria_view_cond_{{criteriaIndex}}\">{{andOrCondition}}</span> </template></template> </div> </template></template> <div class=\"criteriaTd cxCriteriaViewDataColumn\"> <template is=\"for\" items=\"{{prefixArray}}\" item=\"item\" index=\"index\"> <span class=\"{{item.cxViewClass}}\" data-zcqa=\"criteria_view_{{item.apiValue}}_{{criteriaIndex}}\">{{selectedArray[index].value[item.displayValue]}}</span> <template is=\"if\" value=\"{{expHandlers(expHandlers(index,'<',expHandlers(prefixArray.length,'-',1)),'||',showFieldsCriteria)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{negate(item.cxHideBullet)}}\"><template case=\"true\"><span class=\"cxCriteriaBulletSep\">.</span></template></template> </template></template> </template> <template is=\"if\" value=\"{{showFieldsCriteria}}\"><template case=\"true\"> <span class=\"colorSpan cxCriteriaViewFieldSpan\" data-zcqa=\"criteria_view_field_{{criteriaIndex}}\">{{field}}</span> <span class=\"mLR5 cxCriteriaViewComparatorLabel\" data-zcqa=\"criteria_view_comp_{{criteriaIndex}}\">{{captialize(condition)}}</span> <template is=\"if\" value=\"{{dynamicElementComponentRender}}\"><template case=\"true\"> <template is=\"component\" class=\"cxCriteriaDynamicElement\" component-name=\"{{dynamicCond}}\" selected-value=\"{{value}}\" field=\"{{selectedField}}\" comparator=\"{{selectedComparator}}\" on-value-change=\"{{method('changeValue')}}\" from=\"criteria_editor_view\"></template> </template><template case=\"false\"> <span class=\"{{if(dynamicTypeValue,'cxCriteriaViewModuleBadgeWrap','colorSpan')}} {{if(currencyClass,'cxCriteriaViewCurrencyValue')}} {{if(setClassForValue,'cxCriteriaViewNumberField')}} valueSpan cxCriteriaViewValueSpan\" data-zcqa=\"criteria_view_value_{{criteriaIndex}}\"> <template is=\"if\" value=\"{{secondayModuleDataDisplayed}}\"><template case=\"true\"> <span class=\"cxCriteriaViewBadgeLabel\"> <lyte-text class=\"cxCriteriaViewBadgeLabelText\" lt-prop-value=\"{{value}}\"></lyte-text> </span> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValue,'&amp;&amp;',expHandlers(hideSecondayModule,'!'))}}\"><template case=\"true\"> <span class=\"cxCriteriaViewModuleBadge\">({{secondaryModuleDisplayName}})</span> </template></template> </template><template case=\"false\"> {{value}} <template is=\"if\" value=\"{{previousNextComp}}\"><template case=\"true\"><span>{{changePreviousNextSelected}}</span></template></template> </template></template> <template is=\"if\" value=\"{{expHandlers(dynamicTypeValueSelected,'==','record_category')}}\"><template case=\"true\"> <span class=\"cxCriteriaViewModuleBadge\">({{cruxGetI18n('crm.record.category')}})</span> </template></template> </span> <template is=\"if\" value=\"{{showMore}}\"><template case=\"true\"> <a onclick=\"{{action('toggleShow')}}\" class=\"cxTextareaShowMore\">{{textAreaShowText}}</a> </template></template> </template></template> </template></template> </div> <template is=\"if\" value=\"{{childCriteria}}\"><template case=\"true\"> <div class=\"cxChildCriteria\"> <crux-criteria-editor id=\"childCriteriaView_{{criteriaIndex}}\" cx-prop-fields=\"{{emptyArray}}\" cx-set-data-and-methods=\"{{method('setMethodsAndDataForChildCriteriaCaller')}}\" cx-prop-set-criteria=\"{{childSetCriteria}}\" cx-prop-type=\"view\"></crux-criteria-editor> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"for","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[5,3]},{"type":"if","position":[5,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"component","position":[1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}],
_observedAttributes :["criteria","field","condition","value","andOrCondition","module","criteriaIndex","fields","selectedField","selectedCondition","pickList","selectUser","lookup","callModule","lookupField","tagComponent","layoutComponent","totalCriteria","numberFieldException","moduleMapping","currencyProperties","currencyClass","showComparator","secondaryModule","secondayModuleDataDisplayed","dynamicTypeValue","secondaryModuleDisplayName","hideSecondayModule","cxPropSecondaryFields","textAreaShowText","dynamicCond","showFieldsCriteria","childCriteria","criteriaFormat"],
_observedAttributesType :["object","string","string","string","string","string","string","array","object","array","boolean","boolean","boolean","boolean","boolean","boolean","boolean","number","object","array","object","boolean","boolean","string","boolean","boolean","string","boolean","array","string","string","boolean","boolean","string"],
 //No I18N
	data : function(){
		return {
			criteria : Lyte.attr('object'), //no i18n
			field : Lyte.attr('string'), //no i18n
			condition : Lyte.attr('string'), //no i18n
			value : Lyte.attr('string'),  //no i18n
			andOrCondition : Lyte.attr('string'), //no i18n
			module : Lyte.attr('string'), //no i18n
			criteriaIndex : Lyte.attr('string'), //no i18n 
			fields : Lyte.attr('array'), //no i18n
			selectedField : Lyte.attr('object'), //no i18n
			selectedCondition : Lyte.attr('array'), //no i18n
			pickList : Lyte.attr('boolean',{default : false}), //no i18n
			selectUser : Lyte.attr('boolean',{default : false}), //no i18n
			lookup : Lyte.attr('boolean',{default : false}), //no i18n
			callModule : Lyte.attr('boolean',{default : false}), //no i18n
			lookupField : Lyte.attr('boolean',{default : false}), //no i18n
			tagComponent : Lyte.attr('boolean',{default : false}), //no i18n
			layoutComponent : Lyte.attr('boolean',{default : false}), //no i18n
			totalCriteria : Lyte.attr('number'), //no i18n
			numberFieldException : Lyte.attr('object',{default : { 'Solutions':"Solution_Number",'Invoices':"Invoice_Number",'SalesOrders':"SO_Number",'Quotes':"Quote_Number",'Cases':"Case_Number"}}), //no i18n
			moduleMapping : Lyte.attr('array'), //no i18n
			currencyProperties : Lyte.attr('object'), //no i18n
			currencyClass : Lyte.attr('boolean',{default : false}), //no i18n
			showComparator : Lyte.attr('boolean'), //no i18n
			secondaryModule : Lyte.attr('string'), //no i18n
			secondayModuleDataDisplayed : Lyte.attr('boolean',{default : false}), //no i18n
			dynamicTypeValue : Lyte.attr('boolean'), //no i18n
			secondaryModuleDisplayName : Lyte.attr('string'), //no i18n
			hideSecondayModule : Lyte.attr('boolean'), //no i18n
			cxPropSecondaryFields : Lyte.attr("array"),//No I18n
			textAreaShowText : Lyte.attr('string',{default : _cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions')}),
			dynamicCond : Lyte.attr('string',{default : ""}), //no i18n
			showFieldsCriteria : Lyte.attr('boolean'),
			childCriteria : Lyte.attr('boolean'),
			criteriaFormat : Lyte.attr('string')
		}		
	},
	init : function(){
		this.moduleApiMapping = {};
		this.moduleIdMapping = {};
		this.onGetCriteria();
	},
	onGetCriteria : function(){
		if(this.getData('criteria') && Object.keys(this.getData("criteria")).length > 0){
			this.setViewCriteriaObj(this.getData('criteria'));//no i18n
		}
	},
	setViewCriteriaObj : function(criteriaObj){
		var criteriaArray=[]
		if(criteriaObj.field == undefined){
			criteriaArray = this.getCriteriaArray(criteriaObj,[]);
		}
		else{
			criteriaArray.push(criteriaObj);
		}
		if(this.data.prefixArray.length > 0 && this.data.prefixArray.cruxFindIndexOfObject('apiValue','module') > -1){
			var array=this.getModuleFromCriteria(criteriaArray[criteriaArray.length-1]);
			criteriaArray.splice(criteriaArray.length-1,1);
			criteriaArray = criteriaArray.concat(array);
		}
		if(this.data.criteriaFormat === 'relatedModuleChildCriteria'){
			var criteriNewArray = []
			this.data.prefixArray.forEach(function(item,index){
			    criteriNewArray.push({api_name : item.apiValue,comparator : 'equal',value : criteriaObj[item.apiValue]})
			}.bind(this));
			if(criteriaObj.criteria){
				this.setData('childSetCriteria',criteriaObj.criteria)
				this.setData('childCriteria',true);
			}
			this.setData('selectedArray',criteriNewArray)
		}else{
			this.setData('selectedArray',criteriaArray); //NO I18N
		}
		if(this.data.showFieldsCriteria){
			var criteria= Object.assign({},criteriaArray.pop());	
			var unformattedFieldApi = criteria.field.api_name; //no i18n
			this.executeMethod('setFieldForCriteria',criteria); //no i18n
			var api_name,dataType,ageCond;
			var condition=criteria.comparator;
			var value=criteria.value;
			this.setData('selectUser',false);//No I18N
			this.setData('pickList',false); //No I18N
			this.setData('tagComponent',false); //No I18N
			this.setData('layoutComponent',false); //No I18N
			this.setData('selectedField',criteria.field); //No I18N
			if(this.data.selectedField && this.data.selectedField.module && this.data.selectedField.module.length > 0){
				this.setData('module',this.data.selectedField.module[0].module_name == 'Activities' && this.data.selectedField.api_name.match(/Tag/) ? this.data.selectedField.sub_module.api_name : this.data.selectedField.module[0].module_name);
			}
			api_name = criteria.field.api_name;
			dataType = criteria.field.data_type;
			if(dataType == 'formula'){
				dataType = this.getData('selectedField').formula.return_type;//no i18n
			}
			if(dataType == 'rollup_summary'){
				dataType = this.getData('selectedField').rollup_summary.return_type;//no i18n
			}
			var select ="default"; //No I18N
			switch(dataType){
			case "none":
				select="none";//No I18N
				break;
			case "text": case "email": case "phone": case "website": case "textarea": case "autonumber": case "string":
				select="text";//No I18N
				break;
			case "multiselectpicklist":
				select = "multiselectpicklist"; //no i18n
				break;
			case "currency": case "double": case "integer": case "bigint": case "number": case "decimal" : case "longinteger": case "percent" : 
				select="number";//No I18N
				break;
			case "datetime": 
				select="date-time";//No I18N
				break;
			case "date":
				select = 'date'; //No I18N
				break;
			case "boolean":
				select="boolean";//No I18N
				break;
			case "ownerlookup":
			case "userlookup":
				select = "user";//No I18N
				this.setData('selectUser',true);//No I18N
				if(unformattedFieldApi.indexOf('.role') > -1){
					condition = condition+'_role'
				}else if(unformattedFieldApi.indexOf('.group') > -1){
					condition = condition+'_group'
				}else if(unformattedFieldApi.indexOf('.type__s') > -1){
					condition = condition+'_type'
				}
				break;
			case "picklist":
				this.setData('pickList',true); //No I18N
				select = "picklist";//No I18N
				this.setData('selectedFieldPicklist',this.getData('selectedField').pick_list_values)//no i18n
				break;
			case "lookup":
				select = "text"; //No I18N
				break;
			case "multi_module_lookup":
				select = "multimodulelookup"; //No I18N
				this.setData('multiModule',true) //no i18n
				break;
			case "fileupload": 
			case "imageupload":
			case "multiselectlookup":
			case "multiuserlookup":
				select = "defEmpty";
				break;
			}
			if(this.getData('numberFieldException')[this.data.module] == this.getData('selectedField').api_name){
				select="number";//No I18N
				elementsCond = "number"; //no i18n
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Tag')){//No I18N
				this.setData('tagComponent',true); //No I18N
				select="defWithEmpty"; //No I18N
				this.setData('showEmpty',true); //No I18N
			}
			if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Layout')){
				this.setData('layoutComponent',true); //No I18N
				select ="default"; //No I18N
				this.setData('showEmpty',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Wizard')){//No I18N
				select = "default"; //no i18n
				this.setData('layoutComponent',true); //No I18N
				this.setData('showEmpty',true); //No I18N
			}else if(this.criteriaApiNameCheck(api_name,'role',this.data.selectedField)){//No I18N
				select ="default"; //No I18N
				this.setData('layoutComponent',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'profile')){//No I18N
				select ="default"; //No I18N 
				this.setData('pickList',false); //No I18N
				this.setData('layoutComponent',true); //No I18N
			}else if(Lyte.registeredMixins['crux-criteria-util'].criteriaApiNameCheck(api_name,'Call_Status') && (this.data.selectedField.module[0].module_name == 'Activities' || this.data.selectedField.module[0].module_name =='Calls')){ //no i18n
				select = "cs"; //No I18N 
			}else if(api_name.match(/Activity_Type/) && this.data.module == 'Activities'){ //no i18n
				select = "default"; //No I18N
				this.setData('pickList',true); //No I18N
			}else if(this.getData('selectedField').column_name == 'APPOINTMENTSTATUS' || this.getData('selectedField').column_name == 'SERVICESTATUS'){ //no i18n
				select = "default"; //no i18n
			}else if(this.criteriaApiNameCheck(api_name,'Stage')&& (this.data.module == 'Potentials' || this.data.module =='Deals')){
				select = "stage"; //No I18N 
			}else if(this.getData('selectedField').ui_type === 137){ //no i18n
				this.setData('pickList',true); //No I18N
			}
			if(this.getData('selectedField').cxPropDynamicFieldValue){
				this.setData('dynamicallyFedField',true);
			}
			this.setData('selectedCondition',this.executeMethod('setConditions',select == 'date-time' ? 'date' : select,undefined,criteria.field)); //no i18n
			if(criteria.type != 'dynamic_component' && ((Array.isArray(value) && typeof value[0] == 'string' && value[0].match('NOC')) || typeof value == 'string' && (value.match(/AGEIN/g) ||value.match(/DUEIN/g) || value.match('NOC') || value.match('LAST_N') || value.match('NEXT_N')))){
				ageCond=condition;
				var ageindays=this.executeMethod('setConditions','ageInDays'); //No I18N
				for(var i=0;i<ageindays.length;i++){
					if(ageindays[i].system == ageCond){
						ageCond=ageindays[i].display;
						break;
					}
				}
				if(Array.isArray(value) && value[0].match('NOC')){
					condition='Number of Characters';//No I18N
					value=value[0].replace(/\D/g, '')+ ' - ' + value[1].replace(/\D/g, '')
					value=ageCond + ' ' + value;
					select="";
				}else{
					if(value.match(/DUEIN/g)){
						condition="Due in Days"; //no i18n
					}else if(value.match(/AGEIN/g)){
						condition="Age in Days"; //no i18n
					}else if(value.match('NOC')){
						condition='Number of Characters';//No I18N
					}else if(value.match('LAST_N')){
						condition = 'previous'

						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						this.setData('previousNextComp',true);
					}else if(value.match('NEXT_N')){
						condition = 'next'
						this.setData('changePreviousNextSelected',value.match(new RegExp(/_N_(\w+)/))[1].toLowerCase())
						this.setData('previousNextComp',true);
					}
					value=value.replace(/\D/g, '');
					value=ageCond + ' ' + value;
					select="";
				}
				
			}
			
			var sysCondition=condition;
			if(criteria.type != 'dynamic_component' && (typeof value =="string" && (value == '${EMPTY}' || value == '${NOTEMPTY}' || value == '${OPEN}' || value == '${CLOSEDWON}' || value == '${CLOSEDLOST}' || value == '${C_OPEN}' || value == '${C_COMPLETED}' || value == '${C_FAILED}'))){
				if(condition == 'equal' && value == '${EMPTY}'){
					condition = '${EMPTY}'//No I18N
				}else if(value == '${EMPTY}' || value == '${NOTEMPTY}'){//No I18N
					condition = '${NOTEMPTY}'//No I18N
				}else{
					condition = value;
				}
				value='';
				select="";
				dataType = "";
				this.setData('selectUser',false);//No I18N
				this.setData('pickList',false); //No I18N
				this.setData('lookup',false); //No I18N
				this.setData('tagComponent',false); //No I18N
				this.setData('layoutComponent',false); //No I18N
				this.setData('multiModule',false) //no i18n
			}
			for(var i=0;i<this.getData('selectedCondition').length;i++){
				if(condition == this.getData('selectedCondition')[i].system){
					condition = this.getData('selectedCondition')[i].display;
					this.setData('selectedComparator',this.getData('selectedCondition')[i]);
					break;
				}
			}
			if(this.data.changePreviousNextSelected){
				try{
					this.setData('changePreviousNextSelected',this.data.selectedComparator.cxDateOptions.cruxFilterBy({system : this.data.changePreviousNextSelected})[0].display)
				}catch(e){}
			}
			if(typeof value =="string" && value.match(/{/) && criteriaObj.type !== 'dynamic_component'){
				if(select == "cs"){
					condition = _cruxUtils.getI18n("is"); //no i18n
				}
				for(var i=0;i<this.getData('selectedCondition').length;i++){
					if(value == this.getData('selectedCondition')[i].system){
						value = this.getData('selectedCondition')[i].display;
						break;
					}
				}
				select="";
			}
			if(criteria.type === 'dynamic_component' || (this.data.selectedField.cxDynamicFilterCriteriaComponent && this.getDynamicComponent(this.data.selectedField))){
				this.setData('dynamicCond',this.getDynamicComponent(this.data.selectedField));
				this.setData('dynamicElementComponentRender',true);
			}else if(criteria.type === 'field'){
				if(this.data.dynamicallyFedField){
					value = value.display
				}else{
					var secField = this.executeMethod('getRelatedFields',value);
					this.setData('secondayModuleDataDisplayed',true);
					if(secField && secField.parentCriteriaFieldGroup){
						this.setData('secondaryModuleDisplayName',secField.parentCriteriaFieldGroup.cxPropLabel)
					}
					value = secField.field_label; 
				}
			}else{
				if(sysCondition.match(/between/)){
					if(select == 'date-time'){
						try{
							value=this.getDateTime(value[0])+' - '+this.getDateTime(value[1]);	
						}catch(e){
							value = value[0]+' - '+value[1]
						}
						
					}else if(select == 'date'){ //No I18N\
						try{
							value=this.getDate(value[0])+' - '+this.getDate(value[1]);
						}catch(e){
							value = value[0]+' - '+value[1]
						}
					}else{
						if(criteria.field.separator && typeof Search != "undefined"){
							_cruxUtils.addMurhyInfo("crux-criteria-editor-view-header.js", "Feb Default Changes");
					    	this.setData('setClassForValue',true);//no i18n
					        value[0] = Search.formatNumber(value[0]);
					        value[1] = Search.formatNumber(value[1]);
					    } 
					    if(dataType == 'currency' && this.data.currencyProperties.baseCurrency && this.data.currencyProperties.baseCurrency.length > 0){
						    _cruxUtils.addMurhyInfo("crux-criteria-editor-view-header.js", "Feb Default Changes");
					    	this.setData('currencyClass',true); //no i18n
					    	value = this.data.currencyProperties.baseCurrency+'  '+value[0]+' - '+this.data.currencyProperties.baseCurrency+'  '+value[1];   
					    	dataType = "";
					    }else{
					        value = value[0]+' - '+value[1];   
					    }

					}
					select=""

				}
				if(select == 'date-time'){
					if(typeof value =='string' && value.match(/{/)){
						for(var i=0;i<this.getData('selectedCondition').length;i++){
							if(value == this.getData('selectedCondition')[i].system){
								value = this.getData('selectedCondition')[i].display;
								break;
							}
						}
					}else{
						try{
							value=this.getDateTime(value);
						}catch(e){}
					}
				}else if(select == 'date'){
					if(typeof value =='string' && value.match(/{/)){
						for(var i=0;i<this.getData('selectedCondition').length;i++){
							if(value == this.getData('selectedCondition')[i].system){
								value = this.getData('selectedCondition')[i].display;
								break;
							}
						}
					}else{
						try{
							value=this.getDate(value);
						}catch(e){}
					}
				}else if(select == 'boolean'){
					if(typeof value == 'boolean'){
						if(value==false){
							value=_cruxUtils.getI18n('crm.label.notSelected') //No I18N
						}else{
							value=_cruxUtils.getI18n('crm.label.selected') //No I18N
						}
					}
				}else if(this.getData('pickList')  || select == "multiselectpicklist"){
					if(typeof value === 'string' && this.data.selectedField.cxPropType !== "single"){
						value=[].concat(value);
					}
					if(this.data.selectedField.ui_type==137){
	                    var temp=[];
	                    if(Array.isArray(value)){
	                        for(var i=0;i<value.length;i++){
	                            if(value[i].api_name){
	                               temp[i]=value[i].api_name;
	                            }else{
	                          	  temp[i]=value[i];
	                            }
	                        }
	                    }else{
	                        if(value.api_name){
	                         	temp[0]=value.api_name;
	                        }else{
	                         	temp[0] = value;
	                        }   
	                    }
		                value=temp; 
		                temp = [];
	                    if(Array.isArray(value)){
	                        for(var i=0;i<value.length;i++){
						        var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value[i]}  );//eslint-disable-line no-loop-func
						    	if(recordObj[0]){
						    		temp.push( recordObj[0].plural_label);
						    	}else{
	                                temp.push(value[i]);
						    	}
						    }
					    }else{
					    	var recordObj = Object.values(moduleRecordMapping).filter(function(item){return item.api_name == value}  );
					    	if(recordObj[0]){
						    	temp.push( recordObj[0].plural_label);//eslint-disable-line no-loop-func
						    }else{
	                            temp.push(value);
							}
					    }
					    value = temp;
	                }else if(value[0].indexOf('${CATEGORY') > -1 && !this.data.disabledRecordStateConfig){
						this.setData('dynamicTypeValueSelected','record_category');
						if(!this.data.selectedField.enable_record_category){
							Lyte.objectUtils(this.data.selectedField,'add','enable_record_category',true);
						}
						var cpV = this.executeMethod('getCustomPicklistValue',this.data.selectedField);
						this.setData('customPicklistValues',cpV);
						var tempp = [];
						value.forEach((item)=>{
							var t = cpV.cruxFindIndexOfObject('actual_value',item);
							tempp.push(cpV[t] ? cpV[t].display_value : item);
						});
						value = tempp;
					}
					if(api_name.match(/Activity_Type/) && this.data.module == 'Activities'){
						if(Array.isArray(value)){
							var temp=[]
							for(var i=0;i<value.length;i++){
								temp.push(moduleRecordMapping[value[i]].plural_label)
							}
							value = temp
						}else{
							value=_cruxUtils.getI18n('crm.label.selected') //No I18N
						}
					}   
					if(typeof value != 'string'){
						value = value.join(', ');
					}
				}else if(this.getData('selectUser')){
					if(typeof value !== 'string'){
						var tempValue = [];
						if(value.hasOwnProperty('name')){
							if(value.name =='${CURRENTUSER}'){
								tempValue[0] = _cruxUtils.getI18n('current.logged.in.user');
							}else{
								tempValue[0] = value.name;
							}
						}else if(Array.isArray(value)){
							for(var i=0;i<value.length;i++){
								if(value[i].name =='${CURRENTUSER}'){
									tempValue.push(_cruxUtils.getI18n('current.logged.in.user'));
								}else{
									tempValue.push(value[i].name ? value[i].name : value[i]);
								}
							}
						}else{
							tempValue[0] = value
						}
						value = tempValue.join(', ');	
					}
				}else if(this.getData('tagComponent')){
					var tempValue = [];
					if(value.hasOwnProperty('id')){
						tempValue[0] = value.name;
					}else{
						for(var i=0;i<value.length;i++){
							tempValue.push(value[i].name);
						}
					}
					if(tempValue.length == 0){
						value = value
					}else{
						value = tempValue.join(', ');	
					}
				}else if(this.getData('layoutComponent')){
					var tempValue = [];
					if(value.hasOwnProperty('id')){
						tempValue[0] = value.display_label ? value.display_label : value.name;
					}else{
						for(var i=0;i<value.length;i++){
							tempValue.push(value[i].display_label ? value[i].display_label : value[i].name);
						}
					}
					if(tempValue.length == 0){
						value = value
					}else{
						value = tempValue.join(', ');	
					}
				}
				if(this.data.multiModule){
					var moduleExtracted = unformattedFieldApi.substr(unformattedFieldApi.indexOf('->')+2,unformattedFieldApi.length)
					moduleExtracted = moduleExtracted.substr(0,moduleExtracted.indexOf('.'))
					multiModule = this.data.moduleRecordMapping[this.getModuleFromApiName(moduleExtracted,this.data.moduleRecordMapping)]
					value = value ? value+" "+_cruxUtils.getI18n('crm.label.simply.in')+' '+multiModule.plural_label : multiModule.plural_label;
				}
				if(select == 'text' && typeof value == 'object'){
					value = value.join(', ')
				}
				if(select == 'number' && criteria.field.separator  && typeof Search != "undefined"){
					this.setData('setClassForValue',true);//no i18n
				    if(dataType == 'currency' && ['INR','BDT','MMK','PKR'].indexOf(this.data.currencyProperties.baseCurrency) > -1 && typeof Crm != 'undefined' && Crm.userDetails.isIndianCurrencyFormatSupported){
						value=currencyUtils.formatCurrencyValue(value,'en-IN');
					}else{
						value = Search.formatNumber(value);
					}
				}
				if(dataType == 'currency'  && this.data.currencyProperties.baseCurrency && this.data.currencyProperties.baseCurrency.length > 0){
					this.setData('currencyClass',true); //no i18n
					if(typeof currencyUtils !== 'undefined' && currencyUtils.returnValueInDefaultCurrency){
						value = currencyUtils.returnValueInDefaultCurrency(this.data.currencyProperties.baseCurrency, value);
					}else{
						value = this.data.currencyProperties.baseCurrency+'  '+value;	
					}
					
				}
			}
			value = this.executeMethod('valueCriteriaViewChange',value,criteria.field,condition);
			this.setData('field',criteria.field.field_label); //no i18n
			this.setData('condition',condition); //no i18n}
			this.setData('value',value); //no i18n
			this.dataType = dataType
		}
	},
	didConnect : function(){
		if(this.dataType == 'textarea'){
			var vS = this.$node.querySelector('.valueSpan')
			vS.classList.add('cxCriteriaTextareaClamp');
			$L.fastdom.measure(function(){
				if(vS.scrollHeight > vS.clientHeight){
					this.setData("showMore", true);//No I18n
				}else{
					vS.classList.remove('cxCriteriaTextareaClamp');
				}
			}.bind(this))

		}
	},
	actions : {
		toggleShow : function(){
			var vS = this.$node.querySelector('.valueSpan')
			if(this.data.textAreaShowText == _cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions')){
				this.setData('textAreaShowText',_cruxUtils.getI18n('crm.wf.summary.label.HideInstantActions'));
				vS.classList.remove('cxCriteriaTextareaClamp');
			}else{
				this.setData('textAreaShowText',_cruxUtils.getI18n('crm.wf.summary.label.ShowInstantActions'));
				vS.classList.add('cxCriteriaTextareaClamp');
			}
		}
	},
	methods : {
		setMethodsAndDataForChildCriteriaCaller : function(component){
			this.executeMethod('setMethodsAndDataForChildCriteriaCall',component,this.data.selectedArray,this.data.criteria,this.data.criteriaIndex);
		},
	},
	observeCriteria : function(){
		this.onGetCriteria();
	}.observes('criteria'), //No I18N
	getDateTime : function(value){
		value = value.replace(/[+-]\d{2}:\d{2}/,'');
		var dateValue = value.split("-");
        var date = new Date(dateValue[0], dateValue[1]-1, dateValue[2].split("T")[0]);
		value = value.split("T");
		var time = value[1].split(":");
		date.setHours(time[0]);
		date.setMinutes(time[1]);
		this.setData('cxPropDatePattern',this.data.datePattern);//no i18n
		this.setData('cxPropTimeFormatInput',this.data.timeFormat.indexOf('a') > 0 ? '12' : '24');//no i18n
		var formattedDate = this.getDateTimeInUserFormat(date)
		var month = formattedDate.slice(0,3);
 		return formattedDate.replace(month,_cruxUtils.getI18n(month));
	},
	getDate : function(value){
		value = value.replace(/[+-]\d{2}:\d{2}/,'');
		this.setData('cxPropDatePattern',this.data.datePattern);//no i18n
		var formattedDate = this.getDateInUserDatePattern(value,this.data.datePattern,'YYYY-MM-DD',true);
		var month = formattedDate.slice(0,3);
 		return formattedDate.replace(month,_cruxUtils.getI18n(month));	
	}
},{mixins : ["crux-criteria-util","crux-element-validation"]}); //No I18N

Lyte.Component.register("crux-criteria-drop-item", {
_template:"<template tag-name=\"crux-criteria-drop-item\"> <template is=\"if\" value=\"{{expHandlers(cxPropType,'==','prefix')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropType,'==','group')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropOptions.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{cxPropItem.cxPropLabel}}</lyte-drop-label> <template is=\"for\" items=\"{{cxPropItem.cxPropOptions}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-type=\"prefix\" cx-prop-id=\"{{cxPropId}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"{{cxPropDataZcqa}}\" cx-prop-prefix-item=\"{{cxPropPrefixItem}}\"></crux-criteria-drop-item> </template> </lyte-drop-group> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(cxPropItem.unused,'!'),'&amp;&amp;',expHandlers(cxPropItem.type,'!=','unused'))}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{cxPropId}}{{cxPropPrefixItem.systemValue}} {{if(cxPropItem.cxDisabled,'cxCriteriaItemDisabled')}}\" onclick=\"{{action('onDropItemClick',event)}}\" onmouseover=\"{{action('dropdownItemMouse',event)}}\" onmouseout=\"{{action('dropdownItemMouse',event)}}\" data-value=\"{{cxPropItem[cxPropPrefixItem.systemValue]}}\" data-zcqa=\"{{cxPropDataZcqa}}_{{cxPropItem[cxPropPrefixItem.systemValue]}}_{{cxPropId}}\" index=\"{{indexi}}\" data-custom-tooltip=\"{{if(cxPropItem.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(cxPropItem.cxTitle,cxPropItem.cxTitle,'')}}\"> {{cxPropItem[cxPropPrefixItem.displayValue]}} </lyte-drop-item> </template></template> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropType,'==','group')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(cxPropItem.cxPropFields.length,'>',0)}}\"><template case=\"true\"> <lyte-drop-group> <lyte-drop-label>{{cxPropItem.cxPropLabel}}</lyte-drop-label> <template is=\"for\" items=\"{{cxPropItem.cxPropFields}}\" item=\"item\" index=\"index\"> <crux-criteria-drop-item cx-prop-id=\"{{cxPropId}}\" cx-prop-item=\"{{item}}\" cx-prop-data-zcqa=\"{{cxPropDataZcqa}}\" cx-prop-display-selector=\"{{cxPropDisplaySelector}}\" cx-prop-hide-id=\"{{cxPropHideId}}\"></crux-criteria-drop-item> </template> </lyte-drop-group> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(cxPropItem.id,'!'),'||',expHandlers(cxPropItem.id,'!=',cxPropHideId)),'&amp;&amp;',expHandlers(expHandlers(expHandlers(expHandlers(expHandlers(cxPropItem.unused,'!'),'&amp;&amp;',cxPropItem.visible),'&amp;&amp;',expHandlers(cxPropItem.type,'!=','unused')),'&amp;&amp;',cxCriteriaShowField(cxPropItem,hiddenFieldTypes)),'||',cxPropShowAll))}}\"><template case=\"true\"> <lyte-drop-item class=\"selector{{cxPropId}} {{if(cxPropItem.cxDisabled,'cxCriteriaItemDisabled')}}\" data-value=\"{{cxPropItem.api_name}}\" data-zcqa=\"{{cxPropDataZcqa}}_{{cxPropItem.api_name}}_{{cxPropId}}\" id=\"{{cxPropItem.data_type}}\" value=\"{{cxPropItem.api_name}}\" onclick=\"{{action('onDropItemClick',event)}}\" onmouseover=\"{{action('dropdownItemMouse',event)}}\" onmouseout=\"{{action('dropdownItemMouse',event)}}\" data-custom-tooltip=\"{{if(cxPropItem.cxTitle,'true','false')}}\" lt-prop-title=\"{{if(cxPropItem.cxTitle,cxPropItem.cxTitle,'')}}\"> {{cxPropItem[cxPropDisplaySelector]}} </lyte-drop-item> </template></template> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cxPropId","cxPropItem","cxPropDataZcqa","cxPropDisplaySelector","cxPropShowAll","cxPropHideId","cxPropType","cxPropPrefixItem"],
_observedAttributesType :["string","object","string","string","boolean","string","string","object"],

	data : function(){
		return {
			cxPropId : Lyte.attr('string'), //no i18n
			cxPropItem : Lyte.attr('object'), //no i18n
			cxPropDataZcqa : Lyte.attr('string'), //no i18n
			cxPropDisplaySelector : Lyte.attr('string'), //no i18n
			cxPropShowAll : Lyte.attr('boolean'), //no i18n
			cxPropHideId : Lyte.attr('string'), //no i18n
			cxPropType : Lyte.attr('string',{default : 'field'}), //no i18n
			cxPropPrefixItem : Lyte.attr('object') //no i18n
		}		
	},
	init : function(){
		var hiddenFieldTypes = [];
		if(typeof cruxAssets !== "undefined" && cruxAssets.cxHiddenCriteriaFieldTypes){
			hiddenFieldTypes = cruxAssets.cxHiddenCriteriaFieldTypes;
		}
		this.setData('hiddenFieldTypes',hiddenFieldTypes);
	},
	actions : {
		onDropItemClick : function(event){
			if(this.data.cxPropItem.cxDisabled){
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		},
		dropdownItemMouse : function(event){
			if(this.data.cxPropItem.cxDisabled){
				if(event.type == 'mouseover'){
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			}
		}
	}
});

Lyte.Component.registerHelper('cxCriteriaShowField',function(field,hiddenFieldTypes){
	var hfl = hiddenFieldTypes ? hiddenFieldTypes.length : 0;
	for(var i=0;i<hfl;i++){
	    var match = true;
	    for(var keyN in hiddenFieldTypes[i]){
	        if(field[keyN] !== hiddenFieldTypes[i][keyN]){
	            match = false;
	            break;
	        }
	    }
	    if(match){
	        return false;
	    }
	}
	return true;
});
//$Id$
Lyte.Component.register("crux-criteria-pattern", {
_template:"<template tag-name=\"crux-criteria-pattern\"> <span class=\"cxGroupPattern\"> <span class=\"cxPatternBrakets prevent\">(</span> <template is=\"if\" value=\"{{cruxHasProperty(patternNode,'group_operator')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cruxHasProperty(patternNode.group[0],'group_operator')}}\"><template case=\"true\"> <crux-criteria-pattern class=\"prevent\" pattern-node=\"{{patternNode.group[0]}}\" pattern-array=\"{{patternArray}}\"></crux-criteria-pattern> </template><template case=\"false\"> <span class=\"cxCritPtnNum\" data-value=\"{{patternNode.group[0]}}\">{{getNodeValue(patternArray,patternNode.group[0])}}</span> </template></template> <span class=\"cP criteriaCondition\" onclick=\"{{action('changePatternCondition')}}\">{{cruxGetI18n(patternNode.group_operator)}}</span> <template is=\"if\" value=\"{{cruxHasProperty(patternNode.group[1],'group_operator')}}\"><template case=\"true\"> <crux-criteria-pattern class=\"prevent\" pattern-node=\"{{patternNode.group[1]}}\" pattern-array=\"{{patternArray}}\"></crux-criteria-pattern> </template><template case=\"false\"> <span class=\"cxCritPtnNum\" data-value=\"{{patternNode.group[1]}}\">{{getNodeValue(patternArray,patternNode.group[1])}}</span> </template></template> </template></template> <span class=\"cxPatternBrakets prevent\">)</span> </span> </template>",
_dynamicNodes : [{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"text","position":[3,0]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["patternNode","patternArray"],
_observedAttributesType :["object","array"],
 //no i18n
	data : function(){
		return {
 			patternNode : Lyte.attr('object'),//no i18n
 			patternArray : Lyte.attr('array') //no i18n
		}		
	},
	actions : {
		changePatternCondition : function(){
			Lyte.Component.set(this.data.patternNode,'group_operator',this.data.patternNode.group_operator == 'or' ? 'and' : 'or');//no i18n
		}
	}
});

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

//# sourceMappingURL=crux-criteria-component.js.map