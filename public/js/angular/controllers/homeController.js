(function(){

	'use strict';

	angular
		.module('portfolio')
		.controller('homeController', Controller);


	function Controller($scope){
		var vm = this;
		console.log("home controller");
		initController();

		function initController(){
			console.log("init home controller");
		};

	}

})();