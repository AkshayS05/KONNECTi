const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//authenticate using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log('Error in fidning a user -->Passport');
          return done(err);
        }
        if (!user || user.password != password) {
          console.log('Invalid username or password');
          return done(null, false);
        }
        return done(null, user);
      });
    },
  ),
);
// serializing the user to decide which is key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding the user');
      return done(err);
    }
    return done(null, user);
  });
});
// // sending data to the current signed in data to the views
//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect('/users/sign-in');
};
// if the user is authenticated
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // transferring the user to locals as it is not automatically being transferred
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
