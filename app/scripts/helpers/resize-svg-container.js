module.exports = function(document, window, container, padding) {

  console.log('resizing container');

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
