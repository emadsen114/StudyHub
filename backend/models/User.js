// user.js
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  savedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // array of Posts
})

const User = mongoose.model('User', UserSchema)
module.exports = User