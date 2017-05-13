const express 	= require('express')
const router 	= express.Router()
const ArticleCtrl  = require('../controllers/article.controller')

router.get('/', ArticleCtrl.GetArticles )
router.post('/', ArticleCtrl.PostArticle )
router.delete('/:id', ArticleCtrl.DeleteArticle )
router.put('/:id', ArticleCtrl.UpdateArticle )

module.exports = router