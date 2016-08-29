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
			console.log("Clients :");
			console.log($scope.listClients);
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

	voidArrays();

	// when unit price and quantity are edited for an article
	$scope.calcAmount = function() {
		// console.log("function calcAmount");
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
		// console.log("function calculateAll");
		// calculate underTotalXvat
		let totalXvat = $scope.newBill.totalXvat;
		let refund = $scope.newBill.refund;
		if ($scope.newBill.refundCur === "%") {
			if($scope.newBill.refund != 0){
				$scope.newBill.underTotalXvat = totalXvat - (totalXvat / 100) * refund;
			} else {
				$scope.newBill.underTotalXvat = totalXvat;
			}
		} else {
			$scope.newBill.underTotalXvat = totalXvat - refund;
		}
		// $scope.newBill.underTotalXvat = $scope.newBill.totalXvat - $scope.newBill.refund;

		// calculate tva and totalTtc
		$scope.newBill.tva = ($scope.newBill.underTotalXvat / 100) * 21;
		$scope.newBill.totalTtc = ($scope.newBill.tva + $scope.newBill.underTotalXvat);

		// sum less deposit
		$scope.newBill.sum = $scope.newBill.totalTtc - $scope.newBill.deposit;

		// console.log("totalXvat :" + $scope.newBill.totalXvat);
		// console.log("refund :" + $scope.newBill.refund);
		// console.log("underTotalXvat :" + $scope.newBill.underTotalXvat);
		// console.log("tva :" + $scope.newBill.tva);
		// console.log("totalTtc :" + $scope.newBill.totalTtc);
		// console.log("deposit :" + $scope.newBill.deposit);
		// console.log("sum :" + $scope.newBill.sum);
	}

	// when articles are added to the temp list inside the form
	$scope.addElement = function(elem) {
		// console.log("function addElement");
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
		// console.log("function removeElement");
		if (elem === 'article') {
			$scope.articles.splice(index, 1);
		}
		
		// calculate the total of the list
		$scope.newBill.totalXvat -= removeAmount;

		// and the other values
		$scope.calculateAll();
	};

	// when we send the form
	$scope.addBill = function(isValid, type) {
		if (isValid) {
			let template = "public/documents/templates/";
			let folder = "public/documents/";

			if(type === 'bill'){
				template += "bills/template" + $scope.adminfromdb.templates.bill + ".hbs";
				folder += "bills/";

				// PREPARE REQUEST TO THE DB
				// =========================
				// add the new bill to the bills array of the client
				$scope.newBill.client.bills.push({
					'link': $scope.newBill.numFacture,
					'state': false,
					'quotation_id': $scope.newBill.estimate._id,
					'createdAt': $scope.newBill.dateFacture
				});
			} else {
				template += "estimates/template" + $scope.adminfromdb.templates.quotation + ".hbs";
				folder += "estimates/";

				// PREPARE REQUEST TO THE DB
				// =========================
				$scope.newBill.client.quotations.push({
					'link': $scope.newBill.numFacture,
					'state': false,
					'createdAt': $scope.newBill.dateFacture
				});
			}

			// console.log("New client to update");
			// console.log($scope.newBill.client);

			// PREPARE PDF
			// ===========
			$scope.newBill.articles = $scope.articles;
			$scope.newBill.company = $scope.adminfromdb;

			

			let newpdf = {
				"file": {
					"template": template,
					"folder": folder + $scope.newBill.client._id,
					"filename": $scope.newBill.numFacture
				},
				"data": $scope.newBill
			};

			console.log("New Pdf to send");
			console.log(newpdf);
			
			// STORE FILE AND INFORMATIONS
			// ===========================
			// Try to store the file first
			Crm.createPdf(newpdf, function(result) {
				console.log(result);
				if(result.error_code){
					alert("Erreur lors de la création de la facture, veuillez vérifier les informations entrées.");
				}
				// if the file is stored
				else {
					// store informations about this bill in the DB
					Client.updateClient($scope.newBill.client, function(result){
						console.log(result);
						if(result.error_code){
							alert("Erreur lors de la création de la facture, veuillez vérifier les informations entrées.");
						}
						else {
							alert("Le document a bien été enregistré");

							// when all is done, clear the form
							voidArrays();
						}
					});
				}
			});

			// to manage error messages in form
			$scope.error = false;
		} else {
			console.log("Invalid Submit !");
			alert("Veuillez compléter tous les champs requis.");
			$scope.error = true;
		}
	};
}]);