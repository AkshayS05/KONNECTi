const express = require('express');
const router = express.Router();
const passport = require('passport');
const friendsController = require('../controllers/friendships_controller');

router.post(
  '/add-friend',
  passport.checkAuthentication,
  friendsController.createFriend,
);
module.exports = router;
