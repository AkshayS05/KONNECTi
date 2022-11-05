const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    });
  return res.json(200, {
    message: 'List of posts',
    posts: posts,
  });
};
//deleting the whole post
module.exports.destroy = async function (req, res) {
  try {
    Post.remove();
    // Also delete the linked comments to that post
    await Comment.deleteMany({ post: req.params.id });
    return res.json(200, {
      message: 'Posts and associated comments deleted successfully',
    });
  } catch (err) {
    console.log('******', err);
    return res.json(500, {
      message: 'Internal server error',
    });
  }
};
