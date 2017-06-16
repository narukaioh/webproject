'use strict'

const Article = require("../../models/article.model")
const msg     = require("../../config/messages")

const LastArticles = {
    getLastArticles: (req, res, next) => {
        Article.find({},{},{ sort: { 'date': -1 }, limit: 5 }, (err, articles) => {
            if (err) {
                res.json({status: false, message: '', error: err })
            }
            res.json({ status: true, articles: articles })
        })
    }
}

module.exports = LastArticles