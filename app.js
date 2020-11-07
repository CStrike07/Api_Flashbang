require('dotenv').config()

var express = require("express");
cors = require('cors'),
methodOverride = require("method-override"),
bodyParser=require("body-parser"),
request = require('request'),
mongoose=require("mongoose"),
User=require("./models/user"),
passport = require('passport'),
cookieSession = require('cookie-session'),


app = express();
app.use(cors())
require('./routers/passport-setup');

//mongoose.connect("mongodb://localhost/online_mart", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://CStrike07:gsoc@2020@hack02.zagid.mongodb.net/Project0?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
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
    res.redirect('/login');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});