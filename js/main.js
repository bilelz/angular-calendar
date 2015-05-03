
require.config({
    baseUrl: 'js',
    waitSeconds: 60,
    paths: {
        
        jquery: 'libs/jquery/dist/jquery.min',
        jqueryui: 'libs/jquery-ui/ui/minified/jquery-ui.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        async: 'libs/requirejs-plugins/src/async',
        goog: 'libs/requirejs-plugins/src/goog',
        angular : 'libs/angular/angular',
        angularroute : 'libs/angular-route/angular-route',
        angularresource: "libs/angular-resource/angular-resource",
        moment : 'libs/momentjs/moment',
        angularanimate : 'libs/angular-animate/angular-animate',
        uibootstrap: 'libs/angular-bootstrap/ui-bootstrap.min'
    },
  shim: {
    'jquery': {'exports' : 'jquery'},
    'angular' : {'exports' : 'angular'},  
    'angularroute': ['angular'],   
    'angularresource': ['angular'],   
    'angularanimate': ['angular'],   
    'uibootstrap': ['angular'],   
    'jqueryui': { deps:['jquery']},
    'bootstrap': { deps:['jquery']}
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
	'utils',
	'bootstrap',
	
	'routes'
], function(angular, app, routes, controllers) {
	'use strict';

	angular.element().ready(function(app) {
		angular.bootstrap(document, ['caldev']);

		window.onscroll = function() {
			animNavbar();
			lazyLoadImage();
			/*detailPageTitleEffect();*/
		}; 
		
		window.onresize = function(event) {
			if(document.getElementById("bigTitle") != undefined){
				document.getElementById("bigTitle").style.height = window.innerHeight + "px";
			}
			
			resizeBgAnimation();
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


