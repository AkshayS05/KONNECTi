const Post = require('../models/post');

// controller for post-- get the data from the form, save it into the database and mark the user

module.exports.createPost = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log('Error in creating a post');
        return;
      }
      return res.redirect('back');
    },
  );
};
