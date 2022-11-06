const express = require('express');

const router = express.Router();

// postApis controller route
const postsApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');
router.get('/', postsApi.index);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  postsApi.destroy,
);

module.exports = router;
