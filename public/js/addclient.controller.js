var addClientModule = angular.module('addClientModule', []);
var app = angular.module('fileUpload', ['ngFileUpload']);


addClientModule.controller('addClientCtrl', ['$scope', '$location', 'Param','Client', 'Crm', function($scope, $location, Param, Client, Crm) {
    $scope.showForm = false;
	$scope.splash = function(status) {
       $scope.showForm = status;
      };
    
    function refresh() {
		// use the Rest service created in services.js
		Client.getList(function(result){
			$scope.listClients = result;
		});
	}
    $scope.newClient = {};
    $scope.newClient.deliveryInfo = {};
    
    $scope.moreClient = function(isValid) {
        console.log($scope.newClient);




        if(isValid){
            $scope.newClient.contactPerson.pwd = "pass123";
            // radio button set value in a string and not in a boolean
            if($scope.newClient.isCompany === "true"){
                $scope.newClient.isCompany = true;
                $scope.newClient.vat.num = $scope.newClient.prevat.num + $scope.newClient.vat.num;
            } else {
                $scope.newClient.isCompany = false;
            }
                
            Client.addClient($scope.newClient, function(result){
                console.log(result);
               

        //         // let profileImage = {
        //         //     "folder": "public/images/clients/profile",
        //         //     "filename": "test",
        //         //     "file": $scope.newClient.picture
        //         // };
        //         // Crm.upload(profileImage, function(result){
        //         //     console.log(result);
        //         // });
                
                // clean the temp Arrays after sending the form for the next one


                // app.controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
                //     $scope.uploadPic = function(file) {
                //     file.upload = Upload.upload({
                //     url: "public/images/clients/profile",
                //     data: {file: file},
                //     });

                $scope.newClient = {};
                $scope.splash(false);
                $location.path('/pro/clients/list');
                refresh();
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