angular
    .module("birthList")
    .component("birthSearch2",{
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Search2 Controller initialized");

            $scope.$parent.vLimit = 3;
            var vLimit=3;
            var baseURL = '/api/v1/spain-births';

            $scope.search2 = function() {
                console.log("Me he activado");
            }
        }]
    }
    );
