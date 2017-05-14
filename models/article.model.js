const mongoose 		= require('mongoose')
const slug 			= require('mongoose-slug-generator')

mongoose.plugin(slug)

const ArticleSchema = mongoose.Schema({

	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String
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
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User'
	},
	comments: [
		{ 
			body: String, 
			date: Date,
			postedBy: {
				type: mongoose.Schema.Type.ObjectId,
				ref: 'User'
			} 
		}]

});


module.exports = mongoose.model('Article', ArticleSchema)