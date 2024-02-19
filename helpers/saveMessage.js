module.exports = async function (message, messageModel, userId) {
  const msg = {
    user: userId,
    text: message,
    likes: 0,
  }
  try {
    const result = await messageModel(msg)
    result.save()
    return result
  } catch (e) {
    console.log('error inserting message.', e)
  }
}
