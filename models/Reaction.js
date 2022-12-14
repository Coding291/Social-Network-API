// Use mongoose package for NoSQL database acccess
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction Schema
const ReactionSchema = Schema({
    //we created columns for schema
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        maxlength: 280,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
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
//here we export it
module.exports = ReactionSchema;