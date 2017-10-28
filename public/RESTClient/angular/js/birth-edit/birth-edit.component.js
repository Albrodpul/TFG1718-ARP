      angular
          .module("birthEdit")
          .component("birthEdit", {
              templateUrl: 'js/birth-edit/birth-edit.template.html',
              controller: ["$scope", "$http", "$routeParams", "$location",
                  function($scope, $http, $routeParams, $location) {
                      console.log("Edit Controller initialized");
                      var baseURL = "/api/v1/spain-births";

                      var refresh = function() {
                          $http
                              .get(baseURL + "/" + $routeParams.region + "/" + $routeParams.year)
                              .then(function(response) {
                                  $scope.updatedBirth = {};
                                  $scope.updatedBirth.region = response.data[0].region;
                                  $scope.updatedBirth.year = response.data[0].year;
                                  $scope.updatedBirth.men = response.data[0].men;
                                  $scope.updatedBirth.women = response.data[0].women;
                                  $scope.updatedBirth.totalbirth = response.data[0].totalbirth;

                              });
                      };

                      refresh();

                      $scope.put = function(region,year,men,women,totalbirth) {
                          var birth = '{"region":"'+region+'","year":"'+year+'","men":"'+men+'","women":"'+women+'","totalbirth":"'+totalbirth+'"}';
                          $http.put(baseURL + "/" + $routeParams.region + "/" + $routeParams.year, birth)
                              .then(function(response) {
                                  $location.path("/");
                              });
                      };

                  }
              ]

          });
      