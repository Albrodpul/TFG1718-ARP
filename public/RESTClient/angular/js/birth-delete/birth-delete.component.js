'use strict'

angular
    .module("birthDelete")
    .component("birthDelete", {
        templateUrl: 'js/birth-delete/birth-delete.template.html',
        controller: ["$scope", "$http","$route", function($scope, $http,$route) {
            console.log("Delete Item Controller initialized");

            var baseURL = '/api/v1/spain-births';


            $scope.deleteBirth = function(region, year) {
                console.log("Deleting birth with " + region + " " + year);
                $http
                    .delete(baseURL + '/' + region + '/' + year)
                    .then(function(response) {
                        $scope.$parent.myValue = false;
                        $scope.$parent.getAll();
                        $scope.$parent.newBirth = [];

                    });
            };
        }]
    });
