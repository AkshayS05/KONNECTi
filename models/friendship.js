const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
    // the user who sent this req
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    //   the user who accepts the req
    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
const Friendship = mongoose.model('friend', friendSchema);
module.exports = Friendship;
