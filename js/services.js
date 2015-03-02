define(['angular', 'app'], function (angular, app) {

	var clientKey = 'AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8';

	app.service('caldevServices', function($http){
	    //simply search contacts list for given id
	    //and returns the contact object if found
	    this.list = function (agendaID) {
		        var todayISO = moment().format("YYYY-MM-DDTHH:mm:ss")+"%2B00%3A00";
			
				var url = 'https://www.googleapis.com/calendar/v3/calendars/'+agendaID+'/events?key='+clientKey+'&orderBy=startTime&singleEvents=true&callback=JSON_CALLBACK&timeMin=' + todayISO;
				return $http.jsonp(url).then(function(result) {
	                            //resolve the promise as the data
	                            return result.data;
	                        }, function(error) {
						    	// error handler
							});
		};
		
		this.get = function (agendaID, id) {
			
	        var url = 'https://www.googleapis.com/calendar/v3/calendars/'+agendaID+'/events/'+id+'/?key='+clientKey+'&callback=JSON_CALLBACK';
			return $http.jsonp(url).then(function(result) {
				return result.data;
			}, function(data, status, headers, config) {
			    alert("error http get!");
			  });
		};
		
		this.add = function (url) {
		
			return $http.get(url).then(function(result) {
				return result.data;
			}, function(data, status, headers, config) {
			    alert("error http get!");
			  });
		};
	});
	
	app.service('Page', function($rootScope){
	    return {
	        setTitle: function(title){
	            $rootScope.title = title;
	        }
	    };
	});

	app.service('viewSlideIndex', function () {
	    var viewIndex;
	    return {
	        getViewIndex: function () {
	            return viewIndex;
	        },
	        setViewIndex: function (val) {
	            viewIndex = val;
	        }
	    };
	});
});


