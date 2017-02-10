(function(){

	'use strict';

	angular
		.module('portfolio', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
		.config(config)
		.run(run);

		function config($stateProvider, $urlRouterProvider){

			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state('home',{
					url: '/',
					templateUrl: '../home.jade',
					controller: 'controllers/homeController.js',
					controllerAs: 'vm'
				})
				.state('login',{
					url: '/login',
					templateUrl: '../login.jade',
					controller: 'controllers/loginController.js',
					controllerAs: 'vm'
				});

		}

		function run($rootScope, $http, $location, $localStorage){

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
		}

})