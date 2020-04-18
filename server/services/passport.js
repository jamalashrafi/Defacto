const passport = require('passport');
const userModel = require('../models/user.js');
const config = require("../config.js");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local');

//Create LocalStrategy

var loginOption = { usernameField : "userName"}
var localLogin = new LocalStrategy(loginOption, function(userName, password, done){
    console.log("user1", userName);
    userModel.findOne({ userName : userName }, function(err, user){
        console.log("user2", err);
        console.log("user4", user);
        if(err) return done(err, { message : "We are facing an issue, please try again..."});

        if(!user){console.log("user1", userName); return done(null, false, {message : " Invalid credentials "});}
        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err, { message : "We are facing an issue, please try again..."});
            if(!isMatch) return done(null, false, {message : " Invalid credentials "})
            return done(null, user, { message : "successful login" })
        });
    })  
})
//Set options for jwt strategy. Takes JWT token from request header and use secret key to decode and get userid.
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};
console.log("jwtFromRequest", jwtOptions)
//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

//See if the UserID in the payload exists in our DB
//If it does call done with that 
//otherwise call done without that

userModel.findById(payload.sub
    , function(err, user){
    if(err){ return done(err, false);}

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
