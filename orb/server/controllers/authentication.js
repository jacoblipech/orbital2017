var jwt = require('jsonwebtoken');  
var User = require('../models/user');
var authConfig = require('../config/auth');
 
//generate a JWT for the user to be used
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

//set up only required information for JWT
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
    };
}
 
//send the JWT back to the user so that they can use it to authenticate each request
//actual login logic is handled by passport so when login function is used, authentication is already done.
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}
 
// takes in the request and create a new user with the same email address if valid
// save function will call the "pre" function first before hasing the data and saved to the database
exports.register = function(req, res, next){
 
    var email = req.body.email;
    var password = req.body.password;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
    User.findOne({email: email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
        var user = new User({
            email: email,
            password: password,
            //this password is unhashed but before save function is called, it will be passed to pre function to hash it
        });
 
        user.save(function(err, user){
            if(err){
                return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}

exports.logut = function(req, res){
    this.user = null;
    //the question is where does we store this local storage function?
    //Local storage.clear()
}