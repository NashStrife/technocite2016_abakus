var abakusControllers = angular.module('addBillsControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('AddBillCtrl', ['$scope', 'Client', 'Admin', 'Param', function($scope, Client, Admin, Param) {

	// function to clean all informations when needed
	function voidArrays() {
		$scope.newBill = {};
		$scope.newBill.article = {};
		$scope.newBill.article.quantity = 0;
		$scope.newBill.totalXvat = 0;
		$scope.newBill.underTotalXvat = 0;
		$scope.newBill.tva = 0;
		$scope.newBill.totalTtc = 0;
		$scope.newBill.deposit = 0;
		$scope.newBill.sum = 0;
		$scope.articles = [];
	}

	// create a function to get informations from DB when needed
	function getFromDb() {
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
					bill.clientName = item.name;
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
		Param.getList(function(result) {
			//console.log(result[0]);
			$scope.paramFromDb = result[0];
			console.log("parameters");
			console.log($scope.paramFromDb);
		});
		Admin.getAdmin(function(result) {
			$scope.adminfromdb = result[0];
			console.log("Admin");
			console.log($scope.adminfromdb);
			$scope.listAccounts = [];
			//console.log(result[0].paymentInfo);
			// console.log(item.bills);
			// store list of bills for easy use inside html
			result[0].paymentInfo.bank.map(function(bank) {
				$scope.listAccounts.push(bank);
				//console.log($scope.listAccounts);
			});
			result[0].paymentInfo.paypal.map(function(bank) {

				$scope.listAccounts.push(bank);
			});


		});
	}

	// need to use getFromDb() at first to get list of articles and clients
	getFromDb();

	// define the base order when list appear
	$scope.order = "createdAt";
	$scope.direction = "reverse";

	voidArrays();

	// function to calculate the amount in function of unit price and quantity
	$scope.calcAmount = function() {

		var quantity = $scope.newBill.article.quantity;
		var unitPrice = $scope.newBill.article.unitPrice;
		//when item is selected in the dropdown
		$scope.newBill.article.amount = quantity * unitPrice;

		//when the deposit is calculate
		$scope.newBill.sum = $scope.newBill.totalTtc - $scope.newBill.deposit;

		// console.log(unitPrice);
		// console.log(quantity);
		// console.log($scope.newBill.article.amount);
	};
	// add articles to the temp list inside the form
	$scope.addElement = function(elem) {
		// for the list of articles
		if (elem === 'article') {
			if ($scope.newBill.article.quantity) {
				$scope.articles.push({
					'name': $scope.newBill.article.name,
					'description': $scope.newBill.article.description,
					'quantity': $scope.newBill.article.quantity,
					'unitPrice': $scope.newBill.article.unitPrice,
					'amount': $scope.newBill.article.amount
				});
				$scope.newBill.totalXvat += $scope.newBill.article.amount;
				$scope.newBill.underTotalXvat = $scope.newBill.totalXvat;
				$scope.newBill.tva = $scope.newBill.totalXvat / 100 * 21;
				$scope.newBill.totalTtc = ($scope.newBill.tva + $scope.newBill.totalXvat);
				$scope.newBill.sum = $scope.newBill.totalTtc - $scope.newBill.deposit;
				//console.log($scope.newBill.underTotalXvat);
				//console.log($scope.newBill.totalXvat);
				//console.log($scope.articles);
				// clean the inputs when we add a new pic on the temporary array

				$scope.newBill.article.quantity = "";
				$scope.newBill.article.amount = "";
			} else {
				alert("Quantité indéfinie");
			}

		}
	};

	$scope.removeElement = function(elem, index) {
		if (elem === 'article') {
			$scope.articles.splice(index, 1);
		}
	};
	$scope.addBill = function(isValid) {
		if (isValid) {
			//console.log($scope.articles);
			$scope.newBill.articles = $scope.articles;
			$scope.newBill.company = $scope.adminfromdb;
			let infopdf = {
				"file": {
					"template" : "public/documents/templates/exemple2.hbs",
					"folder" : "public/documents/estimates/"+$scope.newBill.client._id,
					"filename": $scope.newBill.numFacture
				},
				"data": $scope.newBill
			};
			console.log(infopdf);
			//Rest.addResto($scope.newResto, $scope.types, $scope.pics, function(result) {
			//	alert(result.message);
			//	console.log(result);
			// clean the temp Arrays after sending the form for the next one
			//	voidArrays();
			//	});
			console.log($scope.newBill);
			$scope.error = false;
		} else {
			console.log("Invalid Submit !");
			alert("Please complete all required champs");
			$scope.error = true;
		}
	};
}]);