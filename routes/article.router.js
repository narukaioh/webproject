'use strict'

const express 	= require('express')
const router 	= express.Router()
const ArticleCtrl  = require('../controllers/article.controller')
const LoginCtrl = require('../controllers/login.controller')

// Rotas permitidas
router.get('/', ArticleCtrl.GetArticles )
router.get('/:slug', ArticleCtrl.GetArticle )

router.use(LoginCtrl.Verify)
// Rotas negadas
router.post('/', ArticleCtrl.PostArticle )
router.delete('/:id', ArticleCtrl.DeleteArticle )
router.put('/:id', ArticleCtrl.UpdateArticle )

module.exports = router