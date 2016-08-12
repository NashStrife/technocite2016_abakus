var addClientModule = angular.module('addClientModule', []);


addClientModule.controller('addClient', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $scope.showForm = false;
	$scope.gotoAnchor = function(status) {
       $scope.showForm = status;
      };

}]);