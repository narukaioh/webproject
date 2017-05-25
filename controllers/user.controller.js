'use strict'

const msg = require('../config/messages')
const User = require('../models/user.model');

const UserController = {

	GetUsers: 	(req, res, next) => {
		User.find({}, function(err, users){
			if (err) res.json({status: false, error: msg.RG0006 })
			res.json({ status: true, users: users });
		});		
	},
	GetUser: 	(req, res, next) => {
		User.find({_id: req.params.id }, function(err, user){
			if (err) { res.json({status: false, message: msg.RG0006, error: err }) }
			else {
				res.json({ status: true, user: user });
			}
		});		
	},
	PostUser: 	(req, res, next) => {
		const user = new User(req.body)
		user.save( err => {
			if (err) { 
				return res.json({status: false, message: msg.RG0006, error: err }) 
			}else{
				res.json({status: true, message: msg.RG0001 })
			}
		})			
	},
	DeleteUser: (req, res, next) => {
		User.remove({_id: req.params.id}, (err, user) => {
			if (err) {
				res.json({ status: false, error: msg.RG0006 })
				return
			}
			res.json({ status: true, message: msg.RG0005 })
		})
	},
	UpdateUser: (req, res, next) => {
		const data = req.body
		User.find({_id: req.params.id}, (err, user) => {
			// validar esses campos no back antes de tentar salvar
			user.name = data.name,
			user.email = data.email,
			user.password = data.password,
			user.login = data.login,
			user.save(err => {
				if (err) res.json({status: false, error: msg.RG0006 })
				res.json({ status: true, message: msg.RG0007 })
			})
		})
	}
}

module.exports = UserController;