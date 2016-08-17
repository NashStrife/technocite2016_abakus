let adminService = angular.module('adminService', []);

adminService.factory('Admin',['$resource', function($resource) {

	let resource = $resource("/api/crm/admin");

	let list = {
		getList : function(callback) {
			resource.query(callback);
		},
		getOne : function(searchKey, searchValue, callback){
			let getOneResource = $resource("/api/crm/admin/search?"+searchKey+"="+searchValue);
            
            getOneResource.query(callback);
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