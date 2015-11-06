mainApp.controller("mainController", function(authService, $scope) {
	$scope.isAuth = authService.isAuthenticated;
});
