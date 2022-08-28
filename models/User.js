const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({


})

const User = model('user', UserSchema);

module.exports = User;