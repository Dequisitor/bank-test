"use strict";
var mainApp = angular.module("mainApp", ["ngSanitize", "ngRoute", "ngAnimate", "mgcrea.ngStrap", "ngMockE2E"]);

mainApp.run(function($rootScope, $location, $window, AuthService) {

	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		var reqLogin = next.requireLogin;
		if (reqLogin && !$window.sessionStorage.token) {
			event.preventDefault();
			$rootScope.$evalAsync(function() {
				$location.path("/login");
			});
		}
	});

	$rootScope.$on("$routeChangeError", function (event) {
		console.log(event);
		AuthService.logout();
		$rootScope.$evalAsync(function () {
			$location.path("/login");
		});
	});
});
