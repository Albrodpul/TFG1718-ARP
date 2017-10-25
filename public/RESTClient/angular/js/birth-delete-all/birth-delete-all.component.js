'use strict'

angular
    .module("birthDeleteAll")
    .component("birthDeleteAll", {
        templateUrl: 'js/birth-delete-all/birth-delete-all.template.html',
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Delete All Controller initialized");

            $scope.$parent.vLimit = 3;
            var baseURL = '/api/v1/spain-births';

            var refresh = function() {
                $http
                    .get(baseURL + '?limit=' + $scope.$parent.vLimit)
                    .then(function(response) {
                        $scope.$parent.births = response.data;
                        $scope.$parent.myValue = false;
                        $scope.$parent.newBirth = [];
                    });
            };


            $scope.deleteAll = function() {
                console.log("Deleting births");
                $http
                    .delete(baseURL)
                    .then(function(response) {
                        refresh();

                    });
            };
        }]
    });
