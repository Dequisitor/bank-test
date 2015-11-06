mainApp
.controller("loginController", function($scope, $http, $window, $location, authService) {
	$scope.user = {
		login: "",
		passwd: ""
	};

	$scope.authenticate = function () {
		authService.authenticate(
				$scope.user,
				function() {
					$location.path("/index");
				},
				function() {
					$scope.user.passwd = "";
					$scope.loginMessage = "Invalid user name or password";
				});
	};

	$scope.logout = function () { 
		authService.logout();
	};

});
