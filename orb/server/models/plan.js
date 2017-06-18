var mongoose = require('mongoose');
 
 //Set up the user schema
var PlanSchema = new mongoose.Schema({
    country: String,
    month: Date,
    days: {
        type: Number, min: 1, max: 15
    }
});

//exports the file to be used by other files
module.exports = mongoose.model('Plan', PlanSchema);