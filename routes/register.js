const express 	= require('express')
const msg 		= require('../config/messages')
const User  	= require('../models/user')
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
		res.send({ message: msg.RG0001})
	});

})

router.get('/:productId', (req, res, next) => {
	User.find(req.productId)
})

router.put('/:productId', (req, res) => {})
router.delete('/:productId', (req, res) => {})

module.exports = router
