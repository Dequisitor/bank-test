mainApp
.controller("loginController", function($scope, $http, $window, $location, AuthService) {
	$scope.user = {
		login: "",
		passwd: ""
	};

	$scope.checkLoggedIn = function() {
		if (!!$window.sessionStorage.token) {
			$location.path("/index");
		}
	};
	$scope.checkLoggedIn();

	$scope.authenticate = function () {
		AuthService.login(
			$scope.user,
			function() {
				$location.path("/index");
			},
			function() {
				$scope.user.passwd = "";
				$scope.loginMessage = "Invalid user name or password";
			}
		);
	};

	$scope.logout = function () { 
		AuthService.logout();
	};

});
