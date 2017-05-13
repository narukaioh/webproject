const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({

	title: {
		type: String,
		required: true,
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
	comments: [{ body: String, date: Date }]

});

module.exports = mongoose.model('Article', ArticleSchema)