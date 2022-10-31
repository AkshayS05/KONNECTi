const Post = require('../models/post');
const User = require('../models/user');
// in order to get the name of the one of posted, we will use mongoose populate
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 22);
  // Post.find({}, function (err, posts) {
  //   return res.render('home', { title: 'KONNECTi | Home', posts: posts });
  // });
  Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render('home', {
          title: 'KONNECTi | Home',
          posts: posts,
          all_users: users,
        });
      });
    });
};
