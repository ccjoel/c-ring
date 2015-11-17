document.querySelector('circle').addEventListener('click',

/**
 *  Credits to Ṣhmiddty from stackoverflow for the algorithm
 * http://stackoverflow.com/questions/12847775/javascript-jquery-get-all-divs-location-at-x-y-forwarding-touches
 */
function(event){
    var x = event.pageX, y = event.pageY;
    var allElementsClicked = [];

    var circlesClicked = [];

    var element = document.elementFromPoint(x,y);
    while(element && element.tagName != "BODY" && element.tagName != "HTML"){

        if(element.nodeName === 'circle') {
          circlesClicked.push(element);
        }

        allElementsClicked.push(element);
        element.style.display = "none";       // no flickering and no infinite :)
        element = document.elementFromPoint(x,y);
    }

    for(var i = 0; i < allElementsClicked.length; i++){
        allElementsClicked[i].style.display = "";
    }
    console.log('allElementsClicked', allElementsClicked);
    console.log('circlesClicked', circlesClicked);


}


);
