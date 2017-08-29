const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose'); //maybe should be above keys req


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});


passport.use( 
    // Use the google oauth, using the clientID, secret and callback... then pass in accesstoken, refreshtokn, profile and done will match function
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {

        // query the db to make sure this profile id doesn't exist already
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser){
                    //if a record is found with the given profileId... existing user is just the model that is formed from the findOne via promises
                    done(null, existingUser);
                } else {
                    // Create new user here, since existingUser was not found
                    new User({ googleId: profile.id })
                        .save()
                            .then(user => done(null, user));
                }
            })

        
    })
);
