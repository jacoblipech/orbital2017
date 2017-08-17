var mongoose = require('mongoose');
var Comment = require('./comment');
var Alternative = require('./alternative');
 //Set up the activity schema
var ActivitySchema = new mongoose.Schema({
    duration: String,
    activity: String,
    url1: String,
    url2: String,
    url3: String,
    url4: String,
    url5: String,
    expenses: String,
    address: String,
    openingHours: String,
    remarks: String,
    likes: Number,
    days: Number,
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