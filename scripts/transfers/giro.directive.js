mainApp.directive("giro", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, element, attr, ngModel) {
			ngModel.$parsers.push(function(value) {
				var effectiveValue = value.replace(/\D/g, "");

				if (effectiveValue.length > 16) {
					effectiveValue = effectiveValue.slice(0,16) + " - " + effectiveValue.slice(16);
				}
				if (effectiveValue.length > 8) {
					effectiveValue = effectiveValue.slice(0,8) + " - " + effectiveValue.slice(8);
				}

				ngModel.$setViewValue(effectiveValue);
				ngModel.$render();
				return effectiveValue;
			});

			ngModel.$validators.validGiro = function(modelValue, viewValue) {
				if (!!modelValue && !!viewValue) {
					var effectiveValue = modelValue.replace(/\D/g, "");

					if (effectiveValue.length == 24) {
						
					}
					return (effectiveValue.length == 24 || effectiveValue.length == 16);
				}

				return true;
			};
		}
	}
});
