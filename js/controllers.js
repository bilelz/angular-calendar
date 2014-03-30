define(['angular','app'], function(angular, app)
{
	var agendaID = '1fion5g1t61ltvj1pd0dv6vqek';
	agendaID = "u825pd9kqiahvdqljsk29rass4";
    app.controller(
        'ListController', ['$scope', '$location', '$http', 'caldevServices' ,
        function($scope, $location, $http, caldevServices) {
            removeClass(document.getElementById("nav-a"), "active");
			removeClass(document.getElementById("nav-c"), "active");
		
			
			caldevServices.list(agendaID).then(function(data) {
													$scope.calendar = data.feed;
													setTimeout(lazyLoadImage, 0);
												});
			
        }]
    );
    
    app.controller('DetailController', ['$scope', '$location','$routeParams', '$http', 'caldevServices' ,
    	function($scope,$location, $routeParams, $http, caldevServices) {

			removeClass(document.getElementById("nav-a"), "active");
			removeClass(document.getElementById("nav-c"), "active");
		
		
			caldevServices.get(agendaID, $routeParams.eventId).then(function(data) {
													$scope.entry = data.entry;
													setTimeout(lazyLoadImage, 0);
												});			
		}]
	);

	app.controller('AddController', ['$scope', '$location', '$http',
		function ($scope, $http, $location){

		addClass(document.getElementById("nav-a"), "active");
		removeClass(document.getElementById("nav-c"), "active");
	
		$scope.today = new Date().toISOString().substring(0, 10);
		var tomorrowTime = new Date().getTime() + 24 * 60 * 60 * 1000;
		$scope.tomorrow  = new Date(tomorrowTime).toISOString().substring(0, 10);
		
		//$scope.newEvent = {};
		$scope.mailSend = false;
		$scope.mailSendError = false;
		
		$scope.event = {title:"TTT",
							date: ""+new Date(tomorrowTime).toISOString().substring(0, 10),
							hour:"18:00",
							hourend:"20:30",
							dateend: ""+new Date(tomorrowTime).toISOString().substring(0, 10),
							adress: "",
							description: "",
							mail:""};
							
		$scope.eventForm = $scope.event ;					
		$scope.addEvent = function(e) {
			console.log(e);
			
			if ($scope.myFormNg.$valid) {
		      console.log("valid");
		      console.log($scope);
		      var date = moment(e.date+e.hour, "YYYY-MM-DDHH:mm").format("YYYYMMDDTHHmmss");
		      
				var dateend = moment(e.dateend+e.hourend, "YYYY-MM-DDHH:mm").format("YYYYMMDDTHHmmss");
		      var url = "js/misc/add.php?title="+escape(e.title)+"&date="+date+"&dateend="+dateend+"&adress="+escape(e.adress)
		      					+"&description="+escape(e.description)+"&mail="+e.mail+"&mailcc="+e.mailcc;
		      console.log(url);
		      $http({method: 'GET', url: url}).
			    success(function(data, status, headers, config) {
			      console.log(data);
			      if(data.status == "OK"){
			      	$scope.mailSend = true;
			      	$scope.mailSendError = false;
			      	$scope.mailResponseTxt = data.response;
			      	window.scrollTo(0,0);
	
			      	//$location.url('/');
	
			      }else{
			      	$scope.mailSendError = true;
			      	$scope.mailSend = false;
			      	$scope.mailResponseTxt = data.response;
			      }
			    }).
			    error(function(data, status, headers, config) {
			      console.log(data);
			    });
		    } else {
		      console.log("NO valid");	
		      console.log(JSON.stringify(e.$error));  
		     }
		};
		
		require(['async!http://maps.google.com/maps/api/js?v=3.exp&sensor=false&&libraries=places'], function(){
				var mapOptions = {
			    center: new google.maps.LatLng(48.8588589,2.3470599),
			    zoom: 1
			  };
			  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			  
			   var input =  document.getElementById('adress');
			   var types = document.getElementById('type-selector');
			  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
			
			  var autocomplete = new google.maps.places.Autocomplete(input);
			  autocomplete.bindTo('bounds', map);
			
			  var infowindow = new google.maps.InfoWindow();
			  var marker = new google.maps.Marker({
			    map: map
			  });
			   
			   google.maps.event.addListener(autocomplete, 'place_changed', function() {
			    infowindow.close();
			    document.getElementById('map-canvas').style.height = "150px";
			    marker.setVisible(false);
			    var place = autocomplete.getPlace();
			    if (!place.geometry) {
			      return;
			    }
			
			    // If the place has a geometry, then present it on a map.
			    if (place.geometry.viewport) {
			      map.fitBounds(place.geometry.viewport);
			    } else {
			      map.setCenter(place.geometry.location);
			      map.setZoom(10);  
			    }
			    marker.setIcon(({
			      url: place.icon,
			      size: new google.maps.Size(71, 71),
			      origin: new google.maps.Point(0, 0),
			      anchor: new google.maps.Point(17, 34),
			      scaledSize: new google.maps.Size(35, 35)
			    }));
			    marker.setPosition(place.geometry.location);
			    marker.setVisible(true);
			
			    var address = '';
			    if (place.address_components) {
			      address = [
			        (place.address_components[0] && place.address_components[0].short_name || ''),
			        (place.address_components[1] && place.address_components[1].short_name || ''),
			        (place.address_components[2] && place.address_components[2].short_name || '')
			      ].join(' ');
			    }
			
			    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			    //infowindow.open(map, marker);
			    
		
			    $scope.myFormNg.adress = document.getElementById('adress').value;
			    $scope.event.adress = document.getElementById('adress').value;
		
			  });
			});	
	
	
		}]
	);

	app.controller('CalendarController', ['$scope', '$location', '$routeParams', '$http', '$sce',
		function ($scope,$location, $routeParams, $http, $sce){
			removeClass(document.getElementById("nav-a"), "active");
			addClass(document.getElementById("nav-c"), "active");
			
			$scope.agendaUrl = $sce.trustAsResourceUrl("https://www.google.com/calendar/embed?showNav=0&height=600&wkst=1&bgcolor=%23FFFFFF"
							+"&src="+agendaID+"%40group.calendar.google.com&color=%232F6309&ctz=Europe%2FParis");
		
		}]
	);
		
    
});