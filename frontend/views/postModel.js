const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  author: String,
  tags: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  draft: Boolean, // set to true if the post is a draft, set to false when ready to publish
  comments: String //**NEW */
});

module.exports = mongoose.model('Post', postSchema);