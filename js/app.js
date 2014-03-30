define("app", ["angular", "angularresource", "angularroute"], function(angular) {
    var app = angular.module("caldev", ["ngResource", "ngRoute", "calendarFilters"] );
    // you can do some more stuff here like calling app.factory()...
    return app;
 });