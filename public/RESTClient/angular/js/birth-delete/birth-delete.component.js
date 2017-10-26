'use strict'

angular
    .module("birthDelete")
    .component("birthDelete", {
        templateUrl: 'js/birth-delete/birth-delete.template.html',
        controller: ["$scope", "$http","$location", function($scope, $http, $location) {
            console.log("Delete Item Controller initialized");

            $scope.$parent.vLimit = 3;
            var baseURL = '/api/v1/spain-births';

            /*var refresh = function() {
                $http
                    .get(baseURL + '?limit=' + $scope.$parent.vLimit)
                    .then(function(response) {
                        console.log("Refreshing...");
                        $location.path("/");
                    });
            };*/


            $scope.deleteBirth = function(region, year) {
                console.log("Deleting birth with " + region + " " + year);
                $http
                    .delete(baseURL + '/' + region + '/' + year)
                    .then(function(response) {
                        $scope.$parent.refresh();

                    });
            };
        }]
    });
