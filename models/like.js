const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    //   this defines the objectid of the liked object
    Likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      // in order to declare dynamic reference
      refPath: 'onModel',
    },
    //   this field is used to define the type of the liked object,since this is a dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: ['Post', 'Comment'],
    },
  },
  {
    timestamps: true,
  },
);
const like = mongoose.model('Like', likeSchema);

module.exports = Like;
