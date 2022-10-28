const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
// router.get('/post', usersController.post);
router.post('/create-post', postController.createPost);

module.exports = router;
