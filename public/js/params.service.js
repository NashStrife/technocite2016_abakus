let paramsService = angular.module('paramsService', []);

paramsService.factory('Param',['$resource', function($resource) {

	let resource = $resource("/api/crm/params");

	let list = {
		getList : function(callback) {
			resource.query(callback);
		},
		addParams : function(newParam, callback) {
			let param = new resource();

            param.rules = newParam.rules;
            param.refunds = newParam.refunds;
            param.countries = newParam.countries;
            param.vatRate = newParam.vatRate;

            console.log(param);

            param.$save(callback);
		}
	}

	return list;

}]);