const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile',
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
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: { 
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  subPosts: [
    {
      post: { 
        type: Schema.Types.ObjectId,
        ref: 'post'
      },
    }
  ],
  superPost: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema);