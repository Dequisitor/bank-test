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
			.when("/transfer", {
				templateUrl: "transfer.html",
				controller: "transferController",
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
