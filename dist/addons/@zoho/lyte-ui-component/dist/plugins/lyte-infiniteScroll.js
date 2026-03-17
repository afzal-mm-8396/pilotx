(function () {
  if (lyteDomObj) {
    lyteDomObj.prototype.infiniteScroll = function (param) {
      var table = this[0];
      if (param === "destroy" || param === "Destroy") { 
        Array.from($L(table.selector + ':not('+ ignoreRow +')')).forEach(function(elem){
          $L(elem).css("transform","")
        })
        table.removeEventListener("scroll", table.scrollFn)
        table.scrollToRecord ? delete table.scrollToRecord : undefined;
        table.rePopulate ? delete table.rePopulate : undefined;
        table.selector ? delete table.selector : undefined;
        delete table.scrollFn
      }
      // else if (param === "stop" || param === "Stop") {
      //   Array.from($L(table.selector)).forEach(function(elem){
      //     $L(elem).attr("style","")
      //   })
      //   table.removeEventListener("scroll", table.scrollFn)
      // }
      else {
        var tableBCR = table.getBoundingClientRect();
        var tableHeight = tableBCR.height, extraDivs;
        var downResetFlag = true, onScrollStartCheck = false;
        var scrollTimer = null, setTimer = false;
        var isLastSet = false, lastSetOnce = true;
        var lastSetMinIndex, lastSetCurrentNum, lastSetCallback;
        var browserName, isSafari, selector, selectorNodeName;
        var callObjectUpdate = true;
        var lastScrollDirection, smallCounter;
        var ignoreRow = param && param.ignoreRow ? param.ignoreRow : '';
        var ignoreString = ignoreRow ? ':not(' + ignoreRow + ')' : '';
        var onScrollStart = function () { },
            onScrolling = function () { },
            onScrollStop = function () { }, 
            onBeforeUpdate = function () { },
            onBeforeObjectUpdate = function () { },
            onObjectUpdate = function () { },
            onTransform = function () { },
            onLastSet = function () { },
            onScrollReset = function () { };
        
        // function to set the table selector
        function setSelector() {
          if (param && param.rowSelector) {
            selector = param.rowSelector;
          } else { selector = "tr" }
          if (param && !param.populateObject) {
            console.warn("Provide an empty object to populate the dataArray")
          }
        }
        //function to check the browser
        function checkBrowser() {
          var uA = navigator.userAgent, isBrowser;
          if ((isBrowser = uA.indexOf("OPR")) != -1) {
            browserName = "Opera";
          }
          else if ((isBrowser = uA.indexOf("Edg")) != -1) {
            browserName = "Microsoft Edge";
          }
          else if ((isBrowser = uA.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
          }
          else if ((isBrowser = uA.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
          }
          else if ((isBrowser = uA.indexOf("Safari")) != -1) {
            browserName = "Safari";
          }
          else if ((isBrowser = uA.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
          }
        }
        setSelector();
        checkBrowser();
        if(!table.selector){table.selector = selector}

        // Safari browser cond. checking
        if (browserName === "Safari") {
          $L(table).css("overscroll-behavior-y", "none")
          isSafari = true;
        }
        function setCallbacks() {
          if (param.onScrollStart) {
            onScrollStart = param.onScrollStart;
            setTimer = true;
            onScrollStartCheck = true;
          }
          if (param.onScrolling) {
            onScrolling = param.onScrolling;
          }
          if (param.onScrollStop) {
            setTimer = true;
            onScrollStop = param.onScrollStop;
          }
          if (param.onBeforeObjectUpdate) {
            onBeforeObjectUpdate = param.onBeforeObjectUpdate;
          }
          if (param.onObjectUpdate) {
            onObjectUpdate = param.onObjectUpdate;
          }
          if (param.onLastSet) {
            onLastSet = param.onLastSet;
          }
          if(param.onTransform){
            onTransform = param.onTransform;
          }
          if(param.onBeforeUpdate){
            onBeforeUpdate = param.onBeforeUpdate;
          }
          if(param.onScrollReset){
            onScrollReset = param.onScrollReset;
          }
        }
        setCallbacks();
        if (param && !param.disableInitialRendering) {
          // initializing the populateObject for DOM rendering 
          for (var i = 0; i < param.displayElem; i++) {
            callObjectUpdate = false;
            updatePopulateObject([i], i, param.dataArray[i]);
          }
          // checking the sufficiency of extraElems adding it if required
          var rowHeight = $L(selector + ignoreString, table)[0].getBoundingClientRect().height;
          var downElemThres = Math.floor(tableHeight / rowHeight);
      
          function setExtraDivs() {
            if (param.displayELem >= downElemThres + 4) { extraDivs = 0; }
            else { extraDivs = 4; }
          }
          setExtraDivs();

          // reinitializing the populateObject
          var totalElementCount = param.displayElem + extraDivs;
          for (var i = 0; i < totalElementCount; i++) {
            callObjectUpdate = false;
            updatePopulateObject([i], i, param.dataArray[i]);
          }
        } else { 
          var totalElementCount = param.displayElem;

          for (var i = 0; i < totalElementCount; i++) {
            callObjectUpdate = false;
            updatePopulateObject([i], i, param.dataArray[i]);
          }

          // checking the sufficiency of extraElems adding it if required
          var rowHeight = $L(selector + ignoreString, table)[0].getBoundingClientRect().height;
          var downElemThres = Math.floor(tableHeight / rowHeight);
        }
        // setting the CSS transform property if not present
        var children = $L(selector + ignoreString, table);
        Array.from(children).forEach((element) => {
          if ($L(element).css("transform") === "none") {
            $L(element).css("transform", "translateY(0px)");
          }
        });


        for (let index = 0; index < children.length; index++) {
          $L(children[index]).addClass("lyteInfiniteScrollElem-" + index);
        }
        selectorNodeName = $L(selector + ignoreString, table)[0].nodeName;
        // holding elements for CSS and render-data manipulation
        var firstElem, lastElem, up1 = undefined, up2 = undefined, currentElem;
        var down1 = $L(selector + ':nth-child(' + (downElemThres + 3) + ')' + ignoreString),
          down2 = $L(selector + ':nth-child(' + (downElemThres + 2) + ')' + ignoreString),
          downCurrentElem = $L(selector + ':nth-child(' + (downElemThres + 1) + ')' + ignoreString);

        //total height of the overall elements
        var totalYShift = totalElementCount * rowHeight;
        totalYShift = Number(totalYShift.toFixed(2));
        var dataArrayLength, lastMaxLength = 0;
        setDataArrayLength();
  
        firstElem = $L(children[0]);
        lastElem = $L(children[children.length - 1]);
        currentElem = firstElem;
  
        // "index" to track the index in populateObject
        // "counter"  to track the index in dataArray
        var index = 0, counter = totalElementCount;
        var prevScroll = 0, difference = 0;
  
        // toggled when the direction of scrolling changes
        var firstCheckScrollDown = false, firstCheckScrollUp = true;
        var once = true, dummyDiv, dummyTr;

        callObjectUpdate = true;// to enable objectupdate callback after initial rendering

        table.scrollFn = function (e) {
          e.preventDefault();
          if (isSafari && once) {
            // creating and appending a dummy TR to the table
            dummyTr = document.createElement(selectorNodeName),
              parentNode = $L(table).find(selectorNodeName + ignoreString)[0].parentNode;
            parentNode.appendChild(dummyTr);
            $L(dummyTr).addClass('dummy');
            $L(dummyTr).css("transform", "translateY(0px)");
            $L(dummyTr).css("height", "0px");
            dummyTr = $L(dummyTr);
            // creating and appending a dummy DIV to the parent Div
            dummyDiv = document.createElement('DIV');
            table.appendChild(dummyDiv);
            $L(dummyDiv).addClass('dummy');
            $L(dummyDiv).css("transform", "translateY(0px)");
            $L(dummyDiv).css("height", "0.5px");
            once = false;
            dummyDiv = $L(dummyDiv);
          }
          //scroll start callback
          if (onScrollStartCheck) {
            onScrollStart();
            onScrollStartCheck = false;
          }
          // on Scroll callback
          onScrolling();
          if (setTimer) {
            if (scrollTimer)
              clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(scrollFinished, 100);
            // scroll end callback
            function scrollFinished() {
              onScrollStartCheck = true;
              onScrollStop();
            }
          }
          var currentScroll = $L(table).scrollTop();
          
          if (currentScroll >= 0) {
            // to find whether the scrolling is in down or up direction
            difference = prevScroll - currentScroll;
            //top first visible element
            if (currentElem) {
              var currentElemBCR = currentElem[0].getBoundingClientRect();
              var currentTop = currentElemBCR.top;
              var currentBottom = currentElemBCR.bottom;
            }
            tableBCR = table.getBoundingClientRect();
            var tableTop = tableBCR.top;
            if (difference > 0 && difference < 1) {
              difference = -1;
            }
            
            //if Scroll Down happens
            if (difference < 0) {
              lastScrollDirection = "scrollDown";
              firstCheckScrollUp = true;
              if (firstCheckScrollDown) {
                lastSetOnce = true;
                index += 1;
                checkUpIndex();
                counter += totalElementCount + 1;
                checkCounter()
                firstCheckScrollDown = false;
              }
              //checks whether an element has passed
              if (currentBottom < tableTop) {
                let diff = Math.max(Math.abs(difference) / rowHeight, 1);
                for (let i = 0; i < Math.round(diff) + 1; i++) { 
                    // transfer of upper elements
                    up1 = up2;
                    up2 = currentElem;
                    if (isSafari) {
                      if ($L(currentElem).next(ignoreString)[0] === dummyTr[0]) {
                        currentElem = firstElem;
                      } else {
                        currentElem = $L(currentElem).next(ignoreString);
                      }
                    } else {
                      if ($L(currentElem).next(ignoreString).length === 0) {
                        currentElem = firstElem;
                      } else {
                        currentElem = $L(currentElem).next(ignoreString);
                      }
                    }
                    //transfer of lower elements
                    downCurrentElem = down2;
                    down2 = down1;
                    if (isSafari) {
                      if ($L(down1).next(ignoreString)[0] === dummyTr[0]) {
                        down1 = firstElem;
                      } else {
                        down1 = $L(down1).next(ignoreString);
                      }
                    } else {
                      if ($L(down1).next(ignoreString).length === 0) {
                        down1 = firstElem;
                      } else {
                        down1 = $L(down1).next(ignoreString);
                      }
                    }
                    if (up1) {
                      if (lastMaxLength === dataArrayLength) { 
                          return;
                        }
                      //alteration in populateObject and CSS of the elements
                      if (counter <= param.dataArray.length - 1) {
                        onBeforeUpdate({node:up1, scrollDirection:lastScrollDirection , data : param.dataArray[counter]});
                        var YTranslate = getYTransform(up1);
                        if((YTranslate + totalYShift) >= 0){
                          if (up1) {
                            onTransform(up1[0]);
                            $L(up1[0]).css("transform", "translateY(" + Math.max((YTranslate + totalYShift), 0) + "px)");
                          }
                          updatePopulateObject(index, counter, param.dataArray[counter])
                        } 
                        if (isSafari) {
                          var dumTrYTransform = getYTransform(dummyTr);
                          var dumDivYTransform = getYTransform(dummyDiv);
                          // var dumTrHeight = parseInt($L(dummyTr).css("height"));
                          $L(dummyDiv).css("transform", "translateY(" + Math.max((dumDivYTransform + rowHeight), 0) + "px)");
                          $L(dummyTr).css("transform", "translateY(" + Math.max((dumTrYTransform + rowHeight), 0) + "px)");
                          // $L(dummyTr).css("height", dumTrHeight - 40 +"px")
                        }
                        index++;
                        counter++;
                        isLastSet = false;
                        lastSetCallback = true;
                        checkCounter()
                      } else {
                        lastMaxLength = dataArrayLength;
                        isLastSet = true;
                        if (lastSetCallback && param.onLastSet) { 
                          downResetFlag = false;
                          if(onLastSet.then){
                            onLastSet().then( 
                              lastSetCallback = false
                            )
                          } else {
                            onLastSet()
                          }
                          setDataArrayLength();
                        }
                      }
                    }
                  checkUpIndex();
                }
              }
              function checkUpIndex() {
                if (index >= totalElementCount) {
                  index = 0;
                }
              }
              checkAndDownReset();
            }
            // if Scroll Up happens
            else if (difference > 0) {
              lastScrollDirection = "scrollUp";
              firstCheckScrollDown = true;
              if (firstCheckScrollUp) {
                downResetFlag = true;
                index -= 1;
                checkDownIndex();
                counter -= totalElementCount + 1;
                checkCounter()
                firstCheckScrollUp = false;
              }
              let diff = Math.max(Math.abs(difference) / rowHeight, 1);
              if (currentTop > tableTop) {
                if (isLastSet) {
                  let transformedElems = getDifferentTransformElems();
                  let lowerTransformElems = transformedElems[0], higherTransformElems = transformedElems[1];
                  if (lastSetOnce) {
                    for (let i = 0; i < lowerTransformElems.length; i++) {
                      if (lowerTransformElems[i][0] === currentElem[0]) {
                        lastSetCurrentNum = i;
                      } 
                      if (!lastSetCurrentNum) {
                        lastSetCurrentNum = 0;
                      }
                    }
                    lastSetMinIndex = lastSetCurrentNum - 2;
                    smallCounter = lastSetCurrentNum
                    lastSetOnce = false;
                  }
                  if (smallCounter <= lastSetMinIndex) {
                    isLastSet = false;
                    lastSetOnce = true;
                    lastSetCurrentNum = undefined;
                  }
                  smallCounter--;
                  //up1
                  up1 = higherTransformElems.length > 0 ? higherTransformElems[higherTransformElems.length - 1] : lowerTransformElems[lowerTransformElems.length - 1];
                  //up2
                  if (higherTransformElems.indexOf(up1) !== -1 && higherTransformElems.indexOf(up1) !== 0) {
                    up2 = higherTransformElems[higherTransformElems.length - 2];
                  } else if (higherTransformElems.indexOf(up1) === 0) {
                    up2 = lowerTransformElems[higherTransformElems.length - 1]
                  } else {
                    let indexOfUp1 = lowerTransformElems.indexOf(up1);
                    up2 = lowerTransformElems[indexOfUp1 - 1];
                  }
                  //currentElem
                  currentElem = getPrevElem(currentElem);
                } else {
                  lastSetOnce = true;
                  for (let i = 0; i < Math.round(diff) + 1; i++) {
                    onBeforeUpdate({node:up1, scrollDirection:lastScrollDirection , data :param.dataArray[counter]});
                    //alteration in populateObject and CSS of the elements
                    var YTranslate = getYTransform(up1);
                    if((YTranslate - totalYShift) >= 0){
                      if (up1) {
                        onTransform(up1[0]);
                        $L(up1[0]).css("transform", "translateY(" + Math.max((YTranslate - totalYShift), 0) + "px)");
                      }
                      updatePopulateObject(index, counter, param.dataArray[counter])
                    }
                    if (isSafari) {
                      var dumTrYTransform = getYTransform(dummyTr);
                      var dumDivYTransform = getYTransform(dummyDiv);
                      // var dumTrHeight = parseInt($L(dummyTr).css("height"));
                      $L(dummyDiv).css("transform", "translateY(" + Math.max((dumDivYTransform - rowHeight), 0) + "px)");
                      $L(dummyTr).css("transform", "translateY(" + Math.max((dumTrYTransform - rowHeight), 0) + "px)");
                      // $L(dummyTr).css("height", dumTrHeight + 40 + "px");
                    }
                    index--;
                    counter--;
                    checkCounter()
                    //transfer of lower elements
                    down1 = down2;
                    down2 = downCurrentElem;
                    if ($L(downCurrentElem).prev(ignoreString).length === 0) {
                      downCurrentElem = lastElem;
                    } else {
                      downCurrentElem = $L(downCurrentElem).prev(ignoreString);
                    }
                    // transfer of upper elements
                    currentElem = up2;
                    up2 = up1;
                    if ($L(up1).prev(ignoreString).length === 0) {
                      up1 = lastElem;
                    } else {
                      up1 = $L(up1).prev(ignoreString);
                    }
                    checkDownIndex();
                  }
                }
              }
              
              // checks if the table has reached its utmost top
              if (this.scrollTop <= 0) {
                onScrollReset()
                resetFunction();
              }
              function checkDownIndex() {
                if (index < 0) {
                  index = totalElementCount - 1;
                }
              }
            }
            // to maintain the previous state
            prevScroll = currentScroll;
          }
        }
        table.addEventListener('scroll', table.scrollFn)
        //function to get the Y-Transform of the element 
        function getYTransform(elem) {
          try {
            // var YTranslate = $L(elem).css("transform");
            var YTranslate = elem[0].style.transform;
            // regex to get the Y translate of the elements
            YTranslate = Number(/translateY\(([0-9\.]+)px\)/g.exec(YTranslate)[1]);
            return YTranslate;
          } catch (e) {
            // console.log(e);
          }
        }
        // function to update the populateObject
        function updatePopulateObject(index, counter, data) {
          // if(!data){debugger} 
          if (callObjectUpdate) { 
            onBeforeObjectUpdate({
              dataArrayIndex : counter,
              data: param.dataArray[counter],
              node: $L("lyteInfiniteScrollElem-" + index)[0],
              scrollDirection : lastScrollDirection
            });
            callObjectUpdate = true;
          }
          Lyte.objectUtils(param.populateObject, "add", "lyteInfiniteScrollElem-" + index, {
            "data": data,
            "index": counter
           })
          if (callObjectUpdate) {
            onObjectUpdate({
              dataArrayIndex : counter,
              data: param.dataArray[counter],
              node: $L("lyteInfiniteScrollElem-" + index)[0],
              scrollDirection : lastScrollDirection
            });
            callObjectUpdate = true;
          }
        }

        function checkCounter() {
          if (counter < 0) { 
            counter = totalElementCount - 1;
          }
        }

        // function to reset the variables when the table has reaches its top
        function resetFunction() {
          $L(table).find(selector + ignoreString).css("transform", "translateY(0px)");
          // initializing the table to its initial position
          for (var i = 0; i < totalElementCount; i++) {
            updatePopulateObject(i, i,  param.dataArray[i])
          }
          // reinitailizing the variabales
          index = 0;
          counter = totalElementCount;
          checkCounter()
          up1 = up2 = undefined;
          currentElem = firstElem;
          firstCheckScrollDown = false;
        }
        // function to reset the variables when the table has reaches its bottom
        function downResetFunction() {
          // to get the greater Y-Transform when the table has reached bottom
          var prevTempTransform = 0;
          for (var i = 0; i < totalElementCount; i++) {
            var tempTransform = getYTransform($L(selector + ignoreString, table).eq(i));
            if (tempTransform > prevTempTransform) {
              prevTempTransform = tempTransform;
            }
          }
          // to get the last elem (also the Last Element of the data) from the array of higher matching Y-Transform elements
          var lastElement, matchingArray = [];
          for (var i = 0; i < totalElementCount; i++) {
            if ($L(selector + ignoreString, table).eq(i).css("transform") === "matrix(1, 0, 0, 1, 0, " + prevTempTransform + ")") {
              matchingArray.push($L(selector + ignoreString, table).eq(i));
            }
          }
          lastElement = matchingArray.at(-1);
          // assigning all the handling variables with respect to the lastElement;
          up1 = lastElement;
          if ($L(up1).next(ignoreString).length === 0) { up2 = firstElem; }
          else { up2 = $L(up1).next(ignoreString); }
          if ($L(up2).next(ignoreString).length === 0) { currentElem = firstElem; }
          else { currentElem = $L(up2).next(ignoreString); }
          down1 = down2 = undefined;
          downCurrentElem = lastElement;
        }
        function checkAndDownReset() { 
          //checks if the table has reched its most bottom
          if (table.scrollTop + tableHeight >= param.dataArray.length * rowHeight && downResetFlag) {
            downResetFlag = false;
            downResetFunction();
            return true
          } else { 
            return false
          }
        }
        function getNextElem(elem) {
          return $L(elem).next(ignoreString).length === 0 ? firstElem : $L(elem).next(ignoreString);
        }
        function getPrevElem(elem) {
          return $L(elem).prev(ignoreString).length === 0 ? lastElem : $L(elem).prev(ignoreString);
        }
        function getIndexWithinRange(number, range) {
          if (number < 0) {
            number = number + range + 1;
          } else if (number > range) {
            number = number - range - 1;
          }
          return number
        }
        function findYshift(num) {
          return Math.max(totalYShift * (Math.ceil((num + 1) / totalElementCount) - 1), 0)
        }
        function findElemNum(num) {
          return num % totalElementCount
        }
        function setDataArrayLength() { 
          dataArrayLength = param.dataArray.length;
        }
        function rePopulateObject() {
          let count = Math.max(counter - totalElementCount, 0)
          
          let transformOfElems = getDifferentTransformElems();
          let lowerTransformElems = transformOfElems[0],
            higherTransformElems = transformOfElems[1];
          if (isLastSet) { 
            if (dataArrayLength < param.dataArray.length) {
              table.scrollTop -= 0.1;
              if (downResetFlag) {
                count = param.dataArray.length - totalElementCount;
                counter = param.dataArray.length - 1;
              } else if (!downResetFlag && lastSetCallback) { 
                reverseElementTransferDown();
              }
            }
            else { 
              count--;
              counter--;
            }
          }

          // if (count + totalElementCount >= param.dataArray.length - 1) { 
          //   table.scrollTop -= rowHeight;
          //   count++;
          // }
        
          let lowerElemNum = children.indexOf(lowerTransformElems[0][0])
          for (let i = lowerElemNum; i < Math.min((lowerElemNum + lowerTransformElems.length), param.dataArray.length); i++) {
            updatePopulateObject(i, count, param.dataArray[count]);
            count++;
          }
          if (higherTransformElems.length > 0) { 
            let higherElemNum = children.indexOf(higherTransformElems[0][0])
            for (let i = higherElemNum; i < higherElemNum + higherTransformElems.length; i++) {
              updatePopulateObject(i, count, param.dataArray[count]);
              count++;
            }
          }
          setDataArrayLength();
        }
        function getDifferentTransformElems() {
          let lowerYTransform = undefined, higherYTransform = undefined;
          let lowerTransformElems = [], higherTransformElems = [];
  
          for (var i = 0; i < totalElementCount; i++) {
            let tempTransform = getYTransform($L(selector + ignoreString, table).eq(i));
            if (lowerYTransform && lowerYTransform > tempTransform) {
              higherYTransform = lowerYTransform;
              lowerYTransform = tempTransform;
              break;
            }
            lowerYTransform = tempTransform;
          }
          for (let i = 0; i < totalElementCount; i++) {
            if ($L(selector + ignoreString, table).eq(i).css("transform") === "matrix(1, 0, 0, 1, 0, " + lowerYTransform + ")") {
              lowerTransformElems.push($L(selector + ignoreString, table).eq(i));
            } else {
              higherTransformElems.push($L(selector + ignoreString, table).eq(i));
            }
          }
          return [lowerTransformElems, higherTransformElems]
        }
        function elementTransferDown() { // transfer of elements while scrolling down
          // transfer of upper elements
          up1 = up2;
          up2 = currentElem;
          if (isSafari) {
            if ($L(currentElem).next(ignoreString)[0] === dummyTr[0]) {
              currentElem = firstElem;
            } else {
              currentElem = $L(currentElem).next(ignoreString);
            }
          } else {
            if ($L(currentElem).next(ignoreString).length === 0) {
              currentElem = firstElem;
            } else {
              currentElem = $L(currentElem).next(ignoreString);
            }
          }
          //transfer of lower elements
          downCurrentElem = down2;
          down2 = down1;
          if (isSafari) {
            if ($L(down1).next(ignoreString)[0] === dummyTr[0]) {
              down1 = firstElem;
            } else {
              down1 = $L(down1).next(ignoreString);
            }
          } else {
            if ($L(down1).next(ignoreString).length === 0) {
              down1 = firstElem;
            } else {
              down1 = $L(down1).next(ignoreString);
            }
          }
        }
        function reverseElementTransferDown() { 

          currentElem = up2;
          up2 = up1;
          if (isSafari) {
            if ($L(up1).prev(ignoreString)[0] === dummyTr[0]) {
              up1 = lastElem;
            } else {
              up1 = $L(up1).prev(ignoreString);
            }
          } else {
            up1 = getPrevElem(up1);
          }

          down1 = down2;
          down2 = downCurrentElem;

          if (isSafari) {
            if ($L(downCurrentElem).prev(ignoreString)[0] === dummyTr[0]) {
              downCurrentElem = lastElem;
            } else {
              downCurrentElem = $L(downCurrentElem).prev(ignoreString);
            }
          } else {
            downCurrentElem = getPrevElem(downCurrentElem);
          }
        }
        function elementTransferUp() { // Transfer of elements while scrolling up
          //transfer of lower elements
          down1 = down2;
          down2 = downCurrentElem;
          if ($L(downCurrentElem).prev(ignoreString).length === 0) {
            downCurrentElem = lastElem;
          } else {
            downCurrentElem = $L(downCurrentElem).prev(ignoreString);
          }
          // transfer of upper elements
          currentElem = up2;
          up2 = up1;
          if ($L(up1).prev(ignoreString).length === 0) {
            up1 = lastElem;
          } else {
            up1 = $L(up1).prev(ignoreString);
          }
        }
        function reverseElementTransferUp() {
          downCurrentElem = down2;
          down2 = down1;
          down1 = getNextElem(down1);

          up1 = up2;
          up2 = currentElem;
          currentElem = getNextElem(currentElem);

        }
        table.scrollToRecord = function (ind) {

          // add Max Y translate and calculate based on that ++>>
  
          let visibleElemNum = Math.ceil(tableHeight / rowHeight), lastSet = false;
          if (!ind) {
            console.error("Please provide a index value to scroll to.")
            return
          } else if (ind && typeof ind !== "number") { 
            console.error("Please provide an integer value as index value.")
            return
          } else if (ind < 0) {
            console.error("Please provide a index greater than or equal to 0.")
            return
          } else if (ind >= param.dataArray.length) { 
            console.error("Please provide a index lesser than dataArray's length.")
            return
          } else if (ind >= (param.dataArray.length - 1) - (visibleElemNum-1)) {
            ind = (param.dataArray.length - 1) - (visibleElemNum - 1);
            lastSet = true;
          }
          let count = ind, elemNum = findElemNum(ind);
          count -= 2;
          let maxIndex = totalElementCount - 1,
              Yshift = findYshift(ind),
              variable = Math.trunc(ind / maxIndex);
          
          iOneMinus = elemNum - 1 > -1 ? elemNum - 1 : elemNum - 1 + totalElementCount
          iTwoMinus = elemNum - 2 >= 0 ? elemNum - 2 : elemNum - 2 + totalElementCount;
          if (!lastSet) {
            for (let i = 0; i < children.length; i++) {
              if (elemNum === 0) {
                if (i < iTwoMinus) {
                  updatePopulateObject(i, ind + i, param.dataArray[ind + i])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i === iTwoMinus) {
                  updatePopulateObject(i, ind - 2, param.dataArray[ind - 2])
                  $L(children[i]).css("transform", "translateY(" + Math.max((Yshift - totalYShift), 0) + "px)");
                } else if (i === iOneMinus) {
                  updatePopulateObject(i, ind - 1, param.dataArray[ind - 1])
                  $L(children[i]).css("transform", "translateY(" + Math.max((Yshift - totalYShift), 0) + "px)");
                } else if (i === elemNum) {
                  updatePopulateObject(i, ind, param.dataArray[ind])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i > elemNum) {
                  updatePopulateObject(i, ind + (Math.abs(elemNum - i)), param.dataArray[ind + (Math.abs(elemNum - i))])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                }
              } else if (elemNum === 1) {
                if (i < iTwoMinus) {
                  updatePopulateObject(i, ind + (Math.abs((totalElementCount - elemNum) + i)), param.dataArray[ind + (Math.abs((totalElementCount - elemNum) + i))])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i === iTwoMinus) {
                  updatePopulateObject(i, ind - 1, param.dataArray[ind - 1])
                  $L(children[i]).css("transform", "translateY(" + Math.max((Yshift - totalYShift), 0) + "px)");
                } else if (i === elemNum) {
                  updatePopulateObject(i, ind, param.dataArray[ind])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i > elemNum) {
                  updatePopulateObject(i, ind + (Math.abs(elemNum - i)), param.dataArray[ind + (Math.abs(elemNum - i))])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                }
              } else {
                if (i < iTwoMinus) {
                  updatePopulateObject(i, ind + (Math.abs((totalElementCount - elemNum) + i)), param.dataArray[ind + (Math.abs((totalElementCount - elemNum) + i))])
                  $L(children[i]).css("transform", "translateY(" + Math.max((Yshift + totalYShift), 0) + "px)");
                } else if (i === iTwoMinus) {
                  updatePopulateObject(i, ind - 2, param.dataArray[ind - 2])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i === iOneMinus) {
                  updatePopulateObject(i, ind - 1, param.dataArray[ind - 1])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i === elemNum) {
                  updatePopulateObject(i, ind, param.dataArray[ind])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                } else if (i > elemNum) {
                  updatePopulateObject(i, ind + (Math.abs(elemNum - i)), param.dataArray[ind + (Math.abs(elemNum - i))])
                  $L(children[i]).css("transform", "translateY(" + Math.max(Yshift, 0) + "px)");
                }
              }
            }
            currentElem = getPrevElem(children[elemNum]);
            up2 = getPrevElem(currentElem);
            up1 = getPrevElem(up2);
            downElemCount = getIndexWithinRange(elemNum + Math.round(tableHeight / rowHeight) - 1, maxIndex);
            downCurrentElem = children[downElemCount];
            down1 = getNextElem(downCurrentElem);
            down2 = getNextElem(down1);
          } else { 
              let lastIndex = param.dataArray.length - 1,
                  lastElemNum = findElemNum(lastIndex),
                  lastElemYshift = findYshift(lastIndex);
            for (let i = 0; i < children.length; i++) {
              if (i <= lastElemNum) {
                $L(children[i]).css("transform", "translateY(" + Math.max(lastElemYshift, 0) + "px)");
                Lyte.objectUtils(param.populateObject.data, "add", "lyteInfiniteScrollElem-" + i, param.dataArray[(lastIndex - (lastElemNum - i))]);
              } else { 
                $L(children[i]).css("transform", "translateY(" + Math.max((lastElemYshift - totalYShift), 0) + "px)");
                Lyte.objectUtils(param.populateObject.data, "add", "lyteInfiniteScrollElem-" + i, param.dataArray[lastIndex - (totalElementCount - i) - lastElemNum]);
              }
              // downResetFunction();
            }
           }
          table.scrollTop = ind * rowHeight;
          index = iTwoMinus;
          // index = (ind - 1) % totalElementCount - 1;
          // index = Math.trunc(Number("." + (ind / maxIndex + "").split(".")[1]) * maxIndex) - (2 + variable);
          counter = ind + (maxIndex - 1);
          checkCounter()
          
          prevScroll = ind * rowHeight - 1;
          firstCheckScrollDown = false;
        }
        table.rePopulate = function () { 
          // param.dataArray.splice(args.index + 1, 0, args.value)
          rePopulateObject();
        }
      }
    };
  }
})();

// beta-ai-code
// (function () {
//   if (!lyteDomObj) {
//     return;
//   }

//   function noop() { }

//   function initInfiniteScroll(table, param, stateKey) {
//     if (!table) {
//       return;
//     }

//     if (param === "destroy" || param === "Destroy") {
//       var prev = table[stateKey];
//       if (prev) {
//         if (prev.onScroll) {
//           table.removeEventListener("scroll", prev.onScroll);
//         }
//         if (prev.rafId) {
//           cancelAnimationFrame(prev.rafId);
//         }
//         if (prev.scrollTimer) {
//           clearTimeout(prev.scrollTimer);
//         }
//         if (prev.resizeHandler) {
//           window.removeEventListener("resize", prev.resizeHandler);
//         }
//         if (prev.rows && prev.rows.length) {
//           Array.from(prev.rows).forEach(function (el) {
//             $L(el).css("transform", "");
//             $L(el).css("display", "");
//           });
//         }
//         delete table[stateKey];
//       }
//       if (table.scrollToRecord) {
//         delete table.scrollToRecord;
//       }
//       if (table.rePopulate) {
//         delete table.rePopulate;
//       }
//       return;
//     }

//     param = param || {};

//     var selector = param.rowSelector || "tr";
//     var ignoreRow = param.ignoreRow ? param.ignoreRow : "";
//     var ignoreString = ignoreRow ? ":not(" + ignoreRow + ")" : "";
//     var displayElem = typeof param.displayElem === "number" ? param.displayElem : 0;
//     var dataArray = Array.isArray(param.dataArray) ? param.dataArray : [];
//     var populateObject = param.populateObject;
//     var disableInitialRendering = !!param.disableInitialRendering;

//     var onScrollStart = param.onScrollStart || noop;
//     var onScrolling = param.onScrolling || noop;
//     var onScrollStop = param.onScrollStop || noop;
//     var onBeforeUpdate = param.onBeforeUpdate || noop;
//     var onBeforeObjectUpdate = param.onBeforeObjectUpdate || noop;
//     var onObjectUpdate = param.onObjectUpdate || noop;
//     var onTransform = param.onTransform || noop;
//     var onLastSet = param.onLastSet || noop;
//     var onScrollReset = param.onScrollReset || noop;

//     var bufferBefore = 2;
//     var bufferAfter = 2;

//     var state = {
//       selector: selector,
//       ignoreString: ignoreString,
//       displayElem: displayElem,
//       dataArray: dataArray,
//       populateObject: populateObject,
//       rowHeight: null,
//       poolSize: 0,
//       lastStartIndex: null,
//       lastDataLength: dataArray.length,
//       lastSetLength: null,
//       scrolling: false,
//       scrollTimer: null,
//       rafId: null,
//       rows: null,
//       onScroll: null,
//       resizeHandler: null
//     };

//     function getRows() {
//       return $L(selector + ignoreString, table);
//     }

//     function getRowHeight() {
//       if (param.rowHeight && typeof param.rowHeight === "number") {
//         return param.rowHeight;
//       }
//       var rows = getRows();
//       if (!rows || !rows.length) {
//         return null;
//       }
//       var h = rows[0].getBoundingClientRect().height;
//       return h && h > 0 ? h : null;
//     }

//     function ensurePoolSize() {
//       var desired = Math.max(1, displayElem + bufferBefore + bufferAfter);
//       if (dataArray.length > 0) {
//         desired = Math.min(desired, dataArray.length);
//       }
//       state.poolSize = desired;
//     }

//     function updatePopulateObject(domIndex, dataIndex, data, suppressCallbacks) {
//       if (!populateObject) {
//         return;
//       }
//       if (!suppressCallbacks) {
//         onBeforeObjectUpdate({
//           dataArrayIndex: dataIndex,
//           data: data,
//           node: state.rows ? state.rows[domIndex] : null,
//           scrollDirection: null
//         });
//       }
//       Lyte.objectUtils(populateObject, "add", "lyteTestInfiniteScrollElem-" + domIndex, {
//         data: data,
//         index: dataIndex
//       });
//       if (!suppressCallbacks) {
//         onObjectUpdate({
//           dataArrayIndex: dataIndex,
//           data: data,
//           node: state.rows ? state.rows[domIndex] : null,
//           scrollDirection: null
//         });
//       }
//     }

//     function ensureInitialRows(cb) {
//       var rows = getRows();
//       if (rows && rows.length) {
//         cb();
//         return;
//       }
//       if (!populateObject) {
//         console.error("testInfiniteScroll: populateObject is required to render initial rows.");
//         return;
//       }

//       ensurePoolSize();

//       for (var i = 0; i < state.poolSize; i++) {
//         updatePopulateObject(i, i, dataArray[i], disableInitialRendering);
//       }

//       // wait for Lyte to render rows
//       var attempts = 0;
//       (function waitForRows() {
//         attempts++;
//         var newRows = getRows();
//         if (newRows && newRows.length) {
//           cb();
//           return;
//         }
//         if (attempts < 20) {
//           requestAnimationFrame(waitForRows);
//         }
//       })();
//     }

//     function normalizeRows() {
//       state.rows = getRows();
//       if (!state.rows || !state.rows.length) {
//         return false;
//       }
//       ensurePoolSize();
//       // add classes for stable mapping
//       for (var i = 0; i < state.rows.length; i++) {
//         $L(state.rows[i]).addClass("lyteTestInfiniteScrollElem-" + i);
//         var t = window.getComputedStyle(state.rows[i]).transform;
//         if (!t || t === "none") {
//           $L(state.rows[i]).css("transform", "translateY(0px)");
//         }
//       }
//       return true;
//     }

//     function setRow(domIndex, dataIndex) {
//       var row = state.rows[domIndex];
//       if (!row) {
//         return;
//       }
//       if (dataIndex < 0 || dataIndex >= dataArray.length) {
//         $L(row).css("display", "none");
//         return;
//       }
//       $L(row).css("display", "");
//       onBeforeUpdate({ node: row, scrollDirection: null, data: dataArray[dataIndex] });
//       onTransform(row);
//       // Translate by delta to avoid gaps (DOM flow already accounts for domIndex position)
//       $L(row).css("transform", "translateY(" + ((dataIndex - domIndex) * state.rowHeight) + "px)");
//       updatePopulateObject(domIndex, dataIndex, dataArray[dataIndex], false);
//     }

//     function renderRange(startIndex) {
//       if (!state.rows || !state.rows.length) {
//         return;
//       }
//       if (!state.rowHeight) {
//         return;
//       }
//       var maxStart = Math.max(0, dataArray.length - state.poolSize);
//       var normalizedStart = Math.max(0, Math.min(startIndex, maxStart));
//       if (state.lastStartIndex === normalizedStart) {
//         return;
//       }
//       state.lastStartIndex = normalizedStart;
//       for (var i = 0; i < state.poolSize; i++) {
//         setRow(i, normalizedStart + i);
//       }

//       if (dataArray.length > 0 && (normalizedStart + state.poolSize) >= dataArray.length) {
//         if (state.lastSetLength !== dataArray.length) {
//           state.lastSetLength = dataArray.length;
//           var res = onLastSet();
//           if (res && typeof res.then === "function") {
//             res.then(function () {
//               // allow next trigger if data length changes
//             });
//           }
//         }
//       }
//     }

//     function renderFromScroll() {
//       var scrollTop = table.scrollTop;
//       if (scrollTop <= 0) {
//         onScrollReset();
//       }
//       var startIndex = Math.floor(scrollTop / state.rowHeight) - bufferBefore;
//       if (startIndex < 0) {
//         startIndex = 0;
//       }
//       renderRange(startIndex);
//     }

//     function scheduleRender() {
//       if (state.rafId) {
//         return;
//       }
//       state.rafId = requestAnimationFrame(function () {
//         state.rafId = null;
//         renderFromScroll();
//       });
//     }

//     function attachScroll() {
//       state.onScroll = function () {
//         if (!state.scrolling) {
//           onScrollStart();
//           state.scrolling = true;
//         }
//         onScrolling();
//         if (state.scrollTimer) {
//           clearTimeout(state.scrollTimer);
//         }
//         state.scrollTimer = window.setTimeout(function () {
//           state.scrolling = false;
//           onScrollStop();
//         }, 100);
//         scheduleRender();
//       };
//       table.addEventListener("scroll", state.onScroll);
//     }

//     function setupResize() {
//       state.resizeHandler = function () {
//         var newHeight = getRowHeight();
//         if (newHeight && newHeight !== state.rowHeight) {
//           state.rowHeight = newHeight;
//           state.lastStartIndex = null;
//           renderFromScroll();
//         }
//       };
//       window.addEventListener("resize", state.resizeHandler);
//     }

//     ensureInitialRows(function () {
//       if (!normalizeRows()) {
//         return;
//       }
//       state.rowHeight = getRowHeight();
//       if (!state.rowHeight) {
//         console.error("testInfiniteScroll: row height could not be determined");
//         return;
//       }
//       ensurePoolSize();
//       attachScroll();
//       setupResize();
//       renderRange(0);

//       table.scrollToRecord = function (ind) {
//         if (ind === undefined || ind === null) {
//           console.error("Please provide a index value to scroll to.");
//           return;
//         }
//         if (typeof ind !== "number" || ind < 0) {
//           console.error("Please provide a non-negative integer index.");
//           return;
//         }
//         if (ind >= dataArray.length) {
//           console.error("Please provide a index lesser than dataArray's length.");
//           return;
//         }
//         table.scrollTop = ind * state.rowHeight;
//         renderRange(Math.max(0, ind - bufferBefore));
//       };

//       table.rePopulate = function () {
//         dataArray = Array.isArray(param.dataArray) ? param.dataArray : [];
//         state.lastDataLength = dataArray.length;
//         state.lastStartIndex = null;
//         ensurePoolSize();
//         renderFromScroll();
//       };

//       table[stateKey] = state;
//     });
//   }

//   lyteDomObj.prototype.testInfiniteScroll = function (param) {
//     initInfiniteScroll(this[0], param, "_lyteTestInfiniteScrollState");
//   };
// })();
