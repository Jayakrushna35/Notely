const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
  }

));

// Define routes using the router object
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email' ,'profile'] }));
  
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard'
    })
);

router.get("/login-failure", (req, res) => {
    res.send("Something went wrong ...");
});

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.FindById(id,function (err,user){
        done(err,user);
    })
});

module.exports = router;