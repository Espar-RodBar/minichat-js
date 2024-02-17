module.exports = async function (message, messageModel, userId) {
  const msg = {
    user: userId,
    text: message,
    likes: 0,
  }
  console.log('on save msg:', msg)
  try {
    const result = await messageModel(msg)
    result.save()
    return result
  } catch (e) {
    console.log('error inserting message.', e)
  }
}
