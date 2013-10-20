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
        twitter : 'http://platform.twitter.com/widgets',
        gplus : 'https://apis.google.com/js/plusone.js',
        project : 'project'
    },
  shim: {
    'angular' : {'exports' : 'angular'},
    'jQuery': {'exports' : 'jQuery'},
    'bootstrap': { deps:['jQuery']}
  }
});


require(['jQuery', 'angular', 'moment', 'bootstrap' , 'twitter', 'gplus', 'project'] , function ($,  angular, moment) {
  $(function () { // using jQuery because it will run this even if DOM load already happened
  	//console.log("require");
    angular.bootstrap(document , ['angular-calendar']);
  });
});


define(['angular' ] , function (angular) {
	//console.log("define");
  	return angular.module('angular-calendar', []).config(function($locationProvider, $routeProvider) {
	    //$locationProvider.hashPrefix('!');
	    $locationProvider.html5Mode(true);
	    $routeProvider.
	      when('/', {controller:ListController, templateUrl:'html/list.html'}).
	      when('/d/:eventLabel/:eventId', {controller:DetailController, templateUrl:'html/detail.html'}).
	      when('/add', {controller:AddController, templateUrl:'html/add.html'}).
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
        return url.split("/")[url.split("/").length - 1]
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
  }).filter('social', function(){
  	return function(content){
  		twttr.widgets.load();
  		return (content == undefined)?undefined: 	'<a href="https://twitter.com/share" class="twitter-share-button" data-url="d/blabla/'+content.split("/")[content.split("/").length - 1]+'" data-text="ttt" data-via="bilelz" data-lang="fr">Tweeter</a>';
  	}
  });
  
  
  
  
});