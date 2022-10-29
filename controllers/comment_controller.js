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
