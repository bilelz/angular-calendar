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

