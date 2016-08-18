var abakusControllers = angular.module('abakusControllers', []);


abakusControllers.controller('loginCtrl', ['$scope', '$location', '$cookies', 'Crm', 'Client', 'Admin', function($scope, $location, $cookies,  Crm, Client, Admin){
	// object to store logs informations from the login form
	$scope.logClient = {};
	$scope.logPro = {};

	var abakusCookies = $cookies.get('Abakus');
	console.log(abakusCookies);

	// for form validation
	$scope.error = false;
	
	// verify logs for client
	$scope.loginCl = function(isValid){
		if(isValid){
			console.log($scope.logClient);

			// verify if the user exist or not
			Client.getOne("contactPerson.mail", $scope.logClient.email, function(result){
				var loginMsg = 'Incorrect email or/and password';
				// 1 = error, 0 = ok
				var error_code = result[0].error_code; 

				if (error_code)
					console.log(loginMsg);
				// if client exist
				else {
					var dataFromDb = result[0].data[0];
					// console.log(dataFromDb.contactPerson.pwd);
					var hash = dataFromDb.contactPerson.pwd;
					var pwd = $scope.logClient.password;

					// verify if password from the login form is corresponding with hash from DB
					Crm.login(hash, pwd, function(compareResult){
						// console.log(compareResult[0].data);

						// if pass corresponding
						if(compareResult[0].data) { 
							loginMsg = 'login Ok';
							// redirect to the right view
							$location.path('/client/home');
							// set cookie
							abakusCookies = {
								'isLogged' : true,
								'isPro' : false
							};
							// and re inject it
							$cookies.putObject('Abakus', abakusCookies);
						}
						console.log(loginMsg);
						console.log($cookies.get('Abakus'));
					});
				}
			});
		} else {
			console.log("Invalid Submit !");
			alert("Please complete all required champs");
			$scope.error = true;
		}
	};
	// verify logs for pro
	$scope.loginPro = function(isValid){
		if(isValid){
			console.log($scope.logPro);

			// verify if the user exist or not
			Admin.getAdmin(function(result){
				console.log(result);
				var loginMsg = 'Incorrect email or/and password';
				// 1 = error, 0 = ok
				var mailFromDb = result[0].contactPerson.mail; 
				var mailFromForm = $scope.logPro.email;

				if (mailFromDb !== mailFromForm)
					console.log(loginMsg);
				// if client exist
				else {
					// console.log(dataFromDb.contactPerson.pwd);
					var hash = result[0].contactPerson.pwd;
					var pwd = $scope.logPro.password;

					// verify if password from the login form is corresponding with hash from DB
					Crm.login(hash, pwd, function(compareResult){
						// console.log(compareResult[0].data);

						// if pass corresponding
						if(compareResult[0].data) { 
							loginMsg = 'login Ok';
							// redirect to the right view
							$location.path('/pro/home');
							// set cookie
							abakusCookies = {
								'isLogged' : true,
								'isPro' : true
							};
							// and re inject it
							$cookies.putObject('Abakus', abakusCookies);
						}
						console.log(loginMsg);
						console.log($cookies.get('Abakus'));
					});
				}
			});
		} else {
			console.log("Invalid Submit !");
			alert("Please complete all required champs");
			$scope.error = true;
		}
	};
	$scope.logout = function(){
		abakusCookies = {
			'isLogged' : false,
			'isPro' : undefined
		};
		$cookies.putObject('Abakus', abakusCookies);
		$location.path('/');
	};
}]);

abakusControllers.controller('profileCtrl', ['$scope', '$http', function($scope,$http ) {
	

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
