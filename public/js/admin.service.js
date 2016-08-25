"use strict";

let adminService = angular.module('adminService', []);

adminService.factory('Admin',['$resource', function($resource) {

	let resource = $resource("/api/crm/admin");

	let list = {
		getAdmin : function(callback) {
			resource.query(callback);
		},
		updateAdmin : function(edAdmin, callback) {
			let admin = $resource("/api/crm/admin/"+id, null,
			{
				'update': { method:'PUT' }
			});
			admin.name = edClient.name;
            client.editeddAt = Date.now();

			client.update(callback);
		},
		removeAdmin : function(id, callback) {
			let admin = $resource("/api/crm/admin/"+id);
            admin.remove(callback);
		}
	}

	return list;

}]);