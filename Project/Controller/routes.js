var app = angular.module('clientApp', ['ngRoute','ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/", {
        controller: "ClientController",
        templateUrl: "carsouel.html"
    });
   
    $routeProvider.when("/home", {
        controller: "ClientController",
        templateUrl: "carsouel.html"
    });
    $routeProvider.when("/pastevents", {
        controller: "ClientController",
        templateUrl: "pastevents.html"
    });

    $routeProvider.when("/upevents", {
        controller: "ClientController",
        templateUrl: "upevents.html"
    });
	
	$routeProvider.when("/viewDetails", {
       controller: "detailsController",
        templateUrl: "details.html" 
	});
});
