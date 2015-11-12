mainApp.service("dataService", function($http, $rootScope) {
	//cache
	var data = null;

	//function moved out of getData for testing purposes
	//function: create object structure if no data recieved
	var parseData = function(response, callback) {
		data = {};
		if (!response.data || !response.data.accounts || response.data.accounts.length == 0) {
			data.accounts = null;
		} else {
			data.accounts = response.data.accounts;
			for (var i=0; i<data.accounts.length; i++) {
				if (!data.accounts[i].history || data.accounts[i].history.length==0) {
					data.accounts[i].history = null;
				}
			}
		}
		callback(data);
	};

	//load data from server
	this.getData = function(callback) {
		if (!data) {
			$http.get("/data").then(function (response) {
				parseData(response, callback)
			});
		} else {
			callback(data);
		}
	};

	//clear cache if logout
	$rootScope.$on("logout", function() {
		data = null;
	});
});
