'use strict'

const Article = require("../../models/article.model")
const msg 	= require('../../config/messages')

const MainArticle = {

    getMainArticle: (req, res, next) => {
        Article.findOne({featured: true},{}, {sort: {'date': -1}}, (err, article) => {
            if (err) {
                res.json({ status: false, message: msg.CP0001, error: err })
            }
            res.json({ status: true, article: article })
        })
    }

}

module.exports = MainArticle