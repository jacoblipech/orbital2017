var express =require("express"),
    server = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/orb");
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());                                     // parse application/json
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.use(methodOverride());
server.use(cors());
router(server);

server.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

//Database to be stored for a new page
var PlanSchema = new mongoose.Schema({
	country: String,
	month: Date,
	days: {
		type: Number, min: 1, max: 15
	}
});

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

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
var Plan = mongoose.model("Plan", PlanSchema);
var Activity = mongoose.model("Activity", ActivitySchema);

server.get('/', function(req,res){
	  res.send('index');
});

// Get plans route
server.get('/plan', function(req, res) {
	
	console.log("fetching plan");
        // use mongoose to get all reviews in the database
        Plan.find(function(err, plan) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err)
            }else{
            	Plan.findById(plan._id, function(err, plan) {	
            		if (err){
            			res.send(err);
            		}
                	res.json(plan);
            	});
            }
        });
});

// Create plan route
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

// Create activity route
server.post('/activity', function(req,res) {
    console.log("creating activity");
    var newActivity = {
        activity: req.body.activity,
        url: req.body.url,
        expenses: req.body.expenses,
        address: req.body.address,
        openingHours: req.body.openingHours,
        nearestLandmark: req.body.nearestLandmark,
        remarks: req.body.remarks,
        imageUrl: req.body.imageUrl
    }

    Activity.create(newActivity, function(err, newActivity) {
        if (err) {
            res.send(err);
        } else {
            Activity.findById(newActivity._id, function(err,activity) {
                if (err){
                        res.send(err);
                }
                res.json(activity);
            });
        }
    });
});

// Delete activity route
server.delete('/activity/:activity_id', function(req, res) {
        Activity.remove({
            _id : req.params.activity_id
        }, function(err, activity) {
 
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