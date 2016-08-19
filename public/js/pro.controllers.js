var abakusControllers = angular.module('proControllers', []);



// add the "Rest" service inside the diferent Ctrl
abakusControllers.controller('ProListCtrl', ['$scope', 'Client', function($scope, Client){

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
	];
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
	];

	// create a function to refresh the list when needed
	function refresh() {
		Client.getList(function(result){
			$scope.listClients = result;
			console.log($scope.listClients);
		});
	}

	// need to use refresh() at first list loading
	refresh();
	
	// define the base order when list appear
	// $scope.order = "name";
	// $scope.direction = "";
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