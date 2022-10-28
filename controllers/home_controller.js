const Post = require('../models/post');
// in order to get the name of the one of posted, we will use mongoose populate
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 22);
  // Post.find({}, function (err, posts) {
  //   return res.render('home', { title: 'KONNECTi | Home', posts: posts });
  // });
  Post.find({})
    .populate('user')
    .exec(function (err, posts) {
      return res.render('home', {
        title: 'KONNECTi | Home',
        posts: posts,
      });
    });
};
