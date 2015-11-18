/**
 * Attach event so that when we click the svg element, we log all the nodes
 * including nodes underneath.
 * Credits to Ṣhmiddty from stackoverflow for the algorithm
 * for finding the rest of the elementFromPoint after click
 * http://stackoverflow.com/questions/12847775/javascript-jquery-get-all-divs-location-at-x-y-forwarding-touches
 */
module.exports = function(event){
     var x = event.pageX, y = event.pageY;
     var allElementsClicked = [];

     var element = document.elementFromPoint(x,y);
     while(element && element.tagName != "BODY" && element.tagName != "HTML"){

       if(element.nodeName === 'circle' && element.className.baseVal !== 'ring') {
         console.log('Token: ', element.className.baseVal.replace('node',''));
       }

       allElementsClicked.push(element);
       element.style.visibility = "hidden";       // no flickering and no infinite :)
       element = document.elementFromPoint(x,y);
     }

     for(var i = 0; i < allElementsClicked.length; i++){
         allElementsClicked[i].style.visibility = "visible";
     }
 }
