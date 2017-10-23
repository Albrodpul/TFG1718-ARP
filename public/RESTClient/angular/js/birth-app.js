angular.module("BirthApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
       templateUrl : "list.html",
       controller : "BirthListCtrl"
    })
    .when("/births/:region/:year",{
       templateUrl : "edit.html",
       controller : "BirthEditCtrl"
    });
    console.log("App initialized");    
});
