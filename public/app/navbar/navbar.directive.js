(function() {
  'use strict';
  
  angular
    .module('app')
    .directive('navbar', navbar);
    
  function navbar() {
    return {
      templateUrl: 'app/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm'
    }
  }

  navbarController.$inject = ['$scope','$timeout','authService'];
    
  function navbarController($scope,$timeout,authService) {
    var vm = this;
    vm.auth = authService;
    if (authService.isAuthenticated()) {
    if (authService.getCachedProfile()) {
      vm.profile = setTimeout(authService.getCachedProfile(),500);
    } else {
      setTimeout(authService.getProfile(function(err, profile) {
        vm.profile = profile;
        $scope.$apply();
      }),500);
    }      
    } else {
      
      
    }    
    
  }
  
})();