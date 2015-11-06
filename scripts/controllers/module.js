var mainApp = angular.module("mainApp", ["ngRoute", "ngAnimate", "mgcrea.ngStrap", "ngMockE2E"]);

mainApp.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function (event, current, previous, objEvent) {
		console.log(event);
		//if (objEvent.authenticated == false) {
			$location.path("/login");
		//}
	});
}]);
