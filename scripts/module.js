/*
 * module registration file
 * here we declare all dependecies and init our main module
 */

"use strict";
var mainApp = angular.module("mainApp", ["ngSanitize", "ngRoute", "ngAnimate", "mgcrea.ngStrap", "ngMockE2E"]);

mainApp.run(function($rootScope, $location, $window, AuthService) {

	///check if we have the bearer token (client side thinks he is logged in)
	///otherwise send back to login screen
	/// + added functionality to process transitions between ng-view screens
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		var reqLogin = next.requireLogin;
		if (reqLogin && !$window.sessionStorage.token) {
			event.preventDefault();
			$rootScope.$evalAsync(function() {
				$location.path("/login");
			});
		}

		///decide where to slide content
		var sequence = ["/login", "/home", "/transfers", "/history"];
		//if page has been reloaded, there is no current
		//if logging in, there is no current.$$route
		var currentIndex = !!current && !!current.$$route ? sequence.indexOf(current.$$route.originalPath) : -1;
		//if logging in, there is no next.$$route
		var nextIndex = !!next.$$route ? sequence.indexOf(next.$$route.originalPath) : 5; //login
		if (currentIndex > nextIndex) {
			angular.element("#main-view").removeClass("slide-left").addClass("slide-right");
		}
		if (currentIndex < nextIndex) {
			angular.element("#main-view").removeClass("slide-right").addClass("slide-left");
		}
	});

	///we had the bearer token, but the backend did not recognize it
	///send back to login page, emit logout message
	$rootScope.$on("$routeChangeError", function (event) {
		console.log(event);
		AuthService.logout();
		$rootScope.$evalAsync(function () {
			$location.path("/login");
		});
	});
});
