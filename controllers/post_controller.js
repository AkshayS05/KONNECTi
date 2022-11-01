const Comment = require('../models/comment');
const Post = require('../models/post');

// controller for post-- get the data from the form, save it into the database and mark the user

module.exports.createPost = async function (req, res) {
  try {
    let newPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    // check if the user is authenticated to delete the particular post
    let postToBeDeleted = await Post.findById(req.params.id);
    // .id means converting the object into the string
    if (postToBeDeleted.user == req.user.id) {
      postToBeDeleted.remove();
      // Also delete the linked comments to that post
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
