'use strict'

const mongoose 		= require('mongoose')
const Schema 		= mongoose.Schema
// Modulo para criar slugs
const slug 			= require('mongoose-slug-generator')

mongoose.plugin(slug)

const ArticleSchema = new Schema({

	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String
	},
	category: { 
		type: String, 
		required: true,
	},
	featured: {
		type: Boolean
	},
	slug: {
		type: String,
		unique: true,
		slug: 'title'
	},
	tags: [{ name: String } ],
	date: {
		type: Date,
		default: Date.now
	},
	body: {
		type: String,
		required: true
	},
	author: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comments: [
		{ 
			body: String, 
			date: Date,
			postedBy: {
				type: Schema.ObjectId,
				ref: 'User'
			} 
		}]

});


module.exports = mongoose.model('Article', ArticleSchema)