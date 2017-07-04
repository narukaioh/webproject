'use strict'

const mongoose 		= require('mongoose')
const Schema 		= mongoose.Schema
// Modulo para criar slugs
const slug			= require('mongoose-slug-generator')

mongoose.plugin(slug)

const CategorySchema = new Schema({
	name: {
		type: String,
		require: true
	},
	description: String,
	slug: {
		type: String,
		unique: true,
		slug: 'name'
	},
	articles: [
		{ type: Schema.ObjectId, ref: 'Article' }
	]
})

module.exports = mongoose.model('Category', CategorySchema)