// Use mongoose package for NoSQL database acccess
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction Schema
const ReactionSchema = Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        maxlength: 280,
        required: 'Please supply text for your reaction!',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'Please supply a user name!'
    }
},
{
    // allow getters
    toJSON: {
        getters: true
    },
    id: false,
    _id: false
});

module.exports = ReactionSchema;