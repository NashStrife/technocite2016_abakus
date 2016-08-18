var addClientModule = angular.module('addClientModule', []);


addClientModule.controller('addClientCtrl', ['$scope', function($scope) {
    $scope.showForm = false;
	$scope.splash = function(status) {
       $scope.showForm = status;
      };

}]);