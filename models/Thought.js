const { Schema, model } = require('mongoose');
//Here we import ReactionSchema 
const ReactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

//Here we created THought Schema
const ThoughtSchema = Schema ({
        thoughtText: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          },
        username: {
            type: String,
            required: true,
          }, 
        reactions: [ ReactionSchema ],

        
    },
        {
            //here we add getters and set virtuals to true
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
        )
 

   //added virtuals 
ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });
//call the model
const Thought = model('thought', ThoughtSchema);
//export the file
module.exports = Thought;