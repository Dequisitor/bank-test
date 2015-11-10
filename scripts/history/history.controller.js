mainApp.controller("historyController", function ($scope, $http) {

	$scope.init = function() {
		$http.get("/data").then(function(response) {
			if (!!response.data) {
				$scope.accounts = response.data.accounts;
			}
		});
	}
	$scope.init();

});
