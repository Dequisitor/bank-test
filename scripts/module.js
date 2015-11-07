"use strict";
var mainApp = angular.module("mainApp", ["ngRoute", "ngAnimate", "mgcrea.ngStrap", "ngMockE2E"]);

mainApp.run(function($rootScope, $location, $window, AuthService) {

	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		var reqLogin = next.requireLogin;
		if (reqLogin && !$window.sessionStorage.token) {
			event.preventDefault();
			$rootScope.$evalAsync(function() {
				$location.path("/login");
			});
			console.log("nein");
		}
	});

	$rootScope.$on("$routeChangeError", function (event) {
		AuthService.logout();
		$rootScope.$evalAsync(function () {
			$location.path("/login");
		});
	});
});
