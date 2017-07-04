(function(){

	'use strict';

	angular
		.module('portfolio')
		.controller('HomeController', Controller);


	function Controller(){
		var vm = this;
		console.log("testae");
		initController();

		function initController(){
			console.log("init home controller");
		};

	}

})();