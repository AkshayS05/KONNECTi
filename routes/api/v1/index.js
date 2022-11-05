const express = require('express');

const router = express.Router();

// route to postsApi
router.use('/posts', require('./posts'));
module.exports = router;
