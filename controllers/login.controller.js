const User 		= require('../models/user.model')
const config 	= require('../config/config')
const msg 		= require('../config/messages')
const jwt 		= require('jsonwebtoken')
const moment 	= require('moment')

const LoginController = {

	Authenticate: (req, res, next) => {
		User.findOne({ name: req.body.name }, (err, user) => {
			if (err) throw err
			if(!user) { // Se nao encontrou o login
				//res.render(config.skin+'/partials/login', { status: false, message: msg.LG0001 })
				res.json({status: false, error: msg.LG0001 })
			}else if (user) { // Se encontrou o login
				// Verifica a senha
				if (user.checkPassword(req.body.password)) {
					//res.render(config.skin+'/partials/login', { status: false, message: msg.LG0002 })
					res.json({ status: false, error: msg.LG0002 })
				}else{
					const expires = moment().add(7, 'days').valueOf()
					const token = jwt.sign(user, req.app.get('superSecret'), {
						expiresIn: expires 
					})
					res.json({ status: true, message: msg.LG0003 , token: token })
					//res.render(config.skin+'/account', { status: true, message: msg.LG0003 , token: token })
				}
			}
		});
	},

	Verify: (req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, config.superSecret, (err, decoded) => {
				if (err) { res.json({status: false, message: msg.LG0004 }) }
				else {
					req.decoded = decoded
					next()
				}
			} )
		} else {
			res.status(403).send({ 
				success: false,
				message: msg.LG0005 
    		});
		}
	}


}

module.exports = LoginController