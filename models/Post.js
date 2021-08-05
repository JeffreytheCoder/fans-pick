const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'page',
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  subPosts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
      },
    },
  ],
  superPost: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  section: {
    type: String,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
  answered: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
