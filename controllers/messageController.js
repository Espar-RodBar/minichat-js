const messageModel = require('../models/messageModel')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find()
    res.status(200).json({ status: 'success', data: { messages } })
  } catch (error) {
    console.log(error)
  }
}
