var abakusControllers = angular.module('abakusControllers', []);


abakusControllers.controller('loginCtrl', ['$scope','$location', 'Crm','Client', function($scope,$location, Crm,Client){

			$scope.log = {};

			console.log(Crm.getLog());
		$scope.error = false;
		$scope.checkLog = function(isValid){
			
			if(isValid){
				console.log($scope.log);
				
				Client.getOne("contactPerson.mail", $scope.log.email, function(result){
					var loginMsg = 'Incorrect email or/and password';
					if (result[0].error_code === 0){
						console.log(result[0].data[0].contactPerson.pwd);
						var hash = result[0].data[0].contactPerson.pwd;
						var pwd = $scope.log.password;
						Crm.login(hash,pwd, function(logResult){
							console.log(logResult[0].data);
							if(logResult[0].data === true) {
								// index.html#/client/home
								loginMsg = 'login Ok';
								$location.path('/client/home');
								Crm.setLog(true, false);
								console.log(Crm.getLog());
							}
								console.log(loginMsg);
						});
					} else {
						console.log(loginMsg);
					}
				});
				// if(log.email = email de la db) {

				// }
				// Crm.addResto($scope.newResto, $scope.types, $scope.pics, function(result){
				// 	alert(result.message);
				// 	console.log(result);
				// 	// clean the temp Arrays after sending the form for the next one
				// 	voidArrays();
				// });
				// $scope.error = false;
			} else {
				console.log("Invalid Submit !");
				alert("Please complete all required champs");
				// $scope.error = true;
			}
		}
}]);

abakusControllers.controller('profile', ['$scope', '$http', function($scope,$http ) {
	

	$scope.listClients = [

		{
			'date' : '00/00/2016',
			'name' : 'John',
			'company' : 'lorem Corp',
			'note' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione soluta, corrupti ipsum commodi provident ut, eos quis atque repellat magnam esse vero voluptatibus suscipit illum at aperiam voluptas ducimus error.'
		},
		{
			'date' : '00/00/2016',
			'name' : 'Jane',
			'company' : 'lorem Corp',
			'note' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione soluta, corrupti ipsum commodi provident ut, eos quis atque repellat magnam esse vero voluptatibus suscipit illum at aperiam voluptas ducimus error.'
		}
	]


	$scope.listItems = [

		{
			'date' : '00/00/2016',
			'company' : 'company',
			'invoiceNumber' : 15,
			'note' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione soluta, corrupti ipsum commodi provident ut, eos quis atque repellat magnam esse vero voluptatibus suscipit illum at aperiam voluptas ducimus error.'
		},
		{
			'date' : 'Cannibal Corpse',
			'company' : 'enfant',
			'invoiceNumber' : 10,
			'note' : 'lorem ipsum'
		},
		{
			'date' : 'Levis',
			'company' : 'homme',
			'invoiceNumber' : 20,
			'note' : 'lorem ipsum'
		},
		{
			'date' : '00/00/2016',
			'company' : 'company',
			'invoiceNumber' : 15,
			'note' : 'lorem ipsum'
		}
	]

	$scope.listEstimates = [
		{
			'date' : '00/00/2016',
			'company' : 'devis 1',
			'invoiceNumber' : 15456465,
			'note' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione soluta, corrupti ipsum commodi provident ut, eos quis atque repellat magnam esse vero voluptatibus suscipit illum at aperiam voluptas ducimus error.'
		},
		{
			'date' : '00/00/2016',
			'company' : 'devis 2',
			'invoiceNumber' : 10337,
			'note' : 'lorem ipsum'
		},
		{
			'date' : '00/00/2016',
			'company' : 'devis 3',
			'invoiceNumber' : 2067373,
			'note' : 'lorem ipsum'
		},
		{
			'date' : '00/00/2016',
			'company' : 'devis 4',
			'invoiceNumber' : 1546,
			'note' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa perspiciatis, itaque accusantium facere repellendus saepe nisi, voluptatum blanditiis doloribus, et laboriosam assumenda nesciunt, ad esse. At quidem nihil dolorum porro.'
		}
	]

}]);
