var token = ["BTuser1", "BTuser2", "BTuser3"];

mainApp.config(function ($provide) {
	$provide.decorator("$httpBackend", function($delegate) {
		var proxy = function (method, url, data, callback, headers) {
			var interceptor = function () {
				if ((url !== "login.html" && url !== "/auth") && (!headers.auth || token.indexOf(headers.auth) == -1)) {
					console.log("requested url=" +url);
					console.log("headers.auth=" + headers.auth + " token=" + token.indexOf(headers.auth));
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
		if (user.login == "test01" && user.passwd == "pass1") {
			return [200, {token: token[0]}, {}];
		}
		if (user.login == "test02" && user.passwd == "pass2") {
			return [200, {token: token[1]}, {}];
		}
		if (user.login == "test03" && user.passwd == "pass3") {
			return [200, {token: token[2]}, {}];
		}

		return [401, {}, {}];
	});

	$httpBackend.whenGET("/data").respond(function(method, url, data, headers, params) {
		var data = [{
			id: "00000000-11111111-22222222",
			balance: 1234,
			currency: "USD"
		},
		{
			id: "00000000-11111111-33333333",
			balance: 57689,
			currency: "HUF"
		}];
		return [200, data, {}];
	});
});
