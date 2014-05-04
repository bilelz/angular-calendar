
require.config({
    baseUrl: 'js',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'libs/jquery/dist/jquery.min',
        jqueryui: 'libs/jquery-ui/ui/minified/jquery-ui.min',
        //bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        async: 'libs/requirejs-plugins/src/async',
        goog: 'libs/requirejs-plugins/src/goog',
        angular : 'libs/angular/angular',
        angularroute : 'libs/angular-route/angular-route',
        angularresource: "libs/angular-resource/angular-resource",
        moment : 'libs/momentjs/moment',
        angularanimate : 'libs/angular-animate/angular-animate'//,
        //project : 'project'
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
	'filters.4',
	'services.4',
	'controllers.41',
	
	'routes'
], function(angular, app, routes, controllers) {
	'use strict';

	angular.element().ready(function(app) {
		angular.bootstrap(document, ['caldev']);
		window.onscroll = function() { lazyLoadImage(); };
      	document.getElementById("top").onclick = function(){scrollTo(0,0); return false;};
      	
      	//window.addEventListener("deviceorientation", handleOrientation, true);
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

	// nodes is an array now.
	nodes.forEach(function(el) {
		if (windowBottom > getPosition(el).top && !el.classList.contains('imgLoading') && !el.classList.contains('imgLoaded')) {
			var elTmp = el;

			var imgTmp = document.createElement("img");
			imgTmp.src = elTmp.getAttribute("data-img");
			elTmp.classList.add("imgLoading");

			imgTmp.addEventListener('load', function() {
				elTmp.style.backgroundImage = "url('" + elTmp.getAttribute("data-img") + "')";
				elTmp.classList.add("imgLoaded");
			}, false);
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
	
	//document.querySelector("#bigPicture").style.backgroundPosition = -gamma+"px 0px";
	var imgList = document.querySelectorAll("a.listBlock div.imgLoaded");
	for(var i = 0; i < imgList.length; i++) {
		            	 imgList[i].style.backgroundRepeat = "repeat-x";
		                imgList[i].style.backgroundPosition = -gamma+"px 0px";
		            }
  // Do stuff with the new orientation data
}


function showLoader(){
	document.getElementById("loader").style.display ="block";
}

function hideLoader(){
	document.getElementById("loader").style.display ="none";
}