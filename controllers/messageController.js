const messageModel = require('../models/messageModel')
const saveMessage = require('../helpers/saveMessage')

exports.getMessages = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
  const messages = []
  const message = {}
  message.id = 1
  message.text = 'hola q hase'
  message.userName = 'yo'
  message.likes = 0
  // messageModel
  //   .find()
  //   .toArray()
  //   .then((messages) => {})
  res.render('chatRoom.ejs', { messages })
}

exports.sendMessage = (req, res) => {
  saveMessage(req.body.message, messageModel, req.body.userId)
  res.redirect('/')
}
