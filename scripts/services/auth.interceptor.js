mainApp.factory("authInterceptor", function($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.header || {};
			if (!!$window.sessionStorage.token) {
				config.headers.auth = $window.sessionStorage.token;
			}
			return config;
		},
		response: function (response) {
			return response;
		}
	}
});

mainApp.config(function ($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
});
