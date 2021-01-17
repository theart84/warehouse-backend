const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  create_At: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);