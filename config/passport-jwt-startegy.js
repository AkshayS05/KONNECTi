const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

// as we need to secure the users, we also need to have user model
const User = require('../models/user');

//we need options--> 1. encryption--how we will excrypt our key.

let opts = {
  // header-has key authrorization which has bearer key c
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret_key,
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    // find the user and establish the identity
    // storing user's information in the payload in the encrypted format
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log('Error in finding user from JWT');
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
);
module.exports = passport;
