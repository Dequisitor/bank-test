///angular route configuration for ng-view
mainApp
.config(["$routeProvider", "$locationProvider",
	function ($routeProvider, $locationProvider) {
		$routeProvider
		.when("/login", {
			templateUrl: "login.html",
			controller: "loginController",
			requireLogin: false
		})
		.when("/home", {
			templateUrl: "home.html",
			controller: "homeController",
			requireLogin: true
		})
		.when("/transfers", {
			templateUrl: "transfers.html",
			controller: "transfersController",
			requireLogin: true
		})
		.when("/history", {
			templateUrl: "history.html",
			controller: "historyController",
			requireLogin: true
		})
		.otherwise({
			redirectTo: "/home"
		});

		//$locationProvider.html5Mode(true);
	}
]);
