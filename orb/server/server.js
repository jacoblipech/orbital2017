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
    var Comment = require('./models/comment');
    var Alternative = require('./models/alternative');

mongoose.connect("mongodb://localhost/orb");
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());                                     // parse application/json
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.use(methodOverride("_method"));
server.use(cors());
router(server);

server.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, UPDATE');
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

server.get("/activity/:id", function(req, res){ 
    Activity.findOne({ '_id': req.params.id }, function(err, foundActivity){ 
        if(err){ 
            console.log("error " + err); 
        }else{ 
            console.log(foundActivity); 
            res.json(foundActivity); 
        }      
    }) 
}); 

// Create activity route
server.post('/activity/:plan_id', function(req,res) {
    console.log("creating activity");
    var newActivity = {
        activity: req.body.activity,
        url: req.body.url,
        expenses: req.body.expenses,
        address: req.body.address,
        openingHours: req.body.openingHours,
        nearestLandmark: req.body.nearestLandmark,
        remarks: req.body.remarks,
        imageUrl: req.body.imageUrl,
        likes: 0,
        days: req.body.days
    }

    Activity.create(newActivity, function(err, newActivity) {
        if (err) {
            res.send(err);
        } else {
            Plan.findById(req.params.plan_id, function(err, foundPlan) { 
                if (err) { 
                    res.send(err); 
                } else { 
                    foundPlan.activities.push(newActivity); 
                    foundPlan.save(function(err, newPlan){ 
                        console.log(newPlan); 
                    }); 
                     
                    res.json(foundPlan); 
                } 
            });
        }
    });
});


//Edit activity route
server.get('/activity/:id/edit', function(req, res){
    Activity.findById(req.params.id, function(err, foundActivity){
        if(err){
            console.log("edit error " + err); 
        }else{
            res.json(foundActivity);
        }
    })
})

server.get("/comment/:id", function(req, res){ 
    Comment.findOne({ '_id': req.params.id }, function(err, foundComment){ 
        if(err){ 
            console.log("error " + err); 
        }else{ 
            console.log(foundComment); 
            res.json(foundComment); 
        }      
    }) 
}); 


server.post('/activity/:id/addcomment', function(req,res) {
    var newComment = {
        user: req.body.user,
        comment: req.body.comment,
        originActivity: req.body.originActivity
    }
    console.log(newComment);
    Comment.create(newComment, function(err, newComment) {
        if (err) {
            res.send(err);
        } else {
            Activity.findById(req.params.id, function(err, foundActivity) { 
                if (err) { 
                    res.send(err); 
                } else { 
                    foundActivity.comments.push(newComment); 
                    foundActivity.save(function(err, newActivity){ 
                        console.log(newActivity); 
                    }); 
                     
                    res.json(foundActivity); 
                } 
            });
        }
    });
})

server.post('/activity/:id/addlikes', function(req,res) {
    Activity.findById(req.params.id, function(err, foundActivity) { 
        if (err) { 
            res.send(err); 
        } else { 
            console.log(req.body.likes)
            foundActivity.likes = req.body.likes; 
            foundActivity.save(function(err, newActivity){ 
                console.log(newActivity); 
            });             
            res.json(foundActivity); 
        } 
    });
});

server.delete('/comment/:comment_id/:activity_id', function(req, res) {

    Comment.remove({
            _id : req.params.comment_id
        }, function(err, comment) {
            console.log('Comment removed');
    });
    Activity.findOne({
            _id : req.params.activity_id
        }, function(err, activity) {
            console.log(activity.comments);
            activity.comments.forEach(function(comment) {
                if (comment == req.params.comment_id) {
                    var index = activity.comments.indexOf(comment);
                    if (index > -1) {
                        activity.comments.splice(index,1);
                    }
                }
            });
            activity.save(function(err, activity){ 
                console.log(activity); 
            }); 
            console.log(activity.comments);
    });
});

server.post('/alternative/:activity_id', function(req,res) {
    console.log("creating alternative");
    var newAlternative = {
        activity: req.body.activity,
        url: req.body.url,
        expenses: req.body.expenses,
        address: req.body.address,
        openingHours: req.body.openingHours,
        nearestLandmark: req.body.nearestLandmark,
        remarks: req.body.remarks,
        imageUrl: req.body.imageUrl,
        originActivity: req.params.activity_id
    }

    Alternative.create(newAlternative, function(err, newAlternative) {
        if (err) {
            res.send(err);
        } else {
            Activity.findById(req.params.activity_id, function(err, foundActivity) { 
                if (err) { 
                    res.send(err); 
                } else { 
                    foundActivity.alternatives.push(newAlternative); 
                    foundActivity.save(function(err, newActivity){ 
                        console.log(newActivity); 
                    }); 
                     
                    res.json(foundActivity); 
                } 
            });
        }
    });
});


//Edit activity route
server.get('/alternative/:alternative_id/', function(req, res){
    Alternative.findById(req.params.alternative_id, function(err, foundAlternative){
        if(err){
            console.log("edit error " + err); 
        }else{
            res.json(foundAlternative);
        }
    })
})

//Update activity route

// Delete activity route
server.delete('/activity/:activity_id', function(req, res) {

    Activity.remove({
            _id : req.params.activity_id
        }, function(err, activity) {
            console.log('Activity removed');
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

server.post('/addUser/:plan_id/:email', function(req, res) {
        
        console.log("adding user");
        User.findOne({
            email : req.params.email
        }, function(err, user) {
            console.log(user);
            // if user exists
            if (user) {
                // push plans id into plans array of user
                user.plans.push(req.params.plan_id);
                user.save(function(err, updatedUser){ 
                    console.log(user);
                    // find plan and push found and updated user into users array of plans
                    Plan.findById(req.params.plan_id, function(err, foundPlan){
                    if(err){
                        res.send(err);
                    }else{
                        foundPlan.users.push(updatedUser);
                        foundPlan.save(function(err, newPlan){
                            if(err){
                                res.send(err);
                            } else {
                                console.log("this is the newPlan" + newPlan + "this is the newPlan");
                                res.json(newPlan);
                            }    
                        });
                    }
                }); 
            });
        }
    });
});

// server.get('/getUserPlans/:user_id', function(req,res) {
//     User.findOne({
//             _id : req.params.user_id
//         }, function(err, user) {

//         });
// });


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