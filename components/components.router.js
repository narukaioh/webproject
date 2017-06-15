'use strict'

const express 	= require('express')
const router 	= express.Router()

const MainArticleComponent = require('./main-article/main-article.component')

router.get('/mainarticle', MainArticleComponent.getMainArticle)

module.exports = router
