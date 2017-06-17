var passport = require('passport');
var User = require('../models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
 
var localOptions = {
    usernameField: 'email'
};

//findOne method to find a user in the database with the same email! If cannot find, return err
//if we find the user, comparePassword function will check if it is correct or not
var localLogin = new LocalStrategy(localOptions, function(email, password, done){
 
    User.findOne({
        email: email
    }, function(err, user){
 
        if(err){
            return done(err);
        } if(!user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        } 
        user.comparePassword(password, function(err, isMatch){
 
            if(err){
                return done(err);
            }
 
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
            return done(null, user);
 
        });
 
    });
 
});

//extractJwt is a function to extract the JWT sent with the request and use secret to check its validity
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
    //secret is obtained from the code in config/auth.js
};

//use the _id from JWT to check for matching users in dataase with that id
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
 
    User.findById(payload._id, function(err, user){
 
        if(err){
            return done(err, false);
        }
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});
 
passport.use(jwtLogin);
passport.use(localLogin);