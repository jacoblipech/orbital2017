var mongoose = require('mongoose');
var Activity = require('./activity');
var User = require('./user');
 
 //Set up the user schema
var PlanSchema = new mongoose.Schema({
    country: String,
    month: String,
    days: [Number],
    users: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
    }],
    activities: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Activity"
    }]
});

//exports the file to be used by other files
module.exports = mongoose.model('Plan', PlanSchema);