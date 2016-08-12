let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {

		category : '',	// ???

		getList : function(callback) {
			resource.query(callback);
		},
		addCustomer : function(newCustomer, types, pictures, callback) {
			let customer = new resource();
            customer.name = newCustomer.name;
            
            customer.createdAt = Date.now();
            // console.log(customer);
            customer.$save(callback);
		},
		deleteCustomer : function(id, callback) {
			let resource = $resource("/api/crm/"+id);
            // callback is not required but it's better to get the different messages [error, validation,...] 
            resource.remove(callback);
		}
	}

	return list;

}]);