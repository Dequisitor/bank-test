mainApp.controller("historyController", function ($scope, $http, dataService) {

	//get data from service, set defaults
	$scope.init = function() {
		$scope.sortPredicate = "date";
		$scope.reverse = false;

		dataService.getData(function(data) {
			$scope.accounts = data.accounts;
		});
	}
	$scope.init();

	//handle orderby requests
	$scope.orderBy = function(predicate) {
		$scope.reverse = ($scope.sortPredicate == predicate) ? !$scope.reverse : false;
		$scope.sortPredicate = predicate;
	};

});
