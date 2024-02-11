const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

// hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  console.log('pre save password', this.password)
  next()
})

module.exports = mongoose.model('User', userSchema)
