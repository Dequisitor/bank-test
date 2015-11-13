mainApp
.controller("loginController", function($scope, $http, $window, $location, AuthService) {
	$scope.user = {
		login: "",
		passwd: ""
	};

	$scope.checkLoggedIn = function() {
		if (!!$window.sessionStorage.user) {
			$location.path("/home");
		} else {
			if ($window.sessionStorage.rememberUser) {
				$scope.user.login = $window.sessionStorage.rememberUser;
				$scope.rememberMe = true;
				angular.element("#passwd").focus();
			} else {
				angular.element("#login").focus();
			}
		}
	};
	$scope.checkLoggedIn();

	///login with the help of AuthService (added rememberMe functionality)
	$scope.authenticate = function () {
		if ($scope.rememberMe) {
			$window.sessionStorage.rememberUser = $scope.user.login;
		} else {
			delete $window.sessionStorage.rememberUser;
		}

		AuthService.login(
			$scope.user,
			function() {
				$location.path("/home");
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
