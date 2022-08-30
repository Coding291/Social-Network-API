const { Schema, model } = require('mongoose');
const UserSchema = new Schema ({
 
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [ /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please supply a valid email address!']
      },
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
    // an array of _id references pointing to other User documents
      friends: [{ type: Schema.Types.ObjectId, ref: 'User'}],
      
    },
    {
        // allow virtuals
        toJSON: {
            virtuals: true
        },
        id: false

})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });



const User = model('user', UserSchema);







module.exports = User;