var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt-nodejs');

/*
	Modelo simples para a coleção de usuários
*/

var UserSchema	= mongoose.Schema({
	name: { 
		type: String,
		unique: true,
		required: true
	},
	password: { 
		type: String,
		required: true
	},
	admin: Boolean
});

/* 
	metodo pre save utilizado sempre antes de salvar uma nova instancia de usuario no banco 
	nele usamos a criptografia no password
*/
UserSchema.pre('save', function(next){
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(5, function(err, salt){
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});

	});
});

/*
	metodo para validar se a senha é realmente a que consta no banco
*/

UserSchema.methods.checkPassword = function(password, next) {
	bcrypt.compare(password, this.password, function(err, isMath){
		if (err) return next(err);
		return isMath;
	});
};


module.exports = mongoose.model('User', UserSchema);