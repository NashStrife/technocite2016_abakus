var app = angular.module('abakusApp', [
	'ngRoute',
	'ngResource',
	'ngCookies',
	'abakusControllers',
	'proControllers',
	'addClientModule',
	'addBillControllers',
	'addEstimateControllers',
	'servicesAbakus',
	'clientService',
	'adminService',
	'paramsService'
	])
	.directive('linkhomeclient', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
			controller : 'loginCtrl',
	    templateUrl: "components/linkhomeclient.html"    // (5)
	  }})
	.directive('linkhomepro', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
			controller : 'loginCtrl',
	    templateUrl: "components/linkhomepro.html"    // (5)
	  }})
	.directive('navbarclient', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/navbarclient.html"    // (5)
	  }})
	.directive('navbarpro', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/navbarpro.html"    // (5)
	  }})
	.directive('searchbarclient', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/searchbarclient.html"    // (5)
	  }})
	.directive('searchbarpro', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/searchbarpro.html"    // (5)
	  }})
	.directive('profiledashboard', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: false,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/profiledashboard.html"    // (5)
	  }})
	.directive('moreclient', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: false,         // (3)
	    transclude: true,      // (4)
			controller : 'addClientCtrl',
	    templateUrl: "components/moreClient.html"    // (5)
	  }})
	.directive('addinvoice', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: false,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/addInvoice.html"    // (5)
	}})
	.directive('addestimate', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: false,         // (3)
	    transclude: true,      // (4)
		controller : 'addClientCtrl',
	    templateUrl: "components/addEstimate.html"    // (5)
	}});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		title:"login",
		templateUrl : 'partials/login.html',
		controller : 'loginCtrl'
	}).
	when('/client/home', {
		title:"home",
		templateUrl : 'partials/client/home.html',
		controller : 'profileCtrl'
	}).
	when('/client/estimate/detail', {
		title:"devis",
		templateUrl : 'partials/client/estimate/detail.html',
		controller : ''
	}).
	when('/client/estimate/list', {
		title:"devis",
		templateUrl : 'partials/client/estimate/list.html',
		controller : 'profileCtrl'
	}).
	when('/client/invoice/detail', {
		title:"factures",
		templateUrl : 'partials/client/invoice/detail.html',
		controller : ''
	}).
	when('/client/invoice/list', {
		title:"factures",
		templateUrl : 'partials/client/invoice/list.html',
		controller : 'profileCtrl'
	}).
	when('/client/profile/edit', {
		title:"mon compte",
		templateUrl : 'partials/client/profile/edit.html',
		controller : ''
	}).
	when('/client/profile/infos', {
		title:"mon compte",
		templateUrl : 'partials/client/profile/infos.html',
		controller : ''
	}).
	when('/pro/home', {
		title:"home",
		templateUrl : 'partials/pro/home.html',
		controller : 'profileCtrl'
	}).
	when('/pro/create-new-file', {
		title:"home",
		templateUrl : 'partials/pro/createNewFile.html',
		controller : ''
	}).
	when('/pro/clients/add', {
		title:"clients",
		templateUrl : 'partials/pro/clients/add.html',
		controller : 'addClient'
	}).
	when('/pro/clients/detail/:itemId', {
		title:"clients",
		templateUrl : 'partials/pro/clients/detail.html',
		controller : 'ProDetailCtrl'
	}).
	when('/pro/clients/list', {
		title:"clients",
		templateUrl : 'partials/pro/clients/list.html',
		controller : 'ProListCtrl'
	}).
	when('/pro/estimate/add', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/add.html',
		controller : 'AddEstimateCtrl'
	}).
	when('/pro/estimate/detail', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/detail.html',
		controller : ''
	}).
	when('/pro/estimate/list', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/list.html',
		controller : 'ProListCtrl'
	}).
	when('/pro/invoice/add', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/add.html',
		controller : 'AddBillCtrl'
	}).
	when('/pro/invoice/detail', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/detail.html',
		controller : ''
	}).
	when('/pro/invoice/list', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/list.html',
		controller : 'ProListCtrl'
	}).
	when('/pro/profile/edit-method-of-payement', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editPayMethod.html',
		controller : ''
	}).
	when('/pro/profile/edit-profile', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editProfile.html',
		controller : 'ProAccountCtrl'
	}).
	when('/pro/profile/edit-template', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editTemplate.html',
		controller : ''
	}).
	when('/pro/profile/edit-terms', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editTerms.html',
		controller : ''
	}).
	when('/pro/profile/edit-articles', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editArticle.html',
		controller : ''
	}).
	when('/pro/profile/infos', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/infos.html',
		controller : 'ProAccountCtrl'
	}).
	otherwise({
		templateUrl : '404.html',
		redirectTo : '/'
	});

	

}]);

app.run(['$rootScope', '$cookies', function($rootScope, $cookies) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.$$route.title;
	});
}]);