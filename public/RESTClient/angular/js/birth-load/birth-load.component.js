'use strict'

      angular
          .module("birthLoad")
          .component("birthLoad", {
              templateUrl: 'js/birth-load/birth-load.template.html',
              controller: ["$scope", "$http", function($scope, $http) {
                  console.log("Load Controller initialized");
                  
                  $scope.vLimit = 3;
                  var baseURL = '/api/v1/spain-births';

                  var refresh = function() {
                      $http
                          .get(baseURL + '?limit=' + $scope.vLimit)
                          .then(function(response) {
                              $scope.$parent.births = response.data;
                              $scope.$parent.myValue = false;
                          });
                  };
                  
                  
                    $scope.loadBirth = function() {
                      console.log("Loading...");
                      $http
                          .get(baseURL + "/loadInitialData")
                          .then(function(response) {
                              refresh();
                          });
                  };
              }
              ]
              });