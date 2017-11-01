angular
    .module("birthSearch")
    .component("birthSearch", {
        templateUrl: 'js/birth-search/birth-search.template.html',
        controller: ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
            console.log("Search Controller initialized");

            $scope.$parent.vLimit = 3;
            $rootScope.offset = $scope.offset;
            var vLimit=3;
            var baseURL = '/api/v1/spain-births';

            $scope.search = function(region, year, limit, offset, from, to) {
                
                var vOffset = parseInt((parseInt(offset) - parseInt(1))) * parseInt($scope.$parent.vLimit);
                var vOffset2 = parseInt((parseInt(offset) - parseInt(1))) * parseInt(limit);
                //no hay búsqueda
                if (!region && !year && !limit && !offset && !from && !to) {
                    $scope.$parent.getAll();
                }
                //búsqueda de región
                else if (region != undefined && !year && !limit && !offset && !from && !to) {
                    $http.get(baseURL + '/' + region + '?limit=' + $scope.$parent.vLimit)
                        .then(function(response) {
                            successCallback(response);
                            $http.get(baseURL + '/' + region)
                                .then(successCallbackSearch);
                        }, errorCallbackSearch);
                }

                //búsqueda de región y offset
                else if (region != undefined && !limit && !year && !from && !to && offset != undefined) {
                    $http.get(baseURL + '/' + region + '?limit=' + $scope.$parent.vLimit + '&offset=' + vOffset)
                        .then(function(response) {
                            successCallback(response);
                            $http.get(baseURL + '/' + region)
                                .then(successCallbackSearch);
                        }, errorCallbackSearch);
                }
                //búsqueda de región y límite
                else if (region != undefined && limit != undefined && !year && !from && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, límite y offset
                else if (region != undefined && limit != undefined && !year && !from && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región y from
                else if (region != undefined && from != undefined && !year && !limit && !to && !offset) {
                    $http.get(baseURL + '/' + region + '?from=' + from + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from y offset
                else if (region != undefined && from != undefined && !year && !limit && !to && offset != undefined) {
                    $http.get(baseURL + '/' + region + '?from=' + from + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from y límite
                else if (region != undefined && from != undefined && !year && limit != undefined && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?from=' + from + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from, límite y offset
                else if (region != undefined && from != undefined && !year && limit != undefined && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región y to
                else if (region != undefined && to != undefined && !year && !from && !limit && !offset) {
                    $http.get(baseURL + '/' + region + '?to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, to y offset
                else if (region != undefined && to != undefined && !year && !from && !limit && offset != undefined) {
                    $http.get(baseURL + '/' + region + '?to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, to y limit
                else if (region != undefined && to != undefined && !year && !from && limit != undefined && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, to, limit y offset
                else if (region != undefined && to != undefined && !year && !from && limit != undefined && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from y to
                else if (region != undefined && from != undefined && to != undefined && !limit && !year && !offset) {
                    $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from, to y offset
                else if (region != undefined && from != undefined && to != undefined && !limit && !year && offset != undefined) {
                    $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from, to y limit
                else if (region != undefined && from != undefined && to != undefined && limit != undefined && !year && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, from, to, limit y offset
                else if (region != undefined && from != undefined && to != undefined && limit != undefined && !year && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año
                else if (year != undefined && !region && !limit && !from && !to && !offset) {
                    $http.get(baseURL + '/' + year + '?limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año y offset
                else if (year != undefined && !region && !limit && !from && !to && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año y límite
                else if (year != undefined && limit != undefined && !region && !from && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + year + '?limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, límite y offset
                else if (year != undefined && limit != undefined && !region && !from && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + year + '?limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año y from
                else if (year != undefined && from != undefined && !region && !limit && !to && !offset) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from y offset
                else if (year != undefined && from != undefined && !region && !limit && !to && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from y limit
                else if (year != undefined && from != undefined && !region && limit != undefined && !to && !offset) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from, limit y offset
                else if (year != undefined && from != undefined && !region && limit != undefined && !to && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año y to
                else if (year != undefined && to != undefined && !region && !from && !limit && !offset) {
                    $http.get(baseURL + '/' + year + '?to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, to y offset
                else if (year != undefined && to != undefined && !region && !from && !limit && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, to y limit
                else if (year != undefined && to != undefined && !region && !from && limit != undefined && !offset) {
                    $http.get(baseURL + '/' + year + '?to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, to, limit y offset
                else if (year != undefined && to != undefined && !region && !from && limit != undefined && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from y to
                else if (year != undefined && from != undefined && to != undefined && !limit && !region && !offset) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from, to y offset
                else if (year != undefined && from != undefined && to != undefined && !limit && !region && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from, to y limit
                else if (year != undefined && from != undefined && to != undefined && limit != undefined && !region && !offset) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de año, from, to, limit y offset
                else if (year != undefined && from != undefined && to != undefined && limit != undefined && !region && offset != undefined) {
                    $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región y año
                else if (region != undefined && year != undefined && !limit && !from && !to && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año y offset
                else if (region != undefined && year != undefined && !limit && !from && !to && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, límite
                else if (region != undefined && year != undefined && limit != undefined && !from && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '/' + year + '?limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, límite y offset
                else if (region != undefined && year != undefined && limit != undefined && !from && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '/' + region + '/' + year + '?limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from
                else if (region != undefined && year != undefined && !limit && from != undefined && !to && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from y offset
                else if (region != undefined && year != undefined && !limit && from != undefined && !to && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from y limit
                else if (region != undefined && year != undefined && limit != undefined && from != undefined && !to && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from, limit y offset
                else if (region != undefined && year != undefined && limit != undefined && from != undefined && !to && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, to
                else if (region != undefined && year != undefined && !limit && !from && to != undefined && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, to y offset
                else if (region != undefined && year != undefined && !limit && !from && to != undefined && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, to y limit
                else if (region != undefined && year != undefined && limit != undefined && !from && to != undefined && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, to, limit y offset
                else if (region != undefined && year != undefined && limit != undefined && !from && to != undefined && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from y to
                else if (region != undefined && year != undefined && !limit && from != undefined && to != undefined && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from, to y offset
                else if (region != undefined && year != undefined && !limit && from != undefined && to != undefined && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from, to y limit
                else if (region != undefined && year != undefined && limit != undefined && from != undefined && to != undefined && !offset) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda de región, año, from, to, limit y offset
                else if (region != undefined && year != undefined && limit != undefined && from != undefined && to != undefined && offset != undefined) {
                    $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '/' + region + '/' + year + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite
                else if (limit != undefined && !region && !year && !from && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '?limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite y offset
                else if (limit != undefined && !region && !year && !from && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '?limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite y from
                else if (limit != undefined && !region && !year && from != undefined && !to && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '?from=' + from + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite, from y offset
                else if (limit != undefined && !region && !year && from != undefined && !to && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '?from=' + from + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite y to
                else if (limit != undefined && !region && !year && !from && to != undefined && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '?to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite, to y offset
                else if (limit != undefined && !region && !year && !from && to != undefined && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '?to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite, from y to
                else if (limit != undefined && !region && !year && from != undefined && to != undefined && !offset) {
                    vLimit=limit;
                    $http.get(baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con límite, from, to y offset
                else if (limit != undefined && !region && !year && from != undefined && to != undefined && offset != undefined) {
                    vLimit=limit;
                    $http.get(baseURL + '?from=' + from + '&to=' + to + '&limit=' + limit + '&offset=' + vOffset2).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from + '&to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con from
                else if (from != undefined && !region && !year && !limit && !to && !offset) {
                    $http.get(baseURL + '?from=' + from + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con from y offset
                else if (from != undefined && !region && !year && !limit && !to && offset != undefined) {
                    $http.get(baseURL + '?from=' + from + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con to
                else if (!limit && !region && !year && !from && to != undefined && !offset) {
                    $http.get(baseURL + '?to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con to y offset
                else if (!limit && !region && !year && !from && to != undefined && offset != undefined) {
                    $http.get(baseURL + '?to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?to=' + to)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con from y to
                else if (!limit && !region && !year && from != undefined && to != undefined && !offset) {
                    $http.get(baseURL + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con from, to y offset
                else if (!limit && !region && !year && from != undefined && to != undefined && offset != undefined) {
                    $http.get(baseURL + '?from=' + from + '&to=' + to + '&limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL + '?from=' + from)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
                //búsqueda con offset
                else if (!limit && !region && !year && !from && !to && offset != undefined) {
                    $http.get(baseURL + '?limit=' + $scope.$parent.vLimit + '&offset=' + vOffset).then(function(response) {
                        successCallback(response);
                        $http.get(baseURL)
                            .then(successCallbackSearch);
                    }, errorCallbackSearch);
                }
            };

            var successCallbackSearch = function(response) {

                var offsetlist = [];
                var regionlist = [];
                var yearlist = [];
                //console.log("Límite: "+vLimit);
                var page = Math.ceil((response.data.length) / (vLimit));
                //console.log("Páginas: "+page);
                for (var i = 1; i <= page; i++) {
                    offsetlist.push(i);
                }
                for (var j = 0; j < response.data.length; j++) {
                    regionlist.push(response.data[j].region);
                    yearlist.push(response.data[j].year);
                }
                $scope.$parent.offsetlist = offsetlist;
                $scope.$parent.regionlist = regionlist;
                $scope.$parent.yearlist = yearlist;
                $scope.$parent.fromlist = yearlist;
                $scope.$parent.tolist = yearlist;
            };

            var successCallback = function(response) {
                console.log('Data received successfully');
                $scope.$parent.myValue = false;
                $scope.$parent.births = response.data;
            }
            var errorCallbackSearch = function(response, data, status, headers, config) {
                $scope.$parent.myValue = true;
                $scope.$parent.births = [];
                $scope.$parent.error = response.status + " " + response.statusText;
            };
            $scope.$on('clean', function(e) {  
                delete $scope.limit;
                delete $scope.offset;           
                delete $scope.region;
                delete $scope.year;
                delete $scope.from;
            });
        }]
    });
