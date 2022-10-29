const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function (req, res) {
  // find the post on which user wants to add a comment,--check if that post actually exists in the database
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          // handle error
          //   adding comment to the post
          post.comments.push(comment);
          //   whenever we update something, we need to save that update
          post.save();
          res.redirect('/');
        },
      );
    }
  });
};
module.exports.destroyComment = function (req, res) {
  // check if the user is authenticated to delete the particular comment
  Comment.findById(req.params.id, function (err, comment) {
    // .id means converting the object into the string
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      //pulling out the id of the comment which is deleted from the post as well.
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return redirect('back');
        },
      );
    } else {
      return res.redirect('back');
    }
  });
};
