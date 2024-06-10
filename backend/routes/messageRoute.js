const express = require('express')
const messageController = require('../controllers/messageController')
const auth = require('../controllers/auth')

const messageRouter = express.Router()

messageRouter.route('/').get(messageController.getMessages)
// .post(auth.isLoggedIn, messageController.postMessage)
// messageRouter.route('/').get(auth.protect, messageController.getMessages)

module.exports = messageRouter
