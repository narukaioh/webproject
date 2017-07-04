'use strict'

const express 	= require('express')
const router 	= express.Router()

const MainArticleComponent  = require('./mainarticle/mainarticle.component')
const PortfolioComponent    = require('./portfolio/portfolio.component')
const LastArticlesComponent = require('./lastarticles/lastarticles.component')

router.get('/mainarticle', MainArticleComponent.getMainArticle)
router.get('/portfolio', PortfolioComponent.getPortfolio)
router.get('/lastarticles', LastArticlesComponent.getLastArticles)

module.exports = router
