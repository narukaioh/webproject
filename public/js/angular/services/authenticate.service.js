
(function(){
	'use strict'

	/* controller */
	angular
		.module('Authentication')
		.factory('AuthenticationService', Service);


	function Service($http, $localStorage){

		var service 	= {};

		service.Login 	= Login;
		service.Logout 	= Logout;

		return service;

		//http://jasonwatmore.com/post/2014/05/26/angularjs-basic-http-authentication-example
		function Login( username, password, callback ){
			$http.post('/login/authenticate', { name: username, password: password})
				.success(function(res){
					if (res.token){
						$localStorage.currentUser = { name: username, token: res.token };
						$http.defaults.headers.common.Authorization = res.token;

						console.log("function Login()");
						console.log(res.token);

						callback(true);
					} else {
						console.log("teste!");
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