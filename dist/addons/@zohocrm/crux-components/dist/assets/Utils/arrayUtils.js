// $Id$

	/**
	 * @external Array
	 */

	/** 
	 * @param {Number|String} element - This provides the element that is to be found from the Array.
	 * This method is used to find whether an element in present in an Array or not. 
	 * @returns {Boolean} - It returns True if the passed-in Array contains the search element and False if not.
	 * @function external:Array#contains
	 * @example
	 * [1,2,3,4].contains(4)
	 * => true
 	 */
	//esapi prototype overrided current prototype if PE enabled. so, added payload encryption enabled check
if(!Array.prototype.contains || window.Encryptionenabled){
	Array.prototype.contains = function (element) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (this[i] == element) { //eslint-disable-line eqeqeq
				return true;
			}
		}
		return false;	        
	};
}
	/**
	 * @param {Number|String} element - This provides the element that is to be added to the Array only if the element is not present within the array.
	 * This method is used to add Elements to the Array. 
	 * @returns {Boolean} - It returns True if the element is not present within the array and pushes it into the passed-in array.
	 * @function external:Array#pushUniqValues
	 * @example
	 * [1,2,3,4].pushUniqValues(5)
	 * => [1,2,3,4,5]
 	 */	
if(!Array.prototype.pushUniqValues){
	Array.prototype.pushUniqValues = function(element){
		var pos = this.lastIndexOf(element); 
		if(pos === -1){
			this.push( element );
			return true;
		 }
		return false;
	};
}

	/**
	 * @param {Number|String} element - This provides the value that is to be removed from the Array.
	 * This method is used to remove the last occurrence of the passed-in value within the Array.  (previously removeArrayElement)
	 * @returns {Boolean} - It returns True if the Element is present and is removed from the Array.
	 * @function external:Array#removeLastOccurenceOfElement
	 * @example
	 * [1,2,3,4,5,1].removeLastOccurenceOfElement(1)
	 * => true
 	 */	
if(!Array.prototype.removeLastOccurenceOfElement){
	Array.prototype.removeLastOccurenceOfElement = function (element){
		 var pos = this.lastIndexOf(element); 
		 if(pos !== -1){
			 this.splice(pos, 1);
			 return true;
		 }
		 return false;
	};
}

	/**
	 * @param {Number|String} values - This provides the value that is to be removed from the Array.
	 * This method is used to remove the first occurrence of the Element from the passed-in Array. (previously removeElement)
	 * @returns {Array} - It returns the Array after removing the specified value.
	 * @function external:Array#removeFirstOccurenceOfElement
	 * @example
	 * [1,2,3,4,5].removeFirstOccurenceOfElement(2)
	 * => [1,3,4,5]
 	 */
if(!Array.prototype.removeFirstOccurenceOfElement){
	Array.prototype.removeFirstOccurenceOfElement = function(values) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (this[i] === values) {
				this.splice(i, 1);
				break;
			}
		}
	};
}

	/**
	 * @param {Array} values - This provides the list of values that are to be removed from the Array.
	 * This method is used to remove the ist of values present within the Array. (previously removeArrayElement)
	 * @returns {Array} - It returns the remaining part of the array after removing the passed -in list.
	 * @function external:Array#removeArrayElements
	 * @example
	 * [1,2,3,4,5,1].removeArrayElements([1,2,3])
	 * => [1,4,5]
 	 */
if(!Array.prototype.removeArrayElements){
	Array.prototype.removeArrayElements = function(values) {
		var len = values.length;
		for (var i = 0; i < len; i++) {
			this.removeLastOccurenceOfElement(values[i]);
		}
		return this;
	};
}
	
	/**
	 * @param {Number} index - This provides the index at which the value has to be removed from the Array.
	 * This method is used to remove Elements from the specified index in the passed-in array.
	 * @returns {Array} - It returns the Array after removing the element at specified index.
	 * @function external:Array#deleteElementAt
	 * @example
	 * [1,2,3,4,5].deleteElementAt(2)
	 * => [1,2,4,5]
 	 */
if(!Array.prototype.deleteElementAt){
	Array.prototype.deleteElementAt = function (index) {
		if(index !== -1) {
			this.splice(index, 1);	
		}
	};
}

	/**
	 * @param {function} callback - This provides the method with which the array has to be filtered
	 * @param {Number|String} endLimit - This provides the no of value(s) to be removed from the Array.
	 * This method is used to remove Elements from the passed-in Array. 
	 * @returns {Array} - It returns a array which passes the conditional callback method and returns only the specified numbers.s
	 * @function external:Array#filterWithLimit
	 * @example 
	 * [1,2,3,4,5,6,7,8,9,10,11,12].filterWithLimit(function(num){ return num% 2 == 0},4)
	 * => [2, 4, 6, 8]
 	 */
if(!Array.prototype.filterWithLimit){
	Array.prototype.filterWithLimit = function(callback,endLimit) {
		var array = this;
		var matches = [];
		var len = array.length;
		var limit = 0;
		for (var i = 0; i < len; i++) {
			if(callback(array[i],i)) {
				matches.push(array[i]);
				limit++;
			}
			if (endLimit && limit >= endLimit) {
				break;
			}
		}
		return matches;
	};
}

	/**
	 * @param {String} key - This provides the key by which the value has to be sorted in the Array.
	 * Returns a (stably) sorted copy of **list** , ranked in ascending order by the results of running each value through **iteratee** .iteratee may also be the string name of the property to sort by (eg.`length`).
	 * @returns {Array} - It returns a Array which is sorted according to the conditional or predicate method passed-in.
	 * @function external:Array#sortBy
	 * @example
	 * [1, 2, 3, 4, 5, 6].sortBy(function(num){ return Math.sin(num); });
	 * => [5, 4, 6, 3, 1, 2]
	 * var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	 * stooges.sortBy('name');
	 * => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
 	 */
if(!Array.prototype.sortBy){
	Array.prototype.sortBy = function(key){
		return $u.sortBy(this,key);
	};
}

	/**
	 * @param {String} key - This provides the key by which the value has to be sorted in the Array.
	 * Returns a (stably) sorted copy of **list** , ranked in descending order by the results of running each value through **iteratee** . iteratee may also be the string name of the property to sort by (eg.`length`).
	 * @returns {String} - It returns the Array that is sorted in descending depending on the iteratee passed
	 * @function external:Array#sortDescOrder
	 * @example
	 * [1, 2, 3, 4, 5, 6].sortDescOrder(function(num){ return Math.sin(num); });
	 * => [2,1,3,6,4,5]
	 * var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
	 * stooges.sortDescOrder('name');
	 * => [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
 	 */
if(!Array.prototype.sortDescOrder){
	Array.prototype.sortDescOrder = function(key){
		return $u.sortBy(this,key).reverse();
	};
}

	/**
	 * @param {Number} elements -This provides the first n number of values that are to be returned.
	 * Returns the first element of an **array** . Passing **n**  will return the first **n**  elements of the array.
	 * @returns {Any} - It returns the first element of the array.
	 * @function external:Array#first
	 * @example
	 * [5, 4, 3, 2, 1].first();
	 * => 5
 	 */
if(!Array.prototype.first){
	Array.prototype.first = function(elements){
		if(elements){
			return this.slice(0 , elements);
		}
			return this[0];
		
	};
}


	/**
	 * @param {Number} elements -This provides the last n number of values that are to be returned. 
   	 * Returns the last element of an **array** . Passing **n**  will return the last **n**  elements of the array.
	 * @returns {Any} - It returns the last element of the array. 
	 * @function external:Array#last
	 * @example
	 * [5, 4, 3, 2, 1].last();
	 * => 1
 	 */
if(!Array.prototype.last){
	Array.prototype.last = function(elements){
		if(elements){
			return this.slice(Math.max(this.length - elements, 0));
		}
			return this[this.length - 1];
		
	};
}

	/**
	 * @param {Any} value - This provides the static value that has to fill the remaining positions of the index provided.
	 * @param {Number} start - This provides the start index of the array from which the static values are to be filled upon.
	 * @param {Number} end - This provides the ending index of the array upto which the static values are to be filled upon.
	 * @returns {Array} - It returns a new array with the static values filled on the provided indices
	 * @function external:Array#fill
	 * @example 
	 * [1,2].fill(0,2,4)
	 * => [1,2,0,0]
 	 */
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {			//NO I18N
    value: function(value) {
	      if (this === null || !this) {
	        throw new TypeError('this is null or not defined');		// NO I18N
		      }
		      var O = Object(this);
		      var len = O.length >>> 0;
		      var start = arguments[1]; //eslint-disable-line @zoho/zstandard/no-reserved-words
		      var relativeStart = start >> 0;
		      var k = relativeStart < 0 ?
		      Math.max(len + relativeStart, 0) :
		      Math.min(relativeStart, len);
		      var end = arguments[2]; //eslint-disable-line @zoho/zstandard/no-reserved-words
		      var relativeEnd = end === undefined ?
	          len : end >> 0;
		      var finalVal = relativeEnd < 0 ?
	          Math.max(len + relativeEnd, 0) :
		      Math.min(relativeEnd, len);
		      while (k < finalVal) {
		        O[k] = value;
		        k++;
		      }
		      return O;
		}
  });
}

	/**
	 * @param {Any} valueToFind - This provides the search string that has to be matched within the provided String object.
	 * @param {Number} fromIndex - This provides the start index from which the search string has to be matched.
	 * @returns {Boolean} - It returns true if the passed-in element is present within the array and False if not.
	 * @function external:Array#includes
	 * @example 
	 * [1,2,3,4,5].includes(2)
	 * => true
 	 */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', { //NO i18n
    value: function(valueToFind, fromIndex) {
      if (this === null || !this) {
        throw new TypeError('"this" is null or not defined'); //NO i18n
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y); //NO i18n
      }
      while (k < len) {
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

	/**
	 * @param {Array|Object} obj - This provides the array or object that has to be removed from the passed Array.
	 * @returns {Array} - It returns the new Array after removing passed-in argument values.
	 * @function external:Array#removeAll
	 * @example 
	 * [1,2,3,4,5].removeAll([1,2,3])
	 * => [4,5]
 	 */
if(!Array.prototype.removeAll){
	Array.prototype.removeAll = function(obj){
		var array = this;
		var len = obj.length;
		for(var c = 0; c < len; c++){
			if(array.contains(obj[c])){
				array.splice(array.indexOf(obj[c]), 1);
			}
		}
		return array;
	};
}

	/**
	 * This method is used to get diff between two arrays. 
	 * @param {Array} arr - This provides the Array 2 which is differentiated from array 1. 
	 * @return {Array} - Difference between array1 and array2 will be provided. 
	 * @function external:Array#diff
	 * @example 
	 * ["one","two","three","four"].diff(["one","two"]) 
	 * => ["three","four"].
 	 */
if (!Array.prototype.diff) {
	Array.prototype.diff = function(arr) {
	    return this.filter(function(i) { return arr.indexOf(i) < 0; } );
	};
}

	/**
	 * This method is used to get unique values in the array(removes duplicates).
	 * @return {Array} - Unique Array will be returned. 
	 * @function external:Array#unique
	 * @example 
	 * ["three","three","four","four"].unique() 
	 * => ["three","four"].
 	 */
if(!Array.prototype.unique){
	Array.prototype.unique = function() {
		var a = this;
		var filteredArray = a.filter(function(item, pos){
			  return a.indexOf(item) === pos; 
			});
		return filteredArray;
	};
}

	/**
	 * This method is used to get common values between two arrays. 
	 * @param {Array} arr2 - This provides the Array 2 from which is common values of array1 are to be returned. 
	 * @return {Array} - It returns the intersection values of array1 and array2. 
	 * @function external:Array#intersection
	 * @example 
	 * ["one","two","three","four"].intersection(["one","two"]) 
	 * => ["one","two"].
 	 */
if(!Array.prototype.intersection){
	Array.prototype.intersection = function(arr2) {
		var arr1 = this;
		var commonValues = arr1.filter(function(value) { 
		    return arr2.indexOf(value) > -1;
		});
		return commonValues;
	};
}

	/**
	 * This method is used to get values of a particular key from array of objects. 
	 * @param {String} key - This provides the name of the key whose corresponding values has to be returned as an array.
	 * @return {Array} - It returns an array of object's values. 
	 * @function external:Array#mapByKey
	 * @example 
	 * [{'id':1},{'id':2},{'id':3}].mapByKey('id')
	 * => [1,2,3].
 	 */
if(!Array.prototype.mapByKey){
	Array.prototype.mapByKey = function(key) {
	    var array = [];
	    var len = this.length;
	    for(var i = 0; i < len; ++i) {
	        var currentObj = this[i];
	        if(currentObj.hasOwnProperty(key)){
	        	array.push(currentObj[key]);
	        }
	    }
	    return array;
	};
}
