mainApp.controller("transfersController", function ($scope, $http) {
	$http.get("/data").then(function(response) {
		console.log(response);
		$scope.accounts = response.data;

		for (var i=0; i<$scope.accounts.length; i++) {
			$scope.accounts[i].composite = $scope.accounts[i].id + "<strong class='text-right balance'>" + $scope.accounts[i].balance + " " + $scope.accounts[i].currency + "</strong>";
		}
	});

	$scope.step = 3;
	$scope.amount = 100;

	$scope.adjustProgressbar = function(amount) {
		var position = 0;
		if (!!$scope.selectedAccount && !!amount) {
			position = Math.round(amount / $scope.selectedAccount.balance * 100);
		}

		console.log(position);
		angular.element("#transfers .progress-bar").css("width", position+"%");
	};
});
