var token = undefined;

mainApp.config(function ($provide) {
	$provide.decorator("$httpBackend", function($delegate) {
		var proxy = function (method, url, data, callback, headers) {
			var interceptor = function () {
				if (url === "home.html" && (!token || !headers.auth || headers.auth != token)) {
					console.log("headers.auth=" + headers.auth + " token=" + token);
					arguments = [401, {}, {}];
				}
				callback.apply(this, arguments);
			};
			return $delegate.call(this, method, url, data, interceptor, headers);
		};
		for (var key in $delegate) {
			proxy[key] = $delegate[key];
		}
		return proxy;
	});
});

mainApp.run(function ($httpBackend) {
	$httpBackend.whenGET(/\.*.html/).passThrough();

	$httpBackend.whenPOST("/auth").respond(function (method, url, data, headers) {
		var user = angular.fromJson(data);
		if (user.login == "test01" && user.passwd == "passwd") {
			token = "BT" + Math.round(Math.random() * 1000000);
			return [200, {token: token}, {}];
		} else {
			return [401, {}, {}];
		}
	});

	$httpBackend.whenGET(/\/data\/user\/.*/).respond(function(method, url, data, headers, params) {
		var user = url.split("/")[3];
		console.log(user);
		var data = [{
			account: "0000000-11111111-22222222",
			balance: 1234,
			currency: "USD"
		},
		{
			account: "0000000-11111111-22222222",
			balance: 57689,
			currency: "HUF"
		}];
		return [200, data, {}];
	});
});
