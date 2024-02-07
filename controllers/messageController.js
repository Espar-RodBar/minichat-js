const messageModel = require('../models/messageModel')

exports.getMessages = async (req, res) => {
  messageModel
    .find()
    .toArray()
    .then((messages) => {
      res.render('chatRoom.ejs', { messages })
    })
    .catch((error) => console.log(error))
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
