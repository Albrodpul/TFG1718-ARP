'use strict'

angular
    .module("birthDeleteAll")
    .component("birthDeleteAll", {
        templateUrl: 'js/birth-delete-all/birth-delete-all.template.html',
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Delete All Controller initialized");

            var baseURL = '/api/v1/spain-births';

            $scope.deleteAll = function() {
                console.log("Deleting births");
                $http
                    .delete(baseURL)
                    .then(function(response) {
                        $scope.$parent.getAll();

                    });
            };
        }]
    });
