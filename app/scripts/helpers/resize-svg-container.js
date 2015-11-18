/**
 * Resizes svg container a little bit, called when resizing window usually
 *
 * TODO: Clean this function and make it work better.
 *
 * @param {!Object} document pass the dom document element since its not currently in scope
 * @param {!object} window same as document. pass to use it on this scope
 * @param {!object} container dom element reference
 * @param {Number} padding amount of padding used in html/css for dom. Should get programmatically later
 *
 * @author Joel Quiles
 * @since 2015-Nov-17
 */
module.exports = function(document, window, container, padding) {

  if(!padding) { // just in case padding is not passed
    padding = 0;
  }

  var sidebar = document.querySelector('.sidebar');

  var sideBarWidth = sidebar.offsetWidth;
  var sideBarHeight = sidebar.offsetHeight;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var containerHeight = container.offsetHeight;
  var containerWidth = container.offsetrWidth;

  if(containerWidth < windowWidth - sideBarWidth - padding) {
    container.style.width = windowWidth - sideBarWidth - padding + "px";
  }

  if(containerHeight > containerWidth) {
    container.style.height = containerWidth + "px";
  }
  if(containerWidth > containerHeight) {
    container.style.width = containerHeight + "px";
  }

}
