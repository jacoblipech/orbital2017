var mongoose = require('mongoose');
var Comment = require('./comment');
var Alternative = require('./alternative');
 //Set up the activity schema
var ActivitySchema = new mongoose.Schema({
    activity: String,
    url: String,
    expenses: String,
    address: String,
    openingHours: String,
    nearestLandmark: String,
    remarks: String,
    imageUrl: String,
    likes: Number,
    comments: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Comment"
    }],
    
    alternatives: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Alternative"
    }]
});

//exports the file to be used by other files
module.exports = mongoose.model('Activity', ActivitySchema);