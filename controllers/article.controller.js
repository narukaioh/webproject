const msg 	= require('../config/messages')
const Article = require('../models/article.model')
const assert = require('assert')


const ArticleController = {

	GetArticles: 	(req, res, next) => {
		console.log("aqui esta sendo enviada alguma coisa!");
		Article.find({}, (err, articles) => {
			if (err) res.json({ status: false, error: msg.PS0001 })
			res.json({ status: true, articles: articles })
		})
	},
	PostArticle: 	(req, res, next) => {
		const article = new Article(req.body)
		article.save((err) => {
			if (err) res.json({ status: false, error: msg.PS0001 })
			res.json({ status: true, message: msg.PS0002 })
		})
	},
	DeleteArticle: (req, res, next) => {
		Article.remove( {_id: req.params.id }, (err, article) => {
			if (err) {
				res.json({ status: false, error: msg.PS0001 })
				return
			}
			res.json({ status: true, message: msg.PS0003 })
		})
	},
	UpdateArticle: (req, res, next) => {
		console.log("testar essa funcao")
		const data = req.body;
		console.log(data);
		Article.findById({ _id: req.params.id }, (err, article) => {
			console.log(article);
			article.title = data.title;
			article.body = data.body;
			article.tags = data.tags;
			article.save((err, article) => {
				if (err) res.json({status: false, error: msg.PS0001 })
				res.json({ status: true, message: msg.PS0004 })
			})
		})
	}
}

module.exports = ArticleController
