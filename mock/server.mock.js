/*
 * Mock server created with angular.mock
 * - can not persist data
 * - there are 4 users with 4 bearer tokens
 * - test01 user has 2 accounts, 1 with history, and 1 without history
 * - test02 and test03 users have no accounts
 * - test04 has one account and no history
 */

var token = ["BTuser1", "BTuser2", "BTuser3", "BTuser4"];

///decorator for httpBackend
///this checks requests if they require authentication
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

///httpbackend routing
mainApp.run(function ($httpBackend) {
	//passthrough on html pages
	$httpBackend.whenGET(/\.*.html/).passThrough();

	//login functionality is handled here
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

	//data for users
	//every user recieves all their accounts and their history in one request
	$httpBackend.whenGET("/data").respond(function(method, url, data, headers, params) {
		var data = [];
		data.push({
				accounts: [{
				id: "10000001-00000000-00000017",
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
				id: "10000001-00000024",
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
