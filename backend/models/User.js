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
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User


// **Review this plan with team**
/*
const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    account: {
        savedPosts: {
            required: false,
            type: Array
        },
        userPosts: {
            required: false,
            type: Array
        },
        post: {
            title: {
                required: true,
                type: String
            },
            description: {
                required: true,
                type: String
            },
            content: {
                required: true,
                type: String
            },
            tags: {
                required: true,
                type: Array
            },
            }
        }
        }
    }
*/

