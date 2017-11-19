angular.
module('birthApp').
config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when("/", {
        template: "<birth-list></birth-list>"
      })
      .when("/:region/:year", {
        template: "<birth-edit></birth-edit>"
      })
      .otherwise("/");
    console.log("App initialized");
  }
]);
