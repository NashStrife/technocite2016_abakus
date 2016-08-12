let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {

		category : '',	// ???

		getList : function(callback) {
			resource.query(callback);
		},
		addCustomer : function(newCustomer, callback) {
			let customer = new resource();
            customer.name = newCustomer.name;
            
            customer.createdAt = Date.now();
            // console.log(customer);
            customer.$save(callback);
		},
		updateCustomer : function(edCustomer, callback) {
			let customer = new resource();
            customer.name = edCustomer.name;
            
            customer.createdAt = Date.now();
            // console.log(customer);
            customer.$save(callback);

			let resource = $resource("/api/crm/"+id, null,
			{
				'update': { method:'PUT' }
			});
			resource.name = edCustomer.name;
            resource.editeddAt = Date.now();

			resource.$update(callback);
		},
		deleteCustomer : function(id, callback) {
			let resource = $resource("/api/crm/"+id);
            // callback is not required but it's better to get the different messages [error, validation,...] 
            resource.remove(callback);
		}
	}

	return list;

}]);