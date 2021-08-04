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
  categories: {
    type: [String],
  },
  links: {
    type: [String],
  },
  sections: [
    {
      name: {
        type: String,
        required: true,
      },
      isAdopt: {
        type: Boolean,
        default: false,
      },
      isAnswer: {
        type: Boolean,
        default: false,
      },
      posts: [
        {
          post: {
            type: Schema.Types.ObjectId,
            ref: 'post',
          },
        },
      ],
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  fansName: {
    type: String,
    default: 'follower',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Page = mongoose.model('page', PageSchema);
