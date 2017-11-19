var app = angular.module("jQueryApp", []);
console.log("App initialized");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.url = "/api/v1/spain-births";
  var baseURL = "/api/v1/spain-births";

  var refresh = function() {
    $http
      .get($scope.url)
      .then(function(response) {
        $scope.statusText = response.statusText;
        $scope.datas = response.data;
        $scope.status = response.status;
        $scope.log="";
      });

  }

  $scope.get = function() {
    $scope.log="Sending request...";
    refresh();
  };

  $scope.post = function(payload) {
    console.log("Post Method");
    $http
      .post($scope.url, payload)
      .then(function(response) {
        $scope.log="Sending request...";
        refresh();
      },
      function(response) {
        if (response.status != 201) {
          $scope.statusText = response.statusText;
          $scope.datas = [];
          $scope.status = response.status;
        }
      });
  };
  
  $scope.put = function(payload){
    console.log("Put Method");
    $http
      .put($scope.url,payload)
      .then(function(response){
        $scope.log="Sending request...";
        refresh();
      },
      function(response){
        if(response.status!=200){
          $scope.statusText = response.statusText;
          $scope.datas = [];
          $scope.status = response.status;           
        }
      });
  };
  
  $scope.delete = function(){
    console.log("Delete Method");
    $http
      .delete($scope.url)
      .then(function(response){
        $scope.log="Sending request...";
        refresh();
      },function(response){
        if(response.status!=200){
          $scope.statusText = response.statusText;
          $scope.datas = [];
          $scope.status = response.status;           
        }
      });
  };
  
  $scope.load = function(){
    $http
      .get(baseURL+"/loadInitialData")
      .then(function(response){
        $scope.log="Sending request...";
        refresh();
      });
  }

}]);
