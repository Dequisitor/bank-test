mainApp.controller("mainController", function(AuthService, $rootScope, $scope, $window) {
	$scope.isAuth = AuthService.isAuth();

	$rootScope.$on("logout", function() {
		$scope.isAuth = false;
	});

	$rootScope.$on("login", function() {
		$scope.isAuth = true;
	});

	$scope.logout = function() {
		AuthService.logout();
	};
});
