"use strict";

let adminService = angular.module('adminService', []);

adminService.factory('Admin',['$resource', function($resource) {

	let resource = $resource("/api/crm/admin");

	let list = {
		getAdmin : function(callback) {
			resource.query(callback);
		},
		updateAdmin : function(edAdmin, callback) {
			let resourceAdmin = $resource("/api/crm/admin/"+edAdmin._id, null,
			{
				'update': { method:'PUT' }
			});

			let admin = new resourceAdmin();

			admin.name = edAdmin.name;
			if(edAdmin.logo)
				admin.logo = edAdmin.logo;
			admin.vat = edAdmin.vat;
			admin.contact = edAdmin.contact;
			admin.contactPerson = edAdmin.contactPerson;
			admin.paymentInfo = edAdmin.paymentInfo;
			admin.articles = edAdmin.articles;
			admin.templates = edAdmin.templates;
			
			admin.createdAt = edAdmin.createdAt
            admin.updatedAt = Date.now();

			console.log("Edit admin");
			// console.log(admin);
			
			admin.$update(callback);
		},
		removeAdmin : function(id, callback) {
			let admin = $resource("/api/crm/admin/"+id);
            admin.remove(callback);
		}
	}

	return list;

}]);