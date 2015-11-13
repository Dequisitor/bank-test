mainApp.directive("giro", function() {
	return {
		restrict: "A",
		scope: {
			giro: "="
		},
		require: "ngModel",
		link: function (scope, element, attr, ngModel) {
			///parse input data
			///disregards everything that is not a number (decimal points too)
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

			//giro crc check
			var checkCRC = function(value) {
				var checks = [9, 7, 3, 1], crc = 0;
				for (var i=0; i<value.length-1; i++) {
					var check = checks[i%checks.length];
					crc += value[i] * check;
				}
				return (10 - (crc%10)) == value[value.length-1];
			};

			//giro validator
			ngModel.$validators.giro = function(modelValue, viewValue) {
				if (!!modelValue && !!viewValue) {
					var effectiveValue = viewValue.replace(/\D/g, "");
					var length = effectiveValue.length;
					if (length == 16 || length == 24) {
						return checkCRC(effectiveValue.slice(0, 8)) && checkCRC(effectiveValue.slice(8, length));
					}
				}

				return true;
			};

			//length validator (16 or 24)
			ngModel.$validators.length = function(modelValue, viewValue) {
				if (!!modelValue && !!viewValue) {
					var effectiveValue = viewValue.replace(/\D/g, "");
					if (effectiveValue.length != 16 && effectiveValue.length != 24) {
						return false;
					}
				}

				return true;
			};

			//source must be different from destination
			ngModel.$validators.source = function(modelValue, viewValue) {
				if (!!modelValue && !!viewValue && (viewValue.length == 30 || viewValue.length == 19)) {
					return viewValue.replace(/\s/g,"") != scope.giro.id; 
				}
				return true;
			};

		}
	}
});
