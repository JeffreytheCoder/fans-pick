const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  links: {
    type: [String]
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Page = mongoose.model('page', PageSchema);