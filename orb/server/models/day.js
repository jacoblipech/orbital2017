var mongoose = require('mongoose');
 var Activity = require('./activity');
 //Set up the activity schema
var DaySchema = new mongoose.Schema({
    activities: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Activity"
    }]
    
});

//exports the file to be used by other files
module.exports = mongoose.model('Day', DaySchema);