"use strict";

let services = angular.module('servicesAbakus', []);

services.factory('Crm',['$resource', function($resource) {

	let resource = $resource("/api/crm");


	let list = {

        setLog : function(isLogged, isPro, callback) {
            log.isLogged = isLogged;
            log.isPro = isPro;
        },
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
            let resourcePdf = $resource("/api/crm/createPdf");
            // neeed to create a new resource to be allowed to add more informations
            let pdfToSend = new resourcePdf();
            // let createPdf = new resource();
            // informations about file and folder
            pdfToSend.file = newPdf.file;
            // data to put inside the pdf
            pdfToSend.data = newPdf.data;

            console.log("Create PDF");
            // console.log(pdfToSend);
            
            pdfToSend.$save(callback);
		}
	}

	return list;

}]);