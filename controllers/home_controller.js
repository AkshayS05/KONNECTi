const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
  try {
    // in order to get the name of the one of posted, we will use mongoose populate
    let posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });
    let users = await User.find({});
    return res.render('home', {
      title: 'KONNECTi | Home',
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('Error', err);
  }
};
