var abakusControllers = angular.module('proControllers', []);

// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('ProListCtrl', ['$scope', 'Client', function($scope, Client){

	// create a function to refresh the list when needed
	function refresh() {
		Client.getList(function(result){
			// prepare some var
			$scope.listClients = result;
			$scope.listBills = [];
			$scope.listEstimates = [];

			result.map(function(item){
				// console.log(item.bills);
				// store list of bills for easy use inside html
				item.bills.map(function(bill){
					// console.log(bill);
					// add customer name to result to avoid some tricky manipulations inside html
					bill.clientName = item.name
					bill.clientId = item._id;
					$scope.listBills.push(bill);
				});
				// same with estimates
				item.quotations.map(function(estimate){
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
	}

	// need to use refresh() at first list loading
	refresh();
	
	// define the base order when list appear
	$scope.order = "createdAt";
	$scope.direction = "reverse";
}]);

abakusControllers.controller('ProDetailCtrl', ['$scope', '$routeParams', 'Client', function($scope, $routeParams, Client){
	Client.getList(function(result){
		// get list of clients
		$scope.clients = result;
		// get the item that we want details thx to the id sent in the route
		$scope.whichItem = $routeParams.itemId;
		console.log($scope.clients[$scope.whichItem]);

		$scope.nextItem = parseInt($scope.whichItem) + 1;
		// get back to the begining of the loop
		if($scope.nextItem >= $scope.clients.length){
			$scope.nextItem = 0;
		}

		// go to the end of the loop
		$scope.prevItem = parseInt($scope.whichItem) - 1;
		if($scope.prevItem < 0){
			$scope.prevItem = $scope.clients.length-1;
		}
	});
}]);

abakusControllers.controller('ProAccountCtrl', ['$scope', '$routeParams','$location', 'Admin', function($scope, $routeParams, $location, Admin){
	Admin.getAdmin(function(result){
		// get first tab of the array because we have only one admin
		$scope.details = result[0];
		console.log($scope.details);

		$scope.articles = $scope.details.articles;

		$scope.colorBill = result[0].templates.bill;
		$scope.colorEstimate = result[0].templates.quotation;
		$scope.listAccounts = [];
		result[0].paymentInfo.bank.map(function(bank) {			
			$scope.listAccounts.push(bank);
			console.log($scope.listAccounts);
		});
		result[0].paymentInfo.paypal.map(function(bank) {			
			$scope.listAccounts.push(bank);
		});
	});

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
				// clean the inputs when we add a new article on the temporary array
				$scope.newBill.article.quantity = "";
				$scope.newBill.article.amount = "";
			} else {
				alert("Article incomplet");
			}

		}
	};

	$scope.removeElement = function(elem, index) {
		console.log("function removeElement");
		if (elem === 'article') {
			$scope.articles.splice(index, 1);
		}
	};

		// when we send the form
	$scope.editProfile = function(isValid) {
		if (isValid) {
			//console.log($scope.articles);

			$scope.details.articles = $scope.articles;
			
			
			$location.path('/pro/profile/infos');
			Admin.updateAdmin($scope.details, function(result){
				console.log(result);
				if(result.error_code){
					alert("Erreur lors de la modification des coordonnées, veuillez vérifier les informations entrées.");
				}
				else {
					alert("Les modifications ont bien enregistrées");
					console.log($scope.details);
				}
			});
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