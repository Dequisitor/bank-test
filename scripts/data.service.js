mainApp.service("dataService", function($http, $rootScope) {
	var data = null;
	//this.data = null; //check for different users

	this.getData = function(callback) {
		if (!data) {
			$http.get("/data").then(function(response) {
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
			});
		} else {
			callback(data);
		}
	};

	$rootScope.$on("logout", function() {
		data = null;
	});
});
