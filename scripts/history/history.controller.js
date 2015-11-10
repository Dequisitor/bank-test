mainApp.controller("historyController", function ($scope, $http, dataService) {

	$scope.init = function() {
		dataService.getData(function(data) {
			$scope.accounts = data.accounts;
		});
	}
	$scope.init();

});
