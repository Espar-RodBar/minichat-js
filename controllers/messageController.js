const messageModel = require('../models/messageModel')

exports.getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find()
      .populate({ path: 'user', select: '-__v -password' })
    res.status(200).json({ status: 'success', data: { messages } })
  } catch (error) {
    console.log(error)
  }
}
