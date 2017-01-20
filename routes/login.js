var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var app = express();

/* GET login */
router.get('/', function(req, res, next) {
  	res.render('login');
});

/*POST login*/
router.post('/', function(req, res){
	
	User.findOne({ name: req.body.name }, function(err, user){
		console.log(user);
		if (err) throw err;
		
		if(!user) {
			res.render('login', { success: false, message: 'Autenticacao falhou. Usuário nao encontrado.' });
		}else if (user) {
			if (user.password != req.body.password) {
				res.render({ success: false, message: 'Autenticacao falhou. Senha inválida. '});
			}else{
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresIn: 1440
				});
				console.log(token);
				res.render('login', { success: true, message: 'Aproveite!', token: token });
			}
		}
	});
});

/*
Estudar sobre essa função que verifica a autenticacao
Link: 
router.use(function(req, res, next){
	console.log("teste!");
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.render('login', { success: false, message: 'Falha ao autenticar token.' });
			}else {
				req.decoded = decoded;
				next();
			}
		});
	}else{
		return res.status(403).send({
			success: false,
			message: 'Nenhum token criado.'
		});
	}
});

app.use('/login', router); */

module.exports = router;
