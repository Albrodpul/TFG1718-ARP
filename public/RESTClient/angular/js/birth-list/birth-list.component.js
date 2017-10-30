'use strict'

angular
      .module("birthList")
      .component("birthList", {
            templateUrl: 'js/birth-list/birth-list.template.html',
            controller: ["$scope", "$http", function($scope, $http) {
                  console.log("List Controller initialized");

                  $scope.limitlist = [3, 4, 5];

                  $scope.vLimit = 3;
                  var baseURL = '/api/v1/spain-births';
                  var refresh = function() {
                        console.log("Refreshing all data...");
                        $http
                              .get(baseURL + '?limit=' + $scope.vLimit)
                              .then(function(response) {
                                    $scope.births = response.data;
                                    $scope.myValue = false;
                                    $scope.newBirth = [];
                                    
                              });
                        $http
                              .get(baseURL)
                              .then(function(response) {
                                    var offsetlist = [];
                                    var regionlist = [];
                                    var yearlist = [];
                                    var page = Math.ceil((response.data.length) / ($scope.vLimit));
                                    for (var i = 1; i <= page; i++) {
                                          offsetlist.push(i);
                                    }
                                    for(var j = 0; j < response.data.length; j++){
                                          regionlist.push(response.data[j].region);
                                          yearlist.push(response.data[j].year);
                                    }
                                    $scope.offsetlist = offsetlist;
                                    $scope.regionlist = regionlist;
                                    $scope.yearlist = yearlist;
                                    $scope.fromlist = yearlist;
                                    $scope.tolist = yearlist;

                              });
                  };



                  refresh();

                  $scope.getAll = function() {
                        refresh();
                  };
            }]
      }
      );
