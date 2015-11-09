mainApp.directive("currency", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attr, ngModel) {
			ngModel.$formatters.push(function(value) {
				return value;
			});

			ngModel.$parsers.unshift(function(value) {
				value = parseInt(value.replace(/\s/g, ""));

				var result = "";
				var tmp = value;
				while (tmp >= 1) {
					result = ""+tmp%1000 + " " + result;
					tmp = Math.floor(tmp/1000);
				};

				result = result.replace(/\ $/, "");
				ngModel.$setViewValue(result);
				ngModel.$render();

				return value;
			});
		}
	};
});
