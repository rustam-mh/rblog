var mongoose = require("libs/mongoose");

var PostSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	body: {
		type: String
	},
	modified: {
		type: Date,
		default: Date.now
	},
	author: {}
});

module.exports = mongoose.model('Post',PostSchema);
