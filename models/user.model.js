'use strict'

const mongoose 		= require('mongoose')
const Schema 		= mongoose.Schema
const bcrypt 		= require('bcrypt-nodejs')
const msg 			= require('../config/messages')

const validateName = value => {
	return value.search(" ") != 0
}

const validateEmail = value => {
	let reg = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;
	return reg.test(value)
}

// verificar se tem letras e numeros
const validatePassword = value => { 
	let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
	return reg.test(value)
}

/*
	Modelo simples para a coleção de usuários
*/

const UserSchema	= new Schema({
	name: { 
		type: String,
		required: true,
		validate: [ validateName , msg.RG0002 ]
	},
	password: { 
		type: String,
		required: true,
		minlength: 8,
		validate: [
			{ validator: validatePassword , msg: msg.RG0003 }
		]
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: [ validateEmail, msg.RG0004 ]
	},
	login: {
		type: String,
		unique: true,
		required: true,
		minlength: 6
	},
	articles: {
		type: Schema.ObjectId,
		ref: 'Article'
	}
});

/* 
	metodo pre save utilizado sempre antes de salvar uma nova instancia de usuario no banco 
	nele usamos a criptografia no password
*/
UserSchema.pre('save', next => {
	const user = this

	if (!user.isModified('password')) { return next() }

	bcrypt.genSalt(5, (err, salt) => {
		if (err) { return err }
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) { return err }
			user.password = hash
			next()
		});
	});
});

/*
	metodo para validar se a senha é realmente a que consta no banco
*/

UserSchema.methods.checkPassword = (password, next) => {
	bcrypt.compare(password, this.password, (err, isMath) => {
		if (err) {return err }
		return isMath;
	});
};


module.exports = mongoose.model('User', UserSchema);