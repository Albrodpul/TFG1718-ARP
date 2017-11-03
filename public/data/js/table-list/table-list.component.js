'use strict'

angular
      .module("tableList")
      .component("tableList", {
            templateUrl: 'js/table-list/table-list.template.html',
            controller: ["$scope", "$http", function($scope, $http) {
            console.log("Data Table Controller initialized");

            var baseURL = '/api/v1/spain-births';
            $http
                .get(baseURL)
                .then(function(response) {
                    $scope.births = response.data;
                });

        }]
    });
