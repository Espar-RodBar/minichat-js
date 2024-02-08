const messageModel = require('../models/messageModel')

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
  const msg = {
    id: newId,
    userId: '0',
    userName: req.body.userName,
    text: req.body.message,
    likes: 0,
  }
  messageModel.insertOne(msg).then((result) => console.log(result))

  res.redirect('/')
}
