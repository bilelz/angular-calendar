
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
        //jQuery: 'libs/jquery/jquery',
        //bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        angular : 'libs/angular/angular',
        moment : 'libs/momentjs/moment',
        ngAnimate : 'libs/angular-animate/angular-animate'//,
        //project : 'project'
    },
  shim: {
    //'jQuery': {'exports' : 'jQuery'},
    'angular' : {'exports' : 'angular'},    
    //'bootstrap': { deps:['jQuery']}
  }
});

require(['project'], function (app) {
  app.init();
});


require([/*'jQuery',*/ 'angular',  'moment', /*'bootstrap' ,*/ 'project'] , function (angular, moment) {
	
	window.onload=function(){
		angular.bootstrap(document , ['angular-calendar']);
			/* img lazy loading */
	    window.onscroll = function (event) {
	  		
	  		var doc = document.documentElement;
			var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var windowTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	  		var windowHeight= document.documentElement.clientHeight|| window.innerHeight;
	  		
	  		var windowBottom = windowTop + windowHeight;
	  		
	  		var divImg = document.querySelectorAll("[data-img]");
	  		var nodes = Array.prototype.slice.call(divImg,0); 
	
			  // nodes is an array now.
			  nodes.forEach(function(el){ 
				if( windowBottom > getPosition(el).top && !el.classList.contains('imgLoading') && !el.classList.contains('imgLoaded') ){
		        	var elTmp = el;
		        	
		        	var imgTmp =document.createElement("img");
		        	imgTmp.src = elTmp.getAttribute("data-img");
		        	elTmp.classList.add("imgLoading");
					
					imgTmp.addEventListener('load', function() { 
								elTmp.style.backgroundImage = "url('"+elTmp.getAttribute("data-img")+"')";
					   			elTmp.classList.add("imgLoaded");
						 }, false);
		        }
			
			  });
		};
	};
  /*$(function () { // using jQuery because it will run this even if DOM load already happened
  	//console.log("require");
    angular.bootstrap(document , ['angular-calendar']);
    $('.navbar a').click(function() {
		$(".bs-navbar-collapse").collapse('hide')
	});
	
	$('#top').click(function() {
		$('html, body').animate({scrollTop:0}, 'fast');
		return false;
	});
	*/
	/* img lazy loading */
    /*$(window).scroll( function(){
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        var bottom_of_object;
        $("[data-img]").each(function(){
        	bottom_of_object = ($(this).offset()).top;// + $(this).outerHeight();
        	// If the object is completely visible in the window, show it
	        if( bottom_of_window > bottom_of_object && $(this).css("backgroundImage") == "none" ){
	        	var thisDiv = $(this);
	        	$('<img/>').attr('src', $(this).attr("data-img")).load(function() {
				   $(this).remove(); // prevent memory leaks as @benweet suggested
				   thisDiv.css("backgroundImage","url('"+thisDiv.attr("data-img")+"')")
	        			.addClass("imgLoaded");
				});
	        	
	        }
        });
        
    });
    $(window).scroll();
    */
    
  /*  
	
  });*/
});


define(['angular' ] , function (angular) {
	//console.log("define");
  	return angular.module('angular-calendar', []).config(function($locationProvider, $routeProvider) {
	    //$locationProvider.hashPrefix('!');
	    $locationProvider.html5Mode(true);
	    $routeProvider.
	      when('/', {controller:ListController, templateUrl:'html/list.html'}).
	      when('/:eventLabel/:eventId', {controller:DetailController, templateUrl:'html/detail.html'}).
	      when('/+', {controller:AddController, templateUrl:'html/add.html'}).
	      when('/calendar', {controller:CalendarController, templateUrl:'html/calendar.html'}).
	      otherwise({redirectTo:'angular-calendar/'});
	  }).filter('momentfromnow', function() {
	    return function(dateString, formatIn) {
	        return (dateString == undefined)?undefined:moment(dateString, formatIn).fromNow();
	        //2013-04-26T17:00:00.000+02:00
	    };
	  }).filter('momentcalendar', function() {
	    return function(dateString, formatIn) {
	    	
    	moment.lang('en', {
		    calendar : {
		        lastDay : '[Yesterday at] LT',
		        sameDay : '[Today at] LT',
		        nextDay : '[Tomorrow at] LT',
		        lastWeek : '[last] dddd [at] LT',
		        nextWeek : 'dddd [at] LT',
		        sameElse : 'L [at] LT'
		    }
		});
        return (dateString == undefined)?undefined:moment(dateString, formatIn).calendar();
    };
  }).filter('getId', function() {
    return function(url) {
        return (url == undefined)?undefined:url.split("/")[url.split("/").length - 1]
    };
  }).filter('breakline', function() {
    return function(html) {    	
        return (html != undefined)?html.replace(/\n/gi,'<br/>'):undefined;
    };
  }).filter('getImage', function(){
  	return function(content){
  		//return (content == undefined)?undefined: $('<div/>').html(content).find("img:first").attr("src");
  		
  		if(content == undefined){
  			return undefined;
  		}
  		
  		var regex = /<img[^>]+src="([^">]+)"/i; 
    	var tmp = content.match(regex);
    	if(tmp.length>1){
    		return tmp[1];
    	}
  	}
  }).filter('text2AlphaNum', function(){
  	return function(title){
  		if(title == undefined){ return undefined;}
  		else if(title.replace(/ /ig,"_").replace(/[^a-zA-Z_\-0-9]+/g,'')!= ""){
  			return title.replace(/ /ig,"_").replace(/[^a-zA-Z_\-0-9]+/g,'')
  		}else{
  			return "event";
  		}
  	}
  }).filter('getUrl', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:location.href;
  	}
  }).filter('getUrlEncode', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:encodeURIComponent(location.href);
  	}
  }).filter('encode', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:encodeURIComponent(entry);
  	}
  }).filter('getTwitterName', function(){
  	//http://www.simonwhatley.co.uk/examples/twitter/prototype/
  	return function(entry){
  		if(entry.match(/[@]+[A-Za-z0-9-_]+/g) != null){
  			var username = entry.match(/[@]+[A-Za-z0-9-_]+/g)[0].replace("@","");
  			return '<a href="https://twitter.com/'+username+'" class="btn btn-default twitter-btn" target="_blank"><i class="icon-twitter"></i> @'+username+'</a>'
  		}
  		

  	}
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