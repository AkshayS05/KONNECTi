const Comment = require('../models/comment');
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
module.exports.destroy = function (req, res) {
  // check if the user is authenticated to delete the particular post
  Post.findById(req.params.id, function (err, post) {
    // .id means converting the object into the string
    if (post.user == req.user.id) {
      post.remove();
      // Also delete the linked comments to that post
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }
  });
};
