// $Id$

	/**
	 * @external String
	 */

	/**
	 * @param {String} str - This provides the string that is to be found at first position in the String object.
	 * @returns {Boolean} - It returns true if the array starts with the passed-in search string and false if not.
	 * @function external:String#startsWith
	 * @example 
	 * "Hello world".startsWith("Hello")
	 * => true
	*/
if(!String.prototype.startsWith){
	String.prototype.startsWith = function(str){
		if(this.indexOf(str) === 0){
			return true;
		}
		return false;
	};
}

	/**
	 * @param {String} str - This provides the string that has to be found at last position in the String object.
	 * @returns {Boolean} - It returns true if the array ends with the passed-in search string and false if not.
	 * @function external:String#endsWith
	 * @example 
	 * "Hello world".endsWith("world")
	 * => true
	*/
if(!String.prototype.endsWith){
	String.prototype.endsWith = function(str){
		return this.length >= str.length && this.substr(this.length - str.length) === str;
	};
}

	/**
	 * This method is used to remove the special characters from the string and return the special character free string.
	 * @returns {String} - It returns the String which is free of special characters.
	 * @function external:String#removeSpecialChars
	 * @example 
	 * "abcd;'12345".removeSpecialChars()
	 * => "abcd12345"
	*/
if(!String.prototype.removeSpecialChars){
	String.prototype.removeSpecialChars = function() { //NO I18n
		return this.replace(/[^a-zA-Z0-9]+/g,'');
	};
}

	/**
	 * This method is used to extract the last letter from the string and return it.
	 * @returns {String} - It returns the last letter of the passed-in String.
	 * 
	 * @function external:String#extractLast
	 * @example 
	 * "abcdefgh".extractLast(/,\s*)
	 * => "h"
	*/
if(!String.prototype.extractLast){
	String.prototype.extractLast = function(){
	    return this.split( /,\s*/ ).pop();
	};
}

	/**
	 * This method is used to extract only the digits from the string provided and returns it.
	 * @returns {String} - It returns the String which only contains numbers.
	 * @function external:String#getOnlyNO
	 * @example 
	 * "abcde12fgh34".getOnlyNO()
	 * => "1234"
	*/
if(!String.prototype.getOnlyNO){
	String.prototype.getOnlyNO = function(){
		return this.replace(/[^\d]/g, "");
	};
}

	/**
	 * This method is used to make the first letter of the String as capital letter and returns the changed String.
	 * @returns {String} - It returns a copy of passed-in String in which the first letter is made as Capital Letter.
	 * @function external:String#firstLetterCap
	 * @example 
	 * "abcdefgh".firstLetterCap()
	 * => "Abcdefgh"
	*/
if(!String.prototype.firstLetterCap){
	String.prototype.firstLetterCap = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

	/**
	 * @param {Number} index - This provides index at which the replacement is required.
	 * @param {String} replacement - This provides the value that is to be replaced at the given index. 
	 * This method is used to replace a particular string value at a particular index.
	 * @returns {String} - It returns a String in which certain character has to be replaced at the specified index.
	 * @function external:String#replaceAtIndex
	 * @example 
	 * "abddefgh".replaceAtIndex(2,"c")
	 * => "abcdefgh"
	*/
if(!String.prototype.replaceAtIndex){
	String.prototype.replaceAtIndex = function(index, replacement){
		var a = this.split("");
	    a[index] = replacement;
	};
}


	/**
	 * @param {String} search - This provides element whose last occurrence has to be replaced.
	 * @param {String} replacement - This provides the value that is to be replaced for the specified element. 
	 * This method is used to replace a particular string value at a last occurred index.
	 * @returns {String} - It returns a string in which the search values are replaced with replacement string provided.
	 * @function external:String#replaceAll
	 * @example 
	 * "abchefgh".replaceAll("h","I")
	 * => "abcIefgI"
	*/
if(!String.prototype.replaceAll){
	String.prototype.replaceAll = function(search, replacement) {
	    return this.replace(new RegExp(search , 'g'), replacement);	
	};
}


	/**
	 * @param {Number} start - This provides the starting index of the string in which the replacement is required.
	 * @param {Number} end - This provides the ending index of the string upto which there is a need of replacement. 
	 * @param {String} what - This provides the value that is to be replaed at the given indices.
	 * This method is used to replace a particular string value at a particular index.
	 * @returns {String} - It returns the string by replacing the elements between the passed-in indices.
	 * @function external:String#replaceBetween
	 * @example 
	 * "aijklfgh".replaceBetween(1,5,"bcde")
	 * => "abcdefgh"
	*/
if(!String.prototype.replaceBetween){
	String.prototype.replaceBetween = function(start, end, what) {
		return this.substring(0, start) + what + this.substring(end);
	}	;
}


	/**
	 * @param {String} search - This provides the search string that has to be matched within the provided String object.
	 * @param {Number} start - This provides the position of the index from which the search string has to be matched.
	 * This method is used to check whether the search string is present within the passed-in String.
	 * @returns {String} - It returns True if the search element is present within the String and false if not.
	 * @function external:String#includes
	 * @example 
	 * "Hello world".includes("e")
	 * => true
	*/
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
	  if (typeof start !== 'number') {
	    start = 0;
	  } 
	  if (start + search.length > this.length) {
	    return false;
	  } 
        return this.indexOf(search, start) !== -1;
	};
}
