'use strict'

angular
    .module("birthPost")
    .component("birthPost", {
        templateUrl: 'js/birth-post/birth-post.template.html',
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Post Controller initialized");

            $scope.$parent.vLimit = 3;
            var baseURL = '/api/v1/spain-births';

            var refresh = function() {
                $http
                    .get(baseURL + '?limit=' + $scope.$parent.vLimit)
                    .then(function(response) {
                        $scope.$parent.births = response.data;
                        $scope.$parent.myValue = false;
                    });
            };


            $scope.addBirth = function() {
                console.log("Inserting birth...");
                console.log($scope.$parent.newBirth);
                $http
                    .post(baseURL, $scope.$parent.newBirth)
                    .then(function(response) {
                        $scope.$parent.myValue = false;
                        refresh();

                    }, function(response) {
                        if (response.status != 201) {
                            $scope.$parent.myValue = true;
                            $scope.$parent.error = response.status + " " + response.statusText;
                        }
                    });
            };

        }]
    });
