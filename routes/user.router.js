var express = require('express');
var router 	= express.Router();
var User 	= require('../controllers/user.controller');

router.get('/', User.GetUsers );
router.post('/', User.PostUser);
router.delete('/:id', User.DeleteUser );
router.put('/:id', User.UpdateUser );

module.exports = router;
