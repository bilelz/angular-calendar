define("app", ["angular", "angularresource", "angularroute", "angularanimate"], function(angular) {
    var app = angular.module("caldev", ["ngResource", "ngRoute", "ngAnimate", "calendarFilters"] );
    return app;
 });