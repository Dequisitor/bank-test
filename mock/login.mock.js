var token = undefined;

mainApp.config(function ($provide) {
	$provide.decorator("$httpBackend", function($delegate) {
		var proxy = function (method, url, data, callback, headers) {
			var interceptor = function () {
				console.log(url);
				console.log(headers.auth);
				console.log(token);

				if (url === "index.html" && headers.auth !== token) {
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

});

