mainApp.controller("transfersController", function ($scope, $http, $location, dataService) {
	$scope.transfer = {};
	$scope.confirm = false;
	$scope.step = 0;

	///get user accounts from service
	$scope.init = function() {
		dataService.getData(function(data) {
			$scope.accounts = data.accounts;
			if (!!$scope.accounts) {
				for (var i=0; i<$scope.accounts.length; i++) {
					$scope.accounts[i].composite = $scope.accounts[i].id + "<strong class='text-right balance'>" + $scope.accounts[i].balance + " " + $scope.accounts[i].currency + "</strong>";
				}
			}
		});
	}
	$scope.init();

	//reset form
	$scope.reset = function() {
		$scope.step = 0;
		$scope.transfer = {};

		$scope.tForm.$setPristine();
		$scope.tForm.$setUntouched();
		angular.element("#transfers .progress-bar").css("width", "0");
	};

	//cancel, send back to home page
	$scope.cancelTransfer = function() {
		$location.path("/home");
	};

	//new account is selected, reset amount
	$scope.resetAmount = function() {
		$scope.transfer.amount = 0;
	};

	//change progressbar
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
