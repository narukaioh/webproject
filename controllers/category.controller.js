'use strict'

const msg 			= require('../config/messages')
const Category 		= require('../models/category.model')

const CategoryController = {
	
	GetCategories: (req, res, next) => {
		Category.find({}, (err, categories) => {
			if (err) res.json({ status: false, error: msg.CA0001 })
			res.json({ status: true, categories: categories })
		})
	},
	GetArticlesByCategory: (req, res, next) => {
		console.log("okay chegou aqui!")
		res.json({status: true, message: 'GetAllArticleByCategory'})
	},
	GetCategory: (req, res, next) => {
		Category.find({_id: req.params.id }, (err, category) => {
			if (err) res.json({ status: false, error: msg.CA0001 })
			res.json({ status: true, category: category })
		})
	},
	
	PostCategory: (req, res, next) => {
		console.log("adicionando categoria")
		const category = new Category(req.body)
		category.save(err => {
			if (err) {
				res.json({ status: false, error: msg.CA0001 })
			}else{
				res.json({ status: true, message: msg.CA0002 })
			}
		})
	},
	
	DeleteCategory: (req, res, next) => {
		Category.remove({ _id: req.params.id }, (err, category) => {
			if (err) { 
				res.json({ status: false, error: msg.CA0001 }) 
				return
			}
			res.json({ status: true, message: msg.CA0003 })
		})
	},
	
	UpdateCategory: (req, res, next) => {
		const data = req.body
		Category.findById({ _id: req.params.id }, (err, category) =>{
			category.name = data.name
			category.description = data.description
			category.save(err => {
				if (err) res.json({ status: false, error: msg.CA0001 })
				res.json({ status: true, message: msg.CA0004 })
			})
		})
	}
}

module.exports = CategoryController