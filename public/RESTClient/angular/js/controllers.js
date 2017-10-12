var myApp = angular.module("BirthListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

$scope.vLimit=3;
$scope.url='../../../api/v1/spain-births';

	/*var refresh = function (){
		$http.get('../../../api/v1/spain-births?limit='+vLimit).success(function (births){
			console.log('Data received successfully');
			var url="../../../api/v1/spain-births";
			$scope.birthlist = births;
			$scope.myValue=false;
		});
	}*/
	
    var refresh = function() {
        $http
        .get($scope.url+'?limit='+$scope.vLimit)
           .then(function(response) {
                    $scope.birthlist = response.data;
                    $scope.myValue=false;
                }, function(response) {
                    $scope.birthlist = [];
                });
}	


	refresh();

    $scope.getAll = function() {
        refresh();
}	
	
	$scope.addBirth = function(){
		console.log("Inserting birth...");
		$http
			.post($scope.url,$scope.birth)
			.then(function(response){
				$scope.myValue=false;
				refresh();
				$scope.getAll();
			}, function(response) {
				if(response.status!=201){
					$scope.myValue=true;
					$scope.error=response.status + " " + response.statusText;
				}
			})
	}

	$scope.updateBirth = function(region,year){
		console.log("Updating birth...");
		$http
			.put($scope.url+'/'+region+'/'+year,$scope.birth)
			.then(function(response){
				$scope.myValue=false;
				refresh();
				$scope.getAll();
			}, function(response) {				
				if(response.status!=200){
					$scope.myValue=true;
					$scope.error=response.status + " " + response.statusText;
				}
			})
	}

	$scope.deleteBirth = function(region,year){
		console.log("Deleting birth with "+region+" "+year);
		$http
			.delete($scope.url+'/'+region+'/'+year)
			.then(function(response) {
				refresh();
				$scope.getAll();
			}, function(response) {
				$scope.birthlist = [];
			})				
	}
	$scope.deleteAll = function(){
		console.log("Deleting births");
		$http
			.delete($scope.url)
			.then(function(response) {
				refresh();
				$scope.getAll();
			}, function(response) {
				$scope.birthlist = [];
			})
	}
	/*$scope.loadBirth = function(){
		console.log("Loading initial list");
		$http.get('../../../api/v1/spain-births/loadInitialData').success(function(){
		refresh();
		});
	}*/
	
        $scope.loadBirth = function() {
            $http
                .get($scope.url+"/loadInitialData")
                .then(function(response) {
                    
                    refresh();
               
                })
}	
	$scope.search = function(region,year,limit,offset,from,to){
		var vOffset=parseInt((parseInt(offset)-parseInt(1)))*parseInt($scope.vLimit);
		var vOffset2=parseInt((parseInt(offset)-parseInt(1)))*parseInt(limit);
		//búsqueda de región
		if(region!=undefined && year==undefined && limit==undefined && offset==undefined && from==undefined && to==undefined){
		$http.get($scope.url+'/'+region+'?limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y offset
		else if(region!=undefined && limit==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y límite
		else if(region!=undefined && limit!=undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, límite y offset
		else if(region!=undefined && limit!=undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y from
		else if(region!=undefined && from!=undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y offset
		else if(region!=undefined && from!=undefined && year==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y límite
		else if(region!=undefined && from!=undefined && year==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, límite y offset
		else if(region!=undefined && from!=undefined && year==undefined && limit!=undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y to
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to y offset
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to y limit
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to, limit y offset
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y to
		else if(region!=undefined && from!=undefined && to!=undefined && limit==undefined && year==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to y offset
		else if(region!=undefined && from!=undefined && to!=undefined && limit==undefined && year==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to y limit
		else if(region!=undefined && from!=undefined && to!=undefined && limit!=undefined && year==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to, limit y offset
		else if(region!=undefined && from!=undefined && to!=undefined && limit!=undefined && year==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año
		else if(year!=undefined && region==undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'?limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y offset
		else if(year!=undefined && region==undefined && limit==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'?limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y límite
		else if(year!=undefined && limit!=undefined && region==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?limit='+$scope.limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, límite y offset
		else if(year!=undefined && limit!=undefined && region==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?limit='+$scope.limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y from
		else if(year!=undefined && from!=undefined && region==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y offset
		else if(year!=undefined && from!=undefined && region==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y limit
		else if(year!=undefined && from!=undefined && region==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, limit y offset
		else if(year!=undefined && from!=undefined && region==undefined && limit!=undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y to
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to y offset
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to y limit
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to, limit y offset
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y to
		else if(year!=undefined && from!=undefined && to!=undefined && limit==undefined && region==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to y offset
		else if(year!=undefined && from!=undefined && to!=undefined && limit==undefined && region==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to y limit
		else if(year!=undefined && from!=undefined && to!=undefined && limit!=undefined && region==undefined && offset==undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to, limit y offset
		else if(year!=undefined && from!=undefined && to!=undefined && limit!=undefined && region==undefined && offset!=undefined){
		$http.get($scope.url+'/'+year+'?from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y año
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, límite
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, límite y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y to
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'/'+region+'/'+year+'?from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'?limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y offset
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'?limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y from
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'?from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from y offset
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'?from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y to
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'?to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, to y offset
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'?to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from y to
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'?from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from, to y offset
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'?from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from
		else if(from!=undefined && region==undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get($scope.url+'?from='+from+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from y offset
		else if(from!=undefined && region==undefined && year==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'?from='+from+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con to
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'?to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con to y offset
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'?to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from y to
		else if(limit==undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get($scope.url+'?from='+from+'&to='+to+'&limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from, to y offset
		else if(limit==undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get($scope.url+'?from='+from+'&to='+to+'&limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con offset
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get($scope.url+'?limit='+$scope.vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//no hay búsqueda
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
			$http.get($scope.url+'?limit='+$scope.vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
	}

	var successCallbackSearch = function(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
	}
	var errorCallbackSearch=function(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
	}
}]);