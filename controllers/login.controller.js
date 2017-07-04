'use strict'

const User 		= require('../models/user.model')
const config 	= require('../config/config')
const msg 		= require('../config/messages')
// Modulo para criar tokens
const jwt 		= require('jsonwebtoken')
// Modulo para definir um periodo de tempo que o token ira expirar
const moment 	= require('moment')

const LoginController = {

	Authenticate: (req, res, next) => {
		User.findOne({ login: req.body.name }, (err, user) => {
			if (err) { throw err}
			if(!user) { // Se nao encontrou o login
				res.json({status: false, error: msg.LG0001 })
			}else if (user) { // Se encontrou o login
				// Verifica a senha
				if (user.checkPassword(req.body.password)) {
					res.json({ status: false, error: msg.LG0002 })
				}else{
					const expires = moment().add(7, 'days').valueOf()
					const token = jwt.sign(user, config.secret, {
						expiresIn: expires 
					})
					res.json({ status: true, message: msg.LG0003 , token: token, user: user })
				}
			}
		});
	},

	Verify: (req, res, next) => {

		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, config.secret, (err, decoded) => {
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