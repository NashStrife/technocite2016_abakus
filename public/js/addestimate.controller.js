var abakusControllers = angular.module('addEstimateControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('AddEstimateCtrl', ['$scope', 'Client', 'Admin', 'Param', 'Crm', function($scope, Client, Admin, Param, Crm) {

	// function to clean all informations when needed
	function voidArrays() {
		$scope.newEstimate = {};
		$scope.newEstimate.article = {};
		$scope.newEstimate.article.quantity = 0;
		$scope.newEstimate.totalXvat = 0;
		$scope.newEstimate.underTotalXvat = 0;
		$scope.newEstimate.tva = 0;
		$scope.newEstimate.totalTtc = 0;
		$scope.newEstimate.deposit = 0;
		$scope.newEstimate.sum = 0;
		$scope.articles = [];
	}

	// create a function to get informations from DB when needed
	function getFromDb() {
		Client.getList(function(result) {
			// prepare some var
			$scope.listClients = result;

			// console.log("Clients :");
			// console.log($scope.listClients);
		});

		Param.getList(function(result) {
			//console.log(result[0]);
			$scope.paramFromDb = result[0];
			// console.log("parameters");
			// console.log($scope.paramFromDb);
		});

		Admin.getAdmin(function(result) {
			$scope.adminfromdb = result[0];
		});
	}

	// need to use getFromDb() at first to get list of articles and clients
	getFromDb();

	// define the base order when list appear

	voidArrays();

	// function to calculate the amount in function of unit price and quantity
	$scope.calcAmount = function() {

		var quantity = $scope.newEstimate.article.quantity;
		var unitPrice = $scope.newEstimate.article.unitPrice;
		let totalXvat = $scope.newEstimate.totalXvat;
		let refound = $scope.newEstimate.refound;
		if ($scope.newEstimate.refundCur === "%") {
			$scope.newEstimate.underTotalXvat -= (totalXvat / 100) * refound;
		} else {
			$scope.newEstimate.underTotalXvat -= refound;
		}
		//when item is selected in the dropdown
		$scope.newEstimate.article.amount = quantity * unitPrice;

		//when the deposit is calculate
		$scope.newEstimate.sum = $scope.newEstimate.totalTtc - $scope.newEstimate.deposit;

		// console.log(unitPrice);
		// console.log(quantity);
		// console.log($scope.newEstimate.article.amount);
	};

	
	// add articles to the temp list inside the form
	$scope.addElement = function(elem) {
		// for the list of articles
		if (elem === 'article') {
			if ($scope.newEstimate.article.quantity) {
				$scope.articles.push({
					'name': $scope.newEstimate.article.name,
					'description': $scope.newEstimate.article.description,
					'quantity': $scope.newEstimate.article.quantity,
					'unitPrice': $scope.newEstimate.article.unitPrice,
					'amount': $scope.newEstimate.article.amount
				});
				$scope.newEstimate.totalXvat += $scope.newEstimate.article.amount;
				$scope.newEstimate.tva = $scope.newEstimate.totalXvat / 100 * 21;

				$scope.newEstimate.totalTtc = ($scope.newEstimate.tva + $scope.newEstimate.totalXvat);
				$scope.newEstimate.sum = $scope.newEstimate.totalTtc - $scope.newEstimate.deposit;
				//console.log($scope.newEstimate.underTotalXvat);
				//console.log($scope.newEstimate.totalXvat);
				//console.log($scope.articles);
				// clean the inputs when we add a new pic on the temporary array

				$scope.newEstimate.article.quantity = "";
				$scope.newEstimate.article.amount = "";
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

			$scope.newEstimate.articles = $scope.articles;
			$scope.newEstimate.company = $scope.adminfromdb;
			let newpdf = {
				"file": {
					"template": "public/documents/templates/exemple2.hbs",
					"folder": "public/documents/Estimate/" + $scope.newEstimate.client._id,
					"filename": $scope.newEstimate.numFacture
				},
				"data": $scope.newEstimate
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