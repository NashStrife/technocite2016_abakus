var abakusControllers = angular.module('abakusControllers', []);

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