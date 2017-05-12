var express 	= require('express');
var router 		= express.Router();
var msg 		= require('../config/messages');
var User 		= require('../models/user.model');
var jwt 		= require('jsonwebtoken');
var app 		= express();

/* GET login */

router.get('/', function(req, res, next){
	var arbitraryUrls = ['partials'];
	if (arbitraryUrls.indexOf(req.url.split('/')[1]) > -1) {
		next();
	} else {
		res.render('./narukaioh-theme/index');
	}
});

router.get('/authenticate', function(req, res, next) {
  	res.render('./narukaioh-theme/partials/login');
});

/*POST login*/
router.post('/authenticate', function(req, res){
	
	User.findOne({ name: req.body.name }, function(err, user){

		if (err) throw err;
		
		if(!user) { // Se nao encontrou o login
			res.render('./narukaioh-theme/partials/login', { success: false, message: msg.LG0001 });
		}else if (user) { // Se encontrou o login

			// Verifica a senha
			if (user.checkPassword(req.body.password)) {
				res.render('./narukaioh-theme/partials/login', { success: false, message: msg.LG0002 });
			}else{
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresIn: '90440 seconds'
				});
				console.log(token);
				res.render('./narukaioh-theme/account', { success: true, message: msg.LG0003 , token: token });
			}
		}
	});
});

router.get('/account', function(req, res, next){
	validateToken(req, res, next, 'account');	
});

router.get('/users', function(req, res, next) {
	User.find({}, function(err, users){
		res.render('users', { users: users });
	});
});

/*
	para as url que usarão o token e a sessao 
	como preparar o token no client para enviar e autenticar a url
	http://pt.stackoverflow.com/questions/88431/como-setar-um-token-no-header
*/

router.use(function(req, res, next){
	validateToken(req, res, next, 'login');
});

function validateToken(req, res, next, view){

	var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];

	if (token) {
		
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.render( 'error' , { success: false, message: msg.LG0004 });
			}else {
				req.decoded = decoded;
				res.render(view);
				next();
			}
		});

	}else{
		return res.status(403).send({
			success: false,
			message: msg.LG0005
		});
	}	
}

module.exports = router;
