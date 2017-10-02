var myApp = angular.module("PopulationListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

	var refresh = function (){
		$http.get('../../../api/v1/population-growth?apikey="read"').success(function (population){
			console.log('Data received successfully');
			$scope.populationlist = population;
		});
	}

	refresh();

	$scope.addPopulation = function(){
		console.log("Inserting population ...");
		$http.post('../../../api/v1/population-growth?apikey="write"',$scope.contact);
		refresh();
	}

	$scope.deletePopulation = function(region,year){
		console.log("Deleting population with "+region+""+year);
		$http.delete('../../../api/v1/population-growth?apikey=write'+region+"/"+year+'?apikey="write"');
		refresh();
	}

}]);