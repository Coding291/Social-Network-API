const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema ({
        thoughtText: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          },
        userName: {
            type: String,
            required: true,
          }, 
        reactions: [ ReactionSchema ],

        
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
        )
 

    
ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;