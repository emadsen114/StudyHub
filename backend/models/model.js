const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})


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

module.exports = mongoose.model('Data', dataSchema)
