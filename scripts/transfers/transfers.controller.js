mainApp.controller("transfersController", function ($scope, $http, $location) {
	$scope.transfer = {};
	$scope.confirm = false;
	$scope.step = 0;

	$scope.init = function() {
		$http.get("/data").then(function(response) {
			if (!!response.data && !!response.data.accounts) {
				$scope.accounts = response.data.accounts;
				for (var i=0; i<$scope.accounts.length; i++) {
					$scope.accounts[i].composite = $scope.accounts[i].id + "<strong class='text-right balance'>" + $scope.accounts[i].balance + " " + $scope.accounts[i].currency + "</strong>";
				}
			}
		});
	}
	$scope.init();

	$scope.reset = function() {
		$scope.step = 0;
		$scope.transfer = {};

		$scope.tForm.$setPristine();
		$scope.tForm.$setUntouched();
		angular.element("#transfers .progress-bar").css("width", "0");
	};

	$scope.confirmTransfer = function() {
	};

	$scope.cancelTransfer = function() {
		$location.path("/home");
	};

	$scope.resetAmount = function() {
		$scope.transfer.amount = 0;
	};

	$scope.adjustProgressbar = function(resetAmount) {
		var position = 0;
		if (!!resetAmount) {
			$scope.transfer.amount = null;
			angular.element("input.currency").focus();
		} else {	
			if (!!$scope.transfer.selectedAccount && !!$scope.transfer.amount) {
				position = Math.round($scope.transfer.amount / $scope.transfer.selectedAccount.balance * 100);
				if (position > 100) {
					position = 100;
				}
			}
		}
		$scope.transfer.percentage = position;
		angular.element("#transfers .progress-bar").css("width", position+"%");
	};
});
