const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
  try {
    // like/toggle/?id=abcd&type=Post
    let likeable;
    // deleted is used to incre or decre as per the click--> if it is true, means the user has already liked the particular post and we will decrement else vice versa
    let deleted = false;
    if (req.query.type == 'Post') {
      likeable = await Post.findById(req.query.id).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.id).populate('likes');
    }
    // check if a like already exists
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
      likeable.likes.push(like._id);
      likeable.save();
    }
    return res.json(200, {
      message: 'Request successful',
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal server error',
    });
  }
};
