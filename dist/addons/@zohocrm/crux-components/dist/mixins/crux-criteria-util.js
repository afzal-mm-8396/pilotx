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

