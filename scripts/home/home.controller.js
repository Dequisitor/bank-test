mainApp.controller("homeController", function($scope, $http) {
	$http.get("/data").then(function(response) {
		if (!!response.data) {
			$scope.accounts = response.data.accounts;
		}
	});
});
