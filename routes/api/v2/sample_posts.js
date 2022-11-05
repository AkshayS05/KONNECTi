const express = require('express');

const router = express.Router();

const samplePosts = require('../../../controllers/api/v2/sample_api');
router.get('/', samplePosts.index);
module.exports = router;
