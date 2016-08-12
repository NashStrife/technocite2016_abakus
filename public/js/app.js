var app = angular.module('abakusApp', [
	'ngRoute',
	'abakusControllers',
	'addClientModule'
	])
	.directive('linkhomeclient', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/linkhomeclient.html"    // (5)
	  }})
	.directive('linkhomepro', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
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
	.directive('searchBar', function() { // (1)
	  return {
	    restrict: "E",         // (2)
	    replace: true,         // (3)
	    transclude: true,      // (4)
	    templateUrl: "components/searchBar.html"    // (5)
	  }})
;

// angular.module("abakusApp", ["abakusControllers"])
//   .directive("navBar", function() { // (1)
//   return {
//     restrict: "E",         // (2)
//     replace: true,         // (3)
//     transclude: true,      // (4)
//     templateUrl: "components/navBar.html"    // (5)
//   }});
// ;

// angular.module("abakusApp", ["abakusControllers"])
//   .directive("searchBar", function() { // (1)
//   return {
//     restrict: "E",         // (2)
//     replace: true,         // (3)
//     transclude: true,      // (4)
//     templateUrl: "components/searchBar.html"    // (5)
//   }});
// ;


app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/login', {
		title:"login",
		templateUrl : 'partials/login.html',
		controller : ''
	}).
	when('/client/home', {
		title:"home",
		templateUrl : 'partials/client/home.html',
		controller : ''
	}).
	when('/client/estimate/detail', {
		title:"devis",
		templateUrl : 'partials/client/estimate/detail.html',
		controller : ''
	}).
	when('/client/estimate/list', {
		title:"devis",
		templateUrl : 'partials/client/estimate/list.html',
		controller : ''
	}).
	when('/client/invoice/detail', {
		title:"factures",
		templateUrl : 'partials/client/invoice/detail.html',
		controller : ''
	}).
	when('/client/invoice/list', {
		title:"factures",
		templateUrl : 'partials/client/invoice/list.html',
		controller : ''
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
		controller : ''
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
	when('/pro/clients/detail', {
		title:"clients",
		templateUrl : 'partials/pro/clients/detail.html',
		controller : ''
	}).
	when('/pro/clients/list', {
		title:"clients",
		templateUrl : 'partials/pro/clients/list.html',
		controller : ''
	}).

	when('/pro/estimate/add', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/add.html',
		controller : ''
	}).
	when('/pro/estimate/detail', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/detail.html',
		controller : ''
	}).
	when('/pro/estimate/list', {
		title:"devis",
		templateUrl : 'partials/pro/estimate/list.html',
		controller : ''
	}).

	when('/pro/invoice/add', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/add.html',
		controller : ''
	}).
	when('/pro/invoice/detail', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/detail.html',
		controller : ''
	}).
	when('/pro/invoice/list', {
		title:"factures",
		templateUrl : 'partials/pro/invoice/list.html',
		controller : ''
	}).

	when('/pro/profile/edit-method-of-payement', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editPayMethod.html',
		controller : ''
	}).
	when('/pro/profile/edit-profile', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/editProfile.html',
		controller : ''
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
	when('/pro/profile/infos', {
		title:"mon compte",
		templateUrl : 'partials/pro/profile/infos.html',
		controller : ''
	}).
	otherwise({
		templateUrl : '404.html',
		redirectTo : '/'
	});

	

}]);

app.run(['$rootScope', function($rootScope) {
	    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	        $rootScope.title = current.$$route.title;
	    });
	 }]);