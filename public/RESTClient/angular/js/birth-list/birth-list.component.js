'use strict'

angular
      .module("birthList")
      .component("birthList", {
            templateUrl: 'js/birth-list/birth-list.template.html',
            controller: ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
                  console.log("List Controller initialized");

                  $scope.limitlist = [3, 4, 5];

                  $scope.vLimit = 3;
                  var baseURL = '/api/v1/spain-births';
                  
                  /* Función que refresca los datos de la tabla iniciales */
                  var refresh = function() {
                        console.log("Refreshing all data...");
                        /* Imprime por pantalla los datos en la tabla según el límite por defecto */
                        $http
                              .get(baseURL + '?limit=' + $scope.vLimit)
                              .then(function(response) {
                                    $scope.births = response.data;
                                    $scope.myValue = false;
                                    delete $scope.newBirth;
                                    clean();
                              });
                        /* Actualiza los select según los datos que hay en la tabla completa */
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
                                    for (var j = 0; j < response.data.length; j++) {
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

                  /* Función del botón listar */
                  $scope.getAll = function() {
                        refresh();
                  };

                  /* Limpia los valores seleccionados en los select cuando refresca la página */
                  var clean = function() {
                        $scope.$broadcast('clean');
                  };

            }]
      });
