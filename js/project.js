define(function (require) {
  'use strict';

  var angular = require('angular');
  var moment = require('moment');
  //var services = require('./services/services');
  //var controllers = require('./controllers/controllers');
  //var directives = require('./directives/directives');

  var app = angular.module('angular-calendar', ['calendarFilters']).config(function($locationProvider, $routeProvider) {
	    $locationProvider.html5Mode(true);
	    $routeProvider.
	      when('/', {controller:ListController, templateUrl:'html/list.html'}).
	      when('/:eventLabel/:eventId', {controller:DetailController, templateUrl:'html/detail.html'}).
	      when('/+', {controller:AddController, templateUrl:'html/add.html'}).
	      when('/calendar', {controller:CalendarController, templateUrl:'html/calendar.html'}).
	      otherwise({redirectTo:'angular-calendar/'});
	  });

  app.init = function () {
      angular.bootstrap(document, ['angular-calendar']);
      
      window.onscroll = function() { lazyLoadImage(); };
      document.getElementById("top").onclick = function(){scrollTo(0); return false;};
  };
  
  



  angular.module('calendarFilters', [])
  	.filter('momentfromnow', function() {
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
        return (url == undefined)?undefined:url.split("/")[url.split("/").length - 1];
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
  	};
  }).filter('text2AlphaNum', function(){
  	return function(title){
  		if(title == undefined){ return undefined;}
  		else if(title.replace(/ /ig,"_").replace(/[^a-zA-Z_\-0-9]+/g,'')!= ""){
  			return title.replace(/ /ig,"_").replace(/[^a-zA-Z_\-0-9]+/g,'');
  		}else{
  			return "event";
  		}
  	};
  }).filter('getUrl', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:location.href;
  	};
  }).filter('getUrlEncode', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:encodeURIComponent(location.href);
  	};
  }).filter('encode', function(){
  	return function(entry){
  		return (entry == undefined)?undefined:encodeURIComponent(entry);
  	};
  }).filter('getTwitterName', function(){
  	//http://www.simonwhatley.co.uk/examples/twitter/prototype/
  	return function(entry){
  		if(entry != undefined && entry.match(/[@]+[A-Za-z0-9-_]+/g) != null){
  			var username = entry.match(/[@]+[A-Za-z0-9-_]+/g)[0].replace("@","");
  			return '<a href="https://twitter.com/'+username
  					+'" class="btn btn-default twitter-btn" target="_blank"><i class="icon-twitter"></i> @'+username+'</a>';
  		}
  		

  	};
  });


  return app;
});



var agendaID = '1fion5g1t61ltvj1pd0dv6vqek';
agendaID = "u825pd9kqiahvdqljsk29rass4";
/* agenda de test */
// agendaID = 'u825pd9kqiahvdqljsk29rass4'; 
var $scope;

// Création du controller
function ListController($scope, $location, $http) {

	$scope.trees=[];
    $scope.baseHref = "";

	var todayISO = moment().format("YYYY-MM-DD");
	
	var url = 'https://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/full?callback=JSON_CALLBACK&alt=json&orderby=starttime&sortorder=ascending&start-min=' + todayISO;

	//url ="js/cal.json"

	$scope.keyword = "http://feeds.feedburner.com/bilelz";
	$scope.nbPost = 5;
	$scope.searchLog = "Search";
	$scope.searchClass = "primary";
	$scope.calendar = [];
	
	$scope.search = function() {
		//console.log("searching...");
		$scope.log = "searching...";
		$http.jsonp(url).success(function(data) {
			$scope.calendar = data.feed;
			//console.log("searching done!");
			$scope.log = "";
			
			setTimeout(lazyLoadImage, 0);
			
		}).error(function(data, status, headers, config) {
	    			alert("searching... failed!");
	  });
		
		
	};
	
	$scope.search();
	
}



// Création du controller
function DetailController($scope,$location, $routeParams, $http) {
	
	var url = 'http://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/full/'+$routeParams.eventId+'?alt=json&callback=JSON_CALLBACK';
	$scope.entry = [];
	
	$scope.search = function() {
		//console.log("searching...");
		$scope.log = "searching...";
		$http.jsonp(url).success(function(data) {
			$scope.entry = data.entry;
			//console.log("searching done!");
			$scope.log = "";
			setTimeout(lazyLoadImage, 0);
		}).
  error(function(data, status, headers, config) {
    alert("error http get!");
  });
	};
	
	$scope.search();
	
}

function AddController($scope){
	$scope.today = new Date().toISOString().substring(0, 10);
	var tomorrowTime = new Date().getTime() + 24 * 60 * 60 * 1000;
	$scope.tomorrow  = new Date(tomorrowTime).toISOString().substring(0, 10);
}

function CalendarController($scope,$location, $routeParams, $http){
	$scope.agendaID = agendaID;
}

