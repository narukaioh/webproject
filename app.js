'use strict'

const express 		  	= require('express')
const path 			    = require('path')
const favicon 		  	= require('serve-favicon')
const logger			= require('morgan')
const cookieParser 		= require('cookie-parser')
const bodyParser 		= require('body-parser')
const mongoose			= require('mongoose')
const cors 				= require('cors')

//Configs
const config 			= require('./config/config')

//Rotas
const index 			= require('./routes/index')
const users 			= require('./routes/user.router')
const articles 			= require('./routes/article.router')
const categories		= require('./routes/category.router')
const login				= require('./routes/login.router')

//Iniciando aplicação
const app = express()

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// Conectando ao banco de dados
mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('superSecret', config.secret)

//app.use(favicon(path.join(__dirname, 'public', 'favicon-16x16.png')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', index)
app.use('/api/users', users)
app.use('/api/categories', categories)
app.use('/api/account', login)
app.use('/api/blog', articles)

app.use( (req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
});

app.use( (err, req, res, next) => {

	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.render(config.skin+'/partials/error')

});

module.exports = app;
