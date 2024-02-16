const messageModel = require('../models/messageModel')
const saveMessage = require('../helpers/saveMessage')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find()
    res.status(200).json({ status: 'success', data: { messages } })
  } catch (error) {
    console.log(error)
  }
}
