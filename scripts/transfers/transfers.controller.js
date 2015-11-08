mainApp.controller("transfersController", function ($scope, $http) {
	$http.get("/data").then(function(response) {
		console.log(response);
		$scope.accounts = response.data;

		for (var i=0; i<$scope.accounts.length; i++) {
			$scope.accounts[i].composite = $scope.accounts[i].id + "<strong class='text-right balance'>" + $scope.accounts[i].balance + " " + $scope.accounts[i].currency + "</strong>";
		}
	});

	$scope.step = 3;
});
