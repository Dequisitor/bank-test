var token = ["BTuser1", "BTuser2", "BTuser3", "BTuser4"];

mainApp.config(function ($provide) {
	$provide.decorator("$httpBackend", function($delegate) {
		var proxy = function (method, url, data, callback, headers) {
			var interceptor = function () {
				if ((url !== "login.html" && url !== "/auth") && (!headers.auth || token.indexOf(headers.auth) == -1)) {
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
			user = user.login;
			return [200, {token: token[0]}, {}];
		}
		if (user.login == "test02" && user.passwd == "pass2") {
			user = user.login;
			return [200, {token: token[1]}, {}];
		}
		if (user.login == "test03" && user.passwd == "pass3") {
			user = user.login;
			return [200, {token: token[2]}, {}];
		}
		if (user.login == "test04" && user.passwd == "pass4") {
			user = user.login;
			return [200, {token: token[3]}, {}];
		}

		return [401, {}, {}];
	});

	$httpBackend.whenGET("/data").respond(function(method, url, data, headers, params) {
		var data = [];
		data.push({
				accounts: [{
				id: "00000000-11111111-22222222",
				balance: 1234,
				currency: "USD",
				history: [
					{
						date: "1288322633006",
						other: "12345678-12345678-12345678",
						amount: 2000,
						type: "income"
					},
					{
						date: "1288833623836",
						other: "12345678-00000000-12345678",
						amount: 1234,
						type: "expense"
					},
					{
						date: "1298322625006",
						other: "12345678-00000000-12345678",
						amount: 52,
						type: "expense"
					},
					{
						date: "1288323624006",
						other: "12345678-33333333-12345678",
						amount: 39,
						type: "expense"
					},
					{
						date: "1288343621006",
						other: "12345678-55555555-12345678",
						amount: 210,
						type: "expense"
					},
					{
						date: "1288323623406",
						other: "12345678-12345678-12345678",
						amount: 2000,
						type: "income"
					},
					{
						date: "1288423623206",
						other: "12345678-33333333-12345678",
						amount: 899,
						type: "expense"
					},
					{
						date: "1288523623106",
						other: "12345678-55555555-12345678",
						amount: 599,
						type: "expense"
					},
				]
			},
			{
				id: "00000000-11111111-33333333",
				balance: 57689,
				currency: "HUF"
			}]
		});

		data.push({});
		data.push({
			accounts: []
		});
		data.push({
			accounts: [{
				id: "11111111-99999999-44444444",
				balance: 3500,
				currency: "SEK",
				history: []
			}]
		});
		var index = token.indexOf(headers.auth);
		
		return [200, data[index], {}];
	});
});
