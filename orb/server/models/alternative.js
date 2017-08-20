var mongoose = require('mongoose');
 var Activity = require('./activity');
 //Set up the activity schema
var AlternativeSchema = new mongoose.Schema({
	user: String,
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
    originActivity: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Activity"
    }    
});

//exports the file to be used by other files
module.exports = mongoose.model('Alternative', AlternativeSchema);