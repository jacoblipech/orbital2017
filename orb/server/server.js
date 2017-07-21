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

    var databaseConfig = require('./config/database');
    var router = require('./routes');
    var Plan = require('./models/plan');
    var Activity = require('./models/activity');
    var User = require('./models/user');

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

server.get('/', function(req,res){
	  res.console('index');
});

// Get plans route
// server.get('/plan', function(req, res) {
	
// 	console.log("fetching plan");
//         // use mongoose to get all reviews in the database
//         Plan.find(function(err, plan) {
//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err){
//                 res.send(err)
//             }else{
//             	Plan.findById(plan._id, function(err, plan) {	
//             		if (err){
//             			res.send(err);
//             		}
//                 	res.json(plan);
//             	});
//             }
//         });
// });

server.get("/edit/:id", function(req, res){
User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log("error " + err);
        }else{
            res.json(foundUser);
        }     
    })
});

// Create plan route
server.post('/edit/:id', function(req, res) {
        
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
                User.findById(req.params.id, function(err, foundUser){
                if(err){
                    res.send(err);
                }else{
                    
                    foundUser.plans.push(newPlan);
                    foundUser.save(function(err, newUser){
                        if(err){
                            res.send(err);
                        }
                        newPlan.users.push(newUser);
                        newPlan.save(function(err, newPlan) {
                            
                        });
                        console.log("this is the newPlan" + newPlan + "this is the newPlan");
                        res.json(newPlan);
                    })
                }
            } 
        );     
            // Plan.findById(newPlan._id).populate("plans").exec(function(err, plan) {    
            //     if (err){
            //         res.send(err);
            //     }
            //     console.log(" i am doing something " + plan + " i am doing something ");
            //     res.json(plan);
            // });
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


server.get("/plan/:id", function(req, res){
Plan.findById(req.params.id, function(err, foundPlan){
        if(err){
            console.log("error " + err);
        }else{
            res.json(foundPlan);
        }     
    })
});

// Campground.findById(req.params.id, function(err, foundCampground){
        //     if(err){
        //         res.redirect("/campgrounds")
        //     }else{
        //         res.render("campgrounds/edit", {campground: foundCampground});
        //     }
        // });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

server.get('/login', function(req, res){
	res.send('this is an login page');
});

server.listen(3000, function() {
  console.log('Status: Online');
});