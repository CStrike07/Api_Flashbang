const passport = require('passport');
var cors = require('cors');
var User=require("../models/user"),
request = require('request');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(cors())
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({ 
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://peaceful-river-76585.herokuapp.com/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

      request({uri:"https://people.googleapis.com/v1/people/me", headers:{Authorization:` Bearer ${accessToken}`},qs:{personFields:"birthdays,genders"}},(err,response,body)=>{
          if(err){
              console.log(err);
          }else{           
              User.findOne({$or:[{username:profile.emails[0].value},{googleID: profile.id}]},(err,user)=>{
                  if(err){
                      return cb(err);
                  }
                  if(!user){
                      user = new User({
                          googleID: profile.id,
                          username:profile.emails[0].value,
                          profile_complete:false
                      });

                      user.save(err=>{
                          if(err){
                              console.log(err);
                          }
                          return cb(err,user);
                      })
                  }else{
                      if(user.googleID==null){
                          user.googleID = profile.id;
                          user.save(err=>{
                              if(err){
                                  console.log(err);
                              }
                              return cb(err,user);
                          });
                      }else{
                          return cb(err,user);
                      }
                      
                  }
              })
          }
      } )
      
  }
));