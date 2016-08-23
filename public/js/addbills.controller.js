var abakusControllers = angular.module('addBillsControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('AddBillCtrl', ['$scope', 'Client', 'Admin', function($scope, Client, Admin) {
	$scope.newBill = {};
	// create a function to refresh the list when needed
	function refresh() {
		Client.getList(function(result) {
			// prepare some var
			$scope.listClients = result;
			$scope.listBills = [];
			$scope.listEstimates = [];

			result.map(function(item) {
				// console.log(item.bills);
				// store list of bills for easy use inside html
				item.bills.map(function(bill) {
					// console.log(bill);
					// add customer name to result to avoid some tricky manipulations inside html
					bill.clientName = item.name
					bill.clientId = item._id;
					$scope.listBills.push(bill);
				});
				// same with estimates
				item.quotations.map(function(estimate) {
					// console.log(estimate);
					estimate.clientName = item.name
					estimate.clientId = item._id;
					$scope.listEstimates.push(estimate);
				});
			});
			console.log("Clients :");
			console.log($scope.listClients);
			console.log("Factures :");
			console.log($scope.listBills);
			console.log("Devis :");
			console.log($scope.listEstimates);
		});
		Admin.getAdmin(function(result) {
			$scope.adminfromdb = result[0];
			console.log($scope.adminfromdb);

		});
	}

	// need to use refresh() at first list loading
	refresh();

	// define the base order when list appear
	$scope.order = "createdAt";
	$scope.direction = "reverse";

	$scope.calcAmount = function(){
		// console.log("it changes !");
		var quantity = $scope.newBill.article.quantity;
		var unitPrice = $scope.newBill.article.unitPrice;
		$scope.newBill.article.amount = quantity * unitPrice;

		// console.log(unitPrice);
		// console.log(quantity);
		// console.log($scope.newBill.article.amount);
	};
}]);