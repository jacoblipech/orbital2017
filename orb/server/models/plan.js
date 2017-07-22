var mongoose = require('mongoose');
var Day = require('./day');
var User = require('./user');
  var Activity = require('./activity');
 //Set up the user schema
var PlanSchema = new mongoose.Schema({
    country: String,
    month: String,
    days: [Number],
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    }],
    users: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
    }],
    

});

//exports the file to be used by other files
module.exports = mongoose.model('Plan', PlanSchema);