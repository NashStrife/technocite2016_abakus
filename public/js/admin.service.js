let adminService = angular.module('adminService', []);

adminService.factory('Admin',['$resource', function($resource) {

	let resource = $resource("/api/crm/admin");

	let list = {
		getAdmin : function(callback) {
			resource.query(callback);
		},
		updateAdmin : function(edAdmin, callback) {
			// need tests on clients before adding here
		},
		deleteAdmin : function(id, callback) {
			let admin = $resource("/api/crm/admin/"+id);
            admin.remove(callback);
		}
	}

	return list;

}]);