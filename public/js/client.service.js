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
			let resourceClient = $resource("/api/crm/"+edClient._id, null,
			{
				'update': { method:'PUT' }
			});

			let client = new resourceClient();
			client.name = edClient.name;
			if(edClient.picture)
				client.picture = edClient.picture;
            client.isCompany = edClient.isCompany;
			if(edClient.vat)
				client.vat = edClient.vat; // object
			client.billingInfo = edClient.billingInfo;
			client.deliveryInfo = edClient.deliveryInfo;
			client.contactPerson = edClient.contactPerson;
			client.bills = edClient.bills;
			client.quotations = edClient.quotations;
			if(edClient.memo)
				client.memo = edClient.memo;
            client.createdAt = edClient.createdAt;
            client.editeddAt = Date.now();

			console.log("Edit client");
			// console.log(client);

			client.$update(callback);
		},
		removeClient : function(id, callback) {
			let client = $resource("/api/crm/"+id);
            // callback is not required but it's better to get the different messages [error, validation,...] 
            client.remove(callback);
		}
	}

	return list;

}]);