(function() {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['authService', '$scope'];

  function homeController(authService, $scope) {

    var vm = this;
    vm.auth = authService;
    vm.profile;
    if (authService.isAuthenticated()) {
      if (authService.getCachedProfile()) {
        vm.profile = authService.getCachedProfile();
      }
      else {
        authService.getProfile(function(err, profile) {
          vm.profile = profile;
          $scope.$apply();
        });
      }
    }
    else {


    }
  }

})();
