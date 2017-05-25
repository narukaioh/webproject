const express 	= require('express')
const router 	= express.Router()
const User 		= require('../controllers/user.controller')
const LoginCtrl = require('../controllers/login.controller')

router.get('/', User.GetUsers )
router.get('/:id', User.GetUser )
router.post('/', User.PostUser)

//router.use(LoginCtrl.Verify )

router.delete('/:id', User.DeleteUser )
router.put('/:id', User.UpdateUser )

module.exports = router
