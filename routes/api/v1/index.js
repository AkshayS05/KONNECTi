const express = require('express');

const router = express.Router();

// route to postsApi
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
module.exports = router;
