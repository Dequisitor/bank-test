mainApp.controller("homeController", function($scope, $http) {
	$http.get("/data").then(function(response) {
		console.log(response);
		$scope.accounts = response.data;
	});
});
