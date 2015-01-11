define(['angular','app'], function(angular, app)
{
	var agendaID = '1fion5g1t61ltvj1pd0dv6vqek';
	agendaID = "u825pd9kqiahvdqljsk29rass4@group.calendar.google.com";
	
	var clientKey = 'AIzaSyA3dweFJyhbf-mJ3mxXqFCFnKRNb9idvJ8';
	
	
	
    app.controller(
        'ListController', ['$scope', '$location', '$http', 'caldevServices' , 'Page', '$timeout','viewSlideIndex',
        function($scope, $location, $http, caldevServices, Page, $timeout, viewSlideIndex) {
            removeClass(document.getElementById("nav-a"), "active");
			removeClass(document.getElementById("nav-c"), "active");
			showLoader();
			scrollTop();
			
				
			if (viewSlideIndex.getViewIndex() == "detail") {
				$scope.uidirection = 'right';
			} else if (viewSlideIndex.getViewIndex() == "add") {
				$scope.uidirection = 'right';
			} else if (viewSlideIndex.getViewIndex() == "calendar") {
				$scope.uidirection = 'right';
			} else {
				$scope.uidirection = 'zoom';
			}
			document.querySelector('[ng-view]').className = "page scroll ng-scope " +$scope.uidirection;
			viewSlideIndex.setViewIndex("list");
			

			Page.setTitle("CalDev.io - Agenda 4 developers & others...");
			caldevServices.list(agendaID).then(function(data) {
													$scope.calendar = data;
													setTimeout(lazyLoadImage, 10);
													hideLoader();
												});
			
        }]
    );
    
    app.controller('DetailController', ['$scope', '$location','$routeParams', '$http', 'caldevServices' ,'Page','viewSlideIndex',
    	function($scope,$location, $routeParams, $http, caldevServices, Page, viewSlideIndex) {
		$scope.pageClass = 'page-detail';
		document.getElementById("bigTitle").style.height = window.innerHeight + "px";
		
			if (viewSlideIndex.getViewIndex() == "detail") {
				$scope.uidirection = 'right';
			} else if (viewSlideIndex.getViewIndex() == "add") {
				$scope.uidirection = 'right';
			} else if (viewSlideIndex.getViewIndex() == "calendar") {
				$scope.uidirection = 'right';
			} else if (viewSlideIndex.getViewIndex() == "list") {
				$scope.uidirection = 'left';
			} else {
				$scope.uidirection = 'zoom';
			}
		document.querySelector('[ng-view]').className = "page scroll ng-scope " +$scope.uidirection;
		viewSlideIndex.setViewIndex("detail");
		
			removeClass(document.getElementById("nav-a"), "active");
			removeClass(document.getElementById("nav-c"), "active");
			showLoader();
			scrollTop();
			
			caldevServices.get(agendaID, $routeParams.eventId).then(function(data) {
													$scope.entry = data;
													Page.setTitle(data.summary + " - CalDev.io");
													setTimeout(lazyLoadImage, 10);
													hideLoader();
												});		
											
			/* parallax effect */									
			window.onscroll = function() { 
				var doc = document.documentElement;
				var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
				var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
				var windowHeight = document.documentElement.clientHeight || window.innerHeight;
			
				var windowBottom = windowTop + windowHeight;
	
				var el = document.getElementById("bigPicture");
				var imgBottom = getPosition(el).top+windowHeight;
				
				el.style.backgroundPosition = "center "+ (1.05*(imgBottom - windowBottom))+"px";
				
			 };
			
			
		}]
		
		 
	);

	app.controller('AddController', ['$scope', '$location','$routeParams', '$http', 'caldevServices' ,'Page','viewSlideIndex',
		function ($scope, $http, $location, $routeParams, caldevServices, Page, viewSlideIndex){



		if (viewSlideIndex.getViewIndex() == "detail") {
				$scope.uidirection = 'left';
			} else if (viewSlideIndex.getViewIndex() == "list") {
				$scope.uidirection = 'left';
			} else if (viewSlideIndex.getViewIndex() == "calendar") {
				$scope.uidirection = 'right';
			} else {
				$scope.uidirection = 'zoom';
			}
		
		document.querySelector('[ng-view]').className = "page scroll ng-scope " +$scope.uidirection;

		viewSlideIndex.setViewIndex("add");
	    scrollTop();
		$scope.pageClass = 'page-add';

		addClass(document.getElementById("nav-a"), "active");
		removeClass(document.getElementById("nav-c"), "active");
		
		Page.setTitle("Submit an event - CalDev.io");
	
			
		$scope.mailSend = false;
		$scope.mailSendError = false;
		
		$scope.event = {title:"",
							date: moment().format("YYYY-MM-DD"),
							hour:"18:00",
							hourend:"20:30",
							dateend: moment().add('days', 1).format("YYYY-MM-DD"),
							adress: "",
							description: "",
							mail:""};
		
		/* datepicker fallback */
		var elem = document.createElement('input');
	    elem.setAttribute('type', 'date');
	 
      	if ( elem.type === 'text' ) {
      		require(['jqueryui'], function(){
      			$("head").append('<link href="/js/libs/jquery-ui/themes/smoothness/jquery-ui.min.css" rel="stylesheet" />');
				$('.date').datepicker( { dateFormat:  "dd/mm/yy", changeMonth: true }); 
				$("#date").val(moment().format("DD/MM/YYYY"));
				$("#dateend").val(moment().add('days', 1).format("DD/MM/YYYY"));
			}); 	
      	}
      	/* end : datepicker fallback*/
      	
		
		$scope.eventForm = $scope.event ;	
		
		$scope.hours = [];
        for(var i=0;i<=23;i++){
        	$scope.hours.push({label: ((i<10)?("0"+i):i)+":00",value:  ((i<10)?("0"+i):i)+":00"}, {label:  ((i<10)?("0"+i):i)+":30",value:  ((i<10)?("0"+i):i)+":30"});
        }
        
       
		
		$scope.dateChange = function(e) {
	      console.log($scope.event.hour);
	    };				
	    
		$scope.addEvent = function(e, $http) {
			console.log(e);
			
			if ($scope.myFormNg.$valid) {
		      var date = moment(e.date+e.hour, "YYYY-MM-DDHH:mm").format("YYYYMMDDTHHmmss");
		      var dateend = moment(e.dateend+e.hourend, "YYYY-MM-DDHH:mm").format("YYYYMMDDTHHmmss");
		      
		      var urladd = "js/misc/add.php?title="+escape(e.title)+"&date="+date+"&dateend="+dateend+"&adress="+escape(e.adress)
		      					+"&description="+escape(e.description)+"&mail="+e.mail+"&mailcc="+e.mailcc;
		      
		      caldevServices.add(urladd)
		      				.then(function(data) {
		      					scrollTop();
		      					
						      if(data.status == "OK"){
						      	$scope.mailSend = true;
						      	$scope.mailSendError = false;
						      	$scope.mailResponseTxt = data.response;
						      	window.scrollTo(0,0);
						      }else{
						      	$scope.mailSendError = true;
						      	$scope.mailSend = false;
						      	$scope.mailResponseTxt = data.response;
						      }
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
			  /*var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);*/
			  
			   var input =  document.getElementById('adress');
			   var types = document.getElementById('type-selector');
			
			  var autocomplete = new google.maps.places.Autocomplete(input);
			  /*autocomplete.bindTo('bounds', map);*/
			
			  /*var infowindow = new google.maps.InfoWindow();
			  var marker = new google.maps.Marker({
			    map: map
			  });*/
			  
			  input.placeholder = "";
			   
			   google.maps.event.addListener(autocomplete, 'place_changed', function() {
			    var place = autocomplete.getPlace();
			    if (!place.geometry) {
			      return;
			    }
			    /*
			    infowindow.close();
			    document.getElementById('map-canvas').style.height = "150px";
			    marker.setVisible(false);
			    
			
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
			    */
				
			    $scope.myFormNg.adress = document.getElementById('adress').value;
			    $scope.event.adress = document.getElementById('adress').value;
		
			  });
			});	
			
			 
	
	
		}]
	);

	app.controller('CalendarController', ['$scope', '$location', '$routeParams', '$http', '$sce' ,'Page','viewSlideIndex',
		function ($scope,$location, $routeParams, $http, $sce, Page, viewSlideIndex){
			scrollTop();
			
			if (viewSlideIndex.getViewIndex() == "detail") {
				$scope.uidirection = 'left';
			} else if (viewSlideIndex.getViewIndex() == "add") {
				$scope.uidirection = 'left';
			} else if (viewSlideIndex.getViewIndex() == "list") {
				$scope.uidirection = 'left';
			} else {
				$scope.uidirection = 'zoom';
			}
			document.querySelector('[ng-view]').className = "page scroll ng-scope " +$scope.uidirection;
			viewSlideIndex.setViewIndex("calendar");
			removeClass(document.getElementById("nav-a"), "active");
			addClass(document.getElementById("nav-c"), "active");
			
			$scope.agendaUrl = $sce.trustAsResourceUrl("https://www.google.com/calendar/embed?showNav=0&height=600&wkst=1&bgcolor=%23FFFFFF"
							+"&src="+agendaID+"&color=%232F6309&ctz=Europe%2FParis");
		}]
	);
		
    
});