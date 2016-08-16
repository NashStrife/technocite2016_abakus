let paramsService = angular.module('paramsService', []);

paramsService.factory('Param',['$resource', function($resource) {

	let resource = $resource("/api/crm/params");

	let list = {
		getList : function(callback) {
			resource.query(callback);
		},
		addParams : function(newParams, callback) {
			let params = new resource();
            // client.name = newClient.name;
            // client.isCompany = newClient.isCompany;
			// client.vat = newClient.vat; // object

            // client.createdAt = Date.now();
			params = newParams;
            console.log(params);
            params.$save(callback);
		}
	}

	return list;

}]);