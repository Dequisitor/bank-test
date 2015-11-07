mainApp
.controller("homeController", ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.accounts = [
	{
		id: "00000000-111111111-12312312",
		balance: 103.34,
		currency: "EUR"
	},
	{
		id: "00000000-111111111-12312312",
		balance: 10003.34,
		currency: "HUF"
	},
	{
		id: "00000000-111111111-12312312",
		balance: 1003.34,
		currency: "USD"
	}];
}
]);
