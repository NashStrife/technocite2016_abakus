let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {
		login : function(hash, pwd, callback) {
			let logResource = $resource("/api/crm/login?hash="+hash+"&pwd="+pwd);
            // callback is not required but it's better to get the different messages [error, validation,...] 
            logResource.query(callback);
		},
        upload : function(uploadQuery, callback) {
			let uploadResource = $resource("/api/crm/upload");
            uploadResource = uploadQuery;
            // callback is not required but it's better to get the different messages [error, validation,...] 
            uploadResource.$save(callback);
		}
        createPdf : function(pdfQuery, callback) {
		}
	}

	return list;

}]);