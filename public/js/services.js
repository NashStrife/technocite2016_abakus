let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {

		category : '',

		getList : function(callback) {
		},
		addRestaurant : function(restaurant, types, pictures, callback) {
		},
		deleteRestaurant : function(id, callback) {
		}
	}

	return list;

}]);