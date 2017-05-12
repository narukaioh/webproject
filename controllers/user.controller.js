const UserModel = require('../models/user.model');

const UserController = {

	GetUsers: 	(req, res, next) => {
		UserModel.find({}, function(err, users){
			res.render('users', { users: users });
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