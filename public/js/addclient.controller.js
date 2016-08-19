var addClientModule = angular.module('addClientModule', []);


addClientModule.controller('addClientCtrl', ['$scope', 'Param', function($scope, Param) {
    $scope.showForm = false;
	$scope.splash = function(status) {
       $scope.showForm = status;
      };
    $scope.newClient = {};
    $scope.moreClient = function() {
        
    }
        Param.getList(function(result){
			$scope.param = result;
            console.log($scope.param);
		});
}]);