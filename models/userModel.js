const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'A user name is required.'],
    unique: [true, 'this user name already exist.'],
  },
  password: {
    type: String,
  },
})

module.exports = mongoose.model('User', userSchema)
