mainApp
.controller("indexController", ["$scope", "$routeParams", function($scope, $routeParams) {
	console.log("this is some high level faggotry");
	$scope.accounts = [
	{
		id: "00000000-111111111-12312312",
		amount: 103.34,
		currency: "EUR"
	},
	{
		id: "00000000-111111111-12312312",
		amount: 10003.34,
		currency: "HUF"
	},
	{
		id: "00000000-111111111-12312312",
		amount: 1003.34,
		currency: "USD"
	}];
}
]);
