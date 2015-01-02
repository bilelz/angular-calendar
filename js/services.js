define(['angular', 'app'], function (angular, app) {

/*
 var scopes = 'https://www.googleapis.com/auth/calendar'; 
 gapi.auth.authorize({client_id: "311652862723-8i9ll1d86u5h2ooth62chhgb5i8igpbf.apps.googleusercontent.com", scope: scopes, immediate: true},
      function() { console.log('loaded.'); });
 */

	app.service('caldevServices', function($http){
	    //simply search contacts list for given id
	    //and returns the contact object if found
	    this.list = function (agendaID) {
		        var todayISO = moment().format("YYYY-MM-DDTHH:mm:ss")+"%2B00%3A00";
		        //todayISO = '2014-12-27T00%3A00%3A00%2B00%3A00';
			
				var url = 'https://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/basic?callback=JSON_CALLBACK&alt=json&orderby=starttime&sortorder=ascending&start-min=' + todayISO;
				// v3
				url = 'https://www.googleapis.com/calendar/v3/calendars/u825pd9kqiahvdqljsk29rass4@group.calendar.google.com/events?key=AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8&callback=JSON_CALLBACK&timeMin=' + todayISO;
				return $http.jsonp(url).then(function(result) {
	                            //resolve the promise as the data
	                            return result.data;
	                        }, function(error) {
						    	// error handler
							});
		};
		
		this.get = function (agendaID, id) {
			
			var clientKey = 'AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8';
	        var url = 'http://www.google.com/calendar/feeds/'+agendaID+'%40group.calendar.google.com/public/basic/'+id+'?alt=json&callback=JSON_CALLBACK';
			// v3
			url = 'https://www.googleapis.com/calendar/v3/calendars/'+agendaID+'/events/'+id+'/?key='+clientKey+'&callback=JSON_CALLBACK';
			console.log(url);
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


