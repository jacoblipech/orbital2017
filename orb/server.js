var express =require("express"),
    server = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/orb");
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());                                     // parse application/json
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.use(methodOverride());
server.use(cors());
// router(server);

server.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var PlanSchema = new mongoose.Schema({
	country: String,
	month: String,
	days: {
		type: Number, min: 1, max: 15
	}
})

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
var Plan = mongoose.model("Plan", PlanSchema);

server.get('/', function(req,res){
	  res.send('index');
});

server.get('/plan', function(req, res) {
	
	console.log("fetching plan");
        // use mongoose to get all reviews in the database
        Plan.find(function(err, plan) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err)
            }else{
            	Plan.findById(newPlan._id, function(err, plan) {	
            		if (err){
            			res.send(err);
            		}
                	res.json(plan);
            	});
            }
        });
});

server.post('/plan', function(req, res) {
 
        console.log("creating a plan");
 
        // create a plan
        var newPlan = {
        	country : req.body.country,
            month : req.body.month,
            days : req.body.days
        } 
        Plan.create(newPlan, function(err, newPlan) {
            if (err){
                res.send(err);
            }else{
            	Plan.findById(newPlan._id, function(err, plan) {	
            		if (err){
            			res.send(err);
            		}
                	res.json(plan);
            	});
            }
        });
 
});

// server.use('/api', apiRouter);
// server.use(express.static('public'));

server.get('/login', function(req, res){
	res.send('this is an login page');
});

server.listen(3000, function() {
  console.log('Status: Online');
});