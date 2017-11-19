'use strict'

angular.
module('dataApp').
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when("/", {
                template: "<table-list></table-list>"
            })
            .otherwise("/");
        console.log("Data App initialized");
    }
]);
