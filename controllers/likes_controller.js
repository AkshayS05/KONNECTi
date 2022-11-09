const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
  try {
    // like/toggle/?id=abcd&type=Post
    let likeable;
    // it will store the type which we will further pass on to the ajax request
    let type = '';
    // deleted is used to incre or decre as per the click--> if it is true, means the user has already liked the particular post and we will decrement else vice versa
    let deleted = false;
    if (req.query.type == 'Post') {
      // if query came out to be post we will fetch the user id from the query and populate it with exisitng likes
      likeable = await Post.findById(req.query.id).populate('likes');
      type = 'Post';
    } else {
      // same goes if query is comment
      likeable = await Comment.findById(req.query.id).populate('likes');
      type = 'Comment';
    }
    // check if a like already exists on a post or a comment
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });
    // if a like already exists then delete it else make a new like
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      // make a new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
      deleted = false;
    }
    if (req.xhr) {
      return res.status(200).json({
        type: type,
        deleted: deleted,
        likeableType: likeable,
        message: 'Request successful',
      });
    }
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal server error',
    });
  }
};
