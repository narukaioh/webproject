var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET setup */
router.get('/', function(req, res, next) {

	var nick = new User({
		name: 'juds',
		password: '123456',
		admin: true
	});

	nick.save(function(err){
		if (err) throw err;
		console.log('Usuario salvo com sucesso!');
		res.json({success: true });
	});

});

module.exports = router;
