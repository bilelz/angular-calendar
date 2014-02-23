
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
        jQuery: 'libs/jquery/jquery',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        angular : 'libs/angular/angular',
        moment : 'libs/momentjs/moment',
        ngAnimate : 'libs/angular-animate/angular-animate',
        project : 'project'
    },
  shim: {
    'jQuery': {'exports' : 'jQuery'},
    'angular' : {'exports' : 'angular'},    
    'bootstrap': { deps:['jQuery']}
  }
});


require(['jQuery', 'angular',  'moment', 'bootstrap' , 'project'] , function ($,  angular, moment) {
  $(function () { // using jQuery because it will run this even if DOM load already happened
  	//console.log("require");
    angular.bootstrap(document , ['angular-calendar']);
    $('.navbar a').click(function() {
		$(".bs-navbar-collapse").collapse('hide')
	});
  });
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
  		return (content == undefined)?undefined: $('<div/>').html(content).find("img:first").attr("src");
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
  });
  
});
var agendaID = '1fion5g1t61ltvj1pd0dv6vqek';
agendaID = "u825pd9kqiahvdqljsk29rass4";
/* agenda de test */
// agendaID = 'u825pd9kqiahvdqljsk29rass4'; 
var $scope;
/*
var app = angular.module('angular-calendar', []).config(function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.
      when('/', {controller:ListController, templateUrl:'html/list.html'}).
      when('/detail/:eventId', {controller:DetailController, templateUrl:'html/detail.html'}).
      when('/add', {controller:AddController, templateUrl:'html/add.html'}).
      when('/calendar', {controller:CalendarController, templateUrl:'html/calendar.html'}).
      otherwise({redirectTo:'angular-calendar/'});
  }).filter('momentfromnow', function() {
    return function(dateString, formatIn) {
        return moment(dateString, formatIn).fromNow();
        //2013-04-26T17:00:00.000+02:00
    };
  }).filter('momentcalendar', function() {
    return function(dateString, formatIn) {
        return moment(dateString, formatIn).calendar();
        //2013-04-26T17:00:00.000+02:00
    };
  }).filter('getId', function() {
    return function(url) {
        return url.split("/")[url.split("/").length - 1]
    };
  }).filter('breakline', function() {
    return function(html) {    	
        return (html != undefined)?html.replace(/\n/gi,'<br/>'):undefined;
    };
  });
*/
// Création du controller
function ListController($scope, $location, $http) {

	
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
			//$location.path('/rss/'+$scope.keyword);
		}).
  error(function(data, status, headers, config) {
    alert("error http get!");
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
		}).
  error(function(data, status, headers, config) {
    alert("error http get!");
  });
	};
	
	$scope.search();
	
}

function AddController(){}

function CalendarController($scope,$location, $routeParams, $http){
	$scope.agendaID = agendaID;
}

