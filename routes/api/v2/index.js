const express = require('express');

const router = express.Router();
router.use('/samplePosts', require('./sample_posts'));
module.exports = router;
