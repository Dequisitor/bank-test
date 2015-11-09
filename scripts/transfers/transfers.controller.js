mainApp.controller("transfersController", function ($scope, $http) {
	$scope.transfer = {};

	$http.get("/data").then(function(response) {
		console.log(response);
		$scope.accounts = response.data;

		for (var i=0; i<$scope.accounts.length; i++) {
			$scope.accounts[i].composite = $scope.accounts[i].id + "<strong class='text-right balance'>" + $scope.accounts[i].balance + " " + $scope.accounts[i].currency + "</strong>";
		}
	});

	$scope.step = 0;

	$scope.adjustProgressbar = function() {
		var position = 0;
		if (!!$scope.transfer.selectedAccount && !!$scope.transfer.amount) {
			position = Math.round($scope.transfer.amount / $scope.transfer.selectedAccount.balance * 100);
			if (position > 100) {
				position = 100;
			}
		}

		console.log($scope.transfer.amount);
		$scope.transfer.percentage = position;
		angular.element("#transfers .progress-bar").css("width", position+"%");
	};
});
