const messageModel = require('../models/messageModel')
const saveMessage = require('../helpers/saveMessage')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find()
    console.log(messages)
    res.render('chatRoom.ejs', { messages })
  } catch (error) {
    console.log(error)
  }
}

exports.sendMessage = (req, res) => {
  saveMessage(req.body.message, messageModel, req.body.userId)
  res.redirect('/')
}
