const mongoose = require('mongoose');

const postScehma = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Like',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postScehma);
module.exports = Post;
