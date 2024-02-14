const messageModel = require('../models/messageModel')
const saveMessage = require('../helpers/saveMessage')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find()
    res.render('chatRoom.ejs', { messages })
  } catch (error) {
    console.log(error)
  }
}
