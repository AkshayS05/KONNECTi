const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentsEmailWorker = require('../workers/comment_email_worker');
module.exports.createComment = async function (req, res) {
  // find the post on which user wants to add a comment,--check if that post actually exists in the database
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      //   whenever we update something, we need to save that update
      post.save();
      //   adding comment to the post
      comment = await comment.populate('user', 'name email');
      // commentsMailer.newComment(comment);
      // as soon as job is created, job id gets stored inside job
      let job = queue.create('emails', comment).save(function (err) {
        if (err) {
          console.log('Error in sending to the queue', err);
          return;
        }
        console.log('Job is enqueued', job.id);
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: 'Comment Created',
        });
      }
      req.flash('success', 'Comment posted successfully!');

      res.redirect('/');
    }
  } catch (err) {
    req.flash('error', 'Error posting a comment!');
    return res.redirect('back');
  }
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
      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: 'Post deleted',
        });
      }
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
