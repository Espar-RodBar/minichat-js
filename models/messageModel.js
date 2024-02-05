const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  text: String,
  deleted: { type: Boolean, default: false },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
})

module.exports = mongoose.model('Message', messageSchema)
