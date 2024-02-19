const messageModel = require('../models/messageModel')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find()
      .populate({ path: 'user', select: '-__v -password' })
    console.log(messages)
    res.status(200).json({ status: 'success', data: { messages } })
  } catch (error) {
    console.log(error)
  }
}
