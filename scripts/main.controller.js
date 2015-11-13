mainApp.controller("mainController", function(AuthService, $rootScope, $scope, $location, $modal) {
	$scope.isAuth = AuthService.isAuth();

	//authentication events
	$rootScope.$on("logout", function() {
		$scope.isAuth = false;
	});

	$rootScope.$on("login", function() {
		$scope.isAuth = true;
	});

	//logout confirmation modal
	$scope.logout = function() {
		$scope.modal = $modal({controller: "mainController", scope: $scope, templateUrl: "logout.html", show: true, animation: "am-fade-and-slide-top"});
	};

	$scope.logoutCancelled = function() {
		$scope.modal.$promise.then($scope.modal.hide);
	};

	//hide modal, send logout event, go to login page
	$scope.logoutConfirmed = function() {
		$scope.modal.$promise.then($scope.modal.hide);
		AuthService.logout();
		$location.path("/login");
	};
});
