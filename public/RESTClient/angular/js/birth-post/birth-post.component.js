'use strict'

angular
    .module("birthPost")
    .component("birthPost", {
        templateUrl: 'js/birth-post/birth-post.template.html',
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Post Controller initialized");

            var baseURL = '/api/v1/spain-births';

            $scope.addBirth = function(region,year,men,women,totalbirth) {
                console.log("Inserting birth...");
                var birth = '{"region":"'+region+'","year":"'+year+'","men":"'+men+'","women":"'+women+'","totalbirth":"'+totalbirth+'"}';
                $http
                    .post(baseURL, birth)
                    .then(function(response) {
                        $scope.$parent.myValue = false;
                        $scope.$parent.getAll();

                    }, function(response) {
                        if (response.status != 201) {
                            $scope.$parent.myValue = true;
                            $scope.$parent.error = response.status + " " + response.statusText;
                        }
                    });
            };

        }]
    });
