'use strict'

/* controller */

var app = angular.module('portfolio', []);

app.controller('mainController', [ '$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main){
	
	$scope.signin 	= function(){};
	$scope.signout 	= function(){};
	$scope.myaccout = function(){};
	$scope.logout 	= function(){};

	$scope.token = $localStorage.token;

}]);