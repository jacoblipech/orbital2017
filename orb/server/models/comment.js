var mongoose = require('mongoose');
 var Activity = require('./activity');
 //Set up the activity schema
var CommentSchema = new mongoose.Schema({
	user: String,
	comment: String,
    originActivity: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Activity"
    }    
});

//exports the file to be used by other files
module.exports = mongoose.model('Comment', CommentSchema);