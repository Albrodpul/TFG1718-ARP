(function() {
  console.log("App working");
  'use strict';
  
  angular
    .module('app')
    .directive('navbar', navbar);
    
  function navbar() {
    console.log("App working2");
    return {
      templateUrl: 'app/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm'
    }
  }

  navbarController.$inject = ['authService'];
    
  function navbarController(authService) {
    console.log("App working3");
    var vm = this;
    vm.auth = authService;
  }
  
})();