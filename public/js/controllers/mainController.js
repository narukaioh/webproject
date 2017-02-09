'use strict'

/* controller */

var app = angular.module('portfolio', []);

app.controller('mainController', [ '$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main){
	
	$scope.login 	= function(){
		
	};
	$scope.logout 	= function(){
		
	};

	$scope.token = $localStorage.token;

}]);