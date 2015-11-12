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
				"<input type='text' data-ng-model-options='{allowInvalid: true}' giro='model.selectedAccount' required='' name='destination' data-ng-model='model.account' />" +
				"</form>"
				);

		$compile(element)($scope);
		testForm = $scope.testForm;
	}));

	describe("giro length", function() {
		it("should not allow lengths 1ess than 16", function() {
			testForm.destination.$setViewValue("116007355121");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.length).toBe(true);
		});
		it("should not allow lengths more than 24", function() {
			testForm.destination.$setViewValue("1118902736237916007355121");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.length).toBe(true);
		});
		it("should allow length 16", function() {
			testForm.destination.$setViewValue("1160 0735 5121 1111");
			$scope.$digest();
			expect(testForm.destination.$error.length).toBe(undefined);
		});
		it("should allow length 24", function() {
			testForm.destination.$setViewValue("1160 0735 5121 1111");
			$scope.$digest();
			expect(testForm.destination.$error.length).toBe(undefined);
		});
		it("should not allow lengths between 16 and 24", function() {
			testForm.destination.$setViewValue("1160 0324 7355 21");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.length).toBe(true);
		});
	});
	describe("giro valid character input", function() {
		it("should remove everything that is not a number", function() {
			testForm.destination.$setViewValue("123456asd7890asd");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);
		});
		it("should parse input with dashes", function() {
			testForm.destination.$setViewValue("12345678 - 90");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);
		});
		it("should allow numbers starting with 0", function() {
			testForm.destination.$setViewValue("0000 1111 - 2222");
			$scope.$digest();
			expect($scope.model.account).toEqual("00001111 - 2222");
			expect(testForm.destination.$valid).toBe(false);
		});
	});
	describe("giro nubmer separaion", function() {
		it("should separate values with ' - '", function() {
			testForm.destination.$setViewValue("1234567890");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90");
			expect(testForm.destination.$valid).toBe(false);

			testForm.destination.$setViewValue("123456789012345678901234");
			$scope.$digest();
			expect($scope.model.account).toEqual("12345678 - 90123456 - 78901234");
			expect(testForm.destination.$valid).toBe(false);
		});
	});
	describe("giro validity", function() {
		it("should be valid (16)", function() {
			testForm.destination.$setViewValue("1000 0001 2000 0002");
			$scope.$digest();
			expect($scope.model.account).toEqual("10000001 - 20000002");
			expect(testForm.destination.$valid).toBe(true);
		});
		it("should be valid (24)", function() {
			testForm.destination.$setViewValue("1000 0001 2000 0002 3000 0003");
			$scope.$digest();
			expect($scope.model.account).toEqual("10000001 - 20000002 - 30000003");
			expect(testForm.destination.$valid).toBe(true);
		});
		it("should be invalid (16)", function() {
			testForm.destination.$setViewValue("1234 5678 0000 0017");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.giro).toBe(true);
		});
		it("should be invalid (24)", function() {
			testForm.destination.$setViewValue("123456789012345678901234");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.giro).toBe(true);
		});
	});
	describe("src/dest must be different", function() {
		it("should be invalid (16)", function() {
			$scope.model.selectedAccount.id = "10000001-00000024";
			testForm.destination.$setViewValue("10000001-00000024");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.source).toBe(true);
		});
		it("should be invalid (24)", function() {
			$scope.model.selectedAccount.id = "10000001-00000000-00000024";
			testForm.destination.$setViewValue("10000001-00000000-00000024");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(false);
			expect(testForm.destination.$error.source).toBe(true);
		});
		it("should be valid (16)", function() {
			$scope.model.selectedAccount.id = "10000001-00000024";
			testForm.destination.$setViewValue("10000001-00000017");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(true);
			expect(testForm.destination.$error.source).toBe(undefined);
		});
		it("should be valid (24)", function() {
			$scope.model.selectedAccount.id = "10000001-00000000-00000024";
			testForm.destination.$setViewValue("10000001-00000000-00000017");
			$scope.$digest();
			expect(testForm.destination.$valid).toBe(true);
			expect(testForm.destination.$error.source).toBe(undefined);
		});
	});

});
