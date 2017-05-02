const express 	= require('express')
const msg 		= require('../config/messages')
const Account 	= require('../controllers/accountController')
const router 	= express.Router()

router.get('/', (req, res, next) => {
	res.send({ users: [] })
})

router.post('/',(req, res) => {
	console.log(req.body)

	const user = {
		name: req.body.name,
		email: req.body.email,
		login: req.body.login,
		password: req.body.password
	}

	Account.register(user)

	res.send({ message: msg.RG0001 })
})

router.get('/:productId', (req, res, next) => {})

router.put('/:productId', (req, res) => {})
router.delete('/:productId', (req, res) => {})

module.exports = router
