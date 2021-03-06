var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Plan = require('./plan');
 
 //Set up the user schema
var UserSchema = new mongoose.Schema({
 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    plans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan"
    }]
});
 
//pre function runs the object before it is saved to database. This allows the data to be hashed before bcrpt-ed and sotred
UserSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    } 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

//Check if the password is correct by hasing the password they try to log in and compare with the hashed version
UserSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}

//exports the file to be used by other files
module.exports = mongoose.model('User', UserSchema);