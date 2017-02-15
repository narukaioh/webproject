(function(){

	'use strict';

	angular
		.module('portfolio')
		.controller('loginController', Controller);


	function Controller($location, AuthenticationService){
		var vm = this;
		console.log("login controller");
		vm.login = login;

		initController();

		function initController(){
			console.log("init login controller");
		};

		function login(){
			vm.loading = true;
			AuthenticationService.Login(vm.name, vm.password, function(result){
				if (result === true) {
					$location.path('/');
				} else {
					vm.error = result.error;
					vm.loading = false;
				}
			})
		}

	}

})();