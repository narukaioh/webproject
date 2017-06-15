'use strict'

const express 	= require('express')
const router 	= express.Router()

const MainArticleComponent = require('./mainarticle/mainarticle.component')

router.get('/mainarticle', MainArticleComponent.getMainArticle)

module.exports = router
