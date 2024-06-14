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

exports.postMessage = async (req, res) => {
  try {
    console.log('onPostMsg')
    console.log('res', res)
    console.log('req', req)
    res.status(200).json({ msg: 'ok' })
    // // 2. find user in db
    // let tokenUser = await User.findById(decoded.id)
    // console.log('user who send msg with cookie token: ', tokenUser)
    // // 3.- Create the msg in db with the user
    // const result = await saveMessage(msg, MessageModel, tokenUser.id)
    // await result.populate({ path: 'user', select: '-__v -password' })
  } catch (error) {
    console.log(error)
  }
}

exports.addLike = async (req, res) => {
  try {
    console.log('Add like!')
    await messageModel.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    console.log('error on like', err)
  }
}
