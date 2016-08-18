"use strict";

let clientService = angular.module('clientService', []);

clientService.factory('Client',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {
		getList : function(callback) {
			resource.query(callback);
		},
		getOne : function(searchKey, searchValue, callback){
			let getOneResource = $resource("/api/crm/search?"+searchKey+"="+searchValue);
            
            getOneResource.query(callback);
		},
		addClient : function(newClient, callback) {
			let client = new resource();
            client.name = newClient.name;
			if(newClient.picture)
				client.picture = newClient.picture;
            client.isCompany = newClient.isCompany;
			if(newClient.vat)
				client.vat = newClient.vat; // object
			client.billingInfo = newClient.billingInfo;
			client.deliveryInfo = newClient.deliveryInfo;
			client.contactPerson = newClient.contactPerson;
			if(newClient.memo)
				client.memo = newClient.memo;
            client.createdAt = Date.now();

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