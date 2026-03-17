;(function(){
    var registered = false, boundedListener;

    //focus-after elements are bound to document scope and not container's scope (if container param is true)

    if($L){

        // var grpArr=[],groupNo;
        var focArr=[];
  
    function keydownHandler( param, e ){
        var container = document;

        if( param && param.container ){
            container = $L(document.activeElement).closest( '[data-focus-container]' )[0] || document;
        }

        focArr = document.querySelectorAll('[lyte-focus-after]');
        if(e.key=='Tab' && !e.shiftKey ){
            var currentActiveElement=document.activeElement, nextElementNfe=currentActiveElement.getAttribute('lyte-nfocus-name'),
            nextElementTabind=currentActiveElement.getAttribute('data-tabindex');

            var elemWithNfe;
            if( nextElementNfe ){
                elemWithNfe = container.querySelector('[lyte-focus-name='+nextElementNfe+']');
            }

            if(nextElementNfe!=null && elemWithNfe != null && isValid( elemWithNfe ) ){
                var ret = focusAndCheckForCallbacks( param, elemWithNfe, 'focus-name', e );
                if( ret === false ){
                    return;
                }
            }
            else if(nextElementTabind!=null && nextElementTabind!=undefined && nextElementTabind.includes('group')){
                var bool = true;
                var groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                groupNo=Number.parseInt( groupNo.split('-')[0]);
                var grpArr=container.querySelectorAll('[data-tabindex^="group'+groupNo+'-"]');
                grpArr=Array.from(grpArr);
                if(grpArr.length == 0){
                    return;
                }

                grpArr.sort(sortFn);
                var curInd=grpArr.indexOf( currentActiveElement );
                        
                if(curInd<grpArr.length-1){
                    var instInd = curInd + 1;
                    var Elem = grpArr[instInd];
                    while(Elem && !isValid(Elem)){
                            Elem = grpArr[instInd];
                            instInd += 1;
                    }

                    if(Elem && isValid(Elem)){
                        var ret = focusAndCheckForCallbacks( param, Elem, 'data-tabindex', e );
                        if( ret === false ){
                            return;
                        }
                        bool = false;
                    }
                }

                if( bool ){
                    var bool2 = 'true';
                    var multiGrpSorted = false;
                    if(param && param.ltPropChangeFocus && param.ltPropChangeFocus != 'false'){
                        var old_elem = document.activeElement;
                        changeFocus(groupNo, e, param);
                        if( old_elem != document.activeElement ){
                            return ;
                        }
                    }
                    var nxtGrpArr = Array.from(container.querySelectorAll('[data-tabindex^="group'+(groupNo+1)+'-"]'));
                    if(nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)){
                        var itr = 2;
                        while((nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)) && itr<=20){
                            nxtGrpArr = Array.from(container.querySelectorAll('[data-tabindex^="group'+(groupNo+itr)+'-"]'));
                            itr++;
                        }
                        if(nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)){
                            if(  param && param.container ){
                                nxtGrpArr = getNextContainerArr( );
                                multiGrpSorted = true;
                                if( !nxtGrpArr || nxtGrpArr.length == 0 ){
                                    return;
                                }
                            }
                        }
                    }
                    bool2 = findAndFocusFirstValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted );
                    if( bool2 == 'true' && param && param.container ){
                        nxtGrpArr = getNextContainerArr( );
                        multiGrpSorted = true;
                        if( !nxtGrpArr || nxtGrpArr.length == 0 ){
                            return;
                        }
                        findAndFocusFirstValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted );
                    }
                } 
            }
        }
        else if(e.key=='Tab' && e.shiftKey ){
            var currentActiveElement=document.activeElement, prevElementNfe=currentActiveElement.getAttribute('lyte-bfocus-name'),
            prevElementTabind=currentActiveElement.getAttribute('data-tabindex'),
            focusAfter = currentActiveElement.getAttribute('lyte-focus-after');

            var elemWithBfe;
            if( prevElementNfe ){
                elemWithBfe = container.querySelector('[lyte-focus-name='+prevElementNfe+']');
            }

            if(prevElementNfe!=null &&  elemWithBfe != null && isValid( elemWithBfe ) ){
                var ret = focusAndCheckForCallbacks( param, elemWithBfe, 'bfocus-name', e );
                if( ret === false ){
                    return;
                }
            }
            else if(prevElementTabind!=null && prevElementTabind!=undefined && prevElementTabind.includes('group')){
                var bool = true;

                var groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
                groupNo=Number.parseInt( groupNo.split('-')[0]);
                var grpArr=container.querySelectorAll('[data-tabindex^="group'+groupNo+'-"]');
                grpArr=Array.from(grpArr);
                if(grpArr.length == 0){
                    return;
                }
                grpArr.sort(sortFn);

                var curInd=grpArr.indexOf( currentActiveElement );
                            
                if(curInd>0){
                    var instInd = curInd - 1;
                    var Elem = grpArr[instInd];
                    while(Elem && !isValid(Elem)){
                        Elem = grpArr[instInd];
                        instInd -= 1;
                    }

                    if(Elem && isValid(Elem)){
                        var ret = focusAndCheckForCallbacks( param, Elem, 'data-tabindex', e );
                        if( ret === false ){
                            return;
                        }
                        bool = false;
                    }
                }
                    
                if( bool ){
                    var bool2 = 'true';
                    var multiGrpSorted = false;
                    var nxtGrpArr = Array.from(container.querySelectorAll('[data-tabindex^="group'+(groupNo-1)+'-"]'));
                    if(nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)){
                        var itr = 2;
                        while((nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)) && itr<=20 && (groupNo-itr)>=0){
                            nxtGrpArr = Array.from(container.querySelectorAll('[data-tabindex^="group'+(groupNo-itr)+'-"]'));
                            itr++;
                        }
                        if(nxtGrpArr.length == 0 || !isOneElemValidInGrp(nxtGrpArr)){
                            if( param && param.container ){
                                nxtGrpArr = getPrevContainerArr( );
                                multiGrpSorted = true;
                                if( !nxtGrpArr || nxtGrpArr.length == 0 ){
                                    return;
                                }
                            }
                        }
                    }
                    bool2 = findAndFocusLastValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted );

                    if( bool2 == 'true' && param && param.container ){
                        nxtGrpArr = getPrevContainerArr( );
                        multiGrpSorted = true;
                        if( !nxtGrpArr || nxtGrpArr.length == 0 ){
                            return;
                        }
                        findAndFocusLastValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted );
                    }
                }
            }
            else if( focusAfter ){
                var contArr=focusAfter.split(',');
                var grpNo = Number.parseInt(contArr[0]);
                var nxtGrpArr = Array.from(document.querySelectorAll('[data-tabindex^="group'+grpNo+'-"]'));
                if(nxtGrpArr.length == 0){
                    return;
                }
                nxtGrpArr.sort(sortFn);
                var instInd = nxtGrpArr.length - 1;
                var Elem = nxtGrpArr[instInd];
                while(Elem && !isValid(Elem)){
                        Elem = nxtGrpArr[instInd];
                        instInd -= 1;
                }

                if( Elem && isValid(Elem)){
                    var ret = focusAndCheckForCallbacks( param, Elem, 'focus-after', e );
                    if( ret === false ){
                        return;
                    }
                }
            }
        }
    }

    $L.focusStack = function(param, eSim ){

        if( param == "destroy" ){
            document.removeEventListener('keydown', boundedListener);
            focArr = [];
            registered = false;
            return;
        } 

        if( param && param.callType === 'script' ){
            keydownHandler( param, eSim );
        }

        if( registered ){
            return;
        }

        boundedListener = keydownHandler.bind(this,param);
        registered = true;

        document.addEventListener('keydown', boundedListener );
    }

    function checkLoopNext(){
        var currentActiveElement=document.activeElement;

        var groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
        groupNo=Number.parseInt( groupNo.split('-')[0]);
        var grpArr=document.querySelectorAll('[data-tabindex^="group'+groupNo+'-"]');
        grpArr=Array.from(grpArr);
        var curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
        var nextDomElement=grpArr[grpArr.indexOf(currentActiveElement)+1];
        if(nextDomElement==null) { 
            return false;
        }
        if( groupNo==Number.parseInt((nextDomElement.getAttribute('data-tabindex').split('group')[1]).split('-')[0])&& Number.parseInt(nextDomElement.getAttribute('data-tabindex').split('-')[1])<curInd){
            return true;
        }
        return false;

    }

    function checkLoopPrev(){
        var currentActiveElement=document.activeElement;

        var groupNo= (currentActiveElement.getAttribute('data-tabindex').split('group')[1]);
        groupNo=Number.parseInt( groupNo.split('-')[0]);
        var grpArr=document.querySelectorAll('[data-tabindex^="group'+groupNo+'-"]');
        grpArr=Array.from(grpArr);
        var curInd=Number.parseInt(currentActiveElement.getAttribute('data-tabindex').split('-')[1]);
        var prevDomElement=grpArr[grpArr.indexOf(currentActiveElement)-1];
        if(prevDomElement==null) {return false;}
        if( groupNo==Number.parseInt((prevDomElement.getAttribute('data-tabindex').split('group')[1]).split('-')[0])&& Number.parseInt(prevDomElement.getAttribute('data-tabindex').split('-')[1])>curInd){
            return true;
        }
        return false;
    }

    function changeFocus(groupNo, e, param){
        var currentActiveElement = document.activeElement;

        focArr.forEach(function(ele){
            if(ele.getAttribute('lyte-focus-after')){
                    var contArr=ele.getAttribute('lyte-focus-after').split(',');
                    if(contArr.includes(groupNo.toString()) && isValid(ele)){
                        var ret = focusAndCheckForCallbacks( param, ele, 'focus-after', e );
                        if( ret === false ){
                            return;
                        }
                    }
            }
        });
    }

    function isOneElemValidInGrp( grpArr ){
        for(var i=0;i<grpArr.length;i++){
            if( isValid(grpArr[i]) ){
                return true;
            }
        }

        return false;
    }
    
    function sortFn( a, b ){
        var curIndA=getInd(a);
        var curIndB=getInd(b);

        if(curIndA != -1 && curIndB != -1){
            if(curIndA<curIndB) {
                return -1;
            }
            if(curIndA>curIndB){ 
                return 1;
            }
        }
        return 0;
    }

    function multiGrpSortFn( a, b ){
        var groupA = getGroupNum( a );
        var groupB = getGroupNum( b );

        if( groupA != groupB ){
            return groupA - groupB;
        }
        else{
            var curIndA=getInd(a);
            var curIndB=getInd(b);

            if(curIndA != -1 && curIndB != -1){
                if(curIndA<curIndB) {
                    return -1;
                }
                if(curIndA>curIndB){ 
                    return 1;
                }
            }
            return 0;
        }
    }

    function getInd( elem ){
        var curInd = -1,e;      
        
        if( elem ){
            e =  elem.getAttribute('data-tabindex') ;
            if( e ){
                curInd = Number.parseInt( e.split('-')[1] ) ;
            }
        }
        
        return isNaN( curInd ) ? -1 : curInd ;
    }

    function isValid( Elem ){
        return $L(Elem).is(":visible")
             && !Elem.disabled 
                && Elem.tabIndex > -1;

    }

    function checkIsCallback ( elem ){
        if( elem && elem.getAttribute( 'lyte-is-callback' ) === 'false' ){
            return false;
        }

        return true;
    }

    function focusAndCheckForCallbacks( param, elem, typeOfChange, e ){
        var currentActiveElement = document.activeElement;

        if( param && param.onBeforeChange && checkIsCallback( currentActiveElement )  ){
            var ret = param.onBeforeChange( elem, typeOfChange, e );
            if( ret === false ){
                return false;
            }
        }
        
        if( e && e.preventDefault ){
            e.preventDefault();
        }

        if( elem && elem.focus ){
            elem.focus();
        }

        //this is to mimic the default behaviour of input elements by the browser
            //(i.e) to select the contents inside that input
        if( elem.nodeName === 'INPUT' ){
            var lInp = $L(elem).closest('lyte-input')[0];
            if( lInp ){
                var type = lInp.getData('ltPropType');
                if( type !== 'date' && type !== 'time' && type !== 'datetime' ){
                    elem.select();
                }
            }
            else{
                elem.select();
            }
        }

        if( param && param.onAfterChange && checkIsCallback( currentActiveElement ) ) {
            param.onAfterChange( elem, typeOfChange, e );
        }

        return true;
    }

    function getNextContainerArr( ){
        var curContainer = $L(document.activeElement).closest( '[data-focus-container]' )[0];
        var curContainerVal = curContainer ? curContainer.getAttribute( 'data-focus-container' ) : null;
        var nextContainer = document.querySelector('[data-focus-container="' + (parseInt(curContainerVal) + 1) + '"]');
        if( !nextContainer ){
            return;
        }
        var nxtGrpArr = Array.from(nextContainer.querySelectorAll('[data-tabindex]'));

        if( nxtGrpArr.length == 0 ){
            var i = 2;
            while( nxtGrpArr.length == 0 && i<=20 ){
                nextContainer = document.querySelector('[data-focus-container="' + (parseInt(curContainerVal) + i) + '"]');
                if( !nextContainer ){
                    continue;
                }
                nxtGrpArr = Array.from(nextContainer.querySelectorAll('[data-tabindex]'));
                i++;
            }
        }

        nxtGrpArr.sort( multiGrpSortFn );
        return nxtGrpArr;
    }

    function getPrevContainerArr( ){
        var curContainer = $L(document.activeElement).closest( '[data-focus-container]' )[0];
        var curContainerVal = curContainer ? curContainer.getAttribute( 'data-focus-container' ) : null;
        var prevContainer = document.querySelector('[data-focus-container="' + (parseInt(curContainerVal) - 1) + '"]');
        if( !prevContainer ){
            return;
        }
        var nxtGrpArr = Array.from(prevContainer.querySelectorAll('[data-tabindex]'));

        if( nxtGrpArr.length == 0 ){
            var i = 2;
            while( nxtGrpArr.length == 0 && i<=20 ){
                prevContainer = document.querySelector('[data-focus-container="' + (parseInt(curContainerVal) - i) + '"]');
                if( !prevContainer ){
                    continue;
                }
                nxtGrpArr = Array.from(prevContainer.querySelectorAll('[data-tabindex]'));
                i++;
            }
        }

        nxtGrpArr.sort( multiGrpSortFn );
        return nxtGrpArr;
    }

    function getGroupNum( elem ){
        var groupNo= (elem.getAttribute('data-tabindex').split('group')[1]);
        groupNo=Number.parseInt( groupNo.split('-')[0]);
        return groupNo;
    }

    function findAndFocusFirstValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted ){
        var bool2;

        if( !multiGrpSorted ){
            nxtGrpArr.sort(sortFn);
        }

        var instInd = 0;
        var Elem = nxtGrpArr[instInd];
        while(Elem && !isValid(Elem)){
                Elem = nxtGrpArr[instInd];
                instInd += 1;
        }
        if( Elem && isValid(Elem)){
            var ret = focusAndCheckForCallbacks( param, Elem, 'data-tabindex', e );
            if( ret === false ){
                return 'retfalse';
            }
            bool2 = 'false';
        }
        else if(checkLoopNext()){
            if( e.preventDefault ){
                e.preventDefault();
            }
        }

        return bool2 || 'true';
    }

    function findAndFocusLastValidElemInAGrp( nxtGrpArr, param, e, multiGrpSorted ){
        var bool2;

        if( !multiGrpSorted ){
            nxtGrpArr.sort(sortFn);
        }

        var instInd = nxtGrpArr.length - 1;
        var Elem = nxtGrpArr[instInd];
        while(Elem && !isValid(Elem)){
                Elem = nxtGrpArr[instInd];
                instInd -= 1;
        }
        if( Elem && isValid(Elem)){
            var ret = focusAndCheckForCallbacks( param, Elem, 'data-tabindex', e );
            if( ret === false ){
                return 'retfalse';
            }
            bool2 = 'false';
        }
        else if(checkLoopNext()){
            if( e.preventDefault ){
                e.preventDefault();
            }
        }

        return bool2 || 'true';
    }

  }

  } )();  
