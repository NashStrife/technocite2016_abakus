var addClientModule = angular.module('addClientModule', []);


addClientModule.controller('addClientCtrl', ['$scope', 'Param','Client', function($scope, Param, Client) {
    $scope.showForm = false;
	$scope.splash = function(status) {
       $scope.showForm = status;
      };
    $scope.newClient = {};
    $scope.newClient.deliveryInfo = {};
    
    $scope.moreClient = function(isValid) {
        console.log($scope.newClient);
        if(isValid){
                $scope.newClient.vat.num = $scope.newClient.prevat.num + $scope.newClient.vat.num;
                $scope.newClient.contactPerson.pwd = "pass123";
                console.log($scope.newClient.vat.num);
				Client.addClient($scope.newClient, function(result){
					console.log(result);
					// clean the temp Arrays after sending the form for the next one
					$scope.newClient = {};
				});
				$scope.error = false;
			} else {
				console.log("Invalid Submit !");
				alert("Please complete all required champs");
				$scope.error = true;
			}
    };
    Param.getList(function(result){
	    $scope.param = result;
        console.log($scope.param);
	});
    $scope.checkDelivery = function (value) {
        //console.log($event);
        // console.log(value);
        if($scope.newClient.billingInfo) {
            if(value) {
                $scope.newClient.deliveryInfo.civility = $scope.newClient.billingInfo.civility; 
                $scope.newClient.deliveryInfo.lastname = $scope.newClient.billingInfo.lastname; 
                $scope.newClient.deliveryInfo.firstname = $scope.newClient.billingInfo.firstname;
                $scope.newClient.deliveryInfo.street = $scope.newClient.billingInfo.street;
                $scope.newClient.deliveryInfo.number = $scope.newClient.billingInfo.number;
                $scope.newClient.deliveryInfo.box = $scope.newClient.billingInfo.box;
                $scope.newClient.deliveryInfo.zip = $scope.newClient.billingInfo.zip;
                $scope.newClient.deliveryInfo.town = $scope.newClient.billingInfo.town;
                $scope.newClient.deliveryInfo.country = $scope.newClient.billingInfo.country;
            }
            else {
                $scope.newClient.deliveryInfo.civility = "";
                $scope.newClient.deliveryInfo.lastname = ""; 
                $scope.newClient.deliveryInfo.firstname = "";
                $scope.newClient.deliveryInfo.street = "";
                $scope.newClient.deliveryInfo.number = "";
                $scope.newClient.deliveryInfo.box = "";
                $scope.newClient.deliveryInfo.zip = "";
                $scope.newClient.deliveryInfo.town = "";
                $scope.newClient.deliveryInfo.country = "";
            }
        }
    };
}]);