
(function(){
	'use strict'

	/* controller */
	angular
		.module('portfolio')
		.factory('AuthenticationService', Service);


	function Service($http, $localStorage){

		var service 	= {};

		service.Login 	= Login;
		service.Logout 	= Logout;

		return service;

		function Login( username, password, callback ){
			$http.post('/login/authenticate', { name: username, password: password})
				.success(function(res){
					if (res.token){
						$localStorage.currentUser = { name: username, token: res.token };
						$http.defaults.headers.common.Authorization = res.token;
						callback(true);
					} else {
						callback(true);
					}
				});
		}

		function Logout() {
			delete $localStorage.currentUser;
			$http.defaults.headers.common.Authorization = '';
		}

	}
})();