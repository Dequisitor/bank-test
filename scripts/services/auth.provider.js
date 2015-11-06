mainApp.service("authService", ["$rootScope", "$window", "$http", function($rootScope, $window, $http) {

	this.isAuthenticated = false;

	this.authenticate = function (user, success, error) {
		$http
			.post("/auth", user)
			.success(function (data) {
				$window.sessionStorage.token = data.token;
				this.isAuthenticated = true;
				success();
			})
			.error(function () {
				this.isAuthenticated = false;
				delete $window.sessionStorage.token;
				error();
			});
	};

	this.logout = function () {
		this.isAuthenticated = false;
		delete $window.sessionStorage.token;
	};

}]);
