const User = require('../models/user');

module.exports.profile = function (req, res) {
  // locate the user
  User.findById(req.params.id, function (err, user) {
    // cannot name it user as we already have user in local
    return res.render('user_profile', {
      title: 'Profile',
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = User.findById(req.params.id);
      // form can not handle multipart data, thus for that we will use multer
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log('***Multer Error', err);
        }
        // store the file alongside the user
        user.name = req.body.name;
        user.email = req.user.email;
        if (req.file) {
          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
      });
    } catch (err) {
      req.flash('Error', err);
      res.redirect('back');
    }
  } else {
    req.flash('error', err);
    return res.status(401).send('Unauthorized');
  }
};
const checkIfUserExists = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
};
module.exports.signIn = function (req, res) {
  checkIfUserExists(req, res);
  res.render('user_sign_in', {
    title: 'KonnectI | Sign in',
  });
};
module.exports.signUp = function (req, res) {
  checkIfUserExists(req, res);
  res.render('user_sign_up', {
    title: 'KonnectI | Sign Up',
  });
};
// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', 'Error creating your account');

    return res.redirect('back');
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash('error', 'Error in finding you!');
      return res.redirect('back');
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash('error', 'Error creating your account');
          return res.redirect('back');
        }
        req.flash('success', 'User created successfully!');
        return res.redirect('/users/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};
// user sign in and create session
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in successfully!');
  // in order to send a flash message to the front end--we will create our custom middleware in config
  return res.redirect('/');
  // next is to go to routes
};
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have logged out successfully!');
    // in order to send a flash message to the front end--we will create our custom middleware in config
    res.redirect('/');
  });
};
