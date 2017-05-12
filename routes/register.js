const express 	= require('express')
const config 	= require('../config/config')
const msg 		= require('../config/messages')
const User  	= require('../models/user.model')
const router 	= express.Router()

router.get('/', (req, res, next) => {
	res.send({ users: [] })
})

router.post('/', (req, res) => {

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		login: req.body.login,
		password: req.body.password
	});

	user.save( (err) => {
		if (err) return res.status(412).json(err)
		//res.send(config.skin+'partials/register', { message: msg.RG0001 })
		res.send({ message: msg.RG0001 })
	});

})

router.get('/:productId', (req, res, next) => {
	User.find(req.productId)
})

router.put('/:productId', (req, res) => {})
router.delete('/:productId', (req, res) => {})

module.exports = router
