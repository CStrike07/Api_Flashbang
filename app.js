require('dotenv').config()
var express = require("express");
const review = require('./models/review');
cors = require('cors'),
methodOverride = require("method-override"),
bodyParser=require("body-parser"),
request = require('request'),
mongoose=require("mongoose"),
User=require("./models/user"),
Review=require("./models/review"),
Job=require("./models/job"),
webpush=require('web-push'),
path=require('path'),
passport = require('passport'),
cookieSession = require('cookie-session'),
app = express();
app.use(cors());
require('./routers/passport-setup');
//mongoose.connect("mongodb://localhost/hack_2", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://CStrike07:gsoc@2020@cluster0.kwgfz.mongodb.net/Project0?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
var port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

  const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res) => res.send('You Failed to log in!'));

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/profile');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

//Notifiaction
const publicVapidKey='BOj2djam2oukKi7vqdbCdnFt7g4oF0RkfFDIRcurt0XVgjjHxcV43RRrB4nzOLuAJqEe9Aieconkic7bdaH35oc';
const privateVapidKey='Y4EF2-80Rkoo00xcAwg7vBefdP8s6ZLEsN43QnTyuIk';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Push Test" });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.get('/login', (req, res) => {
    res.render("login");
});
app.get('/', (req, res) => {
  res.render("landing");
});
//all listed users
app.get("/index", function(req, res){
  User.find({}, function(err, users){
    if(err){
        console.log("ERROR!");
    } else {
        res.render("index", {users: users, currentUser: req.user});
    }
});
});

app.get("/users/:id", isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, foundUser){
    if(err){
        console.log("ERROE!");
    }else{
        res.render("show", {user: foundUser});
    }
});
});

//User Profile

app.get("/profile", isLoggedIn, function(req,res){
  User.find({"_id": req.user._id}, function(err, users){
    if(err){
        console.log("ERROR!");
    } else {
        res.render("profile", {users: users, currentUser: req.user});
    }
});
});

app.get("/users/:id/edit", isLoggedIn, function(req,res){
  User.findById(req.params.id, function(err, foundUser){
      if(err){
          console.log("ERROE!");
      }else{
          res.render("edit", {user: foundUser});
      }
  });
});

app.put("/users/:id", isLoggedIn, function(req,res){
 User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updated){
  if(err){
      console.log("ERROR!");
  }else{
      res.redirect("/profile");
  }
 });
});

//Reviews Routes

app.get("/users/:id/reviews/new", isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log("err");
    }else{
      res.render("demo2", {user: user});
    }
  });
});

app.post("/users/:id/reviews", isLoggedIn, function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log("err");
    }else{
      Review.create(req.body.review, function(err, review){
        if(err){
          console.log("err");
        }else{
          user.reviews.push(review);
          user.save();
          res.redirect("/profile");
        }
      })
    }
  });
});

//Job Posting

app.get("/alljobs", function(req,res){
  Job.find({}, function(err, jobs){
      if(err){
          console.log("ERROR!");
      } else {
          res.render("job", {jobs: jobs});
      }
  });
});

app.get("/myjobs", isLoggedIn, function(req,res){
  Job.find({"author.id": req.user._id}, function(err, jobs){
      if(err){
          console.log("ERROR!");
      } else {
          res.render("myjobs", {jobs: jobs, currentUser: req.user});
      }
  });
});

app.get("/add", isLoggedIn, function(req,res){
  res.render("add");
});

app.post("/jobs", isLoggedIn, function(req,res){
  var name=req.body.name;
    var companey=req.body.companey;
    var location=req.body.location;
    var address=req.body.address;
    var contactNo=req.body.contactNo; 
    var title=req.body.title;
    var email=req.body.email;
    var description=req.body.description;
    var salary=req.body.salary;
    var requirements=req.body.requirements;
    var applyLink=req.body.applyLink;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newaddJob={companey:companey,location:location,address:address,contactNo:contactNo,email:email,title:title,description:description,salary:salary,requirements:requirements,applyLink:applyLink,author:author};
  Job.create(newaddJob, function(err, newJob){
      if(err){
          console.log("ERROR!");
      }else {
          res.redirect("/alljobs");
      }
  });
});

app.get("/jobs/:id/editjob", isLoggedIn, function(req,res){
  Job.findById(req.params.id, function(err, foundJob){
      if(err){
          console.log("ERROE!");
      }else{
          res.render("editjob", {job: foundJob});
      }
  });
});

app.put("/jobs/:id", isLoggedIn, function(req,res){
 Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, updated){
  if(err){
      console.log("ERROR!");
  }else{
      res.redirect("/alljobs");
  }
 });
});

app.delete("/jobs/:id", isLoggedIn, function(req,res){
  Job.findByIdAndRemove(req.params.id, function(err){
      if(err){
      console.log("ERROR!");
      }else{
          res.redirect("/alljobs");
      }
  });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});