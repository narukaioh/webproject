'use strict'

const User = require('../models/user.model');

const UserController = {

	GetUsers: 	(req, res, next) => {
		User.find({}, function(err, users){
			res.json({ users: users });
		});		
	},
	PostUser: 	(req, res, next) => {

	},
	DeleteUser: (req, res, next) => {

	},
	UpdateUser: (req, res, next) => {
		
	}

}

module.exports = UserController;