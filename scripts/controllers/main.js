angular.module("mainApp", ["ngRoute", "ngAnimate", "mgcrea.ngStrap"])
.controller("mainController", ["$route", "$routeParams", "$location", 
		function ($route, $routeParams, $location) {
			this.$route = $route;
			this.$routeParams = $routeParams;
			this.$location = $location;
		}
]);
