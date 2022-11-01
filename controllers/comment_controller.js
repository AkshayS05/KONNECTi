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
          if (err) {
            req.flash('error', 'Error posting a comment!');
            return res / redirect('back');
          }
          //   adding comment to the post
          req.flash('success', 'Comment posted successfully!');

          post.comments.push(comment);
          //   whenever we update something, we need to save that update
          post.save();
          res.redirect('/');
        },
      );
    }
  });
};
module.exports.destroyComment = async function (req, res) {
  try {
    // check if the user is authenticated to delete the particular comment
    let comment = await Comment.findById(req.params.id);
    // .id means converting the object into the string
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      //pulling out the id of the comment which is deleted from the post as well.
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash('success', 'Comment Deleted successfully!');

      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', 'Unable to delete your comment!');

    return res.redirect('back');
  }
};
