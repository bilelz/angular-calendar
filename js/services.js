define(['angular', 'app'], function (angular, app) {

	app.service('caldevServices', function($http){
	    //simply search contacts list for given id
	    //and returns the contact object if found
	    this.list = function (agendaID) {
	        var todayISO = moment().format("YYYY-MM-DD");
		
			var url = 'https://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/full?callback=JSON_CALLBACK&alt=json&orderby=starttime&sortorder=ascending&start-min=' + todayISO;
	
			return $http.jsonp(url).then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        }, function(error) {
    // error handler
});/*.success(function(data) {
				return data.feed;
				
				setTimeout(lazyLoadImage, 0);
				
			}).error(function(data, status, headers, config) {
		    			alert("searching... failed!");
		  	})*/;
		};
		
		this.get = function (agendaID, id) {
	        var url = 'http://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/full/'+id+'?alt=json&callback=JSON_CALLBACK';
		
			return $http.jsonp(url).then(function(result) {
				return result.data;
			}, function(data, status, headers, config) {
			    alert("error http get!");
			  });
		};
	});
});


