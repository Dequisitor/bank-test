describe("currency directive", function() {
	var $scope, testForm;

	beforeEach(module("mainApp"));

	beforeEach(inject(function($compile, $rootScope) {
		$scope = $rootScope;
		$scope.amount = null;
		$scope.max = 2000;
		var element = angular.element(
			"<form name='testForm'>" +
			"<input type='text' name='currency' data-ng-model-options='{allowInvalid: true}' data-currency='max' data-ng-model='amount'/>" +
			"</form>"
		);
		$compile(element)($scope);
		testForm = $scope.testForm;
	}));

	describe("invalid values", function() {
		it("should not allow negative numbers", function() {
			testForm.currency.$setViewValue("-100");
			$scope.$digest();
			expect($scope.amount).toEqual("100");
			expect(testForm.currency.$valid).toBe(true);
		});
		it("should not allow non-digits", function() {
			testForm.currency.$setViewValue("asdasd");
			$scope.$digest();
			expect(testForm.currency.$valid).toBe(false);
			testForm.currency.$setViewValue("asd00asd23asd");
			$scope.$digest();
			expect($scope.amount).toEqual("23");
			testForm.currency.$setViewValue("30.1241");
			$scope.$digest();
			expect($scope.amount).toEqual("301241");
			expect(testForm.currency.$error.max).toBe(true);
		});

	});
	describe("min/max values", function() {
		it("should not allow 0", function() {
			testForm.currency.$setViewValue("0");
			$scope.$digest();
			expect($scope.amount).toEqual("0");
			expect(testForm.currency.$valid).toBe(false);
		});
		it("should not allow more than 2000", function() {
			testForm.currency.$setViewValue("2000");
			$scope.$digest();
			expect($scope.amount).toEqual("2000");
			expect(testForm.currency.$valid).toBe(true);
			testForm.currency.$setViewValue("2001");
			$scope.$digest();
			expect($scope.amount).toEqual("2001");
			expect(testForm.currency.$valid).toBe(false);
		});
	});
	describe("separation", function() {
		it("should separate thousands", function() {
			testForm.currency.$setViewValue("100");
			$scope.$digest();
			expect(testForm.currency.$viewValue).toBe("100");
			testForm.currency.$setViewValue("1000");
			$scope.$digest();
			expect(testForm.currency.$viewValue).toBe("1 000");
			testForm.currency.$setViewValue("10000");
			$scope.$digest();
			expect(testForm.currency.$viewValue).toBe("10 000");
			testForm.currency.$setViewValue("100555");
			$scope.$digest();
			expect(testForm.currency.$viewValue).toBe("100 555");
			testForm.currency.$setViewValue("1141000000213");
			$scope.$digest();
			expect(testForm.currency.$viewValue).toBe("1 141 000 000 213");
		});
	});
});
