(function(){

	console.log("app.js");
	
	'use strict';

	var app = angular.module('portfolio', ["ngRoute"]);
	app.config(config);
		//.run(run);

		function config($routeProvider, $locationProvider){
			
			$routeProvider

				.when('/',{
					templateUrl: '/partials/home',
					controller: 'HomeController'
				})
				.when('/login',{
					templateUrl: '/partials/login',
					controller: 'LoginController'
				});

			$locationProvider.html5Mode(true);
				

		}

		/*function run($rootScope, $http, $location, $localStorage){

			if ($localStorage.currentUser) {
				$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
			}

			$rootScope.$on('$locationChangeStart', function (event, next, current) {
				var publicPages = ['/login'];
				var restrictedPage = publicPages.indexOf($location.path()) === -1;
				if (restrictedPage && !$localStorage.currentUser) {
					$location.path('/login');
				}
			});
		}*/

})();