const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/post_controller');
// router.get('/post', usersController.post);
router.post(
  '/create-post',
  passport.checkAuthentication,
  postController.createPost,
);

module.exports = router;
