angular.module("mainApp")
.config(["$routeProvider", "$locationProvider",
		function ($routeProvider, $locationProvider) {
			$routeProvider
			.when("/login", {
				templateUrl: "login.html",
				controller: "loginController"
			})
			.when("/index", {
				templateUrl: "index.html",
				controller: "indexController"
			})
			.otherwise({
				redirectTo: "login.html"
			});

			//$locationProvider.html5Mode(true);
		}
]);
