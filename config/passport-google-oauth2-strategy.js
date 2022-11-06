const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new startegy for gogole login
passport.use(
  new googleStrategy({}, function (accessToken, refreshToken, profile, done) {
    // find a user
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
      if (err) {
        console.log('Error in google strategy-passport');
        return;
      }
      console.log(profile);
      // if user has been found, set this user as req.user
      if (user) {
        return done(null, user);
      } else {
        // if not found,create the user and set it as req.user
        User.create(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          },
          function (err, user) {
            if (err) {
              console.log('Error in creating user', err);
              return;
            }
            return done(null, user);
          },
        );
      }
    });
  }),
);
module.exports = passport;
