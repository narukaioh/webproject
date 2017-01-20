var express = require('express');
var router = express.Router();
var User = require('./models/user');

/* GET home page. */
router.get('/setup', function(req, res, next) {
  var nick = new User({
  	name: 'Ju Dantas',
  	password: 'password',
  	admin: true
  });

  nick.save(callback);

});

var callback = function(err){ 
	if (err) throw err;
	console.log('Usuario salvo com sucesso!');
	res.json({success: true });
}

module.exports = router;
