'use strict'

      angular
          .module("birthList")
          .component("birthList", {
              templateUrl: 'js/birth-list/birth-list.template.html',
              controller: ["$scope", "$http", function($scope, $http) {
                  console.log("List Controller initialized");
                  
                  $scope.vLimit = 3;
                  var baseURL = '/api/v1/spain-births';
                  var refresh = function() {
                      console.log("Refreshing...");
                      $http
                          .get(baseURL + '?limit=' + $scope.vLimit)
                          .then(function(response) {
                              $scope.births = response.data;
                              $scope.myValue = false;
                              $scope.newBirth = [];
                              $scope.offsetslist = [1,2,3,4,5];
                              console.log($scope.offsetslist);
                          });
                  };


                  refresh();

                  $scope.getAll = function() {
                      refresh();
                  };
              }]
          });
      