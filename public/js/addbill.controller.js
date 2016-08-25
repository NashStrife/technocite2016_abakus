var abakusControllers = angular.module('addBillControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('AddBillCtrl', ['$scope', 'Client', 'Admin', 'Param', 'Crm', function($scope, Client, Admin, Param, Crm) {

	// function to clean all informations when needed
	function voidArrays() {
		$scope.newBill = {};
		$scope.newBill.article = {};

		// all var same value
		$scope.newBill.article.quantity =
		$scope.newBill.article.amount =
		$scope.newBill.totalXvat =
		$scope.newBill.underTotalXvat =
		$scope.newBill.refund =
		$scope.newBill.tva =
		$scope.newBill.totalTtc =
		$scope.newBill.deposit =
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

			// console.log("Clients :");
			// console.log($scope.listClients);
			// console.log("Factures :");
			// console.log($scope.listBills);
			// console.log("Devis :");
			// console.log($scope.listEstimates);

		});

		Param.getList(function(result) {
			//console.log(result[0]);
			$scope.paramFromDb = result[0];
			// console.log("parameters");
			// console.log($scope.paramFromDb);
		});

		Admin.getAdmin(function(result) {
			$scope.adminfromdb = result[0];
			// console.log("Admin");
			// console.log($scope.adminfromdb);
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

	voidArrays();

	// when unit price and quantity are edited for an article
	$scope.calcAmount = function() {
		console.log("function calcAmount");
		var quantity = $scope.newBill.article.quantity;
		var unitPrice = $scope.newBill.article.unitPrice;
		
		//when item is selected in the dropdown
		$scope.newBill.article.amount = quantity * unitPrice;
		
		// console.log(unitPrice);
		// console.log(quantity);
		// console.log($scope.newBill.article.amount);
	};

	// when an amount change in sub totals
	$scope.calculateAll = function (){
		console.log("function calculateAll");
		// when refund is edited
		let totalXvat = $scope.newBill.totalXvat;
		let refund = $scope.newBill.refund;

		if ($scope.newBill.refundCur === "%") {
			$scope.newBill.underTotalXvat -= (totalXvat / 100) * refund;
		} else {
			$scope.newBill.underTotalXvat -= refund;
		}

		//when total xvat less refund is edited
		$scope.newBill.tva = ($scope.newBill.underTotalXvat / 100) * 21;
		$scope.newBill.totalTtc = ($scope.newBill.tva + $scope.newBill.underTotalXvat);

		//when the deposit is edited
		$scope.newBill.sum = $scope.newBill.totalTtc - $scope.newBill.deposit;
	}

	// when articles are added to the temp list inside the form
	$scope.addElement = function(elem) {
		console.log("function addElement");
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
				
				// calculate the total of the list
				$scope.newBill.totalXvat += $scope.newBill.article.amount;

				// and the other values thx to the previous function
				$scope.calculateAll();

				//console.log($scope.newBill.underTotalXvat);
				//console.log($scope.newBill.totalXvat);
				//console.log($scope.articles);
				
				// clean the inputs when we add a new article on the temporary array
				$scope.newBill.article.quantity = "";
				$scope.newBill.article.amount = "";
			} else {
				alert("Article incomplet");
			}

		}
	};

	$scope.removeElement = function(elem, index, removeAmount) {
		console.log("function removeElement");
		if (elem === 'article') {
			$scope.articles.splice(index, 1);
		}
		
		// calculate the total of the list
		$scope.newBill.totalXvat -= removeAmount;

		// and the other values
		calculateAll();
	};

	// when we send the form
	$scope.addBill = function(isValid) {
		if (isValid) {
			//console.log($scope.articles);

			$scope.newBill.articles = $scope.articles;
			$scope.newBill.company = $scope.adminfromdb;
			let newpdf = {
				"file": {
					"template": "public/documents/templates/exemple2.hbs",
					"folder": "public/documents/bills/" + $scope.newBill.client._id,
					"filename": $scope.newBill.numFacture
				},
				"data": $scope.newBill
			};

			console.log("New Pdf to send");
			console.log(newpdf);

			Crm.createPdf(newpdf, function(result) {
				//alert(result.message);
				console.log(result);
				// clean the temp Arrays after sending the form for the next one
				voidArrays();
			});

			$scope.error = false;
		} else {
			console.log("Invalid Submit !");
			alert("Please complete all required champs");
			$scope.error = true;
		}
	};
}]);