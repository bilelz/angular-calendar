
require.config({
    baseUrl: 'js',
    paths: {
        
        jquery: 'libs/jquery/dist/jquery.min',
        jqueryui: 'libs/jquery-ui/ui/minified/jquery-ui.min',
        /*bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',*/
        async: 'libs/requirejs-plugins/src/async',
        goog: 'libs/requirejs-plugins/src/goog',
        angular : 'libs/angular/angular',
        angularroute : 'libs/angular-route/angular-route',
        angularresource: "libs/angular-resource/angular-resource",
        moment : 'libs/momentjs/moment',
        angularanimate : 'libs/angular-animate/angular-animate'
    },
  shim: {
    'jquery': {'exports' : 'jquery'},
    'angular' : {'exports' : 'angular'},  
    'angularroute': ['angular'],   
    'angularresource': ['angular'],   
    'angularanimate': ['angular'],   
    'jqueryui': { deps:['jquery']}
  },
	priority: [
		"angular"
	]
});
/*
require(['angular', 'project'], function (angular,app) {
  app.init();
});*/

require( [
	'angular',
	'angularroute',
	'angularresource',
	'angularanimate',
	'app',
	'filters',
	'services',
	'controllers',
	
	'routes'
], function(angular, app, routes, controllers) {
	'use strict';

	angular.element().ready(function(app) {
		angular.bootstrap(document, ['caldev']);
		window.onscroll = function() { lazyLoadImage(); };
		
		window.onresize = function(event) {
    		document.getElementById("bigTitle").style.height = window.innerHeight + "px";
	};
      	/*document.getElementById("top").onclick = scrollTop();
      	
      	window.addEventListener("deviceorientation", handleOrientation, true);*/
      	/*document.body.onmousemove=function(event){
      		console.log(event);
			var centerX = document.body.offsetWidth/2;
			var centerY = document.body.offsetHeight/2;
			var bgX =  (centerX - event.x)/3;
			var bgY =  (centerY - event.y)/3;
			
			var bgX =  (centerX - event.x)/3;
			var bgY =  0;
			
			console.log(bgX+"px "+bgY+"px");
			document.querySelector("#bigPicture").style.backgroundPosition = bgX+"px "+bgY+"px";
      	};*/
	});
});


function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { left: xPosition, top: yPosition };
}


function lazyLoadImage() {
	var doc = document.documentElement;
	var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	var windowHeight = document.documentElement.clientHeight || window.innerHeight;

	var windowBottom = windowTop + windowHeight;

	var divImg = document.querySelectorAll("[data-img]");
	var nodes = Array.prototype.slice.call(divImg, 0);

	nodes.forEach(function(el) {
		var elTmp = el;
		if (windowBottom > getPosition(el).top && !el.classList.contains('imgLoading') && !el.classList.contains('imgLoaded')) {
			

			var imgTmp = document.createElement("img");
			
			imgTmp.addEventListener('load', function() {
				elTmp.style.backgroundImage = "url('" + elTmp.getAttribute("data-img") + "')";
				elTmp.classList.add("imgLoaded");
			}, false);
			
			imgTmp.src = elTmp.getAttribute("data-img");
			elTmp.classList.add("imgLoading");
			
			
		}
		
		
		
	});
}


function addClass(el, className){
	if (el.classList)
	  el.classList.add(className);
	else
	  el.className += ' ' + className;
}

function removeClass(el, className){
	if (el.classList)
	  el.classList.remove(className);
	else
	  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma*3;
	
	/*document.querySelector("#bigPicture").style.backgroundPosition = -gamma+"px 0px";*/
	var imgList = document.querySelectorAll("a.listBlock div.imgLoaded");
	for(var i = 0; i < imgList.length; i++) {
		            	 imgList[i].style.backgroundRepeat = "repeat-x";
		                imgList[i].style.backgroundPosition = -gamma+"px 0px";
		            }
}


function showLoader(){
	document.getElementById("loader").style.display ="block";
}

function hideLoader(){
	document.getElementById("loader").style.display ="none";
}

var timeOut;
function scrollTop() {
	window.scrollTo(0,0);
 /* if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
    window.scrollBy(0,-50);
    timeOut=setTimeout('scrollTop()',20);
  }
  else clearTimeout(timeOut);
  */
  return false;
}

function scrollToContent(){
	var top = getPosition(document.getElementById("downinfo")).top;
	
	if (document.body.scrollTop!= top || document.documentElement.scrollTop!= top){
    window.scrollBy(0,1);
    timeOut=setTimeout('scrollToContent()',20);
  }
  else clearTimeout(timeOut);
  
  return false;

}
