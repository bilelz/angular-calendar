define(['angular'], function (angular) {
	var caldevServices = angular.module('caldevServices', ['ngResource']);
	 
	caldevServices.factory('listService', function($http) {
	   return {
	        getFoos: function() {
	        	
	        	var todayISO = moment().format("YYYY-MM-DD");
		
				var url = 'https://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/full?callback=JSON_CALLBACK&alt=json&orderby=starttime&sortorder=ascending&start-min=' + todayISO;
	
	             //return the promise directly.
	             return $http.jsonp(url).success(function(data) {
							return data.feed;
						}).error(function(data, status, headers, config) {
							alert("searching... failed!");
								return null;
					    			
					  });
	        }
	   };
	});
});


