let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");

	let list = {
		login : function(hash, pwd, callback) {
			let logResource = $resource("/api/crm/login?hash="+hash+"&pwd="+pwd);
            
            logResource.query(callback);
		},
        upload : function(newUpload, callback) {
			let uploadResource = $resource("/api/crm/upload");
            uploadResource.folder = newUpload.folder;
            uploadResource.filename = newUpload.filename;
            // file is the image and must be the last one
            uploadResource.file = newUpload.file;

            uploadResource.$save(callback);
		},
        createPdf : function(newPdf, callback) {
            let pdfResource = $resource("/api/crm/createPdf");
            // informations about file and folder
            pdfResource.file = newPdf.file;
            // data to put inside the pdf
            pdfResource.data = newPdf.data;
            
            pdfResource.$save(callback);
		}
	}

	return list;

}]);