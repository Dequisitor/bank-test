mainApp.directive("currency", function() {
	return {
		restrict: "A",
		require: "ngModel",
		scope: {
			currency: "="
		},
		link: function(scope, element, attr, ngModel) {
			///parser function won`t allow non-digits
			///therefor you can`t enter decimals or characters either
			///separates thousands with a space
			ngModel.$parsers.unshift(function(value) {
				value = parseInt(value.replace(/\D/g, "")).toString();

				var result = "";
				var tmp = value;

				var step = tmp.length % 3;
				if (step == 0) {
					step = 3;
				}
				if (tmp.length > 3) {
					result = tmp.slice(0, step);
					while (step+3<=tmp.length) {
						result = result + " " + tmp.slice(step, step+3);
						step += 3;
					}
				} else {
					result = value;
				}

				ngModel.$setViewValue(result);
				ngModel.$render();

				return value;
			});

			//no 0 allowed
			ngModel.$validators.min = function(modelValue, viewValue) {
				if (!!modelValue) {
					return modelValue > 0;
				}

				return true;
			};

			//you can only send as much as you have on your account
			ngModel.$validators.max = function(modelValue, viewValue) {
				if (!!modelValue) {
					return modelValue <= scope.currency;
				}

				return true;
			};
		}
	};
});
