require(['angular', 'app', 'controllers'], function(angular, app) {
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
	    $routeProvider.
	      when('/', {controller:'ListController', templateUrl:'html/list.html'}).
	      when('/:eventLabel/:eventId', {controller:'DetailController', templateUrl:'html/detail.html'}).
	      when('/a', {controller:'AddController', templateUrl:'html/add.html'}).
	      when('/c', {controller:'CalendarController', templateUrl:'html/calendar.html'}).
	      otherwise({redirectTo:'/'});
	}]);
});