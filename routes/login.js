var express 	= require('express');
var router 		= express.Router();
var msg 		= require('../config/messages');
var User 		= require('../models/user');
var jwt 		= require('jsonwebtoken');
var app 		= express();

console.log(msg);

/* GET login */
router.get('/', function(req, res, next) {
  	res.render('login');
});

/*POST login*/
router.post('/', function(req, res){
	
	User.findOne({ name: req.body.name }, function(err, user){

		if (err) throw err;
		
		if(!user) {
			res.render('login', { success: false, message: msg.LG0001 });
		}else if (user) {
			if (user.password != req.body.password) {
				res.render({ success: false, message: msg.LG0002 });
			}else{
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresIn: 1440
				});

				res.render('login', { success: true, message: msg.LG0003 , token: token });
			}
		}
	});
});

/* para as url que usarão o token e a sessao  */

router.use(function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.render('login', { success: false, message: msg.LG0004 });
			}else {
				req.decoded = decoded;
				next();
			}
		});
	}else{
		return res.status(403).send({
			success: false,
			message: msg.LG0005
		});
	}
});

module.exports = router;
