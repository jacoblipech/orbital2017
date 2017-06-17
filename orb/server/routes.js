var AuthenticationController = require('./controllers/authentication'),  
    // TodoController = require('./controllers/todos'),  
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    
    // "/api/auth/register" handles registering a new user. invokes the register function in AuthenticationController
    authRoutes.post('/register', AuthenticationController.register);
    //requireLogin function ensures that the correct login details are checked before given their JWT
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.post('/logout', AuthenticationController.logout);
    authRoutes.post('/')
    
    // uses requireAuth to check if a user is authenticated by hitting this URL (Remember me functions)
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    // Set up routes
    app.use('/api', apiRoutes);
 
}