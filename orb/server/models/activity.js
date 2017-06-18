var mongoose = require('mongoose');
 
 //Set up the activity schema
var ActivitySchema = new mongoose.Schema({
    activity: String,
    url: String,
    expenses: String,
    address: String,
    openingHours: String,
    nearestLandmark: String,
    remarks: String,
    imageUrl: String

});

//exports the file to be used by other files
module.exports = mongoose.model('Activity', ActivitySchema);