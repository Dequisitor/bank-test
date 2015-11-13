mainApp.controller("homeController", function($scope, $http, dataService) {

	//get user accounts from service
	$scope.init = function() {
		dataService.getData(function(data) {
			$scope.accounts = data.accounts;
		});
	}
	$scope.init();

});
