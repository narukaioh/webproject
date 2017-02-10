(function(){

	'use strict';

	angular
		.modules('portfolio')
		.controller('homeController', Controller);


	function Controller(){
		var vm = this;

		initController();

		function initController(){
			console.log("init home controller");
		};

	}

})