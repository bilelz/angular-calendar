define(['angular', 'app', 'moment', 'momentfr'], function (angular, app, moment, momentfr) {


	app.service('caldevServices', function($http){
	    //simply search contacts list for given id
	    //and returns the contact object if found
	    this.list = function (agendaID, clientKey) {
		        var todayISO = moment().format("YYYY-MM-DDTHH:mm:ss")+"%2B00%3A00";
			
				var url = 'https://www.googleapis.com/calendar/v3/calendars/'+agendaID+'/events?key='+clientKey+'&orderBy=startTime&singleEvents=true&callback=JSON_CALLBACK&timeMin=' + todayISO;
				return $http.jsonp(url).then(function(result) {
	                            //resolve the promise as the data
	                            return result.data;
	                        }, function(error) {
						    	// error handler
							});
		};
		
		this.get = function (itemID, agendaID, clientKey) {
			
	        var url = 'https://www.googleapis.com/calendar/v3/calendars/'+agendaID+'/events/'+itemID+'/?key='+clientKey+'&callback=JSON_CALLBACK';
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
		
		
		this.addPost = function(url, dataForm) {

			return $http({
				url : url,
				method : "POST",
       			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data : dataForm
			}).then(function(result) {
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
	
	app.service('package', function($http){
	    this.get = function () {
	        var url = '../package.json';
			return $http.get(url).then(function(result) {
				return result.data;
			}, function(data, status, headers, config) {
			    alert("error when reading package.json!");
			  });
		};
	});
	
	app.service('lang', function($http){
	    this.getWords = function () {
	        var url = '../package.json';
	        	        
			return $http.get(url).then(function(result) {
				
				moment.locale('en', {
				    relativeTime : {
				        future: "in %s",
				        past:   "%s ago",
				        s:  "seconds",
				        m:  "one minute",
				        mm: "%d minutes",
				        h:  "one hour",
				        hh: "%d hours",
				        d:  "one day",
				        dd: "%d days",
				        M:  "one month",
				        MM: "%d months",
				        y:  "one year",
				        yy: "%d years"
				    }
				});
				if(result.data.lang == "fr-fr"){
					 moment.locale('fr');
				}
				
				return $http.get("/js/lang/"+result.data.lang+".json").then(function(result) {
				
				
				return result.data;
					}, function(data, status, headers, config) {
			    alert("error when reading "+"/js/lang/"+result.data.lang+".json"+"!");
			  });
			}, function(data, status, headers, config) {
			    alert("error when reading package.json!");
			  });
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


