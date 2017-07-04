'use strict'

const express 		= require('express')
const router 		= express.Router()
const CategoryCtrl 	= require('../controllers/category.controller')
const LoginCtrl 	= require('../controllers/login.controller')

// Rotas permitidas
router.get('/', CategoryCtrl.GetCategories )
router.get('/:slug', CategoryCtrl.GetCategory )
router.get('/:slug/articles', CategoryCtrl.GetArticlesByCategory )
router.use(LoginCtrl.Verify)

// Rotas negadas
router.post('/', CategoryCtrl.PostCategory )
router.delete('/:id', CategoryCtrl.DeleteCategory )
router.put('/:id', CategoryCtrl.UpdateCategory )

module.exports = router