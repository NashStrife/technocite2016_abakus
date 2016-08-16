let clientService = angular.module('clientService', []);

clientService.factory('Client',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {
		getList : function(callback) {
			resource.query(callback);
		},
		addClient : function(newClient, callback) {
			let client = new resource();
            // client.name = newClient.name;
            // client.isCompany = newClient.isCompany;
			// client.vat = newClient.vat; // object

            // client.createdAt = Date.now();
			client = newClient;
            console.log(client);
            client.$save(callback);
		},
		updateClient : function(edClient, callback) {
			let client = $resource("/api/crm/"+id, null,
			{
				'update': { method:'PUT' }
			});
			client.name = edClient.name;
            client.editeddAt = Date.now();

			client.update(callback);
		},
		deleteClient : function(id, callback) {
			let client = $resource("/api/crm/"+id);
            // callback is not required but it's better to get the different messages [error, validation,...] 
            client.remove(callback);
		}
	}

	return list;

}]);