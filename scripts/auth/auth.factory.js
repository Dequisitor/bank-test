/*
 * factory for handling login and logout functions
 * emits states on routeScope
 */
mainApp.factory("AuthService", ["$rootScope", "$window", "$http", function($rootScope, $window, $http) {
	var authService = {};

	authService.login = function (user, success, error) {
		$http
		.post("/auth", user)
		.then(function (response) {
			$window.sessionStorage.token = response.data.token;
			$rootScope.$emit("login");
			success();
		},
		function() {
			error();
		});
	};

	authService.isAuth = function() {
		return !!$window.sessionStorage.token;
	};

	authService.logout = function () {
		$rootScope.$emit("logout");
		delete $window.sessionStorage.token;
	};

	return authService;
}]);
