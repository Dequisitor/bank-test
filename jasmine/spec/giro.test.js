describe("giro directive", function () {
	var $scope, testForm;

	beforeEach(module("mainApp"));

	beforeEach(inject(function($compile, $rootScope) {
		$scope = $rootScope;
		$scope.model = {
			selectedAccount: {
				id: "10000001-00000000-00000017",
				currency: "USD",
				balance: 5000,
				history: []
			},
			account: null
		};
		var element = angular.element(
				"<form name='testForm'>"+
				"<input type='text' data-ng-model-options='{allowInvalid: true}' giro='model.selectedAccount' name='destination' data-ng-model='model.account' />" +
				"</form>"
				);

		$compile(element)($scope);
		testForm = $scope.testForm;
	}));

	describe("giro", function() {
		it("giro valid test (16)", function() {
			testForm.destination.$setViewValue("1160000627355121");
			$scope.$digest();
			expect($scope.model.account).toEqual("11600006 - 27355121");
			expect(testForm.destination.$valid).toBe(true);
		});
		it("giro valid test (24)", function() {
			testForm.destination.$setViewValue("116000060000000027355121");
			$scope.$digest();
			expect($scope.model.account).toEqual("11600006 - 00000000 - 27355121");
			expect(testForm.destination.$valid).toBe(true);
		});
		it("should separate values with ' - '", function() {
			testForm.destination.$setViewValue("1234567890");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);
		});
		it("should remove everything that is not a number", function() {
			testForm.destination.$setViewValue("123456asd7890asd");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);
		});
		it("parse input with dashes", function() {
			testForm.destination.$setViewValue("12345678 - 90");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);
		});
		it("test giro number validity", function() {
			testForm.destination.$setViewValue("123456789012345678901234");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			testForm.destination.$setViewValue("123456789012345678901234");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
		});
		it("test src/dest diff", function() {
			testForm.destination.$setViewValue("10000001-00000000-00000017");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.source).toBe(true);
		});
		it("test src/dest diff (16)", function() {
			$scope.model.selectedAccount.id = "10000001-00000024";
			testForm.destination.$setViewValue("10000001-00000024");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.source).toBe(true);
		});
	});

});
